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
| 3 | Writing | `docs/**`, `captures/requests/*.md`, `reviews/*-writer-notes.md` | done (all sidebar pages exist) |
| 4 | Verification against code by a non-author agent per batch | `reviews/<batch>-review.md` | done (all 17 batches); phase 9 additions get their own check |
| 5 | Screenshots/videos | `static/img/docs/...`, `captures/log.md`, `captures/to-capture.md` | 35 captured (34 embedded), 50 need sign-in, videos pending (phase 9) |
| 6 | Integration | config, sidebar, redirects, build | done; build green with no warnings |
| 7 | Final QA: coverage audit, style pass, link check | `coverage.md`, `reviews/final-*.md` | coverage done (348/358, gaps closed); style pass = phase 9 item 3 |
| 8 | Draft PR with report | PR | open: https://github.com/nowaproj/docs/pull/18 (update it after phase 9) |
| 9 | Final quality pass: the user's acceptance criteria (see below) | pages, videos, annotated screenshots, best-practice guides | in progress (see Resume here) |

## Resume here (updated 2026-10-07 ~14:30 UTC)

**State:** phases 0-7 done. `yarn build` passes with no warnings (14:15 UTC; the table anchors use the `<Anchor>`
component now). Phase 8 (draft PR) is being opened. Phase 9 is in progress:

| Item | Status |
|---|---|
| 1 Journey coverage | Guides written (`docs/guides/*`, notes `reviews/W19-writer-notes.md`); recipes added (list to detail, store hand-off, sign-in comparison, share with a client, no desktop app; `reviews/phase9-fixes.md`); structure fixes applied. W20 writer: start on login or home (structure item 14). |
| 2 Videos | Capture agent recording up to 5 videos (playground only); results in `captures/log.md`. Embed them by hand per the log rows (page, heading). |
| 3 Warm, clear language | Todo: style pass over every page after the verifiers finish (wording only). |
| 4 Structure | Review `reviews/phase9-structure.md`; fixes in `reviews/phase9-fixes.md`; sidebar reorder done (item 15), home tidy and `_category_.json` removal done (item 19). W20: split `logic/navigation.md` into `logic/router.md` (item 20), preview mapping (16), duplicate theme-switch steps (18). Add `logic/router` to `sidebars.js` after `logic/navigation` when W20 is done. |
| 5 Highlighted screenshots | Capture agent re-highlighting older shots. Signed-in shots stay in `captures/to-capture.md`. |
| 6 Tips | Guides done; W20 adds one-line links from feature pages to the guides. |

**Verification of phase 9 text (non-author agents):** running: `reviews/P9-guides-a-review.md` (guides index,
complete-app, design-tips), `reviews/P9-guides-b-review.md` (ai-tips, data-and-state-tips, ship-tips),
`reviews/P9-gaps-review.md` (coverage gap fixes G1-G12, integrations overview additions, share.md). After W20:
one more verifier for the recipe sections (`phase9-fixes.md` "Recipes and clarifications"), W20's changes and the
new text from the structure fixes (troubleshooting "My app shows an error", publish "Ship an update", code index
tip, import "Before you start", reference overview, add-widgets section).

**Then:** style pass (2 agents by section), final build, update `PR-REPORT.md` and the PR body, list what's left.

**Live checks for later** (need the running app): typing `.id` after `element` in a GoRouter **Location**
(`logic/navigation.md#open-a-detail-screen`), plus the backlog below.

**Usage limits:** runs keep hitting account usage limits after ~1 hour of 5 Sonnet agents (D14). Keep waves at
~4-5 agents, every agent saving incrementally.

Commit and push after each phase. Agents never commit; the orchestrator does.

`_rewrite/old-docs/` is a gitignored copy of `main`'s `docs/` (minus `new/`) for writers to mine. Recreate it with
`mkdir -p _rewrite/old-docs && git archive origin/main docs | tar -x -C _rewrite/old-docs --strip-components=1 && rm -rf _rewrite/old-docs/new`.

## Phase 9: final quality pass (user's acceptance criteria, added 2026-10-07)

Trigger: when the rewrite itself is done (phases 4-7 complete, build green, draft PR open). Then check each item,
fix what's missing, and update the PR report. Same rules as before: facts only from the code, never invent.

1. **Complete journey coverage.** The docs must cover everything a user needs to build and deploy the best possible,
   fully functional app with Nowa. Walk the full journey as a new user (idea → AI build → visual design → logic and
   state → data and backend → sign-in → payments/ads → test on devices → publish to web, Google Play and the App
   Store → iterate) and check each step has a clear page and the pages link in that order. Fill gaps (for example an
   end-to-end "Build a complete app" guide: login, data list and detail, publish).
2. **Videos where motion matters.** Record short MP4s (≤20 s, H.264, ≤1080p, ≤30 fps, faststart; README "Adding
   videos") for pages where a still image isn't enough: drag and drop / adding widgets, Instant Play, layout
   (rows, columns, stacks), Circuit wiring, themes, the AI building a screen (needs an AI prompt; budget), connecting
   data, deploy flow (needs sign-in: list in `captures/to-capture.md` if not possible).
3. **Language: simple, clear, concise, warm, confident.** A style pass over every page (style guide updated with
   "warm": friendly, encouraging, speaks to the reader's goal; no fluff). Check headings, intros, steps.
4. **Structure easy to follow.** Review the sidebar order, section overviews, "Next steps" links and cross-links
   with a fresh-eyes agent that navigates as a new user; fix confusing names, order or dead ends.
5. **A good screenshot on every page that needs one, with the important part highlighted.** Re-take or annotate
   captures so the control or area that matters is highlighted (overlay box/outline in Nowa orange drawn from the
   semantics bounding box, or a drawn box in post-processing), cropped to what matters, legible at docs width.
   Pages that need a screenshot but can't get one tonight go to `captures/to-capture.md`.
6. **Tips, tricks and best-practice guidance for quality apps.** Add practical guidance grounded in Nowa's real
   features: a "Build a great app" set of pages (design consistency with themes and components, layouts that adapt,
   naming and structure, state and data choices, using Nowa AI well (modes, context, checkpoints, custom
   instructions), testing with Instant Play vs Run vs devices, performance on big boards, keys and security
   (Constants ship inside the app), Git and backups, publishing checklists), plus short tips on the feature pages
   where they help.

Phase 9 backlog (found during verification):
- Long pages to consider splitting: `logic/navigation.md` (~1,450 words: split the Router panel / GoRouter details into
  `logic/router.md`), `logic/circuit.md` (~1,390), `troubleshooting/index.md`.
- Live checks the code alone couldn't settle (need the running app): editing a component instance in place, image
  paste in the web app, snackbar in Play, `$` in GoRouter **Location**, the "about 15 minutes" estimate in first-app.

## Page status values (pages.md)

`planned` → `drafted` → `verified` (checked against code by a non-author agent, fixes applied) →
`captured` (images embedded or capture listed) → `final` (style pass + build OK).
