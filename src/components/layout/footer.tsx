import Link from "next/link";

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
    <footer className="border-t border-slate-200 bg-brand-navy">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-lg bg-brand-orange px-2 py-1 text-xs font-heading font-bold text-white tracking-wider">HI</span>
              <span className="font-heading font-bold text-white text-lg tracking-tight">Hem's Institute</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              Lembaga Pendidikan dan Pelatihan Vokasi terkemuka di Padang,
              Sumatera Barat. Berdiri sejak 2011 dengan komitmen kembangkan
              keterampilan generasi muda.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-6">Panduan</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-6">Kontak</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M5 19.5C5 20.56 5.637 21.5 6.707 21.5h10.586c1.07 0 1.707-.94 1.707-2v-9c0-1.07-.637-2-1.707-2H6.707C5.637 10.5 5 11.44 5 12.5z" /><path d="M19 4.5A2.5 2.5 0 0 1 21.5 7V21c0 .538-.214 1.043-.586 1.414a2 2 0 0 1-2.828 0L15 19.5M18.5 6.5A2.5 2.5 0 0 1 16 4" /></svg>
                Padang, Sumatera Barat
              </li>
              <li className="flex items-start gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                WhatsApp: <span className="text-brand-navy font-semibold">628xxxxxxxxxx</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                info@hemsinstitute.ac.id
              </li>
              <li className="flex items-center gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" /><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 000-8.49m0 0L16 7m-4 0l-2.24 2.24m4.88 4.88a6 6 0 010 8.49m0-8.48L16 17m-4-4l2.24-2.24m-4.88 4.88a6 6 0 010 8.49m0-8.48L7 7m11 10l2.24-2.24m-4.88 4.88a6 6 0 010 8.49m0-8.48c0-3.31-2.69-6-6-6" /></svg>
                Senin - Jumat, 08.00 - 16.00 WIB
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-100 uppercase tracking-wider mb-6">Ikuti Kami</h3>
            <p className="text-sm text-slate-400 mb-6">
              Kami hadir di media sosial. Ikuti untuk informasi terbaru tentang
              program dan pendaftaran.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-brand-orange hover:text-white transition-colors" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-brand-orange hover:text-white transition-colors" aria-label="TikTok">
                TT
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-brand-orange hover:text-white transition-colors" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>
        </div>

        <hr className="border-slate-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="font-body">© {new Date().getFullYear()} Hem's Institute. Hak cipta dilindungi.</p>
          <p className="font-body">
            Informasi harga dan jadwal kursus dapat berubah sewaktu-waktu.
            Silakan hubungi admin untuk informasi terbaru.
          </p>
        </div>
      </div>
    </footer>
  );
}
