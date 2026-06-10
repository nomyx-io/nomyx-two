export type BlogStatus = "draft" | "published" | "hidden";

export type BlogFaq = {
  answer: string;
  question: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author_id: string | null;
  authors?: {
    id: string;
    name: string;
    slug: string;
    cover_image_url: string | null;
  } | null;
  published_at: string | null;
  cover_image_url: string | null;
  cover_image_path: string | null;
  content_html: string;
  faqs: BlogFaq[];
  featured: boolean;
  status: BlogStatus;
  excerpt: string | null;
  page_title: string | null;
  created_at: string;
  updated_at: string;
};

type QueryValue = string | number | boolean | null | undefined;

const BLOG_BUCKET = "blog-images";

function hasEnv(name: string) {
  return Boolean(process.env[name]);
}

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSupabaseUrl() {
  return requiredEnv("SUPABASE_URL").replace(/\/$/, "");
}

function getServiceRoleKey() {
  return requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
}

function getPublicKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    getServiceRoleKey()
  );
}

function hasPublicSupabaseConfig() {
  return hasEnv("SUPABASE_URL") && (hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || hasEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

function buildQuery(params: Record<string, QueryValue>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  return searchParams.toString();
}

async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {},
  options?: {
    admin?: boolean;
    allowEmpty?: boolean;
  }
): Promise<T> {
  const admin = options?.admin ?? false;
  const allowEmpty = options?.allowEmpty ?? false;
  const apiKey = admin ? getServiceRoleKey() : getPublicKey();
  const headers = new Headers(init.headers);

  headers.set("apikey", apiKey);
  headers.set("Authorization", `Bearer ${apiKey}`);

  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getSupabaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (response.status === 204 && allowEmpty) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.message || data?.error_description || data?.error || response.statusText;

    throw new Error(message);
  }

  return data as T;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

export function plainTextFromHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildExcerpt(html: string, maxLength = 180) {
  const plainText = plainTextFromHtml(html);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

export function normalizeBlogFaqs(value: unknown): BlogFaq[] {
  let items: unknown = value;

  if (typeof value === "string") {
    try {
      items = JSON.parse(value);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const question = typeof record.question === "string" ? record.question.trim() : "";
      const answer = typeof record.answer === "string" ? record.answer.trim() : "";

      if (!question || !answer) {
        return null;
      }

      return { question, answer };
    })
    .filter((item): item is BlogFaq => Boolean(item));
}

export async function getPublishedBlogs() {
  if (!hasPublicSupabaseConfig()) {
    return [];
  }

  const query = buildQuery({
    select: "id,title,slug,author_id,published_at,cover_image_url,content_html,faqs,featured,excerpt,page_title,authors(id,name,cover_image_url)",
    status: "eq.published",
    order: "published_at.desc,created_at.desc",
  });

  return supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?${query}`);
}

export async function getFeaturedBlogs(limit = 3) {
  if (!hasPublicSupabaseConfig()) {
    return [];
  }

  const query = buildQuery({
    select: "id,title,slug,author_id,published_at,cover_image_url,content_html,faqs,featured,excerpt,page_title,authors(id,name,cover_image_url)",
    status: "eq.published",
    featured: "eq.true",
    order: "published_at.desc,created_at.desc",
    limit,
  });

  return supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?${query}`);
}

export async function getPublishedBlogBySlug(slug: string) {
  if (!hasPublicSupabaseConfig()) {
    return null;
  }

  const query = buildQuery({
    select:
      "id,title,slug,author_id,published_at,cover_image_url,content_html,faqs,featured,excerpt,page_title,created_at,updated_at,authors(id,name,slug,cover_image_url)",
    slug: `eq.${slug}`,
    status: "eq.published",
    limit: 1,
  });

  const rows = await supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?${query}`);
  return rows[0] ?? null;
}

export async function getAllBlogsForAdmin() {
  const query = buildQuery({
    select: "*",
    order: "updated_at.desc",
  });

  return supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?${query}`, undefined, {
    admin: true,
  });
}

async function getExistingSlugs(baseSlug: string) {
  const query = buildQuery({
    select: "slug",
    slug: `like.${baseSlug}%`,
  });

  const rows = await supabaseRequest<Array<Pick<BlogPost, "slug">>>(
    `/rest/v1/blog_posts?${query}`,
    undefined,
    { admin: true }
  );

  return rows.map((row) => row.slug);
}

