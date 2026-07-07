import Link from "next/link";
import Image from "next/image";

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
      <WhyCollectSection />

      {/* Personalized heads spotlight — secondary hero */}
      <section className="section-padding relative overflow-hidden">
        <Image
          src="/images/hero/minecraft-overworld.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/82" aria-hidden />
        <div className="container-site relative">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 space-y-6 lg:order-1">
              <p className="pixel-label text-grass">Główny produkt</p>
              <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl text-balance">
                Personalizowana główka ze skina
              </h2>
              <p className="text-lg text-white/80 text-pretty">
                To nasz flagowy produkt. Wgrywasz skin, widzisz podgląd 3D i
                zamawiasz fizyczną główkę wykonaną ręcznie w Polsce — idealna na
                prezent lub własną kolekcję.
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
                  Podgląd 3D w konfiguratorze przed zakupem
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 shrink-0 rounded-sm bg-grass"
                    aria-hidden
                  />
                  Od {customProduct?.priceFrom ?? 149} zł · wysyłka 3–5 dni
                </li>
              </ul>
              <Link href="/konfigurator" className="mc-button inline-flex">
                Rozpocznij personalizację
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mc-panel mx-auto max-w-md p-6 md:p-8">
                <p className="pixel-label text-grass">Przykłady personalizacji</p>
                <div className="mt-6 flex items-end justify-center gap-5 sm:gap-8">
                  {[
                    { src: "/images/heads/notch.png", alt: "Główka Notch", size: "h-20 w-20 sm:h-24 sm:w-24" },
                    { src: "/images/heads/dream.png", alt: "Główka Dream", size: "h-28 w-28 sm:h-32 sm:w-32" },
                    { src: "/images/heads/alex.png", alt: "Główka Alex", size: "h-20 w-20 sm:h-24 sm:w-24" },
                  ].map((head) => (
                    <div
                      key={head.src}
                      className={`relative shrink-0 ${head.size}`}
                    >
                      <Image
                        src={head.src}
                        alt={head.alt}
                        fill
                        sizes="128px"
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-sm text-white/65">
                  Każda główka drukowana 1:1 z Twojego pliku skina
                </p>
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
            Gotowy na swoją główkę?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Dołącz do {siteConfig.stats.collectors}+ kolekcjonerów. Wgraj skin i
            zobacz, jak wygląda na półce.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/konfigurator" className="mc-button">
              Stwórz personalizowaną główkę
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
