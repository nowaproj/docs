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
- **No outbound network (early runs only).** In the first runs, template and widget previews fetched images through
  `server.nowa.dev`, which was unreachable: the status bar then showed "HTTP request failed ..." instead of "Ready".
  Reload before full-window shots, or crop away from the status bar. **Run Test** on an API request failed
  (XMLHttpRequest error). Since the network was opened (10 Oct, live app through `$HTTPS_PROXY`), **Run Test**,
  **Generate Model** and Instant Play reach public CORS-enabled APIs (`catfact.ninja`, `jsonplaceholder.typicode.com`).
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
- Text Field validators: after **+ Add validator** → **Min length validator** (or **Max length**), Details shows one more plain **Message**
  row and no rule header or **Min** / **max** field. The rule is written as `value.length < min` / `> max` (`form_validator.dart:213,246`) but
  the loader only reads `<=` / `>=` as Min / Max length and everything else as Required (`:313-328`). A **Regex** rule renders fully, so
  `reference-forms-1` shows Regex (the page names Min length as its example).
- **Layout fields right after a drop.** Typing into L / T / W / H of a widget that was just dropped does nothing: click its row in
  the **Outline** first (rows at y = 139 appBar, then 175, 211, 247 ...). Selected that way, Details has a breadcrumb row, so L / T are
  at y = 278 and W / H at y = 350 (x = 1273 and 1383). Hover outlines from Outline rows can stay stuck on the board: reach sidebar
  icons from below instead of crossing the rows.
- **Integrations pages (Google Maps, AdMob, RevenueCat).** The **Enabled** switch needs pub.dev (unreachable here): its spinner never ends.
  For the enabled look, add the package in code mode (`pubspec.yaml`: `nowa_mobile_ads: ^0.0.9`, `google_maps_flutter: ^2.14.2`,
  `purchases_flutter: ^9.12.0`, `purchases_ui_flutter: ^9.12.0`), save with `Control+s`, go back and reload with `goto --keep`: the page then
  shows **Enabled** on with its **Configuration** fields. The status bar then lists "Setup statement in main.dart ..." problems: crop them out.
  The **RevenueCat Paywall** shows "Method PaywallView is not found" until the package analyzer answers
  (`package-analyzer-*.run.app/analyze/<package>/<version>`, unreachable): a `context.route` stand-in that returns one class
  (`PaywallView`, constructor named `''`) lets the product draw its own purple placeholder card.
- **Code editor typing.** It auto-closes quotes and brackets, so type code with `page.keyboard.insertText(...)`, not char by char.
  Ctrl+S in code mode saves to the playground (no sign-in dialog opened). Status bar counts: click them to open the Console on **Problems**.
- **Phone layout.** `launch({ width: 390, height: 844 })` and `/playground` shows the phone layout (MobileView) without any click.
  `/signup` opens signed out; its "No response" banner (network) closes with its X. Type nothing there.

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
Recorded (in `static/videos/docs/<section>/`): `test-instant-play-video` (15.6 s), `design-layout-video` (14.2 s),
`design-add-widgets-video` (14.8 s), `logic-circuit-video` (15.3 s) and `design-themes-video` (15.9 s). `ai-index-video` is not
possible without an account: the playground's first AI send opens the sign-in dialog (`chat_session.dart:264`).

### Videos: what worked (scripts in the scratchpad of the phase-9 run: `.../scratchpad/cap9/vid/`)

