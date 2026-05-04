# ORDITO Framework — Principles, Gates, Metrics, Override Policy

This document expands the 10 Manifesto principles into operational rules. For each principle: definition, measurable conformance criteria, and associated antipattern.

---

## The Ten Principles — Operational Expansion

### Principle 1 — Decisions are human, the warp is shared

**Operational rule**: Every artifact that closes a gate must have a named human owner in `owner_role`. Every AI service output that influences a decision must be traceable in `ai_services_used`.

**Conformance criteria**:
- All gate decisions (`gate_decision` blocks) have `decided_by` with at least one named role
- No artifact reaches `approved` status without a human reviewer in `ai_services_used[].human_reviewer`

**Antipattern**: "The AI recommended it" as the sole rationale in `decision_log`. AI output is evidence, not decision.

---

### Principle 2 — Nothing passes as free text

**Operational rule**: Handoffs between phases happen via artifacts conforming to `artifact.schema.json`. Slack messages, email threads, and verbal agreements do not qualify as handoffs.

**Conformance criteria**:
- Every phase transition is accompanied by an artifact with `artifact_id`, `status`, `owner_role`, and `objective`
- `status` must be at the required gate value before the next phase starts (e.g., `ready_for_g1` before entering G1)

**Antipattern**: "We discussed it in the standup" as the record of a scope decision. If it's not in an artifact, it didn't happen.

---

### Principle 3 — Override is a right, but it's tracked

**Operational rule**: Any AI service output that is ignored or contradicted must produce an entry in `decision_log` with `rationale`, `owner`, and `ai_service_overridden`.

**Conformance criteria**:
- Override entries in `decision_log` include `ai_service_overridden` when the decision contradicts AI output
- The override rate per service is tracked quarterly (see Metrics section below)

**Antipattern**: Silently ignoring AI output without logging. Untracked overrides are invisible to the system — the most valuable tuning signal is lost.

---

### Principle 4 — Gates are not bureaucracy, they are warp tension

**Operational rule**: Each gate produces a decision with one of the defined outcomes. The decision is logged in the artifact. "We skipped it because we were in a hurry" is an override — and must be logged as one.

**Gate specification**: see the Gates section below.

**Antipattern**: Gates that exist on paper but are never attended or never produce a documented outcome. A gate that always says GO is not functioning as a gate.

---

### Principle 5 — Three modes, not one size fits all

**Operational rule**: The mode (Core, Explore, Scale, Hotfix) is declared at phase 0 in the Initiative Charter or Opportunity Brief. Changing mode mid-initiative requires explicit documentation and escalation.

**Conformance criteria**:
- Initiative Charter includes `mode` field (Core / Explore / Scale)
- Gate requirements vary by mode (see playbooks in `05-playbooks/`)

**Antipattern**: Starting in Explore mode and gradually adding Core-level documentation without acknowledging the mode shift. The team ends up with Core overhead and Explore expectations.

---

### Principle 6 — The learning loop is non-negotiable

**Operational rule**: Every initiative that reaches Release must produce an Impact Review at 30 days minimum. Impact Reviews cannot be skipped, only deferred (and deferral must be logged).

**Conformance criteria**:
- Every artifact of type `release_checklist` with status `final` must have a downstream `impact_review` artifact within 60 days
- Impact Review must have KPI results for all KPIs declared in the Initiative Charter

**Antipattern**: "The feature shipped and it worked, so we don't need a review." The learning loop value is in surfacing what didn't work as expected — which is always present.

---

### Principle 7 — AI structures judgment, it does not replace it

**Operational rule**: AI services operate in two distinct modes — *substitution* (toil removal: brief structuring, test derivation, synthesis) and *augmentation* (judgment-structuring: critique, trade-off exposure, inconsistency flagging). Both modes are tracked in `ai_services_used`. Decisions are always human; AI output is evidence, never authority.

**Conformance criteria**:
- `ai_services_used[].service_name` must be a canonical name from the registry
- Service invocation must correspond to the service's `invocation_phase`
- For services in *augmentation* mode (`autonomy_tier: HITL`), every output that influences a gate decision must have a `human_reviewer` and a `decision_log` entry with rationale

**Antipattern 1**: Using an LLM ad hoc for scope decisions or architectural trade-offs without logging. This makes the AI's influence invisible — exactly where it is most dangerous.

**Antipattern 2**: Treating "human reviewed" as a checkbox. If the reviewer had no time, no context, or no authority to dissent, the review is theater. The override metric exists to surface this.

---

### Principle 8 — Artifact contracts are machine-readable

**Operational rule**: All artifacts must conform to `schemas/artifact.schema.json`. CI validation must run on every PR that touches `03-artifacts/` or `schemas/`. Non-conforming artifacts block merge.

**Conformance criteria**:
- CI passes `ajv validate` on all JSON examples in `03-artifacts/examples/json/`
- Markdown lint passes without errors

**Antipattern**: YAML artifacts embedded in Markdown files (never validated by CI). The schema is the contract — if it's not validated, it's not a contract.

