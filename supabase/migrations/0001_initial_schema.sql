-- JanSahayak initial schema. Apply in a Supabase project after reviewing the privacy policy.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  profession text check (profession is null or length(profession) <= 60),
  date_of_birth date,
  age integer check (age is null or age between 0 and 120),
  gender text,
  state_code text,
  district_code text,
  annual_income_band text,
  social_category text,
  education_level text,
  disability_status text,
  preferred_language text not null default 'en' check (preferred_language in ('en','hi','pa')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schemes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (length(title) between 3 and 240),
  summary text not null default '',
  description text not null default '',
  scheme_type text not null default 'Other',
  government_level text not null default 'Central' check (government_level in ('Central','State','District','Other')),
  department text,
  state_code text,
  benefits text,
  application_url text,
  official_source_url text not null,
  application_status text not null default 'unknown' check (application_status in ('open','upcoming','closed','unknown','not_applicable')),
  deadline date,
  verification_status text not null default 'draft' check (verification_status in ('draft','pending_review','published','needs_reverification','rejected','archived')),
  last_verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  current_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists schemes_status_deadline_idx on public.schemes(verification_status, deadline);
create index if not exists schemes_state_type_idx on public.schemes(state_code, scheme_type);
create index if not exists schemes_updated_idx on public.schemes(updated_at desc);
create index if not exists schemes_search_idx on public.schemes using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(summary,'') || ' ' || coalesce(description,'')));

create table if not exists public.scheme_eligibility_rules (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  field_key text not null,
  operator text not null check (operator in ('eq','neq','in','not_in','gte','gt','lte','lt','contains')),
  expected_value jsonb not null,
  is_mandatory boolean not null default true,
  missing_data_behavior text not null default 'maybe' check (missing_data_behavior in ('maybe','ignore')),
  rule_group integer not null default 1,
  rule_version integer not null default 1,
  created_at timestamptz not null default now()
);
create index if not exists eligibility_scheme_idx on public.scheme_eligibility_rules(scheme_id);

create table if not exists public.scheme_documents (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  document_name text not null,
  is_mandatory boolean not null default false,
  notes text,
  accepted_formats text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.scheme_sources (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  source_url text not null,
  source_domain text not null,
  source_type text not null default 'official',
  discovery_provider text,
  retrieved_at timestamptz not null default now(),
  content_hash text,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewer_notes text
);
create index if not exists scheme_sources_scheme_idx on public.scheme_sources(scheme_id);

create table if not exists public.scheme_status_history (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  previous_status text,
  new_status text not null,
  reason text,
  changed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.discovery_runs (
  id uuid primary key default gen_random_uuid(),
  started_by uuid references auth.users(id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'running' check (status in ('running','completed','failed')),
  query_group text not null default 'default',
  results_count integer not null default 0,
  error_summary text
);

create table if not exists public.discovery_candidates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  candidate_data jsonb not null default '{}'::jsonb,
  source_url text not null,
  content_hash text not null unique,
  discovery_query text,
  discovered_by text not null default 'tavily',
  discovery_run_id uuid references public.discovery_runs(id) on delete set null,
  discovered_at timestamptz not null default now(),
  review_status text not null default 'pending_review' check (review_status in ('pending_review','approved_for_editor','rejected','duplicate','needs_more_research')),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  rejection_reason text
);
create index if not exists candidates_review_idx on public.discovery_candidates(review_status, discovered_at desc);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('reviewer','publisher','super_admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, scheme_id)
);

create table if not exists public.user_scheme_matches (
  user_id uuid not null references auth.users(id) on delete cascade,
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  result text not null check (result in ('eligible','maybe','not_eligible')),
  reasons jsonb not null default '[]'::jsonb,
  missing_fields text[] not null default '{}',
  rules_version integer not null default 1,
  evaluated_at timestamptz not null default now(),
  primary key(user_id, scheme_id)
);

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  matching_alerts boolean not null default true,
  deadline_alerts boolean not null default true,
  document_reminders boolean not null default false,
  in_app_enabled boolean not null default true,
  push_enabled boolean not null default false,
  sms_enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scheme_id uuid references public.schemes(id) on delete set null,
  type text not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_created_idx on public.notifications(user_id, created_at desc);

create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  purpose text not null,
  consent_text_version text not null,
  status text not null check (status in ('granted','revoked')),
  granted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists consent_user_purpose_idx on public.consent_records(user_id,purpose,status);

create table if not exists public.consent_audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  purpose text not null,
  action text not null check (action in ('granted','revoked','erasure_requested','erasure_completed')),
  occurred_at timestamptz not null default now()
);


create table if not exists public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  requested_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'requested' check (status in ('requested','completed','failed'))
);

-- RLS is enabled on every exposed table. Sensitive admin operations use the server-side service role only.
alter table public.profiles enable row level security;
alter table public.schemes enable row level security;
alter table public.scheme_eligibility_rules enable row level security;
alter table public.scheme_documents enable row level security;
alter table public.scheme_sources enable row level security;
alter table public.scheme_status_history enable row level security;
alter table public.discovery_runs enable row level security;
alter table public.discovery_candidates enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_audit_logs enable row level security;
alter table public.bookmarks enable row level security;
alter table public.user_scheme_matches enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.notifications enable row level security;
alter table public.consent_records enable row level security;
alter table public.consent_audit_events enable row level security;
alter table public.account_deletion_requests enable row level security;

-- Citizen-owned records: own rows only. Use backend API/service role only for privileged operations.
create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "bookmarks_select_own" on public.bookmarks for select to authenticated using (auth.uid() = user_id);
create policy "bookmarks_insert_own" on public.bookmarks for insert to authenticated with check (auth.uid() = user_id);
create policy "bookmarks_delete_own" on public.bookmarks for delete to authenticated using (auth.uid() = user_id);
create policy "matches_select_own" on public.user_scheme_matches for select to authenticated using (auth.uid() = user_id);
create policy "notification_preferences_own" on public.notification_preferences for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications_select_own" on public.notifications for select to authenticated using (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "consent_select_own" on public.consent_records for select to authenticated using (auth.uid() = user_id);
create policy "consent_insert_own" on public.consent_records for insert to authenticated with check (auth.uid() = user_id);
create policy "consent_select_events_own" on public.consent_audit_events for select to authenticated using (auth.uid() = user_id);

-- Public reads are restricted to approved schemes and their public metadata.
create policy "published_schemes_public_read" on public.schemes for select to anon, authenticated using (verification_status = 'published');
create policy "published_rules_public_read" on public.scheme_eligibility_rules for select to anon, authenticated using (exists (select 1 from public.schemes s where s.id = scheme_id and s.verification_status = 'published'));
create policy "published_documents_public_read" on public.scheme_documents for select to anon, authenticated using (exists (select 1 from public.schemes s where s.id = scheme_id and s.verification_status = 'published'));
create policy "published_sources_public_read" on public.scheme_sources for select to anon, authenticated using (exists (select 1 from public.schemes s where s.id = scheme_id and s.verification_status = 'published'));

-- No policies are intentionally granted to end users for candidates, runs, admin roles, or audit logs.
-- Add initial admin only after creating an auth.users account. Example (replace UUID and role):
-- insert into public.admin_users(user_id, role) values ('YOUR-AUTH-USER-UUID', 'super_admin');
