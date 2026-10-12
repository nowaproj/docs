# Phase 13, session b: Supabase backend and Stripe shots (cloud, Nowa 3.13.0-79)

Taken on 12 October 2026 (13:05 to 13:36 UTC, and 13:46 to 14:05 UTC for the follow-up row `integrations-supabase-storage-2`) on
app.nowa.dev in headless Chromium (CDP port 9372), signed in with the Nowa test account. Every image was looked at after it was saved. None needed blurring: the crops hold no email address, name, avatar,
Supabase project ref, URL or key (the Stripe **Webhook URL** row, which holds the project ref, is outside the crop).

**Project used:** `Docs capture firebase`. Its Supabase panel was not connected, but the Mac session had authorized Supabase for this
Nowa project: **Connect** went straight to "Projects in Nowa test" (docs-capture, docs-capture-empty). The only calls were the
organizations and projects lookups for this project (both 200). No OAuth start, no popup and no supabase.com request happened. A
browser-wide guard sent supabase.com, github.com and stripe.com to a dead proxy and the scripts aborted Nowa's Supabase OAuth start
call, so no Supabase page could open. It never had to block anything. Because this project worked, I didn't open Docs capture fresh,
share or local, and I didn't touch Docs capture services.

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| integrations-supabase-backend-1 | /img/docs/integrations/integrations-supabase-backend-1.png | The Set up Supabase backend dialog that opens right after connecting a project that has migration files. The message says Nowa will create the tables, edge functions and storage buckets on the Supabase project you just connected (2 migrations), and the Skip and Set up buttons are highlighted. | yes (3.13.0) |
| integrations-supabase-backend-2 | /img/docs/integrations/integrations-supabase-backend-2.png | The Backend ready dialog after Set up. Highlighted: the summary line 1 migrations applied, the reminder that the app still runs on the data it shipped with, and the setup note that auth provider settings and secrets are not included. The Done and Connect app with AI buttons are below. | yes (3.13.0) |
| integrations-stripe-2 | /img/docs/integrations/integrations-stripe-2.png | The lower half of the Stripe page in Settings with Supabase connected. Under 3. Business Table the products table is picked, and under 4. Map Fields ID Field is id, Amount Field is price and Currency is From Column with Currency Column currency (all highlighted). Below them is the Deploy Configuration button, now enabled. | yes (3.13.0) |
| integrations-supabase-storage-2 | /img/docs/integrations/integrations-supabase-storage-2.png | The bottom panel Testing downloadFile after Run. The downloaded PNG, a few colored shapes on a light background, shows as a preview with the download icon beside it and its tooltip Download image (preview and icon highlighted). On the right, Testing values reads Bucket Name files and File Path sample.png, above the Run and Edit Code buttons. | yes (3.13.0) |

How the state was made:

- **Backend files.** Code mode has no "new file" command, so I used the designer's Files panel (`?panel=files`). I added two folders
  with lib → **+** → **New Folder...**, uploaded three files with assets → **Import asset**, and moved everything with the tree's own
  **Cut** / **Paste** into `supabase/` at the project root:
  `supabase/migrations/20261012120000_docs_capture_products.sql` creates `public.products` (`id` bigint identity primary key,
  `name` text, `price` numeric, `currency` text default `usd`) and grants select to `authenticated` and all to `service_role`.
  `supabase/migrations/20261012120100_docs_capture_products_rls.sql` turns on row level security and adds the policy "Signed-in
  users can read products" (select, `authenticated`). `supabase/nowa_setup.json` holds `buckets: []` and the note that **Pull
  Backend Files** writes, because the request asks for the setup note.
  I used two migration files so that the dialog doesn't read "(1 migrations)".
- **backend-1:** I clicked **Connect** in the Supabase panel, then **Select** on docs-capture-empty. "Connecting to
  docs-capture-empty..." showed, then **Set up Supabase backend** "(2 migrations)" opened.
