import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  targetAudience: string;
  price: number | string | null;
  isActive?: boolean;
  categoryKey?: "bahasa" | "digital" | "profesional";
}

export function ProgramCard({
  id,
  name,
  category,
  slug,
  description,
  targetAudience,
  price,
  isActive = true,
  categoryKey = "digital",
}: ProgramCardProps) {
  const priceLabel = price == null
    ? "Hubungi Admin untuk Informasi"
    : "Rp " + Number(price).toLocaleString("id-ID");
  const pricePeriod = slug === "english-class" ? "/ bulan" : "";

  return (
    <Card key={id} className={cn("flex h-full flex-col", isActive ? "" : "opacity-60 grayscale")}>
      <div className="relative overflow-hidden rounded-xl">
        <ImagePlaceholder category={categoryKey} label={name} className="h-48 rounded-xl" />
        {!isActive && (
          <span className="absolute left-3 top-3 rounded-lg bg-slate-900/90 px-3 py-1 text-xs font-bold text-white">
            Tidak Aktif
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            {category}
          </span>
          {slug === "english-class" && <span className="inline-flex items-center rounded-lg border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">Program Unggulan</span>}
          {slug === "english-class" && <span className="inline-flex items-center rounded-lg border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">Program Unggulan</span>}
          <span className="ml-auto text-right text-xs font-medium text-slate-500">
            {targetAudience}
          </span>
        </div>
        <Link href={`/programs/${slug}`} className="group rounded-sm focus-visible:outline-offset-4">
          <h3 className="font-heading font-bold leading-tight text-slate-900 transition-colors group-hover:text-brand-orange">
            {name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-heading text-sm font-bold text-brand-navy">{priceLabel} {pricePeriod}</span>
            <span className="text-xs text-slate-500">{slug === "english-class" ? "Biaya bulanan" : "Biaya kursus"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/programs/${slug}`}
              className="inline-flex min-h-10 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              Detail <ChevronRight className="size-4" />
            </Link>
            <Link
              href={`/registration?program=${slug}`}
              className="inline-flex min-h-10 items-center justify-center gap-1 rounded-xl bg-brand-orange px-3 text-sm font-bold text-white transition-colors hover:bg-[#D97706] focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              Daftar <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
