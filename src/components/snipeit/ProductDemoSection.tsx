"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ASSET, CATEGORIES, NEW_OFFERS } from "@/lib/snipeit-content";

const SIDEBAR_ICONS = [
  { src: `${ASSET}/diamond-percent.svg`, alt: "" },
  { src: `${ASSET}/search.svg`, alt: "" },
  { src: `${ASSET}/squares-subtract.svg`, alt: "" },
  { src: `${ASSET}/octagon-minus.svg`, alt: "" },
  { src: `${ASSET}/user-round-check.svg`, alt: "" },
  { src: `${ASSET}/settings.svg`, alt: "" },
] as const;

const OFFER_CARD_BG =
  "linear-gradient(107.642deg, rgb(28, 38, 37) 65.894%, rgb(103, 140, 136) 134.68%)";

const EXTRA_OFFERS = [
  {
    title: "IPhone 14 Pro Max",
    location: "Poznań",
    price: "1 550,00 zł",
    image: `${ASSET}/iphone14pro.webp`,
  },
  {
    title: "IPhone 15 Pro Max",
    location: "Łódź",
    price: "2 100,00 zł",
    image: `${ASSET}/iphone17pro.webp`,
  },
  {
    title: "IPhone 13",
    location: "Kraków",
    price: "1 249,00 zł",
    image: `${ASSET}/iphone13pro.webp`,
  },
] as const;

