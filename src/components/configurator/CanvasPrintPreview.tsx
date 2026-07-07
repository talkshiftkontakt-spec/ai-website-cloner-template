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
        ctx.drawImage(img, 0, 0, size, size);
      }

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = source;
  });
}

function CanvasPanel({
  faceUrl,
  variant,
}: {
  faceUrl: string;
  variant: "front" | "iso";
}) {
  if (variant === "front") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className="relative w-full max-w-[200px] bg-white p-6"
          style={{ aspectRatio: "1 / 1" }}
        >
          <div className="relative h-full w-full shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
            <div className="absolute inset-0 border border-neutral-200 bg-[#f7f4ee]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={faceUrl}
                alt="Widok z przodu — płaski obraz na płótnie"
                className="h-full w-full object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Widok z przodu</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full max-w-[200px] items-center justify-center bg-white p-6">
        <div
          className="relative h-36 w-36"
          style={{
            transform: "rotateX(52deg) rotateZ(-38deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 border border-neutral-300 bg-[#f7f4ee]"
            style={{ transform: "translateZ(12px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faceUrl}
              alt="Widok 3/4 — cienki canvas na podramie"
              className="h-full w-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div
            className="absolute bottom-0 left-0 h-3 w-full bg-[#d4cbb8]"
            style={{ transform: "rotateX(-90deg) translateZ(0)" }}
            aria-hidden
          />
          <div
            className="absolute top-0 right-0 h-full w-3 bg-[#e0d6c4]"
            style={{ transform: "rotateY(90deg) translateZ(144px)" }}
            aria-hidden
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Płaski panel — nie kostka 3D</p>
    </div>
  );
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
    <div className={cn("space-y-4", className)}>
      <p className="pixel-label text-grass text-center">
        Podgląd obrazu · {sizeLabel}
      </p>

      {faceUrl && !error ? (
        <div className="grid gap-4 rounded-xl border border-border bg-white/95 p-4 sm:grid-cols-2">
          <CanvasPanel faceUrl={faceUrl} variant="front" />
          <CanvasPanel faceUrl={faceUrl} variant="iso" />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-surface text-sm text-muted-foreground">
          {error ? "Nie udało się wygenerować podglądu" : "Ładowanie podglądu…"}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground text-pretty">
        Z główki skina powstaje <strong>płaski kwadratowy obraz</strong> na
        płótnie — dokładnie jak na twojskinek.pl
      </p>
    </div>
  );
}
