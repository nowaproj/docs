# W17 review: Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, Deep Links

Verifier run against `/home/user/nowa-master` (v3.12.5). Status: **in progress** (pages done so far are listed in the summary; the summary is rewritten at the end of the run).

Pages done: stripe.md, revenuecat.md

External vendor links (docs.stripe.com, supabase.com/docs, revenuecat.com, admob.google.com, developers.google.com, console.cloud.google.com) could not be fetched from this environment (egress policy answers 403 to CONNECT). `developer.android.com/training/app-links` and the Apple Universal Links page returned 200. The others are well-known canonical paths but were not link-checked: please re-check before publishing.

Shared facts re-checked once for the whole batch (all ok):
- Gear tooltip **Settings** and Ctrl/Cmd + `,`: `packages/nowa_ui/lib/top_bar/top_bar_view.dart:754`, `lib/project/top_bar.dart:154`, `lib/setup_general_actions.dart:33`.
- Sidebar groups **General** / **Integrations** / **Deployment** (enum name capitalized) and page names = `displayName`: `packages/core/lib/src/settings/settings.dart:6`, `:106-118`; integration order Google Maps, AdMob, RevenueCat, Deep Links, Google Sign-In, Stripe: `packages/core/lib/src/settings/project_settings.dart:37-45`. **Constants** and **Permissions** are in **General**: `constants_settings.dart:19`, `permission_settings.dart:15`.
- Generic integration page = header + description, **Enabled** switch, **Configuration** with one field per visible token: `packages/core/lib/src/interpreter/packages/package_config/package_config_settings.dart:87-105`; label **Enabled**: `packages/core/lib/src/settings/settings_widgets.dart:149-190`.
- Fields (`AsyncTextField`): Enter submits, send icon with tooltip **Submit** appears when the text changed, a check mark shows for 4 s, validation errors show under the field with a **Reset** icon: `packages/core/lib/src/fields/nowa_fields.dart:1150-1263`.
- No plan, desktop, cloud or local gating exists in any of the six integration configs (grep for `isLocal`, plan and Enterprise checks in `packages/core/lib/src/integrations`, `.../interpreter/packages/integrations`, `packages/nowa_mobile_ads`: no hits). No badges needed.

## stripe.md

