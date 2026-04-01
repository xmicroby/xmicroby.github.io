# Phase 7: Agentic LLM Project - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-31
**Phase:** 07-agentic-llm-project
**Areas discussed:** Content framing, Visual components, Project naming & positioning, Repo/link strategy, Builder workflow interaction, Pipeline panel content, Cycle animation behavior, Conditional routing

---

## Content Framing

| Option | Description | Selected |
|--------|-------------|----------|
| Punchy 2–3 sentence problem statement | Minimal prose, straight into system | ✓ |
| Full paragraph on abstraction burden | $5–10M/year framing from manuscript | |
| Agent's discretion | | |

**User's choice:** Punchy framing — "flow should be about building the pipeline on the resulting pipeline itself"
**Notes:** Use cases should be generic (cancer staging, medication extraction) — NOT the exact real registries being worked on (NSQIP, SEP-1, Banff not by name)

---

## Visual Components

| Option | Description | Selected |
|--------|-------------|----------|
| New interactive workflow (cyclical DAG) | New React component parallel to PipelineDiagram | ✓ |
| Screenshot-based panels | Static images of the actual app | |
| Hybrid | Screenshots embedded in interactive wrapper | |

**User's choice:** New interactive workflow component — "new interactive workflow parallelism with BeatProfiler graph"
**Notes:** Flow: chat → generated pipeline (iterate loop) → ad hoc test at workbench (iterate loop) → review/label samples → validate → DSPy optimize (optimize loop). Builder workflow with generated pipeline inside a panel (not two separate sections).

---

## Project Naming & Positioning

| Option | Description | Selected |
|--------|-------------|----------|
| Registry Agent | Internal NYP project name | |
| ChartExtract | More catchy portfolio name | ✓ |
| Generic "Clinical NLP Platform" | Fully anonymous | |

**User's choice:** ChartExtract
**Notes:** No NYP mention, no "Built at NewYork-Presbyterian" attribution, no institutional context at all.

---

## Repo / Link Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| "Manuscript in preparation" badge | Signals real research | |
| No links, no badges | Clean showcase | ✓ |
| GitHub link when public | Deferred | |

**User's choice:** No links, no badges — clean showcase only. Add links when/if open-sourced.

---

## Builder Workflow Interaction

| Option | Description | Selected |
|--------|-------------|----------|
| Click step → expand description | Same pattern as BeatProfiler | ✓ |
| Click loop → animate/highlight cycle | | ✓ |
| Both | | ✓ |

**User's choice:** Both interactions — click step expands description, click loop highlights/animates the cycle. Auto-cycles through all three loops on load; user can click to isolate one.

---

## Pipeline Panel Content

| Option | Description | Selected |
|--------|-------------|----------|
| Builder workflow only | Simplest | |
| Two separate sections (builder + sample pipeline) | More content | |
| Builder workflow with generated pipeline as embedded panel | Best of both | ✓ |

**User's choice:** Builder workflow with generated pipeline inside a panel — "lets just do the builder workflow with the generated pipeline inside a panel"

---

## Sample Pipeline (Conditional DAG)

| Option | Description | Selected |
|--------|-------------|----------|
| Cancer staging (TNM) | Fits generic framing | ✓ |
| Medication extraction | | |

**User's choice:** Two-step conditional — Node 1: TNM/cancer type extraction → if breast cancer → Node 2: HER2/ER/PR biomarker extraction. Non-breast branch implied but not rendered.

---

## Cycle Animation Trigger

| Option | Description | Selected |
|--------|-------------|----------|
| Click to highlight, click again to reset | Manual only | |
| Auto-cycles + user can click to isolate | | ✓ |

**User's choice:** Auto-cycles through all three loops on load; clicking a loop isolates/highlights it; clicking elsewhere or the same loop returns to auto-cycle.

---

## Agent's Discretion

- Exact Framer Motion animation technique for loop highlight (keyframes, stroke pulse, color animation)
- Typography and spacing inside the workflow component
- Whether the pipeline panel is embedded inside the workflow component or as a separate card below
- Exact label/description text for each step node

## Deferred Ideas

- External links (repo, demo, manuscript) — when open-sourced/published
- Impact metrics — when there is something to report
- Real registry names (NSQIP, SEP-1, Banff) — when publishable
- "Manuscript in preparation" badge — explicitly deferred by user
