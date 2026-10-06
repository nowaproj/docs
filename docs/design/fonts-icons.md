---
title: Fonts and icons
description: Pick a Google Font, import your own font file, or choose a Material icon for your app.
sidebar_label: Fonts and icons
keywords: [fonts, font family, Google Fonts, custom font, import font, ttf, otf, icons, Material Icons, icon picker, typography, default font]
---

Give your app its own voice with a Google Font or your own font file, and choose icons from the Material icon set. Both pickers open from any property that takes a font or an icon.

## Pick a font

1. Open a font field.
   - For the whole app, open **Themes** and click **Default Font**. Or open a text style and use **Font Family**.
   - For one text, select it, click **Style**, choose **CopyWith**, then use **Font Family**. See [Use theme colors and text styles](theme-styles.md#use-a-theme-text-style).
2. Click the font button. It shows the current font, or **Default**.
3. Search by name or scroll the list. Click a font to use it.

Google Fonts download into your project when you pick them. Nowa saves the family's regular file as `assets/fonts/<Font Name>.ttf` and registers it in `pubspec.yaml`.

{/* CAPTURE: id=design-fonts-icons-1 | state: playground starter open, Themes panel open, Default Font clicked | show: the Fonts popup with Import, the search box, the filter button and the font list | crop: left panel + popup */}

## Import your own font

1. In the **Fonts** popup, click **Import**.
2. Choose a `.ttf` or `.otf` file. You can import one file at a time.

Nowa saves the file in `assets/fonts/`, registers it in `pubspec.yaml` and selects it. The font's name is its file name without the extension, so `Brand-Regular.ttf` appears as `Brand-Regular`.

## Filter the font list

Click the filter button next to the search box.

| Filter | Shows |
|---|---|
| **All Fonts** | Font files in your project plus all Google Fonts. This is the default. |
| **Default Fonts** | Google Fonts only. |
| **Imported by you** | Font files in your project's `assets/` folder, including Google Fonts you have already used. |

In the web app the list starts with 100 Google Fonts, and a search shows up to 20 matches. The [desktop app](../get-started/desktop-app.md) lists them all.

## Declare fonts yourself

If you declare fonts under `flutter:` → `fonts:` in `pubspec.yaml`, with your own families, weights and styles, Nowa keeps your declarations and the board shows each family under its own name. Font files in `assets/` that you haven't declared are added for you, one family per file, named after the file. Declarations whose files no longer exist are removed.

The **Fonts** popup lists font files by file name, not the family names you declare.

## Choose an icon

1. Select an Icon widget, or any widget with an icon property.
2. In **Details**, click the icon field. It shows the current icon and its name, or **none**.
3. In the **Icons** popup, type a name such as "home" in the search box, then click an icon.

{/* CAPTURE: id=design-fonts-icons-2 | state: playground starter open, an Icon widget on a screen selected, the icon field clicked, "home" typed in the search box | show: the Icons popup with search and the icon grid | crop: right Details panel + popup */}

The picker lists Flutter's Material Icons only. For any other icon, add it as an SVG file and show it with an SVG widget. See [Images, videos and other files](assets.md).

An Icon widget also has **Size** and **Color**. **Show advanced options** adds fill, weight, grade, optical size, shadows, text direction, blend mode, text scaling and a semantic label.

:::tip
Or ask Nowa AI: "Use the Poppins font for all headlines." If the font isn't in your project yet, Nowa AI downloads and sets it up.
:::

## Next steps

- [Create and edit themes](themes.md): set **Default Font** and every text style in one place.
- [Images, videos and other files](assets.md).
- [Change widget properties](properties.md).
