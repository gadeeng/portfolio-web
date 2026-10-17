'use client';

import React from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
  Sigma,
  Cpu,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

// ── Skills & Competencies data (structured across mathematical disciplines) ──
const SKILL_CATEGORIES = [
  {
    title: 'Mathematical Modeling',
    icon: Sigma,
    gradient: 'from-red-500 to-rose-600',
    accentText: 'text-red-500',
    description:
      'Formulating dynamical systems, differential equations, and operational optimization into rigorous quantitative models.',
    skills: [
      'Dynamical Systems',
      'Stability Analysis',
      'Agent-Based Modeling',
      'Numerical Simulation',
      'Optimization Algorithms',
    ],
  },
  {
    title: 'Machine Learning & Analytics',
    icon: Cpu,
    gradient: 'from-blue-500 to-indigo-600',
    accentText: 'text-blue-500',
    description:
      'Extracting high-dimensional patterns, constructing robust regression, classification, and forecasting pipelines.',
    skills: [
      'Time Series Forecasting',
      'Supervised & Unsupervised ML',
      'Sentiment Analysis & NLP',
      'Scikit-Learn, Pandas, NumPy',
    ],
  },
  {
    title: 'Programming & Implementation',
    icon: Code2,
    gradient: 'from-orange-500 to-amber-600',
    accentText: 'text-orange-500',
    description:
      'Translating mathematical algorithms into clean computational code, reactive data dashboards, and web applications.',
    skills: [
      'Python',
      'SQL & Data Warehousing',
      'Streamlit & Reactive Dashboards',
    ],
  },
];

