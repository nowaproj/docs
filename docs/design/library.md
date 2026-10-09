---
title: Find and add things with the Library
description: Search your screens and components, Nowa's built-in widgets, your packages and your assets in one panel, then drag a row onto the board, insert it or open it.
sidebar_label: Library
keywords: [library, library panel, widgets panel, widget picker, search, find a widget, add a widget, go to a widget, insert, recent, filter, packages, built-in, assets, rename, delete, show in code, add menu, ctrl k, ctrl o]
---

The Library is one panel for everything you can put on your board: your screens and components, Nowa's built-in widgets, the widgets in your packages, and your assets. Search it, drag a row onto the board, or press <kbd>Enter</kbd> to add a widget where your pointer last was.

## Open the Library

Click **Library**, the second icon in the left sidebar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd>. The panel has a header with **Add** (+) and a **Show as a list** or **Show as a tree** button, a search field with **Filter** next to it, four source chips, and the rows.

{/* CAPTURE: id=design-library-1 | state: playground starter open, Library open with Ctrl/Cmd+2, one component row clicked so its details card shows | show: the header with Add and the list/tree button, the search field with Filter, the four chips with Project on, the project rows, and the details card beside the panel | crop: left panel + details card */}

In code mode, **Files** takes the Library's place: see [Manage project files](../code/files.md). A phone-sized window has no Library: see the [phone layout](../get-started/mobile.md).

## Choose where to look

The chips **Project**, **Packages**, **Built-in** and **Assets** turn sources on and off. Only **Project** is on at first, and at least one chip always stays on.

| Chip | What it lists |
|---|---|
| **Project** | The folders in your `lib/` folder and what they hold. A red number counts the errors in a row or folder. A component's `@Preview` variants sit under it. |
| **Packages** | The packages in your `pubspec.yaml`, with their versions (**workspace** for a local path), and the widgets and classes they bring. See [Add packages](../code/packages.md). |
| **Built-in** | Nowa's own widgets in groups such as **Basic**, **Buttons** and **Layout**, then Flutter's libraries, **Material** and **Cupertino** first. |
| **Assets** | The folders and files in your `assets/` folder. |

**Filter** opens a menu headed **Show**. **Widgets** (screens, components and widgets) is the default, so models, global states and other code stay hidden until you pick **Everything** or one kind: **Screens**, **Components**, **Models**, **Global states**, classes (the entry reads **Classs**), **Functions**, **Enums** or **Variables**. **Private** adds your project's private names, the ones that start with an underscore. The filter never hides assets. **Show as a list** flattens the folders into one list, and **Show as a tree** brings them back.

## Find something

Type in the search field. It looks in all four sources, whatever the chips say (they hide while you search), and lists every name that contains what you typed. The hint tells you what <kbd>Enter</kbd> does.

| Hint | How you get it | <kbd>Enter</kbd> | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd> |
|---|---|---|---|
| **Go to...** | The default, or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd> | Opens the result | Inserts it |
| **Add...** | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> or the **Widget** tool | Inserts the result | Opens it |

**Add...** lasts until you add something, click a row or leave the panel. In code mode, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd> opens **Search for a file** instead: see [Manage project files](../code/files.md).

Results come in groups, in the order **Project**, **Packages**, **Built-in** and **Assets**, with a count at the end of each heading. In a group, Nowa's own widgets come first, then names that start with what you typed, then the rest from A to Z. The first result is highlighted as you type. A group shows 100 rows, then a row such as **Show all 250**. Rows such as **Show 3 more of other kinds** and **Show 2 private matches** reveal what the filter hides. When nothing matches, the panel says **No matches**.

With the search empty, **Recent** tops the panel. It lists the last eight things you added to the board.

## Add something to the board

You need an open board, screen or component. Without one, Nowa says "Open a screen, a component or a board to insert into".

1. Click **Widget** in the toolbar or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>. The Library opens with the search ready, and the field reads **Add...**.
2. Type part of a name, such as `button`. Press <kbd>↓</kbd> to move through the results.
3. Press <kbd>Enter</kbd>. The widget lands where your pointer last was on the board, and the keys go back to the board.

{/* CAPTURE: id=design-library-2 | state: playground starter open, Ctrl/Cmd+K pressed, button typed in the Library search | show: the Add... hint, the grouped results with their counts and the first result highlighted, and the details card beside the panel | crop: left panel + details card */}

You can also:

