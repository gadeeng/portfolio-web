'use client';

import dynamic from 'next/dynamic';
import type { HalftoneNebulaProps } from '@/components/react-bits/HalftoneNebula';

const HalftoneNebulaComponent = dynamic(
  () => import('@/components/react-bits/HalftoneNebula'),
  { ssr: false }
);

export type { HalftoneNebulaProps };

export default function HalftoneNebula(props: HalftoneNebulaProps) {
  return <HalftoneNebulaComponent {...props} />;
}
