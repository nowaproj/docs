---
title: Run your app
description: Compile and run your real Flutter app inside Nowa, in your browser or on your phone, and see your changes after every save.
sidebar_label: Run
keywords: [run, run app, embedded preview, nowa run, app run, hot reload, hot restart, real app preview, qr code, open on mobile, open in browser, logs, console, add web support, pub get, simulator]
---

**Run** compiles your real Flutter app, with its packages and custom code, and shows it inside Nowa. Edit, save, and the running app follows. Use it when you need to see exactly how your app behaves before you publish.

This page covers the **Embedded preview**, which earlier release notes call Nowa Run or App Run. To try your app on a phone or an emulator, see [Run on a device or emulator](devices.md).

:::note
In the [playground](../get-started/playground.md), and in a project you opened from someone's public link, the top bar shows **Save** instead of **Run**. Save the app to your account to run it.
:::

## Run your app

1. Click **Run** in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> on the board. Nowa saves your project and shows the app in a phone frame.
2. Wait for the first start. It can take a few minutes, and the preview says "Starting app..." and "This may take a few minutes...". Nowa starts preparing the preview when you open a project, so it is often ready already.
3. Tap, scroll and fill in forms in the app.
4. Change something in Nowa and save. Every save, automatic or with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>, updates the running app.
5. Click **Back to board** to return to the board. The app keeps running in the background.

A dot next to **Run** shows the state. Hover it to read it, for example "Running" or "Failed to start".

## Choose where to run

**Run** is a split button. The arrow next to it opens the **Run on** menu (shown as RUN ON). **Embedded preview** runs the app inside Nowa, as on this page. In the desktop app the menu also lists your devices and emulators. See [Run on a device or emulator](devices.md). In the web app it shows **iOS & Android devices** with "Download the desktop app" instead. **Run** acts on one target at a time.

While the preview is open, **Run** reads **Hide**. Click it to hide the preview. The app keeps running.

## Use the run toolbar

While the preview is open, these buttons replace the breadcrumbs in the top bar.

| Button | What it does |
|---|---|
| **Back to board** | Returns to the board. |
| **Phone** / **Tablet** | Switches the frame between a phone and a tablet. |
| **Fullscreen** | Shows the app without a frame. Shortcut: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>. |
| **Hot Reload** (local projects) or **Hot Restart** (cloud projects) | Applies your latest saved changes. A local run reloads in place. A cloud run has to come back up. Shortcut: <kbd>Shift</kbd> + <kbd>R</kbd>. |
| **Start** / **Stop** | Starts or stops the app. When it is stopped, **Start App** in the preview also starts it. |
| **Open in Browser** (local projects) | Opens the app at `http://localhost:<port>`. Only your computer can reach it. |
| **Open on Mobile** (cloud projects) | Drops down a "Scan the QR" code. Scan it with your phone's camera to open the running app on your phone. **Open In Browser** in the popup opens it on your computer instead. |

{/* CAPTURE: id=test-run-1 | state: signed-in cloud project open, Run clicked and the app running in the phone frame, Open on Mobile dropdown open | show: the run toolbar in the top bar (Back to board, Phone, Fullscreen, Hot Restart, Stop, Open on Mobile) and the Scan the QR dropdown with its code and Open In Browser | crop: top bar plus the preview area */}

## Fix a preview that won't start

The preview runs your app as a web app, so the app needs a `lib/main.dart` and a `web/` folder. If something is missing, Nowa says so when you click **Run**.

- **Web support is missing**: the app has no `web/` folder. Click **Add web support**, and Nowa creates the missing files and opens the preview. If that fails, you see "Could not generate the missing files. Check the logs for details."
- **Nothing to run**: Nowa can't find `lib/main.dart`, or the folder holds no Dart package. Click **Close**. You can still browse and edit the files, but there is no app to preview.

If the app starts but fails, the preview shows one of these screens.

| What you see | What it means | What to do |
|---|---|---|
| "Your app couldn't start because of a code error" | Your project has an error. | Click **Fix with AI**, or fix it yourself, then click **Retry**. |
| "The app preview failed to start" | Nowa can't tell whether your code or Nowa is at fault. | Click **Fix with AI**, which first works out where the problem is, or click **Retry**. |
| "The preview hit a problem on our side — your app is fine" | A problem on Nowa's side. | Click **Retry**. If it keeps happening, click **Report issue**. |
| "Your preview session timed out" | The session closed after a period of inactivity. | Click **Restart**. |

When a restart fails, for example after a save, a card at the top right says "Restart failed — showing the previous version". The previous version keeps running. Fix the error and save again. On cloud projects the card also has **Fix with AI**.

A local project runs the preview with your Flutter SDK. If it isn't set up, the error says "Flutter SDK path is not set. Please configure it in the settings." Set it up as described in [Install the desktop app](../get-started/desktop-app.md#setting-up-flutter-sdk).

**Fix with AI** opens the **AI Assistant** and puts a ready-made prompt with the error log into the chat. If the AI isn't busy, the prompt is sent at once. Otherwise it waits in the chat field. It runs in the chat's current mode, so use **Agent** mode to let the AI change your project. In **Plan** mode it only writes a plan. The same button appears on web publishing errors, and **Explain with AI** appears on failed app builds. See [Publish to the web](../publish/web.md) and [Build history and logs](../publish/builds.md).

## Read the logs {#read-the-logs}

Everything your running app prints, plus Nowa's own messages, goes to the **Console**.

1. Click the last log line in the status bar at the bottom. It reads **Ready** when nothing has been logged. The **Console** opens on its **Logs** tab.
2. Drag the title bar to move the **Console**, drag an edge to resize it, and select text to copy it.
3. Use the buttons at the top right of **Logs**. **Pub get** (the terminal icon) downloads your project's packages again, and **Clear** empties the list.

When a run on a device can't start, a separate **Log** panel opens by itself. The **Problems** tab is covered in [Find and fix problems](problems.md).

:::tip
Run the app first, then ask Nowa AI: "Why does the app show an error when I tap Sign in? Check the logs and fix it." The agent can read your app's logs once you have run the app.
:::

## Next steps

- [Run on a device or emulator](devices.md): try the real app on a phone or an emulator.
- [Share your app](share.md): send a link to a preview.
- [Find and fix problems](problems.md): check your project for errors.
