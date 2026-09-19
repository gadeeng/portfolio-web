'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, Calendar } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import BorderGlow from '@/components/react-bits/BorderGlow';
import WorkExperienceBackground from './WorkExperienceBackground';
import { useScrollReveal } from '@/lib/useScrollReveal';

// ── Accent palette: warm orange to complement crimson edu section ───────────
const ACCENT = '#F97316'; // orange-500

function useWorkGlowProps(isLight: boolean) {
  return {
    glowColor: '24 95 53', // Warm orange hue
    glowRadius: 28,
    glowIntensity: isLight ? 0.7 : 0.9,
    coneSpread: 22,
    borderRadius: 16,
    colors: ['#F97316', '#EA580C', '#FB923C'],
    fillOpacity: isLight ? 0.08 : 0.12,
    backgroundColor: isLight ? '#ffffff' : '#111111',
  } as const;
}

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
      'Coordinate the graphic design team, including division of tasks and coordination with supervisors and the social media team regarding content needs, as well as executing the design brief according to the brief.',
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
      'Creating and managing educational content about data science, conducting topic research, and writing video scripts.',
    logo: '/ruangdata_logo.jpg',
    logoAlt: 'Logo Ruang Data Indonesia',
    tags: ['Content Creation', 'Data Science', 'Script Writing', 'Research'],
    logoFit: 'cover',
  },
];

export default function WorkExperienceSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const glowProps = useWorkGlowProps(isLight);
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 overflow-hidden"
    >
      {/* ── Background GradientWaves (like EducationBackground) ── */}
      <WorkExperienceBackground isLight={isLight} />

        {/* ── Top fade — blends smoothly from Education section above ── */}
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

        {/* ── Bottom fade — blends into section below ── */}
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

        {/* ── Content wrapper (above background) ── */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
          {/* ── Section header ──────────────────────────────────────────────── */}
          <div
            data-reveal
            data-delay="0"
            className="reveal mb-8 flex items-baseline justify-between border-b border-foreground/8 pb-5"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4" style={{ color: `${ACCENT}cc` }} />
              <h2 className="text-[1.1rem] font-medium tracking-tight text-foreground/50 uppercase">
                Work Experience
              </h2>
            </div>
            <span className="text-sm text-foreground/30 tabular-nums">
              {EXPERIENCES.length} Internships
            </span>
          </div>

          {/* ── Timeline list ───────────────────────────────────────────────── */}
          <div className="relative flex flex-col gap-5">
            {/* Vertical connector line (desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-[2.1rem] top-10 hidden sm:block"
              style={{
                width: 2,
                bottom: 40,
                background: `linear-gradient(to bottom, ${ACCENT}55, ${ACCENT}22, transparent)`,
                borderRadius: 999,
              }}
            />

            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                data-reveal
                data-delay={80 + index * 100}
                className="reveal card-hover-lift relative"
              >
                <BorderGlow {...glowProps} className="w-full" style={{ width: '100%', borderRadius: 16 }}>
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">

                    {/* ── Logo bubble ─────────────────────────────────────── */}
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center self-start sm:self-center">
                      <div
                        className={`relative flex h-full w-full items-center justify-center rounded-2xl border border-foreground/8 shadow-sm overflow-hidden ${exp.bgWhite
                          ? 'bg-white p-2.5'
                          : exp.logoFit === 'cover'
                            ? 'bg-background/90 p-0'
                            : 'bg-background/90 p-2'
                          }`}
                      >
                        <Image
                          src={exp.logo}
                          alt={exp.logoAlt}
                          width={64}
                          height={64}
                          className={`h-full w-full ${exp.logoFit === 'cover' ? 'object-cover' : 'object-contain'
                            }`}
                        />
                      </div>
                      {/* Current badge dot */}
                      {exp.isCurrent && (
                        <span
                          aria-label="Current role"
                          className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-background"
                          style={{ background: ACCENT }}
                        />
                      )}
                    </div>

                    {/* ── Content ─────────────────────────────────────────── */}
                    <div className="flex-1 min-w-0">

                      {/* Top row: role + period */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[17px] sm:text-lg font-semibold tracking-tight text-foreground leading-snug">
                            {exp.role}
                          </h3>
                          <p className="mt-0.5 text-sm font-medium text-foreground/55">
                            {exp.company}
                          </p>
                        </div>

                        {/* Period pill */}
                        <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-foreground/8 bg-foreground/[0.03] px-2.5 py-1 text-[11px] text-foreground/45 tabular-nums whitespace-nowrap">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/60 max-w-[65ch]">
                        {exp.description}
                      </p>

                      {/* Tags + current badge */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {exp.isCurrent && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{
                              borderColor: `${ACCENT}33`,
                              background: `${ACCENT}12`,
                              color: ACCENT,
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full animate-pulse"
                              style={{ background: ACCENT }}
                            />
                            Current
                          </span>
                        )}
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-foreground/8 bg-foreground/[0.02] px-2.5 py-1 text-[11px] text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>

          {/* ── Footer stat row ─────────────────────────────────────────────── */}
          <div
            data-work-reveal
            data-work-delay={80 + EXPERIENCES.length * 120 + 60}
            className="mt-8 flex flex-wrap gap-8 border-t border-foreground/8 pt-6"
          >
            {[
              { label: 'Companies', value: EXPERIENCES.length },
              { label: 'Total Duration', value: '18+ mo' },
              { label: 'Domains', value: '3' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span
                  className="text-2xl font-semibold tabular-nums tracking-tight"
                  style={{ color: ACCENT }}
                >
                  {value}
                </span>
                <span className="text-xs text-foreground/40 tracking-wide uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>{/* end z-10 wrapper */}
      </section>
  );
}
