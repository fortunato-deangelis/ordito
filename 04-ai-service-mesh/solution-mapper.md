# AI Service — Solution Mapper

**Canonical name**: `solution-mapper`
**Phase**: 4 — Solution Design
**Purpose**: Produce the Technical Design Note skeleton: system boundaries, data flow, integration points, risk flags, and dependency map.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Feature Brief Pack | `feature_brief_pack` | Yes |
| Design Spec | `design_spec` | Yes |
| Existing system context | Free text | Recommended |
| Known technical constraints | From Brief Pack | Yes |

---

## Outputs

Draft `technical_design_note` with:
1. **System boundary diagram** (described in text/Mermaid): what's in scope vs. not
2. **Data flow**: how data moves through the system for each main scenario
3. **Integration points**: APIs, events, queues, databases involved
4. **Risk flags**: technical risks identified from the design
5. **Dependency map**: preliminary (full map done by Dependency Mapper in Scale mode)
6. **Open questions for Engineering Lead**: architectural decisions that require human judgment

---

## Recommended Model

- **Primary**: `claude-sonnet-4-6`
- **Alternative**: `claude-opus-4-7` (for complex system architectures)

---

## Retention and Visibility

- **Retention**: `session-only`
- **Visibility**: `internal-team`
- **PII risk**: `low`

---

## Prompt Template

See `prompts/solution-mapper.md`.

---

## What Solution Mapper does NOT do

- Does not make architectural decisions — it surfaces options and open questions
- Does not replace Engineering Lead judgment on trade-offs
- Does not validate non-functional requirements (load, performance) — those require testing
- In Scale mode: does not replace Dependency Mapper for full cross-team dependency mapping
