# W7 writer notes (Preview and test: index, instant-play, run, devices, share, problems)

Paths are relative to `/home/user/nowa-master` (v3.12.5) unless marked "dev". Research files: `_rewrite/research/features-*.md`.
Code wins over research; contradictions are noted per page. Pages are in `/home/user/docs/docs/test/`.

## instant-play.md (`docs/test/instant-play.md`)

Research: `features-designer-core.md` "Play (Instant Play)", "Board items (canvases)", "Placeholder values on the board"; `features-code-ship.md` "Instant Play vs Run", "Share Preview", "Your own code on the board"; `features-data.md:492` (Firebase auth preview dialog), `:586` (placeholders on the board, real data in Play); What's New 3.9 and 3.12.5.

Code spot-checks (all matched the research unless noted):
- Play button: tooltip **Play** / **Stop**, shown while the title is hovered, the item is selected, or it is playing; zooms the board to the item (zoom 0.75): `packages/designer/lib/src/panels/canvas_titles.dart:212,237-261`. Titles exist only for screens and components (`isComponent`): `canvas_titles.dart:31`.
- Right-click **Play**: only when nothing is playing and exactly one widget is selected, played item = board item that holds it: `packages/designer/lib/src/menus/widget_context_menu.dart:34-39`, `packages/designer/lib/src/play_mode/board_play_controller.dart:53-63`, `packages/designer/lib/src/actions/designer_actions.dart:279-296`.
- Selecting another item while playing plays that one: `packages/designer/lib/src/design/designer.dart:35-40`.
- Play controls replace the bottom toolbar: `packages/designer/lib/src/panels/designer_board.dart:137`; labels and the accuracy tooltip text: `packages/designer/lib/src/play_mode/play_mode.dart:481-545`. Orange (primary color) 4 px border: `play_mode.dart:416`.
- Clicks and right-clicks over the playing item go to the app, not the editor; the playing root can't be moved or resized; designer shortcuts off while playing: `packages/designer/lib/src/design_experience/designer_board_controller.dart:66-70,87-91,109,130,214,291,334`, `packages/designer/lib/src/designer_setup.dart:133-136`.
- Play runs in `RunMode.simulate` (interpreted): `play_mode.dart:470-475`.
- **Share preview** shows the sync notice for local projects: `play_mode.dart:44-55` (details on the share page).
- "Run on a simulator/emulator or mobile device to preview" (Google Maps, RevenueCat Paywall) outside designer mode: `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:19-77`, used by `google_maps_package_config.dart:137-147` and `revenuecat_package_config.dart:145`.
- Firebase sign-in is simulated by a dialog (fake user or error): `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:130-160,220`.

Contradiction with research (code wins): `features-designer-core.md` "Placeholder values on the board" says the placeholders also appear "in Play on the board". The code only mocks values in designer mode (`scope.env?.mode != RunMode.designer` returns early at `packages/core/lib/src/interpreter/block_tree.dart:787,3571,5902`), and Play uses `RunMode.simulate` (`play_mode.dart:474`, `packages/core/lib/src/widgets/block_builder.dart:40-48`). The page therefore says the board shows placeholders and Play runs real logic (an empty list stays empty). `features-data.md:586` agrees ("Real data appears in Instant Play").

