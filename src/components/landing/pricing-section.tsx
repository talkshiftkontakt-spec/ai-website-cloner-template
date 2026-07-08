import { PricingCards } from "@/components/landing/pricing-cards";
import { Section } from "@/components/layout/section";

export function PricingSection() {
  return (
    <Section id="cennik-pelny" theme="raised" padding="default">
      <p className="text-label text-destructive">Nie odkładaj na jutro</p>
      <h2 className="text-display mt-3 text-primary">Pełna oferta. Zero wymówek.</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary">
        Wybierz poziom wsparcia i zacznij już dzisiaj. Wszystkie pakiety obejmują plan,
        kontakt z trenerem i realne efekty, nie obietnice z reklamy.
      </p>

      <div className="mt-10">
        <PricingCards variant="full" />
      </div>
    </Section>
  );
}
