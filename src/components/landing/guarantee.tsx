import { Section } from "@/components/layout/section";

const GUARANTEES = [
  {
    title: "14 dni gwarancji",
    description:
      "Po pierwszej konsultacji i planie, jeśli to nie dla Ciebie, zwracamy pierwszy miesiąc.",
  },
  {
    title: "Bez ukrytych opłat",
    description: "Cena na stronie = cena, którą płacisz. Kontakt w cenie.",
  },
  {
    title: "Bez rocznej blokady",
    description: "Po minimum wypowiedzenie miesięczne. Bez pułapek umownych.",
  },
] as const;

export function Guarantee() {
  return (
    <Section id="gwarancja">
      <p className="text-label text-secondary">Gwarancje</p>
      <h2 className="text-display mt-3 text-primary">Start bez ryzyka</h2>

      <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
        {GUARANTEES.map((item) => (
          <div key={item.title} className="bg-canvas-raised p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-destructive/25 bg-destructive-subtle p-6 text-center md:p-8">
        <p className="text-sm font-semibold text-destructive-foreground">
          Masz wątpliwości? Przetestuj bez ryzyka przez 14 dni.
        </p>
        <a
          href="#aplikacja"
          className="mt-5 inline-flex h-12 items-center justify-center bg-destructive px-8 text-sm font-bold uppercase tracking-wider text-canvas transition-colors hover:bg-destructive/90"
        >
          Zacznij już dzisiaj
        </a>
      </div>
    </Section>
  );
}
