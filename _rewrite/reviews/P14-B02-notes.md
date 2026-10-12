# P14-B02 notes: Nowa AI pages

Batch P14-B02 (phase 14 audience pass, rules R1-R9 in `_rewrite/P14-BRIEF.md`). Pages under `docs/ai/`. Code refs are
relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Coverage: `P14-B02-coverage.md`. Moved facts:
`P14-B02-for-code.md`.

Inbound anchors kept unchanged (other pages link to them): `modes.md#agent-mode`, `#design-mode`, `#plan-mode`,
`#set-the-thinking-level`; `undo-and-history.md#start-a-new-session`; `chat.md#recover-from-errors`, `#stop-a-request`,
`#start-from-a-suggestion`; `connectors.md#connect-figma`, `#approve-what-a-connector-does`;
`prompting.md#custom-instructions` (explicit ID). No image, explicit heading ID, URL or file name changed.

## ai/index.md

Changed for the reader:
- Intro rewritten around what it means for the reader's app (R1): "What it builds is your real app, the same one you
  edit visually, test and publish" replaces "writes real Flutter code that you own".
- Table rows in plain words: data models and functions explained (R8); "Edit other files" became "Edit project files"
  without file names (moved, R2); "runs a code analysis" became "runs a full code check" (the `analyze` tool's
  `flutter` source, `packages/ai/lib/src/tools/analyze_tool.dart:6-36`); packages explained as "ready-made add-ons from
  pub.dev" (R4); the APIs row explains what a cURL command is for and what the result means for the screens (R4).
- Session explained once ("a session is one conversation"); tokens explained once in "Usage and credits" (R4).
- R9: short lead-ins on each section, the why after steps (select first "so Nowa AI knows exactly what you mean",
  **Fix with AI** "so you don't have to copy it yourself").
- Keywords: added "how to use Nowa AI" (old page title) and "tokens".

