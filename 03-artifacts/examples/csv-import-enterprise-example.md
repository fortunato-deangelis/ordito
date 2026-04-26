# End-to-End Example — A Real Feature Through ORDITO

> *To make ORDITO concrete, we follow a fictional but realistic initiative from origin to post-release learning. All names and numbers are invented; the artifact structure is real.*

**Context**: B2B SaaS for electronic invoicing. Team of 18 people. **ORDITO Core** mode.

**Initiative**: "Allow enterprise customers to bulk-import invoices from CSV"

---

## Phase 0 — Strategic Trigger

**Origin**: Customer Success aggregated 47 tickets over the last 90 days from enterprise customers requesting bulk import. Three customers above $50k ARR threatened churn. Sponsor: VP Customer Success.

### Artifact: Initiative Charter

```yaml
artifact_id: INIT-2026-014
artifact_type: initiative_charter
owner_role: sponsor
status: approved
created_at: 2026-03-04
last_reviewed_at: 2026-03-06

problem: |
  Enterprise customers (>1000 invoices/month) input invoices manually
  or via custom API. Average onboarding time: 6 weeks. Three enterprise
  customers ($180k aggregate ARR) threaten churn.

outcome: |
  Reduce enterprise onboarding time from 6 to 2 weeks.
  Stop churn of the 3 at-risk accounts.
  Enable the "self-serve enterprise" segment for 2026.

kpi:
  - name: Enterprise onboarding time
    baseline: 42 days
    target: 14 days
    measurement: 30-day rolling average post-release
  - name: Enterprise churn rate (>$50k ARR)
    baseline: 8%
    target: <4%
    measurement: quarterly

risk_band: medium
constraints:
  - Compliance with electronic invoicing regulations
  - No regressions on existing single-invoice flow
  - Budget: 2 dev sprints, 0.5 design sprint

sponsor: VP Customer Success
budget_usd: 50000
deadline_business: 2026-Q3
```

**Sponsor decision**: GO. The flow opens.

---

## Phase 1 — Intake

The Product Lead receives the Initiative Charter and produces the initial Feature Request. **Intake Coach** analyzes it.

### Artifact: Feature Request (first version)

```yaml
artifact_id: FRQ-2026-103
upstream_refs: [INIT-2026-014]
status: draft

problem: "Import invoice CSVs"
user: "Enterprise admin"
value: "Speed"
urgency: high
constraints: []
```

### Intake Coach output

```
⚠️  FRQ score: 4.2/10 — INSUFFICIENT

Weak fields:
  • problem: too generic, missing use scenario
  • value: "speed" is not measurable
  • constraints: empty, but the Charter cites compliance requirements
  • acceptance_criteria: missing

Suggestions:
  1. Specify: expected CSV type (separator, encoding)?
  2. Scenario: scheduled overnight import or on-demand?
  3. Errors: what happens if 1 row in 10000 is invalid?
  4. Volumes: up to how many invoices per import?

Improvement prompt: "Consider the 47 support tickets as input.
What are the 3 most frequent scenarios?"
```

The Product Lead **ignores** suggestion 1 (finds it obvious) and accepts 2, 3, 4. Override tracked in `decision_log`. After iteration:

### Feature Request (after Intake Coach)

```yaml
artifact_id: FRQ-2026-103
status: ready_for_prioritization
frq_score: 8.1/10

problem: |
  Enterprise admins with >1000 invoices/month cannot batch-import.
  They must use custom API (requires dev) or manual entry
  (error-prone, slow).

user: "Enterprise admin (persona: Marco, IT manager)"

value: |
  70% reduction in monthly setup time.
  Elimination of copy-paste errors.

scenarios:
  - id: S1
    name: Scheduled monthly import
    frequency: high
  - id: S2
    name: One-off historical backlog import
    frequency: medium
  - id: S3
    name: Corrective re-import after rejection
    frequency: medium

constraints:
  - Compliance with electronic invoicing regulations
  - UTF-8 and Windows-1252 encoding
  - Files up to 50MB / 50,000 rows
  - Partial errors: partial import + error report

urgency: high
target_release: 2026-Q3

decision_log:
  - 2026-03-08: Override on Intake Coach suggestion #1.
    Reason: "CSV type is implementation detail, not FRQ concern."
    Owner: @product.lead
```

