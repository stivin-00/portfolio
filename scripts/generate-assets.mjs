#!/usr/bin/env node
/**
 * Generates the social preview images and the favicon set, in the site's
 * dossier style, by screenshotting small HTML pages with headless Chrome.
 * No npm dependencies. Reuses lib/specimen.ts and lib/data.ts directly
 * (Node's TypeScript type stripping), so the images always match the copy.
 *
 *   npm run assets
 *
 * Needs Node 22.6+, Chrome/Chromium (set CHROME_PATH if it isn't found) and
 * network access for Google Fonts. Re-run after changing the headline,
 * case-study names or summaries.
 *
 * No film grain on the cards: noise defeats PNG compression, and link
 * previews (WhatsApp especially) drop images over ~300 KB.
 *
 * Writes:
 *   public/og-image.png            1200x630, home page
 *   public/og/<slug>.png           1200x630, one per case file
 *   app/icon.svg, app/apple-icon.png, app/favicon.ico
 *   public/icon-192.png, public/icon-512.png (web manifest)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildSpecimen } from "../lib/specimen.ts";
import { caseStudies, profile } from "../lib/data.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "stivin-assets-"));

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to your Chrome/Chromium executable.");
  process.exit(1);
}

function screenshot(html, out, width, height) {
  const file = path.join(tmp, `${path.basename(out)}.html`);
  fs.writeFileSync(file, html);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      `--window-size=${width},${height}`,
      "--virtual-time-budget=10000",
      `--screenshot=${out}`,
      pathToFileURL(file).href,
    ],
    { stdio: "ignore" }
  );
  if (out.startsWith(root)) console.log("wrote", path.relative(root, out));
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- The specimen (same geometry as the hero) ----------
const specimen = buildSpecimen();
const specimenSvg = (stroke = 0.016) => `
<svg viewBox="${specimen.viewBox}" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="r"><stop offset="0" stop-color="#f2ede2" stop-opacity=".55"/><stop offset=".5" stop-color="#f2ede2" stop-opacity=".25"/><stop offset="1" stop-color="#f2ede2" stop-opacity="0"/></radialGradient></defs>
  <g fill="url(#r)">${specimen.points.map((p) => `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}"/>`).join("")}</g>
  <g stroke="#f2ede2" stroke-opacity=".8" stroke-width="${stroke}" stroke-linecap="round">${specimen.lines
    .map((l) => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"/>`)
    .join("")}</g>
</svg>`;

// ---------- Social preview card ----------
const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400&family=Playfair+Display:ital,wght@0,700;1,500&family=Special+Elite&display=block" rel="stylesheet">';

function ogHtml({ kicker, title, emphasis, sub }) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{box-sizing:border-box;margin:0}
  html,body{width:1200px;height:630px;background:#000;overflow:hidden}
  body{position:relative;color:#f5f5f5;font-family:Archivo,sans-serif}
  .frame{position:absolute;inset:28px;border:1px solid #5a5a5a}
  .frame:before,.frame:after{content:"";position:absolute;width:18px;height:18px;border:1px solid #a8a8a8}
  .frame:before{top:-1px;left:-1px;border-right:0;border-bottom:0}
  .frame:after{bottom:-1px;right:-1px;border-left:0;border-top:0}
  .spec{position:absolute;right:-40px;top:20px;width:620px;height:620px;opacity:.75}
  .spec svg{width:100%;height:100%}
  .fade{position:absolute;inset:0;background:radial-gradient(60% 75% at 78% 50%,transparent 0%,#000 78%)}
  .content{position:absolute;left:84px;top:78px;right:300px;bottom:70px;display:flex;flex-direction:column}
  .stamp{font-family:"Special Elite",monospace;text-transform:uppercase;letter-spacing:.14em;font-size:17px;color:#cccccc;display:flex;align-items:center;gap:14px}
  .stamp:before{content:"";width:40px;height:1px;background:#a8a8a8}
  h1{margin-top:34px;font-family:"Playfair Display",serif;font-weight:700;font-size:${title.length > 40 ? 64 : 84}px;line-height:1.02;letter-spacing:-.03em}
  h1 em{font-weight:500;color:#cccccc}
  p.sub{margin-top:26px;font-size:24px;line-height:1.45;color:#cccccc;font-weight:300;max-width:740px}
  .foot{margin-top:auto;font-family:"Special Elite",monospace;text-transform:uppercase;letter-spacing:.1em;font-size:16px;color:#a8a8a8;display:flex;gap:28px}
  </style></head><body>
  <div class="spec">${specimenSvg()}</div><div class="fade"></div>
  <div class="frame"></div>
  <div class="content">
    <div class="stamp">${esc(kicker)}</div>
    <h1>${esc(title)}${emphasis ? ` <em>${esc(emphasis)}</em>` : ""}</h1>
    ${sub ? `<p class="sub">${esc(sub)}</p>` : ""}
    <div class="foot"><span>${esc(profile.name)}</span><span>${esc(profile.role)}</span><span>stivin.vercel.app</span></div>
  </div>
  </body></html>`;
}

const clip = (s, n) => (s.length > n ? s.slice(0, s.lastIndexOf(" ", n)) + "…" : s);

screenshot(
  ogHtml({
    kicker: `${profile.handle} — Frontend / Full-Stack · ${profile.location}`,
    title: "I build fintech and enterprise products people trust with",
    emphasis: "their money and their work.",
  }),
  path.join(root, "public/og-image.png"),
  1200,
  630
);

for (const c of caseStudies) {
  screenshot(
    ogHtml({
      kicker: `Case file No. ${c.number} — ${c.kind}`,
      title: c.name,
      sub: clip(c.summary, 180),
    }),
    path.join(root, `public/og/${c.slug}.png`),
    1200,
    630
  );
}

// ---------- Favicon set: a small engraved icosahedron on black ----------
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#000"/>
  <circle cx="32" cy="32" r="27" fill="none" stroke="#5a5a5a" stroke-width="1.2"/>
  <g transform="translate(32 32) scale(${(22 / 2.3).toFixed(3)})" fill="none" stroke="#f2ede2" stroke-width="${(1.5 / (22 / 2.3)).toFixed(3)}" stroke-linecap="round" stroke-linejoin="round">
    ${icosahedronEdges()
      .map(([a, b]) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`)
      .join("")}
  </g>
</svg>
`;
fs.writeFileSync(path.join(root, "app/icon.svg"), ICON_SVG);
console.log("wrote app/icon.svg");

/** Undivided icosahedron (30 edges) so it stays legible at 16px. */
function icosahedronEdges() {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]]
    .map((p) => { const l = Math.hypot(...p); return p.map((n) => (n / l) * 2.15); });
  const rx = -0.3, ry = 0.6, rz = 0.1;
  const a = Math.cos(rx), b = Math.sin(rx), c = Math.cos(ry), d = Math.sin(ry), e = Math.cos(rz), f = Math.sin(rz);
  const proj = ([x, y, z]) => {
    const X = c * e * x - c * f * y + d * z;
    const Y = (a * f + b * e * d) * x + (a * e - b * f * d) * y - b * c * z;
    const Z = (b * f - a * e * d) * x + (b * e + a * f * d) * y + a * c * z;
    const s = 8.5 / (8.5 - Z);
    return [+(X * s).toFixed(3), +(-Y * s).toFixed(3)];
  };
  const edges = [];
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++)
      if (Math.abs(Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]) - 2.261) < 0.05) edges.push([proj(v[i]), proj(v[j])]);
  return edges;
}

