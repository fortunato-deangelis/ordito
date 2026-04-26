# ORDITO Operating Model — Roles

This document specifies the roles in ORDITO, their responsibilities per phase, and the artifacts they produce and consume.

ORDITO does not require org chart changes. Every role maps to a function that likely already exists in your team — the name may differ. What ORDITO requires is that each function is present and accountable for its phase.

---

## Role Directory

### Sponsor

**Primary responsibility**: Define the strategic intent and authorize investment.

| Phase | Responsibility |
|---|---|
| 0 — Strategic Trigger | **Owner** — produces Initiative Charter (Core/Scale) or Opportunity Brief (Explore) |
| 2 — Prioritization | Provides investment framing and budget approval |
| 7 — Release | Rollout approval for high-visibility releases |
| 8 — Learn | Value checkpoint — decides whether to reinvest, reframe, or close |

**Artifacts produced**: `initiative_charter`, `opportunity_brief`
**Artifacts consumed**: `impact_review`, `feature_request` (for investment framing)

**Notes**: In early-stage teams, Sponsor and Product Lead may be the same person (Founder). The separation of concerns (strategic intent vs. execution ownership) must still be explicit even when roles overlap.

---

### Product Lead

**Primary responsibility**: Own the flow from intake to release. The warp thread that runs through every phase.

| Phase | Responsibility |
|---|---|
| 1 — Intake | **Owner** — produces Feature Request, runs it through Intake Coach |
| 2 — Prioritization | SAS / RCS review, prioritization decision |
| 3 — Discovery | **Owner** — produces Feature Brief Pack |
| 4 — Solution Design | Scope lock — reviews Design Spec for AC alignment |
| 5 — Build | Clarifications when engineers encounter ambiguities |
| 6 — Validate | UAT sign-off |
| 7 — Release | Rollout decision (dark / beta / full) |
| 8 — Learn | **Owner** — produces Impact Review, decides next action |

**Artifacts produced**: `feature_request`, `feature_brief_pack`, `impact_review`
**Artifacts consumed**: `initiative_charter`, `opportunity_brief`, `design_spec`, `release_checklist`

**Gate roles**: G0 facilitator, G1 decision-maker (with Engineering Lead co-signature), Learning Gate decision-maker

---

### UX Lead

**Primary responsibility**: Own the user experience from research to design handoff.

| Phase | Responsibility |
|---|---|
| 3 — Discovery | Research input (interviews, usability data, persona synthesis) |
| 4 — Solution Design | **Owner** — produces Design Spec |
| 5 — Build | Design QA — verifies implementation matches Design Spec |
| 6 — Validate | Support copy, microcopy review |
| 8 — Learn | UX gap analysis from post-release feedback |

**Artifacts produced**: `design_spec`
**Artifacts consumed**: `feature_brief_pack`, `impact_review`

**Notes**: In teams without a dedicated UX Lead, this role is shared between Product Lead and Engineering Lead. The Design Spec must still exist — the owner just changes.

---

### Engineering Lead

**Primary responsibility**: Own technical feasibility, design, build, and release.

| Phase | Responsibility |
|---|---|
| 1 — Intake | Feasibility note (quick sanity check on proposed scope) |
| 2 — Prioritization | Effort band estimate |
| 3 — Discovery | Technical risk identification |
| 4 — Solution Design | **Owner** — produces Technical Design Note |
| 5 — Build | Build supervision — owns the PR merge decision |
| 6 — Validate | — |
| 7 — Release | Release approval — final sign-off before deployment |
| 8 — Learn | Technical debt actions from post-release findings |

**Artifacts produced**: `technical_design_note`
**Artifacts consumed**: `feature_brief_pack`, `design_spec`, `release_checklist`

**Gate roles**: G1 co-signature, G2 facilitator and decision-maker, Release Gate co-sign

---

### QA / Release Lead

**Primary responsibility**: Own test strategy and release quality.

| Phase | Responsibility |
|---|---|
| 2 — Prioritization | Risk classification input |
| 3 — Discovery | Test strategy seed (what's testable, what's risky) |
| 4 — Solution Design | Test plan development |
| 5 — Build | Automation checks — verifies test coverage |
| 6 — Validate | **Owner** — produces Release Checklist, drives release verification |
| 8 — Learn | Defect review — identifies systematic quality patterns |

