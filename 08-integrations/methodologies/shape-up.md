# ORDITO + Shape Up

How to layer ORDITO on a Shape Up rhythm without breaking what makes Shape Up work — fixed time, variable scope, betting table.

## Premise

Shape Up replaces the backlog with a betting table; replaces the sprint with a six-week cycle; replaces refinement with shaping; replaces commitment to scope with appetite for time. It explicitly resists artifacts and rituals beyond the pitch and the cycle review.

ORDITO and Shape Up are not natural allies. The friction is real and worth naming up front:

- ORDITO's Brief Pack expects ≥3 ACs; Shape Up's pitch deliberately stays above implementation detail.
- ORDITO's Release Gate expects every AC verified; Shape Up's hill chart accepts "good enough" as the cycle-end definition.
- ORDITO's full mode (Core) introduces 5 gates; Shape Up has effectively two checkpoints (pitch acceptance and cycle end).

So this mapping is **not "ORDITO Core + Shape Up"**. It is **ORDITO Overlay (the lite tension mode) + Shape Up**, plus the Learning Gate from full ORDITO.

## What ORDITO can add to Shape Up

1. **Schema for pitches**: pitches become Brief Packs with looser AC requirements but explicit hypothesis, in/out of scope, dependencies, and KPIs.
2. **Override log on shaping decisions**: when shapers reject scope (a key Shape Up activity), the rationale is captured.
3. **Learning Gate at +30 days post-cycle**: Shape Up has no formal value verification beyond the cycle review. ORDITO adds the 30-day check.
4. **Override-rate signal across cycles**: by tracking which kinds of shaping the team consistently overrules, you learn what the company's shaping bias is.

## What ORDITO does NOT impose on Shape Up

- No G1 / G2 separate gates. The pitch acceptance at the betting table is the only "gate" before the cycle starts.
- No mid-cycle ritual. The cycle is sacred; the team is uninterrupted.
- No full ACs at brief stage. Use `acceptance_criteria` as "what must be true at hill-chart full-uphill" — coarser than ORDITO Core.
- No `release_checklist` per release. Releases happen at cycle end; the cool-down period is when the next pitch shaping happens.

## Role mapping

| ORDITO role | Shape Up role |
|---|---|
| Sponsor | Founder / Exec at the betting table |
| Product Lead | Shaper |
| UX Lead | Designer (cycle team) |
| Engineering Lead | Builder lead (cycle team) |
| QA / Release Lead | Builder lead handles release; no dedicated QA in classic Shape Up |
| Data Analytics | (usually external to cycle team) — owns Impact Review data |
| Staff Engineer | Senior shaper / Architect (only for high-stakes pitches) |
| Founder | Founder (the betting authority) |

## Artifact mapping

| ORDITO artifact | Shape Up equivalent | Notes |
|---|---|---|
| `initiative_charter` | (often missing) | Add for cross-cycle initiatives only — most cycles do not need one |
| `opportunity_brief` | Pitch (early form) | Use for Explore-mode shaping |
| `feature_brief_pack` | Pitch (final form, after shaping) | Looser AC bar than Core |
| `mvp_frame` | Pitch with explicit kill criteria | For Explore-mode pitches |
| `design_spec` | Fat marker sketches + breadboard | Shape Up artifacts mapped to ORDITO type |
| `technical_design_note` | Optional spike output | Cycle teams resist TDNs; allow them only when truly necessary |
| `release_checklist` | Cycle-end release readiness | Lighter than Core |
| `impact_review` | (often missing) | **Add at +30 days post-cycle** |

## Gate mapping

| ORDITO gate | Shape Up equivalent |
|---|---|
| G0 — Backlog Entry | Pitch enters consideration for the betting table |
| G1 — Commitment | Betting table decision (the bet) |
| G2 — Build-ready | (skipped) — the bet *is* build-ready; the team starts day 1 |
| Release Gate | Cycle-end release decision |
| Learning Gate | +30 days post-cycle (added by ORDITO) |

## Tension-mode recommendation

Run **ORDITO Overlay** as the default. Strict mode breaks Shape Up's autonomy guarantees.

In Overlay mode:
- Pitches conform to schema (artifact type `feature_brief_pack` or `mvp_frame`).
- Override log is maintained for shaping decisions.
- Impact Review at +30 days for every shipped cycle.
- No G1/G2/Release rituals beyond what Shape Up already has.
- AI services: `intake-coach` (on raw pitches), `brief-builder` (on shaping output), `dashboard-narrator` (at +30 days). The rest are off by default.

## When this combination works well

- Small teams (one cycle team) shipping product features with ambiguous scope.
- Early-stage products in Explore mode for most cycles.
- Organisations that have Founder-level kill authority and use it.

## When this combination breaks down

- Regulated industries that need full audit trail. Shape Up's lightweight artifacts will not satisfy compliance; you will end up needing Core or Scale, at which point Shape Up's value disappears.
- Teams with >2 cycle teams running concurrently. The cross-team coordination cost grows past Shape Up's design assumptions; SAFe or full ORDITO Core+Scale is more honest.
- Cycles that consistently slip past 6 weeks. Shape Up's "circuit breaker" is broken. Adding ORDITO does not fix that.

## A Shape Up team's adoption sequence

| Cycle | Add |
|---|---|
| Cycle 1 | Pitches conform to Brief Pack schema. Nothing else |
| Cycle 2 | `intake-coach` on raw pitches before shaping |
| Cycle 3 | `brief-builder` to draft shaped pitch from raw input + research |
| Cycle 4 | First Impact Review at +30 days post-cycle |
| Cycle 5+ | Override log maintained for every shaping decision; quarterly ORDITO Retrospective looks at override patterns |
