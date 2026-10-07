---
title: Wrappers
description: The 32 wrappers you can add around a widget with Add Wrapper, what each one does, and how to add, reorder and remove them.
keywords: [wrapper, wrappers, add wrapper, wrapper list, wrapper picker, padding, visibility, opacity, gesture detector, scroll view, scrollview, material, text direction, clip radius, transform, align, safe area, ink well, tooltip, badge, dismissible, refresh indicator, form wrapper, data builder wrapper, notifier builder, aspect ratio, animated container, fractional sized box, directionality, single child scroll view, inkwell, color filtered, default text style, gesture, swipe to dismiss, pull to refresh, wrap a widget]
---

A wrapper is a widget that goes around another widget to add one thing: space, a tap, a fade, scrolling. Nowa has 32 of them. Each gets its own section in **Details**, so you set it up like any other widget.

## Add a wrapper

1. Select one widget on the board or in the **Outline**.
2. In **Details**, scroll to the bottom and click **Add Wrapper**. A list opens with the hint **Search for a wrapper**.
3. Type to filter the list, then click a wrapper or press <kbd>Enter</kbd>.
4. Set up the wrapper in its own section, below the widget's own settings.

**Add Wrapper** shows only when exactly one widget is selected. Width, height and position inside a Stack aren't in this list: set them under **Layout** in **Details**, as described in [Lay out widgets](../design/layout.md). The rest of **Details** is covered in [Change widget properties](../design/properties.md).

## Reorder wrappers

Order changes the result. In **Details**, the widget's own section comes first, then its wrappers, starting with the one closest to the widget. Each new wrapper goes around the ones you already have, so it appears at the bottom.

For example, a **Padding** below a **Container** adds space around the colored box. Above it, the space sits inside the box.

To move a wrapper, hover over its section header and drag the grip icon (six dots) up or down. A colored line shows where it will land.

## Remove a wrapper

Hover over the wrapper's section header, click the **...** button and choose **Remove**. The widget stays, and only the wrapper goes. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> to undo adding, moving or removing a wrapper.

## All wrappers

The names are the ones the **Add Wrapper** list shows. They are grouped here by what they do.

### Space, size and position

| Wrapper | What it does |
|---|---|
| <a id="padding"></a>**Padding** | Adds empty space around the widget. Starts at 8 on every side. On a Group, the first Padding shows in the Group's own **Padding** row, not as a separate section. |
| <a id="align"></a>**Align** | Places the widget inside the space it is given. Starts centered. Move it with the **Alignment** sliders. |
| <a id="constrained-box"></a>**Constrained Box** | Limits how small or how large the widget can be, with **Constraints**. |
| <a id="fractionally-sized-box"></a>**Fractionally Sized Box** | Sizes the widget as a fraction of the space it is given, with **Width Factor** and **Height Factor**. |
| <a id="aspect-ratio"></a>**Aspect Ratio** | Keeps the widget at a fixed width-to-height ratio. Starts at 1, a square. |
| <a id="fitted-box"></a>**Fitted Box** | Scales and positions the widget to fit the space it is given, with **Fit** and **Alignment**. |
| <a id="intrinsic-height"></a>**Intrinsic Height** | Makes the widget as tall as its content naturally is. |
| <a id="intrinsic-width"></a>**Intrinsic Width** | Makes the widget as wide as its content naturally is. |
| <a id="safe-area"></a>**Safe Area** | Keeps the widget clear of notches, rounded corners and system bars. Choose the sides under **Show advanced options**. |

### Look and effects

