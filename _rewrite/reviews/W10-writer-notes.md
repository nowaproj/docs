# W10 writer notes (Work with code: local projects, VS Code, import, Git, GitHub)

Code refs are relative to `/home/user/nowa-master` (v3.12.5). Research: `research/features-account-projects.md`
(New project dialog, Import project, Project Sync, Project not found, Delete behavior, Desktop app) and
`research/features-code-ship.md` (Hybrid approach, Git, Clone from GitHub, Project Sync).

General: none of the five pages has an "Or ask Nowa AI" tip. The agent's tool list (`features-ai.md` "What the
agent can do") has no Git, import, project-sync or VS Code tool, so there is no task here the agent can do.

## docs/code/local-projects.md

Key claims and where they come from:
- **Desktop app + plan gate**: `lib/router.dart:76-82` (non-web builds need the `desktop` entitlement, else `/upgrade`),
  `lib/upgrade_page.dart:25-28` (text "Upgrade to unlock desktop version, or use on web at app.nowa.dev"). Plan not named
  beyond "a plan that includes it" (D3); which plans include it is not in the code.
- **Create a local project**: `lib/dashboard/create_new_project/new_project_dialog.dart:133` (Project name), `:213` (Path
  errors), `:230-238` (Flutter SDK not found / Setup flutter SDK), `:248-262` (Advanced section, web notice), `:281-286`
  (footer help, Create project); `lib/dashboard/create_new_project/creation_dialog_widgets.dart:92`, `:129` (Advanced,
  Local-only project, PRIVATE tag, "Stored only on this device. No Cloud Build or backups.").
- **Folder name = package name; dashboard shows what you typed**: `packages/core/lib/src/services/local_project_service.dart:22-27`
  (friendlyName = typed name, name = generatePackageName), `packages/core/lib/flutter_tool.dart:96-99` (`flutter create <package name>`
  run in the chosen path), `packages/core/lib/src/file_system/naming.dart:193-217`, `lib/dashboard/dashboard_mapper.dart:56`
  (title = friendlyName). Starter app written by `projects_view_provider.dart:80-84`, `:273-276`.
- **On this device** (Personal only, desktop only): `packages/nowa_ui/lib/dashboard/projects_view.dart:466-534` (labels, LOCAL-ONLY, caption),
  `packages/core/lib/src/providers/projects_view_provider.dart:64-65` (`selectedWorkspace == null`, macOS/Windows/Linux), `:162`.
  Local project list and sync links are stored in app preferences on this computer: `local_project_service.dart:62-69`,
  `packages/core/lib/src/services/project_link_service.dart:27-33`, `packages/core/lib/src/services/shared_preferences_services.dart:3-10`.
- **Project menu**: `packages/nowa_ui/lib/dashboard/projects_grid.dart:291-331` (Open in safe mode, Move to workspace..., Upload to cloud,
  Remove from list, Delete), `lib/dashboard/dashboard_mapper.dart:66-68` (canUploadToCloud / canUnlist = isLocal).
- **Cloud-only features not available on local projects**: `lib/project/run/deploy_button.dart:21` (Deploy hidden),
  `packages/core/lib/src/settings/project_sync_settings.dart:482-551` (SyncNotice: "<feature> is not available on local projects" + Sync to cloud;
  used for Cloud build and Share preview, `packages/core/lib/src/settings/cloud_build/cloud_build_common.dart:18`,
  `packages/designer/lib/src/play_mode/play_mode.dart:53`), `packages/core/lib/src/settings/sharing_settings.dart:31` (Public project cloud only),
  `lib/dashboard/dashboard_mapper.dart:65` (Move to workspace cloud only), `lib/project/download_code_button.dart:26-37` (code download vs Open in VS Code).
  **View in folder** local only: `lib/project/panels/files_panel/file_context_menu.dart:75-81`.
- **Import project steps (short version)**: `packages/nowa_ui/lib/dashboard/projects_view.dart:324-336` (menu: New project, Clone from GitHub,
  Import project only `NPlatform.isDesktop`), `lib/dashboard/create_new_project/import_project_dialog.dart` (see import.md notes).
