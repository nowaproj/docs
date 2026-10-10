# S2: new issues found in the other notes

### M1. Two Google OAuth client secrets and a Google Fonts API key are hard-coded in the shipped client

- **Area:** Google sign-in, Firebase connect and Google Fonts download (`packages/core/lib/src/services`, `packages/core/lib/src/fields`)
- **Severity:** Medium — credentials sit in the source and in every build; what an outsider can do with them depends on the Google client types and the key's restrictions, which the repo can't show (it becomes High if the "web" client is a Web-application client: nothing reads its secret, so it is shipped for no reason).
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

