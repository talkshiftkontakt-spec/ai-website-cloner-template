"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { FAQ_ITEMS } from "@/lib/constants/faq";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" theme="light">
      <p className="text-label text-tertiary">FAQ</p>
      <h2 className="text-display mt-3 text-light-text">Pytania przed startem</h2>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-light-text">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-0.5 size-5 shrink-0 text-tertiary transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