function OfferFeed() {
  const reduce = useReducedMotion();
  const feed = useMemo(() => [...EXTRA_OFFERS, ...NEW_OFFERS], []);
  const [offset, setOffset] = useState(0);
  const cardH = 90; // approx card + gap

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % feed.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [feed.length, reduce]);

  const loop = [...feed, ...feed];

  return (
    <div className="relative h-[430px] overflow-hidden">
      <motion.div
        className="space-y-[22px]"
        animate={reduce ? undefined : { y: -offset * cardH }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {loop.map((offer, i) => (
          <motion.div
            key={`${offer.title}-${offer.location}-${offer.price}-${i}`}
            className="flex items-center gap-4 rounded-[17px] border-[0.847px] border-[#394746] p-4 backdrop-blur-[8.5px]"
            style={{ background: OFFER_CARD_BG }}
            initial={false}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <div className="h-[50px] w-[50px] shrink-0 overflow-hidden rounded-[8px]">
              <Image
                src={offer.image}
                alt={offer.title}
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-satoshi truncate text-[18px] font-medium tracking-[-0.9px] text-white">
                {offer.title}
              </p>
              <p className="font-satoshi text-[11px] font-medium tracking-[-0.5px] text-[#9a9a9a]">
                {offer.location}
              </p>
            </div>
            <p className="font-satoshi whitespace-nowrap text-[18px] font-medium tracking-[-0.9px] text-[#bae3df]">
              {offer.price}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#1c2625] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#2c3736] to-transparent" />
    </div>
  );
}

export function ProductDemoSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rotateX = useSpring(rawRotate, { stiffness: 120, damping: 28 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 28 });
  const y = useSpring(rawY, { stiffness: 120, damping: 28 });

  return (
    <section
      id="produkt"
      ref={ref}
      className="scroll-mt-[94px] px-6 py-8"
    >
      <div className="mx-auto max-w-[1480px]" style={{ perspective: 1600 }}>
        <motion.div
          className="flex flex-col gap-6 lg:flex-row"
          style={
            reduce
              ? undefined
              : {
                  transformStyle: "preserve-3d",
                  transformOrigin: "center top",
                  rotateX,
                  scale,
                  y,
                }
          }
        >
          <motion.div
            className="hidden min-h-[500px] flex-1 overflow-hidden rounded-[37px] bg-[#1c2625] lg:block lg:min-h-[660px]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full">
              <div
                className="hidden w-[85px] shrink-0 flex-col items-center gap-[18px] rounded-l-[37px] pt-[26px] pb-6 sm:flex"
                style={{
                  background:
                    "linear-gradient(to bottom, #2d3b39 40%, #1e2121 133%)",
                }}
              >
                <div className="mb-[31px] px-2">
                  <Image
                    src={`${ASSET}/sidebar-interactive-logo.png`}
                    alt="Logo"
                    width={22}
                    height={35}
                    className="h-[35px] w-[22px] object-contain"
                  />
                </div>
                {SIDEBAR_ICONS.map((icon) => (
                  <button
                    key={icon.src}
                    type="button"
                    className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-[5px] bg-[#242d2d]"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </button>
                ))}
                <div className="mt-auto flex flex-col items-center gap-[21px]">
                  <button
                    type="button"
                    className="flex h-[39px] w-[39px] items-center justify-center rounded-[5px]"
                  >
                    <Image
                      src={`${ASSET}/log-out.svg`}
                      alt="Log out"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </button>
                  <Image
                    src={`${ASSET}/avatar.svg`}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-hidden p-4 sm:p-8">
                <h3 className="font-sf-expanded-regular mb-1 text-[18px] tracking-[-1.2px] text-[#aeccc9] sm:text-[24px]">
                  Witaj <span className="font-sf-expanded-bold">Krystian,</span>{" "}
                  na co dziś polujemy?
                </h3>

                <div className="mt-8 mb-6">
                  <div className="mb-5 flex items-center gap-3">
                    <p className="font-sf-expanded-medium text-[15px] tracking-[-0.75px] text-[#aecbc9]">
                      Proponowane
                    </p>
                    <div className="h-px flex-1 bg-[#394746]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {CATEGORIES.map((category, i) => {
                      const isSeeAll = "seeAll" in category && category.seeAll;
                      return (
                        <motion.div
                          key={category.label}
                          className={`flex aspect-[4/3] flex-col items-center justify-center rounded-[10px] border border-[#bae3df] ${
                            isSeeAll ? "bg-[rgba(0,0,0,0.2)]" : "bg-[#2e3b3a]"
                          }`}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * i, duration: 0.4 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <Image
                            src={category.icon}
                            alt={category.label}
                            width={isSeeAll ? 20 : 76}
                            height={isSeeAll ? 20 : 76}
                            className={
                              isSeeAll ? "mb-2 h-5 w-5" : "mb-2 h-[76px] w-[76px]"
                            }
                          />
                          <span className="font-satoshi text-center text-[14px] font-medium text-[#9ebdbb]">
                            {category.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <p className="font-sf-expanded-medium text-[15px] tracking-[-0.75px] text-[#aecbc9]">
                      Twoje ostatnie zakupy
                    </p>
                    <div className="h-px flex-1 bg-[#394746]" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-[44px] bg-[#253130]" />
                    <div className="h-[44px] bg-[#253130]" />
                    <div className="h-[44px] bg-[#253130]" />
                    <div className="h-[44px] bg-[#253130] opacity-40" />
                    <div className="h-[44px] bg-[#253130] opacity-40" />
                    <div className="h-[44px] bg-[#253130] opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="min-h-[420px] w-full shrink-0 overflow-hidden rounded-[37px] lg:min-h-[660px] lg:w-[490px]"
            style={{
              background:
                "linear-gradient(rgb(28, 38, 37) 61.364%, rgb(44, 55, 54) 100%)",
            }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="p-6 pt-8">
              <h3 className="font-sf-expanded-bold mb-6 text-center text-[20px] text-[#bae3df]">
                Nowe oferty
              </h3>
              <OfferFeed />
              <div className="font-sf-regular mt-6 flex items-center justify-between gap-2 text-[11px] sm:text-[15px]">
                <span className="text-[#bae3df]">
                  <span className="font-sf-bold">Śledzenie kategorii</span>:
                  IPhone
                </span>
                <span className="text-right text-[#bae3df]">
                  <span className="font-sf-bold">Cena</span>: od najniższej
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
