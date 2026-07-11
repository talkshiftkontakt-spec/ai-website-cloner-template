import Image from "next/image";
import Link from "next/link";

import {
  appSection,
  betweenLessons,
  contact,
  diagnosis,
  faq,
  finalCta,
  forWhom,
  hero,
  howItWorks,
  method,
  offer,
  problem,
  site,
  speaking,
  testimonials,
  tests,
} from "@/lib/lingology-content";

import { FaqAccordion, LinearAccordion } from "./accordion";
import {
  LinearBody,
  LinearButton,
  LinearCard,
  LinearHeading,
  LinearPanel,
  LinearSection,
  LinearTag,
  PillarLabel,
} from "./ui";

export function HeroSection() {
  return (
    <section className="QI8oKG_container linear-hero-stagger" style={{ paddingTop: "calc(var(--header-height) + 48px)", paddingBottom: 64 }}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <LinearTag>{hero.tag}</LinearTag>
          <LinearHeading as="h1" className="QI8oKG_title mt-6">
            {hero.title}
            <span className="linear-gradient-text block">{hero.titleAccent}</span>
          </LinearHeading>
          <LinearBody className="QI8oKG_description mt-6">{hero.description}</LinearBody>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinearButton href="#contact" variant="invert">
              Umów konsultację
            </LinearButton>
            <LinearButton href="#lingology-learn" variant="ghost">
              Zobacz, jak działa nauka między lekcjami
            </LinearButton>
          </div>
          <p className="mt-6 text-sm text-[var(--ll-text-tertiary)]">{hero.trust}</p>
        </div>

        <LinearPanel float className="relative aspect-square max-w-[560px] justify-self-center lg:justify-self-end">
          <Image
            src="/lingology/img/photo-hero-560.webp"
            alt="Kuba Smolczewski, lekcje angielskiego online dla dorosłych"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 560px"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </LinearPanel>
      </div>

      <div className="border-t border-[var(--color-border-translucent)] pt-10">
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--ll-text-tertiary)]">
          <span className="text-[var(--ll-accent)]">★★★★★</span>
          <span>Opinie uczniów</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {hero.quotes.map((q) => (
            <LinearCard key={q.author} className="p-5">
              <p className="text-[15px] leading-relaxed text-[var(--ll-text-secondary)]">„{q.text}”</p>
              <p className="mt-4 text-sm font-medium text-[var(--ll-text-tertiary)]">{q.author}</p>
            </LinearCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <LinearSection id="problem" className="border-t border-white/5 bg-[var(--ll-bg-secondary)]/40">
      <div className="mx-auto max-w-3xl text-center">
        <LinearHeading>{problem.title}</LinearHeading>
        <LinearBody className="mx-auto mt-6">{problem.description}</LinearBody>
      </div>
      <ul className="mx-auto mt-12 grid max-w-3xl gap-3">
        {problem.items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 text-[15px] text-[var(--ll-text-secondary)]"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <LinearButton href="https://www.lingology.pl/test-bariery-jezykowej" variant="outline" external>
          Sprawdź, co blokuje Twoje mówienie
        </LinearButton>
      </div>
    </LinearSection>
  );
}

export function SpeakingSection() {
  return (
    <LinearSection id="speaking">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <PillarLabel num="1.0" label="Mówienie" />
          <LinearTag>{speaking.tag}</LinearTag>
          <LinearHeading className="mt-4">{speaking.title}</LinearHeading>
          <LinearBody className="mt-6">{speaking.description}</LinearBody>
          <LinearButton href="#contact" variant="invert" className="mt-8">
            Umów konsultację
          </LinearButton>
        </div>
        <div>
          <LinearPanel className="relative mb-6 aspect-[7/5]">
            <Image
              src="/lingology/img/marketing/travel-airport.webp"
              alt="Angielski w podróży — rozmowa na lotnisku"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </LinearPanel>
          <ul className="grid gap-2 sm:grid-cols-2">
            {speaking.items.map((item) => (
              <li key={item} className="rounded-lg border border-white/8 px-4 py-3 text-sm text-[var(--ll-text-secondary)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LinearSection>
  );
}

export function BetweenLessonsSection() {
  return (
    <LinearSection id="between-lessons" className="border-t border-white/5">
      <div className="text-center">
        <PillarLabel num="2.0" label="Między lekcjami" />
        <LinearHeading>{betweenLessons.title}</LinearHeading>
        <LinearBody className="mx-auto mt-6">{betweenLessons.description}</LinearBody>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {betweenLessons.cards.map((card, i) => (
          <LinearCard key={card.title} className={i === 4 ? "md:col-span-2 lg:col-span-1" : undefined}>
            <h3 className="text-lg font-medium text-[var(--ll-text-primary)]">{card.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ll-text-secondary)]">{card.body}</p>
          </LinearCard>
        ))}
      </div>
      <div className="mt-10 text-center">
        <LinearButton href="#lingology-learn" variant="primary">
          Zobacz, jak wygląda nauka między lekcjami
        </LinearButton>
      </div>
    </LinearSection>
  );
}

export function OfferSection() {
  return (
    <LinearSection id="offer">
      <div className="text-center">
        <LinearTag>{offer.tag}</LinearTag>
        <LinearHeading className="mt-4">{offer.title}</LinearHeading>
        <p className="mt-4 text-lg text-[var(--ll-accent)]">{offer.subtitle}</p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {offer.plans.map((plan) => (
          <LinearCard key={plan.title} featured={plan.featured} className="h-full">
            {"badge" in plan && plan.badge ? (
              <span className="mb-3 inline-flex rounded-full bg-[var(--ll-accent)]/20 px-3 py-1 text-xs font-medium text-[var(--ll-accent)]">
                {plan.badge}
              </span>
            ) : null}
            <span className="text-xs uppercase tracking-wider text-[var(--ll-text-tertiary)]">{plan.tag}</span>
            <h3 className="mt-2 text-xl font-semibold text-[var(--ll-text-primary)]">{plan.title}</h3>
            <div className="mt-4">
              <span className="text-3xl font-semibold tracking-tight text-[var(--ll-text-primary)]">{plan.price}</span>
              <span className="ml-2 text-sm text-[var(--ll-text-tertiary)]">{plan.note}</span>
            </div>
            <p className="mt-4 text-[15px] text-[var(--ll-text-secondary)]">{plan.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--ll-text-tertiary)]">
              {plan.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-[var(--ll-accent)]">→</span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[var(--ll-text-tertiary)]">
              <strong className="text-[var(--ll-text-secondary)]">Dla kogo:</strong> {plan.audience}
            </p>
            <div className="mt-6">
              <LinearButton href="#contact" variant={plan.featured ? "invert" : "outline"}>
                {plan.featured ? "Umów konsultację" : "Zapytaj o szczegóły"}
              </LinearButton>
            </div>
          </LinearCard>
        ))}
      </div>
    </LinearSection>
  );
}

export function AppSection() {
  return (
    <LinearSection id="lingology-learn" className="border-t border-white/5">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <PillarLabel num="3.0" label="LingoLogy App" />
          <LinearTag>{appSection.tag}</LinearTag>
          <LinearHeading className="mt-4">{appSection.title}</LinearHeading>
          <LinearBody className="mt-6">{appSection.description}</LinearBody>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinearButton href={site.appUrl} variant="invert" external>
              Wejdź do aplikacji
            </LinearButton>
            <LinearButton href="#contact" variant="ghost">
              Umów konsultację
            </LinearButton>
          </div>
          <p className="mt-4 text-sm text-[var(--ll-text-tertiary)]">{appSection.note}</p>
        </div>

        <LinearPanel className="mx-auto w-full max-w-[320px] p-3">
          <div className="mb-2 flex items-center gap-1.5 px-2">
            <span className="size-2 rounded-full bg-red-500/80" />
            <span className="size-2 rounded-full bg-yellow-500/80" />
            <span className="size-2 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-[var(--ll-text-tertiary)]">lingology.app</span>
          </div>
          <div className="relative aspect-[390/844] overflow-hidden rounded-xl border border-white/10">
            <Image
              src="/lingology/img/app/dzisiejsze-powtorki.webp"
              alt="Ekran Dzisiejsze powtórki w LingoLogy App"
              fill
              className="object-cover object-top"
              sizes="320px"
            />
          </div>
        </LinearPanel>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {appSection.features.map((f) => (
          <LinearCard key={f.title} className="p-5">
            <h3 className="font-medium text-[var(--ll-text-primary)]">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ll-text-secondary)]">{f.desc}</p>
          </LinearCard>
        ))}
      </div>
    </LinearSection>
  );
}

export function DiagnosisSection() {
  return (
    <LinearSection id="diagnosis" className="bg-[var(--ll-bg-secondary)]/30">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <PillarLabel num="4.0" label="Diagnoza" />
          <LinearHeading>{diagnosis.title}</LinearHeading>
          <LinearBody className="mt-6">{diagnosis.description}</LinearBody>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinearButton href="https://www.lingology.pl/test-bariery-jezykowej" variant="invert" external>
              Zrób test bariery językowej
            </LinearButton>
            <LinearButton href="#contact" variant="ghost">
              Umów konsultację i omów wynik
            </LinearButton>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {diagnosis.blockers.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--ll-text-secondary)]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </LinearSection>
  );
}

export function HowItWorksSection() {
  return (
    <LinearSection id="how-it-works">
      <div className="text-center">
        <LinearHeading>{howItWorks.title}</LinearHeading>
        <LinearBody className="mx-auto mt-6">{howItWorks.description}</LinearBody>
      </div>
      <ol className="mx-auto mt-12 max-w-2xl space-y-0">
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="relative border-l border-white/10 py-6 pl-8">
            <span className="absolute -left-3 top-7 flex size-6 items-center justify-center rounded-full bg-[var(--ll-brand)] text-xs font-medium text-white">
              {i + 1}
            </span>
            <h3 className="text-lg font-medium text-[var(--ll-text-primary)]">{step.title}</h3>
            <p className="mt-2 text-[15px] text-[var(--ll-text-secondary)]">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 text-center">
        <LinearButton href="#contact" variant="invert">
          Umów konsultację
        </LinearButton>
      </div>
    </LinearSection>
  );
}

export function ForWhomSection() {
  return (
    <LinearSection id="for-whom" className="border-t border-white/5">
      <LinearHeading className="text-center">{forWhom.title}</LinearHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <LinearCard>
          <h3 className="flex items-center gap-2 text-lg font-medium text-[var(--ll-text-primary)]">
            <span className="text-[var(--ll-accent)]">✓</span> LingoLogy jest dla Ciebie, jeśli:
          </h3>
          <ul className="mt-4 space-y-3 text-[15px] text-[var(--ll-text-secondary)]">
            {forWhom.yes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--ll-accent)]">→</span>
                {item}
              </li>
            ))}
          </ul>
        </LinearCard>
        <LinearCard>
          <h3 className="flex items-center gap-2 text-lg font-medium text-[var(--ll-text-primary)]">
            <span className="text-[var(--ll-text-tertiary)]">✗</span> LingoLogy nie jest dla Ciebie, jeśli:
          </h3>
          <ul className="mt-4 space-y-3 text-[15px] text-[var(--ll-text-secondary)]">
            {forWhom.no.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--ll-text-quaternary)]">→</span>
                {item}
              </li>
            ))}
          </ul>
        </LinearCard>
      </div>
    </LinearSection>
  );
}

