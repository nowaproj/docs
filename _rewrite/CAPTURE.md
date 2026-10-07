# Capture brief

You take the screenshots (and a few short videos) the docs pages request, from the real Nowa 3.12.5 editor
running locally at `/playground` (no sign-in).

## Read first

1. `/home/user/docs/_rewrite/BRIEF.md` (rules), the "Screenshots and videos" section of
   `/home/user/docs/_rewrite/style-guide.md`, and `/home/user/docs/_rewrite/captures/requests/README.md` (request format).
2. The capture tools: `/home/user/docs/_rewrite/captures/tools/serve.mjs` (static server with SPA fallback and
   local CanvasKit), `capture.mjs` (Playwright library + CLI; read its header comments and exported functions
   first), `ui-map.mjs` (how the reference shots were made). Reference shots of 23 editor states with their
   on-screen labels and bounding boxes: `/home/user/docs/_rewrite/captures/ui-map/*.png` + `*.json`
   (`index.json` lists them). The setup agent was stopped before writing `captures/README.md`: if it's still
   missing, write it first (how to start the server and use the tools), from what you learn.

## Setup

- Start the server in the background: `node /home/user/docs/_rewrite/captures/tools/serve.mjs --port 8080`
  (it serves `/home/user/nowa-build/build/web`, the released v3.12.5 web build). Check
  `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/playground` returns 200.
- Chromium is pre-installed (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); never run `playwright install`.
  Playwright is installed in `captures/tools/node_modules`.
- Viewport 1440x900, deviceScaleFactor 2. Flutter draws to a canvas: enable the semantics tree (see capture.mjs)
  and use labels, or click by coordinates from a screenshot.

## For each request

Requests are rows in `/home/user/docs/_rewrite/captures/requests/W*.md`. Do the rows with status `requested`.
Skip rows marked `needs-sign-in` (and anything that needs an account: dashboard, account, billing, deploy,
Git remotes, integrations that connect external services); copy those to
`/home/user/docs/_rewrite/captures/to-capture.md` if they aren't there yet.

1. Set up the state the row describes in the playground editor (a fresh page load gives a clean starter app;
   the starting-point picker in the top-left chip switches starters).
2. Capture, crop to the region the row says (keep enough context to find the control), and save as
   `static/img/docs/<section>/<id>.png` in `/home/user/docs`, where `<section>` is the page's docs folder
   (`get-started`, `ai`, `design`, `logic`, `integrations`, `test`, `publish`, `code`, `account`,
   `troubleshooting`, `reference`). Keep files small: max 1600 px wide (scale with
   `ffmpeg -y -i in.png -vf "scale='min(1600,iw)':-2" out.png`), PNG.
3. **Highlight what matters.** Before the shot, draw one highlight (two at most) around the control or area the
   request is about: a fixed-position DOM overlay over the Flutter canvas at the element's bounding box (from the
   semantics tree or ui-map JSON), `border: 3px solid #F7A93A; border-radius: 8px; box-shadow: 0 0 0 4px
   rgba(247,169,58,0.25); pointer-events: none;` with ~6 px padding; remove it after the shot. Fallback: draw the
   box afterwards with ffmpeg `drawbox`. Never cover the label itself.
4. **Look at the image** (Read tool) and check it shows exactly what the row asks for, with readable labels
   and no stray menus, tooltips or loading spinners. If not, fix the state and retake it. Never keep an image
   that doesn't match.
5. Update the row's status to `captured` (or `not-possible: <why>`, or `skipped: low value`), and **append one line
   to the table in `/home/user/docs/_rewrite/captures/log.md`** (create it with this header if missing):
   `| id | file | alt text | checked |` → e.g.
   `| design-boards-1 | /img/docs/design/design-boards-1.png | The board menu open, with Create new board at the bottom. | yes |`
   The `file` is the site path (starts with `/img/` or `/videos/`). An embed script reads this table, so keep the
   format exact: one row per capture, no line breaks in cells.

Do **not** edit the docs pages (verifiers are editing them at the same time). A later step embeds your images
from `captures/log.md`.

**Value first:** screenshots only where they genuinely help (finding a control in a busy UI, recognizing a dialog,
seeing a result). Per page, capture at most the one or two most useful requests; mark the rest `skipped: low value`.

## Videos

Only for rows with type `mp4`, at most 4 in total, each ≤ 20 s: record with Playwright, convert to H.264 MP4,
≤1920x1080, ≤30 fps, `-movflags +faststart`, no audio (see `/home/user/docs/README.md` "Adding videos"), save to
`static/videos/docs/<section>/<id>.mp4`, and check with ffprobe (codec h264, fps ≤30). Check a few frames
(extract with ffmpeg and view) before keeping it.

## Hard limits

- No sign-in, no deploys, no purchases, no invitations, no connecting external accounts.
- AI prompts: the whole project may send at most 5. You may send at most **3**, only if Nowa AI works in the
  playground without an account (if it asks you to sign in, stop: no prompt was sent), and only for rows that need
  an AI result. Log every prompt you send (time, text, which row) in `/home/user/docs/_rewrite/captures/ai-prompts.md`.
- Never commit. Write only images/videos under `static/img/docs/`, `static/videos/docs/`, the request files,
  `captures/to-capture.md`, `captures/log.md`, `captures/ai-prompts.md` and `captures/README.md`.

Final message (at most 15 lines): captured / not possible / needs sign-in counts, prompts sent, problems.
