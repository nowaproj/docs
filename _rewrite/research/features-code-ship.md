# Features: Code, Git, running and shipping

Source: /home/user/nowa-master (v3.12.5). Researcher: features-code-ship research subagent. 2026-10-06.

Cross-area notes (one line each): the Problems panel UI, top bar, sidebar, status bar and shortcuts belong to the
editor-shell research; Instant Play on the board belongs to the designer research (covered here only to contrast it
with Run); creating/importing local projects, the dashboard Project Sync dialog, workspaces/monorepo package chip and
desktop-app access belong to the account/projects research; custom functions in Circuit belong to the logic research;
"Fix with AI" prompts belong to the AI research. Desktop-app access is itself entitlement-gated
(`lib/router.dart:76-81`, redirects to `/upgrade`), which affects every "Desktop app only" feature below.

## Summary

Code
- **Code mode** (`<>` button, top bar): switches the workspace from the board to a code editor over every project file, with an optional preview pane.
- **Code editor**: Dart/text editor with find/replace, autocomplete, ⌘/Ctrl-click go to definition, error and conflict banners.
- **Code and design sync**: visual edits regenerate Nowa-owned code; your code edits compile back into the design on save; hand-written code is kept verbatim until you change it visually.
- **Your own code on the board**: Nowa interprets your Dart to draw it; unsupported constructs are skipped and reported, unreadable widgets show as placeholders; Run compiles everything for real.
- **Hybrid approach (VS Code / IDE + Nowa)**: a local project is a normal Flutter folder; Nowa watches it, "Open in VS Code" jumps to the file. (Desktop app only, Local projects only)
- **Import Dart code...**: paste or load a `.dart` file and add it as Nowa-editable code or as custom code.

Files and packages
- **Files panel**: tree of `lib`, `boards`, `assets` on the board; the whole project in code mode.
- **Add to library / Add board / Import asset / New Folder**: create Dart files (widget, model, global state, models from JSON), folders, boards; import assets.
- **Rename, move, delete files**: right-click menu and drag and drop; `lib/main.dart` can't be deleted.
- **Packages** (App Settings): search pub.dev, add, change version, remove packages.
- **pubspec and dependency rules**: what Nowa loads (direct `dependencies` from pub.dev), version defaults, Pub get, missing-dependency prompts.
- **Code problems and Fix**: code-related problems in the Problems tab, with one-click Fix where Nowa knows the fix; `flutter analyze` code check.

Git (all Git UI needs a plan with Git integration)
- **Git panel**: changes, staging, commit/sync box, branch menu, commit history; badge with change count.
- **Commit**: "Commit All" / "Commit Staged", staging per file or section, "Create Commit" dialog, "Add Files...".
- **Discard changes**: per file, per section, with confirmation.
- **Diff view**: click a changed file to see a line diff with a change navigator.
- **Sync, Push, Pull, Publish Branch**: one button pulls then pushes; Push/Pull separately in the "..." menu.
- **Branches**: "New Branch" (from the current branch), switch with "Bring my changes", "Merge into current branch", "Delete branch".
- **Resolve Conflicts**: side-by-side Local/Remote dialog with "Accept Local" / "Accept Remote".
- **Commit History**: browse commits and changed files; "Undo Commit", "Revert Commit", "Copy SHA".
- **Manage Remotes**: "Create GitHub Repository", "Add Existing Repository", "Disconnect".
- **GitHub Integration** ("Connect GitHub"): OAuth connection used for cloning, pushing, pulling and creating repos.
- **Identity** ("Set Identity"): name and email written into commits.
- **Legacy Remote Credentials / External Local Credentials / SSH**: access-token credentials; SSH remotes on local projects use ssh-agent or default keys. (External Local Credentials and SSH: Desktop app only)
- **Clone from GitHub** (dashboard): import one of your connected GitHub repos as a cloud project, or "Local-only" on desktop.

Running
- **Run** button and **Run on** menu: one split button for the embedded preview or a real device.
- **Embedded preview** (Nowa Run / App Run): compiles and runs the real app inside Nowa; hot reload/restart on save; "Open in Browser" (local) or QR "Open on Mobile" (cloud).
- **Add web support**: one-click fix when the app has no `web/` folder, which the embedded preview needs.
- **Instant Play vs Run**: board play is interpreted and instant but approximate; Run is the compiled app.
- **Run on devices and emulators**: physical devices, emulators, simulators and desktop targets via your Flutter SDK; hot reload on save. (Desktop app only; works for cloud projects too)
- **Local cache**: the on-disk copy a cloud project runs from, with clear/show/re-download actions. (Desktop app only, Cloud projects only)
- **Local Setup / Set up local environment**: Flutter SDK path, automatic Flutter and Android toolchain install. (Desktop app only)
- **Console (Problems / Logs)**: app and build logs, "Pub get", "Clear".

Shipping and sharing
- **Deploy** button and menu: one-click deploy to Web, Android Debug, Android Release, iOS, with live status. (Cloud projects only)
- **Deployment** settings page: Android / iOS / Web tabs with full configuration.
- **Web deployment**: publish to a live URL, update, deactivate, download build files. (Cloud projects only; paid plan)
- **Custom Domain**: serve the web app from your own domain with DNS records and Verify. (higher plan)
- **Android builds**: Debug mode (unsigned) or Release with signing key (generate, upload, download, fingerprints). (Cloud projects only; paid plan)
- **iOS builds**: Distribution Certificate and App Store Connect API key, then Build. (Cloud projects only; paid plan)
- **Build history and build details**: Start New Build, Latest/Active Build, steps with logs, artifacts, "Explain with AI".
- **Project Sync**: clone a local project to the cloud (or back) and sync, which is how local projects get cloud deploys. (Desktop app only)
- **Code download**: compress and download the full source of a cloud project. (Cloud projects only; plan)
- **Share Preview**: shareable link and QR code for an interpreted preview, Public or Private. (Cloud projects only)
- **Public project** link: let anyone open and copy the project (Project Details → Sharing). (Cloud projects only)
- **App details for store builds**: App Name, Bundle Identifier, Build version/number, App Icon (Project Details).
- **Permissions**: toggle iOS and Android permissions; edit iOS usage texts.
- **Mobile browser Build and Run pages**: phone-sized versions of Deploy and Run.

## Features

### Code mode
- **What it does:** Replaces the board with a code editor so you can read and edit the Dart (and any other text file)
  behind your app. Run and Deploy stay available in the top bar.
- **Where:** top bar, right side, the `<>` (code) icon button next to the Settings gear (it has no tooltip). Leave
  with the same button or the top bar **Back** button. Also: empty workspace → **Open code mode**; a Dart file with no
  visual view → **View Code**.
- **Labels:** "Open code mode"; "View Code"; top bar "Back"; code tab bar tools: "Open in VS Code" (local projects) or
  "Code download" (cloud projects), "Show preview" / "Hide preview"; preview pane modes "Play · App", "Play · File",
  "Run"; "Reload preview"; preview warning tooltip "Play mode is not 100% accurate, run the app to see the real
  output"; empty preview "This file has no widget to preview. Switch to App to run the whole app."; leave dialog
  "Unsaved code changes" / "These files have changes that haven't been compiled yet:" / "Cancel" / "Discard" / "Save".
- **How to use:**
  1. Select a widget on the board (optional), then click `<>`.
  2. Nowa saves, opens the file that defines the selected widget and scrolls to its code. With nothing selected it
     opens the home screen's file, else `lib/main.dart`.
  3. The left panel switches to **Files**, showing the whole project.
  4. Edit; press ⌘S/Ctrl+S (or let autosave run) to compile your edits into the design.
  5. Optional: click **Show preview** and pick **Play · App**, **Play · File** or **Run** from the mode menu.
  6. Click `<>` or **Back** to return. If edits were never compiled, choose **Save** (compile), **Discard** or **Cancel**.
- **Options:** preview pane mode (Play · App / Play · File = interpreted preview; Run = compiled embedded preview).
- **Limits and rules:** code edits reach the design only when compiled, which happens on save (⌘S, autosave, mode
  switch), not on every keystroke. View-only projects open read-only.
- **Gating:** none found.
- **Code refs:** `packages/nowa_ui/lib/top_bar/top_bar_view.dart:139-141`, `:717-735`;
  `lib/project/top_bar.dart:250-253`; `lib/project/workspace_actions.dart:7-20`, `:26-91`;
  `packages/core/lib/src/panels/panel.dart:198-209`; `lib/project/panels/vibe_designer.dart:46-110`;
  `lib/project/panels/code_preview_panel.dart:141-216`; `packages/core/lib/src/dialogs/unsaved_code_dialog.dart:32-57`;
  `lib/project/panels/empty_workspace.dart:49-52`; `packages/core/lib/src/editors/dart_editor/dart_editor.dart:233-237`;
  `packages/core/lib/src/widgets/code_editor/code_buffer_service.dart:3-9`.
- **Old docs:** `hybrid-approach/intro-hybrid-approach.md` (note says click the "code chip on the bottom left": wrong);
  no dedicated page: missing. What's New 3.9 / 3.12.0 describe it accurately.
- **Screenshot value:** high: code mode with Files tree, a Dart file open, preview pane in Run mode.

### Code editor
- **What it does:** Edits Dart and other text files with syntax colors, autocomplete, find and replace, and
  go to definition. Shows parse errors and edit conflicts.
- **Where:** any file tab in code mode; outside code mode, right-click a file in **Files** → **Show file content**
  (opens a text tab with a details panel).
- **Labels:** find bar toggles "Aa" (match case) and ".*" (regex), tooltips "Previous", "Next", "Close", "Replace",
  "Replace All"; right-click "Copy", "Cut", "Paste"; red error banner (click → "Errors" floating panel); conflict
  banner "This file changed while you were editing it" with "Keep mine" / "Reload"; `codemagic.yaml` error banner
  "Reset to default"; details panel (non-code-mode tab) "Font size", "Word wrap", "Compile" / "Compiled", "Open in VS
  Code" (local projects).
- **How to use:** go to definition: hold ⌘ or Ctrl, hover a name until it underlines, click it. Conflict: when the AI,
  the designer or an outside editor changed the file while you had uncompiled edits, choose **Keep mine** (compile your
  buffer) or **Reload** (take the file).
- **Options:** Font size (default 13), Word wrap (default on): details panel only.
- **Limits and rules:** every project text file is editable (`pubspec.yaml`, `android/`, `ios/`, `.nowa/` files…);
  `.git/`, `build/` and `.DS_Store` are ignored; dot-folders are hidden from the tree.
- **Gating:** none found (read-only for view-only projects).
- **Code refs:** `packages/core/lib/src/widgets/code_editor/find.dart:114-176`;
  `packages/core/lib/src/widgets/code_editor/code_menu.dart:41-44`;
  `packages/core/lib/src/widgets/code_editor/goto_definition_link.dart:66-69`;
  `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:181`, `:229-291`;
  `packages/core/lib/src/widgets/code_editor/code_editor_details.dart:18-115`;
  `lib/project/panels/files_panel/file_context_menu.dart:82-90`; `packages/core/lib/src/services/file_service.dart:234`;
  `packages/core/lib/src/file_system/file_tree_controller.dart:35-45`.
- **Old docs:** none: missing.
- **Screenshot value:** medium: find bar open plus an underlined go-to-definition link.

