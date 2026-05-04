# ORDITO + Kanban

How to run ORDITO on a flow-based Kanban team — no fixed iterations, WIP-driven, continuous delivery — without imposing batch-cadence ceremonies.

## Premise

Kanban gives you flow visualisation, WIP limits, classes of service, and continuous delivery. It does not give you contractual artifacts between roles, AI-augmented intake, or a structured learning loop tied to KPIs.

Kanban's strength — pull-driven flow — is also where ORDITO has to be careful. Adding gates can create batches; adding rituals can create cadence Kanban teams deliberately resist. The goal is to add ORDITO's contracts and learning loop **without** introducing artificial batching.

## Translation principles

1. **Gates become WIP-state transitions, not events.** G1, G2, Release are columns/states on the board, not meetings.
2. **Rituals become triggered, not scheduled.** Intake Review and Gate reviews fire when a card crosses a state — not weekly.
3. **Classes of service map to ORDITO modes.** Standard ≈ Core, Expedite ≈ Hotfix, Fixed Date ≈ Scale (when compliance-driven), Intangible ≈ Explore.
4. **Continuous Impact Review.** Instead of T+30 ritual, monitor KPIs continuously; the Learning Gate fires when enough data accumulates (≥30 days *or* ≥statistical significance).

## Role mapping

| ORDITO role | Kanban team role |
|---|---|
| Sponsor | Business stakeholder (often external) |
| Product Lead | PM / Service Delivery Manager |
| UX Lead | Designer on the team or T-shape Dev |
| Engineering Lead | Tech Lead / Team Lead |
| QA / Release Lead | QA member or T-shape role |
| Data Analytics | (usually external) — provides telemetry |
| Staff Engineer | Architect (only Scale class of service) |
| Founder | Org leader (only Explore class) |

## Board-state mapping (sample 2-stream board)

```
Backlog → Intake → Discovery → Ready (G1) → Design (G2) → Build → Verify → Ready to Release → Released → Learning
```

| Column | ORDITO meaning |
|---|---|
| Backlog | Charter exists, FRQ being drafted |
| Intake | FRQ being scored by `intake-coach` |
| Discovery | Brief Pack being built |
| Ready (G1) | Brief Pack passed G1; awaiting Design pull |
| Design (G2) | Design Spec + TDN being produced |
| Build | Code in progress; `code-review-agent` active on PRs |
| Verify | `test-case-generator` and `release-verifier` running |
| Ready to Release | Release Gate passed; awaiting deployment slot |
| Released | Live; in monitoring window |
| Learning | Impact Review pending or finalised |

WIP limits per column become the team's commitment to throughput, not iterations.

## Class of service ↔ ORDITO mode

| Kanban class of service | ORDITO mode | Behaviour |
|---|---|---|
| Standard | Core | Full gates, full Brief Pack, full Impact Review |
| Expedite | Hotfix | G2 override allowed, recovery doc within 48h |
| Fixed Date | Scale (often compliance-driven) | Full Scale playbook; Architecture sign-off mandatory |
| Intangible | Explore | MVP Frame instead of Brief Pack; kill criteria explicit |

## Ritual mapping

Most ORDITO rituals become **triggered events on column transitions**, not scheduled meetings. Two exceptions:

1. **Daily standup** stays daily — same as in Kanban.
2. **ORDITO Retrospective** stays quarterly — separate from operational replenishment meetings.

| ORDITO ritual | Kanban analogue |
|---|---|
| Intake Review | Replenishment meeting (when items move from Backlog → Intake) |
| Prioritization Session | Replenishment / Service Class assignment |
| G1 Review | Triggered when card reaches Ready (G1); 15-min ad-hoc review |
| G2 Review | Triggered when Design+TDN reach Ready (G2) |
| Sprint Sync | Daily standup |
| Release Gate | Triggered at "Ready to Release" |
| Impact Review | Triggered at +30 days post-release on each card |
| ORDITO Retrospective | Quarterly Service Delivery Review extended with ORDITO metrics |

## What works particularly well

- **Continuous Impact Review** — fires per card at +30 days; not blocked by team-wide schedule. Highest learning loop velocity of any methodology mapping.
- **Classes of service make mode declaration natural** — Kanban teams already think in classes; ORDITO modes drop in with no friction.
- **Override log feeds Service Delivery Review** — quarterly review consumes override metrics from the cards that flowed in the period.

## What to watch out for

- **Gate columns can become WIP-bottlenecks**. If "Ready (G1)" fills up, the team is producing Briefs faster than designers can pull them. WIP-limit the column and reduce upstream pull.
- **Continuous flow makes "deferred" easy**. Impact Reviews can be perpetually rescheduled because no batch boundary forces them. Use Jira automation to pin Learning cards as blockers if not closed by T+60.
- **Replenishment becomes overloaded**. If you put Intake Review and Prioritization Session into one replenishment meeting, the meeting bloats. Split: replenish weekly, prioritize bi-weekly.

## Adoption sequence (8 weeks, Kanban team)

| Week | Add |
|---|---|
| 1 | Add Charter (one per long-lived initiative). Cards now reference a Charter |
| 2 | Add FRQ schema as the entry to Intake column. `intake-coach` runs at column entry |
| 3 | Add Brief Pack schema at G1 column transition |
| 4 | Make G1 transition explicit (15-min ad-hoc review when triggered) |
| 5 | Add `solution-mapper` and `design-critic`; G2 transition explicit |
| 6 | Add `code-review-agent` on PRs in Build column |
| 7 | Add Release Gate ritual at "Ready to Release" transition |
| 8 | Add Learning column; first Impact Review fires at +30 days for an early card |

After 8 weeks, the board has 4–5 new states (some can be merged), 5 AI services active, and a continuous Impact Review pattern. No new scheduled meetings beyond the quarterly Service Delivery Review extension.
