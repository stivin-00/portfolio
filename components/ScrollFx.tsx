"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollFx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        gsap.set(".mask-line > span", { y: "0%" });
        gsap.set(".fade-up, .fade-down, .fade-left, .fade-right, .scale-in", { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      const groupBySection = (selector: string) => {
        const groups = new Map<string, Element[]>();
        document.querySelectorAll(selector).forEach((el) => {
          const section = el.closest("section");
          if (!section || section.id === "top") return; // hero animates itself on load
          const key = section.id || "root";
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(el);
        });
        return groups;
      };

      // Standard reveal animations
      groupBySection(".reveal").forEach((els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: els[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
        });
      });

      // Masked text animations
      groupBySection(".mask-line > span").forEach((els) => {
        gsap.to(els, {
          y: "0%",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: els[0],
            start: "top 88%",
            toggleActions: "play none none reverse"
          },
        });
      });

      // Directional fade animations
      groupBySection(".fade-up").forEach((els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: els[0], start: "top 85%" },
        });
      });

      groupBySection(".fade-down").forEach((els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: els[0], start: "top 85%" },
        });
      });

      groupBySection(".scale-in").forEach((els) => {
        gsap.to(els, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: { trigger: els[0], start: "top 85%" },
        });
      });

      // Parallax effect for section backgrounds
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
