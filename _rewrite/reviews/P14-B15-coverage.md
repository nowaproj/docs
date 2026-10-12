# P14-B15 coverage: old Git, GitHub, hybrid and local-project pages

Batch pages: `docs/code/` `index`, `code-mode`, `files`, `packages`, `custom-code`, `limitations`, `local-projects`,
`vs-code`, `import`, `git`, `github`. Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`).
GitHub refs are docs.github.com pages fetched on 2026-10-12 (full URLs in `P14-B15-notes.md`, "Sources").

Status values: `covered` (page#section) / `added` (page#section) / `obsolete` (code ref) / `not useful` /
`dev-only` / `for other page` (target).

## git/intro-git.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Why use Git: track changes (what, when, who), revert mistakes, collaborate, experiment in branches, backup on a remote such as GitHub | added | `git.md#git-in-a-minute` (intro + "why" list) | About Git: https://docs.github.com/en/get-started/using-git/about-git |
| 2 | Nowa works with Git and any Git service, cloud or local | covered + added | `git.md#before-you-start` (cloud on Nowa's servers, local on your computer); other Git hosts: `github.md#legacy-remote-credentials` | Repository URL accepts any http(s) address: `lib/project/panels/git_panel/git_remote_details.dart:229-240`; token dialog "Git provider website": `packages/core/lib/src/settings/git_settings.dart:435` |
| 3 | Create a local Git repository from a project; commit, discard, branches | covered | `git.md#open-the-git-panel`, `#commit-your-changes`, `#review-or-discard-changes`, `#work-with-branches` | New projects get a repo + "Initial commit": `lib/project/project_page.dart:321-333`, `packages/git_nowa/lib/src/git_manager.dart:209-227` |
| 4 | Clone a GitHub repository into Nowa Cloud and use commit, push, pull, discard, branches | covered | `import.md#clone-from-github`, `git.md` | |
| 5 | Push a cloud project to GitHub to create a remote repository | covered | `github.md#connect-a-repository` (Create Repository creates, adds `origin`, pushes) | |
| 6 | Best practice: three copies (local repo, cloud repo, GitHub); local for the hybrid approach and simulators, cloud for deploys, GitHub as the team's single source of truth (diagram) | covered + added | `git.md#move-work-between-a-cloud-and-a-local-project` (steps and roles); "GitHub copy is the one everyone shares" added there | Diagram `/img/git/git-setup-explanation.png` not reused: dark theme and it implies hot reload is local-only (see notes) |
| 7 | Started locally: create repo, push to GitHub, clone into cloud, then commit/push locally and pull in cloud | covered | `git.md#move-work-between-a-cloud-and-a-local-project` | |
| 8 | Started in the cloud: push to GitHub, clone to your computer | covered | same section (Clone from GitHub + **Local-only**) | |
| 9 | Alternative: download the code, `git init` locally, push to GitHub, point the cloud project's remote at it | not useful | superseded | One-click **Create Repository** + **Clone from GitHub** does it; the manual route gives the two projects separate histories, which then clash on Sync |
| 10 | Team: pull teammates' changes from the shared GitHub repo; work on the same project in Nowa; no extra branches needed because of Nowa, use Git normally | added | `git.md#work-with-a-team` | Workspaces have no live co-editing (`account/workspaces.md#how-workspaces-work`), so Git is how several people change one app |
| 11 | How to collaborate: one person creates and pushes the repo, adds the team on GitHub, each teammate clones into Nowa Cloud or locally (desktop), everyone commits and pushes | added | `git.md#work-with-a-team` (GitHub collaborator steps verified) | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository |
| 12 | When to branch: one branch per feature or task, so you don't interfere with others | added | `git.md#work-with-branches` (what a branch is, when to use one) | |
| 13 | Switch branches in the cloud from Nowa; locally also in VS Code, GitHub Desktop or `git checkout` | covered + added | `git.md#work-with-branches` (Nowa); outside Nowa: `vs-code.md#what-syncs-and-when` + line added in `git.md#work-with-branches` | Watcher: `packages/core/lib/src/services/local_file_service.dart:123-142,237-255` |

## git/git-local.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | YouTube short (create repo, commit, discard) | not useful | media | |
| 2 | Needs Nowa Desktop for local projects | covered | `local-projects.md#before-you-start`, `git.md#before-you-start` | |
| 3 | Step 1: create a local project with a path | covered | `local-projects.md#create-a-local-project` | |
| 4 | Step 2: create the repository with GitHub Desktop (Add > Add Existing Repository, create repository, initial commit) | obsolete | New projects already have a repository and an **Initial commit** (`lib/project/project_page.dart:333`, `packages/git_nowa/lib/src/git_manager.dart:209-227`); others use **Create Git Repository...** (`lib/project/panels/git_panel/git_details.dart:291-319`) | Using GitHub Desktop on the same folder still works: mentioned in `vs-code.md#run-and-use-git-from-either-place` |
| 5 | Changes made in Nowa or your IDE are tracked by Git | covered | `vs-code.md#run-and-use-git-from-either-place`, `git.md#commit-your-changes` | |
| 6 | Auto save; manual save with the Save button top right or Ctrl/Cmd+S | covered (label obsolete) | `code-mode.md#save-your-edits` (Ctrl/Cmd+S, auto save, status bar **Save options**) | Save control is in the status bar: `lib/status_bar.dart:130` |
| 7 | View changes in GitHub Desktop or your IDE | covered | `vs-code.md#run-and-use-git-from-either-place` | |
| 8 | Commit or discard; commit often for a backup you can go back to | covered + added | `git.md#commit-your-changes` ("commit often" added) | |
| 9 | After discarding outside Nowa, reopen the project to see it | obsolete | Nowa watches the folder and reloads changed files (`packages/core/lib/src/services/local_file_service.dart:123-142,237-255`); `vs-code.md#what-syncs-and-when` | |
| 10 | Limitation: GitHub integration only for local projects; cloud "under development" | obsolete | Cloud Git exists: `git.md`, `packages/git_nowa/lib/src/network_git_service.dart` | |
| 11 | Limitation: IDE edits may not load in Nowa (in development) | obsolete | Nowa reads outside edits; what it can't read is in `limitations.md` | |
| 12 | Tips: frequent commits, branches for features and experiments, pull requests and code reviews, regular pushes as an offsite backup | added | `git.md#commit-your-changes` (commit often), `#work-with-branches` (when to branch), `#work-with-a-team` (pull requests), `#git-in-a-minute` (backup) | Pull requests: https://docs.github.com/en/pull-requests/reference/pull-requests |

## git/git-operations-cloud.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Open the Git panel from the Git icon next to Files | covered | `git.md#open-the-git-panel` | |
| 2 | A commit saves a snapshot of the project with a message, so you can track history | added | `git.md#git-in-a-minute`, `#commit-your-changes` | About Git |
| 3 | Changed files listed under **Changes**: new green, modified blue, deleted red | added | `git.md#commit-your-changes` (colors and letters A, M, D, R) | `packages/git_nowa/lib/src/git_widgets.dart:6-14`, `packages/git_nowa/lib/src/models/git_models.dart:198-205`, `packages/core/lib/src/file_system/widgets/files_widgets.dart:83-104`; colors `packages/nowa_ui/lib/src/globals/nowa_colors.dart:26,33,36` |
| 4 | Commit: Commit All, message, Commit | covered (flow changed) | `git.md#commit-your-changes` (message box, then **Commit All**) | |
| 5 | Video: a color change on the board shows up as a changed file | added (as text) | `git.md#commit-your-changes` ("every change on the board, in Details or by Nowa AI changes files") | |
| 6 | Committing doesn't push: the commit exists only in Nowa until Push or Sync | added | `git.md#commit-your-changes` | |
| 7 | Sync pulls then pushes; arrows and numbers show commits to push and pull | covered | `git.md#sync-with-github` | |
| 8 | After syncing, the commits show on GitHub with the identity you set | added | `git.md#sync-with-github`, `github.md#set-your-git-identity` | Commit email: https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address |
| 9 | Tip: the number next to Sync | covered | `git.md#sync-with-github` | |
| 10 | Manual Push or Pull from the ⋯ menu | covered | `git.md#sync-with-github` | |
| 11 | Pull brings GitHub's commits in; Push sends yours out | added | `git.md#git-in-a-minute`, `#sync-with-github` | About Git |
| 12 | Example: a teammate pushes, you pull or sync to stay up to date | added | `git.md#work-with-a-team` | |
| 13 | Discard per file (undo arrow) or all (arrow next to Changes), back to the last commit | covered | `git.md#review-or-discard-changes` | |
| 14 | Video of discarding | not useful | media | |
| 15 | Why stage: commit only part of your changes, e.g. different tasks in different commits | added | `git.md#commit-your-changes` | About Git (staging) |
| 16 | How to stage: ⋯ → Add files; ⋯ → Commit with staged and unstaged areas and arrow buttons | covered (labels updated) | `git.md#commit-your-changes` (**Add Files...**, **Create Commit**, `>>` / `<<`) | |
| 17 | Video of staging | not useful | media | |
| 18 | Tip: stage inside the commit window | covered | `git.md#commit-your-changes` (Create Commit dialog) | |
| 19 | Why branches: work on several features without touching the main version | added | `git.md#work-with-branches` | About Git |
| 20 | Create branch: branch name → Create new branch → name + From branch → Create | covered (labels updated) | `git.md#work-with-branches` (**New Branch**, **Branch Name**, **Create Branch**, starts from the current branch) | No "From branch" in 3.13: `lib/project/panels/git_panel/git_details.dart:1036`; default branch `main`: `packages/git_nowa/lib/src/local/local_git_service.dart:31` |
| 21 | Nowa switches to the new branch; new commits go there | covered | `git.md#work-with-branches` | |
| 22 | A new branch is only in Nowa until you Sync it to GitHub | covered | `git.md#sync-with-github` (**Publish Branch**) | |
| 23 | Video: switching back to master hides the new screen, branches keep changes apart | added | `git.md#work-with-branches` (the board shows the branch you're on) | `packages/git_nowa/lib/src/git_manager.dart:643-651,828-845` |
| 24 | Can't switch with unsaved changes: commit or discard first | obsolete | Changes now come along ("Bring my changes"): `lib/project/panels/git_panel/git_details.dart:961-1060`; covered in `git.md#work-with-branches` | |
| 25 | Delete a branch: only in Nowa, not on GitHub; delete it on GitHub yourself | covered + added | `git.md#work-with-branches` ("The remote branch stays", GitHub steps added) | https://docs.github.com/en/pull-requests/how-tos/commit-changes/managing-branches-within-your-repository |

## git/token-github.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Why connect GitHub: clone into Nowa, export cloud projects, push/pull/commit | covered | `github.md` intro | |
| 2 | You authenticate once so Nowa can reach your repositories | covered | `github.md#connect-github` | |
| 3 | "Connect to Gitub" button, recommended, replaces tokens | covered (label now **Connect GitHub**) | `github.md#connect-github` | `packages/core/lib/src/settings/github_integration_settings.dart:86-115` |
| 4 | What happens on GitHub when you approve (not in old page, needed to follow the flow) | added | `github.md#connect-github` (choose repositories, then confirm; **Manage** → **Repository access** → **Save**) | GitHub App install: https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party ; modify: https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps ; Nowa side is a GitHub App installation (`packages/git_nowa/lib/src/github_oauth/github_oauth_models.dart:1-32`, "Resource not accessible by integration" `github_oauth_service.dart:66-68`) |
| 5 | Personal access tokens are legacy | covered | `github.md#legacy-remote-credentials` | |
| 6 | Create a token on GitHub: profile picture → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token | added | `github.md#legacy-remote-credentials` | https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens |
| 7 | Video: generating a token | not useful | media (old UI) | |
| 8 | Token name, optional description, expiration; an expired token breaks the connection and needs a new one | added | `github.md#legacy-remote-credentials` | Expiry: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation |
| 9 | Repository access: public, selected or all repositories | added | `github.md#legacy-remote-credentials` (**Only select repositories**, or all) | Only "Only select repositories" confirmed as a label; the rest described without bold |
| 10 | Permissions: Contents → Read and write (clone, commit, pull, push) | added | `github.md#legacy-remote-credentials` | Labels confirmed on https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely ("Repository permissions", "Read and write"); `contents` read/write in the PAT permission table; GitHub's "Push access to repositories" template is `contents=write` |
| 11 | Click Generate token | added | `github.md#legacy-remote-credentials` | |
| 12 | Copy the token right away (shown once) | added (reworded) | `github.md#legacy-remote-credentials` ("copy it now and keep it like a password") | "Shown only once" not found in the docs pages fetched, so not stated |
| 13 | Add the token in Nowa: Settings → Git → Remote credentials + → Username, Access token → Add credentials | covered (labels updated) | `github.md#legacy-remote-credentials` (**Legacy Remote Credentials** → **Add Credentials** → **Set Git Credentials**) | `packages/core/lib/src/settings/git_settings.dart:221-330,398-495` |
| 14 | Video: adding the token | not useful | media | |
| 15 | One credential at a time; a new one replaces the old | covered (behavior changed) | `github.md#legacy-remote-credentials` (delete the saved one first) | `git_settings.dart:293-316` |
| 16 | Local projects need no authentication; use git, VS Code or GitHub Desktop | obsolete (first half) / covered (second half) | Local Git panel uses GitHub Integration, **External Local Credentials** or SSH: `github.md#local-credentials-and-ssh`, `packages/git_nowa/lib/src/local/local_git_service.dart:289-349`; other tools: `vs-code.md#run-and-use-git-from-either-place` | |
| 17 | "You're ready" | not useful | filler | |
| 18 | (needed for teams) Fine-grained tokens can't push to someone else's repository where you're only a collaborator; use a classic token with `repo` | added | `github.md#legacy-remote-credentials` | PAT page: fine-grained gaps and classic steps ("select repo") |

## git/clone-from-cloud.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Local projects: clone a GitHub repo locally and open it, or create a local repo and push it | covered | `import.md#clone-from-github` (**Local-only**), `import.md#import-a-project-from-a-folder`, `github.md#connect-a-repository` | |
| 2 | Why clone into the cloud: work anywhere, deploy, share web versions, one-click deploys | covered | `get-started/cloud-and-local.md#the-difference-at-a-glance` | The "12-hour" web version figure belongs to the publish/test pages (B11/B12); `publish/web.md` shows **Expires In:** |
| 3 | Steps: authenticate, copy the HTTPS link, Cloud Projects → New Project → Clone from GitHub, paste, confirm | obsolete (flow) / covered | No URL field: `lib/dashboard/create_new_project/github_clone_dialog.dart:199-315`; `import.md#clone-from-github` | |
| 4 | The cloud project stays linked to the repository: commit, push, pull, branches right away | added | `import.md#clone-from-github` ("stays connected, so Sync works right away") | Clone keeps `origin`: `packages/git_nowa/lib/src/local/local_git_service.dart:125-131` (git clone), cloud clone `start_project_provider.dart:97-105` |
| 5 | Push a cloud project: create a new repository on GitHub (New repository, name, visibility) | covered + added | Nowa creates it: `github.md#connect-a-repository`; GitHub-side steps for the token route (empty repository, no README) added in `github.md#connect-a-repository` | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository ; About Git ("Do not initialize the repository with a README, .gitignore or License file") |
| 6 | Git icon → Create Git Repository | covered | `git.md#open-the-git-panel` | |
| 7 | Manage Remotes: remote name `origin`, Remote URL ending in `.git`, Add Remote | obsolete (labels) / covered | **Add Existing Repository** → **Repository URL** → **Connect Repository**, always `origin`: `git_remote_details.dart:156-257`; `github.md#connect-a-repository` | |
| 8 | Set identity in the Git panel settings; it's for commit attribution only, doesn't have to match your account, GitHub displays it | covered + added | `github.md#set-your-git-identity` (what it's for, use your GitHub email to link commits) | GitHub commit email page |
| 9 | Without identity, Nowa asks on first sync | covered (changed: asks on commit) | `git.md#commit-your-changes`, `github.md#set-your-git-identity` | `git_details.dart:636-641` |
| 10 | After creating a repository, every file shows as a change; commit them ("init") | added | `git.md#open-the-git-panel` | **Create Git Repository...** only initialises (`git_manager.dart:451-463`); new projects commit "Initial commit" for you (`:209-227`) |
| 11 | Sync to push | covered | `git.md#sync-with-github` | |
| 12 | Videos | not useful | media | |
| 13 | Team use cases: designers on UI, developers on branches, PMs testing and sharing | added (one line) | `git.md#work-with-a-team` | Partly marketing; kept the branch-per-person idea |
| 14 | Next: branching, merging, pulling, resolving conflicts | covered | `git.md#work-with-branches`, `#resolve-conflicts` | |

## hybrid-approach/intro-hybrid-approach.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Hybrid approach: build visually and code in your IDE on a local project, in sync | covered | `vs-code.md` intro | |
| 2 | One local folder open in Nowa, VS Code, a simulator and other tools at once | covered | `vs-code.md`, `test/devices.md` | |
| 3 | Build visually while coding; changes show everywhere; switch any time | covered | `vs-code.md#what-syncs-and-when` | |
| 4 | Needs local projects (desktop) and a "Premium Plan" | covered | `local-projects.md#before-you-start` (desktop needs a plan that includes it; no plan names, D3) | `lib/router.dart:76-81` |
| 5 | Custom code in cloud projects via the `code` chip bottom left | obsolete (label) / covered | `<>` button in the top bar: `code-mode.md#open-code-mode` | |
| 6 | Setup: install desktop, create local project, open it in your IDE (VS Code, Android Studio) | covered + added | `vs-code.md#before-you-start`, `#open-the-project-in-vs-code`; other editors (Android Studio, IntelliJ) added | Local project = normal Flutter folder |
| 7 | Advantages: instant sync; Git (commit, push, discard, branches); simulators with hot reload; custom functions, classes, widgets | covered | `vs-code.md#what-syncs-and-when`, `#run-and-use-git-from-either-place`, `test/devices.md`, `custom-code.md` | |
| 8 | Use AI coding tools in your IDE for custom logic | added | `vs-code.md#run-and-use-git-from-either-place` (one line) | Any tool that edits the folder; Nowa reloads saved files |
| 9 | Examples: a pub.dev map widget as a custom widget; a geolocator distance function in Circuit; a `Product` class with `formattedPrice` shown in the UI | added | `custom-code.md#ideas-for-your-own-code` | Circuit categories: `packages/core/lib/src/interpreter/suggestion.dart:462-516` |
| 10 | Medium article (practical guide) | not useful | external article written for an older UI | |

## hybrid-approach/custom-code.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | You can write custom functions, widgets, classes and expressions | covered | `custom-code.md`, `logic/expressions.md#custom-expression` | |
| 2 | You can also edit Nowa's code and it syncs back | covered | `index.md#how-code-and-design-stay-in-sync` | |
| 3 | Functions: write anywhere; in Circuit, global functions under a category named after the app, functions inside Nowa classes under "Locals"; drag the node and fill parameters | covered + added | `custom-code.md#use-your-code-in-the-visual-editor` (**PACKAGE:** category; **LOCALS** added) | `suggestion.dart:476-479`; `docs/logic/circuit.md` table |
| 4 | Widgets: Stateless/Stateful widget in its own file shows in the widget picker under "Components"; search by class name | covered (label updated) | `custom-code.md#use-your-code-in-the-visual-editor` (Library → **Project**, Ctrl/Cmd+K) | |
| 5 | Classes: become types for variables, parameters, return types; create objects in Circuit with "Create"; lists, passing between screens | covered + added | `custom-code.md#use-your-code-in-the-visual-editor` (type); **GENERAL** → **Create...** added | `suggestion.dart:168-179,509-516`; `packages/code/lib/src/providers/expr_helper.dart:13-16`; `docs/logic/actions.md` |
| 6 | Use `@CustomFunction` inside a Nowa-generated class so Nowa tells it apart from generated code | obsolete (changed) + added | 3.13 reads methods you add to its classes without any annotation (`packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1086-1135`); `@CustomFunction` on a method now keeps it as code and the board doesn't run it (`:1099-1101,2171-2178`; `declaration_hybrid.dart:28-50,124-140`): added to `custom-code.md#custom-function` | |
| 7 | Types must be recognizable; functions are black boxes in Nowa | obsolete | The board runs your functions (`custom-code.md#custom-function`, `limitations.md`) | |
| 8 | Instant preview doesn't run custom code: widgets are placeholders, functions log | obsolete | 3.13 reads and runs most code; placeholders only for what it can't read or custom-code imports: `limitations.md#what-shows-as-a-placeholder` | |
| 9 | Test custom code on simulators; cloud-only projects must publish a 12-hour web version | obsolete | **Run** compiles cloud projects too: `custom-code.md#check-the-real-result`, `test/run.md` | |
| 10 | Keep local and cloud copies in step through GitHub | covered | `git.md#move-work-between-a-cloud-and-a-local-project` | |
| 11 | Medium article | not useful | external, older UI | |

## local-project-simulator/openexisting.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Import works best with supported packages; others may not display correctly | covered | `import.md#what-to-expect-on-the-board`, `packages.md#how-nowa-loads-your-packages` | |
| 2 | Riverpod state doesn't show correctly in Circuit because Nowa uses Provider | added | `import.md#what-to-expect-on-the-board` | Global states = `provider` ChangeNotifier classes at the app root: `packages/core/lib/src/project/env_services/global_state_service.dart:22-35`, `packages/core/lib/src/state_management/global_state_suggestions.dart:70-75`; no Riverpod library in `packages/core/lib/src/interpreter/libraries/` |
| 3 | Open: dropdown next to New Local Project → Open → pick folder → Choose | obsolete (labels) / covered | Arrow next to **New project** → **Import project**: `import.md#import-a-project-from-a-folder`, `local-projects.md#add-a-project-you-already-have` | |

## local-project-simulator/othertools.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Use Git and your IDE (VS Code, IntelliJ) next to Nowa | covered + added | `vs-code.md` (IntelliJ and Android Studio named) | |
| 2 | Nowa for design and structure, IDE for deeper code; each updates the other | covered | `vs-code.md` intro, `#what-syncs-and-when` | |
| 3 | Use Git normally (commit, push, pull, switch branches); changes sync to Nowa in real time | covered | `vs-code.md#what-syncs-and-when`, `#run-and-use-git-from-either-place` | |
| 4 | Link to the Git docs | covered | links | |

## local-project-simulator/sync.md

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1 | Cloud: one-click deploys; local: deploy yourself | covered + added | `local-projects.md` "What you give up"; "build and publish it yourself with Flutter's tools" added | https://docs.flutter.dev/deployment |
| 2 | Local: simulators with hot reload, IDEs, GitHub Desktop, two-way sync; cloud: built-in previewer only | obsolete (cloud half) / covered | Cloud projects can **Run** and run on devices from the desktop app: `get-started/cloud-and-local.md` | |
| 3 | Project Sync keeps a cloud and a local copy, synced with a click | covered | `local-projects.md#link-a-cloud-copy-with-project-sync` | |
| 4 | Settings → Project Sync, create the other copy, sync | covered | same | |
| 5 | Project Sync needs the desktop app; the web app doesn't show it | covered + added | page badge; "only in the desktop app" said in the section | `packages/core/lib/src/settings/project_settings.dart` (desktop only, see notes) |
| 6 | The desktop app opens cloud projects too | covered | `get-started/cloud-and-local.md` | |
| 7 | Video (onboarding) | not useful | media | |
| 8 | Cloud to Local: Browse folder, Clone to Local | covered | `local-projects.md#link-a-cloud-copy-with-project-sync` | |
| 9 | Local to Cloud: choose workspace, Clone to Cloud | covered | same | |
| 10 | Warning: the wrong direction can overwrite your work; check before Proceed with Sync | covered | same (Sync Warning, back up first) | Reworded warmer |
| 11 | Sync from cloud or from local, direction shown, Proceed with Sync | covered | same | |
| 12 | Unlink when you linked the wrong project; confirm; then asked whether to sync | covered + obsolete | Unlink covered; the use case added; no follow-up sync question in 3.13 (`packages/core/lib/src/settings/project_sync_settings.dart:180-191,433-460`) | "Remove link" when the linked copy can't load added (`:200-209`) |

## Totals

| Old page | Items | covered | added | obsolete | not useful | dev-only | for other page |
|---|---|---|---|---|---|---|---|
| git/intro-git.md | 13 | 7 | 6 | 0 | 1 | 0 | 0 |
| git/git-local.md | 12 | 5 | 2 | 4 | 1 | 0 | 0 |
| git/git-operations-cloud.md | 25 | 13 | 9 | 1 | 3 | 0 | 0 |
| git/token-github.md | 18 | 6 | 8 | 1 | 3 | 0 | 0 |
| git/clone-from-cloud.md | 14 | 8 | 4 | 0 | 1 | 0 | 0 |
| hybrid-approach/intro-hybrid-approach.md | 10 | 5 | 3 | 0 | 1 | 0 | 0 |
| hybrid-approach/custom-code.md | 11 | 4 | 3 | 3 | 1 | 0 | 0 |
| local-project-simulator/openexisting.md | 3 | 2 | 1 | 0 | 0 | 0 | 0 |
| local-project-simulator/othertools.md | 4 | 3 | 1 | 0 | 0 | 0 | 0 |
| local-project-simulator/sync.md | 12 | 8 | 2 | 1 | 1 | 0 | 0 |
| **All** | **122** | **61** | **39** | **10** | **12** | **0** | **0** |

Counting rule: a row marked "covered + added" counts once, as `added`; "obsolete (labels) / covered" counts as
`covered` (the topic is in the docs with current labels); "obsolete (changed) + added" counts as `added`. Rows that are
fully obsolete count as `obsolete`.
