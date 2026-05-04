# Rubric — intake-coach

## Schema validity (binary per output)

The output is valid if it contains, in this order:
1. A line "FRQ Score: X.X/10" with numeric score in [0, 10]
2. Per-dimension scores for problem (max 2.5), user (max 1.5), value (max 2.0), constraints (max 1.5), acceptance criteria (max 2.5) — each on its own line
3. A "Weak fields" section listing zero or more field names from the FRQ
4. A "Suggestions" section with 3 to 5 numbered, specific suggestions
5. An "Improvement prompt" section with at least 60 characters

If any of the five sections is missing or malformed: schema validity = 0 for this entry.

## Faithfulness rules

A faithfulness violation occurs if any of the following is true:

- **Persona invention**: the output names a persona / role / segment not present in the FRQ or Charter input
- **KPI invention**: the output references a KPI / metric / number that is not in the FRQ or Charter input
- **Constraint invention**: the output cites a constraint not present in either input artifact
- **Score outside expected range**: the FRQ Score is outside the rubric range declared in `expected.score_range` (this signals scoring drift)
- **False positive on weak fields**: the output flags a field as weak that is in fact well-specified per the input (cross-check against the input strings)
- **False negative on weak fields**: the output declares no weak fields when the input has at least one missing required dimension

Each violation reduces faithfulness by 1/N where N is the number of golden set entries. A score of 1.0 means zero violations across the set.

## Override prediction

For each golden set entry, compare the output to the `expert_outcome`:

| Output pattern | Predicts |
|---|---|
| Score >= 8.0 and 0 weak fields and ≤2 suggestions | `accepted` |
| Score 6.0–7.9 OR 1–2 weak fields OR 3–5 suggestions | `accepted_with_edits` |
| Score < 6.0 OR ≥3 weak fields | `overridden` (i.e. FRQ should be sent back) |
| (Almost never) Suggestions reference scope decisions or architecture | `discarded` (out-of-scope output) |

Override prediction = 1 - (mismatched_predictions / total_entries).

## Aggregation

```
overall = 0.4 * schema_validity + 0.3 * faithfulness + 0.3 * override_prediction
```

Targets per `intake-coach/README.md`. A prompt change must keep `overall` within ±5% of the previous run, or the change must be flagged as intentional regression in CHANGELOG.
