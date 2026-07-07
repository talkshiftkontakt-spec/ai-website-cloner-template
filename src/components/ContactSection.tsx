"use client";

import { FormEvent, useState } from "react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="formularz-kontaktowy" className="bg-[#f4efe6] py-12 lg:py-20">
      <div className="mx-auto grid max-w-[1325px] gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="rounded-lg bg-[#5a6b62] p-8 text-white lg:p-12">
          <h2 className="mb-4 font-[family-name:var(--font-heading)] text-[25.5px] font-bold text-white">
            Umów wizytę
          </h2>
          <p className="mb-8 text-[17px] leading-relaxed text-white/90">
            Jeśli nie wiesz, od czego zacząć – pomożemy dobrać odpowiedni krok. Zapraszamy do kontaktu.
          </p>

          {submitted ? (
            <p className="rounded bg-white/10 p-4 text-white">
              Dziękujemy za wiadomość. Odpowiadamy tak szybko, jak to możliwe.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Formularz kontaktowy">
              <input
                type="text"
                name="name"
                placeholder="Imię i nazwisko"
                className="w-full rounded border-0 bg-white px-4 py-3 text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full rounded border-0 bg-white px-4 py-3 text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Numer telefonu"
                className="w-full rounded border-0 bg-white px-4 py-3 text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Wiadomość"
                className="w-full resize-y rounded border-0 bg-white px-4 py-3 text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="gp-btn w-full bg-white text-[#134340] hover:bg-white/90">
                Wyślij wiadomość
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-white/70">Odpowiadamy tak szybko, jak to możliwe.</p>
        </div>
        <div className="hidden lg:block" aria-hidden />
      </div>
    </section>
  );
}
