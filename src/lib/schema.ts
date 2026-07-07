import { PRICING_TIERS } from "@/lib/constants/pricing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lekkistart.pl";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "LekkiStart",
    url: SITE_URL,
    description:
      "Premium coaching online dla osób z nadwagą i otyłością.",
    areaServed: "PL",
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LekkiStart — Coaching Odchudzania",
    description:
      "Indywidualny coaching treningowy i żywieniowy dla osób z nadwagą i otyłością.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Poland" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pakiety coachingowe",
      itemListElement: PRICING_TIERS.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        price: tier.price,
        priceCurrency: "PLN",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
      })),
    },
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
