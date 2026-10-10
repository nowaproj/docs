# W17 writer notes: Connect data and services (Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, Deep Links)

Source of truth: `/home/user/nowa-master` (v3.12.5). Main research: `research/features-data.md` (sections "Stripe", "RevenueCat", "AdMob", "Google Maps", "Google Sign-In", "Deep Links", "Add Missing Dependencies", "Constants"). Code refs are relative to `/home/user/nowa-master`. I opened the code for every integration page; the research was right except where noted under each page.

Shared facts used on several pages (all verified in code):
- Integration pages sit under Settings → Integrations. The top-bar gear has tooltip **Settings**, shortcut Ctrl/Cmd+`,` (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:754`, `lib/project/top_bar.dart:154`). Sidebar category names are the capitalised enum names **General**, **Integrations**, **Deployment** (`packages/core/lib/src/settings/settings.dart:106`, `:118`). Page names are the config `displayName` (`packages/core/lib/src/settings/project_settings.dart:33-40`).
- Generic integration page (AdMob, Google Maps, RevenueCat, Deep Links, Google Sign-In): header + description, **Enabled** switch (adds or removes the package), then **Configuration** with one text field per visible token (`packages/core/lib/src/interpreter/packages/package_config/package_config_settings.dart:87-105`, `:130-160`; `packages/core/lib/src/settings/settings_widgets.dart:149-190`).
- Fields save on Enter or the send icon (tooltip **Submit**), a check mark shows for 4 s, validation errors show under the field, **Reset** restores the saved value (`packages/core/lib/src/fields/nowa_fields.dart:1150-1263`).
- "Platform" tokens (Android/iOS/web files) are stored in `settings.json` and written into the platform files on every save. "Dart-only" tokens (no `applyTo`) are stored in `lib/globals/app_constants.dart` and show on the **Constants** page in a section named after the integration (`packages/core/lib/src/interpreter/packages/package_config/config_token.dart:122`, `package_config_service.dart:36-80`, `packages/core/lib/src/settings/constants_settings.dart:53-100`). Turning **Enabled** off runs `cleanupPackage`: it removes the token values from `settings.json`, regenerates the platform files, removes generated files and `main.dart` statements (`package_config_service.dart:146-170`).
- The integration widgets are found by searching the widget picker (Ctrl/Cmd+K, or the **Widget** tool; search hint "Search for a widget"): `packages/designer/lib/src/designer_setup.dart:48`, `packages/designer/lib/src/widgets/designer_tools.dart:174`, `packages/core/lib/src/widgets/widget_picker.dart:131-146`. Choosing a widget whose package is missing opens **Add Missing Dependencies** (`widget_picker.dart:199`, `:408`; dialog `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart`).
- Coverage note: the research says "Widgets panel → **Integrations** → widget". The **Integrations** category exists only in `widgetCategories` (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:69-79`), which is rendered by `WidgetPicker`; the only place that builds `WidgetPicker` is `ToolBoxPanel` (`packages/designer/lib/src/panels/tool_box_panel.dart:6`), which nothing references. So I do not mention an **Integrations** category in the pages.

## stripe.md (Accept payments with Stripe)

