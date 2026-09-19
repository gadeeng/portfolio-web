'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  /**
   * Intersection threshold (0 to 1) at which the element is considered visible.
   * Default: 0.1
   */
  threshold?: number;
  /**
   * Root margin to trigger slightly before/after element enters viewport.
   * Default: '0px 0px -40px 0px'
   */
  rootMargin?: string;
  /**
   * CSS selector for target child elements inside the ref container.
   * Default: '[data-reveal]'
   */
  selector?: string;
  /**
   * Class name applied when element becomes visible.
   * Default: 'reveal-visible'
   */
  visibleClass?: string;
  /**
   * If true, unobserve after first revelation.
   * Default: true
   */
  once?: boolean;
}

/**
 * Custom hook for smooth scroll-triggered reveal animations.
 * Observes container and/or child elements matching `selector`.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -30px 0px',
    selector = '[data-reveal]',
    visibleClass = 'reveal-visible',
    once = true,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Support observing the container itself if it matches selector or if selector is empty
    const elements: HTMLElement[] = [];
    if (container.matches(selector)) {
      elements.push(container);
    }
    const matchedChildren = container.querySelectorAll<HTMLElement>(selector);
    matchedChildren.forEach((child) => elements.push(child));

    if (elements.length === 0) {
      // If no elements matched selector, treat the container itself as the reveal target
      elements.push(container);
    }

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add(visibleClass));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);

            if (delay > 0) {
              setTimeout(() => {
                el.classList.add(visibleClass);
              }, delay);
            } else {
              el.classList.add(visibleClass);
            }

            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            (entry.target as HTMLElement).classList.remove(visibleClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, selector, visibleClass, once]);

  return containerRef;
}

export default useScrollReveal;
