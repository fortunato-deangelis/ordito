# AI service evaluation framework

Why this exists
- Prompts in ORDITO are framework code — when they change, behaviour changes.
- "Eval-by-vibes" (AP-012) is the failure mode: someone rereads three outputs and feels better. No regression test, no metric.
- Without evals, the framework cannot honour Principle 3 (override is a learning signal): you cannot tell a prompt regression from a context change.

This framework runs every prompt change against a golden set and reports a delta in three dimensions:

1. **Schema validity** — does the output parse against the expected template?
2. **Faithfulness** — does the output stay grounded in the input artifact (no hallucinated personas, KPIs, dependencies)?
3. **Override prediction** — does the output match the human-reviewer outcome that an expert produced for the same input?

## Layout

```
04-ai-service-mesh/evals/
├── README.md                      ← this file
├── intake-coach/
│   ├── README.md                  ← per-service eval doc
│   ├── golden-set.jsonl           ← input/expected pairs
│   └── rubric.md                  ← scoring criteria
├── brief-builder/
│   └── ...
└── consistency-checker/
    └── ...
```

## Golden set format

Each service has a `golden-set.jsonl` — one JSON object per line:

```json
{"id": "GS-001", "input": { ...full prompt input... }, "expected": { ...expected output structure... }, "expert_outcome": "accepted_with_edits", "expert_edits": "Reworded AC2 to remove ambiguity; added missing dependency on team X." }
```

Field meanings:

- `id` — stable identifier
- `input` — the structured input the prompt receives (artifact JSON or fields per the prompt template)
- `expected` — for schema validity and faithfulness checks: required keys/sections in the output
- `expert_outcome` — what the human reviewer concluded with this input historically: `accepted` / `accepted_with_edits` / `overridden` / `discarded`
- `expert_edits` — natural-language description of what changed; used for qualitative review

## Running evals

```bash
ordito eval intake-coach              # run all entries in golden-set.jsonl
ordito eval intake-coach --id GS-007  # one entry
ordito eval intake-coach --diff       # compare current prompt vs registry's last_prompt_update
```

(CLI v0.2 will implement the runner. v0.1 ships the golden sets and rubrics.)

## Scoring rubric (per service)

Each service ships its own `rubric.md` with:
- **Schema validity** scoring (binary per output)
- **Faithfulness** rules (e.g. "no persona invented beyond input"; "every cited KPI traces to input")
- **Override prediction** mapping (when does the model output match what the expert decided?)

Aggregated across the golden set, the eval produces a vector:

```
schema_validity:    0.95   (19/20)
faithfulness:       0.90   (per service rubric)
override_prediction: 0.78
```

A prompt change is acceptable if all three dimensions stay within ±5% of the previous version, OR if the change is intentional and the CHANGELOG entry justifies the regression.

## When to run evals

- **On every prompt PR**: required as CI step (added to `.github/workflows/validate.yml` in v1.5)
- **On every model change**: drift detection. If `claude-sonnet-4-6` is replaced by a successor, rerun all evals before bumping the registry's `recommended_model`
- **Quarterly**: at ORDITO Retrospective. Compare overrides observed in production vs `override_prediction` from the eval. A wide gap means the golden set is stale

## Building a golden set from production

1. Pick 20 real artifact-input pairs from the last quarter (anonymized per `04-ai-service-mesh/governance.md` PII rules)
2. Have the service's primary human reviewer mark each as `accepted` / `accepted_with_edits` / `overridden` / `discarded`
3. For `accepted_with_edits`, capture the edit (one line per case)
4. Save as `golden-set.jsonl`
5. Refresh quarterly — drop entries whose context no longer reflects current product

## What this framework does NOT do

- It does not score subjective quality. There is no "better prompt" oracle. The benchmark is consistency with expert review.
- It does not replace human review at runtime. It tunes prompts; it does not approve gates.
- It does not test the model itself. It tests the prompt-given-the-model.
