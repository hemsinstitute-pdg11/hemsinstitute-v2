import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/navbar";

const siteName = "Hem's Institute";
const siteDescription =
  "Lembaga pendidikan dan pelatihan vokasi di Padang, Sumatera Barat. Program bahasa asing, multimedia, dan keterampilan profesional sejak 2011.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Hem's Institute",
    default: "Hem's Institute - Lembaga Pelatihan di Padang",
  },
  description: siteDescription,
  keywords: [
    "kursus bahasa Inggris Padang",
    "kursus bahasa Korea Padang",
    "kursus bahasa Jepang Padang",
    "kursus bahasa Mandarin Padang",
    "kursus bahasa Arab Padang",
    "TOEFL Padang",
    "kursus komputer Padang",
    "pelatihan digital marketing Padang",
    "kursus desain grafis Padang",
    "lembaga pelatihan kerja Padang",
    "Hem's Institute Padang",
  ],
  authors: [{ name: "Hem's Institute" }],
  creator: "Hem's Institute",
  publisher: "Hem's Institute",
  robots: "index, follow",
  category: "education",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName,
    title: `Hem's Institute - Develop Your Skills. Build Your Future.`,
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `Hem's Institute`,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              async
            />
          </>
        )}
      </head>
      <body className="bg-[#F1F5F9] text-slate-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
