---
sidebar_position: 1
title: Groups
description: How to group widgets together and control the layout

---

# Groups

*On this page, you will learn*:

```
1. What are groups and why we need them
2. How to group widgets together 
3. The different layout options for a group
```

Groups are a powerful feature that allows you to organize and manage multiple widgets in a very easy and efficient way, allowing you to build flexible UIs and connect functionalities to them pretty fast. This page will cover the basics of using Groups in Nowa.

## Overview

Groups are a way to organize a group of widgets in a specific structure. When you group widgets together, they all become children of a single widget called "Group". 

This allows you to deal with all of them as a single widget, making it easier to layout them and make them responsive for different screen sizes, move them around, add specific properties to the whole group by adding wrappers, convert the group into a component, or connect the group with lists that distribute the items among the children automatically.

## Layout Options

There are three layout options for a group:

1.  **Stack**: This is a free structure layout where each widget has its own free location, which can be anywhere within the group without a specific structure. After setting a group, this will be the default layout settings. You can move widgets around freely by dragging them.

2.  **Row**: In this layout, all widgets are placed horizontally beside each other, with options to manage the alignment and spacing between them.

3.  **Column**: Here, all widgets are placed vertically above each other, with options to manage the alignment and spacing between them.

## Creating a Group

To create a group, follow these steps:

1.  Select all the widgets that you want to group together.
2.  Right-click and choose "Group" from the context menu, or simply press `Ctrl+G` for Windows or `Cmd+G` for MacOS.

By default, the layout option for the group will be **Stack** (indicated by the star sign). All widgets will be placed freely, exactly how they were before grouping them. 

You can change the layout to **Row** or **Column** by clicking on the ➡️ for "row" and ⬇️ for "Column". Each layout option has different options to control in the details panel.

### Example
In the following example, we are creating a group of the three widgets. By default the layout option will be **stack** so we can move widgets around easily. Afterward, we changed the layout option to row and then column. Notice how the widgets rearrange themselves according to the layout chosen.

With rows and columns, notice the new options available such as setting a fixed space between the widgets, or having a specific rule for the spacing, such as spacing the items evenly, or making the space between them as big as possible.

We can also control the alignment by having the widgets placed in specific alignment vertically and horizontally in the group, such as top left, or center right of the group. This allows us to build responsive designs easily.

![](./img/create_group.gif)


## Ungrouping

To ungroup a group of widgets, follow these steps:

1.  Select the group that you want to ungroup.
2.  Right-click and choose "Ungroup" from the context menu, or click on `Ctrl+G` / `Cmd+G`.

## Further Reading

To learn more about using Rows and Columns in Nowa App Builder, check out [Rows and Columns](./rows_and_columns.md)

Check out variables to see how to make the group items dynamic according to a connected list.