`node rec.mjs <scenario.mjs> <out.mp4> --crop x,y,w,h [--tail 800] [--dry]` (run from `cap9/vid`, with
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` and the server on :8080). Files: `rec.mjs` (fresh Chromium with `recordVideo`, pixel-based
editor loader, ffmpeg crop and H.264 conversion, `checkVideo`), `lib.mjs` (visible cursor, click ripple, key badge, time-based `glide`,
`click`, `drag`, `typeSlow`, `pan`, fast setup helpers), `common.mjs` (`addWidget`, `addSnackbar`), scenarios `instant-play.mjs`,
`layout.mjs`, `add-widgets.mjs`. A scenario exports `setup` (not shown: trimmed away) and `main` (recorded).

- Record at device scale **1** (viewport 1440x900, the default of `rec.mjs`) and crop in CSS px. At scale 2 the editor takes 200-450 ms
  per input while the picker is open (a 10 s scene took over a minute), and a `recordVideo` size larger than the viewport only
  letterboxes the page in a corner.
- The Playwright video does not start at `newPage()`: `rec.mjs` trims from the end (webm length minus the time `main` took).
- Pointer moves must be time-based (`glide`), not step-counted: frames are 40-150 ms apart while a panel or the picker is on screen.
- Pan the board with **Space + drag** (`lib.pan`) before anything has text focus; a wheel pans half as far at scale 1, and a big wheel
  delta can throw the board away. Shift+click did not multi-select; a marquee drag inside the screen does. Ctrl+A selected every board item.
- Hovering a label parks a tooltip in the first frame: park the pointer on empty board. After changing a Group to a Column the
  breadcrumb says Stack until the alignment is non-default (cosmetic).
- Details positions differ by how the widget was selected (Edit next to On Pressed is at y=801 after a drop, 841 after an Outline click).
- Playing a screen zooms the board (about 0.77); a new Switch does not toggle in Play (no state), a Text Field does.

Phase 10 scenarios (same `rec.mjs` and `lib.mjs`, run from a copy in the scratchpad; each took 30-110 s to record):

- `design-add-widgets-video` (`--crop 383,42,1057,836`): click the title (940,231), `lib.key('Control+k', 'Ctrl / Cmd + K')`, type `button`
  at 130 ms per key, `lib.drag` the 4th row (592,450) to (1010,530). The picker closes while dragging; the Button lands selected.
- `logic-circuit-video` (`--crop 320,130,1120,740`): setup drops a Button (4th row, to 960,540) and closes the left panel. Main: click **Edit**
  (1340,841), glide to the dot (720,349) and wait 0.9 s for the **+**, click it, then move the pointer to (560,520) so it does not cover the
  menu title, type `snack`, click **Show snackbar** (782,670).
- `design-themes-video` (`--crop 0,42,1130,836`): setup adds Linear Progress Indicator (value 0.6, W 345, Min Height 10), Switch and
  Checkbox with the Outline + Layout recipe above, then pans the board 160 px left (`lib.pan`). Main: Themes icon (20,147), **Primary** tile
  (210,195), hold the hue handle at (597,469) and drag to 640 (pink) and on to 428 (orange), back arrow (410,207). Use Checkbox,
  Switch and Linear Progress: the Slider keeps its own orange and does not follow **Primary**.
- Open menus and popups stay open while the pointer leaves them, so park the pointer off the title of a menu before typing.

## Hard limits

No sign-in, no Save, no deploy/purchase/invitation, no connecting accounts, no AI prompts unless the brief allots them
(log each in `ai-prompts.md`; none sent so far in the runs that wrote this file). Never commit. Do not edit docs pages.

## Nowa 3.13 on app.nowa.dev (wave 2a notes)

The re-takes of phase 10 come from the live playground (`NOWA_URL=https://app.nowa.dev`, version `v3.13.0-79`), not the local 3.12.5 build.

- **Loading.** Chromium needs `--proxy-server=$HTTPS_PROXY` (the proxy CA is already in the NSS db). Drop the CanvasKit CDN route of `capture.mjs`
  (its `route.fetch` does not use the proxy and the engine never starts); the editor then loads in about 40 s. Click **Reject** on the cookie
  banner (`#nowa-consent-banner button`) right after the page loads; do not pre-set the `nowa_consent` cookie. The `/playground` route ends on `/`.
- **Shared machine.** Use your own `CAPTURE_CDP_PORT` and `CAPTURE_OUT` and a scratchpad sub-folder; a script that connects without `prepareContext`
  (analytics block) and reloads sends tracking requests.
- **AI Assistant panel is broken for guests.** The playground opens on it, but the chat field's agent selector throws ("Exception: BillingProvider is not
  initialized"), so the panel shows a stretched field and a gray box, and the status bar shows that exception. For shots with the status bar: click the log
  text, then **Clear** (second icon in the Console's tab row), close the Console: the bar reads **Ready** until the AI panel is drawn again.
  Use the Library or Outline as the open panel in full-window shots.
- **3.13 coordinates (1440x900, left panel open).** Sidebar x = 20: Assistant 67, Library 107, Themes 147, Search 187, Outline 227, Api 267, Supabase 307,
  Router 365 (no Files, no Git in the playground). Top bar y = 20: starting-point chip 103, Back 396, Forward 424, Boards chip 484 (these follow the board
  area's left edge: 185, 213 and 273 with no left panel), `<>` 1313, gear 1351, **Save** 1405. Toolbar y = 847: Select 839, Shape 875, Screen 911, Text 947,
  Widget 983 (left panel closed: 668 ... 812). Dialog buttons: New Component / template naming **Submit** (765, 538), **New Board** **Submit** (765, 521).
- **Library.** The home screen's row is under `pages`; a component made with **Create component** sits at the `lib` root. The details card needs a click or
  an arrow key and stays after the pointer leaves. In add mode (Ctrl+K) the first result is highlighted without a card; one down arrow moves to the next row
  and shows the card. With `button` typed the first result is `CustomButton` (Packages), **Button** is the first Built-in row (y = 268). **Add...** only shows while the
  field is empty. Dragging a row onto the screen keeps the Library open. After a new description, click another row and back before the card shows it.
- **Pickers.** In the template picker the highlight follows the pointer, and a wheel step of `dy` scrolls `dy / 2` px. Context menus open at the pointer
  (right-click at the right of a row's label so the label stays visible); a menu stays open until you click elsewhere, so move the pointer off it in one step
  (`steps: 1`) to avoid a stray hover row.
- **Zoom and placement.** `ctrlwheel` with `dy = -100` nine times zooms the board to about 55% around the pointer. A new screen lands at the last pointer position (it landed on the home screen): set **X** and **Y**
  in **Details** (double-click, `Control+a`, type, `Enter`); home screen at X 500, Y 200, size 393 x 808.
- **Video.** `tools/video/rec.mjs` needs three patches for the live site (proxy flag in `ARGS`, remove every `flutter.*` localStorage key, click **Reject** after `goto`) and the
  CanvasKit route out of `prepareContext`, plus `NOWA_URL`; start the take on the Outline panel (not the AI panel), pan the board with
  Space + drag so the screen sits next to the panel, and move the key badge up (`#cap-key` bottom 110px) when the crop leaves out the toolbar. `design-add-widgets-video`
  is 900x784, 16.6 s: Ctrl/Cmd+K, `button`, down arrow, Enter, then a drag of the **Button** row.
