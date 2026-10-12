# P14-B09 verification log (verifier P14-B09-V)

Batch: `docs/integrations/firebase/` `connect.md`, `auth.md`, `firestore.md`, `notifications.md`; `docs/integrations/stripe.md`.
Product code: `/home/user/nowa-master` 3.13.0+1 (`3cb32031c`; the P31/P66/P68/P156 fix commits are not ancestors of it).
Code refs are relative to that root. Third-party pages fetched 2026-10-12 with `curl -sL` through the session proxy.
Bug notes P31-P34, P48, P49, P66-P68, P82, P83, P151, P155-P158: `/home/user/nowa/docs/platform_issues/supabase_firebase_stripe.md`.

## Summary

- Pages checked: 5 (all changed lines of the diff against `origin/main`, plus a full read of each page for R1-R9).
- Claims checked: about 150 added or changed claims (UI labels, steps, console steps, behavior), 34 moved facts,
  8 new code-level facts in the for-code file.
- Fixed: 15 table rows (connect 1, auth 4, firestore 2, notifications 1, stripe 7; stripe's rows hold 10 single
  changes). Removed: 2 repeated passages (auth console intro sentence, stripe "payments are only simulated").
  Facts restored: 0 needed (every removed fact is on the page in plain words, in the for-code file, or code-only).
  Audience fixes (R3/R5): 3 (Google Pay hand edit labelled for coders with the code-page link; `withConverter`
  explained; flow table no longer says "Pass it the email field").
- Most serious: (1) `auth.md` said **Phone** adds the iOS setting it needs; in 3.13 that URL scheme is only written
  while **Google** is on, and without it Firebase's iOS SDK stops the app when it sends the code. (2) `stripe.md`'s
  warning implied whole units are always right; Nowa multiplies by 100 for every currency, so zero-decimal currencies
  (yen) are charged 100 times the price. (3) Going live missed two console steps: Stripe business verification
  before live mode, and Google's production approval for Google Pay. (4) Stripe's Apple Pay deploy rewrites the
  iOS entitlements file and drops a push capability (writer's open question; the code is unambiguous, so it's on the
  notifications page now).
- All 3.13 bug notes kept (P31, P32, P33, P34, P48, P49, P66, P68, P83, P151, P155, P156, P157, P158): each still
  matches the 3.13.0 code.
- Links: every relative link and `#fragment` resolves (script, after the edits); `{#sha-fingerprints}` and
  `{#add-collections-and-queries}` kept; images unchanged (same set as `origin/main`); front matter valid; no H1;
  admonitions 2/2/2/1/2; no hype words, em dashes or `---` rules. Renamed headings ("What Nowa adds to your project",
  "What Nowa adds") have no inbound links in `docs/` or in the app.
- Length after edits (prose, no front matter or image lines): connect 1,572; auth 2,137; firestore 2,156;
  notifications 1,325; stripe 2,567. Tightened auth (console intro, flow table) and stripe (sandbox repetition);
  stripe still grew about 140 words for the missing console steps and money caveats. The writer's split proposal
  (move "Choose payment methods" to its own page) still stands; not split.
- Open issues: 9 for the product team (see the end), none blocking.

## connect.md

