import Image from "next/image";

import { PricingCards } from "@/components/landing/pricing-cards";
import { Container } from "@/components/layout/container";

const STATS = [
  { value: "1:1", label: "Coach na stałe" },
  { value: "7 dni", label: "Kontrola co tydzień" },
  { value: "399 zł", label: "Od / miesiąc" },
] as const;

export function Hero() {
  return (
    <section className="relative border-b border-border bg-canvas">
      <div className="marketing-grid absolute inset-0 opacity-40" aria-hidden />

      <Container className="relative">
        <div className="grid gap-10 border-b border-border py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 border border-destructive/30 bg-destructive-subtle px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-destructive">
              <span className="size-1.5 animate-pulse rounded-full bg-destructive" />
              Limitowane miejsca w lipcu
            </p>
            <p className="text-label mt-5 text-secondary">Coaching · odchudzanie · otyłość</p>
            <h1 className="text-hero mt-5 text-primary">
              Schudnij
              <br />
              na serio.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-secondary md:text-lg">
              Trening, żywienie i cotygodniowe wsparcie trenera dla osób z nadwagą
              i otyłością. Bez cudownych diet. Bez kultury siłowni.
            </p>
            <p className="mt-4 max-w-lg text-sm font-semibold text-destructive-foreground">
              Nie czekaj na poniedziałek. Twoje ciało nie potrzebuje kolejnej wymówki.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#aplikacja"
                className="inline-flex h-14 items-center justify-center bg-destructive px-8 text-sm font-bold uppercase tracking-wider text-canvas transition-colors hover:bg-destructive/90"
              >
                Zacznij już dzisiaj
              </a>
              <a
                href="#cennik"
                className="inline-flex h-14 items-center justify-center border border-destructive/30 bg-destructive-subtle px-8 text-sm font-semibold uppercase tracking-wider text-destructive-foreground transition-colors hover:border-destructive/50 hover:bg-destructive-muted"
              >
                Zobacz ofertę
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-primary md:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-tertiary">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80"
              alt="Osoba spacerująca w parku, spokojna aktywność na co dzień"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent lg:bg-gradient-to-r lg:from-canvas lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 border border-border/80 bg-canvas/90 p-4 backdrop-blur-sm lg:bottom-6 lg:left-6 lg:max-w-xs">
              <p className="text-label text-secondary">Dla kogo</p>
              <p className="mt-1 text-sm font-medium leading-snug text-primary">
                BMI 27+. Osoby, które chcą realnej zmiany, a nie kolejnej diety z Instagrama.
              </p>
            </div>
          </div>
        </div>

        <div id="cennik" className="scroll-mt-24 py-10 lg:py-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-label text-destructive">Oferta specjalna</p>
              <h2 className="text-display mt-2 text-primary">Wybierz pakiet i zacznij dziś</h2>
              <p className="mt-3 max-w-md text-sm font-medium text-destructive-foreground">
                Każdy dzień zwłoki to kolejny dzień w starym ciele. Wybierz plan i złóż aplikację w 2 minuty.
              </p>
            </div>
            <p className="max-w-xs text-sm text-tertiary">
              Ceny na wierzchu. Bez „skontaktuj się po wycenę”.
            </p>
          </div>
          <PricingCards variant="compact" />
        </div>
      </Container>
    </section>
  );
}
