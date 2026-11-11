'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export type ProjectImage = {
  src: string;
  /** Deskripsi singkat isi gambar. Dipakai sebagai alt text sekaligus caption yang tampil. */
  alt: string;
};

type ProjectCarouselProps = {
  name: string;
  images: ProjectImage[];
  /** Set true hanya untuk project pertama di halaman agar LCP cepat tanpa membebani bandwidth awal. */
  priority?: boolean;
};

export default function ProjectCarousel({
  name,
  images,
  priority = false,
}: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbTrackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(priority);

  // Lightbox touch swipe refs
  const lbTouchStartX = useRef<number | null>(null);
  const lbTouchStartY = useRef<number | null>(null);
  const lbTouchEndX = useRef<number | null>(null);
  const lbTouchEndY = useRef<number | null>(null);

  const total = images.length;

  // Observe when carousel nears viewport to defer offscreen neighbor & thumbnail decoding
  useEffect(() => {
    if (hasEnteredView) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px', threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      const clamped = Math.min(Math.max(next, 0), total - 1);
      const el = trackRef.current;
      if (el && el.clientWidth > 0) {
        const reduceMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollTo({
          left: clamped * el.clientWidth,
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
      }
      setIndex(clamped);
    },
    [total],
  );

  // Sinkronkan index dengan posisi scroll secara throttled via rAF agar swipe di mobile 60fps
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = trackRef.current;
      if (!el || el.clientWidth === 0) return;
      const nextIdx = Math.round(el.scrollLeft / el.clientWidth);
      setIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Keep active thumbnail centered horizontally in the collage strip
  useEffect(() => {
    const thumbTrack = thumbTrackRef.current;
    if (!thumbTrack || total <= 1) return;
    const activeThumb = thumbTrack.children[index] as HTMLElement | undefined;
    if (!activeThumb) return;

    const targetLeft =
      activeThumb.offsetLeft - thumbTrack.clientWidth / 2 + activeThumb.clientWidth / 2;
    thumbTrack.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [index, total]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        goTo(index + 1);
      } else if (e.key === 'ArrowLeft') {
        goTo(index - 1);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleGlobalKey);
    };
  }, [isLightboxOpen, index, goTo]);

  // Lightbox touch swipe handlers for mobile fullscreen view
  const handleLbTouchStart = (e: React.TouchEvent) => {
    lbTouchStartX.current = e.targetTouches[0].clientX;
    lbTouchStartY.current = e.targetTouches[0].clientY;
    lbTouchEndX.current = null;
    lbTouchEndY.current = null;
  };

  const handleLbTouchMove = (e: React.TouchEvent) => {
    lbTouchEndX.current = e.targetTouches[0].clientX;
    lbTouchEndY.current = e.targetTouches[0].clientY;
  };

  const handleLbTouchEnd = () => {
    if (lbTouchStartX.current === null || lbTouchEndX.current === null) return;
    const diffX = lbTouchStartX.current - lbTouchEndX.current;
    const diffY =
      lbTouchStartY.current !== null && lbTouchEndY.current !== null
        ? Math.abs(lbTouchStartY.current - lbTouchEndY.current)
        : 0;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > diffY) {
      if (diffX > 0) goTo(index + 1);
      else goTo(index - 1);
    }
    lbTouchStartX.current = null;
    lbTouchStartY.current = null;
    lbTouchEndX.current = null;
    lbTouchEndY.current = null;
  };

  if (total === 0) return null;

  return (
    <>
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} screenshots`}
        className="group/carousel relative flex flex-col gap-2 sm:gap-2.5 my-1.5 sm:my-2"
      >
        {/* Apple Display Canvas Frame */}
        <div className="relative overflow-hidden rounded-[18px] sm:rounded-[24px] border border-black/[0.08] dark:border-white/[0.1] bg-zinc-950/95 shadow-[0_4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Slide Viewport Wrapper */}
          <div className="relative">
            {/* Track — native scroll-snap for 60fps mobile swipe */}
            <div
              ref={trackRef}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className="focus-ring flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((img, i) => {
                const isNearby =
                  i === index || (hasEnteredView && Math.abs(i - index) <= 1);
                const isPrioritySlide = priority && i === 0;

                return (
                  <div
                    key={img.src}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${total}`}
                    className="relative w-full shrink-0 snap-center aspect-video cursor-zoom-in bg-zinc-950"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    {failed[i] ? (
                      <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs sm:text-sm text-zinc-500">
                        Image not available
                      </div>
                    ) : isNearby ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        priority={isPrioritySlide}
                        loading={isPrioritySlide ? 'eager' : 'lazy'}
                        quality={78}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 840px"
                        className="object-contain object-center transition-transform duration-500 sm:group-hover/carousel:scale-[1.005]"
                        onError={() =>
                          setFailed((prev) => ({ ...prev, [i]: true }))
                        }
                      />
                    ) : (
                      <div
                        className="h-full w-full bg-zinc-900/40"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Top-Right Expand Button (Apple Liquid Glass pill) */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label="Expand image to fullscreen"
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/55 text-white/90 backdrop-blur-md border border-white/20 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95"
            >
              <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>

            {/* Left / Right Quick Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(index - 1);
                  }}
                  disabled={index === 0}
                  aria-label="Previous slide"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/55 text-white/90 backdrop-blur-md border border-white/15 opacity-85 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(index + 1);
                  }}
                  disabled={index === total - 1}
                  aria-label="Next slide"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/55 text-white/90 backdrop-blur-md border border-white/15 opacity-85 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </>
            )}
          </div>

          {/* Dedicated Caption & Counter Bar — never obstructs bottom of slides on mobile */}
          <div className="border-t border-white/[0.08] bg-zinc-900/95 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2.5">
            <p
              aria-live="polite"
              className="text-[11px] sm:text-[13px] font-medium text-white/90 truncate min-w-0 flex-1"
            >
              {images[index]?.alt}
            </p>

            {total > 1 && (
              <div className="flex items-center gap-1 rounded-full bg-white/[0.08] border border-white/15 px-2 py-0.5 sm:px-2.5 text-[10px] sm:text-[11px] font-mono text-white/90 shrink-0">
                <span className="font-semibold text-white">{index + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/75">{total}</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Collage Thumbnail Strip (Scrollable on Mobile & Desktop) */}
        {total > 1 && (
          <div
            ref={thumbTrackRef}
            className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {images.map((img, i) => {
              const isActive = i === index;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${img.alt}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative shrink-0 h-9 w-15 sm:h-11 sm:w-19 rounded-lg overflow-hidden border transition-all duration-200 ${
                    isActive
                      ? 'border-red-500 ring-2 ring-red-500/30 opacity-100 scale-[1.02] shadow-sm'
                      : 'border-foreground/10 opacity-50 hover:opacity-85 bg-zinc-900/40'
                  }`}
                >
                  {hasEnteredView && !failed[i] && (
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      loading="lazy"
                      quality={55}
                      sizes="76px"
                      className="object-cover object-center"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Apple Lightbox Modal for High-Resolution Inspection */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl p-2.5 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={handleLbTouchStart}
          onTouchMove={handleLbTouchMove}
          onTouchEnd={handleLbTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen view"
            className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 backdrop-blur-md border border-white/20 transition-all duration-200 active:scale-95"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative flex flex-col items-center justify-center max-w-6xl w-full h-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[72vh] sm:max-h-[80vh] flex items-center justify-center">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Lightbox Caption & Controls */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2.5 w-full max-w-2xl px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-black/75 backdrop-blur-xl border border-white/15 text-white">
              <p className="text-[11px] sm:text-sm font-medium line-clamp-2 sm:truncate pr-2 sm:pr-4 min-w-0 flex-1">
                {images[index]?.alt}
              </p>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-white/65">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 disabled:opacity-30"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index === total - 1}
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 disabled:opacity-30"
                  aria-label="Next"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