export default function EducationSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0, rootMargin: '120px 0px 50px 0px' });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">

        {/* ── Apple-style Section Header ───────────────────────────────── */}
        <div data-reveal data-delay="0" className="reveal mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-red-500">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Academic</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12]">
            Education
          </h2>
          <p className="mt-3 text-base sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
            Grounded in rigorous mathematics from Universitas Airlangga, bridging dynamical systems, statistical algorithms, and computational modeling.
          </p>
        </div>

        {/* ── Apple Bento Grid Architecture ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">

          {/* 1. Main Degree Card (8 cols) — Apple Hero Tile */}
          <div
            data-reveal
            data-delay="60"
            className="reveal group relative overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] lg:col-span-8 md:col-span-2 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 h-full">
              {/* Apple Squircle Icon Box for UNAIR */}
              <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-[22px] border border-black/[0.06] dark:border-white/10 bg-white p-3 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Logo Unair.png"
                  alt="Logo Universitas Airlangga"
                  width={80}
                  height={80}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Information hierarchy */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-foreground/50">
                    <MapPin className="h-3 w-3 text-red-500" />
                    Surabaya, Indonesia
                  </span>
                </div>

                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Universitas Airlangga
                </h3>

                <p className="mt-1 text-base sm:text-lg font-medium text-foreground/80">
                  Bachelor of Science in Mathematics (S.Si)
                </p>

                <p className="mt-2 text-xs sm:text-sm text-foreground/50 leading-relaxed">
                  Faculty of Science and Technology · Department of Mathematics
                </p>

                {/* Sub-specialization tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {['Dynamical Systems', 'Nonlinear ODEs', 'Mathematical Modeling'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-foreground/[0.03] border border-foreground/[0.06] px-3 py-1 text-xs font-medium text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Cumulative GPA (4 cols) — Apple Activity/Health inspired Metric */}
          <div
            data-reveal
            data-delay="120"
            className="reveal group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] lg:col-span-4 md:col-span-1 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                  Cumulative GPA
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
                  Σ
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground tabular-nums">
                  3.30
                </span>
                <span className="text-lg font-medium text-foreground/40">/ 4.00</span>
              </div>

              {/* Apple-style Progress track */}
              <div className="mt-4">
                <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 shadow-[0_0_12px_rgba(230,0,18,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: '82.5%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-foreground/[0.06] text-xs text-foreground/50">
              Evaluated across 144+ curriculum semester credits
            </div>
          </div>

          {/* 3. Graduation Date (4 cols) — Apple Calendar Widget */}
          <div
            data-reveal
            data-delay="180"
            className="reveal group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] lg:col-span-4 md:col-span-1 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                  Conferment
                </span>
              </div>

              <div className="mt-5">
                <span className="text-3xl font-semibold tracking-tight text-foreground block">
                  19 May 2026
                </span>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Conferred &amp; Graduated</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Research Laboratory (4 cols) — Apple Keynote / Lab Card */}
          <div
            data-reveal
            data-delay="240"
            className="reveal group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] lg:col-span-4 md:col-span-1 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                  <Layers className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                  Research Group
                </span>
              </div>

              <div className="mt-5">
                <h4 className="text-2xl font-semibold tracking-tight text-foreground leading-snug">
                  System Modeling
                </h4>
                <p className="mt-1 text-xs text-foreground/55">
                  Biomathematics &amp; Dynamical Systems
                </p>
              </div>
            </div>
          </div>

          {/* 5. Achievement (4 cols) — Apple Fitness Trophy Style */}
          <div
            data-reveal
            data-delay="300"
            className="reveal group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] lg:col-span-4 md:col-span-2 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                    Achievement
                  </span>
                </div>
                <span className="font-mono text-xs text-foreground/40 font-medium">2024</span>
              </div>

              <div className="mt-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <span>🥉</span>
                  <span>3rd Place Winner</span>
                </div>

                <h4 className="mt-3 text-lg font-semibold tracking-tight text-foreground leading-snug">
                  Data Mining Competition
                </h4>
                <p className="mt-1 text-xs text-foreground/55">
                  Hology 7.0 · Universitas Brawijaya
                </p>
              </div>
            </div>
          </div>

          {/* 6. Undergraduate Thesis — Apple Spotlight Feature Banner (12 cols) */}
          <div
            data-reveal
            data-delay="360"
            className="reveal group relative overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] lg:col-span-12 md:col-span-2 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-5 border-b border-foreground/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-foreground/45 block">
                    Undergraduate Thesis Defense
                  </span>
                  <span className="text-xs text-foreground/50">
                    Final Academic Work
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-snug max-w-4xl">
                Stability Analysis of Leslie-Gower Predator-Prey Model Incorporating Prey Cooperation and Fear Effect
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/65 max-w-4xl">
                Formulated non-linear continuous autonomous ODE systems modeling trophic interactions. Evaluated dynamic equilibria, derived Jacobian linearized matrices, and established asymptotic stability conditions through Lyapunov theory and Routh-Hurwitz criteria under cooperative prey defense and psychological indirect fear costs.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pt-2">
              {[
                'Leslie-Gower Model',
                'Prey Cooperation',
                'Fear Effect',
                'Stability Analysis',
                'Nonlinear Differential Equations',
              ].map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-3 py-1 text-xs font-medium text-foreground/70 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/5 hover:text-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ── Apple Control Center Style: Skills & Competencies ─────────── */}
        <div className="mt-16 sm:mt-24">
          <div data-reveal data-delay="390" className="reveal mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-foreground/60">
              <Cpu className="h-3.5 w-3.5 text-red-500" />
              <span>Technical Capabilities</span>
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Core Methodologies &amp; Frameworks
            </h3>
            <p className="mt-1 text-sm sm:text-base text-foreground/55">
              Disciplined quantitative toolkit applied across research modeling, analytics pipelines, and engineering software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  data-reveal
                  data-delay={String(420 + idx * 80)}
                  className="reveal group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
                >
                  <div>
                    {/* Header with Apple squircle gradient icon */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-foreground/[0.06]">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br ${cat.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold tracking-tight text-foreground">
                          {cat.title}
                        </h4>
                        <span className="text-[11px] uppercase tracking-wider text-foreground/40 font-medium">
                          Framework
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-foreground/60 min-h-[42px]">
                      {cat.description}
                    </p>

                    {/* Apple iOS Settings-style Grouped Rows */}
                    <div className="mt-5 space-y-1.5">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between rounded-xl bg-foreground/[0.025] border border-foreground/[0.05] px-3.5 py-2.5 text-xs font-medium text-foreground/80 transition-all duration-200 hover:bg-foreground/[0.05] hover:border-foreground/15 hover:translate-x-1"
                        >
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                            {skill}
                          </span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-foreground/25" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
