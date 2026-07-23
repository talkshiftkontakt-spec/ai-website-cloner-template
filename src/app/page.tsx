import { AIShowcase } from "@/components/AIShowcase";
import { APISection } from "@/components/APISection";
import { AutomationSection } from "@/components/AutomationSection";
import { CommandYourTime } from "@/components/CommandYourTime";
import { CommunitySection } from "@/components/CommunitySection";
import { ExtensionHighlight } from "@/components/ExtensionHighlight";
import { FeatureWall } from "@/components/FeatureWall";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { GetYourTimeBack } from "@/components/GetYourTimeBack";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden bg-[#07080a]">
        <HeroSection />
        <FeaturesSection />
        <GetYourTimeBack />
        <ExtensionHighlight />
        <AIShowcase />
        <Testimonials />
        <AutomationSection />
        <FeatureWall />
        <CommunitySection />
        <APISection />
        <CommandYourTime />
      </main>
      <Footer />
    </>
  );
}
