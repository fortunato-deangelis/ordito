# AI Service — Prioritization Copilot

**Canonical name**: `prioritization-copilot`
**Phase**: 2 — Prioritization
**Purpose**: Calculate SAS (Strategic Alignment Score) and RCS (Risk & Complexity Score), identify overlap with other initiatives, and recommend risk band and effort band.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Feature Request | `feature_request` | Yes |
| Initiative Charter | `initiative_charter` | Yes |
| Current roadmap / active initiatives | Team context | Recommended |
| OKRs / strategic goals | Team context | Recommended |

---

## Outputs

1. **SAS (0–10)**: Strategic Alignment Score — how well the initiative aligns with current strategy
2. **RCS (0–10)**: Risk & Complexity Score — combined risk and complexity assessment
3. **Risk band**: low / medium / high / critical
4. **Effort band**: range in sprint-days with confidence interval
5. **Overlap flags**: potential conflicts or synergies with other initiatives
6. **Recommendation**: PROCEED / HOLD / REDUCE SCOPE with rationale

---

## Scoring Dimensions

### SAS components

| Dimension | Weight |
|---|---|
| Alignment with active OKRs | 35% |
| Revenue / retention impact | 30% |
| Strategic segment alignment | 20% |
| Customer request density | 15% |

### RCS components

| Dimension | Weight |
|---|---|
| Technical complexity | 30% |
| Cross-team dependencies | 25% |
| Compliance / regulatory risk | 20% |
| Design uncertainty | 15% |
| Data / integration risk | 10% |

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-haiku-4-5-20251001`

---

## Retention and Visibility

- **Retention**: `session-only`
- **Visibility**: `internal-team`
- **PII risk**: `low`

---

## Prompt Template

See `prompts/prioritization-copilot.md`.

---

## Example Output Format

```
Initiative: INIT-YYYY-NNN / FRQ-YYYY-NNN

SAS: 8.7/10
  ✓ Aligned with Q3 OKR "enterprise expansion"
  ✓ Directly impacts retention of at-risk segment
  ⚠ Possible overlap with INIT-YYYY-009 (check before proceeding)

RCS: 6.2/10
  • Compliance: medium risk (existing validators)
  • Volumes: medium risk (streaming required)
  • Partial errors: high design complexity
  • Dependencies: billing module (team B), audit module (team A)

Risk band: MEDIUM
Effort band: 12–18 sprint-days (80% confidence interval)

Recommendation: PROCEED to Discovery
  Conditions:
    - Evaluate overlap with INIT-YYYY-009 before G1
    - Coordinate with team B (billing) before G1
```
