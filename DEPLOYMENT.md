# Deployment Guide — Hem's Institute Website

This guide covers deploying the Hem's Institute official website to Vercel (or any
Next.js-compatible platform) with a PostgreSQL database.

## Prerequisites

- Node.js 18+
- PostgreSQL database (local or managed, e.g. Supabase, Neon, Vercel Postgres)
- A WhatsApp-capable phone number for the Click to Chat integration

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in the values:

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (for metadata/canonical) | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code, no `+`) | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (optional) | No |

## 3. Set Up the Database

Apply the schema:

```bash
npx drizzle-kit push
```

Seed the initial program catalog:

```bash
psql "$DATABASE_URL" -f scripts/seed.sql
```

## 4. Build and Start Locally

```bash
npm run build
npm run start
```

Open `http://localhost:3000`. Verify `/api/health` returns `{ "ok": true }`.

## 5. Deploy to Vercel

1. Push the code to a GitHub repository.
2. Import the repository into Vercel.
3. Add the environment variables from `.env` in the Vercel project settings.
4. Deploy.

After deployment, run the database setup against your production PostgreSQL:

```bash
npx drizzle-kit push
psql "$DATABASE_URL" -f scripts/seed.sql
```

## 6. SEO & Analytics

- `sitemap.xml` and `robots.txt` are served by Next.js automatically.
- Open Graph metadata is configured per page.
- Google Analytics 4 loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- Submit your sitemap to Google Search Console.

## 7. Notes

- No secrets are exposed to the browser. Only `NEXT_PUBLIC_*` variables are
  available client-side.
- The admin dashboard is intentionally not included in Phase 1.
- Program data is managed in the database; update prices/schedules via SQL or
  the future admin dashboard.


## Build-time database configuration

`npm run build` no longer requires `DATABASE_URL` just to import route modules or collect `/sitemap.xml`. Database-backed features still require a valid PostgreSQL `DATABASE_URL` in the hosting environment at runtime. Configure it before enabling program catalog, registration, schedules, and database health checks.


## Supabase PostgreSQL setup (V2)

The V2 database is provisioned in the Hem's Supabase organization as a separate, empty project so it does not overwrite the original Hem's Institute database.

- Supabase project ref: `weecagwheqepvvgqwvim`
- Project URL: `https://weecagwheqepvvgqwvim.supabase.co`
- Database: PostgreSQL 17
- Region: `us-east-1`

The initial schema and seed data have already been applied to the hosted project. Six tables are created: `program_categories`, `programs`, `course_schedules`, `participants`, `registrations`, and `registration_logs`. The seed contains three categories and fourteen active program records.

### Configure the app connection

1. In Supabase Dashboard, open this V2 project and choose **Connect**.
2. Copy the **Shared Pooler** PostgreSQL connection URI. Use the URI shown in the dashboard; replace its password placeholder locally.
3. Copy `.env.example` to `.env.local`, then set `DATABASE_URL` to that URI.
4. In Vercel or the hosting provider, add `DATABASE_URL` as a server-only environment variable for Production, Preview, and Development as appropriate.
5. Never name it `NEXT_PUBLIC_DATABASE_URL`, commit `.env.local`, or share the URI/password.

This app uses Drizzle ORM over a trusted server-side PostgreSQL connection. Its public website API routes access the database through the Next.js server. RLS is enabled and `anon` / `authenticated` table privileges are revoked, so do not switch these tables to direct browser access without designing and testing explicit RLS policies first.

### Seed data

The hosted V2 database already contains the seed categories and programs. For a fresh database only, run `scripts/seed.sql` after applying the schema migration. Do not rerun it to reset production data.
