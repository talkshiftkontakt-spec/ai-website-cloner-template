import { PricingCards } from "@/components/landing/pricing-cards";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative border-b border-border bg-canvas">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.25_0.03_75_/_0.15),transparent_55%)]"
        aria-hidden
      />
      <Container className="relative py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-label text-brand">Premium coaching online</p>
          <h1 className="text-hero mt-4 text-primary">
            Odzyskaj lekkość.{" "}
            <em className="not-italic text-secondary">
              Coaching, który zostaje z Tobą na lata.
            </em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            Indywidualny trening, żywienie i cotygodniowe wsparcie — dla osób z
            nadwagą i otyłością. Bez restrykcyjnych diet. Bez presji.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              render={<a href="#aplikacja" />}
              nativeButton={false}
            >
              Złóż aplikację
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#cennik" />}
              nativeButton={false}
            >
              Zobacz cennik
            </Button>
          </div>
        </div>

        <div id="cennik" className="mt-12 scroll-mt-24 md:mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-label text-tertiary">Cennik</p>
              <h2 className="text-display mt-2 text-primary">
                Wybierz swój pakiet
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm text-tertiary md:block">
              Przejrzyste ceny. Bez ukrytych opłat.
            </p>
          </div>
          <PricingCards variant="compact" />
        </div>
      </Container>
    </section>
  );
}
