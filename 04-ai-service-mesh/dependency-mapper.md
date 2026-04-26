# AI Service — Dependency Mapper

**Canonical name**: `dependency-mapper`
**Phase**: 4 — Solution Design (Scale mode primary)
**Purpose**: Map cross-team and cross-system dependencies for Scale mode initiatives. Produce a structured dependency matrix with risk assessment per dependency.

---

## Inputs

| Field | Source | Required |
|---|---|---|
| Feature Brief Pack | `feature_brief_pack` | Yes |
| Technical Design Note (draft) | `technical_design_note` | Yes |
| Known team topology | Free text | Recommended |
| Integration architecture context | Free text | Recommended |

---

## Outputs

Full dependency matrix (`dependency_matrix` embedded in TDN) with:
1. **DEP entries**: one per dependency, with type, name, integration point, risk, owner, blocking gate
2. **Risk assessment** per dependency: low/medium/high/critical
3. **Coordination plan**: what needs to be done before each blocking gate
4. **Missing information flags**: dependencies identified but owner or integration point unknown

---

## Recommended Model

- **Primary**: `claude-opus-4-7`
- **Alternative**: `claude-sonnet-4-6`

The Opus tier is recommended because dependency mapping requires synthesizing multiple systems and teams simultaneously — a reasoning-intensive task.

---

## Retention and Visibility

- **Retention**: `sprint`
- **Visibility**: `internal-team`
- **PII risk**: `low`

---

## When to use

Dependency Mapper is **required in Scale mode** when >1 cross-team or cross-system dependency exists.

In Core mode, Dependency Mapper is optional — used when the Engineering Lead identifies >2 cross-team dependencies during Solution Design.

In Explore mode, Dependency Mapper is not typically used — if an MVP requires it, consider whether Scale mode is more appropriate.

---

## Dependency Matrix Format

See `05-playbooks/scale.md` for the full dependency matrix YAML format.
