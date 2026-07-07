export type EditionType = "standard" | "limited" | "custom";
export type ProductBadge = "nowosc" | "limitowana" | "bestseller" | "wysylka-24h";
export type FinishType = "matte" | "gloss" | "canvas";
export type SizeType = "S" | "M" | "L" | "20x20" | "30x30" | "40x40";
export type BaseType = "none" | "oak";

export interface ProductImage {
 url: string;
 alt: string;
 type: "front" | "angle" | "back" | "lifestyle" | "box" | "scale";
}

export interface MaterialSpec {
 name: string;
 value: string;
}

export interface DimensionSpec {
 heightMm: number;
 widthMm: number;
 depthMm: number;
 weightG: number;
 boxSize: string;
}

export interface ProductVariant {
 id: string;
 sku: string;
 name: string;
 price: number;
 compareAtPrice?: number;
 stock: number;
 attributes: {
 size: SizeType;
 finish: FinishType;
 base: BaseType;
 };
}

export interface ProductReview {
 id: string;
 author: string;
 rating: number;
 date: string;
 content: string;
 verified: boolean;
}

export interface Product {
 id: string;
 slug: string;
 name: string;
 shortDescription: string;
 description: string;
 categorySlug: string;
 categoryName: string;
 tags: string[];
 images: ProductImage[];
 badge?: ProductBadge;
 priceFrom: number;
 compareAtPrice?: number;
 variants: ProductVariant[];
 materials: MaterialSpec[];
 dimensions: DimensionSpec;
 editionType: EditionType;
 editionNumber?: number;
 editionTotal?: number;
 editionEndsAt?: string;
 isPersonalizable: boolean;
 relatedProductSlugs: string[];
 crossSellSlugs: string[];
 reviews: ProductReview[];
 stock: number;
 creator?: string;
 lore?: string;
}

export interface CollectionCategory {
 slug: string;
 name: string;
 description: string;
 seoDescription: string;
 image: string;
}
