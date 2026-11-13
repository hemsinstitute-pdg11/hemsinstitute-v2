import { db } from "@/db";
import {
  programCategories,
  programs,
} from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { ArrowRight, ChevronRight, Play, Star, ShieldCheck, Users, Layers } from "lucide-react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Beranda - Hem's Institute Lembaga Pelatihan Padang",
  description:
    "Kembangkan keterampilan Anda dan bangun masa depan Anda dengan program bahasa asing, multimedia, dan keterampilan profesional di Hem's Institute Padang. Daftar sekarang.",
  openGraph: {
    title: "Beranda - Hem's Institute",
    description:
      "Temukan potensi terbaik Anda melalui program bahasa asing dan keterampilan digital bersama Hem's Institute.",
    type: "website",
  },
};

async function getCategoriesWithCounts() {
  return db
    .select({
      id: programCategories.id,
      name: programCategories.name,
      slug: programCategories.slug,
      description: programCategories.description,
      programCount: count(programs.id),
    })
    .from(programCategories)
    .leftJoin(programs, and(eq(programs.categoryId, programCategories.id), eq(programs.isActive, true)))
    .groupBy(programCategories.id, programCategories.name, programCategories.slug, programCategories.description);
}

async function getFeaturedPrograms() {
  return db
    .select({
      id: programs.id,
      name: programs.name,
      slug: programs.slug,
      description: programs.description,
      category: programCategories.name,
      targetAudience: programs.targetAudience,
      price: programs.price,
      imageUrl: programs.imageUrl,
    })
    .from(programs)
    .innerJoin(programCategories, eq(programs.categoryId, programCategories.id))
    .where(and(eq(programs.isActive, true)))
    .limit(6);
}

