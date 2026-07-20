"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── 1. Only Normal Raw Cashew Texture ───────────────────────────────────────
function loadRawTexture(): THREE.Texture {
  if (typeof window === "undefined") return new THREE.Texture();
  const loader = new THREE.TextureLoader();
  const tex = loader.load("/cashews/raw.png");
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.premultiplyAlpha = false;
  return tex;
}

let SHARED_RAW_TEXTURE: THREE.Texture | null = null;
function getRawTexture() {
  if (!SHARED_RAW_TEXTURE) {
    SHARED_RAW_TEXTURE = loadRawTexture();
  }
  return SHARED_RAW_TEXTURE;
}

// ─── GLSL Pass-through Shader ────────────────────────────────────────────────
const VERTEX_SHADER = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  uniform sampler2D map;
  varying vec2 vUv;

  void main() {
    vec4 c = texture2D(map, vUv);
    if (c.a < 0.05) discard;
    gl_FragColor = c;
  }
`;

// ─── Deterministic RNG ────────────────────────────────────────────────────────
function seededRNG(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// Global scroll state
const scrollState = { progress: 0 };

// ─── Single Particle Cashew Billboard with Physics Entrance & Scroll Fill ─────
function ParticleCashewBillboard({
  basePosition,
  size,
  dropDelay,
  dropDistance,
  tumbleSpeed,
  rotOffset,
  swayFreq,
  swayAmp,
  cascadeFactor,
}: {
  basePosition: [number, number, number];
  size: number;
  dropDelay: number;
  dropDistance: number;
  tumbleSpeed: number;
  rotOffset: number;
  swayFreq: number;
  swayAmp: number;
  cascadeFactor: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { map: { value: getRawTexture() } },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  const [baseX, baseY] = basePosition;

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsedTime = state.clock.elapsedTime;
    const p = scrollState.progress;

    // 1. Billboard orientation: face camera
    meshRef.current.quaternion.copy(state.camera.quaternion);

    // 2. Entrance "Particle Fill" Drop Progress (0 to 1 with spring easing)
    const activeTime = Math.max(0, elapsedTime - dropDelay);
    const dropDuration = 1.2;
    const rawDropProgress = Math.min(activeTime / dropDuration, 1.0);
    // Cubic ease-out with slight bounce
    const easeDrop = 1 - Math.pow(1 - rawDropProgress, 3);

    // Initial shower drop distance: starts above screen, drops into place
    const entranceOffsetY = (1 - easeDrop) * dropDistance;

    // 3. Organic Scroll & Float Physics
    const scrollOffsetY = p * 14 * cascadeFactor;
    const swayX = Math.sin(elapsedTime * swayFreq + rotOffset) * swayAmp;
    const swayY = Math.cos(elapsedTime * (swayFreq * 0.8) + rotOffset) * (swayAmp * 0.5);

    // Final Y & X position calculation
    meshRef.current.position.y = baseY + entranceOffsetY - scrollOffsetY + swayY;
    meshRef.current.position.x = baseX + swayX + Math.sin(p * Math.PI * 1.5 + rotOffset) * 1.2;

    // 4. Organic Tumble & Rotation
    const entranceRot = (1 - easeDrop) * Math.PI * 2;
    const scrollRot = p * Math.PI * 4 * tumbleSpeed;
    const ambientRot = Math.sin(elapsedTime * 0.5 + rotOffset) * 0.15;

    meshRef.current.rotation.z = rotOffset + entranceRot + scrollRot + ambientRot;

    // 5. Scale progress: slightly grows as it drops in & expands on scroll
    const currentScale = size * (0.4 + 0.6 * easeDrop) * (1.0 + p * 0.3);
    meshRef.current.scale.set(currentScale, currentScale, 1);
  });

  return (
    <mesh ref={meshRef} position={basePosition} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

// ─── Generate 22 Organic Raw Cashew Particles ─────────────────────────────────
function generateRawCashewParticles(count: number) {
  const rng = seededRNG(202);
  return Array.from({ length: count }, (_, i) => {
    const z = -3.5 + rng() * 5.5;
    return {
      id: i,
      basePosition: [
        (rng() - 0.5) * 19,
        (rng() - 0.5) * 11 + 0.5,
        z,
      ] as [number, number, number],
      size: 1.3 + rng() * 1.3,
      dropDelay: rng() * 0.7,            // Staggered shower entry delay
      dropDistance: 10 + rng() * 8,       // Starts 10-18 units above screen
      tumbleSpeed: (rng() - 0.5) * 1.8,   // Organic positive or negative tumble speed
      rotOffset: rng() * Math.PI * 2,
      swayFreq: 0.6 + rng() * 0.8,
      swayAmp: 0.15 + rng() * 0.25,
      cascadeFactor: 0.6 + rng() * 0.9,
    };
  });
}

const RAW_PARTICLES = generateRawCashewParticles(22);

function RawParticleScene() {
  return (
    <>
      {RAW_PARTICLES.map((c) => (
        <ParticleCashewBillboard key={c.id} {...c} />
      ))}
    </>
  );
}

// ─── Exported Canvas Wrapper ──────────────────────────────────────────────────
export function CashewSceneInner() {
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
      dpr={[1, 1.5]}
    >
      <RawParticleScene />
    </Canvas>
  );
}
