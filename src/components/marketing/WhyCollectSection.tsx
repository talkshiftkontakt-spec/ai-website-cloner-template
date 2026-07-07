import { Box, Palette, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Box,
    title: "Craft",
    description:
      "Żywica premium, ręczne wykończenie i opcjonalna podstawa z litego dębu. Każdy detal ma znaczenie.",
  },
  {
    icon: Palette,
    title: "Identity",
    description:
      "Twoja główka — Twój skin. Personalizacja z podglądem 3D przed zamówieniem.",
  },
  {
    icon: Sparkles,
    title: "Display",
    description:
      "Zaprojektowane do ekspozycji na półce, biurku lub w gablocie kolekcjonerskiej.",
  },
];

export function WhyCollectSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Dlaczego kolekcjonować główki?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Więcej niż gadżet — fizyczna manifestacja Twojej historii w Minecraft.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border bg-background p-8"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <pillar.icon className="size-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