| claim | verdict | source | note |
|---|---|---|---|
| Create a Firebase project: 6 steps (console, create button unnamed, name + editable project ID that can't change later, terms + **Continue**, optional Analytics and AI assistance, **Create project** → overview page) | ok | https://firebase.google.com/docs/android/setup#create-firebase-project ("New to Firebase or Cloud") | Anchor exists; Analytics "later in the Integrations tab of your Project settings" matches "add it later in your project settings" |
| Nowa can't create the Firebase project | ok | `create_project_dialog.dart` (`CreateProjectNowaDialog`) and `FBManager.createNewFirebaseProject` (`packages/data/lib/src/firebase/firebase_manager.dart:108-110`) have no caller | Dead code, not reachable |
| Step 4: approval lets Nowa see and set up projects | ok | `firebase_manager.dart:146-155` (scopes `firebase`, `cloud-platform`) | |
| Step 6: reuse rules (Android = Bundle Identifier, iOS = matching bundle ID, web name contains app name and "nowa") and the three "will be automatically created" lines | ok | `packages/data/lib/src/firebase/setup/views/fb_apps.dart:93-137,167-185` | |
| App names after **App Name**, e.g. "My App (Android)-nowa" | ok | `firebase_api_service.dart:91-96`; `flutterAppName` = `appNameService.model.name` (`fb_setup_manager.dart:35`) | |
| P155 paragraph: status bar reports `firebase_options.dart` missing | ok | P155 live text "File not found: File lib/firebase_options.dart not found" | |
| Nowa AI note: points you to Settings → Integrations → Firebase | ok | `packages/ai/lib/src/tools/packages_tool.dart:155-162` | |
| "Clicking **Connect Apps** again on the same screen doesn't finish the connection" | ok | `fb_apps.dart:187-230` (`creatingAppsError` never reset, returns before `createSetup`); P32 | |
| What connecting sets up: settings for Android, iOS, web; macOS uses iOS; Windows/Linux none; starts with the app; functions under **FIREBASE**; Firestore starts empty; iOS 15+ | ok | `fb_setup_manager.dart:118-134`; `firebase_package_config.dart:13-20,41-44`; `firebase_plugin.dart:133-144` | |
| Disconnect: removes settings files, sign-in and notification code, start-up step; forgets the Google sign-in; Firebase untouched | ok | `firebase_manager.dart:158-188`; `fb_setup_manager.dart:260-281`; dialog `disconnect_dialog.dart:46-71` | |
| Bundle Identifier bullet | fixed | P82: iOS bundle ID sent as `convertNameCase(segment, camelcase)` (`firebase_api_service.dart:102-103`, `fb_apps.dart:168`), Xcode keeps it as typed; the field allows capitals (`project_detail_settings.dart:122`) | Added "Write it in lowercase: in Nowa 3.13, capital letters can change when Nowa registers your iOS app in Firebase, and then the two IDs don't match." Lowercase letters and digits pass through `camelCase` unchanged |
| Other changed lines (intro, "Before you start" wording, Refresh examples, connected-page table wording, Windows bullet) | ok | as above; P13-verify rows | Refresh after enabling Google: Nowa also refreshes by itself on adding **Google** (`fb_auth_manager.dart:54-70`); the advice is harmless |

## auth.md

| claim | verdict | source | note |
|---|---|---|---|
| **Enable on Firebase.** under the switch opens the project's Authentication page; console path **Security** → **Authentication** → **Sign-in method** → enable → **Save** | ok | `connected_main_screen.dart:118-147`; Firebase password-auth, federated-auth, phone-auth, web/android google-signin pages | |
| Platform extras: SHA for Google/Phone on Android; authorized domains (**Settings** tab, **Authorized domains**, **Add domain**) for Google/Phone on the web | ok | Firebase phone-auth ("Web: ... Settings tab ... Authorized domains ... Add domain"), web google-signin | |
| Phone on iPhone bullet | fixed | https://firebase.google.com/docs/auth/ios/phone-auth ("Enable app verification": silent APNs, else reCAPTCHA) | Was "asks for the same Apple push setup"; now says the push setup lets Firebase check silently, otherwise it falls back to reCAPTCHA, and points to the iPhone catch below |
| "**Google** and **Phone** also add the settings your iOS app needs" | fixed | `_iosUrlScheme` token lives in the `google_sign_in` config (`google_sign_in_package_config.dart:19-25,57-79`); tokens come only from installed packages (`package_config_service.dart:218-238,315-317`); **Phone** doesn't install `google_sign_in` (`fb_auth_manager.dart:72-83`); Firebase iOS SDK 12.8.0 `PhoneAuthProvider.swift:107-112` `fatalError` without the scheme, not catchable by the plugin's `@try` (`FLTPhoneNumberVerificationStreamHandler.m:66-90`) | Now: Google adds its setting; Phone's is only added while Google is on, and without it the iPhone app closes when it sends the code, so try it on an iPhone first. Code reading, not run. Correction added to the for-code file |
| Exception "Must Enable Google Authentication on Firebase" means Google isn't on in the console | ok | `fb_auth_manager.dart:54-62,100-113` (no `CLIENT_ID` in the iOS config) | |
| Account deletion pointer | ok | no delete function in `fb_auth_blocks.dart`; `publish/ios.md#store-rules` quotes 5.1.1(v) | P83 |
| Function table descriptions (signed in right after sign-up; verification only if not verified; web popup) | ok | `fb_auth_blocks.dart:112-130,182-203,326-344,346-361`; Firebase password-auth "the user is also signed in" | |
| P31 note: Instant Play doesn't show it, a real build fails with `GoogleSignIn` errors | ok | 3.13.0 template still uses `GoogleSignIn().signIn()` (`fb_auth_blocks.dart:121-126`) with `google_sign_in ^7.2.0` (`fb_auth_manager.dart:66`); P31 | |
| Email flow table | fixed (tightened) | same refs | Dropped the "What it does" column that repeated the function table; "Pass it the email field" → "with the email the person typed" |
| Phone in two steps; null after automatic sign-in; real devices and web; test numbers (**Phone numbers for testing**) | ok | `fb_auth_blocks.dart:364-425`; Firebase phone-auth (Testing); web: `firebase_auth_web-6.1.2/lib/firebase_auth_web.dart:588-630` implements `verifyPhoneNumber` with reCAPTCHA | FlutterFire's guide names `signInWithPhoneNumber` for web, but the web plugin supports the native call, so the claim holds |
| SHA: why, phone sign-in uses it too, three signing keys table, labels **Release key**, **Add**, **Add a key**, **Enter SHA-1 or SHA-256**, **Add Key**, "No keys found", **Type**; 59-character rule | ok | `fb_sha_keys_management.dart:30,46-63,102,131-201,238`; https://developers.google.com/android/guides/client-auth; Firebase phone-auth (Android SHA-1) | |
| Play App Signing path: **Protected with Play** → **Play Store distribution** → **Go to Play app signing**, **App signing key**, copy each fingerprint | ok | https://support.google.com/googleplay/android-developer/answer/9842756 (register the app signing key with API providers) | |
| Desktop-app runs use the debug key | ok | `packages/core/lib/flutter_tool.dart:119-133` (`flutter run -d`, debug by default) | |
| No-terminal alternative | fixed | `publish/android.md#download-your-files` (`.apk` installs directly; release builds signed with your key) | "Try Google sign-in with a release build" → "Test sign-in with a release build": Google can't build in 3.13 (P31), the keys also serve phone sign-in |
| Turn Authentication off: `sendPasswordResetEmail()` stays, sign-in package removed, AI prompt first, code mode for coders | ok | `fb_auth_manager.dart:121-145`; P33 | R5 satisfied |
| Console-section intro sentence "Nowa reminds you of this under its Authentication switch" | removed (repetition) | | Step 1 already names the reminder's link |

## firestore.md

| claim | verdict | source | note |
|---|---|---|---|
| Create database: **Databases & Storage** → **Firestore**, **Create database**, location (or already set), **Test mode** / **Production mode** meanings, **Create**; rules under **Databases & Storage** → **Firestore** → **Rules** | ok | https://firebase.google.com/docs/firestore/quickstart#create and "Secure your data" | The console defaults to Standard edition when none is picked (https://firebase.google.com/docs/firestore/editions), so no edition step is needed |
| AI path: **AI Assistant** panel, **Assistant** icon at the top of the left sidebar, **Agent** mode, Refresh afterwards, check in **Problems** and **Select Firestore Query** | ok | `research/features-ai.md` ("AI Assistant": first sidebar icon; agent tools `write_top_level_code`, `write_class_member`, `analyze`); `query_builder_manager.dart:24-33`; `data_link_menu.dart:73` ("Select $title"); P49 | No exact output promised |
| Example prompt "lists the pending orders, newest first" | fixed | Firestore needs a field to sort by (none listed) and a composite index for an equality filter plus a sort on another field | Now "lists the orders whose status is pending and keeps updating" |
| P156 prompt | fixed (R3/R5) | P156 (`cloud_firestore_library.dart:205-282`, no `withConverter` on `CollectionReference`) | Names which function to rewrite and says the reader doesn't need to know what `withConverter` is |
| Editors open from the Library with **Filter** **Everything**, no outline panel; code-mode bullet labelled for coders with the code-page link | ok | P48; P13-verify rows 26-39 | |
| Collection = data model, field names must match document fields; type names explained | ok | `json_generator.dart:104` | |
| Builder steps, Future/Stream explanations, `add`/`doc` show as **func** with "The function 'add' isn't defined." | ok | `fb_query_function.dart:57,60`; `block_problems.dart:256`; P156 | |
| Test section, permission-denied text, preview texts, P158 | ok | P13-verify rows 35-37 | unchanged facts |
| Use a query: Data Builder steps, `data.docs` / `data()`, connect **List** to `data.docs` | ok | `integrations/show-data.md#show-a-list` (**List** → **Connect**) | |
| Windows desktop app: **Run**, **Embedded preview** runs the web version, or Android emulator/phone | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-140`; `nowa_run_service_local.dart:54`; `fb_setup_manager.dart:122-134` | routed from B12 |

## notifications.md

| claim | verdict | source | note |
|---|---|---|---|
| Account Holder or Admin role for the push key | ok | https://developer.apple.com/help/account/keys/create-a-private-key/ ("Required role: Account Holder or Admin") | |
| `RECEIVE_BOOT_COMPLETED` explanation | ok | `permissions_service.dart:136-140` | |
| What the app does (permission at start, topic `all`, foreground display, background handling, no screen on tap) | ok | `notification_service_template.dart:30-64` | Android 13 permission (writer's open question): `firebase_messaging-16.1.1` and `flutter_local_notifications-20.1.0` declare `POST_NOTIFICATIONS` in their manifests and the service calls `requestPermission()` (`:33,63-64`), so nothing is missing |
| Platform table (background settings iOS, Android build setting, no web push setup) | ok | `firebase_package_config.dart:47-60` (`fetch`, `remote-notification`, desugaring) | |
| App ID: **Identifiers** → select → **Edit** → tick **Push Notifications** → **Save** → **Confirm** | ok | https://developer.apple.com/help/account/identifiers/enable-app-capabilities/ | Apple also says profiles using a changed App ID must be regenerated: open issue 7 |
| Push key: **Keys**, **+**, **Key Name**, tick APNs, **Configure**, environment + type (**Team Scoped** / Topic Specific), **Confirm**, **Download** `.p8` once, **Done**; Key ID under the key name; Team ID in **Membership details** | ok | create-a-private-key; get-a-key-identifier; glossary/team-id; communicate-with-apns-using-authentication-tokens ("works for both the development and production environments") | |
| Firebase upload: settings (gear) → **Cloud Messaging** → **iOS app configuration** → **APNs authentication key** → **Upload**; dev/production slots, at least one; `.p8`, Key ID, Team ID, **Save** | ok | https://firebase.google.com/docs/cloud-messaging/flutter/client#upload-authentication-key | |
| Capability: in-app note text, Xcode on Mac only, **Open Xcode Workspace** in the macOS app, AI path with a test notification as the check and **Restore Checkpoint** | ok | `notification_settings.dart:93-118` (`NPlatform.isMacOs`, opens `<project path>/ios/Runner.xcworkspace`); `features-ai.md` (`write`/`edit` tools cover entitlements and platform files) | |
| Apple Pay deploy drops the push capability | fixed (added) | Every successful **Deploy Configuration** with Apple Pay on ends in `_configurePlatformSettings` → `configureIOS` → `_writeApplePayEntitlements`, which writes `ios/Runner/Runner.entitlements` whole with only the Apple Pay key (`stripe_supabase_service.dart:414-416,920-932`; `stripe_manager.dart:65-76,102-118`) | Writer's open question; the code is unambiguous. Added one sentence: add the capability again after each **Deploy Configuration** when the app also uses Apple Pay through Stripe |
| Test section, Target Audience table, P34 warning, turn-off paragraph | ok | P13-verify rows 22-25; `package_service.dart:276,345-350` | |

## stripe.md

| claim | verdict | source | note |
|---|---|---|---|
| Keys: publishable safe to expose, secret not; API keys page; `pk_test_`/`sk_test_` in a sandbox, `pk_live_`/`sk_live_` in live mode | ok | https://docs.stripe.com/keys | |
| "and payments are only simulated" | removed (repetition) | | Same point as "no real money moves" in "Before you start" |
| "Nowa adds Stripe to your project, so the rest of the page opens up"; Country Code is the business's | ok | `stripe_settings.dart:97-98`; Stripe payment sheet docs ("country code of your business") | |
| Webhook steps (Workbench **Webhooks** tab, **Create an event destination**, **Your account**, payload format, events, **Continue**, **Webhook endpoint**, **Endpoint URL**, **Reveal secret**, `whsec_`) | fixed (2 additions) | https://docs.stripe.com/webhooks#create-webhook-endpoint; https://docs.stripe.com/event-destinations | Step 3 now links the Webhooks tab (`https://dashboard.stripe.com/webhooks`, the link Stripe's own step uses). Step 5 says **Snapshot** "not the recommended **Thin**" (Stripe lists "Thin (recommended)") and that the API version can stay at the account default (Stripe: snapshot destinations "use the default API version of the Stripe account") |
| Snapshot is required because Nowa's webhook needs the full event | ok | `stripe_edge_functions.dart:803-835,855-862` (`constructEventAsync`, `event.data.object`); Stripe: thin events carry only type and IDs, snapshot events "the complete Event object" | |
| Wallets follow the Dashboard's payment methods settings | ok | `automatic_payment_methods: { enabled: true }` (`stripe_edge_functions.dart:132`); https://docs.stripe.com/payments/mobile/accept-payment-embedded | |
| Google Pay paragraph | fixed (R5 + 2 facts) | P68 (`stripe_supabase_service.dart:530-566,846-850`); Stripe payment sheet docs ("You can only test Google Pay on a physical Android device"); https://docs.stripe.com/google-pay#go-live | "or change it in code mode" → "If you edit code yourself, see [What Nowa adds to your code](../code/generated-code.md#stripe)" (the file and `testEnv` are in the for-code file); added real-phone testing and that Google must approve the app (pointer to Go live) |
| Apple Pay steps 1-6, 25-month expiry, one CSR per certificate | ok, step 6 completed | https://developer.apple.com/help/account/capabilities/configure-apple-pay/; enable-app-capabilities ("Enable Apple Pay": select merchant IDs, **Continue**, **Save**); https://docs.stripe.com/apple-pay?platform=ios | Step 6 now ends with "and save" |
| Currency codes; **Fixed Value** | fixed (added) | `stripe_supabase_service.dart:495-497` (fixed value lowercased, column value passed as stored); https://docs.stripe.com/currencies ("use all lowercase letters") | Added: write codes in a currency column in lowercase (`usd`) |
| Warning: amount × 100 | fixed (added) | `stripe_edge_functions.dart:124,302` (`Math.round(amount * 100)` for every currency); https://docs.stripe.com/currencies#zero-decimal ("to charge 500 JPY, provide an amount value of 500") | Added: in 3.13 this also happens for zero-decimal currencies (500 yen charged as 50,000); check Stripe's list first |
| Deploy: "takes a moment", Supabase tables/functions, secret names in the check, iOS **Camera** permission, tables kept | ok | `stripe_supabase_service.dart:374-427`; `stripe_manager.dart:65-72`; `CREATE TABLE IF NOT EXISTS` (`stripe_edge_functions.dart:171,349,574`) | |
| Test cards (4242..., 12/34, any three-digit CVC, no real card details) | ok | https://docs.stripe.com/testing | |
| `cancelSubscription()` fails in 3.13 (P66), cancel in the Dashboard, webhook updates the record | ok | `stripe_edge_functions.dart:659` (still `.order('created_at', ascending: false)`), `:818-821`; P66, P67 | |
| Go live | fixed (2 steps added) | https://docs.stripe.com/get-started/account/activate ("To use a service in live mode, verify your business"); https://docs.stripe.com/keys ("toggle from sandbox mode to live mode", **Reveal live key**); https://docs.stripe.com/google-pay#go-live ("request production access ... Choose the integration type Gateway"); https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access | Step 1 now says live mode needs business verification first; step 4 asks for Google's production approval before switching Google Pay. Note: Stripe's payment sheet page itself doesn't repeat the approval step; its Google Pay guide and Google's own guide require it for apps that take Google Pay |
| Extra-spaces row; keys and webhook from the same mode | ok | no trimming in `AsyncTextField` (`nowa_fields.dart:1159-1260`) or the setters (`stripe_supabase_service.dart:244-251,295-312`); keys page ("objects in one mode aren't accessible to the other") | |
| Remove Stripe: "the Android and iOS changes it made, including the Apple Pay setting" | fixed | `stripe_manager.dart:21-35` (removes ProGuard, styles, MainActivity and only the Apple Pay key; the Camera permission stays, as the next paragraph says) | Now "its Android changes and the Apple Pay setting" |
| Purchase-type examples, constants not secret, RLS explained, method table | ok | old page; `stripe_package_config.dart:19-45`; P13-verify rows 126-128 | |

## For-code file

- 34/34 moved bullets match `origin/main` text verbatim (script). 8/8 "Added (new, verified)" facts confirmed:
  collection metadata and main-only **Select Collection** (`collections_manager.dart:21-24,70-79`,
  `firestore_collection.dart:14-16`, `lists_widgets.dart:61-63`, serialized by `declaration_runtime.dart:275-281`);
  pickers list all non-constructor functions (`query_builder_manager.dart:24-33`, `firebase_field.dart:70-76`,
  `firebase_plugin.dart:133-144`); field-name keys and `DateTime.tryParse` / `toIso8601String`
  (`json_generator.dart:104,152-157,228-231`); no `aps-environment` in the client; deploy regenerates
  `StripePaymentService` with `testEnv: true` (`stripe_supabase_service.dart:517-566,846-850`); `constructEventAsync`
  and `2025-12-15.clover` / `stripe@17.5.0`; values saved untrimmed; Apple Pay entitlements written whole.
- Added (marked "Added by the verifier"): a correction to the moved bullet about the **Google**/**Phone** URL scheme,
  and four Stripe facts (when the entitlements file is rewritten, × 100 for every currency, currency column case,
  removed Stripe fields the webhook still reads).

## Coverage spot checks

- Obsolete rows (4) all confirmed gone in 3.13.0: "Supabase MCP must be enabled" and the MCP troubleshooting tip
  (Stripe deploys through its own `SupabaseOAuthManager`, `stripe_supabase_service.dart:20,224-251`; no MCP reference
  in `packages/core/lib/src/integrations/stripe`); Business Table `name`/`type` columns and the `type` column (Map
  Fields offers only **ID Field**, **Amount Field**, **Currency**, `stripe_settings.dart:356-446`). The two extra old
  events (`payment_intent.canceled`, `.processing`) aren't handled by the webhook (`stripe_edge_functions.dart:803-835`).
- Covered rows sampled (11), all hold: Nowa creates the apps and config files (`connect.md#connect-your-project`);
  Email/Password and Google providers (`auth.md`); Discord and team@nowa.dev (`account/help.md`, "Join the community
  and contact us"); skip the login screen (`auth.md` Redirect Logic, `logic/router.md#start-on-login-or-home`);
  commit to GitHub (`code/github.md`); view generated code (`code/code-mode.md`); test on a simulator
  (`test/devices.md`); advanced queries and streams (`firestore.md#build-a-query`); test notification fields and the
  two notification images (`notifications.md`); currency column (`stripe.md#connect-your-table`).

## Open issues (for the product team; none block the pages)

1. **Phone sign-in on iPhone (new).** The phone-auth URL scheme is computed in the `google_sign_in` package config,
   so it's written only while that package is installed (the **Google** provider). With **Phone** alone, Firebase iOS
   SDK 12.8.0 hits `fatalError` in `verifyPhoneNumber`. With **Google** on, P31 breaks the build. So phone sign-in on
   iPhones likely can't work in 3.13. Code reading plus SDK source, not run. The page states the facts and says to
   try it on an iPhone first. Suggest moving the token to the `firebase_auth` config.
2. **Zero-decimal currencies (new).** `Math.round(amount * 100)` for every currency (`stripe_edge_functions.dart:124,302`).
   On the page as a warning line; suggest using Stripe's zero-decimal list in the function.
3. **Currency column case (new, minor).** Column values aren't lowercased (fixed values are). On the page as a tip.
4. **Webhook and removed Stripe fields (writer's question).** `invoice.subscription` and subscription-level
   `current_period_*` are gone since `2025-03-31.basil`; the webhook and `stripe-create-subscription` still read them,
   so on current API versions the period columns stay empty and the `invoice.*` branches do nothing, while the status
   still follows `customer.subscription.*`. Not on the page: the page doesn't promise period dates, and no
   destination API version fixes it (the create function pins `clover`). Logged in the for-code file.
5. **Apple Pay drops push (writer's question).** On the notifications page now; suggest merging the key into an
   existing entitlements file instead of replacing it (`stripe_manager.dart:102-118`).
6. **P82 (known, fix not shipped).** Lowercase hint added to `connect.md`; remove the 3.13 clause when PR #3542 ships.
7. **Provisioning profiles.** Apple invalidates profiles when an App ID's capabilities change. Whether Nowa's iOS
   build makes new ones by itself wasn't checked (not in the client repo); the pages don't claim either way.
8. **Firestore `DateTime` fields** read text dates (`DateTime.tryParse`), so documents with Firestore timestamps may
   fail to load (writer's question, code reading). Not on the page.
9. **Product text.** The **Webhook URL** helper still says "(Developers > Webhooks > + Add endpoint)"
   (`stripe_settings.dart:568-570`); Stripe now uses Workbench and event destinations. Stripe also recommends restricted
   keys over secret keys; which permissions Nowa's functions would need wasn't checked, so the page keeps **Secret Key**.

For other pages (not edited; suggestions for the orchestrator): `troubleshooting/known-issues.md` (B12) could carry
open issues 1 and 2 by symptom ("Phone sign-in closes the iPhone app", "Yen prices charged 100 times"), linking
`integrations/firebase/auth.md#functions-nowa-adds` and `integrations/stripe.md#connect-your-table`.
