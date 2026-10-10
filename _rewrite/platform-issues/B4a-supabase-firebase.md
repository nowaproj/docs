# B4a: Supabase, Firebase, Firestore

### P23. Edge functions deployed by Nowa always have JWT verification switched off

- **Area:** Supabase backend setup and Stripe deploy (`packages/data/lib/src/supabase`, `packages/core/lib/src/integrations/stripe`)
- **Severity:** High — every function Nowa deploys silently loses Supabase's gateway check, including ones the author had protected. Not Critical: that check is thin (the anon key is public) and none of Nowa's own functions rely on it.
- **Where:** both; both cloud and local projects (needs a Nowa sign-in and a Supabase authorization)
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — the flag, every caller and the function templates were read. What Supabase's gateway does with the flag is Supabase's documented behavior and was not run (no Supabase account).

**What happens.** The deploy request is built with `'verify_jwt': false` and no way to change it. So **Set up Backend** and the Stripe **Deploy Configuration** deploy every function without Supabase's JWT check: a request with no `Authorization` header reaches the function's own code. A function that was protected on the source Supabase project (the Supabase default is on) comes out unprotected on the target one, and the setup dialog only says "N edge functions deployed".

Correction: the row names "a bundled backend" only; the Stripe deploy uses the same call. And a token requirement would not have meant "signed-in user" anyway: with verification on, the gateway accepts any JWT signed by the project, and a signed-out app sends the anon key as its bearer token.

**Which functions**

| Deploy path | Functions deployed with `verify_jwt: false` |
|---|---|
| **Supabase** panel ⋮ → **Set up Backend**, and the **Set up Supabase backend** dialog that opens after **Connect** (`SbBackendBundleService.setupBackend`, `packages/data/lib/src/supabase/migrations/sb_backend_bundle_service.dart:210-228`) | Every folder under `supabase/functions/` that holds an `index.ts` (`:82-95`). That is whatever the project carries: functions copied in by **Pull Backend Files** (every function deployed on the source project, `:351-376`), shipped with a template or a copied project, or written by hand. |
| Settings → **Integrations** → **Stripe** → **Deploy Configuration** (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:409, 440, 461, 482, 489`) | `stripe-webhook` always; `stripe-one-time-payment-intent` (One-Time), `stripe-consumable-payment-intent` (Consumable), `stripe-create-subscription` and `stripe-cancel-subscription` (Subscription). |

Functions deployed from the Supabase dashboard or CLI, or by Nowa AI through the Supabase connector, do not go through this code.

**What an unauthenticated caller can do.** Anyone who knows a function's URL (`https://<ref>.supabase.co/functions/v1/<slug>`; the ref is in the `supabaseUrl` constant that ships inside the app, the slug shows in the app's network traffic) can run it with no token.
- Nowa's four payment functions: nothing beyond the cost of a call. Each builds a client from the caller's `Authorization` header and stops with "User must be authenticated ..." before it touches Stripe or the database (`stripe_edge_functions.dart:50-53, 262-265, 434-437, 648-651`).
- `stripe-webhook`: it has to be public, because Stripe sends no Supabase token. It checks the `stripe-signature` header against `STRIPE_WEBHOOK_SECRET`, then updates payment and subscription rows with the service-role key (`:849-883`). It is as safe as that secret: the template falls back to `''` when the secret isn't set (`:865`), and I did not check whether the Stripe library rejects an empty secret. A forged event that got through would mark payments succeeded or subscriptions active.
- Pulled, template and hand-written functions: unknown code. Whatever such a function does for a signed-in user it now does for anyone: use the service-role key Supabase gives every function (the webhook reads it at `:875`), spend the project's third-party API keys, send mail, write or delete rows. The new exposure is real only for functions that relied on the gateway as their only guard.
- Limit on all of this: with verification on, the gateway still lets in anyone who holds the anon key, and every app contains it (`docs/integrations/supabase/connect.md`; the `supabase` package's functions client sends it as the bearer token when nobody is signed in, `supabase-2.10.2/lib/src/auth_http_client.dart:12-18`). So turning verification on keeps out only callers who have neither the app nor its key. Checking the user has to happen inside the function.

**Steps to reproduce** (not run)
1. Use a project that has `supabase/functions/<name>/index.ts` and at least one `supabase/migrations/*.sql` the target Supabase project hasn't applied (otherwise the dialog in step 2 doesn't open, `sb_backend_setup_flow.dart:21, 31-32`). One way to get it: in a project connected to a Supabase project that has an edge function with JWT verification on, click ⋮ in the **Supabase** panel → **Pull Backend Files** → **Pull**.
2. Connect the project to another Supabase project that lacks the function: **Supabase** icon → **Connect** (or ⋮ → **Change API Keys**), pick the project, then click **Set up** in **Set up Supabase backend**.
3. In the Supabase dashboard open the deployed function and read its JWT-verification setting, or call it with no token: `curl -i -X POST https://<ref>.supabase.co/functions/v1/<name>`. (For the Stripe set: Settings → Integrations → Stripe → **Deploy Configuration**, then look at the five functions.)

Expected: verification is on, as on the source project, and Supabase answers 401 before the function runs.
Actual (from the code): verification is off and the function's own code answers.

**Root cause.** `SupabaseOAuthService.deployEdgeFunction` writes the setting into the request metadata with no parameter (`packages/data/lib/src/supabase/supabase_oauth_service.dart:133-145`):

```dart
final metadata = {'name': functionSlug, 'entrypoint_path': 'index.ts', 'verify_jwt': false, 'import_map': false};
```

It came in with the Stripe functions (`f9c2ac5df`, 2026-01-22), where only the webhook needs it; the bundle service reuses it (`87468c551`, 2026-08-20). No comment says why. **Pull Backend Files** copies the function body only: it lists the project's functions but reads just `slug` (`sb_backend_bundle_service.dart:355-366`), so the source project's setting is never recorded. The setup summary counts functions and names none (`sb_backend_setup_dialog.dart:145-153`).

**Suggested fix.** Safest first; 1 and 2 go together.
1. Add `bool verifyJwt = true` to `deployEdgeFunction` (`supabase_oauth_service.dart:133`) and write it into `metadata`. Thread it through `SupabaseOAuthManager.deployEdgeFunction` (`supabase_oauth_manager.dart:148`) and the Stripe wrapper (`stripe_supabase_service.dart:234`). Pass `false` only for `stripe-webhook` (`:409`).
2. Keep what the source project had. In `_pullEdgeFunctions` read each function's JWT setting from the listing it already fetches (the Management API's function list is expected to carry `verify_jwt`; not checked offline). Save it as `[functions.<slug>] verify_jwt = false` in `supabase/config.toml` (the Supabase CLI's format, which the bundle layout already follows, `:52-54`) or in `nowa_setup.json`, and read it in `setupBackend` (`:210-228`). Use `true` when nothing is recorded. Without this, item 1 breaks functions that must be public, such as third-party webhooks.
3. Name the functions that go out without verification in the **Backend ready** summary.
4. Make `stripe-webhook` return an error when `STRIPE_WEBHOOK_SECRET` is empty instead of verifying against `''` (`stripe_edge_functions.dart:865`).

Watch out: `verify_jwt: true` is not user authentication (the anon key passes), so a function that needs a signed-in user must call `auth.getUser()` as the Stripe ones do. Existing deployments keep the old setting until redeployed, and **Set up Backend** only opens while migrations are pending (`sb_backend_setup_flow.dart:31-34`), so people already using it must switch verification on in the Supabase dashboard or redeploy.
Test: nothing covers these calls (`packages/data/test/supabase_test.dart` only loads a project). Let `SupabaseOAuthService` take an optional `Dio` (it creates one in a field initializer, `:17`) and assert the `metadata` part of the multipart body: `verify_jwt` true by default, false for the webhook, the config value for a bundled function.

**Docs impact.** `docs/integrations/supabase/backend.md` ("Set up a backend that came with a project", step 3 says Nowa "deploys each edge function"): once fixed, say that functions keep the JWT check the source project had, and which are public. `docs/integrations/stripe.md` ("Deploy the configuration" function table): note that only `stripe-webhook` is public. Neither page mentions the setting today.

### P24. "No organizations found" is never shown; the Supabase waiting dialog just stays open

- **Area:** Supabase connect (`packages/data/lib/src/supabase/ui/sb_setup`, `packages/core/lib/src/settings/oauth_settings`)
- **Severity:** Medium — if the organization lookup after the browser step comes back empty or fails, the user is left on a frozen dialog with no message; **Cancel** is the only way out.
- **Where:** both; both cloud and local projects (needs a Nowa sign-in)
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5; only the button widgets differ)
- **Confidence:** Confirmed in code — path traced; not run (no Supabase account, and an account that lists no organization is hard to produce).

