"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { featureTiles } from "@/lib/raycast-content";
import { cn } from "@/lib/utils";

const CYCLE_MS = 6000;

export function FeatureWall() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % featureTiles.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="mx-auto w-full max-w-[1204px] px-6 py-24 md:py-32">
      <Reveal className="mx-auto mb-12 max-w-[640px] text-center md:mb-16">
        <h2 className="ray-section-title">What else can Raycast do?</h2>
        <p className="ray-section-subtitle mt-4">
          It can take notes. Track your flights. Convert anything. Search files.
          Run scripts. Manage your windows. Plan your day. Remind you of stuff.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
        {featureTiles.map((tile, index) => {
          const isActive = index === active;
          return (
            <Reveal
              key={tile.title}
              as="article"
              delay={index * 40}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border bg-ray-surface transition-all duration-300",
                isActive
                  ? "border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "border-ray-border hover:border-white/10",
              )}
            >
              <button
                type="button"
                className="flex h-full flex-col text-left"
                onClick={() => {
                  setActive(index);
                  setPaused(true);
                }}
                onMouseEnter={() => {
                  setActive(index);
                  setPaused(true);
                }}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ray-surface-2">
                  <Image
                    src={tile.imageSrc}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className={cn(
                      "object-cover object-center transition-transform duration-500",
                      isActive ? "scale-[1.04]" : "group-hover:scale-[1.02]",
                    )}
                  />
                  {isActive ? (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                      <div
                        key={`${tile.title}-${active}`}
                        className="ray-progress-wall h-full w-full bg-ray-red"
                        style={{ animationDuration: `${CYCLE_MS}ms` }}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="px-3 py-3 md:px-4 md:py-4">
                  <h3 className="text-sm font-medium text-white md:text-[15px]">
                    {tile.title}
                  </h3>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
