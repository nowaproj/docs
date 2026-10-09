# W30a writer notes (3.13 update, decision D20)

Batch W30a: new page `design/library.md`; get-started pages (editor-tour, welcome, desktop-app, mobile, first-app, playground,
create-account, cloud-and-local); design pages (index, boards, screens, components, add-widgets, select-and-edit, outline);
`reference/glossary.md`. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Baseline for diffs: `b84bfdafd`
in `/home/user/nowa` (`git show b84bfdafd:<path>` works there). Research: `_rewrite/research/changes-3.13.md` (C1-C27).
Refs are `path:line` in the 3.13 tree unless marked `3.12.5:`.

## design/library.md (NEW)

Title "Find and add things with the Library" (sidebar_label "Library"). Heading anchors (auto slugs, no explicit ids):
`#open-the-library`, `#choose-where-to-look`, `#find-something`, `#add-something-to-the-board`, `#preview-a-row`,
`#open-rename-delete-and-move`, `#create-things-from-the-library`, `#use-the-keyboard`.
Size: about 1,600 words by `wc -w` (about 1,300 words without markup and key tags). Over the style guide's 1,200 hint because it
holds four reference tables; it could be split into "Library" and "Library reference" if the orchestrator wants.

Claims and code refs:
- Icon 2 and Ctrl/Cmd+2: `lib/project/side_bar.dart:36-55` (Library is index 1), key map `lib/setup_general_actions.dart:44-62`.
- Header buttons **Add** (tooltip "Add") and the list/tree toggle (tooltips "Show as a list" / "Show as a tree"), search hints
  **Go to...** / **Add...**, **Filter** (tooltip "Filter", lit when not the default), menu header **Show**, entries **Widgets**,
  **Everything**, one kind each, **Private**: `packages/nowa_ui/lib/library/library_panel.dart:697-781`, kinds `:958-980`.
  Defaults (only **Project** chip, kinds = Widgets): `packages/nowa_ui/lib/library/library_contract.dart:214-225`.
  The filter item "Classs" (typo, `library_panel.dart:971-979`) is deliberately not listed; the page names the other seven kinds
  (Screens, Components, Models, Global states, Functions, Enums, Variables). The page never says "classes" for the filter, so
  nothing contradicts the menu; the Project row only says "what they hold".
