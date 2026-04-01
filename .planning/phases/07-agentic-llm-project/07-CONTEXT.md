# Phase 7: Agentic LLM Project - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Add a second project case study to the portfolio showcasing ChartExtract — an agentic clinical NLP platform — as a sibling to the BeatProfiler case study in the existing `#projects` section. This is an architecture showcase: no links, no repo, no live demo. The content communicates what the system does and how it works through a punchy description, a generic use case framing, and two interactive React components (builder workflow + embedded pipeline DAG panel).

</domain>

<decisions>
## Implementation Decisions

### Content Framing
- **D-01:** Project name is **ChartExtract** — no mention of NYP, no "Built at..." attribution, no institutional context.
- **D-02:** Punchy 2–3 sentence problem statement up front, then straight into the system. No extended prose on the clinical abstraction burden.
- **D-03:** Use case examples are generic and common — cancer staging, medication extraction, etc. Do NOT use the exact real-world registries Youngbin is working on (no NSQIP, no SEP-1 by name, no Banff). Framing: "clinical documents like discharge summaries, operative notes, and pathology reports."
- **D-04:** No external links, no badges, no "manuscript in preparation" — clean showcase only. Links added when/if open-sourced.

### Interactive Builder Workflow Component
- **D-05:** The primary interactive component shows the **pipeline builder workflow** as a cyclical DAG with three loops:
  1. **Design loop:** Chat with AI → Generated Pipeline → (iterate back to chat)
  2. **Workbench loop:** Run ad-hoc test → Review output → (iterate back to test)
  3. **Optimize loop:** Label corrections → DSPy optimize → (loop back to label)
