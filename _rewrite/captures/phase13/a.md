# Phase 13, agent a (2026-10-12): Supabase shots from the cloud

Rows: integrations-supabase-connect-2, integrations-supabase-auth-1, integrations-supabase-database-1,
integrations-supabase-database-2, integrations-supabase-storage-1, integrations-supabase-storage-2. Live Nowa 3.13.0
(status bar `v3.13.0-79`) at `https://app.nowa.dev`, signed in with the test account, only in the Nowa project
**Docs capture services** (already connected to the Supabase project `docs-capture`; status bar `docs_capture_services`).
Work area: CDP 9371, headless Chromium (no Xvfb), scratchpad `p13a/`. No AI prompts, no sign-in to Supabase or anything
else, no Supabase page opened. **Disconnect**, **Change API Keys**, **Open Supabase** and **Pull Backend Files** were not
clicked; no other project was opened.

Order of work: Query Templates → **Get All Records** on `todos` (database-1, then **Generate Function**), Storage Templates
(storage-1, then **Upload File** and **Download File**), `getAllTodos` → **Run** (database-2), `signUp` with a made-up
`docs.tester@example.com` user → `signOut` → `signIn` (auth-1), `uploadFile` / `downloadFile` (storage-2, failed, see below),
then the ⋮ menu (connect-2).

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| integrations-supabase-connect-2 | /img/docs/integrations/integrations-supabase-connect-2.png | The connected Supabase panel: Generate a Query with its plus button, Authentication reading Testing as: docs.tester@example.com above signIn, signUp and signOut (AUTH badges), Queries with getAllTodos (SELECT) and Storage with uploadFile and downloadFile (STORAGE). Beside it, the open three-dot menu (highlighted) lists Open Supabase, Tables, Change API Keys, Pull Backend Files and Disconnect. | yes (3.13.0) |
| integrations-supabase-auth-1 | /img/docs/integrations/integrations-supabase-auth-1.png | The editor after testing signIn: in the Supabase panel, Authentication reads Testing as: docs.tester@example.com (highlighted) and signIn is selected. The bottom panel Testing signIn shows the result on the left and, on the right, Testing values with Email and Password (blurred) and the Run button (highlighted), with Edit Code below. | yes (3.13.0) |
| integrations-supabase-database-1 | /img/docs/integrations/integrations-supabase-database-1.png | The Supabase Templates dialog on the Choose Model For "todos" step: under Create New Model, the Create new model class option is selected with TodosModel filled in as its name (highlighted), and the Generate Function button at the bottom (highlighted). | yes (3.13.0) |
| integrations-supabase-database-2 | /img/docs/integrations/integrations-supabase-database-2.png | The bottom panel titled Testing getAllTodos (highlighted) after Run: on the left the result, a list of 3 items, each an instance of TodosModel with id, created_at, title (Buy milk, Write docs, Walk the dog) and done. On the right, Testing values reads No parameters to test, above the Run button (highlighted) and Edit Code. | yes (3.13.0) |
| integrations-supabase-storage-1 | /img/docs/integrations/integrations-supabase-storage-1.png | The Supabase Templates dialog on Storage Templates, with Back at the top and three cards (highlighted): Upload File with the chips bucketName, fileName and fileData, Download File with bucketName and filePath, and Delete File with bucketName and fileName. | yes (3.13.0) |

Notes on the rows:

- **State checked first:** `todos` has 4 columns (`id`, `created_at`, `title`, `done`) and 3 rows. **Confirm email is off**:
  `signUp` signed the new user in at once. The `files` bucket exists (the upload got as far as the row-level security check;
  a missing bucket answers "Bucket not found"), but it has **no upload policy** (see Not possible).
- **database-1:** no **Use Existing Model** list, because the project had no models before this first generation. The
  product's own orange border on the selected option sits inside the highlight. Crop: the dialog's exact edges, 2x, scaled
  to 1600 px.
