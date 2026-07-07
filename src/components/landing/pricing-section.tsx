import { PricingCards } from "@/components/landing/pricing-cards";
import { Section } from "@/components/layout/section";

export function PricingSection() {
  return (
    <Section id="cennik-pelny" theme="light" padding="default">
      <p className="text-label text-tertiary">Cennik</p>
      <h2 className="text-display mt-3 text-light-text">Pełna oferta</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Wybierz poziom wsparcia. Wszystkie pakiety obejmują plan i kontakt z trenerem.
      </p>

      <div className="mt-10 [&_.text-primary]:text-light-text [&_.text-secondary]:text-muted-foreground [&_.text-tertiary]:text-tertiary [&_article]:border-border [&_article]:bg-white">
        <PricingCards variant="full" />
      </div>
    </Section>
  );
}
