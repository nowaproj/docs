# Phase 14 verifier brief

You check one batch of phase 14 changes. You did not write them. Make every statement true to Nowa 3.13.0 as shipped
(and to the official third-party docs for console steps), make sure no needed fact was lost, and make sure every page
outside `docs/code/` works for the primary reader. Fix what isn't right, directly in the pages.

## Read first

1. `/home/user/docs/_rewrite/P14-BRIEF.md`: the user's feedback, the reader, rules R1-R8, coverage method C1-C5. You
   enforce these.
2. `/home/user/docs/_rewrite/BRIEF.md` (rules, paths), `style-guide.md`, `glossary.md`.
3. The batch's files in `/home/user/docs/_rewrite/reviews/`: `<batch>-notes.md` (code refs and URLs per claim),
   `<batch>-coverage.md`, `<batch>-for-code.md`.
4. The diff of the batch's pages against the live site: `git -C /home/user/docs diff origin/main -- <page paths>`.

Product code (source of truth, 3.13.0): `/home/user/nowa-master`. Grep for exact labels
(`grep -rn "Label" --include=*.dart /home/user/nowa-master/lib /home/user/nowa-master/packages`), open files only around
the hit. Official docs: WebFetch / WebSearch (they may be deferred tools: load them with ToolSearch,
`select:WebFetch,WebSearch`).

## What to check

**1. Every added or changed claim** (the `+` lines of the diff): UI labels (exact text and case), where things are,
steps and their order, what happens after an action, shortcuts, limits, gating, behavior. Check each in the code, or
for third-party consoles in the current official docs. Wrong → fix from the source. Not verifiable → reduce it to what
the source shows, or remove it. Never accept a label because it was in the old docs: old labels are often outdated.

**2. Every removed fact** (the `-` lines): it must be (a) moved unchanged to the for-code file, (b) still on the page
in simpler words, (c) elsewhere in the docs, or (d) truly not needed by the reader. If a fact the reader needs was
dropped (a step, a label, a warning, a limit, a workaround, a gating note), restore it in plain words.

**3. The audience rules on every page of the batch**, changed or not (except `docs/code/` pages, which may keep code):
- No code-only facts (R2): file paths, generated class or function names the UI doesn't show, code lines, package
  names (unless a dialog the reader acts on shows them), Dart internals, platform build files. Move any you find to the
  for-code file under the right anchor, and leave plain words behind.
- UI text that looks like code is explained the first time (R3); technical words the reader can't avoid are explained
  once (R4).
- No task or workaround leaves a non-coder with only code steps (R5): a no-code path (Nowa AI in Agent mode, a button
  in the UI) comes first, without promising exact output.
- The page passes the test: someone who has never written code can follow it and knows why it matters.

**4. Coverage spot checks.** For every `obsolete` row in the coverage file, open the cited code and confirm the
feature or label really is gone or changed in 3.13.0; if it still exists and the reader would need it, add it. For
10 `covered` rows of your choice, confirm the cited page really covers the item. Note results in your log.

**5. Links and structure.** Relative links point to existing files (`docs/...`); links to
`../code/generated-code.md#<anchor>` use only the anchors listed in P14-BRIEF.md; all `{#id}` anchors that existed on
`origin/main` still exist; front matter is valid; no H1; ≤2 admonitions; no hype words, emoji or `---` rules; images
untouched.

## Review log (required)

Write `/home/user/docs/_rewrite/reviews/<batch>-verify.md`:
- Summary: pages checked, claims checked, fixed, removed, facts restored, audience fixes, open issues.
- Per page: a short table `claim | verdict (ok / fixed / removed / restored) | source (code ref or URL) | note`. Group
  trivial "ok" rows.
- Coverage spot checks (obsolete rows checked, covered rows sampled, results).
- Open issues you could not resolve, with why.

## Boundaries

Edit only the batch's pages, its for-code file and your log. Not `sidebars.js`, config, `src/`, `static/`,
`docs/new/`, `docs/legacy/`, other batches' pages. Don't run `yarn build`. Never commit or push. Never modify the
product repos. Don't sign in anywhere or send AI prompts. Work page by page and append to your log as you go (usage
limits can stop you). Final message at most 15 lines: counts, the most serious errors you fixed, open issues.
