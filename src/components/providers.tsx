"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Client boundary for React Query.
// This component exists specifically to isolate the QueryClientProvider
// from the root layout, which allows layout.tsx to remain a Server Component.
// DO NOT convert layout.tsx to 'use client' just to add providers — that's
// the SDE-1 trap. Instead, only this wrapper is client-side.

export function Providers({ children }: { children: React.ReactNode }) {
  // useState ensures a single QueryClient instance per session
  // (not shared between users on the server)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
