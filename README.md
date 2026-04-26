<p align="center">
  <img src="assets/brand/logo.png" alt="ORDITO logo" width="220">
</p>

# ORDITO

> **Open-source operating system for product teams: integrate AI into workflows without losing human accountability.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Status: v1.2](https://img.shields.io/badge/Status-v1.2-green.svg)](https://github.com/fortunato-deangelis/ordito/releases)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Discussions](https://img.shields.io/badge/Discussions-Open-purple.svg)](https://github.com/fortunato-deangelis/ordito/discussions)

**Keywords**: product management · AI workflow · operating model · framework · methodology · human-in-the-loop · product operations · governance · enterprise AI

---

## What is ORDITO

The name comes from the Italian word for **warp** — the longitudinal threads held under tension in a loom while the **weft** passes through them to create fabric. Without a tense, regular warp, every pass of the weft produces tangle instead of pattern.

In a product team, the warp is **principles, gates, contractual artifacts, roles, metrics** — the stable structure. The weft is **initiatives, features, decisions** — the variable work that passes through it. AI accelerates the shuttle, but only if the warp is well tensioned.

ORDITO solves a concrete problem: **teams that adopt AI tools without an underlying structure produce chaos faster**. The framework provides the structure — gates, contractual artifacts, clear roles, learning loops — so that AI accelerates work instead of amplifying noise.

ORDITO does not replace Scrum, SAFe, or Shape Up. **It lives on top of them**, focusing on handoffs between roles and on native AI integration in the product lifecycle.

## When to use ORDITO

| If you are... | ORDITO helps you... |
|---|---|
| **Product Lead** overwhelmed by fragmented requests | Filter intake, prioritize with explicit criteria |
| **Engineering Lead** tired of incomplete briefs | Get handoffs with AC, tracking, and risk already structured |
| **UX Lead** dealing with handoffs that get lost | Trace every design decision through to release |
| **Sponsor** without portfolio visibility | See the status and expected value of every initiative |
| **Team that just adopted an LLM** | Know where AI accelerates and where it does damage |

## The three levels of ORDITO

```
┌─────────────────────────────────────────────────┐
│  PLAYBOOK     — variants by context             │  ← Adaptation
├─────────────────────────────────────────────────┤
│  OPERATING    — roles, artifacts, rituals       │  ← Application
│  MODEL          AI services, tool integrations  │
├─────────────────────────────────────────────────┤
│  FRAMEWORK    — principles, gates, metrics      │  ← Stability
│                 human override policy           │     (the warp)
└─────────────────────────────────────────────────┘
```

## The three modes

ORDITO recognizes that the same team does different things and adjusts its tension:

- **ORDITO Core** — existing product, stable team. Standard discovery, full gates, traceability.
- **ORDITO Explore** — new MVP, uncertain market. Exploration sprint, kill criteria, narrow rollout.
- **ORDITO Scale** — complex legacy, multi-team, compliance. Dependency mapping, architecture sign-off, audit trail.

## Start here

### Curious? Read in 10 minutes

1. The [Manifesto](MANIFESTO.md) — the 10 principles that hold the framework together
2. [The three levels](01-framework/principles.md) — how it's structured
3. [End-to-end example](03-artifacts/examples/) — a real feature from intake to learning

### Adopting team? Start in 30 days

Follow the [30/60/90 plan](07-adoption/30-60-90.md). Summary:

- **Days 0-30** — Stabilize intake and discovery (artifact templates + 2 AI services)
- **Days 31-60** — Connect design, engineering, and QA (G2 + code review agent)
- **Days 61-90** — Close release and learning loop (release checklist + impact review)

### Want to contribute? Read [CONTRIBUTING.md](CONTRIBUTING.md)

Evolution proposals go through RFCs (the same model the framework proposes — consistency above all).

## Repository structure

```
ordito/
├── assets/brand/          # Logo and social preview assets
├── 01-framework/          # Principles, gates, metrics, policies
├── 02-operating-model/    # Roles, modes, rituals, integrations
├── 03-artifacts/          # Schemas, templates, compiled examples
├── 04-ai-service-mesh/    # 12 AI services with prompts and governance
├── 05-playbooks/          # Variants for Core / Explore / Scale / Hotfix
├── 06-workflows/          # Mermaid diagrams of processes and swimlanes
├── 07-adoption/           # Onboarding, antipatterns, change management
└── schemas/               # Machine-readable JSON Schemas
```

## Brand assets

- [Logo](assets/brand/logo.png) — used in this README header
- [Social preview card](assets/brand/social-header.png) — intended for repository social previews and link unfurls

## What sets it apart

- **Machine-readable artifacts.** Every artifact has a JSON Schema. CI validates that every template conforms. AI services read and produce the same contract.
- **Tracked overrides.** AI can be ignored, but the pattern of overrides is the system's tuning signal.
- **Privacy by design.** Every AI service declares its model, retention, and output visibility. Ready for enterprise environments.
- **Three real modes.** Not one imposed size. Core, Explore, and Scale have different documentation tension.
- **Diff-able diagrams.** Workflows in Mermaid, not PNG. They live in the repo as text, reviewable in PRs.

## Public roadmap

- [x] v1.1 — Manifesto, schema, swimlane Core, end-to-end example
- [x] v1.2 — Principles, roles, rituals, 30/60/90 plan, unified swimlanes, 12 AI services (registry + governance), all examples
- [ ] v1.3 — Prompt templates for all 12 AI services + plugin pack for Jira, Linear, Notion
- [ ] v1.4 — Reference harness for AI services (runnable integrations)
- [ ] v1.5 — Case studies from adopting teams

## License

Apache 2.0 — see [LICENSE](LICENSE). You can use, modify, distribute, and adopt ORDITO in commercial contexts. We only ask for attribution.

## Credits

The current manifesto, metaphor, and structure are the result of iteration with real teams in enterprise contexts.

## Contact

- **Discussions** → [GitHub Discussions](https://github.com/fortunato-deangelis/ordito/discussions)
- **Issues** → [GitHub Issues](https://github.com/fortunato-deangelis/ordito/issues)

---

*"The warp is the threads that stay still. The weft is what passes through them. Without a warp, the weft is just a tangle of yarn."*
