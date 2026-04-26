# ORDITO Operating Model — Rituals

Rituals are recurring ceremonies that maintain the warp tension over time. Without rituals, the framework exists only in documents — rituals are where it becomes practice.

This document specifies the ceremonies: cadence, participants, inputs, outputs, typical duration, and AI services involved. Rituals are distinguished by mode where they differ.

---

## Ritual Directory

### Intake Review

**Purpose**: Evaluate new Feature Requests and Initiative Charters before they enter the backlog.

| Attribute | Value |
|---|---|
| **Cadence** | Weekly (or bi-weekly for smaller teams) |
| **Duration** | 45–60 minutes |
| **Facilitator** | Product Lead |
| **Participants** | Product Lead, Engineering Lead, optionally Sponsor for high-stakes items |
| **Inputs** | FRQs with Intake Coach scores ≥6.0, Initiative Charters awaiting G0 |
| **Outputs** | G0 decisions (GO / PARKING LOT / REJECTED), updated `status` on each artifact |
| **AI services** | Intake Coach (pre-ritual, not during) |
| **Modes** | Core, Scale (required); Explore (optional, may be replaced by async) |

**Agenda template**:
1. Review FRQ scores from Intake Coach — 15 min
2. Discuss flagged weak fields — 15 min
3. G0 decisions per item — 15 min
4. Update artifact statuses — 5 min

---

### Prioritization Session

**Purpose**: Rank backlog items using SAS/RCS data and allocate to upcoming discovery cycles.

| Attribute | Value |
|---|---|
| **Cadence** | Bi-weekly or monthly (aligns with planning cadence) |
| **Duration** | 60–90 minutes |
| **Facilitator** | Product Lead |
| **Participants** | Product Lead, Engineering Lead, Sponsor (for investment decisions), Data Analytics |
| **Inputs** | FRQs at `ready_for_prioritization`, Prioritization Copilot output (SAS/RCS), current roadmap |
| **Outputs** | Prioritized backlog, effort bands confirmed, discovery assignments |
| **AI services** | Prioritization Copilot (pre-ritual) |
| **Modes** | Core, Scale (required); Explore (lightweight, 30-min async) |

**Agenda template**:
1. Review Prioritization Copilot outputs per item — 20 min
2. Challenge SAS/RCS scores where needed — 15 min
3. Rank and assign to discovery — 20 min
4. Overlap / dependency review — 15 min

---

### Gate G1 — Commitment Review

**Purpose**: Decide whether the Feature Brief Pack is complete and the team is ready to invest in Solution Design.

| Attribute | Value |
|---|---|
| **Cadence** | Per initiative (triggered when Brief Pack is `ready_for_g1`) |
| **Duration** | 30–60 minutes |
| **Facilitator** | Product Lead |
| **Participants** | Product Lead, Engineering Lead, UX Lead (if Design Spec is in scope), QA/Release Lead |
| **Inputs** | Feature Brief Pack, Brief Builder output, Research Synthesizer output |
| **Outputs** | G1 decision: GO / GO REDUCED / HOLD / NO-GO; updated artifact status |
| **AI services** | Brief Builder and Research Synthesizer (pre-ritual) |
| **Modes** | Core, Scale (required); Explore (lightweight, may be async) |

---

### Gate G2 — Build-ready Review

**Purpose**: Verify that Design Spec and TDN are complete and the team is ready to build.

| Attribute | Value |
|---|---|
| **Cadence** | Per initiative (triggered when Design Spec + TDN are `ready_for_g2`) |
| **Duration** | 45–60 minutes |
| **Facilitator** | Engineering Lead |
| **Participants** | Engineering Lead, Product Lead, QA/Release Lead; Staff Engineer (Scale mode, required) |
| **Inputs** | Design Spec, Technical Design Note, dependency matrix (Scale), Design Critic + Solution Mapper outputs |
| **Outputs** | G2 decision: READY / NOT READY / HOTFIX OVERRIDE; conditions documented |
| **AI services** | Design Critic, Solution Mapper, Dependency Mapper (Scale) — pre-ritual |
| **Modes** | Core, Scale (required); Explore (optional for narrow scope) |

