'use client';

import React from 'react';
import {
  Users,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import PhotoGalleryCarousel, { GalleryPhoto } from './PhotoGalleryCarousel';
import { useScrollReveal } from '@/lib/useScrollReveal';

// ── Types ────────────────────────────────────────────────────────────────────
export interface OrgExperienceItem {
  id: 'himatika' | 'sdgs' | 'situbondo' | 'tuban';
  index: string;
  organization: string;
  role: string;
  period: string;
  category: string;
  partner?: string;
  location?: string;
  description: string;
  tags: string[];
  photos: GalleryPhoto[];
}

// ── Real Data & Photography ──────────────────────────────────────────────────
const ORGANIZATIONS: OrgExperienceItem[] = [
  {
    id: 'himatika',
    index: '01',
    organization: 'HIMATIKA UNAIR',
    role: 'Expert Staff of Media Information and Communication',
    period: 'Feb 2024 – Jan 2025',
    category: 'Student Organization',
    partner: 'Himpunan Mahasiswa Matematika UNAIR',
    location: 'Surabaya, Indonesia',
    description:
      'Supported media operations through strategic graphic design, digital content production, and visual brand identity for the Adhisatya Cabinet. Oversaw creative quality to ensure strict brand consistency across public-facing channels.',
    tags: ['Visual Branding', 'Graphic Design', 'Media Strategy'],
    photos: [
      { src: '/org_exp/himatika/11.jpg', title: 'HIMATIKA UNAIR', caption: 'Graduate Appreciation Documentation' },
      { src: '/org_exp/himatika/12.png', title: 'HIMATIKA UNAIR', caption: 'Social Media Content on Instagram' },
      { src: '/org_exp/himatika/Video Profil Jadi-Cover.jpg', title: 'HIMATIKA UNAIR', caption: 'Video profile of the organization HIMATIKA UNAIR Adhisatya Cabinet' },
      { src: '/org_exp/himatika/14.jpg', title: 'HIMATIKA UNAIR', caption: 'Graduate Appreciation Documentation' },
      { src: '/org_exp/himatika/Design.png', title: 'HIMATIKA UNAIR', caption: 'TikTok Content' },
    ],
  },
  {
    id: 'sdgs',
    index: '02',
    organization: 'SDGs & Community Service',
    role: 'Staff of Media Information and Communication',
    period: '2023 – 2025',
    category: 'International Community Service',
    partner: 'Universitas Airlangga × Universiti Teknologi Malaysia',
    location: 'Taman Hutan Kota Jeruk, Surabaya',
    description:
      'Led media, visual communications, and event documentation for international educational outreach initiatives, including FunMath Camp (2023) and Play to Solve: A Math Game Day (2025) in cross-border partnership with UTM Malaysia.',
    tags: ['International Partnership', 'Event Documentation', 'Interactive Math'],
    photos: [
      { src: '/org_exp/fun_comap/1.jpg', title: 'FunMath Camp', caption: 'Group Photo with the Committee' },
      { src: '/org_exp/fun_comap/2.jpg', title: 'FunMath Camp', caption: 'Group Photo of Participants' },
      { src: '/org_exp/fun_comap/3.jpg', title: 'FunMath Camp', caption: 'Post-test and Perception' },
      { src: '/org_exp/fun_comap/4.jpg', title: 'Play to Solve: A Math Game Day', caption: 'Mathematical Games Booth' },
      { src: '/org_exp/fun_comap/5.jpg', title: 'FunMath Camp', caption: 'Math Show' },
      { src: '/org_exp/fun_comap/6.jpg', title: 'Play to Solve: A Math Game Day', caption: 'Mathematical Games Booth' },
      { src: '/org_exp/fun_comap/7.jpg', title: 'Play to Solve: A Math Game Day', caption: 'Mathematical Games Booth' },
      { src: '/org_exp/fun_comap/8.jpg', title: 'FunMath Camp', caption: 'Mathematical Creations' },
      { src: '/org_exp/fun_comap/9.jpg', title: 'FunMath Camp', caption: 'Mathematical Creations' },
      { src: '/org_exp/fun_comap/10.jpg', title: 'Play to Solve: A Math Game Day', caption: 'Refleksi bersama dan apresiasi partisipasi seluruh delegasi' },
    ],
  },
  {
    id: 'situbondo',
    index: '03',
    organization: 'Optimalisasi Pemasaran Online UMKM',
    role: 'Photographer, Videographer & Editor',
    period: '18 September 2024',
    category: 'Community Service',
    partner: 'Dinas Koperasi & Perdagangan Kab. Situbondo',
    location: 'Situbondo, Jawa Timur',
    description:
      'Empowered local micro, small, and medium enterprise (MSME) owners through digital marketing literacy training, local wisdom-based product branding, and online storefront setup in direct collaboration with the local government.',
    tags: ['UMKM Empowerment', 'Product Branding', 'Event Documentation'],
    photos: [
      { src: '/org_exp/situbondo/16.jpg', title: 'Community Service in Situbondo, East Java', caption: 'Group Photo with Participants' },
      { src: '/org_exp/situbondo/17.jpg', title: 'Community Service in Situbondo, East Java', caption: 'Pre-test Session' },
      { src: '/org_exp/situbondo/18.jpg', title: 'Community Service in Situbondo, East Java', caption: 'Pre-tes Session' },
      { src: '/org_exp/situbondo/19.jpg', title: 'Community Service in Situbondo, East Java', caption: 'Presentation of Material by Drs. Edi Winarko' },
      { src: '/org_exp/situbondo/20.jpg', title: 'Community Service in Situbondo, East Java', caption: 'Seminar Stage' },
    ],
  },
  {
    id: 'tuban',
    index: '04',
    organization: 'Pelatihan Konten Kreator SMKN Rengel',
    role: 'Photographer, Videographer & Editor',
    period: '18 Juli 2024',
    category: 'Community Service',
    partner: 'SMKN Rengel Tuban',
    location: 'Tuban, Jawa Timur',
    description:
      'Delivered hands-on digital content creation training for vocational high school students in Multimedia and Visual Communication Design (DKV), introducing videography workflows, storytelling techniques, and modern media career avenues.',
    tags: ['Educational Training', 'Videography', 'Media Mentorship'],
    photos: [
      { src: '/org_exp/tuban/21.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Group Photo with Participants' },
      { src: '/org_exp/tuban/22.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Photo with The Speaker' },
      { src: '/org_exp/tuban/23.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Pre-test Session' },
      { src: '/org_exp/tuban/24.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Practical Session: Videography' },
      { src: '/org_exp/tuban/25.png', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Presentation of Material by Londo Kampung Team' },
    ],
  },
];

export default function OrganizationSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0, rootMargin: '120px 0px 50px 0px' });

  return (
    <section
      id="organization"
      ref={sectionRef}
      className="relative w-full py-14 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-10">

        {/* ── Apple-style Section Header ───────────────────────────────── */}
        <div data-reveal data-delay="0" className="reveal mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-red-500">
            <Users className="h-3.5 w-3.5" />
            <span>Organization &amp; Community</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12]">
            Organizational and Volunteer Experience.
          </h2>
          <p className="mt-3 text-sm sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
            During my university years, I was actively involved in student organizations and community service activities.
          </p>
        </div>

        {/* ── Apple Material Glass Cards ───────────────────────────────── */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {ORGANIZATIONS.map((org, index) => (
            <article
              key={org.id}
              data-reveal
              data-delay={String(60 + index * 100)}
              className="reveal group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-4.5 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out sm:hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.18] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

                {/* ── Left Column: Narrative & Meta ── */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Index & Category Badges */}
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-3.5">
                      <span className="text-[11px] sm:text-xs font-semibold text-red-500 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                        {org.index}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-foreground/[0.04] border border-foreground/[0.08] px-2.5 sm:px-3 py-0.5 text-[11px] sm:text-xs font-medium text-foreground/75">
                        {org.category}
                      </span>
                    </div>

                    {/* Organization Title */}
                    <h3 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground leading-snug">
                      {org.organization}
                    </h3>

                    {/* Role & Period */}
                    <div className="mt-1.5 sm:mt-2 mb-3.5 sm:mb-4">
                      <p className="text-sm sm:text-base font-medium text-foreground/85">
                        {org.role}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-1 sm:mt-1.5 font-medium">
                        <Calendar className="h-3 w-3 text-red-500" />
                        <span>{org.period}</span>
                      </div>
                    </div>

                    {/* Metadata Chips (Location & Partner) */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground/60 mb-4 sm:mb-5 pb-3.5 sm:pb-4 border-b border-foreground/[0.06]">
                      {org.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 shrink-0 text-red-500/70" />
                          <span>{org.location}</span>
                        </span>
                      )}
                      {org.partner && (
                        <span className="inline-flex items-center gap-1.5">
                          <Layers className="h-3 w-3 shrink-0 text-foreground/40" />
                          <span>{org.partner}</span>
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/65 mb-4 sm:mb-6">
                      {org.description}
                    </p>
                  </div>

                  {/* Interactive Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                    {org.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/[0.07] bg-foreground/[0.025] px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium text-foreground/65 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/5 hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right Column: Photo Gallery Carousel ── */}
                <div className="lg:col-span-6 w-full">
                  <PhotoGalleryCarousel
                    photos={org.photos}
                    aspectRatio="aspect-video"
                    autoPlayInterval={4500}
                  />
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
