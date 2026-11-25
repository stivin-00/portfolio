/**
 * Every mark below is generated from a small loop of math, not an
 * imported image. Each project gets a distinct procedural pattern that
 * echoes what it is: a grid for a housing platform, an orbiting system
 * for a payments app, a stepped facade for a restaurant, stacked pages
 * for CMS-driven sites, a role tree for a multi-role dashboard and a
 * waveform for a voice app.
 * Purely decorative, so hidden from assistive tech.
 */
import type { MarkVariant } from "@/lib/data";

const W = 220;
const H = 180;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mark-svg" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

function GridMark() {
  const cells = [];
  const cols = 6;
  const rows = 5;
  const cw = W / cols;
  const ch = H / rows;
  const rand = seeded(7);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const filled = rand() > 0.62;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={c * cw + 1}
          y={r * ch + 1}
          width={cw - 2}
          height={ch - 2}
          fill={filled ? "var(--ink)" : "none"}
          fillOpacity={filled ? 0.14 : 0}
          stroke="var(--line-strong)"
        />
      );
    }
  }
  return <Svg>{cells}</Svg>;
}

function OrbitMark() {
  const rings = [30, 52, 74];
  return (
    <Svg>
      <g transform="translate(110 90)">
        {rings.map((r, i) => (
          <circle key={r} r={r} fill="none" stroke="var(--line-strong)" opacity={0.9 - i * 0.15} />
        ))}
        <circle r={3.5} fill="var(--ink)" />
        {rings.map((r, i) => {
          const angle = (i / rings.length) * Math.PI * 2 + 0.6;
          return (
            <circle key={`dot-${r}`} cx={Math.cos(angle) * r} cy={Math.sin(angle) * r} r={3} fill="var(--ink-dim)" />
          );
        })}
      </g>
    </Svg>
  );
}

function FacadeMark() {
  const steps = 7;
  const bars = [];
  const rand = seeded(21);
  const barW = W / steps;
  for (let i = 0; i < steps; i++) {
    const height = 40 + rand() * 110;
    bars.push(
      <rect key={i} x={i * barW + 2} y={H - height} width={barW - 4} height={height} fill="none" stroke="var(--line-strong)" />
    );
    if (rand() > 0.5) {
      bars.push(
        <rect key={`w-${i}`} x={i * barW + 6} y={H - height + 10} width={barW - 12} height={10} fill="var(--ink)" opacity={0.22} />
      );
    }
  }
  return <Svg>{bars}</Svg>;
}

/** Overlapping documents with ruled "content" lines: CMS-managed pages. */
function PagesMark() {
  const rand = seeded(33);
  const pages = [0, 1, 2].map((i) => {
    const x = 34 + i * 34;
    const y = 18 + i * 16;
    const lines = Array.from({ length: 6 }, (_, l) => {
      const len = 40 + rand() * 46;
      return <line key={l} x1={x + 12} y1={y + 28 + l * 14} x2={x + 12 + len} y2={y + 28 + l * 14} stroke="var(--line-strong)" />;
    });
    return (
      <g key={i}>
        <rect x={x} y={y} width={104} height={128} fill="var(--bg-raised)" stroke="var(--line-strong)" />
        <rect x={x + 12} y={y + 10} width={34} height={8} fill="var(--ink)" opacity={0.2 + i * 0.08} />
        {lines}
      </g>
    );
  });
  return <Svg>{pages}</Svg>;
}

/** One admin node branching to operators, then business users: a role hierarchy. */
function TreeMark() {
  const levels = [[110], [60, 160], [30, 80, 130, 190]];
  const ys = [34, 90, 146];
  const edges: JSX.Element[] = [];
  for (let l = 0; l < levels.length - 1; l++) {
    levels[l].forEach((x, i) => {
      const children = levels[l + 1].slice(i * 2, i * 2 + 2);
      children.forEach((cx) =>
        edges.push(<line key={`${l}-${x}-${cx}`} x1={x} y1={ys[l]} x2={cx} y2={ys[l + 1]} stroke="var(--line-strong)" />)
      );
    });
  }
  const nodes = levels.flatMap((row, l) =>
    row.map((x) => (
      <circle
        key={`n-${l}-${x}`}
        cx={x}
        cy={ys[l]}
        r={10 - l * 2}
        fill={l === 0 ? "var(--ink)" : "var(--bg-raised)"}
        fillOpacity={l === 0 ? 0.3 : 1}
        stroke="var(--ink-dim)"
      />
    ))
  );
  return (
    <Svg>
      {edges}
      {nodes}
    </Svg>
  );
}

/** A spoken waveform: bar heights from two overlapping sines. */
function WaveMark() {
  const bars = 28;
  const gap = W / bars;
  return (
    <Svg>
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="var(--line)" />
      {Array.from({ length: bars }, (_, i) => {
        const t = i / (bars - 1);
        const amp = Math.abs(Math.sin(t * Math.PI * 3.2) * 0.7 + Math.sin(t * Math.PI * 7.1) * 0.3) * Math.sin(t * Math.PI);
        const h = 8 + amp * 120;
        return (
          <rect
            key={i}
            x={i * gap + gap * 0.3}
            y={H / 2 - h / 2}
            width={gap * 0.4}
            height={h}
            fill="var(--ink)"
            opacity={0.18 + amp * 0.5}
          />
        );
      })}
    </Svg>
  );
}

const MARKS: Record<MarkVariant, () => JSX.Element> = {
  grid: GridMark,
  orbit: OrbitMark,
  facade: FacadeMark,
  pages: PagesMark,
  tree: TreeMark,
  wave: WaveMark,
};

export default function ProjectMark({ variant }: { variant: MarkVariant }) {
  const Mark = MARKS[variant];
  return <Mark />;
}