const iconHtml = (size) =>
  `<!doctype html><html><head><style>*{margin:0}html,body{width:${size}px;height:${size}px;background:#000;overflow:hidden}svg{display:block;width:${size}px;height:${size}px}</style></head><body>${ICON_SVG.replace(
    'rx="12"',
    'rx="0"'
  )}</body></html>`;

screenshot(iconHtml(180), path.join(root, "app/apple-icon.png"), 180, 180);
screenshot(iconHtml(192), path.join(root, "public/icon-192.png"), 192, 192);
screenshot(iconHtml(512), path.join(root, "public/icon-512.png"), 512, 512);
const png32 = path.join(tmp, "favicon-32.png");
const png48 = path.join(tmp, "favicon-48.png");
screenshot(iconHtml(32), png32, 32, 32);
screenshot(iconHtml(48), png48, 48, 48);

// ICO container with embedded PNGs (supported by every current browser).
function writeIco(out, entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  let offset = 6 + entries.length * 16;
  const dir = [];
  const blobs = [];
  for (const { size, file } of entries) {
    const data = fs.readFileSync(file);
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    dir.push(e);
    blobs.push(data);
  }
  fs.writeFileSync(out, Buffer.concat([header, ...dir, ...blobs]));
  console.log("wrote", path.relative(root, out));
}
writeIco(path.join(root, "app/favicon.ico"), [
  { size: 32, file: png32 },
  { size: 48, file: png48 },
]);

fs.rmSync(tmp, { recursive: true, force: true });
