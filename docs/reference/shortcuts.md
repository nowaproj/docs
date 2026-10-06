---
title: Keyboard shortcuts
description: The keyboard shortcuts and mouse gestures of the Nowa editor, with the keys for Windows, Linux and macOS.
keywords: [keyboard shortcuts, hotkeys, key bindings, cheat sheet, shortcuts sheet, undo, redo, copy, paste, duplicate, delete, zoom, pan, group, layer order, bring to front, widget picker, run, save, Ctrl, Cmd, Option, Alt, Mac, Windows, Linux]
---

Keep your hands on the keyboard while you build: add a widget, group a few, run your app or undo a mistake without reaching for the mouse. This page lists the editor's shortcuts, grouped by where you use them.

Most shortcuts use <kbd>Ctrl</kbd> on Windows and Linux and <kbd>Cmd</kbd> on macOS, so every table shows both. On a Mac, the app writes <kbd>Cmd</kbd> as ⌘, <kbd>Option</kbd> as ⌥, <kbd>Control</kbd> as ⌃ and <kbd>Shift</kbd> as ⇧. You can't change the shortcuts.

:::tip
Hover a board tool or a sidebar icon, or open a right-click menu, to see its shortcut next to the name.
:::

## Open the Shortcuts sheet

The editor has a built-in cheat sheet with common shortcuts.

1. Click the keyboard icon (**Shortcuts**) at the bottom of the left sidebar, or press <kbd>Ctrl</kbd> + <kbd>.</kbd> (<kbd>Cmd</kbd> + <kbd>.</kbd> on macOS). The sheet opens over the editor.
2. Close it with the same keys, the close button, <kbd>Esc</kbd> or a click outside the sheet.

The sheet shows its shortcuts in four groups, **General**, **Tab Actions**, **Widgets** and **Designer**, and leaves out many that are on this page. In the current release (3.12.5), four entries show keys that don't match what the keys do:

| Sheet entry | The sheet shows | What happens |
|---|---|---|
| **Open widget picker** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> opens the widget picker. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> runs your app in the **Embedded preview**. |
| **Show/Hide panels** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>&#92;</kbd> | Nothing. To open or close a sidebar panel, use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and a number, as in [Sidebar panels](#sidebar-panels). |
| **Group/Ungroup** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> | It only groups. To ungroup, right-click the group and choose **Ungroup**. |
| **Bring to front** and **Bring to back** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>]</kbd> and <kbd>[</kbd> | Each press moves the widget one step, not all the way. To go all the way, right-click and choose **Move To Top** or **Move To Bottom**. |

The right-click menu has a similar slip: **Move Up** and **Move Down** both show <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>]</kbd>. The real keys are <kbd>[</kbd> for **Move Up** and <kbd>]</kbd> for **Move Down**.

## General

These work anywhere in the project editor.

| Action | Windows / Linux | macOS |
|---|---|---|
| Save (shows **Saved!**) | <kbd>Ctrl</kbd> + <kbd>S</kbd> | <kbd>Cmd</kbd> + <kbd>S</kbd> |
| Undo | <kbd>Ctrl</kbd> + <kbd>Z</kbd> | <kbd>Cmd</kbd> + <kbd>Z</kbd> |
| Redo | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd> + <kbd>Y</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Cmd</kbd> + <kbd>Y</kbd> |
| Open **Action History** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> |
| Copy the selected widgets | <kbd>Ctrl</kbd> + <kbd>C</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> |
| Cut the selected widgets | <kbd>Ctrl</kbd> + <kbd>X</kbd> | <kbd>Cmd</kbd> + <kbd>X</kbd> |
| Paste widgets you copied, or an image or text from another app | <kbd>Ctrl</kbd> + <kbd>V</kbd> | <kbd>Cmd</kbd> + <kbd>V</kbd> |
| Remove the selection (widgets, files, screens, components, routes) | <kbd>Delete</kbd> | <kbd>Backspace</kbd> (⌫) |
| Search for a file | <kbd>Ctrl</kbd> + <kbd>O</kbd> | <kbd>Cmd</kbd> + <kbd>O</kbd> |
| Open **Settings** | <kbd>Ctrl</kbd> + <kbd>,</kbd> | <kbd>Cmd</kbd> + <kbd>,</kbd> |
| Show or hide the Shortcuts sheet | <kbd>Ctrl</kbd> + <kbd>.</kbd> | <kbd>Cmd</kbd> + <kbd>.</kbd> |
| Go to the board, or to the next board when you're already on one | <kbd>Ctrl</kbd> + <kbd>B</kbd> | <kbd>Cmd</kbd> + <kbd>B</kbd> |

Undo and Redo work on the area you're in, and each area keeps its own history: every board or open screen, **Files**, **Widgets**, **Themes**, the **Router** editor and **Circuit**. **Action History** lists the changes of that area. Click an entry to go back to it.

