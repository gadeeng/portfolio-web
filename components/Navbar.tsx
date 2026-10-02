'use client';

// Navbar pill styles dikelola di globals.css
import React, { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

// ── Component ───────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const pillRef = useRef<HTMLSpanElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isFirstRender = useRef(true);

  // Dynamically target the Connect section on the active page
  const connectHref = pathname.startsWith('/projects') ? '/projects#connect' : '/#connect';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Connect', href: connectHref },
  ];

  // Active tab index: 0 = Home, 1 = Projects, 2 = Connect
  const activeIndex = useMemo(() => {
    if (currentHash === '#connect') return 2;
    if (pathname.startsWith('/projects')) return 1;
    return 0;
  }, [currentHash, pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect if Connect section is in view
      const connectEl = document.getElementById('connect');
      if (connectEl) {
        const rect = connectEl.getBoundingClientRect();
        const isNearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
        if ((rect.top <= 350 && rect.bottom >= 150) || isNearBottom) {
          setCurrentHash('#connect');
          return;
        }
      }

      if (window.scrollY < 200) {
        setCurrentHash('');
      }
    };

    const onHashChange = () => setCurrentHash(window.location.hash);

    onHashChange();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

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

  // Update pill position when active tab changes, on mount, or on window resize
  useEffect(() => {
    if (!mounted) return;

    const targetEl = navRefs.current[activeIndex];
    if (targetEl) {
      const animate = !isFirstRender.current;
      requestAnimationFrame(() => {
        movePillTo(targetEl, animate);
      });
      isFirstRender.current = false;
    }

    const handleResize = () => {
      if (navRefs.current[activeIndex]) {
        movePillTo(navRefs.current[activeIndex], false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted, activeIndex, movePillTo]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    index: number
  ) => {
    if (href.includes('#')) {
      const hash = href.substring(href.indexOf('#'));
      setCurrentHash(hash);

      const targetPath = href.split('#')[0] || '/';
      const currentPath = pathname.startsWith('/projects') ? '/projects' : '/';
      const isSamePage = targetPath === currentPath;

      if (isSamePage) {
        e.preventDefault();
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    } else {
      setCurrentHash('');
      // If clicking Home while on Home, smooth scroll to top
      if (href === '/' && pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      // If clicking Projects while on Projects, smooth scroll to top
      if (href === '/projects' && pathname === '/projects') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/projects');
      }
    }

    if (navRefs.current[index]) {
      movePillTo(navRefs.current[index], true);
    }
  };

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
              key={item.label}
              ref={(el) => {
                navRefs.current[index] = el;
              }}
              href={item.href}
              prefetch={true}
              onClick={(e) => handleNavClick(e, item.href, index)}
              className={`focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 sm:px-3.5 sm:py-1 sm:text-[13px] z-10 ${
                activeIndex === index
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
          onClick={(e) => toggleTheme(e)}
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
