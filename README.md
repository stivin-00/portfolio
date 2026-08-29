# Ekele Stephen Agbakwuru — Portfolio ("The Dossier")

A single-page portfolio built with **Next.js 14 (App Router) + TypeScript**, in a mature,
**vintage black-and-white** register: the whole site is framed as a personal dossier —
"plates," a register of employment, an index of materials — set in a serif/typewriter type
system, textured with procedurally generated film grain, and opened with a typewriter title
card that iris-wipes into the page.

**The scroll is the centerpiece.** Beyond section reveals, Plate IV (Selected Works) is a
pinned, horizontal-scrolling filmstrip — GSAP `ScrollTrigger` translates a strip of project
panels sideways as you scroll vertically, sprocket holes and all, so scrolling through your
projects feels like scrubbing through a reel of film.

Every visual is generated in code — nothing imported:
- **Hero — "Specimen No. 001"** (`components/heroScene.ts`): a wireframe solid (an icosahedron's
  edges) rendered in raw Three.js with hand-written GLSL, assembling itself bottom-to-top on
  load like a technical engraving plate being drawn.
- **Film grain** (`components/GrainOverlay.tsx`): animated monochrome noise generated on a
  canvas every frame, blended over the whole page at low opacity — the "shot on film" texture.
- **Torn-paper dividers** (`components/TornDivider.tsx`): a seeded pseudo-random walk generates
  a unique deckle edge between each plate.
- **Vintage seal** (`components/Stamp.tsx`): circular text set along a computed SVG path.
- **Project marks** (`components/ProjectMark.tsx`): three distinct procedural patterns.
- **Opening title card** (`components/IntroSequence.tsx`): typewriter reveal + iris-wipe,
  plays once per session (skipped on repeat visits and for `prefers-reduced-motion`).

No stock photos, icon packs, or external art assets anywhere.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

`npm run build` requires network access to Google Fonts at build time (`next/font/google`
self-hosts Fraunces, Archivo and Special Elite). Normal Next.js behavior — works anywhere with
internet access, including Vercel.

## Personalize before shipping

- `lib/data.ts` — all real content lives here (contact info, stack, employment history,
  projects, education) — already filled in from your CV
- The Eazybrew project link in `lib/data.ts` is `#` — add the live URL when you have one
- `app/layout.tsx` — `<title>`/`<meta description>` if you want different copy

## Design direction

**Concept:** your work presented as a personal archive — the visual language of an old
scientific/technical dossier (engraving-plate illustration, ledger typography, torn paper,
a wax-seal-style stamp) rather than a modern SaaS landing page. "Specimen No. 001" in the
hero nods at your BSc Chemistry background.

**Palette:** true monochrome — warm near-black (`#0c0b09`), aged-paper ink (`#f2ede2`), and
greys in between. No color accent anywhere, by design.

**Type:** Fraunces (display serif, vintage editorial character), Archivo (body/grotesk),
Special Elite (a genuine typewriter face — used for all labels, stamps and case-file
metadata) — three fonts doing three distinct jobs.

## Stack

- Next.js 14 / App Router / TypeScript
- GSAP 3 + ScrollTrigger (section reveals, kinetic text, pinned horizontal scroll)
- three.js (raw, no React wrapper) with custom `ShaderMaterial`s
- CSS Modules — no UI framework, no image assets

## Structure

```
app/            layout, global styles, the single route (page.tsx)
components/     Nav, Hero (+ Three.js scene), About, Skills, Experience, Projects
                (horizontal filmstrip), Contact, Footer, Cursor, IntroSequence,
                GrainOverlay, TornDivider, Stamp, ScrollFx, ProjectMark
lib/data.ts     all copy/content in one place
```

