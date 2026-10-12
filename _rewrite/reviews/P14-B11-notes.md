# P14-B11 notes: publish section

Pages: `docs/publish/index.md`, `web.md`, `android.md`, `ios.md`, `builds.md`, `download-code.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Official pages were read on 2026-10-12.
WebFetch couldn't resolve support.google.com, docs.codemagic.io or docs.flutter.dev, so those pages were downloaded
with curl through the proxy and converted to text in the session scratchpad; the quotes below come from those extracts.
Apple DocC pages (JavaScript-rendered) were read from their JSON endpoint
(`https://developer.apple.com/tutorials/data/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api.json`).

Background that several claims rely on: Nowa's cloud builds run the workflows in the project's `codemagic.yaml`
(`packages/core/lib/src/file_system/codemagic_file.dart:11-125`). The iOS workflow signs with
`app-store-connect fetch-signing-files "$BUNDLE_ID" --type IOS_APP_STORE --create` (`:98-106`) and uploads with the
App Store Connect key (`:120-124`). Codemagic's docs for exactly this command: "This new private key will be used to
create a new iOS Distribution certificate in your Apple Developer Program account if there isn't one that already
matches this private key" and "Codemagic will fetch or create the relevant provisioning profile and certificate to
code sign the build" (https://docs.codemagic.io/yaml-code-signing/alternative-code-signing-methods/).

## Summary

- All six pages edited in place for the primary reader (R1-R9): plain words for every technical term the reader meets
  (bundle ID, signing, keystore, upload key, `.p8`, `.p12`, `.aab`, `.apk`, `.ipa`, DNS records, branch, commit, log),
  a why or a what-happens-next on steps where it helps, and the journey laid out before the details on the two store
  pages. No headings removed or renamed against the pre-phase-14 commit `7fdb655`; images, explicit IDs
  (`#app-details`, `#apple-distribution-certificate`, both `#store-rules`) and the capture placeholder unchanged;
  all 74 inbound links into `docs/publish/` and every link on the six pages resolve (script check).
- Coverage: 82 old items audited (`P14-B11-coverage.md`); 35 brought information back, plus 5 items the brief asked
  for (Google Play account, testing rule, listing graphics, export compliance, pending custom domain).
- Moved to the code section: 1 fact (`flutter analyze`, web.md). Six new developer facts proposed for `#publishing`.
- Fees: only "one-time registration fee" (Google) and "yearly fee" (Apple), each with a link. No amounts.
- No em dashes, no hype words, at most two admonitions per page.
- "Service account" (listed in the batch note) doesn't come up: Nowa 3.13 doesn't upload to Google Play, and there's no
  service-account code in `lib/`, `packages/core/lib` or `packages/data/lib` (grep), so the pages don't mention it.

## ios.md

Status: done. About 2,700 words (URLs excluded): over the ~2,200 guide, see the split proposal (open question 4). One admonition.

### What changed for the reader

- Intro rewritten (R9) with a six-step "journey at a glance" list, so a first-timer sees the whole path before the
  details. "You don't need your own Mac": builds run on Nowa's cloud Mac instances (`codemagic_file.dart:86`,
  `instance_type: mac_mini_m1`) and signing files come from the API (`:104`).
