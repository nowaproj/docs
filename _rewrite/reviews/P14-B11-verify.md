# P14-B11 verify log (verifier P14-B11-V)

Batch: `docs/publish/` `index.md`, `web.md`, `android.md`, `ios.md`, `builds.md`, `download-code.md`.
Diff checked: `git -C /home/user/docs diff origin/main -- docs/publish/` (writer commit `79d2705`).
Code: `/home/user/nowa-master` (3.13.0). Code refs are relative to it. Official pages read on 2026-10-12.

## Summary

- Pages checked: 6 (all `+` and `-` lines of the diff, plus the audience rules on every page).
- Claims checked: about 110, in the tables below (Apple and Google steps against their current help pages, every
  Nowa step against the code, Codemagic's CLI source for what Nowa's signing step really does).
- Fixed: 11. Removed: 1. Facts restored: 3. Audience fixes: 2. Tightened: 3 repeats.
- Most serious: (1) the P16 workaround left the reader stuck, because after a failed `.p12` upload the card replaces
  **Generate** with a refresh icon; the page now says so and puts the no-code path first. (2) Two iOS troubleshooting
  bullets named causes the signing step doesn't have (a revoked certificate, a missing App ID: with `--create` Nowa's
  build re-creates both); one removed, one rewritten. (3) The three-certificate limit and "Admin or App Manager" were
  stated as fact; now attributed to Nowa's warning and Nowa's recommendation, with Apple's "only the Account Holder or
  Admin can create distribution certificates" as the fallback. (4) web.md said the domain and **Also www.** switch lock
  only after verification; the code locks them as soon as **Set** turns into **DNS**. (5) Google now gives new apps
  three app signing keys, so android.md says to add each fingerprint. (6) P8 (iOS **Set up** opens the Android tab) is
  still in 3.13.0; workaround added.
- Open issues: 6 (end of this file). The main one: `generated-code.md#publishing` is still empty, but `ios.md` links
  there for the Mac key export steps.

## ios.md

