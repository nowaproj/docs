# S2: new issues found in the other notes

### M1. Two Google OAuth client secrets and a Google Fonts API key are hard-coded in the shipped client

- **Area:** Google sign-in, Firebase connect and Google Fonts download (`packages/core/lib/src/services`, `packages/core/lib/src/fields`)
- **Severity:** Critical — a secret in the shipped client: two Google OAuth client secrets and a Google Fonts API key sit in the source and in every build. What an outsider can do with them depends on the Google client types and the key's restrictions, which the repo can't show; the "web" secret is read by nothing, so it is shipped for no reason.
- **Where:** both; cloud and local projects (the desktop app's Google sign-in and **Firebase** connect use the first secret; the font picker of both apps uses the key)
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same files)
- **Confidence:** Confirmed in code — the strings are in the source. Whether the client IDs and the key are live, the client type of each ID and any key restriction can't be told from the repo. The values are not copied here. Found by a repo scan prompted by `left-out.md` (the "widgets" row, line 124: the hard-coded feedback credential) and by R1's closing advice to check the rest of the repo.

**What happens.** `ConfigService` holds two `GoogleSettings` (client ID and client secret) as string literals, one for the desktop app and one labelled "web". The desktop sign-in sends the first secret to Google whenever someone signs in to Nowa with Google or connects Firebase. The second secret is never read, only its ID is. The font picker calls Google's Web Fonts API with an API key written into the URL. All three ship in every build and are in the git history.

**Steps to reproduce**
1. Open `packages/core/lib/src/services/config_service.dart` and read lines 12-20: the getters `googleSettings` and `googleSettingsWeb`, each `GoogleSettings(identifier: '….apps.googleusercontent.com', secret: '…')`.
2. Open `packages/core/lib/src/fields/text_fields.dart` and read line 35: the URL carries `?key=AIza…`.
3. In the editor (not run): open **Themes**, click **Default Font** and pick a Google font that isn't in `assets/fonts/` yet. The app asks `https://www.googleapis.com/webfonts/v1/webfonts?key=…&capability=VF&family=<name>` (the web app sends it through `<endpoint>/CorsProxy?url=…`). In the desktop app, signing in with Google or connecting Firebase sends the first secret to Google.

Expected: no credential in the source; the desktop values come from build-time settings, and the unused web secret doesn't exist.
Actual: all three strings are in the source.

**Root cause.**
- `config_service.dart:12-20` (two getters on the abstract `ConfigService`, so every implementation inherits them); `GoogleSettings` requires a `secret` (`:27-31`).
- Desktop: `_desktopSignIn` calls `obtainAccessCredentialsViaUserConsent(ClientId(config.googleSettings.identifier, config.googleSettings.secret), …)` (`packages/core/lib/src/services/auth/auth_io.dart:55-71`). `obtainCredentials` picks it on Windows, macOS and Linux (`:14-22`); callers are Nowa's own Google login (`packages/core/lib/src/services/user_service.dart:87-90`) and Firebase connect, which asks for the `firebase` and `cloud-platform` scopes (`packages/data/lib/src/firebase/firebase_manager.dart:146-156`).
- "Web": `packages/core/lib/src/services/auth/google_sign_in_init.dart:31-32` reads only `googleSettingsWeb.identifier` (as `clientId` on the web, as `serverClientId` on Android and iOS). A grep of the repo finds no read of `googleSettingsWeb.secret`. Whether the compiled web bundle drops the unused string wasn't checked.
- Fonts key: `downloadFont` (`text_fields.dart:28-38`), called by the font picker (`:419-423`) and by Nowa AI's font tool (`packages/ai/lib/src/tools/download_font_tool.dart:40`). `proxyLink` (`packages/core/lib/src/utils.dart:134-140`) prefixes the URL with Nowa's `/CorsProxy?url=` on a non-dev web build.
- The build already reads settings from `env/*.json` with `--dart-define-from-file` (`.github/workflows/web-build.yml:38`; `String.fromEnvironment` at `config_service.dart:46-48`), and no workflow in `.github/workflows/` scans for secrets.

**Suggested fix.**
1. Remove `secret` from `googleSettingsWeb` (make it optional in `GoogleSettings`). If that client is a Web-application client in the Google Cloud console, rotate its secret: the old one is in history and in released builds.
2. Move the desktop client ID and secret and the Fonts key out of the source into the `env/*.json` defines, read with `String.fromEnvironment` as the endpoints are. A secret in a shipped desktop app can always be extracted, so this keeps it out of the repo rather than making it private.
3. Restrict the Fonts key to the Web Fonts Developer API in the Google Cloud console, or have a Nowa endpoint add the key (the web build already goes through `/CorsProxy`).
4. Add secret scanning to CI (R1 asks for the same) and a test in `packages/core/test/` that fails when a `lib/` source string matches `GOCSPX-` or `AIza` followed by key characters.

**Docs impact.** None.

Related: R1.

### M2. Circuit can't open a function that contains a `for` loop, `switch`, `break`, `continue`, a local function or a destructuring declaration

- **Area:** Circuit (`packages/code`, `packages/core/lib/src/interpreter/visitors`)
- **Severity:** Medium — **Edit** and **Open in Circuit** fail for any function with these statements, which is common in code written by Nowa AI, imported or typed in code mode; the function stays editable as code.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev (also in 3.12.5: same visitor)
- **Confidence:** Code reading only, not run — found by `research/features-logic.md` (Open questions, "Functions Circuit cannot draw", line 831, which asks what the user sees). The answer below comes from the code path; the screen itself wasn't observed.

**What happens.** Circuit draws a function by walking its statements with a visitor that handles only `return`, `if`, `while`, `try`, expression statements and variable declarations. For any other statement the base visitor throws `UnimplementedError`. Nothing catches it, so the Circuit window can't be built.

**Steps to reproduce** (not run)
1. Open a project with a screen (the playground's Home Page works). Click the `<>` button in the top bar (code mode).
2. In the screen's class add this method, press Ctrl/Cmd+S, then click `<>` again to leave code mode:
   ```dart
   void countToThree() {
     for (var i = 0; i < 3; i++) {
       print(i);
     }
   }
   ```
3. Select the screen, open **Variables**, select `countToThree` under **Functions**.
4. In **Details** click **Edit**.

Expected: Circuit opens and shows the function, with the loop as a node or as a locked placeholder.
Actual (from the code): the floating window opens, building it throws `UnimplementedError`, and the window shows Flutter's error placeholder (a grey box in a release build) instead of Circuit. Nowa shows no message. The same happens for a function imported with **Import Dart code...** → **Import**, for one written by Nowa AI, and for an event handler written in code, through **Open in Circuit** on a linked function.

**Root cause.**
- `BlockToCircuitVisitor` overrides only `visitReturnStatement`, `visitIfStatement`, `visitWhileStatement`, `visitTryStatement`, `visitExecBlock`, `visitExpressionStatement` and `visitVariableStatement` (`packages/code/lib/src/models/block_to_circuit_visitor.dart:28,33,47,52,63,81,86`). Everything else falls to `ThrowingBlockVisitor`, whose `visitForStatement` (`packages/core/lib/src/interpreter/visitors/block_visitor.dart:217`), `visitContinueStatement` (`:229`), `visitBreakStatement` (`:232`), `visitFunctionStatement` (`:184`), `visitDestructureStatement` (`:181`) and `visitSwitchStatement` (`:256`) are `throw UnimplementedError()`.
- The loader builds exactly these blocks from ordinary Dart (`packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:950,1283,1286,1413-1417,1493-1496,1587`), and each dispatches to the visitor (`packages/core/lib/src/interpreter/block_tree.dart:993,1105,1343,1695,1719,4984`). A `for` or `switch` nested in an `if`, `while` or `try` branch fails the same way, because `visitExecBlock` visits every statement.
- `CodeProvider`'s constructor calls `setGraph` (`packages/code/lib/src/providers/code_provider.dart:13-18,58-66`) with no try/catch, and `Circuit` builds a `CodeProvider` (`packages/code/lib/src/providers/circuit.dart:8-12`). `_CircuitViewState` creates the `Circuit` lazily from `build` (`packages/code/lib/src/circuit_plugin.dart:34,83`); no error boundary wraps floating panels (`CanvasErrorBoundary` is used only for canvases and components). `dispose` reads the same `late` field (`:74`), so closing the window should throw again (the initializer re-runs after a failure; reading only). Later edits call `setGraph` from the file's watch stream (`code_provider.dart:44-48`) with the same exception.
- Entry points: **Edit** for every function (`packages/core/lib/src/panels/details/decl_details.dart:57-62`), **Open in Circuit** (`packages/core/lib/src/fields/field_link_menu.dart:346-349,388,396`), `openBlockInCircuit` (`packages/core/lib/src/fields/basic_fields.dart:521-531`).

**Suggested fix.** Smallest: in `CodeProvider.setGraph`, catch `UnimplementedError`, keep the old node and store a message, and have `CircuitView` show "Circuit can't draw this function yet: it uses a `for` loop. Edit it in code mode." with a button to open the code. Better: override the six methods in `BlockToCircuitVisitor` to return a new `StatementNode` that shows the statement's source as one locked node (`ExprNode` can't wrap them: it casts to `ExpressionStatement`, `packages/code/lib/src/models/expr_node.dart:13`). Also make `_CircuitViewState` create the `Circuit` in `initState`. Test: `packages/code/test/circuit_test.dart` is an empty placeholder; load a function with each statement (`loadDartCode`) and assert that `generateCircuit` returns a node tree.

