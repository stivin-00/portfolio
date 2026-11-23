"use client";

import { useEffect, useRef } from "react";

const SCALE = 0.22; // backing store is ~1/4.5 of the viewport, upscaled by the GPU
const FRAMES = 6;
const FRAME_MS = 1000 / 12; // film grain doesn't need 60fps

/**
 * Renders animated monochrome noise across the whole viewport at very low
 * opacity, blended with `overlay`, so the page reads like it was printed
 * on textured paper / shot on film rather than rendered flat on a screen.
 * Entirely procedural — no image assets. A few noise frames are generated
 * once (one per animation frame, so no long task) and then cycled at 12fps,
 * instead of regenerating every pixel on the main thread every frame.
 * Reduced motion keeps a single static frame.
 */
export default function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frames: ImageData[] = [];
    let raf = 0;
    let index = 0;
    let last = 0;

    const makeFrame = () => {
      const data = ctx.createImageData(canvas.width, canvas.height);
      const buf = data.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = Math.random() * 255;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      return data;
    };

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE));
      frames = [];
      if (reduced) ctx.putImageData(makeFrame(), 0, 0);
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < FRAME_MS) return;
      last = now;
      if (frames.length < FRAMES) frames.push(makeFrame());
      index = (index + 1) % frames.length;
      ctx.putImageData(frames[index], 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="grain-canvas" aria-hidden="true" />;
}
