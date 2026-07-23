"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { featureDockItems } from "@/lib/raycast-content";
import { cn } from "@/lib/utils";

type DockId = (typeof featureDockItems)[number]["id"];

const dockIcons: Record<DockId, string> = {
  clipboard: "/images/raycast/features/command-clipboard-history.fa06c2bb.png",
  ai: "/images/raycast/features/magic-at-your-fingertips.10b9ee35.png",
  emoji: "/images/raycast/features/emoji-picker.fd3ad392.png",
  calculator: "/images/raycast/features/command-calculator-history.a26c44ed.png",
  window: "/images/raycast/features/window-management.42db743b.png",
};

const clipboardEntries = [
  { label: "Image (1200 x 1000)", type: "image" as const },
  { label: "#FF6363", type: "color" as const, color: "#FF6363" },
  { label: "#59D499", type: "color" as const, color: "#59D499" },
  { label: "#56C2FF", type: "color" as const, color: "#56C2FF" },
  { label: "#FFC531", type: "color" as const, color: "#FFC531" },
  { label: "https://raycast.com", type: "link" as const },
  { label: "https://github.com/raycast/extensions", type: "link" as const },
  {
    label: "The first Macintosh computer was introduced",
    type: "text" as const,
  },
  { label: "hello@raycast.com", type: "text" as const },
];

function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-sm text-ray-muted-2">
      <span>{placeholder}</span>
      <span className="ray-cursor-blink inline-block h-4 w-px bg-white/80" />
    </div>
  );
}

