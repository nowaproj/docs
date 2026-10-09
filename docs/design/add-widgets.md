---
title: Add widgets
description: Add widgets from the Library, draw shapes and text, drag in screens, components and assets, or paste images, links and text.
sidebar_label: Add widgets
keywords: [library, add widget, ctrl k, widget tool, widget picker, widget palette, search for a widget, text tool, shape tool, container, request a widget, drag and drop, paste image, add missing dependencies]
---

Add a widget in seconds: press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, type what you want and press <kbd>Enter</kbd>. You can also draw shapes and text, drag in screens, components and assets, or paste images.

## Add a widget from the Library {#add-a-widget-with-the-widget-picker}

1. Click **Widget** in the toolbar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>. The [Library](library.md) opens with the search ready, and the field reads **Add...**.
2. Type part of a name, such as `text` or `button`. Results come in groups by source (**Project**, **Packages**, **Built-in** and **Assets**), and Nowa's own widgets come first in each group. **Filter** and the chips under the search narrow the list. A row such as **Show 3 more of other kinds** reveals the rest.
3. Press <kbd>↓</kbd> to move through the results. The details card beside the panel shows a preview, the name and the first lines of the description.
4. Press <kbd>Enter</kbd>, or double-click the result. The widget lands where your pointer last was on the board, and the keys go back to the board. To leave without adding anything, press <kbd>Esc</kbd> to clear the search and again to hand the keys back.

You need an open board, screen or component. Without one, Nowa says "Open a screen, a component or a board to insert into".

![The Library opened with Ctrl/Cmd+K: the search field reads Add... with button typed, the results are grouped by source with a count at the end of each heading and the first result is highlighted, and a details card with a preview sits beside the panel.](/img/docs/design/design-add-widgets-1.png)

The Library puts a widget at the last spot your pointer was on the board, so point at the board first. To choose the exact spot, drag the row onto the board instead. The Library stays open while you drag, and the board shows where the widget will land. See [where a dragged widget lands](select-and-edit.md#where-a-dragged-widget-lands).

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/docs/design/design-add-widgets-video.mp4" type="video/mp4" />
</video>

## Add a widget that needs a package

Some widgets rely on a Flutter package. If your project doesn't have it yet, adding the widget with <kbd>Enter</kbd>, a double-click or **Insert** opens **Add Missing Dependencies** with the message "This widget requires the following dependencies". Click **Add**. Nowa adds the packages and then places the widget. To have Nowa ask first, add such a widget with <kbd>Enter</kbd> or **Insert** rather than by dragging.

## Draw a shape or text

- **Shape** (<kbd>R</kbd>): click the board to place a gray container. Click over a **Stack**, **Row** or **Column** and it goes inside. Click and drag to draw its size. Hold <kbd>Shift</kbd> to keep the proportions and <kbd>Alt</kbd>/<kbd>Option</kbd> to draw from the center.
- **Text** (<kbd>T</kbd>): click to place a text that says "Write something" and type right away. Click and drag to draw its size.

Both tools switch back to **Select tool** after one use. Tool keys don't work while you type in a field.

## Drag screens, components and assets {#drag-screens-components-and-files}

- **Screens and components.** Drag a row from the [Library](library.md) onto the board. A screen always becomes its own board item. Drop a component inside a screen to use it there. See [Build reusable components](components.md).
- **Assets.** Turn on the **Assets** chip in the Library, then drag an image, SVG, font, Rive animation or video onto the board to create the matching widget. A font file creates a text that uses that font. See [Images, videos and other files](assets.md).

## Paste images, links and text

Copy something, point at the board and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>, or right-click empty board space and choose **Paste**. With a widget selected, the paste goes into that widget's parent.

- A copied widget is pasted as a copy of it.
- A copied image becomes an **Image** widget, and Nowa saves the image in `assets/`. In the desktop app you can also copy image files from your file manager.
- A link that starts with `http` becomes an **Image** widget that loads it.
- Any other text becomes a **Text** widget.

## Put a widget inside a container

A shape you draw is a **Container** with nothing in it, and **Details** shows **Empty** with a **+** button. Select the container, click **+** and pick a widget in the widget picker. Dropping a widget onto a container doesn't put it inside.

The widget picker is a dialog with the hint **Search for a widget**. It opens from the **+** of an empty widget slot, from any property that takes a widget (an app bar slot, or **Pick Widget** in a property's menu), and from **Replace with...** in the right-click menu. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and the **Widget** tool open the Library instead.

- Type to search. Next to **Search for:**, choose **All**, **BuiltIn** (the widgets that come with Nowa) or **Components** (the screens and components in your project).
- Move through the list with the arrow keys. The preview on the right shows the widget, a short description, its **Dependencies** and, for many built-in widgets, an **Open Documentation.** link.
- If a widget has variants, they show as chips under the description. Press <kbd>Tab</kbd> or <kbd>Shift</kbd> + <kbd>Tab</kbd> to switch between them, or click one to use it.
- Press <kbd>Enter</kbd> or click the widget to pick it. Press <kbd>Esc</kbd> to close the picker.

## Set up lists, forms, navigation bars and media

Four guides go deeper on the widgets that need some setup after you drop them on the board:

- [Lists and grids](../reference/widgets/lists.md): repeat one item design for every entry in a list.
- [Text fields and forms](../reference/widgets/forms.md): add a text field and check what people type.
- [Navigation bars and screen parts](../reference/widgets/navigation.md): add an app bar, drawer, floating button and bottom navigation bar.
- [Images, video and web content](../reference/widgets/media.md): show pictures, video, animations and web pages.

## Can't find a widget?

Browse every built-in widget in the [widget catalog](../reference/widgets/index.md). If one is missing, open the widget picker (select an empty container and click **+**, for example), click **Request a Widget** in its search bar, describe the widget and click **Submit Request**. The Library has no such link.

:::tip Or ask Nowa AI
Try "Add a search field under the title and a list of recent orders below it." Nowa AI picks the widgets for you. You can still adjust them on the board.
:::

## Next steps

- [Find and add things with the Library](library.md): search, filter, preview and manage everything you can add.
- [Select, move and resize](select-and-edit.md) the widgets you add.
- [Change widget properties](properties.md) and wrap widgets with **Add Wrapper**.
- [Lay out widgets](layout.md) with rows, columns and stacks.
