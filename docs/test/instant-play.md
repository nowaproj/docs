---
title: Play your app on the board
description: Use Instant Play to tap, scroll and type in any screen right on the board, with no build and no waiting.
sidebar_label: Instant Play
keywords: [instant play, play, play button, instant preview, app preview, play mode, test a screen, preview on the board, interpreted preview]
---

Instant Play runs a screen right on the board, so you can tap through it without leaving the editor. It starts at once, with no build, which makes it the fastest way to check a layout or a flow. In the app, the action is called **Play**.

## Play a screen

1. Hover the name above a screen or component on the board, or select the item. A play button appears next to the name.
2. Click it (its tooltip is **Play**). The board zooms to the item, an orange border marks it, and it comes alive.
3. Tap, scroll and type as you would in the real app. While an item plays, scrolling over it scrolls your app, not the board.
4. Click **Stop** when you're done. It sits in the item's name bar and in the controls at the bottom of the board.

{/* CAPTURE: id=test-instant-play-1 | state: playground starter open, one screen playing (title-bar play button clicked) | show: the playing screen with its orange border, the stop button in its name bar, and the play controls at the bottom (This screen is capturing scroll, Share preview, Reset zoom, Stop, warning icon) | crop: board area with the bottom controls (no side panels) */}

While something plays, the toolbar at the bottom of the board is replaced by the play controls.

| Control | What it does |
|---|---|
| **This screen is capturing scroll** | A reminder that scrolling over the playing item scrolls your app, not the board. |
| **Share preview** | Opens a link and QR code to share a preview. Cloud projects only. See [Share your app](share.md). |
| **Reset zoom** | Zooms the board back onto the playing item. |
| **Stop** | Ends Instant Play. |
| Warning icon | Hover it to read the accuracy note (see below). |

## Play any widget

Right-click a widget on the board and choose **Play**. Nowa plays the whole board item the widget belongs to: the screen, the component, or the loose widget itself. This is how you play a loose widget, which has no name bar of its own.

**Play** shows in the right-click menu when exactly one widget is selected and nothing is playing yet.

## Switch to another item

While an item plays, select another item on the board to play that one instead. You don't need to stop first.

The playing item can't be moved or resized, and clicks on it go to your app, not to the editor. The designer's keyboard shortcuts are off until you stop.

## Know what Instant Play can't show

Instant Play is quick because Nowa interprets your app instead of compiling it. That keeps it close to the real app, but not identical. Hover the warning icon in the play controls to read Nowa's note: "In board preview is not 100% accurate, run the app to see the real output".

Expect these differences:

- Some custom code and packages show as placeholders, or not at all. [What Nowa can show on the board](../code/limitations.md) lists what is supported.
- Widgets that need a real device show a note instead. The **Google Maps** and **RevenueCat Paywall** widgets say "Run on a simulator/emulator or mobile device to preview".
- Some services are simulated. Firebase sign-in, for example, doesn't sign you in. Nowa asks you to pick a test user or a test error.

To check the real behavior, [run your app](run.md), or [run it on a device](devices.md).

## Placeholders on the board, real values in Play

On the board, Nowa fills in empty values so a design never looks blank. Text from an empty variable shows as `[name]`, a list shows three sample items, and an image shows a stand-in picture. These placeholders are for designing.

When you press **Play**, your app runs its own logic instead. You see what your variables and functions produce, so an empty list stays empty until your logic fills it, just as in the real app.

## Next steps

- [Share your app](share.md): send a link or QR code to a preview.
- [Run your app](run.md): compile and run the real thing.
- [Find and fix problems](problems.md): see why a screen doesn't look right.
- [Work with boards](../design/boards.md): move around the board and its items.
