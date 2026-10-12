# P14-B15 notes: Work with code (`docs/code/`)

Reader: the secondary reader (people who also work with code, not necessarily Flutter or Git experts). Code stays.
Main job: coverage of the old Git, GitHub, hybrid and local-project pages (`P14-B15-coverage.md`), plus R9 tone and
one-clause explanations of Flutter and Git terms where they first appear on each page.

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Web sources were fetched on 2026-10-12
through the session proxy (WebFetch could not resolve hosts, so `curl` was used); they are listed under "Sources".

## Sources (official pages behind the third-party steps)

| Ref | URL | Used for |
|---|---|---|
| GH-PAT | https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens | Fine-grained token click path and fields (profile picture → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token; Token name, Expiration, Description, Resource owner, Repository access, Only select repositories, Permissions, Generate token); GitHub recommends fine-grained tokens; fine-grained gaps (can't contribute to repositories where you're an outside or repository collaborator); classic token path (Tokens (classic) → Generate new token (classic), Note, Expiration, select `repo`); organization approval leaves a token pending; `contents` permission with read/write; "Push access to repositories" template = `contents=write`; tokens are like passwords; username not used to authenticate |
| GH-LEARN | https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely | UI wording of the token form: "Repository permissions" in the "Permissions" section, a dropdown with "Read and write", "Generate token" (confirm again if prompted) |
| GH-EXP | https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation | An expired or revoked token can't be used or restored; create a new one |
| GH-APP | https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party | GitHub App install: pick account, **All repositories** or **Only select repositories**, review, **Install** (or a request for organizations) |
| GH-APPMOD | https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps | Change an installed app's repositories: **Repository access**, then **Save** |
| GH-EMAIL | https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address | GitHub links commits to your account by their email; add the email to your GitHub account; earlier commits keep the old email |
| GH-NEWREPO | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository | **+** → **New repository**, **Owner**, name rules (≤100 characters, ASCII letters, digits, `.`, `-`, `_`), visibility, don't add README/.gitignore/license when importing existing code (merge conflict), **Create repository** |
| GH-LOCAL | https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github | "Quick Setup page": copy the remote repository URL; "To avoid errors, do not initialize the new repository with README, license, or gitignore files" |
| GH-COLLAB | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository | Repository → **Settings** → "Access" → **Collaborators** → **Add people** → pick the person → **Add NAME to REPOSITORY**; they accept by email |
| GH-PR | https://docs.github.com/en/pull-requests/reference/pull-requests | Pull requests start review and discussion before changes are merged (shared repository model) |
| GH-BRANCH | https://docs.github.com/en/pull-requests/how-tos/commit-changes/managing-branches-within-your-repository | Delete a branch on GitHub: branch menu → **View all branches** → delete icon next to it |
| GH-GIT | https://docs.github.com/en/get-started/using-git/about-git | Definitions: version control, repository, commit (snapshot), branch (line of development), staging, merge, pull, push, clone; "Do not initialize the repository with a README, .gitignore or License file" |
| GH-CONFLICT | https://docs.github.com/en/pull-requests/reference/merge-conflicts | A conflict is when Git can't safely choose which version to keep |
| DART-DEPS | https://dart.dev/tools/pub/dependencies | Caret versions (`^version` = versions guaranteed to be backwards compatible); dev dependencies (only for tests and examples, not `lib`) |
| DART-GET | https://dart.dev/tools/pub/cmd/pub-get | `pub get` gets the dependencies listed in `pubspec.yaml` |
| FLUTTER-DEPLOY | https://docs.flutter.dev/deployment | Build and release a Flutter app yourself (Android, iOS, web, desktop) |
| FLUTTER-HOTRELOAD | https://docs.flutter.dev/tools/hot-reload | Hot reload rebuilds the widget tree and preserves the app state |

## Per page

(Appended page by page below.)

### github.md (Connect GitHub)

