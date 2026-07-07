import { Shield, Star, Truck, MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface TrustStripProps {
  className?: string;
  compact?: boolean;
}

export function TrustStrip({ className, compact = false }: TrustStripProps) {
  const items = [
    {
      icon: Star,
      label: `${siteConfig.stats.rating}/5`,
      sub: `${siteConfig.stats.reviewCount} opinii`,
    },
    {
      icon: MapPin,
      label: "Made in PL",
      sub: "Produkcja w Polsce",
    },
    {
      icon: Truck,
      label: "Szybka wysyłka",
      sub: "3–5 dni realizacji",
    },
    {
      icon: Shield,
      label: "Bezpieczna płatność",
      sub: "BLIK · Karta · Przelew",
    },
  ];

  return (
    <div
      className={cn(
        "grid gap-4",
        compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 md:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <item.icon className="size-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PaymentBadges({ className }: { className?: string }) {
  const methods = ["BLIK", "Visa", "Mastercard", "Apple Pay", "PayPo"];
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {methods.map((method) => (
        <span
          key={method}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground"
        >
          {method}
        </span>
      ))}
    </div>
  );
}