Research: features-data.md "Stripe (Settings → Integrations → Stripe)" (lines 623-642), "Constants", "Connect (Supabase)", "Use Keys (Supabase)", Open questions (Stripe with Use Keys, MCP wording).
Code refs for key claims:
- Page layout and order (API Keys, Purchase Types, Secret Key / Webhook URL / Webhook Secret, 2. Payment Methods, 3. Business Table, 4. Map Fields, Deploy Configuration) and the banner "Connect to Supabase to configure backend settings, secrets, and deploy edge functions.": `packages/core/lib/src/integrations/stripe/stripe_settings.dart:84-139`. Purchase type texts `:174-182`; Business Table `:213-295`; payment methods `:297-342`; map fields and currency `:344-455`; API keys `:457-519`; secret and webhook `:521-599`; deploy button, red error box, "Deployed successfully!" `:601-656`.
- Default One-Time, at least one type stays selected, currency default From Column / USD: `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:26`, `:40-44`, `:267-276`.
- Deploy enabled rule: `stripe_supabase_service.dart:333-345`. Deploy steps and what is created: `:374-493`; table names `packages/core/lib/src/integrations/stripe/stripe_edge_functions.dart:4`, `:216`, `:393`; function slugs `stripe_supabase_service.dart:410`, `:441`, `:462`, `:483`, `:490`.
- Secrets saved as Supabase secrets, not in the app: `stripe_settings.dart:537`, `:552`. Merchant Name, Country Code, Publishable Key go to constants (Dart-only tokens): `packages/core/lib/src/interpreter/packages/integrations/stripe_package_config.dart:19-45`; `Stripe.publishableKey = AppConstants.stripePublishableKey;` is added to `main.dart`: `:54-60`.
- Webhook URL `https://<ref>.supabase.co/functions/v1/stripe-webhook`: `stripe_settings.dart:559-561`. Events handled: `stripe_edge_functions.dart:806-828`. Statuses `pending` / `succeeded` / `failed`: `:147`, `:729`, `:744`, `:761`, `:776` (the webhook flips the status, so a missing webhook leaves payments `pending`).
- Amount x 100: `stripe_edge_functions.dart:124`, `:302`. The function reads your table with the anon key plus the caller's JWT, so row-level security applies: `:33-41`, `:89-98`. Only `recordId` comes from the app. Errors quoted: `:52` ("User must be authenticated to make payments"), `:68` ("Payment already completed for this order"), `stripe_supabase_service.dart:682` ("User not authenticated").
- Generated methods and the OneTime/Consumable prefix rule: `stripe_supabase_service.dart:646-836`. `cancelSubscription` cancels at period end: `stripe_edge_functions.dart:667-672`.
- Platform changes: Android min SDK 23 (`stripe_package_config.dart:17`), `FlutterFragmentActivity` (`packages/core/lib/src/file_system/templates/android/main_activity_template.dart:28-30`), theme and ProGuard (`packages/core/lib/src/integrations/stripe/stripe_manager.dart:12-17`, `:119-164`), Apple Pay entitlement and iOS Camera permission (`stripe_manager.dart:65-76`, `:102-118`; `stripe_supabase_service.dart:920-932`).
- Turning **Enabled** off: `stripe_package_config.dart:63-87`, `stripe_manager.dart:21-38` (no Supabase calls, so nothing is removed from Supabase).
- Google Pay `testEnv: true`: `stripe_supabase_service.dart:846-852` (same on dev).
Left out and why:
- The old page's 9-event list (`payment_intent.canceled`, `processing`, ...): the deployed function only handles the events in the table. The old "Supabase MCP must be enabled" requirement and the `type` / name / price column advice: the code needs Supabase authorization (**Connect**), not MCP, and only an ID, an amount and (optionally) a currency column.
- The first banner "Stripe integration requires Supabase to be configured. Please connect to Supabase first." (`stripe_settings.dart:74-77`): `SupabaseManager` is always registered at plugin init (`packages/data/lib/src/supabase/supabase_plugin.dart:21`), so it is effectively unreachable.
- Stripe Dashboard and Apple Developer steps: kept to links (docs.stripe.com keys, webhooks, apple-pay, google-pay, testing; Supabase RLS guide). I did not fetch those URLs (no external fetching); they are standard vendor docs paths worth a link check.
Assumptions:
- "**Use Keys** is not enough": by code, Stripe's secrets, migrations and function deploys go through Nowa's Supabase proxy with the OAuth grant created by **Connect** (`packages/data/lib/src/supabase/supabase_oauth_service.dart:104-215`); a keys-only connection never creates that grant. Not tested in the app.
- In Circuit, `StripePaymentService` should appear in the project's own library category as a class with static members (features-logic.md "All nodes for this circuit"); I told readers to search for it instead of naming the category.
- "Test on a device or emulator": the payment sheet is a native plugin. I did not claim that Instant Play cannot run it.
Open questions / possible product issues (candidates for `product-issues.md`):
1. `stripe-cancel-subscription` source contains `.order('created_at', ascending: false)` (`stripe_edge_functions.dart:659`), which is not valid TypeScript (Dart-style named argument). The function may fail to bundle and deploy, and **Deploy Configuration** can still report success because `SupabaseOAuthManager.applyMigration` / `deployEdgeFunction` / `setSecret` catch errors without rethrowing (`packages/data/lib/src/supabase/supabase_oauth_manager.dart:125-209`) and the Stripe service (own `SupabaseOAuthManager`, `stripe_supabase_service.dart:20`) never reads that manager's `error` field. I documented `cancelSubscription()` as designed and told readers to check the dashboard after deploying. Needs a runtime check. Same code on dev.
2. Google Pay is generated with `testEnv: true` (same on dev). Documented as "change it before you publish".
3. The Secret Key / Webhook Secret fields show a check mark even if saving the secret failed (same swallowed-error reason).
4. Stripe deploy switches on the iOS **Camera** permission (`stripe_manager.dart:65-76`); reason unknown (likely card scanning). Mentioned without a reason.
Coverage notes (not in pages.md): generated-method table, troubleshooting table, webhook status behavior, removing Stripe and the row-level-security requirement were added because users hit them.
Media: reused the old Supabase dashboard screenshot `static/img/stripe/supabase-tables.png` as `static/img/docs/integrations/stripe-supabase-tables.png` (third-party console, table names match the code). Not reused: `enable-stripe.png` and `map-fields.png` (old Nowa UI, v3.7), `product-table.png` (not needed). Capture requests: `integrations-stripe-1` (playground can show it), `integrations-stripe-2` (needs-sign-in).

