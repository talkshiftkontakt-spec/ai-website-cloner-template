"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/lib/commerce/cart-store";
import {
  FREE_SHIPPING_THRESHOLD,
  getShippingCost,
} from "@/lib/commerce/shipping";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : getShippingCost("inpost");
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <h1 className="font-display text-4xl font-bold">Koszyk</h1>
        <p className="mt-4 text-muted-foreground">Twój koszyk jest pusty.</p>
        <Link
          href="/kolekcje/wszystkie"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex h-12")}
        >
          Przeglądaj kolekcję
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Koszyk" },
        ]}
        className="mb-8"
      />

      <h1 className="font-display text-4xl font-bold">Koszyk</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-border bg-surface p-4"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.productName} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/produkt/${item.productSlug}`}
                    className="font-semibold hover:text-primary"
                  >
                    {item.productName}
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.variantName}</p>
                  {item.customSkinUrl && (
                    <p className="text-xs text-primary">Personalizowany skin</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex size-8 items-center justify-center"
                      aria-label="Zmniejsz"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex size-8 items-center justify-center"
                      aria-label="Zwiększ"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Usuń"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold">Podsumowanie</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Produkty</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Wysyłka</dt>
              <dd>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd>
            </div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-muted-foreground">
                Darmowa wysyłka od {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </p>
            )}
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
              <dt>Razem</dt>
              <dd className="text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full h-12")}
          >
            Przejdź do kasy
          </Link>
        </div>
      </div>
    </div>
  );
}
