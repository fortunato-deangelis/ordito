# Playbook — ORDITO Scale

**Mode**: Complex legacy systems, multi-team coordination, compliance requirements, architecture impact.

Use Scale mode when: the initiative touches multiple teams, legacy systems, regulated data, or requires architecture decisions that affect more than one product area.

Key difference from Core: **traceability and dependency control are first-class requirements**. The overhead is front-loaded in phases 3–4 to prevent the back-loaded cost of broken dependencies at G2 or production incidents at release.

---

## Phase Checklist

### Phase 0 — Strategic Trigger

- [ ] Initiative Charter created with compliance flags
- [ ] Regulatory constraints explicitly declared in `constraints`
- [ ] Cross-team impact flagged (which teams are affected)
- [ ] Staff Engineer identified and informed
- [ ] Budget includes coordination overhead (typically +30% vs. Core estimate)
- [ ] **G0 decision**: includes compliance pre-assessment if regulated scope

---

### Phase 1 — Intake

- [ ] Feature Request created — full version with compliance context
- [ ] Intake Coach invoked — FRQ score ≥ 7.0 required (higher bar for Scale)
- [ ] Initial dependency flags noted (which teams will need to be involved)
- [ ] `status: ready_for_prioritization`

---

### Phase 2 — Prioritization

- [ ] Prioritization Copilot invoked — full SAS + RCS
- [ ] **Dependency flags added to RCS assessment**
- [ ] Cross-initiative dependencies mapped at high level
- [ ] Compliance scope confirmed by Compliance team or Engineering Lead
- [ ] Staff Engineer informed and available for phase 3

---

### Phase 3 — Discovery

- [ ] Brief Builder invoked — full Feature Brief Pack
- [ ] Research Synthesizer invoked
- [ ] **Compliance Checker invoked** — compliance assessment produced
- [ ] Cross-team coordination meetings scheduled before G1
- [ ] Dependency matrix: preliminary version (full version at phase 4)
- [ ] All compliance constraints documented in `constraints`
- [ ] `status: ready_for_g1`

**Compliance assessment format** (embedded in Brief Pack):
```yaml
compliance_assessment:
  service: compliance-checker
  invoked_at: "ISO 8601 timestamp"
  regulations: ["GDPR", "SOC2", "eInvoicing"]
  findings:
    - category: "data_retention"
      risk: medium
      mitigation: "Audit log with 7-year retention required"
    - category: "pii_handling"
      risk: high
      mitigation: "PII must be masked in error reports"
  sign_off_required: true
  sign_off_owner: compliance_team
```

---

### Gate G1 — Commitment

Same as Core, plus:
- [ ] Dependency matrix preliminary version reviewed
- [ ] Compliance assessment reviewed by Compliance team
- [ ] Cross-team owners confirmed (not just identified)
- [ ] Staff Engineer participates in G1 for architecture impact assessment

---

### Phase 4 — Solution Design

- [ ] Design Spec produced by UX Lead
- [ ] Design Critic invoked
- [ ] Technical Design Note produced by Engineering Lead
- [ ] **Dependency Mapper invoked** — full dependency matrix produced
- [ ] **Solution Mapper invoked** — system boundary map
- [ ] All DEP entries in dependency matrix have named owners and blocking gates
- [ ] Rollback procedure per dependency documented
- [ ] Staff Engineer reviews TDN
- [ ] `status: ready_for_g2`

**Dependency matrix format**:
```yaml
dependency_matrix:
  - id: DEP-001
    type: team
    name: "Team B — Billing API"
    integration_point: "batch insert endpoint"
    risk: medium
    owner: engineering_lead_team_b
    blocking_gate: G2
    status: coordinated
  - id: DEP-002
    type: system
    name: "Legacy Audit Module"
    integration_point: "import registration hook"
    risk: high
    owner: staff_engineer
    blocking_gate: G2
    status: pending_confirmation
```

---

### Phase 4b — Architecture Sign-off (Scale only, required)

- [ ] Staff Engineer reviews TDN and dependency matrix
- [ ] Architecture sign-off produced
- [ ] Conditions documented if conditional approval
- [ ] **No build starts until architecture sign-off is complete**

**Architecture sign-off format**:
```yaml
architecture_signoff:
  artifact_ref: "TDN-YYYY-NNN"
  reviewer: staff_engineer
  signed_at: "ISO 8601 timestamp"
  verdict: "approved | approved_with_conditions | rejected"
  conditions:
    - "Load test: 50k rows in <60s required before G2"
    - "DEP-002 rollback procedure must be documented"
```

---

### Gate G2 — Build-ready

Same as Core, plus:
- [ ] Architecture sign-off present (required)
- [ ] All DEP entries with `blocking_gate: G2` have `status: coordinated`
- [ ] Compliance sign-off present (if `sign_off_required: true`)
- [ ] Rollback plan documented for each critical dependency

---

### Phase 5 — Build

- [ ] Code Review Agent active on all PRs
- [ ] **Cross-team PRs reviewed by respective Engineering Leads**
- [ ] Staff Engineer available for cross-team unblocking
- [ ] Dependency status updates tracked weekly in Sprint Sync
- [ ] Compliance Checker invoked for any code touching regulated data

---

### Phase 6 — Validate

- [ ] Test Case Generator invoked — Scale mode: edge cases include cross-team failure scenarios
- [ ] Release Verifier invoked
- [ ] **Compliance Checker invoked** — final compliance check
- [ ] Load/performance testing completed
- [ ] Cross-team rollback tested (not just documented)
- [ ] Staged rollout plan finalized: dark → beta → full with rollback SLA per stage
- [ ] `status: ready_for_release`

---

### Release Gate

Same as Core, plus:
- [ ] Staff Engineer confirms rollback readiness for architecture-level changes
- [ ] Cross-team monitoring setup confirmed
- [ ] Compliance team sign-off (if required)

---

### Phase 7 — Release (staged, always)

- [ ] Dark launch (internal only) — minimum 48h monitoring
- [ ] Beta rollout (limited cohort) — minimum 1 week monitoring
- [ ] Full rollout — after beta success criteria met
- [ ] Rollback SLA documented per stage: "If X happens, rollback within Y minutes"
- [ ] Cross-team on-call coordination confirmed

---

### Phase 8 — Learn

- [ ] Dashboard Narrator invoked at 7, 14, 30 days
- [ ] Impact Review produced
- [ ] **Architecture retrospective**: what systemic decisions held up, what created risk
- [ ] Dependency Matrix updated with "post-release status" (resolved/escalated)
- [ ] Compliance audit trail closed

---

## Scale mode — what's NOT required beyond Core

All Core requirements apply, plus:

| Addition | When required |
|---|---|
| Compliance Checker (phase 3 + 6) | Regulatory constraints declared in Charter |
| Dependency Mapper (phase 4) | >1 cross-team dependency |
| Staff Engineer architecture sign-off (phase 4b) | Always in Scale mode |
| Staged rollout (dark → beta → full) | Always in Scale mode |
| Architecture retrospective (phase 8) | Always in Scale mode |
| Compliance audit trail | Regulated scope |

---

## Switching from Core to Scale

If an initiative starts in Core and grows to Scale scope (new cross-team dependencies or compliance triggers discovered), the mode switch must be documented:

1. Add a `decision_log` entry: "Mode upgraded from Core to Scale — reason: [specific trigger]"
2. Activate Dependency Mapper and schedule Staff Engineer sign-off before proceeding
3. Notify all cross-team owners who weren't previously in scope
4. Do not proceed to G2 until the dependency matrix is complete
