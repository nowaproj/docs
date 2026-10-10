# W30c writer notes (3.13 update, decision D20)

Batch W30c. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0); 3.12.5 is `b84bfdafd` in `/home/user/nowa`
(`git show b84bfdafd:<path>` there). Change ids C1-C27 and part numbers refer to `_rewrite/research/changes-3.13.md`.
Code refs are `path:line` in the 3.13 tree unless marked `3.12.5:`.

Pages (all under `docs/`): logic/{global-state,models,router,navigation,circuit}; integrations/firebase/{firestore,connect,auth},
integrations/{rest-api/index,admob,google-maps,revenuecat,show-data,deep-links}; test/{instant-play,run,problems};
account/{workspaces,help,index,projects,project-settings,plans-and-usage,account-settings}; reference/shortcuts,
reference/widgets/{index,forms,lists,media,navigation}; guides/{complete-app,design-tips,data-and-state-tips,ai-tips,ship-tips};
troubleshooting/{known-issues,index}.

"Needs a live check" items and product-issue candidates are collected at the end of this file.

## Logic pages

### logic/global-state.md, logic/models.md (C3, C6)
- Create: Library header **Add** (+) (tooltip "Add": `packages/nowa_ui/lib/library/library_panel.dart:708-714`) then **New Global State...** /
  **New Model...** / **Generate Models From Json...** (`lib/project/panels/files_panel/add_lib_menu.dart:61-82`, menu built by
  `lib/project/panels/library_panel/library_host.dart:176-186`). Files land in `lib/globals` / `lib/models` whatever row is highlighted
  (`add_lib_menu.dart:61-77` uses `fs.modelsDir` (`:64`) / `fs.globalsDir` (`:70`); `packages/core/lib/src/providers/project_provider.dart:381,387`).
  The old sentence "Inside `lib`, the **Add** button opens the same menu" is gone (it described the Files tree's `lib` row).
- Open: the default Library filter is **Widgets** (screens, components, widgets: `packages/nowa_ui/lib/library/library_contract.dart:225`),
  and the filter also applies to search results (`library_panel.dart:331-332` `_shows`, `:375-389` `_collect`), so a new model or global state is
  hidden until **Filter** is **Models** / **Global states** / **Everything**. Menu entries: **Models**, **Global states** (`_kindName`,
  `library_panel.dart:960-980`). The research row says "or search its name", which is wrong for the default filter (search then
  shows the row "Show 1 more of other kinds", `library_panel.dart:831-841`), so the pages say "click **Filter** and choose ...".
  Kinds: a class with `toJson` or `fromJson` is a Model (`packages/core/lib/src/interpreter/block_utils.dart:283-291`), a
  `NotifierClassDecl` a Global state (`packages/core/lib/src/library/library_service.dart:247-259`, `_projectKind`).
  Double-click or Enter opens the declaration's file (`library_host.dart:147-154` `_open` -> `openLibrarySource`,
  `packages/core/lib/src/library/library_actions.dart:67-73`), where the same editor as before opens (the class list, **Variables**,
  **Functions**: the two re-taken screenshots `logic-global-state-1` and `logic-models-1` show it, so they stay).
  A click shows the details card (not a preview popup). Steps renumbered (global-state: 8 steps; models: 5 steps).
- Row names are class names (`CartState`), not file names, and the folder is `globals` / `models` (top-level `lib/` folders start
  open, `library_panel.dart:_openFirst`); the pages say "in the `globals` folder" / "in the `models` folder".
- global-state: "so open the file in **Files**" became "open the global state from the [Library](../design/library.md)".
- The **Variables** panel route ("Create global state", "Pick global state", "Detach global state") is unchanged (no diff there).
- Left as is: both screenshots (re-taken from 3.13 already; they show the editor, not the Files panel).

### logic/router.md (C12)
- **Delete Route** -> **Delete route** (`packages/core/lib/src/editors/router_editor/router_block_view.dart:271`). The **Remove Route**
  dialog title is unchanged (`router_editor_actions.dart:144`).

### logic/navigation.md, logic/circuit.md
- No edit. navigation.md L103 ("The widget picker opens on its **Components** filter") is still true: the Navigator node's **to** field
  uses `BFWidgetFunction(pickerFilter: 'Components')` (`packages/code/lib/src/customizations/navigator_field.dart:87`) which calls
  `showWidgetPicker` (`packages/core/lib/src/fields/basic_fields.dart:473`). circuit.md L55 (**Remove**, **Move up**, **Move down**):
  `packages/code/lib/src/widgets/node_widgets.dart:84-96`, same labels.

## Integrations pages

### integrations/rest-api/index.md (C3)
- "the Files panel's **Add to library** menu" -> "the **Add** (+) menu of the Library" (links `../../design/library.md`).
  **API Collection...** is a plugin entry (`packages/data/lib/src/api/api_plugin.dart:35`, `api_util.dart:113-118`) listed by
  `add_lib_menu.dart:83-97`. The **Api** panel steps are unchanged (the Api panel still exists: `lib/project/panels/left_panel.dart:33`).

