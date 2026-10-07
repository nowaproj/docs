---
title: Languages and right-to-left text
description: Run your app in several languages with Nowa AI, and set text direction for right-to-left languages.
sidebar_label: Languages and RTL
keywords: [localization, localisation, translation, languages, multiple languages, locale, i18n, right-to-left, RTL, Arabic, Hebrew, text direction, Directionality]
---

Reach people in their own language. Nowa AI sets up the languages in your code, and you control right-to-left text from **Details**.

## Run your app in several languages

Nowa has no translation editor or language switcher in the editor. To make your app run in more than one language, ask Nowa AI to set it up. It writes the localization code in your project, and the board can render it.

Nowa AI can't add the `flutter_localizations` package to a project, so it uses a different approach.

:::tip
Or ask Nowa AI: "Make my app available in English and Arabic." See [Write prompts that work](../ai/prompting.md).
:::

## Show text right to left

Languages such as Arabic and Hebrew are written right to left. Set the direction on one text, or on a whole section.

**For one Text widget**

1. Select the Text widget.
2. In **Details**, set **Text Direction** to `rtl`. The other value is `ltr`.

**For a section of a screen**

1. Select the widget that holds the section, for example a Group.
2. In **Details**, click **Add Wrapper** and choose **Text Direction**. See [Change widget properties](properties.md#add-a-wrapper).
3. In the wrapper's section, set **Text Direction** to `rtl`. Everything inside the wrapper follows it, rows included. The default is `ltr`.

To flip a whole screen, add the wrapper to the main widget of the screen.

## Next steps

- [Fonts and icons](fonts-icons.md): pick a font that supports your language.
- [Change widget properties](properties.md).
