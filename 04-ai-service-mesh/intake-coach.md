# AI Service — Intake Coach

**Canonical name**: `intake-coach`
**Phase**: 1 — Intake
**Purpose**: Evaluate incoming Feature Requests against quality criteria and produce an FRQ score with actionable improvement suggestions.

---

## Inputs

| Field | Source artifact | Required |
|---|---|---|
| Feature Request fields | `feature_request` | Yes |
| Initiative Charter (for context) | `initiative_charter` | Recommended |

The service reads the Feature Request's `problem`, `user`, `value`, `constraints`, `acceptance_criteria`, and `urgency` fields. It cross-references these against the upstream Initiative Charter if provided.

---

## Outputs

Intake Coach produces:

1. **FRQ Score** (0–10): numerical quality score
2. **Weak fields**: list of fields below quality threshold
3. **Suggestions**: 3–5 specific, actionable improvements
4. **Improvement prompt**: an LLM-friendly prompt to help the Product Lead improve the FRQ

The output is not a new artifact — it is input to the Product Lead's decision on whether to improve, override, or escalate.

---

## Quality Criteria (FRQ scoring)

| Field | Weight | Minimum for pass |
|---|---|---|
| `problem` | 25% | Specific use scenario, not generic description. Includes user context. |
| `user` | 15% | Named persona or role with context |
| `value` | 20% | Measurable outcome, not adjective ("fast", "better") |
| `constraints` | 15% | Aligned with upstream Charter constraints; not empty |
| `acceptance_criteria` | 25% | At least 3 ACs in given/when/then format |

Score threshold for proceeding to prioritization: **6.0 (Core/Scale)** / **5.0 (Explore, advisory only)**

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-haiku-4-5-20251001` (for high-volume intake workflows)

---

## Retention and Visibility

- **Retention**: `session-only` — output not stored after session
- **Visibility**: `internal-team`
- **PII risk**: `low`

---

## Prompt Template

See `prompts/intake-coach.md` for the full prompt template.

**Invocation context to include**:
1. The Feature Request fields (all fields present in the artifact)
2. The Initiative Charter fields (if available): `objective`, `constraints`, `risk_band`
3. The scoring rubric (above)

---

## Example Invocation

```
Evaluate this Feature Request against the ORDITO FRQ quality criteria.

Initiative Charter context:
- objective: [Charter objective]
- constraints: [Charter constraints]
- risk_band: [Charter risk band]

Feature Request:
- problem: [FRQ problem field]
- user: [FRQ user field]
- value: [FRQ value field]
- constraints: [FRQ constraints]
- acceptance_criteria: [FRQ ACs]

Produce:
1. FRQ Score (0–10) with field-by-field breakdown
2. List of weak fields with specific gaps
3. 3–5 actionable improvement suggestions
4. An improvement prompt the Product Lead can use to iterate
```

---

## Override handling

If the Product Lead overrides an Intake Coach suggestion, log in `decision_log`:

```json
{
  "timestamp": "ISO 8601 timestamp",
  "decision": "Override of intake-coach suggestion #[N]: [suggestion text]",
  "rationale": "[Why the suggestion was not applicable]",
  "owner": "product_lead",
  "ai_service_overridden": "intake-coach"
}
```
