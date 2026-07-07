import Image from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import type { SpecialistProfile } from "@/lib/pages-data";

interface SpecialistProfilesSectionProps {
  intro?: string;
  profiles: SpecialistProfile[];
}

export function SpecialistProfilesSection({ intro, profiles }: SpecialistProfilesSectionProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
      {intro ? (
        <SectionReveal>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-[#3d4a47]">{intro}</p>
        </SectionReveal>
      ) : null}

      <div className="space-y-16">
        {profiles.map((profile, index) => (
          <SectionReveal key={profile.id} delay={index * 0.03}>
            <article
              id={profile.id}
              className="scroll-mt-24 grid gap-8 border-b border-[#134340]/10 pb-16 last:border-0 lg:grid-cols-[220px_1fr] lg:gap-12"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-[#f4f7f5]">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#134340]">
                  {profile.name}
                </h2>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-[#879d91]">{profile.role}</p>
                <div className="mt-5 space-y-4">
                  {profile.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-[17px] leading-relaxed text-[#3d4a47]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {profile.services.length > 0 ? (
                  <div className="mt-6">
                    <p className="mb-2 text-sm font-semibold text-[#134340]">W Gabinetach Pomorska prowadzi:</p>
                    <ul className="list-disc space-y-1 pl-5 text-[#3d4a47]">
                      {profile.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
