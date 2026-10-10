# B4b: Git, deep links and other integrations

### P27. Revert Commit says it creates a commit, but in local projects it only stages the undo

- **Area:** Git, Commit History (`lib/project/panels/git_panel`, `packages/git_nowa`)
- **Severity:** Medium — the dialog and the green "Commit reverted successfully." promise a finished revert, but nothing is committed. The reader finds out only when the files show up under **Staged Changes**. No data is lost.
- **Where:** desktop app; local projects (a cloud revert is a server call, see Root cause)
- **Status:** Present in 3.13.0 and dev (`packages/git_nowa` and the dialog code are unchanged since 3.12.5)
- **Confidence:** Confirmed in code — the call chain was read, and the same libgit2 call was run against the `libgit2.so` that ships with Nowa's `git2dart_binaries` 1.10.3 (it reports 1.9.1): commit count 2 before and after, the change staged, `.git/REVERT_HEAD` present. The app itself was not run.

**What happens.** In a local project, **Revert commit** puts the undo of the picked commit into the working folder and the index, and stops. The dialog says "This will create a new commit that undoes the changes made in the selected commit.", and a green "Commit reverted successfully." follows. The files are just waiting under **Staged Changes** for a commit that Nowa never makes.

**Steps to reproduce** (desktop app, local project with Git; not clicked through in the app)
1. Open the **Git** panel with nothing under **Changes** and at least two commits.
2. Expand **Commit History**. Right-click an older commit (or select it and click **⋯** in the details bar) and choose **Revert commit**.
3. In the **Revert Commit** dialog, click **Revert Commit**.

Expected: a new commit (`Revert "..."`) tops **Commit History**.
Actual: the green "Commit reverted successfully." appears, the history is unchanged, the reverted files are listed under **Staged Changes**, and the button under the commit box reads **Commit Staged** and wants a message.

**Root cause.** `RevertCommitAction` shows the promise at `lib/project/panels/git_panel/git_commit_actions.dart:26-27`, calls `manager.revertCommit` (`:34`) and always shows the success snackbar (`:36-41`). `GitManager.revertCommit` (`packages/git_nowa/lib/src/git_manager.dart:806-815`) hands over to `LocalGitServiceImpl.revertCommit`, which runs `commit.revert()` and returns `[]` (`packages/git_nowa/lib/src/local/local_git_service.dart:837-844`). In git2dart that is `git_revert` and nothing else: "Reverts the commit, producing changes in the index and working directory" (`git2dart-0.4.0/lib/src/commit.dart:178`, binding `lib/src/bindings/commit.dart:504`), the equivalent of `git revert --no-commit`. Nothing commits afterwards. The repository stays in the REVERT state until the next commit, whose `repo.stateCleanup()` ends it (`local_git_service.dart:250`).

Two more faults in the same path:
- With uncommitted changes `revertCommit` returns at the first line (`git_manager.dart:807`) and the snackbar still says it worked.
- `git_revert` can leave conflicts. Nothing checks for them, so the snackbar says success while files sit in conflict.

A cloud revert is `POST /git/revert/<sha>` (`network_git_service.dart:282-286`). Whether the server commits can't be seen from the client.

**Suggested fix.** Decide what the label means, then make the dialog, the snackbar and the code agree.
- Smallest change that matches the words: in `LocalGitServiceImpl.revertCommit`, after `commit.revert()` and when `!repo.index.hasConflicts`, call the existing `commit()` (`:219-255`) with git's message, `Revert "<first line>"` plus `This reverts commit <sha>.` With conflicts, throw `ConflictException` the way `merge` does (`:527-528`) and check which pane gets which side (see P28).
- In `RevertCommitAction`, show the success snackbar only when something was reverted. Return a bool from `GitManager.revertCommit` and, for the early return, say "Commit or discard your changes first".
- If staging was the intent, change only the two texts: "This stages the opposite of the changes in the selected commit. Commit them to finish." and "Revert staged. Commit it to finish."

Watch out: make the cloud server do the same thing. The new `commit()` call needs a Git identity, so P30 matters here.
Test: add a case next to `packages/git_nowa/test/merge_test.dart` (same `git(...)` helper and `LocalGitServiceImpl`): two commits, `service.revertCommit(path, secondSha)`, then assert the commit count is 3 and the subject starts with `Revert "` (or, for the staging variant, that `git status --porcelain` shows `M  <file>`).

**Docs impact.** `docs/code/git.md`, section "Browse and undo history": the **Revert commit** row says "In a local project the undone changes appear under **Staged Changes**; commit them to finish", and the paragraph below says that with uncommitted changes the actions "do nothing, even if a success message appears". Drop the local caveat (if the commit is made) and the "even if a success message appears" clause once the false success is gone.

### P28. After Bring my changes, the Local and Remote panes are swapped, so Accept Local throws away your own edits

