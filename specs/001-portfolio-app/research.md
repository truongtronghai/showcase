# Research: Portfolio Application

**Feature**: Portfolio Application (specs/001-portfolio-app)
**Source spec**: [spec.md](./spec.md)

## 1. ShadCn + Tailwind v4 + Next.js App Router

**Decision**: Initialize ShadCn with `pnpm dlx shadcn@latest init`, then add only the
components the design needs via `pnpm dlx shadcn@latest add`.

**Rationale**: The project is a fresh Next.js 16 (App Router) app with Tailwind v4 already
configured via `@import "tailwindcss"` and `@theme inline` in `globals.css`. ShadCn's current CLI
fully supports Tailwind v4 and React 19 (components use `@theme inline`, OKLCH color tokens, and
`data-slot` attributes with no `forwardRef`). There is intentionally **no** `tailwind.config.js` in
Tailwind v4, and we must not create one. Passing the default prompts: not a monorepo, import alias
`@/*`.

**Alternatives considered**: Manual copy-paste of ShadCn components (more error-prone, misses
`components.json` + lib scaffolding). Tailwind v3 ShadCn (outdated — project already on v4).
`shadcn@2.3.0` (for Tailwind v3 only — N/A).

**Components to add**: `button`, `card`, `separator`, `badge`, `sheet`, `dropdown-menu`, `avatar`,
`input`, `textarea`, `label`, `skeleton`. Actually needed: `button`, `card`, `badge`, `avatar`,
`separator`, `sheet`, `dropdown-menu`. (`input`/`textarea`/`label` only if a form is added later;
contact is static info, so skip them now — YAGNI.)

## 2. Dark/Light Theme Mechanism

**Decision**: Use `next-themes` with `attribute="class"`, `defaultTheme="system"`,
`enableSystem`, and `disableTransitionOnChange`. Theme tokens defined in `globals.css` under
`:root` (light) and `.dark` (dark), referenced through `@theme inline`. Root `<html>` gets
`suppressHydrationWarning`. A `ThemeProvider` client component wraps `children` in
`src/app/layout.tsx`.

**Rationale**: `next-themes` is the reference integration for ShadCn + Next.js (App Router). The
`class` strategy toggles a `.dark` class on `<html>`, which lets our CSS-variable tokens re-theme
every surface. `disableTransitionOnChange` prevents a cross-fade flash mid-swap; `defaultTheme`
"system" satisfies spec FR-007 (default to OS preference). Persistence is automatic via
`next-themes` (localStorage), satisfying FR-006.

**Alternatives considered**: Pure `prefers-color-scheme` media query (no manual toggle → fails
FR-005 persistence as a _choice_). A hand-rolled context + localStorage provider (reimplements
`next-themes` including its hydration-safe mounting; worse SSR behavior).

**Note**: Today's `globals.css` uses a `@media (prefers-color-scheme: dark)` block. That must be
replaced by the `.dark` class strategy so the manual toggle overrides OS preference. Existing
Hero3D CSS-module styles are scoped and remain untouched.

## 3. Tailwind v4 CSS Variables vs Utility Classes for Theming

**Decision**: Use ShadCn's CSS-variables approach (OKLCH tokens) via `@theme inline` in
`globals.css`, matching the repo's existing `@theme inline` block. Components reference them as
`bg-background`, `text-foreground`, `border-border`, etc.

**Rationale**: CSS variables allow a single token (e.g., `--background`) to flip between light and
dark by redefining the variable, so components don't carry `dark:` variants. Existing repo already
uses `--background`/`--foreground` custom properties; we extend that pattern to ShadCn's full
palette.

**Alternatives considered**: Utility-class theming (`bg-zinc-950 dark:bg-zinc-100`) — verbose,
inconsistent with ShadCn's token model. Hex-palette variables (existing) — replaced by OKLCH for
correct contrast and consistency with ShadCn v4 defaults.

## 4. App Structure / Routing

**Decision**: Single Next.js App Router app (no monorepo, no backend). Routes:
`/`, `/projects`, `/about`, `/contact`. Shared `Navbar` + `Footer` composed in `RootLayout`.
Project data as a typed static module `src/data/projects.ts` (per approved design Approach A).

**Rationale**: Portfolio is static-friendly; no server data or auth. Multi-page classic portfolio
was explicitly requested. Static typed data keeps dependencies zero (no CMS/DB), matching the
spec's Assumptions.

**Alternatives considered**: MDX content files (heavier than needed for ~tens of projects). CMS
backed (network + key dependencies; overkill — YAGNI).

## 5. Navigation (Desktop + Mobile)

**Decision**: Desktop — inline `Link`s in Navbar. Mobile — ShadCn `Sheet` (slide-over) toggled by a
menu button. Active route highlighted via `usePathname()`.

**Rationale**: `Sheet` is the standard ShadCn navigation drawer, handles a11y (focus trap,
escape-to-close) for free, and reduces to a touch-friendly target on small screens.

**Alternatives considered**: A custom hamburger + dropdown (reinvents Radix a11y). Always-visible
nav (crowds mobile).

## 6. Icon Strategy

**Decision**: Use `lucide-react` (ShadCn default icon set) for nav/theme/action icons
(`Sun`, `Moon`, `Menu`, `X`, `ExternalLink`, `Github`, `Mail`, `ArrowRight`, etc.).

**Rationale**: A ShadCn dependency already; tree-shakeable, consistent, no image assets needed.

**Alternatives considered**: Inline SVGs (hand-maintained), an icon font (extra request payload).

## 7. Testing / Verification

**Decision**: No test framework in repo (per AGENTS.md). Verify with `pnpm exec tsc --noEmit`,
`pnpm lint`, `pnpm format:check`, and `pnpm build`. Manual validation via `pnpm dev` per
`quickstart.md` scenarios (theme toggle, nav on desktop+mobile, project links).

**Rationale**: Repo has no test runner and AGENTS.md specifies these verification commands. Adding
a framework (Vitest/Testing Library) is out of scope for a presentation-focused static site.

**Alternatives considered**: Add Vitest + React Testing Library (new dependency + config; not
warranted for this feature). E2E (Playwright) (overkill for v1).

## Key Decisions Summary

| Topic        | Decision                                                | Rationale                                              |
| ------------ | ------------------------------------------------------- | ------------------------------------------------------ |
| UI kit       | ShadCn via CLI, Tailwind v4                             | Repo already on TW v4; CLI supports it; no config file |
| Theme        | next-themes `class` strategy + CSS tokens               | SSR-safe, persistent, spec-compliant                   |
| Palette      | CSS variables (OKLCH) in `@theme inline`                | Token-based flipping; matches repo                     |
| Routing      | App Router pages `/`, `/projects`, `/about`, `/contact` | Multi-page requirement                                 |
| Data         | Static typed `src/data/projects.ts`                     | Zero deps, type-safe, easy to extend                   |
| Icons        | lucide-react                                            | ShadCn default; tree-shakeable                         |
| Verification | tsc + lint + format:check + build + manual              | Repo conventions; no test framework                    |
