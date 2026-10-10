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
| 5 | Screenshots/videos | `static/img/docs/...`, `captures/log.md`, `captures/to-capture.md` | 67 screenshots + 5 videos embedded; ~50 need sign-in (blocked by network) |
| 6 | Integration | config, sidebar, redirects, build | done; build green with no warnings |
| 7 | Final QA: coverage audit, style pass, link check | `coverage.md`, `reviews/final-*.md` | coverage done (348/358, gaps closed); style pass = phase 9 item 3 |
| 8 | Draft PR with report | PR | open: https://github.com/nowaproj/docs/pull/18 (update it after phase 9) |
| 9 | Final quality pass: the user's acceptance criteria (see below) | pages, videos, annotated screenshots, best-practice guides | done except signed-in captures (see Resume here) |
| 10 | Update to Nowa 3.13.0 (released 2026-10-06, live on app.nowa.dev) + all captures from app.nowa.dev, incl. signed-in | `research/changes-3.13.md`, pages, `reviews/P10-*`, captures | done 2026-10-10 (build green, PR updated) |

## Phase 10: update to Nowa 3.13.0 (started 2026-10-09)

Why: `master` is now 3.13.0+1 (`3cb32031c`) and app.nowa.dev serves 3.13.0, so the 3.12.5 docs are out of date (D20).
The user allowed all network domains, so app.nowa.dev and the test account work now.

Steps:
1. **Research** (1 agent): every user-facing change `b84bfdafd..3cb32031c`, starting from `upcoming-3.13.md`, confirmed
   against the released tree, with exact labels, code refs and the docs pages + sentences to change →
   `research/changes-3.13.md`.
2. **Signed-in captures** from app.nowa.dev with the test account (`CAPTURE-SIGNED-IN.md`): agent A (dashboard,
   account, settings, deploy menu, Git, import...), agent B (AI shots and the AI video, at most 5 prompts). They
   log label differences between the pages and the 3.13 UI for the writers.
3. **Writers** update the affected pages to 3.13 (by section), then **verifiers** (non-authors) check them against
   `/home/user/nowa-master` at `3cb32031c`.
4. **Re-take** all existing screenshots and the 5 videos from app.nowa.dev/playground (3.13 restyled most panels;
   `test-problems-1` even shows `v3.12.5`), same ids and file names; check each image; embed new ones.
5. Style guard on changed pages, `yarn build`, update `PR-REPORT.md` and the PR.

**Phase 10 status at the pause (2026-10-09 evening):**
- Done: research (`research/changes-3.13.md`); writers W30a (incl. new `design/library.md`, in the sidebar), W30b, W30c;
  verifiers P10-a, P10-b, P10-c1, P10-c2 (all 3.13 page edits checked against `3cb32031c`, 32 fixes); live checks in the
  3.13 editor (`reviews/P10-live-checks.md`) applied by a non-author agent (`reviews/P10-live-fixes.md`, findings 1-8b).
- Screenshots from 3.13 (app.nowa.dev): 13 signed-in (dashboard, settings, Deploy menu...), 7 AI (5 of 5 prompts used:
  `captures/ai-prompts.md`; the account is now on extra AI credits), wave 1 (32 shots + 2 videos), AI panel (6, signed
  in), wave 2a (15 shots + add-widgets video). Names and emails blurred.
- Wave 2b done (15 shots incl. new design-theme-styles-2, layout and themes videos). Recorder for app.nowa.dev: `captures/tools/video/rec-live.mjs` (clicks Reject itself, reloads if icons fail).
- **Next:** (1) check layout.md's Group header (a fourth three-dot button appears after an Alignment click: `captures/ui-diffs-3.13.md`); (2) run `python3 -I _rewrite/captures/tools/sync-alt.py` (copies checked alt texts from
  the log into the pages; 25+ differ); (3) embed any new ids with `embed.py` (look at each image first); (4) `yarn build`;
  (5) update `PR-REPORT.md` and the PR body/title for 3.13 (D20, D21, Q4, P48-P51, signed-in shots done, paid-plan and
  external-service shots still missing); (6) CI check.
