"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";
import { caseStudies } from "@/lib/data";
import ProjectMark from "./ProjectMark";
import { trackProjectView } from "@/lib/analytics";

const reel = caseStudies.filter((c) => !c.featured);
const MAX_TAGS = 5;

/** Pinned horizontal filmstrip only where it works well; otherwise a stacked list. */
const HORIZONTAL_QUERY = "(min-width: 900px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(HORIZONTAL_QUERY, () => {
      section.classList.add(styles.horizontal);
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Keyboard users: when a link on an off-screen card gets focus, scroll
      // the page to the point where that card sits in view.
      const onFocusIn = (e: FocusEvent) => {
        const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
        const st = tween.scrollTrigger;
        const d = distance();
        if (!panel || !st || !d) return;
        section.scrollLeft = 0;
        const progress = Math.min(1, Math.max(0, (panel.offsetLeft - track.offsetLeft) / d));
        window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: "instant" });
      };
      section.addEventListener("focusin", onFocusIn);

      return () => {
        section.removeEventListener("focusin", onFocusIn);
        section.classList.remove(styles.horizontal);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="case-files" ref={sectionRef} className={styles.reel} aria-labelledby="case-files-title">
      <span className={`${styles.sprockets} ${styles.sprocketsTop}`} aria-hidden="true" />
      <span className={`${styles.sprockets} ${styles.sprocketsBottom}`} aria-hidden="true" />

      <div className={`shell ${styles.tagRow}`}>
        <h2 id="case-files-title" className="plate-tag stamp-type">
          Projects — More Case Files
        </h2>
      </div>

      <div ref={trackRef} className={styles.track}>
        {reel.map((p) => {
          const external = p.links[0];
          return (
            <article key={p.slug} className={styles.panel} data-panel aria-labelledby={`case-${p.slug}`}>
              <div>
                <p className={styles.plateNum} aria-hidden="true">
                  {p.number}
                </p>
                <p className={styles.kind}>
                  {p.kind} · {p.context}
                </p>
                <h3 id={`case-${p.slug}`} className={styles.name}>
                  {p.name}
                </h3>
                <p className={styles.desc}>{p.summary}</p>
                <ul className={styles.tags} aria-label="Stack">
                  {p.stack.slice(0, MAX_TAGS).map((t) => (
                    <li key={t} className={styles.tag}>
                      {t}
                    </li>
                  ))}
                  {p.stack.length > MAX_TAGS && (
                    <li className={styles.tag}>+{p.stack.length - MAX_TAGS} more</li>
                  )}
                </ul>
                <div className={styles.actions}>
                  <Link href={`/work/${p.slug}`} className="text-link">
                    Read case file<span className="sr-only">: {p.name}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  {external && (
                    <a
                      href={external.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.extLink}
                      onClick={() => trackProjectView(p.name, external.href)}
                    >
                      {external.label}
                      <span aria-hidden="true"> ↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.markWrap}>
                <ProjectMark variant={p.mark} />
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.hint} aria-hidden="true">
        Scroll to continue
        <span className={styles.hintTrack} />
      </div>
    </section>
  );
}
