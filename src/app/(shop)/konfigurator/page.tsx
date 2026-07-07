"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SkinUploader } from "@/components/configurator/SkinUploader";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/lib/commerce/cart-store";
import { getProductBySlug } from "@/lib/cms/data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const customProduct = getProductBySlug("twoj-skin")!;

export default function ConfiguratorPage() {
  const [textureUrl, setTextureUrl] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState("v-30x30");
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const selectedVariant =
    customProduct.variants.find((v) => v.id === selectedVariantId) ??
    customProduct.variants[0]!;

  const handleAddToCart = () => {
    if (!textureUrl) return;
    addItem({
      productId: customProduct.id,
      productSlug: customProduct.slug,
      productName: customProduct.name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity: 1,
      image: customProduct.images[0]?.url ?? "",
      customSkinUrl: textureUrl,
    });
    router.push("/koszyk");
  };

  return (
    <div className="container-site section-padding">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Konfigurator" },
        ]}
        className="mb-8"
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold">
          Zamów swój obrazek
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty">
          Wgraj plik PNG skina lub wpisz nick Minecraft. Zobacz podgląd{" "}
          <strong>płaskiego obrazu na płótnie</strong> — twarz główki ze skina,
          gotowa do powieszenia na ścianie.
        </p>

        <div className="mt-10 space-y-8">
          <SkinUploader onTextureChange={setTextureUrl} />

          <div>
            <p className="mb-3 font-display font-semibold">Wybierz format</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {customProduct.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={cn(
                    "rounded-lg border-2 px-4 py-5 text-center transition-colors",
                    selectedVariantId === variant.id
                      ? "border-grass bg-grass/10"
                      : "border-border hover:border-grass/50",
                  )}
                >
                  <p className="font-display text-xl font-bold">{variant.name}</p>
                  <p className="mt-1 flex items-center justify-center gap-2">
                    {variant.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(variant.compareAtPrice)}
                      </span>
                    )}
                    <span className="text-lg font-semibold text-grass">
                      {formatPrice(variant.price)}
                    </span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 flex-1"
              disabled={!textureUrl}
              onClick={handleAddToCart}
            >
              Dodaj do koszyka — {formatPrice(selectedVariant.price)}
            </Button>
            <Link
              href="/kolekcje/personalizowane"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12")}
            >
              Zobacz przykłady
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
