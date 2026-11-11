'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Calendar,
} from 'lucide-react';
import ConnectSection from '../../components/sections/ConnectSection';
import ProjectCarousel from '../../components/ProjectCarousel';
import { GithubIcon } from '../../components/icons';
import { useScrollReveal } from '../../lib/useScrollReveal';

type ProjectCategory = 'Data & Research' | 'Web Development' | 'Modeling & Simulation' | 'Machine Learning';

interface Project {
  name: string;
  role: string;
  year: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  repositories: { name: string; url: string }[];
  webApps: { name: string; url: string }[];
  images: { src: string; alt: string }[];
  publications?: { name: string; url: string }[];
}

export default function ProjectsPage() {
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05, rootMargin: '100px 0px 50px 0px' });

  const projects: Project[] = [
    {
      name: 'Virtual Assistant ALIEF: Edukasi Cicilan Emas BSN',
      role: 'Full-Stack & AI Engineer',
      year: '2026',
      category: 'Web Development',
      description:
        'Developed an interactive web platform and AI-powered virtual assistant (ALIEF) for PT Bank Syariah Nasional’s Sharia gold installment financing product (BSN Cicil Emas). Features real-time daily gold price tracking across major providers (Antam, Galeri 24, UBS), an interactive Murabahah financing & FTV simulation calculator, and a conversational assistant for instant product consultation.',
      tags: ['Next.js', 'Gemini API', 'Financial Simulation', 'Sharia Fintech', 'Web Development'],
      repositories: [
        { name: 'Chatbot Repo', url: '#' },
      ],
      webApps: [
        { name: 'Launch Assistant', url: 'https://cilem-chatbot.vercel.app/' },
      ],
      images: [
        { src: '/projects_picts/cilem/1.png', alt: 'Landing Page' },
        { src: '/projects_picts/cilem/2.png', alt: 'Gold Price Trend & Bullion Table' },
        { src: '/projects_picts/cilem/3.png', alt: 'Financing Simulation Calculator' },
        { src: '/projects_picts/cilem/4.png', alt: 'Chatbot ALIEF' },
      ],
    },
    {
      name: 'Strategy to Increase Third-Party Funds by Optimizing BSN Customer/Prospective Customer Onboarding on the Bale Syariah App',
      role: 'Data Analyst & Researcher',
      year: '2026',
      category: 'Data & Research',
      description:
        'Analyzed user reviews through web scraping and sentiment analysis to identify key issues in the onboarding process, particularly those related to SMS OTP delivery. The analysis led to a proposed migration of OTP delivery from SMS to WhatsApp. In addition, cost calculations and simulations were developed to evaluate potential impacts on costs, activation success rates, savings, and break-even point (BEP).',
      tags: ['Sentiment Analysis', 'Web Scraping', 'Cost Analysis', 'Fintech Optimization'],
      repositories: [
        { name: 'CBA Code', url: 'https://github.com/gadeeng/cba-bale-syariah' },
        { name: 'Sentiment Model', url: '#' },
      ],
      webApps: [
        { name: 'CBA Dashboard', url: 'https://balesyariah-cba.streamlit.app/' },
        { name: 'Sentiment App', url: '#' },
      ],
      images: [
        { src: '/projects_picts/bsn/1.jpg', alt: 'Project Title & Executive Brief' },
        { src: '/projects_picts/bsn/2.jpg', alt: 'Identification of Problems in User Onboarding' },
        { src: '/projects_picts/bsn/3.jpg', alt: 'Implementation Roadmap & Timeline' },
        { src: '/projects_picts/bsn/4.jpg', alt: 'Cost-Benefit Analysis Mathematical Formula' },
        { src: '/projects_picts/bsn/q.jpg', alt: 'Cost-Benefit Analysis Quantitative Result' },
        { src: '/projects_picts/bsn/6.jpg', alt: 'Technical and Operational Limitations' },
        { src: '/projects_picts/bsn/7.jpg', alt: 'Strategic Conclusions & Recommendations' },
        { src: '/projects_picts/bsn/8.jpg', alt: 'CBA Calculation & Decision Flowchart' },
        { src: '/projects_picts/bsn/a.png', alt: 'Interactive Cost-Benefit Analysis Dashboard' },
        { src: '/projects_picts/bsn/b.png', alt: 'Cost-Benefit Analysis Visualization Engine' },
        { src: '/projects_picts/bsn/d.png', alt: 'NLP Sentiment Modeling & Evaluation' },
        { src: '/projects_picts/bsn/c.png', alt: 'Sentiment Model Training Metrics' },
      ],
    },
    {
      name: 'Service Quality Evaluation of PT Pelindo Daya Sejahtera Using the SERVQUAL Framework and Gioia Method',
      role: 'Data Analyst',
      year: '2026',
      category: 'Data & Research',
      description:
        'Evaluated the service quality of PT Pelindo Daya Sejahtera using the SERVQUAL framework and Gioia Method. Customer feedback was collected and analyzed to identify service strengths and key problem areas. The findings were used as a basis for strategic recommendations to improve service quality, customer satisfaction, and operational performance.',
      tags: ['SERVQUAL', 'Gioia Method', 'Quality Analysis', 'Corporate Strategy'],
      repositories: [],
      webApps: [
        { name: 'Live Analysis Portal', url: 'https://gioiadashboard.vercel.app/' },
      ],
      images: [
        { src: '/projects_picts/pelindo/surveyAnalysis/1.png', alt: 'SERVQUAL Overview & Executive Dashboard' },
        { src: '/projects_picts/pelindo/surveyAnalysis/2.png', alt: 'Comprehensive Pain Points Diagnostics' },
        { src: '/projects_picts/pelindo/surveyAnalysis/3.png', alt: 'Gain Points & Strategic Opportunities' },
        { src: '/projects_picts/pelindo/surveyAnalysis/4.png', alt: 'Multi-Departmental Comparison Tab' },
      ],
    },
    {
      name: 'Survey Portal PT Pelindo Daya Sejahtera',
      role: 'Full-Stack Developer',
      year: '2026',
      category: 'Web Development',
      description:
        'Developed an end-to-end web-based survey portal for managing the Customer Satisfaction Index (CSI) and various corporate survey requirements at PT Pelindo Daya Sejahtera with dynamic forms and automated reporting.',
      tags: ['Next.js', 'Web Development', 'Survey Management', 'CSI Analytics'],
      repositories: [
        { name: 'Survey Portal Repo', url: 'https://github.com/gadeeng/survey-portal' },
      ],
      webApps: [
        { name: 'Launch Portal', url: 'https://surveypds.vercel.app' },
      ],
      images: [
        { src: '/projects_picts/pelindo/websurvey/1.png', alt: 'Secure Authentication & Login Interface' },
        { src: '/projects_picts/pelindo/websurvey/2.png', alt: 'Survey Catalog & Administration Management' },
        { src: '/projects_picts/pelindo/websurvey/3.png', alt: 'Interactive Respondent Survey Interface' },
        { src: '/projects_picts/pelindo/websurvey/4.png', alt: 'Automated Real-Time Results & CSI Calculation' },
        { src: '/projects_picts/pelindo/websurvey/5.png', alt: 'Dynamic Survey Builder & Custom Fields' },
      ],
    },
    {
      name: 'Optimization of Optimal Visitor Capacity and Ride Selection Strategy at Dufan Ancol Using ABMS',
      role: 'Researcher & Developer',
      year: '2026',
      category: 'Modeling & Simulation',
      description:
        'Developed an agent-based simulation using an M/M/1 queueing model to analyze visitor behavior and optimize amusement park operations. The simulation identified an optimal daily visitor capacity of approximately 2,500 visitors and a ride selection strategy that increased ride participation by more than 40%.',
      tags: ['Agent-Based Modeling', 'Simulation', 'Queueing Theory', 'Operations Research'],
      repositories: [
        { name: 'Simulation Source', url: 'https://github.com/Roykhan-Putin/Simulation-Project' },
      ],
      webApps: [
        { name: 'Interactive Simulator', url: 'https://dufan-simulation.vercel.app/' },
      ],
      images: [
        { src: '/projects_picts/dufan/1.png', alt: 'Agent-Based Simulation Dynamic Visualization' },
        { src: '/projects_picts/dufan/2.png', alt: 'Visitor Flow Dynamics & Congestion Heatmap' },
        { src: '/projects_picts/dufan/3.png', alt: 'M/M/1 Queueing Performance Metrics' },
        { src: '/projects_picts/dufan/4.png', alt: 'Attraction Wait Time Optimization Curve' },
        { src: '/projects_picts/dufan/5.png', alt: 'Capacity Threshold Sensitivity Analysis' },
        { src: '/projects_picts/dufan/6.png', alt: 'Comparative Ride Participation Outcomes' },
      ],
      publications: [
        { name: "Achmad Roykhan Sabiq", url: 'https://www.linkedin.com/in/achmadroykhansabiq/' },
        { name: 'Aprilia Cristy Rajagukguk', url: 'https://www.linkedin.com/in/aprilia-cristy-rajagukguk-3b6a41272/' },
      ],
    },
    {
      name: 'Stability Analysis of Leslie-Gower Predator-Prey Model',
      role: 'Mathematical Researcher',
      year: '2025',
      category: 'Modeling & Simulation',
      description:
        'Analyzed the stability of a complex predator-prey ecological system using a modified Leslie-Gower model incorporating prey cooperation and the fear effect on predators. The analytical framework was verified via Jacobian matrix eigenvalues and extensive numerical simulations in Python.',
      tags: ['Mathematical Modeling', 'Stability Analysis', 'Python', 'Differential Equations'],
      repositories: [],
      webApps: [
        { name: 'Research Presentation', url: 'https://canva.link/dbhlsab88mhu6mk' },
      ],
      images: [
        { src: '/projects_picts/predator-prey/1.jpg', alt: 'Undergraduate Thesis & Scientific Monograph' },
        { src: '/projects_picts/predator-prey/2.jpg', alt: 'Ecological Background & Theoretical Motivation' },
        { src: '/projects_picts/predator-prey/3.jpg', alt: 'Lotka-Volterra & Leslie-Gower Mathematical Formulation' },
        { src: '/projects_picts/predator-prey/4.jpg', alt: 'Methodology & Jacobian Equilibrium Points' },
        { src: '/projects_picts/predator-prey/5.jpg', alt: 'Phase Plane Simulation & Trajectory Behavior #1' },
        { src: '/projects_picts/predator-prey/6.jpg', alt: 'Phase Plane Simulation & Limit Cycles #2' },
        { src: '/projects_picts/predator-prey/7.jpg', alt: 'Prey Cooperation vs Fear Parameter Sensitivity' },
        { src: '/projects_picts/predator-prey/8.jpg', alt: 'Mathematical Stability Synthesis & Conclusions' },
      ],
    },
    {
      name: 'Commodity Price Forecasting in Indonesia',
      role: 'Machine Learning Engineer',
      year: '2025',
      category: 'Machine Learning',
      description:
        'Engineered an end-to-end machine learning pipeline to forecast daily staple food commodity prices across 34 provinces in Indonesia. An Extra Trees Regressor model was trained on multivariate historical datasets to accurately forecast prices of volatile commodities such as rice, shallots, and chili.',
      tags: ['Machine Learning', 'Forecasting', 'Extra Trees', 'Streamlit', 'Python'],
      repositories: [
        { name: 'ML Pipeline Code', url: 'https://github.com/gadeeng/commodity-forecasting' },
      ],
      webApps: [
        { name: 'Forecasting Web App', url: 'https://commodityprice.streamlit.app/' },
      ],
      images: [
        { src: '/projects_picts/commodity/1.png', alt: 'Commodity Selection & Province Interactive Filter' },
        { src: '/projects_picts/commodity/2.png', alt: 'Historical Trend & Forecast Summary Dashboard' },
        { src: '/projects_picts/commodity/3.png', alt: 'Provincial Commodity Average Price Matrix' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="mx-auto w-full max-w-5xl px-4 pt-24 pb-14 sm:px-8 sm:pt-36 sm:pb-24">

        {/* ── Page Header ─────────────────────────────────── */}
        <header className="mb-10 sm:mb-16">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="h-8 sm:h-12 w-1.5 rounded-full bg-red-500 shrink-0 mt-0.5 sm:mt-1" aria-hidden="true" />
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
                Projects<span className="text-red-500">.</span>
              </h1>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-foreground/60 max-w-2xl leading-relaxed">
                A collection of projects I’ve worked on, built to solve problems and turn ideas into meaningful outcomes.
              </p>
            </div>
          </div>
        </header>

        {/* ── Apple Bento Showcase Cards ──────────────────────────────── */}
        <div className="flex flex-col gap-8 sm:gap-14">
          {projects.map((proj, projIndex) => (
            <article
              key={proj.name}
              className="group relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl p-4.5 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_32px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:border-black/[0.12] dark:hover:border-white/[0.18] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black/10 dark:before:via-white/20 before:to-transparent"
            >
              {/* Card Header & Metadata Row */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {/* Role Pill */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-red-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      {proj.role}
                    </span>

                    {/* Category Tag */}
                    <span className="rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-foreground/70">
                      {proj.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <span className="inline-flex items-center gap-1 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04] px-2.5 py-0.5 text-[11px] sm:text-xs font-mono font-medium text-foreground/60">
                    <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60" />
                    {proj.year}
                  </span>
                </div>

                {/* Project Title */}
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-[1.25] break-words">
                  {proj.name}
                </h2>

                {/* Description */}
                <p className="text-[13px] sm:text-base text-foreground/70 leading-relaxed max-w-4xl">
                  {proj.description}
                </p>

                {/* Optional Publications / Mentions */}
                {proj.publications && proj.publications.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1 text-[11px] sm:text-xs">
                    <span className="text-foreground/50 font-medium">Collaborated with & Featured on:</span>
                    {proj.publications.map((pub, pIdx) => (
                      <a
                        key={pub.name}
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
                      >
                        {pub.name}
                        <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60" />
                        {pIdx < (proj.publications?.length ?? 0) - 1 && <span className="no-underline ml-0.5 text-foreground/30">•</span>}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Media Gallery / Screen Display */}
              {proj.images.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <ProjectCarousel
                    name={proj.name}
                    images={proj.images}
                    priority={projIndex === 0}
                  />
                </div>
              )}

              {/* Bottom Footer: Tags & Action Buttons */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Tech & Framework Tags */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-2.5 py-1 text-[11px] sm:text-xs font-medium text-foreground/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons Hub (Apple Pill Buttons) */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                  {/* Web Apps / Live Demos */}
                  {proj.webApps.map((app) => {
                    const isUpcoming = app.url === '#' || !app.url;

                    if (isUpcoming) {
                      return (
                        <span
                          key={app.name}
                          className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-medium text-foreground/40 cursor-not-allowed select-none"
                        >
                          <span>{app.name}</span>
                          <span className="text-[9px] sm:text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-foreground/10">In Prep</span>
                        </span>
                      );
                    }

                    return (
                      <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 sm:py-2 transition-all active:scale-[0.96] shadow-sm hover:shadow-[0_0_15px_rgba(234,67,53,0.3)]"
                      >
                        <span>{app.name}</span>
                        <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </a>
                    );
                  })}

                  {/* Repositories */}
                  {proj.repositories.map((repo) => {
                    const isUpcoming = repo.url === '#' || !repo.url;

                    if (isUpcoming) {
                      return (
                        <span
                          key={repo.name}
                          className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-medium text-foreground/40 cursor-not-allowed select-none"
                        >
                          <GithubIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-50" />
                          <span>{repo.name}</span>
                          <span className="text-[9px] sm:text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-foreground/10">Private</span>
                        </span>
                      );
                    }

                    return (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-black/[0.1] dark:border-white/[0.15] bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-foreground font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 sm:py-2 transition-all active:scale-[0.96]"
                      >
                        <GithubIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span>{repo.name}</span>
                        <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-60" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── Let's Connect Section ───────────────────────────────────── */}
      <ConnectSection />
    </div>
  );
}
