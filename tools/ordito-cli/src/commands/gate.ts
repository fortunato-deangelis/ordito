import { promises as fs } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "../../../../");
const ARTIFACT_SEARCH_DIRS = [
  join(REPO_ROOT, "03-artifacts/json"),
  join(REPO_ROOT, "03-artifacts/examples/json"),
];

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

type Artifact = {
  artifact_id?: string;
  decision_log?: unknown[];
  gate_stage?: string;
  last_reviewed_at?: string;
  [key: string]: unknown;
};

async function fileExists(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path);
    return stat.isFile();
  } catch {
    return false;
  }
}

async function resolveArtifactPath(artifactRef: string, flags: Record<string, string | true>): Promise<string | null> {
  if (typeof flags.path === "string") return resolve(flags.path);
  if (extname(artifactRef) === ".json" || artifactRef.includes("/")) return resolve(artifactRef);

  for (const dir of ARTIFACT_SEARCH_DIRS) {
    const candidate = join(dir, `${artifactRef}.json`);
    if (await fileExists(candidate)) return candidate;
  }
  return null;
}

async function readArtifact(path: string): Promise<Artifact> {
  const raw = await fs.readFile(path, "utf-8");
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Artifact at ${path} is not a JSON object`);
  }
  return parsed as Artifact;
}

function gateIdFor(gate: string): "G0" | "G1" | "G2" | "release" | "learning" {
  if (gate === "g0") return "G0";
  if (gate === "g1") return "G1";
  if (gate === "g2") return "G2";
  if (gate === "release") return "release";
  return "learning";
}

export async function runGate(gateName: string, flags: Record<string, string | true>): Promise<void> {
  const gate = gateName.toLowerCase();
  if (!GATE_CHECKLISTS[gate]) {
    throw new Error(`Unknown gate: ${gateName}. Use one of: g0, g1, g2, release, learning.`);
  }
  const artifactId = typeof flags.artifact === "string" ? flags.artifact : "";
  if (!artifactId) throw new Error("--artifact <id> is required");

  const cfg = GATE_CHECKLISTS[gate];
  const writeBack = flags.write === true;
  const artifactPath = await resolveArtifactPath(artifactId, flags);

  console.log(`\n${cfg.title} — checklist for ${artifactId}\n`);

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  let yesCount = flags.yes === true ? cfg.items.length : 0;
  if (flags.yes === true) {
    for (const item of cfg.items) console.log(`  [x] ${item}`);
  } else {
    for (const item of cfg.items) {
      const answer = (await rl.question(`  [ ] ${item}\n      ok? (y/n/skip) > `)).trim().toLowerCase();
      if (answer === "y" || answer === "yes") yesCount++;
      else if (answer === "skip") continue;
      else if (answer !== "n" && answer !== "no") console.log("    (interpreted as no)");
    }
  }

  console.log(`\nChecklist: ${yesCount}/${cfg.items.length} confirmed`);
  console.log(`\nOutcomes: ${cfg.outcomes.join(" / ")}`);
  const outcome = (typeof flags.outcome === "string" ? flags.outcome : await rl.question(`Outcome > `)).trim().toUpperCase();
  if (!cfg.outcomes.includes(outcome)) {
    console.warn(`Warning: outcome '${outcome}' is not standard for ${cfg.title}.`);
  }
  const rationale = (typeof flags.rationale === "string" ? flags.rationale : await rl.question(`Rationale (start with 'Because...', min 30 chars) > `)).trim();
  const owner = (typeof flags.owner === "string" ? flags.owner : await rl.question(`Owner role (e.g. product_lead) > `)).trim();

  rl.close();

  if (rationale.length < 30) {
    throw new Error("Gate rationale must be at least 30 characters to satisfy artifact.schema.json");
  }
  if (!owner) throw new Error("Owner role is required");

  const entry = {
    timestamp: new Date().toISOString(),
    decision: outcome,
    decision_type: "gate_outcome",
    gate_id: gateIdFor(gate),
    rationale,
    owner,
  };

  if (writeBack) {
    if (!artifactPath) {
      throw new Error(`Could not resolve ${artifactId}. Use --path <artifact.json> with --write.`);
    }
    const artifact = await readArtifact(artifactPath);
    const currentLog = Array.isArray(artifact.decision_log) ? artifact.decision_log : [];
    artifact.decision_log = [...currentLog, entry];
    artifact.gate_stage = gateIdFor(gate);
    artifact.last_reviewed_at = entry.timestamp;
    await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2) + "\n", "utf-8");
    console.log(`\nWrote decision_log entry to ${artifactPath}`);
    return;
  }

  console.log(`\nDecision_log entry for ${artifactId}:\n`);
  console.log(JSON.stringify(entry, null, 2));
  if (artifactPath) console.log(`\nRun again with --write to append it to ${artifactPath}`);
  else console.log(`\nRun again with --write --path <artifact.json> to append it to a file`);
}
