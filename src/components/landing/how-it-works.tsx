import { HOW_IT_WORKS_STEPS } from "@/lib/constants/content";
import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

export function HowItWorks() {
  return (
    <Section id="jak-dziala" theme="raised">
      <FadeUp>
        <p className="text-label text-brand">Jak to działa</p>
        <h2 className="text-display mt-3 max-w-2xl text-primary">
          Prosty proces. Pełne wsparcie na każdym etapie.
        </h2>
      </FadeUp>

      <ol className="mt-12 space-y-0">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <FadeUp key={step.step} delay={index * 0.06}>
            <li className="grid gap-4 border-t border-border py-8 md:grid-cols-[80px_1fr] md:gap-8">
              <span className="font-[family-name:var(--font-mono)] text-sm text-brand">
                {step.step}
              </span>
              <div>
                <h3 className="text-xl font-medium text-primary">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          </FadeUp>
        ))}
      </ol>
    </Section>
  );
}
