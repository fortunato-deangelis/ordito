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
| intake-coach | [intake-coach.md](intake-coach.md) | Complete |
| prioritization-copilot | [prioritization-copilot.md](prioritization-copilot.md) | Complete |
| brief-builder | [brief-builder.md](brief-builder.md) | Complete |
| design-critic | [design-critic.md](design-critic.md) | Complete |
| code-review-agent | [code-review-agent.md](code-review-agent.md) | Complete |
| test-case-generator | [test-case-generator.md](test-case-generator.md) | Complete |
| release-verifier | [release-verifier.md](release-verifier.md) | Complete |
| research-synthesizer | research-synthesizer.md | Coming v1.3 |
| solution-mapper | solution-mapper.md | Coming v1.3 |
| dashboard-narrator | dashboard-narrator.md | Coming v1.3 |
| dependency-mapper | dependency-mapper.md | Coming v1.3 |
| compliance-checker | compliance-checker.md | Coming v1.3 |

## Update process

See `04-ai-service-mesh/governance.md` — Prompt Update Process section.
