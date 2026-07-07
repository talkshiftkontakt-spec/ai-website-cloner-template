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
              Wyróżnione główki
            </h2>
            <p className="mt-2 text-muted-foreground">
              Gotowe modele — lub stwórz własną w konfiguratorze
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
    { slug: "personalizowane", name: "Personalizowane", image: "/images/heads/dream.png", head: true },
    { slug: "ikony-minecraft", name: "Ikony", image: "/images/heads/creeper.png", head: true },
    { slug: "tworcy", name: "Twórcy", image: "/images/heads/techno.png", head: true },
    { slug: "limitowane", name: "Limitowane", image: "/images/hero/blocks-texture.jpg", head: false },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <p className="pixel-label text-grass">Kolekcje</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-white md:text-4xl">
          Wybierz swoją ścieżkę
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/kolekcje/${col.slug}`}
              className="group mc-panel overflow-hidden transition-colors hover:border-grass/50"
            >
              <div className="relative aspect-[4/3] bg-surface-elevated">
                {col.head ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative size-24 transition-transform group-hover:scale-110 md:size-28">
                      <Image
                        src={col.image}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={col.image}
                    alt=""
                    fill
                    sizes="280px"
                    className="object-cover opacity-60 transition-opacity group-hover:opacity-80"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4">
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
