---
title: Create and manage projects
description: Start a project from a prompt, a name, GitHub or a Flutter folder, find it again on the dashboard, and move, remove or delete it.
sidebar_label: Projects
keywords: [new project, create project, dashboard, projects list, search projects, sort, recents, delete project, remove from list, safe mode, move to workspace, project not found, cloud project, local project, clone from GitHub, import project]
---

Every Nowa app starts on the dashboard. Describe your idea and Nowa AI builds the first version, or start from an empty project, a GitHub repository or a Flutter folder. Then find any project again in seconds.

## Start a project

| Start from | Best when | Where to click |
|---|---|---|
| A prompt | You want Nowa AI to build the first version | **What do you want to build?** at the top of the dashboard |
| An empty project | You want to build it yourself, with or without the AI | **New project** |
| A GitHub repository | Your app already lives on GitHub | The arrow next to **New project**, then **Clone from GitHub** |
| A Flutter folder | You have a project on your computer (desktop app only) | The arrow next to **New project**, then **Import project** |

The dashboard shows **New project** in the **Projects** header. In a narrow window the button reads **New**.

{/* CAPTURE: id=account-projects-1 | state: signed-in dashboard with a few projects, click the arrow next to New project | show: the Projects header (count, Search..., sort button, grid/list toggle) and the open New project menu with New project, Clone from GitHub and Import project | crop: top of the dashboard main area */}

### Start from a prompt

1. Type your idea in **What do you want to build?**
2. Pick a mode and a thinking level under the box.
3. Click the send button (tooltip **Build it**).

Nowa names your app, creates a cloud project and opens it with your prompt already sent. The full walkthrough is in [Build your first app](../get-started/first-app.md), and modes are explained in [Design, Plan and Agent modes](../ai/modes.md).

### Create an empty project

1. Click **New project**.
2. Type a **Project name**.
3. Click **Create project** (or press <kbd>Enter</kbd>). The editor opens on a starter app with routing, a theme, a home page and a board.

A new project is a cloud project: it lives in your Nowa account. It has no workspace, so it appears under **Personal**. To share it with a team, use **Move to workspace...** (see [Workspaces and team members](./workspaces.md)).

On the desktop app you can keep a project only on your computer instead. Expand **Advanced** in the dialog and click **Local-only project**. On the web app the same card says "Local projects are only available in the desktop app." See [Work with local projects](../code/local-projects.md).

### Clone or import a project

- **Clone from GitHub** copies one of your repositories into a new project. Pick the repository, check the **Project name**, then click **Clone project**. You need [GitHub connected](../code/github.md) first, and a plan that includes it. Without the plan, **Time to level up** appears.
- **Import project** brings in a Flutter folder you already have (desktop app only). Click **Browse**, pick the folder, then click **Import project**. It uploads to your account unless you choose **Local-only project** under **Advanced**.

Both dialogs have a workspace chip, so you can choose where a cloud copy goes. [Import an existing Flutter project](../code/import.md) has the details, including monorepos.

## Name your project {#name-your-project}

Your name can use letters, numbers, spaces, underscores and hyphens. It can't be empty, and it can't be only a Dart reserved word such as `class` or `import`. Nowa shows one of these messages when a name breaks a rule:

- "App name cannot be empty"
- "App name should only contain letters, numbers, underscores, hyphens, and spaces"
- "App name cannot be a reserved keyword"

The name you type is your **Project Name** on the dashboard. Nowa also sets up two identifiers for the app itself:

| Identifier | How it starts | Can you change it? |
|---|---|---|
| **Package Name** | Derived from your name. For local projects and imports it is lowercase with underscores for spaces, and a leading digit is spelled out, so `1project` becomes `one_project`. | No |
| **Bundle Identifier** | `com.example.` followed by your name without spaces, underscores or hyphens, plus the first six characters of the project ID. | Yes, in [Project settings](./project-settings.md) |

Change the **Bundle Identifier** before you publish, because app stores use it to identify your app.

## Find a project {#find-a-project}

The **Projects** header shows how many projects the current workspace has. Click a card or row to open the project.

- **Search...** looks through your projects as you type. If nothing matches, Nowa says "No projects found".
- The sort button (tooltip **Sort: Updated**) opens **Sort by**: **Updated**, **Created** or **Name**.
- The grid and list buttons switch the layout.
- **Load More** appears at the bottom when you have more projects than fit.

Cards show a cover image (or the project's first letter), its name and when you last edited it, such as "Edited 5m ago". List rows add a **Cloud** or **Local** badge. The cover is a board screenshot taken whenever you save, unless you set your own under **Project Details** → **Sharing**.

**RECENTS** in the sidebar lists up to five projects you edited most recently. Click one to jump straight in.

Nowa remembers the workspace and the sort order you chose, on this device.

:::tip
Can't see a project? Check the workspace switcher in the sidebar: each workspace lists only its own projects. Local projects appear only in the desktop app, under **On this device**, and only while **Personal** is selected.
:::

## Use the project menu {#project-menu}

Click ⋮ on a project card or row.

{/* CAPTURE: id=account-projects-2 | state: signed-in dashboard, open the ⋮ menu on a cloud project card | show: the menu with Open in safe mode, Move to workspace... and Delete (a local project also shows Upload to cloud and Remove from list) | crop: one card plus its menu */}

| Menu item | What it does | Shown for |
|---|---|---|
| **Open in safe mode** | Opens the project without reopening the tabs you had open. Use it if a project freezes or misbehaves when it opens. | All projects |
| **Move to workspace...** | Opens **Move to...** with **Personal** and your workspaces. Pick one and click **Move**. | Cloud projects |
| **Upload to cloud** | Copies a local project to your account and links the two. | Local projects (desktop app) |
| **Remove from list** | Takes a local project off your list. Its files stay on your disk. | Local projects |
| **Delete** | Deletes the project after you confirm. | All projects |

**Delete** asks you to confirm with "This action cannot be reversed." and a **Delete Project** button. A cloud project is removed from your account.

:::warning
**Delete** on a local project also erases its folder from your disk, and Nowa can't bring it back. To get a local project off your list and keep its files, use **Remove from list**. If the project sits inside a larger Git repository, **Delete** only removes it from the list and says "The files stay on disk." The exact rules are in [Work with local projects](../code/local-projects.md#remove-from-list-or-delete).
:::

## Fix "Project not found" {#project-not-found}

If a local project's folder was moved, renamed or deleted, opening it shows **Project not found** and the old path. Click **Locate folder** and pick the folder (it must contain a `pubspec.yaml`), or click a button named after a folder Nowa found next to the old one, such as **Use my_app**. **Remove from projects** drops the project from your list, and **Back to dashboard** leaves it for now. [Work with local projects](../code/local-projects.md) covers this screen in full. A cloud project shows **Try again** instead.

## Next steps

- [Workspaces and team members](./workspaces.md)
- [Project settings](./project-settings.md)
- [Cloud and local projects](../get-started/cloud-and-local.md)
- [Get help](./help.md) if something looks wrong
