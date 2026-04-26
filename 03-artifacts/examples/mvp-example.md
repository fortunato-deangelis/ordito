# ORDITO Explore Example — Competitor Price Tracking MVP

> *A fictional but realistic MVP initiative tracked through ORDITO Explore mode. All names and numbers are invented; the artifact structure is real.*

**Context**: B2B SaaS for procurement. Team of 6. **ORDITO Explore** mode.

**Initiative**: "Allow procurement managers to track competitor pricing from a single dashboard"

---

## Phase 0 — Strategic Trigger

**Origin**: Three enterprise customers in the same vertical mentioned competitor pricing visibility as a "nice to have" in renewal calls. No quantified demand — purely qualitative signal. Founder decides to explore.

### Artifact: Opportunity Brief

```yaml
artifact_id: OPP-2026-003
artifact_type: opportunity_brief
owner_role: founder
status: approved
last_reviewed_at: 2026-02-01T00:00:00Z
objective: >
  Test whether procurement managers will actively use competitor price tracking
  if we provide it natively, vs. continuing to use spreadsheets and manual research.

hypothesis: >
  If procurement managers can see competitor pricing for their top 5 categories
  directly in the dashboard, then at least 30% of beta users will check it weekly,
  because price parity is a frequent question they currently answer manually.

kill_criteria:
  - metric: weekly_active_users_on_feature
    threshold: "<15% of beta cohort after 4 weeks"
  - metric: retention_d14
    threshold: "<40% of users who used it in week 1 return in week 2"
  - trigger: "No user opens the feature more than once in 30 days"

time_box: "8 weeks from first beta user to kill/persevere decision"
budget_sprints: 3
```

**Founder decision**: GO Explore. Kill criteria signed off.

---

## Phase 1 — Intake (lightweight)

```yaml
artifact_id: FRQ-2026-088
upstream_refs: [OPP-2026-003]
status: ready_for_prioritization
frq_score: 6.4/10

problem: >
  Procurement managers track competitor pricing manually (spreadsheets, calls,
  web research). Time-consuming, inconsistent, often outdated by the time decisions
  are made.

user: "Procurement manager (persona: Beatriz, 35, manages 50+ SKU categories)"
value: "Reduce weekly pricing research time by >50%"
primary_metric: "weekly_active_users on the feature (target: 30% of beta cohort)"
```

Intake Coach note: FRQ score 6.4 — acceptable for Explore. Primary metric defined. ACs deferred to MVP Frame.

---

## Phase 3 — Discovery / Explore Sprint

### Artifact: MVP Frame

```yaml
artifact_id: MVP-2026-003
upstream_refs: [OPP-2026-003, FRQ-2026-088]
owner_role: product_lead
status: ready_for_g1

hypothesis: >
  If procurement managers see competitor prices for their top 5 categories
  in a dedicated dashboard view, at least 30% will check it weekly.

primary_metric: "weekly_active_users_on_feature / total_beta_users >= 0.30 after 4 weeks"

in_scope:
  - Manual price input by procurement manager (no scraping in MVP)
  - Dashboard view: table with 5 categories, 3 competitors max
  - Weekly email digest (optional, but high in interviews)

out_of_scope:
  - Automated price scraping
  - More than 3 competitors
  - Price alerts
  - Historical trend charts

kill_criteria_ref: OPP-2026-003
```

**G1 decision**: GO — hypothesis testable, scope minimal, kill criteria confirmed.

---

## Phases 4–7 (summary)

**Solution Design**: Lightweight Design Spec for the dashboard view and manual input form. No TDN — no systemic risks. Design Critic flagged one flow inconsistency (resolved in 2h).

**Build**: 2 sprints. Feature flag `competitor-pricing-beta` active for 20 beta accounts. Code Review Agent flagged 1 missing AC link — resolved.

**Validate**: Test Case Generator produced 12 test cases (happy path + 4 edge cases). Release Verifier: no blockers.

**Release**: Beta rollout — 20 enterprise accounts selected by Customer Success. No dark launch (Explore default is beta).

---

## Phase 8 — Learn / Decide

**Dashboard Narrator** read data at 7, 14, 28 days.

### MVP Decision Review (28 days)

```yaml
artifact_id: MVPDEC-2026-003
upstream_refs: [MVP-2026-003, OPP-2026-003]
owner_role: founder
status: final
period: "T+28 days"

kill_criteria_results:
  - metric: weekly_active_users_on_feature
    threshold: "<15% of beta cohort after 4 weeks"
    actual: "34% (7 of 20 beta accounts used it weekly)"
    verdict: PASS (kill not triggered)
  - metric: retention_d14
    threshold: "<40%"
    actual: "61%"
    verdict: PASS

primary_metric_result:
  target: ">=30% WAU"
  actual: "34%"
  verdict: HIT

unexpected_findings:
  - "88% of users who input prices did it for only 2 categories, not 5 — scope was too wide"
  - "Weekly email digest: 73% opted in — high demand signal"
  - "0 users tried to add a 3rd competitor — 2 is enough for MVP"

decision: PERSEVERE
next_milestone: >
  Graduate to Core mode. Scope: add email digest (validated demand),
  simplify to 2 competitors max, explore semi-automated price input
  (not scraping — user pastes from supplier email).
```

---

## What Explore mode taught us

1. **Kill criteria prevented over-investment.** If WAU had been <15%, we would have killed in 4 weeks, not 3 sprints. The time box worked.

2. **"Out of scope" held.** Automated scraping was mentioned in every interview. We resisted. The manual input validated demand at a fraction of the cost.

3. **The email digest was the hidden gem.** It wasn't in the MVP Frame — a user mentioned it in week 1 feedback. We added it in week 3 (2 hours of work). 73% opt-in rate.

4. **Graduating to Core was the right move.** After 4 weeks of beta data, the hypothesis was confirmed. Continuing in Explore mode would have been under-investing. We opened a new Core initiative with the validated learnings.

---

## Related examples

- [ORDITO Core example (CSV import)](csv-import-enterprise-example.md)
- [ORDITO Scale example (legacy multi-team)](legacy-example.md) — *coming soon*
- [Hotfix example with override](hotfix-example.md) — *coming soon*
