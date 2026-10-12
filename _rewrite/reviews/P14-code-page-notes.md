# P14 code page notes: `docs/code/generated-code.md` ("What Nowa adds to your code")

Written by the code page agent after all 15 hand-off files were final (B07, B08, B09 verifier additions and the
B03, B06, B11 verifier additions included; B07 re-read at the end, unchanged since 16:50). Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Every hand-off fact was re-checked with a grep or a read of the cited
code before it went on the page.

## Result

- Page: intro (3 sentences) + 24 H2 sections with the stub's exact headings and IDs, 21 H3s in the big sections
  (Project files, Supabase, Firebase, Stripe, Publishing). One admonition (`:::warning`, data loss in rebuilt platform
  files). No H1, no `---` rules, no hype words (scripted check). ~8,100 words: long, but it's a reference page reached by
  anchor, and each section is tables plus short bullets.
- Links: 82 relative links and anchors resolve (scripted check against the target files' headings). External links:
  Apple (Universal Links, export compliance), Android (App Links), Stripe (currencies, basil changelog), Codemagic
  (key export).
- Each section opens with one line linking to its main page ("To set it up, see ...").

## Anchors

| Anchor | Inbound links | Kept | Content from |
|---|---|---|---|
| `#project-files` | 5 | yes | B01, B02, B03 (+ verifier), B04, B07, B12, B11 (version mapping); code |
| `#screens-and-routes` | 0 | yes | B04, B05; code |
| `#components` | 1 | yes | B04, B05, B06; code |
| `#themes` | 2 | yes | B02, B05 |
| `#fonts-and-icons` | 1 | yes | B05; code (icons) |
| `#assets` | 1 | yes | B02, B05, B13; code (pubspec list rebuild, AI images) |
| `#localization` | 1 | yes | B05; code (delegates) |
| `#variables-and-functions` | 0 | yes | B06 (+ verifier), B07; routing row 2 |
| `#global-state` | 1 | yes | B04, B06; code (class shape) |
| `#models` | 1 | yes | B01, B04, B07, B08, B09, B10; code |
| `#navigation` | 0 | yes | **No hand-off facts.** Written from code (see below), because the fixed anchor set may be linked later and the router file is something every new project has. |
| `#actions-and-popups` | 1 | yes | B07; code (Media Query, Shared Preferences, `openUrl`) |
| `#rest-api` | 1 | yes | B08; code (class shape, Auth Key interceptor) |
| `#constants` | 1 | yes | B03, B08; code (which integrations add which constants) |
| `#supabase` | 5 | yes | B01, B02, B07, B08, B10; code (panel sorting) |
| `#firebase` | 3 | yes | B08, B09 (+ verifier), B12; code |
| `#stripe` | 0 | yes | B01, B09 (+ verifier); code |
| `#revenuecat` | 1 | yes | B08, B13; code |
| `#admob` | 1 | yes | B08, B13; code (`nowa_mobile_ads` API) |
| `#google-maps` | 1 | yes | B08, B13 |
| `#google-sign-in` | 1 | yes | B08 |
| `#deep-links` | 1 | yes | B08 (+ verifier); code (`pathPrefix`) |
| `#publishing` | 1 | yes | B01, B11 (+ verifier); routing row 12; code (Android signing config) |
| `#packages` | 0 | yes | B04, B05, B12, B13; code |

No anchor removed. Every anchor linked from `docs/` exists (`grep -rhoE 'generated-code\.md#[a-z0-9-]+'`, 19 distinct,
all present).

## Sources merged per section, with the checks

Duplicates merged (one statement on the page each): checkpoints in `.nowa/temp/` (B01 ai-tips, B01 ship-tips, B02);
Supabase package + `SupabaseService` with sign-in functions (B01, B08 x2, B10); model constructor/`fromJson`/`toJson`
(B01, B07, B09); `lib/pages/` vs `lib/components/` (B04, B05 x2); platform keys not in Constants (B03, B08); web
publish code check (B01, B11); Firebase reload after Connect Apps (B09 P155, B12 known-issues); upload to `assets/`
(B05, B13); widget packages (B13 media/lists/forms/navigation/index rows); AdMob/Maps/RevenueCat widget rows (B13)
into the integration sections and the widget table; `testEnv: true` (B01, B09 x2); Info.plist rebuild triggers (B03
verifier, B08 verifier).

### Project files
- `.nowa/temp/` + Git ignore: `packages/ai/lib/src/checkpoints/snapshot_db.dart:98`, `blob_storage_service.dart:18`;
  `.nowa/.gitignore` = `temp/` + `thumbnail.png` (`packages/core/lib/src/file_system/templates/common/gitignore_template.dart:5-17`),
  written by `packages/core/lib/src/project/settings_service.dart:34-38`.
- `.nowa/assistant_instructions.md`: `packages/core/lib/src/file_system/templates/file_template.dart:49`,
  `packages/ai/lib/src/assistant_options_manager.dart:129-151`.
- External agent refusal + `set_permissions`: `packages/ai/lib/src/mcp/nowa_mcp_server.dart:320-327`,
  `packages/ai/lib/src/mcp/mcp_backend_tools.dart:18-23`. Nowa AI edits any file: `edit`/`write` tools in
  `packages/ai/lib/src/agent/agent.dart:135-137` (`edit_tool.dart:7-9`, `write_tool.dart:7-10`).
- Build version/number → `version: x.y.z+n`: `packages/core/lib/src/settings/pubspec_manager.dart:60-64`; Flutter
  mapping `info_plist_template.dart:31-36`, `app_build_gradle_template.dart:67-68`; new projects `1.0.0+1`
  (`pubspec_template.dart:18`).
- Package Name rule: `packages/core/lib/src/file_system/naming.dart:193-216`, `local_project_service.dart:25-28`.
  Locate folder needs `pubspec.yaml`: `local_project_service.dart:103-107`.
- Permissions → settings.json + whole-file rebuild: `packages/core/lib/src/services/permissions_service.dart:12-26,56-82`
  (comment: regenerating "wipes everything a brownfield project has"; existing permissions are read once on load).
- App Name / Bundle Identifier rebuilds (B03 verifier): `packages/core/lib/src/project/rename.dart:29-67` (targets),
  `:117-125` (pbxproj, every `PRODUCT_BUNDLE_IDENTIFIER` line), `:138-145` (macOS), `:217-223` (Linux), `:225-272`
  (macOS/Linux/Windows names, web `<title>`).
- Boards (snake_case `.board`), loose widgets, Library rename/delete/move: B04 facts, re-checked
  `packages/designer/lib/src/actions/file_actions.dart:24,66`, `naming.dart:158-163`.
- Run preview needs `lib/main.dart` + `web/`, **Nothing to run**, **Web support is missing** / **Add web support**:
  `packages/core/lib/src/runner/run_preflight.dart:5-111`.
- B07 "starts Supabase and Firebase with default settings in main.dart": merged into the start-up line table.

### Screens and routes, Components
- B04/B05 facts re-checked: naming dialog `packages/core/lib/src/file_system/widgets/file_name_text_field.dart:175,202`;
  template target dirs `packages/core/lib/src/file_system/actions/file_actions.dart:59-66`; `pagesDir`/`componentsDir`
  `packages/core/lib/src/providers/project_provider.dart:377-379`; route on single-file screen template `file_actions.dart:47-53`.
- **Create component** saves in `lib/` (not `lib/components/`): `packages/designer/lib/src/design/common_design.dart:132-165`.
- Stateful on first variable: `packages/core/lib/src/interpreter/widget_declarations.dart:406-415`.

### Themes, Fonts and icons, Assets, Translations
- Themes (B02, B05): `themes_dart_template.dart:11-26`; new theme `fromSeed(Color(0xFF673AB7))`
  `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:110-130`; missing color scheme →
  `fromSeed(Colors.deepPurple)` `theme_panel_fields.dart:40-46`; Apply `packages/core/lib/src/project/env_services/theme_service.dart:115-160`;
  Create Theme Setup `packages/core/lib/src/project_environment/env_manager.dart:155-180` vs dialog text
  `theme_setup_view.dart:55-62` (P13, kept as one line as B05 asked); extensions `theme_class_declaration.dart:12-18`,
  `packages/core/lib/src/themes/theme_token.dart:24`; Figma files `packages/ai/lib/src/mcp/figma_mcp.dart:76-79`.
- Fonts (B05): `packages/core/lib/src/fields/text_fields.dart:17-29`; `pubspec_manager.dart:179-217` (keep declared,
  drop missing files, add undeclared); `packages/ai/lib/src/tools/download_font_tool.dart:4-49`.
- Assets (B02, B05, B13): pasted image `packages/designer/lib/src/design/copy_paste.dart:81,111-118` (board path ignores
  the web file name, always `pasted_image_<uuid>.<ext>` in `assets/`); AI images `packages/ai/lib/src/tools/image_asset.dart:8,30`,
  `save_attached_image_tool.dart:15`, MCP `add_image_assets` `mcp_backend_tools.dart:104-111`.
- Translations (B05): `packages/ai/lib/src/tools/packages_tool.dart:164-171`; `package_service.dart:363-369` (sdk
  counts as installed); `packages/core/lib/src/localization/localizations_class_instance.dart:20-46`.

### Variables and functions (routing row 2 included)
- B06 facts re-checked: `block_to_circuit_visitor.dart:9-89` (extends `ThrowingBlockVisitor`), `block_visitor.dart:114-256`;
  `circuit_plugin.dart:59-69`; `future_options.dart:10-31` + `declaration_runtime.dart:1555-1565` (no override check,
  so `initState` becomes async; Run is `flutter run` without a mode flag, `nowa_run_service_local.dart:54`).
- B07 `$` interpolation: parser handles both forms (`packages/core/lib/src/interpreter/string_interpolation_parser.dart:13-60`).

### Global state, Models
- B04/B06 facts re-checked: `add_lib_menu.dart:68-76`, `global_state_widgets.dart:17-41`,
  `provider_generator.dart:4-17`. Class shape: `provider_blocks.dart:19-43`, `app_state_template.dart:13-37`;
  provider added/removed `global_state_service.dart:55-91`.
- Models (B01, B04, B07, B08, B10): `ClassDeclImpl.model` now at `declaration_runtime.dart:333-351` (B07 cited
  `:285-309`, which moved); JSON rules `json_generator.dart:82-157,226-234`; Generate from JSON default `Root` in
  `lib/models`, path must start with `lib` (`packages/core/lib/src/model_generator/generate_models_provider.dart:13-19,130-135`);
  Supabase model naming `model_selection_view.dart:41`, `supabase_template_manager.dart:170`.

### Navigation (written from code, no hand-off facts)
- Router file and variable: `router_template.dart:14-33`; first `GoRouter` variable `router_file_service.dart:63-75`;
  `MaterialApp.router(routerConfig: appRouter)` `main_dart_template.dart:6-55`; new projects use the GoRouter bundle
  (`default_bundles.dart:43-68`, `projects_view_provider.dart:273-276`).
- Builders and parameters: `go_router_routing_service.dart:300-345` (`state.pathParameters`), query parameters
  `router_file_service.dart:956-964`; Router panel adds `GoRoute(path: '/', ...)` `router_file_service.dart:264-301`.
- Initial Location / Redirect Logic / Remove # in URLs: `packages/core/lib/src/editors/router_editor/router_block_view.dart:540-626`
  (`usePathUrlStrategy();` setup statement + `flutter_web_plugins` SDK package).
- GoRouter and Navigator steps: `packages/core/lib/src/state_management/global_state_suggestions.dart:28-53`.
- Older projects' `routes` map: `packages/core/lib/src/project/env_services/app_routing_service.dart:17-110`.
- Shell routes (`ShellRoute`, `StatefulShellRoute.indexedStack`) exist in code but their menu entries are commented out
  (`router_context_menus.dart:39,46`), so the page doesn't mention them.

### Actions and popups
- B07 facts re-checked: snackbar/checkPlatform `global_state_suggestions.dart:6-21,55-59`; `NPlatform` members
  `packages/nowa_runtime/lib/src/nowa_platform.dart:15-23`; `showMediaPicker` `media_picker.dart:4-35`; `print`
  `dart_core_library_custom.dart:3-8` → `logInfo` `packages/core/lib/src/utils.dart:19-21`.
- Added from code: Media Query (`global_state_suggestions.dart:59-63`); Shared Preferences steps call `sharedPrefs`
  (`packages/core/lib/src/interpreter/suggestion.dart:480-506`, type → method `expression_details.dart:395-482`);
  `openUrl` (`packages/nowa_runtime/lib/src/functions.dart:3-5`).

### REST APIs, Constants
- B08 facts re-checked: `.api.dart` naming `api_util.dart:130-140`, `create_collection_dialog.dart:40`; Postman
  `collection_processor.dart:23-31`; upload bytes `test_api_func_provider.dart:92-96`; models default `lib/models`
  (same dialog as Generate from JSON).
- Added from code: singleton class with `Dio _dioClient` and `BaseOptions` (`api_collection.dart:41-71`); request return
  type `Response` or model (`request_func.dart:36-38,79`); Auth Key interceptor in the private constructor reading
  `sharedPrefs.getString('<Auth Key>')` (`generate_auth_interceptor.dart:4-25`, `api_edit_collection_dialog.dart:88-90`;
  the `_NOWAGENERATED` suffix at `request_func.dart:396` is only for the editor's test request).
- Constants (B03, B08): `app_constants_service.dart:13-53`; Dart-only tokens → `AppConstants`, platform tokens →
  `settings.json` `packages.<name>` (`config_token.dart:117-122`, `package_config_service.dart:36-58,184-198`); setup adds
  empty constants (`package_config_service.dart:135-139`); Supabase sets its two on connect (`supabase_manager.dart:198-202`);
  **Custom Constants** label `constants_settings.dart:158`.

### Supabase
- B10 facts re-checked: `packages/data/lib/src/supabase/supabase_manager.dart:12,138-157,186-237`; backend bundle
  `sb_backend_bundle_service.dart:55-58,104-141` (error text quoted on the page: "has no migration history, so its schema
  cannot be captured").
- Added from code: panel sorting by called API (`supabase_manager.dart:243-280`, `sb_outline.dart:56-105`).

### Firebase
- B09 facts re-checked: `fb_setup_manager.dart:56-160,268-290`; `firebase_manager.dart:41,79-120,163-202`;
  `firebase_package_config.dart:9-63` (start-up line, Gradle plugin lines, `cloud_firestore` 15.0, desugaring,
  background modes); `fb_auth_manager.dart:33-151`; `fb_auth_blocks.dart:101-130` (`GoogleSignIn().signIn()`),
  `:345-360` (`sendPasswordResetEmail` uses `FirebaseAuth.instance`); collections/queries
  `collections_manager.dart:16-79`, `query_builder_manager.dart:16-52`, `firestore_collection.dart:106-121`;
  notifications `fb_push_notifications_manager.dart:24-68`, `notification_settings.dart:98-110`.
- Added from code: `NotificationService` behaviour (`notification_service_template.dart:25-172`: permission, channel
  `high_importance_channel`, `fcmToken`, topic `all`, `onNotificationTap`, empty `_handleBackgroundMessage`); Boot
  Completed permission from `flutter_local_notifications` (`dart_package.dart:168-172`, kept on cleanup:
  `package_config_service.dart:145-170` removes no permission).

### Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, Deep links
- B09 facts + verifier additions re-checked: `stripe_package_config.dart:9-87`; `stripe_supabase_service.dart:94-206`
  (settings, merchant statement), `:299-312` (no trimming), `:353-428` (deploy), `:430-500` (tables/functions,
  `_currencyCode` lowercases a fixed currency), `:511-566` (member regeneration), `:640-860` (methods,
  `testEnv: true`), `:915-932` (platform settings at deploy end); `stripe_manager.dart:12-140`;
  `stripe_edge_functions.dart:4,14-17,124,216,302,393,544-545,786-836,862`; secrets `stripe_settings.dart:538,553`.
- B08 facts re-checked: `revenuecat_package_config.dart:12-127`; `admob_package_config.dart:11-60`;
  `google_maps_package_config.dart:11-73`; `google_sign_in_package_config.dart:11-95`; `app_links_package_config.dart:7-118`.
- Added from code: `nowa_mobile_ads` exports `google_mobile_ads`, banner/interstitial parameters and Google test units
  (`packages/nowa_mobile_ads/lib/nowa_mobile_ads.dart`, `nowa_ad_banner_widget.dart:5-40`,
  `nowa_ad_interstitial_function.dart:5-17`); App ID validation `admob_package_config.dart` `_validateAppId`; Host path
  prefix → `android:pathPrefix` (`app_links_package_config.dart:96-118`); no In-App Purchase capability anywhere (grep
  for `InAppPurchase`/`in_app_purchase` in `lib/` and `packages/`: no match).

### Publishing (routing row 12 included)
- B01/B11 facts re-checked: `web_environment_manager.dart:117-140` (`Analysis Failed`); `problems_panel.dart:12-18,45-48`;
  `codemagic_file.dart:11-125`; `nowa_code_editor.dart:273-292`; `workflow_manager.dart:300-330,418-464,490-505,665-705`;
  `ios_details.dart:151-156`; `encoding.dart:8-10`; `app_icon_manager.dart:105-142`, `launcher_icon/lib/src/ios.dart:68-80`.
- Mac key steps re-checked against the Codemagic page today (fetched 12 Oct 2026): Keychain Access → Export → Personal
  Information Exchange (.p12), empty password, `openssl pkcs12 -in IOS_DISTRIBUTION.p12 -nodes -nocerts | openssl rsa -out ios_distribution_private_key`,
  press Enter at the import password prompt.
- Added from code: Android release signing config (`app_build_gradle_template.dart:70-90`: `CI` → `CM_*` env and
  `$CM_BUILD_DIR/codemagic.keystore`; otherwise `android/key.properties`).

### Packages
- B04/B12/B13 facts re-checked: `package_service.dart:390-430` (missing-package problem and Fix → `addPackageByName`);
  widget dependencies `widget_info.dart:249-686`, `swiperController` `:471`, `pinCode` `:508`.
- Added from code: new project packages + `flutter_lints` (`pubspec_template.dart:13-40`); `nowa_runtime` exports and
  dependencies (`packages/nowa_runtime/lib/nowa_runtime.dart`, `pubspec.yaml`, confirmed against pub.dev's published
  0.2.0 today).

## Facts corrected or dropped

| Hand-off fact | What changed | Why (code ref) |
|---|---|---|
| B09 auth.md: "**Google** and **Phone** also add the iOS settings they need, a URL scheme in `Info.plist`." | Corrected (B09 verifier): Phone's `app-...` scheme is written only while **Google** is on. | `google_sign_in_package_config.dart:19-25,57-79`; tokens gathered only from installed packages `package_config_service.dart:218-238`; `fb_auth_manager.dart:66,72-83`. Matches `auth.md:66` today. |
| B09 notifications.md: "Nowa adds the `fetch` and `remote-notification` background modes." | Corrected timing: the modes reach `Info.plist` only at its next rebuild. Turning push on rebuilds the Gradle file and (through the Boot Completed permission) the Android manifest, not `Info.plist`. | `fb_push_notifications_manager.dart:24-33`; `_gatherIosBackgroundModes` `package_config_service.dart:262-266,301-309`; every `Info.plist` writer: `fb_auth_manager.dart:87`, `permissions_service.dart:81`, `rename.dart:37`, `package_config_service.dart:86,153`. See "For other pages". |
| B12 problems.md: **Reset** "writes a new `lib/main.dart` with the default setup" | Made precise: it writes the Navigator template (`MaterialApp` + `routes`, `HomePage` from `lib/pages/home_page.dart`), not the GoRouter template new projects get. | `main_problems_finder.dart:25` → `MainDartTemplateSimpleRouting` (`main_dart_template.dart:58-113`); new projects `createGoRouterBundle` (`default_bundles.dart:43-68`). |
| B11: key must be PEM "(`-----BEGIN RSA PRIVATE KEY-----`)" | Softened to "PEM text that starts with `-----BEGIN`". | Nowa only requires UTF-8 text (`encoding.dart:8-10`, `workflow_manager.dart:418-440`); OpenSSL 3's `openssl rsa` writes a `BEGIN PRIVATE KEY` header by default, so the RSA header isn't guaranteed and Nowa doesn't check it. |
| B11: "People who code can add [`ITSAppUsesNonExemptEncryption`]." | Kept, with a caveat that Nowa rebuilds `Info.plist` whole, so the key can disappear. | `info_plist_template.dart:8-62` (whole file), triggers as above. |
| B08 RevenueCat: "switches the Android `MainActivity` to a `FlutterFragmentActivity`" | Made precise: rewrites `MainActivity.kt` from the template, which new projects already have. | `revenuecat_package_config.dart:66-69`, `main_activity_template.dart:17-30`, `default_bundles.dart:116-117`. |
| B08/B09 "makes sure the iOS minimum version is at least 14.0 / 15.0" | Made precise: `platform :ios, '<highest>'` in `ios/Podfile`. | `podfile_template.dart:9-13`, `package_config_service.dart:131-136,320-330`. |
| B09 "the Android build files updated for Firebase", "desugaring" | Made precise with the exact Gradle lines. | `firebase_package_config.dart:21-31`, `global_capability.dart` (`androidDesugaring`), `app_build_gradle_template.dart:36-54`. |
| B07 "The library categories list functions and classes that have static members." | Refined: also singletons (static `_instance` + factory), which is why `SupabaseService` and API collections show up. | `packages/core/lib/src/interpreter/suggestion.dart:636-692`. |
| B09 "Turn Authentication off ... Delete it in code mode if you don't need it." | Strengthened: the leftover `sendPasswordResetEmail()` calls `FirebaseAuth.instance`, so it breaks the build once `firebase_auth` is removed (as `auth.md:143` already says). | `fb_auth_blocks.dart:354-358`, `fb_auth_manager.dart:121-145`. |
| B13 YouTube Player "Nowa adds it at `^9.1.3`" and other versions | Versions left off the page. Correct for widget dependencies, but the integrations' **Enabled** switches add the newest pub.dev version, so a version column would mislead. The page says which kind of version each path adds. | `settings_widgets.dart:160-171` → `package_service.dart:129-134`; widget path `dependency.dart:24` with config versions `dart_package.dart:63-200`. |
| B05 context: Google Button template's own path `lib/google_button.dart` | Dropped (internal, the naming dialog overrides it). | `file_actions.dart:59-66`. |
| B04 Library search details ("one press of ↓ reaches **Button**", details card) | Only the code fact kept (**CustomButton** comes from `nowa_runtime` and is listed first); the keyboard steps stay on `add-widgets.md`. | — |
| B04 "**Open** ... Nowa's own widgets and Flutter's have no file" and other Library UI rows | Not repeated; the page summarises what Library actions do to files and links `files.md`. | — |

Nothing in the hand-offs was found wrong beyond the rows above.

## Open questions and product notes

1. **Re-enabling an integration may wipe its keys.** `setupPackage` calls `AppConstantsService.update(key, '')` for each
   Dart-only token (`package_config_service.dart:135-139`), and `update` overwrites an existing constant
   (`app_constants_service.dart:45-53`). Turning RevenueCat, Stripe or Google Sign-In off and on again would reset their
   keys to empty. Code reading, not run; not on any page. Worth a live check and a product issue.
2. **Reset main file uses the Navigator template** in GoRouter projects (`main_problems_finder.dart:25`). The page tells
   coders how to switch back; product candidate.
3. **Bundle ID change deletes the shared Kotlin folder** (`rename.dart:175-200`), including any other Kotlin sources, and
   rewrites `MainActivity.kt`. On the page; product candidate (a brownfield project with platform channels loses code).
4. **Removing Stripe reverts `MainActivity` to `FlutterActivity`** even when RevenueCat (or a new project's template)
   wants `FlutterFragmentActivity` (`stripe_manager.dart:52-63`). The page tells coders to check; product candidate.
5. **Phone-only Firebase auth gets no iOS URL scheme** (already on `auth.md:66`; B09 verifier). Product issue.
6. **Push background modes wait for the next `Info.plist` rebuild** (see the correction row). Product issue: turning push
   on should rebuild `Info.plist`.
7. **Google Maps web script** uses `callback=initMap` but no `initMap` is defined (`google_maps_package_config.dart:70-73`).
   Probably a harmless console error; not checked live, not on the page.
8. **Stripe `minAndroidSdkVersion: 23`** is declared but nothing reads it (`stripe_package_config.dart:17`; only
   declarations match `minAndroidSdkVersion`). Not on the page.
9. **Hand-written `main()`** gets no start-up lines: `MainFuncBlock` is used only for a `main` with metadata
   (`ast_to_block_visitor.dart:1206-1211`) and is the only writer of setup statements (`main_func_block.dart:14-34`).
   Code reading; worded on the page as "Nowa adds start-up lines only to its own `main()`".
10. The page is ~8,100 words. If it needs splitting later, the natural cut is "Project files" + design sections,
    logic sections, and integrations + publishing into three pages, keeping every anchor on the page that holds it.

## For other pages (not edited)

- `integrations/firebase/notifications.md` ("What your app does with notifications" table, iPhone row): "Nowa turns on
  the background settings iOS needs" is true only after `Info.plist` is next rebuilt. Proposed: "Nowa adds the background
  settings iOS needs the next time it rebuilds your iOS settings file, for example when you change an iOS permission, so
  change one (or ask Nowa AI to check) before your first iOS build." Evidence: correction row above.
- `test/problems.md` (Reset main file row) could say the reset file uses the older Navigator setup in GoRouter projects;
  evidence: open question 2.
