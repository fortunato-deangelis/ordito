# The ORDITO Manifesto

> *"The warp is the threads that stay still. The weft is what passes through them. Without a warp, the weft is just a tangle of yarn."*

ORDITO is an open-source operating system for product teams that want to integrate AI into their processes without losing human accountability — and accelerate go-to-market without breaking quality.

The name is not decorative. *Ordito* is the Italian word for **warp**: in weaving, the longitudinal threads held under tension while the **weft** (the moving thread on the shuttle) passes through them to create fabric. Without a tense, regular warp, every pass of the weft produces tangle instead of pattern.

In a product team, the **warp is the principles, gates, contractual artifacts, roles, metrics** — the stable structure. The **weft is the initiatives, features, daily decisions** — the variable work that passes through the structure. AI is a **shuttle accelerator**: it makes the weft pass faster, but only if the warp is well tensioned.

This metaphor isn't aesthetics. It's the framework's mental model.

---

## The Ten Principles

### 1. Decisions are human, the warp is shared

AI produces structure, synthesis, verification, acceleration. Decisions with consequences stay in the hands of people with names and roles. Every AI service in ORDITO has explicit human escalation. There is no decision without an owner — just as there is no fabric without a weaver who decides the pattern.

### 2. Nothing passes as free text

Between phases, opaque documents don't pass. **Contractual artifacts** pass: they have minimum schema, owner, status, upstream and downstream references. They are readable both by a person in five minutes and by an AI service without ambiguity. An artifact missing these fields is a slack thread — you can't pass the weft over it.

### 3. Override is a right, but it's tracked

Any AI service output can be ignored by the human owner. This is a right, not a concession. But if an override repeats with the same pattern, the problem isn't the person doing it: it's the tuning of the service or the artifact contract. Overrides are the system's most valuable learning signal — they are the points where the warp has loosened.

### 4. Gates are not bureaucracy, they are warp tension

Gates (G1, G2, Release, Learning) don't exist to slow you down. They exist to verify the warp is still tense before the next pass. When you're six months in and the product isn't working, gates are the only way to reconstruct where the structure came loose.

### 5. Three modes, not one size fits all

An MVP isn't managed like a legacy evolution. A hotfix isn't managed like a strategic initiative. ORDITO recognizes three modes — **Core**, **Explore**, **Scale** — and adjusts documentation depth, gates, and AI services based on context. Rigidity is the first way a framework dies: a warp that doesn't adapt to the fabric it must produce will snap.

### 6. The learning loop is non-negotiable

Every initiative closes with an Impact Review. Not to produce another document, but to verify whether the expected value materialized. Without this step, the system delivers but doesn't learn — and becomes a machine that produces useless features at increasing speed. A loom without fabric inspection produces defects faster.

### 7. AI goes where there is repetition, not where there is judgment

Fragmented briefs, test cases derivable from AC, interview synthesis, handoff completeness checks: here AI accelerates by 10x and frees human time. Scope decisions, architecture trade-offs, customer prioritization: here AI can inform, never decide. Confusing the two domains is the fastest way to cause disasters with AI.

### 8. Artifact contracts are machine-readable

The logical schema of artifacts lives in JSON Schema, not just in PDFs. This allows AI services to read and produce valid artifacts, CI to block non-conforming contributions, and tools (Jira, Linear, Notion) to expose the same logical model. The contract is the framework's API. It's the regularity of the warp that lets the weft pass without snags.

### 9. Privacy and governance are part of the design, not an appendix

When an AI service reads briefs, tickets, code, decision logs — that data has a destination. ORDITO requires every service to declare: what model it uses, where the data lives, what the retention is, who can see the outputs. Without this transparency, the framework is not adoptable in any serious organization.

### 10. The framework evolves in the same form it proposes

ORDITO is a public repository. Every evolution proposal is a contractual artifact (an RFC), passes a gate (community review), produces a changelog. We can't propose a disciplined working method and then manage its evolution chaotically. The warp of ORDITO is ORDITO itself.

---

## What ORDITO is **not**

- **Not an alternative agile methodology.** It lives on top of Scrum, SAFe, Shape Up. It doesn't replace them — it tensions them.
- **Not a tool.** It's a logical model. You implement it with the tools you already have (Jira, Figma, GitHub, Notion, any LLM).
- **Not a guarantee.** A framework doesn't make good products. Competent people with a good framework make good products more often.
- **Not "AI-first" in the empty sense.** AI is a component, not the hero. The framework works even if you disable half the AI services — slower, but it works. The warp holds even if the shuttle is slow.

---

## Who ORDITO speaks to

- **Product Leads** dealing with chaotic intake who want a system that filters the noise.
- **Engineering Leads** tired of receiving incomplete briefs and redoing work mid-sprint.
- **UX Leads** who want gap-free handoffs and traceability for every design choice.
- **Business Sponsors** who want portfolio visibility without becoming bottlenecks.
- **Teams adopting AI tools** who realize that without structure, AI amplifies chaos instead of reducing it.

---

## The invitation

If these principles resonate, take ORDITO, adapt it, break it where it doesn't work, propose improvements. The framework improves with real use, not with theory. A warp tensions better after a few meters of fabric have been produced.

If they don't resonate, thank you for reading this far. Not every team needs this level of structure, and that's perfectly fine.

---

*Manifesto version: 1.1*
*Last updated: see CHANGELOG.md*
