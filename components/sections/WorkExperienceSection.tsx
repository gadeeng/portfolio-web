'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, Calendar, Building2, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

interface WorkItem {
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string;
  logoAlt: string;
  tags: string[];
  isCurrent?: boolean;
  bgWhite?: boolean;
  logoFit?: 'contain' | 'cover';
}

const EXPERIENCES: WorkItem[] = [
  {
    company: 'PT Pelindo Daya Sejahtera',
    role: 'Marketing & Business Development Staff Intern',
    period: 'Des 2025 – Jun 2026',
    description:
      'Supporting the preparation of administrative documents such as Berita Acara, Nota Dinas, and Budget Plans (RAB). Involved in company performance evaluation projects, as well as website development as an evaluation medium.',
    logo: '/logo_pds.jpg',
    logoAlt: 'Logo PT Pelindo Daya Sejahtera',
    tags: ['Business Development', 'Web Development', 'Administration', 'Reporting'],
    logoFit: 'cover',
  },
  {
    company: 'PT Talenta Sinergi Group (Eduwork)',
    role: 'Graphic Designer Intern',
    period: 'Des 2024 – Mar 2025',
    description:
      'Coordinating the graphic design team, managing task delegations, and collaborating directly with supervisors and social media teams on campaign briefs and visual communication deliverables.',
    logo: '/eduwork_logo.png',
    logoAlt: 'Logo Eduwork',
    tags: ['Graphic Design', 'Social Media', 'Team Coordination', 'Content Creation'],
    bgWhite: true,
    logoFit: 'contain',
  },
  {
    company: 'PT Ruang Data Indonesia',
    role: 'Content Creator Intern',
    period: 'Des 2023 – Mar 2024',
    description:
      'Creating and managing educational content on data science, conducting empirical topic research, writing structured technical video scripts, and communicating quantitative insights to broader audiences.',
    logo: '/ruangdata_logo.jpg',
    logoAlt: 'Logo Ruang Data Indonesia',
    tags: ['Content Creation', 'Data Science', 'Script Writing', 'Research'],
    logoFit: 'cover',
  },
];

export default function WorkExperienceSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0, rootMargin: '120px 0px 50px 0px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">

        {/* ── Apple-style Section Header ───────────────────────────────── */}
        <div data-reveal data-delay="0" className="reveal mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-red-500">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Career Pathway</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12]">
            Work Experience.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
            Hands-on industry experience bridging quantitative analysis, web technologies, and strategic visual design across diverse corporate and agency ecosystems.
          </p>
        </div>

        {/* ── Apple App Store / Card Deck List ─────────────────────────── */}
        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.company}
              data-reveal
              data-delay={String(80 + index * 100)}
              className="reveal group relative overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:items-start">

                {/* Apple Squircle App-Icon for Company Logo */}
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-[20px] border border-black/[0.06] dark:border-white/10 bg-white p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={exp.logo}
                    alt={exp.logoAlt}
                    width={72}
                    height={72}
                    className={`h-full w-full ${exp.logoFit === 'cover' ? 'object-cover rounded-[14px]' : 'object-contain'
                      }`}
                  />
                  {exp.isCurrent && (
                    <span
                      aria-label="Current role"
                      className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-red-500 shadow-sm"
                    />
                  )}
                </div>

                {/* Experience Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-snug">
                        {exp.role}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground/60">
                        <Building2 className="h-3.5 w-3.5 text-foreground/40" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Apple Period Pill */}
                    <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-3.5 py-1 text-xs font-medium text-foreground/75">
                      <Calendar className="h-3 w-3 text-red-500" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-foreground/65 max-w-3xl">
                    {exp.description}
                  </p>

                  {/* Apple Pill Tags */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        Current
                      </span>
                    )}
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/[0.07] bg-foreground/[0.025] px-3 py-1 text-xs font-medium text-foreground/60 transition-all duration-200 hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
