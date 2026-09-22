'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../icons';
import { useScrollReveal } from '../../lib/useScrollReveal';

export default function ConnectSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const contactRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<{ contact: number; email: number } | null>(null);

  // Ukur lebar asli kedua teks (offsetWidth tidak terpengaruh transform)
  useEffect(() => {
    const measure = () => {
      if (!contactRef.current || !emailRef.current) return;
      setWidths({
        contact: contactRef.current.offsetWidth,
        email: emailRef.current.offsetWidth,
      });
    };
    measure();
    // Ukur ulang setelah font web selesai dimuat, supaya lebar akurat
    document.fonts?.ready.then(measure);
  }, []);

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="mx-auto w-full max-w-5xl px-6 sm:px-10 py-12 sm:py-16"
    >
      {/* ── Two-panel card ───────────────────────────────────────────── */}
      <div
        data-reveal
        className="reveal card-hover-lift grid md:grid-cols-2 overflow-hidden rounded-2xl border border-red-500/10 bg-foreground/[0.03] shadow-sm hover:shadow-md hover:border-red-500/20 transition-all duration-300"
      >

        {/* LEFT — Headline + CTA */}
        <div className="flex flex-col justify-between gap-10 p-8 sm:p-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
              Let&apos;s <span className="text-red-500">Connect!</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/55 leading-relaxed max-w-sm">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions. Just reach out!
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Contact — filled pill, lebar teks dianimasikan dari "Contact" ke email */}
            <a
              href="mailto:gadingkusuma.works@gmail.com"
              id="connect-contact-btn"
              style={
                widths
                  ? ({
                      '--contact-w': `${widths.contact}px`,
                      '--email-w': `${widths.email}px`,
                    } as React.CSSProperties)
                  : undefined
              }
              className="group inline-flex max-w-full items-center gap-2 rounded-full bg-red-500 text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-red-600 active:scale-[0.97] shadow-sm hover:shadow-md"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />

              {/* Jendela teks: lebarnya dianimasikan dari lebar "Contact" ke lebar email */}
              <span
                className="relative block overflow-hidden whitespace-nowrap
                  w-[var(--contact-w,auto)]
                  group-hover:w-[var(--email-w,auto)]
                  group-focus-visible:w-[var(--email-w,auto)]
                  transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]
                  motion-reduce:transition-none"
              >
                {/* "Contact" keluar ke kiri */}
                <span
                  ref={contactRef}
                  className="inline-block
                    transition-[transform,opacity] duration-500 ease-out
                    group-hover:-translate-x-[120%] group-hover:opacity-0
                    group-focus-visible:-translate-x-[120%] group-focus-visible:opacity-0
                    motion-reduce:transition-none"
                >
                  Contact
                </span>

                {/* Email masuk dari kanan, delay kecil supaya tidak bertabrakan dengan Contact */}
                <span
                  ref={emailRef}
                  className="absolute left-0 top-0 inline-block translate-x-[120%] opacity-0
                    transition-[transform,opacity] duration-500 delay-75 ease-out
                    group-hover:translate-x-0 group-hover:opacity-100
                    group-focus-visible:translate-x-0 group-focus-visible:opacity-100
                    motion-reduce:transition-none"
                >
                  gadingkusuma.works@gmail.com
                </span>
              </span>
            </a>

            {/* See projects — text link */}
            <Link
              href="/projects"
              id="connect-projects-btn"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-red-500/70 hover:text-red-500 transition-colors duration-200"
            >
              See projects
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT — Social icons + copyright (lighter panel) */}
        <div className="flex flex-col items-center justify-center gap-6 border-t md:border-t-0 md:border-l border-foreground/8 bg-foreground/[0.02] p-8 sm:p-10">
          {/* Social icons */}
          <div className="flex items-center gap-5">
            {/* Email - Yellow Neon */}
            <a
              href="mailto:gadingkusuma.works@gmail.com"
              id="connect-footer-email"
              aria-label="Send email"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/12 bg-background/40 text-foreground/50 transition-all duration-300 hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(234,179,8,0.5),0_0_30px_rgba(234,179,8,0.3),inset_0_0_10px_rgba(234,179,8,0.1)]"
            >
              <Mail className="h-4 w-4 transition-all duration-300 group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            </a>

            {/* LinkedIn - Blue Neon */}
            <a
              href="https://www.linkedin.com/in/gadingkusuma/"
              id="connect-footer-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/12 bg-background/40 text-foreground/50 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5),0_0_30px_rgba(59,130,246,0.3),inset_0_0_10px_rgba(59,130,246,0.1)]"
            >
              <LinkedinIcon className="h-4 w-4 transition-all duration-300 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </a>

            {/* GitHub - White/Cyan Neon */}
            <a
              href="https://github.com/gadeeng"
              id="connect-footer-github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/12 bg-background/40 text-foreground/50 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.5),0_0_30px_rgba(34,211,238,0.3),inset_0_0_10px_rgba(34,211,238,0.1)]"
            >
              <GithubIcon className="h-4 w-4 transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center leading-snug">
            <p className="text-xs text-foreground/40">
              {new Date().getFullYear()} © Gading Wisnu Kusuma
            </p>
            <p className="text-xs text-foreground/30 mt-0.5">asymptomate</p>
          </div>
        </div>

      </div>
    </section>
  );
}