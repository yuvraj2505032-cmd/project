# JanSahayak

Mobile-first government scheme discovery and eligibility assistant for India, adapted from the supplied React/Vite boilerplate.

## What's included

- Responsive citizen dashboard, scheme discovery/search/filter, bookmarks, profile onboarding, chat UI and admin review UI.
- Supabase phone OTP integration that remains safely disabled until frontend environment variables are configured.
- FastAPI backend with Supabase-authenticated endpoints, deterministic eligibility evaluation, Tavily candidate discovery, manual-review endpoints and Groq RAG chat grounded in published scheme records.
- Supabase SQL migration with RLS policies, citizen data tables, source provenance and admin audit records.
- Explicitly labelled demo records in the frontend. They are not real recommendations and cannot be approved as-is.

## Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 8 requirement; use a current supported LTS release).
- Python 3.11+ recommended.
- Supabase project, Tavily API key and Groq API key for external integrations.

## 1. Frontend

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_API_BASE_URL` in `.env.local`. Never put a Supabase service-role key, Tavily key or Groq key in any `VITE_` variable.

To enable phone OTP, configure Phone Auth and an SMS provider in Supabase Auth settings. Set the appropriate allowed redirect URLs in the Supabase dashboard.

Administrator sign-in uses a provisioned Supabase email/password account. Enable the email provider for those accounts; the app checks the account's server-assigned admin role before showing the review workspace. Do not create shared or hardcoded administrator credentials.

## 2. Database

In Supabase SQL Editor, run `supabase/migrations/0001_initial_schema.sql`, then `supabase/migrations/0002_profile_age_groups.sql`. Create an auth user for each administrator, then assign its role using the SQL comment at the end of the initial migration. Administrators sign in from the sidebar's **Admin sign in** action; the API verifies the role for every privileged request. Review policies before production. The API uses a service-role key for privileged server-side operations, so it must only exist in the backend environment.

## 3. Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TAVILY_API_KEY`, `GROQ_API_KEY`, `GROQ_MODEL`, and `CORS_ORIGINS`. Keep backend `.env` out of version control. Visit `http://localhost:8000/health` and `http://localhost:8000/docs` for service health and API docs.

### Admin roles

- `reviewer`: can run discovery, view candidates and reject candidates.
- `publisher`: can run discovery, view/reject candidates, and approve candidates for structured editing.
- `super_admin`: same capabilities with full admin ownership responsibilities.

Discovery results are never automatically published. Candidate approval moves the item to `approved_for_editor`; it is not a published scheme. A complete structured scheme must be verified and published through a controlled publishing workflow. The first release intentionally avoids publishing raw crawler output.

The admin workspace supports a custom Tavily web search or the configured default search topics. Review the source URL and retrieved evidence, reject unsuitable candidates or approve them for editing, then create a structured unpublished draft. A publisher must separately record verification notes and confirm the official source before publishing. Published listings are then available from the citizen scheme directory. Profile age is stored as an age band; numeric eligibility rules return an uncertain result when a band overlaps the rule threshold.

## Important integration boundaries

- Frontend demo data is for interface preview only and must not be used as scheme advice.
- Phone OTP requires a configured Supabase project and SMS delivery provider.
- Tavily discovery requires its API key and a database migration.
- Groq answers only from published scheme records retrieved by the backend. If Groq is not configured, the API returns a safe unavailable response.
- Notifications currently have database foundations and UI feedback; push/SMS delivery workers are not enabled in this MVP.
- Profile persistence, complete production bookmark synchronization, full account-erasure orchestration, versioned scheme editing and end-to-end integration testing still need completion before a public launch.

## Production checklist

1. Configure Supabase Auth phone provider, SMS costs/rate limits, redirect allow-list and account security.
2. Apply and review RLS policies and test using non-admin accounts. Never expose the service-role key to the browser.
3. Add monitoring, backups, log redaction, secret rotation, API rate limiting, request-size limits and deployment health checks.
4. Configure scheduled discovery via a managed scheduler/queue; the current endpoint is admin-triggered.
5. Expand the editorial workflow with versioned draft editing and test eligibility logic against independently reviewed cases.
6. Complete privacy notice, consent records/revocation, data export/erasure workflow, vendor terms and applicable DPDP Act/rules legal review.
7. Verify all scheme URLs, benefit amounts, documents and deadlines against official sources before publishing.
8. Run dependency scanning, accessibility testing, API authorization tests and end-to-end browser tests.

This repository is a production-oriented MVP foundation, not a claim that external accounts, secrets, SMS delivery, hosting, legal review or operational controls have already been configured.
