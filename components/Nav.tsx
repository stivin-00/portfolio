"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Nav.module.css";
import { trackCTAClick } from "@/lib/analytics";

// Absolute hash links so they work from case-file pages too.
const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
];

export default function Nav() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // Magnetic CTA on mouse devices.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strength = 0.35;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Mobile menu: Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.nav}>
      <a href="/#top" className={styles.mark} aria-label="Ekele Stephen Agbakwuru, back to the top">
        E.S. AGBAKWURU
      </a>

      <nav id="site-menu" className={`${styles.links} ${open ? styles.open : ""}`} aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a href="/#contact" onClick={close} className={styles.menuOnly}>
          Contact
        </a>
      </nav>

      <div className={styles.right}>
        <a
          ref={ctaRef}
          href="/#contact"
          className={styles.cta}
          onClick={() => trackCTAClick("Let's talk (nav)")}
        >
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
