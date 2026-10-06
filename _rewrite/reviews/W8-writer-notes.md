# W8 writer notes: Publish (`docs/publish/`)

Writer: W8 (Sonnet). Source of truth: `/home/user/nowa-master` (v3.12.5). All `path:line` refs are relative to that repo.
Research file: `_rewrite/research/features-code-ship.md` ("Shipping and sharing" sections). Pages written in this order:
index, web, android, ios, builds, download-code. Captures: `_rewrite/captures/requests/W8.md` (7 requests, all `needs-sign-in`).

## General decisions and findings (apply to every page)

- **Plan wording.** The code only ever says "paid plans" (web publish and mobile builds) and "higher plans" (custom domain);
  code download says "Looks like you used all your available usage for this feature." (usage-based). No plan names, no
  numbers. Refs: `lib/project/run/deploy_button.dart:188,287`, `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:50`,
  `lib/project/download_code_button.dart:130-142`, `packages/core/lib/src/widgets/nowa_dialogs.dart:89-138`.
- **Open question resolved from code (artifacts and iOS delivery).** The client ships a default `codemagic.yaml`
  (`packages/core/lib/src/file_system/codemagic_file.dart:14-125`): Android Debug builds `flutter build apk --debug`
  (artifact `.apk`); Android Release builds an app bundle and an apk (artifacts `.aab`, `.apk`, `mapping.txt`); iOS builds
  an `.ipa` and has a `publishing: app_store_connect` section using the saved API key (so the build is uploaded to App
  Store Connect); the web workflow zips `build/web.zip`. Workflow ids in the client (`android-debug-workflow`,
  `android-workflow`, `ios-workflow`, `workflow_manager.dart:632,658,684`) match the yaml keys. Caveat: the yaml is the
  client's "Reset to default" content; the server may differ, and no `publishing` section exists for Android (Nowa does not
  upload to Google Play). Also: the step names say "automatic versioning" but no `--build-number` flag is passed, so the
  docs tell users to raise **Build number** themselves (store-side rule, not in code).
- **Third-party media.** The old Apple console GIFs (`old-docs/deployment/img/add-app-ios.gif`, `generate-api-key.gif`,
  `identifier-creating.gif`) were NOT reused: 2023-era UI, 2878x1786 and 2.6-5.4 MB each, and the frames show a staff
  member's name, personal browser profile and part of an Issuer ID. Apple/Google steps link to the vendors' docs instead.
- **External links were not fetched** (network blocked). Deep links I am only fairly sure of, to re-check by hand:
  Google Play Help answers 9859152 (Create and set up your app), 9859348 (Prepare and roll out a release), 9842756 (Use
  Play App Signing); Apple `developer.apple.com/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api`.
  Root-level links (play.google.com/console, appstoreconnect.apple.com, developer.apple.com/account, developer.android.com/guide/app-bundle,
  developer.android.com/studio/publish/app-signing, developer.apple.com/programs/enroll) are stable.
