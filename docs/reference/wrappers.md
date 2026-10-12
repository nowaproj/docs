---
title: Wrappers
description: What each of the 32 wrappers does to the widget inside it, when to use it, and how to add, reorder and remove wrappers in Details.
keywords: [wrapper, wrappers, add wrapper, wrapper list, wrapper picker, padding, visibility, opacity, gesture detector, scroll view, scrollview, material, text direction, clip radius, transform, align, safe area, ink well, tooltip, badge, dismissible, refresh indicator, form wrapper, data builder wrapper, notifier builder, aspect ratio, animated container, fractional sized box, directionality, single child scroll view, inkwell, color filtered, default text style, gesture, swipe to dismiss, swipe to delete, pull to refresh, wrap a widget, make a widget tappable, tap, double tap, long press, right-click, ripple, shadow, elevation, see-through, transparency, hide a widget, show a widget, scrollable, content cut off, right to left, rtl, ltr, screen reader]
---

A wrapper goes around a widget and gives it one extra ability, while the widget itself stays as it is. Wrap a product card in a **Gesture Detector** and it opens the product page when tapped. Wrap a long column in a **Scroll View** and people can scroll through it. Nowa has 32 wrappers, and each one gets its own section in **Details**, so you set it up like any other widget.

## Add a wrapper

1. Select the widget on the board or in the **Outline**.
2. In **Details**, scroll to the bottom and click **Add Wrapper**. A search list opens with the hint **Search for a wrapper**.
3. Type part of the name, such as `pad` or `scroll`, then click the wrapper or press <kbd>Enter</kbd>.
4. Set it up in its new section, below the widget's own settings.

**Add Wrapper** shows only when exactly one widget is selected. Feel free to experiment: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> takes a wrapper away again.

Width, height and position aren't in this list. You set them under **Layout** in **Details**, as described in [Lay out widgets](../design/layout.md). The rest of **Details** is covered in [Change widget properties](../design/properties.md).

## Reorder wrappers

Order changes the result, because each wrapper goes around everything above it. In **Details**, the widget's own section comes first, then its wrappers, starting with the one closest to the widget. A new wrapper goes around the ones you already have, so it lands at the bottom.

For example, say a widget has a **Container** wrapper and a **Padding** wrapper. With **Padding** below **Container**, the space sits outside the colored box, like a margin. Move **Padding** above it and the space sits inside the box, between its edge and the content.

To move a wrapper, hover over its section header and drag the grip icon (six dots) up or down. A colored line shows where it will land.

## Remove a wrapper

Hover over the wrapper's section header, click the **...** button and choose **Remove**. Only the wrapper goes: the widget inside stays. Changed your mind? <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes adding, moving or removing a wrapper.

## The wrappers you'll use most

These seven come up again and again. Each section says what the wrapper does, when to reach for it, and what its settings mean.

### Padding {#padding}

**Padding** adds empty space around the widget, so its content doesn't touch the edges of the screen or its neighbors. A little space goes a long way: text is easier to read, related items look like they belong together, and buttons with room around them are easier to tap without hitting the wrong one.

- It starts at 8 on every side. The first field sets the space on the left and right, the second the space on the top and bottom.
- For a different value on each side, click **Individual padding**, the button next to the fields. You then get left, top, right and bottom. Click it again to go back to two fields.
- Values can't go below 0.
- On a Group, the Padding shows in the Group's own **Padding** row instead of in a section of its own.