## Sidebar panels

Press <kbd>Ctrl</kbd> (<kbd>Cmd</kbd> on macOS) and a number to open a panel. Press the keys again to close it.

| Panel | Windows / Linux | macOS |
|---|---|---|
| **Assistant** | <kbd>Ctrl</kbd> + <kbd>1</kbd> | <kbd>Cmd</kbd> + <kbd>1</kbd> |
| **Widgets** | <kbd>Ctrl</kbd> + <kbd>2</kbd> | <kbd>Cmd</kbd> + <kbd>2</kbd> |
| **Themes** | <kbd>Ctrl</kbd> + <kbd>3</kbd> | <kbd>Cmd</kbd> + <kbd>3</kbd> |
| **Search** | <kbd>Ctrl</kbd> + <kbd>4</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | <kbd>Cmd</kbd> + <kbd>4</kbd> or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> |
| **Git** | <kbd>Ctrl</kbd> + <kbd>5</kbd> | <kbd>Cmd</kbd> + <kbd>5</kbd> |
| **Files** | <kbd>Ctrl</kbd> + <kbd>6</kbd> | <kbd>Cmd</kbd> + <kbd>6</kbd> |
| **Outline** | <kbd>Ctrl</kbd> + <kbd>7</kbd> | <kbd>Cmd</kbd> + <kbd>7</kbd> |
| **Api** | <kbd>Ctrl</kbd> + <kbd>8</kbd> | <kbd>Cmd</kbd> + <kbd>8</kbd> |
| **Supabase** | <kbd>Ctrl</kbd> + <kbd>9</kbd> | <kbd>Cmd</kbd> + <kbd>9</kbd> |

**Router** has no shortcut. In the playground, and in a public project you open as a guest, there's no **Git** panel, so the panels after **Search** move up one number.

## Design on the board

These work on a board and on a screen or component opened on its own. See [Select, move and resize](../design/select-and-edit.md) and [Add widgets](../design/add-widgets.md) for what they do.