**Docs impact.** `docs/logic/circuit.md` (Loops, L134-136: it says only that a `while` loop shows as a **While** node) and `docs/logic/functions.md`: once the behavior is confirmed live, add that a function with a `for` loop, `switch`, `break` or `continue` can't be opened in Circuit today.

### M3. The Library's **New Folder...** never creates the folder

- **Area:** Library **Add** menu (`lib/project/panels/files_panel/add_lib_menu.dart`, `lib/project/panels/library_panel/library_host.dart`)
- **Severity:** Medium — the menu item takes a name, closes and does nothing, and it is the only place in the UI that makes a folder (Nowa AI, or files added outside Nowa, still can).
- **Where:** both; cloud and local projects (also in the playground)
- **Status:** Present in 3.13.0 and dev. A regression: 3.12.5 created the folder first (`final newDir = …createDirectory(val); onAdd?.call([newDir]);`); the 3.13.0 line came in with `0b72cdd9d` ("hook the files tree up to the live files panel", 29 Sep 2026) and the Library began using the menu without `onAdd` in `becc75782`.
- **Confidence:** Confirmed in code — the Library path was read and a stand-alone Dart snippet (not the app) showed that `onAdd?.call(createDirectory(…))` doesn't evaluate its argument when `onAdd` is null. The app wasn't run. Found by `docs/code/files.md` line 48 ("a new empty folder isn't in the Files tree in code mode either") and the New Folder inventory in `research/features-code-ship.md`; the cause below is a different one from the "folders show only when something is in them" the docs give.

**What happens.** In the Library, **Add** (+) → **New Folder...** opens a dialog, accepts a name and closes. No directory is created, so there is nothing to list and nothing to select. The code-mode **Files** tree has no add buttons and no folder entry in its right-click menu (`docs/code/files.md` L15), so nothing else in the UI makes a folder.

**Steps to reproduce** (from the code, not run)
1. Open a project (the playground works). Click the **Library** icon in the sidebar (Ctrl/Cmd+2), then the header's **Add** (+).
2. Choose **New Folder...**. The dialog "New Directory in lib" opens with `Directory` in the field. Type `archive` and press Enter.
3. Set **Filter** to **Everything**, then click `<>` (code mode) and open the **Files** tree: `lib`.

Expected: `lib/archive` exists, shows in **Files**, and can be highlighted in the Library so that **Add** creates things inside it (the docs: "Makes a folder in the folder of the row you highlighted last, or in `lib`").
Actual: `lib/archive` isn't in **Files**; the dialog closed without a message.

**Root cause.**
- The only call that creates the directory sits inside the argument list of a null-aware call: `onSubmit: (name) => onAdd?.call([fileProvider.currentDirectory.createDirectory(name)])` (`lib/project/panels/files_panel/add_lib_menu.dart:50-59`). The dialog itself creates nothing: `CreateDirectoryDialog` validates the name and calls `onSubmit` (`packages/core/lib/src/file_system/widgets/create_directory_dialog.dart:28-37`), and `CreateDirectoryDialogAction` only shows it (`packages/core/lib/src/file_system/actions/file_actions.dart:347-357`).
- The Library builds the menu without `onAdd` (`lib/project/panels/library_panel/library_host.dart:166-177`, the call at `:183`), so `onAdd` is null and Dart skips the argument. The sectioned Files tree does pass `onAdd: _onAdded` (`lib/project/panels/files_panel/files_tree_host.dart:137`), so its **Add to library** menu would create the folder, but that tree is built only when `showAllFiles` is false (`:138-146`) and code mode forces it on (`lib/project/panels/files_panel/files_panel.dart:100-111`). The Files grid's **Add** button (`files_panel.dart:221`) has the same gap, and the grid can't be reached in 3.13.0 (`research/changes-3.13.md` line 852).
- Second layer: even an existing empty folder wouldn't be listed. The Library builds its project folders only from the declarations inside them (`packages/core/lib/src/library/library_service.dart:227-241`, `_Folder.at`), and `_prune` drops containers with no children (`packages/nowa_ui/lib/library/library_panel.dart:401-425`).

**Suggested fix.** Create the directory before the null-aware call, as 3.12.5 did: `final dir = fileProvider.currentDirectory.createDirectory(name); onAdd?.call([dir]);`. Then decide how the Library should show an empty folder: add the directories of `lib` to `_mapProject` and keep empty folders in `_prune`, or hide **New Folder...** from the Library menu until it can. Test: a widget test for `addToLibraryEntries` with a null `onAdd` that submits a name and checks `gProject.files.libDir` (see the existing tests under `test/` in the repo root).

**Docs impact.** `docs/design/library.md` (L105) and `docs/code/files.md` (L38 and L48: "A folder shows in the Library only when something is in it. In the playground, a new empty folder isn't in the Files tree in code mode either"). After the fix, say whether an empty folder shows in the Library.

Related: R12.

### M4. A file uploaded from a widget property (**Upload Image**, **Upload Video**, **Upload Audio**, **Upload Lottie**) isn't added to `pubspec.yaml`'s `assets:`

- **Area:** Asset pickers and pubspec (`packages/core/lib/src/fields/asset_fields.dart`, `packages/core/lib/src/settings/pubspec_manager.dart`)
- **Severity:** Medium — in a project with no assets yet, the first file uploaded this way shows on the board but isn't declared, so the built app can't load it until something else refreshes the list; every other upload route refreshes it.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev (also in 3.12.5: same picker code)
- **Confidence:** Code reading only, not run — found by `research/features-theme-assets.md` (Open questions, third bullet: "Is `pubspec.yaml` updated before build if `assets/` was empty before?"). I listed every use of `PubspecManager` and found no other refresh on this path. Whether Nowa's build servers add the assets themselves can't be told from the repo.

**What happens.** Nowa writes `flutter: assets:` only when `PubspecManager.refresh()` runs, and the picker's **Upload ...** button never calls it: it creates the file straight in `assets/`. A new project's pubspec has no `assets:`, so a first image uploaded from an **Image** widget stays undeclared. Flutter bundles only the assets a pubspec lists.

**Steps to reproduce** (from the code, not run)
1. Create a new project (its `pubspec.yaml` has no `assets:` and there is no `assets/` folder). Add an **Image** widget and select it.
2. In **Details** open the **Asset** tab, click **Pick Image**, then **Upload Image**, and choose `photo.png`. The board shows the picture.
3. Click `<>` (code mode), open `pubspec.yaml` in **Files** and read the `flutter:` section.

Expected: `assets:` lists `assets/`, as it does after **Upload Assets...** (the docs: "every folder under `assets/` that has files is listed under `flutter:` → `assets:`").
Actual (from the code): `flutter:` still holds only `uses-material-design: true`. A run or build then has no `assets/photo.png`, and `Image.asset` can't load it. Adding a package, picking a Google font or using **Upload Assets...** later writes the list.

**Root cause.**
- `_NowaFilePickerState._pickFile` creates the file with `gProject.files.assetsDir.createFile(file.name, addedFile)` (`packages/core/lib/src/fields/asset_fields.dart:122-134`) and never touches `PubspecManager`. The same picker serves the image, video, audio and Lottie fields (`packages/core/lib/src/fields/basic_fields.dart:923,991,1088,1171`).
- The list is rebuilt only by `PubspecManager.refresh()` → `addAssets` (`packages/core/lib/src/settings/pubspec_manager.dart:141-146,219-249`). Its callers are `ProjectProvider.importInDir` (`packages/core/lib/src/providers/project_provider.dart:718`, used by **Upload Assets...**, pasted images, templates and the AI image tool), the font import (`packages/core/lib/src/fields/text_fields.dart:22`), `PackageService` (`packages/core/lib/src/interpreter/packages/package_service.dart:249,341,352`) and a version migration (`packages/core/lib/src/plugin.dart:164`). Nothing watches `assets/`.
- The new-project pubspec has no `assets:` (`packages/core/lib/src/file_system/templates/common/pubspec_template.dart:34-40`).

