# Contracts: Portfolio Application

**Feature**: Portfolio Application (specs/001-portfolio-app)

The project exposes no external API. This is a web application, so the "contracts" are UI/data
interfaces consumed by pages and component consumers. Define the component prop contracts because
pages and components depend on them.

## 1. `Project` Data Contract

Defined fully in [../data-model.md](../data-model.md). Consumed by `ProjectList`, `ProjectCard`,
and the Home featured section.

**Consumers**: `/` (featured only), `/projects` (all).

## 2. `ProjectCard` Component Contract

```tsx
interface ProjectCardProps {
  project: Project;
  priority?: boolean; // true for above-the-fold images (Home featured), default false
}
```

- Renders: title, category badge, description, role, tech stack badges, first screenshot (or
  placeholder), demo + GitHub links (hidden when absent), year.
- Called by `ProjectList` (one card per project) and Home featured section.
- Must handle a project with empty `screenshots` and absent `demoUrl`/`githubUrl` without breaking.

## 3. `ProjectList` Component Contract

```tsx
interface ProjectListProps {
  projects: Project[];
}
```

- Renders the full vertical list of `ProjectCard`s with separators between entries.
- Used by `/projects`. Home featured section does NOT use this — it renders a compact subset.

## 4. `ThemeToggle` Component Contract

```tsx
// no props
```

- Renders a `DropdownMenu` (or Button) with Sun/Moon icons.
- Actions: shows current theme, allows switching to Light, Dark, or System.
- Uses `useTheme()` from next-themes. Zero props keeps it self-contained and testable.

## 5. `Navbar` Component Contract

```tsx
interface NavbarProps {
  activePath: string; // derived from usePathname()
}
```

- Desktop: inline `Link`s for Home / Projects / About / Contact + ThemeToggle.
- Mobile: menu button opening a `Sheet` containing the same links + ThemeToggle.
- Active page (from `activePath`) gets a highlighted style.
- Brand/logo links to `/`.

## 6. `Footer` Component Contract

```tsx
// no props
```

- Renders social links, a short copyright line. Links target `_blank` where external.

## 7. `ThemeProvider` Component Contract

```tsx
import type { ThemeProviderProps } from "next-themes";

function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element;
```

- "use client" wrapper around `next-themes`'s `ThemeProvider`.
- Wraps `children` in `RootLayout` with `attribute="class"`,
  `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.

## 8. `globals.css` Token Contract (Theme Variables)

- `:root` defines light tokens (OKLCH), `.dark` defines dark tokens.
- `@theme inline` maps `--color-*` for: background, foreground, card, card-foreground,
  primary, primary-foreground, secondary, secondary-foreground, muted, muted-foreground,
  accent, accent-foreground, border, input, ring, destructive, destructive-foreground, popover,
  popover-foreground, radius, plus sidebar tokens if generated.
- All theme-dependent surfaces use `bg-background` / `text-foreground` etc., never hardcoded
  colors, so the toggle restyles everything.

## Validation of Contracts

Model contracts are enforced by TypeScript (strict): add a project missing `slug` → compile error.
Component prop contracts enforced by TS too. Behavior contracts (link hiding, placeholder image,
toggle persistence) are validated manually per [../quickstart.md](../quickstart.md).
