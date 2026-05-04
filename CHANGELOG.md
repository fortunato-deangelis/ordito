# Changelog

All notable changes to ORDITO are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and ORDITO adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-05-04

The "completare la promessa" release. Closes the v1.2/1.3 gaps (5 missing prompts, schema fragility), adds the AI-native upgrade (autonomy tier, eval framework, adversarial agent), introduces the methodology mappings that make the "wrapper" claim concrete, and lands the regulatory mapping the enterprise has been asking for.

### Added

**AI Service Mesh**
- `04-ai-service-mesh/prompts/research-synthesizer.md` — full prompt template (v1.4)
- `04-ai-service-mesh/prompts/solution-mapper.md` — full prompt template (v1.4)
- `04-ai-service-mesh/prompts/dashboard-narrator.md` — full prompt template (v1.4)
- `04-ai-service-mesh/prompts/dependency-mapper.md` — full prompt template (v1.4)
- `04-ai-service-mesh/prompts/compliance-checker.md` — full prompt template (v1.4)
- `04-ai-service-mesh/prompts/consistency-checker.md` — new adversarial service prompt (v1.4)
- `04-ai-service-mesh/consistency-checker.md` — new service description: cross-artifact adversarial check at gates, breaking the compounding-error chain
- `04-ai-service-mesh/evals/` — evaluation framework: golden-set format, rubric, runner spec; starter set + rubric for `intake-coach`
- `04-ai-service-mesh/profiles/` — agent profiles concept (experimental); first profile `discovery-agent` composes brief-builder + research-synthesizer + intake-coach
- `04-ai-service-mesh/registry.json` — bumped to v1.4: added `autonomy_tier` (HITL / HOTL / HOOTL), `ai_act_risk` (limited / high / minimal), `dpa_required`, `prompt_version`, `last_prompt_update` per service; new `consistency-checker` service entry; tier definitions

**Framework**
- `01-framework/regulatory-mapping.md` — EU AI Act (Article 14 + Articles 9, 10, 12, 13, 15, 17) and NIST AI RMF (Govern / Map / Measure / Manage) mapping to ORDITO controls
- `07-adoption/antipatterns.md` — catalog of 15 antipatterns across process / AI service / adoption with detect+recover playbook
- `02-operating-model/tension-modes.md` — Overlay / Standard / Strict orthogonal axis to Core/Explore/Scale modes

**Methodology mappings**
- `08-integrations/methodologies/README.md` — index + adoption guidance
- `08-integrations/methodologies/scrum.md` — role/artifact/gate/ritual mapping for Scrum
- `08-integrations/methodologies/safe.md` — Solution Train / ART / Team layering for SAFe
- `08-integrations/methodologies/shape-up.md` — Overlay-only mapping with explicit tension between Brief Pack ACs and Shape Up's appetite
- `08-integrations/methodologies/kanban.md` — column/state mapping; gates as transitions, not events

**Schemas**
- `schemas/ai-invocation-log.schema.json` — new schema for HOTL/HOOTL operational logging (cost, latency, parse validity, override decision)

**Tooling**
- `tools/ordito-cli/` — CLI skeleton (TypeScript, Node 20+, only `ajv` runtime dep): `new` and `validate` functional; `gate` interactive; `export-from-jira` declared as stub for v0.3

### Changed

**Manifesto**
- Principle 7 reframed: "AI structures judgment, it does not replace it" — distinguishes substitution (toil removal) from augmentation (judgment-structuring)
- New caveat: ORDITO is "Not a Human-in-the-loop fig leaf" — addresses the 2026 critique that HITL is illusory unless review evidence is captured
- Manifesto version bumped 1.1 → 1.2

**Schema (`schemas/artifact.schema.json`)**
- Added `mode` field (core/explore/scale/hotfix) — Principle 5 was previously only in playbooks
- Added `lifecycle_state` and `gate_state` — orthogonal split that deprecates `status` (kept for v1.x backward compatibility; will be removed in v2.0)
- Added `tension_mode` (overlay/standard/strict) for the new tension modes axis
- Added `reversibility_class` and `blast_radius` for AI-native risk dimensions per `01-framework/regulatory-mapping.md` MAP 5
- Added `prompt_version` in `ai_services_used[]` — required from v1.4 to keep audit trail intact across prompt updates (see AP-011)
- Added `review_evidence` in `ai_services_used[]` — discourages AP-008 (AI bypasses the actor) by capturing what the human changed
- Added `autonomy_tier_at_invocation` in `ai_services_used[]`
- Added `decision_type` and `gate_id` in `decision_log[]` — enables override metrics by category and by gate
- Added `minLength: 30` on `decision_log[].rationale` — discourages AP-002 (Decision_log as box-ticking)
- Added `maxItems: 10` on `acceptance_criteria` — aligns schema with brief-builder prompt's existing constraint
- Added `consistency-checker` to the `ai_services_used[].service_name` enum

