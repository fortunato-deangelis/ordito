# Prompt Templates

This directory contains prompt templates for each ORDITO AI service.

Each template includes:
- System prompt (static, defines the service's role and constraints)
- User prompt template (parameterized with artifact fields)
- Few-shot examples (references to existing examples in the repository)
- Known override patterns (what the service has historically gotten wrong — do not repeat)

## Templates available

| Service | Prompt file | Status |
|---|---|---|
| intake-coach | [intake-coach.md](intake-coach.md) | Complete (v1.2) |
| prioritization-copilot | [prioritization-copilot.md](prioritization-copilot.md) | Complete (v1.2) |
| brief-builder | [brief-builder.md](brief-builder.md) | Complete (v1.2) |
| design-critic | [design-critic.md](design-critic.md) | Complete (v1.2) |
| code-review-agent | [code-review-agent.md](code-review-agent.md) | Complete (v1.2) |
| test-case-generator | [test-case-generator.md](test-case-generator.md) | Complete (v1.2) |
| release-verifier | [release-verifier.md](release-verifier.md) | Complete (v1.2) |
| research-synthesizer | [research-synthesizer.md](research-synthesizer.md) | Complete (v1.4) |
| solution-mapper | [solution-mapper.md](solution-mapper.md) | Complete (v1.4) |
| dashboard-narrator | [dashboard-narrator.md](dashboard-narrator.md) | Complete (v1.4) |
| dependency-mapper | [dependency-mapper.md](dependency-mapper.md) | Complete (v1.4) |
| compliance-checker | [compliance-checker.md](compliance-checker.md) | Complete (v1.4) |
| consistency-checker | [consistency-checker.md](consistency-checker.md) | Complete (v1.4 — adversarial) |

## Update process

See `04-ai-service-mesh/governance.md` — Prompt Update Process section.
