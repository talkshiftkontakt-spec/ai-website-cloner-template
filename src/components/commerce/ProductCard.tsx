"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/commerce/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ProductBadgeLabel } from "@/components/ui/product-badge";
import { Button } from "@/components/ui/button";
import { analyticsEvents } from "@/lib/analytics/events";

interface ProductCardProps {
 product: Product;
 className?: string;
 priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
 const addItem = useCartStore((s) => s.addItem);
 const defaultVariant = product.variants[0];

 const handleQuickAdd = (e: React.MouseEvent) => {
 e.preventDefault();
 e.stopPropagation();
 if (!defaultVariant) return;
 addItem({
 productId: product.id,
 productSlug: product.slug,
 productName: product.name,
 variantId: defaultVariant.id,
 variantName: defaultVariant.name,
 price: defaultVariant.price,
 quantity: 1,
 image: product.images[0]?.url ?? "",
 });
 analyticsEvents.addToCart({
 slug: product.slug,
 name: product.name,
 price: defaultVariant.price,
 });
 };

 return (
 <article className={cn("group relative", className)}>
 <Link href={`/produkt/${product.slug}`} className="block">
 <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
 <Image
 src={product.images[0]?.url ?? "/images/products/steve-front.svg"}
 alt={product.images[0]?.alt ?? product.name}
 fill
 sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
 className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
 priority={priority}
 />
 {product.badge && (
 <div className="absolute top-3 left-3">
 <ProductBadgeLabel
 badge={product.badge}
 editionNumber={product.editionNumber}
 editionTotal={product.editionTotal}
 />
 </div>
 )}
 <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
 <Button
 size="sm"
 className="w-full"
 onClick={handleQuickAdd}
 type="button"
 >
 <ShoppingBag className="size-4" />
 Szybkie dodanie
 </Button>
 </div>
 </div>
 <div className="mt-3 space-y-1">
 <p className="text-xs text-muted-foreground">{product.categoryName}</p>
 <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary">
 {product.name}
 </h3>
 <div className="flex items-center gap-2">
 <span className="font-semibold text-foreground">
 od {formatPrice(product.priceFrom)}
 </span>
 {product.compareAtPrice && (
 <span className="text-sm text-muted-foreground line-through">
 {formatPrice(product.compareAtPrice)}
 </span>
 )}
 </div>
 </div>
 </Link>
 </article>
 );
}
