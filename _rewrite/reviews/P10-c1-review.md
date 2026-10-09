# P10-c1 review: logic, integrations and test pages updated to Nowa 3.13 (writer W30c)

Verifier: non-author agent. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Baseline for "what changed":
`git diff 9844ed6 -- <page>` in the docs repo, and `git diff b84bfdafd 3cb32031c -- <path>` in `/home/user/nowa` for the product (3.12.5 to
3.13.0). Code refs are `path:line` in the 3.13 tree. Tools: grep for exact labels; a link checker (relative links, `#anchors`, `/img/` and
`/videos/` files in all 14 pages, plus every inbound link with an anchor from the rest of `docs/`); a script that greps every bold label and
quoted string of the pages in the 3.13 Dart sources; a scan of every string literal the 3.12.5 to 3.13 diff removed, matched against the pages.

## Summary

| | |
|---|---|
| Pages checked | 14 (`logic/global-state`, `logic/models`, `logic/router`, `integrations/firebase/{firestore,connect,auth}`, `integrations/rest-api/index`, `integrations/{admob,google-maps,revenuecat,deep-links}`, `test/{instant-play,run,problems}`) |
| Claims checked | about 260 (every label, key, step and behavior in the changed passages; unchanged text checked where a 3.13 diff touches its code) |
| Fixed | 5 edits on 4 pages: `firestore.md` (2 lead-in sentences that contradicted the new section), `run.md` (Linux paragraph), `global-state.md` and `models.md` (one action per step) |
| Removed | 0 |
| Left as written, code supports, live check still wanted | 6 (list at the end) |
| Open issues | 5 (the `?panel=files` decision, Firestore files not loaded on project open, an uncapturable CAPTURE placeholder, `design/library.md` missing from `pages.md`, one long page) |

Most serious finding: none of the W30c claims is wrong. The Firestore finding holds: the 3.13 designer has no button for adding a collection or a
query (audit below). The only reachable path to the old popups is a hand-typed URL parameter, `?panel=files`; I left it undocumented (open issue 1).

No 3.12.5 wording is left on the 14 pages: no "Widgets panel", no **Files** panel in the designer, no "New Model..." in **Files**, no "widget
picker" for Ctrl/Cmd+K (grep on all pages: the only "picker" hits are the type picker on `models.md`).

## Link, anchor and style check (all 14 pages)

- Links: 164 outgoing links (relative `.md` paths, `#anchors`, `/img/`, `/videos/`), 0 broken. Inbound links with an anchor from the rest of
  `docs/` to these pages: 46, 0 broken (including `firestore.md#add-collections-and-queries` from `connect.md`, `guides/data-and-state-tips.md`
  and `troubleshooting/known-issues.md`, `router.md#start-on-login-or-home`, `connect.md#refresh-the-apps-and-config-files`). The checker was
  tested with a missing anchor and reports it. `design/library.md` (new in 3.13, W30a) is linked 8 times from these pages and is not in `pages.md` (that file
  predates 3.13); every other link target is in `pages.md`.
- Required anchors: `{#start-on-login-or-home}` (router), `{#add-collections-and-queries}` (firestore, new), `{#sha-fingerprints}`, `{#read-the-logs}`
  all present. No redirect needs an anchor on these pages (`redirects.js`: only page-level redirects).
- Capture placeholders: 10 on the 14 pages, all well formed (`id | state | show | crop`), no malformed one. `integrations-firebase-firestore-2`
  is gone, as the writer said.
- Style: front matter has title and description on every page; no H1; headings sentence case; no `---` rules; no emoji; no hype words (grep);
  at most 2 admonitions per page.
- Length (rendered words, links and comments not counted): global-state 878, models 913, router 1,142, firestore 1,148 (1,060 before 3.13), connect 985,
  auth 984, rest-api/index 1,384 (unchanged, was already over the guide), admob 680, google-maps 548, revenuecat 499, deep-links 655, instant-play 634,
  run 1,150 (1,099 before), problems 1,186. Nothing grew past the guide because of 3.13; not cut.

## Firestore entry-point audit (`docs/integrations/firebase/firestore.md`)

Question: does the 3.13 designer give a user any way to add a main collection, a sub collection or a query, or to select an existing one in the
**Collections** / **Queries** editors? Answer after checking every route below: **no, not through the interface**. One URL parameter reaches the old
popups (last row). The section `{#add-collections-and-queries}` is true as written ("no button in the designer").

