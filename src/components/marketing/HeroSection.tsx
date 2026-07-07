import Image from "next/image";
import Link from "next/link";
import { Upload } from "lucide-react";

import { siteConfig } from "@/lib/site";

const showcaseHeads = [
  { src: "/images/heads/steve.png", alt: "Główka Steve", size: "lg", className: "head-float left-[8%] top-[18%] z-20" },
  { src: "/images/heads/dream.png", alt: "Personalizowana główka gracza", size: "xl", className: "head-float-delay-1 left-[32%] top-[8%] z-30" },
  { src: "/images/heads/techno.png", alt: "Główka Technoblade", size: "md", className: "head-float-delay-2 right-[28%] top-[22%] z-20" },
  { src: "/images/heads/creeper.png", alt: "Główka Creepera", size: "sm", className: "head-float-delay-3 right-[10%] top-[42%] z-10" },
  { src: "/images/heads/alex.png", alt: "Główka Alex", size: "md", className: "head-float left-[18%] bottom-[22%] z-10" },
] as const;

const headSizes = {
  sm: "size-20 md:size-24",
  md: "size-28 md:size-32",
  lg: "size-36 md:size-44",
  xl: "size-44 md:size-56 lg:size-64",
} as const;

export function HeroSection() {
  return (
    <section className="hero-cinematic relative flex items-center">
      <Image
        src="/images/hero/minecraft-landscape.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0 grain-overlay z-[2]" aria-hidden />

      <div className="container-site relative z-10 flex min-h-[min(100svh,900px)] flex-col justify-center py-20 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          {/* Copy — personalized heads lead */}
          <div className="max-w-xl space-y-6 lg:max-w-none">
            <p className="pixel-label text-grass">
              Personalizowane główki · Craft w Polsce
            </p>
            <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.05] text-white drop-shadow-lg md:text-5xl lg:text-6xl text-balance">
              Wgraj swój skin.{" "}
              <span className="text-grass">Odbierz główkę.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/80 text-pretty md:text-xl">
              Fizyczna, kolekcjonerska główka Minecraft z Twojego skina — nie
              plakat, nie naklejka. Ręcznie wykonana z żywicy premium, gotowa na
              półkę.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/konfigurator" className="mc-button">
                <Upload className="size-5" aria-hidden />
                Stwórz swoją główkę
              </Link>
              <Link href="/kolekcje/personalizowane" className="mc-button-outline">
                Zobacz przykłady
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-sm bg-grass" aria-hidden />
                Podgląd 3D przed zamówieniem
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-sm bg-accent" aria-hidden />
                {siteConfig.stats.rating}★ · {siteConfig.stats.reviewCount} opinii
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-sm bg-sky" aria-hidden />
                Wysyłka 3–5 dni roboczych
              </span>
            </div>
          </div>

          {/* Floating heads showcase */}
          <div className="relative mx-auto aspect-square w-full max-w-lg lg:max-w-none lg:min-h-[480px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mc-panel relative size-[72%] max-w-sm p-6 md:p-8">
                <p className="pixel-label text-grass">Twój skin → Twoja główka</p>
                <p className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Personalizacja w 60 sekund
                </p>
                <p className="mt-2 text-sm text-white/65">
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
            </div>

            {showcaseHeads.map((head) => (
              <div
                key={head.src}
                className={`absolute ${head.className}`}
              >
                <div
                  className={`relative ${headSizes[head.size]} drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]`}
                >
                  <Image
                    src={head.src}
                    alt={head.alt}
                    fill
                    sizes="(max-width: 768px) 80px, 160px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
