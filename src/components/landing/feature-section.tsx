import Image from "next/image";

import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

type FeatureSectionProps = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  reversed?: boolean;
};

export function FeatureSection({
  id,
  label,
  title,
  paragraphs,
  image,
  reversed,
}: FeatureSectionProps) {
  return (
    <Section id={id}>
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <FadeUp>
          <p className="text-label text-brand">{label}</p>
          <h2 className="text-display mt-3 text-primary">{title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-secondary">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-canvas-raised">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}
