'use client';

import React from 'react';
import GradientWaves from '@/components/react-bits/GradientWaves';

interface EducationBackgroundProps {
  isLight: boolean;
}

export default function EducationBackground({ isLight }: EducationBackgroundProps) {
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
      }}
    >
      <GradientWaves
        horizonColor={isLight ? '#F87171' : '#EF4444'}
        waveColor={isLight ? '#FB923C' : '#F97316'}
        crestColor={isLight ? '#FFFFFF' : '#000000'}
        speed={0.85}
        amplitude={3.4}
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
        brightness={isLight ? 1.0 : 0.7}
      />
    </div>
  );
}
