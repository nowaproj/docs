# Captures: how to take the docs screenshots

Screenshots (and the few videos) of the real Nowa 3.12.5 editor, taken from the local web build at `/playground`
(no sign-in, no account). Rules: `../CAPTURE.md`. Requests: `requests/W*.md`. Results: `log.md`, images in
`static/img/docs/<section>/<id>.png`, videos in `static/videos/docs/<section>/<id>.mp4`. What is left: `to-capture.md`.

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
node capture.mjs stop                                  # when done (also stop the server: kill the `node serve.mjs` process)
```

Playwright lives in `tools/node_modules` (run everything from `tools/`). Tesseract, ImageMagick (`convert`,
`identify`), `ffmpeg` and `ffprobe` are installed. Keep scratch scripts and raw shots in the scratchpad, not in the repo,
and use absolute paths: every shell call starts fresh, so an unset `$VAR` in a path writes to the wrong place.

## Two ways to work

| Way | Use it for | How |
|---|---|---|
| CLI on the open session | exploring, finding coordinates, single shots | `node capture.mjs <command>`; `node capture.mjs help` lists all commands (`click`, `hover`, `drag`, `type`, `press`, `ocr`, `text`, `dump`, `panel`, `shot`, `eval`, ...) |
| Scenario script | repeatable captures (state setup + shot + crop) | `node capture.mjs run my.mjs --session` (on the open session) or without `--session` (fresh browser, ~30 s) with `export default async ({ page, cap }) => { ... }` |

The CLI has no mouse wheel, right click with real press/release, Ctrl+wheel, or highlight overlay. The runner below adds
them and takes a JSON list of steps (`ACT='[...]' node capture.mjs run act.mjs --session`):

```js
// act.mjs (keep it in the scratchpad)
const HL = 'capture-hl';
const addHl = (page, boxes, pad = 6) => page.evaluate(({ boxes, pad, id }) => {
  document.querySelectorAll('.' + id).forEach((e) => e.remove());
  for (const b of boxes) { const p = b.pad ?? pad, d = document.createElement('div'); d.className = id;
    d.style.cssText = `position:fixed;left:${b.x - p}px;top:${b.y - p}px;width:${b.w + 2 * p}px;height:${b.h + 2 * p}px;box-sizing:border-box;border:3px solid #F7A93A;border-radius:8px;box-shadow:0 0 0 4px rgba(247,169,58,0.25);pointer-events:none;z-index:2147483647;`;
    document.body.appendChild(d); }
}, { boxes, pad, id: HL });
const rmHl = (page) => page.evaluate((id) => document.querySelectorAll('.' + id).forEach((e) => e.remove()), HL);
export default async ({ page, cap }) => {
  for (const a of JSON.parse(process.env.ACT || '[]')) switch (a.do) {
    case 'move': await page.mouse.move(a.x, a.y, { steps: a.steps ?? 4 }); await cap.sleep(300); break;
    case 'click': await cap.clickAt(a.x, a.y, { settleMs: a.settle ?? 500 }); break;
    case 'dclick': await cap.clickAt(a.x, a.y, { clickCount: 2, settleMs: 600 }); break;
    case 'rclick': await page.mouse.move(a.x, a.y, { steps: 4 }); await cap.sleep(250);
      await page.mouse.down({ button: 'right' }); await cap.sleep(90); await page.mouse.up({ button: 'right' }); await cap.sleep(a.settle ?? 700); break;
    case 'wheel': await page.mouse.move(a.x, a.y, { steps: 3 }); await cap.sleep(200); await page.mouse.wheel(0, a.dy); await cap.sleep(600); break;
    case 'ctrlwheel': await page.mouse.move(a.x, a.y, { steps: 3 }); await page.keyboard.down('Control');
      await page.mouse.wheel(0, a.dy); await page.keyboard.up('Control'); await cap.sleep(700); break;
    case 'key': await cap.press(a.keys, { delayMs: 200 }); break;          // Playwright names: Backspace, Control+a, Escape
    case 'type': await cap.type(a.text, { delay: a.delay ?? 40 }); await cap.sleep(400); break;
    case 'drag': await cap.drag(a.from, a.to, { settleMs: 700 }); break;
    case 'sleep': await cap.sleep(a.ms); break;
    case 'settle': await cap.settle(); break;
    case 'text': console.log(JSON.stringify((await cap.findText(a.query, { clip: a.clip, exact: !!a.exact })).slice(0, 3).map((h) => [h.text, h.cx, h.cy]))); break;
    case 'shot': if (a.hl) await addHl(page, a.hl, a.pad ?? 6);               // a.hl = [{x,y,w,h,pad?}] in CSS px
      await cap.shot(a.file, { clip: a.clip, scale: a.scale ?? 'device' }); if (a.hl) await rmHl(page); break;
  }
};
```

## Highlights (required for new captures)

Every new image has one highlight (two at most) around the control or area the row is about: an orange rounded box
(`#F7A93A`, 3 px border, 8 px radius, 4 px soft glow, ~6 px padding, never covering the label). The `shot` step above
injects it as a fixed DOM overlay (`pointer-events: none`), takes the shot and removes it. Take the box from a
screenshot of the same state (CSS px), then **look at the result**. Highlights sit on top of the product's own orange
hover/selection outlines: pick targets where that stays readable. Callout numbers (editor tour) were drawn afterwards
with ImageMagick `convert -draw circle` + `-annotate`.

