# Phase 2: Theming Engine - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a complete dark/light theming system with distinct visual personalities. Users can switch between a "lab at night" dark mode and a "clinical clean" light mode via a toggle, with their preference remembered across visits and no flash of incorrect theme on load. Specifically: theme detection logic (system preference + localStorage), an inline blocking script for FOUC prevention, a sun/moon toggle in the header, smooth CSS transitions between modes, and visual QA of all existing components in both themes.

Requirements covered: THEME-01, THEME-02, THEME-03, THEME-04, THEME-05.

</domain>

<decisions>
## Implementation Decisions

### Toggle Placement & Style
- **D-01:** Toggle is placed **in the header, after the last nav link** on desktop. On mobile, it appears at the bottom of the mobile menu. This keeps it discoverable without cluttering the navigation.
- **D-02:** Toggle uses a **sun/moon icon button** — moon icon when in dark mode (click to switch to light), sun icon when in light mode (click to switch to dark). Compact, universally understood, fits the monospace/clinical aesthetic.

### Theme Transition Behavior
- **D-03:** Theme switch uses a **smooth CSS transition (~200-300ms)** on background-color, color, and border-color properties. All color token changes crossfade. No JS animation library needed — pure CSS transitions on key elements.

### Default Theme & Detection
- **D-04:** Initial theme determined by: (1) localStorage saved preference (returning visitors), (2) `prefers-color-scheme` system preference, (3) **light mode fallback** if neither exists. This is a change from Phase 1's dark-as-default — light ("clinical clean") is now the baseline.
- **D-05:** FOUC prevention via an **inline `<script>` in `<head>`** that reads localStorage and system preference before the first paint, applying the correct class to `<html>` synchronously. This runs before CSS parses, so no flash.
- **D-06:** CSS architecture change: `:root` will contain **light mode tokens** (the new default). Dark mode tokens move to a `.dark` class on `<html>`. This inverts the Phase 1 setup where `:root` was dark and `.light` was the override.

### Component Refinement Scope
- **D-07:** Approach is **token swap + visual QA**. CSS custom properties handle the color swap automatically. Manually review each component (Header, Footer, Section, Container, MobileNav) in light mode and fix any readability/contrast issues — e.g., backdrop-blur tint, border visibility, header transparency. Minimal code changes; mostly tweaking opacity and shadow values that don't render well in light mode.

### Agent's Discretion
- Icon choice for sun/moon (SVG inline vs icon library) — agent picks what's lightest
- Exact transition duration and easing curve — agent tunes for best feel
- localStorage key naming convention — agent decides
- Whether to add a `color-scheme` meta tag — agent decides based on best practice

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Specifications
- `.planning/REQUIREMENTS.md` — Full requirements list; Phase 2 covers THEME-01/02/03/04/05
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, and dependencies

### Prior Phase Context
- `.planning/phases/01-foundation-design-system/01-CONTEXT.md` — Foundation decisions: D-05 (tokens in global.css), D-06 (Tailwind 4.x CSS-first), D-07 (dark `:root` / light `.light` — **being inverted in this phase**), D-08 (inline scripts for interactivity), D-18 (Astro-only components, no React yet)

### Project Context
- `.planning/PROJECT.md` — Core value, constraints, design direction ("lab at night" dark, "clinical clean" light)
- `.planning/research/STACK.md` — Technology decisions: Astro 5.x, Tailwind CSS 4.x

### Key Implementation Files
- `src/styles/global.css` — Design tokens, both dark and light palettes already defined (lines 20-54)
- `src/layouts/BaseLayout.astro` — `<head>` where the FOUC-prevention script goes
- `src/components/Header.astro` — Where the toggle button will be added
- `src/components/MobileNav.astro` — Where the mobile toggle will be added

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Color tokens already defined:** `global.css` has both dark (`:root`, lines 20-41) and light (`.light`, lines 44-54) palettes. Both sets of CSS custom properties exist — they just need the class strategy inverted.
- **Header component:** `Header.astro` has desktop nav links and mobile hamburger. Toggle can be added after the nav links `<ul>` and before the hamburger button.
- **BaseLayout:** Clean `<head>` with room for the inline FOUC-prevention script before `</head>`.

### Established Patterns
- All color usage is through `var(--color-*)` custom properties — theme swap will propagate automatically
- Inline `<script>` pattern already used for mobile menu toggle and IntersectionObserver (Phase 1 D-08/D-09) — consistent with the FOUC-prevention script approach
- Tailwind 4.x `@theme` directive registers tokens for utility classes

### Integration Points
- `BaseLayout.astro` `<head>` — inject inline FOUC script
- `Header.astro` — add toggle button to desktop nav
- `MobileNav.astro` — add toggle to mobile menu
- `global.css` — restructure `:root` / class selectors, add transition properties

</code_context>

<specifics>
## Specific Ideas

- Light mode is the new default/fallback — "clinical clean" is the baseline experience for first-time visitors with no system preference
- The "lab at night" dark mode should feel cohesive and intentional, not just an inverted light theme
- Toggle icon should be understated — fits the monospace/clinical aesthetic, not playful or animated

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-theming-engine*
*Context gathered: 2026-03-29*
