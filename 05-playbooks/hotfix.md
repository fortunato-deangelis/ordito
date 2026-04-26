# Playbook — ORDITO Hotfix

**Mode**: Authorized G2 override for urgent production issues.

Hotfix mode is not a separate workflow — it is a tracked exception to the Core workflow. The G2 gate is skipped under explicit authorization, and the documentation debt is repaid within 48 hours.

> **Override threshold**: if G2 overrides exceed 15% of releases in a rolling 13-week period, a mandatory ORDITO Retrospective is required. Escalate at >10% (yellow), trigger retrospective at >15% (red).

---

## Activation Criteria

Hotfix mode requires **all three** conditions:

1. Active or imminent P0 or P1 production incident
2. Normal G2 timeline (typically 24–48h) exceeds incident SLA
3. Engineering Lead or above explicitly authorizes and logs the override

**If any condition is absent**: use Core mode with an expedited timeline. Expedited Core is always preferable to Hotfix — it avoids the documentation debt.

---

## Phase Checklist

### Phase 0 — Incident Trigger

- [ ] Incident Report created or referenced (external incident tracker OK)
- [ ] Severity confirmed: P0 or P1
- [ ] Engineering Lead contacted and override authorization obtained
- [ ] Override authorization logged immediately (see format below)
- [ ] Scope of fix confirmed: minimal change, no new features

**Override authorization log** (in the artifact's `decision_log`):
```json
{
  "timestamp": "ISO 8601 timestamp",
  "decision": "G2 override authorized for hotfix — [incident description]",
  "rationale": "P0 incident affecting [scope]. Normal G2 timeline [X]h exceeds incident SLA [Y]h. Root cause identified: [brief description]. Risk of further spread: [assessed risk].",
  "owner": "engineering_lead",
  "ai_service_overridden": null
}
```

---

### Phase 1 — Diagnosis (expedited)

- [ ] Root cause confirmed (not just symptoms)
- [ ] Impact scope assessed (how many users/systems affected)
- [ ] Fix scope defined: minimum change to resolve, nothing more
- [ ] Rollback plan identified before writing any code

---

### Phase 2 — Fix Build (expedited)

- [ ] Code Review Agent invoked (expedited mode — not blocking, but must run)
- [ ] Fix PR scoped to minimum change
- [ ] Feature flag used if the fix can be deployed behind a flag
- [ ] Code Review Agent flags reviewed — blockers addressed, cosmetic issues deferred
- [ ] At least one human code reviewer (no solo hotfix merges)

---

### Phase 3 — Minimal Validate (expedited)

- [ ] Release Verifier invoked (expedited)
- [ ] Minimal Release Checklist: AC for the fix, rollback confirmed, monitoring confirmed
- [ ] Happy path tested
- [ ] Rollback tested (not just documented)
- [ ] `status: ready_for_release`

---

### Phase 4 — Release

- [ ] Deploy with active monitoring
- [ ] On-call notified and watching dashboards
- [ ] Rollback trigger defined: "If X happens within Y minutes, roll back"
- [ ] Incident Report updated with fix deployed timestamp

---

### Phase 5 — Recovery Documentation (within 48h, non-negotiable)

- [ ] **Hotfix TDN** produced (abbreviated — see format below)
- [ ] **Override log** updated in artifact's `decision_log` with full rationale
- [ ] **Root cause** documented in Incident Report
- [ ] **Mitigation**: what prevents this class of incident from recurring?
- [ ] Override rate metric updated

**Hotfix TDN minimum**:
```yaml
artifact_id: "TDN-YYYY-NNN-hotfix"
artifact_type: technical_design_note
owner_role: engineering_lead
status: final
gate_stage: G2
objective: "Document the hotfix for [incident reference] — [one sentence description]"

what_changed: |
  [What code was changed and why]

why_this_approach: |
  [Why this was the minimum safe fix]

risk_at_time_of_override: |
  [What the assessed risk was when G2 was bypassed]

rollback: |
  [How to roll back if the fix causes secondary issues]

prevention: |
  [What structural change prevents recurrence — or why this is a one-time occurrence]
```

---

### Phase 6 — Learn (incident review)

- [ ] Dashboard Narrator invoked on incident metrics (if applicable)
- [ ] Incident Review produced: timeline, impact, root cause, fix, prevention
- [ ] Prevention actions assigned with owners
- [ ] **Override rate check**: is the 13-week rolling rate above 10%?
  - 10–15%: yellow — discuss in next ORDITO Retrospective
  - >15%: red — schedule mandatory retrospective within 2 weeks

---

## Override Rate Monitoring

```
G2_override_rate = count(hotfix_releases) / count(total_releases) — rolling 13 weeks
```

Track this metric in your team's quarterly ORDITO Retrospective. A high rate is diagnostic:

| Root cause | Signal |
|---|---|
| Gates too slow | Expedite gate process, not override it |
| Documentation requirements too heavy | Reduce required fields in TDN for lower-risk initiatives |
| Team under structural pressure | Escalate to leadership — this is a system problem |
| Legitimate incidents | No action needed — the override system is working as designed |

---

## What is NOT allowed in Hotfix mode

- **New features** bundled with the fix (scope creep under cover of urgency)
- **Solo merges** without at least one human reviewer
- **Skipping recovery documentation** — 48h deadline is non-negotiable
- **Activating hotfix mode for non-P0/P1 issues** — expedited Core instead

---

## When to escalate to Core mode

If the hotfix reveals a systemic problem requiring architectural changes, stop the Hotfix playbook and open a new Core or Scale initiative. Document the transition:

```json
{
  "timestamp": "ISO 8601 timestamp",
  "decision": "Hotfix escalated to Core mode — systemic fix required",
  "rationale": "[Why the hotfix scope is insufficient and a systemic fix is needed]",
  "owner": "engineering_lead"
}
```
