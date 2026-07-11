import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function LinearTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[13px] font-medium tracking-wide text-[var(--ll-text-tertiary)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "invert" | "ghost" | "outline";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-[var(--ll-brand)] text-white hover:brightness-110",
  invert: "bg-[var(--ll-button-invert)] text-[#08090a] hover:brightness-95",
  ghost: "border border-white/10 bg-white/5 text-[var(--ll-text-primary)] hover:bg-white/10",
  outline: "border border-[var(--ll-border)] bg-transparent text-[var(--ll-text-secondary)] hover:border-white/20 hover:text-[var(--ll-text-primary)]",
};

export function LinearButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex h-10 items-center justify-center rounded-full px-5 text-[15px] font-medium transition-all active:scale-[0.97]",
    buttonStyles[variant],
    className,
  );

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function LinearSection({
  id,
  children,
  className,
  inset = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  inset?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className={cn("mx-auto w-full max-w-[1120px]", inset && "px-4 md:px-8")}>{children}</div>
    </section>
  );
}

export function LinearHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-balance font-semibold tracking-[-0.022em] text-[var(--ll-text-primary)]",
        Tag === "h1" && "text-[clamp(2.5rem,6vw,4rem)] leading-[1.06]",
        Tag === "h2" && "text-[clamp(2rem,4vw,3rem)] leading-[1.1]",
        Tag === "h3" && "text-xl leading-snug",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function LinearBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-[640px] text-[17px] leading-relaxed text-[var(--ll-text-secondary)]", className)}>
      {children}
    </p>
  );
}

export function LinearCard({
  children,
  className,
  featured,
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border border-[var(--ll-border)] bg-[var(--ll-bg-secondary)] p-6 md:p-8",
        featured && "border-[var(--ll-accent)]/40 shadow-[0_0_0_1px_rgba(113,112,255,0.15),0_24px_80px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PillarLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-sm text-[var(--ll-text-tertiary)]">
      <span className="tabular-nums text-[var(--ll-accent)]">{num}</span>
      <span>{label}</span>
      <span className="text-[var(--ll-text-quaternary)]">→</span>
    </div>
  );
}

export function LinearPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[var(--ll-bg-panel)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
