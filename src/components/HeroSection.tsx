import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <section
        id="CTASection"
        className="relative flex flex-col items-center bg-[linear-gradient(var(--AccentColor),var(--AccentColor1))] pt-24 min-[1000px]:pt-32"
      >
        <div
          id="CTAText"
          className="relative flex w-full max-w-[903px] flex-col px-4 pt-8 text-center min-[1000px]:px-0 min-[1000px]:pt-12"
        >
          {/* Desktop headline */}
          <h1 className="hidden whitespace-nowrap text-[clamp(36px,4.5vw,64px)] font-bold leading-[1] text-white min-[1000px]:block">
            <span className="tutoreo-accent-word">Wszystkie</span> korepetycje na{" "}
            <span className="tutoreo-accent-word">jednej</span>
          </h1>
          <h1 className="hidden whitespace-nowrap text-[clamp(36px,4.5vw,64px)] font-bold leading-[1] text-white min-[1000px]:block">
            <span className="tutoreo-accent-word">wygodnej</span> platformie
          </h1>

          {/* Mobile headline */}
          <h1 className="text-[clamp(40px,11vw,56px)] font-bold leading-[1.05] text-white min-[1000px]:hidden">
            <span className="tutoreo-accent-word">Wszystkie</span> korepetycje
          </h1>
          <h1 className="text-[clamp(40px,11vw,56px)] font-bold leading-[1.05] text-white min-[1000px]:hidden">
            na{" "}
            <span className="tutoreo-accent-word">jednej wygodnej</span>{" "}
            platformie
          </h1>

          <p className="mx-auto mt-4 mb-8 max-w-[903px] text-[20px] font-normal leading-7 text-[var(--Dark2)] min-[1000px]:mt-4 min-[1000px]:mb-12 min-[1000px]:text-[24px]">
            Uczestnicz w korepetycjach z nauczycielami z całej Polski w jednym
            miejscu ze wszystkim czego potrzebujesz
          </p>

          <div
            id="CTAButtons"
            className="mb-12 flex flex-col items-center justify-center gap-4 pb-8 min-[600px]:flex-row min-[1000px]:mb-[100px] min-[1000px]:pb-12"
          >
            <Link
              id="CTAButton"
              href="/login?register=1"
              className="tutoreo-standard-btn tutoreo-standard-btn--deep w-full min-[600px]:w-auto"
            >
              Dołącz za darmo
            </Link>
            <Link
              id="SoftCTAButton"
              href="#HowItWorks"
              className="tutoreo-soft-btn w-full min-[600px]:w-auto"
            >
              Jak to działa?
            </Link>
          </div>
        </div>

        <Image
          src="/images/Waves/LandingPage/Wave1.svg"
          alt=""
          width={1440}
          height={80}
          className="tutoreo-wave-cutout relative z-[1] -mb-px w-full"
          priority
        />
      </section>

      <div
        id="CTAImageDiv"
        className="sticky top-16 mb-16 flex w-full justify-center px-6 py-12 min-[1000px]:top-24 min-[1000px]:-mt-[200px] min-[1000px]:mb-[300px] min-[1000px]:px-12 min-[1000px]:pb-12 min-[1000px]:pt-0"
      >
        <video
          id="HeroVideo"
          className="block h-auto w-full max-w-[1200px] object-contain"
          src="/videos/HeroVideo.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Podgląd platformy Tutoreo"
        />
      </div>
    </>
  );
}
