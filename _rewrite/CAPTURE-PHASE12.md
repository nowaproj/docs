# Phase 12 brief (2026-10-11): optional playground shots and open live checks

You work on the Nowa docs (Docusaurus repo `/home/user/docs`, branch `docs-rewrite`, a **public** repo) in the live Nowa
3.13.0 editor at `https://app.nowa.dev/playground`, **signed out** (no account, nothing to blur unless a name shows up).

## Read first

1. `/home/user/docs/_rewrite/CAPTURE.md`: "For each request" (highlight `#F7A93A`, look at every image), "Videos" and
   "Hard limits". Ignore its "Setup" section (it describes the old local 3.12.5 build) and its log and request-status
   steps (see Output below).
2. `/home/user/docs/_rewrite/captures/README.md`, especially "Nowa 3.13 on app.nowa.dev" (proxy flag, cookie banner,
   coordinates, AI panel broken for guests, Flutter canvas tips, the video patches). Tools:
   `/home/user/docs/_rewrite/captures/tools/` (`capture.mjs`, `video/rec.mjs`).
3. Your rows' requests in `/home/user/docs/_rewrite/captures/requests/W*.md` (search the ID) and the docs page each
   row belongs to (the page path is in `/home/user/docs/_rewrite/captures/to-capture.md`, section "Optional").

## Rules

- Signed out only. No AI prompts (the budget is used up), no sign-in, no publish, no Share link, nothing public.
- Use your own `CAPTURE_CDP_PORT`, your own Xvfb display if you need one, and your own folder under
  `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/` (all named in your prompt). Keep raw shots
  and scripts there, not in the repo.
- Final images go to `/home/user/docs/static/img/docs/<section>/<id>.png` (at most 1600 px wide), videos to
  `/home/user/docs/static/videos/docs/<section>/<id>.mp4` (H.264, at most 30 fps, no audio, faststart, at most 20 s).
- **Value first.** These rows were skipped earlier because their page already has one image. Take each one only if it
  shows something the page's existing image doesn't. If it would just repeat it, list it as `skipped: <why>`.
- Don't edit docs pages, `captures/log.md` or the request files: the orchestrator merges your log. Never commit or push.

## Output

Your log file (named in your prompt), with:

1. a table `| id | file | alt text | checked |` (same format as `captures/log.md`: `file` is the site path such as
   `/img/docs/design/design-responsive-2.png`; the alt text says what the image shows, one or two sentences, no `|`, no
   square brackets; checked = `yes (3.13.0)`), one row per final image or video;
2. a list `| id | status |` for rows you didn't take, with the reason (`not-possible: ...` or `skipped: ...`);
3. **Live check:** for each page you captured for, compare the steps and labels near your image's spot with what the
   live UI shows, and list every mismatch with a suggested correction (`| page | claim | what the UI shows | suggestion |`).

Final message (at most 12 lines): taken / not taken, mismatches found.