Where you put it matters: inside or outside a colored box gives a different look. See [Reorder wrappers](#reorder-wrappers).

### Scroll View {#scrollview}

**Scroll View** lets people scroll through a widget that's bigger than the space it has. Without it, whatever doesn't fit is cut off and nobody can reach it. That's a common surprise when content loaded from your data grows longer than the screen.

Use it for a long form, an article, a settings screen, or a row of cards that people swipe through sideways. Add it to the widget that holds the content, usually a Column, or a Row for sideways scrolling. Then click the screen's title and **Play** to scroll through it the way your users will.

| Setting | What it does |
|---|---|
| **Scroll Direction** | `vertical` (the default) scrolls up and down, for a Column. Pick `horizontal` for a Row that scrolls sideways. |
| **Reverse** | Starts at the bottom (or at the end, when scrolling sideways) instead of the top. Handy for a chat, where the newest messages sit at the bottom. |
| **Padding** | Space between the edges of the scrolling area and the content. |
| **Physics** | How scrolling feels: `BouncingScrollPhysics` bounces back at the ends (iPhone style), `ClampingScrollPhysics` stops there (Android style), `NeverScrollableScrollPhysics` turns scrolling off and `AlwaysScrollableScrollPhysics` scrolls even when everything fits. Empty means each platform's usual feel. |
| **Keyboard Dismiss Behavior** | Pick `onDrag` to hide the on-screen keyboard as soon as someone starts scrolling, which helps on a long form. |

The other settings, such as **Primary** and **Restoration Id**, are for special cases, so you can leave them as they are. Inside a Scroll View, **Expand** isn't offered in the scrolling direction, because a scrolling area has no fixed end to fill. For a long list built from your data, a [List View](./widgets/lists.md) is often the better choice: it scrolls on its own and repeats one item design.

### Gesture Detector {#gesture-detector}

**Gesture Detector** makes any widget respond to touch, so a picture, a card or a line of text can work like a button. It has no look of its own: nothing changes on screen when someone taps, your logic runs. If you'd like a ripple as feedback, use **Ink Well** instead.

| Event | Runs when someone... | For example |
|---|---|---|
| **On Tap** | taps once | open a product page from its card |
| **On Double Tap** | taps twice quickly | like a photo, or zoom into it |
| **On Long Press** | presses and holds | show more options for an item |
| **On Secondary Tap** | right-clicks with a mouse | open your own menu on the web or desktop |

Click the **+** next to an event to create its logic. [Circuit](../logic/circuit.md) opens, and you add the steps that should happen. Afterwards the button reads **Edit**, so you can come back to it. [Respond to taps and other events](../logic/events.md) walks through an example.

**Show advanced options** lists many more events, such as a sideways swipe (**On Horizontal Drag End**) or a pinch (**On Scale Update**). On the board, a click selects the widget, so try your gestures with **Play**.

### Visibility {#visibility}

**Visibility** shows or hides a widget. Link it to a true or false value and your logic decides, so each screen shows only what matters right now: a sign-out button only when someone is signed in, an error message only when something went wrong, a "Your cart is empty" note only when it is.

- **Visible**: on shows the widget, off hides it. A hidden widget takes up no space, so the widgets around it close the gap. Click the **Visible** label to link it to a variable or a condition.
- **Replacement**: a widget to show in its place while it's hidden, such as a placeholder or a loading spinner. It's empty by default, so nothing shows.

For the full steps, including the logic that switches it, see [Show or hide a widget](../logic/expressions.md#visibility).

### Opacity {#opacity}

**Opacity** makes a widget see-through. Set **Opacity** from 0 (invisible) to 1 (fully visible). It starts at 0.5, half see-through. Use it for a faded watermark or background picture, or a button that looks dimmed while it can't be used yet.

- The value doesn't animate: a new value shows right away. To fade smoothly from one widget to another, use the [Cross Fade](./widgets/index.md#cross-fade) widget.
- At 0 the widget is invisible, but it still takes up its space and still reacts to taps. To remove something from view completely, use [Visibility](#visibility).
- Screen readers, the spoken feedback that blind and low-vision people rely on, skip a widget at 0. Turn on **Always Include Semantics** if they should still read it out.

### Material {#material}

**Material** puts the widget on a surface with its own color and shadow, like a card lifted off the page. It's also the surface that **Ink Well** ripples are drawn on.

| Setting | What it does |
|---|---|
| **Color** | The surface color. Leave it empty to use your theme's surface color. |
| **Elevation** | How high the surface floats. Above 0 it casts a shadow, and a higher number means a bigger shadow. |
| **Shadow Color** | The color of that shadow. |
| **Tint Color** | A color laid over the surface. The higher the **Elevation**, the more it shows. |
| **Border** | An outline, with **Border Radius** for rounded corners. Hover it and click **+** to add one: it starts as a thin black line. |
| **Border On Foreground** | On (the default) draws the border over the content. Off draws it behind. |

No ripple when you tap an **Ink Well**? A filled widget, such as a Container with a color, covers it, because ripples are drawn on the Material surface underneath. Take the color off the widget, add a **Material** wrapper below the **Ink Well** in **Details**, and give the Material that color instead.

### Text Direction {#text-direction}

**Text Direction** sets the reading direction for everything inside it. Pick `rtl` (right to left) for languages such as Arabic and Hebrew, or keep `ltr` (left to right), the default.

It does more than move text: rows inside it also lay out their widgets from right to left, so a whole section mirrors itself. Add it to a screen's main widget to flip the whole screen. A single Text widget also has its own **Text Direction** setting. See [Languages and right-to-left text](../design/localization.md#show-text-right-to-left).

## All wrappers

Every wrapper in the **Add Wrapper** list, with the name the list shows, grouped by what it does.

### Space, size and position

| Wrapper | What it does |
|---|---|
| **Padding** | Adds empty space around the widget. See [Padding](#padding). |
| <Anchor id="align" />**Align** | Places the widget inside the space it's given. It starts centered: move it with the **Alignment** sliders, for example to push a button into a corner of a card. |
| <Anchor id="constrained-box" />**Constrained Box** | Sets the smallest and largest size the widget may take, with **Constraints**. Use it to stop a card from stretching too wide on a big screen. |
| <Anchor id="fractionally-sized-box" />**Fractionally Sized Box** | Sizes the widget as a share of the space it's given, with **Width Factor** and **Height Factor**: 0.5 is half. Use it for a button that's always half as wide as the screen. |
| <Anchor id="aspect-ratio" />**Aspect Ratio** | Keeps the widget at a fixed width-to-height ratio, whatever its width. It starts at 1, a square, and 2 is twice as wide as it is tall. |
| <Anchor id="fitted-box" />**Fitted Box** | Scales the widget up or down to fit the space it's given, with **Fit** and **Alignment**. Use it to shrink a long title so it stays on one line. |
| <Anchor id="intrinsic-height" />**Intrinsic Height** | Makes the widget as tall as its content naturally is. |
| <Anchor id="intrinsic-width" />**Intrinsic Width** | Makes the widget as wide as its content naturally is. |
| <Anchor id="safe-area" />**Safe Area** | Keeps the widget clear of notches, rounded corners and the phone's system bars. Choose the sides under **Show advanced options**. New screens already wrap their content in one. |

### Look and effects

| Wrapper | What it does |
|---|---|
| <Anchor id="container" />**Container** | Puts the widget in a box with the same settings as the [Container widget](./widgets/index.md#container): fill, border, rounded corners, shadow, padding and margin. It starts with a gray fill. Use it to turn plain text into a colored tag. |
| **Opacity** | Makes the widget see-through, from 0 (invisible) to 1. See [Opacity](#opacity). |
| <Anchor id="clip-radius" />**Clip radius** | Rounds the widget's corners and trims anything that sticks out. Set **Border Radius**. Use it for photos with rounded corners. |
| <Anchor id="transform" />**Transform** | Rotates, scales or moves the widget without changing the space it takes. It starts with a rotation applied. Use it to tilt a sticker or a label. |
| <Anchor id="color-filter" />**Color Filter** | Recolors the widget by blending a **Color** over it with a **Blend Mode**. It starts gray. |
| **Material** | A surface with its own color, shadow and border, where ripples show. See [Material](#material). |
| <Anchor id="badge" />**Badge** | Adds a small badge to the corner of the widget, such as an unread count on a bell icon. It starts with the label "99". |
| <Anchor id="animated-container" />**AnimatedContainer** | A box that animates smoothly when its settings change, such as its color or size, like the [AnimatedContainer widget](./widgets/index.md#animated-container). It starts with a 300 ms **Duration** and a gray fill. |

### Touch and motion

| Wrapper | What it does |
|---|---|
| **Gesture Detector** | Makes the widget respond to taps, double taps, long presses and more. See [Gesture Detector](#gesture-detector). |
| <Anchor id="ink-well" />**Ink Well** | Like **Gesture Detector**, with a ripple when the widget is tapped. Set **On Tap** and the ripple colors, such as **Splash Color**. No ripple? See the tip under [Material](#material). |
| <Anchor id="dismissible" />**Dismissible** | Lets people swipe the widget away, for example to delete an item from a list. **On Dismissed** runs when it's gone: remove the item from your list there, or you'll see an error when you test. **Direction** sets which way it swipes, and **Background** shows behind it as it slides. |
| <Anchor id="refresh-indicator" />**Refresh Indicator** | Adds pull-to-refresh: people pull down to reload, and **On Refresh** runs. It needs a scrolling widget inside, such as a List View or a Scroll View. |
| <Anchor id="interactive-viewer" />**Interactive Viewer** | Lets people pan and zoom the widget with their fingers. Use it for a floor plan or a photo people want to see up close. |
| <Anchor id="tooltip" />**Tooltip** | Shows a short hint when people hover over the widget with a mouse or long-press it. It starts with the message "Tooltip message". Use it to explain a button that only has an icon. |

### Show, hide and scroll

| Wrapper | What it does |
|---|---|
| **Visibility** | Shows or hides the widget, switched by your logic. See [Visibility](#visibility). |
| **Scroll View** | Lets people scroll through content that's bigger than its space. See [Scroll View](#scrollview). |

### Text and language

| Wrapper | What it does |
|---|---|
| **Text Direction** | Left to right or right to left, for everything inside. See [Text Direction](#text-direction). |
| <Anchor id="default-text-style" />**Default Text Style** | Sets a starting text style, such as font, size and color, for every Text widget inside it. Settings a Text sets itself win. Use it to make all the text on a card one color in one go. |

### Data and logic

| Wrapper | What it does |
|---|---|
| <Anchor id="data-builder" />**Data Builder** | Loads data, for example from an API or a database query, and hands it to the widget inside, with something to show while it loads and if it fails. See [Show data in your UI](../integrations/show-data.md). |
| <Anchor id="notifier-builder" />**Notifier Builder** | Redraws only the widget inside it when a notifier you pick changes. A notifier is shared data that announces its changes, such as a global state. See [Share data across your app](../logic/global-state.md#rebuild-only-part-of-a-screen). |

### Forms and screen parts

| Wrapper | What it does |
|---|---|
| <Anchor id="form" />**Form** | Groups the text fields, dropdown menus and pin code fields inside it, so you can check them all at once, for example before sending a sign-up. Its section lists each field's validator: the rules a field's text must pass. Nowa also creates a `formKey` variable, which your logic uses to run the check. See [Text fields and forms](./widgets/forms.md). |
| <Anchor id="screen" />**Screen** | Turns the widget into a full screen, with slots for **App Bar**, **Drawer**, **Floating Action Button** and **Bottom Navigation Bar**. |
| <Anchor id="drawer" />**Drawer** | Turns the widget into a drawer, the side menu that slides in over a screen, like the [Drawer widget](./widgets/index.md#drawer). |

:::tip Or ask Nowa AI
Select a widget and ask in **Agent** mode, for example: "Make this column scrollable" or "Hide this button when the cart is empty." Then look in **Details** to see which wrapper it added and how it's set up.
:::

## Next steps

- [Change widget properties](../design/properties.md) in **Details**.
- [Widget catalog](./widgets/index.md) lists every widget you can add.
- [Lay out widgets](../design/layout.md) with groups, rows and columns.
