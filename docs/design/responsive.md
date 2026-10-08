---
title: Design for every screen size
description: Build one layout that stretches and flows to fit phones, tablets and browsers, then check it at other sizes. Nowa has no breakpoints.
sidebar_label: Responsive design
keywords: [responsive, responsive design, make screen responsive, breakpoints, screen size, device size, adaptive layout, tablet, desktop, phone, landscape, orientation, media query, expand, constraints, device preview, play settings, free size, placeholder values]
---

Your app opens on a small phone, a tablet and a wide browser window. Build the layout so it stretches and flows to fit, then check it at other sizes without leaving the board.

## Nowa has no breakpoints

Nowa has no breakpoints, no setting for a separate phone or tablet layout, and no per-device options in **Details**. Each screen has one layout, so you make that layout flexible. You can still [switch widgets by width](#show-different-widgets-on-wide-and-narrow-screens) yourself.

## Make a layout that adapts

A layout adapts when each part says how it reacts to more or less space. [Lay out widgets](layout.md) explains the tools.

| You want | Do this |
|---|---|
| A widget to fill the width | In a **Column**, set its **W** to **Expand**. In a **Stack**, use **Left and right** constraints. |
| Widgets to share a row | In a **Row**, set **W** to **Expand** on each to split the space equally. A **Fixed** or **Auto** widget keeps its size and the others share the rest. |
| A widget to keep its size | Set **W** and **H** to **Fixed**. In a **Stack**, pin it to an edge or choose **Center**. |
| A widget to fit its content | Set **W** or **H** to **Auto**, offered when the widget has a natural size, such as a text or an icon. |
| Space between widgets to grow | In a **Row** or **Column**, set **Spacing** to **Between**, **Around** or **Evenly**. |
| Widgets to continue on a new line | Use a **Wrap** widget. |
| More columns on wider screens | In a **Grid View**, choose **Max**. It fits as many columns as it can without a tile passing **Max Cross Axis Extent**. |
| Tall content to scroll | Add the [**Scroll View**](../reference/wrappers.md#scrollview) wrapper, or use a **List View**. |

## Try it: make a screen stretch

1. Click the screen's title. In **Details**, find the **Group** section and click the down arrow. The screen's main group becomes a **Column**, with your widgets in the same order and the space between them kept as the **Gap**.
2. Select a text field, a card or a button. Under **Layout**, set **W** to **Expand** so it fills the width. Repeat for other widgets that should stretch, and leave small things, such as icons, alone.
3. Click the screen's title and set **Size** to **1920x1080**, then to a phone preset such as **iPhone 12**. The widgets follow the width of the screen.

## Check your layout at other sizes

**On the board.** Click a screen's title and find **Size** in the **Screen** section of **Details**.

| Preset | Size |
|---|---|
| **Pixel 3a** | 393 × 808 |
| **iPhone 11 Pro** | 375 × 812 |
| **Galaxy S20+** | 384 × 854 |
| **iPhone 12** | 390 × 844 |
| **MacBook Pro** | 1155 × 807 |
| **1920x1080** | 1920 × 1080 |

![The Screen section of Details for the selected home screen with the Size dropdown open (highlighted): Pixel 3a, iPhone 11 Pro, Galaxy S20+, iPhone 12 (the current choice), MacBook Pro and 1920x1080. The Color, App Bar, Drawer, Floating Action Button and Bottom Navigation Bar rows are partly behind the list.](/img/docs/design/design-responsive-1.png)

A new screen starts at 393 × 808 unless its template sets another size. For any other size, drag a corner of the screen or type **W** and **H** under **Layout**, and swap them to try landscape. **Size** only changes how big the screen looks on the board. Your app fills whatever device it runs on.

To compare two sizes at once, select the screen's title, press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, point at empty board space and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>. Give the copy another **Size**. Both items show the same screen, so every edit appears in both.

{/* CAPTURE: id=design-responsive-2 | state: playground starter open, HomePage title selected, Ctrl/Cmd+C, click empty board space to the right, Ctrl/Cmd+V, then the copy's Size set to MacBook Pro | show: the same screen twice on the board, one at phone size and one at MacBook Pro size, each with its title bar | crop: the board */}

Hover a screen's title and click **Play** to tap and scroll at its current size. See [Play your app on the board](../test/instant-play.md).

**In a device frame.** In a cloud project, play a screen, click **Share preview**, then the **Open in browser** icon. On a computer, the preview page has a toolbar. Click **Device Settings** to open **Play Settings**.

- **Device Size**: pick a device by platform, listed with its size. The **Custom** tab takes a **Width**, **Height** and **Pixel ratio**.
- **Free Size**: drops the frame, so the app fills the window. Resize the window to watch the layout react.
- **Orientation**: rotates devices that can rotate.

**Full Screen** in the same toolbar opens a bigger view with a **Device** panel. See [Share your app](../test/share.md#what-people-see-in-a-preview).

**In the real app.** **Run** shows your compiled app in a phone frame. **Phone** / **Tablet** switches frames and **Fullscreen** drops the frame. See [Run your app](../test/run.md) and [Run on a device or emulator](../test/devices.md).

## Design with realistic content

On the board, Nowa fills in values that are still empty, so a design doesn't look blank. Real content is usually longer, so test with it too.

| Empty value | What the board shows |
|---|---|
| Text | The name of the variable or param, in square brackets, such as `[title]` |
| List | Three sample items |
| Image | A stand-in picture |
| Color | Gray |
| Icon | An info icon |
| Widget | A small 48-pixel placeholder box |

To see your own content, give the variable or param a **Default Value**. The board shows it as a real value. See [Store data in variables](../logic/variables.md) and [Pass data with parameters](../logic/parameters.md).

If a **Column**, **Row** or **Stack** repeats a widget for each item of a list, the end of its **Group** section has a **Test** button named after the item type, such as **Test String**. Set how many **Copies** to show and a sample value to preview a long list or long names. **Edit Test** and **Clear** appear afterwards. The test changes only the board.

**Play** uses your app's real values instead of placeholders. See [Placeholders on the board, real values in Play](../test/instant-play.md#placeholders-on-the-board-real-values-in-play).

## Show different widgets on wide and narrow screens

A screen can read its own width, and the [**Visibility**](../reference/wrappers.md#visibility) wrapper shows or hides a widget. Together they switch what shows by width. On the board and in **Play**, a screen's size is the size of its board item, so changing **Size** is a quick way to test.

1. Build both versions, for example a side menu for wide screens and a bar for narrow ones.
2. Select the wide version, click **Add Wrapper** and choose **Visibility**.
3. In the **Visibility** section, click the **Visible** label and choose **Custom Expression...**.
4. Type `MediaQuery.of(context).size.width >= 600` and press <kbd>Enter</kbd>. Use the width where your layout should change instead of 600.
5. Select the narrow version, add **Visibility** the same way and type `MediaQuery.of(context).size.width < 600`.
6. Change the screen's **Size**, then click **Play** to see which version shows.

To pick the width from the menus instead, see [Read the screen size](../logic/actions.md#read-the-screen-size). [Write your own expression](../logic/expressions.md#custom-expression) explains formulas.

:::tip Or ask Nowa AI
Try "Make this screen work on phones and tablets: stretch the fields to the full width and put the cards in a grid that adds columns on wider screens." Then check the result at other sizes. See [Write prompts that work](../ai/prompting.md).
:::

## Next steps

- [Lay out widgets](layout.md): rows, columns, stacks and sizing in detail.
- [Play your app on the board](../test/instant-play.md): tap through a screen at any size.
- [Make screen responsive](../legacy/tutorials/design-responsive.md): an older walkthrough made with an earlier version of Nowa.
