---
title: Build a great app
description: The habits behind good Nowa apps, a one-screen quality checklist, and five guides that take you from the first prompt to a published app, without code.
sidebar_label: Overview
keywords: [best practices, tips, quality checklist, guides, build a great app, app quality, launch checklist, production ready, no code]
---

Nowa AI builds a first version of your app on the board while you watch. These guides help you take it the rest of the way: a design that holds together, data that behaves, and a release you can trust. You don't need code for any of it. Every tip uses Nowa AI and the visual tools Nowa already has, and links to the page that explains it.

## Habits that make Nowa apps good

1. **Start wide, then go narrow.** Describe the whole app once in **Design** mode, then ask for one feature at a time and check each result before you move on. See [Get the best from Nowa AI](ai-tips.md).
2. **Build each thing once.** Keep colors and text styles in the theme and repeated pieces, such as a product card, in components. Then one edit changes the whole app. See [Design tips](design-tips.md).
3. **Let layouts flex.** Use **Expand** and **Auto** instead of fixed sizes, and look at both a phone size and a wide size. See [Make layouts that adapt](design-tips.md#make-layouts-that-adapt).
4. **Put every value where it belongs.** What one screen remembers goes in its variables, what several screens share goes in global state, and anything secret stays on a server, because anything inside your app can be read by the people who have it. See [Data and state tips](data-and-state-tips.md).
5. **Test early, at every level.** Use **Play** while you design, **Run** before you share, and a real phone before you publish. See [Test and ship with confidence](ship-tips.md).
6. **Keep a way back.** Checkpoints undo an AI request, and Git (version history) or a downloaded copy keeps a version you trust. See [Keep a way back](ship-tips.md#keep-a-way-back).

## Quality checklist

Run through this before you share your app or publish it. Each row links to the how-to, so you can fix anything that isn't ticked yet.

| Area | Check that... | Learn how |
|---|---|---|
| Look | Colors and text styles come from the theme, not typed-in values. | [Use theme colors and text styles](../design/theme-styles.md) |
| Look | Repeated pieces, such as cards and headers, are components. | [Build reusable components](../design/components.md) |
| Layout | Every screen looks right at a phone size and at a wide size. | [Design for every screen size](../design/responsive.md) |
| Data | Screens that load data show something while they load and when loading fails. | [Show data in your UI](../integrations/show-data.md) |
| Data | Every Supabase table has Row Level Security (rules that decide who can read and change each row), tested while signed in. | [Read and write Supabase data](../integrations/supabase/database.md) |
| Security | No secret key, such as a Stripe secret key or a database password, sits in **Constants**, in a REST API's request settings or in a public project. | [Keep secrets out of your app](data-and-state-tips.md#keep-secrets-out-of-your-app) |
| Logic | Anything that can fail, such as sign-in, tells the person what happened. | [Wait for a result](../logic/circuit.md#future-options) |
| Testing | **Problems** is clear, and you've used the real app on a phone. | [Test in the right place](ship-tips.md#test-in-the-right-place) |
| Release | App name, Bundle Identifier (your app's unique ID in the stores), version, icon and permissions are set. | [Check your app details](../publish/index.md#app-details) |
| Safety net | You can get back to a good version: a Git commit or a downloaded copy. | [Keep a way back](ship-tips.md#keep-a-way-back) |

## Guides

- [Build a complete app, start to finish](complete-app.md): one app, a recipe list with sign-in and a detail screen, from the first prompt to a published app.
- [Design tips](design-tips.md): themes, components, layouts that adapt, names, templates and screen sizes.
- [Get the best from Nowa AI](ai-tips.md): modes, context, small steps, checkpoints, standing instructions and connectors.
- [Data and state tips](data-and-state-tips.md): where each value lives, backends, secrets, testing, loading and error states.
- [Test and ship with confidence](ship-tips.md): the right test at the right time, backups, big boards and a publish checklist.

New to Nowa? Start with [Build your first app](../get-started/first-app.md).