| Where I looked | Result | Code ref |
|---|---|---|
| The strings **Add Main Collection**, **Add New Query**, **Add Sub Collection** | Only in `CollectionsOutline`, `QueryBuilderOutline`, `CollectionTile` | `packages/data/lib/src/firebase/firestore/widgets/firestore_outline.dart:94,149`, `firestore_outline_tile.dart:96` |
| Where those widgets are built | One place: `FileInfo.preview` of `collections.dart` / `queries.dart`. `FirestoreOutline` is defined and never used | `packages/data/lib/src/firebase/firebase_plugin.dart:37-47` (grep of `CollectionsOutline`, `QueryBuilderOutline`, `FirestoreOutline`, `FirestoreSetup`: no other builder) |
| Who reads `FileInfo.preview` | Only `FilePreviewDialogBody`, opened only by the **Files** tree on a click in design mode; in code mode the same click opens the file | `lib/project/panels/files_panel/file_preview_body.dart:24-27`, `files_tree_host.dart:266-282` |
| Is **Files** reachable in the designer | No. The sidebar lists **Files** only when `codeMode`; code mode switches the panel to **Files**. Even with the "New UX" flag the "More panels" menu lists `MainSidebar.getIcons(codeMode:)`, so no **Files** there either | `lib/project/side_bar.dart:44-54,219,277-300`, `packages/core/lib/src/panels/panel.dart:205-209` |
| Library **Add** (+) menu, including plugin entries | **New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, plugin entries, **Import Dart code...**, **Upload Assets...**, debug-only **Import template**. The only plugin entry is **API Collection...**: `registerDartFileCreator` has one caller | `add_lib_menu.dart:39-103`, `library_host.dart:176-186`, `packages/data/lib/src/api/api_plugin.dart:35`, `api_util.dart:113-118`, `core_hooks.dart:58-62` |
| Library row menu | **Insert**, **Open**, **Upload assets...**, **Rename**, **Delete**, **Show in code**. No Firestore entry | `library_host.dart:156-173` |
| Firebase settings page | **Refresh/Update apps and config files**, **Authentication**, **Providers**, **Push Notifications (FCM)**, **SHA Certificate Fingerprints**, **Go to your Firebase Dashboard**, **Disconnect Project**. No link to the Firestore files. `NotConnectedView` only appears when not connected | `packages/data/lib/src/firebase/setup/views/connected_main_screen.dart`, `firestore/widgets/firestore_common.dart:9-43` |
| Outline panel and plugin panels | The **Outline** panel is the widget tree and shows nothing for a non-designer editor; only Supabase registers a plugin panel | `packages/designer/lib/src/panels/outline_panel.dart:16-36`, `grep registerPluginPanel`: `supabase_plugin.dart:24` |
| Context menus, command palette, Search panel, AI | `grep -i firestore` over `lib/`, `packages/designer`, `packages/ai`, `packages/core/lib` (outside the interpreter libraries): only package allow-lists. The **Search** panel opens files in the editor, not the popup | `lib/project/panels/search_panel.dart:478,634,653` |
| Who sets the selection | `openedQueryObject` and `openedCollectionObject` are written only by the outline tiles and by the managers' add and remove calls; those calls come only from the outline widgets (and tests) | `firestore_manager.dart:27-58`, `query_builder_manager.dart:61,69,78`, `collections_manager.dart:82,89,94`, `firestore_outline_tile.dart:74,248` |
| What the editors show when opened (Library **Open**, **Filter** set to **Everything**) | The **Collections** / **Queries** views open (breadcrumb label from `BlockView.name`), say "Nothing selected" and "select a collection from the outline panel to open it" / "select a query from the outline panel to open it" | `firebase_plugin.dart:56-63`, `firebase_view.dart:12-61`, `dart_editor.dart:26-30,58-80`, `top_bar_mapper.dart:121`, `collections_workspace.dart:20`, `queries_builder.dart:26`, `firestore_common.dart:57-76` |
| `?panel=files` | **Reaches the old UI.** `WorkspaceOptions.fromQuery` reads `panel`; `ApplyWorkspaceOptions._resolvePanel` matches names from `MainSidebar.getIcons()` and `getIcons(codeMode: true)`, so `files` sets `sidePanel = 'Files'` in the designer; `LeftPanel` builds `FilesPanel(showAllFiles: false)`, the sectioned tree; a click on `collections.dart` / `queries.dart` shows the old popups. It works on `/project/:id` and `/playground` | `packages/core/lib/src/panels/workspace_options.dart:14-23`, `lib/project/workspace_options.dart:72-107`, `lib/router.dart:258-270`, `lib/project/panels/left_panel.dart:31`, `files_panel.dart:20-33`, `files_tree_host.dart:134-148,266-282` |

