---
title: Manage project files
description: Add, rename, move and delete your project's files in the Library, browse every file in code mode's Files tree, and find code with the Search panel or the file picker.
sidebar_label: Files
keywords: [files, Files panel, file tree, Library, Add, Upload Assets, Add to library, Add board, Import asset, New Folder, rename file, move file, delete file, cut, paste, lib/main.dart, search, replace all, symbols, search for a file, find in files, project search]
---

Two panels look after your project's files. The [Library](../design/library.md) is where you add, rename, move and delete your screens, widgets, models and assets. In [code mode](code-mode.md), **Files** shows every file in the project as a tree. The **Search** panel finds any line of code.

## Open the Library or Files {#open-the-files-panel}

The Library and **Files** share one place in the left sidebar, second from the top. Click the icon to open the panel, and click it again to close it.

| | Library | Files |
|---|---|---|
| **Where** | Outside code mode. Click **Library**, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd>. | In code mode only. The folder icon (**Files**) takes the Library's place and opens by itself. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd> opens it too. |
| **What it shows** | What your `lib/` folder declares, in folders: screens, components, models, global states and more. The chips add your packages, Nowa's built-in widgets and your assets. | The whole project, including `pubspec.yaml` and the platform folders. Folders start closed. |
| **Add buttons** | **Add** (+) in the header. | None. Leave code mode and use the Library. |
| **Click a row** | Shows a details card with a preview. Double-click, or press <kbd>Enter</kbd>, to open it. | Opens the file in a tab. |
| **Follows you** | It marks the widget that is open in the editor. | It selects the file in the open tab. |

Names in the **Files** tree carry markers:

- `*` after the name means the file has unsaved changes.
- A number after the name means the file has problems, and the name turns red. See [Find and fix problems](../test/problems.md).
- In a project that uses Git, a letter shows a changed file: **A** added, **M** modified, **D** deleted, **R** renamed or **C** conflict. See [Use Git](git.md).

The Library shows the red problem count too, on rows and on their folders, but no `*` and no Git letters.

Nowa doesn't load `.git/`, `build/` or `.DS_Store`, and the **Files** tree doesn't list top-level items whose names start with a dot, such as `.nowa`. A `.board` file stores one board. In code mode it opens a tab that says "Code view is not available for boards". To work on a board, leave code mode and pick it in the **Boards** chip in the top bar ([Work with boards](../design/boards.md)). The Library doesn't list boards.

## Add files {#add-files}

In the Library, click **Add** (+) in the header and choose what to make.

![The Library with its Add menu open from the + button in the header (highlighted): New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., API Collection..., Import Dart code... and Upload Assets....](/img/docs/code/code-files-1.png)

