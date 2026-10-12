# W8 review: Publish (`docs/publish/`)

Verifier: W8 (Opus). Source of truth: `/home/user/nowa-master` (v3.12.5, b84bfdafd). Refs are `path:line` relative to that repo.
Status: complete (all six pages checked, fixed and logged below).

## Summary

- **Pages checked:** 6 (`index.md`, `web.md`, `android.md`, `ios.md`, `builds.md`, `download-code.md`).
- **Claims checked:** 150 rows in the tables below (a row can group several labels or steps). Verdicts: 122 ok, 26 fixed, 2 removed.
- **Edits:** 18 edits, about 28 individual text changes, across the six pages. No label, menu path or tab name in the Deploy menu or the Deployment page was wrong: the writer's labels matched the code (Deploy menu rows and buttons, **Android** / **iOS** / **Web** tabs, **Debug mode**, **Signing Key**, **Distribution Certificate**, **App Store Connect**, **Start New Build**, **Active Build** / **Latest Build**, **History**, **Custom Domain**, **DNS Records**, **Verify**).
- **Most serious fixes:**
  - `index.md`: **Set up** also covers the iOS distribution certificate (page named only Android key and App Store Connect); a **Premium** row opens the upgrade dialog, not its tab; store-side rules (stores reject a used build number, a different ID is a different app) removed or reduced to the code's own helper text; Android Release row no longer implies Nowa uploads to Google Play.
  - `web.md`: **Creating** is not only for the first publish; **Publish Failed** no longer claims a "build or hosting step"; DNS Records has copy icons for Name and Value only; **Verify** closes the page when no DNS records remain (the old text said the field then "shows your domain"); **Fix with AI** sits below the bar and waits in the box when the chat is busy.
  - `android.md`: deep Google Help IDs (not fetchable here) replaced by top-level pages; the Play App Signing note now points to an official page that was fetched; release artifacts hedged as the default build file's.
  - `ios.md`: "every build is sent" and "two things from Apple" corrected; unsupported "shows up once Apple has processed it" removed; "Nowa stops at the upload" now "By default", with TestFlight and review left to Apple's help.
  - `builds.md`: **Init Repository** selects the branch itself; "from your project's Git repository" removed; `codemagic.yaml` and **Reset to default** described as the editor shows them (button only when the file has an error).
  - `download-code.md`: "standard Flutter project" softened (zip contents are server-side).
- **Gating verified:** Cloud + Paid badges on index, web, android, ios, builds; Cloud only on download-code (usage grant, the code never says "paid plans" there). Custom domain: "higher plans" as in the code. No prices, credit amounts or plan limits on any page (D3).
- **Structure checks (script, all pages):** front matter complete, no H1, no `---` in bodies, no emoji, no hype words, headings sentence case, at most 2 admonitions, 7 capture placeholders well formed and matching `captures/requests/W8.md`, every relative link and anchor resolves (43 internal links). Anchors kept: `index.md#app-details`, `ios.md#apple-distribution-certificate`. Word counts (body): index 915, web 847, android 791, ios 937, builds 801, download-code 440.
- **External links:** fetched with HTTP 200: developer.android.com (app-signing, app-bundle, publish), developer.apple.com (programs/enroll, help/account, help/app-store-connect, appstoreconnectapi creating-api-keys). Not fetchable from here (egress policy): support.google.com, play.google.com, appstoreconnect.apple.com, docs.flutter.dev; all four are official roots and no deep numeric Google Help IDs remain.
- **Open issues:** see the last section.

## docs/publish/index.md (Get ready to publish)

