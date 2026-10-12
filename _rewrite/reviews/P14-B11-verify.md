# P14-B11 verify log (verifier P14-B11-V)

Batch: `docs/publish/` `index.md`, `web.md`, `android.md`, `ios.md`, `builds.md`, `download-code.md`.
Diff checked: `git -C /home/user/docs diff origin/main -- docs/publish/` (writer commit `79d2705`).
Code: `/home/user/nowa-master` (3.13.0). Code refs are relative to it. Official pages read on 2026-10-12.

Status: in progress (appended page by page).

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

