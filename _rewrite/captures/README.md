# Captures: how to take the docs screenshots

Screenshots (and the few videos) of the real Nowa 3.12.5 editor, taken from the local web build at `/playground`
(no sign-in, no account). Rules: `../CAPTURE.md`. Requests: `requests/W*.md`. Results: `captures/log.md`,
images in `static/img/docs/<section>/<id>.png`, videos in `static/videos/docs/<section>/<id>.mp4`.

## Quick start (about 2 minutes)

```bash
# 1. static server for the released web build (background; serves /home/user/nowa-build/build/web, SPA fallback,
#    local CanvasKit because www.gstatic.com is blocked in the sandbox)
cd /home/user/docs/_rewrite/captures/tools
nohup node serve.mjs --port 8080 > /tmp/serve.log 2>&1 &
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080/playground     # expect 200

# 2. headless Chromium kept open between commands (CDP port 9333); opens /playground, takes ~30 s
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers      # never run `playwright install`
node capture.mjs start                                 # add --starter simple|empty to seed another starter app
node capture.mjs shot /tmp/x.png --css                 # 1440x900 screenshot (drop --css for 2880x1800)
node capture.mjs stop                                  # when done
```

Playwright lives in `tools/node_modules` (run everything from `tools/`). Tesseract, ImageMagick (`convert`,
`identify`), `ffmpeg` and `ffprobe` are installed.

## Two ways to work

| Way | Use it for | How |
|---|---|---|
| CLI on the open session | exploring, finding coordinates, single shots | `node capture.mjs <command>`; `node capture.mjs help` lists all commands (`click`, `hover`, `drag`, `type`, `press`, `ocr`, `text`, `dump`, `panel`, `shot`, `eval`, ...) |
| Scenario script | repeatable captures (state setup + shot + crop) | `node capture.mjs run my.mjs` (fresh browser per run, ~30 s startup) with `export default async ({ page, cap }) => { ... }`; optional `export const options = { starter: 'starter', semantics: false }`. Add `--session` to run on the open session instead. |

Keep scenario scripts outside the repo (the scratchpad); only the PNGs, `log.md` and the request files are results.

Library use (`import * as cap from './capture.mjs'`): `launch`, `openEditor`, `click`, `clickAt`, `hover`, `drag`,
`type`, `press`, `settle`, `screenshot`, `findText` (OCR), `semantics`, `openPanel`, `closePanel`. In a scenario,
`cap` already has them bound to the page (`cap.click('Save')`, `cap.shot(file, { clip })`).

## Finding things on screen

Flutter draws to a canvas, so there is no DOM to query. Three ways, in order of preference:

1. **Fixed coordinates** (1440x900 CSS px, design mode). The sidebar icons, top-bar buttons and panel areas are in
   `tools/capture.mjs` (`SIDEBAR`, `UI`) and `ui-map/*.json` (labels with boxes for 23 editor states; view
   `ui-map/*.png`). Sidebar `x = 20`, icons at `y = 67, 107, 147, 187, 227, 267, 307, 347` (AI Assistant, Widgets,
   Themes, Search, Files, Outline, Api, Supabase); Router icon `(20, 405)`; top bar `y = 20`: board chip `(403, 20)`,
   code toggle `(1313, 20)`, settings gear `(1351, 20)`, **Save** `(1405, 20)` (never click Save: it opens the sign-in flow).
2. **OCR**: `cap.findText(page, 'Container', { clip, exact: true })` or `node capture.mjs text "New Screen"`. Pass a
   `clip` (1.5-7 s per full-screen pass). Works with semantics off.
3. **Semantics tree**: `node capture.mjs semantics` then `dump`, `find <label>`. Turn it on only when needed:
   - With semantics ON, text typed into the left panel, the AI chat field and palettes is lost (those fields have
     no semantics node: the board covers them). Do all typing first, or reload (`goto`) afterwards.
   - In design mode the board blocks the semantics of the top bar and left panel; they only appear in OCR/coordinates.
   - `enableSemantics` makes the semantics DOM `pointer-events: none`, so clicks reach Flutter as normal.
   - The tree is most useful for the board (screen names, widgets), Details, dialogs and menus.

## Typical waits

| After | Wait |
|---|---|
| `start` / `goto` / `openEditor` | built in (waits for the editor, removes the cookie banner, settles); ~30 s the first time |
| sidebar panel click (`openPanel`) | built in (0.7 s + settle) |
| opening a menu, dialog or palette | 0.5-0.8 s, then `settle` |
| typing in a picker search box | 0.7 s before looking for results |
| code mode (`</>`) | 2.5 s |
| Instant Play start | 2.5 s |
| a drag | `drag` holds 200 ms and moves in 25 steps; add 0.5 s after |

Park the pointer on an empty board spot (e.g. `1430, 600`) before a shot so no hover effect shows, except for
overlays that close when the pointer leaves (pickers).

## Saving an image

1. Screenshot at 2x with a clip: `cap.shot(file, { clip: { x, y, w, h } })` (CSS px).
2. Scale to at most 1600 px wide: `ffmpeg -y -i in.png -vf "scale='min(1600,iw)':-2" out.png`
   (or `convert in.png -resize 1600x\> out.png`).
3. Save as `/home/user/docs/static/img/docs/<section>/<id>.png`, open it with the Read tool, check it matches the row.
4. Set the row's status in `requests/W*.md` and append `| id | /img/docs/<section>/<id>.png | alt text | yes |`
   to `log.md`.

Videos (`mp4` rows only): `node capture.mjs video scenario.mjs out.mp4`, or `toMp4` / `checkVideo` from the library
(H.264 High, yuv420p, at most 1920x1080 and 30 fps, no audio, faststart). Check frames with ffmpeg before keeping one.

## Hard limits

No sign-in, no Save, no deploy/purchase/invitation, no connecting accounts, no AI prompts unless the brief allots them
(log each in `ai-prompts.md`). Never commit. Do not edit docs pages.
