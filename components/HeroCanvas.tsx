"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroScene } from "./heroScene";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new HeroScene(canvasRef.current, containerRef.current);

    const state = { progress: 0 };
    const tween = gsap.to(state, {
      progress: 1,
      duration: prefersReduced ? 0.01 : 2.6,
      delay: prefersReduced ? 0 : 0.3,
      ease: "power3.out",
      onUpdate: () => scene.setProgress(state.progress),
    });

    return () => {
      tween.kill();
      scene.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
