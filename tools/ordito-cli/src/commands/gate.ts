import { promises as fs } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "../../../../");

const GATE_CHECKLISTS: Record<string, { title: string; items: string[]; outcomes: string[] }> = {
  g0: {
    title: "G0 — Backlog Entry",
    items: [
      "Initiative Charter or Opportunity Brief exists",
      "owner_role is set (sponsor or founder)",
      "objective is specific (not generic)",
      "risk_band is assessed",
      "KPIs declared with baseline and target",
    ],
    outcomes: ["GO", "PARKING_LOT", "REJECTED"],
  },
  g1: {
    title: "G1 — Commitment",
    items: [
      "Feature Brief Pack present and linked via upstream_refs",
      "Acceptance criteria ≥ 3 in given/when/then format",
      "In/out of scope explicitly documented",
      "Dependencies named (not 'integration team')",
      "Tracking plan includes events and KPIs",
      "Engineering Lead has co-signed",
      "consistency-checker findings reviewed (if any)",
    ],
    outcomes: ["GO", "GO_REDUCED", "HOLD", "NO_GO"],
  },
  g2: {
    title: "G2 — Build-ready",
    items: [
      "Design Spec produced (UX Lead)",
      "Technical Design Note produced (Engineering Lead)",
      "All ACs covered in design and TDN",
      "Dependencies confirmed with cross-team owners",
      "Test plan seeded in TDN",
      "Architecture sign-off complete (Scale mode only)",
      "consistency-checker findings reviewed",
    ],
    outcomes: ["READY", "NOT_READY", "HOTFIX_OVERRIDE"],
  },
  release: {
    title: "Release Gate",
    items: [
      "Release Checklist complete with all ACs verified",
      "Rollback procedure documented",
      "Monitoring and alerting configured",
      "release-verifier output reviewed",
      "consistency-checker findings reviewed",
      "Rollout tier decided (dark/beta/full)",
    ],
    outcomes: ["RELEASE", "BLOCKER"],
  },
  learning: {
    title: "Learning Gate",
    items: [
      "Impact Review produced at T+30 minimum",
      "All Charter KPIs have results",
      "Learnings documented with action items",
      "dashboard-narrator recommendation reviewed",
    ],
    outcomes: ["VALUE_CONFIRMED", "PIVOT_NEEDED", "KILL"],
  },
};

export async function runGate(gateName: string, flags: Record<string, string | true>): Promise<void> {
  const gate = gateName.toLowerCase();
  if (!GATE_CHECKLISTS[gate]) {
    throw new Error(`Unknown gate: ${gateName}. Use one of: g0, g1, g2, release, learning.`);
  }
  const artifactId = typeof flags.artifact === "string" ? flags.artifact : "";
  if (!artifactId) throw new Error("--artifact <id> is required");

  const cfg = GATE_CHECKLISTS[gate];
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log(`\n${cfg.title} — checklist for ${artifactId}\n`);

  let yesCount = 0;
  for (const item of cfg.items) {
    const answer = (await rl.question(`  [ ] ${item}\n      ok? (y/n/skip) > `)).trim().toLowerCase();
    if (answer === "y" || answer === "yes") yesCount++;
    else if (answer === "skip") continue;
    else if (answer !== "n" && answer !== "no") console.log("    (interpreted as no)");
  }

  console.log(`\nChecklist: ${yesCount}/${cfg.items.length} confirmed`);
  console.log(`\nOutcomes: ${cfg.outcomes.join(" / ")}`);
  const outcome = (await rl.question(`Outcome > `)).trim().toUpperCase();
  if (!cfg.outcomes.includes(outcome)) {
    console.warn(`Warning: outcome '${outcome}' is not standard for ${cfg.title}.`);
  }
  const rationale = (await rl.question(`Rationale (start with 'Because…', min 30 chars) > `)).trim();
  const owner = (await rl.question(`Owner role (e.g. product_lead) > `)).trim();

  rl.close();

  const entry = {
    timestamp: new Date().toISOString(),
    decision: outcome,
    decision_type: gate === "learning" ? "gate_outcome" : "gate_outcome",
    gate_id: gate.toUpperCase().replace("RELEASE", "release").replace("LEARNING", "learning"),
    rationale,
    owner,
  };

  console.log(`\nDecision_log entry to paste into ${artifactId}:\n`);
  console.log(JSON.stringify(entry, null, 2));
  console.log(`\nv0.1 does not write to the artifact directly. Paste manually for now.`);
  // Touch REPO_ROOT to silence unused warning when rendering paths in future.
  void REPO_ROOT;
}
