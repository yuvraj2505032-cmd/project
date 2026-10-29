# Security and privacy notes

## Secrets

- Browser environment variables may contain only the Supabase URL and publishable/anon key.
- `SUPABASE_SERVICE_ROLE_KEY`, `TAVILY_API_KEY`, and `GROQ_API_KEY` belong only in the backend runtime environment.
- Rotate credentials immediately if they are accidentally committed or shared.

## Personal data

- The MVP intentionally has no personal document upload or Aadhaar-number field.
- Collect age rather than full date of birth unless a scheme-specific requirement is reviewed.
- Do not log OTPs, access tokens, full profiles, or chatbot messages containing sensitive personal data.
- Account deletion invokes Supabase Auth user deletion and relies on database foreign-key cascades for linked user-owned records. Verify this behavior against your live project before launch and review statutory retention exceptions with counsel.

## Scheme integrity

- Tavily results are untrusted candidates, not facts.
- A discovery result must never be auto-published.
- Admins must inspect the official source, benefit details, eligibility, document list, deadline and application status.
- Record who verified a scheme, when it was verified, and what source was used.
- If a deadline or availability cannot be confirmed, mark it unknown and say so.

## Before production

Run dependency scanning, access-control tests, RLS tests using anon/authenticated/admin accounts, API rate limits, backup/restore tests, deletion tests, and accessibility tests. Configure alerts, monitoring, incident response and a privacy/grievance contact. Review applicable DPDP Act 2023 requirements and current rules/commencement provisions with qualified counsel.
