"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "tutoreo-cookies-consent";

function subscribe() {
  return () => undefined;
}

function getConsentSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerConsentSnapshot() {
  return "ssr";
}

export function CookiesBanner() {
  const stored = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const [dismissed, setDismissed] = useState(false);
  const visible = !dismissed && stored === null;

  function accept(value: "necessary" | "all") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[1100] mx-auto flex max-w-[720px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-[var(--PopOffShadow)] min-[1000px]:inset-x-auto min-[1000px]:right-6 min-[1000px]:bottom-6 min-[1000px]:left-auto">
      <p className="text-[18px] font-normal leading-[22px] text-black">
        Używamy niezbędnych plików cookie do działania strony. Za Twoją zgodą
        wykorzystujemy także pliki cookie do analizy ruchu. Więcej informacji
        znajdziesz w{" "}
        <Link
          href="/privacypolicy"
          className="font-bold text-[var(--AccentColor)] underline"
          target="_blank"
        >
          polityce prywatności
        </Link>
        .
      </p>
      <div
        id="CookiesBannerButtons"
        className="flex flex-col gap-3 min-[500px]:flex-row"
      >
        <button
          id="AcceptOnlyNecessary"
          type="button"
          className="tutoreo-standard-btn tutoreo-standard-btn--white outline outline-2 outline-[var(--AccentColor)] !text-[var(--AccentColor)] flex-1 !px-4 !text-[18px]"
          onClick={() => accept("necessary")}
        >
          Tylko niezbędne
        </button>
        <button
          id="AcceptAll"
          type="button"
          className="tutoreo-standard-btn tutoreo-standard-btn--accent flex-1 !px-4 !text-[18px]"
          onClick={() => accept("all")}
        >
          Zaakceptuj wszystkie
        </button>
      </div>
    </div>
  );
}
