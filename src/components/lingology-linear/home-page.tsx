import { LingologyFooter } from "./footer";
import { LingologyHeader } from "./header";
import {
  AppSection,
  BetweenLessonsSection,
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
      <LingologyHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SpeakingSection />
        <BetweenLessonsSection />
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
    </>
  );
}
