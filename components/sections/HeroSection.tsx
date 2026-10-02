'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Mail } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import TextType from '@/components/react-bits/TextType';

// Dynamically import Lanyard (Three.js — client-only, no SSR)
const Lanyard = dynamic(() => import('../react-bits/Lanyard'), { ssr: false });
// HalftoneNebula uses raw WebGL2 — client-only, no SSR
const HalftoneNebula = dynamic(() => import('../react-bits/HalftoneNebula'), { ssr: false });
// GridPulse — canvas grid untuk light mode, sangat ringan
const GridPulse = dynamic(
  () => import('@/components/ui/grid-pulse').then(m => ({ default: m.GridPulse })),
  { ssr: false },
);

const competencies = [
  { label: 'Mathematical Modeling', kanji: '数理' },
  { label: 'Machine Learning', kanji: '機械' },
  { label: 'Predictive Analytics', kanji: '予測' },
  { label: 'Optimization', kanji: '最適' },
];

// Deteksi mobile sekali saat mount — mengurangi WebGL overhead di layar kecil
function useMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function HeroSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isMobile = useMobile();

  // Direct DOM attribute mutation — no setState re-render, zero lag on refresh
  const sectionRef = useRef<HTMLElement>(null);
  const [mount3D, setMount3D] = React.useState(false);

  useEffect(() => {
    // Defer heavy 3D Canvas initialization slightly so loading screen renders initial frames at locked 120 FPS
    const timer = setTimeout(() => setMount3D(true), 150);
    const handleLoaded = () => setMount3D(true);
    window.addEventListener('portfolio:loaded', handleLoaded, { once: true });

    // requestAnimationFrame ensures the browser has painted before we trigger animations
    const raf = requestAnimationFrame(() => {
      sectionRef.current?.setAttribute('data-mounted', '');
    });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('portfolio:loaded', handleLoaded);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Nebula params — dioptimalkan untuk performa & tema ────────────────
  // Strategi performa:
  //   pixel besar  → sel lebih sedikit, shader lebih cepat
  //   levels kecil → iterasi quantize lebih sedikit
  //   warp rendah  → fbm lebih ringan
  //   sparkles/stars dikurangi → loop di shader lebih pendek
  //   planet nonaktif di mobile → satu cabang shader dihilangkan
  //   maxDpr 1.5   → resolusi canvas lebih kecil
  const nebulaParams = React.useMemo(() => ({
    // Planet di sudut kanan atas, menjauh dari teks
    planetX: 0.74,
    planetY: 0.2,
    planet: !isMobile,

    // Palet merah Hinomaru — tetap satu warna utama, opacity diatur di wrapper
    voidColor: '#050309',
    hazeColor: '#1a0508',
    duskColor: '#3b0808',
    wineColor: '#5c0d0d',
    crimsonColor: '#c01212',
    hotColor: '#e60012',
    starColor: '#f6e2e2',

    // ── Performa ──────────────────────────────────────────────────────────
    // pixel lebih besar = sel jauh lebih sedikit per frame
    pixel: isMobile ? 8 : 10,
    // quantisation steps dikurangi (default 7 → 5)
    levels: 5,
    // domain-warp diturunkan → fbm lebih ringan
    warp: 0.9,
    // sparkle: max 4 di desktop, 2 di mobile (setiap sparkle = 1 loop di fragment)
    sparkles: isMobile ? 2 : 4,
    // kepadatan bintang parallax dikurangi
    stars: isMobile ? 0.35 : 0.55,
    // kecepatan animasi — lebih lambat = GPU tidak bekerja maksimal terus
    speed: isMobile ? 0.45 : 0.65,

    // ── Gas & visual ──────────────────────────────────────────────────────
    density: 0.44,
    haze: 0.6,
    vignette: 0.5,
    grain: 0.022,
    band: 0.45,
  }), [isMobile]);

  return (
    <section id="hero" ref={sectionRef} className="relative isolate w-full overflow-hidden">

      {/* ── Background (dark: HalftoneNebula | light: GridPulse) ─────────── */}
      <div
        className="absolute inset-x-1.5 top-1.5 bottom-0 z-0 overflow-hidden rounded-t-[16px] border-t border-x border-foreground/8 sm:inset-x-2.5 sm:top-2 sm:rounded-t-[20px]"
        aria-hidden="true"
      >
        {/* Dark mode: Halftone Nebula pixel-art sky */}
        {!isLight && (
          <div
            style={{
              position: 'absolute', inset: 0,
              opacity: 0.58,
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            }}
          >
            <HalftoneNebula
              height="100%"
              params={nebulaParams}
              interactive={!isMobile}
              touch="scroll"
              maxDpr={isMobile ? 1 : 1.5}
              className="absolute inset-0"
            />
          </div>
        )}

        {/* Light mode: GridPulse — grid halus yang menyala di bawah pointer.
            Lebih ringan dari WebGL nebula, cocok untuk tema terang.
            Warna mengikuti foreground theme secara otomatis. */}
        {isLight && (
          <>
            <GridPulse
              cell={isMobile ? 20 : 26}
              reach={2.0}
              ambient={2}
              maxLit={120}
              className="[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
            />
            {/* Aksen merah Hinomaru tipis agar section tidak terasa kosong */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(230,0,18,0.08) 0%, rgba(185,28,28,0.03) 50%, transparent 75%)',
              }}
            />
          </>
        )}
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-22 pb-8 sm:px-10 sm:pt-30 sm:pb-10">

        {/* Vertical Left Gutter — Japanese watermark */}
        <div
          className="pointer-events-none absolute left-0 top-24 sm:top-28 hidden xl:flex flex-col items-center gap-6 select-none"
          aria-hidden="true"
        >
          <span className="writing-vertical font-serif text-[11px] tracking-[0.5em] text-foreground/[0.07] dark:text-foreground/[0.10]">
            数理科学・データサイエンス
          </span>
          <span className="h-16 w-[1px] bg-foreground/[0.07]" />
        </div>

        {/* ── Main Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-6 lg:gap-8">

          {/* Left Column — Identity & Content (6 cols) */}
          <div className="flex flex-col md:col-span-6">

            {/* ── Welcome TextType ─────────────────────────────────── */}
            <div className="mb-3 flex items-center gap-3 hero-name-animate hero-name-animate-1">
              <div className="h-[1px] w-5 bg-[#e60012]/60" aria-hidden="true" />
              <TextType
                as="span"
                text={['ようこそ', 'Welcome', 'Selamat Datang']}
                typingSpeed={65}
                deletingSpeed={35}
                pauseDuration={2200}
                loop={true}
                showCursor={true}
                cursorCharacter="_"
                cursorClassName="text-[#e60012]"
                className="font-mono text-[11px] tracking-[0.28em] text-foreground/45 uppercase"
              />
            </div>

            {/* ── Display Headline ─────────────────────────────────── */}
            <div className="mb-4" aria-label="Gading Wisnu Kusuma">
              {/* Subtitle above name */}
              <div className="mb-2 flex items-center gap-3 hero-name-animate hero-name-animate-1">
                <span className="text-[10px] font-mono font-semibold tracking-[0.25em] text-[#e60012] uppercase">
                  Mathematical Modeling
                </span>
              </div>

              {/* Name lines — stacked display weight (adjusted clamp to fit viewport gracefully) */}
              <div className="flex flex-col leading-[0.95]">
                <span
                  className="block text-[clamp(2.5rem,6vw,4.25rem)] font-black tracking-[-0.04em] text-foreground hero-name-animate hero-name-animate-1"
                >
                  GADING
                </span>
                <span
                  className="block text-[clamp(2.5rem,6vw,4.25rem)] font-black tracking-[-0.04em] text-foreground hero-name-animate hero-name-animate-2"
                >
                  WISNU
                </span>
                <div className="flex items-end gap-3 sm:gap-4 hero-name-animate hero-name-animate-3">
                  <span className="block text-[clamp(2.5rem,6vw,4.25rem)] font-black tracking-[-0.04em] text-foreground">
                    KUSUMA
                  </span>
                  {/* Hinomaru red dot — the central motif */}
                  <span
                    className="mb-[0.12em] block h-[0.55em] w-[0.55em] shrink-0 rounded-full bg-[#e60012]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Role divider */}
              <div className="mt-3 flex items-center gap-3 hero-name-animate hero-name-animate-3">
                <div className="h-[1px] w-5 bg-[#e60012]/50" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-medium text-foreground/50 tracking-[0.14em] uppercase">
                  Mathematics Graduate
                </span>
                <span className="text-[#e60012]/60 text-xs">·</span>
                <span className="text-[11px] sm:text-xs font-medium text-foreground/50 tracking-[0.14em] uppercase">
                  Data Science
                </span>
                <div className="h-[1px] flex-1 bg-foreground/8" aria-hidden="true" />
              </div>
            </div>

            {/* ── Biography ─────────────────────────────────────────── */}
            <p className="max-w-[48ch] text-[14px] sm:text-[15px] leading-[1.6] text-foreground/60 mb-5 hero-name-animate hero-name-animate-3">
              Bachelor of Science in Mathematics from Universitas Airlangga. Specializing in
              mathematical modeling, machine learning, and optimization algorithms to transform
              complex data into real-world intelligence.
            </p>

            {/* ── Competency Row — monospace ink style ──────────────── */}
            <div className="mb-5 flex flex-wrap items-center gap-x-0 gap-y-1.5 border-t border-foreground/10 pt-3.5 hero-name-animate hero-name-animate-3">
              {competencies.map((comp, i) => (
                <React.Fragment key={comp.label}>
                  <div className="group flex items-center gap-2 pr-3.5 transition-colors duration-200">
                    <span className="font-mono text-[11px] text-[#e60012]/65 group-hover:text-[#e60012] transition-colors duration-200">
                      {comp.kanji}
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-medium text-foreground/45 group-hover:text-foreground/75 tracking-[0.06em] uppercase transition-colors duration-200">
                      {comp.label}
                    </span>
                  </div>
                  {i < competencies.length - 1 && (
                    <span className="pr-3.5 text-foreground/15 text-xs select-none" aria-hidden="true">｜</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ── CTAs (Clearly Visible Above the Fold) ─────────────── */}
            <div className="flex flex-wrap items-center gap-3 hero-name-animate hero-name-animate-3">
              {/* Primary — Lacquer crimson */}
              <Link
                href="#connect"
                className="focus-ring group relative inline-flex h-10 sm:h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e60012] px-6 text-xs sm:text-sm font-semibold text-white tracking-[0.06em] uppercase shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-[#c80010] hover:shadow-red-600/30 active:scale-[0.98]"
              >
                <Mail className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                Contact
              </Link>

              {/* Secondary — ink outline */}
              <Link
                href="/projects"
                className="focus-ring group inline-flex h-10 sm:h-11 cursor-pointer items-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 text-xs sm:text-sm font-semibold text-foreground/65 tracking-[0.06em] uppercase transition-all duration-300 hover:border-foreground/35 hover:text-foreground hover:bg-foreground/[0.03] active:scale-[0.98]"
              >
                View Work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Right Column — 3D Lanyard (6 cols) */}
          <div className="relative md:col-span-6 flex items-start justify-center hero-name-animate hero-name-animate-2 -mt-4 md:-mt-8">

            {/* Hinomaru ring aura */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e60012]/8"
                style={{ width: 380, height: 380 }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e60012]/14"
                style={{ width: 280, height: 280 }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  opacity: isLight ? 0.45 : 0.95,
                  transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'radial-gradient(circle, rgba(230,0,18,0.16) 0%, rgba(230,0,18,0.04) 55%, transparent 75%)',
                }}
              />
            </div>

            {/* Lanyard container — lebih kecil di mobile agar tidak overflow */}
            <div className="relative h-[300px] sm:h-[420px] md:h-[460px] lg:h-[500px] w-full max-w-[320px] sm:max-w-[400px]">
              {mount3D ? (
                <Lanyard
                  position={[0, -0.05, 11.8]}
                  gravity={[0, -40, 0]}
                  fov={18}
                  transparent={true}
                  anchorPosition={[0, 3.7, 0]}
                  jointDistance={0.88}
                  cardScale={isMobile ? 2.0 : 2.65}
                  frontImage="/Lanyard%20Pics.webp"
                  backImage="/Lanyard%20Pics.webp"
                  imageFit="cover"
                />
              ) : (
                <div className="h-full w-full" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom Ink Rule ───────────────────────────────────────── */}
        <div className="mt-12 flex items-center gap-4 hero-name-animate hero-name-animate-3" aria-hidden="true">
          <div className="h-[1px] w-8 bg-[#e60012]/40" />
          <span className="text-[9px] font-mono tracking-[0.3em] text-foreground/20 uppercase">
            Portfolio · 2026
          </span>
          <div className="h-[1px] flex-1 bg-foreground/8" />
          <span className="text-[9px] font-mono tracking-[0.3em] text-foreground/20 uppercase">
            数理科学
          </span>
          <div className="h-[1px] w-8 bg-foreground/8" />
        </div>

      </div>
    </section>
  );
}
