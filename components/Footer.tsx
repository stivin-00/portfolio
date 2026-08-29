export default function Footer() {
  return (
    <footer style={{
      padding: "2.5rem var(--gutter)",
      borderTop: "1px solid var(--line)",
      background: "var(--bg-raised)"
    }}>
      <div
        className="shell stamp-type"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.62rem",
          color: "var(--ink-mute)",
          letterSpacing: "0.08em",
        }}
      >
        <span>© {new Date().getFullYear()} Ekele Stephen Agbakwuru — End of dossier</span>
        <span style={{ opacity: 0.7 }}>Built with Next.js, GSAP &amp; Three.js</span>
      </div>
    </footer>
  );
}
