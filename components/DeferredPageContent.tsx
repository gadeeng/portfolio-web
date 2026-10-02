'use client';

import { useEffect, useState } from 'react';

interface DeferredPageContentProps {
  children: React.ReactNode;
}

/**
 * Holds children in a hidden (opacity-0, pointer-events-none) state until the
 * loading screen has dispatched the `portfolio:loaded` event, at which point it
 * fades the content in.  This prevents the browser from spending GPU/CPU budget
 * painting heavy sections (WebGL nebula, 3D lanyard, canvas backgrounds, bento
 * grids, …) while the loading screen is still visible — the primary cause of
 * loading-screen jank.
 *
 * The DOM IS present immediately (no conditional render), so Next.js still
 * pre-paints the server-rendered HTML and images start preloading via the
 * browser's speculative loader.  We just don't composite / paint anything until
 * the loading screen exits.
 */
export default function DeferredPageContent({ children }: DeferredPageContentProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Already loaded before this component mounted (e.g. fast connection / cached)
    if (typeof window !== 'undefined' && (window as any).__portfolioLoaded) {
      setRevealed(true);
      return;
    }

    const reveal = () => setRevealed(true);
    window.addEventListener('portfolio:loaded', reveal, { once: true });
    return () => window.removeEventListener('portfolio:loaded', reveal);
  }, []);

  return (
    <div
      style={{
        // Use visibility + opacity instead of display:none so images preload
        // and layout is computed, but the compositor skips painting invisible layers.
        opacity: revealed ? 1 : 0,
        // Prevent interaction while hidden
        pointerEvents: revealed ? undefined : 'none',
        // Smooth reveal that mirrors the loading-screen fade-out duration
        transition: revealed ? 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        // Promote to its own compositor layer so reveal is GPU-driven, not on main thread
        willChange: revealed ? 'auto' : 'opacity',
      }}
    >
      {children}
    </div>
  );
}
