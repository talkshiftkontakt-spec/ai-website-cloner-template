"use client";

import { useSyncExternalStore, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "headcraft-announcement-dismissed";

function subscribe() {
  return () => {};
}

function getDismissed(): boolean {
  return localStorage.getItem(STORAGE_KEY) === "1";
}

function getServerDismissed(): boolean {
  return false;
}

export function AnnouncementBar() {
  const storedDismissed = useSyncExternalStore(
    subscribe,
    getDismissed,
    getServerDismissed,
  );
  const [dismissed, setDismissed] = useState(storedDismissed);

  if (dismissed || storedDismissed) return null;

  return (
    <div className="relative border-b-2 border-grass-dark bg-grass px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
      <p className="font-display">
        <span className="pixel-label mr-2 text-primary-foreground/80">Nowość</span>
        Personalizowana główka ze skina — darmowa wysyłka od 300 zł
      </p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "1");
          setDismissed(true);
        }}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 transition-colors hover:bg-primary-foreground/10"
        aria-label="Zamknij ogłoszenie"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
