export type NewsStatus = "draft" | "published" | "hidden";

export type CategoryStatus = "active" | "hidden";

export type NewsCategory = {
  id: string;
  name: string;
  slug: string;
  status: CategoryStatus;
  created_at: string;
  newsCount?: number;
};

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  published_at: string | null;
  cover_image_url: string | null;
  cover_image_path: string | null;
  content_html: string;
  featured: boolean;
  status: NewsStatus;
  excerpt: string | null;
  page_title: string | null;
  created_at: string;
  updated_at: string;
  category?: NewsCategory | null;
};

type QueryValue = string | number | boolean | null | undefined;

const NEWS_BUCKET = "news-images";

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

// Categories

export async function getNewsCategories() {
  if (!hasPublicSupabaseConfig()) return [];
  const query = buildQuery({ select: "id,name,slug,status", order: "name.asc" });
  
  // We fetch categories and also all posts to compute the count locally
  // (PostgREST counting syntax can sometimes be tricky or blocked by RLS)
  const categories = await supabaseRequest<NewsCategory[]>(`/rest/v1/news_categories?${query}`);
  
  const postsQuery = buildQuery({ select: "category_id" });
  const posts = await supabaseRequest<Array<{ category_id: string }>>(`/rest/v1/news_posts?${postsQuery}`);
  
  return categories.map(cat => ({
    ...cat,
    newsCount: posts.filter(p => p.category_id === cat.id).length
  }));
}

export async function createNewsCategory(name: string) {
  const slug = slugify(name);
  const rows = await supabaseRequest<NewsCategory[]>("/rest/v1/news_categories", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ name, slug }),
  }, { admin: true });
  return rows[0];
}

