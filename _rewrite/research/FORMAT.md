# Feature research format

Every `features-<area>.md` file uses this format, so the information-architecture step can merge them.

```markdown
# Features: <area>

Source: /home/user/nowa-master (v3.12.5). Researcher: <agent task name>. Date.

## Summary
- One bullet per feature: **Feature name as the UI shows it**: one line on what it does. (badge if gated)

## Features

### <Feature name exactly as in the UI>
- **What it does:** 1-2 lines, from the user's point of view.
- **Where:** exact UI path, e.g. left sidebar → **Files** → **+** → **New Screen**. Say how to open it
  (button, menu, shortcut, right-click).
- **Labels:** exact button / menu / dialog / field / tooltip text, quoted as in the code.
- **How to use:** numbered steps derived from the code.
- **Options:** each setting with its label, what it does, default.
- **Limits and rules:** validation, allowed values/file types, max/min, errors shown (quote messages). Only
  what the code shows.
- **Gating:** Beta / Enterprise / plan / Desktop app only / Web only / Local projects only / Cloud
  projects only / OS-specific / feature flag, with the code ref. Or "none found".
- **Code refs:** `path:line` (relative to repo root), a few that prove the above.
- **Old docs:** pages under `/home/user/docs/docs/` that cover it, with a one-line accuracy verdict
  (accurate / partly outdated / wrong / missing).
- **3.13 (dev) changes:** only if `/home/user/nowa` (dev) materially changes it; else omit.
- **Screenshot value:** high / medium / low, and what a good capture would show.

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |

## Open questions
- Anything you could not confirm from the code.
```

Rules: quote UI text exactly. No guessing; if the code doesn't show it, put it under Open questions.
Prefer depth on what users do most (creating, editing, connecting, running, shipping).
