# P14-B12 verify log (verifier P14-B12-V)

Batch pages: `test/index.md`, `test/instant-play.md`, `test/run.md`, `test/devices.md`, `test/share.md`,
`test/problems.md`, `troubleshooting/index.md`, `troubleshooting/known-issues.md`. Code refs relative to
`/home/user/nowa-master` (3.13.0+1, `3cb32031c`). Diff: `git diff origin/main -- docs/test docs/troubleshooting`.

Status: in progress (sections appended page by page).

## Links and anchors (all pages)

- Every explicit `{#id}` on `origin/main` still exists: `run.md#read-the-logs`, `troubleshooting/index.md#update-prompts`,
  and all 11 on `known-issues.md` (`api-requests-blocked-in-the-browser`, `detach`, `drag-across-app-bar`,
  `figma-connect`, `firebase-on-windows`, `firebase-reload-after-connect`, `invalid-type-in-status-bar`,
  `redirect-logic-plus`, `shift-drag`, `slash-in-details`, `variables-list-rename`).
- Implicit (heading) anchors: only `devices.md#before-you-start` is gone; no link to it in `docs/`, `src/` or
  `redirects.js`. The coverage file still cites it (row "Warning: not in the web version of Nowa"); the fact is now in
  `devices.md#no-desktop-app`.
- 180 inbound links from `docs/` to the batch pages checked by script: all files and anchors resolve. All outbound
  relative links from the batch pages resolve (files and anchors). No links to `generated-code.md` from the batch.
- Front matter valid, no H1, no `---` rules, admonitions ≤2 per page (problems 2, run 2, share 1, others 0).

## Build blocker fixed (coordinator report)

- `test/problems.md` line 53: the Agent prompt "Move the package <name> from dev dependencies to dependencies." had a
  bare `<name>` outside a code span, which MDX parses as a JSX tag ("Expected a closing tag for `<name>`"). Now reads
  "Move the package [package name] from dev dependencies to dependencies." Script scan of all 8 pages (code spans,
  fences and MDX comments stripped): no other bare `<word>`; the only `{` are heading IDs `{#id}`.

## test/devices.md

