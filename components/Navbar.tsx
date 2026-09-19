'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Connect', href: '/#connect' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [mounted, setMounted] = useState(false);

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

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' && (!currentHash || currentHash === '#hero');
    }
    if (href.startsWith('/#')) {
      const targetHash = href.replace('/', '');
      return pathname === '/' && currentHash === targetHash;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
    >
      <div
        className={`flex items-center gap-1 rounded-full p-1.5 border border-foreground/8 bg-background/85 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <ul className="relative flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                onClick={() => {
                  if (item.href.includes('#')) {
                    setCurrentHash(item.href.substring(item.href.indexOf('#')));
                  } else {
                    setCurrentHash('');
                  }
                }}
                className={`focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-4 sm:text-sm ${
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {isActive(item.href) && (
                  <span className="absolute inset-0 rounded-full bg-foreground/8" />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Subtle separator */}
        <div className="mx-1 h-4 w-[1px] bg-foreground/12" aria-hidden="true" />

        {/* Dark / Light Mode Switch Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="focus-ring relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/6 hover:text-foreground active:scale-95"
        >
          {mounted ? (
            theme === 'dark' ? (
              <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-300 hover:-rotate-12" />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
        </button>
      </div>
    </nav>
  );
}

