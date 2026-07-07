"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeadPreview3DCanvas = dynamic(
  () =>
    import("@/components/configurator/HeadPreview3DCanvas").then(
      (m) => m.HeadPreview3DCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-surface">
        <p className="text-sm text-muted-foreground">Ładowanie podglądu 3D…</p>
      </div>
    ),
  },
);

interface HeadPreview3DProps {
  textureUrl: string | null;
  className?: string;
}

export function HeadPreview3D({ textureUrl, className }: HeadPreview3DProps) {
  if (!textureUrl) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border bg-surface">
        <p className="text-sm text-muted-foreground text-center px-4">
          Wgraj skin lub wpisz nick, aby zobaczyć podgląd 3D
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-surface">
          <p className="text-sm text-muted-foreground">Ładowanie…</p>
        </div>
      }
    >
      <HeadPreview3DCanvas textureUrl={textureUrl} className={className} />
    </Suspense>
  );
}
