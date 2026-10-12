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

## Open questions

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

Word count: about 2,250 including the SQL snippet, tables and alt texts. Split if it grows: move "Create a table" (and the Realtime
step) to a new page "Set up your Supabase tables", leaving this page for queries, tests and Data Builders.

Open question 3. **Create Record and Update Record may send empty columns.** The templates insert or update `data.toJson()`
(`templates/template_source_generator.dart:67-92`), and a model's `toJson` writes every field, empty ones included
(`packages/core/lib/src/interpreter/generators/json_generator.dart:173-189`, `packages/core/lib/src/interpreter/auto_blocks.dart:202-231`). Supabase stores an explicitly empty value as empty
instead of using the column's default, so a test that leaves `id` or `created_at` empty would likely be refused (for example "null value
in column "id" ... violates not-null constraint"). Not seen live, so the page doesn't say it; it steers row-adding to Nowa AI prompts
with simple inputs (like the old page's `addTask`). One live check: run `createTodos` with only a title.
