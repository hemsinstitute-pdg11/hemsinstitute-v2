"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, Send, X, MapPin, Clock, ChevronRight } from "lucide-react";

const links = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Program", href: "/programs" },
  { name: "Instruktur", href: "/instructors" },
  { name: "Berita", href: "/news" },
  { name: "Galeri", href: "/gallery" },
  { name: "Kontak", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="grid-surface-header sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg"
          aria-label="Hem's Institute - Beranda"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-navy text-xs font-heading font-extrabold tracking-wider text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            HI
          </span>
          <span className="font-heading text-base font-bold tracking-tight text-brand-navy sm:text-lg">
            Hem's Institute
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={"relative inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-semibold transition-colors duration-200 hover:bg-orange-50 hover:text-brand-orange focus-visible:outline-offset-2 " + (active ? "bg-blue-50 text-brand-navy after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-brand-orange" : "text-slate-600")}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/registration"
            className="interactive-lift ml-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-bold text-white shadow-sm hover:bg-[#D97706] focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            Daftar Sekarang <ChevronRight className="size-4" />
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-primary-navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className="hidden border-t border-slate-100 bg-slate-50/90 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2.5 text-xs font-medium text-slate-600 lg:px-8">
          <div className="flex items-center gap-2">
            <Phone className="size-3.5 text-brand-orange" />
            <span>Hubungi Admin: <strong className="text-brand-navy">085376534343</strong></span>
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="size-3.5" />
              Senin - Minggu, 09.00 - 20.30 WIB
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="size-3.5" />
              Padang, Sumatera Barat
            </span>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-primary-navigation"
          aria-label="Navigasi mobile"
          className="mobile-menu-enter border-t border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-1">
            {links.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={"flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-brand-orange " + (active ? "bg-blue-50 text-brand-navy" : "text-slate-700")}
                >
                  {link.name}
                  {active && <span className="size-1.5 rounded-full bg-brand-orange" />}
                </Link>
              );
            })}
            <Link
              href="/registration"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-brand-orange px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#D97706] focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              Daftar Sekarang
            </Link>
            <div className="mt-4 grid gap-2 border-t border-slate-100 px-4 pt-4 text-xs text-slate-500 sm:hidden">
              <span className="flex items-center gap-2"><Phone className="size-3.5 text-brand-orange" /> Admin: 085376534343</span>
              <span className="flex items-center gap-2"><Clock className="size-3.5" /> Senin - Minggu, 09.00 - 20.30 WIB</span>
              <span className="flex items-center gap-2"><MapPin className="size-3.5" /> Padang, Sumatera Barat</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function WhatsAppFloat() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285376534343";
  if (!number) return null;

  return (
    <a
      href={"https://wa.me/" + number}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive-lift fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#168A55] px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#117346] focus-visible:ring-2 focus-visible:ring-[#168A55] focus-visible:ring-offset-2"
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
      <a href="https://www.instagram.com/hems.institutepadang/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-brand-orange hover:text-white" aria-label="Instagram">
        Instagram
      </a>
    </div>
  );
}
