# Phase 6: Polish, Accessibility & Easter Eggs - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver final polish, ensure WCAG AA accessibility, configure SEO, and add subtle easter eggs for the user's hobbies (YNYC choir, biking/travel).

</domain>

<decisions>
## Implementation Decisions

### Accessibility (Reduced Motion)
- **D-01:** When `prefers-reduced-motion` is enabled, disable all animations completely (instant render). Do not retain slow fades or transitions.

### the agent's Discretion
- **YNYC Choir Link (ynyc.org):** How the easter egg is hidden/revealed (e.g., hover state, subtle link, console message).
- **Biking/Travel Visual Touch:** Where and how this visual easter egg appears on the site.
- **SEO & Meta Tags:** The default Open Graph image design and meta description content.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Specifications
- `.planning/REQUIREMENTS.md` — Full requirements list; Phase 6 covers EASTER-01, EASTER-02, EASTER-03, PERF-01, PERF-02, PERF-03.
- `.planning/ROADMAP.md` — Phase 6 goal, success criteria, and dependencies.

### Project Context
- `.planning/PROJECT.md` — Core value and personal interests context.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/react/ScrollReveal.tsx` — Used for scroll animations; needs update to respect reduced motion.
- `src/components/react/TerminalHero.tsx` — Hero animation component; needs reduced motion support.
- `src/styles/global.css` — Global CSS where `@media (prefers-reduced-motion: reduce)` overrides can be placed.

### Integration Points
- `src/layouts/BaseLayout.astro` — Location for adding SEO meta tags and Open Graph data.
- `src/pages/index.astro` — About section text ("singing with the Young New Yorkers' Chorus", "biking", "planning my next trip") is the prime location for injecting the easter eggs.

</code_context>

<specifics>
## Specific Ideas

- No specific requirements for easter eggs or SEO — open to standard, non-intrusive approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 06-polish-accessibility-easter-eggs*
*Context gathered: 2026-03-31*