**What happens.** After the browser authorization succeeds, Nowa fetches the organizations. When the list is empty, `getOrganization()` throws "No organizations found. Please create a Supabase organization first.", but nothing catches it: the dialog keeps saying **Waiting for Authorization...**, its "Waiting for ...s" counter stops, and the message never appears. Any other failure of that request ends the same way. A user who is already authorized and has no organization doesn't see it either: `_start` swallows it and opens the browser step again. The 120-second timeout has a similar dead end (only a red snackbar, the dialog stays).

**Steps to reproduce** (not run)
1. Open a project while signed in to Nowa. Use a Supabase account whose authorization lists no organization (for example, the organization was deleted after you authorized; not tried).
2. Click the **Supabase** icon in the left sidebar, then **Connect**.
3. Approve the request in the browser.

Expected: the dialog shows "No organizations found. Please create a Supabase organization first." with a **Close** button.
Actual: the dialog stays on **Waiting for Authorization...** with a stopped counter and a **Cancel** button, and the error goes unhandled.

**Root cause.** `WaitingForAuthDialog` takes `final VoidCallback onSuccess` (`packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:18`). On success it marks itself completed, cancels its timer and calls `widget.onSuccess()` (`:57-60`), dropping the returned future. The Supabase side passes `_onSuccess`, which is `await _oauthManager.getOrganization()` with no try/catch (`sb_oauth_setup.dart:156-159, 195`); the throw is at `supabase_oauth_manager.dart:66-68`. Nothing sets `_oauthManager.error`, so the dialog's error panel (`_buildError`, `:221-238`) never shows, and `getError: () => null` (`:194`) switches off the dialog's own error path. `_start` (`:116-124`) catches every exception from the same call and goes on to `_connect()`.

**Suggested fix.** In `_onSuccess`, catch the exception and store the message on `SupabaseOAuthManager` (add a small setter; `error` is read-only, `:13-14`) so the existing `_buildError` with **Close** shows it. In `_start`, fall back to `_connect()` only for an authorization failure (401/403), not for "No organizations found". For the timeout, `onError` should replace the dialog's content, not only raise a snackbar (`:196`). If you change `WaitingForAuthDialog` itself (await `onSuccess`, route errors to `onError`), GitHub and Figma use it too (`packages/core/lib/src/settings/github_integration_settings.dart:94`, `packages/core/lib/src/figma/figma_auth_dialog.dart:18`). Test: there are no tests near the dialog; add a widget test in `packages/core/test/` where `onSuccess` throws and assert `onError` runs.

**Docs impact.** `docs/integrations/supabase/connect.md`, "If something goes wrong" table: it has no row for this message because it never appears. Add one once it is shown ("No organizations found. Please create a Supabase organization first." → create an organization in Supabase, then click **Connect** again). The "Authorization timed out" row says to click **Cancel** first; keep that until the timeout path is fixed.

