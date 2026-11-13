# Hem's Institute V2

Repository baru untuk pengembangan website Hem's Institute berbasis Next.js, PostgreSQL, dan Drizzle ORM.

## Menjalankan secara lokal

1. Install Node.js versi yang kompatibel dengan Next.js 16.
2. Salin `.env.example` menjadi `.env` lalu isi `DATABASE_URL` dan konfigurasi situs.
3. Install dependensi: `npm install`.
4. Jalankan development server: `npm run dev`.

## Pemeriksaan

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Jangan pernah commit file `.env` atau kredensial database. Gunakan environment variables pada platform deployment.

## Struktur

- `src/app`: halaman dan API routes Next.js.
- `src/components`: komponen UI, katalog dan formulir pendaftaran.
- `src/db`: skema dan koneksi Drizzle.
- `scripts/seed.sql`: seed awal database.
- `DEPLOYMENT.md`: catatan deployment.
