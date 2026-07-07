import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/types/product";

const badgeStyles: Record<ProductBadge, string> = {
  nowosc: "bg-primary/15 text-primary border-primary/30",
  limitowana: "bg-netherite/30 text-foreground border-netherite/50 netherite-border",
  bestseller: "bg-accent/20 text-accent border-accent/40",
  "wysylka-24h": "bg-muted text-muted-foreground border-border",
};

const badgeLabels: Record<ProductBadge, string> = {
  nowosc: "Nowość",
  limitowana: "Limitowana",
  bestseller: "Bestseller",
  "wysylka-24h": "Wysyłka 24h",
};

interface ProductBadgeProps {
  badge: ProductBadge;
  editionNumber?: number;
  editionTotal?: number;
  className?: string;
}

export function ProductBadgeLabel({
  badge,
  editionNumber,
  editionTotal,
  className,
}: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        badgeStyles[badge],
        className,
      )}
    >
      {badgeLabels[badge]}
      {badge === "limitowana" && editionNumber && editionTotal
        ? ` #${editionNumber}/${editionTotal}`
        : null}
    </span>
  );
}
