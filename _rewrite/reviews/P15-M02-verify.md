# P15 M02 verify: Git and GitHub

Verifier for batch M02 (14 items, m134 to m147). Pages: `docs/code/git.md`, `docs/code/github.md`, `docs/code/import.md`.

## What I checked

- Read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`, the M02 report and `batch-M02.tsv`. The batch's only page change is in
  `git.md` (from the phase 15 WIP commits, diffed against `43e54e9`); `github.md` and `import.md` were untouched before this pass.
- **The one ADD (m144)**, `/img/git/git-setup-explanation.png` at `git.md:140`: looked at the image. It is a hand-drawn diagram with
  no Nowa UI: "Remote Repo (Github)" with dashed arrows to "Cloud Repo (Opened with Nowa Cloud)" (+ One-click deployment, + Accessed
  from the cloud) and "Local Repo (Opened with Nowa Desktop)" (+ Hybrid approach, + Hot reload on simulators). It matches the
  paragraph right above it ("the cloud project for **Deploy**, the local one for VS Code and your simulators, and the GitHub
  repository in the middle") and sits before the numbered steps, with no other media near it. The file exists in `static/`. Alt text
  matches what is drawn ("Hybrid approach" is rendered as "working beside your editor", which is what the paragraph means by it).
  Nothing private in it. **Confirmed.**
- **PRIVACY items** (m134, m135, m136, m145, m146, m147): looked at every preview sheet. Confirmed the GitHub username is readable
  in all six (repo header, Owner / Resource owner fields, clone URLs, Remote Credentials), plus the full name and profile photo in
  m146's first frames. I didn't re-check the token value at m146 33 s or the Gmail address in m136 frame by frame; the username alone
  rules each one out. The third-party parts are also stale: m146 shows GitHub's old permissions list (each permission with its own
  "Access: No access" dropdown), which GitHub replaced on 26 Aug 2025, and m134/m136/m145/m147 pair GitHub with the old Nowa 2.0 editor.
  No rejection overturned.
- **Nowa OUTDATED items**: checked m137 (YouTube thumbnail: floating orange toolbar of the 2.x editor), m138 (`newvschange.png`:
  `v2.0.18-beta` status bar, floating Outline, no icon rail) and m143 (preview sheet: New Branch dialog with a "From Branch" picker
  and the 2.0 editor). All three are clearly the old editor. That is 3 of 6 Nowa OUTDATED items, more than a third. Agreed.
- No COVERED items in this batch.
- **github.md step 8 (fine-grained token permissions).** GitHub's docs source (`github/docs`, `managing-your-personal-access-tokens.md`,
  fetched from raw.githubusercontent.com because docs.github.com doesn't resolve from here) now says only "Under **Permissions**,
  select which permissions to grant the token." The 26 Aug 2025 changelog ("Template URLs for fine-grained PATs and updated
  permissions UI") replaced the "Repository permissions" list with a picker: tabs per resource type and a search box to add
  permissions. Current third-party guides describe it as "+ **Add permissions**", find **Contents**, then pick **Read and write** as the
  access level. So "open **Repository permissions**" no longer matches. Reworded (see below).

## Changes

- `~` `docs/code/github.md:97`, step 8: "Under **Permissions**, open **Repository permissions**, find **Contents** and choose **Read
  and write**." → "Under **Permissions**, click **Add permissions**, find **Contents** (you can type it in the search box) and select
  it. Then set its access to **Read and write**." Reason: GitHub's new permissions picker (Aug 2025). The rest of the step is unchanged.

No media added or removed.

## Verdicts overturned

None.

## Open questions

1. **Exact button label.** "Add permissions" comes from the changelog's description and from current third-party guides; I couldn't
   open the signed-in GitHub page from this container. If the live button reads differently (for example "+ Add permissions"), adjust
   the bold label only.
2. As in the M02 report: `static/img/git/generate-token.mp4` (m146) and `add-token.mp4` (m147) are still served from `static/` with a
   readable GitHub username and a token value, and no page links them. Deleting them (and revoking the token if it was ever valid) is
   the orchestrator's or the user's call.

## Checks

- `node scripts/check-videos.mjs`: Validated 18 video embed(s) and 18 unique MP4 file(s).
- `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Counts

ADDs confirmed 1 · removed 0 · added 0.
