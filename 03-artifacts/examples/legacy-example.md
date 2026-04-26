# ORDITO Scale Example — Legacy Payment Gateway Migration

> *A fictional but realistic Scale mode initiative. All names and numbers are invented; the artifact structure is real.*

**Context**: Fintech SaaS for payment processing. Team of 25. **ORDITO Scale** mode.

**Initiative**: "Migrate from legacy payment gateway (v1) to new provider (v2) for compliance with PSD2 and SCA requirements"

---

## Phase 0 — Strategic Trigger

**Origin**: Legal flagged the legacy gateway as non-compliant with PSD2/SCA regulations effective Q4 2026. Three months to migrate or face regulatory risk.

### Artifact: Initiative Charter (Scale)

```yaml
artifact_id: INIT-2026-021
artifact_type: initiative_charter
owner_role: sponsor
status: approved
last_reviewed_at: 2026-02-15T00:00:00Z
objective: >
  Migrate payment processing from legacy gateway v1 to compliant provider v2
  before Q4 2026 regulatory deadline. Zero transaction loss, zero downtime.

constraints:
  - PSD2 SCA compliance mandatory by 2026-10-01
  - Zero transaction loss during migration
  - No regression on existing payment flows (7 payment types)
  - All 3 dependent teams (billing, subscriptions, invoicing) must sign off
  - Budget: 6 dev sprints across 3 teams

risk_band: critical
compliance_flags:
  - regulation: PSD2
    deadline: "2026-10-01"
    risk_if_missed: regulatory_fine + suspension
  - regulation: SCA
    deadline: "2026-10-01"
    risk_if_missed: regulatory_non_compliance

sponsor: CTO
budget_usd: 180000
deadline_business: "2026-Q3 (buffer before Q4 regulatory deadline)"
```

---

## Phase 2 — Prioritization

```
SAS: 9.8/10 — regulatory mandate, non-deferrable
RCS: 8.9/10 — 3 dependent teams, critical path, compliance complexity

Risk band: CRITICAL
Effort band: 25–35 sprint-days (3 teams in parallel)

Dependency flags:
  - Team Billing (payment processing core)
  - Team Subscriptions (recurring billing)
  - Team Invoicing (batch payment export)

Recommendation: PROCEED immediately. No competing initiative should block this.
```

---

## Phase 3 — Discovery

### Compliance Checker output

```
Compliance assessment for INIT-2026-021:

PSD2 / SCA — High risk
  • Strong Customer Authentication required for all transactions >€30
  • 3DS2 integration mandatory
  • Exemption logic must be documented and auditable

Data handling — High risk
  • PII (card data) must not transit new integration layer
  • Tokenization required end-to-end
  • Audit log with 7-year retention

Findings requiring sign-off:
  1. New provider's DPA must be reviewed by Legal before G1
  2. Tokenization approach must be reviewed by Security before G2
  3. Audit log format must be approved by Compliance team
```

### Feature Brief Pack (excerpt)

```yaml
artifact_id: BRIEF-2026-089
upstream_refs: [INIT-2026-021]
owner_role: product_lead
status: ready_for_g1

hypothesis: >
  If we migrate to gateway v2 using a dark-launch parallel-run approach
  (v1 and v2 processing simultaneously with v1 as primary for 4 weeks),
  we can validate v2 without transaction risk before full cutover.

acceptance_criteria:
  - id: AC1
    given: "Any payment type processed in v2"
    when: "Transaction completes"
    then: "Identical result to v1 parallel run, within 200ms latency delta"
  - id: AC2
    given: "Transaction >€30 processed in v2"
    when: "Customer authenticates"
    then: "SCA flow completes with 3DS2, exemption applied if eligible"
  - id: AC3
    given: "Any transaction"
    when: "Processed by v2"
    then: "Audit log entry created with PSD2-compliant fields within 1s"
  # ... 12 more ACs

dependencies:
  - team_billing: gateway abstraction layer refactor (8 sprint-days)
  - team_subscriptions: recurring billing adapter (5 sprint-days)
  - team_invoicing: batch export format update (3 sprint-days)
  - legal: DPA review for new provider (external, 2 weeks SLA)
  - security: tokenization architecture review (internal, 1 week)

risk_band: critical
```

