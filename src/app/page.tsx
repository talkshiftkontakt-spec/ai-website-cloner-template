import { AboutCoach } from "@/components/landing/about-coach";
import { ApplicationForm } from "@/components/landing/application-form";
import { ClientStories } from "@/components/landing/client-stories";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { FeatureSection } from "@/components/landing/feature-section";
import { Guarantee } from "@/components/landing/guarantee";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProgressTracking } from "@/components/landing/progress-tracking";
import { Testimonials } from "@/components/landing/testimonials";
import { TransformationGallery } from "@/components/landing/transformation-gallery";
import { Section } from "@/components/layout/section";

export default function Home() {
  return (
    <>
      <Hero />
      <TransformationGallery />
      <ClientStories />
      <Testimonials />
      <HowItWorks />

      <FeatureSection
        id="trening"
        label="Plan treningowy"
        title="Ruch dopasowany do Twojego ciała i życia"
        paragraphs={[
          "Nie zaczynamy od ciężkiej siłowni, jeśli to nie jest dla Ciebie. Plan budujemy od Twoich możliwości — spacer, dom, siłownia lub mix.",
          "Przy nadwadze i otyłości priorytetem jest bezpieczeństwo, regularność i budowanie kondycji. Intensywność rośnie wtedy, gdy jesteś gotowy.",
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
          alt: "Osoba wykonująca delikatne ćwiczenia w domu",
        }}
      />

      <FeatureSection
        id="zywienie"
        label="Plan żywieniowy"
        title="Jedzenie bez wojny z samym sobą"
        paragraphs={[
          "Tworzymy plan, który pasuje do Twojego budżetu, czasu i preferencji — bez eliminacji całych grup produktów bez powodu.",
          "Uczymy struktury posiłków, białka i nawyków. Nie narzucamy restrykcyjnych diet, które wracają jak bumerang.",
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
          alt: "Świeże składniki na blacie kuchennym",
        }}
        reversed
      />

      <FeatureSection
        id="wsparcie"
        label="Wsparcie i accountability"
        title="Nie jesteś w tym sam"
        paragraphs={[
          "Coaching to relacja. Regularne check-iny, korekty planu i kontakt między spotkaniami — żebyś nie wracał do starych schematów w ciszy.",
          "Trzymamy Cię w procesie bez poczucia winy. Gdy coś nie działa — zmieniamy podejście, nie Twoją wartość.",
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
          alt: "Konsultacja coachingowa przez wideorozmowę",
        }}
      />

      <ProgressTracking />
      <FaqAccordion />
      <AboutCoach />
      <PricingSection />
      <Guarantee />

      <Section id="kontakt" padding="compact">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label text-brand">Kontakt</p>
          <h2 className="text-display mt-3 text-primary">Masz pytania?</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Napisz na{" "}
            <a
              href="mailto:kontakt@lekkistart.pl"
              className="text-brand transition-colors hover:text-brand-hover"
            >
              kontakt@lekkistart.pl
            </a>{" "}
            lub zadzwoń:{" "}
            <a
              href="tel:+48000000000"
              className="text-brand transition-colors hover:text-brand-hover"
            >
              +48 000 000 000
            </a>
          </p>
        </div>
      </Section>

      <ApplicationForm />
    </>
  );
}
