---
title: Use Git
description: Commit, sync with GitHub, switch branches, resolve conflicts and browse history from the Git panel, in cloud and local projects.
keywords: [git, github, commit, push, pull, sync, publish branch, branch, merge, conflict, resolve conflicts, commit history, revert, undo commit, stage, diff, version control, source control, repository, initial commit]
---

The **Git** panel gives you version control in cloud and local projects: see what changed, commit, sync with GitHub, switch branches and step back through history.

## Before you start

- **A plan with Git integration.** If yours doesn't include it, the **Git** panel and the Git settings show "Your plan does not support git integration" with an **Upgrade** button. See [pricing](https://nowa.dev/pricing).
- **A project in your account or on your computer.** The **Git** panel isn't available in the [playground](../get-started/playground.md).
- **A remote repository, to sync.** You can commit without one. To push and pull, see [Connect GitHub](github.md).

Cloud projects run Git on Nowa's servers. Local projects run Git on your computer, on the same repository your other tools use.

## Open the Git panel

Click **Git** in the left sidebar, or the branch name in the status bar. A badge on the icon counts your changed files.

New projects start with a repository and an **Initial commit**. In a project that has no repository yet, for example a cloud [import](import.md), click **Create Git Repository...**.

{/* CAPTURE: id=code-git-1 | state: signed in, a plan with Git integration, a project with one staged file and two unstaged changes and one local commit not yet pushed, Git panel open from the left sidebar | show: the branch row, Staged Changes and Changes lists with counts, the Commit message box with the Commit Staged button, and the Commit History bar | crop: the left panel */}

## Commit your changes

Changed files are listed under **Changes**. Files you stage move to **Staged Changes**.

1. Type a **Commit message**.
2. Click the button under the box. It reads **Commit All** and commits every change. Once you stage files, it reads **Commit Staged** and commits only those.
3. Wait for "Committed successfully."

To stage a file, hover it and click **Stage file**. To stage everything, hover **Changes** and click **Stage Changes**. **Unstage file** and **Unstage Changes** do the reverse.

To pick files in a dialog, hover the branch row, click **...** and choose **Commit**. In **Create Commit**, select files under **Not Added**, click `>>` to stage them under **Added** (`<<` unstages them), type a message and click **Commit**. **Add Files...** in the same menu stages files without committing.

Commits carry a name and an email, and new projects use your account's. A cloud project without one asks for it ("You need to set your identity first"). A local project uses the identity in its repository or in Git on your computer, so [set your identity](github.md#set-your-git-identity) if neither has one.

## Review or discard changes

- **Review.** Click a changed file to open its diff in a tab. **Previous change** and **Next change** step through the edits, and a badge shows whether you're viewing the **Staged** or **Unstaged** version.
- **Discard.** Hover a file and click **Discard file changes**, or hover **Changes** (or **Staged Changes**) and click **Discard all changes**. Confirm with **Continue**.

:::warning
Discarding puts your files back to the last commit and deletes files you added since. You can't undo it.
:::

## Sync with GitHub

When there's nothing left to commit, the button under the commit box reads **Sync**. Arrows show how many commits you'll push (↑) and pull (↓).

- **Sync** pulls first, then pushes, and shows "Sync complete".
- **Publish Branch** takes its place for a branch that isn't on the remote yet, and pushes it.
- **Push** and **Pull** in the **...** menu do one half each.

With no remote yet, **Publish Branch** and **Sync** open **Manage Remotes** so you can [create or connect a repository](github.md#connect-a-repository), while **Push** and **Pull** report "No remote repository found".

Nowa checks the remote for new commits at most every five minutes, and when you pull or push. If you see "You need to provide authentication for this action" or "You need to add your credentials to access the remote repository", see [Connect GitHub](github.md).

If a **Pull** brings in changes that clash with yours, **Resolve Conflicts** opens. After a clash during **Sync**, the files appear under **Conflicts** instead; see [Resolve conflicts](#resolve-conflicts).

## Work with branches

Click the branch name at the top of the panel. A star marks the current branch.

| To | Do this |
|---|---|
| Switch | Click a branch. Nowa saves your open edits first, and your uncommitted changes come along. If they clash with the other branch, Nowa asks "Switch branch?": click **Bring my changes** to carry them over (clashes open **Resolve Conflicts**) or **Cancel**. |
| Create | Click **New Branch**, type a **Branch Name** and click **Create Branch**. The new branch starts from the current one and Nowa switches to it. Spaces become `-`. |
| Use a remote branch | Click it under **Remote**. Nowa creates a local branch that follows it. |
| Merge | Hover another branch, click **Merge into current branch**, then **Merge**. Commit or discard your changes first. |
| Delete | Hover a local branch you're not on, click **Delete branch**, then **Delete Branch**. The remote branch stays. |

{/* CAPTURE: id=code-git-2 | state: signed in, Git panel open on a branch with another local branch and a remote-only branch; click the branch name, then click another branch while a file you changed differs on that branch | show: the open branch menu (star on the current branch, Local and Remote headings, New Branch) and the Switch branch? dialog with Cancel and Bring my changes | crop: left panel + dialog */}

## Resolve conflicts

A conflict happens when both sides changed the same lines of a file. After a **Pull**, a merge or **Bring my changes**, **Resolve Conflicts** opens by itself and shows one file at a time. Two read-only panes hold the whole file: **Local** is the version on your current branch and **Remote** is the one coming in.

1. Read both panes, then click **Accept Local** or **Accept Remote** to keep that version. You choose per file, not per line.
2. Repeat for each file. Nowa stages the resolved files.
3. Commit as usual.

In a local project, the panes are the other way round after **Bring my changes**: **Local** is the version on the branch you switched to, and **Remote** holds your own changes.

To reopen it, or to open it after a **Sync**, expand **Conflicts** and hover a file for **Resolve conflict**, or the section for **Resolve all Conflicts**.

## Browse and undo history

Expand **Commit History** at the bottom of the panel (**Refresh Commits** reloads it). Click a commit to see its message, whether it's **Pushed** or **Not Pushed**, and its changed files, then click a file for its diff. Right-click a commit for actions:

| Action | What it does |
|---|---|
| **Copy SHA** | Copies the commit's ID. |
| **Undo Commit** | Takes back your latest commit and moves its changes to **Staged Changes**. It works only on the latest commit, and only before you push it. |
| **Revert Commit** | Undoes the changes of the commit you picked, so it also works on older and pushed commits. In a local project the undone changes appear under **Staged Changes**; commit them to finish. |

Neither works on a repository's first commit. With uncommitted changes they do nothing, even if a success message appears, so commit or discard first.

## Move work between a cloud and a local project

Git shares work between a cloud project and a local one without overwriting either, unlike [Project Sync](local-projects.md#link-a-cloud-copy-with-project-sync), which copies every file one way. Use the cloud project for **Deploy** and the local one for your own tools.

1. In the first project, commit your changes.
2. Open **Manage Remotes** and create a GitHub repository. Nowa pushes your commits to it.
3. Create the other kind of project with [Clone from GitHub](import.md#clone-from-github) and pick that repository. To make it a local project, tick **Local-only**.
4. From then on, commit in either project and click **Sync** to push your work and pull the other side's.

## Next steps

- [Connect GitHub](github.md)
- [Use Nowa with VS Code](vs-code.md)
- [Import an existing Flutter project](import.md)
