---
sidebar_position: 4
title: Scroll View 
description: Discover the Scroll View wrapper
---

# Scroll View

The **Scroll View Wrapper** allows developers and designers to make content scrollable, ensuring that UI elements can be accessed when content exceeds the screen size. This guide will walk you through the steps to add a Scroll View to your app in Nowa.

### When to use a Scroll View
Using a ScrollView is recommended when:

- Content height can exceed screen height, making some parts inaccessible.
- Dynamic content is loaded, where the size might change over time.
- Offering users a more flexible navigation experience within a screen.

### How to add Scroll View
In the screen below, you can see that the content loaded from the data source, is overflowing the screen. In this way, it would not be visible to users when they open the app.

To add the Scroll View:
- Select the Row that contains the widgets you want to be scrollable.
- Go in the details panel and select "Add Wrapper"
- Search for "Scroll View" and select it.
- Once you added the wrapper, you can go in the details panel to modify the properties.
- Since the Row has an horizontal direction, select "Horizontal" in the Scroll Direction property.
- You can test the scroll once you open the play mode.

![](./img/scrollview1.gif)

To add the Scroll View also to the column, repeat the same steps but select: "Vertical" in the Scroll direction property.

![](./img/scrollview2.gif)

### Other properties:

**Reverse**: 
Determines the direction in which the content scrolls. If ON, the scroll view's contents will start at the bottom or the end (for horizontal scroll) of the view. By default, it's OFF, which means content starts from the top (or start for horizontal scroll).

**Padding**:
Adds space between the edges of the Scroll View and its children.

**Primary**:
determines whether this scrolling view should be the foremost, or "primary," scroll interaction within its context. When you have multiple scrollable areas on a screen, setting one as "primary" tells the system to prioritize this one for certain default behaviors or interactions. This is especially useful in scenarios like coordinating with app-wide actions, such as the "drag-to-refresh" feature seen on many mobile apps.

**Restoration Id**:
Used in state restoration. It provides an ID for saving and restoring the scroll position of the Scroll View. If state restoration is enabled and the Scroll View's contents need to be saved and restored across app restarts, then providing this ID will include the scroll offset as part of the restoration data.