---

## Phase 2 — Prioritization

**Prioritization Copilot** reads Charter + FRQ + current roadmap.

### Prioritization Copilot output

```
Initiative: INIT-2026-014 / FRQ-2026-103

SAS (Strategic Alignment Score): 8.7/10
  ✓ Aligned with Q3 OKR "enterprise expansion"
  ✓ Unlocks self-serve enterprise segment (revenue strategy)
  ⚠ Possible overlap with INIT-2026-009 (API v2)

RCS (Risk & Complexity Score): 6.2/10
  • Compliance: medium risk (existing validators)
  • Volumes: medium risk (50MB/50k rows require streaming)
  • Partial errors: high design complexity
  • Dependencies: billing module (team B), audit module (team A)

Risk band: MEDIUM
Effort band: 12-18 sprint-days (80% confidence interval)

Recommendation:
  PROCEED to Discovery, but evaluate overlap with INIT-2026-009.
  Suggested coordination with team B (billing) before G1.
```

**Human decision** (Product + Engineering Lead): proceed. Coordination with team B scheduled.

---

## Phase 3 — Discovery

**Brief Builder** + **Research Synthesizer** produce the Brief Pack draft, reading: FRQ, related support tickets, interviews with 5 enterprise admins (3 new + 2 existing from research repository).

### Artifact: Feature Brief Pack (excerpt)

```yaml
artifact_id: BRIEF-2026-067
upstream_refs: [INIT-2026-014, FRQ-2026-103]
owner_role: product_lead
status: ready_for_g1

hypothesis: |
  If we provide CSV import with preview, inline compliance validation,
  and rollback for partial errors, then enterprise admins will reduce
  monthly setup time from ~4h to <1h, because they can operate
  autonomously without involving their IT team.

acceptance_criteria:
  - id: AC1
    given: "Admin with valid 10k-row CSV file"
    when: "Uploads the file"
    then: "Preview of first 100 rows within 5s, suggested column mapping"
  - id: AC2
    given: "File with 1 invalid row out of 100 (wrong tax ID)"
    when: "Confirms import"
    then: "99 invoices imported, 1 error in downloadable report, no total rollback"
  - id: AC3
    given: "File with unsupported encoding"
    when: "Uploads the file"
    then: "Explicit error with conversion suggestion, no upload"
  # ... 7 more ACs

in_scope:
  - Manual CSV upload via UI
  - Inline compliance validation
  - Partial import with error report
  - Audit log of imports

out_of_scope:
  - Scheduled import (future iteration)
  - Import from SFTP/cloud storage (Q4)
  - Custom column transformations (Q4)

dependencies:
  - team_b: billing API extension for batch insert
  - team_a: hook on audit module for import registration

risk_band: medium
risks:
  - id: R1
    description: "Real-time compliance validation may slow uploads >10k rows"
    mitigation: "Async validation with completion notification"
    owner: engineering_lead

tracking_plan:
  events:
    - csv_import_started
    - csv_import_preview_shown
    - csv_import_completed
    - csv_import_error_partial
    - csv_import_error_total
  kpis:
    - import_success_rate
    - avg_import_time_per_1k_rows
    - error_rate_by_validation_type
```

---

## Phase 4 — Gate G1

**Decision-maker**: Product Lead with Engineering Lead co-signature.

```yaml
gate_decision:
  gate: G1
  artifact: BRIEF-2026-067
  decision: GO
  decided_at: 2026-03-15
  decided_by: [@product.lead, @eng.lead]
  rationale: |
    Brief Pack complete, ACs clear, dependencies coordinated with team B.
    MEDIUM risk band acceptable given business impact.
  conditions:
    - Weekly sync with team B until integration
    - Load test of 50k rows before G2
```

---

## Phases 5-8 (summary)

For brevity, here's a summary of subsequent phases. The pattern is identical: each phase produces a contractual artifact, an AI service assists, a human decision-maker signs the handoff.

