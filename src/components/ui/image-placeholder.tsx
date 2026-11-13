import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  category?: "bahasa" | "digital" | "profesional";
  label?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  bahasa: "bg-amber-100 text-amber-800 border-amber-200",
  digital: "bg-blue-100 text-blue-800 border-blue-200",
  profesional: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export function ImagePlaceholder({
  category,
  label = "Gambar Program",
  className,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative aspect-video rounded-xl border flex flex-col items-center justify-center gap-2 overflow-hidden",
        categoryColors[category ?? "digital"],
        className,
      )}
    >
      <svg
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-current"
        viewBox="0 0 24 24"
      >
        <path d="M9 17v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M20 13v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" />
        <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="text-sm font-body font-medium text-current">{label}</span>
    </div>
  );
}
