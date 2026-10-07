---
title: Write your own code
description: Add your own Dart widgets, functions and classes, use them on the board and in Circuit, and import code you already have.
sidebar_label: Your own code
keywords: [custom code, hybrid approach, custom widget, custom function, custom class, CustomFunction, preview, Import Dart code, Import as Custom code, Dart, write code, nowa_runtime, NowaGenerated]
---

Nowa is real Flutter, so you can write your own widgets, functions and classes and use them next to everything Nowa builds. Nowa reads your code, so you can drop your widgets on the board and call your functions from logic. Earlier docs and release notes call this the **Hybrid approach**.

## Add your own code

Put your Dart in files under `lib/`. Nowa reads every Dart file there. You have four ways to add code:

- **Write it in [code mode](code-mode.md).** Open a file, add your code and save with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>. To start a new file, create a widget with **New Widget...** ([Manage project files](files.md#add-files)) and rewrite it.
- **Write it in your own editor.** In a [local project](vs-code.md), save a file in VS Code and Nowa picks it up.
- **Import it.** Paste or load code with [Import Dart code](#import-dart-code).
- **Ask Nowa AI.** It writes into the same files.

Here is a widget and a function you could add:

```dart
import 'package:flutter/material.dart';

class StarRating extends StatelessWidget {
  const StarRating({super.key, required this.stars});

  final int stars;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        for (var i = 0; i < 5; i++)
          Icon(i < stars ? Icons.star : Icons.star_border),
      ],
    );
  }
}

String readingTime(String article) {
  final words = article.split(' ').length;
  return '${(words / 200).ceil()} min read';
}
```

Nowa keeps code you write exactly as you wrote it, until you change that declaration visually. See [how code and design stay in sync](index.md#how-code-and-design-stay-in-sync).

## Use your code in the visual editor

| Your code | Where it shows up |
|---|---|
| A widget | In the widget picker (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>) under **Components**, and in the **Widgets** panel. Drag it onto a screen like any [component](../design/components.md). |
| A function | In [Circuit](../logic/circuit.md), in the **All nodes for this circuit** menu, under the category named after your project. |
| A class | As a type. **Select type** lists it when you search for its name or click **show more...** ([Store data in variables](../logic/variables.md)). |

A widget that Nowa can read opens like any other component, so you can change it on the board too. For a one-off formula, you don't need a function: use a custom expression ([Expressions and conditions](../logic/expressions.md#custom-expression)).

## Control what the board shows for a function {#custom-function}

The board runs your functions itself. When you don't want that, mark a function with `@CustomFunction` from `package:nowa_runtime/nowa_runtime.dart`. Nowa then never runs it on the board. It returns the `preview` instead, which is a Dart expression written as text.

```dart
import 'package:nowa_runtime/nowa_runtime.dart';

@CustomFunction(preview: '"3 min read"')
String readingTime(String article) {
  final words = article.split(' ').length;
  return '${(words / 200).ceil()} min read';
}
```

Without a `preview`, the board writes "calling: readingTime" to **Logs** and returns a stand-in value, such as `[...]` for text, `0` for a number or `false` for a true/false value. `preview` works on top-level functions. In **Run**, the real function runs.

## Import Dart code {#import-dart-code}

Use this to bring in a function, a widget or a class you wrote somewhere else.

1. If you're in code mode, click **Back**. The **Add to library** button isn't in the code-mode **Files** panel.
2. In the **Files** panel, click **+** (**Add to library**) on the `lib` row and choose **Import Dart code...**.
3. Paste your code into the editor, or click **From file** and pick a `.dart` file.
4. Click **Import** or **Import as Custom code**.

{/* CAPTURE: id=code-custom-code-1 | state: playground starter open, board view; Files panel → click the + on the lib row → Import Dart code... | show: the Import Dart code dialog with its code editor (sample formatDate function) and the From file, Import, Import as Custom code and Cancel buttons | crop: the dialog */}

| Button | What it does |
|---|---|
| **Import** | Nowa reads the code and takes it over as if it had written it, so you can edit it visually. If you face problems, use **Import as Custom code**. |
| **Import as Custom code** | Nowa keeps the code exactly as written and never runs it on the board. A widget shows as a placeholder, and functions log "calling: `<name>`" and return stand-in values. |

Nowa sorts what you import by kind. Screens go to `lib/pages/`, other widgets to `lib/components/`, classes with `toJson` or `fromJson` to `lib/models/`, global state classes (a `ChangeNotifier`) to `lib/globals/`, and functions to `lib/functions/`. Other classes and enums go to `lib/`. Each file is named after its declaration. If a board is open, new screens are placed on it.

:::warning
Import replaces any declaration in your project that has the same name. Check the names first. A `main` function can't be imported.
:::

## Check the real result

The board draws your code by reading it, so a few things look different or show as placeholders, and Dart that Nowa can't read yet is skipped and listed in **Problems**. Click **Run** to compile and run everything, including your own code and packages. See [Run your app](../test/run.md) and [What Nowa can show on the board](limitations.md).

:::tip Or ask Nowa AI
Try "Write a StarRating widget that shows 1 to 5 stars and add it under the product title." Nowa AI writes the code into your project. Read or change it in code mode.
:::

## Next steps

- [Add packages](packages.md)
- [What Nowa can show on the board](limitations.md)
- [Use Nowa with VS Code](vs-code.md)
- [Edit code in Nowa](code-mode.md)
