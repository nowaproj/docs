---
title: Nowa and your Flutter code
description: Everything you build in Nowa is real Flutter and Dart code that you own. See how code and design stay in sync, and where to read, edit and add code.
sidebar_label: Overview
keywords: [code, Dart, Flutter, source code, own your code, sync, NowaGenerated, hybrid approach, custom code, code and design, pubspec]
---

Every screen you design and every change Nowa AI makes ends up as ordinary Dart in an ordinary Flutter project, and the project is yours. Read the code, edit it by hand, add code of your own, and keep using the board and Nowa AI on the same files.

## What's in your project

Open [code mode](code-mode.md) to browse the whole project. Nowa creates new files in these places:

| File or folder | What's in it |
|---|---|
| `lib/main.dart` | Where your app starts. You can edit it, but you can't delete it. |
| `lib/pages/` | Your screens. |
| `lib/components/` | Your components. |
| `lib/models/` | Your data models. |
| `lib/globals/` | App-wide files: global state, themes, routes and constants. |
| `boards/` | Your boards, saved as `.board` files for Nowa. They aren't part of your app's code. |
| `assets/` | Images, fonts and other files. |
| `pubspec.yaml` | Your packages, assets and fonts. |

Integrations add their own folders under `lib/`, such as `lib/api/` for REST API collections. The project also holds the usual platform folders, such as `android/`.

## How code and design stay in sync

The board, Nowa AI and your own edits all change the same files, so Nowa keeps them in step in both directions.

| When you | What happens |
|---|---|
| Change something on the board or in **Details**, or Nowa AI builds it | Nowa rewrites the code it owns. Code that belongs to Nowa is marked `@NowaGenerated`. |
| Edit code in [code mode](code-mode.md) | Nowa reads your edits back when you save with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>, or when auto save runs. The board updates. |
| Write code of your own | Nowa reads it so it can draw it, and writes it back exactly as you wrote it, until you change that part visually. |

When you change one of your own declarations visually, Nowa takes it over. It adds `@NowaGenerated` and an import of `package:nowa_runtime/nowa_runtime.dart`, turns relative imports into `package:` imports, and can reorder constructor parameters or write `16` as `16.0`. Anything you haven't touched stays as you wrote it.

Files that Nowa saves follow the formatter page width in your project's `analysis_options.yaml` (80 when the project sets none), so your diffs show only what changed. If an edit by Nowa AI would leave a Dart file with syntax errors, Nowa refuses it and writes nothing.

Nowa reads your code to draw it on the board. It doesn't run it there the way a real device does. When Nowa can't read a part of a file, it keeps that part as written and tells you why. See [What Nowa can show on the board](limitations.md).

## Where your code lives

- **Cloud projects** live in your Nowa account. Edit them in Nowa, push them to GitHub with [Git](git.md), or [download the code](../publish/download-code.md).
- **Local projects** are folders on your computer, so any editor can open them. See [Work with local projects](local-projects.md) and [Use Nowa with VS Code](vs-code.md).

[Cloud and local projects](../get-started/cloud-and-local.md) compares the two.

## In this section

| Page | What you can do |
|---|---|
| [Edit code in Nowa](code-mode.md) | Open code mode, work in tabs, edit Dart with find, autocomplete and go to definition, and preview your app next to the code. |
| [Manage project files](files.md) | Browse, create, move and delete files, and search the whole project. |
| [Add packages](packages.md) | Add, update and remove pub.dev packages. |
| [Write your own code](custom-code.md) | Use your own widgets, functions and classes on the board, and import Dart code. |
| [What Nowa can show on the board](limitations.md) | See what the board can't draw yet, and check the real result with **Run**. |
| [Import an existing Flutter project](import.md) | Bring in an app you already have. |
| [Use Git](git.md) and [Connect GitHub](github.md) | Keep a history of your code and sync it with GitHub. |

:::tip
You never have to open code mode. Describe the change to [Nowa AI](../ai/index.md), then read what it changed here if you're curious.
:::
