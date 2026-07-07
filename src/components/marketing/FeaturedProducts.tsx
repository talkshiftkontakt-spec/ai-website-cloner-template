import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/commerce/ProductGrid";
import { products } from "@/lib/cms/data";

export function FeaturedProducts() {
  const featured = products.filter((p) =>
    ["bestseller", "nowosc", "limitowana"].includes(p.badge ?? ""),
  ).slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="pixel-label text-grass">Sklep</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-white md:text-4xl">
              Wyróżnione obrazy
            </h2>
            <p className="mt-2 text-muted-foreground">
              Gotowe wzory na płótnie — lub wgraj własny skin
            </p>
          </div>
          <Link
            href="/kolekcje/wszystkie"
            className="mc-button-outline hidden !py-2 !px-4 !text-sm sm:inline-flex"
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
    {
      slug: "personalizowane",
      name: "Personalizowane",
      image: "/images/products/twojskinek/product-steve-skin.png",
    },
    {
      slug: "ikony-minecraft",
      name: "Ikony",
      image: "/images/products/twojskinek/product-closeup.png",
    },
    {
      slug: "tworcy",
      name: "Twórcy",
      image: "/images/products/twojskinek/product-dog-skin.png",
    },
    {
      slug: "limitowane",
      name: "Limitowane",
      image: "/images/products/twojskinek/product-in-living-room.png",
    },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <p className="pixel-label text-grass">Kolekcje</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-white md:text-4xl">
          Wybierz swój obraz
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/kolekcje/${col.slug}`}
              className="group overflow-hidden rounded-xl border-2 border-border bg-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={col.image}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="font-display text-lg font-bold text-white">
                    {col.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
