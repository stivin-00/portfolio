"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroScene } from "./heroScene";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let scene: HeroScene | null = null;
    let tween: gsap.core.Tween | null = null;

    try {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scene = new HeroScene(canvasRef.current, containerRef.current);

      const state = { progress: 0 };
      tween = gsap.to(state, {
        progress: 1,
        duration: prefersReduced ? 0.01 : 2.6,
        delay: prefersReduced ? 0 : 0.3,
        ease: "power3.out",
        onUpdate: () => scene?.setProgress(state.progress),
      });
    } catch (error) {
      console.warn("WebGL not supported or context could not be created:", error);
    }

    return () => {
      tween?.kill();
      scene?.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
