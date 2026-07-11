import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonVariantClass: Record<string, string> = {
  primary: "S36ykG_variant-primary",
  invert: "S36ykG_variant-invert",
  ghost: "S36ykG_variant-ghost",
  outline: "S36ykG_variant-border",
};

export function LinearTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border-translucent)] bg-[var(--color-bg-translucent)] px-3 py-1 text-[13px] font-medium text-[var(--color-text-tertiary)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "invert" | "ghost" | "outline";

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
    "S36ykG_root S36ykG_variant S36ykG_size-default",
    buttonVariantClass[variant],
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
  reveal = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("b-30Va_root Fzcv4W_inset", reveal && "linear-reveal", className)}
    >
      {children}
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
  const style =
    Tag === "h1"
      ? { font: "var(--title-7)", letterSpacing: "var(--title-7-letter-spacing, -0.022em)" }
      : Tag === "h2"
        ? { font: "var(--title-5)", letterSpacing: "var(--title-5-letter-spacing, -0.022em)" }
        : { font: "var(--title-3)", letterSpacing: "var(--title-3-letter-spacing, -0.012em)" };

  return (
    <Tag className={cn("text-balance font-semibold text-[var(--color-text-primary)]", className)} style={style}>
      {children}
    </Tag>
  );
}

export function LinearBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("max-w-[640px] text-[var(--color-text-secondary)]", className)}
      style={{ font: "var(--text-large)" }}
    >
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
        "Fzcv4W_edgeHighlight relative flex flex-col rounded-2xl border border-[var(--color-border-translucent)] bg-[var(--color-bg-secondary)] p-6 md:p-8",
        featured && "shadow-[0_0_0_1px_rgba(113,112,255,0.15),0_24px_80px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PillarLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="b-30Va_action mb-4 inline-flex items-center gap-3 font-mono text-sm text-[var(--color-text-tertiary)]">
      <span className="Fzcv4W_slashedZero text-[var(--color-accent)]">{num}</span>
      <span>{label}</span>
      <span className="text-[var(--color-text-quaternary)]">→</span>
    </div>
  );
}

export function LinearPanel({ children, className, float }: { children: ReactNode; className?: string; float?: boolean }) {
  return (
    <div
      className={cn(
        "Fzcv4W_edgeHighlight linear-grain relative overflow-hidden rounded-2xl border border-[var(--color-border-translucent)] bg-[var(--color-bg-panel)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        float && "linear-float",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("linear-reveal", className)}
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
