# Personal Website — Gading's Portfolio

A modern, high-performance personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and interactive visual components. Features a Japanese Hinomaru-inspired dark/light theme aesthetic, dynamic WebGL shaders, 3D physics, and zero-jank loading performance.

---

## Tech Stack & Architecture

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Custom CSS Design System
- **Graphics & Shaders**: `ogl` (WebGL2 shaders for HalftoneNebula), `three` (3D physics for Lanyard)
- **Animations**: CSS Keyframes, Canvas rendering, dynamic scroll reveals
- **Icons**: Lucide React

---

## Key Features & Optimizations

- **Non-blocking Loading Screen**: Custom radar-pulse loading overlay with deferred page content rendering (`DeferredPageContent`) to ensure silky-smooth 60+ FPS animations during initial page load.
- **Pixel-Art WebGL Sky**: Procedural `HalftoneNebula` shader background for dark mode and dynamic `GridPulse` interactive canvas for light mode.
- **Interactive 3D ID Badge**: Client-side `Lanyard` component with real physics interactions.
- **Bento-Grid Showcase**: Dynamic card hover-lift effects with cursor-tracking `BorderGlow`.

---

## Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with LoadingScreen, Navbar & ThemeProvider
│   ├── page.tsx                  # Home page wrapped in DeferredPageContent
│   ├── globals.css               # Global theme tokens, typography, and utility classes
│   └── projects/
│       ├── page.tsx              # Featured projects showcase (/projects)
│       └── loading.tsx           # Projects page loading UI
├── components/
│   ├── DeferredPageContent.tsx   # Holds page sections hidden until loading screen exits
│   ├── LoadingScreen.tsx & .css  # Hinomaru radar pulse loading screen overlay
│   ├── Navbar.tsx                # Floating pill navigation with active section detection
│   ├── ThemeProvider.tsx         # Light/Dark mode context provider
│   ├── react-bits/               # Interactive visual & shader components
│   │   ├── HalftoneNebula.tsx    # WebGL2 pixelated halftone nebula background
│   │   ├── BorderGlow.tsx        # Dynamic cursor-tracking glowing border container
│   │   ├── Lanyard.tsx           # Interactive 3D physical badge card
│   │   └── TextType.tsx          # Typewriter text animation
│   ├── ui/
│   │   ├── grid-pulse.tsx        # Light mode interactive canvas grid
│   │   └── NavigationProgress.tsx# Top navigation loading bar
│   └── sections/
│       ├── HeroSection.tsx       # Main headline, competencies, & 3D Lanyard
│       ├── EducationSection.tsx  # University, GPA, thesis, & skill competencies bento grid
│       ├── WorkExperienceSection.tsx # Career timeline cards
│       ├── OrganizationSection.tsx   # Leadership roles & photo gallery carousel
│       └── ConnectSection.tsx    # Contact links & direct messaging CTA
```

---

## Sections Overview

1. **Hero Section (`#hero`)**:
   - Dynamic `HalftoneNebula` WebGL sky (dark mode) or `GridPulse` canvas (light mode)
   - Multi-language typewriter welcome (`ようこそ` / `Welcome` / `Selamat Datang`)
   - Dual CTAs with smooth scroll targeting
   - Interactive 3D `Lanyard` developer card

2. **Education Section (`#education`)**:
   - Bento-grid layout detailing B.Sc. in Mathematics from Universitas Airlangga
   - Cumulative GPA meter, graduation date, research group, and thesis overview
   - Categorized skills & technical competencies grid (Modeling, ML, Programming)

3. **Work Experience Section (`#experience`)**:
   - Timeline layout highlighting marketing, graphics design, and content creation roles

4. **Organizational Experience Section (`#organization`)**:
   - Student association leadership, SDGs volunteer work, and interactive photo gallery carousel

5. **Let's Connect Section (`#connect`)**:
   - Centered card wrapped with `BorderGlow` and direct social/email contact options

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

