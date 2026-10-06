---
title: Keys and constants
description: Keep your keys, IDs and fixed values in one place, and use them anywhere in your app.
sidebar_label: Keys and constants
keywords: [constants, custom constants, API key, keys, secrets, AppConstants, app_constants.dart, publishable key, client ID, settings]
---

Constants are the fixed values your app needs, such as a publishable key, a client ID or an address you reuse. Nowa keeps them in one place, so you can see and change them without opening code.

## Open the Constants page

1. Click the gear (**Settings**) in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>.
2. Under **General**, click **Constants**.

## What's on the page

- **Integration sections.** Some integrations keep their values here, in a section named after the integration: **Stripe** (**Publishable Key**, **Merchant Name**, **Country Code**), **RevenueCat** (**Apple API Key**, **Android API Key**, **Web API Key**) and **Google Sign-In** (**Web Client ID**). A section appears once you turn the integration on. Changing a value here also changes it on the integration's own page, and the other way round.
- **Custom Constants.** Your own constants, plus values Nowa adds for you. Connecting Supabase, for example, adds `supabaseUrl` and `supabaseAnonKey`.

Keys that Nowa writes into your Android, iOS or web project files are not listed here. Google Maps, AdMob, Deep Links and the Google Sign-In **iOS Client ID** live on their own pages under **Settings** → **Integrations**. See [Connect data and services](./index.md).

Behind the scenes, every constant is a text value in the `AppConstants` class in `lib/globals/app_constants.dart`.

## Change a value

1. Click the field and type the new value.
2. Press <kbd>Enter</kbd> or click the send icon (**Submit**). A check mark shows the value is saved.

Nothing saves when you click away. If a value isn't valid, the field shows an error and a **Reset** icon that brings the old value back.

## Add your own constant

1. Under **Custom Constants**, click **+** (**Add custom constant**).
2. Type a **Name** and a **Value**. Use letters, numbers and underscores, starting with a letter or an underscore, for example `weatherApiKey`.
3. Click the check mark (**Confirm**) or press <kbd>Enter</kbd>. Click **Cancel** to back out.

{/* CAPTURE: id=integrations-constants-1 | state: playground starter open, Settings open on Constants, one custom constant added | show: the Constants page with the General and Integrations lists and one custom constant | crop: settings window */}

If you type a name that already exists, its value is replaced. Nowa shows an error under the row when a name isn't valid. To delete a constant, click the **Remove** icon at the end of its row.

## Use a constant

Integrations read their values from here by themselves. For your own constants:

- **In logic:** in Circuit, click **+** under a node and open your app's own category (named after your package, for example **PACKAGE:MY_APP**). Click **AppConstants**, then pick your constant under **Static**.
- **In a property:** click the property's label, choose **Custom Expression...**, type `AppConstants.weatherApiKey` and click **Eval**.

See [Build logic in Circuit](../logic/circuit.md) and [Expressions and conditions](../logic/expressions.md).

:::warning
Constants are compiled into your app, so anyone who has the app can find them. The page describes itself as a place for "Secret keys", but everything on it ships with your app. Use it for values meant to be in an app, like a publishable key. Never put server secrets here, such as a Stripe secret key or a database password. The Stripe integration keeps its secret key in Supabase instead.
:::

:::tip[Or ask Nowa AI]
Try: "Add a constant called weatherApiKey and use it in my weather request." When Nowa AI changes your constants, a **Constants updated** card appears in the chat. Click **Open Constants** to review the values.
:::

## Next steps

- [Connect data and services](./index.md)
- [Connect a REST API](./rest-api/index.md)
- [Project settings](../account/project-settings.md)
