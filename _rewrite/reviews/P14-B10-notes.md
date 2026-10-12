# P14-B10 notes: Supabase pages

Pages: `docs/integrations/supabase/` `connect.md`, `auth.md`, `database.md`, `storage.md`, `backend.md`. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Supabase sources were read on 2026-10-12 (the `.md` versions of supabase.com/docs pages
through curl, GitHub discussions through WebFetch). P13 facts and the deliberate bug notes (B-1 to B-5, P153) are kept as they were.

## connect.md

What changed for the reader:
- Intro rewritten in plain words: what Supabase is (a ready-made backend), and a 3-row table of its parts with everyday examples
  (tables like spreadsheets, buckets as top-level folders), each linked to its page.
- "What Nowa adds to your project" became "What Nowa sets up for you": the package, the generated file and the `main.dart` line
  moved to the for-code file (4 bullets, `#supabase`); the page now says Supabase starts when the app opens and names
  `SupabaseService` only as the place the reader picks functions from in Circuit and Data Builders (R3). One link to
  `../../code/generated-code.md#supabase`.
- RLS got its own short section, "Keep your data safe": anon key, RLS and policy explained (R4), pointing to database.md#create-a-table.
- Steps carry a reason or result (R9): what opens after each click, organization explained, when to create a new project vs select one,
  why the region matters, where to keep the database password.
- Panel: RPC and Other Functions explained (database function, Edge Function); badges explained in one paragraph; "Remove" now
  says to check no screen still uses the function; "migration files" explained in the menu table.
- Keywords: added Authorize Nowa, organization, Project URL, legacy API keys, row level security, RLS.

Added (from the old page or the brief), with evidence:
- Step 3 **Authorize Nowa** on Supabase's page: old `connect-supabase.md` ("Click the **Authorize Nowa** button"); live: "the
  Supabase "Authorize Nowa" page opened again" (`captures/phase13/local.md:134`, `CAPTURE-PHASE13.md:30-31`).
- Step 4 when to create vs select (old page "Use Cases"): `ui/sb_setup/project_selection_dialog.dart:105` (**Create New Project**),
  `:197` (**Select**).
