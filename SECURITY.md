# Security Policy

## Supported versions

ORDITO is a documentation and process framework. We don't distribute executable binaries in the core repository, but we maintain JSON schemas, prompts for AI services, and templates that may be used in automated pipelines.

| Version | Supported                                    |
| ------- | -------------------------------------------- |
| 1.1.x   | ✓                                            |
| < 1.1   | ✗ (pre-release, not intended for production) |

## What we consider a security vulnerability

For ORDITO, vulnerabilities include:

- **JSON Schemas** that could allow injection of malicious payloads when consumed by AI services
- **Prompt templates** that could enable prompt injection or sensitive data exfiltration
- **Code examples** in playbooks that, if copied without adaptation, could expose credentials or data
- **Documentation** that recommends practices with unclear security implications (e.g., "send the brief to the AI service" without making PII risks explicit)

## What is NOT a vulnerability

- Framework design decisions you disagree with (open an RFC)
- Known limitations documented in the manifesto
- Insecure organizational practices of teams adopting ORDITO (their responsibility)

## How to report a vulnerability

**Do not open public issues for security vulnerabilities.**

Report via [GitHub Security Advisories](https://github.com/fortunato-deangelis/ordito/security/advisories/new) with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any mitigation suggestions

We will respond within 7 business days with an initial assessment.

## Disclosure process

1. Acknowledgment of receipt within 7 days
2. Analysis and validation within 30 days
3. Patch or documentation update within 60 days of validation
4. Coordinated public disclosure with the reporter
5. Public credit to the reporter (if desired)

## Bug bounty

ORDITO is a community-driven open source project without a bug bounty budget. We can offer:

- Public credit in the SECURITY HALL OF FAME
- Mention in the CHANGELOG
- "Security Contributor" badge in the repository