---

### Principle 9 — Privacy and governance are part of the design

**Operational rule**: Every AI service in the registry must declare `retention_policy`, `output_visibility`, and `pii_risk`. Before invoking a service with PII-containing data, the human owner must verify these fields.

**Conformance criteria**:
- All services in `04-ai-service-mesh/registry.json` have non-null `retention_policy`, `output_visibility`, `pii_risk`
- Services with `pii_risk: high` require explicit `human_reviewer` in `ai_services_used`

**Antipattern**: Sending full user interview transcripts to an AI service with session-only retention without verifying this is compliant with the organization's data policy.

---

### Principle 10 — The framework evolves in the same form it proposes

**Operational rule**: Changes to the framework (manifesto, schema, playbooks) go through RFCs using `.github/ISSUE_TEMPLATE/rfc_proposal.md`. The RFC is the artifact. Community review is the gate.

**Conformance criteria**:
- Breaking schema changes require a versioned RFC
- CHANGELOG is updated with every merged RFC

**Antipattern**: Evolving the framework by direct push to main without RFC. Consistency between how the framework works and how it evolves is itself a principle.

---

## Gates

### G0 — Backlog Entry

**Purpose**: Decide whether an initiative enters the active backlog.
**Facilitated by**: Product Lead
**Required artifacts**: Initiative Charter (Core/Scale) or Opportunity Brief + kill criteria (Explore)
**Possible outcomes**:
- **GO** — enters backlog, Discovery starts
- **PARKING LOT** — deferred, reason documented
- **REJECTED** — not aligned, reason documented

**Minimum documentation**: `decision_log` entry with outcome, rationale, and owner.

---

### G1 — Commitment

**Purpose**: Verify the team is ready to invest in Solution Design.
**Facilitated by**: Product Lead with Engineering Lead co-signature
**Required artifacts (Core/Scale)**: Feature Brief Pack with full ACs, dependency flags, risk band
**Required artifacts (Explore)**: MVP Frame with hypothesis and minimum ACs
**Possible outcomes**:
- **GO** — full scope approved
- **GO REDUCED** — scope trimmed, conditions documented
- **HOLD** — back to Discovery with specific gaps noted
- **NO-GO** — archived, reason documented

---

### G2 — Build-ready

**Purpose**: Verify the technical design is complete and the team is ready to build.
**Facilitated by**: Engineering Lead
**Required artifacts**: Design Spec + Technical Design Note (Core/Scale); Design Spec only (Explore)
**Scale-only requirement**: Architecture sign-off from Staff Engineer
**Possible outcomes**:
- **READY** — build starts
- **NOT READY** — back to Solution Design with specific gaps
- **HOTFIX OVERRIDE** — build starts immediately, recovery documentation required within 48h

---

### Release Gate

**Purpose**: Verify the release is safe to proceed.
**Facilitated by**: QA / Release Lead
**Required artifacts**: Release Checklist with all ACs verified
**Possible outcomes**:
- **RELEASE** — proceeds (may be delegated to Release Verifier AI service)
- **BLOCKER** — back to Build for resolution

---

### Learning Gate

**Purpose**: Evaluate value delivered and close (or relaunch) the initiative.
**Facilitated by**: Product Lead
**Required artifacts**: Impact Review at 30+ days
**Possible outcomes**:
- **VALUE CONFIRMED** — initiative closed
- **PIVOT NEEDED** — new Charter created, initiative relaunched
- **KILL** — feature sunsetted, documented

---

## Metrics

Track these metrics to assess framework health:

| Metric | Formula | Green | Yellow | Red |
|---|---|---|---|---|
| G2 override rate | `hotfix_releases / total_releases` (13-week rolling) | <5% | 5–10% | >15% |
| Avg time Discovery→G1 | Days from phase 3 start to G1 decision | <10 days | 10–20 days | >20 days |
| Artifact conformance rate | `valid_artifacts / total_artifacts` | >95% | 85–95% | <85% |
| Learning loop completion rate | `impact_reviews / releases` (within 60 days) | >90% | 70–90% | <70% |
| AI override rate per service | `overrides_per_service / service_invocations` (quarterly) | <20% | 20–40% | >40% |

A high AI override rate for a specific service is a prompt tuning signal, not a team discipline problem.

---

## Override Policy

G2 overrides (Hotfix mode) are allowed under the following conditions:

**Activation conditions** (all three required):
1. Active or imminent P0/P1 production incident
2. Normal G2 timeline exceeds incident SLA
3. Engineering Lead or above explicitly authorizes

**Required documentation within 48h**:
- Hotfix TDN (abbreviated Technical Design Note)
- `decision_log` entry with `rationale`, `owner`, and incident reference
- Root cause update in the Incident Report

**Escalation threshold**: >15% G2 override rate triggers a mandatory framework retrospective. The retrospective must produce at least one structural change (gate streamlining, documentation reduction, or process fix) before the metric resets.

See `06-workflows/swimlane-hotfix.md` for the full Hotfix swimlane.
