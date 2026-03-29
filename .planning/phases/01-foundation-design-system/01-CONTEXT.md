# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a responsive, deployable site shell with the clinical data design DNA established. Visitors see a polished empty structure that loads fast and works on any device. Specifically: Astro project scaffolding, Tailwind CSS 4.x design tokens (color, typography, spacing), sticky navigation with active section tracking, placeholder content sections, and a GitHub Actions deployment pipeline to GitHub Pages at youngbinkim.com.

Requirements covered: LAYOUT-01, LAYOUT-02, LAYOUT-03, DESIGN-01, DESIGN-03, DESIGN-04, PERF-04, PERF-05.

</domain>

<decisions>
## Implementation Decisions

### Project Setup & Tooling
- **D-01:** Use **npm** as the package manager. It's the Node.js default, requires no additional installation, and aligns with Astro's official docs and GitHub Actions templates. No performance-critical dependency resolution needed for a portfolio site.
- **D-02:** Initialize Astro using `npm create astro@latest` with the **empty/minimal template** (not blog or starlight). The project structure will be clean — we define everything ourselves per the UI-SPEC component inventory.
- **D-03:** The old `index.html`, `assets/` directory, `cv.md`, `Youngbin_Kim_Resume.docx`, and `desktop.ini` will be **preserved in the repo root during Phase 1** but excluded from the Astro build. The `CNAME` file stays at root (GitHub Pages needs it). The old files can be cleaned up in a later housekeeping pass — no rush, they won't interfere with the Astro `src/` structure.
- **D-04:** Standard Astro project structure with the following conventions:
  ```
  src/
    components/    # Astro components (.astro files)
    layouts/       # BaseLayout.astro and any future layouts
    pages/         # index.astro (single-page site)
    styles/        # Global CSS, design tokens
  public/          # Static assets (favicon, CNAME copy if needed)
  ```

### Design Token Organization
- **D-05:** Design tokens live in a **single global CSS file** (`src/styles/global.css`) that serves as the single source of truth. This file contains: CSS custom properties for colors/spacing/typography, Tailwind CSS 4.x `@theme` directive registrations, base typography styles, and `prefers-reduced-motion` overrides. One file is appropriate at this scale — splitting adds indirection without benefit for ~30 tokens.
- **D-06:** Tailwind CSS 4.x integration uses the new CSS-first configuration approach. The `@theme` directive in `global.css` maps CSS custom properties to Tailwind utilities. No `tailwind.config.js` file — Tailwind 4.x does not require one when using the CSS-based approach.
- **D-07:** Dark mode variables are defined in `:root` (dark is the default per UI-SPEC). Light mode variables are defined under `.light` class on `<html>`. Phase 2 will add the toggle mechanism; Phase 1 ships dark-only but with both sets of variables already defined in CSS.

### Navigation Behavior
- **D-08:** Mobile menu uses **minimal vanilla JS** (not CSS-only). CSS-only hamburger menus rely on hidden checkbox hacks that are accessibility-unfriendly. A small inline `<script>` toggling a class (e.g., `data-menu-open` on the nav element) is cleaner, accessible (proper `aria-expanded`), and weighs ~20 lines. This stays within Astro's zero-JS philosophy since it's an inline script, not a bundled module.
- **D-09:** Active nav state uses **IntersectionObserver** via an inline `<script>` in the layout. Each `<section>` is observed; when a section enters the viewport (threshold ~0.3), its corresponding nav link gets the accent underline. This is the standard pattern for single-page portfolio nav highlighting.
- **D-10:** Smooth scrolling uses native CSS `scroll-behavior: smooth` on `<html>` with `scroll-padding-top: 80px` to offset the sticky header. No JS scroll library needed.

