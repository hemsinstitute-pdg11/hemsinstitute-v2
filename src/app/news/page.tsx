import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { Clock, Newspaper, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Berita & Artikel",
  description: "Artikel edukasi, tips belajar bahasa, informasi keterampilan digital, dan pengumuman terbaru Hem's Institute.",
};

export default function NewsPage() {
  const articles = [
    { title: "Tips Memulai Belajar Bahasa Inggris untuk Pemula", excerpt: "Beberapa langkah sederhana untuk memulai belajar bahasa Inggris dari nol dengan konsisten.", date: "15 Januari 2024", category: "Bahasa Asing" },
    { title: "Mengenal Desain Grafis: Apa Itu dan Peluang Karirnya", excerpt: "Pengenalan tentang dunia desain grafis, alat yang dibutuhkan, dan peluang karir di bidang ini.", date: "10 Januari 2024", category: "Multimedia" },
    { title: "Manfaat Belajar Bahasa Korea bagi Pelajar", excerpt: "Mengapa belajar bahasa Korea dapat membuka peluang pendidikan dan karir bagi pelajar Indonesia.", date: "5 Januari 2024", category: "Bahasa Asing" },
  ];
  return (
    <>
      <PageHero eyebrow="Wawasan & Informasi" title="Berita dan Artikel" description="Artikel edukasi, tips belajar bahasa, informasi keterampilan digital, dan pengumuman dari Hem's Institute." icon={<Newspaper className="size-3.5" />} />
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Pusat Informasi</p><h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">Baca dan temukan inspirasi</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Informasi seputar pembelajaran, keterampilan, dan pengembangan diri.</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.title} className="group flex h-full flex-col overflow-hidden p-0">
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_20%_15%,rgba(242,140,40,0.18),transparent_45%),linear-gradient(135deg,#eaf1fb,#f8fafc)]">
                  <span className="grid size-16 place-items-center rounded-2xl bg-white text-brand-navy shadow-card transition-transform duration-300 group-hover:-translate-y-1"><BookOpen className="size-8" /></span>
                  <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-bold text-brand-navy">{article.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500"><Clock className="size-3.5" />{article.date}</div>
                  <h3 className="font-heading text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-orange">{article.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-400">Konten segera tersedia <ArrowRight className="size-4" /></span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-soft sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-slate-900">Dapatkan informasi terbaru</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">Ikuti media sosial Hem's Institute untuk informasi program, jadwal pendaftaran, dan kegiatan terbaru.</p>
            <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-navy px-5 text-sm font-bold text-white transition hover:bg-[#0E2E53]">Hubungi Kami <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
