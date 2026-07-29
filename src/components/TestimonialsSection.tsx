"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/types/content";
import { useReveal } from "@/hooks/useReveal";
import { QuoteIcon, WaveTop } from "@/components/icons";
import {
  SectionDivider,
  SectionEyebrow,
  SectionTitle,
} from "@/components/SiteChrome";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const { ref, className } = useReveal<HTMLElement>();
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(2);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 768 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - perView);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => window.clearInterval(id);
  }, [maxIndex]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  return (
    <section
      id="opinie"
      ref={ref}
      className={`relative bg-[#f7f9f5] px-4 pb-[100px] pt-10 md:px-8 ${className}`}
    >
      <WaveTop fill="#83AC861F" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionEyebrow>OPINIE</SectionEyebrow>
        <SectionTitle>Zobacz, co mówią moi uczniowie</SectionTitle>
        <SectionDivider />

        <div className="relative mt-6 px-0 md:px-12">
          <button
            type="button"
            aria-label="Poprzednia opinia"
            onClick={() => go(-1)}
            className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 text-[#83AC86] md:block"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            aria-label="Następna opinia"
            onClick={() => go(1)}
            className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 text-[#83AC86] md:block"
          >
            <ChevronRight size={28} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                width: `${(TESTIMONIALS.length / perView) * 100}%`,
                transform: `translateX(-${(index * 100) / TESTIMONIALS.length}%)`,
              }}
            >
              {TESTIMONIALS.map((t) => (
                <article
                  key={`${t.name}-${t.role}`}
                  className="box-border px-2"
                  style={{ width: `${100 / TESTIMONIALS.length}%` }}
                >
                  <div className="relative h-full rounded-2xl border border-[#eee] bg-[#83AC8621] p-6">
                    <QuoteIcon
                      size={42}
                      className="absolute top-4 right-5 text-[#83AC86C7]"
                    />
                    <div className="mb-4 flex items-center gap-4">
                      <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                      <div>
                        <p className="font-sans text-[18px] font-medium text-[#272727]">
                          {t.name}
                        </p>
                        <p className="font-sans text-[14px] italic text-[#272727]">
                          {t.role}
                        </p>
                        <div className="mt-1 flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < t.rating
                                  ? "fill-[#F5A623] text-[#F5A623]"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="font-sans text-[15px] leading-relaxed text-black">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slajd ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-[9px] w-[9px] rounded-full transition-colors",
                  i === index ? "bg-[#83AC86]" : "bg-[#83AC86]/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