Front matter, anchor `{#app-details}`, capture placeholder `publish-index-1`, one admonition, no H1, no `---`, headings in sentence case: ok. 957 words before edits.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Deploy** button in the top bar, next to **Run**; label **Deploying** while anything builds | ok | `lib/project/top_bar.dart:333`, `lib/project/run/deploy_button.dart:100` | Playground gets **Save** instead (`top_bar.dart:332`). |
| Menu rows in order **Web**, **Android Debug**, **Android Release**, **iOS** with a status each | ok | `deploy_button.dart:361`, `workflow_manager.dart:635,661,687`, order `deploy_button.dart:62-66` | Section header is shown upper-case ("DEPLOY"); the page does not quote it. |
| Web row status: **Not published yet**, **Publishing…**, **Last publish failed**, host name of live site | ok | `deploy_button.dart:340-343` | Falls back to "Live" if the URL has no host; not worth a mention. |
| Web buttons **Deploy** / **Redeploy** (live) / **Cancel** (while publishing) | ok | `deploy_button.dart:347-357` | |
| Mobile status **Not deployed yet**, `<status>…` while building, **Deployed** / **Failed** / **Canceled** + relative time | ok | `deploy_button.dart:308-322`, `_relativeTime` `:376-382` | Other finished statuses show `<status> <time>`; fine. |
| **Set up** replaces **Deploy** on a mobile row when something is missing | fixed | `deploy_button.dart:290-291`; required variables `workflow_manager.dart:661-700` | Page named only "a signing key, App Store Connect credentials or a Git repository". iOS also needs the distribution certificate (5 variables incl. `CERTIFICATE_PRIVATE_KEY`). Reworded: Android signing key, iOS distribution certificate or App Store Connect credentials, or a Git repository. |
| **Set up** opens the **Deployment** page where you pick the tab | ok | `deploy_button.dart:220-222` (`_openSettings` defaults to the Android tab) | Matches the writer's product-issue note (iOS row opens Android tab); wording "where you pick the tab you need" stays true. |
| **Premium** replaces the button when the plan lacks the target; click shows **Time to level up** | ok | `deploy_button.dart:283-288`, `nowa_dialogs.dart:111-112,176` | Pill reads "Unavailable" only on native iOS/Android Nowa (`billing_models.dart:4`), not documented (D15). |
| Plan gates: web = `webPreviewDeploys`; Android Debug, Android Release, iOS = `cloudBuilds`; wording "paid plans" | ok | `deploy_button.dart:56-61,188,287` | No plan names or numbers on the page (D3). Paid + Cloud badges justified. |
| Tab shows a lock with an **Upgrade** button when the plan lacks the target | ok | `entitlement_consumer.dart:88-111`, `deployment_settings.dart:222,317`, `web_build_settings.dart:32` | |
| Click a live **Web** row opens the site; "any other row opens its tab" | fixed | `deploy_button.dart:301-303,366-370` | A row that shows **Premium** opens the upgrade dialog instead (web row `:368-369`, mobile rows `:301-302`). Added. |
| **Advanced build settings** opens **Deployment** with **Android**, **iOS**, **Web** tabs; mobile tabs list past builds | ok | `deploy_button.dart:260`, `deployment_settings.dart:50-55,121-130,148-327` | macOS tab exists only in debug builds (`kDebugMode`), not documented. |
| Local projects: no **Deploy** button; **Settings** → **Deployment** shows "Cloud build is not available on local projects" and **Sync to cloud** | ok | `deploy_button.dart:21`, `cloud_build_common.dart:18`, `project_sync_settings.dart:516,522`, same notice on all three tabs (`deployment_settings.dart:19`, `web_build_settings.dart:19`) | |
| **Sync to cloud** opens **Project Sync**; **Clone to Cloud** makes a cloud copy; **Sync from Local** brings changes over | ok | `project_sync_settings.dart:25,520,716,364` | After a clone Nowa opens the cloud copy (`:653`, `_executeClone`). **Sync from Local** sits on the Cloud Project card. W10 covers details. |
| Playground: **Save** first; no **Deploy** button; Deployment and Permissions hidden there | ok | `lib/sandbox/sandbox_save.dart:44`, `project_settings.dart:25` | Button text is **Save**, or **Save to keep changes** when there are unsaved edits. |
| Phone: **Build** opens the **Android**, **iOS**, **Web** tabs | ok | `lib/project/nowago/mobile_build_status.dart:140`, `mobile_build_page.dart:74-76`; `useMobileShell` includes phone-sized web browsers (`packages/nowa_ui/lib/src/globals/responsive_utils.dart:63-68`) | Fits D15 (mobile browser layout stays documented). |
| Gear icon **Settings** → **Project Details** | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:752-760`, `project_detail_settings.dart:16` | |
| **App Name** = name under the app icon | ok | `project_detail_settings.dart:131-136` | |
| **Bundle Identifier**: letters and digits separated by dots; error **Invalid package name**; placeholder starts with `com.example` | fixed | `project_detail_settings.dart:120-121`, `naming.dart:247-251` | Regex also requires the first character to be a letter; added "starting with a letter". |
| Bundle Identifier: "stores treat a different identifier as a different app" | fixed | helper text `project_detail_settings.dart:142-145` ("used to identify the app in any app store") | Store-side rule, not in code. Reduced to the code's own statement (stores use the ID to identify the app) plus the advice to settle on it before the first upload. |
| **Build version**: three numbers separated by dots | ok | `project_detail_settings.dart:296` (`^\d+\.\d+\.\d+$`) | |
| **Build number**: whole number | ok | `project_detail_settings.dart:318` (`^\d+$`) | |
| **Build number**: "stores turn down a build number you already used" | removed | not in code | Store-side rule. Kept only the advice "Raise it before each new store upload". |
| **App Icon**: **Change all**, tiles **Android**, **iOS**, **Web**, **macOS**; limit 1024 x 1024 | ok | `app_icon_settings.dart:185`, `app_icon_manager.dart:22-28,171` | Code enforces a maximum only ("Icon must be 1024x1024 or smaller"); page says "up to". Hover label is **Change Icon** (`app_icon_settings.dart:145`). |
| **Package Name** read-only, not visible to users | ok | `project_detail_settings.dart:222-233` | Editable only in debug builds (`:208`). |
| **Settings** → **Permissions**; iOS message editable | ok | `permission_settings.dart:12,101`; iOS defaults `permissions_service.dart:153-200` | Value editor shows for enabled iOS items only. |
| Tip: "Publishing to the web stops when Nowa finds errors" | ok | `web_environment_manager.dart:128-153` (`flutter analyze`, "Analysis Failed") | Web only; no analysis step in the mobile builds (client side). |
| Tip prompt text | fixed | What's New 3.6 "AI Project Fixer": "Fix problems in my project" | Page said "Fix the problems in my project."; aligned with the quoted phrase. |
| "Nowa sends an iOS build to your App Store Connect account" (intro, table) | ok (kept) | default yaml `codemagic_file.dart:120-124` (`publishing: app_store_connect`), `docs/new/change-log.md:264` | Supported by the client's default build file and the changelog; no claim about what happens after the upload is made on this page. |
| Android Release row: "A signed build that you upload to Google Play" | fixed | helper text `deployment_settings.dart:240` ("store-ready release builds") | Nowa has no Google Play step (no mention in code). Reworded to "A signed, store-ready build that you upload to Google Play yourself." |
| Links: `./web.md`, `./android.md`, `./ios.md`, `./builds.md`, `./download-code.md`, `../account/project-settings.md`, `../code/local-projects.md`, `../get-started/mobile.md`, `../ai/index.md`, `../test/share.md` | ok | files exist in `docs/` | Checked with a script (see end of log). |

Net change: 6 text changes (1 row reworded, 2 store-side claims reduced, 1 iOS-prerequisite omission fixed, 1 click-behaviour omission fixed, 1 prompt text aligned).

## docs/publish/web.md (Publish to the web)

Front matter, two capture placeholders (`publish-web-1`, `publish-web-2`), two admonitions (tip, note), no H1, no `---`: ok. About 900 words after edits.
Paths in `packages/core/lib/src/web_deploy/` unless noted.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Cloud + paid badges; "Use a cloud project on a paid plan" | ok | `lib/project/run/deploy_button.dart:188`, `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:19-32` | Message "Web deployments are not available on your current plan." |
| Publishing runs `flutter analyze` first and stops on errors | ok | `web_environment_manager.dart:118-153` (`result.hasErrors`, severity `error` only: `flutter_service.dart:189`) | Warnings and infos do not stop it. |
| Path 1: **Deploy** → **Deploy** on **Web** row; or **Settings** → **Deployment** → **Web** tab → **Publish** | ok | `deploy_button.dart:186-196`, `deployment_settings.dart:13,16`, `environment_widgets.dart:299` | |
| Status words **Saving**, **Creating**, **Deploying**; Nowa saves, checks, builds and hosts | ok | `environment_widgets.dart:361-368`, `web_environment_manager.dart:99-135` | Check (analyze) happens while the status already reads **Deploying**; the page's order of events is still right. |
| **Creating** "when Nowa first sets up your site" | fixed | `web_environment_manager.dart:104-112`, `web_deploy_service.dart:145-153` | **Creating** runs whenever the Production environment has no id (placeholder from `getWebPreviews`), not only on the first publish. Reworded to "only when Nowa has to set up your site first". |
| **Cancel** stops a publish | ok | `environment_widgets.dart:296` (button reads **Cancel** while deploying), `deploy_button.dart:347-352`, `web_environment_manager.dart:162-181` | On the Web tab **Cancel** appears in the **Deploying** phase; the menu row shows it from **Saving** on. |
| **Your Website** card, **Published** + date, address below, `Not Published` when off | ok | `environment_card.dart:65,89-90`, `environment_widgets.dart:186-215` | |
| Open icon tooltip **Open in browser**; copy icon **Copy** (then **Copied!**) | ok | `environment_widgets.dart:220,400` | |
| **Your Project has Problems** dialog on the Web tab **Publish** with **Close** / **Ignore and Publish**, when Problems lists anything | ok | `environment_widgets.dart:251-262,435-457`; `problem_service.dart:92-94` (`hasProblems` = any problem) | The Deploy menu path skips this dialog (`deploy_button.dart:196`); the page scopes it to the Web tab. |
| **Expires In:** countdown | ok | `environment_card.dart:66-72`, `environment_widgets.dart:109-176` | Only shown when the environment has an expiry; page makes no claim about which sites. |
| Failure: red bar with the title, button reads **Republish** | ok | `environment_widgets.dart:297,323-344`, `publishing_error.dart:7-45` | Bar ends in the underlined **Show Details**. |
| **Analysis Failed**; Console opens on **Logs** tab | ok | `web_environment_manager.dart:126-142`, `logs_and_errors_panel.dart:11-16` (tab 1 = Logs) | Console opens only if the call has a mounted context. |
| **Publish Failed** "means the build or hosting step failed" | fixed | `web_environment_manager.dart:80,153` | Step names are server-side. Reworded to "means the publish job failed"; **Show Details** → **Error in Deployment** page (`publishing_error.dart:89`) stays. |
| **Fix with AI** "next to the bar" | fixed | `environment_widgets.dart:339-344` | The button sits below the bar (Column), changed to "below". |
| **Fix with AI** closes Settings, sends the log to the chat | fixed (detail added) | `fix_with_ai_button.dart:29-43`, prompt `environment_widgets.dart:323-326` | It sends only if the chat can send; otherwise the prompt stays in the box. Added one sentence. |
| Tip prompt "Fix the problems in my project" | fixed | What's New 3.6 | Aligned to "Fix problems in my project". |
| **Update** on the Web tab; **Redeploy** in the Deploy menu; same address | ok (note) | `environment_widgets.dart:298`, `deploy_button.dart:356` | Update redeploys to the same environment id (`web_environment_manager.dart:146`); the address field reads the environment's `generatedPreviewUrl`. Same address is inferred from that, not stated in code. |
| **Deactivate** (tooltip "Take down the current deployment"); no confirmation | ok | `environment_card.dart:136-149`, `web_environment_manager.dart:184-196` | Calls `removeWebPreview` directly. |
| "takes the site down right away" | fixed | n/a | How fast the site goes offline is server-side; now "without asking you to confirm". |
| **Publish** puts the app online again after deactivating | ok | `environment_widgets.dart:299` | No promise about the address (server-side), as the writer intended. |
| **Download Files** once live; browser download on web, save dialog + folder opens on desktop | ok | `environment_card.dart:126-128,175`, `web_environment_manager.dart:198-214`, `web_deploy_service.dart:88-93` (dialog title "Save project") | Share sheet on native iOS/Android Nowa not documented (D15). Archive format not named: correct. |
| **Custom Domain** needs a higher plan; **Premium** | ok | `custom_domain_section.dart:39-55` | Wording "higher plans" is the code's. |
| Field appears once the site is live | ok | `environment_card.dart:42` | Only for the Production environment. |
| Domain without `www.`; **Please remove "www."** | ok | `custom_domain_section.dart:81-82` | Empty field: "Please enter a valid domain". |
| Switch **Also www.** + domain | ok | `custom_domain_section.dart:176-205` | Shown once the field has text. |
| **Set** → **DNS** | ok | `custom_domain_section.dart:139-166` | |
| **DNS Records** page: **Name**, **Type**, **Value**, copy icons | fixed | `dns_records.dart:83-96,167,192` | Copy icons exist next to Name and Value only (not Type). Page said "a copy icon for each"; reworded. |
| "Add every record in your provider's DNS settings" | ok | `dns_records.dart:38-44` ("You must copy the records below and paste them into your DNS provider.") | |
| **Verify**; up to 48 hours; **Pending** | ok | `dns_records.dart:48,60,127-145` | "Pending" is a fixed label on the page. |
| "When the records check out, the page closes and **Custom Domain** shows your domain" | fixed | `dns_records.dart:134` | The page closes when `dnsRecords` is empty; the field already showed the typed domain. Reworded to what the code does: closes once Nowa no longer lists DNS records to add. |
| After the domain is set, the field and **Also www.** are locked; trash icon (**Remove custom domain**) to start again | ok | `custom_domain_section.dart:73-101,134,191-197` | Locked once `isCustomDomainSet`; switch is also locked as soon as records are active. No UI to remove a still-pending domain (writer's open question 6; product gap, not documented). |
| One live site; Development mode removed | ok | `web_deploy_manager.dart:13-20,58`; `docs/new/whats-new.md:296` | |
| Links: `./index.md`, `../test/problems.md`, `../ai/index.md`, `../new/whats-new.md`, `../test/share.md`, `./download-code.md` | ok | files exist | |

Net change: 8 text changes (4 inaccuracies fixed, 1 omission added, 1 inference trimmed, 2 wording alignments).

## docs/publish/android.md (Publish to Google Play)

Front matter, anchor use `./index.md#app-details`, capture placeholder `publish-android-1`, one admonition (warning), no H1, no `---`: ok. About 850 words.
Paths in `packages/core/lib/src/cloud_build_v2/` unless noted.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Cloud + paid badges, cloud project on a paid plan | ok | `packages/core/lib/src/settings/deployment_settings.dart:217-224` ("Android builds are not available on your current plan.") | |
| Bundle Identifier = Android package name | ok | `packages/core/lib/src/project/rename.dart:48-64`, `file_system/templates/android/app_build_gradle_template.dart:9,47,62` | `applicationId` and `namespace` come from the Bundle Identifier. |
| **Settings** → **Deployment** → **Android** tab; **Debug mode** switch and its note (exact text) | ok | `deployment_settings.dart:13-16,238-241` | Default is Release (switch off, `:162,172`). |
| Debug builds are unsigned and need no key | ok | `ui/workflow_manager.dart:630-641` (`variables => []`) | |
| **Branch** + **Build**; **Start New Build** | ok | `ui/workflow_details_page.dart:394,421,479` | |
| Debug artifact is an `.apk` under **Artifacts** of **Latest Build** | ok (default yaml) | `file_system/codemagic_file.dart:13-32` (`flutter build apk --debug`, artifact `build/**/outputs/flutter-apk/*.apk`) | Latest Build is a collapsed card; it shows only after a first build (`workflow_details_page.dart:98-99`, `current_build_card.dart:15-30`). "Open" is accurate. |
| Deploy menu path: **Android Debug** row | ok | `deploy_button.dart:62-66,324-335` | |
| "run your app instead" link | ok | `../test/run.md` exists | |
| **Signing Key** card; warning icon, hover **Missing signing key** | ok | `ui/android_signing_key_card.dart:55,73` | Card exists only on the Release workflow (`workflow_details_page.dart:88-91`), so "turn **Debug mode** off to see it" is right. |
| **Generate** → **Important!** dialog → **Download** → `android_signing_key.zip` with `keystore.jks` + `key_info.txt` (alias and both passwords) | ok | `android_signing_key_card.dart:104-121`, `warning_dialogs.dart:5-33`, `workflow_manager.dart:321-358` | The key is generated before the dialog opens; the download icon saves the zip again. |
| Own key: **Keystore Password**, **Key Alias**, **Key Password**, **Key File** (`.jks`, `.keystore`), **Browse**, **Save** | ok | `android_signing_key_card.dart:236-290`, `file_picker_field.dart:80` | Validation messages ("Please enter the keystore password" etc.) not documented. |
| Warning: losing the key blocks new updates; **Remove** deletes it, can't be undone | ok | dialog text `android_signing_key_card.dart:109-111`, `remove_button_with_confirmation.dart:37` | Remove deletes the four variables (`workflow_manager.dart:371-391`). |
| Check mark + hover **Signing key saved** | ok | `android_signing_key_card.dart:79` | |
| **SHA-1** / **SHA-256** rows with copy; **Download Signing Key**; **Remove** asks "Are you sure?" | ok | `android_signing_key_card.dart:94,168-169,196`, `remove_button_with_confirmation.dart:53` | Fingerprints are computed server-side (`keystore_fingerprints.dart:15-27`) and show only when that call succeeds. |
| Firebase can add the fingerprints; link `../integrations/firebase/auth.md#sha-fingerprints` | ok | `packages/data/lib/src/firebase/setup/views/fb_sha_keys_management.dart:36-122`; anchor exists in W16 page | |
| "Services such as Google Sign-In ask for them" | ok | `packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:190-193` | |
| Play App Signing sentence + link to support.google.com answer 9842756 | fixed (shortened) | not in code; checked https://developer.android.com/studio/publish/app-signing (HTTP 200, text: fingerprints of upload and app signing certificates are on the Play Console app signing page) | Deep Google Help ID could not be fetched (host blocked by the egress policy), so the link now points at the verified Android developer page. |
| **Build** stays off until the key is saved; **Set up** on the **Android Release** row until then | ok | `workflow_details_page.dart:374,479`, `deploy_button.dart:290-291` | |
| Release artifacts `.aab` and `.apk` | fixed (hedged) | default yaml `codemagic_file.dart:33-63` (artifacts `.aab`, `.apk`, `mapping.txt`, `flutter_drive.log`) | The yaml is the client's "Reset to default" content; the server's file could differ. Now "By default, a release build lists...". |
| "Upload the `.aab`", Android App Bundles link | ok | https://developer.android.com/guide/app-bundle (HTTP 200) | |
| "Nowa doesn't upload to Google Play for you" | ok | no Android `publishing` section in the default yaml (`codemagic_file.dart:33-63`); no Google Play strings in `cloud_build_v2`, `settings`, `lib` (grep) | |
| Google deep links 9859152 and 9859348 | fixed | n/a | Not fetchable here (blocked host). Replaced by the Play Console Help top-level page and https://developer.android.com/studio/publish (HTTP 200). `play.google.com/console` kept (official root). |
| Release an update: raise **Build number** (and **Build version**), same key, upload new `.aab` | ok | `settings/pubspec_manager.dart:63` (`version: name+number`), gradle template `versionCode = flutter.versionCode`, `versionName = flutter.versionName` (`app_build_gradle_template.dart:67-68`) | Code supports the mapping of Build number to the Android version code. |
| Links: `./index.md#app-details`, `./builds.md`, `./ios.md`, `./download-code.md`, `../test/run.md` | ok | files and anchor exist | |

