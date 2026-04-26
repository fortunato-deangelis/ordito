# ORDITO Integration — Jira

This guide maps ORDITO's artifact schema to Jira fields, workflow states, and automation rules. You do not need to replace your existing Jira setup — you extend it.

Tested with: Jira Cloud (Next-gen and Classic projects). Field names may vary slightly in Server/Data Center.

---

## Before you start

You need:
- A Jira project for the team adopting ORDITO (one project per product team works best)
- Admin rights to add custom fields and edit workflows
- Approximately 2–3 hours for initial setup

You do not need:
- A new Jira project (ORDITO works on top of your existing one)
- To change how engineers manage their sprint tickets
- Any plugins or marketplace apps

---

## Field mapping

| ORDITO schema field | Jira implementation | Type | Notes |
|---|---|---|---|
| `artifact_id` | Issue key (auto) + Label | Text label | Use labels like `INIT-2026-014` to maintain ORDITO IDs alongside Jira keys |
| `artifact_type` | Issue Type | Single select | Create custom Issue Types: Initiative Charter, Feature Request, Feature Brief Pack, Design Spec, TDN, Release Checklist, Impact Review |
| `owner_role` | Custom field: ORDITO Role | Single select | Values: sponsor, product\_lead, ux\_lead, engineering\_lead, qa\_release\_lead, data\_analytics, staff\_engineer, founder |
| `status` | Status (workflow) | Workflow state | See workflow mapping below |
| `objective` | Summary or Description | Text | Use Summary for ≤100 chars; use Description for full objective |
| `acceptance_criteria` | Custom field: Acceptance Criteria | Paragraph | One AC per line in `Given/When/Then` format. Or use sub-tasks (one per AC) |
| `gate_stage` | Custom field: Gate Stage | Single select | Values: G0, G1, G2, release, learning |
| `risk_band` | Priority (remapped) or custom field | Single select | Values: low, medium, high, critical — remap Jira Priority if your team doesn't use it for severity |
| `upstream_refs` | Issue Links — "is informed by" | Issue link | Create a custom link type "informed by / informs" |
| `downstream_refs` | Issue Links — "informs" | Issue link | Same link type, reverse direction |
| `decision_log` | Comments (formatted) | Comment | Use the comment template below |
| `ai_services_used` | Custom field: AI Services Used | Multi-select | Values: the 12 canonical service names |
| `last_reviewed_at` | Updated date (auto) or custom field | Date | Built-in Updated field works; add custom field if you need to distinguish "reviewed" from "edited" |
| `tags` | Labels | Multi-select | Use Jira Labels directly |
| `telemetry_plan` | Custom field: Tracking Plan | Paragraph | Paste the events + KPIs as structured text |

---

## Issue type setup

Create these Issue Types in your Jira project (Project Settings → Issue Types):

| Issue Type | Maps to artifact_type | Icon suggestion |
|---|---|---|
| Initiative Charter | `initiative_charter` | Flag |
| Feature Request | `feature_request` | Lightning bolt |
| Feature Brief Pack | `feature_brief_pack` | Document |
| Design Spec | `design_spec` | Pencil |
| Technical Design Note | `technical_design_note` | Wrench |
| Release Checklist | `release_checklist` | Checklist |
| Impact Review | `impact_review` | Chart |
| Opportunity Brief | `opportunity_brief` | Compass |
| MVP Frame | `mvp_frame` | Rocket |

Tip: keep your existing Epic/Story/Task/Bug types unchanged. ORDITO Issue Types are for gate artifacts, not for engineering tasks. They sit above the sprint.

---

## Workflow state mapping

Map Jira workflow states to ORDITO `status` values:

| ORDITO status | Jira state | Notes |
|---|---|---|
| `draft` | To Do | Default initial state |
| `in_review` | In Review | Triggered when shared for review |
| `ready_for_g1` | Ready for G1 | Add as a dedicated state — this is the gate signal |
| `ready_for_g2` | Ready for G2 | Same |
| `ready_for_release` | Ready for Release | Same |
| `approved` | Done (Approved) | Sub-status of Done, or a separate state |
| `rejected` | Done (Rejected) | Sub-status of Done |
| `archived` | Archived | Add a terminal state |
| `in_progress` | In Progress | Standard Jira state |
| `final` | Done | For Impact Reviews and closed artifacts |

