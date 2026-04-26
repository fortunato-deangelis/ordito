# AI Service — Test Case Generator

**Canonical name**: `test-case-generator`
**Phase**: 6 — Validate
**Purpose**: Derive test cases from ACs, edge cases, and technical design. Produce structured test plans covering happy paths, error paths, and boundary conditions.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Acceptance Criteria | `feature_brief_pack` | Yes |
| Technical Design Note | `technical_design_note` | Yes |
| Known edge cases | From Brief Pack risks | Recommended |

---

## Outputs

Structured test plan including:
1. **Happy path tests**: one test per AC (given/when/then → test steps)
2. **Error path tests**: one test per identified error scenario
3. **Boundary condition tests**: limit values, empty inputs, maximum loads
4. **Cross-browser / cross-platform tests** (if applicable)
5. **Regression markers**: existing behaviors that must not regress

In Scale mode, includes:
- Cross-team integration failure scenarios
- Dependency rollback scenarios

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

## Expedited mode (Hotfix)

In Hotfix mode: happy path tests only. Error paths for the specific fix scenario.

---

## Output Format Example

```
Test Case: TC-AC1-happy
AC: AC1 — Admin uploads valid CSV, preview shown within 5s
Steps:
  1. Login as enterprise admin
  2. Navigate to CSV Import
  3. Select valid 10,000-row CSV file
  4. Click Upload
Expected: Preview of first 100 rows displayed within 5 seconds
         Column mapping suggestions visible

Test Case: TC-AC2-partial-error
AC: AC2 — File with 1 invalid row, partial import
Steps:
  1. Upload CSV with 100 rows, row 47 has invalid tax ID format
  2. Confirm import
Expected: 99 invoices imported
         Error report downloadable (1 entry: row 47, reason: invalid tax ID)
         No total rollback
```