| claim | verdict | source | note |
|---|---|---|---|
| Desktop app for macOS, Windows and Linux | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8,64,79-85` (Linux enabled in `3cb32031c`) | |
| Flutter, Android toolchain, Android emulator: what they are, Nowa installs them | ok | `packages/core/lib/src/environment/tool_check.dart:3-11`; `android_tools.dart:11-16`; `android_sdk_installer.dart:79-97, 210-249` | intro "can install most of them" → "can install Flutter and the Android tools" (3 of 6 rows) |
| Xcode, iOS Simulator, first-launch runtime dialog, **Xcode** → **Settings** → **Components**, **Get** | ok | developer.apple.com …/installing-xcode-and-simulators, …/downloading-and-installing-additional-xcode-components | |
| Desktop targets need Xcode / Visual Studio + **Desktop development with C++** / Linux packages | fixed | docs.flutter.dev/platform-integration/windows/setup, …/linux/setup | "one more tool" (Xcode is already in the table) → "your system's own build tools"; "Phones, emulators and Chrome don't need any of this" read as if iPhones need no Xcode → "the tools in the table are all you need" |
| Setup steps: **Local environment settings** → **Local Setup**, **Set up automatically**, licence box, **Install** next to **Flutter**, **Next**, **Download** next to "Android isn't set up", **Android toolchain**, **Android emulator** | ok | `lib/project/run/run_button.dart:526-529, 570-573`; `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:33` (tab **Local Setup**); `local_setup.dart:119-160`; `environment_setup_dialog.dart:313, 525, 573-580, 658-712 (footer), 759-818 (licence box), 820-918 (tool rows)` | |
| 3.13 limit: **Android emulator** row only reachable while the toolchain is missing | ok | `environment_setup_dialog.dart:331` (header shows only Flutter, Verify), `:525` (note only `if (!_isInstalled(EnvTool.android))`), `:580` (only `_goTo(_Step.android)`), `:548` (caption still says "You can add these later from Settings → Environment."); toolchain counts as installed when any SDK with `platform-tools/adb` is found, incl. Android Studio's default folder (`environment_doctor.dart:51-93`); emulator row blocked until toolchain is in (`:91-95`); after the toolchain installs, the footer turns to **Done** (`:89, 659-665`) but the Android step stays open, so "right after it, on the same screen" holds | |
| Flutter missing on device pick opens **Local Setup** | ok | `run_button.dart:99-102, 143-148` | |
| Web app row **iOS & Android devices** / "Download the desktop app" | ok | `run_button.dart:636-653` | the web menu's own note still says "for macOS or Windows" (`:650`); Linux download exists, so the page's "macOS, Windows and Linux" stays |
| **Open on Mobile** (QR icon), **Scan the QR** | ok, scoped | `lib/project/top_bar_mapper.dart:188`; `packages/nowa_ui/lib/top_bar/top_bar_view.dart:589-613`; `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:33` | cloud projects only (local: **Open in Browser**); iPhone intro now says "for a cloud project" for **Open on Mobile** and TestFlight |
| **DEVICES**, "Looking for devices…", both "No devices connected…" texts, **Start an emulator** (uppercased) | ok | `lib/local_export.dart:77-125`; `lib/project/run/menu_widgets.dart:18` (`toUpperCase`) | |
| Run label shows device name; spinner + **Cancel**; **Stop**, **Hot restart**, **Run target** | ok | `run_button.dart:250-325` | |
| Save hot-reloads; bolt restarts | ok | `packages/core/lib/src/plugin.dart:183-198`; `run_button.dart:124-132`; `packages/core/lib/src/models/local_build.dart:12-18` | |
| List doesn't always refresh; reopen a project | fixed (tone) | devices polled per project manager (`packages/core/lib/src/runner/local_build_manager.dart:10-18, 61-75`) | "and it's there" over-promised → "to refresh the list" |
| Logs tab, **Log** panel, AI prompt reads device logs | ok | `packages/core/lib/src/io_utils.dart:128-142` (`flutter run` output → `logInfo`); `packages/core/lib/src/utils.dart:19-21`; `packages/ai/lib/src/tools/analyze_tool.dart:38-60, 153-160`; `packages/ai/lib/src/agent/agent.dart:139-140` | |
| Emulator list contents: Nowa's AVD name starts with "Nowa", Android Studio AVDs, **iOS Simulator** | ok | `android_tools.dart:14`; flutter_tools `android_emulator.dart:156`, `ios_emulators.dart:30` (master) | iOS Simulator on Xcode 27 (Device Hub): Flutter ≥ 3.47.0 finds `DeviceHub.app` (raw `flutter/3.47.0 …/macos/xcode.dart`; 3.44.8 checks only `Simulator.app`). Nowa installs the current stable (`flutter_release_models.dart:68-90`, `flutter_installer.dart:51-55`), 3.47.7 on 2026-10-08 (releases_macos.json), so a fresh setup lists it; `flutterSdkVersion = '3.44.8'` is only the minimum (`packages/core/lib/version.dart:6`). No change |
| Android Studio emulators may be missing from **Start an emulator** when Nowa installed the toolchain | added | `android_sdk_installer.dart:192-201` (`flutter config --android-sdk <Nowa SDK>`, no `emulator` package unless the emulator row ran, `:225-232`); flutter_tools `android_sdk.dart:91-94` (config wins), `:279-291` (emulator binary only inside that SDK), `android_emulator.dart:53-57` (no binary → no AVDs); start from **Device Manager** → **Launch**: developer.android.com/studio/run/managing-avds ("Run and stop an emulator") | writer's open question 2, now answered from code; added to the "More Android models" bullet |
| Android Studio **Device Manager**, **More Actions** → **Virtual Device Manager**, **Create Device**, system image, **Finish** | ok | developer.android.com/studio/run/managing-avds | |
| Device Hub, **Xcode** → **Open Developer Tool** → **Device Hub**; Simulator app on Xcode 26 or earlier | ok | developer.apple.com …/managing-your-simulated-and-physical-devices-in-device-hub; docs.flutter.dev/platform-integration/ios/setup | |
| CocoaPods message | fixed | docs.flutter.dev/platform-integration/ios/setup ("Install CocoaPods"); Nowa's doctor never checks it (`environment_doctor.dart:14-16`) | applies to iPhone runs too: "iOS Simulator" → "iOS Simulator or an iPhone" |
| Android phone: **Build number** ×7, "You are now a developer!", Samsung **Software information**, Android 9+ **System** → **Advanced**, **USB debugging**, accept the RSA prompt, OEM USB driver on Windows | ok | developer.android.com/studio/debug/dev-options (table 1, "Enable USB debugging"); …/studio/run/device ("RSA security key", updated 2026-10-01); …/studio/run/oem-usb | "exactly as your users will see it" → "as your users will see it" (it's a debug build) |
| iPhone: **Trust**, **Developer Mode** in **Privacy & Security**, **Restart**, **Enable** + passcode, switch appears once pairing starts, **Apple Accounts**, **Signing & Capabilities**, free account, **VPN & Device Management** → **Developer App** → **Trust** | ok | developer.apple.com …/enabling-developer-mode-on-a-device; …/running-your-app-on-simulated-or-physical-devices ("Set up code signing for physical devices"); docs.flutter.dev/platform-integration/ios/setup ("If the Developer Mode option is not visible … Open Xcode (or run flutter run)") | |
| Cloud copy: first run downloads, progress texts, **Cancel**, later runs only sync files, **Local cache** texts and three buttons, 14-day cleanup | ok | `packages/core/lib/src/runner/cloud_local_run_service.dart:54-64, 123-147, 220-252, 286-308`; `run_button.dart:686-760` | |
| Removed facts | ok | | old "Before you start" items are in the table, setup steps and "No desktop app?"; Android emulator-guide link replaced by the managing-AVDs guide; Apple simulators link content is in setup step 2 |

Open: writer's question 1 (Xcode team on a cloud project's local copy) stays open. Every device run re-mirrors all
project files onto the copy (`cloud_local_run_service.dart:123-147, 286-308`), and cloud projects carry
`ios/Runner.xcodeproj/project.pbxproj` (rename edits it, `packages/core/lib/src/project/rename.dart:87`), so a team set in
Xcode on the copy is likely overwritten; Flutter may still pick a signing identity on its own. Needs a live check.
Page length ~2,300 words; split plan in the notes still applies.

## test/share.md

| claim | verdict | source | note |
|---|---|---|---|
| "When to share a preview": open on a computer or phone in the browser; feedback, client/investor demo, review without installing, other device sizes | ok | `packages/designer/lib/src/play_mode/play_mode.dart:132-170` (preview page, phone frame, narrow-window mode); `play_mode_permissions.dart:12-16` (share, full screen, device settings for everyone) | |
| Preview limits = Instant Play: maps and paywalls show a placeholder, Firebase sign-in simulated | ok | `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:69` (used by `google_maps_package_config.dart`, `revenuecat_package_config.dart`); `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:132-168` (no preview-page exception) | |
| **Device Size**: iPhones and iPads, Android phones and tablets, laptop and monitor sizes for macOS, Windows, Linux; one tab per platform plus **Custom** | ok | `packages/device_frame/lib/src/devices/devices.dart:27-33`; `ios/devices.dart:73-91`; `android/devices.dart:152-167`; `windows/devices.dart:41-45`; `macos/devices.dart:28-31`; `linux/devices.dart:41-45`; `packages/device_preview/lib/src/state/store.dart:84` (no list passed by `play_mode.dart:167-170`, so `Devices.all`); `play_mode_settings.dart:113-150` | old page's "Web" device is gone |
| **Play Settings** open to anyone viewing (**Device Settings**) | ok | `play_mode_permissions.dart:14`; `board_play_controller.dart:164-174` | |
| Popup labels **Share Preview**, **Public**/**Private** subtitles, **Qr code**, **Open in browser**; link format; `?screen=` | ok | `play_mode.dart:516, 600-608, 672-753` | |
| "**Open in browser** to see exactly what others will see" | fixed | `play_mode_warning.dart:88` (owners and editors also get the warning cards), `play_mode_permissions.dart:8-10` (only they get **Stop**/**Restart**) | → "to see the preview the way others will" |
| Global state explained in a clause; public-project intro; cover "stays up to date" | ok | glossary; `test/share.md` cover paragraph unchanged in fact | |
| Removed facts | ok | | "not the compiled app" → "isn't the real, built app"; nothing dropped |

Known product issues on this page (unchanged, pre-existing decisions): P44 (Single Screen Preview card on every
`?screen=` link) is described as shipped; P45 (**Attach all** throws after attaching, in the preview page) is code reading
only and not documented.

## test/run.md

| claim | verdict | source | note |
|---|---|---|---|
| Intro: builds the real app, runs as a web app, nothing approximated | ok | `packages/core/lib/src/runner/run_preflight.dart:5-10, 86-89` | |
| Session boots on project load ("often ready by the time you click"); keeps running when hidden | ok | `lib/project/run/run_button.dart:183-185`, `:147-160` | |
| **Web support is missing** / **Nothing to run** texts, **Close**, **Add web support**, "Could not generate the missing files. Check the logs for details." | ok | `run_preflight.dart:69, 84-119` | |
| "Nothing to run" no-code fix: **Fix** on "Main file is not found", then **Run** | ok | `packages/core/lib/src/project/env_services/main_problems_finder.dart:14-48` (**Reset main file**, **Reset**) | |
| **Phone**/**Tablet**, **Open in Browser** (local), **Open on Mobile** (cloud), **Hot Reload**/**Hot Restart** | ok | `lib/project/top_bar_mapper.dart:171-190`; `packages/nowa_ui/lib/top_bar/top_bar_view.dart:589-613` | |
| Error screens, restart card, **Fix with AI** behaviour (H3 "Let Nowa AI fix it") | ok | unchanged facts (wording only) | |
| **Routed from B07**: "Messages from a `print` step … show up here too, both when you run your app and when you test with **Play**." | added | Play: the interpreter's `print` calls `logInfo` (`packages/core/lib/src/interpreter/libraries/dart_core_library_custom.dart:3-8`), which writes to the project's `LoggerProvider`, the **Logs** list (`packages/core/lib/src/utils.dart:19-21`). Run: embedded preview app logs and web console lines are forwarded to the same `LoggerProvider` (`packages/nowa_run/lib/src/nowa_run_manager.dart:309-340`); device runs log `flutter run` output with `logInfo` (`packages/core/lib/src/io_utils.dart:128-142`) | `print` explained in a clause (R3), linked to `logic/actions.md#write-to-the-logs` |
| Removed facts | ok | | `lib/main.dart` / `web/` sentence moved to for-code (`#project-files`, present) and the dialogs now quote those names themselves |

