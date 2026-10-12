# P14-B09 notes: Firebase (connect, auth, Firestore, notifications) and Stripe

Batch P14-B09. Rules: `P14-BRIEF.md` (R1-R9, C1-C5). Code refs are relative to `/home/user/nowa-master` (3.13.0,
`3cb32031c`). Official pages were fetched on 2026-10-12 with curl through the session proxy (WebFetch could not resolve
hosts here); the text quoted below is what those pages say today. Facts that were already on the pages and verified in
P13 (`reviews/P13-verify.md`) and W16/W17 are kept; the 3.13 bug notes (P31, P32, P33, P34, P48, P49, P151, P155,
P156, P157, P158, P66, P67, P68) keep their facts, only reworded.

## Page: `docs/integrations/firebase/connect.md`

Changed for the reader:
- Intro rewritten (R9): what Firebase does for the app (sign-in, data, notifications) and what connecting saves you.
- "Before you start": Bundle Identifier explained in plain words with an example; Firebase project bullet points to the
  new create section.
- "What Nowa adds to your project" (a table of file paths and packages) replaced by "What connecting sets up", a list
  of what each part means for the app. File paths, package names and the `main.dart` line moved to the for-code file
  (`#firebase`). User-facing consequences kept: platforms covered by the settings (Android, iOS, web; macOS uses the
  iOS settings; Windows and Linux get none), Firebase starts with the app, iOS 15 or later. One link to
  `../../code/generated-code.md#firebase`.
- P155 paragraph: "`lib/main.dart` points at a missing `firebase_options.dart`" became "your app stops building (the
  status bar reports that a file named `firebase_options.dart` is missing)"; the status bar text is what P155 saw live
  ("File not found: File lib/firebase_options.dart not found"). Moved sentence in the for-code file.
- Nowa AI note: dropped the package name `firebase_core` (moved).
- Refresh: says when to use it (after adding a fingerprint or turning on a sign-in method) and what it does in plain
  words; `lib/firebase_options.dart` moved.
- Disconnect: "Keep Files keeps `collections.dart` and `queries.dart`" became "keeps your Cloud Firestore collections and
  queries"; the removal list in plain words. Moved sentences in the for-code file.
- "An app can't be created": added "Clicking **Connect Apps** again on the same screen doesn't finish the connection"
  (P32: the retry creates the missing apps but stops before the setup, `packages/data/lib/src/firebase/setup/views/fb_apps.dart:57,201,211,221,224-230`).

