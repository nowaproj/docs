# W1 review (Home + Get started)

Verifiers: V1 (Opus) checked `first-app.md`; V1 continuation (Sonnet) checked the other eight pages after the first run was cut off by a usage limit. Source of truth: `/home/user/nowa-master` (v3.12.5, b84bfdafd). Code refs are relative to that repo unless they start with `/home/user/docs` or `docs/`.
Screenshots checked: `_rewrite/captures/ui-map/01`, `04`, `05`, `07`, `08`, `13`, `15`, `16`, `18`, `22`, `23` and `static/img/docs/get-started/get-started-editor-tour-1.png` (more per page below).

Status: complete. Summary at the end of this file.

Page order checked: first-app, home, welcome, create-account, editor-tour, cloud-and-local, desktop-app, playground, mobile.

---

## docs/get-started/first-app.md

Word count after edits: about 1,230 rendered words (about 1,390 by `wc -w` including the front matter and the two capture comments). Within the tutorial budget.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Dashboard shows **What do you want to build?** | ok | `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:593`, `packages/nowa_ui/lib/dashboard/projects_view.dart:78-90,121` | Shown centred for an account with no projects, above the **Projects** list otherwise. |
| New accounts get a survey before the dashboard is usable | added | `lib/dashboard/dashboard_provider.dart:53-66` (`SurveyNotice`, not dismissible), `lib/dashboard/overlays/survey_overlay.dart:31-77` | Page said "the dashboard opens with the question" for every user; a brand-new account first has to answer four survey questions. One sentence added to step 1. |
| Example prompts: label **Or try an example prompt**, clicking one fills the box (editable, not sent), refresh button shows more | ok | `describe_app_panel.dart:346-355,434-439,555-561` | Tooltip of the refresh button is "Refresh prompts". Three examples at a time. |
| Mode chip says **Design** by default, "under the box" | fixed | `lib/dashboard/dashboard_page.dart:50-51,219-226`, `describe_app_panel.dart:497-543` | The chips are inside the box, bottom left, left of the send button. Now "at the bottom left of the box". |
| **Design** is marked **Start here** | fixed (where) | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:28-62`, `packages/nowa_ui/lib/src/components/option_chip.dart:159,184-203` | The badge is only in the open menu, not on the chip. Page now says "the chip's menu marks **Design** as **Start here**". |
| Design builds look and flow first, with demo data | ok | `dashboard_page.dart:223` ("Design the look and flow before making it functional"), `packages/ai/lib/src/agent/designer_agent.dart:7`, `guided_inline_views.dart:79` | |
| **Plan** and **Agent** are the other modes | ok | `mode_selector.dart:36-40` | |
| Thinking level chip: default **Thinking**, **Deep Thinking** for complex apps | ok | `packages/ai/lib/src/agent/agent.dart:21-30,52`, `packages/ai/lib/src/ui/chat_field/tier_selector.dart:20-35` | **Instant** is not offered on the dashboard (left out on purpose). Chip is next to the mode chip; page now says so. |
| Send button tooltip **Build it**, bottom right of the box | ok | `describe_app_panel.dart:467-479,541` | Enter in the box adds a new line (`textInputAction: newline`), so the click is required. |
| Loading texts "Setting things up…", "Naming your app…", "Creating your project…" | ok | `lib/dashboard/create_new_project/prompt_to_app_page.dart:38,55,60` | Ellipsis is the single character in the code. |
| Editor opens with the prompt in the Assistant panel and the AI already working | ok | `lib/project/project_page.dart:203-228` (`InitialPromptTrigger`), `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:46` | Header reads **AI Assistant** until a session title loads (about 2 s after a run ends, `packages/ai/lib/src/chat_session.dart:208-214,306-312`); after that it shows the session title. The page only uses the name while the run is going, so it stays true. |
| **Welcome to Nowa!** / **Take the quick tour** / **Close** appear over a new project | ok | `lib/project/onboarding/welcome_dialog.dart:25,37,79`, `lib/project/project_page.dart:625-629`, `onboarding_overlay.dart:48-53` | Only for a new project, tour not completed, not the phone layout. |
| **Questions** card, **Send Answers** | ok | `packages/ai/lib/src/ui/tool_inline_views.dart:395,444` | Button shows once every question is answered. |
| Stop = red stop button at the bottom right of the chat, tooltip **Abort**; changes before stopping stay | ok | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:351,680-700`, `packages/ai/lib/src/agent/agent_runner.dart:154-192,252-275` | Cancel only ends the run loop; nothing is rolled back. |
| Nowa saves the project when a run ends | ok | `packages/ai/lib/src/chat_session.dart:300-312` (`_onDone` → `gProject.save()`) | The error path (`_onError`) does not save; **Auto save** covers it. |
| Card **Your app design is complete** at the end of a Design run | ok | `guided_inline_views.dart:71`, `packages/ai/lib/src/tools/design_handoff_tool.dart:6-24` | The card appears when the agent calls `design_handoff`; it is part of the Design-mode toolset only (`designer_agent.dart:37-67`). |
| Click a widget → **Details** on the right; **Outline** in the sidebar | ok | `packages/designer/lib/src/designer_setup.dart:166-231`, `lib/project/side_bar.dart:56-76`, screenshots `18`, `06` | |
| Edit **Text** in **Details** or double-click the text | ok | `packages/designer/lib/src/design_experience/designer_board_controller.dart:108-125`, `text_custom_view.dart:15-35`, screenshot `22` (Text section, Text field) | Double-click edits a selected `Text` widget in place. |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes | ok | `lib/setup_general_actions.dart:26`, `packages/core/lib/src/inputs.dart:22-24` | |
| **Details** hidden when the board area is under 600 px | ok | `designer_setup.dart:166-168` | |
| Selected widget is attached to the AI message automatically | ok | `packages/ai/lib/src/prompt_controller.dart:117-135` | |
| Title bar buttons **Play** and **Open in new tab** on hover | ok | `packages/designer/lib/src/panels/canvas_titles.dart:197-270`, screenshot `22` | **Play** also shows while the item is selected; **Open in new tab** only on hover and only for items with a source file. |
| **Play** zooms to the screen, runs it in place, captures scroll | ok | `canvas_titles.dart:248-252`, `packages/designer/lib/src/play_mode/play_mode.dart:481-553` | |
| Select another screen to play that one | ok | `packages/designer/lib/src/design/designer.dart:34-40` | |
| **Stop** in the bar at the bottom of the board | ok | `play_mode.dart:531-537`, `designer_board.dart:128-139` | |
| Warning icon text "In board preview is not 100% accurate, run the app to see the real output" | ok | `play_mode.dart:539` | Exact tooltip. |
| "You should see: the screen with an orange border" | fixed | screenshots `22`, `23` | The orange border is the ordinary selection colour (also visible before Play), so it did not confirm anything. Replaced with the bar text "This screen is capturing scroll" (`play_mode.dart:502`). |
| Make it real card: **Pick what to make work first:**, **Make it real**, **Switched to Agent mode** | ok | `guided_inline_views.dart:37-44,90,108,123` | **Make it real** sends "Make it real — start with what you recommend." |
| "Design mode uses demo data, so nothing saves yet" | fixed | `guided_inline_views.dart:79` | Same words as the app's card, but "nothing saves" next to "Nowa saves as you go" in step 7 reads as the project not saving. Reworded to "the app doesn't save anything yet". |
| "Agent mode, which builds working features one at a time" | fixed | `guided_inline_views.dart:37-44`, `design_handoff_tool.dart:9-14` | Code says "activation choices" and "first activation run". Now "makes the features work, starting with the one you pick". |
| "then new steps as Nowa AI adds real logic and data" | fixed | n/a | "Data" is not confirmed for every app. Now "starts making the features work". |
| If you picked **Agent** on the dashboard, skip step 5 | ok | `designer_agent.dart:37-67` | Only Design agents have the hand-off tool. |
| **Restore Checkpoint** on the line above the reply; also undoes later requests | fixed | `packages/ai/lib/src/ui/content_views.dart:78,111-199`, `packages/ai/lib/src/checkpoints/checkpoint_warning.dart:40,98` | Added "dotted" (it is a dotted line) and "and confirm" (the **Undo Last Request?** dialog has **Continue**). |
| **Run** at the right of the top bar; **Back to board**; **Open on Mobile** (QR icon) | ok | `lib/project/top_bar.dart:331-333`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:765-865`, `lib/project/top_bar_mapper.dart:127-146`, `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:9-90` | The run tools sit left in the bar while the run view is open; the page says "in the top bar". QR panel title "Scan the QR". |
| Phone frame by default | ok | `packages/nowa_run/lib/src/ui/nowa_run_play_mode_controller.dart:8`, `nowa_run_play_mode.dart:26-32` | |
| First start can take a few minutes | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:112` | App text: "This may take a few minutes...". The session already boots in the background when the project loads (`nowa_run_plugin.dart:26-37`). |
| Preview restarts with your changes after you save | ok | `packages/nowa_run/lib/src/nowa_run_plugin.dart:46`, `nowa_run_manager.dart:80-84` | The writer flagged this as untested; the code confirms `onSave` → `applySavedCode` → hot restart. |
| **Fix with AI** on an error screen | ok | `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:86-116` | Offered for project and unknown errors only; the page says "if an error screen offers". |
| **Auto save** on by default; <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>; **Saved!** | ok | `packages/core/lib/src/project/saving_service.dart:8,116`, `lib/widgets/save_options_popup.dart:44`, `lib/setup_general_actions.dart:25`, `packages/core/lib/src/actions/project_actions.dart:8-12` | |
| **Share preview** → **Private** / **Public**, link, QR | ok | `play_mode.dart:508,576-751` | Radio buttons only for users who may invite (`PlayModePermissions.isInviter`). Subtitles: "Anyone with the link can view the preview." / "Only members that have access to the project". |
| **Public** warning and confirmation | ok | `packages/core/lib/src/settings/sharing_settings.dart:426-500` | Dialog **Make this project public?** with a checkbox and **Make public**. |
| Nowa logo (top left) returns to the dashboard; **Projects** and **RECENTS** | fixed | `top_bar_view.dart:82,167-190`, `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:390`, `projects_view.dart:221` | **RECENTS** is a sidebar list; wording now says so. |
| Browser window at least 840 px wide, narrower gets the phone layout | ok | `packages/nowa_ui/lib/src/globals/responsive_utils.dart:40-68` | `kIsWeb && width < 840`. |
| AI usage is metered by plan | ok | `ai_chat_panel.dart:120-170`, `content_views.dart:260-290` | UI says "credits" / "usage limit"; the page uses neither number nor plan name (D3). |
| Links | ok | n/a | `create-account`, `mobile`, `editor-tour`, `../ai/modes`, `../ai/undo-and-history`, `../ai/index`, `../design/index`, `../publish/index`, `../account/plans-and-usage` exist. `../test/index.md` did not exist when this page was first checked; it exists now, so every link on the page resolves (re-checked by script). |
| Style | ok | n/a | Front matter ok, no H1, no `---` rules, no emoji, no hype words (lint), 2 admonitions (tip, warning), 2 well-formed CAPTURE placeholders with matching rows in `captures/requests/W1.md`. |
| "about 15 minutes" (description and intro) | open | n/a | Editorial estimate required by pages.md ("state time and outcome up front"); not in code. Kept. A real timed run should confirm it. |

