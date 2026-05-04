# ORDITO Antipatterns

This is the catalog of failure modes ORDITO has seen — or should expect to see — in adoption. Each entry is structured: **what it looks like**, **why it happens**, **how to detect it**, **how to recover**.

Antipatterns are not moral failures. They are predictable responses to pressure. The framework is designed to surface them, not to shame people into avoiding them.

---

## Process antipatterns

### AP-001 — The gate that always says GO

**Looks like**: G1, G2 or Release decisions are documented as "GO" 95%+ of the time. No HOLD. No GO REDUCED. No NO-GO.

**Why**: Saying NO is socially expensive. Reducing scope feels like failure. The gate ritual exists, the gate decision does not.

**Detect**: Count gate outcomes per quarter. If GO rate >90% across 10+ initiatives, the gate is decorative.

**Recover**: At the next ORDITO Retrospective, look at the last 5 GO decisions and ask: would we do them again? If <50% yes, the gate criteria are too lax. Tighten the FRQ score threshold (e.g. ≥7.0 to enter G1) or require explicit risk-band acknowledgement before GO.

---

### AP-002 — Decision_log as box-ticking

**Looks like**: Every artifact has a `decision_log` entry. Every entry says "approved by team" with no rationale, or generic phrases like "aligned with strategy".

**Why**: Filling fields was the goal, not capturing judgment. The team optimized for schema validation, not learning.

**Detect**: Pick 3 random `decision_log` entries from last quarter. If a new joiner cannot reconstruct *why* the decision was made, the log is theater.

**Recover**: Require `rationale` to start with "Because…" and reference at least one constraint or KPI by name. The Intake Coach prompt should flag rationales under 50 characters as weak.

---

### AP-003 — Review timestamp without review

**Looks like**: `human_reviewer: product_lead` is present on every AI service invocation. `last_reviewed_at` is updated. But override rate is near 0% across all services and gate decisions consistently echo AI output verbatim.

**Why**: The reviewer is overloaded, trusts the AI, or has no context to disagree. The field is filled because the schema requires it.

**Detect**: AI service override rate <5% over a quarter on services with `autonomy_tier: HITL` is suspicious — not a sign of perfect prompts. Combine with: average time between AI invocation and human review (if <60 seconds, no real review happened).

**Recover**: Move the service to `autonomy_tier: HOTL` (human-on-the-loop) with sampled audit instead of every-output review. Or reduce the volume routed to that reviewer.

---

### AP-004 — Mode drift

**Looks like**: An initiative starts as Explore (MVP Frame, kill criteria, lightweight gates). Three months in, it has a full Brief Pack, dependency matrix, compliance check, and Staff Engineer sign-off — but still calls itself Explore.

**Why**: Scope grew without explicit mode change. The team accumulated Core overhead while keeping Explore expectations (no firm KPI, kill option still open).

**Detect**: Count artifacts produced per initiative. If an Explore initiative has >5 artifact types, it has migrated.

**Recover**: At the next G1 or G2, declare mode change explicitly. Update the Initiative Charter `mode` field. Add a `decision_log` entry. The team owes a clear answer: are we still validating, or are we delivering?

---

### AP-005 — Gate skipped under pressure (without override log)

**Looks like**: A release ships without a Release Gate ritual. No BLOCKER, no decision logged. The Release Checklist is filled in retroactively.

**Why**: A deadline, an exec ask, a competitor announcement. Speed beat structure.

**Detect**: For each release, check whether the Release Checklist `last_reviewed_at` is *before* deployment. If after, the gate ran retroactively.

**Recover**: Treat any skipped gate as a Hotfix Override. Backfill the documentation within 48h per `01-framework/principles.md` Override Policy. If the pattern repeats >15% in a quarter, mandatory framework retrospective.

---

### AP-006 — Learning ritual gets dropped

**Looks like**: Releases ship. Impact Reviews are scheduled but not held. KPIs are eyeballed in a slack thread. The artifact never reaches `final` status.

**Why**: It feels like the work is done at release. The next initiative is already loud. Learning has no deadline pressure.

**Detect**: `learning_loop_completion_rate` < 70% over 60 days. This is the framework's compounding-value metric. If it drops, the framework has stopped learning.

**Recover**: Make Impact Review creation automatic at T+7 (Jira automation rule). Make the Learning Gate decision a 15-minute default-on calendar event for every Product Lead at T+30. Friction reduction beats discipline campaigns.

---

### AP-007 — Empty cells become loaded

**Looks like**: A Sponsor starts writing FRQs directly. An Engineering Lead starts writing Design Specs. The Product Lead is bypassed.

**Why**: A specific person is faster, more available, or more trusted by the requester. The role assignment is unclear or seems bureaucratic.

**Detect**: Compare `owner_role` per artifact against the role specification in `02-operating-model/roles.md`. Repeated mismatches signal lane-jumping.

**Recover**: Don't reject the artifact — coach. Ask: who else needs to see this? The answer reveals the role that was bypassed. Loop them in for the next iteration; the warp tightens itself when the structure proves useful.

---

## AI service antipatterns

### AP-008 — AI bypasses the actor

**Looks like**: Brief Builder produces a Brief Pack. Nobody adapts it. It goes straight to G1 with `human_reviewer: product_lead` filled in but no actual diff between draft and approved version.

