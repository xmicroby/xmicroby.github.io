# Youngbin Kim — Personal Portfolio Website

## What This Is

A personal portfolio website for Youngbin Kim, an LLM Engineer / Data Scientist (Clinical AI) at New York-Presbyterian. The site serves as a professional portfolio to attract employers and collaborators, with a distinctive design identity that weaves in personality and hobbies. Hosted on GitHub Pages at youngbinkim.com.

## Core Value

Visitors immediately understand who Youngbin is professionally (clinical AI / LLM engineer with a Columbia PhD) and walk away remembering a site that felt distinctly personal — not a generic template.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Terminal-style hero intro with typing animation revealing professional identity
- [ ] Clinical data aesthetic as the design DNA (EHR-inspired typography, data viz motifs)
- [ ] Waveform design motif throughout the site (section dividers, hover effects, background elements) — ties cardiac signals, NLP data, and music together
- [ ] About section: professional background + personality (hobbies woven in, not separated)
- [ ] Projects section with BeatProfiler as a deep-dive case study (pipeline diagram, cardiac signal visuals, impact metrics)
- [ ] Experience timeline (NYP, Columbia PhD, Genentech internship)
- [ ] Contact section with email and LinkedIn (no Facebook)
- [ ] Hobby easter eggs: YNYC choir link (ynyc.org), biking/travel touches — discoverable, not prominent
- [ ] Dark/light mode with distinct personalities (dark = "lab at night", light = clinical/clean)
- [ ] Responsive design (mobile + desktop)
- [ ] Static site compatible with GitHub Pages hosting

### Out of Scope

- Blog/writing section — not requested, portfolio-focused for now
- Multiple project case studies — only BeatProfiler (Registry Agent is proprietary)
- CMS or dynamic backend — static site, GitHub Pages hosting
- Contact form with server-side handling — email/LinkedIn links sufficient
- OAuth or any authentication — public portfolio site

## Context

- **Existing site:** Currently at youngbinkim.com via GitHub Pages (xmicroby.github.io). Shows "under construction" with an old Berkeley-era design hidden behind `display:none`. Complete redesign, not an update.
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
| Title: "LLM Engineer / Data Scientist (Clinical AI)" | Covers LLM engineering, data science, and clinical AI domain in one line | — Pending |
| Clinical data aesthetic as design DNA | Unique to Youngbin's background, avoids generic portfolio look | — Pending |
| Waveform motif as unifying design thread | Connects cardiac signals (work), NLP data (work), and music (personal) naturally | — Pending |
| BeatProfiler as sole case study | Only non-proprietary project with rich visuals and public site | — Pending |
| Dark/light mode | Adds personality (lab at night vs clinical clean) and modern UX | — Pending |
| Static site on GitHub Pages | Simple deployment, already configured, no backend needed | — Pending |

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
*Last updated: 2025-03-29 after initialization*
