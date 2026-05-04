# AI Service Mesh — Governance

Rules applicable to all AI services in the ORDITO service mesh. These rules are not optional — they are the contractual basis for Principle #9 (Privacy and governance are part of the design).

---

## Authorized Models

| Tier | Model IDs | Use cases |
|---|---|---|
| **Tier 1 — Standard** | `claude-sonnet-4-6` | Most services: intake, prioritization, brief, design, code review, test |
| **Tier 2 — Reasoning** | `claude-opus-4-7` | Complex research synthesis, architecture mapping, compliance analysis, adversarial cross-artifact checks |
| **Tier 3 — Fast** | `claude-haiku-4-5-20251001` | High-volume, low-complexity: intake scoring, quick checks |

**Format for `model_used` in artifacts**: use the canonical model ID exactly as listed above (e.g., `claude-sonnet-4-6`, not `Claude Sonnet 4.6` or `sonnet`).

Using a model not in this list requires a `decision_log` entry documenting the rationale.

**Multi-vendor**: the canonical IDs above are the ORDITO reference. Teams running on Bedrock, Vertex, or another Anthropic-compatible gateway map their internal IDs to these canonical IDs in the registry's `model_provider` field (see `schemas/ai-invocation-log.schema.json`). Teams running on non-Anthropic providers must propose model-class-equivalent mappings via RFC.

---

## Autonomy tiers

Every service in `registry.json` declares an `autonomy_tier`. The tiers gate what governance applies.

| Tier | Definition | Required controls |
|---|---|---|
| **HITL** (human-in-the-loop) | Every output reviewed by a named human before incorporation | `human_reviewer` required in `ai_services_used`; `review_evidence` recommended; override goes to `decision_log` |
| **HOTL** (human-on-the-loop) | Sampled audit (e.g. 10% of invocations) plus exception review | Sampling logged in `ai-invocation-log`; quarterly audit by an independent reviewer; exception path defined |
| **HOOTL** (human-out-of-the-loop) | Autonomous within strict guardrails; ex-post audit | Reserved for low-risk, fully-reversible tasks. No service in v1.4 uses this tier |

Promotion path (HITL → HOTL → HOOTL) requires:
1. ≥1 quarter at the lower tier with override rate <10% on the targeted output category
2. Eval scores ≥0.90 across schema_validity / faithfulness / override_prediction (see `evals/`)
3. RFC proposing the promotion with risk assessment and sampling rate
4. ORDITO Retrospective signoff

Demotion is automatic if any of the above degrades.

---

## EU AI Act mapping

`registry.json` declares `ai_act_risk` per service:

| Risk class | Article 14 oversight implications | Services in v1.4 |
|---|---|---|
| `limited` | Transparency obligations: users informed, output traceable | All services except compliance-checker |
| `high` | Article 14 full oversight: trained reviewer, demonstrable measurability, post-market monitoring | `compliance-checker` |
| `minimal` | No obligations | None — ORDITO services always have some product impact |

Operating in EU jurisdictions: ensure that services flagged `high` are reviewed only by reviewers who have been *trained* on the regulation (Article 14(4)(a)) and that the audit trail is exportable for regulator request (Article 14(4)(d)).

See `01-framework/regulatory-mapping.md` for the principle-level mapping to AI Act and NIST AI RMF.

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
- `prompt_version` (matches registry; required from v1.4 onward — without it, audit trail is bucked when prompts evolve)
- `human_reviewer` (role of the human who reviewed the output — required for PII risk medium/high or autonomy_tier HITL)

For HOTL and HOOTL services, additionally maintain an `ai-invocation-log` entry per invocation conforming to `schemas/ai-invocation-log.schema.json`. The log captures cost, latency, parse validity, and review decision — required to demonstrate the sampled-audit and ex-post-audit controls.

For compliance services (`compliance-checker`), the full output must be retained locally (not just the artifact entry) as part of the audit trail.

---

## Drift detection

Prompt and model behaviour drift over time. ORDITO requires:

1. **On every model change** (e.g. provider deprecates a version): rerun all `evals/<service>/golden-set.jsonl` against the new model. If any service degrades >5% on overall score, escalate per the prompt update process.
2. **Quarterly**: rerun the eval framework on all services with the current registry's `recommended_model`. Compare against the previous quarter's baseline. Drift >5% triggers a prompt review.
3. **On a >40% override rate** for any service over a quarter: trigger an unscheduled drift review. The override pattern is the strongest in-production drift signal.

Drift findings feed the ORDITO Retrospective and may trigger an RFC for prompt update or autonomy-tier change.

---

## Prompt Update Process

Prompts for each service live in `04-ai-service-mesh/prompts/`. Updates to prompts follow this process:

1. **Identify the signal**: override rate for a service >40% over a quarter, drift detected by eval, or new known override pattern reported by the team
2. **Propose the change**: open an RFC (`.github/ISSUE_TEMPLATE/rfc_proposal.md`) with the current prompt, the proposed change, and the rationale
3. **Test the change**: run the updated prompt against the service's golden set in `evals/<service>/golden-set.jsonl`. Capture the delta vector (schema_validity / faithfulness / override_prediction)
4. **Merge and document**: update the prompt file, bump `prompt_version` in `registry.json`, update `last_prompt_update` timestamp, add a CHANGELOG entry citing the eval delta

Prompt changes that significantly alter service behaviour are breaking changes — bump `prompt_version` major (e.g. 1.4 → 2.0) and call out the regression risk in CHANGELOG.

Backward compatibility note: artifacts produced with previous prompt versions remain valid. The `prompt_version` field in `ai_services_used[]` keeps the audit trail intact across upgrades (see AP-011 in `07-adoption/antipatterns.md`).

---

## Service Mesh Compliance Checklist

For teams adopting ORDITO in regulated environments:

- [ ] Model provider DPA signed and covers all data types used
- [ ] `retention_policy` for each service verified against provider's actual retention
- [ ] Services with `pii_risk: high` have explicit `human_reviewer` in all invocations
- [ ] Output visibility confirmed with legal/compliance team
- [ ] Audit log retention covers regulatory requirement (GDPR: 72h breach notification; PSD2: 7-year audit trail)
- [ ] Prompt templates reviewed for potential PII leakage in few-shot examples
- [ ] EU AI Act `ai_act_risk` reviewed per service, with high-risk reviewers trained per Article 14
- [ ] `prompt_version` populated on all artifacts produced after v1.4
- [ ] Eval framework runs on every prompt change in CI

---

## Known Limitations

1. **AI services do not have access to real-time data.** Dashboard Narrator reads data you provide — it does not connect to analytics platforms directly. Integration must be built separately.

2. **Service outputs are non-binding.** All AI service outputs require human review (HITL) or sampled audit (HOTL) before being incorporated into artifacts. The schema's `human_reviewer` field is the record of this review.

3. **Override rate is a team metric, not a compliance metric.** A 100% override rate on a service is fine if the service still accelerates the work. The metric is useful for prompt tuning and tier promotion/demotion, not for auditing human judgment.

4. **Model versions change.** When a provider retires a model version, update `registry.json` and rerun evals before bumping the version. The canonical model ID in the registry is the authoritative reference.

5. **Eval golden sets are local.** Each adopting team is expected to grow its own golden set from production data. The starter set in this repo is a structural example, not a benchmark for production decisions.
