# W2 review log (Build with Nowa AI)

Verifier run against `/home/user/nowa-master` (v3.12.5). Paths are relative to that repo unless marked "docs".
Status: IN PROGRESS. The summary at the bottom is written last; per-page sections are appended as each page is finished.

## index.md

| claim | verdict | code ref | note |
|---|---|---|---|
| Panel **AI Assistant** is open when a project opens; **Assistant** icon is first in the left sidebar; Ctrl/Cmd + 1 toggles it | ok | `packages/core/lib/src/panels/panel.dart:29` (open unless experimental `new_ux`), `lib/project/side_bar.dart:36-41`, `lib/setup_general_actions.dart:43-60`, `lib/project/panels/panel_actions.dart:13-25`, `packages/core/lib/src/inputs.dart:22-25` (Ctrl on Windows/Linux, Cmd on macOS) | Matches reference shot `captures/ui-map/01-editor-default.png`. |
| Header: title **AI Assistant** or session title; **+** new session; **⋮** opens **Custom Instructions**, **Chat History** | ok | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:41-90` | |
| **Connect External Agent** in the **⋮** menu "if your account has access" | fixed | `ai_chat_panel.dart:38-39,78-84` (`NPlatform.isDesktop && hasAgentGrant`) | The entry also needs the desktop app. Added "in the desktop app". |
| Chat field contents: mode chip, thinking-level chip, **+** (**Add context**), Supabase and Figma icons, **Send** | ok | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:311-358` | Level chip is hidden in Plan mode (`chat_session.dart:100-106`): added one sentence. |
| Playground: AI needs an account, sign-in is asked on first send | ok | `chat_session.dart:257-264`, `packages/core/lib/src/project/sandbox_session.dart:35-41` | |
| Capabilities table (10 rows) | ok (1 fixed) | `packages/ai/lib/src/agent/agent.dart:123-158`, `tools/spawn_explorer_tool.dart` (up to 3 parallel), `edit_tool.dart`, `write_tool.dart`, `analyze_tool.dart` (analyze + `read_logs`, logs only after the app has run), `generate_api_call_tool.dart`, `download_font_tool.dart`, `save_attached_image_tool.dart`, `todo_tool.dart`, `ask_questions_tool.dart`, `plan_tool.dart`, `next_steps_tool.dart` | "New screens appear on your board" fixed to "when a board is open": `tools/ai_response_actions.dart:63-75` only places screens if the active editor is a board. |
| Packages need the **load packages** experimental setting, on in new projects | ok | `tools/packages_tool.dart:137-141`, `packages/core/lib/src/settings/experimental_flags_dialog.dart:55`, `packages/core/lib/src/file_system/templates/common/nowa_settings_template.dart:17` | UI label is lowercase "load packages". |
| Modes table (Design / Plan / Agent) descriptions | ok | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-40` ("Create/refine the look and flow without logic", "For planning complex tasks before building", "For everything, from design to functionality"); `agent/designer_agent.dart:7-9` (demo data), `agent/planning_agent.dart:33-55` + `tools/plan_tool.dart` (writes no files) | |
| Thinking levels **Instant** / **Thinking** (default) / **Deep Thinking** with their descriptions | ok | `agent.dart:12-13,21-28` (`defaultAgent => thinkingAgent`) | |
| "Nowa saves your project automatically when a request finishes" | ok | `chat_session.dart:300-306` (`_onDone` calls `gProject.save()`) | |
| Selecting on the board attaches it to the next message | ok | `packages/ai/lib/src/prompt_controller.dart:117-145` | Detail checked on context.md. |
| Dashboard prompt **What do you want to build?** and **Build it** | ok | `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:468,593`, `lib/dashboard/dashboard_page.dart:210`, `lib/dashboard/create_new_project/prompt_to_app_page.dart:46-85` | **Build it** is the tooltip of the send icon. |
| **Fix with AI** on embedded-preview failure and failed web deployment; **Explain with AI** on a failed build step; each sends the log to the chat | ok | `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:61-124`, `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:343`, `publishing_error.dart:93`, `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:486-492`, `packages/core/lib/src/widgets/fix_with_ai_button.dart:27-45` | The button sends the prompt at once unless the chat is busy. |
| Supabase setup: **Connect app with AI** (backend ready) / **Fix with AI** (setup stopped) opens the assistant, turns on the Supabase connector, sends a ready-made prompt | ok | `packages/data/lib/src/supabase/migrations/ui/sb_backend_setup_dialog.dart:143-191`, `sb_backend_setup_flow.dart:53-70` | |
| Mobile layout has its own AI chat | ok | `packages/designer/lib/src/panels/vibe_bottom_toolbar.dart`; docs `get-started/mobile.md` | Owned by W1. |
| Usage: **% used** indicator when running low; token counts + **Session Details** after a run; **Global Usage**; "ran out" message with ways to continue | ok (1 fixed) | `packages/ai/lib/src/ui/chat_panel/remaining_credits_view.dart:8-95`, `ai_chat_panel.dart:120-182`, `session_details_popup.dart:226-250,86-105`, `content_views.dart:228-300` | **Session Details** is an info icon with that tooltip: wording fixed. Out-of-credits card offers **Invite a friend** and **Upgrade** / **Purchase Credits**. No amounts on the page (D3 ok). |
| Links (15) | ok | `_rewrite/pages.md` | All targets are in pages.md. `../code/packages.md` is not on disk yet (other batch). |
| Front matter, no H1, one `:::note`, sentence-case headings, capture placeholder `ai-index-1` | ok | `_rewrite/captures/requests/W2.md` | Request row matches the placeholder. |

## modes.md

| claim | verdict | code ref | note |
|---|---|---|---|
| Mode chip at bottom left of the chat field, tooltip **Switch mode**; menu choices **Design**, **Plan**, **Agent** with their one-line descriptions | ok | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-66`, `packages/nowa_ui/lib/src/components/option_chip.dart:128-175` | Descriptions are quoted exactly: "Create/refine the look and flow without logic", "For planning complex tasks before building", "For everything, from design to functionality". |
| Chat field placeholders per mode (3) | ok | `ai_chat_field.dart:234-238` | "Describe the app you want to build...", "What would you like to plan?", "Build something wild...". |
| Both chips are disabled while Nowa AI is working | ok | `ai_chat_field.dart:956-968` (mode), `:1024-1034` (level: opacity 0.4, `onTap` null) | |
| New project opens in Design, unless the dashboard picked another mode; **Design** has a **Start here** badge in the dashboard box | ok | `packages/ai/lib/src/ai_manager.dart:59-71`, `lib/project/project_page.dart:316-320`, `lib/dashboard/create_new_project/new_project_dialog.dart:89`, `prompt_to_app_page.dart:62-70`, `lib/dashboard/dashboard_page.dart:50,217-226`, `option_chip.dart:186` | |
| Other projects open in the last mode chosen in them on this device, or Agent | ok | `packages/ai/lib/src/assistant_options_manager.dart:63-77` (per project id, shared prefs), `chat_session.dart:114` | |
| Design: screens, navigation, theming with demo data; no API/Supabase tools; no connectors | fixed | `packages/ai/lib/src/agent/designer_agent.dart:7-69` (`acceptsMcp: false`) | "never connects real data" softened to "doesn't connect": the code shows the missing tools, not an absolute guarantee. |
| Empty Design chat text | ok | `packages/ai/lib/src/ui/chat_panel/chat_session_view.dart:168-196` | Paraphrased (original has an em dash). |
| **Your app design is complete** card: summary line, three choices, **Pick what to make work first:**, **Make it real**, **Switched to Agent mode**, latest card only | fixed | `packages/ai/lib/src/ui/guided_inline_views.dart:37-131`, `tools/design_handoff_tool.dart` | Removed "reminds you that the screens use demo data, so nothing saves yet": that sentence is only the default text shown when the model sends no summary (`:79`). "Keep refining." is not a UI label (the card says "Want to change anything first? Just tell me below."), so the bold was dropped from the three bullet lead-ins. Added that the card is inactive while Nowa AI works (`:52`). |
| Plan mode reads the project, asks questions, writes a reviewable plan, changes nothing, can't add or remove packages, no connectors | ok | `agent/planning_agent.dart:22-55`, `tools/plan_tool.dart:51-60` (callback writes no files), `tools/packages_tool.dart:107-116` (add/remove blocked in Plan) | |
| **Questions** card: pick an answer, auto-advance, **Other...** (free text), **Send Answers** once all are answered | ok | `packages/ai/lib/src/ui/tool_inline_views.dart:293-457,469-585` | Up to 6 questions (`tools/ask_questions_tool.dart:4-50`); page gives no number. |
| **Implementation Plan** card: summary, **Key Decisions**, numbered steps, **Technical details** (only when steps carry notes), reply to rewrite, **Implement this plan** (switches to Agent, sends "Implement this plan"), **Keep planning** (hides both buttons), latest plan only, hidden while working | ok | `tool_inline_views.dart:91-291` | |
| Agent: builds everything; only mode that can use the Figma and Supabase connectors; **Tasks** card with progress bar | ok | `agent.dart:123-158`, `designer_agent.dart:32`, `planning_agent.dart:30`, `prompt_controller.dart:73`, `tool_inline_views.dart:9-89` | |
| Thinking levels table (names, menu descriptions, default **Thinking**) | ok | `agent.dart:11-43` | Menu rows show label + description: `ai_chat_field.dart:1117-1187`. |
| Level applies to Design and Agent, kept when switching modes, hidden in Plan; remembered per project with a global fallback; dashboard offers only Thinking / Deep Thinking | ok | `chat_session.dart:93-106`, `assistant_options_manager.dart:36-52,79-108`, `packages/ai/lib/src/ui/chat_field/tier_selector.dart:21-35` | The page does not claim a "Switch thinking level" tooltip (that tooltip exists only on the dashboard chip, `tier_selector.dart:29`). |
| Note: "Think Mode" toggle is gone; reasoning appears in a collapsed **Thinking process** block | fixed | `content_views.dart:781-832` | "always appears" reduced to "appears": whether a reasoning block shows depends on what the model streams. |
| Tip: **Fix with AI** sends its prompt in the active mode | fixed | `packages/core/lib/src/widgets/fix_with_ai_button.dart:27-45` | Scoped to the error buttons (**Fix with AI** / **Explain with AI**). The Supabase backend-setup buttons with the same name switch to Agent mode (`sb_backend_setup_flow.dart:64-69`), so the unscoped sentence was wrong for them. |
| When-to-use table, links (`chat.md#stop-a-request`, `connectors.md`, `context.md`, `prompting.md`), capture `ai-modes-1`, front matter, no H1, 2 admonitions | ok | | Anchor checked on chat.md. |

