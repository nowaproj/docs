# P14-B12 coverage: old pages → new docs

Batch pages: `test/index.md`, `test/instant-play.md`, `test/run.md`, `test/devices.md`, `test/share.md`,
`test/problems.md`, `troubleshooting/index.md`, `troubleshooting/known-issues.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Status "to add" = planned, updated to
"added" when the page is saved.

## 1. `deployment/share.md` (Instant Preview Share) → `test/share.md`

| item | status | where / evidence | note |
|---|---|---|---|
| Deprecation banner: "Instant Preview Share is now deprecated and replaced by a new feature that allows you to share a QR code/link"; docs "coming soon" | not useful | the replacement (**Share preview**) is documented on `test/share.md` | internal note |
| Why share a preview: deployment suits final testing; building and sending artifacts for every round of feedback is hard | added | `test/share.md#when-to-share-a-preview` | intro already says "nothing to build, publish or install" |
| A fully interactive preview as a link: no build, deploy, hosting or files; people only open the link in a browser | covered | `test/share.md` intro | |
| Opens directly in the browser inside a preview frame that loads instantly | covered | `test/share.md#what-people-see-in-a-preview` (phone frame) | |
| "Frequent testing and feedback is key..." | not useful | | filler |
| Video tutorial (YouTube `ORa4ohpK4pQ`) | not useful | | pure media |
| "No builds, deploys, or hosting; no files, artifacts or app downloads" | covered | `test/share.md` intro | |
| The same link always stays in sync with your project; no new link after changes | covered | `test/share.md#share-a-preview` ("The link stays the same ... as last saved") | kept, with the "as last saved" nuance |
| Preview as mobile, web or desktop from one link; switch devices (iPhone, iPad, Android, Web, Desktop macOS) | added | `test/share.md#what-people-see-in-a-preview` (**Device Size** families) | 3.13 lists iOS (iPhones, iPads), Android (phones, tablets), Windows, macOS, Linux (laptop, monitor): `packages/device_frame/lib/src/devices/devices.dart:27-33`, `ios/devices.dart:74-91`, `android/devices.dart:153-167`, `windows/devices.dart:42-45`, `macos/devices.dart:28-31`, `linux/devices.dart:41-44`; one tab per platform plus **Custom**: `packages/designer/lib/src/play_mode/play_mode_settings.dart:113-150`. "Web" device: obsolete (no web entry in `Devices.all`) |
| Step 1: click **Play** to run the app inside Nowa | covered | `test/share.md#share-a-preview` step 1 | |
| Step 2: click **Share** | covered | step 2 (label is **Share preview** in 3.13) | |
| Step 3: **Public** (anyone with the link) / **Private** (only workspace members with project access) | covered | step 3 (exact 3.13 labels) | |
| Step 4: **Copy link** or **QR Code** | covered | step 5 | |
| Step 5: **Open in your browser** to see what others see | covered | step 5 (**Open in browser**) | |
| Use case: share with clients without sending files | covered | `test/share.md#share-with-a-client` | |
| Use case: quick feedback from teammates or stakeholders | added | `test/share.md#when-to-share-a-preview` | |
| Use case: review UI and flows without installing an app | added | same | |
| Use case: test layouts and behavior across devices | added | same (+ **Device Size**) | |
| Use case: demo the app without hosting or deployment | added | same | |
| When to still deploy: to test on the actual phone | added | same → `test/devices.md`, **Open on Mobile** (`test/run.md`) | |
| When to still deploy: to submit to the stores | added | same → `publish/index.md` | |
| When to still deploy: device features such as location or Bluetooth | added | same, in verified terms | the preview is Instant Play: maps and paywalls show placeholders, Firebase sign-in is simulated (`test/instant-play.md#know-what-instant-play-cant-show`). Location and Bluetooth not named: not verified for the browser preview |

## 2. `local-project-simulator/simulator.md` (Running on a simulator/physical device) → `test/devices.md`

