# W2 writer notes (Build with Nowa AI: index, modes, chat, context, undo-and-history, prompting, connectors, external-agent)

Paths are relative to `/home/user/nowa-master` (v3.12.5) unless marked "dev". Main research: `_rewrite/research/features-ai.md` (sections named below). Code wins over research; contradictions are noted per page.
Old pages in `docs/ai/` (howtouseai.mdx, price.md, prompttip.mdx, exampleprompts.mdx, _category_.json) were not touched.

## index.md (`docs/ai/index.md`)

Research sections: AI Assistant, Switch mode, Instant / Thinking / Deep Thinking, What the agent can do, Fix with AI / Explain with AI, Connect app with AI / Fix with AI (Supabase backend setup), What do you want to build?, AI usage and credits in the chat.

Code spot-checks (matched research unless noted):
- Assistant is sidebar index 0 and Ctrl/Cmd+1 maps to `OpenSidePanelIntent(0)` which toggles the panel: `lib/setup_general_actions.dart:43-60`, `lib/project/panels/panel_actions.dart:13-25`, `lib/project/side_bar.dart:36-41`. Open by default in the classic layout: `packages/core/lib/src/panels/panel.dart:29`.
- Header: title "AI Assistant" or session title, **+** tooltip "New Session", **⋮** tooltip "Options" with "Custom Instructions", "Chat History", and "Connect External Agent" only when `NPlatform.isDesktop && hasAgentGrant`: `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:38-39,52-86`, `packages/ai/lib/src/ui/ai_options.dart:25-40`.
- Chat control bar contents (mode chip, level chip, **Remove all attachments**, **Add context**, Supabase icon, Figma icon, Send): `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:318-358`. Matches the reference screenshot `_rewrite/captures/ui-map/01-editor-default.png`.
- Playground sign-in on first send: `packages/ai/lib/src/chat_session.dart:262-264`, `packages/core/lib/src/project/sandbox_session.dart:35-41`.
- Capabilities table: tool descriptions in `packages/ai/lib/src/agent/agent.dart:123-163`, `packages/ai/lib/src/tools/generate_api_call_tool.dart:7-94` (cURL -> collection, request, test run, response models), `download_font_tool.dart:4-27`, `save_attached_image_tool.dart:9-56`, `spawn_explorer_tool.dart:4-53` ("investigates several parts at once": up to 3 parallel tasks), `packages_tool.dart:107-171` ("load packages" required; `nowa_settings_template.dart:17` sets `load_packages: true` for new projects, `settings_service.dart:46,60` defaults to false when missing).
- Autosave when a request ends: `chat_session.dart:300-306` (`_onDone` -> `gProject.save()`).
- Usage row (indicator hidden until the plan is mostly used; token counters and Session Details after a run; Global Usage button): `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:120-180`, `remaining_credits_view.dart:10-47,123-167`, `session_details_popup.dart:33-79`. No numbers or thresholds are stated on the page (D3).
- New screens placed on the board: `packages/ai/lib/src/tools/ai_response_actions.dart:63-110` (only when a board is the active editor tab).
- Fix with AI / Explain with AI, Connect app with AI: `packages/core/lib/src/widgets/fix_with_ai_button.dart`, `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:61-124`, research sections cited above (not re-opened for the data and publish surfaces).

