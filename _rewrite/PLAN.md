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
| 6 | Integration | config, sidebar, redirects, build | done; final build check pending |
| 7 | Final QA: coverage audit, style pass, link check | `coverage.md`, `reviews/final-*.md` | coverage done (348/358, gaps closed); style pass = phase 9 item 3 |
| 8 | Draft PR with report | PR | todo (open once phases 4-7 are done; update it after phase 9) |
| 9 | Final quality pass: the user's acceptance criteria (see below) | pages, videos, annotated screenshots, best-practice guides | todo (trigger when phases 4-8 are done) |

## Resume here (stopped by the user on 2026-10-07 ~12:30 UTC)

**State:** all ~100 pages are written; `yarn build` passed at the last full build (02:30 UTC 2026-10-07; re-run it);
34 screenshots are embedded; the redirects, sidebar, legacy section and site fixes are done (see decisions D11-D13).

**Verification (phase 4), per batch** (`reviews/<batch>-review.md`; batches in `pages.md`):
- Done: W1 (home + get started), W2 (AI), W3 + W4 (design), W5 + W6 (logic), W7 (preview/test + troubleshooting),
  W8 (publish), W9 + W10 (code), W11 (account), W14 (integrations overview, Data Builder, constants, REST),
  W15 (Supabase), W16 (Firebase).
- **Partial, resume from the log:** W17 (`stripe.md`, `revenuecat.md`, `admob.md` done; left: `google-maps.md`,
  `google-sign-in.md`, `deep-links.md`); W13 (catalog `reference/widgets/index.md` done; left: `wrappers.md`,
  `widgets/forms.md`, `lists.md`, `navigation.md`, `media.md`; keep every `<a id>` anchor).
- **Not finished:** W12 + W18: `reference/shortcuts.md` got some fixes but no review log was saved, so re-verify it
  fully; then `reference/glossary.md`.

**Next steps, in order:**
1. Finish verification: W17 (3 pages), W13 (5 pages), W12 shortcuts + glossary (verifier prompts: see `VERIFIER.md`;
   tell each to continue from its log).
2. Coverage audit → `_rewrite/coverage.md` (partial: sections marked `(pending)` are not audited yet; resume from
   the file). Fix the gaps it finds.
3. Embed remaining captures: `python3 -I _rewrite/captures/tools/embed.py` (all folders once verification is done).
4. Full `yarn build` (must pass with no broken links or anchors), then open the **draft PR** with the report
   (structure, what changed, decisions, open questions, product issues, unfinished items).
5. Phase 9 quality pass (below), then update the PR.

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
