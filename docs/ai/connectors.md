---
title: Connect Figma and Supabase to Nowa AI
description: Turn on the Supabase and Figma connectors so Nowa AI can build your backend and bring in your Figma design, and approve each action before it runs.
sidebar_label: Connectors
keywords: [connector, MCP, Supabase MCP, Figma MCP, enable MCP, manage MCP, turn off MCP, auto-approve tools, approval required, connected accounts, figma import, supabase backend, row level security, edge functions]
---

Connectors let Nowa AI reach beyond your project. The **Supabase** connector lets it build and change your backend. The **Figma** connector lets it bring in the images, icons, colors and text styles of your design. In the app they are labeled **MCP**, the standard way an AI agent connects to a service.

## How connectors work

Two icons sit in the chat field next to **+**: the Supabase icon and the Figma icon. Their tooltip is **Enable MCP** when a connector is off and **Manage MCP** when it is on.

- Connectors work in **Agent** mode only. **Design** and **Plan** modes don't use them, even when they are on. See [Design, Plan and Agent modes](modes.md).
- A connector switches off when you reopen the project, so turn it on again when you need it.
- Nowa AI asks for your approval before it runs a connector action. See [Approve what a connector does](#approve-what-a-connector-does).

## Connect Supabase

Before you start, sign in to Nowa. Nowa AI reaches your Supabase project through Supabase's own MCP server, with your authorization.

1. Click the Supabase icon in the chat field.
2. Follow what Nowa asks for:
   - If the project isn't connected to Supabase yet, authorize Nowa in the browser window that opens. Then click **Select** next to your Supabase project, or choose **Create New Project**. See [Connect Supabase](../integrations/supabase/connect.md) for the details.
   - If the project is connected with keys only, Nowa asks **OAuth Authentication Required**. Click **Authenticate** and authorize in the browser.
   - If the project is already connected, there is nothing more to do.
3. When the icon turns green, switch to **Agent** mode and describe what you want.

Click the green icon to open its menu:

| Menu item | What it does |
|---|---|
| **Connected: &lt;project ref&gt;** | Shows the reference of the Supabase project Nowa AI works on. |
| **Switch project…** | Opens the project picker. The project you choose becomes the Supabase project for your app and for Nowa AI. |
| **Turn off MCP** | Turns the connector off. |

With the connector on, Nowa AI can look at your database and change it:

- View schemas and tables, and run SQL to read or change data.
- Create and manage tables.
- Set up Row Level Security (RLS) policies.
- Create database triggers and functions.
- Deploy and manage Edge Functions.
- Apply migrations.

It also writes the matching functions in your app's `SupabaseService`, so your screens can use what it built. For example: "Create a tasks table where each person sees only their own tasks, then list them on the home screen."

If your project isn't connected to Supabase, or the connector is off, Nowa AI tells you to connect it from the Supabase panel or the Supabase icon, then stops.

## Connect Figma

1. Click the Figma icon in the chat field.
2. If your Nowa account isn't linked to Figma yet, a browser window opens. Approve access there. Nowa waits with **Waiting for Authorization...** for up to 2 minutes, and shows "Authorization timed out. Please try again." after that. Click **Cancel** to stop waiting.
3. When the Figma icon turns on, switch to **Agent** mode and ask.

With the connector on, Nowa AI can:

- Bring in images and icons from your Figma design as project assets, including SVGs.
- Turn your Figma colors and text styles into your app's theme.

For example: "Bring the icons from my Figma design into the project and use its colors and text styles as the theme." The theme results are written to your theme files, such as `lib/globals/app_colors.dart` and `lib/globals/app_text.dart`. Figma works in cloud and local projects.

Click the Figma icon again to open its menu: **Connected**, **Auto-approve tools** and **Turn off MCP**.

{/* CAPTURE: id=ai-connectors-1 | state: signed-in project with a Figma account linked, Figma icon clicked in the chat field | show: the Figma menu with Connected, Auto-approve tools and Turn off MCP above the chat field | crop: chat field + menu */}

The Figma link belongs to your account, not to one project. To link or unlink Figma outside the chat, open your account settings, go to **Account Details**, and use **Connect** or **Disconnect** next to Figma under **Connected Accounts**. See [Account settings](../account/account-settings.md).

## Approve what a connector does

Before a connector action runs, an **Approval Required** card appears in the conversation. It shows the tool's name after **Tool:** and its **Arguments**, open so you can read them. Click **Arguments** to collapse them.

1. Read what the action will do.
2. Click **Approve** to run it, or **Deny** to skip it. Nowa AI is told the action wasn't allowed and carries on without it.

The card then reads **Tool Request**, with an **Approved** or **Denied** badge. If you stop the request, pending approvals are dropped.

{/* CAPTURE: id=ai-connectors-2 | state: signed-in project with the Supabase connector on and a request that needs a backend change | show: an Approval Required card with Tool, the expanded Arguments, Deny and Approve | crop: Assistant panel conversation */}

To skip the cards, use **Auto-approve tools**. The switch lives in the Figma menu, so turn the Figma connector on, click its icon, then click **Auto-approve tools**. To turn it off, open the menu and click **Auto-approve tools** again.

One switch covers every connector in the project, Supabase included. Its check mark is highlighted while it is on, and Nowa remembers the setting for the project on this device.

:::warning
With **Auto-approve tools** on, connector actions run without asking, including changes to your Supabase backend such as tables, policies and functions. Turn it on only when you trust the request.
:::

## Turn a connector off

Click the connector's icon, then **Turn off MCP**. Nowa AI stops sending that connector with your requests.

## Next steps

- [Connect Supabase](../integrations/supabase/connect.md)
- [Manage your Supabase backend](../integrations/supabase/backend.md)
- [Use theme colors and text styles](../design/theme-styles.md)