Left out and why:
- Free Weekend pill, Max Mode: transient promotion / unreachable (research "Not user-facing"). Not mentioned anywhere in W2.
- New UX bottom chat bar ("Press / to chat...", experimental flag `new_ux`): research open question 12; not documented in W2 (flag is labelled EXPERIMENTAL in the project settings dialog; the orchestrator or W1 editor-tour can decide). See coverage notes at the end.
- Model name (What's New says Gemini 3.7 Flash): the UI never names the model, so the docs stay generic.

Capture requests: ai-index-1.

## modes.md (`docs/ai/modes.md`)

Research sections: Switch mode, Instant / Thinking / Deep Thinking, Questions, Implementation Plan, Tasks, Your app design is complete / Make it real.

Code spot-checks (all matched research):
- Mode labels, descriptions, tooltip "Switch mode"; chip tinted when not Agent: `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-66`. Placeholders per mode: `ai_chat_field.dart:234-238`. Dashboard: Design recommended ("Start here") and its own description: `lib/dashboard/dashboard_page.dart:218-226`, `packages/nowa_ui/lib/src/components/option_chip.dart:186`.
- Default mode: `activeMode => options.mode ?? AiMode.agent` (`packages/ai/lib/src/chat_session.dart:114`), new projects get Design via `initAiFromProjectParams(newProject)` (`packages/ai/lib/src/ai_manager.dart:59-71`); `isNewProject: true` is set by the New project dialog (`lib/dashboard/create_new_project/new_project_dialog.dart:89`) and prompt-to-app (`prompt_to_app_page.dart:62-70`). Mode is per project in shared prefs (`assistant_options_manager.dart:72-77`).
- Chips disabled while running: `ai_chat_field.dart:960-968` (mode), `:1100-1105` (level opacity/onTap null).
- Design mode toolset has no API/Supabase tools and `acceptsMcp: false`: `packages/ai/lib/src/agent/designer_agent.dart:14-69`. Plan mode: read-only toolset, `acceptsMcp: false`, package add/remove blocked: `planning_agent.dart:21-55`, `packages_tool.dart:107-116`. Level chip hidden in Plan (`selectableAgents` empty): `chat_session.dart:100-106`. Connectors only for agents that accept MCP: `prompt_controller.dart:73`.
- Empty Design chat text: `chat_session_view.dart:168-196` (paraphrased on the page: the original text has an em dash).
- Questions card: "Questions", "n / total", "Previous"/"Next", "Other...", "Type your answer...", "Send Answers" (only when all answered), auto-advance: `packages/ai/lib/src/ui/tool_inline_views.dart:293-636`; up to 6 questions: `packages/ai/lib/src/tools/ask_questions_tool.dart:4-50`.
- Plan card: "Implementation Plan", "Technical details" (only when steps carry technical notes), "Key Decisions", "Implement this plan" (sets Agent mode, sends "Implement this plan"), "Keep planning" (hides buttons), latest plan only and not while running: `tool_inline_views.dart:91-291`.
- Design hand-off card strings and behavior (Agent mode switch, "Switched to Agent mode", latest card only): `packages/ai/lib/src/ui/guided_inline_views.dart:36-128`.
- Tasks card ("Tasks", completed/total, progress): `tool_inline_views.dart:9-89`.
- Thinking levels labels/descriptions and default Thinking: `packages/ai/lib/src/agent/agent.dart:11-43`; per-project + global fallback: `assistant_options_manager.dart:36-52,79-108`; dashboard offers only Thinking/Deep Thinking: `tier_selector.dart:21-35`.
- "Think Mode removed" note: What's New 3.5 and the old `howtouseai.mdx` (🧠 toggle) vs code (no such toggle; collapsed "Thinking process" block `content_views.dart:782-835`).
- Fix with AI runs in the active mode: `packages/core/lib/src/widgets/fix_with_ai_button.dart:27-45` (no mode change).

Left out and why:
- Plan mode suggesting Design for brand-new apps in an empty project: comes from the client-side mirror of the server planner prompt (research open question 17), not verifiable here.
- Max Mode, Free Weekend badge on levels: unreachable / transient (research "Not user-facing").

Capture requests: ai-modes-1.

## chat.md (`docs/ai/chat.md`)

Research sections: Send / Abort, Suggestions (empty chat), Thinking process and tool activity, Suggested next steps, Created Widgets / Constants updated, Retry / Service under load and other chat errors, Bug report ready (Report), View Raw Data.

Code spot-checks (all matched research unless noted):
- Send/Abort/Cancelling... tooltips, disabled rules (empty field, cancelling, no credits once loaded), Enter sends, Shift/Ctrl/Cmd+Enter new line, Alt+Backspace deletes word: `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:58-109,646-704`.
- Cancel: `packages/ai/lib/src/chat_session.dart:328-332`, `packages/ai/lib/src/agent/agent_runner.dart:252-276` (pending approvals dropped, child runners cancelled; a tool already running is awaited to completion, `:153-195`). Canceled step icon "Tool execution was canceled": `packages/ai/lib/src/ui/content_views.dart:750-765`.
- Flush of code-editor edits before sending, autosave on done: `chat_session.dart:257-314` (`CodeBufferService.flush()`, `gProject.save()` in `_onDone`).
- Suggestions chips and prompt texts; none in Design mode: `packages/ai/lib/src/ui/ai_suggestions.dart:6-83`, `packages/ai/lib/src/ui/chat_panel/chat_session_view.dart:168-196`.
- Transcript: "Thinking process" collapsed (`content_views.dart:793-835`), status tooltips (`:760-765`), "Using <tool>..." for connector steps (`:691`), "Modified code"/"Writing code" + "Show raw code" (`:1170-1181`), class tiles with hover highlight/open/drag (`:1210-1245`), Open in New Tab tooltip (`packages/core/lib/src/widgets/nowa_widgets.dart:161-163`), View Raw Data (`packages/ai/lib/src/ui/message_options.dart:8-30`). Step wording ("Reading file ...", "Adding <package>...", "Downloading font '<name>'...", "Saving image '<name>' to assets"): tool `buildView`s in `packages/ai/lib/src/tools/*.dart` (`packages_tool.dart:75-87`, `download_font_tool.dart:25-27`, `save_attached_image_tool.dart:30-33`, `spawn_explorer_tool.dart:45-52`).
- Next steps strip (never sends, dismiss, hidden while running, max 3, mode badge only when switching): `packages/ai/lib/src/ui/chat_panel/next_steps_bar.dart:56-190`, `packages/ai/lib/src/tools/next_steps_tool.dart:7-58`, `chat_session.dart:127-165`.
- Created Widgets / Constants updated texts and **Open Constants**: `packages/ai/lib/src/ui/chat_panel/summary_card.dart:95-263`; new screens auto-placed right of existing ones only when a board is the active editor: `packages/ai/lib/src/tools/ai_response_actions.dart:63-110`.
- Errors: generic red text with Show more/Show less (240 chars), Copy and Retry icon buttons, "Service under load" + "Dismiss", Session Limit Reached: `content_views.dart:326-501`; retry semantics (resend first prompt vs "continue with your last task"): `chat_session.dart:222-255`; auto-retry up to 5 with growing delay: `agent_runner.dart:68,117-134`; "Server is not reachable." / "Server took too long to respond. Please try again.": `packages/ai/lib/src/services/agent_service.dart:260-266`; "You ran out of credits." banner: `content_views.dart:228-324`.
- Bug report card strings and flow (opens ticket form prefilled via `TicketProvider.openWithPrefill`): `packages/ai/lib/src/ui/tool_inline_views.dart:638-694`, `packages/ai/lib/src/tools/report_issue_tool.dart:5-84`.

Left out and why:
- "AI has been working for a while now" banner with a continue button (`content_views.dart:503-539`): only produced by the legacy parser (research open question 8); not documented.
- Free Weekend FREE pill: transient promotion.
- Approval Required cards: covered on connectors.md only.

Capture requests: ai-chat-1 (needs-sign-in: needs a real AI run).

## context.md (`docs/ai/context.md`)

Research sections: Add context (attachments and automatic context), @ mentions. Old `prompttip.mdx` §2-3 for the "attach less" advice (still consistent with the code: a project map is always sent and the agent has read/search tools).

Code spot-checks (all matched research):
- **+** tooltip "Add context"; chips with hover highlight on the board and × to remove; "Remove all attachments" (appears only with attachments): `packages/ai/lib/src/ui/chat_field/attachements_view.dart:43-166`, `ai_chat_field.dart:340-358`.
- Palette: hint "Search screens, components, files…", headers "Upload" (shown upper-case) and "From your app", rows **Attach image** / **Attach text file**, check / lock / "included" markers: `packages/ai/lib/src/ui/attachement_menu.dart:9-163`. Items picked from "From your app" are added as editable (`DeclAttachment` default category modifiable): `ai_attachement.dart:129-135`; "included" = skeleton category = interface only: `ai_attachement.dart:136-150` (`InterfaceExtractionVisitor`), dependency expansion: `packages/ai/lib/src/attachments/attachment_builder.dart:8-60`.
- Selection auto-attach (first selected widget; component instance -> editable class, plain widget -> widget expression; fallback to the open code-editor class; removed context stays removed until selection changes): `packages/ai/lib/src/prompt_controller.dart:101-170` (`_gatherRawContext`, `gatherContext`, `removeContextAttachment`).
- Limit of 5 images and its message: `prompt_controller.dart:164-171,198-212`. Text-file filter (`isProbablyText`, non-text dropped silently): `prompt_controller.dart:214-232`, `packages/core/lib/src/utils.dart:358-375`.
- Paste (Ctrl/Cmd+V; web has its own paste handler) and drag-and-drop of an image onto the field: `ai_chat_field.dart:58-144,255`, `packages/designer/lib/src/design/nowa_copy_paste.dart:7-70`.
- @ mentions: list = current attachments + every `ClassDeclImpl` in the user library, fuzzy search, Esc closes, highlighted mention, click opens the file in sent messages: `ai_chat_field.dart:173-219,723-954`, `packages/ai/lib/src/attachments/attachment_mention.dart:25-60`, `content_views.dart:931-958`.
- "What Nowa AI receives": custom instructions + globals map + dependency expansion: `prompt_controller.dart:82-96,60-80`, `packages/ai/lib/src/attachments/ai_attachement.dart:166-215` (`GlobalsAttachment`: all widget names + public declaration signatures).
- Images only kept in memory for the live session; the agent saves an attached image to assets only when it should appear in the app (logo, photo, illustration), not for style references: `packages/ai/lib/src/tools/save_attached_image_tool.dart:9-60`.

Open question / possible product issue (not stated on the page):
- **Attach text file on the web app.** `PromptController.attachTextFile` calls `isProbablyText`, which opens the picked file with `dart:io` `File(picked.path!)` (`packages/core/lib/src/utils.dart:358-363`). That can't work in a browser, so the option probably fails silently on web (`onSelect` doesn't await or catch it, `attachement_menu.dart:63-66`). Not verified at runtime. The page makes no platform claim for it; please check in a capture session and, if it fails on web, add a "desktop app only" note or log it in `product-issues.md`.
- Whether the **From your app** list also contains non-widget classes (models, API collections) is per code `allDeclarations.whereType<ClassDeclImpl>()` minus state classes (`attachement_menu.dart:115-130`); the page says "screen, component or class".