| item | status | where / evidence | note |
|---|---|---|---|
| Ways to test your project and use Flutter's Hot Reload | covered | `test/devices.md#run-on-a-device` steps 5-6; `test/run.md#use-the-run-toolbar` | |
| The app must be a local Flutter project first (link to creating local projects) | obsolete | `packages/core/lib/src/runner/local_run_config.dart:13` (`kLocalRunForCloud = true`), `lib/project/run/run_button.dart:88-114` | 3.13 runs cloud projects on devices through a local copy; already on `test/devices.md#run-a-cloud-project-on-a-device` |
| **Play** shows the app in a preview frame at once | covered | `test/instant-play.md` | |
| Choose devices for the preview: iPhone, iPad, Android Pixel, Samsung tablets, desktop | covered | `design/responsive.md#check-your-layout-at-other-sizes`; `test/share.md#what-people-see-in-a-preview` | board screens have their own size; the shared preview has **Device Size** |
| Previewer limits: Firebase Authentication can be tried but doesn't sign you in; use a simulator or device for real behavior | covered | `test/instant-play.md#know-what-instant-play-cant-show` | |
| Video `builtinsimulator.mp4` | not useful | | media, 3.12-era UI |
| Warning: only local projects run on simulators or devices | obsolete | see above (`local_run_config.dart:13`) | |
| Warning: not in the web version of Nowa | covered | `test/devices.md#before-you-start` | web shows **iOS & Android devices** / "Download the desktop app" (`lib/project/run/run_button.dart:636-656`) |
| A menu at the top right of Nowa Desktop lists available targets (Chrome, macOS, Windows) | covered | `test/devices.md#run-on-a-device` step 2 | 3.13: the arrow next to **Run** opens **Run on** (`lib/project/run/run_button.dart:437-446, 537-580`) |
| Android and iOS simulators must be started first | covered | `test/devices.md#start-an-emulator-or-simulator` | |
| Select the target and press **Run** | covered | `test/devices.md#run-on-a-device` step 3 | |
| The **Logs** tab shows what's happening | covered | `test/devices.md` (after the steps) | |
| **Stop** button | covered | step 6 | |
| **Hot Reload** shows changes without restarting | covered | step 5 (save reloads; **Hot restart** bolt) | |
| Video `simulator.mp4` | not useful | | media |
| Simulator missing from the list = not running yet | covered | step 2 ("No devices connected...") | |
| On a Mac, open the **Simulator** app to start an iOS simulator (Apple link) | added | `test/devices.md#no-emulators-listed` (**iOS Simulator** in **Start an emulator**; Device Hub / Simulator app) | Xcode 27 renamed Simulator to Device Hub: https://docs.flutter.dev/platform-integration/ios/setup ("Start the simulator (renamed to Device Hub on Xcode 27)"); https://developer.apple.com/documentation/xcode/managing-your-simulated-and-physical-devices-in-device-hub |
| Start an Android emulator from Android Studio (Android link) | added | `test/devices.md#no-emulators-listed` | Nowa itself can install an emulator: **Android emulator** row creates a virtual device (`packages/core/lib/src/environment/android_sdk_installer.dart:248-283`, `android_tools.dart:13-16`); Android Studio steps: https://developer.android.com/studio/run/managing-avds |
| Start an Android emulator from VS Code | not useful | `lib/local_export.dart:115-119, 166-177` | Nowa's **Run on** menu starts emulators itself; VS Code use is on `code/vs-code.md` |
| After starting, reopen the list in Nowa; it can take a few seconds | covered | step 2 (with the 3.13 refresh workaround, P152) | |
| Real device: connect the phone with a USB cable | added | `test/devices.md#run-on-your-android-phone`, `#run-on-your-iphone-or-ipad` | iPhone part rebuilt from Apple and Flutter docs (notes) |
| Android: enable **USB debugging** so the phone is detected | added | `test/devices.md#run-on-your-android-phone` | https://developer.android.com/studio/debug/dev-options, https://developer.android.com/studio/run/device |
| The phone appears in Nowa's device list; select it and **Run** | added | `test/devices.md#run-on-your-android-phone` step 5, `#run-on-your-iphone-or-ipad` step 4 | devices come from the Flutter daemon (`packages/core/lib/src/runner/local_build_manager.dart:63-74`) |
| Note: open the local project in VS Code or Android Studio and run it there; it stays in sync with Nowa | covered | `code/vs-code.md#run-and-use-git-from-either-place`, `#what-syncs-and-when` | |
| (batch note) What Flutter, Xcode and Android Studio are, and why each is needed | added | `test/devices.md#what-your-computer-needs`, `#set-up-your-computer` | Nowa's automatic setup: `packages/core/lib/src/settings/editor_settings/local_setup.dart:119-160`, `packages/core/lib/src/environment/environment_setup_dialog.dart:443-580` |

## 3. `data-connections/firebase/known-issues/firebase-windows.md` → `troubleshooting/known-issues.md#firebase-on-windows`

| item | status | where / evidence | note |
|---|---|---|---|
| Symptom: Firestore queries can't be tested in the Windows version (screenshot) | covered | `troubleshooting/known-issues.md#firebase-on-windows` | message quoted; the second in-app line "Simply connect your query to the UI ..." added (`packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:130,144`) |
| Normally you build and test a query before connecting it to the UI | covered | `integrations/firebase/firestore.md` (test section) | |
| Why: the Windows app can't run the queries itself | added | same entry | `queries_builder.dart:110-130` (`Platform.isWindows` gate). Old wording "Firebase itself doesn't support Windows" not reused (not verified as stated) |
| It doesn't stop you building a Firebase app on Windows | covered | same entry ("You can still use your queries in your app") | |
| Workaround 1: skip the test, connect the query to the UI, run the app on an emulator or device | covered | same entry | |
| Workaround 1: platforms that show real results (iOS, Android, web, Linux, macOS) | added | same entry, refined | **Run** (embedded preview, a web app; in-app web view on Windows: `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-140`), Chrome, Android, iOS. Not the Windows or Linux app: Firebase options exist only for web, Android, iOS and macOS (`packages/data/lib/src/firebase/setup/fb_setup_manager.dart:122-136`). "Linux" in the old list: obsolete |
| Workaround 2: use the web or macOS version | covered | same entry | |
| Workaround 2 for a local project: connect a second cloud project to the same Firebase project, test there, rebuild in the local project | added | same entry (Project Sync instead) | 3.13 makes a cloud copy of a local project: `code/local-projects.md#link-a-cloud-copy-with-project-sync`, `packages/core/lib/src/settings/project_sync_settings.dart:502` |
| Developer tip: copy the query code from the cloud project to the local one | obsolete | Project Sync copies the files (`project_sync_settings.dart:502`) | |
| "We will soon release GitHub integration with cloud projects" | obsolete | shipped: `code/github.md`, Project Sync | |
| Workaround 3: test the query in the Firebase console's Firestore query builder, then build it in Nowa and run the app | added | same entry | https://firebase.google.com/docs/firestore/using-console ("Query data": **Query builder** tab, **Add to query**, **Run**) |
| Help: team@nowa.dev, community forum, Discord | covered | `account/help.md#join-the-community-and-contact-us` (linked from Next steps) | |

## Totals

(updated at the end)