### Code and design sync
- **What it does:** Keeps the code and the visual design in step in both directions.
- **Where:** automatic; save with ⌘S/Ctrl+S or autosave.
- **Labels:** none specific (see Code mode / Code editor banners).
- **How to use / rules (from code and the product's own doc):**
  1. Declarations marked `@NowaGenerated` belong to Nowa: when you edit visually, Nowa rewrites them on save.
  2. Code you wrote yourself (no annotation) is read so it can be drawn, but written back exactly as you wrote it, until
     you change that declaration visually. Then Nowa regenerates it: adds `@NowaGenerated`, adds an import of
     `package:nowa_runtime/nowa_runtime.dart`, turns relative imports into `package:` imports, reorders constructor
     parameters and writes `16` as `16.0`.
  3. Nowa formats saved files with the formatter page width from your `analysis_options.yaml` (default 80).
  4. `lib/main.dart` is editable (3.6.1) but can't be deleted.
  5. Local projects: edits made on disk by other tools are picked up automatically (changes are batched for 300 ms;
     more than 10 changes at once, e.g. a branch switch, relinks the whole project).
  6. Cloud projects live on Nowa's servers: edit them in Nowa, through Git, or download the code.
- **Limits and rules:** an AI or connected-agent edit that would leave a Dart file unparseable is refused
  (changelog 3.12.3).
- **Gating:** none found.
- **Code refs:** `/home/user/nowa-master/docs/interpreter_limitations.md:93-99`;
  `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:140-149`;
  `packages/core/lib/src/interpreter/block_tree.dart:285-292`, `:548-557`;
  `packages/core/lib/src/project/code_style_service.dart:12-35`;
  `packages/core/lib/src/file_system/actions/file_actions.dart:124-136`;
  `packages/core/lib/src/services/local_file_service.dart:119-128`, `:167`, `:209-232`.
- **Old docs:** `hybrid-approach/custom-code.md` (partly outdated: "sync instantly" was per keystroke; now compile on save).
- **Screenshot value:** low.

### Your own code on the board (what Nowa can render)
- **What it does:** Explains what happens to hand-written or imported Flutter code on the board and in Instant Play,
  where Nowa interprets Dart instead of compiling it. Run (embedded preview, devices, builds) compiles real Dart.
- **Where:** board, Instant Play, shared previews; Problems tab.
- **Labels:** Problems message "'<name>' could not be loaded: <reason>"; Play Mode warnings "Custom code can't be
  shown", "Dynamic packages can't be shown"; board tooltip "In board preview is not 100% accurate, run the app to see
  the real output".
- **How to use:** if part of your code doesn't show on the board, check the Problems tab, then Run the app to see the
  real output.
- **Limits and rules (master `docs/interpreter_limitations.md`):**
  - Not supported (that declaration is skipped, the rest of the file loads): `sync*`/`async*` generators (`yield`),
    `extension type`, primary constructors, destructuring with list/map/object patterns, pattern assignment
    (`(a, b) = record;`), `switch` on non-constant patterns.
  - Records compare by identity, not value.
  - Constructor initialiser clauses (`super(...)`, `this(...)`, `assert(...)`) don't run.
  - `super.method()` returns null; `operator []`/`[]=`, callable classes, `Comparable`/`list.sort()` on your classes
    aren't supported; the object caught in `catch` isn't the thrown instance.
  - Only `CustomPainter`, `CustomClipper`, `TextInputFormatter`, `NavigatorObserver`,
    `SliverPersistentHeaderDelegate`, `FocusNode`, `PreferredSizeWidget`, `InheritedWidget` can be subclassed.
  - Imports: use `package:` imports; `export`/barrel files aren't followed; `show` is ignored; conditional imports take
    the default branch; `part`/`part of` aren't read.
  - Dependencies: `git:`, `path:`, `hosted:` and `sdk:` dependencies aren't supported; transitive dependencies aren't
    resolved; an unsupported package shows as placeholders.
  - A `State` class may only mix in `TickerProviderStateMixin`, `SingleTickerProviderStateMixin` or
    `WidgetsBindingObserver`; otherwise it is read-only in the designer.
  - The board doesn't wrap components in a `MaterialApp`.
  - Annotations from `package:nowa_runtime`: `@CustomFunction(preview:, imports:)` and `@CustomWidget(preview:, imports:)`.
    On the board a custom function with no `preview` logs "calling: <name>" and returns a placeholder value; a custom
    widget draws as a blue placeholder showing its name.
  - A widget the designer has no value for shows as a small slot (3.12.5).
- **Gating:** none found.
- **Code refs:** `/home/user/nowa-master/docs/interpreter_limitations.md:1-115`;
  `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:100-110`;
  `packages/core/lib/src/file_system/dart_file.dart:317`; `packages/nowa_runtime/lib/src/annotations.dart:7-19`;
  `packages/core/lib/src/interpreter/declaration_hybrid.dart:28-70`;
  `packages/designer/lib/src/play_mode/play_mode_warning.dart:106-125`;
  `packages/designer/lib/src/play_mode/play_mode.dart:539`.
- **Old docs:** `hybrid-approach/custom-code.md` (partly wrong: says the previewer never runs custom code and that cloud
  projects can only be tested by publishing a 12-hour web version); `local-project-simulator/openexisting.md` warning
  (partly accurate).
- **3.13 (dev) changes:** dev's `docs/interpreter_limitations.md` is rewritten (record and object destructuring listed
  as working, new "works differently, silently" list). Log in `upcoming-3.13.md`.
- **Screenshot value:** medium: a custom widget placeholder on the board next to the same screen in Run.

### Hybrid approach (VS Code / IDE alongside Nowa)
- **What it does:** Lets you keep a local project open in Nowa and in VS Code, Android Studio or any tool at once.
  Nowa watches the folder, so code you write elsewhere shows up on the board; device runs hot reload on save.
- **Where:** code mode tab bar **Open in VS Code** (local projects); details panel **Open in VS Code**; Files right-click
  **View in folder** (local projects); Account Settings → Editor Settings → **Local Setup** → **VS code Path**.
- **Labels:** "Open in VS Code"; "View in folder"; "VS code Path"; "Default Projects Path".
- **How to use:**
  1. Create or import a local project in the desktop app (account research).
  2. Optional: set **VS code Path** in Local Setup (defaults: `/usr/local/bin` on macOS, `C:\Program Files\Microsoft VS
     Code\bin` on Windows).
  3. In code mode click **Open in VS Code**: Nowa runs `code . -g <file>` in the project folder. If that fails, the file
     opens in Nowa's own editor instead.
  4. Edit in the IDE; Nowa reloads changed files. Edit in Nowa; save writes to disk.
  5. Use Git from the IDE or from Nowa's Git panel (same repository); run on devices from Nowa or the IDE.
- **Limits and rules:** see "Your own code on the board" and "Code and design sync".
- **Gating:** Desktop app only, Local projects only (`kIsWeb` paths; open-in-VS Code only for `project.isLocal`).
  Old docs claim a Premium plan is needed: not confirmable from code (only desktop access is gated, `lib/router.dart:76-81`).
- **Code refs:** `lib/project/panels/vibe_designer.dart:62`; `lib/project/download_code_button.dart:40-58`;
  `packages/core/lib/src/runner/vscode.dart:30-58`; `packages/core/lib/src/file_system/actions/edit_code_io.dart:5-16`;
  `packages/core/lib/src/settings/editor_settings/local_setup.dart:212-236`;
  `lib/project/panels/files_panel/file_context_menu.dart:75-81`; `packages/core/lib/src/services/local_file_service.dart:119-128`.
- **Old docs:** `hybrid-approach/intro-hybrid-approach.md` (partly outdated), `local-project-simulator/othertools.md`
  (accurate, thin), `local-project-simulator/whylocalproject.md` (partly outdated: says cloud projects must download
  code or rebuild to test).
- **Screenshot value:** medium: Nowa and VS Code side by side on the same file.