**Suggested fix.** Make `_pickFile` go through `gProject.importInDir(name: file.name, dir: gProject.files.assetsDir, bytes: file.bytes!)`, as pasting does (`packages/designer/lib/src/design/copy_paste.dart:114`), or call `await gProject.tryGet<PubspecManager>()?.refresh()` after `createFile` and after the undo's `remove`. A sturdier option is one listener on `assetsDir.watch` in `PubspecManager` (`LibraryService._followAssets` already follows that folder, `packages/core/lib/src/library/library_service.dart:298-300`). Test: a `PubspecManager` test in `packages/core/test/` that creates `assets/a.png` and expects `flutter.assets` to hold `assets/`.

**Docs impact.** `docs/design/assets.md` (L18, "You don't need to edit it") and `docs/reference/widgets/media.md` (L29) are right once this is fixed; until then the first upload from a property needs another refresh.

Related: M5.

### M5. Nowa replaces the whole `flutter: assets:` list of `pubspec.yaml`, so an imported project loses entries that aren't folders under `assets/`

- **Area:** Pubspec management and project import (`packages/core/lib/src/settings/pubspec_manager.dart`)
- **Severity:** High — in an imported Flutter project, entries such as `.env`, a root `images/` folder, package assets or `flavors:` maps are deleted by the first refresh, and in a monorepo the edited package's whole list goes; the built app silently loses those assets and manual re-adding doesn't stick.
- **Where:** both; cloud (uploaded copy) and local-only imports (a local-only project edits your folder in place)
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Code reading only, not run — found by `research/features-theme-assets.md` (line 330: "Every non-empty folder under `assets/` is written to `flutter: assets:` ... (Nowa rewrites that list)"), read with the import and monorepo flows of `docs/code/import.md`.

**What happens.** After an import, a font, a package change and similar actions, Nowa recomputes `flutter: assets:` from the folders of `assets/` and assigns the result, or deletes the key when `assets/` has no files. Entries the project declared itself aren't kept. Fonts are treated the other way: `addFonts` keeps the declared families.

**Steps to reproduce** (from the code, not run)
1. Desktop app: click the arrow next to **New project** → **Import project**, and pick a Flutter folder whose `pubspec.yaml` has `assets:` under `flutter:` with `- .env` and `- images/`, and no `assets/` folder. Expand **Advanced** and choose **Local-only project**, then **Import project**.
2. Open the **Library**, click **Add** (+) → **Upload Assets...** and choose any file (or pick a Google font, or add a package).
3. Open `pubspec.yaml` in your editor or in code mode.

Expected: `.env` and `images/` are still listed, next to `assets/`.
Actual (from the code): `assets:` is `assets/` only. With nothing in `assets/`, the `assets:` key is removed.

Monorepo: after importing a workspace with **Package to open** set to a package (for example `packages/app`), any refresh of that package's pubspec looks for `assets/` in the workspace root, finds none and removes the package's `assets:` key.

**Root cause.** `PubspecManager.addAssets` builds `result` from the directories that `_addAssets` finds under `fs.directory('assets')` and then runs `flutter['assets'] = result` or `flutter.remove('assets')` (`packages/core/lib/src/settings/pubspec_manager.dart:219-249`); it never reads the existing list. It runs in `refresh()` (`:141-146`), reached from `importInDir` (`packages/core/lib/src/providers/project_provider.dart:718`), the font import (`packages/core/lib/src/fields/text_fields.dart:22`) and every package add, update or removal (`packages/core/lib/src/interpreter/packages/package_service.dart:249,341,352`). `fs.directory('assets')` starts at the workspace root (`packages/core/lib/src/file_system/file_system.dart:126-146`), while the pubspec and `assetsDir` belong to the active package (`packages/core/lib/src/providers/project_provider.dart:340-368,446-454`; the pubspec is `fs.packagePath('pubspec.yaml')`, `pubspec_manager.dart:68`). The directory entries use `relativePath`, which is workspace-relative too. `addFonts` shows the intended care (`:179-217`, "What the project declared itself ... is kept"). The file is also re-written from its parsed map (`packages/core/lib/src/file_system/yaml_file.dart:17-27`), so comments in `pubspec.yaml` aren't kept either.

**Suggested fix.** Merge instead of replace: keep every existing entry that isn't one of Nowa's own `assets/…/` directory entries (plain strings and maps with `path:`, `flavors:` or `transformers:`), drop only the `assets/` entries whose folder no longer exists, add the missing ones, and remove the key only when the result is empty. Resolve the folder with `fs.assetsDir` and write package-relative paths (`fromPackagePath`). Test: a new `packages/core/test/pubspec_manager_test.dart` with a pubspec that has `.env`, `images/` and a `path:` map, one with only `assets/`, and a workspace package, checking `flutter.assets` after `refresh()`.

**Docs impact.** `docs/design/assets.md` (L18) and `docs/code/import.md` (the "What to know before you click **Import project**" list and the monorepo section): until fixed, say that Nowa manages `flutter: assets:` and that other entries are removed; after the fix, nothing to change.

Related: M4, M21, R6.

### M6. Git over SSH can't be set up from the app: the SSH-key form is unreachable and **Connect Repository** refuses SSH URLs

- **Area:** Git for local projects (`packages/core/lib/src/settings/git_settings.dart`, `lib/project/panels/git_panel/git_remote_details.dart`, `packages/git_nowa/lib/src/local/local_git_service.dart`)
- **Severity:** Medium — the release notes say "Point Nowa at a key", but the app offers no way to add a key or an SSH remote; SSH works only for a remote created outside Nowa and a key that the ssh-agent holds or that has a default file name.
- **Where:** desktop app; local projects
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Confirmed in code, not run — found by `research/features-code-ship.md` (Open questions: the "point Nowa at a key" release note and "Add Existing Repository only accepts http(s) URLs") and `left-out.md` line 46 ("SSH key-pair form ... Unreachable"). `docs/code/github.md` (L81-82) already documents the URL limit and the default keys, not the dead key form.

**What happens.** `LocalGitServiceImpl` can push and pull over SSH: it tries the ssh-agent, then stored key pairs, then `~/.ssh/id_ed25519` and `id_rsa`. Nothing in the UI can create a stored key pair or an SSH remote. The **Set Git Credentials** dialog has a complete SSH mode (Username, Public Key Path, Private Key Path, Passphrase) that is never shown, and **Add Existing Repository** accepts only `http://` and `https://` URLs. 3.12.0's What's New (`docs/new/whats-new.md` L118-119) says "Point Nowa at a key, or let it use the keys already loaded in your ssh-agent".

**Steps to reproduce** (not run)
1. Desktop app, local project with no remote: open the **Git** panel, expand **Add Existing Repository** and type `git@github.com:you/app.git`. The field says "Please enter a valid URL" and **Connect Repository** does nothing.
2. Open the Git settings → **External Local Credentials** and click **+**. The dialog "Set Git Credentials" has only **Username** and **Access Token**.

Expected: an SSH URL is accepted, and the dialog can take a key (as the release note says).
Actual: both are refused or missing. A key with a custom name, or one with a passphrase and no ssh-agent, can't be used at all.

**Root cause.**
- `_GitCredentialsPopupState` declares `final GitCredentialType _type = GitCredentialType.userPassPlainText;` and never changes it (`packages/core/lib/src/settings/git_settings.dart:394`), so `_buildKeyPair()` and the `sshKey` branches (`:409-418`, `:440`, `:446-455`, `:498-526`) are dead code.
- The URL validator allows only `http` and `https` (`lib/project/panels/git_panel/git_remote_details.dart:236-238`); `LocalGitServiceImpl.addRemote` itself takes any URL (`packages/git_nowa/lib/src/local/local_git_service.dart:258`).
- `_credentialsFor` builds the SSH attempt list (`:311-316`) and `_defaultSshKeys` reads `Platform.environment["HOME"]` (`:340-349`). Windows normally defines `USERPROFILE`, not `HOME`, so that fallback may find nothing there (not checked on a Windows machine).

**Suggested fix.** Either finish the feature or stop promising it. Finish: let the dialog choose its type (a toggle between **Access Token** and **SSH Key**, using the existing `_buildKeyPair`), accept `ssh://` and `user@host:path` URLs in the validator, and fall back to `USERPROFILE` when `HOME` is empty. Otherwise: delete the dead SSH-key code, say in the Git settings where SSH keys come from, and edit the release note. Test: a `packages/git_nowa/test/` case for `_credentialsFor` with an SSH URL and a `HOME`-less environment.

**Docs impact.** `docs/code/github.md` (L81-82: the SSH bullets and "Adding an SSH remote"), `docs/new/whats-new.md` (L118-119); after a fix, `docs/code/local-projects.md` too if it mentions SSH.

Related: R13.

### M7. A failed build start from the **Deploy** menu is only logged and leaves **Deploy** and **Build** disabled until the project is reopened

