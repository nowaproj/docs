---
title: Troubleshooting
description: Fix an error in your app, or find the message or symptom you see in Nowa, learn why it appears, and follow the steps that fix it.
sidebar_label: Overview
keywords: [troubleshooting, error, my app shows an error, app error, error when I run, logs, Problems, Fix with AI, not working, stuck, help, fix, No Internet Connection, We'll Be Right Back, Maintenance in Progress, Version out of date, update, Preview Not Available, Project not found, Unable to load project, safe mode, This screen failed to render, Reload screen, could not be loaded, Web support is missing, Add web support, Nothing to run, Flutter SDK path is not set, No devices connected, Clone from GitHub, Time to level up]
---

Something not working? Find the message or symptom you see below, and you'll find why it happens and how to fix it. Messages are quoted exactly as Nowa shows them, so you can search this page for the words on your screen (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>).

If your app shows an error, start with [My app shows an error](#my-app-shows-an-error). Limits that depend on where you run Nowa are on [Known issues](known-issues.md).

## My app shows an error

Start here when your app shows an error or doesn't do what you expect. Work through the steps in order: each one either fixes the problem or tells you more about it.

1. Open **Problems**. Click the red error count in the status bar at the bottom of the editor, and the **Console** opens on **Problems**. A row with a **Fix** button has a one-click fix. See [Find and fix problems](../test/problems.md).
2. Run the app and read the logs. Click **Run**, repeat what caused the error, then click the last log line in the status bar. The **Console** opens on **Logs**, where your running app prints its errors. See [Read the logs](../test/run.md#read-the-logs).
3. Ask Nowa AI to fix it. If an error screen offers **Fix with AI**, click it to send Nowa AI the error log in the chat. Or switch to **Agent** mode and describe what happens, for example: "Why does the app show an error when I tap Sign in? Check the logs and fix it." The agent can read your app's logs once you have run the app.
4. Check for a placeholder. If a widget on the board shows as a placeholder, Nowa couldn't read that part of your app. See [A widget shows as a placeholder](#a-widget-shows-as-a-placeholder-or-problems-says-could-not-be-loaded) and [What Nowa can show on the board](../code/limitations.md).

If the preview itself won't open, see [The preview won't start](#the-preview-wont-start).

## The preview won't start

- **Web support is missing**: click **Add web support**, and Nowa creates the files the preview needs. If it says "Could not generate the missing files. Check the logs for details.", open the **Console** → **Logs**.
- **Nothing to run** with "Cannot find lib/main.dart, so there is no app to launch.": your app's main file is missing. Click **Fix** on "Main file is not found" in **Problems** to get a new one, then click **Run** again.
- "Your app couldn't start because of a code error" or "The app preview failed to start": click **Fix with AI**, or fix the error yourself, then click **Retry**.
- "The preview hit a problem on our side — your app is fine": click **Retry**, and if it keeps happening, **Report issue**.
- "Your preview session timed out": click **Restart**.
- "Your app is running" with an **Open in Browser** button, in the Linux desktop app: nothing is wrong. The in-app preview isn't available on Linux yet, so click **Open in Browser** to see your app. See [Choose where to run](../test/run.md#choose-where-to-run).

See [Fix a preview that won't start](../test/run.md#fix-a-preview-that-wont-start).

## This screen failed to render

One screen or component hit an error while Nowa drew it, so that item shows the error instead. The rest of the board keeps working.

1. Read the error text on the card.
2. Ask Nowa AI in **Agent** mode to fix it: tell it which screen shows the error and what the card says. If you work in code, you can fix the cause yourself.
3. Click **Reload screen**.

See [Big boards and errors](../design/boards.md#big-boards-and-errors).

## A widget shows as a placeholder, or Problems says "could not be loaded"

Nowa draws your screens by reading your app's code. When it can't read a part, it keeps that part as it is or skips it, and tells you why.

1. Open **Problems** and look for `'<name>' could not be loaded: <reason>`. Or select the placeholder: **Details** shows **Kept as code** and the reason.
2. Click **Run** to see the real app, which builds all of your code.
3. To make the part editable on the board again, select it and ask Nowa AI in **Agent** mode: "Why does this widget show as a placeholder? Can you make it editable?"

See [See code Nowa couldn't read](../test/problems.md#see-code-nowa-couldnt-read).

## A package is missing or failed to load

Packages are ready-made add-ons your app uses, such as maps or sign-in. **Problems** names the one that's in trouble.

- `'<package>' is imported but is not in the pubspec.`: click **Fix**, and Nowa adds the package.
- `'<package>' is a dev dependency, so Nowa does not load it. ...`: ask Nowa AI in **Agent** mode to move the package from dev dependencies to dependencies. If you edit code yourself, move it to `dependencies` in `pubspec.yaml`.
- `'<package>' is installed but failed to load ...: <reason>`: read the reason and try another version under **Settings** → **Packages**.

See [Fix problems that have no button](../test/problems.md#fix-problems-that-have-no-button) and [Add packages](../code/packages.md).

## A build, a publish or an integration fails

- [When a build fails](../publish/builds.md#when-a-build-fails), [If the iOS code signing step fails](../publish/ios.md#if-the-ios-code-signing-step-fails) and [If publishing fails](../publish/web.md#if-publishing-fails)
- [Firebase](../integrations/firebase/connect.md#if-something-goes-wrong), [Supabase](../integrations/supabase/connect.md#if-something-goes-wrong), [Stripe](../integrations/stripe.md#fix-common-problems) and [REST API imports](../integrations/rest-api/import.md#if-an-import-fails)
- [GitHub connection problems](../code/github.md#fix-connection-problems)

## Nowa AI shows an error

Errors appear in the chat with a way to continue. [Recover from errors](../ai/chat.md#recover-from-errors) covers **Retry**, "Service under load", "Session Limit Reached" and "You ran out of credits".

## Time to level up

A feature needs a plan that includes it, or its allowance is used up. Click **Upgrade** to open **Billing**. See [When Nowa asks you to upgrade](../account/plans-and-usage.md#time-to-level-up).

## Preview Not Available

The screen says "This project preview cannot be accessed. It may be private, deleted, or the URL is incorrect. Please contact the project owner for more information."

Check the address, then click **Sign In** and use an account that has access to the project. Or ask the owner for access, or to share the preview as **Public**.

If it's your project, see [Share your app](../test/share.md). **Public** makes the whole project public, so read the warning there first.

## Unable to load project

Nowa couldn't open the project. Click **Back to dashboard** and open it again. If it keeps failing, check that you're signed in with an account that can open it. Then send the message, which holds the project ID and the error Nowa got, to support with **?** → **Chat with support**, or email [team@nowa.dev](mailto:team@nowa.dev). That information helps the team find the cause quickly. See [Get help](../account/help.md).

## Project not found

Nowa can't find a local project's folder because it was moved, renamed or deleted. Your project isn't lost if the folder still exists somewhere: point Nowa to it.

1. Click the **Use…** button, such as **Use my_app**, if Nowa found the folder next to the old one. Otherwise click **Locate folder** and pick your project's folder, the one that holds your app's files, including `pubspec.yaml`.
2. If the folder is gone for good, click **Remove from projects**.

A cloud project shows **Try again** instead. See [Fix "Project not found"](../account/projects.md#project-not-found).

## A project freezes or misbehaves when it opens

Nowa reopens the tabs you had open last time, so a tab that hangs the editor hangs it on every open. Safe mode breaks that loop.

1. On the dashboard, click ⋮ on the project and choose **Open in safe mode**. Nowa skips the old tabs.
2. The workspace says **Nothing is open**. Click **Open board**, **Browse widgets** (it opens the [Library](../design/library.md)) or **Open code mode**.
3. Ask Nowa AI to fix what caused it, or fix the file yourself if you work in code.

See [Use the project menu](../account/projects.md#project-menu).

## Flutter SDK path is not set

The preview and the code check of a local project need Flutter, Google's free toolkit that builds your app, and Nowa doesn't know where it is on your computer. The message reads "Exception: Flutter SDK path is not set. Please configure it in the settings." Set it up in **Local Setup**, where Nowa can also download Flutter for you. See [Set up Flutter](../get-started/desktop-app.md#setting-up-flutter-sdk).

## No devices in the Run on menu

- **Web app:** the menu shows "iOS & Android devices" with "Download the desktop app", because the web app can't reach your devices. Click the row to get the desktop app, or use **Open on Mobile** for a cloud project on your phone.
- **Desktop app:** "No devices connected. Plug in a device or start an emulator below." means Flutter found none. Connect a phone, or click an emulator under **Start an emulator**. If the message ends with "set up an emulator" instead, Nowa found no emulator it can start. An Android phone also needs **USB debugging** turned on before it shows up.

See [Run on a device or emulator](../test/devices.md), with [Run on your Android phone](../test/devices.md#run-on-your-android-phone) and [No emulators listed?](../test/devices.md#no-emulators-listed).

## Share preview or Cloud build is not available on local projects

Sharing a preview and cloud builds need a cloud project. Click **Sync to cloud**. It opens **Project Sync**, where you copy the project to the cloud. See [Share your app](../test/share.md) and [Publish a local project](../publish/index.md#publish-a-local-project).

## The repository list in Clone from GitHub is empty

Nowa lists only the repositories your connected GitHub account lets it use, and shows none until GitHub is connected.

1. [Connect GitHub](../code/github.md#connect-github), then open **Clone from GitHub** again.
2. If a repository is missing, click **Manage your connected repositories** under the list and allow it.

If **Time to level up** appears instead, your plan doesn't include Git integration. See [Import an existing Flutter project](../code/import.md#clone-from-github).

## Upgrade to unlock desktop version, or use on web at app.nowa.dev

The desktop app checks that your plan includes desktop access. The page shows your billing options under the message. Upgrade there, then click **Refresh** (see [pricing](https://nowa.dev/pricing)), or click the message to use Nowa in your browser at app.nowa.dev.

## A new version of Nowa is available {#update-prompts}

An update is out. The dashboard shows this dialog with both versions.

- **Desktop app on macOS and Windows:** click **Update to v…**. When it says "Download complete!", click **Install & Restart**, and Nowa reopens on the new version. **Later** and **Skip** wait. **Or download manually** opens the download link.
- **Desktop app on Linux:** Nowa doesn't install updates itself. Click **Download v…** to get the new archive, then run `install.sh` from it again. **Skip** waits. See [Install on Linux](../get-started/desktop-app.md#install-on-linux).
- **Web app:** click **Update**. The page reloads on the new version.

"Update failed" shows the reason underneath, for example "Could not connect to the update server. Please check your internet connection and try again." Click **Retry**, or **Download manually instead**.

## Version out of date

Your version of Nowa is too old for Nowa's servers, so this screen replaces the app. The message under the title comes from Nowa.

- **Web app:** clear your browser cache, then click **Refresh**. **Download** also offers the desktop app.
- **Desktop app:** click **Download** and install the newer version.

## No Internet Connection

Nowa couldn't reach the internet while it checked your account. The desktop app shows "Please check your internet connection and try again." with a **Retry** button. Check that your computer is online, then click **Retry**.

If you start the desktop app without a connection, it may open the sign-in page instead. Connect to the internet, then sign in again or restart Nowa.

## We'll Be Right Back or Maintenance in Progress

Nowa's servers are unreachable or down for maintenance. "Maintenance in Progress" shows the server's message, or "The server is currently under maintenance. Please try again later." Neither screen has a button.

Wait a few minutes, then reload the page or restart the desktop app. If it lasts, email [team@nowa.dev](mailto:team@nowa.dev).

## Still stuck?

You're not on your own. Click **?** and choose **Report an issue** (with a project open) or **Chat with support**, or email [team@nowa.dev](mailto:team@nowa.dev). See [Get help](../account/help.md#report-an-issue).

## Next steps

- [Find and fix problems](../test/problems.md): check your project for errors.
- [Run your app](../test/run.md): build the real app and read its logs.
- [Known issues](known-issues.md): limits that depend on where you run Nowa.
