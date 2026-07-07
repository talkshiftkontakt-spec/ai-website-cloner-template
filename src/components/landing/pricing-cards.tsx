"use client";

import { cn } from "@/lib/utils";
import {
  formatPrice,
  PRICING_TIERS,
  type PricingTierId,
} from "@/lib/constants/pricing";

type PricingCardsProps = {
  variant?: "compact" | "full";
  onSelectTier?: (tier: PricingTierId) => void;
  className?: string;
};

export function PricingCards({
  variant = "full",
  onSelectTier,
  className,
}: PricingCardsProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "grid gap-3",
        isCompact
          ? "grid-flow-col auto-cols-[minmax(272px,1fr)] overflow-x-auto pb-1 snap-x snap-mandatory md:grid-flow-row md:grid-cols-3 md:overflow-visible"
          : "md:grid-cols-3",
        className,
      )}
    >
      {PRICING_TIERS.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            "relative flex snap-start flex-col border p-5 md:p-6",
            tier.featured
              ? "border-destructive/50 bg-destructive-muted shadow-[inset_0_1px_0_oklch(0.78_0.16_25/0.12)]"
              : "border-destructive/20 bg-destructive-subtle/60",
            isCompact && "min-w-[272px]",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium leading-snug text-destructive-foreground">
                {tier.hook}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wide text-primary">
                {tier.name}
              </h3>
            </div>
            {tier.badge && (
              <span
                className={cn(
                  "shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                  tier.featured
                    ? "bg-destructive text-canvas"
                    : "border border-destructive/30 bg-destructive/15 text-destructive-foreground",
                )}
              >
                {tier.badge}
              </span>
            )}
          </div>

          <p
            className={cn(
              "text-price mt-4",
              tier.featured ? "text-destructive" : "text-primary",
            )}
          >
            {formatPrice(tier.price)}
            <span className="ml-1 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-wider text-tertiary">
              / mies.
            </span>
          </p>

          {!isCompact && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-secondary">
                {tier.audience}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-snug text-secondary"
                  >
                    <span className="mt-2 size-1 shrink-0 bg-destructive/70" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs uppercase tracking-wider text-destructive/80">
                {tier.commitment}
              </p>
            </>
          )}

          {isCompact && (
            <p className="mt-3 text-sm leading-snug text-secondary line-clamp-2">
              {tier.audience}
            </p>
          )}

          <a
            href="#aplikacja"
            onClick={() => onSelectTier?.(tier.id)}
            className={cn(
              "mt-5 inline-flex h-12 items-center justify-center text-sm font-bold uppercase tracking-wider transition-colors",
              tier.featured
                ? "bg-destructive text-canvas hover:bg-destructive/90"
                : "border border-destructive/35 bg-destructive/10 text-destructive-foreground hover:bg-destructive/20",
            )}
          >
            Zacznij już dzisiaj
          </a>
        </article>
      ))}
    </div>
  );
}
