---
title: Tour the editor
description: Find your way around the Nowa editor, from the top bar and sidebar panels to the board, Details, status bar and help.
sidebar_label: Editor tour
keywords: [interface, editor, layout, explore interface, top bar, sidebar, panels, library, board, boards chip, back, forward, toolbar, Details, Variables, status bar, console, welcome tour, Nothing is open]
---

The editor is a handful of areas that always stay in the same place. Here is what each one does, with a link to the page that covers it in depth.

![The whole Nowa editor 3.13 with numbered callouts: 1 top bar (Back and Forward arrows, Boards chip), 2 sidebar (Assistant, Library, Themes, Search, Outline, Api, Supabase, Router), 3 side panel (the Library here), 4 board, 5 Variables and Details, 6 board toolbar, 7 status bar (v3.13.0-79), 8 support button.](/img/docs/get-started/get-started-editor-tour-1.png)

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
| Starting-point chip | Shown in the playground and in public projects you open as a guest. Switches to another starter app or a template. See [Try Nowa without an account](./playground.md). |
| Package chip | Appears only when a project has several packages. Picks the one you edit. |
| **Back** and **Forward** | Two arrows before the **Boards** chip. They step through the editors you opened, like a browser: <kbd>Ctrl</kbd> + <kbd>-</kbd> goes back and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd> goes forward (the Control key, also on a Mac). An arrow is greyed out when there is nowhere to go, and Nowa keeps your last 50 places. They aren't shown in code mode or while your app runs in the editor, but the keys still work. |
| **Boards** chip | Shows the current board's name, or **Boards** when you're not on a board. Click it, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd>, to open the list of boards with a **Search boards** field. Pick one, hover a row for **Rename** and **Delete**, or click **Create new board**. To leave a screen you opened on its own, click **Back** or pick a board. See [Work with boards](../design/boards.md). |
| Screen or component chip | Appears after the **Boards** chip when a screen or component is open on its own, and names it. If its file holds several views, click it to switch between them. |
| **Upgrade** | Shown when your account is on the free plan. See [Plans, billing and AI usage](../account/plans-and-usage.md). |
| Avatar | Opens your name and plan, **General Settings** and **Logout**. See [Account settings](../account/account-settings.md). |
| Bell | Opens **Notifications** from Nowa. |
| `<>` | Switches code mode on and off. See [Edit code in Nowa](../code/code-mode.md). |
| Gear | Opens **Settings**. See [Project settings](../account/project-settings.md). |
| **Run** and **Deploy** | **Run** runs your real app ([Run your app](../test/run.md)). **Deploy** publishes a cloud project ([Get ready to publish](../publish/index.md)). In the playground and for guests, **Save** replaces both. |

## Sidebar and panels

Click an icon to open its panel, and click it again to close it. You can also press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> plus the number in the table. The playground and public projects you open as a guest have no **Git** icon, so there the numbers after **Search** are one lower.

| Icon | What it opens | Number | Learn more |
|---|---|---|---|
| **Assistant** | **AI Assistant**: chat with Nowa AI. | 1 | [How Nowa AI works](../ai/index.md) |
| **Library** | Your screens, components, models and more, Nowa's built-in widgets, your packages' widgets and your assets. Search, add, open and drag them onto the board. | 2 | [Find and add things with the Library](../design/library.md) |
| **Themes** | Colors, text styles and widget styles for the whole app. | 3 | [Create and edit themes](../design/themes.md) |
| **Search** | Find text or symbols across the project, and replace text in bulk. | 4 | [Manage project files](../code/files.md) |
| **Git** | Changes, commits and branches. Not in the playground or for guests. | 5 | [Use Git](../code/git.md) |
| **Outline** | The widget tree of the board. On a screen open on its own, it floats at the top left of the screen instead and this icon is hidden. | 6 | [Use the Outline](../design/outline.md) |
| **Api** | REST API collections and requests. | 7 | [Connect a REST API](../integrations/rest-api/index.md) |
| **Supabase** | Connect and manage your Supabase backend. | 8 | [Connect Supabase](../integrations/supabase/connect.md) |
| **Router** | Below a divider. Opens your app's routes in the workspace. | none | [Set up routes in the Router panel](../logic/router.md) |

In code mode, **Files** (the folder icon) takes the Library's place: second in the strip, and also <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd>. It shows the whole project. See [Manage project files](../code/files.md).

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
| **Widget** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> | Opens the Library with its search ready to add a widget. |

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
- **Code mode:** `<>` switches to a code editor. The **Files** panel opens with the whole project tree in place of the Library, and each file you open gets a tab. Click **Back** to return to the board.

In code mode and in **Settings**, **Back** at the top left leaves that view. It isn't the **Back** arrow before the **Boards** chip, which steps through the editors you opened.

## The welcome tour {#welcome-tour}

**Welcome to Nowa!** appears over a new project until you finish or skip the tour once. Click **Take the quick tour** for seven short tooltips, or **Close** to skip it. It doesn't come back for your account after that.

| Tour step | What it points to |
|---|---|
| **The Design Board** | The board. |
| **Create Screen** | The **Screen** tool. |
| **Widget Palette** | The **Widget** tool. |
| **AI Agent** | The **Assistant** icon. |
| **Run your app** | The **Run** button. |
| **Data Sources** | The **Api** and **Supabase** icons. |
| **Screens & Components** | The **Library** icon. |

Use **Next**, **Back** or **Skip** while you tour. On the last tooltip, **Next** reads **Got it!** At the end, **You're all set!** offers **Explore more features** (three more steps: **Git**, **Project Settings** and **Themes**) or **Start building**.

## When nothing is open

If you close everything, or open a project in safe mode, the workspace says **Nothing is open**. Click **Open board**, **Browse widgets** or **Open code mode** to continue. **Browse widgets** opens the [Library](../design/library.md).

## Next steps

- [Build your first app](./first-app.md): put the editor to work.
- [How designing works](../design/index.md): boards, screens, widgets and themes.
- [Keyboard shortcuts](../reference/shortcuts.md): every key in one place.
- [Glossary](../reference/glossary.md): what each Nowa term means.
