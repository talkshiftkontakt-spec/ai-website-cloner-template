import Link from "next/link";

import {
  CollectionShowcase,
  FeaturedProducts,
} from "@/components/marketing/FeaturedProducts";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { HeroSection } from "@/components/marketing/HeroSection";
import { LimitedEditionBanner } from "@/components/marketing/LimitedEditionBanner";
import {
  TestimonialsSection,
  UGCGallery,
} from "@/components/marketing/TestimonialsSection";
import { PaymentBadges, TrustStrip } from "@/components/marketing/TrustStrip";
import { WhyCollectSection } from "@/components/marketing/WhyCollectSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button-variants";
import { getProductBySlug } from "@/lib/cms/data";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const creatorProduct = getProductBySlug("tworca-friz");

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
      <WhyCollectSection />
      <FeaturedProducts />
      <CollectionShowcase />
      <LimitedEditionBanner />

      {creatorProduct && (
        <section className="section-padding bg-surface">
          <div className="container-site">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Kolekcja Twórców
                </p>
                <h2 className="font-display text-3xl font-bold">
                  {creatorProduct.name}
                </h2>
                <p className="text-muted-foreground">
                  {creatorProduct.description.slice(0, 200)}…
                </p>
                <Link
                  href={`/produkt/${creatorProduct.slug}`}
                  className={cn(buttonVariants())}
                >
                  Zobacz kolaborację
                </Link>
              </div>
              <div className="rounded-xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Oficjalna kolaboracja
                </p>
                <p className="mt-2 font-display text-2xl font-bold">
                  {creatorProduct.creator}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Limitowana seria z certyfikatem autentyczności
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <UGCGallery />
      <TestimonialsSection />

      <section className="section-padding bg-surface">
        <div className="container-site">
          <h2 className="text-center font-display text-3xl font-bold">
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
          <h2 className="font-display text-3xl font-bold">
            Rozpocznij swoją kolekcję
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Dołącz do {siteConfig.stats.collectors}+ kolekcjonerów, którzy
            przenieśli swoją historię Minecraft na półkę.
          </p>
          <Link
            href="/kolekcje/wszystkie"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 h-12 px-8")}
          >
            Przeglądaj kolekcję
          </Link>
        </div>
      </section>
    </>
  );
}