## revenuecat.md (In-app purchases with RevenueCat)

Research: features-data.md "RevenueCat (Settings → Integrations → RevenueCat) and RevenueCat Paywall" (lines 644-658), "Add Missing Dependencies", "Constants".
Code refs:
- Page name, description, labels **Apple API Key** / **Android API Key** / **Web API Key**, placeholders (`appl_`, `goog_`, `strp_`), iOS minimum 14.0: `packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart:14-48`. Package `purchases_flutter`: `:13`.
- `main()` line `await RevenuecatService().configureRevenuecat();`: `:53`. Generated `lib/integrations/revenuecat_service.dart` on package add: `:59-61`. Key chosen by platform (iOS / Android / web): `:87-93`. `fetchOfferings()` returns `Offerings?` (null on error) `:100-108`; `purchasePackage(PurchaseParams)` `:110`. Android `MainActivity` rewrite on enable: `:64-70`; template writes `FlutterFragmentActivity`: `packages/core/lib/src/file_system/templates/android/main_activity_template.dart:28-30`.
- Keys are Dart-only tokens (no `applyTo`), so they go to `AppConstants` and show under **Constants** in a **RevenueCat** section: `packages/core/lib/src/interpreter/packages/package_config/config_token.dart:122`, `package_config_service.dart:78-80`, `constants_settings.dart:75-85`.
- Paywall widget: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:916-926` (inserts `PaywallView()` with no arguments). Needs `purchases_flutter` and `purchases_ui_flutter`: `revenuecat_package_config.dart:117-137`, `packages/core/lib/src/interpreter/packages/dart_package.dart:169`. Placeholder texts "RevenueCat Paywall" / "Run to preview" (board) and "Run on a simulator/emulator or mobile device to preview" (Play): `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:28-46`, `:62-70`.
- Turning **Enabled** off: removes the package, deletes generated files flagged `deleteOnRemove` (default true, `generated_file.dart`) and the `main()` statement (`package_config_service.dart:146-170`). The `MainActivity` change and the constants are not reverted by this code path (not mentioned on the page).
Left out and why:
- No properties are documented for the paywall widget: it is inserted as an unresolved `PaywallView` reference without a Nowa library, so I could not confirm any **Details** fields.
- Which offering or paywall design is shown: that is RevenueCat-side; I only link their docs (root URL, not fetched).
- Platforms other than iOS, Android, web: the generated service only configures those three (`:87-93`); I wrote "add a key for every platform you test or ship" instead of listing unsupported ones.
Assumptions / open questions:
- The generated service passes the platform key to `Purchases.configure` whenever it is not null; an empty constant (key not entered) is still a non-null string, so the SDK may be configured with an empty key. I only advised adding a key per platform; the real behavior needs a device test.
- `purchases_flutter` is listed as "visually editable" in the AI packages tool (`packages/ai/lib/src/tools/packages_tool.dart:28`), but the config has no library, so I did not describe any RevenueCat Circuit nodes.
Coverage notes: none beyond pages.md. Capture request: `integrations-revenuecat-1` (playground can show it once the widget is added; may need packages loading, so it could fail offline).

## admob.md (Show ads with AdMob)

Research: features-data.md "AdMob (Settings → Integrations → AdMob) and Admob Banner" (lines 660-674), "Add Missing Dependencies".
Code refs:
- Page name **AdMob**, description (including the "only one platform" warning), package `nowa_mobile_ads`, `main()` line, labels **Android App ID** / **iOS App ID**, targets (Android manifest application / iOS `Info.plist` with SKAdNetwork items), validation `App ID should start with "ca-app-pub-"`: `packages/core/lib/src/interpreter/packages/integrations/admob_package_config.dart:12-47`, `:57-63`, `:268-273`.
- **Details** fields for the banner: "No API Keys" + **AdMob setup**; **AdMob Android setup** / **AdMob IOS setup** when one App ID is missing; **Android Unit ID**, **Ios Unit ID**, **Show Test Ads**: `admob_package_config.dart:277-338` (labels are the camel-case parameter names split into words, `packages/core/lib/src/utils.dart:77-79`). The widget is inserted with `showTestAds: true`: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:836-851`. Widget picker entry name **Admob Banner**: `:846`.
- Banner behaviour: Google test unit IDs while `showTestAds`, otherwise the platform's unit ID; messages "This is an editor preview for Admob" (not Android/iOS), "no adUnitId", "BannerAd failed to load"; standard banner size: `packages/nowa_mobile_ads/lib/src/widgets/nowa_ad_banner_widget.dart:5-10`, `:26-37`, `:70-84`.
- `loadAndShowInterstitialAd({androidUnitID, iosUnitID, showTestAds = true})`: `packages/nowa_mobile_ads/lib/src/widgets/nowa_ad_interstitial_function.dart:5-35`; registered as a library function `packages/core/lib/src/interpreter/libraries/admob_library.dart:8`, `:190-202`. It uses `Platform.isAndroid` / `isIOS` and an empty unit ID elsewhere.
- Missing package dialog for the banner: `admob_package_config.dart:341-353` (`AdmobWidgetInfo.dependencies`).
- Turning **Enabled** off: `package_config_service.dart:146-170` (removes token values, platform snippets, the `main()` statement).
Left out and why:
- Where the Circuit category of the interstitial function appears (probably named after the package): I tell readers to search for the function name, which works across categories.
- The old URL `https://docs.nowa.dev/ui/widgets/widget-desc/admob-banner` is opened by the widget picker's "Open Documentation." link (`widgets_to_add.dart:844`); D13 requires it to keep resolving. It should redirect to `/integrations/admob` (orchestrator task). The page does not mention it.
- Consent forms / user messaging platform (the library exposes consent typedefs, `admob_library.dart:10-60`): not user-facing in the visual editor, not documented.
- iOS **User Tracking** permission exists in **Permissions** but nothing ties it to AdMob in code, so I did not mention it.
Assumptions / open questions:
- "Real ads only in Android or iOS app": by the platform checks above. Whether Nowa's own mobile app (iOS/Android) shows live ads on its board is not verified; I wrote "the board, Play, a browser or a desktop app".
- The Settings page keeps the App IDs in `settings.json` (platform tokens), not in **Constants**.
Coverage notes: added the "what the banner shows" table (messages are in code) and the go-live checklist. Capture requests: `integrations-admob-1`, `integrations-admob-2`.

