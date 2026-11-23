import type { CSSProperties } from "react";
import { buildSpecimen } from "@/lib/specimen";
import styles from "./Hero.module.css";

const specimen = buildSpecimen();
const INK = "#f2ede2";

const withDelay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Static SVG engraving of the hero solid. Server-rendered (no client JS):
 * shown on touch devices, small screens, reduced motion and as the fallback
 * when WebGL is unavailable. Lines draw in bottom-to-top when the hero
 * reveals (see Hero.module.css).
 */
export default function HeroSpecimen() {
  return (
    <svg
      className={styles.specimen}
      viewBox={specimen.viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="specimen-rivet">
          <stop offset="0%" stopColor={INK} stopOpacity="0.55" />
          <stop offset="25%" stopColor={INK} stopOpacity="0.46" />
          <stop offset="50%" stopColor={INK} stopOpacity="0.28" />
          <stop offset="75%" stopColor={INK} stopOpacity="0.09" />
          <stop offset="100%" stopColor={INK} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="url(#specimen-rivet)">
        {specimen.points.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} style={withDelay(p.delay)} />
        ))}
      </g>
      <g stroke={INK} strokeOpacity="0.75" strokeWidth="0.011" strokeLinecap="round" fill="none">
        {specimen.lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            pathLength={1}
            style={withDelay(l.delay)}
          />
        ))}
      </g>
    </svg>
  );
}
