---
title: In-app purchases with RevenueCat
description: Add your RevenueCat keys and the RevenueCat Paywall widget so your iOS, Android or web app can sell subscriptions and in-app purchases.
sidebar_label: RevenueCat
keywords: [revenuecat, in-app purchases, iap, subscriptions, paywall, purchases_flutter, app store, google play, monetize]
---

RevenueCat handles in-app purchases and subscriptions across iOS, Android and the web. Add your RevenueCat keys in Nowa and drop the pre-built **RevenueCat Paywall** onto a screen. Nowa configures RevenueCat when your app starts and generates a service you can call from logic.

## Before you start

- A RevenueCat account with your app, products and offerings set up in the [RevenueCat dashboard](https://app.revenuecat.com). Nowa doesn't create them. [RevenueCat's documentation](https://www.revenuecat.com/docs) explains how.
- The public SDK key for each platform you ship, from the same dashboard.
- The store rules for in-app purchases: [Follow Apple's rules](../publish/ios.md#store-rules) and [Follow Google Play's rules](../publish/android.md#store-rules).

## Turn on RevenueCat

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **RevenueCat**.
2. Turn on **Enabled**. Nowa adds the `purchases_flutter` package.
3. Under **Configuration**, paste your keys: **Apple API Key**, **Android API Key** and **Web API Key**. The field hints show the usual prefixes: `appl_`, `goog_` and `strp_`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.

Your app uses the key for the platform it runs on, so add a key for every platform you test or ship.

When you turn it on, Nowa also:

- Generates `lib/integrations/revenuecat_service.dart` with a `RevenuecatService` class.
- Adds `await RevenuecatService().configureRevenuecat();` to `main()`, so RevenueCat is ready when the app starts.
- Saves your keys as constants in `lib/globals/app_constants.dart`. They also appear under **Constants** (**Settings** → **General**). They're public keys, so shipping them inside the app is expected.
- Makes sure the iOS minimum version is at least 14.0 and switches the Android `MainActivity` to a `FlutterFragmentActivity`.

## Add the paywall

1. Open the widget picker (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>) or click the **Widget** tool, and search for **RevenueCat Paywall**.
2. Choose it. If Nowa shows **Add Missing Dependencies**, click **Add**. The paywall also needs the `purchases_ui_flutter` package.
3. The widget sits on the board as a placeholder labeled "RevenueCat Paywall" with the text "Run to preview".

{/* CAPTURE: id=integrations-revenuecat-1 | state: playground starter open, a screen on the board, RevenueCat Paywall added from the widget picker | show: the placeholder card labeled RevenueCat Paywall / Run to preview inside a screen | crop: the screen on the board */}

The board and **Play** show only placeholders. In **Play**, the widget reads "Run on a simulator/emulator or mobile device to preview". To see the real paywall, run your app on a simulator, emulator or device. That needs the desktop app. See [Run on a device or emulator](../test/devices.md).

## Call RevenueCat from logic

Besides `configureRevenuecat()`, `RevenuecatService` has two methods:

| Method | What it does |
|---|---|
| `fetchOfferings()` | Returns your RevenueCat offerings, or nothing if the request fails. |
| `purchasePackage(...)` | Buys a package from an offering. |

These work with RevenueCat's own types, so for purchase flows beyond the paywall, ask Nowa AI or write the code yourself ([Write your own code](../code/custom-code.md)).

:::tip[Or ask Nowa AI]
Try: "When the user taps Upgrade, open a screen that shows the RevenueCat Paywall."
:::

## Turn RevenueCat off

Turn **Enabled** off to remove the package, `lib/integrations/revenuecat_service.dart` and the `main()` line. Your keys stay in **Constants**. Remove any logic that calls `RevenuecatService`, and any **RevenueCat Paywall** widgets, first.

## Next steps

- [Keys and constants](./constants.md)
- [Run on a device or emulator](../test/devices.md)
