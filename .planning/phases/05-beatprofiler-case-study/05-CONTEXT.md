# Phase 05: BeatProfiler Case Study - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the BeatProfiler project showcase into a deep-dive case study with narrative structure, pipeline diagrams, cardiac visualizations, and impact metrics. This replaces a generic project card with a rich, interactive "clinical dashboard" aesthetic.

Requirements covered: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05.

</domain>

<decisions>
## Implementation Decisions

### Case Study Structure & Layout
- **D-01:** Agent's discretion on exact layout to accommodate visuals. The existing `Container` (max-w-4xl) is narrow, so the case study should use a split-pane or wide-grid layout that breaks out of the constraints to give diagrams and visualizations room to breathe.
- **D-02:** If the layout doesn't work out, it will be adjusted later. The focus is on a robust structure that could be reused for future showcases.

### Impact Metrics Display
- **D-03:** Since there are only a few key metrics (521+ downloads, university adoption, IEEE publication), use a minimal presentation (e.g., inline data points, tags, or small pills) instead of large, empty stat cards. Keep it clean.

### Pipeline/Workflow Diagram
- **D-04:** Build the pipeline diagram as an interactive, step-by-step React component using Framer Motion, rather than a static SVG image. It should feel dynamic and engaging.

### Cardiac Waveform Fidelity
- **D-05:** Render the waveform using an authentic, "D3-style" SVG path generated from a real data array, rather than using an abstract static picture. It must feel like real clinical data.

### the agent's Discretion
- **Case Study Layout:** The exact layout configuration (split-pane, wide grid, full-bleed backgrounds) is up to the agent, with the constraint that it should look robust and accommodate the interactive diagrams and waveforms well.
- **Data Array Generation:** The specific formula or static JSON array used to generate the cardiac waveform is left to the agent's implementation.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Specifications
- `.planning/REQUIREMENTS.md` — Full requirements list; Phase 5 covers PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05.
- `.planning/ROADMAP.md` — Phase 5 goal, success criteria, and dependencies.

### Project Context
- `.planning/PROJECT.md` — Core context on BeatProfiler (downloads, adoption, IEEE paper) and the clinical data aesthetic.

### Prior Phase Context
- `.planning/phases/04-hero-waveform-motifs/04-CONTEXT.md` — Although waveforms were cancelled as a background motif for the site shell, Phase 5 reintroduces them specifically as *content* within the case study.
- `.planning/phases/01-foundation-design-system/01-CONTEXT.md` — Foundation decisions establish the "clinical data aesthetic" that this case study must follow.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/Section.astro` — Standard section wrapper.
- `src/components/react/ScrollReveal.tsx` — Framer Motion `whileInView` wrapper from Phase 4 that can be used to animate elements of the case study on scroll.

### Established Patterns
- All interactive, animated components (like the Pipeline Diagram and Waveform generator) must be React islands (`client:load` or `client:visible`).
- Staggered entrances are the established animation pattern for data loading.

### Integration Points
- `src/pages/index.astro` — The BeatProfiler case study will replace the "This section is coming soon" placeholder in the `#projects` section.

</code_context>

<specifics>
## Specific Ideas

- The user explicitly requested an authentic "D3-style" data array rendering for the waveform rather than a static asset.
- Interactive pipeline steps are preferred over static diagram images.

</specifics>

<deferred>
## Deferred Ideas

- **Future LLM Project Swap:** The user questioned whether BeatProfiler should be the main highlight and mentioned eventually replacing it with an LLM-based project showcase. We are proceeding with BeatProfiler for now, but the layout and components (diagrams, data viz) should be built robustly so they can be reused/swapped for a different case study later.

</deferred>

---

*Phase: 05-beatprofiler-case-study*
*Context gathered: 2026-03-31*
