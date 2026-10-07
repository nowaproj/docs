---
title: Find and fix problems
description: See what's wrong in your project, jump straight to it, and fix it with one click, a full code check or Nowa AI.
sidebar_label: Problems
keywords: [problems, errors, warnings, console, problems tab, fix, quick fix, code check, run code check, flutter analyze, from nowa, from code analysis, only nowagenerated, all files, navigate, copy, could not be loaded, pubspec, missing package, fix with ai, explain with ai, status bar, red number]
---

Nowa checks your project while you work and lists what it finds in the **Problems** tab. Many problems have a **Fix** button that solves them in one click, and a full code check gives the exact answer when you need it.

## Open the Problems tab

Click the three counts in the status bar at the bottom of the editor: errors, warnings and info messages. The **Console** opens on **Problems**.

The red number counts the errors in this list. The other two count messages in **Logs**, the second tab, which shows what Nowa and your running app print. See [Read the logs](run.md#read-the-logs).

{/* CAPTURE: id=test-problems-1 | state: playground starter open; in code mode add import 'package:url_launcher/url_launcher.dart'; as the first line of lib/main.dart (any package that is not in pubspec.yaml), save, then click the red error count in the status bar | show: the Console open on the Problems tab with a Packages group, the message "'url_launcher' is imported but is not in the pubspec." with its Fix button, and the status bar counts below | crop: bottom-left of the window, Console panel and status bar */}

## Choose where problems come from

The menu at the top left of the tab picks the source.

{/* CAPTURE: id=test-problems-2 | state: same project, Console on Problems, click the source menu at the top left of the tab | show: the open menu with From Nowa (Instant) and From Code Analysis (Accurate), and the filter and refresh buttons on the right | crop: the Console panel */}

| | From Nowa (Instant) | From Code Analysis (Accurate) |
|---|---|---|
| What it checks | The code Nowa generated (names, types, arguments) and your project's setup: main file, home screen, packages, permissions and routes | Your whole app, with `flutter analyze` |
| When it updates | As you edit. Click **Refresh** to check again | When you click **Run Code Check** |

### From Nowa

- By default, Nowa reports problems only in code it generated, marked `@NowaGenerated`. It reads code you wrote only to draw it, so it could mistake valid Dart for a problem. One declaration you wrote silences the whole file, except for code Nowa couldn't load.
- To include your own code, click the filter button (**Which code Nowa checks**) and choose **All files**. The tab then says "Including code Nowa did not generate". **Only @NowaGenerated** switches back.

### From Code Analysis

1. Click **Run Code Check**, or the play button (**Run code check (flutter analyze)**). The status reads "Checking...", then "Checked at" and the time.
2. Read the results, grouped by file. Each shows its message, a hint when there is one, and `line:column · code`.
3. You see **Errors** only at first. Click the filter button (**Filter code check results**) to add **Warnings** and **Info**.

A cloud project is checked on Nowa's servers. A local project is checked with your Flutter SDK, so [set up Flutter](../get-started/desktop-app.md#setting-up-flutter-sdk) first. The check reads your saved files: after you edit, the status says "n files changed since last check". If it can't run, "Code check failed" shows the reason.

## Read a problem and jump to it

- **Groups.** Project-wide checks have their own groups, such as **Packages**, **main** and **Router problems**. A problem in a file sits under the file's path. Click a group's title to collapse it.
- **Menu.** Click a problem to open a small menu. **Navigate** opens the file and selects the spot, and **Copy** copies the message. Problems with no file, such as package problems, have nothing to open. In **From Code Analysis**, the menu offers **Open File** and **Copy**.
- **Fix.** A **Fix** button on a row means Nowa knows the fix.

## Fix a problem with one click

Click **Fix**. Nowa applies it and checks again. If the fix fails, a red message says why.

| Problem | What Fix does |
|---|---|
| `'<package>' is imported but is not in the pubspec.` | Adds the package, at its latest version. |
| `The function '<name>' isn't defined.` | Adds the package that defines it, when it is one Nowa knows. |
| `Setup statement in main.dart for "<key>" is required but not found.` | Adds the statement to `main.dart`. |
| `Android permission "<name>" is required by <package> but not enabled.` (or iOS) | Turns the permission on. |
| `The name '<name>' is defined in <packages>. Try removing one of the imports.` | Opens **Fix Ambiguous Import**. Pick the import to keep visible, then click **Apply Fix**. |
| `Main file is not found` or `Main function is not found` | Opens **Reset main file**. Click **Reset** to write a new `lib/main.dart` with the default setup. |

:::warning
**Reset** replaces `lib/main.dart` with a fresh default file. Anything you added to the old one is gone, so use it only when the file is missing or broken.
:::

## Fix problems that have no button

- `'<package>' is a dev dependency, so Nowa does not load it. Move it to dependencies to use it in lib/.`: in `pubspec.yaml`, move the package from `dev_dependencies` to `dependencies`.
- `'<package>' is installed but failed to load, so nothing it defines is available: <reason>`: the board can't draw anything from that package. Read the reason, and try another version under **Settings** → **Packages**. Click **Run** to find out whether the real app still builds. See [Add packages](../code/packages.md).
- `No Home screen Selected, select one of screens as Home Screen`: select a screen and click **Make home screen**. See [Choose the home screen](../design/screens.md#choose-the-home-screen).
- **Router problems**, such as `Duplicate route path found: "/home".`: fix the route in the **Router** panel. See [Manage routes in the Router panel](../logic/navigation.md#manage-routes-in-the-router-panel).
- `Firebase package name '…' does not match the app package name '…'. Try refreshing the config files`: **Navigate** opens the **Firebase** settings. See [Refresh the apps and config files](../integrations/firebase/connect.md#refresh-the-apps-and-config-files).
- Anything else, such as `Undefined name 'total'.`: **Navigate** takes you to the spot. Fix it by hand, or [hand it to Nowa AI](#hand-a-problem-to-nowa-ai).

## See code Nowa couldn't read

Nowa draws your screens by reading your Dart code. What it can't read, it handles in one of two ways:

- **Kept as code.** When Nowa can't turn a widget class into editable blocks, it keeps the class as you wrote it, and the widget shows as a placeholder on the board. Select it, and **Details** shows **Kept as code** and the reason.
- **Skipped.** When Nowa can't read a declaration at all, it skips it and loads the rest of the file. **Problems** lists `'<name>' could not be loaded: <reason>`, even with **Only @NowaGenerated**. A file that Dart can't parse lists the parser's own message instead.

Click **Run** to see what the real app does, because Run compiles all of your code. [What Nowa can show on the board](../code/limitations.md) lists what the board can't read yet.

## Hand a problem to Nowa AI

- **Fix with AI** appears next to a preview error ([Run your app](run.md#fix-a-preview-that-wont-start)) and a failed web publish ([Publish to the web](../publish/web.md#if-publishing-fails)). It puts a ready-made prompt with the error log into the **AI Assistant** chat and sends it if the AI isn't busy. It runs in the chat's current mode, so use **Agent** mode to let the AI change your project.
- **Explain with AI** appears on a failed step of a cloud build ([When a build fails](../publish/builds.md#when-a-build-fails)).

:::tip[Or ask Nowa AI]
In **Agent** mode, try: "Check my project for problems and fix them." Nowa AI can read the same list of problems and run the code check itself.
:::

## When Problems is empty but something is wrong

- "Loading packages..." means Nowa lists nothing until your packages have loaded. Wait for it to finish.
- The scope is **Only @NowaGenerated**. Switch to **All files**.
- Some errors only show up in the full check. Click **Run Code Check** under **From Code Analysis**.
- Errors that happen while your app runs show in **Logs**. A screen that crashes while Nowa draws it shows [This screen failed to render](../troubleshooting/index.md#this-screen-failed-to-render).

## Next steps

- [Run your app](run.md): compile the real app and watch its logs.
- [What Nowa can show on the board](../code/limitations.md): what Nowa can't draw yet.
- [Troubleshooting](../troubleshooting/index.md): find a fix by the message you see.
