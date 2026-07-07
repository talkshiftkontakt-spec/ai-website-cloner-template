import { PricingCards } from "@/components/landing/pricing-cards";
import { Section } from "@/components/layout/section";

export function PricingSection() {
  return (
    <Section id="cennik-pelny" theme="raised" padding="default">
      <p className="text-label text-secondary">Cennik</p>
      <h2 className="text-display mt-3 text-primary">Pełna oferta</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary">
        Wybierz poziom wsparcia. Wszystkie pakiety obejmują plan i kontakt z trenerem.
      </p>

      <div className="mt-10">
        <PricingCards variant="full" />
      </div>
    </Section>
  );
}
