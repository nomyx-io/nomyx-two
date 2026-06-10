export type Author = {
  id: string;
  name: string;
  slug: string;
  bio_html: string | null;
  designation: string | null;
  cover_image_url: string | null;
  cover_image_path: string | null;
  meta_description: string | null;
  page_title: string | null;
  created_at: string;
  updated_at: string;
  blog_count?: number; // Added for CMS delete modal
};

type QueryValue = string | number | boolean | null | undefined;

const AUTHOR_BUCKET = "author-images";

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

export async function getAllAuthorsForAdmin() {
  const query = buildQuery({
    select: "id,name,slug,bio_html,designation,cover_image_url,cover_image_path,meta_description,page_title",
    order: "name.asc",
  });

  const authors = await supabaseRequest<Author[]>(`/rest/v1/authors?${query}`);
  
  // Fetch blog count for each author to warn when deleting
  const blogsQuery = buildQuery({
    select: "author_id",
  });
  
  const blogs = await supabaseRequest<Array<{ author_id: string }>>(`/rest/v1/blog_posts?${blogsQuery}`);
  
  return authors.map(author => {
    const count = blogs.filter(b => b.author_id === author.id).length;
    return { ...author, blog_count: count };
  });
}

export async function getAuthorById(id: string) {
  const query = buildQuery({ id: `eq.${id}` });
  const rows = await supabaseRequest<Author[]>(`/rest/v1/authors?${query}`);
  return rows[0] || null;
}

export async function getAuthorBySlug(slug: string) {
  const query = buildQuery({ slug: `eq.${slug}` });
  const rows = await supabaseRequest<Author[]>(`/rest/v1/authors?${query}`);
  return rows[0] || null;
}

async function ensureUniqueSlug(name: string, excludeId?: string): Promise<string> {
  let baseSlug = slugify(name);
  if (!baseSlug) baseSlug = "author";

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const queryParams: Record<string, string> = { slug: `eq.${slug}` };
    if (excludeId) {
      queryParams.id = `neq.${excludeId}`;
    }
    const query = buildQuery(queryParams);

    const rows = await supabaseRequest<Author[]>(
      `/rest/v1/authors?${query}`,
      undefined,
      { admin: true }
    );

    if (rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function createAuthor(input: {
  name: string;
  slug?: string;
  bioHtml: string | null;
  designation: string | null;
  coverImageUrl: string | null;
  coverImagePath: string | null;
  metaDescription?: string | null;
  pageTitle?: string | null;
}) {
  const slug = input.slug ? await ensureUniqueSlug(input.slug) : await ensureUniqueSlug(input.name);

  const rows = await supabaseRequest<Author[]>(
    "/rest/v1/authors",
    {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name: input.name,
        slug,
        bio_html: input.bioHtml,
        designation: input.designation,
        cover_image_url: input.coverImageUrl,
        cover_image_path: input.coverImagePath,
        meta_description: input.metaDescription || null,
        page_title: input.pageTitle || null,
      }),
    },
    { admin: true }
  );

  return rows[0];
}

export async function updateAuthor(
  id: string,
  input: {
    name: string;
    slug?: string;
    bioHtml: string | null;
    designation: string | null;
    coverImageUrl: string | null;
    coverImagePath: string | null;
    metaDescription?: string | null;
    pageTitle?: string | null;
  }
) {
  const existing = await getAuthorById(id);

  if (!existing) {
    throw new Error("Author not found");
  }

  const slug = input.slug ? (existing.slug === input.slug ? existing.slug : await ensureUniqueSlug(input.slug, id)) : (existing.name === input.name ? existing.slug : await ensureUniqueSlug(input.name, id));
  const query = buildQuery({ id: `eq.${id}` });
  
  const rows = await supabaseRequest<Author[]>(
    `/rest/v1/authors?${query}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name: input.name,
        slug,
        bio_html: input.bioHtml,
        designation: input.designation,
        cover_image_url: input.coverImageUrl,
        cover_image_path: input.coverImagePath,
        meta_description: input.metaDescription || null,
        page_title: input.pageTitle || null,
      }),
    },
    { admin: true }
  );

  return rows[0];
}

export async function deleteAuthor(id: string) {
  const author = await getAuthorById(id);

  if (!author) {
    return;
  }

  if (author.cover_image_path) {
    await deleteAuthorImage(author.cover_image_path);
  }

  const query = buildQuery({ id: `eq.${id}` });
  await supabaseRequest(`/rest/v1/authors?${query}`, { method: "DELETE" }, {
    admin: true,
    allowEmpty: true,
  });
}

export async function uploadAuthorImage(file: File, slugBase: string) {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filename = `${Date.now()}-${slugify(slugBase || "author")}.${extension}`;
  const objectPath = `${filename}`;

  await supabaseRequest(
    `/storage/v1/object/${AUTHOR_BUCKET}/${objectPath}`,
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
    url: `${getSupabaseUrl()}/storage/v1/object/public/${AUTHOR_BUCKET}/${objectPath}`,
  };
}

export async function deleteAuthorImage(path: string) {
  await supabaseRequest(
    `/storage/v1/object/${AUTHOR_BUCKET}/${path}`,
    { method: "DELETE" },
    { admin: true, allowEmpty: true }
  );
}
