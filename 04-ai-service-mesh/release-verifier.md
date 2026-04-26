# AI Service — Release Verifier

**Canonical name**: `release-verifier`
**Phase**: 6 — Validate
**Purpose**: Check Release Checklist completeness, verify all ACs are covered, flag missing rollback documentation and monitoring setup.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Release Checklist | `release_checklist` | Yes |
| Feature Brief Pack (ACs) | `feature_brief_pack` | Yes |
| Technical Design Note | `technical_design_note` | Recommended |

---

## Outputs

**RELEASE** or **BLOCKER** decision with:
1. **AC coverage**: all ACs have corresponding test results
2. **Rollback verification**: rollback procedure is documented and tested
3. **Monitoring check**: alerts and dashboards are configured for the new feature
4. **Open blockers**: any P0/P1 open defects
5. **Checklist completeness**: mandatory fields filled in Release Checklist

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-haiku-4-5-20251001`

---

## Retention and Visibility

- **Retention**: `release-cycle`
- **Visibility**: `internal-team`
- **PII risk**: `low`

---

## BLOCKER thresholds

Release Verifier issues a BLOCKER (not just a flag) when:
- Any AC has no corresponding test result
- Rollback procedure is not documented
- Rollback procedure is documented but not tested
- Open P0 or P1 defect exists against this release
- Monitoring is not configured for the feature's primary metric

Cosmetic and P3 issues are flagged but do not produce a BLOCKER.
