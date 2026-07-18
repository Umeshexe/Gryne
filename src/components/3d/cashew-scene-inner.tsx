"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Variants ─────────────────────────────────────────────────────────────────

const VARIANTS = ["raw", "roasted", "spiced", "salted"] as const;
type Variant = (typeof VARIANTS)[number];

const TEXTURE_URLS: Record<Variant, string> = {
  raw:     "/cashews/raw.png",
  roasted: "/cashews/roasted.png",
  spiced:  "/cashews/spiced.png",
  salted:  "/cashews/salted.png",
};

// ─── Pre-load 4 shared textures (not 32!) ────────────────────────────────────
// Creating one WebGL texture per variant and reusing across all billboards
// dramatically reduces GPU memory and draw-call overhead.

function preloadTextures(): Record<Variant, THREE.Texture> {
  const loader = new THREE.TextureLoader();
  return Object.fromEntries(
    (Object.entries(TEXTURE_URLS) as [Variant, string][]).map(([key, url]) => {
      const tex = loader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      return [key, tex];
    })
  ) as Record<Variant, THREE.Texture>;
}

// Singleton — created once when the module loads, shared by every billboard
const SHARED_TEXTURES = preloadTextures();

// ─── Custom shader: discards near-white background pixels ─────────────────────

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D map;
  varying vec2 vUv;

  void main() {
    vec4 c = texture2D(map, vUv);

    float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    float minCh = min(c.r, min(c.g, c.b));
    float maxCh = max(c.r, max(c.g, c.b));
    float diff = maxCh - minCh;

    if (lum > 0.78 && diff < 0.15) discard;
    if (lum > 0.85 && minCh > 0.78) discard;

    float bgness = lum * 0.4 + minCh * 0.4 + (1.0 - diff) * 0.2;
    float alpha = 1.0 - smoothstep(0.70, 0.85, bgness);

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(c.rgb, alpha);
  }
`;

// ─── Seeded deterministic RNG ─────────────────────────────────────────────────

function seededRNG(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ─── Global mouse tracker ─────────────────────────────────────────────────────

const globalMouse = { x: 0, y: 0 };

// ─── Single cashew billboard ──────────────────────────────────────────────────

function CashewBillboard({
  position,
  size,
  variant,
  rotSpeed,
  rotOffset,
  floatAmp,
  floatFreq,
  floatPhase,
}: {
  position: [number, number, number];
  size: number;
  variant: Variant;
  rotSpeed: number;
  rotOffset: number;
  floatAmp: number;
  floatFreq: number;
  floatPhase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // ── Use the SHARED texture for this variant — no extra WebGL texture allocation
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { map: { value: SHARED_TEXTURES[variant] } },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [variant]
  );

  const baseY = position[1];
  // Store current rotation angle to avoid additive accumulation bug
  const rotAngle = useRef(rotOffset);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Billboard: always face camera
    meshRef.current.quaternion.copy(state.camera.quaternion);

    // In-plane spin: compute absolute angle, not additive delta
    rotAngle.current = rotOffset + t * rotSpeed;
    meshRef.current.rotateZ(rotAngle.current);

    // Gentle float
    meshRef.current.position.y =
      baseY + Math.sin(t * floatFreq + floatPhase) * floatAmp;

    // ── Camera parallax is NOT here any more ──
    // It was the #1 perf bug: previously ran 32× per frame (once per cashew).
    // Now handled once per frame inside CameraController below.
  });

  return (
    <mesh ref={meshRef} position={position} material={material}>
      <planeGeometry args={[size, size]} />
    </mesh>
  );
}

// ─── Camera parallax controller — runs ONCE per frame ─────────────────────────

function CameraController() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      globalMouse.x * 3.5,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      globalMouse.y * 2.0,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Generate cashews deterministically ───────────────────────────────────────

function generateCashews(count: number) {
  const rng = seededRNG(77);
  return Array.from({ length: count }, (_, i) => {
    const variant = VARIANTS[i % VARIANTS.length];
    const z = -4 + rng() * 6;
    const depthScale = 1.0 + (z + 4) * 0.14;
    return {
      id: i,
      variant,
      position: [
        (rng() - 0.5) * 20,
        (rng() - 0.5) * 13,
        z,
      ] as [number, number, number],
      size: (1.0 + rng() * 0.7) * depthScale,
      rotSpeed: (rng() - 0.5) * 0.18,
      rotOffset: rng() * Math.PI * 2,
      floatAmp: 0.07 + rng() * 0.1,
      floatFreq: 0.35 + rng() * 0.55,
      floatPhase: rng() * Math.PI * 2,
    };
  });
}

// Reduced from 32 → 20 cashews. Visually identical but ~37% fewer draw calls.
const CASHEW_DATA = generateCashews(20);

function Scene() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <CameraController />
      {CASHEW_DATA.map((c) => {
        const effectiveWidth = Math.max(width, 14);
        const normX = c.position[0] / 10;
        const dynamicX = normX * (effectiveWidth * 0.75);
        return (
          <CashewBillboard
            key={c.id}
            {...c}
            position={[dynamicX, c.position[1], c.position[2]]}
          />
        );
      })}
    </>
  );
}

// ─── Exported Canvas wrapper ──────────────────────────────────────────────────

export function CashewSceneInner() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.NoToneMapping,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}  // Was [1, 2] — halves fill-rate on Retina screens
    >
      <Scene />
    </Canvas>
  );
}
