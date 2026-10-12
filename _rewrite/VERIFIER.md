# Verifier brief

You check one batch of new Nowa docs pages against the product code. You did not write them. Your job: make every
statement true to the released code, and fix what isn't.

## Read first

1. `/home/user/docs/_rewrite/BRIEF.md` (rules, paths, decisions), `/home/user/docs/_rewrite/style-guide.md`,
   `/home/user/docs/_rewrite/glossary.md`.
2. `/home/user/docs/_rewrite/pages.md`: your batch's rows (must-cover lists, anchors).
3. The writer's notes: `/home/user/docs/_rewrite/reviews/<batch>-writer-notes.md` (code refs per claim).

## Work incrementally

Usage limits can stop you mid-task. Finish one page at a time: check it, fix it, append its section to the review
log, then move on. If a previous run left a review log, continue from where it stopped.

Be efficient: grep `/home/user/nowa-master` for the exact quoted label (`grep -rn "Label text" --include=*.dart`)
instead of reading whole files; open a file only around the hit.

## For every page in your batch

1. **List every factual claim**: UI labels (exact text and case), where things are, menu paths, steps and their
   order, what happens after an action, keyboard shortcuts (per OS), limits and validation, file paths, gating
   (plan, Enterprise, desktop-only, cloud/local-only), and anything the page says the product does.
2. **Check each claim in `/home/user/nowa-master`** (released v3.12.5). Use the writer's refs as a starting point,
   but open the code yourself; grep for the label. A claim is OK only if the code shows it.
3. **Fix the page directly** (Edit tool, minimal changes, keep the style):
   - wrong → correct it from the code;
   - not verifiable → remove it, or reduce it to what the code shows;
   - a must-cover item missing → add it if the code confirms it;
   - gating badge missing or unjustified → add/remove;
   - prices, credit amounts, plan limits → remove (D3).
4. **Check the rest**: front matter (title, description, keywords), no H1 in body, relative links point to files in
   pages.md (`docs/...` paths; list any that don't), required anchors present (`{#id}`), capture placeholders well
   formed, style rules (no hype words, no emoji, no `---` rules, sentence-case headings, one action per step,
   ≤2 admonitions). Tighten wordy passages; if a page is over ~1,200 words (tutorials ~1,400), cut repetition
   without losing steps.

## Review log (required)

Write `/home/user/docs/_rewrite/reviews/<batch>-review.md`:
- Summary: pages checked, claims checked, fixed, removed, open issues.
- Per page: a table `claim | verdict (ok / fixed / removed) | code ref | note`. Keep "ok" rows short; group trivial
  ones ("12 labels in the steps: ok, refs ...").
- Open issues you could not resolve (with why).

## Boundaries

Edit only your batch's pages (and the review log). Don't edit other pages, `sidebars.js`, config, `src/`,
`docs/new/*`. Don't run `yarn build`. Never commit or push. Final message (at most 15 lines): counts, the most
serious errors you fixed, open issues.
