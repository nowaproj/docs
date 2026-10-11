# P12 live checks on Nowa 3.13.0 (app.nowa.dev/playground)

Run: 11 Oct 2026, signed out, playground starter app, status bar **v3.13.0-79**. Headed Chromium 141 (Playwright build 1194) on an
Xvfb display (needed for the real system clipboard), viewport 1440x900 at scale 1, plus a few headless comparison runs. No AI prompt,
no sign-in, nothing saved to an account, no Share link, nothing public. Docs pages were not edited.

Evidence: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/live12/shots/` (file names per row; each one was
opened and looked at). `H*.png` are from the headless comparison runs.

## Setup notes (test rig only, not product behaviour)

- Headed Chromium crashes at start when `TMPDIR` is a long path (its singleton socket path gets too long): the browser ran with a short
  temp dir.
- With the real X pointer inside the window, Chrome's synthetic "mouse moved" events at the real pointer position overrode the
  scripted hover (no hover state in the **Variables** tile, no context menu on a board widget). The real pointer was parked outside the
  window for the rest of the run.
- Board clicks on widgets were unreliable in both headed and headless runs: short scripted clicks (30-80 ms) often selected nothing,
  ~120-150 ms presses usually worked, and scripted double-clicks and right-clicks on a widget never registered (right-click on empty
  board did). The same happened with real X clicks. Earlier runs did select by clicking the board, so I don't report this as a product
  bug; every claim below that depends on it is marked **not verified** instead of mismatch. Selecting in the **Outline** always worked.

## Item 1: components (`docs/design/components.md`, "Use a component" and "Edit a component or one instance")

Set-up: drew a Container in the HomePage screen, added a Text through **Empty** > **+**, right-click in the **Outline** > **Create
component** > `ProductCard` > **Submit** (dialog **New Component from Write something**). Added a param (Variables > hover **Params** >
**+**), renamed it `title` in **Details** and linked the Text to it (click the **Text** label > **LOCALS** > `title`). A second
component `InfoCard` (a Container with a Column holding two Texts) was made the same way, because a component whose root has a single
child shows no children in the Outline (see row 4).

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | suggestion |
|---|---|---|---|---|
| design/components L29 | "Copy an instance and paste it" | **holds.** Ctrl+C on a selected instance puts `{"x":0,"y":0,"data":"const Positioned(... child:ProductCard(),)"}` on the clipboard; Ctrl+V over the screen adds a second `ProductCard` instance with its top-left at the pointer. On the web the **first** paste opens Chrome's prompt "app.nowa.dev wants to See text and images copied to the clipboard" (**Block** / **Allow**); nothing is pasted until **Allow**, and the paste then lands where the pointer is at that moment (mine went off-screen at L -39, T -220 because the pointer was on the prompt). | `57-paste-instance-x.png`, `58-after-allow-x.png`, `59-paste-instance-2.png` | Holds. Worth one sentence on the page (or in "Paste images, links and text", item 2): "In a browser, the first paste asks to see your clipboard: click **Allow**." |
| design/components L29 | "or hold Alt/Option and drag it" | **holds.** Alt+drag of an instance leaves the original and drops a copy (third `ProductCard` row at T 377). | `61b-alt-drag-after.png` | none |
| design/components L31 | "Instances have a purple label in the Outline." | **holds.** Instance rows are purple; the component's own board item row is white. | `54-clicklog.png`, `69-infocard-instance.png` | none |
| design/components L36 | "pick the widget in the Outline" | **holds, with an edge case.** The `InfoCard` instance row expands to its inner widgets (`Name`, `Price`) and clicking one selects it. A component whose root is a Container with a single Text (`ProductCard`) shows **no chevron** on its instance row (the Container and Text are merged into one row and the root itself isn't listed), so there is nothing to pick there. | `69-infocard-instance.png`, `70-outline-pick-name.png`, `56b-outline-zoom.png`, `56-dclick2.png` | Optional: "...or expand the instance in the Outline and pick the widget (an instance whose content is a single widget has nothing to expand: open the component instead)." |
| design/components L36 | "double-click the instance on the board to go one level deeper" | **not verified.** No double-click registered on the board in this rig (also not on ordinary nested widgets, as a control), so the instance stayed selected every time. The code does it (`designer_board_controller.dart:104-121` → `selection_manager.dart:75-95` `selectChild()` picks the next widget under the pointer). | `55-dclick-instance.png`, `72-dclick-infocard-body.png`, `73-dclick-infocard-name.png`, `79b-xdclick-name.png`, `H07-dbl.png`, controls `74b-boarditem-dclick.png`, `75-dclick-appbar.png`, `H08*` | Keep; have a person confirm with a real mouse. |
| design/components L36 | "The widget belongs to the component, so every instance updates." | **holds.** Editing the Text of `Name` inside the instance (**Details** > **Text**) changes the component's board item too. | `82-edit-inside-instance.png`, `83-fixed-newline.png` | none |
| design/components L36 | "The first crumb at the top of **Details** is the component's name. Click it to select the whole instance again." | **holds.** With `Name` picked inside the instance the crumbs read **InfoCard** > **Name**; clicking **InfoCard** selects the instance (crumbs **HomePage** > **InfoCard**). | `70-outline-pick-name.png`, `71-crumb-click.png` | none |
| design/components L37 | "Select the instance inside a screen. **Details** lists the component's params. Change them there and only this instance changes." | **holds.** The instance's Details has a **Product Card** group with a **Title** field; setting it to `Shoes` changes that instance only (the other instance and the board item keep `[title]`). | `54-clicklog.png`, `81b-title-set.png` | none |
| design/components L38 | "Right-click an instance and choose **Detach**. It turns into plain widgets" | **holds for the menu, but the result loses the param values.** **Detach** is in the instance's right-click menu (Outline; the board menu could not be opened in this rig, see setup). After **Detach** the row becomes a plain `Text`/Container, but the Text still points at `title`, so the board shows a red box **"[title] is not found"**, and the `Shoes` value set on that instance is gone. **Problems** (From Nowa) says "No issues detected". See product bug 1. | `89a-outline-instance-menu.png`, `89b-detached.png`, `90b-detached-shoes.png`, `91-problems-after-detach.png` | Until it's fixed: "Widgets linked to the component's params keep those links and show '... is not found': relink or retype them." |
| design/components L39 | "Right-click a component and choose **Copy as new widget**, name it and click **Submit**. You get a new component in its own file." | **mismatch (wording).** The item is in the right-click menu of an **instance** (board or Outline). The Library's component row menu has only **Insert**, **Open**, **Rename**, **Delete**, **Show in code**. The dialog is titled **New Copy InfoCard** (name `InfoCard1`, Class name, Path `lib/info_card1.dart`, **Cancel** / **Submit**); after **Submit** the Library lists the new `PriceCard` and a board item of it is placed at the pointer. | `96a-infocard-instance-menu.png`, `96b-copy-as-new-dialog.png`, `96c-after-copy-as-new.png`, `97-library-component-menu.png` | "Right-click an instance and choose **Copy as new widget**..." |
| design/components L47 (related) | "Hover **Params** and click **+**. Nowa adds a param called `param`. Rename it and choose its type." | **holds, but renaming in the row breaks on some letters** (product bug 2). The new param is `param`, type **String** (nullable), already in rename mode. Typing `title` there switches the board to the **Text** tool at the `t`, closes the field and leaves the name `param`; `label` works. Renaming in **Details** > **Name** works. | `25-pc-params-hover.png`, `26-param-added.png`, `33abc-rename-typing.png`, `35-rename-one-go.png`, `38b-after-enter.png`, `39b-details-renamed.png` | Until it's fixed: "Rename it in **Details** > **Name** and choose its **Type**." |

Also seen on these sections:
- The **Create component** dialog suggests the widget's text as the name (`WriteSomething`, path `lib/write_something .dart` with a
  space in the preview, as noted in earlier runs). `14-dialog-named.png`, `13-create-component-dialog.png`.
- Dragging the component from the Library onto empty board space makes a board item titled with the component's name; clicking the
  title selects it and **Details** shows the component's root widget properties (`18-component-board-item.png`, `43ab-boarditem.png`).
- A long press (about half a second) on a widget opens the widget menu (seen by accident during the Alt+drag, `61a-alt-drag-mid.png`).

## Item 2: pasting onto the board (`docs/design/add-widgets.md` "Paste images, links and text", `docs/design/assets.md` "Paste an image onto the board")

Set-up: a real PNG (240 x 160, "PASTE TEST") put on the X11 CLIPBOARD by a small helper process (xclip stand-in) on the headed browser's
display; the helper's log shows Chrome asking for `TARGETS` and then `image/png`. Links and text were served the same way as
`UTF8_STRING` / `text/plain`. Clipboard permission had been allowed at the first paste (item 1).

| page | claim (quote) | what the UI shows | evidence (scratchpad file) | suggestion |
|---|---|---|---|---|
| design/add-widgets L49 | "Copy something, point at the board and press Ctrl/Cmd + V" | **holds.** In the browser the first paste shows Chrome's "See text and images copied to the clipboard" prompt (**Block** / **Allow**); nothing happens until **Allow**. | `57-paste-instance-x.png`, `100-paste-image-empty-board.png` | Add: "The first time, your browser asks to see the clipboard: click **Allow**." |
| design/add-widgets L49 | "or right-click empty board space and choose **Paste**" | **holds.** The board menu is **Undo**, **Redo**, **Save**, **Create a page**, **Paste** (`Ctrl V`). With nothing selected the item lands at the spot you right-clicked (X 958, Y 604 for a right-click at that point). A right-click on a widget opens the widget menu, which has no **Paste**. | `88-rclick-empty-board.png`, `109b-board-menu.png`, `109c-menu-paste-nothing-selected.png` | none |
| design/add-widgets L49 | "With a widget selected, the paste goes into that widget's parent." | **holds, with a catch.** With an Image inside HomePage selected and the pointer on empty board, the paste went into HomePage, at the pointer's position measured from the screen (L 578, T 43): outside the 393-wide screen, so it is clipped and only its selection box shows. **Paste** from the board menu did the same (third Image in HomePage). | `107-paste-with-selection.png`, `107b-outline.png`, `108b-menu-paste.png` | Optional: "...the paste goes into that widget's parent, at the pointer, so point inside that parent." |
| design/add-widgets L51 | "A copied widget pastes as a copy." | **holds.** Ctrl+C on a Text puts `{"x":0,"y":0,"data":{...,"widget":"const Text('Hello from the clipboard',)"}}` on the clipboard; Ctrl+V adds a second Text with its top-left at the pointer. Same for a component instance (item 1). | `113-copy-paste-text-widget.png`, `59-paste-instance-2.png` | none |
| design/add-widgets L52 | "A copied image becomes an **Image** widget, and Nowa saves the image in `assets/`." | **holds.** An **Image** with **Source** **Asset**, **Fit** cover. On empty board it is a loose item at its pixel size (W/H Auto); over a screen it goes inside at 100 x 100 (Fixed); over a component's board item it went **inside that component** (undone). Every paste saves a **new** file: six pastes of the same picture gave six `pasted_image_*.png`, including the undone one. | `100-paste-image-empty-board.png`, `106-paste-image-into-screen.png`, `103-paste-image-in-screen.png`, `110-assets-after-pastes.png` | Optional: "Each paste adds a new file to `assets/`; delete the ones you don't use." |
| design/add-widgets L53 | "A link that starts with `http` becomes an **Image** widget that loads it." | **holds.** `https://picsum.photos/id/237/300/200` became an **Image** with **Source** **Network** and that **Url**, showing the photo. | `111-paste-link.png` | none |
| design/add-widgets L54 | "Any other text becomes a **Text** widget." | **holds.** `Hello from the clipboard` became a Text. The status bar also shows a warning "FormatException: SyntaxError: Unexpected token 'H', "Hello from"... is not valid JSON" and the warning count goes to 1 (product bug 4). | `112-paste-text.png` | none |
| design/assets L61 | "Nowa saves the image in `assets/` as `pasted_image_<id>` and places an Image widget where your pointer is." | **holds.** The Library's **Assets** group lists `pasted_image_bx0JEs.png`, details card "Asset · assets"; the widget's top-left is at the pointer (X 1028, Y 639 for a paste at that point). | `101-assets-chip.png`, `102b-asset-card-full.png`, `100-paste-image-empty-board.png` | Optional: `pasted_image_<id>.png`. |
| design/assets L61 | "or right-click the board and choose **Paste**" | **mismatch (minor).** Only a right-click on **empty** board space offers **Paste**; on a widget you get the widget menu (no **Paste**). | `88-rclick-empty-board.png`, `89a-outline-instance-menu.png` | "or right-click empty board space and choose **Paste**" (as add-widgets says). |
| design/add-widgets L52, assets L61 | "In the desktop app you can also copy image files from your file manager" | not checked (browser only). | n/a | n/a |

