import React from 'react';
import FadeTransition from '@/components/FadeTransition';

/**
 * Root Template for Next.js App Router.
 * Remounts on every page route change, activating the FadeTransition
 * (crossfade + 5px blur + cubic-bezier easing) as specified in FadeTransition.md.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <FadeTransition>{children}</FadeTransition>;
}
