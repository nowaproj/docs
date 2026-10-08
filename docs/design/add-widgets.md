---
title: Add widgets
description: Add widgets with the widget picker, the Widget, Text and Shape tools, drag and drop, or paste.
sidebar_label: Add widgets
keywords: [widget picker, widget palette, add widget, search for a widget, ctrl k, text tool, shape tool, container, request a widget, drag and drop, paste image, add missing dependencies]
---

Add a widget in seconds: press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, type what you want and press <kbd>Enter</kbd>. You can also draw shapes and text, drag in screens and files, or paste images.

## Add a widget with the widget picker

1. Click **Widget** in the toolbar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>. The picker opens with the hint **Search for a widget**.
2. Type part of a name, such as `text` or `button`. The closest matches come first. Under **Search for:**, choose **All**, **BuiltIn** (the widgets that come with Nowa) or **Components** (the screens and components in your project).
3. Move through the list with the arrow keys. The preview on the right shows the widget, a short description and, for many built-in widgets, an **Open Documentation.** link.
4. Press <kbd>Enter</kbd> or click the widget. Press <kbd>Esc</kbd> to close the picker without adding anything.

![The widget picker opened from the Widget tool: the Search for a widget box and Request a Widget link, the Search for chips All, BuiltIn and Components (highlighted), the widget list with Container selected, and the preview pane with its description and Open Documentation link.](/img/docs/design/design-add-widgets-1.png)

You can click to place a widget, or drag it from the list to choose the exact spot.

| | Click or press Enter | Drag from the list |
|---|---|---|
| Where it lands | At the last spot your pointer was on the board, so point at the board first. Same drop rules as a drag. | Where you drop it. |
| Widget needs a missing package | Nowa asks you to add it first. | You can't drag it until the package is added. |

While you drag, the picker closes and the board shows where the widget will land. See [where a dragged widget lands](select-and-edit.md#where-a-dragged-widget-lands).

{/* CAPTURE: id=design-add-widgets-2 | state: playground starter open, open the widget picker, drag Container from the list over the screen | show: dragging a widget from the picker onto a screen with the drop highlight and guide lines visible | crop: the board | type: mp4, 10-15 s, no audio */}

## Add a widget that needs a package

Some widgets rely on a Flutter package. The preview lists it under **Dependencies**. If your project doesn't have it yet, clicking the widget opens **Add Missing Dependencies** with the message "This widget requires the following dependencies". Click **Add**. Nowa adds the packages and then places the widget.

## Draw a shape or text

- **Shape** (<kbd>R</kbd>): click the board to place a gray container. Click over a **Stack**, **Row** or **Column** and it goes inside. Click and drag to draw its size. Hold <kbd>Shift</kbd> to keep the proportions and <kbd>Alt</kbd>/<kbd>Option</kbd> to draw from the center.
- **Text** (<kbd>T</kbd>): click to place a text that says "Write something" and type right away. Click and drag to draw its size.

Both tools switch back to **Select tool** after one use. Tool keys don't work while you type in a field.

## Drag screens, components and files

- **Widgets panel.** Drag a **Page** or **Component** tile onto the board. A screen always becomes its own board item. Drop a component inside a screen to use it there. See [Build reusable components](components.md).
- **Files panel.** Drag a Dart file onto the board to place the first widget it contains.
- **Assets.** Drag an image, SVG, font, Rive animation or video from **assets** to create the matching widget. A font file creates a text that uses that font. See [Images, videos and other files](assets.md).

## Paste images, links and text

Copy something, point at the board and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>, or right-click empty board space and choose **Paste**. With a widget selected, the paste goes into that widget's parent.

- A copied widget is pasted as a copy of it.
- A copied image becomes an **Image** widget, and Nowa saves the image in `assets/`. In the desktop app you can also copy image files from your file manager.
- A link that starts with `http` becomes an **Image** widget that loads it.
- Any other text becomes a **Text** widget.

## Put a widget inside a container

A shape you draw is a **Container** with nothing in it, and **Details** shows **Empty** with a **+** button. Select the container, click **+** and pick a widget from the same picker. Dropping a widget onto a container doesn't put it inside. Any property that takes a widget, such as an app bar slot, opens this picker too, and so does **Replace with...** in the right-click menu.

## Set up lists, forms, navigation bars and media

Four guides go deeper on the widgets that need some setup after you drop them on the board:

- [Lists and grids](../reference/widgets/lists.md): repeat one item design for every entry in a list.
- [Text fields and forms](../reference/widgets/forms.md): add a text field and check what people type.
- [Navigation bars and screen parts](../reference/widgets/navigation.md): add an app bar, drawer, floating button and bottom navigation bar.
- [Images, video and web content](../reference/widgets/media.md): show pictures, video, animations and web pages.

## Can't find a widget?

Browse every built-in widget in the [widget catalog](../reference/widgets/index.md). If one is missing, click **Request a Widget** in the picker's search bar, describe it and click **Submit Request**.

:::tip Or ask Nowa AI
Try "Add a search field under the title and a list of recent orders below it." Nowa AI picks the widgets for you. You can still adjust them on the board.
:::

## Next steps

- [Select, move and resize](select-and-edit.md) the widgets you add.
- [Change widget properties](properties.md) and wrap widgets with **Add Wrapper**.
- [Lay out widgets](layout.md) with rows, columns and stacks.
