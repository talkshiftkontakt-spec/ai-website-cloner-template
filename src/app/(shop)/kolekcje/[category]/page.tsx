import { Suspense } from "react";

import { CollectionFilters } from "@/components/collection/CollectionFilters";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
 getCollectionBySlug,
 getProductsByCategory,
 searchProducts,
 sortProducts,
 type SortOption,
} from "@/lib/cms/data";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

interface PageProps {
 params: Promise<{ category: string }>;
 searchParams: Promise<{
 q?: string;
 sort?: string;
 edition?: string;
 }>;
}

export async function generateStaticParams() {
 return [
 { category: "wszystkie" },
 { category: "ikony-minecraft" },
 { category: "tworcy" },
 { category: "limitowane" },
 { category: "personalizowane" },
 ];
}

export async function generateMetadata({ params }: PageProps) {
 const { category } = await params;
 const col = getCollectionBySlug(category);
 if (!col) return {};
 return createPageMetadata({
 title: col.name,
 description: col.seoDescription,
 path: `/kolekcje/${category}`,
 });
}

export default async function CollectionPage({
 params,
 searchParams,
}: PageProps) {
 const { category } = await params;
 const filters = await searchParams;
 const col = getCollectionBySlug(category);
 if (!col) notFound();

 let products = getProductsByCategory(category);

 if (filters.q) {
 products = searchProducts(filters.q).filter((p) =>
 category === "wszystkie" ? true : p.categorySlug === category,
 );
 }

 if (filters.edition) {
 products = products.filter((p) => p.editionType === filters.edition);
 }

 const sort = (filters.sort as SortOption) ?? "popular";
 products = sortProducts(products, sort);

 return (
 <>
 <JsonLd
 data={{
 "@context": "https://schema.org",
 "@type": "ItemList",
 name: col.name,
 description: col.seoDescription,
 numberOfItems: products.length,
 itemListElement: products.map((p, i) => ({
 "@type": "ListItem",
 position: i + 1,
 url: `${siteConfig.url}/produkt/${p.slug}`,
 name: p.name,
 })),
 }}
 />

 <div className="container-site section-padding">
 <Breadcrumbs
 items={[
 { label: "Strona główna", href: "/" },
 { label: "Kolekcje", href: "/kolekcje" },
 { label: col.name },
 ]}
 className="mb-6"
 />

 <h1 className="font-display text-4xl font-bold">{col.name}</h1>
 <p className="mt-4 max-w-2xl text-muted-foreground">{col.description}</p>

 <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
 <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-surface" />}>
 <CollectionFilters className="hidden lg:block" />
 </Suspense>
 <div>
 <Suspense fallback={null}>
 <CollectionFilters className="mb-6 lg:hidden" />
 </Suspense>
 <p className="mb-6 text-sm text-muted-foreground">
 {products.length} produktów
 </p>
 <ProductGrid products={products} />
 </div>
 </div>

 <div className="prose prose-invert mt-16 max-w-3xl">
 <p className="text-muted-foreground">{col.seoDescription}</p>
 </div>
 </div>
 </>
 );
}
