---
title: Create and edit themes
description: Set your app's colors, text styles and widget looks in the Themes panel, so one change restyles every screen.
sidebar_label: Themes
keywords: [theme, themes panel, colors, color scheme, typography, text styles, dark mode, light theme, seed color, brand colors, ThemeData]
---

A theme holds the colors, text styles and widget looks that every screen shares. Change a color once in the **Themes** panel and every widget that uses it follows, live on the board.

Set your theme before you design many screens: see [Set the theme first](../guides/design-tips.md#set-the-theme-first).

## Open the Themes panel

1. Click **Themes** in the left sidebar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>3</kbd>. The active theme opens for editing, with **Colors**, **Typography** and **Widgets** below it.
2. Click the arrow next to the theme name to show all your themes.

New projects start with two themes, `lightTheme` and `darkTheme`. Each theme is a variable in `lib/globals/themes.dart`, and your edits are written to that file. **Refresh** re-renders the app with the current theme. **Open in New Tab** shows the file as code. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Y</kbd> undo and redo inside the panel.

![The Themes panel with lightTheme active: the Colors tiles (Primary, Secondary, Tertiary, Surface, highlighted), Add Color, the Brightness and Mode switches and the start of Typography.](/img/docs/design/design-themes-1.png)

:::note
If a theme doesn't set a color scheme yet, Nowa adds one when you open it: `ColorScheme.fromSeed` with a purple seed. In an imported project, colors can change the first time you open the **Themes** panel.
:::

## Create a theme

1. Show all themes, then click **Create New Theme** at the end of the list.
2. Type a name and press <kbd>Enter</kbd>. Use letters, numbers and underscores, and don't start with a number. Nowa tells you if a name is empty, already used or reserved.

The new theme opens for editing in **Seed** mode with a purple seed color. It isn't applied yet.

## Apply a theme

Click a theme in the list. The label **Active** moves to it. The active theme is the one your app starts with and the one the board shows. Nowa saves the choice in your code: in new projects it is the starting theme in `lib/globals/app_state.dart`.

In a new project, your app doesn't switch between light and dark on its own. To let people switch while the app runs, see [Switch themes while the app runs](theme-styles.md#switch-themes-while-the-app-runs).

## Rename or delete a theme

Right-click a theme.

- **Rename**: type the new name and press <kbd>Enter</kbd>. Nowa updates the places that use the theme.
- **Delete**: removes the theme. If other code uses it, Nowa lists where and asks before it deletes. The **Active** theme can't be deleted, so apply another theme first.

## Edit colors

The **Colors** section shows your main color roles as tiles: **Primary**, **Secondary**, **Tertiary** and **Surface**. Each tile shows the color and, next to it, its matching "on" color, which is used for text and icons on top of it.

1. Click a tile. A popup opens.
2. At the top, choose the role (left) or its "on" color (right).
3. Pick a color. Drag in the color area, use the hue and opacity sliders, use the eyedropper to pick a color from the screen, or type a **HEX** value and an opacity (**OP**).
4. Check the result in **Preview**, then click the back arrow.

![The Themes panel next to the Edit Primary popup: the role and on-color header, the color picker with hue and opacity sliders, the HEX and OP fields (highlighted) and the Preview swatch.](/img/docs/design/design-themes-2.png)

To edit another role, click **Add Color** and choose one in **Override Color Role**, for example **Primary Container**, **Error**, **Outline** or a **Surface Container** shade. The reset icon in a popup's header puts the role back to the scheme's default.

## Choose light or dark, fixed or seed

Below the tiles you set how the whole color scheme is built.

| Setting | What it does |
|---|---|
| **Brightness** | **Light** or **Dark** for this theme's colors. |
| **Mode** | **Fixed** starts from Flutter's standard light or dark colors and applies the roles you edit. **Seed** builds a full, matching palette from one color. |
| **Seed Color** | Seed mode only. The color the palette is built from. |
| **Scheme Variant** | Seed mode only. The style of palette: Tonal Spot, Fidelity, Monochrome, Neutral, Vibrant, Expressive, Content, Rainbow or Fruit Salad. |

Switching **Mode** keeps your look: your Primary color becomes the **Seed Color**, and the other way round.

## Edit text styles

**Typography** lists the 15 text styles your app uses, grouped as **Display**, **Title**, **Headline**, **Body** and **Label**, each in Large, Medium and Small. Every row shows the style's weight and size.

1. Optional: click **Default Font** to pick one font for the whole theme. See [Fonts and icons](fonts-icons.md). It appears for themes written as `ThemeData(...)`.
2. Expand a group, then click a style, or hover it and click **Edit**.
3. Set **Font Family**, **Font Weight**, **Decoration**, **Font Size**, **Color**, **Background**, letter spacing, line height and **Shadows**. **Preview** shows the result.

To reset one style, hover the icon at the start of its row and click it (**Reset to default**). Once you've customized a style, a refresh icon appears next to **Typography** (**Reset all to default**) and resets them all.

## Style text fields and buttons

**Widgets** sets the look of two widget types for the whole app.

- **Fields**: every text field. Set fill, borders, label, hint and error styles and more.
- **Buttons**: choose **Button** or **Icon Button**, then set **Background Color**, **Foreground Color**, **Shadow Color**, **Elevation**, **Side** and **Radius**. The reset icon restores the default button style.

Buttons pick up the theme once you connect them. See [Connect buttons to the theme](theme-styles.md#connect-buttons-to-the-theme).

## Widgets that keep their own color

A theme restyles only the widgets that use it. When a widget's color field shows a role's name, such as `primary`, the widget follows the theme. A widget with its own color, picked in the color picker or typed as a HEX value, keeps that color when you edit the theme. So does a text style you cut loose from the theme.

To bring a widget back, pick one of the theme's colors for it, or a theme text style. See [Use theme colors and text styles](theme-styles.md).

## Edit theme extensions

If a theme has custom extensions, such as a set of brand colors, the editor shows a **Default Theme** tab plus one tab per extension, named after its class. Click a tab to edit that extension's values.

There is no button to create an extension. They come from your code. Nowa supports up to 8 theme extensions.

## Add themes to a project that has none

If a project has no `lib/globals/themes.dart`, the panel shows an error and a **Create Theme Setup** button. Click it, then click **Create**. Nowa creates `lib/globals/themes.dart` (with `lightTheme` and `darkTheme`) and `lib/globals/app_state.dart`, and skips any that already exist. Projects you create in Nowa already have both files.

:::tip
Or ask Nowa AI: "Use a warm orange as the primary color and make the headlines bold." With the Figma connection on, it can turn your Figma colors and text styles into theme code. See [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).
:::

## Next steps

- [Use theme colors and text styles](theme-styles.md) on your widgets.
- [Fonts and icons](fonts-icons.md): pick a Google Font or import your own.
- [Change widget properties](properties.md).