## Finding things on screen

Flutter draws to a canvas, so there is no DOM to query. Three ways, in order of preference:

1. **Fixed coordinates** (1440x900 CSS px, design mode). See "Coordinates" below, `tools/capture.mjs` (`SIDEBAR`, `UI`)
   and `ui-map/*.json` (labels with boxes for 23 editor states; view `ui-map/*.png`).
2. **OCR**: `cap.findText(page, 'Container', { clip, exact: true })` or `node capture.mjs text "New Screen"`. Pass a
   `clip` (1.5-7 s per full-screen pass). Works with semantics off.
3. **Semantics tree**: `node capture.mjs semantics` then `dump`, `find <label>`. Turn it on only when needed:
   - With semantics ON, text typed into the left panel, the AI chat field and palettes is lost. Do all typing first, or
     reload (`goto`) afterwards. This run needed no semantics at all (coordinates + OCR were enough).
   - In design mode the board blocks the semantics of the top bar and left panel.

## Gotchas (all hit in practice)

- **Zoom and pan.** Flutter web turns Ctrl+wheel into a scale event: `deltaY = -100` zooms out about 6.5% per event, a
  positive value zooms in, and a big value (for example -1800) breaks the board transform. That transform is stored in
  `localStorage` (`flutter.listBoardViewStatus`) and survives reloads and `goto`: if the board looks empty, remove it and
  `flutter.listProjectsStatus`, then reload (`fresh` in the notes below). A plain wheel pans the board
  (`deltaY = -15` moves it about 15 px down); over **Details** it scrolls the panel.
- **State persists.** `goto /playground` clears only `flutter.playground_bundle` (back to the clean starter);
  `goto --keep` brings your edits back.
- **No outbound network.** Template and widget previews fetch images through `server.nowa.dev`, which is unreachable:
  the status bar then shows "HTTP request failed ..." instead of "Ready". Reload before full-window shots, or crop away
  from the status bar. **Run Test** on an API request fails (XMLHttpRequest error), so shots of a successful test,
  Generate Model, models from a real API and pub.dev package suggestions are not possible here.
- **Toolbar moves.** It is centered in the board area, so closing the left panel shifts it 171 px left.
- **Details panel.** Taller than the window for most widgets: scroll it with the wheel, and crop at y <= 830 to keep
  the round **?** button (1408, 852) out of the shot. Collapse **Details** (click its header, (1410, 108)) when a
  picker's preview card would overlap it.
- **Text-based widgets (Button, Text)** take canvas clicks themselves: select them in the **Outline** panel.
- **Template screens and components** open a naming dialog (**Submit**), and a new screen lands near the viewport
  center: set **X** and **Y** in Details (double-click the field, `Control+a`, type, `Enter`) to place it.
- Selecting a widget adds a context chip to the AI chat field. Do not click **Save** (top right) or any AI send button.
- Product quirks seen: switching the home screen's Group to a Row renders the screen gray with a status-bar
  "Canvas error ... preferredSize"; the widget menu shows `Ctrl ]` for both **Move Up** and **Move Down** (known, P2).

## Coordinates (1440x900, design mode, left panel open)

