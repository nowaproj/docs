# P14-B15 verify log (code section)

Verifier: P14-B15-V. Batch commit checked: `53fe11d` (diff against `origin/main`, `docs/code/` minus `generated-code.md`).
Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). GitHub, Apple and Flutter pages fetched on 2026-10-12
with `curl` (GitHub through `https://docs.github.com/api/article/body?pathname=...`, which returns the article as
Markdown). Code refs are relative to `/home/user/nowa-master`.

Reader: secondary (`docs/code/`), so code, paths and package names may stay; R1-R2 don't apply, R3-R9 do.

## Summary

- **Pages checked:** 11 (`index`, `code-mode`, `files`, `packages`, `custom-code`, `limitations`, `local-projects`,
  `vs-code`, `import`, `git`, `github`). `generated-code.md` not touched.
- **Claims checked:** about 130 added or changed claims (about 100 table rows below, trivial ones grouped), every one
  against the code or the current GitHub, Apple, Flutter or Dart docs.
- **Fixed:** 15. github.md 8: the connect steps put "Waiting for Authorization..." after the approval (it opens with
  the browser); "your whole history" on Create Repository (only the current branch is pushed); the Quick Setup address
  must be the `https://` one (SSH addresses are rejected); GitHub's first step, verify your email, was missing; the
  classic-token case now covers outside collaborators on organization repositories too; organization approval said
  "public repositories" (GitHub: public resources) and lacked the justification box and owner auto-approval; the
  other-hosts paragraph told readers to "keep GitHub disconnected" (Nowa has no disconnect button) and was reduced to
  what the UI shows; the missing-repository row now points repositories in someone else's account to the team section.
  git.md 6: team step 3 promised teammates would find the shared repository in **Clone from GitHub** (not shown by the
  code; now conditional, with a code-supported fallback); invite steps scoped to personal repositories; new branches
  show **Publish Branch** before **Sync**; after a merge on GitHub you sync the branch it went into; conflicts appear
  on pull, sync or merge; GitHub's delete control is a trash icon. custom-code.md 1: **PACKAGE:** holds every
  top-level function, not only ones in their own file.
- **Removed:** 0 (one claim reduced, see Q2).
- **Facts restored:** 1 (github.md: **View Repository in Browser** opens the remote in your browser, any host).
- **Added:** 1, routed from B12: iPhone signing in Xcode for people who code, in `vs-code.md` (local projects).
- **Audience and tone:** no R3-R9 problems left; Git and GitHub terms are each explained once, Flutter terms in a clause.
- **Open issues:** Q1 (GitHub's approval and Manage pages, needs a live check), Q2 (tokens from other Git hosts,
  server untested), Q3 (whether teammates see repositories from another account in **Clone from GitHub**, server-side),
  a minor panel-refresh note, and git.md at about 2,360 words.