## chat.md

| claim | verdict | code ref | note |
|---|---|---|---|
| Enter sends; Shift / Ctrl / Cmd + Enter new line; Alt/Option + Backspace deletes the previous word | ok | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:58-109` | |
| Code-editor edits are applied before sending; project saved when the request finishes | ok | `packages/ai/lib/src/chat_session.dart:257-314` (`CodeBufferService.flush()`, `gProject.save()`) | |
| **Send** disabled when empty, while stopping, and when credits are used up | ok | `ai_chat_field.dart:653-683` (`creditsBreakdown != null && !hasEnoughCredits`) | |
| Six starter chips (**Summarize**, **Fix**, **Redesign UI**, **Add authentication**, **Use an API**, **Add more pictures**) in Plan/Agent only; a chip fills the field and never sends; Fix prompt text | ok | `packages/ai/lib/src/ui/ai_suggestions.dart:6-83`, `chat_panel/chat_session_view.dart:168-196` | Matches `captures/ui-map/01-editor-default.png`. |
| Stop button: red, tooltip **Abort**, then **Cancelling...** | ok | `ai_chat_field.dart:668-703` | |
| "A step that is already running finishes, and the steps that didn't run show a grey canceled icon" | fixed | `packages/ai/lib/src/agent/agent_runner.dart:153-195` (running tool awaited, but its completion event is not emitted once cancelled), `content_views.dart:753-765` (no output + not processing = canceled icon) | The icon is shown for every row without a result, including the one that was running. Reworded. |
| Changes made before stopping stay in the project | ok | `chat_session.dart:300-306` | No rollback on cancel; `_onDone` still saves. |
| **Thinking process** collapsed; step icon tooltips (**Tool is running**, **Tool executed successfully**, **Tool execution failed**, **Tool execution was canceled**) | ok | `content_views.dart:753-832` | |
| Code cards titled **Writing code** or **Modified code**; list "each screen or component" | fixed | `content_views.dart:640-737,1145-1243`, `tools/legacy/write_code_tool.dart:23,101`, `packages/core/lib/src/file_system/dart_importer.dart:509-545` | "Modified code" is only the fallback when no title is passed, which `ToolCallContentView` never does (`:729`). Real titles: **Writing code** and **Writing member in class** + class name. The card lists every named top-level declaration, not only screens/components. Click selects and zooms to the widget on the board, or opens its file (`packages/designer/lib/src/design_experience/selection_manager.dart:192-215`). Reworded. |
| **Show raw code** button, hover highlight, drag a widget onto the board | ok | `content_views.dart:1181,1215-1243` | |
| **Open in New Tab** on rows that work on a file | ok | `content_views.dart:775`, `packages/core/lib/src/widgets/nowa_widgets.dart:161-163` | |
| **Using &lt;tool&gt;...** and **Approval Required** are connector steps | ok | `content_views.dart:684-694,1034` | |
| **⋮** (**View Raw Data**) on hover, read-only | ok | `packages/ai/lib/src/ui/message_options.dart:8-30,89-95`, `content_views.dart:98,594` | |
| New screens placed right of existing ones on the open board only; board pans | ok | `packages/ai/lib/src/tools/ai_response_actions.dart:63-110` | |
| **Created Widgets** card: thumbnails, drag, click opens, × closes | ok | `packages/ai/lib/src/ui/chat_panel/summary_card.dart:95-205` | |
| **Constants updated** card and **Open Constants** | ok | `summary_card.dart:217-263` | |
| **Suggested next steps**: up to three rows, title + line + mode badge, click fills the field and switches mode, never sends, **Dismiss** ×, hidden while working | ok | `packages/ai/lib/src/ui/chat_panel/next_steps_bar.dart:56-190`, `tools/next_steps_tool.dart:7-58` | |
| **Retry** semantics, **Show more** / **Show less**, copy button | ok | `chat_session.dart:222-255`, `content_views.dart:335-412` | 240-character clamp; page gives no number. |
| **Service under load**: automatic retries with growing waits, **Dismiss** | ok | `agent_runner.dart:68,117-134`, `content_views.dart:456-500`, `models/message_content_models.dart:394-397` | Up to 5 retries; page says "several times". |
| "Server is not reachable" / "Server took too long to respond" | ok | `packages/ai/lib/src/services/agent_service.dart:260-266` | |
| **Session Limit Reached**; **You ran out of credits** | ok | `content_views.dart:414-454,228-300` | |
| Bug report: **Preparing issue report...**, **Bug report ready - want to send it to the Nowa team?**, **Report** opens the prefilled form, nothing sent until submitted | ok | `packages/ai/lib/src/ui/tool_inline_views.dart:638-694`, `tools/report_issue_tool.dart:5-84` | The tool is for platform problems, "Do not report user code bugs": matches the last sentence. |
| Links (11) and anchors `#stop-a-request`, `#start-from-a-suggestion` (defined here), `connectors.md#approve-what-a-connector-does`, `undo-and-history.md#start-a-new-session` | ok | | The two cross-page anchors are checked on their own pages. Capture `ai-chat-1` matches `captures/requests/W2.md`. |

