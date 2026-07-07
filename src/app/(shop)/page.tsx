import Link from "next/link";
import Image from "next/image";

import { BackgroundCover } from "@/components/ui/background-cover";

import {
 CollectionShowcase,
 FeaturedProducts,
} from "@/components/marketing/FeaturedProducts";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { LimitedEditionBanner } from "@/components/marketing/LimitedEditionBanner";
import {
 TestimonialsSection,
 UGCGallery,
} from "@/components/marketing/TestimonialsSection";
import { ProductCanvasGallery } from "@/components/marketing/ProductCanvasGallery";
import { PaymentBadges, TrustStrip } from "@/components/marketing/TrustStrip";
import { WhyCollectSection } from "@/components/marketing/WhyCollectSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductBySlug } from "@/lib/cms/data";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
 const customProduct = getProductBySlug("twoj-skin");

 return (
 <>
 <JsonLd
 data={{
 "@context": "https://schema.org",
 "@type": "WebSite",
 name: siteConfig.name,
 url: siteConfig.url,
 description: siteConfig.description,
 potentialAction: {
 "@type": "SearchAction",
 target: `${siteConfig.url}/kolekcje/wszystkie?q={search_term_string}`,
 "query-input": "required name=search_term_string",
 },
 }}
 />
 <JsonLd
 data={{
 "@context": "https://schema.org",
 "@type": "Organization",
 name: siteConfig.name,
 url: siteConfig.url,
 email: siteConfig.email,
 address: {
 "@type": "PostalAddress",
 addressLocality: "Wrocław",
 addressCountry: "PL",
 },
 }}
 />

 <HeroSection />
 <ProductCanvasGallery />
 <WhyCollectSection />
 <HowItWorksSection />

 {/* Personalized canvas spotlight */}
 <section className="section-padding relative isolate overflow-hidden">
 <BackgroundCover
 src="/images/hero/minecraft-overworld.jpg"
 position="center 40%"
 className="z-0"
 />
 <div className="absolute inset-0 z-[1] bg-background/82" aria-hidden />
 <div className="container-site relative z-10">
 <div className="grid items-center gap-10 lg:grid-cols-2">
 <div className="order-2 space-y-6 lg:order-1">
 <p className="pixel-label text-grass">Główny produkt</p>
 <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl text-balance">
 Personalizowany obraz ze skina
 </h2>
 <p className="text-lg text-white/80 text-pretty">
 Wgrywasz PNG skina, widzisz podgląd płaskiego obrazu na
 płótnie i zamawiasz canvas na ścianę, dokładnie tak, jak na
 twojskinek.pl.
 </p>
 <ul className="space-y-2 text-sm text-white/70">
 <li className="flex items-center gap-2">
 <span
 className="inline-block h-2 w-2 shrink-0 rounded-sm bg-grass"
 aria-hidden
 />
 Format PNG 64×64 lub 64×32 (klasyczny skin)
 </li>
 <li className="flex items-center gap-2">
 <span
 className="inline-block h-2 w-2 shrink-0 rounded-sm bg-grass"
 aria-hidden
 />
 Podgląd obrazu na płótnie przed zamówieniem
 </li>
 <li className="flex items-center gap-2">
 <span
 className="inline-block h-2 w-2 shrink-0 rounded-sm bg-grass"
 aria-hidden
 />
 Od {customProduct?.priceFrom ?? 149} zł · wysyłka 3 do 5 dni
 </li>
 </ul>
 <Link href="/konfigurator" className="mc-button inline-flex">
 Zamów personalizowany obraz
 </Link>
 </div>

 <div className="order-1 lg:order-2">
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="mc-panel overflow-hidden sm:col-span-2">
 <Image
 src="/images/products/twojskinek/product-closeup.png"
 alt="Zbliżenie na obraz ze skinem Minecraft na płótnie"
 width={1080}
 height={1080}
 className="h-auto w-full"
 sizes="(max-width: 768px) 100vw, 50vw"
 />
 </div>
 <div className="mc-panel overflow-hidden">
 <Image
 src="/images/products/twojskinek/product-3d-view.png"
 alt="Płaski obraz na płótnie, widok z boku"
 width={1080}
 height={1080}
 className="h-auto w-full"
 sizes="240px"
 />
 </div>
 <div className="mc-panel overflow-hidden">
 <Image
 src="/images/products/twojskinek/product-in-living-room.png"
 alt="Obraz ze skinem w salonie"
 width={1080}
 height={1080}
 className="h-auto w-full"
 sizes="240px"
 />
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <FeaturedProducts />
 <CollectionShowcase />
 <LimitedEditionBanner />
 <UGCGallery />
 <TestimonialsSection />

 <section className="section-padding bg-surface">
 <div className="container-site">
 <h2 className="text-center font-display text-3xl font-extrabold text-white">
 Najczęstsze pytania
 </h2>
 <div className="mx-auto mt-8 max-w-2xl">
 <FaqAccordion limit={5} />
 </div>
 </div>
 </section>

 <section className="section-padding">
 <div className="container-site text-center">
 <TrustStrip className="mb-10" />
 <PaymentBadges className="mb-10 justify-center" />
 <h2 className="font-display text-3xl font-extrabold text-white">
 Gotowy na obraz na ścianie?
 </h2>
 <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
 Wgraj skin i zobacz, jak wygląda na płótnie, zanim zamówisz.
 </p>
 <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
 <Link href="/konfigurator" className="mc-button">
 Zamów swój obrazek
 </Link>
 <Link href="/kolekcje/wszystkie" className="mc-button-outline">
 Przeglądaj kolekcję
 </Link>
 </div>
 </div>
 </section>
 </>
 );
}
