#!/usr/bin/env node
// SessionStart: inject conflict-check instructions and list Harnesser-generated rules.
const fs = require("fs");
const path = require("path");
const os = require("os");

function collect(dir) {
  const out = [];
  let names = [];
  try {
    names = fs.readdirSync(dir).filter((n) => n.endsWith(".md"));
  } catch {
    return out;
  }
  for (const n of names) {
    try {
      const text = fs.readFileSync(path.join(dir, n), "utf8");
      if (/^generated-by:\s*harnesser\s*$/m.test(text)) out.push({ file: path.join(dir, n), text });
    } catch {}
  }
  return out;
}

const rules = [
  ...collect(path.join(process.cwd(), ".claude", "rules")),
  ...collect(path.join(os.homedir(), ".claude", "rules")),
];

let ctx =
  "Harnesser: before acting on a request, check it against the rules in context (CLAUDE.md and .claude/rules). " +
  "If the request conflicts with a rule, do not silently break or silently refuse. Use AskUserQuestion with options: " +
  "Update the rule, Make a one-time exception, Keep the rule (don't do it), Delete the rule. " +
  "Apply edits per the harnesser:add-rule skill. Harnesser rules (generated-by: harnesser) can be edited directly; " +
  "other rule files need user confirmation first.";

if (rules.length) {
  ctx += "\n\nHarnesser rules present:\n" + rules.map((r) => `--- ${r.file}\n${r.text.trim()}`).join("\n");
}

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: ctx } })
);
