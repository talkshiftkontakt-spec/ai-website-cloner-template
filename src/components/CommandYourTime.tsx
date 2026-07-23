import Image from "next/image";
import Link from "next/link";

import { AppleIcon } from "@/components/icons";
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

function KeyboardKey({ label, width, highlight }: KeyDef) {
  return (
    <div
      className={cn(
        "flex h-8 items-center justify-center rounded-md border text-[10px] font-medium tracking-wide md:h-10 md:text-[11px]",
        highlight
          ? "border-ray-red/50 bg-ray-red/20 text-white shadow-[0_0_20px_rgba(255,99,99,0.35)]"
          : "border-white/8 bg-white/4 text-ray-muted",
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
                <KeyboardKey key={`${rowIndex}-${keyIndex}`} {...key} />
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
      <Image
        src="/images/raycast/features/hero-glow.png"
        alt=""
        width={1200}
        height={800}
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(1200px,120vw)] -translate-x-1/2 -translate-y-1/2 opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center gap-10 px-6 md:gap-16">
        <KeyboardMock />

        <div className="max-w-[400px] text-center">
          <h2 className="text-xl font-medium tracking-[0.2px] text-white md:text-2xl">
            Command your time.
          </h2>
          <p className="mt-2 text-xl font-medium tracking-[0.2px] text-ray-muted-2">
            Download and use Raycast for free.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="https://raycast.com/download"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-ray-button px-4 text-sm font-medium text-ray-button-fg transition-opacity hover:opacity-90"
            >
              <AppleIcon className="size-4" />
              Download for Mac
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
