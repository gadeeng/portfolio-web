'use client';

import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'symbol';
  className?: string;
  width?: number | string;
  height?: number | string;
  accentColor?: string;
}

/**
 * BrandLogo - Gading Wisnu Kusuma official brand identity
 * Featuring the Golden Tusk G logarithmic spiral and crimson attractor node.
 * Uses currentColor for dynamic dark/light theme adaptation and brand accent #E60012.
 */
export default function BrandLogo({
  variant = 'horizontal',
  className = '',
  width,
  height,
  accentColor = '#E60012',
}: BrandLogoProps) {
  if (variant === 'symbol') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={width ?? 48}
        height={height ?? 48}
        className={className}
        role="img"
        aria-label="Gading Kusuma - Brand Symbol"
      >
        <title>Gading Kusuma Symbol</title>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M 216 48
          C 160 20 84 36 46 88
          C 12 134 26 200 78 228
          C 134 258 208 226 232 168
          C 236 158 238 144 238 132
          L 152 132
          L 152 160
          L 198 160
          C 184 192 142 208 106 194
          C 68 180 54 136 74 102
          C 98 62 152 52 192 72
          L 216 48
          Z"
        />
        <circle cx="118" cy="132" r="14" fill={accentColor} />
      </svg>
    );
  }

  if (variant === 'stacked') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={width ?? 160}
        height={height ?? 160}
        className={className}
        role="img"
        aria-label="Gading Kusuma - Stacked Brand Logo"
      >
        <title>Gading Kusuma Logo - Stacked</title>
        {/* Symbol centered at top */}
        <g transform="translate(151, 56) scale(0.82)">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M 216 48
            C 160 20 84 36 46 88
            C 12 134 26 200 78 228
            C 134 258 208 226 232 168
            C 236 158 238 144 238 132
            L 152 132
            L 152 160
            L 198 160
            C 184 192 142 208 106 194
            C 68 180 54 136 74 102
            C 98 62 152 52 192 72
            L 216 48
            Z"
          />
          <circle cx="118" cy="132" r="14" fill={accentColor} />
        </g>
        {/* Wordmark centered */}
        <g fill="currentColor" transform="translate(102, 218)">
          {/* GADING */}
          <path d="M 38 82 C 34 74 27 70 19 70 C 8.5 70 0 78.5 0 93 C 0 107.5 8.5 116 19 116 C 30 116 37 108 38 97 L 20 97 L 20 88 L 47 88 L 47 113 C 39.5 121.5 29.5 125 18 125 C -0.5 125 -10 111 -10 93 C -10 75 -0.5 61 18 61 C 30.5 61 41 68 46 80 Z" transform="translate(10, 0)" />
          <path d="M 74 70 L 85 70 L 102 116 L 91 116 L 86.5 104 L 71.5 104 L 67 116 L 56 116 Z M 74.5 95 L 83.5 95 L 79 81 Z" />
          <path d="M 110 70 L 127 70 C 140 70 149 79 149 93 C 149 107 140 116 127 116 L 110 116 Z M 120 79 L 120 107 L 126 107 C 134 107 139 101 139 93 C 139 85 134 79 126 79 Z" />
          <path d="M 158 70 L 168 70 L 168 116 L 158 116 Z" />
          <path d="M 178 70 L 188 70 L 214 116 L 224 116 L 224 70 L 214 70 L 214 100 L 188 70 Z M 178 70 L 178 116 L 188 116 L 188 86 Z" />
          <path d="M 38 82 C 34 74 27 70 19 70 C 8.5 70 0 78.5 0 93 C 0 107.5 8.5 116 19 116 C 30 116 37 108 38 97 L 20 97 L 20 88 L 47 88 L 47 113 C 39.5 121.5 29.5 125 18 125 C -0.5 125 -10 111 -10 93 C -10 75 -0.5 61 18 61 C 30.5 61 41 68 46 80 Z" transform="translate(242, 0)" />
          {/* Accent Node */}
          <circle cx="310" cy="110" r="5" fill={accentColor} />
          {/* KUSUMA */}
          <path d="M 10 142 L 18 142 L 18 153 L 30 142 L 40 142 L 25 155 L 41 168 L 31 168 L 18 157 L 18 168 L 10 168 Z" />
          <path d="M 54 142 L 62 142 L 62 160 C 62 165 65 168 70 168 C 75 168 78 165 78 160 L 78 142 L 86 142 L 86 160 C 86 169 78 173 70 173 C 62 173 54 169 54 160 Z" />
          <path d="M 102 164 C 103 166.5 106 168.5 110 168.5 C 114 168.5 117 166.5 117 163.5 C 117 160 114 159 109 157.5 C 103 156 100 153.5 100 149 C 100 144.5 104 141.5 110 141.5 C 116 141.5 120 144.5 121 147.5 L 115 149 C 114 147 112 146 110 146 C 107 146 106 147 106 149 C 106 151 108 152 112 153 C 118 155 123 157 123 162.5 C 123 168 117 173 110 173 C 103 173 99 168.5 97 164 Z" />
          <path d="M 142 142 L 150 142 L 150 160 C 150 165 153 168 158 168 C 163 168 166 165 166 160 L 166 142 L 174 142 L 174 160 C 174 169 166 173 158 173 C 150 173 142 169 142 160 Z" />
          <path d="M 190 142 L 199 142 L 208 160 L 217 142 L 226 142 L 226 168 L 219 168 L 219 150 L 210 168 L 206 168 L 197 150 L 197 168 L 190 168 Z" />
          <path d="M 244 142 L 253 142 L 265 168 L 256 168 L 253 161.5 L 241 161.5 L 238 168 L 230 168 Z M 243 156 L 251 156 L 247 147 Z" />
        </g>
      </svg>
    );
  }

  // Default: horizontal lockup
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 256"
      width={width ?? 180}
      height={height ?? 72}
      className={className}
      role="img"
      aria-label="Gading Kusuma - Brand Logo"
    >
      <title>Gading Kusuma Logo</title>
      <g id="symbol" transform="translate(32, 32) scale(0.75)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M 216 48
          C 160 20 84 36 46 88
          C 12 134 26 200 78 228
          C 134 258 208 226 232 168
          C 236 158 238 144 238 132
          L 152 132
          L 152 160
          L 198 160
          C 184 192 142 208 106 194
          C 68 180 54 136 74 102
          C 98 62 152 52 192 72
          L 216 48
          Z"
        />
        <circle cx="118" cy="132" r="14" fill={accentColor} />
      </g>
      
      <g id="wordmark" fill="currentColor" transform="translate(244, 0)">
        {/* GADING */}
        <path d="M 38 82 C 34 74 27 70 19 70 C 8.5 70 0 78.5 0 93 C 0 107.5 8.5 116 19 116 C 30 116 37 108 38 97 L 20 97 L 20 88 L 47 88 L 47 113 C 39.5 121.5 29.5 125 18 125 C -0.5 125 -10 111 -10 93 C -10 75 -0.5 61 18 61 C 30.5 61 41 68 46 80 Z" transform="translate(10, 0)" />
        <path d="M 74 70 L 85 70 L 102 116 L 91 116 L 86.5 104 L 71.5 104 L 67 116 L 56 116 Z M 74.5 95 L 83.5 95 L 79 81 Z" />
        <path d="M 110 70 L 127 70 C 140 70 149 79 149 93 C 149 107 140 116 127 116 L 110 116 Z M 120 79 L 120 107 L 126 107 C 134 107 139 101 139 93 C 139 85 134 79 126 79 Z" />
        <path d="M 158 70 L 168 70 L 168 116 L 158 116 Z" />
        <path d="M 178 70 L 188 70 L 214 116 L 224 116 L 224 70 L 214 70 L 214 100 L 188 70 Z M 178 70 L 178 116 L 188 116 L 188 86 Z" />
        <path d="M 38 82 C 34 74 27 70 19 70 C 8.5 70 0 78.5 0 93 C 0 107.5 8.5 116 19 116 C 30 116 37 108 38 97 L 20 97 L 20 88 L 47 88 L 47 113 C 39.5 121.5 29.5 125 18 125 C -0.5 125 -10 111 -10 93 C -10 75 -0.5 61 18 61 C 30.5 61 41 68 46 80 Z" transform="translate(242, 0)" />

        {/* Accent Coordinate Node */}
        <circle cx="310" cy="110" r="5" fill={accentColor} />

        {/* KUSUMA */}
        <path d="M 10 142 L 18 142 L 18 153 L 30 142 L 40 142 L 25 155 L 41 168 L 31 168 L 18 157 L 18 168 L 10 168 Z" />
        <path d="M 54 142 L 62 142 L 62 160 C 62 165 65 168 70 168 C 75 168 78 165 78 160 L 78 142 L 86 142 L 86 160 C 86 169 78 173 70 173 C 62 173 54 169 54 160 Z" />
        <path d="M 102 164 C 103 166.5 106 168.5 110 168.5 C 114 168.5 117 166.5 117 163.5 C 117 160 114 159 109 157.5 C 103 156 100 153.5 100 149 C 100 144.5 104 141.5 110 141.5 C 116 141.5 120 144.5 121 147.5 L 115 149 C 114 147 112 146 110 146 C 107 146 106 147 106 149 C 106 151 108 152 112 153 C 118 155 123 157 123 162.5 C 123 168 117 173 110 173 C 103 173 99 168.5 97 164 Z" />
        <path d="M 142 142 L 150 142 L 150 160 C 150 165 153 168 158 168 C 163 168 166 165 166 160 L 166 142 L 174 142 L 174 160 C 174 169 166 173 158 173 C 150 173 142 169 142 160 Z" />
        <path d="M 190 142 L 199 142 L 208 160 L 217 142 L 226 142 L 226 168 L 219 168 L 219 150 L 210 168 L 206 168 L 197 150 L 197 168 L 190 168 Z" />
        <path d="M 244 142 L 253 142 L 265 168 L 256 168 L 253 161.5 L 241 161.5 L 238 168 L 230 168 Z M 243 156 L 251 156 L 247 147 Z" />
      </g>
    </svg>
  );
}