- **Area:** Cloud builds (`lib/project/run/deploy_button.dart`, `packages/core/lib/src/cloud_build_v2/ui`)
- **Severity:** Medium — after one failed start (network, server error, an exhausted build allowance) the platform's **Deploy** and **Build** buttons stay greyed out with no message; reopening the project clears it.
- **Where:** both; cloud projects (the Android Debug, Android Release and iOS rows)
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Confirmed in code, not run (a failed start needs a cloud project and a failing request). Found by `research/features-code-ship.md` (Open questions, line 1122: the Deploy menu "comments mention a weekly build quota ... but the top-bar path doesn't check it"). How the server answers an over-quota start can't be told from the repo.

**What happens.** Three things in one path. (1) The **Deploy** row of the Deploy menu starts the build directly. A comment above it promises a plan and weekly-quota gate with the upgrade prompt, but the code has none; only **Settings** → **Deployment** → **Build** checks the remaining builds and shows "Your build quota has been used up...". (2) If the start throws, the menu only calls `logError`. (3) The workflow manager is then left in `WorkflowState.error`, which nothing resets, so `canStartBuild` stays false: the **Deploy** button is greyed out, and the **Build** button in Settings is disabled with the hover hint "Loading the workflow status…".

**Steps to reproduce** (not run)
1. Open a cloud project whose Android Release workflow is set up (**Settings** → **Deployment**). Turn off the network.
2. Click **Deploy** in the top bar, then **Deploy** on the **Android Release** row. The request fails; no dialog or snackbar appears.
3. Turn the network on. Open the **Deploy** menu again: the row's **Deploy** button is greyed out. In **Settings** → **Deployment** → **Android** hover **Build**: the hint reads "Loading the workflow status…".
With a used-up allowance, step 2 is the same click: instead of the "Time to level up" dialog that **Build** in Settings shows, nothing is shown.

Expected: a message ("Your build quota has been used up..." or the error), and the buttons work again.
Actual (from the code): no message, and both buttons stay disabled until the project is reopened (a new `CloudBuildV2Manager`).

**Root cause.**
- `_deployMobile` (`lib/project/run/deploy_button.dart:166-185`) has a comment promising the plan and quota gate (`:167-172`), then goes from the configuration check to `await m.startBuild(branch: branch)` inside `try { … } catch (e) { logError(e); }` (`:180-184`). The row's lock only asks `hasGrantSync(EntitlementKeys.cloudBuilds)` (`:56-61`), which for a metered grant is `limit != 0` (`packages/core/lib/src/billing/billing_models.dart:131-145`), so it never looks at what is left. The quota check exists only in `_startBuild` of the Settings card (`packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:358-371`).
- `WorkflowManager.startBuild` sets `_workflowState = WorkflowState.error` and rethrows (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:242-261`). `_workflowState` is assigned only at `:82`, `:243`, `:251` and `:253`, so `error` is permanent. `canStartBuild` needs idle (`:394-399`); the Deploy row uses it at `deploy_button.dart:288`, the Settings card at `workflow_details_page.dart:373-377,477`. The three managers are created once per project (`packages/core/lib/src/cloud_build_v2/ui/cloud_build_v2_manager.dart:12-26`, registered in `packages/core/lib/src/plugin.dart:54`). The Settings `_startBuild` has no try/catch either, so the exception there is unhandled.

**Suggested fix.** Put the remaining-builds check in one method both callers use (it reads `getRemainingGrant(EntitlementKeys.cloudBuilds)` and shows `PaymentDialog`), and call it first in `_deployMobile`. In `WorkflowManager.startBuild`, return to `idle` after recording the error (or give `error` a retry), and show the message with `showSnackbarError` in both callers. Test: `packages/core/test/cloud_build_v2/workflow_manager_test.dart` already has a `WorkflowManager` with a mock service; add a service whose `startBuild` throws and expect `canStartBuild` to be true again.

**Docs impact.** `docs/publish/builds.md` (L22: "You can also click **Deploy** in the top bar"; L33: the quota paragraph holds today only for the Settings **Build** button).

Related: P8.

### M8. The status bar's warning and info counts open **Problems**, where those messages aren't

- **Area:** Status bar and Console (`lib/status_bar.dart`)
- **Severity:** Low — one more click; the counts and the tab they open describe different lists.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (also in 3.12.5). Already described in `docs/test/problems.md` (L12-14) as it behaves.
- **Confidence:** Confirmed in code, not run — found by `research/features-editor-shell.md` (Open questions, last bullet: "the warning and info counts are log counts, not Problems").

**What happens.** The three counts at the left of the status bar sit in one clickable area that opens the **Console** on **Problems**. Only the red number counts Problems. The warning and info numbers count entries of the **Logs** tab, so clicking them shows a list that doesn't contain what they count.

**Steps to reproduce** (not run)
1. Open a project and run something that prints (or use the app for a while): the info count (the **i** icon) rises.
2. Click the info or the warning count.

Expected: the **Console** opens on **Logs**, where those messages are.
Actual (from the code): it opens on **Problems**; the messages are one tab over. The **Problems** tab can list warning-type problems of its own (for example `packages/core/lib/src/interpreter/block_problems.dart:362`), which the status bar's warning number doesn't count.

**Root cause.** One `InkWell` wraps all three `_LogCount`s and calls `_showConsole(context, true)`, which opens tab 0 (`lib/status_bar.dart:194-200`, `_showConsole` at `:166-176`). The first number is `problemService.errorCount`; the other two are `logger.warningCount` and `logger.infoCount` (`:197-199`; `packages/core/lib/src/providers/logger_provider.dart:58-60`).

**Suggested fix.** Give the warning and info counts their own tap target that calls `_showConsole(context, false)` (the **Logs** tab, as the last-message text next to them already does, `:206`). Test: a widget test in the repo's root `test/` that taps each count and checks the tab index.

**Docs impact.** `docs/test/problems.md` (L12-14) and `docs/test/run.md` (Read the logs): after the fix, say that the warning and info counts open **Logs**.

### M9. The **Assistant** icon's tooltip shows the Search shortcut instead of Ctrl/Cmd+1

- **Area:** Sidebar (`lib/project/side_bar.dart`, `lib/setup_general_actions.dart`)
- **Severity:** Low — a wrong key hint on one icon; the real keys work.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Code reading only, not run — found by `research/features-editor-shell.md` (Open questions, first bullet, about sidebar numbers); this is a different defect from R29 (numbers with the **Outline** icon hidden). I checked the registration order, not the tooltip on screen.

**What happens.** Each sidebar icon looks up its hint with `findActivator<OpenSidePanelIntent>(index == icon index)`, which returns the first registered match. The **Search** shortcut Shift+F is registered as `OpenSidePanelIntent(0, name: 'Search')`, index 0, before the Ctrl/Cmd+1…9 entries. The first icon, **Assistant**, is also index 0, so its tooltip shows Shift+F's key and not Ctrl/Cmd+1.

**Steps to reproduce** (not run)
1. Open any project and hover the first icon of the left sidebar (**Assistant**).
2. Read the key hint beside its name; then press Ctrl/Cmd+1 and Ctrl/Cmd+Shift+F.

Expected: **Assistant** with Ctrl/Cmd+1.
Actual (from the code): **Assistant** with the Shift+F hint. Ctrl/Cmd+1 still opens the Assistant, and Shift+F opens **Search**, as `docs/reference/shortcuts.md` (L62, L65) says.

**Root cause.** `lib/setup_general_actions.dart:43` adds `AdaptiveActivator(keyF, shift: true): OpenSidePanelIntent(0, name: 'Search')` ahead of the digit entries (`:48-62`); `addShortcuts` keeps insertion order (`packages/core/lib/src/shortcuts/shortcut_registry.dart:41-50`) and `findActivator` returns the first match (`:68-88`); the tooltip asks with only the index (`lib/project/side_bar.dart:421-424`).

**Suggested fix.** Make the tooltip skip intents that carry an explicit name: `predicate: (intent) => intent.index == widget.index && intent.name == null` (`lib/project/side_bar.dart:423`). Test: a registry test that registers the same entries as `lib/setup_general_actions.dart` and checks that the lookup for index 0 returns the digit-1 activator.

**Docs impact.** None.

Related: P2, R29, R32.

### M10. **Change Password** accepts any non-empty new password, but **Log In** refuses a password under 8 characters

- **Area:** Account settings and sign-in (`packages/core/lib/src/settings/account_editor_settings/account_details/change_password.dart`, `lib/auth/auth_view.dart`)
- **Severity:** Low — the form lets through a password that the sign-up and reset forms refuse and that the **Log In** form then can't accept; it becomes a lock-out (the way back is **Forgot Password?** on the sign-in page) only if Nowa's server also accepts a short password, which can't be told here.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev for the forms (also in 3.12.5); the server rule is unknown (Can't tell)
- **Confidence:** Confirmed in code, not run — found by `research/features-account-projects.md` (line 1101: "No length check in this form; sign-up/reset require 8+"); the **Log In** side comes from reading `lib/auth/auth_view.dart`.

**What happens.** The **New Password** field of **Change Password** (and **Set Password**) only checks that it isn't empty, and **Repeat New Password** that it matches. The **Create account** form and the **Reset password** page require 8 characters. The **Log In** form applies the same 8-character rule to the password you type, before it asks the server. A shorter password, from this form or from an older account, can therefore not be typed into **Log In**.

**Steps to reproduce** (not run)
1. Sign in, open **Settings** from the dashboard sidebar → **Account Details** → **Change Password**.
2. Type your **Current Password**, then `abc12` in **New Password** and in **Repeat New Password**. Click **Submit**.
3. If "Password updated" shows, log out and try to log in with `abc12`.

Expected: step 2 says "Password must be at least 8 characters", like **Create account**.
Actual (from the code): step 2 passes validation and sends the request. At step 3 the **Log In** form shows "Password must be at least 8 characters" and never contacts the server; **Forgot Password?** on the sign-in page, which sets a new 8-character password, is the only way back in.

**Root cause.** The **New Password** validator is `val == '' ? 'This field is required' : null` and **Repeat New Password** only compares (`change_password.dart:61-77`). `AuthValidators.password` (`lib/auth/auth_widgets.dart:22-26`) is used by **Create account** (`lib/auth/auth_view.dart:482`), **Reset password** (`lib/auth/reset_password_page.dart:86`) and also by **Log In** (`lib/auth/auth_view.dart:305`). A sign-in form should only check that a password was typed, since the rule may have been different when an account's password was set. `packages/core` can't import the app's `lib/auth`.

**Suggested fix.** Use `AuthValidators.required` on the **Log In** password. Move the 8-character rule into `packages/core` and use it in **Change Password** (message "Password must be at least 8 characters"). Test: widget tests for the sign-in form (a 5-character password reaches the submit call) and for **Change Password** (a 5-character password shows the message).

**Docs impact.** `docs/account/account-settings.md` (L45-52, "Change or set your password"): once the rule is checked, add "at least 8 characters".

### M11. A widget hovered in the **Outline** stays outlined on the board after the pointer leaves the Outline

- **Area:** Outline (`packages/nowa_ui/lib/outline/outline_view.dart`, `packages/designer/lib/src/panels/outline_panel.dart`)
- **Severity:** Low — a stale hover outline on the board, which clears when the pointer next crosses the board.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — the cause below was read, not run. The capture agent saw the symptom live on the 3.12.5 web build (`captures/README.md`, line 121-122: "Hover outlines from Outline rows can stay stuck on the board").

**What happens.** Moving the pointer onto an **Outline** row sets the board's hover to that widget (an outline on the board). Nothing clears it when the pointer leaves the row or the panel, so the outline stays until the board sets another hover.

**Steps to reproduce** (not run)
1. Open a screen with several widgets. Open the **Outline** (sidebar icon, or the floating Outline).
2. Move the pointer over a row: the widget gets a hover outline on the board.
3. Move the pointer out of the Outline to something that isn't the board, for example a sidebar icon or the top bar.

Expected: the hover outline disappears when the pointer leaves the Outline.
Actual: it stays on the board.

**Root cause.** Both row kinds wrap their tile in `MouseRegion(onEnter: (_) => intents.hover?.call(node.id), …)` and never set `onExit` (`packages/nowa_ui/lib/outline/outline_view.dart:262,377`). `OutlineIntents.hover` takes a `String?` (`packages/nowa_ui/lib/outline/outline_contract.dart:210`) and the designer maps `null` to "no hover" (`packages/designer/lib/src/panels/outline_panel.dart:143`), but no caller sends `null`.

**Suggested fix.** Add one `MouseRegion(onExit: (_) => intents.hover?.call(null))` around the whole outline list (one region avoids an exit and enter pair between rows). Test: a widget test next to `packages/designer/test/outline_mapper_test.dart` that hovers a row, leaves the panel and expects `selection.hovering` to be null.

**Docs impact.** None.

### M12. The **Slider** widget uses a fixed orange and ignores the theme's **Primary** color

- **Area:** Slider widget (`packages/nowa_runtime/lib/src/widgets/slider.dart`, `packages/core/lib/src/widgets_to_add/widgets_to_add.dart`)
- **Severity:** Low — a new Slider is orange in every app, unlike Switch, Checkbox and the progress bar, which follow **Primary**; the color can be changed per Slider.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (also in 3.12.5: `nowa_runtime` 0.1.3 has the same defaults)
- **Confidence:** Confirmed in code and seen by the capture agent (`captures/README.md`, line 225: "the Slider keeps its own orange and does not follow **Primary**"); I read the code, not the screen.

**What happens.** The **Slider** the picker adds is `NSlider` from `nowa_runtime`. Its constructor defaults are literal colors: active `0xFFFFAB3F` (orange), thumb and overlay white, inactive grey. Changing **Primary** in **Themes** recolors a Switch, a Checkbox and a Linear Progress Indicator, but not the Slider. Because the defaults live in the package, the built app shows the same orange.

**Steps to reproduce** (not run)
1. Add a **Slider**, a **Switch** and a **Checkbox** to a screen (the Library, or Cmd/Ctrl+K).
2. Open **Themes**, click **Primary** and drag the hue to pink.

Expected: the Slider's active track follows **Primary**, like the other two.
Actual: the Switch and Checkbox turn pink; the Slider stays orange with a white thumb.

**Root cause.** `NSlider`'s constructor defaults `activeColor = const Color(0xFFFFAB3F)`, `thumbColor = Colors.white`, `overlayColor = Colors.white` and `inactiveColor = Colors.grey` (`packages/nowa_runtime/lib/src/widgets/slider.dart:14-17`) and passes them to `Slider` (`:48-58`), so the theme's `SliderTheme` colors never apply. The picker entry sets only `value` and `onChanged` (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:716-733`).

