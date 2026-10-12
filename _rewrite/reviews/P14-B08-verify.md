# P14-B08 verification log (verifier P14-B08-V)

Batch: `docs/integrations/` `index.md`, `show-data.md`, `constants.md`, `deep-links.md`, `google-maps.md`,
`google-sign-in.md`, `admob.md`, `revenuecat.md`, `rest-api/index.md`, `rest-api/import.md`.
Product code: `/home/user/nowa-master` 3.13.0+1 (`3cb32031c`). Code refs are relative to that root. Third-party pages
fetched 2026-10-12.

## Summary

(in progress)

## Anchors (coordinator request, done first)

The trial build reported `guides/ship-tips.md` → `/integrations/admob#before-you-publish` broken: the pass renamed
"Before you publish" to "Before and after you publish". Fixed with `## Before and after you publish {#before-you-publish}`.

Checked every batch page for anchors that existed on `origin/main` and are gone now (script comparing heading slugs and
explicit IDs, old vs new). Three more, none with inbound links in `docs/`, `src/`, `sidebars.js`,
`docusaurus.config.js` or the product's docs URLs, kept anyway because the live site carries them:

| Page | Old anchor | Now |
|---|---|---|
| `admob.md` | `#before-you-publish` | `## Before and after you publish {#before-you-publish}` (inbound: `guides/ship-tips.md:67`) |
| `revenuecat.md` | `#turn-on-revenuecat` | `## Turn on RevenueCat and add your keys {#turn-on-revenuecat}` |
| `revenuecat.md` | `#call-revenuecat-from-logic` | `## Use purchases in your logic {#call-revenuecat-from-logic}` |
| `google-sign-in.md` | `#add-your-client-ids` | `## Add your client IDs in Nowa {#add-your-client-ids}` |

No page links to the new slugs those headings had in the section pass. Re-run after the edits: no `origin/main` anchor
is missing on any batch page.

## revenuecat.md