## test/problems.md

Every quoted message checked against the code (exact text, quotes, final period or none):

| message | verdict | source |
|---|---|---|
| `'<package>' is imported but is not in the pubspec.` (Fix adds it by name) | ok | `packages/core/lib/src/interpreter/packages/package_service.dart:415-423` |
| `The function '<name>' isn't defined.` (Fix only when a known package defines it) | ok | `packages/core/lib/src/interpreter/block_problems.dart:255-271` |
| `Setup statement in main.dart for "<key>" is required but not found.` | ok | `packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:398-402` |
| `Android permission "<name>" is required by <package> but not enabled.` (or iOS) | ok | same file `:419-427` (`'Android' : 'iOS'`) |
| `The name '<name>' is defined in <packages>. Try removing one of the imports.`, **Fix Ambiguous Import**, **Apply Fix** | ok | `block_problems.dart:377-397`; `packages/core/lib/src/dialogs/fix_ambiguous_import_problem_dialog.dart:30-45, 102` |
| `Main file is not found` / `Main function is not found`, **Reset main file**, **Reset** | ok | `packages/core/lib/src/project/env_services/main_problems_finder.dart:14-53` |
| `'<package>' is a dev dependency, so Nowa does not load it. Move it to dependencies to use it in lib/.` (no Fix) | ok | `package_service.dart:416-422` |
| `'<package>' is installed but failed to load, so nothing it defines is available: <reason>` | ok | `package_service.dart:402-407` |
| `No Home screen Selected, select one of screens as Home Screen`, **Make home screen** | ok | `main_problems_finder.dart:55-58`; `packages/designer/lib/src/details/route_details.dart:281` |
| `Duplicate route path found: "/home".`, group **Router problems** | ok | `packages/core/lib/src/editors/router_editor/router_problems.dart:27, 41` |
| `Firebase package name '…' does not match the app package name '…'. Try refreshing the config files`, **Navigate** → Firebase settings | ok | `packages/data/lib/src/firebase/firebase_plugin.dart:101-117` |
| `Undefined name 'total'.` | ok | `block_problems.dart:276-277` |
| `'<name>' could not be loaded: <reason>` | ok | `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:109` |