### P25. Supabase query templates build function names with a label helper, giving `getAllUser_profiles`

- **Area:** Supabase Query Templates (`packages/data/lib/src/supabase/templates`)
- **Severity:** Low — ordinary snake_case tables get an odd name; only unusual table names (camelCase, PascalCase, hyphens) give a name that isn't valid Dart.
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — the name is a plain string transformation; not run in the app (needs a Supabase table).

**What happens.** The generated function is named after the template's operation plus the table name. `todos` gives `getAllTodos`, but `user_profiles` gives `getAllUser_profiles`, which doesn't match the model name Nowa suggests in the next step (`UserProfilesModel`).

Correction: snake_case gives a valid but unidiomatic name. A table called `todoItems` or `UserProfiles` gets a space (`getAllTodo Items`, `getAllUser Profiles`), which is not a valid Dart name; the row has only the snake_case example.

**Steps to reproduce**
1. In Supabase, create a table called `user_profiles` and connect the project to it.
2. In the **Supabase** panel click **+** next to **Generate a Query**, then **Query Templates** and **Get All Records**. Click `user_profiles` (click **Fetch Tables** if the list is empty).
3. Keep **Create new model class** and click **Generate Function**.

Expected: `getAllUserProfiles`, matching `UserProfilesModel`.
Actual: the message `Function "getAllUser_profiles" generated successfully!`, and the function appears under **Queries** with that name.

**Root cause.** `supabase_template_manager.dart:94-96` builds the name as `'${template.operation}${tableName.camelCaseToSpaces()}'`. `camelCaseToSpaces` (`packages/core/lib/src/utils.dart:77-79`) is a label helper: it capitalizes the first letter and puts a space between a lowercase and an uppercase letter, and every other caller shows the result as a label. It leaves `_` alone, so snake_case keeps its underscore, and it inserts spaces into camelCase names. The result is pasted straight into the generated Dart (`template_source_generator.dart:47, 56, 69, 82`); what Nowa does with `getAllTodo Items` (an error snackbar, or a broken `SupabaseService`) wasn't run. The model-name suggestion already uses `convertNameCase(tableName, Cases.pascalcase)` (`templates/ui/model_selection_view.dart:41`).

**Suggested fix.** Build the name with the same helper: `'${template.operation}${convertNameCase(tableName, Cases.pascalcase)}'`. Put it in a small function (for example `templateFunctionName(operation, table)`) that also drops characters Dart doesn't allow in a name. Watch out for two tables that map to one name (`user_profiles` and `userProfiles`): generating a template again replaces the earlier function (`docs/integrations/supabase/database.md`). Test: a unit test in `packages/data/test/` for that function with `todos`, `user_profiles`, `todoItems`, `UserProfiles` and `user-profiles`.

**Docs impact.** `docs/integrations/supabase/database.md`: "Each function is named after its action and the table, with the first letter of the table name capitalized." and the `getAllTodos()` table. After the fix, say the table name is written in PascalCase (`user_profiles` → `getAllUserProfiles`).

### P26. "Fix with AI" after a failed Supabase backend setup sends a fixed prompt that ignores the failure

- **Area:** Supabase **Set up Backend** (`packages/data/lib/src/supabase/migrations`)
- **Severity:** Medium — the AI is sent to rewire the app against a backend that isn't set up, spending AI allowance, and the real failure never reaches it.
- **Where:** both; both cloud and local projects (the AI needs a Nowa sign-in)
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — the call chain from the button to the prompt was read; not run (no Supabase account).

**What happens.** When a step of **Set up Supabase backend** fails, the dialog says **Setup stopped** and shows the step and the error. **Fix with AI** then opens the Assistant and sends, without waiting for the user, the same kind of prompt as **Connect app with AI**: "Connect this project to my Supabase backend. The backend is already configured. Do not go through the widgets, update or create the SupabaseService and replace the mock data. Reuse the same models." It never mentions the failed migration, function or bucket, its error or its SQL, and it says the backend is configured when it isn't.

**Steps to reproduce** (not run)
1. Use a project whose `supabase/migrations/` holds a migration that fails on your Supabase project (for example `20990101000000_fail.sql` containing `select * from table_that_does_not_exist;`).
2. **Supabase** icon → **Connect**, pick a project, then click **Set up** in **Set up Supabase backend**. The dialog ends on **Setup stopped** with "Failed on 20990101000000_fail.sql: ...".
3. Click **Fix with AI**.

Expected: the Assistant gets a prompt that names the failed step, the error and the SQL, and asks the AI to fix that.
Actual: the Assistant gets the fixed "backend is already configured" prompt above, and it is sent at once.

**Root cause.** `SbBackendSetupFlow.startFixChat` takes `failure` and never reads it (`sb_backend_setup_flow.dart:40-49`), although its doc comment says the AI "diagnoses and fixes the cause" (`:38-39`). `BackendSetupFailure.sql` exists "so the AI can diagnose it without opening the bundle files" (`sb_backend_bundle_service.dart:43-45`, filled at `:205`), but nothing reads `step`, `target`, `message` or `sql` except the dialog text (`sb_backend_setup_dialog.dart:137`). `_start` puts the text in the chat box and sends it (`sb_backend_setup_flow.dart:70-73`).

**Suggested fix.** Build the prompt from the failure: step, target, message and, for a migration, the SQL, cut to a safe length (the message can carry a whole HTTP response). Ask the AI to find and fix the cause in the bundle files or on the Supabase project and say that the user will run **Set up Backend** again afterwards. Don't say the backend is configured. Leave `startWireUpChat` (`:53-58`) as it is. Consider filling the chat box without sending, so the user can read it first. Test: make the prompt a pure static function (`fixPrompt(BackendSetupFailure)`) and unit-test it in `packages/data/test/`: it contains target, message and SQL, and a very long message is cut.