- **Before you start**: kept the plan and app-details bullets, moved Apple enrollment into its own section, added the
  old page's "keep a note open" tip, and explained what a bundle ID is in plain words (R4). New fact: it can't change
  after the first upload. Apple: "You can't change this property after you upload a build"
  (https://developer.apple.com/help/app-store-connect/reference/app-information/app-information).
- **Set up your Apple account** (kept the H2, so its anchor survives) now holds four step-by-step walk-throughs instead
  of three links. Each says which Apple role it needs (from the "Required role" line on each Apple page).
- **Save your App Store Connect credentials**: Nowa steps unchanged. Added "The same pencil is how you swap in a new
  API key": the pencil opens the filled form (`packages/core/lib/src/cloud_build_v2/ui/ios_details.dart:262-275,280-341`)
  and **Save** updates the saved values (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:485-520`).
- **Add a distribution certificate** `{#apple-distribution-certificate}` (anchor kept): now explains what the
  certificate and its private key are, why one certificate can sign all your apps, and what Nowa does with the key.
  Nowa steps and the **Important!** wording unchanged (`ios_details.dart:59-175`, `warning_dialogs.dart:5-58`).
- **Build and send**: explained `.ipa` (R4), said the `.ipa` under **Artifacts** doesn't need downloading (the
  workflow uploads it: `codemagic_file.dart:115-124`), and why each upload needs a new build number.
- **After the upload**: added where the build appears (**TestFlight** tab) and the export compliance step.
- **If the iOS code signing step fails**: kept the Nowa buttons; added four things to check, each backed below.
- **Follow Apple's rules** `{#store-rules}`: unchanged.
- Keywords: added old and Apple terms people search for (bundle identifier, app id, sku, team key, issuer id,
  export compliance, missing compliance, revoke certificate...).

### Added claims and their evidence

| Claim (section) | Evidence |
|---|---|
| Apple Account with two-factor authentication; legal name, alias or company name delays approval; **Start your enrollment**; individual or organization; organizations need a D-U-N-S Number and a public website on their own domain; after verification you agree to the License Agreement and complete the purchase; fee is per membership year (no amount) (Join) | https://developer.apple.com/programs/enroll/ |
| Register: role Account Holder or Admin; **Certificates, Identifiers & Profiles** → **Identifiers** → add button (+) → **App IDs** → **Continue** → type → **Continue** → **Description** → **Explicit App ID** + **Bundle ID** → capability checkboxes → **Continue** → **Register**; In-App Purchase on by default (Register your bundle ID) | https://developer.apple.com/help/account/identifiers/register-an-app-id. Apple's step 3 reads "confirm App ID type is automatically selected, then click Continue"; the type options are App and App Clip, so the page says "Keep **App** as the type" (old docs: "Select App"). |
| Change capabilities later: select the App ID, **Edit**, **Save** | https://developer.apple.com/help/account/identifiers/enable-app-capabilities ("click Edit... Click Save. If a warning dialog appears, click Confirm") |
| Create app: role Account Holder, App Manager or Admin; Account Holder must sign the latest agreement in **Business**; **Apps** → add button (+) → **New App** → fields → **User Access** **Limited Access** / **Full Access** → **Create**, messages for missing info | https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app |
| Field rules: Name 2-30 characters, editable until you submit for review; Primary Language changeable any time; Bundle ID locked after a build is uploaded; SKU internal, not visible, can't change after the app is added | https://developer.apple.com/help/app-store-connect/reference/app-information/app-information. The field labels **Platforms**, **Name**, **Primary Language**, **Bundle ID**, **SKU** are the property names on that page and in the dialog's screenshot description on the add-a-new-app page (the live dialog needs a sign-in). |
| API key: role Account Holder or Admin; **Users and Access** → **Integrations** (App Store Connect API selected); first time the Account Holder clicks **Request Access**, agrees, **Submit**, reviewed case by case; **Team Keys** → **Generate API Key** (or +); name is for reference only; **Access** role; **Generate**; can't edit name or access later (revoke and generate a new one); revoke with **Edit** → select → **Revoke Key** → **Revoke** | https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api |
| Team keys reach all apps; individual keys "aren't able to use Provisioning endpoints"; **Download API Key** link, download "a single time", "Apple doesn't keep a copy"; secure keys like passwords | https://developer.apple.com/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api (JSON endpoint) |
| Issuer ID is above the list of keys | Codemagic: "Take note of the Issuer ID above the table of active keys" (https://docs.codemagic.io/yaml-code-signing/signing-ios/) |
| Access must be **Admin** or **App Manager** | old `deployment/ios-deploy.md` ("It should be either Admin or App Manager for Nowa to be able to deploy on your behalf"); Codemagic recommends App Manager for the same key (page above) |
| The key lets Nowa fetch or create signing files and upload the app | `codemagic_file.dart:98-106,120-124` + Codemagic page above |
| Certificate = your digital signature; shows the app comes from you and hasn't changed since signing | Apple Code Signing Guide: "certify that an app was created by you... the system can detect any change to the app" (https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html) |
| The certificate belongs to the team, so it can sign all your apps | "Distribution certificates belong to the team" (https://developer.apple.com/support/certificates/); Nowa's dialog: "you will not be able to sign other iOS apps" (`ios_details.dart:118-120`) |
| On a Mac people use Keychain Access | "Keychain Access on your Mac allows you to create a certificate signing request (CSR)" (https://developer.apple.com/help/account/certificates/create-a-certificate-signing-request) |
| During the build Nowa finds the matching certificate or creates one; a generated key's certificate appears after the first signed build | `codemagic_file.dart:104` + Codemagic alternative methods page (quoted at the top) |
| A Keychain `.p12` can't be read and the card shows **Failed to load or save certificate info** | the picked file goes through `binaryToText` (`workflow_manager.dart:425`), which is a strict `utf8.decode` (`packages/core/lib/src/file_system/encoding.dart:8-10`); the exception sets the error state (`workflow_manager.dart:418-440`) whose text is at `ios_details.dart:67-72`. PKCS#12 is binary. Same root cause as product issue P16 (now confirmed, not "partly"). |
| Nowa's own download is the key as text | `workflow_manager.dart:442-464` (`utf8.encode(keyContent)`, file `ios_distribution_certificate_key.p12`) |
| Revoke: role Account Holder or Admin; **Certificates** in the sidebar → select → **Revoke** → **Revoke** | https://developer.apple.com/help/account/certificates/revoke-a-certificate |
| After revoking: apps on the store aren't affected; no new uploads signed with it; uploaded but unsubmitted builds may be marked Invalid Binary | https://developer.apple.com/support/certificates/ (row "iOS Distribution Certificate (App Store)") |
| Share one certificate; several people each up to the limit, then share | old `deployment/ios-deploy.md` (warning box); Nowa's warning recommends reuse (`warning_dialogs.dart:46-48`) |
| Each upload needs a new build number | "The build string is used to uniquely identify the build throughout the system" (https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds); `Build number` maps to the iOS build string (`packages/core/lib/src/file_system/templates/ios/info_plist_template.dart:31-36`, `project_detail_settings.dart:309-330`) |
| Builds appear on the app's **TestFlight** tab | https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata ("Click the TestFlight tab to view all builds") |
| **Missing Compliance** until encryption use is specified; **Provide Export Compliance Information** → answer → **Save** | https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-export-compliance-information-for-beta-builds/. Nowa's iOS `Info.plist` template doesn't set the encryption key (`info_plist_template.dart`, no `ITSAppUsesNonExemptEncryption`), so the question comes up. |
| Troubleshooting checks | limit: `warning_dialogs.dart:45-51`; revoked certificate "will break any existing builds": same text; API key access: old docs (above); bundle ID saved with the credentials (`workflow_manager.dart:495-501`) and used by the signing step (`codemagic_file.dart:104`) |

### Old claims not carried over

- "Description ... will be visible on the App Store" (bundle ID step): Apple's page only says "Enter a name or
  description for the App ID". Not repeated.
- "Use the same certificate for all updates ... If you try to push an update using a different certificate, it will
  be rejected": Apple's certificates page says only expired or revoked certificates block uploads, and apps on the
  store aren't affected. Replaced by the verified facts in **Manage the saved key** and **Share one certificate**.
- The Apple fee amount (D3, D24).

### Open questions (ios.md)

1. Apple publishes no number for Apple Distribution certificates today (searched developer.apple.com; Apple's
   certificates page only says one type of each distribution certificate per team). Nowa's warning and Codemagic say
   three. The page attributes the number to Nowa's warning.
2. The API key access level (Admin or App Manager) rests on the old Nowa docs and Codemagic's recommendation. Apple's
   pages read here don't list per-role permissions for creating certificates through the API.
3. Stripe's Apple Pay option writes an entitlement (`packages/core/lib/src/integrations/stripe/stripe_manager.dart:102-116`),
   which would need the Apple Pay capability on the App ID. Whether the iOS project (a server-side template) references
   that entitlements file couldn't be checked, so the page only gives Apple Pay as an example capability.
4. Split proposal (the page is ~2,700 words): move **Set up your Apple account** (its four walk-throughs, ~880 words)
   to a new page `publish/apple-account.md` ("Set up your Apple account", sidebar "Apple account setup") placed
   before `publish/ios.md`, keep the journey list and a link on `ios.md`, and redirect nothing (new URL). `ios.md`
   would drop to ~1,800 words. Not done here (brief: propose, don't split).

## android.md

Status: done. About 2,080 words (URLs excluded). One admonition (the existing signing-key warning).

### What changed for the reader

- Intro rewritten (R9) with a five-step path. All Nowa steps, labels, the screenshot, `#create-a-signing-key`
  (linked from `integrations/firebase/auth.md`), `#test-on-a-device`, `#upload-to-google-play`, `#store-rules`,
  `#release-an-update` and `#download-your-files` kept.
- **Before you start**: the package-name sentence now says why it matters: it can never change on Google Play.
- **Test on a device**: added what a debug build is and isn't (only an `.apk`, not optimized, not accepted by
  Google Play), from the old page's note on Debug vs Release.
- **Create a signing key**: explained signing and keystore in plain words (R4). Kept Nowa's warning, and added
  Google's safety net (Play App Signing, upload key reset). Fingerprints: explained, and the Play App Signing
  sentence made concrete.
- **Build a release** / **Download your files**: said why release builds matter and what `.aab` vs `.apk` are.
- New **Set up Google Play Console** H2 with four walk-throughs: developer account, create the app, store listing
  (**Set up your app**: Dashboard, App content, Main store listing, Store settings, graphics table), testing rule for new personal accounts.
- **Upload to Google Play**: replaced the three-line summary with Google's release steps.
- **Release an update**: why the build number goes up; "create a new release on the same track".
- **Follow Google Play's rules** `{#store-rules}`: unchanged.

### Added claims and their evidence

| Claim (section) | Evidence |
|---|---|
| Package name can never change or be reused once on Google Play | "Package names for app files are unique and permanent... can't be deleted or re-used in the future" (https://support.google.com/googleplay/android-developer/answer/9859152) |
| Debug build = only an `.apk` | debug workflow artifacts `build/**/outputs/flutter-apk/*.apk` only (`packages/core/lib/src/file_system/codemagic_file.dart:13-32`) |
| Debug build not optimized, can feel slower or jumpier | "optimized for fast development and run cycles (but not for execution speed, binary size, or deployment)", "Application performance can be janky in debug mode" (https://docs.flutter.dev/testing/build-modes) |
| Google Play doesn't accept it | new apps release Android App Bundles: "Releases allow Android developers to manage Android App Bundles (or APKs for apps created before August 2021)" (https://support.google.com/googleplay/android-developer/answer/9859348); the debug build is unsigned (Nowa's note, `packages/core/lib/src/settings/deployment_settings.dart:238-241`) |
| Google Play only accepts apps signed with your own key, which proves each upload comes from you; keystore `.jks` / `.keystore` | https://support.google.com/googleplay/android-developer/answer/9842756 (upload key: "You use this key to sign your app bundle before uploading it to the Play Console. Google uses it to verify your identity"; "Stored in a Java keystore (.jks or .keystore)"). Worded around Google Play rather than "Android requires signing" so it doesn't clash with Nowa's "Unsigned builds" note for debug builds. |
| Reuse the key you published with before | answer/9842756 (the upload key signs every bundle you upload) |
| Play App Signing turns on by default for new apps when you upload the first bundle; Google keeps the app signing key; Nowa's key becomes the upload key; Google can reset a lost upload key from Play Console | answer/9842756 ("By default, when you upload your app bundle, your app is automatically enrolled", "If compromised or lost, Google can reset this key for you", "Request an upload key reset") |
| Add Google's app signing key fingerprints too | answer/9842756 ("you must register the Google-held app signing key fingerprint with your API providers, not just your local upload key") |
| Release builds optimized for fast startup and execution | Flutter build modes page (above) |
| `.aab` is what you upload; Google turns it into the right download per device | answer/9859152 ("Google Play uses Android App Bundles to generate and deliver APKs that are optimized for each device configuration") |
| Developer account: 18+, Developer Distribution Agreement, one-time fee (no amount), Personal or Organization, ID and card in your legal name, new personal accounts verify an Android device with the Play Console mobile app and must test first | https://support.google.com/googleplay/android-developer/answer/6112435 |
| **Home** → **Create app**; default language and name (name changeable); app or game; free or paid; contact email; **Declarations** ("Developer Program Policies", "US export laws", Play App Signing Terms of Service); **Create app** | answer/9859152 |
| **Dashboard** → **Set up your app** | answer/9859152 ("select Dashboard on the left menu... go to Set up your app on the app dashboard") |
| **App content** (**Policy and programs** → **App content**), **Start**; privacy policy, ads, sign-in details, target audience, content ratings | https://support.google.com/googleplay/android-developer/answer/9859455 |
| Content rating questionnaire wording | https://support.google.com/googleplay/android-developer/answer/9859654 ("such as the content rating questionnaire") |
| Data safety form on the App content page | existing quote on the page (`#store-rules`) |
| Store settings: category and contact details, support email required | answer/9859152 ("Contact details... A contact email address is required"; category and tags) |
| Listing limits: App name 30, Short description 80, Full description 4000 | answer/9859152 table |
| Graphics: icon 32-bit PNG 512 x 512 up to 1024KB; feature graphic JPEG or 24-bit PNG (no alpha) 1024 x 500; at least two screenshots, JPEG or 24-bit PNG (no alpha), 320-3840 px, long side at most twice the short side | https://support.google.com/googleplay/android-developer/answer/9866151 |
| Testing rule: personal accounts created after November 13, 2023; closed test, at least 12 testers opted in for 14 days in a row; **Dashboard** → **Apply for production**; review usually seven days or less; friends, family, colleagues as testers | https://support.google.com/googleplay/android-developer/answer/14151465 |
| Internal testing up to 100 testers; optional, recommended starting point | answer/9859348 ("up to 100 chosen testers"); answer/14151465 ("Internal testing is optional, but recommended as a starting point") |
| Release steps: tracks **Test and release** → **Testing** → **Internal testing** / **Closed testing**, **Test and release** → **Production**; **Create new release** (disabled until Dashboard tasks are done); first release configures Play App Signing; upload the bundle; release name only in Play Console, auto-filled from the version name; release notes; **Next**; **Errors summary**; **Start rollout** | answer/9859348. Release name auto-fill = **Build version**, which Nowa writes as the version name (`packages/core/lib/src/file_system/templates/android/app_build_gradle_template.dart:67-68`, `packages/core/lib/src/settings/project_detail_settings.dart:286-305`) |
| **Publishing overview** → **Send for review**; processing a few hours up to seven days or longer; approved changes publish automatically unless managed publishing is on | answer/9859654 |
| Every upload needs a higher **Build number** | answer/9859152 ("versionCode... incremented with each update"); **Build number** feeds `versionCode` (`app_build_gradle_template.dart:67`, `project_detail_settings.dart:308-330`) |

### Open questions (android.md)

- None blocking. The Play Console menu paths (**Test and release**, **Policy and programs**) are the ones Google's help
  uses today; Google renames them from time to time, which is why each walk-through links its source page.

## web.md

Status: done. About 900 words (URLs excluded). Two admonitions (unchanged).

### What changed for the reader

- Intro: says what happens when you publish again (same address, new version).
- **Before you start**: "Publishing starts with a code check (`flutter analyze`)" became "Publishing starts by checking
  your project for errors" (R2). The command name moved to `P14-B11-for-code.md` (`#publishing`).
- **Publish your app**: added "That's it, your app is live" and who to share the address with (old page: "share the
  link with your team, early users, stakeholders"); explained that people need only a browser.
- **If publishing fails**: wording only ("the check found errors in your project").
- **Update your site**: added that people you shared it with see the new version, and "no need to take the site down
  first" (old page tip).
- **Take your site down**: added that the project isn't touched.
- **Download the build files**: says what the files are for.
- **Use your own domain**: explained domain provider (registrar), DNS records and the **Also www.** switch in plain
  words (R4). Fixed the remove sentence for 3.13 (P17).

### Added claims and their evidence

| Claim | Evidence |
|---|---|
| People open the site in any browser | Nowa's own header: "allowing users to access it through their browsers" (`packages/core/lib/src/settings/cloud_build/web_build_settings.dart:75`) |
| Update keeps the same address; no need to deactivate first | **Update**/**Redeploy** republish the same environment (`lib/project/run/deploy_button.dart:351`, research `features-code-ship.md` Web deployment: "republish updates the same URL"); old `deployment/web-deploy.mdx` tip |
| Deactivate doesn't touch the project | `packages/core/lib/src/web_deploy/web_environment_manager.dart:182-195` (status **Deactivating**, a call to the hosting service only) |
| Download Files = the finished site files | the web build is the static `build/web` output (`packages/core/lib/src/file_system/codemagic_file.dart:65-82`) |
| The www switch makes the `www` address work too | `includeWWW` is sent with the domain (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:158,181-210`) |
| The trash icon (**Remove custom domain**) shows only once the domain is verified; a pending domain has no remove action | the icon is built only when `isCustomDomainSet` (`custom_domain_section.dart:87-101`), which is false while DNS setup is needed (`web_environment_manager.dart:64-66`). Product issue P17, still in 3.13. Workaround: **Chat with support** (`docs/account/help.md`) |

### Old claims not carried over

- "When you open the link you might see a message asking you to wait a few minutes while the environment is set up":
  no such text in the 3.13 client (`packages/core/lib/src/web_deploy/`), and hosting is server-side. Not added; see
  open questions.
- Record types ("CNAME and TXT"): the **DNS Records** table shows whatever the server returns
  (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/dns_records.dart:83-101`), so the page doesn't
  name types.
- Development and Production modes, 12-hour links, plan names: obsolete (one environment,
  `web_build_settings.dart:57-62`) or pricing (D3).

### Open questions (web.md)

1. Does a freshly published site still need a few minutes before it loads (old docs)? Can't be checked from the client.
2. Which DNS record types does Nowa's hosting return today (old docs: CNAME and TXT)?
3. P17: can support remove a domain that's still pending? The page suggests asking them.

## index.md

Status: done. About 1,120 words (URLs excluded). One admonition (unchanged tip, one clause added).

### What changed for the reader

- Intro: nothing to install (builds run in the cloud) and the section covers Apple's and Google's sites too.
- **What you can publish**: plainer descriptions; new paragraph on the store accounts each target needs, with "a fee"
  wording only (D3, D24).
- **Check your app details** `{#app-details}` (anchor kept): **Bundle Identifier** row says why to settle it early
  (Apple and Google lock it); **Build version** / **Build number** explained as "the version people see" and "the
  number the stores use to tell uploads apart"; **App Icon** row gives the ideal image (square 1024 x 1024, square
  corners, solid background); **Package Name** explained without "Flutter"; permissions sentence says why.
- **Start a deployment**, **Publish a local project**, **Ship an update**: tone only (R9), no fact changes except
  "you can keep working in the meantime" and "because builds run in Nowa's cloud".

### Added claims and their evidence

| Claim | Evidence |
|---|---|
| Google Play: developer account with a one-time registration fee | https://support.google.com/googleplay/android-developer/answer/6112435 |
| App Store: Apple Developer Program membership with a yearly fee | https://developer.apple.com/programs/enroll/ ("per membership year") |
| Apple locks the bundle ID once you upload a build; Google Play package names are permanent | https://developer.apple.com/help/app-store-connect/reference/app-information/app-information; https://support.google.com/googleplay/android-developer/answer/9859152 |
| Build version = version people see; Build number = upload counter | **Build version** writes the version name and **Build number** the build number (`packages/core/lib/src/settings/project_detail_settings.dart:286-330`), which become the stores' version and build values (`packages/core/lib/src/file_system/templates/ios/info_plist_template.dart:31-36`, `packages/core/lib/src/file_system/templates/android/app_build_gradle_template.dart:67-68`) |
| Ideal icon: square, exactly 1024 x 1024, square corners, solid background | Nowa rejects larger images (`packages/core/lib/src/settings/app_icon_manager.dart:170-171`); Apple's iOS icon is a 1024x1024 px square and "the system applies masking to produce rounded corners", background layers "full-bleed and opaque" (https://developer.apple.com/design/human-interface-guidelines/app-icons); Nowa doesn't remove transparency from iOS icons (`packages/launcher_icon/lib/src/ios.dart:68-79` runs only with `removeAlphaIOS`, default false in `packages/launcher_icon/lib/src/config/config.dart:25`, never set in `app_icon_manager.dart:105-142`; the generator's own warning reads "Icons with alpha channel are not allowed in the Apple App Store") |
| Builds run in the cloud, nothing to install | `packages/core/lib/src/file_system/codemagic_file.dart:11-125` (cloud workflows); local projects: "Cloud build is not available on local projects" (research `features-code-ship.md`, Deployment settings page) |

### Open questions (index.md)

- None.

## builds.md

Status: done. About 960 words (URLs excluded). No admonitions.

### What changed for the reader

- Intro (R9): what the page lets you do, and that Nowa AI can help read logs.
- **Start a build**: branch paragraph now says why the commit matters (the build includes everything so far).
- **Read the results**: named the files you'll see under **Artifacts** and explained "log".
- **When a build fails**: reassurance line; **Explain with AI** now says what Nowa AI is asked to do (two prompts).
- **What runs behind the scenes**: `codemagic.yaml` kept (R3: it's the file name the reader sees on the error bar
  and in code mode), explained as "a settings file with the build steps that Nowa takes care of"; the **Reset to
  default** fix now says where the button is (the red error bar on that file in code mode).
- Anchors kept: `#start-a-build` (linked from android.md, ios.md), `#when-a-build-fails` (linked from 2 pages).

### Added claims and their evidence

| Claim | Evidence |
|---|---|
| **Explain with AI** sends the end of the log and asks Nowa AI to find the cause, fix the project and say when to rebuild; on **iOS code signing** it asks for an explanation and a fix | prompts `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:406-414`, button `:484-493`; last 4,000 characters of the log (`packages/core/lib/src/widgets/fix_with_ai_button.dart:9-13`) |
| A failed build doesn't break anything in the project | the build runs remotely from the committed branch (`codemagic_file.dart` workflows; `workflow_manager.dart:242-261` only starts a remote build) |
| The red error bar on `codemagic.yaml` has **Reset to default** | `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:273-292`; restores `codeMagicFileContent` (`packages/core/lib/src/file_system/codemagic_file.dart:6-8`) |
| Artifacts: `.apk` / `.aab` / `.ipa` | workflow artifacts (`codemagic_file.dart:31-32,59-63,115-116`) |

## download-code.md

Status: done. About 450 words (URLs excluded). One admonition (unchanged).

### What changed for the reader

- Intro (R9): "everything you build, with Nowa AI or visually, is real Flutter code" and who you'd hand it to.
- **Use the downloaded code**: rewritten for the primary reader: you don't need to open it; a developer unzips it and
  opens it in their editor.
- New workaround line for product issue P9 (still in 3.13): in the web app the zip's row keeps spinning after the
  download starts and can't be clicked; close and reopen the popup.

### Added claims and their evidence

| Claim | Evidence |
|---|---|
| Web app: the row keeps spinning and can't be clicked after the download starts; reopening the popup resets it | `_downloadProject` sets `_downloading = true` and returns on the web without resetting it (`lib/project/download_code_button.dart:110-116`); the row uses that flag for `onTap: null` and the spinner (`:205,210-212`); the popup is a new `DownloadProjectPopup` each time it opens (`:17-21`). P9 in `product-issues.md` (3.12.5) is unchanged in 3.13. |

## For other pages

1. **`docs/troubleshooting/known-issues.md`** (B12): add P9 to the known issues. Proposed text: "**Code download keeps
   spinning (web app).** After you click the zip in the **Code download** popup, its row keeps spinning and can't be
   clicked again. The download works. Close the popup and open it again to download once more." Evidence:
   `lib/project/download_code_button.dart:110-116,205-212`.
2. **`docs/troubleshooting/known-issues.md`** (B12): add P17. Proposed text: "**A pending custom domain can't be
   removed.** The trash icon in **Custom Domain** appears only after Nowa verifies the domain. While it's pending,
   ask the Nowa team with **Chat with support** to change it." Evidence: `custom_domain_section.dart:87-101`,
   `web_environment_manager.dart:64-66`.
3. **`docs/code/generated-code.md#publishing`** (orchestrator): the new developer facts listed at the end of
   `P14-B11-for-code.md`. The ios.md link to `#publishing` promises "how to export [a Mac certificate's] key as text",
   so the first of those facts should land there.
4. **`docs/integrations/firebase/notifications.md`** (B09): it tells readers to add the Push Notifications capability
   "in Xcode". For cloud builds, the App ID's capability is set in the Apple Developer account (`publish/ios.md`
   "Register your bundle ID", step 7, and Apple's https://developer.apple.com/help/account/identifiers/enable-app-capabilities).
   Worth a link from that page to `../../publish/ios.md#register-your-bundle-id`. Not verified whether Nowa's
   server-side iOS template already has the push entitlement, so no text proposed beyond the link.
