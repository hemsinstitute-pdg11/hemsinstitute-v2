import type { Metadata } from "next";
import { db } from "@/db";
import { programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RegistrationForm } from "@/components/registration/form";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { ClipboardCheck, ShieldCheck, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pendaftaran Online",
  description: "Daftar program pelatihan di Hem's Institute Padang secara online. Isi formulir pendaftaran dan terima nomor registrasi otomatis.",
};

export const dynamic = "force-dynamic";

async function getPrograms() {
  return db.select({
    id: programs.id,
    name: programs.name,
    slug: programs.slug,
    category: programs.targetAudience,
  }).from(programs).where(eq(programs.isActive, true));
}

export default async function RegistrationPage({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const { program } = await searchParams;
  const allPrograms = await getPrograms();
  const programOptions = allPrograms.map((p) => ({ id: p.id, name: p.name, slug: p.slug, category: p.category }));

  return (
    <>
      <PageHero eyebrow="Mulai Perjalanan Belajar" title="Pendaftaran Online" description="Lengkapi data diri dan pilih program pelatihan. Setelah pendaftaran berhasil, Anda akan menerima nomor registrasi untuk konfirmasi dengan admin." icon={<ClipboardCheck className="size-3.5" />} compact />
      <section className="grid-surface bg-slate-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand-navy"><ClipboardCheck className="size-5" /></span><div><p className="text-sm font-bold text-slate-900">Isi Formulir</p><p className="text-xs text-slate-500">Lengkapi data peserta</p></div></div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange"><ShieldCheck className="size-5" /></span><div><p className="text-sm font-bold text-slate-900">Periksa Data</p><p className="text-xs text-slate-500">Tinjau sebelum dikirim</p></div></div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><MessageCircle className="size-5" /></span><div><p className="text-sm font-bold text-slate-900">Konfirmasi Admin</p><p className="text-xs text-slate-500">Lanjutkan melalui WhatsApp</p></div></div>
          </div>
          {program && !programOptions.find((p) => p.slug === program) && (
            <Card className="mx-auto mb-6 max-w-4xl border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-6 text-amber-800">Program yang Anda pilih tidak tersedia. Silakan pilih program lain di formulir pendaftaran.</p>
            </Card>
          )}
          <RegistrationForm programs={programOptions} />
        </div>
      </section>
    </>
  );
}
