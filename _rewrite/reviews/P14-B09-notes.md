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
  (`:346-361`); `signOut` (`:33-46`). Snackbar link to `logic/popups.md#show-a-snackbar` page (heading exists).
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
- The step table, 3.13 notes, P157 and P158 facts are unchanged.

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

Open questions:
- An AI-written collection class without the `fbCollectionType` metadata won't show in **Select Collection**
  (`lists_widgets.dart:61-63`). That only matters for the visual builder, which can't open a query in 3.13 anyway; the
  page doesn't mention it (noted in the for-code file).
- `DateTime` fields expect text dates (`json_generator.dart:152-157`), so documents with Firestore timestamps may fail to
  load (code reading). Worth a product check; not on the page.
