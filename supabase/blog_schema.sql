create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  published_at timestamptz,
  cover_image_url text,
  cover_image_path text,
  content_html text not null,
  faqs jsonb not null default '[]'::jsonb,
  excerpt text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'hidden')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.blog_posts
  add column if not exists faqs jsonb not null default '[]'::jsonb;

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts (status, published_at desc, created_at desc);

create index if not exists blog_posts_featured_idx
  on public.blog_posts (featured, status, published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;

create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists "Published blogs are readable by everyone" on public.blog_posts;
create policy "Published blogs are readable by everyone"
on public.blog_posts
for select
using (status = 'published');

drop policy if exists "CMS blog access is public for now" on public.blog_posts;
create policy "CMS blog access is public for now"
on public.blog_posts
for select
using (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'blog_posts'
  ) then
    alter publication supabase_realtime add table public.blog_posts;
  end if;
end
$$;

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public blog images are readable" on storage.objects;
create policy "Public blog images are readable"
on storage.objects
for select
using (bucket_id = 'blog-images');