**Docs impact.** `docs/integrations/supabase/backend.md`: "Click **Fix with AI** to open Nowa AI with a ready-made prompt, or **Close** to stop." Accurate today; after the fix, say the prompt names the failed step and its error.

### P31. Firebase Google sign-in: the generated `signInWithGoogle()` doesn't compile against `google_sign_in` 7.x

- **Area:** Firebase Authentication, Google provider (`packages/data/lib/src/firebase/auth`)
- **Severity:** High — an app with the Google provider on can't be built once the generated file is part of it, and a hand edit of the function is probably overwritten.
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — the template and the `google_sign_in` 7.2.0 source (on disk in `~/.pub-cache`) were read; the error wording below is from `analyzer-10.2.0`'s message table, not from a build.

**What happens.** Turning on the **Google** provider adds `google_sign_in: ^7.2.0` to the pubspec and a `signInWithGoogle()` written for `google_sign_in` 6.x. Version 7.x removed the constructor, `signIn()` and `accessToken` that the function uses, so `lib/firebase/firebase.dart` has three errors and any build that includes it fails. In Play mode nothing warns: `invoke` is overridden with a preview dialog (`fb_auth_blocks.dart:132-171`), so the error appears only in a real run, a build or a code check.

**Steps to reproduce** (not run)
1. Click the gear (**Settings**) → **Integrations** → **Firebase** → **Continue with Google** → click your project → **Connect Apps**.
2. Turn on **Authentication**, click **Add Provider**, then click **Google** (it gets a check mark).
3. Make the file part of the app: on a button's **On Pressed**, open Circuit, add a node from the **FIREBASE** category and pick `signInWithGoogle`.
4. Click the counts in the status bar to open **Problems**, choose **From Code Analysis (Accurate)** and click **Run Code Check**. (Or click **Run**.)

Expected: no errors.
Actual: three errors in `lib/firebase/firebase.dart`:
- `GoogleSignIn()`: The class 'GoogleSignIn' doesn't have an unnamed constructor. (`new_with_undefined_constructor_default`)
- `.signIn()`: The method 'signIn' isn't defined for the type 'GoogleSignIn'. (`undefined_method`)
- `googleAuth?.accessToken`: The getter 'accessToken' isn't defined for the type 'GoogleSignInAuthentication'. (`undefined_getter`; the analyzer may print the type with a trailing `?`)

`await googleUser?.authentication` is not an error (at most the `await_only_futures` lint).

**Root cause.** `GoogleAuthSignInFunc` (`packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:101-180`) holds a 6.x template (`:121-126`):

```dart
final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
final GoogleSignInAuthentication? googleAuth = await googleUser?.authentication;
... accessToken: googleAuth?.accessToken, idToken: googleAuth?.idToken
```

The provider switch registers `DartPackage('google_sign_in', '^7.2.0')` (`fb_auth_manager.dart:66`; the package config says the same, `google_sign_in_package_config.dart:13`), written to the pubspec as `google_sign_in: ^7.2.0`. In the 7.2.0 source: `GoogleSignIn` has a private constructor and a singleton, `GoogleSignIn.instance` (`lib/google_sign_in.dart:280-287`). There is no `signIn()`; sign-in is `authenticate()` (`:541`) after a one-time `initialize()` (`:291-314`), and `authenticate()` isn't supported on web (`supportsAuthenticate()`, `:515`). `GoogleSignInAccount.authentication` is a plain getter (`:62-64`) whose `GoogleSignInAuthentication` has only `idToken` (`lib/src/token_types.dart:13-18`); access tokens now come from `account.authorizationClient` (`google_sign_in.dart:68-70`). Nowa's own app already uses the 7.x API (`packages/core/lib/src/services/auth/google_sign_in_init.dart:14-34`, `auth_io.dart:24-47`).

**Suggested fix.** Change the template (`fb_auth_blocks.dart:112-130`), keeping the `kIsWeb` popup branch:

```dart
final googleUser = await GoogleSignIn.instance.authenticate();
final credential = GoogleAuthProvider.credential(idToken: googleUser.authentication.idToken);
return await FirebaseAuth.instance.signInWithCredential(credential);
```

`GoogleAuthProvider.credential` accepts an `idToken` alone (`firebase_auth_platform_interface-8.1.6/lib/src/providers/google_auth.dart:42-49`). Call `GoogleSignIn.instance.initialize()` exactly once before the first use (a second call is undefined, `google_sign_in.dart:291-294`): either a `MainStatement` on the package like the one `firebase_core` has (`firebase_package_config.dart:13-20`), or a guarded call as in `google_sign_in_init.dart`. Watch out: Android needs a `serverClientId` unless `google-services.json` has a web client (`google_sign_in_android-7.2.10/README.md:22-29`); iOS needs `GIDClientID` in `Info.plist` or `clientId` in `initialize` (`google_sign_in_ios-6.3.0/README.md`), and I found no code that writes `GIDClientID` for the Firebase path (the comment at `fb_auth_manager.dart:68` says it is computed; the only template is the user-entered **iOS Client ID**, `google_sign_in_package_config.dart:26-35`). Existing projects: the loader recreates the function from the template when the file loads and ignores the text on disk (`firebase_plugin.dart:21`, `ast_to_block_visitor.dart:1086-1100`), but the file on disk changes only when it is saved again; check whether it needs marking dirty. Test: next to 'Enable Google provider' (`packages/data/test/firebase/firebase_test.dart:169`), assert that `GoogleAuthSignInFunc().source` contains none of `GoogleSignIn()`, `.signIn(` and `accessToken:`; also run `flutter analyze` on a scratch project, since a string check can't catch API drift.

**Docs impact.** `docs/integrations/firebase/auth.md`: the `:::note` under the function table ("Currently, **Google** writes `signInWithGoogle()` for an older version of the `google_sign_in` package ...") should be deleted once fixed. The table row for `signInWithGoogle()` stays true.

