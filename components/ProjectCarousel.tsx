'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  if (total === 0) return null;

  const buttonClass =
    'focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors duration-200 hover:border-foreground/25 hover:text-foreground disabled:pointer-events-none disabled:opacity-30';

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
      className="flex flex-col gap-3"
    >
      {/* Track — scroll-snap native: swipe di HP, panah keyboard di desktop */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="focus-ring flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl border border-foreground/10 bg-foreground/[0.03] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            className="relative aspect-[16/10] w-full shrink-0 snap-center"
          >
            {failed[i] ? (
              <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-foreground/35">
                Image not available
              </div>
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover object-top"
                onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
              />
            )}
          </div>
        ))}
      </div>

      {/* Caption di kiri, kontrol di kanan */}
      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="min-w-0 text-[13px] leading-snug text-foreground/50">
          {images[index]?.alt}
        </p>

        {total > 1 && (
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-[13px] tabular-nums text-foreground/40">
              {index + 1} / {total}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Previous image"
                className={buttonClass}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === total - 1}
                aria-label="Next image"
                className={buttonClass}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}