# P10 live checks on Nowa 3.13.0 (app.nowa.dev/playground)

Run: 9 Oct 2026, headless Chromium 141 (Playwright 1.56.1 build 1194) on Linux, viewport 1440x900 at scale 1, driven with
`_rewrite/captures/tools/capture.mjs` (a patched copy in the scratchpad, see "Setup"). Version shown in the status bar: **v3.13.0-79**
(`app.nowa.dev/version.json` says 3.13.0). Starter app, playground, never signed in, no AI prompt, nothing saved or deployed, no package added
(the one place where a package prompt was offered was cancelled).
Evidence: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/live-checks/` (file names are given per item).

Status: IN PROGRESS (this file is written as the checks run).

## Setup notes

- Cookie banner: on the splash screen the banner reads "We use cookies to measure our advertising and improve Nowa. See our privacy policy." with
  **Reject** and **Accept**. **Reject** clicked first (`00-cookie-banner.png`, `00-cookie-banner-after-reject.png`; cookie `nowa_consent=v1.denied`).
  The capture session then sets the same cookie itself, so the banner never shows there.
- `app.nowa.dev` answers 403 for `/canvaskit/` and `www.gstatic.com` is blocked in the sandbox, so the engine never started. Fix (tool only, not the app):
  a scratchpad copy of `capture.mjs` answers the CanvasKit CDN requests from `/home/user/nowa-build/build/web/canvaskit/`; that 3.12.5 build has the same
  engine revision (`0cd610717bde95fd88343c64f81c11ba4e5c0010`) as the live 3.13.0 bootstrap. The editor then loads in about 2 minutes.
- The repo's `captures/README.md` coordinates are 3.12.5. 3.13 sidebar (from `01-first-load.png`): Assistant 67, **Library** 107, Themes 147, Search 187,
  Outline 227, Api 267, Supabase 307, Router 365. Top bar: starting-point chip, Back and Forward arrows (396, 424), Boards chip (484, 20) showing the
  board name ("first" on a fresh playground), `<>` 1313, gear 1351, **Save** 1405 (never clicked).

