"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import HeroCanvas from "./HeroCanvas";
import Stamp from "./Stamp";
import styles from "./Hero.module.css";
import { profile } from "@/lib/data";
import { introIsPlaying, onHeroReveal } from "@/lib/intro";
import { trackCTAClick, trackResumeDownload } from "@/lib/analytics";

const HEADLINE = "I build fintech and enterprise products people trust with";
const HEADLINE_EMPHASIS = "their money and their work.";

/** Each word sits in its own mask so the line can wrap naturally at any width. */
function MaskedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="mask-word">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero({ backdrop }: { backdrop?: React.ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.dataset.revealed = "true";
      return;
    }

    const words = root.querySelectorAll(".mask-word > span");
    const rest = root.querySelectorAll(".reveal");
    // With the title card, the headline is already in place under it (see globals.css).
    const wordsAlreadyShown = introIsPlaying();
    let tl: gsap.core.Timeline | null = null;

    // Waits for the title card's iris-wipe on first visit; starts at once otherwise.
    const stop = onHeroReveal(() => {
      root.dataset.revealed = "true";
      tl = gsap.timeline();
      if (!wordsAlreadyShown) {
        tl.to(words, { y: "0%", duration: 1, stagger: 0.035, ease: "power4.out" });
      }
      tl.to(
        rest,
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
        wordsAlreadyShown ? 0.35 : "-=0.75"
      );
    });

    return () => {
      stop();
      tl?.kill();
    };
  }, []);

  return (
    <section id="top" ref={rootRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.canvasWrap}>
        {/* Server-rendered SVG specimen; HeroCanvas swaps in WebGL on capable desktops. */}
        {backdrop}
        <HeroCanvas />
      </div>
      <div className={styles.fade} />

      <div className="shell">
        <div className={styles.content}>
          <div className={styles.eyebrowRow}>
            <p className="eyebrow">
              {profile.handle} — {profile.name}
            </p>
          </div>

          <h1 id="hero-title" className={styles.title}>
            <span className="sr-only">
              {HEADLINE} {HEADLINE_EMPHASIS}
            </span>
            <span aria-hidden="true">
              <MaskedWords text={HEADLINE} />{" "}
              <em>
                <MaskedWords text={HEADLINE_EMPHASIS} />
              </em>
            </span>
          </h1>

          {/* Visible from first paint on purpose: it's the page's LCP element on mobile. */}
          <p className={styles.sub}>{profile.summary}</p>

          <div className={`${styles.ctas} reveal`}>
            <a href="#work" className="btn btn-primary" onClick={() => trackCTAClick("View my work")}>
              View my work <span aria-hidden="true">→</span>
            </a>
            <a
              href={profile.cv}
              download="Ekele_Stephen_Agbakwuru_CV.pdf"
              className="btn btn-ghost"
              onClick={trackResumeDownload}
            >
              Download CV <span className="sr-only">(PDF)</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <p className={`${styles.currently} reveal`}>
            <span className={styles.pulse} aria-hidden="true" />
            <span className={styles.currentlyLabel}>Currently</span>
            <span>
              Building {profile.currently.building}. Open to {profile.currently.openTo}.
            </span>
          </p>

          <dl className={styles.meta}>
            <div className={`${styles.metaItem} reveal`}>
              <dt>Discipline</dt>
              <dd>{profile.role}</dd>
            </div>
            <div className={`${styles.metaItem} reveal`}>
              <dt>Field time</dt>
              <dd>{profile.experience}</dd>
            </div>
            <div className={`${styles.metaItem} reveal`}>
              <dt>Registered</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.stampCorner}>
        <Stamp size={116} id="stamp-hero" />
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        Begin reading
      </div>
    </section>
  );
}
