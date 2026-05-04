# Methodology mappings

ORDITO is not a replacement for Scrum, SAFe, Shape Up, or Kanban. It is an **AI-governance overlay** that tensions whatever delivery methodology you already run. These docs translate ORDITO's roles, gates, artifacts, and rituals into the language of each common methodology so a team can adopt ORDITO without abandoning what they have.

| Methodology | File | When to use |
|---|---|---|
| Scrum | [scrum.md](scrum.md) | Single-team Scrum, sprint cadence, refinement-based intake |
| SAFe | [safe.md](safe.md) | Multi-team / multi-ART organisations with PI Planning |
| Shape Up | [shape-up.md](shape-up.md) | Six-week cycles, betting table, fixed-time/variable-scope |
| Kanban | [kanban.md](kanban.md) | Flow-based teams, no fixed iterations, WIP-driven |

## How to use a mapping

1. Read your methodology's mapping doc end-to-end before adopting ORDITO.
2. Adopt **ORDITO Overlay** mode first (see `02-operating-model/tension-modes.md`): only the schema, override log, and Impact Review. No new gates, no new rituals.
3. Map your existing artifacts to ORDITO artifact types **without renaming them**. ORDITO is a logical model; the labels you already use can stay.
4. Add ORDITO gates only where there is a real gate already in your methodology (e.g. "ready for sprint" in Scrum maps to G1; not every gate maps).
5. Layer in AI services starting from `intake-coach` and `brief-builder`. Keep the rest behind a feature flag until the team has the habit.

## What a mapping does NOT do

- It does not certify ORDITO compliance with the methodology.
- It does not resolve every conflict — for example, Shape Up's fixed-time/variable-scope tension with ORDITO's full-scope ACs is real and explicitly called out.
- It does not replace the playbooks in `05-playbooks/`. Playbooks are mode-driven (Core/Explore/Scale/Hotfix); methodology mappings are delivery-cadence-driven.

## Submitting a new mapping

If your team runs a methodology not listed here (Disciplined Agile, LeSS, FAST, etc.), open an RFC with a draft mapping and one real-team example. Mappings are accepted only when at least one team has used them in production for one full delivery cycle.
