import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { MapPin, Smartphone, Mail, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Hem's Institute Padang melalui WhatsApp, email, atau kunjungi kami di Padang, Sumatera Barat.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kami Siap Membantu"
        title="Mari Terhubung dengan Hem's Institute"
        description="Hubungi kami untuk informasi program, jadwal, dan pendaftaran. Tim kami siap membantu Anda menemukan program yang tepat."
        icon={<MapPin className="size-3.5" />}
      />
      <section className="grid-surface bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="grid gap-5">
            <Card className="p-6 sm:p-7">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Informasi Kontak</p>
              <h2 className="mb-6 font-heading text-xl font-bold text-slate-900 sm:text-2xl">Kunjungi atau hubungi kami</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><MapPin className="size-5" /></span>
                  <div><h3 className="font-semibold text-slate-900">Alamat</h3><p className="mt-1 text-sm leading-6 text-slate-600">Hem’s Institute Padang, Jl. Azizi No.32, Andalas, Kec. Padang Timur, Kota Padang, Sumatera Barat</p></div>
                </div>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><Smartphone className="size-5" /></span>
                  <div><h3 className="font-semibold text-slate-900">WhatsApp Admin</h3><a href="https://wa.me/6285376534343" className="mt-1 inline-block text-sm text-brand-navy hover:underline">085376534343</a></div>
                </div>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><Mail className="size-5" /></span>
                  <div><h3 className="font-semibold text-slate-900">Email</h3><a href="mailto:hems.institute@gmail.com" className="mt-1 inline-block text-sm text-slate-600 hover:underline">hems.institute@gmail.com</a></div>
                </div>
              </div>
            </Card>
            <Card className="p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-brand-navy"><Clock className="size-5" /></span>
                <h2 className="font-heading text-xl font-bold text-slate-900">Jam Operasional</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-slate-600">Senin - Minggu</dt><dd className="font-semibold text-slate-900">09.00 - 20.30 WIB</dd></div>
              </dl>
            </Card>
          </div>
          <div className="grid gap-5">
            <Card padded={false} className="overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="font-heading text-lg font-bold text-slate-900">Lokasi Hem's Institute</h2>
                <p className="mt-1 text-sm text-slate-600">Jl. Azizi No.32, Andalas, Kec. Padang Timur, Kota Padang, Sumatera Barat</p>
              </div>
              <iframe
                title="Peta lokasi Hem's Institute Padang"
                src="https://www.google.com/maps?q=-0.941620,100.379970&z=17&output=embed"
                className="h-[320px] w-full sm:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <p className="text-xs text-slate-500">Koordinat: -0.941620, 100.379970</p>
                <a
                  href="https://www.google.com/maps?q=-0.941620,100.379970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand-navy transition-colors hover:text-brand-orange"
                >
                  Buka di Google Maps
                </a>
              </div>
            </Card>
            <Card className="flex flex-col items-start justify-between gap-5 bg-white p-6 text-slate-900 sm:flex-row sm:items-center sm:p-8">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Mulai langkah Anda</p><h2 className="mt-2 font-heading text-xl font-bold">Siap memilih program?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Lihat pilihan kursus dan daftarkan diri secara online.</p></div>
              <Link href="/registration" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-bold text-white transition hover:bg-[#D97706] focus-visible:ring-2 focus-visible:ring-brand-orange">Daftar Sekarang <ArrowRight className="size-4" /></Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
