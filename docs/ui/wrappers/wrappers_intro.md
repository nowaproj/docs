---
sidebar_position: 1
title: Intro to wrappers
description: Discover what wrappers are
---
# Wrappers

**Wrappers** are widgets that encloses another widget or widgets to add certain functionalities or alter appearance. 
Wrappers are used extensively in Flutter for composition over inheritance, meaning developers can build complex UIs by wrapping widgets with other widgets to extend their capabilities.

For example, a `Padding` widget can act as a wrapper around another widget to add space around it. Similarly, a `Container` can wrap a widget to provide padding, margins, borders, or color backgrounds. Wrappers let create customizable and reusable UI components efficiently.

💡 Check out our [List of Wrappers](./wrappers_list.md).

### How to add a Wrapper to a Widget?

These are the steps to follow to add a Wrapper to a Widget:

1. Select the widget you want to add the wrapper to.
2. From the details panel click on the "Add Wrapper" button, and the Wrapper Picker will open.
3. Select the Wrapper you want to add.
4. Modify the properties of the wrapper from the details panel.

### Reorder Wrappers

The order of the wrappers will effect how to final look of the widget will look like.
The order of the wrappers in the details panel follows a **bottom-up style** meaning that the wrapper that comes below in the details panel comes above in the widget tree. That's why the base widget will come above all wrappers in the details panel, but it comes at the bottom of the Flutter widget tree.

To **reorder the wrappers** you can do it from the details panel. Hover on the wrapper name and a button to reorder the wrapper will appear. Click on it and drag the wrapper in the new position.


![](../img/wrappers.gif)



