import { PricingCards } from "@/components/landing/pricing-cards";
import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

export function PricingSection() {
  return (
    <Section id="cennik-pelny" theme="light" padding="default">
      <FadeUp>
        <p className="text-label text-tertiary">Cennik</p>
        <h2 className="text-display mt-3 text-light-text">
          Wybierz poziom wsparcia dopasowany do Ciebie
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Każdy pakiet obejmuje indywidualny plan i kontakt z trenerem. Różnią się
          częstotliwością check-inów i poziomem wsparcia.
        </p>
      </FadeUp>

      <div className="mt-10 [&_.text-primary]:text-light-text [&_.text-secondary]:text-muted-foreground [&_.text-tertiary]:text-tertiary [&_article]:border-border [&_article]:bg-white">
        <PricingCards variant="full" />
      </div>
    </Section>
  );
}
