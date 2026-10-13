# P15 M07 media review: Supabase

Batch: 37 items (m055 to m091) from the old `docs/data-connections/supabase/*` pages. Pages edited:
`docs/integrations/supabase/connect.md`, `database.md`, `storage.md`. `auth.md` and `backend.md` are unchanged.

Comparison base: the 3.13 captures `integrations-supabase-*` (log.md rows 37, 136, 142 to 150),
`get-started-editor-tour-1.png`, and the code at `/home/user/nowa-master` (`project_selection_dialog.dart`,
`auth_dialog.dart`, `template_category_view.dart`). Every Nowa screen in this batch comes from 3.0.2 to 3.0.11 beta. They all
show the old top bar (BETA chip, Feedback, Upgrade, avatar), and most also show the old Supabase panel (a **Fetch Tables**
section where 3.13 has **Generate a Query** with **+**, or the removed AI "Generate a query" popup) or the old Files sidebar
and floating Outline. So only the Supabase dashboard footage survives.

## Items

| id | old page | what it shows (one line) | verdict | why (one line) | where added / covering image |
|---|---|---|---|---|---|
| m055 | auth.md | AI Assistant builds login, logged-in and sign-up pages from a prompt, then Play | OUTDATED | Old chat field (Attach, "3/5 messages used"), old top bar, Library with Page/Component tabs; the 3.13 chat has Agent/thinking chips and Add context | - |
| m056 | auth.md | Testing signUp: typing email and password, Run, result tree | OUTDATED | Panel has the old **Fetch Tables** section, lowercase `email`/`password` fields, old top bar | integrations-supabase-auth-1.png covers the test |
| m057 | auth.md | Adding two Text Fields and a button, renaming controllers | OUTDATED | Old editor (floating Outline, old widget search popup, top bar) | - |
| m058 | auth.md | New Empty Page dialog and a "Successfully logged in" text | OUTDATED | Old Files sidebar and New Empty Page dialog, old top bar | - |
| m059 | auth.md | Circuit: onPressed → SupabaseService signIn, linking Email/Password | OUTDATED | Old Circuit menus (SUPABASE group, old Link popup), old editor | - |
| m060 | auth.md | onValue → Navigator push to Loggedin | OUTDATED | Old Circuit and editor | - |
| m061 | auth.md | onError → showDialog with an "Error" text | OUTDATED | Old Circuit and editor | - |
| m062 | auth.md | Sign-out button → signOut → Navigator | OUTDATED | Old Circuit and editor | - |
| m063 | auth.md | Play: wrong login shows Error, right login opens Loggedin | OUTDATED | Old Play mode panel and editor | - |
| m064 | connect-supabase.md | Connect → Waiting for Authorization (0 to 2.9 s, old editor), then Supabase's "Authorize API access for Nowa" page: permissions, organization "Nowa test", **Authorize Nowa** | ADD (cut) | The Supabase part is a clean, self-contained clip of step 3; the page has no picture of it; the Authorize Nowa page was live-checked in phase 13 (`captures/phase13/local.md:134`) | connect.md:41, inside step 3 |
| m065 | connect-supabase.md | Create New Supabase Project dialog filled in, Create Project | COVERED | Same dialog shown current in integrations-supabase-create-1.png (the old default name `nowa-project-<number>` is now the package name plus `-backend`) | integrations-supabase-create-1.png (connect.md:69) |
| m066 | connect-supabase.md | "Select Supabase Project" dialog, Select an existing project, old panel after | OUTDATED | 3.13 dialog has no "Select Supabase Project" title and adds **Change organization** (`project_selection_dialog.dart:94-133`); ends on the old Fetch Tables panel | - |
| m067 | connect-supabase.md | Still of the same Select Supabase Project dialog | OUTDATED | Same as m066 | - |
| m068 | connect-supabase.md | Use Keys: copying URL and anon key from Supabase's Connect dialog and pasting them | PRIVACY | Readable Supabase project ref (in `https://<ref>.supabase.co`, Supabase dialog and the Nowa API Url field) and the full anon key (`eyJ...`), frames 3 to 8 | - |
| m069 | connect-supabase.md | Panel after connecting: signIn, signUp, signOut | OUTDATED | Old Fetch Tables panel and top bar | integrations-supabase-connect-2.png shows the 3.13 panel |
| m070 | db.md | Supabase dashboard: open project, **SQL Editor**, run todos table + policies ("Success. No rows returned"), **Table Editor** shows `todos` | ADD | Third-party flow that matches the "In the Supabase dashboard" steps (SQL Editor, Run, Table Editor); no secrets (org "Nowa test", project name only, generic avatar) | database.md:66, after the "In plain words" paragraph, with a one-line lead-in |
| m071 | db.md | Supabase's own dashboard AI Assistant creating a todos table | NOT USEFUL | The page doesn't describe Supabase's assistant (it sends readers to Nowa AI or the SQL Editor); adding it needs new text, and that assistant's UI changes often | - |
| m072 | db.md | Table Editor → **New table**: Name, RLS checked, default id and created_at, **Save**, table created | ADD | Matches the "Prefer clicking?" paragraph (New table, Name, Save, RLS on, id/created_at added); no secrets | database.md:72, after that paragraph |
| m073 | db.md | Old AI "Generate a query" popup creates addTask | OUTDATED | The popup is gone; **+** now opens the Add Supabase Function dialog (Query Templates, Storage Templates) | - |
| m074 | db.md | Same popup creating update/mark-done/delete queries | PRIVACY | Readable personal email in "Testing as:" (last two frames, also smaller in others). Also outdated (removed popup) | - |
| m075 | db.md | Still: old panel with getProfiles/addProfile/updateProfile/deleteProfile | OUTDATED | Old Fetch Tables panel and top bar | integrations-supabase-connect-2.png |
| m076 | db.md | Still: Edit Code view, "Run Function", "Ask AI to edit the code" | PRIVACY | Readable personal email in "Testing as:" under Authentication. Also outdated (3.13 has Discard/Save/Test Function, no AI box) | - |
| m077 | db.md | Testing addTask, then the row in the Supabase Table Editor and Users list | PRIVACY | Personal email in "Testing as:" and in the Users list; the Chrome URL bar shows `supabase.com/dashboard/project/<ref>/...` (frames 6 to 8) | - |
| m078 | db.md | Testing updateTask/markTaskAsDone, checking the row in the Table Editor | PRIVACY | Same browser URL with the project ref, and "Testing as:" with the personal email | - |
| m079 | mcp.md | Still: chat field with the Supabase toggle (arrow) | OUTDATED | 3.13 chat field has the Agent and thinking chips, Add context, Supabase, Figma (ai-index-1.png); and it belongs to M09's ai/connectors page | - |
| m080 | mcp.md | YouTube "Nowa 3.4 \| Supabase MCP: Build Frontend & Backend Together" | OUTDATED | Recorded on Nowa 3.4 (title and "Dev Diary 3.4" thumbnail), as the brief says | - |
| m081 | storage.md | Supabase **Storage** → **New bucket** → name, Public bucket toggle (with the "Public buckets are not protected" note) → Create → bucket listed | ADD | Matches the "Create a bucket" steps and the policy note that follows; no secrets (org "nowa", project "nowa project test", generic avatar) | storage.md:26, after step 5 |
| m082 | storage.md | Old AI popup generates listFiles/upload/download/delete | OUTDATED | Removed popup; 3.13 uses Storage Templates with three fixed functions (no listFiles) | integrations-supabase-storage-1.png |
| m083 | storage.md | Still: old panel with listFiles/uploadFile/downloadFile/deleteFile | OUTDATED | Old panel and top bar; listFiles isn't a 3.13 template | - |
| m084 | storage.md | Testing downloadFile with a single Path field, byte list result | OUTDATED | Old panel; 3.13 has Bucket Name + File Path and an image preview | integrations-supabase-storage-2.png |
| m085 | streams.md | Supabase Table Editor → **Enable Realtime** → "Enable realtime for todos" dialog | OUTDATED | The page uses **Database** → **Publications** → `supabase_realtime`, which is what Supabase documents today; the Table Editor button isn't in their docs any more (P14-B10-notes.md:156-160). Text wins | - |
| m086 | streams.md | Testing getTasksStream: Streaming, Empty Result - Possible RLS Filtering | OUTDATED | Old editor and top bar | - |
| m087 | streams.md | Still: Testing getTasksStream, List of 0 items, Streaming | OUTDATED | Old editor and top bar | - |
| m088 | streams.md | Still: Testing getTasks, List of 2 items | OUTDATED | Old editor and top bar | integrations-supabase-database-2.png |
| m089 | ui.md | Adding a List View from the widget search | OUTDATED | Old widget search popup, floating Outline, old top bar | - |
| m090 | ui.md | Add Wrapper → Data Builder, Source Supabase, API → Select Supabase Functions | OUTDATED | Old Details layout; the field is now **Query** (database.md "Show the results"), old editor | - |
| m091 | ui.md | Linking a Placeholder text to `data['task']`, Play | OUTDATED | Old link popup, data editor and Play mode | - |

