# Regulatory mapping — EU AI Act and NIST AI RMF

This document maps ORDITO's principles, controls, and artifacts to the two reference frameworks that organisations adopting AI in product workflows are typically asked to map against:

- **EU AI Act** (Regulation (EU) 2024/1689) — entered into force 2024-08-01, with phased applicability through 2027. Article 14 (Human Oversight) is the core obligation for high-risk AI systems.
- **NIST AI Risk Management Framework** (AI RMF 1.0, January 2023, with Generative AI Profile July 2024) — voluntary in the US, increasingly used as the de facto enterprise governance baseline.

This is not legal advice. It is a technical mapping that lets a Compliance Officer or DPO trace ORDITO controls to the obligations they are accountable for. Always validate with qualified counsel for your specific jurisdiction and risk class.

---

## EU AI Act — Article 14 Human Oversight

Article 14 requires that high-risk AI systems be designed and developed with measures enabling effective human oversight. The five oversight activities (Article 14(4)(a–e)) and how ORDITO addresses each:

| Article 14(4) obligation | ORDITO mechanism |
|---|---|
| **(a)** Reviewer must be able to understand the system's capacities and limitations | `04-ai-service-mesh/governance.md` documents authorized models, autonomy tiers, retention, PII risk per service. Each service's `*.md` and `prompts/*.md` describe scope and known override patterns explicitly |
| **(b)** Reviewer must remain aware of automation bias | Manifesto Principle 7 (revised v1.4): AI structures judgment, never replaces it. Antipattern AP-003 (Review timestamp without review) and AP-008 (AI bypasses the actor) make this concrete |
| **(c)** Reviewer must be able to interpret the output | Each prompt template specifies output format and known override patterns. `decision_log[].rationale` requires explanation referencing constraints/KPIs |
| **(d)** Reviewer must be able to disregard or override the output | Principle 3 (Override is a right, but it's tracked). Override is a first-class artifact field (`decision_log[].ai_service_overridden`). The metric is monitored at quarterly retrospective |
| **(e)** Reviewer must be able to halt the system | `autonomy_tier` defines who can halt. For HITL services, the human reviewer must approve before output is incorporated. For HOTL, the exception path stops the service. For HOOTL (none in v1.4), the kill-switch is the team's runtime concern |

### Other AI Act articles relevant to ORDITO services

| AI Act article | Topic | ORDITO mechanism |
|---|---|---|
| **Article 9** — Risk management system | Continuous risk identification, evaluation, mitigation | `01-framework/principles.md` Metrics + Override Policy + Drift detection in governance.md |
| **Article 10** — Data and data governance | Training/operating data quality and bias controls | PII rules, retention policy, eval framework with declared `expected` and `expert_outcome` |
| **Article 12** — Record-keeping | Automatically generated logs throughout system lifecycle | `ai_services_used[]` per artifact + `ai-invocation-log.schema.json` for HOTL/HOOTL services |
| **Article 13** — Transparency and provision of information | Users informed of AI involvement | Output is internal-team by default (governance.md output_visibility); the AI's role is always disclosed in the artifact (`ai_services_used`) |
| **Article 15** — Accuracy, robustness, cybersecurity | Performance metrics and adversarial controls | Eval framework + `consistency-checker` adversarial agent + drift detection |
| **Article 17** — Quality management system | Documented procedures for compliance | RFC process (Principle 10), CHANGELOG, governance.md compliance checklist |

### High-risk classification

ORDITO services default to `ai_act_risk: limited` (Article 6 — limited-risk AI under the Act's framework). The exception is `compliance-checker`, which is `high` because it informs decisions about regulatory compliance — Annex III categories may apply depending on the regulation domain.

A service can be reclassified `high` if the deploying organisation uses it for:
- Decisions on access to credit / insurance / housing
- Worker management or recruitment
- Critical infrastructure
- Law enforcement, migration, justice administration

When that classification applies, the additional Article 14 controls (training of reviewers per 14(4)(a), conformity assessment per Articles 43–47) become mandatory.

---

## NIST AI RMF mapping

The four NIST AI RMF functions — **Govern, Map, Measure, Manage** — and their primary categories.

### Govern

| NIST category | ORDITO mechanism |
|---|---|
| GOVERN 1.1 — Legal and regulatory requirements identified | `01-framework/regulatory-mapping.md` (this file); `compliance-checker` service for per-initiative assessment |
| GOVERN 1.2 — Policies, processes for AI risks documented | `governance.md`; `01-framework/principles.md` Override Policy and Metrics |
| GOVERN 1.3 — Process to allow inquiries / contestation | Override mechanism + `decision_log[].ai_service_overridden`; AP-010 (Override silenziato) makes silent overrides an explicit antipattern |
| GOVERN 1.4 — Roles and responsibilities defined | `02-operating-model/roles.md` with RACI matrix |
| GOVERN 1.5 — Workforce competencies for AI | Implicit in role definitions; training requirement explicit only for AI Act high-risk classes (compliance-checker) |
| GOVERN 1.6 — Org policies on AI | `governance.md` plus `MANIFESTO.md` |
| GOVERN 2.1 — Diverse perspectives in AI design | RFC process per Principle 10 |
| GOVERN 3 — Workforce roles around AI | Roles document + Sponsor/Founder authority for kill |
| GOVERN 4 — Org commitment to AI risk culture | Manifesto + ORDITO Retrospective quarterly cadence |
| GOVERN 5 — Engagement with stakeholders | Public RFC, Discussions, CONTRIBUTING.md |
| GOVERN 6 — Third-party AI risk policies | `governance.md` Authorized Models tier + DPA requirements |

### Map

| NIST category | ORDITO mechanism |
|---|---|
| MAP 1.1 — Use case context defined | `Initiative Charter` artifact with `objective`, `constraints`, `risk_band`, KPIs |
| MAP 1.2 — Stakeholder identification | `roles.md` + RACI + `decision_log` named owners |
| MAP 2.1 — Tasks and functions characterised | Each service in `04-ai-service-mesh/*.md` with phase, inputs, outputs, autonomy tier |
| MAP 2.2 — AI system function and purpose declared | `registry.json` per-service description + `MANIFESTO.md` Principle 7 |
| MAP 3 — AI capabilities and limitations | Each prompt's "Known override patterns"; governance.md Known Limitations |
| MAP 4 — Risks identified | `consistency-checker` adversarial check at gates; `compliance-checker` for regulatory risks |
| MAP 5 — Impacts characterised | `risk_band`, `reversibility_class`, `blast_radius` (added in v1.4 schema) |

### Measure

| NIST category | ORDITO mechanism |
|---|---|
| MEASURE 1 — Methods and metrics identified | `01-framework/principles.md` Metrics section (override rate, conformance, learning loop completion); `evals/` framework |
| MEASURE 2 — AI evaluated for trustworthy characteristics | Eval rubrics: schema_validity, faithfulness, override_prediction |
| MEASURE 3 — Mechanism for tracking risks | Override rate quarterly; drift detection on every model change |
| MEASURE 4 — Feedback loops for measurement | Learning Gate + `dashboard-narrator` Impact Review |

### Manage

| NIST category | ORDITO mechanism |
|---|---|
| MANAGE 1 — AI risks prioritised | `risk_band`, `reversibility_class`, `blast_radius` drive playbook selection |
| MANAGE 2 — Risk strategies developed | `05-playbooks/` per mode; `02-operating-model/tension-modes.md` for governance intensity |
| MANAGE 3 — Risk treatment | Override Policy in `01-framework/principles.md`; Hotfix recovery documentation within 48h |
| MANAGE 4 — Risk treatment monitoring | ORDITO Retrospective quarterly; drift detection; AP-006 (Learning ritual gets dropped) makes the failure mode explicit |

---

## What this mapping does NOT cover

- **GDPR** — covered separately via PII rules in `governance.md` and `compliance-checker` service. A full GDPR mapping is a per-organisation DPO task (data flows, lawful bases, DPIAs).
- **SOC 2 / ISO 27001** — these are organisation-level controls, not framework-level. ORDITO supports them via audit log and retention but does not constitute a SOC 2 control library.
- **Sector-specific** (PSD2, HIPAA, FDA software-as-medical-device, EBA outsourcing guidelines) — `compliance-checker` is the per-initiative tool. No general-purpose mapping is provided here.
- **US state laws** (Colorado AI Act, NYC Local Law 144) — the NIST mapping above is a useful starting point. Consult counsel for specific jurisdictions.

---

## How to use this mapping

1. **At ORDITO adoption**: have your DPO or Compliance Officer read this document and confirm whether the mapping is sufficient for your risk class.
2. **At AI Act high-risk reclassification**: if any of your initiatives moves to `ai_act_risk: high`, treat this document as the starting checklist; build a per-deployment QMS per Article 17.
3. **At regulator request**: this mapping plus the audit pack (CLI v0.4) is the evidence package. The audit pack exports `decision_log`, override rate per service, learning loop completion, conformance rate, and AI invocation log.
4. **At quarterly retrospective**: review whether the mapping still reflects current operations. AI regulation changes faster than ORDITO releases — propose RFC if drift is observed.

---

## Disclaimer

This mapping is provided as documentation aid only. It is not legal advice. It does not certify EU AI Act conformity or NIST AI RMF compliance. The deploying organisation is responsible for legal review and conformity assessment per its jurisdiction and risk class.
