"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "base" | "lg";
}

export function Button({ className, variant = "primary", size = "base", disabled, type = "button", ...props }: ButtonProps) {
  const base = "interactive-lift inline-flex items-center justify-center rounded-xl font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
  const variants = {
    primary: "bg-brand-navy text-white shadow-sm hover:bg-[#0E2E53] hover:shadow-card",
    outline: "border border-brand-navy/25 bg-white text-brand-navy hover:border-brand-navy hover:bg-blue-50",
    ghost: "bg-transparent text-brand-navy hover:bg-slate-100",
  };
  const sizes = {
    sm: "min-h-10 px-4 py-2 text-sm",
    base: "min-h-11 px-6 py-3 text-base",
    lg: "min-h-12 px-8 py-3.5 text-lg",
  };

  return <button type={type} disabled={disabled} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