**Governance (`04-ai-service-mesh/governance.md`)**
- New section: Autonomy tiers (HITL / HOTL / HOOTL) with promotion/demotion path
- New section: EU AI Act mapping with risk class implications
- New section: Drift detection — quarterly + on-model-change rerun of evals
- Audit log requirements now include `prompt_version` (required from v1.4) and reference `ai-invocation-log.schema.json` for HOTL/HOOTL services
- Multi-vendor: clarified that canonical IDs are the ORDITO reference; non-Anthropic providers map via `model_provider` field or RFC

**Principles (`01-framework/principles.md`)**
- Principle 7 operational expansion realigned with revised manifesto (substitution vs augmentation)
- New antipattern under Principle 7: "Treating 'human reviewed' as a checkbox" — codifies AP-003

**README**
- Status bumped 1.2 → 1.4
- Repo structure updated (CLI under `tools/`, methodologies under `08-integrations/methodologies/`)
- Roadmap updated: v1.4 marked complete; v1.5 / v1.6 / v1.7 expanded with concrete deliverables
- Service count: 12 → 13 (added consistency-checker)

**Prompts README (`04-ai-service-mesh/prompts/README.md`)**
- All 12 services now show "Complete"; consistency-checker added as 13th entry; "Coming v1.3" labels removed (the doc had drifted from reality)

### Notes

- **Backward compatibility**: existing artifacts under `03-artifacts/examples/json/` continue to validate (the `status` field is retained alongside the new `lifecycle_state` / `gate_state`). Migration to the new fields is recommended but not required until v2.0.
- **Eval framework**: only `intake-coach` ships with a starter golden set. Other services have rubric placeholders pending v1.6 case-study contributions.
- **CLI**: v0.1 covers the highest-value flows (scaffold + validate). The remaining commands ship as documented stubs to keep the contract stable for v0.2.
- **Regulatory mapping**: this is a documentation aid, not legal advice. AI Act high-risk classification requires a per-deployment QMS per Article 17.

## [1.2.0] - 2026-04-26

### Added

**Framework**
- `01-framework/principles.md` — operational expansion of the 10 manifesto principles, gate specifications (G0–Learning), metrics dashboard, and override policy
- `GLOSSARY.md` — centralized definitions for all framework terms (warp, weft, gate, artifact, override, service mesh, mode, FRQ score, SAS, RCS, etc.)

**Operating Model**
- `02-operating-model/roles.md` — full role directory: responsibilities per phase, RACI matrix, notes on role scaling for small/large teams
- `02-operating-model/rituals.md` — ritual directory: 8 ceremonies with cadence, participants, inputs, outputs, duration, AI services, and mode variations

**Playbooks**
- `05-playbooks/core.md` — complete checklist playbook for Core mode with decision trees for every gate and minimum valid artifact table
- `05-playbooks/explore.md` — Explore mode playbook with kill criteria templates, MVP Frame vs. Brief Pack comparison, and Pivot/Persevere/Kill decision tree
- `05-playbooks/scale.md` — Scale mode playbook with dependency matrix format, architecture sign-off format, and compliance assessment format
- `05-playbooks/hotfix.md` — Hotfix mode playbook with override authorization log, recovery documentation (Hotfix TDN), and override rate monitoring

**Workflows**
- `06-workflows/swimlane-explore.md` — Explore mode swimlane with kill criteria documentation format
- `06-workflows/swimlane-scale.md` — Scale mode swimlane with architecture sign-off phase and dependency matrix examples
- `06-workflows/swimlane-hotfix.md` — Hotfix mode swimlane with override rate monitoring thresholds

**AI Service Mesh**
- `04-ai-service-mesh/registry.json` — canonical registry of all 12 AI services with retention policies, PII risk, output visibility, and phase assignments
- `04-ai-service-mesh/governance.md` — cross-service governance: authorized models, PII rules, retention policy definitions, output visibility, audit log requirements, prompt update process
- Service documentation for all 12 services: `intake-coach.md`, `prioritization-copilot.md`, `brief-builder.md`, `research-synthesizer.md`, `design-critic.md`, `solution-mapper.md`, `code-review-agent.md`, `test-case-generator.md`, `release-verifier.md`, `dashboard-narrator.md`, `dependency-mapper.md`, `compliance-checker.md`
- `04-ai-service-mesh/prompts/intake-coach.md` — first complete prompt template (v1.2)
- `04-ai-service-mesh/prompts/README.md` — prompt directory with remaining templates marked for v1.3