**Suggested fix.** In `NSlider`, make the color parameters nullable with no defaults and fall back to `Theme.of(context).colorScheme.primary` (active), `onPrimary` or `primary` (thumb), and a faded `onSurface` (inactive). Existing apps will change color, so mention it in `packages/nowa_runtime/CHANGELOG.md` and bump the version. A smaller change: have the picker entry set `activeColor` to the theme's `primary` reference. Test: the package has no tests yet; add `packages/nowa_runtime/test/slider_test.dart` that pumps `NSlider` under a `ThemeData` with a pink primary and checks the active track color.

**Docs impact.** `docs/reference/widgets/index.md` (L93, the **Slider** row) and `docs/design/themes.md` (L96, "A widget with its own color ... keeps that color"): after the fix nothing to change; until then the Slider is an example of a widget that doesn't follow the theme.

### M14. **GLOBALS** offers **Navigator**, **GoRouter**, **Media Query** and **Show snackbar** in functions that have no `context`

- **Area:** Circuit add-node menu (`packages/core/lib/src/state_management/global_state_suggestions.dart`, `packages/core/lib/src/interpreter/suggestion.dart`)
- **Severity:** High — generated code that doesn't build: in a global state, model or other non-widget function the node writes code that refers to a `context` the function doesn't have, and nothing hints at the workaround (add a `BuildContext context` param).
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Code reading only, not run — found by `research/features-logic.md` (Open questions, "Context-dependent actions outside screens", and the line 722 limit that **GLOBALS** inside a global-state function lists these five entries). What the analyzer then reports wasn't observed.

**What happens.** The **Globals** category is built by `GlobalStateSuggestionsFinder` for every function. Four of its entries build calls on `ReferenceBlock('context')`: `Navigator.of(context).push(...)`, `GoRouter.of(context).push(...)`, `MediaQuery.of(context)` and `ScaffoldMessenger.of(context).showSnackBar(...)`. A function in a screen or component has a `context` (the build method's, or the State's). A global-state function doesn't, so the code the node writes has an undefined name. The finder already knows this for the global states themselves, which it lists only inside widget classes.

**Steps to reproduce** (not run)
1. In the **Library**, click **Filter** and choose **Global states**, then double-click **AppState** (new projects have it).
2. Click `AppState` in the list on the left, hover **Functions** and click **+**. Circuit opens on the right.
3. Click the dot under the top node, open **GLOBALS** and click **Show snackbar**.
4. Look at the node and at **Problems** (or **View Code**).

Expected: **Show snackbar** isn't offered here, or Nowa adds a `BuildContext context` param and says so.
Actual (from the code): the node is added and writes `ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Hello World')))`, with no `context` in the function. The same holds for the other three entries.

**Root cause.** `GlobalStateSuggestionsFinder.suggestions` returns the four context-based entries unconditionally (`packages/core/lib/src/state_management/global_state_suggestions.dart:6-21,29-67`) and guards only the global-state entries with `scope.enclosingWidgetClass == null` (`:70-74`). `GeneralSuggestions.generateCategories` adds the **Globals** category for every scope, in and out of Circuit (`packages/core/lib/src/interpreter/suggestion.dart:468-480`). `checkPlatform` doesn't use `context` and is fine anywhere.