Reads top to bottom as a non-coder's page now: set up what you sell in RevenueCat → turn it on and add keys → add the
paywall → test on a device → use purchases from logic → publish → turn off. No file paths, package names or generated
code left; `RevenuecatService`, `fetchOfferings`, `purchasePackage` and `configureRevenuecat` stay because Circuit
shows them (R3), each explained.

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Two RevenueCat steps can be picked in Circuit, grouped under `RevenuecatService` | ok | `revenuecat_package_config.dart:72-114` (singleton: private static `_instance` + factory); `suggestion.dart:661-664,689-693` (`_canAddClass` / `isSingleton`: singleton classes are listed in the app's own library category, `services/suggestion_service.dart:9-15`); `link_menu.dart:129-141` (clicking a class opens its member list) | Generated file is `onPackageAdd` (`:57-63`), nothing hides `@NowaGenerated` classes from suggestions. Same pattern as API collections (`packages/data/lib/src/api/model/api_collection.dart:40-52`). |
| "click it and pick a step under **Members**" | fixed | `suggestion.dart:695-721` (Static category omitted when empty, `:716`, so this singleton has only Members); `link_menu.dart:177,197` (a single category renders as a flat list, no heading) | No **Members** heading is shown. Now: hover the dot, **+**, search `RevenuecatService`, click it to see its steps. Added that the third entry, `configureRevenuecat`, is the start-up step Nowa already runs (`:49-56`), so the reader isn't puzzled by it. |
| **Add Missing Dependencies** adds "the two add-ons" | fixed | `missing_dependency_dialog.dart:43` lists only missing ones; `revenuecat_package_config.dart:127-138` | With RevenueCat already on (the page's order), only the paywall add-on is missing. Now "the add-ons the paywall still needs". |
| Paywall: change "prices, texts and layout" without an app update | fixed | https://www.revenuecat.com/docs/tools/paywalls ("remotely configure your entire paywall view"); prices come from the stores | Now "its texts, layout and the plans it shows". |
| Dashboard: Product catalog → Products / Test Store tab / **+ New**; Entitlements **+ New**, **Attach**; Offerings **+ New**, packages, default offering returned by the SDK | ok | https://www.revenuecat.com/docs/projects/configuring-products | |
| App config from **Apps**, web config from **Web** (RevenueCat Billing, Stripe, Paddle); each app gets a public key; every project has a Test Store | ok | https://www.revenuecat.com/docs/projects/connect-a-store, https://www.revenuecat.com/docs/projects/authentication | Added that each store also asks for access keys (App Store: shared secret, In-App Purchase key; Google Play: service credentials), with the guide link. |
| Store prerequisites (Paid Applications Agreement, tax and banking for Apple; uploaded build before Google Play products) | restored (added) | https://www.revenuecat.com/docs/getting-started/entitlements/ios-products ("You will not be able to test in-app purchases until the latest version of this agreement is signed"), https://www.revenuecat.com/docs/getting-started/entitlements/android-products ("You'll need to have an APK uploaded before you can create in-app products") | Not on any docs page; a reader creating real products hits both. Short paragraph after the dashboard steps. |
| **Create paywall** (scratch, template, AI), **Publish Paywall** | ok | https://www.revenuecat.com/docs/tools/paywalls/creating-paywalls | |
| Public keys under **API keys** or the app under **Apps**; secret keys start with `sk_`, never in an app | ok | https://www.revenuecat.com/docs/projects/authentication | |
| Fields **Apple API Key** / **Android API Key** / **Web API Key**, hints `appl_` / `goog_` / `strp_`, **Configuration**, **Enabled** | ok | `revenuecat_package_config.dart:24-47`; `package_config_settings.dart:96-105`; `settings_widgets.dart:184` | Web key = web config's public key: https://www.revenuecat.com/docs/getting-started/installation/flutter |
| Starts each time the app opens; iOS 14 or later; keys in a **RevenueCat** section on **Constants**, under **Custom Constants** after turning off | ok | `revenuecat_package_config.dart:22,49-56`; `app_constants_service.dart:65-74` | |
| Avoid a bottom sheet or popup; paywall shows the default offering; closing or buying hands control back to the app; **Restore Purchases** button by default | ok | https://www.revenuecat.com/docs/tools/paywalls/displaying-paywalls (Flutter `PaywallView` note, `onDismiss`), https://www.revenuecat.com/docs/getting-started/quickstart ("8. Restore purchases"); `widgets_to_add.dart:943-953` (inserted with no settings) | |
| Paywalls: iOS 15+, Android 7.0+, not on Flutter web | ok | https://www.revenuecat.com/docs/tools/paywalls (Platforms), https://www.revenuecat.com/docs/getting-started/installation/flutter ("presentPaywall is not yet supported on web") | |
| Placeholder texts "RevenueCat Paywall", "Run to preview", "Run on a simulator/emulator or mobile device to preview" | ok | `integration_preview_view.dart:46,69`; `revenuecat_package_config.dart:141-150` | |
| Test Store: "Create a Test Store ... and copy its API key" | fixed | https://www.revenuecat.com/docs/test-and-launch/sandbox/test-store (new projects get one automatically; create under **Apps and providers** otherwise; keys under **API keys**) | Contradicted "Every project also comes with a Test Store". Now: copy its key from **API keys**; the guide shows how to create one if missing. |
| Test Store dialog (success / failure / cancel); release builds stop on purpose, incl. TestFlight and Play testing tracks | ok | same page | Nowa's device runs are debug builds: `flutter run -d <device>` with no mode flag (`packages/core/lib/flutter_tool.dart:120-133`; no `--release` anywhere in `lib/` or `packages/`), so the Test Store key works there. |
| Stores' sandboxes | ok, expanded | https://www.revenuecat.com/docs/test-and-launch/sandbox ("Required before launch - Essential final step") | Added "RevenueCat calls this the essential last check before launch". |
| "Apple expects a way to restore purchases (see Follow Apple's rules)" | fixed | https://developer.apple.com/app-store/review/guidelines/#in-app-purchase (3.1.1: "you should make sure you have a restore mechanism for any restorable in-app purchases") | `publish/ios.md#store-rules` doesn't mention restoring; now quotes and links 3.1.1 directly. |
| Apple's In-App Purchase capability | restored (added) | https://www.revenuecat.com/docs/getting-started/installation/ios#3-enable-the-in-app-purchase-capability ("Your app needs the In-App Purchase capability to make purchases through the App Store, in both the sandbox and production environments"; Xcode **Signing & Capabilities** → **+ Capability**); https://developer.apple.com/help/account/identifiers/register-an-app-id ("In-App Purchase is enabled by default for an explicit App ID") | Nowa adds nothing for it (no hit for in-app purchase / StoreKit in `lib/`, `packages/`). Bullet in "Before you publish": the requirement, Apple's default on the App ID, RevenueCat's Xcode step, a Nowa AI prompt for non-Xcode users (same pattern as `firebase/notifications.md`), check with a sandbox purchase. Links `publish/ios.md#register-your-bundle-id` (B11 heading; re-check if B11 renames it). |
| Open the paywall from a button; unlock features with Nowa AI (no ready-made entitlement check) | ok | `revenuecat_package_config.dart:72-114` (only `configureRevenuecat`, `fetchOfferings`, `purchasePackage`) | AI prompts promise no exact result and say how to check. |
| Turn off: remove widgets and steps first, then **Enabled** off; keys stay under **Custom Constants** | ok | `package_config_service.dart:146-172`; `generated_file.dart:25` (`deleteOnRemove` default true) | |

Removed facts: the package names, file path, `main()` line, `app_constants.dart`, `MainActivity` switch, method table
and the turn-off file list are in the for-code file under `#revenuecat`, unchanged. User-facing consequences stayed in
plain words (starts with the app, iOS 14, keys on **Constants**). Nothing the reader needs was lost.

Open: whether **Details** shows paywall events such as an `onDismiss` field in 3.13 (the widget is inserted as a bare
`PaywallView` reference; needs a live check). P51 (paywall insert hangs in the playground) still unconfirmed.

## Routed from B03-V: deep links fix undone by settings changes

Holds, with one correction. `deep-links.md#with-google-sign-in` now says Nowa rebuilds the iPhone app's settings file
whenever something that goes into it changes, which undoes a Nowa AI merge and brings the duplicate entries back, and
links the warning in `account/project-settings.md#set-permissions` (wording kept consistent: "rebuilds ... settings
file from your project settings").

| Trigger | Rewrites the iOS settings file? | Source |
|---|---|---|
| An iOS permission | yes | `packages/core/lib/src/services/permissions_service.dart:56-82` (`writeTemplate(... infoPlist)` at `:81`) |
| **App Name** | yes | `packages/core/lib/src/project/rename.dart:29-46` (`:37`) |
| **Bundle Identifier** | no (edits the Xcode project's bundle ID lines, the Android build file and `MainActivity`) | `rename.dart:48-67` (`changeIosBundleId`) |
| **URL Scheme**, **iOS Client ID**, AdMob **iOS App ID** | yes, the whole file from the template | `package_config_service.dart:66-92` (`writeTemplate(token.applyTo!.templatePath)`), `app_links_package_config.dart:29-36`, `google_sign_in_package_config.dart:20-35`, `admob_package_config.dart:38-46` |
| The template re-adds both link entries | yes | `packages/core/lib/src/file_system/templates/ios/info_plist_template.dart:8-12,58` (`gatherSection(PlatformSection.iosInfoPlist)`) |

So the page names the **URL Scheme**, the **iOS Client ID**, the AdMob **iOS App ID**, an iOS permission and the
**App Name**, not the **Bundle Identifier**. Also added: Firebase-managed Google sign-in writes the same entry
(`packages/data/lib/src/firebase/auth/fb_auth_manager.dart:66-69`, "GIDClientID and CFBundleURLTypes are computed from
firebase.clientId"; `google_sign_in_package_config.dart:49-79` reads `firebase.clientId`), so Firebase users with a URL
scheme hit the same clash.

## rest-api/index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "How an API request works" table: request, base URL and endpoint, method, header, API key or token, body, JSON, response, parameter | ok | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods, `.../Reference/Status`; methods offered: `packages/data/lib/src/api/utils/api_util.dart:11` | Plain words, examples from the reader's world. |
| Status codes: "`401` or `403` means the API didn't accept your key", "`404` means the address doesn't exist" | fixed | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status (401 = unauthenticated, 403 = no access rights, identity known; 404 = server can't find the resource) | Now 401 "doesn't know who's asking (key or token missing or wrong)", 403 "your key isn't allowed to do this", 404 "found nothing at that address". |
| **Create New Collection**, **Class name**, **Path**, **Submit** | ok | `create_collection_dialog.dart:60-88`; `packages/core/lib/src/file_system/widgets/file_name_text_field.dart:175,202` | **Class name** = the name picked in Circuit: the collection class is a singleton listed in the app's category (`api_collection.dart:40-52`, `suggestion.dart:661-693`). |
| Collection settings **Name**, **Base URL**, **Auth Key**, **Headers**, **Add header**, **KEY** / **VALUE**, **Close** | ok | `api_edit_collection_dialog.dart:126,139,163,181,222-246`; `headers_field.dart:33,52` | |
| Auth Key: every request sends `Authorization: Bearer <token>` from the saved value; save it with **SHARED PREFERENCES** → **set**, same **Key**, **Type** `string` | ok | `packages/data/lib/src/api/interceptors/generate_auth_interceptor.dart:4-23`; `docs/logic/actions.md` "Save values on the device" (set: **Type**, **Key**, **Value**) | Paragraph tightened. |
| Header and request-header ways to send one app-wide key | ok | `headers_field.dart:33-69`; request **Headers** tab `api_request_form.dart:39-58` | |
| Warning: Base URL and header values ship inside the app; **Auth Key** is only a name | ok | `api_collection.dart:20-27,55-63` (base URL and headers written into the class), `:66-98` (interceptor reads the token on the device) | Warning shortened to the risk; the safe path moved to a paragraph after it. |
| Safe path for secret keys: Nowa AI with the Supabase connector moves the call into an edge function | ok, expanded | `docs/ai/connectors.md:43` ("Deploy and manage Edge Functions"), `research/features-ai.md:443`; `docs/integrations/supabase/backend.md:51` (**Edge Function Secrets** page with **Key** / **Value** / **Save**) | Added where the key then goes (the **Edge Function Secrets** page, not the app) and how to check (**Play**), per R5. The prompt is an example; no result promised. |
| "Nowa shows the function name it makes from it, such as `getCats`" | ok | `api_request_dialogs.dart:61-66` ("Function name: …") | |
| Body type explanations (**String** text, **int** whole number, **double** decimal number, **bool** yes or no; content type explained) | ok | labels unchanged from the verified page; R3 explanations | |
| Remove-collection prompt names the file | ok | prompt text quoted as the UI shows it (R2 allows what a dialog shows) | |
| Test view: **Test**, **Testing values**, **Auth token value**, **Run Test**, **Back to Request**, **Run Query**, "Status:" | ok | `url_field.dart:84`; `api_test_values_panel.dart:33,50,169`; `api_request_overlay.dart:122`; `packages/data/lib/src/common/data_request_tile.dart:89`; `api_overlay_header.dart:64` | |
| Model wizard **Content** / **Select Data** / **Generated Models**, **Name**, **Path** | ok | `packages/core/lib/src/model_generator/generate_models_dialog.dart:160-164`; `generated_models_section.dart:65,72` | |
| "Call it from logic … pick the request under **Members**" | fixed | `link_menu.dart:129-141,177,197`; `suggestion.dart:695-721` | No **Members** heading appears (single category shows as a flat list). The bullet now says where collections are listed (**PACKAGE:MY_APP**: category names are upper-cased, `link_menu.dart:331`) and points to the example, which carries the steps; less repetition. |
| Example step 2: a Text Field gets a variable named `text` | ok | `packages/core/lib/src/interpreter/widget/text_field_info.dart:14-26` (default name `text`) | |
| Example step 4: search the **Class name**, click it, pick the request "under **Members**" | fixed | as above; search matches the class's own name (`suggestion.dart:100-104`, `link_menu.dart:85-88`) | Now "Its requests are listed: pick yours." |
| Example step 5: the parameter shows as a field named after it (**Question**); **LOCALS** → `text` → `text` | ok | `block_field.dart:212-218` + `utils.dart:77-79` (`camelCaseToSpaces`, capitalized); picking the controller where text is expected opens its members (type mismatch, `field_link_menu.dart:175-179`, as on `show-data.md`) | Added what each `text` is. |
| Example step 6: **await**, **Store result** → **New Variable**, `var1` | ok | `docs/logic/circuit.md#future-options`, `#store-result` (B06-verified) | |
| Example step 7: "edit its content … Link the content's text to `var1`" | fixed | `packages/core/lib/src/interpreter/block_utils.dart:244-254`: a new `showDialog` holds an AlertDialog with only a **title** Text ("Hello World") and no content | There was no content to link. Now: **Builder** row → brush next to **AlertDialog** (**Edit AlertDialog**) → brush next to **Title** → **Text** label → **LOCALS** → `var1` → pick the field, **+** to go deeper (labels as on `logic/popups.md#show-a-dialog`). |
| `var1` is offered inside the dialog | ok (derived from code, not run) | `block_tree.dart:4894-4900` (an ExecBlock offers the variables declared before the calling statement), `:2988-2992` (scopes walk up through the dialog's builder function), `suggestion.dart:588-632` (LOCALS inside a screen) | Same as the writer's derivation; still worth a live check. |
| Example step 8: **Play** sends the real request and shows the reply | ok | Play runs requests for real (W14 notes; `show-data.md` "Press **Play** … to load real data") | |

Removed facts: the collection's Dart file name, "and its file", "written into the collection's Dart file", the test bytes
detail and the `lib/models` default are in the for-code file under `#rest-api`, unchanged; plain-words versions stay
(**Path**, "saved in your app's code and ship inside your app", "for this test only", "the folder where the model is
saved"). Nothing the reader needs was lost.

Length: about 2,440 words by my count (the writer counted 2,354 with another method; my net change is about +30:
status codes, safe path and two clearer walk-through steps, offset by a shorter settings intro, a merged **Auth Key**
paragraph and a "Call it from logic" bullet that no longer repeats the example's steps). Not split, as instructed. The
writer's split proposal (basics and requests / testing, models and the example) still stands.

