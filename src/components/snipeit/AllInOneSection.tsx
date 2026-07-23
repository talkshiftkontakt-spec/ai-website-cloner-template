"use client";

import { Plus } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/snipeit/Reveal";
import { ASSET, SOURCE_LOGOS } from "@/lib/snipeit-content";

const LOGO_ROW_TOP = SOURCE_LOGOS.slice(0, 2);
const LOGO_ROW_BOTTOM = SOURCE_LOGOS.slice(2);

const RINGS = [
  { width: "100%", bottom: "-50%", borderColor: "rgba(255, 255, 255, 0.04)" },
  { width: "80%", bottom: "-40%", borderColor: "rgba(255, 255, 255, 0.04)" },
  { width: "60%", bottom: "-30%", borderColor: "rgba(255, 255, 255, 0.04)" },
  { width: "40%", bottom: "-20%", borderColor: "rgba(251, 253, 253, 0.047)" },
] as const;

export function FeaturesDecorations() {
  return (
    <>
      <div className="animate-union-pulse pointer-events-none absolute -left-[120px] top-[200px] h-[250px] w-[250px] rotate-[15deg] opacity-[0.40] md:-left-[250px] md:h-[631px] md:w-[631px]">
        <Image
          src={`${ASSET}/union-outline.svg`}
          alt=""
          width={631}
          height={631}
          className="h-full w-full"
        />
      </div>
      <div className="animate-union-pulse pointer-events-none absolute -right-[100px] top-[1200px] h-[220px] w-[220px] rotate-[-25deg] opacity-[0.40] md:-right-[160px] md:h-[531px] md:w-[531px]">
        <Image
          src={`${ASSET}/union-outline.svg`}
          alt=""
          width={531}
          height={531}
          className="h-full w-full"
        />
      </div>
      <div className="animate-union-pulse pointer-events-none absolute -left-[90px] top-[3050px] h-[200px] w-[200px] rotate-[20deg] opacity-[0.55] md:-left-[180px] md:h-[450px] md:w-[450px]">
        <Image
          src={`${ASSET}/union-outline.svg`}
          alt=""
          width={450}
          height={450}
          className="h-full w-full"
        />
      </div>
    </>
  );
}

function SourcesVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const linesOpacity = useTransform(scrollYProgress, [0.35, 0.75], [0, 0.5]);
  const pulseOpacity = useTransform(scrollYProgress, [0.45, 0.85], [0, 0.85]);
  const nodeScale = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[781px] overflow-hidden rounded-[37px]"
      style={{
        aspectRatio: "781/660",
        backgroundImage:
          "linear-gradient(180deg, #4a6e6a 0%, #2d3d3b 35%, #1c2625 70%, #1a2322 100%)",
      }}
    >
      {RINGS.map((ring, i) => (
        <motion.div
          key={ring.width}
          className="absolute left-1/2 -translate-x-1/2 rounded-full border"
          style={{
            width: ring.width,
            aspectRatio: "1 / 1",
            bottom: ring.bottom,
            borderColor: ring.borderColor,
          }}
          animate={
            reduce
              ? undefined
              : {
                  scale: [1, 1.015, 1],
                }
          }
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className="relative z-10 flex flex-col items-center px-8"
        style={{ marginTop: "9%", gap: 18 }}
      >
        <Stagger className="flex justify-center gap-[12px] sm:gap-[24px]" stagger={0.1}>
          {LOGO_ROW_TOP.map((logo) => (
            <StaggerItem key={logo.alt}>
              <div className="h-[56px] w-[56px] overflow-hidden rounded-[18px] sm:h-[86px] sm:w-[86px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={86}
                  height={86}
                  className="h-full w-full object-contain"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger
          className="flex justify-center gap-[12px] sm:gap-[24px]"
          stagger={0.1}
          delay={0.15}
        >
          {LOGO_ROW_BOTTOM.map((logo) => (
            <StaggerItem key={logo.alt}>
              <div className="h-[56px] w-[56px] overflow-hidden rounded-[18px] sm:h-[86px] sm:w-[86px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={86}
                  height={86}
                  className="h-full w-full object-contain"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <motion.div
        className="absolute z-[1]"
        style={{
          left: "21.3%",
          top: "26.2%",
          width: "58.6%",
          height: "59.2%",
          opacity: reduce ? 0.5 : linesOpacity,
        }}
      >
        <Image
          src={`${ASSET}/lines2.svg`}
          alt=""
          width={458}
          height={391}
          className="h-full w-full"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute z-[2]"
        style={{
          left: "21.3%",
          top: "26.2%",
          width: "58.6%",
          height: "59.2%",
          opacity: reduce ? 0.7 : pulseOpacity,
        }}
      >
        <Image
          src={`${ASSET}/lines-pulse.svg`}
          alt=""
          width={458}
          height={391}
          className="h-full w-full"
          style={{
            filter: "brightness(2) drop-shadow(0 0 6px rgba(186,227,223,0.5))",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: "50.55%",
          top: "80%",
          scale: reduce ? 1 : nodeScale,
        }}
      >
        <div
          className="h-[17px] w-[17px] rounded-full"
          style={{
            background: "linear-gradient(180deg, #BAE3DF 0%, #323C3B 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{
          bottom: "7%",
          width: "25%",
          scale: reduce ? 1 : nodeScale,
          opacity: reduce ? 1 : nodeScale,
        }}
      >
        <Image
          src={`${ASSET}/snipelt-logo.webp`}
          alt="Snipelt"
          width={200}
          height={80}
          className="h-auto w-full object-contain"
        />
      </motion.div>
    </div>
  );
}

export function AllInOneSection() {
  return (
    <section className="relative overflow-hidden px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row-reverse lg:gap-16">
          <Reveal className="w-full flex-1" x={-40} y={0}>
            <SourcesVisual />
          </Reveal>

          <Reveal className="max-w-[600px] flex-1 text-center lg:text-left" x={40} y={0} delay={0.1}>
            <div
              className="scroll-mt-24 mx-auto mb-6 text-center lg:mx-0 lg:text-left"
              style={{ maxWidth: 620 }}
            >
              <p className="font-sf-expanded-medium mb-2 text-[12px] leading-[1.4] tracking-[0.22em] text-[#49768d] uppercase md:mb-3 md:text-[15px]">
                NARZĘDZIE ALL IN ONE
              </p>
              <h2 className="text-gradient-section text-[28px] leading-[36px] tracking-tight md:text-[48px] md:leading-[50px]">
                <span className="font-sf-expanded-regular">Jedna platforma, </span>
                <span className="font-sf-expanded-bold">wszystkie ogłoszenia</span>
              </h2>
            </div>

            <div className="mb-8 flex justify-center lg:justify-start">
              <a
                href="#plany"
                className="animate-cta-shimmer font-satoshi inline-flex h-[52px] items-center gap-2.5 rounded-full border border-[#394746] px-7 text-[18px] font-bold text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.15)] transition hover:brightness-110"
                style={{
                  background:
                    "radial-gradient(130% 130% at 50% 0%, #2e3b3a 0%, #1c2625 78%)",
                }}
              >
                <Plus className="h-[18px] w-[18px]" strokeWidth={2.5} aria-hidden />
                Zdobądź dostęp
              </a>
            </div>

            <p className="font-satoshi text-justify text-[15px] leading-[24px] font-medium text-black md:text-[18px] md:leading-[28px] lg:text-left">
              Zapomnij o wielogodzinnym przeglądaniu dziesiątek witryn w
              poszukiwaniu idealnej okazji. Snipelt to zaawansowany agregator,
              który w czasie rzeczywistym skanuje wszystkie najpopularniejsze
              portale ogłoszeniowe, łącząc je w jeden, przejrzysty widok. Dzięki
              nam zyskujesz natychmiastowy dostęp do każdej oferty na rynku w
              jednym miejscu. Skonfiguruj inteligentne powiadomienia o rzadkich
              przedmiotach, których szukasz, i bądź zawsze o krok przed innymi
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
