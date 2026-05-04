import { promises as fs } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ARTIFACT_TYPES = [
  "initiative_charter",
  "feature_request",
  "feature_brief_pack",
  "design_spec",
  "technical_design_note",
  "tracking_plan",
  "release_checklist",
  "impact_review",
  "opportunity_brief",
  "exploration_report",
  "mvp_frame",
  "mvp_decision_review",
] as const;

const TYPE_TO_PREFIX: Record<string, string> = {
  initiative_charter: "INIT",
  feature_request: "FRQ",
  feature_brief_pack: "BRIEF",
  design_spec: "DSPEC",
  technical_design_note: "TDN",
  tracking_plan: "TRK",
  release_checklist: "REL",
  impact_review: "IR",
  opportunity_brief: "OPP",
  exploration_report: "EXP",
  mvp_frame: "MVP",
  mvp_decision_review: "MVDR",
};

const ARTIFACT_REPO_ROOT = resolve(__dirname, "../../../../");

function isArtifactType(t: string): t is (typeof ARTIFACT_TYPES)[number] {
  return (ARTIFACT_TYPES as readonly string[]).includes(t);
}

async function nextSequenceForPrefix(outDir: string, prefix: string): Promise<number> {
  try {
    const entries = await fs.readdir(outDir);
    const year = new Date().getUTCFullYear();
    const re = new RegExp(`^${prefix}-${year}-(\\d{3,})\\.json$`);
    let max = 0;
    for (const e of entries) {
      const m = e.match(re);
      if (m) {
        const n = parseInt(m[1], 10);
        if (n > max) max = n;
      }
    }
    return max + 1;
  } catch {
    return 1;
  }
}

export async function newArtifact(flags: Record<string, string | true>): Promise<void> {
  const type = typeof flags.type === "string" ? flags.type : "";
  if (!type) throw new Error("--type is required (one of: " + ARTIFACT_TYPES.join(", ") + ")");
  if (!isArtifactType(type)) throw new Error(`Unknown artifact_type: ${type}`);

  const owner = typeof flags.owner === "string" ? flags.owner : "product_lead";
  const mode = typeof flags.mode === "string" ? flags.mode : undefined;
  const charterRef = typeof flags.charter === "string" ? flags.charter : undefined;
  const outDir = typeof flags.out === "string" ? resolve(flags.out) : join(ARTIFACT_REPO_ROOT, "03-artifacts/json");

  await fs.mkdir(outDir, { recursive: true });

  const prefix = TYPE_TO_PREFIX[type];
  const year = new Date().getUTCFullYear();
  const idFlag = typeof flags.id === "string" ? flags.id : undefined;
  const seq = idFlag ? null : await nextSequenceForPrefix(outDir, prefix);
  const artifact_id = idFlag ?? `${prefix}-${year}-${String(seq).padStart(3, "0")}`;

  const now = new Date().toISOString();

  const upstream_refs: string[] = [];
  if (charterRef) {
    try {
      const raw = await fs.readFile(resolve(charterRef), "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.artifact_id === "string") upstream_refs.push(parsed.artifact_id);
    } catch {
      // Charter not found or not JSON — leave upstream_refs empty
    }
  }

  const artifact: Record<string, unknown> = {
    artifact_id,
    artifact_type: type,
    owner_role: owner,
    status: "draft",
    lifecycle_state: "draft",
    gate_state: "waiting",
    objective: `[FILL ME] One-sentence statement of what this ${type} represents (min 20 chars).`,
    last_reviewed_at: now,
    upstream_refs,
    downstream_refs: [],
    constraints: [],
    decision_log: [],
    ai_services_used: [],
    tags: [],
  };

  if (mode) artifact.mode = mode;

  if (type === "initiative_charter") {
    artifact.risk_band = "medium";
    artifact.telemetry_plan = { kpis: [] };
  }
  if (type === "feature_brief_pack" || type === "feature_request") {
    artifact.acceptance_criteria = [];
    artifact.risk_band = "medium";
    artifact.telemetry_plan = { events: [], kpis: [] };
  }
  if (type === "release_checklist" || type === "technical_design_note") {
    artifact.acceptance_criteria = [];
  }

  const jsonPath = join(outDir, `${artifact_id}.json`);
  const mdPath = join(outDir, `${artifact_id}.md`);

  await fs.writeFile(jsonPath, JSON.stringify(artifact, null, 2) + "\n", "utf-8");

  const mdStub = [
    `# ${artifact_id}`,
    "",
    `> **Type**: ${type}  ·  **Owner**: ${owner}  ·  **Status**: draft`,
    "",
    "## Objective",
    "",
    "[FILL ME — same as the JSON `objective` field but in narrative form.]",
    "",
    "## Notes",
    "",
    "- This Markdown is a companion to the JSON. The JSON is the contract; the Markdown is the narrative.",
    "- See `schemas/artifact.schema.json` for the contract.",
    "",
  ].join("\n");

  await fs.writeFile(mdPath, mdStub, "utf-8");

  console.log(`Created ${jsonPath}`);
  console.log(`Created ${mdPath}`);
  console.log(`Next: edit the objective, fill required fields, then run \`ordito validate --path ${jsonPath}\``);
}
