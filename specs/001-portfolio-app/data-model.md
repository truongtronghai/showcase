# Data Model: Portfolio Application

**Feature**: Portfolio Application (specs/001-portfolio-app)

Derived from spec's Key Entities (Project, Theme, Navigation Item). This is a static,
presentation-only data model; no persistence layer or database exists.

## Entities

### Project

A showcase entry representing one piece of work (web application or freelance contract).

**Fields**:

| Field         | Type                       | Required | Description                                                     |
| ------------- | -------------------------- | -------- | --------------------------------------------------------------- |
| `slug`        | `string`                   | yes      | URL-safe unique identifier (kebab-case).                        |
| `title`       | `string`                   | yes      | Display name of the project.                                    |
| `category`    | `"web-app" \| "freelance"` | yes      | Classification of the work.                                     |
| `description` | `string`                   | yes      | What the project does (plain narrative).                        |
| `role`        | `string`                   | yes      | The owner's contribution on the project.                        |
| `techStack`   | `string[]`                 | yes      | Ordered list of technology names shown as badges.               |
| `screenshots` | `Screenshot[]`             | yes      | Ordered images; may be empty during seeding.                    |
| `demoUrl`     | `string` (URL)             | no       | Live demo link (hidden when absent).                            |
| `githubUrl`   | `string` (URL)             | no       | Source repository link (hidden when absent).                    |
| `featured`    | `boolean`                  | yes      | Whether the project appears on the Home page (default `false`). |
| `year`        | `number`                   | yes      | The year the work was completed.                                |

**Screenshot** (nested): `{ src: string; alt: string; caption?: string }`

**Rules**:

- `slug` MUST be unique across all projects.
- At least one of `demoUrl` / `githubUrl` SHOULD be present; if both are absent the project still
  renders (links hidden).
- `screenshots` MAY be empty; the card must render a placeholder instead of broken image.
- `techStack` MUST NOT contain duplicate items.
- `category` MUST be one of the two literal values.

**No state transitions** — projects are static content, never mutated at runtime.

### Theme

A persisted appearance preference.

| Field   | Type                            | Description          |
| ------- | ------------------------------- | -------------------- |
| `value` | `"light" \| "dark" \| "system"` | Selected appearance. |

**Rules**:

- Exactly one theme is active at a time.
- Initial default is `"system"` (OS preference); explicit user choice overrides and persists
  (localStorage via next-themes).
- No transition graph beyond: user selects → preference updated & persisted → `.dark` class
  toggles on `<html>` when resolved theme is dark.

### Navigation Item

A link descriptor in the nav bar.

| Field   | Type     | Description                      |
| ------- | -------- | -------------------------------- |
| `label` | `string` | Visible text (e.g., "Projects"). |
| `href`  | `string` | Route path (e.g., `/projects`).  |

**Fixed set**: Home (`/`), Projects (`/projects`), About (`/about`), Contact (`/contact`).
Additionally the brand/logo links to `/`.

## Relationships

- A Project belongs to exactly one `category`.
- A Project is independently `featured` or not (a featured project is still shown in the full
  projects list).
- Navigation Items are independent of Projects and Theme.
- Theme is global, shared by all pages; no per-project theming.

## File Location

- Projects: `src/data/projects.ts` exporting `projects: Project[]` and the `Project` type (or the
  type in `src/data/types.ts` — keep the type with the data for a small codebase, per "meaningful
  names" convention).
- Navigation: inline constant in `src/components/layout/Navbar.tsx`.
