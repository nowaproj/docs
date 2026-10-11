# P12 live checks, round 2, on Nowa 3.13.0 (app.nowa.dev/playground)

Run: 11 Oct 2026, signed out, playground starter app, status bar **v3.13.0-79**. Headed Chromium 141 (Playwright build 1194) on Xvfb
display `:105`, viewport 1440x900 at scale 1, CDP port 9445. No AI prompt, no sign-in, nothing saved to an account, no Share link,
nothing public. Docs pages were not edited.

Evidence: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/live12b/shots/` (file names per row; each one
was opened and looked at).

## Setup notes (test rig only, not product behaviour)

- Same rig as `P12-live-checks.md`: short `TMPDIR` for Chrome, the real X pointer parked outside the window (1590, 1075) between
  actions, page content at X offset (+10, +149) for xdotool.
- **Board double-clicks now register.** The board feeds its own double-tap detector from `onTapDown` (`core/.../board/board.dart:95-97`,
  `nowa_ui/.../nowa_widgets.dart:16-38`: the second tap-down must come within 300 ms and `kDoubleTapSlop`). In this rig a press shorter
  than ~100 ms on a widget selects nothing (on empty board it does deselect), and with longer presses the tap-down fires at the 100 ms
  deadline, so xdotool double-clicks (process start-up between the four events) arrive too late. A scripted CDP double-click with two
  110 ms presses and a 30 ms gap works every time (control: it put the Text "Shoes" into in-place editing, `104-pw-dclick-text-110.png`).
  Last run's "not verified" double-click rows can be re-checked this way.
- A right-click on a Text-based widget on the board (Text, a component whose root is a Text) opened no menu, neither scripted nor with a
  real X button; the **Outline** menu was used.

## Item 1: Add Route in the Router panel (`docs/logic/navigation.md` L30, `docs/logic/router.md` L22)

Set-up: fresh playground starter app. A second screen `SettingsPage` from **Screen** tool > **Empty Page** > **Submit**, then its
automatic route `/settings-page` deleted in the Router panel (right-click > **Delete route** > **Remove**), so the screen had no route.
`/home-page` was selected before **Add Route**, to see what gets selected.

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | holds / mismatch | exact replacement text if mismatch |
|---|---|---|---|---|---|
| logic/navigation L30, logic/router L22 | "click **+** (**Add Route**) and choose **Route**" | The **+** next to the gear in the **Routes** header has the tooltip **Add Route** and opens a menu titled **Add Route** with one item, **Route** ("A simple route that displays a single screen. e.g. /home, /profile, /settings"). Choosing it adds a row `/` at the end of the list. | `02-add-route-tip.png`, `03-add-route-menu.png`, `16-after-add-route.png` | holds | none |
| logic/navigation L30, logic/router L22 | "Select the new `/` route" | Needed: after **Add Route** the route that was selected (`/home-page`) stays selected and its settings stay on the right. The new row reads `/` and already shows **HomePage** on its right: a new route starts on the home screen (`router_file_service.dart:265-266`, `screen ??= initialScreen ?? $Scaffold`). One click on the row selects it: **Type** Route, **Full Path** `/`, **Path** `/`, **Screen** `HomePage`. | `15-home-route-selected.png`, `16-after-add-route.png`, `17-new-route-selected.png` | holds | none (optional, after "Select the new `/` route": "It opens your home screen until you pick another.") |
| logic/navigation L30, logic/router L22 | "type its **Path**" / "set its **Path**" | Clicking **Path**, Ctrl+A and typing `/settings` keeps every `/`; after Enter the list row reads `/settings`. **Full Path** and the small path above **Type** still read `/` until the next change (they showed `/settings` after the screen was picked): cosmetic, see product bug 1. | `18-path-typed.png`, `19-path-entered.png` | holds | none |
| logic/navigation L30, logic/router L22 | "click the name next to **Screen** to pick the screen" / "pick its screen from the name next to **Screen**" | The **Screen** label is plain text; the chip next to it (`HomePage`, phone icon) opens the widget picker ("Search for a widget", **Request a Widget**, Search for: All / BuiltIn / **Components**, the last one on) listing `HomePage` and `SettingsPage`. Clicking `SettingsPage` sets it: the row reads `/settings` → SettingsPage, **Full Path** `/settings`. On the board, SettingsPage's **Details** > **Route Settings** > **Path** reads `/settings`. | `20-screen-picker.png`, `21-screen-picked.png`, `24-settingspage-details.png` | holds | none |
| logic/navigation L22 (related) | "A new screen from the **Empty Page** template gets one automatically: its name in lowercase with hyphens" | `SettingsPage` got `/settings-page` → SettingsPage. | `11-router-two-routes.png` | holds | none |
| logic/router L24 (related) | "Right-click a route and choose **Delete route**. A **Remove Route** dialog warns that the route's child routes go too." | Menu item **Delete route** (red); dialog **Remove Route**: "Are you sure you want to remove this route? This will also remove all of its child routes." **Cancel** / **Remove**. | `12-route-rclick.png`, `13-remove-route-dialog.png`, `14-route-removed.png` | holds | none |

## Item 2: Detach (`docs/troubleshooting/known-issues.md` L73-75, "Detach loses an instance's param values")

Set-up: in HomePage a Text (Text tool) turned into a component with the **Create a component** icon at the top of **Details**
(`ProductCard`, dialog **New Component from Write something**, **Submit**). In the component (**Open in New Tab**): Variables > hover
**Params** > **+**, renamed `title` in **Details** > **Name** (type **String**), the Text's **Text** label > **LOCALS** > `title`. Back in
HomePage the instance's **Title** set to `Shoes` (board shows "Shoes"). Then right-click on the instance row in the **Outline** > **Detach**.

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | holds / mismatch | exact replacement text if mismatch |
|---|---|---|---|---|---|
| troubleshooting/known-issues L75 | "When you detach a component instance, the plain widgets still point at the component's params, and the values you gave that instance are lost." | After **Detach** the purple `ProductCard` row becomes a plain `Text` row; **Details** shows **Text** = `title` in red (still a link), and `Shoes` is gone. | `45-title-shoes.png`, `48-outline-rclick-instance.png`, `49-after-detach.png` | holds | none |
| troubleshooting/known-issues L75 | "The board shows a red box such as "[title] is not found", while **Problems** lists nothing." | A large red box with "[title] is not fo..." (cut off by the Details panel; the full text "[title] is not found" was seen last run). **Problems** > **From Nowa**: "No issues detected"; the status bar counts stay 0 / 0 / 0. | `49-after-detach.png`, `50-problems-after-detach.png` | holds | none |
| troubleshooting/known-issues L75 | "Afterwards, click each broken property's name, choose **Detach...** and type the value again, or link it to something else." | **Works.** Clicking the **Text** label opens **Link Text** (String) with Custom Expression..., **Detach...** (red), Create Param..., Create Variable..., Compute..., Edit, LOCALS, GLOBALS, EXPRESSIONS (before the link there was no **Detach...**). **Detach...** removes the link and leaves the field **empty**; the red box goes away. Typing `Shoes` in **Text** brings the value back (row and crumb read `Shoes`). The **Text** box of a Text widget is multi-line, so Enter adds a line break: click outside the field instead. "Link it to something else" not tried (the same menu lists LOCALS / GLOBALS). | `51-link-menu-detach.png`, `52-after-field-detach.png`, `53-retyped-shoes.png`, `54-retyped-final.png` | holds | none (optional: "...choose **Detach...**, which empties the field, and type the value again...") |
| design/components L38 (related) | "Right-click an instance and choose **Detach**." | **Detach** is in the instance's right-click menu in the **Outline** (Play, Remove, Replace with..., Group, Copy, Cut, Bring to front, Bring forward, Send backward, Send to back, Create component, **Detach**, Copy as new widget, Export as image...). On the board, neither a scripted nor a real X right-click on this Text-based instance opened a menu (the capture notes say Text-based widgets take canvas clicks themselves), so the board menu stays unverified for a Text-rooted instance. | `48-outline-rclick-instance.png`, `46-board-rclick-instance.png`, `47-xrclick-instance.png` | holds (Outline) | none |

## Item 3: pasting text with `/` into Web View **Url**, Html and Markdown **Data** (`docs/reference/widgets/media.md` L87, L99)

Set-up: in `SettingsPage`, a **Web View**, an **Html** and a **Markdown** added with Ctrl+K (search, Enter). Text was put on the real X11
clipboard by a helper process on the browser's display (its log shows Chrome asking for `UTF8_STRING`); in the field: click, Ctrl+A,
Ctrl+V. No clipboard prompt appeared for these pastes (they go into the text field, not onto the board).

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | holds / mismatch | exact replacement text if mismatch |
|---|---|---|---|---|---|
| reference/widgets/media L87 | "Add a **Web View** and set the address in **Url**. It starts at `https://nowa.dev`." / "in Nowa 3.13 a `/` you type in **Details** is dropped" | **Url** starts at `https://nowa.dev`. Typing `/abc` at the end gave `https://nowa.devabc` (the `/` dropped). | `56-webview-added.png`, `57-url-typed-slash.png` | holds | none |
| reference/widgets/media L87 | "Paste the address rather than typing it" | **Works.** Pasting `https://example.com/docs/a/b/index.html?x=1` kept all six `/`: the field shows the start and end of it, the board stand-in reads "Web view to https://example.c... x=1", and the code view has `NowaWebView(url: 'https://example.com/docs/a/b/index.html?x=1',)`. | `58-url-pasted.png`, `59b-url-home.png`, `60-code-view.png`, `60b-code-url-zoom.png` | holds | none |
| reference/widgets/media L91, L99 | Html "starts as `<h1>Hello World</h1>`" / "In Nowa 3.13 a `/` you type in either box is dropped, so paste text that has one, such as an HTML closing tag or a link." | **Html:** **Data** starts as `<h1>Hello World</h1>`. Typing `<b>x</b>` at the end gave `<b>x<b>`. Pasting `<p>See <a href="https://example.com/a/b">this</a></p>` over it kept all six `/`: the board renders "See this" with a link, and the code has `Html(data: '<p>See <a href="https://example.com/a/b">this</a></p>', shrinkWrap: true,)`. | `63-html-added.png`, `64-html-typed-slash.png`, `65b-html-after-commit.png`, `65c-html-data-zoom.png`, `70-code-view-all.png` | holds | none |
| reference/widgets/media L97, L99 | Markdown "starts as `# Hello World`" / the same `/` sentence | **Markdown:** **Data** starts as `# Hello World`. Typing ` a/b` at the end gave `ab`. Pasting `[Docs](https://example.com/docs/a/b) and 1/2` over it kept all six `/`: the board renders "Docs and 1/2" (Docs as a link), and the code has `Markdown('[Docs](https://example.com/docs/a/b) and 1/2')`. | `67-markdown-added.png`, `68-md-typed-slash.png`, `69b-md-after-commit.png`, `69c-md-data-zoom.png`, `70-code-view-all.png` | holds | none |
| reference/widgets/media L93 (related) | "Nowa doesn't show **Add Missing Dependencies** for it" | Html added with Enter: no dialog; the code imports `package:flutter_html/flutter_html.dart` and the error count went from 0 to 1. | `63-html-added.png`, `70-code-view-all.png` | holds | none |

