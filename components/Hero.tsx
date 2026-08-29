"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroCanvas from "./HeroCanvas";
import Stamp from "./Stamp";
import styles from "./Hero.module.css";
import { profile } from "@/lib/data";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lines = root.querySelectorAll(".mask-line > span");
    const rest = root.querySelectorAll(".reveal");

    const tl = gsap.timeline({ delay: 2.2 });
    tl.to(lines, { y: "0%", duration: 1.1, stagger: 0.09, ease: "power4.out" });
    tl.to(rest, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "-=0.7");
  }, []);

  return (
    <section id="top" ref={rootRef} className={styles.hero}>
      <div className={styles.canvasWrap}>
        <HeroCanvas />
      </div>
      <div className={styles.fade} />

      <div className="shell">
        <div className={styles.content}>
          <div className={styles.eyebrowRow}>
            <span className="eyebrow">intro</span>
          </div>

          <h1 className={styles.title}>
            <span className="mask-line">
              <span>Building</span>
            </span>
            <span className="mask-line">
              <span>
                with <em>precision.</em>
              </span>
            </span>
          </h1>

          <p className={`${styles.sub} reveal`}>{profile.summary}</p>

          <div className={styles.meta}>
            <div className={`${styles.metaItem} reveal`}>
              Discipline
              <strong>{profile.role}</strong>
            </div>
            <div className={`${styles.metaItem} reveal`}>
              Field time
              <strong>{profile.experience}</strong>
            </div>
            <div className={`${styles.metaItem} reveal`}>
              Registered
              <strong>{profile.location}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stampCorner}>
        <Stamp size={116} />
      </div>

      <div className={styles.scrollCue}>
        <span className={styles.scrollLine} />
        Begin reading
      </div>
    </section>
  );
}