Added:
- New section "How a request goes" (5 steps: mode, describe, watch and answer cards, check, keep going or restore).
  Every step is an existing, verified fact elsewhere on the AI pages: mode chip (`packages/ai/lib/src/ui/chat_field/mode_selector.dart:51`),
  Enter sends (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:73-83`), the first selected widget is attached
  (`packages/ai/lib/src/prompt_controller.dart:116-141`), **Questions** (`packages/ai/lib/src/ui/tool_inline_views.dart:395,442`),
  **Approval Required** (`packages/ai/lib/src/ui/content_views.dart:1039`), **Play** on a board item
  (`get-started/first-app.md` step 4), **Restore Checkpoint** (`content_views.dart:183`), checkpoint closed and project
  saved when a request ends (`packages/ai/lib/src/chat_session.dart:300-304`).

Moved to the code section (R2): the "Edit other files" row text (see for-code file, `#project-files`).

Open questions: none new. P50 (3.13 playground: the chat toolbar draws as a grey error box when signed out,
`ai_chat_field.dart:1028` watches `BillingProvider`) is not documented anywhere; the playground note on this page still
says Nowa asks you to sign in on the first message (the sign-in request is `packages/ai/lib/src/chat_session.dart:263-264`).
See "For other pages".

## ai/prompting.md

Changed for the reader:
- Rebuilt around the reader's journey: describe your app, Nowa's hints, tips, be specific, improve step by step, when
  the result isn't right, fix errors, example prompts, detailed screen prompts, Custom Instructions. Description and
  keywords updated (added "prompting tips", "prompt template", "sandwich technique" (old section name), "describe my
  app", "AI result wrong", "AI not doing what I want", "fix errors with AI").
- Duplicates removed: "Point at the part you mean" and "Check each result" now live in "Improve the result step by
  step" with an example each; "Be specific about looks" became its own section; "Start a new session" moved into
  "Improve..." with the old example pair.
- Dropped the quick-tour quote ("Use the AI agent to build, edit, or fix anything...", `lib/project/onboarding/onboarding_step.dart:82-84`):
  UI copy that repeats `ai/context.md`; the tour itself is on `get-started/editor-tour.md` ("AI Agent" row).
- R4: cURL explained under the example table ("the sample request most API docs show for each call").
- R2: the Custom Instructions file path moved to the code section; the page keeps the consequence (saved with the
  project, so it's there when you come back and every project member gets it). One pointer to
  `../code/generated-code.md#project-files`.
- R9: lead-ins and reasons on each section; reassurance in "When the result isn't right" (you can always get back on
  track; the published app doesn't change until you publish again).

Added (old-docs items, see coverage) and evidence:
- "Describe your app" checklist (old P5): advice. The **Habit Streak Tracker** prompt is quoted from
  `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:44-49`; example chips page through a fixed list three at a
  time from the start (`:346-356`), so **Habit Streak Tracker**, **Shared Grocery List** and **Split the Bill** show
  first; **Or try an example prompt** `:553`; refresh tooltip **Refresh prompts** `:559`. **Make it real** card:
  `packages/ai/lib/src/ui/guided_inline_views.dart:71,90,107`.
- "Be specific about looks and behavior" table (old P10): the three pairs from `old-docs/ai/prompttip.mdx:157-166`,
  "Make it responsive" reworded to what Nowa offers (`docs/design/responsive.md`); fourth row reuses the page's own
  "Saved" example.
- "Improve the result step by step" (old P7, P15): **Suggested next steps** offers 1-3 follow-ups
  (`packages/ai/lib/src/tools/next_steps_tool.dart:10,21-22`; strip title `packages/ai/lib/src/ui/chat_panel/next_steps_bar.dart:91`);
  `@` and **+** attach a screen (`ai/context.md`); **Summarize** chip prompt "Give a brief summary of the project..."
  (`packages/ai/lib/src/ui/ai_suggestions.dart:16-19`); **New Session** tooltip (`packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:55`).
  Example pair adapted from `old-docs/ai/prompttip.mdx:93-106` (file name replaced by "the Orders screen attached").
- "When the result isn't right" (new for the reader; old P15 "review and give feedback"): **Restore Checkpoint**
  (`packages/ai/lib/src/ui/content_views.dart:183`), restore undoes that request and every later one in the session
  (`packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-273`, index >= chosen); Details panel
  (`docs/design/properties.md`); Plan mode asks questions and changes nothing (`ai/modes.md`); new session
  (`ai_chat_panel.dart:55`). "Your published app doesn't change until you publish again": publishing is an explicit
  **Deploy**/upload step (`docs/publish/web.md`, `docs/publish/builds.md`).
- "Fix errors" (old P11, P12): status bar counts and **Problems** (`docs/test/problems.md`); **Fix with AI** and
  **Explain with AI** send the prompt, or leave it in the chat field while the AI is busy
  (`packages/core/lib/src/widgets/fix_with_ai_button.dart:28-44`), shown on Nowa Run errors
  (`packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:94`, `nowa_run_play_mode.dart:89`), web publish errors
  (`packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:348`, `publishing_error.dart:93`) and
  failed build steps (`packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:489`); a problem's menu has
  **Copy** (`packages/core/lib/src/panels/problems_panel.dart:523-527`; `docs/test/problems.md` "Menu"); **Fix** chip
  prompt "Fix all errors in the project..." (`ai_suggestions.dart:21-24`); logs exist only after the app has run
  (`packages/ai/lib/src/tools/analyze_tool.dart:38-44`). "Few errors: fix all; many: one at a time" is the old page's
  advice (`prompttip.mdx:194-197`).
- "Describe a screen in detail" (old E2-E4): both prompts copied verbatim from `old-docs/ai/exampleprompts.mdx:57-66`
  and `:102-104`; Design mode is "Create/refine the look and flow without logic"
  (`packages/ai/lib/src/ui/chat_field/mode_selector.dart:37`), hence the "Start" button note. Result screenshots not
  reused (no promised output).
- Custom Instructions examples (old H9, adapted): "Always use images from a specific website" became "For sample photos,
  use free images from Unsplash"; "Make your code structured" replaced by two rules a non-coder would write. Custom
  Instructions are plain text sent with every request (`packages/ai/lib/src/prompt_controller.dart`, research
  `features-ai.md` "Add context"); no promise about results. "Anyone who works on the project gets them too": they are
  read from and written to the project file `FileTemplate.aiCustomInstructions`
  (`packages/ai/lib/src/assistant_options_manager.dart:113-165`, `packages/core/lib/src/file_system/templates/file_template.dart:49`).
  **Reset** restores the saved text and **Save** is disabled with no changes or above the limit
  (`packages/ai/lib/src/ui/ai_options.dart:204-226`).

Length: about 2,300 words counting tables, code blocks and the image alt text (about 2,060 without code blocks and
alt text). Proposed split if it grows: move "Example prompts by task" and "Describe a screen in detail" to a new page
`ai/example-prompts.md` ("Example prompts"), which would also give the old `/ai/exampleprompts` URL its own target
(today it redirects to `/ai/prompting`). Not split, per the brief.

Open questions:
- The Unsplash rule is an example of a standing rule, not a product feature; whether the photos the AI picks load is
  up to the AI. Swap it for another rule if a verifier prefers.

## ai/modes.md

Changed for the reader (no facts removed, nothing moved):
- R9: intro and each mode section now say when you'd use it and why: Design "so you can see the whole app and settle
  how it looks before anything is wired up"; Plan "the safe way to think through a big or unclear change ... nothing in
  your project changes until you say so"; Agent "whenever something has to work, not only look right"; thinking level
  "More thinking helps with tricky work, and less gets small edits done faster" (restates the menu descriptions,
  `packages/ai/lib/src/agent/agent.dart` level descriptions as listed in the table).
- "it has no API or Supabase tools" became "it doesn't set up APIs or Supabase" (R1, same fact:
  `packages/ai/lib/src/agent/designer_agent.dart` toolset, research `features-ai.md` "Switch mode").
- Packages explained once (R4). Example prompts added to the Design and Plan steps.
- "You can switch between requests whenever you like, in the same conversation": switching calls `setOptions` and
  keeps the session (`packages/ai/lib/src/chat_session.dart:175-190`); the chips are disabled while a request runs
  (unchanged sentence).
- "The chat field's hint changes to match": placeholders follow the mode (table on the page; `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart`,
  verified in earlier phases).
- "Rewrites the whole plan, so you always review one complete version": the plan tool replaces the plan, and only the
  latest plan keeps its buttons (`packages/ai/lib/src/ui/tool_inline_views.dart:130,161,265,275`).
- Agent mode list: "assets and files" became "fonts, images and other files" (the agent downloads fonts and saves
  images: `packages/ai/lib/src/tools/download_font_tool.dart`, `save_attached_image_tool.dart`).

Old-docs items here: H7 (Think Mode) stays covered by the note. Nothing else from the old pages maps to modes.

## ai/chat.md

Changed for the reader (no facts removed, nothing moved):
- "Before it sends your message, Nowa applies any edits you made in the code editor" became "If you've been editing in
  code mode, Nowa applies those edits before it sends your message" (same fact, research `features-ai.md` "AI Assistant").
- Steps and code cards explained in plain words (R3/R4): the four tooltip texts stay as shown, with "tool" explained as
  "Nowa's word for one of these actions"; **Writing code** / **Writing member in class** cards described as what Nowa
  AI wrote (a screen, a component or a piece of logic), with "You don't have to read the code" and **Show raw code**
  kept.
- API key explained once (R4) under **Constants updated**.
- R9: reasons and reassurance added: chips are safe to click ("never sends anything by itself"), stop early when the
  AI heads the wrong way, the conversation tells you exactly what changed (for checking and undoing), suggested steps
  "so you can look before you commit", Retry continues "instead of starting over".
- "Service under load" now says Nowa's AI service is busy and Nowa retries for you (`packages/ai/lib/src/ui/content_views.dart:482,498`;
  up to 5 automatic retries, `packages/ai/lib/src/agent/agent_runner.dart:68,121-124`). "for example when your
  connection drops" introduces the connection errors (`packages/ai/lib/src/services/agent_service.dart:262-264`).

Added:
- Old P13 (report issues yourself): one sentence and a link to `../account/help.md#report-an-issue` (anchor exists:
  `docs/account/help.md` "## Report an issue {#report-an-issue}"). The support form and its snapshot checkbox:
  `packages/nowa_ui/lib/components/support_dialog.dart:336-344,404`.

## ai/context.md

Changed for the reader (no facts removed, nothing moved):
- Code words replaced (R1/R4): "A component instance attaches the component itself" became "If you click a component
  you placed on a screen, Nowa AI gets the component itself, so it can change it everywhere it's used" (component
  instances attach their class as modifiable: `packages/ai/lib/src/prompt_controller.dart:120-129`; a component's
  changes apply wherever it's used, `docs/design/components.md`); "class open in the code editor" became "screen or
  component that's open in the code editor" (`prompt_controller.dart:136-141`); "related declaration, in short form"
  became "a short summary of it, because something you attached uses it" (skeleton category,
  `packages/ai/lib/src/ui/attachement_menu.dart:116-128`); lock "read-only" became "Nowa already sends it, for reading
  only" (read-only category, same lines); the project map "public declarations, such as classes" became "a short
  outline of your screens, components, functions, variables and other parts".
- **AppState** and **AppConstants** explained where the `@` list shows them (names from the page's own screenshot).
- R9: each section opens with when to use it; an `@` example sentence.

Added:
- Old H12 ("attach multiple full screens"): "To attach several, open **+** again and pick the next one." Picking an
  item adds an attachment and closes the palette (`attachement_menu.dart:95-112`, `prompt_controller.dart:173`).
  FROM YOUR APP lists every class of the project except State classes (`attachement_menu.dart:95-99`); headers render
  in capitals (`attachement_menu.dart:87`).
- "You can also paste the text straight into your message" (limits list and the table): a plain alternative to
  **Attach text file** (the chat field is a text field). Also a safe path while P10 is open (see open questions).

Open questions:
- P10 (product-issues.md) is still in 3.13: **Attach text file** filters picked files with `file.path != null` and
  reads them with `dart:io` (`packages/ai/lib/src/prompt_controller.dart:218-236`, `packages/core/lib/src/utils.dart:358-362`).
  On the web the file picker gives no path, so in the web app the attachment probably never appears. Not confirmed live,
  so the page doesn't call it a known issue; the paste alternative covers it. The picker also allows several text files
  (`allowMultiple: true`, `prompt_controller.dart:221`); the page still says "a text file" (true, not exhaustive).

## ai/undo-and-history.md

Changed for the reader:
- R2: "Checkpoints are saved with your project, in its `.nowa/temp/` folder, which Git ignores." moved to the code
  section. The page keeps the consequence in plain words: checkpoints are saved with the project, are an undo button
  and not a backup, and aren't included in Git or GitHub history. Evidence: checkpoint data in `.nowa/temp/`
  (`packages/ai/lib/src/checkpoints/snapshot_db.dart:98`, `blob_storage_service.dart:18`), nested ignore file
  `.nowa/.gitignore` with `temp/` (`packages/core/lib/src/project/settings_service.dart:34-38`,
  `packages/core/lib/src/file_system/templates/common/gitignore_template.dart:13-16`). One pointer to
  `../code/generated-code.md#project-files`.
- R9: reassuring but exact intro ("Most of what Nowa AI does can be undone with a click"; the exceptions stay in the
  rules list), the reason after steps (the dialog shows what will go
  back; messages stay so you can reread and rephrase), "Changed your mind?" lead-in, new session "because old context
  can't muddle the new one".

Added:
- "Checkpoints undo Nowa AI's work. To undo a change you made yourself on the board, press Ctrl/Cmd + Z" with a link to
  `reference/shortcuts.md` (Undo row, `docs/reference/shortcuts.md:38`). No claim either way about Ctrl/Cmd + Z on AI
  edits (open question 9 of `features-ai.md` stays open).
- "Your project and its checkpoints stay as they are" after **Session Limit Reached**: the error card only offers
  **Start new session** (`packages/ai/lib/src/ui/content_views.dart:437-452`); checkpoints live in the project and
  reappear on reopened sessions (`checkpoint_service.dart`, existing sentence in "Reopen a past chat").
- "Nowa AI remembers that whole conversation" on a reopened session: the history is loaded into the session
  (`packages/ai/lib/src/chat_session.dart:356-365`, `renderer.loadHistory`), research "Chat History" ("continue it with
  full context").

Checked, unchanged: restore covers the chosen request and every later one; reapply covers the chosen request and the
earlier ones, later ones stay undone (`packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-306`; the interface
comment at `:39` says "subsequent" but the code filters `index <= chosen`, matching the page).

## ai/connectors.md

Changed for the reader:
- R2: "It also writes the matching functions in your app's `SupabaseService`, so your screens can use what it built."
  moved to the code section (`#supabase`); the page says "It also connects your app to what it built, so your screens
  can show and save that data" (the agent extends the app's Supabase service and calls it from the UI:
  `packages/ai/lib/src/tools/instruction_tools.dart:145-146,173-179`). "Nowa AI writes the theme results to your theme
  files, such as `lib/globals/app_colors.dart` and `lib/globals/app_text.dart`." moved (`#themes`); the page says Nowa
  reloads your app's theme when they come in, then points to the **Themes** panel (the hook reimports the two files and
  `themes.dart`: `packages/ai/lib/src/mcp/figma_mcp.dart:72-86`). Keyword list gained "RLS", "triggers",
  "migrations". The Approval image alt text (it names `apply_migration`) is untouched (R7).
- R4 explanations, one clause each: backend (intro), project ref, OAuth step ("the connector needs your permission on
  your Supabase account, not only your app's keys"), SQL, RLS ("rules that decide who can see or change each row";
  Supabase: "granular authorization rules that run inside the database",
  https://supabase.com/docs/guides/database/postgres/row-level-security), triggers (with the agent's own pattern
  "creating a profile when someone signs up", `instruction_tools.dart:160-162`), Edge Functions ("small pieces of code
  that run on Supabase's servers instead of in your app"; Supabase: "server-side TypeScript functions",
  https://supabase.com/docs/guides/functions), migrations, SVG ("stay sharp at any size"), tool name and **Arguments**
  on the approval card.
- "If you connected the project with **Use Keys**" replaces "connected with keys only", matching the button name on
  `integrations/supabase/connect.md` (OAuth dialog: `packages/ai/lib/src/mcp/supabase_mcp.dart:48-56,79-91`).
- R9: reasons added (approval keeps you in control; the Figma link is per account "so you link it once"; turning a
  connector off means it can't reach that service until you turn it on again).

Added:
- Old S10 (chat app example) as a second example prompt, worded as a request, not a promised result. The agent's
  Supabase patterns include realtime for chat (`instruction_tools.dart:163-164`).
- Plain sentence (no new admonition; the page keeps two) in "Approve what a connector does": the connector works on
  your real Supabase project, a restore in Nowa doesn't undo changes there (same fact as `ai/undo-and-history.md`:
  Supabase changes aren't recorded in checkpoints), and Supabase's own advice to connect AI tools to a project with real
  users' data only when needed ("Production projects can contain sensitive data..."; "Protect production data: Connect to
  a production project only when the task requires production evidence", https://supabase.com/docs/guides/getting-started/mcp,
  read 2026-10-12), hence "a separate test project is the safest place to try bigger backend changes".
- "unless you turn on **Auto-approve tools**" on the approval bullet in "How connectors work" (same fact as the
  Auto-approve section).
- One pointer to `../code/generated-code.md#supabase` at the end of "Connect Supabase".

- Old S9 (Storage: buckets, access and policies), as one bullet in the capability list, linked to
  `integrations/supabase/storage.md` (which already says "ask Nowa AI to create it with the Supabase connector",
  `:13`, with an example prompt at `:76`). Evidence: Nowa's connector URL is
  `https://mcp.supabase.com/mcp?project_ref=<ref>` with no `features` parameter (`supabase_mcp.dart:22`), so the
  default groups apply: "All groups except Storage are enabled by default", Database included (`execute_sql`,
  `apply_migration`) (https://supabase.com/docs/guides/getting-started/mcp). Supabase: "Since storage is interoperable
  with your Postgres database, you can also use SQL" to create buckets
  (https://supabase.com/docs/guides/storage/buckets/creating-buckets), and storage access rules are RLS policies on the
  `storage.objects` table (https://supabase.com/docs/guides/storage/security/access-control). So buckets and their rules
  are reachable through the enabled database tools; the dedicated Storage tools (`list_storage_buckets`,
  `update_storage_config`) are not offered. Nowa's agent instructions don't list storage
  (`instruction_tools.dart:186-197`), so this is a capability of the tools, not a scripted workflow.

Kept as documented (batch note): the P117 Figma note and the steps that describe the fixed flow.

## ai/external-agent.md

Enterprise page for people driving Nowa from Claude Code, Claude Desktop or Cursor (batch note: naturally more
technical). The command to copy, the tool names (agents print them on every call, so they're text the reader sees, R3)
and the limits stay; each step is explained.

Changed for the reader:
- MCP server, terminal, port and overflow explained in one clause each (R4). "your public declarations" became "an
  outline of your code"; "the widget tree" points at what the **Outline** shows.
- R2: the `assets/images/` folder and the two platform file names moved to the code section (`#assets`,
  `#project-files`); the page keeps the consequences ("to your project's images, ready to use"; "Nowa builds your app's
  iOS and Android settings files from your project settings, so direct edits to them are refused"; refusal:
  `packages/ai/lib/src/mcp/nowa_mcp_server.dart:320-327,346-353`). One pointer to `../code/generated-code.md#project-files`.
- "Code that doesn't parse" became "Code that Nowa can't read (it doesn't parse)".
- R9: why to keep Nowa open (the connection lives in the desktop app), an example request for step 5, and the reason
  tool names are listed.

Added (verified against the official docs, read 2026-10-12):
- Step 3, Claude Code: "Claude Code confirms with a line that starts with "Added"" (Claude Code docs: "claude mcp add
  confirms a successful add by printing an Added ... line", https://code.claude.com/docs/en/mcp).
- The command explained ("adds a server named `nowa` that Claude Code reaches at your URL"), and the scope tip: local
  scope is the default and loads the server only in the folder where you added it; `--scope user` makes it available in
  every folder (same Claude Code page, "Local scope" and "User scope"; their example
  `claude mcp add --transport http hubspot --scope user https://...` gives the flag position).
- "Your agent may ask your permission before it uses a Nowa tool": Cursor "asks for approval before using MCP tools by
  default" (https://cursor.com/docs/mcp, "Tool approval"); Claude Code applies its permission rules to MCP tools
  (Claude Code MCP page).
- New subsection "Add Nowa to Cursor": `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project), entry under
  `mcpServers` with a `url` (Cursor docs "Using mcp.json", "Remote Server" example and "Configuration locations",
  https://cursor.com/docs/mcp). The URL Nowa shows already carries the token as `?token=`
  (`nowa_mcp_server.dart:111-114`), so a plain `url` entry is enough.
- "The URL stays the same on this computer": the token is generated once and saved in the app's preferences
  (`packages/ai/lib/src/mcp/external_agent_access.dart:16,52-57`), and the port is fixed at 4680
  (`nowa_mcp_server.dart:27`).

Checked, unchanged: dialog labels and help text (`packages/ai/lib/src/ui/mcp_connect_dialog.dart:22-48,92`), image
limits 20 per call and 20 MB each (`packages/ai/lib/src/mcp/mcp_backend_tools.dart:97-98,147`), formats
(`mcp_backend_tools.dart:109`), open timeout 3 minutes (`nowa_mcp_server.dart:444`).

Open questions:
- Claude Desktop: the page keeps the dialog's generic instruction (paste the URL into your agent). Third-party guides
  say Claude Desktop's custom connectors connect from Anthropic's cloud and can't reach `127.0.0.1`, so a local bridge
  may be needed; I found no official Anthropic page that confirms a setup for a local HTTP server, so no Claude Desktop
  steps were added (also open question 5 in `research/features-ai.md`).
- Credits: whether a connected agent's work uses Nowa AI credits is still unconfirmed (research open question 4); the
  page says nothing about it.
