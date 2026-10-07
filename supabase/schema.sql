-- Instant Quote AI, Week 3 schema
-- Paste the whole file into the Supabase SQL Editor and run it once.
-- Safe to re-run: every statement is idempotent.

-- ---------------------------------------------------------------
-- 1. pricing_rules
-- ---------------------------------------------------------------

create table if not exists public.pricing_rules (
  id            uuid primary key default gen_random_uuid(),
  business_slug text not null,
  job_type      text not null,
  rate_low      numeric(10, 2) not null,
  rate_high     numeric(10, 2) not null,
  rate_unit     text not null check (rate_unit in ('per_sqft', 'flat')),
  created_at    timestamptz not null default now()
);

create unique index if not exists pricing_rules_business_job_idx
  on public.pricing_rules (business_slug, job_type);

-- Ridgeline Roofing rates.
insert into public.pricing_rules (business_slug, job_type, rate_low, rate_high, rate_unit)
values
  ('ridgeline-roofing', 'full',   5.60,   7.20, 'per_sqft'),
  ('ridgeline-roofing', 'repair', 400.00, 1500.00, 'flat')
on conflict (business_slug, job_type) do update
  set rate_low  = excluded.rate_low,
      rate_high = excluded.rate_high,
      rate_unit = excluded.rate_unit;

-- ---------------------------------------------------------------
-- 2. quote_requests
-- ---------------------------------------------------------------

create table if not exists public.quote_requests (
  id               uuid primary key,
  business_slug    text not null,
  job_type         text not null,
  sq_ft            integer,
  sq_ft_unknown    boolean not null default false,
  material         text,
  stories          text,
  name             text not null,
  phone            text not null,
  email            text not null,
  address          text not null,
  photo_paths      text[] not null default '{}',
  estimate_low     numeric(10, 2),
  estimate_high    numeric(10, 2),
  needs_inspection boolean not null default false,
  created_at       timestamptz not null default now()
);

create index if not exists quote_requests_business_created_idx
  on public.quote_requests (business_slug, created_at desc);

-- ---------------------------------------------------------------
-- 3. Private storage bucket for job photos
--    5 MB per file, images only.
-- ---------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quote-photos',
  'quote-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public             = false,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------
-- 4. Row Level Security
--    RLS is the real security boundary here. The anon key ships in
--    the browser bundle by design, so these policies are what keep
--    visitors out of other people's data.
--
--    Visitors can:   read pricing_rules, insert a quote_request,
--                    upload a photo.
--    Visitors cannot: read, change or delete quote requests or photos.
-- ---------------------------------------------------------------

alter table public.pricing_rules  enable row level security;
alter table public.quote_requests enable row level security;

grant select on public.pricing_rules  to anon;
grant insert on public.quote_requests to anon;

-- pricing_rules: read only.
drop policy if exists "Visitors can read pricing rules" on public.pricing_rules;
create policy "Visitors can read pricing rules"
  on public.pricing_rules
  for select
  to anon
  using (true);

-- quote_requests: insert only, and only rows that look like a real
-- enquiry. No select, update or delete policy exists, so with RLS on,
-- those are all denied for anon.
--
-- Every condition below is already guaranteed by the form, so a genuine
-- submission always passes. See the note under section 5.
drop policy if exists "Visitors can submit a quote request" on public.quote_requests;
create policy "Visitors can submit a quote request"
  on public.quote_requests
  for insert
  to anon
  with check (
    -- Business must be one we actually have rates for.
    -- This subquery is allowed because anon has a select policy on
    -- pricing_rules, and it uses the existing composite index.
    exists (
      select 1
      from public.pricing_rules pr
      where pr.business_slug = quote_requests.business_slug
    )

    -- Contact details must carry real content, not just whitespace.
    and btrim(name) <> ''
    and btrim(phone) <> ''
    and btrim(email) <> ''
    and btrim(address) <> ''

    -- Length ceilings, matched by maxLength on the form inputs.
    and char_length(name) <= 100
    and char_length(phone) <= 30
    and char_length(email) <= 200
    and char_length(address) <= 300

    -- Only the choices the form actually offers.
    and job_type in ('full', 'repair', 'unsure')
    and material in ('asphalt', 'metal', 'tile', 'flat', 'unsure')
    and stories in ('1', '2', '3+')

    -- Photo cap. array_length is null for an empty array, hence coalesce.
    and coalesce(array_length(photo_paths, 1), 0) <= 8
  );

-- storage.objects already has RLS enabled by Supabase.
-- Upload only, scoped to the quote-photos bucket.
drop policy if exists "Visitors can upload quote photos" on storage.objects;
create policy "Visitors can upload quote photos"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'quote-photos');

-- No select/update/delete policies for anon on storage.objects in this
-- bucket, so uploaded photos are write-only from the browser. Read them
-- from the Supabase dashboard, or server-side with the service_role key.
