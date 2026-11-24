"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { loadScrollTrigger } from "@/lib/scrollTrigger";

/** One staggered group per section (or header / [data-fx-group]). The hero animates itself. */
function groupBySection(selector: string) {
  const groups = new Map<Element, Element[]>();
  document.querySelectorAll(selector).forEach((el) => {
    const group = el.closest("[data-fx-group], section, header, main") ?? document.body;
    if (group.id === "top") return;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(el);
  });
  return groups;
}

function setupReveals() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    gsap.set(".reveal", { opacity: 1, y: 0 });
    gsap.set(".mask-line > span", { y: "0%" });
    gsap.set(".fade-up, .fade-down, .fade-left, .fade-right, .scale-in", { opacity: 1, x: 0, y: 0, scale: 1 });
    return;
  }

  // Standard reveal animations
  groupBySection(".reveal").forEach((els) => {
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: els[0], start: "top 85%", toggleActions: "play none none reverse" },
    });
  });

  // Masked text animations
  groupBySection(".mask-line > span").forEach((els) => {
    gsap.to(els, {
      y: "0%",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.08,
      scrollTrigger: { trigger: els[0], start: "top 88%", toggleActions: "play none none reverse" },
    });
  });

  // Directional fade animations
  for (const [selector, from] of [
    [".fade-up", { y: 0 }],
    [".fade-down", { y: 0 }],
    [".fade-left", { x: 0 }],
    [".fade-right", { x: 0 }],
  ] as const) {
    groupBySection(selector).forEach((els) => {
      gsap.to(els, {
        opacity: 1,
        ...from,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: els[0], start: "top 85%" },
      });
    });
  }

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
}

export default function ScrollFx() {
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let cancelled = false;

    // ScrollTrigger is code-split: it isn't needed for first paint.
    void loadScrollTrigger().then(() => {
      if (!cancelled) ctx = gsap.context(setupReveals);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
