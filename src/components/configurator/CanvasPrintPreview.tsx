"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface CanvasPrintPreviewProps {
  textureUrl: string | null;
  sizeLabel?: string;
  className?: string;
}

async function toHeadFaceDataUrl(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 256;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas unavailable"));
        return;
      }

      ctx.imageSmoothingEnabled = false;

      // Full skin texture — crop head front (8,8,8,8 on 64×64 grid)
      if (img.width >= 64 && img.height >= 64) {
        const unit = img.width / 64;
        ctx.drawImage(
          img,
          8 * unit,
          8 * unit,
          8 * unit,
          8 * unit,
          0,
          0,
          size,
          size,
        );
      } else {
        // Already a head/avatar render
        ctx.drawImage(img, 0, 0, size, size);
      }

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = source;
  });
}

export function CanvasPrintPreview({
  textureUrl,
  sizeLabel = "30×30 cm",
  className,
}: CanvasPrintPreviewProps) {
  const [faceUrl, setFaceUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!textureUrl) return;

    let cancelled = false;
    void toHeadFaceDataUrl(textureUrl)
      .then((url) => {
        if (!cancelled) {
          setFaceUrl(url);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [textureUrl]);

  if (!textureUrl) {
    return (
      <div
        className={cn(
          "flex aspect-[4/5] items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6",
          className,
        )}
      >
        <p className="text-center text-sm text-muted-foreground text-pretty">
          Wgraj skin lub wpisz nick, aby zobaczyć podgląd obrazu na płótnie
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <p className="pixel-label text-grass text-center">Podgląd obrazu · {sizeLabel}</p>
      <div className="relative mx-auto flex max-w-xs justify-center py-6">
        {/* Flat canvas panel — jak na twojskinek.pl */}
        <div
          className="relative w-[min(100%,240px)] shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          style={{ aspectRatio: "1 / 1" }}
        >
          <div className="absolute -inset-1 bg-stone/40" aria-hidden />
          <div className="relative h-full w-full overflow-hidden border-4 border-[#e8e0d0] bg-[#f5f0e6]">
            {faceUrl && !error ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={faceUrl}
                alt="Podgląd twarzy główki na obrazie"
                className="h-full w-full object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Ładowanie podglądu…
              </div>
            )}
          </div>
          {/* Cienka krawędź „płótna” */}
          <div
            className="absolute -bottom-2 left-2 right-2 h-2 bg-black/25 blur-sm"
            aria-hidden
          />
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Płaski obraz na płótnie — twarz główki ze skina, gotowy do powieszenia
      </p>
    </div>
  );
}
