---
title: Design tips
description: Keep your app consistent with themes and components, build layouts that adapt, name things clearly, start from templates and check every screen size.
sidebar_label: Design tips
keywords: [design tips, best practices, consistency, theme, components, responsive, layout, naming, templates, screen sizes, dark mode]
---

A good-looking app is mostly a consistent one: the same colors, text styles and spacing on every screen. These tips show how to get there with the tools Nowa already gives you. The payoff comes later: when you change your mind about a color or a card, it takes one edit, not one per screen.

## Set the theme first

Open **Themes** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>3</kbd>) before you design many screens. Every widget you link to it later follows it automatically.

- **Start from one color.** Set **Mode** to **Seed**. A single **Seed Color**, such as your brand color, builds a matching palette, and **Scheme Variant** changes its style. Then set **Typography** and a **Default Font**. See [Create and edit themes](../design/themes.md).
- **Link, don't type.** On a widget, pick a theme color or text style instead of typing a HEX value (a color code such as `#FF5722`) or a size. A linked field shows a name such as `primary` or `bodyMedium`, and it follows every theme change. See [Use theme colors and text styles](../design/theme-styles.md).
- **Style buttons and fields once.** Under **Widgets** in the theme, set how every button and text field looks. A new **Button** follows the theme by itself.
- **Bend one thing, not everything.** Use **CopyWith** to change one part of one text, such as its weight, while the rest still follows the theme.
- **Plan for dark.** New projects start with two themes, `lightTheme` and `darkTheme`, and the board shows the **Active** one. Your app doesn't switch between them on its own, so give people a switch. Ask Nowa AI in **Agent** mode, for example: "Add a dark mode switch to the settings screen." Then run the app and tap the switch to check it. To build it yourself, make a button call `changeTheme` in Circuit (the action that switches the running app to another theme). See [Switch themes while the app runs](../design/theme-styles.md#switch-themes-while-the-app-runs).
- **Theme extensions** hold extra values, such as brand colors, and show up as tabs in **Themes**. There's no button to create one, because an extension lives in your app's code, so ask Nowa AI in **Agent** mode, for example: "Add a theme extension with my brand colors: navy and coral." You'll know it worked when a new tab appears in **Themes**. Once it exists, a widget's color picker shows your extension colors as tabs next to **Material**, and **Text Styles** lists their text styles in groups. See [Colors from theme extensions](../design/theme-styles.md#colors-from-theme-extensions).

## Build once, reuse everywhere

- **Make components early.** Right-click a card, header or button you use twice and choose **Create component**. Edit the component once and every copy updates, so a product card looks the same on the home screen and in search results. See [Build reusable components](../design/components.md).
- **Give components params** (values each copy receives), so each copy shows its own content, and use a component as the item of a list. See [Pass data with parameters](../logic/parameters.md) and [Lists and grids](../reference/widgets/lists.md).
- **Vary by copying, not detaching.** **Copy as new widget** makes a separate component you can change freely. **Detach** turns one instance into plain widgets that no longer follow the component.
- **Reuse a few spacing values**, such as 8 and 16, for **Gap** and **Padding**. Even spacing is one of the quickest ways to make an app look polished.

## Start from a template

Click **Screen** in the board toolbar and pick a template, such as **Onboarding Screen**, **Dashboard** or **Authentication Template**. See [Start from a template](../design/templates.md).

- Many templates come with fixed colors of their own. After you add one, link its colors and text to your theme so it matches the rest of your app.
- Treat a template as a head start. Rename it, restyle it and connect it to your data.
- Templates marked **Premium** need a plan that includes them. You can't add your own templates, so build a component for a design you reuse.

## Make layouts that adapt

Nowa has no breakpoints (preset widths where the layout switches) and no separate phone and tablet layouts. You build one layout that flexes to fit any screen. See [Design for every screen size](../design/responsive.md).

- **Pick a size mode for each widget.** Use **Expand** for what should fill the space, such as text fields and cards. Use **Auto** for what should fit its content, such as a text. Keep **Fixed** for things with a set size, such as an avatar. See [Lay out widgets](../design/layout.md).
- **Prefer a Column for page content.** Turn a screen's main group into a **Column** with the down arrow in **Group**, so widgets stretch and flow instead of sitting at fixed positions. In a **Stack**, use the **Left and right** constraint so a widget stretches with the screen.
- **Let content flow.** A **Wrap** continues on a new line, a **Grid View** set to **Max** adds columns as the screen widens, and the **Scroll View** wrapper makes a tall column scroll.
- **Keep clear of notches** with the **Safe Area** wrapper.
- **Need two layouts?** Ask Nowa AI, for example: "Show a side menu on wide screens and a bottom bar on phones." To do it yourself, build both and wrap each in **Visibility**, with a condition on the screen's width. See [Show different widgets on wide and narrow screens](../design/responsive.md#show-different-widgets-on-wide-and-narrow-screens).

## Name things clearly

Good names make your project easier to find your way around, for you and for Nowa AI.

- **Screens and components:** name them for what they show or are, such as `RecipeListPage` and `RecipeCard`. When you rename, Nowa updates every place that uses them.
- **Variables:** name them for what they hold, such as `isLoading` or `email`.
- **Routes:** a screen's address in your app (its route) comes from its name, so `HomePage` becomes `/home-page`.
- **Boards:** keep one per flow, such as sign-up or checkout. When you create a board, Nowa writes the name in lowercase with underscores, so **Login flow** becomes `login_flow`.
- **Descriptions:** click **Add description** under a screen's or component's name. The note shows in the [Library](../design/library.md)'s details card and in the widget picker dialog.

Clear names help Nowa AI too, because every request carries a map of your widget names. "Fix the spacing in RecipeCard" works much better when the card is really called that. See [Give Nowa AI context](../ai/context.md).

## Check different screen sizes

- **Try the presets.** Click a screen's title, then set **Size** in **Details** to **Pixel 3a**, **iPhone 12**, **MacBook Pro** or **1920x1080**.
- **Compare two sizes at once.** Select a screen's title, copy it with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, paste it on empty board space and give the copy another **Size**. Both show the same screen, so each edit appears in both.
- **Use realistic content.** The board fills empty values with placeholders. Give a variable or param a long **Default Value** to see how a long recipe title wraps.
- **Play, then Run.** Click **Play** at each size. Then **Run** shows the real app in a **Phone** or **Tablet** frame. See [Run your app](../test/run.md).

## Next steps

- [Build a complete app, start to finish](complete-app.md)
- [Test and ship with confidence](ship-tips.md)