- **Old docs dropped on purpose.** Prices ($99 Apple fee), "Development/Production" web modes (12 h links; removed in 3.8.2,
  see What's New 3.8.2 and `web_deploy_manager.dart:15-27`), the "Settings > Mobile tab" navigation, "choose Release" on iOS,
  "Upload a key / Generate a new key" options, paste-the-key flow, the claim "you must keep using the same certificate for
  updates" (not in code and not how Apple works in general), and "Admin or App Manager" API key access (Apple-side, not in code).
- **Promo row left out.** The Deploy menu has a **Claim your Nowa Launch Benefits** / **Limited time offer** row that opens an
  external form (`deploy_button.dart:70,322-331`; What's New 3.10.5 "Post-launch support package"). It is time-limited marketing, so it is not documented.
- **Dead code ignored.** `CloudBuildV2Page`/`CloudBuildV2Settings`/`WorkflowCard` ("View Details", "Build Now") are not used
  anywhere (`grep` shows no callers); the real UI is the three Deployment tabs (`deployment_settings.dart:148-327`).
- **Dev (3.13) check.** All string literals in the deploy files are identical on `/home/user/nowa` (dev); only the app-wide
  restyle differs (`upcoming-3.13.md` row "App-wide restyle"). Nothing to flag for publish.

### Product issue candidates (not documented; for `product-issues.md`)
- **Set up on the iOS row opens the Android tab.** In the Deploy menu the **Set up** button calls `_openSettings` without a tab,
  so it defaults to Android (`lib/project/run/deploy_button.dart:220,290-291`); clicking the row itself opens the right tab
  (`:205-212`). The docs tell readers to click the row.
- **Code download on the web app never resets its spinner.** `_downloadProject` returns right after `launchUrl` without
  `setState(() => _downloading = false)` (`lib/project/download_code_button.dart:110-117`), so the row keeps its spinner until the popup closes.
- **"Certificate Private Key" is read as UTF-8 text** (`binaryToText` = `utf8.decode`, `packages/core/lib/src/file_system/encoding.dart:8`;
  `workflow_manager.dart:424-425`) although the picker filters `.p12`, and Download saves the key text as `ios_distribution_certificate_key.p12`
  (`workflow_manager.dart:442-455`). A binary Keychain `.p12` export would likely fail. The docs say only that Nowa reads the file as text.

## docs/publish/index.md (Get ready to publish, overview)

Research: features-code-ship.md "Deploy button and menu", "Deployment settings page", "App details for store builds", "Permissions",
"Project Sync", "Mobile browser Build and Run pages"; features-account-projects.md "Project Details", "Project names, package name and bundle ID".

Key claims and refs:
- Deploy button next to Run, hidden for local projects, replaced by Save in the playground: `lib/project/top_bar.dart:331-333`, `lib/project/run/deploy_button.dart:21`. Label **Deploying** while building: `:100`.
- Menu rows, status strings, buttons (**Deploy**, **Redeploy**, **Cancel**, **Set up**, **Premium**), **Advanced build settings**, no-repo message: `deploy_button.dart:228-374`. Row click behavior: live web row opens the site (`:366-371`), mobile rows open their tab (`:205-212`, `:301-303`).
- Plan gates: web = `webPreviewDeploys`, Android Debug/Release/iOS = `cloudBuilds` (`deploy_button.dart:56-61`); lock view with **Upgrade**: `packages/core/lib/src/billing/widgets/entitlement_consumer.dart:48-111`; **Premium** pill and **Time to level up**: `packages/core/lib/src/widgets/nowa_dialogs.dart:89-181`. Tab messages "Android builds are not available on your current plan..." `packages/core/lib/src/settings/deployment_settings.dart:222,317`, web `web_build_settings.dart:32`.
- Deployment page tabs Android / iOS / Web (macOS is `kDebugMode` only): `deployment_settings.dart:50-55,121-130`. Hidden in playground/guest: `packages/core/lib/src/settings/project_settings.dart:21-25`.
- Project Details labels, regexes and icon limit: `packages/core/lib/src/settings/project_detail_settings.dart:99-150,265-338` (Bundle Identifier regex `:120`, "Invalid package name" `:121`, version `:296`, number `:318`), `packages/core/lib/src/settings/app_icon_manager.dart:12-22,148-168` ("Icon must be 1024x1024 or smaller" `:161-163`), `app_icon_settings.dart:118-122,196-206` (**Change all**, tiles, hover "Change Icon").
- Bundle Identifier applies to iOS, Android, macOS, Linux; **App Name** to all platforms: `packages/core/lib/src/project/rename.dart:29-72`. Default `com.example.<name><6 chars of project id>`: `packages/core/lib/src/file_system/naming.dart:247-251`.
- Local projects: `SyncNotice(featureName: 'Cloud build')` "Cloud build is not available on local projects" + **Sync to cloud** + opens **Project Sync**: `project_sync_settings.dart:482-522`, `packages/core/lib/src/settings/cloud_build/cloud_build_common.dart:18`; **Clone to Cloud** / **Sync from Local**: `project_sync_settings.dart:364,716`.
- Phone: **Build** chip opens the three tabs: `lib/project/nowago/mobile_build_status.dart:131-140`, `lib/project/nowago/mobile_build_page.dart:59-96`.
- Example prompt "Fix the problems in my project": What's New 3.6 "AI Project Fixer"; analyze tool `features-ai.md` ("What the agent can do").

Assumptions / left out:
- "Stores turn down a build number you already used" and "stores treat a different identifier as a different app" are store-side rules (Apple/Google), not in code. Kept because users hit them; verifier may want to soften.
- Old docs said the icon must be "a minimum resolution of 1024x1024"; the code only enforces a maximum (1024x1024), so the page says "up to".
- The **Claim your Nowa Launch Benefits** row is not mentioned (see General).
- **Permissions** page contents are covered by W11 (`account/project-settings.md`); only a pointer is given here.
- Link targets to other batches' pages assumed from pages.md: `../account/project-settings.md`, `../code/local-projects.md`, `../get-started/mobile.md`, `../ai/index.md`, `../test/share.md`. Explicit anchor `{#app-details}` is on "Check your app details" (linked from android.md and ios.md).

## docs/publish/web.md (Publish to the web)

Research: features-code-ship.md "Web deployment", "Custom Domain", "Deploy button and menu"; features-ai.md "Fix with AI / Explain with AI".

Key claims and refs:
- Publish flow Saving -> Creating (only when the environment has no id) -> Deploying; `gProject.save()`, `flutter analyze` first, errors give **Analysis Failed** (message "Flutter analysis found issues..."), Console opens on **Logs** (`startIndex: 1`, tabs Problems/Logs): `packages/core/lib/src/web_deploy/web_environment_manager.dart:99-159`, `packages/core/lib/src/panels/logs_and_errors_panel.dart:11-16`. Status polling every 4 s: `:295-298`.
- Web tab entry (**Settings** → **Deployment** → **Web**; plan lock "Web deployments are not available on your current plan."): `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:10-70`. Menu path **Deploy** / **Redeploy** / **Cancel**: `lib/project/run/deploy_button.dart:186-196,333-374`. Note the menu path skips the **Your Project has Problems** dialog; only the card's **Publish** button shows it (`packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:251-262,435-457`), so the page says "on the Web tab".
- Card labels ("Your Website", "Expires In:", "Published <date>" / "Not Published", **Download Files**, **Deactivate** with tooltip "Take down the current deployment", button names Publish / Update / Cancel / Republish, status words Saving/Creating/Deploying/Canceling/Deactivating/Failed, address field with "Open in browser" and Copy/Copied!): `web_deploy_widgets/environment_card.dart:54-183`, `environment_widgets.dart:184-375`.
- **Deactivate** has no confirmation dialog: `environment_card.dart:136-149` calls `envManager.deactivate()` directly.
- Failure UI: red bar with title + "Show Details" and **Fix with AI** (`environment_widgets.dart:339-344`), "Error in Deployment" page (`web_deploy_widgets/publishing_error.dart:43-97`). Prompt text "...fix the project, then let me know when it is safe to republish." `environment_widgets.dart:323-326`. **Fix with AI** closes the settings overlay and sends if the chat is idle: `packages/core/lib/src/widgets/fix_with_ai_button.dart:29-43`.
- **Download Files**: browser download on web, save dialog 'Save project' + opens folder on desktop, share sheet on iOS/Android apps (not mentioned): `packages/core/lib/src/web_deploy/web_deploy_service.dart:66-96`, `web_environment_manager.dart:197-214`. Button only when idle and live: `environment_card.dart:126-128`.
- Custom Domain: locked state ("Serve your website from your own domain", **Premium**, "Custom domains are available on higher plans...") and field/validation/switch/DNS strings: `web_deploy_widgets/custom_domain/custom_domain_section.dart:39-226`; DNS page (**DNS Records**, **Verify**, "Pending", "DNS propagation may take up to 48 hours. Refresh to check the status.", Name/Type/Value, copy): `custom_domain/dns_records.dart:20-198`. Section shows only when `isProd && isLive`: `environment_card.dart:42`. Trash icon only when the domain is set: `custom_domain_section.dart:87-101`.
- One environment only; Development removed in 3.8.2: `web_deploy_manager.dart:15-27`; What's New 3.8.2 "Removed the Development environment for Web Preview/Deploy".
- Example prompt "Fix the problems in my project": What's New 3.6.

Assumptions / open questions:
- Step 7 "When the records check out, the page closes and **Custom Domain** shows your domain" is inferred: **Verify** reloads the domain status and pops the page when no DNS records remain (`dns_records.dart:131-136`); `isCustomDomainSet` = `!dnsSetupNeeded` (`web_environment_manager.dart:66`). Server semantics not visible.
- **Expires In:** appears only when `env.expiresAt != null` (`environment_card.dart:66-72`); which accounts get an expiring site is not visible client-side. The page says only that the countdown is the time left.
- No UI to remove a pending (not yet verified) custom domain: the trash icon needs `isCustomDomainSet` and **Set** is replaced by **DNS** once records exist (`custom_domain_section.dart:87,139-166`). Not documented; possible product gap.
- What happens to the live address or custom domain after **Deactivate** then **Publish** is server-side; the page makes no promise (it only says Publish puts the app online again).
- Format of the **Download Files** archive is not shown in the client (default web workflow zips `build/web.zip`, `codemagic_file.dart:59-65`), so the page does not name a format.
- The generated web address (host name) is server-provided; no format documented.

## docs/publish/android.md (Publish to Google Play)

Research: features-code-ship.md "Android builds", "Build history and build details", "Deploy button and menu"; features-data.md/W16 for the SHA link target (`integrations/firebase/auth.md`).

Key claims and refs:
- Android tab, **Debug mode** switch and its note, Release shows the signing card, default is Release (debug off): `packages/core/lib/src/settings/deployment_settings.dart:160-270`. Debug workflow needs no variables, Release needs `CM_KEYSTORE`, `CM_KEYSTORE_PASSWORD`, `CM_KEY_ALIAS`, `CM_KEY_PASSWORD`: `packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:630-680`.
- **Signing Key** card states (icon + hover message; "Loading...", "Saving changes..." always visible), **Generate**, **Important!** dialog + **Download**, form fields/validators/extensions (`jks`, `keystore`), **Save**, **SHA-1**/**SHA-256** rows with "Copy SHA-1/256", **Download Signing Key**, **Remove**: `.../cloud_build_v2/ui/android_signing_key_card.dart:10-297,302-328`; dialog text `.../ui/warning_dialogs.dart:5-33`; **Remove** confirm ("Are you sure?", "You won't be able to undo this action.", **No**/**Yes**): `.../ui/remove_button_with_confirmation.dart:15-76`; **Browse**: `.../ui/file_picker_field.dart:77-82`.
- Zip name and content (`android_signing_key.zip` = `keystore.jks` + `key_info.txt` with Alias / Key Password / Keystore Password), save dialog title: `workflow_manager.dart:321-369`. **Remove** deletes the four variables: `:371-391`.
- Fingerprints are computed server-side from the saved keystore (`packages/core/lib/src/cloud_build_v2/keystore_fingerprints.dart:15-27`); Firebase page offers **Add** for them: `packages/data/lib/src/firebase/setup/views/fb_sha_keys_management.dart:36-122`.
- Artifacts: Debug `build/**/outputs/flutter-apk/*.apk`; Release `.aab`, `.apk`, `mapping.txt`, `flutter_drive.log` (default yaml): `packages/core/lib/src/file_system/codemagic_file.dart:14-57`. Artifact click opens the short-lived URL externally: `.../ui/current_build_card.dart:318-343`. No Google Play publishing step exists in the Android workflows (so "Nowa doesn't upload to Google Play").
- **Bundle Identifier** is the Android applicationId (`rename.dart:46-72`).
- Android Release row shows **Set up** until the key is saved: `deploy_button.dart:290-291`; **Build** disabled with "Finish the workflow configuration above": `workflow_details_page.dart:373-379`.

Assumptions / open questions:
- Artifact list contents (".aab and .apk") come from the client's default `codemagic.yaml`; the server may differ. The page says "lists an app bundle (`.aab`) and an `.apk`".
- Store-side statements: "Google Play takes the app bundle" (linked to Android docs), Play App Signing note (linked to Google Help 9842756). Links not fetched.
- The code does not say a Debug build "can't be published to Google Play"; the page only says debug builds are for quick tests and unsigned (UI wording).
- I did not document the Android `applicationId`/package change side effects beyond the one sentence.

## docs/publish/ios.md (Publish to the App Store)

Research: features-code-ship.md "iOS builds", "Build history and build details", "App details for store builds". Keeps `{#apple-distribution-certificate}` on "Add a distribution certificate" (app link `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:525`, shown as **Documentation** on a failed **iOS code signing** step, `:483-491,518-530`).

Key claims and refs:
- iOS tab: single **Distribution Certificate** card that also holds the **App Store Connect** section: `packages/core/lib/src/cloud_build_v2/ui/ios_details.dart:13-347`. Tab and plan lock "iOS builds are not available on your current plan.": `deployment_settings.dart:274-327`.
- **Generate** -> warning dialog (**Important!**, 3-active-certificates text, **Cancel** / **Generate anyways**) -> **Important!** dialog with **Download** ("If you lose this certificate, you will not be able to sign other iOS apps and you will have to generate a new one."): `ios_details.dart:105-130`, `warning_dialogs.dart:5-71`. Download saves `ios_distribution_certificate_key.p12` (save dialog title 'Save the iOS distribution certificate private key'): `workflow_manager.dart:442-464`.
- Upload: **Certificate Private Key**, extension filter `p12`, **Browse**, **Save**: `ios_details.dart:142-175`, `file_picker_field.dart:39-83`; read with `utf8.decode` (`packages/core/lib/src/file_system/encoding.dart:8-10`, `workflow_manager.dart:418-440`) so the file must be text.
- **Remove** only deletes variable `CERTIFICATE_PRIVATE_KEY`: `workflow_manager.dart:466-483`; confirm popup `remove_button_with_confirmation.dart:36-76`.
- App Store Connect form: **Key ID**, **Issuer ID** (errors "Key ID is required", "Issuer ID is required"), **Private Key File** (`p8`, `pem`, editable so you can paste, 5 lines), **Save**, tooltips **Change credentials** / **Discard changes**, status "Missing App Store Connect credentials" / "App Store Connect credentials saved": `ios_details.dart:184-347`. Status messages show on hover only (`MessageIndicator`, `android_signing_key_card.dart:302-328`).
- BUNDLE_ID is written from `AppNameService.model.bundleId` only inside `saveAppStoreConnectCreds` and updated when different: `workflow_manager.dart:485-548` (answers the research open question: re-save the credentials after changing the Bundle Identifier). Build needs all five variables (`workflow.variables`, `:693-699`; `missingConfiguration` `:401`).
- What the iOS build does (default yaml): Install pods, **iOS code signing** (`app-store-connect fetch-signing-files "$BUNDLE_ID" --type IOS_APP_STORE --create`), dependencies, `flutter build ipa --release`; artifacts `.ipa` + logs; `publishing: app_store_connect` with the saved API key; instance `mac_mini_m1`: `packages/core/lib/src/file_system/codemagic_file.dart:78-125`. No `submit_to_testflight` / `submit_to_app_store` flags, so Nowa stops at the upload (the page says so). Older changelog: "if App Store deployment failed at the publishing stage (last stage) you will know exactly why" (`docs/new/change-log.md:264`).
- Failed-step actions: `BuildActionTile` shows **Documentation** (only for the step named `iOS code signing`) and **Explain with AI**: `current_build_card.dart:483-491`.

Assumptions / open questions:
- "Nowa stops at the upload", "build shows up in App Store Connect once Apple has processed it", TestFlight/review pointers: derived from the default yaml plus Apple behavior; the server's yaml might differ. Apple Help root link used rather than deep links.
- Apple-side steps (register bundle ID, create app, create API key; "download the key only once") are brief and linked, not step-by-step. The old docs' API key access level ("Admin or App Manager") is not in code and was left out; consider adding after an Apple-side check.
- The old docs' "use the same certificate for all updates or Apple rejects the update" was dropped (not in code; not accurate for Apple in general). The page only passes on Nowa's own advice to reuse one certificate.
- Whether **Generate** creates the certificate in the Apple account immediately or at build time is server-side. The page avoids saying when.
- Which exact key format users with an existing certificate have is unclear (see product-issue candidate in General); the page says only that Nowa reads the file as text.
- "builds and signs ... in the cloud, so you don't build on your own computer": cloud builds on Apple hardware (`instance_type: mac_mini_m1`).