**Why**: The output looked good enough. The reviewer was busy. The schema didn't enforce real review.

**Detect**: Compare the AI output (logged) against the artifact that reached the gate. If they are identical and `human_reviewer` is set, the review was nominal.

**Recover**: Require at least one explicit `decision_log` entry per AI-generated artifact saying what the human added, removed, or changed. If nothing changed, that itself must be the rationale ("AI draft accepted as-is because…").

---

### AP-009 — Compounding errors across the chain

**Looks like**: Intake Coach scores an FRQ generously. Brief Builder builds on the FRQ. Design Critic critiques the design against ACs that are themselves wrong. Code Review Agent traces PRs against malformed ACs. The whole chain is internally consistent — and pointing in the wrong direction.

**Why**: Each service treats its upstream input as authoritative. No service is responsible for cross-artifact consistency. AI chains reinforce, they do not contradict.

**Detect**: Run the `consistency-checker` adversarial service at G1 and G2 (see `04-ai-service-mesh/consistency-checker.md`). If it routinely finds inconsistencies the per-phase services miss, the chain has compounding-error risk.

**Recover**: Always run an adversarial check at gates, not just per-phase critique. The adversarial agent's job is to look across artifacts, not within one.

---

### AP-010 — Override silenziato

**Looks like**: A Product Lead disagrees with the Prioritization Copilot SAS score. They quietly use a different number. No `decision_log` entry. No `ai_service_overridden` flag.

**Why**: Logging an override felt like extra work. The disagreement was "obvious".

**Detect**: Compare AI service output (in invocation log) with the value that ended up in the artifact. If they differ and there is no override entry, the override is silent.

**Recover**: Silent overrides are the most expensive ones — they hide the highest-value tuning signal. Move the service to a CLI/automation that requires the override field to be filled before saving. If the team protests, the prompt is wrong; tune it, don't shame them.

---

### AP-011 — Prompt evolves, artifacts don't

**Looks like**: A prompt is updated to v2.0 in the registry. Existing artifacts still cite the service but with no `prompt_version` field. The audit trail mixes outputs from incompatible prompt versions.

**Why**: The registry was updated, the schema and the artifacts in flight were not.

**Detect**: After a prompt update, list artifacts touched in the last 90 days. If `ai_services_used[].prompt_version` is missing or stale, the migration is incomplete.

**Recover**: Make `prompt_version` a required field in `ai_services_used` (see schema v1.4). At every prompt update, add a CHANGELOG entry and bump the registry's `last_prompt_update` timestamp.

---

### AP-012 — Eval-by-vibes

**Looks like**: A prompt is "improved" because someone read three outputs and felt better. No regression test, no metric, no diff against the previous version.

**Why**: Prompts feel like writing, not like code. The eval discipline that exists for tests does not get applied to prompts.

**Detect**: Look at the last 5 prompt updates in CHANGELOG. If none show a before/after metric on a golden set, the eval discipline is missing.

**Recover**: Use the eval framework in `04-ai-service-mesh/evals/`. Every prompt change requires a regression run on the service's golden set. Document the delta in CHANGELOG.

---

## Adoption antipatterns

### AP-013 — Schema-driven theater

**Looks like**: The team fills every optional field of the schema. Artifacts are 4 pages long. Nothing is acted upon.

**Why**: "Doing ORDITO right" was confused with "filling the schema". Completion replaced effectiveness.

**Detect**: Time to fill an artifact > 30 minutes for a Core-mode feature. Or: ratio of time spent filling artifacts to time spent acting on them > 1:5.

**Recover**: Default to required fields only. Optional fields are opt-in per initiative. Reread the 30/60/90 plan: it explicitly says "start at 20% coverage and expand".

---

### AP-014 — Two sources of truth

**Looks like**: Jira is the daily tool. JSON artifacts in the repo are stale snapshots. Status in Jira says `in_progress`, JSON says `ready_for_g2`.

**Why**: The export is manual. The export is forgotten. The team is on Jira; the JSON is for CI.

**Detect**: For 5 random artifacts, compare Jira status with JSON `status`. If >2 mismatch, you have two sources of truth.

**Recover**: Treat one as authoritative (usually Jira). Automate the export with `ordito export-from-jira` (see `tools/ordito-cli/`). Until automation is wired, declare in CONTRIBUTING.md which one wins on conflict.

---

### AP-015 — RFC bypass

**Looks like**: Someone changes the schema, a prompt, or the gate criteria with a direct PR to main. No RFC, no community review, no CHANGELOG entry beyond the diff.

**Why**: The change felt small. The author had merge rights. The RFC process felt heavy.

**Detect**: Compare merged PRs that touched `schemas/`, `04-ai-service-mesh/prompts/`, or `01-framework/principles.md` against open/merged RFCs. Mismatches are bypasses.

**Recover**: Branch protection on those paths: require a linked RFC issue before merge. The framework evolves in the form it proposes — Principle 10.

---

## How to use this catalog

- **Read it once at adoption** — it shortens the learning curve.
- **Reread it at each ORDITO Retrospective** — match observed friction to listed antipatterns. The pattern usually exists already.
- **Add new ones** — if your team finds a failure mode that's not here, submit an RFC. Antipatterns are the most reusable cross-team learning.
