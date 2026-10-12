# P14-B12 verify log (verifier P14-B12-V)

Batch pages: `test/index.md`, `test/instant-play.md`, `test/run.md`, `test/devices.md`, `test/share.md`,
`test/problems.md`, `troubleshooting/index.md`, `troubleshooting/known-issues.md`. Code refs relative to
`/home/user/nowa-master` (3.13.0+1, `3cb32031c`). Diff: `git diff origin/main -- docs/test docs/troubleshooting`.

Status: in progress (sections appended page by page).

## Links and anchors (all pages)

- Every explicit `{#id}` on `origin/main` still exists: `run.md#read-the-logs`, `troubleshooting/index.md#update-prompts`,
  and all 11 on `known-issues.md` (`api-requests-blocked-in-the-browser`, `detach`, `drag-across-app-bar`,
  `figma-connect`, `firebase-on-windows`, `firebase-reload-after-connect`, `invalid-type-in-status-bar`,
  `redirect-logic-plus`, `shift-drag`, `slash-in-details`, `variables-list-rename`).
- Implicit (heading) anchors: only `devices.md#before-you-start` is gone; no link to it in `docs/`, `src/` or
  `redirects.js`. The coverage file still cites it (row "Warning: not in the web version of Nowa"); the fact is now in
  `devices.md#no-desktop-app`.
- 180 inbound links from `docs/` to the batch pages checked by script: all files and anchors resolve. All outbound
  relative links from the batch pages resolve (files and anchors). No links to `generated-code.md` from the batch.
- Front matter valid, no H1, no `---` rules, admonitions ≤2 per page (problems 2, run 2, share 1, others 0).
