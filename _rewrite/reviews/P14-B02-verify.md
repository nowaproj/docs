# P14-B02 verify: Nowa AI pages

Verifier P14-B02-V. Pages under `docs/ai/`: `index`, `prompting`, `modes`, `chat`, `context`, `undo-and-history`,
`connectors`, `external-agent`. Diff: `git diff origin/main -- docs/ai/`. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Official docs read 2026-10-12 with curl (WebFetch could not resolve
the hosts).

## Summary

- **Pages checked:** 8 (all of the batch), every `+` and `-` line of the diff, plus the unchanged text for the
  audience rules.
- **Claims checked:** 94 table rows (many group several claims), against the code and, for Claude Code, Cursor and
  Supabase, their current official docs.
- **Fixed: 12.** `index.md` 3 (Design isn't only for new apps; **Approval Required** cards come only from connector
  actions; **Restore Checkpoint** doesn't put "your project back to how it was" for packages, fonts, Figma or
  Supabase), `prompting.md` 6 (status bar counts only errors in **Problems**; **Suggested next steps** are optional;
  **Summarize** only in empty Agent/Plan chats; **Restore Checkpoint** needs a hover; "usually fix" dropped; stopwatch
  follow-up no longer assumes the **Make it real** card), `modes.md` 1 (the chip, not the hint, always shows the mode),
  `context.md` 1 (any part of the app open in code mode is attached, not only screens and components),
  `connectors.md` 1 (MCP is Model Context Protocol, not "short for" a description).
