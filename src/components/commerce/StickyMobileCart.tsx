"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/lib/commerce/cart-store";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyMobileCart() {
 const itemCount = useCartStore((s) => s.itemCount());

 if (itemCount === 0) return null;

 return (
 <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur-md lg:hidden">
 <Link
 href="/koszyk"
 className={cn(buttonVariants({ size: "lg" }), "flex h-12 w-full items-center justify-center gap-2")}
 >
 <ShoppingBag className="size-5" />
 Koszyk ({itemCount})
 </Link>
 </div>
 );
}
