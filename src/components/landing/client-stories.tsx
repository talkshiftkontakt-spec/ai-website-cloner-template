import { CLIENT_STORIES } from "@/lib/constants/content";
import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

export function ClientStories() {
  return (
    <Section id="historie" theme="raised">
      <FadeUp>
        <p className="text-label text-brand">Historie klientów</p>
        <h2 className="text-display mt-3 max-w-2xl text-primary">
          Prawdziwe historie. Bez sensacyjnych obietnic.
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {CLIENT_STORIES.map((story, index) => (
          <FadeUp key={story.name} delay={index * 0.08}>
            <article className="flex h-full flex-col rounded-xl border border-border bg-canvas p-6 lg:p-8">
              <blockquote className="font-[family-name:var(--font-display)] text-xl leading-snug text-primary">
                „{story.quote}”
              </blockquote>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-secondary">
                {story.excerpt}
              </p>
              <footer className="mt-6 border-t border-border pt-4 text-sm text-tertiary">
                {story.name} · {story.duration} współpracy
              </footer>
            </article>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