export function MethodSection() {
  return (
    <LinearSection id="about">
      <div className="mx-auto max-w-3xl text-center">
        <LinearHeading>{method.title}</LinearHeading>
        <LinearBody className="mx-auto mt-6">{method.description}</LinearBody>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <LinearAccordion
          items={method.pillars.map((p) => ({ num: p.num, title: p.title, body: p.body }))}
        />
      </div>
    </LinearSection>
  );
}

export function TestsSection() {
  return (
    <LinearSection id="tests">
      <div className="text-center">
        <LinearHeading>{tests.title}</LinearHeading>
        <LinearBody className="mx-auto mt-6">{tests.description}</LinearBody>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {tests.items.map((test) => (
          <LinearCard key={test.title} featured={test.featured}>
            <span className="text-xs uppercase tracking-wider text-[var(--ll-text-tertiary)]">{test.tag}</span>
            <h3 className="mt-2 text-xl font-semibold text-[var(--ll-text-primary)]">{test.title}</h3>
            <p className="mt-4 flex-1 text-[15px] text-[var(--ll-text-secondary)]">{test.body}</p>
            <LinearButton href={test.href} variant={test.featured ? "invert" : "outline"} external className="mt-6">
              {test.featured ? "Sprawdź swoją barierę" : "Zrób test gramatyczny"}
            </LinearButton>
          </LinearCard>
        ))}
      </div>
    </LinearSection>
  );
}

