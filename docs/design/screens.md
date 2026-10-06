---
title: Create and set up screens
description: Add a screen from a template, set up its app bar, drawer and background, name its route, and choose your home screen.
sidebar_label: Screens
keywords: [screen, page, create a page, scaffold, app bar, drawer, floating action button, bottom navigation bar, route, home screen, make home screen, rename screen, template, open in new tab]
---

Screens are the pages of your app: a home page, a settings page, a profile page. Add one from a template in a few clicks, then set up its frame, its route, and whether your app opens on it.

## Add a screen

1. Click **Screen** in the toolbar at the bottom of the board. Or right-click empty board space and choose **Create a page**. The template picker opens.
2. Keep **Screens** selected. The other tab is **Components**. Type in **Search for templates** or scroll, and highlight a template to preview it on the right.
3. Click a template, for example **Empty Page**.
4. Name it and click **Submit**. The dialog is titled after the template, such as **New Empty Page**, and also shows the **Class name** and the file **Path** (`lib/pages/` for screens).
5. The screen appears on the board, and Nowa adds a route for it.

{/* CAPTURE: id=design-screens-1 | state: playground starter open, click Screen in the toolbar, highlight a template that has a preview | show: the template picker with the Search for templates box, the Screens and Components tabs, the template list and the preview pane | crop: the picker dialog */}

A new screen is 393 × 808 unless the template sets its own size. A new screen is not your home screen: see [Choose the home screen](#choose-the-home-screen).

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

You can also drag an App Bar, Floating Action Button, Bottom Navigation Bar or Drawer widget onto the screen, and it drops into its slot.

**Size** only changes how big the screen looks on the board. Your app fills the real device. See [Design for every screen size](responsive.md).

{/* CAPTURE: id=design-screens-2 | state: playground starter open, click the title of the home screen, scroll Details down to the Screen section | show: Details for a selected screen: the name with the pencil and Open in New Tab buttons, Add description, and the Screen section with Color, the slots, Size, Route Settings and the home screen line | crop: the Details panel */}

Other sections of **Details**, such as **Group** and **Safe Area**, control the content inside. See [Lay out widgets](layout.md) and [Change widget properties](properties.md). A screen is a widget with the **Screen** wrapper. Remove the wrapper and it becomes a component.

## Name the route

**Route Settings**, in the **Screen** section, sets how this screen is addressed in your app. It appears in projects that use go_router, the default for new projects.

1. Click the **Path** field and type a path, such as `/settings`. Press <kbd>Enter</kbd>. The field's hint shows the default: the screen name in lowercase words joined by hyphens, for example `/home-page`.
2. To pass data in the address, expand **Route Parameters** and click **+** (**Add Route Parameter**).
3. Type a **Param name**, link it to one of the screen's params with the link button, and set a **Default value** if you like.

The route icon next to **Route Settings** (**Open Router Editor**) opens the router. See [Navigate between screens](../logic/navigation.md).

## Choose the home screen

The home screen is the one your app opens on.

1. Select the screen.
2. Click **Make home screen**, at the bottom of the **Screen** section.

The current home screen shows **This is the home screen** instead of the button. Its title on the board and its row in the [Outline](outline.md) show a home icon.

## Rename, describe, copy and open

- **Rename.** Double-click the title on the board, type the new name and press <kbd>Enter</kbd>. Or click the pencil (**Rename**) next to the name in **Details**. Nowa updates every place that uses the screen. Renaming from **Details** also renames the file.
- **Add description.** Click **Add description** under the name in **Details**, write a short note, then click **Back to fields**. Teammates and Nowa AI can read it.
- **Copy as new widget.** Right-click the screen and choose **Copy as new widget**, name it and click **Submit**. You get a separate copy in a new file. Copy and paste only adds another board item that shows the same screen.
- **Open in new tab.** Hover the title and click **Open in new tab**, or select the screen and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>I</kbd>. The screen opens on its own, with the **Outline** floating at the top left. Click the dimmed **Board** chip in the top bar to go back.

## Delete a screen

Right-click a screen on the board and choose **Remove** to take it off the board. Its file stays in your project.

To delete the screen itself, open the **Widgets** panel, choose **Page**, right-click the screen and choose **Delete**. If other places use it, Nowa lists them and asks you to confirm. See [Build reusable components](components.md#manage-screens-and-components).
