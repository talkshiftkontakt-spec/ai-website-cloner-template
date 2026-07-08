import { TESTIMONIALS } from "@/lib/constants/content";
import { Section } from "@/components/layout/section";

export function Testimonials() {
  return (
    <Section id="opinie">
      <p className="text-label text-secondary">Opinie</p>
      <h2 className="text-display mt-3 text-primary">Co mówią w programie</h2>

      <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <blockquote key={item.author} className="bg-canvas p-6 md:p-8">
            <p className="text-base leading-relaxed text-primary">„{item.quote}”</p>
            <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-tertiary">
              {item.author} · {item.duration}
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
