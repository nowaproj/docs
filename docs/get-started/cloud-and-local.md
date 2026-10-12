---
title: Cloud and local projects
description: Compare cloud projects, stored in your Nowa account, with local projects, stored in a folder on your computer, and learn which one to start with.
sidebar_label: Cloud and local projects
keywords: [cloud project, local project, local-only, On this device, desktop app, Project Sync, where are my files, local vs cloud, why local projects, offline, which project am I in]
---

Every Nowa project is either a **cloud project** or a **local project**. The difference is where its files live. A cloud project lives in your Nowa account and opens on any device you sign in on. A local project is a folder of app files on your computer, which you open in the [desktop app](./desktop-app.md).

Editing, Nowa AI and **Run** work in both. If you don't write code, a cloud project is all you need, and it's what Nowa creates unless you ask for a local one.

## The difference at a glance

| | Cloud project | Local project |
|---|---|---|
| Where the files live | In your Nowa account, in **Personal** or in a workspace. | In a folder on your computer. |
| Where you can open it | The web app and the desktop app, on any device you sign in on. | The desktop app, on that computer only. |
| Where it shows in the dashboard | Under **Projects**. | Under **On this device**, tagged **LOCAL-ONLY**. |
| How you create it | **New project**, the prompt box, or **Clone from GitHub**. In the desktop app, **Import project** can upload a folder as a cloud project. | In the desktop app: **New project** → **Advanced** → **Local-only project**. **Import project** and **Clone from GitHub** can also keep a project local. |
| Deploy to web, Android and iOS | Yes, from **Deploy**, on paid plans. | No. Link a cloud copy with **Project Sync** first. |
| **Share preview** and **Public project** | Yes. | No. |
| Workspaces and teammates | Yes. | No. Local projects appear only under **Personal**. |
| Getting your code | Download a zip from code mode (depends on your plan). | It's already on your disk. |
| Git (version history) | **Git** panel. Git runs on Nowa's servers. | **Git** panel. Git runs on your computer. |
| VS Code (a code editor) | Not available. | **Open in VS Code** opens the same folder, and Nowa picks up changes you make there. |
| Run on devices and emulators | Yes, with the desktop app. Nowa keeps a temporary copy on your computer (**Local cache**). | Yes, with the desktop app. |
| **Run** in the editor | Runs on Nowa's servers. Scan a QR code to open it on your phone. When you save, the app restarts with your changes (**Hot Restart**). | Runs on your computer. **Open in Browser** opens it. When you save, the running app updates in place (**Hot Reload**). |

## Which should you pick?

- **Pick a cloud project** to open your work from any device, share previews, deploy from Nowa, or invite teammates. It's the default, and the right choice for most people.
- **Pick a local project** when you want the files stored only on your computer, or want to work on the same files in VS Code or another code editor. You need the desktop app.

Either way, Nowa needs an internet connection, even in the desktop app and for local projects: it checks your account with Nowa's servers when you open the dashboard or a project.

:::warning
**Delete** on a local project erases its folder from your disk. To keep the files, use **Remove from list** in the project's ⋮ menu instead.
:::

## Tell which kind you have

- **On the dashboard:** local projects sit under **On this device**, tagged **LOCAL-ONLY**. The section's description reads "Opted out of the cloud — no Cloud Build, sharing or backups." In the list view, each project row also shows a **Cloud** or **Local** badge.
- **In the editor:** a local project has no **Deploy** button in the top bar. While your app runs, its controls read **Hot Reload** and **Open in Browser**, where a cloud project shows **Hot Restart** and **Open on Mobile**.

## Create each kind

- **Cloud:** use the prompt box or **New project** on the dashboard. See [Create and manage projects](../account/projects.md).
- **Local:** install the desktop app, set up Flutter, then create or import a project. See [Install the desktop app](./desktop-app.md) and [Work with local projects](../code/local-projects.md).

## Link a cloud copy and a local copy

Want both? **Project Sync** clones a cloud project to a folder on your computer, or a local project to the cloud, and links the two. Open it from **Settings** → **Project Sync** in the desktop app. On the dashboard, **Upload to cloud** in a local project's ⋮ menu opens the same options.

After that, **Sync from Cloud** and **Sync from Local** copy everything one way and overwrite the other side, so sync in the direction of the copy you changed. Use the cloud copy for **Deploy** and **Share preview**, which work on cloud projects only. See [Work with local projects](../code/local-projects.md).

## Badges in these docs

Pages mark what a feature needs with a badge, so you can tell at a glance whether it applies to you.

| Badge | Meaning |
|---|---|
| <Badge type="cloud" /> | Works for cloud projects only. |
| <Badge type="local" /> | Works for local projects only. |
| <Badge type="desktop" /> | Needs the desktop app. |
| <Badge type="web" /> | Only in the web app. |
| <Badge type="beta" /> | Beta or experimental. |
| <Badge type="enterprise" /> | Enterprise only. |
| <Badge type="paid" /> | Needs a paid plan. See [pricing](https://nowa.dev/pricing). |

## Next steps

- [Install the desktop app](./desktop-app.md): set up Flutter so you can use local projects.
- [Work with local projects](../code/local-projects.md): create one, link it to the cloud and find it again if it goes missing.
- [Create and manage projects](../account/projects.md): start, find and move your projects.