Left out and why:
- Attachment lock tooltips ("...Try enabling thinking mode."): unreachable (research "Not user-facing").
- Phone layout attach flow (tap a screen in the carousel, long-press -> Attach to chat): belongs to the mobile page (W1).

Capture requests: ai-context-1, ai-context-2.

## undo-and-history.md (`docs/ai/undo-and-history.md`)

Research sections: Restore Checkpoint / Reapply Checkpoint, New Session (and long or full sessions), Chat History.

Code spot-checks (all matched research; two details refined from the code):
- Hover line with bookmark/redo icon; **Restore Checkpoint** / **Reapply Checkpoint** (hover only, disabled while processing); dialog "Undo Last Request?" / "This will remove your last request and undo edits to the following files:" / Cancel / Continue: `packages/ai/lib/src/ui/content_views.dart:111-199`, `packages/ai/lib/src/checkpoints/checkpoint_warning.dart:31-101`.
- Restore chain = the clicked checkpoint and every later one in the same session, each file back to its earliest "before" state, new files deleted: `packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-383` (`restoreCheckpointChain`, `_buildRestoreFileMap`, `_applyFileMap`). Note the dialog lists only the clicked request's files and says "last request", while the restore covers the chain: the page states the chain behavior as a warning.
- **Refinement of research:** `reapplyCheckpointChain` reapplies checkpoints with `index <= selected` (the clicked one and everything before it) and marks only those as reapplied (`checkpoint_service.dart:276-300`, `packages/ai/lib/src/checkpoints/local_snapshot_db.dart:346-361`), although the interface comment says "and all subsequent checkpoints" (`checkpoint_service.dart:39-40`). The page follows the implementation: reapplying request N brings back the state right after N; later requests stay restored until reapplied; reapplying the last one brings everything back. Worth a runtime check.
- Manual edits made after the request are overwritten by a restore: restore writes the stored "before" bytes of every touched file (`_applyFileMap`). Warning kept to data-loss wording (style guide).
- No checkpoint service in the sandbox/playground: `packages/ai/lib/src/ai_plugin.dart:14-21` (`if (!project.project.isSandboxed)`).
- Storage: `.nowa/temp/` snapshots db + blobs (`local_snapshot_db.dart:19`, `packages/ai/lib/src/checkpoints/snapshot_db.dart:98` for cloud, `blob_storage_service.dart:16-19`), git-ignored through `.nowa/.gitignore` containing `temp/` (`packages/core/lib/src/file_system/templates/common/gitignore_template.dart:12-17`, `packages/core/lib/src/project/settings_service.dart:34-38`).
- New Session: header **+** tooltip "New Session" / "Wait until the AI finishes processing"; no-op on an empty chat: `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:53-60`, `packages/ai/lib/src/ai_manager.dart:97-104`.
- Long-session note text and its two icon buttons (tooltips "Start new session", "Dismiss"): `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:270-309`, `packages/ai/lib/src/chat_session.dart:53-65` (threshold is a token count; number omitted).
- Session Limit Reached card: `content_views.dart:414-454`; trigger markers: `packages/ai/lib/src/models/message_content_models.dart:388-402`.
- Chat History: **⋮** "Options" menu entry, "All Sessions", tooltip "Back", relative times, "Load More", "No chat history yet", untitled -> "New Chat", page size 25, per project (`sessionScopeId`), error "Cannot load session history while agent is running.", loading text: `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:24-32,73-77,105-117`, `packages/ai/lib/src/ui/sessions_history_list.dart:10-197`, `packages/ai/lib/src/sessions_controller.dart:12,40-54`, `packages/ai/lib/src/models/session_models.dart:27`, `packages/ai/lib/src/chat_session.dart:334-368`, `packages/ai/lib/src/ui/chat_panel/chat_session_view.dart:150-165`.
- Checkpoints are looked up by session id and index, so they also show for reopened sessions if the data is there: `content_views.dart:128-135`, `checkpoint_service.dart:46,385-392`.

