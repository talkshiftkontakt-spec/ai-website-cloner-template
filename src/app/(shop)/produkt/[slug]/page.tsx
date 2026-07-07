import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
 getProductBySlug,
 getRelatedProducts,
 products,
} from "@/lib/cms/data";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
 params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
 return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
 const { slug } = await params;
 const product = getProductBySlug(slug);
 if (!product) return {};
 return createPageMetadata({
 title: product.name,
 description: product.shortDescription,
 path: `/produkt/${slug}`,
 image: product.images[0]?.url,
 });
}

export default async function ProductPage({ params }: PageProps) {
 const { slug } = await params;
 const product = getProductBySlug(slug);
 if (!product) notFound();

 const related = getRelatedProducts(product.relatedProductSlugs);
 const crossSell = getRelatedProducts(product.crossSellSlugs);
 const avgRating =
 product.reviews.length > 0
 ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
 : 0;

 return (
 <>
 <JsonLd
 data={{
 "@context": "https://schema.org",
 "@type": "Product",
 name: product.name,
 description: product.shortDescription,
 image: product.images.map((i) => `${siteConfig.url}${i.url}`),
 brand: { "@type": "Brand", name: siteConfig.name },
 offers: {
 "@type": "AggregateOffer",
 lowPrice: (product.priceFrom / 100).toFixed(2),
 highPrice: (
 Math.max(...product.variants.map((v) => v.price)) / 100
 ).toFixed(2),
 priceCurrency: "PLN",
 availability:
 product.stock > 0
 ? "https://schema.org/InStock"
 : "https://schema.org/OutOfStock",
 },
 aggregateRating:
 product.reviews.length > 0
 ? {
 "@type": "AggregateRating",
 ratingValue: avgRating.toFixed(1),
 reviewCount: product.reviews.length,
 }
 : undefined,
 }}
 />

 <div className="container-site section-padding">
 <Breadcrumbs
 items={[
 { label: "Strona główna", href: "/" },
 { label: "Kolekcje", href: "/kolekcje" },
 {
 label: product.categoryName,
 href: `/kolekcje/${product.categorySlug}`,
 },
 { label: product.name },
 ]}
 className="mb-8"
 />

 <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
 <ProductGallery images={product.images} productName={product.name} />
 <ProductPurchasePanel product={product} />
 </div>

 <div className="mt-20 space-y-16">
 {product.lore && (
 <section>
 <h2 className="font-display text-2xl font-bold">Historia</h2>
 <p className="mt-4 max-w-3xl text-muted-foreground">{product.lore}</p>
 </section>
 )}

 <section>
 <h2 className="font-display text-2xl font-bold">Opis</h2>
 <p className="mt-4 max-w-3xl text-muted-foreground text-pretty">
 {product.description}
 </p>
 </section>

 <section>
 <h2 className="font-display text-2xl font-bold">Wymiary</h2>
 <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {[
 ["Wysokość", `${product.dimensions.heightMm} mm`],
 ["Szerokość", `${product.dimensions.widthMm} mm`],
 ["Głębokość", `${product.dimensions.depthMm} mm`],
 ["Waga", `${product.dimensions.weightG} g`],
 ["Pudełko", product.dimensions.boxSize],
 ].map(([label, value]) => (
 <div key={label} className="rounded-lg border border-border bg-surface p-4">
 <dt className="text-xs text-muted-foreground">{label}</dt>
 <dd className="mt-1 font-mono text-sm font-medium">{value}</dd>
 </div>
 ))}
 </dl>
 </section>

 <section>
 <h2 className="font-display text-2xl font-bold">Materiały</h2>
 <div className="mt-4 grid gap-4 sm:grid-cols-2">
 {product.materials.map((m) => (
 <div key={m.name} className="rounded-lg border border-border bg-surface p-4">
 <p className="text-sm font-medium">{m.name}</p>
 <p className="mt-1 text-sm text-muted-foreground">{m.value}</p>
 </div>
 ))}
 </div>
 </section>

 <section>
 <h2 className="font-display text-2xl font-bold">Opinie</h2>
 <div className="mt-6 space-y-4">
 {product.reviews.map((review) => (
 <div
 key={review.id}
 className="rounded-xl border border-border bg-surface p-6"
 >
 <div className="flex items-center justify-between">
 <p className="font-medium">{review.author}</p>
 {review.verified && (
 <span className="text-xs text-primary">Zweryfikowany zakup</span>
 )}
 </div>
 <p className="mt-2 text-sm text-muted-foreground">{review.content}</p>
 </div>
 ))}
 </div>
 </section>

 {related.length > 0 && (
 <section>
 <h2 className="font-display text-2xl font-bold">Powiązane produkty</h2>
 <div className="mt-6">
 <ProductGrid products={related} />
 </div>
 </section>
 )}

 {crossSell.length > 0 && (
 <section>
 <h2 className="font-display text-2xl font-bold">Kompletuj kolekcję</h2>
 <div className="mt-6">
 <ProductGrid products={crossSell} />
 </div>
 </section>
 )}

 <section>
 <h2 className="font-display text-2xl font-bold">FAQ produktu</h2>
 <div className="mt-6 max-w-2xl">
 <FaqAccordion limit={3} />
 </div>
 </section>

 <section className="rounded-xl border border-primary/30 bg-primary/5 p-8">
 <h2 className="font-display text-xl font-bold">Gwarancja jakości</h2>
 <p className="mt-2 text-sm text-muted-foreground">
 Każda główka przechodzi kontrolę jakości przed wysyłką. Uszkodzenie
 w transporcie? Wymienimy bezpłatnie w ciągu 14 dni.
 </p>
 </section>
 </div>
 </div>
 </>
 );
}
