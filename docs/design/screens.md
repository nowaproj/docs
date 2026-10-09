---
title: Create and set up screens
description: Add a screen from a template, set up its app bar, drawer and background, name its route, and choose your home screen.
sidebar_label: Screens
keywords: [screen, page, create a page, scaffold, app bar, drawer, floating action button, bottom navigation bar, route, home screen, make home screen, rename screen, template, open in new tab]
---

Screens are the pages of your app: a home page, a settings page, a profile page. Add one from a template in a few clicks, then set up its frame, its route, and whether your app opens on it.

## Add a screen

1. Click **Screen** in the toolbar at the bottom of the board, or right-click empty board space and choose **Create a page**. The template picker opens.
2. Next to **Search for:**, keep **Screens** selected. The other choice is **Components**. Type in **Search for templates** or scroll, and highlight a template to preview it on the right.
3. Click a template, for example **Empty Page**.
4. Name it and click **Submit**. The dialog is titled after the template, such as **New Empty Page**, and also shows the **Class name** and the file **Path** (`lib/pages/` for screens).
5. The screen appears on the board. In projects that use GoRouter, Nowa also adds a route for it.

![The template picker for new screens with Chat Template highlighted: the Search for templates box, the Screens and Components chips, the template list with Premium badges, and the preview pane.](/img/docs/design/design-screens-1.png)

A new screen is 393 × 808 unless the template sets its own size, and it is not your home screen: see [Choose the home screen](#choose-the-home-screen).

Some templates add several files. The dialog is then titled **Add** plus the template name and lists the files. Review them and click **Import**. Nowa asks before it overwrites a file with the same name.

Templates marked **Premium** need a plan that includes premium templates. If yours doesn't, Nowa shows an upgrade dialog. See [pricing](https://nowa.dev/pricing). Browse what's available in [Start from a template](templates.md).

:::tip Or ask Nowa AI
Try "Create a login screen with email and password fields and a Sign in button." When Nowa AI creates a screen, it places it on your open board.
:::

## Set up a screen

Click the screen's title to select it. In **Details**, the **Screen** section holds the screen's frame.

| Setting | What it does |
|---|---|
| **Color** | The background color. It starts as your theme's surface color. |
| **App Bar** | The bar at the top. Click the slot, pick a widget, then edit its title and colors. |
| **Drawer** | A side menu that slides in. |
| **Floating Action Button** | A round button that floats over the content. |
| **Bottom Navigation Bar** | A bar at the bottom for switching between sections. |
| **Size** | Resizes the screen on the board. Presets: **Pixel 3a**, **iPhone 11 Pro**, **Galaxy S20+**, **iPhone 12**, **MacBook Pro** and **1920x1080**. |

Fill the other slots the same way: click the slot, which reads **null** while it is empty, and pick a widget. Dragging an App Bar, Floating Action Button, Bottom Navigation Bar or Drawer onto the screen puts it in the body, not in its slot.

**Size** only changes how big the screen looks on the board. Your app fills the real device. See [Design for every screen size](responsive.md).

![Details for the selected home screen, scrolled down. The Screen section is highlighted (Color, App Bar, Drawer, Floating Action Button, Bottom Navigation Bar, Size). Below it are Route Settings with the Path field and the line This is the home screen.](/img/docs/design/design-screens-2.png)

Other sections of **Details**, such as **Group** and **Safe Area**, control the content inside. See [Lay out widgets](layout.md) and [Change widget properties](properties.md). A widget counts as a screen when it has the **Screen** wrapper. Without it, it is a component.

## Name the route

**Route Settings**, in the **Screen** section, sets how this screen is addressed in your app. It appears in projects that use GoRouter, the default for new projects.

1. Click the **Path** field and type a path, such as `/settings`. Press <kbd>Enter</kbd>. The field's hint shows the default: the screen name in lowercase words joined by hyphens, for example `/home-page`.
2. To pass data in the address, expand **Route Parameters** and click **+** (**Add Route Parameter**).
3. Type a **Param name**, link it to one of the screen's params with the link button, and set a **Default value** if you like.

The route icon next to **Route Settings** (**Open Router Editor**) opens the router. See [Set up routes in the Router panel](../logic/router.md).

## Choose the home screen

The home screen is the one your app opens on.

1. Select the screen.
2. Click **Make home screen**, at the bottom of the **Screen** section.

The current home screen shows **This is the home screen** instead of the button. Its title on the board and its row in the [Outline](outline.md) show a home icon.

## Rename, describe, copy and open

- **Rename.** Double-click the title on the board, type the new name and press <kbd>Enter</kbd>. Or click the pencil (**Rename**) next to the name in **Details**. Nowa updates every place that uses the screen. It also renames the file when the file is named after the screen, and always when you rename from **Details**.
- **Add description.** Click **Add description** under the name in **Details**, write a short note, then click the back arrow (**Back to fields**). The note is saved in the screen's code. It shows in the details card of the [Library](library.md) and in the widget picker dialog when you pick the screen.
- **Copy as new widget.** Right-click the screen's title and choose **Copy as new widget**, name it and click **Submit**. You get a separate copy in a new file, placed on the board. Copy and paste only adds another board item that shows the same screen.
- **Open in new tab.** Hover the title and click **Open in new tab**, or select the screen and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>I</kbd>. The screen opens on its own, with the **Outline** floating at the top left. To go back, click **Back** in the top bar, or open the **Boards** chip and pick the board.

## Delete a screen

To take a screen off the board, click its title, then right-click the title and choose **Remove**, or press <kbd>Delete</kbd> (<kbd>Backspace</kbd> on macOS). Its file stays in your project.

To delete the screen itself, open the [Library](library.md), find the screen under **Project**, right-click it and choose **Delete**, then click **Yes**. If other places use it, Nowa lists them and asks you to confirm again. See [Build reusable components](components.md#manage-screens-and-components).

## Next steps

- [Add widgets](add-widgets.md): fill the screen from the Library.
- [Navigation bars and screen parts](../reference/widgets/navigation.md): set up the app bar, drawer, floating button and bottom navigation bar.
- [Build reusable components](components.md): turn part of a screen into a widget you can reuse.
- [Navigate between screens](../logic/navigation.md): open one screen from another.
