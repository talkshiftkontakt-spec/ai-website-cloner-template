import { LingologyFooter } from "./footer";
import { LingologyHeader } from "./header";
import { ScrollEffects } from "./scroll-effects";
import { BetweenLessonsPillarSection } from "./pillar-section";
import {
  AppSection,
  ContactSection,
  DiagnosisSection,
  FaqSection,
  FinalCtaSection,
  ForWhomSection,
  HeroSection,
  HowItWorksSection,
  MethodSection,
  OfferSection,
  ProblemSection,
  SpeakingSection,
  TestimonialsSection,
  TestsSection,
} from "./sections";

export function LingologyLinearHome() {
  return (
    <>
      <ScrollEffects />
      <div className="ll-page Fzcv4W_smooth-scroll">
        <LingologyHeader />
        <main>
          <HeroSection />
          <ProblemSection />
          <SpeakingSection />
          <BetweenLessonsPillarSection />
          <OfferSection />
          <AppSection />
          <DiagnosisSection />
          <HowItWorksSection />
          <ForWhomSection />
          <MethodSection />
          <TestsSection />
          <TestimonialsSection />
          <FaqSection />
          <FinalCtaSection />
          <ContactSection />
        </main>
        <LingologyFooter />
      </div>
    </>
  );
}
