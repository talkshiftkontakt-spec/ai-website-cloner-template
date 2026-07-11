"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  body: string;
  num?: string;
}

export function LinearAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-[var(--ll-border)] bg-[var(--ll-bg-secondary)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="flex items-center gap-4">
                {item.num ? (
                  <span className="font-mono text-sm text-[var(--ll-accent)]">{item.num}</span>
                ) : null}
                <span className="text-[15px] font-medium text-[var(--ll-text-primary)]">{item.title}</span>
              </div>
              <span className={cn("text-xl text-[var(--ll-text-tertiary)] transition-transform", isOpen && "rotate-45")}>
                +
              </span>
            </button>
            {isOpen ? (
              <div className="px-5 pb-5 text-[15px] leading-relaxed text-[var(--ll-text-secondary)]">
                {item.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function FaqAccordion({ groups }: { groups: { title: string; items: { q: string; a: string }[] }[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--ll-text-tertiary)]">
            {group.title}
          </h3>
          <LinearAccordion items={group.items.map((item) => ({ title: item.q, body: item.a }))} />
        </div>
      ))}
    </div>
  );
}
