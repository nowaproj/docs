# P14-B03 verify: account pages

Verifier P14-B03-V. Pages: `docs/account/` `index`, `projects`, `project-settings`, `account-settings`, `workspaces`,
`plans-and-usage`, `help`. Diff checked: `git diff origin/main -- docs/account/`. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Legal pages fetched with curl on 2026-10-12 (both "Last updated:
22 May 2024").

## Summary

(Filled in at the end.)

## plans-and-usage.md

"What your plan includes" was checked row by row against every client-side grant check. `entitlement_keys.dart` has 12
keys; `grep -rn "EntitlementKeys\." lib packages` gives 26 uses in 20 files, plus `PaymentDialog.show` / `PremiumButton(`
calls (all on the same keys). Mapping:

| Key | Where it's checked | Table |
|---|---|---|
| `top_up_credits` | `packages/core/lib/src/billing/widgets/buy_credits_page.dart:69-95`, `packages/core/lib/src/settings/credits_settings.dart:418-422` | row "Buying extra credits" |
| `desktop` | `lib/router.dart:75-81` → `/upgrade`, `lib/upgrade_page.dart:28-31` | row "The desktop app" |
| `github` | `packages/core/lib/src/settings/git_settings.dart:34-38,549-553`, `lib/project/panels/git_panel/git_details.dart:28-32`, `lib/dashboard/dashboard_page.dart:300-306`, `lib/dashboard/create_new_project/start_project_provider.dart:59-64` | row "Git and GitHub" |
| `web_preview_deploys` | `lib/project/run/deploy_button.dart:56,186-190,348-349`, `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:22-34`, `web_deploy_widgets/environment_card.dart:77-78`, `environment_widgets.dart:264-270` | row "Publishing to the web" |
| `web_preview_custom_domain` | `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:39-54` | row "Your own domain" |
| `cloud_builds` | `deploy_button.dart:60-61,273-298` (all three mobile rows), `packages/core/lib/src/settings/deployment_settings.dart:212-224,307-319`, `packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:358-368` (quota) | row "Android and iOS builds" + allowance paragraph |
| `premium_templates` | `packages/core/lib/src/services/templates/add_template_action.dart:28-33` (gate), `:60-75` (**Premium** label in the picker) | row "Premium templates" |
| `external_agent` | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:37-39,78` (menu item only on desktop with the grant), `packages/ai/lib/src/mcp/external_agent_access.dart:81` | row "Connecting your own AI agent" |
| `ai_credits` | `packages/ai/lib/src/ui/content_views.dart:250-298` | allowance paragraph, "When you run out" |
| `code_download` | `lib/project/download_code_button.dart:130-142` | allowance paragraph |
| `max_mode` | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:946,1028`; Max Mode agent has `visibleInDropdown: false` (`packages/ai/lib/src/agent/agent.dart:83-92`, `chat_session.dart:102-105`) | correctly left out (not reachable) |
| `hide_web_preview_banner` | defined only, never checked in the client | correctly left out |

No other plan gate exists in the client: `isFreePlan` only switches button labels (Upgrade / Buy credits / Purchase
Credits), and "Session Limit Reached" (`content_views.dart:437`) is the AI context window, not a plan limit. No row was
removed: every row matches a real check. No prices, credit amounts or plan limits on the page (D3).

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro: requests use the plan's AI allowance, which resets; top up with extra credits | fixed | `usage_settings_page.dart:181-302`, `buy_credits_page.dart:69-95` | Added "if your plan allows it": buying credits is itself gated (`top_up_credits`). |
| Table lead-in "Nowa tells you when you try it and offers an upgrade" | fixed | `ai_chat_panel.dart:78` | Now "usually": for the external agent the menu item is simply hidden. |
| Row: buying extra credits, message and **Upgrade Plan** | fixed | `buy_credits_page.dart:77-90` | Wording: the message is on the page that **Buy credits** opens (header "Extra AI Usage"), not on the button. |
| Row: desktop app, "Upgrade to unlock desktop version, or use on web at app.nowa.dev" after sign-in | ok | `lib/router.dart:75-81`, `lib/upgrade_page.dart:28-31` | |
| Row: Git, "Your plan does not support git integration"; **Clone from GitHub** → **Time to level up** | ok | see mapping; `PaymentDialog` title `packages/core/lib/src/widgets/nowa_dialogs.dart:109` | |
| Row: web publishing, **Web** row shows **Premium** | ok | `deploy_button.dart:348-349`, pill label `nowa_dialogs.dart:161` | |
| Row: custom domain, **Custom Domain** shows **Premium** | ok | `custom_domain_section.dart:43-52` | |
| Row: Android and iOS builds, their **Deploy** rows show **Premium** | ok | `deploy_button.dart:59-61,278-283` | All three mobile rows (Android Debug, Android Release, iOS). |
| Row: premium templates → **Time to level up** | ok | `add_template_action.dart:28-33,60-75` | |
| Row: external agent, "for Enterprise accounts" | fixed | `ai_chat_panel.dart:37-39,78-84`, `ai_options.dart:32-36` (⋮, tooltip **Options**); D18 | Now names the place (**⋮** menu of the **AI Assistant** panel) and the desktop-app limit, in the words of `ai/external-agent.md`. "Enterprise" kept on D18 (user's answer to Q2), although the code never names the plan (its comment says "Granted by the beta plan"). See open issue 1. |
| AI, builds and code downloads have an allowance; upgrade or extra credits when it runs out | ok | `content_views.dart:250-298`, `workflow_details_page.dart:358-368`, `download_code_button.dart:130-142` | |
| Out of credits: project untouched, editing by hand keeps working | ok | only **Send** is gated (`content_views.dart`); no grant check guards editing (mapping above) | |
| Tokens explained | ok | general definition for the on-screen **Input Tokens** / **Output Tokens** counters | |
| Other changed sentences ("Once you've paid", "right now", "so you can see a limit coming", "Know someone...") | ok | tone only | |
| Removed facts | none | | Every `-` line is still on the page in other words. |

Audience: no code-only facts. Plan names: "free plan" (code `free_plan`, `billing_models.dart:45`), "Starter" only in the
untouched image alt text (default badge, `usage_settings_page.dart:313`), "Enterprise" (D18).

## account-settings.md

"Your data and privacy" was checked sentence by sentence against the raw text of both legal pages
(https://nowa.dev/terms-and-conditions/ and https://nowa.dev/privacy-policy/, both "Last updated: 22 May 2024").

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "What you build in Nowa is yours." | removed | Terms, "Content Ownership" | Unqualified: the Terms say "You retain ownership over all content created using our Service, subject to the terms and conditions laid out in these Terms", and the same section grants Nowa a license to the content. Neither page says "what you build is yours". |
| "The Terms say you keep ownership of the content you create with Nowa" | fixed | Terms, "Content Ownership" | Paraphrase dropped the "subject to these Terms" qualifier. Replaced by the section's first sentence, quoted exactly, with a pointer to the section. |
| (new) "Nowa's Terms and Conditions govern your use of Nowa" | ok | Terms, "Introduction": "These Terms and Conditions govern your use of our visual app builder services" | Near-quote. |
| "The Privacy Policy explains what personal information Nowa collects, such as your name, email and profile picture, and what it's used for" | fixed | Policy sections 2, 4, 5 | The policy says only that you "may be asked" for these at sign-up, and also collects usage data through cookies. Reduced to the neutral pointer "what personal information Nowa collects, how it's used and the options you have to manage it" (section headings "Information Collection", "Use of Information", and section 5's "Nowa provides you the following options for you to manage your information"). |
| "To see, correct or delete your personal information, email team@nowa.dev" | removed | Policy sections 5, 6, 8 | The policy speaks of rights to *request* access, correction or deletion, names the email only for access requests, and section 8 says it "does not create any legal rights or obligations". Replaced by what both pages state plainly: questions go to team@nowa.dev (Policy section 6, Terms "Contact Us"). Account deletion itself is the in-app flow on this page. |
| "To take your app's code with you, download it or connect GitHub, depending on your plan" | fixed | `publish/download-code.md` (cloud projects, `code_download` allowance, `lib/project/download_code_button.dart:130-142`), `code/github.md` (`github` grant) | Product fact, kept but separated from the legal text: "To keep your own copy of a cloud project's code ...". Added "A local project's files are already on your computer" (`get-started/cloud-and-local.md`), since download is a cloud-project feature. |
| Description "see how your data is handled" | fixed | | Now "find Nowa's terms and privacy policy", which is what the section does. |
| Intro: settings belong to you, not to one project | ok | `account_editor_settings.dart:19-34` | |
| Local Setup row: desktop only, Flutter path, projects folder, VS Code; Flutter explained | ok | `packages/core/lib/src/settings/editor_settings/local_setup.dart:163` ("Not available on web"), `:182,210,223` | |
| Git row: GitHub connection and Git sign-in details; plan-gated | ok | `git_settings.dart:549-589` (GitHub integration, remote and local credentials) | |
| "Google SignedIn ... because Google manages that address for you" | fixed | `account_details/main_info_section.dart:30-47` (`withGoogle`) | The code only shows the label for Google sign-ins. Now "because your email comes from your Google account". |
| One-time code goes to the new address; "OTP Code Sent on"; "Email verified" | ok | `change_email.dart:66-104`, `user_provider.dart:166-186` | "OTP" explained as a one-time code (R3). |
| Logout leaves projects in place | ok | `packages/core/lib/src/providers/user_provider.dart:148-155` (only tokens cleared) | |
| Figma "Already designed something in Figma?" | ok | tone | P117 note untouched. |
| Delete account: "download your code first" | ok, link added | `delete_account.dart:84,212-219` | Linked to the download page. |
| Removed facts | none | | All other `-` lines are still on the page. |

Audience: no code-only facts on the page.

## project-settings.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Page list, order, sandbox rule ("don't show yet, because they need a saved project"), **Project Sync** desktop only | ok | `packages/core/lib/src/settings/project_settings.dart:19-31` (`_isSandboxed` comment "only get once saved", `!kIsWeb`) | |
| **Packages** row (pub.dev explained), **Constants** row | ok | | R4 explanations. |
| **Git** row "your project's history of saved changes and its link to GitHub" | fixed | `git_settings.dart:66-77` (Identity, GitHub integration, credentials); history lives in the **Git** panel | The settings page has no history; "saved changes" also reads like Nowa's Save. Now: Git keeps a history of saved snapshots (as `code/git.md` defines a commit), and the page holds the name and email on them plus the GitHub connection and sign-in details. |
| Field table: **Project Name**, **Package Name** (internal, can't be changed), **Build version**, **Build number** | ok | `project_detail_settings.dart:152-262,265-331` | |
| **App Name** also sets the web version's browser tab title | ok | `packages/core/lib/src/project/rename.dart:29-46,263-272`; new projects use `MaterialApp.router` with no `title` (`createGoRouterBundle`, `projects_view_provider.dart:275`, `main_dart_template.dart:43-49`), and Flutter leaves the page `<title>` alone on the web when `title` is null (flutter/flutter stable `packages/flutter/lib/src/widgets/app.dart`, "widget.title == null && kIsWeb") | |
| Bundle ID placeholder `com.example.`, rules, "Invalid package name", same ID on iOS, Android, macOS, Linux | ok | `packages/core/lib/src/file_system/naming.dart:242-247`, `project_detail_settings.dart:118-124`, `rename.dart:48-67` | Regex checked: last part needs 2+ characters. |
| Reverse web address; Google Play treats a changed ID as a different app | ok | https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundleidentifier (notes), https://developer.android.com/build/configure-app-module ("If you change the application ID, Google Play Store treats the upload as a completely different app", checked) | |
| Version rules and messages; raise **Build number** per upload, Google Play refuses a used number; **Build version** is what people see | ok | `project_detail_settings.dart:293-331`; https://developer.android.com/studio/publish/versioning (versionName "shown to users"; "You can't upload an APK to the Play Store with a versionCode you have already used", checked) | |
| Icon: every size from one image, tiles refresh, 1024 px limit and message, **Change all** adds Windows | ok | `packages/core/lib/src/settings/app_icon_manager.dart:94-171`, `app_icon_settings.dart:65-74` | |
| Permissions: steps, takes effect right away, iOS message kept as you type, grey technical name, imported permissions show as on | ok | `permissions_provider.dart:20-31`, `permission_settings.dart:46-123`, `permissions_service.dart:16-26` (migration) | |
| Permissions table (16 rows, descriptions) | ok | `permissions_service.dart:115-211` | Boot Completed example: https://developer.android.com/develop/background-work/services/alarms (notes). |
| **Problems** names a missing permission, **Fix** turns it on | ok | `package_config_service.dart:411-433`, `block_problems.dart:343-351` | |
| Tip: Apple 5.1.1 and Google Play permission rules | ok | Apple guidelines page, anchor `data-collection-and-storage` present, 5.1.1(ii) and (iii) wording checked; https://support.google.com/googleplay/android-developer/answer/16558241 ("You may only request permissions and APIs that access sensitive information that are necessary to implement current features or services in your app", checked) | |
| Removed warning: Nowa rewrites the Android manifest and iOS `Info.plist` on every permission change, hand edits can be lost | restored | `permissions_service.dart:12-15,56-82`; `file_template.dart:19-23,87-89` (`files.set(path, generate(...))` replaces the file); `manifest_template.dart:8-24`, `info_plist_template.dart:8-12` | Moved to for-code unchanged (correct), but it is a data-loss warning the reader needs: the code comment says regeneration "wipes everything a brownfield project has", `projects.md` invites importing "an app a developer built for you", and `integrations/deep-links.md` asks Nowa AI to edit `Info.plist`. Restored as a plain-words `:::warning` (no file names, R2). |
| (new) **App Name** and **Bundle Identifier** changes also rebuild platform files | added | `rename.dart:29-46` (App Name regenerates manifest and `Info.plist`), `:48-67,161-173` (Bundle ID regenerates `android/app/build.gradle.kts` and `MainActivity`) | Same mechanism, so the restored warning names all three triggers, and "Name and identify your app" has a one-line pointer to it. The exact files went to the for-code file (`#project-files`, marked as added by the verifier). |
| Pointer to `../code/generated-code.md#project-files` | ok | allowed anchor | |
| Constants: "key" explained, integration sections, two-way sync, Maps/AdMob keys on their own pages, custom constants labels, ship inside the app | ok | `packages/core/lib/src/settings/constants_settings.dart:55-120,158-276`; same words as `integrations/constants.md` | |
| Sharing: cover, **Public project** (cloud), visitors edit their own copy, confirmation, hidden for View Only and sandboxed | ok | `packages/core/lib/src/settings/sharing_settings.dart:18-32,92-96,180-190,447-491`, `project_detail_settings.dart:88-94` | |
| Experimental flags: per project, reversible, **Apply** saves and reopens, **Cancel** when unchanged | ok | `packages/core/lib/src/project/settings_service.dart:42-64`, `experimental_flags_dialog.dart:30-39,100-106` | |
| **load packages** gates Nowa AI adding packages; on in new projects | ok | `packages/ai/lib/src/tools/packages_tool.dart:136-141`, `nowa_settings_template.dart:17` | |
| **New UX**: panel icons in the top bar, **More panels**, **Debug** panel, **NEW UX** badge, off by default | ok | `lib/project/side_bar.dart:91-96,149,252`, `lib/project/project_page.dart:612`, `lib/project/top_bar_mapper.dart:43-46`, `lib/project/panels/testing_panel.dart:16-36`, `settings_service.dart:54-57` (default false) | |
| **New UX** hides the board toolbar | ok (confirmed) | `packages/designer/lib/src/panels/designer_board.dart:138-149` (`if (!playing && isNewUx) return const SizedBox.shrink()` replaces `DesignerToolsBuilder`); `isNewUx` = the flag, `packages/core/lib/src/providers/editor_provider.dart:348` | The toolbar comes back while a board item is playing (`PlayingToolbar`). |
| **New UX** "Double-clicking on the board doesn't work" | fixed (confirmed, narrowed) | `packages/designer/lib/src/design_experience/designer_board_controller.dart:103-108,361-366,414-419` | Confirmed: with the flag on, any double-click that hits a widget calls `_tryDrillIntoComponent`, which throws `UnimplementedError` before the normal handling (go one level deeper, or edit a **Text**), and no global handler shows it, so nothing happens. Not every double-click breaks: renaming a screen by double-clicking its title has its own handler (`packages/designer/lib/src/panels/canvas_titles.dart:282`). Row now says "Double-clicking a widget on the board does nothing ..., so you can't go one level deeper or start editing a text that way" (same words as `design/select-and-edit.md`). |
| Shared Preferences: **Play** values kept per project, **Clear** erases them and the REST API **Auth token value**, phones keep their own | ok | `shared_preferences_library.dart:145-165`, `project_detail_settings.dart:45-66`, `packages/data/lib/src/api/model/test_api_func_provider.dart:136-143`, `api_test_values_panel.dart:138-169` | |
| Project ID popup, "Copied" | ok | kept | |
| Removed facts | ok | | `pubspec.yaml` `1.3.4+7`, `lib/globals/app_constants.dart` and "Keys that Nowa writes into your Android, iOS or web files" are code-only and moved unchanged (plain-words versions stay: "ship inside your app"; Maps and AdMob keys "live on their own pages"). "Two rules to know" and "Set the Bundle Identifier before you publish" survive in the two new sub-sections. The manifest / `Info.plist` warning: restored (above). |

Audience: the grey technical names (`NSCameraUsageDescription`, `android.permission.CAMERA`) are on-screen text, kept and
explained (R3). Length: 2,139 words of prose, under the ~2,200 limit; if it must shrink, "Set permissions" can become
its own page, as the batch notes suggest. Admonitions: 2 (warning and tip in "Set permissions", separated by the
permission table and a paragraph).

## projects.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| **Design** marked **Start here**, **Thinking** as the starting level; keep both if unsure | ok | `lib/dashboard/dashboard_page.dart:50-51,219-226`, `packages/nowa_ui/lib/src/components/option_chip.dart:158,185`, `packages/ai/lib/src/agent/agent.dart:52` | **Start here** shows next to Design in the mode menu. |
| Prompt sent on open, so Nowa AI starts right away; tooltip **Build it** | ok | `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:469`; walkthrough in `get-started/first-app.md` | |
| Starter app with a home page, a theme and a board; "routing" dropped | ok | `createGoRouterBundle` (`default_bundles.dart:43-70`) | Routing isn't something the reader acts on here (d). |
| New project starts in **Personal** (no workspace); opens on any device | ok | `lib/dashboard/create_new_project/new_project_dialog.dart:83-84` (no workspace passed); `get-started/cloud-and-local.md` | |
| Flutter, GitHub, repository explained; monorepo wording | ok | R4 | |
| Reserved words in plain words; messages verbatim | ok | kept | |
| **Package Name** row (internal name, `my_app` example), **Bundle Identifier** placeholder "a short code from the project ID" | ok | `naming.dart:242-247` (first 6 alphanumeric characters of the ID) | Simplified, not lost. |
| Card line: internal name when it differs, else the edit time; RECENTS edit times | ok | `packages/nowa_ui/lib/dashboard/projects_grid.dart:76-78`, `lib/dashboard/dashboard_mapper.dart:55-62` | |
| "Project not found": wrong folder shows "Exception: Chosen folder is not a nowa project or a flutter project"; **Use my_app**; relocation keeps the project | ok | `packages/core/lib/src/services/local_project_service.dart:103-108,145-147`, `lib/project/missing_project_folder.dart:53-126` | |
| Removed facts | ok | | Package Name derivation and "(it must contain a `pubspec.yaml`)" moved unchanged to for-code; the reader keeps the plain-words version and the on-screen error. |

## index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Desktop app row: "You need the desktop app for projects stored on your computer and to run your real app on your phone or an emulator" | fixed | `get-started/cloud-and-local.md`, `test/devices.md`; `lib/router.dart:75-81` (`desktop` grant) | Too broad: from the web app a paid plan can still put the real app on a phone through an Android or iOS build. Now "to run your app on your phone or an emulator straight from Nowa", plus "Your plan must include it" (the desktop app is plan-gated, as the plans table says). |
| Dashboard dialogs don't change projects | ok | update prompt, survey, rating, upgrade offer (`lib/dashboard/dashboard_provider.dart:125-127` for the offer) | |
| Other changes (local projects explained, "In this section" lines) | ok | tone | |

## workspaces.md and help.md

All changed sentences are tone and examples; every label and fact is unchanged (spot-checked: `member_settings.dart:274,406`,
`sharing_settings.dart`, `packages/core/lib/src/dialogs/content_dialogs.dart:33-36`). One fix in `help.md`: the lead-in
"Want to swap ideas and tips with other builders? Join them here:" introduced a list that also holds the team's email;
now "Want to swap ideas and tips with other builders, or write to the team directly?". No removed facts on either page.

## Moved facts (for-code file)

All 6 bullets in `P14-B03-for-code.md` match the `origin/main` text exactly (checked with `grep -F` against
`git show origin/main:docs/account/...`), and each sits under an allowed anchor (`#project-files`, `#constants`). For each, the
reader keeps what they need:

| Moved fact | What the reader keeps |
|---|---|
| `pubspec.yaml` `1.3.4+7` | nothing needed (how the two fields are stored) |
| Manifest / `Info.plist` rewrite warning | **restored on the page in plain words** (see project-settings.md); the exact files stay in for-code |
| `lib/globals/app_constants.dart` | "Constants ship inside your app, so anyone who has the app can read them" |
| Keys written into Android, iOS or web files | "Some keys, such as the Google Maps and AdMob keys, live on their own pages under **Integrations** instead" |
| Package Name derivation | "An internal name for your project's code, such as `my_app` ... Your users never see it" |
| "(it must contain a `pubspec.yaml`)" | the on-screen error for a folder that isn't a Flutter project |

I added one bullet to the for-code file under `#project-files`, marked as added by the verifier: the exact files that
changing the **App Name** or **Bundle Identifier** regenerates (the facts behind the restored warning).

## Coverage spot checks

- **Obsolete rows:** none in `P14-B03-coverage.md` (0 of 12), so nothing to re-open.
- **Covered rows:** the file has only 8, so I checked all 8 instead of 10. All confirmed: item 1 (`ai/index.md` "Usage and
  credits", line 94, and the plans intro), 2 (`#usage`, "Resets in"), 3 (`#out-of-credits`, `#buy-credits`), 6
  (`publish/web.md#use-your-own-domain`, line 59), 7 (`publish/index.md` line 11 Premium rows, `publish/builds.md` line 33
  build allowance), 8 (`code/git.md` line 26, `code/import.md` lines 22 and 52, the Git rows on both settings pages,
  `projects.md` "Clone or import"), 9 (`#buy-credits`), 12 (pricing links).
- **Not useful rows:** 4 (prices, D3), 5 (plan marketing; plan cards come from the server, `adjust_plan_page.dart`) and 10
  (SSO, audit logs, on-premise: `grep -rni "\bSSO\b\|single sign-on\|audit log\|on-premise"` over `lib`, `packages` has no
  hits outside interpreter libraries) confirmed.
- **Added row 11** (privacy): still covered on `account-settings.md#your-data-and-privacy`, but the text is now the reduced,
  quote-based version, so the row's note in the coverage file describes the earlier paraphrase. I didn't edit the
  coverage file (outside my boundaries).
- The batch's three "For other pages" proposals were read against the code and are accurate (the known-issues text uses
  the same narrowed double-click wording as the page now does).

## Open issues

1. **"Enterprise" in the plans table** (`plans-and-usage.md`, external agent row). My brief says plan names appear only as
   the code names them. The code never names this plan: the gate is the `external_agent` grant, with the comment "Granted
   by the beta plan, which stacks on top of whatever plan the user is on" (`ai_chat_panel.dart:38`). I kept "Enterprise
   only for now" because D18 records the user's own answer (open question Q2: "yes, Enterprise only") and
   `ai/external-agent.md` carries the badge. If the orchestrator reads the rule as overriding D18, cut the sentence "It's
   Enterprise only for now." from that row. The link to the external agent page still carries the badge.
2. **Same ownership claim on another batch's page** (`publish/download-code.md` intro, P14-B11): "that code belongs to
   you". The Terms say only "You retain ownership over all content created using our Service, subject to the terms and
   conditions laid out in these Terms." Suggest dropping the clause or pointing to
   `../account/account-settings.md#your-data-and-privacy`.
3. **Deep links + Google Sign-In fix gets undone by more than the page says** (`integrations/deep-links.md#with-google-sign-in`,
   P14-B08). The page has Nowa AI merge two entries in the iOS settings file and warns that changing the **URL Scheme** or
   **iOS Client ID** rewrites them. Changing any iOS permission or the **App Name** also regenerates that whole file
   (`permissions_service.dart:81-82`, `rename.dart:37`), which brings the duplicate back. Suggest adding "an iOS
   permission or the **App Name**" to that sentence.
4. **Product issue (for `product-issues.md`, not documented on the page):** changing the **Bundle Identifier** sets every
   `PRODUCT_BUNDLE_IDENTIFIER` line of the iOS project to the same ID (`rename.dart:117-125`), test and app-extension
   targets included, and regenerates the Android build file and `MainActivity` (`rename.dart:58-61,161-173`). Imported
   projects with extensions or custom Android build settings can break. The page's warning covers the data-loss side in
   plain words.
5. Carried over from the batch notes, still open: the **load packages** dialog text is out of date
   (`experimental_flags_dialog.dart:55-58`); whether to keep documenting **New UX** at all (`left-out.md:75`). The notes'
   privacy question is resolved: the section now quotes the Terms and only points to the Policy.
