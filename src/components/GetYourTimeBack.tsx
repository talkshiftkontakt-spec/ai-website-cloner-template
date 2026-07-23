import Link from "next/link";

import { AppleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Fast.",
    subtitle: "Think in milliseconds.",
    row: 1,
  },
  {
    title: "Ergonomic.",
    subtitle: "Keyboard First.",
    row: 2,
  },
  {
    title: "Native.",
    subtitle: "Pure performance.",
    detail: "Reliable. 99.8% crash-free rate.",
    row: 3,
  },
] as const;

const keyboardRows = [
  ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["§", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"],
  ["fn", "control", "option", "command", "space", "command", "option"],
] as const;

function KeyboardKey({
  label,
  wide,
  extraWide,
}: {
  label: string;
  wide?: boolean;
  extraWide?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex h-7 items-center justify-center rounded-md border border-white/[0.08] bg-[#17181a] px-1.5 text-[10px] font-medium tracking-wide text-[#9c9c9d] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        wide && "col-span-2",
        extraWide && "col-span-4",
        label === "command" && "text-white/80",
      )}
    >
      {label === "command" ? "⌘" : label}
    </span>
  );
}

function KeyboardStrip() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none mx-auto mt-16 w-full max-w-4xl select-none px-4"
    >
      <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-[#0c0d0f] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        {keyboardRows.map((row) => (
          <div
            key={row.join("-")}
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
          >
            {row.map((key) => (
              <KeyboardKey
                key={key}
                label={key}
                wide={key === "delete" || key === "return" || key === "shift"}
                extraWide={key === "space"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GetYourTimeBack() {
  return (
    <section className="relative overflow-hidden bg-[#07080a] px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-[28px] font-medium leading-tight tracking-[0.2px] text-white md:text-[32px]">
          It&apos;s not about saving time.
        </h2>
        <p className="mt-1 text-[28px] font-medium leading-tight tracking-[0.2px] text-ray-muted-2 md:text-[32px]">
          It&apos;s about feeling like you&apos;re never wasting it.
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/download" />}
          className="mt-8 h-10 gap-2 rounded-lg bg-ray-button px-4 text-sm font-medium text-ray-button-fg hover:bg-ray-button/90"
        >
          <AppleIcon className="size-4" />
          Download
        </Button>
      </div>

      <div className="relative mx-auto mt-20 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={cn(
                "text-center md:text-left",
                pillar.row === 2 && "md:text-center",
                pillar.row === 3 && "md:text-right",
              )}
            >
              <p className="text-lg font-medium tracking-[0.2px] text-white">
                {pillar.title}{" "}
                <span className="text-ray-muted">{pillar.subtitle}</span>
              </p>
              {"detail" in pillar && pillar.detail ? (
                <p className="mt-1 text-sm text-ray-muted">{pillar.detail}</p>
              ) : null}
            </div>
          ))}
        </div>

        <KeyboardStrip />
      </div>
    </section>
  );
}
