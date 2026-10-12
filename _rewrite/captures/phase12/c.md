# Phase 12, worker c (2026-10-11): optional videos

Rows: design-select-and-edit-1, logic-events-2. Live Nowa 3.13.0-79 playground at `https://app.nowa.dev/playground`,
signed out. Work area: CDP 9443, scratchpad `cap12c/` (no Xvfb needed: headless Chromium). No AI prompts, no sign-in.

## Captured

| id | file | alt text | checked |
|---|---|---|---|
| design-select-and-edit-1 | /videos/docs/design/design-select-and-edit-1.mp4 | A blue Container dragged slowly across a gray one inside the home screen's main Stack: the stack is outlined in purple, and purple guides appear when the blue box lines up with the stack's center line and with the gray box's edges and center, even while it sits on top of the gray box. It is dropped next to the gray box with their top edges lined up (15 s, no audio). | yes (3.13.0) |
| logic-events-2 | /videos/docs/logic/logic-events-2.mp4 | Edit next to On Pressed opens Circuit; the plus under the onPressed node opens All nodes for this circuit, snack is typed and Show snackbar under GLOBALS is clicked, then the brush next to Content opens a Text popup where Hello World is replaced with Saved!. Circuit is closed, Play is clicked in the screen's title bar, and a tap on the button shows the Saved! snackbar at the bottom of the playing screen (19 s, no audio). | yes (3.13.0) |

Value: the select-and-edit page's only image is the right-click menu, and the events page's only image is the On Pressed row in
Details, so both videos show something new (snapping in a Stack; the whole example from Edit to the snackbar in Play).

## Not taken

None: both rows were taken.

| id | status |
|---|---|

## Live check

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| docs/design/select-and-edit.md | Where a dragged widget lands, Stack row: "It is placed where you drop it, on top of the others." | A widget moved to a new spot inside the same Stack keeps its stacking order: the gray box (first child) dragged across the blue one sits behind it once deselected. While it is selected it is drawn on top, which hides this. Not checked: a widget dropped into the stack from elsewhere. | "It is placed where you drop it. The stack is outlined in purple." Optionally add: "A widget moved inside the same stack keeps its place in the stacking order: use Bring to front to put it on top." |
| docs/design/select-and-edit.md | Move widgets: "Hold Shift while dragging to move along one axis only." | The drag does lock to one axis, but on release the widget is no longer in its screen: it lands as a separate board item (the Outline lists a Container next to HomePage, and Details shows X and Y instead of L and T). This happened both with Shift held from the press and with Shift pressed mid-drag. Plain drags and Alt drags keep the widget in the stack. | Product bug: report it. Until it is fixed, add a caution such as "In Nowa 3.13 a Shift drag also takes the widget out of its screen and onto the board. Press Ctrl/Cmd + Z, or use Shift + arrow keys (10 px steps) to move it along one axis." |
| docs/design/select-and-edit.md | Move widgets: "Drag a widget. You don't need to select it first." | True, but if the mouse button is held still on a widget for about half a second, its right-click menu opens (long press), even if the pointer moves afterwards. | Optional: "Start moving right away: holding the mouse button still on a widget for about half a second opens its right-click menu." |
| docs/design/select-and-edit.md | Snapping and guides, Alt copy, arrow nudge | No mismatch. While dragging, the stack gets a purple outline. Purple guides show the stack's center line and the sibling's edges and center, and the sibling it lines up with gets a purple outline too. Alt + drag leaves the original and drops a copy inside the stack. The right arrow moves a free widget 1 px (L 40 to 41) and Shift + right arrow 10 px (to 51). The right-click menu entries and keys match the table. | None. |
| docs/logic/events.md | Example, step 4: "In Details, click the brush next to Content and change the text, which starts as "Hello World". For example, write Saved!." | The node's Details is the panel inside Circuit, to the right of the canvas. The brush opens a small Text popup (Text, Text Align, Text Direction, Overflow, Style), and one click in its Text field selects Hello World. Enter does not confirm: it adds a line break to the message (the field grows by a line). Esc or a click outside closes the popup and keeps the text. With the popup open, the first click on Circuit's × only closes the popup. | "In the Details panel inside Circuit, click the brush next to Content. In the Text popup, click the Text field (Hello World gets selected) and type your message, for example Saved!. Press Esc or click outside to close the popup. Don't press Enter: it adds a line break." |
| docs/logic/events.md | Example, step 3: "Search for snack, or open GLOBALS, and click Show snackbar." | Correct. With no search text, GLOBALS is near the bottom of All nodes for this circuit, after OPERATORS and LOCALS and about 20 library groups, so it takes some scrolling. | Minor: "Search for snack, or scroll down and open GLOBALS, and click Show snackbar." |
| docs/logic/events.md | Example, step 5: "Close Circuit. Click Play in the screen's title bar and tap the button." | Correct. Play (▶, tooltip Play) appears next to the screen's name only while the pointer is on the title. Then the board zooms to fit the playing screen, a bar reading This screen is capturing scroll with a stop button appears, and the snackbar shows at the bottom of the screen. | Minor: "Point at the screen's title and click Play (▶) next to its name, then tap the button." |
| docs/logic/events.md | Add logic to an event, steps 1 to 4, and the orange node | No mismatch. A new Button's On Pressed reads Edit with a bolt, and On Long Press reads +. Circuit opens titled onPressed, with the orange onPressed node and ElevatedButton under it, and × closes it. The node menu is titled All nodes for this circuit, and the new node reads showSnackBar, with Content (Hello World), Background Color, Width, Elevation, Shape, Show advanced options and Store result. | None. |

