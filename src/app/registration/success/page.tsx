import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { registrations, participants, programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { CheckCircle2, Clock, MapPin, Smartphone } from "lucide-react";
import { formatIdDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Pendaftaran Berhasil - Hem's Institute",
  description:
    "Konfirmasi pendaftaran program pelatihan di Hem's Institute.",
};

export const dynamic = "force-dynamic";

async function getRegistration(code: string) {
  const [reg] = await db
    .select({
      registrationCode: registrations.registrationCode,
      status: registrations.status,
      learningMethod: registrations.learningMethod,
      createdAt: registrations.createdAt,
      fullName: participants.fullName,
      phone: participants.phone,
      email: participants.email,
      programName: programs.name,
    })
    .from(registrations)
    .innerJoin(participants, eq(participants.id, registrations.participantId))
    .innerJoin(programs, eq(programs.id, registrations.programId))
    .where(eq(registrations.registrationCode, code));

  return reg;
}

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  if (!code) {
    notFound();
  }

  const reg = await getRegistration(code);

  if (!reg) {
    notFound();
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    `Halo Admin Hem's Institute.\n\nSaya telah melakukan pendaftaran melalui website Hem's Institute.\n\nNomor Registrasi: ${reg.registrationCode}\nNama: ${reg.fullName}\nProgram: ${reg.programName}\nJadwal: Akan dikonfirmasi admin\nMetode Belajar: ${reg.learningMethod}\n\nMohon informasi mengenai proses selanjutnya.\n\nTerima kasih.`,
  );

  return (
    <>
      <section className="py-12 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <Card padded className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-700 w-16 h-16 mb-4">
                <CheckCircle2 className="size-8" />
              </div>
              <h1 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-3">
                Pendaftaran Berhasil
              </h1>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                Terima kasih, <span className="font-semibold">{reg.fullName}</span>.
                Pendaftaran Anda telah kami terima.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Nomor Registrasi
                  </p>
                  <p className="font-heading font-mono font-bold text-brand-navy text-lg">
                    {reg.registrationCode}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tanggal Pendaftaran
                  </p>
                  <p className="text-slate-900 font-medium">
                    {formatIdDate(reg.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Program
                  </p>
                  <p className="text-slate-900 font-medium">{reg.programName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Metode Belajar
                  </p>
                  <p className="text-slate-900 font-medium">
                    {reg.learningMethod}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-3">
                Langkah Selanjutnya
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Tunggu Konfirmasi Admin</p>
                    <p className="text-sm text-slate-600">
                      Admin akan memverifikasi data pendaftaran Anda dan
                      menginformasikan jadwal pembelajaran.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Hubungi kami via WhatsApp</p>
                    <p className="text-sm text-slate-600">
                      Kirim pesan konfirmasi dengan nomor registrasi Anda.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Kunjungi Kami</p>
                    <p className="text-sm text-slate-600">
                      Datang langsung ke kantor kami di Padang, Sumatera Barat
                      pada jam operasional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                href={`https://wa.me/${whatsappNumber ?? ""}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="primary" className="w-full sm:w-auto">
                  <div className="flex items-center gap-2 w-full text-center sm:w-auto block">
                    <Smartphone className="size-5" />
                    Konfirmasi via WhatsApp
                  </div>
                </Button>
              </a>
              <Button variant="outline" className="w-full sm:w-auto">
                <a href="/" className="w-full text-center sm:w-auto block">
                  Kembali ke Beranda
                </a>
              </Button>
            </div>

            <p className="mt-6 text-xs text-slate-500 text-center">
              Catatan: Pesan WhatsApp harus dikirim secara manual oleh Anda.
              Kami tidak mengirim pesan secara otomatis.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
