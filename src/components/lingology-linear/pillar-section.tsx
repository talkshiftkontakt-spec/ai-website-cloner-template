"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { betweenLessons } from "@/lib/lingology-content";
import { cn } from "@/lib/utils";

import { LinearBody, LinearHeading } from "./ui";

const illustrations = [
  {
    id: "plan",
    image: "/lingology/img/app/dzisiejsze-powtorki.webp",
    alt: "Plan tygodniowy w LingoLogy App",
    label: "Plan tygodniowy",
  },
  {
    id: "homework",
    image: "/lingology/img/marketing/travel-airport.webp",
    alt: "Ćwiczenie mówienia w realnej sytuacji",
    label: "Zadania domowe",
  },
  {
    id: "reviews",
    image: "/lingology/img/marketing/travel-directions-map.webp",
    alt: "Powtórki i śledzenie postępów",
    label: "Powtórki w aplikacji",
  },
] as const;

export function BetweenLessonsPillarSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const ingredientRefs = useRef<(HTMLLIElement | null)[]>([]);

  const syncFromScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section || window.innerWidth < 1024) return;

    const mid = window.innerHeight * 0.42;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < ingredientRefs.current.length; i++) {
      const node = ingredientRefs.current[i];
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height * 0.5 - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }

    setActive(best);
  }, []);

  useEffect(() => {
    const onScroll = () => syncFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncFromScroll]);

  const illustration = illustrations[Math.min(active, illustrations.length - 1)];

  return (
    <section id="between-lessons" ref={sectionRef} className="M31rWW_root Fzcv4W_inset border-t border-white/5">
      <div className="b-30Va_header">
        <div className="b-30Va_titleContainer">
          <div className="b-30Va_action mb-4 inline-flex items-center gap-3 font-mono text-sm text-[var(--color-text-tertiary)]">
            <span className="Fzcv4W_slashedZero text-[var(--color-accent)]">2.0</span>
            <span>Między lekcjami</span>
            <span className="text-[var(--color-text-quaternary)]">→</span>
          </div>
          <LinearHeading className="b-30Va_title">{betweenLessons.title}</LinearHeading>
        </div>
        <div className="b-30Va_descriptionContainer">
          <LinearBody className="b-30Va_descriptionText">{betweenLessons.description}</LinearBody>
        </div>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ul className="M31rWW_ingredients">
          {betweenLessons.cards.map((card, index) => (
            <li
              key={card.title}
              ref={(node) => {
                ingredientRefs.current[index] = node;
              }}
              className="M31rWW_unevenIngredient"
            >
              <button
                type="button"
                className="M31rWW_ingredientButton w-full text-left"
                onClick={() => setActive(index % illustrations.length)}
              >
                <span
                  className={cn(
                    "M31rWW_ingredientLink",
                    active === index % illustrations.length && "brightness-125",
                  )}
                >
                  <span className="M31rWW_ingredient font-mono text-[13px] text-[var(--color-text-tertiary)]">
                    <span className="text-[var(--color-accent)]">2.{index + 1}</span>
                    <span className="ml-2">{card.title}</span>
                    <span className="M31rWW_ingredientPlus">+</span>
                  </span>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                    {card.body}
                  </p>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="M31rWW_illustration lg:sticky lg:top-[calc(var(--header-height)+48px)]">
          <div className="b-30Va_illustrationWrapper">
            <div className="Fzcv4W_edgeHighlight relative w-full overflow-hidden rounded-2xl border border-[var(--color-border-translucent)] bg-[var(--color-bg-panel)]">
              <div className="SPbJba_grain SPbJba_grainSubtle" aria-hidden />
              <div className="relative aspect-[4/3] w-full">
                {illustrations.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300 ease-out",
                      active === index ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--color-border-translucent)] px-4 py-3">
                <p className="font-mono text-[11px] text-[var(--color-text-quaternary)]">{illustration.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