**Artifacts / Examples**
- `03-artifacts/examples/json/initiative-charter-csv-import.json` — machine-readable Initiative Charter conforming to `artifact.schema.json`
- `03-artifacts/examples/json/feature-brief-pack-csv-import.json` — machine-readable Feature Brief Pack conforming to `artifact.schema.json`
- `03-artifacts/examples/mvp-example.md` — Explore mode end-to-end example (competitor price tracking MVP, Pivot/Persevere/Kill)
- `03-artifacts/examples/legacy-example.md` — Scale mode end-to-end example (payment gateway migration, compliance + architecture sign-off)
- `03-artifacts/examples/hotfix-example.md` — Hotfix mode end-to-end example (invoice export P0 with recovery documentation)

**Adoption**
- `07-adoption/30-60-90.md` — full operational adoption plan: Day 0–30 (intake + discovery), Day 31–60 (design + G2), Day 61–90 (release + learning loop)

### Changed

**Schema (`schemas/artifact.schema.json`)**
- Added status values: `ready_for_g1`, `ready_for_g2`, `ready_for_release` (aligning with examples)
- Added `gate_stage` field: `enum ["G0", "G1", "G2", "release", "learning"]`
- Added canonical `enum` for `ai_services_used[].service_name` (12 authorized service names)
- Added `model_used` description (canonical format: `claude-sonnet-4-6`)
- Made `rationale` required in `decision_log` entries (was optional)
- Added description to `decision_log[].owner` specifying role identifier format (not handle)

**CI (`validate.yml`)**
- Removed silent fallback in artifact validation: CI now fails if `03-artifacts/examples/json/` is empty or missing
- Removed `continue-on-error: true` from lint-markdown job: markdown errors now block merge

**README**
- Fixed broken link to `01-framework/principles.md` (added "coming v1.2" note, now resolved)
- Fixed broken link to `07-adoption/30-60-90.md` (now exists)
- Corrected public roadmap: v1.1 checkmark removed from "12 AI services" claim (was false); v1.2 roadmap updated to reflect actual content

**SECURITY.md / MAINTAINERS.md**
- Replaced non-operational `security@ordito.dev` email with GitHub Security Advisories link

**`06-workflows/swimline-core.md`**
- Renamed `swimline-core.md` phase numbering from 7-phase (0–6) to 9-phase (0–8) to align with `end-to-end-existing.md` canonical numbering
- Updated Actors × phases map with new phase columns

**`06-workflows/end-to-end-existing.md`**
- Replaced broken link to `01-framework/override-policy.md` with reference to `01-framework/principles.md`

### Known gaps (planned for v1.3)

- Prompt templates for remaining 11 services (only `intake-coach` is complete)
- Plugin pack for Jira, Linear, Notion (template import)

## [1.1.0] - 2026-04 (initial public release)

### Added

- 10-principle manifesto with the warp/weft metaphor as mental model
- README as repository entry point
- Three framework levels: Framework, Operating Model, Playbook
- Three operating modes: Core, Explore, Scale
- 12 AI services in the service mesh, with human escalation
- Machine-readable JSON Schema for contractual artifacts
- Mermaid diagrams for end-to-end workflows and swimlanes
- Complete end-to-end example (CSV import enterprise)
- 30/60/90 adoption plan
- CONTRIBUTING.md with RFC process
- CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
- SECURITY.md with vulnerability disclosure process
- MAINTAINERS.md for governance transparency
- GitHub workflows for JSON Schema validation and Markdown linting
- Issue templates (bug report, RFC proposal) and PR template

### Origin

- Evolution from the ORDITO internal v0.5 framework (private, internal)
- Renaming from ORDITO internal to ORDITO for open source positioning and consistency with the loom metaphor
- Public release under Apache 2.0 license

### Key differences from ORDITO internal (v0.5)

- **Name and identity**: from ORDITO internal (spark, event) to ORDITO (tense structure, continuous system). The loom metaphor gives the framework a concrete mental model: principles/gates/artifacts = warp (structure), initiatives/features/decisions = weft (variable work), AI = accelerated shuttle.
- **Explicit manifesto**: 10 principles guiding evolution and adoption
- **Open governance**: public RFC process for evolutions
- **Machine-readable schemas**: JSON Schema for contracts, not just descriptions
- **Concrete end-to-end example**: added to reduce abstraction
- **Mermaid diagrams**: workflows versioned as text, diff-able in PRs

## [Pre-1.1] ORDITO internal v0.1 → v0.5

Internal framework history, kept for reference.

- **Ordito v0.5** — AI service mesh, swimlanes, native contracts
- **Ordito v0.4** — extended gate model, learning loop
- **Ordito v0.3** — Core/Explore/Scale modes
- **Ordito v0.2** — contractual artifacts
- **Ordito v0.1** — initial principles and gates

[1.4.0]: https://github.com/fortunato-deangelis/ordito/releases/tag/v1.4.0
[1.2.0]: https://github.com/fortunato-deangelis/ordito/releases/tag/v1.2.0
[1.1.0]: https://github.com/fortunato-deangelis/ordito/releases/tag/v1.1.0