### Import Dart code...
- **What it does:** Adds Dart code you paste (or load from a `.dart` file) to the project.
- **Where:** Files panel → `lib` row → **Add to library** (+) → **Import Dart code...**
- **Labels:** dialog with a code editor prefilled with sample code; buttons "From file", "Import" (tooltip "Code will be
  imported and modifiable by Nowa as if it was Nowa Generated (note: if you face problems use import as custom code)"),
  "Import as Custom code" (tooltip "Code will be imported as is, and nowa will use it as custom code"), "Cancel".
- **How to use:** paste code or click **From file** (`.dart` only), then **Import** or **Import as Custom code**.
- **Gating:** none found.
- **Code refs:** `lib/project/panels/files_panel/add_lib_menu.dart:140-146`;
  `lib/project/panels/files_panel/import_dart_code.dart:14-72`.
- **Old docs:** none: missing.
- **Screenshot value:** low.

### Files panel
- **What it does:** Browses project files. On the board it shows the three folders you work in; in code mode it
  shows the whole project and follows the open tab.
- **Where:** sidebar **Files** icon (folder). Code mode opens it automatically.
- **Labels:** panel header "Files"; section rows `lib`, `boards`, `assets` with their add buttons (see next feature).
- **How to use:** click a file to open it; drag a file or folder onto another folder to move it.
- **Limits and rules:** board view shows only `lib`, `boards` and `assets`; code mode shows all files except hidden
  dot-entries. Drag rules: `lib` items only into `lib`, `assets` only into `assets`, `.board` files only into
  `boards`. Changed files show Git colors and letters (A added, M modified, D deleted, R renamed, C conflict).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/left_panel.dart:32`; `lib/project/panels/files_panel/files_panel.dart:21-63`,
  `:70-116`; `lib/project/panels/files_panel/files_list.dart:59-66`, `:107-130`, `:152-160`;
  `packages/core/lib/src/file_system/file_tree_controller.dart:29-49`;
  `packages/core/lib/src/file_system/widgets/files_widgets.dart:82-102`; `packages/git_nowa/lib/src/models/git_models.dart:198-205`.
- **Old docs:** `getting-started/exploreinterface.mdx` "File System" (partly accurate); What's New 3.9 says the Files
  panel is gone: wrong for 3.12.5 (it is a sidebar panel again).
- **3.13 (dev) changes:** files list replaced by a new files tree (`files_tree_host.dart`), menus move to NMenu.
- **Screenshot value:** medium: Files panel in board view vs code view.

### Add to library / Add board / Import asset / New Folder
- **What it does:** Creates Dart files, folders and boards, and imports assets.
- **Where:** Files panel section rows: `lib` → **Add to library** (+); `boards` → **Add board** (+); `assets` →
  **Import asset** (upload icon). Right-click empty space → **New Folder**, **Paste**.
- **Labels:** Add to library menu: "New Widget...", "New Folder...", "New Model...", "New Global State...", "Generate
  Models From Json...", plugin file types, "Import Dart code..."; board dialog "Create board"; right-click "New
  Folder", "Paste".
- **How to use:** click the + of the section, pick the type, enter a name in the dialog. Models go to the models
  folder, global states to the globals folder and are registered as providers.
- **Limits and rules:** names must be valid Dart symbols (`validateSymbolName`).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/files_panel/files_list.dart:440-514`; `lib/project/panels/files_panel/add_lib_menu.dart:17-146`;
  `lib/project/panels/files_panel/files_context_menu.dart:12-29`.
- **Old docs:** none for file creation: missing. (Models, global states, JSON models: logic research; widgets: designer.)
- **Screenshot value:** low.

### Rename, move and delete files
- **What it does:** Manages files from the Files panel.
- **Where:** right-click a file or folder in **Files**.
- **Labels:** "Remove file" / "Remove <n> files", "Rename", "Copy as path", "View in folder" (local projects), "Show
  file content" / "Show files content"; delete confirmation "Are you sure you want to delete "<name>"?" (or "<n>
  files"); protected-file dialog "Cannot delete file" / "The following files cannot be deleted:" / "OK".
- **How to use:** right-click → **Rename** (edit inline) or **Remove file** → confirm. Drag to move.
- **Limits and rules:** `lib/main.dart` cannot be deleted. Before deleting, Nowa checks whether declarations in the
  files are used elsewhere and asks again if so. Deleting closes open tabs of those files. Undo is supported.
- **Gating:** none found (view-only projects get only "Copy as path" / "View in folder").
- **Code refs:** `lib/project/panels/files_panel/file_context_menu.dart:36-121`;
  `packages/core/lib/src/file_system/actions/file_actions.dart:121-200`.
- **Old docs:** none: missing.
- **Screenshot value:** low.

### Packages
- **What it does:** Lists your app's pub.dev packages and lets you add, update and remove them.
- **Where:** top bar **Settings** (gear, ⌘, / Ctrl+,) → App Settings → General → **Packages**.
- **Labels:** search field; table headers "Name", "Version"; "Add New Package"; dialog "New Package" with name field
  (hint "package_name...", pub.dev suggestions) and version field (hint "^1.0.0", "loading..."), "Cancel", "Add";
  remove: hover a row → ×; status "Loading packages..."; errors "This field is required", "Package is already
  installed".
- **How to use:**
  1. Click **Add New Package**, type a name, pick a suggestion: the version fills in as `^<latest>`.
  2. Click **Add**. Nowa writes `pubspec.yaml`, loads the package and refreshes Problems.
  3. Change a version: edit the Version cell and press Enter. Remove: hover the version cell and click ×.
- **Options:** version constraint (default caret on the latest pub.dev version).
- **Limits and rules:** if the package needs other packages, an "Add Missing Dependencies" dialog lists them
  ("Package <name> requires the following dependencies", "Cancel", "Add"); cancelling aborts. Local projects run
  `flutter pub get` after version changes or removal.
- **Gating:** none found (also available in playground/sandbox).
- **Code refs:** `packages/core/lib/src/settings/packages/packages_settings.dart:11-413`;
  `packages/core/lib/src/settings/packages/packages_provider.dart:37-58`;
  `packages/core/lib/src/interpreter/packages/package_service.dart:126-140`, `:208-225`, `:262-272`, `:305-353`;
  `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:6`, `:47`, `:93-109`.
- **Old docs:** none: missing (What's New 2.0.13 / 3.2.0 / 3.7.2 mention it).
- **Screenshot value:** high: Packages table and New Package dialog with suggestions.

### pubspec and dependency rules
- **What it does:** Defines what Nowa loads from `pubspec.yaml`.
- **Where:** `pubspec.yaml` in code mode; Packages page; Console → Logs → **Pub get**.
- **Labels:** Logs tab tooltip "Pub get"; Problems messages (see Code problems).
- **How to use:** add packages through **Packages** (recommended) or edit `pubspec.yaml` in code mode and save.
  Click **Pub get** in the Logs tab to run `flutter pub get`.
- **Limits and rules:** only direct `dependencies` from pub.dev are loaded; `dev_dependencies` aren't loaded (Problems
  says so); `git:`/`path:`/`hosted:`/`sdk:` dependencies aren't supported; transitive dependencies aren't resolved.
  Packages load after the project opens; Problems waits until they finish. Nowa keeps your own font declarations when
  it updates the pubspec (3.12.5). Build version and number live in Project Details (see App details).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/logs_and_errors_panel.dart:37-69`;
  `packages/core/lib/src/interpreter/packages/package_service.dart:372-406`;
  `packages/core/lib/src/interpreter/services/problem_service.dart:115-125`;
  `/home/user/nowa-master/docs/interpreter_limitations.md:82-91`.
- **Old docs:** none: missing.
- **Screenshot value:** low.

### Code problems and Fix
- **What it does:** Reports problems in your code and project setup; many have a one-click **Fix**. A second source
  runs `flutter analyze` for exact results.
- **Where:** status bar error/warning/info counts → **Console** → **Problems** tab (panel UI: editor-shell research).
- **Labels:** source menu "From Nowa" ("Instant") / "From Code Analysis" ("Accurate"); scope menu tooltip "Which code
  Nowa checks" with "Only @NowaGenerated" / "All files"; status "Including code Nowa did not generate"; "Refresh";
  analysis: tooltip "Run code check (flutter analyze)", button "Run Code Check", filter tooltip "Filter code check
  results" with "Errors" / "Warnings" / "Info", statuses "Checking...", "Checked at <time>", "<n> files changed since
  last check", "Last check failed", "No check run yet", "No issues found", "No issues match the filter"; empty "No
  issues detected"; problem actions "Fix", "Navigate", "Copy"; analysis actions "Open File", "Copy".
- **How to use:** open the Problems tab; click **Fix** on a fixable problem; or switch to **From Code Analysis** and
  click **Run Code Check**.
- **Code-related problems (messages, Fix):**
  - "'<pkg>' is imported but is not in the pubspec." → **Fix** adds the latest version.
  - "'<pkg>' is a dev dependency, so Nowa does not load it. Move it to dependencies to use it in lib/." (no Fix)
  - "'<pkg>' is installed but failed to load, so nothing it defines is available: <reason>"
  - 'Setup statement in main.dart for "<key>" is required but not found.' → **Fix** adds it.
  - '<Android|iOS> permission "<name>" is required by <package> but not enabled.' → **Fix** enables it.
  - "Main file is not found" / "Main function is not found" → **Fix** opens "Reset main file" ("By resetting the
    main file, you get a new main file with the default setup.").
  - "No Home screen Selected, select one of screens as Home Screen".
  - "'<name>' could not be loaded: <reason>" (code Nowa can't read).
  - Dart parse errors of a file (message from the parser).
  - Router problems (logic research).
- **Limits and rules:** by default only `@NowaGenerated` code is checked; choose **All files** to include your own code.
  Analysis shows Errors only until you change the filter.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/problems_panel.dart:46-47`, `:149-218`, `:251-300`, `:306-509`, `:520-570`;
  `packages/core/lib/src/panels/errors_panel.dart:100-195`; `packages/core/lib/src/interpreter/services/problem_service.dart:99-113`;
  `packages/core/lib/src/interpreter/packages/package_service.dart:385-404`;
  `packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:398-428`;
  `packages/core/lib/src/project/env_services/main_problems_finder.dart:13-58`;
  `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:109`.
- **Old docs:** none: missing. (Master's `docs/interpreter_limitations.md:110-114` says unannotated code reports no
  problems at all; outdated by the "All files" option.)
- **Screenshot value:** high: Problems tab with a package problem and its Fix button.

### Git panel
- **What it does:** Version control inside Nowa for cloud and local projects: see changes, stage, commit, sync,
  switch branches, browse history.
- **Where:** sidebar **Git** icon (badge = number of changed files, "9+" above 9); also click the branch name in the
  status bar.
- **Labels:** header: branch name with dropdown; on hover "Refresh", "Git settings", "..." (repo menu: "Push",
  "Pull", "Add Files...", "Commit", "Manage Remotes"); lists "Staged Changes", "Changes", "Conflicts" with counts;
  commit box (see Commit); "Commit History" section; no repo: "Create Git Repository..."; loading "Loading..." /
  "Initializing repository..."; error "Error loading git repository" + "Retry".
- **How to use:** open the panel; new projects already have a repository with an "Initial commit". Otherwise click
  **Create Git Repository...** (new repos start on `main`).
- **Limits and rules:** cloud projects run Git on Nowa's servers; local projects run Git on your computer (libgit2).
  Nowa fetches from the remote at most every 5 minutes to update ahead/behind counts; Refresh, Pull, Push fetch now.
  In a monorepo, Git covers the whole repository and files outside the opened package are listed too.
  Status bar tooltip: "Branch is up to date" / "Branch is ahead by <n> commit(s)" / "... behind by ..." / "... ahead by
  <a> and behind by <b> commits".
- **Gating:** plan: "Your plan does not support git integration" with "Upgrade" (`EntitlementKeys.github`). Hidden in
  playground/guest sessions. Local Git needs the desktop app.
- **Code refs:** `lib/project/side_bar.dart:55-61`, `:437-455`; `lib/project/panels/git_panel/git_details.dart:19-59`,
  `:138-319`, `:321-366`, `:368-470`; `lib/status_bar.dart:49-115`; `lib/project/project_page.dart:333`;
  `packages/git_nowa/lib/src/git_manager.dart:111-113`, `:123`, `:209-227`, `:275-281`;
  `packages/git_nowa/lib/src/local/local_git_service.dart:31`; `packages/core/lib/src/services/locator.dart:37-41`.
- **Old docs:** `git/git-operations-cloud.md` (partly outdated), `git/git-local.md` (wrong: says Git works only through
  external tools and cloud Git is "under development"), `git/intro-git.md` (partly outdated).
- **3.13 (dev) changes:** branch picker opens below its button and gets a "Search branches" field.
- **Screenshot value:** high: Git panel with staged and unstaged changes and the Sync button.

### Commit
- **What it does:** Saves a snapshot of your changes to the current branch.
- **Where:** Git panel commit box; or "..." → **Commit** for the selective dialog.
- **Labels:** message hint "Commit message" ("Nothing to commit" when clean); button "Commit All" (nothing staged) /
  "Commit Staged"; section hover actions "Stage Changes" / "Unstage Changes"; file hover "Stage file" / "Unstage
  file"; "Create Commit" dialog with "Not Added" / "Added" lists, ">>" / "<<", "Select All" / "Deselect All", "Commit
  message", "Commit"; "Add Files" dialog (title "All have been files added" when nothing is left), "Add Files" /
  "Close"; snackbar "Committed successfully."; errors "Please enter a commit message.", "This field is required".
- **How to use:**
  1. Type a message.
  2. Either click **Commit All** (stages everything), or stage files first (+ on a file or on **Changes**) and click
     **Commit Staged**.
  3. Or open "..." → **Commit**, move files to **Added** with >>, enter a message, click **Commit**.
- **Limits and rules:** a commit needs an identity; without one Nowa shows "You need to set your identity first" with
  the identity form.
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_details.dart:409-453`, `:472-666`, `:668-750`, `:1245-1442`,
  `:1444-1468`, `:1496-1600`; `lib/project/panels/git_panel/git_commands.dart:8-70`;
  `packages/git_nowa/lib/src/git_manager.dart:491-509`.
- **Old docs:** `git/git-operations-cloud.md` "Committing" and "Staging" (mostly accurate, labels slightly off).
- **Screenshot value:** high: Create Commit dialog.

### Discard changes
- **What it does:** Reverts uncommitted changes to the last commit.
- **Where:** Git panel: hover a file → **Discard file changes**; hover **Changes** / **Staged Changes** → **Discard
  all changes**.
- **Labels:** "Discard file changes", "Discard all changes"; dialog "Are you sure?" / "This will discard all uncommited
  changes, you can't undo this action." / "Cancel" / "Continue".
- **How to use:** hover, click the undo arrow, confirm **Continue**.
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_details.dart:543-563`, `:608-613`; `lib/project/panels/git_panel/git_commands.dart:72-88`;
  `packages/git_nowa/lib/src/git_manager.dart:797-804`.
- **Old docs:** `git/git-operations-cloud.md` "Discarding Changes" (accurate).
- **Screenshot value:** low.

### Diff view
- **What it does:** Shows the line-by-line changes of an uncommitted file.
- **Where:** Git panel → click a changed file (opens a tab).
- **Labels:** path header; change navigator "Previous change" / "Next change" with "<current>/<total>"; badges "+n",
  "-n", "Staged" / "Unstaged"; "Open file" (or "File was deleted"); "No changes"; "The selected file doesn't support
  diff view".
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_details.dart:601-603`;
  `packages/core/lib/src/editors/git_editor/git_diff_editor.dart:136-215`, `:300-360`.
- **Old docs:** none: missing.
- **Screenshot value:** medium.

### Sync, Push, Pull and Publish Branch
- **What it does:** Exchanges commits with the remote repository (e.g. GitHub).
- **Where:** commit box button when there is nothing to commit; "..." menu → **Push** / **Pull**.
- **Labels:** "Sync" followed by "↑<n>" (to push) and/or "↓<n>" (to pull); "Publish Branch" when the branch has no
  upstream; snackbars "Sync complete", "<n> files were updated."; "Push", "Pull".
- **How to use:** click **Sync**: Nowa pulls, then pushes. For a new branch click **Publish Branch**. With no remote,
  Nowa opens **Manage Remotes**.
- **Limits and rules:** missing credentials → "You need to provide authentication for this action" with the
  credentials form; no access → "You don't have access to this repository, please check your credentials"; pull
  conflicts open **Resolve Conflicts**.
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_details.dart:377-408`, `:680-714`, `:1470-1494`;
  `lib/project/panels/git_panel/git_commands.dart:12-47`; `packages/git_nowa/lib/src/git_manager.dart:513-526`,
  `:589-629`; `packages/git_nowa/lib/src/git_service.dart:104-124`.
- **Old docs:** `git/git-operations-cloud.md` "Syncing Changes" (accurate), "Manually Pushing or Pulling" (accurate).
- **Screenshot value:** medium: Sync button with ↑/↓ counts.

### Branches
- **What it does:** Creates, switches, merges and deletes branches. Since 3.12.5 your uncommitted changes come with you
  when you switch.
- **Where:** Git panel header → click the branch name.
- **Labels:** sections "Local" / "Remote"; current branch marked with a star; hover a branch: "Merge into current
  branch", "Delete branch"; "New Branch"; dialogs: "New branch from <current>" / "Branch Name" / "Create Branch"
  (errors "Branch name can't be empty", "Not a valid branch name", "Branch with this name already exists"); "Switch
  branch?" / "Your local changes conflict with <branch>." / "Cancel" / "Bring my changes"; "Merge branch?" / "Commits
  from <branch> will be merged into <current>." / "Cancel" / "Merge"; "Are you sure?" / "You are about to delete the
  branch <name>. You can't undo it. This won't delete the upstream remote branch, only the local branch" / "Cancel" /
  "Delete Branch".
- **How to use:**
  1. Switch: click a branch. Unsaved edits are saved first; changes that don't clash come along. If they clash, choose
     **Bring my changes** (conflicts then open **Resolve Conflicts**).
  2. Create: **New Branch** → name → **Create Branch**; the new branch starts from the current one and is checked out.
  3. Remote-only branch: click it to check it out as a local tracking branch.
  4. Merge: hover a branch → merge icon → **Merge**. Delete: hover → trash → **Delete Branch**.
- **Limits and rules:** spaces in names become `-`; names follow `git check-ref-format`. Merging needs a clean working
  tree ("You have uncommitted changes in your working directory. Please commit or discard of them."). Delete removes
  the local branch only. Works in local and cloud projects.
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_details.dart:150-243`, `:752-933`, `:935-1133`;
  `packages/git_nowa/lib/src/git_manager.dart:528-569`, `:827-845`; `packages/git_nowa/lib/src/local/local_git_service.dart:418-462`;
  `packages/git_nowa/lib/src/git_service.dart:31-47`, `:94-102`.
- **Old docs:** `git/git-operations-cloud.md` "Managing Branches" (partly wrong: "Create new branch" + "From branch"
  choice, "can't switch with unsaved changes"); no merge docs: missing.
- **3.13 (dev) changes:** "Search branches" field in the branch menu.
- **Screenshot value:** high: branch menu and the "Switch branch?" dialog.

### Resolve Conflicts
- **What it does:** Lets you pick, per conflicting file, your version or the incoming one.
- **Where:** opens automatically after a pull, merge or branch switch with conflicts; or Git panel → **Conflicts** →
  hover → **Resolve all Conflicts** / per file **Resolve conflict**.
- **Labels:** "Resolve Conflicts - <path>"; panes "Local" / "Remote"; "Accept Local" / "Accept Remote".
- **How to use:** for each file click **Accept Local** or **Accept Remote**; the dialog moves to the next file, then
  closes; the resolved files are staged. Commit afterwards.
- **Limits and rules:** whole-file choice only (no line-level merge); both panes are read-only.
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_details.dart:156-165`, `:398-404`, `:543-551`, `:633-661`,
  `:1831-1994`; `packages/git_nowa/lib/src/git_manager.dart:731-739`.
- **Old docs:** none: missing (`clone-from-cloud.md` promises a conflicts guide that doesn't exist).
- **Screenshot value:** medium.

### Commit History
- **What it does:** Lists the commits of the current branch; shows the files each commit changed and their diffs;
  undoes or reverts commits.
- **Where:** Git panel → **Commit History** (collapsible, bottom); click a commit to open its details in the bottom
  panel; right-click a commit for actions.
- **Labels:** "Commit History", "Refresh Commits"; "No commits yet" / "Make your first commit to see history"; details
  header (first line of message or "No Commit Selected"), "Pushed" / "Not Pushed" ("Pushed to remote" / "Not pushed to
  remote yet"), "Changes", "No file changes"; right-click "Copy SHA", "Undo Commit", "Revert Commit"; dialogs "Revert
  Commit" ('Are you sure you want to revert the commit "<msg>"? This will create a new commit that undoes the changes
  made in the selected commit.') and "Undo Commit" ('... This will move the changes back to the staging area.'), each
  with "Cancel"; snackbars "Commit reverted successfully.", "Commit undone, changes moved to staging area.".
- **How to use:** expand Commit History; click a commit, then a file to see its diff; right-click a commit for actions.
- **Limits and rules:** loads 50 commits at a time. **Undo Commit** is only enabled on the latest commit when it has
  not been pushed. Revert and Undo do nothing while there are uncommitted changes (the success message may still show):
  commit or discard first. Available for local and cloud projects.
- **Gating:** same as Git panel; actions hidden for view-only users.
- **Code refs:** `lib/project/panels/git_panel/git_commit_history_panel.dart:78-114`, `:286-315`, `:366`, `:402`,
  `:598-603`, `:629-631`; `lib/project/panels/git_panel/git_commit_context_menu.dart:21-47`;
  `lib/project/panels/git_panel/git_commit_actions.dart:13-86`; `packages/git_nowa/lib/src/git_manager.dart:356-391`, `:806-825`.
- **Old docs:** none: missing (What's New 3.3.5 says cloud-only: outdated).
- **Screenshot value:** medium.

### Manage Remotes
- **What it does:** Connects the project's repository to a GitHub repository (new or existing), or disconnects it.
- **Where:** Git panel "..." → **Manage Remotes**; opens by itself when you sync without a remote.
- **Labels:** connected: "Connected Remote Repository", "GitHub Repository" + URL, tooltip "View Repository in
  Browser", "Disconnect". Not connected: "Create GitHub Repository" form ("Name" with prefix "<account>/", "Private"
  with helper "Private repositories are only accessible to you and people you explicitly share them with.", "Create
  Repository"; errors "Please enter a repository name", "You already have a repository with this name", "Repository
  name can only contain alphanumeric characters, hyphens, underscores, and periods", "No permission to create
  repository. Try again" + "Grant Permission"), or, when GitHub isn't connected, "Create GitHub Repository" / "You need
  to connect your GitHub account to create a repository." / "Connect GitHub"; then "OR" and "Add Existing Repository"
  (expand): warning "Make sure the repository you select is relevant to the current project. Connecting the wrong
  repository may lead to the loss of your current changes.", repository list (search "Search repositories", "Can't find
  your repository? Manage your connected repositories."), "Repository URL" (errors "Please enter a repository URL",
  "Please enter a valid URL"), "Connect Repository".
- **How to use:** new repo: enter a name, keep or untick **Private**, click **Create Repository** (Nowa creates it on
  GitHub, adds it as `origin` and pushes). Existing repo: expand **Add Existing Repository**, pick a repo or paste its
  URL, click **Connect Repository**, then **Sync**.
- **Limits and rules:** the remote is always named `origin`; the URL field accepts only `http`/`https` URLs.
- **Gating:** same as Git panel.
- **Code refs:** `lib/project/panels/git_panel/git_remote_details.dart:8-447`;
  `packages/git_nowa/lib/src/git_manager.dart:755-769`, `:847-864`; `packages/git_nowa/lib/src/github_oauth/github_oauth_service.dart:135-148`.
- **Old docs:** `git/clone-from-cloud.md` "Push Your Nowa Cloud Project to GitHub" (wrong: describes a remote-name +
  "Remote URL" + "Add Remote" form).
- **Screenshot value:** high: Manage Remotes dialog.

### GitHub Integration ("Connect GitHub")
- **What it does:** Connects your GitHub account to Nowa (GitHub App / OAuth). Nowa uses it to list and clone your
  repositories, create repositories, and authenticate pushes and pulls (cloud and HTTPS local remotes).
- **Where:** Account Settings (avatar menu → General Settings) → Editor Settings → **Git**; App Settings → **Git**; also
  inside **Manage Remotes**.
- **Labels:** "GitHub Integration" (helper "Integrate your GitHub account to enable seamless interaction with your
  repositories directly from Nowa."); "Connect GitHub"; waiting dialog "Waiting for Authorization..." / "Please
  complete the authorization in your browser." / "Waiting for <time>..." / "Cancel" (timeout "Authorization timed out.
  Please try again."); connected: avatar, username, "<n> repositories connected", "Manage".
- **How to use:** click **Connect GitHub**, approve in the browser, return to Nowa. Use **Manage** to change which
  repositories Nowa can access.
- **Limits and rules:** when connected, legacy remote and local credentials are ignored.
- **Gating:** plan (same Git entitlement).
- **Code refs:** `packages/core/lib/src/settings/github_integration_settings.dart:10-151`;
  `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:51-108`;
  `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:32-35`;
  `packages/git_nowa/lib/src/github_oauth/github_oauth_manager.dart:16-47`; `packages/git_nowa/lib/src/local/local_git_service.dart:289-298`.
- **Old docs:** `git/token-github.md` (partly outdated: button called "Connect to Gitub"; says local projects need no
  authentication). In-app link: "https://docs.nowa.dev/git/token-github" (`packages/core/lib/src/settings/git_settings.dart:290`).
- **Screenshot value:** high: GitHub Integration connected state.

### Identity ("Set Identity")
- **What it does:** Sets the name and email recorded on your commits for this repository.
- **Where:** App Settings → **Git** → Identity; Git panel hover → **Git settings** opens it; also prompted on first
  commit if missing.
- **Labels:** "Identity" (helper "Set your name and email to be used in commits, this is required to commit
  changes"), "Name", "Email", "Set Identity"; errors "Name cannot be empty", "Email cannot be empty"; App Settings → Git
  with no repo: "No repository found" / "Create a repository to use Git features".
- **How to use:** enter name and email, click **Set Identity**.
- **Limits and rules:** new projects are initialised with your account name and email.
- **Gating:** plan (Git entitlement).
- **Code refs:** `packages/core/lib/src/settings/git_settings.dart:30-218`; `packages/git_nowa/lib/src/git_manager.dart:209-227`.
- **Old docs:** `git/clone-from-cloud.md` step 5 (roughly accurate).
- **Screenshot value:** low.

### Legacy Remote Credentials, External Local Credentials and SSH
- **What it does:** Alternative ways to authenticate Git when GitHub Integration isn't used.
- **Where:** App Settings → **Git** (cloud projects show Legacy Remote Credentials, local projects External Local
  Credentials); Account Settings → Editor Settings → **Git** ("Git Settings") shows both (local only on desktop).
- **Labels:** "Legacy Remote Credentials" (helper "You can manually add remote git credentials used by Nowa servers to
  access your repositories. ..."), "Add Credentials"; "External Local Credentials" (helper "These credentials are
  stored locally and used for Git operations. If GitHub Integration is enabled, these credentials will be ignored."),
  "+"; "No credentials found"; dialog "Set Git Credentials" / "You can find your access token in your account settings
  on the Git provider website." / "Username" / "Access Token" / "Add Credentials"; list rows "Access token" / "SSH Key"
  with delete; "When GitHub Integration is enabled, legacy remote credentials are not used." / "... legacy local
  credentials are not used."; Git Settings intro "Remote Credentials are used to authenticate our servers on your behalf
  to access your repositories. While Local Credentials are used to authenticate your machine to access remote
  repositories. ...".
- **How to use:** create a personal access token at your Git provider, then **Add Credentials** (remote) or **+**
  (local) → Username + Access Token.
- **Limits and rules:** SSH (local projects): for a remote like `git@host:path` or `ssh://...`, Nowa tries the keys in
  your ssh-agent, then stored key pairs, then `~/.ssh/id_ed25519` and `~/.ssh/id_rsa` (with `.pub`). Access tokens are
  never sent to SSH remotes. The credentials dialog itself only creates access-token entries.
- **Gating:** plan (Git entitlement); External Local Credentials and SSH: Desktop app only.
- **Code refs:** `packages/core/lib/src/settings/git_settings.dart:221-522`, `:524-588`;
  `packages/core/lib/src/settings/local_git_settings.dart:6-121`; `packages/git_nowa/lib/src/local/local_git_service.dart:300-349`;
  `packages/git_nowa/lib/src/models/git_credentials.dart:6-26`, `:105-121`.
- **Old docs:** `git/token-github.md` "Legacy Way: Personal Access Token" (partly outdated: path and labels changed).
- **Screenshot value:** low.

### Clone from GitHub
- **What it does:** Imports one of your GitHub repositories as a new Nowa project.
- **Where:** dashboard → **New project** split button caret → **Clone from GitHub**.
- **Labels:** "Clone from GitHub" / "Pick a repository to import."; repository list with search; "Project name" (hint
  "my-app"); workspace chip; "Local-only" checkbox (desktop app); "Cancel" / "Clone project"; progress "Cloning
  <elapsed>"; errors "Set a default projects folder in settings to clone locally.", "You need to add your credentials to
  access the remote repository", "You don't have access to this repository, please check your credentials" (each with a
  fix link to settings).
- **How to use:** connect GitHub first (Account Settings → Git → **Connect GitHub**); open the dialog, pick a repository,
  optionally rename and pick a workspace, click **Clone project**. With **Local-only**, the repo is cloned into your
  Default Projects Path as `<path>/<repo-name>`; a monorepo asks which package to open.
- **Limits and rules:** the list shows only repositories the GitHub integration can access; there is no URL field.
- **Gating:** plan (Git entitlement → "Time to level up" dialog); "Local-only": Desktop app only.
- **Code refs:** `packages/nowa_ui/lib/dashboard/projects_view.dart:324-336`; `lib/dashboard/dashboard_page.dart:305-312`;
  `lib/dashboard/create_new_project/github_clone_dialog.dart:15-324`;
  `lib/dashboard/create_new_project/start_project_provider.dart:52-110`; `packages/git_nowa/lib/src/local/local_git_service.dart:125-131`;
  `packages/core/lib/src/settings/github_integration_settings.dart:224-226`.
- **Old docs:** `git/clone-from-cloud.md` "Clone a GitHub Repository into Nowa Cloud" (wrong: "Cloud Projects → New
  Project → Clone from GitHub" and paste an HTTPS link).
- **Screenshot value:** high: Clone from GitHub dialog.

### Run button and Run on menu
- **What it does:** One control to run your app, either in the embedded preview or on a real device.
- **Where:** top bar, right, **Run** split button (left of **Deploy**); the caret opens the **RUN ON** menu.
- **Labels:** button "Run" (play icon) / "Hide" while the preview is shown, with a status dot (hover: "Not running",
  "Starting…", "Running", "Restarting…", "Stopping…", "Failed to start", "Last restart failed"); with a device selected
  the button shows the device name. Menu (headers shown in capitals): "RUN ON" → "Embedded preview" (status "Instant ·
  runs inside Nowa", "Starting…", "Running · visible in the editor", "Running · hidden", "Running · last restart
  failed", "Failed to start — check the logs"; action "Hide"); on the web app "DEVICES" → "iOS & Android devices" /
  "Download the desktop app" / "Get the Nowa desktop app for macOS or Windows to run this app on real devices and
  emulators."; no runnable package: "iOS & Android devices" / "No package here has a lib/main.dart"; desktop: devices
  and emulators (next features), "Local cache" (cloud projects), "Local environment settings".
- **How to use:** click **Run** to open the embedded preview (click **Hide** to hide it; the session keeps running).
  Use the caret to pick a device; the button then runs on that device.
- **Limits and rules:** only one run target is active at a time. ⌘P / Ctrl+P on the board also opens the embedded
  preview.
- **Gating:** in playground/guest sessions Run is replaced by Save. Devices: Desktop app only.
- **Code refs:** `lib/project/top_bar.dart:331-334`; `lib/project/run/run_button.dart:14-226`, `:420-660`;
  `lib/project/run/menu_widgets.dart:8-27`; `packages/designer/lib/src/designer_setup.dart:47`, `:103`;
  `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-12`.
- **Old docs:** `local-project-simulator/simulator.md` (partly outdated: says only local projects can run on devices).
- **Screenshot value:** high: Run on menu on desktop with devices and emulators listed.

### Embedded preview (Nowa Run / App Run)
- **What it does:** Builds and runs your real app (all packages, custom code) and shows it inside Nowa, updating every
  time you save.
- **Where:** **Run** button, or **Run on** → **Embedded preview**; in code mode the preview pane's **Run** mode.
- **Labels:** run toolbar (replaces the breadcrumbs): "Back to board", "Phone" / "Tablet" (toggle), "Fullscreen",
  "Hot Reload" (local projects) / "Hot Restart" (cloud projects), "Start" / "Stop", "Open in Browser" (local) / "Open on
  Mobile" (cloud, drops down "Scan the QR" + QR code + "Open In Browser"). Stage messages "App is being prepared, please
  wait...", "Start the app to see the preview", "Starting app..." + "This may take a few minutes...", "App stopped,
  start it to see the preview", "Start App". Error screens: "Your app couldn't start because of a code error", "The
  app preview failed to start", "The preview hit a problem on our side — your app is fine" ("Please try again — if it
  keeps happening, send us a report and we'll look into it."), "Your preview session timed out" ("It was closed after a
  period of inactivity — restart it to pick up where you left off."); buttons "Fix with AI", "Retry", "Report issue",
  "Restart"; failed hot restart card "Restart failed — showing the previous version" (+ "Fix with AI" on cloud);
  unavailable "Nowa Run is not available for this project".
- **How to use:**
  1. Click **Run**. Nowa saves and shows the app in a phone frame (Tablet and Fullscreen available).
  2. Edit and save: the preview restarts with your changes.
  3. Cloud: click the QR icon and scan with your phone to open the same running app. Local: **Open in Browser**.
  4. Use **Back to board** (or **Hide**) to return; Shift+R hot restart, ⌘F/Ctrl+F fullscreen.
- **Limits and rules:** the preview runs your app as a web app, so the app needs a `lib/main.dart` and a `web/` folder
  (see Add web support). Cloud projects run on Nowa's servers; the session starts in the background when the project
  opens and can time out when idle. Local projects run `flutter run -d web-server` on your computer at
  `http://localhost:<port>` and need the Flutter SDK ("Flutter SDK path is not set. Please configure it in the
  settings."). App logs go to the Logs tab.
- **Gating:** not in playground/guest ("Save your app to run it" / "Save app"). No plan gate found.
- **Code refs:** `packages/nowa_ui/lib/top_bar/top_bar_view.dart:772-861`; `lib/project/top_bar_mapper.dart:127-146`;
  `packages/nowa_run/lib/src/nowa_run_plugin.dart:22-60`; `packages/nowa_run/lib/src/nowa_run_manager.dart:53-84`,
  `:150-194`, `:470-513`; `packages/nowa_run/lib/src/ui/nowa_run_overlay.dart:13-66`;
  `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:70-140`; `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:90-172`;
  `packages/nowa_run/lib/src/ui/nowa_run_play_mode.dart:56-97`; `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:9-88`;
  `packages/nowa_run/lib/src/actions/actions_setup.dart:19-21`; `packages/nowa_run/lib/src/ui/nowa_run_unavailable.dart:21-38`;
  `packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:23-67`; `packages/core/lib/flutter_tool.dart:35-41`.
- **Old docs:** none: missing (What's New 3.8.2 / 3.9 / 3.10 describe it).
- **Screenshot value:** high: embedded preview with the run toolbar and the QR dropdown open.

### Add web support
- **What it does:** Explains why the embedded preview can't start and, when the only problem is a missing `web/`
  folder, adds it in one click.
- **Where:** appears when you click **Run** and something blocks the preview.
- **Labels:** titles "Web support is missing" / "Nothing to run"; messages "The preview runs your app as a web app, and
  <package> has no web/ folder.", "Cannot find lib/main.dart, so there is no app to launch.", "This folder holds no
  dart package. Nowa can browse and edit its files, but there is no app to preview."; buttons "Close", "Add web support"
  ("Adding…"); error "Could not generate the missing files. Check the logs for details."
- **How to use:** click **Add web support**; then **Run** again.
- **Limits and rules:** local projects run `flutter create .` in the package; cloud projects call Nowa's fix endpoint.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/runner/run_preflight.dart:11-119`; `packages/core/lib/src/providers/project_provider.dart:326-336`;
  `packages/core/lib/src/services/local_project_service.dart:215-223`; `packages/core/lib/flutter_tool.dart:102-106`.
- **Old docs:** none: missing.
- **Screenshot value:** medium.

### Instant Play vs Run
- **What it does:** Two ways to try your app. **Instant Play** (board) interprets your code instantly, item by item;
  **Run** compiles the real app. Use Instant Play for quick UI checks, Run for real behavior (packages, custom code,
  plugins).
- **Where:** Instant Play: hover a screen's title on the board → **Play** (or right-click a widget → **Play**). Run: the
  **Run** button.
- **Labels:** canvas title tooltip "Play" / "Stop"; widget menu "Play"; playing toolbar "This screen is capturing
  scroll", "Share preview", "Reset zoom", "Stop", warning tooltip "In board preview is not 100% accurate, run the app to
  see the real output".
- **Limits and rules:** Instant Play can't show code Nowa can't interpret (placeholders, warnings "Custom code can't be
  shown", "Dynamic packages can't be shown"); shared preview links use Instant Play, not Run.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/panels/canvas_titles.dart:237-261`; `packages/designer/lib/src/menus/widget_context_menu.dart:39`;
  `packages/designer/lib/src/actions/designer_actions.dart:279-298`; `packages/designer/lib/src/play_mode/play_mode.dart:485-546`;
  `lib/project/preview_page.dart:15-28`.
- **Old docs:** `hybrid-approach/custom-code.md` "Preview Limitations" (partly outdated); `ui/toolbar.md`,
  `getting-started/exploreinterface.mdx` (designer research).
- **Screenshot value:** medium: a side-by-side comparison table in the docs rather than a capture.

### Run on devices and emulators
- **What it does:** Runs the app with your Flutter SDK on connected phones, emulators, simulators or desktop targets,
  with hot reload on every save. Works for local projects and, since 3.10, for cloud projects (Nowa makes a temporary
  local copy).
- **Where:** **Run** caret → **DEVICES** / **START AN EMULATOR**; then the Run button acts on the selected device.
- **Labels:** "DEVICES"; "Looking for devices…"; "No devices connected. Plug in a device or set up an emulator." / "No
  devices connected. Plug in a device or start an emulator below."; device row status "Building…", "Running", "Selected
  run target" or the platform; row actions "Cancel" / "Stop"; "START AN EMULATOR" with emulator rows; while preparing a
  cloud project: progress text ("Preparing local run…", "Saving project…", "Packaging project…", "Downloading
  project…", "Extracting project…", "Setting up platforms…", "Syncing files…") with "Cancel"; while building: spinner +
  "Cancel"; while running: "Stop", "Hot restart" (bolt), "Run target" (caret).
- **How to use:**
  1. Desktop app: make sure Flutter is set up (Nowa opens Local Setup if not).
  2. Connect a phone by USB, or start an emulator from **START AN EMULATOR** (it becomes the target when it appears).
  3. Click the device row (or the Run button once a device is selected).
  4. Save to hot reload; click the bolt for a full hot restart; **Stop** to end. Output goes to the Logs tab, which
     opens on failure.
- **Limits and rules:** devices and emulators are whatever your Flutter SDK reports (iOS needs macOS with Xcode).
  Selecting the device that's already building/running doesn't start a second run.
- **Gating:** Desktop app only; needs a configured Flutter SDK.
- **Code refs:** `lib/project/run/run_button.dart:88-149`, `:229-325`, `:493-512`; `lib/local_export.dart:11-179`;
  `packages/core/lib/src/runner/local_build_manager.dart:8-212`; `packages/core/lib/src/plugin.dart:54-64`, `:186-199`;
  `packages/core/lib/src/models/local_build.dart:12-21`; `packages/core/lib/src/runner/local_run_config.dart:13`;
  `packages/core/lib/src/runner/cloud_local_run_service.dart:118-145`, `:225-251`; `packages/core/lib/src/io_utils.dart:109-141`.
- **Old docs:** `local-project-simulator/simulator.md` (partly outdated: local-only claim, old menu).
- **Screenshot value:** high: Run on menu with a phone and an emulator; running controls in the top bar.

### Local cache (cloud projects run locally)
- **What it does:** The on-disk copy a cloud project runs from on your devices; re-synced on every save.
- **Where:** **Run** caret → **Local cache** row (desktop app, cloud projects); actions appear on hover.
- **Labels:** "Local cache"; status "Created on the first device run", "Cached on disk · re-synced on save", or the
  prepare progress; tooltips "Clear the local cache" ("Stop the app before clearing" while running), "Show in folder",
  "Re-download everything and run again"; "Cancel" while preparing.
- **How to use:** after big changes (e.g. a native plugin), click **Re-download everything and run again**.
- **Limits and rules:** copies untouched for 14 days are removed automatically.
- **Gating:** Desktop app only, Cloud projects only.
- **Code refs:** `lib/project/run/run_button.dart:662-759`; `packages/core/lib/src/runner/cloud_local_run_service.dart:60-70`, `:150-170`.
- **Old docs:** none: missing.
- **Screenshot value:** low.

### Local Setup / Set up local environment
- **What it does:** Points Nowa at a Flutter SDK, or downloads and configures Flutter and the Android toolchain for you.
  Needed for device runs and for local projects' embedded preview.
- **Where:** Account Settings → Editor Settings → **Local Setup** (page title "Environment"); **Run** caret → **Local
  environment settings**.
- **Labels:** "Automatic setup" / "Let Nowa download and configure Flutter and the Android toolchain for you." / "Set up
  automatically" (or "Update Flutter SDK" + "Flutter SDK is outdated"); "Flutter SDK Path" ("Invalid Flutter SDK
  path"); "Default Projects Path"; "VS code Path"; web: "Not available on web". Wizard "Set up local environment",
  steps "Flutter", "Verify", "Android"; "Install location"; "Install" / "Update" / "Reinstall" / "Try again"; macOS note
  "Required: Xcode must be installed on macOS before setting up Flutter."; "Re-run checks"; "Devices"; Android step
  caption ("... You can add these later from Settings → Environment."); "Skip for now" / "Done"; statuses "Ready ·
  v<version> · Managed by Nowa", "Not installed".
- **How to use / limits:** account research owns the full walkthrough; the old page is current.
- **Gating:** Desktop app only.
- **Code refs:** `packages/core/lib/src/settings/editor_settings/local_setup.dart:118-236`;
  `packages/core/lib/src/environment/environment_setup_dialog.dart:313`, `:409-411`, `:428`, `:455-470`, `:505-546`,
  `:664-728`, `:783-784`, `:912-959`; `packages/core/lib/src/environment/tool_check.dart:4-10`; `lib/project/run/run_button.dart:134-149`.
- **Old docs:** `local-project-simulator/createlocalproject.md` (Flutter setup part accurate). In-app links:
  "https://docs.nowa.dev/local-project-simulator/createlocalproject#setting-up-flutter-sdk" (`local_setup.dart:189`),
  "...createlocalproject#macos-install-xcode" (`environment_setup_dialog.dart:470`).
- **Screenshot value:** medium (existing captures in old page).

### Console (Problems / Logs)
- **What it does:** Shows app logs (embedded preview, device runs, deploy analysis) and problems.
- **Where:** status bar (bottom): click the error/warning/info counts (opens **Problems**) or the last log line (opens
  **Logs**) → floating "Console" panel.
- **Labels:** "Console"; tabs "Problems", "Logs"; Logs tools "Pub get", "Clear"; idle status "Ready".
- **Gating:** none found.
- **Code refs:** `lib/status_bar.dart:163-223`; `packages/core/lib/src/panels/logs_and_errors_panel.dart:5-69`;
  `packages/core/lib/src/panels/logs_panel.dart:8-31`; `packages/nowa_run/lib/src/nowa_run_manager.dart:309-339`.
- **Old docs:** `local-project-simulator/simulator.md` mentions a "Logs tab at the bottom" (outdated location).
- **Screenshot value:** low (editor-shell research).

### Deploy button and menu
- **What it does:** Starts deployments to every platform from one menu and shows their live status.
- **Where:** top bar, right, **Deploy** (rocket); shows "Deploying" with a spinner while anything builds.
- **Labels:** header "DEPLOY"; no repository: "Connect a repository in settings to deploy to the app stores."; rows
  "Web" (status "Not published yet", "Publishing…", "Last publish failed", or the live host name; action "Deploy" /
  "Redeploy" / "Cancel" / "Premium"); "Android Debug", "Android Release", "iOS" (status "Not deployed yet",
  "<status>…", "Deployed <time>", "Failed <time>", "Canceled <time>"; action "Deploy" / "Set up" / "Cancel" /
  "Premium"); "Claim your Nowa Launch Benefits" / "Limited time offer"; "Advanced build settings".
- **How to use:** click **Deploy** → **Deploy** on a row. Rows needing setup show **Set up** (opens the Deployment page
  on that tab). Click a live Web row to open the site; click a mobile row to open its settings.
- **Limits and rules:** mobile deploys build the checked-out branch and commit all changes to it; locked rows open the
  "Time to level up" dialog ("Publishing to a live web URL is available on paid plans. Upgrade to go live." / "Mobile
  deployment is available on paid plans. Upgrade to deploy."). The Launch Benefits row opens an external form.
- **Gating:** Cloud projects only (hidden for local projects). Web: `webPreviewDeploys` entitlement; Android Debug,
  Android Release, iOS: `cloudBuilds` entitlement. On the iOS/Android Nowa apps "Premium" reads "Unavailable".
- **Code refs:** `lib/project/run/deploy_button.dart:16-383`; `packages/core/lib/src/widgets/nowa_dialogs.dart:89-176`;
  `packages/core/lib/src/billing/billing_models.dart:4`.
- **Old docs:** `deployment/web-deploy.mdx` ("Web Deploy icon": outdated); `deployment/android-deploy.md`,
  `deployment/ios-deploy.md` (open via Settings → Mobile tab: outdated).
- **Screenshot value:** high: Deploy menu with statuses.

### Deployment settings page
- **What it does:** Full configuration and history for every deploy target.
- **Where:** top bar **Settings** → App Settings → General → **Deployment**; Deploy menu → **Advanced build settings**
  or **Set up**.
- **Labels:** "Deployment" / "Build and publish your app to the app stores and the web."; tabs "Android", "iOS", "Web";
  help link. Local projects: "Cloud build is not available on local projects" + "Sync to cloud" + "*To sync with git see
  documentation".
- **Gating:** hidden in playground/guest; plan views per tab ("Android builds are not available on your current plan.
  Upgrade your plan to enable this feature.", same for iOS, "Web deployments are not available on your current plan.
  ...", button "Upgrade").
- **Code refs:** `packages/core/lib/src/settings/deployment_settings.dart:10-146`, `:203-224`, `:298-319`;
  `packages/core/lib/src/settings/cloud_build/cloud_build_common.dart:5-21`; `packages/core/lib/src/settings/project_sync_settings.dart:482-551`;
  `packages/core/lib/src/settings/project_settings.dart:23-31`; `packages/core/lib/src/billing/widgets/entitlement_consumer.dart:78-110`.
- **Old docs:** deployment pages (partly outdated). In-app links: "https://docs.nowa.dev/deployment"
  (`deployment_settings.dart:94`), "https://docs.nowa.dev/git/intro-git" (`project_sync_settings.dart:539`).
- **Screenshot value:** medium.

### Web deployment
- **What it does:** Builds your app for the web and hosts it at a live URL; republish updates the same URL.
- **Where:** Deploy menu → **Web** → **Deploy**; or Deployment → **Web** tab.
- **Labels:** "You can publish your app as a web app, allowing users to access it through their browsers. Learn More";
  card "Your Website", "Expires In:" (only when the site has an expiry), status "Published <date>" (pulsing dot) / "Not
  Published"; URL field with "Open in browser" and copy ("Copy" / "Copied!"); buttons "Publish" / "Update " / "Cancel"
  / "Republish", "Deactivate" (tooltip "Take down the current deployment"), "Download Files"; progress "Saving",
  "Creating", "Deploying", "Canceling", "Deactivating", "Failed"; disabled reasons "Preparing the deployment, please
  wait…", "Canceling the current deployment…", "Taking down the current deployment…"; failure "Publish Failed" /
  "Analysis Failed" / "Show Details" / "Error in Deployment" + "Fix with AI"; settings path problems dialog "Your
  Project has Problems" / "Please fix the problems before publishing." / "Ignore and Publish" / "Close".
- **How to use:**
  1. Click **Publish** (or **Deploy** in the menu). Nowa saves, runs `flutter analyze`, then builds and hosts the app.
  2. If analysis finds errors the publish stops ("Analysis Failed") and the Console opens.
  3. When live, copy or open the URL. Republish with **Update** / **Redeploy**.
  4. **Deactivate** takes the site down. **Download Files** downloads the built web files for hosting elsewhere.
- **Limits and rules:** one production environment (the Development environment was removed in 3.8.2).
- **Gating:** Cloud projects only; `webPreviewDeploys` entitlement ("paid plans").
- **Code refs:** `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:10-90`;
  `packages/core/lib/src/web_deploy/web_deploy_manager.dart:7-61`; `packages/core/lib/src/web_deploy/web_environment_manager.dart:99-214`;
  `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_card.dart:11-182`;
  `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:115-457`;
  `packages/core/lib/src/web_deploy/web_deploy_widgets/publishing_error.dart:26-89`.
- **Old docs:** `deployment/web-deploy.mdx` (partly outdated: Development/Production modes, icons, plan names). In-app
  link: "https://docs.nowa.dev/deployment/web-deploy" (`web_build_settings.dart:85`).
- **Screenshot value:** high: "Your Website" card, live.

### Custom Domain
- **What it does:** Serves your published web app from your own domain.
- **Where:** Deployment → **Web** tab, on the live site's card.
- **Labels:** "Custom Domain" / "Set a custom domain for your production environment"; field hint "Set Custom Domain";
  button "Set" (or "DNS" once records exist; tooltips "Set Custom Domain", "View DNS Records", "Remove the custom domain
  before setting again"); "Also www.<domain>" switch; delete icon "Remove custom domain"; errors "Please enter a valid
  domain", 'Please remove "www."', "You cannot change this setting after setting the custom domain. Please remove the
  current custom domain to change this setting."; DNS page "DNS Records", "Verify", "Copy DNS Records" ("You must copy
  the records below and paste them into your DNS provider."), "DNS propagation may take up to 48 hours. Refresh to check
  the status.", "Pending", table "Name" / "Type" / "Value" with copy buttons.
- **How to use:** publish first; type the domain without `www.`, choose **Also www.<domain>**, click **Set**; click
  **DNS**, copy the records into your DNS provider, then **Verify**.
- **Gating:** `webPreviewCustomDomain` entitlement: locked state "Serve your website from your own domain" + "Premium"
  ("Custom domains are available on higher plans. Upgrade to use your own domain.").
- **Code refs:** `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:37-228`;
  `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/dns_records.dart:20-198`;
  `packages/core/lib/src/web_deploy/web_environment_manager.dart:216-248`.
- **Old docs:** `deployment/web-deploy.mdx` "Using a Custom Domain" (partly accurate).
- **Screenshot value:** medium: DNS Records page.

### Android builds
- **What it does:** Builds your app for Android in the cloud: unsigned debug builds for testing, or signed release
  builds for the Play Store.
- **Where:** Deploy menu → **Android Debug** / **Android Release**; Deployment → **Android** tab.
- **Labels:** "Debug mode" switch ("Unsigned builds for quick testing on devices. Turn off for store-ready release
  builds."); Release: "Signing Key" card with status "Missing signing key" / "Signing key saved" / "Loading..." /
  "Saving changes..." / "Failed to load or save signing key"; "Generate"; after generating: "Important!" / "Make sure to
  download your signing key and store it securely. If you lose this key, you will not be able to release any new updates
  for your app" / "Download"; upload form "Keystore Password", "Key Alias", "Key Password", "Key File" + "Browse",
  "Save" (errors "Please enter the keystore password", "Please enter the key alias", "Please enter the key password");
  saved: "SHA-1", "SHA-256" (copy "Copy SHA-1", "Copy SHA-256"), "Download Signing Key", "Remove" ("Are you sure?" /
  "You won't be able to undo this action." / "No" / "Yes").
- **How to use:**
  1. Debug: turn on **Debug mode** (or use the **Android Debug** row) and build.
  2. Release: in **Signing Key** click **Generate** and **Download** the key zip (`android_signing_key.zip` with
     `keystore.jks` and `key_info.txt`), or fill the form with your existing `.jks`/`.keystore` and **Save**.
  3. Build (see Build history and build details); download the artifact from **Artifacts**.
- **Limits and rules:** keep the key: you need the same key for every update. SHA fingerprints are shown for services
  such as Google Sign-In. Release builds need all four signing values.
- **Gating:** Cloud projects only; `cloudBuilds` entitlement.
- **Code refs:** `packages/core/lib/src/settings/deployment_settings.dart:148-271`;
  `packages/core/lib/src/cloud_build_v2/ui/android_signing_key_card.dart:10-297`;
  `packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:272-391`, `:630-680`;
  `packages/core/lib/src/cloud_build_v2/ui/warning_dialogs.dart:5-33`;
  `packages/core/lib/src/cloud_build_v2/ui/remove_button_with_confirmation.dart:20-80`.
- **Old docs:** `deployment/android-deploy.md` (partly outdated: navigation; missing fingerprints). In-app link:
  "https://docs.nowa.dev/deployment/android-deploy" (`workflow_manager.dart:679`).
- **Screenshot value:** high: Signing Key card saved, with fingerprints.

### iOS builds
- **What it does:** Builds and signs your app in the cloud and delivers it to your App Store Connect account.
- **Where:** Deploy menu → **iOS**; Deployment → **iOS** tab.
- **Labels:** "Distribution Certificate" card ("Missing distribution certificate" / "Distribution certificate saved");
  "Generate" → warning "Important!" (Apple's 3-certificate limit text) / "Cancel" / "Generate anyways" → "Make sure to
  download your distribution certificate and store it securely. ..." / "Download"; upload "Certificate Private Key"
  (`.p12`) + "Browse", "Save"; "Download Certificate", "Remove". "App Store Connect" ("Missing App Store Connect
  credentials" / "App Store Connect credentials saved"; "Key ID", "Issuer ID", "Private Key File" (`.p8`/`.pem`,
  paste or Browse), "Save"; errors "Key ID is required", "Issuer ID is required"; tooltips "Change credentials" /
  "Discard changes"). Failed code-signing step: "Documentation" link and "Explain with AI".
- **How to use:**
  1. Set the Bundle Identifier in Project Details; create the app in App Store Connect (Apple's site).
  2. Create an App Store Connect API key; enter **Key ID**, **Issuer ID** and the private key; **Save**.
  3. Upload your distribution certificate's `.p12` private key, or **Generate** one and **Download** it
     (`ios_distribution_certificate_key.p12`).
  4. Build (see Build history and build details).
- **Limits and rules:** Apple allows 3 active certificates; reuse one when possible. The Bundle Identifier is stored
  with the App Store Connect credentials when you save them.
- **Gating:** Cloud projects only; `cloudBuilds` entitlement.
- **Code refs:** `packages/core/lib/src/settings/deployment_settings.dart:273-327`;
  `packages/core/lib/src/cloud_build_v2/ui/ios_details.dart:27-347`; `packages/core/lib/src/cloud_build_v2/ui/warning_dialogs.dart:35-71`;
  `packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:403-548`, `:682-712`;
  `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:483-529`.
- **Old docs:** `deployment/ios-deploy.md` (partly outdated: "choose Release" step doesn't exist, "Upload a key" /
  "Generate a new key" options and paste-the-key flow replaced; also states an Apple price, against D3). In-app links:
  "https://docs.nowa.dev/deployment/ios-deploy" (`workflow_manager.dart:711`) and "...ios-deploy#apple-distribution-certificate"
  (`current_build_card.dart:525`): keep the anchor.
- **Screenshot value:** high: iOS tab with both cards saved.

### Build history and build details
- **What it does:** Starts mobile builds and shows their progress, steps, logs and downloadable artifacts.
- **Where:** Deployment → **Android** / **iOS** tab.
- **Labels:** "Start New Build" ("Missing configuration. Check your workflow settings above"); "Branch" dropdown or
  "Init Repository"; info "Starting a build will commit all changes to the selected branch."; "Build" (disabled
  tooltips "Finish the workflow configuration above", "A build is already running", "Select a branch to build from",
  "Loading the workflow status…"); quota dialog "Your build quota has been used up. Please upgrade your plan to continue
  using this feature."; "Latest Build" / "Active Build" (spinner, status, "Cancel"); "Build Info" (ID, Status, Branch,
  Started, Duration), "Artifacts", "Steps" (expand for logs; failed steps "Explain with AI"); "History" ("No builds
  yet", pagination "<page> of <pages>"). Statuses: Queued, Preparing, Fetching, Building, Testing, Publishing,
  Finishing, Finished, Failed, Canceled, Skipped, Timeout.
- **How to use:** pick a branch, click **Build**, follow **Active Build**; when finished click an artifact to download
  it (opens in the browser).
- **Gating:** Cloud projects only; `cloudBuilds` entitlement.
- **Code refs:** `packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:61-496`;
  `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:9-382`; `packages/core/lib/src/cloud_build_v2/models/build_models.dart:131-181`.
- **Old docs:** `deployment/android-deploy.md` step 3 and `deployment/ios-deploy.md` step 4 (mostly accurate).
- **Screenshot value:** medium: finished build with Artifacts and Steps.

### Project Sync (deploying a local project)
- **What it does:** Clones a local project to the cloud (or a cloud project to your computer) and keeps the two
  linked, so a local project can use cloud features such as Deploy and Share preview.
- **Where:** App Settings → General → **Project Sync** (desktop app); "Sync to cloud" buttons in cloud-only features
  open it.
- **Labels:** "Project Sync" / "Upload your project to the cloud to enjoy features like Cloud Build."; not linked:
  description, "Path" (cloud → local; "Select project folder") or "Select Workspace" (local → cloud), "Clone to Local"
  / "Clone to Cloud", progress "<stage>, This process may take a few moments.", "Project cloned successfully!, opening
  project..."; linked: two cards "Cloud Project" / "Local Project" ("Current" badge, "Open Project"), "Sync from Cloud"
  / "Sync from Local" ("Syncing..."), "Unlink Project"; dialogs "Sync Warning" / "This action will overwrite any existing
  data in the destination project. Please ensure that you have backed up any important data before proceeding." /
  "Cancel" / "Proceed with Sync"; 'Are you sure you want to unlink "<name>"?' / "Unlink Project".
- **How to use:** clone once, then use **Sync from Local** on the cloud card (or the reverse) to copy changes over, then
  Deploy from the cloud project.
- **Limits and rules:** a sync overwrites the destination.
- **Gating:** Desktop app only; hidden in playground/guest.
- **Code refs:** `packages/core/lib/src/settings/project_sync_settings.dart:10-725`;
  `packages/core/lib/src/providers/project_sync_provider.dart:40-180`; `packages/core/lib/src/settings/project_settings.dart:29`.
- **Old docs:** `local-project-simulator/sync.md` (mostly accurate for the in-project page).
- **Screenshot value:** medium: linked state with both cards.

### Code download
- **What it does:** Packages your cloud project's full source code as a zip you can download.
- **Where:** code mode → tab bar **Code download** (download icon).
- **Labels:** "Compress to get the latest code download."; "Compress Project"; "Compressing..."; file row (name, date,
  download icon); "Compress your project to download it"; desktop snackbar "Project downloaded successfully to <path>".
- **How to use:** click **Compress Project**, wait, then click the zip row to download.
- **Limits and rules:** the download is the last compressed snapshot: compress again after changes.
- **Gating:** Cloud projects only (local projects show "Open in VS Code" instead); `codeDownload` entitlement ("Time to
  level up").
- **Code refs:** `lib/project/download_code_button.dart:8-38`, `:61-257`.
- **Old docs:** none: missing (mentioned in `getting-started/introduction.md`).
- **Screenshot value:** low.

### Share Preview
- **What it does:** Gives you a link and QR code that opens an interactive preview of your app in any browser, no build
  needed. Optionally opens on one screen.
- **Where:** Instant Play on the board → playing toolbar **Share preview**; mobile browser menu **Share preview**.
- **Labels:** "Share Preview"; owners/editors: "Choose visibility and share the preview link.", "Public" ("Anyone with
  the link can view the preview."), "Private" ("Only members that have access to the project"); link field with copy,
  "Open in browser", "Qr code". Making it public opens "Make this project public?" ("Your project becomes open source,
  anyone with the link can read every file and save their own copy of it.", "Making the project public would expose any
  API keys, tokens and any other secrets.", "I checked, there are no secrets in this project", "Cancel" / "Make
  public"). Private links for non-members: "Preview Not Available" / "This project preview cannot be accessed. It may be
  private, deleted, or the URL is incorrect. ..." / "Sign In".
- **How to use:** play a screen on the board, click **Share preview**, choose **Public** or **Private**, copy the link or
  show the QR code. The link is `https://app.nowa.dev/preview/<project>` plus `?screen=<file>` when you played one screen.
- **Limits and rules:** the preview is the interpreted Instant Play, not the compiled app. **Public** here is the same
  switch as Project Details → **Public project**: it makes the whole project open to anyone with the link.
- **Gating:** Cloud projects only (local: "Share preview is not available on local projects" + "Sync to cloud").
- **Code refs:** `packages/designer/lib/src/play_mode/play_mode.dart:44-67`, `:506-516`, `:572-760`;
  `packages/core/lib/src/settings/sharing_settings.dart:426-501`; `lib/router.dart:137-151`, `:293-303`, `:401-416`;
  `lib/project/preview_page.dart:7-29`; `lib/project/nowago/mobile_view.dart:461`.
- **Old docs:** `deployment/share.md` (partly outdated: wrongly marked deprecated; entry point changed).
- **Screenshot value:** high: Share Preview popup with QR.

### Public project link
- **What it does:** Lets anyone with a link open your project in Nowa and save their own copy (code included).
- **Where:** App Settings → **Project Details** → **Sharing**.
- **Labels:** "Sharing" (helper "A public project can be opened by anyone with the link. They edit their own copy of it,
  so your project is never changed by a visitor."); "Cover" ("Use my board", "Upload a cover" / "Change the cover");
  "Public project" switch; link with "Copy link", "Open in a new tab", "Link options" ("Code mode", "Preview",
  "Assistant", "Opened file").
- **Gating:** Cloud projects only; not for playground or view-only users.
- **Code refs:** `packages/core/lib/src/settings/sharing_settings.dart:13-418`; `packages/core/lib/src/settings/project_detail_settings.dart:86-92`.
- **Old docs:** none: missing. (Account/projects research may own this; listed here because it shares the Public switch.)
- **Screenshot value:** low.

### App details for store builds
- **What it does:** The app identity used by builds: display name, bundle ID, version, icon.
- **Where:** App Settings → **Project Details**.
- **Labels:** "Project Name", "Package Name" (read-only: "... This can't be changed"), "App Name", "Bundle Identifier"
  (error "Invalid package name"), "Build info" → "Build version" ("Please enter a valid version name (e.g., 1.3.4)"),
  "Build number" ("Please enter a valid number"), "App Icon" ("Change Icon", "Change all"; error "Icon must be 1024x1024
  or smaller"; platforms Android, iOS, Web, macOS).
- **Limits and rules:** Build version must be `x.y.z`; Build number an integer (both written to `pubspec.yaml`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/project_detail_settings.dart:99-327`;
  `packages/core/lib/src/settings/app_icon_settings.dart:10-27`; `packages/core/lib/src/settings/app_icon_manager.dart:15-35`, `:163-172`.
- **Old docs:** `deployment/ios-deploy.md` prerequisites ("Settings > Project Details": accurate).
- **Screenshot value:** low (editor-shell/project settings research may own the page).

### Permissions
- **What it does:** Adds or removes platform permissions (camera, location…) in `AndroidManifest.xml` and `Info.plist`,
  and edits iOS permission messages.
- **Where:** App Settings → General → **Permissions**.
- **Labels:** sections "iOS:" and "Android:"; each row shows a friendly name, the key, a switch, and for enabled iOS
  permissions a text field with the usage message. iOS: "Camera", "Microphone", "Photo Library", "Photo Library Add",
  "Location When In Use", "Location Always", "Location Always and When In Use", "Speech Recognition", "User Tracking".
  Android: "Camera", "Microphone", "Read Storage", "Write Storage", "Boot Completed", "Fine Location", "Coarse Location".
- **How to use:** toggle a permission; for iOS edit the message shown to users (a default is filled in).
- **Limits and rules:** Nowa rewrites the platform file from its template when a permission changes; permissions already
  in an imported project's files are detected once. Packages that need a permission report it in Problems with **Fix**.
  Connected agents can set permissions too (3.12.3).
- **Gating:** hidden in playground/guest.
- **Code refs:** `packages/core/lib/src/settings/permissions/permission_settings.dart:8-151`;
  `packages/core/lib/src/settings/permissions/permissions_provider.dart:20-31`; `packages/core/lib/src/services/permissions_service.dart:7-206`, `:262-306`.
- **Old docs:** none: missing (`logic/common-functionalities/media-picker.md` mentions permissions).
- **Screenshot value:** medium.

### Mobile browser Build and Run pages
- **What it does:** Phone-sized Deploy and Run when Nowa is opened in a mobile browser (3.10.5).
- **Where:** mobile shell (editor-shell research).
- **Labels:** "Build <project>" with tabs "Android", "iOS", "Web"; Run page "Real app", "Launch App", "Hot Restart",
  "Stop", "Start", "This may take a minute... Please wait.", "Run is not available for this project".
- **Code refs:** `lib/project/nowago/mobile_build_page.dart:59-96`; `lib/project/nowago/mobile_run_page.dart:40-215`;
  `lib/project/nowago/mobile_build_status.dart:140`.
- **Old docs:** none.
- **Screenshot value:** low.

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| Marketplace / "Sample Projects" view (MarketplaceView, SampleAppDetails) | `lib/dashboard/market_place/marketplace_view.dart:11-178` (no reference anywhere else); `packages/marketplace/` holds only `android/` and `ios/` folders | Unreachable in 3.12.5 (also on dev). Sample templates only feed the playground picker (`lib/sandbox/sandbox_picker.dart:64-65`). |
| MarketPlaceProvider mock items | `packages/core/lib/src/providers/market_place_provider.dart:3-60` | Dead mock data. |
| macOS tab in Deployment / MacosBuildPage | `packages/core/lib/src/settings/deployment_settings.dart:54`, `:126`, `:138` | `kDebugMode` only; no desktop cloud builds for users. |
| Files grid view with search, filter ("Show all files") and Add/Import button | `lib/project/panels/files_panel/files_panel.dart:57`, `:118-236`; `packages/core/lib/src/providers/file_provider.dart:14` | Unreachable: view type is always list. |
| SSH key-pair form in "Set Git Credentials" | `packages/core/lib/src/settings/git_settings.dart:389`, `:404-414`, `:494-521` | Unreachable: credential type is fixed to access token. |
| "Import template", "Export template", "Reanalyze file(s)" | `lib/project/panels/files_panel/add_lib_menu.dart:147-154`; `lib/project/panels/files_panel/file_context_menu.dart:91-119` | `kDebugMode` only. |
| Package Name rename | `packages/core/lib/src/settings/project_detail_settings.dart:164-218` | `kDebugMode` only. |
| "Main" and "Platform Files (Debug)" settings | `packages/core/lib/src/settings/project_settings.dart:27-28` | `kDebugMode` only. |
| Libraries / Trace / ManualTool panels, DebugButton | `lib/project/side_bar.dart:77-92`; `lib/project/top_bar.dart:330` | `kDebugMode` only. |
| "Debug" side panel (TestingPanel) and panel icons in the top bar | `lib/project/side_bar.dart:93-98`; `lib/project/top_bar_mapper.dart:58-62` | "New UX" experimental flag (editor-shell research decides). |
| Web Development environment | `packages/core/lib/src/web_deploy/web_deploy_manager.dart:15-27` (commented out) | Removed in 3.8.2. |
| `kLocalRunForCloud` flag | `packages/core/lib/src/runner/local_run_config.dart:13` | Internal switch (on); the feature itself is documented. |
| Escape in the run overlay (StopAppAction) | `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:23-29` | No-op action; don't document Escape as "stop". |

## Open questions
- Android Release artifact type: AAB, APK or both? The client only lists whatever artifacts the server returns
  (`packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:371-380`). Same for Android Debug.
- iOS builds: where exactly does the build land (App Store Connect upload, TestFlight)? Nothing in the client says
  "TestFlight"; the workflow runs server-side (CodeMagic per `BuildDto.codeMagicProjectId`).
- Web deployment "Expires In:": which accounts get a site with an expiry (`env.expiresAt`)? Not visible client-side
  (`environment_card.dart:66-72`).
- Hosting domain of the generated web URL: server-provided (`generatedPreviewUrl`); can't document a format.
- If the Bundle Identifier changes after App Store Connect credentials were saved, must the user re-save them? The
  `BUNDLE_ID` build variable is written only when saving credentials (`workflow_manager.dart:495-501`).
- What's New 3.12.0 says local Git can "point Nowa at a key" for SSH, but the credentials dialog can only create
  access-token entries (`git_settings.dart:389`); only ssh-agent keys and `~/.ssh/id_ed25519`/`id_rsa` are used
  (`local_git_service.dart:311-349`, reads `HOME`, which may not exist on Windows). Is there another UI for keys?
- "Add Existing Repository" only accepts http(s) URLs (`git_remote_details.dart:234-242`): must SSH remotes be added
  outside Nowa? Intended?
- Revert/Undo Commit silently do nothing when there are uncommitted changes but still show the success snackbar
  (`git_manager.dart:806-825`, `git_commit_actions.dart:32-40`). Bug to report, or document "commit first"?
- Clone from GitHub shows an empty list with no connect prompt when GitHub isn't connected
  (`github_integration_settings.dart:224-226`). Confirm the intended flow (connect in Account Settings first).
- Which platform folders do new projects include? Nowa templates cover Android, iOS, web and macOS entitlements
  (`packages/core/lib/src/file_system/templates/`); Windows/Linux desktop runs may need `flutter create`. Does
  "Add web support" (`flutter create .`) add other platforms too?
- Old hybrid-approach docs say local projects need a Premium plan; code only gates desktop access by an entitlement
  (`lib/router.dart:76-81`). Account research should settle desktop gating.
- Deploy menu comments mention a weekly build quota checked before mobile deploys, but the top-bar path doesn't check
  it (`deploy_button.dart:166-184`); only the settings "Build" button shows the quota dialog. Server-side enforcement?
- The Deploy menu's "Claim your Nowa Launch Benefits" row opens an external Google Form: document it or leave it to
  marketing (D3: no credit amounts)?
