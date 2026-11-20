import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "Tentang Kami", href: "/about" },
  { name: "Program & Kursus", href: "/programs" },
  { name: "Instruktur", href: "/instructors" },
  { name: "Berita", href: "/news" },
  { name: "Galeri", href: "/gallery" },
  { name: "Pendaftaran", href: "/registration" },
  { name: "Kontak", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="grid-surface-footer border-t border-white/10 bg-[#102D53] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1fr_0.9fr] lg:gap-12">
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5" aria-label="Hem's Institute - Beranda">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-orange text-xs font-heading font-extrabold tracking-wider text-white">HI</span>
              <span className="font-heading text-lg font-bold tracking-tight text-white">Hem's Institute</span>
            </Link>
            <p className="max-w-xs text-sm leading-7 text-slate-300">
              Lembaga Pendidikan dan Pelatihan Vokasi di Padang, Sumatera Barat.
              Berdiri sejak 2011 dengan komitmen mengembangkan keterampilan
              bahasa, digital, dan profesional.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">Jelajahi</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="inline-flex min-h-8 items-center transition-colors hover:text-orange-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">Informasi Kontak</h2>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-orange-300" /><span>Padang, Sumatera Barat, Indonesia</span></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-orange-300" /><span>WhatsApp Admin: <strong className="font-semibold text-white">628xxxxxxxxxx</strong></span></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-orange-300" /><span>info@hemsinstitute.ac.id</span></li>
              <li className="flex items-start gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-orange-300" /><span>Senin - Jumat, 08.00 - 16.00 WIB</span></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">Ikuti Kami</h2>
            <p className="mb-5 text-sm leading-6 text-slate-300">
              Ikuti kanal media sosial Hem's Institute untuk mendapatkan
              informasi program dan pendaftaran terbaru.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">Instagram <ArrowUpRight className="size-3.5" /></span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">TikTok <ArrowUpRight className="size-3.5" /></span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">YouTube <ArrowUpRight className="size-3.5" /></span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hem's Institute. Hak cipta dilindungi.</p>
          <p>Informasi harga dan jadwal dapat berubah. Hubungi admin untuk informasi terbaru.</p>
        </div>
      </div>
    </footer>
  );
}
