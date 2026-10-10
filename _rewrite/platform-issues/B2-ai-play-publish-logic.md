# B2: AI, play and preview, publish, logic

### P8. Set up on the iOS row of the Deploy menu opens the Android tab

- **Area:** Deploy menu and Deployment settings (`lib/project/run/`, `packages/core/lib/src/settings/`)
- **Severity:** Low — you land on the wrong tab and have to click **iOS**; nothing is lost.
- **Where:** both; cloud projects (needs a plan with cloud builds, otherwise the mobile rows show **Premium**; the **Deploy** button is hidden for local projects)
- **Status:** Present in 3.13.0 and dev. Correction: refs are now `lib/project/run/deploy_button.dart:220,286`; **Set up** on the **Android Debug** row has the same call and also ignores the debug/release choice.
- **Confidence:** Confirmed in code — the button is a bare tear-off of `_openSettings`; steps not run in 3.13.0 (the capture account is on Starter, where the mobile rows show **Premium**, not **Set up**).

**What happens.** In the **Deploy** menu, the **Set up** button on the **iOS** row opens **Settings** → **Deployment** on the **Android** tab. Clicking the row's name or status opens the iOS tab correctly.

**Steps to reproduce**
1. Sign in on a plan with cloud builds and open a cloud project with no iOS credentials saved (any new project).
2. Click **Deploy** in the top bar. The **iOS** row shows **Set up**.
3. Click **Set up** on the **iOS** row (the button on the right, not the row).

Expected: the **Deployment** page opens on the **iOS** tab.
Actual: it opens on the **Android** tab.

**Root cause.** The button is built as `MenuTextButton(onPressed: _openSettings, label: 'Set up')` (`lib/project/run/deploy_button.dart:286`), so `_openSettings([String tab = DeploymentSettings.tabAndroid])` runs with its default (`:220-225`). The row's own tap goes through `_openWorkflow(m.workflow)` (`:296-298`, `:205-212`), which picks the iOS tab and sets `DeploymentSettings.requestedAndroidDebug` for the Android rows (`packages/core/lib/src/settings/deployment_settings.dart:25,172`). The button skips both, so **Set up** on **Android Debug** opens whichever Android variant the tab was last on (release on first open). `_deployMobile` has the same bare call (`:175`) but is only reached if the row changed after it was drawn.

**Suggested fix.** Use the row's handler: `onPressed: () => _openWorkflow(m.workflow)` at `:286` and `_openWorkflow(m.workflow)` at `:175`. Leave **Advanced build settings** (`:255`) on the Android default. Add `test/deploy_menu_test.dart` (new) that taps **Set up** on the iOS row and expects `DeploymentSettings.requestedTab.value == DeploymentSettings.tabIos`. Same menu, not in the log: the comment on `_deployMobile` says it checks the weekly build quota (`:168-173`) but the code doesn't (the plan lock is applied earlier, on the row); the quota check exists only in the Deployment page's **Build** button (`packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:358-368`).

**Docs impact.** `docs/publish/index.md:55` says **Set up** "opens the **Deployment** page, where you pick the tab you need"; after the fix say it opens the tab of that row. `docs/publish/ios.md:64` and `docs/publish/android.md:62` need no change.

### P9. Code download spinner never stops in the web app

