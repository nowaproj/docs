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
| integrations-supabase-backend-2 (optional re-take) | `docs/integrations/supabase/backend.md`, "Set up a backend that came with a project" (embedded) | **Backend ready** after one run that applies every migration | A project with two or more migration files, freshly connected to an empty Supabase project, **Set up** clicked once | B-1 and B-4 in `_rewrite/captures/phase13/b.md` (not in the issues report yet): the run stops after the first migration, so today's image is from a second run and reads "1 migrations applied." | Re-take it, and remove the "In Nowa 3.13, a backend with two or more migrations" paragraph |

## Blocked by a missing account or decision

| id | page and spot | what it shows | set-up | why it's missing |
|---|---|---|---|---|
| publish-web-2 | `docs/publish/web.md`, "Use your own domain" (placeholder in the page) | The **DNS Records** page: **Pending**, **Verify** and the **Name** / **Type** / **Value** table with copy icons | Paid plan, the web app published, a custom domain set on it, **DNS** clicked | Needs a domain or subdomain the project owner controls. Don't click **Verify** with a domain you don't own |
| integrations-import-2 | `docs/integrations/rest-api/import.md`, "From Xano", after the numbered steps (no placeholder) | The **Import From** dialog on **Xano**: **Select an API Group** with one group imported (check mark) and one not (**+**) | **Api** → **+** → **Import from Xano**, a Xano token pasted, instance and workspace chosen | Needs a Xano account and a Metadata API token |
| troubleshooting-known-issues-1 | `docs/troubleshooting/known-issues.md`, "Firestore queries can't be tested on Windows" (no placeholder) | The dimmed **Test** section with "Testing Firestore Queries isn't possible on Windows version" | Windows desktop app, a Firebase-connected project, a query open (needs the P48 fix to open one) | Needs the Windows desktop app; also blocked by P48 |

## Text to update when the fixes ship

Pages describe Nowa 3.13.0 as shipped, with a workaround where a bug gets in the way. When a fix is released, update
the sentence named here. The full list for every issue is the table "Docs to update after each fix" in the issues
report's `README.md`; the rows below are the notes added with the local and cloud capture sessions of 12 October 2026.

| issue | pages and note to change |
|---|---|
| P117 (Figma connection) | `docs/ai/connectors.md` note "Connecting Figma doesn't work right now", `docs/account/account-settings.md` note under "Connect Figma", `docs/troubleshooting/known-issues.md#figma-connect`; then add `ai-connectors-1` |
| P48, P49 (Firestore in the designer, lists after a reload) | `docs/integrations/firebase/firestore.md`: the section "Add collections and queries in Nowa 3.13" and the Refresh notes in "Build a query" and "Use a query in your app"; `docs/integrations/firebase/connect.md` (file table); `docs/troubleshooting/known-issues.md#firebase-on-windows` (last sentence); `docs/guides/data-and-state-tips.md` (Firestore tip); then re-take `integrations-firebase-firestore-1` and `-2` |
| P156 (Firestore `add` and `doc` steps) | `docs/integrations/firebase/firestore.md`: the "In Nowa 3.13, `add` and `doc` can't be built" sentences |
| P158 (whole numbers dropped in a `double` test parameter) | `docs/integrations/firebase/firestore.md`, "Test a query" step 1 |
| P155 (reload soon after Connect Apps) | `docs/integrations/firebase/connect.md` paragraph after the steps; `docs/troubleshooting/known-issues.md#firebase-reload-after-connect` |
| P34 (expired Google sign-in disconnects on Send Test Notification) | `docs/integrations/firebase/notifications.md` warning under "Send a test notification" |
| P151 (InvalidType in the status bar) | `docs/integrations/firebase/auth.md` step 2; `docs/troubleshooting/known-issues.md#invalid-type-in-status-bar` |
| P150 (Redirect Logic row keeps **+**) | `docs/logic/router.md` steps 3 and 4; `docs/troubleshooting/known-issues.md#redirect-logic-plus` |
| P152 (Run on device list doesn't refresh) | `docs/test/devices.md`, "Run on a device" step 2 |
| P153 (Supabase authorizes each Nowa project) | `docs/integrations/supabase/connect.md`, "Each Nowa project asks you to authorize once" |
| Not in the report yet: B-1 to B-5 in `_rewrite/captures/phase13/b.md` (Set up Backend stops on the second migration, migration-history query on a new project, the "already set up" message never shows, Stripe choices not kept) | `docs/integrations/supabase/backend.md` (the "In Nowa 3.13, a backend with two or more migrations" paragraph, "no dialog opens", the **Pull failed** sentence); `docs/integrations/stripe.md` (Country Code, "Nowa saves your table and field choices") |