## Added

4 items, in 4 places:

- m064: **cut** `static/videos/supabase/1.mp4` from 2.97 s to the end (the scene change is at 2.93 s), dropping the old
  Nowa editor and keeping only the Supabase authorization page. New file
  `static/videos/docs/integrations/integrations-supabase-authorize-nowa.mp4` (5.0 s, H.264 High, level 4.0, yuv420p,
  30 fps, `+faststart`, no audio). Embedded in connect.md inside step 3, indented under the step.
- m070: `/videos/supabase/db/create.mp4` (in repo, reused as is) → database.md:66.
- m072: `/videos/supabase/db/visual.mp4` (in repo, reused as is) → database.md:72.
- m081: `/videos/supabase/storage/createbucket.mp4` (in repo, reused as is) → storage.md:26.

No files copied from the scratchpad and nothing re-encoded: the three reused files already pass (H.264 High, yuv420p,
moov before mdat).

Checks: `node scripts/check-videos.mjs` passes (15 embeds, 15 files). `python3 -I _rewrite/tools/site-checks.py` reports
1 problem, and it isn't on my pages: `docs/logic/conditions.md:24: bare <dailyGoal>` (M10's page).

## Routed

None. m079 (chat-field Supabase toggle) belongs to M09's `docs/ai/connectors.md` but is OUTDATED, so there's nothing to add.

