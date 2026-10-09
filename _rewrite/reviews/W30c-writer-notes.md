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
- Create: Library header **Add** (+) (tooltip "Add": `packages/nowa_ui/lib/library/library_panel.dart:706-714`) then **New Global State...** /
  **New Model...** / **Generate Models From Json...** (`lib/project/panels/files_panel/add_lib_menu.dart:49-81`, menu built by
  `lib/project/panels/library_panel/library_host.dart:176-186`). Files land in `lib/globals` / `lib/models` whatever row is highlighted
  (`add_lib_menu.dart:62-72` uses `fs.globalsDir` / `fs.modelsDir`; `packages/core/lib/src/providers/project_provider.dart:381,387`).
  The old sentence "Inside `lib`, the **Add** button opens the same menu" is gone (it described the Files tree's `lib` row).
- Open: the default Library filter is **Widgets** (screens, components, widgets: `packages/nowa_ui/lib/library/library_contract.dart:225`),
  and the filter also applies to search results (`library_panel.dart:292-296,334-343`, `_shows`), so a new model or global state is
  hidden until **Filter** is **Models** / **Global states** / **Everything**. Menu entries: **Models**, **Global states** (`_kindName`,
  `library_panel.dart:960-975`). The research row says "or search its name", which is wrong for the default filter (search then
  shows the row "Show 1 more of other kinds", `library_panel.dart:835-840`), so the pages say "click **Filter** and choose ...".
  Kinds: a class with `toJson` or `fromJson` is a Model (`packages/core/lib/src/interpreter/block_utils.dart:283-291`), a
  `NotifierClassDecl` a Global state (`packages/core/lib/src/library/library_service.dart:238-250`, `_projectKind`).
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
  `add_lib_menu.dart:83-97`. The **Api** panel steps are unchanged (the Api panel still exists: `lib/project/panels/left_panel.dart:34`).

### integrations/admob.md, google-maps.md, revenuecat.md (C4)
- Step 1 now: "Press Ctrl/Cmd+K or click the **Widget** tool to open the [Library](../design/library.md), search for ... and press Enter."
  Ctrl+K and the **Widget** tool open the Library in add mode (`packages/designer/lib/src/actions/add_actions.dart:13-31`,
  `packages/designer/lib/src/widgets/designer_tools.dart:164-176`). The three widgets are Nowa picks in the **Integrations** category
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
  235-250`): each collection is a model class (`ClassDeclImpl.model`, `collections_manager.dart:70`, kind Model via `block_utils.dart:283-291`)
  and queries are the class `FirestoreService` (kind Class, `query_builder_manager.dart:43-52`); **Open** reaches the editor above,
  empty ("Nothing selected"). An empty `collections.dart` (fresh connect) has no row. The page says this (needs a live check).
- **Hidden path, deliberately not documented:** `/project/:id?panel=files` sets the side panel to **Files** in the designer
  (`lib/project/workspace_options.dart:96-113`, `lib/router.dart:258-270`), and `LeftPanel` then builds the sectioned Files panel
  (`lib/project/panels/left_panel.dart:31`), whose file click shows the old popups. Not a user-facing feature, so not on the page.
- **What the pages now say** (all text in `firestore.md` unless marked): intro and description reworded so they no longer promise "build
  queries by picking steps" as an action; a new `## Add collections and queries in Nowa 3.13 {#add-collections-and-queries}` section
  states the gap plainly and lists what works: existing collections and queries keep working in a Data Builder (**Firestore** source:
  `packages/data/lib/src/firebase/firebase_field.dart:70-76`), in Circuit (**FIREBASE** category, `firebase_plugin.dart:121-146`) and in the
  app; in code mode `collections.dart` / `queries.dart` open as plain Dart (`dart_editor.dart:60-65`) and can be edited. The page gives no
  format for hand-written collections (a collection is a model class carrying `@NowaGenerated({'fbCollectionType': 'fbMainCollection'})`:
  `collections_manager.dart:70-82`, `packages/core/lib/src/interpreter/declaration_runtime.dart:268-276`; sub collections add
  `fbSubCollection` and `fbParent`); not verified live that a hand-written class is picked up, so not claimed.
- Removed from `firestore.md`: steps 1-3 and 8 of "Define your collections" (open Files, click `collections.dart`, **Add Main Collection**,
  **Add Sub Collection**), the sentence about right-click **Remove** on a collection (tree only), steps 1-3 of "Build a query" (open
  `queries.dart`, **Add New Query**, **Function Name** / **Create**) and the CAPTURE placeholder `integrations-firebase-firestore-2`
  (can't be captured). The editors' own content (fields, builder steps, test) is kept, introduced as "A collection opens in the
  **Collections** editor ..." / "A query opens in the **Queries** editor ...". The removed text is in `git show HEAD:docs/integrations/firebase/firestore.md`
  so it can be restored if the entry point comes back. Capture request `integrations-firebase-firestore-1` (in `requests/W16.md`, status
  not-possible) is still in the page; the Queries view can't be shown with a query selected in 3.13 without the hidden path.
- Windows note: unchanged. The overlay is `kIsWeb == false && Platform.isWindows` only (`queries_builder.dart:104-130`), so on Linux the
  **Test** section is active. Not verified that testing works on Linux (`cloud_firestore` has no Linux implementation upstream): the
  pages say nothing about Linux (needs a live check, see end). I rewrote the two Windows sentences (firestore "Before you start",
  connect "Before you start") from "you can build queries but not test them" to "you can't test queries inside Nowa" because building
  isn't possible either in 3.13.
- connect.md: intro "sign-in, Cloud Firestore and push notifications are each a switch or a few clicks away" -> "sign-in and push
  notifications are each a switch away, and your project has the files for Cloud Firestore"; table row for `collections.dart` /
  `queries.dart` links `firestore.md#add-collections-and-queries`. Files created at connect: `collections_manager.dart:29-47`,
  `query_builder_manager.dart:43-52`, called from `firebase_manager.dart:92`. The sentence "Nowa's visual tools cover Authentication,
  Cloud Firestore and push notifications" is left (the Firestore editors, Data Builder source and Circuit category all exist).

