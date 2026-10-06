---
title: Deep links
description: Let links open your app, from a custom URL scheme such as myapp:// or from https links on your own domain.
sidebar_label: Deep links
keywords: [deep links, deep linking, app links, universal links, url scheme, custom scheme, host, intent filter, open app from link, gorouter, app_links]
---

A deep link opens your app from outside it, for example from a message, a web page or a QR code. Nowa registers your URL scheme and your domain with iOS and Android, so the phone knows your app handles those links.

## Before you start

Decide which links you need:

- A **custom URL scheme**, such as `myapp://...`, for links you create yourself.
- **Web links** on a domain you control, such as `https://example.com/...`.

## Turn on deep links

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **Deep Links**.
2. Turn on **Enabled**. Nowa adds the `app_links` package and turns off Flutter's default deep linking on iOS and Android.
3. Under **Configuration**, fill in **URL Scheme** (for example `myapp`), **Host** (for example `example.com`) or both. Add a path prefix to the host if you need one, such as `example.com/app`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.

Nowa writes your settings into the Android and iOS project files, so they take effect in a built app. To try a link, run the app on a device or emulator with the desktop app: see [Run on a device or emulator](../test/devices.md).

## What each field sets up

| Field | Opens your app from | Where Nowa writes it |
|---|---|---|
| **URL Scheme** | Links like `myapp://...` | The iOS `Info.plist` (a URL type) and the Android manifest (an intent filter for the scheme, with the host `open.my.app`). |
| **Host** | Links like `https://example.com/...` | The Android manifest only, as an App Links intent filter with `autoVerify`. |

Two things to know:

- On Android, Nowa registers the scheme together with the host `open.my.app`, so an Android link looks like `myapp://open.my.app/products/12`. The same link works on iOS, which matches on the scheme alone.
- **Host** does not set up iOS Universal Links. Nowa does not add the iOS associated-domains entitlement, so web links open your app on Android only until you set up Universal Links yourself ([Apple's guide](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)). On Android, `autoVerify` makes the system check that you own the domain, so your site must serve the verification file ([Android's guide](https://developer.android.com/training/app-links)).

## Handle the link in your app

Nowa registers the links and adds `app_links`, but it does not generate code that reads an incoming link. Your app's logic has to read the link and open the right screen.

New projects use GoRouter, where each screen has a route **Path** (**Route Settings** in **Details**) that a link can point to. See [Navigate between screens](../logic/navigation.md). An older project that uses Navigator shows **Enable GoRouter** in the **Router** panel, which lists deep linking as built in for GoRouter and "Not supported out of the box" for Navigator.

:::tip[Or ask Nowa AI]
Try: "Handle incoming deep links with the app_links package and open the screen whose route path matches the link."
:::

## Turn deep links off

Turn **Enabled** off to remove the package and the entries Nowa added to the Android and iOS files.

## Next steps

- [Navigate between screens](../logic/navigation.md)
- [Run on a device or emulator](../test/devices.md)
