"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Nav.module.css";
import { trackCTAClick } from "@/lib/analytics";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

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

  return (
    <header className={styles.nav}>
      <a href="#top" className={styles.mark}>
        E.S. AGBAKWURU
      </a>
      <nav className={styles.links}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <a
        ref={ctaRef}
        href="#contact"
        className={styles.cta}
        onClick={() => trackCTAClick("Open dossier")}
      >
        Open dossier ↗
      </a>
    </header>
  );
}
