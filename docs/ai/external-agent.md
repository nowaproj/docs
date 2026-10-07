---
title: Connect your own AI agent
description: Let Claude Code, Claude Desktop or Cursor open your Nowa projects, see your board and build with Nowa's own tools while the board updates live.
sidebar_label: Connect your own agent
keywords: [external agent, connect external agent, MCP server, Claude Code, Claude Desktop, Cursor, bring your own agent, coding agent, MCP, add_image_assets, enterprise]
---

Already work with a coding agent? Connect Claude Code, Claude Desktop or Cursor to the Nowa desktop app, and it can open your projects, see your board and build with Nowa's own tools. Your board updates while it works.

<Badge type="enterprise" /> <Badge type="desktop" />

## Before you start

- Use the Nowa [desktop app](../get-started/desktop-app.md), signed in with an account that has access. Connecting your own agent is **Enterprise only** for now. To get access, email `team@nowa.dev` and the Nowa team will set you up.
- Use Claude Code, Claude Desktop, Cursor or another coding agent that can add an MCP server by URL.

Until your account has access, the **⋮** menu in the **AI Assistant** header doesn't show **Connect External Agent**. Nowa rechecks your account's access while it runs, so access starts and stops without a restart.

## Connect your agent

1. In the desktop app, open a project.
2. Click **⋮** in the **AI Assistant** header, then **Connect External Agent**.
3. Copy what your agent needs. The copy button next to each field confirms with a message such as "Claude Code copied".
   - **Claude Code**: copy the **Claude Code** command and run it in a terminal.
   - **Other agents**: copy the **MCP Server URL**, paste it into your agent, and ask it to add Nowa as an MCP server.
4. Click **Done**. Keep Nowa open while your agent works.
5. In your agent, ask it to list and open a Nowa project, then tell it what to build.

{/* CAPTURE: id=ai-external-agent-1 | state: desktop app signed in with an account that has the external agent grant, a project open, ⋮ then Connect External Agent clicked | show: the Connect External Agent dialog with the MCP Server URL (token blurred), the Claude Code command, the help text and Done | crop: dialog */}

The Claude Code command has this form:

```bash
claude mcp add --transport http nowa "<MCP Server URL>"
```

The URL stays the same, so you only set up your agent once.

:::warning
The URL contains a secret token and gives access to your projects. Keep it out of shared configs.
:::

Nowa listens only on your own computer, so your agent has to run on the same machine. The connection works only while the desktop app is open.

## What your agent can do

Your agent gets Nowa's building rules when it connects, so its changes fit the visual editor.

| Group | Tools | What your agent can do |
|---|---|---|
| Projects | `list_projects`, `open_project`, `current_project` | List your local and cloud projects (cloud projects need you signed in), open one in the Nowa window, and check which one is open. Switching saves the open project first. |
| Orientation | `get_project_overview`, `get_guidelines`, `get_theme` | Read your screens and components, the home screen, the theme, your public declarations, your **Custom Instructions**, the problem counts, what is open and selected, and Nowa's building rules. |
| Board | `get_selection`, `get_widget_tree`, `open_in_canvas`, `screenshot`, `save_project` | See what you selected, read the widget tree, show a screen or widget on your board, take a screenshot, and save. A screenshot also reports build errors, overflows and placeholders. Saving restarts the Nowa Run preview if it is running. |
| Setup | `set_permissions`, `add_image_assets` | Add or remove app permissions, the way the **Permissions** panel does. Add images from links or local files to `assets/images/` and register them. PNG, JPG, GIF, WebP, BMP and SVG work, up to 20 images per call and 20 MB each. |
| Editing | `read_file_content`, `inspect`, `list_project_files`, `search_code`, `grep_files`, `write_top_level_code`, `write_class_member`, `remove_declaration`, `replace_expression`, `edit`, `write`, `analyze`, `read_logs`, `packages`, `download_font`, `model_generation_instructions` | The same tools Nowa AI uses: read and search your code, create and change screens, components, models and functions, edit other files, check problems and logs, manage packages and add Google fonts. |

Give `add_image_assets` image links, such as the ones your agent gets from Figma's own MCP, and Nowa downloads the images for you.

Some safeguards keep your app working:

- Code that doesn't parse is refused instead of saved.
- An edit can't land on the wrong widget if the design changed in the meantime.
- Direct edits to `Info.plist` and `AndroidManifest.xml` are refused, because Nowa generates them from your settings. Your agent uses `set_permissions` instead.
- Calls run one at a time. Opening a project gives up after 3 minutes.

Some parts of Nowa AI's chat aren't available to a connected agent: tasks, clarifying questions, suggested next steps, bug reports, saving chat attachments and API generation from cURL.

## If the dialog says the server isn't running

The dialog then says "The server is not running. Port 4680 may be in use; free it and restart Nowa." Close the program that uses port 4680, then restart Nowa.

## Next steps

- [Install the desktop app](../get-started/desktop-app.md)
- [Custom Instructions](prompting.md#custom-instructions): your connected agent receives them too
- [Connect Figma and Supabase to Nowa AI](connectors.md)
