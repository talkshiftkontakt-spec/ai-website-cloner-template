import Link from "next/link";

import { getProductBySlug } from "@/lib/cms/data";
import { formatPrice } from "@/lib/format";

export function LimitedEditionBanner() {
  const product = getProductBySlug("netherite-heros");
  if (!product) return null;

  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="mc-panel relative overflow-hidden p-8 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: "url(/images/hero/minecraft-caves.jpg)",
              backgroundSize: "cover",
            }}
            aria-hidden
          />
          <div className="relative z-10 max-w-xl space-y-4">
            <p className="pixel-label text-accent">Limitowana edycja</p>
            <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
              {product.name}
            </h2>
            <p className="text-muted-foreground">{product.shortDescription}</p>
            <p className="text-sm text-muted-foreground">
              Pozostało:{" "}
              <strong className="text-grass">
                {product.stock} / {product.editionTotal}
              </strong>{" "}
              egzemplarzy
            </p>
            <p className="font-display text-2xl font-bold text-white">
              od {formatPrice(product.priceFrom)}
            </p>
            <Link href={`/produkt/${product.slug}`} className="mc-button inline-flex">
              Zobacz edycję limitowaną
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
