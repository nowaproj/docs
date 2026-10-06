---
title: Use the Outline
description: See your design as a widget tree, jump to any widget, reorder widgets by dragging, and preview the branches of a condition.
sidebar_label: Outline
keywords: [outline, widget tree, layers, hierarchy, reorder, drag to reorder, conditions, branches, wrappers, home screen, select widget]
---

The Outline lists every widget on the board as a tree, like a table of contents for your design. Use it to find a widget fast, to select something hidden or hard to click, and to reorder widgets by dragging.

## Open the Outline

- **On a board:** click **Outline** in the left sidebar. Every screen, component and loose widget on the board is a top-level row.
- **On a screen or component opened on its own:** a floating **Outline** box sits at the top left of the board and is open by default. Click its title to collapse or expand it. The sidebar icon is hidden there.

{/* CAPTURE: id=design-outline-1 | state: playground starter open, drop a Button from the widget picker onto the screen, then add a Container with the Shape tool on the empty board, select the Button, open the Outline panel | show: the Outline panel with HomePage expanded: home icon, the appBar slot row, the selected Button row with the layers icon, and the loose Container row | crop: left panel */}

{/* CAPTURE: id=design-outline-2 | state: playground starter open, hover the home screen title on the board and click Open in new tab | show: the screen on its own with the floating Outline box at the top left (expanded) and Variables and Details at the top right; the dimmed Board chip in the top bar | crop: full editor window */}

Every row starts collapsed. When you select a widget on the board, the Outline opens the rows above it and scrolls to it.

## Read the tree

| You see | It means |
|---|---|
| Chevron | Expand or collapse the rows inside. |
| Orange home icon | The home screen. |
| Purple name | A component. |
| Layers icon on the right | The widget has wrappers, such as Padding or Scroll View. Hover for their names. Click to unfold them as rows above the widget. |
| Tag icon | A slot, a named place that holds a widget, such as `appBar`. |
| Repeat icon | Widgets repeated for each item in a list. |
| Split icon with branch rows | A condition that decides which widgets show. |
| Dimmed row | A branch that is not showing. |

## Select, find and zoom

- Click a row to select the widget. <kbd>Shift</kbd> + click adds to the selection. The Outline and the board stay in sync, and hovering a row highlights the widget on the board.
- Double-click a row to zoom the board to that widget. If Nowa can't find it on the board, you see **Cannot find widget … on the board.**
- Right-click a row for the same menu as on the board. It acts on the row you clicked. See [Select, move and resize](select-and-edit.md#use-the-right-click-menu).

## Reorder by dragging

Drag a row and drop it above, inside or below another row. A line, or a box for "inside", shows where it will land. Only valid places accept the drop. The widget moves in your design too, and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes it.

In a **Stack**, the order of the rows is the stacking order: later rows sit on top. Reordering also works from the board. See [Select, move and resize](select-and-edit.md).

## Preview the branches of a condition

When a widget shows only if a condition holds, such as an if/else or a switch in your logic, the Outline has a condition row with one branch row for each outcome. The eye on a branch tells you its state:

- **Shown by the condition**: the board shows this branch now.
- **Click to show this branch**: the board shows another branch.
- **Shown on click. Click again to let the condition decide**: you forced this branch.

Click a branch row to make the board show it, so you can design every case. Click it again to let the condition decide. This changes only what the board shows. It is not saved and does not change your app. To learn how conditions work, see [Expressions and conditions](../logic/expressions.md).

## Next steps

- [Select, move and resize](select-and-edit.md) widgets on the board.
- [Change widget properties](properties.md) of the widget you selected.
- [Build reusable components](components.md) and spot them in purple.
