---
title: Work with local projects
description: Keep your app in a normal Flutter folder on your computer, then create it, open it, link it to the cloud, find it again when it goes missing, or remove it safely.
sidebar_label: Local projects
keywords: [local project, local-only project, On this device, desktop app, Project Sync, Upload to cloud, Sync from Cloud, Sync from Local, Unlink Project, Project not found, Remove from list, delete project, import project, Flutter folder]
---

A local project is a normal Flutter project that lives in a folder on your computer. You build it in Nowa, and the same folder opens in VS Code, Git tools and anything else that reads Flutter. Your files are stored in a folder you choose, not in your Nowa account.

<Badge type="desktop" />

## Before you start

- Install the [Nowa desktop app](../get-started/desktop-app.md), for macOS, Windows or Linux. It needs a plan that includes it. If yours doesn't, the app shows "Upgrade to unlock desktop version, or use on web at app.nowa.dev". See [pricing](https://nowa.dev/pricing).
- Set up Flutter. Nowa needs the Flutter SDK to create and run projects. If you see **Flutter SDK not found**, follow [Set up Flutter](../get-started/desktop-app.md#setting-up-flutter-sdk).

A local project differs from a cloud project in three ways:

- **Where it shows up.** Local projects are listed under **On this device** in the desktop app only. Other computers and the web app don't see them.
- **What you gain.** You can [open it in VS Code](vs-code.md), jump to its folder with **View in folder** (in code mode, right-click a file in **Files**), and use the [Git](git.md) panel on the repository in that folder. Nowa also picks up files you change outside it: see [What syncs and when](vs-code.md#what-syncs-and-when).
- **What you give up.** **Deploy**, Cloud Build, **Share preview**, **Public project**, **Move to workspace...** and code download are for cloud projects. To use them, link a cloud copy with [Project Sync](#link-a-cloud-copy-with-project-sync).

For a side-by-side comparison, see [Cloud and local projects](../get-started/cloud-and-local.md).

## Create a local project

1. On the dashboard, click **New project**.
2. Type a **Project name**. You can use letters, numbers, spaces, hyphens and underscores.
3. Expand **Advanced** and click **Local-only project**. The card says "Stored only on this device. No Cloud Build or backups."
4. Check the **Path**. It starts as your **Default Projects Path** from **Local Setup**. Click **Browse** to pick another folder.
5. Click **Create project**. Nowa creates a Flutter project in a new folder inside that path, adds its starter app (routing, theme, a home page and a board), and opens it.

The folder is named after your project's package name: your project name in lowercase, with underscores for spaces. A leading digit is spelled out, so `2048 Game` becomes `two_048_game`. The dashboard shows the name you typed. If Nowa says a folder with that name already exists, pick another name or path.

{/* CAPTURE: id=code-local-projects-1 | state: desktop app, signed in, dashboard open, click New project, expand Advanced, tick Local-only project | show: the Project name field, the Advanced card with Local-only project ticked and the PRIVATE tag, the Path field with Browse, and Create project | crop: the dialog */}

## Open a local project

1. In the workspace switcher on the dashboard, choose **Personal**. Local projects aren't shown inside a workspace.
2. Scroll to **On this device**, tagged **LOCAL-ONLY**, and click a project.

The ⋮ menu on a project offers **Open in safe mode**, **Upload to cloud**, **Remove from list** and **Delete**. Choose carefully: [**Delete** erases the folder](#remove-from-list-or-delete).

Nowa remembers your local projects on this computer only. On another computer, add the folder again with **Import project**.

## Add a project you already have

Use **Import project** for a Flutter folder Nowa doesn't know yet, such as one you made on another computer or cloned yourself.

1. Click the arrow next to **New project** and choose **Import project**.
2. Click **Browse** and pick the project folder. If the folder holds several packages (a monorepo), choose one under **Package to open**.
3. Expand **Advanced**, click **Local-only project** (a monorepo is already local-only), then click **Import project**.

Nowa opens the folder where it is and doesn't copy it. For monorepos, cloud imports and what to expect on the board, see [Import an existing Flutter project](import.md).

## Link a cloud copy with Project Sync

Project Sync makes a cloud copy of your local project (or a local copy of a cloud project) and links the two. You then copy changes from one to the other when you choose. Nowa keeps the link on this computer.

To create the copy:

1. Open the project, click **Settings** (the gear in the top bar) and choose **Project Sync**. From the dashboard, you can instead open the project's ⋮ menu and click **Upload to cloud**.
2. For a local project, pick a place under **Select Workspace** and click **Clone to Cloud**. The first entry, **Cloud Projects**, means no workspace. For a cloud project, choose a folder in **Path** and click **Clone to Local**.
3. Wait for the copy to finish. It opens when it's ready.

To copy changes later:

1. Open **Project Sync**. You see a **Cloud Project** card and a **Local Project** card. The project you're in is marked **Current**.
2. On the card you want to update, click **Sync from Cloud** or **Sync from Local**. The button names where the files come from.
3. Read the **Sync Warning**, then click **Proceed with Sync**.

A sync overwrites existing data in the destination with the files from the source. It runs one way at a time and never on its own, so back up the destination first.

{/* CAPTURE: id=code-local-projects-2 | state: desktop app, a local project linked to a cloud copy, top bar Settings (gear) then Project Sync | show: the Cloud Project and Local Project cards with Current, Open Project, Sync from Cloud and Sync from Local, and the link icon between them | crop: the Project Sync page */}

To break the link, click the link icon between the cards (tooltip **Unlink Project**) and confirm with **Unlink Project**. Both projects stay as they are. To link them again, clone the project again.

## Fix "Project not found"

If you move, rename or delete a local project's folder, opening the project shows **Project not found** and the old path. Pick one:

- **Use** followed by a folder name: Nowa found a folder next to the old one with the same package name. Click it to point the project there.
- **Locate folder**: choose the folder yourself. It must contain a `pubspec.yaml`.
- **Remove from projects**: drop the project from your list. Nothing is deleted from disk.
- **Back to dashboard**: leave it for now.

## Remove from list or Delete

Both take a project off your list, but only one of them touches your files.

| | **Remove from list** | **Delete** |
|---|---|---|
| What happens | The project leaves your list. The folder and its files stay on disk. | The project leaves your list and its folder is erased from disk. |
| Confirmation | None. It happens right away. | A confirmation dialog ("Are you sure you want to delete…?") that says "This action cannot be reversed." Click **Delete Project** to confirm. |
| Getting it back | Add the folder again with **Import project**. | Not possible from Nowa. The folder isn't moved to the Trash or Recycle Bin. |

:::warning
**Delete** on a local project erases its folder and everything in it. Use **Remove from list** if you only want it off your list.

The one exception is a project you imported from inside a larger Git repository, where the repository's root folder is above the project's folder. For that project, **Delete** asks **Remove "name" from Nowa?**, says "The files stay on disk." and, when you click **Remove**, only takes it off the list. A project whose own folder is the repository root is erased like any other. That includes a repository you cloned with **Clone from GitHub** and **Local-only**, and a monorepo whose workspace root is the repository root.
:::

Either action also drops the project's Project Sync link. A cloud copy isn't touched. For cloud projects, see [Create and manage projects](../account/projects.md).

## Next steps

- [Use Nowa with VS Code](vs-code.md)
- [Use Git](git.md)
- [Run on a device or emulator](../test/devices.md)
- [Create and manage projects](../account/projects.md)
