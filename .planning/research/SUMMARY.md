# Project Research Summary

**Project:** Youngbin Kim — Personal Portfolio Website
**Domain:** Personal Portfolio Website (Clinical AI / LLM Engineer)
**Researched:** 2026-03-29
**Confidence:** HIGH

## Executive Summary

This project is a high-performance, specialized personal portfolio website for a Clinical AI / LLM Engineer. Experts in this domain build highly performant, statically generated sites that prioritize content and accessibility while using specialized interactive elements (like terminal animations and clinical data motifs) to stand out. The goal is to immediately communicate deep technical competence and a specific professional identity without the bloat of generic web templates or heavy Single Page Applications (SPAs).

The recommended approach is a Static Site Generation (SSG) architecture utilizing Astro as the core framework. Astro's "Islands Architecture" perfectly suits this use case, allowing the bulk of the site to ship as zero-JavaScript HTML/CSS for maximum speed, while enabling targeted React components (via Framer Motion or Canvas) for complex interactive features like the terminal hero and waveform motifs. Styling will be driven by Tailwind CSS with a robust CSS-variable system to handle the "Clinical Clean" (light) and "Lab at Night" (dark) themes.

The key risks revolve around performance and accessibility. The desired "clinical data" and "terminal" aesthetics can easily become illegible if contrast and typography aren't carefully managed. Furthermore, the interactive waveform animations run a high risk of consuming excessive CPU/GPU resources if not optimized (e.g., using `IntersectionObserver` or Canvas over heavy SVGs). Mitigating these requires strict adherence to WCAG AA standards and performance profiling during the animation implementation phases.

## Key Findings

### Recommended Stack

Astro serves as the ideal foundation, prioritizing static content delivery while accommodating complex interactive widgets. React is used strictly within Astro Islands for rich animations, styled by Tailwind CSS.

**Core technologies:**
- **Astro (5.x):** Static Site Generator — Zero-JS by default, blazing fast, native GitHub Pages support.
- **React (19.x):** UI Component Library — Used exclusively for interactive islands (terminal intro, visualizations).
- **Tailwind CSS (4.x):** Styling — Rapid UI development and built-in theming capabilities.
- **Framer Motion / GSAP:** Animations — Declarative and scroll-driven interactions.
- **Canvas API / d3-shape:** Visualizations — High-performance generative waveforms and clinical motifs.

### Expected Features

**Must have (table stakes):**
- Clear Value Proposition — Prominent "LLM Engineer (Clinical AI)" identity.
- Responsive Design — Flawless scaling across mobile and desktop.
- Experience Timeline — Clear career progression (NYP, Columbia, Genentech).
- Contact Links & Fast Load Times — Direct email/socials and highly optimized assets.

**Should have (competitive differentiators):**
- Terminal-Style Hero Intro — Establishes technical "builder" identity.
- Clinical Data Aesthetic & Typography — EHR-inspired fonts and data tables.
- Interactive Waveform Motifs — Connects biomedical background with UI.
- Deep-Dive Case Study (BeatProfiler) — Demonstrates end-to-end product impact.

**Defer (v2+):**
- Dynamic Thematic Dark/Light Mode toggle (Focus on a strong default theme first).
- Complex Animated Waveforms (Start with static SVGs, upgrade later).
- Hobby Easter Eggs (YNYC choir, biking).

### Architecture Approach

The architecture relies on a static core with isolated islands of interactivity, separating content management from component logic.

**Major components:**
1. **App Shell / Theming Engine** — Manages global layout, routing, and prevents theme FOUC via inline head scripts.
2. **Hero & specialized UI (Terminal, Waveforms)** — React islands managing typing sequences and canvas/SVG renderings.
3. **Content Layer (Experience, Case Study)** — Markdown/JSON data collections fed into static Astro pages at build time.

### Critical Pitfalls

