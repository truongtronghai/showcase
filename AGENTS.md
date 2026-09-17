# AGENTS.md

## Stack

Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind v4 + React Three Fiber + GSAP. Repo has no commits yet (fresh, on `main`).

## Commands (always pnpm, never npm/yarn)

- `pnpm dev` — dev server on `http://localhost:3000`
- `pnpm build` — production build; also runs TypeScript type checking
- `pnpm lint` — ESLint (next core-web-vitals + typescript + prettier)
- `pnpm format` / `pnpm format:check` — Prettier (double quotes, semis, trailing commas, Tailwind class sorting)
- No test framework or tests exist. Verify work with `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format:check`.
- Husky pre-commit runs `pnpm lint-staged` (auto-formats changed files), so match Prettier/ESLint style to avoid noisy commits.

## Critical: two hero implementations

These are not aliases — only one is wired up:

- **`src/components/Hero3D/` is the ACTIVE hero.** Imported by `src/app/page.tsx`. Single R3F `<Canvas>` with drei helpers (`Float`, `MeshDistortMaterial`, `ContactShadows`, `Sparkles`) + GSAP ScrollTrigger scrub.
- **`src/components/hero/` (lowercase) is an orphaned alternative** matching the `prompts/web3-hero.md` architecture (`HeroScene`, `HeroObject`, `HeroParticles`, etc.). Nothing imports it. Editing it changes nothing on the page.

If asked to change the hero, confirm which one is targeted or you'll edit dead code.

## Conventions

- Path alias: `@/*` → `src/*` (see `tsconfig.json`).
- Tailwind v4: configured only via `@import "tailwindcss"` and `@theme inline` in `src/app/globals.css`. There is **no** `tailwind.config.js` — don't create one.
- GSAP components register plugins at module scope and use `useGSAP` with `scope`, `dependencies: [...], revertOnUpdate: true`, and explicit cleanup callbacks. Follow this pattern; never leak ScrollTriggers on re-render/unmount.
- Scoped styles use CSS Modules (`*.module.css`) for hero components; layout/content use Tailwind/CSS variables.
- `prompts/` holds design briefs for hero builds (e.g. `web3-hero.md`) — reference them for intent/specs.
- Repo-local opencode commands live in `.opencode/commands/` (speckit spec/task workflow); `.specify/` is that workflow's scaffolding (constitution is an unfilled template).
- Separated components put in folder src/components . Do not create a long file component.
- Naming functions, classes, variables, types ... in meaning words. Not using abbreviation.

# Agent Development Policy

Superpowers is installed and available.

Use Superpowers skills when they provide meaningful value, but use engineering judgment
about process overhead.

For simple, low-risk changes such as:

- CSS/Tailwind changes
- simple JSX changes
- visual/layout changes
- renaming
- mechanical refactoring
- obvious configuration changes

do not invoke TDD.

For normal features:

- implement the feature
- run relevant tests
- fix failures
- verify the result

Use test-driven-development for:

- complex business logic
- complex state transitions
- authentication/authorization
- non-trivial data transformations
- complex hooks
- high-risk behavior
- regression bugs where a regression test is valuable

When a bug is discovered, prefer writing a regression test before fixing it.

Always perform appropriate verification before declaring the task complete.
