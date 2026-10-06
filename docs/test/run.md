---
title: Run your app
description: Compile and run your real Flutter app inside Nowa, in your browser or on your phone, and see your changes after every save.
sidebar_label: Run
keywords: [run, run app, embedded preview, nowa run, app run, hot reload, hot restart, real app preview, qr code, open on mobile, open in browser, logs, console, add web support, pub get, simulator]
---

**Run** compiles your real Flutter app, with its packages and custom code, and shows it right inside Nowa. Edit, save, and the running app follows. Use it when you need to see exactly how your app behaves before you publish.

This page covers the **Embedded preview**, which earlier release notes call Nowa Run or App Run. To try your app on a phone, an emulator or your computer, see [Run on a device or emulator](devices.md).

:::note
In the [playground](../get-started/playground.md), and in a project you opened from someone's public link, there is no **Run**. The top bar shows **Save** instead. Save the app to your account to run it.
:::

## Run your app

1. Click **Run** in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> on the board. Nowa saves your project and shows the app in a phone frame.
2. Wait for the first start. It can take a few minutes, and the preview says "Starting app..." and "This may take a few minutes...". Nowa starts preparing the preview in the background when you open a project, so it is often ready already.
3. Use the app. Tap, scroll and fill in forms.
4. Change something in Nowa and save. Every save, automatic or with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>, updates the running app.
5. Click **Back to board** to return to the board. You can also click **Hide**, which is what **Run** reads while the preview is open. The app keeps running in the background.

A small dot next to **Run** shows the state. Hover it to read it: "Not running", "Starting…", "Running", "Restarting…", "Stopping…", "Failed to start" or "Last restart failed".

## Use the run toolbar

While the preview is open, these buttons replace the breadcrumbs in the top bar.

| Button | What it does |
|---|---|
| **Back to board** | Returns to the board. The app keeps running. |
| **Phone** / **Tablet** | Switches the frame between a phone and a tablet. |
| **Fullscreen** | Shows the app without a frame. Shortcut: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>. |
| **Hot Reload** (local projects) or **Hot Restart** (cloud projects) | Applies your latest saved changes. A local run reloads in place. A cloud run has to come back up. Shortcut: <kbd>Shift</kbd> + <kbd>R</kbd>. |
| **Start** / **Stop** | Starts or stops the app. When the app is stopped, **Start App** in the preview also starts it. |
| **Open in Browser** (local projects) or **Open on Mobile** (cloud projects) | Opens the running app outside Nowa. See the next section. |

{/* CAPTURE: id=test-run-1 | state: signed-in cloud project open, Run clicked and the app running in the phone frame, Open on Mobile dropdown open | show: the run toolbar in the top bar (Back to board, Phone, Fullscreen, Hot Restart, Stop, Open on Mobile) and the Scan the QR dropdown with its code and Open In Browser | crop: top bar plus the preview area */}

## Open the running app on your phone

For a cloud project:

1. Click **Open on Mobile**, the QR code icon in the toolbar. A "Scan the QR" popup opens.
2. Scan the code with your phone's camera. The running app opens in your phone's browser.
3. Click **Open In Browser** in the popup to open it on your computer instead.

For a local project, click **Open in Browser**. The app runs on your computer at `http://localhost:<port>`, so only your computer can open it.

## Fix a preview that won't start

Click **Run** again after each fix.

### Add missing web support

The preview runs your app as a web app, so the app needs a `lib/main.dart` and a `web/` folder. If something is missing, Nowa says so when you click **Run**:

- **Web support is missing**: the app has no `web/` folder. Click **Add web support**. Nowa creates the missing files. If that fails, Nowa shows "Could not generate the missing files. Check the logs for details."
- **Nothing to run**: Nowa can't find `lib/main.dart`, or the folder holds no Dart package. Click **Close**. You can still browse and edit the files, but there is no app to preview.

### Read the error screen

| What you see | What it means | What to do |
|---|---|---|
| "Your app couldn't start because of a code error" | Your project has an error. | Click **Fix with AI**, or fix it yourself, then click **Retry**. |
| "The app preview failed to start" | Nowa can't tell whether the cause is your code or Nowa. | Click **Fix with AI**. It first works out where the problem is. Or click **Retry**. |
| "The preview hit a problem on our side — your app is fine" | A problem on Nowa's side. | Click **Retry**. If it keeps happening, click **Report issue**. |
| "Your preview session timed out" | The session closed after a period of inactivity. | Click **Restart**. |

When a restart fails, for example after a save, a card at the top right says "Restart failed — showing the previous version". The previous version keeps running. Fix the error and save again. On cloud projects the card also has **Fix with AI**.

A local project runs the preview with your Flutter SDK. If it isn't set up, the error says "Flutter SDK path is not set. Please configure it in the settings." Set it up as described in [Install the desktop app](../get-started/desktop-app.md#setting-up-flutter-sdk).

## Let Nowa AI fix it

**Fix with AI** hands the problem to Nowa AI:

1. Click **Fix with AI**. The **AI Assistant** panel opens.
2. Nowa puts a ready-made prompt, with the error log, into the chat. If the AI isn't busy, the prompt is sent at once. Otherwise it waits in the chat field for you to send it.

The prompt runs in the chat's current mode. Use **Agent** mode so the AI can change your project. In **Plan** mode it only writes a plan. The same button also appears on web publishing errors, and **Explain with AI** appears on failed app builds. See [Publish to the web](../publish/web.md) and [Build history and logs](../publish/builds.md).

## Read the logs {#read-the-logs}

Everything your running app prints, plus Nowa's own messages, goes to the **Console**.

1. Click the last log line in the status bar at the bottom. It reads **Ready** when nothing has been logged. The **Console** opens on its **Logs** tab.
2. Drag the title bar to move the **Console**, drag an edge to resize it, and select text to copy it.
3. Use the buttons at the top right of **Logs**. **Pub get** (the terminal icon) downloads your project's packages again, and **Clear** empties the list.

When a run on a device fails, a separate **Log** panel opens by itself. The **Problems** tab next to **Logs** is covered in [Find and fix problems](problems.md).

:::tip
Run the app first, then ask Nowa AI: "Why does the app show an error when I tap Sign in? Check the logs and fix it." The agent can read your app's logs once you have run the app.
:::

## Next steps

- [Run on a device or emulator](devices.md): try the real app on a phone or an emulator.
- [Share your app](share.md): send a link to a preview.
- [Find and fix problems](problems.md): check your project for errors.
