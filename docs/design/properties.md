---
title: Change widget properties
description: Edit a widget's color, size, text and spacing in the Details panel, link values to your data, reset them, and wrap widgets with Add Wrapper.
sidebar_label: Widget properties
keywords: [details panel, properties panel, properties, property editor, fields, inspector, edit widget, link property, reset to default, set to null, mixed, advanced options, add wrapper, intro to wrappers, wrapper, wrappers, reorder wrappers, padding, visibility, gesture detector, scroll view]
---

Select a widget and **Details** lists every property you can change, from its color and spacing to its text and events. Edit a value and the board follows as you type. Link a property to your data when it should change while your app runs.

## Open the Details panel

**Details** floats at the top right of the board, under **Variables**. Select a widget on the board or in the [Outline](outline.md) and its properties appear. Click the title bar to collapse the panel, and drag its left edge to resize it. It isn't shown in code mode.

With nothing selected, **Details** shows the board's settings. See [Work with boards](boards.md#set-the-board-color-and-grid).

{/* CAPTURE: id=design-properties-1 | state: playground starter open, a Text placed inside the HomePage screen with the Text tool and selected | show: Details with the breadcrumbs, the widget name and Create a component button, the Layout section, the Text section (Text, Text Align, Text Direction, Overflow, Style) and the Add Wrapper button | crop: right Details panel */}

From top to bottom, **Details** shows:

| Section | What it holds |
|---|---|
| Breadcrumbs | The path from the screen or component to your selection. Click a name to select that parent. |
| Name | The widget's name. Plain widgets have a **Create a component** button. Screens and components have **Rename**, **Open in New Tab** and **Add description** instead. See [Build reusable components](components.md). |
| **Layout** | Position and size. See [Lay out widgets](layout.md). |
| The widget's own properties | A **Text** lists **Text**, **Text Align**, **Text Direction**, **Overflow** and **Style**. Every widget lists its own. |
| One section per wrapper | See [Add a wrapper](#add-a-wrapper). |
| **Add Wrapper** | The button at the bottom. |

Select several widgets and the name reads **Widget x N**. A property where their values differ shows **Mixed**, and a change you make applies to all of them.

If a widget shows a **Kept as code** box, Nowa couldn't load it and shows a placeholder instead. The box says why. See [What Nowa can show on the board](../code/limitations.md).

## Edit a value

Each property has an editor that fits what it holds. Type a value, then press <kbd>Enter</kbd> or click away. Every change can be undone. See [Undo and redo](select-and-edit.md#undo-and-redo).

| The property holds | The editor |
|---|---|
| Text | A text box. Long texts, such as a **Text** widget's **Text**, grow to several lines. Type `$` to put a value inside the text. See [Expressions and conditions](../logic/expressions.md#dollar). An empty box shows `null`. |
| A number | A number box that shows `-` when empty. Drag its left edge sideways to change the value. Some have a minimum, such as 0 for padding. |
| True or false | A switch. |
| A color | A swatch with a HEX box and an opacity box. Click the swatch to open the picker. A **Container**'s picker also offers **Solid**, **Linear**, **Radial** and **Sweep**. To follow your theme, see [Use theme colors and text styles](theme-styles.md). |
| A text style | The **Style** button. See [Use a theme text style](theme-styles.md#use-a-theme-text-style). |
| An icon | A button with the icon and its name. See [Choose an icon](fonts-icons.md#choose-an-icon). |
| An image, video or animation | Tabs such as **Network**, **Asset** and **Bytes**, and buttons such as **Pick Image**. See [Images, videos and other files](assets.md). |
| Padding | Two boxes, for horizontal and vertical space. Click **Individual padding** for left, top, right and bottom. |
| Alignment | Two sliders, **X** and **Y**, from -1 to 1. Rows and columns use a 3 × 3 grid. See [Lay out widgets](layout.md). |
| A choice | A dropdown of the allowed values. |
| An event | **+** creates the logic and **Edit** reopens it. See [Respond to taps and other events](../logic/events.md). |
| A widget | A button with the widget's name. Click it to pick another widget. The brush button next to it selects the widget inside. |
| A list | A header with the number of items, and a **+** when you hover it. Drag the handle at the left of a row to reorder. **Load More** shows items past the first ten. |
| An object, such as **Border**, **Radius** or **Shadows** | A header with the property's name. Hover it to show **+** (create the object) or a button that removes it. Its fields sit underneath, and the arrow folds them away. |

Some editors end with **Show advanced options**. Click it for the rarely used properties, and click **Hide advanced options** to fold them away.

## Link a property to your data

When a property should follow a variable, a param or a calculation instead of a fixed value, link it.

1. Click the property's name, not its value. The link menu opens, titled **Link** plus the property's name.
2. Pick a variable, a param, a function or an expression. The property now shows the name of what it's linked to.
3. To go back to a fixed value, click the name again and choose **Detach...**.

The menu can also create a param or a variable on the spot (**Create Param...**, **Create Variable...**) and open a formula editor (**Custom Expression...**). All of it is covered in [Expressions and conditions](../logic/expressions.md#link-menu).

## Reset a property

Right-click a property and choose **Reset to default**. Nowa removes your value, so the widget uses its own default. A property that must have a value gets a starter value instead.

**Set to null** also appears for properties that are allowed to be empty. It empties the property on purpose. Both can be undone.

## Add a wrapper {#add-a-wrapper}

A wrapper is a widget that goes around another widget to add a look or a behavior, such as space around it, a tap, or scrolling. The widget itself stays as it is.

1. Select one widget on the board or in the [Outline](outline.md).
2. Click **Add Wrapper** at the bottom of **Details**. A search box opens with the hint **Search for a wrapper**.
3. Type part of a name, such as `pad`, then click a wrapper or press <kbd>Enter</kbd>. The wrapper gets its own section in **Details**.
4. Edit the wrapper's properties there. A new **Padding** starts with 8 on every side.

{/* CAPTURE: id=design-properties-2 | state: playground starter open, a Button added with the Widget tool and selected, Add Wrapper clicked and pad typed in the search box | show: the wrapper search box with Padding highlighted, next to the Details panel with the Button section above Add Wrapper | crop: Details panel and the search box */}

The widget's own section stays at the top, and each wrapper you add comes after the last one. A section lower in the list is outside the ones above it, so order changes the result. With **Padding** listed below **Container**, the space is outside the container's color. Swap them and the space is inside.

- **Reorder.** Hover a wrapper's name and drag the grip that appears. A line shows where it will land.
- **Remove.** Hover the wrapper's name, click **...**, then choose **Remove**. Undo brings it back.

**Add Wrapper** works on one widget at a time, so it is hidden when you select several. There are 32 wrappers, from **Padding** and **Visibility** to **Gesture Detector** and **Scroll View**. [Wrappers](../reference/wrappers.md) lists them all and what each one does.

:::tip Or ask Nowa AI
Select a widget on the board, then ask in **Agent** mode: "Add 16 px of space around this and round its corners." You can check and adjust the result in **Details**. See [Give Nowa AI context](../ai/context.md).
:::

## Next steps

- [Lay out widgets](layout.md): rows, columns, stacks and sizes.
- [Use theme colors and text styles](theme-styles.md): link colors and text to your theme.
- [Expressions and conditions](../logic/expressions.md): everything the link menu can do.
- [Wrappers](../reference/wrappers.md): all 32, with what each one does.
