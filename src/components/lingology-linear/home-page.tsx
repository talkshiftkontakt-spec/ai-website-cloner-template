import { LingologyFooter } from "./footer";
import { LingologyHeader } from "./header";
import { ScrollRevealProvider } from "./scroll-reveal";
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
    <div className="ll-page">
      <ScrollRevealProvider />
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
    </div>
  );
}
