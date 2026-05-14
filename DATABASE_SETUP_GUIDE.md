# Nomyx Project Setup Guide

This guide will walk you through the steps to set up the database schema on Supabase and connect it to the Nomyx project.

---

## 1. Database Setup (Supabase)

Follow these steps to apply the required database schema to your Supabase project:

1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project.
3.  Go to the **SQL Editor** in the left sidebar.
4.  Click on **New Query**.
5.  Copy and paste the following SQL block into the editor and click **Run**:

```sql
-- 1. Helper function for handling updated_at timestamps
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- 2. Create Blog Posts table
create table if not exists public.blog_posts (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  published_at timestamp with time zone null,
  cover_image_url text null,
  cover_image_path text null,
  content_html text not null,
  excerpt text null,
  featured boolean not null default false,
  status text not null default 'draft'::text,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  constraint blog_posts_pkey primary key (id),
  constraint blog_posts_slug_key unique (slug),
  constraint blog_posts_status_check check (
    (
      status = any (
        array['draft'::text, 'published'::text, 'hidden'::text]
      )
    )
  )
);

-- 3. Create Indexes for Blog Posts
create index if not exists blog_posts_status_published_at_idx 
  on public.blog_posts using btree (status, published_at desc, created_at desc);

create index if not exists blog_posts_featured_idx 
  on public.blog_posts using btree (featured, status, published_at desc);

-- 4. Create Update Trigger for Blog Posts
drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at BEFORE
update on blog_posts for EACH row
execute FUNCTION set_updated_at ();

-- 5. Create Resource Leads table (for lead capture)
create table if not exists public.resource_leads (
  id uuid not null default gen_random_uuid (),
  full_name text not null,
  email text not null,
  company text null,
  resource_title text not null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  constraint resource_leads_pkey primary key (id)
);
```

---

## 2. Connect the Project

Once the database is ready, you need to link the local project to your Supabase instance:

1.  In the root directory of this project, find the `.env.example` file.
2.  Create a copy of it and rename the copy to `.env.local`.
3.  Fill in the values using your Supabase project credentials:
    *   **SUPABASE_URL**: Found in **Project Settings** > **API**.
    *   **SUPABASE_PUBLISHABLE_KEY**: Use the `anon` / `public` key found in **Project Settings** > **API**.
    *   **SUPABASE_SERVICE_ROLE_KEY**: Found in **Project Settings** > **API** (Warning: This is a secret key).
    *   **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Same as your `anon` / `public` key.

Your `.env.local` should look like this:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 3. Installation and Running

Finally, install the dependencies and start the development server:

1.  Open your terminal in the project root.
2.  Run `npm install` to install all packages.
3.  Run `npm run dev` to start the local development server.
4.  Open `http://localhost:3000` in your browser.

---

## 4. Storage Setup (Required)

For blog images to work correctly, you must create a public storage bucket:

1.  In Supabase, go to **Storage** > **Buckets**.
2.  Click **New Bucket**.
3.  Name it exactly `blog-images`.
4.  Set it to **Public**.
5.  Alternatively, you can run this SQL in the SQL Editor:

```sql
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = excluded.public;

-- Policy to allow public read access to images
create policy "Public blog images are readable"
on storage.objects for select
using (bucket_id = 'blog-images');
```

---

## 5. Security (Row Level Security)

To protect your data while allowing the frontend to read published posts, run the following SQL:

```sql
-- Enable RLS
alter table public.blog_posts enable row level security;

-- Policy: Anyone can read published posts
create policy "Published blogs are readable by everyone"
on public.blog_posts for select
using (status = 'published');

-- Policy: Basic access for CMS (adjust as needed for your auth setup)
create policy "CMS blog access is public for now"
on public.blog_posts for select
using (true);
```