- Chips hidden while searching, at least one stays on: `library_panel.dart:444-448,782-796`.
- Project source: lib folders, errors counted per row/folder, variants as children, `MyApp` hidden:
  `packages/core/lib/src/library/library_service.dart:221-294`. Packages (direct pubspec deps, version or "workspace"):
  `library_service.dart:358-388`. Built-in (Nowa's picks by category, then Flutter libraries, Material and Cupertino first):
  `library_service.dart:394-454`, categories `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:96-107`.
  Assets (folders then files under `assets/`): `library_service.dart:298-353`.
- Search: contains-match on names in all four sources, grouped Project, Packages, Built-in, Assets (enum order), count at the end of
  each heading, rank = Nowa's picks, then starts-with, then name, 100 per group then **Show all N**, **Show N more of other kinds**,
  **Show N private match(es)**, **No matches**, first result highlighted: `library_panel.dart:245-275,334-397,820-841`.
  Assets match whatever the kind filter says: `library_panel.dart:331-332`.
- Add mode vs go-to mode, Enter / Ctrl-Cmd+Enter flip, Add mode ends on click, focus loss, insert or Esc on empty search:
  `library_panel.dart:515-542,544-575,621-661,679-693`; requests from Ctrl+K and Ctrl+O:
  `packages/designer/lib/src/actions/add_actions.dart:13-31`, `packages/core/lib/src/actions/tab_actions.dart:27-52`;
  `packages/core/lib/src/library/library_service.dart:83-87`.
- Recent: last 8 (`library_service.dart:129-133`), also by dragging (`packages/designer/lib/src/design_experience/designer_board_controller.dart:227-231`),
  shown only with an empty search (`library_panel.dart:276-282`).
- Insert: needs a designer (`lib/project/panels/library_panel/library_host.dart:135-143`, snackbar text), placed at the last
  pointer spot (`packages/designer/lib/src/design/common_design.dart:194-217`), missing package dialog **Add Missing
  Dependencies** / "This widget requires the following dependencies" / **Cancel** **Add**
  (`packages/core/lib/src/library/library_actions.dart:76-91`, `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart`).
  Assets have no Insert (`library_host.dart:136`, `widgetFor` is null for assets): they drag (`library_service.dart:121-127`).
- Details card: beside the panel, click or arrows open it, follows the pointer, Esc puts it away, 200 px preview, name, "Kind · location",
  4 lines of the first paragraph of the doc comment: `library_panel.dart:462-492,1192-1262`, `library_host.dart:266-288`,
  `packages/core/lib/src/utils.dart:87-90` (`docSummary`). Live preview only for Nowa's picks, project widgets and assets
  (`library_service.dart:92-95`, `library_actions.dart:12-62`). **Add description** label: `packages/designer/lib/src/details/widget_details.dart:369`.
- Right-click menu: **Insert** (hint ⌘⏎ on every OS), **Open** (⏎), **Upload assets...**, **Rename** (F2), **Delete** (destructive),
  **Show in code**, with the conditions of `library_host.dart:156-172,189-192`; no menu on packages (`library_panel.dart:923-925`).
  Delete: "Are you sure you want to delete {name}?" with **Cancel** / **Yes** (`packages/core/lib/src/widgets/nowa_dialogs.dart:6-24`),
  then the references dialog **Cancel** / **Remove** (`packages/core/lib/src/widgets/declaration_references_dialog.dart:79-82`),
  file removed when the widget is alone in it (`packages/core/lib/src/actions/block_actions.dart:87-99`). Rename renames the file
  when named after the symbol (comment at `library_host.dart:198`). Ctrl/Cmd+Z: the Library's own `Undo` (`library_host.dart:39,297-299`).
- Move by drag, lib stays in lib, assets in assets: `library_host.dart:244-264`.
- Delete key: the Library never fills its `SelectionProvider` (`library_host.dart:42`), so `RemoveIntent` from the global Delete key
  finds an empty selection and returns (`packages/core/lib/src/actions/general_actions.dart:14-16`,
  `packages/core/lib/src/file_system/actions/file_actions.dart:139`). Stated on the page; marked "needs a live check" below.
- **Add** menu entries: `lib/project/panels/library_panel/library_host.dart:176-186`, `lib/project/panels/files_panel/add_lib_menu.dart:11-105`.
  New Widget... opens the template picker and the new file opens in a tab (`add_lib_menu.dart:38-49`); template files go to
  `lib/pages` or `lib/components` (`packages/core/lib/src/file_system/actions/file_actions.dart:65`), so the page does NOT claim they
  follow the highlighted row. New Folder... uses the highlighted row's folder (`add_lib_menu.dart:50-59`, `library_host.dart:181`).
  Models in `lib/models`, global states in `lib/globals` (`packages/core/lib/src/providers/project_provider.dart:381,387`).
  API Collection... is the Api plugin's entry (`packages/data/lib/src/api/utils/api_util.dart:113-118`; the collection file goes to `lib/api`, not stated).
  Upload Assets... opens the system file picker, several files allowed (`project_provider.dart:792-798`).
- Keys: typing jumps to the search, up from the first row, F2, Esc, Enter on a folder toggles: `library_panel.dart:544-584`.
- Code mode shows **Files** instead (`side_bar.dart:44-49`); the phone layout keeps the old list (`lib/project/project_dashboard.dart:49`).

Left out on purpose: the Library's View Only behavior, the sections' "no Project heading" quirk (put in the capture request instead),
the pin default in the New UX top bar, `?panel=library` links, per-kind icons, the `Show all` reset rules.

Open points needing a live check (for this page):
1. Delete key in the Library (see above): the code suggests it does nothing.
2. Dragging a Built-in widget whose package is missing (for example SVG): the drop path has no dependency prompt
   (`designer_board_controller.dart:226-262`); the page only says that **Insert** asks first and does not describe the drop.
3. Library keyboard details beyond what the code shows (Left/Right on folders, Home/End are handled by the tree widget `NTreeView`, not read).
4. The ⌘⏎ hint on Windows and Linux (the menu entry is hard-coded `'⌘⏎'`, `library_host.dart:161`).
5. Whether Enter on an asset row in **Add...** mode does nothing (it calls `_insert`, which returns when there is no widget).

## design/add-widgets.md (rewritten for the Library)

Heading changes (old ids kept): "Add a widget with the widget picker" is now "Add a widget from the Library"
`{#add-a-widget-with-the-widget-picker}`; "Drag screens, components and files" is now "Drag screens, components and assets"
`{#drag-screens-components-and-files}`. Unchanged and still referenced from other pages: `#add-a-widget-that-needs-a-package`
(code/packages.md, integrations/index.md, reference/widgets/index.md, reference/widgets/media.md), `#put-a-widget-inside-a-container`
(now also linked from select-and-edit.md). The table "Click or press Enter / Drag from the list" and the sentence "While you drag, the
picker closes" are gone: the Library stays open (`LibraryPanel.onDragStarted` only puts the details card away,
`library_panel.dart:912-915`; the host sets no `startDrag`, `library_host.dart:60-73`).
- Ctrl/Cmd+K and the **Widget** tool open the Library, switching the side panel to it, search in add mode:
  `packages/designer/lib/src/actions/add_actions.dart:13-31`, `packages/designer/lib/src/widgets/designer_tools.dart:172-183`,
  key `packages/designer/lib/src/designer_setup.dart:51`. Esc flow: `library_panel.dart:644-653`.
