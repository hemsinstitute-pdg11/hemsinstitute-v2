import { Metadata } from "next";
import { db } from "@/db";
import { programCategories, programs } from "@/db/schema";
import { eq, and, count, ilike, or } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { ProgramCard } from "@/components/programs/program-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { Search, Filter, BookOpen, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Program & Kursus - Hem's Institute",
  description:
    "Jelajahi katalog program pelatihan Hem's Institute: bahasa asing, multimedia & digital, dan keterampilan profesional di Padang.",
};

export const dynamic = "force-dynamic";

async function getCatalog(params: {
  categorySlug?: string | null;
  audience?: string | null;
  method?: string | null;
  level?: string | null;
  q?: string | null;
}) {
  const conditions: Array<Parameters<typeof and>[0]> = [
    eq(programs.isActive, true),
  ];

  if (params.categorySlug) {
    conditions.push(eq(programCategories.slug, params.categorySlug));
  }

  if (params.audience) {
    conditions.push(ilike(programs.targetAudience, `%${params.audience}%`));
  }

  if (params.method) {
    conditions.push(ilike(programs.learningMethod, `%${params.method}%`));
  }

  if (params.level) {
    conditions.push(ilike(programs.courseLevel, `%${params.level}%`));
  }

  if (params.q) {
    conditions.push(
      or(
        ilike(programs.name, `%${params.q}%`),
        ilike(programs.description, `%${params.q}%`),
      ),
    );
  }

  return db
    .select({
      id: programs.id,
      name: programs.name,
      slug: programs.slug,
      description: programs.description,
      category: programCategories.name,
      categorySlug: programCategories.slug,
      targetAudience: programs.targetAudience,
      courseLevel: programs.courseLevel,
      duration: programs.duration,
      totalMeetings: programs.totalMeetings,
      price: programs.price,
      learningMethod: programs.learningMethod,
      imageUrl: programs.imageUrl,
    })
    .from(programs)
    .innerJoin(programCategories, eq(programs.categoryId, programCategories.id))
    .where(and(...conditions));
}

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    audience?: string;
    method?: string;
    level?: string;
    q?: string;
  }>;
}) {
  const { category, audience, method, level, q } = await searchParams;

  const categories = await db
    .select({
      id: programCategories.id,
      name: programCategories.name,
      slug: programCategories.slug,
      programCount: count(programs.id),
    })
    .from(programCategories)
    .leftJoin(
      programs,
      and(eq(programs.categoryId, programCategories.id), eq(programs.isActive, true)),
    )
    .groupBy(
      programCategories.id,
      programCategories.name,
      programCategories.slug,
    );

  const items = await getCatalog({
    categorySlug: category,
    audience,
    method,
    level,
    q,
  });

  return (
    <>
      <Navbar />

      <section className="py-12 bg-[#F1F5F9] border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-3">Program &amp; Kursus</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Temukan program pelatihan yang sesuai dengan minat, usia, dan
              tujuan pembelajaran Anda. Semua informasi dielola secara dinamis
              dari database kami.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-soft">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 focus-within:ring-2 focus-within:ring-brand-orange focus-within:border-brand-orange transition-colors">
                  <Search className="size-4 text-slate-400" />
                  <input
                    id="search"
                    type="search"
                    placeholder="Cari program kursus..."
                    className="w-full bg-transparent text-slate-900 outline-none placeholder-slate-400"
                    defaultValue={q ?? ""}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Cari nama program atau kata kunci
                </p>
              </div>
              <button className="rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0E2E53] transition-colors">
                <Filter className="size-4 mr-2" />
                Filter
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <BookOpen className="size-4 text-slate-400" />
                <span>Kategori</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="size-4 text-slate-400" />
                <span>Target Peserta</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="size-4 text-slate-400" />
                <span>Metode Belajar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="size-4 text-slate-400" />
                <span>Tingkat Kursus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-slate-900 mb-1">
                Daftar Program ({items.length})
              </h2>
              <p className="text-sm text-slate-500">
                Semua program yang tersedia untuk pendaftaran.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-medium text-slate-900">Urutkan:</span>
              <select className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand-orange">
                <option>Terbaru</option>
                <option>Nama (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p) => (
              <ProgramCard
                key={p.id}
                id={p.id}
                name={p.name}
                category={p.category}
                slug={p.slug}
                description={p.description}
                targetAudience={p.targetAudience}
                price={p.price}
                categoryKey={
                  p.categorySlug === "bahasa-asing"
                    ? "bahasa"
                    : p.categorySlug === "multimedia-digital"
                    ? "digital"
                    : "profesional"
                }
              />
            ))}
          </div>

          {items.length === 0 && (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-soft">
              <p className="text-lg text-slate-600 mb-3">
                Program yang Anda cari tidak ditemukan.
              </p>
              <p className="text-sm text-slate-500">
                Coba ubah kata kunci pencarian atau hapus beberapa filter.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