For the reader:
- Intro now says what GitHub and a repository are, and why you'd keep your app there (backup, sharing, opening it elsewhere). "Remote", "push", "pull" and "access token" are explained in a clause where they first appear.
- Connect steps say what happens in the browser and how to change the repositories later (**Manage** → **Repository access** → **Save**).
- "Create or connect a repository" split into H3s (Let Nowa create the repository / Connect a repository you already have / Check or remove the connection), same anchor `#connect-a-repository`. Images stay with their paragraphs.
- Identity: why it exists, that it's only a label, use your GitHub email to get commits attributed, new identity applies to new commits.
- Token section rebuilt as a verified walk-through (old `git/token-github.md` had one): create a fine-grained token step by step, the classic-token case for collaborators, the organization-approval case, then add it to Nowa.
- Two new rows in "Fix connection problems": a repository missing from the list; a token that stopped working (expired).
- Next steps carry a short reason each.

Claims added or changed, with evidence:
- GitHub opens in the browser: `packages/git_nowa/lib/src/github_oauth/github_oauth_manager.dart:16-35` (`launchUrl(... externalApplication)`).
- Repository choice on GitHub (**All repositories** / **Only select repositories**): GH-APP. Written conditionally ("If GitHub asks"), because the URL Nowa opens comes from Nowa's server (`github_oauth_service.dart:17-23`). Nowa's side is a GitHub App installation: `github_oauth_models.dart:1-32` (`installationId`, `repositoryCount`, `manageUrl`), "Resource not accessible by integration" (`github_oauth_service.dart:66-68`).
- **Manage** opens GitHub to change repositories: `packages/core/lib/src/settings/github_integration_settings.dart:133-145` (opens `installation.manageUrl`); the **Repository access** → **Save** labels are GH-APPMOD's page for an installed app. See open question Q1.
- Only allowed repositories appear in Nowa's lists: list = `manager.getRepositories()` (`github_integration_settings.dart:191-197`); app access limited to chosen repositories (GH-APP).
- Public repositories visible to anyone: https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories ("Public repositories are accessible to everyone on the internet"). Nowa's own helper text for **Private**: `lib/project/panels/git_panel/git_remote_details.dart:370-371`.
- `origin` is the remote Nowa adds: `git_remote_details.dart:262` (`addRemote("origin", ...)`), create path `packages/git_nowa/lib/src/git_manager.dart:847-864`.
- **Manage your connected repositories** link: `github_integration_settings.dart:284-306`.
- Empty repository steps on GitHub (+ → New repository, Owner, name, visibility, no README/.gitignore/license, Create repository, Quick Setup page has the address): GH-NEWREPO, GH-LOCAL, GH-GIT. Needed because without GitHub Integration **Create GitHub Repository** shows **Connect GitHub** instead of the form (`git_remote_details.dart:70-82`), so token users must create the repository on GitHub.
- Identity is a label; GitHub attributes commits by email; earlier commits keep the old email: GH-EMAIL. New projects take the account's name and email: `git_manager.dart:218`.
- Token walk-through: GH-PAT (click path, fields, Resource owner, Only select repositories, Generate token, fine-grained gaps, classic path with Note/Expiration/repo, org approval), GH-LEARN ("Repository permissions", "Read and write", confirm Generate token again), GH-EXP (expired tokens can't be restored), GH-PAT "Push access to repositories" template = `contents=write`.
- Username field takes your GitHub username: `packages/core/lib/src/settings/git_settings.dart:479` (hint "Username"); GH-PAT says the username is required but the token authenticates.
- Other Git hosts: **Repository URL** validator accepts any http/https URL (`git_remote_details.dart:229-240`); credentials are plain username/password, not tied to a host (`packages/git_nowa/lib/src/models/git_credentials.dart:36-58`); while GitHub is connected its token is used for every HTTPS remote (`packages/git_nowa/lib/src/local/local_git_service.dart:288-296,310-315`; cloud: "legacy remote credentials are not used", `git_settings.dart:318-324`). Open question Q2 (not tried against another host).
- Same token under **External Local Credentials**: `packages/core/lib/src/settings/local_git_settings.dart:6-121` (same `GitCredentialsPopup`, `isLocal: true`).

### git.md (Use Git)

For the reader:
- Intro now gives the why (history, going back, safe experiments, backup, teamwork), from old `git/intro-git.md`.
- New "Git in a minute" table: repository, commit, stage, remote, push and pull, branch, merge, conflict, each in a line (B15 batch note). "Access token" is explained where it first appears on this page (Sync section) and in `github.md`.
- "Before you start" points to the cloud/local section, because the app's "*To sync with git see documentation" link (`packages/core/lib/src/settings/project_sync_settings.dart:510-527`, `https://docs.nowa.dev/git/intro-git` → `/code/git`) lands at the top of this page.
- Commit: why commit, what the A/M/D/R letters and colors mean, "a commit stays in your project until you push it", commit-often tip, why stage.
- Sync: what it does in one line; commits appear on GitHub with your identity.
- Branches: what a branch is and when to use one (one per feature or fix), the board shows the branch you're on, how to delete the GitHub copy, switching in other tools for local projects.
- New section "Work with a team" (old intro-git team section, git-local tips, git-operations-cloud example): why Git for teams (workspaces have no live co-editing), invite collaborators on GitHub, each teammate connects GitHub and clones, branch per person, sync before you start, pull requests, conflicts.
- Cloud/local section: names the common three-copy setup (cloud for Deploy, local for VS Code and simulators, GitHub in the middle), from old intro-git "Best practice".

Claims added or changed, with evidence:
- New projects get a repository, the account identity and "Initial commit": `lib/project/project_page.dart:321-333`; `packages/git_nowa/lib/src/git_manager.dart:209-227`.
- **Create Git Repository...** only initialises (no commit), so every file is under **Changes**: `lib/project/panels/git_panel/git_details.dart:291-319` (`InitRepoView` → `gitManager.initRepo()`), `git_manager.dart:451-463`.
- Status letters and colors in the Git panel: `packages/core/lib/src/file_system/widgets/files_widgets.dart:83-104` (color + letter per row), `packages/git_nowa/lib/src/git_widgets.dart:6-14` (modified `infoLog`, deleted `errorColor`, new `accentColor`, renamed grey), `packages/git_nowa/lib/src/models/git_models.dart:198-205` (C, M, D, A, R); colors `packages/nowa_ui/lib/src/globals/nowa_colors.dart:26,33,36` (green `0xff81E785`, red `0xFFFF6B6B`, blue `0xFF6891DF`), same in the light theme (`packages/nowa_ui/lib/src/globals/themes.dart:155-170` overrides none of them).
- Board and AI edits change files, which Git lists: every visual edit is written to Dart files (`docs/code/index.md#how-code-and-design-stay-in-sync`); Git status reads the working tree (`git_manager.dart` `updateState`).
- Switching a branch reimports the changed files, so the board shows that branch: `git_manager.dart:643-651,828-845`.
- Delete a branch on GitHub (**View all branches**, delete icon): GH-BRANCH.
- Switching outside Nowa (local) is picked up by the folder watcher: `packages/core/lib/src/services/local_file_service.dart:123-142,237-255`; `git checkout branch-name` is GH-GIT's example.
- Workspaces have no live co-editing: `docs/account/workspaces.md#how-workspaces-work` (verified page, B03).
- Collaborator invitation steps: GH-COLLAB. Pull request definition: GH-PR. Merge in Nowa: existing table row (`git_details.dart:935-1133`).
- Definitions: GH-GIT (repository, commit, staging, branch, merge, pull, push), GH-CONFLICT.

Length: ~2,265 words including two long image alt texts (about 2,150 without them). If it grows, split "Work with a team" and "Move work between a cloud and a local project" into a new page "Git workflows for teams and two copies" under Local projects and Git, and leave a two-line pointer here.

### import.md (Import an existing Flutter project)

For the reader:
- Intro reassures that the code stays theirs and only visually changed parts are rewritten (matches `index.md#how-code-and-design-stay-in-sync`).
- One-clause explanations: Flutter SDK, `pubspec.yaml`, monorepo (with an example).
- "Choose how to bring it in" gets a one-line rule of thumb.
- Clone from GitHub: the new project stays connected to the repository (old `git/clone-from-cloud.md`).
- What to expect: packages decide what the board can draw (old `local-project-simulator/openexisting.md` warning); global state is `provider`-based, so Riverpod or Bloc state doesn't show under **GLOBALS** (old openexisting Riverpod example).
- Next steps carry a reason each.

Claims added or changed, with evidence:
- Clone keeps the repository as its remote, with history and branches: local clone is a libgit2 clone (`packages/git_nowa/lib/src/local/local_git_service.dart:125-131`), cloud clone `lib/dashboard/create_new_project/start_project_provider.dart:97-105`; Git clone semantics (GH-GIT: "The clone includes all the project's files, history, and branches"). Remote branches are listed in the branch menu (`git.md`, `lib/project/panels/git_panel/git_details.dart:227-240`).
- Packages without built-in support show placeholders but run in **Run**: `docs/code/packages.md#how-nowa-loads-your-packages` (verified page); built-in libraries in `packages/core/lib/src/interpreter/libraries/` (no Riverpod or Bloc library).
- **GLOBALS** lists only `provider` global states: `packages/core/lib/src/state_management/global_state_suggestions.dart:65-75` (`service.providerClasses`), `packages/core/lib/src/project/env_services/global_state_service.dart:22-35` (Provider widgets at the app root, `NotifierClassDecl` only), `packages/core/lib/src/state_management/provider_blocks.dart:5-16` (`ChangeNotifier` supertype). Circuit category name **GLOBALS**: `packages/core/lib/src/interpreter/suggestion.dart:479`, shown upper-case (`packages/core/lib/src/fields/link_menu.dart:331`).

### local-projects.md (Work with local projects)

For the reader:
- One-clause explanations: Flutter SDK, `pubspec.yaml`.
- "What you give up": the message a local project shows for cloud-only features and the **Sync to cloud** button; you can also publish yourself with Flutter's tools (old `local-project-simulator/sync.md`: "for local projects you have to do the deployment manually").
- Project Sync: a concrete example of when to use it, desktop-only (old sync.md warning), and a pointer to Git when both copies change.
- Sync warning made concrete: the wrong direction replaces newer work with the older copy (old sync.md warning).
- Unlink: the "linked the wrong project" case (old sync.md) and the **Remove link** button when the linked copy can't load.
- Next steps carry a reason each.

Claims added or changed, with evidence:
- "Cloud build is not available on local projects" + **Sync to cloud**: `packages/core/lib/src/settings/project_sync_settings.dart:464-505` (`SyncNotice`), `packages/core/lib/src/settings/cloud_build/cloud_build_common.dart:6-18` (featureName 'Cloud build'); Share preview: `packages/designer/lib/src/play_mode/play_mode.dart:53`. Already documented in `publish/index.md` and `test/share.md`.
- Publish yourself with Flutter: a local project is a normal Flutter project (this page's intro); FLUTTER-DEPLOY.
- Project Sync only in the desktop app: `packages/core/lib/src/settings/project_settings.dart:29` (`if (!kIsWeb) const ProjectSyncSettings()`).
- The original stays unchanged after cloning: `project_sync_settings.dart:556-560` ("Your original cloud project will remain unchanged and a link will be created between both projects", and the local-to-cloud twin).
- Sync overwrites the destination: Sync Warning text (`project_sync_settings.dart:394-427`); the sync writes the source bundle over the destination (`packages/core/lib/src/providers/project_sync_provider.dart:159-178`). Not claimed: that files only in the destination are deleted (not confirmable for cloud destinations).
- Unlink dialog and **Remove link**: `project_sync_settings.dart:180-191` (`_handleUnlink`), `:200-209` (error state with "Failed to load linked projects: <error>" and **Remove link**), `:433-460` (`UnlinkProjectDialog`). Old docs' follow-up "sync with the other project?" question doesn't exist in 3.13 (`_handleUnlink` only deletes the link and refreshes).

### vs-code.md (Use Nowa with VS Code)

For the reader:
- Intro adds the old hybrid page's point that you never copy files and can switch between visual building and coding at any stage.
- One-clause explanations: the `code` command, hot reload (what you see on the device).
- New paragraph: any editor works on the folder (Android Studio, IntelliJ), from old `hybrid-approach/intro-hybrid-approach.md` and `local-project-simulator/othertools.md`.
- Git: GitHub Desktop and the terminal share the same repository (old `git/git-local.md`, `git/token-github.md` info box); AI coding assistants in your editor edit the same files (old intro-hybrid "Use AI-powered coding tools in your IDE").
- Next steps reordered with a reason each.

Claims added or changed, with evidence:
- Nowa watches the folder, whatever tool writes to it: `packages/core/lib/src/services/local_file_service.dart:123-142,195-214,237-255`.
- Nowa runs the `code` command: `packages/core/lib/src/runner/vscode.dart:30-58`.
- Hot reload keeps the app's state: FLUTTER-HOTRELOAD. Saving hot reloads a local device run: `docs/test/run.md`, `docs/test/devices.md` (verified pages).
- Other Git tools on the same repository: a local project's Git panel opens the repository in the folder (`packages/git_nowa/lib/src/local/local_git_service.dart`), and reloads on outside changes (`packages/git_nowa/lib/src/git_manager.dart:314` `onFilesChangedFromOutside`).

### custom-code.md (Write your own code)

For the reader:
- Intro explains widget, function and class in a clause each, and sets expectations (the board draws most code, **Run** runs all of it), replacing the old "without a limitation".
- `lib/` explained; code can live in its own file or next to Nowa's code (old `hybrid-approach/custom-code.md`).
- Functions table row: **PACKAGE:** category for top-level functions, **LOCALS** for functions inside a screen or component (old custom-code "Locals"), fill in parameters.
- Classes table row: types for variables, parameters and return values; objects via **GENERAL** → **Create...** (old custom-code "Create" node).
- New section "Ideas for your own code" (old `hybrid-approach/intro-hybrid-approach.md` practical examples: map widget, geolocator distance function, `Product` class with `formattedPrice`), with what the board shows for each.
- `@CustomFunction` on methods inside classes, including Nowa's screens (3.13 version of the old "use @CustomFunction inside a Nowa-generated class").
- Next steps carry a reason each.

Claims added or changed, with evidence:
- Circuit categories: **PACKAGE:**/library categories first, **LOCALS** for the enclosing widget class's members, **GENERAL** with **Create...**: `packages/core/lib/src/interpreter/suggestion.dart:462-516` (`libraryCategories`, `Locals`, `General` with `ConstructorSuggestion`), `:168-179` (`Create...`), `:588-600` (`LocalSuggestionsFinder` → `widgetSuggestions(klass)`); names shown upper-case (`packages/core/lib/src/fields/link_menu.dart:331`); `docs/logic/circuit.md` table (**PACKAGE:**, **LOCALS**, **GENERAL**), `docs/logic/actions.md` "Create objects".
- **Create...** lists your classes (non-widget classes with constructors): `suggestion.dart:725-737` (`ConstructorSuggestions.typeFilter`); the node reads "Create <Class>": `packages/code/lib/src/providers/expr_helper.dart:13-16`.
- Package widgets and functions without built-in support: placeholder / stand-in on the board, real in **Run**: `docs/code/packages.md#how-nowa-loads-your-packages`, `docs/code/limitations.md` (verified pages); no `flutter_map` or `geolocator` library in `packages/core/lib/src/interpreter/libraries/`.
- `@CustomFunction` on a method: `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1099-1101` (method with the annotation → `CustomMemberVisitor`), `:2171-2178` (`CustomMethodDecl` built without `preview`), `packages/core/lib/src/interpreter/declaration_hybrid.dart:28-50` (`customInvoke`: logs "calling: <name>", returns a mock), `:124-140`. Methods without the annotation are read normally (`ast_to_block_visitor.dart:1104-1129`).
- `Product` example: plain Dart (string interpolation, `toStringAsFixed`); classes and methods run on the board (`docs/code/limitations.md` lists what doesn't).

### index.md (Nowa and your Flutter code)

For the reader:
- Intro explains Flutter and Dart in a clause each and says up front that touching the code is optional.
- "What's in your project": framed as the map of a Flutter project; `pubspec.yaml` (settings file, packages from pub.dev, assets, fonts) and platform folders explained; `@NowaGenerated` described as a tag on the declaration.
- "In this section" table: new row for [What Nowa adds to your code](generated-code.md), the one edit allowed about that page.

Claims added or changed, with evidence:
- Flutter and Dart: https://flutter.dev ("an open source framework by Google for building ... multi-platform applications from a single codebase"); https://dart.dev.
- `pubspec.yaml` holds the name, packages, assets and fonts: `docs/code/packages.md`, `docs/design/assets.md` (verified pages); DART-GET.
- Platform folders are what Flutter builds each platform from: FLUTTER-DEPLOY (per-platform build and release).

### packages.md (Add packages)

For the reader:
- Intro says why packages help and explains `pubspec.yaml` in a clause.
- The five starter packages each get a few words on what they're for.
- One-clause explanations: caret versions, `flutter pub get`, Git and path packages, `sdk:` packages, `dev_dependencies`.
- Next steps carry a reason each.

Claims added or changed, with evidence:
- What the starter packages do in a Nowa project: `provider` for global state (`packages/core/lib/src/project/env_services/global_state_service.dart:22-35`), `shared_preferences` for the Circuit **SHARED PREFERENCES** actions (`packages/core/lib/src/interpreter/suggestion.dart:480-505`), `dio` for REST APIs (`packages/core/lib/src/interpreter/libraries/dio_library.dart`; `docs/integrations/rest-api/index.md`), `go_router` for routes (`packages/core/lib/src/interpreter/libraries/go_router_library.dart`; `docs/logic/router.md`), `nowa_runtime` imported by generated code (existing sentence).
- Caret meaning: DART-DEPS ("the range of all versions guaranteed to be backwards compatible with the given version").
- `pub get` downloads the packages in `pubspec.yaml`: DART-GET.
- Dev dependencies are for tests and tools, not `lib`: DART-DEPS.
- `sdk:` packages ship with the Flutter SDK (`flutter_localizations`): https://docs.flutter.dev/ui/internationalization (adds `flutter_localizations: sdk: flutter`); Nowa's handling is the existing verified sentence.

### code-mode.md (Edit code in Nowa)

For the reader:
- Intro says what language you'll see (Dart) and why you'd open code mode (check what Nowa AI wrote, quick fixes).
- The Files tree sentence explains `lib/` and `pubspec.yaml` and links to the project map in `index.md#whats-in-your-project`.
- Next steps carry a reason each. No facts changed.

Evidence: unchanged facts from the verified page; Dart as Flutter's language (https://dart.dev, https://flutter.dev).

### files.md (Manage project files)

For the reader:
- Intro says when to use which panel (Library most days, **Files** to see everything).
- `lib/`, `pubspec.yaml` and platform folders explained in a clause where they first appear.
- Next steps carry a reason each. No facts changed.

Evidence: unchanged facts from the verified page; platform folders per FLUTTER-DEPLOY.

### limitations.md (What Nowa can show on the board)

For the reader:
- Intro reassures that board limits don't change the real app: **Run** (and the published app) runs everything. This is the 3.13 replacement for the old `hybrid-approach/custom-code.md` "Preview limitations" (which said the board never runs custom code: obsolete).
- "sliver" and `sdk:` packages explained in a clause.
- Next steps carry a reason each. No facts changed.

Evidence: the page's own verified "Check the real result" section (Run compiles your code and packages "as in the app you publish"); `docs/test/run.md`.

## Open questions

(Collected at the end.)

## For other pages

(Collected at the end.)
