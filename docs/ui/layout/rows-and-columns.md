---
sidebar_position: 4
title: Columns and Rows
description: Learn how to organize your widgets in Columns and Rows to create responsive layouts in Nowa.
---

Columns and Rows are essential tools in Nowa’s layout system.  
They let you organize widgets horizontally or vertically, making your design adaptable across different screen sizes — automatically.

By grouping widgets into a **Column** or **Row**, you can control their spacing, alignment, resizing, and order easily from the **Details panel**.

![](/img/designer/direction.png)

---

:::tip[Container becomes a wrapper when grouping]
If you select multiple widgets that already have a container beneath them and turn that selection into a **Group**, **Column**, or **Row**, the container will automatically act as a **wrapper**, giving your new layout a background fill color.
:::

---

### Alignment

Alignment determines how your widgets are positioned inside the column or row.

When you select a **Column** or **Row**, you’ll find alignment controls in the **Details panel**.  
Depending on your layout direction, you’ll see a grid of **nine alignment options** (for both axes).

![](/img/designer/alignment-9.gif)

If your spacing mode isn’t set to **Fixed**, the alignment options simplify to **three** per direction:

- **Column:** Top, Center, Bottom  
- **Row:** Left, Center, Right  

![](/img/designer/alignment-3.gif)

---

### Spacing

Spacing defines how much space appears between the widgets inside a Column or Row.  
You can choose from four spacing behaviors:

- **Fixed** → Set a specific, manual value for spacing.  
- **Between** → Distribute items evenly, with the first at the start and the last at the end.  
- **Around** → Add equal space around each item, including before the first and after the last.  
- **Evenly** → Apply equal spacing between and around all items.

![](./img/spacing.png)


---

### Resizing

Nowa lets you control how both **parents** (columns/rows) and **children** resize along the X and Y axes.  
You can adjust this in the **Resizing** section of the Details panel.

![](/img/designer/sizing-options.png)

There are three resizing modes:

- **Fixed** → Keeps the width or height constant, regardless of the content inside.  
  The size won’t change even if the children grow or shrink.  

- **Auto** → Automatically adjusts the size of the column or row to fit its children.  
  If padding is set, the layout maintains that padding around its contents.  

- **Expand** → Allows a child widget to stretch and fill all available space in its parent column or row.  
  Useful for layouts where certain widgets need to take up all remaining space.

---

### Reordering

You can easily rearrange the widgets inside a Column or Row by dragging and dropping them directly on the canvas,  
or by reordering them through the **Details panel**.

![](/img/designer/reordering.gif)
