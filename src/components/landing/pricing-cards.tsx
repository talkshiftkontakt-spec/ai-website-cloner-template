"use client";

import { cn } from "@/lib/utils";
import {
  formatPrice,
  PRICING_TIERS,
  type PricingTierId,
} from "@/lib/constants/pricing";
import { Button } from "@/components/ui/button";

type PricingCardsProps = {
  variant?: "compact" | "full";
  selectedTier?: PricingTierId;
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
        "grid gap-4",
        isCompact
          ? "grid-flow-col auto-cols-[minmax(260px,1fr)] overflow-x-auto pb-2 snap-x snap-mandatory md:grid-flow-row md:grid-cols-3 md:overflow-visible"
          : "md:grid-cols-3",
        className,
      )}
    >
      {PRICING_TIERS.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            "flex snap-start flex-col rounded-xl border bg-canvas-raised p-6 md:p-8",
            tier.featured ? "border-brand" : "border-border",
            isCompact && "min-w-[260px]",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-medium text-primary">{tier.name}</h3>
            {tier.featured && (
              <span className="rounded-sm bg-brand-muted px-2 py-1 text-label text-brand">
                Popularny
              </span>
            )}
          </div>

          <p className="text-price mt-4 text-primary">
            {formatPrice(tier.price)}
            <span className="ml-1 font-[family-name:var(--font-body)] text-sm font-normal text-secondary">
              /mies.
            </span>
          </p>

          {!isCompact && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-secondary">
                <span className="text-primary">Dla kogo: </span>
                {tier.audience}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-secondary"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-tertiary">{tier.commitment}</p>
            </>
          )}

          {isCompact && (
            <p className="mt-2 text-sm text-secondary line-clamp-2">
              {tier.audience}
            </p>
          )}

          <Button
            className="mt-6 w-full"
            variant={tier.featured ? "default" : "outline"}
            size={isCompact ? "default" : "lg"}
            render={
              <a
                href="#aplikacja"
                onClick={() => onSelectTier?.(tier.id)}
              />
            }
            nativeButton={false}
          >
            Wybierz {tier.name}
          </Button>
        </article>
      ))}
    </div>
  );
}
