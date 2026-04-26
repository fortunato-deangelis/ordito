# AI Service — Code Review Agent

**Canonical name**: `code-review-agent`
**Phase**: 5 — Build
**Purpose**: Review PRs for AC traceability, test coverage, security patterns, and adherence to the Technical Design Note. Does not replace human code review.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| PR diff / code changes | Git | Yes |
| Feature Brief Pack (ACs) | `feature_brief_pack` | Yes |
| Technical Design Note | `technical_design_note` | Yes |

---

## Outputs

1. **AC traceability map**: which ACs are covered by the PR, which are missing
2. **Test coverage flags**: untested paths, missing edge case tests
3. **Security pattern flags**: potential injection points, unvalidated inputs, insecure patterns
4. **TDN adherence**: deviations from the Technical Design Note
5. **Non-blocking observations**: stylistic or quality suggestions (flagged as non-blocking)

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-haiku-4-5-20251001` (for high-volume PR workflows)

---

## Retention and Visibility

- **Retention**: `session-only`
- **Visibility**: `internal-team`
- **PII risk**: `medium` (code may contain test fixtures with realistic data)

**PII handling**: Ensure test fixtures use fictional data, not real user records.

---

## Expedited mode (Hotfix)

In Hotfix mode, Code Review Agent runs in expedited mode:
- AC traceability check still runs
- Security flags are still produced
- Non-blocking observations are suppressed
- Output is advisory (not blocking) — Engineering Lead decides on each flag

---

## What Code Review Agent does NOT do

- Does not replace the human code reviewer — it augments, not replaces
- Does not verify non-functional requirements (performance, load) — those require testing
- Does not have context beyond the PR and provided artifacts — reviewer's product context still matters
