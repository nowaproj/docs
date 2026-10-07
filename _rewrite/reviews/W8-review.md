# W8 review: Publish (`docs/publish/`)

Verifier: W8 (Opus). Source of truth: `/home/user/nowa-master` (v3.12.5, b84bfdafd). Refs are `path:line` relative to that repo.
The log is written page by page; the **Summary** is filled in last. Status: in progress (index done).

## Summary

(filled in at the end)

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
| "Nowa sends an iOS build to your App Store Connect account" (intro, table) | ok (kept) | default yaml `codemagic_file.dart:119-125` (`publishing: app_store_connect`), `docs/new/change-log.md:264` | Supported by the client's default build file and the changelog; no claim about what happens after the upload is made on this page. |
| Android Release row: "A signed build that you upload to Google Play" | fixed | helper text `deployment_settings.dart:240` ("store-ready release builds") | Nowa has no Google Play step (no mention in code). Reworded to "A signed, store-ready build that you upload to Google Play yourself." |
| Links: `./web.md`, `./android.md`, `./ios.md`, `./builds.md`, `./download-code.md`, `../account/project-settings.md`, `../code/local-projects.md`, `../get-started/mobile.md`, `../ai/index.md`, `../test/share.md` | ok | files exist in `docs/` | Checked with a script (see end of log). |

Net change: 6 edits (1 wrong-ish row reworded, 2 store-side claims reduced, 1 iOS-prerequisite omission fixed, 1 click-behaviour omission fixed, 1 prompt text aligned).
