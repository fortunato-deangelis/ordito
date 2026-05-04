import { promises as fs } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "../../../../");
const EVAL_ROOT = join(REPO_ROOT, "04-ai-service-mesh/evals");
const REGISTRY_PATH = join(REPO_ROOT, "04-ai-service-mesh/registry.json");

type GoldenSetEntry = {
  id?: string;
  input?: unknown;
  expected?: unknown;
  expert_outcome?: string;
  expert_edits?: string;
};

type Registry = {
  services?: Array<{
    canonical_id?: string;
    prompt_file?: string;
  }>;
};

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await fs.readFile(path, "utf-8"));
}

function validateEntry(entry: GoldenSetEntry, line: number): string[] {
  const errors: string[] = [];
  if (!entry.id) errors.push(`line ${line}: missing id`);
  if (entry.input === undefined) errors.push(`line ${line}: missing input`);
  if (entry.expected === undefined) errors.push(`line ${line}: missing expected`);
  if (!entry.expert_outcome) errors.push(`line ${line}: missing expert_outcome`);
  if (entry.expert_edits === undefined) errors.push(`line ${line}: missing expert_edits`);
  return errors;
}

export async function runEval(serviceName: string, flags: Record<string, string | true>): Promise<void> {
  if (!serviceName) throw new Error("ordito eval <service_name> is required");

  const registry = (await readJson(REGISTRY_PATH)) as Registry;
  const service = registry.services?.find((s) => s.canonical_id === serviceName);
  if (!service) throw new Error(`Unknown service in registry: ${serviceName}`);

  const serviceDir = join(EVAL_ROOT, serviceName);
  const goldenSetPath = join(serviceDir, "golden-set.jsonl");
  const rubricPath = join(serviceDir, "rubric.md");
  const promptPath = service.prompt_file ? join(REPO_ROOT, "04-ai-service-mesh", service.prompt_file) : "";

  await fs.access(goldenSetPath);
  await fs.access(rubricPath);
  if (promptPath) await fs.access(promptPath);

  const onlyId = typeof flags.id === "string" ? flags.id : undefined;
  const lines = (await fs.readFile(goldenSetPath, "utf-8"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let checked = 0;
  const errors: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    let parsed: GoldenSetEntry;
    try {
      parsed = JSON.parse(lines[i]) as GoldenSetEntry;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`line ${i + 1}: invalid JSONL entry: ${message}`);
      continue;
    }
    if (onlyId && parsed.id !== onlyId) continue;
    checked++;
    errors.push(...validateEntry(parsed, i + 1));
  }

  if (onlyId && checked === 0) throw new Error(`No golden-set entry found for --id ${onlyId}`);
  if (errors.length > 0) {
    for (const e of errors) console.error(`✗ ${e}`);
    throw new Error(`${errors.length} eval readiness error(s)`);
  }

  console.log(`✓ ${serviceName}: prompt exists`);
  console.log(`✓ ${serviceName}: rubric exists`);
  console.log(`✓ ${serviceName}: ${checked} golden-set entr${checked === 1 ? "y" : "ies"} structurally valid`);
  console.log("Offline eval readiness passed. Model-scored evals remain provider-specific.");
}
