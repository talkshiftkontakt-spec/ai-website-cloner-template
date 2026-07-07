"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Star, Zap } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { ProductBadgeLabel } from "@/components/ui/product-badge";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/commerce/cart-store";
import { getDeliveryEstimate } from "@/lib/commerce/shipping";
import { analyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types/product";

interface ProductPurchasePanelProps {
 product: Product;
 className?: string;
}

export function ProductPurchasePanel({
 product,
 className,
}: ProductPurchasePanelProps) {
 const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
 product.variants[0]!,
 );
 const [quantity, setQuantity] = useState(1);
 const addItem = useCartStore((s) => s.addItem);

 const avgRating =
 product.reviews.length > 0
 ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
 : 0;

 const handleAddToCart = () => {
 addItem({
 productId: product.id,
 productSlug: product.slug,
 productName: product.name,
 variantId: selectedVariant.id,
 variantName: selectedVariant.name,
 price: selectedVariant.price,
 quantity,
 image: product.images[0]?.url ?? "",
 });
 analyticsEvents.addToCart({
 slug: product.slug,
 name: product.name,
 price: selectedVariant.price,
 });
 };

 return (
 <div className={cn("space-y-6 lg:sticky lg:top-24", className)}>
 <div className="space-y-3">
 {product.badge && (
 <ProductBadgeLabel
 badge={product.badge}
 editionNumber={product.editionNumber}
 editionTotal={product.editionTotal}
 />
 )}
 <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
 {product.name}
 </h1>
 <p className="text-muted-foreground">{product.shortDescription}</p>
 {avgRating > 0 && (
 <div className="flex items-center gap-2">
 <div className="flex items-center gap-0.5">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 className={cn(
 "size-4",
 i < Math.round(avgRating)
 ? "fill-primary text-primary"
 : "text-muted-foreground",
 )}
 />
 ))}
 </div>
 <span className="text-sm text-muted-foreground">
 {avgRating.toFixed(1)} ({product.reviews.length} opinii)
 </span>
 </div>
 )}
 </div>

 <div className="flex items-baseline gap-3">
 <span className="font-display text-3xl font-bold text-foreground">
 {formatPrice(selectedVariant.price)}
 </span>
 {selectedVariant.compareAtPrice && (
 <span className="text-lg text-muted-foreground line-through">
 {formatPrice(selectedVariant.compareAtPrice)}
 </span>
 )}
 </div>

 {product.editionType === "limited" && product.editionTotal && (
 <p className="rounded-lg border border-netherite/50 bg-netherite/10 px-4 py-2 text-sm">
 Limitowana edycja: {" "}
 <strong>
 {product.stock} / {product.editionTotal}
 </strong>{" "}
 dostępnych
 </p>
 )}

 <div className="space-y-3">
 <p className="text-sm font-medium text-foreground">Wariant</p>
 <div className="grid gap-2">
 {product.variants.map((variant) => (
 <button
 key={variant.id}
 type="button"
 onClick={() => setSelectedVariant(variant)}
 className={cn(
 "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
 selectedVariant.id === variant.id
 ? "border-primary bg-primary/10 text-foreground"
 : "border-border bg-surface hover:border-muted-foreground",
 )}
 >
 <span className="font-medium">{variant.name}</span>
 <span className="ml-2 text-muted-foreground">
 {formatPrice(variant.price)}
 </span>
 </button>
 ))}
 </div>
 </div>

 <div className="flex items-center gap-4">
 <p className="text-sm font-medium">Ilość</p>
 <div className="flex items-center rounded-lg border border-border">
 <button
 type="button"
 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
 className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
 aria-label="Zmniejsz ilość"
 >
 <Minus className="size-4" />
 </button>
 <span className="w-10 text-center font-medium">{quantity}</span>
 <button
 type="button"
 onClick={() => setQuantity((q) => q + 1)}
 className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
 aria-label="Zwiększ ilość"
 >
 <Plus className="size-4" />
 </button>
 </div>
 </div>

 <div className="flex flex-col gap-3 sm:flex-row">
 <Button size="lg" className="h-12 flex-1 text-base" onClick={handleAddToCart}>
 <ShoppingBag className="size-5" />
 Dodaj do koszyka
 </Button>
 <Link
 href="/checkout"
 className={cn(buttonVariants({ size: "lg" }), "h-12 flex-1 text-base")}
 >
 <Zap className="size-5" />
 Kup teraz
 </Link>
 </div>

 {product.isPersonalizable && (
 <Link
 href="/konfigurator"
 className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full h-12")}
 >
 Personalizuj ze swoim skinem
 </Link>
 )}

 <div className="space-y-2 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
 <p>
 <strong className="text-foreground">Wysyłka:</strong>{" "}
 {getDeliveryEstimate()}
 </p>
 <p>Zwrot 14 dni · Bezpieczna płatność · Made in PL</p>
 </div>
 </div>
 );
}
