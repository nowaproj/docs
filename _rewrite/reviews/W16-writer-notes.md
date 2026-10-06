# W16 writer notes: Integrations, Firebase (connect, auth, firestore, notifications)

Writer batch W16. Sources: `research/features-data.md` (Firebase section, lines 453-573), spot-checked against
`/home/user/nowa-master` (v3.12.5). Paths are relative to the product repo root unless noted. Old pages
(`old-docs/data-connections/firebase/*`) were V1 videos only and were not used for any step or label.

## Page: `docs/integrations/firebase/connect.md`

Code refs behind the key claims:
- Path **Settings** → **Integrations** → **Firebase**: `packages/core/lib/src/settings/settings.dart:6` (categories general/integrations/deployment), `packages/data/lib/src/firebase/firebase_settings.dart:11-30` (page name `Firebase`, category integrations), `packages/data/lib/src/firebase/firebase_plugin.dart:70` (added in `load()`); gear tooltip **Settings** + Ctrl/Cmd+, : `packages/nowa_ui/lib/top_bar/top_bar_view.dart:754`, `lib/project/top_bar.dart:154-156`, `lib/setup_general_actions.dart:33`.
- Screen order (sign-in → connected → projects) and "Google sign-in remembered": `firebase_settings.dart:37-53` (`firebase-token` checked first), `packages/data/lib/src/firebase/firebase_manager.dart:140-144,174-177`, token is app-wide (`packages/core/lib/src/services/shared_preferences_services.dart`), 401 from any Firebase API call signs the user out: `packages/data/lib/src/firebase/firebase_api_service.dart:60-63`.
- **Continue with Google** / **Connect Firebase**: `setup/views/sign_in_with_google.dart:43,76`. Web popup / desktop browser: `packages/core/lib/src/services/auth/auth_web.dart:10-31`, `auth_io.dart:14-71`.
- **Projects** cards, empty state text, **Reload Projects**: `setup/views/fb_projects.dart:41-70`.
- **Apps** list texts, **Connect Apps**, error banner (two spaces in "you  have", copied exactly), app matching (Android namespace == package name; iOS bundle ID from the same identifier camel-cased per segment; Web by display name containing app name and "nowa"): `setup/views/fb_apps.dart:89-197`; created app names "<App name> (Android)-nowa" etc.: `firebase_api_service.dart:91-96`.
- What Nowa writes on connect: `setup/fb_setup_manager.dart:38-94,112-154` (google-services.json, GoogleService-Info.plist, firebase_options.dart; `currentPlatform` web/android/ios+macOS, else null), `firebase_manager.dart:78-101,103-106` (`FirebaseService` in `lib/firebase/firebase.dart`, `firestore.loadFiles()` creates collections.dart and queries.dart, packages firebase_core + cloud_firestore always), `packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:9-45` (main.dart line `Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform)`, google-services Gradle plugin tokens), `firestore/collections_manager.dart:29-45`, `firestore/queries_builder/provider/query_builder_manager.dart:35-52` (both files start empty).
- Bundle Identifier is what Firebase uses (not "Package Name"): `fb_setup_manager.dart:33` (`appNameService.model.bundleId`), `packages/core/lib/src/settings/project_detail_settings.dart:99-150` (**Bundle Identifier** editable) vs `:152-234` (**Package Name** read-only, Flutter package).
- Connected page sections/order: `setup/views/connected_main_screen.dart:64-219` (note FCM block comes before the Providers list).
- **Refresh/Update apps and config files**: `connected_main_screen.dart:45-52,95-98` (re-reads project, `createSetup` with the stored app IDs, no app creation). Problem text and **Navigate**: `firebase_plugin.dart:92-118`, `research/features-editor-shell.md:278`.
- **Disconnect Project** dialog texts and effects: `setup/views/disconnect_dialog.dart:46-86`, `firebase_manager.dart:158-196`.
- Nowa AI refuses `firebase_core`: `packages/ai/lib/src/tools/packages_tool.dart:155-163`.
- Windows limitation link target: `../../troubleshooting/known-issues.md#firebase-on-windows` (W14).

Left out / reduced:
- Storage and Realtime Database: one sentence saying there are no visual tools (research found no UI; `storageBucket`/`databaseURL` are only written into `firebase_options.dart`).
- Google OAuth scopes (`firebase`, `cloud-platform`, `firebase_manager.dart:146-156`): not named in the page ("approve the request in the Google window").
- `cloud_firestore` raising the iOS minimum to 15.0 (`firebase_package_config.dart:44`): internal detail.
- The sign-in screen's unrelated sentence ("Only the project owner can add, modify and remove members...", `sign_in_with_google.dart:34`) is a copy bug; not mentioned; any capture of that screen should crop it out.

Assumptions and open questions:
- **Refresh does not create or rename Firebase apps.** The real `FirebaseApiService` has no update/patch call (`firebase_api_service.dart:14-47`) and `createSetup` reuses the stored app IDs. The research said refresh "regenerates the Firebase apps/config; fixes the package-name mismatch"; the test comment at `packages/data/test/firebase/firebase_test.dart:98` ("must make the problem disappear and change the package name in firebase") suggests the team expects more than the code does. The page says only what the code does and tells users to disconnect/connect again for a new identifier (inference from `fb_apps.dart:177-197`). Verify in the running app.
- Possible product issue: the iOS app is registered with a bundle ID built by camel-casing each segment (`firebase_api_service.dart:101-103`, `fb_apps.dart:178`), but the Xcode project uses the **Bundle Identifier** unchanged (`packages/core/lib/src/project/rename.dart:117-121`). Default identifiers contain upper-case letters (`packages/core/lib/src/file_system/naming.dart:247-251`), so the two can differ in case. Not documented.
- After a 401, the Firebase page returns to **Continue with Google** while the project stays connected (documented). Token lifetime is not stated anywhere in code; the page does not give one.
- The "approve the request in the Google window" step: on desktop the code opens the default browser (`auth_io.dart:61-69`); in the web app Google's authorization popup (`auth_web.dart:24-31`).
- Capture placeholders: connect-1, connect-2 (both `needs-sign-in`, in `captures/requests/W16.md`).
