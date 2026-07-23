import { BenefitsSection } from "@/components/BenefitsSection";
import { CookiesBanner } from "@/components/CookiesBanner";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Navbar } from "@/components/Navbar";
import { SecondaryCtaSection } from "@/components/SecondaryCtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <CookiesBanner />
      <main
        id="PageBG"
        className="relative z-[1] min-h-screen overflow-visible rounded-b-[50px] bg-[var(--TonedBackground)] shadow-[var(--PopOffShadow)]"
      >
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <FaqSection />
        <SecondaryCtaSection />
      </main>
      <Footer />
    </>
  );
}
