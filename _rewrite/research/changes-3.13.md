# Changes between Nowa 3.12.5 and 3.13.0 (for the docs update, D20)

Research for the docs rewrite, branch `docs-rewrite`. Nothing in the docs was edited and nothing was committed.
Sections: 1 summary, 2 check of `upcoming-3.13.md`, 3 change table, 4 per-page edit list, 5 screenshots and videos,
6 not settled from code.

**Source of truth:** `/home/user/nowa-master` at `3cb32031c` ("enable linux download", 2026-10-06; `pubspec.yaml`
`3.13.0+1`; `packages/core/lib/version.dart:2-3` `version` 3.13.0, `versionName` `3.13.0-79`, the label the status bar
shows as `v3.13.0-79`). **Baseline:** `b84bfdafd` (3.12.5, `-78`) in `/home/user/nowa`. 99 commits (88 non-merge), 495
files, +23.9k / -11.3k lines. Code refs are `path:line` in the 3.13.0 tree; `3.12.5:` marks the old tree.
"Pages" always means files under `/home/user/docs/docs` (not `docs/new`, not `docs/legacy`).

## 1. Summary

**Counts**

* `upcoming-3.13.md` (18 rows, made from `dev` on 5 Oct): **17 confirmed** at `3cb32031c` (U6, U8 and U9 needed a
  correction, U1, U2, U15, U17 and U18 more detail), **1 changed**: U16, the Linux download is not hidden any more. All
  line refs of that list still hold except the one-line shift in `basic_fields.dart`.
* **27 changes** in the table in part 3 (C1 to C27): 16 in the editor UI, 11 elsewhere.
* **53 docs pages** need edits (part 4, with the exact sentences). About 60 more pages mention nothing that changed (listed
  as "no edit" where a search term hit them).
* **Media (part 5):** 69 embedded shots and videos in the log, 12 already re-taken from 3.13 (`logic/*`). Of the other 57:
  **8 change content** (Library, Boards list, menu, Linux), **7 show old sidebar, top bar, status bar or tree**, 42 are
  restyle-only. 11 new log rows are not embedded yet.
* **Not settled from code: 11 questions** (part 6).

**The biggest changes for readers of the docs**

1. **Library replaces the Widgets panel, and Files leaves the designer** (C1 to C3, C6, C7). Sidebar icon 2 is **Library**
   (screens, components, models, built-in widgets, packages, assets; search, **Add** menu, details card, **Insert**, **Open**,
   **Rename**, **Delete**, **Show in code**). **Files** shows only in code mode. The sectioned Files tree and its **Add to
   library**, **Add board** and **Import asset** buttons are never shown. Sidebar numbers change (Outline 6, Api 7, Supabase 8).
   About 25 pages quote the old panels.
2. **Cmd/Ctrl+K and the toolbar Widget tool open the Library, not the picker dialog** (C4); Cmd/Ctrl+O is "Go to a widget" in the
   designer (C5). The dialog survives for **Replace with...**, the **+** of an empty slot, widget-valued properties and **Pick Widget**.
3. **Top bar:** **Back** and **Forward** arrows (Ctrl+- and Ctrl+Shift+-), and the board chip becomes a searchable **Boards**
   picker; Cmd/Ctrl+B opens it; new boards are named in snake_case (C8, C9).
4. **Shortcuts sheet and right-click menu** use Figma's words: **Bring forward**, **Send backward**, **Bring to front**, **Send to
   back**; Alt/Option with `]` or `[` goes all the way; **Add a widget** and **Go to a widget** replace "Open widget picker" and
   "Open file picker" (C10, C11).
5. **Linux desktop app shipped** (C17): **Linux** download button, `.tar.gz` plus `install.sh`, no in-place update, the embedded
   preview opens in the browser. The "No Linux desktop app" known issue is gone.
6. **Theme extensions** show as tabs in the color picker and the text-style picker (C20); `@Preview` variants (C14); nullable enum
   **Default** (C15); git branch search (C13).
7. **Packages and code:** `git:` and `path:` dependencies load, `sdk:` dependencies (for example `flutter_localizations`) count as
   installed, `gap`, `flutter_animate`, `google_fonts` and `smooth_page_indicator` are built in, `nowa_runtime` is 0.2.0 and a
   **Page indicator migration** dialog appears (C22). Much more hand-written Dart renders on the board (C19).
8. Small: banners at most 2 (C21), `.nowa/settings.json` no longer rewritten each release (C23), the UI font is really Albert Sans
   again and the status bar reads `v3.13.0-79` (C16).

**Open points that block a page** (part 6): how to add a Firestore collection or query now (the Files-panel popups are
unreachable), whether the Library respects View Only, what dragging a package widget does when the package is missing, and
the Linux minimum system.

## 2. Confirmation of `upcoming-3.13.md` against the release

`upcoming-3.13.md` was made from `dev` at `4f3dbe61f` (5 Oct). The release has 45 more commits (3 Oct merge, the
fix/gather-app-theme branch, the Wonderous work of 5 to 6 Oct, banners, nowa_runtime 0.2.0, the Linux CI and the flag
flip). I diffed `4f3dbe61f..3cb32031c` for every file the old list cites: only 4 of its 57 cited files changed
(`download_nowa_dialog.dart`, `basic_fields.dart` (+1 import line, so line numbers after 1 shift by 1),
`library_actions.dart`, `themes_context_menu.dart`), so **every line ref in that list is still valid at 3cb32031c**
unless noted below. Nothing in the list was reverted. The one revert in the range (`3f6e84d6f`, "fix theme for gather
app") was re-applied by `480cd3c9f`. `9364d2d16` removed what `ab384f764` added ("run a package's extensions from its
source") before release, so that is not in 3.13.

| # | Row of `upcoming-3.13.md` | Status | Corrections and additions (3.13 tree) |
|---|---|---|---|
| U1 | Library replaces the Widgets panel | **Confirmed** | The typo "Classs" (filter entry) **shipped**: `packages/nowa_ui/lib/library/library_panel.dart:971-979` (`'Class'` + `'s'`). With one source on and nothing recent, the panel shows the Project tree without a "Project" heading (`library_panel.dart:291`). The sources chips are hidden while searching (`:782`). The phone layout still uses the old Widgets panel (`lib/project/project_dashboard.dart:49`; its menu entry is now "Open in editor", was "Open in Editor": `lib/project/panels/widgets_panel/widgets_context_menu.dart`), so `get-started/mobile.md` stays valid. The link parameter `?panel=widgets` no longer resolves; `?panel=library` and `?panel=files` do (`lib/project/workspace_options.dart:100-104`, `lib/router.dart:258-270`). |
| U2 | Library: adding and managing items | **Confirmed** | Added by `3bf407524`: the details card loads the next asset's preview when the selection moves (`packages/core/lib/src/library/library_actions.dart:105-123`). Not in the list: the Library has **no Delete-key action** (`packages/nowa_ui/lib/library/library_panel.dart:544-573` handles typing, the up arrow, F2, Esc and Enter only; right-click "Delete" has no key hint), **no multi-select**, and **no View Only gating** (`lib/project/panels/library_panel/library_host.dart` never reads `isViewOnly`; the Files tree does, `files_tree_host.dart:34,40-55,445`). Dragging a package widget from the Library onto the board does not ask to add its package (`packages/core/lib/src/library/library_service.dart:121-127`, `packages/designer/lib/src/design_experience/designer_board_controller.dart:257-259`); Enter, double-click in add mode, Cmd/Ctrl+Enter and "Insert" do (`library_actions.dart:76-92`). |
| U3 | Cmd/Ctrl+K and the Widget tool open the Library | **Confirmed** | `packages/designer/lib/src/actions/add_actions.dart:13-31` (unchanged). If another panel is open, the side panel switches to **Library** first (`add_actions.dart:21-22`). The widget picker dialog is still opened by: right-click **Replace with...** (`widget_context_menu.dart:31`), Group **Details** menu **Replace with...** (`group_details.dart:88`), the **+** on an empty widget slot (`widget_details.dart:249`), widget-valued properties and **Pick Widget** (`basic_fields.dart:473`, `nowa_fields.dart:436`), the GoRouter **to** field (`logic/navigation.md`), and an interactive walkthrough (`add_actions.dart:20`). **Request a Widget** exists only in that dialog (`packages/core/lib/src/widgets/widget_picker.dart:151-156`), not in the Library. |
| U4 | Cmd/Ctrl+O is "Go to a widget" | **Confirmed** | `packages/core/lib/src/actions/tab_actions.dart:27-71` (unchanged since the list). Code mode keeps the **Search for a file** palette; folders skipped when listing: `.dart_tool`, `.git`, `.gradle`, `.idea`, `.symlinks`, `build`, `ephemeral`, `node_modules`, `Pods` (`tab_actions.dart:56-66`); it lists `lib/` (and the project root only in debug builds). |
| U5 | Files leaves the designer sidebar | **Confirmed** | `lib/project/side_bar.dart:36-80` (designer: Assistant, Library, Themes, Search, Git, Outline, Api, plugin panels; code mode: Files replaces Library in the 2nd slot). `packages/core/lib/src/panels/panel.dart:205-209` (code mode opens on Files). |
| U6 | Files panel rebuilt as a tree | **Confirmed, with a correction** | The sectioned tree (lib / boards / design / assets with **Add to library**, **Add board**, **Import asset**) is built only when `showAllFiles` is false (`lib/project/panels/files_panel/files_tree_host.dart:134-148,160-190`). `FilesPanel` forces it to true in code mode (`files_panel.dart:25-26,60-100`) and the panel is not in the designer sidebar, so a normal session **never shows the sections or their buttons**. Code mode shows the project root as plain folders (names starting with "." hidden), with no add buttons, as in 3.12.5 (`3.12.5:lib/project/panels/files_panel/files_list.dart:166-175` drew headlines only outside code mode). The click-a-file **preview popup** (the custom views for `collections.dart`, `queries.dart`, `themes.dart`, `main.dart` and `*.api.dart`) is opened only from this panel in design mode (`files_tree_host.dart:266-282`), so it is unreachable in normal use. The grid view's background menu **New folder** (`files_context_menu.dart:11`) is not reachable either (list view is the default and nothing switches it). |
| U7 | Top bar **Back** and **Forward** | **Confirmed** | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`; history `packages/core/lib/src/providers/navigation_history.dart` (limit 50 at `:26`); keys `lib/setup_general_actions.dart:36-38`. Shown only when the breadcrumbs show (not code mode, not the Run view, not New UX): `lib/project/top_bar_mapper.dart:58-62`. |
| U8 | Searchable board picker, Cmd/Ctrl+B | **Confirmed, dev caveat settled** | `lib/project/top_bar_mapper.dart:65-146`, `lib/project/top_bar.dart:217-246,290-300`, `packages/nowa_ui/lib/src/components/picker_chip.dart`. The caveat "code-mode Boards tab tooltip still shows ⌘B" does not exist: the **Boards** tab button (`lib/tabs_view.dart:62-103`) is hidden in code mode (`tabs_view.dart:25`); it shows in the design-mode tab strip, where ⌘B opens the picker. In code mode and the Run view there is no picker, so Cmd/Ctrl+B does nothing there. The chip is **not dimmed** any more (3.12.5 `packages/nowa_ui/lib/top_bar/top_bar_view.dart:325-328` dimmed it off a board and a click went back to the last board). New board names: `packages/designer/lib/src/actions/file_actions.dart:62-67` + `packages/core/lib/src/file_system/naming.dart:158-163` (snake_case). |
| U9 | Shortcuts sheet and reorder keys | **Confirmed, with a correction** | **Back**, **Forward** and **Boards** are in the **Tab Actions** group, not General (`packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:28-38`). Designer group: **Add a widget** (⌘K), **Go to a widget** (⌘O) (`:40-49`); Widgets group: **Bring forward**, **Send backward**, **Bring to front** (Alt + ⌘ + `]`), **Send to back** (`:52-61`). Mac modifier order ⌃⌥⇧⌘ (`packages/core/lib/src/inputs.dart:28-37`). |
| U10 | Widget right-click menu | **Confirmed** | `packages/designer/lib/src/menus/widget_context_menu.dart:10-67`, `board_context_menu.dart:7-13`, helper `packages/core/lib/src/widgets/menu.dart:49-72`. |
| U11 | Other menus renamed | **Confirmed** | The walkthrough caveat is still true at release: `WalkthroughAnchorIds.groupContextMenuItem` is registered nowhere (`packages/core/lib/src/walkthrough/overlay/walkthrough_anchors.dart:15`, `walkthrough_catalogue.dart:1101-1105`), so that sub-step never shows. |
| U12 | Git branch menu | **Confirmed** | `lib/project/panels/git_panel/git_details.dart:227-240` (opens below: `NMenuPlacement.below`), `:768` ("Search branches"). |
| U13 | Widget variants from `@Preview` | **Confirmed** | `packages/core/lib/src/interpreter/services/variant_service.dart` (a variant's name is the `name:` argument, else the function name in Title Case: `:25-26`). |
| U14 | Enum "Default" option | **Confirmed** | Now `packages/core/lib/src/fields/basic_fields.dart:1542` (shifted by 1 import). |
| U15 | App-wide restyle | **Confirmed, plus two visible side effects** | (1) The UI font is **Albert Sans** again: in 3.12.5 `packages/nowa_ui/pubspec.yaml` declared one family per font file, so `kNowaFontFamily = 'packages/nowa_ui/AlbertSans'` (`packages/nowa_ui/lib/src/globals/nowa_texts.dart:5`) matched nothing and the UI used the platform fallback; 3.13 declares the single `AlbertSans` family with all weights (`packages/nowa_ui/pubspec.yaml:33-78`, commit `f4265d2de`). Every re-taken screenshot will look different. (2) The status bar shows `v3.13.0-79` (`packages/core/lib/version.dart:2-3`). |
| U16 | Linux desktop app: built but hidden | **CHANGED: it shipped** | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8` is `_showLinuxDownload = true` (commit `3cb32031c`, 6 Oct). The live server answered `GET https://server.nowa.dev/version/latest` (2026-10-09) with `version 3.13.0` and `linuxLink` = `https://storage.googleapis.com/nowa-downloads/linux/Nowa-v3.13.0-linux-x64.tar.gz` (plus `linuxHash`), so the **Linux** button is enabled, not greyed. Details in C17. |
| U17 | Local projects: outside edits sync | **Confirmed, extended** | `packages/core/lib/src/services/local_file_service.dart:82-97,195-214,315-330` plus a pubspec reload after outside changes (C18). |
| U18 | Designer renders more hand-written code | **Confirmed, much larger than listed** | The list covered `5e4097e84` and friends (4 Oct). The 5 to 6 Oct Wonderous commits add a lot more (C19). |

## 3. Change table

Labels are copied from the code (quotes keep the exact casing and dots). "3.12.5" means the old label or behavior.
Rows C1 to C16 are editor UI; C17 to C27 are everything else a user can notice.

