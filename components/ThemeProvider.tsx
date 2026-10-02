'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'dark' | 'light';

export type ToggleThemeEvent =
  | React.MouseEvent
  | { clientX: number; clientY: number }
  | undefined;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: ToggleThemeEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Default to dark mode for this portfolio
        setThemeState('dark');
        applyTheme('dark');
      }
    } catch {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem('theme', t);
    } catch {}
    applyTheme(t);
  };

  const toggleTheme = (event?: ToggleThemeEvent) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Check if View Transitions API is supported and motion is not reduced
    const isViewTransitionSupported =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isViewTransitionSupported) {
      setTheme(nextTheme);
      return;
    }

    // Determine circular expansion origin from click position (default: top navbar center-right)
    const x =
      event && 'clientX' in event && typeof event.clientX === 'number'
        ? event.clientX
        : window.innerWidth / 2;
    const y =
      event && 'clientY' in event && typeof event.clientY === 'number'
        ? event.clientY
        : 32;

    // Calculate maximum radius to the furthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 450,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