- **Removed: 0. Restored: 1** (`index.md`: the app belongs to you). **Added: 1**, routed from B03 (link to "What your
  plan includes").
- **Audience:** no code-only facts left on the pages; the 7 moved facts are in the for-code file verbatim. Tightened
  repetition in `prompting.md` (5 merges or cuts, no content lost).
- **Flagged items:** "How a request goes", "Improve the result step by step", "When the result isn't right", "Fix
  errors" and the two kinds of undo are accurate after the fixes above; restored example prompts promise no output;
  Supabase Storage through SQL holds (Database tools on by default, Storage tools off; buckets and their rules are SQL
  and RLS); Claude Code scope and Cursor `mcp.json` match the official docs; the paste alternative is neutral.
- **Open issues:** 6 (P10 and P50 need live checks, Claude Desktop steps, external-agent credits, board undo on AI
  edits, `prompting.md` length).

## ai/index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "How a request goes" step 1: modes | fixed | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:37-39` | "Design shapes the look of a new app, Agent does everything else" made Design sound new-app only; the menu says "Create/refine the look and flow without logic", and `modes.md` uses Design to restyle. Now "Design shapes how your app looks and flows, Agent can do everything, from design to working features". |
| Step 2: Enter sends; click a widget first to point at it | ok | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:72-84`; `packages/ai/lib/src/prompt_controller.dart:117-133` | |
| Step 3: **Questions** card, **Approval Required** card | fixed | `packages/ai/lib/src/ui/tool_inline_views.dart:395`; `packages/ai/lib/src/ui/content_views.dart:1039`; `packages/ai/lib/src/models/ai_tool.dart:14`, `packages/ai/lib/src/tools/bash_tool.dart:45` | Labels ok. Approval cards only come from connector actions (the one local tool that needs approval, `bash`, is commented out of the toolset, `packages/ai/lib/src/agent/agent.dart:141`), so the step now says "wants your OK for a connector action". |
| Step 4: **Play** on a screen | ok | `packages/designer/lib/src/panels/canvas_titles.dart:328` | |
| Step 5: **Restore Checkpoint** undoes the request | ok | `packages/ai/lib/src/ui/content_views.dart:183` | |
| Project saved when a request finishes | ok | `packages/ai/lib/src/chat_session.dart:300-304` | |
| Table rows (plain words, data models, functions, cURL, packages from pub.dev, project images) | ok | `packages/ai/lib/src/agent/agent.dart:122-157`; `packages/ai/lib/src/tools/generate_api_call_tool.dart:7-11`; `packages/ai/lib/src/tools/analyze_tool.dart:6-60` | "Edit project files ... your app's iOS and Android setup": the in-app agent's `edit` and `write` tools have no platform-file restriction (`packages/ai/lib/src/tools/write_tool.dart:9,18`), unlike the external agent. "Run the app first, so there are logs": `read_logs` description, `analyze_tool.dart:38-44`. |
| **load packages** setting | ok | `packages/core/lib/src/settings/experimental_flags_dialog.dart:55` | |
| Usage: **% used**, token counts, **Session Details**, **Global Usage** | ok | `packages/ai/lib/src/ui/chat_panel/remaining_credits_view.dart:77-79`; `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:137-172`; `packages/ai/lib/src/ui/session_details_popup.dart:70,241` | |
| "Use **Restore Checkpoint** and your project goes back to how it was" | fixed | `ai/undo-and-history.md` rules list | Overstated: packages, fonts, Figma imports and Supabase changes stay. Now "to undo that request's changes" (the link explains the rest). |
| Intro: "writes real Flutter code that you own" dropped | restored | `docs/publish/download-code.md:8` | Ownership is a fact the reader cares about; intro now says "your real app, and it belongs to you". |
| B03 routing: link to "What your plan includes" | added (routed from B03) | `docs/account/plans-and-usage.md:10` (`{#what-your-plan-includes}`) | Anchor checked before linking. |
| Other R9 lead-ins and reasons | ok | | Accurate, not filler. |

Removed facts: the "Edit other files" row text is in the for-code file (`#project-files`); the rest is reworded on the page.

## ai/modes.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Switch between requests in the same conversation | ok | `packages/ai/lib/src/chat_session.dart:176-191` (`setOptions` keeps the session) | |
| "The chat field's hint changes to match, so you can always see which mode you're in" | fixed | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:234-237`; `packages/nowa_ui/lib/src/components/option_chip.dart:127-134` | The hint only shows while the field is empty; it's the chip that always shows the mode. Now "The chip shows the mode you picked, and the chat field's hint changes to match." |
| Design: screens, navigation, theme, demo data; doesn't set up APIs or Supabase or use connectors | ok | `mode_selector.dart:37`; `packages/ai/lib/src/agent/designer_agent.dart` toolset | |
| Plan: changes nothing; packages explained | ok | `packages/ai/lib/src/agent/planning_agent.dart` | |
| Plan rewritten as one complete version; only the latest plan keeps its buttons | ok | `packages/ai/lib/src/ui/tool_inline_views.dart:130,161,265,275` | |
| Agent: "fonts, images and other files" | ok | `packages/ai/lib/src/tools/download_font_tool.dart`, `save_attached_image_tool.dart`, `write_tool.dart` | |
| Thinking level: "More thinking helps with tricky work, and less gets small edits done faster" | ok | `packages/ai/lib/src/agent/agent.dart:22-27` (menu descriptions) | |
| Example prompts ("Make the home screen feel lighter", "Plan a Favorites feature for my recipe app") | ok | | Requests, no promised output. |

Removed facts: none (rewordings only).

## ai/prompting.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Describe your app" checklist | ok | advice (old P5) | |
| **Habit Streak Tracker** prompt (quoted), **Split the Bill**, **Or try an example prompt**, refresh button | ok | `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:43-61,346-356,553,559` | Quote is verbatim. |
| Design with demo data, then **Make it real** one feature at a time | ok | `packages/ai/lib/src/ui/chat_panel/chat_session_view.dart:184-186` (empty Design chat text); `ai/modes.md` | |
| Chat field hints; starter chips only in empty Plan/Agent chats; dashboard box types out ideas | ok | `ai_chat_field.dart:234-237`; `chat_session_view.dart:192`; `describe_app_panel.dart:36-41,396-420` | |
| **(Recommended)**, **Other...** | ok | `packages/ai/lib/src/ui/tool_inline_views.dart:518,624` | |
| "Be specific about looks and behavior" table | ok | advice (old P10); responsive layouts: `docs/design/responsive.md` | |
| **Suggested next steps** "offers up to three follow-ups" after a request | fixed | `packages/ai/lib/src/tools/next_steps_tool.dart:3-22` (optional, 1-3, fills the field, never sends) | The agent decides whether to suggest; now "Nowa AI may offer up to three follow-ups". |
| "In an empty chat, the **Summarize** chip..." | fixed | `chat_session_view.dart:192`; `packages/ai/lib/src/ui/ai_suggestions.dart:16-19` | No chips in Design mode; now "In an empty **Agent** or **Plan** chat". |
| **+** (**New Session**), `@` and **+** to attach | ok | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:55`; `ai/context.md` | |
| "Your published app doesn't change until you publish again" | ok | publishing is an explicit **Deploy** step; no auto-deploy or auto-publish code (`grep -i "autoDeploy\|autoPublish"` over `packages`, `lib`: none) | |
| "Click **Restore Checkpoint** above the reply to take your project back to how it was before that request" | fixed | `packages/ai/lib/src/ui/content_views.dart:167-196` (button only on hover); `ai/undo-and-history.md` rules | The button appears only when you hover the dotted line, and "back to how it was" overstated (packages, fonts, Figma, Supabase stay). Now "Hover the dotted line above the reply and click **Restore Checkpoint** to undo that request". |
| A restore also undoes later requests | ok | `packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-273` | |
| "Nowa counts the problems it finds in the status bar ... and lists them in **Problems**" | fixed | `lib/status_bar.dart:197-199`; `docs/test/problems.md:14` | Only the red number counts the errors in **Problems**; the other two count **Logs** messages. Now "The red number in the status bar ... counts the errors Nowa finds. Click it to see them in **Problems**." |
| "Nowa AI can usually fix them for you" | fixed | | Frequency claim nobody can check; now "can help you fix them". |
| **Fix with AI** / **Explain with AI** placement; prompt waits in the field when busy | ok | `packages/core/lib/src/widgets/fix_with_ai_button.dart:28-44`; `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:94`; `nowa_run_play_mode.dart:89`; `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:348`, `publishing_error.dart:93`; `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:489-491` | |
| Click a problem, **Copy** | ok | `packages/core/lib/src/panels/problems_panel.dart:516-531` | |
| **Fix** chip prompt; logs exist only after a run | ok | `ai_suggestions.dart:21-24`; `packages/ai/lib/src/tools/analyze_tool.dart:38-44` | |
| Example prompts table, cURL explained | ok | unchanged rows; `generate_api_call_tool.dart:7-19` | |
| "Describe a screen in detail" prompts | ok | verbatim from `old-docs/ai/exampleprompts.mdx:57-66,102-104` | Requests only; old result screenshots not reused; the tip below says results vary. |
| Stopwatch follow-up: "click **Make it real**, or ask in **Agent** mode" | fixed | `packages/ai/lib/src/tools/design_handoff_tool.dart` (the card comes only when the designer hands off); `ai/modes.md` | The **Your app design is complete** card isn't guaranteed after one screen, and **Make it real** starts the feature Nowa AI recommends, not necessarily the timer. Now "switch to **Agent** mode and ask". "doesn't count anything yet" now "won't run the timer yet", tied to "without logic" (`mode_selector.dart:37`). |
| Custom Instructions examples (incl. the Unsplash rule) | ok | | Standing rules, no promised result. |
| Saved with the project; anyone who works on it gets them; external agent receives them | ok | `packages/ai/lib/src/assistant_options_manager.dart:113-165`; `packages/core/lib/src/file_system/templates/file_template.dart:49`; not git-ignored (`packages/core/lib/src/file_system/templates/common/gitignore_template.dart:13-16`) | |
| **Reset** / **Save** | ok | `packages/ai/lib/src/ui/ai_options.dart:204-226` | |

Tightening (no content lost): merged "Start wide in Design" with "Ask for one job at a time" (both examples kept); dropped
the repeated "You don't need Flutter words" (the intro says it); merged "Point at it" into "Say what's wrong"; dropped
the second **Make it real** mention (explained in "Describe your app"); merged "this project only" with "saved with
the project". About 2,420 words with code blocks and alt text (about 2,100 without), because the fixes added a few
words back. Not split; the writer's split proposal (`ai/example-prompts.md`) stands if it grows.

Removed facts: the quick-tour quote is on `get-started/editor-tour.md:134` ("AI Agent" row); the
`.nowa/assistant_instructions.md` path is in the for-code file (`#project-files`).

## ai/chat.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Code-mode edits applied before sending; project saved after | ok | `packages/ai/lib/src/chat_session.dart:266-268,300-304` | |
| Chips only fill the field, never send | ok | `packages/ai/lib/src/ui/ai_suggestions.dart:71-76` | |
| Step tooltips, "tool" explained | ok | `packages/ai/lib/src/ui/content_views.dart:766-769` | |
| **Writing code** / **Writing member in class** cards, **Show raw code** | ok | `packages/ai/lib/src/tools/legacy/write_code_tool.dart:23,101` (still in the Agent and Design toolsets, `packages/ai/lib/src/agent/agent.dart:131-132`, `designer_agent.dart:48-49`); `content_views.dart:1187` | |
| **Constants updated**, **Open Constants**, API key explained | ok | `packages/ai/lib/src/ui/chat_panel/summary_card.dart:233,251` | |
| **View Raw Data** | ok | `packages/ai/lib/src/ui/message_options.dart:16` | |
| **Service under load**: Nowa retries for you, growing waits | ok | `content_views.dart:480-500`; `packages/ai/lib/src/agent/agent_runner.dart:68,118-126` (up to 5 retries, wait grows by a second each time) | |
| **Server is not reachable** / **Server took too long to respond** | ok | `packages/ai/lib/src/services/agent_service.dart:262-264` | |
| **Report an issue** in the support panel, link `../account/help.md#report-an-issue` | ok | `packages/nowa_ui/lib/components/support_dialog.dart:509`; `docs/account/help.md:27` | |
| R9 additions (stop early, "you can step in at any time", "look before you commit") | ok | | Accurate, short. |

No fixes needed. Removed facts: none.

## ai/context.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| A placed component attaches the component itself, so changes apply everywhere it's used | ok | `packages/ai/lib/src/prompt_controller.dart:120-129` (modifiable category); `docs/design/components.md` | |
| Several widgets selected: the first one | ok | `prompt_controller.dart:121-133` (`.first`) | |
| "With nothing selected, Nowa AI gets the screen or component that's open in the code editor" | fixed | `prompt_controller.dart:136-141` | Any class open in the editor is attached (a model or a global state too); the rewrite had narrowed it. Now "the screen, component or other part of your app that's open in code mode" (the term `chat.md` and `code/code-mode.md` use). |
| "To attach several, open **+** again" | ok | `packages/ai/lib/src/ui/attachement_menu.dart:95-112` (picking closes the palette) | |
| Check mark, lock ("for reading only"), **included** ("short summary ... because something you attached uses it") | ok | `attachement_menu.dart:116-128` | |
| FROM YOUR APP lists screens, components and other parts; **AppState**, **AppConstants** explained | ok | `attachement_menu.dart:95-99` (every class except State classes) | Names from the page's screenshot. |
| "Paste the text straight into your message" (limits list and table) | ok | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:66-70,115-130` (desktop paste handler inserts text; on the web the field's own paste runs) | Neutral alternative; no bug claimed. P10 stays an open product question (see Open issues). |
| "save an image to your project" | ok | `packages/ai/lib/src/tools/save_attached_image_tool.dart` | |
| What Nowa AI receives (short summary, project map) | ok | research `features-ai.md` "Add context"; `attachement_menu.dart:116-128` | |

Removed facts: none (rewordings only).

## ai/undo-and-history.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro: most AI work can be undone; checkpoint per request | ok | `packages/ai/lib/src/ui/content_views.dart:138-196`; rules list on the page | The exceptions stay in the rules list. |
| Two kinds of undo: checkpoints for Nowa AI's work, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> for your own board changes | ok | `lib/setup_general_actions.dart:26`; `packages/core/lib/src/actions/undo_actions.dart:8-20`; `docs/reference/shortcuts.md:44,60` | Makes no claim either way about <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> on AI edits (still an open research question). |
| Dialog shows the files that will go back | ok | `content_views.dart:147-152`; `packages/ai/lib/src/checkpoints/checkpoint_warning.dart:40-45,90-91` | |
| Restore covers the chosen request and later ones; reapply covers it and earlier ones | ok | `packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-306` (`index >=` / `index <=`) | |
| Checkpoints saved with the project, not a backup, not in Git or GitHub | ok | `packages/ai/lib/src/checkpoints/snapshot_db.dart:98`, `blob_storage_service.dart:16-19`; `packages/core/lib/src/project/settings_service.dart:34-38`; `gitignore_template.dart:13-16` | The folder name is in the for-code file (`#project-files`). |
| New session: "old context can't muddle the new one" | ok | `packages/ai/lib/src/chat_session.dart:37-38` (new session id, new runner) | |
| **Session Limit Reached**: "Your project and its checkpoints stay as they are" | ok | `content_views.dart:437-452` (the card only offers **Start new session**) | |
| Reopened session: "Nowa AI remembers that whole conversation" | ok | `chat_session.dart:355-368` (reuses the session id; the history lives on Nowa's servers and requests carry only the id, `packages/ai/lib/src/agent/agent_runner.dart:70-78`) | |

No fixes needed. Removed facts: the `.nowa/temp/` sentence is in the for-code file (`#project-files`), with its
consequence kept on the page.

## ai/connectors.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "labeled **MCP**, short for the standard way an AI agent connects to another service" | fixed | https://supabase.com/docs/guides/getting-started/mcp ("Model Context Protocol") | MCP isn't short for that phrase. Now "labeled **MCP** (Model Context Protocol), the standard way an AI agent connects to another service." |
| Backend explained; approval "unless you turn on **Auto-approve tools**" | ok | `packages/ai/lib/src/agent/agent_runner.dart:126-130` (`autoApproveMcp`) | |
| **Use Keys** → **OAuth Authentication Required** → **Authenticate** | ok | `packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:71`; `packages/ai/lib/src/mcp/supabase_mcp.dart:43-61,79-91` | |
| Project ref explained | ok | `supabase_mcp.dart:19-22` | |
| Capability list in plain words (SQL, tables, RLS, functions and triggers, Edge Functions, migrations) | ok | `packages/ai/lib/src/tools/instruction_tools.dart:160-162,186-197`; https://supabase.com/docs/guides/getting-started/mcp (Database, Edge Functions groups); https://supabase.com/docs/guides/database/postgres/row-level-security; https://supabase.com/docs/guides/functions | |
| Storage buckets and their rules | ok | `supabase_mcp.dart:22` (URL has only `project_ref`: no `features`, no `read_only`); Supabase MCP page: "All groups except Storage are enabled by default", Database group has `execute_sql` and `apply_migration`, Storage group (`list_storage_buckets`, `update_storage_config`) "disabled by default"; https://supabase.com/docs/guides/storage/buckets/creating-buckets ("Since storage is interoperable with your Postgres database, you can also use SQL"); https://supabase.com/docs/guides/storage/security/access-control (access rules are RLS policies on `storage.objects`) | Holds through the database tools, not dedicated Storage tools. The client sends no tool filter (`packages/ai/lib/src/mcp/mcp_manager.dart`, `prompt_controller.dart:78`). Matches `integrations/supabase/storage.md:13,76`. |
| "It also connects your app to what it built, so your screens can show and save that data" | ok | `instruction_tools.dart:145-146,173-179` | |
| Example prompts (tasks table; chat app) | ok | `instruction_tools.dart:163-164` (realtime for chat) | Requests, no promised output; Supabase sign-in exists (`integrations/supabase/auth.md`). |
| SVG icons; theme reloaded, check **Themes** | ok | `packages/ai/lib/src/mcp/figma_mcp.dart:33-37,72-86` | |
| Approval card: tool name and **Arguments** explained | ok | `content_views.dart:1039` | |
| Real Supabase project; restore doesn't undo it; Supabase's advice on production data; test project | ok | `ai/undo-and-history.md` rules; Supabase MCP page: "Production projects can contain sensitive data...", "Protect production data: Connect to a production project only when the task requires production evidence", "Keep manual approval enabled for interactive work", "Branching ... test changes in a safe environment" | |
| Turning a connector off | ok | `packages/ai/lib/src/mcp/mcp_manager.dart:14-27`; `prompt_controller.dart:78` (only enabled connectors are sent) | |

Removed facts: the `SupabaseService` sentence (`#supabase`) and the theme file paths (`#themes`) are in the for-code
file, with their consequences kept on the page. Admonitions: 2 (unchanged).

## ai/external-agent.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| MCP server, terminal, port, overflow explained | ok | | One clause each (R4). |
| Claude Code: run the command from the folder you start Claude Code from; confirms with a line starting "Added" | ok | https://code.claude.com/docs/en/mcp ("claude mcp add confirms a successful add by printing an Added ... line") | |
| Local scope is the default (only that folder); `--scope user` for every folder; flag after the name | ok | same page: "Local scope is the default. A local-scoped server loads only in the project where you added it"; "User-scoped servers ... available across all projects on your machine"; example `claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic` | |
| "Your agent may ask your permission before it uses a Nowa tool" | ok | same page (permissions apply to MCP tools); https://cursor.com/docs/mcp ("Cursor asks for approval before using MCP tools by default") | |
| URL stays the same on this computer | ok | `packages/ai/lib/src/mcp/external_agent_access.dart:16,52-57` (token saved once); `packages/ai/lib/src/mcp/nowa_mcp_server.dart:27` (port 4680) | |
| Cursor: `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project), `mcpServers` entry with `url` | ok | https://cursor.com/docs/mcp ("Using mcp.json", HTTP example, "Project Configuration" / "Global Configuration") | The URL Nowa shows already carries `?token=` (`nowa_mcp_server.dart:111-114`), so a plain `url` entry is enough. |
| Cursor approval "unless you change that in Cursor" | ok | https://cursor.com/docs/mcp ("Run Mode": MCP follows the same Run Modes as terminal commands) | |
| Dialog labels, copy message, help text, **Done**, server-not-running message | ok | `packages/ai/lib/src/ui/mcp_connect_dialog.dart:22-48` | |
| Tool table in plain words; images to "your project's images, ready to use" | ok | `packages/ai/lib/src/mcp/mcp_backend_tools.dart:97-98,109,147` | |
| Platform settings files refused; `set_permissions` for permissions | ok | `nowa_mcp_server.dart:320-327,344-353` | |
| Open timeout 3 minutes | ok | `nowa_mcp_server.dart:444` | |

No fixes needed. Removed facts: `assets/images/` (`#assets`) and the two platform file names (`#project-files`) are in
the for-code file, with their consequences kept on the page.

## Coverage spot checks

Obsolete rows (2 of 2 checked):

| Row | Result | Evidence |
|---|---|---|
| H3. Tokens and cost shown for each message | confirmed obsolete | Token counters are session totals (`packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:126-172`, `session.sessionUsage`); the **Session Details** popup shows the session's **Credits Used**, nothing per message (`packages/ai/lib/src/ui/session_details_popup.dart:46-62`). Session totals are on `ai/index.md#usage-and-credits`. |
| H7. Think Mode toggle (brain icon) | confirmed obsolete | Levels **Instant**, **Thinking**, **Deep Thinking** (`packages/ai/lib/src/agent/agent.dart:22-27`); the brain icon is now the **Thinking** level's icon; reasoning shows in **Thinking process** (`packages/ai/lib/src/ui/content_views.dart:813-818`). `ai/modes.md` keeps the note and the "think mode" keyword. |

Covered rows sampled (12), all confirmed on the cited page:

| Row | Page checked |
|---|---|
| H2 open the chat from the left sidebar | `ai/index.md#open-the-ai-assistant` |
| H5 **Global Usage** | `ai/index.md#usage-and-credits` |
| H8 Custom Instructions steps | `ai/prompting.md#custom-instructions` |
| H11 smart selection | `ai/context.md#select-what-you-want-to-change` |
| H12 attach several screens | `ai/context.md#add-context` ("open **+** again") |
| H16 replay checkpoint (now **Reapply Checkpoint**, keyword kept) | `ai/undo-and-history.md#reapply-a-checkpoint` |
| H17 checkpoints on reopened chats | `ai/undo-and-history.md#reopen-a-past-chat` |
| H19 chat history | `ai/undo-and-history.md#reopen-a-past-chat` |
| P2 small steps, both examples | `ai/prompting.md#tips-that-help` |
| P9 sandwich technique (keyword kept) | `ai/prompting.md` (Goal, Details, Task, Rules) |
| P13 report issues | `account/help.md#report-an-issue` (**Report an issue**, **Include a snapshot of the current project**: `packages/nowa_ui/lib/components/support_dialog.dart:340,509`), linked from `ai/chat.md#send-a-bug-report` |
| S7 approve every backend operation | `ai/connectors.md#approve-what-a-connector-does` |

Added rows (P5, P7, P10, P11, P12, P15, E2-E4, H9, S9, S10) were all found on their pages; S9 re-verified against the
Supabase docs and the code (see `ai/connectors.md` above).

## Links and structure

- All relative links on the 8 pages resolve, anchors included (script check), and every inbound link from other
  pages to `docs/ai/` still resolves. Links to `../code/generated-code.md` use only `#project-files` and `#supabase`.
- No heading was renamed or removed against `origin/main` (only additions); the explicit ID `{#custom-instructions}`
  is kept.
- Front matter parses as YAML on all 8 pages; no H1, no `---` rules, no emoji, no hype words. Admonitions: modes 2,
  connectors 2, the others 0 or 1. Image and video references are unchanged.
- For-code file: all 7 moved bullets match the `origin/main` text exactly.

## Open issues

1. **P10, Attach text file in the web app** (`packages/ai/lib/src/prompt_controller.dart:218-236` keeps only picked
   files with a path; `packages/core/lib/src/utils.dart:358-362` reads them with `dart:io`; browsers give no path).
   Still unconfirmed live, so `ai/context.md` stays neutral: it offers pasting the text as a plain alternative and
   claims no bug. A known-issues entry (B12) should wait for a live check, as the writer proposed.
2. **P50, playground chat toolbar** (writer's "For other pages" item 2). Not on these pages. `ai/index.md` still says
   the first message in the playground asks you to sign in (`packages/ai/lib/src/chat_session.dart:263-264`); a live
   check should confirm that Enter still reaches the sign-in request while the toolbar shows the grey box.
3. **Claude Desktop setup.** No official Anthropic page found that confirms how to add a local HTTP MCP server, so
   `ai/external-agent.md` keeps the dialog's generic instruction (paste the URL into your agent) and adds no steps.
4. **Credits for a connected agent.** Whether its work uses Nowa AI credits is unconfirmed; the page says nothing about
   it. The server excludes the one tool that starts Nowa-hosted runs, `spawn_explorer`
   (`packages/ai/lib/src/mcp/nowa_mcp_server.dart:33-35`), which suggests not, but that isn't a statement to publish.
5. **<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> on AI edits.** Unknown whether board undo also reverts Nowa AI's
   changes; `ai/undo-and-history.md` makes no claim either way.
6. **`ai/prompting.md` length.** About 2,420 words (2,100 without code blocks and alt text), above the ~2,200 guide.
   Tightened, not split, as instructed; the writer's split (`ai/example-prompts.md` for "Example prompts by task" and
   "Describe a screen in detail") is the way to go if it grows.
