"use client";

import { type FormEvent, useState } from "react";
import { Reveal } from "@/components/snipeit/Reveal";
import { cn } from "@/lib/utils";

const inputClassName =
  "font-satoshi w-full rounded-[12px] border border-[#303030] bg-[#242d2d] px-6 py-5 text-[17px] font-medium text-white placeholder-[#759390] transition-colors focus:border-[#49768d] focus:outline-none";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0 &&
    privacy;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="px-6 py-20">
      <div className="mx-auto max-w-[1480px]">
        <Reveal className="mx-auto mb-10 max-w-[620px] scroll-mt-24 text-center md:mb-14">
          <p className="font-sf-expanded-medium mb-2 text-[12px] leading-[1.4] tracking-[0.22em] text-[#49768d] uppercase md:mb-3 md:text-[15px]">
            DODATKOWE PYTANIA?
          </p>
          <h2 className="text-gradient-section text-[28px] leading-[36px] tracking-tight md:text-[48px] md:leading-[50px]">
            <span className="font-sf-expanded-regular">Skontaktuj się </span>
            <span className="font-sf-expanded-bold">z nami</span>
          </h2>
        </Reveal>

        {submitted ? (
          <Reveal className="mx-auto max-w-[620px] py-16 text-center">
            <p className="font-satoshi text-[22px] font-bold text-[#1c2625]">
              Dziękujemy za wiadomość!
            </p>
            <p className="font-satoshi mt-3 text-[17px] text-[#747979]">
              Odezwiemy się najszybciej jak to możliwe.
            </p>
          </Reveal>
        ) : (
          <Reveal>
            <form
              className="mx-auto max-w-[1522px] space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Imię i nazwisko"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Adres E-Mail"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Numer telefonu (opcjonalnie)"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Nazwa firmy (opcjonalnie)"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Treść wiadomości"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputClassName, "resize-none")}
                />
              </div>

              <div
                className="flex cursor-pointer items-start gap-3 py-4"
                onClick={() => setPrivacy((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPrivacy((v) => !v);
                  }
                }}
                role="checkbox"
                aria-checked={privacy}
                tabIndex={0}
              >
                <button
                  type="button"
                  aria-pressed={privacy}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrivacy((v) => !v);
                  }}
                  className={cn(
                    "mt-0.5 h-[26px] w-[26px] shrink-0 rounded-[5px] border-2 transition-colors",
                    privacy
                      ? "border-[#1c2625] bg-[#1c2625]"
                      : "border-[#1c2625] bg-transparent"
                  )}
                >
                  {privacy ? (
                    <svg
                      viewBox="0 0 16 16"
                      className="mx-auto h-4 w-4 text-white"
                      aria-hidden
                    >
                      <path
                        d="M3.5 8.5 6.5 11.5 12.5 4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>
                <span className="font-satoshi text-[17px] leading-[25px] text-[#1c2625]">
                  Rozumiem, że Snipeit będzie bezpiecznie przechowywać moje dane
                  zgodnie ze swoją Polityką Prywatności.
                </span>
              </div>

              <div
                className="h-[65px] w-full min-w-[300px]"
                aria-hidden
              />

              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-metal-dark font-satoshi h-[56px] w-full rounded-full border border-[#a3c8c5] text-[18px] font-bold tracking-[-0.36px] text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] transition-[filter] hover:brightness-110 disabled:opacity-60"
              >
                Wyślij wiadomość
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
