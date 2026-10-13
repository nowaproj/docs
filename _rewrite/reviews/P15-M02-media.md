# P15 M02 media review: Git and GitHub

Batch: 14 items (m134 to m147). Pages owned: `docs/code/git.md`, `docs/code/github.md`, `docs/code/import.md`.

Every image and every video preview sheet was looked at. Extra frames were pulled for m136 (identity form) and m146 (seconds 14 to 33). All the old Nowa screens are from Nowa 2.0.18-beta. That editor has no icon rail on the left, a floating Outline panel, board tabs in the top bar and an "App Settings" window, so none of them match 3.13.

| id | old page | what it shows (one line) | verdict | why (one line) | where added / covering image |
|---|---|---|---|---|---|
| m134 | git/clone-from-cloud.md | GitHub repo Code > HTTPS URL copied, then old dashboard New Project > Clone from Github with a Repository URL field | PRIVACY | GitHub username readable in the repo header, the clone URL and the breadcrumb (plus a profile avatar). The Nowa part is also outdated: 3.13's Clone from GitHub is a repository list with no URL field | covered by `/img/docs/code/code-import-2.png` (import.md:64) |
| m135 | git/clone-from-cloud.md | GitHub + menu > New repository form (owner, name, Public/Private) > Create > Quick setup page | PRIVACY | GitHub username readable in the Owner field in every form frame and in the Quick setup URL and commands. Avatar shown top right. No clean segment to cut | none (github.md "Connect a repository you already have" has no picture) |
| m136 | git/clone-from-cloud.md | Old editor: Create Git Repository..., Manage Remotes (Remote Name/Remote URL), App Settings > Identity, Commit All, Sync, then the GitHub repo | PRIVACY | A personal Gmail address typed in the Identity Email field (about 18 to 19 s), the GitHub username under Remote Credentials and in the repo URL. Also outdated: 3.13 has no "Remote Name" field, and identity lives in the Git settings page | covered by `/img/docs/code/code-github-2.png` (github.md:41) |
| m137 | git/git-local.md | YouTube Short "Github Repo out of your Local Nowa project? YES" | OUTDATED | The thumbnail shows the 2.x editor (floating orange toolbar, no sidebar rail) | none |
| m138 | git/git-operations-cloud.md | Old Git panel, Changes: empty.dart A (green), empty1.dart M (blue), with arrows | OUTDATED | 2.0.18 editor: branch row with refresh/gear/... always visible, floating Outline, no icon rail. The A/M letters are explained in text, and the current panel is shown | covered by `/img/docs/code/code-git-1.png` (git.md:38) |
| m139 | git/git-operations-cloud.md | Video: edit a widget color, type a commit message, Commit All, then Sync | OUTDATED | Every frame is the 2.0.18 editor (old Details panel, top tabs, floating Outline) | covered by `/img/docs/code/code-git-1.png` (git.md:38) |
| m140 | git/git-operations-cloud.md | Old editor, "Nothing to commit" and Sync ↑2 button with an arrow | OUTDATED | 2.0.18 editor window throughout (also shows a personal avatar photo top right). The Sync ↑/↓ counts are described in git.md:67 | none needed |
| m141 | git/git-operations-cloud.md | Video: change the screen color, hover the file, discard, "Are you sure?" > Continue | OUTDATED | The dialog text is still in 3.13 (`git_commands.dart:78`), but every frame is the 2.0.18 editor | none needed (git.md:59 describes it) |
| m142 | git/git-operations-cloud.md | Video: ... menu (Push, Pull, Add Files..., Commit, Manage Remotes), Add Files dialog, Create Commit with Not Added / Added and >> | OUTDATED | Old editor in every frame, and "..." moved to a hover button on the branch row. 3.13 adds Stage file / Stage Changes hover buttons | covered by `/img/docs/code/code-git-1.png` (git.md:38) |
| m143 | git/git-operations-cloud.md | Video: branch menu > New Branch dialog (Branch Name + From Branch master) > Create Branch, then commit | OUTDATED | 3.13's New Branch has no "From Branch" picker (it is not in the code; it starts from the current branch). The branch menu now has Search branches. Old editor in every frame | covered by `/img/docs/code/code-git-2.png` (git.md:95) |
| m144 | git/intro-git.md | Diagram: Remote Repo (GitHub) linked to Cloud Repo (Nowa Cloud: one-click deployment) and Local Repo (Nowa Desktop: hot reload on simulators) | ADD | It shows exactly the setup in "Move work between a cloud and a local project": Deploy is cloud-only and Hot Reload is local-only in 3.13 (cloud-and-local.md:20, :43). It holds no Nowa UI, so nothing can go stale | git.md:140 |
| m145 | git/token-github.md | Old App Settings > Git: Identity, GitHub Integration > Connect GitHub (highlighted), Legacy Remote Credentials with a saved token | PRIVACY | GitHub username readable under Legacy Remote Credentials. Also outdated: 3.13 opens Git Settings from Editor Settings, with GitHub Integration at the top and Identity in project settings | covered by `/img/docs/code/code-github-1.png` (github.md:23) |
| m146 | git/token-github.md | Video: GitHub profile > Developer settings > Fine-grained tokens > form (name, owner, expiration, repo access, Contents: Read and write) > Generate token > token shown | PRIVACY | The person's full name and profile photo (0 to 4 s), the username in Resource owner (about 14 to 20 s), and a readable `github_pat_...` token value at the end (about 33 s). The permissions part (21 to 31 s) is also outdated: GitHub replaced the Access dropdown list with a new permissions picker on 26 Aug 2025 | none |
| m147 | git/token-github.md | Video: copy the new token on GitHub, then old Git Settings > Remote Credentials > Set Git Credentials (Username & Password) > Add Credentials | PRIVACY | Token value partly readable in the first frames, and the GitHub username typed and saved. Also outdated: 3.13 says "Legacy Remote Credentials", with Username + Access Token fields and no "Username & Password" type picker | none |

