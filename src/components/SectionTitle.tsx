type SectionTitleProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function SectionTitle({ title, subtitle, eyebrow }: SectionTitleProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium tracking-wide text-ray-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="ray-section-title">{title}</h2>
      {subtitle ? (
        <p className="ray-section-subtitle mt-2">{subtitle}</p>
      ) : null}
    </div>
  );
}