- Lands at the last pointer spot: `packages/designer/lib/src/design/common_design.dart:194-217` (`board.pointerLocation`).
  Drag drops where released: `designer_board_controller.dart:226-262`.
- Missing package: Insert paths ask (`library_actions.dart:76-91`); the drop path has no check (`designer_board_controller.dart:226-262`,
  `packages/designer/lib/src/design_experience/move_tool.dart`: no dependency code). The page therefore only says "add such a widget with
  Enter or Insert rather than by dragging, so Nowa asks first". What a drop does when the package is missing: NEEDS A LIVE CHECK.
- The dialog picker (still used): hint "Search for a widget", suffix **Request a Widget**, chips under **Search for:** **All**,
  **BuiltIn**, **Components** (`packages/core/lib/src/widgets/widget_picker.dart:131-205`,
  `packages/command_palette/lib/src/widgets/filter_section_widgets.dart:26`); preview with description, **Dependencies**
  (`DepsView`), variant chips and "Open Documentation." (`widget_picker.dart:301-359`), Tab / Shift+Tab step through variants
  (`widget_picker.dart:361-382`, `packages/command_palette/lib/src/widgets/command_palette_modal.dart:149-150`). Call sites:
  **Replace with...** `packages/designer/lib/src/menus/widget_context_menu.dart:30-40`; the **+** of an empty slot
  `packages/designer/lib/src/details/widget_details.dart:243-265` (`BFBaseWidget._showPicker`); widget-valued properties and
  **Pick Widget** `packages/core/lib/src/fields/basic_fields.dart:462,472-474` and `packages/core/lib/src/fields/nowa_fields.dart:435-442`.
  **Request a Widget** / **Submit Request**: `widget_picker.dart:148-163`, `packages/core/lib/src/dialogs/feedback_dialogs.dart:71,88`.
  The page says the Library has no such link (it has none: `library_panel.dart` has no request entry).
- Assets from the Library: `library_service.dart:121-127` (`dragDataFor` for `a:` rows); the **Assets** chip must be on to see the rows
  (search finds assets without it).
- The old "Files panel" bullet is removed: the designer sidebar has no Files icon (`lib/project/side_bar.dart:36-80`) and the board is
  not shown in code mode.
- Image `design-add-widgets-1`: kept as an embed with a new alt text (retake requested in `captures/requests/W30.md`); the old file
  still shows the dialog until it is retaken. Video `design-add-widgets-video`: kept, re-record requested; the log row's
  "after heading: Add a widget with the widget picker" is now "Add a widget from the Library".
- Alt text now: "The Library opened with Ctrl/Cmd+K: the search field reads Add... with button typed, the results are grouped by source
  with a count at the end of each heading and the first result is highlighted, and a details card with a preview sits beside the panel."

## design/components.md

Changed: keywords ("widgets panel" kept next to "library", because people still search for it), "Use a component" bullets,
"Edit a component or one instance" first bullet, the whole section "Manage screens and components" `{#manage-screens-and-components}`
(anchor kept, linked from boards.md and screens.md), Next steps. Removed on purpose: the **Page** / **Component** switch, Ctrl/Shift-click
multi-select, **Open in Editor**, "press Delete", grid/list switch (none exists in the Library).
- Refs: `library_panel.dart:697-781` (header, Filter), `library_host.dart:156-172` (menu), `:198-243` (rename, delete, show in code),
  `library_actions.dart:64-73` (Open at the declaration), `library_service.dart:221-294` (rows under Project).
