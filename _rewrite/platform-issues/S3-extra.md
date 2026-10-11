# S3: extra issues found while writing the batches

### X1. The `stripe-cancel-subscription` edge function is generated with a syntax error, so in-app cancellation can't work

- **Area:** Stripe integration, **Subscription** purchase type (`packages/core/lib/src/integrations/stripe`)
- **Severity:** High — generated code that doesn't build: every project that deploys the Subscription type gets a cancel function that can't be parsed, so `cancelSubscription()` can only fail, and Nowa reports success. Subscribe, status and the webhook are unaffected, and a subscription can still be cancelled in Stripe itself.
- **Where:** both; both cloud and local projects (the deploy needs a Nowa sign-in and Supabase connected with **Connect**, so not the signed-out playground)
- **Status:** Present in 3.13.0 and dev (same line in 3.12.5; added in `5ae31a4fa`, 2026-02-19, "Stripe subscription", unchanged since)
- **Confidence:** Confirmed in code — I rebuilt the generated TypeScript from the Dart strings (a Python port of Dart's string rules; the Dart itself wasn't run) and parsed it with TypeScript 6.0.2, Bun 1.3.14 and Node 22.22.0's built-in type stripper (Amaro 1.1.4): all three reject line 44. Deno isn't on this machine and nothing was deployed, so Supabase's answer is unobserved.

**What happens.** **Deploy Configuration** with **Subscription** selected sends Supabase the function `stripe-cancel-subscription`, whose source contains `.order('created_at', ascending: false)`, a Dart named argument that is not valid TypeScript. The file can't be parsed, so the function can't load at all (nothing in it can run, not even its CORS reply), and the app's `cancelSubscription()` can only fail. Nowa still ends with "Deployed successfully!" because deploy errors are swallowed (R2). The other generated functions parse fine.

**Steps to reproduce** (the deploy was not run)
1. Open a project while signed in to Nowa, with Supabase connected using **Connect** (**Supabase** icon → **Connect**, pick the project).
2. Click the gear (**Settings**) → **Integrations** → **Stripe** and turn on **Enabled**.
3. Under **Purchase Types** click **Subscription** (click **One-Time** to switch it off; at least one type always stays on). A Subscription-only setup needs no table.
4. Click **Deploy Configuration**. The status line runs through "Creating subscriptions table...", "Deploying subscription function...", "Deploying cancel subscription function..." and "Deploying unified webhook handler...", and a green snackbar says "Deployed successfully!".
5. In the Supabase dashboard open **Edge Functions** and look at `stripe-cancel-subscription`. Or, in Circuit, add `StripePaymentService` → `cancelSubscription` to a button's **On Pressed** and run the app.

No-UI check: evaluate the string returned by `StripeEdgeFunctions.getCancelSubscriptionFunction()` (its only interpolation is `$subscriptionTable`, `nowa_stripe_subscriptions`), save it as `index.ts`, and run `bun build --no-bundle index.ts` or any TypeScript parser.

Expected: the function exists and starts, and `cancelSubscription()` sets the user's subscription to cancel at the period end.
Actual (from the parsers and the code): the module can't load. The function is either missing (upload refused) or listed but unable to start, `cancelSubscription()` throws, and the success message of step 4 appears either way.

**Root cause.** `packages/core/lib/src/integrations/stripe/stripe_edge_functions.dart:659`, inside the string returned by `getCancelSubscriptionFunction()` (`:614-707`):

```ts
.order('created_at', ascending: false)
```

