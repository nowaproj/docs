---
title: Preview and test
description: Try your app at every step, from an instant tap-through on the board to the real compiled app on your phone, and share a preview link.
sidebar_label: Overview
keywords: [preview, test, test your app, try your app, instant play, instant preview, play, run, nowa run, app run, simulator, emulator, run on device, share preview, problems]
---

You can try your app at every step without leaving Nowa. Three names show up on the buttons, and each one means one thing:

| You see | It means | Learn more |
|---|---|---|
| **Play** (**Instant preview** on the phone layout) | Instant Play: Nowa interprets your app, so it starts at once and is close to the real app, not exact. | [Play your app on the board](instant-play.md) |
| **Run** (**Run real app** on the phone layout) | Your real app, compiled. On a computer it shows in the **Embedded preview** or on a device. | [Run your app](run.md) |
| **Share preview** | A link and QR code that open Instant Play in other people's browsers, so they can tap through your app. | [Share your app](share.md) |

## Instant Play or Run?

Both show your app working, in different ways. Instant Play interprets your app, so it starts at once but is only close to the real thing. Run compiles your app, so it takes longer and shows exactly what your users will get.

| | Instant Play | Run |
|---|---|---|
| Start it | **Play** in a screen's title bar, or right-click a widget and choose **Play** | **Run** in the top bar |
| What it does | Nowa interprets your app on the board | Nowa compiles your real Flutter app |
| Speed | Instant, with no build | The first start can take a few minutes. After that, every save updates it |
| Accuracy | Close, not exact | The real app |
| Your own code and packages | What Nowa can't read shows as a placeholder or is left out | All of it runs |
| Features that need a phone | Placeholders, or simulated, as with maps and Firebase sign-in | Real, when you run on a phone or an emulator |
| Share it | **Share preview** gives a link and a QR code (cloud projects) | **Open on Mobile** shows a QR code for your phone (cloud projects) |
| In the playground | Yes | No, the top bar shows **Save** |
| Best for | Layout, flows and quick checks while you design | Real behavior, before you publish |

Design with Instant Play, and run the app before you publish. If the two ever disagree, Run is right. That is why Instant Play shows a warning icon that says "In board preview is not 100% accurate, run the app to see the real output".

On a phone, **Play** opens **Play your app** with the same two choices: **Instant preview**, marked **SIMULATED**, and **Run real app**, marked **REAL APP**. See [Use Nowa on your phone](../get-started/mobile.md).

[Test in the right place](../guides/ship-tips.md#test-in-the-right-place) shows when to use **Play**, **Run**, a device or a shared link, plus a few habits for testing flows.

## What's in this section

| Page | What you can do |
|---|---|
| [Play your app on the board](instant-play.md) | Tap, scroll and type in any screen, right on the board. |
| [Run your app](run.md) | Compile the real app and see it inside Nowa, in your browser or on your phone. |
| [Run on a device or emulator](devices.md) | Try the app on a phone, an emulator or your computer, in the desktop app. |
| [Share your app](share.md) | Send a preview link and QR code, or open the whole project to others. |
| [Find and fix problems](problems.md) | Read errors and warnings, jump to them and fix them. |

## Next steps

- [Get ready to publish](../publish/index.md): put your app on the web or in the app stores.
- [Troubleshooting](../troubleshooting/index.md): fix an app error, or find the message Nowa shows.
- [Build a great app](../guides/index.md): a complete walkthrough and tips for design, Nowa AI, data and shipping.