export async function ensureUniqueSlug(title: string, currentId?: string) {
  const baseSlug = slugify(title) || "untitled-post";
  const existingSlugs = await getExistingSlugs(baseSlug);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  if (currentId) {
    const current = await getBlogById(currentId);
    if (current?.slug === baseSlug) {
      return baseSlug;
    }
  }

  let suffix = 2;
  let nextSlug = `${baseSlug}-${suffix}`;

  while (existingSlugs.includes(nextSlug)) {
    suffix += 1;
    nextSlug = `${baseSlug}-${suffix}`;
  }

  return nextSlug;
}

export async function getBlogById(id: string) {
  const query = buildQuery({
    select: "*",
    id: `eq.${id}`,
    limit: 1,
  });

  const rows = await supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?${query}`, undefined, {
    admin: true,
  });

  return rows[0] ?? null;
}

export async function createBlog(input: {
  title: string;
  slug?: string;
  excerpt?: string;
  authorId: string | null;
  publishedAt: string | null;
  contentHtml: string;
  faqs: BlogFaq[];
  featured: boolean;
  status: BlogStatus;
  coverImageUrl: string | null;
  coverImagePath: string | null;
  pageTitle?: string | null;
}) {
  const slug = input.slug ? await ensureUniqueSlug(input.slug) : await ensureUniqueSlug(input.title);
  const excerpt = input.excerpt || buildExcerpt(input.contentHtml);
  const body = {
    title: input.title,
    slug,
    author_id: input.authorId,
    published_at: input.publishedAt,
    content_html: input.contentHtml,
    faqs: normalizeBlogFaqs(input.faqs),
    featured: input.featured,
    status: input.status,
    cover_image_url: input.coverImageUrl,
    cover_image_path: input.coverImagePath,
    excerpt,
    page_title: input.pageTitle || null,
  };

  const rows = await supabaseRequest<BlogPost[]>(
    "/rest/v1/blog_posts",
    {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    },
    { admin: true }
  );

  return rows[0];
}

export async function updateBlog(
  id: string,
  input: {
    title: string;
    slug?: string;
    excerpt?: string;
    authorId: string | null;
    publishedAt: string | null;
    contentHtml: string;
    faqs: BlogFaq[];
    featured: boolean;
    status: BlogStatus;
    coverImageUrl: string | null;
    coverImagePath: string | null;
    pageTitle?: string | null;
  }
) {
  const existing = await getBlogById(id);

  if (!existing) {
    throw new Error("Blog not found");
  }

  const slug = input.slug ? (existing.slug === input.slug ? existing.slug : await ensureUniqueSlug(input.slug, id)) : (existing.title === input.title ? existing.slug : await ensureUniqueSlug(input.title, id));
  const excerpt = input.excerpt || buildExcerpt(input.contentHtml);
  const query = buildQuery({ id: `eq.${id}` });
  const rows = await supabaseRequest<BlogPost[]>(
    `/rest/v1/blog_posts?${query}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: input.title,
        slug,
        author_id: input.authorId,
        published_at: input.publishedAt,
        content_html: input.contentHtml,
        faqs: normalizeBlogFaqs(input.faqs),
        featured: input.featured,
        cover_image_path: input.coverImagePath,
        excerpt,
        page_title: input.pageTitle || null,
      }),
    },
    { admin: true }
  );

  return rows[0];
}

export async function deleteBlog(id: string) {
  const blog = await getBlogById(id);

  if (!blog) {
    return;
  }

  if (blog.cover_image_path) {
    await deleteImage(blog.cover_image_path);
  }

  const query = buildQuery({ id: `eq.${id}` });
  await supabaseRequest(`/rest/v1/blog_posts?${query}`, { method: "DELETE" }, {
    admin: true,
    allowEmpty: true,
  });
}

export async function uploadImage(file: File, slugBase: string) {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filename = `${Date.now()}-${slugify(slugBase || "blog-cover")}.${extension}`;
  const objectPath = `${filename}`;

  await supabaseRequest(
    `/storage/v1/object/${BLOG_BUCKET}/${objectPath}`,
    {
      method: "POST",
      headers: {
        "x-upsert": "true",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    },
    { admin: true }
  );

  return {
    path: objectPath,
    url: `${getSupabaseUrl()}/storage/v1/object/public/${BLOG_BUCKET}/${objectPath}`,
  };
}

export async function deleteImage(path: string) {
  await supabaseRequest(
    `/storage/v1/object/${BLOG_BUCKET}/${path}`,
    { method: "DELETE" },
    { admin: true, allowEmpty: true }
  );
}

export function normalizePublishedAt(input: string | null, status: BlogStatus) {
  if (status !== "published") {
    return input || null;
  }

  if (input) {
    return input;
  }

  return new Date().toISOString();
}
