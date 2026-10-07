---
title: Manage project files
description: Browse, create, rename, move and delete project files in the Files panel, and find code with the Search panel or the file picker.
sidebar_label: Files
keywords: [files, Files panel, file tree, Add to library, Add board, Import asset, New Folder, rename file, move file, delete file, lib/main.dart, search, replace all, symbols, search for a file, find in files, project search]
---

The **Files** panel is where you browse your project, create Dart files, import assets, and rename or move things. The **Search** panel finds any line of code.

## Open the Files panel

Click the folder icon (**Files**) in the left sidebar. Code mode opens it for you. Click the icon again to close the panel.

The panel looks different on the board and in [code mode](code-mode.md).

| | On the board | In code mode |
|---|---|---|
| **What it shows** | Three folders: `lib`, `boards` and `assets`. | The whole project, including `pubspec.yaml` and the platform folders. |
| **Add buttons** | **Add to library** (+) on `lib`, **Add board** (+) on `boards`, **Import asset** on `assets`. | None. Click **Back** to use them. |
| **Click a file** | Shows a small preview. Double-click to open the file. | Opens the file in a tab. |
| **Follows you** | No. | Yes. The panel selects the file in the open tab. |

{/* CAPTURE: id=code-files-1 | state: playground starter open, Files panel open; click the + next to lib | show: the Files panel with the lib, boards and assets rows and the open Add to library menu (New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., API Collection..., Import Dart code...) | crop: left panel */}

Names in the tree carry markers:

- `*` after the name means the file has unsaved changes.
- A number after the name means the file has problems, and the name turns red. See [Find and fix problems](../test/problems.md).
- In a project that uses Git, a letter shows a changed file: **A** added, **M** modified, **D** deleted, **R** renamed or **C** conflict. See [Use Git](git.md).

Nowa doesn't load `.git/`, `build/` or `.DS_Store`, and the tree doesn't list top-level items whose names start with a dot, such as `.nowa`. A `.board` file stores one board. Double-click it to open that board ([Work with boards](../design/boards.md)).

## Add files

On the board, use the button on each section.

| Section | Button | What it does |
|---|---|---|
| `lib` | **Add to library** (+) | Opens the menu below. |
| `boards` | **Add board** (+) | Asks for a name and creates a board. |
| `assets` | **Import asset** | Opens a file picker. See [Images, videos and other files](../design/assets.md). |

The **Add to library** menu:

| Item | What it creates |
|---|---|
| **New Widget...** | A screen or component from a template. See [Start from a template](../design/templates.md). |
| **New Folder...** | A folder inside `lib`. |
| **New Model...** | A data model in `lib/models`. See [Data models](../logic/models.md). |
| **New Global State...** | A global state in `lib/globals`, attached to your app. See [Share data across your app](../logic/global-state.md). |
| **Generate Models From Json...** | Model classes built from JSON. See [Data models](../logic/models.md). |
| **API Collection...** | A REST API collection in `lib/api`. See [Connect a REST API](../integrations/rest-api/index.md). |
| **Import Dart code...** | Dart you paste or load from a file. See [Write your own code](custom-code.md#import-dart-code). |

A model or global state asks for a name. It must be a valid Dart name that nothing else in your project already uses, and it can't be a Dart keyword.

In code mode, a blank tab (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>T</kbd>) offers **New Widget** and **Upload a File** too.

:::tip
Or ask Nowa AI: "Add a Product model with a name and a price." It creates the file for you.
:::

## Rename, move and delete files

Right-click a file or folder. Ctrl/Cmd-click adds items to the selection and Shift-click selects a range, so one action can cover several files. With the **View Only** role, the menu has only **Copy as path** and **View in folder**.

| Menu item | What it does |
|---|---|
| **Rename** | Edits the name in place. Type the name without the extension and press <kbd>Enter</kbd>. Nowa updates the imports in files that use it. |
| **Remove file** | Deletes the file after you confirm. With several files selected it reads **Remove N files**. |
| **Copy as path** | Copies the path. |
| **View in folder** <Badge type="local" /> | Opens the folder on your computer. |
| **Show file content** | Opens the file's text in a tab. |

To move a file, drag it onto a folder. Files in `lib` can move only within `lib`, files in `assets` only within `assets`, and `.board` files only within `boards`. A folder can't move into itself. Nowa updates imports when you move a Dart file.

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

Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd>, type part of a file name, and press <kbd>Enter</kbd>. The picker lists the files in `lib/` with their paths, and <kbd>Esc</kbd> closes it.

## Next steps

- [Edit code in Nowa](code-mode.md)
- [Write your own code](custom-code.md)
- [Images, videos and other files](../design/assets.md)
- [Keyboard shortcuts](../reference/shortcuts.md)
