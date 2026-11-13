import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { GraduationCap, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Instruktur - Hem's Institute",
  description:
    "Profil instruktur Hem's Institute yang siap membimbing Anda dalam belajar bahasa asing, multimedia, dan keterampilan profesional.",
};

export default function InstructorsPage() {
  const instructors = [
    {
      name: "Instruktur Bahasa Inggris",
      role: "Pembina Bahasa Asing",
      desc: "Bimbingan pembelajaran bahasa Inggris untuk pemula hingga menengah.",
    },
    {
      name: "Instruktur Desain Grafis",
      role: "Pembina Multimedia",
      desc: "Mengajarkan keterampilan desain grafis dengan pendekatan praktis dan industri.",
    },
    {
      name: "Instruktur Komputer",
      role: "Pembina Keterampilan Digital",
      desc: "Pelatihan operasional komputer dan aplikasi perkantoran untuk pemula.",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="size-6 text-brand-orange" />
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-900">
                Instruktur Kami
              </h1>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Tim instruktur Hem's Institute siap membimbing Anda dalam
              mengembangkan keterampilan bahasa asing, multimedia, dan
              profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {instructors.map((inst, i) => (
              <Card key={i} padded className="text-center hover:shadow-card transition-shadow duration-300">
                <div className="mx-auto rounded-full border border-slate-200 bg-slate-100 p-3 text-slate-500 mb-4">
                  <Users className="size-10" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
                  {inst.name}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{inst.role}</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {inst.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-soft">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-4">
              Bergabunglah dengan Kami
            </h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Pelajari langsung dari instruktur berpengalaman dan dapatkan
              keterampilan yang siap digunakan di dunia kerja.
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
