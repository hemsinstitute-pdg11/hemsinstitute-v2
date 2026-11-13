import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import Link from "next/link";
import { Clock, Newspaper, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Berita & Artikel - Hem's Institute",
  description:
    "Artikel edukasi, tips belajar bahasa, informasi keterampilan digital, dan pengumuman terbaru Hem's Institute.",
};

export default function NewsPage() {
  const articles = [
    {
      title: "Tips Memulai Belajar Bahasa Inggris untuk Pemula",
      excerpt:
        "Beberapa langkah sederhana untuk memulai belajar bahasa Inggris dari nol dengan konsisten.",
      date: "15 Januari 2024",
    },
    {
      title: "Mengenal Desain Grafis: Apa Itu dan Peluang Karirnya",
      excerpt:
        "Pengenalan tentang dunia desain grafis, alat yang dibutuhkan, dan peluang karis di bidang ini.",
      date: "10 Januari 2024",
    },
    {
      title: "Manfaat Belajar Bahasa Korea bagi Pelajar",
      excerpt:
        "Mengapa belajar bahasa Korea dapat membuka peluang pendidikan dan karis bagi pelajar Indonesia.",
      date: "5 Januari 2024",
    },
  ];

  return (
    <>
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper className="size-6 text-brand-orange" />
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-900">
                Berita &amp; Artikel
              </h1>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Artikel edukasi, tips belajar bahasa, informasi keterampilan
              digital, dan pengumuman terbaru dari Hem's Institute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <Card key={i} padded className="hover:shadow-card transition-shadow duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="size-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500">{a.date}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-3 group-hover:text-brand-orange transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {a.excerpt}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors"
                >
                  Baca Selengkapnya <ArrowRight className="size-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-soft">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-4">
              Dapatkan Informasi Terbaru
            </h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Ikuti media sosial kami untuk mendapatkan info program, jadwal
              pendaftaran, dan kegiatan terbaru.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="w-12 h-12 rounded-lg bg-brand-navy flex items-center justify-center text-white text-lg hover:bg-[#0E2E53] transition-colors" aria-label="Instagram">
                IG
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
