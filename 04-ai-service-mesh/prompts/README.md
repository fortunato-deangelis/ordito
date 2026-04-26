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
| prioritization-copilot | prioritization-copilot.md | Coming v1.2 |
| brief-builder | brief-builder.md | Coming v1.2 |
| research-synthesizer | research-synthesizer.md | Coming v1.2 |
| design-critic | design-critic.md | Coming v1.2 |
| solution-mapper | solution-mapper.md | Coming v1.2 |
| code-review-agent | code-review-agent.md | Coming v1.2 |
| test-case-generator | test-case-generator.md | Coming v1.2 |
| release-verifier | release-verifier.md | Coming v1.2 |
| dashboard-narrator | dashboard-narrator.md | Coming v1.2 |
| dependency-mapper | dependency-mapper.md | Coming v1.2 |
| compliance-checker | compliance-checker.md | Coming v1.2 |

## Update process

See `04-ai-service-mesh/governance.md` — Prompt Update Process section.
