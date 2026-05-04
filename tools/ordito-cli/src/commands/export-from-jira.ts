// v0.1 — stub. Declared interface; implementation depends on Jira config and credentials.
// The mapping is documented in 08-integrations/jira.md.

export async function exportFromJira(flags: Record<string, string | true>): Promise<void> {
  const issue = typeof flags.issue === "string" ? flags.issue : "";
  if (!issue) throw new Error("--issue <KEY> is required (e.g. PROD-1234)");

  const out = typeof flags.out === "string" ? flags.out : "03-artifacts/json/";

  console.log(`ordito export-from-jira — v0.1 stub`);
  console.log(``);
  console.log(`Would export issue ${issue} to ${out}.`);
  console.log(``);
  console.log(`Implementation requires:`);
  console.log(`  - JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN env vars`);
  console.log(`  - Jira REST v3 client (no implementation included to avoid runtime deps)`);
  console.log(`  - Field mapping per 08-integrations/jira.md`);
  console.log(``);
  console.log(`Until implemented (target: CLI v0.3), follow the manual export workflow at`);
  console.log(`08-integrations/jira.md → 'Maintaining JSON artifacts alongside Jira'.`);
  process.exit(2);
}
