# Feature Landscape

**Domain:** Personal Portfolio Website (Clinical AI / LLM Engineer)
**Researched:** 2026-03-29

## Table Stakes

Features users and recruiters expect from a modern AI/Software Engineer portfolio. Missing these means the product feels incomplete or broken.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Clear Value Proposition** | Recruiters spend <10 seconds on a site. They need to know immediately what you do. | Low | "LLM Engineer / Data Scientist (Clinical AI)" prominently displayed. |
| **Responsive Design** | 50%+ of traffic might be mobile or varying screen sizes. | Medium | Must work flawlessly on phones, tablets, and desktop displays. |
| **Experience Timeline** | Hiring managers look for pedigree and career progression. | Low | NYP, Columbia PhD, Genentech. Needs clear dates and high-level impact. |
| **Contact Links** | The ultimate goal is to get hired or contacted. | Low | Email (youngbin.kim@columbia.edu), LinkedIn, and GitHub links. |
| **Fast Load Times** | Developers judge other developers on site performance. | Low | Static site on GitHub Pages natively supports this, but assets (images) must be optimized. |
| **Accessibility (a11y)** | Standard professional practice; good contrast, semantic HTML. | Medium | Especially important given the "clinical" and "dark mode" aesthetics. |

## Differentiators

Features that set the product apart. Not strictly expected, but highly valued for creating a memorable, distinctive personal brand.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Terminal-Style Hero Intro** | Immediately establishes technical competence and "hacker/builder" identity. | Medium | Typing animations, mock CLI commands revealing background. |
| **Clinical Data Aesthetic & Typography** | Uniquely ties to the "Clinical AI" specialization. Avoids generic templates. | High | Requires custom CSS/Tailwind theming (EHR-inspired fonts, monospace data tables, monitor-like glows). |
| **Interactive Waveform Motifs** | Connects biomedical engineering (cardiac), NLP (data), and personal hobbies (music/choir). | High | CSS/SVG or lightweight Canvas animations (e.g., sine waves, ECG pulses) reacting to scroll/hover. |
| **Deep-Dive Case Study (BeatProfiler)** | Proves depth over breadth. Shows end-to-end product thinking rather than just listing repos. | Medium | Include pipeline diagrams, impact metrics (521 downloads, Harvard/MIT adoption), visual waveforms. |
| **Hobby Easter Eggs** | Adds personality without compromising professionalism. | Medium | Konami code, clickable hidden terminal commands, or subtle visual nods to biking/choir (ynyc.org). |
| **Thematic Dark/Light Mode** | Enhances UX while telling a story ("Lab at night" vs. "Clinical clean"). | Medium | Requires a robust CSS variable system and a toggle switch that fits the theme. |

## Anti-Features

Features to explicitly NOT build to maintain focus, performance, and the desired aesthetic.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Generic Bootstrap/Tailwind Templates** | Dilutes the personal brand and fails to communicate the distinctive "Clinical AI" aesthetic. | Custom design system using utility classes but with highly opinionated styling. |
| **Heavy WebGL/3D Backgrounds** | Tanks performance, distracts from content, and doesn't fit the data-dense clinical theme. | Lightweight SVG/CSS animations (waveforms) that are performant and thematic. |
| **Server-Side Contact Forms** | Unnecessary complexity for a static GitHub Pages site; attracts spam. | Direct `mailto:` links and social profile links. |
| **Blog / Writing Section** | Out of scope; creates a maintenance burden and looks bad if left empty/outdated. | Focus entirely on the single high-impact case study (BeatProfiler) and timeline. |
| **Extensive Project Grids** | Too many minor projects dilute the impact of major ones (BeatProfiler). Proprietary NYP work can't be shown anyway. | One dedicated, rich case study section. Keep the rest in the experience timeline. |
| **"Skill Progress Bars" (e.g., Python 90%)** | Seen as junior/amateurish by senior engineering managers. | Demonstrate skills implicitly through the BeatProfiler case study and PhD publications. |

## Feature Dependencies

```text
Terminal-Style Hero Intro → Responsive Design (Must scale typing effect on mobile)
Thematic Dark/Light Mode → Clinical Data Aesthetic (Needs defined color palettes for both modes)
Deep-Dive Case Study → Responsive Design (Pipeline diagrams must be readable on mobile)
Waveform Motifs → Thematic Dark/Light Mode (SVG colors must adapt to the active theme)
```

## MVP Recommendation

**Prioritize (Phase 1):**
1. Clear Value Proposition & Terminal-Style Hero (Static text fallback for accessibility)
2. Experience Timeline & Contact Links
3. Responsive Layout Base (Light mode only, or single combined mode)
4. Deep-Dive Case Study content (BeatProfiler text & images)

**Defer (Phase 2+):** 
- Thematic Dark/Light Mode toggle (Focus on one strong default theme first)
- Advanced Interactive Waveform Motifs (Start with static SVG dividers, upgrade to animated later)
- Hobby Easter Eggs (Add once the core professional content is polished)

## Sources

- `.planning/PROJECT.md` (Internal Requirements & Context)
- Modern Developer Portfolio Best Practices (e.g., preference against skill bars, focus on depth over breadth).