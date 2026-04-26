# AI Service — Dashboard Narrator

**Canonical name**: `dashboard-narrator`
**Phase**: 8 — Learn
**Purpose**: Read post-release telemetry and produce the Impact Review draft: KPI deltas, adoption trends, anomaly flags, and next-action suggestions.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| KPI data at T+7, T+14, T+30 | Analytics export | Yes (at least T+30) |
| Initiative Charter KPIs | `initiative_charter` | Yes |
| Feature Brief Pack | `feature_brief_pack` | Yes |
| Defect summary | Support/QA | Recommended |

---

## Outputs

Draft `impact_review` with:
1. **KPI results**: baseline vs. target vs. actual, delta, verdict (SUCCESS/PARTIAL/MISS)
2. **Adoption trend**: usage curve, activation rate, retention (D7/D14/D30)
3. **Anomaly flags**: unexpected patterns (positive or negative)
4. **Learnings**: 3–5 insights derived from the data
5. **Next-action suggestions**: per learning, one concrete action
6. **Learning Gate recommendation**: VALUE CONFIRMED / PIVOT / KILL

The Product Lead reviews, adjusts, and finalizes. The artifact's status changes to `final` only after human approval.

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-opus-4-7` (for complex multi-market or multi-cohort analysis)

---

## Retention and Visibility

- **Retention**: `90-days`
- **Visibility**: `internal-team`
- **PII risk**: `medium` (aggregate analytics data may contain segment identifiers)

**PII handling**: Use aggregated data only. No individual user activity unless anonymized and consented.

---

## Invocation cadence

- **T+7**: quick check — is the feature being used? Any P0/P1 signals?
- **T+14**: mid-point — adoption trend, early KPI signals
- **T+30**: primary Impact Review — full KPI assessment, Learning Gate decision

For Explore mode: invoke at kill criteria checkpoints (may be earlier than T+30).

---

## What Dashboard Narrator does NOT do

- Does not connect to analytics platforms directly — data must be provided as input
- Does not make the Learning Gate decision — it produces a recommendation for the Product Lead
- Does not replace qualitative analysis — it synthesizes quantitative signals only
