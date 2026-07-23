"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import {
  extensionCards,
  extensionCategories,
} from "@/lib/raycast-content";
import { cn } from "@/lib/utils";
import type { ExtensionCategory } from "@/types/raycast";

const CARD_SCROLL_OFFSET = 340;

export function ExtensionHighlight() {
  const [activeCategory, setActiveCategory] =
    useState<ExtensionCategory>("Productivity");
  const [animKey, setAnimKey] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredCards = useMemo(
    () => extensionCards.filter((card) => card.category === activeCategory),
    [activeCategory],
  );

  const setCategory = useCallback((category: ExtensionCategory) => {
    setActiveCategory(category);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (el) el.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  const scrollCarousel = useCallback((direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === "left" ? -CARD_SCROLL_OFFSET : CARD_SCROLL_OFFSET,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="bg-[#07080a] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <h2 className="ray-section-title lg:text-left">
              There&apos;s an extension for that.
            </h2>
            <p className="ray-section-subtitle mt-2 lg:text-left">
              Use your favorite tools without even opening them.
            </p>
          </div>

          <div className="relative inline-flex rounded-full border border-white/[0.08] bg-[#111214] p-1">
            {extensionCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategory(category)}
                className={cn(
                  "relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-200",
                  activeCategory === category
                    ? "text-white"
                    : "text-ray-muted hover:text-white",
                )}
              >
                {activeCategory === category ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white/10 transition-[transform,width] duration-300"
                  />
                ) : null}
                <span className="relative">{category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous extensions"
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#111214] p-2 text-white transition-colors hover:bg-[#17181a] sm:flex"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <div
            key={animKey}
            ref={carouselRef}
            className="hide-scrollbars flex gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {filteredCards.map((card, index) => (
              <article
                key={`${card.category}-${card.name}`}
                className={cn(
                  "ray-slide-in relative flex min-h-[536px] w-[min(300px,85vw)] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b p-7 transition-transform duration-300 hover:-translate-y-1",
                  card.gradient,
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="relative z-10">
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-white">
                    {card.name}
                  </h3>
                  <p className="mt-3 max-w-[240px] text-[15px] leading-relaxed text-white/80">
                    {card.description}
                  </p>
                </div>
                {card.previewSrc ? (
                  <div className="mt-auto flex flex-1 items-end justify-center pb-2 pt-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.previewSrc}
                      alt=""
                      className="max-h-56 w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,255,255,0.08),transparent_55%)]"
                  />
                )}
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Next extensions"
            className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#111214] p-2 text-white transition-colors hover:bg-[#17181a] sm:flex"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-1 text-sm text-ray-muted transition-colors hover:text-white"
          >
            Browse thousands more →
          </Link>
        </div>
      </div>
    </section>
  );
}
