import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { programs, programCategories, courseSchedules } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Users, MapPin, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [program] = await db
    .select({
      id: programs.id,
      name: programs.name,
      slug: programs.slug,
      description: programs.description,
      category: programCategories.name,
    })
    .from(programs)
    .innerJoin(programCategories, eq(programs.categoryId, programCategories.id))
    .where(eq(programs.slug, params.slug));

  if (!program) {
    return { title: "Program Tidak Ditemukan - Hem's Institute" };
  }

  return {
    title: `${program.name} - Hem's Institute`,
    description: program.description,
  };
}

async function getProgram(slug: string) {
  const [program] = await db
    .select({
      id: programs.id,
      name: programs.name,
      slug: programs.slug,
      description: programs.description,
      category: programCategories.name,
      categorySlug: programCategories.slug,
      targetAudience: programs.targetAudience,
      courseLevel: programs.courseLevel,
      duration: programs.duration,
      totalMeetings: programs.totalMeetings,
      price: programs.price,
      learningMethod: programs.learningMethod,
      imageUrl: programs.imageUrl,
      isActive: programs.isActive,
    })
    .from(programs)
    .innerJoin(programCategories, eq(programs.categoryId, programCategories.id))
    .where(eq(programs.slug, slug));

  const schedules = await db
    .select({
      id: courseSchedules.id,
      day: courseSchedules.day,
      startTime: courseSchedules.startTime,
      endTime: courseSchedules.endTime,
      learningMethod: courseSchedules.learningMethod,
      capacity: courseSchedules.capacity,
      isActive: courseSchedules.isActive,
    })
    .from(courseSchedules)
    .where(
      and(eq(courseSchedules.programId, program!.id), eq(courseSchedules.isActive, true)),
    );

  return { program, schedules };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { program, schedules } = await getProgram(slug);

  if (!program) {
    notFound();
  }

  const priceLabel =
    program.price == null
      ? "Hubungi Admin untuk Informasi"
      : `Rp ${Number(program.price).toLocaleString("id-ID")}`;

  const faqs = [
    {
      q: "Bagaimana cara mendaftar?",
      a: "Anda dapat mendaftar melalui halaman pendaftaran di website ini, atau menghubungi admin kami melalui WhatsApp.",
    },
    {
      q: "Apakah biaya kursus sudah termasuk materi?",
      a: "Informasi lengkap mengenai biaya dan apa yang termasuk akan dikonfirmasi oleh admin setelah pendaftaran.",
    },
    {
      q: "Apakah ada jadwal fleksibel?",
      a: "Kami menyediakan beberapa opsi jadwal dan metode belajar (tatap muka, online, atau gabungan).",
    },
    {
      q: "Apakah peserta mendapatkan sertifikat?",
      a: "Informasi mengenai sertifikat akan disampaikan oleh admin setelah kelulusan program.",
    },
  ];

  return (
    <>
      <section className="relative bg-slate-900/50 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="mx-auto max-w-7xl px-6 relative py-16 md:py-24 text-center">
          <span className="inline-block mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1 text-xs font-heading font-bold text-brand-orange tracking-wider">
            {program.category}
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-[1.2] mb-6">
            {program.name}
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
            {program.description}
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-slate-300 mt-8">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {program.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {program.targetAudience}
            </span>
            <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                Padang, Sumatera Barat
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Card padded>
            <CardHeader>
              <ImagePlaceholder
                category={
                  program.categorySlug === "bahasa-asing"
                    ? "bahasa"
                    : program.categorySlug === "multimedia-digital"
                    ? "digital"
                    : "profesional"
                }
                label={program.name}
                className="h-56 mb-4 rounded-2xl"
              />
              <CardTitle>{program.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                <span>{program.category}</span>
                <span className="w-px h-3 bg-slate-300" />
                <span>{program.courseLevel}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-slate-900">Deskripsi Program</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {program.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-slate-900">Detail Program</h3>
                  <table className="w-full text-left text-sm text-slate-600 divide-y divide-slate-100">
                    <tbody>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Kategori</td>
                        <td className="py-2">{program.category}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Target Peserta</td>
                        <td className="py-2">{program.targetAudience}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Tingkat</td>
                        <td className="py-2">{program.courseLevel}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Durasi</td>
                        <td className="py-2">{program.duration}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Jumlah Pertemuan</td>
                        <td className="py-2">
                          {program.totalMeetings ?? "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Biaya</td>
                        <td className="py-2 font-bold text-brand-navy">
                          {priceLabel}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-900">Metode Belajar</td>
                        <td className="py-2">
                          {program.learningMethod ?? "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">Jadwal Tersedia</h3>
                {schedules.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schedules.map((s) => (
                      <Card key={s.id} padded className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-slate-900">
                              {s.day}, {formatTime(s.startTime)} - {formatTime(s.endTime)}
                            </p>
                            <p className="text-xs text-slate-500">
                              {s.learningMethod}
                            </p>
                          </div>
                          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            Kuota: {s.capacity}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                    <p className="text-slate-600">
                      Belum ada jadwal yang tersedia untuk program ini.
                      Silakan hubungi admin untuk informasi jadwal terbaru.
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">Fasilitas &amp; Manfaat</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 sm:list-outside">
                  <li>Panduan pembelajaran dari instruktur terbaik kami.</li>
                  <li>Materi pembelajaran yang disesuaikan dengan tingkat peserta.</li>
                  <li>Dukungan administrasi pendaftaran melalui WhatsApp.</li>
                  <li>Akses ke komunitas peserta Hem's Institute.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">Pertanyaan Umum (FAQ)</h3>
                <div className="space-y-3">
                  {faqs.map((f, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-slate-900 mb-1">Q. {f.q}</p>
                      <p className="text-sm text-slate-600">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-bold text-brand-navy text-lg">{priceLabel}</span>
                <div className="flex gap-3">
                  <Link href="/registration" className="flex-1">
                    <Button variant="primary" className="w-full">
                      Daftar Sekarang <ChevronRight className="size-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function formatTime(timeStr: string | null | undefined) {
  if (!timeStr) return "-";
  const [h, m] = String(timeStr).split(":");
  return `${h.padStart(2, "0")}:${m}`;
}
