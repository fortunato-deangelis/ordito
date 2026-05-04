# Profile — Discovery Agent

**Profile name**: `discovery-agent`
**Phase**: 3 — Discovery
**Composes**: `intake-coach` (re-check), `research-synthesizer` (when qualitative input is present), `brief-builder`
**Output artifacts**: `feature_brief_pack`
**Autonomy tier**: HITL (inherits the strictest tier of composed services)

---

## Why this profile exists

A Product Lead at G1 readiness typically does this manually:

1. Re-runs `intake-coach` against the FRQ if it changed
2. If interviews / tickets exist, runs `research-synthesizer`
3. Runs `brief-builder` with the FRQ + research output as input
4. Reads three outputs, reconciles, drafts the Brief Pack
5. Sends to G1

The profile compresses steps 1–4 into a single invocation that produces a draft Brief Pack ready for human review.

---

## Decision logic

```
input: charter, frq, research_inputs (interviews | tickets | usage_data | none)

if research_inputs.has_any():
    research_output = invoke(research-synthesizer, charter, frq, research_inputs)
else:
    research_output = null

if frq.last_modified > frq.last_intake_score:
    intake_recheck = invoke(intake-coach, charter, frq)
    if intake_recheck.score < 6.0:
        return Error("FRQ score regressed below G1 threshold; do not proceed to brief-builder")

brief_draft = invoke(brief-builder, charter, frq, research_output)

return BriefPackDraft(
    brief = brief_draft,
    research = research_output,
    intake_score = intake_recheck.score if intake_recheck else frq.last_intake_score,
    invoked_services = [...]   // recorded in artifact's ai_services_used[]
)
```

---

## Audit trail

The profile is **transparent** in the audit trail. The Brief Pack's `ai_services_used` lists the atomic services that ran, not the profile. The profile is a runtime orchestration; it does not collapse the governance grain.

Recommended addition (optional): a `tags` entry of `profile:discovery-agent` so retrospectives can attribute outcomes to the profile vs. the atomic-services-without-profile baseline.

---

## When to use

- Discovery phase with research inputs (interviews ≥3, tickets ≥10, or usage data)
- Product Lead has time pressure and wants a single review cycle
- Team is in Standard or Strict tension mode (the profile preserves all per-service governance)

## When NOT to use

- Discovery phase with no research inputs and a one-paragraph FRQ — the profile invokes brief-builder only and adds no value
- Explore mode with MVP Frame instead of Brief Pack — the profile targets Brief Pack output specifically
- Hotfix mode — the profile assumes a normal Discovery phase exists; Hotfix bypasses it

---

## Failure modes

| Failure | Behaviour |
|---|---|
| `intake-coach` re-check returns score <6.0 | Profile aborts before invoking `brief-builder`; returns the intake feedback so the FRQ is fixed first |
| `research-synthesizer` returns LOW confidence (<3 interviews / <10 tickets) | Profile proceeds to `brief-builder` but flags "low-confidence research" in the Brief Pack output |
| Any atomic service errors | Profile fails fast; logs the partial state for debugging; no half-built Brief Pack is returned |

---

## Reference implementation

Pending CLI v0.5. Until then, the profile's decision logic above is sufficient for a team to implement in their own AI orchestration layer (LangChain, Bedrock Agents, custom Python script). The contract is the audit trail (services in `ai_services_used`), not the orchestration code.