- **Project Sync**: `packages/core/lib/src/settings/project_sync_settings.dart` (:59 header text; :215-262 linked UI with the link icon tooltip "Unlink Project" at :234;
  :330 "Current", :339 "Open Project", :364 "Sync from Cloud/Local"; :376-440 Sync Warning / "Proceed with Sync"; :443-480 Unlink dialog;
  :553-720 clone widget: descriptions, "Path", "Select Workspace" at :693, "Clone to Local/Cloud" at :716), the first dropdown entry is
  `Workspace(id: null, name: 'Cloud Projects')`, which means no workspace (`project_sync_settings.dart:594`, `packages/core/lib/src/providers/project_sync_provider.dart:43-47` (canClone), `:61-67` (setWorkspaces)),
  `project_sync_provider.dart:75-100`, `:124-180` (clone and sync = create bundle, write bundle), `lib/dashboard/projects_view/sync_project_dialog.dart:55-70` (dashboard dialog
  "Clone Project" / "Project Sync", **Close**), `lib/dashboard/dashboard_page.dart:158-165` (Upload to cloud).
  Which card to click: the card's own project is the destination and the label names the source
  (`project_sync_settings.dart:215-250`, `:364`).
- **Unlink**: `project_sync_settings.dart:443-480` ("This action cannot be reversed. You can link the project again by cloning the ... project again."),
  link icon tooltip "Unlink Project" at `:234`. Unlinking only removes the stored link (`project_link_service.dart:52-58`); both projects stay.
- **Project not found**: `lib/project/missing_project_folder.dart:84-125` (labels), `local_project_service.dart:113-160` (suggestions = folders next to the old
  one with the same package name; picked folder needs `pubspec.yaml`), `:103-108`.
- **Remove from list vs Delete** (the high-stakes part):
  - `lib/dashboard/dashboard_page.dart:166-167` (unlist = no confirmation; delete opens dialog), `:253-303` (`_removeProject`: dialog texts, `scoped = project.isInGitRepo`).
  - `packages/core/lib/src/providers/projects_view_provider.dart:95-113` (removeProject deletes local files then removes the link; unListProject only removes entry + link),
    `:278-289` (`_removeLocalProjectFiles` returns early only when `project.isInGitRepo`).
  - `packages/core/lib/src/file_system/nfile_impl.dart:666-668` and `packages/core/lib/src/services/local_file_service.dart:94-98`
    (`Directory(path).delete(recursive: true)`, a permanent delete, no Trash). The "not moved to Trash/Recycle Bin" wording is my reading of `dart:io` `Directory.delete`; not tested in the app.
  - `packages/core/lib/src/models/project.dart:185-192` (`isInGitRepo` = `_repoPath != null`), `local_project_service.dart:88`
    (`gitRoot` is stored only when the git root differs from the workspace root, i.e. is above it). So the exception is exactly "imported from inside a larger repository".
  - Local-only clone: `lib/dashboard/create_new_project/start_project_provider.dart:80-95` goes through `addProject(repo.workDir)`, so the clone's folder is the repo root and Delete erases it.
    Same for any import of a repo's root folder. Projects created with **New project** never have a git root recorded, so Delete erases them too.
  - Delete also removes the Project Sync link record (`projects_view_provider.dart:103`); the cloud copy is not touched.

Left out / assumptions:
- Linux: the code supports local projects on Linux (`projects_view_provider.dart:64-65`) but there is no Linux download in 3.12.5, so the page says "desktop app" only.
- "Nowa remembers your local projects on this computer only" is derived from the stored-in-preferences code above plus the research line in `features-account-projects.md` "On this device".
- The New project dialog sends no workspace and the **Personal**-only rule for local projects: not stated beyond "choose Personal to see them".
- RECENTS, grid/list toggle on **On this device**, and the Welcome tour are left to `../account/projects.md` (W11).
- Two capture requests (`code-local-projects-1`, `-2`), both desktop-only.

Open questions:
1. Delete erases an imported/cloned repo's folder whenever the project's folder is the repository root (research open question "Deleting imported local projects"). Documented as the code behaves; the product may want a different rule.
2. Does Project Sync overwrite also remove files that exist only in the destination? `writeBundle` only writes files from the source (`local_file_service.dart:101-114`); the cloud side (`NetworkFileService`) was not read. The page says "overwrites the files in the destination" and does not promise either way.

## docs/code/vs-code.md

Title keeps "Hybrid approach" in the H1 and the keywords, as pages.md asks. The in-app UI never uses that name; older docs and What's New
(`docs/new/whats-new.md`, "Hybrid Approach" entries) do, so the intro says "Earlier docs and release notes call this the Hybrid approach".

