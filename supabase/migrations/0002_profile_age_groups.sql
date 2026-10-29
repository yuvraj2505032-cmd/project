alter table public.profiles
  add column if not exists age_group text
  check (
    age_group is null
    or age_group in ('under_18', '18_24', '25_34', '35_44', '45_59', '60_plus')
  );