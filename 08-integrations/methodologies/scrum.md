# ORDITO + Scrum

How to run ORDITO on top of Scrum without doubling ceremonies or introducing a parallel governance track.

## Premise

Scrum gives you the cadence (sprint), the team (Scrum Team), and the iterative loop (Plan → Do → Review → Retrospect). It does not give you a contract for handoffs between roles, a structure for AI-augmented work, or a learning loop beyond the team boundary. ORDITO adds those — without replacing the sprint.

ORDITO gates are **per initiative**, not per sprint. An initiative may span 1 to 6 sprints. Gates are checkpoints in the initiative's lifecycle, layered on top of the sprint.

## Role mapping

| ORDITO role | Scrum role | Notes |
|---|---|---|
| Sponsor | (often) Stakeholder / Business Owner | Authority for investment, not present in standard Scrum |
| Product Lead | Product Owner | Direct mapping. PO is the warp thread that runs through every phase |
| UX Lead | Designer (Scrum Team member) | If the team has no dedicated UX, this role is shared between PO and Dev Team |
| Engineering Lead | Tech Lead / Senior Dev (often informal in Scrum) | Owns G2 and TDN |
| QA / Release Lead | QA member of Scrum Team | If no dedicated QA, EL covers this role |
| Data Analytics | (usually external to Scrum Team) | Reviewed at sprint boundary, owns Impact Review data |
| Staff Engineer | Architect / Cross-team senior | Only required in Scale mode |
| Founder | Founder / VP Product | Only relevant for Explore mode |

The Scrum Master has no direct ORDITO equivalent — they facilitate the methodology itself, not an ORDITO phase. In ORDITO terms, the Scrum Master is the human who keeps the warp tense.

## Artifact mapping

| ORDITO artifact | Scrum / common practice equivalent |
|---|---|
| `initiative_charter` | Often missing. Add it as a long-lived doc above the backlog (Confluence / wiki) |
| `feature_request` | Product Backlog Item (PBI) at intake — before refinement |
| `feature_brief_pack` | PBI after refinement, with full ACs |
| `design_spec` | Design artifact (Figma + spec doc) |
| `technical_design_note` | Spike output / tech design doc |
| `release_checklist` | Definition of Done extended with rollback / monitoring |
| `impact_review` | Often missing in Scrum. Add it 30 days post-release |
| `mvp_frame` / `opportunity_brief` | Used only in Explore mode |

## Gate mapping

| ORDITO gate | Scrum equivalent | When |
|---|---|---|
| G0 — Backlog Entry | "Item added to Product Backlog" | Run during PO's intake review (often async) |
| G1 — Commitment | Definition of Ready (DoR) | At sprint planning, applied per PBI |
| G2 — Build-ready | Design + tech design done | At sprint planning, after spike |
| Release Gate | Release decision (often informal) | Make explicit; same time as Sprint Review if release aligns |
| Learning Gate | (missing in standard Scrum) | 30 days post-release; closes the initiative |

## Ritual mapping

| ORDITO ritual | Scrum ceremony equivalent | Recommendation |
|---|---|---|
| Intake Review | Backlog Refinement (the intake portion) | Reuse — do not add a separate ritual |
| Prioritization Session | Backlog Refinement (the prioritization portion) | Reuse |
| G1 Review | Sprint Planning Part 1 (commitment) | Reuse — the gate decision happens in planning |
| G2 Review | Sprint Planning Part 2 (technical) | Reuse |
| Sprint Sync | Daily Standup + Mid-sprint check | Reuse |
| Release Gate | Release readiness review (often part of Sprint Review) | Make it explicit if currently informal |
| Impact Review (Learning) | (missing) | **Add it** — this is the most valuable ritual ORDITO adds to Scrum |
| ORDITO Retrospective | Quarterly retro (separate from sprint retro) | **Add it quarterly** — sprint retro is per-team; this is per-framework |

## What you do NOT change in Scrum

- Sprint length stays the same.
- Daily standup stays the same.
- Sprint Review stays the same — but consider showing the Brief Pack and Impact Review when the initiative reaches those gates.
- The team commits to a sprint goal, not to a gate. Gates are *initiative-level*, not *sprint-level*.

## What ORDITO adds to a Scrum team that's worth the cost

1. **Definition of Ready becomes contractual** — the Brief Pack schema is the DoR's machine-readable spec.
2. **AI services accelerate refinement** — `intake-coach` and `brief-builder` reduce the time from ticket to ready-for-sprint.
3. **Learning Gate adds the missing 30-day loop** — Scrum has no native mechanism for "did this feature work after release". ORDITO's Impact Review fills the gap.
4. **Override log replaces tribal memory** — when a team dismisses an AI suggestion (or each other's input), the rationale is captured for the next quarter's tuning.

## What costs more in this combination

- **Two cadences**: sprint (1–4 weeks) and initiative (1–6 sprints). Track both. The PO carries the cognitive cost of switching contexts.
- **Cross-sprint artifacts**: a Brief Pack or TDN may live across sprints. They are not sprint deliverables; they are initiative deliverables. This is a real conceptual stretch for teams used to "everything fits in a sprint".

## Scrum-of-Scrums and multi-team

Use **SAFe mapping** ([safe.md](safe.md)) when you have 3+ teams on coordinated work. Scrum-of-Scrums alone is rarely enough scaffolding for ORDITO Scale mode.

## Common adoption sequence (90 days, Scrum team)

| Sprint window | ORDITO add-ons |
|---|---|
| Sprints 1–2 | Adopt the Brief Pack schema as your new DoR. Run `intake-coach` on PBIs. Nothing else changes |
| Sprints 3–4 | Add `brief-builder` and `research-synthesizer`. Make the G1 decision explicit at Sprint Planning Part 1 |
| Sprints 5–6 | Add `solution-mapper`. Make G2 decision explicit at Sprint Planning Part 2 |
| Sprints 7–8 | Add `code-review-agent` and `test-case-generator`. Run Release Gate explicitly |
| Sprints 9–12 | Add `dashboard-narrator`. Run first Impact Review at T+30 from a real release |

By the end of the 12 sprints, a Scrum team has a full ORDITO loop running with two extra artifacts (Charter, Impact Review) and one new ritual (Learning Gate). Everything else is enrichment of existing Scrum events.
