import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { Image as ImageIcon, Camera, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan belajar, pelatihan, dan acara di Hem's Institute Padang.",
};

export default function GalleryPage() {
  const placeholders = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <PageHero eyebrow="Cerita Kegiatan Kami" title="Galeri Hem's Institute" description="Dokumentasi kegiatan belajar, pelatihan, dan acara instansi di Hem's Institute." icon={<Camera className="size-3.5" />} />
      <section className="grid-surface bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Dokumentasi</p><h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">Kegiatan pembelajaran</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Galeri foto resmi akan ditampilkan setelah dokumentasi kegiatan tersedia.</p></div>
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500"><Clock className="size-3.5" /> Dokumentasi diperbarui berkala</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((i) => (
              <Card key={i} padded={false} className="group overflow-hidden">
                <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgba(242,140,40,0.16),transparent_45%),linear-gradient(135deg,#eaf1fb,#f8fafc)] p-6 text-center">
                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(23,59,112,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(23,59,112,0.5)_1px,transparent_1px)] [background-size:32px_32px]" />
                  <span className="relative mb-3 grid size-14 place-items-center rounded-2xl bg-white text-brand-navy shadow-soft transition-transform duration-300 group-hover:-translate-y-1"><ImageIcon className="size-7" /></span>
                  <p className="relative font-semibold text-slate-700">Kegiatan Belajar {i}</p>
                  <p className="relative mt-1 text-xs text-slate-500">Foto akan segera tersedia</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
