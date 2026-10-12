# P14-B08 verification log (verifier P14-B08-V)

Batch: `docs/integrations/` `index.md`, `show-data.md`, `constants.md`, `deep-links.md`, `google-maps.md`,
`google-sign-in.md`, `admob.md`, `revenuecat.md`, `rest-api/index.md`, `rest-api/import.md`.
Product code: `/home/user/nowa-master` 3.13.0+1 (`3cb32031c`). Code refs are relative to that root. Third-party pages
fetched 2026-10-12.

## Summary

- **Pages checked:** all 10 (every `+` line of the diff, every `-` line, and the audience rules on each page).
- **Claims checked:** about 110 rows below, many covering several labels; UI labels against `/home/user/nowa-master`
  (3.13.0), console steps against the official docs fetched today (RevenueCat, Apple, Google AdMob, Google Maps
  Platform, Google Cloud, Supabase, Postman, Xano, Swagger Petstore, MDN, Android developers).
- **Fixed:** 23 claims, plus 4 heading anchors kept with explicit IDs (one was the broken
  `admob#before-you-publish` from the trial build). Most serious: the REST walk-through linked the reply to a dialog
  "content" that a new `showDialog` doesn't have (only a "Hello World" title); "pick it under **Members**" on the
  RevenueCat and REST pages, a heading Circuit never shows; the Maps and Google Sign-In Android steps used only Nowa's
  signing key, so the copy people download from Google Play (signed by Google) would show no map and could fail
  Google sign-in; the deep links fix claimed Nowa AI "fixes it" and listed only two of the settings that undo it.
- **Removed:** no claim removed outright; inaccurate ones were rewritten (e.g. an AdMob example Google doesn't give,
  "change prices" on a RevenueCat paywall).
- **Facts restored or added (verified):** RevenueCat store prerequisites (Paid Applications Agreement, tax and banking;
  uploaded build before Google Play products); Apple's In-App Purchase capability for App Store purchases; restricted
  Maps keys don't load in Nowa's test runs; the safe path for secret keys now says where the key goes (Supabase
  **Edge Function Secrets**) and how to check.
- **Routed items applied:** B09 (Firebase "What you get" cell, `index.md`); B03-V (deep links fix undone by an iOS
  permission or **App Name** change; the **Bundle Identifier** doesn't touch the iOS file, so it isn't named).
- **Audience fixes:** AI tips now name **Agent** mode and say how to check (5 pages); Xcode, webhook and the two `text`
  picks explained; `configureRevenuecat` explained; no file paths, package names or generated code left outside
  agent prompts, Circuit-visible names and dialog text.
- **Moved facts:** all 39 in `P14-B08-for-code.md` match the removed text; each reader-facing consequence is still on
  its page in plain words. Nothing the reader needs was lost. One verifier addition to `#deep-links` (what rebuilds
  `Info.plist`).
- **Checks:** every relative link and `#anchor` resolves, `generated-code.md` anchors are from the allowed list, no
  `origin/main` anchor is missing, front matter valid, no H1, no `---` rules, at most 2 admonitions per page and none
  stacked, no banned words or emoji, images unchanged; all 10 pages compile with `@mdx-js/mdx` + `remark-gfm` (heading
  IDs stripped first, as Docusaurus does; a control file with a stray `{` fails). No `yarn build`.
- **Open issues:** 7, listed at the end.

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

