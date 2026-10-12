# P14-B02 verify: Nowa AI pages

Verifier P14-B02-V. Pages under `docs/ai/`: `index`, `prompting`, `modes`, `chat`, `context`, `undo-and-history`,
`connectors`, `external-agent`. Diff: `git diff origin/main -- docs/ai/`. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Official docs read 2026-10-12 with curl (WebFetch could not resolve
the hosts).

## Summary

(Filled in at the end.)

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
