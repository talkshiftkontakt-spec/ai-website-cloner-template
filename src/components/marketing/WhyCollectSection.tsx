import Image from "next/image";

const pillars = [
  {
    image: "/images/products/twojskinek/product-closeup.png",
    title: "Druk premium",
    description:
      "Profesjonalny druk na płótnie z żywymi kolorami — każdy piksel główki wyraźny i nasycony.",
    isPhoto: true,
  },
  {
    image: "/images/heads/dream.png",
    title: "Twój skin",
    description:
      "Wgraj PNG skina — drukujemy twarz główki na płaskim kwadratowym obrazie, dokładnie jak na twojskinek.pl.",
    isPhoto: false,
  },
  {
    image: "/images/products/twojskinek/product-in-living-room.png",
    title: "Na ścianę",
    description:
      "Płaski canvas do powieszenia w pokoju — nad biurkiem, łóżkiem lub w salonie gamingowym.",
    isPhoto: true,
  },
];

export function WhyCollectSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url(/images/hero/minecraft-caves.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="pixel-label text-grass">Dlaczego warto?</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl">
            Obraz ze skina — nie 3D kostka
          </h2>
          <p className="mt-4 text-muted-foreground">
            Płaski, kwadratowy canvas z główką Twojego avatara. Tak powstają
            nasze produkty — druk na płótnie, gotowe do powieszenia.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="mc-panel overflow-hidden transition-colors hover:border-grass/50"
            >
              <div className="relative aspect-[4/3] bg-surface-elevated">
                {pillar.isPhoto ? (
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="relative size-24">
                      <Image
                        src={pillar.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
