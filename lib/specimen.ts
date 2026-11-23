/**
 * "Specimen No. 001", without WebGL.
 *
 * The same icosahedron (radius 2.15, one subdivision) that components/heroScene.ts
 * renders with three.js, rotated the same way and projected through the same
 * camera (fov 40°, z = 8.5). Computed once on the server and drawn as plain
 * SVG, so phones, reduced-motion visitors and browsers without WebGL get the
 * engraving without downloading three.js.
 */

type Vec3 = [number, number, number];

const RADIUS = 2.15;
const CAMERA_Z = 8.5;
const HALF_HEIGHT = CAMERA_Z * Math.tan((20 * Math.PI) / 180); // fov 40° / 2
const ROTATION: Vec3 = [-0.3, 0.6, 0.1]; // matches the scene's starting rotation

const T = (1 + Math.sqrt(5)) / 2;
const BASE_VERTICES: Vec3[] = [
  [-1, T, 0], [1, T, 0], [-1, -T, 0], [1, -T, 0],
  [0, -1, T], [0, 1, T], [0, -1, -T], [0, 1, -T],
  [T, 0, -1], [T, 0, 1], [-T, 0, -1], [-T, 0, 1],
];
const BASE_FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

const toSphere = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [(v[0] / l) * RADIUS, (v[1] / l) * RADIUS, (v[2] / l) * RADIUS];
};
const mid = (a: Vec3, b: Vec3): Vec3 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
const key = (v: Vec3) => v.map((n) => n.toFixed(4)).join(",");

/** Euler XYZ rotation, the same matrix three.js builds for Object3D.rotation. */
function rotate([x, y, z]: Vec3, [rx, ry, rz]: Vec3): Vec3 {
  const a = Math.cos(rx), b = Math.sin(rx);
  const c = Math.cos(ry), d = Math.sin(ry);
  const e = Math.cos(rz), f = Math.sin(rz);
  const ae = a * e, af = a * f, be = b * e, bf = b * f;
  return [
    c * e * x - c * f * y + d * z,
    (af + be * d) * x + (ae - bf * d) * y - b * c * z,
    (bf - ae * d) * x + (be + af * d) * y + a * c * z,
  ];
}

function project(v: Vec3) {
  const r = rotate(v, ROTATION);
  const depth = CAMERA_Z - r[2];
  const s = CAMERA_Z / depth;
  return { x: r[0] * s, y: -r[1] * s, depth };
}

const round = (n: number) => Math.round(n * 1000) / 1000;

export function buildSpecimen() {
  // One subdivision: each face splits into four, new vertices pushed onto the sphere.
  const vertices = new Map<string, Vec3>();
  const edges = new Map<string, [Vec3, Vec3]>();
  const addEdge = (p: Vec3, q: Vec3) => {
    const [k1, k2] = [key(p), key(q)].sort();
    edges.set(`${k1}|${k2}`, [p, q]);
  };

  for (const [i, j, k] of BASE_FACES) {
    const a = toSphere(BASE_VERTICES[i]);
    const b = toSphere(BASE_VERTICES[j]);
    const c = toSphere(BASE_VERTICES[k]);
    const ab = toSphere(mid(a, b));
    const bc = toSphere(mid(b, c));
    const ca = toSphere(mid(c, a));
    for (const [p, q, r] of [[a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]] as Vec3[][]) {
      addEdge(p, q);
      addEdge(q, r);
      addEdge(r, p);
      for (const v of [p, q, r]) vertices.set(key(v), v);
    }
  }

  // Draw order follows the WebGL scene: bottom of the solid first.
  const minY = -RADIUS;
  const span = 2 * RADIUS;
  const delay = (y: number) => round((1 - (y - minY) / span) * 1.1);

  const lines = Array.from(edges.values()).map(([p, q]) => {
    const a = project(p);
    const b = project(q);
    return {
      x1: round(a.x), y1: round(a.y), x2: round(b.x), y2: round(b.y),
      delay: delay(Math.min(p[1], q[1])),
    };
  });

  const points = Array.from(vertices.values()).map((v) => {
    const p = project(v);
    return { cx: round(p.x), cy: round(p.y), r: round(0.24 * (CAMERA_Z / p.depth)), delay: delay(v[1]) };
  });

  const h = round(HALF_HEIGHT);
  return { lines, points, viewBox: `${-h} ${-h} ${2 * h} ${2 * h}` };
}
