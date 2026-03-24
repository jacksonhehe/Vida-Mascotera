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
  created_at timestamptz not null default now()
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
  article_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, article_id)
);

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferred_pet text not null default 'ambos',
  favorite_topics text[] not null default '{}',
  newsletter boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
alter table public.user_favorites enable row level security;
alter table public.user_preferences enable row level security;

create policy "contact_messages_insert_own"
on public.contact_messages
for insert
to authenticated, anon
with check (true);

create policy "user_favorites_manage_own"
on public.user_favorites
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "user_preferences_manage_own"
on public.user_preferences
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
