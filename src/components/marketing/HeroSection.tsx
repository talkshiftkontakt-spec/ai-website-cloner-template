import Image from "next/image";
import Link from "next/link";
import { Upload } from "lucide-react";

import { siteConfig } from "@/lib/site";

const mobileHeads = [
  { src: "/images/heads/steve.png", alt: "Główka Steve" },
  { src: "/images/heads/dream.png", alt: "Personalizowana główka" },
  { src: "/images/heads/creeper.png", alt: "Główka Creepera" },
  { src: "/images/heads/techno.png", alt: "Główka Technoblade" },
] as const;

const desktopHeads = [
  {
    src: "/images/heads/steve.png",
    alt: "Główka Steve",
    className: "head-float -left-4 top-8 size-28 xl:size-32",
  },
  {
    src: "/images/heads/dream.png",
    alt: "Personalizowana główka gracza",
    className: "head-float-delay-1 -top-6 right-8 size-36 xl:size-44",
  },
  {
    src: "/images/heads/techno.png",
    alt: "Główka Technoblade",
    className: "head-float-delay-2 -right-2 top-1/3 size-24 xl:size-28",
  },
  {
    src: "/images/heads/creeper.png",
    alt: "Główka Creepera",
    className: "head-float-delay-3 right-12 bottom-8 size-20 xl:size-24",
  },
  {
    src: "/images/heads/alex.png",
    alt: "Główka Alex",
    className: "head-float left-10 bottom-4 size-24 xl:size-28",
  },
] as const;

export function HeroSection() {
  return (
    <section className="hero-cinematic relative flex items-center">
      <Image
        src="/images/hero/minecraft-sunset.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0 grain-overlay z-[2]" aria-hidden />

      <div className="container-site relative z-10 py-12 md:py-20 lg:min-h-[min(90svh,820px)] lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl space-y-6">
            <p className="pixel-label text-grass">
              Personalizowane główki · Craft w Polsce
            </p>
            <h1 className="font-display text-[2.25rem] font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-5xl lg:text-6xl text-balance">
              Wgraj swój skin.{" "}
              <span className="text-grass">Odbierz główkę.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/85 text-pretty sm:text-lg md:text-xl">
              Fizyczna, kolekcjonerska główka Minecraft z Twojego skina — nie
              plakat, nie naklejka. Ręcznie wykonana z żywicy premium, gotowa na
              półkę.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/konfigurator" className="mc-button">
                <Upload className="size-5" aria-hidden />
                Stwórz swoją główkę
              </Link>
              <Link
                href="/kolekcje/personalizowane"
                className="mc-button-outline"
              >
                Zobacz przykłady
              </Link>
            </div>

            <ul className="flex flex-col gap-2 pt-1 text-sm text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <li className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-sm bg-grass"
                  aria-hidden
                />
                Podgląd 3D przed zamówieniem
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-sm bg-accent"
                  aria-hidden
                />
                {siteConfig.stats.rating}★ · {siteConfig.stats.reviewCount} opinii
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-sm bg-sky"
                  aria-hidden
                />
                Wysyłka 3–5 dni roboczych
              </li>
            </ul>
          </div>

          {/* Showcase — mobile: panel + row; desktop: floating heads */}
          <div className="w-full">
            <div className="mb-5 flex items-end justify-center gap-4 lg:hidden">
              {mobileHeads.map((head) => (
                <div
                  key={head.src}
                  className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                >
                  <Image
                    src={head.src}
                    alt={head.alt}
                    fill
                    sizes="80px"
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              ))}
            </div>

            <div className="relative mx-auto max-w-sm lg:max-w-none lg:min-h-[420px]">
              <div className="mc-panel relative z-20 mx-auto w-full max-w-sm p-6 md:p-8">
                <p className="pixel-label text-grass">Twój skin → Twoja główka</p>
                <p className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Personalizacja w 60 sekund
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Wgraj plik PNG skina, zobacz podgląd 3D i zamów unikalną
                  główkę do swojej kolekcji.
                </p>
                <Link
                  href="/konfigurator"
                  className="mt-6 inline-block text-sm font-semibold text-grass underline-offset-4 hover:underline"
                >
                  Otwórz konfigurator →
                </Link>
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
                aria-hidden
              >
                {desktopHeads.map((head) => (
                  <div
                    key={head.src}
                    className={`absolute ${head.className}`}
                  >
                    <div className="relative h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
                      <Image
                        src={head.src}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
