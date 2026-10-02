'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Complete progress bar when pathname changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Jump to 100%
      setProgress(100);

      const fadeTimer = setTimeout(() => {
        setVisible(false);
        const resetTimer = setTimeout(() => {
          setProgress(0);
        }, 200);
        return () => clearTimeout(resetTimer);
      }, 150);

      return () => clearTimeout(fadeTimer);
    }
  }, [pathname]);

  // Intercept click on links to start progress bar instantly
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore anchor/hash links on the same page, external links, mailto, etc.
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http') ||
        target.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      // Check if navigating to a different pathname
      const targetUrl = new URL(href, window.location.origin);
      if (targetUrl.pathname === window.location.pathname) {
        return;
      }

      // Start progress bar immediately
      setVisible(true);
      setProgress(25);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setProgress(70);
      }, 120);
    };

    window.addEventListener('click', handleClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999999] h-[2.5px] w-full"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease-out',
      }}
    >
      <div
        className="h-full bg-[#e60012]"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? 'width 0.15s ease-out' : 'width 0.3s cubic-bezier(0.1, 0.9, 0.2, 1)',
          boxShadow: '0 0 10px rgba(230, 0, 18, 0.8), 0 0 4px rgba(230, 0, 18, 1)',
        }}
      />
    </div>
  );
}
