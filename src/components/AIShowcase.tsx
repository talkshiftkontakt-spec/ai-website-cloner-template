"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { aiFeatures } from "@/lib/raycast-content";
import { cn } from "@/lib/utils";

const CYCLE_MS = 5000;

function AiEyebrow() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-white/20" />
      <span className="rounded-full bg-[radial-gradient(13.65%_50%_at_50%_50%,rgba(245,48,107,0.1)_0%,rgba(255,103,167,0)_100%)] px-3 py-1 text-sm font-medium tracking-[0.2px] text-ray-red">
        AI
      </span>
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-white/20" />
    </div>
  );
}

export function AIShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % aiFeatures.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-[#07080a] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-12 text-center">
          <AiEyebrow />
          <div>
            <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-white">
              Your Mac just got smarter.
            </h2>
            <p className="mt-2 text-base text-ray-muted">
              AI where it&apos;s most useful - on your OS.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ul className="flex flex-col gap-2">
            {aiFeatures.map((feature, index) => {
              const isActive = index === active;
              return (
                <li key={feature.title}>
                  <button
                    type="button"
                    className={cn(
                      "w-full rounded-xl border px-5 py-4 text-left transition-all duration-300",
                      isActive
                        ? "border-white/15 bg-white/[0.04]"
                        : "border-transparent hover:bg-white/[0.02]",
                    )}
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
                    <h3
                      className={cn(
                        "text-base font-medium tracking-[0.2px] transition-colors",
                        isActive ? "text-white" : "text-white/70",
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 max-w-md text-sm leading-relaxed transition-all duration-300",
                        isActive
                          ? "max-h-24 opacity-100 text-ray-muted"
                          : "max-h-0 overflow-hidden opacity-0",
                      )}
                    >
                      {feature.description}
                    </p>
                    {isActive ? (
                      <div className="mt-3 h-0.5 overflow-hidden rounded bg-white/10">
                        <div
                          key={`${feature.title}-${active}`}
                          className="ray-progress-fill h-full w-full bg-ray-red"
                          style={{ animationDuration: `${CYCLE_MS}ms` }}
                        />
                      </div>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          <Reveal variant="scale-up" delay={120} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,99,99,0.18),transparent_65%)] blur-2xl" />
            <Image
              src="/images/raycast/features/quick-ai-mobile.a1c4047f.png"
              alt="Raycast Quick AI on mobile"
              width={640}
              height={640}
              className="relative h-auto w-full"
            />
            <span className="ray-cursor-blink absolute bottom-10 right-10 hidden h-4 w-px bg-white/80 sm:block" />
          </Reveal>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/core-features/ai"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-ray-red"
          >
            More about AI
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
