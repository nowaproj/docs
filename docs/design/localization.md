---
title: Languages and right-to-left text
description: Make your app speak several languages with Nowa AI, and set text direction for right-to-left languages such as Arabic and Hebrew.
sidebar_label: Languages and RTL
keywords: [localization, localisation, translation, translate app, languages, multiple languages, multilingual, language switcher, locale, i18n, right-to-left, RTL, Arabic, Hebrew, text direction, Directionality]
---

Reach people in their own language. Nowa AI sets up the languages in your app for you, and you control right-to-left text, for languages such as Arabic and Hebrew, right from **Details**.

## Run your app in several languages

Nowa has no translation editor or language switcher of its own. Instead, you ask Nowa AI to add the translations to your project, and the board can show them.

1. In **Agent** mode, ask for the languages you need, for example: "Make my app available in English and Arabic." See [Write prompts that work](../ai/prompting.md).
2. When it's done, look through your screens on the board and check **Problems** for errors.
3. To try each language in your app, ask for a way to switch, for example: "Add a language switcher to the settings screen." Then click **Run** and switch languages to see every screen in each one.

Spotted a wrong word later? Tell Nowa AI which text to change, in which language, and what it should say.

Make sure your font has the letters your languages use. Many fonts cover only some alphabets, so check on [Google Fonts](https://fonts.google.com) before you pick one. See [Fonts and icons](fonts-icons.md).

If your translations can't load on the board, the board still draws your screens. **Logs** shows "Could not load" followed by a name (the part of your app that loads the translations) and the error. Copy that message into the chat and ask Nowa AI to fix it. See [Read the logs](../test/run.md#read-the-logs).

Working in the code? See [What Nowa adds to your code](../code/generated-code.md#localization).

## Show text right to left

Languages such as Arabic and Hebrew are written right to left, so their text and layout should start on the right. You can set the direction on one text or on a whole section.

**For one Text widget**

1. Select the Text widget.
2. In **Details**, set **Text Direction** to `rtl` (right to left). The other value is `ltr` (left to right).

**For a section of a screen**

1. Select the widget that holds the section, for example a Group.
2. In **Details**, click **Add Wrapper** and choose **Text Direction**. See [Change widget properties](properties.md#add-a-wrapper).
3. In the wrapper's section, set **Text Direction** to `rtl`. Everything inside the wrapper follows it, rows included, so the first widget in a row moves to the right. The default is `ltr`.

To flip a whole screen, add the wrapper to the main widget of the screen.

:::tip
Or ask Nowa AI: "Show the Arabic version of the app right to left." Then check your screens on the board and with **Run**.
:::

## Next steps

- [Fonts and icons](fonts-icons.md): pick a font that supports your language.
- [Change widget properties](properties.md).
