import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { Image, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri - Hem's Institute",
  description:
    "Dokumentasi kegiatan belajar, pelatihan, dan acara di Hem's Institute Padang.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image className="size-6 text-brand-orange" />
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-900">
                Galeri Kegiatan
              </h1>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dokumentasi kegiatan belajar, pelatihan, dan acara instansi di
              Hem's Institute.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-soft">
            <p className="text-lg text-slate-600 font-medium mb-4">
              Galeri kegiatan akan segera tersedia.
            </p>
            <p className="text-sm text-slate-500">
              Kami sedang mengumpulkan dokumentasi kegiatan terbaru dari
              pembelajaran dan acara instansi.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} padded={false}>
                <div className="aspect-video rounded-2xl border border-slate-200 bg-slate-200 flex items-center justify-center overflow-hidden">
                  <Image className="size-16 text-slate-400" />
                  <span className="absolute bottom-2 left-2 bg-slate-900/70 px-3 py-1 rounded text-xs text-white font-medium">
                    Kegiatan Belajar {i}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
