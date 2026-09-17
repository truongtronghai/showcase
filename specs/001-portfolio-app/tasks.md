---
description: "Task list for the Portfolio Application feature implementation"
---

# Tasks: Portfolio Application

**Input**: Design documents from `/specs/001-portfolio-app/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test tasks — the repo has no test framework (per AGENTS.md) and the spec requests no tests. Verification is via `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format:check`, `pnpm build`, plus manual scenarios in [quickstart.md](./quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (this is a static Next.js web app, no backend)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization — ShadCn, theme/icon dependencies

- [x] T001 Initialize ShadCn in the existing project: run `pnpm dlx shadcn@latest init` (use non-interactive defaults if available) to create `components.json`, `src/lib/utils.ts`, and seed base theme tokens into `src/app/globals.css`
- [x] T002 Install dependencies: run `pnpm add next-themes lucide-react`
- [x] T003 Add ShadCn components: run `pnpm dlx shadcn@latest add button card badge avatar separator sheet dropdown-menu` (creates files under `src/components/ui/`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Theme token system, provider, and typed project data that EVERY user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Complete the ShadCn theme token definitions in `src/app/globals.css`: define `:root` (light) and `.dark` (dark) variables and map them via `@theme inline` for `--color-background`, `--color-foreground`, `--color-card`, `--color-primary`, `--color-muted`, `--color-border`, etc. Keep the existing `@import "tailwindcss"` and font variables; do not create a `tailwind.config.js`
- [x] T005 Create `ThemeProvider` in `src/components/theme/ThemeProvider.tsx` as a "use client" wrapper around next-themes (follows contract #7 in `contracts/ui-contracts.md`)
- [x] T006 Create types in `src/data/types.ts`: `ProjectCategory` ("web-app" | "freelance"), `Screenshot` (`{ src; alt; caption? }`), and `Project` matching `data-model.md` fields
- [x] T007 Create seed collection in `src/data/projects.ts`: export `projects: Project[]` with at least 4 realistic entries (mix of web-app and freelance, some `featured: true`, one missing `demoUrl`, one with empty `screenshots`) per `data-model.md`
- [x] T008 Wire theme into root layout `src/app/layout.tsx`: add `suppressHydrationWarning` to `<html>` and wrap `<body>` children with `ThemeProvider` using `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`

**Checkpoint**: Foundation ready — all four routes render with working theme tokens; `pnpm exec tsc --noEmit` passes

---

## Phase 3: User Story 1 - Browse Project Collection (Priority: P1) 🎯 MVP

**Goal**: Visitors can view the full collection of projects as a vertical detailed list

**Independent Test**: Visit `/projects` and confirm every entry in `src/data/projects.ts` renders as a full-width section with title, category badge, description, role, tech stack badges, screenshot (or placeholder), and demo/GitHub links (scenario 2 → quickstart.md)

### Implementation for User Story 1

- [x] T009 [P] [US1] Create `ProjectCard` component in `src/components/projects/ProjectCard.tsx` per contract #2 (`project` + `priority` props): renders title, category badge, description, role, tech badges, first screenshot or a styled placeholder, demo + GitHub links (each hidden when absent), year. Use `next/image` for screenshots
- [x] T010 [P] [US1] Create `ProjectList` component in `src/components/projects/ProjectList.tsx` per contract #3: renders `ProjectCard` per project with `Separator` between entries
- [x] T011 [US1] Create the projects page in `src/app/projects/page.tsx`: import `ProjectList`, render it with `projects` from `src/data/projects.ts`, add page title + `Metadata` export (depends on T009, T010)

**Checkpoint**: User Story 1 fully functional — browseable, detailed project collection

---

## Phase 4: User Story 2 - Navigate a Multi-Page Portfolio (Priority: P1)

**Goal**: Consistent navigation bar on every page, desktop + mobile

**Independent Test**: On any page, click each nav link → correct page loads and is highlighted; shrink below ~640px → menu button opens a sheet with the same links, selecting one navigates and closes (scenario 1 → quickstart.md)

### Implementation for User Story 2

- [x] T012 [P] [US2] Create mobile navigation in `src/components/layout/MobileNav.tsx`: ShadCn `Sheet` + `SheetTrigger` menu button, `SheetContent` with `Link`s for Home (`/`), Projects (`/projects`), About (`/about`), Contact (`/contact`), closes on selection
- [x] T013 [US2] Create `Navbar` in `src/components/layout/Navbar.tsx`: brand link to `/`, inline desktop links for the four routes with active-page highlighting via `usePathname()`, renders `MobileNav` for small screens, and reserves a slot for `ThemeToggle` (depends on T012)
- [x] T014 [US2] Add `Navbar` to root layout in `src/app/layout.tsx` above the page content (depends on T013)

**Checkpoint**: User Stories 1 AND 2 work independently

---

## Phase 5: User Story 3 - Switch Light and Dark Theme (Priority: P1)

**Goal**: Visitors toggle light/dark/system; choice persists with no flash of wrong theme

**Independent Test**: Toggle theme on any page → whole page restyles immediately; reload → choice persists; System follows OS preference; all four pages legible in both themes (scenario 3 → quickstart.md)

### Implementation for User Story 3

- [x] T015 [P] [US3] Create `ThemeToggle` in `src/components/theme/ThemeToggle.tsx` per contract #4: ShadCn `DropdownMenu` with a `Button` (variant "ghost"/"outline" with Sun/Moon icons) offering Light, Dark, System; uses `useTheme()` from next-themes; mounts only after hydration to avoid mismatch
- [x] T016 [US3] Integrate `ThemeToggle` into `Navbar` in `src/components/layout/Navbar.tsx` (right side, visible in both desktop and mobile variants) (depends on T015)
- [x] T017 [US3] Verify theme persistence and no-flash behavior: load site fresh with OS dark → dark renders; toggle to light → light persists on reload; confirm no hardcoded colors remain in page components that break theme consistency (check `src/app/page.tsx`, `src/app/projects/page.tsx`)

**Checkpoint**: All P1 stories complete — nav, projects, and theming independently functional

---

## Phase 6: User Story 4 - Learn About and Contact the Owner (Priority: P2)

**Goal**: About page (bio + skills) and Contact page (static email + social links)

**Independent Test**: Visit `/about` → bio + skills render; visit `/contact` → email + social links present and open correct handlers (scenario 5 → quickstart.md)

### Implementation for User Story 4

- [x] T018 [P] [US4] Create the About page in `src/app/about/page.tsx`: bio section, skills summary (cards/badges via ShadCn), `Metadata` export; theme-consistent styling using `bg-background`, `text-foreground`, `Card`
- [x] T019 [P] [US4] Create the Contact page in `src/app/contact/page.tsx`: static email + social profile links (GitHub, LinkedIn, etc.) using `Card`/`Button` with lucide icons (`Mail`, `Github`, `Linkedin`, `ArrowUpRight`), `Metadata` export; no form, no backend
- [x] T020 [US4] Create `Footer` in `src/components/layout/Footer.tsx`: social links (external, `target="_blank"`), short copyright line
- [x] T021 [US4] Add `Footer` to root layout in `src/app/layout.tsx` after page content (depends on T020)

**Checkpoint**: Users can learn about the owner and reach out via static links

---

## Phase 7: User Story 5 - Explore Featured Work on Home (Priority: P2)

**Goal**: Home keeps the existing 3D hero and adds featured projects + CTA to full list

**Independent Test**: Load `/` → Hero3D renders, followed by 3 featured project cards and a "View all projects" link; with no featured projects, an empty-state message shows (scenario 4 → quickstart.md)

### Implementation for User Story 5

- [x] T022 [P] [US5] Create `FeaturedProjects` in `src/components/projects/FeaturedProjects.tsx`: filters `featured: true` from `src/data/projects.ts`, renders up to 3 compact `Card`s (reuse `ProjectCard` or a compact variant), includes a "View all projects" `Link` to `/projects`, and an empty-state message when nothing is featured
- [x] T023 [US5] Update `src/app/page.tsx`: keep `HeroSection` (the active Hero3D) as the top section, replace the hardcoded background/content below it with `FeaturedProjects`; remove hardcoded `bg-zinc-950` / zinc text so the page respects theme tokens

**Checkpoint**: All user stories independently functional and theme-consistent

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Consistency, metadata, verification, validation

- [x] T024 Run `pnpm format:check` and fix any formatting issues
- [x] T025 Run `pnpm lint` and fix any lint issues
- [x] T026 Run `pnpm exec tsc --noEmit` and fix any type errors
- [x] T027 Run `pnpm build` and confirm a successful production build
- [x] T028 [P] Set consistent per-page metadata (titles/descriptions) on `/projects`, `/about`, `/contact` in their page files (if not already set in T011/T018/T019)
- [x] T029 Execute all validation scenarios in `specs/001-portfolio-app/quickstart.md` manually via `pnpm dev` and confirm they pass
- [x] T030 [P] Add a short note to `README.md` or `AGENTS.md` documenting how to add a new project entry to `src/data/projects.ts` (fields per `data-model.md`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion
  - Stories run sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational — no dependency on other stories
- **User Story 2 (P1)**: After Foundational — no dependency on other stories
- **User Story 3 (P1)**: After Foundational + US2 (ThemeToggle integrates into Navbar)
- **User Story 4 (P2)**: After Foundational — independently testable
- **User Story 5 (P2)**: After Foundational + US1 (reuses ProjectCard/ProjectList patterns)

### Within Each User Story

- Models/types before components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- T009, T010, T012, T015, T018, T019, T022, T028, T030 are marked [P] — can run in parallel (different files)
- T003 depends on T001 (add components after init)
- T011 depends on T009/T010
- T013 depends on T012
- T014 depends on T013
- T016 depends on T015
- T021 depends on T020
- T023 depends on T022

---

## Parallel Example: User Story 1

```bash
Task: "Create ProjectCard component in src/components/projects/ProjectCard.tsx"
Task: "Create ProjectList component in src/components/projects/ProjectList.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Visit `/projects`, confirm detailed project list renders
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 (P2) → Test independently
6. Add User Story 5 (P2) → Test independently
7. Run Phase 8 verification before completion

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3 (after NAV slot; coordinate Navbar)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Do not modify the existing `src/components/Hero3D/` hero (active hero, per AGENTS.md)
- Do not create `tailwind.config.js` (Tailwind v4 constraint)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence
