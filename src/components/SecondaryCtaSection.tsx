import Link from "next/link";

export function SecondaryCtaSection() {
  return (
    <section
      id="SecondaryCTA"
      className="relative flex flex-col items-center rounded-b-[50px] bg-[var(--TonedBackground)] px-6 pb-12 pt-4 min-[1000px]:px-12"
    >
      <h1 className="text-center text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] text-black min-[1000px]:whitespace-nowrap min-[1000px]:leading-[64px]">
        Udzielaj korepetycji prościej
      </h1>
      <h1 className="text-center text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] text-black min-[1000px]:whitespace-nowrap min-[1000px]:leading-[64px]">
        niż kiedykolwiek
      </h1>
      <Link
        href="/login?register=1"
        className="tutoreo-standard-btn tutoreo-standard-btn--accent mt-8"
      >
        Dołącz za darmo
      </Link>
    </section>
  );
}