## How the videos were made

- Tools: `cap12c/vid/rec.mjs`, which is the live-site `rec.mjs` from wave 2a with these changes: the proxy flag, every `flutter.*` key
  removed, Reject on the cookie banner, the toolbar icon check, and three new options (`openOptions.boardView` and
  `openOptions.readyPoint` in a scenario, and `--speed`). `cap12c/vid/lib.mjs` is the wave-2b version (it hovers before each tap).
  Scenarios: `cap12c/vid/sel.mjs` and `cap12c/vid/events.mjs`. Re-timing: `cap12c/vid/retime.py`. All of them are in the scratchpad.
- design-select-and-edit-1: crop `170,45,456,680`, 456x680, trimmed to 15.0 s with a stream copy, real speed. The board view is set
  in localStorage before the load (`flutter.listBoardViewStatus` =
  `["{\"projectId\":\"playground\",\"boardViews\":[{\"fileName\":\"first.board\",\"zoom\":0.75,\"x\":-165,\"y\":-112}]}"]`, where x and y
  are relative to the board area's top left), so the whole screen fits at 75% with no wheel zoom.
- logic-events-2: crop `300,42,1140,836`, 1140x836. The 1x take is 31.0 s, because the headless, software-rendered editor answers
  slowly: each key in the node search reruns the filter (0.2-1.5 s per key), Esc on the Text popup takes about 1 s, and the Play zoom
  runs about 4.5 s under recording. `retime.py` plays those stretches faster in one encode (typing `snack`, typing `Saved!` and the
  zoom at 2.5x, the stall after typing at 2x) and the rest at 1.32x, which gives 19.0 s. The clip has no "sped up" label, since only the
  slow rendering was compressed. It is still a little over the requested "about 15 s", but under the 20 s limit.
- Gotchas found:
  - Long press: if the mouse button stays still on a widget, its right-click menu opens after about 0.5 s. A press on an unselected
    widget stalls the page while Details rebuilds, so the long press can fire even when the pointer moves at once. Select the widget
    first, and make the first move event 20+ px.
  - Drag offset: a dragged widget moves by (pointer minus the first move event), not from the press point.
  - First drag: the first drag on a fresh board stalls about 2 s when it starts, so do one drag in the setup.
  - Ctrl/Cmd + Z did not undo a drag after typing in a Details field, probably because the field kept focus.
  - Play in the title chip only appears and takes the click after the pointer has been on the screen's name. Gliding straight onto
    the ▶ from empty board hits nothing.
  - Enter in the Text popup's field adds a line break. One click in that field selects all of its text.
  - The playing screen's frame settles at x 585-587 and y 144 (orange 255,171,63). The snackbar is black at (650, 756).