### P32. After a failed Connect Apps, every retry on the same screen fails

- **Area:** Firebase connect (`packages/data/lib/src/firebase/setup/views`)
- **Severity:** Medium — the retry can't succeed until you go back and pick the project again, and the banner blames the app limit whatever went wrong.
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — traced; not run (needs a Firebase project at its app limit, or another failing call).

**What happens.** Click **Connect Apps** and one of the three app creations fails: a red banner appears. Fix the cause (for example, remove unused apps in the Firebase console) and click **Connect Apps** again: Nowa creates the missing apps, but still stops before it writes the config files, and the banner stays. Only leaving the screen and picking the project again works.

Correction: the retry isn't a no-op as the row suggests; it creates the missing apps in Firebase, then stops. The banner reads "Error creating apps, you  have finished your limits of apps on Firebase" (with a double space) for any failure, and the real exception is dropped.

**Steps to reproduce** (not run)
1. Settings (gear) → **Integrations** → **Firebase** → **Continue with Google**, then click a Firebase project that is at its app limit (or make an app creation fail another way).
2. Click **Connect Apps**. The red banner appears.
3. Remove unused apps in the Firebase console, return to Nowa and click **Connect Apps** again.

Expected: the apps are created and the page switches to the connected view.
Actual: the banner stays and the page doesn't connect (the apps now exist in Firebase). Click the back arrow, click the project again and **Connect Apps** works.

**Root cause.** `creatingAppsError` is set in each `catch` and never cleared (`fb_apps.dart:57, 201, 211, 221`). `connectApps()` returns at `if (creatingAppsError) { ... return; }` (`:224-229`) before `createSetup` (`:230`), so once it is true every later call ends there, even when all three apps now exist. Going back sets `selectedProject = null` (`fb_projects.dart:38`), which builds a fresh `ProjectApps` state with the flag off (`fb_apps.dart:46-57`), and `loadApps` finds the apps. The banner text is fixed (`:158`), and each `catch` discards `e`.

**Suggested fix.** Reset the flag at the start of `connectApps()` (`:190`): `setState(() { creatingSetupDone = false; creatingAppsError = false; })`. Keep the exception from each `catch` and show it (or a generic "Could not create the apps" plus the first message); say "app limit" only for the quota error; fix the double space. Related, not in the row: `createFirebaseApp` polls the creation operation in a `do/while` with no delay and no cap (`firebase_api_service.dart:111-115`), so an operation that ends with an error instead of a `response` would spin. Test: nothing covers `ProjectApps`; add a widget test next to `packages/data/test/firebase/firebase_test.dart` using `MockFirebaseApi` (make its `createFirebaseApp` fail once) and assert that a second tap reaches `createSetup`.

**Docs impact.** `docs/integrations/firebase/connect.md`, "If something goes wrong", the **An app can't be created** bullet: it tells people to click the back arrow and pick the project again. After the fix, say "click **Connect Apps** again". Update the quoted banner text if it changes.

### P33. Disconnecting leaves `google_sign_in` behind, and turning Authentication off leaves `sendPasswordResetEmail()`

- **Area:** Firebase disconnect and Authentication (`packages/data/lib/src/firebase`)
- **Severity:** Medium — turning **Authentication** off leaves a function that no longer compiles; **Disconnect Project** leaves an unused package (that half is Low).
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — the call order and the member removals were read; not run (needs a connected Firebase project).

**What happens.** Two different clean-ups are incomplete. **Disconnect Project** removes the Firebase packages but leaves `google_sign_in` when the Google provider was on. Turning **Authentication** off, or switching **Email/Password** off, removes the sign-up and sign-in functions but leaves `sendPasswordResetEmail()` in `FirebaseService`. With **Authentication** off the `firebase_auth` package that function calls is gone too, so the file no longer compiles (expected; not run).

Correction: the row blends the two. **Disconnect Project** deletes `lib/firebase/firebase.dart` whole, so `sendPasswordResetEmail()` doesn't survive it. And `google_sign_in` is removed correctly when you switch **Google** off in **Manage Providers** or turn **Authentication** off.

**Steps to reproduce** (not run)

A. Disconnect Project
1. Settings → **Integrations** → **Firebase** (connected): turn on **Authentication**, click **Add Provider**, then click **Google**.
2. Open Settings → **General** → **Packages**: `google_sign_in` is listed.
3. Back on **Firebase**, click **Disconnect Project** → **Clear All Files**.
4. Open **Packages** again.

Expected: `google_sign_in` is gone with the other Firebase packages.
Actual: it is still listed.

B. Authentication off
1. Turn on **Authentication**, click **Add Provider** and click **Email/Password**. In code mode (`<>`), `lib/firebase/firebase.dart` has `signUpWithEmailAndPassword`, `signInWithEmailAndPassword` and `sendPasswordResetEmail`.
2. Turn **Authentication** off (or click **Manage Providers** and switch **Email/Password** off).
3. Open `lib/firebase/firebase.dart` again.

Expected: all three functions are gone.
Actual: `sendPasswordResetEmail` remains.

**Root cause.** `FBManager.disconnect()` deletes the file and sets `data.fbBaseClass = null` (`firebase_manager.dart:159-161`), and only then calls `auth.disconnectAuth()`:

```dart
data.fbBaseClass = null;
await auth.disconnectAuth();
```

Every `is...Enabled` check reads `fbBaseClass?.instanceMembers[...]` through the shared data object (`fb_auth_manager.dart:20, 24-32`), so they all read false. `disconnectGoogleAuth()` (`:135-140`), the only code that removes `google_sign_in` and rewrites `Info.plist`, never runs; removing a package is also what triggers its platform clean-up (`packages/core/lib/src/interpreter/packages/package_config/package_config.dart:206-210`), so the iOS settings the provider wrote probably stay too (not traced). Separately, `connectEmailPasswordAuth()` adds three functions (`:44-52`) and `disconnectEmailPasswordAuth()` removes two (`:142-145`). The test 'Disconnect Firebase without Disable Auth' (`packages/data/test/firebase/firebase_test.dart:197-213`) asserts those same booleans, which are false because the base class is null, so it passes.

