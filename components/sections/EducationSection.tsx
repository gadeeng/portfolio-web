'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
} from 'lucide-react';
import BorderGlow from '@/components/react-bits/BorderGlow';
import EducationBackground from './EducationBackground';
import { useTheme } from '@/components/ThemeProvider';
import { useScrollReveal } from '@/lib/useScrollReveal';

// ── Shared BorderGlow config tuned to crimson palette ─────────────────────────
function useBentoGlowProps(isLight: boolean) {
  return {
    glowColor: '0 90 55',
    glowRadius: 28,
    glowIntensity: isLight ? 0.7 : 0.9,
    coneSpread: 22,
    borderRadius: 16,
    colors: ['#e60012', '#c80010', '#ff3344'],
    fillOpacity: isLight ? 0.08 : 0.12,
    backgroundColor: isLight ? '#ffffff' : '#111111',
  } as const;
}

export default function EducationSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const glowProps = useBentoGlowProps(isLight);

  // ── Stagger entrance via useScrollReveal ────────────────────────────────────
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 overflow-hidden"
    >
      {/* Background GradientWaves */}
      <EducationBackground isLight={isLight} />

      {/* ── Top fade — blends smoothly from Hero section above ───────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, var(--background), transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom fade — blends into the section below ───────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, var(--background))',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content wrapper (above background) ──────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
      {/* ── Section header ───────────────────────────────────────────── */}
      <div
        data-reveal
        data-delay="0"
        className="reveal mb-8 flex items-baseline justify-between border-b border-foreground/8 pb-5"
      >
        <div className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-[#e60012]/70" />
          <h2 className="text-[1.1rem] font-medium tracking-tight text-foreground/50 uppercase">
            Education
          </h2>
        </div>
        <span className="text-sm text-foreground/30 tabular-nums">Universitas Airlangga</span>
      </div>

      {/* ── Bento Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

        {/* 1. University & Major — Main Card (8 cols) */}
        <div
          data-reveal
          data-delay="60"
          className="reveal card-hover-lift lg:col-span-8 md:col-span-2"
        >
          <BorderGlow {...glowProps} className="h-full" style={{ height: '100%' }}>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5 h-full">
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-background/80 p-2">
                <Image
                  src="/Logo Unair.png"
                  alt="Logo Universitas Airlangga"
                  width={72}
                  height={72}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                    University
                  </span>
                  <span className="text-foreground/20">·</span>
                  <span className="flex items-center gap-1 text-xs text-foreground/40">
                    <MapPin className="h-3 w-3" />
                    Surabaya, Indonesia
                  </span>
                </div>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                  Universitas Airlangga
                </h3>
                <p className="mt-0.5 text-[15px] font-medium text-foreground/80">
                  Bachelor of Science in Mathematics{' '}
                  <span className="text-foreground/45">(S.Si.)</span>
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  Faculty of Science and Technology · Department of Mathematics
                </p>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* 2. GPA Card (4 cols) */}
        <div
          data-reveal
          data-delay="120"
          className="reveal card-hover-lift lg:col-span-4 md:col-span-1"
        >
          <BorderGlow {...glowProps} className="h-full" style={{ height: '100%' }}>
            <div className="p-6 flex flex-col justify-between h-full">
              <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                Cumulative GPA
              </span>
              <div className="my-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground tabular-nums">
                    3.30
                  </span>
                  <span className="text-base text-foreground/40 font-normal">/ 4.00</span>
                </div>
                <div className="mt-3 h-[3px] w-full rounded-full bg-foreground/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#e60012] to-[#ff3344]"
                    style={{ width: '82.5%' }}
                  />
                </div>
              </div>
              <p className="text-xs text-foreground/40">
                Scale 4.00 · Evaluated across 144+ credits
              </p>
            </div>
          </BorderGlow>
        </div>

        {/* 3. Graduation Date (4 cols) */}
        <div
          data-reveal
          data-delay="180"
          className="reveal card-hover-lift lg:col-span-4 md:col-span-1"
        >
          <BorderGlow {...glowProps} className="h-full" style={{ height: '100%' }}>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-foreground/40" />
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                  Graduation
                </span>
              </div>
              <div className="my-3">
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground block">
                  19 May 2026
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#e60012]/20 bg-[#e60012]/8 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#e60012]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e60012]" />
                  Graduated
                </span>
              </div>
              <p className="text-xs text-foreground/40">
                Department of Mathematics
              </p>
            </div>
          </BorderGlow>
        </div>

        {/* 4. Research Group (4 cols) */}
        <div
          data-reveal
          data-delay="240"
          className="reveal card-hover-lift lg:col-span-4 md:col-span-1"
        >
          <BorderGlow {...glowProps} className="h-full" style={{ height: '100%' }}>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-foreground/40" />
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                  Research Group
                </span>
              </div>
              <div className="my-3">
                <h4 className="text-xl font-semibold tracking-tight text-foreground leading-snug">
                  System
                  <br />
                  Modeling
                </h4>
                <p className="text-xs text-foreground/50 mt-1.5">
                  Biomathematics & Dynamical Systems
                </p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['ODE', 'Stability', 'Bifurcation'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-foreground/8 bg-foreground/[0.03] px-2 py-0.5 text-[10px] text-foreground/45 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* 5. Achievement (4 cols) */}
        <div
          data-reveal
          data-delay="300"
          className="reveal card-hover-lift lg:col-span-4 md:col-span-2"
        >
          <BorderGlow {...glowProps} animated className="h-full" style={{ height: '100%' }}>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-[#e60012]/60" />
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                    Achievement
                  </span>
                </div>
                <span className="text-xs text-foreground/40 font-mono">2024</span>
              </div>
              <div className="my-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🥉</span>
                  <p className="text-xs font-semibold text-[#e60012] uppercase tracking-wider">
                    3rd Place
                  </p>
                </div>
                <h4 className="text-base sm:text-lg font-semibold tracking-tight text-foreground leading-snug">
                  Data Mining Competition
                </h4>
                <p className="text-xs text-foreground/50 mt-1">
                  Hology 7.0 · Universitas Brawijaya
                </p>
              </div>
              <p className="text-xs text-foreground/40">
                National collegiate competition
              </p>
            </div>
          </BorderGlow>
        </div>

        {/* 6. Undergraduate Thesis — Full width (12 cols) */}
        <div
          data-reveal
          data-delay="360"
          className="reveal card-hover-lift lg:col-span-12 md:col-span-2"
        >
          <BorderGlow {...glowProps} className="h-full" style={{ height: '100%' }}>
            <div className="p-6 sm:p-7 h-full">
              <div className="flex items-center justify-between gap-2 border-b border-foreground/6 pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-foreground/40" />
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                    Undergraduate Thesis
                  </span>
                </div>
                <span className="rounded border border-foreground/8 px-2 py-0.5 text-[10px] font-mono text-foreground/35 uppercase tracking-wider">
                  Skripsi
                </span>
              </div>

              <div className="mt-4">
                <div className="flex gap-4">
                  <div className="mt-1 w-[2px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#e60012]/60 to-transparent" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground leading-snug max-w-3xl">
                      Stability Analysis of Leslie-Gower Predator-Prey Model Incorporating Prey Cooperation and Fear Effect
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/60 max-w-3xl">
                      Analyzes the dynamical behavior and stability of the Leslie-Gower predator-prey system under the dual influence of prey cooperative defense and indirect fear effects, deriving equilibrium states, Jacobian linearization, and asymptotic stability conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  'Leslie-Gower Model',
                  'Prey Cooperation',
                  'Fear Effect',
                  'Stability Analysis',
                  'Nonlinear Differential Equations',
                  'Dynamical Systems',
                ].map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-foreground/8 bg-foreground/[0.02] px-2.5 py-1 text-xs text-foreground/60 transition-colors hover:border-[#e60012]/20 hover:text-foreground/80"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>

      </div>
      </div>{/* end z-10 wrapper */}
    </section>
  );
}

