import { promises as fs } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020.js").default;
const addFormats = require("ajv-formats").default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "../../../../");
const SCHEMA_PATH = join(REPO_ROOT, "schemas/artifact.schema.json");
const DEFAULT_PATH = join(REPO_ROOT, "03-artifacts/examples/json");

async function readJsonFiles(target: string): Promise<string[]> {
  const stat = await fs.stat(target);
  if (stat.isFile()) return extname(target) === ".json" ? [target] : [];
  const entries = await fs.readdir(target);
  const files: string[] = [];
  for (const e of entries) {
    const full = join(target, e);
    const s = await fs.stat(full);
    if (s.isDirectory()) {
      files.push(...(await readJsonFiles(full)));
    } else if (extname(e) === ".json") {
      files.push(full);
    }
  }
  return files;
}

export async function validateArtifacts(flags: Record<string, string | true>): Promise<void> {
  const target = typeof flags.path === "string" ? resolve(flags.path) : DEFAULT_PATH;

  const schemaRaw = await fs.readFile(SCHEMA_PATH, "utf-8");
  const schema = JSON.parse(schemaRaw);

  const ajv = new Ajv2020({ strict: false, allErrors: true });
  addFormats(ajv);
  const validator = ajv.compile(schema);

  const files = await readJsonFiles(target);
  if (files.length === 0) {
    console.error(`No JSON files found at ${target}`);
    process.exit(1);
  }

  let invalid = 0;
  for (const f of files) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(await fs.readFile(f, "utf-8"));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`✗ ${f} — invalid JSON: ${msg}`);
      invalid++;
      continue;
    }
    const ok = validator(parsed);
    if (!ok) {
      invalid++;
      console.error(`✗ ${f}`);
      for (const e of validator.errors ?? []) {
        console.error(`    ${e.instancePath || "/"} ${e.message ?? ""}`);
      }
    } else {
      console.log(`✓ ${f}`);
    }
  }

  if (invalid > 0) {
    console.error(`\n${invalid} file(s) failed validation`);
    process.exit(1);
  }
  console.log(`\n${files.length} file(s) valid`);
}