| claim | verdict | source | note |
|---|---|---|---|
| Panel labels: **From Nowa**/Instant, **From Code Analysis**/Accurate, **Refresh**, **Run Code Check**, **Run code check (flutter analyze)**, "Checking...", "Checked at", "n files changed since last check", "Code check failed", **Filter code check results**, **Which code Nowa checks**, **All files**, **Only @NowaGenerated**, "Including code Nowa did not generate", **Navigate**, **Copy**, **Open File**, "Loading packages...", **Kept as code** | ok | `packages/core/lib/src/panels/problems_panel.dart:46-47, 152-158, 171-177, 263, 311, 348, 357, 419, 453-468, 488, 501, 523`; `errors_panel.dart:106-109`; `packages/designer/lib/src/details/widget_details.dart:552` | |
| "A problem inside a file sits under the file's name" | fixed | group title is the file's project path (`packages/core/lib/src/interpreter/services/problem_service.dart:165-175`; `problems_panel.dart:122-136`) | → "is listed under that file" (no false "name", no path jargon) |
| No-code first (R5): Agent prompts first; dev-dependency hand edit labelled "If you edit code yourself"; "Anything else" → Nowa AI first, **Navigate** for code users; AI check via **Problems** and **Run** | ok | agent tools `packages/ai/lib/src/tools/analyze_tool.dart:6-30`, `packages/ai/lib/src/agent/agent.dart:123-158` | |
| R3 explanations: pubspec, `main.dart`, `@NowaGenerated`, `flutter analyze`, Dart | ok | | |
| Build blocker `<name>` (line 53) | fixed | see "Build blocker fixed" above | |
| Removed facts | ok | | `sdk:`/`git:`/`path:` exception and `lib/main.dart` wording moved unchanged to for-code (`#packages`, `#project-files`) |

