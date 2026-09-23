'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, X, AlertCircle } from 'lucide-react';
import ConnectSection from '../../components/sections/ConnectSection';
import ProjectCarousel from '../../components/ProjectCarousel';

// ── Smooth popup animation styles ──────────────────────────────────
const POPUP_STYLES = `
@keyframes popupFadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
}

@keyframes popupSlideUp {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.popup-backdrop {
  animation: popupFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.popup-content {
  animation: popupSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = POPUP_STYLES;
  document.head.appendChild(style);
}

export default function ProjectsPage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Tampilkan popup setelah komponen dimount
    setShowPopup(true);
  }, []);
  const projects = [
    {
      name: 'Strategy to Increase Third-Party Funds by Optimizing BSN Customer/Prospective Customer Onboarding on the Bale Syariah App',
      role: 'Data Analyst & Researcher',
      year: '2026',
      description: 'Analyzed user reviews through web scraping and sentiment analysis to identify key issues in the onboarding process, particularly those related to SMS OTP delivery. The analysis led to a proposed migration of OTP delivery from SMS to WhatsApp. In addition, cost calculations and simulations were developed to evaluate potential impacts on costs, activation success rates, savings, and break-even point (BEP).',
      tags: ['Sentiment Analysis', 'Web Scraping', 'Cost Analysis'],
      repositories: [
        { name: 'CBA Code', url: 'https://github.com/gadeeng/cba-bale-syariah' },
        { name: 'Sentiment Model', url: '#' },
      ],
      webApps: [
        { name: 'CBA Dashboard', url: 'https://balesyariah-cba.streamlit.app/' },
        { name: 'Sentiment App', url: '#' }
      ],
      images: [
        { src: '/projects_picts/bsn/1.jpg', alt: 'Project Title' },
        { src: '/projects_picts/bsn/2.jpg', alt: 'Identification of problems' },
        { src: '/projects_picts/bsn/3.jpg', alt: 'Implementation Timeline' },
        { src: '/projects_picts/bsn/4.jpg', alt: 'Cost-Benefit Analysis Formula' },
        { src: '/projects_picts/bsn/q.jpg', alt: 'Cost-Benefit Analysis Result' },
        { src: '/projects_picts/bsn/6.jpg', alt: 'Limitations' },
        { src: '/projects_picts/bsn/7.jpg', alt: 'Conclusion' },
        { src: '/projects_picts/bsn/8.jpg', alt: 'Cost-Benefit Analysis Calculation Flowchart' },
        { src: '/projects_picts/bsn/a.png', alt: 'Cost-Benefit Analysis Dashboard' },
        { src: '/projects_picts/bsn/b.png', alt: 'Cost-Benefit Analysis Visualization' },
        { src: '/projects_picts/bsn/d.png', alt: 'Sentiment Model (I have not deploy this model yet :D)' },
        { src: '/projects_picts/bsn/c.png', alt: 'Sentiment Model (I have not deploy this model yet :D)' },
      ],
    },
    {
      name: 'Service Quality Evaluation of PT Pelindo Daya Sejahtera Using the SERVQUAL Framework and Gioia Method',
      role: 'Data Analyst',
      year: '2026',
      description: 'Evaluated the service quality of PT Pelindo Daya Sejahtera using the SERVQUAL framework and Gioia Method. Customer feedback was collected and analyzed to identify service strengths and key problem areas. The findings were used as a basis for strategic recommendations to improve service quality, customer satisfaction, and operational performance.',
      tags: ['SERVQUAL', 'Gioia Method', 'Quality Analysis'],
      repositories: [],
      webApps: [
        { name: 'Analysis Portal', url: '#' },
      ],
      images: [
        { src: '/projects_picts/pelindo/surveyAnalysis/1.png', alt: 'Overview Tab' },
        { src: '/projects_picts/pelindo/surveyAnalysis/2.png', alt: 'Pain Points' },
        { src: '/projects_picts/pelindo/surveyAnalysis/3.png', alt: 'Gain Points' },
        { src: '/projects_picts/pelindo/surveyAnalysis/4.png', alt: 'Comparation Tab' },
      ],
    },
    {
      name: 'Survey Portal PT Pelindo Daya Sejahtera',
      role: 'Full-Stack Developer',
      year: '2026',
      description: 'Developed a web-based survey portal for managing the Customer Satisfaction Index (CSI) and various internal survey requirements at PT Pelindo Daya Sejahtera.',
      tags: ['Web Development', 'Survey Management', 'CSI'],
      repositories: [
        { name: 'Survey Portal Code', url: 'https://github.com/gadeeng/survey-portal' },
      ],
      webApps: [
        { name: 'Survey Portal', url: 'https://surveypds.vercel.app' },
      ],
      images: [
        { src: '/projects_picts/pelindo/websurvey/1.png', alt: 'Login Page' },
        { src: '/projects_picts/pelindo/websurvey/2.png', alt: 'List Survey Page' },
        { src: '/projects_picts/pelindo/websurvey/3.png', alt: 'Survey Page' },
        { src: '/projects_picts/pelindo/websurvey/4.png', alt: 'Survey Result Page' },
        { src: '/projects_picts/pelindo/websurvey/5.png', alt: 'Create New Survey' },
      ],
    },
    {
      name: 'Optimization of Optimal Visitor Capacity and Ride Selection Strategy at Dufan Ancol Using ABMS',
      role: 'Researcher & Developer',
      year: '2026',
      description: 'Developed an agent-based simulation using an M/M/1 queueing model to analyze visitor behavior and optimize amusement park operations. The simulation identified an optimal daily visitor capacity of approximately 2,500 visitors and a ride selection strategy that increased ride participation by more than 40%.',
      tags: ['Agent-Based Modeling', 'Simulation', 'Queueing Theory'],
      repositories: [
        { name: 'Simulation', url: '#' },
        { name: 'Analysis', url: '#' },
        { name: 'Documentation', url: '#' },
      ],
      webApps: [
        { name: 'Web Application', url: '#' },
        { name: 'Dashboard', url: '#' },
        { name: 'Results Viewer', url: '#' },
      ],
      images: [
        { src: '/projects/dufan-simulation/1.png', alt: 'Agent-Based Simulation Visualization' },
        { src: '/projects/dufan-simulation/2.png', alt: 'Visitor Flow Analysis' },
        { src: '/projects/dufan-simulation/3.png', alt: 'Queueing Model Results' },
      ],
      publications: [
        { name: 'Roy\'s LinkedIn', url: 'https://www.linkedin.com/in/achmadroykhansabiq/' },
        { name: 'April\'s LinkedIn', url: 'https://www.linkedin.com/in/aprilia-cristy-rajagukguk-3b6a41272/' },
      ],
    },
    {
      name: 'Stability Analysis of Leslie-Gower Predator-Prey Model',
      role: 'Researcher',
      year: '2025',
      description: 'Analyzed the stability of a predator-prey ecosystem using a modified Leslie-Gower model incorporating prey cooperation and the fear effect on predators. The analysis was conducted using the Jacobian matrix and numerical simulations in Python.',
      tags: ['Mathematical Modeling', 'Stability Analysis', 'Python'],
      repositories: [],
      webApps: [
        { name: 'Presentation', url: '#' },
      ],
      images: [
        { src: '/projects_picts/predator-prey/1.jpg', alt: 'Undergraduate Thesis' },
        { src: '/projects_picts/predator-prey/2.jpg', alt: 'Background' },
        { src: '/projects_picts/predator-prey/3.jpg', alt: 'Lotka-Volterra Model and Leslie-Gower Model' },
        { src: '/projects_picts/predator-prey/4.jpg', alt: 'Research Method' },
        { src: '/projects_picts/predator-prey/5.jpg', alt: 'Population Simulation and Phase Plane Simulation #1' },
        { src: '/projects_picts/predator-prey/6.jpg', alt: 'Population Simulation and Phase Plane Simulation #2' },
        { src: '/projects_picts/predator-prey/7.jpg', alt: 'Population Simulation and Phase Plane Simulation #3' },
        { src: '/projects_picts/predator-prey/8.jpg', alt: 'Conclusion' },
      ],
    },
    {
      name: 'Commodity Price Forecasting in Indonesia',
      role: 'Machine Learning Engineer',
      year: '2025',
      description: 'Developed an end-to-end machine learning model to forecast food commodity prices across 34 provinces in Indonesia. An Extra Trees Regressor was trained on historical regional data to predict prices of major commodities such as rice, chili, and shallots.',
      tags: ['Machine Learning', 'Forecasting', 'Extra Trees'],
      repositories: [
        { name: 'ML Model', url: 'https://github.com/gadeeng/commodity-forecasting' },
      ],
      webApps: [
        { name: 'Forecasting App', url: 'https://commodityprice.streamlit.app/' },
      ],
      images: [
        { src: '/projects_picts/commodity/1.png', alt: 'Commodity and Region Menu' },
        { src: '/projects_picts/commodity/2.png', alt: 'Summary Dashboard' },
        { src: '/projects_picts/commodity/3.png', alt: 'Commodity Average Price Table' }
      ],
    },
  ];

  // Tautan teks berlabel
  const linkClass =
    'focus-ring group/link inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[#e60012]/70 transition-colors duration-200 hover:text-[#e60012]';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Development Popup */}
      {showPopup && (
        <div className="popup-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="popup-content relative w-full max-w-md bg-background rounded-2xl border border-foreground/10 shadow-2xl p-8">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/50 transition-all duration-200 hover:bg-foreground/10 hover:text-foreground hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <AlertCircle className="h-8 w-8" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                🚧 Under Development
              </h2>
              <p className="text-sm leading-relaxed text-foreground/65">
                This page is currently under development. The projects showcased here are still being polished and some links may not be fully functional yet.
              </p>
              <p className="text-xs text-foreground/50">
                Thank you for your patience! 🙏
              </p>
            </div>

            {/* Action button */}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 w-full rounded-full bg-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl px-6 pt-36 pb-20 sm:px-10">

        {/* Page header */}
        <header className="mb-16 flex flex-col gap-5 sm:mb-24 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="flex items-start gap-4">
            <div className="h-[3.5rem] w-[2px] bg-[#e60012]" aria-hidden="true" />
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl">
              Projects
            </h1>
          </div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-foreground/50 sm:pb-1.5">
            A collection of projects I’ve worked on, built to solve problems and turn ideas into meaningful outcomes.
          </p>
        </header>

        {/* Projects list */}
        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {projects.map((proj) => (
            <article
              key={proj.name}
              className="group grid gap-x-10 gap-y-4 py-10 sm:grid-cols-[6rem_1fr] sm:py-12"
            >
              {/* Tahun */}
              <time
                dateTime={proj.year}
                className="text-sm tabular-nums text-foreground/40 sm:pt-3"
              >
                {proj.year}
              </time>

              <div className="flex min-w-0 flex-col gap-5">
                {/* Nama proyek */}
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                  <span
                    className="bg-[linear-gradient(#e60012,#e60012)] bg-[length:0%_2px] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out [-webkit-box-decoration-break:clone] [box-decoration-break:clone] group-hover:bg-[length:100%_2px] group-focus-within:bg-[length:100%_2px] motion-reduce:transition-none"
                  >
                    {proj.name}
                  </span>
                </h2>

                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-[#e60012]/70">{proj.role}</p>
                  <p className="max-w-[56ch] text-[15px] leading-relaxed text-foreground/65">
                    {proj.description}
                  </p>
                  {proj.publications && proj.publications.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[13px] text-foreground/50">📰 Featured on:</span>
                      {proj.publications.map((pub, idx) => (
                        <a
                          key={pub.name}
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-foreground/60 hover:text-foreground underline transition-colors duration-200"
                        >
                          {pub.name}
                          {idx < proj.publications.length - 1 && <span className="mx-1">•</span>}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Carousel gambar proyek */}
                {proj.images.length > 0 && (
                  <ProjectCarousel name={proj.name} images={proj.images} />
                )}

                {/* Tags dan Links section */}
                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-foreground/45">
                    {proj.tags.map((tag) => (
                      <li key={tag} className="group inline-flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#e60012]/50 group-hover:bg-[#e60012] transition-colors" />
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Repository and Web App Links */}
                  {(proj.repositories.length > 0 || proj.webApps.length > 0) && (
                    <div className="flex flex-col gap-3">
                      {proj.repositories.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#e60012]/60 font-semibold">Code</span>
                          <div className="flex items-center gap-3">
                            {proj.repositories.map((repo) => (
                              <a
                                key={repo.name}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${proj.name} - ${repo.name}`}
                                className={linkClass}
                              >
                                {repo.name}
                                <ArrowUpRight
                                  className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                                  aria-hidden="true"
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      {proj.webApps.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#e60012]/60 font-semibold">Demo</span>
                          <div className="flex items-center gap-3">
                            {proj.webApps.map((app) => (
                              <a
                                key={app.name}
                                href={app.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${proj.name} - ${app.name}`}
                                className={linkClass}
                              >
                                {app.name}
                                <ArrowUpRight
                                  className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                                  aria-hidden="true"
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Let's Connect Section */}
      <ConnectSection />
    </div>
  );
}