**Suggested fix.** Apply the same guard to the four entries: return them only when the scope has a widget class or a `BuildContext` parameter in reach (for example, a function whose `ParamList` has a `BuildContext`). Otherwise offer them with a small "Add context param" action that adds `BuildContext context` to the function. Test: a suggestions test in `packages/core/test/interpreter_tests/` that asks for the **Globals** category inside a `NotifierClassDecl` function and checks that the four entries are missing.

**Docs impact.** `docs/logic/global-state.md` (L62: "**GLOBALS** lists attached global states only inside screens and components") and `docs/logic/actions.md`: until fixed, say that **Navigator**, **GoRouter**, **Media Query** and **Show snackbar** need a `BuildContext context` param in a global-state function.

### M15. **Clone from GitHub** shows an empty list and no way to connect when GitHub isn't connected

- **Area:** Clone from GitHub dialog and repository list (`lib/dashboard/create_new_project/github_clone_dialog.dart`, `packages/core/lib/src/settings/github_integration_settings.dart`)
- **Severity:** Medium — the first-time clone path dead-ends: a heading, an empty area and a disabled **Clone project**, with no message and no **Connect GitHub** button; the docs give the workaround.
- **Where:** both; both (clone to the cloud or, in the desktop app, **Local-only**)
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Confirmed in code, not run — found by `research/features-code-ship.md` (Open questions: "Clone from GitHub shows an empty list with no connect prompt when GitHub isn't connected") and `research/features-account-projects.md` (Open questions, "Clone from GitHub without a GitHub connection"). `docs/code/github.md` ("Fix connection problems") and `docs/code/import.md` ("Before you start") already say to connect first.

**What happens.** The dialog is opened without checking the GitHub connection. Its repository list reads the GitHub installation and the repositories, and draws nothing until both exist. When GitHub isn't connected there is no installation, so the area stays empty: no text, no spinner, no **Connect GitHub** button. The error the manager stored isn't shown either. The same widget is used by **Add Existing Repository** in the Git panel, where the URL field still works.

**Steps to reproduce** (not run)
1. Sign in with an account that has not connected GitHub (**Settings** → **Git** shows **Connect GitHub**).
2. On the dashboard click the arrow next to **New project** and choose **Clone from GitHub**.

Expected: "GitHub isn't connected" with a **Connect GitHub** button, or the dialog starts the connection.
Actual (from the code): the heading **Clone from GitHub**, the line "Pick a repository to import.", an empty area, the **Project name** box and a disabled **Clone project** (it needs a selected repository).

**Root cause.** `_RepositoryListViewState.build` returns `const SizedBox.shrink()` when `_repositories == null || _installation == null` (`packages/core/lib/src/settings/github_integration_settings.dart:224`), before the spinner and the empty-list branches. `GithubOAuthManager.getInstallation` returns null and `getRepositories` returns `[]` on any error and keep the message in `manager.error` (`packages/git_nowa/lib/src/github_oauth/github_oauth_manager.dart:49-71`), which this widget reads (`:179`) but never draws on that path. `GithubCloneDialog` embeds the list directly (`lib/dashboard/create_new_project/github_clone_dialog.dart:192-197`) and `NButton(label: 'Clone project', onPressed: _canClone ? _clone : null)` stays disabled (`:89,315`). The widget also asks GitHub every 5 seconds while it is open (`:200-206`). The **Connect GitHub** button exists in `GithubIntegrationSettings` (`:84`).

**Suggested fix.** Replace the early return with states: loading → `NowaLoading`; no installation → a short text plus the existing **Connect GitHub** button (or `GithubIntegrationSettings(onConnected: …)`), then reload the list; an error → the stored `manager.error`. Test: a widget test in `packages/core/test/` with a fake `GithubOAuthManager` that has no installation, expecting the **Connect GitHub** button.

**Docs impact.** `docs/code/github.md` ("Fix connection problems": the "No repository list in Clone from GitHub" row) and `docs/code/import.md` (Clone from GitHub, "Before you start"): after the fix, the dialog says it itself.

### M16. A playground that grows past about 2 MB is silently not stored, and a reload brings back an older copy

