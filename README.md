# Ekele Stephen Agbakwuru — Portfolio ("The Dossier")

A portfolio built with **Next.js 14 (App Router) + TypeScript**, in a mature,
**vintage black-and-white** register: the whole site is framed as a personal dossier —
"plates," a register of employment, an index of materials, numbered case files — set in a
serif/typewriter type system, textured with procedurally generated film grain, and opened
with a typewriter title card that iris-wipes into the page.

**Home page** (`/`): hero → "What I bring" findings → featured case file (HomexGrid) → the
case-file reel → experience → stack → services → about → contact.
**Case files** (`/work/[slug]`): one statically generated page per project — problem, what I
did, stack, outcome, links.

**The scroll is the centerpiece.** On wide screens the case-file reel is a pinned,
horizontal-scrolling filmstrip — GSAP `ScrollTrigger` translates the panels sideways as you
scroll vertically, sprocket holes and all. On phones, short screens and with reduced motion
it's a stacked list, and keyboard focus scrolls the reel to the focused card.

Every visual is generated in code — nothing imported:
- **Hero — "Specimen No. 001"**: a wireframe icosahedron. On large screens with a mouse it's
  raw Three.js with hand-written GLSL (`components/heroScene.ts`), lazy-loaded at idle,
  assembling bottom-to-top and following the pointer. Everywhere else (phones, reduced
  motion, no WebGL) the same geometry and camera are pre-computed on the server and drawn as
  SVG (`lib/specimen.ts`, `components/HeroSpecimen.tsx`), so three.js is never downloaded.
- **Film grain** (`components/GrainOverlay.tsx`): a few noise frames generated once on a small
  canvas and cycled at 12fps, blended over the page at low opacity.
- **Torn-paper dividers** (`components/TornDivider.tsx`): a seeded pseudo-random walk.
- **Vintage seal** (`components/Stamp.tsx`): circular text set along a computed SVG path.
- **Project marks** (`components/ProjectMark.tsx`): six procedural patterns (grid, orbit,
  facade, pages, role tree, waveform).
- **Opening title card** (`components/IntroSequence.tsx`): typewriter + iris-wipe, once per
  session on the home page; skipped for `prefers-reduced-motion`. A tiny boot script in
  `app/layout.tsx` decides before first paint, so there's no flash and no-JS visitors never
  see hidden content.
- **Social images and favicons**: generated from the same specimen (see below).

No stock photos, icon packs, or external art assets anywhere.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

`npm run build` needs network access to Google Fonts (`next/font/google` self-hosts
Playfair Display, Archivo and Special Elite).

## Editing content

- **`lib/data.ts`** — all copy lives here: profile, availability, stack groups, experience,
  case studies, "What I bring", services, testimonials. Search the repo for `TODO` to find
  the details that still need your input.
- **Testimonials** stay hidden until you add real quotes to `testimonials` in `lib/data.ts`.
- **CV**: replace `public/Ekele_Stephen_Agbakwuru_CV.pdf` (same filename).
- **Social images / favicons**: after changing the headline or a case study's name/summary,
  run `npm run assets` (needs Node 22.6+ and Chrome; set `CHROME_PATH` if it isn't found).
  It rewrites `public/og-image.png`, `public/og/*.png`, `app/icon.svg`, `app/apple-icon.png`,
  `app/favicon.ico` and the manifest icons.
- **SEO**: titles/descriptions in `app/layout.tsx` and `app/work/[slug]/page.tsx`; JSON-LD in
  `components/PersonJsonLd.tsx`; `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.

## Design direction

**Concept:** your work presented as a personal archive — the visual language of an old
scientific/technical dossier (engraving-plate illustration, ledger typography, torn paper,
a wax-seal-style stamp) rather than a modern SaaS landing page. "Specimen No. 001" in the
hero nods at your BSc Chemistry background.

**Palette:** true monochrome — black, paper-white ink and greys in between. No colour accent,
by design.

**Type:** Playfair Display (display serif), Archivo (body/grotesk), Special Elite (a genuine
typewriter face — labels, stamps and case-file metadata) — three fonts, three jobs.

## Performance & accessibility notes

- three.js, ScrollTrigger and Firebase Analytics are code-split and loaded only when needed.
- When the title card plays, the headline is already painted underneath it (LCP at first paint).
- Semantic headings, skip link, visible focus ring, keyboard-accessible mobile menu, 44px+ tap
  targets, descriptive link text, `prefers-reduced-motion` respected by GSAP, CSS and WebGL.

## Stack

- Next.js 14 / App Router / TypeScript
- GSAP 3 + ScrollTrigger (reveals, kinetic text, pinned horizontal reel)
- three.js (raw, no React wrapper) with custom `ShaderMaterial`s
- CSS Modules — no UI framework, no raster image assets on the page
- Firebase Analytics (lazy-loaded; config in `.env.local`, see `.env.example`)

## Structure

```
app/                layout (metadata, boot script), home page, /work/[slug] case files,
                    sitemap, robots, manifest, icons, 404
components/         Nav, Hero (+ HeroCanvas/heroScene WebGL, HeroSpecimen SVG), ProofStrip,
                    Featured, Projects (reel), Experience, Skills, Services, About,
                    Testimonials, Contact, Footer, IntroSequence, ScrollFx, GrainOverlay,
                    TornDivider, Stamp, ProjectMark, TrackedLink, PersonJsonLd
lib/data.ts         all copy/content in one place
lib/specimen.ts     icosahedron geometry shared by the SVG hero, OG images and favicons
scripts/            generate-assets.mjs (OG images + favicon set)
```
