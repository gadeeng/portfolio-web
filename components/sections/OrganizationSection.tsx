'use client';

import React from 'react';
import {
  Users,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import PhotoGalleryCarousel, { GalleryPhoto } from './PhotoGalleryCarousel';
import { useScrollReveal } from '@/lib/useScrollReveal';

// ── Accent Color (matches portfolio branding) ────────────────────────────────
const ACCENT = '#EF4444';

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
      'Support media management through graphic design, content creation, and visual branding, oversee design quality to ensure consistency with organizational visual standards, and contribute to the development of media and communications strategies.',
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
      'Manage media and communications for educational outreach programs, including FunMath Camp (2023) and Play to Solve: A Math Game Day (2025), organized through a collaboration between Universitas Airlangga and Universiti Teknologi Malaysia, by creating content, and handling documentation.',
    tags: ['Event Documentation', 'Interactive Math'],
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
      'In 2024, the Mathematics Study Program at Universitas Airlangga collaborated with the Department of Cooperatives, Industry, and Trade of Situbondo Regency and local MSME (Micro, Small, and Medium Enterprise) owners to enhance digital literacy through training in marketing and product branding based on local wisdom. The activities included social media training, online store creation, monitoring, mentoring, and evaluation. This program improved the competencies of MSME owners in digitally marketing Situbondo’s leading local products.',
    tags: ['Event Documentation', 'UMKM Empowerment'],
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
    partner: 'SMKN Rengel Tuban (Multimedia & DKV)',
    location: 'Tuban, Jawa Timur',
    description:
      'Content Creator Trainingat SMKN Rengel, Tuban, was organized by the Community Service Team of the Bachelor’s Degree Program in Mathematics at Universitas Airlangga on July 18, 2024. The activity aimed to enhance students’ creativity and knowledge in digital content creation while introducing content creation as a potential career opportunity in the social media era. The training was attended by students from the Multimedia and Visual Communication Design departments.',
    tags: ['Event Documentation', 'Video Editing'],
    photos: [
      { src: '/org_exp/tuban/21.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Group Photo with Participants' },
      { src: '/org_exp/tuban/22.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Photo with The Speaker' },
      { src: '/org_exp/tuban/23.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Pre-test Session' },
      { src: '/org_exp/tuban/24.jpg', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Practical Session: Videography' },
      { src: '/org_exp/tuban/25.png', title: 'Community Service at SMKN Rengel Tuban, Jawa Timur', caption: 'Presentation of Material by Londo Kampung Team' },
    ],
  },
];

// ── Main Component ───────────────────────────────────────────────────────────
export default function OrganizationSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      id="organization"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-5xl px-6 sm:px-10 py-14 sm:py-20"
    >
      {/* ── Section Header ── */}
      <div
        data-reveal
        data-delay="0"
        className="reveal mb-10 flex items-baseline justify-between border-b border-foreground/10 pb-5"
      >
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-[#EF4444]" />
          <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-foreground/60 uppercase">
            Organizational Experience
          </h2>
        </div>
      </div>

      {/* ── Experience Cards List ── */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {ORGANIZATIONS.map((org, index) => (
          <article
            key={org.id}
            data-reveal
            data-delay={60 + index * 100}
            className="reveal card-hover-lift group relative rounded-2xl border border-foreground/10 bg-foreground/[0.015] hover:bg-foreground/[0.025] hover:border-foreground/20 transition-all duration-300 p-6 sm:p-8"
          >
              {/* 2-Column Split: Content on Left, Photography Carousel on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* ── Left Column: Initiative Narrative & Details ── */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Row: Index Number & Category Badge */}
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <span className="text-xs font-mono font-medium text-[#EF4444]">
                        /{org.index}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-foreground/[0.04] border border-foreground/10 px-2.5 py-0.5 text-[11px] font-medium text-foreground/75">
                        {org.category}
                      </span>
                    </div>

                    {/* Organization Name */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                      {org.organization}
                    </h3>

                    {/* Role & Period */}
                    <div className="mt-1 mb-3">
                      <p className="text-sm font-semibold text-foreground/90">
                        {org.role}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-1 font-mono">
                        <Calendar className="h-3 w-3 opacity-60" />
                        <span>{org.period}</span>
                      </div>
                    </div>

                    {/* Metadata (Location & Partner) */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60 mb-4 pb-3 border-b border-foreground/8">
                      {org.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 opacity-60" />
                          {org.location}
                        </span>
                      )}
                      {org.partner && (
                        <span className="inline-flex items-center gap-1.5">
                          <Layers className="h-3 w-3 opacity-60" />
                          {org.partner}
                        </span>
                      )}
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-[13.5px] leading-relaxed text-foreground/70 mb-5">
                      {org.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {org.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-foreground/8 bg-foreground/[0.03] px-2.5 py-1 text-[11px] font-medium text-foreground/65 transition-colors group-hover:border-foreground/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right Column: Photography Carousel ── */}
                <div className="lg:col-span-6 w-full">
                  <PhotoGalleryCarousel
                    photos={org.photos}
                    aspectRatio="aspect-[16/10]"
                    autoPlayInterval={4500}
                  />
                </div>

              </div>
            </article>
          ))}
        </div>
      </section>
  );
}
