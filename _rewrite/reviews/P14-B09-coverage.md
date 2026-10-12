# P14-B09 coverage: Firebase (connect, auth, Firestore, notifications) and Stripe

Old pages audited item by item against `docs/` (not `docs/new/`, not `docs/legacy/`), the code at
`/home/user/nowa-master` (3.13.0, `3cb32031c`) and the current official docs. Code refs are relative to
`/home/user/nowa-master`. URLs are the official pages fetched on 2026-10-12.

Status while working: rows marked "(planned)" are not on the page yet. This line is removed when every row is final.

## 1. `data-connections/firebase/firebase-connect.md` (V1 video page)

| item | status | where / evidence | note |
|---|---|---|---|
| Create a Firebase project (the video's first step, in the Firebase console) | added (planned) | `firebase/connect.md#create-a-firebase-project` | Nowa can't create projects (`packages/data/lib/src/firebase/setup/views/fb_projects.dart:41-63`); console steps from the official Firebase docs |
| Sign in to Firebase from Nowa; Nowa creates the apps and the config files | covered | `firebase/connect.md#connect-your-project` | Rewritten around what the reader sees; file list moved to the for-code file |
| Enable Firebase Authentication, in Firebase and in Nowa | covered (Nowa) / added (planned, console) | `firebase/auth.md` | Nowa side: `connected_main_screen.dart:106-150`. Console side ("Get started", **Sign-in method**) from the Firebase docs |
| Enable the Email/Password and Google providers | covered (Nowa) / added (planned, console) | `firebase/auth.md` | Nowa: `auth_management_view.dart:21-159` |
| Add SHA fingerprints for Google sign-in on Android | covered | `firebase/auth.md#sha-fingerprints` | Explained in plain words; Play App Signing key added (planned) |
| Note: made with Nowa V1, may differ | not useful | | Caveat about an outdated video |
| Questions: Discord, community, team@nowa.dev | covered | `account/help.md#join-the-community-and-contact-us` | |
| YouTube video (V1 UI) | not useful | | Pure media, old UI |

## 2. `data-connections/firebase/firebase-email-auth.md` (V1 video page)

| item | status | where / evidence | note |
|---|---|---|---|
| Build sign-up | covered / added (planned, walk-through) | `firebase/auth.md` | Function `signUpWithEmailAndPassword` (`packages/data/lib/src/firebase/auth/fb_auth_blocks.dart`); a screen-by-screen flow is added |
| Build sign-in | covered / added (planned, walk-through) | `firebase/auth.md` | `signInWithEmailAndPassword` |
| Verify email | covered / added (planned, in the walk-through) | `firebase/auth.md` | `sendVerificationEmail` |
| Reset password ("Forgot password?") | covered / added (planned, in the walk-through) | `firebase/auth.md` | `sendPasswordResetEmail` |
| Send signed-in users straight to the home page (skip the login page) | covered | `firebase/auth.md` (Redirect Logic), `logic/router.md#start-on-login-or-home` | |
| Connect GitHub and commit changes | covered | `code/github.md` | |
| Test on a real simulator | covered | `test/devices.md`, `firebase/auth.md#test-sign-in-in-nowa` | |
| View the generated code of a screen | covered | `code/code-mode.md` | |
| Community site link | covered | `account/help.md` | |
| Note: made with Nowa V1 | not useful | | |
| YouTube video (V1 UI) | not useful | | Pure media |

## 3. `data-connections/firebase/firestore.md` (V1 video page)

| item | status | where / evidence | note |
|---|---|---|---|
| Example: an e-commerce app that sells shoes | covered | `firebase/firestore.md` (`products`, `productsByPrice`, the test image with Running Shoes) | |
| Display data from the database | covered | `firebase/firestore.md#use-a-query-in-your-app`, `integrations/show-data.md` | |
| Advanced queries | covered | `firebase/firestore.md#build-a-query` (`where`, `orderBy`, `count`) | |
| Stream data that updates live | covered | `firebase/firestore.md#build-a-query` (`snapshots`) | |
| Add data to the database | covered, no-code path added (planned) | `firebase/firestore.md#add-collections-and-queries` | 3.13: `add` and `doc` can't be built (P156); Nowa AI path leads |
| Create the Cloud Firestore database (implied by the tutorial; brief) | added (planned) | `firebase/firestore.md` | Nowa doesn't create it; console steps from the official docs |
| Community link | covered | `account/help.md` | |
| Note: made with Nowa V1 | not useful | | |
| YouTube video (V1 UI) | not useful | | Pure media |

## 4. `data-connections/firebase/notification.md`

| item | status | where / evidence | note |
|---|---|---|---|
| What FCM is: updates, reminders and alerts that reach people even when they're not using the app, on all their devices | covered | `firebase/notifications.md` intro | Rewritten with examples (R9) |
| Enable: Settings, Firebase, Push Notifications | covered | `firebase/notifications.md#turn-on-push-notifications` | |
| Video 1 (enabling) | not useful | | Pure media |
| iOS: add the Push Notifications capability in Xcode (Signing & Capabilities) | covered | `firebase/notifications.md` | In-app text `packages/data/lib/src/firebase/setup/views/notification_settings.dart:96-100`; no-code path and Apple/Firebase key steps added (planned) |
| Rebuild the app for iOS and Android | covered | `firebase/notifications.md` (run or publish again) | |
| Links to the iOS and Android deploy guides | covered | `publish/ios.md`, `publish/android.md` | |
| Test: title, content, audience, sound, Send | covered | `firebase/notifications.md#send-a-test-notification` | |
| Video 2 (testing) | not useful | | Pure media |
| How a notification looks, iOS and Android examples | covered | `firebase/notifications.md#what-a-notification-looks-like` | Same two images |
| Apple push (APNs) key in Apple Developer, uploaded to Firebase (brief) | added (planned) | `firebase/notifications.md` | Official Apple and Firebase steps |

## 5. `payments/stripe/stripe-integration.md`

| item | status | where / evidence | note |
|---|---|---|---|
| Intro: take payments with Stripe without deep technical knowledge | covered | `stripe.md` intro | |
| YouTube video (Nowa 3.7) | not useful | | Pure media, old UI |
| Stripe works only with a Supabase backend | covered | `stripe.md#before-you-start` | |
| Supabase MCP must be enabled to deploy | obsolete | `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:20,224-251` | Deploy uses the Supabase authorization from **Connect**, not the MCP connector |
| Step 1: Settings → Stripe → turn it on | covered | `stripe.md#turn-on-stripe-and-add-your-keys` | Label **Enabled** |
| Merchant Name, Country Code, Publishable Key | covered | same | |
| Where to find the publishable key; `pk_test_` vs `pk_live_` | added (planned) | `stripe.md` | Stripe docs (keys) |
| The publishable key is safe to put in your app | added (planned) | `stripe.md` | Stripe docs (keys) |
| Purchase types with examples | covered | `stripe.md` purchase type table | Examples enriched (R9) |
| Start with one type, add more later; redeploy keeps existing tables | covered | `stripe.md#deploy-the-configuration` | |
| Secret key: where to find it, `sk_` | covered (field) / added (planned, where) | `stripe.md` | |
| Webhook: copy **Webhook URL** in Nowa | covered | `stripe.md` | |
| Stripe Dashboard: create the webhook destination step by step | added (planned) | `stripe.md` | Stripe docs (webhooks) |
| The 9 events | covered (corrected) | `stripe.md` events table | The webhook handles 7 (`stripe_edge_functions.dart:803-835`); `payment_intent.canceled` and `payment_intent.processing` aren't used |
| `customer.subscription` events only for Subscription | covered | `stripe.md` events table | |
| Destination type, name, Endpoint URL, Create destination | added (planned) | `stripe.md` | Stripe docs |
| Signing secret: Reveal, copy, paste into Webhook Secret | covered / added (planned, Reveal) | `stripe.md` | |
| Payment methods: Google Pay, Apple Pay, both or neither; cards work without setup | covered | `stripe.md#choose-payment-methods` | |
| Google Pay: turn on in Nowa and enable in Stripe | covered (Nowa) / added (planned, Stripe steps) | `stripe.md` | Stripe docs (Google Pay) |
| Apple Pay: turn on in Nowa and enable in Stripe | covered (Nowa) / added (planned, Stripe steps) | `stripe.md` | Stripe docs (Apple Pay) |
| Create an Apple Merchant ID and paste it in Nowa | added (planned, steps) | `stripe.md` | Apple and Stripe docs; Nowa label **Apple Merchant ID** |
| Payment Processing Certificate with a CSR from Stripe, `apple_pay.cer` back to Stripe | added (planned) | `stripe.md` | Stripe docs (Apple Pay, iOS) |
| The certificate exchange is one-time | (planned, verify) | | Apple certificates expire; check the official wording |
| Business Table: id, name, price, type columns | covered (ID and price) / obsolete (name, type) | `packages/core/lib/src/integrations/stripe/stripe_settings.dart:344-455` | Nowa maps only ID, amount and currency |
| `type` column to tell purchase types apart | obsolete | same | The purchase type is picked by the function you call |
| Several currencies: a currency column | covered | `stripe.md#connect-your-table` (**From Column**) | |
| Map ID Field, Amount Field, Currency | covered | `stripe.md#connect-your-table` | |
| Three-letter currency codes (USD, EUR, AED); **Fixed Value** when all items share one | added (planned) | `stripe.md#connect-your-table` | |
| Deploy Configuration creates tables, payment functions and the webhook handler | covered | `stripe.md#deploy-the-configuration` | |
| Supabase tables screenshot | covered | `stripe.md` (same image) | |
| Deploying takes a moment; tables appear in Supabase | covered | `stripe.md#deploy-the-configuration` | |
| Stripe is live; add products and make them purchasable | covered | `stripe.md#take-a-payment-from-a-button` | |
| "You're all set" | not useful | | Filler |
| Troubleshooting: check the Supabase MCP | obsolete | as above | |
| Troubleshooting: keys copied with no extra spaces | added (planned) | `stripe.md#fix-common-problems` | Values are saved as typed: `stripe_settings.dart:476-516`, `stripe_supabase_service.dart:299-312` |
| Support team is there to help | covered | `account/help.md` | |

## Totals

(Filled in when the batch is done.)
