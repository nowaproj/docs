---
title: Select, move and resize
description: Select widgets, drag and resize them with snapping guides, and use copy, group, reorder, replace, export and undo.
sidebar_label: Select, move and resize
keywords: [select, selection, move, resize, snap, guides, group, ungroup, copy, paste, duplicate, reorder, move up, move down, replace with, export as image, remove, delete widget, undo, redo, action history, drop rules]
---

Click to select, drag to move, pull a handle to resize. Purple guides snap things into line, and every change can be undone.

## Select widgets

| To | Do this |
|---|---|
| Select a widget | Click it. A click picks the outermost widget under the pointer. To select a screen itself, click its title. |
| Go one level deeper | Double-click the selected widget. On a **Text**, this starts editing instead. |
| Pick the innermost widget | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + click. |
| Add or remove a widget | <kbd>Shift</kbd> + click, on the board or in the [Outline](outline.md). |
| Select with a box | Drag on empty space. Start on the board to select whole screens and components. Start inside a screen to select the widgets placed freely in its main **Stack** group. <kbd>Shift</kbd> toggles. |
| Select all | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd> selects the selected widget and its siblings. With nothing or a board item selected, it selects every board item. |
| Select a parent | Click its name in the breadcrumbs at the top of **Details**. |
| Clear the selection | Click empty board space. |

## Move widgets

- Drag a widget. You don't need to select it first.
- Hold <kbd>Shift</kbd> while dragging to move along one axis only.
- Hold <kbd>Alt</kbd>/<kbd>Option</kbd> while dragging to drag a copy instead. You can press or release the key mid-drag.
- Press an arrow key to nudge a free widget by 1 pixel, or <kbd>Shift</kbd> + arrow for 10. Free means placed in a **Stack** or directly on the board. In a **Row** or **Column**, the arrow along the layout direction moves the widget one place earlier or later.

Screens always stay board items, so you can't drop one inside another item. To type exact positions and sizes, see [Lay out widgets](layout.md).

## Where a dragged widget lands {#where-a-dragged-widget-lands}

What happens when you drop depends on what is under the pointer.

| Under the pointer | What happens |
|---|---|
| Empty board | The widget becomes its own board item and snaps to nearby items. |
| A **Stack** | It is placed where you drop it, on top of the others. The stack is outlined in purple. |
| A **Row**, **Column**, **Wrap** or **List View** | It is inserted between the children at the pointer. An orange box outlines the dragged widget. |
| A screen | An App Bar, Floating Action Button, Bottom Navigation Bar or Drawer goes into its slot. Anything else goes into the body. |
| An app bar | The left, middle and right zones fill the leading, title and actions. |
| A **Text** or a **Padding** | A text can't hold children, so the drop goes to the container behind it. **Padding** passes it to its child. |
| Any other widget, such as a **Container** | It doesn't take drops. The drop goes to whatever is behind it. To put a widget inside, use **+** in **Details**. |

A component can't be dropped into itself.

{/* CAPTURE: id=design-select-and-edit-1 | state: playground starter open, a screen with a Group set to Stack holding two widgets, drag one widget slowly across the other | show: moving a widget in a stack with the purple snap guides and the stack outline visible | crop: the board | type: mp4, 10-15 s, no audio */}

## Resize widgets

Select a widget and drag a corner handle, or an edge, to resize it. Hold <kbd>Shift</kbd> to keep the proportions. Hold <kbd>Alt</kbd>/<kbd>Option</kbd> to resize from the center. With several widgets selected, they resize together.

Some widgets have no handles, for example a widget placed directly inside a **Container** or **Padding**. Set their size in **Layout** instead. See [Lay out widgets](layout.md).

## Snapping and guides

While you move or resize, edges and centers snap to nearby items and purple guide lines show what lined up. Widgets in a **Stack** snap to the stack's edges, its center and their siblings. Board items snap to other board items. Hold <kbd>Shift</kbd> or <kbd>Alt</kbd> while resizing to skip snapping. Nothing snaps to the board's grid.