- **Area:** Playground persistence (`packages/core/lib/src/playground/playground_manager.dart`)
- **Severity:** High — a loss a warning would let you avoid: edits made after the playground passes about 2 MB are lost on reload with no notice in the app (the docs say very large playgrounds aren't kept); saving to an account avoids it.
- **Where:** web app (the browser's local storage); playground only
- **Status:** Present in 3.13.0 and dev (also in 3.12.5)
- **Confidence:** Confirmed in code, not run (a project this large has to be built by hand) — found by `research/features-account-projects.md` (Open questions, "Playground storage cap"). `docs/get-started/playground.md` (L39) already says "Very large playgrounds aren't kept"; the code keeps the last small copy, which that sentence doesn't say.

**What happens.** Every save mirrors the playground into the browser's local storage as one base64 string. When that string is longer than 3 MB (about 2.25 MB of zipped project files; photos barely compress) `persist` returns without writing and without a message, so the copy stored by the last smaller save stays. The next reload restores that older copy; if there was never a smaller save, it opens the starter app.

**Steps to reproduce** (not run)
1. Open the playground without signing in. Add an **Image**, open its **Asset** tab, click **Pick Image** → **Upload Image** and choose a photo of about 3 MB (or upload two of 1.5 MB).
2. Wait for the auto save (every 20 seconds) or press Ctrl/Cmd+S, then reload the page.

Expected: the playground returns as you left it, or Nowa says it is too large to keep and offers to save it to an account.
Actual (from the code): nothing is said at step 2; after the reload the app is the version from before the upload (or the starter app), without the image and the edits made after it.

**Root cause.** `PlaygroundManager.persist` encodes the bundle and does `if (encoded.length > _maxStoredLength) return;` before `SharedPrefManager.setString`, with `_maxStoredLength = 3 * 1024 * 1024` (`packages/core/lib/src/playground/playground_manager.dart:20-22,29-38`). The old value is neither replaced nor removed, and `_usePlayground` restores whatever is stored (`lib/project/project_page.dart:336-342`, `PlaygroundManager.restore` at `:40-50`). A `catch` around the write only logs (`:35-37`). The editor shows no unsaved-work badge in the playground by design (the class comment), so nothing else warns.

**Suggested fix.** At minimum, when the cap is hit, show a persistent notice ("This playground is too large to keep in your browser. Save it to your account.") and remove the stale copy, so a reload doesn't pretend to be the latest. Better: compress the bundle before encoding, or store it in IndexedDB, which has a larger quota. Test: extend `packages/core/test/playground_test.dart` with a bundle larger than the cap and check the stored value and the notice.

**Docs impact.** `docs/get-started/playground.md` (L39: "Very large playgrounds aren't kept"): after the fix, describe the notice.

### M17. Changing the **Bundle Identifier** doesn't update the iOS build's `BUNDLE_ID`, so the next iOS build signs for the old one

- **Area:** iOS cloud builds and Project Details (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart`, `packages/core/lib/src/project/rename.dart`)
- **Severity:** Medium — an iOS build started after the identifier changed fetches signing files for the old identifier and fails or signs the wrong app, with no warning; the documented fix is to save the credentials again.
- **Where:** both; cloud projects only (local projects have no cloud builds)
- **Status:** Present in 3.13.0 and dev (also in 3.12.5)
- **Confidence:** Confirmed in code, not run (it needs a cloud project, a plan with builds and Apple credentials; the server-side build wasn't observed). Found by `research/features-code-ship.md` (Open questions: "If the Bundle Identifier changes after App Store Connect credentials were saved, must the user re-save them?"); `docs/publish/ios.md` (L35) already tells users to **Save** again.

**What happens.** The iOS workflow reads the identifier from a build variable `BUNDLE_ID`, not from the project. That variable is written only when **App Store Connect** credentials are saved. Changing **Bundle Identifier** in Project Details updates the project files (Xcode, Android, macOS, settings) but not the variable. Nothing marks the iOS setup as out of date: its check only asks whether `BUNDLE_ID` exists.

**Steps to reproduce** (not run)
1. In a cloud project on a plan with builds, set **Bundle Identifier** to `com.acme.shop` (**Settings** → **Project Details**) and save the **App Store Connect** credentials (**Settings** → **Deployment** → **iOS**).
2. Change **Bundle Identifier** to `com.acme.shop2` and press Enter.
3. Click **Deploy** → **Deploy** on the **iOS** row and open the build log.

Expected: the build uses `com.acme.shop2`, or Nowa says the iOS credentials need saving again.
Actual (from the code): the signing step runs `app-store-connect fetch-signing-files "com.acme.shop" …` (the saved value) while the Xcode project says `com.acme.shop2`; signing then fails or uses a profile of the old app.

**Root cause.** `saveAppStoreConnectCreds` copies `AppNameService.model.bundleId` into the `BUNDLE_ID` variable of group `ios_credentials` (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:485-505`, the read at `:495`). `codemagic.yaml` signs with it (`packages/core/lib/src/file_system/codemagic_file.dart:104`). `changeBundleId` rewrites the project but never the variable (`packages/core/lib/src/project/rename.dart:48-70`; the field calls it at `packages/core/lib/src/settings/project_detail_settings.dart:124`). `missingConfiguration` only tests that each required variable exists (`workflow_manager.dart:401`, list at `:692-699`), so the stale value passes.

**Suggested fix.** After a successful `changeBundleId` in a cloud project, update `BUNDLE_ID` through the same `updateVariable` call `saveAppStoreConnectCreds` uses, or have `startBuild` compare the saved value with the project's and either update it or stop with "The Bundle Identifier changed; save the iOS credentials again". Test: `packages/core/test/cloud_build_v2/workflow_manager_test.dart` (mock service): change the bundle id, start an iOS build, expect the variable to be updated.

**Docs impact.** `docs/publish/ios.md` (L35: "If you change the identifier later, click the pencil ... and Save again"); remove that step after the fix.

Related: M21, R20.

### M18. Renaming, moving or deleting an asset in the Library leaves widgets pointing at the old path, and nothing reports it

- **Area:** Library assets and file moves (`lib/project/panels/library_panel/library_host.dart`, `packages/core/lib/src/file_system`)
- **Severity:** Medium — every widget that used the file loses its image (the path points at a file that is gone) until each widget is re-pointed by hand; no warning before the action and nothing in **Problems** after it.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (also in 3.12.5: same move and delete code)
- **Confidence:** Confirmed in code, not run. Found by `research/features-theme-assets.md` (Open questions: "Renaming or moving an asset: confirm in the app that widgets using the old path break (no path-rewrite code found)"). `docs/design/assets.md` (L87) already states it for **Rename** ("Widgets that already use the file keep its old path, so pick the file again in them").

**What happens.** An image, video or other asset is referenced by its path as a plain string (for example `assets/logo.png` in an `AssetImage`). **Rename**, dragging a row into another asset folder, and **Delete** change or remove the file, but nothing looks for those strings. The delete confirmation only names the file.

**Steps to reproduce** (not run)
1. Select an **Image** widget, open **Pick Image**, and pick `logo.png` (or upload one).
2. In the **Library**, turn on the **Assets** chip, right-click `logo.png` → **Rename**, type `brand.png` and press Enter. (Or drag the row onto a folder under `assets/`, or choose **Delete** and answer **Yes**.)
3. Select the Image again and look at its **Asset** value, the board, and **Problems**.

Expected: the Image follows the file (or Nowa lists the widgets that use it before renaming or deleting).
Actual (from the code): the Image still points at `assets/logo.png`, which no longer exists; **Problems** has no entry for it.

**Root cause.** The Library's rename and move call `MoveFileIntent` (`lib/project/panels/library_panel/library_host.dart:199-213,255-264`), whose action runs `NFileEntity.move` (`packages/core/lib/src/file_system/actions/file_actions.dart:383-388`; `packages/core/lib/src/file_system/nfile_impl.dart:102-128`). `move` re-marks the Dart files returned by `findReferences` (`packages/core/lib/src/file_system/file_system.dart:430-437`), which are found through `DependenciesVisitor`: it records only references to declarations (`ReferenceBlock`, `CallExpr`) and never string literals (`packages/core/lib/src/interpreter/visitors/dependencies_visitor.dart:5-30`). `RemoveFileAction` checks only the declarations inside Dart files being deleted (`packages/core/lib/src/file_system/actions/file_actions.dart:156-178`). `ProblemsVisitor` has no check for missing asset files (`packages/core/lib/src/interpreter/block_problems.dart` holds no asset rule).

**Suggested fix.** On rename and move, rewrite the `StringBlock`s whose value equals the old relative path (a visitor over `lib/` and `boards/`, in the same undo record), and on delete list the widgets that use the file in the confirmation. Add a Problems rule "Asset not found: `assets/logo.png`" for `AssetImage`/`Image.asset` paths. Test: `packages/core/test/file_tests/` — rename an asset used by an `AssetImage` and expect the path to change, and that undo restores it.

**Docs impact.** `docs/design/assets.md` (L87: the **Rename** row; L88, **Delete**; L92, the drag sentence): after the fix, remove "keep its old path" and say that Nowa updates the widgets.

### M19. Right after a widget is dropped on the board, typing in **L**, **T**, **W** or **H** does nothing until the widget is selected again

- **Area:** Details **Layout** section and drops on the board (`packages/designer/lib/src/design_experience/move_tool.dart`, `packages/designer/lib/src/details/widget_details.dart`)
- **Severity:** Medium — the first thing most people do after a drop (set the size or position) silently fails; clicking the widget on the board or its row in the **Outline** fixes it.
- **Where:** both; both
- **Status:** Can't tell: seen on 3.12.5 only. The drop and move code is identical in 3.13.0 (`move_tool.dart`, `move_action_handler.dart`, `widget_instance_impl.dart`), so it is most likely present in 3.13.0 and dev, but it was not re-run there.
- **Confidence:** Code reading only on 3.13.0 — the symptom was seen live on the 3.12.5 web build by the capture agent (`captures/README.md`, L119-122: "Typing into L / T / W / H of a widget that was just dropped does nothing: click its row in the **Outline** first ... Selected that way, **Details** has a breadcrumb row"). The cause below is a reading of the code, not confirmed by a run.

**What happens.** After a widget is dropped from the Library, its **Details** has no breadcrumb row, and the numbers typed into the **Layout** fields (**L**, **T**, **W**, **H**) have no effect. After the widget is selected again from the **Outline** the breadcrumb row is there and the fields work.

**Steps to reproduce** (3.12.5 live; not re-run on 3.13.0)
1. Open the playground. Drag a **Container** from the Library (or the widget picker) onto the Home Page screen.
2. In **Details** → **Layout**, double-click **W**, type `200` and press Enter.
3. Click the Container's row in the **Outline** and repeat step 2.

Expected: step 2 sets the width, as step 3 does.
Actual (live): step 2 changes nothing and **Details** shows no breadcrumb row; at step 3 the row shows and **W** works.

**Root cause.** A reading of the code, not confirmed by a run. `MoveTool.confirm` selects the move handlers' own instances (`packages/designer/lib/src/design_experience/move_tool.dart:215-226`). `WidgetInstance.move` first calls `changeOwner(null)` ("to store the instance that is being moved/dragged in the model with the key being null") and then places it (`packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:219-236`), so the selected instance has no owner. Its `parent` is looked up as `model.parent?.getInstance(owner)` (`:104`), which is null for owner `null`. `SelectionBreadcrumbs` returns nothing when `parent == null` (`packages/designer/lib/src/details/widget_details.dart:319`), which matches the missing row. The **Layout** fields most likely depend on the same owner and parent and so edit nothing.

**Suggested fix.** After `confirm`, select the live instance of each placed block (`owner.getSelection(block)` as `group_details.dart:31-34` does after a replace) instead of the dragged one. Test: `packages/designer/test/move_test.dart` — drop a widget with a `MoveTool`, confirm, and check that `selection.getActive<WidgetInstance>()?.parent` is not null and that setting a width changes the block.

**Docs impact.** None today (the captures README keeps the workaround). If it is not fixed, `docs/design/layout.md` could say "click the widget first".

Related: M20.

### M20. After a Group is changed to a Row or a Column, the **Details** breadcrumb keeps saying **Stack** until the pointer moves over a widget

- **Area:** Details breadcrumb and Group section (`packages/designer/lib/src/details/widget_details.dart`, `packages/designer/lib/src/details/group_details.dart`)
- **Severity:** Low — a stale name in the breadcrumb row of **Details**; it corrects itself on the next hover or selection.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (also in 3.12.5: `SelectionBreadcrumbs`, `BFGroup._replace` and `SelectionProvider.recordSelect` are the same)
- **Confidence:** Reproduced live by the capture agent in 3.13.0 (`captures/ui-diffs-3.13.md`, last row: "The **Details** breadcrumb also keeps saying **Stack** for a Column until you hover a widget on the board"; `captures/README.md` L210 saw the same on 3.12.5). The cause below is a reading of the code, not run.

**What happens.** A Group starts as a **Stack**. Clicking the right arrow or the down arrow in the **Group** header of **Details** swaps the widget for a Row or a Column, but the breadcrumb row at the top of **Details** still names it **Stack**. Moving the pointer over a widget on the board refreshes it.

**Steps to reproduce**
1. Open the playground. Select two widgets of the home screen (click one row in the **Outline**, Shift+click another), right-click one and choose **Group**.
2. With the Group selected, open **Details** → **Group** and click the down arrow (Column).
3. Read the last segment of the breadcrumb row at the top of **Details**, then move the pointer over a widget on the board and read it again.

Expected: "Column" at step 3.
Actual (live): "Stack" at step 3, "Column" after the pointer moved over the board.

**Root cause.** Most likely this: `BFGroup._replace` builds the new selection with `owner.getSelection(host.block)` *before* the replace record runs, so it is the old block's instance, equal to the current selection (`packages/designer/lib/src/details/group_details.dart:17-41`). `SelectionProvider.recordSelect` returns null when the lists are equal (`packages/core/lib/src/providers/selection_provider.dart:43`), so nothing selects and nothing notifies. `SelectionBreadcrumbs` rebuilds only through `context.watch<SelectionProvider>()` (`packages/designer/lib/src/details/widget_details.dart:313`) and reads `selection.name` at build (`:335`). A hover calls `notifyListeners` (`selection_provider.dart:68-71`), which is why moving over the board fixes the label.

**Suggested fix.** Select the placed widget after the replace runs (build `newSelection` inside the batch's `executeCallback`, or call `select` with `owner.getSelection(newBlock)` once the record has executed). Or let `SelectionBreadcrumbs` also listen to the selected instance's block changes, as the field widgets do. Test: `packages/designer/test/details_test.dart` — change a Stack group to a Column and check the breadcrumb label.

**Docs impact.** None (`docs/design/layout.md` doesn't mention the breadcrumb).

Related: P21, M19.

### M21. Changing the App Name, the Bundle Identifier, a permission or a package's setup rewrites whole platform files from templates, wiping what an imported app had in them

- **Area:** Platform files and project import (`packages/core/lib/src/file_system/templates`, `packages/core/lib/src/project/rename.dart`, `packages/core/lib/src/services/permissions_service.dart`)
- **Severity:** High — the first rename, permission change or package setup in an imported Flutter app replaces `AndroidManifest.xml`, `Info.plist`, `build.gradle.kts` or the `Podfile` with Nowa's template, and everything hand-written in them (services, intent filters, plist keys, signing and flavors, pod hooks) is gone without a warning. A local-only import can get it back from Git.
- **Where:** both; cloud (uploaded copy) and local-only imports (a local-only import edits your folder in place)
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Code reading only, not run — found through `docs/account/project-settings.md` (L73: "Edits you make to those two files by hand can be lost"), read against the code. The team's own comment in `permissions_service.dart` (L11-15) says the same: regenerating "wipes everything a brownfield project has".

**What happens.** Nowa builds `android/app/src/main/AndroidManifest.xml`, `ios/Runner/Info.plist`, `android/app/build.gradle.kts` and `ios/Podfile` from fixed templates plus its own settings (permissions, package tokens). Several actions write one of them again as a whole file: the new content replaces the old one, with no merge. A one-time step keeps the permissions that the old files already listed, and nothing else of them.

**Steps to reproduce** (not run)
1. Desktop app: import a Flutter app as **Local-only project** whose `AndroidManifest.xml` has, besides permissions, a `<service>` or an extra `<intent-filter>`, and whose `Info.plist` has a key such as `UIBackgroundModes`. Commit them in Git.
2. Open **Settings** → **Project Details**, change **App Name** and press Enter. (Flipping a switch under **Settings** → **Permissions** does the same.)
3. Look at both files in code mode, or run `git diff`.

Expected: the app label (or the one permission) changes and the rest stays.
Actual (from the code): both files are Nowa's template; the service, the filter and `UIBackgroundModes` are gone.

**Root cause.**
- `changeAppName` writes the `Info.plist` and the manifest templates (`packages/core/lib/src/project/rename.dart:29-38`; the field passes no platform list, `packages/core/lib/src/settings/project_detail_settings.dart:113-116`). `changeBundleId` writes the `build.gradle.kts` template (`rename.dart:56-61`). A permission change calls `_regenerateTemplate` (`packages/core/lib/src/services/permissions_service.dart:80-82`). Adding a package adds its required permissions, rewrites the `Podfile` when it needs a minimum iOS version, and a changed token or a removal writes the affected files (`packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:66-90,111-135,146-158`).
- `FileTemplate.write` is `project.files.set(path, generate(project))` (`packages/core/lib/src/file_system/templates/file_template.dart:87-89`), and `set` assigns the new content (`packages/core/lib/src/file_system/file_system.dart:316-327`). The templates are fixed strings with Nowa's sections spliced in (`packages/core/lib/src/file_system/templates/android/manifest_template.dart:8-69`, `.../ios/info_plist_template.dart:7-60`, `.../android/app_build_gradle_template.dart:5-45`, `.../ios/podfile_template.dart:5-30`).
- The migration that keeps existing permissions reads only `uses-permission` lines and the iOS permission keys Nowa knows (`permissions_service.dart:262-300`).
- Related: a Bundle Identifier change also sets every `PRODUCT_BUNDLE_IDENTIFIER` line of `project.pbxproj` to the new value, including test and extension targets (`rename.dart:117-125`).

**Suggested fix.** Patch instead of replace: parse the existing XML and plist and change only Nowa's elements (the label, the permissions, snippets between `nowa:begin` and `nowa:end` comments), as `changeIosBundleId` already patches single lines. Only write a whole template when the file is missing or still equals the previously generated one. At least, before the first regeneration of a file that differs from its template, ask first ("This replaces AndroidManifest.xml...") and save a copy through the checkpoint service. For the bundle id, change only the lines whose value equals the old identifier. Test: `packages/core/test/` — a manifest with an extra `<service>` keeps it after `PermissionsService.addPermission` and after `changeAppName`.

**Docs impact.** `docs/account/project-settings.md` (L73: name the Gradle file and the `Podfile` too, and the actions that trigger it) and `docs/code/import.md` (a note for imported apps). After a fix, say that hand edits are kept.

Related: M5, M17, P39, P40.

### M22. On the board and in Instant Play, `try` runs its `catch` for any error, ignoring `on Type`, and throws when it has two `catch` clauses

- **Area:** Interpreter, `try` statements (`packages/core/lib/src/interpreter/block_tree.dart`)
- **Severity:** Low — only the board and Instant Play differ (the compiled app runs real Dart); an error that the real app would let through is handled in the preview, and a second `catch` clause fails when something is thrown.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (also in 3.12.5, same code)
- **Confidence:** Code reading only, not run — found through `docs/code/limitations.md` (L64-65: "A `try` with more than one `catch` clause fails with 'Multiple catch clauses are not supported yet' when something is thrown", "The object a `catch` gives you isn't the one that was thrown"), which the two-clause part confirms. The `on Type` part was found while reading the same code and isn't in the docs.

**What happens.** The interpreter that draws the board and runs Instant Play keeps a `catch` clause's `on` type for printing the source and for the parameter's type, but never compares it with the error. With one clause, that clause runs for every error. With two or more, an error raises `UnimplementedError('Multiple catch clauses are not supported yet')`. Code that follows the documented workaround ("use one `catch` and check the type inside") is not affected.

**Steps to reproduce** (not run)
1. In code mode, add this method to a screen's class and save:
   ```dart
   void parse() {
     try {
       int.parse('x');
     } on StateError catch (e) {
       print('caught as StateError');
     }
   }
   ```
2. Leave code mode. In Circuit, call `parse` from a button's **On Pressed**. Press **Play** (Instant Play) and click the button.
3. Add a second clause `on FormatException catch (e) { print('format'); }` after the first one, save, and click the button again.

Expected (real Dart): at step 2 the `FormatException` isn't a `StateError`, so it is not caught; at step 3 it prints `format`.
Actual (from the code): at step 2 it prints `caught as StateError`; at step 3 the click fails with `Multiple catch clauses are not supported yet`.

**Root cause.** `TryStatement.run` and `runAsync` take `catchClauses.first` for any thrown value and never read `exceptionType`; with more than one clause they throw (`packages/core/lib/src/interpreter/block_tree.dart:1855-1876,1881-1895`). `CatchClause.exceptionType` is used only for `source`, `copy` and the parameter type (`:1935-1962`), and `mapScope` binds the raw thrown value to the parameter (`:1954-1956`). The loader reads each clause's type correctly (`packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1464-1473`).

**Suggested fix.** In both `run` methods, walk the clauses in order and run the first whose `exceptionType` is null, dynamic or `Object`, or whose type the thrown value satisfies (the interpreter's `is` check); rethrow when none match. That removes the multiple-clause limit as well. Test: `packages/core/test/interpreter_tests/` — a `try` with two `on` clauses and a thrown `FormatException`; one with a non-matching `on` that must propagate.

**Docs impact.** `docs/code/limitations.md` (L64-65): after the fix, remove the multiple-`catch` item; until then add that `on Type` is ignored.

