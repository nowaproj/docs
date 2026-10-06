# Features: Nowa AI

Source: /home/user/nowa-master (v3.12.5). Researcher: research subagent "Nowa AI" (features-ai). 2026-10-06.

Notes for the IA/writers:
- 3.13 (dev, `/home/user/nowa`): no material change to Nowa AI found. Only restyling (menus move to `NMenu`, buttons to `NButton`) and the sidebar's **Widgets** panel becoming **Library** (the **Assistant** icon stays first). Nothing to log in `upcoming-3.13.md` for this area beyond that.
- "→ other area" marks overlaps with the other researchers (account/projects, editor shell, data, code/Git/shipping).
- D3: the code has internal credit units and plan thresholds. They're cited below only as code facts. The docs must not quote credit amounts or prices.

## Summary
- **AI Assistant**: the AI chat panel. It opens from the left sidebar's **Assistant** icon and is open by default in every project. You chat with Nowa's AI agent there.
- **Switch mode** (Design / Plan / Agent): picks which agent handles your message. Design is for looks and flow with demo data, Plan writes a reviewable plan without changing anything, and Agent does everything.
- **Instant / Thinking / Deep Thinking**: the thinking-level dropdown. It sets speed vs. reasoning, and Thinking is the default.
- **Send / Abort**: sends the prompt with Enter. While the AI works, the same button stops it.
- **Add context**: attach images, text files and screens/components (**Attach image**, **Attach text file**, **From your app**). The widget you select on the board is attached automatically.
- **@ mentions**: type `@` in the chat to reference a screen or component by name.
- **Suggestions** (empty chat): one-click starter prompts (**Summarize**, **Fix**, **Redesign UI**, **Add authentication**, **Use an API**, **Add more pictures**).
- **Thinking process** and tool activity: the transcript shows the AI's collapsed reasoning and every step it takes (reading files, writing code, adding packages…).
- **Questions**: the AI can stop and ask clarifying multiple-choice questions, answered with **Send Answers**.
- **Implementation Plan**: the plan card from Plan mode, with **Implement this plan** and **Keep planning**.
- **Tasks**: a live to-do checklist for long requests.
- **Your app design is complete** / **Make it real**: when Design mode finishes, a hand-off card switches to Agent mode to make features work.
- **Suggested next steps**: 1–3 follow-up prompts docked above the chat field. Tapping one fills the prompt and never sends it.
- **Created Widgets** / **Constants updated**: end-of-run cards. One holds new widgets you can drag to the board, the other warns that the AI changed your app constants.
- **What the agent can do**: create and edit screens, components, logic and non-Dart files, add packages, fonts and images, build API calls, check errors and logs, and work with Supabase and Figma through connectors.
- **Restore Checkpoint** / **Reapply Checkpoint**: undo or redo the file changes of an AI request.
- **Approval Required**: approve or deny a connector (MCP) action before it runs.
- **New Session**, the long-session note and **Session Limit Reached**: start a fresh conversation.
- **Chat History**: reopen and continue any past session of this project (**All Sessions**).
- **Custom Instructions**: standing instructions added to every prompt in this project.
- **Retry**, **Service under load** and other chat errors: how failures show up and how to recover.
- **Bug report ready** / **Report**: the AI can prepare a platform bug report that you send to the Nowa team.
- AI usage and credits in the chat: the "% used" indicator, **Session Details** (input/output tokens, **Credits Used**, **Global Usage**), the out-of-credits banner (**Upgrade** / **Purchase Credits** / **Buy credits** / **Invite a friend**) and the **FREE** pill during a Free Weekend.
- **Supabase MCP**: lets the agent read and change your Supabase backend (tables, SQL, RLS, triggers, Edge Functions, migrations). Shows **Connected: <ref>**, **Switch project…** and **Turn off MCP**.
- **Figma MCP**: lets the agent bring Figma images, icons (SVG), colors and text styles into the project. Includes **Auto-approve tools** and connect/disconnect under **Account Details → Connected Accounts**.
- **Connect External Agent**: lets Claude Code, Claude Desktop or Cursor drive Nowa through a local MCP server. (**Desktop app only**; gated by an account grant; What's New says **Enterprise**)
- External agent tools: what a connected agent can do (list/open projects, read the canvas, screenshot, edit with Nowa's tools, set permissions, add images, save).
- **What do you want to build?** (dashboard prompt box): describe an app on the dashboard. Nowa names it, creates the project and starts the AI (**Build it**).
- **Fix with AI** / **Explain with AI**: one-click AI help on Nowa Run preview errors, web deployment errors and failed cloud build steps.
- **Connect app with AI** / **Fix with AI** (Supabase backend setup): AI follow-ups after a template's bundled backend is set up.
- **Press / to chat...**: the AI toolbar at the bottom of the board in the New UX. (Experimental flag)
- AI chat in the phone browser: chat pill, voice input and attach-by-tap in Nowa's mobile layout. (Phone-size browser window; also Nowa GO, which is in private beta)
- **View Raw Data**: shows any chat message's raw content as JSON (power users).
- Prompting guidance in the product: placeholders, example prompts, the onboarding tip and the custom-instructions hint the UI itself provides.

## Features

### AI Assistant
- **What it does:** The chat panel where you talk to Nowa's AI agent. It reads your project and builds or changes screens, components, logic, packages, assets and backend setup, while you watch each step and can undo it.
- **Where:** In a project, the left sidebar → **Assistant** icon (the AI-chat icon, first in the sidebar). The tooltip shows "Assistant" and the shortcut. The shortcut is ⌘1 on macOS and Ctrl+1 elsewhere, because the first sidebar icon maps to digit 1. The panel is open by default when a project opens. Clicking the icon again closes it. It also opens by itself after **Build it** on the dashboard, **Fix with AI** from a Nowa Run error, and **Connect app with AI** / **Fix with AI** in Supabase backend setup. For the New UX and the phone layout, see those features.
- **Labels:** Header title "AI Assistant". Once the AI names the session, the title shows instead in a smaller font. Header buttons are **+** (tooltip "New Session"; while the AI works, "Wait until the AI finishes processing") and **⋮** (tooltip "Options"). The menu holds "Custom Instructions", "Chat History" and "Connect External Agent" (the last one only when gated in; see that feature). Empty-chat text depends on mode (see **Suggestions**). While history loads: "Please wait a minute while we load this conversation...".
- **How to use:**
  1. Open a project. The Assistant panel is already open, or click the **Assistant** icon.
  2. Pick a mode (**Switch mode** chip) and a thinking level (dropdown chip).
  3. Optionally select a widget on the board or attach context (**Add context**).
  4. Type your request and press Enter (Shift+Enter, Ctrl+Enter or ⌘+Enter adds a new line).
  5. Watch the steps stream in. Answer any **Questions** or **Approval Required** cards.
  6. When the run ends, Nowa saves the project automatically. Review the result, and use **Restore Checkpoint** if you don't like it.
- **Options:** Mode, thinking level, connectors (Supabase/Figma icons), custom instructions (see their features).
- **Limits and rules:** The mode and level chips are disabled while the AI is running. The project is saved automatically when each run finishes (`gProject.save()`). Before sending, unsaved code-editor edits are flushed so the AI reads the latest code. In the anonymous playground, sending a message first asks you to sign in (→ account area).
- **Gating:** No plan gate on the chat itself in the client. Sending needs AI credits (see "AI usage and credits"). Available on web, the desktop app and the phone-browser layout.
- **Code refs:** `lib/project/side_bar.dart:36-41`, `lib/project/panels/left_panel.dart:31`, `packages/core/lib/src/panels/panel.dart:29`, `lib/setup_general_actions.dart:43-60`, `packages/core/lib/src/inputs.dart:22-25`, `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:41-102`, `packages/ai/lib/src/chat_session.dart:257-314`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:73-86`.
- **Old docs:** `docs/ai/howtouseai.mdx` "How to Use Nowa AI": partly outdated. It's right that you open it from the left side panel, but it doesn't name the **Assistant** icon, the shortcut, default-open or auto-save. `docs/getting-started/exploreinterface.mdx:63-67` "AI Assistant": partly outdated (generic, old screenshot).
- **Screenshot value:** high. A project with the Assistant panel open, a finished run with a few tool steps, and the control bar visible.

### Switch mode (Design / Plan / Agent)
- **What it does:** Chooses which agent answers.
  - **Design** designs screens, navigation and theming with demo data, and never wires real data or backends.
  - **Plan** explores the project, asks questions and writes a plan without changing anything.
  - **Agent** does everything, from design to real logic, data and packages.
- **Where:** The chat control bar, first chip (bottom-left of the chat field), tooltip "Switch mode". The same chip sits under the dashboard prompt box.
- **Labels:** "Design" ("Create/refine the look and flow without logic"), "Plan" ("For planning complex tasks before building"), "Agent" ("For everything, from design to functionality"). On the dashboard, Design reads "Design the look and flow before making it functional" and carries a "Start here" badge. The chip is tinted when the mode isn't Agent. The prompt placeholder follows the mode: Design "Describe the app you want to build...", Plan "What would you like to plan?", Agent "Build something wild...".
- **How to use:**
  1. Click the mode chip.
  2. Pick **Design**, **Plan** or **Agent**.
  3. Type your prompt.
  - Plan mode ends with an **Implementation Plan** card; **Implement this plan** switches to Agent and runs it.
  - Design mode ends with a **Make it real** card that switches to Agent.
  - Suggested next steps can switch the mode for you. Their rows show a mode badge when they do.
- **Options:** One mode per project. It's remembered per project on this device, and the default is **Agent**. New projects (including dashboard prompt-to-app) open in **Design** unless the dashboard chip picked another mode.
- **Limits and rules:**
  - Design mode has no API or Supabase tools and doesn't use connectors (MCP).
  - Plan mode is read-only: package add/remove is blocked ("Plan Mode is read-only — capture the package change as a plan step instead."). It doesn't use connectors either, and it hides the thinking-level dropdown.
  - When you ask Plan mode to build a brand-new app in an empty project, it suggests switching to Design mode ("Design my app") instead of planning. This comes from the planner prompt; the client copy is noted as mirroring the server.
- **Gating:** None found.
- **Code refs:** `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-66`, `packages/ai/lib/src/assistant_options_manager.dart:7-32,72-77`, `packages/ai/lib/src/chat_session.dart:82-114`, `packages/ai/lib/src/ai_manager.dart:59-71`, `packages/ai/lib/src/agent/designer_agent.dart:14-69`, `packages/ai/lib/src/agent/planning_agent.dart:21-55,86`, `packages/ai/lib/src/tools/packages_tool.dart:107-116`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:234-238,956-968`, `lib/dashboard/dashboard_page.dart:50,219-226`, `packages/nowa_ui/lib/src/components/option_chip.dart:186`.
- **Old docs:** Missing. The old docs have no modes. What's New 3.6/3.9 mention Planning Mode and Agent Mode, but nothing mentions Design mode.
- **Screenshot value:** high. The open mode menu with the three descriptions.

### Instant / Thinking / Deep Thinking (thinking level)
- **What it does:** Chooses how much reasoning the agent uses: faster and cheaper, or slower and stronger.
- **Where:** The chat control bar, second chip (it shows the current level name and a ▾). Hidden in Plan mode. On the dashboard prompt box its tooltip is "Switch thinking level".
- **Labels:** "Instant" ("Fastest. Great for quick edits."), "Thinking" ("Balanced. Great for most tasks."), "Deep Thinking" ("Extra reasoning. Great for complex tasks.").
- **How to use:**
  1. Click the level chip.
  2. Pick a level.
  - It applies to both Design and Agent modes; switching modes keeps your level.
- **Options:** Default **Thinking**. The level is saved per project and also becomes your default for projects that never set one. The dashboard prompt box offers only Thinking and Deep Thinking (Instant is left out on purpose for whole-app first prompts), and that choice applies only to the new project.
- **Limits and rules:** Disabled while the AI is running. During a Free Weekend, levels show a "FREE" badge (tooltip "It's Free Weekend! This agent is available for free until Sunday at midnight UTC.").
- **Gating:** None for the three levels. A paid "Max Mode" agent exists in code but isn't selectable in v3.12.5 (see Not user-facing).
- **Code refs:** `packages/ai/lib/src/agent/agent.dart:11-82`, `packages/ai/lib/src/chat_session.dart:93-106`, `packages/ai/lib/src/assistant_options_manager.dart:79-108`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:970-1115,1189-1210`, `packages/ai/lib/src/ui/chat_field/tier_selector.dart:21-35`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Think Mode" (🧠 toggle): wrong, no such toggle exists. What's New 3.5 lists "Instant, Thinking, Deep Thinking, and Max"; Max isn't offered in 3.12.5.
- **Screenshot value:** medium. The open level dropdown.

### Send / Abort (sending and stopping)
- **What it does:** Sends your prompt. While the AI works, the same button stops the run.
- **Where:** The chat control bar, right-most button.
- **Labels:** Tooltip "Send" (paper-plane icon). It becomes a red stop icon with tooltip "Abort" while running, then "Cancelling..." (spinner) while stopping.
- **How to use:**
  1. Type a prompt and press Enter or click **Send**.
  2. To stop, click the stop button.
  - The current step finishes, then the run stops. Pending approvals are dropped and parallel explorer subagents are stopped too.
  - Steps that didn't run show a grey "canceled" icon (tooltip "Tool execution was canceled").
  - Changes made before stopping stay; use **Restore Checkpoint** to undo them.
- **Options:** Keyboard: Enter sends; Shift/Ctrl/⌘+Enter adds a new line; Alt/Option+Backspace deletes the previous word.
- **Limits and rules:** Send is disabled when the field is empty, while a run is stopping, and when your AI credits are used up (once the credit balance has loaded).
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:58-109,646-704`, `packages/ai/lib/src/chat_session.dart:328-332`, `packages/ai/lib/src/agent/agent_runner.dart:153-195,252-276`, `packages/ai/lib/src/ui/content_views.dart:753-765`.
- **Old docs:** Missing (no mention of stopping a run).
- **Screenshot value:** low (maybe a crop of the stop state).

### Add context (attachments and automatic context)
- **What it does:** Gives the AI exactly what you mean, so its edits land in the right place. You can attach images, text files and screens/components; your current selection is added automatically.
- **Where:** The chat control bar → **+** (tooltip "Add context"). Attached items appear as chips above the text. A "Remove all attachments" button (clear icon) appears when there are attachments. You can also paste an image (Ctrl/⌘+V) or drag an image file onto the chat field.
- **Labels:** Search palette with hint "Search screens, components, files…". Sections: "UPLOAD" ("Attach image", "Attach text file") and "FROM YOUR APP" (every screen/component/class in the project). Row markers: a check icon means already attached, a lock means read-only, and an "included" badge means it's already sent automatically as a related declaration. Chip tooltip when invalid: "This attachment is invalid and needs to be removed."
- **How to use:**
  1. Click **+**.
  2. Pick **Attach image** or **Attach text file** (opens a file picker; images allow multiple), or pick a screen/component under **From your app**.
  3. Or select a widget on the board: its chip appears automatically.
  4. Remove a chip with its × (an auto-attached selection stays removed until you select something else).
  5. Send.
- **Options:** What the AI receives with every message:
  - Automatic: the first selected widget on the board. A component instance attaches its class as editable; a plain widget attaches that widget expression. With no selection, the class open in the code editor or file view is attached.
  - Your `@` mentions and manual attachments.
  - Related declarations of attached classes, interface only (the "included" items).
  - Your **Custom Instructions**.
  - Always, invisibly: a project map of every widget name and every public declaration's signature ("Globals").
  - Hovering a chip highlights that widget on the board.
- **Limits and rules:** Up to 5 images per message ("You can only attach up to 5 images."). Text files must be readable text; binary files are dropped silently. Images attached to the chat are only kept in memory for the live session. To have the AI save an old image into assets, re-attach it.
- **Gating:** None. The lock tooltips ("Image attachments are not supported with your current settings. Try enabling thinking mode.") can't appear in 3.12.5, because every agent accepts every attachment type.
- **Code refs:** `packages/ai/lib/src/ui/attachement_menu.dart:9-163`, `packages/ai/lib/src/ui/chat_field/attachements_view.dart:43-103,128-166`, `packages/ai/lib/src/prompt_controller.dart:61-237`, `packages/ai/lib/src/attachments/attachment_builder.dart:8-33`, `packages/ai/lib/src/attachments/ai_attachement.dart:166-240`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:111-144,255,311-358`, `packages/ai/lib/src/ai_manager.dart:73-82`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Attachments" (Smart Selection, Attaching Screens/Images/Text Files): partly outdated. The button is now **+** "Add context" with a search palette; labels are "Attach image" and "Attach text file" (lower case). Paste, drop, the 5-image limit and auto-included related code aren't covered. `docs/ai/prompttip.mdx` §2–3 ("attach when it matters", "focused attachments"): still valid advice. `docs/data-connections/supabase/auth.md:9` ("attach `SupabaseService` to your prompt"): still possible via **Add context → From your app** (→ data area).
- **Screenshot value:** high. The open **Add context** palette, plus a chat field with a selection chip.

### @ mentions
- **What it does:** References a screen, component or class by name inside the sentence, and attaches it.
- **Where:** In the chat field, type `@`.
- **Labels:** A suggestion list of current attachments and all project classes (fuzzy search). Inserted mentions show as highlighted "@Name". In sent messages a mention is clickable and opens the file.
- **How to use:**
  1. Type `@` and part of a name.
  2. Use ↑/↓ and Enter, or click, to pick.
  3. Escape closes the list.
- **Options:** None.
- **Limits and rules:** A mention counts as an attachment for that message. Long names are shortened in display.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:173-219,723-954`, `packages/ai/lib/src/attachments/attachment_mention.dart:25-60`, `packages/ai/lib/src/prompt_controller.dart:152-158`, `packages/ai/lib/src/ui/content_views.dart:931-958`.
- **Old docs:** Missing.
- **Screenshot value:** medium. The `@` suggestion list.

### Suggestions (empty chat)
- **What it does:** Offers starter prompts in an empty chat.
- **Where:** The Assistant panel with no messages, in Plan or Agent mode.
- **Labels:** "Welcome to AI Assistant!" / "Type your message below to get started." / "Here are some suggestions:". Chips: "Summarize", "Fix", "Redesign UI", "Add authentication", "Use an API", "Add more pictures". Design mode shows instead: "Describe the app you want to build. Nowa will design it screen by screen — then make it work, one feature at a time." (no chips).
- **How to use:**
  1. Click a chip. It fills the prompt with a full sentence (for example, Fix → "Fix all errors in the project, including syntax errors, runtime errors, and logical errors.").
  2. Edit if you like.
  3. Send. Chips never send by themselves.
- **Options:** None.
- **Limits and rules:** —
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/chat_panel/chat_session_view.dart:168-196`, `packages/ai/lib/src/ui/ai_suggestions.dart:6-83`.
- **Old docs:** Missing.
- **Screenshot value:** medium. The empty chat with chips (could be captured in `/playground`).

### Thinking process and tool activity (what the chat shows while the AI works)
- **What it does:** Shows the reply streaming in, the AI's reasoning (collapsed), and every action it takes, so you can follow and inspect the work.
- **Where:** The conversation area of the Assistant panel.
- **Labels:**
  - The user message is a bubble with its attachment chips.
  - "Thinking process" is a collapsible block with the reasoning summary.
  - Step rows carry status icons with tooltips "Tool is running", "Tool executed successfully", "Tool execution failed" and "Tool execution was canceled". Example steps: "Investigating: …", "Reading file …", "Inspecting …", "Listing files in …", "Writing code", "Writing member in class …", "Removing …...", "Working on the widget...", "Editing <file>", "Writing <file>", "Analyzing project (static)...", "Reading project logs...", "Adding <package>...", "Downloading font '<name>'...", "Saving image '<name>' to assets", "generating API call: …".
  - Code cards are titled "Writing code" / "Modified code" with a "Show raw code" button. Each created class is listed: hover highlights it on the board, click opens it, and a widget can be dragged onto the board.
  - File steps have an "Open in New Tab" button.
  - Connector steps show "Using <tool>...".
  - A typing indicator shows while the AI works.
- **How to use:** Expand "Thinking process" to read the reasoning. Click a created class to open it, or drag it to the board.
- **Options:** None.
- **Limits and rules:** Text in the transcript is selectable. Suggested-next-steps calls are hidden from the transcript (they dock above the input).
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/content_views.dart:22-109,541-918,1145-1268`, tool view texts in `packages/ai/lib/src/tools/*.dart` (e.g. `spawn_explorer_tool.dart:45-52`, `packages_tool.dart:75-87`, `analyze_tool.dart:32-35`), `packages/core/lib/src/widgets/nowa_widgets.dart:162-163`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Think Mode": wrong. Reasoning now always shows as the collapsed "Thinking process" block.
- **Screenshot value:** high. A run with "Thinking process", a few steps and a code card.

### Questions (clarifying questions)
- **What it does:** The AI stops and asks up to 6 multiple-choice questions about product choices before building or planning.
- **Where:** Inline card in the conversation.
- **Labels:** "Questions", "n / total", progress bars, choice buttons (a recommended one shows "(Recommended)"), "Other..." (free text, hint "Type your answer..."), "Previous" and "Next" arrows, "Send Answers".
- **How to use:**
  1. Pick an answer for each question (it advances automatically), or choose **Other...** and type.
  2. When all are answered, click **Send Answers**.
  - Answers go out as a normal message ("Q: … / A: …") and the AI continues.
- **Options:** —
- **Limits and rules:** Up to 6 questions per card. The card becomes read-only once answers are sent or a newer message exists. Used by Plan mode, Design mode and Agent mode.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/tools/ask_questions_tool.dart:4-50`, `packages/ai/lib/src/ui/tool_inline_views.dart:293-636`.
- **Old docs:** Missing. What's New 3.1 mentions clarifying questions.
- **Screenshot value:** high. A Questions card with a recommended choice.

### Implementation Plan (Plan mode)
- **What it does:** Shows the plan Plan mode wrote: a plain-language summary, key decisions and numbered steps. You approve it and Agent mode implements it.
- **Where:** Inline card in the conversation (Plan mode).
- **Labels:** "Implementation Plan", "N steps", "Technical details" (toggles per-step technical notes), "Key Decisions", step titles and descriptions, "Implement this plan", "Keep planning".
- **How to use:**
  1. In Plan mode, describe what you want. Answer any **Questions**.
  2. Review the plan.
  3. To change it, reply in the chat; the AI rewrites the whole plan.
  4. Click **Implement this plan**. Nowa switches to Agent mode and sends "Implement this plan".
  5. Or click **Keep planning** to hide the buttons and continue refining.
- **Options:** "Technical details" toggle.
- **Limits and rules:** Only the latest plan card keeps its buttons, and they hide while the AI runs.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/tools/plan_tool.dart:4-60`, `packages/ai/lib/src/ui/tool_inline_views.dart:91-291`.
- **Old docs:** Missing. What's New 3.6/3.9 describe Planning Mode.
- **Screenshot value:** high. A plan card with key decisions and steps.

### Tasks (to-do list)
- **What it does:** For long requests the agent keeps a visible checklist and ticks items off as it works.
- **Where:** Inline card in the conversation.
- **Labels:** "Tasks", "completed/total", a progress bar; items are pending, in progress or done (struck through).
- **How to use:** Nothing to do; it updates as the AI works.
- **Options:** —
- **Limits and rules:** —
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/tools/todo_tool.dart:4-41`, `packages/ai/lib/src/ui/tool_inline_views.dart:9-89`.
- **Old docs:** Missing. What's New 3.6 "Todos in Agent Mode".
- **Screenshot value:** medium.

### Your app design is complete / Make it real (Design mode hand-off)
- **What it does:** When Design mode has designed every agreed screen (with demo data), it offers to switch to Agent mode and make features work, one at a time.
- **Where:** Inline card at the end of a Design-mode run.
- **Labels:** "Your app design is complete", a summary or "Every screen is designed with demo data — nothing saves yet.", "Want to change anything first? Just tell me below.", "Pick what to make work first:" (feature chips), "Make it real". After clicking: "Switched to Agent mode".
- **How to use:**
  1. Keep refining the design by chatting, or
  2. Click a feature chip, which sends "Make it real — start with "<feature>"." in Agent mode, or
  3. Click **Make it real**, which sends "Make it real — start with what you recommend.".
- **Options:** —
- **Limits and rules:** Up to 6 feature chips. Only the latest card is active. While this card is shown, the next-steps strip is suppressed.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/tools/design_handoff_tool.dart:8-30`, `packages/ai/lib/src/ui/guided_inline_views.dart:36-128`, `packages/ai/lib/src/chat_session.dart:131-155`.
- **Old docs:** Missing.
- **Screenshot value:** high.

### Suggested next steps
- **What it does:** After a run, offers 1–3 shortcuts for what to do next. Each has a label, a one-line description, and optionally a different mode.
- **Where:** A strip docked directly above the chat field (and above the New UX toolbar).
- **Labels:** "Suggested next steps" with a dismiss ×. The × tooltip is "Dismiss". A row shows a mode badge ("Design", "Plan" or "Agent") when tapping it would switch mode.
- **How to use:**
  1. Click a row. It writes the prompt into the chat field and switches mode if needed. It never sends.
  2. Edit if needed and send.
  3. Or dismiss the strip.
- **Options:** —
- **Limits and rules:** Only the current turn's suggestions show. Hidden while the AI runs.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/tools/next_steps_tool.dart:7-58`, `packages/ai/lib/src/ui/chat_panel/next_steps_bar.dart:56-190`, `packages/ai/lib/src/chat_session.dart:127-165`.
- **Old docs:** Missing.
- **Screenshot value:** medium.

### Created Widgets / Constants updated (end-of-run cards)
- **What it does:** Summarises what the AI created. New screens are placed on your open board automatically. Other new widgets (components, or screens created while no board was open) are listed so you can drag them onto the board. A separate card warns when the AI changed your app constants (API keys and secrets).
- **Where:** Bottom of the conversation when the AI is idle.
- **Labels:** "Created Widgets" / "Drag to add widgets to the board" (thumbnails; click opens the widget; × closes). "Constants updated" / "The AI changed your app constants (API keys & secrets). Review them in Settings." with the button "Open Constants" (opens Project Settings → **Constants**). × tooltip "Dismiss".
- **How to use:** Drag a thumbnail onto the board, or click it to open. Click **Open Constants** to review constants.
- **Options:** —
- **Limits and rules:** Auto-placement of new screens happens only when a board is the active tab. Screens are placed to the right of the existing ones and the board pans to them.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/chat_panel/summary_card.dart:10-263`, `packages/ai/lib/src/tools/ai_response_actions.dart:18-96`, `packages/core/lib/src/settings/constants_settings.dart:13`.
- **Old docs:** Missing. What's New 3.4 "Agent Creation Summary" and 3.8 auto-placing screens.
- **Screenshot value:** medium. A Created Widgets card with thumbnails.

### What the agent can do (agent tools, user-facing)
- **What it does:** Lists the actions Nowa's agent can take in your project. Each maps to a step row in the chat.
- **Where:** Behind every Agent-mode run (Design and Plan use subsets; see Switch mode).
- **Labels:** See the step texts under "Thinking process and tool activity".
- **How to use:** Ask in plain language; the agent picks the tools.
- **Options:** Capabilities by tool:
  - **Understand your project:** read any file (`read_file_content`); inspect declarations, signatures and usages (`inspect`); list folders (`list_project_files`). Up to 3 parallel read-only "explorer" subagents investigate broad questions (`spawn_explorer`; they search with `search_code` and `grep_files`).
  - **Build and change UI and logic (Dart):** create or replace screens, components, models and functions (`write_top_level_code`); add or change members in a class (`write_class_member`); delete a declaration (`remove_declaration`); change the exact widget you selected on the board (`replace_expression`).
  - **Edit any file:** small find-and-replace edits in Dart and non-Dart files such as `pubspec.yaml` and platform files (`edit`); create new non-Dart files such as configs, entitlements and JSON assets (`write`).
  - **Check its work:** list Nowa's problems plus web build errors, or run `flutter analyze` (`analyze`); read the Logs panel of your running app (`read_logs`, only after you run the app).
  - **Packages:** list, add or remove pub.dev packages in one batch (`packages`). It knows which packages Nowa can edit visually.
  - **APIs:** generate an API request from a cURL command (`generate_api_call`). It creates the API collection in `lib/api/`, adds the request function, test-runs it and generates response models.
  - **Data models:** follows Nowa's model rules (`model_generation_instructions`).
  - **Supabase:** follows Nowa's Supabase rules (`supabase_integration_instructions`). With **Supabase MCP** on, it also works on your backend.
  - **Fonts:** downloads any Google Fonts family into `assets/fonts/<name>.ttf` and registers it (`download_font`).
  - **Images:** saves an image you attached into `assets/images/` and registers it in pubspec (`save_attached_image`).
  - **Workflow:** **Tasks** list (`todo_write`), **Questions** (`ask_user_questions`), **Suggested next steps** (`suggest_next_steps`), **Bug report ready** (`report_issue`), **Implementation Plan** (`plan_write`, Plan mode), **Make it real** (`design_handoff`, Design mode).
  - **Figma:** with **Figma MCP** on, it can import Figma images and icons and turn colors and text styles into your theme.
- **Limits and rules:**
  - Edits that would leave a Dart file with syntax errors are refused and nothing is written.
  - Imports are regenerated after AI edits.
  - Adding packages needs the project's "load packages" experimental flag (on by default for new projects). If it's off, the AI asks you to enable it: Project Settings → **Project Details** → "Experimental flags" → **Edit** → "load packages".
  - The AI won't add `firebase_core`; it tells you to set up Firebase from settings (→ data area). It won't add `flutter_localizations` ("not supported by nowa").
  - For packages Nowa links statically, Nowa overrides the version.
  - Package add/remove is blocked in Plan mode.
  - Not available to the in-app agent in 3.12.5: running the app itself (What's New 3.1 said it could) and a shell. See Not user-facing.
- **Gating:** None. Connector capabilities need the connector turned on (Agent mode only).
- **Code refs:** `packages/ai/lib/src/agent/agent.dart:123-163`, `packages/ai/lib/src/agent/designer_agent.dart:38-69`, `packages/ai/lib/src/agent/planning_agent.dart:41-55`, `packages/ai/lib/src/tools/edit_tool.dart:5-37,104`, `packages/ai/lib/src/tools/write_tool.dart:5-34`, `packages/ai/lib/src/tools/legacy/write_code_tool.dart:6,36,75,120,148`, `packages/ai/lib/src/tools/replace_expr_tool.dart:7-29`, `packages/ai/lib/src/tools/analyze_tool.dart:6-60`, `packages/ai/lib/src/tools/packages_tool.dart:5-41,137-171,197-199`, `packages/ai/lib/src/tools/generate_api_call_tool.dart:7-94`, `packages/ai/lib/src/tools/download_font_tool.dart:4-27`, `packages/ai/lib/src/tools/save_attached_image_tool.dart:9-56`, `packages/ai/lib/src/tools/spawn_explorer_tool.dart:4-53`, `packages/ai/lib/src/tools/instruction_tools.dart:7-40`, `packages/ai/lib/src/tools/ai_response_actions.dart:18-52`, `packages/core/lib/src/settings/experimental_flags_dialog.dart:54-66`, `packages/core/lib/src/settings/project_detail_settings.dart:69-83`.
- **Old docs:** `docs/ai/howtouseai.mdx` intro ("make widgets, design pages, connect APIs"): outdated and very thin. What's New 3.2 gives the old path for the packages flag ("Settings → Packages → Load Packages (Experimental)"), which is outdated; it's now under Experimental flags. `docs/data-connections/supabase/db.md:125-141` and `streams.md:22-24` (ask Nowa AI to write queries or stream queries): plausible with `SupabaseService` and the Supabase instructions, but the data area should verify.
- **Screenshot value:** low. A capability table works better than screenshots.

### Restore Checkpoint / Reapply Checkpoint
- **What it does:** Undoes all file changes an AI request made, and can redo them.
- **Where:** Above each AI reply that changed files: a bookmark icon with a dotted line. Hover it to see the button.
- **Labels:** "Restore Checkpoint" (after restoring: redo icon and "Reapply Checkpoint"). Confirmation dialog: "Undo Last Request?" / "This will remove your last request and undo edits to the following files:" (file list) / "Cancel" / "Continue". A spinner shows while it's working.
- **How to use:**
  1. Hover the line above the AI reply.
  2. Click **Restore Checkpoint**.
  3. Check the file list and click **Continue**.
  4. To bring the changes back, hover again and click **Reapply Checkpoint**.
- **Options:** —
- **Limits and rules:**
  - Restoring a checkpoint rolls back that request **and every later request in the same session**. Each touched file goes back to its state before that request; new files are deleted.
  - Reapplying brings files back to their state right after that request.
  - The chat messages stay in the conversation; the dialog wording says "remove your last request".
  - Only changes made by the AI are recorded, and any manual edit you made later to those same files is overwritten by the restore.
  - Disabled while the AI is running.
  - Checkpoint data lives in the project's `.nowa/temp/` folder (`snapshots.db` + blobs; git-ignored). Local projects keep it on your disk; cloud projects keep it in the cloud project's files.
  - Checkpoints are looked up by session, so they also appear on sessions reopened from **Chat History**.
- **Gating:** Not available in the anonymous playground (no checkpoint service for sandboxed projects).
- **Code refs:** `packages/ai/lib/src/ui/content_views.dart:111-199`, `packages/ai/lib/src/checkpoints/checkpoint_warning.dart:31-101`, `packages/ai/lib/src/checkpoints/checkpoint_service.dart:243-383`, `packages/ai/lib/src/checkpoints/checkpoint_manager.dart:11-30`, `packages/ai/lib/src/ai_plugin.dart:14-21`, `packages/ai/lib/src/checkpoints/local_snapshot_db.dart:19`, `packages/ai/lib/src/checkpoints/snapshot_db.dart:98`, `packages/ai/lib/src/checkpoints/blob_storage_service.dart:16-19`, `packages/core/lib/src/project/settings_service.dart:34-38`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Reverting and Replaying Changes": partly outdated. The labels are "Restore Checkpoint" / "Reapply Checkpoint" (not "Replay checkpoint"), they appear on hover, and the chain behavior and dialog aren't covered.
- **Screenshot value:** high. The hover state with "Restore Checkpoint" and the "Undo Last Request?" dialog.

### Approval Required (connector tool approvals)
- **What it does:** Before a connector (MCP) action runs, the chat asks you to approve or deny it and shows the arguments.
- **Where:** Inline card in the conversation (Agent mode with Supabase or Figma MCP on).
- **Labels:** "Approval Required" (afterwards "Tool Request" with an "Approved" or "Denied" badge), "Tool:" <tool name>, "Arguments" (collapsible read-only JSON) or "No arguments", "Deny", "Approve".
- **How to use:**
  1. Read the tool name and arguments.
  2. Click **Approve** to run it, or **Deny**. The AI is told "User denied the tool execution." and continues without it.
  - Only one pending approval card is shown at a time; the typing indicator pauses while it waits.
  - Stopping the run drops pending approvals.
- **Options:** **Auto-approve tools** approves every connector action automatically. Its toggle is in the Figma icon's menu, but the setting covers all connector approvals in that project, including Supabase. It's stored per project on this device.
- **Limits and rules:** Which connector actions ask for approval is decided by the server; the agent's Supabase instructions say "All MCP tool calls are reviewed by the user before execution".
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/content_views.dart:32-61,962-1143`, `packages/ai/lib/src/agent/agent_runner.dart:136-149,198-249`, `packages/ai/lib/src/models/mcp_model.dart:4-9,18-78`, `packages/ai/lib/src/assistant_options_manager.dart:56-61,103`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:410-420`, `packages/ai/lib/src/tools/instruction_tools.dart:197`.
- **Old docs:** `docs/data-connections/supabase/mcp.md` note "you'll be asked for approval before anything is applied": accurate but incomplete (no card labels, no auto-approve).
- **Screenshot value:** high. An approval card with arguments expanded.

### New Session (and long or full sessions)
- **What it does:** Starts a fresh conversation, with clean context, in the same project.
- **Where:** Assistant panel header → **+**. Also the "Start new session" button on the long-session note and on the "Session Limit Reached" error.
- **Labels:** "New Session" (tooltip). Long-session note: "This session is getting long. For better results, start a new session and continue there." with buttons "Start new session" and "Dismiss". Error card: "Session Limit Reached" / "Start a new session to continue building. The AI has reached the maximum context window size and cannot process further messages in this session." with "Start new session".
- **How to use:** Click **+**. The old conversation stays in **Chat History**.
- **Options:** —
- **Limits and rules:** Disabled while the AI runs. Does nothing on an already empty chat. The long-session note appears after a large amount of input in one session (code: total input tokens over one million).
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:53-60`, `packages/ai/lib/src/ai_manager.dart:97-104`, `packages/ai/lib/src/chat_session.dart:53-65`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:151,270-309`, `packages/ai/lib/src/ui/content_views.dart:414-454`, `packages/ai/lib/src/models/message_content_models.dart:388-402,443-446`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Starting a Fresh Chat" ("New Chat") and "Managing Long Prompts and Chats": outdated labels ("New Chat" is now "New Session") and old screenshots. `docs/ai/prompttip.mdx` §5 "start a new chat when context drifts": advice still valid; its "about 5 prompts" rule isn't from the product.
- **Screenshot value:** medium. The long-session note.

### Chat History
- **What it does:** Lists every past AI session of this project so you can reopen one and continue it with full context.
- **Where:** Assistant panel → **⋮** (Options) → **Chat History**.
- **Labels:** "All Sessions" with a back arrow (tooltip "Back"). Rows show the session title and a relative time ("Just now", "A minute ago", "n minutes ago", "An hour ago", "n hours ago", "Yesterday", "n days ago"). "Load More". Empty state "No chat history yet". Sessions without a title show "New Chat".
- **How to use:**
  1. Open **Chat History**.
  2. Click a session. It loads ("Please wait a minute while we load this conversation...").
  3. Continue chatting.
- **Options:** —
- **Limits and rules:** Per project. Loads in pages of 25. You can't open history while the AI is running ("Cannot load session history while agent is running."). History is stored on Nowa's servers. Images attached in an old session must be re-attached if the AI needs to save them.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:24-32,73-77,105-117`, `packages/ai/lib/src/ui/sessions_history_list.dart:10-197`, `packages/ai/lib/src/sessions_controller.dart:12,40-54`, `packages/ai/lib/src/services/session_service.dart:29-53`, `packages/ai/lib/src/chat_session.dart:334-368`, `packages/ai/lib/src/models/session_models.dart:27`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Chat History": mostly accurate. The label is "Chat History" and the list is "All Sessions".
- **Screenshot value:** medium.

### Custom Instructions
- **What it does:** Saves standing instructions that are added to every AI prompt in this project.
- **Where:** Assistant panel → **⋮** (Options) → **Custom Instructions**. On the phone layout it's under the **⋯** chip.
- **Labels:** Title "Custom Instructions". Description "Add custom instructions to guide the AI assistant's behavior and responses. Only applies to this project." The text area hint gives examples ("Always use concise language", "Prefer specific widget types", "Follow certain coding patterns"). Counter "n / 5000". Buttons "Reset" and "Save" (and a close × with tooltip "Close"). Snackbar "Custom instructions saved successfully".
- **How to use:**
  1. Open **Custom Instructions**.
  2. Type your rules.
  3. Click **Save**.
- **Options:** —
- **Limits and rules:** Up to 5,000 characters (Save is disabled above that; the error reads "Custom instructions exceed the maximum length of 5000 characters."). Saved in the project at `.nowa/assistant_instructions.md`, so they travel with the project. Connected external agents receive them too (`get_project_overview`).
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/ai_options.dart:43-243`, `packages/ai/lib/src/assistant_options_manager.dart:113-165`, `packages/core/lib/src/file_system/templates/file_template.dart:49`, `packages/ai/lib/src/prompt_controller.dart:82-96`, `packages/ai/lib/src/mcp/mcp_canvas_tools.dart:97`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Custom Instructions": accurate, but it misses "Only applies to this project" and the character limit.
- **Screenshot value:** medium.

### Retry, Service under load and other chat errors
- **What it does:** Shows failures in the conversation and offers a way to recover.
- **Where:** Inline in the conversation.
- **Labels:**
  - Generic error: red text (long ones get "Show more" / "Show less"; empty ones read "Something went wrong"), a copy button ("Copy") and a retry button ("Retry").
  - Overload: "Service under load" / "Please wait while we retry your request. If the issue persists, try again later." with "Dismiss".
  - Connection: "Server is not reachable." / "Server took too long to respond. Please try again.".
  - Context full: see **Session Limit Reached**. Out of credits: see "AI usage and credits".
- **How to use:** Click **Retry**. If the first prompt failed before the AI did anything, Retry resends your original prompt. Otherwise it sends "continue with your last task" (visible as your message) so the AI picks up where it stopped.
- **Options:** —
- **Limits and rules:** Overload errors are retried automatically several times with growing delays before the error stays (code: up to 5 retries).
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/ui/content_views.dart:326-501`, `packages/ai/lib/src/chat_session.dart:222-255`, `packages/ai/lib/src/agent/agent_runner.dart:68,117-134`, `packages/ai/lib/src/services/agent_service.dart:231-266`, `packages/ai/lib/src/models/message_content_models.dart:385-455`.
- **Old docs:** Missing.
- **Screenshot value:** low.

### Bug report ready (Report)
- **What it does:** When the AI is blocked by a Nowa platform problem, it prepares a technical bug report. You send it to the Nowa team with one click.
- **Where:** Inline card in the conversation.
- **Labels:** "Preparing issue report...", then "Bug report ready - want to send it to the Nowa team?" with the button "Report" (a check mark after).
- **How to use:** Click **Report**. The in-app support ticket form opens pre-filled with the report (task, tool trace, cause, session ID); submit it there (→ account/support area).
- **Options:** —
- **Limits and rules:** Nothing is sent until you click **Report** and submit. The report is for platform problems, not bugs in your own app code.
- **Gating:** None.
- **Code refs:** `packages/ai/lib/src/tools/report_issue_tool.dart:5-84`, `packages/ai/lib/src/ui/tool_inline_views.dart:638-694`.
- **Old docs:** `docs/ai/prompttip.mdx` §9 "Report issues — earn free AI credits" (Feedback → Report): outdated. What's New 3.6 "Automatic Issue Reporting … shares a report ID" no longer matches the code, which now needs your click.
- **Screenshot value:** low.

### AI usage and credits in the chat
- **What it does:** Shows how much of your AI allowance you've used, what a session cost, and what to do when you run out.
- **Where:** The usage row under the Assistant header, **Session Details** (ⓘ), the out-of-credits banner in the conversation, and the phone-layout credits chip.
- **Labels:**
  - **Usage indicator**, shown only when you're running low: a ring plus "<n>% used". Once the plan is used up: "100% used · Using extra credits" or "100% used · No extra credits". Tooltips: "Resets <date>", "You've used 100% of your plan credits - now using your extra credits. Resets <date>", "You've used all your plan and extra credits. Resets <date>". When everything is used, a button appears: "Upgrade" on the free plan (opens Account Settings → **Billing** plans) or "Buy credits" on paid plans (opens Account Settings → **Usage** → buy credits).
  - **Token counters** (after the first run): input tokens (tooltip "Input Tokens") and output tokens (tooltip "Output Tokens").
  - **Session Details** (tooltip "Session Details"): "Details", "Session ID" (copy), an input/output token bar ("… In" / "… Out"), "Credits Used", and a "Global Usage" button that opens Account Settings → **Usage**.
  - **Out-of-credits banner:** "You ran out of credits." plus " Resets in <time>", with buttons "Invite a friend" and "Upgrade" (free plan) or "Purchase Credits" (paid). In the iOS/Android apps it reads "You reached your usage limit." with no buttons.
  - **Free Weekend:** a "FREE" pill (tooltip "Free Weekend ends in <time>. Click to register or submit your app.") that opens nowa.dev/free-weekend.
- **How to use:** Click the ⓘ for session usage, or **Global Usage** for account-wide history. When blocked, use **Upgrade**, **Buy credits** or **Purchase Credits**, wait for the reset date, or invite a friend (→ account area for Billing, Usage and the referral dialog).
- **Options:** —
- **Limits and rules:**
  - **Send** is disabled when no credits are left.
  - The indicator stays hidden until most of the plan is used (code threshold: 80%; D3 applies to amounts, so the writer decides whether to state this).
  - No per-message cost is shown, only per-session totals.
  - Buying extra credits needs the `top_up_credits` entitlement; otherwise the page says "Your current plan doesn't support buying additional credits. Upgrade to a higher tier plan to unlock this feature." (→ account area).
  - In the iOS/Android apps the purchase UI, the usage indicator and "Credits Used" are hidden.
- **Gating:** The free plan and paid plans see different buttons (`isFreePlan` = subscription type `free_plan`; the displayed name defaults to "Starter"). The purchase UI is hidden on iOS/Android (`kShowPurchaseUi`).
- **Code refs:** `packages/ai/lib/src/ui/chat_panel/remaining_credits_view.dart:10-209`, `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:120-182`, `packages/ai/lib/src/ui/session_details_popup.dart:7-250`, `packages/ai/lib/src/ui/content_views.dart:228-324`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:662`, `packages/ai/lib/src/ai_manager.dart:48-51,86-93,112-133`, `packages/ai/lib/src/ui/chat_panel/free_weekend_button.dart:13-98`, `packages/ai/lib/src/models/free_weekend_model.dart:16`, `packages/core/lib/src/billing/billing_models.dart:4,45`, `packages/core/lib/src/billing/widgets/usage_settings_page.dart:112-178,213`, `packages/core/lib/src/billing/widgets/buy_credits_page.dart:69-96`, `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:19-29`.
- **Old docs:** `docs/ai/howtouseai.mdx` "Usage & Credits": partly outdated. It claims per-message token and cost display and quotes credit costs per action (numbers must not be reused, D3). "Session Details" and "Global Usage" are correct names. `docs/ai/price.md`: plan table with prices and quotas, which must not be copied (D3); replace with a link to nowa.dev/pricing.
- **Screenshot value:** medium. Session Details popup; the out-of-credits banner needs a depleted account (probably skip).

### Supabase MCP
- **What it does:** Connects the agent to your Supabase project (through Supabase's official MCP server), so in Agent mode it can inspect and change your backend: view schemas and tables, run SQL, create and manage tables, set up RLS policies, create triggers and database functions, deploy and manage Edge Functions, and apply migrations. It also wires the Flutter side through `SupabaseService`.
- **Where:** The chat control bar → Supabase logo icon (grey when off, green when on). Tooltip "Enable MCP" when off, "Manage MCP" when on. On the phone layout it's the **Supabase** chip.
- **Labels:** When on, the menu shows "Connected: <project ref>" (green dot), "Switch project…" and "Turn off MCP". If the project is connected without OAuth: dialog "OAuth Authentication Required" / "MCP requires OAuth authentication with Supabase. Would you like to authenticate now?" with "Cancel" / "Authenticate".
- **How to use:**
  1. Click the Supabase icon.
  2. If the project isn't connected to Supabase yet, the Supabase connection dialog opens (→ data area). If it's connected only with keys, Nowa asks you to authenticate with OAuth.
  3. Once connected the icon turns green; describe what you want in **Agent** mode.
  4. Approve each backend action in the **Approval Required** cards, unless auto-approve is on.
  5. Use **Switch project…** to point at another Supabase project, or **Turn off MCP**.
- **Options:** "Switch project…", "Turn off MCP". Auto-approve: see Approval Required.
- **Limits and rules:**
  - Used only in **Agent** mode; Design and Plan modes don't send connectors.
  - Requires an OAuth connection for this project.
  - The on/off state isn't saved: it resets when you reopen the project (in-memory flag).
  - If Supabase isn't set up, the agent tells you to connect via the Supabase panel or this icon and stops. If backend access is needed and MCP is off, it asks you to click the Supabase icon.
- **Gating:** None found (no plan check in the client).
- **Code refs:** `packages/ai/lib/src/mcp/supabase_mcp.dart:7-107`, `packages/ai/lib/src/mcp/mcp_manager.dart:5-42`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:360-398,437-476,566-644`, `packages/ai/lib/src/prompt_controller.dart:73-79`, `packages/ai/lib/src/tools/instruction_tools.dart:135-199`, `packages/ai/lib/src/agent/planning_agent.dart:114`, `lib/project/nowago/sheet_panel/chips.dart:383-414`.
- **Old docs:** `docs/data-connections/supabase/mcp.md`: mostly accurate (enable the icon, connect first, approvals, capability list). Missing: OAuth requirement, "Switch project…", "Turn off MCP", Agent-mode-only, reset on reopen, auto-approve. It also says the agent always "creates a plan covering both frontend + backend", which overstates; that's Plan mode's job.
- **Screenshot value:** high. The green Supabase icon with its menu open.

### Figma MCP (and Connected Accounts)
- **What it does:** Connects the agent to your Figma account. In Agent mode it can export Figma images and icons (raster and SVG) into your project's assets, and turn Figma colors and text styles into your app theme (`lib/globals/app_colors.dart`, `lib/globals/app_text.dart`, `themes.dart`).
- **Where:** The chat control bar → Figma logo icon, right of the Supabase icon. Tooltip "Enable MCP" / "Manage MCP". Account connection: dashboard sidebar → **Settings**, or in a project the top-bar user menu → **General Settings**. Either opens Account Settings → **Account Details** → "Connected Accounts" → Figma row → **Connect** / **Disconnect**.
- **Labels:** Waiting dialog: "Waiting for Authorization...", "Please complete the authorization in your browser.", "Waiting for <time>...", "Cancel". Timeout error: "Authorization timed out. Please try again.". Menu when on: "Connected", "Auto-approve tools", "Turn off MCP". Connected Accounts row: "Figma" (or your Figma name and email) with "Connect" / "Disconnect". Disconnect confirmation: "Are you sure?" / "You will need to reconnect to Figma if you want to use Figma features again." / "No" / "Yes".
- **How to use:**
  1. Click the Figma icon. If your Nowa account isn't linked to Figma, a browser window opens; approve access there while Nowa waits.
  2. The icon turns on. In **Agent** mode, ask (for example) to bring in images or icons, or to use your Figma colors and text styles as the theme.
  3. Approve each Figma action, or open the icon's menu and turn on **Auto-approve tools**.
  4. To unlink, use **Turn off MCP** for this session, or **Disconnect** in Account Details → Connected Accounts.
- **Options:** "Auto-approve tools". This one per-project setting covers all connector approvals, Supabase included. "Turn off MCP".
- **Limits and rules:**
  - Works in cloud and local projects. In local projects Nowa downloads the exported files itself.
  - Agent mode only.
  - The Figma link is per Nowa account; the chat toggle resets when you reopen the project.
  - Authorization waits up to 2 minutes.
  - SVG masks are normalized on import.
- **Gating:** None (`FigmaIntegration.enabled = true`). What's New: "available to everyone".
- **Code refs:** `packages/ai/lib/src/mcp/figma_mcp.dart:8-129`, `packages/core/lib/src/figma/figma_oauth_manager.dart:5-77`, `packages/core/lib/src/figma/figma_auth_dialog.dart:7-25`, `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:44-114`, `packages/core/lib/src/figma/figma_settings_section.dart:26-96`, `packages/core/lib/src/settings/account_editor_settings/account_details/account_details.dart:89-93`, `packages/core/lib/src/cloud_build_v2/ui/remove_button_with_confirmation.dart:37-69`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:350,400-435,478-564`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:667-674`, `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:206-213`.
- **Old docs:** Missing (only What's New 3.12.3 and the changelog).
- **Screenshot value:** high. The Figma menu with "Auto-approve tools", and the Connected Accounts row.

### Connect External Agent
- **What it does:** Lets your own coding agent (Claude Code, Claude Desktop, Cursor, or any MCP client) control the Nowa desktop app through a local MCP server: open your projects, see the canvas, and build with Nowa's own tools while the board updates live.
- **Where:** In the desktop app, Assistant panel → **⋮** (Options) → **Connect External Agent**.
- **Labels:** Dialog title "Connect External Agent" with fields "MCP Server URL" (copy button, tooltip "Copy") and "Claude Code" (the command `claude mcp add --transport http nowa "<url>"`, copy button). Help text: "Run the Claude Code command in a terminal, or paste the URL into another coding agent and ask it to add Nowa as an MCP server. The URL grants access to your projects, so keep it out of shared configs." Button "Done". Snackbar "<label> copied". If the server isn't running: "The server is not running. Port 4680 may be in use; free it and restart Nowa."
- **How to use:**
  1. Use the Nowa desktop app with an account that has access.
  2. In any project open **⋮** → **Connect External Agent**.
  3. Copy the **Claude Code** command and run it in a terminal, or copy the **MCP Server URL** into Claude Desktop, Cursor or another MCP client.
  4. Keep Nowa open. Ask your agent to list and open a Nowa project, then build.
  5. The agent saves with `save_project` when done.
- **Options:** —
- **Limits and rules:**
  - The server runs only while the desktop app runs. It listens on 127.0.0.1 only, port 4680, and requires the token in the URL (or a Bearer header). Same-machine clients only; browser origins are refused.
  - Access starts or stops live when your account's grant changes.
  - The menu entry only appears with the grant, on desktop.
- **Gating:** **Desktop app only** (`NPlatform.isDesktop`, server started in `main.dart`). Requires the account entitlement `external_agent` (code comment: "Granted by the beta plan, which stacks on top of whatever plan the user is on"). What's New 3.12.0/3.12.3/3.12.5: "Enterprise only … email team@nowa.dev".
- **Code refs:** `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:38-39,78-84`, `packages/ai/lib/src/ui/mcp_connect_dialog.dart:9-110`, `packages/ai/lib/src/mcp/external_agent_access.dart:13-85`, `packages/ai/lib/src/mcp/nowa_mcp_server.dart:22-29,111-199`, `lib/main.dart:51-57,106`, `packages/core/lib/src/billing/entitlement_keys.dart:13`; `docs/new/whats-new.md:35,91,110`.
- **Old docs:** Missing (only What's New and changelog).
- **Screenshot value:** high, but needs an entitled desktop account. The dialog (blur the token).

### External agent tools (what a connected agent can do)
- **What it does:** The capabilities Nowa exposes to an external agent through MCP.
- **Where:** In your agent, after **Connect External Agent**.
- **Labels:** Tool names as the agent sees them, translated:
  - **Projects:** `list_projects` (your local and cloud projects; cloud needs you signed in), `open_project` (opens a project in the Nowa window and waits until it's loaded), `current_project`.
  - **Orientation:** `get_project_overview` (screens and components with files, home screen, theme file, all public declarations, your **Custom Instructions**, problem counts, what's open and selected, and Nowa's building rules), `get_guidelines`, `get_theme`.
  - **Canvas:** `get_selection` (what you selected on the canvas), `get_widget_tree` (outline with widget ids), `open_in_canvas` (shows a screen or component and selects/zooms to a widget for you), `screenshot` (PNG of a screen, component or any widget expression, plus reported build errors, overflows and placeholders), `save_project` (saves and restarts the Nowa Run preview).
  - **Setup:** `set_permissions` (adds or removes platform permissions like the Permissions panel), `add_image_assets` (downloads images from links, such as Figma MCP asset links, or copies local files into `assets/images/` and registers them; PNG, JPG, GIF, WebP, BMP, SVG).
  - **Editing:** the same tools Nowa's agent uses: `read_file_content`, `inspect`, `list_project_files`, `search_code`, `grep_files`, `write_top_level_code`, `write_class_member`, `remove_declaration`, `replace_expression`, `edit`, `write`, `analyze`, `read_logs`, `packages`, `download_font`, `model_generation_instructions`.
- **How to use:** Ask your agent in plain language; it gets Nowa's building rules on connect and from `get_project_overview`.
- **Options:** —
- **Limits and rules:**
  - Not exposed: explorer subagents (they would spend Nowa AI credits), tasks, questions, next steps, report issue, saving chat-attached images, API generation, API and Supabase instructions.
  - Direct edits to `Info.plist` / `AndroidManifest.xml` are refused; the agent must use `set_permissions`.
  - Calls run one at a time.
  - Switching projects saves the current one first and is blocked if that save fails ("Could not save … before switching …, so it was left open.").
  - Opening a project times out after 3 minutes.
  - `add_image_assets`: up to 20 images per call, 20 MB each.
  - `screenshot` width 200–1600 px (default 800).
  - Edits based on an outdated widget id are refused.
- **Gating:** Same as Connect External Agent.
- **Code refs:** `packages/ai/lib/src/mcp/nowa_mcp_server.dart:31-60,287-414,320-353,436-480`, `packages/ai/lib/src/mcp/mcp_canvas_tools.dart:22-31,50-138,166-236,363-458,696-705`, `packages/ai/lib/src/mcp/mcp_backend_tools.dart:16-131`, `packages/ai/lib/src/mcp/nowa_mcp_guidance.dart:23-84`.
- **Old docs:** Missing.
- **Screenshot value:** low (a table is better).

### What do you want to build? (dashboard prompt-to-app)
- **What it does:** Starts a new app from one prompt. Nowa asks the AI for an app name, creates the project, opens it with the Assistant panel, and sends your prompt as the first message in the chosen mode and level.
- **Where:** Dashboard, top of the projects page; the hero layout if you have no projects (→ account/projects area for the dashboard itself).
- **Labels:** Heading "What do you want to build?". The field hint types example ideas ("A habit tracker with streaks and reminders...", "A booking app for my salon...", "A CRM to manage my clients...", "A reservations app with a booking calendar..."); once focused it reads "Describe the app you want to build...". Mode chip (Design is recommended with "Start here"). Level chip (tooltip "Switch thinking level"; Thinking / Deep Thinking). Send button tooltip "Build it". Below: "Or try an example prompt" with a refresh button (tooltip "Refresh prompts") and 3 example chips at a time from 50 (e.g. "Habit Streak Tracker", "Shared Grocery List", "Split the Bill", "Workout Logger"…). Loading screen: "Setting things up…" → "Naming your app…" → "Creating your project…". Errors: "Something went wrong" with "Back to dashboard"; "No prompt provided."; "Failed to run flutter command. Please ensure that Flutter SDK is correctly set up.".
- **How to use:**
  1. Type what you want, or click an example chip to fill a full prompt.
  2. Pick a mode (default **Design**) and a level (default **Thinking**).
  3. Click **Build it**.
  4. Nowa creates the project and the AI starts working in the Assistant panel.
- **Options:** Mode (Design / Plan / Agent), level (Thinking / Deep Thinking). The choice applies to this new project only.
- **Limits and rules:** Empty prompts do nothing. The name falls back to the first words of the prompt, or "My App". The project is local when the local projects view is selected, otherwise cloud (per code comment; → projects area).
- **Gating:** None found.
- **Code refs:** `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:35-346,423-436,468,555-593`, `packages/nowa_ui/lib/dashboard/projects_view.dart:69-124`, `lib/dashboard/dashboard_page.dart:50-51,209-231`, `lib/dashboard/create_new_project/prompt_to_app_page.dart:8-157`, `lib/project/project_page.dart:197-233,313-320`, `packages/ai/lib/src/agent/agent.dart:44-52`.
- **Old docs:** Missing.
- **Screenshot value:** high. The dashboard prompt box with the mode menu open (capturable when signed in).

### Fix with AI / Explain with AI
- **What it does:** One-click AI help where something failed. It fills the chat with a ready-made prompt that includes the error log, and sends it.
- **Where:** All on the code/shipping side (→ code/Git/shipping area):
  - Nowa Run preview error screen. "Your app couldn't start because of a code error" and "The app preview failed to start" show **Fix with AI** next to "Retry". The other two error kinds show only "Restart" or "Report issue".
  - The Nowa Run "Restart failed — showing the previous version" banner (cloud projects).
  - Web deployment failure status and the "Error in Deployment" page (**Fix with AI**).
  - A failed cloud (mobile) build step (**Explain with AI**; for the "iOS code signing" step it explains the signing issue with links).
- **Labels:** "Fix with AI", "Explain with AI" (sparkle icon).
- **How to use:**
  1. Click the button.
  2. The prompt (e.g. "My web deployment failed… Investigate the error log below, fix the project, then let me know when it is safe to republish." + log) is placed in the chat. It's sent immediately if the AI is idle; otherwise it waits in the field.
  - From Nowa Run errors the Assistant panel opens too.
- **Options:** —
- **Limits and rules:** Logs are cut to their last few thousand characters. The prompt runs in whatever mode is active (the button doesn't switch to Agent).
- **Gating:** None beyond the surfaces' own gating.
- **Code refs:** `packages/core/lib/src/widgets/fix_with_ai_button.dart:7-56`, `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:12-29,87-124`, `packages/nowa_run/lib/src/ui/nowa_run_play_mode.dart:75-92`, `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:323-343`, `packages/core/lib/src/web_deploy/web_deploy_widgets/publishing_error.dart:75-93`, `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:405-413,486-491`.
- **Old docs:** Missing. `docs/ai/prompttip.mdx` §8 "Fixing errors? Just ask!" covers typed prompts only.
- **Screenshot value:** medium. A failed build step with **Explain with AI**.

### Connect app with AI / Fix with AI (Supabase backend setup)
- **What it does:** After Nowa applies a template's bundled Supabase backend to your Supabase project, it offers the AI to wire the app to it, or to fix a failed setup.
- **Where:** The "Set up Supabase backend" dialog (→ data area for the dialog itself).
- **Labels:** "Backend ready" → "Connect app with AI" (and "Done"). "Setup stopped" → "Fix with AI" (and "Close").
- **How to use:** Click the AI button. The dialog closes, the Assistant panel opens, Supabase MCP turns on, Nowa switches out of Plan mode, and a prompt is sent: "Connect this app to my Supabase backend. The migrations are already applied, but the frontend is still not wired up to it". The Fix variant asks to connect the project, update or create `SupabaseService` and replace the mock data.
- **Options:** —
- **Limits and rules:** Needs OAuth with Supabase (the setup itself requires it).
- **Gating:** None.
- **Code refs:** `packages/data/lib/src/supabase/migrations/ui/sb_backend_setup_dialog.dart:65-194`, `packages/data/lib/src/supabase/migrations/sb_backend_setup_flow.dart:38-74`.
- **Old docs:** Missing.
- **Screenshot value:** low.

### Press / to chat... (New UX AI toolbar)
- **What it does:** In the experimental New UX, the AI lives in a floating toolbar at the bottom of the board instead of the side panel. It has a compact chat field, a progress chip, a reply card, and a mini conversation panel.
- **Where:** Project Settings → **Project Details** → "Experimental flags" → **Edit** → "New UX" → **Apply** (the project restarts). Then the toolbar sits at the bottom centre of the board; press `/` to focus it. In the top-bar panel icons, the **Assistant** icon switches the AI between the bottom toolbar and the side panel. (→ editor shell area for the New UX itself.)
- **Labels:** "Press / to chat..." (collapsed field; it expands into the full chat field). The progress chip shows the current step name, "Thinking…" or "Working…", with a stop icon ("Stopping…" while stopping). Reply card: "Respond…" plus a play button. The panel header shows the session title or "New session", "Start a new session", and ×. A collapsed pill shows "Conversation" (or the title) with "Start a new session". Tooltip "Open Assistant panel". With the AI at the bottom, attachments show as image or file cards.
- **How to use:**
  1. Turn on New UX.
  2. On the board press `/` or click the field.
  3. Type and send.
  4. Follow progress in the chip; open the panel to read the conversation.
- **Options:** —
- **Limits and rules:** The `/` shortcut is registered in every project, but only the New UX toolbar reacts to it (the classic side panel doesn't listen for it).
- **Gating:** Experimental project flag `new_ux` (off by default).
- **Code refs:** `packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:16-678`, `packages/designer/lib/src/panels/designer_board.dart:113-127`, `packages/designer/lib/src/designer_setup.dart:52,106`, `packages/designer/lib/src/actions/designer_actions.dart:261-266`, `lib/project/side_bar.dart:16-41`, `packages/core/lib/src/panels/panel.dart:220-233`, `packages/core/lib/src/settings/experimental_flags_dialog.dart:67-79`, `packages/core/lib/src/providers/editor_provider.dart:338`, `packages/ai/lib/src/ui/chat_field/attachements_view.dart:128-131`.
- **Old docs:** None in docs/ (What's New 3.7.2 mentions it).
- **Screenshot value:** medium (only if the IA decides to document New UX).

### AI chat in the phone browser (mobile layout)
- **What it does:** In a phone-size browser window, Nowa shows a mobile layout with its own AI chat. It has a pill-shaped chat field with voice input, toolbar chips, and a full-screen conversation.
- **Where:** Open a project in a phone-size browser window (or the Nowa GO app). The chat pill sits at the bottom; sending opens the chat page.
- **Labels:**
  - Pill hints: Design "Describe the app you want to build…", Plan "What would you like to plan?", Agent "Ask Nowa AI…", and "Listening…" during voice input.
  - Starter chips (same six as desktop).
  - Toolbar chips when focused: mode ("Mode" sheet), level ("Model" sheet), "Attach"/"Attach (n)" (→ "Image", "Components", where the components sheet hint is "Search screens & components…"), "Supabase", "History", the credits chip, and "⋯" ("Custom Instructions", "New Session").
  - Chat page: title "AI Assistant" (or session title), tooltips "Run app" and "New session", empty text "Type below to start chatting with Nowa AI.".
  - A resume bar shows the last session ("Continue conversation").
  - In the screens carousel, tapping a screen toggles it as an attachment (paper-clip badge); long-press → "Attach to chat".
- **How to use:**
  1. Tap the pill and type, or tap the mic to dictate.
  2. Use the chips for mode, level, attachments and Supabase.
  3. Send; the conversation opens full-screen.
- **Options:** Voice input (dictation; stops after a pause).
- **Limits and rules:** No Figma icon or Connect External Agent here. Purchase UI is hidden in the native iOS/Android apps.
- **Gating:** Phone-size web viewport, or iOS/Android (Nowa GO, private beta per What's New 3.10.5).
- **Code refs:** `packages/nowa_ui/lib/src/globals/responsive_utils.dart:63-68`, `lib/project/project_page.dart:105-106`, `lib/project/nowago/sheet_panel.dart:16-394`, `lib/project/nowago/sheet_panel/voice_input.dart:6-120`, `lib/project/nowago/sheet_panel/chips.dart:105-152,339,383-477,511-539`, `lib/project/nowago/sheet_panel/suggestions_row.dart:12-52`, `lib/project/nowago/mobile_chat_page.dart:79-156`, `lib/project/project_dashboard.dart:62-73,127-134`, `lib/project/panels/widgets_panel/widget_carousel_view.dart:117-141`.
- **Old docs:** Missing.
- **Screenshot value:** medium (phone-size capture of the chat pill and chips).

### View Raw Data
- **What it does:** Shows the raw JSON of any message (prompt, text, tool calls), useful for debugging or support.
- **Where:** Hover a message → **⋮** at its top-right (tooltip "View Raw Data").
- **Labels:** Dialog with "Contents" (numbered parts) and the preview placeholder "Select a content to preview".
- **How to use:** Hover → ⋮ → pick a part on the left.
- **Options:** —
- **Limits and rules:** Read-only.
- **Gating:** None (visible in release builds).
- **Code refs:** `packages/ai/lib/src/ui/message_options.dart:8-95`, `packages/ai/lib/src/ui/content_views.dart:94-99,594`.
- **Old docs:** Missing.
- **Screenshot value:** low.

### Prompting guidance in the product
- **What it does:** Collects the tips and examples the UI itself gives, as source material for a prompting page.
- **Where:** Various.
- **Labels:**
  - Onboarding tour step "AI Agent": "Use the AI agent to build, edit, or fix anything. Select a screen or widget from the board to attach as context, or use the attach button to include any part of your project or upload an image."
  - Placeholders by mode (see Switch mode). Dashboard animated hints and 50 example prompts (see What do you want to build?).
  - Empty-chat starter chips (see Suggestions).
  - Custom-instructions hint ("Always use concise language", "Prefer specific widget types", "Follow certain coding patterns").
  - Design-mode empty text ("Nowa will design it screen by screen — then make it work, one feature at a time.").
  - The Rive migration notice: "You can upgrade it using AI, manually, or contact support for help."
- **How to use:** —
- **Options:** —
- **Limits and rules:** Behavior the AI follows by design, worth explaining to users (from the agents' prompts mirrored in the client, see Open questions):
  - Plan mode asks product questions first, and suggests Design mode for brand-new apps.
  - Design mode builds with demo data and doesn't wire backends.
  - Fonts come from Google Fonts via download (not the `google_fonts` package).
  - Supabase needs to be connected first (the agent stops and asks you).
  - The external-agent rules (mirroring the in-app prompts) include "Build only what was asked", demo data in `*SampleData` classes, constants in `AppConstants`, and a themed (non-stock-Material) look by default.
- **Gating:** —
- **Code refs:** `lib/project/onboarding/onboarding_step.dart:81-88`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:234-238`, `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:35-342`, `packages/ai/lib/src/ui/ai_suggestions.dart:6-50`, `packages/ai/lib/src/ui/ai_options.dart:168-169`, `packages/core/lib/src/migrations/migration_service.dart:173`, `packages/ai/lib/src/agent/planning_agent.dart:59-142`, `packages/ai/lib/src/tools/download_font_tool.dart:7-10`, `packages/ai/lib/src/tools/instruction_tools.dart:139-142`, `packages/ai/lib/src/mcp/nowa_mcp_guidance.dart:1-84`.
- **Old docs:** `docs/ai/prompttip.mdx`: generic tips, partly still useful (small steps, attach focused context, give context, new chat for new topics, be specific). Outdated where it doesn't mention modes or plans, and in the report flow. `docs/ai/exampleprompts.mdx`: two hand-written example prompts, still fine as examples but not from the product.
- **Screenshot value:** low.

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| Max Mode agent ("Most powerful. (Consumes 5x more credits.)", `max_mode` entitlement, locked-reason texts) | `packages/ai/lib/src/agent/agent.dart:83-92` (not in `allAgents`, line 11); `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:978-1115` | Unreachable: defined but not in the agent list, so never offered (What's New 3.5 still mentions Max) |
| "Vibe" agent | `packages/ai/lib/src/agent/agent.dart:110-117` | Experimental, never registered |
| Local planning agent and local agent prompts | `packages/ai/lib/src/agent/planning_agent.dart:6-19`, `packages/ai/lib/src/agent/local_agent.dart` | Dev-only (unreferenced) |
| Trace panel ("Trace"), Manual tool call panel ("ManualTool"), Libraries icon | `packages/ai/lib/src/ai_plugin.dart:24-27`, `lib/project/side_bar.dart:77-92` | Debug builds only (`kDebugMode`) |
| Runner debug view in the chat panel | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:94` | Debug only |
| "Load" debug history popup (Project ID / Session ID) | `packages/ai/lib/src/ui/sessions_history_list.dart:114-132,232-270` | Debug only |
| Prompt debug snapshots, checkpoints debug dialog | `packages/ai/lib/src/ui/debug/*`, `packages/ai/lib/src/agent/agent_runner.dart:90-97` | Debug only |
| Cloudflare docs MCP | `packages/ai/lib/src/mcp/cloud_flare_mcp.dart` | Unused (not in `AiManager.mcps`) |
| `bash` tool (needs approval) | `packages/ai/lib/src/tools/bash_tool.dart:45`, commented out at `packages/ai/lib/src/agent/agent.dart:141` | Disabled |
| `play_app` / `stop_app`, `get_supabase_schemas`, legacy tools (`list_problems`, `flutter_analyze`, `list_packages`, `add_package`, `get_declarations`…) | `packages/ai/lib/src/tools/play_app_tool.dart`, `get_supabase_schemas_tool.dart`, `tools/legacy/*` | Not in any agent toolset (internal or legacy) |
| "AI Usage" / "Credits Overview" / "Usage History" settings pages | `packages/core/lib/src/settings/ai_assistant_usage_settings.dart`, `ai_assistant_usage_history.dart`, `credits_settings.dart` | Unreferenced (dead code); the live pages are Account Settings → Usage / Billing |
| "AI has been working for a while now" banner (continue button) | `packages/ai/lib/src/ui/content_views.dart:503-539`; only produced by legacy parser `packages/ai/lib/src/models/ai_models.dart:22` | Probably unreachable with the current server transport (`fromServerJson` has no max-turns event); see Open questions |
| Legacy assistant service | `packages/ai/lib/src/services/assistant_service.dart`, registered at `packages/core/lib/src/services/locator.dart:63` | Internal; chat uses `AgentService` |
| Attachment lock tooltips ("…Try enabling thinking mode.") | `packages/ai/lib/src/ui/attachement_menu.dart:41,59`; `packages/ai/lib/src/ai_manager.dart:73-82` | Unreachable: all agents accept all attachment types |
| Mock snapshot DB | `packages/ai/lib/src/checkpoints/mock_snapshot_database.dart` | Tests |

## Open questions
1. **Which connector actions need approval?** The approval request comes from the server (`mcp_approval_request`). The client can't show which Supabase or Figma tools ask (all of them? only writes?). What's New says Figma asks "before each Figma action"; the Supabase instructions say "All MCP tool calls are reviewed".
2. **Auto-approve scope.** The only "Auto-approve tools" toggle is in the Figma menu, but it sets one per-project flag that auto-approves *all* connector approvals, Supabase included (`assistant_options_manager.dart:56-61`, `agent_runner.dart:138`). Is that intended, and how should the docs phrase it?
3. **External agent badge.** The code gates on entitlement `external_agent` with the comment "Granted by the beta plan"; What's New says "Enterprise only, email team@nowa.dev". Which badge: Enterprise, Beta, or both, plus Desktop app only?
4. **External agent credits.** Do external-agent sessions use Nowa AI credits? The code excludes `spawn_explorer` because it "spends Nowa credits", implying the exposed tools don't, but this is unconfirmed.
5. **Claude Desktop / Cursor setup.** The dialog only offers the URL and a Claude Code command. Is there official config guidance for Claude Desktop (which may need a bridge for HTTP MCP) and Cursor?
6. **"Attach text file" on the web app** may fail: `isProbablyText` uses `dart:io` `File(path)` (`packages/core/lib/src/utils.dart:358-363`), which doesn't work on web. Verify in a capture session.
7. **Max Mode.** Confirm it's retired (unreachable in 3.12.5), so the docs don't mention it.
8. **"AI has been working for a while now"** banner: confirm it can no longer appear (legacy transport only).
9. **Undo.** Can AI changes also be undone with the editor's Undo (⌘/Ctrl+Z) or the Action History, or only with checkpoints?
10. **Figma usage.** Does the user paste a Figma frame/file link in the prompt? Which Figma MCP tools exist beyond the four the client hooks (`export_flutter_assets`, `export_svg_flutter_assets`, `extract_theme_colors`, `extract_theme_typography`)? Can it read layouts to build screens, or only assets and theme?
11. **Model name.** The UI never names the model (What's New: Gemini 3.7 Flash). Should the docs name it or stay generic ("Instant / Thinking / Deep Thinking")?
12. **New UX.** Document the AI bottom toolbar ("Press / to chat...") as an Experimental feature, or leave it out per D2? The flag is user-reachable in Project Settings and promoted in What's New 3.7.2.
13. **Free Weekend.** Document the FREE pill and badges, or treat them as a transient promotion?
14. **Checkpoints across machines.** Checkpoint data lives in git-ignored `.nowa/temp/`. Do checkpoints survive Cloud↔Local project sync, cloning, or opening a local project on another machine (probably not)?
15. **Usage threshold.** The usage indicator appears at 80% of plan credits (`remaining_credits_view.dart:10`). OK to say "when you're running low" without the number?
16. **AI and descriptions.** Do component descriptions (doc comments, What's New 3.12) reach the AI? `DeclAttachment` sends `decl.source`; it's unconfirmed whether that includes the doc comment.
17. **Prompt mirrors.** The planner prompt (`planningSystemPrompt`) and MCP guidance are client-side mirrors of server prompts ("keep in sync"). Behavior claims taken from them (Design-mode redirect, `*SampleData` classes, theming rules) should be confirmed against the server prompts before publishing.
18. **Prompt-to-app cost.** Does naming the app with AI on the dashboard consume credits?
