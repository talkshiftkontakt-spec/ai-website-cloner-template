"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqItems } from "@/lib/cms/data";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
 items?: typeof faqItems;
 limit?: number;
}

export function FaqAccordion({ items = faqItems, limit }: FaqAccordionProps) {
 const displayItems = limit ? items.slice(0, limit) : items;
 const [openIndex, setOpenIndex] = useState<number | null>(0);

 return (
 <div className="space-y-2">
 {displayItems.map((item, index) => {
 const isOpen = openIndex === index;
 return (
 <div
 key={item.question}
 className="rounded-xl border border-border bg-surface overflow-hidden"
 >
 <button
 type="button"
 onClick={() => setOpenIndex(isOpen ? null : index)}
 className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-foreground hover:bg-surface-elevated"
 aria-expanded={isOpen}
 >
 {item.question}
 <ChevronDown
 className={cn(
 "size-5 shrink-0 text-muted-foreground transition-transform",
 isOpen && "rotate-180",
 )}
 />
 </button>
 {isOpen && (
 <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground text-pretty">
 {item.answer}
 </div>
 )}
 </div>
 );
 })}
 </div>
 );
}
