# `ordito` — CLI

A minimal command-line tool to make ORDITO adoption practical: scaffold artifacts, validate them against the schema, run gate checklists, and export from Jira.

## Status

**v0.2 — local wrapper loop.** `new`, `validate`, `gate`, and offline `eval` readiness are functional. `gate` can append a gate decision directly to an artifact JSON when run with `--write`. `export-from-jira` is still a stub with declared interface; the implementation depends on the team's Jira config.

The CLI is intentionally minimal-dependency (only `ajv` and `ajv-formats`) so it runs in any Node 20+ environment without supply-chain bloat.

## Install

From this directory:

```bash
npm install
npm run build
npm link
```

Then `ordito` is on your PATH.

Alternatively, run directly without install:

```bash
npm install
npm run build
node dist/index.js <command>
```

## Commands

### `ordito new`

Scaffold a new artifact in `03-artifacts/` (or anywhere via `--out`).

```bash
ordito new --type feature_brief_pack --mode core --owner product_lead
```

Options:

- `--type <artifact_type>` — required; one of the enums in `schemas/artifact.schema.json`
- `--mode <core|explore|scale|hotfix>` — initiative mode (defaults from Charter if `--charter` provided)
- `--owner <role>` — owner_role enum value
- `--charter <path>` — link to existing Initiative Charter for upstream_refs
- `--id <id>` — artifact_id (otherwise generated as TYPE-YYYY-NNN with monotonic sequence)
- `--out <path>` — output directory (default: `03-artifacts/`)

Output: a JSON file pre-populated with required fields and sensible defaults, plus a Markdown companion stub for narrative.

### `ordito validate`

Validate JSON artifacts against `schemas/artifact.schema.json`.

```bash
ordito validate                      # validate all 03-artifacts/examples/json/*.json
ordito validate --path <file_or_dir> # validate a specific file or directory
```

Exit code: 0 if all valid, 1 if any invalid (with errors printed).

### `ordito gate`

Interactive gate checklist runner. Walks through the requirements for the chosen gate and produces a `decision_log` entry. With `--write`, it appends the entry directly to the artifact JSON and updates `gate_stage` / `last_reviewed_at`.

```bash
ordito gate g1 --artifact INIT-2026-014
ordito gate g2 --artifact BRIEF-2026-067
ordito gate release --artifact REL-2026-022
ordito gate g1 --artifact BRIEF-2026-067 --write
ordito gate g1 --path 03-artifacts/json/BRIEF-2026-067.json --write
ordito gate g1 --artifact BRIEF-2026-067 --yes --outcome GO --rationale "Because the brief satisfies the committed enterprise onboarding KPI and all blocking dependencies are owned." --owner product_lead --write
```

The checklist content comes from `05-playbooks/{core,explore,scale}.md` based on the initiative's mode.

Output: prints the `decision_log` entry by default; writes it to the artifact when `--write` is present.

### `ordito eval`

Offline eval readiness checker. It verifies that a service exists in `registry.json`, its prompt file exists, its rubric exists, and its `golden-set.jsonl` entries contain the required fields. It does not call a model.

```bash
ordito eval intake-coach
ordito eval intake-coach --id GS-IC-001
```

Output: readiness pass/fail for prompt, rubric, and golden-set structure. Provider-scored evals remain planned.

### `ordito export-from-jira`

**v0.1 — stub.** Declared interface; implementation requires team-specific Jira config. See `08-integrations/jira.md` for the field mapping that this command will automate.

```bash
ordito export-from-jira --issue PROD-1234 --out 03-artifacts/json/
```

Planned behaviour:
1. Fetch the issue via Jira REST API
2. Map fields per `08-integrations/jira.md`
3. Produce a JSON artifact conforming to the schema
4. Add a comment on the Jira issue noting the export

Required env vars (when implemented): `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`.

## Why we wrote this

Without a CLI, ORDITO adoption requires either (a) a custom internal tool or (b) trusting humans to remember the schema. Both fail in real teams. The CLI is the smallest-possible-thing that lowers the cost of correctness:

- `new` removes the "what fields are required" question.
- `validate` is the loop that lets a contributor know they got it right.
- `gate` removes the "did we cover everything" worry from gate facilitators.
- `export-from-jira` (when implemented) eliminates the daily-tool/JSON drift that AP-014 (Two sources of truth) is built on.

## Roadmap

| Version | Adds |
|---|---|
| v0.1 (this) | `new`, `validate` functional; `gate`/`export-from-jira` skeletons |
| v0.2 | `gate` writes decision_log directly; offline eval readiness runner |
| v0.3 | `export-from-jira` reference implementation; `import-to-linear` |
| v0.4 | `audit-pack --quarter` exporter for compliance evidence |
| v0.5 | Plugin API for custom AI service invocations |

## Contributing

PRs welcome. The CLI is part of the framework — changes to its commands or output format go through the same RFC process as schema changes (Principle 10).