**Artifacts produced**: `release_checklist`
**Artifacts consumed**: `feature_brief_pack`, `technical_design_note`

**Gate roles**: Release Gate facilitator

---

### Data Analytics

**Primary responsibility**: Own measurement, KPI tracking, and post-release learning data.

| Phase | Responsibility |
|---|---|
| 3 — Discovery | Baseline data for KPIs, usage pattern analysis |
| 4 — Solution Design | Tracking plan review — verifies events are instrumented |
| 6 — Validate | Telemetry verification — events are firing correctly |
| 8 — Learn | Data analysis for Impact Review, anomaly detection |

**Artifacts produced**: `tracking_plan` (within Feature Brief Pack)
**Artifacts consumed**: `feature_brief_pack`, `impact_review`

**Notes**: In small teams, this role may be combined with Engineering Lead or Product Lead. The tracking plan must still exist and be reviewed before release.

---

### Staff Engineer

**Primary responsibility**: Cross-cutting technical leadership for Scale mode initiatives.

| Phase | Responsibility |
|---|---|
| 3 — Discovery | Architecture risk flag (early assessment of systemic impact) |
| 4 — Solution Design | TDN review for cross-system coherence |
| 4b — Architecture Sign-off (Scale only) | **Required sign-off** — gate blocker in Scale mode |
| 5 — Build | Cross-team coordination for dependency resolution |
| 7 — Release | Rollback readiness verification for Scale releases |
| 8 — Learn | Architecture retrospective — long-term technical decisions |

**Artifacts produced**: Architecture sign-off (within TDN)
**Artifacts consumed**: `technical_design_note`, `feature_brief_pack`

**Notes**: Staff Engineer is only mandatory in Scale mode. In Core and Explore, Engineering Lead may cover this role for non-systemic initiatives.

---

### Founder

**Primary responsibility**: Strategic direction and kill decision authority for Explore mode.

| Phase | Responsibility |
|---|---|
| 0 — Strategic Trigger | **Owner** — produces Opportunity Brief + kill criteria (Explore mode) |
| 2 — Prioritization | Kill threshold sign-off |
| 7 — Release | Narrow rollout approval (Explore mode) |
| 8 — Learn | Pivot / persist / kill decision (Explore mode) |

**Artifacts produced**: `opportunity_brief`, `mvp_decision_review`
**Artifacts consumed**: `mvp_frame`, `impact_review`

**Notes**: In established product teams, Founder maps to VP Product or CPO for Explore initiatives. The key attribute of this role is authority to kill — without it, the kill criteria are decoration.

---

## RACI by Phase

| Phase | Sponsor | Product Lead | UX Lead | Eng Lead | QA/Release | Data | Staff Eng | Founder |
|---|---|---|---|---|---|---|---|---|
| 0 Strategic Trigger | **R** | I | — | I | — | — | — | **R** (Explore) |
| 1 Intake | I | **R** | — | C | — | — | — | — |
| 2 Prioritization | C | **R** | — | C | C | C | — | C (Explore) |
| 3 Discovery | I | **R** | C | C | C | C | C (Scale) | — |
| 4 Solution Design | — | C | **R** (Design) | **R** (TDN) | C | C | C (Scale) | — |
| 4b Arch Sign-off (Scale) | — | — | — | C | — | — | **R** | — |
| 5 Build | — | C | C | **R** | C | — | C (Scale) | — |
| 6 Validate | — | C | C | C | **R** | C | — | — |
| 7 Release | C | **R** | — | C | C | — | C (Scale) | C (Explore) |
| 8 Learn | **R** | **R** | C | C | C | **R** | C (Scale) | **R** (Explore) |

**R** = Responsible (produces), **C** = Consulted, **I** = Informed

---

## Notes on role scaling

**Small teams (3–5 people)**: Sponsor = Founder = Product Lead is common. Engineering Lead often covers Staff Engineer and QA/Release. The roles still exist — accountability is just concentrated. Document who is covering which role in the Initiative Charter.

**Large teams (20+)**: Multiple Product Leads may exist. Add a `sub_initiative_owner` field to artifacts if needed. The gate facilitation roles must remain single-threaded — two facilitators at G2 produce ambiguity, not coverage.