export function TestimonialsSection() {
  return (
    <LinearSection id="testimonials" className="border-t border-white/5 bg-[var(--ll-bg-secondary)]/20">
      <LinearHeading>{testimonials.title}</LinearHeading>
      <LinearBody className="mt-4">{testimonials.description}</LinearBody>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((t) => (
          <LinearCard key={t.author} className="p-5">
            <span className="text-xs text-[var(--ll-text-tertiary)]">{t.source}</span>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ll-text-secondary)]">„{t.quote}”</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-[var(--ll-brand)]/30 text-sm font-medium text-[var(--ll-accent)]">
                {t.author[0]}
              </span>
              <span className="text-sm font-medium text-[var(--ll-text-primary)]">{t.author}</span>
            </div>
          </LinearCard>
        ))}
      </div>
    </LinearSection>
  );
}

export function FaqSection() {
  return (
    <LinearSection id="faq">
      <div className="text-center">
        <LinearHeading>{faq.title}</LinearHeading>
        <LinearBody className="mx-auto mt-6">{faq.description}</LinearBody>
      </div>
      <div className="mt-12">
        <FaqAccordion groups={faq.groups.map((g) => ({ title: g.title, items: [...g.items] }))} />
      </div>
    </LinearSection>
  );
}

export function FinalCtaSection() {
  return (
    <LinearSection id="final-cta" className="py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[var(--ll-brand)]/20 to-[var(--ll-bg-panel)] px-8 py-16 text-center md:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(113,112,255,0.15),transparent_60%)]" />
        <LinearHeading className="relative">{finalCta.title}</LinearHeading>
        <LinearBody className="relative mx-auto mt-6">{finalCta.description}</LinearBody>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <LinearButton href="#contact" variant="invert">
            Umów konsultację
          </LinearButton>
          <LinearButton href="https://www.lingology.pl/test-bariery-jezykowej" variant="ghost" external>
            Zrób test bariery
          </LinearButton>
        </div>
        <p className="relative mt-4 text-sm text-[var(--ll-text-tertiary)]">{finalCta.note}</p>
      </div>
    </LinearSection>
  );
}