Counts for this page: about 45 claims checked, 9 fixed, 1 added, 0 removed, 1 open.

---

## docs/index.md (home)

Verifier: batch V1 continuation (Sonnet). The page is `.md`, not `.mdx` as pages.md says; Docusaurus 3 parses `.md` as MDX here (no `markdown.format` override in `docusaurus.config.js`), so the imports and JSX work. All CSS classes used exist in `docs/cards.module.css`.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Hero: "Build the exact app you imagine." + "Nowa AI builds it, you refine every detail visually, and the Flutter code is yours." | ok | `research/positioning.md` §1 (nowa.dev headline, approved hero), BRIEF.md | Positioning copy, not a code fact. The in-body `<h1>` is the hero (`hide_title: true` hides the auto title), so there is still one H1. |
| Start card 1: describe an app, watch Nowa AI build it on the board, then play it and run it | ok | matches `first-app.md` (checked above) | |
| Start card 2: "undo anything it changes" | fixed | `packages/ai/lib/src/checkpoints/checkpoint_warning.dart:40-115`, `docs/ai/undo-and-history.md` ("Package changes, downloaded fonts and Figma imports aren't recorded") | Checkpoints undo file edits only, so "anything" was untrue. Now "restore a checkpoint to undo a request". |
| Start card 3 and 13 section cards: titles and one-line descriptions | ok | `sidebars.js` labels; each section's overview page | Titles equal the sidebar labels. Every sidebar section except Home has one card. Each description names topics that have a page in that section. |
| Support hint: "click the **?** button at the bottom right" in the editor, to "chat with support or report an issue" | ok | `lib/project/project_page.dart:137` (`Positioned(right: 16, bottom: 32, child: SupportLauncher())`), `packages/nowa_ui/lib/src/components/nicons.dart:11` (`Icons.question_mark`), `packages/nowa_ui/lib/components/support_dialog.dart:509,520` | Cards **Report an issue** and **Chat with support**. The old `HelpIcon` (`lib/widgets/help_icon.dart`) is never mounted, so it is not the button. Same wording as `account/help.md`. |
| Discord `https://discord.gg/ByKfn3H7gX`, community `https://community.nowa.dev/`, YouTube `https://www.youtube.com/@nowadev`, `team@nowa.dev` | ok | `lib/project/onboarding/completion_dialog.dart:19-20,61`, `lib/dashboard/learning_resources/learning_resources_view.dart:36,63`, `support_dialog.dart:535` | URLs identical to the app's. |
| Links (15 internal) | ok | n/a | Every `to="..."` and both markdown links resolve to an existing file: `/get-started/first-app`, `/get-started/welcome`, `/ai`, `/design`, `/logic`, `/integrations`, `/test`, `/publish`, `/code`, `/account`, `/account/help`, `/troubleshooting`, `/reference/shortcuts`, `/new/whats-new`, `/legacy`, `./new/whats-new.md`, `./new/change-log.md`. Checked with a script against `docs/`. |
| Style | ok | n/a | Front matter ok, sentence-case H2s, no emoji, no `---` rules, no admonitions, no capture placeholders. |

Counts for this page: 8 rows (about 30 claims and links) checked, 1 fixed, 0 removed, 0 open.

---

## docs/get-started/welcome.md

