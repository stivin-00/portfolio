import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "File not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="section" style={{ minHeight: "80svh", display: "flex", alignItems: "center" }}>
      <div className="shell">
        <p className="plate-tag stamp-type">Error 404 — Missing from the archive</p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)", lineHeight: 1.02, maxWidth: "14ch" }}>
          This file isn&apos;t in the dossier.
        </h1>
        <p style={{ marginTop: "1.4rem", color: "var(--ink-dim)", maxWidth: "48ch", lineHeight: 1.7 }}>
          The page may have moved, or the link may be mistyped.
        </p>
        <div style={{ marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
          <Link href="/" className="btn btn-primary">
            Back to the home page <span aria-hidden="true">→</span>
          </Link>
          <a href="/#case-files" className="btn btn-ghost">
            Browse case files
          </a>
        </div>
      </div>
    </main>
  );
}
