# Contributing to ORDITO

ORDITO is a framework that proposes discipline and traceability. **Its evolution follows the same rules.**

We don't accept PRs without an accepted RFC (except for typo fixes and clarifications that don't change substance). This prevents the framework from fragmenting into a thousand opinions and keeps consistency across levels — a tense warp doesn't let itself be pulled in a thousand directions.

## Types of contribution

| Type | Process | Average time |
|---|---|---|
| **Typo fix, clarification** | Direct PR to `main` | 1-3 days |
| **New example or case study** | PR with review | 1-2 weeks |
| **New artifact template** | RFC + PR | 2-4 weeks |
| **New AI service** | RFC + PR | 3-6 weeks |
| **Manifesto principle modification** | Extended RFC + community vote | 1-3 months |

## The RFC process

1. **Open an Issue** with the `rfc-proposal` label. Describe the problem the modification solves.
2. **Preliminary discussion** in the Issue for at least 7 days. The community can request clarifications.
3. **Actual RFC** — open a PR adding a file in `08-rfcs/NNNN-title.md` following the template.
4. **Review** by maintainers and community for at least 14 days.
5. **Decision** — accepted, rejected, deferred, needs-revision. All motivated.
6. **Implementation** — only if accepted, open an implementation PR linking to the RFC.

## What we look for in proposals

- **Consistency with manifesto principles.** A proposal that violates a principle is not accepted without a proposal to modify the principle itself.
- **Concrete examples.** An abstract proposal without a use case is not evaluable.
- **Failure mode.** When does your proposal not work? Without this honesty, we can't validate it.
- **Adoption cost.** A good idea with very high adoption cost is a bad idea for an open source framework.

## What we do NOT look for

- **Adding AI services for the sake of having more.** Every added service is mass to manage. High bar.
- **Compatibility with specific tools in the core.** Integrations live in separate plugin repositories.
- **Elegant abstractions without real use cases.** If no team has ever had this problem, we don't solve it.

## The RFC template

```markdown
# RFC NNNN: Short title

- Status: [draft | proposed | accepted | rejected | deferred]
- Author: @username
- Created: YYYY-MM-DD
- Replaces: (any superseded RFCs)

## Problem
What doesn't work today.

## Proposal
What you would change, exactly.

## Use case
A concrete end-to-end case.

## Alternatives considered
What you evaluated and why you discarded it.

## Failure mode
When this proposal doesn't work or causes harm.

## Adoption cost
What teams that already adopted ORDITO need to do.

## Impact on principles
Which manifesto principles are touched and how.
```

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). In short: respect, focus on ideas not people, zero tolerance for harassment.

## Maintainers

Current maintainers are listed in [MAINTAINERS.md](MAINTAINERS.md). Controversial decisions are made by majority, with a motivated veto possible from the lead maintainer for matters of consistency with the manifesto.

## Questions?

Open a Discussion with the `question` tag. We respond within a week.
