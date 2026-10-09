---
title: Known issues
description: Platform limits you may run into when you use Nowa, and how to work around each one.
sidebar_label: Known issues
keywords: [known issues, limitations, Windows, Firebase, Firestore, Apple sign-in, Google Maps, AdMob, CORS, desktop app, Linux]
---

A few things work differently depending on where you run Nowa or your app. Here's what to expect and the quickest way
around each one.

## Firestore queries can't be tested on Windows {#firebase-on-windows}

In the Windows desktop app, the **Test** section of a Firestore query is switched off. It shows "Testing Firestore
Queries isn't possible on Windows version".

You can still use your queries in your app. To see real results:

1. Connect the query to your UI (see [Use Cloud Firestore](../integrations/firebase/firestore.md)).
2. Run your app on a simulator, an emulator or a phone (see [Run on a device or emulator](../test/devices.md)).

Or open the same project in the web app or the macOS desktop app, where the **Test** section is on. In Nowa 3.13 the designer can't open a query in its editor on any platform: see [Add collections and queries in Nowa 3.13](../integrations/firebase/firestore.md#add-collections-and-queries).

## API tests fail in the web app but work elsewhere {#api-requests-blocked-in-the-browser}

In the web app, Nowa sends test requests from your browser. Browsers only allow those requests when the API permits
them (CORS). If an API doesn't, the test fails in the web app even though the same request works in the desktop app
and in your built mobile app.

To test it anyway, use the desktop app, or check the API's settings for allowed origins. See
[Connect a REST API](../integrations/rest-api/index.md).

## Continue with Apple is missing in the desktop app

**Continue with Apple** appears only in the web app and on iOS. In the desktop app, sign in with email or
**Continue with Google**. If you signed up with Apple, sign in from the web app or on iOS. See
[Create your account](../get-started/create-account.md).

## Google Maps shows a placeholder

The **Google Maps** widget shows "Run to preview" on the board. In **Play** and in a shared preview it says "Run on a
simulator/emulator or mobile device to preview". Neither draws a live map, so run your app to see the real one. See
[Add Google Maps](../integrations/google-maps.md).

## Ads show test ads

The **Admob Banner** widget and interstitial ads show Google's test ads until you turn **Show Test Ads** off, and real
ads run only on Android and iOS. See [Show ads with AdMob](../integrations/admob.md).

## Instant Play is close, not exact

**Play** on the board runs your screens instantly, but it's an approximation. Its own tooltip says so: "In board
preview is not 100% accurate, run the app to see the real output". Use **Run** to check the real app. See
[Preview and test](../test/index.md).

## Linux: the preview opens in your browser and updates are manual

The Linux desktop app has no in-app preview yet. When you run your app, the preview pane says "Your app is running" and offers **Open in Browser**. Click it to see your app in your browser. See [Run your app](../test/run.md#choose-where-to-run).

The Linux app doesn't install updates itself either. When a new version is out, the message offers **Download v…** and **Skip**. Download the new archive and run `install.sh` again. See [Install on Linux](../get-started/desktop-app.md#install-on-linux).

## Next steps

- [Troubleshooting](index.md): find a fix by the message you see.
- [Get help](../account/help.md): chat with the Nowa team, report an issue or find the community.
