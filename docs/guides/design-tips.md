---
title: Design tips
description: Keep your app consistent with themes and components, build layouts that adapt, name things clearly, start from templates and check every screen size.
sidebar_label: Design tips
keywords: [design tips, best practices, consistency, theme, components, responsive, layout, naming, templates, screen sizes, dark mode]
---

A good-looking Nowa app is mostly a consistent one: the same colors, text styles and spacing on every screen. These tips show how to get there with the tools Nowa already gives you, so changing your mind later takes one edit, not one per screen.

## Set the theme first

Open **Themes** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>3</kbd>) before you design many screens.

- **Start from one color.** Set **Mode** to **Seed**. A single **Seed Color** builds a matching palette, and **Scheme Variant** changes its style. Then set **Typography** and a **Default Font**. See [Create and edit themes](../design/themes.md).
- **Link, don't type.** On a widget, pick a theme color or text style instead of typing a HEX value or a size. A linked field shows a name such as `primary` or `bodyMedium`, and it follows every theme change. See [Use theme colors and text styles](../design/theme-styles.md).
- **Style buttons and fields once.** Under **Widgets** in the theme, set how every button and text field looks. A new **Button** follows the theme by itself.
- **Bend one thing, not everything.** Use **CopyWith** to change one part of one text, such as its weight, while the rest still follows the theme.
- **Plan for dark.** New projects start with `lightTheme` and `darkTheme`, and the board shows the **Active** one. The app doesn't switch on its own, so add a switch with `changeTheme`. See [Switch themes while the app runs](../design/theme-styles.md#switch-themes-while-the-app-runs).
- **Theme extensions** hold extra values, such as brand colors, and show up as tabs in **Themes**. There's no button to create one: they come from code that you or Nowa AI write. Widget color pickers list the standard color roles only, so use those for everyday colors.

## Build once, reuse everywhere

- **Make components early.** Right-click a card, header or button you use twice and choose **Create component**. Edit the component once and every copy updates. See [Build reusable components](../design/components.md).
- **Give components params**, so each copy shows its own content, and use a component as the item of a list. See [Pass data with parameters](../logic/parameters.md) and [Lists and grids](../reference/widgets/lists.md).
- **Vary by copying, not detaching.** **Copy as new widget** makes a separate component. **Detach** turns one instance into plain widgets that no longer follow the component.
- **Reuse a few spacing values**, such as 8 and 16, for **Gap** and **Padding**.

## Start from a template

Click **Screen** in the board toolbar and pick a template, such as **Onboarding Screen**, **Dashboard** or **Authentication Template**. See [Start from a template](../design/templates.md).

- Many templates come with fixed colors of their own. After you add one, link its colors and text to your theme so it matches the rest of your app.
- Treat a template as a head start. Rename it, restyle it and connect it to your data.
- Templates marked **Premium** need a plan that includes them. You can't add your own templates, so build a component for a design you reuse.

## Make layouts that adapt

Nowa has no breakpoints and no separate phone and tablet layouts. You build one layout that flexes. See [Design for every screen size](../design/responsive.md).

- **Pick a size mode for each widget.** Use **Expand** for what should fill the space, such as text fields and cards. Use **Auto** for what should fit its content, such as a text. Keep **Fixed** for things with a set size, such as an avatar. See [Lay out widgets](../design/layout.md).
- **Prefer a Column for page content.** Turn a screen's main group into a **Column** with the down arrow in **Group**, so widgets stretch and flow instead of sitting at fixed positions. In a **Stack**, use the **Left and right** constraint so a widget stretches with the screen.
- **Let content flow.** A **Wrap** continues on a new line, a **Grid View** set to **Max** adds columns as the screen widens, and the **Scroll View** wrapper makes a tall column scroll.
- **Keep clear of notches** with the **Safe Area** wrapper.
- **Need two layouts?** Build both and wrap each in **Visibility**, with a condition on `MediaQuery.of(context).size.width`. See [Show different widgets on wide and narrow screens](../design/responsive.md#show-different-widgets-on-wide-and-narrow-screens).

## Name things clearly

- **Screens and components:** name them for what they show or are, such as `RecipeListPage` and `RecipeCard`. When you rename, Nowa updates every place that uses them.
- **Variables:** name them for what they hold, such as `isLoading` or `email`.
- **Routes:** a screen's default path comes from its name, so `HomePage` becomes `/home-page`.
- **Boards:** keep one per flow. When you create a board, Nowa turns the name you type into one word, so **Login flow** becomes `loginFlow`.
- **Descriptions:** click **Add description** under a screen's or component's name. The note shows in the widget picker.

Clear names also help Nowa AI, because every request carries a map of your widget names. See [Give Nowa AI context](../ai/context.md).

## Check different screen sizes

- **Try the presets.** Click a screen's title, then set **Size** in **Details** to **Pixel 3a**, **iPhone 12**, **MacBook Pro** or **1920x1080**.
- **Compare two sizes at once.** Select a screen's title, copy it with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, paste it on empty board space and give the copy another **Size**. Both show the same screen, so each edit appears in both.
- **Use realistic content.** The board fills empty values with placeholders. Give a variable or param a long **Default Value** to see how text wraps.
- **Play, then Run.** Click **Play** at each size. Then **Run** shows the real app in a **Phone** or **Tablet** frame. See [Run your app](../test/run.md).

## Next steps

- [Build a complete app, start to finish](complete-app.md)
- [Test and ship with confidence](ship-tips.md)
