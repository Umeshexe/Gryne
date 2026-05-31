"use client";

import { Toaster as Sonner } from "sonner";

// Sonner toast wrapper styled to match Gryne's brand palette.
// Sharp corners, high-contrast, hard shadow — consistent with the design system.

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      expand={false}
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            "font-mono text-sm border-2 border-primary rounded-none shadow-[4px_4px_0px_0px_#00261a] bg-canvas-cream text-primary",
          title: "font-bold uppercase tracking-wide",
          description: "text-on-surface-variant text-xs mt-1",
          success:
            "!bg-vibrant-yellow !text-primary !border-primary shadow-[4px_4px_0px_0px_#00261a]",
          error:
            "!bg-primary !text-on-primary !border-vibrant-yellow shadow-[4px_4px_0px_0px_#FFD600]",
          loading: "!bg-electric-blue !text-white !border-primary",
        },
      }}
    />
  );
}