Net change: 4 text changes (store-side link and note replaced by a verified official page and shortened, artifact claim hedged, deep Google IDs replaced).

## docs/publish/ios.md (Publish to the App Store)

Front matter, anchors `{#apple-distribution-certificate}` (kept; the app opens `/deployment/ios-deploy#apple-distribution-certificate` from the failed **iOS code signing** step, `current_build_card.dart:525`) and the internal link `#if-the-ios-code-signing-step-fails` (heading exists), capture placeholder `publish-ios-1`, no admonitions, no H1, no `---`: ok. About 1,000 words.
Paths in `packages/core/lib/src/cloud_build_v2/` unless noted.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Cloud + paid badges, cloud project on a paid plan | ok | `packages/core/lib/src/settings/deployment_settings.dart:312-319` ("iOS builds are not available on your current plan.") | |
| Intro: "two things from Apple ... every build is sent to your App Store Connect account" | fixed | `ui/ios_details.dart:105-130` (Generate), default yaml `file_system/codemagic_file.dart:120-124` (`publishing: app_store_connect`) | The distribution certificate key can be generated by Nowa, so it is not "from Apple"; "every build" overstated (failed builds are not sent). Reworded. |
| Bundle ID on Apple's side must match the Bundle Identifier in Nowa | ok | `ui/workflow_manager.dart:485-501` (`BUNDLE_ID` = Nowa's Bundle Identifier, passed to `fetch-signing-files "$BUNDLE_ID"`, `codemagic_file.dart:98-104`) | Register-the-ID and create-the-app steps are Apple-side; kept as short pointers with official links. |
| Apple links | ok | checked HTTP 200: `developer.apple.com/programs/enroll/`, `/help/account/`, `/help/app-store-connect/`, `/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api`; `appstoreconnect.apple.com` kept (official root, not reachable here) | Apple's key doc confirms "available for download a single time", matching "Apple lets you download it only once". |
| iOS tab: **Distribution Certificate** card holds the **App Store Connect** section | ok | `ios_details.dart:59,242` | |
| Warning icon, hover **Missing App Store Connect credentials**; check mark **App Store Connect credentials saved** | ok | `ios_details.dart:260,266` | |
| **Key ID**, **Issuer ID**, **Private Key File** (`.p8`, `.pem`; paste allowed; 5 lines), **Browse**, **Save** | ok | `ios_details.dart:296-335`, `file_picker_field.dart:80` | Errors "Key ID is required" / "Issuer ID is required" not documented. |
| Bundle Identifier saved with the credentials; re-save after changing it; pencil **Change credentials**; X **Discard changes** | ok | `workflow_manager.dart:485-548`, `ios_details.dart:273` | |
| **Generate** → **Important!** warning (3 active certificates, build fails, revoke breaks builds) → **Generate anyways** / **Cancel** | ok | `ui/warning_dialogs.dart:36-71` | Page text matches the dialog. |
| Second **Important!** dialog → **Download** → `ios_distribution_certificate_key.p12`; losing it means generating a new one | ok | `ios_details.dart:105-130`, `workflow_manager.dart:442-464` (save dialog title "Save the iOS distribution certificate private key") | |
| **Missing distribution certificate**; **Distribution certificate saved** | ok | `ios_details.dart:77,83` | |
| Own key: **Certificate Private Key**, `.p12` filter, **Browse**, **Save** | ok | `ios_details.dart:151-169` | |
| "Nowa reads this file as plain text" | ok | `workflow_manager.dart:425` (`binaryToText`), `file_system/encoding.dart:8-10` (`utf8.decode`) | Product-issue candidate (a binary `.p12` would fail) stays in the writer's notes; page is worded safely. |
| Download icon **Download Certificate**; **Remove** asks "Are you sure?" and deletes Nowa's copy | ok | `ios_details.dart:98`, `workflow_manager.dart:466-483` | Only `CERTIFICATE_PRIVATE_KEY` is deleted. |
| **Build** stays off until certificate and credentials are saved | ok | `workflow_manager.dart:401,693-699` (five variables) | |
| Build steps: **iOS code signing**, `.ipa`, **Publishing** stage that uploads to App Store Connect | ok (default yaml) | `codemagic_file.dart:84-124`, status `Publishing` `models/build_models.dart:145-158`, `docs/new/change-log.md:264` ("App Store deployment failed at the publishing stage (last stage)") | Supported by the client's default build file and the changelog. The yaml is the "Reset to default" content; the server's file could differ. |
| "The build shows up there once Apple has processed it" | removed | not in code | Apple-side behavior. Page now says only "check your app in App Store Connect". |
| `.ipa` listed under **Artifacts** | fixed (hedged) | `codemagic_file.dart:115-119` (`build/ios/ipa/*.ipa`) | Added "By default". |
| "Nowa stops at the upload. You test with TestFlight or submit for review in App Store Connect" | fixed (hedged) | default yaml has no `submit_to_testflight` / `submit_to_app_store` (`codemagic_file.dart:120-124`); no "TestFlight" string anywhere in the code (grep) | Now "By default, Nowa's part ends at the upload. TestFlight testing and App Store review happen in App Store Connect" with Apple's help link. |
| **Deploy** → **iOS** row; **Set up** until everything is saved | ok | `deploy_button.dart:290-291` | |
| New build: raise **Build number** (and **Build version**) | ok | `settings/pubspec_manager.dart:63` (`version: name+number`) | Flutter reads the build number from there. |
| Failed **iOS code signing** step: read log under **Steps**; **Explain with AI**; **Documentation** | ok | `ui/current_build_card.dart:483-491,518-530` | **Documentation** is shown only for the step named exactly `iOS code signing`. |
| Apple's limit of three active certificates "is one known cause" | ok | `warning_dialogs.dart:55-61` | |
| Links: `./index.md#app-details`, `./builds.md`, `./android.md`, `./index.md` | ok | files and anchors exist | |

