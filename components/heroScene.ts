import * as THREE from "three";

/**
 * HeroScene — "Specimen No. 001"
 * -------------------------------
 * A wireframe solid rendered like a plate from an old scientific
 * engraving: monochrome lines only, no fill, no texture, that assemble
 * themselves bottom-to-top on load and rotate slowly under the reader's
 * mouse. Built entirely from procedural geometry (an icosahedron edge
 * set) and hand-written GLSL — no models, textures or images.
 */

const LINE_VERTEX = /* glsl */ `
  uniform float uProgress;
  attribute vec3 aStart;
  attribute float aDelay;
  varying float vAlpha;

  void main() {
    float local = clamp((uProgress - aDelay * 0.75) / max(0.001, 1.0 - aDelay * 0.75), 0.0, 1.0);
    float eased = local * local * (3.0 - 2.0 * local);
    vec3 pos = mix(aStart, position, eased);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vAlpha = eased;
  }
`;

const LINE_FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uOpacity);
  }
`;

const POINT_VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uPixelRatio;
  attribute float aDelay;
  varying float vAlpha;

  void main() {
    float local = clamp((uProgress - aDelay * 0.75) / max(0.001, 1.0 - aDelay * 0.75), 0.0, 1.0);
    float eased = local * local * (3.0 - 2.0 * local);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 3.0 * (220.0 / -mvPosition.z) * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = eased;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    if (core < 0.05) discard;
    gl_FragColor = vec4(uColor, core * vAlpha);
  }
`;

export class HeroScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private group = new THREE.Group();
  private lines!: THREE.LineSegments;
  private points!: THREE.Points;
  private linesMat!: THREE.ShaderMaterial;
  private pointsMat!: THREE.ShaderMaterial;
  private raf = 0;
  private disposed = false;
  private target = { x: 0, y: 0 };

  constructor(private canvas: HTMLCanvasElement, private container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 0, 8.5);

    this.build();
    this.scene.add(this.group);

    this.onResize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove);
    this.animate();
  }

  private build() {
    const base = new THREE.IcosahedronGeometry(2.15, 1);
    const edges = new THREE.EdgesGeometry(base, 1);
    const positionAttr = edges.getAttribute("position") as THREE.BufferAttribute;
    const count = positionAttr.count;

    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < count; i++) {
      const y = positionAttr.getY(i);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    const span = maxY - minY || 1;

    const starts = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = positionAttr.getX(i);
      const y = positionAttr.getY(i);
      const z = positionAttr.getZ(i);

      const radius = 6 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starts[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starts[i * 3 + 2] = radius * Math.cos(phi);

      delays[i] = 1 - (y - minY) / span;
      void x;
      void z;
    }
    edges.setAttribute("aStart", new THREE.BufferAttribute(starts, 3));
    edges.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));

    this.linesMat = new THREE.ShaderMaterial({
      vertexShader: LINE_VERTEX,
      fragmentShader: LINE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uProgress: { value: 0 },
        uColor: { value: new THREE.Color(0xf2ede2) },
        uOpacity: { value: 0.85 },
      },
    });
    this.lines = new THREE.LineSegments(edges, this.linesMat);
    this.group.add(this.lines);

    // A sparser point cloud at the solid's own vertices, for the "rivet"
    // marks you see on engraved technical plates.
    const vertGeo = new THREE.IcosahedronGeometry(2.15, 1);
    const vertPos = vertGeo.getAttribute("position") as THREE.BufferAttribute;
    const vertDelays = new Float32Array(vertPos.count);
    for (let i = 0; i < vertPos.count; i++) {
      const y = vertPos.getY(i);
      vertDelays[i] = 1 - (y - minY) / span;
    }
    vertGeo.setAttribute("aDelay", new THREE.BufferAttribute(vertDelays, 1));

    this.pointsMat = new THREE.ShaderMaterial({
      vertexShader: POINT_VERTEX,
      fragmentShader: POINT_FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uProgress: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColor: { value: new THREE.Color(0xf2ede2) },
      },
    });
    this.points = new THREE.Points(vertGeo, this.pointsMat);
    this.group.add(this.points);

    this.group.rotation.set(-0.3, 0.6, 0.1);
  }

  setProgress(v: number) {
    this.linesMat.uniforms.uProgress.value = v;
    this.pointsMat.uniforms.uProgress.value = v;
  }

  private onPointerMove = (e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    this.target.x = ny * 0.16;
    this.target.y = nx * 0.26;
  };

  private onResize = () => {
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setSize(clientWidth, clientHeight, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.aspect = clientWidth / Math.max(clientHeight, 1);
    this.camera.updateProjectionMatrix();
  };

  private animate = () => {
    if (this.disposed) return;
    this.group.rotation.x += (this.target.x - this.group.rotation.x) * 0.04;
    this.group.rotation.y += (this.target.y + 0.6 - this.group.rotation.y) * 0.04 + 0.0007;
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.animate);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    this.lines?.geometry?.dispose();
    this.points?.geometry?.dispose();
    this.linesMat?.dispose();
    this.pointsMat?.dispose();
    this.renderer?.forceContextLoss();
    this.renderer?.dispose();
  }
}
