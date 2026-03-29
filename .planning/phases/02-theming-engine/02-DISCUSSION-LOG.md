# Phase 2: Theming Engine - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-29
**Phase:** 02-theming-engine
**Areas discussed:** Toggle placement & style, Theme transition behavior, Default theme & detection, Component refinement scope

---

## Toggle Placement & Style

### Q1: Where should the dark/light mode toggle be placed?

| Option | Description | Selected |
|--------|-------------|----------|
| Header, after nav links | Sun/moon icon placed after the last nav link on desktop, and at the bottom of the mobile menu. Standard pattern for portfolio sites. | ✓ |
| Header, before logo | Toggle on the far left, before the 'Youngbin Kim' logo text. Unconventional but gives it prominence. | |
| Floating button | Fixed-position button in the bottom corner of the screen. Always visible regardless of scroll. | |

**User's choice:** Header, after nav links (Recommended)
**Notes:** None — straightforward selection.

### Q2: What visual style for the toggle itself?

| Option | Description | Selected |
|--------|-------------|----------|
| Icon button (sun/moon) | Simple icon swap — moon icon in dark mode, sun icon in light mode. Matches monospace/clinical aesthetic. | ✓ |
| Labeled toggle switch | A small pill/slider toggle with a label like 'Dark/Light'. More explicit but takes more header space. | |
| You decide | Agent picks the best approach. | |

**User's choice:** Icon button (sun/moon) (Recommended)
**Notes:** None.

---

## Theme Transition Behavior

### Q1: How should the theme switch animate between dark and light?

| Option | Description | Selected |
|--------|-------------|----------|
| Smooth CSS transition | All color properties transition over ~200-300ms. Background, text, borders crossfade. Pure CSS. | ✓ |
| Instant swap | No transition — colors change immediately. Snappy but abrupt. | |
| You decide | Agent picks the best transition approach. | |

**User's choice:** Smooth CSS transition (Recommended)
**Notes:** None.

---

## Default Theme & Detection

### Q1: How should the initial theme be determined on first visit?

| Option | Description | Selected |
|--------|-------------|----------|
| System preference with dark fallback | Check prefers-color-scheme first, fall back to dark if no preference. | |
| Always dark first | Dark mode default regardless of system preference. | |
| Always light first | Light mode as default. | |

**User's choice:** Custom — "System preference with light fallback"
**Notes:** User specified light fallback instead of the offered dark fallback. This means light ("clinical clean") is the baseline when no system preference or stored choice exists.

### Q2: Confirmation of light fallback behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, that's right | Light fallback, system preference respected, localStorage for returning visitors. | ✓ |
| No, dark fallback | Dark as the fallback when no system preference exists. | |

**User's choice:** Yes, that's right
**Notes:** Confirmed: first visit with no system pref → light mode. prefers-color-scheme: dark → dark mode. Returning visitors → localStorage preference.

---

## Component Refinement Scope

### Q1: How much should existing components be refined for the light mode experience?

| Option | Description | Selected |
|--------|-------------|----------|
| Token swap + visual QA | CSS variables handle color swap. Review each component in light mode and fix readability/contrast issues. Minimal code changes. | ✓ |
| Distinct visual treatments per mode | Beyond tokens: different shadows, border styles, header transparency per mode. More polished but more CSS to maintain. | |
| You decide | Agent assesses and fixes to its judgment. | |

**User's choice:** Token swap + visual QA (Recommended)
**Notes:** None.

---

## Agent's Discretion

- Icon choice for sun/moon (SVG inline vs icon library)
- Exact transition duration and easing curve
- localStorage key naming convention
- Whether to add a `color-scheme` meta tag

## Deferred Ideas

None — discussion stayed within phase scope.