**Suggested fix.** In `disconnect()` call `await auth.disconnectAuth()` before `data.fbBaseClass = null` (`firebase_manager.dart:161-162`), or make `disconnectAuth` remove `google_sign_in` and `firebase_auth` by package name instead of by member. Add `fbBaseClass?.instanceMembers['sendPasswordResetEmail']?.remove();` to `disconnectEmailPasswordAuth()`. Await the fire-and-forget `removePackage` calls (`fb_auth_manager.dart:123, 136`). Watch out: `google_sign_in` is also what the standalone **Google Sign-In** integration installs for Supabase (`google_sign_in_package_config.dart:7-9`), so don't remove it when that integration is in use. Test: in group 'Firebase Auth' of `firebase_test.dart`, (1) connect Authentication and Google, call `disconnect()`, expect `getPackage('google_sign_in')` to be null; (2) connect Email/Password, call `disconnectEmailPasswordAuth()`, expect no `sendPasswordResetEmail` member.

**Docs impact.** `docs/integrations/firebase/auth.md`, "Turn Authentication off": drop "except `sendPasswordResetEmail()`, which stays in `FirebaseService`. Delete it in code mode if you don't need it." `docs/integrations/firebase/connect.md`, "Disconnect Firebase": "the Firebase packages" becomes accurate; no change.

### P34. An expired Google sign-in during "Send Test Notification" disconnects Firebase from the project

- **Area:** Firebase push notifications (`packages/data/lib/src/firebase/setup/views`, `packages/data/lib/src/firebase/push_notifications`)
- **Severity:** High — one click on a test button deletes the Firebase setup (config files, generated code, packages) with no warning, and anything edited in the deleted files is lost.
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Confirmed in code — the 401 path and the disconnect were read; not run (needs a connected Firebase project and an expired token).

**What happens.** Nowa sends the test notification with the Google access token it stored when you signed in. When Google answers 401 (the token expired or was revoked), Nowa runs the full Firebase disconnect instead of asking you to sign in again. `disconnect(keepFirestoreFiles: true)` deletes `lib/firebase/firebase.dart`, `lib/firebase_options.dart`, `android/app/google-services.json`, `ios/Runner/GoogleService-Info.plist` and `lib/firebase/notification_service.dart`; removes the `main.dart` start-up line and the `firebase_core`, `firebase_auth`, `cloud_firestore`, `firebase_messaging` and `flutter_local_notifications` packages; and clears the Firebase settings. Only `collections.dart` and `queries.dart` stay. Anything in your screens that calls `FirebaseService` now refers to a class that no longer exists (expected; not run). The page shows no message and returns to **Connect Firebase**.

**Steps to reproduce** (not run)
1. In a project connected to Firebase, open Settings → **Integrations** → **Firebase** and turn on **Push Notifications (FCM)**. **Test Push Notifications** appears.
2. Make the stored sign-in invalid: wait until Google's access token expires (they usually last about an hour), or remove Nowa's access in your Google account's security settings.
3. Type a **Notification Title** and **Notification Text**, then click **Send Test Notification**.

Expected: a message such as "Your Google sign-in expired", **Continue with Google** to sign in again, and the project stays connected.
Actual: no message; the page shows **Connect Firebase** with **Continue with Google**, and after you sign in the **Projects** list shows, because the project is no longer connected. The files above are gone.

**Root cause.** `sendTestNotification` uses its own `Dio`, without the interceptor the other Firebase calls have, and maps a 401 to `NotificationSendResult.tokenExpired` (`fb_push_notifications_manager.dart:14-16, 124-126`). The widget handles that result with the full disconnect (`notification_settings.dart:183-185`):

```dart
await fbManager.disconnect(keepFirestoreFiles: true);
```

Every other 401 goes through `FirebaseApiServiceImpl`, which only calls `disconnectFBUser()` (`firebase_api_service.dart:60-63`): it removes the stored token, and `FBSetupView` then shows **Continue with Google** while the project stays connected (`firebase_settings.dart:42-48`). The stored string is a bare access token with no refresh (`firebase_manager.dart:140-144`, `packages/core/lib/src/services/auth/auth_io.dart:56-72`).

**Suggested fix.** Replace the call with `await fbManager.disconnectFBUser();` and show a snackbar ("Your Google sign-in expired. Sign in again to send a test notification."), as the interceptor path does. Test: in `packages/data/test/firebase/firebase_test.dart`, give `FBPushNotificationsManager` an injectable `Dio` (the field is private and created inline, `:14`), make it answer 401, and assert that `isConnected` stays true and the `firebase-token` preference is removed.

**Docs impact.** `docs/integrations/firebase/notifications.md`: the `:::warning` under "Send a test notification" ("If Google no longer accepts Nowa's sign-in ... Nowa disconnects Firebase from your project ...") is accurate today. After the fix, say Nowa asks you to sign in with Google again and keeps the project connected.

### P48. The 3.13.0 designer has no way to add or pick a Firestore collection or query

- **Area:** Firebase / Cloud Firestore (`packages/data/lib/src/firebase`, `lib/project/panels/files_panel`, `lib/project/side_bar.dart`)
- **Severity:** High — nobody can add a Firestore collection or query from the 3.13.0 designer; the only ways around it are a hand-typed URL parameter or hand-written Dart.
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev. New in 3.13.0: 3.12.5 had **Files** in the designer sidebar.
- **Confidence:** Confirmed in code — every route below was traced and the controls' only builder was found by grep. Nothing was run, because the docs test account can't connect Firebase; the Library route and `?panel=files` are unconfirmed live.

