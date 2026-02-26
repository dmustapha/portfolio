# Damilola Mustapha: Developer Portfolio

Personal portfolio site showcasing full-stack and Web3 projects, built with Next.js 16 and Tailwind CSS 4.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![Hero](docs/images/hero.png)

---

## What Is This?

A single-page portfolio with fullpage scroll navigation on desktop and native scroll on mobile. Five sections: Hero, About, Projects, Skills, and Contact. Each project slide reveals with directional animations and a horizontal carousel.

---

## Featured Projects

| Project | Type | Stack | Links |
|---------|------|-------|-------|
| **DeepRock** | RWA Platform (Avalanche) | Next.js, Solidity, ERC-4337, WebAuthn | [Live](https://deeprock-app.vercel.app) / [GitHub](https://github.com/dmustapha/deeprock) / [Video](https://youtu.be/YeziPNxaUwE) |
| **KasGate** | Payment Gateway (Kaspa) | TypeScript, Bun, Express, SQLite | [Live](https://kasgate-production.up.railway.app/dashboard) / [GitHub](https://github.com/dmustapha/kasgate) |
| **WhaleVault** | Privacy Wallet (Solana) | Next.js, TypeScript, Rust/Anchor | [Live](https://whalevault.vercel.app) / [GitHub](https://github.com/dmustapha/whalevault) |
| **Cyber Air Hockey** | Multiplayer Game | Next.js, Matter.js, WebSocket | [Live](https://cyber-air-hockey.vercel.app) / [GitHub](https://github.com/dmustapha/cyber-air-hockey) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Fonts | Cormorant Garamond, DM Sans, JetBrains Mono |
| Animation | CSS transitions + custom reveal hooks |
| Navigation | Custom fullpage scroll engine (desktop), native scroll (mobile) |
| Deploy | Vercel |

---

## Features

- **Fullpage scroll navigation** on desktop with smooth section transitions
- **Responsive design** that switches to native scroll on mobile
- **Project carousel** with horizontal snap scrolling and directional reveal animations
- **Dot navigation** and sidebar panel synced to current section
- **Grid overlays and coral dividers** for an architectural visual style
- **Optimized fonts** via `next/font` with three type families

---

## Running Locally

```bash
git clone https://github.com/dmustapha/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
portfolio/
  app/
    layout.tsx          # Root layout with fonts and metadata
    page.tsx            # Main page with fullpage scroll orchestration
    globals.css         # Global styles and Tailwind config
  components/
    layout/
      GridOverlays.tsx  # Background grid lines
      CoralDivider.tsx  # Decorative coral accent line
      Sidebar.tsx       # Left sidebar with section panels
      DotNav.tsx        # Right-side dot navigation
    sections/
      HeroSection.tsx   # Landing hero with name and CTA
      AboutSection.tsx  # Background and story
      ProjectsSection.tsx # Project carousel wrapper
      ProjectSlide.tsx  # Individual project card
      SkillsSection.tsx # Skills grid
      ContactSection.tsx # Contact form and social links
    ui/
      CTAButton.tsx     # Call-to-action button
      TechTag.tsx       # Technology badge
      SkillTag.tsx      # Skill pill
      ProjectLink.tsx   # External link for projects
      SocialCircle.tsx  # Social media icon link
  hooks/
    useFullpageScroll.ts   # Desktop fullpage scroll engine
    useProjectCarousel.ts  # Horizontal project carousel logic
    useRevealAnimations.ts # Section and slide reveal animations
    useDotNavSync.ts       # Dot nav active state sync
    useIsMobile.ts         # Mobile breakpoint detection
  lib/
    types.ts           # TypeScript interfaces
    data.ts            # Portfolio content (projects, skills, links)
  public/              # Static assets
```

---

## License

MIT