### integrations/admob.md, google-maps.md, revenuecat.md (C4)
- Step 1 now: "Press Ctrl/Cmd+K or click the **Widget** tool to open the [Library](../design/library.md), search for ... and press Enter."
  Ctrl+K and the **Widget** tool open the Library in add mode (`packages/designer/lib/src/actions/add_actions.dart:16-31`,
  `packages/designer/lib/src/widgets/designer_tools.dart:174-182`). The three widgets are Nowa picks in the **Integrations** category
  (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:106,873,937,945`), so a search finds them with the default filter.
  Enter inserts through `placeLibraryWidget`, which opens **Add Missing Dependencies** when a package is missing
  (`packages/core/lib/src/library/library_actions.dart:76-92`), so the pages' "If ... Nowa shows **Add Missing Dependencies**" is still true.
  A drag from the Library does not ask (part 6 #3): not written on these pages (they use the Ctrl/Cmd+K flow).
- revenuecat step 2: "Choose it." -> "Press Enter to add it." (the Library has no separate choose step).
- admob/google-maps screenshots unchanged (restyle only). The AdMob config diff since 3.12.5 is button restyle only
  (`packages/core/lib/src/interpreter/packages/integrations/admob_package_config.dart`), labels the page quotes
  ("AdMob setup", "AdMob Android setup", "AdMob IOS setup", "No API Keys") unchanged.

### integrations/show-data.md
- No edit (Ctrl/Cmd+K, search **Data Builder**, still works: Nowa pick, `widgets_to_add.dart:482-491`).

### integrations/firebase/auth.md, integrations/deep-links.md (C27)
- "In Nowa 3.12.5," -> "Currently," (auth note; deep-links note) and "Nowa 3.12.5 writes two separate" -> "Nowa writes two separate".
  The code behind all three sentences is not in the 3.12.5..3.13.0 diff: `packages/data/lib/src/firebase/auth/fb_auth_manager.dart`,
  `packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart` (unchanged);
  `google_sign_in_package_config.dart` changed one button only.

### integrations/firebase/firestore.md, integrations/firebase/connect.md (C6, part 6 #1) - FIRESTORE FINDING

**Finding: no reachable entry point in the 3.13 designer to add a main collection, a sub collection or a query, or to select an
existing one in the Collections / Queries editors.** Product issue candidate (see the end of this file). What the code shows:
- The strings **Add Main Collection** / **Add New Query** (and the **Add Sub Collection** `+`, the collection **Remove** menu, the
  query tiles) exist only in `CollectionsOutline`, `QueryBuilderOutline`, `CollectionTile`, `QueryFunctionTile`
  (`packages/data/lib/src/firebase/firestore/widgets/firestore_outline.dart:26-156`, `firestore_outline_tile.dart`). Those widgets are
  built in exactly one place: the `FileInfo.preview` of `collections.dart` / `queries.dart`
  (`packages/data/lib/src/firebase/firebase_plugin.dart:37-47`; `FirestoreOutline` is defined but never used).
- `FileInfo.preview` is read only by `FilePreviewDialogBody` (`lib/project/panels/files_panel/file_preview_body.dart:24-27`), which only
  `FilesTreeHost._activate` opens, and only in design mode (`lib/project/panels/files_panel/files_tree_host.dart:266-282`; in code mode the
  same click opens the file, `:268-269`). The **Files** panel is in the sidebar only in code mode (`lib/project/side_bar.dart:36-55`;
  code mode switches the side panel to Files, `packages/core/lib/src/panels/panel.dart:205-209`).
- The editors exist as block views **Collections** and **Queries** (`firebase_plugin.dart:56-63`, `firebase_view.dart:12-61`), shown when
  the file is open outside code mode (`packages/core/lib/src/editors/dart_editor/dart_editor.dart:26-30,58-80`). With nothing selected they
  say "Nothing selected" and "select a collection from the outline panel to open it" / "select a query from the outline panel to open it"
  (`collections_workspace.dart:20`, `queries_builder.dart:26`, `firestore_common.dart:57-76`). The selection is set only by the outline
  tiles and by add/remove calls (`firestore_outline_tile.dart:73-74,248`, `collections_manager.dart:82,89,94`,
  `query_builder_manager.dart:61,69,78`): `grep openedCollectionObject|openedQueryObject` finds no other writer. No panel hosts the outline
  (only Supabase registers a plugin panel: `packages/data/lib/src/supabase/supabase_plugin.dart:24`; the Outline panel is the widget tree,
  `packages/designer/lib/src/panels/outline_panel.dart:16-36`).
- The Library's **Add** menu has no Firestore entry: plugin entries come from `CoreHooks.dartFileCreators` (`add_lib_menu.dart:83-97`) and
  only the Api plugin registers one (**API Collection...**, `api_plugin.dart:35`). The Settings > Integrations > Firebase page has no link to
  the files (`packages/data/lib/src/firebase/setup/views/connected_main_screen.dart`, labels listed: Authentication, Providers, SHA
  Certificate Fingerprints, Go to your Firebase Dashboard, Disconnect Project). The AI package has no Firestore tool
  (`grep -i firestore packages/ai`: only the package allow-list and the "firebase_core" refusal).
- The Library does list the rows (the project source walks `userLib.allDeclarations`: `packages/core/lib/src/library/library_service.dart:
  221-259`): each collection is a model class (`ClassDeclImpl.model`, `collections_manager.dart:70`, kind Model via `block_utils.dart:283-291`)
  and queries are the class `FirestoreService` (kind Class, `query_builder_manager.dart:45-52`); **Open** reaches the editor above,
  empty ("Nothing selected"). An empty `collections.dart` (fresh connect) has no row. The page says this (needs a live check).
- **Hidden path, deliberately not documented:** `/project/:id?panel=files` sets the side panel to **Files** in the designer
  (`lib/project/workspace_options.dart:81-85,100-104`, `lib/router.dart:258-270`), and `LeftPanel` then builds the sectioned Files panel
  (`lib/project/panels/left_panel.dart:31`), whose file click shows the old popups. Not a user-facing feature, so not on the page.
- **What the pages now say** (all text in `firestore.md` unless marked): intro and description reworded so they no longer promise "build
  queries by picking steps" as an action; a new `## Add collections and queries in Nowa 3.13 {#add-collections-and-queries}` section
  states the gap plainly and lists what works: existing collections and queries keep working in a Data Builder (**Firestore** source:
  `packages/data/lib/src/firebase/firebase_field.dart:70-76`), in Circuit (**FIREBASE** category, `firebase_plugin.dart:121-146`) and in the
  app; in code mode `collections.dart` / `queries.dart` open as plain Dart (`dart_editor.dart:60-65`) and can be edited. The page gives no
  format for hand-written collections (a collection is a model class carrying `@NowaGenerated({'fbCollectionType': 'fbMainCollection'})`:
  `collections_manager.dart:70-82`, `packages/core/lib/src/interpreter/declaration_runtime.dart:275-282`; sub collections add
  `fbSubCollection` and `fbParent`); not verified live that a hand-written class is picked up, so not claimed.
- Removed from `firestore.md`: steps 1-3 and 8 of "Define your collections" (open Files, click `collections.dart`, **Add Main Collection**,
  **Add Sub Collection**), the sentence about right-click **Remove** on a collection (tree only), steps 1-3 of "Build a query" (open
  `queries.dart`, **Add New Query**, **Function Name** / **Create**) and the CAPTURE placeholder `integrations-firebase-firestore-2`
  (can't be captured). The editors' own content (fields, builder steps, test) is kept, introduced as "A collection opens in the
  **Collections** editor ..." / "A query opens in the **Queries** editor ...". The removed text is in `git show HEAD:docs/integrations/firebase/firestore.md`
  so it can be restored if the entry point comes back. Capture request `integrations-firebase-firestore-1` (in `requests/W16.md`, status
  not-possible) is still in the page; the Queries view can't be shown with a query selected in 3.13 without the hidden path.
- Windows note: unchanged. The overlay is `kIsWeb == false && Platform.isWindows` only (`queries_builder.dart:104,110`), so on Linux the
  **Test** section is active. Not verified that testing works on Linux (`cloud_firestore` has no Linux implementation upstream): the
  pages say nothing about Linux (needs a live check, see end). I rewrote the two Windows sentences (firestore "Before you start",
  connect "Before you start") from "you can build queries but not test them" to "you can't test queries inside Nowa" because building
  isn't possible either in 3.13.
- connect.md: intro "sign-in, Cloud Firestore and push notifications are each a switch or a few clicks away" -> "sign-in and push
  notifications are each a switch away, and your project has the files for Cloud Firestore"; table row for `collections.dart` /
  `queries.dart` links `firestore.md#add-collections-and-queries`. Files created at connect: `collections_manager.dart:29-47`,
  `query_builder_manager.dart:45-52`, called from `firebase_manager.dart:92`. The sentence "Nowa's visual tools cover Authentication,
  Cloud Firestore and push notifications" is left (the Firestore editors, Data Builder source and Circuit category all exist).

## Test pages

### test/instant-play.md (C25)
- Step 2: "The board zooms to the item, an orange border marks it, and it comes alive" -> "The board zooms to the item and selects it, an
  orange border marks it, and it comes alive". Code: the title's play button toggles play, zooms (`animateTo(rect, zoomLevel: 0.75)`) and
  selects the canvas ("Playing a canvas also selects it, as clicking its title would"):
  `packages/designer/lib/src/panels/canvas_titles.dart:318-339` (selection runs only when play has a rect, so on **Play**, not on **Stop**).
- Unchanged and still right: the right-click **Play** entry shows when nothing plays and a canvas is selected
  (`packages/designer/lib/src/menus/widget_context_menu.dart:19,22`); the "Expect these differences" list. Left out on purpose (optional in
  the research): smaller placeholders and per-screen clipping (C19, C25), which `code/limitations.md` covers.
- Screenshot `test-instant-play-1` / video: retake only (restyle), alt text names no changed UI.

### test/run.md (C17)
- New paragraph at the end of "Choose where to run": in the Linux desktop app the preview opens in the browser; the pane says "Your app is
  running" and "The in-app preview is not available on Linux yet. Open it in your browser instead.", with **Open in Browser** and the
  address. Code: `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:130` (`if (NPlatform.isLinux) return _BrowserPreview(...)`, comment at
  `:129`: no Linux implementation of the in-app web view), widget `:145-170` (texts at `:159-165`, `SelectableText(url)` after the button).
  `NPlatform.isLinux` is `!kIsWeb && defaultTargetPlatform == TargetPlatform.linux` (`packages/nowa_runtime/lib/src/nowa_platform.dart:18`),
  so the web app opened on a Linux computer is not affected. Keyword "Linux" added.
- Needs a live check: what the run toolbar (**Phone** / **Tablet**, **Fullscreen**) does while the Linux pane is showing (the page says
  nothing); the code only swaps the web view.

### test/problems.md (C22)
- First row of the "Fix a problem with one click" table: added "A package that `pubspec.yaml` lists with `sdk:`, `git:` or `path:` doesn't cause
  this problem". Code: `PackageProblemFinder` skips a package when `isPackageInstalled(name)` is true
  (`packages/core/lib/src/interpreter/packages/package_service.dart:410-425`; message at `:419`); `isPackageInstalled` accepts a dependency map
  with `sdk` (`:363-370`); `installedPackages` includes `git:` / `path:` dependencies (`:55-70`, `isSource` at `:61`). The research's "git and path
  dependencies load" for cloud projects is unverified (part 6 #7); the page only says the problem isn't raised, which holds for both project kinds
  because `installedPackages` reads the pubspec, not the resolver.
- Screenshot `test-problems-1` unchanged (alt text has no version); retake pending (status bar `v3.12.5-78`).

## Account pages

### account/workspaces.md (C7; part 6 #2)
- View Only list: "In the **Files** panel the **Add** (or **Import**) button is turned off, and right-clicking a file only offers **Copy as path**"
  -> "In code mode, right-clicking a file in the **Files** panel only offers **Copy as path**". Code: **Files** exists only in code mode
  (`lib/project/side_bar.dart:44-52`); with View Only its menu is **Copy as path** plus **View in folder** for local projects, and no add, rename,
  drag or cut (`lib/project/panels/files_panel/files_tree_host.dart:34,41-45,445,462,477`; older helper `file_context_menu.dart:25`). A View Only
  role exists only in a workspace, and workspaces hold cloud projects only, so **View in folder** never shows for it.
- NOT claimed: that the Library is read-only. `isViewOnly` is never read by the Library (`lib/project/panels/library_panel/library_host.dart`,
  `packages/nowa_ui/lib/library/library_panel.dart`); the other readers are `files_tree_host.dart`, `file_context_menu.dart`,
  `files_panel.dart:208`, `files_grid.dart:110`, `assets_panel.dart:95`, `lib/status_bar.dart:42`, the designer and the code editor. So
  the sentence above the list ("the editor is read-only") is unproven for the Library's **Add**, **Rename**, **Delete** and **Insert**. Needs a
  live check; product issue candidate.
- Line 92 (select, copy, **Export as image...**) is still right (`widget_context_menu.dart:11-17`).

### account/help.md (C21)
- Banner sentence: "At most two show at a time, and an announcement past its expiration date no longer shows as a banner." Code:
  `packages/core/lib/src/announcements/widgets/notification_banner.dart:9` (`maxVisible = 2`, was 3; `:22` `banners.take(maxVisible)`; both call sites use
  the default: `lib/project/banners/nowa_banner_host.dart:14`, `lib/dashboard/dashboard_page.dart:367,370`),
  `packages/core/lib/src/announcements/announcement_provider.dart:22-23` (`!a.isExpired`), `announcement_service.dart:122` (`isExpired`);
  tooltip "Dismiss announcement" at `notification_banner.dart:76`.

### account/index.md (C17)
- **Download Desktop App** row: "download buttons for macOS, Windows and Linux, and a line that names the version you get. A button is greyed out
  when there is no download for that system." Code: `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8` (`_showLinuxDownload = true`), buttons
  **MacOS** `:52`, **Windows** `:64`, **Linux** `:84` (each `onPressed: null` when the server has no link: `:53,65,85`), line "Download Nowa version:
  {version}" `:94`. The live `version/latest` answer of 9 Oct (3.13.0 with a Linux link) is in the research (U16); not re-checked.

### account/projects.md (ui-diffs row 11)
- Card text rewritten: the line under a card's name is the project's package name when it differs from the name, and "Edited 5m ago" when it doesn't or
  while the pointer is over the card; list rows show name, **Cloud**/**Local** badge and the edit time (hidden in a narrow window); **RECENTS** shows the
  edit time. Code: `packages/nowa_ui/lib/dashboard/projects_grid.dart:79` (`subtitle == null || hovering ? editedLabel : subtitle`), subtitle set only when
  the project has a friendly name different from its name (`lib/dashboard/dashboard_mapper.dart:56-66`, `subtitle: hasFriendlyName ? project.name : null`;
  `project.name` is the **Package Name** of the new-project dialog, `lib/dashboard/create_new_project/new_project_dialog.dart:84`), list row `projects_grid.dart:135-185`
  (`project.editedLabel` at `:183` only when not compact), RECENTS `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:403`. The 3.12.5 code is the same
  (research U/ui-diffs), so this is a page omission, not a 3.13 change.

### account/project-settings.md, plans-and-usage.md, account-settings.md
- No edit. Diffed `packages/core/lib/src/settings/*` and the dashboard files between 3.12.5 and 3.13.0 for label changes: only `NButton` restyles and
  the unchanged "Update Flutter SDK" / "Set up automatically" labels. The platform lists these pages quote (icon tiles **Android**, **iOS**, **Web**, **macOS**;
  "**Change all** also creates Windows icons") have no Linux/Windows change in the diff.

## Reference pages

### reference/shortcuts.md (C4 C5 C6 C8 C9 C10 C11)
- Keys of menus and tooltips: modifiers in the order Control, Option, Shift, Cmd (Mac: ⌃⌥⇧⌘, for example ⇧⌘Z, ⌥⌘]); Windows and Linux "Ctrl Alt ⇧ Win":
  `packages/core/lib/src/inputs.dart:27-37` (`ActivatorExtension.shortcut`). The page says "Ctrl, Alt and ⇧ in the same order" (no "Win": nothing on the page
  uses the Windows key).
- Sheet: four groups unchanged; contents now: **Tab Actions** = Next tab, Previous tab, Close current tab, **Back**, **Forward**, **Boards**; **Designer** = Zoom
  In/out, **Add a widget**, **Go to a widget**, Open selection in new file, Container, Text, Show/Hide panels; **Widgets** = Group/Ungroup, **Bring forward**,
  **Send backward**, **Bring to front**, **Send to back**, Delete: `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:16-60`. The two old slips (K shown as
  P; Bring to front/back shown as one step) are fixed, so those rows and the right-click ⌘] slip paragraph are deleted; the two that remain are checked: backslash is
  bound to nothing (`grep -i backslash` finds only unrelated code) and Ctrl+G only groups (`packages/designer/lib/src/designer_setup.dart:20`,
  `designer_actions.dart:46-56`). The heading "In the current release (3.12.5)" became "Two entries don't match what the keys really do".
- **General** table: Remove row now "files in **Files** (code mode), or routes in **Router**" (the Library has no Delete key: `library_panel.dart:544-584` handles
  typing, up arrow, F2, Esc, Enter only; sentence below the table says so); Ctrl/Cmd+O row = **Go to a widget** (Library search, hint **Go to...**; code mode keeps
  **Search for a file**): `packages/core/lib/src/actions/tab_actions.dart:29-37`, `lib/setup_general_actions.dart:32`; Ctrl/Cmd+B row = **Boards** list
  (`setup_general_actions.dart:35`, `lib/project/panels/panel_actions.dart:28-40`, chip `packages/nowa_ui/lib/src/components/picker_chip.dart`; not in code mode or the Run
  view: `lib/project/top_bar_mapper.dart:58-62`); new rows **Back** Ctrl+- / **Forward** Ctrl+Shift+- with Control on macOS too (`setup_general_actions.dart:37-38`,
  `SingleActivator(minus, control: true)`; tooltips "⌃-" / "⌃⇧-": `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`); history keeps 50 places, greys out
  at the ends (`packages/core/lib/src/providers/navigation_history.dart:26,28,30`; `top_bar_view.dart:262`); arrows hidden in code mode and the Run view (same keys
  still work). Undo areas: "the **Library**, **Files** (code mode)" (`library_host.dart:39` `Undo(debugLabel: 'Library')`, `files_panel.dart:30` `Undo(debugLabel: 'Files')`).
- **Sidebar panels**: Library 2 (Files in code mode), Outline 6, Api 7, Supabase 8; Files 6 row deleted: `lib/project/side_bar.dart:36-80` (order Assistant, Library or Files,
  Themes, Search, Git, Outline, Api, plugin panels), keys 1-9 follow the list (`setup_general_actions.dart:44-62`, `panel_actions.dart:19-26`
  uses `getIcons(codeMode:)`). "No Git icon in the playground or for a guest" kept (`side_bar.dart:64`, `!isSandboxed`).
- **Design on the board**: **Add a widget** row (`packages/designer/lib/src/actions/add_actions.dart:16-31`, Enter inserts the highlighted result:
  `library_panel.dart:622-661`); the two reorder rows became four: **Bring forward** `]`, **Send backward** `[`, **Bring to front** Alt+`]`, **Send to back**
  Alt+`[` with Ctrl on Windows/Linux and Cmd on macOS (`designer_setup.dart:22-25`; `OrderUpAction` calls `reorder(goNext, allTheWay)`,
  `packages/designer/lib/src/actions/widget_actions.dart:52-62`). Same actions as 3.12.5's Move Down / Move Up / Move To Bottom / Move To Top (research C11).
  The paragraph "In a Stack, later widgets are drawn in front ..." is kept.
- **Mouse table**: "Select a range / Add or remove one item in **Widgets** or **Files**" -> "**Files** (code mode)" (`packages/nowa_ui/lib/files/files_tree_view.dart:132-146`:
  Shift range, Ctrl/Cmd toggle). The Library has no multi-select.
- **Pickers**: "the widget picker" -> "the widget picker dialog", "Search for a file" marked code mode; new subsection `### Library search` (table): ↓ from the search,
  ↑ from the first row back, Enter acts / Ctrl+Enter does the other, Esc clears then hands the keys back, typing jumps into the search, F2 renames, Esc closes the card:
  `packages/nowa_ui/lib/library/library_panel.dart:527-542` (`_activate`: `_adding == flipped`), `:544-584` (`_onKey`), `:622-661` (`_onSearchKey`), `:739` (hints).
- "When a shortcut does nothing" kept as is, including "**Pop-ups.** ... while the Shortcuts sheet or a picker is already open": only command palettes and the sheet
  register panel overlays (`packages/core/lib/src/widgets/command_palette.dart:34`, `shortcuts_cheat_sheet.dart:65`), and Ctrl/Cmd+O and K are disabled while
  `panels.overlays` is not empty (`tab_actions.dart:113`, `add_actions.dart:8-11`). The research suggested "a dialog"; ordinary dialogs are not overlays, so "picker" stays.
  The View Only line is still right (`setup_general_actions.dart:66-71`).
- Not on the page (unchanged, not new in 3.13): the `/` key that focuses the AI chat (`designer_setup.dart` `FocusAiChatIntent`), present in 3.12.5 too.

### reference/widgets/index.md (C4 C22)
- Description and the section "Find a widget in the picker" -> "Find a widget in the Library {#find-a-widget-in-the-picker}" (old anchor kept; no inbound link found).
  Bullets: Ctrl/Cmd+K or **Widget** opens the Library (`add_actions.dart:16-31`); the widgets are under **Built-in** in groups (**Basic**, **Images**, **Buttons**, **Layout**,
  **Players**, **Animations**, **Progress Indicators**, **Forms**, **Screen Components**, **Integrations**: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:95-107`; the
  page's own H2 groups carry the same names), own widgets under **Project**, **Filter** default **Widgets** (`library_contract.dart:225`). Dropped the "Search for: Components /
  BuiltIn" chips (dialog only) and "With nothing typed, the picker lists ... in the order of the tables" (the Library groups by category). **Request a Widget** exists only in the
  dialog (`packages/core/lib/src/widgets/widget_picker.dart:148-160`), so the bullet says the Library has no request link and names the dialog route (same wording as
  `design/add-widgets.md` "Can't find a widget?").
- "Nine widgets need a Flutter package ...": Add Missing Dependencies now "when you add one with Enter or **Insert**" (`library_actions.dart:76-92`; a drop does not ask: part 6 #3).
- Screenshot `reference-widgets-1` kept (it shows the picker dialog, which is the only place with **Dependencies** and **Open Documentation**); alt text now says "widget picker dialog" and a
  sentence under it says the Library's details card has neither (`library_panel.dart:1192-1262` card shows preview, name, "Kind · location", 4 doc lines).
- Page View row: added "They come from the `smooth_page_indicator` package: see [Swipe between pages](./navigation.md#page-view)". The count "Nine" is unchanged. Page View as a tenth
  case: the Page View root lists no dependency (`widget_info.dart:291-296`), so adding it to a project without the package shows no **Add Missing Dependencies**; what the user sees is
  unverified (part 6 #4), so not stated.
- Next steps link text: "from the picker" -> "from the Library".

### reference/widgets/forms.md, lists.md, media.md
- "Add a **Dropdown menu** from the widget picker" -> "from the Library (Ctrl/Cmd+K)"; media intro and step 1 likewise; "[Widget catalog] for every widget in the picker" -> "for every built-in widget"
  on all three. forms L12 / lists L21 ("Press Ctrl/Cmd+K, search for ..., press Enter") are still right and unchanged. No other label on these pages changed.

### reference/widgets/navigation.md (C4 C22, ui-diffs row 12)
- "Add a screen part": the steps used to be "Ctrl/Cmd+K, then drag the part onto the screen, it lands in its own place". The capture agent saw the live 3.13 Library drop put
  **Floating Button**, **Bottom Navigation Bar** and **Drawer** into the body as free widgets (Outline shows it next to `appBar`, status bar "Could not find index for navbar"), and the
  slot in **Details** > **Screen** (an empty slot shows `null`) filled through the "Search for a widget" dialog work as before. The steps are now the slot path, with one hedged sentence
  ("A part you drag from the Library onto the screen can land in the body as a free widget instead of in its slot, so use the slot"). Code for the slot path:
  `packages/designer/lib/src/details/widget_fields.dart:222-225` (`BFWidget` slots), `packages/core/lib/src/fields/nowa_fields.dart:436` (opens the dialog), empty text `'null'`
  (`nowa_fields.dart` `WidgetField.evalText`). Code for the drop: `ScaffoldRule._init` picks the slot from `moveHandlers.first.widget.topNonLayout?.block.widgetDelegate?.className`
  (`packages/designer/lib/src/design_experience/drag_rule.dart:401,424-436`) and falls back to `body`; a Library drag creates its instance in `onDragMove`
  (`designer_board_controller.dart:243-283`), so the type may be missing there. The code does not prove the live result either way: needs a live check (same finding as
  `design/select-and-edit.md` "Where a dragged widget lands", which belongs to W30a).
- Step 1 of "Add a bottom navigation bar" now says "Set a **Bottom Navigation Bar** in the screen's slot, as in Add a screen part". The intro "Drop one on a screen and Nowa puts it in the right
  place" became "Pick one for its slot and Nowa puts it in the right place". CAPTURE `reference-navigation-2` state reworded (its request row in `requests/W13.md` is "skipped: low value").
- Page View (C22): after "The dots are a separate widget ..." a paragraph: the dots come from the `smooth_page_indicator` package, which `nowa_runtime` no longer includes
  (`packages/nowa_runtime/CHANGELOG.md:1-3`, `packages/core/lib/version.dart:4`); selecting them lists the package under **Dependencies** (`SmoothIndicatorWidgetInfo`,
  `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:256-268`, wired for `AnimatedSmoothIndicator` and `SmoothPageIndicator` at
  `declaration_info_factory.dart:28-29`; the section is `ExprDependencies`, `packages/core/lib/src/fields/expression_builder/expression_dependencies.dart:8-62`, shown by
  `packages/core/lib/src/fields/class_field.dart:62`; its **Hot Fix** button appears while a dependency is missing and calls `registerPackage` for a package dependency:
  `expression_dependencies.dart:51-60`, `packages/core/lib/src/dependency_system/dependency_helper.dart:35-39`, `dependency.dart:16-26`); a project that already uses the dots without the package gets **Page indicator migration** (links `code/packages.md#page-indicator-migration`,
  W30b). Needs a live check: that **Details** shows the **Dependencies** block for the dots, as the research states.

## Guides

### guides/complete-app.md (C1)
- Step 6.2: "in the **Widgets** panel, switch to **Component** and double-click it" -> "in the [Library](../design/library.md), double-click it, or select it and press Enter". The default filter
  **Widgets** lists components (`library_contract.dart:225`); Enter / double-click open the file (`library_host.dart:147-154`), a component opens on its own as before.

### guides/design-tips.md (C2 C9 C20)
- Theme extensions bullet: the false last sentence ("Widget color pickers list the standard color roles only") replaced: a widget's color picker shows extension colors as tabs next to **Material** and
  **Text Styles** lists their text styles in groups; link `../design/theme-styles.md#colors-from-theme-extensions` (heading written by W30b). Code: `packages/core/lib/src/fields/color_fields.dart:716-890`,
  `packages/core/lib/src/fields/style_fields/style_fields.dart:232-300` (as verified in `W30b-writer-notes.md`).
- Descriptions bullet: "The note shows in the widget picker" -> "in the Library's details card and in the widget picker dialog" (`library_panel.dart:1192-1262`; dialog preview `widget_picker.dart`).
- FOUND BEYOND THE LIST: the Boards bullet said "Nowa turns the name you type into one word, so **Login flow** becomes `loginFlow`". Now: "Nowa writes the name in snake_case, so **Login flow** becomes
  `login_flow`" (C9: `packages/designer/lib/src/actions/file_actions.dart:61-67` `_recordCreateBoardFile` -> `generateFileName` -> `Cases.snakecase`, `packages/core/lib/src/file_system/naming.dart:158-163`).

### guides/data-and-state-tips.md
- FOUND BEYOND THE LIST (depends on the Firestore finding): the "Test queries" bullet "**Firestore:** click **Run Test**" now says "in the **Queries** editor" and adds that Nowa 3.13's designer can't open a
  query in that editor, with links to `firestore.md#test-a-query` and `#add-collections-and-queries`. Revert it if the live check finds an entry point. The Windows sentence is unchanged.

### guides/ai-tips.md, guides/ship-tips.md
- No edit. Scanned for Library, Files, shortcuts, desktop, Linux, board and picker wording: nothing changed in 3.13 (ship-tips "**Remove** takes a screen off the board" is still in the board menu,
  `widget_context_menu.dart`/`board_context_menu`).

## Troubleshooting

### troubleshooting/known-issues.md (C17; Firestore note)
- Deleted "No Linux desktop app" (no inbound links, per research). Added "Linux: the preview opens in your browser and updates are manual": preview pane text and **Open in Browser**
  (`nowa_run_preview.dart:130,145-170`), and update dialog **Download v...** + **Skip** with no in-place install (`lib/dashboard/overlays/update_overlay.dart:140-154`, `canAutoInstall` false on Linux:
  `packages/core/lib/src/services/version_service.dart:39`); links `../test/run.md#choose-where-to-run` and `../get-started/desktop-app.md#install-on-linux` (W30a heading, exists). Keyword "Linux" kept.
- Firestore section (`{#firebase-on-windows}` kept): gate is Windows only (`queries_builder.dart:104,110`). "You can still build the query and use it in your app" -> "You can still use your queries in your
  app"; "where query testing works" -> "where the **Test** section is on" plus a pointer to `firestore.md#add-collections-and-queries` (in 3.13 no app can open a query in its editor). Linux is not
  mentioned: not verified whether testing works there (see end).

### troubleshooting/index.md (C1 C17)
- "A project freezes ..." step 2: **Browse widgets** "(it opens the Library)" (`lib/project/panels/empty_workspace.dart:41-45`, `sidePanel = 'Library'`).
- "The preview won't start": new bullet for the Linux "Your app is running" pane (not an error). Code as for `test/run.md`.
- "A new version of Nowa is available": the Desktop bullet split into macOS/Windows (**Update to v...**, **Install & Restart**, **Or download manually**: `update_overlay.dart:145-150,216`) and Linux
  (**Download v...**, **Skip**, run `install.sh` again; the script removes the old copy first: `linux/packaging/install.sh`, `rm -rf "$dest"`). "Update failed ... **Retry** / **Download manually instead**"
  stays (only the in-app path can fail: `update_overlay.dart:236-252`).
- "Version out of date" (desktop: click **Download**) unchanged: Linux is in the **Download Nowa** dialog now.

## Coverage notes (found beyond the per-page list, or not in pages.md)

- `guides/design-tips.md`: board names in snake_case (C9), the list only named L19 and L52.
- `guides/data-and-state-tips.md`: the **Firestore** "Run Test" bullet, because of the Firestore finding.
- `troubleshooting/index.md`: a Linux bullet under "The preview won't start" (the "Your app is running" pane is not an error); `known-issues.md`: a replacement Linux section instead of a bare deletion.
- `reference/shortcuts.md`: new subsection "Library search" (the Library's keys had no home); Back/Forward and Boards rows; the Mac key-order sentence.
- `reference/widgets/navigation.md`: the whole "Add a screen part" procedure changed (ui-diffs row 12), plus step 1 of the bottom navigation bar and a CAPTURE description.
- `account/index.md`: the version line of the **Download Nowa** dialog; `account/projects.md`: card text, from the capture agent's ui-diffs row.
- Pages the research listed as "no edit" and I confirmed unchanged: logic/navigation.md, logic/circuit.md, integrations/show-data.md, account/project-settings.md, plans-and-usage.md,
  account-settings.md, guides/ai-tips.md, guides/ship-tips.md.
- Not edited although they mention Linux/desktop in passing: none of my pages said "macOS and Windows" (grep), so no wording change was needed beyond account/index.md and the two Linux notes.
- No new CAPTURE placeholders and no new images, so no `captures/requests/W30c.md`. Placeholder changes: removed `integrations-firebase-firestore-2` (request row in `requests/W16.md`, status
  not-possible: should be marked dropped); reworded the state of `reference-navigation-2` (`requests/W13.md`, "skipped: low value"). `integrations-firebase-firestore-1` kept (see above).

## Needs a live check (app.nowa.dev 3.13.0)

1. **Firestore, the whole flow** (page: `integrations/firebase/firestore.md` and the revisit list below): (a) that the designer really has no way to add a main collection, a sub collection or a query, or to
   select one in the **Collections** / **Queries** editors (code says none: see the finding); (b) that opening `FirestoreService` or a collection from the Library (**Filter** > **Everything**) shows the
   editor with "select a query/collection from the outline panel to open it"; (c) whether a class written by hand in `collections.dart` (model with `@NowaGenerated({'fbCollectionType': 'fbMainCollection'})`) is
   picked up and then listed under **Select Collection** in the query builder; (d) whether query testing works in the Linux app (the Windows overlay is the only gate; `cloud_firestore` has no Linux support
   upstream, so it probably does not): nothing about Linux is written on the Firebase pages or in known-issues.
2. **Library with the View Only role** (part 6 #2): can a viewer use **Add**, **Rename**, **Delete**, **Insert** in the Library? `account/workspaces.md` deliberately says nothing about the Library.
3. **Dragging a package widget from the Library when its package is missing** (part 6 #3): not described on my pages (the integration pages use Ctrl/Cmd+K and Enter, which ask first).
4. **Page View in a project without `smooth_page_indicator`** (part 6 #4) and whether **Details** shows the **Dependencies** block, with **Hot Fix** adding the package, for the dots (`reference/widgets/navigation.md` says it does, from code).
5. **Screen parts dragged from the Library** (`reference/widgets/navigation.md`, "Add a screen part"): the capture says the drop lands in the body; `ScaffoldRule` suggests the slot. The page uses the
   **Details** > **Screen** slots and says a drag "can land in the body". Also not tried: Ctrl/Cmd+K then Enter for these four parts.
6. **Linux run pane** (`test/run.md`): does the run toolbar (**Phone**/**Tablet**, **Fullscreen**, **Hot Reload**) still do anything while the pane only offers **Open in Browser**?
7. **RevenueCat Paywall from the Library** (ui-diffs row 13): in the capture sandbox the widget was refused ("Bad state: The target expression should be a widget, but 'const PaywallView()' is a
   'PaywallView'") because the live analyzer returned no types for `purchases_ui_flutter`, and **Add** stayed on "Adding...". `integrations/revenuecat.md` still says "Press Enter to add it. If Nowa shows
   **Add Missing Dependencies**, click **Add**" and "The widget sits on the board as a placeholder". Not a label change; may be the sandbox. Check on a normal account.
8. **Library keyboard table** in `reference/shortcuts.md` ("Library search"): the Esc sequence (card, search, board), Enter vs Ctrl/Cmd+Enter, F2 (part 6 #10); all from `library_panel.dart:527-661`.
9. **Download Nowa dialog**: the **Linux** button is enabled only while `version/latest` carries a Linux link (research U16 saw 3.13.0 with `Nowa-v3.13.0-linux-x64.tar.gz` on 9 Oct).
10. **Boards chip tooltip text on Windows and Linux** (part 6 #11) and **Linux minimum system** (part 6 #5): not on my pages.

If the live check finds a Firestore entry point (or the product adds one), revisit exactly these places: `integrations/firebase/firestore.md` (intro, **Before you start** last bullet and Windows bullet, the whole
`## Add collections and queries in Nowa 3.13` section, the lead-in sentences of "Define your collections" and "Build a query", the lost steps in `git show HEAD:docs/integrations/firebase/firestore.md`);
`integrations/firebase/connect.md` (intro sentence, Windows bullet, the `collections.dart` / `queries.dart` table row); `troubleshooting/known-issues.md` (last sentence of the Firestore section);
`guides/data-and-state-tips.md` (the **Firestore** bullet under "Test queries before you build the screen").

## Product issue candidates

- **P-W30c-1 (high): Firestore collections and queries can't be added or opened visually in 3.13.** **Add Main Collection** / **Add New Query** and the collection and query lists live only in the file
  preview popup of `collections.dart` / `queries.dart` (`firebase_plugin.dart:37-47`), which only the sectioned **Files** panel opens, and that panel is code-mode only now (`side_bar.dart:36-55`,
  `files_tree_host.dart:266-282`). The **Collections** / **Queries** editors open but say "select ... from the outline panel to open it" and no outline exists. Possible fixes: host the two outlines in
  a plugin panel or beside the editors, or add Firestore entries to the Library **Add** menu through `registerDartFileCreator`.
- **P-W30c-2: the Library never checks the View Only role** (`library_host.dart` never reads `isViewOnly`; **Add**, **Rename**, **Delete**, **Insert** are always offered). Needs a live check of what the server
  allows.
- **P-W30c-3: a hidden way into the old Files panel** (`/project/:id?panel=files`, `workspace_options.dart:81-85,100-104`): opens the sectioned Files panel in the designer, with **Add to library**, **Add board**, **Import
  asset** and the file preview popups. Not documented on purpose.
- **P-W30c-4 (to confirm): screen parts (App Bar, Floating Button, Bottom Navigation Bar, Drawer) dragged from the Library may land in the body** instead of their slot, then the status bar says "Could not find index
  for navbar" (capture evidence in `captures/ui-diffs-3.13.md`; `drag_rule.dart:401,424-436`).
- **P-W30c-5 (to confirm): RevenueCat Paywall / `purchases_ui_flutter` is refused when the live analyzer returns no superclass** (capture evidence), and **Add Missing Dependencies** can hang on "Adding...".
- Already in `product-issues.md`: P3 (Cmd/Ctrl+B does nothing in code mode and the Run view: the shortcuts page says "not in code mode or the Run view"), P5 ("Classs" filter label: not quoted on my pages).
