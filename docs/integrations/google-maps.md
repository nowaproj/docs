---
title: Add Google Maps
description: Show an interactive Google map in your app by adding your API keys and placing the Google Maps widget.
sidebar_label: Google Maps
keywords: [google maps, map, maps api key, google_maps_flutter, marker, location, gps]
---

Put an interactive Google map on any screen. Add your API keys once in Settings, place the **Google Maps** widget, then run your app to see the map.

## Before you start

You need a Google Cloud API key for each platform you ship, with the matching Maps SDK enabled for it. Google explains how for [Android](https://developers.google.com/maps/documentation/android-sdk/get-api-key), [iOS](https://developers.google.com/maps/documentation/ios-sdk/get-api-key) and the [web](https://developers.google.com/maps/documentation/javascript/get-api-key). You manage your keys in the [Google Cloud console](https://console.cloud.google.com/).

## Turn on Google Maps

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **Google Maps**.
2. Turn on **Enabled**. Nowa adds the `google_maps_flutter` package and makes sure the iOS minimum version is at least 14.0.
3. Under **Configuration**, paste your **Android API Key**, **iOS API Key** and **Web API Key** for the platforms you ship. Keys look like `AIza...`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.

Nowa puts each key where its platform needs it:

| Key | Where Nowa writes it |
|---|---|
| **Android API Key** | The Android manifest, as the `com.google.android.geo.API_KEY` setting. |
| **iOS API Key** | The iOS `AppDelegate`, as `GMSServices.provideAPIKey`, with `import GoogleMaps`. |
| **Web API Key** | A Google Maps script tag in the web `index.html`. |

![The Google Maps page in Settings with its description. The Enabled switch (on) and, under Configuration, the Android API Key, iOS API Key and Web API Key fields showing the AIza placeholder are highlighted.](/img/docs/integrations/integrations-google-maps-1.png)

## Add the map

1. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> or click the **Widget** tool to open the [Library](../design/library.md), search for **Google Maps**, check the highlighted result and press <kbd>Enter</kbd>. If Nowa shows **Add Missing Dependencies**, click **Add**.
2. Place the widget on a screen and size it.
3. In **Details**, open **Initial Camera Position** and set **Target** (latitude and longitude) and **Zoom**. A new map starts at latitude 39.5, longitude -98 and zoom 4. The other map options are listed below it.

On the board the widget is a placeholder labeled "Google Maps" with the text "Run to preview". While no key is saved, **Details** can show "Google Maps API keys are not set. Please configure them in the project settings to use the Google Map widget." Click the gear next to the message to open the **Google Maps** page.

:::tip[Or ask Nowa AI]
Try: "Add a Google Map to the Contact screen and put a marker on our office."
:::

## See the map

The board and **Play** don't draw a live map. **Play** and a shared preview show "Run on a simulator/emulator or mobile device to preview" where the map would be. To see the real map, run your app:

- **Run** with the **Embedded preview** runs your app as a web app, so it uses your **Web API Key**. See [Run your app](../test/run.md).
- A simulator, emulator or device uses your **Android API Key** or **iOS API Key**. That needs the desktop app. See [Run on a device or emulator](../test/devices.md).

:::note[Show the user's location]
A new map starts with the my-location button on. For it to find the user, turn on a location permission under **Permissions** in Settings: **Fine Location** or **Coarse Location** for Android, **Location When In Use** for iOS. Nowa doesn't turn them on for you. See [Project settings](../account/project-settings.md).
:::

## Turn Google Maps off

Turn **Enabled** off to remove the package, your keys and their platform entries. Remove any **Google Maps** widgets from your screens first: a widget left behind turns into a box that says `Method "GoogleMap" is not found`.

## Next steps

- [Run on a device or emulator](../test/devices.md)
- [Project settings](../account/project-settings.md)
