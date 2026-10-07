---
title: How Nowa AI works
description: Nowa AI is a full agent that designs screens, writes logic and sets up your app while you watch every step on the board and stay in control.
sidebar_label: How it works
keywords: [Nowa AI, AI assistant, AI agent, AI chat, prompt, vibe coding, build an app with AI, design mode, plan mode, agent mode, think mode, AI credits, AI usage]
---

Tell Nowa AI what you want in plain words, and it designs screens, writes logic, adds packages and images, and fixes errors while you watch every step and fine-tune the result on the board. It is a full agent that works inside your real project and writes real Flutter code that you own.

## Open the AI Assistant

The **AI Assistant** panel is open when you open a project. If you closed it, click the **Assistant** icon at the top of the left sidebar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>1</kbd>. The same shortcut hides it again.

![The AI Assistant panel on first open: the header with the New Session (+) and more (three dots) buttons, the suggestion chips, and the chat field with the Agent and thinking-level chips, Add context, Supabase, Figma and Send.](/img/docs/ai/ai-index-1.png)

The panel has three parts:

- **Header**: shows **AI Assistant**, or the session's name once Nowa AI has given it one. **+** starts a new session. **⋮** opens **Custom Instructions** and **Chat History**, plus **Connect External Agent** in the desktop app if your account has access.
- **Conversation**: your messages, the agent's replies, and a line for each step it takes.
- **Chat field**: where you type. Under it are the mode chip, the thinking-level chip, **+** (**Add context**), the Supabase and Figma connector icons, and **Send**.

:::note
You can try the editor in the [playground](../get-started/playground.md) without an account, but Nowa AI needs one. The first time you send a message there, Nowa asks you to sign in.
:::

## What Nowa AI can do

Ask in plain language. The agent decides which steps to take, and each one shows up in the conversation. **Agent** mode can do all of this. **Design** and **Plan** use only part of it.

| Area | What it does |
|---|---|
| Understand your project | Reads your files and the screens, components and functions in them. For broad questions it investigates several parts of the project at once. |
| Build the app | Creates and changes screens, components, models and functions as real Flutter code. New screens are placed on your board when a board is open. |
| Change what you selected | Edits the exact widget you selected on the board. |
| Edit other files | Changes files such as `pubspec.yaml` and platform files, and creates new ones. |
| Check its work | Reads the problems Nowa finds, runs a code analysis, and reads the logs of your running app (run the app first). |
| Packages | Adds or removes pub.dev packages. This needs the **load packages** experimental setting, which is on in new projects. See [Add packages](../code/packages.md). |
| APIs | Builds an API request from a cURL command, tests it and creates the response models. |
| Fonts and images | Downloads a Google Fonts family into your project. Saves an image you attached to your assets. |
| Backend and design files | With a connector turned on, works on your Supabase backend or brings in Figma images, icons, colors and text styles. See [Connect Figma and Supabase to Nowa AI](connectors.md). |
| Stay organized | Asks you questions, keeps a **Tasks** list on long requests, writes a plan in Plan mode and suggests next steps. |

## Choose a mode and a thinking level

Two chips in the chat field tune how the agent works.

| Mode | Use it to |
|---|---|
| **Design** | Create or refine the look and flow without logic. Screens, navigation and theming are built with demo data. |
| **Plan** | Plan complex tasks before building. Nowa AI explores your project, asks questions and writes a plan, and changes nothing. |
| **Agent** | Do everything, from design to functionality. |

The thinking level trades speed for reasoning. **Instant** is the fastest, **Thinking** is balanced and the default, and **Deep Thinking** adds extra reasoning for complex tasks. Plan mode runs at a fixed level, so the thinking-level chip is hidden there.

For when to use which, see [Design, Plan and Agent modes](modes.md).

## Use Nowa AI and the visual editor together

- **Select to point.** Click a widget or screen on the board and it is attached to your next message, so "make this button rounder" lands in the right place. See [Give Nowa AI context](context.md).
- **Watch it happen.** Changes appear on the board as the agent works.
- **Edit by hand any time.** What the agent builds is normal Nowa content. Change it in the **Details** panel, the **Outline** or the code, then ask for more.
- **Undo a whole request.** If you don't like a result, use **Restore Checkpoint**. See [Undo AI changes and reopen chats](undo-and-history.md).

Nowa saves your project automatically when a request finishes.

## Where else Nowa AI shows up

- **Dashboard**: describe an app in **What do you want to build?** and click **Build it**. Nowa creates the project and starts the AI. See [Build your first app](../get-started/first-app.md).
- **Errors**: **Fix with AI** appears when the embedded preview can't start or a web deployment fails, and **Explain with AI** appears on a failed build step. Each sends the error log to the chat. See [Run your app](../test/run.md) and [Build history and logs](../publish/builds.md).
- **Supabase backend setup**: when a template's backend is ready, **Connect app with AI** opens the assistant, turns on the Supabase connector and sends a ready-made prompt. If setup stopped, the button is **Fix with AI**. See [Manage your Supabase backend](../integrations/supabase/backend.md).
- **Your phone**: the mobile layout has its own AI chat. See [Use Nowa on your phone](../get-started/mobile.md).
- **Your own agent**: Claude Code, Claude Desktop and Cursor can build in Nowa too. See [Connect your own AI agent](external-agent.md).

## Usage and credits

Nowa AI runs on your plan's AI credits. When you start to run low, a **% used** indicator appears under the panel header. After a request finishes, token counts and a **Session Details** info icon appear there as well, and **Global Usage** in its popup opens your account's usage page. If you run out, the chat says so and offers ways to continue.

Plans, extra credits and billing are covered in [Plans, billing and AI usage](../account/plans-and-usage.md). For what each plan includes, see [nowa.dev/pricing](https://nowa.dev/pricing).

## Next steps

- [Design, Plan and Agent modes](modes.md)
- [Chat with Nowa AI](chat.md)
- [Write prompts that work](prompting.md)