| Wrapper | What it does |
|---|---|
| <a id="container"></a>**Container** | Wraps the widget in a Container, with the same settings as the [Container widget](./widgets/index.md#container): fill, border, rounded corners, shadow, padding and margin. Starts with a gray fill. |
| <a id="opacity"></a>**Opacity** | Makes the widget see-through. 0 is invisible and 1 is fully visible. Starts at 0.5. |
| <a id="clip-radius"></a>**Clip radius** | Rounds the widget's corners and cuts off anything that sticks out. Set **Border Radius**. |
| <a id="transform"></a>**Transform** | Rotates, scales or moves the widget. Starts with a rotation applied. |
| <a id="color-filter"></a>**Color Filter** | Recolors the widget with a color and a blend mode. Starts gray. |
| <a id="material"></a>**Material** | Gives the widget a Material surface with a **Color**, an **Elevation** (which casts a shadow) and a **Border**. |
| <a id="badge"></a>**Badge** | Adds a small badge, such as a count, to the corner of the widget. Starts with the label "99". |
| <a id="animated-container"></a>**AnimatedContainer** | A container that animates when its properties change, like the [AnimatedContainer widget](./widgets/index.md#animated-container). Starts with a 300 ms **Duration** and a gray fill. |

### Touch and motion

| Wrapper | What it does |
|---|---|
| <a id="gesture-detector"></a>**Gesture Detector** | Makes the widget react to touch. **On Tap**, **On Secondary Tap**, **On Double Tap** and **On Long Press** are in **Details**, and more are under **Show advanced options**. See [Respond to taps and other events](../logic/events.md). |
| <a id="ink-well"></a>**Ink Well** | Adds a ripple when the widget is tapped. Set **On Tap** and the ripple colors. |
| <a id="dismissible"></a>**Dismissible** | Lets people swipe the widget away. **On Dismissed** runs when it is gone. |
| <a id="refresh-indicator"></a>**Refresh Indicator** | Adds pull-to-refresh. **On Refresh** runs when someone pulls down. |
| <a id="interactive-viewer"></a>**Interactive Viewer** | Lets people pan and zoom the widget. |
| <a id="tooltip"></a>**Tooltip** | Shows a short text hint when people hover over or long-press the widget. Starts with the message "Tooltip message". |

### Show, hide and scroll

| Wrapper | What it does |
|---|---|
| <a id="visibility"></a>**Visibility** | Shows or hides the widget. Link **Visible** to a true or false value to switch it from logic. **Replacement** is a widget to show while it is hidden. See [Expressions and conditions](../logic/expressions.md#visibility). |
| <a id="scrollview"></a>**Scroll View** | Makes the widget scrollable when it is bigger than the space it has. Set **Scroll Direction** to the way the content should scroll. See [Lay out widgets](../design/layout.md#scroll-or-wrap-content). |

### Text and language

| Wrapper | What it does |
|---|---|
| <a id="text-direction"></a>**Text Direction** | Sets whether everything inside reads left to right (`ltr`, the default) or right to left (`rtl`), for languages such as Arabic and Hebrew. See [Languages and right-to-left text](../design/localization.md#show-text-right-to-left). |
| <a id="default-text-style"></a>**Default Text Style** | Sets the default text style for the Text widgets inside it, such as font, size and color. |

### Data and logic

| Wrapper | What it does |
|---|---|
| <a id="data-builder"></a>**Data Builder** | Loads data from a source and gives it to the widget inside, with a loading state and an error state. See [Show data in your UI](../integrations/show-data.md). |
| <a id="notifier-builder"></a>**Notifier Builder** | Rebuilds the widget inside it when a notifier you pick changes. See [Share data across your app](../logic/global-state.md#rebuild-only-part-of-a-screen). |

### Forms and screen parts

| Wrapper | What it does |
|---|---|
| <a id="form"></a>**Form** | Groups form fields so you can check them together. Nowa creates a `formKey` variable for it. See [Text fields and forms](./widgets/forms.md). |
| <a id="screen"></a>**Screen** | Wraps the widget in a screen frame, with slots for **App Bar**, **Drawer**, **Floating Action Button** and **Bottom Navigation Bar**. |
| <a id="drawer"></a>**Drawer** | Wraps the widget in a Drawer, the side menu that slides in over a screen. Like the [Drawer widget](./widgets/index.md#drawer). |

:::tip Or ask Nowa AI
Select a widget and ask in **Agent** mode: "Make this column scrollable." Then look in **Details** to see what changed.
:::

## Next steps

- [Change widget properties](../design/properties.md) in **Details**.
- [Widget catalog](./widgets/index.md) lists every widget you can add.
- [Lay out widgets](../design/layout.md) with groups, rows and columns.
