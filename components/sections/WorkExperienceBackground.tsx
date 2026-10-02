'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const GradientWaves = dynamic(() => import('@/components/react-bits/GradientWaves'), {
  ssr: false,
});

interface WorkExperienceBackgroundProps {
  isLight: boolean;
}

export default function WorkExperienceBackground({ isLight }: WorkExperienceBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        transform: 'rotate(180deg)',
      }}
    >
      {shouldRender && (
        <GradientWaves
          horizonColor={isLight ? '#FB923C' : '#EA580C'}
          waveColor={isLight ? '#F87171' : '#DC2626'}
          crestColor={isLight ? '#FFFFFF' : '#000000'}
          speed={0.8}
          amplitude={3.2}
          waveScale={0.5}
          waveRatio={1}
          turbulence={28}
          tilt={1.15}
          zoom={1.15}
          height={6}
          fogDepth={20}
          opacity={isLight ? 0.45 : 0.8}
          mouseInteraction={false}
          parallaxStrength={0.45}
          grain={true}
          grainIntensity={isLight ? 0.05 : 0.15}
          brightness={isLight ? 1.0 : 0.65}
        />
      )}
    </div>
  );
}
