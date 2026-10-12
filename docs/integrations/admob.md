---
title: Show ads with AdMob
description: Earn from your Android and iOS app with AdMob. Set up your app in AdMob, add your App IDs, place the Admob Banner widget and show full-screen ads from logic.
sidebar_label: AdMob
keywords: [admob, ads, banner ad, interstitial ad, full-screen ad, advertising, monetize, google mobile ads, ad unit, app ID, test ads, app-ads.txt]
---

AdMob is Google's ad network for mobile apps, and it's a common way to earn from a free app. Add your AdMob App IDs in Nowa, place an **Admob Banner** on a screen, and show a full-screen ad from your logic, for example when someone finishes a level. Test ads are on by default, so you can try everything safely before real ads go live.

## Before you start

You need an [AdMob](https://admob.google.com) account. Real ads only show in your Android and iOS apps, but you can design the layout anywhere.

Set up your app in AdMob once per platform you ship. If your app isn't in a store yet, add it as unpublished:

1. In AdMob, click **Apps** in the sidebar, then **Add app**.
2. Select the platform, **Android** or **iOS**.
3. When AdMob asks whether your app is listed on a supported app store, select **No**. (If it's already in Google Play or the App Store, select **Yes** instead and search for it.)
4. Enter your app's name, confirm user metrics, and click **Add**.

Next, create an ad unit for each ad you'll show. An ad unit is one ad placement, with its own ID:

1. Click **Apps**, then your app's name, then **Ad units** in the sidebar.
2. Click **Get started**, or **Add ad unit** if the app already has some.
3. Click **Select** for **Banner** (for an **Admob Banner**) or **Interstitial** (for a full-screen ad).
4. Name the ad unit, for example "Home banner", and click **Create ad unit**.

To copy the IDs later: the **App ID** is in **Apps** → **View all apps**, and each **ad unit ID** is under your app's **Ad units**. Google's help covers [setting up an app](https://support.google.com/admob/answer/9989980) and [finding your IDs](https://support.google.com/admob/answer/7356431).

## Turn on AdMob

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **AdMob**.
2. Turn on **Enabled**. Nowa sets AdMob up in your app and starts it each time your app opens.
3. Under **Configuration**, paste your **Android App ID** and **iOS App ID**. Both look like `ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. An ID that doesn't start with `ca-app-pub-` is refused.

Add an App ID for both platforms. With only one, your app doesn't work on the other platform (Nowa warns about this on the page). Nowa puts each ID where its platform needs it.

![The AdMob page in Settings with its description and the note about adding keys for both platforms. The Enabled switch (on) and, under Configuration, the Android App ID and iOS App ID fields showing the ca-app-pub placeholder are highlighted.](/img/docs/integrations/integrations-admob-1.png)

## Add a banner

A banner is a small ad strip that stays on the screen, usually at the top or bottom.

1. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> or click the **Widget** tool to open the [Library](../design/library.md), search for **Admob Banner**, check the highlighted result and press <kbd>Enter</kbd>. If AdMob isn't turned on yet, Nowa shows **Add Missing Dependencies**. Click **Add**.
2. Place the banner on a screen, usually at the top or bottom. It lands at 300 × 50. In an Android or iOS app it loads Google's standard banner, which is 320 × 50, so you may want to set **W** to 320 in **Layout**.
3. In **Details**, fill in **Android Unit ID** and **Ios Unit ID** with your banner ad unit IDs. In **Details** and the [Outline](../design/outline.md), the banner shows up under the name `NowaAdBannerWidget`.

**Show Test Ads** is on by default. While it's on, the banner shows Google's test ads instead of your own ad units. That matters: Google warns that clicking real ads during development can get your account flagged for invalid activity. Turn it off before you publish.

If **Details** shows "No API Keys" with an **AdMob setup** button, click the button to open the **AdMob** page and add the missing App ID. The same goes for a button named **AdMob Android setup** or **AdMob IOS setup** that replaces a unit ID field.

![An Admob Banner selected near the top of the home screen, drawn on the board as a red box reading This is an editor preview for Admob. Details, headed NowaAdBannerWidget, shows its Layout and, highlighted, the Android Unit ID and Ios Unit ID fields (both null) and the Show Test Ads switch, on.](/img/docs/integrations/integrations-admob-2.png)

What the banner shows depends on where it runs:

| Where | What you see |
|---|---|
| The board, **Play**, a browser or a desktop app | A red box: "This is an editor preview for Admob". |
| An Android or iOS app, **Show Test Ads** on | A Google test ad. |
| An Android or iOS app, **Show Test Ads** off | Your ad for that platform's unit ID. If the ID is empty you see "no adUnitId", and if the ad can't load, "BannerAd failed to load". |

To see a real ad, run the app on an Android or iOS device or emulator. That needs the desktop app. See [Run on a device or emulator](../test/devices.md).

## Show a full-screen ad

A full-screen ad (AdMob calls it an interstitial) covers the screen until the person closes it. Google suggests showing one at a natural break, such as after a level or between two steps of a task.

You show it with the `loadAndShowInterstitialAd` step, which loads the ad and shows it as soon as it's ready. Call it from an event, for example when a level ends or someone taps **Next**.

1. Open the event's function in Circuit ([Respond to taps and other events](../logic/events.md)).
2. Hover the dot under the top node and click **+**. In **All nodes for this circuit**, search for `loadAndShowInterstitialAd` and click it.
3. In **Details**, set **Android Unit ID** and **Ios Unit ID** to your full-screen ad unit IDs. **Show Test Ads** is on by default. Turn it off for your published app.

Like the banner, it only shows ads on Android and iOS.

:::tip[Or ask Nowa AI]
Try: "Show an AdMob full-screen ad every time the user finishes a level."
:::

## Before and after you publish {#before-you-publish}

- Turn **Show Test Ads** off on every banner and in every `loadAndShowInterstitialAd` step, and enter your real unit IDs.
- Check that both App IDs are set.
- Once your app is in a store, link it to its store listing in AdMob. Until AdMob reviews and approves the app, it gets only limited ads.
- Add an `app-ads.txt` file to the developer website shown in your store listing, so AdMob can confirm the app is yours. Google explains how in [Set up an app-ads.txt file](https://support.google.com/admob/answer/9363762).

## Turn AdMob off

First remove your banners and `loadAndShowInterstitialAd` steps, so nothing in your app still asks for ads. Then turn **Enabled** off. Nowa takes AdMob out of your app and removes your App IDs. Working in the code? See [What Nowa adds to your code](../code/generated-code.md#admob).

## Next steps

- [Run on a device or emulator](../test/devices.md)
- [Get ready to publish](../publish/index.md)
