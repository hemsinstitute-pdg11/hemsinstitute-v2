"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, Send, X, MapPin, Clock } from "lucide-react";

const links = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Program", href: "/programs" },
  { name: "Instruktur", href: "/instructors" },
  { name: "Berita", href: "/news" },
  { name: "Galeri", href: "/gallery" },
  { name: "Kontak", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Hem's Institute - Beranda">
          <span className="rounded-lg bg-brand-navy px-2 py-1 text-xs font-heading font-bold tracking-wider text-white">
            HI
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-brand-navy">
            Hem's Institute
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="whitespace-nowrap transition-colors hover:text-brand-orange">
              {link.name}
            </Link>
          ))}
          <Link
            href="/registration"
            className="whitespace-nowrap rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#D97706]"
          >
            Daftar Sekarang
          </Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-primary-navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className="hidden border-t border-slate-100 bg-slate-50/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs font-medium text-slate-600">
          <a href="tel:+628xxxxxxxxxx" className="flex items-center gap-2 transition-colors hover:text-brand-navy">
            <Phone className="size-3.5 text-brand-orange" />
            <span>Hubungi Admin: <strong className="text-brand-navy">628xxxxxxxxxx</strong></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              Senin - Jumat, 08.00 - 16.00 WIB
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Padang, Sumatera Barat
            </span>
          </div>
        </div>
      </div>

      {open && (
        <nav id="mobile-primary-navigation" aria-label="Navigasi mobile" className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-orange"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/registration"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-brand-orange px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#D97706]"
            >
              Daftar Sekarang
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function WhatsAppFloat() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#D97706]"
      aria-label="Kontak kami via WhatsApp"
    >
      <Send className="size-5" />
      <span>WhatsApp</span>
    </a>
  );
}

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <a href="#" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-brand-orange hover:text-white" aria-label="Instagram">
        Instagram
      </a>
    </div>
  );
}
