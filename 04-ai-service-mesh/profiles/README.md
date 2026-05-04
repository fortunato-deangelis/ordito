# Agent profiles

The 12 ORDITO services are **atomic**: one prompt, one phase, one I/O contract. This is the design that makes governance tractable. It is also the design that makes operations tedious — at a real gate, a Product Lead invokes 2–3 services, reads their output, reconciles, and decides.

Agent profiles are an experimental layer **above** the atomic services. A profile is a small orchestration that:

1. Knows which atomic services apply to a phase or gate
2. Decides which to invoke (e.g. don't run `research-synthesizer` if no qualitative material is present)
3. Sequences invocations and feeds outputs forward
4. Surfaces a single consolidated artifact draft to the human reviewer

A profile is not a new model and not a new prompt. It is a deterministic orchestration script that calls atomic services per the registry.

## Status

**v1.4 — experimental.** Profiles are documented; reference implementations land in CLI v0.5 with the plugin API. The atomic services remain the contract. If you adopt a profile, your audit trail still lists the atomic services that were invoked.

## Why not just one bigger prompt?

A single mega-prompt that produces a Brief Pack from raw inputs would be smaller in code and bigger in problems:

- Governance grain is lost — `pii_risk` per source, `autonomy_tier` per service, retention per service all collapse to whatever the mega-prompt declares
- Override signal is lost — overrides cluster on the mega-prompt, not on the specific reasoning step that failed
- Eval cost explodes — a golden set has to cover all combinations rather than per-service slices

Profiles compose atomic services without losing the per-service governance and eval discipline.

## Profile contract

Every profile must declare:

- `profile_name` — canonical id
- `phase` — which ORDITO phase it serves
- `atomic_services` — the registry services it composes
- `decision_logic` — the rules deciding which services run, in pseudo-code
- `output_artifacts` — the artifacts it produces (must match the union of atomic service outputs)
- `autonomy_tier` — the strictest tier of any composed service applies

## Available profiles (v1.4)

| Profile | Phase | Composes | Status |
|---|---|---|---|
| [discovery-agent](discovery-agent.md) | 3 — Discovery | brief-builder, research-synthesizer, intake-coach (re-check) | Documented; reference impl pending |

## Submitting a new profile

Open an RFC. The profile must:

1. Compose ≥2 existing atomic services (no new prompts)
2. Improve a metric measured in eval (faithfulness, override prediction, or time-to-output) on a real-team golden set
3. Declare a `decision_logic` that a human can read in <10 minutes

Profiles that contain new prompt logic are atomic services in disguise — submit them as services instead.