**What happens.** **Add Main Collection**, **Add New Query**, the collection tree and the query list exist only in the preview popup of `collections.dart` and `queries.dart`. Only the **Files** panel opens that popup, and in 3.13.0 **Files** exists only in code mode, where a click opens the file as code. The **Collections** and **Queries** editors still open, but they tell you to select an item "from the outline panel", and no outline panel exists. A new Firestore setup can't define the collections and queries that the Data Builder and Circuit depend on.

**Steps to reproduce** (the full path from the UI; not run)
1. Click the gear (**Settings**) → **Integrations** → **Firebase** → **Continue with Google** → click the project → **Connect Apps**. Connecting creates `lib/firebase/collections.dart` (empty) and `lib/firebase/queries.dart` (a `FirestoreService` class), `firebase_manager.dart:92`.
2. On the connected page look for a Firestore control. The page has **Refresh/Update apps and config files**, **Authentication**, **Push Notifications (FCM)**, **SHA Certificate Fingerprints (For Google Sign in)**, **Go to your Firebase Dashboard** and **Disconnect Project**. There is none.
3. Close Settings. The sidebar has **Library** and no **Files**. In the Library click **+** (**Add**): the menu has **New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, **API Collection...**, **Import Dart code...** and **Upload Assets...**. No Firestore entry.
4. In the Library click the funnel (tooltip **Filter**) → **Everything**, search `FirestoreService`, select it and press Enter (or right-click → **Open**). The **Queries** editor opens with "Nothing selected" and "select a query from the outline panel to open it". There is no outline panel and no **Add New Query**. (For collections there is no row after a fresh connect, because `collections.dart` is empty, so the **Collections** editor can't be opened from here at all.)
5. Select a List View → **Add Wrapper** → **Data Builder** → **Source**: **Firestore** → the **Query** button. **Select Firestore Query** lists existing queries only.
6. Click `<>` (code mode) in the top bar. **Files** appears; click `lib/firebase/queries.dart`. It opens as plain Dart.
7. Hidden way in: open the project at `/project/<id>?panel=files`. The left panel becomes the **Files** tree. Click `collections.dart` for a popup with **Add Main Collection** and the collection tree, or `queries.dart` for **Add New Query**.

Expected: an obvious way to add and select a collection or a query, as **Files** gave in 3.12.5.
Actual: only step 7 works (or typing Dart in step 6).

**Root cause**
- The outline widgets are built in one place, the `FileInfo.preview` of `collections.dart` and `queries.dart` (`packages/data/lib/src/firebase/firebase_plugin.dart:37-47`). `FirestoreOutline` (`firestore_outline.dart:13-24`) is defined and never used.
- `FileInfo.preview` is read only by `FilePreviewDialogBody` (`lib/project/panels/files_panel/file_preview_body.dart:24-27`), which only `FilesTreeHost._activate` opens, and only in design mode; in code mode the same click opens the file (`lib/project/panels/files_panel/files_tree_host.dart:266-282`).
- 3.13.0 swapped the designer's **Files** for **Library** (`lib/project/side_bar.dart:44-54`); code mode switches the panel to Files (`packages/core/lib/src/panels/panel.dart:205-208`). 3.12.5 listed both (`3.12.5: lib/project/side_bar.dart:43, 63`), and a click on a file there showed the popup (`3.12.5: lib/project/panels/files_panel/files_list.dart:334-342`).
- The editors are the block views `FbCollectionView` and `FbQueryView` (`firebase_view.dart:12-61`), shown only outside code mode (`packages/core/lib/src/editors/dart_editor/dart_editor.dart:58-80`). With no selection they show the "outline panel" text (`collections_workspace.dart:20`, `queries_builder.dart:26`). The selection is written only by the outline tiles (`firestore_outline_tile.dart:73-74, 247-248`) and the add and remove calls (`collections_manager.dart:82, 89, 94`; `query_builder_manager.dart:61, 69, 78`). Library **Open** doesn't select anything: the two views don't override `BlockView.navigate` (`packages/core/lib/core_hooks.dart:103`).
- Nothing else builds the outlines: no Firestore plugin panel (only Supabase registers one, `supabase_plugin.dart:24`), no Library **Add** entry (`registerDartFileCreator` has one caller, the API plugin, `api_plugin.dart:35`), no control on the Firebase settings page (`connected_main_screen.dart`), no Nowa AI tool (`grep -i firestore packages/ai` finds only a package allow-list).
- `?panel=files` works because `WorkspaceOptions.fromQuery` reads `panel` (`packages/core/lib/src/panels/workspace_options.dart:21`), `_resolvePanel` matches names from both sidebar lists, so `files` resolves in the designer (`lib/project/workspace_options.dart:99-104`), and `LeftPanel` builds `FilesPanel` for `'Files'` whatever the mode (`lib/project/panels/left_panel.dart:31`).

**Suggested fix.** Smallest: give the two outlines a home in the designer, which also makes the editors' own text true.
1. Register a Firestore panel in `FirebasePlugin.init()` the way Supabase does (`coreHooks.registerPluginPanel(PluginPanel(name: 'Firestore', icon: ..., builder: ...))`, `supabase_plugin.dart:24-26`). The builder shows `CollectionsOutline` and `QueryBuilderOutline` (two sections or tabs) inside `FirestoreSetup` (`firestore_editor.dart:8-39`), or `NotConnectedView` (`firestore_common.dart:6-42`) when Firebase isn't connected. The tiles already open the editor tab and select the item, so the editors need no change. Alternative: put the outline beside the editor in `FbCollectionView` / `FbQueryView` and add **Open Collections** / **Open Queries** buttons to `FBConnectedMainScreen` (which must also close the settings overlay).
2. Load the Firestore files when a project opens (P49): `FirestoreSetup` needs the two `DartFile`s for its undo scope, and the tiles use `!` on them.
3. Override `navigate` in the two views so Library **Open** on `FirestoreService` or on a collection selects it.

Watch out: `PluginPanel` has no visibility hook, so the icon shows in every project (Supabase's does too). Don't use `registerDartFileCreator` for this: it creates a file, not a class inside the shared `collections.dart`. Test: in `packages/data/test/firebase/`, a plugin test that `FirebasePlugin.init()` registers the panel, and a widget test that pumps `FirestoreSetup` with `CollectionsOutline`, runs **Add Main Collection** and expects `collectionsManager.collections` to grow. The manager side has tests (`firebase_test.dart:215-290`); the widgets have none.

**Docs impact.** `docs/integrations/firebase/firestore.md`: the intro, the **Before you start** bullet, the whole section "Add collections and queries in Nowa 3.13" and the lead-ins of "Define your collections" and "Build a query" (restore the removed steps: **Add Main Collection**, **Add Sub Collection**, **Add New Query**, **Function Name**). Also `docs/integrations/firebase/connect.md` (the `collections.dart` / `queries.dart` row in the file table, and the Windows bullet), `docs/troubleshooting/known-issues.md` (last sentence of the Firestore section) and `docs/guides/data-and-state-tips.md` (the **Firestore** bullet under the query-testing tips). The hidden URL stays undocumented (D21 in `_rewrite/decisions.md`).

### P49. Firestore queries and collections are missing from the pickers after a project is reopened, until Refresh is clicked

- **Area:** Firebase / Cloud Firestore (`packages/data/lib/src/firebase`)
- **Severity:** Medium — after reopening, existing queries can't be picked in a Data Builder or in Circuit until the user finds **Refresh/Update apps and config files**.
- **Where:** both; both cloud and local projects
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5)
- **Confidence:** Code reading only, not run — every caller of the loader was found by grep, but nobody reopened a connected project to look; the Data Builder picker has only been seen empty in the playground, where nothing was connected.

**What happens.** The two Firestore managers that hold the query list and the collection list are filled only when Firebase is connected or refreshed. Opening an already-connected project loads `FirebaseService` but not them, so **Select Firestore Query** shows nothing, the Circuit **FIREBASE** category lacks the query nodes, and **Select Collection** reads "No Collections", although `lib/firebase/queries.dart` and `collections.dart` are intact. In 3.13.0 **Select Collection** is reachable only through the hidden route of P48.

**Steps to reproduce** (not run)
1. Use a project connected to Firebase whose `lib/firebase/queries.dart` has at least one query (made in 3.12.5 with **Add New Query**, or written by hand).
2. Reload the editor tab, or leave the project and open it again from the dashboard.
3. Select a List View, click **Add Wrapper** → **Data Builder**, set **Source** to **Firestore** and click the **Query** button (it reads `none`).
4. In the Circuit of any event, add a node and look at the **FIREBASE** category.

Expected: **Select Firestore Query** and the category list the query.
Actual (from the code): the picker is empty, and the category has only `FirebaseService`'s functions.
5. Settings → **Integrations** → **Firebase** → **Refresh/Update apps and config files**, then repeat step 3: the query appears.

**Root cause.** On open, `FBManager.load()` only calls `loadFBBaseFile()` and registers the suggestion category (`firebase_manager.dart:63-69`). `FBQueryManager._fbFirestoreQueriesClass` and `FBCollectionsManager.fbFireStoreCollectionFile` are set only by `FirestoreManager.loadFiles()` (`firestore_manager.dart:13-16`; `query_builder_manager.dart:35-42`; `collections_manager.dart:29-45`). Its only caller is `FBManager.createSetup` (`firebase_manager.dart:92`), which runs on **Connect Apps** (`fb_apps.dart:230`), on **Refresh/Update apps and config files** (`connected_main_screen.dart:50`) and when the Google provider is added without a stored client id (`fb_auth_manager.dart:63`). Until then `queryFunctions` and `collections` return empty lists (`query_builder_manager.dart:24-26`, `collections_manager.dart:16-18`), and those feed the picker (`firebase_field.dart:70-76`, titled "Select Firestore Query" by `data_link_menu.dart:73`), the Circuit category (`firebase_plugin.dart:133-144`) and **Select Collection** (`lists_widgets.dart:55-81`). In the old popups the add buttons also misbehave in this state: **Add New Query** throws "Firestore queries class is not found" (`query_builder_manager.dart:54-56`), **Add Main Collection** adds nothing, silently (`collections_manager.dart:81`), and clicking a query or collection tile hits a `!` on a null file (`firestore_outline_tile.dart:73, 247`).

**Suggested fix.** Call a Firestore load from `FBManager.load()` after `loadFBBaseFile()`. Watch out: `loadQueriesClass()` and `loadFireStoreCollectionFile()` create their files when missing, and the second also moves classes out of the old `firestore_collections.dart` (`collections_manager.dart:29-63`). Doing that at open would recreate files a user deleted and would try to write in a View Only project, so add a lookup-only variant for open and keep the creating one for `createSetup`. Guard the cast `lookupInScope('FirestoreService') as ClassDeclImpl` (`query_builder_manager.dart:39`) for a file without that class. Test: in the 'Firebase Firestore' group of `packages/data/test/firebase/firebase_test.dart` (`:215`), after `createFBManagerWithSetup()` add a query and a collection, create a fresh `FBManager` over the same settings file, `await load()`, and expect `queryManager.queryFunctions` and `collectionsManager.collections` to be non-empty (both are empty today).

**Docs impact.** `docs/integrations/firebase/firestore.md`: "Build a query" step 2 ("It reads 'No Collections' until you define one"), "Use a query in your app" step 3 and the Circuit paragraph, and `docs/logic/circuit.md:51` (the **FIREBASE** category). Until the fix they could carry a one-line workaround ("If the list is empty after you reopen the project, click **Refresh/Update apps and config files** in Settings → Integrations → Firebase"). After the fix nothing changes.
