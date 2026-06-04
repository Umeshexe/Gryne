"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Cashew SVG Shape ──────────────────────────────────────────────────────────
// A true crescent/kidney cashew shape drawn as an SVG path.
// The cursor is this SVG rotating toward movement direction.

function CashewSVG({ isHover, isClick }: { isHover: boolean; isClick: boolean }) {
  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 54 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Main cashew body — crescent/kidney shape */}
      <path
        d="M 48,10 C 50,4 44,0 36,1 C 24,2 10,8 5,18 C 1,25 4,34 12,37 C 20,40 32,38 40,32 C 48,26 50,18 48,10 Z"
        fill={isClick ? "#18FF00" : isHover ? "#3B28FF" : "#1A1430"}
        stroke={isHover ? "#18FF00" : isClick ? "#3B28FF" : "rgba(59,40,255,0.6)"}
        strokeWidth="1.5"
      />
      {/* Inner hollow cut — makes it look like a real cashew crescent */}
      <path
        d="M 38,12 C 40,8 36,5 30,6 C 22,7 14,13 11,20 C 9,25 12,30 18,31 C 24,32 32,28 37,22 C 41,17 40,14 38,12 Z"
        fill={isClick ? "#0BCC00" : isHover ? "#2518CC" : "#F7F2E8"}
        stroke="none"
      />
      {/* Tip nub */}
      <ellipse
        cx="47"
        cy="11"
        rx="3.5"
        ry="2.5"
        fill={isClick ? "#18FF00" : isHover ? "#3B28FF" : "#1A1430"}
        transform="rotate(-20 47 11)"
      />
    </svg>
  );
}

// ─── Holographic Glow Rings ────────────────────────────────────────────────────
// Multi-layered CSS animated rings radiating from cursor on hover

function HoloRings({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: active ? `${60 + i * 28}px` : `${28 + i * 12}px`,
            height: active ? `${60 + i * 28}px` : `${28 + i * 12}px`,
            borderColor: [
              "rgba(59,40,255,0.5)",
              "rgba(24,255,0,0.35)",
              "rgba(232,201,122,0.25)",
            ][i],
            opacity: active ? 0.8 - i * 0.22 : 0.3 - i * 0.08,
            animation: `spin-ring-${i} ${2.5 + i * 0.8}s linear infinite`,
            transform: `rotate(${i * 60}deg)`,
            transition: "width 0.35s ease, height 0.35s ease, opacity 0.35s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── Particle Field (Canvas) ───────────────────────────────────────────────────

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
};

const PARTICLE_COLORS = [
  "rgba(59,40,255,",   // royal blue
  "rgba(24,255,0,",    // lime
  "rgba(212,168,83,",  // cashew gold
  "rgba(26,20,48,",    // near-black navy
];

function useParticleField(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const mouseRef = useRef({ x: -999, y: -999 });
  const animRef  = useRef<number>(0);
  const partsRef = useRef<Particle[]>([]);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(80, Math.floor((w * h) / 18000));
    partsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.4 + 0.15,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      initParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      const parts = partsRef.current;

      // Draw connection lines between nearby particles
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x;
          const dy = parts[i].y - parts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.strokeStyle = `rgba(59,40,255,${0.06 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles + react to mouse
      for (const p of parts) {
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        const REPEL = 110;

        if (distM < REPEL) {
          // Repel from cursor — scatter effect
          const force = (REPEL - distM) / REPEL;
          p.vx += (dxm / distM) * force * 1.6;
          p.vy += (dym / distM) * force * 1.6;
        }

        // Dampen velocity
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Soft-wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulse alpha near cursor
        const glow = distM < REPEL ? (1 - distM / REPEL) * 0.6 : 0;
        const a = Math.min(1, p.alpha + glow);

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${a.toFixed(2)})`;
        ctx.fill();

        // Draw cursor-proximity glow ring
        if (distM < REPEL) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 3 * (1 - distM / REPEL), 0, Math.PI * 2);
          ctx.strokeStyle = `${p.color}${(glow * 0.5).toFixed(2)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef, initParticles]);
}

// ─── Main Cursor Provider ──────────────────────────────────────────────────────

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null!);
  useParticleField(canvasRef);

  // Mouse tracking — raw + spring
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const curX = useSpring(rawX, { damping: 32, stiffness: 280, mass: 0.6 });
  const curY = useSpring(rawY, { damping: 32, stiffness: 280, mass: 0.6 });

  const lastPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angle - 20); // offset so cashew tip points forward
      }
      lastPos.current = { x: e.clientX, y: e.clientY };
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHover(!!el.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    const onDown = () => setIsClick(true);
    const onUp   = () => setIsClick(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isMobile, isVisible, rawX, rawY]);

  return (
    <>
      {!isMobile && (
        <>
          {/* Spin-ring keyframes injected once */}
          <style>{`
            * { cursor: none !important; }
            @keyframes spin-ring-0 { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
            @keyframes spin-ring-1 { from { transform: rotate(120deg); } to { transform: rotate(480deg);  } }
            @keyframes spin-ring-2 { from { transform: rotate(240deg); } to { transform: rotate(-120deg); } }
            @keyframes cashew-breathe {
              0%, 100% { filter: drop-shadow(0 0 4px rgba(59,40,255,0.7)) drop-shadow(0 0 10px rgba(59,40,255,0.3)); }
              50%       { filter: drop-shadow(0 0 8px rgba(24,255,0,0.8))  drop-shadow(0 0 20px rgba(24,255,0,0.4));  }
            }
          `}</style>

          {/* ── Interactive particle field canvas (fixed, behind everything) ── */}
          <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1, opacity: 0.55 }}
          />

          {/* ── Cashew cursor ── */}
          {isVisible && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none"
              style={{
                x: curX,
                y: curY,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 9999,
                rotate: rotation,
              }}
              transition={{ rotate: { duration: 0.25, ease: "easeOut" } }}
            >
              {/* Holographic rings */}
              <HoloRings active={isHover} />

              {/* Cashew body */}
              <motion.div
                animate={{
                  scale: isClick ? 0.82 : isHover ? 1.25 : 1,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  animation: "cashew-breathe 3s ease-in-out infinite",
                }}
              >
                <CashewSVG isHover={isHover} isClick={isClick} />
              </motion.div>

              {/* Click burst spark */}
              {isClick && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 2.5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-accent" />
                </motion.div>
              )}
            </motion.div>
          )}
        </>
      )}

      {children}
    </>
  );
}

// Keep named export for layout compatibility
export function useCursor() {
  return { setCursorType: () => {} };
}
