interface PageHeroProps {
  title: string;
  description?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b border-[#134340]/10 bg-[#f4f7f5] px-6 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#134340] md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#3d4a47]">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
