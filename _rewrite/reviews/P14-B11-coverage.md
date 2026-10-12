# P14-B11 coverage: publish section

Batch pages: `docs/publish/` `index.md`, `web.md`, `android.md`, `ios.md`, `builds.md`, `download-code.md`.
Old pages: `deployment/ios-deploy.md`, `deployment/android-deploy.md`, `deployment/web-deploy.mdx` (from `redirects.md`
rows 61-65; `deployment/share.md` belongs to B12).

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Official URLs were read on 2026-10-12.
Third-party pages that WebFetch couldn't reach were read with curl through the proxy (Google Play Help, Codemagic,
Flutter); the text extracts are summarised in `P14-B11-notes.md`.

Status key: `covered` (page#section, already there before this pass) / `added` (page#section, added in this pass) /
`obsolete` (code ref) / `not useful` / `dev-only` / `for other page` (target). "covered + added" = the new page had
part of it and this pass added the rest.

## deployment/ios-deploy.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | "In this guide you will learn" list | not useful | | structure only |
| 2 | Intro: deploy to iOS devices and the App Store in a few steps | covered | ios.md intro | rewritten (R9) |
| 3 | Pre-req: create an Apple Account | added | ios.md#join-the-apple-developer-program | Apple Account with two-factor authentication, legal name: https://developer.apple.com/programs/enroll/ |
| 4 | Pre-req: enroll in the Apple Developer Program (price given) | covered + added | ios.md#join-the-apple-developer-program | fee mentioned without the amount (D3, D24); individual vs organization (D-U-N-S Number, website), **Start your enrollment**: same URL |
| 5 | Pre-req: set icon and package name in **Settings > Project Details** | covered | index.md#app-details; ios.md#before-you-start | current labels **Bundle Identifier**, **App Icon** (`packages/core/lib/src/settings/project_detail_settings.dart:142`, `app_icon_settings.dart:18`) |
| 6 | Icon: square, at least 1024 x 1024 px | added (corrected) | index.md#app-details (App Icon row) | Nowa rejects images over 1024 px (`packages/core/lib/src/settings/app_icon_manager.dart:170-171`), Apple's iOS icon is a 1024x1024 px square that the system rounds (https://developer.apple.com/design/human-interface-guidelines/app-icons). So: a square of exactly 1024 x 1024, no rounded corners, no transparency (Nowa doesn't remove transparency: `packages/launcher_icon/lib/src/ios.dart:68-79`, `config.dart:25`, not set in `app_icon_manager.dart:105-142`) |
| 7 | Package name format `com.yourcompany.yourappname`, unique across the App Store | covered + added | index.md#app-details (format, rules); ios.md#before-you-start (what a bundle ID is, can't change after the first upload) | regex `project_detail_settings.dart:122-123`; Apple: "You can't change this property after you upload a build" (https://developer.apple.com/help/app-store-connect/reference/app-information/app-information); Google: package names "unique and permanent" (https://support.google.com/googleplay/android-developer/answer/9859152) |
| 8 | Tip: keep a note app open for the bundle ID and API key details | added | ios.md#before-you-start | |
| 9 | What a Bundle Identifier is; must match Nowa exactly | covered + added | ios.md#before-you-start, ios.md#register-your-bundle-id | |
| 10 | Find the bundle ID in Nowa: **Settings > Project Details** | covered | index.md#app-details; ios.md#register-your-bundle-id step 1 | |
| 11 | Register it: Apple Developer account → **Certificates, IDs & Profiles** → **Identifiers** → **+** → **App IDs** → Continue → **App** → Continue | added | ios.md#register-your-bundle-id | Apple's current label is **Certificates, Identifiers & Profiles**; steps from https://developer.apple.com/help/account/identifiers/register-an-app-id (role: Account Holder or Admin) |
| 12 | **Bundle ID** = the package name in Nowa | added | ios.md#register-your-bundle-id | **Explicit App ID** (same Apple page) |
| 13 | **Description** ("visible on the App Store") | added (corrected) | ios.md#register-your-bundle-id | Apple only says "Enter a name or description for the App ID"; the claim that it shows on the App Store isn't supported, so not repeated |
| 14 | **Capabilities**: tick what the app uses (Sign in with Apple, Apple Pay) | added | ios.md#register-your-bundle-id | checkboxes, In-App Purchase on by default (register page); change later with **Edit** → **Save** (https://developer.apple.com/help/account/identifiers/enable-app-capabilities) |
| 15 | What App Store Connect is | added | ios.md#create-your-app-in-app-store-connect | |
| 16 | **My Apps** → **+** → **New App** | added (labels updated) | ios.md#create-your-app-in-app-store-connect | Apple: "In Apps, click the add button (+)... select New App" (https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app; role Account Holder, App Manager or Admin; Account Holder must have signed the latest agreement in **Business**) |
| 17 | Fields **Platforms**, **Name**, **Primary Language**, **Bundle ID**, **SKU** (can reuse the bundle ID, not visible), **User Access** | added | ios.md#create-your-app-in-app-store-connect | rules from the app-information reference (name 2-30 characters, SKU characters and not editable, bundle ID locked after the first build); **Limited Access** / **Full Access** from the add-a-new-app page |
| 18 | Click **Create** | added | same | |
| 19 | Why the API key: Nowa uploads on your behalf | covered + added | ios.md#create-an-app-store-connect-api-key | plus: it also lets Nowa create the signing files (`packages/core/lib/src/file_system/codemagic_file.dart:98-106,120-124`) |
| 20 | **Users and Access** → **Integrations** → Issuer ID → name → **Access** → **Generate** → **Download** → Key ID | added | ios.md#create-an-app-store-connect-api-key | Apple: https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api and https://developer.apple.com/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api (**Team Keys**, **Generate API Key**, first-time **Request Access**); Issuer ID "above the table of active keys" (https://docs.codemagic.io/yaml-code-signing/signing-ios/) |
| 21 | **Access** must be **Admin** or **App Manager** for Nowa | added | ios.md#create-an-app-store-connect-api-key | old Nowa docs; Codemagic (Nowa's build steps, `codemagic_file.dart`) recommends App Manager; team key, because individual keys "aren't able to use Provisioning endpoints" (Apple DocC page above) |
| 22 | Download the key once; if lost, make a new one and update Nowa | covered + added | ios.md#create-an-app-store-connect-api-key, ios.md#save-your-app-store-connect-credentials | Apple: download once, no copy kept; name/access can't be edited, revoke and generate again |
| 23 | Enter the API key in Nowa before building | covered | ios.md#save-your-app-store-connect-credentials | |
| 24 | You need an Apple Distribution Certificate: existing or generated | covered | ios.md#apple-distribution-certificate | |
| 25 | Path **Settings** → **Deployment** → **Mobile** tab → **iOS** → choose **Release** | obsolete | tabs **Android**, **iOS**, **Web** (`packages/core/lib/src/settings/deployment_settings.dart:123-125`); iOS has one release workflow (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:683-712`) | current path covered in ios.md |
| 26 | Upload an existing `.p12` key or let Nowa generate one | covered | ios.md#use-a-key-you-already-have, #let-nowa-generate-a-key | |
| 27 | **Key ID**, **Issuer ID**, **Private Key** (`.p8`, **Browse**), **Save** | covered | ios.md#save-your-app-store-connect-credentials | label **Private Key File** (`packages/core/lib/src/cloud_build_v2/ui/ios_details.dart:310-318`) |
| 28 | **Start New Build** → branch → **Build** | covered | ios.md#build-and-send-to-app-store-connect, builds.md#start-a-build | |
| 29 | Find the app in App Store Connect under **My Apps** after the build | covered + added | ios.md#after-the-upload | builds are on the app's **TestFlight** tab (https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata) |
| 30 | What the certificate is: proves the app comes from you and wasn't tampered with | added | ios.md#apple-distribution-certificate | Apple Code Signing Guide (https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html); "sensitive assets that confirm your identity" (https://developer.apple.com/support/certificates/) |
| 31 | One certificate can sign any of your apps (all Apple platforms) | added (iOS part) | ios.md#apple-distribution-certificate | "Distribution certificates belong to the team" (support/certificates); Nowa's own dialog: lose it and "you will not be able to sign other iOS apps" (`ios_details.dart:118-120`) |
| 32 | Nowa offers both choices | covered | ios.md#apple-distribution-certificate | |
| 33 | Usually made on a Mac with a certificate signing request (CSR) that creates the private key | added | ios.md#apple-distribution-certificate | one sentence; https://developer.apple.com/help/account/certificates/create-a-certificate-signing-request (Keychain Access) |
| 34 | Existing certificate: **Upload a key**, paste the private key text; Nowa pairs it with the matching certificate | obsolete (labels) + added (pairing) | current UI: **Certificate Private Key** + **Browse**, `.p12` filter, no paste field (`ios_details.dart:143-175`); pairing: `codemagic_file.dart:98-106` + Codemagic "if there isn't one that already matches this private key" (https://docs.codemagic.io/yaml-code-signing/alternative-code-signing-methods/) | added in ios.md#apple-distribution-certificate and #use-a-key-you-already-have; plus: a Keychain `.p12` can't be read (`packages/core/lib/src/file_system/encoding.dart:8-10` strict UTF-8, error state `ios_details.dart:67-72`, product issue P16) |
| 35 | **Generate a new key** creates a new certificate in your Apple account | added (clarified) | ios.md#let-nowa-generate-a-key | the certificate is created at the first signing, if none matches (`codemagic_file.dart:104`, Codemagic page above) |
| 36 | Download the generated key to reuse the certificate for other apps | covered + added | ios.md#let-nowa-generate-a-key, #use-a-key-you-already-have | `packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:442-464` (`ios_distribution_certificate_key.p12`) |
| 37 | Deleting the key in Nowa removes only Nowa's copy | covered | ios.md#manage-the-saved-key | `workflow_manager.dart:466-483` |
| 38 | Revoke the certificate: **Certificates** → select → **Revoke** | added | ios.md#manage-the-saved-key | https://developer.apple.com/help/account/certificates/revoke-a-certificate; effects from support/certificates |
| 39 | Warning: Apple's limit of three; generating at the limit fails signing | covered | ios.md#let-nowa-generate-a-key | `packages/core/lib/src/cloud_build_v2/ui/warning_dialogs.dart:45-51`; Apple publishes no number today, Codemagic says 3 (attributed to Nowa's warning) |
| 40 | Use one certificate for all your apps; several developers up to the limit, then share | added | ios.md#use-a-key-you-already-have | |
| 41 | Caution: updates signed with a different certificate are rejected | not useful (contradicted) | https://developer.apple.com/support/certificates/: apps on the store aren't affected; only uploads signed with an expired or revoked certificate are refused | replaced by the verified facts in ios.md#manage-the-saved-key and #use-a-key-you-already-have |
| 42 | Videos (bundle ID, create bundle ID, API key, start build) and GIF | not useful | | pure media of older Apple and Nowa UIs |

## deployment/android-deploy.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | "In this guide you will learn" list | not useful | | |
| 2 | Intro: deploy to Android devices and Google Play | covered | android.md intro | |
| 3 | Path **Settings** → **Deployment** → **Mobile** → **Android** → **Release**/**Debug** | obsolete (labels) | tabs (`deployment_settings.dart:123-125`) and **Debug mode** switch (`deployment_settings.dart:238-241`) | current path covered in android.md#test-on-a-device |
| 4 | Release builds: optimized, needed for Google Play, must be signed | covered + added | android.md#build-a-release | "optimized for fast startup, fast execution, and small package sizes" (https://docs.flutter.dev/testing/build-modes) |
| 5 | Debug builds: for testing, faster to build, can't go to Google Play | covered + added | android.md#test-on-a-device | debug workflow makes only an `.apk` (`codemagic_file.dart:13-32`), new apps upload app bundles (https://support.google.com/googleplay/android-developer/answer/9859348); "performance can be janky in debug mode" (Flutter build modes) |
| 6 | Sign the release: generate a key or use yours | covered | android.md#create-a-signing-key | |
| 7 | Warning: same key for all updates; lose it and you can't update | covered + added | android.md#create-a-signing-key (warning + Play App Signing note) | Nowa's dialog text (`packages/core/lib/src/cloud_build_v2/ui/android_signing_key_card.dart`, research `features-code-ship.md` Android builds); Google can reset a lost upload key (https://support.google.com/googleplay/android-developer/answer/9842756) |
| 8 | Generate: **Generate** → wait → green check → **Download** | covered | android.md#let-nowa-generate-a-key | |
| 9 | Warning: Nowa isn't responsible for a lost key; keep backups | covered | android.md#create-a-signing-key (warning) | |
| 10 | Existing key: **Key Alias**, **Key Password**, **Keystore Password**, **Browse** `.jks`, **Save** | covered | android.md#use-a-key-you-already-have | |
| 11 | Pick the branch to build from | covered | builds.md#start-a-build | |
| 12 | Nowa commits all uncommitted changes to that branch | covered | builds.md#start-a-build | |
| 13 | Click **Build** | covered | android.md#build-a-release | |
| 14 | Open **Latest Build** / **Active Build** to follow it | covered | builds.md#follow-a-build | |
| 15 | Click the `.apk` / `.aab` file name to download | covered | android.md#download-your-files | |
| 16 | APK vs AAB difference | covered + added | android.md#download-your-files | plain-words explanation; https://support.google.com/googleplay/android-developer/answer/9859152 ("Android App Bundles to generate and deliver APKs that are optimized for each device") |
| 17 | Upload and publish in Google Play Console | covered + added | android.md#set-up-google-play-console, #upload-to-google-play | walk-through added (brief): account (https://support.google.com/googleplay/android-developer/answer/6112435), **Create app** and store listing (answer/9859152), App content (answer/9859455), graphics (answer/9866151), testing rule (answer/14151465), release (answer/9859348), **Send for review** (answer/9859654) |
| 18 | Play Console changes often: check Google's docs | covered | android.md (links to Play Console Help kept) | |
| 19 | Screenshots of the old Mobile settings | not useful | | outdated UI |

## deployment/web-deploy.mdx

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | One-click publish since 2.0.17, no manual hosting | covered | web.md intro | |
| 2 | Two modes, **Development** and **Production** | obsolete | one environment only: `prodEnvManager` (`packages/core/lib/src/settings/cloud_build/web_build_settings.dart:57-62`) | web.md note keeps the explanation |
| 3 | Development link expires every 12 hours | obsolete | expiry now comes from the server and shows as **Expires In:** only when set (`packages/core/lib/src/web_deploy/web_deploy_widgets/environment_card.dart:66-71`) | covered: web.md#publish-your-app |
| 4 | Production: permanent link, custom domain | covered | web.md#publish-your-app, #use-your-own-domain | |
| 5 | Production only on Pro and Premium plans | not useful | D3; gate is the `webPreviewDeploys` entitlement (`web_build_settings.dart:21-32`) | covered by badges + pricing link |
| 6 | **Web Deploy** icon → panel → **Development** tab → **Publish** | obsolete (labels) | **Deploy** menu **Web** row (`lib/project/run/deploy_button.dart:351-366`), **Web** tab | covered: web.md#publish-your-app |
| 7 | Progress dots; **Build Failed** opens the error | obsolete (labels) | **Saving** / **Creating** / **Deploying**, **Analysis Failed** / **Publish Failed** / **Show Details** (research `features-code-ship.md` Web deployment) | covered: web.md#publish-your-app, #if-publishing-fails |
| 8 | Copy the link, **Open Link** icon, time left | covered | web.md#publish-your-app (**Open in browser**, **Copy**, **Expires In:**) | |
| 9 | First open may ask you to wait a few minutes while hosting is set up | not useful (can't verify) | no client text for it in 3.13 (`grep` of `packages/core/lib/src/web_deploy/`); hosting is server-side | open question in notes |
| 10 | Share the link with your team, early users and stakeholders for feedback | covered + added | web.md#publish-your-app | R9 sentence |
| 11 | Publish again to update the same link; no need to deactivate first | covered + added | web.md#update-your-site | |
| 12 | Deactivate the site | covered | web.md#take-your-site-down | |
| 13 | **Download Files** to host it yourself | covered | web.md#download-the-build-files | |
| 14 | Production steps (**Production** tab → **Publish**) | obsolete | see row 2 | |
| 15 | Production: link doesn't expire; custom domain | covered | web.md | |
| 16 | Custom domain: publish, then enter the domain in the settings | covered | web.md#use-your-own-domain | |
| 17 | Nowa generates DNS records (CNAME, TXT) | covered + added | web.md#use-your-own-domain | what DNS records are, in plain words; record types come from the server (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/dns_records.dart:83-101`), so no types named |
| 18 | Add the records at your domain provider; see its help | covered | web.md#use-your-own-domain | |
| 19 | DNS changes take time | covered | web.md#use-your-own-domain | "up to 48 hours" (`dns_records.dart:48`) |
| 20 | Note: create a CNAME pointing to the Nowa link | covered (generalized) | web.md#use-your-own-domain | the **DNS Records** page lists every record to add |
| 21 | Videos and panel screenshot | not useful | | old UI |

## Items added from the brief (no old-page row)

| Item | Status | Where / evidence |
|---|---|---|
| Google Play developer account: Personal / Organization, identity checks, one-time fee, device check | added | android.md#create-your-developer-account (answer/6112435) |
| New personal accounts: closed test, 12 testers, 14 days, **Apply for production** | added | android.md#test-with-testers-first (answer/14151465) |
| Store listing fields and graphics sizes | added | android.md#set-up-your-app (answer/9859152, answer/9866151) |
| Export compliance after upload (**Missing Compliance**) | added | ios.md#after-the-upload (https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-export-compliance-information-for-beta-builds/) |
| A pending custom domain can't be removed in Nowa (P17 still in 3.13) | added | web.md#use-your-own-domain (`custom_domain_section.dart:87-101`, `web_environment_manager.dart:64-66`) |

## Totals

| Old page | Items | covered | covered + added | added | obsolete | not useful | dev-only | for other page |
|---|---|---|---|---|---|---|---|---|
| ios-deploy.md | 42 | 11 | 7 | 20 | 1 (+ the old labels in #34) | 3 | 0 | 0 |
| android-deploy.md | 19 | 11 | 5 | 0 | 1 | 2 | 0 | 0 |
| web-deploy.mdx | 21 | 10 | 3 | 0 | 5 | 3 | 0 | 0 |
| **All** | **82** | **32** | **15** | **20** | **7** | **8** | **0** | **0** |

Items that brought information back from the old pages ("added" plus "covered + added"): 35. Row #34 counts once,
under "added". Plus 5 items from the brief (table above).
