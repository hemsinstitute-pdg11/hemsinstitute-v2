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
                  <div><h3 className="font-semibold text-slate-900">Alamat</h3><p className="mt-1 text-sm leading-6 text-slate-600">Padang, Sumatera Barat, Indonesia</p></div>
                </div>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><Smartphone className="size-5" /></span>
                  <div><h3 className="font-semibold text-slate-900">WhatsApp Admin</h3><p className="mt-1 text-sm text-brand-navy">628xxxxxxxxxx</p></div>
                </div>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><Mail className="size-5" /></span>
                  <div><h3 className="font-semibold text-slate-900">Email</h3><p className="mt-1 text-sm text-slate-600">info@hemsinstitute.ac.id</p></div>
                </div>
              </div>
            </Card>
            <Card className="p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-brand-navy"><Clock className="size-5" /></span>
                <h2 className="font-heading text-xl font-bold text-slate-900">Jam Operasional</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt className="text-slate-600">Senin - Jumat</dt><dd className="font-semibold text-slate-900">08.00 - 16.00 WIB</dd></div>
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt className="text-slate-600">Sabtu</dt><dd className="font-semibold text-slate-900">08.00 - 12.00 WIB</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-600">Minggu</dt><dd className="font-semibold text-slate-900">Tutup</dd></div>
              </dl>
            </Card>
          </div>
          <div className="grid gap-5">
            <Card padded={false} className="overflow-hidden">
              <div className="flex min-h-[320px] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,rgba(242,140,40,0.14),transparent_55%),linear-gradient(135deg,#eff6ff,#f8fafc)] p-8 text-center sm:min-h-[400px]">
                <span className="mb-4 grid size-16 place-items-center rounded-2xl bg-white text-brand-orange shadow-card"><MapPin className="size-8" /></span>
                <h2 className="font-heading text-xl font-bold text-slate-900">Hem's Institute</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">Padang, Sumatera Barat, Indonesia</p>
                <p className="mt-5 max-w-sm text-xs leading-5 text-slate-500">Peta lokasi detail akan ditambahkan setelah alamat kantor lengkap tersedia.</p>
              </div>
            </Card>
            <Card className="flex flex-col items-start justify-between gap-5 bg-[#102D53] p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-200">Mulai langkah Anda</p><h2 className="mt-2 font-heading text-xl font-bold">Siap memilih program?</h2><p className="mt-2 text-sm leading-6 text-blue-100">Lihat pilihan kursus dan daftarkan diri secara online.</p></div>
              <Link href="/registration" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-bold text-white transition hover:bg-[#D97706] focus-visible:ring-2 focus-visible:ring-white">Daftar Sekarang <ArrowRight className="size-4" /></Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
