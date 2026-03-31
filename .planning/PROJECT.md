# Youngbin Kim — Personal Portfolio Website

## What This Is

A personal portfolio website for Youngbin Kim, an LLM Engineer / Data Scientist (Clinical AI) at New York-Presbyterian. The site serves as a professional portfolio to attract employers and collaborators, with a distinctive design identity that weaves in personality and hobbies. Hosted on GitHub Pages at youngbinkim.com.

## Core Value

Visitors immediately understand who Youngbin is professionally (clinical AI / LLM engineer with a Columbia PhD) and walk away remembering a site that felt distinctly personal — not a generic template.

## Requirements

### Validated

- [x] Responsive design (mobile + desktop) — Validated in Phase 1: Foundation & Design System
- [x] Static site compatible with GitHub Pages hosting — Validated in Phase 1: Foundation & Design System
- [x] Clinical data aesthetic as the design DNA (EHR-inspired typography, data viz motifs) — Foundation validated in Phase 1 (design tokens, typography hierarchy)
- [x] Dark/light mode with distinct personalities (dark = "lab at night", light = clinical/clean) — Validated in Phase 2: Theming Engine
- [x] About section: professional background + personality (hobbies woven in, not separated) — Validated in Phase 3: Core Content Sections
- [x] Experience timeline (NYP, Columbia PhD, Genentech internship) — Validated in Phase 3: Core Content Sections
- [x] Contact section with email and LinkedIn (no Facebook) — Validated in Phase 3: Core Content Sections

### Active

- [x] Terminal-style hero intro with typing animation revealing professional identity — Validated in Phase 4: Hero & Waveform Motifs

- [x] Waveform design motif throughout the site (section dividers, hover effects, background elements) — ties cardiac signals, NLP data, and music together — Validated in Phase 4 (Staggered scroll reveals added, waveforms explicitly cancelled per D-06)
- [x] Projects section with BeatProfiler as a deep-dive case study (pipeline diagram, cardiac signal visuals, impact metrics) — Validated in Phase 5: BeatProfiler Case Study
- [ ] Hobby easter eggs: YNYC choir link (ynyc.org), biking/travel touches — discoverable, not prominent
- [ ] Responsive design refinement (content-level responsive testing across breakpoints)
- [ ] Static site compatible with GitHub Pages hosting (deployment verified)

### Out of Scope

- Blog/writing section — not requested, portfolio-focused for now
- Multiple project case studies — only BeatProfiler (Registry Agent is proprietary)
- CMS or dynamic backend — static site, GitHub Pages hosting
- Contact form with server-side handling — email/LinkedIn links sufficient
- OAuth or any authentication — public portfolio site

## Context

- **Existing site:** Astro-powered site shell at youngbinkim.com (xmicroby.github.io). Phase 1 complete: design system, responsive layout. Phase 2 complete: dark/light theming engine. Phase 3 complete: About section and Experience timeline built, contact delegated to footer. Phase 4 complete: Terminal typing hero and staggered scroll-reveal animations. Phase 5 complete: BeatProfiler case study with pipeline and waveform components. Old index.html and assets still in repo root (cleanup deferred).
- **Professional background:** PhD in Biomedical Engineering from Columbia (2024). First dedicated LLM hire at NYP. Built HIPAA-compliant LLM infrastructure, clinical NLP pipelines, agentic workflows. 9 peer-reviewed publications. Prior: Genentech ML intern, UC Berkeley BioE/EECS.
- **BeatProfiler:** Open-source ML platform for cardiac signal analysis (beatprofiler.github.io). 521 downloads, adopted at Harvard/MIT/Cornell/Columbia. IEEE published. Rich visual content available (cardiac waveforms, video analysis, pipeline diagrams).
- **Personal interests:** Member of Young New Yorkers' Chorus (ynyc.org), biking, traveling, singing.
- **Design direction:** Professional-first with personal flavor. Clinical data aesthetic — not generic template. Waveform motif connects work (cardiac signals, NLP pipelines) and passions (music/choir). Terminal/code-flavored hero intro. Hobby touches are easter eggs, not sections.
- **CNAME:** youngbinkim.com already configured.

## Constraints

- **Hosting:** GitHub Pages — static files only, no server-side processing
- **Domain:** youngbinkim.com (CNAME already set up)
- **Content:** BeatProfiler only for case study (Registry Agent is proprietary NYP work)
- **Contact:** Email (youngbin.kim@columbia.edu) and LinkedIn only

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Title: "LLM Engineer / Data Scientist (Clinical AI)" | Covers LLM engineering, data science, and clinical AI domain in one line | ✓ Phase 4 (Typed in Hero) |
| Clinical data aesthetic as design DNA | Unique to Youngbin's background, avoids generic portfolio look | ✓ Phase 1 |
| Waveform motif as unifying design thread | Cancelled (D-06) — the metaphor felt forced. Replaced with staggered "data loading" scroll reveals. | ✓ Phase 4 |
| BeatProfiler as sole case study | Only non-proprietary project with rich visuals and public site | ✓ Phase 5 |
| Dark/light mode | Adds personality (lab at night vs clinical clean) and modern UX | ✓ Phase 2 |
| Static site on GitHub Pages | Simple deployment, already configured, no backend needed | ✓ Phase 1 |
| About & Timeline design | Kept focused (4 stops) with clinical aesthetic; hobbies subtly woven into bio | ✓ Phase 3 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-31 after Phase 5 completion*