## google-maps.md (Add Google Maps)

Research: features-data.md "Google Maps (Settings → Integrations → Google Maps)" (lines 676-689), "Add Missing Dependencies"; What's New 3.3.2 (widget added from the **Widget Picker**, "Run it in the simulator").
Code refs:
- Page name **Google Maps**, package `google_maps_flutter`, iOS minimum 14.0, labels **Android API Key** / **iOS API Key** / **Web API Key**, placeholder `AIza...`, and where each key is written (Android manifest `com.google.android.geo.API_KEY`; iOS AppDelegate `GMSServices.provideAPIKey` plus `import GoogleMaps`; web `index.html` script tag): `packages/core/lib/src/interpreter/packages/integrations/google_maps_package_config.dart:12-71`.
- **Details** warning "Google Maps API keys are not set. Please configure them in the project settings to use the Google Map widget." with a gear button that opens the **Google Maps** page: `google_maps_package_config.dart:78-115`.
- Board placeholder "Google Maps" / "Run to preview" and the Play text "Run on a simulator/emulator or mobile device to preview": `google_maps_package_config.dart:118-146`, `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:28-70`.
- Widget picker entry name **Google Maps**, default `myLocationEnabled` / `myLocationButtonEnabled` true: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:890-915` (`:902-903`).
- No required permissions are declared for the package (no `requiredPermissions`), so location permissions are not added automatically; **Permissions** offers **Fine Location**, **Coarse Location** (Android) and **Location When In Use**, **Location Always**, **Location Always and When In Use** (iOS): `packages/core/lib/src/services/permissions_service.dart:94-113`, `:141-195`.
Left out and why:
- Widget properties (camera position, markers, polygons, styling) belong to the widget catalog (D5, W13); I only say to use **Details**. No property labels are quoted.
- Enabling the right Maps SDKs in Google Cloud and billing: vendor side, linked to Google's "get an API key" pages (not fetched, standard developers.google.com paths, worth a link check).
Assumptions / open questions:
- "The board and Play do not draw a live map" follows the placeholder views above (`RunEnv.isDesigner` branch and the non-designer branch). Whether the embedded web preview (**Run**) shows a map with a valid **Web API Key** is not verified, so I only say "run on a simulator, emulator or device" and that a web build uses the Web API Key.
- The location-permission note is a platform requirement (not enforced in Nowa code); it is advice, phrased as "for it to find the user".
Coverage notes: none beyond pages.md. Capture request: `integrations-google-maps-1`.

## google-sign-in.md (Google Sign-In)

Research: features-data.md "Google Sign-In (Settings → Integrations → Google Sign-In)" (lines 691-701); What's New 3.6 ("Google Sign-In with Supabase": connect Supabase and ask Nowa AI to set it up).
Code refs:
- Page name **Google Sign-In**, package `google_sign_in` ^7.2.0, labels **iOS Client ID** / **Web Client ID**, placeholder `xxxxx.apps.googleusercontent.com`, help texts ("Required for standalone Google Sign-In (non-Firebase)." / "Also used as serverClientId on Android."): `packages/core/lib/src/interpreter/packages/integrations/google_sign_in_package_config.dart:11-46`.
- iOS Client ID is written to `Info.plist` as `GIDClientID` (`:27-35`); the reversed client ID is added as `CFBundleURLTypes` URL scheme, computed from the stored iOS client ID or `firebase.clientId` (`:20-25`, `:49-95`).
- Web Client ID has no `applyTo` ("not used for now, requires a PlatformSection", `:36`), so it is a Dart-only token: saved as `AppConstants.webClientId` and shown under **Constants** (`packages/core/lib/src/interpreter/packages/package_config/config_token.dart:122`). Nothing in Nowa reads it.
- "Managed by Firebase" panel (title text, description, **Open Firebase Settings** button that opens the **Firebase** settings page); shown when `settings.json` has a non-empty `firebase.clientId`; the standalone fields and the **Enabled** switch are not shown then: `google_sign_in_package_config.dart:97-165`. `firebase.clientId` is read from `ios/Runner/GoogleService-Info.plist` (`CLIENT_ID`) when the Firebase setup is created (`packages/data/lib/src/firebase/firebase_manager.dart:93`, `packages/data/lib/src/firebase/auth/fb_auth_manager.dart:93-118`). Firebase's Google provider also registers the same `google_sign_in` package (`fb_auth_manager.dart:54-70`).
- No generated file, main statement or library for this config (so no sign-in function or Circuit nodes): the config at `:11-46` has only tokens and the custom panel.
Left out and why:
- Google Cloud steps (creating the Web / iOS / Android clients, SHA-1, consent screen): vendor side. Linked to the Google Cloud Credentials page (URL appears in the app's own text for Google Cloud, `https://console.cloud.google.com/`) and to Supabase's Google login guide (`https://supabase.com/docs/guides/auth/social-login/auth-google`, not fetched; worth a link check).
- Android: Nowa has no Android field for this integration. I only mention "including the Android one" in the Supabase guide link.
Assumptions / open questions:
- "Meant for sign-in without Firebase, for example with Supabase": from the config doc comment (`:6-9`) and What's New 3.6.
- The AI behaviour ("ask Nowa AI to build the flow") rests on What's New 3.6; I found no Google-specific agent instructions in `packages/ai` (`supabase_integration_instructions` text was not searched line by line for Google). Prompt example is illustrative.
- When the Firebase clientId exists but the user turned Google auth off later, the page keeps saying Managed by Firebase until the Firebase setup is regenerated (not verified).
Coverage notes: none beyond pages.md. No capture requested (research rates screenshot value low).