**Phase 5 — Solution Design**
- Design Spec (UX Lead, assisted by Design Critic): wireframes for upload, preview, column mapping, error report
- Technical Design Note (Engineering Lead, assisted by Solution Mapper): streaming parser, async queue for validation, transactional batch insert
- **Gate G2**: ✓ Ready. Load test passed (52k rows in 38s).

**Phase 6 — Build**
- 3 main PRs, Code Review Agent flagged 2 traceability issues (missing AC link) — resolved
- Feature flag `csv-import-enterprise` active for beta accounts

**Phase 7 — Validate**
- Test Case Generator produced 47 test cases from AC + edge cases
- Release Verifier blocked the first release attempt: missing documented rollback for the audit module. Resolved in 4h.

**Phase 8 — Release**
- Rollout: dark launch (1 week) → beta with 10 accounts (2 weeks) → full release
- Zero P0/P1 incidents in the first 14 days

---

## Phase 9 — Learning Loop

**Dashboard Narrator** reads data at 7, 14, 30 days and produces the Impact Review draft.

### Artifact: Impact Review (at 30 days)

```yaml
artifact_id: IMPACT-2026-067
upstream_refs: [BRIEF-2026-067, INIT-2026-014]
owner_role: product_lead
status: final
period: T+30 days

kpi_results:
  - name: Enterprise onboarding time
    baseline: 42 days
    target: 14 days
    actual: 18 days
    delta_vs_target: -29%
    verdict: PARTIAL_SUCCESS

  - name: Enterprise churn rate (>$50k ARR)
    baseline: 8%
    target: <4%
    actual: 5%
    verdict: PARTIAL_SUCCESS
    note: "Of 3 at-risk accounts, 2 renewed. 1 lost for unrelated reasons."

adoption:
  - 23 active enterprise accounts on CSV import (out of 41 eligible)
  - AAR: 56% (target was 70%)
  - Avg imports/account/month: 4.2

defects_post_release:
  - P2: 2 (foreign tax ID validation — fix in 2 sprints)
  - P3: 5 (UX on column mapping — backlog)
  - P0/P1: 0

learnings:
  - id: L1
    insight: "Onboarding isn't just import time — it includes admin training. 30% of remaining time is training."
    action: "Parallel initiative for video tutorials and pre-filled CSV template"
  - id: L2
    insight: "44% of enterprises don't use import because they already have an API integration. The target segment is smaller than expected."
    action: "Revisit market assumption for self-serve expansion"
  - id: L3
    insight: "Suggested column mapping is used by 89% of users — feature more valuable than expected"
    action: "Consider extension to Excel import"

next_action: |
  The initiative reaches PARTIAL SUCCESS on KPIs but with important
  learning (L2): the self-serve enterprise segment is 56% of expected.
  Propose strategy re-framing for 2026 at next QBR.

  Open INIT-2026-031 for video tutorials (L1) and backlog item for
  Excel extension (L3).
```

---

## What we learned about the framework from this example

1. **The Charter captured wrong assumptions.** The assumption "all enterprises want CSV import" was weak. The learning loop revealed it. Without the learning loop, we would have built 3 more features on the same flawed assumption.

2. **Tracked override is pure value.** The Product Lead's override on Intake Coach #1 was correct in that case. But if we see systematic overrides on the same suggestion, the problem is the service's prompt.

3. **G2 blocked a fragile release.** The missing audit module rollback was a detail that, in production, would have cost a weekend of firefighting. 4h of polishing > 48h of firefighting.

4. **AI accelerated time-to-G1 by ~40%.** Not because it "thought" for the team, but because it eliminated the back-and-forth of clarifications on weak FRQs. The shuttle moved faster, but on an already tense warp.

5. **Core mode was the right choice.** For an exploratory MVP, this level of documentation would have been excessive. For an enterprise initiative with compliance, it was the bare minimum. Warp tension adapts to the fabric.

---

## Related examples in the repository

- [ORDITO Explore example (MVP)](mvp-example.md) — *coming soon*
- [ORDITO Scale example (legacy multi-team)](legacy-example.md) — *coming soon*
- [Hotfix example with override](hotfix-example.md) — *coming soon*