| ID | Change | 3.13 labels and behavior | Code refs at 3cb32031c | Pages |
|---|---|---|---|---|
| C1 | **Library panel replaces the Widgets panel** (and, in the designer, the Files icon) | Left sidebar icon 2 is **Library** (new icon `packages/nowa_ui/assets/library.svg`; was "Widgets"); panel header "Library" (violet icon). Shortcut Cmd/Ctrl+2. Empty-workspace button **Browse widgets** (label unchanged) now opens it; the welcome-tour step **Screens & Components** (title and text unchanged: "Explore all the project screens and components.") now points at the Library icon. A stored pin "Widgets" becomes "Library" and "Library" is pinned by default in the New UX top bar. The old panel (**Page** / **Component** switch, **Search project...**, grid/list button, thumbnails, "Open in Editor") is gone from the desktop and web editor; the phone layout keeps it. The Library keeps its own undo history ("Library"). The sidebar tooltips read "Library" and "Files". | `lib/project/side_bar.dart:36-80,132,194-200`; `lib/project/panels/left_panel.dart:31-35`; `packages/core/lib/src/panels/panel.dart:32-39`; `lib/project/panels/empty_workspace.dart:41-45`; `lib/project/onboarding/onboarding_step.dart:108-112`; `lib/project/workspace_options.dart:100-104`; `lib/project/project_dashboard.dart:49` (phone, unchanged); `lib/project/panels/library_panel/library_host.dart:39` | editor-tour; design/index; design/components; design/add-widgets; design/boards; design/screens; design/assets; select-and-edit (undo areas); get-started/welcome; reference/glossary; reference/shortcuts; code/import; code/custom-code; guides/complete-app; troubleshooting/index |
| C2 | **Library contents, search and details** | **Header:** buttons **Add** (+, tooltip "Add") and a list/tree toggle (tooltips "Show as a list" / "Show as a tree"). **Search** field: hint **Go to...** (hint **Add...** when opened with Cmd/Ctrl+K); **Filter** button (tooltip "Filter", lit when not on the default) opens a menu headed **Show**: **Widgets** (default: screens, components and widgets), **Everything**, **Screens**, **Components**, **Models**, **Global states**, **Classs** (sic, shipped), **Functions**, **Enums**, **Variables**, then a toggle **Private** (lock icon). **Chips** under the search (hidden while searching): **Project** (the only one on by default), **Packages**, **Built-in**, **Assets**; at least one stays on. **Project:** the `lib/` folders (top-level folders start open) with screens, components, models, global states, classes, enums, functions and variables, a red error count on rows and folders; `MyApp` and private symbols are hidden ("Private" shows them). A component's `@Preview` variants are child rows. **Packages:** the pubspec's direct dependencies with their version, or "workspace" for a `path` dependency, each with its widgets and classes. **Built-in:** Nowa's picks by category (Basic, Images, Buttons, Layout, Players, Animations, Progress Indicators, Forms, Screen Components, Integrations), then Flutter's libraries, Material and Cupertino first. **Assets:** folders and files under `assets/`. **Search** matches names in every source (the kind filter still applies), groups the results by source with a count at the end of each heading, ranks Nowa's picks first, then names that start with the query, then A to Z, highlights the first result as you type, shows 100 per group then a row **Show all N**, and ends with **Show N more of other kinds** and **Show N private match(es)** ("match" for 1) rows; empty: **No matches**. A **Recent** section at the top lists the last 8 widgets you inserted (also by dragging). One source on and nothing recent: no "Project" heading. **Details card:** a click or the arrow keys open a card beside the panel (live preview for Nowa's picks, project widgets and assets, bigger 200 px preview area; name, "Kind · location", the first 4 lines of the doc comment); once open it follows the pointer, Esc puts it away. | `packages/nowa_ui/lib/library/library_panel.dart:42,245-292,394-397,432-437,696-725,739-776,782-795,800,826-837,960-979,1192-1262`; `packages/nowa_ui/lib/library/library_contract.dart:223-225`; `packages/core/lib/src/library/library_service.dart:130-134,221-251,327-352,358-392,394-440`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:96-107` (categories) | design/add-widgets; design/components; design/assets; design/screens (description shows in the card); reference/widgets/index; code/files; logic/models; logic/global-state; get-started/editor-tour; reference/glossary |
| C3 | **Library actions** | **Insert:** drag a row onto the board, or Cmd/Ctrl+Enter, or right-click **Insert** (key hint ⌘⏎ on every OS); needs an open screen, component or board, else the snackbar "Open a screen, a component or a board to insert into"; a widget whose package is missing first opens **Add Missing Dependencies** (message "This widget requires the following dependencies", **Cancel** / **Add**); it lands where the pointer last was on the board. **Open:** Enter, double-click or right-click **Open** (hint ⏎): a project row opens its file at the declaration, an asset opens its file; Nowa's picks have no source. **Right-click entries:** **Insert**, **Open**, **Upload assets...** (asset folders), **Rename** (F2, edits in place; renames the file when it is named after the symbol), **Delete** (red, asks "Are you sure you want to delete {name}?" then lists uses as before; deletes the file when the widget is alone in it), **Show in code** (files; switches to code mode at the declaration). **Add (+) menu:** **New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, plugin entries such as **API Collection...**, **Import Dart code...**, **Upload Assets...**; creates in the highlighted row's `lib` folder (else `lib`), uploads to the highlighted `assets` folder (else `assets`). **Move:** drag a project row onto a folder (lib stays in lib, assets in assets). **Keys:** typing jumps into the search; the up arrow from the first row goes back to the search; Esc clears the search, then hands the keys back to the board so shortcuts work again. No Delete-key action, no multi-select. | `lib/project/panels/library_panel/library_host.dart:135-262`; `packages/core/lib/src/library/library_actions.dart:67-92`; `lib/project/panels/files_panel/add_lib_menu.dart:11-105`; `packages/nowa_ui/lib/library/library_panel.dart:527-573,587-660`; `packages/designer/lib/src/design_experience/designer_board_controller.dart:226-262`; `packages/core/lib/src/actions/block_actions.dart:57-82` | design/add-widgets; design/components; design/assets; design/screens; design/templates; code/files; code/custom-code; logic/models; logic/global-state; integrations/rest-api/index; integrations/firebase/firestore |
| C4 | **Cmd/Ctrl+K and the toolbar's Widget tool open the Library, not the widget picker** | Both open the **Library** (switching the side panel to it) with the search focused in add mode (hint **Add...**): the first result is highlighted as you type, **Enter** (or double-click) inserts it on the board and hands the keys back, **Cmd/Ctrl+Enter** opens it instead. The dialog picker ("Search for a widget", **Request a Widget**, chips **All** / **BuiltIn** / **Components**, preview with **Open Documentation** and **Dependencies**, variant chips) remains for right-click **Replace with...**, the Group menu's **Replace with...**, the **+** of an empty widget slot, widget-valued properties and **Pick Widget**, the GoRouter **to** field and interactive walkthroughs. | `packages/designer/lib/src/actions/add_actions.dart:13-31`; `packages/designer/lib/src/widgets/designer_tools.dart:164-176`; `packages/core/lib/src/library/library_service.dart:85-87`; `packages/core/lib/src/widgets/widget_picker.dart:131-205`; picker call sites: `widget_context_menu.dart:31`, `group_details.dart:88`, `widget_details.dart:249`, `basic_fields.dart:473`, `nowa_fields.dart:436` | design/add-widgets; design/boards; design/layout; design/components; design/select-and-edit; code/custom-code; integrations/revenuecat, google-maps, admob, show-data; reference/widgets/index, forms, lists, media, navigation; reference/shortcuts; reference/glossary; get-started/editor-tour; guides/design-tips |
| C5 | **Cmd/Ctrl+O is "Go to a widget" in the designer** | In the designer it opens the Library with the search focused (hint **Go to...**; Enter opens the first result, Cmd/Ctrl+Enter inserts it). In code mode it is still the **Search for a file** palette (lists `lib/`, loading one folder level at a time, skipping `.dart_tool`, `.git`, `.gradle`, `.idea`, `.symlinks`, `build`, `ephemeral`, `node_modules`, `Pods`). It stays disabled while a picker or the Shortcuts sheet is open. | `packages/core/lib/src/actions/tab_actions.dart:27-96`; `lib/setup_general_actions.dart:32` | reference/shortcuts; code/files (Search for a file by name); code/code-mode |
| C6 | **Files leaves the designer sidebar; sidebar numbering** | Designer icons in order: **Assistant**, **Library**, **Themes**, **Search**, **Git** (not in the playground or for guests), **Outline** (hidden while the Outline floats), **Api**, plugin panels (**Supabase**), **Router** below the divider. Code mode: **Files** takes the Library's slot (2nd) and the panel opens on it. Keys Cmd/Ctrl+1 to 9 follow the order: 2 = Library (Files in code mode); with Git: Search 4, Git 5, Outline 6 (was 7), Api 7 (was 8), Supabase 8 (was 9); without Git each is one lower. The Files icon and its Cmd/Ctrl+6 are gone in the designer. The click-a-file preview popups (Add Main Collection, Add New Query, Themes file, main.dart options) can't be opened from the designer any more. | `lib/project/side_bar.dart:36-80`; `lib/project/panels/panel_actions.dart:19-26`; `lib/setup_general_actions.dart:44-62`; `packages/core/lib/src/panels/panel.dart:205-209`; `lib/project/panels/files_panel/files_tree_host.dart:266-282` (the only caller of the preview popup) | editor-tour; code/files; code/code-mode; reference/shortcuts; design/assets; logic/models; logic/global-state; integrations/firebase/firestore; integrations/rest-api/index; reference/glossary |
| C7 | **Files panel is a tree (code mode)** | Header **Files** (folder icon). Rows are the whole project (names starting with "." hidden), folders closed. Click opens a file in code mode. A name carries `*` when unsaved, a red problem count, and a git letter. Keys: arrows move focus, Shift+arrows extend the selection, Space selects, Enter opens a file or toggles a folder, Left/Right close or open a folder, F2 renames in place, Delete removes the selection, Cmd/Ctrl+X and V cut and paste. Several selected rows drag into a folder together (lib stays in lib, assets in assets, boards in boards). Right-click (selects the row first): **Remove file** / **Remove N files** (red), **Rename** (one file), **Cut**, **Paste** (into the selected folder), **Copy as path**, **View in folder** (local projects), **Show file content** / **Show files content**; sections can't be removed, renamed or cut; with the View Only role only **Copy as path** and **View in folder** stay. No add buttons in code mode (as in 3.12.5). | `lib/project/panels/files_panel/files_tree_host.dart:34-76,134-148,266-300,440-493,508-530`; `packages/nowa_ui/lib/files/files_tree_view.dart:18-23,160-180`; `lib/project/panels/files_panel/files_panel.dart:25-26,60-100` | code/files; code/code-mode; code/vs-code; code/local-projects; account/workspaces (View Only); reference/shortcuts; design/assets (Rename/Remove file rows) |
| C8 | **Top bar Back and Forward** | Two arrow buttons before the board chip, tooltips **Back** (key hint ⌃-) and **Forward** (⌃⇧-); Ctrl+- and Ctrl+Shift+- on every OS (Control on macOS too). They step through the editors you opened, like a browser (each tab, and which view of a file), grey out with nowhere to go, skip places that were closed or deleted, keep 50 places, and going somewhere new from the middle drops what was ahead. Not shown in code mode, in the Run view or with New UX; the keys still work. After **Open in new tab** they take you back to the board. | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:238-290,310-340`; `packages/core/lib/src/providers/navigation_history.dart:1-120`; `packages/core/lib/src/actions/tab_actions.dart:203-240`; `lib/setup_general_actions.dart:36-38,96-98`; `lib/project/top_bar_mapper.dart:58-62` | editor-tour; design/boards; design/screens; reference/shortcuts |
| C9 | **Boards chip is a searchable picker; Cmd/Ctrl+B** | Chip label = the current board's name, or **Boards** off a board (was "Board"); never dimmed; a click always opens the list (3.12.5: off a board a click went back to the last board). Tooltip "Boards (⌘B)" (Ctrl B on Windows and Linux). List: field **Search boards**, every board in `boards/` and its subfolders whether opened or not (3.12.5 listed only loaded boards), the current one marked, **Rename** and **Delete** icons on hover, "No boards yet" when empty, footer **Create new board**; arrows and Enter pick, a search starts on its first row. **Cmd/Ctrl+B opens this list with the search focused** (3.12.5: jumped to the last board, or to the next one when already on a board). Not available in code mode or the Run view. A board created from the footer or Ctrl/Cmd+Shift+B is named in snake_case: "Login flow" gives `login_flow.board` (3.12.5: `loginFlow.board`); the suggested name is still `board`. | `lib/project/top_bar_mapper.dart:65-146`; `lib/project/top_bar.dart:190-246,290-320`; `packages/nowa_ui/lib/src/components/picker_chip.dart:117-300`; `lib/project/panels/panel_actions.dart:28-40`; `packages/core/lib/src/panels/panel.dart:45-48`; `lib/setup_general_actions.dart:35`; `packages/designer/lib/src/actions/file_actions.dart:12-26,62-67`; `packages/core/lib/src/file_system/naming.dart:158-163` | design/boards; get-started/editor-tour; design/screens; design/outline (a comment); reference/shortcuts; reference/glossary |
| C10 | **Shortcuts sheet and key hints** | Sheet groups and entries: **General** (Save, Copy, Paste, Cut, Undo, Redo, Open action history), **Tab Actions** (Next tab, Previous tab, Close current tab, **Back** ⌃ -, **Forward** ⌃ ⇧ -, **Boards** Ctrl/⌘ B), **Designer** (Zoom In/out, **Add a widget** Ctrl/⌘ K (was "Open widget picker" P), **Go to a widget** Ctrl/⌘ O (was "Open file picker"), Open selection in new file, Container R, Text T, Show/Hide panels `\`), **Widgets** (Group/Ungroup G, **Bring forward** `]`, **Send backward** `[`, **Bring to front** Alt+Ctrl/⌥⌘ `]`, **Send to back** Alt+Ctrl/⌥⌘ `[`, Delete). The sheet's two old slips about K and about `]`/`[` are fixed; **Show/Hide panels** (`\`) is still not bound to anything and **Group/Ungroup** still only groups. New keys: Alt/Option with `]` or `[` goes all the way. Key hints in menus and tooltips list modifiers in Mac order ⌃⌥⇧⌘ (⇧⌘Z, ⌥⌘]); on Windows and Linux "Ctrl Alt ⇧ Win". | `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:13-62`; `packages/designer/lib/src/designer_setup.dart:21-25,47-48`; `packages/core/lib/src/inputs.dart:28-37` | reference/shortcuts; design/select-and-edit; design/boards; get-started/editor-tour |
| C11 | **Widget, board and Outline right-click menus** | Widget menu order: **Play** (when one widget is selected and nothing plays), **Remove** (red), **Replace with...**, **Group**, **Ungroup** (one group selected), **Copy**, **Cut**, **Bring to front** (⌥⌘]), **Bring forward** (⌘]), **Send backward** (⌘[), **Send to back** (⌥⌘[), **Create component**, **Detach** (only on a component instance), **Copy as new widget** (only on a screen or component class instance), **Export as image...**. Same actions as before: Move Down = Bring forward, Move Up = Send backward, Move To Bottom = Bring to front, Move To Top = Send to back; each entry shows its own keys. **Detach** and **Copy as new widget** are hidden when they don't apply (3.12.5 showed them greyed). Entries that can't run are greyed (e.g. **Undo**, **Redo**, **Group**). Board menu: **Undo**, **Redo**, **Save**, **Create a page**, **Paste**. Menus use the new NMenu style, open above the board's canvases, and close when the board pans or zooms or when the button that opened them is clicked again. View Only: **Copy**, **Export as image...**. | `packages/designer/lib/src/menus/widget_context_menu.dart:10-67`; `board_context_menu.dart:7-13`; `packages/core/lib/src/widgets/menu.dart:49-72`; `packages/designer/lib/src/panels/designer_board.dart:84-87`; `packages/designer/lib/src/panels/outline_panel.dart:190-198`; `packages/nowa_ui/lib/src/components/nmenu.dart:1-60` | design/select-and-edit; design/outline; design/components (Detach, Copy as new widget); reference/shortcuts; test/instant-play (Play entry) |
| C12 | **Other menus: label changes** | Tab right-click **Open code editor** (was "Open Code Editor"); route node **Delete route** (was "Delete Route"); Git history **Undo commit** / **Revert commit** (were "Undo Commit" / "Revert Commit"); Themes: **Delete** on the applied theme is greyed with the subtitle **The applied theme** (was a tooltip "Cannot delete applied theme"); Files grid background **New folder** (was "New Folder", unreachable). Other menus (dashboard workspace menu, AI chat agent menu, field menus "Reset to default" / "Set to null") keep their labels but use NMenu: they close when their button is clicked again, no longer close when their own list scrolls, and some open beside or below the button. The "Create login page" walkthrough sub-step "Select 'Group' from the context menu..." lost its highlight. | `lib/tabs_view.dart:165`; `packages/core/lib/src/editors/router_editor/router_block_view.dart:271`; `lib/project/panels/git_panel/git_commit_context_menu.dart:23-25`; `packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart:15`; `packages/core/lib/src/walkthrough/walkthrough_catalogue.dart:1101-1105` | code/git; logic/router; design/themes; code-mode (tab menu is undocumented) |
| C13 | **Git branch picker** | The branch menu opens below the branch row and has a **Search branches** field that filters local and remote-only branches. | `lib/project/panels/git_panel/git_details.dart:227-240,768` | code/git |
| C14 | **Widget variants from Flutter `@Preview`** | A `@Preview` function, static method or constructor is a named variant of the widget it builds (name = the `name:` argument, else the function name in Title Case; `group:`, `size:`). Opening a component on its own shows each variant as a canvas next to it, one column per `group` headed by the group's name; a variant's title shows its name with hover icons **Open in new tab** and **Add to board** (picks a board of that package; none: "This package has no boards yet"). The widget picker shows variants as chips (Tab / Shift+Tab to switch, hover previews) and inserts the picked one at its preview size, naming it "Widget (variant)"; the Library lists variants under their widget; the Outline names such a canvas after the variant. A package's `design/` folder is searched for previews. | `packages/core/lib/src/interpreter/services/variant_service.dart`; `packages/designer/lib/src/widgets/widget_designer.dart:58-140`; `packages/designer/lib/src/panels/canvas_titles.dart:20-36,200-370`; `packages/designer/lib/src/actions/add_variant_to_board.dart:11-38`; `packages/core/lib/src/widgets/widget_picker.dart:300-470`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:46-72`; `packages/designer/lib/src/panels/outline_mapper.dart:82-92` | code/custom-code (new short section); design/components |
| C15 | **Properties: nullable enum dropdowns** | A property whose enum may be empty lists **Default** first; choosing it removes the value so the widget's own default applies, and an unset property shows **Default**. | `packages/core/lib/src/fields/basic_fields.dart:1511-1553` | design/properties |
| C16 | **App-wide restyle, font and version label** | New buttons, list rows, tree rows and menus everywhere; no label changes besides the rows here. The UI typeface is Albert Sans (3.12.5 fell back to the platform font, see U15). Status bar: `v3.13.0-79` (was `v3.12.5-78`). Menus opened from header buttons (e.g. the AI Assistant **Options** menu) open beside the button toward the middle of the window instead of below it. | `packages/nowa_ui/lib/src/components/nbutton.dart`, `nlist_tile.dart`, `ntree_tile.dart`, `nmenu.dart:46-60`; `packages/nowa_ui/pubspec.yaml:33-78`; `packages/core/lib/version.dart:2-3` | every page with a screenshot; get-started/editor-tour (status bar) |
| C17 | **Linux desktop app** | **Download Nowa** dialog: buttons **MacOS**, **Windows**, **Linux** (laptop icon), line "Download Nowa version: {version}"; a button is greyed when the server has no link for it. The Linux file is a 64-bit archive `Nowa-v{version}-linux-x64.tar.gz` (folder `nowa/` with the app, `install.sh` and `com.nowa.nowa.desktop`); `install.sh` copies it to `~/.local/share/nowa` (or `$XDG_DATA_HOME/nowa`) and adds a menu entry "Nowa" (category Development;IDE). CI builds on Ubuntu 24.04 because the Rive library needs glibc 2.38+ and libstdc++ 13+ (the exact minimum distribution is not stated in code). **Updates on Linux** are not installed in place: the update dialog's button reads **Download v{version}** (opens the download link) with **Skip**, instead of **Update to v...** / **Install & Restart** / **Or download manually**. **Embedded preview on Linux** (no in-app web view): the pane shows "Your app is running", "The in-app preview is not available on Linux yet. Open it in your browser instead.", a button **Open in Browser** and the URL. Linux also gets: the window opens maximized, the default **VS code Path** is `/usr/bin`, the shell fallback is bash, the example install path in the SDK dialog is `/home/you/nowa-sdks`, desktop devices with "linux" in their name get the desktop icon, local projects are supported, analytics use the HTTP service. | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8,79-94`; `packages/core/lib/src/services/version_service.dart:17-52`; `lib/dashboard/overlays/update_overlay.dart:26,139-150`; `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:128-131,145-171`; `packages/core/lib/src/runner/vscode.dart:10-16`; `packages/core/lib/src/environment/sdk_paths.dart:27-35`; `packages/core/lib/src/io_utils.dart:13,26`; `lib/window_manager/window_manager_setup_desktop.dart:5`; `packages/core/lib/src/providers/projects_view_provider.dart:64-65`; `scripts/build_linux.sh`; `linux/packaging/install.sh`, `com.nowa.nowa.desktop`; `.github/workflows/linux-build.yml:21-23`; live check `server.nowa.dev/version/latest` 2026-10-09 | get-started/desktop-app; get-started/welcome; account/index; reference/glossary; troubleshooting/known-issues; troubleshooting/index; code/vs-code; test/run; (Firestore test limit is coded for Windows only) |
| C18 | **Local projects: outside edits and pubspec changes** | An edit made in another editor right after Nowa saves is no longer ignored (Nowa remembers a checksum of what it wrote instead of a 2-second window); an atomic save (temp file renamed over the original) counts as a change; new files in a workspace package's `lib/` or `boards/` load; hidden editor temp files such as `.!123!main.dart` are never loaded as project code. After files change outside Nowa (branch switch, editor, agent), the pubspec is re-read and new dependencies load. | `packages/core/lib/src/services/local_file_service.dart:19-29,82-97,195-214,315-345`; `packages/core/lib/src/providers/default_project_observer.dart:17-36`; `packages/core/lib/src/settings/pubspec_manager.dart:78-90`; `packages/core/lib/src/interpreter/packages/package_service.dart:232-240` | code/vs-code; code/local-projects; code/git (panel updates) |
| C19 | **Hand-written Flutter code on the board** | See the list under this table. Summary: more of your own Dart (and third-party apps such as Flutter's compass_app and Wonderous) renders instead of blanking, placeholders are smaller and show wrapped children, `part`/`library` lines survive saving, a hand-written `main()` is left alone, git/path dependencies load, relational and `&&` switch patterns work, `super(name: x)` named arguments are kept. | list below | code/limitations; code/import; code/custom-code; code/index; code/packages; design/localization; test/instant-play; test/problems |
| C20 | **Theme extension colors and text styles in the pickers** | In a color picker, when the project has `ThemeExtension` classes with `Color` fields, the theme list gets tabs: one per extension (named after its class) and a last tab **Material** (the usual primary/surface/... roles, **Show more colors** inside it). The tab opens on the extension of the linked color; with no link on the first extension; a Material role opens **Material**. Picking an extension color links it as `AppColors.of(context).name` (or `Theme.of(context).extension<AppColors>()!.name`). The text-style picker (**Text Styles**) shows a group header per extension with `TextStyle` fields, then a header **Material** over the usual styles (headers only when an extension has text styles). In the **Themes** panel: only variables of type `ThemeData` are listed as themes; a theme written as `ThemeData(...)` keeps the **Default Theme** tab, a theme built by a function (or `copyWith`) shows only its extension tabs; colors that link to another color (`AppColors.primary`) show as the color they read; the "applied theme" is found even when it is built by a function. | `packages/core/lib/src/fields/color_fields.dart:716-890`; `packages/core/lib/src/fields/style_fields/style_fields.dart:41-56,232-300`; `packages/core/lib/src/themes/theme_token.dart`; `packages/core/lib/src/project/env_services/theme_service.dart:26-110`; `packages/core/lib/src/project_environment/env_manager.dart:36-40,114-122`; `packages/core/lib/src/panels/details/theme_panel/theme_panel_details.dart:15-47`; `themes_panel.dart:54-62,214`; `packages/core/lib/src/fields/block_field.dart:830-845,862-880` | design/theme-styles; design/themes; guides/design-tips |
| C21 | **Banners: at most 2, expired ones hidden** | Announcement banners (bottom right) show at most **2** at a time (was 3); an announcement past its expiration date no longer shows as a banner. Dismiss button tooltip "Dismiss announcement" (unchanged). | `packages/core/lib/src/announcements/widgets/notification_banner.dart:9`; `announcement_provider.dart:22-23`; `announcement_service.dart:122` | account/help |
| C22 | **Packages: new built-in packages, nowa_runtime 0.2.0, Page indicator migration, SDK/git/path dependencies** | Built-in (supported) packages added: `gap` ^3.0.1, `flutter_animate` ^4.5.0, `google_fonts` ^8.0.2, `smooth_page_indicator` ^2.0.1. `nowa_runtime` is now ^0.2.0 and **no longer re-exports `smooth_page_indicator`**; the **Page View** widget's dots (`AnimatedSmoothIndicator`, `SmoothPageIndicator`) list the package under **Dependencies** (description "A Package for page indicators") and the Onboarding templates add it. A project that uses the package without having it in `pubspec.yaml` gets a dialog **Page indicator migration**: "nowa_runtime no longer includes smooth_page_indicator. Nowa will add it to your pubspec and import it in {files}." with **Later** and **Migrate**; **Later** brings it back on the next open. A dependency with `sdk:` (e.g. `flutter_localizations`) counts as installed, so "'x' is imported but is not in the pubspec." no longer appears for it (the AI package tool still refuses to add `flutter_localizations`); `git:` and `path:` dependencies are listed and loaded as packages (version column empty or "workspace"); `hosted:` with a custom URL still isn't. | `packages/core/lib/src/interpreter/packages/dart_package.dart:80-95,126-140,195`; `packages/core/lib/version.dart:4`; `packages/nowa_runtime/CHANGELOG.md:1-3`; `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:256-268`; `declaration_info_factory.dart:28-29`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:270-290`; `packages/core/lib/src/migrations/migration_service.dart:126-262`; `packages/core/lib/src/services/templates/built_in/onboarding_template.dart:6`, `animated_onboarding_template.dart`; `packages/core/lib/src/interpreter/packages/package_service.dart:57-70,363-375`; `packages/ai/lib/src/tools/packages_tool.dart:164-169` | code/packages; design/localization; reference/widgets/navigation (Page View); design/templates; code/limitations; test/problems |
| C23 | **`.nowa/settings.json` is no longer rewritten by every release** | Opening a project raises `.nowa/settings.json` `version` only up to `projectFilesVersion` (3.0.11), the newest version a migration checks, never to the app version, so opening a project in a newer Nowa no longer shows that file as modified in Git. The `image_picker` cleanup now runs once, for projects older than 1.6.2. | `packages/core/lib/version.dart:6-11`; `packages/core/lib/src/plugin.dart:155-168` | code/import (".nowa folder" bullet); code/git (optional) |
| C24 | **index.html with an inlined Flutter bootstrap is left alone** | The `index.html` migration only replaces a legacy loader: a file that contains `flutter_bootstrap.js`, `{{flutter_js}}` or `{{flutter_bootstrap_js}}` is kept. | `packages/core/lib/src/migrations/migration_service.dart:103-120` | publish/web (optional) |
| C25 | **Board and Play details** | Playing a screen or component from its title also selects it. Snap guides line up with widgets at any zoom. A screen on the board is clipped to its frame (overflow, error boxes and blurs no longer paint over neighbours). The home widget of the board's app is drawn on the theme's surface color (Material 2 themes no longer show a grey canvas). | `packages/designer/lib/src/panels/canvas_titles.dart:322-336`; `packages/designer/lib/src/design_experience/drag_rule.dart:265-271`; `packages/core/lib/src/board/board_canvas.dart:225-230`; `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:160-164` | test/instant-play; design/boards; design/select-and-edit |
| C26 | **AI chat: no UI change** | The agent chip reads the chat session once (a crash fix when a project is reopened while the entitlement poll runs). | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:962-975` | none |
| C27 | **Version-pinned sentences** | Four sentences in the docs name 3.12.5; the code behind three of them is unchanged in 3.13 (Google Sign-In `google_sign_in` 7.x note, Deep Link scheme note, the two-entry `CFBundleURLTypes` note: `packages/data/lib/src/firebase/auth/fb_auth_manager.dart`, `packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart` are not in the diff; `google_sign_in_package_config.dart` only changed a button), the fourth (shortcuts sheet slips) is fixed (C10). | see C10 | integrations/firebase/auth; integrations/deep-links; reference/shortcuts |

### C19 detail: what changed for hand-written code on the board

User-visible results, with refs (all `packages/core/lib/src/...` unless noted):

1. **Switch patterns.** Relational patterns (`> 5`, `>= x`, `< x`, `<= x`, `== x`, `!= x`) and `&&` patterns are supported (`interpreter/block_tree.dart:5093-5160`, `interpreter/visitors/ast_to_block_visitor.dart:1551-1558`). Still unsupported: a `when` clause (`:1517`), list and map patterns (`:1582`), named fields in a record pattern. A promoted `is` check now narrows member lookups (`x is T && x.field`, `block_tree.dart:3805-3835`), so `operator ==` no longer reports undefined fields.
2. **`super(...)` in an initializer list.** The named arguments of `super(child: x)` are kept and read like `super.child` (`interpreter/declaration_runtime.dart:1727-1735,1823-1835`). `assert(...)` still doesn't run, positional `super` arguments are skipped.
3. **Packages.** `git:` and `path:` dependencies load as packages (`interpreter/packages/package_service.dart:57-70`); `sdk:` dependencies count as installed (`:363-375`); dependencies added to `pubspec.yaml` outside Nowa load after the next file change (`providers/default_project_observer.dart:17-36`). `flutter_animate`, `gap`, `google_fonts` and `smooth_page_indicator` are bridged built-ins (C22). Extensions of a package on SDK types still run as mocks (the "run from source" attempt was reverted in `9364d2d16`).
4. **Files Nowa writes.** `library;`, `part '...';` and `part of '...';` lines are kept, and a part file gets no generated imports (`interpreter/block_tree.dart:6974-7060`, `interpreter/visitors/ast_to_block_visitor.dart:190-232`). Typedefs load first but keep their written order (`52539c8a1`). A hand-written `main()` (no `@NowaGenerated`) is not rewritten with `sharedPrefs` (`project/env_services/main_service.dart:77-86`).
5. **Placeholders.** An unsupported package widget draws as a small crossed box sized to its label, label text 10 px, thin lines (`interpreter/mock_dynamic.dart:157-176`); it no longer fills the space it is given (3.12.5 filled up to 400 px). A package widget that wraps a child (`Animate(child: page)`), or an effect called on a widget (`page.animate().fade()`), shows the child instead of a placeholder (`mock_dynamic.dart:92-140`). A mocked or failed widget in a `sliver:` or `slivers:` slot is drawn as a sliver (`mock_dynamic.dart:36-70`). Unset nullable enums, colors, numbers and flags mock to `null` so the widget's own default shows (`interpreter/mock.dart:287-297`). A mocked image is 48 x 48 px when it sets no size and shows a placeholder at its size when it can't load, instead of a debug error box (`interpreter/mock.dart:118-150,323-331`); an image path built by interpolation from real values is a real image (`mock.dart:184-190`). A project's own `LocalizationsDelegate` no longer blanks the board: a delegate that fails to load logs "Could not load {Type}: {error}" in Logs and the board keeps drawing (`localization/localizations_class_instance.dart:44`).
6. **Objects Nowa can't construct.** A project class that extends a Flutter class Nowa can read but not build (the Problems warning "'X' extends 'Y', which Nowa can read but cannot construct." is unchanged: `interpreter/block_problems.dart:360`) is now replaced, where Flutter needs the parent type, by what it wraps (for example an inner `ImageProvider`) or by a placeholder of the parent type (`interpreter/declaration_internal.dart:211-236`), so the screen keeps drawing.
7. **Smaller interpreter fixes** (no label impact; mention only if the writers want a "what works" line): objects whose class declares `call` are called like functions; methods with default values can be torn off; a `late` field is filled from the initializing formal that names it; a function can reassign its own parameters; a local function can call itself; `firstWhere(orElse:)` runs the interpreted callback; `nonNulls`, `firstOrNull`, `lastOrNull`, `singleOrNull`, `elementAtOrNull` work on lists of unknown element type; list literals with spreads of iterables hold their elements; a project extension's members are attached with it; mixin statics such as `ServicesBinding.instance` resolve; `lerpDouble` and `Vertices` exist; asset names in bundle form `packages/<pkg>/<path>` resolve (`interpreter/libraries/nowa_image.dart:116-126`); bare `Image.asset` paths resolve in the active package.
8. **Screens are clipped to their frame** on the board (C25).

### Reviewed and left out (not user-facing)

CI and release plumbing (`.github/workflows/linux-build.yml`, `scripts/build_linux.sh` except as C17), tests (`packages/*/test`, the removed `wonderous_project_test`), `docs/*.md` of the Nowa repo (`design_system.md`, `interpreter_limitations.md` (stale: still says git/path dependencies and callable classes are unsupported), `pure_ui_manifesto.md`), the `packages/nowa_ui/design/*.dart` previews and boards, removal of the debug-only **Libraries** panel, removal of the `context_menus` package, library generator changes, `print every error a canvas boundary takes in debug`, the interpreted `ChangeNotifier` recursion fix (`be9b89818`), and `nowa_ui`'s pubspec cleanup beyond the font.

## 4. Per-page edit list

Paths are under `/home/user/docs/docs`, in sidebar order. `L52` is the line when I read the page (9 Oct); other agents may be
editing, so the quoted opening words are the stable handle. "Now" is what the page says; "3.13" is what it must say. C-numbers
are rows of the change table (part 3), which carries the labels and code refs; refs are repeated here only where the table
does not have them. Ids such as `design-boards-1` are screenshots and videos, listed in part 5.

**Words to change on every page** (apply these first, then do the page edits):

| Now | 3.13 |
|---|---|
| "Widgets panel", "Widgets icon", "Page" and "Component" tiles | **Library** (icon 2, Ctrl/Cmd+2). Rows, not tiles; no Page/Component switch (C1, C2). |
| "widget picker", when it means what Ctrl/Cmd+K or the toolbar **Widget** tool opens | the **Library** with its search focused in add mode (hint **Add...**) (C4). Keep "widget picker" only for the dialog (below). |
| "widget picker" for **Replace with...**, the **+** of an empty widget slot, widget-valued properties and **Pick Widget**, the GoRouter **to** field | unchanged: still the dialog titled **Search for a widget** with **Request a Widget**, the chips **All**, **BuiltIn**, **Components** and a preview with **Open Documentation** and **Dependencies** (C4). |
| "Files panel" / "Files icon" in the designer, "Add to library" (+), "Add board" (+), "Import asset" | **Library** > **Add** (+) menu, **Upload Assets...**, and **Create new board** in the Boards chip. **Files** exists only in code mode (C3, C6, C7). |
| "Board chip", "dimmed Board chip" | **Boards** chip: shows the board's name, or **Boards** off a board; never dimmed (C9). |
| **Move Up**, **Move Down**, **Move To Top**, **Move To Bottom** | **Send backward**, **Bring forward**, **Send to back**, **Bring to front** (C11). |
| Sidebar numbers: Files 6, Outline 7, Api 8, Supabase 9 | Library 2 (Files only in code mode), Outline 6, Api 7, Supabase 8 (C6). |
| "macOS and Windows" desktop app | macOS, Windows and Linux (C17). |
| Mac key order in menus and tooltips | ⌃ ⌥ ⇧ ⌘, for example ⇧⌘Z, ⌥⌘] (C10). |

---

### Get started

#### get-started/editor-tour.md (C1 C4 C6 C8 C9 C10 C16)

| Where | 3.13 |
|---|---|
| L10 image `get-started-editor-tour-1` | Shows the old sidebar (Widgets, Files), top bar and status bar `v3.12.5-78`: retake (part 5). |
| L29-30 "Board chip \| Shows the current board. Click it to switch boards..., When a screen is open on its own, the chip is dimmed and takes you back to the board." | Rename the row **Boards chip**. It shows the current board's name, or **Boards** when no board is open (tooltip "Boards (⌘B)", on Windows and Linux "Boards (Ctrl B)"). Click it or press Ctrl/Cmd+B to open a list with a **Search boards** field: arrows and Enter pick, hover a row for **Rename** and **Delete**, the footer is **Create new board**, and "No boards yet" shows when empty. It lists every board in `boards/` and its subfolders, opened or not. Delete the sentence about dimming: the chip is never dimmed. To leave a screen opened on its own, use **Back** or pick a board in the list. (C9; `lib/project/top_bar_mapper.dart:65-146`, `packages/nowa_ui/lib/src/components/picker_chip.dart`) |
| New row before the Board chip | **Back** and **Forward** arrows (tooltips **Back** with ⌃-, **Forward** with ⌃⇧-; keys Ctrl+- and Ctrl+Shift+- on every OS). They step through the editors you opened, like a browser, grey out with nowhere to go, keep 50 places and are not shown in code mode or the Run view (the keys still work). Say so next to L105, where code mode and Settings have their own **Back** button: that is a different button. (C8; `top_bar_view.dart:258-271`, `navigation_history.dart:26`) |
| L41 "Click an icon to open its panel... The playground has no **Git** icon, so there the numbers after **Search** are one lower." | Keep. A public project opened as a guest has no **Git** icon either (`lib/project/side_bar.dart:64`, `!gProject.project.isSandboxed`). |
| L46 "\| **Widgets** \| Your screens (**Page**) and components (**Component**). Search, open, and drag them onto the board. \| 2 \|" | `**Library** \| Your screens, components, models and more, Nowa's built-in widgets, your packages' widgets and your assets. Search, add, open and drag them onto the board. \| 2 \|` Links: [Add widgets](../design/add-widgets.md), [Build reusable components](../design/components.md). (C1, C2) |
| L50 "\| **Files** \| Your project files: `lib`, `boards` and `assets`. \| 6 \|" | Delete the row. Add below the table: "In code mode, **Files** (the folder icon) takes the Library's place, second in the strip and also Ctrl/Cmd+2; it shows the whole project." (C6; `side_bar.dart:36-80`, `panel.dart:205-209`) |
| L51-53 numbers 7, 8, 9 for **Outline**, **Api**, **Supabase** | 6, 7, 8. **Search** stays 4 and **Git** 5. |
| L70 "\| **Widget** \| Ctrl/Cmd+K \| Opens the widget picker. \|" | "Opens the **Library** with its search ready to add a widget." (C4) |
| L87 "The Nowa version." | Text is fine. The version now reads `v3.13.0-79` (screenshot only). |
| L105 "**Code mode:** `<>` switches to a code editor. The **Files** panel opens with the whole project tree" | Still true. Add "in place of the Library". |
| L115-119 welcome tour table: "\| **Screens & Components** \| The **Widgets** icon. \|" | "The **Library** icon." The step title and text are unchanged ("Explore all the project screens and components."). **Widget Palette** keeps its title and still points at the **Widget** tool. (C1; `onboarding_step.dart:108-112`) |
| L125 "Click **Open board**, **Browse widgets** or **Open code mode**" | Labels unchanged. **Browse widgets** now opens the Library. Optional: say so. (`empty_workspace.dart:41-45`) |

#### get-started/welcome.md (C17 C1)

| Where | 3.13 |
|---|---|
| L46 "**The desktop app** for macOS and Windows." | "for macOS, Windows and Linux." (C17) |
| L55 "\| **Screen** \| A page of your app. The **Widgets** panel lists screens as **Page**. \|" | "The **Library** lists screens." (No "Page" label any more.) |

#### get-started/desktop-app.md (C17)

| Where | 3.13 |
|---|---|
| L3 description, L5 keywords, L8 "for macOS and Windows" | Add Linux (keywords: `Linux`, `tar.gz`, `install.sh`). L8 "It also installs updates from inside the app" is true for macOS and Windows only (below). |
| L16 "click **MacOS** or **Windows**. The dialog also shows the version you are getting." | "click **MacOS**, **Windows** or **Linux**." The dialog line reads "Download Nowa version: {version}". A button is greyed when the server has no link for it. The live server answered `3.13.0` with a Linux link on 9 Oct, so **Linux** is enabled. (`download_nowa_dialog.dart:8,79-94`) |
| L17 "Open the downloaded installer and follow the steps for your system." | Keep for macOS and Windows. New Linux steps: the file is `Nowa-v{version}-linux-x64.tar.gz` (64-bit). Extract it (folder `nowa/`), run `install.sh` in it. The script copies the app to `~/.local/share/nowa` (or `$XDG_DATA_HOME/nowa`), puts the icon in the user's icon folder and adds **Nowa** (Development, IDE) to the applications menu; start Nowa from there. Run the script again to reinstall; it replaces the old copy. (`linux/packaging/install.sh`, `com.nowa.nowa.desktop`, `.github/workflows/linux-build.yml:46-56`) |
| L19 CAPTURE comment `get-started-desktop-app-1` | Now "with the MacOS, Windows and Linux buttons". |
| L29 "When a new version is out, Nowa shows **A new version of Nowa is available**. Click **Update to v…**... **Install & Restart**..." | Add: on Linux the dialog has **Download v{version}** (opens the download link) and **Skip**; Linux does not update in place, so download the new archive and run `install.sh` again. There is no **Or download manually** or **Install & Restart** on Linux. (`update_overlay.dart:139-150`, `version_service.dart:39`) |
| L31 "If Nowa says **Version out of date**... Click **Download**, choose your system in the **Download Nowa** dialog" | Fine (Linux is in the dialog now). |
| L72 "set **VS code Path**... It starts with the usual install location." | Fine. The Linux default is `/usr/bin` (see code/vs-code.md). |
| New short note | The embedded preview on Linux opens in the browser (see test/run.md); the window opens maximized. (C17) |
| Unsettled | The lowest Linux distribution/glibc is not stated in code. CI builds on Ubuntu 24.04 because the Rive library needs glibc 2.38+ and libstdc++ 13+ (`linux-build.yml:19-20`). Say "built on Ubuntu 24.04" at most; see part 6. |

#### get-started/mobile.md

No edit. The phone layout still uses the old Widgets panel (`lib/project/project_dashboard.dart:49`), so its text stays true. Its "Open in Editor" menu entry is now "Open in editor" (`widgets_context_menu.dart`), which the page does not quote. Retake the screenshot only for D20.

#### get-started/first-app.md, playground.md, create-account.md, cloud-and-local.md

No text edit found (no old labels). `cloud-and-local.md` calls the desktop app a macOS/Windows thing nowhere. Screenshots: part 5.

---

### Design your app

#### design/index.md (C1 C4)

| Where | 3.13 |
|---|---|
| L25 image `design-index-1` | Shows the whole editor with the old sidebar: retake. |
| L29 "\| **Widgets** panel, left sidebar \| Lists your screens and components. Drag one onto the board. \|" | "**Library** panel, left sidebar \| Lists your screens, components and widgets, plus Nowa's built-in widgets, your packages and your assets. Search it, or drag a row onto the board." |
| L61 "[Add widgets]...: the widget picker, tools, drag and drop, paste." | "the Library search, tools, drag and drop, paste." |

#### design/boards.md (C8 C9 C10 C1 C4 C25)

| Where | 3.13 |
|---|---|
| L12 "1. Click the board chip in the top bar. It shows the name of the current board. The menu lists every board in your project." | "Click the **Boards** chip in the top bar, or press Ctrl/Cmd+B. It shows the current board's name, or **Boards** when you're not on a board. Type in **Search boards** to filter, or use the arrows and Enter." The list shows boards in subfolders of `boards/` too. |
| L14 "To make a new one, click **Create new board**, type a name and click **Submit**." | Unchanged (footer of the list, dialog title **New Board**, suggested name `board`). |
| L15 "hover its row and click the **Rename** or **Delete** icon." | Unchanged (tooltips **Rename**, **Delete**). |
| L17 "When you create a board, Nowa turns the name you type into one word, so **Login flow** becomes `loginFlow`." | "Nowa writes the name in snake_case: **Login flow** becomes `login_flow`, saved as `login_flow.board`." (`file_actions.dart:62-67`, `naming.dart:158-163`) Applies to Ctrl/Cmd+Shift+B too. |
| L21 "<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd> jumps back to the board you were last on, and on a board it switches to the next one." | "Ctrl/Cmd+B opens the **Boards** list with the search focused." It does nothing in code mode and in the Run view (the chip is not there). |
| L23 image `design-boards-1` | Shows the old list (no search field): retake. |
| L53 image `design-boards-2` | Old top bar and sidebar: retake. |
| L55 "Click the dimmed **Board** chip in the top bar, or press Ctrl/Cmd+B, to come back." | "Click **Back** in the top bar (or press Ctrl+-), or open the **Boards** chip and pick the board. After **Open in new tab**, **Back** takes you to the board." (C8) |
| L67 "\| **Widget** \| Ctrl/Cmd+K \| Opens the widget picker. See [Add widgets]. \|" | "Opens the Library to add a widget." |
| L73 "A screen or component stays in your project and in the **Widgets** panel, so you can drag it back." | "...and in the **Library**..." |
| L74 "**Delete from the project.** In the **Widgets** panel, right-click the screen or component and choose **Delete**." | "In the **Library**, right-click the screen or component and choose **Delete**. Nowa asks "Are you sure you want to delete {name}?" (**Cancel**, **Yes**), and if something uses it, lists the places and asks again." (C3; `library_host.dart:216-232`) Link anchor `components.md#manage-screens-and-components` must keep existing. |
| L89 "[Add widgets]...: fill a screen with the widget picker." | "...with the Library." |
| Optional new fact | A screen on the board is clipped to its frame, so overflow, error boxes and blurs no longer paint over its neighbours (C25; `board_canvas.dart:225-230`). |

#### design/screens.md (C1 C3 C9)

| Where | 3.13 |
|---|---|
| L73 "...The note is saved in the screen's code and shows in the widget picker when you pick the screen." | "...shows in the Library's details card (the first 4 lines) and in the widget picker dialog." (C2) |
| L75 "Click the dimmed **Board** chip in the top bar to go back." | "Click **Back** in the top bar, or open the **Boards** chip and pick the board." |
| L81 "To delete the screen itself, open the **Widgets** panel, choose **Page**, right-click the screen and choose **Delete**. If other places use it, Nowa lists them and asks you to confirm." | "Open the **Library**, find the screen under **Project**, right-click it and choose **Delete**. Nowa asks "Are you sure you want to delete {name}?" then, if others use it, lists them and asks to confirm." |
| L85 "fill the screen with the widget picker" | "with the Library" |
| L12, L74 | Unchanged (**Screen** tool, **Create a page**, **Copy as new widget** all still exist). |

#### design/components.md (C1 C2 C3 C4 C11)

| Where | 3.13 |
|---|---|
| L5 keywords "widgets panel" | "library". |
| L27 "Drag it from the **Widgets** panel (switch to **Component**) onto the board or into a screen." | "Drag it from the **Library** onto the board or into a screen. Find it under **Project**; the default filter already lists components." |
| L28 "Open the widget picker with Ctrl/Cmd+K and choose from **Components**." | "Press Ctrl/Cmd+K, type its name and press Enter. The Library puts it where your pointer last was." Mention the **Filter** > **Components** kind. |
| L35 "Drag it from the **Widgets** panel onto empty board space and click its title, or double-click it in the **Widgets** panel to open it on its own." | "...or double-click it in the **Library** (or press Enter on it) to open it on its own." |
| L38-39 **Detach**, **Copy as new widget** | Still right. They show only where they apply (an instance; a screen or component) and are no longer shown greyed. (C11) |
| L56-68 "Manage screens and components" (whole section) | Rewrite for the Library. Facts: icon 2 / Ctrl+2; rows under **Project** with folders; header buttons **Add** (+) and the list/tree toggle (tooltips "Show as a list" / "Show as a tree"); search hint **Go to...**; **Filter** menu headed **Show** (**Widgets** default, **Everything**, **Screens**, **Components**, **Models**, **Global states**, **Classs**, **Functions**, **Enums**, **Variables**, toggle **Private**); a click or the arrow keys open the details card (live preview, name, "Kind · location", first 4 lines of the doc comment), **Esc** puts it away; double-click or Enter or right-click **Open** opens it on its own; right-click **Insert** (⌘⏎) or Cmd/Ctrl+Enter inserts it on the open board; right-click **Rename** (F2, edits in place, Enter saves; Nowa updates every place that uses it and renames the file when it is named after the widget); right-click **Delete** (red; "Are you sure you want to delete {name}?" with **Cancel** and **Yes**; if used, the list of places and **Remove**; the file goes too when the widget is alone in it; Ctrl/Cmd+Z undoes while the Library has focus); **Show in code**. Remove: the **Page**/**Component** switch, Ctrl/Shift-click multi-select, **Open in Editor**, "press Delete (Backspace)", the grid/list sentence. There is no Delete-key action and no multi-select in the Library. (C2, C3; `library_panel.dart:544-573`, `library_host.dart:135-262`) |
| L60 image `design-components-2` | Shows the old panel and its menu: retake with the Library and its right-click menu. |
| L73 "drop your components in from the widget picker" | "from the Library" |

#### design/add-widgets.md (C3 C4 C1) — the biggest design rewrite

| Where | 3.13 |
|---|---|
| L3 description, L5 keywords "widget picker, widget palette, ... search for a widget" | "Add widgets with the Library search..."; keep `ctrl k`, `request a widget`, `add missing dependencies`; add `library`. |
| L8 "Add a widget in seconds: press Ctrl/Cmd+K, type what you want and press Enter." | Still true. |
| L10-15 section "Add a widget with the widget picker" and steps 1-4 | Retitle "Add a widget from the Library". 1. Click **Widget** in the toolbar or press Ctrl/Cmd+K. The **Library** opens (the side panel switches to it) with the search focused; the field reads **Add...**. 2. Type part of a name. Results are grouped by source (**Project**, **Packages**, **Built-in**; **Assets** if on) with a count; Nowa's own widgets come first, then names that start with what you typed, then A to Z. The first result is highlighted as you type. **Filter** (default **Widgets**) and the source chips narrow the search. A row **Show N more of other kinds** reveals the rest; "No matches" when empty. 3. Move through the list with the arrow keys; the details card shows a live preview, the name, "Kind · location" and the first 4 lines of the description. 4. Press Enter or double-click to insert the highlighted result where your pointer last was on the board; the keys go back to the board. Cmd/Ctrl+Enter opens its source instead. Esc clears the search; Esc again hands the keys back to the board. Needs an open screen, component or board, else the snackbar "Open a screen, a component or a board to insert into". (C2, C3, C4; `add_actions.dart:13-31`, `library_panel.dart:527-575,622-660`) |
| L13 chips **All**, **BuiltIn**, **Components**; L14 "**Open Documentation.** link" | Belong to the dialog only. The Library has chips **Project**, **Packages**, **Built-in**, **Assets** and no Open Documentation link (the details card is not clickable). Move the dialog description to the new section for slots and properties (below). |
| L17 image `design-add-widgets-1` | Shows the dialog: retake with the Library (search focused, results, details card). |
| L19-26 table "Click or press Enter \| Drag from the list" and "While you drag, the picker closes" | Columns become "Enter, double-click (add mode), Cmd/Ctrl+Enter, right-click **Insert**" and "Drag a row onto the board". Row 1 (where it lands): the first lands at the last spot your pointer was on the board; a drag where you drop it. Row 2 (missing package): the first opens **Add Missing Dependencies**; a drag does not ask (the code adds no prompt on drop; what happens next is unverified, part 6). Replace "the picker closes": the Library stays open while you drag. (`library_actions.dart:76-92`, `library_service.dart:121-127`) |
| L28-30 `design-add-widgets-video` | Records Ctrl+K opening the dialog: re-record. |
| L32-34 "Add a widget that needs a package" | The details card does not list **Dependencies**. Insert (Enter, double-click, Cmd/Ctrl+Enter, **Insert**) opens **Add Missing Dependencies** ("This widget requires the following dependencies"; **Cancel**, **Add**) then places the widget. The dialog picker still lists **Dependencies** in its preview. |
| L43-47 "Drag screens, components and files" bullets | **Widgets panel** bullet becomes **Library**: drag a screen or component row onto the board; a screen always becomes its own board item; drop a component inside a screen to use it there. **Files panel** bullet: delete (the Files tree is code mode only; Library rows replace it). **Assets** bullet: "from the Library's **Assets** source" (turn the chip on). |
| L58-60 "Put a widget inside a container": "pick a widget from the same picker... Any property that takes a widget... opens this picker too, and so does **Replace with...**" | These open the widget picker dialog, not the Library (C4). Describe it here: title "Search for a widget", chips **All** / **BuiltIn** / **Components**, preview with description, **Open Documentation** and **Dependencies**, variant chips (Tab / Shift+Tab to switch). Click or Enter picks, Esc closes. |
| L73 "Can't find a widget?... click **Request a Widget** in the picker's search bar" | **Request a Widget** exists only in the dialog (`widget_picker.dart:151-156`). Say: open the dialog (for example with the **+** of an empty widget slot) and click it. The Library has no such link. |
| L83 next steps | Fine. |

#### design/select-and-edit.md (C11 C10 C1)

| Where | 3.13 |
|---|---|
| L5 keywords "reorder, move up, move down" | add "bring forward, send backward, bring to front, send to back". |
| L72-80 right-click table | Order and labels in the menu: **Play** (one widget selected, nothing playing), **Remove** (red), **Replace with...**, **Group**, **Ungroup** (one group selected), **Copy**, **Cut**, **Bring to front** (⌥⌘]), **Bring forward** (⌘]), **Send backward** (⌘[), **Send to back** (⌥⌘[), **Create component**, **Detach** (instance of a component only), **Copy as new widget** (screen or component instance only), **Export as image...**. Each entry shows its own key. Entries that cannot run are greyed. Hidden, not greyed, when they do not apply: **Detach**, **Copy as new widget**. (`widget_context_menu.dart:10-67`) |
| L75 "**Replace with...** \| Opens the widget picker..." | Still the dialog picker. Say "the widget picker dialog". |
| L78-79 rows "**Move Up**, **Move Down**" / "**Move To Top**, **Move To Bottom**" | Replace with: "**Bring forward**, **Send backward** \| one place later / earlier among siblings. Keys Ctrl/Cmd+] and Ctrl/Cmd+[." and "**Bring to front**, **Send to back** \| to the last / first place. Keys Alt/Option+Ctrl/Cmd+] and Alt/Option+Ctrl/Cmd+[." (`designer_setup.dart:21-25`; same actions as the old entries: Move Down = Bring forward, Move Up = Send backward, Move To Bottom = Bring to front, Move To Top = Send to back.) |
| L82 "Earlier means higher in a **Column**... The menu shows the same ] hint next to both **Move Up** and **Move Down**. The keys in the table are the real ones." | Keep the first sentence in the new words (later = lower in a Column, further right in a Row, in front in a Stack). Delete the 2nd and 3rd sentences: the hint slip is fixed. |
| L84 image `design-select-and-edit-2` | Old menu: retake. |
| L86 "Right-click empty board space for **Undo**, **Redo**, **Save**, **Create a page** and **Paste**." | Right (`board_context_menu.dart:7-13`); entries that cannot run are greyed. |
| L98 "Each area keeps its own history: every board, the **Widgets** panel, and a screen opened on its own." | "...the **Library** (history name "Library")..." In code mode **Files** has its own. |

#### design/properties.md (C15)

| Where | 3.13 |
|---|---|
| L46 table row "\| A choice \| A dropdown of the allowed values. \|" | Add: "When the property may be empty, the list starts with **Default**. Choose it to remove the value, so the widget's own default applies; an unset property shows **Default**." (`basic_fields.dart:1511-1553`, unchanged text at L66-68 for **Reset to default** and **Set to null**.) |

#### design/layout.md (C4)

| Where | 3.13 |
|---|---|
| L18 "You can also add an empty **Group** from the widget picker (Ctrl/Cmd+K)." | "...from the Library (Ctrl/Cmd+K)." |
| L79-80 "**Wrap**: add it from the widget picker." / "**List View**: add it from the widget picker..." | "...from the Library (Ctrl/Cmd+K)." |

#### design/outline.md (C9 C11)

| Where | 3.13 |
|---|---|
| L17 CAPTURE comment `design-outline-2` "the dimmed Board chip in the top bar" | "the Boards chip (not dimmed) and the Back button". |
| L38 "Right-click a widget row for the same menu as on the board." | Right. |
| L32 "Dimmed row" | Unrelated (a branch row). |

#### design/themes.md (C12 C20)

| Where | 3.13 |
|---|---|
| L17 "Each theme is a variable in `lib/globals/themes.dart`" | Add: only variables of type `ThemeData` are listed as themes. A theme built by a function still counts, and the applied theme is found even then. (`theme_service.dart:26-110`) |
| L43 "**Delete**: ... The **Active** theme can't be deleted, so apply another theme first." | "**Delete** is greyed out on the applied theme and shows **The applied theme** under it, so apply another theme first." (`themes_context_menu.dart:15`) |
| L102 "If a theme has custom extensions... the editor shows a **Default Theme** tab plus one tab per extension, named after its class." | "...one tab per extension. A theme written as `ThemeData(...)` also keeps a **Default Theme** tab first; a theme built by a function or `copyWith` shows only its extension tabs." Colors that point to another color (`AppColors.primary`) show as the color they read. "Nowa supports up to 8 theme extensions" is untouched by the diff. (`theme_panel_details.dart:15-47`) |

#### design/theme-styles.md (C20)

| Where | 3.13 |
|---|---|
| L12-16 "Use a theme color" steps and the paragraph "The list shows the colors of your **Active** theme." | Add: with `ThemeExtension` classes that hold `Color` fields, the theme list in the color picker has one tab per extension (named after its class) and a last tab **Material**, which holds the usual roles and **Show more colors**. The picker opens on the extension of the linked color, on the first extension when nothing is linked, and on **Material** when a Material role is linked. Picking an extension color links it as `AppColors.of(context).name` (or `Theme.of(context).extension<AppColors>()!.name`). With no extension classes nothing changes. (`color_fields.dart:716-890`) |
| L26-30 "Use a theme text style" | Add: **Text Styles** shows a group header per extension that has `TextStyle` fields, then a **Material** header over the usual styles; headers show only when an extension has text styles. (`style_fields.dart:41-56,232-300`) |
| L18 image `design-theme-styles-1` | Restyle only; retake for D20. |

#### design/assets.md (C1 C2 C3 C6)

| Where | 3.13 |
|---|---|
| L5 keywords "files panel" | "library". |
| L12-14 "1. Click **Files** in the left sidebar and find the **assets** row. 2. Click the upload icon (**Import asset**)... 3. Click a file to see a preview. Double-click it to open it." | "1. Open the **Library** (Ctrl/Cmd+2). 2. Click **Add** (+) and choose **Upload Assets...**, or turn on the **Assets** chip, right-click the `assets` folder (or a folder in it) and choose **Upload assets...**. Pick one or more files. They go into `assets/` (into the highlighted assets folder if one is highlighted). 3. Click a file for a preview card; double-click or press Enter to open it." (`library_host.dart:176-188`) |
| L18 image `design-assets-1` | Old Files panel: retake with the Library's **Assets** source. |
| L32 "You can drag files between folders inside **assets** to move them." | Still true in the Library (a row dropped on a folder moves it; assets stay in assets). |
| L61-63 "Drag a file from **assets** onto the board" | "...from the Library's **Assets** source". |
| L76-88 "Rename, remove and find files": intro "Right-click a file in **assets**. Select several files first..." and the table | Library menu for an asset: **Open** (⏎), **Rename** (F2, in place), **Delete** (red; asks "Are you sure you want to delete…?"; Ctrl/Cmd+Z undoes while the Library has focus), **Show in code**; **Upload assets...** on folders. **Copy as path**, **View in folder** (local projects) and **Show file content** stay in code mode's **Files** tree, next to **Remove file** / **Remove N files** and **Cut** / **Paste**. No multi-select in the Library. (C3, C7) |

#### design/templates.md (C3)

| Where | 3.13 |
|---|---|
| L56 "**Files** panel: click **+** on the **lib** row (**Add to library**) and choose **New Widget...**. The same picker opens, and the new file opens on its own instead of landing on a board." | "**Library**: click **Add** (+) and choose **New Widget...**." Rest unchanged (the template picker opens; the new file opens in its own tab). (`add_lib_menu.dart:31-41`) |
| Any text on templates that add `smooth_page_indicator` | The Onboarding templates now add that package themselves (C22); see code/packages.md. |

#### design/localization.md (C22)

| Where | 3.13 |
|---|---|
| L14 "Nowa doesn't support the `flutter_localizations` package, so Nowa AI writes its own localization code instead of adding it." | Still right for Nowa AI (its package tool refuses `flutter_localizations`: "flutter_localizations is not supported by nowa, use a different approach.", `packages/ai/lib/src/tools/packages_tool.dart:164-169`). Add: a project whose pubspec already lists it with `sdk: flutter` has it counted as installed, so Problems no longer reports "'flutter_localizations' is imported but is not in the pubspec." (`package_service.dart:365-367`, commit `3ec7bfa77`). Nothing in the diff makes the board render its classes; do not claim support. |

#### design/fonts-icons.md, responsive.md

No edit found.

---

### Work with code

#### code/files.md (C2 C3 C5 C6 C7) — heavy rewrite

In 3.13 the designer has the **Library** (add, rename, move, delete) and code mode has the **Files** tree (browse, cut/paste,
remove). The old "On the board / In code mode" table becomes "Library / Files". The sectioned tree with **Add to library**,
**Add board** and **Import asset** buttons is built but never shown (C6, C7).

| Where | 3.13 |
|---|---|
| L3 description, L5 keywords ("Files panel, file tree, Add to library, Add board, Import asset, New Folder") | Reword: Library in the designer, **Files** in code mode, **Add**, **Upload Assets...**, **New Folder...**. |
| L8 "The **Files** panel is where you browse your project, create Dart files, import assets, and rename or move things." | Split: the **Library** creates, renames, moves and deletes; **Files** (code mode) browses the whole project and also renames, cuts, pastes and removes. |
| L10-12 "Open the Files panel: Click the folder icon (**Files**) in the left sidebar. Code mode opens it for you." | "**Library**: click the Library icon, or press Ctrl/Cmd+2 (designer). **Files**: click `<>`; the folder icon (**Files**) takes the Library's place and the panel opens on it. Click the icon again to close." |
| L16-21 table "On the board \| In code mode" | Column 1 becomes **Library (designer)**: shows `lib/` as folders with screens, components, models, global states, classes, enums, functions and variables under **Project**, plus **Packages** (direct dependencies with their version, "workspace" for a path dependency), **Built-in** and **Assets** (chips; at least one stays on); **Add** (+) menu; a click opens the details card, double-click or Enter opens; marks the widget open in the editor. Column 2 stays **Files (code mode)**: the whole project, folders closed, top-level names starting with "." hidden, **no add buttons** (use the Library, or **Back** first), click opens the file in a tab, follows the open tab. (C2, C7; `library_service.dart:221-251`, `files_tree_host.dart:134-148`) |
| L23 image `code-files-1` | Retake: the Library with its **Add** menu open (and one of the code-mode Files tree). |
| L25-29 markers `*`, number, git letter | Still right for the **Files** tree (`*` unsaved, red count, **A** **M** **D** **R** **C**). Library rows and folders carry a red error count too, no git letters. |
| L31 "Nowa doesn't load `.git/`, `build/` or `.DS_Store`, and the tree doesn't list top-level items whose names start with a dot... Double-click it to open that board" | First half right for Files. The Library does not list `.board` files; boards live in the **Boards** chip. A click on a file in Files opens it; check what a `.board` file opens as in code mode (part 6). |
| L33-41 "Add files" intro + table of three section buttons (**Add to library**, **Add board**, **Import asset**) | Replace with: the Library's **Add** (+) button (tooltip "Add") opens the menu. Boards are created from the **Boards** chip (**Create new board**, or Ctrl/Cmd+Shift+B). Uploads: **Upload Assets...** in the same menu. Where things land: the folder of the highlighted row if it is in `lib`, else `lib` (**New Widget...**, **New Folder...**); models go to `lib/models`, global states to `lib/globals`; uploads go to the highlighted `assets` folder, else `assets`. (`library_host.dart:176-188`, `add_lib_menu.dart:11-105`) |
| L43-53 the **Add to library** menu table | Same items and labels: **New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, **API Collection...**, **Import Dart code...**; add **Upload Assets...** at the end. The menu is called **Add** now. |
| L55-57 model and global state names; "In code mode, a blank tab (Ctrl/Cmd+T) offers **New Widget** and **Upload a File** too." | Both still true. |
| L63-79 "Rename, move and delete files" intro "Right-click a file or folder. Ctrl/Cmd-click adds items... With the **View Only** role, the menu has only **Copy as path** and **View in folder**." | Describe both surfaces. **Library** right-click: **Insert**, **Open** (⏎), **Upload assets...** (asset folders), **Rename** (F2, in place), **Delete** (red), **Show in code**; drag a row onto a folder to move it (lib stays in lib, assets in assets); no multi-select; no Delete key; Ctrl/Cmd+Z undoes while the Library has focus. **Files (code mode)** right-click (selects the row first): **Remove file** / **Remove N files** (red), **Rename** (one file, F2), **Cut**, **Paste** (into the selected folder), **Copy as path**, **View in folder** (local projects), **Show file content** / **Show files content**. View Only: only **Copy as path** and **View in folder**. Keys in Files: arrows move, Shift+arrows extend the selection, Space selects, Enter opens a file or opens/closes a folder, Left/Right close/open a folder, F2 renames, Delete (Backspace on macOS) removes, Ctrl/Cmd+X cuts, Ctrl/Cmd+V pastes; Ctrl/Cmd+click toggles a row and Shift+click selects a range (both unchanged); several selected rows drag into a folder together. (C3, C7; `files_tree_host.dart:440-493`, `files_tree_view.dart:130-200`) |
| L67-73 menu table (**Rename**, **Remove file**, **Copy as path**, **View in folder**, **Show file content**) | Keep as the **Files** table; add **Cut** and **Paste**; rename the section to make clear it is code mode. Add the Library menu as a second table. |
| L75 "To move a file, drag it onto a folder. Files in `lib` can move only within `lib`..., and `.board` files only within `boards`." | Right for both surfaces (Library: lib and assets; Files: also boards). |
| L77 "...select it and press Delete... Nowa asks 'Are you sure you want to delete…?'... Ctrl/Cmd+Z undoes a delete while the **Files** panel has focus." | Right for Files. For the Library the dialog reads "Are you sure you want to delete {name}?" (**Cancel**, **Yes**) and the key is not bound (use the menu). |
| L79 "`lib/main.dart` can't be deleted. Nowa shows **Cannot delete file**" | Not in the diff. Keep. |
| L83-113 Search panel | Unchanged (no label changed). |
| L115-117 "Search for a file by name: Press Ctrl/Cmd+O, type part of a file name, and press Enter. The picker lists the files in `lib/` with their paths" | Right in code mode. In the designer Ctrl/Cmd+O opens the Library search (hint **Go to...**): Enter opens the first result, Cmd/Ctrl+Enter inserts it. The file palette skips `.dart_tool`, `.git`, `.gradle`, `.idea`, `.symlinks`, `build`, `ephemeral`, `node_modules`, `Pods`. (C5; `tab_actions.dart:27-71`) |

#### code/code-mode.md (C6 C7 C3 C5)

| Where | 3.13 |
|---|---|
| L16 "The left panel switches to **Files** and shows the whole project, not only `lib/`, `boards/` and `assets/`. When you leave code mode, the panel you were using comes back." | "The **Files** icon takes the Library's place (second in the strip, Ctrl/Cmd+2) and the panel opens on it. It shows the whole project... When you leave code mode, the panel you were using comes back." (`panel.dart:205-209`, `_sidePanelBeforeCode`) |
| L18 image `code-code-mode-1` | Old sidebar and tab bar: retake. |
| L26 "Click a file in **Files** to open it." | Right (Enter works too). |
| L29-31 shortcuts table row "Search for a file \| Ctrl/Cmd+O" and the paragraph | Right in code mode. Add: in the designer the same keys open the Library search. |
| L54 "Outside code mode, right-click a file in **Files** and choose **Show file content**..." | **Files** is code-mode only now. Reword to "In code mode, right-click a file and choose **Show file content**" (hidden with View Only). The text tab itself is unchanged in the diff (Font size, Word wrap, Compile). Unverified live (part 6). |
| L56 "...leave code mode and choose **Import Dart code...** from the **Add to library** menu in **Files**." | "...leave code mode and choose **Import Dart code...** from the Library's **Add** (+) menu." |

#### code/custom-code.md (C1 C3 C14 C19)

| Where | 3.13 |
|---|---|
| L14 "create a widget with **New Widget...** ([Manage project files](files.md#add-files))" | Keep; the anchor `#add-files` must survive the files.md rewrite. |
| L52 table row "A widget \| In the widget picker (Ctrl/Cmd+K) under **Components**, and in the **Widgets** panel. Drag it onto a screen like any component." | "In the **Library** (Ctrl/Cmd+K, or the Library icon), under **Project**. Drag it onto a screen like any component." The **Components** chip belongs to the dialog picker. |
| L78 "1. If you're in code mode, click **Back**. The **Add to library** button isn't in the code-mode **Files** panel." | "If you're in code mode, click **Back**: code mode has the **Files** tree, not the Library." |
| L79 "2. In the **Files** panel, click **+** (**Add to library**) on the `lib` row and choose **Import Dart code...**." | "2. In the **Library**, click **Add** (+) and choose **Import Dart code...**." (`add_lib_menu.dart:98-101`) |
| L83 image `code-custom-code-1` | The Import dialog only got the restyle: retake for D20. |
| New section (suggested name "Preview a widget in several states") | A function, static method or constructor annotated with Flutter's `@Preview` is a named **variant** of the widget it builds. Name = the `name:` argument, else the function name in Title Case; `group:` and `size:` are read too. Open the component on its own to see each variant as a canvas next to it, one column per `group` headed by the group's name. A variant's title shows its name and, on hover, **Open in new tab** and **Add to board** (picks a board; with none: "This package has no boards yet"). The Library lists variants as child rows of the widget; the dialog picker shows them as chips (Tab / Shift+Tab, hover previews) and inserts the picked one at its preview size as "Widget (variant)"; the Outline names such a canvas after the variant. A package's `design/` folder is searched for previews. (C14; `variant_service.dart`, `widget_designer.dart:58-140`, `canvas_titles.dart:20-36,200-370`, `add_variant_to_board.dart:11-38`) |
| L98 "...a few things look different or show as placeholders" | Still right; placeholders are smaller now (see limitations.md). |

#### code/limitations.md (C19 C22)

| Where | 3.13 |
|---|---|
| L22 table row "A box crossed by two lines, with a widget's name in the middle" | Now a small crossed box sized to its label (label 10 px, thin lines); it no longer fills the space it is given (3.12.5 filled up to 400 px). (`mock_dynamic.dart:157-176`) |
| L22 same row, "What it means: The widget comes from a package that Nowa has no built-in support for." | Add: a package widget that wraps a child (`Animate(child: page)`) or an effect called on a widget (`page.animate().fade()`) shows the child, not a placeholder. A mocked or failed widget in a `sliver:` or `slivers:` slot is drawn as a sliver. (`mock_dynamic.dart:36-140`) |
| L24 row "A small crossed box" | Fine. Unset nullable enums, colors, numbers and flags mock to `null`, so the widget's own default shows (`mock.dart:287-297`). A mocked image is 48 x 48 px when it sets no size and shows a placeholder at its size when it can't load (`mock.dart:118-150,323-331`). |
| L40 table row "A `switch` case with a `when` clause, or with a list, map, relational (`> 5`) or `&&` pattern \| An `if` inside the case" | Relational patterns (`> 5`, `>= x`, `< x`, `<= x`, `== x`, `!= x`) and `&&` patterns now work. Row becomes "A `switch` case with a `when` clause, or with a list or map pattern". (`block_tree.dart:5093-5160`, `ast_to_block_visitor.dart:1551-1558`; still unsupported at `:1517`, `:1582`) |
| L43 "These do work: record and object destructuring..., a `switch` that matches constants, `\|\|` and object patterns, enhanced enums..." | Add "relational and `&&` patterns". A promoted `is` check narrows what follows it (`x is T && x.field`). |
| L45-47 "Classes that extend Flutter classes... Any other Flutter class, such as `Color` in `class HexColor extends Color`, loads, but its objects aren't real ones and fail wherever Flutter needs the real class. **Problems** warns about it." | The warning is unchanged ("'X' extends 'Y', which Nowa can read but cannot construct."). Where Flutter needs the parent type, the board now uses what the object wraps (for example an inner `ImageProvider`) or a placeholder of the parent type, so the screen keeps drawing. Reword "fail" accordingly. (`declaration_internal.dart:211-236`, `block_problems.dart:360`) |
| L51 "`package:` imports are the best supported form. `part` and `part of` aren't followed." | Still true for loading. New: when Nowa rewrites a file you changed visually, it keeps `library;`, `part '...';` and `part of '...';` lines and adds no generated imports to a part file (before, the `part of` line was dropped and the app no longer compiled). (`block_tree.dart:6974-7060`, commit `a57e5aab8`) |
| L53 "Only the packages you list under `dependencies` with a version are loaded. Packages from Git or a local path aren't, and neither are the packages your packages depend on." | `git:` and `path:` dependencies are listed and loaded (verified for the local resolver; cloud projects unverified, part 6); `sdk:` dependencies count as installed; packages from another host, `dev_dependencies` and the dependencies of your packages are still not loaded. (`package_service.dart:57-70`, `:365-367`) |
| L57 "In a constructor's initializer list, `super(...)` and `assert(...)` don't run. Set fields directly, or use `super.name` parameters." | Named arguments of `super(child: x)` are now kept and read like `super.child`; `assert(...)` still doesn't run and positional `super` arguments are skipped. (`declaration_runtime.dart:1727-1735,1823-1835`) |
| Optional "what works" lines (C19 detail 7) | Objects whose class declares `call` are called like functions; methods with default values can be torn off; `firstWhere(orElse:)` runs your callback; `firstOrNull`, `lastOrNull`, `singleOrNull`, `elementAtOrNull`, `nonNulls` work; mixin statics resolve; a hand-written `main()` (no `@NowaGenerated`) is not rewritten; a project `LocalizationsDelegate` that fails to load logs "Could not load {Type}: {error}" and the board keeps drawing. |

#### code/packages.md (C22 C18)

| Where | 3.13 |
|---|---|
| L17 "New projects start with `nowa_runtime`, `provider`, `shared_preferences`, `dio` and `go_router`." | Unchanged (`dart_package.dart:99`). `nowa_runtime` is `^0.2.0`. |
| L19 image `code-packages-1` | Restyle only: retake. |
| L49 "**Plain pub.dev packages only.** Nowa loads the packages under `dependencies` that list only a version. A package from Git, a local path or another host, an `sdk:` package, and anything under `dev_dependencies` isn't loaded." | "Nowa loads the packages under `dependencies` that list a version, or a `git:` or `path:` source (the Version cell is empty, or the library calls it "workspace" for a path). An `sdk:` package such as `flutter_localizations` counts as installed but is not loaded. A package from another host and anything under `dev_dependencies` isn't loaded." Keep the dev-dependency problem text. (C22; `package_service.dart:57-70,363-375`) |
| L53 "Nowa has built-in support for popular packages, such as `provider`, `go_router`, `dio`, `shared_preferences`, `flutter_svg`, `lottie` and `rive`." | Add `gap`, `flutter_animate`, `google_fonts`, `smooth_page_indicator`: their widgets draw for real on the board instead of as placeholders (versions `^3.0.1`, `^4.5.0`, `^8.0.2`, `^2.0.1`). (`dart_package.dart:82-130,192-196`) |
| L54 "`nowa_runtime`. Nowa keeps it at the version your Nowa release expects" | Still true; the version is `^0.2.0`. `nowa_runtime` no longer includes `smooth_page_indicator`. (`packages/core/lib/version.dart:4`, `packages/nowa_runtime/CHANGELOG.md:1-3`) |
| L57 note ":::note Nowa doesn't list or load packages from Git, a local path or another host, so **Problems** may say such a package "is imported but is not in the pubspec." Don't click **Fix** for it." | Shrinks to "another host" only: Git and path packages are listed now. Keep the **Fix** warning for those. |
| New short section "A package asks to migrate" | A project that imports `smooth_page_indicator` without having it in `pubspec.yaml` (it used to come with `nowa_runtime`) gets a dialog **Page indicator migration**: "nowa_runtime no longer includes smooth_page_indicator. Nowa will add it to your pubspec and import it in {files}." Buttons **Later** and **Migrate**; **Later** brings it back the next time you open the project. The Page View widget's dots and the Onboarding templates add the package themselves. (`migration_service.dart:126-262`, `widget_info.dart:256-268`; error text "Could not add smooth_page_indicator to the pubspec") |
| L60-62 "Edit pubspec.yaml yourself... After you change `pubspec.yaml` by hand, click **Pub get**" | Add: after files change outside Nowa (branch switch, another editor, an agent) Nowa re-reads the pubspec and loads new dependencies by itself; a failure logs "Could not load the dependencies added outside Nowa: {error}". (C18; `default_project_observer.dart:17-36`) |

#### code/import.md (C1 C23)

| Where | 3.13 |
|---|---|
| L80 "**A project without boards opens on an empty board.** Your screens and components are in the **Widgets** panel as **Page** and **Component** tiles. Drag one onto the board to see it." | "...are in the **Library** (Ctrl/Cmd+2) under **Project**. Drag one onto the board, or double-click it to open it on its own." |
| L82 "**Nowa adds a `.nowa` folder** with its settings." | Add: Nowa no longer raises `.nowa/settings.json` `version` to the app version on every release, only to `3.0.11` (the newest version a migration checks), so opening the project in a newer Nowa does not show that file as modified in Git. (C23; `packages/core/lib/version.dart:6-11`, `packages/core/lib/src/plugin.dart:155-168`) |
| L83-84 | Fine. Optional: a hand-written `main()` stays as written, `library`/`part` lines are kept (C19). |

#### code/index.md (C2 C7)

| Where | 3.13 |
|---|---|
| L59 "\| [Manage project files](files.md) \| Browse, create, move and delete files, and search the whole project. \|" | "...with the Library and the code-mode Files tree, and search the whole project." |
| L16 "Open code mode to browse the whole project." | Right. |

#### code/vs-code.md (C17 C18 C7)

| Where | 3.13 |
|---|---|
| L29 "Right-click a file or folder in the **Files** panel and choose **View in folder**" | Add "in code mode" (Files is code mode only). Local projects only (`files_tree_host.dart:472-477`). |
| L42 "The default is `/usr/local/bin` on macOS and `C:\Program Files\Microsoft VS Code\bin` on Windows." | Add "and `/usr/bin` on Linux" (`vscode.dart:10-16`). |
| L51-52 sync table rows | Add: an edit made in another editor right after Nowa saves is no longer lost (Nowa remembers a checksum of what it wrote, not a 2-second window); an atomic save (temp file renamed over the original) counts; new files in a workspace package's `lib/` or `boards/` load; hidden editor temp files such as `.!123!main.dart` are never loaded; after files change outside Nowa the pubspec is re-read and new dependencies load. (C18; `local_file_service.dart:19-29,82-97,195-214,315-345`) |
| L55 "Nowa ignores `.git/`, `build/` and `.DS_Store`." | Fine; add hidden temp files if you add the C18 row. |

#### code/local-projects.md (C17 C7)

| Where | 3.13 |
|---|---|
| L20 "...jump to its folder with **View in folder** (right-click a file in the **Files** panel)" | "...(in code mode, right-click a file in **Files**)". |
| Any "desktop app = macOS and Windows" wording | Local projects work in the Linux app too (C17). Not found on this page by grep; check the intro. |

#### code/git.md (C12 C13)

| Where | 3.13 |
|---|---|
| L64 "Click the branch name at the top of the panel. A star marks the current branch." | Add: the menu opens below the branch row and has a **Search branches** field that filters local and remote-only branches. (`git_details.dart:227-240,768`) |
| L74 CAPTURE comment `code-git-2` | Add "the Search branches field". |
| L95-96 "**Undo Commit**" / "**Revert Commit**" | "**Undo commit**" / "**Revert commit**". The entries are greyed (not hidden) when they can't run: **Undo commit** unless it is the latest unpushed commit, **Revert commit** on the first commit; with View Only neither shows. (`git_commit_context_menu.dart:8-32`) |
| L4 keywords "undo commit, revert" | Fine. |

#### code/github.md

No edit found.

---

### Add logic

#### logic/global-state.md (C3 C6)

| Where | 3.13 |
|---|---|
| L16 "1. Open **Files** in the sidebar. Next to the `lib` folder, click **+** (**Add to library**), then **New Global State...**. Inside `lib`, the **Add** button opens the same menu." | "1. Open the **Library** in the sidebar and click **Add** (+), then **New Global State...**." The file goes to `lib/globals` whatever row is highlighted. (`add_lib_menu.dart:68-78`) |
| L20 "You can also open the **Variables** panel with nothing selected, find **Globals** and click **Create global state**." | Unchanged. |
| L26 "1. In **Files**, double-click the global state's file. A single click only shows a preview." | "1. In the **Library**, set **Filter** to **Global states** (or **Everything**), or search its name, then double-click it or press Enter. A click only shows the details card." It lands in the global-state editor as before. (`library_host.dart:147-154`) |
| L47 "...so open the file in **Files** to see all of its variables and functions." | "...so open it from the **Library**." |
| L36 image `logic-global-state-1` | Only restyled: retake for D20. |

#### logic/models.md (C3 C6)

| Where | 3.13 |
|---|---|
| L12 "1. Open **Files** in the sidebar. Next to the `lib` folder, click **+** (**Add to library**), then **New Model...**. Inside `lib`, the **Add** button opens the same menu." | "1. Open the **Library** and click **Add** (+), then **New Model...**." File goes to `lib/models`. |
| L18 "1. In **Files**, double-click the model's file. A single click only shows a preview." | "1. In the **Library**, set **Filter** to **Models** (or search its name) and double-click it or press Enter." |
| L41 "1. In **Files**, click **+** (**Add to library**) next to `lib`, then **Generate Models From Json...**." | "1. In the **Library**, click **Add** (+), then **Generate Models From Json...**." Dialog unchanged. |
| L31 image `logic-models-1` | Restyle only. |

#### logic/router.md (C12)

| Where | 3.13 |
|---|---|
| L24 "Right-click a route and choose **Delete Route**. A **Remove Route** dialog warns that the route's child routes go too." | "**Delete route**" (lower-case r). The **Remove Route** dialog is unchanged. (`router_block_view.dart:271`) |
| L34 "Right-click a chip to **Rename** or **Delete** it." | Unchanged (NMenu, same labels). |

#### logic/navigation.md, circuit.md

`navigation.md` L103 ("The widget picker opens on its **Components** filter") is still right: the GoRouter **to** field opens the picker dialog (`basic_fields.dart:473`). No edit.
`circuit.md` L55 ("Right-click a node for **Remove**, **Move up** and **Move down**") is still right; the menu moved to NMenu with the same labels, **Remove** in red (`packages/code/lib/src/widgets/node_widgets.dart:84-96`). No edit. Screenshots only: part 5.

---

### Connect data and services

#### integrations/firebase/firestore.md (C6) — the one flow I cannot rewrite from code

The collections and queries screens are opened today by clicking `collections.dart` or `queries.dart` in the **Files** panel (a
popup with **Add Main Collection** or **Add New Query**). In 3.13 that popup only exists behind the sectioned Files panel,
which no screen shows (`files_tree_host.dart:264-282`, the one caller of `FileInfo.preview`; `firebase_plugin.dart:37-47`
registers it). The editors themselves still exist as block views named **Collections** and **Queries**
(`firebase_plugin.dart:56-63`, `firebase_view.dart`), but the strings **Add Main Collection** and **Add New Query** appear
only in `firestore_outline.dart:94,149`, so no entry point to add a collection or a query is left in the designer.

| Where | 3.13 |
|---|---|
| L20-21 "1. Open the [**Files** panel]... 2. Click `collections.dart`. A popup opens with **Add Main Collection**..." | Cannot stay as written. Live check needed first (part 6): does double-clicking `collections.dart` in the Library (filter **Everything**) open the **Collections** view, and is there any button to add a main collection? If not, say so honestly, or point to Nowa AI ("Add a Cloud Firestore collection called orders"). |
| L37-38 "1. In the **Files** panel, click `queries.dart`. A popup opens with **Add New Query**." | Same. |
| L29, L31 CAPTURE `integrations-firebase-firestore-2` ("collections.dart popup open") | Cannot be captured in 3.13 the way it is described. |
| L12-14, L77, L88 Windows-only test limit | Unchanged: the "isn't possible on Windows" gate is `Platform.isWindows` only (`queries_builder.dart:104-130`). Linux is not gated; whether testing works there is unverified (part 6). |

#### integrations/rest-api/index.md (C3)

| Where | 3.13 |
|---|---|
| L23 "You can also use **API Collection...** in the Files panel's **Add to library** menu." | "...in the **Library**'s **Add** (+) menu." (`api_util.dart:115`, `add_lib_menu.dart:83-96`) |
| L16-17 **Api** sidebar steps | Unchanged; **Api** is icon 7 now (was 8). |

#### integrations/admob.md L29, google-maps.md L32, revenuecat.md L33, show-data.md L36 (C4)

| Where | 3.13 |
|---|---|
| admob L29 "Open the widget picker (Ctrl/Cmd+K) or click the **Widget** tool, and search for **Admob Banner**. If AdMob isn't turned on yet, Nowa shows **Add Missing Dependencies**. Click **Add**." | "Open the Library (Ctrl/Cmd+K)...". The dialog still comes up when you insert with Enter, double-click or Cmd/Ctrl+Enter; a drag does not ask (part 6). |
| google-maps L32, revenuecat L33 | Same wording change. |
| show-data L36 "press Ctrl/Cmd+K and search for **Data Builder**" | Works the same. No edit needed. |

#### integrations/firebase/auth.md L49, deep-links.md L39 and L46 (C27)

Three sentences name "Nowa 3.12.5": "In Nowa 3.12.5, **Google** writes `signInWithGoogle()` for an older version of the
`google_sign_in` package...", "In Nowa 3.12.5, saving **URL Scheme** rewrites only the iOS `Info.plist`...", "...Nowa 3.12.5
writes two separate `CFBundleURLTypes` entries." The code behind all three is **not in the 99 commits**
(`fb_auth_manager.dart`, `app_links_package_config.dart`; `google_sign_in_package_config.dart` changed one button only), so the
behavior is the same in 3.13. Change "3.12.5" to "3.13" or, better, drop the number ("Currently, ...").

---

### Preview and test

#### test/instant-play.md (C25 C19)

| Where | 3.13 |
|---|---|
| L12-13 "Hover the title bar... A play button appears... Click it... The board zooms to the item" | Add: clicking **Play** on a title also selects that item (`canvas_titles.dart:322-336`). |
| L33-37 "Play any widget... **Play** shows in the right-click menu when exactly one widget is selected and nothing is playing yet." | Right (the menu entry is the first one, `widget_context_menu.dart:22`). |
| L49-53 "Expect these differences" and L59 placeholders | Optionally: placeholders are smaller now; the board is clipped per screen (see limitations.md). |
| Image `test-instant-play-1`, video `test-instant-play-video` | Restyle only (part 5). |

#### test/run.md (C17)

| Where | 3.13 |
|---|---|
| L28 "**Embedded preview** runs the app inside Nowa, as on this page." | Add a note: in the **Linux** desktop app there is no in-app web view, so the preview pane shows "Your app is running", "The in-app preview is not available on Linux yet. Open it in your browser instead.", an **Open in Browser** button and the address. (`packages/nowa_run/lib/src/ui/nowa_run_preview.dart:128-131,145-171`) |
| L66 "A local project runs the preview with your Flutter SDK..." | Fine. |

#### test/problems.md (C22)

| Where | 3.13 |
|---|---|
| L16 image `test-problems-1` | Shows the status bar `v3.12.5-78`: retake. |
| L54 "`'<package>' is imported but is not in the pubspec.` \| Adds the package, at its latest version." | Still right for a pub.dev package. It no longer appears for a package declared with `sdk:` (counted as installed), `git:` or `path:` (listed and loaded). |

---

### Projects and account

#### account/workspaces.md (C7)

| Where | 3.13 |
|---|---|
| L94 "In the **Files** panel the **Add** (or **Import**) button is turned off, and right-clicking a file only offers **Copy as path**." | The Files tree is code mode only now and has no add buttons. With View Only its menu offers **Copy as path** and **View in folder** (local projects). (`file_context_menu.dart:25`, `files_tree_host.dart:34,40-55,445`) The **Library** has no View Only check in the code (`library_host.dart` never reads `isViewOnly`): do not claim it is read-only; check live (part 6). |
| L92 "You can select widgets, copy them and use **Export as image...**." | Right (`widget_context_menu.dart:13-17`). |

#### account/help.md (C21)

| Where | 3.13 |
|---|---|
| L57 "Announcements can also appear as banners at the bottom right. Click the close button (**Dismiss announcement**) to hide one." | Add: at most two banners show at a time (was three), and an announcement past its expiration date no longer shows as a banner. (`notification_banner.dart:9`, `announcement_provider.dart:22-23`, `announcement_service.dart:122`) |

#### account/index.md (C17)

| Where | 3.13 |
|---|---|
| L25 "\| **Download Desktop App** (web app only) \| Opens **Download Nowa** with download buttons for macOS and Windows. \|" | "...buttons for macOS, Windows and Linux." (A button is greyed if the server has no link for it.) |

#### account/projects.md, project-settings.md, plans-and-usage.md, account-settings.md

No edit found. `project-settings.md` L57 lists platform icon tiles (**Android**, **iOS**, **Web**, **macOS**): unchanged (nothing about Linux/Windows in the diff).

---

### Publish

No page needs an edit. One optional fact (C24): the `index.html` migration only replaces a legacy loader; a file that contains `flutter_bootstrap.js`, `{{flutter_js}}` or `{{flutter_bootstrap_js}}` is left alone (`migration_service.dart:103-120`). `publish/web.md` does not mention `index.html`.

---

### Reference

#### reference/shortcuts.md (C4 C5 C6 C8 C9 C10 C11) — heavy

| Where | 3.13 |
|---|---|
| L4 keywords "widget picker" | add "library", "back", "forward", "boards". |
| L9 "On a Mac, tooltips and menus show Cmd as ⌘ and Shift as ⇧." | Add: Option as ⌥ and Control as ⌃, listed in the order ⌃ ⌥ ⇧ ⌘ (for example ⇧⌘Z, ⌥⌘]); on Windows and Linux "Ctrl Alt ⇧ Win". (`inputs.dart:28-37`) |
| L22 "The sheet shows its shortcuts in four groups, **General**, **Tab Actions**, **Widgets** and **Designer**, and leaves out many that are on this page. In the current release (3.12.5), some entries don't match what the keys really do:" | Same four groups. Sheet contents in 3.13: **General** (Save, Copy, Paste, Cut, Undo, Redo, Open action history); **Tab Actions** (Next tab, Previous tab, Close current tab, **Back** ⌃ -, **Forward** ⌃ ⇧ -, **Boards** Ctrl/⌘ B); **Designer** (Zoom In/out, **Add a widget** Ctrl/⌘ K, **Go to a widget** Ctrl/⌘ O, Open selection in new file, Container R, Text T, Show/Hide panels); **Widgets** (Group/Ungroup, **Bring forward**, **Send backward**, **Bring to front** Alt+Ctrl/⌥⌘ ], **Send to back** Alt+Ctrl/⌥⌘ [, Delete). Say "Two entries still don't match:" (no version number). (`shortcuts_cheat_sheet.dart:13-62`) |
| L24-29 slip table | Delete the rows **Open widget picker** (the sheet now says **Add a widget** with Ctrl/⌘ K, which is right) and **Bring to front and Bring to back** (fixed). Keep **Show/Hide panels** (still bound to nothing) and **Group/Ungroup** (still only groups). |
| L31 "The right-click menu has a similar slip: **Move Up** and **Move Down** both show..." | Delete (each entry shows its own keys now). |
| L46 "Remove the selection, such as widgets and board items on the board, files in **Files**, screens and components in **Widgets**, or routes in **Router** \| Delete" | "...files in **Files** (code mode), or routes in **Router**". The Library has no Delete key: use right-click **Delete**. |
| L47 "Open the **Search for a file** picker \| Ctrl/Cmd+O" | "**Go to a widget**: opens the Library with its search focused (hint **Go to...**); in code mode it opens **Search for a file**." |
| L50 "Go to the board, or to the next board when you're already on one \| Ctrl/Cmd+B" | "Open the **Boards** list with the search focused (not in code mode or the Run view)." |
| New rows in **General** | "**Back** \| Ctrl+- (also Control on macOS)", "**Forward** \| Ctrl+Shift+- (also Control on macOS)". They step through the editors you opened; greyed with nowhere to go. (`setup_general_actions.dart:36-38`) |
| L52 "Undo and Redo work on the area you're in... every board or open screen, **Files**, **Widgets**, **Themes**, **Api**..." | "...**Library**, **Files** (code mode), **Themes**..." |
| L58-68 sidebar table | **Assistant** 1; **Library** 2 (shows **Files** in code mode); **Themes** 3; **Search** 4 or Shift+F; **Git** 5; **Outline** 6; **Api** 7; **Supabase** 8. Delete the **Files** 6 row. L70 keeps "Router has no shortcut... without Git the numbers after Search move up one". (`setup_general_actions.dart:44-62`, `side_bar.dart:36-80`) |
| L78 "Open the widget picker (**Search for a widget**) \| Ctrl/Cmd+K" | "**Add a widget**: opens the Library with its search focused (hint **Add...**); Enter inserts the first result." |
| L85-86 "Move the selected widget one step later in its parent (**Move Down**)... earlier (**Move Up**)" | "**Bring forward** (one step later) \| Ctrl/Cmd+]" and "**Send backward** (one step earlier) \| Ctrl/Cmd+[". New rows: "**Bring to front** (the last place) \| Alt+Ctrl+] / Option+Cmd+]" and "**Send to back** (the first place) \| Alt+Ctrl+[ / Option+Cmd+[". (`designer_setup.dart:21-25`) |
| L94 "In a Stack, later widgets are drawn in front, so ] brings a widget forward and [ sends it back." | Right. |
| L106-107 "Select a range in **Widgets** or **Files** \| Shift+click" / "Add or remove one item in **Widgets** or **Files** \| Ctrl+click" | "**Files**" only (code mode). The Library has no multi-select. |
| L143-152 "Pickers" intro and table | The Library search works like a picker: type to filter, ↓ moves from the search into the results, ↑ from the first row goes back to the search, Enter acts on the highlighted result, Cmd/Ctrl+Enter does the other action, Esc clears the search and then hands the keys back to the board. In the list: typing jumps into the search, F2 renames, Esc closes the details card. (C2, C3; `library_panel.dart:527-660`) Keep the intro's other pickers (Search for a file, template picker, Add context); drop "the widget picker" or say "the widget picker dialog". |
| L206 "**View only.** ... only copy, the two tab-switching keys and Ctrl/Cmd+W work." | Right (`setup_general_actions.dart:66-71,134`). |
| L207 "**Pop-ups.** Ctrl/Cmd+O and Ctrl/Cmd+K don't open while the Shortcuts sheet or a picker is already open." | "...while a dialog or the Shortcuts sheet is open." (`tab_actions.dart:112-116`, `add_actions.dart:7-12`) |

#### reference/glossary.md (C1 C6 C9 C17)

| Where | 3.13 |
|---|---|
| L8 "Board" row: "Switch boards from the board chip in the top bar." | "...from the **Boards** chip..." |
| L28 "Desktop app \| Nowa for macOS and Windows." | "...macOS, Windows and Linux." |
| L32 "Files panel \| The sidebar panel with your project files: `lib`, `boards` and `assets`. Import images and other assets from its **assets** row." | "Files \| The code-mode sidebar panel with the whole project tree. In the designer the Library takes its place." |
| L36 "Model \| ... Create one with **New Model...** in **Files**." | "...in the **Library**'s **Add** menu." |
| L45 "Screen \| ... The **Widgets** panel lists screens as **Page**." | "The **Library** lists screens." |
| L54 "Widget picker \| The searchable list of widgets you can add, opened with Ctrl/Cmd+K or the toolbar's **Widget** tool." | Reword: the dialog titled **Search for a widget**, opened by **Replace with...**, the **+** of an empty slot, widget-valued properties and **Pick Widget**. Ctrl/Cmd+K and the **Widget** tool open the **Library**. |
| L55 "Widgets panel \| The sidebar panel that lists your project's screens (**Page**) and components (**Component**). Not the widget picker." | Replace with a **Library** row: "The sidebar panel (icon 2) with your project's screens, components, models and more, Nowa's built-in widgets, your packages and your assets. Search it, add from it, drag from it." |
| L71 "Assets panel \| The **assets** folder in the **Files** panel" (Renamed or removed table) | "...in the **Library** (**Assets** chip)". Add rows: "Widgets panel \| **Library**" and "Open widget picker \| **Add a widget** (Ctrl/Cmd+K, now in the Library)". |

#### reference/widgets/index.md, forms.md, lists.md, media.md, navigation.md (C4 C22)

| Where | 3.13 |
|---|---|
| index L3-4 description and keywords ("widget picker") | Keep keywords; description "Every built-in widget in Nowa, in the Library..." |
| index L10-13 "Find a widget in the picker" bullets | Retitle "Find a widget in the Library". Bullet 1 right (Ctrl/Cmd+K, Widget tool, Enter). Bullet 2 "Your own screens and components appear in the same list. Under **Search for:**, choose **Components**... or **BuiltIn**..." becomes: your own widgets appear under **Project**; **Built-in** holds Nowa's own widgets by category; the **Filter** menu limits the kind. Bullet 3 "Missing a widget? Click **Request a Widget** in the picker's search bar" is dialog-only (see add-widgets). L15 "With nothing typed, the picker lists the widgets in the order of the tables below" is not true for the Library: under **Built-in** they are grouped by category (Basic, Images, Buttons, Layout, Players, Animations, Progress Indicators, Forms, Screen Components, Integrations). (`widgets_to_add.dart:96-107`) |
| index L19 image `reference-widgets-1` | Shows the dialog with **Dependencies** and **Open Documentation**; the Library's card has neither. Retake, or keep the dialog and say so (part 5). |
| index L17 "Nine widgets need a Flutter package..." | Still nine (SVG, Swipeable Stack, YouTube Player, Lottie, Rive, Pin Code Field, Admob Banner, Google Maps, RevenueCat Paywall). **Page View** is a tenth case in practice: its dots need `smooth_page_indicator`, which `nowa_runtime` 0.2.0 no longer brings, but the Page View root (a Stack) lists no dependency (`widget_info.dart:291-296`), so no prompt. Unverified what a user sees (part 6). |
| index L55 and navigation L83-88 (Page View, "row of dots") | Add: the dots are `AnimatedSmoothIndicator` from the `smooth_page_indicator` package; selecting them lists the package under **Dependencies** ("A Package for page indicators"). Projects that used it before 3.13 are offered **Page indicator migration** (see packages.md). |
| forms L12, lists L21, navigation L19 "Press Ctrl/Cmd+K, search for `...` and press Enter" | Still right (add mode inserts the first result). No edit. |
| forms L82, media L8 and L26 "from the widget picker" | "from the Library (Ctrl/Cmd+K)". |

---

### Build a great app

#### guides/complete-app.md (C1)

| Where | 3.13 |
|---|---|
| L81 "2. Open `RecipeCard` on its own: in the **Widgets** panel, switch to **Component** and double-click it." | "2. Open `RecipeCard` on its own: in the **Library**, double-click it (or press Enter on it)." |

#### guides/design-tips.md (C2 C20)

| Where | 3.13 |
|---|---|
| L19 "**Theme extensions** hold extra values, such as brand colors, and show up as tabs in **Themes**. There's no button to create one... Widget color pickers list the standard color roles only, so use those for everyday colors." | The last sentence is false now: with `ThemeExtension` classes, a widget's color picker has one tab per extension plus **Material**, and **Text Styles** gets extension groups (C20). Say "Widget color pickers show your extension colors as tabs next to **Material**." |
| L52 "**Descriptions:** click **Add description**... The note shows in the widget picker." | "...in the Library's details card and in the widget picker dialog." |

#### guides/data-and-state-tips.md L54, ai-tips.md, ship-tips.md

L54 ("Testing isn't possible in the Windows desktop app") stays. No other edit found.

---

### Troubleshooting

#### troubleshooting/known-issues.md (C17)

| Where | 3.13 |
|---|---|
| L5 keywords "... desktop app, Linux" | Remove "Linux" (or keep it if a Linux limit is added below). |
| L55-59 section "## No Linux desktop app: The desktop app is available for macOS and Windows. On Linux, use the web app..." | Delete the section: Nowa has a Linux desktop app in 3.13 (download button **Linux**). No inbound link to `#no-linux-desktop-app` exists in the docs, the sidebar or `redirects.js`. If you keep a Linux section, the true limits from code are: updates are downloaded by hand (**Download v{version}**), and the embedded preview opens in the browser. |
| L9-21 "Firestore queries can't be tested on Windows" | Unchanged. |

#### troubleshooting/index.md (C1 C17)

| Where | 3.13 |
|---|---|
| L100 "2. The workspace says **Nothing is open**. Click **Open board**, **Browse widgets** or **Open code mode**." | Labels unchanged. Optional: **Browse widgets** opens the Library. |
| L137 "**Desktop app:** click **Update to v…**. When it says "Download complete!", click **Install & Restart**... **Later** and **Skip** wait. **Or download manually** opens the download link." | Add "On Linux the dialog offers **Download v…** and **Skip**; download the new archive and run `install.sh` again." |
| L147 "**Desktop app:** click **Download** and install the newer version." | Fine. |
| L111 "Web app: the menu shows "iOS & Android devices" with "Download the desktop app"" | Fine. |

#### ai/*.md, publish/*.md, integrations/supabase/*.md, stripe.md, constants.md

Checked, no edit (no old labels). Their screenshots are in part 5 where listed.
## 5. Screenshots and videos that show old UI

Source: `captures/log.md`, re-read at the end of the research on 9 Oct (80 rows). Of those, **69 are embedded in a page** (64 images and 5 videos),
11 are new rows not yet embedded, and 3 more images are embedded without a log row (`firebase-notification-ios.png`,
`firebase-notification-android.png` and `stripe-supabase-tables.png` are third-party screens, not Nowa: unaffected).
The 3.12.5 shots I opened use a Roboto-like typeface (the UI font fell back to the platform font, see U15); the 3.13 app
uses Albert Sans, so even a "restyle only" shot looks different. D20 says re-take all of them. This section ranks them so that the writers know which
alt texts and captions must change.

* **Already re-taken from 3.13 in the working tree (git status `M`, 9 Oct):** 12 images, all in `logic/`. No action.
  `logic-circuit-1`, `logic-circuit-2`, `logic-events-1`, `logic-expressions-1`, `logic-functions-1`, `logic-global-state-1`,
  `logic-models-1`, `logic-navigation-1`, `logic-navigation-2`, `logic-parameters-1`, `logic-popups-1`, `logic-variables-1`.
* **New rows from the capture agents, shot from 3.13, not embedded yet (11):** `get-started-first-app-1`, `account-index-1`,
  `account-projects-1`, `account-projects-2`, `account-account-settings-1`, `account-plans-and-usage-1`, `account-workspaces-1`,
  `account-workspaces-2`, `account-help-1`, `publish-index-1`, `publish-download-code-1`. Not evaluated; they are current.
* **Still 3.12.5 and affected: 57**: Tier 1 has 8 (7 images, 1 video), Tier 2 has 7 (6 images, 1 video), Tier 3 has 42 (39 images, 3 videos).

### Tier 1: content or labels changed (8): retake, and rewrite the alt text and the sentences beside it

| Id | Where | What it shows now and what 3.13 needs |
|---|---|---|
| `design-add-widgets-1` | `design/add-widgets.md:17` | Shows the widget picker dialog (Search for a widget, Request a Widget, chips All/BuiltIn/Components, preview with Open Documentation). Ctrl/Cmd+K and the Widget tool now open the Library. Retake with the Library open and its search focused: hint **Add...**, a typed query (for example `button`), grouped results with the first one highlighted, and the details card beside the panel. New alt text and highlights; update the add-widgets steps to match (C2, C4). |
| `design-add-widgets-video` | `design/add-widgets.md:29` | Records Ctrl/Cmd+K opening the picker dialog and a drag from its list. Re-record: Ctrl/Cmd+K, Library opens with the search focused, type `button`, press Enter (the Button lands where the pointer was), then drag a row onto a Stack. Update the CAPTURE/log line ("after heading: Add a widget with the widget picker" becomes the new heading) (C3, C4). |
| `reference-widgets-1` | `reference/widgets/index.md:19` | Shows the dialog with the Dependencies list (flutter_svg) and Open Documentation. Neither exists in the Library's details card. Either retake the dialog (open it from Replace with... on a widget, search `svg`) and say so in the caption, or retake the Library with `svg` typed and rewrite the sentence beside it (C2, C4). |
| `design-components-2` | `design/components.md:60` | Shows the Widgets panel (Component tab, Search, grid/list button, Page/Component switch, tile with right-click menu Open in Editor, Rename, Delete). Retake the Library on a component row with its right-click menu: Insert, Open, Rename, Delete, Show in code (C1, C3). |
| `design-boards-1` | `design/boards.md:23` | Shows the board menu without a search field. Retake the Boards picker: the chip, the field **Search boards**, rows with the current board marked, hover **Rename** and **Delete**, footer **Create new board** (C9). |
| `code-files-1` | `code/files.md:23` | Shows the sectioned Files panel with the **Add to library** menu from the lib row. That panel and button are not reachable in 3.13. Retake the Library with its **Add** (+) menu open (New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., API Collection..., Import Dart code..., Upload Assets...); optionally a second image of the code-mode Files tree (C3, C7). |
| `design-assets-1` | `design/assets.md:18` | Shows the Files panel with the upload icon on the assets row (tooltip Import asset). Retake the Library with the **Assets** chip on and the Add menu or an assets folder's right-click **Upload assets...** (C3). |
| `design-select-and-edit-2` | `design/select-and-edit.md:84` | Shows the old menu (Move Up, Move Down, Move To Top, Move To Bottom, with Detach and Copy as new widget shown greyed). Retake the new one: Play, Remove, Replace with..., Group, Copy, Cut, Bring to front, Bring forward, Send backward, Send to back, Create component, Export as image... (Detach and Copy as new widget appear only on a component instance; pick a container instance if you want them in the shot) (C11). |

### Tier 2: the shot includes the sidebar, top bar, status bar or tree, which changed (7)

| Id | Where | What it shows now and what 3.13 needs |
|---|---|---|
| `get-started-editor-tour-1` | `get-started/editor-tour.md:10` | Whole editor with numbered callouts. Old sidebar (Widgets, Files, Outline at 7), old top bar (board chip, no Back/Forward), status bar `v3.12.5-78`, Roboto UI font. Retake; renumber the callouts and check the alt text and the numbers in the text beside it (C1, C6, C8, C9, C16). |
| `design-index-1` | `design/index.md:25` | Whole editor, Outline open. Same old chrome. Retake (the sidebar now reads Assistant, Library, Themes, Search, Outline, Api...; no Files) (C1, C6, C16). |
| `code-code-mode-1` | `code/code-mode.md:18` | Code mode: Files tree with the Files icon in slot 5, status bar `v3.12.5-78`. Retake: **Files** now takes slot 2 (where the Library icon is in the designer), tree rows are restyled, there are no add buttons (C6, C7, C16). |
| `get-started-playground-1` | `get-started/playground.md:25` | Top bar of the playground with the starting-point chip menu open. Retake: Back and Forward arrows now sit before the board chip, which is the **Boards** chip, and the sidebar icons differ. The menu labels (Playgrounds, Starter app, Simple app, Empty app, Templates, See all projects) are unchanged (C8, C9, C16). |
| `test-problems-1` | `test/problems.md:16` | Sidebar strip, the code-mode Files tree and the status bar with `v3.12.5-78`. Retake: the problem row text is unchanged; the surrounding chrome and the version differ (C7, C16). |
| `integrations-supabase-connect-1` | `integrations/supabase/connect.md:34` | Highlights the Supabase icon in the left sidebar. The icon is now 8th (Cmd/Ctrl+8) and its neighbours differ. Retake; keep the highlight on the Supabase icon (C6). |
| `design-themes-video` | `design/themes.md:55` | Opens Themes in the sidebar, then edits Primary. The sidebar and the popup are restyled and the font differs. Re-record. Content steps are unchanged (C16). |

### Tier 3: restyle only (42): retake for D20; the alt text and the sentences beside them stay true

| Id | Where | Note |
|---|---|---|
| `ai-index-1` | `ai/index.md:14` | restyle only |
| `ai-modes-1` | `ai/modes.md:21` | menu now NMenu; check it still opens above the chat field |
| `ai-context-1` | `ai/context.md:28` | restyle only |
| `ai-context-2` | `ai/context.md:47` | restyle only |
| `ai-prompting-1` | `ai/prompting.md:78` | opens from the three-dot menu; menus from header buttons now open beside the button (C16) |
| `design-templates-1` | `design/templates.md:17` | restyle only |
| `design-screens-1` | `design/screens.md:18` | restyle only |
| `design-boards-2` | `design/boards.md:53` | board crop; title bar unchanged |
| `design-screens-2` | `design/screens.md:47` | restyle only |
| `design-layout-1` | `design/layout.md:22` | restyle only |
| `design-outline-1` | `design/outline.md:15` | Outline tree rows restyled, labels unchanged |
| `test-instant-play-1` | `test/instant-play.md:23` | board crop; clicking Play now also selects the item (C25), which the shot may show |
| `design-themes-1` | `design/themes.md:19` | no extension tabs in the starter project; see "new captures" below |
| `design-themes-2` | `design/themes.md:58` | restyle only |
| `design-layout-2` | `design/layout.md:66` | restyle only |
| `design-properties-1` | `design/properties.md:14` | restyle only |
| `design-properties-2` | `design/properties.md:79` | restyle only |
| `code-custom-code-1` | `code/custom-code.md:83` | restyle only |
| `integrations-import-1` | `integrations/rest-api/import.md:18` | restyle only |
| `integrations-rest-api-1` | `integrations/rest-api/index.md:21` | restyle only |
| `design-components-1` | `design/components.md:21` | restyle only |
| `test-instant-play-video` | `test/instant-play.md:18` | hover the title, click Play: unchanged flow |
| `design-layout-video` | `design/layout.md:43` | unchanged flow |
| `reference-lists-1` | `reference/widgets/lists.md:27` | restyle only |
| `reference-forms-1` | `reference/widgets/forms.md:57` | restyle only |
| `reference-navigation-1` | `reference/widgets/navigation.md:24` | restyle only |
| `reference-media-1` | `reference/widgets/media.md:33` | restyle only |
| `design-theme-styles-1` | `design/theme-styles.md:18` | starter project has no extension tabs, so the list is unchanged; see "new captures" below |
| `design-responsive-1` | `design/responsive.md:48` | restyle only |
| `design-fonts-icons-1` | `design/fonts-icons.md:20` | restyle only |
| `code-packages-1` | `code/packages.md:19` | restyle only |
| `code-limitations-1` | `code/limitations.md:26` | the Kept as code panel and its blue placeholder are unchanged; the new small placeholder (C19) is not in this shot |
| `account-project-settings-1` | `account/project-settings.md:30` | restyle only |
| `integrations-constants-1` | `integrations/constants.md:39` | restyle only |
| `integrations-index-1` | `integrations/index.md:65` | restyle only |
| `integrations-admob-1` | `integrations/admob.md:23` | restyle only |
| `integrations-google-maps-1` | `integrations/google-maps.md:28` | restyle only |
| `integrations-revenuecat-1` | `integrations/revenuecat.md:37` | integration placeholder, not the generic mock; unchanged |
| `get-started-mobile-1` | `get-started/mobile.md:17` | phone layout still has the old Widgets panel (C1); restyle only |
| `get-started-create-account-1` | `get-started/create-account.md:18` | restyle only |
| `logic-circuit-video` | `logic/circuit.md:31` | Circuit unchanged; node menu now NMenu (same labels) |
| `guides-ai-tips-1` | `guides/ai-tips.md:26` | restyle only |

### New captures worth adding (not in the log today)

1. **Library details card and the grouped search results** (one image) for the new Library section on `design/components.md`.
2. **Top bar with Back, Forward and the Boards chip** (crop) for `get-started/editor-tour.md`.
3. **Shortcuts sheet** (new groups, **Add a widget**, **Go to a widget**, **Back**, **Forward**, **Boards**, **Bring forward** ...) for `reference/shortcuts.md`.
4. **Download Nowa dialog with MacOS, Windows and Linux** (pending CAPTURE `get-started-desktop-app-1`, text still says "MacOS and Windows buttons").
5. **Color picker with extension tabs and Material** (needs a project with a `ThemeExtension` holding colors) for `design/theme-styles.md`.
6. Optional: Git branch menu with **Search branches** (pending CAPTURE `code-git-2`), **Page indicator migration** dialog, the Linux preview pane ("Your app is running").

### Pending CAPTURE comments whose description must change

| Id | Page | Change |
|---|---|---|
| `get-started-desktop-app-1` | `get-started/desktop-app.md:19` | "the MacOS and Windows buttons" becomes "the MacOS, Windows and Linux buttons". |
| `design-outline-2` | `design/outline.md:17` | "the dimmed Board chip in the top bar" becomes "the Boards chip (not dimmed) and the Back button". |
| `code-git-2` | `code/git.md:74` | add "the Search branches field". |
| `integrations-firebase-firestore-2` | `integrations/firebase/firestore.md:31` | "collections.dart popup open" cannot be shot in 3.13 (see part 6). |
| `design-select-and-edit-1` | `design/select-and-edit.md:48` | unchanged; snap guides now line up at any zoom (C25). |


## 6. Not settled from code (check live on app.nowa.dev 3.13.0 before writing)

Ordered by how much a page depends on the answer. "Code says" is what I verified in `3cb32031c`; the open part is what a user
actually sees.

| # | Question | Code says | Pages waiting |
|---|---|---|---|
| 1 | **Firestore: how does a user add a main collection or a query in the 3.13 designer?** | The popups with **Add Main Collection** and **Add New Query** are the file-preview of `collections.dart` and `queries.dart`, opened only from the sectioned Files panel in design mode (`files_tree_host.dart:264-282`, `file_preview_body.dart:27`). That panel is not in the designer sidebar. The strings exist only in `firestore_outline.dart:94,149`. The editor views **Collections** and **Queries** (`firebase_view.dart`) have no add button. | `integrations/firebase/firestore.md` (L20-27, L37-38, CAPTURE `integrations-firebase-firestore-2`), `integrations/firebase/connect.md` ("Connecting creates the collections and queries files") |
| 2 | **Library with the View Only role**: can a viewer add, rename or delete there? | `library_host.dart` and `library_panel.dart` never read `isViewOnly`; the Files tree does (`files_tree_host.dart:34,40-55,445`). The workspace shortcut map for View Only is reduced (`setup_general_actions.dart:66-71`). | `account/workspaces.md` L94 (View Only list), `reference/shortcuts.md` L206 |
| 3 | **Dragging a package widget from the Library when its package is missing**: what happens? | Insert paths (Enter, double-click in add mode, Cmd/Ctrl+Enter, **Insert**) go through `placeLibraryWidget` and open **Add Missing Dependencies** (`library_actions.dart:76-92`). The drop path (`designer_board_controller.dart:226-262`, `library_service.dart:121-127`) has no such check. 3.12.5 said "You can't drag it until the package is added". | `design/add-widgets.md` (table, "Add a widget that needs a package"), `reference/widgets/index.md` L17 |
| 4 | **Page View in a project without `smooth_page_indicator`**: what does the user see? | `nowa_runtime` 0.2.0 no longer re-exports the package; a new project does not list it. The Page View default block is a Stack that contains `AnimatedSmoothIndicator` (`default_blocks.dart:270-290`), but the root widget info lists no dependency (`widget_info.dart:291-296`), so no **Add Missing Dependencies**. The migration dialog runs for projects that already use the package (`migration_service.dart:193-262`). | `reference/widgets/index.md` L55, `reference/widgets/navigation.md` L83-88, `design/templates.md` (Onboarding templates add the package) |
| 5 | **Linux minimum system.** | CI builds on Ubuntu 24.04 "because rive_native's prebuilt library needs glibc 2.38+ and libstdc++ 13+" (`linux-build.yml:19-20`). No runtime check or message in the app. 64-bit only (`linux-x64`). | `get-started/desktop-app.md` |
| 6 | **Firestore query testing on Linux.** | The "isn't possible on Windows" gate is `Platform.isWindows` only (`queries_builder.dart:104-130`). Whether the Firebase plugin tests work on Linux is not in the repo. | `integrations/firebase/firestore.md`, `connect.md`, `troubleshooting/known-issues.md`, `guides/data-and-state-tips.md` |
| 7 | **git and path dependencies in cloud (web) projects.** | `installedPackages` now includes them for every project (`package_service.dart:57-70`), and the local resolver finds them where pub put them (desktop app). `PackageResolverServiceImpl` (the server resolver) is not in the diff and receives an empty version for them. | `code/packages.md`, `code/limitations.md` |
| 8 | **Code-mode text tab**: does **Show file content** still give the tab with **Font size**, **Word wrap** and **Compile**, and how is it reached now? | The menu entry exists in the Files tree (`files_tree_host.dart:477-485`), hidden with View Only; the editor code is not in the diff (`code_editor_details.dart`). The page says "Outside code mode", which cannot happen any more. | `code/code-mode.md` L54, `code/vs-code.md` L30 |
| 9 | **A `.board` file clicked in the code-mode Files tree**: what opens? | `_activate` opens any file with `OpenFileIntent` in code mode (`files_tree_host.dart:266-270`). The old text said "Double-click it to open that board". | `code/files.md` L31 |
| 10 | **Library keyboard details**, exercised only in code: Esc (card, then search, then board), Enter in the list (open, or insert in add mode), Cmd/Ctrl+Enter, typing jumps to the search, F2. | `library_panel.dart:527-660`. | `design/add-widgets.md`, `design/components.md`, `reference/shortcuts.md` |
| 11 | **Boards chip tooltip text on Windows and Linux** ("Boards (Ctrl B)"?). | Built from the registered shortcut (`top_bar_mapper.dart:94`, `top_bar.dart:194`); the exact string for Ctrl is the shortcut formatter's. | `get-started/editor-tour.md` |

### Smaller things the writers should know

* The filter menu entry **Classs** (sic) shipped: `packages/nowa_ui/lib/library/library_panel.dart:971-979` builds `'Class' + 's'`. If a page lists the kinds, either quote the app ("Classs") or skip that item; do not "fix" it silently.
* `?panel=widgets` no longer opens a panel; `?panel=library` and `?panel=files` do (`workspace_options.dart:100-104`). No docs page links with `?panel=`.
* The Library has no Delete-key action and no multi-select; right-click **Delete** always asks first.
* The Files grid view (and its **New folder** background menu) is not reachable: the list view is the default and nothing switches it (`files_panel.dart:57`).
* The "Create login page" walkthrough's sub-step "Select 'Group' from the context menu..." lost its highlight: `WalkthroughAnchorIds.groupContextMenuItem` is registered nowhere (`walkthrough_anchors.dart:15`, `walkthrough_catalogue.dart:1101-1105`). The docs do not describe walkthrough steps.
* `docs/interpreter_limitations.md` in the Nowa repo is stale (still lists git/path dependencies and callable classes as unsupported); do not use it as a source.
* The Linux build workflow runs on pull requests and manual dispatch only (`linux-build.yml:2-6`); the live `version/latest` answer of 9 Oct (3.13.0, `Nowa-v3.13.0-linux-x64.tar.gz`) is why **Linux** is enabled today.
* Not user-facing, left out on purpose: see the last block of part 3.
