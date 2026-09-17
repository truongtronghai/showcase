# Implementation Plan: Portfolio Application

**Branch**: `001-portfolio-app` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-app/spec.md`

## Summary

Build the multi-page portfolio application on the existing Next.js 16 + React 19 + Tailwind v4
codebase. Pages: Home (existing 3D hero + featured projects), Projects (full vertical list with
detailed cards), About, Contact (static info). Add a shared Navbar + Footer, theme switching
(light/dark/system) via next-themes + ShadCn CSS-variable tokens, and a static typed projects data
module. All UI built with ShadCn components. Full research in [research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19.2.8, Next.js 16.3.5 (App Router)

**Primary Dependencies**: `shadcn/ui` (CLI-scaffolded components), `next-themes`,
`lucide-react`; existing deps retained (Tailwind v4, React Three Fiber, GSAP, drei)

**Storage**: None (static typed data in `src/data/projects.ts`; theme persisted via
localStorage by next-themes)

**Testing**: No test framework — verify with `pnpm exec tsc --noEmit`, `pnpm lint`,
`pnpm format:check`, `pnpm build`, plus manual scenarios in [quickstart.md](./quickstart.md)

**Target Platform**: Web (desktop + mobile browsers)

**Project Type**: Web application (static, server-rendered)

**Performance Goals**: Fast static render; no client bundle constraints beyond Next defaults

**Constraints**: No `tailwind.config.js` (Tailwind v4); keep existing `Hero3D` hero active and
untouched; pnpm only; components separated into folders; meaningful naming, no abbreviations

**Scale/Scope**: ~4 routes, tens of projects max, 2 themes, ~9 UI components

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

The project constitution (`.specify/memory/constitution.md`) is still the unfilled Speckit
template with no defined principles, so there are no governance constraints to violate. This plan
honors the repo conventions in `AGENTS.md` (pnpm, no tailwind config, component folders, retained
active hero, verification commands). GATE: **PASS** (no violations).

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-app/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/
│   └── ui-contracts.md  # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, ThemeProvider, Navbar, Footer
│   ├── page.tsx                   # Home: HeroSection + featured projects + CTA
│   ├── globals.css                # Tailwind v4 + full ShadCn theme tokens (light/dark)
│   ├── projects/
│   │   └── page.tsx               # Full vertical project list
│   ├── about/
│   │   └── page.tsx               # Bio + skills
│   └── contact/
│       └── page.tsx               # Email + social links
├── components/
│   ├── ui/                        # ShadCn-generated components (button, card, ...)
│   ├── theme/
│   │   ├── ThemeProvider.tsx      # next-themes wrapper
│   │   └── ThemeToggle.tsx        # dropdown sun/moon toggle
│   ├── layout/
│   │   ├── Navbar.tsx             # desktop links + mobile Sheet
│   │   └── Footer.tsx             # social links + copyright
│   └── projects/
│       ├── ProjectCard.tsx        # single project section
│       ├── ProjectList.tsx        # vertical list w/ separators
│       └── FeaturedProjects.tsx   # Home featured subset + CTA
├── lib/
│   └── utils.ts                   # cn() helper (ShadCn requirement)
└── data/
    ├── types.ts                   # Project, ProjectCategory, Screenshot types
    └── projects.ts                # seed project collection

public/images/projects/<slug>/…    # project screenshots (placeholders initially)

components.json                    # ShadCn config (CLI-generated)
```

**Structure Decision**: Single Next.js App Router project (existing structure), extended with
`components/ui` (ShadCn), feature component folders under `components/` (theme, layout, projects),
a `data/` layer for the typed project collection, and generated ShadCn config files. Component
folders follow the repo convention ("Separated components put in folder src/components"). The
existing `Hero3D/` folder is retained untact.

## Complexity Tracking

> No constitution violations to justify. (Constitution is unfilled template; see Constitution
> Check.)
