import Link from "next/link";

import { getProductBySlug } from "@/lib/cms/data";
import { formatPrice } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function LimitedEditionBanner() {
  const product = getProductBySlug("netherite-heros");
  if (!product) return null;

  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl border border-netherite/30 bg-gradient-to-br from-surface to-netherite/10 p-8 md:p-12">
          <div className="relative z-10 max-w-xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Limitowana edycja
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {product.name}
            </h2>
            <p className="text-muted-foreground">{product.shortDescription}</p>
            <p className="text-sm">
              Pozostało:{" "}
              <strong className="text-primary">
                {product.stock} / {product.editionTotal}
              </strong>{" "}
              egzemplarzy
            </p>
            <p className="font-display text-2xl font-bold">
              od {formatPrice(product.priceFrom)}
            </p>
            <Link
              href={`/produkt/${product.slug}`}
              className={cn(buttonVariants({ size: "lg" }), "h-12")}
            >
              Zobacz edycję limitowaną
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
