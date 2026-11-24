"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./IntroSequence.module.css";
import { profile } from "@/lib/data";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";

const NAME = profile.handle.toUpperCase() + " — " + profile.name.toUpperCase();

/**
 * Opening title card: typewriter reveal + iris-wipe. Plays once per session,
 * only on the home page, never for prefers-reduced-motion. Whether it plays is
 * decided before first paint by the boot script in app/layout.tsx, so repeat
 * visitors never see a flash of the card and no-JS visitors never get stuck
 * behind it.
 */
export default function IntroSequence() {
  const [done, setDone] = useState(false);
  const typedRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") {
      setDone(true);
      return;
    }

    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* storage unavailable: the card simply plays again next time */
    }
    document.body.style.overflow = "hidden";

    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        root.dataset.intro = "done";
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.to(cursorRef.current, { opacity: 1, duration: 0.4, repeat: 5, yoyo: true, ease: "steps(1)" }, 0);
    tl.to(state, {
      n: NAME.length,
      duration: NAME.length * 0.045,
      ease: "none",
      // Written straight to the DOM: no React re-render per frame.
      onUpdate: () => {
        if (typedRef.current) typedRef.current.textContent = NAME.slice(0, Math.floor(state.n));
      },
    });
    tl.to(subRef.current, { opacity: 1, duration: 0.5 }, "-=0.1");
    tl.to(roleRef.current, { opacity: 1, duration: 0.5 }, "-=0.3");
    tl.to({}, { duration: 0.55 });
    tl.to(cursorRef.current, { opacity: 0, duration: 0.2 }, "<");
    // The hero starts its own reveal as the iris opens.
    tl.call(() => {
      root.dataset.intro = "reveal";
      window.dispatchEvent(new Event(INTRO_REVEAL_EVENT));
    });
    tl.to(wrapRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.9,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <div className={styles.frame}>
        <span className={styles.corner} style={{ top: -1, left: -1 }} />
        <span className={styles.corner} style={{ top: -1, right: -1 }} />
        <span className={styles.corner} style={{ bottom: -1, left: -1 }} />
        <span className={styles.corner} style={{ bottom: -1, right: -1 }} />
      </div>

      <div className={styles.title}>
        <span ref={typedRef} />
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
