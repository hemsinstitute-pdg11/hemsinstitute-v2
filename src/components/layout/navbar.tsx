"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Phone,
  Send,
  X,
  MapPin,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="rounded-lg bg-brand-navy px-2 py-1 text-xs font-heading font-bold text-white tracking-wider">
                HI
              </span>
              <span className="font-heading font-bold text-brand-navy text-lg tracking-tight">
                Hem's Institute
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/registration"
                className="rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-[#D97706] transition-colors"
              >
                Daftar Sekarang
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Buka menu"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-white border-b border-slate-100">
            <div className="px-6 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/registration"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white text-center hover:bg-[#D97706] transition-colors"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="sticky top-[5rem] z-40 hidden md:block border-b border-slate-200/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex justify-between items-center py-3 text-sm font-medium">
          <div className="flex items-center gap-3 text-slate-600">
            <Phone className="size-4 text-brand-orange" />
            <span>Hubungi Admin: <span className="text-brand-navy font-semibold">628xxxxxxxxxx</span></span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>Senin - Jumat, 08.00 - 16.00 WIB</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>Padang, Sumatera Barat</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function WhatsAppFloat() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) {
    return null;
  }

  const href = `https://wa.me/${number}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[20px] right-[20px] z-50 rounded-xl bg-brand-orange px-4 py-3 text-base font-bold text-white shadow-lg hover:bg-[#D97706] transition-colors flex items-center gap-2"
      aria-label="Kontak kami via WhatsApp"
    >
      <Send className="size-5" />
      <span>WhatsApp</span>
    </a>
  );
}

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3 text-slate-600 text-sm">
      <a href="#" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-brand-orange hover:text-white transition-colors" aria-label="Instagram">
        Instagram
      </a>
    </div>
  );
}
