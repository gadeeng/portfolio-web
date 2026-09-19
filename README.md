# Personal Website — Modern Portfolio

A high-performance, dark-themed personal portfolio built with **Next.js (App Router)**, **Tailwind CSS**, and **React Bits** components (`LightRays`, `Lanyard`, `PillNav`, `DarkVeil`, `BorderGlow`).

---

## Tech Stack & Architecture

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Graphics & Shaders**: `ogl` (WebGL), `three` (3D Physics)
- **Animations**: GSAP & CSS Transitions
- **Icons**: Lucide React

---

## Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with Navbar, Inter font & dark theme
│   ├── page.tsx                  # Home page (all 5 sections)
│   ├── globals.css               # Global styles & smooth scroll behavior
│   └── projects/
│       └── page.tsx              # Featured projects showcase (/projects)
├── components/
│   ├── Navbar.tsx                # PillNav wrapper with scroll spy
│   ├── react-bits/               # React Bits visual & shader components
│   │   ├── LightRays.tsx & .css  # WebGL background rays
│   │   ├── DarkVeil.tsx & .css   # Procedural CPPN shader
│   │   ├── PillNav.tsx & .css    # GSAP pill navigation
│   │   ├── BorderGlow.tsx & .css # Dynamic cursor-tracking glow border
│   │   └── Lanyard.tsx & .css    # Interactive 3D badge card
│   └── sections/
│       ├── HeroSection.tsx       # #hero with LightRays and Lanyard
│       ├── EducationSection.tsx  # #education
│       ├── WorkExperienceSection.tsx # #experience
│       ├── OrganizationSection.tsx   # #organization
│       └── ConnectSection.tsx    # #connect with DarkVeil & BorderGlow
```

---

## Sections Overview

1. **Hero Section (`#hero`)**:
   - WebGL `LightRays` background strictly contained with `overflow: hidden`
   - Bottom fade gradient seamlessly transitioning into `#0a0a0a`
   - Responsive two-column layout with CTA buttons (`#connect`, `/projects`)
   - Interactive 3D `Lanyard` developer ID badge

2. **Education Section (`#education`)**:
   - Institution, degree, major, honors, and achievement badges

3. **Work Experience Section (`#experience`)**:
   - Modern vertical timeline with highlight bullets and tech experience

4. **Organizational Experience Section (`#organization`)**:
   - Leadership roles, community initiatives, and tech workshop mentorship

5. **Let's Connect Section (`#connect`)**:
   - Centered glassmorphic card wrapped with interactive `BorderGlow`
   - Embedded `DarkVeil` procedural shader background
   - Direct email, GitHub, and LinkedIn contact links

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customization Guide

All sections contain visible `// TODO:` comments to make adding your personal info effortless:
- **Hero**: Update your name, tagline, and profile picture in `components/sections/HeroSection.tsx`.
- **Education**: Update institutions and degrees in `components/sections/EducationSection.tsx`.
- **Experience**: Add your companies and roles in `components/sections/WorkExperienceSection.tsx`.
- **Organization**: Add your organizations and clubs in `components/sections/OrganizationSection.tsx`.
- **Connect**: Replace email, GitHub, and LinkedIn links in `components/sections/ConnectSection.tsx`.
