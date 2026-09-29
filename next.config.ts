import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Otomatis konversi ke AVIF/WebP — lebih kecil, lebih cepat load
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    // Tree-shake impor dari library besar — kurangi bundle size
    optimizePackageImports: [
      'lucide-react',
      '@react-three/drei',
      'three',
    ],
  },
};

export default nextConfig;