- Not possible with this test account: Git/GitHub panels and Android/iOS builds (Starter plan), published web site,
  connected Supabase/Firebase/Figma/Stripe/Xano screens, desktop-only screens.

Batches (2026-10-09): research done (`research/changes-3.13.md`: 53 pages, 27 changes, 11 open points). Writers:
**W30a** (new `design/library.md`, get-started, design index/boards/screens/components/add-widgets/select-and-edit/
outline, glossary), **W30b** (design properties/layout/themes/theme-styles/assets/templates/localization/fonts-icons/
responsive, all of code/*), **W30c** (todo: logic, integrations incl. Firestore, test, account, reference shortcuts and
widgets, guides, troubleshooting). Captures: A signed-in (dashboard, settings, deploy menu, Git...), B AI (≤5 prompts),
C re-take wave 1 (logic, reference, integrations, test, AI panels). Todo: live-check agent for part 6 open points
(playground-checkable: 3, 4, 8, 9, 10, 11), verifiers per writer batch, re-take wave 2 (editor frame, design, code
mode, files, the add-widgets/layout/themes videos), add `design/library` to `sidebars.js` before `design/add-widgets`.

## Resume here (resumed 2026-10-08 ~00:30 UTC after the user's answers)

**User answers (2026-10-08):** test account given (stored only in the session scratchpad `test-account.env`, D19);
External Agent is Enterprise only (badge kept); point to Apple/Google store rules (W21 writer, D18).
**Blocked:** signed-in captures. The network policy denies `server.nowa.dev` (sign-in and project API:
`packages/core/lib/src/services/config_service.dart:46`, `user_service.dart:160`) and `app.nowa.dev`. Ask the user
to allow them (environment settings → Network access → Allowed domains), then run the signed-in capture: rows in
`captures/to-capture.md` (~50) plus the AI shots and the AI video (at most 5 prompts in total; none sent yet).

**Phase 9 status (2026-10-08 ~02:45 UTC): done, except the signed-in captures.**

| Item | Status |
|---|---|
| 1 Journey coverage | Done (guides, recipes, routes page, store rules; all verified). |
| 2 Videos | Done: 5 embedded (add widgets, layout, Instant Play, Circuit, themes). The AI video needs sign-in. |
| 3 Warm, clear language | Done (79 pages edited; style guard: no fact changes). |
| 4 Structure | Done. |
| 5 Highlighted screenshots | Done for everything the playground can show (58 of 113 pages have media). 36 pages wait for signed-in captures. |
| 6 Tips | Done. |

**Last build:** `yarn build` passed with no warnings (7 videos validated). PR body updated from `PR-REPORT.md`.

**Next (when the user allows `server.nowa.dev` and `app.nowa.dev` in the environment's network settings):** run
`CAPTURE-SIGNED-IN.md` with one or two capture agents (at most 5 AI prompts in total, none used yet), embed with
`captures/tools/embed.py` after checking each image, add the AI video by hand, rebuild, update the PR.

**Verification of phase 9 text (non-author agents), state at the pause:**
- Done: `reviews/P9-gaps-review.md` (coverage gap fixes, integrations overview additions, share.md),
  `reviews/P9-guides-b-review.md` (ai-tips, data-and-state-tips, ship-tips; 19 rows fixed),
  `reviews/P9-guides-a-review.md` (guides index, complete-app, design-tips; 22 fixed, 2 removed).
- Done: `reviews/P9-routes-review.md` (router.md, navigation.md, 7 one-line links; 4 fixed, 2 reduced).
- Done: `reviews/P9-recipes-review.md` (17 pages, 65 claims; 4 fixed: test/index.md gates and badge, devices.md QR icon).
- Done: `reviews/P9-structure-review.md` (21 pages, ~100 claims, 3 wording fixes; 0 broken links across 115 pages).
- Done: `reviews/P9-fixups-review.md` (W22's four fix-ups; 2 wording fixes).

**Open points from the routes check:** Firebase sign-in persistence on phones is unconfirmed (the page names the web
only); a restored Supabase session can be briefly expired because `recoverSession()` isn't awaited (not on the page);
`router.md` needs a row in `pages.md`.

**Fix-up round:** done (W22, verified in `reviews/P9-fixups-review.md`).

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
