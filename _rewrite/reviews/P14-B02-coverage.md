# P14-B02 coverage: old Nowa AI pages

Batch P14-B02. New pages: `docs/ai/` `index`, `prompting`, `modes`, `chat`, `context`, `undo-and-history`, `connectors`,
`external-agent`. Old pages audited (from `redirects.md`): `ai/howtouseai.mdx` (→ `/ai`), `ai/prompttip.mdx` and
`ai/exampleprompts.mdx` (→ `/ai/prompting`), `data-connections/supabase/mcp.md` (→ `/ai/connectors`).

Method: every piece of information on each old page listed (C1), grepped in `docs/` (not `new/`, not `legacy/`) and the
hit read (C2), re-checked in `/home/user/nowa-master` (3.13.0, `3cb32031c`) or the current official docs (C3), decided
(C4) and, where useful, written back in our own words on the best page of this batch (C5). Code refs are relative to
`/home/user/nowa-master`. Status values: `covered` (page#section) / `added` (page#section) / `obsolete` (code ref) /
`not useful` / `dev-only` / `for other page` (target).

## ai/howtouseai.mdx ("How to Use Nowa AI")

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| H1. Nowa AI is your assistant for building apps: widgets, pages, APIs, start to finish | covered | `ai/index.md` intro and "What Nowa AI can do" | Rewritten in plain words for this pass. |
| H2. Open the chat from the icon in the left side panel (video `openai.mp4`) | covered | `ai/index.md#open-the-ai-assistant` | Old video shows the old UI; not reused. |
| H3. Input and output tokens, and the cost, shown for each chat message | obsolete | Counters are session totals: `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:137-172` (`session.sessionUsage`); no per-message cost: `packages/ai/lib/src/ui/session_details_popup.dart:47-60` | Session totals covered in `ai/index.md#usage-and-credits` and `account/plans-and-usage.md`. |
| H4. **Session Details** shows usage visually | covered | `ai/index.md#usage-and-credits`, `account/plans-and-usage.md` | |
| H5. **Global Usage** shows credits used over time | covered | `ai/index.md#usage-and-credits`, `account/plans-and-usage.md` | `session_details_popup.dart:70` |
| H6. Credits are counted by token usage, not per message; credit amounts per small edit and per full page | not useful | D3 (no credit amounts); the client only shows totals | Plans and usage belong to `account/plans-and-usage.md` (B03). |
| H7. Think Mode (brain icon) shows the AI's reasoning step by step (videos `think.mp4`, `nonthink.mp4`) | obsolete | No toggle in 3.13: levels **Instant**, **Thinking**, **Deep Thinking** (`packages/ai/lib/src/agent/agent.dart:11-82`); reasoning always shows in the collapsed **Thinking process** block (`packages/ai/lib/src/ui/content_views.dart`) | `ai/modes.md#set-the-thinking-level` says the toggle is gone; keyword "think mode" kept. |
| H8. Custom Instructions: a base instruction added to every prompt; Options → **Custom Instructions** → type → **Save** | covered | `ai/prompting.md#custom-instructions` | `packages/ai/lib/src/ui/ai_options.dart:92,112,154,205,223` |
| H9. Custom instruction examples: "Make your code structured", "Always use images from a specific website" | added | `ai/prompting.md#custom-instructions` (examples) | The image-source rule comes back, adapted; the code rule is replaced by rules a non-coder would write. |
| H10. The AI finds what to change by itself, but attaching makes the result more precise | covered | `ai/context.md` intro and tip | |
| H11. Smart selection: a screen or widget you click is added as context automatically | covered | `ai/context.md#select-what-you-want-to-change` | The chip now sits at the top of the chat field, not lower left. |
| H12. Attach several whole screens with **Attach**; single widgets can't be attached that way | covered | `ai/context.md#add-context` (FROM YOUR APP), "What to attach when" (select a widget instead) | `packages/ai/lib/src/ui/attachement_menu.dart:15,29,67` |
| H13. Attach images (Attach → Attach Image) as inspiration for widgets or pages | covered | `ai/context.md#add-context` | Label now **Attach image** (`attachement_menu.dart:31`). |
| H14. Attach text files (Attach → Attach Text File) as input for content or structure | covered | `ai/context.md#add-context` | Label now **Attach text file** (`attachement_menu.dart:52`). Open question on the web app (P10), see notes. |
| H15. **Restore checkpoint** at the start of a message goes back to the previous state | covered | `ai/undo-and-history.md#restore-a-checkpoint` | `content_views.dart:183`, `packages/ai/lib/src/checkpoints/checkpoint_warning.dart:40-45,90-91` |
| H16. **Replay checkpoint** redoes it | covered | `ai/undo-and-history.md#reapply-a-checkpoint` | Label now **Reapply Checkpoint** (`content_views.dart:183`); "replay checkpoint" kept as a keyword. |
| H17. Checkpoints also work on chats reopened from history | covered | `ai/undo-and-history.md#reopen-a-past-chat` | |
| H18. **New Chat** starts a clean conversation | covered | `ai/undo-and-history.md#start-a-new-session` | Label now **New Session** (`ai_chat_panel.dart:55`); "new chat" kept as a keyword. |
| H19. Past chats are saved; Options → **Chat history** → pick one to resume | covered | `ai/undo-and-history.md#reopen-a-past-chat` | Labels **Chat History**, **All Sessions** (`ai_chat_panel.dart:74`). |
| H20. A long chat asks whether to continue or start fresh (two screenshots) | covered | `ai/undo-and-history.md#start-a-new-session` | `packages/ai/lib/src/chat_session.dart:55`, `content_views.dart:437-452`; old screenshots not reused. |

## ai/prompttip.mdx ("Prompting Tips")

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| P1. How you write a prompt matters: clearer requests, fewer corrections | covered | `ai/prompting.md` intro | |
| P2. Keep it small, one step at a time ("Add a search bar to my product list screen" vs "Build me a full shopping app with everything") | covered | `ai/prompting.md#tips-that-help` | Both examples on the page. |
| P3. Attach the related screen or widget when it matters; the AI fetches more context itself | covered | `ai/context.md` tip, `ai/prompting.md#tips-that-help` | |
| P4. Keep attachments focused: only the widget, not the whole screen | covered | `ai/context.md` tip and "What to attach when" | |
| P5. Give context: what the screen or feature is for, the flow users follow, key design or functional elements | added | `ai/prompting.md#describe-your-app` | Partly covered ("Say what it is for"); expanded into a first-prompt checklist. |
| P6. Start a new chat when the topic changes: keeps the AI aligned, avoids unrelated changes, cleaner results | covered | `ai/prompting.md#tips-that-help`, `ai/undo-and-history.md#start-a-new-session` | |
| P7. Example pair: new chat for an Orders screen with filters vs adding Supabase auth in a styling chat | added | `ai/prompting.md#improve-the-result-step-by-step` (table "A clean start / Mixed topics") | File name "orders_list.dart" becomes "attach the Orders screen" (R2). |
| P8. Rule of thumb: about 5 prompts per chat | not useful | Not a product rule; Nowa itself says when a session is getting long (`chat_session.dart:53-65`) and when it is full (`content_views.dart:437-452`) | |
| P9. Sandwich technique: Intent, Context, Task, Constraints (shoe store homepage example) | covered | `ai/prompting.md` (Goal, Details, Task, Rules) | "prompt template" and "sandwich technique" added as keywords. |
| P10. Be specific about style and function: specific vs vague examples | added | `ai/prompting.md#be-specific-about-looks-and-behavior` | One example was on the page; the three pairs come back. |
| P11. Fixing errors: ask Nowa AI ("There's a build error in homepage_screen.dart; please fix it.", "Fix issues in my project") | added | `ai/prompting.md#fix-errors` | Partly covered (example table, **Fix** chip in `ai/chat.md`). Adapted: name the screen, paste the message from **Problems** (row menu **Copy**, `packages/core/lib/src/panels/problems_panel.dart:523-527`). |
| P12. Use "fix all issues" only when there are a few errors; go step by step in bigger projects | added | `ai/prompting.md#fix-errors` ("Go one problem at a time") | Advice, consistent with "one job at a time". |
| P13. Report issues: **Feedback** → **Report**, share project and AI history, describe what happened | covered | `account/help.md#report-an-issue` (**?** → **Report an issue**, **Include a snapshot of the current project**: `packages/nowa_ui/lib/components/support_dialog.dart:336-344`); `ai/chat.md#send-a-bug-report` | Old label obsolete; the form has no separate "AI history" option. Link to `account/help.md#report-an-issue` added on `ai/chat.md#send-a-bug-report`. |
| P14. Valid bug reports earn free AI credits | not useful | No reward in the code (`support_dialog.dart`); a promotion, not a product feature (D3) | |
| P15. Think like a pair programmer: share your reasoning, review and give feedback, iterate, ask questions | added | `ai/prompting.md#improve-the-result-step-by-step`, `#when-the-result-isnt-right` | **Summarize** chip prompt: `packages/ai/lib/src/ui/ai_suggestions.dart:16-19`. |
| P16. Quick reference: prompt template | covered | `ai/prompting.md` | |
| P17. Checklist: one task, only the files you need, specific words, context, new chat for unrelated tasks | covered | `ai/prompting.md#tips-that-help` | |

## ai/exampleprompts.mdx ("Actual Prompts Used to Build Full Apps")

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| E1. Real prompts as recipes to copy and adjust | covered | `ai/prompting.md#example-prompts-by-task` and its tip | |
| E2. Example 1: mobile profile screen (header with ID, photo, name, email on a dark background; 2x3 grid of rounded square buttons with soft shadows, icon and label; badge on Notifications) | added | `ai/prompting.md#describe-a-screen-in-detail` | Full prompt kept as written; suited to **Design** mode. |
| E3. Example 1 design guidelines (simple, bold text, centered, clean grid) | added | `ai/prompting.md#describe-a-screen-in-detail` | They are part of the prompt. |
| E4. Example 2: stopwatch screen (title and icon, 00:00:00 digits, blue rounded Start button, white background, readable, finger-friendly) | added | `ai/prompting.md#describe-a-screen-in-detail` | Plus the next step: make the button work in **Agent** mode. |
| E5. Result screenshots (`prompt1.png`, `prompt2.png`) | not useful | One past output; results vary, and the docs never promise a specific output | |
| E6. "You'll see how powerful simple text prompts can be" | not useful | Marketing | |

## data-connections/supabase/mcp.md ("Supabase MCP")

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| S1. Supabase MCP lets the agent work on your Supabase backend while it builds the app (since 3.4, 19 Jan 2026) | covered | `ai/connectors.md` intro, `#connect-supabase` | Version and date: not useful. |
| S2. A secure bridge: the agent reads your current backend and creates or updates what the request needs | covered | `ai/connectors.md#connect-supabase` | Storage part: see S9. |
| S3. Build a full app from Nowa alone: screens, backend, and the agent wires the UI to the backend | covered | `ai/connectors.md#connect-supabase` | Rewritten in plain words (the class name moves to the code section). |
| S4. In the chat panel, turn on the Supabase icon | covered | `ai/connectors.md#connect-supabase` step 1 | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:389-394` |
| S5. If the project isn't connected to Supabase, Nowa asks you to connect it first | covered | `ai/connectors.md#connect-supabase` step 2 | `packages/ai/lib/src/mcp/supabase_mcp.dart:43-61` |
| S6. Describe what you want; the agent plans frontend and backend work, implements and connects it | covered | `ai/connectors.md#connect-supabase` step 3; `ai/modes.md` (Tasks in Agent mode, plans in Plan mode) | "Creates a plan" overstated: plans are Plan mode's job, and Plan mode doesn't use connectors. |
| S7. You approve every backend operation before it's applied | covered | `ai/connectors.md#approve-what-a-connector-does` | Plus **Auto-approve tools**. |
| S8. Tables, columns and relationships; RLS policies; triggers and database functions; Edge Functions | covered | `ai/connectors.md#connect-supabase` | Terms explained in plain words in this pass (R4). `packages/ai/lib/src/tools/instruction_tools.dart:186-197` |
| S9. Supabase Storage: buckets, access patterns and policies | added | `ai/connectors.md#connect-supabase` (bullet "Set up Storage buckets...", linked to `integrations/supabase/storage.md`) | Through SQL: the connector enables Supabase's default groups, Database included, but not the Storage group (`packages/ai/lib/src/mcp/supabase_mcp.dart:22`; https://supabase.com/docs/guides/getting-started/mcp); buckets can be created with SQL (https://supabase.com/docs/guides/storage/buckets/creating-buckets) and storage rules are RLS policies on `storage.objects` (https://supabase.com/docs/guides/storage/security/access-control). B10's storage page already relies on it. |
| S10. Example: a full chat app with tables, RLS so messages are stored per user, and the UI and logic | added | `ai/connectors.md#connect-supabase` (second example prompt) | As an example prompt, no promised result. |
| S11. Dev Diary video (Nowa 3.4, Todo app with auth and statistics) | not useful | Shows the 3.4 UI; the style guide reuses old media only when it matches the current UI | |

## Totals

| Old page | Items | covered | added | obsolete | not useful | dev-only | for other page |
|---|---|---|---|---|---|---|---|
| ai/howtouseai.mdx | 20 | 16 | 1 | 2 | 1 | 0 | 0 |
| ai/prompttip.mdx | 17 | 9 | 6 | 0 | 2 | 0 | 0 |
| ai/exampleprompts.mdx | 6 | 1 | 3 | 0 | 2 | 0 | 0 |
| data-connections/supabase/mcp.md | 11 | 8 | 2 | 0 | 1 | 0 | 0 |
| **Total** | **54** | **34** | **12** | **2** | **6** | **0** | **0** |

Besides the old-docs items, the pages gained material for the primary reader that no old page had: "How a request
goes" (`ai/index.md`), "When the result isn't right" (`ai/prompting.md`), the two kinds of undo
(`ai/undo-and-history.md`), Supabase's advice on projects with real data (`ai/connectors.md`) and verified Claude Code
scope and Cursor setup steps (`ai/external-agent.md`). Evidence for each is in `P14-B02-notes.md`.
