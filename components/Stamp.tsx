"use client";

/**
 * A vintage seal: two lines of small caps set along circular paths that
 * are computed from the given radius, plus a center mark. No image —
 * the circle geometry and text placement are generated from props.
 */
export default function Stamp({
  outer = "EKELE STEPHEN AGBAKWURU",
  inner = "FRONTEND · FULL-STACK",
  size = 140,
  className,
}: {
  outer?: string;
  inner?: string;
  size?: number;
  className?: string;
}) {
  const r = 62;
  const id = "stampPath";

  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${outer} — ${inner}`}
    >
      <defs>
        <path id={id} d={`M 70,${70 - r} A ${r},${r} 0 1 1 69.9,${70 - r}`} fill="none" />
      </defs>
      <circle cx="70" cy="70" r="66" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="70" cy="70" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="70" cy="70" r="3" fill="currentColor" />
      <text fontSize="7.2" letterSpacing="1.4" fill="currentColor" className="stamp-type">
        <textPath href={`#${id}`} startOffset="2%">
          {outer}
        </textPath>
      </text>
      <text
        x="70"
        y="73"
        textAnchor="middle"
        fontSize="5.4"
        letterSpacing="0.6"
        fill="currentColor"
        className="stamp-type"
      >
        {inner}
      </text>
    </svg>
  );
}
