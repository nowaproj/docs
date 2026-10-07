---
title: Build reusable components
description: Turn any widget into a component you can reuse across screens, give it params, and update every copy by editing it once.
sidebar_label: Components
keywords: [component, reusable widget, instance, detach, params, parameters, create component, widgets panel, stateful, reuse, copy as new widget]
---

A component is a widget you build once and use many times. Change it in one place and every copy updates. That makes it ideal for a product card, a header or a custom button.

## Create a component

1. Select the widget you want to reuse. To reuse several widgets together, group them first with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd>. If several widgets are selected, Nowa uses only the first one.
2. Right-click it and choose **Create component**. You can also click the widgets icon (**Create a component**) next to the name at the top of **Details**.
3. Type a name, such as `ProductCard`, and click **Submit**. The dialog is titled **New Component from** plus the widget's name.
4. The widget is replaced by an instance of your new component, with the same size and position.

Nowa saves the component as a Dart file in `lib/`, named after it, for example `product_card.dart`.

![The New Component from Container dialog: the name field (highlighted) with Container1, the Class name and Path lines, and the Cancel and Submit buttons.](/img/docs/design/design-components-1.png)

## Use a component

Every place you use a component is an instance. To add one:

- Drag it from the **Widgets** panel (switch to **Component**) onto the board or into a screen.
- Open the widget picker with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and choose from **Components**. See [Add widgets](add-widgets.md).
- Copy an instance and paste it, or hold <kbd>Alt</kbd>/<kbd>Option</kbd> and drag it.

Instances have a purple label in the [Outline](outline.md).

## Edit a component or one instance

- **Change the component for everyone.** Drag it from the **Widgets** panel onto empty board space and click its title, or double-click it in the **Widgets** panel to open it on its own. Edit it like any widget. Every instance updates.
- **Edit inside an instance.** Select a widget inside an instance: double-click the instance on the board to go one level deeper, or pick the widget in the [Outline](outline.md). Change it in **Details**. The widget belongs to the component, so every instance updates. The first crumb at the top of **Details** is the component's name. Click it to select the whole instance again.
- **Set values for one instance.** Select the instance inside a screen. **Details** lists the component's params. Change them there and only this instance changes.
- **Break the link.** Right-click an instance and choose **Detach**. It turns into plain widgets, and later changes to the component no longer reach it.
- **Make a separate copy.** Right-click a component and choose **Copy as new widget**, name it and click **Submit**. You get a new component in its own file.

## Give a component params

Params let each instance show different content, such as a title or a picture.

1. Select the component's board item, or open the component on its own.
2. Expand **Variables** above **Details**. It lists **Params**, **Variables** and **Functions**.
3. Click **+** next to **Params**. Nowa adds a param called `param`. Rename it and choose its type.
4. Link a property of a widget inside the component to the param. Each instance now has its own value for it in **Details**.

Adding a variable with **+** next to **Variables** makes the component stateful for you. There is nothing to set up. Learn more in [Pass data with parameters](../logic/parameters.md) and [Store data in variables](../logic/variables.md).

:::tip Or ask Nowa AI
Try "Turn the recipe card on the Home screen into a component and use it on the Favorites screen."
:::

## Manage screens and components {#manage-screens-and-components}

Open **Widgets** in the left sidebar. It lists the screens and components in your project's `lib/` folder, each with a preview.

![The Widgets panel on the Component tab with the Search box, the grid/list button, the Page and Component switch and a component tile, with its right-click menu (highlighted): Open in Editor, Rename and Delete.](/img/docs/design/design-components-2.png)

- Switch between **Page** (screens) and **Component**, or type in the search box. Search looks at names and file paths in both lists.
- Click a tile to select it. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + click or <kbd>Shift</kbd> + click selects several.
- Double-click a tile, or right-click it and choose **Open in Editor**, to open it on its own.
- Drag a tile onto the board to place it.
- Right-click and choose **Rename**, type the new name and press <kbd>Enter</kbd>. Nowa updates every place that uses it.
- Right-click and choose **Delete**, or press <kbd>Delete</kbd> (<kbd>Backspace</kbd> on macOS). If something uses it, Nowa lists the places and asks you to confirm with **Remove**. If it is the only widget in its file, the file is deleted too. While the panel is focused, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes a delete.
- The button next to the search box switches between list and grid (**Switch to grid view** and **Switch to list view**).