## github.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Step 1 path: dashboard **Settings** or avatar → **General Settings** → **Editor Settings** → **Git** | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:210`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:427`, `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:32-35,157` | Unchanged text, re-checked |
| "GitHub opens in your browser" | ok | `packages/git_nowa/lib/src/github_oauth/github_oauth_manager.dart:16-35` (`launchUrl(..., externalApplication)`) | |
| Order of steps 2-5: "Come back to Nowa. It shows Waiting for Authorization..." after approving | fixed | `packages/core/lib/src/settings/github_integration_settings.dart:84-111`, `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:44-69,87` | The dialog opens right after the browser does and polls every second, so after approving you'd usually see the connected view, not the waiting dialog. Merged the wait into step 2 (4 steps now) |
| Two-minute limit, **Cancel**, "n repositories connected", avatar + username | ok | `auth_dialog.dart:49-53,102-109`; `github_integration_settings.dart:113-149` | Timeout closes the dialog without a message, which the fix table already describes |
| Step 3 "If GitHub asks which repositories..., **All repositories** / **Only select repositories**" | ok (conditional kept) | https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party ; Nowa side is a GitHub App installation: `packages/git_nowa/lib/src/github_oauth/github_oauth_models.dart:1-32` (`installationId`, `manageUrl`, `repositoryCount`), `github_oauth_service.dart:66-68` ("Resource not accessible by integration") | The URL comes from Nowa's server (`/github/start`), so "If GitHub asks" is the right hedge. Open question Q1 stays (live check) |
| **Manage** opens GitHub; **Repository access** → **Save** | ok | `github_integration_settings.dart:135-145` (`installation.manageUrl`); https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps ("Under Repository access, select All repositories or Only select repositories ... Click Save") | |
| Nowa only lists repositories you allowed | ok | `github_integration_settings.dart:191-197,224` (list from `/github/repositories`, hidden until connected) | |
| "Your commits stay in your project until you connect it to a repository on GitHub, called a remote" + push/pull definitions | ok | `packages/git_nowa/lib/src/git_manager.dart:513-528,589-629` (`push`, `pull`, `_checkHasRemote`) | |
| Create Repository: name prefix, rules, **Private** helper, **Create Repository** | ok | `lib/project/panels/git_panel/git_remote_details.dart:309-375` | Unchanged facts |
| "A public repository can be seen by anyone on the internet" | ok | https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories ("Public repositories are accessible to everyone on the internet") | |
| "adds it as the remote `origin` ... and pushes your commits, so your whole history is on GitHub in one go" | fixed | `git_manager.dart:847-864` (`publishRepository` → `addRemote('origin')` → `push()`); local push sends only the current branch: `packages/git_nowa/lib/src/local/local_git_service.dart:1063,1108` (`GitPushRequest` refspec `refs/heads/<current>`) | "whole history" overstated it when other local branches exist. Now "so your work is on GitHub straight away" |
| Empty repository on GitHub: **+** → **New repository**, **Owner**, name, visibility, no README/.gitignore/license (merge conflict), **Create repository**, Quick Setup page | ok | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository (steps 1, 4-7, 10, 11); https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github ("At the top of your repository on GitHub's Quick Setup page, click to copy the remote repository URL") | |
| "copy the repository's address (it ends in `.git`)" | fixed | `git_remote_details.dart:232-240` (only http/https accepted) | Quick Setup can show the SSH address (`git@...`), which **Repository URL** rejects. Now "the one that starts with `https://` and ends in `.git`" |
| **Add Existing Repository**, list only when connected, **Search repositories**, **Repository URL**, **Connect Repository**, warning text | ok | `git_remote_details.dart:157-273`; `github_integration_settings.dart:224,262` | |
| **Manage your connected repositories** link | ok | `github_integration_settings.dart:290-306` ("Can't find your repository? Manage your connected repositories.") | |
| Without GitHub: **Connect GitHub** + "You need to connect your GitHub account to create a repository."; "No permission to create repository. Try again" + **Grant Permission** | ok | `git_remote_details.dart:62-79,411-437` | Unchanged |
| **Connected Remote Repository**, **View Repository in Browser**, **Disconnect** | ok | `git_remote_details.dart:102-154` | |
| "The icon ... opens it on GitHub" (was "in your browser" on `origin/main`) | restored | `git_remote_details.dart:127-134` (`launchUrl(remote.url)`) | The icon opens whatever the remote URL is, and the page itself allows other hosts. Back to "opens it in your browser" |
| Identity: who changed what; new projects use the Nowa account's; only a label, needn't match an account; use an email on your GitHub account to have commits shown as yours | ok | `git_manager.dart:209-227` (`setIdentity(user.name, user.email)`); https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address ("You can use your GitHub-provided noreply email address or any email address"; "Add the email address to your account on GitHub, so that your commits are attributed to you") | |
| "Your next commits carry the new name; earlier commits keep the one they were made with" | ok | same GitHub page ("Any commits you made prior to changing your commit email address are still associated with your previous email address") | |
| **Identity**, **Name**, **Email**, **Set Identity**, "No repository found" | ok | `packages/core/lib/src/settings/git_settings.dart:54-64,183-215` | |
| Token intro: password-like code; cloud = Nowa's servers, local = your computer | ok | `git_settings.dart:281-286` (helper text "used by Nowa servers"), `:576-579`; https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens | |
| Fine-grained steps: profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**; **Token name**; **Expiration**; **Resource owner**; **Repository access** / **Only select repositories**; **Generate token** | ok | managing-your-personal-access-tokens, "Creating a fine-grained personal access token" steps 2-14 | |
| Missing step: verify your email address first | fixed (added) | same page, step 1 ("Verify your email address, if it hasn't been verified yet") | One sentence before the steps |
| **Permissions** → **Repository permissions** → **Contents** → **Read and write**; confirm **Generate token** again if asked | ok | https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely ("To the right of Repository permissions in the Permissions section, click [expand]"; "select Read and write"; "If prompted, confirm by clicking Generate token again"); PAT page: `contents` read/write, "Push access to repositories" template = `contents=write` | |
| Expired token can't be restored, push and pull stop | ok | https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation ("It is not possible to restore an expired or revoked token") | |
| "anyone who has it can change your code" | ok | PAT page ("Treat your access tokens like passwords"); Contents write | |
| Classic token for "Someone else's repository ... another person's account when you're a collaborator" | fixed | PAT page, fine-grained gaps ("contribute to repositories where the user is an outside or repository collaborator"); classic section ("Outside collaborators can only use personal access tokens (classic) to access organization repositories that they are a collaborator on") | Broadened to both cases: a teammate's personal repository, or an organization's repository when you aren't a member |
| Classic steps: **Tokens (classic)** → **Generate new token** → **Generate new token (classic)**, **Note**, **Expiration**, **repo**, **Generate token**; reaches every repository you can access | ok | PAT page, "Creating a personal access token (classic)" steps 4-9 and its warning ("can access every repository that you can access") | |
| Organization approval: "Until an administrator approves yours, it can only read public repositories" | fixed | PAT page ("marked as pending until it is reviewed by an organization administrator. Your token will only be able to read public resources until it is approved. If you are an owner of the organization, your request is automatically approved"; step 10 justification box below the resource owner) | Now: public resources (not "repositories"), the optional justification box, owners auto-approved, and what it means for Nowa (can't push yet) |
| Add the token: **Legacy Remote Credentials** → **Add Credentials** → **Set Git Credentials** (**Username**, **Access Token**) → **Add Credentials**; "Your cloud projects can now push and pull" | ok | `git_settings.dart:221-330,372-495`; cloud credentials are per account (`packages/git_nowa/lib/src/network_git_service.dart:122-133`, `/git/credentials` with no project id) | |
| Replace a token: trash icon first; hidden while GitHub Integration is on, with its message | ok | `git_settings.dart:294-325,350-367` (`Icons.delete`) | |
| "Tokens also work with other Git hosts ... Keep GitHub disconnected in that case" | fixed (reduced) | `git_remote_details.dart:232-240` (any http/https); `git_settings.dart:435` ("You can find your access token in your account settings on the Git provider website."); `git_settings.dart:318-324` (cloud: legacy credentials not used while GitHub is on); `local_git_service.dart:290-296,311-316` (local: only the GitHub token while connected) | Reworded to what the UI shows. Nowa has no button to disconnect GitHub Integration, so "keep GitHub disconnected" became "Nowa uses it only while GitHub isn't connected". Not tried against another host: open issue Q2 |
| Local credentials: **External Local Credentials**, **+**, "No credentials found"; SSH order (agent, `id_ed25519`, `id_rsa`, `HOME`), http(s)-only **Add Existing Repository** | ok | `packages/core/lib/src/settings/local_git_settings.dart:6-121`; `local_git_service.dart:311-349` | Unchanged except the link to the token steps |
| Fix table, new row "A repository is missing from the list" | fixed | `github_integration_settings.dart:290-306`; server-side list (`github_oauth_service.dart:37-43`) | Fix holds for repositories in your own account. Added a pointer for repositories in someone else's account (see git.md team section, Q3) |
| Fix table, new row "Push and pull stopped working with a token that used to work" | ok | token-expiration page; replace flow above | |
| Other rows' messages | ok | `lib/project/panels/git_panel/git_details.dart:1374,1400`; `packages/git_nowa/lib/src/git_service.dart:111,123`; `auth_dialog.dart:49-53` | |

Audience and tone (R3-R9): reads well for someone new to Git (GitHub, repository, remote, push, pull and token each
explained once). The fixes above keep the warm wording. Words: about 2,190.

## git.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro: history, go back, branches, backup, teamwork | ok | https://docs.github.com/en/get-started/using-git/about-git | |
| "Git in a minute" table: repository, commit, stage, remote, push and pull, branch, merge, conflict | ok | about-git ("A repository ... along with each file's revision history ... snapshots in time called commits ... lines of development called branches"; `git add` stages, `git pull`, `git push`, `git merge`); https://docs.github.com/en/pull-requests/reference/merge-conflicts | Each line is plain and correct; in Nowa you pick the version per file, which the Resolve conflicts section says |
| New projects get a repository and an **Initial commit** | ok | `lib/project/project_page.dart:322-333` (`tryInitAndCommit`), `packages/git_nowa/lib/src/git_manager.dart:209-227` | |
| **Create Git Repository...** starts empty, every file under **Changes** until a first commit | ok | `lib/project/panels/git_panel/git_details.dart:291-319` (`initRepo()`, no commit), `git_manager.dart:451-463` | |
| Board, **Details** and Nowa AI edits end up in files that Git lists | ok | Git status reads the working tree on every save: `git_manager.dart:231-285` (`updateState`), `:311` (`onSave`) | |
| **A** (green) added, **M** (blue) modified, **D** (red) deleted, **R** renamed in the Git panel | ok | Panel rows: `git_details.dart:572` (`FileText(file, gitSide: ...)`), `packages/core/lib/src/file_system/widgets/files_widgets.dart:83-104` (name colored, letter appended); letters `packages/git_nowa/lib/src/models/git_models.dart:198-205`; colors `packages/git_nowa/lib/src/git_widgets.dart:6-14` + `packages/nowa_ui/lib/src/globals/nowa_colors.dart:26,33,36` (`accentColor` 0xff81E785, `errorColor` 0xFFFF6B6B, `infoLog` 0xFF6891DF); same in **Create Commit** (`git_details.dart:1589-1608`) | Renamed is grey (`greyedTextColor`), so no color named for **R**: fine. Conflicted files show **C** but are listed under **Conflicts** |
| "A commit stays in your project until you push it, so nothing reaches GitHub yet" | ok | `git_manager.dart:491-528` (commit and push are separate calls); cloud: `network_git_service.dart` `/git/commit` vs `/git/push` | |
| Commit often; why stage | ok | about-git (staging gives control over what goes into a snapshot) | Old docs' tips, still valid |
| Diff explained ("a view of the lines that changed") | ok | `git_details.dart` diff tab (unchanged facts) | R4 |
| Sync: commits go up, new commits come down; shown on GitHub with your identity | ok | `git_manager.dart:589-622`; https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address | |
| Auth messages: "connect your account, or add an access token (a password-like code you create on GitHub)" | ok | `git_details.dart:1400`, `packages/git_nowa/lib/src/git_service.dart:111` | |
| When to branch (one per feature or fix), merge back, board shows the branch you're on | ok | `git_manager.dart:828-845` (`checkoutBranch` → `handleEvents` → `reimportAll`) | |
| Delete a branch on GitHub: **View all branches**, "the delete icon" | fixed | https://docs.github.com/en/pull-requests/how-tos/commit-changes/managing-branches-within-your-repository ("select the branch dropdown menu, then click View all branches ... Next to the branch that you want to delete, click [trash icon]") | "delete icon" → "trash icon", the icon GitHub shows |
| Switch branches in VS Code, GitHub Desktop or a terminal; Nowa reloads changed files | ok | `packages/core/lib/src/services/local_file_service.dart:123-142,237-270` (recursive watcher, bulk relink over 10 files); `git_manager.dart:314-318` | |
| Team: workspaces have no live co-editing | ok | `docs/account/workspaces.md` line 15 (verified B03 page: "no comments and no live co-editing") | |
| Team step 2: invite collaborators (**Settings** → "Access" → **Collaborators** → **Add people** → confirm; accepted by email) | fixed (scoped) | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository | GitHub's steps are for a personal repository; organization repositories manage access differently. Added "For a repository in their personal account" |
| Team step 3: each teammate connects GitHub and clones with **Clone from GitHub** | fixed (Q3) | `lib/dashboard/create_new_project/github_clone_dialog.dart:192-197,111-119` (only the `RepositoryListView`, no URL field); list from the user's own connection: `github_integration_settings.dart:191-197`, `github_oauth_service.dart:37-43` (`/github/repositories`); one installation per user in the client (`github_oauth_models.dart:1-32`, `accountLogin`); local Git uses only the GitHub token while connected (`local_git_service.dart:290-296`) | The code doesn't show that a repository in another person's account appears in a teammate's list (server-side), and GitHub only lets account owners install an app on an account (https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party, "Requirements"). Step now says the list shows only what the teammate's own connection reaches, so it may be missing, and gives the path the code does support: clone with another Git tool, open the folder with **Import project** (local-only), and push/pull with that tool if Nowa's Git panel can't sign in (same repository: `vs-code.md`, `local_git_service.dart`) |
| Team step 4: "clicks **Sync** to share" on a new branch | fixed | `git_details.dart` commit-box button (**Publish Branch** for a branch not on the remote), git.md's own Sync section | Added "(**Publish Branch** the first time)" |
| Pull requests: review and discuss before merging | ok | https://docs.github.com/en/pull-requests/reference/pull-requests ("letting you discuss and review changes before merging them") | |
| "After a merge on GitHub, **Sync** in Nowa brings the result into your project" | fixed | Pull and Sync work on the current branch (`git_manager.dart:589-622`; local pull of the branch's upstream) | Now "switch to the branch it went into and click **Sync**" |
| "If two people changed the same lines, the next pull opens Resolve Conflicts" | fixed | git.md's own Sync and Resolve conflicts sections (a Sync clash lists files under **Conflicts** instead of opening the dialog; merges open it too) | Now "Nowa shows the clash when you pull, sync or merge" with the link |
| Three-copy setup (cloud for **Deploy**, local for VS Code and simulators, GitHub in the middle) | ok | old `git/intro-git.md` best practice; steps unchanged | |

Audience and tone: the page now teaches Git from zero (table, why commit, why stage, when to branch) and stays
concrete. Length: about 2,360 words with the image alt texts (over the ~2,200 mark). The writer's split proposal in
`P14-B15-notes.md` (move "Work with a team" and "Move work between a cloud and a local project" to a new "Git
workflows" page) still fits; not split here.

## import.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Your code stays yours; only visually changed parts are rewritten | ok | the page's own "Code you change visually is rewritten" bullet; `docs/code/index.md#how-code-and-design-stay-in-sync` | |
| Flutter SDK, `pubspec.yaml`, monorepo explained | ok | `packages/core/lib/flutter_tool.dart:95-105` (`flutter create`); "Chosen folder is not a nowa project or a flutter project" (unchanged) | R4 |
| Rule of thumb: **Import project** for a folder, **Clone from GitHub** for a repository | ok | table above it | |
| Cloned project stays connected, with history and branches; commit and **Sync** right away | ok | local: `local_git_service.dart:125-131` (libgit2 clone, `origin` kept); cloud: `lib/dashboard/create_new_project/start_project_provider.dart:97-105` (server `/git/clone`); https://docs.github.com/en/get-started/using-git/about-git ("The clone includes all the project's files, history, and branches") | Cloud side is server-side; consistent with the old docs |
| Packages decide what the board draws; others work in **Run** | ok | `docs/code/packages.md` "Built-in support or placeholders" (verified page) | |
| **GLOBALS** lists only `provider` global states; Riverpod or Bloc state runs but doesn't show there | ok | `packages/core/lib/src/interpreter/suggestion.dart:469-479` (**Globals** category = `GlobalStateSuggestionsFinder`), `packages/core/lib/src/state_management/global_state_suggestions.dart:66-75` (`providerClasses`), `packages/core/lib/src/project/env_services/global_state_service.dart:22-35` (`*Provider` widgets at the app root, `NotifierClassDecl` only), `packages/core/lib/src/state_management/provider_blocks.dart:5-17` (`ChangeNotifier` supertype); upper-case display `packages/core/lib/src/fields/link_menu.dart:331` | **Globals** also holds helpers (Media Query, Show snackbar); the sentence is about the global states in it, so it's right |
| Next steps reasons | ok | | |

## local-projects.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Internet connection needed: Nowa checks your account with its servers when you open the dashboard or a project | ok | `lib/router.dart:46-114` (`_authorize`: `ensureValidVersion()` then `/auth/profile`), routes `/` (`:175-177`) and `/project/:id` (`:246-248`, local projects open there too: `lib/dashboard/dashboard_page.dart:156`); `packages/core/lib/src/services/version_service.dart:98-103`; `packages/core/lib/src/services/user_service.dart:81-83` | Offline, the redirect goes to **No Internet Connection** or sign-in (`lib/router.dart:87-112`), so not naming the screen is right |
| Unavailable features say "... is not available on local projects" and offer **Sync to cloud**; examples **Share preview** and **Deployment** settings | ok | `packages/core/lib/src/settings/project_sync_settings.dart:464-505` (`SyncNotice`); `packages/designer/lib/src/play_mode/play_mode.dart:53` ('Share preview'); `packages/core/lib/src/settings/deployment_settings.dart:13,205-209` + `packages/core/lib/src/settings/cloud_build/cloud_build_common.dart:5-21` ('Cloud build') | |
| Publish yourself with Flutter's tools | ok | https://docs.flutter.dev/deployment | |
| Project Sync only in the desktop app | ok | `packages/core/lib/src/settings/project_settings.dart:29` (`if (!kIsWeb) const ProjectSyncSettings()`) | |
| Git is the better fit when both copies change | ok | git.md section (merges instead of overwriting) | |
| Original stays as it was after cloning | ok | `project_sync_settings.dart:556-560` ("Your original ... project will remain unchanged and a link will be created between both projects") | |
| Wrong direction replaces newer work with the older copy | ok | **Sync Warning** text `project_sync_settings.dart:394-427` ("This action will overwrite any existing data in the destination project") | |
| Unlink use case; "Failed to load linked projects" + **Remove link** | ok | `project_sync_settings.dart:170-210` (`'Failed to load linked projects: $e'`, **Remove link** → `_handleUnlink`), `:433-460` | |
| `pubspec.yaml` explained at **Locate folder** | ok | | R4 |

## vs-code.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Never copy files; switch between visual and code at any stage | ok | `packages/core/lib/src/services/local_file_service.dart:123-142` (recursive folder watcher) | |
| `code` command explained; Nowa uses it | ok | `packages/core/lib/src/runner/vscode.dart:30-58` | |
| Other editors (Android Studio, IntelliJ) work on the folder; syncing the same | ok | same watcher; local project = normal Flutter folder (`flutter_tool.dart:95-99`) | |
| Saving hot reloads a local device run, keeping the app's state | ok | `packages/core/lib/src/project/saving_service.dart:110-112` ("Saving hot reloads an active local device run via the save observer"); `packages/nowa_run/lib/src/services/local/daemon_protocol.dart:125-130` ("preserves application state"); https://docs.flutter.dev/tools/hot-reload | |
| Git panel, VS Code, GitHub Desktop and the terminal share the repository; panel updates on outside changes | ok | `local_git_service.dart` (libgit2 on the project folder), `git_manager.dart:314-318` | The panel ignores changes inside `.git/` itself, so a commit made in another tool shows after the next save or refresh. Not worth a line here |
| AI coding assistants edit the same files | ok | watcher above | |
| Routed from B12: iPhone signing for people who code (open `ios/Runner.xcworkspace`, **Xcode** → **Settings** → **Apple Accounts**, **Runner** target, team under **Signing & Capabilities**, free personal team) | added (routed from B12) | Apple: https://developer.apple.com/documentation/xcode/running-your-app-on-simulated-or-physical-devices ("sign in with your Apple Developer Program or personal Apple Account in Xcode > Settings > Apple Accounts. Then, in the Signing & Capabilities pane ... choose your team from the Team pop-up menu"); Flutter: https://docs.flutter.dev/deployment/ios ("open ios/Runner.xcworkspace ... select the Runner target ... In the Signing & Capabilities tab ... Team"), https://docs.flutter.dev/platform-integration/ios/setup ("If you're just testing your app on an iOS device, a personal Apple Developer account is free and works"); local projects have `ios/` (`flutter_tool.dart:95-99`, default `flutter create`) and run from their own folder (`flutter_tool.dart:107-116`), while cloud device runs use a managed cache, "never edited directly", whose `ios/` comes from a server archive and is replaced on re-download or clear (`packages/core/lib/src/runner/cloud_local_run_service.dart:14-33,123-150`) | Added as one paragraph in "Run and use Git from either place" (the page is badged Local projects), saying it sticks on a local project and may not last on a cloud project's copy, with a link to `test/devices.md#run-on-your-iphone-or-ipad` for the phone side. "Git works the same way" became "Git works from either place too" so it still reads after the new paragraph |

## custom-code.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Widget, function, class explained; board draws most, **Run** runs all | ok | `docs/code/limitations.md` (verified page) | R4 |
| `lib/` explained; code in its own file or next to Nowa's | ok | | |
| Function row: "A function in a file of its own is under **PACKAGE:**..." | fixed | `packages/core/lib/src/interpreter/services/suggestion_service.dart:9-15` (category = the user library), `packages/core/lib/src/interpreter/library.dart:45,220` (name `package:<name>`), `link_menu.dart:331` (upper-case) | The category holds every top-level function of your package, not only ones in their own file. Now "A function outside any class, for example in a file of its own" |
| **PACKAGE:MY_APP** example | ok | same | |
| **LOCALS** for functions inside the screen or component | ok | `suggestion.dart:478` (`Locals`), `:588-605` (`LocalSuggestionsFinder` → `widgetSuggestions(enclosingWidgetClass)`) | |
| **GENERAL** → **Create...** to make an object | ok | `suggestion.dart:168-176` ('Create...'), `:509-516` (`General` with `ConstructorSuggestion()`), `:729-737` (non-widget classes with constructors) | |
| Ideas: package widget placeholder vs **Run**; Google Maps integration; package functions return stand-in values; `Product` class | ok | `docs/code/packages.md` "Built-in support or placeholders" ("its functions return stand-in values"); `docs/integrations/google-maps.md` exists; Dart in the example is valid (`'\$${price.toStringAsFixed(2)}'`) | |
| `@CustomFunction` on a method: kept as code, not run on the board, `preview` ignored, logs the call and returns a stand-in, placeholder for a widget | ok | `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1099-1101` (→ `CustomMemberVisitor`), `:2171-2178` (`CustomMethodDecl` built without `preview`), `packages/core/lib/src/interpreter/declaration_hybrid.dart:28-50` (widget → placeholder; else logs "calling: <name>", returns a mock), `:124-140` | |

## index.md, packages.md, code-mode.md, files.md, limitations.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Flutter = Google's toolkit for iOS, Android, web and desktop from one code base; Dart | ok | https://flutter.dev, https://dart.dev | index.md |
| `pubspec.yaml` = settings file (name, packages from pub.dev, assets, fonts); platform folders are what Flutter builds each platform from; `@NowaGenerated` is a tag on the declaration | ok | `docs/code/packages.md`, `docs/design/assets.md`; https://docs.flutter.dev/deployment | index.md, code-mode.md, files.md |
| New row linking [What Nowa adds to your code](generated-code.md) | ok | file exists with the anchors from P14-BRIEF | index.md |
| Starter packages and what each is for (`nowa_runtime`, `provider`, `shared_preferences`, `dio`, `go_router`) | ok | `global_state_service.dart:22-35`; `suggestion.dart:480-505` (**Shared Preferences**); `packages/core/lib/src/interpreter/libraries/dio_library.dart`, `go_router_library.dart` | packages.md |
| `^` = this version or any newer compatible one; `flutter pub get` downloads the listed packages; Git/path packages; `sdk:` packages ship with Flutter; `dev_dependencies` are for tests and tools | ok | https://dart.dev/tools/pub/dependencies, https://dart.dev/tools/pub/cmd/pub-get, https://docs.flutter.dev/ui/internationalization | packages.md, limitations.md |
| Code mode shows mostly Dart; good for checking Nowa AI's work or quick fixes | ok | | code-mode.md |
| Library most days, **Files** to see everything | ok | | files.md |
| Board limits don't change the real app; **Run** = what users get when you publish | ok | limitations.md "Check the real result" ("run for real, as in the app you publish") | limitations.md |
| "sliver" explained | ok | | limitations.md |

## Removed facts (`-` lines)

Every removed line is either kept in other words or expanded. One precision loss found and restored (github.md,
**View Repository in Browser** opens the remote in your browser, not always GitHub). The old "category named after your
project" in custom-code.md was replaced by the more exact **PACKAGE:** name, which is right. Nothing was moved to the
for-code file, which is correct for `docs/code/` pages.

## Structure checks

All 11 pages: every `{#id}` from `origin/main` still present; image lines identical to `origin/main`; at most 2
admonitions per page; no H1; no `---` rules in the body; no hype words; front matter parses as YAML; all relative links
and anchors resolve (script check, including heading-generated anchors). Only index.md links to `generated-code.md`,
without an anchor.

## Coverage spot checks

Fully `obsolete` rows (8), each re-checked in the code:

| Old item | Result |
|---|---|
| git-local #4 (create the repository in GitHub Desktop) | confirmed: new projects get a repository and "Initial commit" (`lib/project/project_page.dart:322-333`, `git_manager.dart:209-227`); others use **Create Git Repository...** (`git_details.dart:291-319`) |
| git-local #9 (reopen after discarding outside Nowa) | confirmed: recursive folder watcher reimports changed files (`local_file_service.dart:123-142,237-270`) |
| git-local #10 (Git integration only for local projects) | confirmed: cloud Git runs through `packages/git_nowa/lib/src/network_git_service.dart` |
| git-local #11 (IDE edits may not load) | confirmed: same watcher; what the board can't draw is in `limitations.md` |
| git-operations-cloud #24 (can't switch with uncommitted changes) | confirmed: changes come along, "Switch branch?" with **Bring my changes** (`git_details.dart:974-981`) |
| hybrid custom-code #7 (functions are black boxes) | confirmed: the interpreter runs your functions; only `@CustomFunction` and what limitations.md lists don't run |
| hybrid custom-code #8 (instant preview never runs custom code) | confirmed: same |
| hybrid custom-code #9 (cloud projects must publish a web version to test) | confirmed: **Run** works for cloud projects (`docs/test/run.md`, `flutter_tool.dart:107-116` cloud copy) |

Partly obsolete rows also checked: git-operations-cloud #20 ("From branch" gone: dialog title "New branch from
<current>", only **Branch Name** and **Create Branch**, `git_details.dart:1035-1047`); clone-from-cloud #3 (no URL field,
`github_clone_dialog.dart:192-315`); clone-from-cloud #7 (always `origin`, `git_remote_details.dart:262`); sync #12 (no
follow-up question, `project_sync_settings.dart:180-191`); hybrid #5 (code-mode toggle in the top bar,
`lib/project/top_bar.dart:287`); token-github #16 (local Git does authenticate: `local_git_service.dart:290-349`). All
confirmed.

