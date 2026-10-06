---
title: Tour the editor
description: Find your way around the Nowa editor, from the top bar and sidebar panels to the board, Details, status bar and help.
sidebar_label: Editor tour
keywords: [interface, editor, layout, explore interface, top bar, sidebar, panels, board, toolbar, Details, Variables, status bar, console, welcome tour, Nothing is open]
---

The editor is a handful of areas that always stay in the same place. This tour names each one, says what it does, and links to the page that covers it in depth.

{/* CAPTURE: id=get-started-editor-tour-1 | state: /playground starter app open, AI Assistant panel open, nothing selected on the board, 1440x900 window | show: the whole editor with numbered callouts matching the list below (1 top bar, 2 sidebar, 3 side panel, 4 board, 5 Variables and Details, 6 board toolbar, 7 status bar, 8 support button) | crop: full window */}

## The layout at a glance

1. **Top bar**: where you are, plus the main actions (**Run**, **Deploy**, **Settings**).
2. **Sidebar**: a strip of icons on the left. Each icon opens a panel.
3. **Side panel**: the panel you opened. **AI Assistant** is open by default.
4. **Board**: the large area in the middle, where your screens, components and widgets sit.
5. **Variables** and **Details**: two floating panels at the top right of the board.
6. **Board toolbar**: the tools at the bottom of the board.
7. **Status bar**: the strip along the bottom edge.
8. **Support button**: the round **?** at the bottom right.

## Top bar

| Control | What it does |
|---|---|
| Nowa logo | Returns to the dashboard. If files are unsaved, Nowa asks first. |
| Starting-point chip | Playground only. Switches the starter app. See [Try Nowa without an account](./playground.md). |
| Package chip | Appears only when a project has several packages. Picks the one you edit. |
| Board chip | Shows the current board. Click it to switch boards, **Rename** or **Delete** one, or **Create new board**. See [Work with boards](../design/boards.md). |
| View chip | When a screen is open on its own, switches between its design and its code. |
| **Upgrade** | Shown when your account is on the free plan. See [Plans, billing and AI usage](../account/plans-and-usage.md). |
| Avatar | Opens your name and plan, **General Settings** and **Logout**. See [Account settings](../account/account-settings.md). |
| Bell | Opens **Notifications** from Nowa. |
| `<>` | Switches code mode on and off. See [Edit code in Nowa](../code/code-mode.md). |
| Gear | Opens **Settings**. See [Project settings](../account/project-settings.md). |
| **Run** and **Deploy** | **Run** runs your real app ([Run your app](../test/run.md)). **Deploy** publishes it ([Get ready to publish](../publish/index.md)). In the playground, **Save** replaces both. |

## Sidebar and panels

Click an icon to open its panel. Click it again to close the panel. You can also press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> plus the number in the table.

| Icon | What it opens | Number | Learn more |
|---|---|---|---|
| **Assistant** | **AI Assistant**: chat with Nowa AI. | 1 | [How Nowa AI works](../ai/index.md) |
| **Widgets** | Your screens (**Page**) and components (**Component**). Search, open, and drag them onto the board. | 2 | [Build reusable components](../design/components.md) |
| **Themes** | Colors, text styles and widget styles for the whole app. | 3 | [Create and edit themes](../design/themes.md) |
| **Search** | Find text or symbols across the project, and replace text in bulk. | 4 | [Manage project files](../code/files.md) |
| **Git** | Changes, commits and branches. Not in the playground. | 5 | [Use Git](../code/git.md) |
| **Files** | Your project files: `lib`, `boards` and `assets`. | 6 | [Manage project files](../code/files.md) |
| **Outline** | The widget tree of the board or the open screen. | 7 | [Use the Outline](../design/outline.md) |
| **Api** | REST API collections and requests. | 8 | [Connect a REST API](../integrations/rest-api/index.md) |
| **Supabase** | Connect and manage your Supabase backend. | 9 | [Connect Supabase](../integrations/supabase/connect.md) |
| **Router** | Below a divider. Opens your app's routes in the workspace. | none | [Navigate between screens](../logic/navigation.md) |

