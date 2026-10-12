# Screenshots still missing

The docs are complete without these: each page describes the feature as it works once its bug is fixed, or as it works
for the people who can reach it, and readers see no gap. This list says what to capture and where, so the work can
resume when the blocking bugs are fixed or the missing accounts exist.

Product issue numbers (P…) refer to the issues report in the private repo `nowaproj/nowa`, branch
`claude/tender-pascal-quit5k`, folder `docs/platform_issues/` (`PROGRESS.md` there lists the fix PRs).

## How to add one

1. Take the capture as described in `_rewrite/CAPTURE.md` ("For each request": highlight `#F7A93A`, blur emails, names,
   usernames, avatars, keys and project refs, at most 1600 px wide) and save it as `static/img/docs/<section>/<id>.png`.
2. Add a row `| id | /img/docs/<section>/<id>.png | alt text | yes (<version>) |` to `_rewrite/captures/log.md`.
3. Where the page still has the invisible placeholder `{/* CAPTURE: id=<id> ... */}`, run
   `python3 -I _rewrite/captures/tools/embed.py` from the repo root: it swaps the placeholder for the image. Where it
   has none (marked "no placeholder" below), add `![alt text](/img/docs/<section>/<id>.png)` at the spot named.
4. Run `python3 -I _rewrite/captures/tools/to-capture.py`, set the row's status to `captured` in
   `_rewrite/captures/requests/W*.md`, remove the row here, and make the text changes listed with it.

## Blocked by product bugs

| id | page and spot | what it shows | set-up | blocked by | when it's fixed |
|---|---|---|---|---|---|
| ai-connectors-1 | `docs/ai/connectors.md`, "Connect Figma", after "Click the Figma icon again to open its menu" (placeholder in the page) | The Figma menu above the chat field: **Connected**, **Auto-approve tools** and **Turn off MCP** | Signed-in project, Figma account linked, Figma connector on, Figma icon in the chat field clicked | P117: connecting Figma fails for every account (no authorization window opens). Client part in nowaproj/nowa PR #3541; the Figma OAuth app and server settings need a person | Remove the warning "Connecting Figma doesn't work right now" in `docs/ai/connectors.md`, the note in `docs/account/account-settings.md` ("Connect Figma") and the entry `#figma-connect` in `docs/troubleshooting/known-issues.md` |
| integrations-firebase-firestore-2 | `docs/integrations/firebase/firestore.md`, "Define your collections", after the numbered steps (no placeholder) | The **Collections** editor for a collection such as `orders` with a few fields, the **Edit** panel of one field on the right, and the new Firestore panel with **Add Main Collection** | Firebase-connected cloud project, the Firestore panel open, a collection selected | P48: the 3.13.0 designer has no way to open the collections and queries; the fix (PR #3539) adds a Firestore panel. The image in the repo (`integrations-firebase-firestore-2.png`, from the local session) shows the old **Files** popup that 3.13.0 shows only through a hidden address, so it isn't used | Rewrite "Add collections and queries in Nowa 3.13" with the panel's steps (**Add Main Collection**, **Add Sub Collection**, **Add New Query**), then replace the old image file |
| integrations-firebase-firestore-1 (re-take) | `docs/integrations/firebase/firestore.md`, "Test a query" (embedded) | Same as today | Same, opened from the Firestore panel | P48: the current image is right about the editor, but its left panel is the hidden **Files** panel | Re-take it so the Firestore panel shows on the left |

## Blocked by a missing account or decision

| id | page and spot | what it shows | set-up | why it's missing |
|---|---|---|---|---|
| publish-web-2 | `docs/publish/web.md`, "Use your own domain" (placeholder in the page) | The **DNS Records** page: **Pending**, **Verify** and the **Name** / **Type** / **Value** table with copy icons | Paid plan, the web app published, a custom domain set on it, **DNS** clicked | Needs a domain or subdomain the project owner controls. Don't click **Verify** with a domain you don't own |
| integrations-import-2 | `docs/integrations/rest-api/import.md`, "From Xano", after the numbered steps (no placeholder) | The **Import From** dialog on **Xano**: **Select an API Group** with one group imported (check mark) and one not (**+**) | **Api** → **+** → **Import from Xano**, a Xano token pasted, instance and workspace chosen | Needs a Xano account and a Metadata API token |
| troubleshooting-known-issues-1 | `docs/troubleshooting/known-issues.md`, "Firestore queries can't be tested on Windows" (no placeholder) | The dimmed **Test** section with "Testing Firestore Queries isn't possible on Windows version" | Windows desktop app, a Firebase-connected project, a query open (needs the P48 fix to open one) | Needs the Windows desktop app; also blocked by P48 |
