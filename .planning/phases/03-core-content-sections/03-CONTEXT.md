# Phase 3: Core Content Sections - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the About section and Experience timeline to establish the professional narrative (who Youngbin is, where he's worked), while gracefully handling contact information by delegating it to the existing Footer. 

Requirements covered: ABOUT-01, ABOUT-02, ABOUT-03, EXP-01, EXP-02, EXP-03, CONTACT-01, CONTACT-02, CONTACT-03.

</domain>

<decisions>
## Implementation Decisions

### About Section Narrative
- **D-01:** Write real, ship-ready copy (the agent should draft it, the user will edit later).
- **D-02:** Use a two-part block structure as the primary direction, but the downstream agent should propose 2-3 concrete layout options (with real copy variations) for the user to review.
- **D-03:** Weave personality into a single sentence at the end of the bio (mentioning choir, biking, and travel).

### Experience Timeline
- **D-04:** Use a horizontal layout with a compact, data-visualization feel.
- **D-05:** Include exactly 4 stops on the timeline: 
  1. NYP (Senior Data Scientist)
  2. Columbia (PhD Biomedical Engineering, 2024)
  3. Genentech (ML Intern)
  4. UC Berkeley (Undergrad)

### Contact Section
- **D-06:** Remove the placeholder `#contact` section entirely.
- **D-07:** Let the existing Footer handle contact info (email and LinkedIn links are already there).
- **D-08:** Remove the "Contact" link from the navigation menu (desktop and mobile).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Background
- `.planning/REQUIREMENTS.md` — Full requirements list; Phase 3 covers ABOUT-01/02/03, EXP-01/02/03, CONTACT-01/02/03.
- `.planning/PROJECT.md` — Core context on professional background (PhD, NYP, Genentech, Berkeley) and personal interests (YNYC, biking, travel).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/Section.astro` — Standard section wrapper to be used for the `#about` and `#experience` sections.
- `src/components/Footer.astro` — Already contains the email and LinkedIn links; no additional contact UI is needed.

### Integration Points
- `src/components/Header.astro` & `src/components/MobileNav.astro` — The navigation lists need to be updated to remove the `#contact` link.
- `src/pages/index.astro` — Remove the `#contact` section placeholder and populate the `#about` and `#experience` placeholders.

</code_context>

<specifics>
## Specific Ideas

- **Timeline Aesthetic:** The experience timeline should feel like a "compact data-viz" horizontal bar, not a bloated biography. Clean and clinical.
- **About Copy:** Don't leave lorem ipsum. Provide real draft copy that weaves the professional summary (LLM Engineer, Clinical AI, PhD) naturally into the hobbies at the very end.

</specifics>

<deferred>
## Deferred Ideas

- Adding older or tangential experience (e.g., InVivo consulting, high school) was explicitly excluded from the timeline to keep it focused.

</deferred>

---

*Phase: 03-core-content-sections*
*Context gathered: 2026-03-30*