Also seen: Markdown's **Details** has a **Shrink Wrap** switch (on) next to **Selectable**, which the Markdown paragraph doesn't mention
(`67-markdown-added.png`). The Data boxes are multi-line, so Enter adds a line break there; clicking outside commits.

## Item 4: dragging a Text and a Button across the app bar (`docs/troubleshooting/known-issues.md` L77-79)

Set-up: HomePage of the starter app (app bar "Home Page"). The Text `Shoes` (L 78, T 83, W/H **Auto**) and a **Button** from the Library
(L 67.89, T 263, W **Auto**, H 40 **Fixed**), each selected in the **Outline** first. Each was dragged with a real button press from its
spot up over the app bar's title zone and then either back down into the body or out above the screen onto the board; a drag that
avoids the app bar was the control. Every drop was undone with Ctrl+Z before the next one. A Container (160 x 100) was re-tried for
comparison.

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | holds / mismatch | exact replacement text if mismatch |
|---|---|---|---|---|---|
| troubleshooting/known-issues L79 | "When you drag a widget in a screen over the screen's app bar, the app bar takes it in while your pointer is there." | Holds for both. With the pointer over the title zone, the Text (and the Button) is drawn as the app bar's title, the app bar's leading / title / actions boxes show, its row leaves the Outline, and **Details** shows **Layout** with only a **+**. | `77-shoes-drag-via-1.png`, `80-shoes-drag2-via-1.png`, `85-button-drag-via-1.png` | holds | none |
| troubleshooting/known-issues L79 | "If you carry on and drop it in the body or on the board, it can land as a thin line with a height of 0." | **Not for a Text or a Button.** They keep the size they had in the app bar, as **Fixed** values, and still look normal. Text into the body: L 92.76, T 167, **W 60.71 Fixed, H 28 Fixed** (was Auto / Auto); onto the board: X 607, Y 103, same 60.71 x 28. Button into the body: L 78, T 165, **W 89.75 Fixed, H 32 Fixed** (was W Auto, H 40), so 8 px shorter; onto the board: X 582, Y 101, same 89.75 x 32. Control drags that avoid the app bar keep the original sizing (Text W/H Auto at X 460, Y 98; Button W Auto, H 40 at X 433, Y 89). The Container still lands as a line: **W 361, H 0** at L 32.76, T 140. | `78-shoes-after-drag.png`, `81-shoes-after-drag2.png`, `83-shoes-control-drag.png`, `86-button-after-drag.png`, `89-button-after-drag2.png`, `91-button-control-drag.png`, `92-container-drawn.png`, `93-container-after-drag.png` | mismatch (only true for a sized box like a Container) | "If you carry on and drop it in the body or on the board, it keeps the size it had in the app bar: a Container can land as a thin line with a height of 0, and a Text or a Button gets a fixed width and height (a Button came out 8 px shorter)." |
| troubleshooting/known-issues L79 | "Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> to undo the drop, and keep the pointer off the app bar while you drag." | One Ctrl+Z after each drop restored the widget, its place in the Outline and its sizing (Text L 78, T 83, Auto; Button L 67.89, T 263, W Auto, H 40; Container 160 x 100). | `79-shoes-undo1.png`, `82-shoes-undo2.png`, `87-button-undo1.png`, `90-button-undo2.png`, `93b-container-undo.png` | holds | none |

