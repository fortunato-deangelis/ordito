#!/usr/bin/env node
import { newArtifact } from "./commands/new.js";
import { validateArtifacts } from "./commands/validate.js";
import { runGate } from "./commands/gate.js";
import { runEval } from "./commands/eval.js";
import { exportFromJira } from "./commands/export-from-jira.js";

const HELP = `ordito — ORDITO command-line tool

Usage:
  ordito new --type <artifact_type> [--mode <mode>] [--owner <role>] [--charter <path>] [--id <id>] [--out <path>]
  ordito validate [--path <file_or_dir>]
  ordito gate <g0|g1|g2|release|learning> --artifact <id> [--path <artifact.json>] [--write] [--yes]
  ordito eval <service_name> [--id <golden_set_id>]
  ordito export-from-jira --issue <KEY> [--out <path>]
  ordito --help

For full docs: tools/ordito-cli/README.md
`;

function parseArgs(argv: string[]): { command: string; positional: string[]; flags: Record<string, string | true> } {
  const flags: Record<string, string | true> = {};
  const positional: string[] = [];
  let command = "";
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (i === 0) {
      command = arg;
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { command, positional, flags };
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv[0] === "--help" || argv[0] === "-h") {
    console.log(HELP);
    process.exit(0);
  }

  const { command, positional, flags } = parseArgs(argv);

  try {
    switch (command) {
      case "new":
        await newArtifact(flags);
        break;
      case "validate":
        await validateArtifacts(flags);
        break;
      case "gate":
        await runGate(positional[0] || "", flags);
        break;
      case "eval":
        await runEval(positional[0] || "", flags);
        break;
      case "export-from-jira":
        await exportFromJira(flags);
        break;
      default:
        console.error(`Unknown command: ${command}\n`);
        console.log(HELP);
        process.exit(2);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`ordito: ${message}`);
    process.exit(1);
  }
}

main();
