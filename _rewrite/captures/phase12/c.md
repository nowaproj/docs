# Phase 12, worker c (2026-10-11): optional videos

Rows: design-select-and-edit-1, logic-events-2. Live Nowa 3.13.0-79 playground at `https://app.nowa.dev/playground`,
signed out. Work area: CDP 9443, scratchpad `cap12c/` (no Xvfb needed: headless Chromium).

## Captured

| id | file | alt text | checked |
|---|---|---|---|
| design-select-and-edit-1 | /videos/docs/design/design-select-and-edit-1.mp4 | A blue Container dragged slowly across a gray one inside the home screen's main Stack: the stack is outlined in purple, and purple guides appear when the blue box lines up with the stack's center line and with the gray box's edges and center, even while it sits on top of the gray box. It is dropped next to the gray box with their top edges lined up (15 s, no audio). | yes (3.13.0) |
| logic-events-2 | /videos/docs/logic/logic-events-2.mp4 | Edit next to On Pressed opens Circuit; the plus under the onPressed node opens All nodes for this circuit, snack is typed and Show snackbar under GLOBALS is clicked, then the brush next to Content opens a Text popup where Hello World is replaced with Saved!. Circuit is closed, Play is clicked in the screen's title bar, and a tap on the button shows the Saved! snackbar at the bottom of the playing screen (19 s, no audio). | yes (3.13.0) |

## Not taken

| id | status |
|---|---|

## Live check

| page | claim | what the UI shows | suggestion |
|---|---|---|---|

## How the videos were made

- design-select-and-edit-1: `cap12c/vid/rec.mjs` (the live-site `rec.mjs` with the proxy flag, every `flutter.*` key removed, Reject on the
  cookie banner, the toolbar icon check, plus an optional stored board view) and scenario `cap12c/vid/sel.mjs`, crop `170,45,456,680`,
  trimmed to 15.0 s with a stream copy. The board view is preset in localStorage before the load
  (`flutter.listBoardViewStatus` = `["{\"projectId\":\"playground\",\"boardViews\":[{\"fileName\":\"first.board\",\"zoom\":0.75,\"x\":-165,\"y\":-112}]}"]`;
  x and y are relative to the board area's top left), so the whole screen fits at 75% with no wheel zoom.
- Gotchas found: a press that stays still on a widget opens the right-click menu after about 0.5 s (long press). A press on an
  unselected widget stalls the page while Details rebuilds, so the long press can fire even when the pointer moves at once: select the
  widget first and make the first move event 20+ px. The dragged widget moves by (pointer minus the first move event), not from the
  press point. The first drag on a fresh board stalls about 2 s when it starts: do one drag in the setup.