- **database-2:** `getAllTodos` ran before any sign-in (the table answers anonymous reads). The rows also list `hashCode` and
  `runtimeType` (`minified:UW`): that is how the result viewer shows a model. The round support button (**?**) sits over the
  right end of **Edit Code**: Nowa always places it at the window's lower right (`lib/project/project_page.dart:137`), so it
  is part of the real UI; the label stays readable. A first try highlighted "result List of 3 items", but the rows are 16 px
  apart and the box touched the next label, so the title is highlighted instead.
- **auth-1:** `signUp` (made-up address, generated password) → the section already read **Testing as:** → `signOut`
  (**Not logged in**) → `signIn` with the same values → shot. The **Password** field shows its value in plain text: it is
  pixelated and blurred in the image (checked zoomed in afterwards). The **Email** field shows the end of the made-up
  address. The crop leaves out the top bar (account avatar). At the end I ran `signOut` again.
- **storage-1:** taken before generating anything from it. Then **Upload File** and **Download File** were each generated
  with one click (`Function "uploadFile" generated successfully!`, dialog closed). **Delete File** was not generated.
- **connect-2:** taken while signed in as the test user, with the test panel closed and the Supabase panel reopened (the
  Authentication rows kept a stale selection highlight otherwise, see product notes). The menu was closed with Escape.
  **Set up Backend** is not in the menu (the project has no migration files), as the page says.
- **Privacy:** no Supabase project ref, URL or key, account email, person's name or avatar is inside any crop. The made-up
  `docs.tester@example.com` is visible (allowed); the test user's password is blurred. Every final image was opened again
  after saving. The response checks printed paths only, never the Supabase host.

## Not possible

| id | status |
|---|---|
| integrations-supabase-storage-2 | not-possible: the files bucket in docs-capture has no upload policy. uploadFile, run signed in as the test user with a 320x200 PNG, shows RLS Policy Error (Supabase answers 403 new row violates row-level security policy), so there is no file for downloadFile to preview. Needs the Mac session to add storage policies for authenticated users on files in the Supabase dashboard (INSERT for uploadFile, and SELECT, since downloadFile reads through the storage API rather than the public link), then a retake here |

## Live check