In JavaScript an argument can't be written `name: value`; the TypeScript client takes an options object, `.order('created_at', { ascending: false })` (supabase-js isn't on this disk; the fix is the documented form). The call is valid Dart, where `ascending` is a named parameter (`~/.pub-cache/hosted/pub.dev/postgrest-2.6.0/lib/src/postgrest_transform_builder.dart:72-77`), and the generated Dart client has the same call (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:801, 816`), which is probably where it was copied from. Nothing parses or tests these strings (no Stripe tests exist under `packages/core/test/`).

- **Parser results** (position 44:37 is the colon after `ascending`, line 44 of the generated file; Dart line 659):

  | Parser | The generated function | With `{ ascending: false }` |
  |---|---|---|
  | TypeScript 6.0.2, `transpileModule` | TS1005 "',' expected." | no diagnostics |
  | Bun 1.3.14, `bun build --no-bundle` | Expected ")" but found ":" | builds |
  | Node 22.22.0, `stripTypeScriptTypes` (Amaro 1.1.4, SWC-based) | Expected ',', got ':' | strips |

- **Whole function, not only at runtime.** A module that doesn't parse can't be evaluated, so a runtime-only failure on that line is not possible. Whether Supabase's deploy call refuses the upload (bundling) or accepts it and answers the first request with a boot error can't be told here. Nowa's code reports success in both cases. If the upload is refused, `SupabaseOAuthService.deployEdgeFunction` throws (`packages/data/lib/src/supabase/supabase_oauth_service.dart:156-164`), but `SupabaseOAuthManager.deployEdgeFunction` catches it into a private field (`packages/data/lib/src/supabase/supabase_oauth_manager.dart:182-183`) and `StripeSupabaseService` never reads it, so `deploy()` goes on to the webhook and reaches `'Deployment successful!'` (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:419`) and the snackbar (`packages/core/lib/src/integrations/stripe/stripe_settings.dart:643-649`). If it is accepted, `verifyEdgeFunction` only asks whether the function exists (`supabase_oauth_service.dart:191-202`), so that passes too.
- **The app side.** The generated `cancelSubscription()` (`stripe_supabase_service.dart:823-834`) calls `functions.invoke`, which throws `FunctionException` on any non-2xx answer (`~/.pub-cache/hosted/pub.dev/functions_client-2.5.0/lib/src/functions_client.dart:183-190`).
- **Other functions.** I rebuilt all five functions the way Dart builds them and parsed every variant with the same three tools: one-time and consumable (fixed currency and currency column), `stripe-create-subscription`, and `stripe-webhook` for one-time, consumable, subscription, all three, and one-time plus subscription. All 10 parse; only the cancel function fails. It is the only Dart-style named argument in the generated TypeScript. I did not check the Stripe API calls in any of them against the pinned API version.
- **How users reach it.** **Enabled** installs `flutter_stripe` (`PackageToggle`, `packages/core/lib/src/settings/settings_widgets.dart:149-190`); **Purchase Types** and **Deploy Configuration** are in `stripe_settings.dart:148, 613`; `deploy()` loops over the chosen types (`stripe_supabase_service.dart:396`) and `_deploySubscriptionFlow` (`:472-493`) deploys `stripe-create-subscription`, then `stripe-cancel-subscription`.

**Suggested fix.** Change line 659 to `.order('created_at', { ascending: false })` (braces need no escaping in a Dart `'''` string). Add a test in `packages/core/test/` that builds every variant and parses it, for example by writing each to a temp `.ts` file and running a parse-only command such as `bun build --no-bundle` (used here) when the tool is on PATH (skip otherwise), and run it in CI. `deno check` fails on this file too, since it has to load the module, but it also fetches the remote imports. A regex for named arguments would give false hits on object literals such as `cancel_at_period_end: true`. Also make the Stripe service throw when the manager reports an error, so a failed deploy shows in red under **Deploy Configuration** (R2). Watch out: projects that already deployed keep the broken function until the next **Deploy Configuration**, and a manual fix made in Supabase is overwritten by that same deploy.

**Docs impact.** `docs/integrations/stripe.md`: the Subscription row of the function table (`:84`), the `cancelSubscription()` row (`:118`) and the warning that a failed Supabase step may show no error (`:89`). Today the `cancelSubscription()` row promises something that fails. Nothing to change for X1 itself after the fix.

Related: R2, P23.

### X2. **Accept Remote** in Resolve Conflicts can write the next file's text into the file you resolved

- **Area:** Git, Resolve Conflicts dialog (`lib/project/panels/git_panel`)
- **Severity:** Critical — work can be lost: **Accept Remote** writes another file's text into the file you resolved and stages it, with no warning. After **Bring my changes**, where **Remote** holds your own edit (see P28), that edit is gone for good; after a merge or pull both sides stay in Git.
- **Where:** both; cloud and local projects (the dialog is shared), whenever it holds two or more files
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5: `git_details.dart:1860-1869, 1975-1983` there)
- **Confidence:** Confirmed in code — the control flow was traced in `lib/project/panels/git_panel/git_details.dart`, and a stand-alone Dart 3.12.2 script that copies `_loadTexts`, `_acceptChanges` and the two button handlers (not the app) wrote `{lib/a.dart: B-remote, lib/b.dart: B-remote}` after two **Accept Remote** clicks. The dialog itself was not run.

**What happens.** With two or more files in **Resolve Conflicts**, **Accept Remote** on any file except the last writes the next file's **Remote** text into the file you are resolving, then stages it. **Accept Local** is not affected, and neither is **Accept Remote** on the last file. The dialog moves on to the next file as if all were well, so nothing shows that the wrong text was written. The docs say "Repeat for each file", which is the sequence that triggers it.

Split out of P29, where it shared the dialog with a different fault (Git forgetting the other conflicts).

