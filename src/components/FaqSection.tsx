"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faqItems } from "@/lib/tutoreo-content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="FAQSection"
      className="relative flex flex-col items-center bg-[linear-gradient(var(--AccentColor),var(--AccentColor1))]"
    >
      <div className="pointer-events-none w-full -translate-y-[1px]">
        <Image
          src="/images/Waves/LandingPage/Wave4.svg"
          alt=""
          width={1440}
          height={80}
          className="tutoreo-wave-cutout"
        />
      </div>

      <div className="flex w-full max-w-[900px] flex-col items-center px-4 pb-8 pt-10 min-[1000px]:px-0 min-[1000px]:pt-16">
        <h1 className="text-center text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-white">
          Najczęstsze pytania (FAQ)
        </h1>
        <p className="mt-4 text-center text-[18px] font-normal leading-7 text-white min-[1000px]:text-[24px]">
          Jeżeli nie umiesz znaleźć odpowiedzi na swoje pytanie poniżej, napisz
          do nas.
        </p>
        <Link
          id="ContactUsButton"
          href="/contact"
          className="tutoreo-standard-btn tutoreo-standard-btn--white mt-6 mb-10"
        >
          Skontaktuj się z nami
        </Link>

        <div className="flex w-full max-w-[800px] flex-col">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <button
                key={item.question}
                type="button"
                className={cn(
                  "mb-6 grid w-full cursor-pointer grid-cols-[1fr_32px] gap-x-4 rounded-2xl bg-white px-6 py-6 text-left shadow-[var(--InsetShadow)] transition-all duration-200 ease-in-out min-[1000px]:gap-x-6 min-[1000px]:px-12",
                  open && "translate-y-0.5"
                )}
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <h3 className="col-start-1 row-start-1 text-[20px] font-bold leading-7 text-black min-[1000px]:text-[24px]">
                  {item.question}
                </h3>
                <Image
                  src="/images/icons/SelectArrow.svg"
                  alt=""
                  width={32}
                  height={18}
                  className={cn(
                    "col-start-2 row-start-1 h-[18px] w-8 self-center transition-transform duration-200 ease-in-out",
                    open && "rotate-180"
                  )}
                />
                <p
                  className={cn(
                    "col-start-1 row-start-2 overflow-hidden text-[18px] font-normal leading-[22px] text-black transition-all duration-200 ease-in-out",
                    open
                      ? "mt-6 max-h-[200px] opacity-100"
                      : "mt-0 max-h-0 opacity-0"
                  )}
                >
                  {item.answer}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none w-full translate-y-[1px]">
        <Image
          src="/images/Waves/LandingPage/Wave5.svg"
          alt=""
          width={1440}
          height={80}
          className="tutoreo-wave-cutout"
        />
      </div>
    </section>
  );
}
