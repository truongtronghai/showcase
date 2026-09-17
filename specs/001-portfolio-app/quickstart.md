# Quickstart Validation Guide: Portfolio Application

**Feature**: Portfolio Application (specs/001-portfolio-app)

Validates the feature end-to-end. Contract details live in
[contracts/ui-contracts.md](./contracts/ui-contracts.md); data model in
[data-model.md](./data-model.md).

## Prerequisites

- Node 20+, pnpm installed.
- Deps installed: `pnpm install`.

## Setup

```bash
pnpm dev
```

Open http://localhost:3000.

## Validation Scenarios

### Scenario 1: Pages Route Correctly

- **Do**: Click each nav link: Home, Projects, About, Contact.
- **Expect**: Each navigates to its page; the nav highlights the active page; the URL matches
  (`/`, `/projects`, `/about`, `/contact`).
- **Mobile**: Shrink viewport below ~640px → tap menu button → sheet opens with the same links →
  select one → sheet closes and page navigates.

### Scenario 2: Projects Render With Details

- **Do**: Go to `/projects`.
- **Expect**: Every project in `src/data/projects.ts` shows as a full-width section: title,
  category badge, description, role, tech stack badges, at least one screenshot (or placeholder),
  and demo/GitHub links where configured.
- **Do**: Click a project's "View Demo" / GitHub link.
- **Expect**: Opens in a new tab (no broken anchors).

### Scenario 3: Theme Switching (Light/Dark)

- **Do**: Click the theme toggle → select "Dark".
- **Expect**: Whole page (nav, cards, footer, text) re-renders dark immediately; toggle icon
  updates.
- **Do**: Reload the page.
- **Expect**: Dark theme persists (no flash of light).
- **Do**: Switch to "System" with OS set to light.
- **Expect**: Site follows OS preference.
- **Do**: Visit all four pages in each theme.
- **Expect**: No sections with clashing colors; text legible everywhere.

### Scenario 4: Home Shows 3D Hero + Featured Work

- **Do**: Load `/`.
- **Expect**: Existing 3D HeroSection renders; below it, `featured: true` projects appear with a
  "View all projects" link to `/projects`.
- **Do**: Set all projects to `featured: false` temporarily (or verify the empty-state branch).
- **Expect**: The feature section shows an empty-state message, not blank space.

### Scenario 5: About & Contact Pages

- **Do**: Go to `/about`.
- **Expect**: Bio and skills summary render, theme-consistent.
- **Do**: Go to `/contact`.
- **Expect**: Email and social links present; clicking them opens the right handler (mail client /
  profile page) — no contact form (static info only).

### Scenario 6: Edge Cases

- **Do**: Create a project with no `demoUrl`, one with no `githubUrl`, one with empty
  `screenshots`.
- **Expect**: Missing links are hidden (other link still shown); empty screenshots renders a
  placeholder, no broken `<img>`.

## Automated Verification

Run before considering the feature complete:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm format:check
pnpm build
```

All must pass with no errors. (No test framework exists in this repo.)

## Expected Outcome

All six scenarios pass with the four routes rendering, projects fully detailed, theme switching
persistent and consistent on every page, and the active 3D hero retained on Home.
