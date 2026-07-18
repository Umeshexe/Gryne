"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
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

// ─── Custom shader: discards near-white background pixels ─────────────────────
// Works on any studio-lit image on a white background.
// Luminance > 0.90 AND all channels high → discard (it's background).
// Smooth edge at threshold for anti-aliased look.

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

    // How close is this pixel to pure white or light gray?
    float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    float minCh = min(c.r, min(c.g, c.b));
    float maxCh = max(c.r, max(c.g, c.b));
    float diff = maxCh - minCh;

    // Hard discard for clearly white or light-gray background/shadow pixels.
    // Studio white backgrounds and soft white cast shadows are very bright and highly desaturated.
    if (lum > 0.78 && diff < 0.15) discard;
    if (lum > 0.85 && minCh > 0.78) discard;

    // Smooth alpha falloff at the cashew edge (anti-aliasing)
    // Blend luminance, minimum channel, and lack of color (1.0 - diff) to estimate background-ness.
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

// ─── Global mouse tracker (works even with pointer-events-none on canvas) ─────

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
  const cameraQuatRef = useRef(new THREE.Quaternion());
  const cameraRef = useRef<THREE.Camera | null>(null);

  const texture = useTexture(TEXTURE_URLS[variant]);

  // Custom ShaderMaterial: removes white background, keeps only the cashew
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { map: { value: texture } },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [texture]
  );

  const baseY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Store camera ref for billboard
    cameraRef.current = state.camera;

    // Billboard: always face camera
    meshRef.current.quaternion.copy(state.camera.quaternion);

    // Slow in-plane spin (gives 3D tumbling feel without revealing flatness)
    meshRef.current.rotateZ(rotOffset + t * rotSpeed);

    // Gentle float
    meshRef.current.position.y =
      baseY + Math.sin(t * floatFreq + floatPhase) * floatAmp;

    // Parallax camera follows global mouse (works with pointer-events-none)
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

  return (
    <mesh ref={meshRef} position={position} material={material}>
      <planeGeometry args={[size, size]} />
    </mesh>
  );
}

// ─── Generate 32 cashews deterministically ────────────────────────────────────

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

const CASHEW_DATA = generateCashews(32);

function Scene() {
  useTexture(Object.values(TEXTURE_URLS)); // Preload all
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      {CASHEW_DATA.map((c) => {
        // Spread the X positions. On mobile (small width), don't squish them too much.
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
  // Track mouse at the window level — works even with pointer-events-none on canvas
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
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
