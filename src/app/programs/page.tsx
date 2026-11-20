import type { Metadata } from "next";
import { db } from "@/db";
import { programCategories, programs } from "@/db/schema";
import { eq, and, count, ilike, or } from "drizzle-orm";
import { ProgramCard } from "@/components/programs/program-card";
import { PageHero } from "@/components/ui/page-hero";
import { Search, SlidersHorizontal, BookOpen, Users, Clock3, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Program & Kursus",
  description: "Jelajahi tujuh program Hem's Institute dalam Language Class dan Computer Class, dengan English Class sebagai program unggulan.",
};

export const dynamic = "force-dynamic";

async function getCatalog(params: { categorySlug?: string | null; audience?: string | null; method?: string | null; level?: string | null; q?: string | null }) {
  const conditions: Array<Parameters<typeof and>[0]> = [eq(programs.isActive, true)];
  if (params.categorySlug) conditions.push(eq(programCategories.slug, params.categorySlug));
  if (params.audience) conditions.push(ilike(programs.targetAudience, `%${params.audience}%`));
  if (params.method) conditions.push(ilike(programs.learningMethod, `%${params.method}%`));
  if (params.level) conditions.push(ilike(programs.courseLevel, `%${params.level}%`));
  if (params.q) conditions.push(or(ilike(programs.name, `%${params.q}%`), ilike(programs.description, `%${params.q}%`)));

  return db.select({
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
  }).from(programs)
    .innerJoin(programCategories, eq(programs.categoryId, programCategories.id))
    .where(and(...conditions));
}

export default async function ProgramsPage({ searchParams }: { searchParams: Promise<{ category?: string; audience?: string; method?: string; level?: string; q?: string }> }) {
  const { category, audience, method, level, q } = await searchParams;
  const [categories, items] = await Promise.all([
    db.select({ id: programCategories.id, name: programCategories.name, slug: programCategories.slug, programCount: count(programs.id) })
      .from(programCategories)
      .leftJoin(programs, and(eq(programs.categoryId, programCategories.id), eq(programs.isActive, true)))
      .groupBy(programCategories.id, programCategories.name, programCategories.slug),
    getCatalog({ categorySlug: category, audience, method, level, q }),
  ]);

  return (
    <>
      <PageHero eyebrow="Temukan Kelas yang Tepat" title="Program & Kursus" description="Pilih kelas bahasa atau komputer sesuai minat dan tujuan belajar Anda. English Class menjadi program unggulan Hem’s Institute." icon={<BookOpen className="size-3.5" />} />
      <section className="grid-surface bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form action="/programs" method="GET" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-brand-orange"><SlidersHorizontal className="size-5" /></span>
              <div><h2 className="font-heading text-lg font-bold text-slate-900">Temukan Program</h2><p className="text-xs text-slate-500">Gunakan pencarian dan filter untuk mempersempit pilihan.</p></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_auto]">
              <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-orange-100">
                <Search className="size-4 shrink-0 text-slate-400" />
                <input name="q" type="search" placeholder="Cari nama program..." defaultValue={q ?? ""} className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" />
              </label>
              <label className="flex min-h-12 flex-col justify-center rounded-xl border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-500 focus-within:border-brand-orange">
                Kategori
                <select name="category" defaultValue={category ?? ""} className="w-full bg-transparent text-sm text-slate-800 outline-none">
                  <option value="">Semua kategori</option>
                  {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </label>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#D97706] focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2">Cari <Search className="size-4" /></button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {categories.map((c) => (
                <a key={c.id} href={category === c.slug ? "/programs" : `/programs?category=${encodeURIComponent(c.slug)}`} className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition ${category === c.slug ? "border-brand-navy bg-blue-50 text-brand-navy" : "border-slate-200 bg-white text-slate-600 hover:border-brand-orange hover:text-brand-orange"}`}>
                  {c.name}<span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px]">{c.programCount}</span>
                </a>
              ))}
            </div>
          </form>
        </div>
      </section>
      <section className="grid-surface bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Katalog Pelatihan</p><h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">Daftar Program <span className="text-brand-orange">({items.length})</span></h2><p className="mt-2 text-sm text-slate-500">Program aktif yang tersedia untuk pendaftaran.</p></div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500"><span className="inline-flex items-center gap-1.5"><Users className="size-3.5" /> Pilihan target peserta</span><span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" /> Detail jadwal per program</span></div>
          </div>
          {items.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => <ProgramCard key={p.id} id={p.id} name={p.name} category={p.category} slug={p.slug} description={p.description} targetAudience={p.targetAudience} price={p.price} categoryKey={p.categorySlug === "language-class" ? "bahasa" : "digital"} />)}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-brand-navy shadow-soft"><GraduationCap className="size-7" /></span>
              <h3 className="mt-5 font-heading text-xl font-bold text-slate-900">Program belum ditemukan</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Coba ubah kata kunci atau filter pencarian untuk melihat program lainnya.</p>
              <a href="/programs" className="mt-5 inline-flex min-h-10 items-center rounded-xl bg-brand-navy px-4 text-sm font-semibold text-white">Reset Filter</a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
