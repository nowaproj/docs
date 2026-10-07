---
title: Workspaces and team members
description: Group cloud projects in a workspace, invite teammates as Owner, Editor or View Only, and manage who belongs to it.
sidebar_label: Workspaces
keywords: [workspace, team, members, invite, invitation, roles, owner, editor, view only, collaboration, share project, leave workspace, delete workspace, move to workspace, Personal]
---

A workspace is a shared home for cloud projects. Put projects in one, invite teammates by email, and decide who can change things and who can only look.

## How workspaces work

- **Personal** holds the projects that aren't in a workspace. Its menu entry says "Projects not in a workspace".
- A workspace holds cloud projects and its members. Local projects can't be in a workspace: they show only under **Personal**, in the desktop app.
- The dashboard shows one workspace at a time. Nowa remembers your choice on this device.
- Workspaces have no comments and no live co-editing, and the project menu has no option to duplicate a project.

Every member has a role:

| Role | What it means |
|---|---|
| **Owner** | Manages the workspace. Only an owner sees the invite row, can rename or recolor the workspace, and can delete it. |
| **Editor** | The default role for people you invite. Editors work on the workspace's projects. |
| **View Only** | Can open projects but not change them. See [Open a project as View Only](#view-only). |

## Create a workspace

1. In the dashboard sidebar, click the workspace switcher under the Nowa logo. It reads **Personal** until you pick another.
2. Click **Create workspace**.
3. Pick a color (Nowa picks one at random) and type a name in **Workspace Name**.
4. Click **Create**. The new workspace opens on the dashboard.

If you leave the name empty, Nowa says "Name cannot be empty".

{/* CAPTURE: id=account-workspaces-1 | state: signed-in dashboard, workspace switcher open | show: the open menu with Personal ("Projects not in a workspace"), a workspace row with its gear icon, and Create workspace | crop: sidebar top-left plus the menu */}

## Switch workspaces and move projects

Open the switcher and click **Personal** or a workspace. The **Projects** list then shows that workspace's cloud projects.

A project you create from **New project** or from the prompt box starts in **Personal**. To put a cloud project in a workspace:

1. Click ⋮ on the project card, then **Move to workspace...**.
2. In the move dialog, pick **Personal** or a workspace.
3. Click **Move**. The dashboard switches to that workspace.

**Clone from GitHub**, **Import project** and **Save your app** have a workspace chip, so you can choose the workspace as you create the project.

## Invite people

Only an owner sees the invite row.

1. Open the switcher and click the gear next to the workspace. **Workspace settings** opens.
2. Under **Members**, type your teammate's email address. The field shows "teammate@company.com" as a hint.
3. Pick a role: **Editor** (the default) or **View Only**.
4. Click **Invite**. Nowa emails an invitation, and the person appears in the list with a **Pending** badge.

To cancel or resend, click the **Pending** badge, then **Cancel invitation** or **Resend invitation**. If the address isn't valid, Nowa says "Please enter a valid email address".

{/* CAPTURE: id=account-workspaces-2 | state: signed-in as an owner, Workspace settings open on a workspace that already has members and a Pending invitation (do not send real invitations) | show: Workspace name, Members with the invite row (email, role, Invite), role badges, a Pending badge, and the red Delete workspace box | crop: the dialog */}

## Accept an invitation

1. Open the link in the invitation email.
2. Sign in with the invited account if Nowa asks.
3. When you see "Invitation accepted!", click **Ok**. The workspace now appears in your switcher.

If the link names a different email than the account you're signed in with, Nowa signs you out and opens the sign-in page. Sign in with the invited email and Nowa returns you to the invitation. If the invitation can't be accepted, the page shows the error instead.

## Change roles or remove people

Click a member's role badge to open a menu:

- **Make Owner**, **Make Editor** or **Make View Only** changes their role (you see the roles they don't have yet).
- **Remove member** takes them out of the workspace after you confirm.

You can't invite someone as an owner. To add another owner, invite them as **Editor**, then choose **Make Owner** once they've joined. If you change your own role, Nowa warns that you will lose access to some settings and asks you to confirm.

## Rename, leave or delete a workspace

- **Rename or recolor:** change the name or the color swatch, then click **Save changes**. Only owners can.
- **Leave:** if you aren't an owner, click **Leave workspace**. You lose access to the workspace and its projects.
- **Delete:** if you're an owner, click **Delete workspace** and confirm.

:::warning
Deleting a workspace cuts off every member's access. Nowa asks you to confirm, and says its projects move to your **Personal** space.
:::

## Open a project as View Only {#view-only}

A **View Only** member can open and explore a project, but the editor is read-only:

- The board toolbar shows **View only** instead of the tools. You can select widgets, copy them and use **Export as image...**.
- The save icon in the status bar is hidden, and the code editor is read-only.
- In the **Files** panel the **Add** (or **Import**) button is turned off, and right-clicking a file only offers **Copy as path**.
- **Project Details** hides the **Sharing** section.

Ask an owner to change your role if you need to edit.

## Next steps

- [Create and manage projects](./projects.md)
- [Share your app](../test/share.md) with people who aren't members
- [Account settings](./account-settings.md)