- **D-06:** The loops **auto-cycle on load** — each loop animates in sequence to show its cycle path. User can also **click a loop to isolate/highlight it**; clicking elsewhere (or the same loop again) returns to auto-cycle.
- **D-07:** Clicking a **step node** expands its description (same interaction pattern as BeatProfiler's PipelineDiagram). The loop highlight and step expand are independent interactions.

### Embedded Pipeline Panel
- **D-08:** Inside the builder workflow component (or as a panel below it), show a **sample generated pipeline** as a mini DAG — this is what the "Generated Pipeline" step outputs.
- **D-09:** The sample pipeline is a **conditional DAG** representing a generic cancer staging scenario:
  - **Node 1 — Cancer Type Extraction** (ChainOfThought): Extracts cancer type from clinical text
  - **Conditional edge:** If cancer type = "breast cancer" → route to Node 2B; otherwise → implied/not rendered
  - **Node 2B — Biomarker Extraction** (ChainOfThought): Extracts HER2, ER, PR status
  - The non-breast branch is **not rendered** — only the breast cancer path is shown, keeping the diagram clean
- **D-10:** The pipeline panel uses the same card style as BeatProfiler's Pipeline/Waveform panels (`bg-[var(--color-surface-elevated)] border border-[var(--color-border)]`).

### Layout & Integration
- **D-11:** ChartExtract is added as a second project **within the existing `#projects` section** — below BeatProfiler, same wide-container layout (`lg:max-w-[1280px]`).
- **D-12:** A visual separator (e.g., a horizontal rule or spacing) divides BeatProfiler and ChartExtract within the projects section.
- **D-13:** No impact metrics pills for ChartExtract (unlike BeatProfiler's "500+ downloads / IEEE Published") — it's a work-in-progress showcase. Use a status badge like `In Development` or `Research` instead.
- **D-14:** ScrollReveal entrance animations applied consistently with BeatProfiler's pattern.

### the agent's Discretion
- Exact Framer Motion animation approach for the loop highlight cycle (keyframes, color pulse, stroke animation, etc.)
- Typography and spacing within the workflow component
- Whether the pipeline panel is embedded inside the workflow component or rendered as a separate card below it
- The exact label/description text for each pipeline step node

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Specifications
- `.planning/ROADMAP.md` — Phase 7 goal, success criteria, and dependencies
- `.planning/REQUIREMENTS.md` — v2 requirement CONTENT-01 ("Additional project case studies if non-proprietary projects become available") is the origin of this phase

### Project Context
- `.planning/PROJECT.md` — Core value, clinical data aesthetic, and design constraints
- `.planning/phases/05-beatprofiler-case-study/05-CONTEXT.md` — BeatProfiler case study decisions; ChartExtract must parallel this structure and reuse its patterns

### Source Material (for content accuracy)
- `/home/youngbin/GitHub/registry_agent/README.md` — System overview, architecture, tech stack
- `/home/youngbin/GitHub/registry_agent/manuscript/manuscript_outline.md` — Detailed system description, workflow, use cases, and architecture diagrams (Figures 1–6); use for accurate technical content but do NOT copy real registry names verbatim

### Prior Phase Context
- `.planning/phases/04-hero-waveform-motifs/04-CONTEXT.md` — ScrollReveal pattern, Framer Motion setup
- `.planning/phases/06-polish-accessibility-easter-eggs/06-CONTEXT.md` — Accessibility constraints (prefers-reduced-motion must be respected)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/react/PipelineDiagram.tsx` — **Primary reference component.** Clickable step nodes with AnimatePresence expand/collapse, staggered entrance, reduced-motion fallback. The ChartExtract workflow component should follow this architecture closely.
- `src/components/react/ScrollReveal.tsx` — Wrap new content panels for scroll-triggered entrance
- `src/components/react/CardiacWaveform.tsx` — Reference for how a self-contained React island renders a data visualization with no props
- `src/components/Section.astro` / `src/components/Container.astro` — Standard layout wrappers

### Established Patterns
- **React islands** with `client:visible` for interactive components — do not use `client:load` unless above the fold
- **CSS custom properties** (`var(--color-accent)`, `var(--color-surface-elevated)`, `var(--color-border)`, etc.) for all colors — never hardcode hex values
- **Framer Motion via `motion/react`** (not `framer-motion`) — import path matters
- **`useReducedMotion()`** hook required in any animated component — provide fully static fallback
- **`AnimatePresence`** for conditional content (expand/collapse, show/hide)
- Wide container pattern for projects: `mx-auto w-full px-4 md:px-8 lg:max-w-[1120px] xl:max-w-[1280px]` (inline in `index.astro`, not via `Container.astro`)

### Integration Points
- `src/pages/index.astro` — ChartExtract case study added after the BeatProfiler block, inside the same `<section id="projects">` element, before the closing `</section>` tag
- New React components go in `src/components/react/` — follow existing naming convention (PascalCase, `.tsx` extension)
- No new Astro pages needed — everything lives in `index.astro`

</code_context>

<specifics>
## Specific Ideas

- The workflow DAG has three named loops: Design loop (chat → generate → iterate), Workbench loop (test → review → iterate), Optimize loop (label → DSPy optimize → loop back). These loop names should be visible as labels on the diagram.
- The conditional pipeline panel shows only the breast cancer branch — "breast cancer" cancer type routes to HER2/ER/PR biomarker extraction. The non-breast branch is implied but not rendered.
- "ChartExtract" is the display name — not "Registry Agent," not "Clinical NLP Platform."
- Generic framing for use cases: cancer staging, medication extraction — avoid NSQIP, SEP-1, Banff by name.
- No institutional attribution — no NYP, no Columbia, no "Built at..." badge.

</specifics>

<deferred>
## Deferred Ideas

- External links (GitHub repo, demo, manuscript) — add when open-sourced/published
- Impact metrics pills — add when there is something to report (downloads, citations, etc.)
- Real NSQIP/SEP-1/Banff pipeline examples — could replace the generic TNM example if/when the work is publishable
- "Manuscript in preparation" badge — user explicitly deferred until open-sourced

</deferred>

---

*Phase: 07-agentic-llm-project*
*Context gathered: 2026-03-31*
