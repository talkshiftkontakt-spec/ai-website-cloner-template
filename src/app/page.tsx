import { AllInOneSection, FeaturesDecorations } from "@/components/snipeit/AllInOneSection";
import { ContactSection } from "@/components/snipeit/ContactSection";
import { CookieBanner } from "@/components/snipeit/CookieBanner";
import { ExpressActionSection } from "@/components/snipeit/ExpressActionSection";
import { FaqSection } from "@/components/snipeit/FaqSection";
import { FeaturesBentoSection } from "@/components/snipeit/FeaturesBentoSection";
import { HeroDecorations, HeroSection } from "@/components/snipeit/HeroSection";
import { PricingSection } from "@/components/snipeit/PricingSection";
import { ProductDemoSection } from "@/components/snipeit/ProductDemoSection";
import { SiteFooter } from "@/components/snipeit/SiteFooter";
import { SiteHeader } from "@/components/snipeit/SiteHeader";
import { ASSET } from "@/lib/snipeit-content";

const HERO_GRAD_SVG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1111 1920' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><g transform='matrix(40.4 206.8 -357.39 69.818 320 54)'><rect height='29.11' width='98.997' fill='url(%23grad)' id='quad'/><use href='%23quad' transform='scale(1 -1)'/><use href='%23quad' transform='scale(-1 1)'/><use href='%23quad' transform='scale(-1 -1)'/></g><defs><linearGradient id='grad' gradientUnits='userSpaceOnUse' x2='5' y2='5'><stop stop-color='rgb(21,26,25)' offset='0.030772'/><stop stop-color='rgb(25,33,33)' offset='0.16608'/><stop stop-color='rgb(28,39,38)' offset='0.23849'/><stop stop-color='rgb(33,48,48)' offset='0.30706'/><stop stop-color='rgb(38,71,90)' offset='0.50481'/><stop stop-color='rgb(67,99,117)' offset='0.69423'/><stop stop-color='rgb(94,122,138)' offset='0.77067'/><stop stop-color='rgb(122,145,160)' offset='0.84711'/><stop stop-color='rgb(176,191,202)' offset='1'/></linearGradient></defs></svg>")`;

const GLOW_POSITIONS = [
  "absolute w-[500px] h-[490px] md:w-[1024px] md:h-[1008px] -right-[250px] md:-right-[692px] top-[1899px] pointer-events-none z-[5]",
  "absolute w-[500px] h-[490px] md:w-[1024px] md:h-[1008px] -left-[250px] md:-left-[672px] top-[2505px] pointer-events-none z-[5]",
  "absolute w-[500px] h-[490px] md:w-[1024px] md:h-[1008px] -right-[250px] md:-right-[692px] top-[3945px] pointer-events-none z-[5]",
  "absolute w-[500px] h-[490px] md:w-[1024px] md:h-[1008px] -left-[250px] md:-left-[672px] top-[4783px] pointer-events-none z-[5]",
  "absolute w-[500px] h-[490px] md:w-[1024px] md:h-[1008px] -right-[250px] md:-right-[692px] top-[5520px] pointer-events-none z-[5]",
] as const;

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-x-clip bg-[#EDF7FC]">
        <div className="absolute top-0 left-0 z-0 h-[1111px] w-full bg-[#0e1716]" />
        <div className="absolute top-0 left-0 z-0 flex h-[1111px] w-full items-center justify-center overflow-hidden">
          <div
            className="-rotate-90 flex-none"
            style={{ height: "max(3000px, 120vw)", width: 1111 }}
          >
            <div
              className="hero-grad-anim h-full w-full"
              style={{
                backgroundImage: HERO_GRAD_SVG,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>

        {GLOW_POSITIONS.map((className) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={className}
            src={`${ASSET}/hl-glow.svg`}
            alt=""
            loading="lazy"
            decoding="async"
            className={className}
          />
        ))}

        <SiteHeader />

        <div className="relative z-10 overflow-x-clip">
          <HeroDecorations />
          <HeroSection />
          <ProductDemoSection />
        </div>

        <div className="relative z-10 overflow-x-clip">
          <FeaturesDecorations />
          <FeaturesBentoSection />
          <AllInOneSection />
          <ExpressActionSection />
          <PricingSection />
          <ContactSection />
          <FaqSection />
        </div>

        <SiteFooter />
      </main>
      <CookieBanner />
    </>
  );
}
