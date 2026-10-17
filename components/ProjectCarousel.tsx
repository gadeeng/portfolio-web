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
};

export default function ProjectCarousel({ name, images }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const total = images.length;

  const goTo = useCallback(
    (next: number) => {
      const el = trackRef.current;
      if (!el || total === 0) return;
      const clamped = Math.min(Math.max(next, 0), total - 1);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      setIndex(clamped);
    },
    [total],
  );

  // Sinkronkan index dengan posisi scroll, jadi swipe di layar sentuh ikut terhitung
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
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
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isLightboxOpen, index, goTo]);

  if (total === 0) return null;

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} screenshots`}
        className="group/carousel relative flex flex-col gap-3 my-2"
      >
        {/* Apple Display Canvas Frame */}
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] border border-black/[0.08] dark:border-white/[0.1] bg-zinc-950/95 shadow-[0_4px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Track — scroll-snap native */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="focus-ring flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((img, i) => {
              const isNearby = Math.abs(i - index) <= 1;

              return (
                <div
                  key={img.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  className="relative w-full shrink-0 snap-center cursor-zoom-in"
                  style={{
                    aspectRatio: '16/9',
                    minHeight: 'clamp(210px, 46vw, 480px)',
                  }}
                  onClick={() => setIsLightboxOpen(true)}
                >
                  {failed[i] ? (
                    <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-zinc-500">
                      Image not available
                    </div>
                  ) : isNearby ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading={i === 0 ? 'eager' : 'lazy'}
                      sizes="(min-width: 1024px) 840px, 100vw"
                      className="object-contain object-center transition-transform duration-500 group-hover/carousel:scale-[1.01]"
                      onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
                    />
                  ) : (
                    <div className="h-full w-full bg-zinc-900/40" aria-hidden="true" />
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
            className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-md border border-white/20 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-black/75 hover:scale-105 active:scale-95"
          >
            <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>

          {/* Left / Right Quick Navigation Arrows on Hover (Desktop) */}
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-md border border-white/15 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index + 1);
                }}
                disabled={index === total - 1}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-md border border-white/15 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Floating Apple Bottom Bar (Caption + Counter) */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2.5 sm:p-4 flex items-end justify-between gap-2 sm:gap-3">
            <p aria-live="polite" className="text-[11px] sm:text-[13px] font-medium text-white/90 drop-shadow-sm truncate max-w-[70%] sm:max-w-[75%]">
              {images[index]?.alt}
            </p>

            {total > 1 && (
              <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-white/90 shrink-0">
                <span>{index + 1}</span>
                <span className="text-white/40">/</span>
                <span>{total}</span>
              </div>
            )}
          </div>
        </div>

        {/* Indicator dots for mobile/touch screens */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-0.5 sm:pt-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-5 sm:w-6 bg-foreground/80'
                    : 'w-1.5 bg-foreground/20 hover:bg-foreground/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Apple Lightbox Modal for High-Resolution Inspection */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-2.5 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen view"
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 backdrop-blur-md border border-white/20 transition-all duration-200 active:scale-95"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative flex flex-col items-center justify-center max-w-6xl w-full h-full max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
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
            <div className="mt-3 sm:mt-4 flex items-center justify-between w-full max-w-2xl px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 text-white">
              <p className="text-[11px] sm:text-sm font-medium truncate pr-2 sm:pr-4">
                {images[index]?.alt}
              </p>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-white/60">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  className="p-1 rounded-full hover:bg-white/15 disabled:opacity-30"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index === total - 1}
                  className="p-1 rounded-full hover:bg-white/15 disabled:opacity-30"
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