export async function updateNewsCategory(id: string, name: string, status: CategoryStatus) {
  const slug = slugify(name);
  const query = buildQuery({ id: `eq.${id}` });
  const rows = await supabaseRequest<NewsCategory[]>(`/rest/v1/news_categories?${query}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ name, slug, status }),
  }, { admin: true });
  return rows[0];
}

export async function deleteNewsCategory(id: string) {
  const query = buildQuery({ id: `eq.${id}` });
  await supabaseRequest(`/rest/v1/news_categories?${query}`, { method: "DELETE" }, {
    admin: true, allowEmpty: true
  });
}

export async function reassignNewsCategory(fromCategoryId: string, toCategoryId: string | null) {
  const query = buildQuery({ category_id: `eq.${fromCategoryId}` });
  await supabaseRequest(`/rest/v1/news_posts?${query}`, {
    method: "PATCH",
    body: JSON.stringify({ category_id: toCategoryId })
  }, { admin: true, allowEmpty: true });
}

// News

export async function getPublishedNews() {
  if (!hasPublicSupabaseConfig()) {
    return [];
  }

  const query = buildQuery({
    select: "id,title,slug,published_at,cover_image_url,content_html,featured,excerpt,page_title,category_id,category:news_categories(id,name,slug)",
    status: "eq.published",
    order: "published_at.desc,created_at.desc",
  });

  return supabaseRequest<NewsPost[]>(`/rest/v1/news_posts?${query}`);
}

export async function getFeaturedNews(limit = 3) {
  if (!hasPublicSupabaseConfig()) {
    return [];
  }

  const query = buildQuery({
    select: "id,title,slug,published_at,cover_image_url,content_html,featured,excerpt,page_title,category_id,category:news_categories(id,name,slug)",
    status: "eq.published",
    featured: "eq.true",
    order: "published_at.desc,created_at.desc",
    limit,
  });

  return supabaseRequest<NewsPost[]>(`/rest/v1/news_posts?${query}`);
}

export async function getPublishedNewsBySlug(slug: string) {
  if (!hasPublicSupabaseConfig()) {
    return null;
  }

  const query = buildQuery({
    select: "id,title,slug,published_at,cover_image_url,content_html,featured,excerpt,page_title,created_at,updated_at,category_id,category:news_categories(id,name,slug)",
    slug: `eq.${slug}`,
    status: "eq.published",
    limit: 1,
  });

  const rows = await supabaseRequest<NewsPost[]>(`/rest/v1/news_posts?${query}`);
  return rows[0] ?? null;
}

export async function getAllNewsForAdmin() {
  const query = buildQuery({
    select: "*,category:news_categories(id,name,slug)",
    order: "updated_at.desc",
  });

  return supabaseRequest<NewsPost[]>(`/rest/v1/news_posts?${query}`, undefined, {
    admin: true,
  });
}

async function getExistingSlugs(baseSlug: string) {
  const query = buildQuery({
    select: "slug",
    slug: `like.${baseSlug}%`,
  });

  const rows = await supabaseRequest<Array<Pick<NewsPost, "slug">>>(
    `/rest/v1/news_posts?${query}`,
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
    const current = await getNewsById(currentId);
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

export async function getNewsById(id: string) {
  const query = buildQuery({
    select: "*,category:news_categories(id,name,slug)",
    id: `eq.${id}`,
    limit: 1,
  });

  const rows = await supabaseRequest<NewsPost[]>(`/rest/v1/news_posts?${query}`, undefined, {
    admin: true,
  });

  return rows[0] ?? null;
}

export async function createNews(input: {
  title: string;
  slug?: string;
  excerpt?: string;
  publishedAt: string | null;
  contentHtml: string;
  featured: boolean;
  status: NewsStatus;
  coverImageUrl: string | null;
  coverImagePath: string | null;
  categoryId: string | null;
  pageTitle?: string | null;
}) {
  const slug = input.slug ? await ensureUniqueSlug(input.slug) : await ensureUniqueSlug(input.title);
  const excerpt = input.excerpt || buildExcerpt(input.contentHtml);
  const body = {
    title: input.title,
    slug,
    published_at: input.publishedAt,
    content_html: input.contentHtml,
    featured: input.featured,
    status: input.status,
    cover_image_url: input.coverImageUrl,
    cover_image_path: input.coverImagePath,
    excerpt,
    category_id: input.categoryId,
    page_title: input.pageTitle || null,
  };

  const rows = await supabaseRequest<NewsPost[]>(
    "/rest/v1/news_posts",
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

export async function updateNews(
  id: string,
  input: {
    title: string;
    slug?: string;
    excerpt?: string;
    publishedAt: string | null;
    contentHtml: string;
    featured: boolean;
    status: NewsStatus;
    coverImageUrl: string | null;
    coverImagePath: string | null;
    categoryId: string | null;
    pageTitle?: string | null;
  }
) {
  const existing = await getNewsById(id);

  if (!existing) {
    throw new Error("News post not found");
  }

  const slug = input.slug ? (existing.slug === input.slug ? existing.slug : await ensureUniqueSlug(input.slug, id)) : (existing.title === input.title ? existing.slug : await ensureUniqueSlug(input.title, id));
  const excerpt = input.excerpt || buildExcerpt(input.contentHtml);
  const query = buildQuery({ id: `eq.${id}` });
  const rows = await supabaseRequest<NewsPost[]>(
    `/rest/v1/news_posts?${query}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: input.title,
        slug,
        published_at: input.publishedAt,
        content_html: input.contentHtml,
        featured: input.featured,
        status: input.status,
        cover_image_url: input.coverImageUrl,
        cover_image_path: input.coverImagePath,
        excerpt,
        category_id: input.categoryId,
        page_title: input.pageTitle || null,
      }),
    },
    { admin: true }
  );

  return rows[0];
}

export async function deleteNews(id: string) {
  const news = await getNewsById(id);

  if (!news) {
    return;
  }

  if (news.cover_image_path) {
    await deleteImage(news.cover_image_path);
  }

  const query = buildQuery({ id: `eq.${id}` });
  await supabaseRequest(`/rest/v1/news_posts?${query}`, { method: "DELETE" }, {
    admin: true,
    allowEmpty: true,
  });
}

export async function uploadImage(file: File, slugBase: string) {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filename = `${Date.now()}-${slugify(slugBase || "news-cover")}.${extension}`;
  const objectPath = `${filename}`;

  await supabaseRequest(
    `/storage/v1/object/${NEWS_BUCKET}/${objectPath}`,
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
    url: `${getSupabaseUrl()}/storage/v1/object/public/${NEWS_BUCKET}/${objectPath}`,
  };
}

export async function deleteImage(path: string) {
  await supabaseRequest(
    `/storage/v1/object/${NEWS_BUCKET}/${path}`,
    { method: "DELETE" },
    { admin: true, allowEmpty: true }
  );
}

export function normalizePublishedAt(input: string | null, status: NewsStatus) {
  if (status !== "published") {
    return input || null;
  }

  if (input) {
    return input;
  }

  return new Date().toISOString();
}