Added:
- "Create a Firebase project" (old page, video step 1). Steps from Firebase's "Add Firebase to your Android project",
  Step 1, "New to Firebase or Cloud" (https://firebase.google.com/docs/android/setup#create-firebase-project): "Sign into
  the Firebase console", "Click the button to create a new Firebase project", "In the text field, enter a project name",
  "you can optionally click the Edit icon now to set your preferred project ID, but you cannot change this ID after
  project creation", "If prompted, review and accept the Firebase terms, then click Continue", "(Optional) Enable AI
  assistance ... (called "Gemini in Firebase")", "(Optional) Set up Google Analytics ... You can always set up Google
  Analytics later in the Integrations tab of your Project settings", "Click Create project ... you'll be taken to the
  overview page". The button that starts creation isn't named in the docs, so the page doesn't name it either. Nowa
  can't create projects: `packages/data/lib/src/firebase/setup/views/fb_projects.dart:41-63` (W16 review). "You don't
  have to add any apps there": Nowa creates them on **Connect Apps** (`packages/data/lib/src/firebase/firebase_api_service.dart:80-105`, display names `<App name> (Android)-nowa` at `:91-96`).
- "Approve the request, so Nowa can see and set up your Firebase projects": the sign-in asks for the `firebase` and
  `cloud-platform` scopes (`packages/data/lib/src/firebase/firebase_manager.dart:149-151`).
- "iOS 15 or later": `packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:41-44`
  (`cloud_firestore`, `minIosVersion: '15.0'`), applied to the Podfile as the highest minimum of all packages
  (`packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:133-136,323-331`).
- Platforms: `packages/data/lib/src/firebase/setup/fb_setup_manager.dart:118-134` (`currentPlatform`: web, Android,
  iOS or macOS get options, otherwise `null`).

Open questions: none new.

## Page: `docs/integrations/firebase/auth.md`

Changed for the reader:
- Intro rewritten (R9): what sign-in gives the app and how the pieces fit (switch on, Nowa writes functions, wire buttons).
- New first task "Turn on sign-in methods in the Firebase console" (see Added). The old "Before you start" bullet about
  the console became this section.
- Function table: names kept (the reader picks them in Circuit's **FIREBASE** category, R3) with plain descriptions;
  `FirebaseService` and `lib/firebase/firebase.dart`, the `google_sign_in` package and `Info.plist` moved to the
  for-code file. "Answers yes (true)" explains a bool; "(a Future)" explained as waiting for Firebase to answer (R4).
- `google_sign_in` note (P31): same facts in plain words: an older version of Google's sign-in package than the one
  Nowa installs; Instant Play doesn't show it (`invoke` is a preview dialog, `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:132-171`);
  a real build (**Run** or a cloud build) fails with errors that mention `GoogleSignIn` (P31's three analyzer errors);
  turning **Google** off removes the function and the package. The file path and the 7.x version moved.
- Status bar error (P151): added "You can carry on", the conclusion of `troubleshooting/known-issues.md#invalid-type-in-status-bar`.
- "Exception: Must Enable Google Authentication on Firebase": added the cause in plain words (Google isn't switched on in
  the console; thrown when the iOS config has no client ID, `packages/data/lib/src/firebase/auth/fb_auth_manager.dart:54-62`, W16 review).
- Circuit steps: events explained ("what happens when someone taps it"), **onError** given a purpose. AI tip now says how
  to check the result (**Play**, **Problems**, R5).
- SHA section rewritten around what fingerprints are and why Google needs them (R4), with a table of the three keys that
  can sign the app. Release key steps kept unchanged. The `keytool` steps kept but labelled "This step uses a terminal",
  and a no-terminal alternative added (see Added).
- "Turn Authentication off": the code-mode instruction (R5) now leads with Nowa AI in Agent mode; the code-mode delete
  stays for people who code. Added why it matters (P33: with Authentication off the package that `sendPasswordResetEmail`
  calls is removed, so the function can't work; P33 says the file then no longer compiles, "expected; not run", hence
  "can break your app's build").

Added (old page items and brief):
- Console steps for sign-in methods (old firebase-connect video: "Enable Firebase Authentication in Firebase and Nowa",
  "Enable Authentication providers"). Official: Email/Password, "In the Firebase console, go to Security >
  Authentication. In the Sign in method tab, enable the Email/Password sign-in provider. Click Save."
  (https://firebase.google.com/docs/auth/flutter/password-auth); Google, "In the Firebase console, go to Security >
  Authentication. In the Sign-in method tab, enable the Google sign-in provider. Click Save."
  (https://firebase.google.com/docs/auth/android/google-signin, https://firebase.google.com/docs/auth/web/google-signin);
  Phone, "In the Sign in method tab, enable the Phone sign-in provider" (https://firebase.google.com/docs/auth/flutter/phone-auth).
  The tab is written "Sign in method" on one page and "Sign-in method" on three; the page uses **Sign-in method**.
  **Enable on Firebase.** is always shown under the switch and opens `.../project/<id>/authentication`
  (`packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:111-147`); the warning text says to enable the
  method in Firebase "before activating it in Nowa" (`:129`).
- Platform extras: Phone on iOS needs push + APNs key + background modes ("iOS+: In Xcode, enable push notifications for
  your project & ensure your APNs authentication key is configured with Firebase Cloud Messaging (FCM)", phone-auth page);
  Android SHA-1 for Google and Phone (federated-auth and phone-auth pages); web: "go to the Security > Authentication >
  Settings tab. In the Authorized domains section, click Add domain, and add your domain" (phone-auth page). Google on the
  web: `signInWithGoogle()` uses a popup on web (`fb_auth_blocks.dart:112-120`), and `signInWithPopup` throws
  `auth/unauthorized-domain` "if the app domain is not authorized for OAuth operations for your Firebase project. Edit the
  list of authorized domains from the Firebase console." (https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth,
  signInWithPopup error codes). The Nowa web address example links to `publish/web.md`.
- Account deletion pointer: the functions Nowa adds don't delete accounts (`fb_auth_blocks.dart:33-472` has no delete;
  P83), Apple 5.1.1(v) is quoted on `publish/ios.md#store-rules`.
- "Build an email sign-in flow" (old firebase-email-auth video: sign-up, sign-in, verify email, reset password). Each row
  is a function on the table: `signUpWithEmailAndPassword` (`fb_auth_blocks.dart:182-203`), "the user is also signed in"
  (Firebase: "If the new account was created successfully, the user is also signed in.", password-auth page);
  `sendVerificationEmail` only sends when the user isn't verified (`:326-344`); `sendPasswordResetEmail(email)`
  (`:346-361`); `signOut` (`:33-46`). Snackbar link to `logic/popups.md` (its first section is "Show a snackbar").
- Phone in two steps: `verifyPhoneNumber` completes with the verification ID on `codeSent` or timeout and with null after
  automatic sign-in (`fb_auth_blocks.dart:364-402`, null at `:383`); `signInWithPhoneNumber(verificationId, smsCode)`
  (`:404-425`). Official: "Phone number sign-in is only available for use on real devices and the web. To test your
  authentication flow on device emulators, see Testing"; Testing: "select the "Phone" authentication provider and click on
  the "Phone numbers for testing" dropdown. Enter a new phone number (e.g. +44 7444 555666) and a test code" (phone-auth
  page). Country code example from the same page (`'+44 7123 123 456'`).
- SHA: why (Google, "Certain Google Play services (such as Google Sign-in and App Invites) require you to provide the
  SHA-1 of your signing certificate so we can create an OAuth2 client and API key for your app",
  https://developers.google.com/android/guides/client-auth). Nowa's own description: "SHA Certificate Fingerprints are
  unique digital identifiers that ensure a secure connection between your app and Firebase" (`connected_main_screen.dart:196`).
  Play App Signing key (new step 4): "If your app uses APIs (like Google Maps, OAuth, or Facebook Login), those services
  authenticate your app using your app signing key's fingerprint. Because Google signs the final APK, you must register
  the Google-held app signing key fingerprint with your API providers, not just your local upload key. Go to Protected
  with Play > Play Store distribution > Go to Play app signing. Scroll to the App signing key section. Copy the required
  fingerprints (SHA-1 or SHA-256)." (Play Console Help, https://support.google.com/googleplay/android-developer/answer/9842756).
  `developers.google.com` still says "Release > Setup > App Integrity"; the page follows the Play Console Help, which is
  the newer text (it covers Android 17). "Copy each fingerprint" covers quantum-ready apps, which have three keys (same
  help page). **Add a key** takes any SHA-1 or SHA-256 (`packages/data/lib/src/firebase/setup/views/fb_sha_keys_management.dart:46-63,216-294`).
  `publish/android.md` already tells readers to add the Play key (B11's page).
- Debug key is used when the desktop app runs on a device: Nowa runs `flutter run -d <device>`, a debug build
  (`packages/core/lib/flutter_tool.dart:119-133`); the `keytool` command Nowa shows reads `~/.android/debug.keystore`
  (`fb_sha_keys_management.dart`, W16 review).
- No-terminal alternative: a release build's `.apk` "installs directly on a device, which is handy for trying the release
  build yourself" (`publish/android.md#download-your-files`), and release builds are signed with the Nowa key (same page,
  "signed with your key").

Length: about 2,060 words of prose (2,255 with front matter, tables and alt text). If it needs splitting, I'd move
"Turn on sign-in methods in the Firebase console" and "Add SHA fingerprints" to a page "Set up Firebase sign-in methods"
and keep this page for turning on providers, the functions and the flows.

Open questions:
- Firebase console: for a project that has never used Authentication, the console may first ask to "get started"; the
  official pages don't mention it, so the page doesn't either.
- Phone on iOS: Nowa's **Phone** provider writes a URL scheme (reCAPTCHA fallback, `google_sign_in_package_config.dart:49-95`);
  Firebase's Flutter guide still lists the push setup as required, so the page points to it.

## Page: `docs/integrations/firebase/firestore.md`

Changed for the reader:
- Intro rewritten with R9's own example ("where your app keeps things like orders, messages or user profiles"), plus a
  short concept paragraph (documents, collections, queries) with a shop example. "Your collections and queries are Dart
  files" moved to the for-code file.
- "Add collections and queries in Nowa 3.13" (P48, P49, P156): leads with Nowa AI in **Agent** mode (R5). All the
  verified facts stay: no designer button; **Files** only in code mode; refresh each time the project opens (P49);
  **Continue with Google** after an expired sign-in (P34); the editors open from the Library but can't select anything
  ("select a query from the outline panel to open it", P48 live: "Nothing selected", empty outline); `add` and `doc` show
  as **func** with "The function 'add' isn't defined." (P156). The two code-mode bullets became one bullet for people who
  code, with the single link to `../../code/generated-code.md#firebase`; the file paths and "without `withConverter`"
  moved to the for-code file, and the no-code version of that fix is the AI prompt.
- "Define your collections": a collection is a data model described in plain words; `fromJson`/`toJson` and the file path
  moved. Type names explained (R3): **String** text, **int** whole number, **double** decimal number, **bool** yes/no.
- "Build a query": `FirestoreService` and `FirebaseFirestore.instance` kept (on screen) and explained; Future and Stream
  explained in the table (R4); **Create New Param** explains what a parameter is (R8). The file path moved.
- "Test a query": R9 wording from the brief's own example; JSON explained.
- "Use a query in your app": reasons added (placeholders let you design before data arrives; an everyday Circuit example).
  "pass a model object" explained.
- The step table, 3.13 notes, P157 and P158 facts are unchanged. The 3.13 bullet about `add` and `doc` (shown as
  **func**, "The function 'add' isn't defined.") was folded into the note after the step table, which now also points to
  the Nowa AI path, so the fact appears once in the builder section and once as the AI fix prompt.
- "Use a query in your app" step 4: added the link to `integrations/show-data.md#show-a-list` and "connect **List** to
  `data.docs`" (B08's page: **List** → **Connect**, `data`, rows linked to `element`); `data.docs` and `data()` are the
  verified names already on the page.

Added:
- "Create your Firestore database" (brief; implied by the old Firestore tutorial). Official steps
  (https://firebase.google.com/docs/firestore/quickstart#create): "In the left panel, go to Databases & Storage >
  Firestore", "Click Create database", "Select a location for your database. If you aren't able to select a location,
  then your project's "location for default Google Cloud resources" has already been set", starting mode "Test mode ...
  allows anyone to read and overwrite your data. After testing, make sure to review the Secure your data section" and
  "Production mode: Denies all reads and writes from mobile and web clients", "Click Create". Rules location: "You can
  modify your security rules from the Firebase console in the Databases & Storage > Firestore > Rules tab" (same page,
  "Secure your data"); the "Auth required" example is the basis for "each signed-in user can only see their own" data.
  Rules guide: https://firebase.google.com/docs/firestore/security/get-started (200).
- The Nowa AI path. The agent can create and edit Dart code, check **Problems** and refuse broken edits
  (`research/features-ai.md`, "What the agent can do": `write_top_level_code`, `write_class_member`, `analyze`); there is
  no Firestore-specific tool (`grep -i firestore packages/ai` finds only the package allow-list,
  `packages/ai/lib/src/tools/packages_tool.dart:17-20`). Queries the AI adds to `FirestoreService` are listed by
  **Select Firestore Query** and **FIREBASE** after a refresh (`query_builder_manager.dart:24-33`, P49 live check step 5:
  after code-mode edits, another Refresh made the lists match). The "without withConverter" fix prompt is P156's
  workaround. The page doesn't promise the result and says how to check it (**Problems**, **Select Firestore Query**,
  **Play**).
- "field names must match the fields in your documents": `fromJson` reads `json['<field name>']`
  (`packages/core/lib/src/interpreter/generators/json_generator.dart:104`).

Length: about 2,186 words of prose, just under the ~2,200 mark. If it grows, I'd split "Define your collections",
"Build a query" and "Test a query" into a page "Firestore collections and queries" and keep this page for the database,
the 3.13 path and using queries in the app.

Open questions:
- An AI-written collection class without the `fbCollectionType` metadata won't show in **Select Collection**
  (`lists_widgets.dart:61-63`). That only matters for the visual builder, which can't open a query in 3.13 anyway; the
  page doesn't mention it (noted in the for-code file).
- `DateTime` fields expect text dates (`json_generator.dart:152-157`), so documents with Firestore timestamps may fail to
  load (code reading). Worth a product check; not on the page.

## Page: `docs/integrations/firebase/notifications.md`

Changed for the reader:
- Intro rewritten (R9) with everyday examples; FCM spelled out once (R4).
- Step 2: `RECEIVE_BOOT_COMPLETED` kept (it's in the dialog, R3) and explained: Nowa's own description is "Receive boot
  completed notifications" (`packages/core/lib/src/services/permissions_service.dart:136-140`); the permission is the
  Android broadcast sent after the device finishes booting.
- Step 3 now points to the new iPhone section; the Xcode reminder moved into that section, with the **Open Xcode
  Workspace** link described in plain words (the link opens `ios/Runner.xcworkspace` under the project's path,
  `notification_settings.dart:101-110`, so it works for local projects; W16 review). File path moved.
- "What Nowa adds" became "What your app does with notifications": the behavior kept (permission request at start,
  topic `all`, foreground display, background handling, no screen on tap; `notification_service_template.dart:30-64,151`),
  topic explained (R4). Package names, the service file and the `main()` line moved to the for-code file. Platform
  table in plain words: background modes → "the background settings iOS needs", desugaring → "an Android build setting
  that the notification tools need". One link to `generated-code.md#firebase`.
- Test section: a short reason, an example title, and who receives it (devices that run the new version and allowed
  notifications). "your own code has subscribed" became "your app has subscribed ... in some other way, for example with
  logic you or Nowa AI added".
- "Turn push notifications off": plain words; added that the Android permission stays, which is why the dialog only
  appears the first time (P13 verify: the dialog opens only while the permission is missing,
  `packages/core/lib/src/interpreter/packages/package_service.dart:276`, and `removePackage` doesn't remove permissions,
  `:345-350`).
- The P34 warning is unchanged.

Added:
- "Set up notifications for iPhone" (old page: "enable the Push Notifications capability in Xcode"; brief: Apple Push
  Notification setup step by step).
  - Why: APNs delivers to Apple devices; Firebase needs your APNs key (Firebase, "Before you use FCM, upload your APNs
    authentication key to Firebase", https://firebase.google.com/docs/cloud-messaging/flutter/client#upload-authentication-key).
  - App ID capability: Apple, "In Certificates, Identifiers & Profiles, click Identifiers in the sidebar. Select the App ID
    you want to update, then click Edit. Select the corresponding checkboxes to enable the app capabilities you want to
    allow. Click Save. If a warning dialog appears, click Confirm"; push notifications is one of the capabilities that
    "require additional steps", and "In order to configure the capabilities an app uses, you need to add them to a target
    in the Xcode project" (https://developer.apple.com/help/account/identifiers/enable-app-capabilities/). The checkbox
    label **Push Notifications** is the capability's name in the portal; the help page doesn't print the label.
  - Key: Apple, "In Certificates, Identifiers & Profiles, click Keys in the sidebar, then click the add button (+) ...
    Under Key Name, enter a unique name ... Select the checkbox next to the services you want to enable ... Click
    Configure next to "Apple Push Notification service." On the next page, choose the environment configuration and type
    of key (Team Scoped or Topic Specific) ... Review the key configuration, then click Confirm ... click Download ... a
    .p8 file extension ... Click Done", "you won't be able to download it again", "Required role: Account Holder or Admin"
    (https://developer.apple.com/help/account/keys/create-a-private-key/). The environment option names aren't on Apple's
    help page, so the page describes them ("both the sandbox (test) and production environments") without labels.
    Apple also says "The signing key works for both the development and production environments"
    (https://developer.apple.com/help/account/capabilities/communicate-with-apns-using-authentication-tokens/).
  - Key ID: "click Keys in the sidebar ... select the private key to view details. The key identifier appears below the
    key name" (https://developer.apple.com/help/account/keys/get-a-key-identifier/). Team ID: "To find your Team ID, sign
    in to your developer account and click "Membership details."" (https://developer.apple.com/help/glossary/team-id/).
  - Firebase upload: "In the Firebase console, go to Settings > General. Then, click the Cloud Messaging tab. In APNs
    authentication key under iOS app configuration, click Upload to upload your development authentication key, or
    production authentication key, or both. At least one is required. For each authentication key, select the .p8 file,
    and provide the key ID and your Apple team ID. Click Save." (same Firebase page). The same page also lists "Enable
    push notifications" and the Background fetch / Remote notifications modes in Xcode; Nowa adds the background modes
    itself (`packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:54`), so only the
    capability is left.
  - Capability: the in-app note, "Important: You must enable Push Notifications capability in Xcode. Go to your iOS
    project → Signing & Capabilities → Add Capability → Push Notifications." (`notification_settings.dart:98`). The Nowa
    client code writes no `aps-environment` (grep of `lib/` and `packages/`); the server-side iOS template isn't in the repo and
    wasn't checked, so the page claims neither way and follows the in-app note. No-code path: Nowa AI in Agent mode
    can create and edit non-Dart files such as entitlements and platform files (`research/features-ai.md`, `edit` and
    `write` tools); the page doesn't promise the result, says it can't be checked in Nowa and how to check it (a test
    notification on an iPhone after the next iOS build), and that **Restore Checkpoint** undoes AI file changes
    (`research/features-ai.md`, Restore Checkpoint).

Open questions:
- Apple: changing an App ID's capabilities invalidates the provisioning profiles that use it ("You'll need to regenerate
  the provisioning profiles that use that App ID", enable-app-capabilities page). Whether Nowa's iOS cloud build makes new
  profiles by itself wasn't checked, so the page doesn't mention it.
- Possible product issue: Stripe's Apple Pay setup writes `ios/Runner/Runner.entitlements` as a whole new file
  (`packages/core/lib/src/integrations/stripe/stripe_manager.dart:102-118`), and removing Apple Pay deletes the file when no
  other key is left (`:79-100`). An `aps-environment` entitlement added for push (by Xcode or Nowa AI) would be dropped
  when Apple Pay is turned on afterwards (code reading).
- Android 13 and later need the `POST_NOTIFICATIONS` permission for notifications; nothing in Nowa adds it (W16 notes).
  Whether the `firebase_messaging` plugin declares it was not checked. Not on the page.

## Page: `docs/integrations/stripe.md`

Changed for the reader:
- Intro rewritten (R9); `StripePaymentService` kept (the reader searches for it in Circuit, R3).
- "Turn on Stripe": `flutter_stripe` package moved; "so the rest of the page opens up" (the sections are built only
  when the package is installed, `packages/core/lib/src/integrations/stripe/stripe_settings.dart:97-98`).
- Purchase types: the old page's examples added to "How it works" (premium unlock or ebook, extra lives, monthly
  fitness plan) and "start with one and add more later" (old tip; redeploy keeps tables, see below).
- Constants: "That's fine, because none of them is secret" (Stripe: publishable keys are "Safe to expose", and the
  merchant name and country code aren't secrets).
- Secret key and webhook: what a webhook is (R4); the Supabase secret names moved into the deploy check, where the
  reader sees them in the Supabase dashboard.
- Payment methods: Apple Pay entitlement file and the Google Pay `testEnv` file path moved to the for-code file; plain
  versions kept; the Google Pay fix now leads with Nowa AI (R5) and says to do it after the last deploy (P68).
- Deploy: "You'll find these in your Supabase project afterwards" (the table is what the reader checks in Supabase);
  platform file changes in plain words ("prepares the Android and iOS versions for Stripe's payment screen", iOS
  **Camera** permission kept); "Nowa keeps your existing payment tables and the payments in them" (`CREATE TABLE IF NOT
  EXISTS`, no `DROP`, `stripe_edge_functions.dart:171,349,574`).
- Remove Stripe: file path moved; plain words.
- RLS explained in one clause (R4).

Added (old page items):
- "Get your Stripe keys" (old: where to find the publishable and secret keys, `pk_test_` vs `pk_live_`, "publishable
  key is safe"). Stripe (https://docs.stripe.com/keys): "Use the API keys page in the Dashboard to create, reveal,
  expire, and rotate keys for the account or sandbox you're viewing"; "Sandbox keys start with pk_test_ ... and sk_test_
  for secret keys"; "Switch to your live mode keys, which start with pk_live_, rk_live_, and sk_live_"; publishable key
  "Safe to expose: Yes ... You can include it in front-end code or applications you distribute"; secret key "Safe to
  expose: No ... unrestricted permissions on all Stripe APIs". API keys page link `https://dashboard.stripe.com/apikeys`
  is the one Stripe's page uses. "Sandbox" is Stripe's current name for test mode ("Sandbox versus live mode").
- Webhook destination step by step (old: Webhooks → Add destination → events → Webhook endpoint → Endpoint URL → Create
  destination → Reveal signing secret). Stripe today (https://docs.stripe.com/webhooks#create-webhook-endpoint): "Open the
  Webhooks tab in Workbench. Click Create an event destination. Select Your account ... Choose the payload format: Thin
  (recommended) or Snapshot. For snapshot destinations, also select the API version. Select the event types ... Select
  Continue, then select Webhook endpoint as the destination type. Click Continue, then provide the Endpoint URL and an
  optional description ... On the webhook settings page, a signing secret beginning with whsec_ appears. Click Reveal
  secret". The final create button isn't named on the page, so the docs say "create the destination". **Snapshot** is
  required by Nowa's webhook (`constructEventAsync`, `event.data.object`, `stripe_edge_functions.dart:803-835,862`).
- Events: the old page's 9 events reduced to the 7 the webhook handles (unchanged table; `stripe_edge_functions.dart:803-835`);
  Stripe also advises "Configure your webhook endpoints to receive only the types of events required by your integration".
- Wallets need the Dashboard's payment method settings: the payment intents use `automatic_payment_methods: { enabled:
  true }` (`stripe_edge_functions.dart:123-132,301-310`); Stripe, "View your payment methods settings and enable the
  payment methods you want to support" (https://docs.stripe.com/payments/mobile/accept-payment-embedded), link
  `https://dashboard.stripe.com/settings/payment_methods` (from Stripe's pages). The old path "Settings → Payments →
  Payment Methods" is not confirmed today, so the page links the settings instead.
- Apple Pay step by step (old: merchant ID, Payment Processing Certificate with Stripe's CSR, `apple_pay.cer` back to
  Stripe). Apple (https://developer.apple.com/help/account/capabilities/configure-apple-pay/): "click Identifiers in the
  sidebar, then click the add button (+) ... Select Merchant IDs, then click Continue. Enter the merchant description and
  identifier name, then click Continue. Review the settings, then click Register"; certificate: "select Merchant IDs
  using the filter on the top right ... select your merchant identifier ... Under Apple Pay Payment Processing
  Certificate, click Create Certificate ... click Continue. Click Choose File ... select the certificate request file (a
  file with a .certSigningRequest file extension) ... Click Continue. Click Download"; "The payment processing certificate
  expires every 25 months" (so the old "one-time setup" is corrected); "To add the Apple Pay entitlement to your App ID,
  first create a merchant identifier, then enable Apple Pay". Stripe (https://docs.stripe.com/apple-pay?platform=ios):
  "Stripe recommends using the name of your app as the identifier (for example, merchant.com.{{YOUR_APP_NAME}})", "Go to
  the iOS Certificate Settings in the Dashboard, click Add new application, and follow the guide. Download a Certificate
  Signing Request (CSR) file", "One CSR file must be used to issue exactly one certificate. If you switch your Apple
  Merchant ID, you must ... obtain a new CSR and certificate". iOS certificate settings link
  `https://dashboard.stripe.com/settings/ios_certificates` is the one Stripe's page uses. Nowa's hint for the field is
  `merchant.com.example.yourapp` (`stripe_settings.dart:328`); the entitlement is written only when a merchant ID is set
  (`stripe_manager.dart:65-76`). The App ID's Apple Pay labels aren't on Apple's help page, so step 6 has no bold labels.
  Link to `publish/ios.md#register-your-bundle-id` (routed from B11).
- Currency codes (old tip): three-letter codes, **Fixed Value** when all items share one.
- Test cards: Stripe (https://docs.stripe.com/testing#cards), "use a card number, such as 4242 4242 4242 4242 ... Use a
  valid future date, such as 12/34. Use any three-digit CVC (four digits for American Express cards)", "Don't use real
  card details".
- "Go live" (old: `pk_live_` for production). Stripe: "On the API keys page, toggle from sandbox mode to live mode",
  "On the API keys page in live mode, in the Standard keys list, click Reveal live key"; "Each mode has its own set of API
  keys, and objects in one mode aren't accessible to the other" (keys page); "You can register a maximum of 16 event
  destinations per livemode or sandbox account" (https://docs.stripe.com/events/how-events-work), so the live webhook is
  a separate destination. Republish because the publishable key is a Dart-only constant compiled into the app
  (`packages/core/lib/src/interpreter/packages/integrations/stripe_package_config.dart:19-45`, W17 notes).
- Troubleshooting (old tip "keys copied correctly with no extra spaces"): values are saved untrimmed
  (`stripe_supabase_service.dart:244-251,299-312`, `stripe_settings.dart:476-516,537,552`).
- `cancelSubscription()` fails in 3.13 (P66, not from the old page): the deployed `stripe-cancel-subscription` source has
  `.order('created_at', ascending: false)` (`stripe_edge_functions.dart:659`), which three TypeScript parsers reject
  (P66), and deploy errors are swallowed (P67). Workaround from P66: "a subscription can still be cancelled in Stripe
  itself"; the webhook handles `customer.subscription.updated` and `.deleted` (`stripe_edge_functions.dart:818-821`).
  Added to the method table and to "Fix common problems".

Obsolete (old page): "Supabase MCP must be enabled" (Stripe uses the **Connect** authorization,
`stripe_supabase_service.dart:20,224-251`); `type` and name columns (only ID, amount and currency are mapped,
`stripe_settings.dart:344-455`); `payment_intent.canceled` and `.processing` (not handled).

Length: about 2,465 words of prose (2,618 with front matter and tables), over the ~2,200 mark. Proposed split: move
"Choose payment methods" (Apple Pay and Google Pay setup, about 450 words) to its own page, "Add Apple Pay and Google Pay
to Stripe", linked from step 4 of "Turn on Stripe"; this page would drop to about 2,000 words.

Open questions:
- Snapshot destinations also ask for an API version. Nowa's functions pin `2025-12-15.clover`; the page says nothing
  about which version to pick. Possible product issue: since Stripe API `2025-03-31.basil` the Invoice object has no
  `subscription` field (moved to `parent.subscription_details.subscription`) and the Subscription object no
  `current_period_start`/`current_period_end` (https://docs.stripe.com/changelog/basil/2025-03-31/adds-new-parent-field-to-invoicing-objects,
  https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-subscription-current-period-start-and-end). The webhook still
  reads `invoice.subscription` (`stripe_edge_functions.dart:823-835`) and `subscription.current_period_*` (`:544-545,791`),
  so on current API versions the `invoice.paid` / `invoice.payment_failed` branches do nothing and the period dates stay
  empty; the status still follows `customer.subscription.*`. Code reading, not run.
- Stripe recommends restricted keys (`rk_`) over secret keys for new integrations (keys page); Nowa asks for the
  **Secret Key** (hint `sk_test_...`). Which permissions a restricted key would need for Nowa's functions wasn't checked,
  so the page keeps the secret key.
- Nowa's own helper text for **Webhook URL** still says "(Developers > Webhooks > + Add endpoint)"
  (`stripe_settings.dart:568-570`); Stripe now points to Workbench ("Workbench replaces the existing Developers Dashboard.
  You can still create a new webhook endpoint in the Developers Dashboard"). Product text could be updated.


## Routed items (from the coordinator)

- **Routed from B11** (publish pages): `notifications.md` now links "Register your bundle ID"
  (`../../publish/ios.md#register-your-bundle-id`, heading checked on `publish/ios.md:43`) from the App ID capability
  steps, and says to tick **Push Notifications** there when registering. The same link is on the Apple Pay step 6 of
  `stripe.md`. The page doesn't claim whether Nowa's server-side iOS template already has the push entitlement: it keeps
  the in-app note (Xcode **Signing & Capabilities**, `notification_settings.dart:98`) and says Nowa can't check this part,
  with a test notification as the check. The client repo writes no `aps-environment` (grep); the server template wasn't
  checked (not in the repo).
- **Routed from B05/B06** (link checks): `auth.md` → `notifications.md#set-up-notifications-for-iphone` resolves now (the
  heading is `## Set up notifications for iPhone` on `notifications.md`). Every relative link and anchor on the five pages
  resolves (script over the pages: file exists, `#fragment` matches an explicit `{#id}` or a heading slug), and so do the
  inbound links from other pages (`guides/data-and-state-tips.md`, `logic/router.md`, `publish/android.md`,
  `test/problems.md`, `troubleshooting/index.md`, `troubleshooting/known-issues.md`).
- **Routed from B10** (Supabase pages): `stripe.md` "Before you start", table bullet: added "See [Create a
  table](./supabase/database.md#create-a-table)." (explicit `{#create-a-table}` checked on `supabase/database.md:16`).

## For other pages

1. `docs/troubleshooting/known-issues.md` (B12): a 3.13 entry for P66 would help people who search by symptom.
   Proposed text: "## Stripe subscriptions can't be cancelled from the app {#stripe-cancel-subscription}
   In Nowa 3.13, the `stripe-cancel-subscription` function that **Deploy Configuration** sends to Supabase has an error, so
   `cancelSubscription()` always fails, even though deploying ends with "Deployed successfully!". Until a fix ships, cancel
   subscriptions in your Stripe Dashboard: the webhook then updates the subscription's record. See [Accept payments with
   Stripe](../integrations/stripe.md#fix-common-problems)." Evidence: P66 (`packages/core/lib/src/integrations/stripe/stripe_edge_functions.dart:659`,
   parsed with three TypeScript parsers), P67 (swallowed errors, `packages/data/lib/src/supabase/supabase_oauth_manager.dart:125-209`),
   webhook handles `customer.subscription.updated` / `.deleted` (`stripe_edge_functions.dart:818-821`).
2. `docs/guides/ship-tips.md` (B01), publish checklist row "Stripe uses live keys instead of test keys and Google Pay's
   `testEnv: true` is changed": add "after your last **Deploy Configuration**, which puts it back to test", and link
   `../integrations/stripe.md#go-live`. Evidence: P68, `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:392-394,517-566,846-852`.
   The row could also mention the live webhook destination (Stripe: event destinations are per sandbox or live mode,
   https://docs.stripe.com/events/how-events-work).
3. `docs/integrations/index.md` (B08), Supabase/Firebase table, "What you get" for Firebase: "Your Android, iOS and web
   apps registered in Firebase, the config files and a `FirebaseService`" names a class the reader doesn't see outside
   Circuit details. Suggested: "Your Android, iOS and web apps registered in Firebase and set up in your project, plus
   sign-in functions you pick in Circuit." Evidence: `firebase/connect.md#what-connecting-sets-up` (this batch).

## Summary

- Pages: all five rewritten for the primary reader (R1-R9). Prose word counts: connect 1,572; auth 2,068; firestore
  2,186; notifications 1,310; stripe 2,471 (split proposal under the Stripe page). Each page has at most two
  admonitions; no H1, no `---` rules, no hype words, no em dashes.
- Coverage: 74 old-page items; 36 covered, 24 added, 4 obsolete, 10 not useful (`P14-B09-coverage.md`).
- Moved to the code section: 34 facts copied unchanged into `P14-B09-for-code.md` (`#firebase` 29, `#stripe` 5), plus 8
  new code-level facts marked "Added (new, verified)".
- Images and explicit heading IDs untouched; each image stayed with its paragraph.

## Routed from B12 (added after the summary)

- `firestore.md`, "Use a query in your app": "In the Windows desktop app, run the app on a simulator instead" became
  "In the Windows desktop app, click **Run** instead: the **Embedded preview** runs the web version of your app. Or run
  it on an Android emulator or a phone." Checked in the code: the embedded preview is an in-app web view on every desktop
  platform except Linux (`packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-140`), the local Nowa Run service runs
  `flutter run -d web-server` (`packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:54`), and the
  Firebase options cover web (`packages/data/lib/src/firebase/setup/fb_setup_manager.dart:122-134`). Same wording as
  `troubleshooting/known-issues.md#firebase-on-windows` (B12), which also says to skip **Windows** in **Run on**.
  "Simulator" was dropped because Windows has no iOS Simulator.
