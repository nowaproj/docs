---
title: Deep links
description: Let links open your app, from a custom URL scheme such as myapp:// or from https links on your own domain, and send people straight to the right screen.
sidebar_label: Deep links
keywords: [deep links, deep linking, app links, universal links, url scheme, custom scheme, host, open app from link, assetlinks.json, route path]
---

A deep link opens your app from outside it, ideally right where the person needs to be: a link in a message, a button on your website or a QR code on a flyer that opens a product's page. Nowa registers your links with iOS and Android, so the phone knows your app handles them.

## Before you start

Decide which links you need:

- A **custom URL scheme**, such as `myapp://...`, for links you create yourself. It works on iOS and Android.
- **Web links** on a domain you control, such as `https://example.com/...`. In Nowa, these open your app on Android.

## Turn on deep links

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **Deep Links**.
2. Turn on **Enabled**.
3. Under **Configuration**, fill in **URL Scheme**, **Host** or both.
4. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.

Type the values without the `://`, in lowercase letters (Android treats capitals as different letters):

- **URL Scheme**: only the scheme, such as `myapp`.
- **Host**: only the domain, such as `example.com`, not `https://example.com`. Add a path after it to match only links that start with it, such as `example.com/app`.

From now on, your app handles these links itself, so the next step is the logic that opens the right screen (see [Handle the link in your app](#handle-the-link-in-your-app)). The settings take effect in a built app. To try a link, run the app on a device or emulator with the desktop app. See [Run on a device or emulator](../test/devices.md).

## What each field sets up

| Field | Opens your app from | Works on |
|---|---|---|
| **URL Scheme** | Links like `myapp://open.my.app/products/12` | iOS and Android |
| **Host** | Links like `https://example.com/products/12` | Android only |

:::note[Save Host too, so Android gets your scheme]
Currently, saving **URL Scheme** updates only your iOS app right away. Android gets your scheme the next time Nowa updates its Android settings, for example when you save **Host**. To add a scheme without a host, save any **Host**, then clear it again. Before you rely on it, open a link on an Android device or emulator.
:::

Things to know:

- **Write your links with `open.my.app`.** On Android, Nowa registers your scheme together with the host `open.my.app`, so a link looks like `myapp://open.my.app/products/12`. The same link works on iOS, which only looks at the scheme.
- **Web links open your app on Android only.** On iPhone, web links need Apple's Universal Links, which Nowa doesn't set up. Apple's guide explains them: [Supporting universal links in your app](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app).
- **For web links, Android checks that the domain is yours.** Your website must publish a small verification file, `https://example.com/.well-known/assetlinks.json` for the domain `example.com`. Android's [App Links guide](https://developer.android.com/training/app-links) shows what goes in it.

## Use deep links with Google Sign-In {#with-google-sign-in}

[Google Sign-In](./google-sign-in.md) adds its own link entry to your iPhone app once you save its **iOS Client ID**. With both saved, Nowa currently writes two separate entries where iOS expects one, so iOS may ignore one of them: either your links or Google sign-in may not work on iPhone.

To fix it, ask Nowa AI in **Agent** mode: "In ios/Runner/Info.plist, merge the two CFBundleURLTypes entries into one, so both my deep link scheme and Google Sign-In keep working." Then try both on an iPhone or the iOS simulator. If you change the **URL Scheme** or the **iOS Client ID** later, Nowa writes the entries again, so check once more.

## Handle the link in your app

Nowa registers your links, but it doesn't add the logic that opens the right screen when a link arrives. Nowa AI can add that part for you.

New projects use GoRouter, where each screen has a route **Path** (**Route Settings** in **Details**), such as `/products`, that a link can point to. See [Navigate between screens](../logic/navigation.md). An older project that uses Navigator shows **Enable GoRouter** in the **Router** panel, which lists deep linking as built in for GoRouter and "Not supported out of the box" for Navigator. See [Switch an older project to GoRouter](../logic/router.md#switch-an-older-project-to-gorouter).

:::tip[Or ask Nowa AI]
In **Agent** mode, try: "Handle incoming deep links (the app_links package is already added) and open the screen whose route path matches the link." Then open a link on a device to check that the right screen appears.
:::

## Turn deep links off

Turn **Enabled** off. Nowa removes the link settings from your iOS and Android app. Working in the code? See [What Nowa adds to your code](../code/generated-code.md#deep-links).

## Next steps

- [Navigate between screens](../logic/navigation.md)
- [Run on a device or emulator](../test/devices.md)
