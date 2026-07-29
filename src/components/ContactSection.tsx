"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useReveal } from "@/hooks/useReveal";

export function ContactSection() {
  const { ref, className } = useReveal<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="kontakt"
      ref={ref}
      className={`bg-[#F7F9F5] px-4 pb-[100px] pt-8 md:px-8 ${className}`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-[50px] md:grid-cols-2 md:gap-[50px]">
        <div>
          <form
            onSubmit={onSubmit}
            className="mx-auto w-full max-w-xl pt-[50px]"
            noValidate
          >
            <h2 className="mb-8 text-center font-sans text-[40px] font-medium text-[#424242] max-[1366px]:text-[35px]">
              Wejdźmy w kontakt!
            </h2>

            {submitted ? (
              <p className="rounded-xl border border-[#83AC86] bg-white p-6 text-center font-sans text-[#424242]">
                Dziękuję za wiadomość! Odezwię się tak szybko, jak to możliwe.
              </p>
            ) : (
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-1 block font-sans text-[15px] font-medium text-[#424242]">
                    Imię <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    name="name"
                    className="h-[40px] w-full border border-[#42424266] bg-transparent px-3 font-sans text-[#424242] outline-none focus:border-[#83AC86]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block font-sans text-[15px] font-medium text-[#424242]">
                    Adres e-mail <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="h-[40px] w-full border border-[#42424266] bg-transparent px-3 font-sans text-[#424242] outline-none focus:border-[#83AC86]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block font-sans text-[15px] font-medium text-[#424242]">
                    Telefon
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    className="h-[40px] w-full border border-[#42424266] bg-transparent px-3 font-sans text-[#424242] outline-none focus:border-[#83AC86]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block font-sans text-[15px] font-medium text-[#424242]">
                    Wiadomość <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="w-full resize-y border border-[#42424266] bg-transparent px-3 py-2 font-sans text-[#424242] outline-none focus:border-[#83AC86]"
                  />
                </label>

                <label className="flex items-start gap-3 font-sans text-[14px] text-[#424242]">
                  <input
                    required
                    type="checkbox"
                    name="rodo"
                    className="mt-1 accent-[#83AC86]"
                  />
                  <span>
                    Zgadzam się na przetwarzanie danych osobowych, które będą
                    użyte do kontaktu jako odpowiedź na przesłane zapytanie.
                    Podanie danych jest dobrowolne, ale niezbędne do udzielenia
                    odpowiedzi na zapytanie.
                    <span className="text-red-500">*</span>
                  </span>
                </label>

                <div className="pt-[30px] text-center">
                  <button
                    type="submit"
                    className="inline-block w-[200px] rounded-[20px] bg-[#83AC86] px-0 py-3 font-sans font-medium text-white transition hover:bg-[#6f9673] max-md:w-[250px]"
                  >
                    Wyślij
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl md:aspect-square">
          <Image
            src="/images/tlo-2.png"
            alt="Korepetycje online"
            fill
            className="object-cover"
            sizes="(max-width:768px) 90vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#83AC86] px-4 py-3 text-center text-white md:px-8">
      <p className="font-sans text-[14px] font-normal max-[1366px]:text-[12px]">
        Korepetycje-pro.pl © {new Date().getFullYear()}. Wszelkie prawa
        zastrzeżone.
      </p>
      <p className="mt-1 font-sans text-[14px] font-normal max-[1366px]:text-[12px]">
        Projekt i wykonanie strony:{" "}
        <a
          href="http://adamprokopczuk.pl"
          className="text-white underline-offset-2 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          adamprokopczuk.pl
        </a>
      </p>
    </footer>
  );
}
