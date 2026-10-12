# P14-B10 coverage: old Supabase pages → new Supabase pages

Batch pages: `docs/integrations/supabase/` `connect.md`, `auth.md`, `database.md`, `storage.md`, `backend.md`.
Old pages: `_rewrite/old-docs/data-connections/supabase/` `connect-supabase.md`, `auth.md`, `db.md`, `storage.md`, `streams.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Supabase pages were read on 2026-10-12 (curl of the
`.md` versions; WebFetch for GitHub). Status after the edits (this file was written first and updated page by page).

## data-connections/supabase/connect-supabase.md

| item | status | where / evidence | note |
|---|---|---|---|
| What Supabase is: sign-up and sign-in, file storage, a Postgres database with an API, row-level security | covered | connect.md intro and its table of Supabase's parts; RLS in connect.md#keep-your-data-safe | Rewritten in plain words (tables like spreadsheets, buckets, RLS and policies explained) |
| Two ways to connect: automatically (pick or create a project in Nowa) or manually (URL and key) | covered | connect.md#choose-how-to-connect | |
| Automatic steps: Supabase icon, **Connect**, pick the organization on Supabase's page, **Authorize Nowa** | added | connect.md#connect-with-your-supabase-account step 3 | **Authorize Nowa**: old page + live check (`captures/phase13/local.md:134`, `CAPTURE-PHASE13.md:30-31`); organization explained |
| When to start a new Supabase project (clean database) vs connect an existing one (keep building on it) | added | connect.md step 4 | `project_selection_dialog.dart:105,197` |
| Create a new project: name, region closest to your users, database password, **Create Project** | covered | connect.md#create-a-new-supabase-project | Region "faster for users" reason added |
| Connect an existing project: pick it, **Select** | covered | connect.md step 4 | |
| Manual connection: Nowa gets no access to your projects and can't create one | covered | connect.md#choose-how-to-connect table | |
| Manual steps: in the Supabase dashboard copy the URL and key (old path **Connect** → App framework), then **Connect** | added | connect.md#connect-with-keys "Find your URL and anon key" | Old path now shows the publishable key, which Nowa refuses. URL: **Connect** dialog or **Integrations** → **Data API** (supabase.com/docs/guides/api); anon key: **Settings** → **API Keys**, legacy, starts with `eyJ` (supabase.com/docs/guides/getting-started/api-keys) |
| See the results live: once connected you design with real data on the board | obsolete | On the board a Data Builder shows placeholder values from the model; real data with **Play** or **Run** (database.md#show-the-results-in-your-app; show-data.md "See it on the board and in Play", verified live in `reviews/P10-live-data-pages.md:128`) | |

## data-connections/supabase/auth.md

| item | status | where / evidence | note |
|---|---|---|---|
| Your users need to sign up, sign in and sign out safely | covered | auth.md intro | |
| AI path: attach `SupabaseService` to the prompt and let Nowa AI build the login or sign-up screen | added | auth.md tip | How to attach: **+** (Add context) or `@` mention lists classes (docs/ai/context.md "Add context", "Mention a screen with @") |
| Try the AI-built screen with **Play** | covered | auth.md#login-screen step 10 | |
| Test registration: click `signUp`, type a test email and password, **Run** | covered | auth.md#test-sign-up-and-sign-in | |
| Supabase sends a verification email; click the link or you can't sign in | added | auth.md#confirm-email | Now with why and how: on by default for hosted projects (supabase.com/docs/guides/auth/passwords), built-in sender only to team addresses and a few emails an hour (supabase.com/docs/guides/auth/auth-smtp), **Authentication** → **Sign In / Providers** → **Confirm email** (supabase.com/docs/guides/auth/general-configuration; label as seen live, `captures/phase13/local.md:139`), Site URL `http://localhost:3000` (supabase.com/docs/guides/auth/redirect-urls), users list (supabase.com/docs/guides/auth/managing-user-data) |
| Login page UI: email field, password field, button | covered | auth.md#login-screen step 1 | |
| Rename the Text Field controllers (`username`, `password`) | covered | auth.md#login-screen step 2 | |
| Note: the Supabase username is the email | not useful | | Supabase signs in with the email; the new page names the controller `email` |
| Logged-in page: new screen, a Text, change text and color | covered | design/screens.md; auth.md#login-screen step 8 ("opens your home screen") | |
| Sign-in inputs: **On Pressed**, **+**, `signIn`, **Email** and **Password** from LOCALS, then `text` | covered | auth.md#login-screen steps 3-7 | `text` explained |
| Success: **onValue** → navigator → the logged-in screen | covered | auth.md#login-screen step 8 | Future Options explained |
| Error: **onError** → `showDialog` with an "Error" title | covered | auth.md#login-screen step 9 (Show snackbar); popups page has `showDialog` | |
| Sign-out button: `signOut`, then navigate in **onValue** | covered | auth.md#login-screen ("To sign people out") | |
| Try the whole flow with Play | covered | auth.md#login-screen step 10 | |