## rest-api/import.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Swagger sample `https://petstore.swagger.io/v2/swagger.json` gives requests such as `getPetById`, `findPetsByStatus` | ok | fetched 2026-10-12: HTTP 200, Swagger 2.0, title "Swagger Petstore", 20 operation IDs incl. both; `packages/data/lib/src/api/importers/swagger_importer.dart:12-27,36-41` (collection named after `info.title`, requests after the operation ID) | |
| Swagger 2.0: **Base URL** only from a pasted address; pasted text or a file gives none | ok | `packages/data/lib/src/swagger/utils/url_parser.dart:21-57` (`servers` first, else the input URL; Swagger 2.0 `host`/`basePath` are not read) | For the sample, the address yields `https://petstore.swagger.io/v2`. |
| "often at an address ending in `swagger.json` or `openapi.json`" | ok | `url_parser.dart:40-42` | Worded as "often". |
| YAML: convert to JSON first, e.g. in the Swagger Editor | ok | https://editor.swagger.io/ (200); its bundle has "Convert and Save as JSON" and "Convert to JSON" | No menu path on the page; the parent menu name isn't confirmed. |
| Postman export: **Collections** → **View more actions** → **More** → **Export collection** → **Export JSON** | ok | https://learning.postman.com/docs/getting-started/importing-and-exporting/exporting-data/ (Latest v12): "Click View more actions next to a collection, then select More > Export collection … Click Export JSON" | learning.postman.com answers 451 "DEPLOYMENT_DISABLED" since about 17:00 today; checked against the copy fetched at 16:15 and the search snippets of the v12 page. Re-check the link when the site is back. |
| Import a picked or dropped file at once; paste text + **Import**; **Import From**, **Select / Drop your JSON file** | ok | `create_collection_dialog.dart:135-155,178,231,270` | |
| Xano token: profile icon → **Instances** → gear → **Metadata API** → **Manage Access Tokens** → **New Access Token**; name; expiry (default 7 days, 1 hour to never); scopes C/R/U/D; shown once | ok | https://docs.xano.com/xano-features/metadata-api (steps 1-8) | |
| "**R** for **Content** and **API Groups** is enough" | ok | Nowa calls only `GET …/instance`, `…/workspace`, `…/workspace/{id}/apigroup` (`packages/data/lib/src/xano/xano_service.dart:16-29`); Xano's reference lists no required scope for the last two (https://docs.xano.com/api-reference/workspace/retrieve-all-accessible-workspaces-for-the-authenticated-user.md, `…/api-group/retrieve-all-api-groups-in-a-workspace.md`) | A sufficiency claim, safe. Scope names from the table on the Metadata API page. |
| Groups import through their Swagger documentation; check it isn't **Disabled** (**Connect this backend** → **API Groups**) | ok | `packages/data/lib/src/api/importers/xano_importer.dart:52-57` (`SwaggerImporter(group.documentation.link)`); https://docs.xano.com/the-function-stack/building-with-visual-development/apis/swagger-openapi-documentation (Public / Private / Disabled) | Private needs a token in the URL; open question below. |
| Xano labels and messages (**Enter Xano Bearer Token...**, **Select an Instance** / **Workspace** / **API Group**, "Invalid token", "Failed to fetch instances", "Failed to select …", "Failed to import from Xano") | ok | `xano_import_step_view.dart:44,67,81,91,104,132,185,209,242` | |
| cURL tip: "It creates the request, tests it and builds the model" | fixed | R5 | Now "It can …", plus "Check the result in the **Collections** panel." |

Removed fact: "It needs both an `info` and an `item` section" is in the for-code file (`#rest-api`); the row now tells the
reader what to do (export again with **Export collection**). Nothing lost.

Open: does a Xano group with **Private** documentation import (its link may need the token Nowa ignores)? Needs a live
test with a Xano account.

