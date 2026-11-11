'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
} from 'lucide-react';

export interface GalleryPhoto {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

interface PhotoGalleryCarouselProps {
  photos: GalleryPhoto[];
  aspectRatio?: string; // default aspect-video (16/9)
  autoPlayInterval?: number; // default 4500ms (0 to disable)
  className?: string;
}

export default function PhotoGalleryCarousel({
  photos,
  aspectRatio = 'aspect-video',
  autoPlayInterval = 4500,
  className = '',
}: PhotoGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const thumbTrackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const total = photos.length;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Observe viewport visibility to pause offscreen timers & defer neighbor/thumbnail image decoding
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { rootMargin: '240px 0px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay timer — only runs when visible in viewport and not interacted with
  useEffect(() => {
    if (
      autoPlayInterval <= 0 ||
      !isInView ||
      isHovered ||
      isTouching ||
      isLightboxOpen ||
      total <= 1
    ) {
      return;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isInView, isHovered, isTouching, isLightboxOpen, total, goToNext]);

  // Keep active thumbnail centered horizontally without scrolling the page vertically
  useEffect(() => {
    const track = thumbTrackRef.current;
    if (!track || total <= 1) return;
    const activeThumb = track.children[currentIndex] as HTMLElement | undefined;
    if (!activeThumb) return;

    const targetLeft =
      activeThumb.offsetLeft - track.clientWidth / 2 + activeThumb.clientWidth / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [currentIndex, total]);

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, goToNext, goToPrev]);

  // Touch swipe handling (works for both inline carousel and Lightbox)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    didSwipe.current = false;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY =
      touchStartY.current !== null && touchEndY.current !== null
        ? Math.abs(touchStartY.current - touchEndY.current)
        : 0;

    // Trigger horizontal swipe only when horizontal delta dominates vertical scroll
    if (Math.abs(diffX) > 36 && Math.abs(diffX) > diffY) {
      didSwipe.current = true;
      if (diffX > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  if (!photos || photos.length === 0) {
    return (
      <div
        className={`w-full rounded-2xl bg-secondary/30 flex items-center justify-center text-muted-foreground ${aspectRatio}`}
      >
        <Camera className="w-8 h-8 opacity-40" />
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`group/carousel relative flex flex-col gap-2 sm:gap-2.5 w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Main Viewport ── */}
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-[18px] sm:rounded-2xl bg-zinc-950/90 border border-black/[0.08] dark:border-white/[0.1] shadow-sm cursor-pointer select-none touch-pan-y`}
        onClick={() => {
          if (!didSwipe.current) {
            setIsLightboxOpen(true);
          }
          didSwipe.current = false;
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Photos Layer — only mount active & immediate neighbors to save memory/bandwidth */}
        {photos.map((photo, index) => {
          const isActive = index === currentIndex;
          const isNeighbor =
            total > 1 &&
            (index === (currentIndex + 1) % total ||
              index === (currentIndex - 1 + total) % total);
          const shouldRender = isActive || (hasEnteredView && isNeighbor);

          if (!shouldRender) return null;

          return (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-[1.015] pointer-events-none z-0'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt || photo.title || `Dokumentasi foto ${index + 1}`}
                fill
                loading="lazy"
                quality={75}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 86vw, 460px"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Subtle dark gradient scrim at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-20" />

        {/* Top Floating Controls */}
        <div className="absolute top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          {/* Photo Counter Pill */}
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-black/60 text-white/90 backdrop-blur-md border border-white/15 shadow-sm">
            <span className="text-white font-semibold">{currentIndex + 1}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/75">{total}</span>
          </span>

          {/* Lightbox Trigger Button */}
          <button
            type="button"
            aria-label="Perbesar foto"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="pointer-events-auto flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/60 text-white/85 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute inset-x-3 bottom-2.5 sm:inset-x-4 sm:bottom-3 z-20 pointer-events-none">
          {currentPhoto.title && (
            <p className="text-[11px] sm:text-xs font-semibold text-white/95 truncate drop-shadow-sm">
              {currentPhoto.title}
            </p>
          )}
          {currentPhoto.caption && (
            <p className="text-[10px] sm:text-[11px] text-white/75 line-clamp-1 mt-0.5 drop-shadow-sm">
              {currentPhoto.caption}
            </p>
          )}
        </div>

        {/* Floating Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/55 text-white/90 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/15 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/55 text-white/90 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/15 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* ── Interactive Mini-Thumbnail Track ── */}
      {total > 1 && (
        <div
          ref={thumbTrackRef}
          className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          {photos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={photo.src}
                type="button"
                aria-label={`Lihat foto ${idx + 1}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => goToIndex(idx)}
                className={`relative flex-shrink-0 h-9 w-14 sm:h-10 sm:w-16 rounded-lg overflow-hidden border transition-all duration-200 ${
                  isActive
                    ? 'border-[#EF4444] ring-2 ring-[#EF4444]/30 opacity-100 scale-[1.02] shadow-sm'
                    : 'border-foreground/10 opacity-50 hover:opacity-85 bg-foreground/5'
                }`}
              >
                {hasEnteredView && (
                  <Image
                    src={photo.src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    loading="lazy"
                    quality={60}
                    sizes="64px"
                    className="object-cover object-center"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Lightbox Modal Dialog ── */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-3 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Modal Close Button */}
          <button
            type="button"
            aria-label="Tutup pratinjau"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white/90 hover:text-white transition-all backdrop-blur-md border border-white/15 active:scale-95"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Lightbox Counter Top Center */}
          <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium bg-white/10 text-white/90 backdrop-blur-md border border-white/15">
            {currentIndex + 1} / {total}
          </div>

          {/* Prev / Next Modal Buttons (Desktop) */}
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/15 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Berikutnya"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/15 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* High-res Image & Controls in Lightbox */}
          <div
            className="relative max-w-5xl max-h-[86vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[70vh] sm:max-h-[76vh]">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt || currentPhoto.title || `Dokumentasi foto ${currentIndex + 1}`}
                fill
                sizes="96vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Lightbox Caption & Mobile Navigation Controls */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3 w-full max-w-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl sm:rounded-full bg-black/75 backdrop-blur-xl border border-white/15 text-white">
              <div className="min-w-0 flex-1">
                {currentPhoto.title && (
                  <p className="text-xs sm:text-sm font-semibold text-white/95 truncate">
                    {currentPhoto.title}
                  </p>
                )}
                {currentPhoto.caption && (
                  <p className="text-[11px] sm:text-xs text-white/75 line-clamp-2 sm:line-clamp-1 mt-0.5">
                    {currentPhoto.caption}
                  </p>
                )}
              </div>

              {total > 1 && (
                <div className="flex sm:hidden shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Sebelumnya"
                    onClick={goToPrev}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 active:bg-white/25 border border-white/15"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Berikutnya"
                    onClick={goToNext}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 active:bg-white/25 border border-white/15"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
