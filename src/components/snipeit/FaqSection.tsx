"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/snipeit/Reveal";
import { FAQ_ITEMS } from "@/lib/snipeit-content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1480px]">
        <Reveal className="mx-auto mb-10 scroll-mt-24 text-center md:mb-14">
          <p className="font-sf-expanded-medium mb-2 text-[12px] leading-[1.4] tracking-[0.22em] text-[#49768d] uppercase md:mb-3 md:text-[15px]">
            FAQ
          </p>
          <h2 className="text-gradient-section text-[28px] leading-[36px] tracking-tight md:text-[48px] md:leading-[50px]">
            <span className="font-sf-expanded-regular">Najczęściej zadawane </span>
            <span className="font-sf-expanded-bold">pytania</span>
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-[1567px] grid-cols-1 gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delayMs={index * 40}>
                <div className="overflow-hidden rounded-[12px] border border-[#303030] bg-[#242d2d]">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-[#2b3535]"
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index
                      )
                    }
                    aria-expanded={open}
                  >
                    <span className="font-satoshi pr-4 text-[18px] text-[#f0f0f0]">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    >
                      {open ? (
                        <Minus
                          className="h-3 w-3 shrink-0 text-[#f0f0f0]"
                          aria-hidden
                        />
                      ) : (
                        <Plus
                          className="h-3 w-3 shrink-0 text-[#f0f0f0]"
                          aria-hidden
                        />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="font-satoshi px-6 pt-0 pb-6 text-[15px] leading-[22px] text-[#9ebdbb] md:text-[16px] md:leading-[24px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