## admob.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Unpublished app: **Apps** → **Add app** → platform → **No** → name → confirm user metrics → **Add**; **Yes** + search for a listed app | ok | https://support.google.com/admob/answer/9989980 ("Set up an unpublished app", "Set up a published app") | |
| Ad unit: **Apps** → app → **Ad units** → **Get started** / **Add ad unit** → **Select** (**Banner** / **Interstitial**) → name → **Create ad unit** | ok | https://support.google.com/admob/answer/7311346, https://support.google.com/admob/answer/7311435 | |
| App ID in **Apps** → **View all apps**; ad unit ID under the app's **Ad units** | ok | https://support.google.com/admob/answer/7356431 | |
| Limited ad serving until the readiness review; link the app to its store listing | ok | https://support.google.com/admob/answer/9989980 ("Your app will receive limited ad serving until it's approved during AdMob's readiness process") | |
| `app-ads.txt` on the developer website in the store listing, so AdMob can confirm ownership | ok | https://support.google.com/admob/answer/9363762 (Step 1: "how the app-ads.txt standard establishes who owns an app") | |
| Test ads: "clicking real ads during development can get your account flagged" | fixed | https://developers.google.com/admob/flutter/test-ads ("If you click on too many ads without being in test mode, you risk your account being flagged for invalid activity") | Now "clicking too many real ads while you test". |
| Interstitial at "a natural break, such as after a level or between two steps of a task" | fixed | https://support.google.com/admob/answer/7311435 ("natural breaks & transitions … such as after level completion") | Dropped the example Google doesn't give. |
| Starts each time the app opens; each ID goes where its platform needs it; turning off removes the App IDs | ok | `admob_package_config.dart:20-47`; `package_config_service.dart:146-160` | |
| Labels: **Android App ID**, **iOS App ID**, `ca-app-pub-` check, **Show Test Ads** (on by default), **Android Unit ID**, **Ios Unit ID**, "No API Keys", **AdMob setup**, **AdMob Android setup**, **AdMob IOS setup** | ok | `admob_package_config.dart:28-47,271-272,296-333`; `packages/nowa_mobile_ads/lib/src/widgets/nowa_ad_banner_widget.dart:6`, `nowa_ad_interstitial_function.dart:5` (labels from `camelCaseToSpaces`, `utils.dart:77-79`); `widgets_to_add.dart:866` | |
| `NowaAdBannerWidget`, `loadAndShowInterstitialAd` kept | ok | R3: shown in **Details**, the Outline and Circuit; both explained | |
| AI tip without a mode or a check | fixed | R5 | Now "In **Agent** mode" and a device check. |
| `## Before and after you publish` | fixed | see "Anchors" | `{#before-you-publish}` kept. |

Removed facts: package name, the `main()` line, the manifest / `Info.plist` / SKAdNetwork sentence and the `main()` line
in "Turn AdMob off" are in the for-code file under `#admob`, unchanged; plain-words consequences stay. Nothing lost.

