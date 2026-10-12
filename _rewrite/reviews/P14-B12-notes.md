# P14-B12 notes

Batch: `test/index.md`, `test/instant-play.md`, `test/run.md`, `test/devices.md`, `test/share.md`, `test/problems.md`,
`troubleshooting/index.md`, `troubleshooting/known-issues.md`. Old pages audited: `deployment/share.md`,
`local-project-simulator/simulator.md`, `data-connections/firebase/known-issues/firebase-windows.md` (see
`P14-B12-coverage.md`). Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Tone follows R9 (D25).

## test/devices.md

**What changed for the reader**
- New section **What your computer needs** `{#what-your-computer-needs}`: a plain-words table of the tools a device run
  needs (desktop app, Flutter, Android toolchain, Android emulator, Xcode, Android Studio), what each is and whether
  the reader needs it, plus one paragraph on the desktop targets (your computer as a device). The old "Before you
  start" list is folded into it and into **Set up your computer** (numbered steps; links to B01's detailed setup).
- "No desktop app?" keeps its anchor; the web-app **Run on** row ("iOS & Android devices" / "Download the desktop
  app") moved to its opening; TestFlight explained in a clause.
- "Run on a device": steps warmed (why/what happens next); the 3.13 list-refresh workaround (P152) moved out of step 2
  into its own short paragraph; added a Nowa AI prompt for reading device logs.
- "Start an emulator or simulator": explains what an emulator/simulator is (R4); names what the list contains (the
  emulator Nowa installs, Android Studio's, **iOS Simulator** on a Mac); new "No emulators listed?" sub-section.
- New sections **Run on your Android phone** `{#run-on-your-android-phone}` and **Run on your iPhone or iPad**
  `{#run-on-your-iphone-or-ipad}` (the old simulator page's real-device part, rebuilt and verified).
- Cloud copy: "Later runs only sync the files you saved" → "Nowa skips the download and only syncs your project's
  files": every prepare mirrors all authored files (`packages/core/lib/src/runner/cloud_local_run_service.dart:123-140,
  287-305`); only hot reload after a save writes just the saved files (`:181-197`). "native setup" → "extra setup on the
  phone" (same fact, `:117-120` comment on `forceFresh`).
- Length: ~2,100 prose words. If it must shrink, split into "Set up your computer for devices" (What your computer
  needs, Set up your computer, Run on your Android phone, Run on your iPhone or iPad) and "Run on a device or emulator"
  (No desktop app?, Run on a device, Start an emulator, Run a cloud project on a device).

**Evidence for new or changed claims**
- Tools and setup: Local Setup's **Automatic setup** / **Set up automatically** (`packages/core/lib/src/settings/editor_settings/local_setup.dart:119-160`);
  wizard steps, "Android isn't set up — only needed to build Android apps.", **Download**, Android step with
  **Android toolchain** and **Android emulator** rows (`packages/core/lib/src/environment/environment_setup_dialog.dart:420-580`;
  labels `packages/core/lib/src/environment/tool_check.dart:3-11`); emulator install creates
  a virtual device (`packages/core/lib/src/environment/android_sdk_installer.dart:210-249`, `android_tools.dart:13-16`);
  toolchain includes `platform-tools` (adb, what detects a phone) (`android_tools.dart:11`); Xcode required before
  Flutter on macOS (`environment_setup_dialog.dart:441-458`).
- Local Setup from the **Run on** menu: **Local environment settings** → `AccountEditorSettings.show(..., 'local')`
  (`lib/project/run/run_button.dart:526-529, 570-572`); Flutter missing on device pick opens Local Setup (`:100-102, 144-149`).
- Emulator section: "No devices connected. Plug in a device or set up an emulator." when nothing can be started
  (`lib/local_export.dart:104-110`); emulator rows show Flutter's emulator name (`lib/local_export.dart:165-177`);
  Flutter names its single iOS entry "iOS Simulator" (flutter_tools `lib/src/ios/ios_emulators.dart:30`, fetched from
  github.com/flutter/flutter master); Android emulator name = display name or id with `_` → space (flutter_tools
  `lib/src/android/android_emulator.dart:156`), Nowa's AVD id is `Nowa_Emulator` (`android_tools.dart:14`), hence
  "its name starts with Nowa".
- **The emulator can't be added later** once the Android toolchain is installed: the only route to the Android step
  is the **Download** button of the "Android isn't set up" note, shown only while the toolchain is missing
  (`environment_setup_dialog.dart:525` note shown `if (!_isInstalled(EnvTool.android))`, `:580` the only
  `_goTo(_Step.android)`); the header shows only **Flutter** and **Verify** (`:331`). The Android step's own caption
  still says "You can add these later from Settings → Environment." (`:548`). Product issue (see below).
- Android Studio virtual devices: https://developer.android.com/studio/run/managing-avds (**More Actions** →
  **Virtual Device Manager**, **Create Device**, **Select Hardware**, **System Image**, **Finish**).
- iOS Simulator / Device Hub: Xcode includes the simulators, first launch lists built-in and downloadable runtimes
  (https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators, read through its
  JSON data endpoint); **Xcode** → **Settings** → **Components**, **Get**
  (https://developer.apple.com/documentation/xcode/downloading-and-installing-additional-xcode-components); Device Hub,
  **Xcode** → **Open Developer Tool** → **Device Hub**
  (https://developer.apple.com/documentation/xcode/managing-your-simulated-and-physical-devices-in-device-hub);
  "Start the simulator (renamed to Device Hub on Xcode 27)" / "On Xcode 26 or earlier, start the Simulator app"
  (https://docs.flutter.dev/platform-integration/ios/setup, Flutter 3.47, updated 2026-09-14).
- CocoaPods: Flutter's iOS setup page ("To support Flutter plugins that use native iOS or macOS code, install the
  latest version of CocoaPods"); Nowa projects carry a Podfile template
  (`packages/core/lib/src/file_system/templates/ios/podfile_template.dart:18`). The page doesn't quote Flutter's
  error text, only says the message mentions CocoaPods.
- Desktop targets: Visual Studio + **Desktop development with C++** (https://docs.flutter.dev/platform-integration/windows/setup);
  Linux build packages (https://docs.flutter.dev/platform-integration/linux/setup); Xcode for macOS (iOS setup page).
- Android phone: Developer options via **Settings** → **About phone** → **Build number** ×7, "You are now a
  developer!", Samsung under **Software information**, Android 9+ **Settings** → **System** → **Advanced** →
  **Developer options** → **USB debugging** (https://developer.android.com/studio/debug/dev-options); RSA-key prompt
  on connect, Windows OEM USB driver (https://developer.android.com/studio/run/device,
  https://developer.android.com/studio/run/oem-usb). The prompt's label isn't quoted (Android's page doesn't quote it).
  Devices come from the Flutter daemon's polling (`packages/core/lib/src/runner/local_build_manager.dart:63-74`).
- iPhone: **Trust**, Developer Mode in **Privacy & Security**, **Restart**, **Enable** + passcode, the switch appears
  only after pairing (https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device, and the
  Device Hub page above); signing with an Apple Account in **Xcode** → **Settings** → **Apple Accounts** and a team in
  **Signing & Capabilities**, personal account allowed
  (https://developer.apple.com/documentation/xcode/running-your-app-on-simulated-or-physical-devices); "a personal
  Apple Developer account is free and works", **VPN & Device Management** → **Developer App** → **Trust**
  (Flutter iOS setup page). Nowa has no signing handling of its own for device runs (no signing code in
  `packages/core/lib/src/runner/`).
- AI prompt: the agent's `read_logs` tool reads the Logs panel after the app was run in a simulator or the built-in
  previewer (`packages/ai/lib/src/tools/analyze_tool.dart:38-60`; in the main toolset, `packages/ai/lib/src/agent/agent.dart:139-140`).

**Open questions**
1. iPhone runs of a **cloud** project: each device run mirrors every authored file onto the local copy
   (`cloud_local_run_service.dart:123-140, 287-305`). If the project's iOS project file is among them, a team set in
   Xcode on the copy is overwritten on the next run. The page stays general ("open your app's iOS project"); worth a
   live check.
2. If Nowa's setup points Flutter at its own Android SDK (`android_sdk_installer.dart:192-201`, `flutter config
   --android-sdk`) without the `emulator` package, emulators created in Android Studio may not be listed. Not verified.

**Product issue (new)**: the **Android emulator** row of the setup wizard is unreachable once the Android toolchain is
installed, including when Android Studio's SDK is found at its default location (`packages/core/lib/src/environment/environment_doctor.dart:51-93`), so
"You can add these later from Settings → Environment" (the wizard's own caption) isn't true for the emulator.

## test/share.md

**What changed for the reader**
- Intro warmed (why: share after every change, feedback the same day).
- New section **When to share a preview** `{#when-to-share-a-preview}` from the old Instant Preview Share page: use
  cases (feedback, client or investor demo, review without installing, other device sizes) and when to use something
  else (a real phone → `devices.md`; the real app → `publish/index.md`), with the preview's limits in verified terms.
- **What people see in a preview**: **Play Settings** paragraph now says which devices **Device Size** offers (old
  page's "iPhone, iPad, Android, Desktop"; its "Web" entry no longer exists); global state explained in a clause (R4).
- **Open your project to others**: short intro on why you'd do it (a template to build on, a helper looking into the
  project); "Turn **Public project** off whenever you want the project private again".
- Link options: **Code mode** explained in a clause. Cover: "so it stays up to date without any work from you".
- Steps and sentences warmed (R9): "Copy the link ... and send it", "a code people can scan with their phone", "see
  exactly what others will see", "You never need a new link after you change your app".
- Kept: every label, warning text, link format and `?screen=` (it's in the link the reader copies and edits).

**Evidence for new or changed claims**
- Device families: `packages/device_frame/lib/src/devices/devices.dart:27-33` (`Devices.all` = iOS, Android, Windows,
  macOS, Linux), `ios/devices.dart:74-91` (iPhones, iPads), `android/devices.dart:153-167` (phones, tablets),
  `windows/devices.dart:42-45` and `linux/devices.dart:41-44` (wide monitor, laptop), `macos/devices.dart:28-31`
  (MacBook Pro, wide monitor); store default list `packages/device_preview/lib/src/state/store.dart:84`; one tab per
  platform plus **Custom** (`packages/designer/lib/src/play_mode/play_mode_settings.dart:113-150`); default device
  iPhone 13 (`packages/designer/lib/src/play_mode/play_mode.dart:167-170`).
- Preview limits = Instant Play: "Run on a simulator/emulator or mobile device to preview"
  (`packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:69`); simulated Firebase
  sign-in dialog with a test error (`packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:135-164`).
- Link: `https://app.nowa.dev/preview/$projectId` + `?screen=<file path>` (`play_mode.dart:600-608`); labels **Share
  Preview**, **Open in browser**, **Qr code**, Public/Private subtitles (`play_mode.dart:672, 696, 705, 740, 753`).
- Old-page items and their status: `P14-B12-coverage.md`, section 1.

**Open questions**: none new. P44/P45 (Single Screen Preview card, **Attach all** in the preview page) unchanged.

## troubleshooting/known-issues.md

Facts, anchors and workarounds of every entry kept (3.13.0 as shipped). Changes:

- `#firebase-on-windows` (app link via redirect, kept): added the in-app hint line, why it happens in plain words, a
  no-code way to see real results (**Run** = the embedded preview, the web version of the app), which **Run on**
  targets work (skip **Windows**), the Firebase console's **Query builder**, and Project Sync for local projects (old
  firebase-windows page, see coverage section 3).
- `#api-requests-blocked-in-the-browser`: CORS explained in plain words (R4); the fix made concrete for a non-coder
  (add `https://app.nowa.dev` to the API's allowed addresses) and the same rule for the published web app.
- `#slash-in-details`: "route path" explained in a clause. `#detach`: "params" explained in a clause; "the plain
  widgets" → "its widgets". Ads: "test ads" explained in a clause. Instant Play: "whenever you need to know how the
  real app behaves". Linux: "as you did to install it".
- `#firebase-reload-after-connect`: "The Firebase files disappear, `lib/main.dart` points at a missing
  `firebase_options.dart` so the project doesn't compile" → "Your app then can't start, because a Firebase settings
  file it needs is gone" (R1/R2; the original sentence is in `P14-B12-for-code.md` under `#firebase`); "so you don't
  end up with duplicates in Firebase" added to the reconnect advice.
- `#redirect-logic-plus`: "The trip to code mode and back is only a way to refresh the panel" (reassurance; the
  toggle is a view switch).

**Evidence for new or changed claims**
- In-app hint: "Simply connect your query to the UI and test it by running the app on a simulator, or use Nowa web or
  MacOS version" (`packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:144`); the
  Windows gate `kIsWeb == false && Platform.isWindows` (`:104-130`).
- **Run** on Windows: in-app web view everywhere except Linux (`packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-140`);
  the embedded preview runs the app as a web app (`packages/core/lib/src/runner/run_preflight.dart:7, 88`).
- Firebase options only for web, Android, iOS (+ macOS via iOS) (`packages/data/lib/src/firebase/setup/fb_setup_manager.dart:122-136`).
- Firebase console query builder: **Databases & Storage** > **Firestore** > **Data**, **Query builder** tab,
  **Collection** scope, **Add to query**, **Run**; "Read, write, and delete operations performed in the console count
  towards your Cloud Firestore usage" (https://firebase.google.com/docs/firestore/using-console#query_data and its
  "Manage data" note).
- Project Sync for local → cloud: `packages/core/lib/src/settings/project_sync_settings.dart:502`;
  `code/local-projects.md#link-a-cloud-copy-with-project-sync`.
- CORS: browsers only let a page call another origin when the server allows it
  (https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). The web editor runs the test request in the browser
  through the interpreted Dio call, with no proxy (`packages/data/lib/src/api/model/test_api_func_provider.dart:81-90`;
  no CORS or proxy handling under `packages/data/lib/src/api/`), so its origin is the web app's address
  (`https://app.nowa.dev`). The published web app is also a browser page (same rule).
- Reuse on reconnect: matching Android, iOS and web apps are reused, only missing ones created
  (`packages/data/lib/src/firebase/setup/views/fb_apps.dart:166-200`).

**Open questions**: none.

- **Routed from B02**: new entry `#playground-ai-toolbar` ("The AI chat shows a grey box in the playground"),
  product issue P50. Confirmed in code: signed out, `BillingProvider` is never initialized
  (`packages/core/lib/src/billing/billing_providers.dart:39-52, 79-82, 111-113`), and the toolbar's agent picker
  calls `getGrantSync` in its build (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:1026-1028`, inside
  `ChatControlBar`, `:311-357`), which throws "BillingProvider is not initialized" (the grey box and status-bar text the
  capture agents saw live, P50). Enter still works: the key handler sits on the text field, outside the toolbar
  (`ai_chat_field.dart:72-84`), and calls `sendMessage()`, which in the playground runs `SandboxSession.requestAuth()`
  first (`packages/ai/lib/src/chat_session.dart:256-264`; `packages/core/lib/src/project/sandbox_session.dart:35-42`;
  handler `ensureSignedIn` → sign-in dialog, `lib/sandbox/sandbox_save.dart:82`, `lib/auth/save_prompts.dart:21-30`).
  Not claimed: that the toolbar recovers after signing in from the playground (`BillingProvider.onUserChanged` runs
  in the router's `_authorize`, `lib/router.dart:45-63`, which the sign-in dialog may not pass through). Enter path
  is from code reading, not tried live.
- **Routed from B11**: new entry `#code-download-spinner` ("The code download keeps spinning in the web app"), product
  issue P9, linked to `publish/download-code.md#download-the-zip`. Confirmed: on the web, `_downloadProject` sets
  `_downloading`, opens the download URL and returns without resetting it (`lib/project/download_code_button.dart:110-116`);
  while `_downloading`, the zip row shows a spinner and has no tap action (`:200-212`); the popup is created anew on
  each open (`const DownloadProjectPopup()` in `showPopup`, `:16-23`; state `:68-71`), so reopening resets it.
- **Routed from B11**: new entry `#pending-custom-domain` ("A pending custom domain can't be removed"), product issue
  P17, linked to `publish/web.md#use-your-own-domain`. Confirmed: the trash icon (**Remove custom domain**) shows only
  when `isCustomDomainSet` (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:87-101`),
  which is false while DNS setup is needed (`packages/core/lib/src/web_deploy/web_environment_manager.dart:64-66`);
  while pending the button reads **DNS** and only opens the DNS records (`custom_domain_section.dart:139-158`), whose
  page offers copy and **Verify** only (`custom_domain/dns_records.dart:38, 144`). **Chat with support**: `account/help.md`.

## test/problems.md

**What changed for the reader**
- Order: open → read a row → **Fix** → **Hand a problem to Nowa AI** (moved up: it's the no-code path for everything
  without a **Fix** button) → messages without a button → the two sources → code Nowa couldn't read → empty list.
- Every Problems message is still quoted exactly (R3); each now says in plain words what it means for the app
  (package, permission, ambiguous name, home screen, route address, app ID).
- No-code first (R5): the dev-dependency fix leads with an Agent prompt; the hand edit stays, labelled "If you edit
  code yourself". "Anything else" now points to Nowa AI first, **Navigate** for people who work in code.
- New AI guidance: two Agent prompts (whole project; one copied message, with an everyday example) plus how to check
  the result (**Problems**, **Run**); a tip for asking about a placeholder with the widget selected.
- "From Nowa": `@NowaGenerated` kept (it's in the UI label **Only @NowaGenerated**) and explained; "names, types,
  arguments" → examples in plain words; `flutter analyze` kept (tooltip text) and explained as Flutter's own full check.
- Moved to `P14-B12-for-code.md`: the `sdk:` / `git:` / `path:` exception (#packages) and "write a new
  `lib/main.dart`" / "replaces `lib/main.dart`" (#project-files). The page now follows the dialog's own words ("a new
  main file with the default setup").

**Evidence for new or changed claims**
- Reset dialog text: "By resetting the main file, you get a new main file with the default setup.", **Reset**,
  **Cancel** (`packages/core/lib/src/project/env_services/main_problems_finder.dart:14-37`).
- **Fix Ambiguous Import**: "The name '<name>' is defined in multiple imports.", "Select which import to keep
  visible:", **Apply Fix** (`packages/core/lib/src/dialogs/fix_ambiguous_import_problem_dialog.dart:30-45, 102`).
- Dev dependency and failed-to-load messages; **Fix** only for a non-dev missing package
  (`packages/core/lib/src/interpreter/packages/package_service.dart:395-425`).
- Firebase mismatch compares the app's bundle ID with Firebase's package name; **Navigate** opens the Firebase settings
  (`packages/data/lib/src/firebase/firebase_plugin.dart:92-118`).
- Nowa AI can list Problems and run `flutter analyze` (`packages/ai/lib/src/tools/analyze_tool.dart:6-30`), edit any
  file incl. `pubspec.yaml` (`packages/ai/lib/src/tools/edit_tool.dart:6-36`), manage packages, change the selected
  widget (main toolset `packages/ai/lib/src/agent/agent.dart:123-158`). Agent mode = the mode that changes the project
  (glossary; Plan changes nothing).
- "Run it before you publish": consistent with `guides/ship-tips.md#keep-problems-clear` (web publishing starts with a
  code check).

**Open questions**: none.

## test/run.md

**What changed for the reader**
- Intro: "compiles your real Flutter app, with its packages and custom code" → "builds your real app, with everything
  in it"; contrasted with **Play** ("nothing is approximated: it's your actual app, running as a web app").
- Steps warmed (why the preview is often ready, the app keeps running so it's ready next time).
- "Fix a preview that won't start": the explanatory sentence no longer names `lib/main.dart` and `web/` (R2); the two
  dialogs are now quoted exactly, and they contain those names themselves (R3). New no-code fix for "Nothing to run":
  **Fix** on "Main file is not found" in **Problems**, then **Run** (same advice as `troubleshooting/index.md`, already
  verified there). Error table: "Your project has an error" → "Something in your project stops the app from
  starting"; "inactivity" → "a while without use".
- New H3 "Let Nowa AI fix it" groups the two **Fix with AI** paragraphs (no new facts; "so you don't have to describe
  the problem yourself").
- Toolbar: **Phone** / **Tablet** "so you can check both layouts"; **Open in Browser** wording; **Pub get** explains
  "packages".
- Logs: why you'd open them; tip reworded ("You don't have to read the logs yourself").

**Evidence for new or changed claims**
- Dialog titles and texts: **Web support is missing** / **Nothing to run**, "The preview runs your app as a web app,
  and … has no web/ folder.", "Cannot find lib/main.dart, so there is no app to launch.", "This folder holds no dart
  package. Nowa can browse and edit its files, but there is no app to preview.", **Close**, **Add web support**
  (`packages/core/lib/src/runner/run_preflight.dart:79-115`).
- "Main file is not found" with **Fix** → Reset dialog (`packages/core/lib/src/project/env_services/main_problems_finder.dart:14-48`).
- Session boots on project load (`lib/project/run/run_button.dart:183-185` comment: "The session boots in the
  background on project load").

**Open questions**: none.

## test/instant-play.md

**What changed for the reader**
- Intro: what you'd check with it (a button opening the right screen, a list scrolling, a form taking input).
- New sentence after the controls table: a screen plays at its board size; resize it to try another phone or tablet
  size (old simulator page's "choose from different devices", pointing to `design/responsive.md`).
- "Interprets" explained in a clause (R4); "custom code" → "code that was written by hand"; "packages" explained.
- Firebase sign-in: "so you can try both paths of your flow" (why the test user / test error choice helps).
- Placeholders: "variable" explained in a clause (R8); added "If a screen looks empty in **Play** but full on the
  board, that's usually why." (follows from the sentence before it).
- Shortcuts off while playing: "so a key you press goes to your app".

**Evidence for new or changed claims**
- Plays in place at the item's board size: `InlinePlayController.play` / `rect` (`packages/designer/lib/src/play_mode/board_play_controller.dart:65-97`).
- Test user / test error dialog: `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:135-164`.
- Device-only note text: `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:69`.

**Open questions**: none.

## test/index.md

**What changed for the reader** (wording only, no new facts)
- "interprets" explained ("acts out your app on the spot"); "compiled" / "compiles your real Flutter app" → "fully
  built" / "builds your real app" (R4); "Your own code and packages" → "Hand-written code and packages"; Run row: "on
  a phone or emulator in the desktop app".
- Intro and "A good rhythm" lead-in (R9). Section table: devices row mentions setting up the tools; problems row
  mentions Nowa AI (matches the rewritten pages).

**Evidence**: unchanged facts from the earlier verified page; new page contents are cited under their own pages.

## troubleshooting/index.md

All headings kept (inbound anchors `#this-screen-failed-to-render`, `#update-prompts`, and the in-page ones).

**What changed for the reader**
- Intro: tells the reader they can search the page for the words on screen (messages are quoted exactly).
- No-code first (R5): "This screen failed to render" step 2 now leads with Nowa AI ("tell it which screen shows the
  error and what the card says"; the card text isn't selectable); placeholder section gets an Agent prompt; the
  dev-dependency fix leads with Nowa AI, hand edit labelled "If you edit code yourself"; safe mode step 3 leads with
  Nowa AI.
- "Nothing to run" now quotes the dialog ("Cannot find lib/main.dart, so there is no app to launch.") and says in plain
  words that the main file is missing.
- Explained in a clause: packages, Flutter ("Google's free toolkit that builds your app"), the `pubspec.yaml` folder
  hint in "Project not found" (kept: Nowa validates the folder).
- "No devices in the Run on menu": the second "No devices connected" variant ("... set up an emulator.") and the
  Android **USB debugging** requirement, with links to the new devices sections.
- Small reassurances (R9): "Your project isn't lost if the folder still exists somewhere", "Safe mode breaks that
  loop", "That information helps the team find the cause quickly", "You're not on your own."

**Evidence for new or changed claims**
- Render error card: plain `Text` (max 4 lines, not selectable) and **Reload screen** (`packages/designer/lib/src/error_boundary.dart:226-268`).
- "Nothing to run" text: `packages/core/lib/src/runner/run_preflight.dart:84-95`; "Main file is not found" → **Fix**
  (`packages/core/lib/src/project/env_services/main_problems_finder.dart:44-48`).
- Locate folder validates the chosen folder (`packages/core/lib/src/services/local_project_service.dart:146-148`,
  `checkIfValidProject`); buttons **Use …**, **Locate folder**, **Remove from projects**, **Try again**
  (`lib/project/missing_project_folder.dart:84-124`).
- Both "No devices connected" variants: `lib/local_export.dart:108-109`. USB debugging: https://developer.android.com/studio/run/device.
- Local Setup can download Flutter: `packages/core/lib/src/settings/editor_settings/local_setup.dart:119-160`.

**Open questions**: none.

## For other pages

| Target page (batch) | Proposed text | Evidence |
|---|---|---|
| `get-started/desktop-app.md` (B01), "Let Nowa install Flutter" step 7 | Replace "You can add them later from **Local Setup** (its page is titled **Environment**)" with: "Install **Android emulator** in the same go if you want one: in Nowa 3.13 this screen only opens while the Android toolchain is missing." | `environment_setup_dialog.dart:525, 548, 580` (see devices notes) |
| `integrations/firebase/firestore.md` (B09), "Use a query in your app", "In the Windows desktop app, run the app on a simulator instead." | "In the Windows desktop app, click **Run** (the embedded preview runs the web version of your app) or run it on an emulator or a phone instead." | Embedded preview uses an in-app web view on Windows (`packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-140`); Firebase options include web (`packages/data/lib/src/firebase/setup/fb_setup_manager.dart:122-136`) |
| `code/local-projects.md` or `code/vs-code.md` (B15) | "Run on your own iPhone: open `ios/Runner.xcworkspace` in Xcode, sign in under **Xcode** → **Settings** → **Apple Accounts**, and pick your team under **Signing & Capabilities** for the Runner target. A free personal team works for your own devices." | https://developer.apple.com/documentation/xcode/running-your-app-on-simulated-or-physical-devices, https://docs.flutter.dev/platform-integration/ios/setup |
