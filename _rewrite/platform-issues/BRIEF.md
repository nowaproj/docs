# Platform issues report: writer brief

You turn product problems found while documenting Nowa into entries an engineering agent can act on without asking
questions: what happens, how to reproduce it, why it happens (with code references), how to fix it, and how sure we are.

## Sources

- `/home/user/docs/_rewrite/product-issues.md`: the issue log (P1-P58). Your prompt says which IDs are yours. Each row
  is short and may be out of date: many were found on **3.12.5**.
- The review logs in `/home/user/docs/_rewrite/reviews/` (search them for the issue ID or its keywords: the row's
  "Source" column names the agent, e.g. "W16 verifier" → `reviews/W16*.md`) often hold more detail.
- Product code, read-only (never edit, commit, check out, stash or fetch in these repos):
  - `/home/user/nowa-master` at `3cb32031c` = **Nowa 3.13.0**, the current release (`master`). Give every code
    reference against this tree, as `path/from/repo/root.dart:line` (or `:start-end`).
  - `origin/dev` = `7c341f356`, 6 commits ahead of 3.13.0. Its only code changes are in `lib/project/project_page.dart`
    (snackbar fix) and `packages/nowa_ui/lib/library/library_panel.dart` (Library rename fix). Read a dev file with
    `git -C /home/user/nowa-master show origin/dev:<path>` if your issue touches either.
  - `/home/user/nowa-build` at `b84bfdafd` = 3.12.5, only to compare when an old row's refs no longer match.
- The docs (`/home/user/docs/docs/`): to find which pages mention the feature (for "Docs impact").

## For each issue

1. Re-verify it in the 3.13.0 code. Find the exact code path; refs in the old row may have shifted.
2. Decide the status: **Present** in 3.13.0 (and dev), **Fixed** in 3.13.0 or dev (say where), or **Can't tell**
   (say what's missing). If the old row was wrong or incomplete, correct it and say so in one line ("Correction: ...").
3. Write the entry with the template below. Steps to reproduce must be concrete UI steps a person or a browser agent
   can follow (exact labels in bold, as the UI shows them). If the steps come from reading code and nobody ran them,
   say so in **Confidence**.
4. Don't run the app, the playground or any build. Don't sign in anywhere. Code reading, `grep`, `git log`/`git show`
   and reading package sources already on disk (for example `~/.pub-cache`, if present) are fine.

## Template (keep the headings and field names exactly)

```markdown
### P<n>. <Short title: what's wrong, in plain words>

- **Area:** <feature> (`<package or folder>`)
- **Severity:** <Critical | High | Medium | Low> — <half a sentence: who is hurt and how>
- **Where:** <web app | desktop app | both>; <cloud | local | both> projects<; playground only, if so>
- **Status:** <Present in 3.13.0 and dev | Fixed in ... | Can't tell: ...>
- **Confidence:** <Reproduced live | Confirmed in code | Code reading only, not run> — <one line: how we know>

**What happens.** 1-3 sentences a product person understands.

**Steps to reproduce**
1. ...
2. ...

Expected: ...
Actual: ...

**Root cause.** The mechanism, with code references (`path:line`). Quote a line of code only when it makes the bug
obvious (a few lines at most).

**Suggested fix.** The smallest change that fixes it, where to make it, and what to watch out for. Name a test to add
if the package has tests nearby (`packages/<pkg>/test/`).

**Docs impact.** The docs page(s) that mention this (`docs/...md`) and what to change there once it's fixed, or
"None".
```

## Severity

- **Critical**: users lose work or data, a security exposure, or a core flow is broken for everyone with no way
  around it.
- **High**: a feature is broken or produces code that doesn't build, in a flow many users hit; a workaround is hard to
  find.
- **Medium**: broken or misleading, but a workaround exists or few users hit it.
- **Low**: cosmetic, a typo, a wrong label, a small UI glitch.

## Rules

- Never invent behavior, labels or code. Every claim must come from the code, the live evidence in the logs, or a
  package source you read. If you can't confirm something, say so.
- Keep entries tight: an engineer reads 60 of these. No filler.
- Write only your output file (named in your prompt). Never commit or push.

Final message (at most 10 lines): entries written, status counts (present / fixed / can't tell), severity counts,
anything uncertain.
