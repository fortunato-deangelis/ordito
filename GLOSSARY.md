# ORDITO Glossary

Definitions of key terms used across the ORDITO framework. When in doubt about how a term is used in this repository, this is the authoritative reference.

---

## Core metaphor terms

### Warp

The stable, longitudinal threads in a loom held under tension. In ORDITO: **principles, gates, contractual artifacts, roles, and metrics** — the structure that stays constant while work passes through it. The warp is what you tune when something goes wrong.

### Weft

The moving thread on the shuttle that passes through the warp to create fabric. In ORDITO: **initiatives, features, and daily decisions** — the variable work that passes through the structure.

### Shuttle

The tool that carries the weft through the warp. In ORDITO: **AI services** — they accelerate the passage of work through the structure, but they don't define the pattern.

---

## Framework terms

### Artifact

A structured document (Initiative Charter, Feature Brief Pack, Design Spec, etc.) that conforms to `schemas/artifact.schema.json`. Artifacts are the formal handoff units between phases. Slack messages, emails, and verbal agreements are not artifacts.

### Artifact contract

The JSON Schema definition that specifies the minimum required fields for an artifact type. "Machine-readable" means the contract can be validated by CI without human intervention.

### Gate

A decision checkpoint between phases. Gates verify that the warp is still tense before the next pass. Gates have defined outcomes, required artifacts, and named decision-makers. There are five gates in ORDITO: G0, G1, G2, Release, and Learning.

**G0**: Backlog entry decision — does this initiative enter the active backlog?
**G1**: Commitment decision — is the team ready to invest in Solution Design?
**G2**: Build-ready decision — is the technical design complete and the team ready to build?
**Release**: Release safety decision — is the release safe to proceed?
**Learning**: Value decision — did the initiative deliver its expected value?

### Override

When a human owner decides to ignore or contradict an AI service output. Overrides are a right, not an exception. They must be logged in `decision_log` with `rationale`, `owner`, and `ai_service_overridden`. Patterns in overrides are the framework's tuning signal.

### Override policy

The set of rules governing when G2 can be bypassed (Hotfix mode), what documentation is required, and what escalation thresholds trigger a framework retrospective. Defined in `01-framework/principles.md`.

---

## Mode terms

### ORDITO Core

The standard operating mode for existing products with stable teams. Full gates, complete artifacts, all AI services available. Use when: the product is live, the team is stable, the initiative is a new feature or evolution.

### ORDITO Explore

The operating mode for new MVPs with uncertain markets. Lighter gates, MVP Frame instead of full Brief Pack, explicit kill criteria from phase 0. Use when: you are testing a new market hypothesis or building a first version of a capability.

### ORDITO Scale

The operating mode for complex legacy systems, multi-team coordination, and compliance requirements. Additional mandatory artifacts (dependency matrix, architecture sign-off, compliance assessment), staged rollout always. Use when: the initiative touches multiple teams, legacy systems, or regulated data.

### ORDITO Hotfix

The exception mode for authorized G2 overrides during P0/P1 production incidents. Not a separate workflow — a tracked exception to Core. Recovery documentation required within 48h.

### Kill criteria

Explicit, measurable thresholds defined at phase 0 in Explore mode that, if triggered, require the initiative to be killed rather than extended. A kill decision is a success — it freed resources before a larger investment was made.

---

## AI service mesh terms

### AI service mesh

The collection of 12 named AI services in ORDITO, each assigned to a specific phase with defined inputs, outputs, retention policies, and visibility. Defined in `04-ai-service-mesh/registry.json`.

### Service name (canonical)

The hyphenated lowercase identifier for an AI service, as defined in `registry.json`. Examples: `intake-coach`, `brief-builder`, `dashboard-narrator`. This is the value used in `ai_services_used[].service_name` in artifacts.

### Retention policy

The declared maximum duration that an AI service's output may be stored. Values: `session-only`, `sprint`, `release-cycle`, `90-days`, `audit-trail`. Defined in `04-ai-service-mesh/governance.md`.

### Output visibility

Who may access an AI service's output. Values: `internal-team`, `compliance-team`. Defined in `04-ai-service-mesh/governance.md`.

### PII risk

The assessed risk that an AI service's inputs may contain personally identifiable information. Values: `low`, `medium`, `high`. Drives required controls (pseudonymization, human reviewer, DPA).

---

## Artifact type terms

### Initiative Charter

The founding artifact of a Core or Scale initiative. Declares problem, outcome, KPIs, constraints, risk band, sponsor, budget, and deadline. Owner: Sponsor.

### Opportunity Brief

The founding artifact of an Explore initiative. Like an Initiative Charter, but includes explicit kill criteria and a time box. Owner: Founder or Sponsor.

### Feature Request (FRQ)

The structured description of a feature, produced by the Product Lead from the Initiative Charter. Scored by the Intake Coach. Must pass FRQ score ≥6.0 before prioritization.

### Feature Brief Pack

The full discovery artifact produced by the Product Lead, assisted by Brief Builder and Research Synthesizer. Includes hypothesis, ACs, in/out of scope, dependencies, risks, and tracking plan.

### MVP Frame

The lightweight equivalent of a Feature Brief Pack for Explore mode. Includes hypothesis, primary metric, kill criteria reference, and minimal ACs (optional).

### Design Spec

The UX artifact produced by the UX Lead, assisted by Design Critic. Documents user flows, wireframes, and interaction patterns.

### Technical Design Note (TDN)

The engineering artifact produced by the Engineering Lead, assisted by Solution Mapper. Documents system boundaries, data flow, integration points, and risk flags.

### Release Checklist

The QA/Release artifact that verifies release readiness. Produced by QA/Release Lead, verified by Release Verifier.

### Impact Review

The post-release learning artifact produced by the Product Lead, assisted by Dashboard Narrator. Documents KPI results, adoption trends, learnings, and next actions.

### MVP Decision Review

The Explore-mode equivalent of an Impact Review. Produces a Pivot / Persevere / Kill decision.

---

## Schema terms

### `artifact_id`

Unique identifier for an artifact. Pattern: `TYPE-YYYY-NNN`. Examples: `INIT-2026-014`, `BRIEF-2026-067`.

### `status`

The lifecycle state of an artifact. Valid values: `draft`, `in_review`, `ready_for_gate`, `ready_for_g1`, `ready_for_g2`, `ready_for_release`, `approved`, `rejected`, `archived`, `in_progress`, `final`.

### `gate_stage`

The gate at which this artifact was produced or reviewed. Values: `G0`, `G1`, `G2`, `release`, `learning`.

### `decision_log`

Array of tracked decisions on an artifact. Each entry requires `timestamp` (ISO 8601), `decision`, `rationale`, and `owner`. When a decision overrides an AI service, `ai_service_overridden` is also required.

---

## Process terms

### RFC (Request for Comments)

A formal proposal for evolving the ORDITO framework. Uses `.github/ISSUE_TEMPLATE/rfc_proposal.md`. The RFC is the artifact; community review is the gate. Required for breaking schema changes and manifesto modifications.

### FRQ score

The numerical quality score (0–10) produced by the Intake Coach for a Feature Request. Threshold for proceeding: 6.0 (Core/Scale), 5.0 advisory (Explore).

### SAS (Strategic Alignment Score)

The 0–10 score produced by the Prioritization Copilot measuring how well an initiative aligns with current strategy, OKRs, and revenue goals.

### RCS (Risk & Complexity Score)

The 0–10 score produced by the Prioritization Copilot measuring technical complexity, dependency count, compliance risk, and design uncertainty.