Sources read: Apple pages via curl + text extraction (WebFetch for the API page), Apple DocC JSON for API keys,
Codemagic docs and the `codemagic-cli-tools` source for what Nowa's build script (`app-store-connect fetch-signing-files
"$BUNDLE_ID" --type IOS_APP_STORE --create`, `packages/core/lib/src/file_system/codemagic_file.dart:98-106`) does.

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro "give Nowa two keys from your Apple account" | fixed | `ios_details.dart:104-128` (Generate) | the certificate key can come from Nowa; now "an API key from Apple and a certificate key, which Nowa can generate for you" |
| Enrollment: Apple Account, 2FA, legal name (alias/nickname/company name delays), **Start your enrollment**, individual/organization, D-U-N-S, public website on own domain, License Agreement + purchase, yearly fee (no amount) | ok | https://developer.apple.com/programs/enroll/ | |
| Register App ID: role Account Holder or Admin; **Certificates, Identifiers & Profiles** → **Identifiers** → **+** → **App IDs** → **Continue** → type → **Continue** → **Description** → **Explicit App ID** / **Bundle ID** → capabilities (In-App Purchase on by default) → **Continue** → **Register** | ok | https://developer.apple.com/help/account/identifiers/register-an-app-id | Apple's current label is "Certificates, Identifiers & Profiles" (old "IDs" label not used) |
| Intro "before you can create your app or sign it" | fixed | Codemagic `fetch_signing_files_action.py:114-134` (`--create` creates a missing bundle ID) | signing doesn't need it registered; App Store Connect's New App does. Now "before you can create your app in App Store Connect"; "once per app" |
| Capabilities later: select App ID → **Edit** → **Save** | ok | https://developer.apple.com/help/account/identifiers/enable-app-capabilities | |
| New App: role Account Holder, App Manager or Admin; Account Holder signs latest agreement in **Business**; **Apps** → **+** → **New App**; **User Access** **Limited Access** / **Full Access**; **Create**, messages for missing info | ok | https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app | |
| Field rules (Name 2-30, editable until review; Primary Language any time; Bundle ID locked after a build upload; SKU hidden, fixed) | ok | https://developer.apple.com/help/app-store-connect/reference/app-information/app-information | |
| API key: Request Access (Account Holder, checkbox, **Submit**, case by case); team key role Account Holder or Admin; **Team Keys** → **Generate API Key** / **+**; name for reference; **Access**; **Generate**; name and access can't be edited (revoke, generate new); revoke **Edit** → select → **Revoke Key** → **Revoke** | ok (one tweak) | https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api | "generate a new key" now "revoke the key and generate a new one", as Apple says; dropped a repeat of "use it for all your apps" |
| **Download API Key** once, Apple keeps no copy; individual keys can't use Provisioning endpoints | ok | DocC JSON `creating-api-keys-for-app-store-connect-api` | |
| Issuer ID "above the list of keys" | ok (weak) | Codemagic signing-ios page ("Issuer ID above the table of active keys"); Apple only says it's on the API Keys page | kept: helps the reader find it |
| **Access** "Nowa needs **Admin** or **App Manager**" | fixed (reworded) | old Nowa docs; Codemagic "We recommend choosing App Manager"; Apple Certificates overview: "Only the Account Holder or Admin role can create distribution certificates"; Apple roles table: App Manager can create distribution certificates only with Certificates, Identifiers & Profiles access granted | now "Nowa recommends one of these"; troubleshooting adds the Apple-backed **Admin** fallback when Nowa has to create the certificate |
| **Save your App Store Connect credentials** labels, hover messages, pencil (**Change credentials**), X (**Discard changes**), "same pencil swaps in a new API key" | ok | `ios_details.dart:242-341`, `workflow_manager.dart:485-520` | Bundle Identifier saved as `BUNDLE_ID` (`:495-501`) |
| Certificate = digital signature, team-owned, can sign all your apps | ok | https://developer.apple.com/support/certificates/ ("Distribution certificates belong to the team") | |
| Nowa finds the certificate matching the key or creates one during the build | ok | `codemagic_file.dart:104`; `fetch_signing_files_action.py:136-163` (lists certificates matching the key, creates one with that key if none) | generated key is server-side (`cloud_build_service_impl.dart:163-168`), no Apple call in the client |
| Three-certificate warning, "It explains that Apple allows only three ... Reusing is best ... revoke first (this breaks any builds ...)" | fixed | `warning_dialogs.dart:45-51` (exact text: "Apple Developer Account only allows 3 active certificates at a time. If you have used 3 unique certificates before, this build will fail. It's recommended to reuse ..."); Apple publishes no number (Certificates overview, roles page) | now attributed to the warning ("It says Apple allows three ..."); the revoke advice points to the revoke steps and Apple's own description of what revoking affects, instead of repeating "breaks any builds" |
| Download dialog text, file `ios_distribution_certificate_key.p12` | ok | `ios_details.dart:115-128`, `workflow_manager.dart:442-464` | |
| Duplicate paragraph "Nowa creates the matching certificate ... the first time it signs" | tightened | same as above | kept one sentence: the certificate appears under **Certificates** after the first build |
| P16: a Keychain `.p12` can't be read, card shows **Failed to load or save certificate info** | fixed + restored step | `encoding.dart:8-10` (strict `utf8.decode`), `workflow_manager.dart:418-440` (error state, rethrow), `ios_details.dart:67-72,92-139` (error icon; in the error state **Generate** is replaced by a refresh icon that calls `loadVariables`), `android_signing_key_card.dart:302-327` (messages show on hover) | the reader couldn't find **Generate** after the failure: added "red error icon (hover to read ...) and a refresh icon where **Generate** was. Click the refresh icon ..., then let Nowa generate a key". No-code path now comes first (R5), command-line route second |
| Link "explains how to export its key as text" to `../code/generated-code.md#publishing` | ok, depends on orchestrator | `#publishing` is still an empty stub; the steps are the first "new" fact in `P14-B11-for-code.md` (Codemagic's Keychain + `openssl` steps, checked) | open issue 1 |
| **Manage the saved key**: check mark, **Download Certificate**, **Remove** → "Are you sure?" (**No** / **Yes**), Nowa's copy only | ok | `ios_details.dart:79-103`, `remove_button_with_confirmation.dart:30-59`, `workflow_manager.dart:466-483` | |
| Revoke: role Account Holder or Admin; **Certificates** → select → **Revoke** → **Revoke** | ok | https://developer.apple.com/help/account/certificates/revoke-a-certificate | |
| After revoking: store apps unaffected; no new uploads signed with it; unsubmitted uploads may be Invalid Binary | ok | https://developer.apple.com/support/certificates/ ("iOS Distribution Certificate (App Store)") | |
| **Share one certificate** H3 (new this pass) | tightened (merged) | old `deployment/ios-deploy.md` warning box | its first sentence repeated "Use a key you already have"; the several-people rule moved there, H3 removed (no inbound links: new heading) |
| Build steps, `.ipa` explained, **Artifacts**, already uploaded, button off until all saved | ok | `codemagic_file.dart:111-124`, `workflow_manager.dart:393-402` | |
| **Deploy** menu iOS row "shows **Set up**" | restored workaround | `lib/project/run/deploy_button.dart:286` (`_openSettings` with no tab → default **Android**, `:220`); P8 still in 3.13 | added: **Set up** opens the **Android** tab, switch to **iOS** |
| "Apple tells your uploads apart by the build number" | ok | https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds ("The build string is used to uniquely identify the build") | |
| After upload: processing email, **TestFlight** tab, **Missing Compliance**, **Provide Export Compliance Information** → answer → **Save** | ok | https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata; https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-export-compliance-information-for-beta-builds/ | |
| Troubleshooting "three certificates" | fixed | as above | "Nowa's warning puts it at three"; links to the revoke steps |
| Troubleshooting "A revoked certificate ... remove the key and generate a new one" | removed | `fetch_signing_files_action.py:136-163`: with `--create` a key whose certificate was revoked gets a new certificate (unless at the limit); Nowa's warning only says revoking breaks builds signed with it | not a verifiable cause of a failed signing step |
| Troubleshooting "The API key's access. It must be Admin or App Manager" | fixed | see **Access** row | team key + recommended access + **Admin** fallback (Apple quote) + new key via the pencil |
| Troubleshooting "The bundle ID must match an App ID in your developer account" | fixed | `fetch_signing_files_action.py:127-130` (missing App ID is created, not an error); `workflow_manager.dart:495-501` + `codemagic_file.dart:104` (signing uses the saved `BUNDLE_ID`) | now: Nowa signs for the identifier saved with the credentials; re-save after changing it |
| Store rules: `openUrl` not explained (R3) | fixed | `docs/logic/actions.md#open-a-link` | "which opens a web address" |
| Removed `-` lines (old intro, three linked bullets, "Nowa recommends reusing", "To remove the certificate itself, revoke it") | ok | | all still on the page in fuller form |

