"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import avoids Three.js SSR issues — WebGL requires the browser window
const CashewSceneInner = dynamic(
  () => import("./cashew-scene-inner").then((m) => m.CashewSceneInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-primary" />
    ),
  }
);

export function CashewScene() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-primary" />}>
      <CashewSceneInner />
    </Suspense>
  );
}
