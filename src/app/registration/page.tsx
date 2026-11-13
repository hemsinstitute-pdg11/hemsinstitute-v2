import { Metadata } from "next";
import { db } from "@/db";
import { programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RegistrationForm } from "@/components/registration/form";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Pendaftaran Online - Hem's Institute",
  description:
    "Daftar program pelatihan di Hem's Institute Padang secara online. Isi formulir pendaftaran dan terima nomor registrasi otomatis.",
};

export const dynamic = "force-dynamic";

async function getPrograms() {
  return db
    .select({
      id: programs.id,
      name: programs.name,
      slug: programs.slug,
      category: programs.targetAudience,
    })
    .from(programs)
    .where(eq(programs.isActive, true));
}

export default async function RegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;

  const allPrograms = await getPrograms();

  const programOptions = allPrograms.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
  }));

  return (
    <>
      <Navbar />

      <section className="py-8 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-3">
              Pendaftaran Online
            </h1>
            <p className="text-slate-600 max-w-xl">
              Isi formulir di bawah ini untuk mendaftar program pelatihan di
              Hem's Institute. Setelah pengiriman berhasil, Anda akan menerima
              nomor registrasi dan dapat menghubungi kami melalui WhatsApp.
            </p>
          </div>

          {program && !programOptions.find((p) => p.slug === program) && (
            <Card padded className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm text-amber-800">
                Program yang Anda pilih tidak tersedia. Silakan pilih program
                lain di formulir pendaftaran.
              </p>
            </Card>
          )}

          <RegistrationForm programs={programOptions} />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
