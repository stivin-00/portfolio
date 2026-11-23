"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { HeroScene } from "./heroScene";
import { onHeroReveal } from "@/lib/intro";

/**
 * The WebGL scene only runs where it adds something: large screens with a
 * mouse (it follows the pointer) and motion allowed. Everywhere else the
 * server-rendered SVG specimen is shown instead and three.js is never
 * downloaded. Keep this query in sync with `.specimen` in Hero.module.css.
 */
export const WEBGL_QUERY =
  "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.matchMedia(WEBGL_QUERY).matches) return;

    const root = document.documentElement;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) {
      root.dataset.webgl = "off";
      return;
    }

    let disposed = false;
    let scene: HeroScene | null = null;
    let tween: gsap.core.Tween | null = null;
    let observer: IntersectionObserver | null = null;
    let stopReveal = () => {};
    // A fresh canvas per mount: a WebGL context lost in cleanup can't be reused.
    const canvas = document.createElement("canvas");

    const load = async () => {
      try {
        const { HeroScene } = await import("./heroScene");
        if (disposed) return;
        container.appendChild(canvas);
        scene = new HeroScene(canvas, container);
        root.dataset.webgl = "on";

        // Stop rendering while the hero is scrolled out of view.
        observer = new IntersectionObserver(([entry]) => scene?.setActive(entry.isIntersecting));
        observer.observe(container);

        stopReveal = onHeroReveal(() => {
          const state = { progress: 0 };
          tween = gsap.to(state, {
            progress: 1,
            duration: 2.6,
            ease: "power3.out",
            onUpdate: () => scene?.setProgress(state.progress),
          });
        });
      } catch (error) {
        console.warn("WebGL unavailable, showing the SVG specimen instead:", error);
        root.dataset.webgl = "failed";
        canvas.remove();
      }
    };

    const w = window as IdleWindow;
    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(() => void load(), { timeout: 1500 })
      : window.setTimeout(() => void load(), 200);

    return () => {
      disposed = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      stopReveal();
      tween?.kill();
      observer?.disconnect();
      scene?.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="hero-canvas" aria-hidden="true" />;
}
