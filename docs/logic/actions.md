---
title: More actions
description: A quick reference to ready-made steps in Circuit, such as opening a link, writing to the logs, checking the platform, saving values on the device, copying text and vibrating.
sidebar_label: More actions
keywords: [openUrl, open link, print, logs, checkPlatform, platform, Media Query, screen size, Shared Preferences, save data, local storage, Create, Future.delayed, delay, Timer, periodic, clipboard, copy, haptic, vibrate, operators, library, functions]
---

Circuit has ready-made steps for the things apps do all the time. Add any of them from the **All nodes for this circuit** menu in [Circuit](circuit.md). This page lists the ones you'll reach for most, and where each one lives.

Dialogs, sheets, snackbars and pickers are on their own page: [Show dialogs, sheets, snackbars and pickers](popups.md). Moving between screens is in [Navigate between screens](navigation.md).

## Open a link

`openUrl` opens a web address in the browser, outside your app.

1. Choose **NOWA_RUNTIME** → `openUrl`.
2. Type the address in **Url**. It starts as `https://nowa.dev`. To use a value, click **Url** and link one, or type `$` inside the text.

## Write to the logs

`print` writes a message that you can read while you test.

1. Choose **DART:CORE** → `print`.
2. Type the message in **Msg**. It starts as "Hello World". Type `$` to put a value inside it, such as `Total: ${total}`.
3. Run your app and open the **Logs** tab. See [Run your app](../test/run.md).

## Check the platform

**checkPlatform** gives a true or false value that tells where the app is running, so you can do something different on, say, the web or on phones.

1. Choose **GLOBALS** → **checkPlatform**, or pick it while you link a true or false property. It starts as `isWeb`.
2. Click `isWeb` and pick another check: `isAndroid`, `isIOS`, `isMacOs`, `isWindows`, `isLinux` or `isDesktop`. `isDesktop` is true on macOS, Windows and Linux. `currentPlatform` gives the platform itself.
3. Use it as the **Condition** of an If. To check two platforms at once, link the **Condition** to `logicalOr` under **OPERATORS**, then set **Left side** and **Right side** to a **checkPlatform** each.

On the web, only `isWeb` is true.

## Read the screen size

**Media Query** gives the device's screen data, such as its size, padding and orientation.

1. Choose **GLOBALS** → **Media Query**.
2. Click **+** after it and pick a member, such as `size` and then `width`.
3. Store the result, or use it in a condition. See [Expressions and conditions](expressions.md).

## Save values on the device

Shared Preferences keep small values on the device, so your app remembers them the next time it opens. The **SHARED PREFERENCES** category has four steps:

| Step | What it does | What to fill in |
|---|---|---|
| **set** | Saves a value. | **Type** (`string`, `int`, `double`, `bool` or `stringList`), **Key** and **Value**. |
| **get** | Reads a value. Nothing comes back if it was never saved. | **Type** and **Key**. Use [Store result](circuit.md#store-result) to keep it. |
| **remove key** | Deletes one saved value. | **Key**. |
| **clear** | Deletes everything saved. | Nothing. |

Read a value with the same **Type** and **Key** you saved it with. **set**, **remove key** and **clear** take a moment, so use [Future Options](circuit.md#future-options) if a later step must wait for them. To wipe saved values while you test, open the [project settings](../account/project-settings.md), then **Project Details** → **Shared Preferences** → **Clear**.

## Create objects

**Create...** in the **GENERAL** category makes any object: a delay, a timer, the current time, an instance of your own [model](models.md).

1. Choose **GENERAL** → **Create...**. The **Pick a constructor** list opens. Search for the class.
2. If the class has several constructors, pick one in the second list. The plain one reads **Default**.
3. Fill in its inputs in **Details**. A node like this reads **Create** plus the class name.

| To | Pick | Then |
|---|---|---|
| Wait a moment | `Future` → `delayed` | Set **Duration**, and turn on **await**. |
| Repeat something | `Timer` → `periodic` | Set **Duration** and build the repeated steps in **Callback**. Use **Store result** to keep the timer so you can stop it later. |
| Get the current date and time | `DateTime` → `now` | Use **Store result**. |
| Make an instance of a model | Your model → **Default** or `fromJson` | Fill in its fields. |

To stop a timer, add a node on the stored timer, click **+** and choose `cancel`. A good place is a [Dispose Function](functions.md#lifecycle). Widgets aren't in this list: add them on the board.

**GENERAL** also has **parse**, which turns text into a number with decimals.

## Calculate, compare and combine

Math, comparison and logic live in the **OPERATORS** category, for example `plus`, `greaterThan` and `logicalAnd`. See [Calculate and compare](expressions.md#operators).

## Copy text and vibrate

The **SERVICES** category has two handy classes. Click a class to see its functions.

- `Clipboard`: `setData` copies text to the clipboard. `getData` and `hasStrings` read from it.
- `HapticFeedback`: `vibrate`, `lightImpact`, `mediumImpact`, `heavyImpact`, `selectionClick`, `successNotification`, `warningNotification` and `errorNotification`.

## Find any other function

Each category named after a library holds the functions and classes you can use from that library. Type a name in the search box to find it.

| Category | What's inside |
|---|---|
| **MATERIAL** | Dialogs, sheets and pickers, plus `showMenu`, `showSearch` and `showAboutDialog`. |
| **DART:CORE** | `print` and classes such as `Future`. |
| **DART:ASYNC** | `Timer`, `unawaited` and `scheduleMicrotask`. |
| **SERVICES** | `Clipboard`, `HapticFeedback`, `SystemNavigator` and `SystemSound`. |
| **NOWA_RUNTIME** | `openUrl`, `showMediaPicker` and `NPlatform`. |
| Your project, named after your package | Your own functions and classes, such as `AppConstants`. See [Keys and constants](../integrations/constants.md). |

A package you add brings its own category. The library categories list functions and classes that have static functions. To make an object from any other class, use **Create...**.

:::tip Or ask Nowa AI
In **Agent** mode, try: "When the user taps Visit website, open nowa.dev in the browser." Then open the result in Circuit to see the step. See [Chat with Nowa AI](../ai/chat.md).
:::

## Next steps

- [Build logic in Circuit](circuit.md) to put steps in order and branch.
- [Show dialogs, sheets, snackbars and pickers](popups.md) for pop-ups and pickers.
- [Keys and constants](../integrations/constants.md) for values your whole project shares.
