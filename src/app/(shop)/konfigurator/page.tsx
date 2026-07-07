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
  const [selectedVariantId, setSelectedVariantId] = useState(
    customProduct.variants[1]?.id ?? customProduct.variants[0]!.id,
  );
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
        <h1 className="font-display text-4xl font-bold">Stwórz swoją główkę</h1>
        <p className="mt-4 text-muted-foreground">
          Wgraj plik PNG skina lub wpisz nick Minecraft. Zobacz podgląd 3D i
          zamów unikalną główkę.
        </p>

        <div className="mt-10 space-y-8">
          <SkinUploader onTextureChange={setTextureUrl} />

          <div>
            <p className="mb-3 text-sm font-medium">Wybierz wariant</p>
            <div className="grid gap-2">
              {customProduct.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                    selectedVariantId === variant.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-muted-foreground",
                  )}
                >
                  {variant.name} — {formatPrice(variant.price)}
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
