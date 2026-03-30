# Phase 4: Hero & Waveform Motifs - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the striking terminal-style hero intro that reveals Youngbin's identity on page load, and add scroll-triggered entrance animations for all subsequent sections. 
*(Note: The "Waveform Motifs" portion of this phase has been explicitly tabled per user decision.)*

Requirements covered: HERO-01, HERO-02, HERO-04, HERO-05, LAYOUT-04. (HERO-03 and DESIGN-02 are deferred/cancelled).

</domain>

<decisions>
## Implementation Decisions

### Terminal Intro Choreography
- **D-01:** Implement a clean, direct typewriter effect on the name ("Youngbin Kim") and title ("LLM Engineer / Data Scientist (Clinical AI)").
- **D-02:** Do not include fake terminal initialization commands (like `init llm_pipeline...` or "loading..."). Keep it punchy and professional.
- **D-03:** Include a blinking block cursor (e.g., `█`) that matches the existing UI color scheme (standard text color or the teal accent color, but not a new contrasting color).

### Scroll Entrance Animations
- **D-04:** Use a "data loading" staggered reveal for sections entering the viewport.
- **D-05:** Instead of a simple block fade-up, elements (section headers, text blocks, expertise cards, timeline stops) should pop in sequentially to mimic data populating on a screen.

### Waveform Motifs (Tabled)
- **D-06:** Do NOT build the animated waveform background in the hero or section dividers. The metaphor felt forced when trying to connect clinical EKG, music, and discrete NLP/LLM tokens. The design will rely on crisp typography and layout instead.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Background
- `.planning/REQUIREMENTS.md` — Full requirements list; Phase 4 covers HERO-01, HERO-02, HERO-04, HERO-05, and LAYOUT-04.
- `.planning/PROJECT.md` — Context on professional identity and the "clinical data aesthetic".

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/pages/index.astro` — The `#home` section currently has static HTML. This needs to be replaced with the interactive terminal component.
- The `IntersectionObserver` logic in `index.astro` (used for active nav highlighting) can serve as a reference, but a dedicated animation library (like Framer Motion) or robust CSS/JS combination will be needed for the staggered reveals.

### Integration Points
- **React Integration:** Since complex sequencing (typing effect, blinking cursor, staggered scroll reveals) is required, this phase is the appropriate time to add the `@astrojs/react` integration and build these elements as React islands, as decided in the original project roadmap.

</code_context>

<specifics>
## Specific Ideas

- **Typewriter Effect:** Needs to be accessible to screen readers. The actual text should be in the DOM (perhaps visually hidden or revealed via CSS `ch` unit animations/JS) so SEO and accessibility aren't broken by a JS typing loop.
- **Blinking Cursor:** Should feel authentic but cleanly integrated into the typography hierarchy (Inter/JetBrains Mono).

</specifics>

<deferred>
## Deferred Ideas

- **Waveform Motifs:** Tabled entirely. The idea of tying cardiac signals, music, and NLP tokens into a visual wave was interesting in theory but not compelling enough in practice. Cancelled for v1.

</deferred>

---

*Phase: 04-hero-waveform-motifs*
*Context gathered: 2026-03-30*
