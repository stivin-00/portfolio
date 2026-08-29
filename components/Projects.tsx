"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";
import { projects } from "@/lib/data";
import ProjectMark from "./ProjectMark";

export default function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth + 2 * 24;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${pin.offsetHeight}`,
          scrub: 0.6,
        },
      });
      return () => tween.kill();
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={pinRef} className={styles.pin}>
      <div className={styles.sticky}>
        <span className={`${styles.sprockets} ${styles.sprocketsTop}`} aria-hidden="true" />
        <span className={`${styles.sprockets} ${styles.sprocketsBottom}`} aria-hidden="true" />

        <div className={`shell ${styles.tagRow}`}>
          <div className="plate-tag stamp-type" style={{ marginBottom: 0 }}>
            Projects — Selected Works
          </div>
        </div>

        <div ref={trackRef} className={styles.track}>
          {projects.map((p) => (
            <article key={p.name} className={styles.panel}>
              <div>
                <div className={styles.plateNum}>{p.number}</div>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.href}
                  target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={styles.link}
                >
                  View project ↗
                </a>
              </div>
              <div className={styles.markWrap}>
                <ProjectMark variant={p.mark} />
              </div>
            </article>
          ))}
        </div>

        <div className={styles.hint}>
          Scroll to continue
          <span className={styles.hintTrack} />
        </div>
      </div>
    </section>
  );
}