**Steps to reproduce** (desktop app, local project with Git; not clicked through in the app)
1. Make a merge conflict in two files: on branch `feature` change the same line in two files (for example `lib/pages/home_page.dart` and `lib/globals/app_state.dart`) and click **Commit All**. Switch back to `main`, change the same lines differently and commit.
2. On `main`, click the branch name, hover `feature`, click **Merge into current branch**, then **Merge**. **Resolve Conflicts** opens on the first file.
3. Click **Accept Remote**. The dialog moves to the second file.
4. Click **Accept Remote** on the second file (the dialog closes), open the first file in code mode and compare it with the `feature` branch's version of that file (the text of its **Remote** pane).

Expected: the first file holds its own **Remote** text.
Actual: it holds the second file's **Remote** text, and Git has it staged.

**Root cause.** `_acceptChanges` reads the pane text after an `await` (`lib/project/panels/git_panel/git_details.dart:1777-1786`): `final file = await gitManager.fileFor(conflictPath); final content = local ? _localController.controller.text : _remoteController.controller.text;`. Only `conflictPath` is read before the `await`. **Accept Local** awaits `_acceptChanges(true)` before moving on (`:1877-1887`). **Accept Remote** calls `_acceptChanges(false)` without `await` (`:1892`) and, in the same turn, runs `index++; _loadTexts()` (`:1894-1895`). `_loadTexts` has no `await`, so it sets both controllers to the next file's text at once (`:1769-1775`), and the controller's `text` setter is synchronous (`re_editor-0.10.0/lib/src/_code_line.dart:175-181`). When `_acceptChanges` resumes, it reads the next file's text and writes it to the first file's path. The last file is safe because no `_loadTexts` follows.

**Suggested fix.** In `_acceptChanges`, read `content` before the first `await` (move that line above `final file = await gitManager.fileFor(conflictPath);`), and `await` it in both handlers so the dialog moves on only after the write, or use one shared handler as **Accept Local** already does. Catch errors and show them. Watch out: the same function ends with `gitManager.resolveAllConflicts()` (`:1785`), which is P29's fix, so the two changes touch the same lines. Test: extract the read-then-write into a function that returns the content to write and unit-test the order, or add a widget test of `ResolveConflictsDialog` with two `NConflict`s and a fake `GitManager`: tap **Accept Remote** twice and expect the first file to hold the first file's **Remote** text.

**Docs impact.** `docs/code/git.md`, section "Resolve conflicts": step 2 ("Repeat for each file. Nowa stages the resolved files.") is the sequence that triggers it. Until the fix, tell readers to check each file after **Accept Remote**; after it, no change.

Related: P29, P28.

### X3. Turning RevenueCat on and then adding the Paywall leaves `purchases_flutter` 10.x beside `purchases_ui_flutter` 9.x, which pub can't resolve

- **Area:** RevenueCat integration and Paywall widget, package versions (`packages/core/lib/src/interpreter/packages`, `packages/core/lib/src/settings/settings_widgets.dart`)
- **Severity:** High — a dependency set that can't resolve: the pubspec Nowa writes for anyone who follows the docs' order (**Enabled**, then the paywall) fails `pub get`, so the app can't build until one version is edited by hand.
- **Where:** both; cloud and local projects (the pubspec is written before the package analysis that hangs in P51, so the playground gets the same pair)
- **Status:** Present in 3.13.0 and dev (none of the code involved differs in dev). It began when `purchases_flutter` 10.0.0 came out on 2026-04-15; the pins were written for 9.x.
- **Confidence:** Confirmed in code — the switch, the pinned versions and the by-name dependency check are in the source, and pub.dev's package data (read on 11 Oct 2026) shows no pair that satisfies both constraints. `pub get`, a build and the app were not run.

**What happens.** The **Enabled** switch of **RevenueCat** adds `purchases_flutter` at the newest version on pub.dev, `^10.15.2` today. The **RevenueCat Paywall** widget then asks for `purchases_ui_flutter ^9.12.0`, and every 9.x of that package needs a 9.x `purchases_flutter`. The pubspec ends up with `purchases_flutter: ^10.15.2` beside `purchases_ui_flutter: ^9.12.0`, which `pub get` cannot solve. **Add Missing Dependencies** lists only `purchases_ui_flutter`, because it counts `purchases_flutter` as installed whatever its version.

Found while tracing P51 and split out of it. The order matters: adding the paywall first installs both packages at `^9.12.0`, which resolves.

