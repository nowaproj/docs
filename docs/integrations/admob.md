---
title: Show ads with AdMob
description: Add your AdMob App IDs, place the Admob Banner widget and show full-screen ads from logic to earn from your Android and iOS app.
sidebar_label: AdMob
keywords: [admob, ads, banner ad, interstitial ad, advertising, monetize, google mobile ads, nowa_mobile_ads, ad unit]
---

AdMob is Google's ad network for mobile apps. Add your App IDs in Nowa, place an **Admob Banner** on a screen, and show a full-screen ad from logic with `loadAndShowInterstitialAd`. Test ads are on by default, so you can try everything before real ads go live.

## Before you start

- An [AdMob](https://admob.google.com) account with your app registered for each platform you ship. You need the **App ID** of each app and an **ad unit ID** for every banner or full-screen ad. Google's [AdMob guide for Flutter](https://developers.google.com/admob/flutter/quick-start) explains how to get them.
- Real ads only show in an Android or iOS app. You can design the layout anywhere.

## Turn on AdMob

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **AdMob**.
2. Turn on **Enabled**. Nowa adds the `nowa_mobile_ads` package and `await MobileAds.instance.initialize();` to `main()`.
3. Under **Configuration**, paste your **Android App ID** and **iOS App ID**. Both look like `ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. An ID that doesn't start with `ca-app-pub-` is refused.

Add an App ID for both platforms. With only one, your app doesn't work on the other platform (Nowa warns about this on the page).

![The AdMob page in Settings with its description and the note about adding keys for both platforms. The Enabled switch (on) and, under Configuration, the Android App ID and iOS App ID fields showing the ca-app-pub placeholder are highlighted.](/img/docs/integrations/integrations-admob-1.png)

Nowa writes the Android App ID into the Android manifest and the iOS App ID into `Info.plist`, together with Google's SKAdNetwork identifiers.

## Add a banner

1. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> or click the **Widget** tool to open the [Library](../design/library.md), search for **Admob Banner** and press <kbd>Enter</kbd>. If AdMob isn't turned on yet, Nowa shows **Add Missing Dependencies**. Click **Add**.
2. Place the banner on a screen, usually at the top or bottom. It uses the standard banner size.
3. In **Details**, fill in **Android Unit ID** and **Ios Unit ID** with your banner ad unit IDs.

**Show Test Ads** is on by default. While it's on, the banner uses Google's test ad units instead of your unit IDs. Turn it off before you publish.

If **Details** shows "No API Keys" with an **AdMob setup** button, click the button to open the **AdMob** page and add the missing App ID. The same goes for a button named **AdMob Android setup** or **AdMob IOS setup** that replaces a unit ID field.

{/* CAPTURE: id=integrations-admob-2 | state: playground starter open, AdMob enabled with both App IDs set, an Admob Banner selected on a screen | show: the Details panel with Android Unit ID, Ios Unit ID and Show Test Ads, and the red editor-preview banner on the board | crop: board item + Details panel */}

What the banner shows depends on where it runs:

| Where | What you see |
|---|---|
| The board, **Play**, a browser or a desktop app | A red box: "This is an editor preview for Admob". |
| An Android or iOS app, **Show Test Ads** on | A Google test ad. |
| An Android or iOS app, **Show Test Ads** off | Your ad for that platform's unit ID. If the ID is empty you see "no adUnitId", and if the ad can't load, "BannerAd failed to load". |

To see a real ad, run the app on an Android or iOS device or emulator. That needs the desktop app. See [Run on a device or emulator](../test/devices.md).

## Show a full-screen ad

`loadAndShowInterstitialAd` loads a full-screen ad and shows it as soon as it's ready. Call it from an event, for example when a level ends or the user taps **Next**.

1. Open the event's function in Circuit ([Respond to taps and other events](../logic/events.md)).
2. Hover the dot under the top node and click **+**. In **All nodes for this circuit**, search for `loadAndShowInterstitialAd` and click it.
3. In **Details**, set **Android Unit ID** and **Ios Unit ID** to your full-screen ad unit IDs. **Show Test Ads** is on by default. Turn it off for your published app.

Like the banner, it only shows ads on Android and iOS.

:::tip[Or ask Nowa AI]
Try: "Show an AdMob full-screen ad every time the user finishes a level."
:::

## Before you publish

- Turn **Show Test Ads** off on every banner and in every `loadAndShowInterstitialAd` call, and enter your real unit IDs.
- Check that both App IDs are set.

## Turn AdMob off

Turn **Enabled** off to remove the package, your App IDs and the `main()` line. Remove your banners and `loadAndShowInterstitialAd` calls first.

## Next steps

- [Run on a device or emulator](../test/devices.md)
- [Get ready to publish](../publish/index.md)
