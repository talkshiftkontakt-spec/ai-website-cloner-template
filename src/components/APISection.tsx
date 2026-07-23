import Image from "next/image";
import Link from "next/link";

import { ExternalLinkIcon } from "@/components/icons";

function DottedGridPanel() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-[900px] overflow-hidden rounded-2xl border border-ray-border bg-ray-surface/50 p-8 md:mt-24 md:p-12">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"
        aria-hidden="true"
      />

      <div className="relative z-10 flex justify-center">
        <Image
          src="/images/raycast/features/isolatedCube.0cfa31f6.png"
          alt=""
          width={320}
          height={320}
          className="h-auto w-[200px] opacity-90 md:w-[280px]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function APISection() {
  return (
    <section className="relative mx-auto w-full max-w-[1392px] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[640px] text-center">
        <h2 className="ray-section-title">Build the perfect tools.</h2>
        <p className="ray-section-subtitle mt-4">
          Our extension API is designed to allow anyone with web development
          skills to unleash the power of Raycast.
        </p>
        <Link
          href="https://developers.raycast.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-9 items-center gap-2 rounded-lg bg-ray-button px-4 text-sm font-medium text-ray-button-fg transition-opacity hover:opacity-90"
        >
          Read the docs
          <ExternalLinkIcon className="size-4" />
        </Link>
      </div>

      <DottedGridPanel />
    </section>
  );
}