## Added

1 item: m144 in `docs/code/git.md:140`, right after the paragraph that describes the cloud + local + GitHub setup, before the numbered steps. The file stays in place (`/img/git/git-setup-explanation.png`, in repo).

No files were copied, cut or re-encoded.

## Routed

None. All items belong to M02 pages.

## Privacy report (for the orchestrator)

- GitHub username of a Nowa team member readable in m134, m135, m136, m145, m146 and m147.
- Full name and profile photo: m146 (0 to 4 s, GitHub Public profile page).
- Personal Gmail address: m136 (Identity Email field, about 18 to 19 s).
- Token value: m146 (about 33 s, `github_pat_11...` readable at full size) and m147 (first second, partly readable). These files are served live from `static/img/git/` today. If the token was ever valid, it should be revoked on GitHub. Consider deleting `generate-token.mp4` and `add-token.mp4` from `static/` (nothing in the new docs references them).
- Avatar photo in the old editor's top bar: m140 (`numberofsync.png`) and the old editor videos (small).

## Open questions

1. **github.md step 8 may be stale (text, not media).** github.md:97 says "Under **Permissions**, open **Repository permissions**, find **Contents** and choose **Read and write**." GitHub's changelog of 26 Aug 2025 ("Template URLs for fine-grained PATs and updated permissions UI") replaced that list with a new permissions picker: tabs per resource type and a search box to add permissions. The labels "Contents" and "Read and write" probably remain, but "open Repository permissions" may not match the button any more. I couldn't load the GitHub pages to confirm the new labels (docs.github.com and github.blog don't resolve from this container). The orchestrator should check the live page (signed in) and reword the step if needed. I didn't change it, because the brief says not to rewrite the page and I couldn't verify the new wording.
2. The `/img/git/*.mp4` and `*.png` files in `static/` that are now judged PRIVACY or OUTDATED are still served. Removing them is outside this pass.

## Checks

- `node scripts/check-videos.mjs`: Validated 10 video embed(s) and 10 unique MP4 file(s).
- `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Counts

ADD 1 · COVERED 0 · OUTDATED 6 · NOT USEFUL 0 · PRIVACY 7 (total 14)
