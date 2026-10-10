---
title: Lists and grids
description: Show a scrolling list or grid that repeats one item design for every entry in a list, build one by hand, or add a deck of swipeable cards.
sidebar_label: Lists and grids
keywords: [list view, listview, grid view, gridview, builder, normal, item builder, item count, element, separator, connect list, repeat widget, scrolling list, swipeable stack, swipe cards, tinder cards, card swiper, placeholder]
---

A **List View** or **Grid View** repeats one item design for every entry in a list. You design the item once, connect a list, and Nowa fills the screen. A **Swipeable Stack** does the same with a deck of cards that people swipe away.

## Choose Builder or Normal

Both widgets have a **Type** switch in **Details**.

| Type | Use it for | How it works |
|---|---|---|
| **Builder** | Items that come from a list, such as products, messages or search results. | You design one item. Nowa repeats it **Item Count** times. A new List View or Grid View starts here. |
| **Normal** | A fixed set of different widgets, such as a settings menu. | You add each widget yourself under **Children**. |

## Add a List View {#list-view}

1. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, search for `list view`, check the highlighted result and press <kbd>Enter</kbd>. It starts as a **Builder** with three placeholder items.
2. Click the **Item Builder** button and choose **Pick Widget**. Pick a built-in widget or one of your own [components](../../design/components.md).
3. Select the item on the board or in the [Outline](../../design/outline.md) and design it like any widget.
4. Type a number in **Item Count** to see the list with more or fewer items.
5. Choose a **Separator**: **None**, **Fixed Spacing** (then set **Spacing**) or **Widget**, which adds a **Divider** you can restyle.

![Details for a List View placed on the home screen: the Layout section (L, T, R, B, W, H and the alignment grid), then the List View settings. The Type switch (Normal, Builder), the List button reading Connect, Item Count, Item Builder and Separator are highlighted, with the scroll settings (Scroll Direction, Reverse, Shrink Wrap, Padding, Physics) below.](/img/docs/reference/reference-lists-1.png)

If the list sits in a Column, set its height to **Expand** in **Layout** so it fills the space that is left. See [Lay out widgets](../../design/layout.md).

## Fill a list from your data {#connect-a-list}

1. Get a list to show. It can be a list variable (tick **As List**, see [Store data in variables](../../logic/variables.md)), or the result of a request or query (see [Show data in your UI](../../integrations/show-data.md)).
2. Select the List View. In **Details**, make sure **Type** is **Builder**, then click **List**. It reads **Connect**.
3. Open **LOCALS** and click your list. **List** now shows its name, and **Item Count** follows the list's length.
4. Select a widget inside the item. Click the label of a property, open **LOCALS** and click `element`, the entry the item is showing. If `element` is a model, pick one of its fields. `index` is the entry's position, starting at 0.

To stop following the list, click the detach icon next to its name.

A [component](../../design/components.md) makes a good item. Give it params, use it as the item, and link each param to `element`. See [Pass values to a component](../../logic/parameters.md#pass-values-to-a-component).

To open a screen when someone taps an item, see [Open a detail screen when a list item is tapped](../../logic/navigation.md#open-a-detail-screen).

## Know what the board shows

On the board, a Builder list or grid shows the first item at full strength and fades the rest. If Nowa can't work out how many items there are, for example because the list has no value yet, the board shows 20.

Press **Play** to see every item at full strength with your real data. See [Play your app on the board](../../test/instant-play.md).

{/* CAPTURE: id=reference-lists-2 | state: playground starter open, a List View on the home screen with Item Count set to 5 | show: the screen on the board with the list: the first item at full strength and the other four faded | crop: the screen on the board */}

## Build a list by hand

1. Click **Normal** next to **Type**.
2. Under **Children**, click **+** to add a widget, or drag a widget onto the list on the board.
3. Drag the entries in **Children** to reorder them.

Switching from **Normal** to **Builder** keeps only the first widget, as the item design. If there is more than one widget, Nowa asks first: **First Widget as Placeholder, Others will be Removed**. Click **Continue** to go on or **Cancel** to rearrange. To keep another widget, drag it to the top of **Children** before you switch. Switching from **Builder** to **Normal** turns the item into the only child.

## Add a Grid View {#grid-view}

A **Grid View** works like a List View. It has the same **Type** switch, **List**, **Item Count** and **Item Builder**, and starts as a **Builder** with two columns and three placeholder items.

Below the item settings, choose how the columns are counted, then set the spacing. These notes assume a grid that scrolls up and down.

| Setting | What it does |
|---|---|
| **Fixed** | You choose how many columns fit across with **Cross Axis Count**. |
| **Max** | You choose the widest an item may be with **Max Cross Axis Extent**. Nowa fits as many columns as the width allows. |
| **Main Spacing**, **Cross Spacing** | The space between rows, and the space between columns. |
| **Main Axis Extent** | A fixed height for every item. |
| **Child Aspect Ratio** | Item width divided by item height. It applies while **Main Axis Extent** is empty. |

To clear **Main Axis Extent**, right-click it and choose **Reset to default**.

## Add swipeable cards {#swipeable-stack}

A **Swipeable Stack** shows cards one on top of another. The user swipes the top card away.

1. Add a **Swipeable Stack**. If Nowa shows **Add Missing Dependencies**, click **Add**. The widget needs the `flutter_card_swiper` package.
2. Nowa adds a variable called `swiperController` and links **Controller** to it.
3. Design the card with **Card Builder**. The stack starts with five cards (**Cards Count**).
4. Set **Displayed Cards**, how many cards show stacked. The board draws at most two. Press **Play** or **Run** to see the real stack.
5. To show a list, click **List** and connect it, as for a List View. `element` is the entry on each card.
6. Choose which directions work with the four arrow buttons of **Allowed Swipe Direction**. Use **Is Loop** to start over after the last card, and **On Swipe**, **On Undo** and **On End** to react.

For buttons that swipe or undo, add a node in Circuit and pick `swiperController` under **LOCALS**. In **Details**, click **+** after it and choose `swipe`, `undo` or `moveTo`.

:::tip Or ask Nowa AI
Try "Show the products list as a grid with two columns. Each card shows the picture, the name and the price." See [How Nowa AI works](../../ai/index.md).
:::

## Next steps

- [Show data in your UI](../../integrations/show-data.md) to fill a list from an API, Supabase or Firestore.
- [Build reusable components](../../design/components.md) to design an item once.
- [Widget catalog](./index.md) for every built-in widget.
