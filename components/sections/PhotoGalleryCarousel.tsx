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
  aspectRatio?: string; // default aspect-[16/10]
  autoPlayInterval?: number; // default 4500ms (0 to disable)
  className?: string;
}

export default function PhotoGalleryCarousel({
  photos,
  aspectRatio = 'aspect-[16/10]',
  autoPlayInterval = 4500,
  className = '',
}: PhotoGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = photos.length;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (autoPlayInterval <= 0 || isHovered || isLightboxOpen || total <= 1) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isHovered, isLightboxOpen, total, goToNext]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrev]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!photos || photos.length === 0) {
    return (
      <div className={`w-full rounded-2xl bg-secondary/30 flex items-center justify-center text-muted-foreground ${aspectRatio}`}>
        <Camera className="w-8 h-8 opacity-40" />
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className={`group/carousel relative flex flex-col gap-2.5 w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Main Viewport ── */}
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl bg-black/40 border border-foreground/10 shadow-sm cursor-pointer select-none`}
        onClick={() => setIsLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Photos Layer */}
        {photos.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-[1.02] pointer-events-none z-0'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt || photo.title || `Dokumentasi foto ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          );
        })}

        {/* Subtle dark gradient scrim at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-20" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          {/* Photo Counter Pill */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider bg-black/55 text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="text-white font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">{String(total).padStart(2, '0')}</span>
          </span>

          {/* Lightbox Trigger Button */}
          <button
            type="button"
            aria-label="Perbesar foto"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="pointer-events-auto p-1.5 rounded-full bg-black/55 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 transition-all duration-200 hover:scale-105"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute inset-x-4 bottom-3 z-20 pointer-events-none">
          {currentPhoto.title && (
            <p className="text-xs font-semibold text-white/95 truncate">
              {currentPhoto.title}
            </p>
          )}
          {currentPhoto.caption && (
            <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
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
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white/85 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
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
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white/85 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* ── Interactive Mini-Thumbnail Track ── */}
      {total > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 no-scrollbar scroll-smooth">
          {photos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={photo.src}
                type="button"
                aria-label={`Lihat foto ${idx + 1}`}
                onClick={() => goToIndex(idx)}
                className={`relative flex-shrink-0 h-10 w-14 rounded-lg overflow-hidden border transition-all duration-200 ${
                  isActive
                    ? 'border-[#EF4444] ring-2 ring-[#EF4444]/30 opacity-100 scale-102 shadow-sm'
                    : 'border-foreground/10 opacity-50 hover:opacity-85'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="60px"
                  className="object-cover object-center"
                />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Close Button */}
          <button
            type="button"
            aria-label="Tutup pratinjau"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all backdrop-blur-md border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Lightbox Counter Top Center */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-white/10 text-white/90 backdrop-blur-md border border-white/10">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          {/* Prev / Next Modal Buttons */}
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 hover:scale-105"
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
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 hover:scale-105"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* High-res Image in Lightbox */}
          <div
            className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt || currentPhoto.title || `Dokumentasi foto ${currentIndex + 1}`}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Lightbox Caption */}
            {(currentPhoto.title || currentPhoto.caption) && (
              <div className="mt-4 text-center px-4 max-w-2xl">
                {currentPhoto.title && (
                  <p className="text-sm font-semibold text-white/95">
                    {currentPhoto.title}
                  </p>
                )}
                {currentPhoto.caption && (
                  <p className="text-xs text-white/70 mt-1">
                    {currentPhoto.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
