'use client';

import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

/** Minimum time (ms) the loading screen is shown before it may fade out. */
const MIN_DISPLAY_MS = 1500;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const hide = () => {
      // Ensure we show the loading screen for at least MIN_DISPLAY_MS
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setFadeOut(true);
        // Unmount after the CSS fade-out transition finishes
        setTimeout(() => setVisible(false), 750);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
      return () => window.removeEventListener('load', hide);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen${fadeOut ? ' loading-screen--out' : ''}`}
      aria-label="Loading"
      role="status"
    >
      {/* DaisyUI loading ring */}
      <span className="loading loading-ring loading-lg" aria-hidden="true" />

      {/* Static loading text */}
      <p className="loading-text">Please Wait</p>
    </div>
  );
}