Edits: fixed 5 claims, removed 1 unverifiable claim, reworded 3 passages; page is about 1,350 words by a prose-only count (was about 1,400 before; it covers setup in two systems, so no steps were cut).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Gear (**Settings**) or Ctrl/Cmd + `,`; **Integrations** → **Stripe** | ok | see shared facts; `stripe_package_config.dart:13` | |
| **Enabled** switch adds `flutter_stripe` | ok | `stripe_package_config.dart:11-13`, `settings_widgets.dart:149-190` | |
| Labels: **1. API Keys**, **Merchant Name**, **Country Code**, **Publishable Key**, **Purchase Types**, **Secret Key**, **Webhook URL**, **Webhook Secret**, **2. Payment Methods**, **Apple Pay**, **Apple Merchant ID**, **Google Pay**, **3. Business Table**, **Table**, **4. Map Fields**, **ID Field**, **Amount Field**, **Currency**, **From Column**, **Fixed Value**, **Currency Column**, **Fixed Currency**, **Deploy Configuration**, **Refresh**, **Refresh tables**, **Copy webhook URL** (22 labels) | ok | `packages/core/lib/src/integrations/stripe/stripe_settings.dart:148, 221, 237, 290, 303, 312, 318, 335, 352, 357, 366, 409, 424, 431, 443, 445, 463, 468, 485, 501, 527, 542, 564, 587, 620` | Apple field label is `Apple Merchant ID *` (asterisk = required); the page drops the asterisk, fine. |
| One-Time / Consumable / Subscription names, descriptions, One-Time selected by default, at least one stays selected | ok | `models/purchase_type.dart:10-19`, `stripe_settings.dart:174-182`, `services/stripe_supabase_service.dart:26`, `:266-276` | |
| Press Enter or send icon (**Submit**); check mark | ok | `nowa_fields.dart:1150-1263` | Merchant Name, Country Code, Publishable Key, Secret Key and Webhook Secret all use `AsyncTextField`. |
| Merchant Name = name customers see; Country Code two letters; keys start `pk_` / `sk_` / `whsec_` | ok | `stripe_settings.dart:468-545` (helper texts, hints `pk_test_...`, `sk_test_...`, `whsec_...`), `stripe_supabase_service.dart:864`, `:883` (`merchantDisplayName: AppConstants.stripeMerchantName`) | |
| The three values are saved in **Constants** (**Settings** → **General**) and compiled into the app | ok | `stripe_package_config.dart:19-45` (no `applyTo`, so Dart-only), `config_token.dart:122`, `constants_settings.dart:15-19` | |
| Secret fields appear once Supabase is connected; banner text "Connect to Supabase to configure backend settings, secrets, and deploy edge functions." | ok | `stripe_settings.dart:107-130` | The fields also appear after **Use Keys** (`isInitialized`), but see next row. |
| Needs **Connect**, **Use Keys** is not enough | ok (inferred) | `stripe_supabase_service.dart:20`, `:226-251`, `packages/data/lib/src/supabase/supabase_oauth_manager.dart:96-200`, `supabase_oauth_service.dart:104-215`, `sb_oauth_setup.dart:72-79` | Secrets, migrations and function deploys go to `/supabase/proxy/...` with Nowa's stored OAuth grant, which only **Connect** creates; other Supabase flows check `isOAuthAuthenticated` first (`sb_backend_setup_flow.dart:26`, `sb_outline.dart:238`). Not run in the app. |
| Secret Key saved as Supabase secret `STRIPE_SECRET_KEY`, Webhook Secret as `STRIPE_WEBHOOK_SECRET`; fields empty on reopen | ok | `stripe_settings.dart:524-545` (`initialValue: ''`, `saveSecret`), `stripe_supabase_service.dart:499-509` | |
| Copy icon next to **Webhook URL**; URL form | ok | `stripe_settings.dart:559-598` | Icon only shows when the project ref is known. |
| Events table | ok | `stripe_edge_functions.dart:806-828` | One-time/consumable: `payment_intent.succeeded`, `.payment_failed`; subscription: `customer.subscription.created/updated/deleted`, `invoice.paid`, `invoice.payment_failed`. |
| Apple Pay: Merchant ID, entitlement written to `ios/Runner/Runner.entitlements` | ok | `stripe_manager.dart:65-76`, `:102-118` | Written only when a Merchant ID is set. |
| Google Pay generated with `testEnv: true`; file path | ok | `stripe_supabase_service.dart:846-852`, `:511` | Same on dev. |
| Both wallets need the Country Code | ok | `stripe_settings.dart:306-308` | |
| **3. Business Table**: **Table**, "No tables found" + **Refresh**, refresh icon **Refresh tables** | ok | `stripe_settings.dart:213-295` | Removed the quoted section description (not a label). |
| **4. Map Fields** appears after a table is picked | fixed | `stripe_settings.dart:125-127` (`if (_service.selectedTable != null)`) | Added "which appears once you pick a table". |
| Currency: **From Column** (default) or **Fixed Value**; `USD` example | ok | `stripe_supabase_service.dart:40-44`, `stripe_settings.dart:409-455` | |
| App sends only the row ID; function reads the price from your table with the caller's JWT, RLS applies | ok | `stripe_edge_functions.dart:33-41`, `:89-98` | Currency is read from your table only in **From Column** mode: reworded "price and currency" to "price (and the currency, when it comes from a column)". |
| Warning: Amount Field multiplied by 100 | ok | `stripe_edge_functions.dart:124`, `:302` (`Math.round(amount * 100)`) | |
| **Deploy Configuration** disabled until required fields are set | ok | `stripe_supabase_service.dart:333-345`, `stripe_settings.dart:601-625` | |
| "Messages show progress ... and errors show in red under the button" | fixed | `stripe_settings.dart:601-646`, `supabase_oauth_manager.dart:125-209` | The Supabase steps (`applyMigration`, `deployEdgeFunction`, `setSecret`) catch their own errors and never throw; the Stripe service never reads that manager's `error`. So only errors Nowa itself catches reach the red box. Page now says "Errors Nowa catches show in red" and "A failed Supabase step does not always show an error ... confirm that the tables, functions and secrets are there". |
| Tables and edge functions created per type | ok | `stripe_edge_functions.dart:4, 216, 393`; `stripe_supabase_service.dart:410, 441, 462, 483, 490` | |
| Generated `lib/integrations/stripe_payment_service.dart`; Android `MainActivity`, ProGuard rules, app theme; iOS **Camera** permission; Apple Pay entitlement | ok | `stripe_supabase_service.dart:511-543`, `:926-932`, `stripe_manager.dart:12-17`, `:119-164`, `main_activity_template.dart:28-30` | |
| "on Android the minimum SDK (at least 23)" | removed | `stripe_package_config.dart:17` declares `minAndroidSdkVersion: 23`, but nothing reads it (grep over `packages` and `lib` finds only the declaration); the Android template writes `minSdk = flutter.minSdkVersion` (`app_build_gradle_template.dart`); only `minIosVersion` is applied (`package_config_service.dart:267-269`, `:323-333`) | Not true in v3.12.5. Product issue candidate. |
| Re-deploy keeps existing payment tables | ok | `stripe_edge_functions.dart:171, 349, 574` (`CREATE TABLE IF NOT EXISTS`, no `DROP TABLE`) | RLS policies are dropped and recreated each time. |
| Screenshot `stripe-supabase-tables.png` matches text | ok | image read | Supabase console; shows `nowa_stripe_consumable_payments` and `nowa_stripe_one_time_payments`, same names as the code and as the alt text. The address bar shows a real project ref and the project name `coin_market-backend` (already public in the old docs image `static/img/stripe/supabase-tables.png`). Low risk; consider a cropped re-capture. |
| Circuit step 1: "click **+** next to **On Pressed**" | fixed | `packages/core/lib/src/fields/nowa_fields.dart:786-815` (`FunctionField`: **Edit** with a bolt when a function exists, **+** when it does not); `docs/logic/events.md:12-18`; same fix made in W14 | A new **Button** already has a function, so it reads **Edit**. Now "click the button next to **On Pressed**". |
| Circuit step 2: **All nodes for this circuit**, search `StripePaymentService`, pick `processPayment` / `subscribe` | ok | `link_menu.dart:61`, `suggestion.dart:663-664` (a class with public statics is offered), `:703-721` (**Static** category) | |
| Circuit step 3: `recordId` / `priceId` fields | fixed | `packages/core/lib/src/fields/block_field.dart:213-225` (label = param name through `camelCaseToSpaces`) | The Details labels are **Record Id** and **Price Id**; page now uses those, with the `recordId` name kept in the methods table. Click the label to open the link menu: `docs/logic/expressions.md`. |
| **Future Options**, **onValue**, **onError** | ok | `packages/code/lib/src/fields/future_options.dart:81-97` | |
| Test on a device or emulator needs the desktop app | ok | consistent with `docs/test/devices.md` (reviewed in another batch) | |
| Methods table (names, `OneTime` / `Consumable` prefix when both, statuses `pending` / `succeeded` / `failed`, `subscribe(priceId:)`, subscription status/details, `cancelSubscription()`) | ok | `stripe_supabase_service.dart:646-836`, `stripe_edge_functions.dart:147, 729-776` | `cancelSubscription()` documented as designed; see open issue 1. |
| Error messages in the table | ok | `stripe_edge_functions.dart:52, 68`, `stripe_supabase_service.dart:682` | |
| `pending` stays when the webhook is missing | ok | `stripe_edge_functions.dart:147` (insert as `pending`), `:729` (webhook flips it) | |
| Remove Stripe: "deletes the Stripe settings, the service file and the Android and iOS changes" | fixed | `stripe_package_config.dart:63-87`, `stripe_manager.dart:21-38`, `package_config_service.dart:146-170`, `permissions_service.dart` (no removal), `app_constants_service.dart:37` (not called) | The iOS **Camera** permission is not removed and the **Constants** values stay. Page now says so. Apple Pay entitlement and Android changes are reverted. Supabase untouched: ok. |
| Front matter, no H1, headings sentence case, no `---` rules, 2 admonitions (`warning`, `tip`), no hype words, links | ok | grep | All 9 relative links resolve to files that exist. Two `CAPTURE` placeholders are well formed and have rows in `captures/requests/W17.md`. |

