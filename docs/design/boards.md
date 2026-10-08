---
title: Work with boards
description: Create and switch boards, set the board color and grid, move around, and manage the screens, components and widgets on them.
sidebar_label: Boards
keywords: [board, design board, canvas, workspace, new board, rename board, delete board, board color, show grid, zoom, pan, toolbar, view only]
---

A board is your design surface: a large, free-form space where your screens, components and widgets sit side by side. Make as many boards as you like, for example one per flow.

## Create, switch and manage boards

1. Click the board chip in the top bar. It shows the name of the current board. The menu lists every board in your project.
2. Click a board to open it.
3. To make a new one, click **Create new board**, type a name and click **Submit**. The new board opens.
4. To rename or delete a board, hover its row and click the **Rename** or **Delete** icon.

When you create a board, Nowa turns the name you type into one word, so **Login flow** becomes `loginFlow`. Each board is saved as a `.board` file in the `boards` folder.

Deleting asks **Are you sure you want to delete "…"?** Click **Yes**. The screens and components that were on the board stay in your project. Loose widgets on it are deleted with the board.

You can also press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> to create a board. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd> jumps back to the board you were last on, and on a board it switches to the next one.

![The board menu open with two boards: first (hovered, showing the Rename and Delete buttons) and onboarding (the current board), with Create new board at the bottom.](/img/docs/design/design-boards-1.png)

## Set the board color and grid

1. Click empty space on the board so nothing is selected. **Details** shows the board's settings.
2. Turn on **Show Grid** for a dot grid, or pick a **Board Color**.
3. Click **Reset** to bring back the defaults (light gray, no grid).

Each board keeps its own settings. The grid is only a guide: widgets don't snap to it.

## Move around the board

| To | Do this |
|---|---|
| Pan | Scroll, or swipe with two fingers on a trackpad. Hold <kbd>Shift</kbd> while scrolling to pan sideways. |
| Pan with the mouse | Hold <kbd>Space</kbd> and drag, or drag with the middle mouse button. |
| Zoom | Hold <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and scroll, or pinch on a trackpad. It zooms where your pointer is. |
| Zoom to something | Select it and press <kbd>F</kbd>. Double-clicking its row in the [Outline](outline.md) does the same. |

There are no zoom buttons. Each board remembers its zoom and position on your device.

## Know your board items

Everything directly on a board is a board item: a screen, a component, or a loose widget such as a shape.

- **Title bar.** Screens and components have one above them. It shows the name, and a home icon on your home screen. Hover it to see **Play** and **Open in new tab**. Double-click it to rename the item.
- **Select and move.** Click the title to select the whole item, then drag it. <kbd>Shift</kbd> + click adds more items to the selection.
- **Place exactly.** With an item selected, type **X**, **Y**, **W** and **H** under **Layout** in **Details**.
- **Loose widgets** have no title bar. They're saved only in the board file, so they're not part of your app until you place them inside a screen.

![The board with two screens, SettingsPage and HomePage, and a loose gray shape. The HomePage title bar is highlighted: it shows the home icon, the Play button and the Open in new tab button.](/img/docs/design/design-boards-2.png)

**Play** runs the item on the board so you can tap through it. See [Play your app on the board](../test/instant-play.md). **Open in new tab** opens the screen or component on its own, in place of the board. Click the dimmed **Board** chip in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd>, to come back.

## Use the toolbar

The toolbar floats at the bottom of the board.

| Tool | Key | What it does |
|---|---|---|
| **Select tool** | <kbd>V</kbd> | Select, move and resize. |
| **Shape** | <kbd>R</kbd> | Draw a gray container. |
| **Screen** | none | Opens the template picker to create a screen. See [Create and set up screens](screens.md). |
| **Text** | <kbd>T</kbd> | Place a text. |
| **Widget** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> | Opens the widget picker. See [Add widgets](add-widgets.md). |

The **Screen** tool is hidden when a screen or component is open on its own. While something is playing, the toolbar gives way to the Play bar.

## Remove an item or delete it

- **Remove from the board.** Select the item (for a screen or component, click its title), then right-click it and choose **Remove**, or press <kbd>Delete</kbd> (<kbd>Backspace</kbd> on macOS). A screen or component stays in your project and in the **Widgets** panel, so you can drag it back. A loose widget is gone, but <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> brings it back.
- **Delete from the project.** In the **Widgets** panel, right-click the screen or component and choose **Delete**. See [Build reusable components](components.md#manage-screens-and-components).

## Big boards and errors

Big boards stay fast without any setup. Items in view build first, and only the item you hover, select or play animates. When more than 8 items are in or near view, the rest show as still pictures until you hover, select or play them.

If one item fails while drawing, only that item shows **This screen failed to render**, with the error text. The rest of the board keeps working. Fix the cause, in the code or by asking [Nowa AI](../ai/index.md), then click **Reload screen**.

## View-only boards

With the **View Only** role in a shared project you can browse, select, copy and export, but not edit. The toolbar shows **View only** instead of the tools. To copy a widget or export it as an image, right-click its row in the [Outline](outline.md) and choose **Copy** or **Export as image...**. See [Workspaces and team members](../account/workspaces.md).

## Next steps

- [Create and set up screens](screens.md): add a screen and choose your home screen.
- [Add widgets](add-widgets.md): fill a screen with the widget picker.
- [Play your app on the board](../test/instant-play.md): tap through a screen without leaving the editor.