718 words by `wc -w` (front matter included). Within budget.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| What Nowa is, who it is for, "no Flutter knowledge needed", "real Flutter code that you own" | ok | `research/positioning.md` §1-3, BRIEF.md | Positioning copy, not code facts. No model name, plan name or number is given (D3). |
| Loop: Describe, watch it build, refine (**Details**, themes), **Play** (Instant Play), **Run**, **Publish** | ok | first-app checks (above), `lib/project/run/run_button.dart:174` (**Run**), `lib/project/run/deploy_button.dart:100` (**Deploy**) | Labels as in the app. **Play** is given with its feature name, as the glossary asks. |
| **Run**: "in the editor, on your phone, or on a device with the desktop app" | ok | `run_button.dart:609` (**Embedded preview**), `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:7-60` (QR of the preview URL "from a phone"), `run_button.dart:457,545,655` (device runs desktop-only, **Run on**) | Cloud projects also run on devices in the desktop app (`run_button.dart:90-94,510-511`). |
| **Deploy** builds for the web, Android and iOS; web row publishes a live URL | ok | `lib/project/run/deploy_button.dart:186,250-253,333-356` (menu rows: web, Android debug, Android release, iOS; `_deployWeb` publishes) | |
| "Publishing to a live web URL and building for Android and iOS are available on paid plans" | ok | `deploy_button.dart:188,287,302` | The app's own wording ("paid plans"); gated by entitlements `webPreviewDeploys` and `cloudBuilds` (`deploy_button.dart:56-61`). No plan name or number. Matches `publish/index.md`. |
| **Deploy** works for any project | fixed | `deploy_button.dart:21` (`if (isLocal) return SizedBox.shrink()`) | Button is hidden for local projects. Added "**Deploy** is for cloud projects." |
| Desktop row: "Run your app on desktop targets from the desktop app" | ok | `packages/core/lib/flutter_tool.dart:83` (`flutter devices --machine`), `packages/core/lib/src/runner/device.dart:5-15` (macOS, Windows, Linux parsed), `lib/project/onboarding/onboarding_step.dart:~95` ("iOS, Android, Chrome, macOS and more") | The device list is whatever the local Flutter SDK reports. The page does not claim desktop installers (no deploy for them). |
| Developers: Git, packages, custom code, workspaces; "keep Nowa and VS Code open on the same folder" for a local project | ok | `lib/project/side_bar.dart:56-58` (**Git**), `packages/core/lib/src/services/local_file_service.dart:120-136` (recursive folder watcher), `lib/project/download_code_button.dart:40-57` (**Open in VS Code**, local projects only, `lib/project/panels/vibe_designer.dart:62`) | |
| Web app "Everything starts here" | fixed | n/a | Not true as written (the desktop app signs in and creates projects too). Now "Sign in and build in your browser." |
| Phone layout under 840 px | ok | `packages/nowa_ui/lib/src/globals/responsive_utils.dart:40-68` | Same as first-app. |
| Desktop app: macOS and Windows; adds local projects, device runs, importing existing Flutter projects | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:46-70` (**MacOS**, **Windows**), `lib/dashboard/create_new_project/new_project_dialog.dart:267` ("Local projects are only available in the desktop app."), `packages/nowa_ui/lib/dashboard/projects_view.dart:330-335` (`if (NPlatform.isDesktop)` **Import project**; `isDesktop` excludes web, `packages/nowa_runtime/lib/src/nowa_platform.dart:21`) | |
| Playground at `/playground`, no account | ok | `lib/router.dart:266-276` | |
| Key terms: **AI Assistant** panel, **Assistant** icon, **Widgets** panel lists screens as **Page**, **Details** panel, cloud/local | ok | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:46` ("AI Assistant" until a session title exists), `lib/project/side_bar.dart:37` (`name: "Assistant"`), `lib/project/panels/widgets_panel/widgets_panel.dart:15,318-331` (`PreviewType { page, component }`, labels **Page** / **Component**) | |
| Loop step 2: "Nowa AI creates screens, components and logic" | fixed | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-40` (Design: "Create/refine the look and flow without logic"; Agent: "For everything, from design to functionality"), `docs/ai/modes.md` | The default dashboard flow runs in Design mode, which writes no logic. Now "designs your screens ... In Agent mode it also writes the logic." |
| Links (11) | ok | n/a | `../ai/index.md`, `../design/index.md`, `../test/index.md`, `../publish/index.md`, `./mobile.md`, `./desktop-app.md`, `./playground.md`, `./cloud-and-local.md`, `./first-app.md`, `./create-account.md`, `./editor-tour.md` all exist. |
| Style | ok | n/a | Front matter ok, no H1, sentence-case headings, no `---`, no emoji, no admonitions, no capture placeholders. |

Counts for this page: about 35 claims checked, 3 fixed, 0 removed, 0 open.

---

## docs/get-started/create-account.md

About 690 words by `wc -w`. Within budget.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Sign-up page `app.nowa.dev/signup`; form fields **First name**, **Last name**, **Email**, **Password** ("At least 8 characters"), **Repeat password**; **I accept the terms & conditions**; **I want to receive emails on latest updates and features** ticked by default; **Create account** (13 labels) | ok | `lib/router.dart:191-196`, `lib/auth/auth_view.dart:446-522`, `lib/auth/auth_widgets.dart:12-35` (`AuthValidators.password`: under 8 characters fails) | `_acceptTerms = false`, `_newsletter = true` at `auth_view.dart:393-394`. |
| After **Create account**, the **Confirm your email** step opens | ok | `auth_view.dart:95-110` (`_accept`: unverified user goes to `AuthMode.verify`), `:745` | |
| Six boxes; checked on the last digit or **Verify**; **Resend the code** becomes **Sent!** | ok | `auth_view.dart:737-806` (`onCompleted: (_) => _verify()`, `AuthPrimaryButton(label: 'Verify')` at `:793`, `_sent ? 'Sent!' : 'Resend the code'` at `:797`) | The step also has **Log out**, not mentioned. |
| After the code, the dashboard with **What do you want to build?**, after the survey | ok | `auth_view.dart:175,702-703,737` (`showSurvey: onLoggedIn == null` → `SurveyForm` → `context.go('/')`) | On the standalone sign-up page the survey comes right after the code, before the dashboard. |
| "If the form won't submit, read the message under the field" | fixed | `auth_widgets.dart:120,132` (`AuthErrorBanner` below the form), `auth_view.dart:410` | The terms error ("Accepting terms and conditions is required") shows in a banner below the form, not under a field. Page now says "under the field or in the banner below the form". |
| Google: **Continue with Google** on both pages; first time **Complete your account** with **First name** / **Last name** prefilled, terms box, **Create account** | ok | `auth_widgets.dart:541-580`, `lib/auth/google_signup.dart:80-127`, `lib/router.dart:197-209` | Newsletter box also shown there (ticked by default); the page says only "tick the terms box". |
| Apple: web and iOS only, not the desktop app | ok | `auth_widgets.dart:512` (`kAppleSignInSupported => NPlatform.isIOS || NPlatform.isWeb`), `:534` | One call signs in or signs up (`packages/core/lib/src/services/user_service.dart:132-156`). |
| Sign in: signed out at `app.nowa.dev` you see **Welcome back!**; **Email**, **Password**, **Log In** | ok | `lib/router.dart:60-73,175-189` (signed-out `/` redirects to `/signin`), `auth_view.dart:286-325` | |
| Unconfirmed account sees **Confirm your email** after signing in | ok | `auth_view.dart:95-110` | |
| A link that needs an account (for example a project link) opens after sign-in | ok | `lib/router.dart:28,67,85` (`AuthRedirectManager.remember(intendedUri)` / `take()`) | |
| Reset: **Forgot Password?**, **Send reset link**, **Check your email**; reset page **New password**, **Repeat new password**, **Reset password**, **Password changed** | ok | `auth_view.dart:351,602,621,647`, `lib/auth/reset_password_page.dart:57-98` | Page title there is "Set a new password". |
| **Invalid link** means the link has expired | fixed | `reset_password_page.dart:60-68` | Shown when the token is missing; message says "missing or has expired". Now "missing or has expired". Split step 3 (open the link) from the form step to keep one action per step. |
| Survey: four questions, **Question 1 of 4**, click advances, **Other** / **Yes** ask for words and **Continue**, once, not skippable | fixed | `lib/dashboard/overlays/survey_overlay.dart:31-90,183,244`, `lib/dashboard/dashboard_provider.dart:53-70` (`barrierDismissible: false`, `canPop: false`, skipped once `didSurvey`) | Page said the questions were about "what you want to build first and how you found Nowa" and that **Other** and **Yes** ask for words. The four questions are: what to build first, what best describes you, whether you used another app builder, where you heard about Nowa. Only **Other** (question 2) and **Yes** (question 3) have a follow-up field; **Other** on question 4 has none. Page now lists the four and names those two. Also timing: "before they can use the dashboard" (email sign-ups see it right after the code, Google sign-ups on the dashboard). **Back** added (`survey_overlay.dart:267`). |
| Log out: icon beside your name at the bottom of the dashboard sidebar; in a project avatar then **Logout** | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:237-247` (tooltip **Logout**), `packages/nowa_ui/lib/top_bar/top_bar_view.dart:677-685` | |
| "Want to look around first?" playground pointer in the intro | ok | `auth_view.dart:542-549` | Shown on the standalone sign-up page only. |
| Links | ok | n/a | `./playground.md`, `./first-app.md`, `./editor-tour.md#welcome-tour` (heading at `editor-tour.md:101`), `../account/account-settings.md` (covers name, email, password, Figma) all resolve. `#answer-the-four-questions` is the heading below. |
| Style | ok | n/a | Front matter ok, no H1, sentence-case H2s, no `---`, no emoji, no admonitions. CAPTURE placeholder well formed, row `get-started-create-account-1` exists in `captures/requests/W1.md`. |