const categoryKey = (slug: string) => {
  if (slug === "bahasa-asing") return "bahasa";
  if (slug === "multimedia-digital") return "digital";
  return "profesional";
};

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategoriesWithCounts(),
    getFeaturedPrograms(),
  ]);

  return (
    <>
      <Navbar />

      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)] bg-[#0E2E53] opacity-40" />
        <div className="mx-auto max-w-7xl px-6 relative py-20 md:py-28 text-center">
          <span className="inline-block mb-6 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-5 py-1.5 text-xs font-heading font-bold text-brand-orange tracking-wider">
            Terpercaya Sejak 2011
          </span>
          <h1 className="font-heading font-bold text-[clamp(2.25rem,4vw,3.5rem)] text-white leading-[1.15] mb-6 text-shadow-soft">
            Develop Your Skills.<br />
            Build Your Future.
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Temukan potensi terbaik Anda melalui program bahasa asing dan
            keterampilan digital bersama Hem's Institute.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/programs"
              className="rounded-xl bg-brand-orange px-8 py-4 text-lg font-heading font-bold text-white hover:bg-[#D97706] transition-colors shadow-card"
            >
              Jelajahi Program
            </Link>
            <Link
              href="/registration"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-heading font-bold text-white hover:bg-white/20 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-3">Tentang Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Hem's Institute adalah lembaga pendidikan dan pelatihan vokasi
              (LPK) yang berdomisili di Padang, Sumatera Barat. Berdiri sejak
              2011, kami berkomitmen membuka peluang bagi semua lapisan
              masyarakat untuk mengembangkan kemampuan berkomunikasi dalam bahasa
              asing serta menguasai ilmu komputer dan keterampilan digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-brand-orange/10 p-3 text-brand-orange">
                <Layers className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">3 Kategori Program</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Bahasa asing, multimedia &amp; digital, serta keterampilan
                  profesional.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-brand-orange/10 p-3 text-brand-orange">
                <Star className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Untuk Semua Usia</h3>
                <p className="text-sm text-slate-600 mt-1">
                  SD, SMP, SMA, mahasiswa, masyarakat umum, dan profesional.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-brand-orange/10 p-3 text-brand-orange">
                <Users className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Berkelas Nyaman</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Metode pembelajaran tatap muka dan online dengan instruktur
                                terbaik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-3">Kategori Program Unggulan</h2>
            <p className="text-slate-600">
              Pilih program sesuai dengan minat dan tujuan pembelajaran Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                padded
                className="group hover:shadow-card transition-shadow duration-300 cursor-pointer"
              >
                <ImagePlaceholder
                  category={categoryKey(cat.slug)}
                  label={cat.name}
                  className="h-48 mb-4"
                />
                <div className="space-y-2">
                  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 group-hover:text-brand-orange transition-colors">
                    {cat.programCount} Program Aktif
                  </span>
                  <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-brand-orange transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/programs?category=${cat.slug}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy group-hover:text-brand-orange transition-colors"
                  >
                    Lihat Program <ChevronRight className="size-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <ImagePlaceholder category="digital" label="Kelas Belajar" className="h-64 rounded-2xl shadow-card" />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Program Unggulan</h2>
              <p className="text-slate-600 leading-relaxed">
                Berikut adalah beberapa program yang banyak diminati oleh
                peserta kami. Semua informasi program dielola secara dinamis dan
                dapat diverifikasi langsung kepada admin kami.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-navy bg-brand-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0E2E53] transition-colors"
              >
                Lihat Semua Program <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Card key={p.id} padded className="hover:shadow-card transition-shadow duration-300">
                <ImagePlaceholder
                  category={categoryKey(p.slug)}
                  label={p.name}
                  className="h-48 mb-4"
                />
                <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                  {p.category}
                </span>
                <Link href={`/programs/${p.slug}`} className="group">
                  <h3 className="mt-2 font-heading font-bold text-lg text-slate-900 group-hover:text-brand-orange transition-colors leading-tight">
                    {p.name}
                  </h3>
                </Link>
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-auto flex items-baseline gap-1 pt-3 border-t border-slate-100">
                  <span className="font-heading font-bold text-brand-navy">
                    {p.price == null ? "Hubungi Admin untuk Informasi" : `Rp ${Number(p.price).toLocaleString("id-ID")}`}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Mengapa Memilih Hem's Institute?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Terpercaya sejak 2011</p>
                    <p className="text-sm text-slate-600">Lembaga pendidikan yang sudah membina ribuan peserta di Padang.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Metode Pembelajaran Fleksibel</p>
                    <p className="text-sm text-slate-600">Tatap muka, online, atau gabungan sesuai kebutuhan peserta.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Pendaftaran Mudah Online</p>
                    <p className="text-sm text-slate-600">Daftar dalam beberapa menit dan terima nomor registrasi otomatis.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ImagePlaceholder category="bahasa" label="Kegiatan Belajar" className="h-64 rounded-2xl shadow-card" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Testimonial</h2>
            <p className="text-slate-600">
              Keterangan dari peserta dan lulusan kami akan segera ditampilkan
              di sini.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12 text-center">
            <p className="text-lg text-slate-600 font-medium italic">
              "Testimonial siswa dan lulusan Hem's Institute akan segera
              tersedia."
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Data testimoni tidak dibuat-buat dan akan ditampilkan setelah
              kumpul dari peserta yang telah berizin.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9] border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Galeri Kegiatan Belajar</h2>
            <p className="text-slate-600">
              Dokumentasi kegiatan belajar, pelatihan, dan acara instansi.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 text-center">
            <p className="text-lg text-slate-600 font-medium">
              Galeri kegiatan akan segera tersedia.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Kami sedang mengumpulkan dokumentasi kegiatan terbaru.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
            Siap Mengembangkan Keterampilan Anda?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Gabunglah dengan ribuan peserta yang telah meningkatkan keterampilan
            bahasa asing, digital, dan profesional bersama kami.
          </p>
          <Link
            href="/registration"
            className="inline-block rounded-xl bg-brand-orange px-10 py-4 text-lg font-heading font-bold text-white hover:bg-[#D97706] transition-colors shadow-card"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
