# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint check
```

No test suite is configured.

## Architecture

**NOMAD.TRAVEL** is a Next.js 16 App Router landing page for a digital nomad city exploration platform with a cyberpunk/terminal aesthetic.

### Layer structure

- **`app/`** — Next.js App Router entry points. `layout.tsx` sets up JetBrains Mono font and wraps pages with Navbar, Footer, and ScanlineOverlay. `page.tsx` composes section components.
- **`components/sections/`** — Full-width page sections (HeroSection, SearchTerminal, FeaturedCities, CostOfLivingTable, CtaSection). Each section is self-contained.
- **`components/ui/`** — Reusable primitives: shadcn/ui base components plus custom visual components (AsciiSkyline, NomadScoreGauge, ScanlineOverlay).
- **`components/layout/`** — Navbar and Footer.
- **`lib/data.ts`** — All city data (8 cities), hero stats, filter tags, and nav links are hard-coded here. No backend or API yet.
- **`lib/types.ts`** — TypeScript interfaces: `CityData`, `CostIndex`, and enums `WeatherType`, `BudgetGrade`, `CityTag`.
- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge).

### Key decisions

- **RSC by default**: components are Server Components unless they need interactivity; `'use client'` is used only in SearchTerminal, CtaSection, Navbar, and NomadScoreGauge.
- **Static data**: `lib/data.ts` is the single source of truth. No API integration exists yet.
- **Styling**: Tailwind CSS 4 with custom theme tokens in `app/globals.css`. Named utility classes (`.glow-green`, `.glow-box-pink`, terminal borders, scanline effect) are defined there — check that file before adding new visual styles.
- **Path alias**: `@/` maps to the project root.
- **shadcn/ui** is configured with `components.json` (style: "base-nova", icons: lucide).