---

### Sprint Sync / Build Check-in

**Purpose**: Verify build progress, unblock dependencies, surface AC traceability issues.

| Attribute | Value |
|---|---|
| **Cadence** | Weekly during Build phase |
| **Duration** | 30 minutes |
| **Facilitator** | Engineering Lead |
| **Participants** | Engineering Lead, Product Lead, QA/Release Lead |
| **Inputs** | Code Review Agent flags from current PRs, open dependency items |
| **Outputs** | Unblocked items, AC traceability issues resolved, dependency escalations |
| **AI services** | Code Review Agent (async, flags reviewed in meeting) |
| **Modes** | Core, Scale (required); Explore (optional) |

---

### Release Gate

**Purpose**: Final verification before deployment.

| Attribute | Value |
|---|---|
| **Cadence** | Per release (triggered when Release Checklist is complete) |
| **Duration** | 20–30 minutes |
| **Facilitator** | QA / Release Lead |
| **Participants** | QA/Release Lead, Engineering Lead, Product Lead |
| **Inputs** | Release Checklist, Release Verifier output |
| **Outputs** | RELEASE or BLOCKER decision; rollout tier (dark/beta/full) confirmed |
| **AI services** | Release Verifier, Test Case Generator (pre-ritual) |
| **Modes** | All modes (required) |

---

### Impact Review — Learning Ritual

**Purpose**: Close the learning loop. Verify value delivered and produce next actions.

| Attribute | Value |
|---|---|
| **Cadence** | 30 days post-release (mandatory); 7 and 14 days optionally |
| **Duration** | 45–60 minutes |
| **Facilitator** | Product Lead |
| **Participants** | Product Lead, Data Analytics, Sponsor (for value checkpoint), Engineering Lead |
| **Inputs** | Impact Review draft (produced by Dashboard Narrator), KPI data, defect summary |
| **Outputs** | Impact Review finalized, Learning Gate decision, next actions documented |
| **AI services** | Dashboard Narrator (pre-ritual) |
| **Modes** | All modes (required); Explore has optional Pivot/Kill/Persist decision |

---

### ORDITO Retrospective

**Purpose**: Evaluate the health of the framework itself. Different from a sprint retrospective — focuses on artifact quality, gate effectiveness, AI service signal.

| Attribute | Value |
|---|---|
| **Cadence** | Quarterly |
| **Duration** | 60–90 minutes |
| **Facilitator** | Product Lead or Lead Maintainer |
| **Participants** | All roles present in the team |
| **Inputs** | Override rate metrics, artifact conformance rate, learning loop completion rate, AI service override rates per service |
| **Outputs** | Framework adjustments, prompt tuning decisions, process changes, updated CHANGELOG |
| **AI services** | None — the framework itself is the subject |
| **Modes** | All modes (required quarterly) |

**Agenda template**:
1. Review metrics dashboard — 20 min (see `01-framework/principles.md` Metrics section)
2. Identify top 2–3 pain points — 15 min
3. Root cause analysis per pain point — 20 min
4. Decide on process changes or RFC submissions — 15 min
5. Update CHANGELOG — 10 min

**Escalation trigger**: If G2 override rate is >15%, this retrospective is mandatory and must produce at least one structural change before the next quarter.

---

## Rituals by mode

| Ritual | Core | Explore | Scale |
|---|---|---|---|
| Intake Review | Required | Optional (async) | Required |
| Prioritization Session | Required | Lightweight | Required |
| Gate G1 | Required | Lightweight | Required |
| Gate G2 | Required | Optional (narrow scope) | Required |
| Sprint Sync | Required | Optional | Required |
| Release Gate | Required | Required | Required |
| Impact Review | Required | Required (Pivot/Kill/Persist) | Required |
| ORDITO Retrospective | Quarterly | Quarterly | Quarterly |
