-- Seed script for Hem's Institute database.
-- Run: psql postgresql://postgres:postgres@127.0.0.1:5432/app_db -f scripts/seed.sql
--
-- Program prices are intentionally left NULL. The frontend displays
-- "Hubungi Admin untuk Informasi" when price is not set.
-- Course schedules are intentionally not seeded; the UI gracefully shows
-- a placeholder when no schedule exists.

BEGIN;

INSERT INTO program_categories (id, name, slug, description, created_at) VALUES
  ('6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'Bahasa Asing', 'bahasa-asing', 'Program pelatihan bahasa asing untuk berbagai usia dan tingkat kemampuan, dari pemula hingga lanjutan.', now()),
  ('82c755b4-34e2-454a-b9b2-5e1d1023788e', 'Multimedia & Keterampilan Digital', 'multimedia-digital', 'Keterampilan digital, desain, dan multimedia untuk mendukung karir dan bisnis di era digital.', now()),
  ('9f07800f-befe-47b0-bbee-b918d0d317e9', 'Keterampilan Profesional', 'keterampilan-profesional', 'Program keterampilan profesional untuk menopang karir dan kesiapsiagaan dunia kerja.', now())
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO programs (
  id, category_id, name, slug, description, target_audience, course_level,
  duration, total_meetings, price, learning_method, image_url, is_active, created_at
) VALUES
  ('d7ca39da-6a65-442e-801c-fccce0ccc88e', '6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'Bahasa Inggris', 'bahasa-inggris', 'Program pelatihan bahasa Inggris yang meliputi speaking, listening, reading, dan writing untuk pemula hingga tingkat lanjutan.', 'SMP dan sederajat ke atas', 'Pemula hingga Lanjutan', '3 bulan', 12, NULL, 'Tatap muka & Online', NULL, true, now()),
  ('50a7b5b8-719e-4bd9-853b-0f828cdea86d', '6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'Bahasa Korea', 'bahasa-korea', 'Pelatihan bahasa Korea untuk pemula yang tertarik dengan bahasa dan budaya Korea, termasuk pengenalan Hangul.', 'SMA dan umur dewasa', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka', NULL, true, now()),
  ('22b389f3-6214-4103-a0d2-a1a6ac215f7e', '6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'Bahasa Jepang', 'bahasa-jepang', 'Program pelatihan bahasa Jepang untuk pemula, mencakup kosakata, tata bahasa, dan pengenalan huruf Hiragana serta Katakana.', 'SMA dan umur dewasa', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka', NULL, true, now()),
  ('1e2d84cf-31fc-4015-9116-55ac29a21f10', '6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'Bahasa Mandarin', 'bahasa-mandarin', 'Pelatihan bahasa Mandarin untuk pemula dengan penekanan pada ucapan (pinyin), hanzi dasar, dan percakapan sehari-hari.', 'SMA dan umur dewasa', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka & Online', NULL, true, now()),
  ('966cae22-e440-4ce5-8623-ca2d467455a8', '6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'Bahasa Arab', 'bahasa-arab', 'Program pengenalan bahasa Arab untuk pemula, mencakup pengenalan huruf hijaiyah, kosakata dasar, dan tata bahasa singkat.', 'SMA dan umur dewasa', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka', NULL, true, now()),
  ('f2fe4c7a-a836-4e76-bd05-09a00926d2e8', '6a4fafff-4716-4fa0-a725-f3ce1bc51e68', 'TOEFL Preparation', 'toefl-preparation', 'Program persiapan tes TOEFL yang memfokuskan pada listening comprehension, structure and written expression, serta reading comprehension.', 'SMA & Mahasiswa', 'Menengah', '2 bulan', 8, NULL, 'Tatap muka & Online', NULL, true, now()),
  ('6181fc17-5537-49f7-9060-7a58fef5b052', '82c755b4-34e2-454a-b9b2-5e1d1023788e', 'Computer Operator', 'computer-operator', 'Program dasar pengoperasian komputer untuk pemula, mencakup pengenalan hardware, sistem operasi, dan aplikasi perkantoran.', 'SMP dan sederajat ke atas', 'Pemula', '1 bulan', 4, NULL, 'Tatap muka', NULL, true, now()),
  ('f179fd91-3d9a-46ee-91d3-e6c542e87e45', '82c755b4-34e2-454a-b9b2-5e1d1023788e', 'Graphic Design', 'graphic-design', 'Pelatihan desain grafis untuk membuat karya visual seperti poster, logo, dan media sosial.', 'SMA dan sederajat ke atas', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka', NULL, true, now()),
  ('897be76a-7fca-4ee7-813c-3620c2819878', '82c755b4-34e2-454a-b9b2-5e1d1023788e', 'Video Editing', 'video-editing', 'Program editing video untuk pemula hingga menengah, mencakup cutting, transisi, warna, audio, dan export hasil akhir.', 'SMA dan sederajat ke atas', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka', NULL, true, now()),
  ('69c40baa-bb40-47c0-b8d1-767c0681689e', '82c755b4-34e2-454a-b9b2-5e1d1023788e', 'Digital Marketing', 'digital-marketing', 'Pelatihan pemasaran digital yang mencakup media sosial, iklan online, konten digital, dan analitik pemasaran.', 'SMA dan sederajat ke atas', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka & Online', NULL, true, now()),
  ('6c42b853-1a6f-4ac1-b23f-2abcf04e2e9a', '82c755b4-34e2-454a-b9b2-5e1d1023788e', '3D Digital Animation using Blender', 'animasi-3d-blender', 'Program pembuatan animasi 3D dengan Blender, mulai dari modeling, tekstur, rigging, animasi, hingga rendering.', 'SMA dan sederajat ke atas', 'Pemula', '4 bulan', 16, NULL, 'Tatap muka', NULL, true, now()),
  ('5194d97f-ccba-413f-9b2f-aa1306902714', '82c755b4-34e2-454a-b9b2-5e1d1023788e', 'AutoCAD', 'autocad', 'Pelatihan gambar teknik komputer menggunakan AutoCAD untuk desain arsitektur, teknik sipil, dan mesin.', 'SMA dan sederajat ke atas', 'Pemula', '2 bulan', 8, NULL, 'Tatap muka', NULL, true, now()),
  ('f3b4f809-4d41-4be9-b937-cce6ff2d9938', '9f07800f-befe-47b0-bbee-b918d0d317e9', 'Public Speaking', 'public-speaking', 'Program keterampilan berbicara di depan umum untuk meningkatkan kepercayaan diri, penampilan, dan komunikasi presentasi.', 'SMA dan umur dewasa', 'Pemula', '1 bulan', 4, NULL, 'Tatap muka', NULL, true, now()),
  ('58c874fa-c405-4cf1-866a-a1f4901e872a', '9f07800f-befe-47b0-bbee-b918d0d317e9', 'Hospitality', 'hospitality', 'Pelatihan keterampilan hospitality untuk siap kerja di industri perhotelan dan pariwisata, mencakup pelayanan tamu dan front office.', 'SMA dan sederajat ke atas', 'Pemula', '3 bulan', 12, NULL, 'Tatap muka', NULL, true, now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  course_level = EXCLUDED.course_level,
  duration = EXCLUDED.duration,
  total_meetings = EXCLUDED.total_meetings,
  learning_method = EXCLUDED.learning_method,
  is_active = EXCLUDED.is_active,
  category_id = EXCLUDED.category_id;

COMMIT;

SELECT 'categories' AS seeded_table, count(*) AS total FROM program_categories
UNION ALL
SELECT 'programs', count(*) FROM programs;
