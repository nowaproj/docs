# W11 writer notes (Projects and account, Troubleshooting index)

Writer: W11 (Sonnet). Source of truth: `/home/user/nowa-master` (v3.12.5). Paths below are relative to that repo.
Research read: `features-account-projects.md` (all), `features-editor-shell.md` (Support, Notifications, Settings,
View only, Experimental flags), `features-ai.md` (usage and credits), `features-code-ship.md` (Permissions, App
details, Run/Deploy messages). Spot-checked the code for every label quoted below (dashboard sidebar, projects view,
project menu, workspace dialogs, Account Settings, Billing/Usage/Buy credits, support dialog, Project Details,
Sharing, Permissions, Constants).

Conventions I followed: `.md` files are MDX in this site, so no raw `<...>` or `{...}` in prose (placeholders are
rewritten or put in code). Headings I link to from other pages have explicit ids. No prices, credit amounts or
limits (D3).

## Corrections to the research (code wins)

- **Experimental flag defaults**: research says both flags default off. Code: a project's `.nowa/settings.json`
  template writes `'experimental': {'load_packages': true}` (`packages/core/lib/src/file_system/templates/common/nowa_settings_template.dart:17`),
  so **load packages** is on in projects created or imported in Nowa; **New UX** is off (`settings_service.dart:46-47`
  getters default false only when the key is missing). Docs say "on in new projects, off for New UX".
- **App Settings integrations**: research (account) lists "Nowa Mobile Ads", "App Links"; the UI labels are **AdMob**
  and **Deep Links** (`admob_package_config.dart:15`, `app_links_package_config.dart:10`) plus **Firebase**
  (`firebase_plugin.dart:127`); matches the reference screenshot `captures/ui-map/15-settings.png`.
- **Sharing is a section, not a settings page**: it sits at the bottom of **Project Details**
  (`project_detail_settings.dart:86-92`). Glossary row "Project settings" lists it as a page; fix when the glossary is built.
- **Support chat "Enter sends"** (editor-shell research): not supported by the code I read. The message field is a
  multi-line `TextField` (`support_dialog.dart:395-405`, `minLines: 2, maxLines: 10`); only `onSubmitted` is set, which
  does not fire on Enter for multi-line fields. Docs say "click the send button".
- **RECENTS**: built from the projects already loaded for the selected workspace plus local projects
  (`dashboard_mapper.dart:72-82`, `projects_view_provider.dart:140-165`), so it is "up to five recently edited
  projects of the current view", not a global list. Docs say "up to five projects you edited most recently".

## docs/account/projects.md

Key claims and code refs:
- Dashboard sidebar and **Projects** header labels: `packages/nowa_ui/lib/dashboard/projects_view.dart:171-264` (title, **Search...** hint
  `nowa_widgets.dart:298`, **Sort by** `:395`, grid/list toggle, **New project** / compact **New**, menu entries **New project**, **Clone from GitHub**,
  **Import project** gated by `NPlatform.isDesktop`), **Load More** `:538-554`, "No projects found" / "Try a different search term." `:158-174`.
- Project menu entries and which projects get them: `projects_grid.dart:289-331` (flags `canMoveToWorkspace` cloud, `canUploadToCloud` / `canUnlist` local:
  `lib/dashboard/dashboard_mapper.dart:66-68`). Delete dialog: `lib/dashboard/dashboard_page.dart:253-303` ("This action cannot be reversed." / **Delete Project**;
  git-repo exception "The files stay on disk." / **Remove**). Folder erased: `projects_view_provider.dart:278-289` -> `NFileSystemRoot.removeProject()`
  ("CAUTION: this is not undoable", `nfile_impl.dart:664-668`). **Remove from list** has no confirmation (`dashboard_page.dart:156`).
- **Move to...** dialog, **Move** button: `lib/dashboard/projects_view/move_project_dialog.dart:31-65`.
- **Project not found** screen buttons: `lib/project/missing_project_folder.dart:75-129`.
- New project dialog: `lib/dashboard/create_new_project/new_project_dialog.dart:33-316` (**Project name**, **Advanced**, **Local-only project**,
  web notice, **Create project**; request carries no workspace, `:84`, `project_service.dart:103-105` + `project.dart:223`). So "no workspace, appears under Personal" is
  inferred from the client (server could in theory default otherwise): **open question for the verifier**.
- Name rules and messages: `packages/core/lib/src/file_system/naming.dart:176-190`; package name rule `:192-217` (verified for local projects `local_project_service.dart:25-28`
  and cloud import `start_project_provider.dart:39-41`; for brand-new cloud projects the server decides, so the table scopes the rule to "local projects and imports");
  default bundle id `:241-255`.
- Clone/import summary and plan gate: `start_project_provider.dart:58-70` (`PaymentDialog.show(... feature: 'git')` = **Time to level up**, `nowa_dialogs.dart:93-120`);
  workspace chips `github_clone_dialog.dart:215-226`, import dialog per research.
- RECENTS up to five: `dashboard_mapper.dart:7,72-82`. Remembered workspace and sort: `projects_view_provider.dart:253-262`.

Left out / why:
- Grid vs list defaults, folder-name subtitle on cards, "Edited" label formats other than one example: too detailed.
- Dashboard debug buttons, "Learn how Nowa works" cards, Marketplace: not user-facing (research "Not user-facing").
- Import dialog details (package picker, forced local-only for monorepos): left to `code/import.md` (W10).

Assumptions / open questions:
- "Clone from GitHub needs a plan that includes it": code gates on the `github` entitlement; plan names not stated (D3).
- Page is about 850 words.