**Steps to reproduce** (not run; use a local project, where the package analysis finishes, see P51)
1. Click the gear (**Settings**), then **RevenueCat** under **Integrations**, and turn on **Enabled**.
2. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, type `RevenueCat Paywall` and press <kbd>Enter</kbd>. **Add Missing Dependencies** lists `purchases_ui_flutter` only. Click **Add**.
3. Click the `<>` button (code mode), open `pubspec.yaml` and read `dependencies:`.
4. Run `flutter pub get` in the project folder, or click **Run** (a local run calls `pub get` first, `packages/core/lib/src/runner/local_build_service.dart:32`).

Expected: both packages are on the same major version (`^9.12.0` for both, or `^10.x` for both) and `pub get` succeeds.
Actual (from the code and pub.dev data): the pubspec holds `purchases_flutter: ^10.15.2` and `purchases_ui_flutter: ^9.12.0`, and `pub get` fails because no `purchases_flutter` satisfies both.

**Root cause.**
- The switch ignores the config's own version. `PackageToggle._toggle` calls `PackageService.addPackageByName(widget.packageName)` (`packages/core/lib/src/settings/settings_widgets.dart:162-174`, the call at `:167`), which asks pub.dev for the newest version and writes `^<latest>` (`packages/core/lib/src/interpreter/packages/package_service.dart:129-134`). The RevenueCat page uses this toggle (`packages/core/lib/src/interpreter/packages/package_config/package_config_settings.dart:96`), although the config pins `version: '^9.12.0'` (`packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart:14`).
- The paywall asks for the pins. Its dependencies are `SupportedPackages.revenucat` and `SupportedPackages.purchasesUiFlutter` (`revenuecat_package_config.dart:127-138`); the second is `PackageConfig(name: 'purchases_ui_flutter', version: '^9.12.0')` (`packages/core/lib/src/interpreter/packages/dart_package.dart:188`). `PackageDependency.fix` registers the package with that version (`packages/core/lib/src/dependency_system/dependency.dart:23-26`), and `_addToPubspec` writes it without comparing it with the other packages (`package_service.dart:211-228`).
- A dependency counts as fixed by name only: `PackageDependency.isFixed` is `isPackageInstalled(package.name)` (`dependency.dart:29`), and `isPackageInstalled` ignores the version (`package_service.dart:363-374`). So an installed `purchases_flutter ^10.15.2` hides the paywall's own `^9.12.0` pin from the dialog.
- pub.dev package data, read on 11 Oct 2026: `purchases_flutter` has a 10.x line since 10.0.0 (2026-04-15), now 10.15.2. Every 9.x of `purchases_ui_flutter` depends on the same 9.x of `purchases_flutter` (9.12.0 on `^9.12.0`, 9.16.2 on `^9.16.2`, line 14 of each `pubspec.yaml`), so `^9.12.0` can only be solved with a 9.x `purchases_flutter`. The 10.x line of `purchases_ui_flutter` exists too (10.15.2 needs `^10.15.2`).

**Suggested fix.**
1. Install the config's pinned version when the switch is turned on: in `_toggle`, use `SupportedPackages.find(widget.packageName)?.package` (`packages/core/lib/src/interpreter/packages/dart_package.dart:101`) with `registerPackage`, and keep `addPackageByName` for packages that have no config. Every integration page that uses `PackageToggle` (`package_config_settings.dart:96`, `packages/core/lib/src/integrations/stripe/stripe_settings.dart:97`) would then install its pinned version, so check that those pins are current.
2. Keep the two RevenueCat pins on one major version and move them together (both `^9.12.0` today; `^10.x` for both would also work). The generated `RevenuecatService` compiles against both lines: `configure`, `getOfferings`, `purchase(PurchaseParams)` and `restorePurchases` exist in `purchases_flutter` 9.12.0 and 10.15.2 (checked in the pub.dev archives).
3. Optional: when a package is added, compare its constraint with the packages already in the pubspec and tell the user about a clash instead of writing it.

Watch out: projects that already have the pair keep it until `purchases_flutter` is moved to `^9.12.0` (or both packages to `^10.15.2`) by hand. Test: in `packages/core/test/dependencies_test.dart` style (`registerPackage` on a mock project), run the switch's install path for the RevenueCat config, add the paywall's dependencies, and expect both packages on the same major version.

**Docs impact.** `docs/integrations/revenuecat.md`: step 2 of the setup steps ("Turn on **Enabled**. Nowa adds the `purchases_flutter` package.", line 19) and step 2 of "Add the paywall" ("The paywall also needs the `purchases_ui_flutter` package.", line 34) describe the order that fails. Until the fix, say to add the paywall first, or to give both packages the same major version under **Settings** → **Packages**; after it, no change.

Related: P51, P46.