Also seen: with the **AI Assistant** panel open, pasting an image on the board puts it on the board only; the chip that appears in the
chat field is the usual selected-widget chip and goes away when you deselect (`114-paste-image-ai-panel-open.png`,
`115-ai-chip-after-deselect.png`).

## Product bugs found (steps, expected)

1. **Detach loses the instance's param values.** Make a component with a String param linked to a Text inside it, put an instance in a
   screen, set the param on the instance (`Shoes`), right-click the instance in the Outline > **Detach**. Seen: the plain widgets keep the
   link to the param, the board draws a red box "[title] is not found", the `Shoes` value is gone, and **Problems** (From Nowa) says
   "No issues detected". Expected: the detached widgets get the instance's values (the Text reads `Shoes`), or at least a Problems entry.
   Code: `packages/designer/lib/src/design/common_design.dart:182-192` copies `component.rootBlock` unchanged. Evidence `90b-detached-shoes.png`,
   `91-problems-after-detach.png`.
2. **Typing in the inline rename field of the Variables tile triggers board shortcuts.** Select a component (or screen), Variables >
   hover **Params** > **+** (the new `param` row opens in rename mode), type `title`. Seen: at the `t` the **Text** tool turns on, the field
   closes, the name stays `param`, the tile switches to **Globals** and **Details** shows "Instance of 'minified:csO'". Ctrl+A in the field
   selects every board item instead of the text. Names without v, r, t, f (for example `label`) work; renaming in **Details** > **Name**
   works. Expected: every key goes to the field. Code: `NRenameField` uses a plain `FocusNode`
   (`packages/nowa_ui/lib/src/components/nrename_field.dart`), while the tool shortcuts only stand down for a `FieldFocus`
   (`packages/designer/lib/src/actions/tool_actions.dart:15-17`, shortcuts in `packages/designer/lib/src/designer_setup.dart:15-50`).
   Evidence `33abc-rename-typing.png`, `35-rename-one-go.png`, `38a-typed-label.png`.
3. **Code check fails with a raw error for guests.** Playground, status bar counts > Console > **Problems** > **From Code Analysis** >
   **Run Code Check**. Seen: "Code check failed / DioException [bad response]: Unauthorized" (also in the status bar). Expected: a message
   that the code check needs an account (or the option hidden in the playground). Evidence `94-run-code-check.png`.
4. **Pasting plain text logs a JSON error.** Put any text that isn't a link on the clipboard, point at the board, Ctrl+V. The Text widget
   is added, but the status bar shows the warning "FormatException: SyntaxError: Unexpected token 'H', "Hello from"... is not valid JSON"
   and the warning count goes up. Expected: no warning (plain text is a normal case). Code: `packages/designer/lib/src/design/copy_paste.dart:157-168`
   tries to read every text as copied-widget JSON and logs the failure. Evidence `112-paste-text.png`.

