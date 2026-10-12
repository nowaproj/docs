# P14-B04 for-code: facts moved off the design pages

Each bullet is copied unchanged from the page named in brackets (verified in earlier phases). The orchestrator files
them under the matching anchor of `docs/code/generated-code.md`.

## #components

- Nowa saves the component as a Dart file in `lib/`, named after it, for example `product_card.dart`. [design/components.md, Create a component]
- **Make a separate copy.** Right-click an instance and choose **Copy as new widget**, name it and click **Submit**. You get a new component in its own file. [design/components.md, Edit a component or one instance]
- Adding a variable (hover **Variables**, then click **+**) makes the component stateful for you. There is nothing to set up. [design/components.md, Give a component params]
- Open **Library** in the left sidebar. Your screens and components are under **Project**, in the folders of your `lib/` folder. [design/components.md, Manage screens and components]
- Right-click and choose **Rename** (or press <kbd>F2</kbd>), type the new name and press <kbd>Enter</kbd>. Nowa updates every place that uses it, and renames the file when the file is named after it. [design/components.md, Manage screens and components]
- If it is the only widget in its file, Nowa deletes the file too. [design/components.md, Manage screens and components (Delete)]
- | Component | A widget you build once and reuse on many screens. | A Dart file in `lib/` | [design/index.md, How the pieces fit, table row; column "Where it is saved"]

## #screens-and-routes

- Name it and click **Submit**. The dialog is titled after the template, such as **New Empty Page**, and also shows the **Class name** and the file **Path** (`lib/pages/` for screens). [design/screens.md, Add a screen, step 4]
- **Rename.** Double-click the title on the board, type the new name and press <kbd>Enter</kbd>. Or click the pencil (**Rename**) next to the name in **Details**. Nowa updates every place that uses the screen. It also renames the file when the file is named after the screen, and always when you rename from **Details**. [design/screens.md, Rename, describe, copy and open]
- **Add description.** Click **Add description** under the name in **Details**, write a short note, then click the back arrow (**Back to fields**). The note is saved in the screen's code. It shows in the details card of the [Library](library.md) and in the widget picker dialog when you pick the screen. [design/screens.md, Rename, describe, copy and open]
- **Copy as new widget.** Right-click the screen's title and choose **Copy as new widget**, name it and click **Submit**. You get a separate copy in a new file, placed on the board. [design/screens.md, Rename, describe, copy and open]
- To take a screen off the board, click its title, then right-click the title and choose **Remove**, or press <kbd>Delete</kbd> (<kbd>Backspace</kbd> on macOS). Its file stays in your project. [design/screens.md, Delete a screen]
- | Screen | One page of your app, such as Home or Settings. | A Dart file in `lib/` | [design/index.md, How the pieces fit, table row; column "Where it is saved"]

## #project-files

- Click the **Boards** chip in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd>. The chip shows the name of the current board, or **Boards** when you're not on a board. The list shows every board in your project, including boards in subfolders of `boards`, whether you have opened them or not. [design/boards.md, Create, switch and manage boards, step 1]
- When you create a board, Nowa writes the name in snake_case, so **Login flow** becomes `login_flow`. Each board is saved as a `.board` file in the `boards` folder, here `login_flow.board`. [design/boards.md, Create, switch and manage boards]
- **Loose widgets** have no title bar. They're saved only in the board file, so they're not part of your app until you place them inside a screen. [design/boards.md, Know your board items]
- | Board | A free-form design surface. A project can have many. | A `.board` file in `boards/` | [design/index.md, How the pieces fit, table row; column "Where it is saved"]
- | Loose widget | Any widget you drop straight onto the board, such as a shape. | Only in the board file | [design/index.md, How the pieces fit, table row]
- | Widget | A building block inside a screen or component: a Text, a Button, a Column. | Inside the screen's or component's file | [design/index.md, How the pieces fit, table row; column "Where it is saved"]
- Your screens and components are saved as real Flutter code in your project. [design/index.md, intro]
- | **Project** | The folders in your `lib/` folder and what they hold. A red number counts the errors in a row or folder. A component's `@Preview` variants sit under it. | [design/library.md, Choose where to look, table row]
- | **Open** | Opens the file at that code in a tab: a screen or component opens on its own, and an asset opens its file. Key: <kbd>Enter</kbd>, or double-click the row. Nowa's own widgets and Flutter's have no file, so no **Open**. | [design/library.md, Open, rename, delete and move, table row]
- | **Rename** | Edits the name in place. Press <kbd>Enter</kbd> to save. Key: <kbd>F2</kbd>. Nowa updates every place that uses the widget, and renames its file when the file is named after it. | [design/library.md, Open, rename, delete and move, table row]
- | **Delete** | Asks **Are you sure you want to delete ProductCard?** with **Cancel** and **Yes**. If something uses it, Nowa lists the places and asks again (**Cancel** or **Remove**). A widget alone in its file takes the file with it. | [design/library.md, Open, rename, delete and move, table row]
- To move something, drag its row onto a folder. Things in `lib` stay in `lib`, and assets stay in `assets`. A widget moves with its file. [design/library.md, Open, rename, delete and move]
- | **New Widget...** | Opens the template picker for a screen or component. The new file opens in its own tab. See [Start from a template](templates.md). | [design/library.md, Create things from the Library, table row]
- | **New Folder...** | Makes a folder in the folder of the row you highlighted last, or in `lib`. | [design/library.md, Create things from the Library, table row]

## #packages

- | **Packages** | The packages in your `pubspec.yaml`, with their versions (**workspace** for a local path), and the widgets and classes they bring. See [Add packages](../code/packages.md). | [design/library.md, Choose where to look, table row]
- Nowa highlights the first result as you type, and <kbd>Enter</kbd> acts on the highlighted row, so check it first. In a new project, `button` lists **CustomButton** from `nowa_runtime` before Nowa's own **Button** under **Built-in**. [design/library.md, Find something]
- 3. Check the highlighted result, then press <kbd>↓</kbd> until it's the widget you want. In a new project, `button` lists **CustomButton** from `nowa_runtime` first, and one press reaches Nowa's own **Button**. After your first <kbd>↓</kbd> or a click, a details card opens beside the panel with a preview, the name and the first lines of the description. [design/add-widgets.md, Add a widget from the Library, step 3]

## #models

- | **New Model...** | Makes a model in `lib/models`. See [Data models](../logic/models.md). | [design/library.md, Create things from the Library, table row]

## #global-state

- | **New Global State...** | Makes a global state in `lib/globals`. See [Share data across your app](../logic/global-state.md). | [design/library.md, Create things from the Library, table row]
