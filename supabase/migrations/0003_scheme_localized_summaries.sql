alter table public.schemes
  add column if not exists summary_hi text,
  add column if not exists summary_pa text;
