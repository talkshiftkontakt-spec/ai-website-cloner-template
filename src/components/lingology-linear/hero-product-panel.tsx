import Image from "next/image";

export function HeroProductPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
      <div className="Fzcv4W_edgeHighlight relative overflow-hidden rounded-2xl border border-[var(--color-border-translucent)] bg-[var(--color-bg-panel)] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <div className="SPbJba_grain SPbJba_grainSubtle" aria-hidden />

        <div className="relative border-b border-[var(--color-border-translucent)] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#5e6ad2]" />
              <span className="size-2 rounded-full bg-[#8a8f98]/50" />
              <span className="size-2 rounded-full bg-[#8a8f98]/50" />
            </div>
            <span className="font-mono text-[11px] text-[var(--color-text-quaternary)]">lingology.app</span>
          </div>
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[220px_1fr]">
          <aside className="border-b border-[var(--color-border-translucent)] p-4 lg:border-b-0 lg:border-r">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-quaternary)]">
              Dzisiejszy plan
            </p>
            <ul className="space-y-2 text-[13px]">
              <li className="rounded-md bg-[var(--color-bg-tertiary)] px-3 py-2 text-[var(--color-text-primary)]">
                Powtórki zwrotów
              </li>
              <li className="rounded-md px-3 py-2 text-[var(--color-text-tertiary)]">Ćwiczenie mówione</li>
              <li className="rounded-md px-3 py-2 text-[var(--color-text-tertiary)]">Słownictwo z lekcji</li>
            </ul>
            <div className="mt-4 rounded-lg border border-[var(--color-border-translucent)] p-3">
              <p className="font-mono text-[10px] text-[var(--color-text-quaternary)]">LESSON-042</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">Small talk w pracy</p>
              <span className="mt-2 inline-flex rounded-full bg-[#5e6ad2]/25 px-2 py-0.5 text-[10px] text-[#9b9aff]">
                W trakcie
              </span>
            </div>
          </aside>

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Dzisiejsze powtórki</p>
              <span className="font-mono text-[11px] text-[var(--color-accent)]">3 / 8</span>
            </div>

            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-[var(--color-border-translucent)] bg-[var(--color-bg-secondary)]">
              <Image
                src="/lingology/img/app/dzisiejsze-powtorki.webp"
                alt="LingoLogy App — ekran dzisiejszych powtórek"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 360px"
              />
            </div>

            <div className="space-y-2 border-t border-[var(--color-border-translucent)] pt-3">
              <ActivityRow time="2 min temu" text="Przypomnienie: wróć do zwrotu „Could we sync on this?”" />
              <ActivityRow time="wczoraj" text="Lekcja 1:1 — poprawiono 4 błędy w mówieniu" highlight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityRow({
  time,
  text,
  highlight,
}: {
  time: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-3 text-[12px] leading-snug">
      <span className="shrink-0 font-mono text-[var(--color-text-quaternary)]">{time}</span>
      <span className={highlight ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-tertiary)]"}>
        {text}
      </span>
    </div>
  );
}