- **Area:** Code download (`lib/project/download_code_button.dart`)
- **Severity:** Low — the file downloads, but the row then looks busy and ignores clicks until the popup is reopened.
- **Where:** web app; cloud projects
- **Status:** Present in 3.13.0 and dev. Correction: the desktop app gets the same stuck spinner when the download request or the save step throws (no `try`/`finally`).
- **Confidence:** Confirmed in code — steps not run (the capture account's plan stops at **Compress Project**, which opens **Time to level up**).

**What happens.** In the web app, clicking the zip in the **Code download** popup starts the browser download. The row's download icon is then replaced by a spinner that never goes away, and the row stops reacting until you close and reopen the popup.

**Steps to reproduce**
1. In the web app, open a cloud project and click `<>` (code mode).
2. In the tab bar, click the download icon (**Code download**).
3. If the list says "Compress your project to download it", click **Compress Project** and wait for the zip row to appear.
4. Click the zip row.

Expected: the browser downloads the zip and the row's icon goes back to the download arrow.
Actual: the browser downloads the zip, but the row keeps a spinner and ignores further clicks until the popup is closed and opened again.

**Root cause.** `_downloadProject` sets `_downloading = true`, and on web returns right after `launchUrl` without clearing it (`lib/project/download_code_button.dart:110-117`); the reset at `:122` is only reached on the desktop path. The row disables itself on that flag and swaps its icon for a spinner (`:205,210-212`). The desktop path has no `try`/`finally` either: if `directProjectDownload` throws (HTTP error, `packages/core/lib/src/services/project_service.dart:156-160`) the spinner sticks and nothing tells the user.

**Suggested fix.** Wrap the body of `_downloadProject` in `try` / `catch` / `finally`: show the error in a snackbar as `_compressProject` does (`:100-104`) and always `if (mounted) setState(() => _downloading = false)` in `finally`. Add a widget test for the popup (new, `test/`); a VM test can't take the `kIsWeb` branch, so inject the launcher or run it with `--platform chrome`.

**Docs impact.** None. `docs/publish/download-code.md:21` only says the browser downloads the file.

### P10. Attach text file does nothing in the web app

- **Area:** AI chat, **Add context** (`packages/ai/`, `packages/core/lib/src/utils.dart`)
- **Severity:** Medium — an AI input the docs describe silently fails in the web app; pasting the text into the prompt works around it.
- **Where:** web app; both project types
- **Status:** Present in 3.13.0 and dev. Correction: in a browser a non-empty picked file does have a `path` (a blob URL), so the failure is `File(path)` throwing, not a null-path filter; the result for the user is the same.
- **Confidence:** Confirmed in code and package sources (file_picker 10.3.10 web, Dart SDK 3.12.2 `dart:io` web patch); steps not run in a browser.

**What happens.** In the web build, **Attach text file** opens the browser's file dialog, but after you pick a file nothing is attached and no message appears. The code does throw an exception, but nothing catches it, so for the user it is a silent no-op. **Attach image** works on the web because it reads the file's bytes; the text-file path opens the file with `dart:io` instead.

**Steps to reproduce**
1. In the web app, open a signed-in project and the **AI Assistant** panel.
2. In the chat field click **+** (**Add context**). If **Attach text file** shows a lock, change the thinking level (its tooltip says "Try enabling thinking mode").
3. Click **Attach text file** and pick a small, non-empty `.txt` file in the browser dialog.

Expected: a chip with the file's name appears in the chat field, as it does after **Attach image**.
Actual: the palette closes, the dialog closes and nothing is attached. No snackbar.

**Root cause.** `AiPromptController.attachTextFile` keeps files with `file.path != null` and calls `isProbablyText(file)` for each (`packages/ai/lib/src/prompt_controller.dart:225-233`). That function opens the picked file with `dart:io`:
```dart
final file = File(picked.path!);
final totalBytes = await file.length();
```
(`packages/core/lib/src/utils.dart:359-360`). In file_picker 10.3.10 on web, `path` is a blob URL whenever the file has bytes (`lib/_internal/file_picker_web.dart:93-106,141`), so the filter passes; empty files are dropped silently. `File.length()` then reaches `dart:io`'s web stub, which throws `UnsupportedError('_Namespace')` (Dart SDK 3.12.2, the version CI builds with: `lib/_internal/js_runtime/lib/io_patch.dart:200-215`, `lib/io/file_impl.dart:277-280`; the web build is dart2js, `.github/workflows/web-build.yml:24,38`). `Future.wait` fails, so `attachments.addAll` and `notifyListeners` never run (`prompt_controller.dart:225-236`). The menu calls it fire-and-forget: `controller.attachTextFile(); context.read<PanelProvider>().hideOverlay();` (`packages/ai/lib/src/ui/attachement_menu.dart:62-65`), whereas **Attach image** chains `.onError(... showSnackbarError ...)` (`:46-48`). So the error is unhandled; while a board canvas is mounted, `CanvasErrorBoundary` replaces `PlatformDispatcher.onError` and logs such errors as "Canvas error" (`packages/designer/lib/src/error_boundary.dart:53-59,106`), so expect that in the status bar and possibly a canvas remount (not run). The bytes are already loaded (`withData: true`) and used for the attachment itself (`prompt_controller.dart:229`).

**Suggested fix.** Make `isProbablyText` work on `picked.bytes` (probe the first 4096 bytes, return false if `bytes == null`) so it needs no `dart:io`, and filter on `file.bytes != null` instead of `file.path != null` (`prompt_controller.dart:226`). In `attachement_menu.dart:62-65` hide the overlay first and handle failure the way **Attach image** does. Report files skipped as not text (today a binary pick is dropped silently on desktop too), and catch `FormatException` from the strict `binaryToText` on the whole file (`prompt_controller.dart:229`). Tests: new `packages/core/test/utils_test.dart` for `isProbablyText` with a `PlatformFile` that has bytes and no path; a case for `attachTextFile` in `packages/ai/test/`.

**Docs impact.** `docs/ai/context.md:24,37` (**Attach text file**, "Other files are skipped") make no platform claim. Until the fix, add "desktop app only"; after it, mention that skipped files are reported if that lands.

### P11. Restore Checkpoint dialog says "last request" but undoes every later request

- **Area:** AI checkpoints (`packages/ai/lib/src/checkpoints/`, `packages/ai/lib/src/ui/content_views.dart`)
- **Severity:** Medium — a destructive restore is described as smaller than it is, and it can overwrite your own edits in files the dialog doesn't list.
- **Where:** both; cloud and local projects (no checkpoints in the playground or for guests, `packages/ai/lib/src/ai_plugin.dart:19-21`)
- **Status:** Present in 3.13.0 and dev. Correction: the dialog is wrong in two more ways: its file list holds only the clicked request's files, and "remove your last request" is untrue (every chat message stays).
- **Confidence:** Confirmed in code — dialog text, file list and chain restore traced; chain restore also has a unit test (`packages/ai/test/checkpoints_test.dart:289-320`); dialog not run (it needs real AI requests, and the capture runs used up their prompt budget).

**What happens.** **Restore Checkpoint** on any request opens a dialog titled **Undo Last Request?** that says "This will remove your last request and undo edits to the following files:" and lists that request's files. **Continue** puts back the files of that request and of every later request in the session (and deletes files they created). The chat keeps all messages, and the restored ones now offer **Reapply Checkpoint**.

**Steps to reproduce**
1. Open the **AI Assistant** in **Agent** mode and send three requests that each change code (for example, one new screen per request).
2. Hover the dotted checkpoint line above the reply to the first request and click **Restore Checkpoint**.
3. Read the dialog, then click **Continue**.

Expected: the dialog says this request and the two after it will be undone, lists every affected file, and doesn't claim a request is removed.
Actual: it is titled **Undo Last Request?** and lists only the first request's files; **Continue** also reverts requests 2 and 3, deletes the files they created, and leaves all three messages in the chat.

**Root cause.** The strings are fixed (`packages/ai/lib/src/checkpoints/checkpoint_warning.dart:40,44-48`). The list comes from the clicked checkpoint only: `CheckpointWarningDialog(files: checkpoint!.changes.keys.toList())` (`packages/ai/lib/src/ui/content_views.dart:150`). The restore is `restoreCheckpointChain` (`content_views.dart:155` → `packages/ai/lib/src/checkpoints/checkpoint_manager.dart:11-17` → `packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-273`): it takes every checkpoint of the session with `index >= clicked.index` (`:249-251`), merges them to each file's earliest "before" state (`:311-331`), writes or deletes files (`:359-383`) and marks them restored. Nothing is removed from the chat.

**Suggested fix.** Text and list only. In `checkpoint_warning.dart` say what happens ("This undoes this request and every request after it in this chat and puts these files back. Your messages stay; **Reapply Checkpoint** brings the changes back."), or keep "Undo Last Request?" only when the clicked checkpoint is the last. Build the file list from all checkpoints with `index >= clicked.index` (`CheckpointService.getAllCheckpoints(sessionId)`, `checkpoint_service.dart:396-402`) instead of `checkpoint!.changes`. Watch out: your own edits to those files are overwritten, and **Reapply Checkpoint** returns only the AI's version. Test: extend `packages/ai/test/checkpoints_test.dart` with a case that the affected-files list for checkpoint 0 of 3 holds all three files.

**Docs impact.** `docs/ai/undo-and-history.md:18,23` quote the dialog (title, line, and the alt text of the `ai-undo-2` screenshot); update them and re-take the shot. The chain warning at `:13` stays true.

### P12. Auto-approve tools can only be reached from the Figma menu

- **Area:** AI connectors (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart`)
- **Severity:** Medium — Supabase-only users must connect Figma to reach a switch that also decides whether Supabase backend changes run without asking.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev. Correction: the Figma menu only opens once Figma is connected; clicking the Figma icon while it is off starts the Figma sign-in.
- **Confidence:** Confirmed in code — steps not run (needs connected Supabase and Figma accounts, which the capture account doesn't have).

**What happens.** The only **Auto-approve tools** switch is an item in the Figma icon's menu. It sets one flag per project that skips the **Approval Required** cards for every connector, Supabase included. The Supabase icon's menu has no such item.

**Steps to reproduce**
1. Open a cloud project and the **AI Assistant** panel. In the chat field click the Supabase icon (tooltip **Enable MCP**) and finish connecting, then click it again (tooltip **Manage MCP**). The menu shows **Connected: <project ref>**, **Switch project…**, **Turn off MCP**.
2. Click the Figma icon (tooltip **Enable MCP**) and finish the Figma sign-in. Click the Figma icon again.

Expected: **Auto-approve tools** is reachable from the Supabase menu, or from somewhere that doesn't depend on Figma.
Actual: only the Figma menu shows it (**Connected**, **Auto-approve tools**, **Turn off MCP**).

**Root cause.** `McpMenu` draws the item only when `onAutoApproveTools != null` (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:478-534`), and only `FigmaMcpButton` passes it (`:410-420`). `SupabaseMcpMenu` is a separate widget with **Switch project…** and **Turn off MCP** and no such parameter (`:550-612`; opened from `SupabaseMcpButton`, `:447-452`). The flag is `AiOptions.autoApproveMcp`, saved per project as `ai_auto_approve_mcp_<project id>` (`packages/ai/lib/src/assistant_options_manager.dart:56-61,103`) and applied to every MCP approval request (`packages/ai/lib/src/agent/agent_runner.dart:136-149`), so it covers Supabase too. The approval card itself only has **Deny** and **Approve** (`packages/ai/lib/src/ui/content_views.dart:1088-1112`). The Figma icon is always shown: `FigmaIntegration.enabled` is `true` and never changed (`packages/core/lib/src/figma/figma_oauth_manager.dart:6`).

**Suggested fix.** Give `SupabaseMcpMenu` the same item: add `autoApprove` and `onAutoApproveTools` parameters, pass them from `SupabaseMcpButton` the way `FigmaMcpButton` does (`:414-419`), and render the tile from one shared widget. Since the flag is global to connectors, say so in the label (for example "Auto-approve tools (all connectors)") and keep in mind it also approves Supabase tables, policies and functions. Test: widget test in `packages/ai/test/` (pattern: `usage_row_layout_test.dart`) that opens `SupabaseMcpMenu` and expects the tile.

**Docs impact.** `docs/ai/connectors.md:63,80,85` say the switch lives in the Figma menu; `docs/guides/ai-tips.md:65` and `docs/integrations/supabase/backend.md:65` point to the Figma icon. After the fix, say it is in either menu. `docs/new/whats-new.md:62` is history; leave it.

### P15. Event link menu hides your own functions that return nothing

- **Area:** Link menu (`packages/core/lib/src/fields/`)
- **Severity:** Medium — you can't pick a normal (void) function from an event's name; the documented workaround is to add a node in the event's circuit.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (refs unchanged).
- **Confidence:** Confirmed in code — filter and its inputs traced; steps not run.

**What happens.** Click an event's name in **Details** (for example **On Pressed**), open **LOCALS**, and a function you wrote with return type `void` isn't listed. Functions with a return value are listed.

**Steps to reproduce**
1. Select a screen, open the **Variables** panel, hover **Functions**, click **+** (then **Add Function** if a menu opens), name the function `saveItem` and press **Enter**. Leave **Return Type** as `void`.
2. Select a **Button** on that screen. In **Details**, click the name **On Pressed** (not the **Edit** button).
3. In the **Link On Pressed** menu, open **LOCALS**, or type `saveItem` in the search.

Expected: `saveItem` is listed, and picking it makes the button run it.
Actual: `saveItem` isn't there. Give it a non-void **Return Type** and it appears.

**Root cause.** `LinkMenu` drops void suggestions whenever the field has an expected type (`packages/core/lib/src/fields/link_menu.dart:90-93,176`):
```dart
bool _typeFilter(Suggestion suggestion) {
  if (widget.expectedType == null) return true;
  return !suggestion.type.isVoid;
}
```
An event's expected type is its function type (`packages/core/lib/src/fields/field_link_menu.dart:331`), and a function suggestion's type is its return type (`packages/core/lib/src/interpreter/suggestion.dart:109-118`), so every `void` function is filtered out. The rest of the flow does expect functions here: `_transformExpr` turns a picked function call into a tear-off for function-typed fields (`field_link_menu.dart:153-155`).

**Suggested fix.** In `_typeFilter`, skip the void rule when the expected type is a `FunctionType` (at least for function declarations: `suggestion is DeclSuggestion && suggestion.declaration is FunctionDecl`). Also check what happens after the pick: `isTypeMissMatch` compares the function's return type with the field's function type (`link_menu.dart:158`), so the menu probably continues to a "members" level instead of closing (`field_link_menu.dart:175-179`); treat a function declaration as a match for a `FunctionType` target there too. Move the filter into a top-level function so it can be unit-tested in `packages/core/test/interpreter_tests/suggestion_test.dart`.

**Docs impact.** `docs/logic/events.md:51` gives the workaround (open the event in Circuit, add a node, pick the function under **LOCALS**). After the fix, also say you can pick it from the event's name. `docs/logic/functions.md:36` stays true.

### P16. A real .p12 can't be saved as the iOS certificate key

- **Area:** iOS deployment, Distribution Certificate (`packages/core/lib/src/cloud_build_v2/ui/`)
- **Severity:** Medium — the recommended "reuse an existing certificate" path fails with no readable reason for a real `.p12`; **Generate** or a text key works around it.
- **Where:** both; cloud projects (plan with cloud builds)
- **Status:** Present in 3.13.0 and dev (the 3.12.5 to 3.13.0 changes in these files are restyles only). Correction: not "can fail": every real binary `.p12` fails, and the cause is never shown.
- **Confidence:** Confirmed in code; a `.p12` made with OpenSSL starts with bytes `30 82` and fails strict UTF-8 decoding in Python, the same rule as Dart's default; not run in the app (needs an iOS-capable plan).

**What happens.** In the **Distribution Certificate** card, **Browse** filters to `.p12` files, but **Save** reads the file as UTF-8 text. A real PKCS#12 file is binary, so decoding throws, nothing is saved, and the card shows only a red error icon. **Download Certificate** writes the stored text under the name `ios_distribution_certificate_key.p12`, so the `.p12` name doesn't match what the code treats as the key.

**Steps to reproduce**
1. Open a cloud project on a plan with mobile builds, then **Settings** → **Deployment** → **iOS**.
2. In **Distribution Certificate** (warning icon, hover reads "Missing distribution certificate"), click **Browse** next to **Certificate Private Key** and pick a real `.p12` (for example one exported from Keychain Access).
3. Click **Save**.

Expected: the key is saved ("Distribution certificate saved"), or a message says the file isn't a supported key and what to use instead.
Actual: nothing is saved. The header shows a red error icon and a refresh icon; hovering the icon reads "Failed to load or save certificate info". The decoding error isn't shown.

**Root cause.** `uploadIosDistributionCert` does `final key = binaryToText(keyFile.bytes!);` (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:425`). `binaryToText` is a strict `utf8.decode` (`packages/core/lib/src/file_system/encoding.dart:8-10`), so binary input throws `FormatException`. The method sets `VariablesState.error` and rethrows (`workflow_manager.dart:434-436`); the **Save** handler doesn't catch (`packages/core/lib/src/cloud_build_v2/ui/ios_details.dart:166-169`), so the exception is unhandled and the card shows only the generic indicator (`ios_details.dart:67-72`). The picker is limited to `["p12"]` and is read-only (`ios_details.dart:151-156`), so a PEM key named `.pem` or `.key` is not offered and can't be pasted; the App Store Connect field next to it takes `["p8", "pem"]` and is editable (`:310-318`). `downloadIosKey` writes the variable's text to `ios_distribution_certificate_key.p12` (`workflow_manager.dart:449-455`). The variable reaches the build through the `ios_credentials` group (`packages/core/lib/src/file_system/codemagic_file.dart:90,104`); what format the build server accepts isn't visible in this repo.

**Suggested fix.** Settle the format (the code treats it as text, so PEM) and make the UI say so. In `uploadIosDistributionCert` catch `FormatException` and throw a readable message ("This file isn't a text private key (PEM). Export the key as PEM or use Generate."), shown in a snackbar or the card. Offer `pem` and `key` in the picker and make the field editable, as the App Store Connect field is; name the downloaded file after what it holds. Confirm the expected format with the backend first (`generate-ios-key` and `variables/ios_credentials`). Test: in `packages/core/test/cloud_build_v2/workflow_manager_test.dart` (it already builds a `WorkflowManager` with `MockCloudBuildServiceV2`) upload a `PlatformFile` with bytes `[0x30, 0x82, 0x09, 0xcf]` and expect a handled error and no `CERTIFICATE_PRIVATE_KEY` variable.

**Docs impact.** `docs/publish/ios.md:45,49-54` (the picker "lists `.p12` files", the download name, "Nowa reads this file as plain text"): update to the final format and file names.

### P17. A custom domain that is still pending can't be removed

- **Area:** Web deployment, Custom Domain (`packages/core/lib/src/web_deploy/`)
- **Severity:** Medium — a mistyped domain stays stuck in the UI, because DNS for it never verifies; paid feature, few users.
- **Where:** both; cloud projects (a plan with custom domains), Production site only
- **Status:** Present in 3.13.0 and dev (the 3.13 diff only restyles the button), assuming the server reports `dnsSetupNeeded: true` while DNS records are pending.
- **Confidence:** Code reading only, not run — the pending state comes from server data (`DomainStatus`), no server code is in the repo, and nobody has run a custom domain (needs a paid plan, a published site and a real domain).

**What happens.** After you click **Set** on a domain, the button becomes **DNS** and the domain stays "pending" until its DNS records verify. In that state the trash icon (**Remove custom domain**) is missing, so you can neither remove the domain nor set a different one. The icon only shows once verification has finished.

**Steps to reproduce**
1. On a plan with custom domains, publish the site (**Deploy** → **Web** row → **Deploy**), then open **Settings** → **Deployment** → **Web**.
2. In **Custom Domain** type a domain with a typo (for example `exmaple.com`) and click **Set**. The button now reads **DNS**.
3. Look for a way to remove or change it. There is no trash icon; **DNS** only opens **DNS Records** (**Pending**, **Verify**, the records table). Toggle **Also www.**: the snackbar says "...Please remove the current custom domain to change this setting."

Expected: a remove action while the domain is pending.
Actual: none. The message tells you to remove the domain, but no control does.

**Root cause.** The trash icon is the field's `suffix` and is built only when `isCustomDomainSet` (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:87-101`), which is `_domainStatus != null && !_domainStatus!.dnsSetupNeeded` (`packages/core/lib/src/web_deploy/web_environment_manager.dart:66`). While pending, the status carries DNS records (`isDnsRecordsActive`, `:64`) and presumably `dnsSetupNeeded == true`, so the icon is hidden, the button reads **DNS** and opens `DnsRecordsView` (`custom_domain_section.dart:149-156`), and **Set** can't be pressed again. The field stays editable (`readOnly` also depends on `isCustomDomainSet`, `:134`), but nothing submits it. `DnsRecordsView` only has **Verify** (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/dns_records.dart:129-147`). The **Also www.** snackbar fires in this state (`custom_domain_section.dart:200-205`). `removeCustomDomain` has no status check (`web_environment_manager.dart:233-248`), so the UI is the only gate.

**Suggested fix.** Show the trash icon, and make the field read-only, whenever a domain exists in any state: add `bool get hasCustomDomain => _domainStatus != null;` to `WebEnvironmentManager` and use it at `custom_domain_section.dart:73,87,134` (keep `isCustomDomainSet` for the **Set** button). Optionally add a remove button to `DnsRecordsView`. Watch out: `removeCustomDomain().then((_) => customDomainController.text = "")` (`:97-99`) clears the field even when removal failed, because `removeCustomDomain` swallows its error into `customDomainError` (`web_environment_manager.dart:239-243`); check that first. Confirm with the backend that deleting a pending domain works (`packages/core/lib/src/web_deploy/web_deploy_service.dart:192-195`). Test: a widget test for `CustomDomainSection` with a fake `WebDeployService` returning `DomainStatus(dnsSetupNeeded: true, dnsRecords: [...])`; there are no web-deploy tests under `packages/core/test/` yet.

**Docs impact.** `docs/publish/web.md:69` says the trash icon is how you start again "once your domain is set"; after the fix, say it also works while the domain is pending.

### P18. The route parameter Default value field saves nothing

- **Area:** Route Settings in Details (`packages/designer/lib/src/details/route_details.dart`, `packages/core/lib/src/project/env_services/go_router_routing_service.dart`)
- **Severity:** Medium — a field that looks editable discards what you type, and a docs page tells readers to use it.
- **Where:** both; both (projects that use GoRouter)
- **Status:** Present in 3.13.0 and dev. Correction: besides the missing handler, the routing service has no method that writes a default, and `docs/design/screens.md:56` now promises the field.
- **Confidence:** Confirmed in code — steps not run.

**What happens.** In **Details** → **Route Settings** → **Route Parameters**, each parameter row has a **Default value** field. Typing into it changes nothing in the project: the value isn't saved and the field is empty again the next time the screen is selected.

**Steps to reproduce**
1. Select a screen in a project that uses GoRouter (the default). In **Details** → **Route Settings**, type a **Path** such as `/item` if the field is empty and press **Enter**.
2. Expand **Route Parameters**, hover the row and click **+** (**Add Route Parameter**). A row named `param1` appears and the path becomes `/item/:param1`.
3. Type `42` into the row's right-hand text field (its placeholder reads `null`) and press **Enter** or click elsewhere.
4. Select another screen, then this one again; or open `lib/globals/router.dart` in code mode.

Expected: the field still shows `42`, and the route's builder reads `state.pathParameters['param1'] ?? <the default>`.
Actual: the field is empty again and the builder has no `??`.

**Root cause.** The field is built with no handler (`packages/designer/lib/src/details/route_details.dart:196-201`):
```dart
StringField(
  value: (param.defaultValue as ValueBlock?)?.value,
  hint: "Default value",
),
```
`StringField` reports edits only through its optional callbacks `onEditingComplete` (on blur), `onUpdate` (on change) and `onFieldSubmitted` (`packages/core/lib/src/fields/nowa_fields.dart:69-77,123,130`); all three are null here. There is also nothing to call: `RouteParameter.defaultValue` is a read-only getter over the builder's `?? default` (`packages/core/lib/src/project/env_services/go_router_routing_service.dart:360-367`), and `_buildRouteParamDecl(name, defaultValue)` is the only code that writes one, but every caller passes `null` (`:230,247,264`). Not run, in the same service: those calls rebuild the whole route builder (`addRouteParameter` with only the new parameter, `renameRouteParameter` and `removeRouteParameter` with every name but no defaults), so each probably also drops a default or a link to a screen param that was written in that builder. The `as ValueBlock?` cast would throw for a default that isn't a literal (for example `?? kDefault` written in code mode), and the placeholder reads `null` instead of "Default value" while no default exists (`nowa_fields.dart:110`).

**Suggested fix.** Add `GoRouterAppRoutingService.setRouteParameterDefault(path, paramName, String? value)` that edits the existing `final x = state.pathParameters['x']` initializer in place (wrap it in `?? ValueBlock(value)`, or unwrap when the value is empty) instead of rebuilding the builder, and call it from `onEditingComplete` at `route_details.dart:196-201`. Replace the `as ValueBlock?` cast with an `is` check. Make add, rename and remove edit in place too, so they stop wiping defaults and links. Test: a new test in `packages/core/test/` that drives `GoRouterAppRoutingService` on an in-memory router file (see `packages/core/test/interpreter_tests/` for how files are loaded).

**Docs impact.** `docs/design/screens.md:56` step 3 says "set a **Default value** if you like". Until the fix, drop that clause; after it, keep it and say when the default is used once the team confirms.

### P44. Single Screen Preview warning shows on shared links even when the screen has a route

- **Area:** Shared preview, play warnings (`packages/designer/lib/src/play_mode/`, `lib/project/preview_page.dart`)
- **Severity:** Low — a misleading warning card for the project's owners and editors; nothing breaks.
- **Where:** web app (the preview page, window at least 840 px wide); cloud projects
- **Status:** Present in 3.13.0 and dev. Correction: only owners and editors see these cards (`PlayModePermissions.isInviter`), not every viewer of the link, and not on phone-sized windows.
- **Confidence:** Confirmed in code — provider tree and warning logic traced; steps not run.

**What happens.** When an owner or editor opens a shared `?screen=` preview link, the warnings stack shows **Single Screen Preview** ("Route-based navigation is disabled in Play Mode for single screen previews...") even when that screen has a route and navigation works. On the board the same card appears only for screens without a route.

**Steps to reproduce**
1. Signed in as owner or editor of a cloud project that uses GoRouter, pick a screen that has a route (for example the home screen; **Route Settings** shows its **Path**).
2. Hover the screen's title bar and click the play button. In the play controls click **Share preview** and copy the link; it ends `?screen=lib/pages/....dart`.
3. Open the link in a new browser tab, same account, with the window at least 840 px wide.

Expected: no **Single Screen Preview** card, because the screen has a route.
Actual: the warnings button and cards appear at the top left, including **Single Screen Preview**.

**Root cause.** `PlayMode` shows `PlayModeWarnings(fromSelection: ...)` to owners and editors (`packages/designer/lib/src/play_mode/play_mode.dart:201-204`; `packages/designer/lib/src/play_mode/play_mode_permissions.dart:6`). A `?screen=` link makes `PlayModeLoader` set `fromSelection` (`play_mode.dart:339,383`). `_loadWarnings` finds the screen through the editor's `Designer`: `context.read<Designer?>()?.playController`, then `hasRoute = routerFileService?.getPath(screenClass) != null` (`packages/designer/lib/src/play_mode/play_mode_warning.dart:38-49`). The preview page has no `Designer`: `PreviewPage` → `ProjectLoader` → `ProjectSetup` provides only project, editor, workspace, selection and onboarding providers (`lib/project/preview_page.dart:18-27`, `lib/project/project_page.dart:167-176`), while `Designer` comes from the board, outline and widget editors (`packages/designer/lib/src/board/board_editor.dart:57`, `packages/designer/lib/src/panels/outline_panel.dart:29`, `packages/designer/lib/src/widgets/widget_designer.dart:181`). So `screenClass` stays null, `hasRoute` stays false, and the card is always added. `PlayMode` already knows the screen: `_buildRouterApp` calls `getPath(widget.expr.cachedReturnType.klass)` and starts on that route (`play_mode.dart:265-273`).

**Suggested fix.** Give the warnings what `PlayMode` knows instead of reading `Designer`: pass `screenClass: widget.expr.cachedReturnType.klass` (and `widget.controller`) into `PlayModeWarnings` at `play_mode.dart:203` and compute `hasRoute` from it (`play_mode_warning.dart:38-49`). Test: new `packages/designer/test/play_mode_warning_test.dart` that pumps `PlayModeWarnings` with no `Provider<Designer>` for a screen with a route and expects no `SingleScreenPlayWarning`.

**Docs impact.** `docs/test/share.md:50` documents the card as current behavior ("even when the screen has a route"); delete that clause once fixed.

### P45. Attach all on a shared preview attaches the states, then throws

- **Area:** Shared preview, play warnings (`packages/designer/lib/src/play_mode/play_mode_warning.dart`)
- **Severity:** Medium — the button half-works for owners and editors on a shared link; the card stays and the error is only logged.
- **Where:** web app (the preview page, window at least 840 px wide); cloud projects
- **Status:** Present in 3.13.0 and dev. Correction: the log said "no (code reading)"; the code settles it, since `read<Designer>()` is the non-nullable form and throws when no `Designer` is above.
- **Confidence:** Confirmed in code — steps not run.

**What happens.** On the shared-preview page, **Attach all** on the **Unattached global states** card attaches the listed states to the app in memory and then throws a Provider error on the next line. The preview isn't refreshed, the card stays, and the error only goes to the log; in the editor the same button works (by code).

**Steps to reproduce**
1. In a cloud project, create a global state (**Library** → **+** → **New Global State...**), then detach it: in the **Variables** panel with nothing selected, hover its name, click the three dots, **Detach global state**.
2. Play a screen on the board, click **Share preview** and copy the link (with or without `?screen=`).
3. Open the link in a new tab, signed in as owner or editor, in a window at least 840 px wide. Click the warnings button at the top left to open the **Unattached global states** card.
4. Click **Attach all**.

Expected: the states are attached, the preview refreshes and the card disappears.
Actual: the card stays and nothing visible changes; the log gets a `ProviderNotFoundException` for `Designer`.

**Root cause.** `UnattachedProvidersWarning._attach` first calls `gStateService.addProvider(klass)` for each state (inside a `try`), then ends with (`packages/designer/lib/src/play_mode/play_mode_warning.dart:131-142`):
```dart
final designer = context.read<Designer>();
designer.playController?.refresh();
```
The first line (`:140`) throws on the preview page, which provides no `Designer` (see P44). `addProvider` has already wrapped the app root in memory (`packages/core/lib/src/project/env_services/global_state_service.dart:55-88`), and the project autosaves every 20 s by default (`packages/core/lib/src/project/saving_service.dart:16,60-70`), so that edit is probably saved although the preview never refreshes (not checked). Even a working `refresh()` wouldn't redraw the card: `PlayModeWarnings` builds `_warnings` once in `initState` (`play_mode_warning.dart:20-28`), and on the preview page nothing listens to the controller (`PlayModeLoader` builds `PlayMode` once, `packages/designer/lib/src/play_mode/play_mode.dart:379-384`).

**Suggested fix.** Pass the `PlayController` and a "reload warnings" callback into the card instead of reading `Designer`: after attaching, call `controller?.refresh()` and `setState(_loadWarnings)`. On the preview page also make `PlayModeLoader` rebuild when the controller refreshes. If the `Designer` path stays, read it as `context.read<Designer?>()`. Test: in the new `packages/designer/test/play_mode_warning_test.dart` (see P44), tap **Attach all** with no `Designer` and expect no exception and the card removed.

**Docs impact.** `docs/test/share.md:60` says **Attach all** attaches the states; that becomes true on the preview page after the fix. No edit needed.

### P50. Signed-out playground: the AI chat toolbar breaks with "BillingProvider is not initialized"

- **Area:** AI chat field and billing (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart`, `packages/core/lib/src/billing/`)
- **Severity:** High — the AI Assistant is the playground's default panel and the first thing a no-account visitor sees, and its toolbar is unusable.
- **Where:** web app; playground project; playground only (signed out). By code, signed-out guests of a public project and a signed-in cold load of `/playground` should take the same path (not tried).
- **Status:** Present in 3.13.0 and dev (seen live on app.nowa.dev, v3.13.0-79).
- **Confidence:** Reproduced live — signed-out playground on 3.13.0-79 by two capture agents (`_rewrite/captures/ui-diffs-3.13.md`, `_rewrite/captures/README.md`); the cause is traced in code, the fix wasn't tried.

**What happens.** Opening the playground without an account shows the **AI Assistant** panel with no welcome text or suggestion chips, and a light-grey error box where the chat field's toolbar should be (mode chip, thinking-level chip, **+**, Supabase, Figma, **Send**). The mode menu and **Add context** don't open, and the status bar reads "Exception: BillingProvider is not initialized. Call initialize() first." Signed in, the same panel works.

**Steps to reproduce**
1. Signed out (a private window), open app.nowa.dev/playground and wait for the editor to load.
2. Look at the **AI Assistant** panel (open by default) and at the status bar.
3. Try **+** (**Add context**) and the mode chip.

Expected: the panel shows its welcome text, suggestion chips and the full toolbar; **+** and the mode chip open their menus.
Actual: a grey error box replaces the toolbar, no welcome text, the menus don't open, and the status bar shows the exception. The **Console**'s **Clear** resets the bar to **Ready** until the panel draws again.

**Root cause.** The thinking-level chip, `AgentSelectorChip`, reads the max-mode grant synchronously from the app-wide provider:
```dart
final maxModeEnabled = context.watch<BillingProvider>().getGrantSync(EntitlementKeys.maxMode)?.hasGrant ?? false;
```
(`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:1028`; the chip sits in `ChatControlBar`, `:326-335`). `getGrantSync` starts with `_ensureInitialized()`, which throws "BillingProvider is not initialized. Call initialize() first." until `initialize()` has run (`packages/core/lib/src/billing/billing_providers.dart:79-82,111-113`). The editor routes initialize billing in the router's `_authorize` redirect (`lib/router.dart:46-65`; `getGrant` and the plan and upgrade pages also call `initialize()`, but the playground reaches none of them). `/playground` deliberately has no redirect (`lib/router.dart:266-276`), and `onUserChanged(null)` returns without initializing (`billing_providers.dart:39-52`). So in the playground the chip throws on every build. Flutter swaps it for its error widget and logs the exception, which is the status-bar text. Why that box spreads over the rest of the panel wasn't traced. Two other callers guard their `hasGrantSync` reads with `billing.isInitialized` (`packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:39`, `packages/ai/lib/src/mcp/external_agent_access.dart:81`); this one doesn't. Guests of public projects are `isSandboxed` too (`packages/core/lib/src/models/project.dart:157`) and get the same `AiManager` (`packages/ai/lib/src/ai_plugin.dart:23`).

**Suggested fix.** Guard the read like the panel does: `final billing = context.watch<BillingProvider>(); final maxModeEnabled = billing.isInitialized && (billing.getGrantSync(EntitlementKeys.maxMode)?.hasGrant ?? false);` at `ai_chat_field.dart:1028`, or use the chip's own `_maxModeProvider.hasGrant` (`:946-952`). Consider making `getGrantSync` and `hasGrantSync` return null/false when uninitialized instead of throwing (`billing_providers.dart:111-113`), so no other caller can break this way. Check what the chip's `EntitlementProvider.loadGrant()` does for a guest (`billing_providers.dart:189-199` has no `catch`), and that **Enter** in the field still sends and opens the sign-in prompt the docs describe (`ai_chat_field.dart:73-85`). Test: a widget test in `packages/ai/test/` (pattern: `usage_row_layout_test.dart`) that pumps `AgentSelectorChip` under an uninitialized `BillingProvider` and expects no exception.

**Docs impact.** None after the fix. `docs/get-started/playground.md:17`, `docs/ai/index.md:23` and `docs/get-started/editor-tour.md:16` describe the intended behavior (AI panel open by default, sign-in prompt on the first message), which a visitor can't reach with the mouse today.
