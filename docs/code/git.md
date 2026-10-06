---
title: Use Git
description: Commit, sync with GitHub, switch branches, resolve conflicts and browse history from the Git panel, in cloud and local projects.
keywords: [git, github, commit, push, pull, sync, publish branch, branch, merge, conflict, resolve conflicts, commit history, revert, undo commit, stage, diff, version control, source control, repository, initial commit]
---

The **Git** panel gives you version control inside Nowa: see what changed, commit, sync with GitHub, switch branches and step back through history. It works in cloud projects and local projects.

## Before you start

- **A plan with Git integration.** If yours doesn't include it, the **Git** panel and the Git settings show "Your plan does not support git integration" with an **Upgrade** button. See [pricing](https://nowa.dev/pricing).
- **A project in your account or on your computer.** The **Git** panel isn't available in the [playground](../get-started/playground.md).
- **GitHub, to sync.** You can commit without it. To push and pull, [connect GitHub](github.md).

Cloud projects run Git on Nowa's servers. Local projects run Git on your computer, on the same repository your other tools use.

## Open the Git panel

Click **Git** in the left sidebar, or click the branch name in the status bar. A badge on the icon counts your changed files.

New projects start with a repository and an **Initial commit**. In a project without one, such as an [imported](import.md) project, click **Create Git Repository...**.

{/* CAPTURE: id=code-git-1 | state: signed in, a plan with Git integration, a project with one staged file and two unstaged changes and one local commit not yet pushed, Git panel open from the left sidebar | show: the branch row, Staged Changes and Changes lists with counts, the Commit message box with the Commit Staged button, and the Commit History bar | crop: the left panel */}

## Commit your changes

Changed files are listed under **Changes**. Files you stage move to **Staged Changes**.

1. Type a **Commit message**.
2. Click **Commit All** to commit every change. To commit only some files, stage them first and click **Commit Staged**. Hover a file and click **Stage file**, or hover **Changes** and click **Stage Changes**. **Unstage file** and **Unstage Changes** do the reverse.
3. Wait for "Committed successfully."

To choose files in a dialog, hover the branch row, click the **...** button and choose **Commit**. In **Create Commit**, select files under **Not Added**, click `>>` to move them to **Added** (`<<` moves them back), type a message and click **Commit**. **Add Files...** in the same menu stages files without committing.

Commits carry a name and an email. New projects use your account's. If Nowa says "You need to set your identity first", fill in the form it shows. See [Set your Git identity](github.md#set-your-git-identity).

## Review or discard changes

- **Review.** Click a changed file to open its diff in a tab. **Previous change** and **Next change** step through the edits, and a badge shows whether you're viewing the **Staged** or **Unstaged** version.
- **Discard.** Hover a file and click **Discard file changes**, or hover **Changes** (or **Staged Changes**) and click **Discard all changes**. Confirm with **Continue**.

:::warning
Discarding puts your files back to the last commit. You can't undo it.
:::

## Sync with GitHub

When there's nothing left to commit, the button under the commit box reads **Sync**. Arrows show how many commits you'll push (↑) and pull (↓).

1. Click **Sync**. Nowa pulls first, then pushes, and shows "Sync complete".
2. For a branch that isn't on the remote yet, the button reads **Publish Branch**. Click it to push the branch.

To push or pull on their own, use **Push** and **Pull** in the **...** menu. If the project has no remote yet, Nowa opens **Manage Remotes** so you can [create or connect a repository](github.md#connect-a-repository).

Nowa checks the remote for new commits at most every five minutes. **Refresh** (hover the branch row), **Pull** and **Push** check right away. If you see "You need to provide authentication for this action", [connect GitHub](github.md) first. A pull that clashes with your changes opens **Resolve Conflicts**.

## Work with branches

Click the branch name at the top of the panel. A star marks the current branch.

| To | Do this |
|---|---|
| Switch | Click a branch. Nowa saves your open edits first, and your uncommitted changes come with you. If they clash with the other branch, Nowa asks "Switch branch?". Click **Bring my changes** to carry them over (clashes open **Resolve Conflicts**) or **Cancel**. |
| Create | Click **New Branch**, type a **Branch Name** and click **Create Branch**. The new branch starts from the current one and Nowa switches to it. Spaces become `-`. |
| Use a remote branch | Click it under **Remote**. Nowa creates a local branch that follows it. |
| Merge | Hover a branch, click **Merge into current branch**, then **Merge**. Commit or discard your changes first. |
| Delete | Hover a branch, click **Delete branch**, then **Delete Branch**. Only the local branch goes. The remote branch stays. |

{/* CAPTURE: id=code-git-2 | state: signed in, Git panel open on a branch with another local branch and a remote-only branch; click the branch name, then click another branch while a file you changed differs on that branch | show: the open branch menu (star on the current branch, Local and Remote headings, New Branch) and the Switch branch? dialog with Cancel and Bring my changes | crop: left panel + dialog */}

## Resolve conflicts

A conflict happens when both sides changed the same file, for example after a pull, a merge or a branch switch. **Resolve Conflicts** opens by itself and shows one file at a time, with **Local** (the version in your project) and **Remote** (the incoming one) side by side.

1. Click **Accept Local** to keep yours or **Accept Remote** to take the other. You choose per file, not per line.
2. Repeat for each file. Nowa stages the resolved files.
3. Commit as usual.

To reopen it, expand **Conflicts** in the panel and hover a file for **Resolve conflict**, or hover the section for **Resolve all Conflicts**.

## Browse and undo history

Expand **Commit History** at the bottom of the panel. **Refresh Commits** reloads it. Click a commit to see its message, whether it's **Pushed** or **Not Pushed**, and its changed files. Click a file to see its diff. Right-click a commit for actions:

| Action | What it does |
|---|---|
| **Copy SHA** | Copies the commit's ID. |
| **Undo Commit** | Takes back your latest commit and moves its changes to **Staged Changes**. It works only on the latest commit, and only before you push it. |
| **Revert Commit** | Adds a new commit that undoes the one you picked. It works on older and pushed commits. |

Commit or discard your changes first. With uncommitted changes, **Undo Commit** and **Revert Commit** do nothing.

## Move work between a cloud and a local project

Git is a way to share work between a cloud project and a local one without overwriting either, unlike [Project Sync](local-projects.md#link-a-cloud-copy-with-project-sync), which copies every file one way. You get cloud features such as **Deploy** in the cloud project, and your own tools in the local one.

1. In the first project, open **Manage Remotes** and create a GitHub repository, then commit and click **Sync**.
2. In the other kind of project, [clone that repository](import.md#clone-from-github). For a local project, tick **Local-only**.
3. From then on, commit in either project and click **Sync** to push your work and pull the other side's.

## Next steps

- [Connect GitHub](github.md)
- [Use Nowa with VS Code](vs-code.md)
- [Work with local projects](local-projects.md)
- [Import an existing Flutter project](import.md)