## deep-links.md (Deep links)

Research: features-data.md "Deep Links (Settings → Integrations → Deep Links)" (lines 703-713) and its Open question about iOS Universal Links; features-designer-core.md "Route Settings" (route **Path**, GoRouter only); What's New ("Routing is now GoRouter by default ... mobile apps can support deep linking").
Code refs:
- Page name **Deep Links**, package `app_links` ^7.0.0, labels **URL Scheme** / **Host**, help texts: `packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:7-53`.
- Static tokens (written as soon as the package is enabled) that turn off Flutter's default deep linking: iOS `FlutterDeepLinkingEnabled=false`, Android `flutter_deeplinking_enabled=false`: `:17-27`, `:56-66`.
- URL Scheme: iOS `CFBundleURLTypes` (`CFBundleURLName` `com.app.scheme`): `:68-82`; Android intent filter with `android:scheme="<scheme>" android:host="open.my.app"`: `:84-94`. Host: Android-only intent filter with `android:autoVerify="true"`, scheme `https`, optional `pathPrefix` from `host/path`: `:95-113`; target sections `androidManifestActivity` / `iosInfoPlist`.
- Nothing in the product generates code that reads incoming links: the only references to `app_links` / `AppLinks` in `/home/user/nowa-master/packages` and `lib` are this config, its registration (`packages/core/lib/src/settings/project_settings.dart:37`, `packages/core/lib/src/interpreter/packages/dart_package.dart:82`) and Nowa's own generated plugin registrants. No code writes an iOS associated-domains entitlement or an `assetlinks.json` (grep for `associated-domains`, `applinks:`, `assetlinks`, `apple-app-site` found nothing).
- **Router** panel with **Enable GoRouter** and the Navigator-vs-GoRouter table ("Deep Linking": "Not supported out of the box" / "Built-in support for deep links"): sidebar item `lib/project/side_bar.dart:102-107`; opens `RouterMigrationEditor` when the project is not on GoRouter `packages/core/lib/src/editors/router_editor/router_editor_actions.dart:12-37`; texts `packages/core/lib/src/editors/router_editor/router_migration_editor.dart:22-37`, `:69`, `:105`.
Left out and why:
- Anything about testing links with `adb` or `xcrun`: not Nowa; I only say the settings take effect in a built app.
- The in-app description says URL Scheme "Opens your app via links like myapp://path"; I did not repeat it because the Android filter requires the host `open.my.app` (see below).
Assumptions / open questions:
- Android intent-filter semantics: with both `scheme` and `host` set, only links with that host match, so an Android link must be `myapp://open.my.app/...`. This is my reading of the generated manifest snippet (`:91`) plus Android's matching rules, not something I could run. iOS custom schemes match on the scheme alone, so the same link works on both. Worth confirming on a device.
- The page says Nowa "does not generate code that reads an incoming link" (by grep). If the team intends GoRouter to receive links through another mechanism, this sentence would be wrong; I could not find one. Flutter's default handling (which hands links to the router) is switched off by this very config.
- The research's open question (iOS Universal Links with **Host**) is answered on the page: no entitlement is written, so web links open the app on Android only.
- I link Apple's and Android's guides by their well-known paths (`developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app`, `developer.android.com/training/app-links`); not fetched, worth a link check.
Coverage notes: none beyond pages.md. No capture requested (research rates screenshot value low).
