import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const priceLabel =
    price == null
      ? "Hubungi Admin untuk Informasi"
      : `Rp ${Number(price).toLocaleString("id-ID")}`;

  return (
    <Card key={id} className={cn("hover:shadow-[0_20px_40px_-12px_rgba(242,140,40,0.18)] transition-shadow duration-300", isActive ? "" : "opacity-60 grayscale")}>
      <div className="relative overflow-hidden">
        <ImagePlaceholder category={categoryKey} label="Gambar Program" className="h-48" />
        {!isActive && (
          <span className="absolute top-3 left-3 rounded-lg bg-slate-900/90 px-3 py-1 text-xs font-bold text-white">
            Tidak Aktif
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            {category}
          </span>
          <span className="ml-auto text-xs font-medium text-slate-500">
            {targetAudience}
          </span>
        </div>
        <Link href={`/programs/${slug}`} className="group">
          <h3 className="font-heading font-bold text-slate-900 group-hover:text-brand-orange transition-colors leading-tight">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-1">
            <span className="font-heading font-bold text-brand-navy">{priceLabel}</span>
            <span className="text-xs text-slate-500">per program</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/programs/${slug}`}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm hover:bg-slate-50 transition-colors"
            >
              Detail <ChevronRight className="size-4" />
            </Link>
            <Button
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Link href={`/registration?program=${slug}`} className="flex items-center gap-1.5 w-full text-center sm:w-auto justify-center">
                Daftar <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
