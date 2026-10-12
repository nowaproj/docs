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
