---
title: Run on a device or emulator
description: Run your real app on a phone, an emulator, a simulator or your computer, and see every change after a save.
sidebar_label: Devices and emulators
keywords: [run on device, physical device, real device, emulator, simulator, ios simulator, android emulator, usb, hot reload, hot restart, local cache, flutter sdk, run locally]
---

Run your real app on a phone, an emulator, a simulator or your own computer, and watch it update each time you save. Because the app runs on the device itself, this is the most realistic test you can do before you publish.

<Badge type="desktop" />

It works for cloud projects and for local projects.

## Before you start

- Use the [Nowa desktop app](../get-started/desktop-app.md). In the web app, the **Run on** menu has no devices. It shows **iOS & Android devices** with "Download the desktop app" instead.
- Set up Flutter in **Local Setup**. See [Set up Flutter](../get-started/desktop-app.md#setting-up-flutter-sdk). If Flutter isn't set up when you pick a device, Nowa opens Local Setup for you.
- On a Mac, install Xcode first to run on an iPhone or the iOS Simulator. See [Install Xcode](../get-started/desktop-app.md#macos-install-xcode).

## Run on a device

1. Click the arrow next to **Run** to open the **Run on** menu.
2. Look under **DEVICES** (the menu shows it as DEVICES). Nowa lists what your Flutter SDK finds, such as a connected phone, a running emulator, a browser or your own computer. While it searches you see "Looking for devices…". If it says "No devices connected", plug in a device or start an emulator.
3. Click your device. Nowa builds your app and starts it there. **Run** now shows the device's name, and clicking it runs on the same device again.
4. Wait for the first build. The top bar shows a spinner and a **Cancel** button while it builds. Once the app is running, you see **Stop**, a lightning bolt (**Hot restart**) and an arrow (**Run target**).
5. Change something in Nowa and save. The running app reloads with your changes. If a change doesn't show up, for example a theme change, click the lightning bolt to restart the app.
6. Click **Stop** when you're done.

{/* CAPTURE: id=test-devices-1 | state: desktop app, signed in, a cloud project open with a phone or emulator connected, Run caret clicked | show: the Run on menu with Embedded preview, a device row, Start an emulator rows, the Local cache row and Local environment settings | crop: the open menu with the top bar above it */}

If you unplug the selected device, **Run** goes back to the **Embedded preview**. Build and app messages go to the **Logs** tab of the **Console**, and a failed run opens the **Log** panel by itself. See [Read the logs](run.md#read-the-logs).

## Start an emulator or simulator

The **Run on** menu also lists emulators and simulators that your Flutter SDK knows about, under **Start an emulator** (shown as START AN EMULATOR).

1. Click an emulator. It starts.
2. Wait for it to show up in the device list. Nowa then selects it as your run target.
3. Click **Run** to run on it.

If the emulator you want isn't listed, create it first. See Android's [emulator guide](https://developer.android.com/studio/run/emulator) and Apple's guide to [installing Xcode and simulators](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators).

## Run a cloud project on a device

Cloud projects run the same way. Nowa keeps a temporary copy of your project on your computer and runs that copy.

- The first run downloads the project, so it takes longer. The top bar shows the steps, from "Saving project…" to "Syncing files…", with a **Cancel** button.
- Later runs only sync the files you saved.
- The **Local cache** row in the **Run on** menu shows the copy's state: "Created on the first device run" or "Cached on disk · re-synced on save".

Hover the **Local cache** row to see its actions.

| Action | What it does |
|---|---|
| **Clear the local cache** | Deletes the copy and its build files. Stop the app first. The next device run downloads everything again. |
| **Show in folder** | Opens the copy's folder on your computer. |
| **Re-download everything and run again** | Replaces the copy with a fresh download, then runs again. Use it after big changes, such as adding a package that needs native setup. |

Nowa removes copies you haven't used for 14 days.

Local projects need no copy. They run straight from your project folder.

To change your Flutter setup later, click **Local environment settings** at the bottom of the **Run on** menu.

## Next steps

- [Run your app](run.md): run inside Nowa, no device needed.
- [Find and fix problems](problems.md): see why a build or run failed.
- [Work with local projects](../code/local-projects.md): keep your project in a folder on your computer.
