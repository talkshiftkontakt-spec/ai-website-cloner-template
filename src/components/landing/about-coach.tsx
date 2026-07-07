import Image from "next/image";

import { COACH } from "@/lib/constants/content";
import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

export function AboutCoach() {
  return (
    <Section id="trener">
      <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <FadeUp>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl bg-canvas-raised lg:mx-0">
            <Image
              src={COACH.image}
              alt={`${COACH.name} — coach LekkiStart`}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-label text-brand">O trenerze</p>
          <h2 className="text-display mt-3 text-primary">{COACH.name}</h2>
          <p className="mt-2 text-secondary">{COACH.title}</p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-secondary">
            {COACH.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {COACH.credentials.map((credential) => (
              <li
                key={credential}
                className="flex gap-2 text-sm text-secondary"
              >
                <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                {credential}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </Section>
  );
}
