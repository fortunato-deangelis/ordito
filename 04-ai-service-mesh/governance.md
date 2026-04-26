# AI Service Mesh — Governance

Rules applicable to all AI services in the ORDITO service mesh. These rules are not optional — they are the contractual basis for Principle #9 (Privacy and governance are part of the design).

---

## Authorized Models

| Tier | Model IDs | Use cases |
|---|---|---|
| **Tier 1 — Standard** | `claude-sonnet-4-6` | Most services: intake, prioritization, brief, design, code review, test |
| **Tier 2 — Reasoning** | `claude-opus-4-7` | Complex research synthesis, architecture mapping, compliance analysis |
| **Tier 3 — Fast** | `claude-haiku-4-5-20251001` | High-volume, low-complexity: intake scoring, quick checks |

**Format for `model_used` in artifacts**: use the canonical model ID exactly as listed above (e.g., `claude-sonnet-4-6`, not `Claude Sonnet 4.6` or `sonnet`).

Using a model not in this list requires a `decision_log` entry documenting the rationale.

---

## PII Rules

### Classification

| PII Risk Level | Examples | Required controls |
|---|---|---|
| **Low** | Artifact IDs, role names, metric values | No special controls |
| **Medium** | Feature descriptions referencing user behavior, support ticket summaries | Pseudonymize before sending; human reviewer required |
| **High** | Interview transcripts, full user quotes, financial data, health data | Explicit consent required; DPA must cover the model provider; `human_reviewer` required in artifact |

### Mandatory controls by PII level

- **Medium**: Strip or pseudonymize PII before sending to service. Document in `decision_log` if full context was required.
- **High**: Obtain DPA with model provider. Confirm `retention_policy` is acceptable for the data type. Always include `human_reviewer` in `ai_services_used`.

### PII in prompts

Never include in prompts:
- Real names of users (substitute with "User A", "Persona X", or role names)
- Email addresses, phone numbers, or national identifiers
- Financial account data, payment card data, or transaction IDs
- Health or biometric data

---

## Retention Policy Definitions

| Policy | Duration | Data at rest | Notes |
|---|---|---|---|
| `session-only` | Duration of API call | None | Default for low-PII services |
| `sprint` | Max 2 weeks | Provider's standard | Review and purge at sprint end |
| `release-cycle` | Until Impact Review is produced | Provider's standard | Linked to initiative lifecycle |
| `90-days` | 90 days post-release | Provider's standard | For learning loop services |
| `audit-trail` | Indefinite | Team-controlled storage | For compliance services — store output locally |

The model provider's retention policy must be equal to or shorter than the ORDITO declared retention. If the provider retains data longer, the ORDITO policy must be updated to match — or the service cannot use that model for that data.

---

## Output Visibility

| Level | Who can access | Notes |
|---|---|---|
| `internal-team` | Product team members on the initiative | Default for all services |
| `compliance-team` | Product team + compliance/legal function | Required for compliance-checker |

AI service outputs are internal artifacts. They must not be:
- Shared publicly without human review and approval
- Used as the sole basis for customer-facing decisions
- Referenced in customer communications without verification

---

## Audit Log Requirements

All AI service invocations must be traceable in the artifact via `ai_services_used`. Required fields:
- `service_name` (canonical name from registry)
- `invoked_at` (ISO 8601 timestamp)
- `model_used` (canonical model ID)
- `human_reviewer` (role of the human who reviewed the output — required for PII risk medium/high)

For compliance services (`compliance-checker`), the full output must be retained locally (not just the artifact entry) as part of the audit trail.

---

## Prompt Update Process

Prompts for each service live in `04-ai-service-mesh/prompts/`. Updates to prompts follow this process:

1. **Identify the signal**: override rate for a service >40% over a quarter indicates a prompt tuning need
2. **Propose the change**: open an RFC (`.github/ISSUE_TEMPLATE/rfc_proposal.md`) with the current prompt, the proposed change, and the rationale
3. **Test the change**: run the updated prompt against at least 3 real artifact examples from `03-artifacts/examples/`
4. **Merge and document**: update the prompt file, update the service entry in `registry.json` (`last_prompt_update`), and add a CHANGELOG entry

Prompt changes that significantly alter service behavior are breaking changes — bump the service version.

---

## Service Mesh Compliance Checklist

For teams adopting ORDITO in regulated environments:

- [ ] Model provider DPA signed and covers all data types used
- [ ] `retention_policy` for each service verified against provider's actual retention
- [ ] Services with `pii_risk: high` have explicit `human_reviewer` in all invocations
- [ ] Output visibility confirmed with legal/compliance team
- [ ] Audit log retention covers regulatory requirement (GDPR: 72h breach notification; PSD2: 7-year audit trail)
- [ ] Prompt templates reviewed for potential PII leakage in few-shot examples

---

## Known Limitations

1. **AI services do not have access to real-time data.** Dashboard Narrator reads data you provide — it does not connect to analytics platforms directly. Integration must be built separately.

2. **Service outputs are non-binding.** All AI service outputs require human review before being incorporated into artifacts. The schema's `human_reviewer` field is the record of this review.

3. **Override rate is a team metric, not a compliance metric.** A 100% override rate on a service is fine if the service still accelerates the work. The metric is useful for prompt tuning, not for auditing human judgment.

4. **Model versions change.** When Anthropic retires a model version, update `registry.json` and all existing `model_used` fields in artifacts. The canonical model ID in the registry is the authoritative reference.