Open questions (not stated as facts on the page):
- Whether the editor's own Undo (Ctrl/Cmd+Z) or Action History also reverts AI edits (research open question 9): AI file edits go through `executeImportPlan`; only `replace_expression` goes through the designer (`ai_response_actions.dart:8-19`), so I make no claim. The page only says how to undo with checkpoints.
- Whether checkpoints survive Cloud<->Local sync, cloning or opening a local project on another machine (research open question 14): the page says "saved with your project" and "where the project still holds them".

Left out: the order of the session list (not shown in the client code); the token threshold of the long-session note (D3-style number, internal).

Capture requests: ai-undo-1, ai-undo-2 (both needs-sign-in: need a real AI run).

## prompting.md (`docs/ai/prompting.md`)

Research sections: Prompting guidance in the product, Custom Instructions, Suggestions (empty chat), What do you want to build? Old `prompttip.mdx` and `exampleprompts.mdx` only for ideas (advice re-written, no steps or labels copied).

Code spot-checks (all matched research):
- Placeholders per mode: `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:234-238`. Starter chips: `packages/ai/lib/src/ui/ai_suggestions.dart:6-83`.
- Dashboard hints/ideas, "Or try an example prompt", tooltip "Refresh prompts", three chips at a time, chip fills the box (does not send), the Habit Streak Tracker prompt quoted on the page: `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:35-45,50-62,345-356,434-439,545-575` (the quoted paragraph is the product's own example text, first entry of `_prompts`).
- Tour step "AI Agent" text: `lib/project/onboarding/onboarding_step.dart:81-88`.
- Question choices marked "(Recommended)" and "Other...": `packages/ai/lib/src/ui/tool_inline_views.dart:500-629`.
- Custom Instructions: popup texts, hint ("Always use concise language", "Prefer specific widget types", "Follow certain coding patterns"), "n / 5000", Reset (restores last saved text) / Save (disabled when unchanged or over the limit), snackbar "Custom instructions saved successfully", "Only applies to this project.": `packages/ai/lib/src/ui/ai_options.dart:43-243`; 5,000-character limit and file: `packages/ai/lib/src/assistant_options_manager.dart:113-165`, `packages/core/lib/src/file_system/templates/file_template.dart:49` (`.nowa/assistant_instructions.md`); sent with every prompt: `packages/ai/lib/src/prompt_controller.dart:82-96`; shared with external agents via `get_project_overview` (`custom_instructions`): `packages/ai/lib/src/mcp/mcp_canvas_tools.dart:51-97`.
- Example prompts by task are authored by me (not product text). They only ask for things the agent can do per `agent.dart:123-163` (cURL API, Google Font download, attached image saved to assets, plan, Supabase and Figma connectors). The Poppins example relies on Google Fonts having that family; the cURL line is the example from the `generate_api_call` tool description. They promise no specific output (page says results vary).
- The "goal / details / task / rules" structure is my rewrite of the old "Sandwich Technique" (intent / context / task / constraints) from `prompttip.mdx`; it's advice, not a product feature.

Left out and why:
- The old "keep each chat to about 5 prompts" rule: not from the product (research note).
- Old "earn free AI credits for bug reports" and "Feedback -> Report" flow: outdated (replaced by the **Report** card); credits are also D3-adjacent.
- "Use 'fix all issues' only when there are few errors": softened to nothing; I did not repeat it as a rule.
- Behavior from the planner/design prompts (asks product questions first, `*SampleData` classes, theming rules): client-side mirrors of server prompts (research open question 17), so not stated as product behavior.

Capture requests: ai-prompting-1.

## connectors.md (`docs/ai/connectors.md`)

Research sections: Supabase MCP, Figma MCP (and Connected Accounts), Approval Required. `What's New` 3.4 (Supabase MCP) and 3.12.3 (Figma MCP) for the capability wording. Old `data-connections/supabase/mcp.md` for ideas only.

Code spot-checks (all matched research; refinements noted):
- Icons, tooltips "Enable MCP" / "Manage MCP", icon opens the menu only when the connector is already on: `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:360-398,437-476`.
- Connector on/off is an in-memory flag per `McpManager` (resets when the project is reopened), enabled only if `authenticate` succeeds: `packages/ai/lib/src/mcp/mcp_manager.dart:5-42`. Connectors are sent only for agents that accept MCP (Agent mode): `packages/ai/lib/src/prompt_controller.dart:73`, `designer_agent.dart:32`, `planning_agent.dart:30`.
- Supabase flow: not connected -> `SbAuthDialog` (browser authorization with "Waiting for Authorization..." -> project picker with **Select** / **Create New Project** -> "Connecting to <name>..."); connected by keys only -> dialog "OAuth Authentication Required" / "MCP requires OAuth authentication with Supabase. Would you like to authenticate now?" / Cancel / **Authenticate**: `packages/ai/lib/src/mcp/supabase_mcp.dart:7-107`, `packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:92-250`, `packages/data/lib/src/supabase/ui/sb_setup/project_selection_dialog.dart:94-206`, `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:44-114`. Requires a logged-in user (`sb_oauth_setup.dart:135`).
- Menu: "Connected: <ref>" (project ref from the Supabase URL), "Switch project…", "Turn off MCP": `ai_chat_field.dart:566-644`. **Switch project…** re-runs the picker and `connectToProject` replaces the app's Supabase URL and anon key (`packages/data/lib/src/supabase/supabase_oauth_manager.dart:78-96`), so it changes the project for the app and the connector (the connector URL is built from `SupabaseManager.projectRef`, `supabase_mcp.dart:10-27`). Server: `https://mcp.supabase.com/mcp?project_ref=...`.
- Supabase capabilities (schemas/tables, SQL, tables, RLS, triggers and functions, Edge Functions, migrations; code goes into `SupabaseService`; "All MCP tool calls are reviewed by the user before execution"): the agent's Supabase instructions `packages/ai/lib/src/tools/instruction_tools.dart:136-199` (tool returns `_updatedSupabaseIntegrationInstructions2`, line 38); What's New 3.4. If not connected the agent tells the user to connect and stops (same text).
- Figma flow and menu ("Connected", "Auto-approve tools", "Turn off MCP"), waiting dialog texts, 120 s timeout, timeout message: `packages/ai/lib/src/mcp/figma_mcp.dart:8-129`, `ai_chat_field.dart:400-435,478-564`, `packages/core/lib/src/figma/figma_oauth_manager.dart:5-77`, `figma_auth_dialog.dart:7-25`, `auth_dialog.dart:44-114`. Capabilities per What's New 3.12.3 (images and icons incl. SVG; colors and text styles into the theme); code hooks `export_flutter_assets`, `export_svg_flutter_assets`, `extract_theme_colors`, `extract_theme_typography` write assets and `lib/globals/app_colors.dart`, `app_text.dart`, `themes.dart` (cloud) or the paths returned by the tool (local): `figma_mcp.dart:30-110`.
- Connected Accounts row (**Connect** / **Disconnect**, confirmation text): `packages/core/lib/src/figma/figma_settings_section.dart:26-96`, `packages/core/lib/src/settings/account_editor_settings/account_details/account_details.dart:89-93`. `FigmaIntegration.enabled = true` (no gating).
- Approval card ("Approval Required" -> "Tool Request", "Tool:", "Arguments", "No arguments", **Deny** / **Approve**, "Approved"/"Denied" badge), denial continues without the tool, stop drops approvals: `content_views.dart:962-1143`, `packages/ai/lib/src/agent/agent_runner.dart:136-149,198-249`, `packages/ai/lib/src/models/mcp_model.dart:4-9`.
- Auto-approve: single per-project flag (`ai_auto_approve_mcp_<project id>`, device-local) that auto-approves every MCP approval request; its only UI is **Auto-approve tools** in the Figma menu (`McpMenu` has it, `SupabaseMcpMenu` does not): `assistant_options_manager.dart:56-61,103`, `agent_runner.dart:136-149`, `ai_chat_field.dart:400-435,590-640`.

Possible product issue (not on the page as a complaint): the only **Auto-approve tools** switch is in the Figma menu, so a Supabase-only user has to turn Figma on to reach it (research open question 2). The page describes this plainly.

Unconfirmed / left out:
- Which connector actions need approval (open question 1): the page says Nowa AI "asks for your approval before it runs a connector action", following What's New ("asks for your OK before each Figma action") and the Supabase instructions ("All MCP tool calls are reviewed by the user").
- Whether you can name a Figma file/frame by pasting a link, and what else the Figma server can do beyond the four hooked tools (open question 10): the page says only what What's New and the hooks confirm; the example prompt names no link.
- Per-project Supabase connection vs the separate Supabase panel details (Connect / Use Keys): left to `integrations/supabase/connect.md`.
- Figma "SVG masks normalized on import", 2-minute timeout detail kept; "Max 120 s" stated as "up to 2 minutes".

Capture requests: ai-connectors-1, ai-connectors-2 (both needs-sign-in).

## external-agent.md (`docs/ai/external-agent.md`)

Research sections: Connect External Agent, External agent tools. `docs/new/whats-new.md` 3.12.0 (lines 103-110), 3.12.3 (83-91) and 3.12.5 (32-35) for the Enterprise gate, the "email `team@nowa.dev`" access route and the tool behaviors.

Badges: **Enterprise** (What's New says "Enterprise only" in all three entries) and **Desktop app** (code: server only started when `NPlatform.isDesktop`, `lib/main.dart:51-57`; menu entry also `NPlatform.isDesktop && hasAgentGrant`, `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:38-39,78-84`). The code gate is the entitlement `external_agent` (`packages/core/lib/src/billing/entitlement_keys.dart:13`) with the comment "Granted by the beta plan, which stacks on top of whatever plan the user is on" (`ai_chat_panel.dart:37`): so the plan is called "Enterprise" in What's New but "beta plan" in code (research open question 3). The page says "Enterprise only for now", names no plan beyond that, and tells readers to email `team@nowa.dev`.

Code spot-checks (all matched research):
- Dialog "Connect External Agent": fields "MCP Server URL" and "Claude Code" (`claude mcp add --transport http nowa "<url>"`), copy buttons (tooltip "Copy", snackbar "<label> copied"), help text, "Done", not-running text with port 4680: `packages/ai/lib/src/ui/mcp_connect_dialog.dart:9-110`.
- Server: loopback only (127.0.0.1:4680, path `/mcp`), token in `?token=` or Bearer header, browser Origin/Host refused, runs only while the desktop app runs, token generated once and stored (`mcp_token`), grant applied live (`ExternalAgentSync`): `packages/ai/lib/src/mcp/nowa_mcp_server.dart:22-29,111-199`, `packages/ai/lib/src/mcp/external_agent_access.dart:13-85`, `lib/main.dart:51-57,106`.
- Tool list and groupings: project tools `nowa_mcp_server.dart:389-418`; canvas tools `packages/ai/lib/src/mcp/mcp_canvas_tools.dart` (`get_project_overview` :51, `get_guidelines` :68, `get_theme` :134, `get_selection` :167, `get_widget_tree` :228, `open_in_canvas` :364, `screenshot` :425, `save_project` :697); `set_permissions` and `add_image_assets` `packages/ai/lib/src/mcp/mcp_backend_tools.dart:16-131` (20 images per call, 20 MB each, PNG/JPG/GIF/WebP/BMP/SVG, into `assets/images/`); production tools derived from the agents minus `_excludedTools`: `nowa_mcp_server.dart:31-60`.
- Safeguards: `Info.plist` / `AndroidManifest.xml` edits refused (`nowa_mcp_server.dart:320-326,346-356`), calls one at a time (`_queue`, `:94`), 3-minute open timeout (`:444`), save-before-switch and failure message (`:459-480`); unparsable Dart refused and stale widget ids refused: What's New 3.12.3 line 89 and `packages/ai/lib/src/tools/edit_tool.dart`, `mcp_canvas_tools.dart:696-705` (expression id fingerprint).
- "Building rules" delivered on connect and by `get_project_overview` / `get_guidelines`: `packages/ai/lib/src/mcp/nowa_mcp_guidance.dart:23-84`.
- Custom Instructions returned by `get_project_overview` (`custom_instructions`): `mcp_canvas_tools.dart:97`.

Left out and why:
- Whether external-agent work uses Nowa AI credits (research open question 4): not stated either way. (The code comment only says explorer subagents "spend Nowa credits", which is why they aren't exposed; the page does not mention explorers.)
- Client-specific setup for Claude Desktop and Cursor (open question 5): the dialog only gives the URL and a Claude Code command, so the page tells readers to paste the URL and "ask it to add Nowa as an MCP server" (the dialog's own wording). No per-client config steps invented.
- Tool parameters (screenshot width 200-1600 px, expression ids): too detailed for this page.
- Exact desktop platforms (macOS/Windows): the page just says "desktop app" and links to the install page.

Capture requests: ai-external-agent-1 (needs-sign-in: needs an entitled desktop account; blur the token).