The title of the entry ("A widget dragged across the app bar can land squashed") still fits the Container case; with the replacement
sentence above it could read "...can land with the wrong size".

## Item 5: double-click an instance to go one level deeper (`docs/design/components.md` L36)

Set-up: in HomePage, a Container (160 x 100) with a Text inside (**Empty** > **+** > **Text**), turned into the component `InfoCard` with
the **Create a component** icon (**Submit**); its instance replaced the Container (purple `InfoCard` row, nothing to expand). Double-clicks
were scripted CDP presses of 110 ms with a 30 ms gap (see setup notes).

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | holds / mismatch | exact replacement text if mismatch |
|---|---|---|---|---|---|
| design/components L36 | "double-click the instance on the board to go one level deeper" | **Holds once the instance is selected.** With the instance selected (crumbs **HomePage** > **InfoCard**), a double-click on it selects the widget inside: **Details** switches to "Write something" (the component's Container with its Text: an **Info Card** group, **Text** and **Container** sections, **Layout** with only **+**) and the Outline row loses its highlight. Repeatable. A further double-click on its text starts in-place text editing. With nothing selected, a double-click only selects the instance (the levels count from the current selection), as the code says (`designer_board_controller.dart:103-121`, `selection_manager.dart:73-95`). xdotool double-clicks and short scripted ones did nothing (rig, see setup notes). | `105-instance-selected.png`, `106-instance-dclick.png`, `112-dclick-again.png`, `113-dclick-text-inside.png`, `111-dclick-from-nothing.png`, `99-pw-dclick.png`, `100-xd-dclick.png`, `102-xd-dclick-110.png` | holds | none (optional: "select the instance, then double-click it to go one level deeper") |
| design/components L36 | "The first crumb at the top of **Details** is the component's name. Click it to select the whole instance again." | **Not after a double-click into the instance.** The double-click selects the component's top widget, and **Details** then has **no crumb row** at all: `SelectionBreadcrumbs` returns nothing for a widget without a parent (`widget_details.dart:316-317`), which the top widget of a component is. A single click on the instance or Esc keeps the inner widget selected; clicking the instance's row in the **Outline** selects the whole instance again (crumbs **HomePage** > **InfoCard**). Widgets further down do get crumbs that start with the component's name (code `:323-336`, and seen last run with `InfoCard` > `Name`). | `106b-details-top-zoom.png`, `105b-details-top-zoom.png`, `107a-click-after-drill.png`, `107b-esc-after-drill.png`, `114-outline-row-back.png` | mismatch (for the component's top widget) | "Below the component's top widget, the first crumb at the top of **Details** is the component's name: click it to select the whole instance again. The top widget has no crumbs: click the instance's row in the [Outline](outline.md) instead." |

(items follow)
