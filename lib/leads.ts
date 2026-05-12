export type ResourceLead = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  resource_title: string;
  created_at: string;
};

function getSupabaseUrl() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("Missing SUPABASE_URL");
  return url.replace(/\/$/, "");
}

function getServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return key;
}

async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const apiKey = getServiceRoleKey();
  const headers = new Headers(init.headers);

  headers.set("apikey", apiKey);
  headers.set("Authorization", `Bearer ${apiKey}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${getSupabaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || response.statusText);
  }

  return data as T;
}

export async function saveLead(input: {
  fullName: string;
  email: string;
  company?: string;
  resourceTitle: string;
}) {
  return supabaseRequest<ResourceLead[]>("/rest/v1/resource_leads", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      full_name: input.fullName,
      email: input.email,
      company: input.company || null,
      resource_title: input.resourceTitle,
    }),
  });
}

export async function getAllLeads() {
  const query = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
  }).toString();

  return supabaseRequest<ResourceLead[]>(`/rest/v1/resource_leads?${query}`);
}
