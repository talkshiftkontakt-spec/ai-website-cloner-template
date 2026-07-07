import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/commerce/ProductGrid";
import { products } from "@/lib/cms/data";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const featured = products.filter((p) =>
    ["bestseller", "nowosc", "limitowana"].includes(p.badge ?? ""),
  ).slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Wyróżnione główki
            </h2>
            <p className="mt-2 text-muted-foreground">
              Najczęściej wybierane przez kolekcjonerów
            </p>
          </div>
          <Link
            href="/kolekcje/wszystkie"
            className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}
          >
            Zobacz wszystkie
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </div>
    </section>
  );
}

export function CollectionShowcase() {
  const collections = [
    { slug: "ikony-minecraft", name: "Ikony", image: "/images/collections/icons.svg" },
    { slug: "tworcy", name: "Twórcy", image: "/images/collections/creators.svg" },
    { slug: "limitowane", name: "Limitowane", image: "/images/collections/limited.svg" },
    { slug: "personalizowane", name: "Personalizowane", image: "/images/collections/custom.svg" },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Popularne kolekcje
        </h2>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/kolekcje/${col.slug}`}
              className="group relative min-w-[240px] flex-1 overflow-hidden rounded-xl border border-border"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <p className="absolute bottom-4 left-4 font-display text-lg font-semibold">
                  {col.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
