# P14-CODE-V: verification of `docs/code/generated-code.md` ("What Nowa adds to your code")

Verifier P14-CODE-V. I didn't write this page. Checked against Nowa 3.13.0 (`/home/user/nowa-master`, `3cb32031c`);
code refs are relative to that repo. Reader: the secondary reader (`docs/code/`), so code stays (R1-R2 don't apply);
R3-R9 do. Third-party steps checked against the live Codemagic, OpenSSL, Stripe and Apple pages (fetched with `curl`,
12 Oct 2026).

## Summary

- **Pages:** `docs/code/generated-code.md` (all 24 sections, every bullet and table row, about 200 claims), plus one row
  each on `docs/integrations/firebase/notifications.md` and `docs/test/problems.md`.
- **Fixed (wrong or imprecise): 13, plus 1 restored detail** (Reset main file). The serious ones: removing Stripe undoes the Android/iOS changes only if a deploy
  finished in the same session (the page said it always does); a new model's `fromJson` takes a *named* `json`
  parameter (the page showed a positional one); a theme with no color scheme gets `Color(0xFF673AB7)`, not
  `Colors.deepPurple`; turning on Deep Links writes nothing to the platform files until a rebuild; Reset main file
  also drops your global-state providers, and **Enable GoRouter** would wipe `router.dart`.
- **Added from the code (verified, useful to coders): 12** (9 new rows, 3 extended: `.nowa` files, `index.html` replaced on open, Firebase
  disconnect leaves `google_sign_in`, re-enabling an integration empties its keys, OpenSSL 3 `-legacy`, packages
  pinned on load, and others; table below).
- **Tightened:** 4 repeated passages (Info.plist trigger lists now point to one table; Variables bullet no longer
  repeats Components; Deep Links manifest bullet and cell de-duplicated).
- **Other pages:** both requested fixes applied (they hold in the code).
- **Completeness:** 23 hand-off facts spot-checked, all on the page and correct (after the fixes above).
- **Anchors and links:** 24 H2 headings with the stub's exact `{#id}`; 20 inbound anchors all present with content;
  80 relative links and 9 external links resolve.
- **Open issues:** 5, for other pages or the product (end of this file).

## Structure and links

- 24 H2 headings, each identical to the stub in `dfc926b` (diffed), `{#id}`s unchanged. No H1, no `---` rules, one
  admonition (`:::warning`), no hype words (scripted check).
- Inbound: `grep -rhoE 'generated-code\.md#[a-z0-9-]+' docs` gives 20 distinct anchors from 32 files; all exist, each
  with real content.
- Outbound: 80 relative links resolve (scripted check against target headings and `{#id}`s; 4 new in-page links:
  `#global-state`, `#components`, `#platform-files-nowa-rebuilds` x2). External: Stripe x4 (2 new), Apple x2, Android,
  Codemagic, OpenSSL (new): all HTTP 200.

## Per section

### Project files (`lib/main.dart`, `pubspec.yaml`, platform files, `.nowa`, boards/Library/Run)

| Claim | Verdict | Source | Note |
|---|---|---|---|
| New project's `main()`, `sharedPrefs` top-level, `MyApp` = `MaterialApp.router` in `MultiProvider`, theme/routerConfig | ok | `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:14-53` | |
| Start-up lines kept in `settings.json` `main`, placed between `sharedPrefs` and `runApp`; hand edits don't last | ok | `project/env_services/main_func_block.dart:15-25`, `main_service.dart:150-166` | |
| Own `main()` without `@NowaGenerated` untouched | ok | `interpreter/visitors/ast_to_block_visitor.dart:1175,1206-1211` (`_getNowaGenerated`) | writer's open question 9 confirmed |
| `Setup statement in main.dart for "<key>"...`, **Fix** re-adds | ok | `interpreter/services/problem_service.dart:65-80`, `package_config_service.dart:388-405` | |
| Start-up line table (7 rows) | ok | `firebase_package_config.dart:17,59`, `dart_package.dart:162`, `revenuecat_package_config.dart:53`, `admob_package_config.dart:24`, `stripe_package_config.dart:57`, `router_block_view.dart:557-562` | |
| Stripe `merchantIdentifier` "while Apple Pay is on" | **fixed** | `stripe_supabase_service.dart:165-180` (`_updateMerchantIdStatement`), called only from `deploy()` `:393` (`saveConfiguration` has no caller) | now "once you deploy with Apple Pay on" |
| "Firebase and Supabase start with their default settings" | **fixed** (reworded) | `main_func_block.dart:18-23` | vague; now "they all run before `runApp`, so ... ready before your first screen opens" |
| Can't delete `lib/main.dart`; missing file/`main()` → **Fix** → **Reset main file** | ok | `file_system/actions/file_actions.dart:124`, `main_problems_finder.dart:14-54` | |
| Reset writes Navigator template with `HomePage` | ok, **restored detail** | `main_problems_finder.dart:25` → `main_dart_template.dart:58-113` | added: its `MultiProvider` lists only `AppState` (re-attach other global states); switching back needs the `globals/router.dart` import; **Enable GoRouter** would replace `router.dart` with one route (`migrations/migration_service.dart:263-345`, offered when the routing service isn't GoRouter after reload, `plugin.dart:125-129`, `router_editor_actions.dart:19-57`) |
| `pubspec.yaml` table: Package Name rule, version mapping, `1.0.0+1`, assets/fonts rebuilt, `uses-material-design` | ok | `naming.dart:193-216`, `local_project_service.dart:25-28`, `pubspec_manager.dart:50-65,141-245`, `info_plist_template.dart:31-36`, `app_build_gradle_template.dart:67-68`, `pubspec_template.dart:18` | |
| Platform files table (7 files and triggers) | ok, **refined** | `permissions_service.dart:56-82`, `rename.dart:29-67`, `package_config_service.dart:66-92,107-171`, `fb_auth_manager.dart:53-90`, `fb_setup_manager.dart:68-76,260-272`, `fb_push_notifications_manager.dart:24-51`, `platform_section.dart:82-94` | added that permissions an integration turns on count (push → **Boot Completed** via `dart_package.dart:166-171`; Stripe deploy → **Camera** via `stripe_manager.dart:65-72`) |
| "Turning one of those integrations off rebuilds its files too" | ok | `package_config_service.dart:146-157` | |
| **Added:** `web/index.html` replaced on open when it doesn't use `flutter_bootstrap.js` | added | `migrations/migration_service.dart:102-124` (no version check), run on every load `plugin.dart:152` | real data-loss risk for imported projects |
| Warning: "(Nowa keeps only the permissions it finds)" | **fixed** | `permissions_service.dart:16-26,262-306` | Android: every `<uses-permission>` in the manifest; iOS: only the 9 on Nowa's list; recorded once |
| Bundle ID: pbxproj lines, macOS/Linux, Kotlin folder deletion, new `MainActivity.kt`, no `Info.plist` | ok | `rename.dart:48-67,117-125,138-148,160-223`; `file_system.dart:126-175,338-342` (`p.split` drops the trailing `/`, so a first-part change deletes `kotlin/`) | |
| External agent can't edit `Info.plist`/manifest, `set_permissions` | ok | `packages/ai/lib/src/mcp/nowa_mcp_server.dart:320-327,344-352` | |
| `.nowa` table (settings, instructions, temp + gitignore) | ok | `file_template.dart:47-49`, `nowa_settings_template.dart`, `gitignore_template.dart:14-16`, `settings_service.dart:28-38` | |
| **Added:** `.nowa/thumbnail.png` (project cover, Git-ignored), `.nowa/icon.<ext>` (app icon source) | added | `project/cover_service.dart:10-45`, `designer/lib/src/thumbnail.dart:9-31`, `designer_plugin.dart:17`, `settings/app_icon_manager.dart:163-177` | the table claimed to list what the folder holds |
| Files tree hides dot folders | ok | `lib/project/panels/files_panel/files_tree_host.dart:141`, `file_tree_controller.dart:43` | |
| Boards, loose widgets, Library actions, **Locate folder**, Run preflight messages | ok | B04 facts; `local_project_service.dart:103-107,148`, `lib/project/missing_project_folder.dart:117`, `runner/run_preflight.dart:5-113` | |

### Screens and routes, Components

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Naming dialog, `lib/pages/` / `lib/components/`, screen = `Scaffold` root, Rename/Add description/Copy/Remove | ok | `file_actions.dart:40-66`, `widget_declarations.dart:281-294`, `designer/lib/src/details/widget_details.dart:356-372` | |
| "GoRouter projects, which all new projects are" | **fixed** | `providers/projects_view_provider.dart:273-276` (GoRouter); `playground/playground_starter.dart:9-11` (**Simple app** = `createDefaultBundle`, Navigator `main.dart`) | a project saved from the Simple app playground uses Navigator; same fix in Navigation |
| Route path `/home-page`; multi-file templates start without a route | ok | `file_actions.dart:45-50`, `router_template.dart:16-31`, `services/templates/built_in/auth_template.dart:4` | |
| Navigator `routes` map: public screens in `lib/` without required params, keyed by class name | ok | `project/env_services/app_routing_service.dart:62-104` | |
| **Create component** saves in `lib/`; first variable → `StatefulWidget` | ok | `designer/lib/src/design/common_design.dart:132-170`, `widget_declarations.dart:406-415` | |

### Themes, Fonts and icons, Assets, Translations

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Themes file, `lightTheme`/`darkTheme`, `newTheme` with `Color(0xFF673AB7)`, Apply, Default Theme tab, extensions, Figma files, Create Theme Setup mismatch | ok | `themes_dart_template.dart:11-26`, `themes_panel.dart:112-123`, `theme_service.dart:115-160`, `theme_panel_details.dart:20-50`, `theme_token.dart:24-33`, `figma_mcp.dart:76-79`, `env_manager.dart:155-180`, `theme_setup_view.dart:55-63` | |
| Theme without a color scheme gets `fromSeed(seedColor: Colors.deepPurple)` | **fixed** | `theme_panel_fields.dart:40-46` uses `SimpleBlock(Colors.deepPurple)`, whose source is `Color(0x...)` (`block_tree.dart:3028-3030`, `utils.dart:170-172`) | the code reads `Color(0xFF673AB7)` |
| Google Fonts → `assets/fonts/<Font Name>.ttf`, Nowa AI font tool, declared fonts kept, icons `Icons.<name>` | ok | `fields/text_fields.dart:16-54,868`, `ai/lib/src/tools/download_font_tool.dart:4-49`, `pubspec_manager.dart:179-217`, `fields/icon_field.dart:58` | |
| Assets: upload, **Upload Image**, pasted image name, AI images in `assets/images/` | ok | `fields/asset_fields.dart:122-140,177`, `designer/lib/src/design/copy_paste.dart:111-118`, `ai/lib/src/tools/image_asset.dart:8,30`, `mcp_backend_tools.dart:105-111` | |
| `assets:` list "one entry for each folder under `assets/` that has files" | **fixed** | `pubspec_manager.dart:219-245` | `assets/` itself counts, nested folders too, any folder that isn't empty |
| Rebuilt on import / font / package add-update-remove | ok | `project_provider.dart:702-719`, `text_fields.dart:22`, `package_service.dart:249,341,352` | |
| Translations: AI refuses `flutter_localizations`, `sdk:` counts as installed and isn't loaded, delegate log message | ok | `ai/lib/src/tools/packages_tool.dart:164-171`, `package_service.dart:55-71,363-369`, `localization/localizations_class_instance.dart:44` | |

### Variables and functions, Global state, Models, Navigation, Actions

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Circuit edits code, "Function was modified..." message, await → async/`Future`, `initState` caution, drawable statements, `$` interpolation | ok | `code/lib/src/circuit_plugin.dart:66`, `code/lib/src/fields/future_options.dart:10-31`, `declaration_runtime.dart:1555-1565`, Flutter `framework.dart:5950-5960`, `nowa_run_service_local.dart:51-55`, `code/lib/src/models/block_to_circuit_visitor.dart:24-89` | |
| Variables bullet repeated the Components bullet | tightened | | now points to Components |
| Global state class shape, attach/detach, file locations, AppState, `listen: false` in functions | ok | `app_state_template.dart:13-37`, `lib/project/panels/files_panel/add_lib_menu.dart:68-76`, `global_state_widgets.dart:17-41,86-95`, `provider_generator.dart:4-17`, `provider_blocks.dart:19-43` | |
| Model members `factory TaskModel.fromJson(Map<String, dynamic> json)` | **fixed** | `declaration_runtime.dart:333-351` → `auto_blocks.dart:136-157` (`position: null` unless `usePositionalParam`), `declaration.dart:49-60` (`required`); tests `packages/core/test/interpreter_tests/lib_test.dart:2476`, `packages/data/test/api_test.dart:78,92` | it's `fromJson({required Map<String, dynamic> json})`, called `fromJson(json: data)`; Supabase table models are positional (`supabase_template_manager.dart:173`, `sb_table.dart:25-26`) |
| JSON rules, Generate Models From Json, View Code / Show in code, Supabase model naming | ok | `json_generator.dart:82-157,226-234`, `generate_models_provider.dart:13-19,130-135`, B07/B10 facts | |
| Router variable, `GoRoute`, path/query params, Router Configuration labels and defaults, GoRouter/Navigator steps | ok | `router_template.dart:14-33`, `go_router_routing_service.dart:300-345`, `router_file_service.dart:956-964`, `router_block_view.dart:540-626`, `global_state_suggestions.dart:28-53` | |
| GLOBALS / SHARED PREFERENCES steps, `NPlatform` members, `openUrl`, `showMediaPicker`, `print`, + menu categories | ok | `global_state_suggestions.dart:6-63`, `suggestion.dart:470-506`, `fields/link_menu.dart:331` (category names upper-cased), `nowa_runtime/lib/src/nowa_platform.dart:15-23`, `functions.dart:3-5`, `media_picker/media_picker.dart:4-35`, `dart_async_library.dart`, `material_library.dart:3553,60808,63873` | |

### REST APIs, Keys and constants

| Claim | Verdict | Source | Note |
|---|---|---|---|
| `lib/api/<name>.api.dart`, singleton with `Dio`/`BaseOptions`, Auth Key interceptor, uploads, models path | ok | `api/utils/api_util.dart:129-140`, `api/model/api_collection.dart:41-71`, `api/interceptors/generate_auth_interceptor.dart:4-25`, `create_collection_dialog.dart:40` | |
| "Nowa says **Invalid Postman collection format**" | **fixed** | `postman/processors/collection_processor.dart:22-32` | the message is a prefix (`...: Missing info section`) |
| `AppConstants` file, String constants, integration constants table | ok, **extended** | `app_constants_service.dart:13-53`, `package_config_service.dart:135-140`, `supabase_manager.dart:198-202` | added: the Firebase **Google** provider installs `google_sign_in`, whose setup adds `webClientId` (`fb_auth_manager.dart:66`, `dart_package.dart:44` config lookup by name, `google_sign_in_package_config.dart:37-44`) |
| **Added:** turning RevenueCat, Stripe or Google Sign-In on again empties their constants | added | `package_config_service.dart:138-140` → `app_constants_service.dart:45-52` (`update` overwrites) | writer's open question 1; deterministic code path, not run live |
| Platform keys under `packages`, **Custom Constants** label | ok | `package_config_service.dart:36-58,184-198`, `constants_settings.dart:158` | |

### Supabase, Firebase

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Connect adds package, `SupabaseService` with 4 functions, start-up line, constants; disconnect removes file/package/line, keeps the rest | ok | `supabase_manager.dart:12,142-157,186-248` | |
| Panel sorting "by what their code calls" | **fixed** | `supabase_manager.dart:250-288`, `ui/sb_outline.dart:52-63,93-105` | exact rule: `.from` without `.rpc/.storage/.realtime/.functions`; Authentication is `.auth.s`; a function matching nothing (e.g. only `.auth.resetPasswordForEmail`) isn't shown |
| Backend folder, labels, error text, what's not copied | ok | `migrations/sb_backend_bundle_service.dart:51-141`, `ui/sb_outline.dart:321,332` | |
| Firebase connect table (config files, options, `FirebaseService` + `firestore` getter, collections/queries, Gradle plugin 4.3.15, Podfile 15.0, settings) | ok | `fb_setup_manager.dart:54-145`, `firebase_manager.dart:79-103`, `firestore_collection.dart:106-113`, `firebase_package_config.dart:9-45` | |
| Auth table, URL schemes, `google_sign_in` 7.x mismatch, Authentication off | ok, **extended** | `fb_auth_manager.dart:33-151`, `fb_auth_blocks.dart:33-130,346-359`, `google_sign_in_package_config.dart:19-80` | added: turning only **Email/Password** off also leaves `sendPasswordResetEmail()` (`fb_auth_manager.dart:142-145`) |
| Firestore metadata, field types, `FirestoreService` lists | ok | `collections_manager.dart:16-79`, `query_builder_manager.dart:16-52` | |
| Push table, `initialize()` behaviour, Xcode link, no `aps-environment` | ok | `fb_push_notifications_manager.dart:24-68`, `notification_service_template.dart:25-172`, `notification_settings.dart:98-110`, `global_capability.dart:20-25` | |
| "To react when someone taps a notification, set `onNotificationTap`" | **fixed** | `notification_service_template.dart:107-113,145,151-168` | `onNotificationTap` only fires for notifications shown while the app was open; taps that open the app go to `_handleBackgroundMessage` |
| **Added:** push off leaves the background modes until `Info.plist`'s next rebuild | added | `firebase_package_config.dart:49-63` (no tokens) → `package_config_service.dart:146-157` writes no template | |
| **Added:** Disconnect Firebase leaves `google_sign_in` if **Google** was on | added | `firebase_manager.dart:158-163`: `data.fbBaseClass = null` runs before `auth.disconnectAuth()`, so `isGoogleAuthEnabled` is false and `disconnectGoogleAuth()` never runs (`fb_auth_manager.dart:28,121-140`); `onDisconnectedFromEditor` doesn't remove it (`firebase_manager.dart:179-190`) | product bug candidate |

### Stripe, RevenueCat, AdMob, Google Maps, Google sign-in, Deep links

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Stripe Enabled, settings key, secrets, no trimming, tables/functions, methods, regeneration, `testEnv`, pinned version, amounts, platform changes | ok | `stripe_package_config.dart:9-87`, `stripe_supabase_service.dart:94-206,299-325,374-500,640-900,920-932`, `stripe_edge_functions.dart:4,14-17,124,216,302,393,862`, `stripe_manager.dart:12-160` | |
| Remove Stripe: always deletes proguard, reverts styles and `MainActivity`, removes the Apple Pay key | **fixed** | `stripe_package_config.dart:80-86` runs `StripeManager.cleanup()` only if `gProject.tryGet<StripeManager>()` isn't null; `StripeManager` is registered only by the `_stripeManager` getter (`stripe_supabase_service.dart:910-931`), reached only at the end of `deploy()` (`:414-416`); services are per opened project (`project_provider.dart:191,197`) | now: undone only if a deploy finished since the project was opened; otherwise a hand checklist |
| Subscription periods | **fixed** (precision) | `stripe_edge_functions.dart:544-545,791-792,824-834`; Stripe changelogs (periods, invoices), https://docs.stripe.com/event-destinations ("Snapshot events are versioned by API version ... Events and resources that you fetch from the API still follow standard API versioning") | create/fetch calls use the pinned clover, so they never have periods; events only on pre-basil destinations; second changelog link added |
| RevenueCat table and methods, no IAP capability, off behaviour | ok | `revenuecat_package_config.dart:12-139`; no `in_app_purchase`/`InAppPurchase` in `lib/` or `packages/` | |
| AdMob table, App ID validation, banner/interstitial params and test units, off behaviour | ok | `admob_package_config.dart:11-80,269-275`, `nowa_mobile_ads/lib/nowa_mobile_ads.dart`, `nowa_ad_banner_widget.dart:5-40`, `nowa_ad_interstitial_function.dart:5-17` | |
| Google Maps keys and files, Podfile 14.0 | ok | `google_maps_package_config.dart:11-72`, `app_delegate_swift_template.dart:8-30`, `index_html_template.dart:8-53` | |
| Google sign-in fields, Firebase-managed scheme, off behaviour | ok | `google_sign_in_package_config.dart:11-109` | |
| Deep Links Enabled "switches off Flutter's built-in deep link handling" in both files | **fixed** | `app_links_package_config.dart:18-27` (static tokens) and `package_config_service.dart:107-141` (`setupPackage` writes no platform template) | written only when each file is next rebuilt; saving the fields does it |
| URL Scheme rebuilds only `Info.plist`; Host → `pathPrefix`; no Universal Links; two URL types | ok | `app_links_package_config.dart:29-113`, `package_config_settings.dart:87` (`toSet()` keeps the first `urlScheme` token), `package_config_service.dart:66-92` | manifest bullet and cell de-duplicated; two-URL-types trigger list now links to the platform files table |

### Publishing

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Web publish runs `flutter analyze`, **Analysis Failed**, **From Code Analysis**, **Run Code Check** | ok | `web_deploy/web_environment_manager.dart:117-143`, `panels/problems_panel.dart:47,501` | |
| `codemagic.yaml` workflows, **Reset to default**, Android signing config, iOS group and signing steps | ok | `file_system/codemagic_file.dart:11-125`, `widgets/code_editor/nowa_code_editor.dart:273-292`, `app_build_gradle_template.dart:38-90`, `cloud_build_v2/ui/workflow_manager.dart:660-705` | |
| `--create` behaviour | ok | B11 verifier (codemagic-cli-tools source); Codemagic page: "fetch the correct certificate ... or create a new one if necessary" | |
| Key must be PEM text starting `-----BEGIN`; binary `.p12` fails; picker lists `.p12` only; **Download Certificate** file is text | ok | `workflow_manager.dart:418-464` (`ios_distribution_certificate_key.p12`, `utf8.encode`), `file_system/encoding.dart:8-10` (`utf8.decode`), `cloud_build_v2/ui/ios_details.dart:59,95-98,151-170`, `file_picker_field.dart:77` (**Browse**) | |
| Mac steps 1-3 (Keychain Access → Export → Personal Information Exchange (.p12), empty password, `openssl pkcs12 ... \| openssl rsa -out ios_distribution_private_key`, Enter at the import password) | ok | https://docs.codemagic.io/yaml-code-signing/alternative-code-signing-methods/ ("Use an existing key") | matches word for word in substance |
| **Added:** OpenSSL 3 `-legacy` if `pkcs12` reports an unsupported algorithm | added | https://docs.openssl.org/3.0/man1/openssl-pkcs12/ ("-legacy: Use legacy mode of operation and automatically load the legacy provider ... If the legacy option is not specified, then the legacy provider is not loaded") | `openssl rsa` in OpenSSL 3 writes PKCS#8 (`-traditional` for PKCS#1, https://docs.openssl.org/3.0/man1/openssl-rsa/), which is why the page says "starts with `-----BEGIN`", not the RSA header |
| Steps 4-5 (rename to `.p12`, **Distribution Certificate** card, **Browse**, **Save**) | ok | `ios_details.dart:151-170` | |
| Export compliance, icon alpha, version numbers | ok | `info_plist_template.dart:13-62`, `launcher_icon/lib/src/ios.dart:68-80`, `app_icon_manager.dart:100-145` | trigger list replaced by a link to the platform files table |

### Packages

| Claim | Verdict | Source | Note |
|---|---|---|---|
| New project packages + `flutter_lints`; Enabled adds newest; Supabase/Firebase/widgets fixed versions | ok | `pubspec_template.dart:13-40`, `settings_widgets.dart:160-171` → `package_service.dart:129-134`, `dart_package.dart:63-200` | |
| **Added:** Nowa AI also uses the fixed version for packages Nowa has a setup for | added | `ai/lib/src/tools/packages_tool.dart:172-178` | |
| **Added:** the package setup runs on every path; `geolocator` asks in **Add Missing Dependencies**, then turns on 3 location permissions | added | `package_service.dart:211-260,274-293`, `package_config_service.dart:107-141`, `integrations/geolocator_package_config.dart:6-16`, `permissions_service.dart:141-180`; `docs/code/packages.md` already mentions the dialog | |
| `nowa_runtime` contents and dependencies | ok | `nowa_runtime/lib/nowa_runtime.dart`, `nowa_runtime/pubspec.yaml`, `core/lib/version.dart:4-5` | |
| **Added:** on every load Nowa sets `nowa_runtime` and `nowa_mobile_ads` back to its versions | added | `package_service.dart:81-120` (`resolvePackages`, "Only called on project load") | |
| Feature and widget package tables | ok | `widget_info.dart:244-690`, configs above | |
| Missing-package problem and exemptions | ok, **extended** | `package_service.dart:390-425` | added the dev-dependency variant (no **Fix**) |

## Completeness: 23 hand-off facts spot-checked

All present and correct after the fixes: B01 checkpoints in `.nowa/temp/` (Git-ignored); B01 **From Code Analysis** /
**Run Code Check**; B01 Google Pay `testEnv: true`; B02 `.nowa/assistant_instructions.md`; B02 `set_permissions`
refusal; B02 `add_image_assets` → `assets/images/`; B03 **Locate folder** needs `pubspec.yaml`; B03 verifier App Name /
Bundle ID rebuilds; B04 boards in subfolders, snake_case `.board`; B04 **Packages** chip with **workspace**; B05 Create
Theme Setup dialog mismatch; B05 declared fonts; B05 delegate "Could not load"; B06 `initState` async caution; B06
drawable statements; B07 **Show in code** / **View Code**; B07 `showMediaPicker` empty list; B08 Host `pathPrefix` and
"save any **Host** and clear it"; B09 Phone scheme only with **Google**; B09 each deploy regenerates
`StripePaymentService`; B10 **Use Existing Model**; B11 `ITSAppUsesNonExemptEncryption`; B12 Reset main file and the
missing-package problem; B13 `smooth_page_indicator` no longer in `nowa_runtime`.

Two hand-off facts were themselves wrong in 3.13 and are now corrected on this page: B09 `stripe.md` "Nowa deletes ...
the Android changes and the Apple Pay entitlement" (conditional, see Stripe) and B07's model `fromJson(Map<String,
dynamic> json)` signature (named parameter).

## Other pages

| Page / row | Change | Evidence |
|---|---|---|
| `integrations/firebase/notifications.md`, "What your app does with notifications", iPhone and iPad row | "Nowa turns on the background settings iOS needs" → added only at the next rebuild of the iOS settings file; before the first iPhone build, turn an unused iOS permission on and off in [Permissions](../../account/project-settings.md#set-permissions), or ask Nowa AI in **Agent** mode to check. Plain words, one row. | `fb_push_notifications_manager.dart:24-33` (Gradle only), Boot Completed → manifest only (`permissions_service.dart:81`); `_gatherIosBackgroundModes` at `package_config_service.dart:272,301-309`; toggling a permission rebuilds `Info.plist` with the modes (`permissions_service.dart:56-82`). An unused permission avoids resetting a custom message (a re-added permission gets the default text, `permissions_service.dart:42-50`). |
| `test/problems.md`, `Main file is not found` row | Added one sentence: in a project with routes the new file doesn't use them, so ask Nowa AI in **Agent** mode to connect them again and check with **Run**. | `main_problems_finder.dart:25`, `main_dart_template.dart:58-113` |

## Open issues (not fixed here: outside my files, or product)

1. **`integrations/stripe.md` "Remove Stripe"** says Nowa deletes "its Android changes and the Apple Pay setting". In
   3.13 that happens only when a **Deploy Configuration** finished since the project was opened (`StripeManager` is
   registered lazily, see the Stripe row). Suggest for that page: "If you haven't deployed since you opened the project,
   ask Nowa AI to undo Stripe's Android and Apple Pay changes, or see [What Nowa adds to your code](../code/generated-code.md#stripe)."
   Product bug: register `StripeManager` at load, or let cleanup create it.
2. **Disconnect Firebase leaves `google_sign_in`** (and its `webClientId` constant) when **Google** was on
   (`firebase_manager.dart:158-163`). On this page now; `integrations/firebase/connect.md` (Disconnect) could say "If
   you used Google sign-in, also turn **Enabled** off on the **Google Sign-In** page." Product bug: call
   `auth.disconnectAuth()` before nulling `fbBaseClass`.
3. **Re-enabling RevenueCat, Stripe or Google Sign-In empties their keys** (`package_config_service.dart:138-140`).
   On this page now; the plain-words pages (`integrations/constants.md`, `revenuecat.md`, `google-sign-in.md`) don't
   warn. Code reading, not run live. Product: only add a constant when it's missing.
4. **Enable GoRouter replaces `lib/globals/router.dart`** with one route (`migration_service.dart:263-345`). It's
   reachable after a Reset main file in a GoRouter project (the router service falls back to Navigator on reload).
   This page and `problems.md` now steer people to Nowa AI; `logic/router.md` ("Switch an older project to GoRouter")
   could add that it starts the routes over if a `router.dart` already exists.
5. **Push notifications don't rebuild `Info.plist`** (writer's product note 6) and Deep Links **Enabled** doesn't
   either (`setupPackage` writes no platform template): both wait for the next rebuild. Documented; product fix is to
   rebuild the files a package's tokens target in `setupPackage`.
