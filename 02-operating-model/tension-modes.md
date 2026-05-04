# Tension modes

ORDITO's three primary modes — **Core / Explore / Scale / Hotfix** — describe the *kind* of work an initiative does. They control which artifacts and gates apply.

This document introduces a second axis, orthogonal to mode: **how tightly the framework is enforced**. We call this the *tension* of the warp.

A team adopting ORDITO over Scrum (mature delivery process) does not need the same tension as a team adopting it from scratch in a regulated industry. The same is true within a team: a Core-mode initiative on a stable product has different tension needs than a Scale-mode initiative under audit.

## The three tension modes

### Overlay

The minimum that still counts as ORDITO.

| Aspect | Overlay |
|---|---|
| Schema | Required fields only. Optional fields are opt-in |
| Gates | No new rituals. Gate decisions are recorded *if they happen anyway* in the underlying methodology |
| AI services | `intake-coach` and `brief-builder` only by default |
| Override log | Required (this is what makes it ORDITO) |
| Impact Review | Required at +30 days |
| `consistency-checker` | Off by default |

Use when:
- Adding ORDITO on top of a methodology you already trust (Scrum, Kanban, Shape Up)
- Piloting ORDITO in one team before org-wide rollout
- Working in Explore mode where the cost of friction is high

### Standard

The full ORDITO documented in `01-framework/principles.md`, `05-playbooks/`, `02-operating-model/rituals.md`.

| Aspect | Standard |
|---|---|
| Schema | Required + recommended optional fields |
| Gates | All gates (G0–Learning) explicit with rituals |
| AI services | All 12 active where applicable per playbook |
| Override log | Required, reviewed quarterly |
| Impact Review | Required at +30 days |
| `consistency-checker` | Triggered at G1, G2, Release |

Use when:
- ORDITO is the team's default operating model
- The team has run Overlay successfully for a quarter
- Most modes (Core / Scale) for established teams

### Strict

Standard + adversarial enforcement.

| Aspect | Strict |
|---|---|
| Schema | All recommended fields plus AI invocation log per service call |
| Gates | All gates, with **mandatory** consistency-checker output at every gate |
| AI services | All services, plus telemetry instrumentation (`ai-invocation-log.schema.json`) |
| Override log | Required + sampled audit by an independent reviewer (compliance team or RTE) |
| Impact Review | Required at +30 days, plus +90 day re-review |
| `consistency-checker` | Mandatory at every gate; a finding cannot be dismissed without `decision_log` rationale |

Use when:
- Regulated industry (SOC2 Type II, PSD2, EU AI Act high-risk systems)
- Scale mode with cross-team and multi-million-dollar exposure
- Compliance audit imminent
- Incident-driven retrospective that produced a structural change

## How to choose

```
                  Regulated      Stable team
                  industry?      (≥1 quarter on ORDITO)?
                     |              |
                    YES            YES
                     |              |
                  Strict         Standard
                                    |
                                    NO
                                    |
                                 Overlay
```

Not regulated, not stable team → start in **Overlay**. Move to **Standard** at the first quarterly retrospective. Move to **Strict** only when there is an external requirement (audit, regulation, or significant blast-radius initiative).

## Combining tension with mode

| Tension × Mode | Core | Explore | Scale | Hotfix |
|---|---|---|---|---|
| **Overlay** | OK as adoption phase | Recommended for pilots | Discouraged for compliance-driven Scale | Always (Hotfix is by design lite) |
| **Standard** | Default | OK for substantial bets | OK if not regulated | n/a (Hotfix overrides Standard) |
| **Strict** | Only for high blast-radius features | Discouraged (kills speed) | Default for regulated work | n/a |

## Field in artifact schema

`tension_mode` is an optional field in `schemas/artifact.schema.json` (since v1.4). Defaults to `standard` when absent.

When an initiative changes tension mode mid-flight (e.g. moves from Overlay to Strict because compliance scope expanded), document it in `decision_log` with `decision_type: mode_change`.

## Why this is separate from Core/Explore/Scale

Core/Explore/Scale describes *what kind of work* the initiative is. Overlay/Standard/Strict describes *how much governance the team applies to that work*.

These are independent. A Core initiative on a stable product can run Overlay (low tension) because the team trusts itself. The same Core initiative, after a P0 incident traceable to insufficient pre-release verification, can run Strict for the next quarter as part of incident remediation — without changing what kind of work it is.

Conflating the two axes was an early v1.x design weakness. v1.4 separates them explicitly.