Covered rows sampled (10): intro-git #3 and #7, git-local #6 (`code-mode.md#save-your-edits`), git-operations-cloud
#7, #13 and #22, token-github #15, clone-from-cloud #9, sync #8, othertools #3. Each cited section covers the item.

## Open issues

- **Q1 (writer) GitHub's approval and Manage pages.** Both URLs come from Nowa's server (`github_oauth_service.dart:17-31`).
  The page matches GitHub's docs for a GitHub App installation and hedges step 3 ("If GitHub asks"). A live check with
  a test GitHub account in the app would confirm the exact pages. Not done: verifiers don't connect accounts.
- **Q2 (writer) Tokens from other Git hosts.** The client allows it and the dialog says "Git provider website", but cloud
  Git runs on Nowa's servers and nobody has tried GitLab or Bitbucket. Reduced to what the UI shows. If the product
  team knows it fails, drop the paragraph at the end of `github.md#legacy-remote-credentials`.
- **Q3 (writer) Teammates and Clone from GitHub.** Whether `/github/repositories` includes repositories a teammate can
  reach in another account's installation is server-side. The team steps no longer promise it and give a path the code
  supports. If the product team confirms collaborators do see such repositories, the extra sentences in
  `git.md#work-with-a-team` step 3 and the pointer in the github.md fix table can go.
- **Panel refresh after an outside commit (minor).** The local Git panel ignores changes inside `.git/`
  (`git_manager.dart:314-318`), so a commit made in GitHub Desktop may show only after the next save or refresh. Not
  documented; worth a product check.
- **git.md length.** About 2,360 words; split proposal in the writer's notes.
