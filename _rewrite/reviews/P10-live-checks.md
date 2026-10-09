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

## Item 1: drag a Built-in widget whose package is missing, versus Insert

The starter app has only `nowa_runtime`, `provider`, `shared_preferences`, `dio` and `go_router`, so Lottie, Google Maps and SVG all miss their package.

What I did and saw (all on the Starter app's home screen, nothing added to the pubspec):

| Path | Result | Evidence |
|---|---|---|
| Search `lottie` in the Library, **drag** the **Lottie** row (Built-in, "Animations") onto the Home Page screen | **Drops at once. No prompt, no dialog.** The Lottie animation plays on the board. Details shows a **Dependencies** section with an info icon, a **Hot Fix** button and "Packages: lottie". The status bar error count goes 0 to 1. **Problems** (status bar count, Console, source "From Nowa") lists group **Packages (1)**: `'lottie' is imported but is not in the pubspec.` with a **Fix** button. | `05-lottie-dropped.png`, `06-lottie-problems.png` |
| **Drag** **Google Maps** (Built-in, "Integrations") onto the home screen | Same: drops, a 400 x 400 placeholder card "Google Maps / Run to preview" is placed, no prompt. Problems: `'google_maps_flutter' is imported but is not in the pubspec.` with **Fix**. | `13-googlemaps-dropped.png`, `14-googlemaps-problems.png` |
| **Drag** **SVG** (Built-in, "Images") onto empty board space (outside any screen) | Drops as a loose widget "SVG Image" (X 188, Y 429, 100 x 100) showing the Nowa logo. No prompt, 0 errors (a loose widget lives only in the board file). | `16-svg-dropped-on-empty-board.png` |
| Right-click the **Lottie** row, **Insert** | Dialog **Add Missing Dependencies**: "This widget requires the following dependencies", one bullet `Add package "lottie" to pubspec.yaml (version: ^3.3.2)`, buttons **Cancel** and **Add**. Nothing is placed until **Add** is clicked. I clicked **Cancel**: nothing was placed (`11-lottie-insert-cancelled.png`). | `09-lottie-row-context-menu.png`, `10-lottie-insert-result.png` |
| Ctrl+K (field reads **Add...**), type `lottie`, **Enter** | The same **Add Missing Dependencies** dialog. **Cancel** clicked. | `19-enter-in-add-mode-lottie.png` |
| Ctrl+K (**Add...**), then **double-click** a row (Lottie, Text, and the project's HomePage) | **No dialog and nothing inserted.** Text: no Text appears on the board. HomePage: the screen opens on its own (the board gives way to the screen, the top bar shows **Boards** > **HomePage**), and the search hint is back to **Go to...**. See item 2 for the cause. | `21-dblclick-in-add-mode-lottie.png`, `23-dblclick-text-in-add-mode.png`, `30b-dblclick-homepage-in-add-mode.png` |
| Recent list | After the three drops (and no Insert), Ctrl+K shows **Recent**: SVG, Google Maps, Lottie. A drop counts as "added to the board" for Recent. | `18-ctrl-k-add-mode.png` |

Also seen: the details card of the Lottie row (click) shows a live preview, "Lottie", "Widget · Animations" and "A widget allows seamless integration of Lottie animations, which are vector animations in JSON format or links". No **Dependencies** list, no **Open Documentation** link (`04-lottie-details-card.png`).

Confirms:
- `design/add-widgets.md` L29: "To have Nowa ask first, add such a widget with Enter or Insert rather than by dragging." Correct: a drop does not ask. The page still does not say what a drop does. What the user sees: the widget drops, the board shows it, **Problems** reports `'<package>' is imported but is not in the pubspec.` with **Fix**, and **Details** has **Dependencies** > **Hot Fix**. A sentence is worth adding.
- `design/add-widgets.md` L29 and `reference/widgets/index.md` L17: "Nowa opens **Add Missing Dependencies** when you add one with Enter or Insert". Confirmed for **Insert** (right-click) and **Enter** in add mode.
- `design/library.md` L64: "If a widget needs a package your project doesn't have yet, **Insert** first opens **Add Missing Dependencies**." Confirmed. The dialog text and the button names match.
- `reference/widgets/index.md` L26-27: "The Library's details card shows a preview, the name and the first lines of the description, but no **Dependencies** list or **Open Documentation** link." Confirmed.

CONTRADICTS:
- `design/add-widgets.md` L29: "adding the widget with <kbd>Enter</kbd>, **a double-click** or **Insert** opens **Add Missing Dependencies**". A double-click does not insert (see above and item 2). Drop "a double-click" there.
- `design/add-widgets.md` L15 (step 4): "Press <kbd>Enter</kbd>, or double-click the result. The widget lands where your pointer last was". A double-click in add mode opens (or does nothing) and ends add mode; it does not add.
- `design/library.md` L58: "Double-click a row while the search reads **Add...**." (listed under "You can also" add something). Same.

## Item 2: Library keyboard

All with the Starter app; the Library on **Go to...** (default) or **Add...** (after Ctrl+K). Screenshots are 1440x900 CSS px.

| Question | What I did | What I saw | Evidence |
|---|---|---|---|
| **Delete** with a row selected | Clicked the **HomePage** row (card opens, row highlighted), pressed Delete, then Backspace | **Nothing.** No dialog, no snackbar, the row, the card and the board stay as they were. | `40a-row-selected-homepage.png`, `43a-delete-on-homepage-row.png`, `43b-backspace-on-homepage-row.png` |
| **Esc** on a row | Search `lot`, Ctrl+K add mode, **↓** to a result (card opens), **Esc** | First Esc: the details card goes away, the row stays highlighted, the search text stays. A second Esc on the row: nothing visible. | `44b-esc-test-arrowdown-card.png`, `44c-esc-1.png`, `44d-esc-2.png` |
| **Esc** in the search field | Focus in the search with `lotr` typed, **Esc**, **Esc** | First Esc clears the text (field reads **Add...** again if add mode was on; **Recent** and **Project** come back). Second Esc on the empty field hands the keys to the board: the hint returns to **Go to...**, the field loses its focus ring, and pressing `r` then switches the toolbar to **Shape** (before that, `r` was typed into the field). | `46a-esc-in-search-clears.png`, `46b-esc-in-empty-search.png`, `46c-r-after-leave.png` |
| Esc with the card open **and** the search focused | Click a row (card opens), click the search field, type `zz`, Esc, Esc | Esc 1 clears the search, Esc 2 gives the keys to the board; **the card stays open both times** (it only closes with Esc on a row, or when the pointer leaves the panel). So there is no single card, then search, then board chain: it depends on where the focus is. | `47a-card-and-search-focus.png`, `47b-esc-1.png`, `47c-esc-2.png`, `48b-pointer-left-panel.png` |
| Card follows the pointer | Card open, hover another row | The card switches to the hovered row at once (SVG preview with the Nowa logo); it closes when the pointer leaves the panel. | `48a-hover-svg-row.png` |
| **Ctrl+Enter** in the search field, **Go to...** mode | Click the field, type `text` (first result **Text**), Ctrl+Enter | **Inserts** the first result (a Text "Write something") on the screen at the last pointer spot. Delete then removes it, so the keys are back on the board. | `50a-goto-mode-text-typed.png`, `50b-goto-mode-ctrl-enter.png`, `50c-delete-after-ctrl-enter-insert.png` |
| **Ctrl+Enter** in the search field, **Add...** mode | Ctrl+K, type `home` (one result, **HomePage** under **Project**), Ctrl+Enter | **Opens** it: the screen opens on its own (top bar: **Boards** > **HomePage**). | `51a-add-mode-home-typed.png`, `51b-add-mode-ctrl-enter.png` |
| **Enter** in **Go to...** | Ctrl+O from the board (field gets the focus, hint **Go to...**), type `home`, Enter | Opens HomePage on its own. | `52a-ctrl-o-from-board.png`, `52b-goto-enter-opens.png` |
| **Enter** in **Add...** after **↓** | Ctrl+K, `text`, **↓** (second result **Text Field**), Enter | Inserts a TextField at the last pointer spot; Delete then removes it (keys back on the board). | `80a-add-mode-arrowdown.png`, `80b-enter-on-row-in-add-mode.png`, `80c-delete-after-enter-insert.png` |
| **Ctrl+Enter** on a focused row (Go to...) | Click the **Text** row, Ctrl+Enter | Inserts a Text at the last pointer spot; Delete removes it. | `81a-ctrl-enter-on-row.png`, `81b-delete-after-row-ctrl-enter.png` |
| **Typing while a row is focused** | Click the HomePage row, press `b`, then `u`, then `t`, 2 s apart; and `button` typed at 40 ms per key | The first key jumps into the search (field focused, `b` shown), **but it is shown selected**, so the next key replaces it: `u`, then `ut`. Typing `button` quickly leaves **`utton`** in the field. The first character is lost every time. | `41-combined.png` (`41b-after-b.png`, `41c-after-u.png`, `41d-after-t.png`), `42b-after-fast-typing-button.png` |
| **↑** from the results | In add mode with results, ↑ from the second result, ↑ again | The first ↑ goes to the first result, the second to the **group heading** (**Built-in**), a third goes to the search. The page says "↑ on the first row goes back". | `45-combined.png` |
| **Ctrl+K while a row has the focus** | Click any row (Text, Lottie in Recent), press Ctrl+K | **Nothing happens** (search not focused, hint unchanged). Ctrl+K works after clicking empty board space or after an insert. (Ctrl+K is a designer shortcut; the side panel is outside it.) Ctrl+O from the board works (`52a`). | `27-click-row-then-ctrlk.png`, `29-combined.png`, `28-combined.png` |
| **Double-click** in **Add...** mode | Ctrl+K, double-click the Text row; again on the HomePage row | **Does not insert.** The first click ends add mode (hint back to **Go to...**), the second acts as **Open**: Text has no file (nothing happens), HomePage opens on its own. Matches `NListTile` ("a tap calls onTap right away", the second tap calls onDoubleTap) and `_onTap` setting `_adding = false`. | `23-dblclick-text-in-add-mode.png`, `30b-dblclick-homepage-in-add-mode.png` |

Confirms:
- `design/library.md` L87: "the Delete key doesn't act on its rows: use the menu." Confirmed.
- `design/library.md` L107: "In the search field, Esc clears the search. On an empty search it gives the keys back to the board, so shortcuts work again. On a row, Esc puts the details card away." Confirmed in all three parts.
- `design/library.md` L35-38 (table): Go to... + Ctrl/Cmd+Enter "Inserts it", Add... + Ctrl/Cmd+Enter "Opens it", Enter opens / inserts. Confirmed, and Ctrl+Enter does reach the handler from inside the text field.
- `design/library.md` L59: Ctrl/Cmd+Enter on a row inserts. Confirmed.
- `design/library.md` L70: "Once the card is open, it follows your pointer from row to row. Press Esc on a row to put it away." Confirmed.
- `design/library.md` L79: Open "Key: Enter, or double-click the row." Confirmed (double-click opens).

CONTRADICTS or needs a change:
- `design/library.md` L58 ("Double-click a row while the search reads **Add...**" as a way to add), `design/add-widgets.md` L15 ("Press Enter, or double-click the result") and L29 ("Enter, a double-click or **Insert**"): a double-click never adds. It ends add mode and opens (a built-in widget has nothing to open).
- `design/library.md` L106: "Type a letter, digit or symbol while a row is focused to jump into the search." The focus does jump, but the letter you typed is left selected and the next letter replaces it ("button" gives "utton"). Either note it or leave the sentence out. Looks like a product bug.
- `design/library.md` L106 also says "↑ on the first row goes back": the first ↑ from the first result lands on the group heading, the next ↑ reaches the search.
- Not on any page: Ctrl+K does nothing while a Library row has the focus (click the board, or the search field, first). Worth a clause in `design/library.md` "Use the keyboard" or `design/add-widgets.md` step 1.

## Item 3: Boards chip tooltip and the Insert key hint (Linux)

| What | Exact text | Evidence |
|---|---|---|
| Tooltip of the **Boards** chip (hover about 2 s; same when the chip shows a board name such as `first` and when it shows **Boards**) | **`Boards (Ctrl B)`** (white tooltip below the chip, no plus sign) | `31-boards-chip-tooltip-hover.png` (+ `31b-zoom.png`), `32-boards-chip-tooltip-on-board.png` (+ `32c-zoom.png`) |
| Key hint next to **Insert** in the right-click menu of a Library row (Built-in **Lottie**) | **`⌘⏎`** (command and return symbols), although this is Linux (`navigator.platform` = Linux x86_64) | `09-lottie-row-context-menu.png`, `09b-insert-hint-zoom.png` |
| Sidebar tooltip, for comparison | **Search** icon: "Search" with "Ctrl 4" | `67a-search-panel-open.png` |
| Files context menu hints (code mode, same OS) | **Remove file** "Del", **Rename** "F2", **Cut** "Ctrl X", **Paste** "Ctrl V" | `64a-files-context-menu-dart.png` |

Confirms: `design/library.md` L78: "The menu shows ⌘⏎ on every system." Confirmed.
Not on a page: the tooltip text. `get-started/editor-tour.md` L31 does not quote it; it can now read "Boards (Ctrl B)" on Windows and Linux (macOS not checked here, presumably "Boards (⌘ B)").

## Item 4: Create new board "Login flow"

Boards chip > **Create new board** (footer of the list, which also shows **Search boards** and the one existing board `first` with its Rename and Delete icons) opens a dialog **New Board**: the name field is prefilled with `board`, and a line reads `Path: boards/board .board`. Typing `Login flow` changes the line to `Path: boards/Login flow .board` (the preview does NOT snake-case). After **Submit** the new board opens (empty, "To create a new screen click on the [phone] icon in the tool bar.") and the chip reads **`login_flow`**. Code mode > **Files** > `boards` lists **`first.board`** and **`login_flow.board`**.
Evidence: `60a-boards-chip-open.png`, `60b-create-new-board-dialog.png`, `61a-new-board-login-flow-typed.png` (+ `61a-zoom.png`), `61b-after-submit-login-flow.png`, `62b-files-boards-expanded.png`.
Confirms `design/boards.md` L17: "Nowa writes the name in snake_case, so **Login flow** becomes `login_flow`. Each board is saved as a `.board` file in the `boards` folder, here `login_flow.board`." Confirmed. Detail the page does not give: the dialog's **Path** preview still shows the typed name (`boards/Login flow .board`) before submit.

## Item 5: a `.board` file and Show file content in code mode

- Click `login_flow.board` in **Files** (also double-click, and the same expected for `first.board`): the editor area shows the centred text **`Code view is not available for boards`**. **No new tab appears**: the tab strip still holds only `home_page.dart` (now dimmed) and **+**. Nothing switches to the board. Evidence: `63a-click-board-file.png`, `63b-tabbar-zoom.png`, `63c-dblclick-board-file.png`.
  - `code/files.md` L25: "in code mode a `.board` file opens a tab that says "Code view is not available for boards"". The quoted text is exact; "opens a tab" is not (no tab is added). Suggest "the editor shows".
- Right-click a Dart file (home_page.dart) in **Files** (playground = web project): menu **Remove file** (Del), **Rename** (F2), **Cut** (Ctrl X), **Paste** (Ctrl V), **Copy as path**, **Show file content**. No **View in folder** (local only). Evidence: `64a-files-context-menu-dart.png`.
  - Confirms the order and labels in `code/files.md` L60-68.
- **Show file content** on `home_page.dart`: a second tab `home_page.dart` opens (plain code view, same text). **No Font size, no Word wrap, no Compile/Compiled** anywhere. On `pubspec.yaml`: no extra tab (it was already open), same plain editor, no panel. Evidence: `64b-show-file-content-dart.png`, `65a-click-pubspec-yaml.png`, `65b-pubspec-context-menu.png`, `65c-show-file-content-pubspec.png`.
  - Confirms `code/code-mode.md` L54 ("In code mode, the edits you type in that tab reach the project when you save", I did not type) and the "only outside code mode" part of L56.
- Outside code mode (design mode), Search panel (Ctrl 4), query `uses-material`, click the `pubspec.yaml` match (1 in 1 file, line 31): the text file fills the board area (top bar: **Back**, **Forward**, **Boards** chip, then a `pubspec.yaml` chip), and **a details panel on the right shows Font size 13, Word wrap (checked) and a greyed button reading Compiled**. Evidence: `67a-search-panel-open.png`, `67b-search-results.png`, `67c-click-pubspec-match-design-mode.png`.
  - Confirms `code/code-mode.md` L56 completely: "Font size (13 by default), Word wrap (on by default) and a Compile button ... it reads Compiled and is greyed out." (I did not edit, so the **Compile** state with pending edits was not seen.) The page says "opens in a tab": in design mode it replaces the board area, with a chip in the top bar and no tab strip.
- Also seen: the Files icon takes the second sidebar slot in code mode and the panel opens on it (`62a-code-mode-opened.png`); leaving code mode brings the Library back (`66a-back-in-design-mode.png`). Confirms `code/code-mode.md` L16. In code mode the top bar has no starting-point chip, no Back/Forward arrows and no **Boards** chip (a Back arrow at the far left instead).

## Item 6: Library Add (+) menu, New Folder, New Model, New Global State

The **Add** (+) menu lists, in this order: **New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, **API Collection...**, **Import Dart code...**, **Upload Assets...** (`70b-library-add-menu.png`). Confirms the table in `design/library.md` L93-102 and `code/files.md` L33-42.

Filter menu (`72a-filter-menu.png`, `72b-class-zoom.png`): header **SHOW**; **Widgets** (checked), **Everything**, **Screens**, **Components**, **Models**, **Global states**, **Classs** (three s, confirmed by zooming), **Functions**, **Enums**, **Variables**, **Private**. The Filter button is lit orange when not on **Widgets**. Confirms `design/library.md` L29 (including the typo).

- **New Folder...**: dialog **`New Directory in pages`** (the highlighted row was HomePage; with no highlighted row it read **`New Directory in lib`**), name prefilled `Directory`, **Cancel** / **Submit**. I made `empty_dir` once under `lib/pages` and once under `lib`.
  - **Library**: neither folder shows, with **Widgets** or with **Everything** (`71c-after-new-folder.png`, `72c-filter-everything.png`, `77b-after-new-folder-again.png`).
  - **Code mode > Files**: **neither folder shows there either** (`lib` lists `globals`, `main.dart`, `models`, `pages`; `pages` lists only `home_page.dart`), also after expanding and collapsing rows and re-entering code mode (`76a-code-mode-files-after-adds.png`, `76b-files-tree-toggled.png`, `77c-code-mode-files-after-second-folder.png`). The playground's in-memory project may simply not keep an empty folder; a cloud or local project could behave differently, not testable here.
  - CONTRADICTED here: `code/files.md` L46: "A folder shows in the Library only when something is in it, so a new empty folder appears first in the **Files** tree in code mode." The first half holds. In the playground the empty folder is not in **Files** either. Either soften the second half ("in a local project, ...") or leave it out. `design/library.md` L96 ("Makes a folder in the folder of the row you highlighted last, or in `lib`.") is right: the dialog title names the target.
- **New Model...**: dialog **New Model**, name `Model`, lines `Class name: Model` and `Path: lib/models/model .dart`. Created `Product`. **With the default Filter (Widgets) the Library shows only pages > HomePage**; no model, no `models` folder, and no editor opens. **Everything** or **Models** lists `models` > **Product**.
- **New Global State...**: dialog **New GlobalState** (one word), name `GlobalState`, `Class name: GlobalState`, `Path: lib/globals/global_state .dart`. Created `Cart`. Default Filter: hidden. **Everything** or **Global states**: `globals` > **AppState**, **Cart**.
  - Confirms `code/files.md` L46: "The Library's **Filter** starts on **Widgets**, so a new model or global state stays hidden until you choose **Everything**, **Models** or **Global states**." and `design/library.md` L29. Evidence: `73a-new-model-dialog.png`, `73c-after-new-model-default-filter.png`, `74-combined.png`, `74c-after-new-global-state-default-filter.png`, `75a-everything-after-model-and-global.png`, `75-combined.png`.
  - Detail for the pages: the dialogs are titled **New Directory in ...** and **New GlobalState**, not "New Folder" / "New Global State".

