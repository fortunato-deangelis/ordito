# Playbook — ORDITO Explore

**Mode**: New MVP, uncertain market, explicit kill criteria, narrow rollout.

Use Explore mode when: you are testing a new market hypothesis, building a first version of a capability with no prior data, or the team cannot predict if users will adopt the feature.

Key difference from Core: **kill criteria are first-class citizens**. An initiative that exits via Kill is a success — it freed resources before a larger investment was made.

---

## Phase Checklist

### Phase 0 — Strategic Trigger

- [ ] Opportunity Brief created (not Initiative Charter)
- [ ] Kill criteria defined explicitly — at least 2 measurable thresholds
- [ ] `owner_role: founder` or `sponsor` assigned
- [ ] Exploration budget and time box defined (max time before kill decision)
- [ ] **G0 decision includes kill threshold sign-off**

**Kill criteria template**:
```yaml
kill_criteria:
  - metric: "weekly_active_users"
    threshold: "<50 in beta cohort after 4 weeks"
  - metric: "conversion_rate"
    threshold: "<2% from trial to paid"
  - trigger: "3 consecutive weeks of declining usage"
```

---

### Phase 1 — Intake (lightweight)

- [ ] Feature Request created — minimum version only
- [ ] Intake Coach invoked — FRQ score noted, not blocking at 6.0 threshold
- [ ] Focus on: hypothesis, user, and primary success metric
- [ ] `status: ready_for_prioritization`

**Reduced minimum for FRQ in Explore mode**:
- `problem`: specific enough to test
- `user`: target persona
- `value`: primary success metric (one measurable outcome)
- Acceptance criteria: optional (hypothesis-driven, not AC-driven)

---

### Phase 2 — Prioritization (lightweight)

- [ ] Prioritization Copilot invoked — SAS only (skip RCS if team is small)
- [ ] Kill threshold alignment confirmed with Founder/Sponsor
- [ ] Time box confirmed

---

### Phase 3 — Discovery / Explore Sprint

- [ ] Brief Builder invoked — MVP Frame produced (not full Brief Pack)
- [ ] Research Synthesizer invoked if any user data exists
- [ ] **MVP Frame minimum**: hypothesis, primary metric, user scenario, kill criteria reference
- [ ] In-scope / out-of-scope tightly defined (resist scope creep)
- [ ] `status: ready_for_g1`

**MVP Frame vs. Feature Brief Pack**:

| | MVP Frame (Explore) | Feature Brief Pack (Core) |
|---|---|---|
| Required | hypothesis + primary metric | Full ACs + tracking plan |
| ACs | Optional | Required ≥3 |
| Dependencies | Flagged if blocking | Fully mapped |
| Tracking plan | Primary metric only | Events + KPIs |

---

### Gate G1 — Commitment (lightweight)

**Facilitator**: Product Lead or Founder
**Required**: hypothesis is testable, primary metric is measurable

Decision tree:
```
MVP Frame has testable hypothesis?
  → YES: Time box and kill criteria defined?
      → YES: GO
      → NO: define them now (5 min) then GO
  → NO: HOLD (clarify hypothesis)
```

- [ ] G1 decision logged (may be async if team is ≤3 people)

---

### Phase 4 — Solution Design (lightweight)

- [ ] Lightweight Design Spec: key user flow only (not full spec)
- [ ] Design Critic invoked for primary flow
- [ ] No TDN required unless there are systemic risks
- [ ] `status: ready_for_g2` (or skip G2 if scope is very narrow)

---

### Gate G2 — Build-ready (optional for narrow scope)

G2 is optional in Explore mode **only if**:
- The build touches no production systems shared with other teams
- The release will be narrow (beta / limited cohort only)
- There are no compliance constraints

If any condition is absent, run G2 as in Core mode.

---

### Phase 5 — Build

- [ ] Build is minimal — only what's needed to test the hypothesis
- [ ] Feature flag mandatory (enables narrow rollout)
- [ ] Code Review Agent active
- [ ] No over-engineering: if it takes more than planned, cut scope not quality

---

### Phase 6 — Validate

- [ ] Minimal Release Checklist: primary metric instrumented, rollback confirmed
- [ ] Test Case Generator invoked for happy path only
- [ ] Release Verifier invoked

---

### Phase 7 — Release (narrow rollout only)

- [ ] Rollout: beta / limited cohort — **never dark launch as default in Explore**
- [ ] Cohort selection documented (who gets access and why)
- [ ] Monitoring of kill criteria metrics starts immediately

---

### Phase 8 — Learn / Decide (pivot · persevere · kill)

- [ ] Dashboard Narrator invoked at defined checkpoints (aligned with kill criteria timeline)
- [ ] MVP Decision Review produced (not full Impact Review)
- [ ] Kill criteria evaluated against actuals

**Decision tree for Learning Gate in Explore**:
```
Kill criteria triggered?
  → YES: KILL — document sunset, free resources, share learnings
  → NO: Primary metric on track?
      → YES, at target: PERSEVERE — consider graduating to Core mode
      → YES, growing: PERSEVERE with defined next milestone
      → NO, but signal: PIVOT — reframe hypothesis, new explore cycle
      → NO, no signal: KILL (set time box, don't extend indefinitely)
```

- [ ] Decision logged: PIVOT / PERSEVERE / KILL
- [ ] If PIVOT: new Opportunity Brief created
- [ ] If PERSEVERE: graduation to Core mode documented (if scope expands)
- [ ] If KILL: sunset documented, learnings shared with team

---

## Explore mode — what's NOT required

- Full Feature Brief Pack (MVP Frame is sufficient)
- Technical Design Note (only if systemic risks exist)
- Staff Engineer sign-off
- Full dependency mapping
- G2 gate (optional for narrow scope)
- 30-day Impact Review (replaced by MVP Decision Review at defined kill criteria checkpoints)

---

## Explore mode — what's non-negotiable

- Kill criteria at phase 0 — if absent, this is not Explore mode
- Feature flag before release — no unreversible rollout
- Learning Gate decision documented — kill is success, not failure
- Narrow rollout — full release without validation is Core mode, not Explore
