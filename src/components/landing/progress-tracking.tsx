import { Section } from "@/components/layout/section";

const TRACKING_ITEMS = [
  {
    title: "Waga i pomiary",
    description: "Opcjonalnie. Ty decydujesz, co śledzimy i jak często.",
  },
  {
    title: "Energia, sen, samopoczucie",
    description: "Proste skale zamiast obsesji na punkcie kalorii.",
  },
  {
    title: "Nawyki",
    description: "Cotygodniowe cele behawioralne z feedbackiem trenera.",
  },
  {
    title: "Prywatny dziennik",
    description: "Notatki i zdjęcia tylko między Tobą a trenerem.",
  },
] as const;

export function ProgressTracking() {
  return (
    <Section id="postepy" theme="raised">
      <p className="text-label text-secondary">Postępy</p>
      <h2 className="text-display mt-3 max-w-2xl text-primary">
        Liczby to nie wszystko.
      </h2>

      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2">
        {TRACKING_ITEMS.map((item) => (
          <div key={item.title} className="bg-canvas p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