- Alt text of `design-components-2` now: "The Library with the project's components listed and the right-click menu of one component row
  (highlighted): Insert, Open, Rename, Delete and Show in code." (retake requested).
- Not changed: the **Detach** and **Copy as new widget** bullets (still right; in 3.13 they are hidden, not greyed, where they do not
  apply, `widget_context_menu.dart:48-58`).

## design/boards.md

- Boards chip and list: `lib/project/top_bar_mapper.dart:78-143` (label = board name or "Boards"; tooltip; "Search boards"; "No matches"
  note; footer **Create new board**), `packages/nowa_ui/lib/src/components/picker_chip.dart:117-300,322-357` (search autofocus, arrows,
  Enter, highlight on first row, **Rename** / **Delete** actions), `lib/project/top_bar.dart:222-246` (lists every board in `boards/` and its
  subfolders, loaded or not). The step now reads "Click a board to open it. To find one, type in **Search boards**, then use the arrow keys
  and press Enter."
- Cmd/Ctrl+B opens the list with the search ready: `lib/project/panels/panel_actions.dart:28-40`, `packages/core/lib/src/panels/panel.dart:45-48`,
  `lib/setup_general_actions.dart:35`. No chip in code mode or the Run view, so no effect: `lib/project/top_bar_mapper.dart:58-62`.
