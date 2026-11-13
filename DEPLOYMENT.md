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
