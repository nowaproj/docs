---
title: Work with boards
description: Create and switch boards, set the board color and grid, move around, and manage the screens, components and widgets on them.
sidebar_label: Boards
keywords: [board, design board, canvas, workspace, new board, rename board, delete board, boards chip, search boards, board picker, back, forward, board color, show grid, zoom, pan, toolbar, view only]
---

A board is your design surface: a large, free-form space where your screens, components and widgets sit side by side. Make as many boards as you like, for example one per flow.

## Create, switch and manage boards

1. Click the **Boards** chip in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd>. The chip shows the name of the current board, or **Boards** when you're not on a board. The list shows every board in your project, including boards in subfolders of `boards`, whether you have opened them or not.
2. Click a board to open it. To find one, type in **Search boards**, then use the arrow keys and press <kbd>Enter</kbd>.
3. To make a new one, click **Create new board**, type a name and click **Submit**. The new board opens.
4. To rename or delete a board, hover its row and click the **Rename** or **Delete** icon.

When you create a board, Nowa writes the name in snake_case, so **Login flow** becomes `login_flow`. Each board is saved as a `.board` file in the `boards` folder, here `login_flow.board`.

Deleting asks **Are you sure you want to delete "…"?** Click **Yes**. The screens and components that were on the board stay in your project. Loose widgets on it are deleted with the board.

You can also press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> to create a board. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd> opens the list with the search ready. The chip isn't there in code mode or while your app runs in the editor, so the key does nothing then.

![The Boards list open: the Search boards field at the top, two boards (one hovered, showing the Rename and Delete buttons, and the current board marked) and Create new board at the bottom.](/img/docs/design/design-boards-1.png)

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
- **Frame.** An item ends at its frame. Overflow, error boxes and blurs don't paint over the items around it.

![The board with two screens, SettingsPage and HomePage, and a loose gray shape. The HomePage title bar is highlighted: it shows the home icon, the Play button and the Open in new tab button.](/img/docs/design/design-boards-2.png)

**Play** runs the item on the board so you can tap through it. See [Play your app on the board](../test/instant-play.md). **Open in new tab** opens the screen or component on its own, in place of the board. To come back, click **Back** in the top bar or press <kbd>Ctrl</kbd> + <kbd>-</kbd> (the Control key, also on a Mac). You can also open the **Boards** chip and pick the board.

## Use the toolbar

The toolbar floats at the bottom of the board.

| Tool | Key | What it does |
|---|---|---|
| **Select tool** | <kbd>V</kbd> | Select, move and resize. |
| **Shape** | <kbd>R</kbd> | Draw a gray container. |
| **Screen** | none | Opens the template picker to create a screen. See [Create and set up screens](screens.md). |
| **Text** | <kbd>T</kbd> | Place a text. |
| **Widget** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> | Opens the Library to add a widget. See [Add widgets](add-widgets.md). |

The **Screen** tool is hidden when a screen or component is open on its own. While something is playing, the toolbar gives way to the Play bar.

## Remove an item or delete it

- **Remove from the board.** Select the item (for a screen or component, click its title), then right-click it and choose **Remove**, or press <kbd>Delete</kbd> (<kbd>Backspace</kbd> on macOS). A screen or component stays in your project and in the **Library**, so you can drag it back. A loose widget is gone, but <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> brings it back.
- **Delete from the project.** In the [Library](library.md), right-click the screen or component and choose **Delete**. Click **Yes** to confirm. If something uses it, Nowa lists the places and asks again. See [Build reusable components](components.md#manage-screens-and-components).

## Big boards and errors

Big boards stay fast without any setup. Items in view build first, and only the item you hover, select or play animates. When more than 8 items are in or near view, the rest show as still pictures until you hover, select or play them.

If one item fails while drawing, only that item shows **This screen failed to render**, with the error text. The rest of the board keeps working. Fix the cause, in the code or by asking [Nowa AI](../ai/index.md), then click **Reload screen**.

## View-only boards

With the **View Only** role in a shared project you can browse, select, copy and export, but not edit. The toolbar shows **View only** instead of the tools. To copy a widget or export it as an image, right-click its row in the [Outline](outline.md) and choose **Copy** or **Export as image...**. See [Workspaces and team members](../account/workspaces.md).

## Next steps

- [Create and set up screens](screens.md): add a screen and choose your home screen.
- [Add widgets](add-widgets.md): fill a screen from the Library.
- [Play your app on the board](../test/instant-play.md): tap through a screen without leaving the editor.