## test/instant-play.md and test/index.md

| claim | verdict | source | note |
|---|---|---|---|
| A screen plays at its board size; resize it to try another size | ok | `packages/designer/lib/src/play_mode/board_play_controller.dart:65-97`; `design/responsive.md#check-your-layout-at-other-sizes` | |
| Interprets explained ("reads it and acts it out on the spot"); hand-written code and packages | ok | | wording only |
| Maps/paywall note text, simulated Firebase sign-in (test user or test error) | ok | `integration_preview_view.dart:69`; `fb_auth_blocks.dart:132-168` | |
| Shortcuts off while playing; placeholders vs Play values | ok | unchanged facts | |
| index: Play/Run/Share preview table, "fully built", Run on "a phone or emulator in the desktop app" | ok | `lib/project/run/run_button.dart:540-575` | wording only |

## troubleshooting/index.md

| claim | verdict | source | note |
|---|---|---|---|
| Intro: messages quoted exactly, search the page | ok | | |
| "This screen failed to render": Nowa AI first, **Reload screen** | ok | `packages/designer/lib/src/error_boundary.dart:223-268` | |
| Placeholder: **Kept as code**, `could not be loaded`, Agent prompt | ok | `widget_details.dart:552`; `ast_to_block_visitor.dart:109` | |
| Package messages; dev-dependency fix leads with Nowa AI, hand edit labelled | ok | `package_service.dart:402-423` | |
| "Nothing to run" quote, **Fix** on "Main file is not found" | ok | `run_preflight.dart:84-95`; `main_problems_finder.dart:44-48` | |
| **Use …**, **Locate folder**, **Remove from projects**, **Try again**; folder validation keeps `pubspec.yaml` | ok | `lib/project/missing_project_folder.dart:93-124`; `packages/core/lib/src/services/local_project_service.dart:146-148` | |
| Safe mode labels | ok | `packages/nowa_ui/lib/dashboard/projects_grid.dart:303`; `lib/project/panels/empty_workspace.dart:25-47` | |
| Flutter explained; Local Setup can download it | ok | `local_setup.dart:119-160` | |
| No devices: both "No devices connected…" texts, **USB debugging**, links to the new device sections | fixed | `lib/local_export.dart:104-110`; developer.android.com/studio/run/device | "you have no emulator yet" → "Nowa found no emulator it can start" (also true when Android Studio emulators aren't visible to Nowa's Flutter, see devices) |
| **Routed from B01**: offline start may open the sign-in page | ok | `lib/router.dart:46-55` (`ensureValidVersion()` first), `packages/core/lib/src/services/version_service.dart:4, 98-99` + `packages/core/lib/src/services/http.dart:8-16` (package:http, not Dio), `lib/router.dart:108-111` (generic `catch` → `/signin`); `/no-internet` only from the `DioException` branch (`:86-91`) | wording hedged ("may"), as it should be: code reading, not tried live |
| Removed facts | ok | | `lib/main.dart` sentence moved to for-code (`#project-files`); nothing else dropped |

