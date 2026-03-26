create table if not exists public.categories (
  id text primary key,
  slug text unique not null,
  label text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category text not null,
  read_time text not null,
  author text not null,
  published_at timestamptz not null default now(),
  updated_at timestamptz,
  featured boolean not null default false,
  image text not null,
  tags text[] not null default '{}',
  hero_note text,
  body jsonb not null default '[]'::jsonb,
  takeaways text[] not null default '{}',
  cta_label text,
  seo_title text,
  seo_description text,
  comparison_table jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'reader',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  long_description text,
  use_cases text[] not null default '{}',
  rating numeric(2,1) not null default 0,
  price_label text not null,
  affiliate_hint text not null,
  image text not null,
  badge text,
  cta_label text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.user_favorites (
  user_id uuid references auth.users(id) on delete cascade,
  item_id text not null,
  item_type text not null default 'article',
  created_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferred_pet text not null default 'ambos',
  favorite_topics text[] not null default '{}',
  newsletter boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_history (
  user_id uuid references auth.users(id) on delete cascade,
  item_id text not null,
  item_type text not null default 'article',
  visited_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_app_meta_data->>'role', new.raw_user_meta_data->>'role', 'reader')
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    role = coalesce(excluded.role, public.profiles.role),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.articles enable row level security;
alter table public.contact_messages enable row level security;
alter table public.profiles enable row level security;
alter table public.user_favorites enable row level security;
alter table public.user_preferences enable row level security;
alter table public.user_history enable row level security;

drop policy if exists "contact_messages_insert_own" on public.contact_messages;
create policy "contact_messages_insert_own"
on public.contact_messages
for insert
to authenticated, anon
with check (true);

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_admin_read_all" on public.profiles;
create policy "profiles_admin_read_all"
on public.profiles
for select
to authenticated
using (public.is_admin());

drop policy if exists "articles_public_read_published" on public.articles;
create policy "articles_public_read_published"
on public.articles
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "articles_admin_manage" on public.articles;
create policy "articles_admin_manage"
on public.articles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Bucket expected by the admin panel:
-- insert into storage.buckets (id, name, public) values ('article-images', 'article-images', true);
drop policy if exists "article_images_public_read" on storage.objects;
create policy "article_images_public_read"
on storage.objects
for select
to public
using (bucket_id = 'article-images');

drop policy if exists "article_images_admin_insert" on storage.objects;
create policy "article_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'article-images'
  and public.is_admin()
);

drop policy if exists "article_images_admin_update" on storage.objects;
create policy "article_images_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'article-images'
  and public.is_admin()
)
with check (
  bucket_id = 'article-images'
  and public.is_admin()
);

drop policy if exists "article_images_admin_delete" on storage.objects;
create policy "article_images_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'article-images'
  and public.is_admin()
);

drop policy if exists "user_favorites_manage_own" on public.user_favorites;
create policy "user_favorites_manage_own"
on public.user_favorites
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_preferences_manage_own" on public.user_preferences;
create policy "user_preferences_manage_own"
on public.user_preferences
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_history_manage_own" on public.user_history;
create policy "user_history_manage_own"
on public.user_history
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