Counts for this page: about 55 claims checked, 3 fixed, 0 removed, 0 open.

---

## docs/get-started/editor-tour.md

About 1,160 rendered words (`wc -w` says about 1,440 because it counts table pipes and the front matter). Within the 1,200 budget for an overview. Screenshots checked: `captures/ui-map/01`, `04`, `05`, `07`, `08`, `16` and the captured `static/img/docs/get-started/get-started-editor-tour-1.png` (callouts 1-8 match the page's list).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Eight areas: top bar, sidebar, side panel (**AI Assistant** open by default), board, **Variables** and **Details** top right, board toolbar bottom, status bar, round **?** bottom right | ok | `packages/core/lib/src/panels/panel.dart:29` (default `'Assistant'`), `lib/project/project_page.dart:137` (`Positioned(right: 16, bottom: 32 ...)`), `packages/nowa_ui/lib/src/components/nicons.dart:11` | Same as the captured image. |
| Nowa logo returns to the dashboard; Nowa asks first if files are unsaved | ok | `top_bar_view.dart:82`, `lib/project/top_bar.dart:231-241`, `packages/core/lib/src/dialogs/unsaved_dialog.dart:35-66` ("Unsaved changes will be lost", **Cancel** / **Close** / save) | |
| Starting-point chip: "Playground only" | fixed | `lib/project/top_bar.dart:40,155-158`, `lib/sandbox/sandbox_picker.dart:13-20` ("the playground and public projects opened as a guest") | Now "Playground, and public projects you open as a guest" and "another starter app or a template" (`sandbox_picker.dart:24-58`). |
| Package chip only when a project has several packages | ok | `top_bar.dart:159` (`packages.length < 2` hides it) | |
| Board chip: current board; menu to switch, **Rename**, **Delete**, **Create new board** | ok, one sentence added | `top_bar_view.dart:251,350,409-412`, `top_bar_view.dart:326-330` (`dimmed: !state.onBoard`, `onTap` → `openBoardsTab` off the board) | **Rename** and **Delete** show on hover (tooltips). Added: while a screen is open on its own the chip is dimmed and takes you back to the board. |
| "View chip: switches between a screen's design and its code" | fixed | `top_bar_view.dart:261,476` (`canSwitch = views.length > 1`), `lib/project/top_bar_mapper.dart:91-95`, `packages/core/lib/src/editors/dart_editor/dart_editor.dart:25-27`, `packages/designer/lib/src/designer_plugin.dart:35-38,86` | The chip lists the file's block views: one per public widget class (named after the class), plus the Router and Firebase views. It never switches to code (code mode is the `<>` toggle). Now "Screen or component chip: appears after the board chip when a screen or component is open on its own, and names it. If its file holds several views, click it to switch." |
| **Upgrade** on the free plan | ok | `lib/project/top_bar_mapper.dart:118` (`showPurchaseUi && (subscription?.isFreePlan ?? true)`) | Hidden in the iOS and Android apps (`showPurchaseUi`). |
| Avatar menu: name and plan, **General Settings**, **Logout** | ok | `top_bar_view.dart:641-690` | |
| Bell opens **Notifications** | ok | `packages/nowa_ui/lib/src/components/notification_bell.dart:79,116` | |
| `<>` toggles code mode (no tooltip); gear opens **Settings** (also Ctrl/Cmd + ,) | ok | `top_bar_view.dart:146,709-728,754`, `lib/setup_general_actions.dart:33` | The page rightly calls the toggle `<>`. |
| **Run** and **Deploy**; **Save** replaces both in the playground | fixed | `lib/project/top_bar.dart:331-333` (`_sandbox != null ? SandboxSaveButton : Run + Deploy`), `lib/project/run/deploy_button.dart:21` | `_sandbox` also covers guests (`packages/core/lib/src/guest/guest_manager.dart`). Now "In the playground and for guests" and "**Deploy** publishes a cloud project". |
| Sidebar: icon names and order (**Assistant**, **Widgets**, **Themes**, **Search**, **Git**, **Files**, **Outline**, **Api**, **Supabase**, **Router** below a divider); click again closes; Ctrl/Cmd + 1-9 | ok | `lib/project/side_bar.dart:34-100,102-111,129-153`, `packages/core/lib/src/panels/panel.dart:211-218`, `lib/setup_general_actions.dart:44-59`, `lib/project/panels/panel_actions.dart:18-27`, `packages/data/lib/src/supabase/supabase_plugin.dart:24` (only plugin panel) | Numbers hold for a regular project. **Router** has `showShortcut: false`. |
| Numbers in the playground | added | `side_bar.dart:56-58` (**Git** hidden when `isSandboxed`) | The captured image has no **Git** icon, so every number after **Search** is one lower there. One sentence added. |
| **Outline** "of the board or the open screen" | fixed | `packages/designer/lib/src/designer_setup.dart:160-162,171,186-195`, `side_bar.dart:129`, same text in `design/outline.md` | On a screen open on its own the icon is hidden and a floating **Outline** sits at the top left. Row reworded. |
| **Search** (text, symbols, replace), **Files** (`lib`, `boards`, `assets`), **Api** (collections), **Supabase**, **Widgets** (**Page** / **Component**), **Themes** | ok | `lib/project/panels/search_panel.dart:104,238,294`, screenshots `04`, `05`, `07`, `08`, `lib/project/panels/widgets_panel/widgets_panel.dart:15` | Files shows the whole project tree only in code mode (screenshot `16`). |
| **Shortcuts** (Ctrl/Cmd + .) and **Enter Fullscreen** (web only) | ok | `side_bar.dart:155-185` (`if (kIsWeb)`, tooltip **Shortcuts**), `setup_general_actions.dart:34` | |
| Board gestures: scroll pans, Ctrl/Cmd + scroll or pinch zooms, **F** zooms to the selection | ok | `packages/core/lib/src/board/board_view.dart:159-247`, `packages/designer/lib/src/designer_setup.dart:19`, `packages/designer/lib/src/actions/designer_actions.dart:222-237` | Shift + scroll pans sideways, Space + drag pans (not on this page). |
| Title bar with **Play**, **Open in new tab**, home icon | ok | `packages/designer/lib/src/panels/canvas_titles.dart:197-270,227-230`, screenshot `22` | Same as first-app. |
| Toolbar: **Select tool** V, **Shape** R, **Screen** (no key), **Text** T, **Widget** Ctrl/Cmd + K | ok | `packages/designer/lib/src/widgets/designer_tools.dart:135-174`, `designer_setup.dart:16-18,48` | **Shape** places a Container (`designer_tools.dart:91`). |
| **Screen** tool hidden while a screen is open on its own | added | `designer_tools.dart:225` | One clause added to the **Screen** row. |
| **Details**: position and size under **Layout**; with nothing selected **Show Grid**, **Board Color**, **Reset** | ok | `packages/designer/lib/src/details/layout_details.dart:47`, `board_details.dart:38,47,70` | |
| **Variables** collapsed by default; **Params**, **Variables**, **Functions**, **Globals** | ok | `designer_setup.dart:209-212`, `packages/designer/lib/src/panels/variables_panel.dart:57-66,86-96`, `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:278,344,392`, `packages/core/lib/src/state_management/global_state_widgets.dart:53` | |
| Both panels hide under 600 px board width | ok | `designer_setup.dart:171` | Same check as first-app. The floating **Outline** hides too. |
| Status bar order: project name (popup with ID and copy), version, counts, latest log or **Ready**, loading progress, Git branch with ahead/behind, Save button | ok | `lib/status_bar.dart:27-42,117-160,163-215,251-268`, `lib/widgets/project_details_popup.dart:8-45` | The **Save** button is hidden in view-only projects. The counts open the **Console** on **Problems** (`status_bar.dart:194`), the log line on **Logs** (`:206`). Warning and info counts come from the log, not Problems; the page stays neutral. |
| **Save options**: **Auto save**, **Save every**, **Save now** | ok | `lib/widgets/save_options_popup.dart:39-91` | |
| **Problems** with **Fix** for some; **Logs** has app messages | ok | `packages/core/lib/src/panels/logs_and_errors_panel.dart:14-15`, `packages/core/lib/src/panels/errors_panel.dart:153-197`, `packages/nowa_run/lib/src/nowa_run_manager.dart:309-312` | Problems also has a source dropdown (**From Nowa** / **From Code Analysis**, `problems_panel.dart:45-47`); that belongs to `test/problems.md`. |
| Help (**?**) lists | ok | `packages/nowa_ui/lib/components/support_dialog.dart:473-545` | |
| Settings: **General** and **Integrations** groups, **Project Details**, **Packages**, **Constants**, **Back** | ok | `packages/core/lib/src/settings/project_settings.dart:21-31`, `packages/core/lib/src/settings/settings.dart:99-120` (group titles from `SettingCategory`), `top_bar_view.dart:163` | Also in **General**: Deployment, Permissions, Git, Project Sync (hidden for sandboxed projects). |
| Code mode: "shows every project file as a tab" | fixed | `packages/core/lib/src/panels/panel.dart:196-202` (opens on **Files**), screenshot `16` | Only the files you open get tabs. Now "The **Files** panel opens with the whole project tree, and each file you open gets a tab." **Back** returns to the board (`lib/project/top_bar.dart:223-227`). |
| Welcome tour: appears "the first time you open a new project", "once for your account" | fixed | `lib/project/project_page.dart:625-629` (`!completed && isNewProject`), `lib/project/onboarding/onboarding_controller.dart:109-117` (**Close**, **Skip** and the end all store `onboardingTourCompleted`) | Reworded: appears over a new project until you have finished or skipped it once. |
| Seven steps and their targets | ok | `lib/project/onboarding/onboarding_step.dart:62-117` (titles `:62-109`) | Titles and targets match the table. |
| **Next** / **Back** / **Skip**; last tooltip says **Got it!**; **You're all set!** with **Explore more features** (**Git**, **Project Settings**, **Themes**) and **Start building** | fixed | `lib/project/onboarding/onboarding_tooltip.dart:84-102`, `completion_dialog.dart:34-82`, `onboarding_step.dart:118-139` | **Got it!** added (**Skip** is hidden on the last tooltip). In the playground the **Git** step would be skipped, but the playground has no tour. |
| **Nothing is open** with **Open board**, **Browse widgets**, **Open code mode** | ok | `lib/project/panels/empty_workspace.dart:26-52` | Shown whenever no editor is open, including safe mode. |
| Links (27) and the `#welcome-tour` anchor | ok | n/a | All relative links resolve (checked by script); link texts equal the target titles. |
| Style | ok | n/a | Front matter ok, no H1, sentence-case H2s, no `---`, no emoji, no admonitions, CAPTURE placeholder well formed with a row in `captures/requests/W1.md` (status captured). |

Counts for this page: about 85 claims checked, 8 fixed, 3 added, 0 removed, 0 open.

---

## docs/get-started/cloud-and-local.md

About 615 rendered words. Within budget.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Every project is a cloud or local project; local = a folder opened in the desktop app | ok | `lib/dashboard/create_new_project/new_project_dialog.dart:267` ("Local projects are only available in the desktop app.") | |
| "Editing, Nowa AI and **Run** work the same in both" | fixed | `packages/nowa_run/lib/src/nowa_run_plugin.dart:15` (`NowaRunServiceLocal` vs `NowaRunServiceImpl`), `packages/ai/lib/src/ai_plugin.dart:14`, `bash_tool.dart:57`, `packages/ai/lib/src/tools/packages_tool.dart:198` | Run runs in different places (the table says so) and some AI tools differ for local projects. Now "are available in both". |
| Files live in the account (**Personal** or a workspace) / in a folder | ok | `packages/core/lib/src/providers/projects_view_provider.dart:28-30` (local list is empty while a workspace is selected) | Also backs the "Workspaces and teammates: no, only under **Personal**" row. |
| Dashboard: **Projects** vs **On this device** with **LOCAL-ONLY**; "Opted out of the cloud — no Cloud Build, sharing or backups." | ok | `packages/nowa_ui/lib/dashboard/projects_view.dart:138,495,505,522` | The **On this device** section only renders when a local project exists. |
| **Cloud** / **Local** badge in list rows only | ok | `packages/nowa_ui/lib/dashboard/projects_grid.dart:176,226-258` | The grid cards have no badge. |
| Create: **New project**, prompt box, **Clone from GitHub**; **Import project** (desktop); **Advanced** → **Local-only project** ("Stored only on this device. No Cloud Build or backups."); Import and Clone can stay local | ok | `new_project_dialog.dart:248-285`, `creation_dialog_widgets.dart:55-136`, `import_project_dialog.dart:32,50,243-254`, `github_clone_dialog.dart:36,93-96,293-301` (**Local-only**), `packages/nowa_ui/lib/dashboard/projects_view.dart:330-335` | Import can be forced local (`_mustBeLocal`, for a folder inside a larger repository). |
| Deploy: yes for cloud, no for local | ok | `lib/project/run/deploy_button.dart:21` (hidden for local), `packages/core/lib/src/settings/deployment_settings.dart:198-208,293-303` (`CloudBuildSyncNotice`) | |
| Cloud Deploy needs no plan | fixed | `deploy_button.dart:56-61,186-190,287-302` ("available on paid plans") | Added "on paid plans" to the cloud cell, as on `welcome.md` and `publish/index.md`. |
| **Share preview** and **Public project**: cloud only | ok | `packages/designer/lib/src/play_mode/play_mode.dart:47-55` (`SyncNotice(featureName: 'Share preview')`), `packages/core/lib/src/settings/sharing_settings.dart:31` (`if (isCloud) _PublicField()`) | |
| Getting your code: zip from code mode (plan-dependent) vs already on disk | ok | `lib/project/panels/vibe_designer.dart:62` (code-mode tab bar: `CodeModeActions` or `CodeButton`), `lib/project/download_code_button.dart:27-37,93,130-140,182` (**Code download**, **Compress Project**, `codeDownload` entitlement) | |
| Git: panel in both; cloud on Nowa's servers, local on your computer | ok | `packages/git_nowa/lib/src/git_utils.dart:4-5`, `network_git_service.dart:18`, `local/local_git_service.dart:17`, `git_manager.dart:111-113` | |
| VS Code: local only; **Open in VS Code** opens the folder; Nowa picks up changes | ok | `lib/project/download_code_button.dart:40-57,151`, `packages/core/lib/src/runner/vscode.dart:25-40` (`code . -g file`), `packages/core/lib/src/services/local_file_service.dart:120-136` | |
| Devices and emulators with the desktop app; **Local cache** for cloud | ok | `lib/project/run/run_button.dart:457-461,700-701,749` ("Cached on disk · re-synced on save") | |
| **Run** in the editor: cloud runs on Nowa's servers (QR); local on your computer (**Open in Browser**) | ok | `nowa_run_plugin.dart:15`, `lib/project/top_bar_mapper.dart:143-144`, `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:7-60` | |
| Warning: **Delete** on a local project erases its folder; use **Remove from list** in the ⋮ menu | ok | `packages/nowa_ui/lib/dashboard/projects_grid.dart:321,326`, `lib/dashboard/dashboard_mapper.dart:66-68` (`canUnlist: isLocal`), `lib/dashboard/dashboard_page.dart:253-300`, `projects_view_provider.dart:278-289` | Inside a larger Git repository, **Delete** only unlists ("Remove ... from Nowa?"). Not stated; the advice stays safe. |
| **Project Sync** from **Settings**, desktop only; clones and links; **Sync from Cloud** / **Sync from Local** overwrite the other side | ok | `packages/core/lib/src/settings/project_settings.dart:29` (`if (!kIsWeb)`, hidden when sandboxed), `project_sync_settings.dart:364,396,436,570-573,716` ("Sync Warning", "Clone to Local/Cloud") | |
| "a local project can use **Deploy** and **Share preview** through its cloud copy" | fixed | `project_sync_settings.dart:482-545` (`SyncNotice`: "$feature is not available on local projects" + **Sync to cloud**), `deploy_button.dart:21` | The local project itself cannot. Now "you can use **Deploy** and **Share preview** on the cloud copy". |
| **Upload to cloud** in a local project's ⋮ menu | added | `projects_grid.dart:315`, `lib/dashboard/dashboard_page.dart:160-166`, `lib/dashboard/projects_view/sync_project_dialog.dart:55` ("Clone Project" / "Project Sync" dialog) | One sentence added to the Project Sync paragraph. |
| Badge table (7 types) | ok | `/home/user/docs/src/components/Badge/index.js:7-15` | Rendered labels: Beta, Enterprise, Paid plans, Desktop app, Web app, Local projects, Cloud projects. |
| Keyword "offline" | removed | n/a | The page makes no offline claim and the code was not checked for one. |
| Links | ok | n/a | `./desktop-app.md`, `../account/projects.md`, `../code/local-projects.md` and the pricing URL resolve. |
| Style | ok | n/a | Front matter ok, no H1, sentence-case H2s, no `---`, no emoji, 1 admonition (warning, for data loss). |

Counts for this page: about 40 claims checked, 3 fixed, 1 added, 1 removed (keyword), 0 open.

---

## docs/get-started/desktop-app.md

About 770 rendered words. Within budget. Anchors `{#setting-up-flutter-sdk}` (H2 "Set up Flutter") and `{#macos-install-xcode}` (H3 "macOS: install Xcode first") are present and are the targets of the in-app help links (`local_setup.dart:189`, `environment_setup_dialog.dart:470`). The app opens `/local-project-simulator/createlocalproject#...`; the redirect to `/get-started/desktop-app` already exists (`redirects.js:67`, and the client-redirects plugin forwards the hash), so nothing is left to do for D13. This page had no log section from the first run, so all of it was checked here.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| macOS and Windows only; adds local projects, **Import project**, device runs; installs updates in the app | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:46-70`, `packages/nowa_ui/lib/dashboard/projects_view.dart:330-335`, `lib/dashboard/overlays/update_overlay.dart:111-218` | No Linux button in 3.12.5. |
| **Download Desktop App** in the dashboard sidebar, web only; **Download Nowa** dialog with **MacOS** / **Windows** and the version line | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:181-186` (`if (kIsWeb)`), `download_nowa_dialog.dart:19,51,68,74` ("Download Nowa version: ...") | A button is disabled if the server has no link for that system. |
| Desktop access check after sign-in; text "Upgrade to unlock desktop version, or use on web at app.nowa.dev" with billing options | ok | `lib/router.dart:76-83`, `lib/upgrade_page.dart:27-48` | Plans not named (D3). The page also has **Logout** and **Refresh** buttons, not mentioned. |
| Sign in with email or Google; **Continue with Apple** not in the desktop app | ok | `lib/auth/auth_widgets.dart:512` (`kAppleSignInSupported`) | |
| **On this device** lists local projects | ok | `packages/nowa_ui/lib/dashboard/projects_view.dart:138,495` | |
| Update flow: **A new version of Nowa is available**, **Update to v…**, **Install & Restart**, **Skip**, **Later**, **Or download manually** | ok | `lib/dashboard/overlays/update_overlay.dart:116,144,149,151,216,218`, `lib/dashboard/dashboard_provider.dart:18,30-50` | Shown once per session. The **Update failed** state (**Retry**) is not on the page. |
| **Version out of date** → **Download** → **Download Nowa** dialog | ok | `lib/update_required_screen.dart:29,55-65` | Desktop text: "Please download the newer version to continue using Nowa". |
| Local Setup path: **Settings** in the sidebar, or avatar then **General Settings**; **Editor Settings** → **Local Setup** | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:205-211`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:673`, `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:32-35,157` | The page header there reads "Environment" (`local_setup.dart:69`); the tab is **Local Setup**. |
| Other entry points: **Setup flutter SDK** (New project), **Fix** (Clone from GitHub), **Local environment settings** (Run menu) | ok | `lib/dashboard/create_new_project/new_project_dialog.dart:238`, `github_clone_dialog.dart:93-96` + `lib/widgets/error_message.dart:36-44`, `lib/project/run/run_button.dart:575` | **Fix** appears with the message "Set a default projects folder in settings to clone locally." |
| Xcode: required on macOS before Flutter; warning text; install from the App Store, open once, agree to the license, let it install components | ok | `packages/core/lib/src/environment/environment_setup_dialog.dart:441-475` (warning and help text) | The steps are the app's own help text. Shown only on macOS while Flutter is not ready. Step 3 ("Return to Nowa and run the Flutter setup again") is the obvious follow-up. |
| **Automatic setup** → **Set up automatically**; **Set up local environment** dialog; starts on **Verify** when Flutter is ready | ok | `local_setup.dart:130-148`, `environment_setup_dialog.dart:147,313` | |
| Flutter step: **Install location** (about 10 GB, no spaces), download about 1 GB, license checkbox (Google and Eclipse Foundation), **Install**, keep Nowa open, **Ready**, **Next** | ok | `environment_setup_dialog.dart:428,723-740,783-784,690,941` (`_location` at 718, `_consent` at 760) | **Install** is disabled until the box is ticked. |
| Verify step: runs `flutter doctor`, lists devices, **Re-run checks**, **Done** | ok | `environment_setup_dialog.dart:478-531,699` | |
| Android: **Download** next to "Android isn't set up"; "On the **Android** step ... **Install** next to **Android toolchain**"; emulator optional; **Skip for now**; add later from **Local Setup** | fixed | `environment_setup_dialog.dart:396-399` (header shows only **Flutter** and **Verify**), `:538-552,571,709`, `tool_check.dart:1-11` | There is no visible "Android" step label. Step 5 now says "The next screen lists **Android toolchain** and an optional **Android emulator**". The app's own caption says "from Settings → Environment"; the page keeps the tab name **Local Setup**. |
| "You should see": **Ready**; **Update Flutter SDK** next to "Flutter SDK is outdated" | ok | `environment_setup_dialog.dart:948-960`, `local_setup.dart:147-153` | |
| Existing SDK: **Browse** next to **Flutter SDK Path**; folder with `bin/flutter` (`bin\flutter.bat` on Windows); **Invalid Flutter SDK path** | ok | `packages/core/lib/src/fields/path_field.dart:131-136`, `packages/core/lib/flutter_tool.dart:15-18`, `local_setup.dart:185,205` | |
| **Default Projects Path** (new local projects, local clones); **VS code Path** with a default | ok | `local_setup.dart:213,226`, `github_clone_dialog.dart:93-96`, `packages/core/lib/src/runner/vscode.dart:8-20` | |
| Links | ok | n/a | `../code/local-projects.md`, `../test/devices.md`, `../code/vs-code.md`, `https://docs.flutter.dev/get-started/install`, pricing URL resolve. |
| Style | fixed | n/a | Step 3 of "Let Nowa install Flutter" held three actions (tick, **Install**, **Next**); split into steps 3-5, so "skip to step 4" became "skip to step 6" and the list now has 8 steps. Front matter ok, desktop badge after the intro, no H1, sentence-case headings, no `---`, no emoji, 1 admonition (note). Two CAPTURE placeholders, well formed, rows in `captures/requests/W1.md` (second is `not-possible`, desktop only). |

Counts for this page: about 55 claims checked, 2 fixed (1 content, 1 style), 0 removed, 0 open.

---

## docs/get-started/playground.md

About 550 rendered words. Within budget. Screenshots checked: `captures/ui-map/01`, `13`, `15`, `16` (all taken in the playground).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| `/playground` needs no account; also reachable from **Build an app, no account needed** on the sign-up page | ok | `lib/router.dart:266-276` ("No auth gate"), `lib/auth/auth_view.dart:542-549` | The link is on the standalone sign-up page only, not in the sign-in dialog. |
| Opens on a starter app with a home screen | fixed (wording) | `packages/core/lib/src/playground/playground_starter.dart:8-23`, `playground_manager.dart:59` (default `PlaygroundStarter.starter` via `byId`) | Now "the **Starter app**". A reload resumes the stored app instead. |
| **Save** at the top right where **Run** and **Deploy** would be | ok | `lib/project/top_bar.dart:331-333`, `lib/sandbox/sandbox_save.dart:44` | Playground label is **Save** (no unsaved-work badge, `playground_manager.dart:9-11`); guests see **Save to keep changes** once something changed. |
| You can design, use **Details**, themes, **Play**, code | ok | screenshots `01`, `16` | |
| First Nowa AI message asks you to sign in or create an account | ok | `packages/ai/lib/src/chat_session.dart:257-265` (`sandbox.requestAuth()`), `packages/core/lib/src/project/sandbox_session.dart:35-42` | |
| "Some things wait for your account": **Run**, **Deploy**, **Git** panel, **Deployment** / **Permissions** / **Git** / **Project Sync** settings, **Restore Checkpoint" | fixed | `packages/nowa_run/lib/src/nowa_run_plugin.dart:12` (no Nowa Run when sandboxed), `lib/project/side_bar.dart:56-58`, `packages/core/lib/src/settings/project_settings.dart:25,29`, `packages/core/lib/src/settings/project_detail_settings.dart:86-93` (**Sharing** hidden), `packages/ai/lib/src/ai_plugin.dart:19-21` (no `CheckpointService`) | **Project Sync** is desktop-only (`if (!kIsWeb)`), so it never "comes back" on the web playground; removed. Added the **Sharing** section of **Project Details**, which is hidden too. |
| Pick a starting point: chip next to the logo; **Starter app** / **Simple app** / **Empty app** and their descriptions | ok | `lib/sandbox/sandbox_picker.dart:19-58`, `playground_starter.dart:8-23` | |
| **Templates** lists public sample projects "when there are any"; opening one loads it as a guest | ok | `sandbox_picker.dart:41,64-80` (first 5 samples with a source project, "No templates to show", `/redirect-to-project/<id>`) | **See all projects** is disabled in 3.12.5 (not on the page; it is named in the CAPTURE request). |
| **Discard this app?** with **Discard** / **Cancel** when work exists | ok | `sandbox_picker.dart:94-115` (title at `:104`) | Only asked when something is stored or changed. |
| Playground stored in the browser on save; very large ones not kept; clearing data removes it | ok | `playground_manager.dart:22-45` (`onSave` → `persist`, 3 MB cap), `packages/core/lib/src/project/saving_service.dart:16,62-68` (auto save every 20 s by default) | |
| Save flow: **Save** → sign-in dialog (sign up, confirm email; Google may leave the page) → **Save your app** (workspace, **Personal** first, name, **Cancel** / **Save**) → opens as a cloud project with the AI conversation | ok | `lib/sandbox/sandbox_save.dart:11-56,95-131`, `lib/auth/save_prompts.dart:21-60,140-197,211-228` | Sign-in dialog opens in sign-up mode (`save_prompts.dart:228`). |
| Name rules: letters, numbers, spaces, underscores, hyphens | ok | `packages/core/lib/src/file_system/naming.dart:176-191` | Also refused: empty and Dart reserved words (not stated). |
| Public project as a guest: anyone with the link can open it; private copy in the browser; owner's project unchanged | fixed | `packages/core/lib/src/models/project.dart:148-162` (`opensAsGuest`), `packages/core/lib/src/providers/project_provider.dart:946-980`, `lib/project/project_page.dart:370`, `lib/router.dart:116-135`, `packages/core/lib/src/settings/sharing_settings.dart:24-25` | Added "Unless you're a member of the project": members open it normally. |
| Edits lost on closing the tab; **Save to keep changes**; **Save your app**; same limits as the playground | ok | `packages/core/lib/src/guest/guest_manager.dart:6-30`, `sandbox_save.dart:44`, `project.dart:157` (`isSandboxed => isMock || isGuest`) | |
| Links | ok | n/a | `./create-account.md`, `./editor-tour.md`, `./first-app.md`, `../test/share.md` (covers **Public project**) resolve. |
| Style | ok | n/a | Front matter ok, no H1, sentence-case H2s, no `---`, no emoji, no admonitions. CAPTURE placeholder well formed, row exists. |

Counts for this page: about 40 claims checked, 3 fixed, 0 removed, 0 open. Not covered on purpose (as the writer noted): **Share preview** in the playground's Play bar is not gated in code, but the project has no backend id; needs a test in the product.

---

## docs/get-started/mobile.md

About 600 rendered words after the edits. Within budget. No screenshot exists for the phone layout (the CAPTURE request is still `requested`), so every UI claim was checked in code.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Phone layout in a browser window under 840 px and in the iOS and Android app | ok | `packages/nowa_ui/lib/src/globals/responsive_utils.dart:40-68` (`useMobileShell`: native iOS/Android or `kIsWeb && width < 840`), `lib/project/project_page.dart:105` | The code comment says the same: "native iOS/Android, or a phone-sized web browser viewport". |
| iOS and Android app "is in private beta" | removed | n/a (only `docs/new/whats-new.md:200`, 3.10.5) | Not in the code and time-sensitive; positioning.md says not to document Nowa GO. The app mention stays because pages.md requires it and the code confirms the layout runs natively. Orchestrator may drop the clause about the app entirely. |
| "No board, sidebar panels or code editor" | fixed | `lib/project/nowago/mobile_view.dart:19-60` (**View code** only `if (NPlatform.isIOS \|\| NPlatform.isAndroid)`), `lib/project/nowago/mobile_code_page.dart:1-196` | In the app, **View code** lists `pubspec.yaml` and files under `lib` and opens an editable code editor with **Save**. Now "no board and no sidebar panels, and the browser version has no code editor". |
| Sign in at app.nowa.dev, tap a project | ok | `lib/project/project_page.dart:105`, `packages/nowa_ui/lib/dashboard/projects_view.dart:114` (mobile dashboard shell) | |
| Top row: back arrow to the dashboard, status pill, **Build**, **Play**, **More** (⋮) | ok | `mobile_view.dart:318-366` (`context.go('/')` at `:333`, tooltip **More** at `:355`) | |
| Status pill: green check or a number; tap for problems and logs | fixed | `lib/project/nowago/mobile_log_status.dart:46-98` (`issues = problemService.errorCount + logger.errorCount`, sheet `ErrorsAndLogs`) | The number counts errors, not all problems. Now "the number of errors" and "open **Problems** and **Logs**". |
| **Build** opens the build page; shows progress while a build runs | ok | `lib/project/nowago/mobile_build_status.dart:111-190` | Spinner, status text and elapsed time. |
| **More**: **Support**, **View code** (app only) | ok | `mobile_view.dart:38-52` | **View code** description added (see above). |
| Screens list: **Search project...**, **All** / **Pages** / **Components**, carousel or list toggle, tap attaches and detaches, long-press **Play alone** / **Attach to chat** / **Rename** / **Delete** | ok | `lib/project/panels/widgets_panel/widgets_panel.dart:277,345-347,417-438`, `lib/project/project_dashboard.dart:49-149` | Tap again removes the attachment (`_attachToChat`). |
| Chat pill: tap and type, microphone to dictate; hints per mode | ok | `lib/project/nowago/sheet_panel.dart:222-253` (hints: Design "Describe the app you want to build…", Plan "What would you like to plan?", Agent "Ask Nowa AI…", "Listening…") | |
| Chips "while you type": **Mode**, **Model**, **Attach**, **Supabase**, **History**, **⋯** | fixed | `sheet_panel.dart:94` (`_showToolbar => _hasFocus`), `lib/project/nowago/sheet_panel/chips.dart:57-120,133,223-262,521,322-345,383-415,417-465,480-492` | The row shows when the pill is focused, not only while typing. The **Mode** chip is labelled with the current mode and the model chip with the current thinking level; **Mode** and **Model** are the titles of the sheets they open. Reworded accordingly. **Attach** gets **Image** (when the device can attach files) and **Components**; **⋯** holds **Custom Instructions** and **New Session** (`sheet_panel.dart:360,381`). The credits chip and starter chips are not described (conditional). |
| Send opens the conversation full screen; AI icon at the left of the pill returns | ok | `sheet_panel.dart:102-113,176,224` | A resume bar also appears. |
| **Play your app** sheet: **Instant preview** (**SIMULATED**), **Run real app** (**REAL APP** / **LIVE**), first start can take a minute | ok | `mobile_view.dart:66-128` | Subtitles match. |
| In the playground **Play** goes straight to the instant preview | added | `mobile_view.dart:66-71` (`manager == null` → `MobilePlayModeView`), `packages/nowa_run/lib/src/nowa_run_plugin.dart:12` (no `NowaRunManager` when sandboxed) | The CAPTURE request uses the playground, so this matters for the screenshot. |
| Floating button: **Stop**, **Restart**, **Share preview**; draggable | ok | `mobile_view.dart:374-505` (`_showBottomSheet` at `:428`, drag via `onPanUpdate` at `:492`) | **Restart** shows a "Restarted" snackbar. |
| **Real app** page: **Live — your app is ready**, **Launch App**, **Hot Restart**, **Stop**, **Start** | ok | `lib/project/nowago/mobile_run_page.dart:97,123,127,184,197-214` | |
| **Build** page tabs **Android** / **iOS** / **Web** are the **Deployment** pages | ok | `lib/project/nowago/mobile_build_page.dart:67-92`, `packages/core/lib/src/settings/deployment_settings.dart:14-16` | Title "Build <project>". |
| Links and the `#play-and-run-your-app` anchor | ok | n/a | `../ai/index.md`, `../publish/index.md`, `./first-app.md`, `../test/run.md` resolve. |
| Style | ok | n/a | Front matter ok, no H1, sentence-case H2s, no `---`, no emoji, no admonitions. CAPTURE placeholder well formed, row exists (`requested`). |

Counts for this page: about 50 claims checked, 3 fixed, 1 added, 1 removed, 0 open.

---

## Summary

| Page | Claims checked (about) | Fixed | Added | Removed | Open |
|---|---|---|---|---|---|
| `docs/get-started/first-app.md` | 45 | 9 | 1 | 0 | 1 |
| `docs/index.md` (home) | 30 | 1 | 0 | 0 | 0 |
| `docs/get-started/welcome.md` | 35 | 3 | 0 | 0 | 0 |
| `docs/get-started/create-account.md` | 55 | 3 | 0 | 0 | 0 |
| `docs/get-started/editor-tour.md` | 85 | 8 | 3 | 0 | 0 |
| `docs/get-started/cloud-and-local.md` | 40 | 3 | 1 | 1 | 0 |
| `docs/get-started/desktop-app.md` | 55 | 2 | 0 | 0 | 0 |
| `docs/get-started/playground.md` | 40 | 3 | 0 | 0 | 0 |
| `docs/get-started/mobile.md` | 50 | 3 | 1 | 1 | 0 |
| **Total** | **435** | **35** | **6** | **2** | **1** |

Pages checked: 9 of 9. "Added" are must-cover or accuracy sentences the code confirmed; "removed" are a search keyword and a time-sensitive beta claim the code does not show.

Lengths (rendered words, markup and front matter excluded, measured after the last edit): first-app 1,201 (`wc -w` says 1,391, under the 1,400 tutorial budget), editor-tour 1,188 (just under the 1,200 limit for overviews), desktop-app 772, mobile 632, welcome 629, cloud-and-local 626, create-account 609, playground 551, home 285.

Link and style checks run by script on all nine pages after the last edit: every relative link and anchor resolves; no H1 in the body (the home hero `<h1>` is the page's only H1, `hide_title: true`); no `---` rules, emoji or hype words; at most two admonitions; all eight CAPTURE placeholders are well formed and have rows in `captures/requests/W1.md`; the anchors `{#setting-up-flutter-sdk}` and `{#macos-install-xcode}` are on `desktop-app.md`; the home page links only to existing pages.

Most serious errors fixed:
- `mobile.md`: said the phone layout has no code editor, but **View code** in the iOS and Android app opens an editable one; named the chips **Mode** and **Model** although those are the sheet titles (the chips show the current mode and thinking level); claimed the app "is in private beta" (not in code).
- `editor-tour.md`: the top-bar chip next to the board "switches between design and code" (it lists a file's views, one per widget class); starting-point chip and **Save** were "playground only" (guests get them too); code mode "shows every file as a tab".
- `playground.md`: listed **Project Sync** among things that return after saving (desktop only, never on the web); described guest copies without the "unless you are a member" condition.
- `create-account.md`: survey described as two topics (it is four questions, and only two answers ask for words); **Invalid link** is shown for a missing token as well as an expired one.
- `welcome.md` and `cloud-and-local.md`: **Deploy** was presented as available to every project (hidden for local projects); "Run works the same in both" contradicted the comparison table; a local project cannot use **Deploy** or **Share preview** "through its cloud copy", you use the cloud copy.
- `index.md`: "undo anything it changes" (checkpoints cover file edits only).
- `desktop-app.md`: pointed at an "Android step" that has no label in the dialog.
- `first-app.md` (first run): the orange-border checkpoint, "nothing saves" next to autosave, and several label and position details (see its table).

## Open issues

1. `first-app.md` states "about 15 minutes" (description and intro). It is the editorial estimate pages.md asks for, not a code fact; a timed run should confirm it. The AI build time varies.
2. `first-app.md` keywords still list "New Cloud Project", a label that no longer exists in v3.12.5 (kept by the first run as an old-docs search term). Remove it if retired labels should not appear in front matter.
3. Desktop access plan: the code only checks the `desktop` entitlement and shows "Upgrade to unlock desktop version, or use on web at app.nowa.dev" (`lib/router.dart:76-83`, `lib/upgrade_page.dart:27-48`); a code comment says "Has to be paid", What's New 3.0.1 says all plans. `desktop-app.md` states only the check and links pricing (D3). Needs a product answer before naming plans.
4. `mobile.md` still names "Nowa's iOS and Android app" (pages.md requires it; the code confirms the native layout and **View code**) but gives no availability or download information. positioning.md says not to document Nowa GO, so the orchestrator may cut that clause.
5. Playground **Share preview** in the Play bar is not gated in code, but the playground project has no backend id, so the link probably does not work. The pages stay silent. Needs a test in the product.
6. Product quirks seen while checking (not docs errors; for `product-issues.md`): (a) the Ctrl/Cmd + number shortcuts index the full icon list, Outline included (`lib/project/panels/panel_actions.dart:18-27`), while the sidebar hides **Outline** on a screen open on its own, so the numbers in icon tooltips and the panel that opens can differ by one there; (b) the Android setup caption says "from Settings → Environment" but the tab is **Local Setup** (its page header reads "Environment"); (c) the status bar's warning and info counts come from the log, not from **Problems** (`lib/status_bar.dart:197-199`).
7. Screenshots still to capture: `get-started-first-app-1`, `-2`, `get-started-create-account-1`, `get-started-desktop-app-1`, `-2` (desktop only), `get-started-playground-1`, `get-started-mobile-1` (see `captures/requests/W1.md`). `get-started-editor-tour-1` exists and matches the page's callouts. Note for the mobile capture: in the playground **Play** skips the options sheet, which the page now says.
8. pages.md lists the home page as `docs/index.mdx`; the file is `docs/index.md`. Docusaurus 3 parses `.md` as MDX here, so imports and JSX work and `sidebars.js` (`id: 'index'`) is unaffected. Update pages.md if you care about the extension.
