---
title: Pass data with parameters
description: Add parameters to a screen or component so it can receive values, then set those values where you use it or when you navigate to it.
sidebar_label: Parameters
keywords: [parameter, param, Params, argument, pass data, component parameter, screen parameter, Create Param, default value, instance, constructor]
---

A parameter, or param, is a value that a screen or component receives from outside: a product passed to a details screen, a title passed to a card. It lets one design show different data each time you use it.

A param is fixed once it arrives. If a value has to change while the screen is open, use a [variable](./variables.md) instead.

## Add a param

1. Select the screen or component and expand **Variables**. See [Open the Variables panel](./variables.md#open-the-variables-panel).
2. Hover the **Params** section title and click **+**. A new param appears, ready to rename.
3. Type a name and press <kbd>Enter</kbd>.
4. In **Details**, choose the **Type** and set the **Default Value**. The type picker works as described in [Choose a type](./variables.md#choose-a-type).

The **Default Value** is used when nothing is passed in, and it is what the board shows. Until a param has a value, the board shows a placeholder such as `[title]` wherever the param is used. Give the param a default, or pass a value, to see your own content.

## Use a param in a widget

1. Select the widget and click the label of the property you want to fill, such as the text of a text widget.
2. Under **LOCALS**, click the param. The property now follows the param.

This is the same as linking a variable: see [Show a variable in a widget](./variables.md#show-a-variable-in-a-widget).

## Create a param from a property

Design with sample content first, then turn properties into params.

1. Click the label of a property in **Details**.
2. Choose **Create Param...**. Nowa adds a param of the right type, starts it with the property's current value when that is a fixed value, and links the property to it.

This works on events too. Click an event's label, such as **On Pressed**, and choose **Create Param...** to let each use of the component decide what happens.

## Pass values to a component

Each time you place a component, you can give that copy its own values.

1. Place the component on a screen. See [Build reusable components](../design/components.md).
2. Select the copy. Its params appear in **Details**, one field per param, named after it.
3. Type a value, or click a field's label to link a variable, one of the screen's params or an expression. See [Expressions and conditions](./expressions.md).

Values set this way belong to that one copy. Edit the component itself to change every copy.

To go back to the param's default on a copy, right-click its field in **Details** and choose **Reset to default**. To pass nothing at all, choose **Set to null**. Params you create allow this, because their type can be empty.

{/* CAPTURE: id=logic-parameters-1 | state: playground starter with a component that has a title param, placed on HomePage and selected | show: Details with the component's param field, and the Variables tile with Params open for the component | crop: right-hand panels */}

To preview a screen or component on the board with sample data, select its title and fill in its param fields in **Details**. These values are saved with the board for previewing. Your app doesn't use them.

## Pass values when you navigate

- **Navigator**: click the brush icon next to the screen in the **Navigator** node and fill in its params. See [Use the Navigator](./navigation.md#use-the-navigator).
- **GoRouter**: send the value in the path or after a question mark, and connect it to the screen's param in the Router panel. See [Pass data to the next screen](./navigation.md#pass-data-to-the-next-screen).

## Rename, retype or remove a param

Select the param in the **Params** list and use **Details**, or double-click it to rename. Renaming, changing the type and removing work as they do for variables: see [Rename, retype or remove a variable](./variables.md#rename-retype-or-remove-a-variable).

To use a param's value in something that changes, copy it into a variable. For example, fill the variable from the param in an **InitState Function**. See [Create functions](./functions.md).

:::tip Or ask Nowa AI
Try: "Make a product card component with a title and an image as parameters, and show three of them on the Home screen." See [How Nowa AI works](../ai/index.md).
:::

## Next steps

- [Store data in variables](./variables.md) for values that change.
- [Navigate between screens](./navigation.md) to send data to the next screen.
- [Data models](./models.md) to pass a whole product or user as one param.
