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

## Resume here (paused by the user on 2026-10-07 ~14:45 UTC)

**State:** phases 0-7 done; draft PR open: https://github.com/nowaproj/docs/pull/18 (CI "Test deployment" runs
`yarn build` on every push; green so far). The last local `yarn build` passed with no warnings (14:40 UTC).
Phase 9 is in progress:

| Item | Status |
|---|---|
| 1 Journey coverage | Done: guides (`docs/guides/*`), recipes (list to detail, store hand-off, sign-in comparison, share with a client, no desktop app), structure fixes, new `logic/router.md` with "Start on the login screen or the home screen". |
| 2 Videos | 2 embedded: `test/instant-play.md` (Play a screen), `design/layout.md` (Rows and columns). To record: design-add-widgets-video, logic-circuit-video, design-themes-video (rows `requested` in `captures/requests/W3`, `W5`, `W4`; scripts in `captures/tools/video/`). The AI video needs sign-in (to-capture). Embed by hand from the `captures/log.md` rows (alt cell says page and heading; markup in README "Adding videos"); check frames first. |
| 3 Warm, clear language | Todo: `STYLE-PASS.md` brief + `tools/style-guard.py`. Run it after verification (3 agents by section: get-started+guides+ai+design / logic+integrations / test+publish+code+account+troubleshooting+reference+home), commit first and give the agents that commit as the guard ref. |
| 4 Structure | Done except the long-page trims (style pass): editor-tour (~1,530 words), circuit (~1,600), navigation (~1,530), rest-api (~1,440). |
| 5 Highlighted screenshots | Older shots re-highlighted (8 re-taken: ai-index-1, ai-modes-1, ai-context-1/2, ai-prompting-1, design-templates-1, design-screens-1, design-boards-1; the rest already had highlights). **Capture wave 2 to do:** the ~29 playground-only requests marked `skipped: low value` in `captures/requests/W*.md` (list in `captures/to-capture.md` "Skipped on purpose"), one per page that has no media yet: logic (variables, functions, expressions, popups, global-state, models, navigation, router, parameters), reference widget guides (forms, lists, media, navigation), design (assets, fonts-icons, responsive, theme-styles), integrations (constants, index, admob, revenuecat, google-maps), code (packages, limitations), test/problems, account/project-settings, get-started (create-account sign-in screen without signing in, mobile). Brief: `CAPTURE.md`; 2 agents max, each writing its own log file, merged into `captures/log.md`, then `embed.py`. |
| 6 Tips | Done: guides + one-line links from 8 feature pages. |

**Verification of phase 9 text (non-author agents), state at the pause:**
- Done: `reviews/P9-gaps-review.md` (coverage gap fixes, integrations overview additions, share.md),
  `reviews/P9-guides-b-review.md` (ai-tips, data-and-state-tips, ship-tips; 19 rows fixed),
  `reviews/P9-guides-a-review.md` (guides index, complete-app, design-tips; 22 fixed, 2 removed).
- Paused, resume from each log's "Stopped here" line: `reviews/P9-routes-review.md` (logic/router.md, logic/navigation.md, one-line links),
  `reviews/P9-recipes-review.md` (publish, devices, themes, test/index, guide links). Prompts: same scope as in the
  logs' headers; tell each verifier to continue from its log.
- Not started: the new text from the structure fixes (`reviews/phase9-fixes.md` "Structure fixes": troubleshooting
  "My app shows an error", publish "Ship an update", code index tip, import "Before you start", reference
  overview, add-widgets section, welcome steps, first-app step 5).

**Small follow-ups:** `integrations/rest-api/index.md` warning says "tokens you type here" (imprecise; say what
the warning is about); `design/boards.md` big-board note should say "in or near view" like `guides/ship-tips.md`; link `guides/complete-app.md` step 4 to `../logic/router.md#start-on-login-or-home` once the
guides verifier is done; update `PR-REPORT.md` (Add logic now 13 pages; videos; phase 9 results) and the PR body.

**Then:** style pass, capture wave 2 + embed, final build, update the PR, list what's left.

**Live checks for later** (need the running app): typing `.id` after `element` in a GoRouter **Location**
(`logic/navigation.md#open-a-detail-screen`); a new `id` param is `String?` while `getByIdRecipes` takes a non-null
`String`/`int`: run `guides/complete-app.md` steps 5-6 once and check **Problems** (same for the navigation recipe);
plus the backlog below.

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
  paste in the web app, `$` in GoRouter **Location** (and typing `.id` after `element`), the Supabase
  `currentSession` expression in Redirect Logic (`logic/router.md`), the "about 15 minutes" estimate in first-app.
  Settled: a snackbar shows in Play (seen in `test-instant-play-video.mp4`).

## Page status values (pages.md)

`planned` → `drafted` → `verified` (checked against code by a non-author agent, fixes applied) →
`captured` (images embedded or capture listed) → `final` (style pass + build OK).