export function ContactSection() {
  return (
    <LinearSection id="contact" className="border-t border-white/5 pb-32 md:pb-20">
      <LinearHeading>{contact.title}</LinearHeading>
      <LinearBody className="mt-4">{contact.description}</LinearBody>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <form
          action="https://www.lingology.pl/api/mail"
          method="POST"
          className="space-y-5 rounded-2xl border border-[var(--ll-border)] bg-[var(--ll-bg-secondary)] p-6 md:p-8"
        >
          <Field label="Imię i nazwisko" name="imie_nazwisko" required />
          <Field label="Numer telefonu" name="telefon" type="tel" hint="Opcjonalnie" />
          <Field label="Adres e-mail" name="email" type="email" required />
          <div>
            <label htmlFor="cel_nauki" className="mb-2 block text-sm text-[var(--ll-text-secondary)]">
              Powód kontaktu / cel nauki *
            </label>
            <select
              id="cel_nauki"
              name="cel_nauki"
              required
              className="w-full rounded-xl border border-white/10 bg-[var(--ll-bg-primary)] px-4 py-3 text-[15px] text-[var(--ll-text-primary)] outline-none focus:border-[var(--ll-accent)]"
            >
              <option value="">Wybierz cel</option>
              {contact.reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="wiadomosc" className="mb-2 block text-sm text-[var(--ll-text-secondary)]">
              Napisz więcej (opcjonalnie)
            </label>
            <textarea
              id="wiadomosc"
              name="wiadomosc"
              rows={3}
              placeholder="Opisz krótko swoją sytuację…"
              className="w-full rounded-xl border border-white/10 bg-[var(--ll-bg-primary)] px-4 py-3 text-[15px] text-[var(--ll-text-primary)] outline-none focus:border-[var(--ll-accent)]"
            />
          </div>
          <div>
            <label htmlFor="godziny_kontaktu" className="mb-2 block text-sm text-[var(--ll-text-secondary)]">
              Preferowane godziny kontaktu
            </label>
            <select
              id="godziny_kontaktu"
              name="godziny_kontaktu"
              className="w-full rounded-xl border border-white/10 bg-[var(--ll-bg-primary)] px-4 py-3 text-[15px] text-[var(--ll-text-primary)] outline-none focus:border-[var(--ll-accent)]"
            >
              <option value="">Dowolna pora</option>
              {contact.hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <label className="flex gap-3 text-sm text-[var(--ll-text-secondary)]">
            <input type="checkbox" name="zgoda_rodo" required className="mt-1" />
            <span>
              Wyrażam zgodę na przetwarzanie danych zgodnie z{" "}
              <Link href="https://www.lingology.pl/polityka-prywatnosci" className="text-[var(--ll-accent)] hover:underline">
                polityką prywatności
              </Link>
              . *
            </span>
          </label>
          <label className="flex gap-3 text-sm text-[var(--ll-text-secondary)]">
            <input type="checkbox" name="zgoda_marketing" className="mt-1" />
            <span>Chcę otrzymywać informacje o ofercie i materiałach LingoLogy.</span>
          </label>
          <button
            type="submit"
            className="S36ykG_root S36ykG_variant S36ykG_variant-invert S36ykG_size-default w-full sm:w-auto"
          >
            Umów konsultację
          </button>
        </form>

        <div>
          <h3 className="text-lg font-medium text-[var(--ll-text-primary)]">Możesz też napisać bezpośrednio</h3>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-[var(--ll-accent)] hover:underline">
            {site.email}
          </a>
          <LinearCard className="mt-8">
            <p className="text-[15px] italic leading-relaxed text-[var(--ll-text-secondary)]">{contact.quote}</p>
            <p className="mt-4 text-sm text-[var(--ll-text-tertiary)]">Kuba, LingoLogy</p>
          </LinearCard>
        </div>
      </div>
    </LinearSection>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-[var(--ll-text-secondary)]">
        {label} {required ? "*" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-[var(--ll-bg-primary)] px-4 py-3 text-[15px] text-[var(--ll-text-primary)] outline-none focus:border-[var(--ll-accent)]"
      />
      {hint ? <p className="mt-1 text-xs text-[var(--ll-text-tertiary)]">{hint}</p> : null}
    </div>
  );
}
