# S3: extra issues found while writing the batches

### X1. The `stripe-cancel-subscription` edge function is generated with a syntax error, so in-app cancellation can't work

- **Area:** Stripe integration, **Subscription** purchase type (`packages/core/lib/src/integrations/stripe`)
- **Severity:** High — every project that deploys the Subscription type gets a cancel function that cannot run, and Nowa reports success. Not Critical: subscribe, status and the webhook are unaffected, and a subscription can still be cancelled in Stripe itself.
- **Where:** both; both cloud and local projects (the deploy needs a Nowa sign-in and Supabase connected with **Connect**, so not the signed-out playground)
- **Status:** Present in 3.13.0 and dev (same line in 3.12.5; added in `5ae31a4fa`, 2026-02-19, "Stripe subscription", unchanged since)
- **Confidence:** Confirmed in code — I rebuilt the generated TypeScript from the Dart strings (a Python port of Dart's string rules; the Dart itself wasn't run) and parsed it with TypeScript 6.0.2, Bun 1.3.14 and Node 22.22.0's built-in type stripper (Amaro 1.1.4): all three reject line 44. Deno isn't on this machine and nothing was deployed, so Supabase's answer is unobserved.

**What happens.** **Deploy Configuration** with **Subscription** selected sends Supabase the function `stripe-cancel-subscription`, whose source contains `.order('created_at', ascending: false)`, a Dart named argument that is not valid TypeScript. The file can't be parsed, so the function can't load at all (nothing in it can run, not even its CORS reply), and the app's `cancelSubscription()` can only fail. Nowa still ends with "Deployed successfully!" because deploy errors are swallowed (R2 in `S1-from-reviews.md`). The other generated functions parse fine.

Overlap: R3 in `S1-from-reviews.md` logs the same line from the review notes. This entry adds the parser results, what else is affected and how users reach it. R3 says Supabase "can't bundle it"; that is not verified (see Root cause).

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
