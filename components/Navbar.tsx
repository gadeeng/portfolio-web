'use client';

// Navbar pill styles dikelola di globals.css
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

// ── Component ───────────────────────────────────────────────────────

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Connect', href: '/#connect' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [mounted, setMounted] = useState(false);
  const pillRef = useRef<HTMLSpanElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onHashChange = () => setCurrentHash(window.location.hash);

    onHashChange();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/' && (!currentHash || currentHash === '#hero');
    }
    if (href.startsWith('/#')) {
      const targetHash = href.replace('/', '');
      return pathname === '/' && currentHash === targetHash;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }, [pathname, currentHash]);

  // Move pill to active tab
  const movePillTo = useCallback((element: HTMLAnchorElement | null, animate: boolean = true) => {
    if (!element || !pillRef.current) return;

    const pill = pillRef.current;
    const left = element.offsetLeft;
    const width = element.offsetWidth;

    if (!animate) {
      const prevTransition = pill.style.transition;
      pill.style.transition = 'none';
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${width}px`;
      void pill.offsetWidth; // Force reflow
      pill.style.transition = prevTransition;
    } else {
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${width}px`;
    }
  }, []);

  // Initial pill position on mount (no animation)
  useEffect(() => {
    if (mounted && pillRef.current && navRefs.current.length > 0) {
      const activeIndex = navItems.findIndex((item) => isActive(item.href));
      if (activeIndex !== -1 && navRefs.current[activeIndex]) {
        requestAnimationFrame(() => {
          movePillTo(navRefs.current[activeIndex], false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Update pill position when active tab changes (smooth glide)
  useEffect(() => {
    if (!mounted) return;
    
    const activeIndex = navItems.findIndex((item) => isActive(item.href));
    
    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      requestAnimationFrame(() => {
        movePillTo(navRefs.current[activeIndex], true);
      });
    }
  }, [pathname, currentHash, mounted, isActive, movePillTo]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!mounted) return;
      const activeIndex = navItems.findIndex((item) => isActive(item.href));
      if (activeIndex !== -1 && navRefs.current[activeIndex]) {
        movePillTo(navRefs.current[activeIndex], false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted, isActive, movePillTo]);

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-5 sm:top-6 z-50 -translate-x-1/2 transition-transform duration-200"
    >
      <div
        className={`flex items-center gap-0.5 sm:gap-1 rounded-full px-1.5 py-1 border border-foreground/8 bg-background/85 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="relative flex items-center gap-0.5">
          {/* Sliding pill indicator */}
          <span
            ref={pillRef}
            className="navbar-pill"
            aria-hidden="true"
            style={{ color: 'var(--foreground)' }}
          />

          {navItems.map((item, index) => (
            <Link
              key={item.href}
              ref={(el) => {
                navRefs.current[index] = el;
              }}
              href={item.href}
              prefetch={true}
              onClick={() => {
                if (item.href.includes('#')) {
                  setCurrentHash(item.href.substring(item.href.indexOf('#')));
                } else {
                  setCurrentHash('');
                }
                // Immediate pill animation on click
                if (navRefs.current[index]) {
                  movePillTo(navRefs.current[index], true);
                }
              }}
              className={`focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 sm:px-3.5 sm:py-1 sm:text-[13px] z-10 ${ 
                isActive(item.href)
                  ? 'text-foreground'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Subtle separator */}
        <div className="mx-0.5 h-3.5 w-[1px] bg-foreground/12" aria-hidden="true" />

        {/* Dark / Light Mode Switch Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="focus-ring relative inline-flex h-7 w-7 sm:h-7.5 sm:w-7.5 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/6 hover:text-foreground active:scale-95"
        >
          {mounted ? (
            theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-3.5 w-3.5 transition-transform duration-300 hover:-rotate-12" />
            )
          ) : (
            <span className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </nav>
  );
}