- **backend-2:** The first **Set up** applied the first migration and then stopped on the second with **Setup stopped** (product bug
  B-1 below). I clicked **Close** (never **Fix with AI**), then ⋮ → **Set up Backend**. It offered "(1 migrations)", and **Set up**
  ended on **Backend ready**. So the summary line reads "1 migrations applied." (B-4). I clicked **Done**, never **Connect app with
  AI**.
- **stripe-2:** **Settings** → **Integrations** → **Stripe** → **Enabled** on. One-Time was already selected. I picked Table
  `products`, ID Field `id`, Amount Field `price` and Currency **From Column** → `currency`. I entered no keys and didn't click
  **Deploy Configuration**.
- **storage-2** (follow-up, same project, still connected to docs-capture-empty):
  - **Backend files.** I took the bucket from `nowa_setup.json`, because that's where a bundle carries buckets: **Set up** creates
    them in its "Creating storage buckets" step, with the same `insert ... on conflict do nothing`. The policies went into SQL.
    Files: `supabase/migrations/20261012140000_docs_capture_files_policies.sql` adds two policies on `storage.objects` limited to
    `bucket_id = 'files'`, "Anyone can upload to files" (insert) and "Anyone can read files" (select), both for `anon, authenticated`.
    `supabase/nowa_setup.json` was replaced by one that lists the public bucket `files` (same note). I added them the same way as
    before (**Import asset**, then **Cut** / **Paste**; the old JSON was deleted with **Remove file** → **Yes**).
  - **Setup.** After the reload, ⋮ had no **Set up Backend** (see the live check), so I used ⋮ → **Change API Keys** → **Connect** →
    **Select** on docs-capture-empty. That offered "(1 migrations)", and **Set up** ended on **Backend ready** with "1 migrations
    applied, 1 storage buckets created." Then **Done**.
  - **Functions and test.** **+** → **Storage Templates** → **Upload File**, then the same for **Download File**. I ran `uploadFile` with
    Bucket Name `files`, File Name `sample.png` and File Data a 480x300 PNG of three colored shapes (5 KB, made for this, nothing
    personal); the result read `result null`. Then I ran `downloadFile` with Bucket Name `files` and File Path `sample.png`, with
    nobody signed in ("Not logged in").
  - **Shot.** At the default height the preview is cut off at the bottom, so I dragged the panel's top edge up to about y = 242. I
    hovered the download icon for its tooltip and captured the panel from its title bar to just above the status bar (2x, scaled
    to 1600 px wide).

## Not possible

None: all four rows were captured.

## Live check

