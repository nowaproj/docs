---
title: Navigation bars and screen parts
description: Add an app bar, drawer, floating button and bottom navigation bar to a screen, then switch what the screen shows with an Indexed Stack, Page View, TabView or Cross Fade.
sidebar_label: Navigation bars and screen parts
keywords: [app bar, appbar, drawer, floating action button, floating button, bottom navigation bar, navigation bar, navbar, tab bar, tabs, tabview, page view, indexed stack, cross fade, pageIndex, screen slot, menu, swipe pages, custom app bar]
---

A screen has four places around its body for standard parts: an **App Bar** on top, a **Drawer** at the side, a **Floating Button** over the content and a **Bottom Navigation Bar** at the bottom. Drop one on a screen and Nowa puts it in the right place.

## Add a screen part {#screen-parts}

| Part | What it is | Screen setting in **Details** |
|---|---|---|
| **App Bar** | The bar at the top, with a title and actions. | **App Bar** |
| **Drawer** | A menu that slides in from the side. | **Drawer** |
| **Floating Button** | A button that floats over the content. | **Floating Action Button** |
| **Bottom Navigation Bar** | A row of tabs at the bottom. | **Bottom Navigation Bar** |

1. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and search for the part.
2. Drag it from the list onto the screen. It lands in its own place, not in the body. See [where a dragged widget lands](../../design/select-and-edit.md#where-a-dragged-widget-lands).

You can also select the screen, open its **Screen** section in **Details**, click a slot such as **App Bar** and pick a widget. The same list offers your own components, so a custom header you built can be the app bar. See [Create and set up screens](../../design/screens.md).

{/* CAPTURE: id=reference-navigation-1 | state: playground starter open, an App Bar, a Floating Button and a Bottom Navigation Bar dropped onto the home screen from the widget picker | show: the home screen on the board with the app bar on top, the floating button over the content and the navigation bar at the bottom | crop: the screen on the board */}

## Set up the App Bar {#app-bar}

Select the App Bar on the board, or in the [Outline](../../design/outline.md) under the `appBar` slot.

- **Title** starts as a **Text** that says "Title". Edit that text like any other.
- **Center Title**, **Background**, **Foreground**, **Shadow**, **Elevation** and **Border** change its look.
- **Leading** is a widget at the start, such as a back button. **Actions** are widgets at the end, such as icon buttons. Click **+** next to **Actions** to add one.
- Drop a widget on the left, middle or right part of the App Bar to fill **Leading**, **Title** or **Actions**.
- Under **Show advanced options**, **Automatically Imply Leading** lets Flutter add a back arrow or a menu button for you.

## Add a drawer {#drawer}

A new **Drawer** is empty. In the [Outline](../../design/outline.md), select the Column under the `drawer` slot, then click **+** next to **Children** in the **Group** section of **Details** to add widgets, such as **List Tile** rows with an **On Tap** event.

Press **Play** to try it. While the screen has a drawer, the App Bar shows a menu button that opens it, unless you set **Leading** yourself.

## Add a floating button {#floating-button}

A **Floating Button** starts as a button with a plus icon. Set **Tooltip**, **Background Color**, **Foreground Color**, **Elevation** and **Mini** (a smaller button) in **Details**. Use **On Pressed** to start logic: see [Respond to taps and other events](../../logic/events.md).

To change the icon, select the button and click the icon field in **Details**. See [Choose an icon](../../design/fonts-icons.md#choose-an-icon).

## Add a bottom navigation bar {#bottom-navigation-bar}

1. Drag a **Bottom Navigation Bar** onto the screen. It starts with two tabs, "home" and "call".
2. Nowa adds a variable called `pageIndex`, a whole number that starts at 0. It links **Current Index** to it and fills **On Tap**, so tapping a tab sets `pageIndex` to that tab's number and refreshes the screen.
3. Under **Items**, click a tab to select it. Change its **Label**, or click the brush next to **Icon** and pick another icon in **Details**. Click **+** to copy the last tab. The arrow buttons move the selected tab left or right, and the remove button deletes it. A bar needs at least two tabs: Nowa says "Cannot have less than 2 items".
4. Click **Edit** next to **Unselected** or **Selected** to set that state's **Color**, **Show label** and **style**.

{/* CAPTURE: id=reference-navigation-2 | state: playground starter open, a Bottom Navigation Bar dropped onto the home screen and selected | show: Details for the Bottom Navigation Bar with Current Index showing pageIndex, Unselected and Selected with their Edit buttons, On Tap, and the Items strip with its arrows | crop: right-hand Details panel */}

Removing the bar removes `pageIndex` too, so anything linked to it needs a new value.

To open a different screen when a tab is tapped, add a navigation step to **On Tap**. See [Navigate between screens](../../logic/navigation.md).

## Switch what a screen shows

These widgets show one piece of content at a time.

| Widget | People switch by | Good for |
|---|---|---|
| **Indexed Stack** | Whatever you link to **Index**, such as a bottom navigation bar | The pages behind a bottom navigation bar |
| **Page View** | Swiping sideways | Onboarding steps, photo galleries |
| **TabView** | Tapping a tab | Sections on one screen |
| **Cross Fade** | A value your logic changes | Swapping two states in place |

### Show a page for each tab {#indexed-stack}

1. Add an **Indexed Stack** to the screen body. Make it fill the space above the bar: see [Lay out widgets](../../design/layout.md).
2. Under **Children**, click **+** for each tab. Replace each placeholder with a widget, usually a component: click it and pick from the list.
3. Click the **Index** label, open **LOCALS** and pick `pageIndex`.
4. Press **Play** and tap the tabs.

The first child shows when `pageIndex` is 0, the second when it is 1, and so on. To design another page on the board, change the **Default Value** of `pageIndex` in **Variables**, and set it back afterwards.

### Swipe between pages {#page-view}

1. Add a **Page View**. It starts with two pages and a row of dots near the bottom.
2. In the **Outline**, select the PageView. Under **Children**, click **+** to add a page, then replace each page's widget.
3. Select the dots on the board. Set **Count** to the number of pages and choose a style with **Effect type**.
4. To make the dots follow the pages, create a whole-number variable, link the dots' **Active Index** to it, and open the Page View's **On Page Changed**. Set the variable to `value` and add **refresh**. See [Store data in variables](../../logic/variables.md).

The dots are a separate widget. Nowa doesn't connect them to the pages for you.

### Add tabs {#tabview}

1. Add a **TabView**. It starts with two tabs, "Tab1" and "Tab2", and a text page for each.
2. In the **Outline**, select the TabBar. Under **Tabs**, click **+** to add a tab and edit its text.
3. Select the TabBarView. Under **Children**, click **+** to add a page.
4. Select the TabView's top row in the Outline, open the **TabView Controller** section in **Details** and set **Length** to the number of tabs.

Keep the three numbers equal: **Length**, the tabs and the pages. Flutter shows an error when they differ. **Is Scrollable** on the TabBar helps when there are many tabs.

### Fade between two widgets {#cross-fade}

1. Add a **Cross Fade**. It starts with two placeholder boxes. The Outline can show it as `AnimatedCrossFade`.
2. Click **First Child** and **Second Child** in **Details** and pick a widget for each.
3. Set **Duration**. It starts at 200 milliseconds.
4. To switch while the app runs, click the **Cross Fade State** label, choose **Create Variable...**, and change that variable from an event. See [Store data in variables](../../logic/variables.md).

:::tip Or ask Nowa AI
Try "Add a bottom navigation bar with Home, Search and Profile tabs, and show a different page for each tab." See [How Nowa AI works](../../ai/index.md).
:::

## Next steps

- [Navigate between screens](../../logic/navigation.md) to open other screens from a tap.
- [Create and set up screens](../../design/screens.md) for the rest of a screen's settings.
- [Widget catalog](./index.md) for every widget in the picker.