Audience: no code-only facts on the page (file names shown are files the reader downloads; `.p8`, `.p12`, `.ipa` explained).
Length: about 2,950 words with URLs (`wc -w`), roughly the same as before (P16, P8 and the Admin fallback added; the
merged H3, two duplicate sentences and the revoked-certificate bullet removed). The writer's split proposal (move
**Set up your Apple account** to its own page) still applies; not split here.

## android.md

Sources: Google Play Console Help pages fetched with curl (`?hl=en`) and extracted to text: answer/6112435, 9859152,
9859455, 9866151, 14151465, 9859348, 9859654, 9842756, 9845334, 13634885.

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Path list, **Before you start**, package name "can never change or be used again" | ok | answer/9859152 ("Package names ... unique and permanent ... can't be deleted or re-used") | |
| **Debug mode** note text, debug build = `.apk` only, unsigned, not for the store, not optimized | ok | `deployment_settings.dart:238-241`; `codemagic_file.dart:13-32`; Flutter build modes (writer's quote) | |
| Signing key: keystore `.jks`/`.keystore`, **Signing Key** card labels, **Generate** → **Important!** → **Download**, `android_signing_key.zip` with `keystore.jks` + `key_info.txt`, **Keystore Password** / **Key Alias** / **Key Password** / **Key File** / **Browse** / **Save**, **Remove** → "Are you sure?" | ok | `android_signing_key_card.dart:55-280`, `workflow_manager.dart:337-355`, `file_picker_field.dart:77` | |
| Play App Signing on by default for new apps; Google holds the signing key; Nowa key = upload key; upload key reset from Play Console | ok (one tweak) | answer/9842756 | "the key that signs" → "the keys that sign" (see next row) |
| Fingerprints: "add that key's fingerprints too ... app signing page" | fixed | answer/9842756 ("Create a new app: Your app will be automatically enrolled in quantum-ready, hybrid signing"; "you must copy the fingerprints for three keys and register each of them"; section **App signing key**) | now names the **App signing key** section and says a new app gets three keys, each to be added |
| Developer account: 18+, Google Account, Developer Distribution Agreement, one-time fee (no amount, link), **Personal** / **Organization**, government ID + card in legal name, Android device check with the Play Console mobile app for new personal accounts | ok | answer/6112435 | added "An organization account needs a D-U-N-S Number" (answer/13634885) |
| **Home** → **Create app**; language + name (changeable); app or game; free or paid; contact email; **Declarations** ("Developer Program Policies", "US export laws", Play App Signing Terms of Service); **Create app** | ok | answer/9859152 | |
| **Dashboard** → **Set up your app**; **App content** (**Policy and programs** → **App content**, **Start**): privacy policy, ads, sign-in details, target audience, content rating, Data safety; **Main store listing**; **Store settings** (support email required) | ok | answer/9859152, answer/9859455 | |
| Listing limits 30 / 80 / 4,000; icon 512 x 512 PNG up to 1,024 KB; feature graphic JPEG or PNG without alpha 1024 x 500; at least two screenshots, JPEG or PNG without alpha, 320-3,840 px, long side at most twice the short side | ok | answer/9859152, answer/9866151 | |
| Testing rule: personal accounts created after November 13, 2023; closed test; 12 testers opted in 14 days in a row; **Dashboard** → **Apply for production**; review usually seven days or less; friends, family, colleagues | ok (who it applies to checked) | answer/14151465 | added "Once your app setup is done" (closed testing requires completed app setup) and what a closed test is (R4), plus Google's [Set up an open, closed, or internal test](https://support.google.com/googleplay/android-developer/answer/9845334) link for inviting testers. Google states the rule only for personal accounts; I didn't add an "organization accounts are exempt" sentence because no page says it outright |
| Internal testing up to 100 testers, optional, recommended start | ok | answer/9859348, answer/14151465 | |
| Release steps: tracks (**Test and release** → **Testing** → **Internal testing** / **Closed testing**, **Test and release** → **Production**), **Create new release** (disabled until Dashboard tasks done), Play App Signing on first release (Google-generated key default), upload `.aab`, release name only in Play Console and auto-filled from the version name, release notes, **Next**, **Errors summary**, **Start rollout** | ok | answer/9859348; **Build version** = pubspec build name (`project_detail_settings.dart:283-305`) → `versionName` (`app_build_gradle_template.dart:67-68`) | |
| **Publishing overview** → **Send for review**; a few hours up to seven days or longer; auto-publish unless managed publishing | ok | answer/9859654 | |
| Release an update: higher **Build number** each upload | ok | answer/9859152 ("versionCode ... incremented with each update") | |
| Removed `-` lines (old step "Add its listing details ... Publish your app" link; "Nowa uses the Bundle Identifier as your Android package name"; "Sign in to Google Play Console") | ok | | all covered by the new walk-through |

Length: about 2,370 words with URLs. Nothing obviously repeated; all four Play Console walk-throughs are what the brief
asked for. If the orchestrator splits, **Set up Google Play Console** is the natural unit (as for Apple on `ios.md`).

## web.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Publishing starts by checking your project for errors" (`flutter analyze` moved to for-code) | ok | `web_environment_manager.dart:126` (**Analysis Failed**); for-code copy is verbatim | |
| Share the address, opens in any browser; update keeps the address, no need to deactivate; deactivate leaves the project alone; **Download Files** = finished site files | ok | `web_build_settings.dart:75`, `lib/project/run/deploy_button.dart:340-366`, `web_environment_manager.dart:182-195`, `codemagic_file.dart:65-82` | |
| Domain provider / registrar, DNS records explained, **Also www.** switch | ok | `custom_domain_section.dart:176-212` | |
| P17 "Once Nowa has verified your domain, the field and the **Also www.** switch are locked ... trash icon appears only after verification" | fixed | `custom_domain_section.dart:134` (field read-only only when verified) and `:149-158` (while pending the button reads **DNS** and only opens the records, so no new domain can be set), `:198-204` (switch shows "You cannot change this setting after setting the custom domain ..." as soon as DNS records are active), `:87-101` + `web_environment_manager.dart:64-66` (trash only when verified) | now: once **Set** turns into **DNS**, domain and switch can't be changed; trash after verification; a pending domain can't be removed, so double-check spelling and the switch; support workaround kept |

## index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Nothing to install (cloud builds), guides cover Apple's and Google's sites | ok | `codemagic_file.dart` | |
| Store fees "one-time" (Google) and "yearly" (Apple) | fixed (links added) | answer/6112435; https://developer.apple.com/programs/enroll/ | the brief wants each fee mention linked; no amounts |
| **Bundle Identifier** locked by Apple after a build upload, permanent on Google Play | ok | Apple app-information reference; answer/9859152 | |
| **Build version** / **Build number** meanings | ok | `project_detail_settings.dart:283-330`, `info_plist_template.dart:31-36`, `app_build_gradle_template.dart:67-68` | |
| **App Icon**: up to 1024 x 1024; best a square 1024 x 1024, square corners, no transparency | ok | `app_icon_manager.dart:170-171`; Apple HIG app icons; `launcher_icon/lib/src/ios.dart:68-80` | |
| **Package Name** "read-only Flutter name" → "technical name ... never see" | restored | `project_detail_settings.dart:219-229` (`enabled: false`, helper "This can't be changed") | the "can't be changed" fact had been dropped with "read-only"; back in plain words |

## builds.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro, branch paragraph (commit = saves all changes, build includes everything), log explained | ok | `workflow_manager.dart:242-261`; build card hint text | |
| **Artifacts** examples `.apk`, `.aab`, `.ipa` | ok | `codemagic_file.dart:31-32,59-63,115-116` | |
| **Explain with AI** prompts (find the cause, fix, say when to rebuild; on **iOS code signing** explain and fix) with the end of the log | ok | `current_build_card.dart:406-414,484-493`; `fix_with_ai_button.dart:9-13` | |
| Failed build doesn't break the project | ok | builds run remotely from the committed branch | |
| `codemagic.yaml` explained; red error bar with **Reset to default** in code mode | ok | `nowa_code_editor.dart:273-292`, `codemagic_file.dart:3-8` | R3: the file name is what the reader sees on the bar |

## download-code.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro and "Use the downloaded code" rewritten for the primary reader | ok | | VS Code / Android Studio / Flutter install kept |
| P9: web app row keeps spinning, can't be clicked; download works; close and reopen the popup | ok | `lib/project/download_code_button.dart:109-116` (`_downloading = true`, `launchUrl`, return without reset), `:205-215` (`onTap: null`, spinner), `:16-22` (a new popup each time) | still present in 3.13 |

## Structure and audience (all six pages)

- Links: every relative link and anchor on the six pages resolves (script check); the only `generated-code.md` anchor
  used is `#publishing` (allowed). Inbound anchors kept: `#app-details`, `#apple-distribution-certificate`, both
  `#store-rules`, `#register-your-bundle-id` (linked from `integrations/firebase/notifications.md`, `integrations/stripe.md`),
  `#if-the-ios-code-signing-step-fails` (linked from `troubleshooting/index.md`), `#create-a-signing-key`.
- No `{#id}` lost against `origin/main`, no heading from `origin/main` gone, images and the `publish-web-2` capture
  placeholder untouched, no H1, no `---` rules, at most two admonitions per page (web.md 2, others 0-1), no hype words
  outside quotes, no em dashes, front matter valid.
- Fees: only "one-time" (Google) and "yearly" (Apple), each with a link, on index.md, android.md and ios.md. No amounts.
- R2: no code-only facts left on the pages (the one move, `flutter analyze`, is verbatim in the for-code file). Added one
  verified developer fact to `P14-B11-for-code.md` (what `--create` does in the signing step).
- R5: the only code-level route (turning a Mac certificate's key into text) now comes after the no-code path.

## Coverage spot checks

Obsolete rows (all 7 checked in the code, all confirmed gone or changed in 3.13.0):
- ios #25 "Mobile tab → iOS → Release": tabs are **Android**, **iOS**, **Web** (`deployment_settings.dart:121-130`); iOS has one release workflow (`workflow_manager.dart:683-712`).
- ios #34 "Upload a key" + paste field: the certificate field is a `.p12` picker without a text box (`ios_details.dart:151-156`; `editable` defaults to false, `file_picker_field.dart:16`).
- android #3 Release/Debug build types: one **Debug mode** switch (`deployment_settings.dart:238-241`).
- web #2/#14 Development and Production modes: one environment (`web_build_settings.dart:57-62`).
- web #3 12-hour links: expiry comes from the server, shown as **Expires In:** only when set (`environment_card.dart:66-71`).
- web #6 **Web Deploy** icon and panel: the **Web** row of the **Deploy** menu and the **Web** tab (`deploy_button.dart:340-366`).
- web #7 progress dots and **Build Failed**: **Saving** / **Creating** / **Deploying**, **Analysis Failed** / **Publish Failed** / **Show Details** (`environment_widgets.dart:367-370`, `web_environment_manager.dart:80,126,153`, `publishing_error.dart:29`).

Covered rows sampled (10, all confirmed on the cited page): ios #2, #10, #23, #26, #28, #37; android #8, #10, #12 (builds.md
quotes "Starting a build will commit all changes to the selected branch."), #14; web #19 (`dns_records.dart:48`
"up to 48 hours").

