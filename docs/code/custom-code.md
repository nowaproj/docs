---
title: Write your own code
description: Add your own Dart widgets, functions and classes, use them on the board and in Circuit, and import code you already have.
sidebar_label: Your own code
keywords: [custom code, hybrid approach, custom widget, custom function, custom class, CustomFunction, preview, "@Preview", widget variants, Import Dart code, Import as Custom code, Dart, write code, nowa_runtime, NowaGenerated]
---

Nowa is real Flutter, so you can write your own widgets, functions and classes and use them next to everything Nowa builds. Nowa reads your code, so you can drop your widgets on the board and call your functions from logic. Earlier docs and release notes call this the **Hybrid approach**.

## Add your own code

Put your Dart in files under `lib/`. Nowa reads every Dart file there. You have four ways to add code:

- **Write it in [code mode](code-mode.md).** Open a file, add your code and save with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>. To start a new file, create a widget with **New Widget...** ([Manage project files](files.md#add-files)) and rewrite it.
- **Write it in your own editor.** In a [local project](vs-code.md), save a file in VS Code and Nowa picks it up.
- **Import it.** Paste or load code with [Import Dart code](#import-dart-code).
- **Ask Nowa AI.** It writes into the same files.

Here's a widget and a function you could add:

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
| A widget | In the [Library](../design/library.md) under **Project**. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and type its name, or open the Library from the sidebar. Drag it onto a screen like any [component](../design/components.md). |
| A function | In [Circuit](../logic/circuit.md), in the **All nodes for this circuit** menu, under the category named after your project. |
| A class | As a type. **Select type** lists it when you search for its name or click **show more...** ([Store data in variables](../logic/variables.md)). |

A widget that Nowa can read opens like any other component, so you can change it on the board too. For a one-off formula, you don't need a function: use a custom expression ([Expressions and conditions](../logic/expressions.md#custom-expression)).

## Preview a widget in several states {#preview-variants}

Flutter's `@Preview` annotation marks a function, a static method or a constructor that builds a widget in one particular state. Nowa reads each one as a **variant** of the widget it builds, so you can see the states side by side.

```dart
import 'package:flutter/material.dart';
import 'package:flutter/widget_previews.dart';

@Preview(name: 'Five stars', group: 'Ratings', size: Size(220, 48))
Widget fiveStars() => const StarRating(stars: 5);
```

A variant's name is its `name:` argument, or its function's name in Title Case, such as Five Stars for `fiveStars`. Nowa reads `group:` and `size:` too.

- **Opened on its own.** Open the screen or component by itself, for example by double-clicking it in the [Library](../design/library.md). Each variant appears as its own canvas next to it, titled with its name. Variants with the same `group:` stack in one column, headed by the group's name.
- **On a variant's title.** Hover it for **Play**, **Open in new tab** (jumps to the preview code) and **Add to board**. **Add to board** asks which board and puts the variant there. If the package has no boards, Nowa says "This package has no boards yet".
- **In the Library.** Variants are rows under their widget. Insert one to place that state on the board, at its `size:` if the `@Preview` sets one.

Nowa also reads previews from Dart files in a `design/` folder at the top of your project (or of a package, in a workspace), as long as the file names the widget and has a `@Preview`.

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

1. If you're in code mode, click **Back**. Code mode has the **Files** tree, not the Library.
2. In the [Library](../design/library.md), click **Add** (+) and choose **Import Dart code...**.
3. Paste your code into the editor, or click **From file** and pick a `.dart` file.
4. Click **Import** or **Import as Custom code**.

![The Import Dart code dialog: a code editor with a sample formatDate function, and the buttons From file, Import, Import as Custom code (highlighted) and Cancel.](/img/docs/code/code-custom-code-1.png)

| Button | What it does |
|---|---|
| **Import** | Nowa reads the code and takes it over as if it had written it, so you can edit it visually. If you face problems, use **Import as Custom code**. |
| **Import as Custom code** | Nowa keeps the code exactly as written and never runs it on the board. A widget shows as a placeholder, and functions log "calling: `<name>`" and return stand-in values. |

Nowa sorts what you import by kind. Screens go to `lib/pages/`, other widgets to `lib/components/`, classes with `toJson` or `fromJson` to `lib/models/`, global state classes (a `ChangeNotifier`) to `lib/globals/`, and functions to `lib/functions/`. Other classes and enums go to `lib/`. Each file is named after its declaration. If a board is open, new screens are placed on it.

:::warning
Import replaces any declaration in your project that has the same name. Check the names first. A `main` function can't be imported.
:::

## Check the real result

The board draws your code by reading it, so a few things look different or show as small placeholders, and Dart that Nowa can't read yet is skipped and listed in **Problems**. Click **Run** to compile and run everything, including your own code and packages. See [Run your app](../test/run.md) and [What Nowa can show on the board](limitations.md).

:::tip Or ask Nowa AI
Try "Write a StarRating widget that shows 1 to 5 stars and add it under the product title." Nowa AI writes the code into your project. Read or change it in code mode.
:::

## Next steps

- [Add packages](packages.md)
- [What Nowa can show on the board](limitations.md)
- [Use Nowa with VS Code](vs-code.md)
- [Edit code in Nowa](code-mode.md)
