"use client";

import { useEffect, useRef } from "react";

/**
 * Recreates Raycast hero WebGL glow: diagonal red/pink light ribbons
 * with cyan tips, grain, bloom, and slow rotation (hero-marquee_rotate).
 */
export function HeroGlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const noise = document.createElement("canvas");
    const nctx = noise.getContext("2d");

    const resize = () => {
      const parent = canvas.parentElement;
      const cssW = parent?.clientWidth || 1200;
      const cssH = parent?.clientHeight || 940;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || 1200;
      const h = parent?.clientHeight || 940;
      const t = (now - start) / 1000;

      const rot = (t / 20) * Math.PI * 2;
      const scale = 1.2 + Math.sin(t * 0.35) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 4 + rot * 0.08);
      ctx.scale(scale, scale);

      const ribbons = [
        { x: -280, w: 70, alpha: 0.55 },
        { x: -140, w: 90, alpha: 0.85 },
        { x: 0, w: 110, alpha: 1 },
        { x: 150, w: 85, alpha: 0.75 },
        { x: 290, w: 60, alpha: 0.45 },
      ];

      const pulse = 0.85 + Math.sin(t * 0.8) * 0.15;

      for (const ribbon of ribbons) {
        const len = h * 1.6;
        const grd = ctx.createLinearGradient(
          ribbon.x,
          -len / 2,
          ribbon.x,
          len / 2,
        );
        grd.addColorStop(0, "rgba(86, 194, 255, 0)");
        grd.addColorStop(0.15, "rgba(86, 194, 255, 0.35)");
        grd.addColorStop(0.35, `rgba(255, 99, 99, ${0.55 * pulse})`);
        grd.addColorStop(0.5, `rgba(255, 180, 190, ${0.95 * pulse})`);
        grd.addColorStop(0.65, `rgba(255, 99, 99, ${0.55 * pulse})`);
        grd.addColorStop(0.85, "rgba(86, 194, 255, 0.3)");
        grd.addColorStop(1, "rgba(86, 194, 255, 0)");

        ctx.save();
        ctx.filter = "blur(28px)";
        ctx.globalAlpha = ribbon.alpha;
        ctx.fillStyle = grd;
        ctx.fillRect(ribbon.x - ribbon.w / 2, -len / 2, ribbon.w, len);
        ctx.restore();

        ctx.save();
        ctx.filter = "blur(10px)";
        ctx.globalAlpha = ribbon.alpha * 0.7;
        const core = ctx.createLinearGradient(
          ribbon.x,
          -len / 2,
          ribbon.x,
          len / 2,
        );
        core.addColorStop(0, "rgba(255,99,99,0)");
        core.addColorStop(0.4, "rgba(255,200,205,0.7)");
        core.addColorStop(0.5, "rgba(255,255,255,0.85)");
        core.addColorStop(0.6, "rgba(255,200,205,0.7)");
        core.addColorStop(1, "rgba(255,99,99,0)");
        ctx.fillStyle = core;
        ctx.fillRect(
          ribbon.x - ribbon.w * 0.22,
          -len / 2,
          ribbon.w * 0.44,
          len,
        );
        ctx.restore();
      }

      ctx.restore();

      const vig = ctx.createRadialGradient(
        w / 2,
        h / 2,
        40,
        w / 2,
        h / 2,
        w * 0.55,
      );
      vig.addColorStop(0, "rgba(7,8,10,0)");
      vig.addColorStop(0.65, "rgba(7,8,10,0.15)");
      vig.addColorStop(1, "rgba(7,8,10,0.92)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (nctx) {
        const nw = Math.max(1, Math.floor(w / 4));
        const nh = Math.max(1, Math.floor(h / 4));
        if (noise.width !== nw || noise.height !== nh) {
          noise.width = nw;
          noise.height = nh;
        }
        const id = nctx.createImageData(nw, nh);
        for (let i = 0; i < id.data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          id.data[i] = v;
          id.data[i + 1] = v;
          id.data[i + 2] = v;
          id.data[i + 3] = 40;
        }
        nctx.putImageData(id, 0, 0);
        ctx.save();
        ctx.globalAlpha = 0.07;
        ctx.globalCompositeOperation = "overlay";
        ctx.drawImage(noise, 0, 0, w, h);
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