Net change: 4 text changes (intro corrected, unverifiable post-upload claim removed, two default-yaml claims hedged).

## docs/publish/builds.md (Build history and logs)

Front matter, capture placeholder `publish-builds-1`, no admonitions, no H1, no `---`: ok. About 850 words.
Paths in `packages/core/lib/src/cloud_build_v2/` unless noted.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Cloud + paid badges | ok | `deploy_button.dart:188,287` | |
| **Settings** → **Deployment** → **Android** / **iOS** tab; **Debug mode** picks the Android build | ok | `deployment_settings.dart:121-130,160-270` | |
| **Start New Build**: **Branch** menu defaults to the checked-out branch | ok | `ui/workflow_details_page.dart:354,394,421` | |
| Reminder "Starting a build will commit all changes to the selected branch." above **Build** | ok | `workflow_details_page.dart:464` | |
| **Init Repository** replaces the menu when there is no repo; "then pick the branch" | fixed | `workflow_details_page.dart:425-427` | After `initRepo()` the code selects the checked-out branch itself. Reworded. |
| Deploy menu text "Connect a repository in settings to deploy to the app stores." | ok | `lib/project/run/deploy_button.dart:244` | |
| Deploy menu path builds the checked-out branch | ok | `deploy_button.dart:178` | |
| Four **Build** hints and their fixes (exact strings), plus "Missing configuration. Check your workflow settings above" | ok | `workflow_details_page.dart:374-377,399` | |
| Quota dialog **Time to level up** with the quota message; no numbers | ok | `workflow_details_page.dart:358-370`, `nowa_dialogs.dart:112` | Check runs only on the **Build** button (the Deploy menu path has none client-side); page does not claim otherwise. |
| **Active Build** card: status + **Cancel** | ok | `ui/current_build_card.dart:42,304-308` | |
| Status list (8 running, 5 final) | ok | `models/build_models.dart:145-158` | All 13 values exist, including **Initializing**. Status is polled every 5 s (`workflow_manager.dart:205`); page says "every few seconds". |
| Top-bar button reads **Deploying**; menu row shows the status | ok | `deploy_button.dart:100,300-312` | |
| **Latest Build** card, header toggles open/closed | ok | `current_build_card.dart:12-60` | Collapsed unless a build is active. |
| **Build Info**: ID, **Status**, **Branch**, **Started**, **Duration** only when finished | ok | `current_build_card.dart:169-177` | |
| **Artifacts**: click downloads in the browser | ok | `current_build_card.dart:326-343` (external browser) | Section appears only when the build has artifacts (`:178`). |
| Download links short-lived; reopen the build from **History** | fixed (trimmed) | field `shortLivedDownloadUrl` `models/build_models.dart:54-68`; details re-fetched on open `current_build_card.dart:121-135` | "for a fresh link" was a server-side inference; now "to reload its files". |
| **Steps**: status icon, duration, click for the log | ok | `current_build_card.dart:200-206,361-516` | "No logs available" shown when empty (`:428`). |
| Failed step: **Explain with AI** sends failure + end of log; **Documentation** on **iOS code signing** | ok | `current_build_card.dart:483-491`, `fix_with_ai_button.dart:9-14` (last 4,000 characters; number not on the page) | |
| **History**: newest first, status icon, "how long ago", pagination "1 of 3", "No builds yet" | ok | `workflow_details_page.dart:114-335`, newest first from `lastBuild = buildHistory.firstOrNull` (`workflow_manager.dart:128`) | |
| Row opens **Build Details** with the same sections | ok | `ui/build_details_page.dart:36,46` | |
| "Builds run in Nowa's cloud from your project's Git repository" | fixed | commit message `workflow_details_page.dart:464`, `startBuild(branch:)` `workflow_manager.dart:249` | "from your project's Git repository" not shown in code; page now says Nowa commits to the chosen branch and the build starts from it. |
| "If your project has a `codemagic.yaml`, it defines the build steps" | fixed (hedged) | `file_system/codemagic_file.dart:5-9`; workflow ids match the yaml keys (`workflow_manager.dart:632,658,684`); the client never creates the file | Now "may contain a `codemagic.yaml` file with the build steps". |
| **Reset to default** in code mode when the file has an error | fixed (detail added) | `widgets/code_editor/nowa_code_editor.dart:272-290` | The button shows only when the editor reports an error for `codemagic.yaml`; it rewrites the default content. Page now says so. |
| Links: `../account/plans-and-usage.md`, `../ai/index.md`, `./ios.md#apple-distribution-certificate`, `../test/problems.md`, `./android.md`, `./ios.md` | ok | files and anchor exist | |