Workflow transitions to add:
- `draft` → `in_review` (button: "Send for Review")
- `in_review` → `ready_for_g1` (button: "Mark Ready for G1") — restricted to product\_lead
- `ready_for_g1` → `approved` or `rejected` — restricted to gate decision-maker
- `approved` → `in_progress` (automatic, or manual "Start Build")

---

## decision_log — comment template

When logging a decision or AI override in Jira comments, use this format:

```
[DECISION LOG]
Timestamp: YYYY-MM-DDTHH:MM:SSZ
Decision: <what was decided>
Rationale: <why>
Owner: <role, e.g. product_lead>
AI service overridden: <canonical name, or "none">
```

Tip: create a Jira comment template or text expander shortcut for this format. The Product Lead uses this on every gate decision and every AI override.

---

## Linking artifacts (upstream_refs / downstream_refs)

Create a custom Issue Link type:

- **Name**: "ORDITO: informs / is informed by"
- **Outward**: informs
- **Inward**: is informed by

Use this link to connect:
- Initiative Charter → Feature Request (Charter informs FRQ)
- Feature Request → Feature Brief Pack (FRQ informs Brief Pack)
- Feature Brief Pack → Design Spec (Brief Pack informs Design Spec)
- Feature Brief Pack → TDN (Brief Pack informs TDN)
- Release Checklist → Impact Review (Checklist informs Impact Review)

This maintains the `upstream_refs` / `downstream_refs` traceability without JSON.

---

## Automation rules

These Jira automation rules reduce manual work:

### 1 — Auto-link Feature Request to Initiative Charter

**Trigger**: Issue created with type "Feature Request"
**Action**: Prompt for parent Initiative Charter ID → create "is informed by" link

### 2 — Gate decision notification

**Trigger**: Status changes to `ready_for_g1`, `ready_for_g2`, or `ready_for_release`
**Action**: Notify the gate decision-maker role (based on ORDITO Role field)

### 3 — Impact Review reminder

**Trigger**: Release Checklist status → Done (Approved) + 30 days elapsed
**Action**: Create an Impact Review issue linked to the Release Checklist, assigned to product\_lead

### 4 — AI override comment validator (optional)

**Trigger**: Comment added containing "[DECISION LOG]"
**Condition**: AI service overridden field is not empty
**Action**: Post a comment reminder: "Override logged. Remember to update `ai_services_used` if the service output was not used."

---

## Maintaining JSON artifacts alongside Jira

Jira is your operational tool. The JSON Schema is your machine-readable contract. You need both.

**Recommended workflow**:

1. Work in Jira daily — create issues, update status, log decisions in comments
2. At gate points (G1, G2, Release), export the relevant Jira issue fields to a JSON artifact conforming to `schemas/artifact.schema.json`
3. Commit the JSON to your repo in `03-artifacts/` — this is what CI validates

You can automate step 2 with a simple script that reads the Jira API and produces the JSON. A reference script will be available in v1.5.

Until then: the manual export takes ~10 minutes per artifact and should be done by the artifact owner at each gate.

---

## Limitations

- **decision_log is not queryable**: Jira comments are not structured data. If you need to query override rates by service (Principle #3), you will need to export comments to a spreadsheet or use a Jira plugin.
- **acceptance_criteria in Paragraph fields are not validated**: Jira cannot enforce given/when/then format. The Intake Coach prompt does this validation at intake time.
- **Cross-project linking**: if your team works across multiple Jira projects, upstream_refs / downstream_refs linking requires Jira cross-project link configuration.
- **Status mapping is manual**: Jira does not automatically update `status` in the JSON artifact. The gate owner is responsible for keeping the JSON and the Jira status in sync.
