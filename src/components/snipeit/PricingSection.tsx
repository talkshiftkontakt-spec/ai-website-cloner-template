"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/snipeit/Reveal";
import { ASSET, PRICING_PLANS } from "@/lib/snipeit-content";
import { cn } from "@/lib/utils";
import type { PricingInterval, PricingPlan } from "@/types/snipeit";

function PopularBadge() {
  return (
    <div className="absolute -top-[16px] left-1/2 z-20 -translate-x-1/2 -rotate-[2.89deg]">
      <div
        className="rounded-[11px] p-[2.5px] shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
        style={{
          background:
            "linear-gradient(115deg, #bae3df 0%, #f2faff 22%, #678c88 46%, #eafffb 62%, #bae3df 82%, #f2faff 100%)",
          backgroundSize: "280% 100%",
          animation: "metal-move 6s linear infinite",
        }}
      >
        <div
          className="rounded-[9px] px-6 py-[5px] shadow-[inset_0px_3px_3px_0px_#ffffff]"
          style={{
            background:
              "radial-gradient(120% 160% at 30% 10%, #f2faff 0%, #bae3df 90%)",
          }}
        >
          <span className="font-satoshi text-[20px] font-bold tracking-[-1px] text-[#1c2625]">
            Popularne
          </span>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  plan,
  interval,
}: {
  plan: PricingPlan;
  interval: PricingInterval;
}) {
  const isYearly = interval === "yearly";
  const isEnterprise = plan.id === "enterprise";
  const isPopular = Boolean(plan.popular);
  const price = isEnterprise
    ? null
    : isYearly
      ? plan.yearlyPrice
      : plan.monthlyPrice;
  const showSavings = isYearly && plan.yearlySavings !== null;

  const ctaClassName =
    "btn-metal-dark font-satoshi mt-[22px] flex h-[52px] w-full items-center justify-center rounded-[38px] border border-[#a3c8c5] text-[20px] font-bold text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] transition-[filter] hover:brightness-110 md:mt-[26px]";

  const card = (
    <div
      className={cn(
        "flex h-full flex-col bg-[#edf7fc] p-[16px] pb-[28px] md:min-h-[560px] md:p-[18px] md:pb-[36px]",
        isPopular ? "rounded-[36px]" : "rounded-[41px]"
      )}
    >
      <div className="rounded-[19px] bg-white p-[22px] md:p-[26px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-satoshi text-[28px] leading-none font-bold text-[#1c2625] md:text-[32px]">
            {plan.name}
          </h3>
          <div className="shrink-0 text-right">
            {isEnterprise ? (
              <span className="font-satoshi block text-[14px] leading-[18px] font-medium text-[#747979]">
                Wycena
                <br />
                indywidualna
              </span>
            ) : (
              <>
                <span className="font-satoshi block text-[28px] leading-none font-bold text-[#1c2625] md:text-[32px]">
                  {price}
                </span>
                <span className="font-satoshi mt-[6px] block text-[13px] font-medium text-[#747979] md:text-[14px]">
                  / miesięcznie
                </span>
                {showSavings ? (
                  <span className="font-satoshi mt-2 inline-block rounded-[8px] bg-[#bae3df] px-2 py-1 text-[11px] leading-tight font-bold text-[#1c2625] md:text-[12px]">
                    {plan.yearlySavings}
                  </span>
                ) : null}
              </>
            )}
          </div>
        </div>
        <p className="font-satoshi mt-[14px] max-w-[230px] text-[15px] leading-[20px] font-medium text-[#747979] md:text-[16px]">
          {plan.description}
        </p>
        {isEnterprise ? (
          <a href="#kontakt" className={ctaClassName}>
            {plan.cta}
          </a>
        ) : (
          <button type="button" className={ctaClassName}>
            {plan.cta}
          </button>
        )}
      </div>
      <p className="font-satoshi mt-[24px] mb-[14px] px-[6px] text-[16px] font-bold text-[#747979]">
        Pakiet zawiera
      </p>
      <ul className="space-y-[6px] px-[6px]">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="font-satoshi flex items-center gap-[10px] text-[17px] leading-[30px] text-[#1c2625] md:text-[20px]"
          >
            <Image
              src={`${ASSET}/badge-check.svg`}
              alt=""
              width={15}
              height={15}
              className="h-[15px] w-[15px] shrink-0"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  if (isPopular) {
    return (
      <div className="metal-outline relative">
        <PopularBadge />
        {card}
      </div>
    );
  }

  return card;
}

export function PricingSection() {
  const [interval, setInterval] = useState<PricingInterval>("monthly");

  return (
    <section id="plany" className="relative px-4 py-20 md:px-6">
      <div className="absolute inset-x-0 top-0 bottom-0 mx-auto max-w-none overflow-hidden rounded-none md:inset-x-6 md:max-w-[1756px] md:rounded-[30px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 92% at 50% 0%, #1c2625 0%, #2f403e 25%, #425957 50%, #54736f 75%, #678c88 100%)",
          }}
        />
        <Image
          src={`${ASSET}/pricing-pattern.svg`}
          alt=""
          width={2210}
          height={788}
          className="pointer-events-none absolute bottom-[-70px] left-1/2 h-[788px] w-[2210px] max-w-none -translate-x-1/2 mix-blend-overlay select-none"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px]">
        <Reveal className="mx-auto mb-10 scroll-mt-24 text-center md:mb-14">
          <p className="font-sf-expanded-medium mb-2 text-[12px] leading-[1.4] tracking-[0.22em] text-[#b7dcef] uppercase md:mb-3 md:text-[15px]">
            NIE ZWLEKAJ
          </p>
          <h2 className="text-gradient-section-dark text-[28px] leading-[36px] tracking-tight md:text-[48px] md:leading-[50px]">
            <span className="font-sf-expanded-regular">Elastyczna </span>
            <span className="font-sf-expanded-bold">subskrypcja</span>
          </h2>
        </Reveal>

        <div className="mx-auto mb-12 grid max-w-[520px] grid-cols-1 items-start gap-6 lg:max-w-[1240px] lg:grid-cols-3 xl:max-w-[1420px] xl:gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <Reveal
              key={plan.id}
              delayMs={index * 80}
              className={cn(
                plan.popular ? "relative z-10 lg:-mt-4" : "lg:mt-12"
              )}
            >
              <PricingCard plan={plan} interval={interval} />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex items-center justify-center">
          <div className="inline-flex items-center">
            <button
              type="button"
              onClick={() => setInterval("monthly")}
              className={cn(
                "font-satoshi h-[37px] rounded-l-[30px] border px-6 text-[15px] font-medium text-white transition-all duration-200",
                interval === "monthly"
                  ? "border-[#759390] bg-[#293735]"
                  : "border-[#597976] bg-[#8ca4a2]"
              )}
            >
              Miesięczny
            </button>
            <button
              type="button"
              onClick={() => setInterval("yearly")}
              className={cn(
                "font-satoshi h-[37px] rounded-r-[30px] border px-6 text-[15px] font-medium text-white transition-all duration-200",
                interval === "yearly"
                  ? "border-[#759390] bg-[#293735]"
                  : "border-[#597976] bg-[#8ca4a2]"
              )}
            >
              Roczny <span className="text-[#e3e3e3]">-10%</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
