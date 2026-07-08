import { CLIENT_STORIES } from "@/lib/constants/content";
import { Section } from "@/components/layout/section";

export function ClientStories() {
  return (
    <Section id="historie" theme="raised">
      <p className="text-label text-secondary">Historie</p>
      <h2 className="text-display mt-3 max-w-2xl text-primary">
        Ludzie, nie case study.
      </h2>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {CLIENT_STORIES.map((story) => (
          <article key={story.name} className="grid gap-6 py-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <blockquote className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight tracking-tight text-primary md:text-3xl">
              „{story.quote}”
            </blockquote>
            <div>
              <p className="text-sm leading-relaxed text-secondary">{story.excerpt}</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-tertiary">
                {story.name} · {story.duration}
              </footer>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
