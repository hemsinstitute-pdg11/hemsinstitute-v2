import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { registrations, participants, programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, Smartphone, ArrowLeft, MessageCircle } from "lucide-react";
import { formatIdDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Pendaftaran Berhasil",
  description: "Konfirmasi pendaftaran program pelatihan di Hem's Institute.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getRegistration(code: string) {
  const [reg] = await db.select({
    registrationCode: registrations.registrationCode,
    status: registrations.status,
    learningMethod: registrations.learningMethod,
    createdAt: registrations.createdAt,
    fullName: participants.fullName,
    phone: participants.phone,
    email: participants.email,
    programName: programs.name,
  }).from(registrations)
    .innerJoin(participants, eq(participants.id, registrations.participantId))
    .innerJoin(programs, eq(programs.id, registrations.programId))
    .where(eq(registrations.registrationCode, code));
  return reg;
}

export default async function RegistrationSuccessPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  if (!code) notFound();
  const reg = await getRegistration(code);
  if (!reg) notFound();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    `Halo Admin Hem's Institute.\n\nSaya telah melakukan pendaftaran melalui website Hem's Institute.\n\nNomor Registrasi: ${reg.registrationCode}\nNama: ${reg.fullName}\nProgram: ${reg.programName}\nJadwal: Akan dikonfirmasi admin\nMetode Belajar: ${reg.learningMethod}\n\nMohon informasi mengenai proses selanjutnya.\n\nTerima kasih.`,
  );
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : null;

  return (
    <section className="grid-surface bg-slate-50 px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Card className="overflow-hidden p-0">
          <div className="relative overflow-hidden bg-[#102D53] px-6 py-10 text-center text-white sm:px-10">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,140,40,0.24),transparent_55%)]" />
            <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-200/20"><CheckCircle2 className="size-9" /></span>
            <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">Registrasi diterima</p>
            <h1 className="relative mt-2 font-heading text-2xl font-extrabold sm:text-3xl">Pendaftaran Berhasil</h1>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-blue-100">Terima kasih, {reg.fullName}. Data pendaftaran Anda telah kami terima.</p>
          </div>
          <div className="p-5 sm:p-8">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Nomor Registrasi</p>
              <p className="mt-2 break-all font-heading text-2xl font-extrabold tracking-wide text-brand-navy sm:text-3xl">{reg.registrationCode}</p>
              <p className="mt-2 text-xs text-slate-500">Simpan nomor ini untuk proses konfirmasi.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tanggal Pendaftaran</p><p className="mt-2 text-sm font-semibold text-slate-900">{formatIdDate(reg.createdAt)}</p></div>
              <div className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Program</p><p className="mt-2 text-sm font-semibold text-slate-900">{reg.programName}</p></div>
              <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Metode Belajar</p><p className="mt-2 text-sm font-semibold text-slate-900">{reg.learningMethod}</p></div>
            </div>
            <div className="mt-8">
              <h2 className="font-heading text-lg font-bold text-slate-900">Langkah Selanjutnya</h2>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><Clock className="size-5" /></span><div><p className="font-semibold text-slate-900">Tunggu konfirmasi admin</p><p className="mt-1 text-sm leading-6 text-slate-600">Admin akan memverifikasi data pendaftaran dan menginformasikan jadwal pembelajaran.</p></div></div>
                <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand-navy"><Smartphone className="size-5" /></span><div><p className="font-semibold text-slate-900">Konfirmasi melalui WhatsApp</p><p className="mt-1 text-sm leading-6 text-slate-600">Kirim pesan kepada admin dengan menyertakan nomor registrasi Anda.</p></div></div>
                <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"><MapPin className="size-5" /></span><div><p className="font-semibold text-slate-900">Kunjungi Hem's Institute</p><p className="mt-1 text-sm leading-6 text-slate-600">Anda juga dapat datang ke kantor kami di Padang, Sumatera Barat pada jam operasional.</p></div></div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#168A55] px-5 text-sm font-bold text-white transition hover:bg-[#117346] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"><MessageCircle className="size-5" /> Konfirmasi via WhatsApp</a>}
              <Link href="/" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-brand-navy transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-orange"><ArrowLeft className="size-4" /> Kembali ke Beranda</Link>
            </div>
            <p className="mt-5 text-center text-xs leading-5 text-slate-500">Pesan WhatsApp perlu dikirim secara manual oleh Anda. Website tidak mengirim pesan otomatis.</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
