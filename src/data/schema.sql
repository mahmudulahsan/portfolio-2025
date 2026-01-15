-- Keep existing tables
create table if not exists public.projects (
  id text primary key,
  title text not null,
  type text not null,
  description text,
  tech text,
  link text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.blogs (
  id text primary key,
  title text not null,
  description text,
  link text,
  platform text,
  date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- New Tables

-- Achievements
create table public.achievements (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    link text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Experience
create table public.experiences (
    id uuid default gen_random_uuid() primary key,
    company text not null,
    role text not null,
    period text,
    points text[], -- Array of strings for bullet points
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Education
create table public.education (
    id uuid default gen_random_uuid() primary key,
    institution text not null,
    degree text not null,
    field text not null,
    period text,
    cgpa text,
    location text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Skills (Categories)
create table public.skills (
    id uuid default gen_random_uuid() primary key,
    title text not null, -- Category title like "Languages"
    skills text[], -- Array of skill names
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Research
create table public.research (
    id uuid default gen_random_uuid() primary key,
    title text not null, 
    subtitle text,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Info (Single row intended, or key-value)
create table public.profile_info (
    id text primary key default 'main', -- Single row constraint basically
    email text,
    phone text,
    address text
);

-- Social Links
create table public.social_links (
    id text primary key, -- Use strict IDs like 'github', 'linkedin'
    label text,
    value text,
    href text,
    icon text
);

-- Enable RLS
alter table public.achievements enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.skills enable row level security;
alter table public.research enable row level security;
alter table public.profile_info enable row level security;
alter table public.social_links enable row level security;

-- Policies (Public Read, Anon Write for Demo)
create policy "Public read achievements" on public.achievements for select to public using (true);
create policy "Anon write achievements" on public.achievements for all to anon using (true) with check (true);

create policy "Public read experiences" on public.experiences for select to public using (true);
create policy "Anon write experiences" on public.experiences for all to anon using (true) with check (true);

create policy "Public read education" on public.education for select to public using (true);
create policy "Anon write education" on public.education for all to anon using (true) with check (true);

create policy "Public read skills" on public.skills for select to public using (true);
create policy "Anon write skills" on public.skills for all to anon using (true) with check (true);

create policy "Public read research" on public.research for select to public using (true);
create policy "Anon write research" on public.research for all to anon using (true) with check (true);

create policy "Public read profile_info" on public.profile_info for select to public using (true);
create policy "Anon write profile_info" on public.profile_info for all to anon using (true) with check (true);

create policy "Public read social_links" on public.social_links for select to public using (true);
create policy "Anon write social_links" on public.social_links for all to anon using (true) with check (true);