| Item | What it creates |
|---|---|
| **New Widget...** | A screen or component from a template. See [Start from a template](../design/templates.md). |
| **New Folder...** | A folder in `lib`. It goes inside the folder of the row you clicked last, if that row is in `lib`. |
| **New Model...** | A data model in `lib/models`. See [Data models](../logic/models.md). |
| **New Global State...** | A global state in `lib/globals`, attached to your app. See [Share data across your app](../logic/global-state.md). |
| **Generate Models From Json...** | Model classes built from JSON. See [Data models](../logic/models.md). |
| **API Collection...** | A REST API collection in `lib/api`. See [Connect a REST API](../integrations/rest-api/index.md). |
| **Import Dart code...** | Dart you paste or load from a file. See [Write your own code](custom-code.md#import-dart-code). |
| **Upload Assets...** | Files you pick on your computer, in `assets`, or in the folder of the asset you clicked last. See [Images, videos and other files](../design/assets.md). |

A model or global state asks for a name. It must be a valid Dart name that nothing else in your project already uses, and it can't be a Dart keyword.

The Library's **Filter** starts on **Widgets**, so a new model or global state stays hidden until you choose **Everything**, **Models** or **Global states**. The Library lists a folder only when something is in it, so a new empty folder shows up first in the **Files** tree in code mode.

To add a board, click **Create new board** in the **Boards** chip in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>. See [Work with boards](../design/boards.md).

In code mode, a blank tab (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>T</kbd>) offers **New Widget** and **Upload a File** too.

:::tip
Or ask Nowa AI: "Add a Product model with a name and a price." It creates the file for you.
:::

## Rename, move and delete files

In the Library, right-click a row for **Insert**, **Open**, **Rename**, **Delete** and **Show in code**, and drag a row onto a folder to move it. Things in `lib` stay in `lib`, and assets stay in `assets`. The Library works on one row at a time. See [Find and add things with the Library](../design/library.md).

In code mode, right-click a file or folder in **Files**. The row you right-click is selected first. Ctrl/Cmd-click adds a row to the selection and Shift-click selects a range, so one action can cover several files. With the **View Only** role, the menu has only **Copy as path** and **View in folder**.

| Menu item | What it does |
|---|---|
| **Remove file** | Deletes the file after you confirm. With several files selected it reads **Remove N files**. |
| **Rename** | Edits the name in place, for one file at a time. Type the name without the extension and press <kbd>Enter</kbd>. Nowa updates the imports in files that use it. Key: <kbd>F2</kbd>. |
| **Cut** | Cuts the selected files. Key: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>X</kbd>. |
| **Paste** | Moves the cut files into the selected folder, or into the folder of the selected file. Key: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>. |
| **Copy as path** | Copies the path. |
| **View in folder** <Badge type="local" /> | Opens the folder on your computer. |
| **Show file content** | Opens the file's text in a tab. With several files it reads **Show files content**. |

To move files, drag them onto a folder. Several selected rows drag together. Files in `lib` can move only within `lib`, files in `assets` only within `assets`, and `.board` files only within `boards`. A folder can't move into itself. Nowa updates imports when you move a Dart file.

The tree works from the keyboard too. The arrow keys move between rows, and <kbd>Shift</kbd> with an arrow extends the selection. <kbd>Space</kbd> selects the focused row. <kbd>Enter</kbd> opens a file or opens and closes a folder, and <kbd>←</kbd> and <kbd>→</kbd> close and open a folder.

To delete a file, you can also select it and press <kbd>Delete</kbd> (<kbd>Backspace</kbd> on macOS). Nowa asks "Are you sure you want to delete…?". If other files use something declared in it, Nowa lists those uses and asks again. Open tabs for the file close. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes a delete while the **Files** panel has focus.

`lib/main.dart` can't be deleted. Nowa shows **Cannot delete file** and leaves it alone.

## Search the project

Click **Search** (the magnifier) in the left sidebar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>. The chips at the top switch between **Text** and **Symbols**.

{/* CAPTURE: id=code-files-2 | state: playground starter open; Search panel open; type "Home" in Search and click the arrow next to it to show the Replace row | show: the Text chip, the Search field with the Aa, ab and .* buttons, the Replace field with Replace all, the "N in M files" status and the grouped results | crop: left panel */}

### Search text

1. Type in **Search**. Results appear after a short pause, grouped by file, with a match count for each file.
2. Turn on any of **Aa** (**Match case**), **ab** (**Whole word**) or `.*` (**Regular expression**).
3. Click a match. If the match sits inside a widget on the open board, Nowa selects that widget and zooms to it. In every other case, and always in code mode, Nowa opens the file.
4. Click a file's row to collapse its matches.

The search covers the whole project, including edits you haven't saved. It reads lines one at a time, so a pattern can't span two lines. It skips images, fonts and other binary files, `.g.dart` files and folders such as `build`. It stops at 2,000 matches, and a count with a `+` means there are more.

### Replace in many files

1. Click the arrow at the left of the **Search** field (**Show replace**).
2. Type the new text in **Replace**.
3. Click **Replace all** (the double check mark). A dialog asks "Replace N matches in M files?".
4. Click **Replace**.

If a file changed after the search, Nowa skips it and says "Skipped N files that changed since the search". Click **Replace all** again to include it.

:::warning
**Replace all** writes straight to your files, and **Undo** doesn't cover those writes. A file open in a code mode tab is the exception: the change lands in the editor, where you can undo it, and is saved with your next save. Check the matches first, or commit with [Git](git.md) so you can review the result.
:::

### Search symbols

Switch to **Symbols**, then type a name. Nowa lists classes, functions, variables, parameters, uses of the name and literal values that contain it. Each row says what it is, for example "Class: HomePage", and shows its file.

Click a row to open it. A screen or component opens on the board, a function opens in [Circuit](../logic/circuit.md), and anything else opens its file. Hover a use of a name and click **Go to Declaration of** to jump to where it's defined.

## Search for a file by name

In code mode, press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd>, type part of a file name, and press <kbd>Enter</kbd>. The picker lists the files in `lib/` with their paths, and <kbd>Esc</kbd> closes it. It skips folders that tools generate: `.dart_tool`, `.git`, `.gradle`, `.idea`, `.symlinks`, `build`, `ephemeral`, `node_modules` and `Pods`.

On the board, the same keys open the Library's search with the hint **Go to...**, and <kbd>Enter</kbd> opens the first result. See [Find and add things with the Library](../design/library.md).

## Next steps

- [Edit code in Nowa](code-mode.md)
- [Write your own code](custom-code.md)
- [Find and add things with the Library](../design/library.md)
- [Images, videos and other files](../design/assets.md)
- [Keyboard shortcuts](../reference/shortcuts.md)
