import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
  compact?: boolean;
}

export function PageHero({ eyebrow, title, description, icon, compact = false }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#102D53]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_15%,rgba(242,140,40,0.22),transparent_34%),radial-gradient(ellipse_at_88%_80%,rgba(96,165,250,0.16),transparent_38%),linear-gradient(135deg,#102D53_0%,#173B70_58%,#0F2B4E_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className={"mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 " + (compact ? "py-12 sm:py-16" : "py-16 sm:py-20 lg:py-24")}>
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-200">
          {icon}
          {eyebrow}
        </span>
        <h1 className="mx-auto max-w-4xl font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-white">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}
