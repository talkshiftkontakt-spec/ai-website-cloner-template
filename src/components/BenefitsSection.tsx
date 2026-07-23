"use client";

import Image from "next/image";
import { useState } from "react";
import { studentBenefits, tutorBenefits } from "@/lib/tutoreo-content";
import type { BenefitCard } from "@/types/tutoreo";
import { cn } from "@/lib/utils";

function InformativeBlock({ card }: { card: BenefitCard }) {
  return (
    <article className="flex w-full max-w-[420px] flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-[var(--PopOffShadow)]">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full shadow-[var(--ShinyShadow)]"
        style={{ backgroundColor: card.backgroundColor }}
      >
        <Image
          src={card.iconUrl}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]"
        />
      </div>
      <h2 className="text-center text-[24px] font-bold leading-6 text-black">
        {card.title}
      </h2>
      <hr className="h-px w-full border-0 bg-[#c5c5c5]" />
      <p className="text-center text-[20px] font-thin leading-6 text-black min-[1000px]:text-[24px]">
        {card.description}
      </p>
    </article>
  );
}

export function BenefitsSection() {
  const [audience, setAudience] = useState<"tutor" | "student">("tutor");
  const cards = audience === "tutor" ? tutorBenefits : studentBenefits;

  return (
    <section
      id="BenefitsSection"
      className="relative flex flex-col items-center overflow-hidden bg-[var(--TonedBackground)] px-4 py-12 min-[1000px]:px-6"
    >
      <div
        id="BenefitsCategories"
        className="flex items-center justify-center gap-6 overflow-hidden whitespace-nowrap rounded-2xl bg-white px-8 py-4 shadow-[var(--PopOffShadow)] min-[1000px]:px-12"
      >
        <button
          type="button"
          className={cn(
            "relative text-[20px] font-bold leading-[18px] transition-colors duration-200 min-[1000px]:text-[24px]",
            audience === "tutor" ? "text-black" : "text-[var(--Dark2)]",
            audience === "tutor" &&
              "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[var(--AccentColor)] after:content-['']"
          )}
          onClick={() => setAudience("tutor")}
        >
          Dla korepetytora
        </button>
        <button
          type="button"
          className={cn(
            "relative text-[20px] font-bold leading-[18px] transition-colors duration-200 min-[1000px]:text-[24px]",
            audience === "student" ? "text-black" : "text-[var(--Dark2)]",
            audience === "student" &&
              "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[var(--AccentColor)] after:content-['']"
          )}
          onClick={() => setAudience("student")}
        >
          Dla ucznia
        </button>
      </div>

      <div className="mt-6 flex w-full max-w-[1392px] flex-col items-stretch justify-center gap-6 min-[1000px]:flex-row">
        {cards.map((card) => (
          <InformativeBlock key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