1. **Waveform Animation Performance Destruction** — Avoid animating complex SVG paths constantly. Use Canvas for heavy visuals, and always pause with `IntersectionObserver` when off-screen.
2. **Dark/Light Mode FOUC** — Avoid flashing white screens by injecting a blocking `<script>` in the `<head>` to resolve themes before body render.
3. **Terminal/EHR Aesthetic Accessibility Failures** — Avoid illegible monospace body text and low-contrast colors. Restrict monospace to accents and ensure WCAG AA contrast.
4. **Mobile Layout Breakage on "Dense" UI** — Avoid forcing wide clinical dashboards on mobile; serialize data vertically.
5. **Broken Typing Animation SEO** — Do not hide hero text from screen readers; use progressive visual reveals instead of empty DOM injections.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Architecture
**Rationale:** Establishes the core static site, content structure, and deployment pipeline before adding complexity.
**Delivers:** Astro setup, global CSS variables, base responsive layout, GitHub Pages CI/CD.
**Addresses:** Fast Load Times, Responsive Design Base.
**Avoids:** Choosing a heavy SPA framework for a simple static site.

### Phase 2: Core Content & Typography (MVP)
**Rationale:** Prioritizes table-stakes features and readable content. A portfolio must communicate value before it dazzles.
**Delivers:** Clear Value Proposition, Experience Timeline, BeatProfiler Case Study, Clinical Data Typography system.
**Uses:** Astro Content Collections, Tailwind CSS.
**Avoids:** Terminal/EHR Aesthetic Accessibility Failures, Mobile Layout Breakage.

### Phase 3: Specialized Interactivity & Theming
**Rationale:** Layers on the differentiators once the content is solidly in place and accessible.
**Delivers:** Terminal-style Hero Intro, Static Waveform motifs, Dark/Light mode toggle.
**Uses:** React (Islands), Framer Motion, next-themes (or vanilla inline script).
**Avoids:** Dark/Light Mode FOUC, Broken Typing Animation SEO.

### Phase 4: Advanced Visuals & Polish (v2)
**Rationale:** Heavy animations and easter eggs are the highest risk for performance degradation, best tackled last.
**Delivers:** Interactive/Animated Waveform Motifs, Hobby Easter Eggs, scroll-driven animations.
**Uses:** Canvas API, GSAP, WebGL.
**Avoids:** Waveform Animation Performance Destruction, Intrusive Easter Eggs.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4:** Complex interactive waveforms might need specialized research into Canvas vs SVG performance profiling specifically for the chosen design.

Phases with standard patterns (skip research-phase):
- **Phase 1 & 2:** Standard Astro SSG and Tailwind implementation. Established patterns.
- **Phase 3:** Dark mode FOUC prevention and Framer Motion typing effects are well-documented.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro is the objective industry standard for this exact use case. |
| Features | HIGH | Clear alignment between domain expectations and differentiators. |
| Architecture | HIGH | Component islands pattern perfectly matches the feature requirements. |
| Pitfalls | HIGH | Identified risks are common, well-documented web development hurdles. |

**Overall confidence:** HIGH

### Gaps to Address

- **Content Format:** Exact dataset/format for the BeatProfiler case study (needs to be gathered before Phase 2).
- **Waveform Complexity:** The exact mathematical or visual nature of the waveforms isn't fully defined. May require a design spike in Phase 3/4.

## Sources

### Primary (HIGH confidence)
- Astro Documentation (docs.astro.build) — Core architecture, SSG, and Islands pattern.
- GitHub Pages Deployment Best Practices — CI/CD and static hosting constraints.
- Framer Motion & GSAP Docs — Animation standards.

### Secondary (MEDIUM confidence)
- Web Vitals & Performance (CLS, FCP) — Guidelines for avoiding animation jank.
- WCAG Accessibility Guidelines — Contrast and motion standards.

---
*Research completed: 2026-03-29*
*Ready for roadmap: yes*