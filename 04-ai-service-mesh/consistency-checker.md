# AI Service — Consistency Checker (Adversarial)

**Canonical name**: `consistency-checker`
**Phase**: gate-time (G1, G2, Release)
**Purpose**: Adversarial cross-artifact check. Reads across artifacts of one initiative and surfaces contradictions, dropped constraints, KPI coverage gaps, hypothesis gaps, and mode drift that per-phase services cannot see.

---

## Why this service exists (rationale)

ORDITO's AI service mesh is *constructive* by default: each service produces an artifact based on its upstream input. The compounding-error risk is structural — if upstream is loose, downstream is consistent with it but pointing in the wrong direction. No constructive service is responsible for *cross-artifact* consistency.

Consistency Checker is the system's counter-pressure. It is **adversarial by design**: it expects to find issues, and the over-flag bias is preferred to the under-flag bias.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Initiative Charter | `initiative_charter` | Yes |
| Feature Request | `feature_request` | Yes |
| Feature Brief Pack | `feature_brief_pack` | Yes (G1+) |
| Design Spec | `design_spec` | Yes (G2+) |
| Technical Design Note | `technical_design_note` | Yes (G2+) |
| Release Checklist | `release_checklist` | Yes (Release) |

---

## Outputs

A cross-artifact consistency report with:

1. **Findings** in five categories:
   - **CONTRADICTION** — direct conflicts between two artifacts
   - **DROPPED-CONSTRAINT** — Charter constraint not surfaced in downstream artifact
   - **KPI-COVERAGE** — Charter KPI without measurable instrumentation
   - **HYPOTHESIS-GAP** — Brief Pack hypothesis not testable from tracking plan
   - **MODE-DRIFT** — artifacts inconsistent with declared mode
2. **Severity per finding**: BLOCKING or NON-BLOCKING
3. **No-finding declarations** per category — absence-of-finding is itself a claim and goes in the audit trail
4. **Gate disposition recommendation**: PROCEED / CONDITIONAL / HOLD

---

## Recommended model

- **Primary**: `claude-opus-4-7` (cross-artifact reasoning is the hardest task in the mesh)
- **Alternative**: `claude-sonnet-4-6` (acceptable for small initiatives with <4 artifacts)

---

## Retention and visibility

- **Retention**: `release-cycle`
- **Visibility**: `internal-team`
- **PII risk**: `low` (consumes already-pseudonymized artifacts)

---

## Autonomy tier

**HITL** — every finding must be reviewed at the gate ritual. Recommendation drives the gate decision but does not bypass it.

---

## Prompt template

See `prompts/consistency-checker.md`.

---

## Invocation matrix

| Gate | Required | Service runs | Notes |
|---|---|---|---|
| G1 | Yes if Charter has ≥3 constraints OR Scale mode | After brief-builder, before G1 ritual | Focus on hypothesis-gap and KPI-coverage |
| G2 | Yes (all modes except Hotfix) | After solution-mapper, before G2 ritual | Focus on dropped-constraint and contradiction |
| Release | Yes (all modes except Hotfix) | After release-verifier, before Release Gate | Focus on AC coverage drift |
| Hotfix | No (skipped for speed); retrospective check within 7 days | Post-recovery | Findings feed Hotfix retrospective |

---

## What Consistency Checker does NOT do

- Does not redo per-phase critique (within-artifact issues belong to brief-builder, design-critic, etc.)
- Does not make gate decisions — it produces a recommendation; the gate facilitator decides
- Does not enforce findings — the artifact owner can override; override goes in `decision_log`
- Does not replace human reading of the artifacts at the gate

---

## Why this is a v1.4 addition

This service was missing in v1.2/1.3. The gap was identified in the v1.4 framework review based on emerging research on agent compounding errors (see `01-framework/regulatory-mapping.md` and antipattern AP-009 in `07-adoption/antipatterns.md`).
