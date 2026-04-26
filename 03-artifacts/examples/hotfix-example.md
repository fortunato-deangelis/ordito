# ORDITO Hotfix Example — Invoice Export Failure

> *A fictional but realistic Hotfix mode incident. All names and numbers are invented; the artifact structure is real.*

**Context**: B2B SaaS for electronic invoicing. Team of 12. ORDITO Core mode in normal operations.

**Incident**: "Invoice export endpoint returning 500 for all enterprise accounts after deploy at 14:32"

---

## Phase 0 — Incident Trigger

**Origin**: 14:37 — Monitoring alert: `/api/v2/invoices/export` error rate 98% (from 0.3% baseline). Three enterprise accounts opened P0 support tickets within 15 minutes.

```
[14:38] On-call (Engineering Lead) pages Product Lead
[14:39] Root cause identified: deploy at 14:32 introduced a breaking schema change
         in the export serializer. The field `tax_id` was renamed to `fiscal_code`
         but the export template still references `tax_id`.
[14:42] Fix scope confirmed: 2-line change in serializer. Normal G2 would take 4h minimum.
         Incident SLA: resolve within 1h (enterprise SLA).
[14:43] Engineering Lead authorizes G2 override.
```

### Override Authorization Log

```json
{
  "timestamp": "2026-04-15T14:43:00Z",
  "decision": "G2 override authorized — invoice export P0 incident",
  "rationale": "P0 incident: 98% error rate on /api/v2/invoices/export since deploy 14:32. Breaking change in serializer (tax_id → fiscal_code rename, export template not updated). 3 enterprise accounts affected (>$200k ARR combined). Normal G2 timeline 4h exceeds enterprise SLA of 1h. Root cause confirmed, fix is 2-line change with no architectural risk.",
  "owner": "engineering_lead",
  "ai_service_overridden": null
}
```

---

## Phase 1 — Diagnosis

```
Root cause: Deploy #847 renamed field tax_id → fiscal_code in the InvoiceSerializer
but did not update the export template at templates/exports/invoice_xml.jinja2.

Impact scope:
  - All export requests returning 500 since 14:32
  - 3 enterprise accounts with active export jobs
  - 0 data loss (failed gracefully, no partial exports written)

Fix scope:
  - Change tax_id → fiscal_code in invoice_xml.jinja2 (line 34)
  - Change tax_id → fiscal_code in invoice_csv.jinja2 (line 18)

Rollback plan:
  - If fix introduces regression: revert Deploy #847 via CI
  - Time to rollback: ~8 minutes (automated)
```

---

## Phase 2 — Fix Build (expedited)

```
[14:48] PR #891 opened — 2-line fix in export templates
[14:49] Code Review Agent invoked (expedited)
        Output: No security issues. Template change syntactically correct.
                Flagged: missing unit test for fiscal_code field.
                         (Deferred — acceptable for expedited hotfix)
[14:52] PR reviewed by second engineer (Elena, backend)
[14:53] PR merged
```

---

## Phase 3 — Minimal Validate

```
[14:54] Release Verifier invoked (expedited)
        Output: Export endpoint tested against 3 invoice formats.
                All returning 200 with correct fiscal_code field.
                Rollback confirmed: Deploy #847 revert tested in staging.
[14:55] Product Lead: manual test with enterprise account fixture — PASS
```

---

## Phase 4 — Release

```
[14:58] Deploy #848 to production
[15:01] Error rate drops from 98% to 0.1% (residual — in-flight requests)
[15:03] Error rate: 0.1% (baseline normal)
[15:05] Three affected enterprise accounts confirmed: exports working
[15:06] Incident resolved. Total time: 29 minutes.
```

---

## Phase 5 — Recovery Documentation (completed at 09:00 next day)

### Hotfix TDN

```yaml
artifact_id: TDN-2026-hotfix-0415
artifact_type: technical_design_note
owner_role: engineering_lead
status: final
gate_stage: G2
last_reviewed_at: 2026-04-16T09:00:00Z
objective: >
  Document the hotfix for the invoice export P0 incident of 2026-04-15.
  Serializer field rename (tax_id → fiscal_code) not propagated to export templates.

what_changed: >
  invoice_xml.jinja2 line 34: tax_id → fiscal_code
  invoice_csv.jinja2 line 18: tax_id → fiscal_code

why_this_approach: >
  Minimum safe change. The field rename was the only breaking change in Deploy #847.
  No architectural changes required.

risk_at_time_of_override: >
  Low. Root cause was fully understood before override authorization.
  Fix was a string substitution in templates with no side effects.
  Rollback path (revert #847) was tested in staging before deploy.

rollback: >
  Revert Deploy #848 via CI revert command (8-minute automated process).
  Tested in staging before production deploy.

prevention: >
  Root cause: field rename in serializer not caught by existing export template tests.
  Prevention actions:
    1. Add integration test: serialize invoice → export XML/CSV → assert all fields present
       (assigned to: Elena, due: next sprint)
    2. Add pre-deploy check: grep for renamed fields in templates
       (assigned to: Engineering Lead, due: 2 sprints)
    3. PR checklist item: "If serializer field names changed, update all templates"
       (assigned to: Engineering Lead, PR template update, due: this sprint)
```

---

## Phase 6 — Incident Review (Learning)

```yaml
incident_review:
  incident_id: INC-2026-0415
  severity: P0
  timeline:
    - "14:32 — Deploy #847 introduced breaking change"
    - "14:37 — Alert triggered (5-minute monitoring window)"
    - "14:43 — G2 override authorized"
    - "15:01 — Fix deployed"
    - "15:06 — Incident resolved"
  total_time_to_resolve: "29 minutes"
  customer_impact: "3 enterprise accounts, ~45 minutes of export unavailability"

  root_cause: >
    Field rename (tax_id → fiscal_code) in InvoiceSerializer not propagated
    to export templates. Existing tests only validated serializer output,
    not the downstream template consumption of serializer fields.

  prevention_actions:
    - action: "Integration test for serializer → template pipeline"
      owner: engineering_lead
      due: "2026-04-26T00:00:00Z"
      status: in_progress
    - action: "Pre-deploy grep check for renamed fields in templates"
      owner: engineering_lead
      due: "2026-05-10T00:00:00Z"
      status: pending
    - action: "PR checklist update"
      owner: engineering_lead
      due: "2026-04-20T00:00:00Z"
      status: completed

  override_rate_check:
    rolling_13_weeks: "7.7% (2 hotfixes / 26 releases)"
    status: green
    note: "Below 10% threshold. No escalation needed."
```

---

## What this example demonstrates

1. **Override was the right call.** 29-minute resolution vs. 4-hour normal process. The SLA justified it. The root cause was understood before the override, not after.

2. **Recovery documentation converts debt to learning.** The Hotfix TDN produced 3 concrete prevention actions. Without it, the incident disappears from memory and the pattern repeats.

3. **Override rate tracking works.** 7.7% override rate — green, no escalation. If this had been the 4th hotfix in 13 weeks, the ORDITO Retrospective would have been triggered.

4. **Code Review Agent in expedited mode is still valuable.** It flagged the missing unit test in 60 seconds. We deferred it (acceptable), but we tracked it. The test was written in the next sprint.

---

## Related examples

- [ORDITO Core example (CSV import)](csv-import-enterprise-example.md)
- [ORDITO Explore example (MVP)](mvp-example.md)
- [ORDITO Scale example (legacy multi-team)](legacy-example.md)
