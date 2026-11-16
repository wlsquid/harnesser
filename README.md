# Harnesser

Claude Code plugin that:
- Detects "never/don't/always" instructions and offers to save them as rule files in `.claude/rules/` (project, path-scoped, or global).
- Asks what to do when a request conflicts with an existing rule (update, one-time exception, keep, delete).

Rules it creates are signed `generated-by: harnesser`.

## Install
```
/plugin marketplace add F:\repos\Harnesser
/plugin install harnesser@harnesser
```

## Manual rule
`/harnesser:add-rule <text>`
