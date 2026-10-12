# P14-B09 coverage: Firebase (connect, auth, Firestore, notifications) and Stripe

Old pages audited item by item against `docs/` (not `docs/new/`, not `docs/legacy/`), the code at
`/home/user/nowa-master` (3.13.0, `3cb32031c`) and the current official docs (fetched 2026-10-12). Code refs are relative
to `/home/user/nowa-master`. Full quotes and URLs for every added item are in `P14-B09-notes.md`.

The four Firebase pages were V1 video pages: one or two paragraphs listing what the video teaches, a "made with Nowa V1"
note and an embedded YouTube video. Each listed topic is an item below. The Stripe page was a full walk-through.

## 1. `data-connections/firebase/firebase-connect.md` (V1 video page)

| item | status | where / evidence | note |
|---|---|---|---|
| Create a Firebase project (the video's first step, in the Firebase console) | added | `firebase/connect.md#create-a-firebase-project` | Nowa can't create projects (`packages/data/lib/src/firebase/setup/views/fb_projects.dart:41-63`); steps from https://firebase.google.com/docs/android/setup#create-firebase-project |
| Sign in to Firebase from Nowa; Nowa creates the apps and the config files | covered | `firebase/connect.md#connect-your-project`, `#what-connecting-sets-up` | Rewritten around what the reader sees; file list moved to the for-code file |
| Enable Firebase Authentication, in Firebase and in Nowa | covered (Nowa) / added (console) | `firebase/auth.md#turn-on-sign-in-methods-in-the-firebase-console`, `#turn-on-authentication-and-add-providers` | Console: **Security** → **Authentication** → **Sign-in method** (Firebase password-auth, federated-auth, phone-auth pages) |
| Enable the Email/Password and Google providers | covered (Nowa) / added (console) | same | Nowa: `packages/data/lib/src/firebase/setup/views/auth_management_view.dart:21-159` |
| Add SHA fingerprints for Google sign-in on Android | covered, expanded | `firebase/auth.md#sha-fingerprints` | Plain explanation of what they are and why; Play App Signing key (Play Console Help, answer 9842756); terminal step labelled; no-terminal alternative |
| Note: made with Nowa V1, may differ | not useful | | Caveat about an outdated video |
| Questions: Discord, community, team@nowa.dev | covered | `account/help.md#join-the-community-and-contact-us` | |
| YouTube video (V1 UI) | not useful | | Pure media, old UI |

## 2. `data-connections/firebase/firebase-email-auth.md` (V1 video page)

| item | status | where / evidence | note |
|---|---|---|---|
| Build sign-up | covered + added (walk-through) | `firebase/auth.md#build-an-email-sign-in-flow` | `signUpWithEmailAndPassword` (`packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:182-203`); signs the user in (Firebase password-auth page) |
| Build sign-in | covered + added (walk-through) | same | `signInWithEmailAndPassword` |
| Verify email | covered + added (in the walk-through) | same | `sendVerificationEmail` (`fb_auth_blocks.dart:326-344`) |
| Reset password ("Forgot password?") | covered + added (in the walk-through) | same | `sendPasswordResetEmail` (`fb_auth_blocks.dart:346-361`) |
| Send signed-in users straight to the home page (skip the login page) | covered | `firebase/auth.md#use-the-functions-in-your-screens` (Redirect Logic), `logic/router.md#start-on-login-or-home` | |
| Connect GitHub and commit changes | covered | `code/github.md` | |
| Test on a real simulator | covered | `test/devices.md`, `firebase/auth.md#test-sign-in-in-nowa` | |
| View the generated code of a screen | covered | `code/code-mode.md` | |
| Community site link | covered | `account/help.md` | |
| Note: made with Nowa V1 | not useful | | |
| YouTube video (V1 UI) | not useful | | Pure media |

## 3. `data-connections/firebase/firestore.md` (V1 video page)

| item | status | where / evidence | note |
|---|---|---|---|
| Example: an e-commerce app that sells shoes | covered | `firebase/firestore.md` (shop example in the intro, `products`/`productsByPrice` and the test image with Running Shoes) | |
| Display data from the database | covered | `firebase/firestore.md#use-a-query-in-your-app`, `integrations/show-data.md` | Now links "Show a list" |
| Advanced queries | covered | `firebase/firestore.md#build-a-query` (`where`, `orderBy`, `count`) | |
| Stream data that updates live | covered | `firebase/firestore.md#build-a-query` (`snapshots`) | |
| Add data to the database | covered, no-code path added | `firebase/firestore.md#add-collections-and-queries` | 3.13: `add` and `doc` can't be built (P156); Nowa AI path leads, with the P156 fix as a prompt |
| Create the Cloud Firestore database (implied by the tutorial; brief) | added | `firebase/firestore.md#create-your-firestore-database` | https://firebase.google.com/docs/firestore/quickstart#create; test vs production mode and rules explained |
| Community link | covered | `account/help.md` | |
| Note: made with Nowa V1 | not useful | | |
| YouTube video (V1 UI) | not useful | | Pure media |

## 4. `data-connections/firebase/notification.md`

| item | status | where / evidence | note |
|---|---|---|---|
| What FCM is: updates, reminders and alerts that reach people even when they're not using the app, on all their devices | covered | `firebase/notifications.md` intro | Rewritten with examples (R9) |
| Enable: Settings, Firebase, Push Notifications | covered | `firebase/notifications.md#turn-on-push-notifications` | |
| Video 1 (enabling) | not useful | | Pure media |
| iOS: add the Push Notifications capability in Xcode (Signing & Capabilities) | covered, expanded | `firebase/notifications.md#set-up-notifications-for-iphone` | In-app text `packages/data/lib/src/firebase/setup/views/notification_settings.dart:98`; no-code path (Nowa AI) added; link to `publish/ios.md#register-your-bundle-id` (routed from B11) |
| Rebuild the app for iOS and Android | covered | `firebase/notifications.md#turn-on-push-notifications` step 4 | |
| Links to the iOS and Android deploy guides | covered | `publish/ios.md`, `publish/android.md` | |
| Test: title, content, audience, sound, Send | covered | `firebase/notifications.md#send-a-test-notification` | |
| Video 2 (testing) | not useful | | Pure media |
| How a notification looks, iOS and Android examples | covered | `firebase/notifications.md#what-a-notification-looks-like` | Same two images |
| Apple push (APNs) key in Apple Developer, uploaded to Firebase; App ID capability (brief) | added | `firebase/notifications.md#set-up-notifications-for-iphone` | Apple: create-a-private-key, get-a-key-identifier, team-id glossary, enable-app-capabilities; Firebase: cloud-messaging/flutter/client#upload-authentication-key |

## 5. `payments/stripe/stripe-integration.md`

| item | status | where / evidence | note |
|---|---|---|---|
| Intro: take payments with Stripe without deep technical knowledge | covered | `stripe.md` intro | |
| YouTube video (Nowa 3.7) | not useful | | Pure media, old UI |
| Stripe works only with a Supabase backend | covered | `stripe.md#before-you-start` | |
| Supabase MCP must be enabled to deploy | obsolete | `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:20,224-251` | Deploy uses the Supabase authorization from **Connect**, not the MCP connector |
| Step 1: Settings → Stripe → turn it on | covered | `stripe.md#turn-on-stripe-and-add-your-keys` | Label **Enabled** |
| Merchant Name, Country Code, Publishable Key | covered | same | |
| Where to find the publishable key; `pk_test_` vs `pk_live_` | added | `stripe.md#get-your-stripe-keys` | https://docs.stripe.com/keys (API keys page, sandbox vs live) |
| The publishable key is safe to put in your app | added | `stripe.md#get-your-stripe-keys` | Stripe: publishable keys "Safe to expose" |
| Purchase types with examples | covered, examples added | `stripe.md` purchase type table | Old examples (premium unlock, ebook, extra lives, fitness plan) |
| Start with one type, add more later; redeploy keeps existing tables | covered | `stripe.md#turn-on-stripe-and-add-your-keys`, `#deploy-the-configuration` | `CREATE TABLE IF NOT EXISTS` (`stripe_edge_functions.dart:171,349,574`) |
| Secret key: where to find it, `sk_` | covered (field) / added (where) | `stripe.md#get-your-stripe-keys` | |
| Webhook: copy **Webhook URL** in Nowa | covered | `stripe.md#add-your-secret-key-and-webhook` | |
| Stripe Dashboard: create the webhook destination step by step | added | `stripe.md#add-your-secret-key-and-webhook` | https://docs.stripe.com/webhooks#create-webhook-endpoint (Workbench → Webhooks → Create an event destination; **Snapshot** required by Nowa's webhook) |
| The 9 events | covered (corrected) | `stripe.md` events table | The webhook handles 7 (`stripe_edge_functions.dart:803-835`); `payment_intent.canceled` and `.processing` aren't used |
| `customer.subscription` events only for Subscription | covered | `stripe.md` events table | |
| Destination type, name, Endpoint URL, Create destination | added | `stripe.md#add-your-secret-key-and-webhook` | Stripe webhooks page |
| Signing secret: Reveal, copy, paste into Webhook Secret | added (Reveal) / covered | same | **Reveal secret** (Stripe webhooks page) |
| Payment methods: Google Pay, Apple Pay, both or neither; cards work without setup | covered | `stripe.md#choose-payment-methods` | |
| Google Pay: turn on in Nowa and enable in Stripe | covered (Nowa) / added (Stripe settings link) | `stripe.md#choose-payment-methods` | Payment methods settings (`automatic_payment_methods`, `stripe_edge_functions.dart:123-132,301-310`; Stripe accept-payment-embedded page). Old Dashboard path not confirmed, so linked instead |
| Apple Pay: turn on in Nowa and enable in Stripe | covered (Nowa) / added (Stripe settings link) | same | |
| Create an Apple Merchant ID and paste it in Nowa | added | `stripe.md#choose-payment-methods` | Apple configure-apple-pay page; Nowa label **Apple Merchant ID**, hint `merchant.com.example.yourapp` (`stripe_settings.dart:322-328`) |
| Payment Processing Certificate with a CSR from Stripe, `.cer` back to Stripe | added | same | Apple configure-apple-pay; Stripe apple-pay?platform=ios |
| The certificate exchange is one-time | added (corrected) | same | Apple: "The payment processing certificate expires every 25 months"; Stripe: one CSR per certificate, new CSR when the merchant ID changes |
| Business Table: id, name, price, type columns | covered (ID and price) / obsolete (name, type) | `packages/core/lib/src/integrations/stripe/stripe_settings.dart:344-455` | Nowa maps only ID, amount and currency |
| `type` column to tell purchase types apart | obsolete | same | The purchase type is picked by the method you call |
| Several currencies: a currency column | covered | `stripe.md#connect-your-table` (**From Column**) | |
| Map ID Field, Amount Field, Currency | covered | `stripe.md#connect-your-table` | |
| Three-letter currency codes (USD, EUR, AED); **Fixed Value** when all items share one | added | `stripe.md#connect-your-table` | |
| Deploy Configuration creates tables, payment functions and the webhook handler | covered | `stripe.md#deploy-the-configuration` | |
| Supabase tables screenshot | covered | `stripe.md` (same image) | |
| Deploying takes a moment; tables appear in Supabase | covered | `stripe.md#deploy-the-configuration` | |
| Stripe is live; add products and make them purchasable | covered | `stripe.md#take-a-payment-from-a-button`, `#go-live` | "Go live" added: live keys, live webhook, republish |
| "You're all set" | not useful | | Filler |
| Troubleshooting: check the Supabase MCP | obsolete | as above | |
| Troubleshooting: keys copied with no extra spaces | added | `stripe.md#fix-common-problems` | Values are saved as typed: `stripe_settings.dart:476-516`, `stripe_supabase_service.dart:244-251,299-312` |
| Support team is there to help | covered | `account/help.md` | |

## Totals

| status | count |
|---|---|
| covered (incl. covered and expanded or corrected) | 36 |
| added | 24 |
| obsolete (incl. the partly obsolete Business Table row) | 4 |
| not useful | 10 |
| dev-only | 0 |
| for other page | 0 |
| **items** | **74** |

Counting rule: each row counts once. A row that mixes "covered" and "added" counts as added, because something new went
on the page: 13 rows are fully new, 11 extend a covered item (console steps, walk-throughs, Stripe Dashboard links). The
"covered (ID and price) / obsolete (name, type)" row counts as obsolete.
