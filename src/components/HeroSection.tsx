import Image from "next/image";
import Link from "next/link";

import { AppleIcon, WindowsIcon } from "@/components/icons";

const ctaButtonClassName =
  "inline-flex h-9 items-center gap-2 rounded-lg bg-ray-button px-3 text-sm font-medium tracking-[0.2px] text-ray-button-fg transition-opacity hover:opacity-90";

function HeroGlowBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative h-full w-full max-w-[1200px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rotate-[-28deg]">
              <div className="absolute left-[8%] top-[18%] h-[72%] w-[18%] bg-gradient-to-b from-transparent via-[#ff6363]/55 to-transparent blur-[72px]" />
              <div className="absolute left-[30%] top-[8%] h-[84%] w-[14%] bg-gradient-to-b from-transparent via-[#ff4d4d]/45 to-transparent blur-[64px]" />
              <div className="absolute left-[52%] top-[14%] h-[76%] w-[16%] bg-gradient-to-b from-transparent via-[#ff6363]/50 to-transparent blur-[68px]" />
              <div className="absolute left-[72%] top-[10%] h-[80%] w-[12%] bg-gradient-to-b from-transparent via-[#ff5252]/40 to-transparent blur-[60px]" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          <Image
            src="/images/raycast/features/hero-glow.png"
            alt=""
            fill
            priority
            className="hero-glow-pulse object-contain object-center opacity-90 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_20%,transparent_75%)]"
            sizes="1200px"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080a] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07080a] to-transparent" />
      </div>
    </div>
  );
}

function MeetGlazeAnnouncement() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-10">
      <Link
        href="https://glaze.app"
        className="group rounded-full p-px transition-opacity hover:opacity-90"
        style={{
          background:
            "conic-gradient(from 119.253deg at 20px 15px, transparent 0deg, rgb(236, 165, 167) 20%, transparent 25%)",
        }}
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
      <HeroGlowBackground />

      <div className="fade-in-up relative z-10 flex w-full max-w-[786px] flex-col items-center px-6 text-center">
        <h1 className="max-w-[540px] text-[36px] font-semibold leading-[1.1] text-white sm:text-[40px] md:text-[64px] md:leading-[70.4px]">
          Your shortcut to everything.
        </h1>

        <p className="mt-4 max-w-[786px] text-base font-normal tracking-[0.2px] text-white sm:mt-5 sm:text-lg">
          A collection of powerful productivity tools all within an extendable
          launcher. Fast, ergonomic and reliable.
        </p>

        <div className="mt-7 flex w-full flex-col items-center gap-4">
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
              className="rounded transition-colors hover:text-white"
            >
              Install via homebrew or winget
            </Link>
            <Link
              href="https://www.raycast.com/download"
              className="rounded transition-colors hover:text-white"
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