- snake_case: `packages/designer/lib/src/actions/file_actions.dart:12-26,62-67`, `packages/core/lib/src/file_system/naming.dart:158-163`
  (`generateFileName` uses `Cases.snakecase`). "Login flow" gives `login_flow` (the research's example; the `recase` conversion was not run).
- Back / Forward: `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`, keys `lib/setup_general_actions.dart:36-38`
  (`control: true` on every OS), history `packages/core/lib/src/providers/navigation_history.dart`. The page says "click **Back** ... or
  press Ctrl + - (the Control key, also on a Mac). You can also open the **Boards** chip and pick the board."
- New bullet "Frame": `packages/core/lib/src/board/board_canvas.dart:222-231` (ClipRect, commit comment: "A screen ends at its frame:
  what overflows it, an error box, or a backdrop blur would otherwise paint over the canvases around it"). The clip applies to every
  `InstanceCanvas` (screens, components and loose widgets), so the page says "An item ends at its frame".
- Toolbar **Widget** row, "stays in ... the **Library**", Delete bullet (Library > **Delete**, **Yes**, second dialog when used),
  Next steps: see the Library page refs.
- Alt text of `design-boards-1` now: "The Boards list open: the Search boards field at the top, two boards (one hovered, showing the Rename
  and Delete buttons, and the current board marked) and Create new board at the bottom." (retake requested).

## design/screens.md

Changed: "Add description" bullet (the Library's details card shows the first paragraph of the doc comment, up to 4 lines:
`library_service.dart:281`, `packages/core/lib/src/utils.dart:87-90`, `library_panel.dart:1239-1243`; the widget picker dialog shows
`componentDoc.docSummary`, `widget_picker.dart:299`), "Open in new tab" bullet (**Back** or the **Boards** chip), "Delete a screen"
(Library > **Project** > **Delete**, then **Yes**), Next steps. Unchanged: **Screen** tool, **Create a page**, **Copy as new widget**.

## design/select-and-edit.md

- Menu order and labels: `packages/designer/lib/src/menus/widget_context_menu.dart:10-67`; keys `packages/designer/lib/src/designer_setup.dart:21-25`;
  reorder semantics `packages/designer/lib/src/design/order_design.dart:23-70` (next = later slot, allTheWay = last or first);
  greyed when it cannot run `packages/core/lib/src/widgets/menu.dart:49-72` and `OrderUpAction.isEnabled`
  (`packages/designer/lib/src/actions/widget_actions.dart:64-76`). Mapping from the old labels: Move Down = Bring forward, Move Up = Send
  backward, Move To Bottom = Bring to front, Move To Top = Send to back (same `ReorderIntent`s).
- Deleted the sentence about the menu showing the same hint for both entries (fixed in 3.13).
- "Each area keeps its own history: every board, the **Library**, and a screen opened on its own": `library_host.dart:39`
  (`Undo(debugLabel: 'Library')`). Code mode's **Files** has its own (`lib/project/panels/files_panel/files_panel.dart:30`); not added
  because the page is about the designer.
- **Replace with...** row now says "widget picker dialog" and links `add-widgets.md#put-a-widget-inside-a-container`.
- Alt text of `design-select-and-edit-2` now lists the new labels without **Detach** and **Copy as new widget** (hidden on a plain
  Container); retake requested.
- Not changed: the C25 note about snap guides at any zoom (no user-facing sentence needed).

## design/outline.md

Only the pending CAPTURE `design-outline-2` text changed ("the Back button and the Boards chip (not dimmed, showing Boards) in the top
bar"). The Outline menu is the same as the board's: `packages/designer/lib/src/panels/outline_panel.dart:190-198` calls
`widgetMenuEntries`.

## design/index.md

The **Widgets** row is now a **Library** row; "What's in this section" gets a Library link and the Add widgets line says "the Library
search, tools, drag and drop, paste". Image `design-index-1` and its alt text are unchanged (retake for the new chrome requested).

## get-started/editor-tour.md

- Top bar: new row **Back** and **Forward** (`top_bar_view.dart:258-271`, `navigation_history.dart:26` limit 50, keys
  `setup_general_actions.dart:36-38`, hidden in code mode and the Run view `lib/project/top_bar_mapper.dart:58-62`); the "Board chip"
  row is now the **Boards** chip row (no dimming: `top_bar_mapper.dart:90-116`).
- Sidebar table: **Widgets** row is **Library** (2); **Files** row removed; Outline 6, Api 7, Supabase 8
  (`side_bar.dart:36-98`, keys `setup_general_actions.dart:44-62`). Added the code-mode sentence for **Files**
  (`side_bar.dart:44-49`, `packages/core/lib/src/panels/panel.dart:205-209`). Git row: "Not in the playground or for guests"
  (`side_bar.dart:63-64`, `!gProject.project.isSandboxed`, guests are sandboxed: `packages/core/test/guest_test.dart:46`).
- Toolbar **Widget** row, welcome tour row (**Screens & Components** points at the **Library** icon,
  `lib/project/onboarding/onboarding_step.dart:108-112`, `side_bar.dart:131-132`), "When nothing is open" (**Browse widgets** opens
  the Library, `lib/project/panels/empty_workspace.dart:41-45`).
- New sentence under the code-mode bullet: the top-left **Back** of code mode and Settings (`top_bar_view.dart:167`) is a different
  button from the history **Back** arrow (`top_bar_view.dart:260`); both have the tooltip "Back".
- Not quoted on purpose: the Boards chip tooltip text on Windows and Linux (built from the registered shortcut,
  `top_bar_mapper.dart:94`, `top_bar.dart:194`): NEEDS A LIVE CHECK ("Boards (Ctrl B)"?).
- Image `get-started-editor-tour-1` and its alt text unchanged (the alt names areas, not sidebar items); retake requested.

## get-started/welcome.md

"for macOS, Windows and Linux" (C17: `packages/core/lib/src/providers/projects_view_provider.dart:64-65`, local projects on Linux;
`download_nowa_dialog.dart:8,79-94`); the **Screen** key term says "The Library lists your screens" with a link.

## get-started/desktop-app.md

- Dialog buttons **MacOS**, **Windows**, **Linux**, line "Download Nowa version: {version}", a button is greyed when the server has no
  link: `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8,19-95`. The captured image `get-started-desktop-app-1.png` (12:27,
  3.13.0) shows all three enabled; the CAPTURE placeholder text was updated and stays so the embed script can replace it.
- Linux install: archive name `Nowa-v<version>-linux-x64.tar.gz`, folder `nowa`, `install.sh`, copy to `~/.local/share/nowa` or
  `$XDG_DATA_HOME/nowa`, icon, applications-menu entry **Nowa**, re-run replaces the old copy: `linux/packaging/install.sh`,
  `linux/packaging/com.nowa.nowa.desktop`, `.github/workflows/linux-build.yml:46-56`. "made on Ubuntu 24.04": `linux-build.yml:19-20`
  (the workflow comment: rive_native's library needs glibc 2.38+ and libstdc++ 13+). No minimum distribution is stated or invented:
  NEEDS A DECISION (open point 5 of the research).
- Updates: Linux has no in-place update, the dialog offers **Download v{version}** and **Skip**
  (`lib/dashboard/overlays/update_overlay.dart:139-150`, `packages/core/lib/src/services/version_service.dart:39`); macOS and Windows keep
  **Update to v...**, **Or download manually**, **Install & Restart** (`update_overlay.dart:151-160,201-216`).
- Preview on Linux: `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:128-131,145-171` ("Your app is running", **Open in Browser**, the URL).
- Not added: window opens maximized (macOS and Linux only, `lib/window_manager/window_manager_setup_desktop.dart:5`), default
  **VS code Path** `/usr/bin` on Linux (`packages/core/lib/src/runner/vscode.dart:10-16`; the page only says it "starts with the usual
  install location"), bash fallback and SDK dialog example path (not user-facing enough).

## get-started/mobile.md, first-app.md, playground.md, create-account.md, cloud-and-local.md

No text edit. Checked each against 3.13:
- mobile.md: the phone layout still builds the old `WidgetsPanel` (`lib/project/project_dashboard.dart:49`); `git diff b84bfdafd 3cb32031c`
  of `lib/project/project_dashboard.dart` and `lib/project/panels/widgets_panel/` only restyles the sheet tiles and moves the menu to
  `NContextMenuRegion` (entry "Open in editor" is not quoted by the page; the bottom sheet's **Play alone**, **Attach to chat**,
  **Rename**, **Delete** are unchanged).
- first-app.md, playground.md, create-account.md, cloud-and-local.md: no label of the C-table appears (searched for Widgets, Files, board chip,
  picker, macOS/Windows, sidebar numbers). Google sign-in on desktop runs through the browser on every desktop OS including Linux
  (`packages/core/lib/src/services/auth/auth_io.dart:52-66`); **Continue with Apple** is still web and iOS only
  (`lib/auth/auth_widgets.dart:500`). The pending CAPTURE placeholders in first-app.md (`get-started-first-app-1`, `-2`) already have
  3.13 images in the log; the embed script will replace them.

## reference/glossary.md

Rows changed: Board (**Boards** chip), Desktop app (macOS, Windows and Linux), Files panel (now the code-mode **Files**), new **Library**
row (before Local project), Model (**Add** menu of the Library), Screen, Widget picker (now the dialog; Ctrl/Cmd+K and the Widget tool open
the Library). The **Widgets panel** row moved to "Renamed or removed". New rows there: Widgets panel, Open widget picker, Board chip,
Move Up/Move Down/Move To Top/Move To Bottom; the Assets panel row now says "The **Assets** chip in the **Library**".

## Capture requests

`captures/requests/W30.md`: 2 new (design-library-1, design-library-2), 5 retakes of images whose content changed
(design-add-widgets-1, design-add-widgets-video, design-components-2, design-boards-1, design-select-and-edit-2), 3 chrome retakes
(get-started-editor-tour-1, design-index-1, get-started-playground-1). Updated pending CAPTURE texts in the pages:
get-started-desktop-app-1 (Linux button) and design-outline-2 (Back button, Boards chip).

## Open points needing a live check (all pages of this batch)

1. Pressing Delete while a Library row is focused: the code suggests nothing happens (empty `SelectionProvider`); the page says so.
2. Dragging a Built-in widget whose package is missing (SVG, Lottie...): the drop path has no prompt; the page does not describe the result.
3. Keyboard details of the Library as read from code (Esc order, Enter in the list vs the search, Ctrl/Cmd+Enter, typing jumps to the
   search, F2): `library_panel.dart:527-660`. Whether Ctrl/Cmd+Enter reaches the key handler from inside the text field.
4. Boards chip tooltip text on Windows and Linux (not quoted).
5. Linux: no minimum distribution stated; the page says "made on Ubuntu 24.04" only.
6. The Library with the View Only role (the Library never reads `isViewOnly`, `lib/project/panels/library_panel/library_host.dart`):
   not mentioned on any page of this batch.
7. The ⌘⏎ hint of the **Insert** menu entry on Windows and Linux (hard-coded, `library_host.dart:161`); the page says "The menu shows
   ⌘⏎ on every system".
8. "Login flow" becoming `login_flow` (from the research; not run live).
9. The filter menu entry "Classs" (typo) is not listed anywhere.
