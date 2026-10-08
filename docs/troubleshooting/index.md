---
title: Troubleshooting
description: Fix an error in your app, or find the message or symptom you see in Nowa, learn why it appears, and follow the steps that fix it.
sidebar_label: Overview
keywords: [troubleshooting, error, my app shows an error, app error, error when I run, logs, Problems, Fix with AI, not working, stuck, help, fix, No Internet Connection, We'll Be Right Back, Maintenance in Progress, Version out of date, update, Preview Not Available, Project not found, Unable to load project, safe mode, This screen failed to render, Reload screen, could not be loaded, Web support is missing, Add web support, Flutter SDK path is not set, Clone from GitHub, Time to level up]
---

Find the message or symptom you see, and follow the fix. Messages are quoted as Nowa shows them. If your app shows an error, start with [My app shows an error](#my-app-shows-an-error). Limits that depend on where you run Nowa are on [Known issues](known-issues.md).

## My app shows an error

Start here when your app shows an error or doesn't do what you expect. Work through the steps in order.

1. Open **Problems**. Click the red error count in the status bar at the bottom of the editor, and the **Console** opens on **Problems**. A row with a **Fix** button has a one-click fix. See [Find and fix problems](../test/problems.md).
2. Run the app and read the logs. Click **Run**, repeat what caused the error, then click the last log line in the status bar. The **Console** opens on **Logs**, where your running app prints its errors. See [Read the logs](../test/run.md#read-the-logs).
3. Ask Nowa AI to fix it. If an error screen offers **Fix with AI**, click it to send Nowa AI the error log in the chat. Or switch to **Agent** mode and ask: "Why does the app show an error when I tap Sign in? Check the logs and fix it." The agent can read your app's logs once you have run the app.
4. Check for a placeholder. If a widget on the board shows as a placeholder, Nowa couldn't read its code. See [A widget shows as a placeholder](#a-widget-shows-as-a-placeholder-or-problems-says-could-not-be-loaded) and [What Nowa can show on the board](../code/limitations.md).

If the preview itself won't open, see [The preview won't start](#the-preview-wont-start).

## The preview won't start

- "Web support is missing": click **Add web support**. If it says "Could not generate the missing files. Check the logs for details.", open the **Console** → **Logs**.
- "Nothing to run": Nowa can't find `lib/main.dart`, or the folder holds no Dart package. For a missing `lib/main.dart`, click **Fix** on "Main file is not found" in **Problems**, then click **Run** again.
- "Your app couldn't start because of a code error" or "The app preview failed to start": click **Fix with AI**, or fix the error yourself and click **Retry**.
- "The preview hit a problem on our side — your app is fine": click **Retry**, and if it keeps happening, **Report issue**.
- "Your preview session timed out": click **Restart**.

See [Fix a preview that won't start](../test/run.md#fix-a-preview-that-wont-start).

## This screen failed to render

One screen or component hit an error while Nowa drew it, so that item shows the error. The rest of the board keeps working.

1. Read the error text on the card.
2. Fix the cause in the code, or ask Nowa AI.
3. Click **Reload screen**.

See [Big boards and errors](../design/boards.md#big-boards-and-errors).

## A widget shows as a placeholder, or Problems says "could not be loaded"

Nowa draws your screens by reading your Dart code. It keeps or skips what it can't read, and says why.

1. Open **Problems** and look for `'<name>' could not be loaded: <reason>`. Or select the placeholder: **Details** shows **Kept as code** and the reason.
2. Click **Run** to see the real app, which compiles all of your code.

See [See code Nowa couldn't read](../test/problems.md#see-code-nowa-couldnt-read).

## A package is missing or failed to load

**Problems** names the package.

- `'<package>' is imported but is not in the pubspec.`: click **Fix**.
- `'<package>' is a dev dependency, so Nowa does not load it. ...`: move it to `dependencies` in `pubspec.yaml`.
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

Nowa couldn't open the project. Click **Back to dashboard** and open it again. If it keeps failing, check that you're signed in with an account that can open it. Then send the message, which holds the project ID and the error Nowa got, to support with **?** → **Chat with support**, or email [team@nowa.dev](mailto:team@nowa.dev). See [Get help](../account/help.md).

## Project not found

Nowa can't find a local project's folder because it was moved, renamed or deleted.

1. Click the **Use…** button, such as **Use my_app**, if Nowa found the folder next to the old one. Otherwise click **Locate folder** and pick a folder that contains a `pubspec.yaml`.
2. If the folder is gone for good, click **Remove from projects**.

A cloud project shows **Try again** instead. See [Fix "Project not found"](../account/projects.md#project-not-found).

## A project freezes or misbehaves when it opens

Nowa reopens the tabs you had open last time, so a tab that hangs the editor hangs it on every open.

1. On the dashboard, click ⋮ on the project and choose **Open in safe mode**. Nowa skips the old tabs.
2. The workspace says **Nothing is open**. Click **Open board**, **Browse widgets** or **Open code mode**.
3. Fix the file that caused it, or ask Nowa AI.

See [Use the project menu](../account/projects.md#project-menu).

## Flutter SDK path is not set

The preview and the code check of a local project need your Flutter SDK, and Nowa doesn't know where it is. The message reads "Exception: Flutter SDK path is not set. Please configure it in the settings." Set the path in **Local Setup**. See [Set up Flutter](../get-started/desktop-app.md#setting-up-flutter-sdk).

## No devices in the Run on menu

- **Web app:** the menu shows "iOS & Android devices" with "Download the desktop app", because the web app can't reach your devices. Click the row to get the desktop app, or use **Open on Mobile** for a cloud project on your phone.
- **Desktop app:** "No devices connected. Plug in a device or start an emulator below." means Flutter found none. Connect a phone, or click an emulator under **Start an emulator**.

See [Run on a device or emulator](../test/devices.md).

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

- **Desktop app:** click **Update to v…**. When it says "Download complete!", click **Install & Restart**, and Nowa reopens on the new version. **Later** and **Skip** wait. **Or download manually** opens the download link.
- **Web app:** click **Update**. The page reloads on the new version.

"Update failed" shows the reason underneath, for example "Could not connect to the update server. Please check your internet connection and try again." Click **Retry**, or **Download manually instead**.

## Version out of date

Your version of Nowa is too old for Nowa's servers, so this screen replaces the app. The message under the title comes from Nowa.

- **Web app:** clear your browser cache, then click **Refresh**. **Download** also offers the desktop app.
- **Desktop app:** click **Download** and install the newer version.

## No Internet Connection

Nowa couldn't reach the internet while it checked your account. The desktop app shows "Please check your internet connection and try again." with a **Retry** button. Check that your computer is online, then click **Retry**.

## We'll Be Right Back or Maintenance in Progress

Nowa's servers are unreachable or down for maintenance. "Maintenance in Progress" shows the server's message, or "The server is currently under maintenance. Please try again later." Neither screen has a button.

Wait a few minutes, then reload the page or restart the desktop app. If it lasts, email [team@nowa.dev](mailto:team@nowa.dev).

## Still stuck?

Click **?** and choose **Report an issue** (with a project open) or **Chat with support**, or email [team@nowa.dev](mailto:team@nowa.dev). See [Get help](../account/help.md#report-an-issue).

## Next steps

- [Find and fix problems](../test/problems.md): check your project for errors.
- [Run your app](../test/run.md): compile the real app and read its logs.
- [Known issues](known-issues.md): limits that depend on where you run Nowa.
