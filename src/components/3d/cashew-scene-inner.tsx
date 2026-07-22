"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── 1. Only Normal Raw Cashew Texture ───────────────────────────────────────
function loadRawTexture(): THREE.Texture {
  if (typeof window === "undefined") return new THREE.Texture();
  const loader = new THREE.TextureLoader();
  const tex = loader.load("/assets/cashews/raw.png");
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

// ─── Pass-through GLSL Shader ────────────────────────────────────────────────
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

// Global scroll & pointer interaction state
const scrollState = { progress: 0 };
const pointerWorld = { x: -9999, y: -9999, active: false };

// ─── Interactive Cashew Billboard with Cursor/Touch Avoidance ───────────────
function CashewBillboard({
  basePosition,
  size,
  dropDelay,
  dropDistance,
  tumbleSpeed,
  rotOffset,
  swayFreq,
  swayAmp,
  overflowSpeed,
  isBaseBed,
}: {
  basePosition: [number, number, number];
  size: number;
  dropDelay: number;
  dropDistance: number;
  tumbleSpeed: number;
  rotOffset: number;
  swayFreq: number;
  swayAmp: number;
  overflowSpeed: number;
  isBaseBed?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pushOffset = useRef({ x: 0, y: 0 });

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

    // 2. Initial Drop Entrance: Shower down on load & settle
    const activeTime = Math.max(0, elapsedTime - dropDelay);
    const dropDuration = 1.2;
    const rawProgress = Math.min(activeTime / dropDuration, 1.0);
    const dropEase = 1 - Math.pow(1 - rawProgress, 3.5);
    const bounceSettle = Math.sin(rawProgress * Math.PI * 1.5) * (1 - rawProgress) * 0.3;
    const entranceOffsetY = (1 - dropEase) * dropDistance + bounceSettle;

    // 3. Ambient float vs stationary base bed
    const swayX = isBaseBed ? 0 : Math.sin(elapsedTime * swayFreq + rotOffset) * swayAmp;
    const swayY = isBaseBed ? 0 : Math.cos(elapsedTime * (swayFreq * 0.7) + rotOffset) * (swayAmp * 0.4);

    // 4. Scroll Overflow Physics
    const overflowRiseY = p * 13 * overflowSpeed;

    // Target positions before cursor repulsion
    const targetX = baseX + swayX + Math.sin(p * Math.PI * 2 + rotOffset) * (isBaseBed ? 0.4 : 1.2);
    const targetY = baseY + entranceOffsetY + overflowRiseY + swayY;

    // 5. Cursor & Touch Repulsion Physics ("move around cursor/touch")
    let targetPushX = 0;
    let targetPushY = 0;

    if (pointerWorld.active && !isBaseBed) {
      const dx = targetX - pointerWorld.x;
      const dy = targetY - pointerWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 3.8;

      if (dist < radius && dist > 0.01) {
        const force = (1 - dist / radius) * 2.2;
        targetPushX = (dx / dist) * force;
        targetPushY = (dy / dist) * force;
      }
    }

    // Smooth lerp push offsets
    pushOffset.current.x += (targetPushX - pushOffset.current.x) * 0.12;
    pushOffset.current.y += (targetPushY - pushOffset.current.y) * 0.12;

    meshRef.current.position.x = targetX + pushOffset.current.x;
    meshRef.current.position.y = targetY + pushOffset.current.y;

    // 6. Tumbling & Rotation
    const entranceRot = (1 - dropEase) * Math.PI * 2;
    const scrollRot = p * Math.PI * 3 * tumbleSpeed;
    const ambientRot = isBaseBed ? 0 : Math.sin(elapsedTime * 0.5 + rotOffset) * 0.15;
    const pushRot = pushOffset.current.x * 0.15;

    meshRef.current.rotation.z = rotOffset + entranceRot + scrollRot + ambientRot + pushRot;

    // 7. Scale
    const currentScale = size * (0.4 + 0.6 * dropEase) * (1.0 + p * 0.3);
    meshRef.current.scale.set(currentScale, currentScale, 1);
  });

  return (
    <mesh ref={meshRef} position={basePosition} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

// ─── Pointer/Cursor Tracker Component ───────────────────────────────────────
function PointerTracker() {
  const { viewport } = useThree();

  useEffect(() => {
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;

      pointerWorld.x = (normX * viewport.width) / 2;
      pointerWorld.y = (normY * viewport.height) / 2;
      pointerWorld.active = true;
    };

    const onPointerLeave = () => {
      pointerWorld.active = false;
      pointerWorld.x = -9999;
      pointerWorld.y = -9999;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchend", onPointerLeave);
    window.addEventListener("touchcancel", onPointerLeave);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchstart", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchend", onPointerLeave);
      window.removeEventListener("touchcancel", onPointerLeave);
    };
  }, [viewport]);

  return null;
}

// ─── Generate Dynamic Fully Randomized Cashew Positions on Every Load ────────
function generateRandomizedCashewLayers() {
  const items = [];

  // ── Tier 1: Dense Base Bed (34 Cashews densely packing bottom 30%) ──────────
  for (let i = 0; i < 34; i++) {
    const z = -3.0 + Math.random() * 4.5;
    const x = -11.5 + (i / 33) * 23 + (Math.random() - 0.5) * 1.4;
    const y = -5.8 + Math.random() * 2.8;

    items.push({
      id: `base-${i}`,
      basePosition: [x, y, z] as [number, number, number],
      size: 2.2 + Math.random() * 1.5,
      dropDelay: Math.random() * 0.65,
      dropDistance: 15 + Math.random() * 8,
      tumbleSpeed: (Math.random() - 0.5) * 1.2,
      rotOffset: Math.random() * Math.PI * 2,
      swayFreq: 0,
      swayAmp: 0,
      overflowSpeed: 0.85 + Math.random() * 0.8,
      isBaseBed: true,
    });
  }

  // ── Tier 2: 3-Zone Balanced Upper Floating Layer (18 Floating Cashews) ──────
  const zones = [
    { name: "left", xMin: -9.5, xMax: -3.5, count: 6 },
    { name: "center", xMin: -2.8, xMax: 2.8, count: 6 },
    { name: "right", xMin: 3.5, xMax: 9.5, count: 6 },
  ];

  let idCount = 0;
  zones.forEach((zone) => {
    for (let i = 0; i < zone.count; i++) {
      const z = -2.5 + Math.random() * 4.0;
      const x = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
      const y = -1.0 + Math.random() * 5.6;

      items.push({
        id: `float-${zone.name}-${idCount++}`,
        basePosition: [x, y, z] as [number, number, number],
        size: 1.4 + Math.random() * 1.1,
        dropDelay: 0.2 + Math.random() * 0.5,
        dropDistance: 12 + Math.random() * 8,
        tumbleSpeed: (Math.random() - 0.5) * 1.8,
        rotOffset: Math.random() * Math.PI * 2,
        swayFreq: 0.6 + Math.random() * 0.7,
        swayAmp: 0.25 + Math.random() * 0.35,
        overflowSpeed: 0.7 + Math.random() * 0.9,
        isBaseBed: false,
      });
    }
  });

  return items;
}

function CashewSceneComposition() {
  // Generate a brand-new randomized arrangement every single time the page loads / mounts!
  const cashewParticles = useMemo(() => generateRandomizedCashewLayers(), []);

  return (
    <>
      <PointerTracker />
      {cashewParticles.map((c) => (
        <CashewBillboard key={c.id} {...c} />
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
      <CashewSceneComposition />
    </Canvas>
  );
}
