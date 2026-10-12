# Phase 13, agent c (2026-10-12): GitHub shots from the cloud

Rows: code-github-1, code-github-2, code-import-2. Live Nowa 3.13.0 (status bar `v3.13.0-79`) at `https://app.nowa.dev`,
signed in with the test account (Scale plan), using the GitHub connection the Mac session made. Work area: CDP 9373,
headless Chromium (no Xvfb), scratchpad `p13c/`. No AI prompts, no sign-in to GitHub or anything else, no github.com page
opened.

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| code-github-1 | /img/docs/code/code-github-1.png | The Git Settings page of the settings window, opened from Git under Editor Settings: GitHub Integration is connected (highlighted), with the GitHub avatar and username (blurred), 1 repositories connected and a Manage button. Below it, Legacy Remote Credentials with a Documentation link reads When GitHub Integration is enabled, legacy remote credentials are not used. | yes (3.13.0) |
| code-github-2 | /img/docs/code/code-github-2.png | The Manage Remotes dialog of a project without a remote: Create GitHub Repository with the Name field (the GitHub username, blurred, then /docs_capture_paid), Private ticked and the Create Repository button (highlighted), then the OR divider and the collapsed Add Existing Repository row (highlighted). | yes (3.13.0) |
| code-import-2 | /img/docs/code/code-import-2.png | The Clone from GitHub dialog in the web app, with the Personal workspace chip at the top: the repository list (highlighted) with Search repositories, one private repository selected (owner name blurred, then /docs-capture-repo) and the Manage your connected repositories link, then Project name filled in as docs-capture-repo, and Cancel and Clone project (highlighted). | yes (3.13.0) |

Notes on the rows:

- **code-github-1:** opened from the dashboard's **Settings** → **Git**. The project route (avatar in a project's top bar →
  **General Settings** → **Git**) opens the same window and page; I checked both. Crop: the settings window from its top
  to just below the legacy line (the rest of the window is empty), 2x, scaled to 1600 px. **Manage** was not clicked (it
  opens GitHub).
- **code-github-2:** taken in **Docs capture paid** (phase 11's project; it has no remote, and nobody had it open: it was not
  in the dashboard's recent list before or after). I only opened the **Git** panel, the **...** menu on the branch row and
  **Manage Remotes**, expanded **Add Existing Repository** after the shot to check its labels, and closed everything with
  the X and Escape. Nothing was created, connected, staged or committed. The panel first showed "DioException [bad
  response]: error reading file for hashing:" with **Retry**; **Retry** (a status reload) loaded it, as in phase 11. The
  Name field starts as the project's package name, `docs_capture_paid` (see the live check).
- **code-import-2:** the web dialog has no **Local-only** checkbox: it is drawn only in the desktop app
  (`NPlatform.isDesktop`, `lib/dashboard/create_new_project/github_clone_dialog.dart`), which the page already says. The
  row lists it as "(desktop)", so the web image shows everything else. I clicked **Cancel**: nothing was cloned, so there
  is no `Docs capture clone` project.
- **Privacy:** blurred with ffmpeg `boxblur` and checked again after blurring: the GitHub avatar and username
  (code-github-1), the username prefix in **Name** (code-github-2) and the owner part of the repository name
  (code-import-2). No email address or person's name is inside any crop.

## Not possible

None: all three rows were captured.

| id | status |
|---|---|

## Live check

