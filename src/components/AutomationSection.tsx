import Image from "next/image";

import { automationCards } from "@/lib/raycast-content";
import type { AutomationCard } from "@/types/raycast";
import { cn } from "@/lib/utils";

function HotkeysVisual() {
  return (
    <div className="flex h-[200px] items-center justify-center gap-3 bg-gradient-to-b from-[#1a1b1e] to-[#111214] px-6">
      {[
        { label: "option", symbol: "⌥" },
        { label: "command", symbol: "⌘" },
        { label: "L", symbol: "L" },
      ].map((key, index) => (
        <div key={key.label} className="flex items-center gap-3">
          {index > 0 ? (
            <span className="text-lg text-white/40" aria-hidden="true">
              +
            </span>
          ) : null}
          <div className="flex h-16 min-w-[72px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0c0d0f] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span className="text-lg text-white">{key.symbol}</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-ray-muted">
              {key.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AutomationCardItem({
  card,
  wide,
}: {
  card: AutomationCard;
  wide?: boolean;
}) {
  const isHotkeys = card.title === "Hotkeys and Aliases";

  if (wide) {
    return (
      <article className="col-span-full grid overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
          <p className="max-w-md text-[15px] leading-relaxed text-ray-muted">
            {card.description}
          </p>
        </div>
        {card.imageSrc ? (
          <div className="relative min-h-[220px] overflow-hidden bg-[#0c1020]">
            <Image
              src={card.imageSrc}
              alt={card.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
      )}
    >
      {card.imageSrc ? (
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src={card.imageSrc}
            alt={card.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : isHotkeys ? (
        <HotkeysVisual />
      ) : null}

      <div className="mt-auto flex flex-col gap-3 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-white">{card.title}</h3>
        <p className="max-w-md text-[15px] leading-relaxed text-ray-muted">
          {card.description}
        </p>
      </div>
    </article>
  );
}

export function AutomationSection() {
  const wideCard = automationCards.find((card) => card.wide);
  const halfCards = automationCards.filter((card) => !card.wide);

  return (
    <section className="bg-[#07080a] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Don&apos;t repeat yourself.
          </h2>
          <p className="mt-2 text-base text-ray-muted">
            Automate the things you do all the time.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {wideCard ? <AutomationCardItem card={wideCard} wide /> : null}
          {halfCards.map((card) => (
            <AutomationCardItem key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
