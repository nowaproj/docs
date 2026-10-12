---
title: Use theme colors and text styles
description: Link widget colors, text styles and button styles to your theme, so editing the theme restyles every widget that uses it.
sidebar_label: Theme colors and text styles
keywords: [theme colors, colors from theme, text styles, typography, CopyWith, detach, With values, opacity, transparency, button style, dark mode, switch theme, changeTheme, Figma colors]
---

Link a widget's color or text style to your [theme](themes.md) and the widget follows every change you make there. Edit a theme color once, and every widget that uses it updates on the board and in your app.

## Use a theme color

1. Select a widget and click a color swatch in **Details**, for example a Container's **Color**.
2. Below the color picker, click a theme color such as `primary` or `surface`. Click **Show more colors** for container, fixed, surface and outline roles.
3. The field now shows the role's name. When that role changes in the theme, the widget changes with it.

The list shows the colors of your **Active** theme. To change a theme color from here, hover it and click **Edit**. This edits the active theme, so every widget linked to that role updates.

![The color picker opened from the Color swatch of a selected Container: the Solid dropdown, the color field with hue and opacity sliders, and the HEX and OP fields. Below them the theme color list is highlighted: primary, onPrimary, secondary, onSecondary, tertiary, onTertiary, error, onError, surface, onSurface and shadow with their hex values, then the Show more colors link. The Details panel is partly visible behind the popup.](/img/docs/design/design-theme-styles-1.png)

To stop following the theme, click the **x** on the field, or the detach icon next to **Colors From Theme**. The widget keeps its current color as a fixed value.

### Colors from theme extensions

If your project has [theme extensions](themes.md#edit-theme-extensions) with colors, such as a set of brand colors, the list has one tab per extension, named after its class, and a last tab, **Material**. **Material** holds the colors above and **Show more colors**. The picker opens on the tab of the color the field is linked to, on the first extension when the field isn't linked, and on **Material** when it's linked to a Material role.

Pick an extension color and the field shows its name, such as `brand`. In your code the field reads `AppColors.of(context).brand`, or `Theme.of(context).extension<AppColors>()!.brand` if the class has no `of`. Extension colors have no **Edit** button here: change them in the **Themes** panel.

![The color picker opened from the Color swatch of a selected Container, beside the Details panel. Below the Solid dropdown, the color field with hue and opacity sliders and the HEX and OP fields, the theme color list is headed by two tabs, AppColors (open) and Material. The AppColors tab lists brand (#6750A4) and accent (#FF8A00); the tabs and list are highlighted.](/img/docs/design/design-theme-styles-2.png)

## Make a theme color transparent

With a theme color linked, click the property name, for example **Color**, to open its menu, then choose **With values**. Set **Alpha** from 0 (clear) to 1 (solid). **Show more** reveals **Red**, **Green** and **Blue**. The theme color itself doesn't change.

## Use a theme text style

1. Select a Text widget and find **Style** in **Details**. The button shows the style in use, such as `bodyMedium`.
2. Click the button and choose a style in **Text Styles**.
3. To change the style for the whole app, hover it in the list and click **Edit**. This edits the active theme.

If your theme extensions have text styles, **Text Styles** lists them first, each extension's styles under a header with its name, and puts a **Material** header over the usual styles. Without extension text styles there are no headers. Extension styles have no **Edit** button here either.

To change only part of a style on one text, click **Style** (the property name) and choose **CopyWith**. Change the fields that appear. Everything you leave alone still follows the theme. **Remove CopyWith** goes back to the plain theme style. On a text that still uses the default style, the menu item is **Modify Style** instead.

To cut the text loose from the theme, click the **x** on the style button. The style becomes your own and starts empty, so set the fields you need.

## Connect buttons to the theme

A new **Button** or **Icon Button** already follows the theme: its **Button Style** shows **Button Theme** or **Icon Button Theme**. Change those styles in the theme under **Widgets** → **Buttons**. See [Create and edit themes](themes.md#style-text-fields-and-buttons).

- To give one button its own look, click the **x** on **Button Style**, then set **Background Color**, **Foreground Color**, **Shadow Color**, **Elevation**, **Side** and **Radius**.
- To go back, click **Button Style** (it now reads **Connect...**) and choose **Default theme** in **Connect to Theme**.

If no theme is applied to your app yet, clicking **Button Style** opens **Create Theme Setup** instead. See [Add themes to a project that has none](themes.md#add-themes-to-a-project-that-has-none).

## Switch themes while the app runs

New projects include a global state called `AppState` with a `changeTheme` function. Call it from an event and the running app switches theme, for example between `lightTheme` and `darkTheme`. The app doesn't follow the device's dark mode by itself, so this is how you add a dark mode switch.

1. Select a Button on a screen and click the button next to **On Pressed**. It reads **Edit** on a new button, or **+** if the button has no action yet. [Circuit](../logic/circuit.md) opens.
2. Hover the dot under the top node, click **+**, open **GLOBALS** and click `AppState`.
3. In the node's **Details**, click **+** and choose `changeTheme`.
4. For **Theme**, click **Select theme** and choose a theme under **THEMES**, such as `darkTheme`.

Run your app and tap the button to see the switch. For more on global states, see [Share data across your app](../logic/global-state.md).

## Bring in a theme from Figma

With the Figma connection on, ask Nowa AI to use your Figma colors and text styles as the theme. It writes them into theme files under `lib/globals/` and reloads your themes. Connect Figma first: see [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).

:::tip
Or ask Nowa AI: "Make all my buttons use the secondary color from the theme."
:::

## Next steps

- [Create and edit themes](themes.md).
- [Respond to taps and other events](../logic/events.md).
- [Fonts and icons](fonts-icons.md).
