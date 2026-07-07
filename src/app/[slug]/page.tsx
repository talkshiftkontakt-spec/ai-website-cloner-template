import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { ContentBlocks, CtaBanner } from "@/components/ContentBlocks";
import { OfferCardsSection } from "@/components/OfferCardsSection";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PricingFullSection } from "@/components/PricingFullSection";
import { SpecialistProfilesSection } from "@/components/SpecialistProfilesSection";
import {
  getPage,
  offerCards,
  pageSlugs,
  pricingFaq,
  pricingSections,
  specialistProfiles,
} from "@/lib/pages-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function SubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  if (slug === "specjalisci") {
    const intro = page.blocks.find((b) => b.type === "paragraph")?.text;
    return (
      <PageShell>
        <PageHero title={page.h1} description={intro} />
        <SpecialistProfilesSection profiles={specialistProfiles} />
        <CtaBanner />
      </PageShell>
    );
  }

  if (slug === "cennik") {
    const intro = page.blocks.find((b) => b.type === "paragraph")?.text;
    const cancellationNote = page.blocks.find(
      (b) => b.type === "paragraph" && b.text?.includes("odwoływanie wizyt")
    )?.text;
    return (
      <PageShell>
        <PageHero title={page.h1} />
        <PricingFullSection
          sections={pricingSections}
          faq={pricingFaq}
          intro={intro}
          cancellationNote={cancellationNote}
        />
      </PageShell>
    );
  }

  if (slug === "kontakt") {
    const phone = page.blocks.find((b) => b.text?.includes("12 431"))?.text;
    const hours = page.blocks.find((b) => b.text?.includes("Poniedziałek"))?.text;
    const email = page.blocks.find((b) => b.text?.includes("@"))?.text;
    return (
      <PageShell>
        <PageHero title={page.h1} description="Zapraszamy do kontaktu. Odpowiadamy tak szybko, jak to możliwe." />
        <section className="mx-auto max-w-4xl px-6 pb-4 lg:px-8">
          <div className="grid gap-4 rounded-2xl border border-[#134340]/10 bg-[#f8faf9] p-6 text-[#3d4a47] sm:grid-cols-3">
            {phone ? <p className="text-sm leading-relaxed">{phone}</p> : null}
            {hours ? <p className="text-sm leading-relaxed">{hours}</p> : null}
            {email ? <p className="text-sm leading-relaxed">{email}</p> : null}
          </div>
        </section>
        <ContactSection />
      </PageShell>
    );
  }

  if (slug === "oferta") {
    return (
      <PageShell>
        <PageHero title={page.h1} />
        <ContentBlocks blocks={page.blocks} />
        <OfferCardsSection cards={offerCards} />
        <CtaBanner />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero title={page.h1} />
      <ContentBlocks blocks={page.blocks} />
      <CtaBanner />
    </PageShell>
  );
}
