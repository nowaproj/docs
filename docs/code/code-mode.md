---
title: Edit code in Nowa
description: Switch to code mode to read and edit the Dart behind your app, with tabs, find and replace, autocomplete, go to definition and a live preview.
sidebar_label: Code mode
keywords: [code mode, code editor, edit code, Dart, tabs, New Tab, Recent Files, find and replace, autocomplete, go to definition, code preview, View Code, Open code mode, code chip, "<>"]
---

Code mode shows the Dart behind your app in a full code editor. Select a widget, click the `<>` button, and you land on its code.

## Open code mode

1. Optional: select a widget on the board.
2. Click the `<>` button in the top bar, next to **Settings** (the gear). The button has no label, and it stays highlighted while code mode is on. Nowa saves your project first.
3. The editor opens the file that defines your selection and scrolls to the widget's code. With nothing selected, it opens your home screen's file, or `lib/main.dart` if there is none.

The left panel switches to **Files** and shows the whole project, not only `lib/`, `boards/` and `assets/`. When you leave code mode, the panel you were using comes back.

![Code mode: the Files tree on the left, home_page.dart open in a tab with its Dart code, the download and Show preview buttons (highlighted) at the right end of the tab bar, and the preview pane (Play and App) beside the code.](/img/docs/code/code-code-mode-1.png)

You can also open code mode with **Open code mode** on the **Nothing is open** screen. A Dart file with no screen or component in it, such as a model or a global state, opens with an outline of its contents and a **View Code** button that switches to code mode.

## Work with tabs

Each file opens in its own tab above the editor. A tab shows `*` after its name while the file has unsaved changes.

- Click a file in **Files** to open it.
- Click **+** (**New Tab**) to open a blank tab. Its **Empty Tab** page offers **New Widget** and **Upload a File** (which adds a file to `assets/`), and lists your **Recent Files**. Only one blank tab can be open at a time.
- Close a tab with its **×**, a middle-click, or the shortcut below.

| Action | Windows / Linux | macOS |
|---|---|---|
| New tab | <kbd>Ctrl</kbd> + <kbd>T</kbd> | <kbd>Cmd</kbd> + <kbd>T</kbd> |
| Next tab | <kbd>Ctrl</kbd> + <kbd>Tab</kbd> | <kbd>Control</kbd> + <kbd>Tab</kbd> |
| Previous tab | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> |
| Close the tab | <kbd>Ctrl</kbd> + <kbd>W</kbd> | <kbd>Cmd</kbd> + <kbd>W</kbd> |
| Search for a file | <kbd>Ctrl</kbd> + <kbd>O</kbd> | <kbd>Cmd</kbd> + <kbd>O</kbd> |

**Search for a file** opens a picker. Type part of a file name, move with <kbd>↑</kbd> and <kbd>↓</kbd>, and press <kbd>Enter</kbd>. It lists the files in `lib/` with their paths. To search inside files, see [Manage project files](files.md#search-the-project).

## Edit code

The editor colors Dart, JSON, YAML, XML, HTML and Markdown. You can edit any text file in the **Files** tree, including `pubspec.yaml`. With the **View Only** role, the editor is read-only.

| To | Do this |
|---|---|
| Find | Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>. **Aa** matches case and `.*` uses a regular expression. **Previous** and **Next** step through the matches, and <kbd>Esc</kbd> closes the bar. |
| Find and replace | Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Alt</kbd>/<kbd>Option</kbd> + <kbd>F</kbd>, type the new text, then click **Replace** or **Replace All**. |
| Autocomplete | Start typing in a Dart file. Suggestions list names in scope, members after a dot, and named parameters inside a call. Pick one with the arrow keys and <kbd>Enter</kbd>, or click it. |
| Go to definition | Hold <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and hover a name in a Dart file. A name that's defined in your project is underlined. Click it to jump there, even into another file. |
| Copy, cut and paste | Right-click, or use the usual shortcuts. |

[Keyboard shortcuts](../reference/shortcuts.md#code-editor) lists the rest, such as commenting and moving lines.

To bring in a snippet or a `.dart` file instead of typing it, leave code mode and choose **Import Dart code...** from the **Add to library** menu in **Files**. See [Import Dart code](custom-code.md#import-dart-code).

## Save your edits

Your edits reach the board when you save, not on every keystroke. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>, or let auto save run. Auto save is on by default and runs every 20 seconds. To change it, click the save icon in the status bar (**Save options**). Saving also refreshes the preview.

Nowa AI always works from your latest code. It applies your unsaved edits before it starts.

## Fix errors and conflicts

- **Syntax errors.** Once your edits are saved, a red banner above the code shows the number of errors and the first message. Click it to open the **Errors** panel. The counts in the status bar and the **Problems** tab list them too. See [Find and fix problems](../test/problems.md).
- **A file that changed under you.** If Nowa AI, the board or another tool changes a file while you have unsaved edits in it, the banner says "This file changed while you were editing it". Click **Keep mine** to keep your text and save it, or **Reload** to load the file as it is now and drop your edits.

## Preview next to your code

Click **Show preview** (the eye icon at the right end of the tab bar) to open your app beside the editor. The menu at the top left of the pane picks the mode.

| Mode | What it shows |
|---|---|
| **Play · App** | Your whole app, played the way [Instant Play](../test/instant-play.md) plays it. This is the default. |
| **Play · File** | The screen or widget declared in the open file. A file with no widget says "This file has no widget to preview. Switch to App to run the whole app." |
| **Run** | The real, compiled app, as in [Run your app](../test/run.md). |

The play modes are interpreted, so a warning icon reminds you that they aren't 100% accurate. The preview reloads when your edits are saved. In the play modes, **Reload preview** rebuilds it at any time. Click **Hide preview** to close the pane.

## Open in VS Code or download your code

The button next to **Show preview** depends on the project.

- <Badge type="local" /> **Open in VS Code** opens the folder in VS Code at the file you're viewing, or at `lib/main.dart` if it isn't a Dart file. See [Use Nowa with VS Code](vs-code.md).
- <Badge type="cloud" /> **Code download** opens a popup where you compress your project and download it as a zip. See [Download your code](../publish/download-code.md).

## Leave code mode

Click **Back** at the top left, or click `<>` again. Nowa saves your project and returns to the board. If some of your edits aren't saved yet, **Unsaved code changes** lists the files first and asks what to do:

- **Save** saves the edits and updates the board.
- **Discard** drops them.
- **Cancel** keeps you in code mode.

:::tip
Or ask Nowa AI: "Add a function that formats a price with two decimals." It edits the same files you see here. Read what it changed in code mode.
:::

## Next steps

- [Manage project files](files.md)
- [Add packages](packages.md)
- [Write your own code](custom-code.md)
- [What Nowa can show on the board](limitations.md)
