# Changelog

All notable changes to ORDITO are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and ORDITO adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.1.0]: https://github.com/fortunato-deangelis/ordito/releases/tag/v1.1.0