Key claims and where they come from:
- **Open in VS Code (code mode)**: `lib/project/panels/vibe_designer.dart:62` (local project: `CodeModeActions`, cloud: `CodeButton`), `lib/project/download_code_button.dart:40-56`
  (icon button, tooltip "Open in VS Code"; active file if it is a Dart file, else `lib/main.dart` of the active package), `:25-34` (cloud: "Code download").
  Sits before the preview toggle (`vibe_designer.dart:62-66`, `:100-106` tooltips "Show preview" / "Hide preview"). The `<>` code-mode button has no tooltip (research `features-code-ship.md` "Code mode"), so the page says "code icon (`<>`)".
- **What it runs**: `packages/core/lib/src/runner/vscode.dart:22-31` (`<VS code Path>/code . -g <relative file>` in the project folder);
  fallback to Nowa's own text tab when it fails: `packages/core/lib/src/file_system/actions/edit_code_io.dart:5-16`.
- **Other entry points**: details panel button of a text tab `packages/core/lib/src/widgets/code_editor/code_editor_details.dart:39-47`;
  **View in folder** (local only, opens the folder via `launchUrl(Uri.file(...))`) `lib/project/panels/files_panel/file_context_menu.dart:49` (view-only menu) and `:77`.
- **VS code Path**: `packages/core/lib/src/settings/editor_settings/local_setup.dart:226` (label), defaults `packages/core/lib/src/runner/vscode.dart:8-20`
  (macOS `/usr/local/bin`, Windows `C:\Program Files\Microsoft VS Code\bin`; Linux `/usr/share/code` left out because there is no Linux download).
  Reached from dashboard sidebar **Settings** (`packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:205-211`) or the top-bar avatar menu **General Settings**
  (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:673`); tabs **Local Setup** / **Git** under "Editor Settings"
  (`packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:19-35`, `:145-157`).
  The VS Code launcher link (https://code.visualstudio.com/docs/editor/command-line) is third-party knowledge, not from the code; verify the URL still exists.
- **What syncs and when**:
  - Nowa to disk on save: `packages/core/lib/src/project/saving_service.dart:62-80` (`save` flushes code-mode buffers first), `packages/core/lib/src/widgets/code_editor/code_buffer_service.dart:3-9`, `:58-66`.
    Autosave default on, every 20 s, choices 10/20/30 s, 1 min, 5 min: `saving_service.dart:9`, `:15-16`; popup `lib/widgets/save_options_popup.dart:14-91`;
    status-bar icon tooltip "Save options (Ctrl S to save)" `lib/status_bar.dart:130`. The page names **Auto save** / **Save every** but not the numbers.
  - Disk to Nowa: `packages/core/lib/src/services/local_file_service.dart:119-130` (recursive watch), `:145-168` (300 ms batching), `:170-240` (re-import of loaded files;
    `isBulkChange` > 10 events relinks the project at `:209`, `:232`), `:254-278` (new files; files under `lib/` or `boards/` load at once).
    Ignored: `packages/core/lib/src/services/file_service.dart:234-252` (`.git/`, `build/`, `**.DS_Store`).
  - Conflict banner: `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:261-268` ("This file changed while you were editing it", **Keep mine**, **Reload**).
  - Git panel refresh on outside changes: comment at `packages/git_nowa/lib/src/git_manager.dart:272-274`.
  - Saving hot reloads a running device app: `saving_service.dart:110-111` (comment).
- **What to expect from your code**: `docs/interpreter_limitations.md` "Nowa edits your files" (in `nowa-master`), research `features-code-ship.md` "Code and design sync" (`packages/core/lib/src/project/code_style_service.dart:12-35` for the `analysis_options.yaml` page width).

Left out / assumptions:
- The old "requires a Premium plan" claim is not repeated: the code only gates the desktop app (`lib/router.dart:76-82`). The page links to the desktop app page instead.
- Android Studio / IntelliJ are only named in keywords; the code has no integration for them (only VS Code), and `local-project-simulator/othertools.md` says "any IDE" without a mechanism. The folder-watching works with any editor, but the page only documents the VS Code button.
- "Nowa notices a moment later" = the 300 ms batch window; the exact number is not given in the page.
- One capture request (`code-vs-code-1`), desktop only.

Open questions:
1. Does `code` resolve on Windows with the default path `C:\Program Files\Microsoft VS Code\bin` (the path is joined with `p.posix.join`, giving a mixed-separator path to `code`)? Not tested.
2. Does Nowa pick up changes made in an editor to files in a monorepo package that is not the active package? Watchers are per modelled package (comment at `local_file_service.dart:14-16`); not verified.

## docs/code/import.md

Key claims and where they come from:
- **Split button menu** (New project / Clone from GitHub / Import project, the last only on desktop): `packages/nowa_ui/lib/dashboard/projects_view.dart:324-336`
  (`NPlatform.isDesktop` = macOS/Windows/Linux, `packages/nowa_runtime/lib/src/nowa_platform.dart:21`). Clone from GitHub has no platform gate except the **Local-only** checkbox (`github_clone_dialog.dart:289-303`).
- **Import project dialog**: `lib/dashboard/create_new_project/import_project_dialog.dart:159-185` (Project folder, Browse via `PathField`, Package to open), `:48-50` (`_mustBeLocal` = monorepo or git root above the folder),
  `:106-125` (error "Choose a project folder first."), `:242-258` (locked Local-only card and the three footer texts), `:220-230` (workspace chip only for cloud imports);
  `packages/core/lib/src/fields/path_field.dart:117`, `:133` (Enter / click away completes the path, **Browse** button).
- **Import behavior**: `lib/dashboard/create_new_project/start_project_provider.dart:26-56` (local-only -> `addProject`, cloud -> `_importToCloud` uploads a bundle), `packages/core/lib/src/services/local_project_service.dart:73-108`
  (`addProject` registers the workspace root, opens in place; `checkIfValidProject` throws "Chosen folder is not a nowa project or a flutter project" without `pubspec.yaml`).
  Bundle skips `.git/`, `build/`, `**.DS_Store`, `.dart_tool/`, `.idea/`, `.nowa/temp/`: `packages/core/lib/src/services/local_file_service.dart:11`, `:346-362`, `packages/core/lib/src/services/file_service.dart:234-252`.
  A cloud import is not opened as a "new project", so no repository or "Initial commit" is created: `lib/project/project_page.dart:322-333`, import dialog `router.go('/project/${project.id}')` at `import_project_dialog.dart:128`.
  The "keeps history if local-only" statement follows from the folder being opened in place (`.git/` untouched).
- **Clone from GitHub**: `lib/dashboard/create_new_project/github_clone_dialog.dart:91-140` (flow, errors, Fix actions), `:199-212` (Project name, Cloning timer), `:261-262` (title/subtitle), `:289-318` (Local-only checkbox desktop only, Cancel, Clone project);
  `packages/core/lib/src/settings/github_integration_settings.dart:225` (list renders nothing until GitHub is connected), `:263`, `:297` (Search repositories, Manage link);
  `lib/dashboard/dashboard_page.dart:305-312` and `start_project_provider.dart:58-66` (entitlement check, `PaymentDialog` "Time to level up", `packages/core/lib/src/widgets/nowa_dialogs.dart:112`);
  clone folder `<Default Projects Path>/<repo name>`: `packages/git_nowa/lib/src/local/local_git_service.dart:125-131`; **Project name** only renames the Nowa project (`github_clone_dialog.dart:122-126`, `setFriendlyName`);
  error texts `packages/git_nowa/lib/src/git_service.dart:109-124`; Fix buttons open Local Setup / Git settings (`github_clone_dialog.dart:96`, `:165`).
- **Monorepo**: `packages/core/lib/src/project/owned/package_scan.dart:9`, `:145-155`, `:168-240` (workspace members from the root `pubspec.yaml` `workspace:` list, else subfolders of `packages/` and `apps/`; walks up to the outermost workspace root; `suggested` order picked -> has boards -> root),
  `lib/dashboard/create_new_project/package_picker.dart:99-102` (hints), `:107-158` (post-clone **Open** dialog and its text), `lib/project/owned_package_chip.dart:10-45` (chip tooltip "Package being edited", saves and reopens),
  `lib/project/top_bar.dart:158-161` (chip only with 2+ packages). Git covers the whole repo: What's New 3.12.0 (`docs/new/whats-new.md:113`) and research `features-code-ship.md` "Git panel".
- **What to expect on the board**: empty board `lib/project/project_page.dart:556-563` (`boards/first.board` created if missing), Widgets panel **Page** / **Component** and drag to board (`features-designer-core.md` "Widgets panel", "Adding things to a board");
  interpretation and placeholders `/home/user/nowa-master/docs/interpreter_limitations.md`, research `features-code-ship.md` "Your own code on the board"; `.nowa` folder: `packages/core/lib/src/project/settings_service.dart:23-37`,
  `packages/core/lib/src/file_system/templates/common/gitignore_template.dart:13-16` (`temp/` and `thumbnail.png`); rewrite rules: `docs/interpreter_limitations.md` "Nowa edits your files" and research "Code and design sync";
  FlutterFlow: `docs/new/whats-new.md:40` (3.12.5). Old docs `local-project-simulator/openexisting.md` warning about Riverpod not showing in Circuit is not repeated (not confirmed in code).

Left out / assumptions:
- `No pubspec.yaml here — Nowa can browse and edit the files, but not design them.` (`import_project_dialog.dart:181`) is not quoted: the import then fails at `checkIfValidProject`, so the promise is not kept (research open question). The page only documents the error.
- "Imported ... Nowa doesn't copy it" for local-only is from research ("Local imports open the folder in place") plus `addProject` (no copy).
- The "Git history" row was dropped from the comparison table because cloud clone behavior (`cloneToCloud`) runs on the server and was not verified.
- Old tutorials' claims about "Importer V2" (What's New) are not repeated.
- Two capture requests (`code-import-1` desktop only, `code-import-2` needs sign-in, GitHub and a Git plan).

Open questions:
1. Can a folder without `pubspec.yaml` ever be imported? (See above: the warning suggests yes, the code says no.)
2. Cloud import of a folder whose package is inside a workspace but not a monorepo root: unreachable, because workspaces force local-only. Not documented.
3. After a cloud import the Git panel offers **Create Git Repository...** (no `.git` is uploaded); the page implies this only through "starts without Git history".

## docs/code/git.md

Key claims and where they come from (all in `lib/project/panels/git_panel/git_details.dart` unless noted; research `features-code-ship.md` Git sections):
- **Plan gate** (D3: named as the UI names it, no plan names): `git_details.dart:19-59` (`EntitlementConsumer` with `EntitlementKeys.github`, message "Your plan does not support git integration"),
  `packages/core/lib/src/billing/widgets/entitlement_consumer.dart:48-95` (lock icon, message, **Upgrade** button when purchase UI is shown). Same message in the Git settings pages (`packages/core/lib/src/settings/git_settings.dart:38-42`, `:546-550`).
  Clone from GitHub shows **Time to level up** instead (see import.md notes). Git sidebar item missing in the playground/sandbox: `lib/project/side_bar.dart:55-61`.
- **Where Git runs**: `packages/git_nowa/lib/src/git_manager.dart:112-114` (service = `UnsupportedLocalGitServiceImpl` when sandboxed, else `findGitService(isLocal)`), `packages/git_nowa/lib/src/network_git_service.dart:50-62` (cloud calls Nowa's server API),
  `packages/git_nowa/lib/src/local/local_git_service.dart:30-33` (local, libgit2).
- **Open the panel**: sidebar item + badge `lib/project/side_bar.dart:55-61`, `:437-455`; status bar branch click `lib/status_bar.dart:49-112` (sets side panel to "Git").
  New projects: Initial commit `lib/project/project_page.dart:322-333`, `git_manager.dart:209-227`; **Create Git Repository...** `git_details.dart:321-366`. I dropped "new repositories start on `main`" because it is only true for local repositories (`local_git_service.dart:31`); the cloud server decides.
- **Commit**: commit box `git_details.dart:668-750` (hint "Commit message" / "Nothing to commit", button text logic at :704-712), `lib/project/panels/git_panel/git_commands.dart:8-70` (commit all vs staged vs sync; empty message error "Please enter a commit message."),
  "Committed successfully." `packages/git_nowa/lib/src/git_manager.dart:491-499`; lists and hover tooltips `git_details.dart:472-666` (Staged Changes / Changes / Conflicts; **Stage Changes**, **Unstage Changes**, **Stage file**, **Unstage file**, **Discard file changes**, **Discard all changes**);
  **...** menu (Push, Pull, Add Files..., Commit, Manage Remotes) `:368-470`; **Create Commit** dialog (Not Added / Added, `>>`, `<<`, Select All, Commit) `:1245-1442`; Add Files popup `:1496-1600`.
  Identity prompt "You need to set your identity first" `:1444-1468` (shown by `CommitBox.action`, `:680-702`); new projects get the account name/email at `git_manager.dart:209-227`.
- **Diff and discard**: `packages/core/lib/src/editors/git_editor/git_diff_editor.dart:136-215`, `:300-360` ("Previous change" / "Next change", "Staged" / "Unstaged" badge); discard dialog `git_commands.dart:72-88` and `git_details.dart:1135-1188` (title "Are you sure?", **Cancel** / **Continue**). I did not quote the dialog's text (it has the typo "uncommited").
- **Sync / Push / Pull / Publish Branch**: `git_commands.dart:12-47` (`performAction`: pull then push, "Sync complete", `NoRemoteException` opens Manage Remotes), `git_details.dart:704-714` (**Publish Branch** only when the checked-out branch is local and has no upstream),
  `:379-405` (Push / Pull in the menu), `:1470-1494` ("You need to provide authentication for this action"), `git_manager.dart:271-281` (fetch at most every 5 minutes; refresh/pull/push fetch now),
  pull conflicts open the dialog (`git_details.dart:398-404`).
- **Branches**: `git_details.dart:150-243` (checkout/migrate/create/merge/delete flow), `:752-933` (list: star, **Local** / **Remote** headings only when both exist, **New Branch**, hover tooltips **Merge into current branch** / **Delete branch**; the current branch has neither; remote-only branches have Merge but not Delete),
  dialogs `:935-1133` ("Switch branch?", "Your local changes conflict with <branch>.", **Bring my changes**; "Merge branch?" / **Merge**; delete text "This won't delete the upstream remote branch, only the local branch" / **Delete Branch**; **Branch Name**, **Create Branch**, spaces replaced by `-`);
  `git_manager.dart:546-566` (`mergeBranch` refuses when the working tree has changes; message at `packages/git_nowa/lib/src/git_service.dart:94-102`), `:828-845` (`checkoutBranch` saves the project first, `migrate: true` brings changes).
  What's New 3.12.5 (`docs/new/whats-new.md:29-30`) describes the switch-without-committing behavior.
- **Resolve Conflicts**: `git_details.dart:1831-1994` (title "Resolve Conflicts - <path>", **Local** / **Remote** read-only panes, **Accept Local** / **Accept Remote**, resolved file is written, saved and staged, then next file), reopen via **Conflicts** section tooltips "Resolve conflict" / "Resolve all Conflicts" `:543-570`, `:633-650`.
  Whole-file choice only: the dialog writes the chosen pane's full text (`_acceptChanges`, `:1860-1868`).
- **Commit History**: `lib/project/panels/git_panel/git_commit_history_panel.dart:78-114` ("Commit History", "Refresh Commits"), `:286-325` (details, **Pushed** / **Not Pushed**), `lib/project/panels/git_panel/git_commit_context_menu.dart:21-47`
  (**Copy SHA**; **Undo Commit** only for the last commit, not pushed, with a parent; **Revert Commit** for any commit with a parent; both hidden for view-only users),
  `lib/project/panels/git_panel/git_commit_actions.dart:13-86` (dialogs and result snackbars), `git_manager.dart:806-825` (both return silently when there are local changes).
- **Cloud and local project workflow section**: composed from verified pieces (Manage Remotes create-and-push `git_manager.dart:847-864`; Clone from GitHub cloud/local `start_project_provider.dart:58-110`). It replaces the old `git/intro-git.md` "all repositories in sync" idea,
  and is where `https://docs.nowa.dev/git/intro-git` (opened by the "To sync with git see documentation" link in `packages/core/lib/src/settings/project_sync_settings.dart:539`) should land.

Left out / assumptions:
- Search branches (dev only), commit counts per page (50), "Open file" in the diff header, file-status colors (old docs claim green/blue/red; not confirmed), status bar tooltips ("Branch is ahead by n commits").
- The panel's keyboard shortcut (Ctrl/Cmd + 5) is not stated: tooltips and shortcuts can disagree when panels are hidden (`features-editor-shell.md` open questions).
- "Nowa saves your open edits first" on a branch switch: `git_manager.dart:828-831` (`gProject.save()`).
- Git in a monorepo covers the whole repository (stated on import.md, not repeated here).
- One warning admonition (discard). No "Or ask Nowa AI" tip (no Git tools in the agent).
- Two capture requests (`code-git-1`, `code-git-2`), both need sign-in plus a plan with Git integration.

Open questions:
1. Revert/Undo Commit silently do nothing with uncommitted changes yet may still show the success snackbar (research open question). The page tells readers to commit or discard first and says "do nothing".
2. The "authentication required" popup embeds **Legacy Remote Credentials** (cloud credentials form) even in local projects (`git_details.dart:1470-1494`). Not documented; may need a product check.
3. Cloud-project default branch name after **Create Git Repository...** is decided by the server; not stated.

## docs/code/github.md
(pending)