Why I left `?panel=files` out: it is a hand-typed address parameter, not a control. No menu, link or button produces it; the only UI that builds
such links, **Settings** → **Project Details** → **Sharing** → **Link options**, offers **Code mode**, **Preview**, **Assistant** and **Opened file**
and nothing else (`packages/core/lib/src/settings/sharing_settings.dart:322-375`, comment at `:337` "the one panel worth pointing a shared link at"). It is outside D2
(hidden features are not documented). I could not run it live, and the code suggests the old popups may not work after a project reopens
(open issue 2). If you decide to document it, the sentence would be: "To get the old popups back for now, open your project with `?panel=files`
added to its address; **Files** then opens in the designer." Nothing else on the page would change.

Fixes on this page, both because the new section says the editors can't select anything, so "A collection opens in the Collections editor" was
untrue as a statement about 3.13:

| claim | verdict | code ref | note |
|---|---|---|---|
| "A collection opens in the **Collections** editor with its field list and, on the right, a details panel" | fixed | `collections_workspace.dart:18-45` (the fields show only when `getCurrentCollection` is set) | now "When a collection is selected, the **Collections** editor shows its field list and, on the right, a details panel" |
| "A query opens in the **Queries** editor, where you build it one step at a time" | fixed | `queries_builder.dart:24-27` | now "When a query is selected, the **Queries** editor lets you build it one step at a time" |

## docs/integrations/firebase/firestore.md

Changed in 3.13: description, keywords, intro, **Before you start** (2 bullets), the new section, the two section lead-ins, the removed steps and
CAPTURE, one sentence at the start of **Test a query**.

| claim | verdict | code ref | note |
|---|---|---|---|
| Nowa 3.13 has no button in the designer for adding a collection or a query | ok | audit above | |
| **Add Main Collection** / **Add New Query** used to open when you clicked `collections.dart` / `queries.dart` in **Files** | ok | `files_tree_host.dart:266-282`, `firebase_plugin.dart:37-47` | 3.12.5 had **Files** in the designer sidebar (`3.12.5:lib/project/side_bar.dart:63`, next to **Widgets** at `:43`) |
| **Files** now shows only in code mode, where a click opens the file as plain code | ok | `side_bar.dart:44-54`, `files_tree_host.dart:268-269` | link `../../code/code-mode.md` resolves |
| Library lists `FirestoreService` and the collections under **Filter** → **Everything**; **Open** shows the **Queries** / **Collections** editor | ok | `library_service.dart:221-259` (`FirestoreService` is a class, kind Class; collections are models via `ClassDeclImpl.model`, `collections_manager.dart:70`, kind Model via `block_utils.dart:283-291`), `library_panel.dart:753-756`, `library_host.dart:147-154`, `library_actions.dart:67-73` | needs a live check, code supports it |
| The editor says "select a query/collection from the outline panel to open it" and there is no outline panel | ok | audit above | exact strings |
| Existing collections and queries keep working in a **Data Builder** (source **Firestore**), in Circuit (**FIREBASE**) and in the running app | ok | `firebase_field.dart:70-76`, `firebase_plugin.dart:121-146`, `suggestions` shown upper case at `link_menu.dart:331` | "already in your project" is about existing use; see open issue 2 for the list in the picker |
| In code mode the two files open as plain Dart and can be edited | ok | `dart_editor.dart:60-65` | the page does not claim the visual editors pick up hand edits |
| Windows: Test overlay "Testing Firestore Queries isn't possible on Windows version"; only on Windows | ok | `queries_builder.dart:104-146` (`kIsWeb == false && Platform.isWindows`) | Linux is not gated; page is silent about Linux (live check) |
| A collection is a model with `fromJson` / `toJson`; "This table only represents the structure, not the data."; **+ Field**; new field is `String?`; click a field for details | ok | `collections_manager.dart:70`, `collections_workspace.dart:33`, `declaration_list_widgets.dart:131-160` (`+` and `itemTitle: 'Field'`) | 3.13 diff of these files is restyle only |
| Query builder: **Select Collection**, "No Collections", **Select Field** / **Select Operator** / **Select Value**, **Create New Param**, **Enter Value**, backspace icon, check and warning tooltips, **Query** heading | ok | `lists_widgets.dart:68-135`, `query_argument_editor.dart:60-290`, `queries_builder.dart:51-100` | unchanged |
| **Test**, **Parameters**, **Preview**, **Run Test**, **Restart**, "Data was added successfully", "No Data was found.", "Error:" | ok | `query_test_section.dart:52-237` | |
| Data Builder steps: **Add Wrapper** → **Data Builder**, **Source** → **Firestore**, **Query** row, **Select Firestore Query**, `data.docs`, `data()` | ok | `wrappers_to_add.dart:86`, `data_field.dart:194`, `firebase_field.dart:60-80`, `data_link_menu.dart:73` (`'Select $title'`) | |
| "Connecting creates the collections and queries files" | ok | `firebase_manager.dart:92`, `collections_manager.dart:29-47`, `query_builder_manager.dart:35-52` | |
| 3 links to `#add-collections-and-queries`, link to `#use-a-query-in-your-app`, 6 more | ok | link checker | |

