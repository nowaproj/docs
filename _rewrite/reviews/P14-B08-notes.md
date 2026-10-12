# P14-B08 notes (phase 14: audience, coverage, tone)

Batch: `docs/integrations/` `revenuecat.md`, `rest-api/index.md`, `rest-api/import.md`, `show-data.md`,
`constants.md`, `admob.md`, `google-maps.md`, `google-sign-in.md`, `deep-links.md`, `index.md`.
Rules applied: R1-R9 of `P14-BRIEF.md` (R9 tone added mid-run; applied to every page from the start).
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Earlier verified refs for unchanged
claims are in `reviews/W14-writer-notes.md` (REST API, import, show data, constants, index) and
`reviews/W17-writer-notes.md` (RevenueCat, AdMob, Google Maps, Google Sign-In, Deep links). Third-party pages were
fetched on 2026-10-12; every URL cited below returned 200 that day.

## revenuecat.md

What changed for the reader:
- Rewritten around what the reader does: set up what you sell in RevenueCat, turn it on and add keys, add the paywall,
  test on a device, use purchases from logic, publish, turn off. The user's quoted developer list ("Generates
  `lib/integrations/revenuecat_service.dart`...", the `main()` line, `app_constants.dart`, `MainActivity`,
  `purchases_flutter`, `purchases_ui_flutter`, the method table) moved to the for-code file (#revenuecat). One link to
  `../code/generated-code.md#revenuecat`, in "Turn RevenueCat off".
- User-facing consequences kept in plain words: "starts it each time your app opens" (main statement,
  `packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart:49-56`); "your app needs
  iOS 14 or later" (`minIosVersion: '14.0'`, `:22`); keys on **Constants** in a **RevenueCat** section, both ways
  (`packages/core/lib/src/settings/constants_settings.dart:46-104`); after turning off, keys show under **Custom
  Constants** (sections only for installed packages: `packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:65-74`;
  cleanup doesn't touch `AppConstants`: `package_config_service.dart:146-172`).
- "Call RevenueCat from logic" is now "Use purchases in your logic", no-code first: open the paywall screen from a
  button (navigation, no code); unlock features for paying users with a Nowa AI prompt (no generated entitlement
  check exists: the service has only `configureRevenuecat`, `fetchOfferings`, `purchasePackage`,
  `revenuecat_package_config.dart:72-114`), checked with **Problems** and a device test; own buy buttons: the two
  steps the reader can pick in Circuit, explained in plain words (R3), with an AI prompt first.
  - `RevenuecatService` is listed in Circuit: it has a private `_instance` and a factory constructor, so
    `isSingleton` is true and the class shows **Members** (`packages/core/lib/src/interpreter/suggestion.dart:660-664`,
    `:689-721`). Derived from code, same pattern the REST API and Stripe pages use; not live-checked.
- R9: intro says what RevenueCat does for the reader's app; each section says why and what happens next.

Added (new claims and their sources):
- RevenueCat concepts and dashboard steps (products, entitlements, offerings; **Product catalog** → **Products** /
  **Entitlements** / **Offerings**, **+ New**, **Test Store** tab, **Attach**, default offering = the one the SDK
  returns): https://www.revenuecat.com/docs/projects/configuring-products.
- Add an app config from **Apps**, a web config from **Web** (RevenueCat Billing, Stripe, Paddle); App Store and
  Google Play configs ask for the bundle ID / package name: https://www.revenuecat.com/docs/projects/connect-a-store.
  Nowa's **Bundle Identifier** is in **Project Details** (`docs/publish/index.md#app-details`, verified there).
- Paywall belongs to an offering; **Paywalls** page → **Create paywall** (scratch, template, AI); **Publish Paywall**;
  served when its offering is the default; "without any code changes or app updates":
  https://www.revenuecat.com/docs/tools/paywalls, https://www.revenuecat.com/docs/tools/paywalls/creating-paywalls.
- Public keys under **API keys** (or the app under **Apps**); secret keys start with `sk_`, never in an app:
  https://www.revenuecat.com/docs/projects/authentication.
- **Web API Key** = public key of the web config: https://www.revenuecat.com/docs/getting-started/installation/flutter
  ("configure the SDK in your Flutter app using the public API key of the web config you created"). The field hints
  `appl_`, `goog_`, `strp_` are Nowa's placeholders (`revenuecat_package_config.dart:27,35,43`); RevenueCat's current
  docs don't list key prefixes, so the page claims none beyond the hints.
- Nowa inserts the paywall with no settings (`CallExpr(reference: ReferenceBlock('PaywallView'))`,
  `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:944`). RevenueCat: without an offering argument
  `PaywallView` shows the current offering; `onDismiss` fires on close or a successful purchase and the app must act
  ("Dismiss the paywall, i.e. remove the view, navigate to another screen"); avoid putting it in a modal or bottom
  sheet: https://www.revenuecat.com/docs/tools/paywalls/displaying-paywalls. Hence "your app decides what happens
  next ... Nowa adds the paywall without that step" and the AI prompt.
- Paywalls include a **Restore Purchases** button by default: https://www.revenuecat.com/docs/getting-started/quickstart
  (section "8. Restore purchases"). This answers half of product issue P46 (restore exists on the paywall; still
  none for custom buy flows, hence the restore prompt in "Build your own buy buttons").
- Paywalls need iOS 15+ / Android 7.0+: https://www.revenuecat.com/docs/tools/paywalls/installation; not supported
  on Flutter web yet: https://www.revenuecat.com/docs/getting-started/installation/flutter ("RevenueCat Paywalls
  (presentPaywall) is not yet supported on web").
- Test Store (separate API key, simulated purchase dialog with success / failure / cancel, release builds stop on
  purpose, TestFlight and Play testing tracks count as release): https://www.revenuecat.com/docs/test-and-launch/sandbox/test-store.
  Nowa's device runs are debug builds (`flutter run -d <device>` without a mode flag, `packages/core/lib/flutter_tool.dart:119-133`),
  so pasting the Test Store key into the Apple / Android fields works there. Sandbox testing:
  https://www.revenuecat.com/docs/test-and-launch/sandbox. Launch checklist:
  https://www.revenuecat.com/docs/test-and-launch/launch-checklist.
- "Apple expects a way to restore purchases": guideline 3.1.1 as quoted on `docs/publish/ios.md#store-rules`.

Unchanged and still verified: settings path and save behavior (W17), placeholder texts "RevenueCat Paywall" /
"Run to preview" / "Run on a simulator/emulator or mobile device to preview"
(`packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:28-70`), **Add Missing
Dependencies** with two packages (`revenuecat_package_config.dart:127-138`).

Open questions:
- P51 (playground only): adding the paywall hung on "Adding..." with "Bad state ... PaywallView". Not on the page
  (unconfirmed on a normal account); re-check live.
- Does **Details** show any paywall fields in 3.13 (the package analyzer may now type `PaywallView`, e.g. an
  `onDismiss` event)? If it does, the "what happens next" paragraph could point at that field instead of Nowa AI.
- Apple's In-App Purchase capability: RevenueCat's iOS guide says to enable it in Xcode for App Store purchases;
  nothing in Nowa's code adds or mentions it. Not on the page; worth a check with the team for cloud iOS builds.

## rest-api/index.md

What changed for the reader:
- New section "How an API request works": request, base URL and endpoint, method, header, API key or token, body,
  JSON, response, parameter, each in plain words with an example (R4; the batch note asked for request, endpoint,
  header, API key, JSON and response). Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods;
  JSON: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON. Methods offered in Nowa:
  `packages/data/lib/src/api/utils/api_util.dart:11` (the page lists GET, POST, PUT, DELETE, PATCH, HEAD as before;
  DOWNLOAD still left out, see W14 notes).
- Moved to for-code (#rest-api): the `lib/api/cats.api.dart` file name, "and its file" on **Name**, "written into
  the collection's Dart file", the `Uint8List` / `List<int>` test detail, the `lib/models` default. In their place:
  "**Path**, where the collection is saved in your project", "saved in your app's code and ship inside your app",
  "Nowa uses it for this test only", "the **Path** (the folder where the model is saved)".
- **Class name** explained as "the name you'll pick in Circuit" (old createapi.md note): the collection class is a
  singleton listed in the app's own category (`packages/core/lib/src/interpreter/suggestion.dart:660-664`, `:689-721`);
  dialog: `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:70-78`.
- **Auth Key** rewritten in plain words with the why (old `.authkey.md` tip): one token per signed-in user, saved
  once on the device, sent with every request as `Authorization: Bearer <token>`
  (`packages/data/lib/src/api/interceptors/generate_auth_interceptor.dart:4-23`). Field helper "The key used to
  store the auth token in SharedPreferences" (`api_edit_collection_dialog.dart:163-174`).
- Body types: type names explained (R3): **String** (text), **int** (whole number), **double** (decimal number),
  **bool** (yes or no); "content type (the header that tells the API which format you're sending)".
- **Object** tab described as what the request hands to your app: the test view shows the returned object named
  `result` (`packages/data/lib/src/api/views/api_panel/api_test_section/test_section_preview.dart:74-80`).
- R9: intros on every section say why (shared settings save typing; testing before building a screen; models keep
  only the parts you need).

Added (old docs, still valid):
- Header example `Accept` / `application/json` on the collection (createapi.md); **Add header**, **KEY**, **VALUE**:
  `api_edit_collection_dialog.dart:222-246`, `packages/data/lib/src/api/views/widgets/headers_field.dart:33,52`.
- "Add an API key or token" section (Openrouter.md, .authkey.md): `Authorization: Bearer YOUR_KEY`, key before the
  colon, value after; collection header vs a request's **Headers** tab (`headers_field.dart:33-69`, request headers
  tab `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_form.dart:39-58`). Warning kept and
  extended with the no-code safe path (R5): Nowa AI with the Supabase connector can deploy and manage edge
  functions (`docs/ai/connectors.md` "Deploy and manage Edge Functions"; research `features-ai.md:443`). The prompt
  is an example; no result promised.
- "Copy the example body from your API's documentation and swap in your parameters" (Openrouter.md step 5).
- Status code meanings 200 / 401 / 403 / 404 / 500 in the test section:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status. Nowa shows "Status: <code> <message>"
  (`packages/data/lib/src/api/views/api_overlay/api_overlay_header.dart:46-80`).
- "Example: send what someone types and show the answer" (`{#example-send-what-someone-types}`), the old
  Openrouter.md walk-through rebuilt with 3.13 labels, all from verified pages: Text Field adds a `text` controller
  variable and its `text` holds what's typed (`docs/reference/widgets/forms.md#text-field`); request picked from
  Circuit's **+** menu (W14 notes); call arguments show as fields named after the parameter, capitalized
  (`packages/core/lib/src/fields/block_field.dart:215-217`, `packages/core/lib/src/utils.dart:77-79`), so a
  `question` parameter shows **Question**; **await** + **Store result** → `var1` (`docs/logic/circuit.md#future-options`);
  `showDialog` under **MATERIAL** with **Edit AlertDialog** (`docs/logic/popups.md#show-a-dialog`); **+** to reach a
  field (`docs/logic/expressions.md#plus`); **Play** runs real requests (simulate mode, W14 notes). The custom
  expression `value.choices!.first?.content` of the old page is replaced by the link menu. Linking `var1` inside the
  dialog's builder is derived from code (local scope walks up to the enclosing function), not live-checked.
- The cURL tip now explains cURL in plain words ("the one-line example request many API docs show").

Length: about 2,330 prose words (was about 1,630), above the ~2,200 guide. Proposed split (not done): keep
"Connect a REST API" for basics, collection, settings, keys and requests; move "Test a request", "Turn the response
into a model", "Use a request in your app" and the example to a new page "Test requests and use the answers"
(`rest-api/test-and-use.md`), with the anchors `#test-a-request`, `#turn-the-response-into-a-model` and
`#example-send-what-someone-types` (inbound links: `show-data.md`, `rest-api/import.md`, `known-issues.md`).

Open questions:
- Can a collection header value link to a constant (so an API key could live on the **Constants** page)? Not
  checked; the page doesn't claim it. It would still ship in the app.

## rest-api/import.md

What changed for the reader:
- R9: intro asks the reader's question ("Why type requests by hand..."), "Here's what you get" before the source
  steps, a sentence on what a Swagger/OpenAPI file and a cURL command are (R4).
- Moved to for-code (#rest-api): "It needs both an `info` and an `item` section" (JSON internals). The table row now
  says to export again with **Export collection**.

Added (old docs, still valid) with sources:
- Postman export steps (old postman.md, labels updated to Postman v12): **Collections** → **View more actions** →
  **More** → **Export collection** → **Export JSON**:
  https://learning.postman.com/docs/getting-started/importing-and-exporting/exporting-data/. The old "choose v2.1"
  step is gone from Postman's UI, so no version advice (the importer doesn't require it either, W14 notes).
- Swagger sample address (old swagger.md): `https://petstore.swagger.io/v2/swagger.json` returns Swagger 2.0 JSON
  with operation IDs `getPetById`, `findPetsByStatus` and 18 more (fetched 2026-10-12). Nowa names requests after
  the operation ID when there is one (`packages/data/lib/src/api/importers/swagger_importer.dart:36-41`).
- "often at an address ending in `swagger.json` or `openapi.json`": Nowa's own base URL logic strips exactly these
  two file names (`packages/data/lib/src/swagger/utils/url_parser.dart:40-42`); worded as "often".
- Swagger 2.0 base URL comes only from a pasted address (no `servers` entry: base URL from the input URL;
  pasted text or a file gives none): `url_parser.dart:21-57`, `swagger_importer.dart:24-25`.
- YAML: "Convert the file to JSON first, for example in the Swagger Editor" (https://editor.swagger.io/, 200). The
  editor's current menu label couldn't be confirmed (JS app; GitHub code search not available here), so the step
  names no menu item.
- Xano token steps (old xano.md, labels updated): profile icon → **Instances** → gear → **Metadata API** → **Manage
  Access Tokens** → **New Access Token**, name, expiry (default 7 days, 1 hour to never), scopes with C/R/U/D,
  token shown once: https://docs.xano.com/xano-features/metadata-api. Scope names **Content** and **API Groups**
  are from the scope table on that page. Nowa only reads instances, workspaces and API groups
  (`packages/data/lib/src/xano/xano_service.dart:16-29`), hence "R for Content and API Groups is enough".
- Xano group documentation must be on: Nowa imports each group from its Swagger documentation link
  (`packages/data/lib/src/api/importers/xano_importer.dart:52-57`) and ignores the group's `require_token` / `token`
  fields (`packages/data/lib/src/xano/models/xano_api_group_model.dart`). Xano: **Connect this backend** in the
  header → **API Groups** tab; access levels Public / Private / Disabled:
  https://docs.xano.com/the-function-stack/building-with-visual-development/apis/swagger-openapi-documentation.
- Error rows: "Invalid token" can't really appear (the fetch catches its own errors and shows "Failed to fetch
  instances", `packages/data/lib/src/api/views/widgets/xano_import_step_view.dart:33-74`); both stay listed. Select
  failures and "Failed to import from Xano" come from `:76-105`; the scope and documentation hints are inferences
  from which calls fail there.

Open questions:
- Does a Xano group with **Private** documentation import? Its link may need the token Nowa ignores. If not, the
  page should say "set it to Public while you import". Needs a live test with a Xano account.
