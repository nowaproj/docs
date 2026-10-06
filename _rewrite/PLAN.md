# Docs rewrite plan

Resume from these files alone: `BRIEF.md` (context + rules), `decisions.md`, `open-questions.md`,
`pages.md` (page list + status), `structure.md` (new information architecture), `redirects.md`,
`left-out.md`, `upcoming-3.13.md`, `research/`, `reviews/`, `captures/`.

## Phases

| # | Phase | Output | Status |
|---|---|---|---|
| 0 | Setup: branch `docs-rewrite`, workspace, brief, decisions | `_rewrite/*` | done |
| 1 | Research: current docs + old URLs; features from code by area (10 files incl. widgets); positioning + reference IAs; capture setup | `research/*.md`, `captures/tools/*`, `captures/ui-map/*` | done (capture `README.md` not written; see CAPTURE.md) |
| 2 | Information architecture: sections, pages, slugs, old→new URL map | `structure.md`, `pages.md`, `redirects.md`, `redirects.js`, `style-guide.md`, `glossary.md` | done |
| 3 | Writing | `docs/**`, `captures/requests/*.md`, `reviews/*-writer-notes.md` | ~85 pages drafted; **16 missing** (see "Resume here") |
| 4 | Verification against code by a non-author agent per batch | `reviews/<batch>-review.md` | **not started** (two attempts were cut off by usage limits before saving) |
| 5 | Screenshots/videos | `static/img/docs/...`, `captures/log.md`, `captures/to-capture.md` | not started; brief ready (`CAPTURE.md`) |
| 6 | Integration | config, sidebar, redirects, build | partly done (see "Resume here") |
| 7 | Final QA: coverage audit, style pass, link check | `coverage.md`, `reviews/final-*.md` | todo |
| 8 | Draft PR with report | PR | todo |

## Resume here (stopped by the user on 2026-10-06 ~19:40 UTC)

**Done in phase 6 already:** old pages removed from `docs/` (`git rm`; still readable on `main` and in
`_rewrite/old-docs/`, which is gitignored: recreate it with the command below); legacy tutorials moved to
`docs/legacy/` with link fixes, overview page and a banner from `src/theme/DocVersionBanner`; `DocSidebarItem`
overrides removed; explicit `sidebars.js` (already lists the 16 missing pages); `redirects.js` (160 redirects, all
44 in-app links) wired into `docusaurus.config.js` via `@docusaurus/plugin-client-redirects`;
`onBrokenMarkdownLinks: 'throw'`; navbar "What's new"; footer "Community forum"; social card
`static/img/social-card.png`; What's New/changelog link-only fixes (D11).

**Next steps, in order:**
1. Write the 16 missing pages (batches in `pages.md` → "Batches"; briefs: `WRITER.md`):
   - W13a: `docs/reference/widgets/index.md`, `docs/reference/wrappers.md` (anchors from `redirects.md` "Anchor targets")
   - W13b: `docs/reference/widgets/forms.md`, `lists.md`, `navigation.md`, `media.md`
   - W4b: `docs/design/properties.md`, `docs/design/responsive.md`
   - W7b: `docs/test/index.md`, `docs/test/problems.md`
   - W9b: `docs/code/packages.md`, `docs/code/custom-code.md`, `docs/code/limitations.md`
   - W11b: `docs/troubleshooting/index.md`, `docs/troubleshooting/known-issues.md` (`{#firebase-on-windows}`)
   - W18 (after all pages exist): `docs/reference/glossary.md` from `glossary.md`
2. `yarn build` (runs the video check, needs ffprobe); fix MDX errors, broken links and anchors until it passes.
3. Verify every page against the code (`VERIFIER.md`), one agent per batch, never the writer.
4. Captures (`CAPTURE.md`), then embed images from `captures/requests/*.md` into the pages (replace the
   `{/* CAPTURE: ... */}` placeholders); list the rest in `captures/to-capture.md`.
5. Final QA: coverage audit (every feature in `research/features-*.md` → a page or `left-out.md`), style pass,
   `yarn build`, then the draft PR with the report.

**Usage limits:** two runs were cut off by account usage limits (D14). Run at most ~5 agents at a time, writers and
verifiers on Sonnet, and keep agents writing their files incrementally.

**Container-local state (lost if the container is recycled):** `/home/user/nowa-master` (worktree of nowa
`origin/master` @ b84bfdafd: `git -C /home/user/nowa worktree add --detach /home/user/nowa-master origin/master`),
`/home/user/nowa-build` (same commit, with the Flutter web build in `build/web`; rebuild as in
`.github/workflows/web-build.yml` with Flutter 3.44.8 in `/home/user/flutter`), `node_modules`.

Commit and push after each phase. Agents never commit; the orchestrator does.

`_rewrite/old-docs/` is a gitignored copy of `main`'s `docs/` (minus `new/`) for writers to mine. Recreate it with
`mkdir -p _rewrite/old-docs && git archive origin/main docs | tar -x -C _rewrite/old-docs --strip-components=1 && rm -rf _rewrite/old-docs/new`.

## Page status values (pages.md)

`planned` → `drafted` → `verified` (checked against code by a non-author agent, fixes applied) →
`captured` (images embedded or capture listed) → `final` (style pass + build OK).