Not claimed (as the writer chose): that a hand-written class in `collections.dart` is picked up; that testing works on Linux.

## docs/integrations/firebase/connect.md

Changed in 3.13: intro sentence, the Windows bullet, the `collections.dart` / `queries.dart` table row.

| claim | verdict | code ref | note |
|---|---|---|---|
| After connecting, sign-in and push notifications are each a switch; the project has the files for Cloud Firestore | ok | `connected_main_screen.dart` (switches **Authentication**, **Push Notifications (FCM)**), `firebase_manager.dart:92` | |
| Windows: you can connect, but can't test Firestore queries inside Nowa | ok | `queries_builder.dart:104-146` | |
| Table row: both files start with no collections and no queries; no designer button in 3.13; link `firestore.md#add-collections-and-queries` | ok | `collections_manager.dart:29-47` (empty `DartFile.fromDeclarations([])`), `query_builder_manager.dart:45-52`, audit | |
| Disconnect dialog **Disconnect Firebase Project**, **Keep Files**, **Clear All Files** | ok | `disconnect_dialog.dart:50-80` | 3.13 diff: NButton restyle |
| 35 other labels (**Continue with Google**, **Connect Apps**, **Reload Projects**, **Refresh/Update apps and config files**, **Go to your Firebase Dashboard**, **Disconnect Project**, ...) | ok | `setup/views/*.dart` | the 3.13 diff of `setup/` is NButton restyle only; labels unchanged |
| Links (11), anchors `#refresh-the-apps-and-config-files`, `#sha-fingerprints` | ok | link checker | |

## docs/integrations/firebase/auth.md

Changed in 3.13: one sentence ("In Nowa 3.12.5," to "Currently,").

| claim | verdict | code ref | note |
|---|---|---|---|
| **Google** writes `signInWithGoogle()` for an older `google_sign_in` than the 7.x Nowa installs | ok | `fb_auth_blocks.dart:121-122` (`GoogleSignIn().signIn()`, `googleUser?.authentication`: the 6.x API), `fb_auth_manager.dart:66` (`^7.2.0`) | both files are not in the 3.12.5 to 3.13 diff, so "Currently" is true |
| Turning **Google** off removes the function and the package | ok | `fb_auth_manager.dart:136-137` | |
| 40 other labels and the function table | ok | `fb_auth_blocks.dart`, `fb_auth_manager.dart`, `fb_sha_keys_management.dart:98-110` | restyle only in 3.13 (`Add` is an NButton with `loading`) |

## docs/integrations/rest-api/index.md

Changed in 3.13: one sentence (L23).

| claim | verdict | code ref | note |
|---|---|---|---|
| **API Collection...** is in the **Add** (+) menu of the Library | ok | `api_util.dart:113-118` (`title: 'API Collection...'`), `api_plugin.dart:35`, `add_lib_menu.dart:83-97`, plugin id `http` registered at `lib/main.dart:44` | file lands in `lib/api/<name>.api.dart` as the page says (`api_util.dart:127-133`) |
| **Api** sidebar panel steps: **Collections**, **Add Collection**, **New Collection**, **Create New Collection**, **Class name**, **Path**, **Submit** | ok | `api_outline.dart:155-168,274-279`, `create_collection_dialog.dart:60` | the Api panel still exists (`left_panel.dart:33`) |
| Settings, request, body, test, model labels (about 80) | ok | `packages/data/lib/src/api/views/**` | the 3.13 diff of that folder changes no label (NButton, NListTile restyle) |
| Link `../../design/library.md` | ok | link checker | |

## docs/integrations/admob.md, google-maps.md, revenuecat.md

Changed in 3.13: step 1 of the widget section on each page; revenuecat step 2.