- Right-click a row and choose **Insert**, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd> on it.
- Drag a row onto the board. The Library stays open and the board shows where it will land. See [where a dragged widget lands](select-and-edit.md#where-a-dragged-widget-lands).

A double-click doesn't add. The first click ends **Add...**, and the second opens the row if it has a file.

Insert works for widgets: your screens and components, and the widgets of Nowa, your packages and Flutter. To place an asset, drag it onto the board. See [Images, videos and other files](assets.md).

If a widget needs a package your project doesn't have yet, **Insert** first opens **Add Missing Dependencies**. Click **Add** and Nowa adds the package, then places the widget.

## Preview a row

Click a row, or move to it with the arrow keys, and a details card opens beside the panel. It shows a preview, the name, the kind and where it lives (for example **Component · lib/components**), and the first lines of its description. For a screen or component, add one with **Add description** in **Details**.

Nowa's own widgets, your screens and components, and most assets show a preview. Other rows show an icon. Once the card is open, it follows your pointer from row to row. Press <kbd>Esc</kbd> on a row to put it away.

## Open, rename, delete and move

Right-click a row for its menu.

| Entry | What it does |
|---|---|
| **Insert** | Adds the widget to the open board. Key: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd>. The menu shows ⌘⏎ on every system. |
| **Open** | Opens the file at that code in a tab: a screen or component opens on its own, and an asset opens its file. Key: <kbd>Enter</kbd>, or double-click the row. Nowa's own widgets and Flutter's have no file, so no **Open**. |
| **Upload assets...** | On a folder in `assets/`: choose files to add to it. |
| **Rename** | Edits the name in place. Press <kbd>Enter</kbd> to save. Key: <kbd>F2</kbd>. Nowa updates every place that uses the widget, and renames its file when the file is named after it. |
| **Delete** | Asks **Are you sure you want to delete ProductCard?** with **Cancel** and **Yes**. If something uses it, Nowa lists the places and asks again (**Cancel** or **Remove**). A widget alone in its file takes the file with it. |
| **Show in code** | Switches to code mode and opens the file at that code. |

**Rename**, **Delete** and **Show in code** work on your own rows, under **Project** and **Assets**. Rows under **Packages** and **Built-in** can't be renamed or deleted, and folders have no **Show in code**. While the Library has focus, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes a rename or a delete.

To move something, drag its row onto a folder. Things in `lib` stay in `lib`, and assets stay in `assets`. A widget moves with its file. The Library works on one row at a time, and the Delete key doesn't act on its rows: use the menu.

## Create things from the Library

Click **Add** (+) in the header and choose what to make.

| Entry | What it does |
|---|---|
| **New Widget...** | Opens the template picker for a screen or component. The new file opens in its own tab. See [Start from a template](templates.md). |
| **New Folder...** | Makes a folder in the folder of the row you highlighted last, or in `lib`. |
| **New Model...** | Makes a model in `lib/models`. See [Data models](../logic/models.md). |
| **New Global State...** | Makes a global state in `lib/globals`. See [Share data across your app](../logic/global-state.md). |
| **Generate Models From Json...** | Builds models from a JSON sample. |
| **API Collection...** | Creates a REST API collection. See [Connect a REST API](../integrations/rest-api/index.md). |
| **Import Dart code...** | Brings Dart code you wrote into your project. See [Write your own code](../code/custom-code.md#import-dart-code). |
| **Upload Assets...** | Choose files to add to the highlighted `assets` folder, or to `assets`. |

## Use the keyboard

- Type a letter, digit or symbol while a row is focused to jump into the search. The letter stays selected, so the next one replaces it: click the search field first to type a whole word.
- <kbd>↓</kbd> moves from the search into the results. <kbd>↑</kbd> on the first result stops on its group heading, and one more <kbd>↑</kbd> goes back to the search.
- In the search field, <kbd>Esc</kbd> clears the search. On an empty search it gives the keys back to the board, so shortcuts work again. On a row, <kbd>Esc</kbd> puts the details card away.
- <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> does nothing while the focus is in the Library. Click the board, or press <kbd>Esc</kbd> in an empty search, and it works again.
- <kbd>Enter</kbd>, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd> and <kbd>F2</kbd> work as in [Find something](#find-something) and the menu above.

:::tip Or ask Nowa AI
Try "Create a ProductCard component with an image, a title and a price, and use it on the Home screen." The new component then shows up in the Library.
:::

## Next steps

- [Add widgets](add-widgets.md): the toolbar tools, drag and drop, and pasting.
- [Build reusable components](components.md): make a component and use it again.
- [Images, videos and other files](assets.md): add and use your assets.
- [Keyboard shortcuts](../reference/shortcuts.md): every key in one place.
