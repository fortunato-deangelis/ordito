# AI Service — Research Synthesizer

**Canonical name**: `research-synthesizer`
**Phase**: 3 — Discovery
**Purpose**: Synthesize qualitative research (interviews, support tickets, usage data) into structured insights. Works alongside Brief Builder in the Discovery phase.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Interview transcripts or summaries | Free text | At least one source required |
| Support ticket summaries | Free text | Optional |
| Usage data / behavioral patterns | Free text | Optional |
| Feature Request (for framing) | `feature_request` | Yes |

---

## Outputs

1. **Insight clusters**: 3–6 themes emerging from the research
2. **Verbatim evidence** (pseudonymized): representative quotes per theme
3. **Frequency signals**: how many sources mention each theme
4. **Tension map**: themes that contradict each other (e.g., "speed vs. accuracy")
5. **Scenario list**: 3–5 concrete use scenarios derived from research
6. **Open questions**: what the research does NOT answer (for design phase)

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-opus-4-7` (for large research corpora or complex synthesis)

---

## Retention and Visibility

- **Retention**: `sprint`
- **Visibility**: `internal-team`
- **PII risk**: `high` (interview transcripts contain personal information)

**PII handling (mandatory for high PII risk)**:
- Pseudonymize all names before sending (User A, User B — not real names)
- Remove email addresses, company names of individual users, financial details
- Obtain consent for using interview data in AI synthesis (per your organization's policy)
- `human_reviewer` required in `ai_services_used` for all high PII invocations

---

## Prompt Template

See `prompts/research-synthesizer.md`.

---

## Output Format Example

```
Research Synthesis — [Initiative name]
Sources: 5 interviews, 47 support tickets, 2 usage analytics exports

INSIGHT 1: Manual workarounds are universal
  Frequency: 5/5 interviews, 32/47 tickets
  Evidence: "User A uses a separate spreadsheet to track..." / "User C exports to Excel every Monday..."
  Signal strength: HIGH

INSIGHT 2: Error recovery is the highest pain point
  Frequency: 4/5 interviews, 28/47 tickets
  Evidence: "User B had to restart the process twice..."
  Signal strength: HIGH

INSIGHT 3: Advanced users want automation, new users want guidance
  Tension: These two groups have opposing needs
  Signal strength: MEDIUM

Open questions not answered by research:
  - How often do users need to re-import after errors?
  - What happens to downstream systems when an import fails partially?
```
