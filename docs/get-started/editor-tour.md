---
title: Tour the editor
description: Find your way around the Nowa editor, from the top bar and sidebar panels to the board, Details, status bar and help.
sidebar_label: Editor tour
keywords: [interface, editor, layout, explore interface, top bar, sidebar, panels, board, toolbar, Details, Variables, status bar, console, welcome tour, Nothing is open]
---

The editor is a handful of areas that always stay in the same place. This tour names each one, says what it does, and links to the page that covers it in depth.

![The whole Nowa editor with numbered callouts: 1 top bar, 2 sidebar, 3 side panel (AI Assistant), 4 board, 5 Variables and Details, 6 board toolbar, 7 status bar, 8 support button.](/img/docs/get-started/get-started-editor-tour-1.png)

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
| Nowa logo | Returns to the dashboard. If files are unsaved, Nowa lists them and asks first: **Cancel** stays, **Close** leaves without saving, and **Save and close** saves, then leaves. |
| Starting-point chip | Playground, and public projects you open as a guest. Switches to another starter app or a template. See [Try Nowa without an account](./playground.md). |
| Package chip | Appears only when a project has several packages. Picks the one you edit. |
| Board chip | Shows the current board. Click it to switch boards, **Rename** or **Delete** one, or **Create new board**. When a screen is open on its own, the chip is dimmed and takes you back to the board. See [Work with boards](../design/boards.md). |
| Screen or component chip | Appears after the board chip when a screen or component is open on its own, and names it. If its file holds several views, click it to switch between them. |
| **Upgrade** | Shown when your account is on the free plan. See [Plans, billing and AI usage](../account/plans-and-usage.md). |
| Avatar | Opens your name and plan, **General Settings** and **Logout**. See [Account settings](../account/account-settings.md). |
| Bell | Opens **Notifications** from Nowa. |
| `<>` | Switches code mode on and off. See [Edit code in Nowa](../code/code-mode.md). |
| Gear | Opens **Settings**. See [Project settings](../account/project-settings.md). |
| **Run** and **Deploy** | **Run** runs your real app ([Run your app](../test/run.md)). **Deploy** publishes a cloud project ([Get ready to publish](../publish/index.md)). In the playground and for guests, **Save** replaces both. |

## Sidebar and panels

Click an icon to open its panel. Click it again to close the panel. You can also press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> plus the number in the table. The playground has no **Git** icon, so there the numbers after **Search** are one lower.

| Icon | What it opens | Number | Learn more |
|---|---|---|---|
| **Assistant** | **AI Assistant**: chat with Nowa AI. | 1 | [How Nowa AI works](../ai/index.md) |
| **Widgets** | Your screens (**Page**) and components (**Component**). Search, open, and drag them onto the board. | 2 | [Build reusable components](../design/components.md) |
| **Themes** | Colors, text styles and widget styles for the whole app. | 3 | [Create and edit themes](../design/themes.md) |
| **Search** | Find text or symbols across the project, and replace text in bulk. | 4 | [Manage project files](../code/files.md) |
| **Git** | Changes, commits and branches. Not in the playground. | 5 | [Use Git](../code/git.md) |
| **Files** | Your project files: `lib`, `boards` and `assets`. | 6 | [Manage project files](../code/files.md) |
| **Outline** | The widget tree of the board. On a screen open on its own, it floats at the top left of the screen instead and this icon is hidden. | 7 | [Use the Outline](../design/outline.md) |
| **Api** | REST API collections and requests. | 8 | [Connect a REST API](../integrations/rest-api/index.md) |
| **Supabase** | Connect and manage your Supabase backend. | 9 | [Connect Supabase](../integrations/supabase/connect.md) |
| **Router** | Below a divider. Opens your app's routes in the workspace. | none | [Navigate between screens](../logic/navigation.md) |

At the bottom of the strip, **Shortcuts** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>.</kbd>) opens a cheat sheet, and **Enter Fullscreen** appears in the web app only. It reads **Exit Fullscreen** while the editor is fullscreen. See [Keyboard shortcuts](../reference/shortcuts.md) for the full list.

## Board and toolbar

The board holds your screens, components and loose widgets side by side. Scroll to pan. Hold <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and scroll, or pinch, to zoom. Select something and press <kbd>F</kbd> to zoom to it.

Each screen and component has a title bar. Point at it to get **Play** and **Open in new tab**. The home screen has a home icon.

| Tool | Key | What it does |
|---|---|---|
| **Select tool** | <kbd>V</kbd> | Select and move things. |
| **Shape** | <kbd>R</kbd> | Draws a box (a Container). |
| **Screen** | | Creates a screen from a template. Not shown while a screen is open on its own. |
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
- The Save button. Click it for **Save options**: **Auto save**, **Save every** (**10 seconds**, **20 seconds**, **30 seconds**, **1 minute** or **5 minutes**) and **Save now**.

**Problems** lists issues Nowa finds in your project, with a **Fix** button for some. **Logs** shows messages from Nowa and from your running app. See [Find and fix problems](../test/problems.md).

## Resize and close panels

- **Side panel:** drag the divider between it and the board to resize it. Click its sidebar icon again to close it.
- **Bottom panel:** an API request, a Supabase function test and a Git commit's details open in a panel docked below the board. Drag its top divider to resize it, and click **×** to close it.
- **Floating panels:** the **Console** and **Action History** (see [Undo and redo](../design/select-and-edit.md#undo-and-redo)) float over the editor. Drag the title bar to move one, drag an edge or corner to resize it, and click **×** to close it.

## Help, settings and code mode

- **Help:** the **?** button opens the support panel with **Your tickets**, **Report an issue**, **Chat with support**, **Documentation**, **YouTube Channel** and **Hire an Expert**. See [Get help](../account/help.md).
- **Settings:** the gear (or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>) opens **Settings** over the editor, with **General** pages such as **Project Details**, **Packages** and **Constants**, and **Integrations** pages. Click **Back** to return.
- **Code mode:** `<>` switches to a code editor. The **Files** panel opens with the whole project tree, and each file you open gets a tab. Click **Back** to return to the board.

## The welcome tour {#welcome-tour}

**Welcome to Nowa!** appears over a new project until you have finished or skipped the tour once. Click **Take the quick tour** for seven short tooltips, or **Close** to skip it. After that it doesn't come back for your account.

| Tour step | What it points to |
|---|---|
| **The Design Board** | The board. |
| **Create Screen** | The **Screen** tool. |
| **Widget Palette** | The **Widget** tool. |
| **AI Agent** | The **Assistant** icon. |
| **Run your app** | The **Run** button. |
| **Data Sources** | The **Api** and **Supabase** icons. |
| **Screens & Components** | The **Widgets** icon. |

Use **Next**, **Back** or **Skip** while you tour. On the last tooltip, **Next** reads **Got it!** At the end, **You're all set!** offers **Explore more features** (three more steps: **Git**, **Project Settings** and **Themes**) or **Start building**.

## When nothing is open

If you close everything, or open a project in safe mode, the workspace says **Nothing is open**. Click **Open board**, **Browse widgets** or **Open code mode** to continue.

## Next steps

- [Build your first app](./first-app.md): put the editor to work.
- [How designing works](../design/index.md): boards, screens, widgets and themes.
- [Keyboard shortcuts](../reference/shortcuts.md): every key in one place.
