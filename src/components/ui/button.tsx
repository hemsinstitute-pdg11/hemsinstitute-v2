"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "base" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "base",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-body font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-brand-navy text-white hover:bg-[#0E2E53] shadow-sm",
    outline:
      "border border-brand-navy bg-transparent text-brand-navy hover:bg-brand-navy hover:text-white",
    ghost:
      "bg-transparent text-brand-navy hover:bg-slate-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    base: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
