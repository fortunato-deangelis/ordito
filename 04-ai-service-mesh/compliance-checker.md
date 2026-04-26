# AI Service — Compliance Checker

**Canonical name**: `compliance-checker`
**Phase**: 3 — Discovery (initial) and 6 — Validate (final)
**Purpose**: Verify that artifacts and decisions comply with declared regulatory constraints (GDPR, SOC2, PSD2, electronic invoicing regulations, etc.). Used primarily in Scale mode.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Initiative Charter (compliance flags) | `initiative_charter` | Yes |
| Feature Brief Pack | `feature_brief_pack` | Yes |
| Technical Design Note | `technical_design_note` | Phase 6 |
| Release Checklist | `release_checklist` | Phase 6 |
| Applicable regulations (declared) | From Charter | Yes |

---

## Outputs

**Compliance Assessment** (phases 3 and 6) with:
1. **Findings**: per regulation, per artifact — compliant/risk/non-compliant
2. **Required controls**: what must be implemented before the relevant gate
3. **Sign-off requirements**: which functions must approve (Legal, Security, Compliance)
4. **Audit trail requirements**: what must be retained and for how long
5. **Open questions**: areas requiring Legal/Compliance interpretation

---

## Recommended Model

- **Primary**: `claude-opus-4-7`
- **Alternative**: `claude-sonnet-4-6`

The Opus tier is recommended because compliance analysis requires nuanced reasoning about regulatory text and its application to specific system designs.

---

## Retention and Visibility

- **Retention**: `audit-trail` (indefinite, stored locally)
- **Visibility**: `compliance-team`
- **PII risk**: `high` (compliance analysis may require reviewing PII handling patterns)

**Mandatory controls**:
- Store compliance checker outputs locally (not just the artifact entry)
- `human_reviewer` required in all invocations
- Legal/Compliance team must review and sign off on the assessment

---

## When to use

**Required in Scale mode** when any compliance flag is present in the Initiative Charter.

**Optional in Core mode** for initiatives touching regulated data or processes.

**Not typically used in Explore mode** — if an MVP requires compliance review, the regulatory risk may indicate Scale mode is more appropriate.

---

## Important limitation

Compliance Checker identifies likely risks and patterns based on declared regulations. It does not:
- Replace Legal or Compliance team review
- Provide legal advice
- Guarantee regulatory compliance

Its output is input to the human compliance review — not a substitute for it.
