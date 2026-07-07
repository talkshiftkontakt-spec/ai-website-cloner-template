import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

const TRACKING_ITEMS = [
  {
    title: "Waga i pomiary",
    description: "Opcjonalnie — Ty decydujesz, co śledzimy i jak często.",
  },
  {
    title: "Energia, sen, samopoczucie",
    description: "Proste skale, które pokazują realną zmianę poza liczbą na wadze.",
  },
  {
    title: "Nawyki",
    description: "Cotygodniowe cele behawioralne zamiast obsesji na punkcie kalorii.",
  },
  {
    title: "Prywatny dziennik",
    description: "Zdjęcia i notatki tylko dla Ciebie i trenera — nigdy publicznie.",
  },
] as const;

export function ProgressTracking() {
  return (
    <Section id="postepy" theme="raised">
      <FadeUp>
        <p className="text-label text-brand">Śledzenie postępów</p>
        <h2 className="text-display mt-3 max-w-2xl text-primary">
          Mierzymy to, co naprawdę się zmienia
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary">
          Waga to jeden z wielu wskaźników. Skupiamy się na nawykach, energii i
          procesie — nie na codziennej obsesji liczb.
        </p>
      </FadeUp>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {TRACKING_ITEMS.map((item, index) => (
          <FadeUp key={item.title} delay={index * 0.05}>
            <div className="rounded-xl border border-border bg-canvas p-6">
              <h3 className="text-lg font-medium text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {item.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
