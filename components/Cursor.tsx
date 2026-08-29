"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };
    const onDown = () => gsap.to(el, { scale: 0.8, duration: 0.18 });
    const onUp = () => gsap.to(el, { scale: 1, duration: 0.18 });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <svg viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="9" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <line x1="17" y1="0" x2="17" y2="7" stroke="var(--ink)" strokeWidth="1" />
        <line x1="17" y1="27" x2="17" y2="34" stroke="var(--ink)" strokeWidth="1" />
        <line x1="0" y1="17" x2="7" y2="17" stroke="var(--ink)" strokeWidth="1" />
        <line x1="27" y1="17" x2="34" y2="17" stroke="var(--ink)" strokeWidth="1" />
      </svg>
    </div>
  );
}