| claim | verdict | code ref | note |
|---|---|---|---|
| Ctrl/Cmd+K or the **Widget** tool opens the Library | ok | `designer_setup.dart:51` (`AdaptiveActivator(keyK)`), `add_actions.dart:16-31` (`toggleSidePanel('Library')`, `focusSearch(add: true)`), `designer_tools.dart:174-182` (`tooltip: 'Widget'`) | |
| Search **Admob Banner** / **Google Maps** / **RevenueCat Paywall** in the Library finds them with the default **Widgets** filter | ok | `widgets_to_add.dart:106,873,937,945` (built-in picks in category **Integrations**, kind widget), `library_contract.dart:225`, `library_panel.dart:241,344,394` (first result highlighted, Nowa's picks first) | no project or package name contains these phrases, so the first row is the pick |
| Enter inserts the highlighted result | ok | `library_panel.dart:622-661` (`_onSearchKey`), `:527-541` (`_activate`: insert when adding) | in add mode (hint **Add...**, `:739`); the live run in `P10-live-checks.md` item 1 saw Ctrl+K, a typed name and Enter open **Add Missing Dependencies** (Lottie) |
| If a package is missing Nowa shows **Add Missing Dependencies** with **Add** | ok | `library_actions.dart:76-92` (`placeLibraryWidget` → `MissingDependencyDialog`), `missing_dependency_dialog.dart:47,82-110`, `declaration_info_factory.dart:53-55` (`AdmobWidgetInfo`, `MapWidgetInfo`, `PaywallWidgetInfo`) | |
| revenuecat step 2 "Press Enter to add it" (was "Choose it") | ok | same | |
| Where the widget lands ("Place the banner on a screen") | ok | `common_design.dart:194-211` (`placeBlock` at the pointer) | step 2 stays as a guide to move it |
| "No API Keys" with **AdMob setup**, **AdMob Android setup**, **AdMob IOS setup**; "This is an editor preview for Admob"; "no adUnitId"; "BannerAd failed to load" | ok | `admob_package_config.dart:296-333`, `nowa_ad_banner_widget.dart:57-81` | 3.13 diff: NButton restyle |
| "Run to preview", "Run on a simulator/emulator or mobile device to preview" | ok | `integration_preview_view.dart:46,69` | file not in the diff |
| Other labels and settings text (about 35) | ok (unchanged) | `settings` diff restyle only | |
| Links (8 / 11 / 10), `../design/library.md` | ok | link checker | |

## docs/integrations/deep-links.md

Changed in 3.13: two sentences ("In Nowa 3.12.5," / "Nowa 3.12.5 writes" to "Currently," / "Nowa writes").

| claim | verdict | code ref | note |
|---|---|---|---|
| Saving **URL Scheme** writes only the iOS `Info.plist` first; the Android manifest gets the scheme the next time Nowa rewrites it | ok | `app_links_package_config.dart:35-47` (the iOS token has a label, the Android token has none), `package_config_service.dart` | neither file is in the 3.12.5 to 3.13 diff |
| Android scheme uses host `open.my.app`; **Host** writes an App Links filter with `autoVerify`; iOS associated domains not added | ok | `app_links_package_config.dart:76-118` | |
| Google Sign-In also writes a URL type to `Info.plist`; with both saved there are two `CFBundleURLTypes` entries | ok | `app_links_package_config.dart:77-90`, `google_sign_in_package_config.dart` (diff: one button) | |
| **URL Scheme**, **Host**, **Enabled**, **Enable GoRouter**, `FlutterDeepLinkingEnabled` off | ok | `app_links_package_config.dart:11-61` | |
| Links (8) | ok | link checker | |

## docs/logic/global-state.md

Changed in 3.13: step 1 of **Create a global state**, steps 1-2 of **Add variables and functions** (new), the last sentence of **Attach or detach**.

| claim | verdict | code ref | note |
|---|---|---|---|
| **Library** is in the sidebar; its header has **Add** (+) | ok | `lib/project/side_bar.dart:44-54` (Library in slot 2; **Files** only in code mode), `packages/nowa_ui/lib/library/library_panel.dart:700-715` (`PanelHeader(title: 'Library'`, `NIconButton(tooltip: 'Add'`) | |
| **Add** menu has **New Global State...** | ok | `add_lib_menu.dart:69`, `library_host.dart:176-186` | |
| Dialog shows **Class name**, **Path**; click either to change; **Submit** | ok | `file_name_text_field.dart:175,202`, `create_file_dialog.dart:118-125` | unchanged except NButton |
| The file goes in `lib/globals` and is attached | ok | `add_lib_menu.dart:69-77`, `project_provider.dart:387` | the highlighted row only matters for **New Widget...** / **New Folder...** / uploads |
| Variables-panel route: **Create global state** (file in `lib`), **Pick global state**, "No global states found", **Detach global state**, **Open in new tab**, "This global state is not attached to the app.", **Attach**, **Globals** | ok (unchanged) | `global_state_widgets.dart:22-95,170`, `global_state_menu.dart:30-40`, `class_editor.dart:65-72` | restyle only in 3.13 |
| The default **Widgets** filter hides global states; **Filter** → **Global states** lists them | ok | `library_contract.dart:225`, `library_panel.dart:745-772`, `:971-980` (`'Global state' + 's'`) | the writer's note is right: search with the default filter does not list it either (`library_panel.dart:831-841`) |
| The state sits in the `globals` folder; its row is the class name | ok | `library_service.dart:221-259` (`NotifierClassDecl` → global state), `library_panel.dart:247-250` (top-level folders start open) | no `lib` row |
| Double-click, or select it and press Enter, opens it; a single click shows a details card | fixed (wording) | `library_panel.dart:515-541,544-577,911`, `library_host.dart:147-154`, `library_actions.dart:67-73` | the step had a find action and an open action; now one action per step |
| Editor: class list on the left (**View Code**), **Variables** and **Functions** in the middle, Circuit on the right; click the class name first | ok | `dart_editor.dart:144-300` (`DefaultDartEditor`), `library_actions.dart:67-73` (`navigate` does not select the class) | screenshot `logic-global-state-1` is from 3.13 |
| Steps 4-8 (**Variables** **+**, **Type**, **Default Value**, **Is Final**, **Params**, **LOCALS**, `add`, `notifyListeners`) and the sections below | ok (unchanged) | not in the 3.13 diff; `declaration_list_widgets.dart` diff is 3 lines (`child` to `title`) | |
| "open the global state from the Library" for all variables and functions | ok | same | |
| Links (13) | ok | link checker | |

## docs/logic/models.md

Changed in 3.13: step 1 of **Create a model**, steps 1-2 of **Add fields** (new), step 1 of **Generate models from JSON**.

| claim | verdict | code ref | note |
|---|---|---|---|
| **Library** → **Add** (+) → **New Model...** | ok | `add_lib_menu.dart:61`, `library_host.dart:176-186` | |
| "task model" becomes `TaskModel` in `task_model.dart`; file in `lib/models` | ok | `file_name_text_field.dart:24-33` (`convertNameCase` pascal / snake), `project_provider.dart:381` | unchanged |
| The default **Widgets** filter hides models; **Filter** → **Models** lists them; the file sits in the `models` folder | ok | `library_contract.dart:225`, `library_service.dart:247-259` (`isModel`: a class with `toJson` or `fromJson`, `block_utils.dart:283-291`), `library_panel.dart:971-980` | |
| Double-click, or select and Enter, opens it | fixed (wording) | as global-state | one action per step |
| **Variables** / **Functions** columns, **Name**, **Type**, **Default Value**, **Is Final**, **Is Static**, **View Code** | ok (unchanged) | `dart_editor.dart:144-300`, `variable_widgets.dart` (diff restyle) | |
| **Add** (+) → **Generate Models From Json...**; dialog **Generate Models**; steps **Content**, **Select Data**, **Generated Models**; **Wrap**, **Compress**, **Prettify**; **Select All**, **Collapse All**, **Expand All**; **Name**, **Path**; **Next**, **Save and Open** | ok | `add_lib_menu.dart:79-82`, `generate_models_dialog.dart:82,148-171,115-140`, `json_editor.dart:148-160`, `selecting_data_section.dart:50-66`, `generated_models_section.dart:65-72` | **Save and Open** because the Library passes an `editorProvider`; 3.13 diff of the dialog is NButton restyle |
| Rest of the page (Create instance, list of models, **Select type**, **show more...**) | ok (unchanged) | not in the 3.13 diff | |
| Links (12), `variables.md#choose-a-type` | ok | link checker | |

## docs/logic/router.md

Changed in 3.13: one word (**Delete Route** to **Delete route**).

| claim | verdict | code ref | note |
|---|---|---|---|
| Right-click a route → **Delete route** | ok | `packages/core/lib/src/editors/router_editor/router_block_view.dart:271` | 3.12.5 read "Delete Route" |
| **Remove Route** dialog: "...This will also remove all of its child routes." | ok | `router_editor_actions.dart:144-150` | unchanged |
| **Add Route** (+), **Route**, **Add Sub-Route**, **Router Configuration**, **Routes**, chip menu **Rename** / **Delete**, **Enable GoRouter**, **Confirm Action** | ok | `router_block_view.dart:122-150,359`, `router_context_menus.dart:23-40`, `go_route_node_view.dart`, `router_migration_editor.dart` | the whole 3.13 diff of `router_editor/` is NMenu / NButton restyle plus the one label |
| **Router** icon in the sidebar below the divider | ok | `side_bar.dart:102-113,149-153` | |
| Rest (Redirect Logic steps, Circuit, links) | ok (unchanged) | | links (16) resolve |

## docs/test/instant-play.md

Changed in 3.13: step 2 ("and selects it").

| claim | verdict | code ref | note |
|---|---|---|---|
| Click the play button (tooltip **Play**): the board zooms to the item and selects it; an orange border marks it | ok | `packages/designer/lib/src/panels/canvas_titles.dart:318-339` ("Playing a canvas also selects it, as clicking its title would"; `animateTo(rect, zoomLevel: 0.75)`), `nowa_colors.dart:3` (`0xFFFFAB3F`), `play_mode.dart:418-424` (4 px border) | selection runs only when play starts (`rect` is null on **Stop**) |
| Title bar shows the play button on hover or when selected; **Stop** in the title bar and in the controls below | ok | `canvas_titles.dart:318-338` (visible when hovered or selected; tooltip `playing ? 'Stop' : 'Play'`), `play_mode.dart:495-560` | |
| Controls: "This screen is capturing scroll", **Share preview**, **Reset zoom**, **Stop**, warning tooltip text | ok | `play_mode.dart:510-548` | file diff: border only |
| Right-click **Play** shows when exactly one widget is selected and nothing plays | ok | `widget_context_menu.dart:19,22`, `board_play_controller.dart:51-63` | |
| Rest (differences list, placeholders, placeholders vs real values) | ok (unchanged) | `integration_preview_view.dart:46,69` | |
| Links (10) | ok | link checker | |

## docs/test/run.md

Changed in 3.13: the Linux paragraph, keyword "Linux".

| claim | verdict | code ref | note |
|---|---|---|---|
| In the Linux desktop app the in-app preview is not available; the pane says **Your app is running** and "The in-app preview is not available on Linux yet. Open it in your browser instead."; **Open in Browser** and the address below it | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:128-131,145-170` (`NPlatform.isLinux`, `NButton(label: 'Open in Browser', onPressed: launchUrl)`, `SelectableText(url)`), `packages/nowa_runtime/lib/src/nowa_platform.dart:18` | |
| Opening in the browser needs a click | fixed | `nowa_run_preview.dart:165` | the first sentence said "the preview opens in your browser" and read as automatic; now "the app shows in your browser instead of inside Nowa", then the click |
| Web app on a Linux computer is not affected | ok | `nowa_platform.dart:18` (`!kIsWeb`) | not written on the page |
| Run toolbar (**Back to board**, **Phone** / **Tablet**, **Fullscreen**, **Hot Reload** / **Hot Restart**, **Start** / **Stop**, **Open in Browser** / **Open on Mobile**, "Scan the QR"), Ctrl/Cmd+F, Shift+R, Ctrl/Cmd+P | ok (unchanged) | `top_bar_view.dart:514-583`, `top_bar_mapper.dart:187-188`, `nowa_run_play_tools.dart:33`, `actions_setup.dart:20-21`, `designer_setup.dart:50-51` | 3.13 moved the run tools into the new top bar view; labels are the same |
| **Run** split button, **Run on**, **Embedded preview**, **iOS & Android devices** + "Download the desktop app", **Hide**, "Starting app...", **Start App**, error screens, **Fix with AI**, **Retry**, **Report issue**, **Restart**, **Save** in the playground | ok (unchanged) | `run_button.dart:545-642`, `nowa_run_preview.dart:58-123`, `nowa_run_error_actions.dart:87-108`, `lib/sandbox/sandbox_save.dart`, `top_bar.dart:376` | restyle only |
| **Pub get**, **Clear**, Console **Logs**, "Flutter SDK path is not set..." | ok (unchanged) | `packages/core/lib/flutter_tool.dart:38` | |
| Links (10), `#read-the-logs`, `desktop-app.md#setting-up-flutter-sdk` | ok | link checker | |

## docs/test/problems.md

Changed in 3.13: one sentence in the first table row.

| claim | verdict | code ref | note |
|---|---|---|---|
| A package listed in `pubspec.yaml` with `sdk:`, `git:` or `path:` doesn't cause "'<package>' is imported but is not in the pubspec." | ok | `packages/core/lib/src/interpreter/packages/package_service.dart:363-370` (`isPackageInstalled`: `sdk` map counts), `:55-70` (`installedPackages` includes `git` / `path` via `isSource`), `:410-425` (`PackageProblemFinder` skips installed names) | holds for cloud and local projects: it reads the pubspec, not the resolver |
| Fix adds the package at its latest version | ok | `package_service.dart:419` (`addPackageByName`) | unchanged |
| **From Nowa (Instant)**, **From Code Analysis (Accurate)**, **Refresh**, **Run Code Check**, **Which code Nowa checks**, **All files**, **Only @NowaGenerated**, "Including code Nowa did not generate", **Navigate**, **Copy**, **Open File**, **Fix**, **Fix Ambiguous Import**, **Apply Fix**, **Reset main file** | ok (unchanged) | `problems_panel.dart:263,311,348,523`, `errors_panel.dart:106`, `fix_ambiguous_import_problem_dialog.dart:30,102`, `main_problems_finder.dart:19` | 3.13 diff: NListTile / NButton restyle |
| Status-bar counts, "n files changed since last check" | ok | `lib/status_bar.dart` (no diff), `problems_panel.dart:158` | the screenshot `test-problems-1` still shows `v3.12.5-78` in the status bar; retake pending (not a text claim) |
| Links (16) | ok | link checker | |

## Needs a live check (kept as written; the code supports them)

1. **Firestore, whole flow** (`firestore.md`): that the designer really offers no way to add or select a collection or query (code: none, audit above); that opening `FirestoreService` or a collection from the Library with **Filter** → **Everything** shows the editor with "Nothing selected"; whether a hand-written collection class would be picked up (not claimed); whether query testing works on Linux (not claimed).
2. **Linux run pane** (`run.md`): what the run toolbar (**Phone** / **Tablet**, **Fullscreen**, **Hot Reload**) does while the pane only offers **Open in Browser** (the page says nothing).
3. **RevenueCat Paywall from the Library** (`revenuecat.md`): in the capture sandbox the widget was refused and **Add** stayed on "Adding..." (ui-diffs row 13). Nothing in 3.13 changed that code path; may be the sandbox's analyzer. Check on a normal account.
4. **Library flows on the logic pages**: double-click or Enter on a model or global state row opens the editor with the class list (code-verified; screenshots from 3.13 show the editor).
5. **Library Enter after typing** (`admob.md`, `google-maps.md`, `revenuecat.md`): Enter inserts the first result at the pointer's last position (code-verified; `P10-live-checks.md` item 1 confirms the **Add Missing Dependencies** step for Lottie; the three integration widgets themselves were not tried).
6. **Hidden path `?panel=files`**: code says it works; not run.

## Open issues

1. **`?panel=files` (decision for the lead).** It reaches the old Files panel and popups in the designer (audit above, last row), so, by the code, a user can still add collections and queries by editing the address. I left it undocumented: it is not a control, the Sharing link options don't offer it, and D2 says hidden features stay out. If you want it on the page, the one sentence is in the audit section; if the product restores a real entry point, the places to revisit are the writer's list (`W30c-writer-notes.md`, end).
2. **Firestore files are loaded only at connect or refresh, not when a project opens** (code reading, same in 3.12.5, not a 3.13 change, needs a live check). `FirestoreManager.loadFiles()` (which fills `FBQueryManager` and `FBCollectionsManager`) is called only from `FBManager.createSetup` (`firebase_manager.dart:92`), which runs on connect, on **Refresh/Update apps and config files** (`connected_main_screen.dart:50`) and when Google sign-in is added (`fb_auth_manager.dart:63`). `FBManager.load()` on project open loads only `FirebaseService` (`firebase_manager.dart:60-75`). If that is right, after reopening a connected project the **Select Firestore Query** list (`firebase_field.dart:76`), the query part of the Circuit **FIREBASE** category (`firebase_plugin.dart:134`) and **Select Collection** ("No Collections") are empty until the user clicks **Refresh/Update apps and config files**, and on the old popup **Add New Query** would throw "Firestore queries class is not found" while **Add Main Collection** would do nothing. Pages affected, unchanged: `firestore.md` ("Build a query" step 2, "Use a query in your app" step 3 and the Circuit paragraph). I did not change them: a live run decides. Candidate for `product-issues.md`.
3. **CAPTURE `integrations-firebase-firestore-1`** (`firestore.md:76`) asks for a query built and tested in the **Queries** view. In 3.13 that state needs the hidden path. The placeholder is only a comment; the capture request is already marked not-possible. Consider deleting the comment until an entry point exists.
4. **`design/library.md`** is linked from these pages and is not in `pages.md` (it predates the 3.13 pages). Add a row when the lists are next synced.
5. `rest-api/index.md` is 1,384 rendered words (was before 3.13); not touched by this batch beyond one sentence.