## data-connections/supabase/db.md

| item | status | where / evidence | note |
|---|---|---|---|
| What queries are: how your app fetches or changes data | covered | database.md intro | "query" explained in plain words |
| What RLS is: policies decide who can view, add, edit or delete rows | covered | database.md#create-a-table (RLS and policies explained) | |
| The four query kinds SELECT, INSERT, UPDATE, DELETE and what each is for | added | connect.md#find-your-way-around-the-panel (badges in plain words); database.md template table | `block/sb_func_helper.dart:38-50,85-97` |
| SQL examples for each kind (students table) | not useful | | The reader doesn't write SQL: templates and Nowa AI write the functions |
| Step 1: create a `todos` table with RLS and four "own rows" policies in the **SQL Editor** | added | database.md#create-a-table ("In the Supabase dashboard") | Snippet adapted: `title`/`done` like the screenshots, `user_id default auth.uid()`, a grant (new tables aren't always exposed: github.com/orgs/supabase/discussions/45329; supabase.com/docs/guides/api/securing-your-api), `(select auth.uid())` as in supabase.com/docs/guides/database/postgres/row-level-security. Nowa AI path first |
| Supabase's own AI Assistant writes the SQL (**AI Assistant**, **Run Query**, **Run**) | not useful | | Not in today's Supabase docs (only 2023-24 blog posts); Nowa AI with the Supabase connector does the same inside Nowa (database.md#create-a-table) |
| Create a table visually: **Table Editor**, **New table**, name, columns, **Save** | added | database.md#create-a-table | supabase.com/docs/guides/database/tables ("Dashboard" steps; RLS on by default) |
| Step 2: generate a query from a prompt with **+** and **Generate**, one or several at once | obsolete | **+** opens **Add Supabase Function** with **Query Templates** and **Storage Templates** only (`ui/sb_add_function_dialog.dart:26-86`, `templates/supabase_template_definitions.dart:22-110`) | The AI way now is the chat in Agent mode: added as database.md#ask-nowa-ai |
| Example prompts: "add a task for a user"; "update a task, mark it as done, and delete" | added | database.md#ask-nowa-ai | Reworded for the `todos` example |
| Each query shows an icon for its kind | covered | connect.md#find-your-way-around-the-panel (badges) | |
| Change the generated code by hand, or ask the AI | covered | database.md#edit-code (Nowa AI first) | |
| Step 3: test a query: click it, fill in the fields, run it | covered | database.md#test-a-function | Button is **Run** (`ui/func_test_section.dart:177`) |
| You must be signed in to run queries on RLS tables | covered | database.md "Before you start"; auth.md#test-sign-up-and-sign-in | |
| Check the change in Supabase's **Table Editor** | added | database.md#test-a-function | |
| Example: add the task "Buy milk" | added | database.md#ask-nowa-ai (prompt) and #test-a-function (fill in **Title**) | Test fields are built from the inputs (`func_test_section.dart:193-210`) |
| Example: update a task by copying its ID from the Supabase table | added | database.md#test-a-function | |

## data-connections/supabase/storage.md

| item | status | where / evidence | note |
|---|---|---|---|
| Supabase Storage keeps and serves files such as images, videos and documents | covered | storage.md intro | |
| What a bucket is | covered | storage.md intro and #create-a-bucket | Explained as a top-level folder with its own access rules |
| Create a bucket: **Storage**, **New bucket**, name (`user-uploads`), public or private, create | added | storage.md#create-a-bucket | supabase.com/docs/guides/storage/buckets/creating-buckets (**Storage**, **New Bucket**, **Create Bucket**); public vs private from supabase.com/docs/guides/storage/buckets/fundamentals |
| Upload: add files such as a profile picture | covered | storage.md template table and "Upload a picked image" | |
| Download: get a file to show an image or a PDF | covered | storage.md template table, tests, "Show a downloaded image" | |
| Get Public URL: a link anyone can open, for public profile pictures | covered | storage.md "Show a downloaded image" (public bucket, **Network** tab) | Prompt for a public-link function added; public bucket needed (supabase.com/docs/reference/dart/storage-from-getpublicurl) |
| List files in a bucket or folder | added | storage.md "Use the functions in your app" (ask Nowa AI) | No template (`supabase_template_definitions.dart:74-110`) |
| Move or copy files | covered | storage.md (no template; ask Nowa AI) | |
| Delete files | covered | storage.md (`deleteFile`) | |
| Generate one or several storage queries from a prompt with **+** | obsolete | Templates only (`ui/sb_add_function_dialog.dart:26-86`) | Nowa AI in the chat covers it |
| Generated storage functions show under **Storage** | covered | storage.md#add-the-storage-functions | |
| Test a storage function and run it | covered | storage.md#test-the-functions | |
| See an uploaded file with `downloadFile` | covered | storage.md#test-the-functions | |
| (Brief) Storage policies, step by step | added | storage.md#policies | No uploads without a policy (supabase.com/docs/guides/storage/security/access-control); per action: upload insert, download select, remove delete and select (supabase.com/docs/reference/dart/storage-from-upload, -download, -remove) |

## data-connections/supabase/streams.md

| item | status | where / evidence | note |
|---|---|---|---|
| Streams keep your app live: they listen for changes and update by themselves | covered | database.md#live-queries | Everyday example added |
| Turn on Realtime for the table in Supabase (old: **Table Editor** → **Enable Realtime**) | added | database.md#live-queries step 1 | Today's docs: **Database** → **Publications** → `supabase_realtime`, turn the table on (supabase.com/docs/guides/realtime/postgres-changes); Realtime is off for new tables (supabase.com/docs/reference/dart/stream) |
| Ask Nowa AI for a stream query | covered | database.md#live-queries step 2 | Example prompt added |
| Badges tell a Stream query from a Select query; click it and **Run** | covered | database.md#live-queries; connect.md badges | |
| A stream shows "Stream" and a colored border while it runs | covered | database.md#test-a-function table and #live-queries | Label is **Streaming** (`ui/func_test_section.dart:127`) |
| Picture of a non-stream query | not useful | | Media only |

## Totals

| status | count |
|---|---|
| covered | 36 |
| added | 16 |
| obsolete | 3 |
| not useful | 4 |
| dev-only | 0 |
| for other page | 0 |
| **total items** | **59** |

Extra additions not from the old pages (brief, batch notes and verification): Use Keys can't read the table list since April 2026
(connect.md, database.md); `anon` is a legacy key and where to find it (connect.md); Google provider in the Supabase dashboard (auth.md);
grants on newer Supabase projects, dashboard-made tables leave no migration history, policies under **Database** → **Policies**
(database.md); setting auth provider settings and **Edge Function Secrets** again after **Set up Backend** (backend.md). Evidence in
`P14-B10-notes.md`.
