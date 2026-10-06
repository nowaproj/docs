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
(pending)