Checked against the current `connect.md` (edited today at 13:05), `auth.md`, `database.md` and `storage.md` in the live UI,
and the 3.13.0 source where noted. The pages match closely; the real mismatches are the sign-up step in `auth.md` and the
missing word on bucket policies in `storage.md`.

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| docs/integrations/supabase/auth.md | Test sign-up and sign-in, steps 3 and 4: "Click **Run**. Supabase creates the user." then "Click `signIn`, then repeat steps 2 and 3 ... The section now reads **Testing as:** and your email." | With email confirmation off (as in `docs-capture`), `signUp` signs the new user in at once: right after **Run** the section read **Testing as: docs.tester@example.com**, before any `signIn`. The result area shows only `result Instance of 'minified:aks'` (the response object, collapsed, with a minified class name), for `signIn` too. To see `signIn` work, I ran `signOut` first (**Not logged in**), then `signIn`. | Step 3: "Click **Run**. Supabase creates the user. If your Supabase project doesn't ask new users to confirm their email, you're signed in right away and the section reads **Testing as:** and the email." Step 4: "To test `signIn`, run `signOut` first, then click `signIn` and repeat steps 2 and 3." |
| docs/integrations/supabase/auth.md | Meet the auth functions; test steps 1, 2 and 6 | Matches. **Testing signUp** and **Testing signIn** have **Email** and **Password** (both start as `null`); **Testing signOut** reads "No parameters to test", returns `result null` and the section goes back to **Not logged in**. The **Password** field is not masked: it shows what you type. Test values are per function: the `signIn` fields start empty after `signUp`, as "repeat steps 2 and 3" implies. | No mismatch. Optional: "The **Password** field shows what you type, so use a test password." |
| docs/integrations/supabase/storage.md | Before you start: "A bucket in Supabase ... The templates don't create buckets or policies." and "If your bucket's policies need a signed-in user, sign in first." | In `docs-capture` the public bucket `files` has no upload policy: `uploadFile` failed with **RLS Policy Error** while signed in (Supabase: "new row violates row-level security policy"). A public bucket only makes files readable by link; uploads still need a policy. The page says this only after the steps ("If a test fails with **RLS Policy Error** ..."). | Add to Before you start: "Your bucket needs policies that allow what you test, even when it's public: a policy that lets users upload for `uploadFile` (and delete for `deleteFile`). See the Supabase Storage access control docs." Whether `downloadFile` also needs a read policy in a public bucket (it reads through the storage API, not the public link) could not be tested. |
| docs/integrations/supabase/storage.md | Add the storage functions, steps 1 to 3 and the table (inputs **Bucket Name**, **File Name**, **File Data** / **Bucket Name**, **File Path** / **Bucket Name**, **File Name**) | Matches. **Storage Templates** ("File operations") shows the three cards with the chips `bucketName`, `fileName`, `fileData` / `bucketName`, `filePath` / `bucketName`, `fileName`. One click generates the function, shows `Function "uploadFile" generated successfully!`, closes the dialog and lists it under **Storage** with a STORAGE badge. The test panels label the inputs **Bucket Name**, **File Name**, **File Data** and **Bucket Name**, **File Path**. | No mismatch. |
| docs/integrations/supabase/storage.md | Test the functions, step 3: "Click **File Data** and pick an image from your device. The field then shows the file's name." | Matches. The button reads **File Data** with an upload icon; the browser's file chooser opens (one file, the image picker); afterwards the button shows the name, cut short (`sampl...`), with an × to remove it. | No mismatch. |
| docs/integrations/supabase/storage.md | Test the functions, steps 5 to 7, and "A downloaded image ... shows as a preview, with a download icon (tooltip **Download image**)" | Not checked: nothing could be uploaded. The **Testing downloadFile** panel has **Bucket Name** and **File Path**; for a missing file the result area shows `Error: BlockObject: StorageException(message: {"statusCode":"404","error":"not_found","message":"Object not found","code":"NoSuchKey"}, statusCode: 400, error: null)` in red. The preview code matches the page (`func_test_section.dart:242-360`). | Recheck after the bucket policies exist (storage-2). |
| docs/integrations/supabase/database.md | Add a query from a template, steps 1 to 6 | Matches. **+** opens **Add Supabase Function** ("Choose how to create your function", **Templates**, **Query Templates** "CRUD operations", **Storage Templates** "File operations"). The dialog then becomes **Supabase Templates** ("Choose a template to get started") with **Back** and **Query Templates**. **No Tables Found** with **Fetch Tables** showed the first time in the freshly opened project although `todos` exists; **Fetch Tables** loaded it. The table step has **Search...** and `todos` "4 columns" with a **Query** chip. The model step reads **Choose Model For "todos"** ("Select an existing model or create a new one"), heading **Create New Model**, option **Create new model class** with a **New** chip; nothing is selected and **Generate Function** is dimmed until you click; then the name field shows `TodosModel`. **Generate Function** shows `Function "getAllTodos" generated successfully!`, closes the dialog and lists the function under **Queries** with a SELECT badge. | No mismatch. Optional, step 2: "The **Supabase Templates** dialog opens on **Query Templates**. If you see **No Tables Found** (it can show the first time after you open a project), click **Fetch Tables**." |
| docs/integrations/supabase/database.md | Test a function, steps 1 to 3, and the "What the result area can show" table | Matches. **Testing getAllTodos**; "Run test to see result" before **Run**; then `result List of 3 items`, each "Instance of TodosModel" with its fields. A function without inputs shows "No parameters to test" under **Testing values**. **Error:** with the message (seen for `downloadFile`) and the **RLS Policy Error** card with five steps and **Open Supabase Dashboard** (seen for `uploadFile`) look as described. | No mismatch. Optional, step 2: "If the function has no inputs, **Testing values** reads No parameters to test." |
| docs/integrations/supabase/database.md | Change a function's code: **Edit Code**, **Query Source Code**, **Discard** and **Save** after a change, **Test Function** | Matches (opened and closed without a change): **Query Source Code** with the generated `getAllTodos`, **Test Function** on the right, no **Discard** / **Save** before a change. | No mismatch. |
| docs/integrations/supabase/connect.md | Find your way around the panel: the section table, "only show up once they have a function", the badge list, "Right-click it to **Rename** or **Remove** it", the ⋮ menu table | Matches. **Queries** and **Storage** appeared only after their first function; badges read AUTH, SELECT and STORAGE; **Authentication** shows **Not logged in** or **Testing as:** and the email; right-click shows **Rename** and **Remove** (red); the ⋮ menu lists **Open Supabase**, **Tables**, **Change API Keys**, **Pull Backend Files** and **Disconnect** (red), with no **Set up Backend** in a project without migration files. | No mismatch. |
| docs/integrations/supabase/connect.md | See your tables: "Click ⋮, then **Tables**. You get a read-only list of your Supabase tables with their column names. Click the back arrow to return." | Matches, but the page that opens is headed **Supabase Setup** (it reuses the setup page's app bar: `sb_tables_page.dart:49`, `sb_setup/sb_app_bar.dart:37`), then `todos` with `id, created_at, title, done`. The back arrow returns to the panel. | Optional: "A page headed **Supabase Setup** lists your tables with their column names." |
| docs/integrations/supabase/connect.md | Docs owner's request: lead with **Create New Project** inside Nowa's connect flow, not "create the project in the Supabase dashboard first" | Already done in the current page: Before you start ("You don't need a Supabase project: Nowa can create it for you while you connect"), the line above the steps, step 4 (**Create New Project** first, **Select** as the alternative) and the dashboard route as an addition after the form. The only "create it in Supabase first" left is the **Use Keys** column of the table, which is right for keys. I did not open the connect flow (the project is connected); the form is the Mac session's `integrations-supabase-create-1`. | No change needed. |
| docs/integrations/supabase/auth.md, database.md, storage.md | Before you start: "[Connect Supabase](connect.md)." (database.md also: create the table in Supabase or with Nowa AI; storage.md: create the bucket in the Supabase dashboard or with Nowa AI) | None of the three says to create the Supabase project in the dashboard first. The table and bucket lines are right: Nowa has no table or bucket editor. | Optional, for the docs owner's point: "[Connect Supabase](connect.md) (Nowa can create the Supabase project for you while you connect)." |

## Product notes (not doc mismatches)

- `signUp` and `signIn` show `result Instance of 'minified:aks'` in the test panel: the response's class name is minified
  in the web build, so nothing readable about the user or session appears. Result rows of models also list `hashCode` and
  `runtimeType` (`minified:UW`).
- Errors carry an internal prefix: `Error: BlockObject: StorageException(...)`.
- The selection highlight of the **Authentication** rows only repaints when the sign-in state changes (`SbAuthSection` is a
  const child whose `StreamBuilder` listens to `onAuthStateChanged` only, `sb_outline.dart:54,81`): after I clicked `signIn`,
  `signOut` stayed highlighted until **Run**, and an auth row and a storage row could look selected at the same time.
- The **RLS Policy Error** card gives table steps ("Navigate to Authentication → Policies", "Review or create RLS policies for
  your table") for a storage upload too, and doesn't show Supabase's own message.
- The support button (**?**) always covers the right end of **Edit Code** in the bottom test panel.
- **Query Templates** said **No Tables Found** on first open after loading a project that has a table, until **Fetch
  Tables**.

## Lasting effects

- Nowa project **Docs capture services** (saved: the status bar's save icon showed its check mark, `files.checkIfSaved()` in
  `lib/status_bar.dart`): three new functions in `SupabaseService`, `getAllTodos`, `uploadFile` and `downloadFile`, and a new
  model class `TodosModel`. The Supabase connection is unchanged.
- Supabase project `docs-capture`: a new test user `docs.tester@example.com` (its password is only in
  `scratchpad/p13a/test-user.env`, mode 600), signed out at the end. No file was uploaded (refused by RLS); no table, row,
  bucket or policy was changed.
- The headless browser was stopped and its profile deleted. No Xvfb was started.
