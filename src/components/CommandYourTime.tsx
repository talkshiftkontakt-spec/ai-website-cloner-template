"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppleIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type KeyDef = {
  label: string;
  width?: "wide" | "wider" | "space";
  highlight?: boolean;
};

const keyboardRows: KeyDef[][] = [
  [
    { label: "esc" },
    { label: "F1" },
    { label: "F2" },
    { label: "F3" },
    { label: "F4" },
    { label: "F5" },
    { label: "F6" },
    { label: "F7" },
    { label: "F8" },
    { label: "F9" },
    { label: "F10" },
    { label: "F11" },
    { label: "F12" },
  ],
  [
    { label: "±" },
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "0" },
    { label: "-" },
    { label: "=" },
    { label: "delete", width: "wide" },
  ],
  [
    { label: "tab" },
    { label: "Q" },
    { label: "W" },
    { label: "E" },
    { label: "R" },
    { label: "T" },
    { label: "Y" },
    { label: "U" },
    { label: "I" },
    { label: "O" },
    { label: "P" },
    { label: "[" },
    { label: "]" },
    { label: "\\", width: "wide" },
  ],
  [
    { label: "caps" },
    { label: "A" },
    { label: "S" },
    { label: "D" },
    { label: "F" },
    { label: "G" },
    { label: "H" },
    { label: "J" },
    { label: "K" },
    { label: "L" },
    { label: ";" },
    { label: "'" },
    { label: "return", width: "wider" },
  ],
  [
    { label: "shift", width: "wider" },
    { label: "Z" },
    { label: "X" },
    { label: "C" },
    { label: "V" },
    { label: "B" },
    { label: "N" },
    { label: "M" },
    { label: "," },
    { label: "." },
    { label: "/" },
    { label: "shift", width: "wider" },
  ],
  [
    { label: "fn" },
    { label: "control" },
    { label: "option" },
    { label: "⌘", highlight: true },
    { label: "space", width: "space" },
    { label: "⌘", highlight: true },
    { label: "option" },
  ],
];

/** Sequence of keys that light up in the ⌘ Space demo */
const PULSE_SEQUENCE = ["⌘", "space", "⌘"];

function KeyboardKey({
  label,
  width,
  highlight,
  lit,
}: KeyDef & { lit?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-8 items-center justify-center rounded-md border text-[10px] font-medium tracking-wide transition-all duration-300 md:h-10 md:text-[11px]",
        lit || highlight
          ? "border-ray-red/50 bg-ray-red/25 text-white shadow-[0_0_22px_rgba(255,99,99,0.4)] opacity-100"
          : "border-white/8 bg-white/[0.04] text-ray-muted opacity-25",
        width === "wide" && "col-span-2",
        width === "wider" && "col-span-3",
        width === "space" && "col-span-6",
      )}
    >
      {label}
    </div>
  );
}

function KeyboardMock() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % (PULSE_SEQUENCE.length + 2));
    }, 700);
    return () => window.clearInterval(id);
  }, []);

  const litLabel =
    step < PULSE_SEQUENCE.length ? PULSE_SEQUENCE[step] : undefined;

  return (
    <div className="mx-auto w-full max-w-[720px] px-4">
      <div className="rounded-2xl border border-ray-border bg-ray-surface/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:p-6">
        <div className="flex flex-col gap-1.5 md:gap-2">
          {keyboardRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-1 md:gap-1.5"
              style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}
            >
              {row.map((key, keyIndex) => (
                <KeyboardKey
                  key={`${rowIndex}-${keyIndex}`}
                  {...key}
                  lit={
                    litLabel === key.label ||
                    (litLabel === "⌘" && key.label === "⌘") ||
                    (litLabel === "space" && key.label === "space")
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommandYourTime() {
  return (
    <section className="relative overflow-hidden pb-32 pt-16 md:pb-56 md:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,99,99,0.22),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center gap-10 px-6 md:gap-16">
        <Reveal variant="scale-up" className="w-full">
          <KeyboardMock />
        </Reveal>

        <Reveal className="max-w-[400px] text-center" delay={120}>
          <h2 className="text-xl font-medium tracking-[0.2px] text-white md:text-2xl">
            Command your time.
          </h2>
          <p className="mt-2 text-xl font-medium tracking-[0.2px] text-ray-muted-2">
            Download and use Raycast for free.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="https://raycast.com/download"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-ray-button px-4 text-sm font-medium text-ray-button-fg transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <AppleIcon className="size-4" />
              Download for Mac
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