## troubleshooting/known-issues.md

All 11 explicit anchors from `origin/main` kept. Entries checked one by one:

| entry / claim | verdict | source | note |
|---|---|---|---|
| `#firebase-on-windows`: message + hint text, Windows-only gate | ok | `packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:104-146` (`kIsWeb == false && Platform.isWindows`) | |
| … **Run** shows real results (embedded preview = web app, in-app web view on Windows); emulator or phone | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-140`; `run_preflight.dart:5-10` | |
| … skip **Windows**: Firebase set up for web, Android, iOS, macOS only | ok | `packages/data/lib/src/firebase/setup/fb_setup_manager.dart:112-136` (`currentPlatform` returns null for Windows/Linux) | |
| … Firebase console **Databases & Storage** → **Firestore** → **Data**, **Query builder**, **Add to query**, **Run**; console reads count toward usage | fixed | firebase.google.com/docs/firestore/using-console ("Query data", "Manage data" note; updated 2026-10-08) | "Pick the collection" → "Choose **Collection** and type the collection's name" (it's a scope choice plus a text field, not a picker) |
| … another Nowa version; local project → cloud copy with Project Sync | ok | `packages/core/lib/src/settings/project_sync_settings.dart:502`; `code/local-projects.md#link-a-cloud-copy-with-project-sync` | |
| `#api-requests-blocked-in-the-browser`: CORS in plain words, add `https://app.nowa.dev`, published web app too | ok | developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS; `packages/data/lib/src/api/model/test_api_func_provider.dart:81-90` (browser request, no proxy) | |
| Ads "test ads" gloss, Instant Play, Linux wording | ok | unchanged facts | |
| **Routed from B11** `#code-download-spinner` (P9) | ok | `lib/project/download_code_button.dart:108-116` (web: `_downloading` set, URL opened, never reset), `:196-213` (spinner, no tap while downloading), `:16-23, 34-36` (popup built anew per open; tooltip **Code download**) | link `publish/download-code.md#download-the-zip` resolves |
| **Routed from B11** `#pending-custom-domain` (P17) | ok | `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:84-101` (trash icon **Remove custom domain** only when `isCustomDomainSet`), `:139-158` (**DNS** button only opens the records), `packages/core/lib/src/web_deploy/web_environment_manager.dart:63-65` (`isCustomDomainSet` false while DNS setup is needed); `custom_domain/dns_records.dart:38, 144` | link `publish/web.md#use-your-own-domain` resolves |
| **Routed from B03** `#new-ux-double-click` | fixed (wording) | `packages/designer/lib/src/design_experience/designer_board_controller.dart:103-121, 361-366, 414-419` (`UnimplementedError` before select-child / text edit); `packages/core/lib/src/providers/editor_provider.dart:348`; `packages/designer/lib/src/panels/designer_board.dart:122-148`; path and dialog `packages/core/lib/src/settings/project_detail_settings.dart:16, 69-80`, `experimental_flags_dialog.dart:30-39, 44, 78`; gear always in the top bar (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:150-151`) | "the toolbar at the bottom of the board is hidden" → "the board's usual toolbar at the bottom is hidden" (with New UX a different chat bar can sit there, `designer_board.dart:122-131`) |
| `#firebase-reload-after-connect`: plain-words consequence; reconnect reuses apps | ok | `packages/data/lib/src/firebase/setup/views/fb_apps.dart:166-200` | original sentence moved unchanged to for-code `#firebase` |
| **Routed from B02** `#playground-ai-toolbar` (P50) | ok | P50 live (product-issues.md); `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:1026-1028` (`getGrantSync` in build), `packages/core/lib/src/billing/billing_providers.dart:39-52, 79-82, 111-113` (throws when not initialized); Enter: `ai_chat_field.dart:72-84` → `packages/ai/lib/src/chat_session.dart:256-264` (`SandboxSession.requestAuth()`), `packages/core/lib/src/project/sandbox_session.dart:35-42`; **Add context** `packages/ai/lib/src/ui/chat_field/attachements_view.dart:98` | Enter path is code reading, not tried live |
| `#redirect-logic-plus` reassurance | ok | | |
| **Routed from B09** new `#stripe-cancel-subscription` | added | P66: the deployed cancel function has Dart syntax inside TypeScript, `.order('created_at', ascending: false)` (`packages/core/lib/src/integrations/stripe/stripe_edge_functions.dart:659`), so it can't run; P67: `deployEdgeFunction` swallows errors into its own `_error` (`packages/data/lib/src/supabase/supabase_oauth_manager.dart:148-188`, catch at `:182-183`), so `deploy()` never fails (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:374-427, 234-241`) and "Deployed successfully!" shows (`packages/core/lib/src/integrations/stripe/stripe_settings.dart:643-649`); webhook updates the record on `customer.subscription.updated`/`.deleted` (`stripe_edge_functions.dart:786-798, 818-821`), which `getSubscriptionStatus()` reads (`integrations/stripe.md`); Dashboard steps: docs.stripe.com/billing/subscriptions/cancel (**Subscriptions** page, overflow menu, **Cancel subscription**, choose when it ends) | anchor `integrations/stripe.md#fix-common-problems` exists; "always fails" softened to "fails"; code names kept out of the main text |
| **Routed from B10-V** new `#supabase-tables-use-keys` | added (hedged) | `packages/data/lib/src/supabase/supabase_manager.dart:73-140` (anon key unless authorized, then `service_role`), `supabase_service.dart:48-63` (`GET /rest/v1/`, throws on no `info`), `ui/sb_tables_page.dart:60-66` ("Error fetching tables: …"), `templates/ui/template_category_view.dart:57-68, 148` (**No Tables Found** stays); labels `ui/sb_setup/sb_oauth_setup.dart:69-71`, `ui/sb_outline.dart:299-309`, `ui/sb_setup/project_selection_dialog.dart:197`, `ui/sb_add_function_dialog.dart:76`; Supabase changelog https://supabase.com/changelog/42949-breaking-change-removing-access-to-openapi-spec-via-the-anon-key (new projects 11 March, all projects 8 April 2026, "We may push these dates back", error body "Access to schema is forbidden") | kept "can" and "announced" (not seen live); anon key glossed; anchor `integrations/supabase/connect.md#connect-with-keys` exists |
| **Routed from B06-V** new `#await-in-initstate` | added | `packages/code/lib/src/fields/future_options.dart:10-31` (await toggle calls `updateAsync`), `packages/core/lib/src/interpreter/declaration_runtime.dart:1555-1574` (return type becomes `Future`, source gets `async`, no exception for `initState`); label **InitState Function** `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:438-444`; Flutter SDK `packages/flutter/lib/src/widgets/framework.dart:5948-5962` ("….initState() returned a Future." / "must be a void method without an `async` keyword", debug-mode assert, so it shows when you run, not in a release build) | workaround matches `logic/functions.md#lifecycle`; Agent prompt with no promised output, check with **Run** |
| Removed facts | ok | | none dropped |

Page is ~2,240 words with 25 independent entries; kept whole (reference/troubleshooting page, D27).
