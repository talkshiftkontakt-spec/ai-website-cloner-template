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
            "flex snap-start flex-col border bg-canvas-raised p-5 md:p-6",
            tier.featured ? "border-primary" : "border-border",
            isCompact && "min-w-[272px]",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wide text-primary">
              {tier.name}
            </h3>
            {tier.featured && (
              <span className="bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-canvas">
                Hit
              </span>
            )}
          </div>

          <p className="text-price mt-3 text-primary">
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
                    <span className="mt-2 size-1 shrink-0 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs uppercase tracking-wider text-tertiary">
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
              "mt-5 inline-flex h-12 items-center justify-center text-sm font-semibold uppercase tracking-wider transition-colors",
              tier.featured
                ? "bg-primary text-canvas hover:bg-brand-hover"
                : "border border-border text-primary hover:border-primary",
            )}
          >
            Wybierz {tier.name}
          </a>
        </article>
      ))}
    </div>
  );
}
