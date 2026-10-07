# Style pass brief (phase 9, item 3)

You polish the wording of verified Nowa docs pages so they read **simple, clear, concise, warm and confident**.
Every fact on these pages was checked against the product code by other agents. Your job is the words, never the
facts.

## Read first

1. `/home/user/docs/_rewrite/style-guide.md` (Voice, Words we use, Page anatomy). This is the standard.
2. `/home/user/docs/_rewrite/glossary.md` (exact terms).

## What good looks like

- **The first sentence says what the reader gets.** "Instant Play runs any screen right on the board, so you can tap
  through it without leaving the editor." Not "This page explains Instant Play."
- **Talk to the reader**, present tense, active voice: "Click **Run**." Short sentences, one idea each; paragraphs of
  1-3 sentences.
- **Warm**: speak to what the reader is building, say when something is quick or safe to try (only when the page
  already says it is), and never make them feel at fault. Troubleshooting entries start from the reader's problem
  and get to the fix fast. No exclamation marks, no filler, no cheerleading.
- **Confident**: state facts plainly. Remove hedges ("you might want to", "should be able to", "basically") unless
  the page means real uncertainty. Remove "simply", "just", "easily", "seamlessly", "powerful", "in order to",
  "please note", "it is important to note".
- **Concise**: cut repetition and throat-clearing. Prefer the shorter word. Keep every step.
- **Consistent**: the same thing has the same name on every page (glossary).

## Never change (facts)

- Any **bold** UI label, `inline code`, number, keyboard key (`<kbd>`), link target or anchor, badge
  (`<Badge ... />`), image or video, capture placeholder (`{/* CAPTURE: ... */}`), table cell that states a fact,
  or code block.
- The steps: their number, order and what each one does. You may reword a step, or merge a result sentence into
  its step, but not drop, add or reorder actions.
- What the page claims the product does, when, for whom, and on which plan or platform. No new claims, tips or
  examples. If a sentence is unclear because the fact behind it is unclear, leave it and note it in your log.
- Headings: keep them unless one is clearly confusing. If you change a heading that has no explicit id, add the
  old slug as an id so links keep working: `## New wording {#old-heading-slug}` (the slug is the old heading in
  lower case, spaces as hyphens, punctuation dropped). Never change a heading that already has `{#id}` except its
  wording before the id.
- Front matter: don't change `title`, `sidebar_label` or `keywords`. You may tighten `description` (one sentence).
- Admonitions: at most two per page; don't add new ones.
- Don't touch `docs/new/*`, `docs/legacy/*`, `sidebars.js`, config, `src/`, or pages outside your folders.

## How to work (incremental, usage limits can stop you)

1. Before starting, open your log (below). If it already lists pages, a previous run did them: skip those.
2. One page at a time: read it whole, edit it with the Edit tool (several small edits are fine), then append one
   row to your log: `| page | what changed (a few words) | anything to check |`.
3. When all your pages are done, run the guard against the ref you were given:
   `cd /home/user/docs && python3 -I _rewrite/tools/style-guard.py <ref> <your folders>`
   It lists, per page, labels, code, links, ids, numbers, steps and headings that differ from before your pass.
   For each flagged item: if you changed a fact by accident, restore it; if the change is fine (for example a
   duplicated label you removed from a repeated sentence), say why in the log. Run the guard again until every
   remaining item is explained.
4. Don't run `yarn build`. Never commit or push.

Final message (at most 12 lines): pages edited, pages left as they were, anything a fact-checker should look at.