Open issues (Stripe):
1. `stripe-cancel-subscription` source has `.order('created_at', ascending: false)` (`stripe_edge_functions.dart:659`), which is not valid TypeScript. The function probably fails to deploy or run, and **Deploy Configuration** can still say "Deployed successfully!" (errors swallowed, see row above). The page documents `cancelSubscription()` as designed and tells readers to check the dashboard. Needs a runtime check; report to the product team.
2. Secret fields show a check mark even if the secret was not saved (same swallowed error), notably after **Use Keys**.
3. `minAndroidSdkVersion` is declared for Stripe (23) and flutter_blue_plus (21) but never applied. Product issue.
4. Google Pay is generated with `testEnv: true`; documented as "change it before you publish".

## revenuecat.md

Edits: reworded 3 passages (key prefixes, what the board and **Play** show, what stays after turning it off). No claim was wrong; page is about 480 words.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Settings** → **Integrations** → **RevenueCat**; **Enabled** adds `purchases_flutter` | ok | `packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart:12-17`, `dart_package.dart:165`, `project_settings.dart:39` | |
| Labels **Configuration**, **Apple API Key**, **Android API Key**, **Web API Key** | ok | `revenuecat_package_config.dart:23-45`, `package_config_settings.dart:101-105` | |
| Keys "start with `appl_`, `goog_`, `strp_`" | fixed | `revenuecat_package_config.dart:27, 35, 43` | Those are only the field hints (placeholders); RevenueCat web keys can have another prefix. Now "The field hints show the usual prefixes". |
| Enter / send icon (**Submit**) / check mark | ok | `nowa_fields.dart:1150-1263` | |
| App uses the key of the platform it runs on (iOS, Android, web) | ok | `revenuecat_package_config.dart:86-94` (generated `configureRevenuecat()`) | An empty constant is a non-null string, so a missing key is not skipped; the page only advises adding a key per platform. |
| On enable: generates `lib/integrations/revenuecat_service.dart` with `RevenuecatService` | ok | `revenuecat_package_config.dart:57-63, 72-114`, `generated_file.dart:62-70` (path used as is) | |
| On enable: adds `await RevenuecatService().configureRevenuecat();` to `main()` | ok | `revenuecat_package_config.dart:49-55`, `package_config_service.dart:124-126` | |
| Keys saved as constants in `lib/globals/app_constants.dart`, shown under **Constants** (**Settings** → **General**) | ok | `config_token.dart:122` (no `applyTo`: Dart-only), `app_constants_service.dart:13`, `constants_settings.dart:15-19` | |
| iOS minimum at least 14.0; Android `MainActivity` becomes `FlutterFragmentActivity` | ok | `revenuecat_package_config.dart:22, 64-70`, `package_config_service.dart:133-136, 267-269, 323-333`, `podfile_template.dart:12-13`, `main_activity_template.dart:28-30` | |
| Widget picker (Ctrl/Cmd + K) or **Widget** tool; search **RevenueCat Paywall** | ok | `packages/designer/lib/src/designer_setup.dart:48`, `designer_tools.dart:174-185`, `packages/designer/lib/src/actions/add_actions.dart:16`, `packages/core/lib/src/widgets/widget_picker.dart:131-146`, `widgets_to_add.dart:916-926` (entry listed in `widgetsToAdd`, `:109-110`) | Picker hint is "Search for a widget". |
| **Add Missing Dependencies** dialog, **Add**; paywall also needs `purchases_ui_flutter` | ok | `missing_dependency_dialog.dart:6, 47, 93, 109`, `revenuecat_package_config.dart:117-139` | |
| Board placeholder "RevenueCat Paywall" with "Run to preview"; **Play** shows "Run on a simulator/emulator or mobile device to preview" | ok | `integration_preview_view.dart:28-70`, `scope.dart:155-172`, `packages/designer/lib/src/play_mode/play_mode.dart:257` (Play runs in `RunMode.simulate`) | Reworded: "The board and **Play** show only placeholders ... To see the real paywall, run your app ...". Removed the broader claim that the real paywall appears "only" in a device or emulator run (the embedded web preview was not checked). |
| `fetchOfferings()` returns offerings or nothing on failure; `purchasePackage(...)` buys a package | ok | `revenuecat_package_config.dart:99-112` | |
| "Work with RevenueCat's own types ... ask Nowa AI or write the code yourself" | ok | `revenuecat_package_config.dart:99-112` (`Offerings?`, `PurchaseParams`) | Advice, not a product claim. `importPackageToNowa` may auto-load the package for Circuit (no custom library), not verified, so the page does not say Circuit cannot call it. |
| Turn **Enabled** off removes the package, the service file and the `main()` line | ok | `package_service.dart:331-340`, `package_config.dart:194-211`, `generated_file.dart:30-34`, `package_config_service.dart:146-170` | Added: keys stay in **Constants** (cleanup does not touch Dart-only tokens) and remove **RevenueCat Paywall** widgets first (advice). The `MainActivity` change stays too; not mentioned. |
| Front matter, no H1, headings sentence case, no `---` rules, 1 admonition, no hype words, links (`../code/custom-code.md`, `../test/devices.md`, `./constants.md` exist), capture placeholder well formed | ok | grep | `integrations-revenuecat-1` is in `captures/requests/W17.md`. |

Open issues (RevenueCat): none new. Note for the product team: nothing guards against a missing key; an empty constant is passed to `Purchases.configure`.