backend.md and stripe.md, plus the connect steps of supabase/connect.md that I went through (Connect for an already-authorized
project, Select, connecting). For the follow-up row: storage.md "Test the functions" steps 4 to 7 and the preview paragraph, now
that a file exists.

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| docs/integrations/supabase/backend.md ("Set up a backend that came with a project", step 3) | "Nowa applies the migrations your Supabase project doesn't have yet ... It stops at the first step that fails." | That's true, but with two pending migrations the run stopped on the second: **Setup stopped**, "1 migrations applied.", "Failed on 20261012120100_docs_capture_products_rls.sql: DioException [bad response]: Failed to apply database migration: ERROR: 23505: duplicate key value violates unique constraint "schema_migrations_pkey" DETAIL: Key (version)=(...) already exists." Supabase gives each migration the current second as its version, and Nowa applies them back to back (B-1). ⋮ → **Set up Backend** again applied the one that was left and ended on **Backend ready**. | Until B-1 is fixed, add to the failure paragraph: "If **Setup stopped** says `duplicate key value violates unique constraint "schema_migrations_pkey"`, click **Close**, then ⋮ → **Set up Backend** again. Nowa carries on with the migrations that are left." |
| docs/integrations/supabase/backend.md ("Set up a backend that came with a project") | "If nothing is left to apply, Nowa says "This project's backend is already set up."" | ⋮ → **Set up Backend** with nothing left (tried twice, watched for about 2 s each time): no dialog and no message appeared. The code shows a SnackBar, but the Supabase panel has no Scaffold to draw it in (B-3). | "If nothing is left to apply, no dialog opens." Or keep the quote once B-3 is fixed. |
| docs/integrations/supabase/backend.md ("Save your backend into the project") | "If Nowa shows **Pull failed** with "This Supabase project has no migration history ..."" | Not run (not one of my rows); inferred from the code and from a 400 I saw. Before its first migration, docs-capture-empty answered Nowa's migration-history query with 400. The query names `supabase_migrations.schema_migrations`, and PostgreSQL rejects that name even inside the CASE branch that `to_regclass` is meant to skip (B-2). Pull uses the same pattern, so on a project with no history it most likely shows **Pull failed** with a raw DioException ("relation ... does not exist") instead of the friendly message. | Check with Pull on a project that has no migration history, or soften the wording: "If Nowa shows **Pull failed** because the project has no migration history ...". |
| docs/integrations/stripe.md ("Connect your table" / "Deploy the configuration") | The page doesn't say when your table and field choices are kept. | After I left Settings and opened **Stripe** again, **Table** was back to "Select a table" and **4. Map Fields** was gone. The code saves the table, the mappings and the purchase types only when you submit an API key field or click **Deploy Configuration** (B-5). | Add to "Connect your table": "Nowa keeps these choices when you click **Deploy Configuration**. If you leave the page before that, pick them again." |
| docs/integrations/stripe.md ("Turn on Stripe and add your keys", step 3) | "**Country Code** (two letters; it starts as `US`)" | Right after turning on **Enabled**, the field shows `US`. After I left the page and came back (nothing submitted), it was empty with the hint "e.g. US" (B-5). | "**Country Code** (two letters, such as `US`; check that it's filled in)". |
| docs/integrations/supabase/backend.md ("Set up a backend that came with a project") | "To run it later, click ⋮, then **Set up Backend**. The item appears when Nowa finds migration files in the project, which it checks when you connect and after you pull." | Literally true, but after I reopened the project, ⋮ listed Open Supabase, Tables, Change API Keys, Pull Backend Files and Disconnect, with no **Set up Backend**, although `supabase/migrations/` held three files and one of them was pending. It came back only after a new connect: ⋮ → **Change API Keys** → **Connect** → **Select** on the same Supabase project, which then offered **Set up Supabase backend** at once. The check runs only on connect and pull (`hasBundleCached`), not when the project opens. | Add: "After you reopen the project, connect again (⋮ → **Change API Keys** → **Connect**, then **Select** your project) to see the offer, or the item, again. Your functions stay." |
| docs/integrations/supabase/storage.md ("Test the functions", step 4) | "Click **Run**." (for `uploadFile`) | When the upload works, the result area reads `result null`. Nothing else confirms it. | Optional: "Click **Run**. When the upload works, the result reads `result null`." |
| docs/integrations/supabase/storage.md ("Test the functions", the preview paragraph) | "A downloaded image ... shows as a preview, with a download icon (tooltip **Download image**) to save it." | Matches: the PNG showed as a preview with the download icon to its right, tooltip **Download image**. But the preview (up to 400 px tall) is taller than the test panel at its default height, so the bottom of the image is cut off; it only scrolls inside the panel. | Optional: "If the preview is cut off, drag the top edge of the test panel up." |
| docs/integrations/supabase/storage.md ("Test the functions") | "The generated `uploadFile` doesn't replace existing files, so use a new **File Name** each time." | Matches. Running `uploadFile` again with `sample.png` showed, in red: "Error: BlockObject: StorageException(message: The resource already exists, statusCode: 409, error: Duplicate)". | Optional: add "... If the name is taken, the test fails with **The resource already exists**." |

Checked and matching:

- **backend.md:** **Set up Supabase backend** opens right after **Select** when the project has migration files that the Supabase
  project hasn't applied. It says how many ("(2 migrations)"), with **Skip** and **Set up**. **Setting up backend** shows the step
  ("Applying 20261012120000_docs_capture_products.sql"). **Backend ready** shows the summary line, "The app still runs on the data it
  shipped with — connect it to your new backend with the AI.", the `nowa_setup.json` note, and **Done** / **Connect app with AI**.
  **Setup stopped** names the file and the error, with **Close** / **Fix with AI**. ⋮ → **Set up Backend** is listed after
  connecting. The ⋮ menu reads Open Supabase, Tables, Change API Keys, Pull Backend Files, Set up Backend, Disconnect. **Tables**
  then listed `products` with "id, name, price, currency" (that page is headed "Supabase Setup" with a back arrow).
