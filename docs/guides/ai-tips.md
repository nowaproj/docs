---
title: Get the best from Nowa AI
description: Pick the right mode, give the right context, work in small steps, undo with checkpoints, set standing rules, use connectors and know when to edit by hand.
sidebar_label: Nowa AI tips
keywords: [AI tips, prompt tips, best practices, Nowa AI, modes, context, checkpoints, custom instructions, connectors, agent, vibe coding]
---

Nowa AI does its best work when you steer it: the right mode, the right context and one clear job at a time. These habits keep its changes accurate and easy to review, and keep you in control of the result.

## Pick the right mode and level

- **Design** is for the look and flow of a new app, or for restyling. It builds with demo data and doesn't touch a backend.
- **Plan** is for big or unclear work. Nowa AI reads your project, asks questions and writes a plan, and changes nothing. Click **Implement this plan** when you like it.
- **Agent** is for everything that has to work: logic, data, packages, files, Figma and Supabase.
- The thinking level sets how much Nowa AI reasons. **Instant** suits small edits, **Thinking** suits most requests, and **Deep Thinking** suits big features and tricky logic.

**Fix with AI** sends its prompt in the active mode, and Plan never changes your project. Switch to **Agent** first if you want the fix applied. See [Design, Plan and Agent modes](../ai/modes.md).

## Give it the right context

- **Select what you mean.** The selected widget is attached to your next message as a chip above the chat field. Check it before you send, and click **×** to remove one you don't mean.
- **Attach a screen or component** with **+** (**Add context**) or `@`. "Build Settings like the Profile screen" works best with Profile attached.
- **Attach an image** as a design reference or a logo. To put a logo in your app, say so, and Nowa AI saves it to your assets. The limit is 5 images.
- **Attach less, not more.** Nowa AI can look around the project itself, so one focused attachment keeps its changes accurate.

{/* CAPTURE: id=guides-ai-tips-1 | state: playground starter, AI Assistant open, a Button selected | show: the selection chip above the chat field, the mode and thinking-level chips and the + button | crop: AI Assistant panel, bottom */}

See [Give Nowa AI context](../ai/context.md).

## Work in small steps

- **Start wide, then go narrow.** Describe the whole app in **Design** mode, then ask for one screen or feature at a time.
- **Ask for one job per request.** "Add a search bar to the product list" is easier to review, and to undo, than "build everything".
- **Check each result** on the board or with **Play**, then ask for the next change. **Suggested next steps** can write the next prompt for you, and nothing is sent until you press **Send**.
- **Start a new session** for an unrelated topic, or when Nowa says the session is getting long.
- **Edit by hand in between.** Nowa applies your code edits before it sends a request, so Nowa AI works from your latest code.

[Write prompts that work](../ai/prompting.md) has a shape that suits bigger requests.

## Undo with checkpoints

Every request that changes files gets a checkpoint. Hover the dotted line above its reply and click **Restore Checkpoint**.

- A restore also undoes every later request in the session, and your own edits to those files since. **Reapply Checkpoint** brings back the AI's version.
- Package changes, downloaded fonts, Figma imports and Supabase changes aren't recorded, so a restore leaves them in place.
- Checkpoints are an undo button, not a backup. They live in `.nowa/temp/`, which Git ignores.

Look at a result before you edit on top of it, and if you use Git, commit before a big request. See [Undo AI changes and reopen chats](../ai/undo-and-history.md).

## Save standing rules with Custom Instructions

Put rules for every request in **Custom Instructions**, from the **⋮** menu in the **AI Assistant** header, up to 5,000 characters. They apply to this project only and travel with it. Good candidates:

- "Use theme colors and text styles, never fixed colors."
- "Put anything used on more than one screen in a component."
- "Explain each change in one sentence."

See [Write prompts that work](../ai/prompting.md#custom-instructions).

## Use connectors for your backend and design files

- Turn on **Supabase** (the icon in the chat field), switch to **Agent** mode and ask for backend work: tables, Row Level Security policies, functions and migrations. For example: "Create a tasks table where each person sees only their own tasks, then list them on the home screen."
- Turn on **Figma** to bring in images, icons, colors and text styles from your design.
- Connectors switch off when you reopen the project.
- Read each **Approval Required** card before you click **Approve**. **Auto-approve tools** skips the cards for every connector, Supabase backend changes included, so use it only for requests you trust.

See [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).

## Review what the agent did

- Read the steps in the conversation. Hover a code card to highlight what it wrote on the board, and click it to jump there.
- Check the board, click **Play**, and open the logic in **Circuit** if the request touched behavior.
- When **Constants updated** appears, click **Open Constants** and check the values. See [Keep secrets out of your app](data-and-state-tips.md#keep-secrets-out-of-your-app).
- Ask in **Agent** mode: "Check my project for problems and fix them." For a bug in the running app, **Run** it first, because Nowa AI can read the logs of a running app.

## Switch to visual editing when it's faster

- **Use your hands for polish:** exact spacing, colors, text, order and theme tweaks. Select the widget and change it in **Details**.
- **Use Nowa AI for structure and plumbing:** new screens, logic, data, changes in many places, and setup such as packages and fonts.
- **Mix them.** Tune a widget yourself, then select it and ask for the next step. Nowa AI builds on what you made.

## Next steps

- [Build a complete app, start to finish](complete-app.md)
- [Chat with Nowa AI](../ai/chat.md)