At the bottom of the strip, **Shortcuts** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>.</kbd>) opens a cheat sheet, and **Enter Fullscreen** appears in the web app only. See [Keyboard shortcuts](../reference/shortcuts.md) for the full list.

## Board and toolbar

The board holds your screens, components and loose widgets side by side. Scroll to pan. Hold <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and scroll, or pinch, to zoom. Select something and press <kbd>F</kbd> to zoom to it.

Each screen and component has a title bar. Point at it to get **Play** and **Open in new tab**. The home screen has a home icon.

| Tool | Key | What it does |
|---|---|---|
| **Select tool** | <kbd>V</kbd> | Select and move things. |
| **Shape** | <kbd>R</kbd> | Draws a box (a Container). |
| **Screen** | | Creates a screen from a template. |
| **Text** | <kbd>T</kbd> | Places a text. |
| **Widget** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> | Opens the widget picker. |

See [Add widgets](../design/add-widgets.md) and [Select, move and resize](../design/select-and-edit.md).

## Details and Variables

**Details** shows the properties of whatever you select: its position and size under **Layout**, then the widget's own settings. With nothing selected, it shows board settings: **Show Grid**, **Board Color** and **Reset**. See [Change widget properties](../design/properties.md).

**Variables** is collapsed until you click it. It lists the **Params**, **Variables** and **Functions** of the selected screen or component, and **Globals** when nothing is selected. See [Store data in variables](../logic/variables.md).

Both panels hide when the board area is narrower than 600 px. Widen the window or close the side panel to bring them back.

## Status bar and Console

From left to right, the status bar shows:

- The project name. Click it to see and copy the project ID.
- The Nowa version.
- Counts of errors, warnings and info messages. Click them to open the **Console** on **Problems**.
- The latest log line, or **Ready**. Click it to open the **Console** on **Logs**.
- Loading progress while files load, and the Git branch with its ahead and behind counts.
- The Save button. Click it for **Save options**: **Auto save**, **Save every** and **Save now**.

**Problems** lists issues Nowa finds in your project, with a **Fix** button for some. **Logs** shows messages from Nowa and from your running app. See [Find and fix problems](../test/problems.md).

## Help, settings and code mode

- **Help:** the **?** button opens the support panel with **Your tickets**, **Report an issue**, **Chat with support**, **Documentation**, **YouTube Channel** and **Hire an Expert**. See [Get help](../account/help.md).
- **Settings:** the gear (or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>) opens **Settings** over the editor, with **General** pages such as **Project Details**, **Packages** and **Constants**, and **Integrations** pages. Click **Back** to return.
- **Code mode:** `<>` opens the **Files** panel and shows every project file as a tab in a code editor. Click **Back** to return to the board.

## The welcome tour {#welcome-tour}

The first time you open a new project, **Welcome to Nowa!** appears. Click **Take the quick tour** for seven short tooltips, or **Close** to skip the tour. The tour appears once for your account.

| Tour step | What it points to |
|---|---|
| **The Design Board** | The board. |
| **Create Screen** | The **Screen** tool. |
| **Widget Palette** | The **Widget** tool. |
| **AI Agent** | The **Assistant** icon. |
| **Run your app** | The **Run** button. |
| **Data Sources** | The **Api** and **Supabase** icons. |
| **Screens & Components** | The **Widgets** icon. |

Use **Next**, **Back** or **Skip** while you tour. At the end, **You're all set!** offers **Explore more features** (three more steps: **Git**, **Project Settings** and **Themes**) or **Start building**.

## When nothing is open

If you close everything, or open a project in safe mode, the workspace says **Nothing is open**. Click **Open board**, **Browse widgets** or **Open code mode** to continue.

## Next steps

- [Build your first app](./first-app.md): put the editor to work.
- [How designing works](../design/index.md): boards, screens, widgets and themes.
- [Keyboard shortcuts](../reference/shortcuts.md): every key in one place.
