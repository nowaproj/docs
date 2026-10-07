# W1 review (Home + Get started)

Verifier: batch V1 (Opus). Source of truth: `/home/user/nowa-master` (v3.12.5, b84bfdafd). Code refs are relative to that repo.
Screenshots checked: `_rewrite/captures/ui-map/22-canvas-title-hover.png`, `23-instant-play.png` (more per page below).

Status: in progress (pages are appended as they are verified). The summary at the end of this file is filled in last.

Page order checked: first-app, then the rest.

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
| Links | ok | n/a | `create-account`, `mobile`, `editor-tour`, `../ai/modes`, `../ai/undo-and-history`, `../ai/index`, `../design/index`, `../publish/index`, `../account/plans-and-usage` exist. `../test/index.md` does not exist yet; it is in pages.md (`test/index.md`, batch W7, leftover W19) so the link is kept. |
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
