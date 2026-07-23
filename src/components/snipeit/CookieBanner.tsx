"use client";

import { Cookie } from "lucide-react";
import { useState } from "react";

const STORAGE_KEY = "snipeit-cookie-consent";

function readInitialVisible(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(readInitialVisible);

  function dismiss(value: string) {
    try {
      sessionStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookies"
      aria-describedby="cookie-banner-desc"
      className="fixed right-4 bottom-4 left-4 z-[100] rounded-[18px] border border-[#2a3938] bg-[#1c2625] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:right-auto sm:bottom-6 sm:left-6 sm:w-[480px] sm:max-w-[calc(100vw-2rem)] sm:rounded-[22px] sm:p-7"
      style={{ fontFamily: "var(--font-satoshi)" }}
    >
      <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3.5 sm:gap-3">
        <Cookie
          className="h-[20px] w-[20px] text-[#bae3df] sm:h-[24px] sm:w-[24px]"
          strokeWidth={1.7}
          aria-hidden
        />
        <h2 className="text-[17px] font-bold tracking-[-0.4px] text-[#f0f0f0] sm:text-[21px]">
          Szanujemy Twoją prywatność
        </h2>
      </div>
      <p
        id="cookie-banner-desc"
        className="mb-3 text-[13px] leading-[19px] text-[#9ebdbb] sm:mb-4 sm:text-[15px] sm:leading-[23px]"
      >
        Używamy plików cookies oraz podobnych technologii w celu zapewnienia
        prawidłowego działania strony, analizowania ruchu, personalizacji treści
        oraz prowadzenia działań marketingowych. Możesz zaakceptować wszystkie
        cookies, odrzucić wszystkie niekonieczne lub samodzielnie wybrać swoje
        preferencje.
      </p>
      <div className="mb-3 sm:mb-4">
        <p className="text-[12px] leading-[18px] text-[#6d8886]">
          Więcej w{" "}
          <a
            href="/legal/polityka-prywatnosci"
            className="underline transition-colors hover:text-[#bae3df]"
          >
            Polityce Prywatności
          </a>{" "}
          i{" "}
          <a
            href="/legal/pliki-cookies"
            className="underline transition-colors hover:text-[#bae3df]"
          >
            Polityce Cookies
          </a>
          .
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:gap-2.5">
        <div className="flex gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="h-[42px] flex-1 rounded-[12px] bg-[#bae3df] text-[14px] font-bold text-[#1c2625] transition hover:brightness-95 sm:h-[48px] sm:text-[15px]"
          >
            Akceptuj wszystkie
          </button>
          <button
            type="button"
            onClick={() => dismiss("rejected")}
            className="h-[42px] flex-1 rounded-[12px] border border-[#3a4a48] bg-[#253130] text-[14px] font-bold text-[#f0f0f0] transition-colors hover:border-[#bae3df]/50 sm:h-[48px] sm:text-[15px]"
          >
            Odrzuć wszystkie
          </button>
        </div>
        <button
          type="button"
          onClick={() => dismiss("custom")}
          className="h-[40px] w-full rounded-[12px] border border-[#3a4a48] bg-transparent text-[14px] font-medium text-[#9ebdbb] transition-colors hover:border-[#bae3df]/40 hover:text-[#f0f0f0] sm:h-[46px] sm:text-[15px]"
        >
          Dostosuj ustawienia
        </button>
      </div>
    </div>
  );
}