### Font Loading Strategy
- **D-11:** Use **Google Fonts CDN** with `<link rel="preconnect">` for both `fonts.googleapis.com` and `fonts.gstatic.com`, plus `font-display: swap`. This is the simplest, most maintainable approach — Google's CDN is globally distributed, handles subsetting automatically, and the performance difference vs self-hosting is negligible for 2 fonts. Self-hosting can be considered in Phase 6 if performance auditing reveals font loading as a bottleneck.
- **D-12:** Load exactly two font families: **Inter** (variable weight, 400+700) and **JetBrains Mono** (400 only). No italic variants — the UI-SPEC doesn't call for them.

### Deployment Pipeline
- **D-13:** Use the **official Astro GitHub Actions deploy workflow** (`withastro/action@v3`). This builds the Astro site and deploys to GitHub Pages using the Pages artifact approach (not the older `gh-pages` branch pattern). The workflow triggers on push to `main`.
- **D-14:** Branch strategy: **`main` branch only** for development and deployment. No separate `gh-pages` branch needed — the GitHub Actions Pages deployment handles it via artifacts. This is the modern GitHub Pages approach.
- **D-15:** The `CNAME` file must be in `public/` (so it copies to `dist/` on build) AND can remain at repo root for backwards compatibility. The Astro build's `public/CNAME` is what GitHub Pages will use.

### Placeholder Content Style
- **D-16:** Placeholder sections use **minimal, clean styling**: each section has its monospace label (`// about` etc. in JetBrains Mono + accent color), the section heading in Display typography, and a single line "This section is coming soon." in Body typography. No visual teasers or waveform hints — those belong to Phase 4. Clean and professional > empty-looking.
- **D-17:** Each placeholder section has `min-height: 50vh` to ensure meaningful scroll behavior and nav active state testing. The hero section placeholder is `min-height: 100vh` (full viewport) to establish the above-the-fold experience.

### Component Architecture
- **D-18:** All Phase 1 components are **Astro components** (`.astro` files). No React components in Phase 1 — there's no interactive state that requires it. React islands are introduced in Phase 4 (terminal typing, waveforms).
- **D-19:** The `Section.astro` component accepts props: `id` (string), `label` (string for mono accent text), `title` (string), and a default `<slot>` for content. This creates a consistent section pattern across the site.
- **D-20:** Component naming uses **PascalCase** for filenames (`BaseLayout.astro`, `Header.astro`, `MobileNav.astro`, `Section.astro`, `Footer.astro`, `Container.astro`). This matches Astro's conventions and the component inventory in the UI-SPEC.

### Agent's Discretion
- All decisions above were made at the agent's discretion per user preference ("I trust it to make the right decisions"). The agent has flexibility on implementation details not covered above — e.g., exact class naming patterns, Astro config options, build script naming.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Specifications
- `.planning/phases/01-foundation-design-system/01-UI-SPEC.md` — Complete visual and interaction contract: colors, typography, spacing, layout, component inventory, animation contract, Tailwind config contract, deployment contract
- `.planning/REQUIREMENTS.md` — Full requirements list; Phase 1 covers LAYOUT-01/02/03, DESIGN-01/03/04, PERF-04/05
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, and dependencies

### Project Context
- `.planning/PROJECT.md` — Core value, constraints (GitHub Pages, CNAME, BeatProfiler only), design direction
- `.planning/research/STACK.md` — Technology decisions: Astro 5.x, React 19.x (not Phase 1), Tailwind CSS 4.x, GitHub Pages + Actions

### Existing Assets
- `CNAME` — Domain configuration (youngbinkim.com), must be preserved
- `index.html` — Current "under construction" page, will coexist with Astro build initially

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project. No `src/` directory, no `package.json`, no existing Astro/React code.
- Old `assets/` directory contains Berkeley-era CSS/JS/images — not reusable for the new design.

### Established Patterns
- No patterns yet. Phase 1 establishes the foundational patterns that all subsequent phases build on.

### Integration Points
- `CNAME` file at repo root must be duplicated to `public/CNAME` for GitHub Pages deployment
- GitHub Pages deployment currently serves `index.html` from root — after Astro setup, it will serve from the Actions-built artifact

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User deferred all implementation choices to agent discretion with confidence in best-practice defaults.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-03-29*
