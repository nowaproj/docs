---
title: Lay out widgets
description: Group widgets and arrange them in rows, columns and stacks, then set spacing, constraints and sizes so your design keeps its shape.
sidebar_label: Layout
keywords: [layout, group, stack, row, column, alignment, spacing, gap, padding, constraints, expand, fixed, auto, hug, scroll view, wrap, list view, sizing, responsive]
---

Layout decides where widgets sit and how they react when space changes. You set all of it in **Details**: group widgets, turn a group into a row, a column or a stack, and choose how each widget sizes itself.

## Groups {#groups}

A **Group** holds several widgets so you can move, align and size them as one. A **Stack** layers widgets on top of each other and lets you place them freely. A **Row** lines them up side by side. A **Column** stacks them top to bottom.

To group widgets, select them on the board or in the **Outline**, then press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> or right-click and choose **Group**. Inside a Row, Column or Stack, the new group is the same kind as its parent. Anywhere else it is a Stack. To take a group apart, select it and right-click **Ungroup**. Pressing the shortcut again nests the group in a new one, so use **Ungroup** instead.

You can also add an empty **Group** from the widget picker (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>).

Select a group and open the **Group** section of **Details**. Its header has three buttons: the first sets a **Stack**, the right arrow sets a **Row** and the down arrow sets a **Column**. When you turn a Stack into a Row or Column, Nowa orders the children by their position and takes the **Gap** from the space between them.

{/* CAPTURE: id=design-layout-1 | state: playground starter open, HomePage selected, then the right-arrow button in the Group section clicked so the body becomes a Row | show: the Group section header with its three buttons, then Alignment grid, Main Axis Size, Spacing, Gap and Padding | crop: right Details panel */}

**Padding** in the **Group** section sets space inside the group. Type a value for the horizontal and vertical sides, or click **Individual padding** for left, top, right and bottom. Nowa adds a **Padding** wrapper around the group for you.

A Stack also lists **Alignment**, **Fit**, **Text Direction**, **Clip Behavior** and **Children**.

## Rows and columns

Select a Row or Column and open the **Group** section.

| Setting | What it does |
|---|---|
| **Alignment** | A 3 × 3 grid. Click a cell to place the children along and across the row or column. With **Fixed** spacing all nine cells work. With any other spacing only the three positions across the row or column apply. |
| **Main Axis Size** | `max` fills the space available along the row or column. `min` shrinks to fit the children. |
| **Spacing** | **Fixed** keeps the children together with a **Gap** between them. **Between** spreads them with equal space between, first and last at the edges. **Around** gives each child equal space around it, so the ends get half. **Evenly** makes the space between children and at both ends equal. |
| **Gap** | Space between children. Shown only with **Fixed** spacing. The minimum is 0. |
| **Children** | The list of children. Drag to reorder. |

You can also reorder children by dragging them on the board or in the **Outline**.

## Place widgets in a stack

A widget inside a Stack, such as a widget on a screen's main group, is positioned by its distance to the stack's edges. Select it and open **Layout**.

- **L**, **T**, **R**, **B** are the distances to the left, top, right and bottom edges. A field is greyed out when the widget isn't pinned to that edge.
- **W** and **H** are the width and height, each with **Fixed** or **Auto**.
- The constraints decide which edges the widget keeps its distance to when the stack, usually the screen, changes size. Pick them in the two dropdowns: **Left**, **Right**, **Left and right** or **Center** across, and **Top**, **Bottom**, **Top and bottom** or **Center** down. Or click the bars in the constraints box. <kbd>Shift</kbd>-click a second bar on the opposite side to pin both. The **+** in the middle clears the pins and centers the widget.

**Left and right** and **Top and bottom** stretch the widget as the screen grows. **Center** keeps it centered. Constraints work for several selected widgets at once.

## Size widgets

Select a widget and open **Layout**. **W** and **H** each have a mode dropdown.

| Mode | What it does |
|---|---|
| **Fixed** | Keeps the size you type. Switching to **Fixed** fills in the current size. |
| **Auto** | Sizes to the content. Offered only when the widget has a natural size. |
| **Expand** | In a Row, Column or Wrap: along the row or column it takes the space left over, and across it fills the full width or height. |

{/* CAPTURE: id=design-layout-2 | state: a Button inside a Column on a screen is selected (select the Button, then group it with Ctrl/Cmd+G and click the down arrow) | show: the Layout section with the W mode dropdown open showing Fixed, Expand and Auto | crop: right Details panel */}

The sections you get depend on the parent. A screen on the board shows **X**, **Y**, **W** and **H**. A widget in a Stack shows the distances and constraints. A widget in a Row, Column or Wrap shows **Fixed**, **Auto** and **Expand**. A widget in a List View shows **Fixed** and **Auto**. A widget with any other parent shows an empty **Layout** section. Click its **+** to give it a fixed-size box.

## Scroll or wrap content

- **Scroll View**: select a Column, or any widget that may not fit, click **Add Wrapper** and choose **Scroll View**. Inside a Scroll View, **Expand** isn't offered along the scroll direction, because a scrolling area has no fixed end to fill.
- **Wrap**: add it from the widget picker. Children sit side by side and continue on a new line when they run out of room.
- **List View**: add it from the widget picker for a scrolling list. Children are dropped in order like a Column, and each gets a size box. See the [widget catalog](../reference/widgets/index.md).

:::tip
Or ask Nowa AI: "Put these three cards in a column with 16 px between them and make it scroll."
:::

## Next steps

- [Design for every screen size](responsive.md) uses these tools to make one layout fit all devices.
- [Select, move and resize](select-and-edit.md) shows how to group, reorder and resize on the board.
- [Change widget properties](properties.md), including **Add Wrapper**.