| What | Where |
|---|---|
| Sidebar icons (x = 20) | y = 67 Assistant, 107 Widgets, 147 Themes, 187 Search, 227 Files, 267 Outline, 307 Api, 347 Supabase, Router (20, 405) |
| Top bar (y = 20) | starting-point chip (100), board chip (420 on first load), code toggle (1313), gear (1351), **Save** (1405, never click) |
| Toolbar (y = 847) | Select 839, Shape 875, Screen 911, Text 947, Widget 983 (left panel closed: 668, 704, 740, 776, 812) |
| Home screen after a fresh load | title bar at (940, 231); screen x 882-1275, y 241-1049; on hover **Play** (987, 231), **Open in new tab** (1010, 231) |
| Details / Variables | x 1192-1432; Variables header y = 66, Details header y = 108 |
| Pickers (Ctrl+K, Screen tool, Add context) | list x 510-930, first row y = 270, rows 60 px apart, footer y = 725; preview card x 946-1258 |
| AI chat field | mode chip (92, 849), **+** Add context (266, 849), Supabase/Figma icons, Send (352, 849); header **+** New Session (328, 67), **⋮** (358, 67) |
| Circuit (floating panel) | x 320-1120, y 150-750; top node (720, 310), its dot / **+** (720, 349); × (1096, 168) |
| Code mode | back arrow (17, 20); tab bar download (957, 61) and Show preview (1417, 61) before the pane opens |

## State recipes

| To get | Do |
|---|---|
| Clean app | `fresh` = clear the two localStorage keys above, then `node capture.mjs goto /playground` |
| A widget on the home screen | click the home title, `Control+k`, `Control+a`, type the name, find the row with `findText` in clip (505, 200, 430, 500), `drag` it to (960, 450) |
| A loose Container | click **Shape**, drag on empty board; click empty board to deselect |
| Circuit for a Button | select the Button (Outline), wheel Details down, click **Edit** on the **On Pressed** row; hover the dot, click **+**, type in the search box, click the item |
| Instant Play | hover the home title, click **Play**, wait 3 s; stop with the ■ in the bottom bar |
| Second board / screen | board chip > **Create new board** (dialog, **Submit**); **Screen** tool > template > dialog |
| Group / Column | select in the Outline, `Control+g`; click the down arrow in the **Group** header |
| Component | right-click a Container > **Create component** > **Submit**; Widgets panel > **Component** tab |
| Collection + requests | Api panel **+** > **New Collection**; hover the row: gear (settings, Base URL), **+** > **New Request** |
| Dialog crops | dialogs are centered at about (720, 450); the template and component naming dialogs' **Submit** is at (765, 537); the **New Board** dialog's is at (765, 520) |

## Typical waits

| After | Wait |
|---|---|
| `start` / `goto` / `openEditor` | built in (waits for the editor, removes the cookie banner, settles); 18-30 s |
| sidebar panel click (`openPanel`) | built in (0.7 s + settle) |
| opening a menu, dialog or palette | 0.5-1 s, then `settle` |
| typing in a picker search box | 0.7-1 s before looking for results |
| code mode (`</>`), Show preview | 2.5-3.5 s |
| Instant Play start | 3 s |
| a drag | `drag` holds 200 ms and moves in 25 steps; add 0.5-1 s after |

Park the pointer on an empty board spot (for example 470, 700) before a shot so no hover effect shows, except for
overlays that close when the pointer leaves (pickers) or the hover you want to show.

## Saving an image

1. Screenshot at 2x with a clip: `cap.shot(file, { clip: { x, y, w, h } })` (CSS px) with the highlight box.
2. Scale to at most 1600 px wide: `convert in.png -resize '1600x>' out.png` (or `ffmpeg -vf "scale='min(1600,iw)':-2"`).
   Crops are kept at 2x, so a 260 px wide panel is a 520 px wide PNG (the embed can show it at half width).
3. Save as `/home/user/docs/static/img/docs/<section>/<id>.png`, open it with the Read tool, check it matches the row
   and that the highlight sits on the right control.
4. Set the row's status in `requests/W*.md` and append `| id | /img/docs/<section>/<id>.png | alt text | yes |`
   to `log.md`. Page placeholders that have no request row yet get a row first (copy state / show / crop from the page).

Videos (`mp4` rows only): `node capture.mjs video scenario.mjs out.mp4`, or `toMp4` / `checkVideo` from the library
(H.264 High, yuv420p, at most 1920x1080 and 30 fps, no audio, faststart). Check frames with ffmpeg before keeping one.
No video has been recorded yet (3 rows: design-add-widgets-2, design-select-and-edit-1, logic-events-2).

## Hard limits

No sign-in, no Save, no deploy/purchase/invitation, no connecting accounts, no AI prompts unless the brief allots them
(log each in `ai-prompts.md`; none sent so far in the runs that wrote this file). Never commit. Do not edit docs pages.
