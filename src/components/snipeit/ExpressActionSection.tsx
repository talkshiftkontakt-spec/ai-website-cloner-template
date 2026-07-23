"use client";

import { Plus } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/snipeit/Reveal";
import { ASSET, CAR_NOTIFICATIONS } from "@/lib/snipeit-content";

const NOTIF_TRANSFORMS = [
  { translateY: -209, rotate: -2.44 },
  { translateY: -91, rotate: 2.75 },
  { translateY: -26, rotate: -1.69 },
  { translateY: 73, rotate: 0.64 },
  { translateY: 129, rotate: -0.96 },
  { translateY: 219, rotate: -0.88 },
] as const;

function CarNotificationCard({
  title,
  price,
  source,
  sourceIcon,
  image,
  offsetX,
  translateY,
  rotate,
  opacity,
}: {
  title: string;
  price: string;
  source: string;
  sourceIcon: string;
  image: string;
  offsetX: string;
  translateY: number;
  rotate: number;
  opacity: MotionValue<number> | number;
}) {
  return (
    <motion.div
      className="notif-card absolute top-1/2 left-1/2 w-[150px] sm:w-[240px] lg:w-[340px]"
      style={{
        marginLeft: offsetX,
        opacity,
        transform: `translateX(-50%) translateY(${translateY}px) rotate(${rotate}deg)`,
      }}
    >
      <div className="flex items-center gap-1.5 rounded-[10px] border border-[#bae3df]/45 bg-[#1c2625]/80 px-1.5 py-1 shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:gap-3 sm:rounded-[15px] sm:px-3 sm:py-2.5">
        <div className="relative h-[28px] w-[32px] shrink-0 overflow-hidden rounded-[4px] sm:h-[45px] sm:w-[54px] sm:rounded-[6px]">
          <Image src={image} alt="" fill className="object-cover" sizes="54px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[9px] leading-[1.2] font-light tracking-[-0.3px] text-white sm:text-[15px] sm:tracking-[-0.5px]">
            {title}
          </p>
          <p className="mt-0.5 truncate text-[9px] leading-[1.1] font-light tracking-[-0.3px] text-[#6d8886] sm:mt-1 sm:text-[15px] sm:tracking-[-0.5px]">
            {price}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#bae3df]/60 bg-[#1c2625] px-1.5 py-0.5 sm:gap-1.5 sm:px-2.5 sm:py-1">
          <Image
            src={sourceIcon}
            alt=""
            width={16}
            height={16}
            className="h-[11px] w-[11px] shrink-0 rounded-[3px] object-contain sm:h-[16px] sm:w-[16px] sm:rounded-[4px]"
          />
          <span className="text-[9px] tracking-[-0.3px] text-[#f5fefd] sm:text-[13px] sm:tracking-[-0.5px]">
            {source}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const o0 = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const o1 = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const o2 = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const o3 = useTransform(scrollYProgress, [0.38, 0.5], [0, 1]);
  const o4 = useTransform(scrollYProgress, [0.46, 0.58], [0, 1]);
  const o5 = useTransform(scrollYProgress, [0.54, 0.66], [0, 1]);
  const opacities = [o0, o1, o2, o3, o4, o5];

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[781px] overflow-hidden rounded-[37px]"
      style={{
        aspectRatio: "781/660",
        background: "linear-gradient(205deg, #678c88 0%, #3a4f4c 28%, #1c2625 62%)",
      }}
    >
      <Image
        src={`${ASSET}/phone-grid.svg`}
        alt=""
        width={984}
        height={449}
        className="pointer-events-none absolute top-[17%] left-[-8.2%] z-0 h-[68%] w-[126%] max-w-none select-none"
        style={{ filter: "brightness(1.3)" }}
      />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        {CAR_NOTIFICATIONS.map((notif, i) => {
          const t = NOTIF_TRANSFORMS[i];
          if (!t) return null;
          return (
            <CarNotificationCard
              key={notif.title}
              title={notif.title}
              price={notif.price}
              source={notif.source}
              sourceIcon={notif.sourceIcon}
              image={notif.image}
              offsetX={notif.offsetX}
              translateY={t.translateY}
              rotate={t.rotate}
              opacity={reduce ? 1 : opacities[i]!}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 z-[2] flex items-end justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full items-end"
        >
          <Image
            src={`${ASSET}/phone-app.webp`}
            alt="Snipelt na telefonie"
            width={615}
            height={700}
            className="h-[84%] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function ExpressActionSection() {
  return (
    <section className="relative overflow-hidden px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:gap-16">
          <Reveal className="max-w-[600px] flex-1 text-center lg:text-left" x={40} y={0}>
            <div
              className="scroll-mt-24 mx-auto mb-6 text-center lg:mx-0 lg:text-left"
              style={{ maxWidth: 620 }}
            >
              <p className="font-sf-expanded-medium mb-2 text-[12px] leading-[1.4] tracking-[0.22em] text-[#49768d] uppercase md:mb-3 md:text-[15px]">
                EKSPRESOWE DZIAŁANIE
              </p>
              <h2 className="text-gradient-section text-[28px] leading-[36px] tracking-tight md:text-[48px] md:leading-[50px]">
                <span className="font-sf-expanded-regular">Bądź przed innymi, </span>
                <span className="font-sf-expanded-bold">w ciągu kilku sekund</span>
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
              Snipelt monitoruje jednocześnie najpopularniejsze portale
              ogłoszeniowe i natychmiast wykrywa nowe oferty spełniające Twoje
              kryteria. Nie musisz już ręcznie odświeżać stron ani przeglądać
              setek ogłoszeń. Ustaw własne frazy kluczowe, filtry oraz zakres
              cenowy, a gdy pojawi się pasujące ogłoszenie — otrzymasz
              powiadomienie w czasie rzeczywistym. Dzięki temu możesz
              skontaktować się ze sprzedawcą, zanim zrobi to konkurencja.
            </p>
          </Reveal>

          <Reveal className="w-full flex-1" x={-40} y={0} delay={0.1}>
            <PhoneVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
