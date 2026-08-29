"use client";

import { useEffect, useRef } from "react";

/**
 * Renders animated monochrome noise across the whole viewport at very low
 * opacity, blended with `overlay`, so the page reads like it was printed
 * on textured paper / shot on film rather than rendered flat on a screen.
 * Entirely procedural — generated per-frame on a canvas, no image assets.
 */
export default function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Small offscreen buffer, upscaled — keeps the grain chunky (film-like)
    // and cheap to regenerate every frame.
    const scale = 0.22;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = Math.max(1, Math.floor(window.innerWidth * scale));
      h = Math.max(1, Math.floor(window.innerHeight * scale));
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const imageData = () => ctx.createImageData(w, h);
    let raf = 0;
    let frame = 0;

    const draw = () => {
      frame++;
      if (frame % 2 === 0) {
        const data = imageData();
        const buf = data.data;
        for (let i = 0; i < buf.length; i += 4) {
          const v = Math.random() * 255;
          buf[i] = v;
          buf[i + 1] = v;
          buf[i + 2] = v;
          buf[i + 3] = 255;
        }
        ctx.putImageData(data, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="grain-canvas" aria-hidden="true" />;
}
