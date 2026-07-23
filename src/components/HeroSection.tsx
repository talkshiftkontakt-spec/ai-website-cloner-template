"use client";

import Link from "next/link";

import { HeroGlowCanvas } from "@/components/HeroGlowCanvas";
import { AppleIcon, WindowsIcon } from "@/components/icons";

const ctaButtonClassName =
  "inline-flex h-9 items-center gap-2 rounded-lg bg-ray-button px-3 text-sm font-medium tracking-[0.2px] text-ray-button-fg transition-[background-color,box-shadow,transform] duration-200 hover:opacity-90 active:scale-[0.98]";

function MeetGlazeAnnouncement() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-10">
      <Link
        href="https://glaze.app"
        className="ray-glaze-border group rounded-full p-px transition-opacity hover:opacity-90"
      >
        <span className="flex h-8 w-[223px] items-center justify-between rounded-full bg-[rgb(69,35,36)] px-4 text-sm text-white">
          <span className="font-medium">Meet Glaze</span>
          <span className="text-white/80 transition-colors group-hover:text-white">
            Learn more
          </span>
        </span>
      </Link>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative mb-56 flex min-h-[940px] flex-col items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="relative h-full w-full max-w-[1200px]">
          <HeroGlowCanvas />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080a] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07080a] to-transparent" />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-[786px] flex-col items-center px-6 text-center">
        <h1 className="fade-in-up max-w-[540px] text-[36px] font-semibold leading-[1.1] text-white sm:text-[40px] md:text-[64px] md:leading-[70.4px]">
          Your shortcut to everything.
        </h1>

        <p className="fade-in-up mt-4 max-w-[786px] text-base font-normal tracking-[0.2px] text-white sm:mt-5 sm:text-lg [animation-delay:120ms]">
          A collection of powerful productivity tools all within an extendable
          launcher. Fast, ergonomic and reliable.
        </p>

        <div className="fade-in-up-stagger mt-7 flex w-full flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button type="button" className={ctaButtonClassName}>
              <AppleIcon className="size-4" />
              Download for Mac
            </button>
            <Link
              href="https://ray.so/download-windows"
              className={ctaButtonClassName}
            >
              <WindowsIcon className="size-4" />
              Download for Windows (beta)
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 font-mono text-xs tracking-[0.2px] text-ray-muted sm:flex-row sm:gap-6 sm:text-[13px]">
            <Link
              href="https://www.raycast.com/download"
              className="rounded transition-colors duration-200 hover:text-white"
            >
              Install via homebrew or winget
            </Link>
            <Link
              href="https://www.raycast.com/download"
              className="rounded transition-colors duration-200 hover:text-white"
            >
              Try the new Raycast beta
            </Link>
          </div>
        </div>
      </div>

      <MeetGlazeAnnouncement />
    </section>
  );
}
