import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { GraduationCap, Users, ArrowRight, BookOpen, Laptop, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Instruktur",
  description: "Profil instruktur Hem's Institute yang siap membimbing Anda dalam belajar bahasa asing, multimedia, dan keterampilan profesional.",
};

export default function InstructorsPage() {
  const instructors = [
    { name: "Instruktur Bahasa Inggris", role: "Pembina Bahasa Asing", desc: "Bimbingan pembelajaran bahasa Inggris untuk pemula hingga menengah.", icon: BookOpen, area: "Bahasa Asing" },
    { name: "Instruktur Desain Grafis", role: "Pembina Multimedia", desc: "Mengajarkan keterampilan desain grafis dengan pendekatan praktis dan industri.", icon: Palette, area: "Multimedia" },
    { name: "Instruktur Komputer", role: "Pembina Keterampilan Digital", desc: "Pelatihan operasional komputer dan aplikasi perkantoran untuk pemula.", icon: Laptop, area: "Keterampilan Digital" },
  ];
  return (
    <>
      <PageHero eyebrow="Belajar dengan Bimbingan" title="Kenali Tim Instruktur Kami" description="Tim instruktur Hem's Institute siap membimbing Anda dalam mengembangkan keterampilan bahasa asing, multimedia, dan profesional." icon={<GraduationCap className="size-3.5" />} />
      <section className="grid-surface bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Tim Pengajar</p><h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">Pendamping proses belajar Anda</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Kenali bidang pembelajaran yang didukung oleh tim instruktur Hem's Institute.</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {instructors.map((inst) => {
              const Icon = inst.icon;
              return (
                <Card key={inst.name} className="group flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-brand-navy transition-colors group-hover:bg-orange-50 group-hover:text-brand-orange"><Icon className="size-7" /></span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">{inst.area}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">{inst.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-orange">{inst.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{inst.desc}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500"><Users className="size-4" /> Tim pengajar Hem's Institute</div>
                </Card>
              );
            })}
          </div>
          <div className="mt-10 rounded-3xl bg-[#102D53] p-7 text-white sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-200">Mulai belajar</p><h2 className="mt-2 font-heading text-2xl font-bold">Kembangkan keterampilan bersama kami</h2><p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">Pilih program yang sesuai dengan minat dan tujuan pembelajaran Anda.</p></div>
              <Link href="/registration" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-bold text-white transition hover:bg-[#D97706]">Daftar Sekarang <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
