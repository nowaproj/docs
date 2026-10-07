---
title: Import an existing Flutter project
description: Bring a Flutter app you already have into Nowa from a folder or from GitHub, then keep building with Nowa AI and the visual editor.
sidebar_label: Import a project
keywords: [import project, Clone from GitHub, existing Flutter project, FlutterFlow export, monorepo, workspace, Package to open, pubspec, open existing project, bring your own code, migrate]
---

Already have a Flutter app? Bring it into Nowa and keep going with Nowa AI and visual editing, on the code you already wrote. Import a folder from your computer, or clone a repository from GitHub.

## Before you start

- To import a folder, install the [desktop app](../get-started/desktop-app.md). **Import project** isn't in the web app.
- To keep the project on your computer, set up Flutter first. Local projects need the Flutter SDK, for example to run your app. See [Set up Flutter](../get-started/desktop-app.md#setting-up-flutter-sdk).

## Choose how to bring it in

| | **Import project** | **Clone from GitHub** |
|---|---|---|
| Where it works | Desktop app only | Web and desktop app |
| What you bring | A Flutter folder on your computer | A repository from your connected GitHub account |
| What you get | A cloud project (an uploaded copy), or a local-only project (your folder, opened in place) | A cloud project, or with **Local-only** (desktop app) a local project cloned to your computer |
| What it needs | A `pubspec.yaml` in the folder | A plan with Git integration and a connected GitHub account |

Both start from the arrow next to **New project** on the dashboard.

## Import a project from a folder

<Badge type="desktop" />

1. Click the arrow next to **New project** and choose **Import project**.
2. Next to **Project folder**, click **Browse** and pick your Flutter project's folder. You can also paste a path and press <kbd>Enter</kbd>.
3. If a **Package to open** menu appears, pick the package to edit. See [Work with a monorepo](#work-with-a-monorepo).
4. Choose where the project lives:
   - To upload a copy to your Nowa account, keep the default. The footer reads "Imported to the cloud — run, share and build from anywhere." The workspace chip at the top of the dialog picks which workspace gets the copy.
   - To keep your folder where it is, expand **Advanced** and click **Local-only project**. The footer reads "Imported locally — stays on this device, no cloud features."
5. Click **Import project**. The project opens.

{/* CAPTURE: id=code-import-1 | state: desktop app, signed in, dashboard open; click the arrow next to New project, choose Import project, browse to a folder that is a Flutter workspace with several packages | show: the Project folder field, the open Package to open menu with its hints (Has boards, Workspace root, App, Library), the Advanced section and the footer text | crop: the dialog */}

What to know before you click **Import project**:

- The folder needs a `pubspec.yaml`. Without one, the dialog warns "No pubspec.yaml here — Nowa can browse and edit the files, but not design them." and **Import project** still stops with "Exception: Chosen folder is not a nowa project or a flutter project."
- A cloud import uploads a copy and leaves your folder alone. It skips `.git/`, `build/`, `.dart_tool/` and `.idea/`, so the copy starts without Git history. To keep history, import as local-only.
- A local-only import opens your folder in place. Nowa doesn't copy it, so you can keep editing the same folder in [VS Code](vs-code.md). The project is listed under **On this device**.
- Monorepos, and projects inside a bigger Git repository, are always local-only. The **Local-only project** card is locked and the footer reads "Imported locally — git and the other packages stay reachable."

## Clone from GitHub

Before you start:

- Connect your GitHub account in [Connect GitHub](github.md). The repository list doesn't appear until you do.
- Use a plan with Git integration. Otherwise Nowa shows **Time to level up** with an **Upgrade** button.

Then:

1. Click the arrow next to **New project** and choose **Clone from GitHub**.
2. Pick a repository in the list. Type in **Search repositories** to filter it. If you can't find yours, click **Manage your connected repositories** to choose which repositories Nowa can see on GitHub.
3. Check the **Project name**. It starts as the repository name, and it's the name Nowa shows.
4. Choose where the clone goes. The chip at the top picks the workspace for a cloud project. In the desktop app, tick **Local-only** to clone to your computer instead. Nowa puts the clone in a folder named after the repository, inside your **Default Projects Path** from **Local Setup**.
5. Click **Clone project**. A timer shows how long the clone has run. The project opens when it finishes.

{/* CAPTURE: id=code-import-2 | state: signed in with GitHub connected and a plan that includes Git integration; click the arrow next to New project, choose Clone from GitHub, select a throwaway repository | show: the repository list with Search repositories and the Manage link, Project name, the workspace chip, and the Local-only, Cancel and Clone project controls | crop: the dialog */}

If the clone fails, the dialog shows the reason with a **Fix** button:

- "Set a default projects folder in settings to clone locally." **Fix** opens **Local Setup**, where you set **Default Projects Path**.
- "You need to add your credentials to access the remote repository" or "You don't have access to this repository, please check your credentials". **Fix** opens the **Git** settings. See [Connect GitHub](github.md).

## Work with a monorepo

Nowa treats a folder as a monorepo when its `pubspec.yaml` lists `workspace:` members, or when it keeps packages in `packages/` or `apps/`. You then choose which package to edit, either in **Package to open** while importing or in the **Open** prompt after a local clone ("This workspace holds several packages. You can switch later.").

- Each package carries a hint: **Has boards** (it already has board files), **Workspace root**, **App** (it has a `lib/main.dart`) or **Library**.
- Nowa preselects the package you picked, then one that has boards, then the workspace root. If you pick a package folder inside a workspace, Nowa still opens the whole workspace.
- To switch later, click the package chip in the top bar (tooltip **Package being edited**). It shows only when the project has two or more packages. Nowa saves and reopens the project on the package you choose.
- [Git](git.md) covers the whole repository, including files outside the package you're editing.

## What to expect on the board

- **A project without boards opens on an empty board.** Your screens and components are in the **Widgets** panel as **Page** and **Component** tiles. Drag one onto the board to see it.
- **Nowa draws your code by interpreting it, not compiling it.** Parts it can't draw show as placeholders, and anything it skips is reported in the **Problems** tab. Click **Run** to compile the whole app and see the real output. See [What Nowa can show on the board](limitations.md) and [Write your own code](custom-code.md).
- **Nowa adds a `.nowa` folder** with its settings. Its `temp/` folder and `thumbnail.png` are Git-ignored.
- **FlutterFlow exports work too.** Nowa draws pages that use `safeSetState`, custom functions and Firestore records with placeholder data, even without a Firebase connection on the board.
- **Code you change visually is rewritten.** On save, Nowa adds `@NowaGenerated` and an import of `package:nowa_runtime/nowa_runtime.dart`, turns relative imports into `package:` imports, reorders constructor parameters and writes `16` as `16.0`. Code you don't touch stays as you wrote it.

:::tip
Commit before you start editing visually. The [Git](git.md) panel then shows exactly what Nowa changed in your files.
:::

## Next steps

- [Work with local projects](local-projects.md)
- [Write your own code](custom-code.md)
- [Use Git](git.md)
- [Connect GitHub](github.md)
