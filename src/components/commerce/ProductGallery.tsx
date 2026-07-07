"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
 images: ProductImage[];
 productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
 const [activeIndex, setActiveIndex] = useState(0);
 const active = images[activeIndex] ?? images[0];

 if (!active) return null;

 return (
 <div className="space-y-4">
 <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
 <Image
 src={active.url}
 alt={active.alt}
 fill
 sizes="(max-width: 1024px) 100vw, 55vw"
 className="object-cover"
 priority
 />
 </div>
 {images.length > 1 && (
 <div className="flex gap-2 overflow-x-auto pb-1">
 {images.map((image, index) => (
 <button
 key={image.url}
 type="button"
 onClick={() => setActiveIndex(index)}
 className={cn(
 "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
 index === activeIndex
 ? "border-primary"
 : "border-border hover:border-muted-foreground",
 )}
 aria-label={`Pokaż ${image.alt}`}
 aria-current={index === activeIndex}
 >
 <Image
 src={image.url}
 alt=""
 fill
 sizes="64px"
 className="object-cover"
 />
 </button>
 ))}
 </div>
 )}
 <p className="sr-only">{productName}</p>
 </div>
 );
}