Checked against `docs/code/github.md` and `docs/code/import.md` in the live UI (and the 3.13.0 source where a step can't
be run from here). Two small mismatches; the rest matched.

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| docs/code/github.md | Create or connect a repository, step 1: "check the **Name**. It starts as your project's name, after your GitHub account name." | In the project **Docs capture paid** the field reads the GitHub username, a slash and `docs_capture_paid`: the project's package name (Project Details → **Package Name**, also the second line on its dashboard card), not the name Nowa shows. Code: `_nameController.text = gProject.name`, which is `project.name`, not `friendlyName` (`git_remote_details.dart`). Because it is a package-style name, it passes the "letters, numbers, hyphens, underscores and periods" check as it stands. | "It starts as your project's package name (for example `my_app`), after your GitHub account name." |
| docs/code/import.md | Clone from GitHub, step 5: "Click **Clone project**." | **Clone project** is dimmed until you pick a repository in the list (`_canClone`). The clone itself was not run, so the timer and the project opening were not checked. | Optional: "Click **Clone project** (it turns on once a repository is selected)." |
| docs/code/import.md | Clone from GitHub, step 3: "Check the **Project name**. It starts as the repository name" | Matches: the field is empty with the hint `my-app` until you pick a repository, then shows the repository's name without the owner (`docs-capture-repo`). In code, Nowa fills it only while the field is empty (`_selectRepo`), so picking a second repository keeps the first name. Not tried live: the account has only one repository. | Optional: "If you then pick another repository, the name stays: change it yourself." |
| docs/code/github.md | Connect your GitHub account, steps 1 and 4: Settings in the dashboard sidebar, or avatar in a project's top bar → **General Settings**, then **Git** under **Editor Settings**; connected state shows avatar, username and "n repositories connected"; **Manage**. | Both routes open the settings window. The dashboard route opens on **Account Details**, then **Git** under **Editor Settings** opens **Git Settings**. The project avatar menu lists **General Settings** and **Logout**. The connected row shows the avatar, the username, "1 repositories connected" (plural even for one) and **Manage**. In a project, **Settings** (gear) → **Git** shows the same **GitHub Integration** section. | No mismatch. |
| docs/code/github.md | Create or connect a repository: "hover the branch row, click the **...** button and choose **Manage Remotes**"; the **Create GitHub Repository** form with **Private** and **Create Repository**; "Under **OR**, expand **Add Existing Repository**", the list with **Search repositories**, **Repository URL**, **Connect Repository** and the warning. | Matches. Hovering the branch row shows Refresh, the gear (tooltip **Git settings**) and **...**. The **...** menu lists **Push**, **Pull**, **Add Files...**, **Commit** and **Manage Remotes**. **Private** is ticked by default. Expanded, **Add Existing Repository** shows the warning ("Make sure the repository you select is relevant to the current project. Connecting the wrong repository may lead to the loss of your current changes."), **Search repositories**, the repository list, "Can't find your repository? **Manage your connected repositories.**", **Repository URL** and **Connect Repository**. The page's claim that **Publish Branch** / **Sync** opens **Manage Remotes** without a remote matches the code (`NoRemoteException` in `git_commands.dart`); not clicked. | No mismatch. Optional: mention the **Manage your connected repositories** link in step 2 of "connect a repository you already have" too. |
| docs/code/github.md | Set your Git identity, step 1: **Settings** (gear) → **Git**, or the branch row's **Git settings**; step 2-3: **Identity**, **Name**, **Email**, **Set Identity**. | Matches. Project **Settings** lists **Git** under General (between Packages and Constants). The page shows **Identity** (Name, Email, **Set Identity** dimmed until a field changes), **GitHub Integration** and **Legacy Remote Credentials**. | No mismatch. |
| docs/code/github.md | Use an access token instead (legacy), step 2: "Under **Legacy Remote Credentials**, click **Add Credentials**"; "While GitHub Integration is on, Nowa says ..." | With GitHub connected the section shows only "When GitHub Integration is enabled, legacy remote credentials are not used." and no **Add Credentials** button. The heading also has a **Documentation** link (to `docs.nowa.dev/git/token-github`, which `redirects.md` maps to `/code/github`). | No mismatch. Optional: "While GitHub Integration is on, **Add Credentials** is hidden and Nowa says ..." |
| docs/code/import.md | Choose how to bring it in / Clone from GitHub, steps 1, 2 and 4: the arrow next to **New project** → **Clone from GitHub**; **Search repositories** filters; **Manage your connected repositories**; the workspace chip; **Local-only** only in the desktop app. | Matches. On the web the arrow menu lists **New project** and **Clone from GitHub** (no **Import project**). The dialog reads **Clone from GitHub**, "Pick a repository to import.", with the **Personal** chip and a close button at the top. Typing `zzqq` in **Search repositories** empties the list and `capture` shows the repository. The footer has **Cancel** and **Clone project**, and no **Local-only**. | No mismatch. |

## Product notes (not doc mismatches)

- The connected row says "1 repositories connected" (`'${installation.repositoryCount} repositories connected'` in
  `github_integration_settings.dart`): no singular form.
- After I closed the settings window on the dashboard, the next click opened the "How much would you rate Nowa?" survey
  (as the Mac session saw). **Cancel** closed it; no rating was sent.

## Lasting effects

None. I created, cloned and connected nothing (no `Docs capture clone` project, no repository, no remote). I opened
**Docs capture paid** and changed nothing in it; its Git state is as phase 11 left it. The headless browser was stopped
and its profile deleted.
