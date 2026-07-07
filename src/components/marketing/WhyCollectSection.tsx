import Image from "next/image";

const pillars = [
  {
    image: "/images/heads/dream.png",
    title: "Twój skin",
    description:
      "Wgraj plik PNG — zobacz podgląd 3D i zamów główkę dokładnie z Twojego avatara Minecraft.",
  },
  {
    image: "/images/heads/techno.png",
    title: "Craft premium",
    description:
      "Żywica wysokiej jakości, ręczne wykończenie i opcjonalna podstawa z litego dębu.",
  },
  {
    image: "/images/heads/creeper.png",
    title: "Na półkę",
    description:
      "Zaprojektowane do ekspozycji na biurku, półce gamingowej lub w gablocie kolekcjonerskiej.",
  },
];

export function WhyCollectSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/images/hero/blocks-texture.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="pixel-label text-grass">Dlaczego HeadCraft</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl">
            Twoja historia w fizycznej formie
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nie kolejny gadżet z AliExpress — prawdziwa kolekcjonerska główka z
            Twojego świata Minecraft.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="mc-panel group p-6 transition-colors hover:border-grass/50 md:p-8"
            >
              <div className="relative mx-auto mb-5 size-20">
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-lg transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
