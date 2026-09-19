'use client';

import React from 'react';
import GradientWaves from '@/components/react-bits/GradientWaves';

interface WorkExperienceBackgroundProps {
  isLight: boolean;
}

export default function WorkExperienceBackground({ isLight }: WorkExperienceBackgroundProps) {
  return (
    <div 
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
      <GradientWaves
        horizonColor={isLight ? '#F97316' : '#EA580C'}
        waveColor={isLight ? '#EF4444' : '#DC2626'}
        crestColor={isLight ? '#000000' : '#000000'}
        speed={0.8}
        amplitude={3.2}
        waveScale={0.5}
        waveRatio={1}
        turbulence={28}
        tilt={1.15}
        zoom={1.15}
        height={6}
        fogDepth={20}
        opacity={0.8}
        mouseInteraction={false}
        parallaxStrength={0.45}
        grain={true}
        grainIntensity={0.15}
        brightness={isLight ? 0.5 : 0.65}
      />
    </div>
  );
}
