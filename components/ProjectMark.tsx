"use client";

/**
 * Every mark below is generated from a small loop of math, not an
 * imported image — each project gets a distinct procedural pattern
 * that echoes what it is (a grid for a housing platform, an orbiting
 * system for a live product, a stepped facade for a real-estate site).
 */

function GridMark() {
  const cells = [];
  const cols = 6;
  const rows = 5;
  const w = 220;
  const h = 180;
  const cw = w / cols;
  const ch = h / rows;
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

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
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mark-svg" role="img" aria-label="Grid pattern representing Homegrid">
      {cells}
    </svg>
  );
}

function OrbitMark() {
  const rings = [30, 52, 74];
  return (
    <svg viewBox="0 0 220 180" className="mark-svg" role="img" aria-label="Orbit pattern representing Martiful">
      <g transform="translate(110 90)">
        {rings.map((r, i) => (
          <circle key={r} r={r} fill="none" stroke="var(--line-strong)" opacity={0.9 - i * 0.15} />
        ))}
        <circle r={3.5} fill="var(--ink)" />
        {rings.map((r, i) => {
          const angle = (i / rings.length) * Math.PI * 2 + 0.6;
          return (
            <circle
              key={`dot-${r}`}
              cx={Math.cos(angle) * r}
              cy={Math.sin(angle) * r}
              r={3}
              fill="var(--ink-dim)"
            />
          );
        })}
      </g>
    </svg>
  );
}

function FacadeMark() {
  const steps = 7;
  const bars = [];
  let seed = 21;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const w = 220;
  const barW = w / steps;
  for (let i = 0; i < steps; i++) {
    const height = 40 + rand() * 110;
    bars.push(
      <rect
        key={i}
        x={i * barW + 2}
        y={180 - height}
        width={barW - 4}
        height={height}
        fill="none"
        stroke="var(--line-strong)"
      />
    );
    if (rand() > 0.5) {
      bars.push(
        <rect
          key={`w-${i}`}
          x={i * barW + 6}
          y={180 - height + 10}
          width={barW - 12}
          height={10}
          fill="var(--ink)"
          opacity={0.22}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 220 180" className="mark-svg" role="img" aria-label="Facade pattern representing The House">
      {bars}
    </svg>
  );
}

export default function ProjectMark({ variant }: { variant: "grid" | "orbit" | "facade" }) {
  if (variant === "grid") return <GridMark />;
  if (variant === "orbit") return <OrbitMark />;
  return <FacadeMark />;
}
