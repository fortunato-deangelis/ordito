# Playbook — ORDITO Core

**Mode**: Existing product, stable team, full gates, standard traceability.

Use Core mode when: the product is live, the team is stable, the initiative is a new feature or significant evolution of an existing one.

---

## Phase Checklist

### Phase 0 — Strategic Trigger

- [ ] Initiative Charter created with all required fields
- [ ] `owner_role: sponsor` assigned
- [ ] `risk_band` assessed
- [ ] KPIs defined with baseline and target
- [ ] Budget and deadline declared
- [ ] **G0 decision**: GO / PARKING LOT / REJECTED — logged in `decision_log`

---

### Phase 1 — Intake

- [ ] Feature Request created from Initiative Charter
- [ ] `upstream_refs` includes Initiative Charter ID
- [ ] Intake Coach invoked — FRQ score logged
- [ ] Weak fields addressed or overrides documented in `decision_log`
- [ ] FRQ score ≥ 6.0 before proceeding (or override documented)
- [ ] `status: ready_for_prioritization`

**Minimum valid FRQ**:
- `problem`: specific use scenario, not generic description
- `user`: named persona or role
- `value`: measurable outcome
- `constraints`: aligned with Charter constraints
- `acceptance_criteria`: at least 3 ACs in given/when/then format

---

### Phase 2 — Prioritization

- [ ] Prioritization Copilot invoked — SAS and RCS calculated
- [ ] Overlap with other initiatives checked
- [ ] `risk_band` confirmed
- [ ] Effort band assigned
- [ ] Discovery assignment confirmed in Intake Review ritual

---

### Phase 3 — Discovery

- [ ] Brief Builder invoked — draft Feature Brief Pack produced
- [ ] Research Synthesizer invoked (if interview/ticket data available)
- [ ] Human review of Brief Pack completed
- [ ] All ACs in given/when/then format
- [ ] In-scope and out-of-scope explicitly documented
- [ ] Dependencies identified
- [ ] Tracking plan includes events and KPIs
- [ ] `status: ready_for_g1`

---

### Gate G1 — Commitment

**Facilitator**: Product Lead
**Required co-signature**: Engineering Lead

Decision tree:
```
Brief Pack complete and ACs clear?
  → YES: Risk band acceptable?
      → YES: GO
      → NO (high risk): GO REDUCED (trimmed scope) or HOLD
  → NO: HOLD (return to Discovery with specific gaps noted)
  → Fundamentally flawed: NO-GO (archive)
```

- [ ] G1 ritual held (see `02-operating-model/rituals.md`)
- [ ] Decision logged: `gate: G1`, `decision`, `decided_by`, `rationale`
- [ ] Conditions documented if GO REDUCED

---

### Phase 4 — Solution Design

- [ ] Design Spec produced by UX Lead (assisted by Design Critic)
- [ ] Design Critic invoked — inconsistencies flagged and addressed
- [ ] Technical Design Note produced by Engineering Lead (assisted by Solution Mapper)
- [ ] All ACs covered in both Design Spec and TDN
- [ ] Dependencies confirmed with cross-team owners
- [ ] Test plan seeded in TDN
- [ ] `status: ready_for_g2`

---

### Gate G2 — Build-ready

**Facilitator**: Engineering Lead

Decision tree:
```
TDN complete and all ACs covered in design?
  → YES: Dependencies resolved?
      → YES: Load/performance risks addressed?
          → YES: READY
          → NO: NOT READY (conditions)
      → NO: NOT READY (dependency block)
  → NO: NOT READY (design gaps)
  → Active P0 incident: HOTFIX OVERRIDE (see swimlane-hotfix.md)
```

- [ ] G2 ritual held
- [ ] Decision logged: `gate: G2`, `decision`, `decided_by`, `rationale`
- [ ] Conditions documented if conditional approval

---

### Phase 5 — Build

- [ ] Code Review Agent active on all PRs
- [ ] AC traceability verified (each PR linked to ACs)
- [ ] Feature flag configured (if applicable)
- [ ] Code Review Agent flags reviewed — addressed or overridden with rationale
- [ ] Weekly Sprint Sync held

---

### Phase 6 — Validate

- [ ] Test Case Generator invoked from ACs + edge cases
- [ ] All test cases executed
- [ ] Release Verifier invoked on Release Checklist
- [ ] All blockers resolved
- [ ] Rollback procedure documented
- [ ] Monitoring and alerting configured
- [ ] `status: ready_for_release`

---

### Release Gate

**Facilitator**: QA / Release Lead

- [ ] Release Gate ritual held
- [ ] Rollout tier decided: dark / beta / full
- [ ] Release Verifier output reviewed
- [ ] RELEASE decision logged

---

### Phase 7 — Release

- [ ] Rollout executed according to Release Checklist
- [ ] Monitoring active during rollout
- [ ] On-call notified
- [ ] Rollout tier progression documented (dark → beta → full timing)

---

### Phase 8 — Learn

- [ ] Dashboard Narrator invoked at 7, 14, 30 days
- [ ] Impact Review produced at 30 days minimum
- [ ] All Charter KPIs have results
- [ ] Learnings documented with action items
- [ ] Learning Gate decision logged: VALUE CONFIRMED / PIVOT / KILL
- [ ] Next actions documented (new Charters if applicable)

---

## Minimum valid artifacts by gate

| Gate | Required artifacts | Minimum fields |
|---|---|---|
| G0 | Initiative Charter | `artifact_id`, `artifact_type`, `owner_role`, `status: approved`, `objective`, `last_reviewed_at`, `risk_band` |
| G1 | Feature Brief Pack | Above + `acceptance_criteria` (≥3), `upstream_refs`, `constraints`, `gate_stage: G1` |
| G2 | Design Spec + TDN | Above + `status: ready_for_g2`, `gate_stage: G2` |
| Release | Release Checklist | `status: ready_for_release`, all ACs verified, rollback documented |
| Learning | Impact Review | KPI results for all Charter KPIs, learnings, next action |

---

## Core mode — what's NOT required

To avoid over-engineering:
- Dependency mapper (optional unless >2 cross-team dependencies)
- Compliance checker (optional unless regulatory constraints declared in Charter)
- Staff Engineer sign-off (only required in Scale mode)
- Exploration sprint (only required in Explore mode)
