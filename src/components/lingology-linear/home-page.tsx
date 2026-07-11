import { LingologyFooter } from "./footer";
import { LingologyHeader } from "./header";
import { MotionProvider } from "./motion-provider";
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
    <MotionProvider>
      <div className="ll-page Fzcv4W_smooth-scroll">
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
    </MotionProvider>
  );
}
