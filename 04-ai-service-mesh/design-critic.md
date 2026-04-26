# AI Service — Design Critic

**Canonical name**: `design-critic`
**Phase**: 4 — Solution Design
**Purpose**: Review design specs against ACs and UX principles. Flag inconsistencies between user flows, edge cases missing in wireframes, and AC coverage gaps.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Feature Brief Pack | `feature_brief_pack` | Yes |
| Design Spec (wireframes described in text, or image) | `design_spec` | Yes |
| Acceptance Criteria | From Feature Brief Pack | Yes |

---

## Outputs

1. **AC coverage map**: which ACs are covered, partially covered, or missing in the design
2. **Flow inconsistencies**: places where the design contradicts itself or the ACs
3. **Missing edge cases**: scenarios that exist in the ACs but have no design coverage
4. **UX pattern flags**: deviations from common UX patterns that may confuse users
5. **Open questions for UX Lead**: questions that require design decisions, not fixes

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-opus-4-7` (for complex multi-flow designs)

---

## Retention and Visibility

- **Retention**: `session-only`
- **Visibility**: `internal-team`
- **PII risk**: `low`

---

## Prompt Template

See `prompts/design-critic.md`.

---

## What Design Critic does NOT do

- Does not evaluate aesthetic choices (colors, fonts, spacing)
- Does not replace UX research or usability testing
- Does not validate technical feasibility (that is Solution Mapper's domain)
- Does not make design decisions — it surfaces gaps for the UX Lead to decide on