Left out and why:
- Navigation inside a played screen (GoRouter initial route is set for GoRouter projects, `play_mode.dart:459-464`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:111-150`): not confirmed how links between screens behave on the board, so the page makes no claim.
- No keyboard shortcut and no Esc to stop Play on the board (`features-designer-core.md` open question): not mentioned.
- No "Or ask Nowa AI" tip: the in-app agent has no tool to play the app in 3.12.5 (`play_app` is in no agent toolset, `features-ai.md` Not user-facing).
- "Play bar" (research term) is not a UI label; the page says "play controls".

Capture requests: test-instant-play-1.

## run.md (`docs/test/run.md`)

Research: `features-code-ship.md` "Run button and Run on menu", "Embedded preview (Nowa Run / App Run)", "Add web support", "Console (Problems / Logs)"; `features-ai.md` "Fix with AI / Explain with AI", "What the agent can do"; `features-editor-shell.md` "Top bar", "Status bar", "Console (Problems and Logs)"; What's New 3.8.2, 3.9, 3.10.

Code spot-checks (all matched the research unless noted):
- **Run** split button (main part + caret) and labels **Run** / **Hide**, status-dot tooltips: `lib/project/run/run_button.dart:153-226`, `packages/nowa_ui/lib/src/components/top_bar_button.dart:10-60`; placed left of **Deploy**, replaced by **Save** in playground/guest sessions: `lib/project/top_bar.dart:328-335`.
- **Run on** menu (header is upper-cased by `MenuSectionHeader`, so the UI shows RUN ON; the glossary writes "Run on", the page writes **Run on** and says it is shown as RUN ON): `lib/project/run/menu_widgets.dart:12-26`, `run_button.dart:423-580`; **Embedded preview** row statuses and **Hide**: `run_button.dart:588-625`; web notice "iOS & Android devices" / "Download the desktop app": `run_button.dart:641-660`.
- <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>P</kbd> on the board runs the embedded preview (`PlayInDesignerIntent` -> `RunAppAction`): `packages/designer/lib/src/designer_setup.dart:47,125`, `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-12`; designer shortcuts are off while an item plays or in view-only projects (`designer_setup.dart:133-136`).
- Opening the preview checks blockers, saves, boots if idle: `packages/nowa_run/lib/src/ui/nowa_run_overlay.dart:13-22`. The session boots in the background at project load unless a blocker exists: `packages/nowa_run/lib/src/nowa_run_plugin.dart:22-45`. Each save restarts (or retries after an error): `nowa_run_plugin.dart:60`, `nowa_run_manager.dart:84`.
- Stage messages ("Starting app...", "This may take a few minutes...", **Start App**): `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:74-130`.
- Run toolbar (tooltips **Back to board**, **Phone**/**Tablet**, **Fullscreen**, **Hot Reload**/**Hot Restart**, **Start**/**Stop**, **Open in Browser**/**Open on Mobile**): `packages/nowa_ui/lib/top_bar/top_bar_view.dart:765-861`, `lib/project/top_bar_mapper.dart:127-146`, wiring `lib/project/top_bar.dart:94-98`; default frame is phone: `packages/nowa_run/lib/src/ui/nowa_run_play_mode_controller.dart:8`. Shortcuts <kbd>Shift</kbd>+<kbd>R</kbd> (same action as the restart button) and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>F</kbd>: `packages/nowa_run/lib/src/actions/actions_setup.dart:19-23`.
- "Scan the QR" popup and **Open In Browser**: `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:9-88`. A local run serves on `localhost` only (`--web-hostname localhost`, free port): `packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:17-67`.
- **Add web support** dialog ("Web support is missing" / "Nothing to run", **Close**, "Could not generate the missing files. Check the logs for details."): `packages/core/lib/src/runner/run_preflight.dart:11-119`.
- Error screens and buttons: `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:12-172`; "Restart failed — showing the previous version" card (**Fix with AI** only for cloud projects): `packages/nowa_run/lib/src/ui/nowa_run_play_mode.dart:56-97`.
- **Fix with AI**: opens the Assistant panel, puts the prompt in the chat, sends it if the chat can send, runs in the current mode: `packages/core/lib/src/widgets/fix_with_ai_button.dart:7-56`. Plan mode is read-only: `features-ai.md` "Switch mode".
- Flutter SDK error text: `packages/core/lib/flutter_tool.dart:35-41`; thrown from `startSession` for local runs (`nowa_run_service_local.dart:46-56`) and shown on the "The app preview failed to start" screen because `_fail` classes it as unknown: `nowa_run_manager.dart:422-434`. Inference: the page quotes the message without claiming exactly which screen title it appears under.
- Console / Logs / **Pub get** / **Clear**: `lib/status_bar.dart:163-223`, `packages/core/lib/src/panels/logs_and_errors_panel.dart:5-69`; app and WebView console output is forwarded to the project log: `packages/nowa_run/lib/src/nowa_run_manager.dart:309-339`; a failed device run opens the floating **Log** panel: `run_button.dart:118-120`, `packages/core/lib/src/panels/logs_panel.dart:8-31`.
- Playground / guest: no Nowa Run manager is registered (`nowa_run_plugin.dart:12`), "Save your app to run it": `packages/nowa_run/lib/src/ui/nowa_run_unavailable.dart:21-38`. Both playground and guest register a `SandboxSession` (`packages/core/lib/src/providers/project_provider.dart:955-975`).
- "Or ask Nowa AI" tip: `read_logs` works only after the app was run: `packages/ai/lib/src/tools/analyze_tool.dart:39-60`.

Left out and why:
- <kbd>Esc</kbd>: the overlay's comment says Esc closes it, but `StopAppAction.invoke` is empty (`nowa_run_actions.dart:23-29`). Not documented.
- "Nowa Run is not available for this project" (no run manager outside sandbox): rare, not documented.
- Whether the QR link can be opened by other people (the preview URL is server-provided): not claimed; the page only says to scan it with your phone.
- Semantics of hot reload vs restart beyond the code comment ("A local run reloads in place; a cloud one has to come back up", `lib/project/top_bar_mapper.dart:140-141`).

Open questions:
- Does <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>P</kbd> reach the app in browsers, or does the browser print dialog win? (`features-editor-shell.md` open question, needs a capture session.)
- Time to first start: the UI says "This may take a few minutes..." and the mobile sheet "first start can take a minute"; no number is stated on the page.

Capture requests: test-run-1 (needs-sign-in).

## devices.md (`docs/test/devices.md`)

Research: `features-code-ship.md` "Run on devices and emulators", "Local cache (cloud projects run locally)", "Local Setup / Set up local environment", "Run button and Run on menu"; `features-account-projects.md` "Cloud projects vs Local-only projects", "Desktop app (Nowa Desktop)", "Local Setup"; What's New 3.10 ("Local Run for Cloud Projects").

Code spot-checks (all matched the research unless noted):
- Desktop only: the device list and the cache row are built only when `!kIsWeb`; the web menu shows "iOS & Android devices" / "Download the desktop app" / "Get the Nowa desktop app for macOS or Windows to run this app on real devices and emulators.": `lib/project/run/run_button.dart:459-460,547-560,641-660`. The device-run managers are registered for local projects and for cloud projects (`kLocalRunForCloud = true`): `packages/core/lib/src/plugin.dart:54-64`, `packages/core/lib/src/runner/local_run_config.dart:13`.
- Device list labels ("Looking for devices…", "No devices connected. Plug in a device or set up an emulator." / "...start an emulator below.", "Start an emulator", row statuses), tapping a row starts the run: `lib/local_export.dart:11-200`. Emulator launch selects the new device when it appears: `packages/core/lib/src/runner/local_build_manager.dart:85-100,170-180`. Unplugging the selected device returns the run target to the embedded preview: `run_button.dart:55-69`.
- Button states: device name label, spinner + **Cancel** while building, **Stop** / **Hot restart** (bolt) / **Run target** (caret) while running: `run_button.dart:232-325`. Saving hot reloads the device run (sends `r`), the bolt does a hot restart (`R`): `packages/core/lib/src/plugin.dart:186-199`, `packages/core/lib/src/models/local_build.dart:12-26`, `run_button.dart:124-133,311`. The comment at `plugin.dart:180-185` says themes and other top-level/global state need a hot restart, which the page paraphrases ("for example a theme change").
- Flutter SDK check opens Local Setup: `run_button.dart:99-149`; **Local environment settings** row: `run_button.dart:559-579`. Xcode wording ("Xcode is required to build and run apps on macOS, including iOS."): `packages/core/lib/src/environment/environment_setup_dialog.dart:455-470`.
- Cloud copy: steps "Saving project…", "Packaging project…", "Downloading project…", "Extracting project…", "Setting up platforms…", "Syncing files…": `packages/core/lib/src/runner/cloud_local_run_service.dart:130-138,236-249`; eviction after 14 days: `:60-62`; clear / show in folder / re-download, "Stop the app before clearing", status lines: `run_button.dart:667-759`; "forceFresh" is for rare changes such as a native plugin needing regenerated registration: `cloud_local_run_service.dart:104-112`.
- Device output goes to the project log (Logs tab) and a failed run opens the **Log** panel: `packages/core/lib/src/io_utils.dart:127-142`, `run_button.dart:118-120`.
- Device kinds listed (web, desktop, emulators): `packages/core/lib/src/environment/environment_setup_dialog.dart:632-650`. The page says "a connected phone, a running emulator, a browser or your own computer" and "whatever your Flutter SDK finds"; it does not promise a specific list.

Left out and why:
- USB debugging / "trust this computer" steps: not in Nowa's code, so not stated. The page links Android's emulator guide and Apple's simulator guide (both URLs return 200; the Apple link was in the old simulator page).
- Which platform folders cloud projects get ("Setting up platforms…") and whether Windows/Linux desktop targets work: `features-code-ship.md` open question, not claimed.
- The old claim "only local projects can run on devices" is wrong since 3.10 (corrected).
- Plan/entitlement needed for the desktop app (`lib/router.dart:76-82`): not mentioned here (D3), the desktop-app page owns it.
- iOS device signing and provisioning: nothing in the code, not mentioned.

Open questions:
- Same as `features-code-ship.md`: do Windows/Linux desktop run targets work for projects without those platform folders? Not mentioned.

Capture requests: test-devices-1 (needs-sign-in; also needs the desktop app).

## index.md (`docs/test/index.md`) (batch W7b)

Research: `features-code-ship.md` "Instant Play vs Run", "Embedded preview (Nowa Run / App Run)", "Run button and Run on menu", "Share Preview"; `features-editor-shell.md` "Mobile layout"; the finished pages `instant-play.md`, `run.md`, `devices.md`, `share.md` (their claims are the source for the table cells).

Code spot-checks (all matched):
- Play controls warning tooltip "In board preview is not 100% accurate, run the app to see the real output": `packages/designer/lib/src/play_mode/play_mode.dart:539` (read in this batch, the `NIconButton` with that tooltip next to **Stop**).
- Phone **Play** sheet "Play your app" / "Two ways to see it — pick one:", **Instant preview** (badge SIMULATED, "A design preview that opens instantly. Great for checking layout and flows."), **Run real app** (badge REAL APP, or LIVE once the preview is ready; "...first start can take a minute."): `lib/project/nowago/mobile_view.dart:63-128`.
- Playground shows **Save** instead of **Run**: `lib/project/top_bar.dart:328-335` (W7 note above); the playground has the board and **Play** (reference capture `captures/ui-map/23-instant-play.png`, taken in `/playground`).
- "Firebase sign-in is simulated, maps are placeholders" (table cell "Features that need a phone"): `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:130-160,220`, `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:19-77` (see the instant-play notes).

Left out and why:
- "Shared previews use Instant Play, not Run" (`lib/project/preview_page.dart:15-28`): true per research but not needed in the table, `share.md` says it.
- No "Or ask Nowa AI" tip: the in-app agent can't play or run the app (`play_app` is in no toolset); the tip about logs sits on `run.md`.
- No capture: the comparison table does the job (research says "a side-by-side table rather than a capture").

Coverage notes: none beyond the must-cover list (Instant Play vs Run table, devices, sharing, problems all linked). The phone **Play your app** sheet is an addition (it is the product's own two-option wording of the same comparison).

## problems.md (`docs/test/problems.md`) (batch W7b)

Research: `features-editor-shell.md` "Console (Problems and Logs)", "Problems", "Status bar"; `features-code-ship.md` "Code problems and Fix", "Your own code on the board", "pubspec and dependency rules"; `features-ai.md` "Fix with AI / Explain with AI", "What the agent can do"; `features-designer-core.md` "This screen failed to render". Product doc `docs/interpreter_limitations.md:110-114` ("The Problems panel") for the default scope.

Code spot-checks (all matched the research unless noted):
- Source menu **From Nowa** (hint **Instant**) / **From Code Analysis** (hint **Accurate**), scope menu items **Only @NowaGenerated** / **All files** (tooltip **Which code Nowa checks**), status "Including code Nowa did not generate", **Refresh**, "No issues detected", "Loading packages...", analysis texts ("Checking...", "Checked at <time>", "<n> files changed since last check", "Code check failed", "No issues found", "No check run yet", "No issues match the filter"), severity filter (tooltip **Filter code check results**, **Errors** default), button **Run Code Check**, tooltip **Run code check (flutter analyze)**, rows with message, hint and `line:column · code`, menu **Open File** / **Copy**: `packages/core/lib/src/panels/problems_panel.dart:11-52,104-138,149-302,304-380,411-512,514-574`.
- Row menu **Navigate** / **Copy** and the **Fix** text button (spinner while fixing, red snackbar on failure, refresh afterwards): `packages/core/lib/src/panels/errors_panel.dart:85-197`. **Navigate** opens `problem.filePath` and navigates to the block; a problem without a file path does nothing: `packages/core/lib/src/providers/editor_provider.dart:108-118`.
- Status bar: error count = `ProblemService.errorCount`, warning and info counts = `LoggerProvider` counts; counts open the **Console** on **Problems**, the log line on **Logs**; **Ready** when empty: `lib/status_bar.dart:163-249`, `packages/core/lib/src/providers/logger_provider.dart:55-60`; tabs **Problems** / **Logs**: `packages/core/lib/src/panels/logs_and_errors_panel.dart:5-35`.
- From Nowa updates after block changes (`checkProblems` -> `ProblemService.updateFile`): `packages/core/lib/src/interpreter/block_tree.dart:108-124`. Scope, held back while packages load: `packages/core/lib/src/interpreter/services/problem_service.dart:99-133`. Custom-code gate (one declaration you wrote makes the whole unit custom code, load failures and unconstructable supertypes still reported): `packages/core/lib/src/file_system/dart_file.dart:309-326`, `packages/core/lib/src/interpreter/block_tree.dart:6828`.
- Quick fixes: packages (`'<pkg>' is imported but is not in the pubspec.` with Fix, dev-dependency and failed-to-load without): `packages/core/lib/src/interpreter/packages/package_service.dart:372-421`; setup statements and permissions: `packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:380-434`; main file (**Reset main file** dialog, "By resetting the main file, you get a new main file with the default setup.", **Reset**, **Cancel**; "Main file is not found" is an info-level problem, "Main function is not found" and "No Home screen Selected, ..." are errors): `packages/core/lib/src/project/env_services/main_problems_finder.dart:5-61`; `The function '<name>' isn't defined.` with Fix when a supported package defines the name, and the **Fix Ambiguous Import** dialog (**Select which import to keep visible:**, **Apply Fix**): `packages/core/lib/src/interpreter/block_problems.dart:247-275,389-397`, `packages/core/lib/src/dialogs/fix_ambiguous_import_problem_dialog.dart:24-110`; router messages: `packages/core/lib/src/editors/router_editor/router_problems.dart:20-107`; Firebase mismatch (**Navigate** opens Firebase settings): `packages/data/lib/src/firebase/firebase_plugin.dart:92-118`.
- Code check: cloud posts `/projects/analyze` to Nowa's servers, local runs `flutter analyze` with the Flutter SDK (needs the path, error "Flutter SDK path is not set. Please configure it in the settings."): `packages/core/lib/src/services/flutter_service.dart:20-114`, `packages/core/lib/flutter_tool.dart:34-41,182-185`; `runCodeCheck` does not save first: `problems_panel.dart:12-18`.
- Skipped code and **Kept as code**: a class that can't be turned into blocks falls back to a custom class with the reason (`packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:540-600`), shown in **Details** as **Kept as code** (`packages/designer/lib/src/details/widget_details.dart:115-143,175-182,531-556`); a declaration that can't be read at all is listed as `'<name>' could not be loaded: <reason>` (`ast_to_block_visitor.dart:100-110,150-205`, `dart_file.dart:309-326`); a file with parse errors lists the parser messages (`dart_file.dart:309-312`). The research folded these two into one ("could not be loaded" + **Kept as code**); the code has two separate paths, so the page separates them.
- **Fix with AI**: puts the prompt in the chat, focuses it, sends only if the chat can send, closes the settings overlay, opens the Assistant panel only from the preview: `packages/core/lib/src/widgets/fix_with_ai_button.dart:7-56`. Call sites: `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:100`, `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:343`, `.../publishing_error.dart:93`, `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:488` (the **Explain with AI** label is in the research, `features-ai.md` "Fix with AI / Explain with AI", `current_build_card.dart:405-413,486-491`).
- "Or ask Nowa AI": the `analyze` tool ("the problems Nowa detects instantly — the same list as the Errors panel — plus any web build errors", or `flutter analyze`) is in the Agent and Design toolsets: `packages/ai/lib/src/tools/analyze_tool.dart:6-60`, `packages/ai/lib/src/agent/agent.dart:123-163`, `packages/ai/lib/src/agent/designer_agent.dart:38-69`. The tip says Agent mode.

Left out and why:
- Block-level type checks (`block_problems.dart`: argument type, undefined named parameter, missing required argument, null checks, ...) and their exact texts: dozens of messages, no Fix; the page names one example. The `Missing permission: <key>` block problem (Fix turns the permission on; it shows the permission key, not a friendly name) is not in the table, the PackageConfig permission message covers the same fix.
- Mobile layout status pill and **Navigate** on mobile (a copy button replaces the menu): covered by `get-started/mobile.md`.
- Problem popup "Navigate to Code": commented out in code.
- Log text colors and the floating **Log** panel (device-run failures): in `run.md`.

Assumptions and open questions:
- "The check reads your saved files": inferred, not stated in code (`runCodeCheck` does not save first; local `flutter analyze` reads the disk; the cloud check analyzes the server's copy). Verifier: confirm or drop the sentence.
- "Try another version under Settings -> Packages" for a package that failed to load: advice based on `PackageService.updatePackageVersion` re-importing the package (`package_service.dart:306-330`); whether it fixes a given failure depends on the reason text (server/analyzer dependent).
- What **Navigate** shows depends on the editor (board item vs code tab): the page says "opens the file and selects the spot".
- Is **From Code Analysis** usable in the playground (the cloud service needs a project id)? Not tested; the capture request avoids it.

Coverage notes: every must-cover item is on the page (status-bar counts, **Problems** / **Logs**, **From Nowa** with **All files** / **Only @NowaGenerated** / **Refresh**, **From Code Analysis** with the severity filter, **Navigate** / **Copy**, **Fix** quick fixes, skipped code, package problems, **Fix with AI** / **Explain with AI**). Added: the **Fix Ambiguous Import** and **Reset main file** dialogs, Router and Firebase problem messages, a "When Problems is empty" section.

Capture requests: test-problems-1, test-problems-2.
