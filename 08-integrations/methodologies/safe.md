# ORDITO + SAFe

How to run ORDITO at scale on top of SAFe — without duplicating governance with PI Planning, Lean Portfolio, or System Demo.

## Premise

SAFe gives you the multi-team coordination, the PI cadence, the Lean Portfolio Management layer, and the system-of-systems view. It does not give you a machine-readable contract for artifacts, an explicit AI-services governance layer, or a structured learning loop tied to KPIs declared at intake. ORDITO fills these.

ORDITO **lives at the Solution Train and Program (ART) level**, not at the team level. At the team level, your existing Scrum or Kanban (Team Scrum / Team Kanban) keeps running.

## Where ORDITO sits in the SAFe stack

| SAFe level | ORDITO presence | What ORDITO adds |
|---|---|---|
| Portfolio | Light | Initiative Charter as the contractual artifact for an Epic at Portfolio Kanban |
| Large Solution / Solution Train | Heavy | Scale-mode playbook, Dependency Mapper, Architecture sign-off |
| Program / ART | Heavy | All ORDITO gates, AI service mesh, Learning Gate |
| Team | Light | Brief Pack ↔ Story DoR; Code Review Agent on PRs |

## Role mapping

| ORDITO role | SAFe role |
|---|---|
| Sponsor | Business Owner (BO) |
| Product Lead | Product Manager (PM) at Program level; Product Owner (PO) at Team level |
| UX Lead | UX (cross-ART) |
| Engineering Lead | System Architect / Engineering (Program); Tech Lead (Team) |
| QA / Release Lead | System Team / Release Train Engineer adjacent |
| Data Analytics | Solution Architect / Data Architect |
| Staff Engineer | Enterprise Architect / Staff (Solution Train) |
| Founder | Lean Portfolio Management (LPM) lead |

## Artifact mapping

| ORDITO artifact | SAFe equivalent | Notes |
|---|---|---|
| `initiative_charter` | Epic Hypothesis Statement / Lean Business Case | Use the ORDITO schema as the structured form of the Epic |
| `feature_request` | Feature (in PI scope) | One Feature ≈ one FRQ |
| `feature_brief_pack` | Refined Feature with ACs | DoR for the Feature at PI Planning |
| `design_spec` | UX/Solution design output | Often produced during PI Planning prep |
| `technical_design_note` | Enabler / Architectural Runway / Solution Intent | Solution Intent is the closest mapping |
| `release_checklist` | DoD extended with release engineering criteria | |
| `impact_review` | Inspect & Adapt outcome at Feature level | I&A is usually program-wide; ORDITO adds per-Feature value verification |
| `opportunity_brief` / `mvp_frame` | Lean UX Hypothesis (for Explore) | |

## Gate mapping

| ORDITO gate | SAFe equivalent |
|---|---|
| G0 — Backlog Entry | Portfolio Kanban "Approved" state for Epics; Program Backlog "Ready for PI" for Features |
| G1 — Commitment | Pre-PI Planning readiness review |
| G2 — Build-ready | End of PI Planning + Iteration 1 Architectural Runway readiness |
| Release Gate | Pre-release System Demo / Release management approval |
| Learning Gate | Post-release Inspect & Adapt for that Feature; full I&A at PI boundary |

## Ritual mapping

| ORDITO ritual | SAFe ceremony |
|---|---|
| Intake Review | Refinement (Program Backlog Refinement) |
| Prioritization Session | Pre-PI Planning Prioritization |
| G1 Review | Pre-PI Planning Readiness |
| G2 Review | PI Planning Day 1 Confidence Vote prep / Architectural Runway review |
| Sprint Sync | Scrum of Scrums |
| Release Gate | Release management ceremony / System Demo gate |
| Impact Review | Per-Feature I&A (added by ORDITO) |
| ORDITO Retrospective | PI-boundary I&A workshop, focused on framework health |

## Specific advantages of running ORDITO inside SAFe

1. **Architectural Runway becomes machine-readable**: ORDITO's TDN with Dependency Mapper output can replace narrative Solution Intent for many Features.
2. **Compliance Checker for regulated programs**: SAFe's compliance is usually tribal; `compliance-checker` produces a per-Feature audit trail aligned to declared regulations.
3. **Override log feeds I&A**: at PI boundary, the ORDITO Retrospective consumes override-rate metrics that SAFe I&A would otherwise have to gather manually.
4. **Solution Train coherence**: with multiple ARTs, the `consistency-checker` adversarial service flags drift between Charter (Solution Intent at portfolio) and per-ART implementation that PI Planning routinely misses.

## Specific costs

- **Risk of double governance**: if an organisation already runs Lean Portfolio Management seriously, ORDITO at portfolio is redundant. Limit ORDITO to ART/Program level in those cases.
- **Mode rigidity**: SAFe in regulated industries tends to be Scale-only. Document the mode in the Charter; do not force Core/Explore artifacts where Scale is the only honest option.
- **PI cadence vs. initiative cadence**: ORDITO initiatives can span multiple PIs. Solution Train views are typically PI-locked; this disjunction needs explicit calendar reconciliation.

## Adoption sequence at SAFe scale

| Phase | What to add |
|---|---|
| PI 1 | Charter for every Epic; FRQ + Brief Pack for every PI Feature; `intake-coach` only |
| PI 2 | Add G1/G2 explicit decisions at PI Planning prep; activate `brief-builder`, `solution-mapper` |
| PI 3 | Add Dependency Mapper for cross-ART Features; `compliance-checker` for regulated work |
| PI 4 | Activate `consistency-checker` at all gates; first Impact Reviews per Feature |
| PI 5+ | Full ORDITO Retrospective at PI boundary, feeding Solution Train I&A |

## When NOT to use ORDITO with SAFe

If your SAFe rollout is in its first 2 PIs, do not add ORDITO yet. SAFe by itself takes 6–12 months to bed in. Adding a second governance overlay during that window will produce theater, not learning. Wait until SAFe rituals feel routine; then add ORDITO at the points where you actually feel friction.
