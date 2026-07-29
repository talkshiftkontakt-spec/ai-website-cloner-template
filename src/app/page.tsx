import { SiteHeader, ScrollToTop } from "@/components/SiteChrome";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { OfferSection } from "@/components/OfferSection";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection, SiteFooter } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <OfferSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