Coverage file note (not edited, outside my scope): rows ios #40 and #41 point to `ios.md#share-one-certificate`, which
I merged into `ios.md#use-a-key-you-already-have`.

## Open issues

1. `ios.md` links to `../code/generated-code.md#publishing` for turning a Mac certificate's key into the text format
   Nowa reads. That anchor is still an empty stub: the orchestrator needs to add the matching fact from
   `P14-B11-for-code.md` (the Keychain + `openssl` steps), or the link promises something that isn't there.
2. Apple publishes no number for distribution certificates (Certificates overview: "only one type of each distribution
   certificate ... per team"). "Three" rests on Nowa's own warning (`warning_dialogs.dart:45-51`) and Codemagic, so
   the page attributes it to the warning.
3. Apple's docs disagree on who can create distribution certificates: the Certificates overview says "Only the Account
   Holder or Admin role", the roles table allows App Manager with Certificates, Identifiers & Profiles access. The page
   says Nowa recommends **Admin** or **App Manager** (old Nowa docs, Codemagic) and gives **Admin** as the fallback. A live
   build with an App Manager team key and a Nowa-generated key would settle it.
4. Product: P8 is still in 3.13.0 (`lib/project/run/deploy_button.dart:286`, **Set up** on the iOS row opens the
   **Android** tab); `product-issues.md` lists it for 3.12.5 only. Workaround now on `ios.md`.
5. Product: P17 detail for the team. While a domain is pending, the field stays editable but **DNS** only opens the
   records, the **Also www.** switch shows "You cannot change this setting after setting the custom domain ...", and
   there's no remove action (`custom_domain_section.dart:87-101,134,149-158,198-204`).
6. Length: `ios.md` about 2,950 words and `android.md` about 2,370 (with URLs), over the ~2,200 guide. Not split (brief).
   Natural units if the orchestrator splits: **Set up your Apple account** and **Set up Google Play Console**.

