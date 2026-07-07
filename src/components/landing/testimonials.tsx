import { TESTIMONIALS } from "@/lib/constants/content";
import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

export function Testimonials() {
  return (
    <Section id="opinie">
      <FadeUp>
        <p className="text-label text-brand">Opinie</p>
        <h2 className="text-display mt-3 text-primary">
          Co mówią osoby w programie
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((item, index) => (
          <FadeUp key={item.author} delay={index * 0.06}>
            <blockquote className="rounded-xl border border-border bg-canvas-raised p-6 lg:p-8">
              <p className="text-base leading-relaxed text-primary">
                „{item.quote}”
              </p>
              <footer className="mt-4 text-sm text-tertiary">
                {item.author} · {item.duration}
              </footer>
            </blockquote>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