Net change: 5 text changes (1 behavior detail, 2 inferences trimmed or hedged, 1 detail added for **Reset to default**, 1 download-link sentence trimmed).

## docs/publish/download-code.md (Download your code)

Front matter, capture placeholder `publish-download-code-1`, one admonition (tip), no H1, no `---`: ok. About 490 words.
Paths relative to the repo root.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Cloud badge only (no Paid badge) | ok | `lib/project/download_code_button.dart:27-36,130-142` | The check is a usage grant (`EntitlementKeys.codeDownload`, `packages/core/lib/src/billing/entitlement_keys.dart:4`) and the code never says "paid plans" here, so no Paid badge. |
| Switch to code mode with the `<>` button; tab bar shows the download icon **Code download** | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:722-735` (icon-only toggle), `lib/project/panels/vibe_designer.dart:27-30,62`, `download_code_button.dart:35` | |
| **Compress Project**; project is saved first; **Compressing...** while it works | ok | `download_code_button.dart:93-98,182,250` | Save happens after the plan check. |
| Zip row shows file name and creation time | ok | `download_code_button.dart:204-226` | File name is cut to 10 + "..." + 10 characters when longer than 20; not worth documenting. |
| "zip" (archive format) | ok (note) | `download_code_button.dart:217` (`Icons.folder_zip_outlined`) | The format is not named anywhere in the client; the zip icon is the only evidence. Kept. |
| Web app: browser downloads; desktop: **Save project** dialog, folder opens, "Project downloaded successfully to <path>" | ok | `download_code_button.dart:110-128`, `packages/core/lib/src/services/project_service.dart:156-172` | Web app spinner never resets until the popup closes (writer's product-issue note; not documented). |
| List holds the last compressed zip; before that "Compress your project to download it" | ok | `download_code_button.dart:85,238`, status endpoint `project_service.dart:204-211` (204 = none) | |
| Plan allowance; **Time to level up** with "Looks like you used all your available usage for this feature" + **Upgrade** | ok | `download_code_button.dart:130-142`, `packages/core/lib/src/widgets/nowa_dialogs.dart:111-125` | Dialog also appears when the account has no grant at all. No numbers on the page (D3). |
| Check runs on compress, not on download of an existing zip | ok | `download_code_button.dart:93` vs `:108-128` | |
| "The zip is a standard Flutter project" | fixed | not shown in the client (contents are built server-side) | Reworded to "The zip holds your Flutter project." |
| Flutter install link | ok | https://docs.flutter.dev/get-started/install | Official page; host blocked by the egress policy here, so not fetched. |
| Local projects: nothing to download; **Open in VS Code** in the same spot | ok | `download_code_button.dart:27-30,46-59,146-155` | |
| Tip: GitHub sync needs a plan with Git integration | ok | `packages/core/lib/src/settings/git_settings.dart:35,546` (`EntitlementKeys.github`); matches W10 `docs/code/git.md` "Before you start" | |
| Links: `../account/plans-and-usage.md`, `../code/local-projects.md`, `../code/git.md`, `../code/index.md`, `../code/code-mode.md`, `./web.md` | ok | files exist | |

Net change: 1 text change (unverifiable "standard Flutter project" softened).

## Open issues (not resolved here)

1. **Default `codemagic.yaml` vs the server's.** Artifact lists (Android Debug `.apk`; Release `.aab` + `.apk`; iOS `.ipa`) and the iOS `publishing: app_store_connect` upload come from the client's "Reset to default" content (`packages/core/lib/src/file_system/codemagic_file.dart:13-124`). The pages say "By default" where it matters, but only a real build on a paid test account can confirm what the server runs. The client never creates `codemagic.yaml`.
2. **Launch Benefits row.** The Deploy menu shows **Claim your Nowa Launch Benefits** / **Limited time offer** in v3.12.5 (`lib/project/run/deploy_button.dart:70,322-331`; the URL constant is set). It is promo, so no page mentions it. Add it to `left-out.md` if not already there.
3. **Product issues from the writer's notes, confirmed in code, not documented:** **Set up** on the iOS row opens the Android tab (`deploy_button.dart:220,290-291`); code download in the web app never resets its spinner (`lib/project/download_code_button.dart:110-117`); the iOS **Certificate Private Key** is read as UTF-8 text although the picker filters `.p12` (`workflow_manager.dart:425`); there is no UI to remove a custom domain that is still **Pending** (`custom_domain_section.dart:87-101,139-166`); `_deployMobile`'s comment promises a plan and quota check that the code does not run (`deploy_button.dart:166-184`).
4. **Apple API key role.** The old iOS page required an **Admin** or **App Manager** key; Apple's current key article says team keys carry a role and individual keys cannot use provisioning endpoints, which `fetch-signing-files --create` needs. None of this is in Nowa's code, so the page does not say which key type to create. Worth one real test, then a one-line note.
5. **Which sites get "Expires In:"** and whether a custom domain or address survives **Deactivate** then **Publish** are server-side; the pages make no promise (the address staying the same on **Update** is supported by the same environment id being redeployed and by the old docs).
6. **In-app doc links** still point at the old URLs (`/deployment`, `/deployment/web-deploy`, `/deployment/android-deploy`, `/deployment/ios-deploy#apple-distribution-certificate`); `redirects.md` already maps them to the new pages.
7. **Dev branch (3.13):** string literals in the deploy files match the writer's check; only the app-wide restyle differs (`upcoming-3.13.md`). Not re-checked.