## Privacy findings (not added)

- m068 `static/videos/supabase/connectmanual.mp4`: a Supabase project ref and the full anon key, readable in the Supabase
  Connect dialog and the Nowa API Url / Key fields.
- m074 `static/videos/supabase/db/multiquery.mp4`, m076 `static/img/supabase/editcode.png`: a personal Gmail address in
  "Testing as:".
- m077 `static/videos/supabase/db/addtask.mp4`, m078 `static/videos/supabase/db/updatequery.mp4`: the same email, plus a
  browser URL bar with `supabase.com/dashboard/project/<ref>/...`.

These files are still served live from `static/` (the old pages are gone, but anyone with the URL can open them). The
orchestrator may want to delete them or check whether anything else links to them.

## Open questions

1. m081: the Supabase dialog in the video is titled **Create storage bucket** and its button reads **Create**, while
   storage.md step 5 says **Create Bucket** (the wording in Supabase's docs, per P14-B10). That's close enough for a reader
   to follow, so I left the text as is. If someone confirms the live button is **Create**, step 5 could say "Click
   **Create**".
2. m064: the permissions list on Supabase's page may have changed a little since this 2025 recording (Supabase has been
   adding finer-grained OAuth scopes). The layout, the organization picker and **Authorize Nowa** match the phase 13 live
   check. I couldn't re-fetch supabase.com from here (DNS failed).
3. connect.md is the first page with a `<video>` indented inside a list item. The indentation follows the existing indented
   images (for example `stripe.md:95`). Please confirm it renders in the final `yarn build`.
