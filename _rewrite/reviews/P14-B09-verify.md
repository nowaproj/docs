# P14-B09 verification log (verifier P14-B09-V)

Batch: `docs/integrations/firebase/` `connect.md`, `auth.md`, `firestore.md`, `notifications.md`; `docs/integrations/stripe.md`.
Product code: `/home/user/nowa-master` 3.13.0+1 (`3cb32031c`; the P66/P68/P156 fix commits are not ancestors of it).
Code refs are relative to that root. Third-party pages fetched 2026-10-12 with `curl -sL` through the session proxy.

## Summary

(in progress)

## Progress notes (written while verifying; the final tables follow)

- Read P14-VERIFY, P14-BRIEF, BRIEF, style guide, glossary, the three batch files, the five diffs, P13-verify rows for
  these pages and the platform-issue entries P31-P34, P48, P49, P66-P68, P82, P83, P151, P155-P158
  (`/home/user/nowa/docs/platform_issues/supabase_firebase_stripe.md`).
- Links: every relative link and `#fragment` on the five pages resolves (script); `generated-code.md` anchors used:
  `#firebase` only (stripe.md had none).
- Moved facts: 34/34 bullets in the for-code file are verbatim copies of `origin/main` text. 8/8 "Added (new,
  verified)" facts confirmed in code (refs in the table below).
- External pages fetched today: Firebase (android/setup#create-firebase-project, auth/flutter/password-auth,
  federated-auth, phone-auth, auth/ios/phone-auth, auth/web/google-signin, auth/android/google-signin,
  firestore/quickstart, firestore/editions, cloud-messaging/flutter/client), Apple (keys/create-a-private-key,
  keys/get-a-key-identifier, glossary/team-id, identifiers/enable-app-capabilities, capabilities/configure-apple-pay,
  capabilities/communicate-with-apns-using-authentication-tokens), Play Console Help 9842756, Stripe (keys, webhooks,
  event-destinations, workbench, google-pay, apple-pay?platform=ios, testing, currencies, get-started/account/activate,
  payments/accept-a-payment (mobile, markdown), changelog basil 2025-03-31 x2), Google Pay request-prod-access,
  firebase-ios-sdk `PhoneAuthProvider.swift` at tag 12.8.0 and main.