| Action | Windows / Linux | macOS |
|---|---|---|
| Open the widget picker (**Search for a widget**) | <kbd>Ctrl</kbd> + <kbd>K</kbd> | <kbd>Cmd</kbd> + <kbd>K</kbd> |
| Switch to the **Select tool** | <kbd>V</kbd> | <kbd>V</kbd> |
| Switch to the **Shape** tool (draws a Container) | <kbd>R</kbd> | <kbd>R</kbd> |
| Switch to the **Text** tool | <kbd>T</kbd> | <kbd>T</kbd> |
| Select all the widgets next to the selected one, or all board items when nothing is selected | <kbd>Ctrl</kbd> + <kbd>A</kbd> | <kbd>Cmd</kbd> + <kbd>A</kbd> |
| Zoom the board to the selection | <kbd>F</kbd> | <kbd>F</kbd> |
| Group the selected widgets | <kbd>Ctrl</kbd> + <kbd>G</kbd> | <kbd>Cmd</kbd> + <kbd>G</kbd> |
| Move the selected widget one step later in its parent (**Move Down**) | <kbd>Ctrl</kbd> + <kbd>]</kbd> | <kbd>Cmd</kbd> + <kbd>]</kbd> |
| Move the selected widget one step earlier in its parent (**Move Up**) | <kbd>Ctrl</kbd> + <kbd>[</kbd> | <kbd>Cmd</kbd> + <kbd>[</kbd> |
| Nudge a freely positioned widget (in a Stack, or on the board) by 1 px | <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd> | <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd> |
| Nudge by 10 px | <kbd>Shift</kbd> + an arrow key | <kbd>Shift</kbd> + an arrow key |
| Move a widget one place inside a Row (<kbd>←</kbd> <kbd>→</kbd>) or a Column (<kbd>↑</kbd> <kbd>↓</kbd>) | an arrow key | an arrow key |
| Open the screen or component that holds the selection on its own | <kbd>Ctrl</kbd> + <kbd>I</kbd> | <kbd>Cmd</kbd> + <kbd>I</kbd> |
| Create a board (opens **New Board**) | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> |
| Finish editing text on the board | <kbd>Esc</kbd> | <kbd>Esc</kbd> |

In a Stack, later widgets are drawn in front, so <kbd>]</kbd> brings a widget forward and <kbd>[</kbd> sends it back. To ungroup, right-click the group and choose **Ungroup**.

## Mouse and trackpad

| Action | Windows / Linux | macOS |
|---|---|---|
| Pan the board | Scroll, or swipe with two fingers | Scroll, or swipe with two fingers |
| Pan sideways | <kbd>Shift</kbd> + scroll | <kbd>Shift</kbd> + scroll |
| Pan by dragging | Hold <kbd>Space</kbd> and drag, or drag with the middle mouse button | Hold <kbd>Space</kbd> and drag, or drag with the middle mouse button |
| Zoom toward the pointer | <kbd>Ctrl</kbd> + scroll, or pinch on a trackpad | <kbd>Cmd</kbd> + scroll, or pinch on a trackpad |
| Select several items | Drag a box on an empty part of the board | Drag a box on an empty part of the board |
| Add to the selection (board, **Outline**, screen and component titles) | <kbd>Shift</kbd> + click | <kbd>Shift</kbd> + click |
| Select a range in **Widgets** or **Files** | <kbd>Shift</kbd> + click | <kbd>Shift</kbd> + click |
| Add or remove one item in **Widgets** or **Files** | <kbd>Ctrl</kbd> + click | <kbd>Cmd</kbd> + click |
| Select the innermost widget under the pointer | <kbd>Ctrl</kbd> + click | <kbd>Cmd</kbd> + click |
| Select the widget inside the selected one, or edit a Text widget's text | Double-click | Double-click |
| Zoom the board to a widget | Double-click it in **Outline** | Double-click it in **Outline** |
| Rename a screen or component | Double-click its title, type, press <kbd>Enter</kbd> | Double-click its title, type, press <kbd>Enter</kbd> |
| Move along one axis only | Hold <kbd>Shift</kbd> while dragging | Hold <kbd>Shift</kbd> while dragging |
| Drag a copy of the selection | Hold <kbd>Alt</kbd> while dragging | Hold <kbd>Option</kbd> while dragging |
| Keep the proportions while resizing, or while drawing with **Shape** or **Text** | Hold <kbd>Shift</kbd> | Hold <kbd>Shift</kbd> |
| Resize or draw from the center | Hold <kbd>Alt</kbd> | Hold <kbd>Option</kbd> |
| Close a tab in code mode | Middle-click the tab | Middle-click the tab |

Snapping is off while you hold <kbd>Shift</kbd> or <kbd>Alt</kbd>/<kbd>Option</kbd> to resize. For more on panning and zooming, see [Work with boards](../design/boards.md).

## Run your app

| Action | Windows / Linux | macOS |
|---|---|---|
| Run your app in the **Embedded preview** (from a board or an open screen or component) | <kbd>Ctrl</kbd> + <kbd>P</kbd> | <kbd>Cmd</kbd> + <kbd>P</kbd> |
| Restart the app while the **Embedded preview** is open | <kbd>Shift</kbd> + <kbd>R</kbd> | <kbd>Shift</kbd> + <kbd>R</kbd> |
| Show the app fullscreen while the **Embedded preview** is open | <kbd>Ctrl</kbd> + <kbd>F</kbd> | <kbd>Cmd</kbd> + <kbd>F</kbd> |

The restart key does what the restart button in the top bar does: **Hot Reload** in local projects, **Hot Restart** in cloud projects. Instant **Play** has no shortcut: hover a screen's title and click **Play**. See [Run your app](../test/run.md) and [Play your app on the board](../test/instant-play.md).

## Chat with Nowa AI

These work in the chat field of the **Assistant** panel. See [Chat with Nowa AI](../ai/chat.md) and [Give Nowa AI context](../ai/context.md).

| Action | Windows / Linux | macOS |
|---|---|---|
| Send your message | <kbd>Enter</kbd> | <kbd>Return</kbd> |
| Add a new line | <kbd>Shift</kbd> + <kbd>Enter</kbd> or <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | <kbd>Shift</kbd> + <kbd>Return</kbd> or <kbd>Cmd</kbd> + <kbd>Return</kbd> |
| Delete the previous word | <kbd>Alt</kbd> + <kbd>Backspace</kbd> | <kbd>Option</kbd> + <kbd>Backspace</kbd> (⌫) |
| Paste text or an image | <kbd>Ctrl</kbd> + <kbd>V</kbd> | <kbd>Cmd</kbd> + <kbd>V</kbd> |
| Mention a screen or component: type <kbd>@</kbd>, choose with <kbd>↑</kbd> <kbd>↓</kbd>, insert with <kbd>Enter</kbd> | <kbd>Esc</kbd> closes the list | <kbd>Esc</kbd> closes the list |

## Pickers

Pickers are the search lists that open in the middle of the editor: **Search for a file**, the widget picker, the template picker and **Add context** in the AI chat. Type to filter the list, then use these keys.

| Action | Windows / Linux | macOS |
|---|---|---|
| Move through the results | <kbd>↑</kbd> <kbd>↓</kbd> | <kbd>↑</kbd> <kbd>↓</kbd> |
| Choose the highlighted result | <kbd>Enter</kbd> | <kbd>Return</kbd> |
| Go back one step (when the footer shows **to cancel selected action**) | <kbd>Backspace</kbd> | <kbd>Backspace</kbd> (⌫) |
| Close the picker | <kbd>Esc</kbd> | <kbd>Esc</kbd> |

## Circuit

These work in the [Circuit](../logic/circuit.md) logic editor.

| Action | Windows / Linux | macOS |
|---|---|---|
| Select the previous or next node | <kbd>↑</kbd> <kbd>↓</kbd> | <kbd>↑</kbd> <kbd>↓</kbd> |
| Move the selected node up or down | <kbd>Shift</kbd> + <kbd>↑</kbd> or <kbd>↓</kbd> | <kbd>Shift</kbd> + <kbd>↑</kbd> or <kbd>↓</kbd> |
| Remove the selected node | <kbd>Backspace</kbd> (<kbd>Delete</kbd> works too) | <kbd>Backspace</kbd> (⌫) |
| Undo | <kbd>Ctrl</kbd> + <kbd>Z</kbd> | <kbd>Cmd</kbd> + <kbd>Z</kbd> |
| Redo | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd> + <kbd>Y</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Cmd</kbd> + <kbd>Y</kbd> |

## Tabs in code mode

In code mode, files open as tabs. See [Edit code in Nowa](../code/code-mode.md).

| Action | Windows / Linux | macOS |
|---|---|---|
| Open a new tab (one at a time) | <kbd>Ctrl</kbd> + <kbd>T</kbd> | <kbd>Cmd</kbd> + <kbd>T</kbd> |
| Go to the next tab | <kbd>Ctrl</kbd> + <kbd>Tab</kbd> | <kbd>Control</kbd> + <kbd>Tab</kbd> |
| Go to the previous tab | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> |
| Close the current tab | <kbd>Ctrl</kbd> + <kbd>W</kbd> | <kbd>Cmd</kbd> + <kbd>W</kbd> |

On macOS, the tab keys use <kbd>Control</kbd>, not <kbd>Cmd</kbd>. In the designer, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>W</kbd> closes the board or screen you're on and shows **Nothing is open**.

## Code editor

These work in the code editor in code mode.

| Action | Windows / Linux | macOS |
|---|---|---|
| Save | <kbd>Ctrl</kbd> + <kbd>S</kbd> | <kbd>Cmd</kbd> + <kbd>S</kbd> |
| Find | <kbd>Ctrl</kbd> + <kbd>F</kbd> | <kbd>Cmd</kbd> + <kbd>F</kbd> |
| Replace | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> | <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>F</kbd> |
| Turn match case (**Aa**) on or off in Find | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>C</kbd> | <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>C</kbd> |
| Turn regular expressions (`.*`) on or off in Find | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd> | <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>R</kbd> |
| Close Find | <kbd>Esc</kbd> | <kbd>Esc</kbd> |
| Comment or uncomment the line | <kbd>Ctrl</kbd> + <kbd>/</kbd> | <kbd>Cmd</kbd> + <kbd>/</kbd> |
| Comment or uncomment a block | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>/</kbd> | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>/</kbd> |
| Delete the line | <kbd>Ctrl</kbd> + <kbd>D</kbd> | <kbd>Cmd</kbd> + <kbd>D</kbd> |
| Select the line | <kbd>Ctrl</kbd> + <kbd>L</kbd> | <kbd>Cmd</kbd> + <kbd>L</kbd> |
| Move the line up or down | <kbd>Alt</kbd> + <kbd>↑</kbd> or <kbd>↓</kbd> | <kbd>Option</kbd> + <kbd>↑</kbd> or <kbd>↓</kbd> |
| Indent or outdent | <kbd>Tab</kbd> or <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Tab</kbd> or <kbd>Shift</kbd> + <kbd>Tab</kbd> |
| Go to the definition of a name (Dart files) | <kbd>Ctrl</kbd> + click | <kbd>Cmd</kbd> + click |

Select all, cut, copy, paste, undo, redo and moving the cursor by word or line work as in any text editor.

## When a shortcut does nothing

- **Focus.** Designer shortcuts work when the board has focus. Click the board or an item on it first.
- **Typing.** While you type in a field, the tool keys, arrow keys, select all, copy, cut, paste, undo, redo and remove are ignored, so they don't change your work.
- **Playing.** Designer shortcuts are off while an item plays on the board. Click **Stop**, then try again.
- **View only.** In a **View only** project only copy, the two tab-switching keys and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>W</kbd> work. Panning and zooming still work.
- **Open overlays.** <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd> and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> don't open while another overlay, such as the Shortcuts sheet or a picker, is open.
- **Browser.** A browser keeps some combinations for itself, such as <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>W</kbd>, so a few shortcuts may not reach the web app. Use the buttons instead.

## Next steps

- [Tour the editor](../get-started/editor-tour.md)
- [Select, move and resize](../design/select-and-edit.md)
- [Work with boards](../design/boards.md)
- [Edit code in Nowa](../code/code-mode.md)
