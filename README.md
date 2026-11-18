# Harnesser

Claude Code plugin that:
- Detects "never/don't/always" instructions and offers to save them as rule files in `.claude/rules/` (project, path-scoped, or global).
- Asks what to do when a request conflicts with an existing rule (update, one-time exception, keep, delete).

Rules it creates are signed `generated-by: harnesser`.

## Install

Requires Node on PATH.
```
/plugin marketplace add wlsquid/harnesser
/plugin install harnesser@harnesser
```
Restart Claude Code after installing. Update later with /plugin marketplace update harnesser.

## Manual rule
`/harnesser:add-rule <text>`
