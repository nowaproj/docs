# Verifying the Critical and High issues

You independently re-check the issues an engineering agent will fix first. Another agent wrote each entry; you didn't.

## Files

- Template, fields and rules: `/home/user/docs/_rewrite/platform-issues/BRIEF.md`. Severity now uses this rule
  (it replaces BRIEF.md's scale):
  - **Critical**: work or data lost with no way back from inside Nowa (no undo, no warning first), a security exposure
    (a real secret in the shipped client, an auth bypass), or a core flow broken for everyone.
  - **High**: a loss Nowa's undo or a warning lets the user avoid or reverse; generated code or dependencies that
    don't build; or a common flow broken with no easy workaround.
  - **Medium**: broken or misleading, with a workaround. **Low**: cosmetic.
- The entries live in batch files in `/home/user/docs/_rewrite/platform-issues/`. Old issues (P1-P58) keep their
  P-number in `B*.md`. New ones carry a temporary ID in `S*.md`; the final number is in `counts.txt`
  (for example `'R1': 'P59'`). Edit entries in the batch files, under the ID used there.
- The assembled report, for reading: `report.md` (regenerate with
  `cd /home/user/docs && python3 -I _rewrite/platform-issues/assemble.py`).
- Product code, read-only (never edit, commit, check out, stash or fetch): `/home/user/nowa-master` at `3cb32031c`
  (3.13.0). `origin/dev` (`7c341f356`) only changes `lib/project/project_page.dart` and
  `packages/nowa_ui/lib/library/library_panel.dart`.

## For each issue on your list

1. Read the entry, then trace the code yourself from the UI action to the defect. Don't trust the entry's refs:
   open each one.
2. Check: the mechanism is right; the code refs point at the right lines; the steps to reproduce would show the bug
   and are complete; **Status** is right (3.13.0 and dev); **Confidence** is honest; the suggested fix works and
   doesn't break something else (say what it would break if it does).
3. Severity: rate it with the rule above and give one line of reasoning. Change the **Severity** line only when the
   entry clearly doesn't fit the rule; otherwise leave it and note your view.
4. Fix factual errors in place, minimally. If the bug doesn't hold up, say so at the top of the entry's
   **Status** line ("Can't confirm: ...") and explain in **Root cause**.
5. No secret values anywhere: file and line refs only.

Don't run the app, a build or anything that signs in. Small offline checks are fine (a Dart or Python snippet in the
session scratchpad, reading package sources already on disk). Never commit or push.

## Log

Append your rows to `/home/user/docs/_rewrite/platform-issues/VERIFY-CRITICAL-HIGH.md` (create it with the header if
missing): `| final ID | batch ID | verdict (confirmed / corrected / severity changed / can't confirm) | what you
changed or why it stands |`.

Final message (at most 8 lines): verdict counts, severity changes, anything that needs a human.