function ClipboardMock() {
  return (
    <div className="flex h-full min-h-0">
      <div className="flex min-w-0 flex-1 flex-col border-r border-white/[0.06]">
        <div className="border-b border-white/[0.06] px-4 py-3">
          <SearchBar placeholder="Type to filter entries..." />
          <div className="mt-3 flex gap-2">
            <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-white">
              All Types
            </span>
            <span className="rounded-md px-2 py-1 text-xs text-ray-muted">
              Today
            </span>
          </div>
        </div>
        <ul className="hide-scrollbars flex-1 overflow-y-auto py-1">
          {clipboardEntries.map((entry, index) => (
            <li
              key={entry.label}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200",
                index === 1 && "bg-white/[0.06]",
              )}
            >
              {entry.type === "color" ? (
                <span
                  className="size-4 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
              ) : (
                <span className="size-4 shrink-0 rounded bg-white/10" />
              )}
              <span
                className={cn(
                  "truncate",
                  entry.type === "link" ? "text-[#56C2FF]" : "text-white/90",
                )}
              >
                {entry.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden w-[280px] shrink-0 flex-col p-4 sm:flex">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ray-muted">
          Information
        </p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ray-muted">Application</dt>
            <dd className="text-white">VS Code</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ray-muted">Content Type</dt>
            <dd className="text-white">Color</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ray-muted">Copied</dt>
            <dd className="text-white">Today, 13:35:07</dd>
          </div>
        </dl>
        <div className="mt-6 flex items-center gap-2">
          <span
            className="size-10 rounded-lg"
            style={{ backgroundColor: "#FF6363" }}
          />
          <span className="font-mono text-sm text-white">#FF6363</span>
        </div>
      </div>
    </div>
  );
}

function AiMock() {
  return (
    <div className="flex h-full flex-col p-4">
      <SearchBar placeholder="Ask AI anything..." />
      <div className="mt-4 space-y-4">
        <div className="ray-scale-up max-w-[85%] rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white/90">
          How do I create a custom extension in Raycast?
        </div>
        <div className="ray-scale-up ml-auto max-w-[85%] rounded-xl border border-white/[0.08] bg-[#111214] px-4 py-3 text-sm text-ray-muted [animation-delay:120ms]">
          Start with the Raycast API docs and use{" "}
          <span className="text-white">create extension</span> to scaffold a new
          project.
          <span className="ray-cursor-blink ml-0.5 inline-block h-3.5 w-px bg-white/70 align-middle" />
        </div>
      </div>
    </div>
  );
}

function EmojiMock() {
  const pinned = ["❤️", "👋", "👍", "🚀", "🎉", "🙏"];
  const smileys = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃"];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/[0.06] px-4 py-3">
        <SearchBar placeholder="Search Emoji & Symbols..." />
        <div className="mt-3">
          <p className="mb-2 text-xs text-ray-muted">Pinned</p>
          <div className="flex gap-2">
            {pinned.map((emoji) => (
              <span key={emoji} className="text-xl">
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="mb-2 text-xs text-ray-muted">Smileys &amp; People</p>
        <div className="flex flex-wrap gap-2">
          {smileys.map((emoji) => (
            <span key={emoji} className="text-xl">
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalculatorMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/[0.06] px-4 py-3">
        <SearchBar placeholder="1,234 * 56" />
      </div>
      <div className="flex flex-1 flex-col items-end justify-center px-8 py-6">
        <p className="font-mono text-3xl text-ray-muted">1,234 × 56</p>
        <p className="mt-2 font-mono text-5xl font-medium text-white">
          69,104
          <span className="ray-cursor-blink ml-1 inline-block h-10 w-0.5 bg-white align-middle" />
        </p>
      </div>
    </div>
  );
}

function WindowMock() {
  const layouts = [
    "Left Half",
    "Right Half",
    "Almost Maximize",
    "Top Left Quarter",
    "Top Right Quarter",
    "Bottom Half",
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/[0.06] px-4 py-3">
        <SearchBar placeholder="window management" />
      </div>
      <div className="px-4 py-2 text-xs text-ray-muted">Results</div>
      <ul className="py-1">
        {layouts.map((layout, index) => (
          <li
            key={layout}
            className={cn(
              "flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-200",
              index === 0 && "bg-white/[0.06]",
            )}
          >
            <span className="flex items-center gap-3 text-white/90">
              <span className="size-4 rounded border border-white/20" />
              {layout}
            </span>
            <span className="text-xs text-ray-muted">Window Management</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const showcasePanels: Record<DockId, () => ReactNode> = {
  clipboard: ClipboardMock,
  ai: AiMock,
  emoji: EmojiMock,
  calculator: CalculatorMock,
  window: WindowMock,
};

const AUTO_MS = 5500;

export function FeaturesSection() {
  const [activeId, setActiveId] = useState<DockId>("clipboard");
  const [paused, setPaused] = useState(false);
  const activeItem = featureDockItems.find((item) => item.id === activeId);
  const ActivePanel = showcasePanels[activeId];
  const activeIndex = featureDockItems.findIndex((i) => i.id === activeId);

  const select = useCallback((id: DockId) => {
    setActiveId(id);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveId((prev) => {
        const idx = featureDockItems.findIndex((i) => i.id === prev);
        const next = featureDockItems[(idx + 1) % featureDockItems.length];
        return next.id;
      });
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-[#07080a] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center">
        <Reveal className="mb-16 text-center">
          <h2 className="ray-section-title">Take shortcuts, not detours.</h2>
          <p className="ray-section-subtitle mt-2">
            One interface, everything you need.
          </p>
        </Reveal>

        <Reveal variant="scale-up" className="relative w-full" delay={80}>
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[860px] -translate-y-1/2 bg-cover bg-center opacity-90"
            style={{
              backgroundImage:
                "url(/images/raycast/features/featureBackground.7492bde9.png)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#111214]/80 shadow-2xl backdrop-blur-xl">
            <div className="flex h-12 items-center gap-2 border-b border-white/[0.06] px-4">
              <span className="size-3 rounded-full bg-[#FF5F57]" />
              <span className="size-3 rounded-full bg-[#FEBC2E]" />
              <span className="size-3 rounded-full bg-[#28C840]" />
              <div className="relative ml-4 h-0.5 flex-1 overflow-hidden rounded bg-white/[0.06]">
                <div
                  key={activeId}
                  className="ray-progress-fill absolute inset-y-0 left-0 w-full bg-white/30"
                  style={{ animationDuration: `${AUTO_MS}ms` }}
                />
              </div>
            </div>
            <div className="h-[min(720px,70vh)] min-h-[420px] overflow-hidden">
              <div key={activeId} className="ray-scale-up h-full">
                <ActivePanel />
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex flex-col items-center">
            <div className="mb-3 flex max-w-full items-end justify-center gap-2 overflow-x-auto rounded-full border border-white/[0.08] bg-[#111214]/70 px-3 py-2 backdrop-blur-md sm:gap-3 sm:px-4">
              {featureDockItems.map((item, index) => {
                const isActive = item.id === activeId;

                return (
                  <div
                    key={item.id}
                    className="relative flex flex-col items-center"
                  >
                    {isActive ? (
                      <span className="absolute -top-7 whitespace-nowrap rounded-md bg-white/10 px-2 py-0.5 text-xs text-white transition-opacity duration-200">
                        {item.label}
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => select(item.id)}
                      aria-label={item.label}
                      aria-pressed={isActive}
                      className={cn(
                        "flex size-[54px] items-center justify-center rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-white/10 ring-1 ring-white/20"
                          : "hover:bg-white/[0.06]",
                      )}
                    >
                      <Image
                        src={dockIcons[item.id]}
                        alt=""
                        width={28}
                        height={28}
                        className={cn(
                          "size-7 object-contain transition-transform duration-200",
                          isActive && "scale-110",
                        )}
                      />
                    </button>
                    {isActive ? (
                      <span
                        className="mt-1 h-0.5 w-6 rounded-full bg-white/40"
                        style={{
                          opacity: index === activeIndex ? 1 : 0.4,
                        }}
                      />
                    ) : (
                      <span className="mt-1 h-0.5 w-6" />
                    )}
                  </div>
                );
              })}
            </div>

            {activeItem ? (
              <div
                key={activeItem.id}
                className="ray-scale-up max-w-xl px-4 text-center"
              >
                <p className="text-base font-semibold text-white">
                  {activeItem.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ray-muted">
                  {activeItem.caption}
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
