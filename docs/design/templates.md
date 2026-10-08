---
title: Start from a template
description: Add a ready-made screen or component to your project, then restyle it with the visual editor.
sidebar_label: Templates
keywords: [templates, screen template, component template, Create a page, Empty Page, onboarding, dashboard, login, authentication, chat, premium templates, starter]
---

Skip the blank page. A template gives you a finished screen or component, such as a login flow, a dashboard or a chat, that you can restyle, connect to your own data and make yours.

## Add a template

1. Click **Screen** in the toolbar at the bottom of the board. You can also right-click the board and choose **Create a page**.
2. Keep **Screens** selected, or switch to **Components**. Type in **Search for templates** to narrow the list.
3. Point at a template, or move to it with the arrow keys, to see its preview. Click it, or press <kbd>Enter</kbd>, to add it.
4. Finish the dialog that opens. What it asks depends on the template. See the next two sections.

![The screen template picker opened from the Screen tool: a Search for templates box, the Screens and Components chips, the template list (Onboarding Screen highlighted, Premium badges on Article and Dashboard) and a preview pane showing the Onboarding Screen template.](/img/docs/design/design-templates-1.png)

Nowa places the new screen or component on the board near your pointer. A screen doesn't become your home screen automatically. See [Create and set up screens](screens.md).

Many templates come with fixed colors of their own, so link their colors and text to your theme after you add one: see [Start from a template](../guides/design-tips.md#start-from-a-template).

## Name a single-file template

A template with a single file, such as **Empty Page**, **Basic Cards 1** or **Event Info**, opens a naming dialog. It is titled **New** followed by the template's name, for example **New Empty Page**.

1. Type a name. Nowa fills in a **Class name** and a **Path** from it. Screens go in `lib/pages/` and components in `lib/components/`.
2. Click **Submit**. For a screen, Nowa also adds a route in projects that use GoRouter.

An **Empty Page** is a blank screen, sized like the Pixel 3a preset (393 × 808). Change the size later with **Size** in the screen's **Details**.

## Import a multi-file template

A template made of several files, such as the **Authentication Template** (a login page and a register page), **Chat Template** or **Onboarding Screen**, opens an import dialog. It is titled **Add** followed by the template's name.

1. Review the files the template will add. Untick the ones you don't need, or rename and move them.
2. Click **Import**. If a file with the same name already exists, Nowa asks before it overwrites it.

**Import** stays off while a file has a problem, and a tooltip asks you to fix it first. Nowa places only the template's screens on the board, side by side. Unlike a single-file template, a multi-file import doesn't add routes. In a GoRouter project, set each screen's route in its **Route Settings**. See [Name the route](screens.md#name-the-route).

## Built-in templates

| Tab | Templates |
|---|---|
| **Screens** | **Empty Page**, **Basic Cards 1**, **Basic Cards 2**, **Basic Cards 3**, **Onboarding Screen**, **Article**, **Dashboard**, **Event Info**, **Audio Player Page**, **Chat Template**, **Authentication Template** |
| **Components** | **Audio Player**, **Google Button** |

The list is built into Nowa. You can't add your own templates in this version. To reuse your own design, build a component instead: see [Build reusable components](components.md).

## Premium templates

<Badge type="paid" /> **Article**, **Dashboard**, **Event Info** and **Audio Player Page** show a **Premium** label, and the picker lists them after the free templates. If your plan doesn't include them, adding one opens a **Time to level up** dialog with an **Upgrade** button. See [pricing](https://nowa.dev/pricing).

## Other places to start from

- **Files** panel: click **+** on the **lib** row (**Add to library**) and choose **New Widget...**. The same picker opens, and the new file opens on its own instead of landing on a board.
- Whole apps: in the playground, the picker at the top offers **Playgrounds** and **Templates**. See [Try Nowa without an account](../get-started/playground.md).

:::tip
Or ask Nowa AI: "Add a login screen with email and password." See [How Nowa AI works](../ai/index.md).
:::

## Next steps

- [Create and set up screens](screens.md).
- [Change widget properties](properties.md) to restyle what you added.
- [Use theme colors and text styles](theme-styles.md) to link a template's colors and text to your theme.
