# AI Service — Brief Builder

**Canonical name**: `brief-builder`
**Phase**: 3 — Discovery
**Purpose**: Structure the Feature Brief Pack from Feature Request, research inputs, and interview notes. Generates hypothesis, acceptance criteria, in/out of scope, and tracking plan skeleton.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Feature Request | `feature_request` | Yes |
| Initiative Charter | `initiative_charter` | Yes |
| Research notes / interview summaries | Free text | Recommended |
| Support ticket summaries | Free text | Recommended |
| Existing product context | Free text | Optional |

---

## Outputs

Draft `feature_brief_pack` with:
1. **Hypothesis** — testable statement: "If [condition], then [outcome], because [rationale]"
2. **Acceptance Criteria** — given/when/then format, 3–10 ACs
3. **In scope / Out of scope** — explicit boundaries
4. **Dependencies** — cross-team or cross-system
5. **Risks** — identified risks with initial mitigation suggestions
6. **Tracking plan skeleton** — events and KPIs aligned with Charter KPIs

The output is a draft — the Product Lead must review, adjust, and approve before the artifact is valid.

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-opus-4-7` (for complex initiatives with rich research input)

---

## Retention and Visibility

- **Retention**: `sprint`
- **Visibility**: `internal-team`
- **PII risk**: `medium` (research inputs may contain user quotes)

**PII handling**: Strip or pseudonymize user quotes before sending to service. Use "User A said..." not real names.

---

## Prompt Template

See `prompts/brief-builder.md`.

---

## Quality Check

The Product Lead should verify the Brief Builder output against:
- [ ] Hypothesis is falsifiable (not "users will love this")
- [ ] ACs are testable (not "the interface is intuitive")
- [ ] Out of scope is as specific as in scope
- [ ] Dependencies are named teams/systems, not vague "integrations"
- [ ] Tracking plan events align with the hypothesis (not just vanity metrics)