- "Find your URL and anon key" (old page "Manually" step 3, re-derived): Project URL in the **Connect** dialog or **Integrations** →
  **Data API** (https://supabase.com/docs/guides/api: "You can find the API URL in the **Integrations > Data API** section";
  https://supabase.com/docs/guides/getting-started/api-keys: "Open your project's Connect dialog. It shows the URL and publishable key");
  URL form `https://your-project.supabase.co` (same api-keys page, `.env` example; Nowa builds `https://${project.ref}.supabase.co`,
  `supabase_oauth_manager.dart:89`). Anon key: "open the **Settings > API Keys** section of the Dashboard instead. Every key lives there,
  legacy or not" and "a long key that begins with `eyJ`, it was written for the legacy keys" (api-keys page). I couldn't confirm the
  name of the legacy-keys tab, so the page says "from the legacy keys" (the migration guide names the other tab **Publishable and
  secret API keys**, https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys). The in-app help still says "project
  settings → Data API" (`ui/sb_setup/sb_keys_setup.dart:95,121`); the page doesn't contradict it, it gives today's places.
  **Open Supabase** opens `https://supabase.com/dashboard/organizations` (`sb_keys_setup.dart:153-154`).
- "Supabase now steers you to its newer publishable key": api-keys page ("Use the publishable ... keys instead"); the new-keys note
  shows when the key contains `publishable` or `secret` (`sb_keys_setup.dart:138-140`).
- Use Keys can't read the table list (new row in "Choose how to connect", paragraph in "Connect with keys", troubleshooting row):
  Nowa reads tables from the Data API root `$url/rest/v1/` (`supabase_service.dart:48-63`) with the anon key unless the Nowa project
  is authorized, then with the `service_role` key (`supabase_manager.dart:113-137`, `supabase_oauth_service.dart:100-111`). Supabase
  changelog "Breaking Change: Removing access to OpenAPI spec via the anon key"
  (https://supabase.com/changelog/42949-breaking-change-removing-access-to-openapi-spec-via-the-anon-key): new projects from 11 March,
  all projects from 8 April (2026); the answer is `{"message":"Access to schema is forbidden", ...}`, which Nowa turns into
  "Problem with fetching tables: Access to schema is forbidden" (`supabase_service.dart:62`) and the Tables page shows as "Error
  fetching tables: …" (`ui/sb_tables_page.dart:64`). Live corroboration: connecting fires the same fetch with the anon key without
  waiting (`supabase_manager.dart:84`), which matches phase 13's "**No Tables Found** ... the first time ... **Fetch Tables** loaded it"
  in an authorized project (`captures/phase13/a.md:72`). Not seen live for a Use Keys connection: see open question 2.
- Troubleshooting "Anon key not found": legacy keys can be deactivated and re-activated in **Settings > API Keys** (migration guide,
  step 6; GitHub announcement https://github.com/orgs/supabase/discussions/29260: "You can disable and re-enable the `anon` and
  `service_role` keys"). Error text: `supabase_oauth_manager.dart:87`.
- Badges in plain words: types from the code (`block/sb_func_helper.dart:12-50`, names `:85-97`): auth methods, `.storage.`, `.rpc(`,
  `.functions.`, then `stream`/`insert`/`update`/`delete`/`select`, anything else Unknown.
- Region reason ("closest to most of your users, so your app responds faster"): old page ("closest to your users for best
  performance"); regions list `project_selection_dialog.dart:255-271`.

Kept facts (P13-verified, reworded only): every label, the two-minute timeout, per-project authorization (P153), Unavailable projects,
the form defaults, **Change API Keys** keeps functions, **Set up Backend** visibility, **Tables** page header and empty text.

Word count: about 2,100 including table cells and image alt texts. If it grows, split "Find your way around the panel" and "See your
tables" into a short "The Supabase panel" page.

### Open questions (connect.md)

1. **Supabase is retiring the anon key, and Nowa 3.13 only accepts the anon key.** Supabase: "deprecating the anon and service_role
   keys by the end of 2026" (api-keys page); the announcement's timetable says "New projects no longer have `anon` and `service_role`
   available for use" (November 2025) and "Legacy API keys will be deleted" (late 2026, TBC). Nowa reads `apiKeys['anon']` on
   **Connect** (`supabase_oauth_manager.dart:85-87`) and warns against new keys on **Use Keys**. Phase 13's projects, created for the
   docs on about 11 October 2026 (`LOCAL-SESSION.md:29`), connected and ran queries, so new projects still had a working anon key then.
   The pages describe 3.13 as shipped and only say the anon key is a legacy key. Worth a product issue: support publishable keys.
2. **Use Keys and the table list** (above) is derived from the code and the Supabase changelog, not seen live. One check: connect a
   project with **Use Keys** in a Nowa project that never used **Connect**, open ⋮ → **Tables**.

## auth.md

What changed for the reader:
- Intro and steps carry the why and the result (R9); `SupabaseService` named once as the place the reader picks functions from
  in Circuit (R3); `text`, controller, **Future Options** (signing in takes a moment) and `print` explained (R3, R4).
- No code-only facts were on this page, so nothing moved to the for-code file.
- The tip now says how to attach `SupabaseService` (old page's AI path) and links to "Give Nowa AI context".
- Keywords: confirm email, verification email, email confirmation, Site URL, Google sign-in, Skip nonce check.

Added, with evidence:
- New section "Decide whether new users confirm their email" (`{#confirm-email}`), from the old page's note ("Supabase will send you a
  verification email ... or you won't be able to log in"), made actionable:
  - "Hosted Supabase projects do this by default": https://supabase.com/docs/guides/auth/passwords ("On hosted Supabase projects, this
    is true by default"; "Change this setting on the Auth Providers page").
  - Built-in sender only to the team, a few emails an hour: https://supabase.com/docs/guides/auth/auth-smtp ("Supabase Auth will refuse
    to deliver messages to addresses that are not part of the project's team"; "the number of messages your project can send is
    limited and can change without notice"; the page gives a number, which I left out because Supabase says it can change).
  - Site URL defaults to `http://localhost:3000` and is set in **URL Configuration**: https://supabase.com/docs/guides/auth/redirect-urls
    ("Change this from `http://localhost:3000` to your production URL ... critical for email confirmations"). "The address is confirmed
    anyway": the confirmation link is Supabase's verify endpoint, which redirects afterwards
    (https://supabase.com/docs/guides/auth/auth-email-templates, `{{ .ConfirmationURL }}` =
    `https://project-ref.supabase.co/auth/v1/verify?...&redirect_to=...`); Nowa's `signUp` passes no redirect
    (`supabase_manager.dart` generated code, `signUp(email: email, password: password)`).
  - Steps: **Authentication** → **Sign In / Providers** (https://supabase.com/docs/guides/auth/general-configuration lists "Sign In /
    Providers"); the switch label **Confirm email** and its place on that page as seen live on 2026-10-12 (`captures/phase13/local.md:139`;
    the Supabase page spells it "Confirm Email"). Opening the dashboard with ⋮ → **Open Supabase**: `ui/sb_outline.dart:286-291`.
  - Custom SMTP before launch: auth-smtp page ("We urge all customers to set up custom SMTP server for all other use cases").
- Test step 3 "find it under **Authentication** → **Users**" and "delete test users later": https://supabase.com/docs/guides/auth/managing-user-data
  ("view your users on the Users page"; "delete users directly or via the management console at Authentication > Users").
- "Google" under "Other ways to sign in": the Supabase dashboard part, step by step, from
  https://supabase.com/docs/guides/auth/social-login/auth-google (Flutter (iOS and Android): "Register the Client ID in the Google
  provider page on the Dashboard. For iOS enable the `Skip nonce check` option"; "concatenate all of the client IDs with a comma but make
  sure the web's client ID is first"; iOS: "under *Client IDs*, separated by a comma"). The Nowa part links to google-sign-in.md
  (labels **iOS Client ID**, **Web Client ID** there). The provider's on/off switch label isn't in the docs, so the step says "Turn Google on".
- "Everything else": a password-reset function gets the AUTH badge (`block/sb_func_helper.dart:12-33`, `.auth.resetPasswordForEmail(`);
  Supabase supports it (passwords guide, "Resetting a password").

Kept facts (P13-verified): every test step, **Testing as:**, the Password field shows what you type, sign-up signs in at once when
confirmation is off, the 10 Circuit steps, **Authentication Template**, the router link.

## database.md

What changed for the reader:
- Intro explains tables (spreadsheets, a `todos` example), rows and queries in plain words (R4).
- Model paragraph: the file path and the `models` folders moved to the for-code file (`#models`, 2 bullets); the type names stay as
  the UI shows them, each explained: **String** (text), **int** (whole numbers), **bool** (yes or no), **dynamic** (any value) (R3).
- "Change a function's code": Nowa AI first, then "If you edit code yourself" (R5); "ordinary Dart code" moved (`#supabase`).
- "Live queries": the Dart snippet moved (`#supabase`); the step now asks Nowa AI first, with the page's one link to
  `generated-code.md#supabase` for people who code. "a Stream (data that keeps updating)" and "a Future (data that arrives once, a
  moment later)" explained (R4).
- RPC and Other Functions explained with everyday examples; `data` in the Data Builder explained.
- The old tip (create the table and the function in one prompt) became a bullet in the new Nowa AI section, so the page doesn't
  repeat itself. Admonitions: one warning.

Added, with evidence:
- "Create a table" (`{#create-a-table}`, linked from connect.md), from the old page's Step 1 and its "Other ways" (visual table,
  AI):
  - RLS and policy in plain words: https://supabase.com/docs/guides/database/tables ("Until one exists [a policy], Data API requests
    return no rows"); https://supabase.com/docs/guides/database/postgres/row-level-security ("Think of a policy as adding a `WHERE`
    clause to every query").
  - Nowa AI path: the connector can create tables, set RLS policies and apply migrations (docs/ai/connectors.md "Connect Supabase");
    approval unless **Auto-approve tools** (backend.md#nowa-ai, P13-verified); ⋮ → **Tables** (`ui/sb_outline.dart:294-303`).
  - Dashboard path: **SQL Editor**, paste, **Run** (https://supabase.com/docs/guides/getting-started/quickstarts/flutter: "copying and
    running the snippet in your project's SQL Editor ... clicking **Run**"); **Table Editor** (tables guide). The snippet follows
    Supabase's own per-person example `watchlists` in the tables guide (`id bigint generated always as identity primary key`,
    `user_id uuid not null references auth.users default auth.uid()`, policies `to authenticated using ( (select auth.uid()) = user_id )`),
    adds the grant from the RLS guide's procedure ("Grant back only the privileges the role needs ... `grant select, insert, update,
    delete on table public.reports to authenticated`"), and uses the old page's four "own todos" policies with `title`/`done` columns
    like the screenshots (`captures/phase13/a.md:23`).
  - "Prefer clicking?": tables guide, Dashboard steps (**New table**, **Name**, **Add column**, **Save**; "Leave the `id` and
    `created_at` columns as the editor created them"; "The Table Editor enables row level security for you"; lowercase and underscores).
  - Grants on newer projects: GitHub discussion "Breaking Change: Tables not exposed to Data and GraphQL API automatically"
    (https://github.com/orgs/supabase/discussions/45329: default for new projects from 30 May 2026, gradual; all existing projects on
    30 October 2026, "New tables in `public` on existing projects need an explicit grant"); https://supabase.com/docs/guides/api/securing-your-api
    ("Supabase is changing the platform default to revoke these automatic grants"; a missing grant returns `42501`, "permission denied").
    Nowa shows such errors as **RLS Policy Error**: its patterns include `permission denied for` (`ui/rls_error_widget.dart:11-32`).
- "Ask Nowa AI for other queries" (`{#ask-nowa-ai}`), the 3.13 replacement for the old Step 2 (prompt + **Generate**, now gone:
  `ui/sb_add_function_dialog.dart:26-86` offers templates only). Prompts reworded from the old examples. AI-written functions appear in
  the panel sorted by their code (`supabase_manager.dart:250-288`, `block/sb_func_helper.dart:9-50`).
- Test: copy a row's ID from the **Table Editor** (old Example 2); check changes in the **Table Editor** (old Step 3); the RLS row now
  also mentions "permission denied" (pattern above).
- Live queries step 1: **Database** → **Publications** → `supabase_realtime`, turn the table on
  (https://supabase.com/docs/guides/realtime/postgres-changes: "Go to your project's Publications settings, and under
  `supabase_realtime`, toggle on the tables you want to listen to"); "new tables start with it off"
  (https://supabase.com/docs/reference/dart/stream: "Realtime is disabled by default for new tables"). The old Table Editor button
  (**Enable Realtime**) isn't in today's docs, so I used the documented path. "Database" as the menu name comes from the page's
  address (`/dashboard/project/_/database/publications`).
- Template step 2, Use Keys note: see connect.md evidence (table list needs the authorization).

Kept facts (P13-verified): every template label and step, function names, `id` rule, regenerate replaces, "No parameters to test",
result table, **Edit Code** steps and messages, STREAM badge and **Streaming**, Data Builder steps, placeholder values on the board.

Word count: about 2,300 including the SQL snippet (about 170 words), tables and alt texts, so just past the ~2,200 mark. Proposed
split (not done): move "Create a table" and the Realtime step of "Live queries" to a new page "Set up your Supabase tables" (about
700 words), leaving this page for templates, Nowa AI queries, tests and Data Builders (about 1,600 words). Anchors would need
`#create-a-table` kept as a short pointer section or links updated in connect.md and auth.md.

Open question 3. **Create Record and Update Record may send empty columns.** The templates insert or update `data.toJson()`
(`templates/template_source_generator.dart:67-92`), and a model's `toJson` writes every field, empty ones included
(`packages/core/lib/src/interpreter/generators/json_generator.dart:173-189`, `packages/core/lib/src/interpreter/auto_blocks.dart:202-231`). Supabase stores an explicitly empty value as empty
instead of using the column's default, so a test that leaves `id` or `created_at` empty would likely be refused (for example "null value
in column "id" ... violates not-null constraint"). Not seen live, so the page doesn't say it; it steers row-adding to Nowa AI prompts
with simple inputs (like the old page's `addTask`). One live check: run `createTodos` with only a title.

## storage.md

What changed for the reader:
- Intro explains buckets (top-level folders with their own access rules) with everyday examples (R4, R9).
- "Before you start" now points to two new task sections instead of a link-out; the P13 bullet about policies in public buckets moved,
  unchanged in substance, to the start of "Let your app use the bucket".
- Circuit names explained where they first appear: `showMediaPicker` (opens the camera or photo library), **await** (wait until the
  person has picked), `first` (the first picked file), `readAsBytes` (its content), `result null` (nothing to send back) (R3).
- No code-only facts were on this page, so nothing moved to the for-code file.
- Keywords: create bucket, New Bucket, public bucket, private bucket, storage policies, public URL.

Added, with evidence:
- "Create a bucket" (`{#create-a-bucket}`, old page "Create Bucket"): **Storage** page, **New Bucket**, name, **Create Bucket**
  (https://supabase.com/docs/guides/storage/buckets/creating-buckets, "Dashboard" steps). Public vs private and "Buckets are private by
  default", use cases (profile pictures, public media, blog content; sensitive documents) and "Access control is still enforced for ...
  uploading, deleting" (https://supabase.com/docs/guides/storage/buckets/fundamentals). The docs don't name the public switch, so step 4
  describes it without a label. Opening the dashboard: ⋮ → **Open Supabase** (`ui/sb_outline.dart:286-291`).
- "Let your app use the bucket" (`{#policies}`, brief: storage policies step by step):
  - "Storage does not allow any uploads to buckets without RLS policies"; upload needs `INSERT` on `storage.objects`; example policy
    `on storage.objects for insert to authenticated with check ( bucket_id = 'my_bucket_id' )`
    (https://supabase.com/docs/guides/storage/security/access-control).
  - Permissions per function: upload "objects permissions: insert", download "select", remove "delete and select"
    (https://supabase.com/docs/reference/dart/storage-from-upload, `storage-from-download`, `storage-from-remove`); the templates use
    `uploadBinary`, `download` and `remove` (`templates/template_source_generator.dart:105-137`).
  - SQL Editor and **Run**: as in database.md. The select and delete policies use the same `bucket_id` check in a `using` clause.
- "No template covers public links ...: ask Nowa AI": template list `templates/supabase_template_definitions.dart:74-110`; a public link
  needs a public bucket (https://supabase.com/docs/reference/dart/storage-from-getpublicurl). Old use cases (Get Public URL, List Files,
  Move/Copy) come back as things to ask Nowa AI for.

Kept facts (P13-verified): template names, inputs and returns, "generated successfully" message, every test step, `result null`, the
preview and its cut-off fix, "The resource already exists", the two Circuit flows, the Network-tab tip, the AI tip. Preview image types
re-checked: `ui/func_test_section.dart:253-266`.

## backend.md

What changed for the reader:
- Intro and the "Part of a backend" table explain migrations, edge functions and buckets by what they mean for the app (R4, R9).
- "Save your backend into the project": the path table, the replace rule with paths, and "Supabase CLI layout" moved to the for-code
  file (`#supabase`); the page keeps the `supabase` folder (the dialog itself names `supabase/`, `sb_backend_pull_dialog.dart`) and
  says in plain words what's saved and what's replaced. One link to `generated-code.md#supabase`. Auth provider settings and secrets
  explained.
- "Set up a backend": `supabase/nowa_setup.json` moved (`#supabase`); the page says "the setup note that came with the backend".
- "Let Nowa AI manage your backend": RLS policies and triggers explained.
- "Disconnect": file, package and `main.dart` details moved (`#supabase`); the page says the functions are removed and Supabase no
  longer starts with the app, and what stays. Warning reworded: "you start over with sign-in, sign-up and sign-out only" (the new
  `SupabaseService` has only those, `supabase_manager.dart:194-239`: an existing class only gets `initialize` again, otherwise a new class with the three).

Added, with evidence:
- "To finish, set them up in your Supabase project": sign-in settings on **Authentication** → **Sign In / Providers**
  (https://supabase.com/docs/guides/auth/general-configuration); **Edge Function Secrets**, **Key**, **Value**, **Save**
  (https://supabase.com/docs/guides/functions/secrets, "Using the Dashboard"). The setup note text is P13-verified (`b.md:88`).
- "the project's tables weren't made through migrations": from Nowa's own message ("Recreate it through migrations and pull again",
  `migrations/sb_backend_bundle_service.dart:117-128`).
- "as Nowa suggests when it's done" (commit the folder): the pull result says "Commit them with the project: whoever copies it can now
  recreate this backend on their own Supabase." (`migrations/ui/sb_backend_pull_dialog.dart:69-114`, research `features-data.md`).

Kept facts (P13-verified, deliberate): **Pull failed** wording and the raw error (B-2), the reopen workaround (`hasBundleCached`),
"no dialog opens" (B-3), the `schema_migrations_pkey` workaround (B-1), every dialog label and button, the two images.

Addendum (database.md): the **RLS Policy Error** row now says "today's Supabase dashboard lists policies under **Database** →
**Policies**": https://supabase.com/docs/guides/api/securing-your-api ("Go to the Database > Policies page in the Dashboard") and
https://supabase.com/docs/guides/auth/general-configuration ("Policies" links to `/dashboard/project/_/database/policies`). Nowa's card
itself says "2. Navigate to Authentication → Policies" (`ui/rls_error_widget.dart:79`); see open question 4.

## Open questions (all pages)

1. Anon key retirement (connect.md, above): Nowa 3.13 accepts only the anon key; Supabase is retiring it by the end of 2026.
2. Use Keys and the table list (connect.md, above): derived from the code and Supabase's changelog; one live check settles it.
3. Create Record and Update Record may send empty `id`/`created_at` (database.md, above): one live check settles it.
   `guides/complete-app.md:149` suggests these templates for adding and editing recipes, so it matters there too.
4. Product text: the **RLS Policy Error** card's step "Navigate to Authentication → Policies" (`ui/rls_error_widget.dart:79`) doesn't
   match Supabase's docs (Database → Policies). It also shows for missing grants ("permission denied for", `:15`), where policies
   aren't the fix. The pages work around both; a product fix would be to point at Database → Policies and to mention grants.
5. Supabase's default table grants are changing (all existing projects from 30 October 2026, discussion 45329). Whether a table made in
   the Table Editor gets grants automatically isn't documented; the page tells readers what "permission denied" means and how to fix it.
   Worth a live check on a new project in November.
6. (Resolved, added) Tables made with the SQL Editor or the Table Editor leave no migration history, so **Pull Backend Files** fails on
   such a project. database.md now says so after the dashboard path and suggests asking Nowa AI to create tables through migrations:
   https://supabase.com/docs/guides/deployment/database-migrations ("Making schema changes directly on your remote database (via the
   SQL editor or Table Editor) bypasses the migration history"; history kept in `supabase_migrations.schema_migrations`). The connector
   can apply migrations (docs/ai/connectors.md; `apply_migration` in `captures/phase13/local.md:28`). Also backs backend.md's "the
   project's tables weren't made through migrations".

## For other pages

| target page (batch) | proposed text | evidence |
|---|---|---|
| `integrations/google-sign-in.md` (B08), "Before you start", Supabase bullet | "... and turn on Google as a sign-in provider in your Supabase project (steps: [Sign users in with Supabase](./supabase/auth.md#google))." | My auth.md "Google" section (heading id `google`), from https://supabase.com/docs/guides/auth/social-login/auth-google |
| `guides/complete-app.md` (B01), sign-in test step (line 64) | After "after you confirm the email if Supabase asks": "(Supabase asks by default, and its built-in email sender only writes to your Supabase team: see [Decide whether new users confirm their email](../integrations/supabase/auth.md#confirm-email))" | https://supabase.com/docs/guides/auth/passwords; https://supabase.com/docs/guides/auth/auth-smtp |
| `guides/data-and-state-tips.md` (B01), line 43 "or create them in Supabase" | Link "create them in Supabase" to `../integrations/supabase/database.md#create-a-table` | New section with the Table Editor and SQL Editor steps |
| `integrations/stripe.md` (B09), "Before you start", the table bullet | Add "See [Create a table](./supabase/database.md#create-a-table)." | Same |
| `troubleshooting/known-issues.md` (B12) | New entry "Supabase tables don't load with Use Keys": "Since April 2026, Supabase no longer gives the table list to the anon key, so with **Use Keys** the **Tables** page shows "Error fetching tables: … Access to schema is forbidden" and **Query Templates** stays on **No Tables Found**. Authorize Nowa once: ⋮ → **Change API Keys** → **Connect**, then **Select** the same project. See [Connect with keys](../integrations/supabase/connect.md#connect-with-keys)." | connect.md evidence above (code + Supabase changelog); not seen live (open question 2) |

New anchors on my pages that other pages may use: `connect.md#find-your-url-and-anon-key`, `auth.md#confirm-email`, `auth.md#google`,
`database.md#create-a-table`, `database.md#ask-nowa-ai`, `storage.md#create-a-bucket`, `storage.md#policies`. All earlier anchors stay
(`#create-a-new-supabase-project`, `#if-something-goes-wrong`, `#login-screen`, `#test-a-function`, `#edit-code`, `#live-queries`,
`#nowa-ai`, `#disconnect-supabase`); a link check over the five pages and the three pages that link into them found no broken link.
