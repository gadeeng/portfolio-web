'use client';

import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

/** Minimum time (ms) the loading screen is shown before it starts fading out.
 * 850ms gives enough time for initial layout and fonts to settle while feeling snappy. */
const MIN_DISPLAY_MS = 850;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let unmountTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      hideTimer = setTimeout(() => {
        setFadeOut(true);

        // Notify page that loading screen is exiting so heavy 3D/canvases can mount smoothly
        if (typeof window !== 'undefined') {
          (window as any).__portfolioLoaded = true;
          window.dispatchEvent(new Event('portfolio:loaded'));
        }

        // Unmount after CSS fade-out transition finishes
        unmountTimer = setTimeout(() => {
          setVisible(false);
        }, 450);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      window.removeEventListener('load', hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen${fadeOut ? ' loading-screen--out' : ''}`}
      aria-label="Loading"
      role="status"
    >
      {/* Hinomaru Japanese radar pulse spinner */}
      <div className="loading-radar-container" aria-hidden="true">
        <div className="loading-radar-wave wave-1" />
        <div className="loading-radar-wave wave-2" />
        <div className="loading-radar-wave wave-3" />
        <div className="loading-radar-core" />
      </div>

      {/* Typography with Japanese subtitling */}
      <div className="loading-text-wrapper">
        <p className="loading-text">PLEASE WAIT</p>
      </div>
    </div>
  );
}
