# Docs rewrite plan

Resume from these files alone: `BRIEF.md` (context + rules), `decisions.md`, `open-questions.md`,
`pages.md` (page list + status), `structure.md` (new information architecture), `redirects.md`,
`left-out.md`, `upcoming-3.13.md`, `research/`, `reviews/`, `captures/`.

## Phases

| # | Phase | Output | Status |
|---|---|---|---|
| 0 | Setup: branch `docs-rewrite`, workspace, brief, decisions | `_rewrite/*` | done |
| 1 | Research (parallel): current-docs inventory + old URL list; feature inventory from code by area; positioning + reference IAs; capture setup (build Nowa web, Playwright) | `research/*.md`, `captures/tools/*` | done except widgets, data, capture setup |
| 2 | Information architecture: sections, pages, slugs, old→new URL map | `structure.md`, `pages.md`, `redirects.md`, `style-guide.md` | pages.md done except integrations + widgets; redirects todo |
| 3 | Writing (parallel writer per section) | `docs/**` new pages, `captures/requests/*.md` | in progress: W1, W2, W5-W12 launched |
| 4 | Verification against code by a different agent per section; fixes applied | `reviews/*.md`, page status `verified` | todo |
| 5 | Screenshots/videos: capture, check each image, embed | `static/img/...`, `captures/log.md`, `captures/to-capture.md` | todo |
| 6 | Integration: sidebar, homepage, legacy tutorials, redirects, remove old pages, `yarn build` clean | config + build log | todo |
| 7 | Final QA: independent coverage audit, style pass, link check | `coverage.md`, `reviews/final-*.md` | todo |
| 8 | Draft PR with report | PR | todo |

Commit and push after each phase. Agents never commit; the orchestrator does.

`_rewrite/old-docs/` is a gitignored copy of `main`'s `docs/` (minus `new/`) for writers to mine. Recreate it with
`mkdir -p _rewrite/old-docs && git archive origin/main docs | tar -x -C _rewrite/old-docs --strip-components=1 && rm -rf _rewrite/old-docs/new`.

## Page status values (pages.md)

`planned` → `drafted` → `verified` (checked against code by a non-author agent, fixes applied) →
`captured` (images embedded or capture listed) → `final` (style pass + build OK).
