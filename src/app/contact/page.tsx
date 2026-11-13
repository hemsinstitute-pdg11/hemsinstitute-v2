import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { MapPin, Smartphone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak - Hem's Institute",
  description:
    "Hubungi Hem's Institute Padang melalui WhatsApp, email, atau kunjungi kami di lokasi kami di Padang, Sumatera Barat.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="size-6 text-brand-orange" />
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-900">
                Kontak Kami
              </h1>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Hubungi kami untuk informasi program, jadwal, dan pendaftaran.
              Kami siap membantu Anda.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <Card padded>
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">Alamat Kantor</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-slate-600 leading-relaxed">
                    Padang, Sumatera Barat, Indonesia
                  </p>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Smartphone className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-slate-600 leading-relaxed">
                    WhatsApp Admin:
                    <span className="text-brand-navy font-semibold block mt-1">
                      628xxxxxxxxxx
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-slate-600 leading-relaxed">
                    info@hemsinstitute.ac.id
                  </p>
                </div>
              </Card>

              <Card padded>
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">Jam Operasional</h2>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Senin - Jumat</span>
                    <span className="font-medium text-slate-900">08.00 - 16.00 WIB</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Sabtu</span>
                    <span className="font-medium text-slate-900">08.00 - 12.00 WIB</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Minggu</span>
                    <span className="font-medium text-slate-900">Tutup</span>
                  </li>
                </ul>
              </Card>

              <Card padded>
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">Ikuti Kami</h2>
                <p className="text-slate-600 mb-4">
                  Dapatkan informasi terbaru mengenai program dan pendaftaran
                  melalui media sosial kami.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-11 h-11 rounded-lg bg-brand-navy flex items-center justify-center text-white text-sm font-medium hover:bg-[#0E2E53] transition-colors" aria-label="Instagram">
                    IG
                  </a>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card padded={false}>
                <div className="aspect-video rounded-2xl border border-slate-200 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <MapPin className="size-16 text-slate-400 mb-3" />
                    <p className="text-slate-500 text-sm font-medium">
                      Lokasi kami akan segera ditampilkan melalui Google Maps
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-soft">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-4">
              Siap Mendaftar?
            </h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Isi formulir pendaftaran online dan kami akan segera
              menghubungi Anda melalui WhatsApp.
            </p>
            <a href="/registration" className="inline-block rounded-xl bg-brand-navy px-8 py-3 text-sm font-bold text-white hover:bg-[#0E2E53] transition-colors">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