## Edit text on the board

Double-click a **Text**, **Markdown** or **Html** widget, or place one with the **Text** tool, and type. Press <kbd>Esc</kbd> or click away to save. Rich text is edited in **Details**. If the text comes from a variable, editing it here replaces that link with the text you typed. Undo brings the link back.

## Copy, cut and paste

Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, <kbd>X</kbd> or <kbd>V</kbd>. A widget's right-click menu has **Copy** and **Cut**, and the menu on empty board space has **Paste**. A paste lands at your pointer. With a widget selected, it goes into that widget's parent. For pasting images and text, see [Add widgets](add-widgets.md).

## Use the right-click menu {#use-the-right-click-menu}

Right-click a widget to act on it. An unselected widget is selected first.

| Entry | What it does |
|---|---|
| **Remove** | Takes the selected widgets out of your design. A screen or component only leaves the board and stays in your project. Key: <kbd>Delete</kbd>, or <kbd>Backspace</kbd> on macOS. |
| **Replace with...** | Opens the widget picker and swaps the widget for the one you pick. Nowa keeps its children and the properties the new widget also has. |
| **Group** | Puts the selected widgets into one group. Key: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd>. Inside a **Row**, **Column** or **Stack** the group matches its parent. Elsewhere it is a **Stack**. |
| **Ungroup** | Shows when one group is selected. It moves the children out and removes the group. The key only groups. It never ungroups. |
| **Move Up**, **Move Down** | Moves the widget one place earlier or later among its siblings. Keys: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>&#91;</kbd> for **Move Up**, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>&#93;</kbd> for **Move Down**. |
| **Move To Top**, **Move To Bottom** | Moves the widget to the first or last place. |
| **Export as image...** | Saves a widget or screen as a picture. |

Earlier means higher in a **Column**, further left in a **Row**, and further back in a **Stack**, where later widgets sit on top. The menu shows the same <kbd>&#93;</kbd> hint next to both **Move Up** and **Move Down**. The keys in the table are the real ones.

![The right-click menu of a selected Container (highlighted): Play, Remove, Replace with..., Group, Copy, Cut, Move Up, Move Down, Move To Top, Move To Bottom, Create component, Detach, Copy as new widget and Export as image..., with their shortcuts.](/img/docs/design/design-select-and-edit-2.png)

**Play**, **Create component**, **Detach** and **Copy as new widget** are covered in [Play your app on the board](../test/instant-play.md) and [Build reusable components](components.md). Right-click empty board space for **Undo**, **Redo**, **Save**, **Create a page** and **Paste**.

## Export as image

Right-click a widget or screen and choose **Export as image...**. Choose a **Format** (**PNG** or **JPG**) and a **Size** (**1x** to **4x**, or type a number), then click **Export** and choose where to save.

**Transparent background** is available for PNG. **Resolution** shows the picture size in pixels, and **Export** turns off if a side would pass 8192 pixels. Exporting also works with the **View Only** role.

## Undo and redo

Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> to undo. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Y</kbd> to redo. The board's right-click menu has **Undo** and **Redo** too. The keys do nothing while you type in a field.

Each area keeps its own history: every board, the **Widgets** panel, and a screen opened on its own. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> to open **Action History**. Click an entry to undo it and every later step. Dimmed entries are steps you undid. Click one to redo up to it.

:::tip Or ask Nowa AI
Select a widget, then type something like "Make this button full width with rounded corners." The selected widget is attached to your message automatically. See [Give Nowa AI context](../ai/context.md).
:::

## Next steps

- [Change widget properties](properties.md): edit what you selected in **Details**.
- [Lay out widgets](layout.md): rows, columns, stacks and sizes.
- [Use the Outline](outline.md): select any widget from the widget tree.