Open (writer's, not changed): whether the page should point to ad privacy rules (Apple 5.1.2(i), the **User Tracking**
iOS permission on the Permissions page, Google's consent requirements for the EEA and UK). Nowa's ads package has no
consent or tracking prompt (no hit for consent or tracking in `packages/nowa_mobile_ads/lib`), so readers who serve ads
there need one; a content decision for the team.

## google-maps.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| **Create Project** on the project selector page; billing must be enabled; **ENABLE** on the Maps API Library page; **Google Maps Platform** → **Credentials** → **Create credentials** → **API key**; **API key created** dialog; **Close** | ok | https://developers.google.com/maps/get-started | |
| Products **Maps SDK for Android**, **Maps SDK for iOS**, **Maps JavaScript API** | ok | same site (product pages) | |
| "Google bills map use beyond a free allowance" (no amounts, D3) | ok | https://developers.google.com/maps/billing-and-pricing/pricing | |
| Restrict before publishing, "as Google strongly recommends" | ok, expanded | https://developers.google.com/maps/get-started ("If you use your API Key in production, we strongly recommend that you restrict your API key"); https://developers.google.com/maps/api-security-best-practices ("to avoid being billed for unauthorized use") | Added the reason (nobody else runs up the bill). |
| **Key restrictions** → **Set an application restriction** → **Android apps** / **iOS apps** / **Websites**, **Save** | ok | https://developers.google.com/maps/api-security-best-practices | |
| Android row: package name + "the SHA-1 fingerprint of your signing key" from Nowa | fixed | same page ("If you use Play App Signing, to fetch the signing certificate fingerprint, see Working with API Providers"; "+ Add" per app); `docs/publish/android.md` (Play App Signing makes Nowa's key the upload key; Play's **App signing key** section lists Google's) | With only Nowa's fingerprint, the copy people download from Google Play would show no map. Now also the SHA-1 from Play Console's **App signing key** section. |
| (new) restricted keys don't load in Nowa's test runs | added | Google: debug certificate is generated "when you run a debug build" (same page); Nowa device runs are debug builds (`flutter_tool.dart:120-133`) and the Android template signs only release builds with your key (`packages/core/lib/src/file_system/templates/android/app_build_gradle_template.dart:70-90`); **Run** serves the web app from a local or Nowa address | Answers the writer's open question: "That's why it's best to restrict right before you publish." |
| **Enabled**, **Configuration**, **Android API Key** / **iOS API Key** / **Web API Key**, `AIza...`; iOS 14 or later; keys go where each platform needs them | ok | `google_maps_package_config.dart:12-47` (`minIosVersion: '14.0'` at `:19`) | |
| Turn off: remove widgets first (`Method "GoogleMap" is not found`), then **Enabled** off; keys removed | ok | unchanged facts (W17); `package_config_service.dart:146-160` | |
| AI tip without mode or check | fixed | R5 | "In **Agent** mode", check via "See the map". |

Removed facts: package name, "at least 14.0" wording and the "Where Nowa writes it" table are in the for-code file under
`#google-maps`, unchanged; "your app then needs iOS 14 or later" and "puts each key where its platform needs it" stay.

## google-sign-in.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| **Google Auth Platform** → **Clients**; create a project and register the app when prompted; **CREATE CLIENT** → type → **CREATE**; client secret shown only after creating | ok | https://support.google.com/cloud/answer/6158849 ("You will be prompted to register your application … This is required before creating a client"; "client secret will only be shown after you create the client") | |
| Types **Web application**, **iOS** (bundle ID), **Android** (package name + SHA-1) | ok | same page; https://supabase.com/docs/guides/auth/social-login/auth-google (Flutter: Android and iOS clients) | |
| Android client with "the SHA-1 fingerprint of your signing key" from Nowa | fixed | Supabase: "a different set of SHA-1 certificate fingerprints for testing locally and going to production. Make sure to add both"; `docs/publish/android.md` (Play App Signing, **App signing key** section) | Added a second **Android** client for Play's app signing SHA-1, as on `google-maps.md`. |
| **iOS Client ID**: lets the sign-in screen open from the app and come back; needed without Firebase | ok | `google_sign_in_package_config.dart:20-35` (`GIDClientID` + reversed client ID URL scheme); https://developers.google.com/identity/sign-in/ios/start-integrating | |
| **Web Client ID**: for the backend; help text "Also used as serverClientId on Android"; on **Constants**; Nowa only stores it | ok | `google_sign_in_package_config.dart:36-45` (no `applyTo`, so a constant) | |
| Deep links pointer in the standalone section | ok | `deep-links.md#with-google-sign-in` | Added the same pointer to "When Firebase manages Google sign-in": Firebase's Google sign-in writes the same entry (`fb_auth_manager.dart:66-69`, `google_sign_in_package_config.dart:49-79`). |
| Turn off: setup leaves the iPhone app; **Web Client ID** stays under **Custom Constants** as `webClientId` | ok | `package_config_service.dart:146-172`; `app_constants_service.dart:65-74` | |
| Supabase bullet (routed from B10 earlier) links `supabase/auth.md#google` | ok | heading `### Google` in `docs/integrations/supabase/auth.md` | |

Removed facts: package name, the "What Nowa does with it" column (`Info.plist`, `GIDClientID`, reversed scheme,
`AppConstants.webClientId`) and the `Info.plist` pointer are in the for-code file under `#google-sign-in`, unchanged;
plain-words versions stay in the table.

## deep-links.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| URL Scheme works on iOS and Android; Host (web links) on Android only; links written with `open.my.app` | ok | `app_links_package_config.dart:29-53,68-113` | |
| Lowercase: "Android treats capitals as different letters" | ok | https://developer.android.com/guide/topics/manifest/data-element ("Scheme matching in the Android framework is case-sensitive"; same for host names) | |
| "From now on, your app handles these links itself" | ok | `app_links_package_config.dart:17-27,57-66` (Flutter's own deep linking switched off on both platforms) | |
| Note: saving **URL Scheme** updates only the iOS side; save (and clear) **Host** so Android gets it | ok | `package_config_service.dart:66-92` (`firstWhere` picks the first `urlScheme` token, the iOS one, `app_links_package_config.dart:29-36`); the Android token (`:37-42`) is written on the next manifest rewrite | P39 workaround, check is now a device test (R5). |
| Universal Links not set up by Nowa; Android domain check via `/.well-known/assetlinks.json` | ok | no associated-domains handling in the config; https://developer.android.com/training/app-links/verify-applinks ("…Digital Asset Links file at https://hostname/.well-known/assetlinks.json") | |
| Google Sign-In section: "To fix it, ask Nowa AI …" | fixed | Nowa AI can edit any project file (`research/features-ai.md`), nothing in the code shows the merge holds | Worded so it claims no more than the code shows: "You can ask Nowa AI … to combine them", "Nowa can't check the result for you", test both on an iPhone or the simulator, **Restore Checkpoint** (`packages/ai/lib/src/ui/content_views.dart:183`) to undo. |
| "If you change the **URL Scheme** or the **iOS Client ID** later, Nowa writes the entries again" | fixed | see "Routed from B03-V" | Incomplete: an iOS permission, the **App Name** and the AdMob **iOS App ID** rebuild the same file. Now lists them and links the `project-settings.md#set-permissions` warning. |
| Who adds the iOS link entry | expanded | `fb_auth_manager.dart:66-69`; `google_sign_in_package_config.dart:49-79` | Also when Firebase handles Google sign-in. |
| Handle the link: Nowa doesn't add the logic; AI tip with a device check | ok | no generated link handler in the config | |
| Turn off removes the link settings | ok | `package_config_service.dart:146-160` | |

Removed facts: package name, the platform files, the "Where Nowa writes it" column, the manifest path check, the
associated-domains / `autoVerify` wording and the `CFBundleURLTypes` details are in the for-code file under
`#deep-links`, unchanged; the reader-facing consequences stay in plain words. Nothing lost.

## constants.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Change one there, and every place that uses it picks up the new value"; "Every constant holds text" | ok | `app_constants_service.dart:17-24,44-62` (one `const String` per constant, read by name) | |
| Platform-only keys (Maps, AdMob, Deep Links, Google Sign-In **iOS Client ID**) aren't on this page | ok | tokens with `applyTo` are stored in the settings file, not as constants (`package_config_service.dart:77-81`) | Same fact as before, without "project files". |
| Integration sections and **Custom Constants**; sections only while the integration is on | ok | `app_constants_service.dart:65-74` | |
| Tip: **Constants updated** card, **Open Constants** | ok | `packages/ai/lib/src/ui/chat_panel/summary_card.dart:233,251` | Tip moved up by the writer (no stacked admonitions); added "In **Agent** mode" (R5). |
| Use a constant: **Custom Expression...**, **Add Custom Expression**, type `AppConstants.<name>`, **Eval**, back arrow | ok | W14 refs (`expression_builder_provider.dart:82-100`); `add_statement_menu.dart:106-120` (**Add Custom Expression**) | `AppConstants` is what the reader types (R3), explained as the group name. Link `logic/expressions.md#custom-expression` exists. |
| Warning (constants ship in the app; Stripe secret key lives in Supabase) | ok | unchanged facts; "compiled into" → "built into" | |

Removed facts: the `AppConstants` class in `lib/globals/app_constants.dart` and "project files" are in the for-code
file under `#constants`, unchanged; the keyword `app_constants.dart` was dropped from the front matter (a file name).
Nothing lost.

## show-data.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro and Future / Stream explained in plain words | ok | R4; behavior unchanged (W14) | |
| Image example: **Image** → **Network** tab → link **Url** to a field with a picture's address | ok | `docs/reference/widgets/media.md:12,30` (B13); linking works like any property | Old createapi.md step brought back. |
| "Pick the source first, so Nowa knows what `data` holds" | ok | same fact as before, without "type" | |
| List: **Item Count** set from `data` ("exactly one row per item"); `element` is the row's item | ok | unchanged facts (W14, `list_view_field.dart`) | |
| Error Builder example text, Stream "keeps the screen up to date" | ok | unchanged facts reworded | |
| Reload: **Stop**, then **Play** again | ok | `packages/designer/lib/src/play_mode/play_mode.dart:516,529,540` (toolbar: **Share preview**, **Reset zoom**, **Stop**; no restart); playing again builds a fresh screen (`:443-487`) | |
| AI tip without mode or check | fixed | R5 | "In **Agent** mode" (Design mode uses demo data), check with **Play**. |

No code-only facts on the page; nothing moved or lost.

## index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Firebase "What you get" cell (routed from B09) | fixed (applied) | `docs/integrations/firebase/connect.md` "What connecting sets up" (apps registered, Firebase settings downloaded into the project, sign-in functions show in Circuit under **FIREBASE**); `firebase/auth.md:51`; `packages/data/lib/src/firebase/firebase_manager.dart:82` | The writer had already removed `FirebaseService` ("their settings files and sign-in functions"); the B09 wording is plainer and says where the functions appear, so applied as suggested: "Your Android, iOS and web apps registered in Firebase and set up in your project, plus sign-in functions you pick in Circuit." |
| Supabase cells: ready-made sign-in functions in the **Supabase** panel | ok | `docs/integrations/supabase/auth.md#meet-the-auth-functions` | |
| Backend, Row Level Security, web API explained in plain words | ok | R4 | |
| "add-on (a package)" + **Add Missing Dependencies** / **Hot Fix** | ok | unchanged facts; `missing_dependency_dialog.dart:47` | |
| What Nowa doesn't include: Nowa AI in **Agent** mode can add a pub.dev package and the code around it, checked with **Problems** and **Run** | ok | `packages/ai/lib/src/tools/packages_tool.dart:31-60` (action `add`) | No result promised. |
| Stripe bullet: "webhook" unexplained | fixed | `docs/integrations/stripe.md:52` | Short gloss added (R4). |
| RevenueCat bullet: paywall implied on the web | fixed | https://www.revenuecat.com/docs/getting-started/installation/flutter (paywalls not on Flutter web) | "widget for iOS and Android". |
| Tip: cURL explained | ok | | |

Removed facts: `SupabaseService` / `FirebaseService` cells are in the for-code file (`#supabase`, `#firebase`), unchanged.

## Coverage spot checks

Obsolete rows (2 of 2 checked, both confirmed):

| Row | Result |
|---|---|
| createapi.md: close the request window, **Widgets** icon, **Get Data** | Confirmed: the Widgets panel is gone in 3.13, a stored "Widgets" panel name is migrated to "Library" (`packages/core/lib/src/panels/panel.dart:39`); **Get Data** was a field of the old tutorial's model, not a Nowa label. |
| Openrouter.md: add a `Content-Type` header by hand | Confirmed: each body type carries its content type (`api_body_types.dart:3-13`) and switching body type rewrites the body (`body_type_actions.dart:37-62`); the page says so in "Add a request". |

Covered rows sampled (13), all confirmed on the cited section: collection groups requests (`rest-api/index.md` intro,
#create-a-collection); **+** → **New Collection** → **Submit**; base URL means only the endpoint (#add-a-request step
4); **Run Test** → **Generate Model** → **Next** → fields → **Save** (#turn-the-response-into-a-model); **POST** to send
data; parameters (#send-values-that-change); test values (#test-a-request); two ways to send a token (#set-the-base-url-headers-and-sign-in,
#add-an-api-key-or-token); Postman upload (`import.md#from-postman`); Swagger URL → **Import**; Xano token → import
(`#from-xano`); **Add Wrapper** → **Data Builder** → **Source** (`show-data.md#add-a-data-builder`); one field per row
via **List** → **Connect** and `element` (`show-data.md#show-a-list`).

## Open issues

1. **REST walk-through, not run:** linking `var1` inside the dialog's **Title** is derived from code (scope walk,
   `block_tree.dart:4894-4900`); the **Edit AlertDialog** / **Title** brush labels come from `logic/popups.md`. Worth a
   live check.
2. **RevenueCat paywall events:** whether **Details** shows an `onDismiss`-style event for the inserted `PaywallView`
   in 3.13 (if so, "go back after closing" needs no AI). P51 (insert hangs in the playground) still unconfirmed.
3. **Deep links:** nothing shows that a Nowa AI merge of the two iOS URL entries works; the page now only offers it,
   with a device test and **Restore Checkpoint**. The product fix (one merged entry) belongs in `product-issues.md`.
4. **Xano Private documentation:** may not import (the link needs a token Nowa ignores). Needs a Xano account.
5. **AdMob privacy:** Nowa's ads package has no consent or tracking prompt; whether the page should point to Apple
   5.1.2(i), the **User Tracking** permission and Google's EEA/UK consent rules is a content decision.
6. **External availability:** learning.postman.com answered 451 "DEPLOYMENT_DISABLED" from about 17:00; the export
   steps were checked against the copy fetched at 16:15 and the v12 search snippets. Re-check the link later.
7. **Cross-batch link and length:** `revenuecat.md` links `publish/ios.md#register-your-bundle-id` (B11 heading,
   implicit anchor); `rest-api/index.md` is about 2,440 words by my count, not split as instructed (the writer's
   split proposal stands).
