import Image from "next/image";
import { howItWorksSteps } from "@/lib/tutoreo-content";

export function HowItWorksSection() {
  return (
    <section
      id="HowItWorks"
      className="relative flex flex-col items-center bg-[radial-gradient(var(--AccentColor1),var(--AccentColor))] pt-16 text-center shadow-[var(--PopOffShadow)] min-[1000px]:rounded-t-[200px] min-[1000px]:pt-20"
    >
      <h1 className="mb-10 px-4 text-[clamp(36px,5vw,64px)] font-bold leading-[1] text-white min-[1000px]:mb-12">
        Jak działa tutoreo?
      </h1>

      <div
        id="ThreeSteps"
        className="flex w-full max-w-[948px] flex-col items-center gap-10 px-4 min-[1000px]:flex-row min-[1000px]:items-start min-[1000px]:justify-center min-[1000px]:gap-0"
      >
        {howItWorksSteps.map((step) => (
          <div
            key={step.number}
            className="relative w-full max-w-[300px] px-6 min-[1000px]:h-[280px]"
          >
            <h2 className="text-[64px] font-bold leading-[64px] text-white">
              {step.number}
            </h2>
            {step.showArrow ? (
              <Image
                src="/images/Graphics/CurvedArrow.svg"
                alt="Zakrzywiona Strzałka"
                width={120}
                height={39}
                className="pointer-events-none absolute top-16 right-[-72px] hidden w-[120px] min-[1000px]:block"
              />
            ) : null}
            <h3 className="my-6 text-[24px] font-bold leading-7 text-white">
              {step.title}
            </h3>
            <p className="text-[20px] font-light leading-7 text-white min-[1000px]:text-[24px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <h1
        id="TestTitle"
        className="mt-12 px-4 text-[clamp(32px,4vw,48px)] font-bold leading-[1.1] text-white min-[1000px]:mt-16 min-[1000px]:text-[64px] min-[1000px]:leading-[64px]"
      >
        Przetestuj bez rejestracji
      </h1>
      <h3
        id="TestParagraph"
        className="mx-auto mt-4 max-w-[800px] px-4 text-[18px] font-normal leading-7 text-white min-[1000px]:text-[24px]"
      >
        Już teraz możesz zobaczyć jak działa tablica która jest dostępna podczas
        połączenia. Wystarczy że klikniesz przycisk poniżej!
      </h3>
      <a
        id="TestWhiteboardButton"
        href="https://tutoreo.pl/whiteboard"
        target="_blank"
        rel="noreferrer"
        className="tutoreo-standard-btn tutoreo-standard-btn--white mt-6 mb-16"
      >
        Przetestuj tablicę
      </a>

      <div className="pointer-events-none w-full translate-y-[1px]">
        <Image
          src="/images/Waves/LandingPage/Wave3.svg"
          alt=""
          width={1440}
          height={60}
          className="tutoreo-wave-cutout"
        />
      </div>
    </section>
  );
}
