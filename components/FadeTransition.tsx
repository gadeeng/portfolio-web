'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface FadeTransitionProps {
  children: React.ReactNode;
  className?: string;
  /** Duration in seconds. Defaults to 0.8s (or 1.0s to match FadeTransition.md). */
  duration?: number;
}

/**
 * FadeTransition component adapted for Next.js App Router
 * based on specifications in FadeTransition.md:
 * - Opacity 0 -> 1 crossfade
 * - Blur filter 5px -> 0px
 * - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 * - Persistent navigation outside the transition container
 * - Hardware accelerated with will-change
 * - Accessible: respects prefers-reduced-motion
 */
export default function FadeTransition({
  children,
  className,
  duration = 0.8,
}: FadeTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, filter: 'none' }
          : { opacity: 0, filter: 'blur(5px)' }
      }
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        ease: [0.25, 0.46, 0.45, 0.94], // exact bezier from FadeTransition.md
      }}
      className={cn('transition-fade flex flex-1 flex-col w-full relative', className)}
      style={{
        willChange: shouldReduceMotion ? 'auto' : 'opacity, filter',
      }}
    >
      {children}
    </motion.div>
  );
}
