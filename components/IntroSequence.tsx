"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./IntroSequence.module.css";
import { profile } from "@/lib/data";

const NAME = profile.handle.toUpperCase() + " — " + profile.name.toUpperCase();

export default function IntroSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("intro-seen");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || reduced) {
      setVisible(false);
      onDone();
      return;
    }

    document.body.style.overflow = "hidden";
    sessionStorage.setItem("intro-seen", "1");

    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
        onDone();
      },
    });

    tl.to(cursorRef.current, { opacity: 1, duration: 0.4, repeat: 5, yoyo: true, ease: "steps(1)" }, 0);

    tl.to(state, {
      n: NAME.length,
      duration: NAME.length * 0.045,
      ease: "none",
      onUpdate: () => setTyped(NAME.slice(0, Math.floor(state.n))),
    });

    tl.to(subRef.current, { opacity: 1, duration: 0.5 }, "-=0.1");
    tl.to(roleRef.current, { opacity: 1, duration: 0.5 }, "-=0.3");
    tl.to({}, { duration: 0.55 });
    tl.to(cursorRef.current, { opacity: 0, duration: 0.2 }, "<");
    tl.to(wrapRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.9,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div ref={wrapRef} className={styles.wrap} role="presentation">
      <div className={styles.frame}>
        <span className={`${styles.corner}`} style={{ top: -1, left: -1 }} />
        <span className={`${styles.corner}`} style={{ top: -1, right: -1 }} />
        <span className={`${styles.corner}`} style={{ bottom: -1, left: -1 }} />
        <span className={`${styles.corner}`} style={{ bottom: -1, right: -1 }} />
      </div>

      <div className={styles.title}>
        {typed}
        <span ref={cursorRef} className={styles.cursor}>
          &nbsp;
        </span>
      </div>
      <div ref={subRef} className={styles.sub}>
        A dossier of work
      </div>
      <div ref={roleRef} className={styles.role}>
        {profile.role} — {profile.location}
      </div>
    </div>
  );
}
