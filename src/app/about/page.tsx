import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";
import { BookOpen, Building2, GraduationCap, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami - Hem's Institute",
  description:
    "Profil, sejarah, visi, dan misi Hem's Institute, lembaga pendidikan dan pelatihan vokasi di Padang sejak 2011.",
};

export default function AboutPage() {
  const values = [
    { icon: ShieldCheck, label: "Profesional", desc: "Kelola pendidikan dengan standar layanan yang terpercaya." },
    { icon: Users, label: "Modern", desc: "Gunakan metode dan teknologi pembelajaran yang relevan dengan zaman." },
    { icon: GraduationCap, label: "Edukatif", desc: "Fokus pada pertumbuhan keterampilan yang bermanfaat bagi peserta." },
    { icon: ShieldCheck, label: "Inovatif", desc: "Terus mengembangkan program sesuai kebutuhan industri dan dunia kerja." },
    { icon: BookOpen, label: "Friendly", desc: "Mudah diakses oleh semua kalangan, termasuk pemula dalam teknologi." },
  ];

  const facilities = [
    "Ruang kelas nyaman dan kondusif",
    "Peralatan pembelajaran yang memadai",
    "Akses internet untuk pembelajaran digital",
    "Metode tatap muka dan online",
    "Dukungan administrasi pendaftaran online",
  ];

  return (
    <>
      <section className="py-16 bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="inline-block mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1 text-xs font-heading font-bold text-brand-orange tracking-wider">
            Profil Institusi
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-[1.2] mb-6">Tentang Hem's Institute</h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Lembaga pendidikan dan pelatihan vokasi terkemuka di Padang,
            Sumatera Barat yang berdiri sejak 2011.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Sejarah Singkat</h2>
              <p className="text-slate-600 leading-relaxed">
                Hem's Institute didirikan pada tahun 2011 di Padang, Sumatera
                Barat sebagai Lembaga Pendidikan dan Pelatihan Vokasi (LPK).
                Sejak awal, kami berfokus pada pengembangan kemampuan
                berkomunikasi dalam bahasa asing dan penguasaan ilmu komputer
                bagi masyarakat.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Seiring berkembangnya kebutuhan akan keterampilan digital,
                kami memperluas program ke multimedia, pemasaran digital, dan
                keterampilan profesional untuk mendukung karir peserta di era
                ini.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-soft">
              <div className="flex items-start gap-3 mb-6">
                <Building2 className="size-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Nama</p>
                  <p className="text-sm text-slate-600">Hem's Institute</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-6">
                <Building2 className="size-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Lokasi</p>
                  <p className="text-sm text-slate-600">Padang, Sumatera Barat, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-6">
                <ShieldCheck className="size-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Berdiri</p>
                  <p className="text-sm text-slate-600">2011</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-6">
                <Users className="size-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Jenis Lembaga</p>
                  <p className="text-sm text-slate-600">
                    Pendidikan dan Pelatihan Vokasi (LPK)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="size-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Bidang Unggulan</p>
                  <p className="text-sm text-slate-600">
                    Bahasa asing, multimedia &amp; digital, keterampilan profesional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 text-center mb-12">
            Visi dan Misi
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card padded>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-3 text-amber-700">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Visi</h3>
                    <p className="text-sm text-slate-600 mt-1 font-medium italic">
                      "Menjadi Lembaga Pendidikan yang Kreatif, Inovatif dan Edukatif."
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Kami berkomitmen untuk menjadi lembaga pendidikan yang terus
                  menciptakan metode pembelajaran kreatif, inovatif, dan
                  bermanfaat bagi seluruh peserta.
                </p>
              </CardContent>
            </Card>
            <Card padded>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Misi</h3>
                    <p className="text-sm text-slate-600 mt-1 font-medium">
                      Dua misi inti kami dalam mengembangkan keterampilan
                      masyarakat.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-3 text-slate-600 leading-relaxed sm:list-outside sm:list-inside">
                  <li>
                    Mengembangkan kemampuan siswa berkomunikasi dalam bahasa
                    asing dan menguasai ilmu komputer.
                  </li>
                  <li>
                    Menjalin kerja sama dengan lembaga pendidikan formal dan
                    informal serta instansi pemerintah.
                  </li>
                  <li>
                    Berpartisipasi dalam meningkatkan kemampuan berbahasa asing
                    dan komputer bagi masyarakat yang ber ekonomi rendah.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-3">Nilai Kami</h2>
              <p className="text-sm text-slate-600">
                Prinsip yang dipegang dalam setiap program kami.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <Card key={i} padded className="p-5">
                <div className="rounded-lg bg-brand-orange/10 p-2.5 text-brand-orange mb-3">
                  <v.icon className="size-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{v.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Fasilitas</h2>
              <ul className="space-y-3">
                {facilities.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                    <span className="text-brand-orange shrink-0 mt-1.5">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-6">Kerjasama</h2>
              <Card padded className="text-center">
                <p className="text-slate-600">
                  Informasi kerjasama dengan lembaga pendidikan dan instansi
                  pemerintah akan segera ditampilkan setelah ketersediaan
                  data yang terverifikasi.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 text-center">Informasi Hukum</h2>
            <Card padded className="text-center">
              <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                Informasi resmi mengenai izin operasional, akreditasi, dan
                legalitas lembaga akan disediakan berdasarkan dokumen
                institusi Hem's Institute. Silakan menghubungi admin kami
                melalui WhatsApp untuk informasi lebih lanjut.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
