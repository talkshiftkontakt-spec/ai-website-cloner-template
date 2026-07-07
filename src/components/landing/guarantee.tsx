import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

const GUARANTEES = [
  {
    title: "14 dni gwarancji satysfakcji",
    description:
      "Po pierwszej konsultacji i otrzymaniu planu — jeśli to nie dla Ciebie, zwracamy opłatę za pierwszy miesiąc.",
  },
  {
    title: "Bez ukrytych opłat",
    description:
      "Cena na stronie to cena, którą płacisz. Bez dopłat za kontakt czy korekty planu.",
  },
  {
    title: "Elastyczna współpraca",
    description:
      "Po okresie minimum — miesięczne wypowiedzenie. Bez rocznych blokad.",
  },
] as const;

export function Guarantee() {
  return (
    <Section id="gwarancja">
      <FadeUp>
        <p className="text-label text-brand">Gwarancje</p>
        <h2 className="text-display mt-3 text-primary">
          Zaczynasz z pewnością, nie z ryzykiem
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {GUARANTEES.map((item, index) => (
          <FadeUp key={item.title} delay={index * 0.06}>
            <div className="h-full rounded-xl border border-border bg-canvas-raised p-6 lg:p-8">
              <h3 className="text-lg font-medium text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {item.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
