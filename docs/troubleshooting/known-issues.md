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

You can still build the query and use it in your app. To see real results:

1. Connect the query to your UI (see [Use Cloud Firestore](../integrations/firebase/firestore.md)).
2. Run your app on a simulator, an emulator or a phone (see [Run on a device or emulator](../test/devices.md)).

Or open the same project in the web app or the macOS desktop app, where query testing works.

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

## No Linux desktop app

The desktop app is available for macOS and Windows. On Linux, use the web app at
[app.nowa.dev](https://app.nowa.dev). Local projects need the desktop app (see
[Cloud and local projects](../get-started/cloud-and-local.md)).

## Next steps

- [Troubleshooting](index.md): find a fix by the message you see.
- [Get help](../account/help.md): chat with the Nowa team, report an issue or find the community.
