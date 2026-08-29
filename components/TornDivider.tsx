/**
 * A deckle/torn-paper edge, generated from a seeded pseudo-random walk
 * rather than drawn or imported — used between "plates" instead of a
 * plain hairline rule, to keep the archive/print metaphor consistent.
 */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildTornPath(width: number, height: number, seed: number) {
  const rand = seededRandom(seed);
  const steps = 42;
  const stepW = width / steps;
  let d = `M 0 ${height}`;
  for (let i = 0; i <= steps; i++) {
    const x = i * stepW;
    const y = height * 0.4 + rand() * height * 0.6;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L ${width} ${height} Z`;
  return d;
}

export default function TornDivider({ seed = 1 }: { seed?: number }) {
  const width = 1200;
  const height = 26;
  const path = buildTornPath(width, height, seed);

  return (
    <div className="torn-divider" aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <path d={path} fill="currentColor" />
      </svg>
    </div>
  );
}
