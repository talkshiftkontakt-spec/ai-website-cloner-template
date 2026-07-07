import Image from "next/image";

import { COACH } from "@/lib/constants/content";
import { Section } from "@/components/layout/section";

export function AboutCoach() {
  return (
    <Section id="trener">
      <div className="grid items-start gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden bg-canvas-raised lg:mx-0">
          <Image
            src={COACH.image}
            alt={`${COACH.name}, coach LekkiStart`}
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-label text-secondary">Trener</p>
          <h2 className="text-display mt-3 text-primary">{COACH.name}</h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-tertiary">
            {COACH.title}
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-secondary md:text-base">
            {COACH.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {COACH.credentials.map((credential) => (
              <li key={credential} className="text-sm text-secondary">
                · {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
