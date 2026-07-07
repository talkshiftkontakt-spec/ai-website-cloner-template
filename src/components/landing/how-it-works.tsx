import { HOW_IT_WORKS_STEPS } from "@/lib/constants/content";
import { Section } from "@/components/layout/section";

export function HowItWorks() {
  return (
    <Section id="jak-dziala" theme="raised">
      <p className="text-label text-secondary">Jak to działa</p>
      <h2 className="text-display mt-3 max-w-2xl text-primary">
        Od aplikacji do planu w kilka dni.
      </h2>

      <ol className="mt-10">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li
            key={step.step}
            className="grid gap-4 border-t border-border py-8 md:grid-cols-[72px_1fr]"
          >
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-primary/30">
              {step.step}
            </span>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide text-primary">
                {step.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