- **stripe.md:** The gear opens Settings with **Integrations** → **Stripe**. **Enabled** adds `flutter_stripe`: a spinner and an
  "Adding flutter_stripe..." toast show, and the sections appear at once. The page shows **1. API Keys** (Merchant Name, Country Code,
  Publishable Key) and **Purchase Types** with One-Time selected and its note. With Supabase connected it also shows Secret Key,
  Webhook URL (with a copy icon) and Webhook Secret, then **2. Payment Methods** (Apple Pay, Google Pay). **3. Business Table** has a
  **Table** dropdown ("Select a table") and the refresh icon. **4. Map Fields** appears after a table is picked: ID Field, Amount
  Field, then Currency with **From Column** selected at first, **Fixed Value**, and **Currency Column**. **Deploy Configuration** is
  dimmed until ID, Amount and the currency column are set, then turns orange.
- **supabase/connect.md** (connect steps): **Connect** in a Nowa project that was authorized before skips the browser step and shows
  "Projects in Nowa test" right away ("Each Nowa project asks you to authorize once" matches). The list reads "Choose an existing
  project or create a new one:", has **Create New Project**, and shows cards with **Select**, Status: Active, Region and Created
  (day/month/year), with **Change organization** and **Cancel** at the bottom. "Connecting to docs-capture-empty..." comes next, then
  the backend offer, then the panel lists Generate a Query and Authentication ("Not logged in") with signIn, signUp and signOut
  (AUTH badges). `supabase_flutter` was added to `pubspec.yaml` and `lib/integrations/supabase_service.dart` was created. Notes for
  crops: while the dialog is open the panel shows "Authorizing..."; right after connecting, the status bar shows "Failed to
  recompile application." and then "Unsupported operation: Unsupported invalid type InvalidType(<invalid>) ..." while Problems shows
  0 errors and 0 warnings (the NB-4 family).
