---
title: Build reusable components
description: Turn any widget into a component you can reuse across screens, give it params, and update every copy by editing it once.
sidebar_label: Components
keywords: [component, reusable widget, instance, detach, params, parameters, create component, library, widgets panel, stateful, reuse, copy as new widget]
---

A component is a widget you build once and use many times. Change it in one place and every copy updates. That makes it ideal for a product card, a header or a custom button.

Make a component as soon as you use a card, header or button twice: see [Build once, reuse everywhere](../guides/design-tips.md#build-once-reuse-everywhere).

## Create a component

1. Select the widget you want to reuse. To reuse several widgets together, group them first with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd>. If several widgets are selected, Nowa uses only the first one.
2. Right-click it and choose **Create component**. You can also click the widgets icon (**Create a component**) next to the name at the top of **Details**.
3. Type a name, such as `ProductCard`, and click **Submit**. The dialog is titled **New Component from** plus the widget's name.
4. Nowa replaces the widget with an instance of your new component, which keeps the same size and position.

Nowa saves the component as a Dart file in `lib/`, named after it, for example `product_card.dart`.

![The New Component from Container dialog: the name field (highlighted) with Container1, the Class name and Path lines, and the Cancel and Submit buttons.](/img/docs/design/design-components-1.png)

## Use a component

Every place you use a component is an instance. To add one:

- Drag it from the [Library](library.md) onto the board or into a screen. Find it under **Project**. The default filter already lists components.
- Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, type its name, check the highlighted result and press <kbd>Enter</kbd>. The Library puts it where your pointer last was. To see only components, choose **Components** in **Filter**. See [Add widgets](add-widgets.md).
- Copy an instance and paste it, or hold <kbd>Alt</kbd>/<kbd>Option</kbd> and drag it.

Instances have a purple label in the [Outline](outline.md).

## Edit a component or one instance

- **Change the component for everyone.** Drag it from the **Library** onto empty board space and click its title, or double-click it in the **Library** (or press <kbd>Enter</kbd> on it) to open it on its own. Edit it like any widget. Every instance updates.
- **Edit inside an instance.** Select a widget inside an instance: double-click the instance on the board to go one level deeper, or pick the widget in the [Outline](outline.md). Change it in **Details**. The widget belongs to the component, so every instance updates. The first crumb at the top of **Details** is the component's name. Click it to select the whole instance again.
- **Set values for one instance.** Select the instance inside a screen. **Details** lists the component's params. Change them there and only this instance changes.
- **Break the link.** Right-click an instance and choose **Detach**. It turns into plain widgets, and later changes to the component no longer reach it.
- **Make a separate copy.** Right-click a component and choose **Copy as new widget**, name it and click **Submit**. You get a new component in its own file.

## Give a component params

Params let each instance show different content, such as a title or a picture.

1. Select the component's board item, or open the component on its own.
2. Expand **Variables** above **Details**. It lists **Params**, **Variables** and **Functions**.
3. Hover **Params** and click **+**. Nowa adds a param called `param`. Rename it and choose its type.
4. Link a property of a widget inside the component to the param. Each instance now has its own value for it in **Details**.

Adding a variable (hover **Variables**, then click **+**) makes the component stateful for you. There is nothing to set up. Learn more in [Pass data with parameters](../logic/parameters.md) and [Store data in variables](../logic/variables.md).

:::tip Or ask Nowa AI
Try "Turn the recipe card on the Home screen into a component and use it on the Favorites screen."
:::

## Manage screens and components {#manage-screens-and-components}

Open **Library** in the left sidebar. Your screens and components are under **Project**, in the folders of your `lib/` folder. [Find and add things with the Library](library.md) covers the whole panel. These are the steps for screens and components.

![The Library with the project rows (the pages folder with HomePage, and the selected ProductCard component) and the right-click menu of the ProductCard row (highlighted): Insert, Open, Rename, Delete and Show in code, with the keys beside the first three.](/img/docs/design/design-components-2.png)

- Type in the search field to find one. To list only one kind, choose **Screens** or **Components** in **Filter**.
- Click a row for its details card: a preview, its name, where it lives and the first lines of its description. Press <kbd>Esc</kbd> to put the card away.
- Double-click a row, press <kbd>Enter</kbd>, or right-click it and choose **Open** to open it on its own.
- Right-click it and choose **Insert**, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd>, to put it on the open board. Dragging the row onto the board works too.
- Right-click and choose **Rename** (or press <kbd>F2</kbd>), type the new name and press <kbd>Enter</kbd>. Nowa updates every place that uses it, and renames the file when the file is named after it.
- Right-click and choose **Delete**. Nowa asks **Are you sure you want to delete ProductCard?** with **Cancel** and **Yes**. If something uses it, Nowa lists the places and asks you to confirm with **Remove**. If it is the only widget in its file, Nowa deletes the file too. While the Library has focus, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes a delete.
- Right-click and choose **Show in code** to open its file in code mode.

## Next steps

- [Pass data with parameters](../logic/parameters.md): give a screen or component values from outside.
- [Find and add things with the Library](library.md): search, filter and manage everything in the panel.
- [Add widgets](add-widgets.md): drop your components in from the Library.
- [Lists and grids](../reference/widgets/lists.md): repeat one item design for every entry in a list.
