#!/usr/bin/env node
// UserPromptSubmit: detect standing prohibitions/preferences and prompt Claude to offer saving a rule.
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let prompt = "";
  try {
    prompt = String(JSON.parse(input).prompt || "");
  } catch {
    process.exit(0);
  }
  const re = /\b(never|don'?t|do not|stop (doing|using)|avoid|no more|quit|always)\b/i;
  if (!re.test(prompt)) process.exit(0);

  const ctx =
    "The user's message may state a standing preference. If it is a lasting rule (not a one-off instruction for this task), " +
    "after handling the request use AskUserQuestion to ask whether to save it as a Harnesser rule, with scope options: " +
    "This project (./.claude/rules), Specific paths in this project (paths: glob), Global (~/.claude/rules), Don't save. " +
    "Then follow the harnesser:add-rule skill. If it is only a one-off instruction, do nothing extra.";
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: ctx },
    })
  );
});