- **Follow-up (storage-2):**
  - **storage.md steps 5 to 7:** `downloadFile` opens **Testing downloadFile** with **Bucket Name** and **File Path** (both `null`).
    Typing the values (Enter after each) and **Run** downloaded the file.
  - **storage.md, Before you start ("Storage policies that allow what you test, even in a public bucket"):** with an insert and a
    select policy for `anon, authenticated` on the bucket, both tests worked with nobody signed in. I didn't test `downloadFile`
    without the select policy, so whether a public bucket needs it (agent a's open question) is still open.
  - **backend.md:** **Backend ready** lists buckets too: "1 migrations applied, 1 storage buckets created." The bucket came from
    `nowa_setup.json`, as the page describes ("creates the storage buckets that don't exist yet"). Plurals are B-4.
  - **connect.md, ⋮ → Change API Keys** ("Opens **Connect** and **Use Keys** again ... Your functions stay"): it opens a page headed
    **Supabase Setup** ("Supabase" with **Connected**, then **Connect** and **Use Keys**). After **Connect** → **Select** on the same
    project, signIn, signUp and signOut were still there.

## Product bugs found (for the issues report)

- **B-1** Set up Backend fails on the second of several migrations: "duplicate key value violates unique constraint
  "schema_migrations_pkey"". Supabase's `POST /v1/projects/{ref}/database/migrations` gives each migration the current second as
  its version, and `SbBackendBundleService.setupBackend` applies the pending files back to back
  (`packages/data/lib/src/supabase/migrations/sb_backend_bundle_service.dart`). Every bundle with two or more migrations is likely to
  stop after the first. Fix: send the file's timestamp prefix as the version if the endpoint accepts one; otherwise space the calls
  at least a second apart.
- **B-2** The migration-history queries (`_fetchAppliedMigrations`, `_fetchMigrationHistory`) fail with 400 on a Supabase project
  that has no migration history. The `case when to_regclass(...) is null` guard doesn't stop PostgreSQL from resolving
  `supabase_migrations.schema_migrations` in the other branch. Effects: `pendingMigrationsFor` falls back to "everything is pending"
  (fine for an empty project, but it re-applies every migration on a project that has tables but no history), and Pull most likely
  shows a raw error instead of "This Supabase project has no migration history ...". Fix: check `to_regclass` in its own query
  first, or use a function or DO block.
- **B-3** "This project's backend is already set up." (`SbActionsMenu._setUpBackend`, `sb_outline.dart`) is never drawn.
  `ScaffoldMessenger.of(context)` inside the Supabase panel's NavigationWrapper has no Scaffold to show it in.
- **B-4** Plurals: "(1 migrations)", "1 migrations applied." (and likewise "1 edge functions deployed", "1 storage buckets created")
  in `sb_backend_setup_dialog.dart`.
- **B-5** The Stripe page keeps the table, the mappings and the purchase types only after an API key is submitted or **Deploy
  Configuration** is clicked (`StripeSupabaseService._save` in `packages/core/lib/src/integrations/stripe/services/`). Leaving the
  page drops them. Country Code reloads empty (hint "e.g. US") instead of `US`.
- **B-6** (minor) The test values of a Supabase function are cleared when you open another function's test panel, even when you
  come back to the same function: `uploadFile` showed `null` fields again after a look at `downloadFile`.
- Seen once, not a bug of mine to file: after the reload, Problems listed "'flutter_stripe' is installed but failed to load, so
  nothing it defines is available: DioException [connection error]: No response". The package analyzer
  (`package-analyzer-...run.app/analyze/flutter_stripe/14.1.0`) answered 200 when I tried it a few minutes later, so this was most
  likely a cold-start timeout. It doesn't affect the Supabase panel. Crop the status bar out of full-window shots of this project.

## Lasting effects

- **Nowa project Docs capture firebase:**
  - New folder `supabase/` with three migration files and `nowa_setup.json` (which now lists the public bucket `files`), as described
    above.
  - Supabase is now connected to **docs-capture-empty**: `supabase_flutter` in `pubspec.yaml`, `lib/integrations/supabase_service.dart`,
    the startup line in `main.dart`, and the constants `supabaseUrl` / `supabaseAnonKey`. In the follow-up I reconnected it to the
    same project (⋮ → **Change API Keys** → **Connect** → **Select**).
  - `SupabaseService` now also has `uploadFile` and `downloadFile` (Storage Templates). **Delete File** was not generated.
  - Stripe is **on**: `flutter_stripe` in `pubspec.yaml`, plus the `Stripe.publishableKey = AppConstants.stripePublishableKey;` startup
    line and its empty constants. The table and field choices were not saved (B-5). No keys were entered, nothing was deployed.
  - The project's Git panel shows the new files as added. I didn't commit anything.
- **Supabase project docs-capture-empty:**
  - Table `public.products` (empty) with row level security on, the policy "Signed-in users can read products" and the grants above.
  - The `supabase_migrations` schema now exists, with three history rows named `20261012120000_docs_capture_products`,
    `20261012120100_docs_capture_products_rls` and `20261012140000_docs_capture_files_policies`.
  - A public storage bucket `files`, created by **Set up** from `nowa_setup.json`.
  - Two policies on `storage.objects` for `anon, authenticated`, limited to `bucket_id = 'files'`: "Anyone can upload to files"
    (insert) and "Anyone can read files" (select).
  - One uploaded file, `files/sample.png` (480x300 PNG of three colored shapes, 5 KB). The second upload under the same name was
    refused (409). No edge functions or secrets were created.
- Not touched: Docs capture services and the Supabase project docs-capture. No AI prompt was sent: I never clicked **Connect app with
  AI**, **Fix with AI** or the chat. My browser on port 9372 is stopped. I started no Xvfb.
