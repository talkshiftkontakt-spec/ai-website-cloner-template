"use client";

import { FormEvent, useState } from "react";
import { EnvelopeSimple, Phone, Clock } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="formularz-kontaktowy" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <SectionReveal>
          <div className="flex h-full flex-col justify-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#134340] md:text-4xl">
              Umów wizytę
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#3d4a47]">
              Jeśli nie wiesz, od czego zacząć – pomożemy dobrać odpowiedni krok. Zapraszamy do kontaktu.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-[#134340]">
              <li className="flex items-center gap-3">
                <EnvelopeSimple className="h-5 w-5 text-[#879d91]" weight="duotone" aria-hidden />
                <a href="mailto:gabinetpomorska@gmail.com" className="hover:text-[#879d91]">
                  gabinetpomorska@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#879d91]" weight="duotone" aria-hidden />
                <span>12 431 16 30 · 790 233 171</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-[#879d91]" weight="duotone" aria-hidden />
                <span>Rejestracja: pon.–pt., 15:00–20:00</span>
              </li>
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="rounded-2xl bg-[#134340] p-8 shadow-[0_24px_60px_rgba(19,67,64,0.18)] lg:p-10">
            {submitted ? (
              <p className="rounded-xl bg-white/10 p-5 text-white">
                Dziękujemy za wiadomość. Odpowiadamy tak szybko, jak to możliwe.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Formularz kontaktowy">
                <input
                  type="text"
                  name="name"
                  placeholder="Imię i nazwisko"
                  className="w-full rounded-xl border-0 bg-white px-4 py-3.5 text-[#212121] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#879d91]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  className="w-full rounded-xl border-0 bg-white px-4 py-3.5 text-[#212121] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#879d91]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numer telefonu"
                  className="w-full rounded-xl border-0 bg-white px-4 py-3.5 text-[#212121] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#879d91]"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Wiadomość"
                  className="w-full resize-y rounded-xl border-0 bg-white px-4 py-3.5 text-[#212121] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#879d91]"
                />
                <button
                  type="submit"
                  className="gp-btn w-full bg-white text-[#134340] hover:scale-[0.99] active:scale-[0.98]"
                >
                  Wyślij wiadomość
                </button>
              </form>
            )}
            <p className="mt-5 text-sm text-white/70">Odpowiadamy tak szybko, jak to możliwe.</p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