## context.md

| claim | verdict | code ref | note |
|---|---|---|---|
| Selecting a screen or widget on the board attaches a chip at the top of the chat field; the next message carries it | ok | `packages/ai/lib/src/prompt_controller.dart:117-145`, `packages/ai/lib/src/ui/chat_field/attachements_view.dart:43-83` | The Details panel for a selected screen shows widget-style properties, so a screen is a selectable widget instance (`captures/ui-map/10-screen-selected.png`). |
| Component instance attaches the component (editable); plain widget attaches only that widget; several selected = first one | ok | `prompt_controller.dart:117-135` (`ClassComponentInstance`/`FuncComponentInstance` -> `DeclAttachment` modifiable, else `WidgetExprAttachment`, `.first`) | |
| Nothing selected: gets what is open in the code editor | fixed | `prompt_controller.dart:137-142` (`DartEditor`, any `ClassDeclImpl`) | "screen or component" widened to "screen, component or class". |
| Chip hover highlights the widget; × removes it; a removed selection stays removed until the selection changes | ok | `attachements_view.dart:120-166`, `prompt_controller.dart:103-115,147-150` | |
| **+** (**Add context**) opens a palette with hint "Search screens, components, files…" | ok | `attachements_view.dart:101-113`, `packages/ai/lib/src/ui/attachement_menu.dart:9-18` | |
| **Attach image** (several allowed), **Attach text file**, class list | ok (open issue) | `attachement_menu.dart:19-65`, `prompt_controller.dart:193-237` | See open issue 1 on **Attach text file** in the web app. |
| Section header **From your app** | fixed | `attachement_menu.dart:68,86-90` (`label.toUpperCase()`) | The palette shows "UPLOAD" and "FROM YOUR APP" in capitals; prose changed to **FROM YOUR APP** (3 places). |
| Check mark = already attached; lock = read-only; **included** = sent as a related declaration in short form; list is every class except State classes | ok | `attachement_menu.dart:99-163`, `packages/ai/lib/src/attachments/ai_attachement.dart:136-150`, `attachment_builder.dart:8-60` | |
| **Remove all attachments** clears chips | ok | `ai_chat_field.dart:341-347` | Shown only when there are attachments; it clears added attachments, not the automatic selection chip. Page wording ("attachments") is correct. |
| Paste an image with Ctrl/Cmd + V, drag an image file onto the field | ok | `ai_chat_field.dart:58-144,255`, `packages/designer/lib/src/design/nowa_copy_paste.dart:38-146` | Accepts JPEG, PNG, WebP, BMP by file signature. |
| Up to 5 images per message | ok | `prompt_controller.dart:164-171,209-212` | Product limit, not a plan limit. |
| A text file must contain readable text; other files are skipped | ok | `prompt_controller.dart:224-235`, `packages/core/lib/src/utils.dart:358-375` | |
| Chat images are kept only while the session is live; re-attach to save | ok | `packages/ai/lib/src/tools/save_attached_image_tool.dart:46-60` | |
| `@` mentions: list of attachments + every class, fuzzy match, arrows / Enter / Esc, highlighted, counts as attachment, click opens file in a sent message | ok | `ai_chat_field.dart:173-219,812-837`, `packages/ai/lib/src/attachments/attachment_mention.dart:25-60`, `content_views.dart:931-958` | |
| "What Nowa AI receives": selection/attachments/mentions, dependencies in short form, Custom Instructions, project map | fixed | `prompt_controller.dart:60-96`, `ai_attachement.dart:166-215` (`GlobalsAttachment`) | The map lists widget names only; outlines are for the other public declarations. Wording tightened. |
| "What to attach when" table and tip | ok | `tools/save_attached_image_tool.dart:9-17`, `agent.dart:123-158` | Advice only; consistent with the tools. |
| Links, anchor `prompting.md#custom-instructions`, captures `ai-context-1`, `ai-context-2`, 1 tip | ok | | Anchor checked on prompting.md. |