---

## Phase 4 — Solution Design

### Dependency Matrix (Dependency Mapper output)

```yaml
dependency_matrix:
  - id: DEP-001
    type: team
    name: "Team Billing — Gateway Abstraction Layer"
    integration_point: "PaymentGateway interface refactor"
    risk: critical
    owner: engineering_lead_billing
    blocking_gate: G2
    status: coordinated
    weekly_sync: true

  - id: DEP-002
    type: team
    name: "Team Subscriptions — Recurring Billing Adapter"
    integration_point: "SubscriptionProcessor.processRecurring()"
    risk: high
    owner: engineering_lead_subscriptions
    blocking_gate: G2
    status: coordinated

  - id: DEP-003
    type: team
    name: "Team Invoicing — Batch Export"
    integration_point: "PaymentExport.formatForAudit()"
    risk: medium
    owner: engineering_lead_invoicing
    blocking_gate: G2
    status: coordinated

  - id: DEP-004
    type: external
    name: "Legal — DPA Review"
    integration_point: "Provider Data Processing Agreement"
    risk: high
    owner: legal_lead
    blocking_gate: G1
    status: in_review
    deadline: "2026-03-01T00:00:00Z"

  - id: DEP-005
    type: internal
    name: "Security — Tokenization Architecture"
    integration_point: "End-to-end tokenization design"
    risk: high
    owner: staff_engineer
    blocking_gate: G2
    status: scheduled
```

### Architecture Sign-off (Staff Engineer)

```yaml
architecture_signoff:
  artifact_ref: TDN-2026-089
  reviewer: staff_engineer
  signed_at: "2026-03-10T00:00:00Z"
  verdict: approved_with_conditions
  conditions:
    - "Parallel-run must include full transaction reconciliation (v1 vs v2 results compared)"
    - "Tokenization must be validated by Security before G2"
    - "Cutover must be reversible within 15 minutes"
    - "Load test: 10,000 concurrent transactions before full cutover"
```

---

## Phases 5–8 (summary)

**Build**: 3 teams in parallel, 6-week build. Cross-team PRs reviewed by Staff Engineer. 3 Code Review Agent flags for compliance — all resolved. Parallel run infrastructure built as dark launch.

**Architecture note**: Parallel run revealed 47 transaction discrepancies in week 1 (v1 rounding rules vs. v2). Resolved in sprint 4. Without the parallel run, these would have been production incidents.

**Gate G2**: READY with conditions — load test pending. Load test passed (12,000 concurrent, <180ms p99). All DEP entries resolved.

**Validate**: 156 test cases (Test Case Generator + manual compliance scenarios). Release Verifier blocked first attempt: missing audit log format sign-off from Compliance team. Resolved in 24h.

**Release**:
- Week 1: Dark launch (v2 runs in parallel, v1 primary — transaction reconciliation active)
- Week 5: Beta (v2 as primary for 10% of transactions — v1 on standby)
- Week 8: Full cutover — v1 decommissioned after 72h monitoring window
- Zero transaction loss. Zero compliance findings.

**Architecture retrospective**: The gateway abstraction layer (DEP-001) was the highest-risk dependency — it required a 3-week refactor that almost slipped G2. Recommendation: invest in abstraction layer test coverage before the next integration.

---

## What Scale mode taught us

1. **The parallel run was non-negotiable.** In Core mode, we might have skipped it to save time. The 47 rounding discrepancies found in dark launch would have been 47 production incidents.

2. **Legal as a dependency is a gate blocker.** DEP-004 (Legal DPA review) blocked G1 for 2 weeks. In Scale mode, external dependencies must be started before phase 3, not during.

3. **Architecture sign-off produced conditions, not just approval.** The Staff Engineer's "approved_with_conditions" was the most valuable artifact in the initiative. The load test it triggered revealed a performance ceiling we would have hit at 120% capacity.

4. **Compliance Checker at phase 3 saved weeks.** Running it at the beginning identified the audit log format requirement. Discovering it at release would have been a 2-week delay.

---

## Related examples

- [ORDITO Core example (CSV import)](csv-import-enterprise-example.md)
- [ORDITO Explore example (MVP)](mvp-example.md)
- [Hotfix example with override](hotfix-example.md) — *coming soon*
