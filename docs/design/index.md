---
title: How designing works
description: Boards, screens, components and widgets, and how you design your app visually while Nowa AI builds next to you.
keywords: [design, designer, board, design board, canvas, UI, screen, component, widget, visual editor, drag and drop]
---

In Nowa you design on a board: one big, free-form space where your screens sit side by side. Click anything to change it, drag to rearrange, and let Nowa AI build alongside you. Your screens and components are saved as real Flutter code in your project.

## How the pieces fit

A **board** holds **board items**. A board item is a screen, a component or a loose widget. Each screen and component is made of **widgets** nested inside each other.

| Piece | What it is | Where it is saved |
|---|---|---|
| Board | A free-form design surface. A project can have many. | A `.board` file in `boards/` |
| Screen | One page of your app, such as Home or Settings. | A Dart file in `lib/` |
| Component | A widget you build once and reuse on many screens. | A Dart file in `lib/` |
| Loose widget | Any widget you drop straight onto the board, such as a shape. | Only in the board file |
| Widget | A building block inside a screen or component: a Text, a Button, a Column. | Inside the screen's or component's file |

Screens and components have a title bar above them with their name. Hover it to see **Play** and **Open in new tab**. A loose widget has no title bar, and it is not part of your app until you place it inside a screen.

## The tools you work with

![The whole editor with a Button selected and the Outline panel open. The toolbar at the bottom of the board and the Variables and Details panels at the top right are highlighted.](/img/docs/design/design-index-1.png)

| Where | What it does |
|---|---|
| **Widgets** panel, left sidebar | Lists your screens and components. Drag one onto the board. |
| **Outline** panel, left sidebar | Shows the widget tree so you can jump to any widget. |
| Toolbar, bottom of the board | **Select tool**, **Shape**, **Screen**, **Text** and **Widget**. |
| **Details**, top right | The properties of whatever is selected. With nothing selected, it shows the board's color and grid. |
| **Variables**, above **Details** | The data and functions of the selected screen or component. With nothing selected, it shows **Globals**, your app-wide state. |

The board is part of the desktop-width layout. On a phone-sized window Nowa shows a simpler view without a board, described in [Use Nowa on your phone](../get-started/mobile.md).

## Design with Nowa AI and by hand

The **AI Assistant** panel is open next to the board when you open a project. Describe a screen and [Nowa AI](../ai/index.md) builds it. When it creates a screen, it places it on your board. Then refine by hand: select a widget and change it in **Details**.

The widget you select on the board is attached to your next message automatically, so you can point at exactly what you want changed. See [Give Nowa AI context](../ai/context.md).

:::tip Or ask Nowa AI
Try "Create a Home screen with a search bar and a list of recipes." Then select the search bar on the board and adjust it yourself.
:::

## Try it as you go

Hover a screen's title and click **Play** to tap through it right on the board. See [Play your app on the board](../test/instant-play.md).

## Where to go next

Set up the board and its parts:

- [Work with boards](boards.md): create and switch boards, set the color and grid, move around.
- [Create and set up screens](screens.md): templates, app bar, route and home screen.
- [Build reusable components](components.md): build once, use everywhere.

Build a screen:

- [Add widgets](add-widgets.md): the widget picker, tools, drag and drop, paste.
- [Select, move and resize](select-and-edit.md): selection, snapping, copy, group, reorder, undo.
- [Use the Outline](outline.md): the widget tree.
- [Change widget properties](properties.md): the **Details** panel.
- [Lay out widgets](layout.md): rows, columns, stacks and sizing.
- [Design for every screen size](responsive.md): screen sizes without breakpoints.

Style your app:

- [Create and edit themes](themes.md) and [Use theme colors and text styles](theme-styles.md)
- [Images, videos and other files](assets.md)
- [Fonts and icons](fonts-icons.md)
- [Start from a template](templates.md)
- [Languages and right-to-left text](localization.md)
