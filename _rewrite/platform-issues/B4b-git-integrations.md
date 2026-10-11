# B4b: Git, deep links and other integrations

### P27. Revert Commit says it creates a commit, but in local projects it only stages the undo

- **Area:** Git, Commit History (`lib/project/panels/git_panel`, `packages/git_nowa`)
- **Severity:** Medium — the dialog and the green "Commit reverted successfully." promise a finished revert, but nothing is committed. The reader finds out only when the files show up under **Staged Changes**. No data is lost.
- **Where:** desktop app; local projects (a cloud revert is a server call, see Root cause)
- **Status:** Present in 3.13.0 and dev (`packages/git_nowa` and the dialog's text are unchanged since 3.12.5)
- **Confidence:** Confirmed in code — the call chain was read, and the same libgit2 call was run against the `libgit2.so` that ships with Nowa's `git2dart_binaries` 1.10.3 (it reports 1.9.1): commit count 2 before and after, the change staged, `.git/REVERT_HEAD` present. The app itself was not run.

**What happens.** In a local project, **Revert commit** puts the undo of the picked commit into the working folder and the index, and stops. The dialog says "This will create a new commit that undoes the changes made in the selected commit.", and a green "Commit reverted successfully." follows. The files are just waiting under **Staged Changes** for a commit that Nowa never makes.

**Steps to reproduce** (desktop app, local project with Git; not clicked through in the app)
1. Open the **Git** panel with nothing under **Changes** and at least two commits.
2. Expand **Commit History**. Right-click an older commit (or select it and click **⋯** in the details bar) and choose **Revert commit**.
3. In the **Revert Commit** dialog, click **Revert Commit**.

Expected: a new commit (`Revert "..."`) tops **Commit History**.
Actual: the green "Commit reverted successfully." appears, the history is unchanged, the reverted files are listed under **Staged Changes**, and the button under the commit box reads **Commit Staged** and wants a message.

**Root cause.** `RevertCommitAction` shows the promise at `lib/project/panels/git_panel/git_commit_actions.dart:26-27`, calls `manager.revertCommit` (`:34`) and always shows the success snackbar (`:36-41`). `GitManager.revertCommit` (`packages/git_nowa/lib/src/git_manager.dart:806-815`) hands over to `LocalGitServiceImpl.revertCommit`, which runs `commit.revert()` and returns `[]` (`packages/git_nowa/lib/src/local/local_git_service.dart:837-844`). In git2dart that is `git_revert` and nothing else: "Reverts the commit, producing changes in the index and working directory" (`git2dart-0.4.0/lib/src/commit.dart:178`, binding `git2dart-0.4.0/lib/src/bindings/commit.dart:504`), the equivalent of `git revert --no-commit`. Nothing commits afterwards. The repository stays in the REVERT state until the next commit, whose `repo.stateCleanup()` ends it (`local_git_service.dart:250`).

Two more faults in the same path:
- With uncommitted changes `revertCommit` returns at the first line (`git_manager.dart:807`) and the snackbar still says it worked. R14 covers this for **Revert commit** and for **Undo commit**.
- `git_revert` can leave conflicts. Nothing checks for them, so the snackbar says success while files sit in conflict.

A cloud revert is `POST /git/revert/<sha>` (`network_git_service.dart:282-286`). Whether the server commits can't be seen from the client.

**Suggested fix.** Decide what the label means, then make the dialog, the snackbar and the code agree.
- Smallest change that matches the words: in `LocalGitServiceImpl.revertCommit`, after `commit.revert()` and when `!repo.index.hasConflicts`, call the existing `commit()` (`:219-255`) with git's message, `Revert "<first line>"` plus `This reverts commit <sha>.` With conflicts, throw `ConflictException` the way `merge` does (`:527-528`) and check which pane gets which side (see P28).
- In `RevertCommitAction`, show the success snackbar only when something was reverted. Return a bool from `GitManager.revertCommit` and, for the early return, say "Commit or discard your changes first".
- If staging was the intent, change only the two texts: "This stages the opposite of the changes in the selected commit. Commit them to finish." and "Revert staged. Commit it to finish."

Watch out: make the cloud server do the same thing. The new `commit()` call needs a Git identity, so P30 matters here.
Test: add a case next to `packages/git_nowa/test/merge_test.dart` (same `git(...)` helper and `LocalGitServiceImpl`): two commits, `service.revertCommit(path, secondSha)`, then assert the commit count is 3 and the subject starts with `Revert "` (or, for the staging variant, that `git status --porcelain` shows `M  <file>`).

**Docs impact.** `docs/code/git.md`, section "Browse and undo history": the **Revert commit** row says "In a local project the undone changes appear under **Staged Changes**; commit them to finish", and the paragraph below says that with uncommitted changes the actions "do nothing, even if a success message appears". Drop the local caveat (if the commit is made) and the "even if a success message appears" clause once the false success is gone.

Related: R14, P28, P30.

### P28. After Bring my changes, the Local and Remote panes are swapped, so Accept Local throws away your own edits

- **Area:** Git, Resolve Conflicts after a branch switch (`lib/project/panels/git_panel`, `packages/git_nowa`)
- **Severity:** Critical — work is lost: one click on **Accept Local** discards your uncommitted edits, the stash that held them is already dropped, and only `git fsck` outside Nowa can find them again. The trigger is narrow (a local project, a same-lines clash after **Bring my changes**, that one click).
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

Related: P27, X2.

### P29. Resolve Conflicts: Accept makes Git forget the other conflicts

- **Area:** Git, Resolve Conflicts dialog (`lib/project/panels/git_panel`, `packages/git_nowa`)
- **Severity:** Medium — **Accept** makes Git forget the other conflicted files, so a later commit can delete them from the repository or record their conflict markers; nothing is lost on disk, and accepting every file in one pass avoids it.
- **Where:** both; cloud and local projects (the dialog is shared). The index clearing is persistent in local projects; in cloud projects only the list on screen is cleared until the next refresh.
- **Status:** Present in 3.13.0 and dev (same code in 3.12.5: `git_details.dart:1860-1869` there)
- **Confidence:** Confirmed in code and with libgit2 — Nowa's call sequence run against the bundled libgit2 1.9.1: after staging one file the other conflict is gone, and `git status` shows `D  b.txt` plus `?? b.txt`. The dialog itself was not run.

**What happens.** Accepting one file's version tells Git that every conflict is resolved. The **Conflicts** list empties, and in a local project Git's index drops the other conflicted files. Their working copies still hold the conflict markers, but nothing says "unresolved" any more. Git sees each as deleted in the index plus a new untracked file. (The dialog has a second, separate fault, X2: **Accept Remote** can write the next file's text into the file you resolved.)

By the code, this ends in a bad commit. With something staged, the button reads **Commit Staged** and commits the index, which no longer holds the unresolved files, so the commit deletes them from the repository (they stay on disk with markers). With nothing staged, **Commit All** stages them and commits the markers. `getStatus` also overwrites their statuses with `wtNew` (`git_manager.dart:781-783`), so the panel shows them as plain new files under **Changes**.

You are safe only if you accept every file in one go. You hit it when you open one file from **Conflicts** (hover the file, click **Resolve conflict**), or close the dialog (×) before the last file.

**Steps to reproduce** (desktop app, local project with Git; the git steps were run with libgit2, the dialog was not clicked)
1. Make a merge conflict in two files: on branch `feature` change the same line in two files (for example `lib/pages/home_page.dart` and `lib/globals/app_state.dart`) and click **Commit All**. Switch back to `main`, change the same lines differently and commit.
2. On `main`, click the branch name, hover `feature`, click **Merge into current branch**, then **Merge**. **Resolve Conflicts** opens on the first file.
3. Click × to close the dialog. Under **Conflicts** both files are listed.
4. Hover the first file, click **Resolve conflict**, then **Accept Local**.

Expected: the second file is still under **Conflicts**.
Actual: **Conflicts** is gone. The second file still shows `<<<<<<<` markers in the editor and now looks like a new file under **Changes**.

**Root cause.**
- `_acceptChanges` ends with `gitManager.resolveAllConflicts()` (`lib/project/panels/git_panel/git_details.dart:1785`). That calls `service.resolveConflicts` and then sets `conflicts: []` (`packages/git_nowa/lib/src/git_manager.dart:731-734`). Locally it is `index.cleanupConflict()` (`packages/git_nowa/lib/src/local/local_git_service.dart:368-372`), documented as "Removes all conflicts in the index (entries with a stage greater than 0)" (`git2dart-0.4.0/lib/src/index.dart:148-151`). The files lose their stage entries and get no stage-0 entry. The call is not needed: `addFiles([path])` just before it runs `index.addAll(paths); index.write()` (`local_git_service.dart:205-210`) and already resolves only that path (probe: after `git_index_add_all` on `a.txt`, only `b.txt` stays conflicted). The list is rebuilt from the index by `updateConflicts()` (`git_manager.dart:268, 736-739`). The cleaned in-memory index is what the next `index.write()` and the commit's `index.writeTree()` use (`local_git_service.dart:223`). Cloud: `NetworkGitService.resolveConflicts` returns at once (`network_git_service.dart:117-119`).

**Suggested fix.**
1. Delete the `resolveAllConflicts()` call at `git_details.dart:1785`, and make `addFiles` wait for its refresh (`git_manager.dart:478`: `await updateState()`). The index then keeps unresolved files as conflicts and the list stays right. If you still want a final clear, do it after the last file, only when `repo.index.hasConflicts` is false.
2. Optional: reopen **Resolve conflict** from the live list, not from the list the dialog was given.

Test: in `packages/git_nowa/test/merge_test.dart` style, make two conflicting files, call `service.stageFiles(path, ['a.txt'])` and assert `service.getConflicts(path)` still lists `b.txt`. The widget test for the order of the two **Accept** handlers is under X2.

Also seen, not in the log: `NConflict.sha` is "carried so the resolving commit can record the merged branch as its second parent" (`packages/git_nowa/test/merge_test.dart:101-102`), but nothing passes it on. The commit box calls `commit(message)` without it (`lib/project/panels/git_panel/git_commands.dart:57, 68`), so the commit after a resolved pull or merge has one parent. Not investigated further.

**Docs impact.** `docs/code/git.md`, section "Resolve conflicts": step 2 says "Repeat for each file. Nowa stages the resolved files." Once fixed, add that you can close the dialog and reopen it from **Conflicts**. Until then the page should tell readers to resolve every file in one pass and to check each file afterwards.

Related: X2.

### P30. Committing without a Git identity in a local project shows a raw libgit2 error, not the identity form

- **Area:** Git, commit and identity (`lib/project/panels/git_panel`, `packages/git_nowa`, `packages/core/lib/src/settings/git_settings.dart`)
- **Severity:** Medium — a local project whose repository and computer have no Git name and email can't commit, merge, pull with a merge, or use **Bring my changes**, and each failure shows a cryptic message. A workaround exists (gear, **Git**, **Identity**) and few people hit it.
- **Where:** desktop app; local projects (cloud projects do ask for the identity)
- **Status:** Present in 3.13.0 and dev (unchanged since 3.12.5)
- **Confidence:** Confirmed in code and with libgit2 — the bundled libgit2 1.9.1 (`git2dart_binaries` 1.10.3) refused `git_signature_default` on a repository with no identity and an empty home folder ("config value 'user.name' was not found", error class CONFIG) and accepted it once a global `.gitconfig` held one. `strings` on the Linux, macOS and Windows binaries finds no "failed to build signature from config". The app was not run.

**What happens.** Only cloud projects open the "You need to set your identity first" form. In a local project the commit fails with a red snackbar showing the raw library text, by the code `error: git_error_t.GIT_ERROR_CONFIG: config value 'user.name' was not found`. Nothing is committed and the form never opens.

New projects get your account's name and email at creation, so this hits repositories made with **Create Git Repository...**, imported folders and clones on a computer with no global Git identity.

**Steps to reproduce** (desktop app, on a computer with no `user.name` and `user.email` in `~/.gitconfig`; not clicked through in the app)
1. Import a folder without a `.git` folder as a local project.
2. Click **Git** in the left sidebar, then **Create Git Repository...**.
3. Type a **Commit message** and click **Commit All**.

Expected: the "You need to set your identity first" form with **Name**, **Email** and **Set Identity**, as in a cloud project.
Actual: a red snackbar with the raw message above, and no commit. Clicking the gear next to the branch name (**Git settings**) shows the same kind of snackbar before the **Identity** fields appear. Typing a **Name** and **Email** there and clicking **Set Identity** does fix it.

**Root cause.**
- `GitManager.commit` turns only a `DioException` with the cloud server's message into `IdentityRequiredException` (`packages/git_nowa/lib/src/git_manager.dart:491-509`). The local commit calls `repo.defaultSignature` (`packages/git_nowa/lib/src/local/local_git_service.dart:242-243`), which throws a `LibGit2Error`. That reaches the catch-all in `performAction`, which shows `e.toString()` (`lib/project/panels/git_panel/git_commands.dart:31-32`). `LibGit2Error.toString()` is `"error: $errorClass: $message"` (`git2dart_binaries-1.10.3/lib/src/error.dart`). The form opens only on `IdentityRequiredException` (`git_details.dart:633-647, 1357-1381`), and the **Commit** menu item offers its fix action only for that exact text (`git_details.dart:401-421`).
- `mergeBranch` and `pull` look for "failed to build signature from config" (`git_manager.dart:561, 610`), which this libgit2 never produces.
- Four places need a signature: commit (`local_git_service.dart:242-243`), **Bring my changes** (`:448`, it fails before the stash exists, so no edits are at risk), merge (`:537-538`) and the merge commit of a pull (`:1041-1042`). In the last two the merge is already applied when the signature fails, so the working folder is left merged and uncommitted (by code order).
- The **Identity** fields load through `getIdentity`, which throws when a key is missing (`local_git_service.dart:395-400`; git2dart's `Config[]` throws). `_loadSettings` shows that error as a snackbar (`packages/core/lib/src/settings/git_settings.dart:110-122`).
- **Create Git Repository...** sets no identity (`git_manager.dart:451-455`). Only `tryInitAndCommit`, for brand-new projects, does (`:209-227`, `lib/project/project_page.dart:322-333`).

**Suggested fix.**
1. In `LocalGitServiceImpl`, wrap `repo.defaultSignature` in one helper. When libgit2 reports the missing `user.name` or `user.email` (class CONFIG), throw `IdentityRequiredException`. Use it at the four places above (for the pull isolate at `:1041-1042`, send it back as an exception and map it in `GitManager.pull`). The existing handlers then open the form.
2. Make `getIdentity` return `null` when the keys are missing, so the Settings page opens without a snackbar.
3. Remove the dead "failed to build signature" checks.
4. Optional: have **Create Git Repository...** set the account's name and email, as `tryInitAndCommit` does.

Test: a developer machine has a global identity, so the test must point libgit2 at an empty config folder (for example `HOME` in the test process). Then assert that `service.commit(...)` on a fresh repository throws `IdentityRequiredException`. Existing identity tests: `packages/git_nowa/test/git_nowa_test.dart:98-120`.

**Docs impact.** `docs/code/git.md`, "Commit your changes", last paragraph ("A local project uses the identity in its repository or in Git on your computer, so set your identity if neither has one") and `docs/code/github.md#set-your-git-identity` (last sentence). Once fixed, say that local projects ask for the identity too.

Related: P27, R13.

### P39. Deep Links: saving URL Scheme updates only the iOS file, the Android manifest follows later, and enabling writes nothing

- **Area:** Deep Links settings (`packages/core/lib/src/interpreter/packages`)
- **Severity:** Medium — an app configured with only a **URL Scheme** is built for Android without the scheme's intent filter and without Flutter's deep-link switch-off, until some other change rewrites the manifest. Nothing says so; the workaround is known.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev (the code is unchanged since 3.12.5)
- **Confidence:** Reproduced live — W17 saw it in a running 3.12.5 web build (`app_links` added through `pubspec.yaml`, both files read after each save), and the 3.13.0 code is the same. "Enabling writes nothing" is code reading only: the **Enabled** switch needs pub.dev, which that run could not reach.

**What happens.**
- Turning **Enabled** on changes neither platform file.
- Saving **URL Scheme** rewrites `ios/Runner/Info.plist` (the URL type, and `FlutterDeepLinkingEnabled` set to false). `android/app/src/main/AndroidManifest.xml` gets nothing: no intent filter for the scheme and no `flutter_deeplinking_enabled` switch-off.
- The manifest gets all of it the next time anything rewrites it, for example saving **Host**, changing a permission or renaming the app.
- The reverse also holds: saving only **Host** rewrites only the manifest, so iOS does not get `FlutterDeepLinkingEnabled` set to false until something else rewrites `Info.plist`.

**Steps to reproduce**
1. Click the gear (**Settings**), then **Deep Links** under **Integrations**. Turn on **Enabled**.
2. Under **Configuration**, type `myapp` in **URL Scheme** and press Enter. A check mark confirms the save.
3. Click the `<>` button (code mode), open **Files**, and open `ios/Runner/Info.plist`, then `android/app/src/main/AndroidManifest.xml`. In the playground starter the iOS file does not exist until this first save.

Expected: both files carry the `myapp` scheme and the Flutter deep-link switch-off.
Actual: `Info.plist` has a `CFBundleURLTypes` entry for `myapp` and `FlutterDeepLinkingEnabled` set to false. The manifest has neither `flutter_deeplinking_enabled` nor a `myapp` intent filter.

4. Back on **Deep Links**, type `example.com` in **Host** and press Enter. Reopen the manifest: now it has the switch-off, the `myapp` filter and the App Links filter.

**Root cause.**
- Deep Links declares the key `urlScheme` twice, once for iOS and once for Android, plus two static switch-off tokens (`packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:17-42`).
- `PackageConfigService.onTokenChanged` takes the first token with that key, which is the iOS one, and rewrites only that token's file (`packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:68-71, 85-87`). The Android token with the same key is read only when the manifest is generated next (`_gatherFromPackageTokens`, `:218-239`; `lib/src/file_system/templates/android/manifest_template.dart:11-16`).
- Enabling runs `setupPackage` (`package_config_service.dart:111-144`): permissions, generated files, main statements, custom fields and the iOS Podfile. Deep Links has none of these, so nothing is written, although removing the package does rewrite every affected file (`:146-163`).
- Both platform files are replaced whole from their templates (`packages/core/lib/src/file_system/templates/file_template.dart:87-88`), which is why any later rewrite carries the missing entries.

**Suggested fix.**
1. In `onTokenChanged`, rewrite the template of every token with that key: `config.tokens.where((t) => t.key == tokenKey && t.applyTo != null)`, collect `applyTo!.templatePath` into a set, and call `writeTemplate` for each (`:85-87`).
2. In `setupPackage`, write the templates of the package's static tokens (`isStatic` with an `applyTo`), mirroring `cleanupPackage`, so enabling adds the switch-off.

Test: no test covers the templates today. Add `packages/core/test/package_config_test.dart`, modelled on `packages/core/test/dependencies_test.dart` (MockProject): put `app_links` in the pubspec, call `onTokenChanged(appLinksPackageConfig, 'urlScheme', 'myapp')`, then expect `myapp` in both `ios/Runner/Info.plist` and `android/app/src/main/AndroidManifest.xml`.

**Docs impact.** `docs/integrations/deep-links.md`: the **URL Scheme** row of the "What each field sets up" table ("as soon as you save it. The Android manifest ... the next time Nowa rewrites it"), the "Check the Android manifest" note with its "save any **Host** and clear it again" workaround, and "Nowa writes your settings into the iOS and Android project files" under "Turn on deep links". After the fix, delete the note and say both files are written on save.

Related: P40, P42, R17, M21.

### P40. Deep Links and Google Sign-In each write their own CFBundleURLTypes key, so Info.plist gets the key twice

- **Area:** Deep Links and Google Sign-In settings, iOS `Info.plist` (`packages/core/lib/src/interpreter/packages`, `packages/core/lib/src/file_system/templates/ios`)
- **Severity:** Medium — with both set up, one of the two URL type lists may be ignored on iOS. If it is Google's, Google sign-in cannot return to the app; if it is the Deep Links scheme, links do not open the app. What iOS does was not tested, and a hand-merged `Info.plist` does not last.
- **Where:** both; cloud and local projects (iOS only)
- **Status:** Present in 3.13.0 and dev (the code is unchanged since 3.12.5)
- **Confidence:** Confirmed in code — W17 saw the duplicate key in the generated file in a 3.12.5 web build; both writers and the join are unchanged in 3.13.0. The behaviour of iOS and Xcode with a repeated key was not tested.

**What happens.** The `Info.plist` Nowa generates holds `<key>CFBundleURLTypes</key>` once for the Deep Links **URL Scheme** and again for Google sign-in. A property-list dictionary has one value per key, so a parser keeps one of the two arrays (which one depends on the parser) and drops the other.

It happens when both are on:
- **Deep Links** has a **URL Scheme** saved, and
- Google sign-in writes a scheme: **Google Sign-In** has an **iOS Client ID** saved, or Firebase Authentication has the **Google** provider on (that installs `google_sign_in`, `packages/data/lib/src/firebase/auth/fb_auth_manager.dart:66-69`).

**Steps to reproduce** (not clicked through in the 3.13.0 app; the duplicate key was seen in 3.12.5)
1. Click the gear (**Settings**), then **Google Sign-In** under **Integrations**. Turn on **Enabled**. Type `123-abc.apps.googleusercontent.com` in **iOS Client ID** and press Enter.
2. Click **Deep Links**, turn on **Enabled**, type `myapp` in **URL Scheme** and press Enter.
3. Click the `<>` button (code mode), open **Files**, open `ios/Runner/Info.plist` and search for `CFBundleURLTypes`.

Expected: one `CFBundleURLTypes` array holding both `com.googleusercontent.apps.123-abc` and `myapp`.
Actual: the key appears twice in the top-level `<dict>`, once with each scheme.

**Root cause.** Each package contributes a finished text snippet that starts with the key:
- Deep Links writes `<key>CFBundleURLTypes</key><array><dict>…myapp…` (`packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:68-82`).
- Google Sign-In writes the same key from its computed token `_iosUrlScheme` (`google_sign_in_package_config.dart:20-25, 49-95`). It resolves the reversed client ID from `firebase.clientId` or the saved **iOS Client ID**, and adds the Firebase phone-auth scheme.
- `InfoPlistTemplate` joins all snippets without looking inside them (`packages/core/lib/src/file_system/templates/ios/info_plist_template.dart:11, 60`). Old projects can add a third copy through the legacy `firebaseAuth.infoPlist` snippets (`package_config_service.dart:348-359`).

Nowa replaces the whole file on every rewrite (`file_template.dart:87-88`; `docs/account/project-settings.md:73` says hand edits can be lost), so merging the two keys by hand in code mode lasts only until the next rewrite.

**Suggested fix.** Give the key one owner. `UIBackgroundModes` already works this way: every package lists its modes and Nowa writes one array (`package_config_service.dart:301-308, 362`).
- Add a `PlatformSection.iosUrlTypes`. Each package returns only its `<dict>…</dict>` URL type, and `InfoPlistTemplate` wraps all of them in one `<key>CFBundleURLTypes</key><array>…</array>`.
- Or merge in `InfoPlistTemplate.generate`: collect the snippets that start with the key and combine their `<dict>` entries.
- Include the legacy Firebase snippets in the merge.

Test: in the new `packages/core/test/package_config_test.dart` proposed under P39, set up both packages and count `<key>CFBundleURLTypes</key>` in the generated plist (expect 1, with both schemes inside).

**Docs impact.** `docs/integrations/deep-links.md`, "Things to know", third bullet (the Google Sign-In warning about two `CFBundleURLTypes` entries), and `docs/integrations/google-sign-in.md`, the sentence after the field table ("If you also set a **URL Scheme** under Deep links, check `Info.plist` as described there"). Remove both once the key is written once.

Related: P39, R17, M21.

### P41. The Google Maps key warning and the AdMob "No API Keys" panel exist only in the session where the package was added

- **Area:** Google Maps and AdMob, **Details** panel (`packages/core/lib/src/interpreter/packages`)
- **Severity:** Low — after a reload the hint that keys are missing is gone. The keys can still be set under **Settings**, and nothing else breaks.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev (the code is unchanged since 3.12.5)
- **Confidence:** Reproduced live for the missing half — W17 saw no warning after a reload in a running 3.12.5 web build (packages added through `pubspec.yaml`). That the warning does show in the session where the package is added comes from code reading; the **Enabled** switch needs pub.dev, which that run could not reach.

**What happens.** Select a Google Maps widget while no key is saved and **Details** shows a red note, "Google Maps API keys are not set. Please configure them in the project settings to use the Google Map widget.", with a gear button. An Admob Banner without App IDs shows "No API Keys" and an **AdMob setup** button. Both appear only if the package was added in the current session. Reload the page, or reopen the project in a new session, and **Details** shows the plain widget fields with no hint.

**Steps to reproduce**
1. Click the gear (**Settings**), then **Google Maps** under **Integrations**. Turn on **Enabled** and leave the three key fields empty.
2. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, search for **Google Maps** and press Enter to add the widget to a screen. Select it. **Details** shows the red note.
3. Reload the browser tab (desktop app: restart it and reopen the project). Select the same widget.

Expected: the note is still there, because there are still no keys.
Actual: the note is gone. The same happens to "No API Keys" on an **Admob Banner** after turning on **AdMob** the same way.

**Root cause.** Both hints are custom field builders keyed by the widget's type name: `customFields: {'GoogleMap': BFGoogleMap.new}` (`packages/core/lib/src/interpreter/packages/integrations/google_maps_package_config.dart:51, 78-116`) and `{'NowaAdBannerWidget': BFBannerAdMob.new}` (`admob_package_config.dart:19, 277-345`). **Details** looks them up in the static map `BlockField.allFields[type.name]` (`packages/core/lib/src/fields/block_field.dart:26, 887`).

The only code that adds them is `PackageConfigService.setupPackage` (`packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:128-131`). It runs through `PackageConfig.onPackageAdded` (`package_config.dart:200-204`) from `_importPackages`, that is, when a package is added (`packages/core/lib/src/interpreter/packages/package_service.dart:243-246`). Opening a project only imports the packages from the pubspec (`_resolvePackages`, `:93-127`). `loadAddedDependencies` says outright that it skips "the setup a package added in Nowa gets" (`:229-239`). The class comment promises "Reconcile packages on project load (add permissions, register fields)" (`package_config_service.dart:14`), but no such step exists (`packages/core/lib/src/plugin.dart:137-143` only creates the service).

**Suggested fix.** Register the fields whenever the package is loaded, not only when it is added. The simplest place is `PackageService.importPackageToNowa` after a successful import (`:295`), which runs for both paths: `if (package.config?.customFields case final f? when f.isNotEmpty) BlockField.allFields.addAll(f)`. Keep the removal in `cleanupPackage` (`package_config_service.dart:167-171`).
Watch out: `allFields` is static, so a field added for one project stays registered when another project is opened in the same session. Remove a project's fields in `CorePlugin.remove()` (`plugin.dart:169`), or the hint will appear in projects that never added the package.
Test: in `packages/core/test/dependencies_test.dart` style (MockProject), put `google_maps_flutter` in the pubspec, load the project and expect `BlockField.allFields.containsKey('GoogleMap')`.

**Docs impact.** `docs/integrations/google-maps.md`, "Add the map": "While no key is saved, **Details** can show ..." can become "shows". `docs/integrations/admob.md`, "Add a banner": "If **Details** shows 'No API Keys' ..." already reads correctly and needs no change.

Related: P49, R31.

### P42. The in-app Deep Links text promises myapp://path and iOS Universal Links, which the settings don't set up

- **Area:** Deep Links settings text (`packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart`)
- **Severity:** Medium — the page tells you what to expect, and two of its promises don't hold. A reader can ship an app whose Android scheme links or iOS web links never open it, and only learn that on a device.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev (the config is unchanged since 3.12.5)
- **Confidence:** Confirmed in code — the generated Android filter and the absence of any iOS associated-domains writer were read. How Android matches the host is Android's documented rule (W17 read it); no device was used.

**What happens.** The **Deep Links** page says "URL Scheme: Opens your app via links like myapp://path" and "App Links (Android) / Universal Links (iOS): Opens your app from https:// URLs on your domain."; the **URL Scheme** help says `"myapp" for myapp://path`. In fact:
- On Android the scheme is registered only together with the host `open.my.app`. `myapp://path` has the host `path`, so it does not open the app. `myapp://open.my.app/path` does.
- On iOS the scheme works as written (a URL type on the scheme alone).
- **Host** is Android-only (App Links). Nothing in Nowa writes the iOS associated-domains entitlement, so iOS Universal Links are not set up.

**Steps to reproduce**
1. Click the gear (**Settings**), then **Deep Links** under **Integrations**. Read the description under the title. Click the help icon next to **URL Scheme** and next to **Host**.
2. Turn on **Enabled**. Type `myapp` in **URL Scheme** and `example.com` in **Host**, pressing Enter after each.
3. Click the `<>` button (code mode), open **Files**, open `android/app/src/main/AndroidManifest.xml` and look at the `myapp` filter. Look in `ios/Runner/` for an entitlements file with `applinks:`.

Expected: `myapp://path` opens the app on both platforms, and https links on `example.com` open it on iOS (Universal Links) as well as Android.
Actual: the filter reads `<data android:scheme="myapp" android:host="open.my.app" />`, so only `myapp://open.my.app/...` matches on Android. No `applinks:` entry is written anywhere.

**Root cause.** The texts are in the config: the description (`app_links_package_config.dart:11-14`), the **URL Scheme** help (`:32`) and the **Host** help (`:47-50`). The Android scheme template hard-codes the host (`:91`). The iOS side has the URL type only (`:69-82`). A search of the 3.13.0 tree finds no `applinks` or `associated-domains` writer. The only entitlements code in the integrations is the Apple Pay one (`packages/core/lib/src/integrations/stripe/stripe_manager.dart:80, 115`). The settings header prints `config.description` as is (`packages/core/lib/src/interpreter/packages/package_config/package_config_settings.dart:94`).

**Suggested fix.**
- Smallest: change the three texts to what is configured. For example "URL Scheme: opens your app from links that start with `myapp://`. On Android the link needs the host `open.my.app`, such as `myapp://open.my.app/path`." and "Host: opens your app from https links on this domain, on Android only (App Links). iOS Universal Links need the Associated Domains capability, which Nowa does not set up."
- Better for the scheme: drop `android:host="open.my.app"` from the filter (`:91`), so `myapp://anything` matches. Android's rule is that a filter with a scheme and no host matches every host (not tested here), and links that use `open.my.app` keep working.
- Universal Links are a feature, not a text fix: write `com.apple.developer.associated-domains` with `applinks:<host>` into `ios/Runner/Runner.entitlements`, merging with what the Apple Pay code writes, and the person still has to host the `apple-app-site-association` file.

Test: in the new `packages/core/test/package_config_test.dart` proposed under P39, after saving **URL Scheme** assert the manifest filter has no `android:host` (if the filter is changed).

**Docs impact.** `docs/integrations/deep-links.md`: the first two bullets under "Things to know" (the `open.my.app` host, and **Host** not setting up Universal Links) and the **URL Scheme** table row. With the text-only fix they stay as they are. If the filter changes, remove the `open.my.app` bullet and the host mention in the table. If Universal Links are added, rewrite the second bullet.

Related: P39, R17.

### P43. Google Sign-In keeps showing "Managed by Firebase" after the Google provider is removed in Firebase

- **Area:** Google Sign-In settings and Firebase Authentication (`packages/core/lib/src/interpreter/packages/integrations`, `packages/data/lib/src/firebase/auth`)
- **Severity:** Medium — the page says Firebase manages Google sign-in when it no longer does, and it hides the **Enabled** switch and the client ID fields, so standalone Google sign-in (for example with Supabase) can't be turned on in that project. Workarounds exist but are heavy.
- **Where:** both; cloud and local projects (needs a Firebase connection)
- **Status:** Present in 3.13.0 and dev (these files are unchanged since 3.12.5)
- **Confidence:** Code reading only, not run — the row was never clicked through (it needs a Firebase account). The store, the reader and the one place that clears the value were all read.

**What happens.** After you switch the **Google** provider off under Firebase Authentication, **Settings** → **Google Sign-In** still shows the **Managed by Firebase** panel ("Google Sign-In is configured through Firebase Authentication. To modify settings, go to Firebase settings.") with **Open Firebase Settings**. The normal page, with its **Enabled** switch and **iOS Client ID** and **Web Client ID** fields, does not come back.

**Steps to reproduce** (not run; needs a Firebase project with Google sign-in turned on)
1. Click the gear (**Settings**), then **Firebase** under **Integrations**, and connect your project. Turn **Authentication** on. Click **Add Provider** (or **Manage Providers**) and click **Google**. Its icon shows a check mark.
2. Open **Google Sign-In** under **Integrations**. It shows **Managed by Firebase**, as it should.
3. Go back to **Firebase**, click **Manage Providers** and click **Google** again. The check mark turns into a plus: the provider, `signInWithGoogle` and the `google_sign_in` package are removed.
4. Open **Google Sign-In** again.

Expected: the normal page with **Enabled** and **Configuration**.
Actual: **Managed by Firebase** again, with no **Enabled** switch.

Turning the **Authentication** switch off, or disabling Google in the Firebase console and not refreshing, ends the same way.

**Root cause.**
- The page shows the panel while `firebase.clientId` in `.nowa/settings.json` is non-empty (`packages/core/lib/src/interpreter/packages/integrations/google_sign_in_package_config.dart:46, 97-109`). A custom panel replaces the whole page, switch included (`packages/core/lib/src/interpreter/packages/package_config/package_config_settings.dart:33-38`).
- `clientId` is written once, by `createSetup`, from the `CLIENT_ID` in the downloaded `GoogleService-Info.plist` (`packages/data/lib/src/firebase/firebase_manager.dart:88-96`).
- `disconnectGoogleAuth` removes the package and the function and regenerates `Info.plist`, but never clears the id (`packages/data/lib/src/firebase/auth/fb_auth_manager.dart:135-140`; `disconnectAuth` calls it, `:121-133`). Only **Disconnect Project** drops the whole `firebase` section (`firebase_manager.dart:158-172`).
- `connectGoogleAuth` uses the stale id as a cache and skips the lookup (`fb_auth_manager.dart:57-64`).

**Ways out today.** Disable Google in the Firebase console, then click **Refresh/Update apps and config files** in the Firebase settings (`packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:45-52, 96`): the new plist has no `CLIENT_ID`, so the id is cleared. Or disconnect the Firebase project. The file `.nowa/settings.json` can't be edited in the **Files** tree, which hides dot folders.

**Suggested fix.** In `disconnectGoogleAuth`, set `fbSettingsModel.clientId = null` and write the model back, as `createSetup` does (`settingsJsonFile.json['firebase'] = fbSettingsModel.toJson(); settingsJsonFile.setDirty()`, `firebase_manager.dart:95-96`). Put that in a small `FBManager.saveSettings()`. Then `connectGoogleAuth` looks the id up again next time (`:57-64`).
Watch out: `connectPhoneAuth` and `disconnectPhoneAuth` also change only the in-memory model (`fb_auth_manager.dart:81, 150`), while the plist code reads `phoneAuthEnabled` from the saved JSON (`google_sign_in_package_config.dart:63`). The same save fixes that gap.
Test: a widget test of `PackageConfigSettings(googleSignInPackageConfig)` with a settings file that has no `firebase.clientId` must show **Enabled**. Add a Firebase auth test under `packages/data/test/firebase/` that calls `disconnectGoogleAuth` and checks the saved JSON.

**Docs impact.** `docs/integrations/google-sign-in.md`, section "When Firebase manages Google sign-in", and `docs/integrations/index.md` (the line "If Firebase handles Google sign-in, the **Google Sign-In** page shows **Managed by Firebase** instead"). Once fixed, say the panel goes away when you remove the Google provider.

Related: P33.

### P46. The generated RevenuecatService has no restore-purchases call, and the paywall may not offer one

- **Area:** RevenueCat integration (`packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart`)
- **Severity:** Medium — an iOS app that sells subscriptions or one-time unlocks needs a way to restore them (App Review Guideline 3.1.1), and Nowa generates none and says nothing about it. Apple can reject the app, or a user on a new phone can't get their purchase back. The workaround is a few lines of your own code.
- **Where:** both; cloud and local projects (matters for iOS)
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code and in the package sources. `purchases_ui_flutter` and `purchases_flutter` are not in `~/.pub-cache`, so I downloaded the 9.12.0 archives (and 10.15.2 of `purchases_flutter`) from pub.dev into a scratch folder and read them, plus RevenueCat's public docs. The app was not run.

**What happens.** The `RevenuecatService` class that Nowa writes when you turn RevenueCat on has `configureRevenuecat`, `fetchOfferings` and `purchasePackage`, and nothing to restore purchases. The **RevenueCat Paywall** widget is added as `PaywallView()` with no arguments.

**Does the paywall widget show its own restore button?** Not by itself.
- `PaywallView` in `purchases_ui_flutter` is a thin Dart wrapper around a native view (`UiKitView` on iOS, an Android platform view on Android; `lib/views/paywall_view.dart` in 9.12.0). It draws no button. It has `onRestoreCompleted` and `onRestoreError` callbacks ("Callback that gets called when a restore is completed. Note that this may get called even if no entitlements have been granted"), which forward events from the native paywall (`lib/views/paywall_view_method_handler.dart`). So the native paywall can run a restore.
- Whether it shows a restore button depends on the paywall you design in the RevenueCat dashboard. In the current editor, **Restore Purchases** is an action you give a **Button** component (RevenueCat docs, "Components"), and the docs' launch audit lists "a missing restore purchases link" as something to check ("Creating Paywalls"). So a paywall can ship without one. The older template paywalls mention "Restore purchases" as one of their components (docs, "Creating Paywalls (Legacy)", localization note); I could not confirm from the docs that it is always shown.
- RevenueCat's own advice is that "all apps have some way for users to trigger the restorePurchases method" ("Restoring Purchases"), and that it be called from a user action, not at start-up.

Apple's text is Guideline 3.1.1: "you should make sure you have a restore mechanism for any restorable in-app purchases" (checked in `reviews/P9-store-review.md:51`).

**Steps to reproduce**
1. Click the gear (**Settings**), then **RevenueCat** under **Integrations**, and turn on **Enabled**. (See X3 for the version problem before relying on this step.)
2. Click the `<>` button (code mode), open **Files** and open `lib/integrations/revenuecat_service.dart`.

Expected: a restore method next to the other three, or a documented way to restore.
Actual: only `configureRevenuecat`, `fetchOfferings` and `purchasePackage`.

**Root cause.** The template has the three methods and no restore (`revenuecat_package_config.dart:72-115`). It is written once, when the package is added (`GenerationTrigger.onPackageAdd`, `:57-63`), so projects that already have the file never receive new methods. The paywall is added bare (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:944`). Nothing in Nowa mentions restoring: a search for `restorePurchases` finds no match.

**Suggested fix.**
1. Add a method in the style of `fetchOfferings`:
   ```dart
   ///Restore Purchases
   Future<CustomerInfo?> restorePurchases() async {
     try {
       return await Purchases.restorePurchases();
     } catch (e) {
       return null;
     }
   }
   ```
   `static Future<CustomerInfo> restorePurchases()` exists in `purchases_flutter-9.12.0/lib/purchases_flutter.dart:649` and `purchases_flutter-10.15.2/lib/purchases_flutter.dart:724`.
2. Existing projects keep the old file. Either add the method in a one-time migration when it is missing, or say in the docs how to add it (or to ask Nowa AI).
3. Tell builders to put a **Restore purchases** button on a settings screen (or in the paywall design) that calls it. The call must come from a tap, never from `main()`.

Test: a template test in `packages/core/test/` that the generated text contains `restorePurchases`.

**Docs impact.** `docs/integrations/revenuecat.md`: add a `restorePurchases()` row to the table in "Call RevenueCat from logic", and in "Add the paywall" say that a restore button on the paywall comes from its design in RevenueCat. `docs/publish/ios.md`, "Payments" bullet under store rules: the restore sentence was removed because the docs could not help meet it (`reviews/P9-store-review.md:144`). Put it back, with a link to the RevenueCat page, once the call exists.

Related: R21, X3.

### P51. RevenueCat Paywall: Add Missing Dependencies never finishes, and the widget is then refused with "Bad state"

- **Area:** RevenueCat Paywall widget, package analysis (`packages/core/lib/src/dependency_system`, `packages/core/lib/src/interpreter/packages`)
- **Severity:** High — the headline RevenueCat widget can't be placed in a cloud-style project. The dialog can't be closed while it waits, and after adding the packages by hand the board refuses the widget. A workaround exists only in code mode.
- **Where:** web app (seen in the signed-out playground); by the code also the desktop app; cloud projects (local projects analyse on the machine first and are the least likely to hit it). Not playground-only, see below.
- **Status:** Present in 3.13.0 and dev (seen live on 3.13.0; none of the code involved differs in dev). The package analysis runs on a server that is not in this repo, so a server-side change would not show in the code.
- **Confidence:** Reproduced live — the capture agent saw both symptoms in the 3.13.0 playground (`_rewrite/captures/ui-diffs-3.13.md`, RevenueCat row). The causes are code reading plus the package sources from pub.dev. Nobody has looked at the server's answer.

Correction: "the analyzer answers Bad state ... PaywallView" is not the analyzer's message. It is the editor's own `StateError` (`packages/core/lib/src/interpreter/widget/designer_model.dart:126-131`), raised because the analysis data for `PaywallView` has no Widget parent.

**What happens.** Adding **RevenueCat Paywall** opens **Add Missing Dependencies**, listing `purchases_flutter` and `purchases_ui_flutter` (both `^9.12.0`). **Add** turns to "Adding..." and stays there (over 3 minutes in the capture); **Cancel** is disabled, so the dialog can't be closed. When both packages are put into `pubspec.yaml` by hand and the page is reloaded, adding the widget fails with the status-bar message `Bad state: The target expression should be a widget, but "const PaywallView()" is a "PaywallView"`, and the widget does not appear.

**Steps to reproduce** (3.13.0 playground, signed out)
1. Open `https://app.nowa.dev/playground`.
2. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, type `RevenueCat Paywall` and press Enter.
3. **Add Missing Dependencies** opens ("This widget requires the following dependencies"). Click **Add**.

Expected: both packages install in a few seconds, the dialog closes and the placeholder card "RevenueCat Paywall" appears on the board.
Actual: the button shows "Adding..." for minutes, and **Cancel** does nothing.

Second route: instead of step 3, click **Cancel**, open code mode, add `purchases_flutter: ^9.12.0` and `purchases_ui_flutter: ^9.12.0` to `pubspec.yaml`, save, reload, and add the widget again. The status bar shows the "Bad state" message.

**Root cause.** Two separate problems.

1. The dialog has no way out.
   - `MissingDependencyDialog._onFix` sets `_saving = true`, awaits `fixAllDependencies()` and only then closes (`packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:30-39`). There is no timeout and no `try`/`finally`, and **Cancel** is disabled while `_saving` is true (`:87`).
   - `fixAllDependencies` installs the packages one after the other (`dependency_helper.dart:35-40`). Each install waits for the package analysis (`package_service.dart:136-144, 303`) because neither RevenueCat package ships a bundled Nowa library. Google Maps, AdMob and Firebase do, so they never wait (`revenuecat_package_config.dart:12-65` and `dart_package.dart:188` have no `libraries:`).
   - Cloud-style projects, the playground included, send that analysis to a Cloud Run service (`packages/core/lib/src/interpreter/packages/package_resolver_service.dart:21-33`; chosen at `packages/core/lib/src/providers/project_provider.dart:233`). The client allows 300 s to connect and 300 s to receive (`packages/core/lib/src/services/nowa_client.dart:6-18`); in a browser Dio's XHR timeout is their sum, 10 minutes (`dio_web_adapter-2.1.1/lib/src/adapter_impl.dart:59-64`). Local projects try the machine first and use the service only if that fails (`.../packages/local/package_resolver_service_local.dart:101-135`).

2. The widget is refused because `PaywallView` arrives without a Widget parent.
   - `DesignerModel.raw` accepts only a type that is a subclass of Widget (`designer_model.dart:126-131`). Parents come from `superclassRef` in the analysis data (`packages/core/lib/src/interpreter/packages/package_resolver_models.dart:154-157`), and the analyzer leaves the key out when the chain is empty (`.../packages/local/json_library_parser_base.dart:287-308`). The capture reports that the service's answer for `purchases_ui_flutter` has no superclass and that its types read `InvalidType`, which is what unresolved imports produce.
   - Likely reason, not verified: the package's own `pubspec.yaml` has `dependency_overrides: purchases_flutter: path: ../` (`purchases_ui_flutter-9.12.0/pubspec.yaml:22-24`; the same in 9.0.0, 9.16.2 and 10.15.2). `PaywallView` extends Flutter's `StatelessWidget` (`lib/views/paywall_view.dart`). Pub honours overrides of a root package. If the service runs `pub get` inside the downloaded package, that path does not exist there, resolution fails and every `package:` import is unresolved. The repo's own test expects this service to resolve a Flutter widget package normally (`packages/core/test/interpreter_tests/interface_extraction_test.dart:136-142`, `extra_alignments`), so the fault looks specific to this package. To check: request `/analyze/purchases_ui_flutter/9.12.0?includePrivate=true` (the URL built at `package_resolver_service.dart:29-33`) and read `PaywallView`'s `superclassRef`. I did not call the service.

**Is it playground-only?** Nothing in the path is specific to the playground. It was seen there because the capture ran there. Signed-in cloud projects use the same service. A local project runs `flutter pub get` and the real analyzer on the computer first, so the override does not matter there. It falls back to the service when that fails (`package_resolver_service_local.dart:130-134`). Not run for cloud or local projects.

**Suggested fix.**
1. Bundle a Nowa library for `purchases_ui_flutter` (`PaywallView`) and the few `purchases_flutter` types it needs, the way Google Maps, AdMob and Firebase are bundled (`packages/library_generator/lib/src/libraries.dart` lists the generated ones, for example `googleMapsFlutterLibrary`). Then add `libraries:` at `dart_package.dart:188` and `revenuecat_package_config.dart:12`. The install skips the network (`package_service.dart:303`), the dialog finishes at once, and `PaywallView` is a Widget from the start.
2. Fix the dialog whatever the cause: `try`/`finally` around `_onFix` that resets `_saving` and shows the error, a **Cancel** that stays enabled, and a timeout of about 30 seconds for one package.
3. Service owner: make the analyzer ignore a package's own `dependency_overrides`, for example by analysing inside a scratch project that depends on the package.

Test: a widget test of the dialog with a fake `PackageService` whose `registerPackage` stalls or throws (**Cancel** must still work), and a library test that `PaywallView` is a Widget subclass once bundled.

**Docs impact.** `docs/integrations/revenuecat.md`, "Add the paywall", steps 2 and 3 ("If Nowa shows **Add Missing Dependencies**, click **Add**" and the placeholder card): they describe what should happen and are right once the paywall is bundled. Until then they do not match the web app. `docs/integrations/index.md` ("Maps, ads and paywalls come with widgets ...") and `docs/reference/widgets/index.md` ("Nine widgets need a Flutter package ...") make the same promise.

Related: R23, R33, X3.