- **Area:** Git, Resolve Conflicts after a branch switch (`lib/project/panels/git_panel`, `packages/git_nowa`)
- **Severity:** High — one click on **Accept Local** can silently discard uncommitted edits. High and not Critical because it takes a local project, a true same-lines clash after **Bring my changes** and that one click, and the edits stay recoverable from `.git` by hand.
- **Where:** desktop app; local projects (cloud conflicts come from the server, and which side is which there can't be seen from the client)
- **Status:** Present in 3.13.0 and dev (the logic in `packages/git_nowa` is unchanged since 3.12.5)
- **Confidence:** Confirmed in code and with libgit2 — W10 ran it with pygit2 (libgit2 1.9.7). I re-ran Nowa's exact call sequence against the libgit2 1.9.1 in `git2dart_binaries` 1.10.3 (ctypes, scratch repo) and got the same result. The app itself was not run.

**What happens.** After **Bring my changes**, the **Resolve Conflicts** dialog labels the branch you switched to as **Local** and your own edit as **Remote**. Everywhere else in Nowa **Local** is your side, so **Accept Local** writes the other branch's file over yours.

**When exactly it happens.** All of these must hold:
1. A local project in the desktop app.
2. You have uncommitted edits to a tracked file that also differs on the branch you click. Otherwise the switch just carries your edits along and no dialog opens.
3. You click **Bring my changes** in "Switch branch?".
4. Your edit and the other branch's change touch the same lines of that file. Edits in different places merge by themselves and the dialog doesn't open.
5. You click **Accept Local** on that file.

Pull and merge conflicts are not affected: there **Local** is your current branch, as labeled (`packages/git_nowa/test/merge_test.dart:79-103` asserts it). With the swap, **Accept Remote** after **Bring my changes** keeps your edit.

**What is lost, and what isn't.** Until you click, the file on disk holds both versions between conflict markers (`<<<<<<< Updated upstream` … `>>>>>>> Stashed changes`). **Accept Local** overwrites it with the branch's text. The stash that held your edit is already dropped by `Stash.pop` (seen: `git stash list` empty after the pop). The dropped stash commit stays in `.git/objects` as an unreachable commit, so someone who knows Git can still find it with `git fsck --unreachable --no-reflogs` until Git prunes it. Nowa offers no way to get it back.

**Steps to reproduce** (desktop app, local project with Git; the clash was built with libgit2, not clicked through in the app)
1. Click the branch name at the top of the **Git** panel, click **New Branch**, type `feature` as the **Branch Name** and click **Create Branch**. Nowa switches to `feature`.
2. Change one line (for example the text of the **Text** widget on the home screen), save, type a **Commit message** and click **Commit All**.
3. Click the branch name and click `main`.
4. Change the same line on `main` to something else and save. Don't commit.
5. Click the branch name and click `feature`. "Switch branch?" says "Your local changes conflict with feature."
6. Click **Bring my changes**. **Resolve Conflicts - lib/pages/home_page.dart** opens. Compare the panes with the text you typed in step 4.

Expected: **Local** shows your edit from step 4 and **Remote** shows the `feature` version.
Actual: **Local** shows the `feature` version and **Remote** shows your edit. If you click **Accept Local**, the file gets the `feature` text and your edit is gone from the project.

**Root cause.**
- A plain switch fails when your edits would be overwritten (`packages/git_nowa/lib/src/local/local_git_service.dart:451-459`). `GitHeader._migrate` then asks "Switch branch?" and, on **Bring my changes**, calls `checkoutBranch(branch, migrate: true)` (`lib/project/panels/git_panel/git_details.dart:182-196, 960-989`).
- The migrate path stashes (`local_git_service.dart:445-449`), switches (`:452, :460`), runs `Stash.pop` (`:465`) and throws `ConflictException(_mapConflicts(repo, null))` (`:466`).
- `_mapConflicts` fills **Local** from `conflict.our` and **Remote** from `conflict.their` (`:564-570`). That is right for a pull (`GitPullRequest`, `:1015-1032`) and a merge (`:528`), where ours is your branch. In a stash re-apply, libgit2 merges with ours = HEAD, which is the branch you just switched to ("Updated upstream"), and theirs = your stashed edits ("Stashed changes"). The probe showed stage 2 ("our") = `FEATURE version` and stage 3 ("their") = `MY uncommitted version`.
- `Stash.pop` drops the stash even when files conflict (the code's own comment says so, `:463-464`). The panes are read-only whole files (`git_details.dart:1816, 1845`), so there is nothing to merge by hand in the dialog.

**Suggested fix.** In `_mapConflicts` add a `fromStash` flag and, when it is true, swap the sides (`local: text(conflict.their)`, `remote: text(conflict.our)`). Pass `true` only from the migrate path at `:466`. The pull and merge calls keep the current mapping.
Watch out: the cloud path reads conflicts from the server (`packages/git_nowa/lib/src/network_git_service.dart:219-223`). Ask the server team which side is which before changing anything for cloud projects.
Test: next to `packages/git_nowa/test/merge_test.dart` (same `git(...)` helper): branch `feature` with a committed edit on a line, an uncommitted edit of the same line on `main`, then `service.checkoutBranch(path, 'feature', migrate: true)` must throw `ConflictException` with `conflict.local` = your edit and `conflict.remote` = the `feature` text.

**Docs impact.** `docs/code/git.md`, section "Resolve conflicts": delete "In a local project, the panes are the other way round after **Bring my changes**: **Local** is the version on the branch you switched to, and **Remote** holds your own changes." once the panes are fixed. Until then the page's "Read both panes" step is the only protection.
