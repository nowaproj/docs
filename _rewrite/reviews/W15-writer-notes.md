# W15 writer notes (Connect data and services: Supabase)

Batch pages: `docs/integrations/supabase/connect.md`, `auth.md`, `database.md`, `storage.md`, `backend.md`.
Sources: `research/features-data.md` (Supabase section: Connect, Use Keys, Supabase panel, Tables, Query Templates,
Storage Templates, Testing, Edit Code, Authentication, Stream queries, Pull Backend Files, Set up Backend,
Disconnect, Supabase MCP, Data Builder, Constants), `features-ai.md` (Supabase MCP, Connect app with AI), `features-logic.md`
(Circuit menus, Future Options, showMediaPicker). Code paths are relative to `/home/user/nowa-master` (v3.12.5).

A previous run saved nothing; at the start of this run none of the 5 pages existed.

Environment note: `supabase.com` is blocked by the session's egress policy (proxy answers 403 to CONNECT; recorded in
`/root/.ccr/` status). I did not route around it, so **no external Supabase docs link could be checked**. The pages
link only to `https://supabase.com` (home) and a few canonical docs URLs listed under each page; see "Unverified links".

Old Supabase pages checked for media: all `static/img/supabase/*` images and `static/videos/supabase/*` videos show the
old Nowa UI (or Nowa UI inside Supabase screen recordings), so none were reused.

## connect.md

Research: `features-data.md` sections "Connect (Supabase)", "Use Keys (Supabase)", "Supabase panel (connected)", "Tables (Supabase)",
"Supabase MCP (AI chat Supabase icon)".
Code refs relied on (spot-checked, all match the research unless noted):
- Panel is the plugin panel named `Supabase`: `packages/data/lib/src/supabase/supabase_plugin.dart:24-26`; unconnected page shows
  **Connect** / **Use Keys** (`ui/sb_setup/sb_oauth_setup.dart:69-80`); connected page is `SbOutline` (`ui/sb_panel.dart:20-28`).
  Screenshot `captures/ui-map/08-panel-supabase.png` confirms the unconnected state.
- Browser step, **Waiting for Authorization...**, 120 s timeout, "Authorization timed out. Please try again.":
  `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:44-108`; flow and "already authorized skips the browser":
  `sb_oauth_setup.dart:120-137` (`_start` tries `getOrganization()` first).
- One organization at a time (`org = orgs.first`), "No organizations found. Please create a Supabase organization first.":
  `supabase_oauth_manager.dart:64-76`; **Change organization** restarts the browser step: `sb_oauth_setup.dart:155-158`.
- Project list labels, **Select** / **Unavailable** (anything but ACTIVE_HEALTHY), **Create New Project**, form labels and defaults
  (`<name>-backend`, first region = West US (North California), password min 4, eye toggle, **Back**, **Create Project** / **Creating...**):
  `ui/sb_setup/project_selection_dialog.dart:94-231, 260-285, 339-430`.
- "Connecting to <project>..." and error dialog with **Close**: `sb_oauth_setup.dart:207-248`.
- "Anon key not found for project ...": `supabase_oauth_manager.dart:85-87`.
- **Use Keys** page labels, help text, "Already Connected", new-keys note, **Open Supabase**: `ui/sb_setup/sb_keys_setup.dart:92-158, 185-198`;
  page title **Supabase Setup**: `ui/sb_setup/sb_app_bar.dart:37`.
- What Connect writes (package, `initialize`/`signIn`/`signUp`/`signOut`, `main.dart` statement, `supabaseUrl`/`supabaseAnonKey`):
  `supabase_manager.dart:188-246`; package config `packages/core/lib/src/interpreter/packages/dart_package.dart:135-146`.
- **Change API Keys** reopens the Connect/Use Keys page (`ui/sb_outline.dart:304-315`); reconnecting keeps the class and only rewrites
  `initialize()` and the two constants (`supabase_manager.dart:194-212`), so generated functions stay.
- Panel sections, hidden-when-empty rule, **Authentication** text ("Not logged in" / "Testing as: <email or id>"): `ui/sb_outline.dart:52-111, 113-138`;
  section filters `supabase_manager.dart:250-288`; badge names (uppercased) `block/sb_func_helper.dart:94-107`, `common/request_badge.dart:19`.
- Right-click **Rename** / **Remove**: `common/data_request_tile.dart:67-71`.
- ⋮ menu items and their order, **Set up Backend** only when `hasBundleCached`: `ui/sb_outline.dart:281-346`.
- **Tables** page and messages: `ui/sb_tables_page.dart:52-79`; it refreshes on open (`fetchTables` -> `refreshTables`, `:27-45`).
- Chat Supabase icon starts the same connect flow when not connected: `packages/ai/lib/src/mcp/supabase_mcp.dart:50-66`
  (`SbAuthDialog.show(context, forceProjectSelection: false)`); keys-only connection gets "OAuth Authentication Required" (`:68-105`).
- Backend files / Pull / Set up with keys-only ask to authorize: `ui/sb_outline.dart:237-245`, `migrations/sb_backend_setup_flow.dart:23-29`.
Left out / assumptions:
- Stripe "needs Connect" follows pages.md and the research's gating line; what a keys-only user would see when deploying Stripe is an open
  question (research), so the table only says "Need **Connect**".
- I did not state that Connect fails in the playground (no account). The code throws "User not logged in" inside `_connect`
  (`sb_oauth_setup.dart:130-137`) without showing it in the UI, so the dialog just keeps waiting; I only say "you must be signed in".
- Per-project vs per-account authorization is unconfirmed (calls pass the Nowa `projectId`, `supabase_oauth_service.dart:21-24`);
  the page says "already authorized Nowa **for this project**".
- Region list (16 regions) not reproduced; only the default is named.
- **Open Supabase** (menu) only opens a URL when the Supabase URL ends in `.supabase.co` (`sb_outline.dart:261-272`); not mentioned.
- Constants page: `supabaseUrl` / `supabaseAnonKey` have no config token, so they should list under **Custom Constants**
  (`app_constants_service.dart:70-79`, `constants_settings.dart:55-70`); the page only says they can be seen and edited in Settings -> General -> Constants.

## auth.md

Research: `features-data.md` "Authentication (Supabase panel)", "Testing a Supabase function", "Connect (Supabase)" (generated functions);
`features-logic.md` "All nodes for this circuit", "Future Options", "Link <field> menu", "Show snackbar"; `features-ai.md` "Supabase MCP".
Code refs relied on:
- Generated `signIn(String email, String password)` (`auth.signInWithPassword`), `signUp(email, password)`, `signOut()`:
  `packages/data/lib/src/supabase/supabase_manager.dart:228-238`.
- **Authentication** section, "Not logged in" / "Testing as: <email or id>", lists `authMethods` = functions whose source contains `.auth.s`:
  `ui/sb_outline.dart:73-111`, `supabase_manager.dart:252`. So password-reset style functions (`.auth.resetPasswordForEmail`) would NOT be listed in any panel section
  (they match no filter), and the page says only "signs a user in, up or out".
- **Testing values**, **Run**, **Edit Code**, "Error: ..." text, `Uint8List` params use a file field: `ui/func_test_section.dart:156-247`.
- Field labels come from parameter names via `camelCaseToSpaces()` (`packages/core/lib/src/fields/block_field.dart:213-225`, `packages/core/lib/src/utils.dart:77-79`), so
  **Email**, **Password** (and **Bucket Name**, **File Name**, **File Data**, **File Path** on the storage page).
- Tests call the real Supabase client; the session is shared with the other tests ("run as this user"): `common/test_section/func_test_provider.dart:52-72`.
- Circuit steps: a singleton class (`SupabaseService`: private `_instance` + factory) is offered by the add-node menu and opens a members list:
  `packages/core/lib/src/interpreter/suggestion.dart:636-723` (`_canAddClass`, `isSingleton`, `ClassAccessSuggestions`), `packages/core/lib/src/fields/link_menu.dart:129-161`.
  The menu search matches the entry name (`link_menu.dart:85-88`). Not verified in the running app which category holds `SupabaseService`; the page only says "search for".
- Text Field gets its own controller variable automatically when added (`TextFieldConnector`, `packages/core/lib/src/interpreter/widget/text_field_info.dart:10-37`,
  `widget_blocks.dart:195-199`, name via `generateSymbolName` -> `text`, `text1`...: `packages/core/lib/src/file_system/naming.dart:125-152`); Variables panel lists all instance variables
  (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:336`). Linking: click the label, **LOCALS**, controller, `text` (members of a value of another type): `features-logic.md` "Link <field> menu".
- **Future Options**: **+** next to **onValue** creates both `then` and the `onError` function (pre-filled with `print('error: ${error}')`) and opens onValue; after that both rows show the function field:
  `packages/code/lib/src/fields/future_options.dart:54-92`. So step 7 says **Edit** next to **onError**.
- **Authentication Template** exists as a free built-in screen template (login + register pages with `emailController` / `passwordController`):
  `packages/core/lib/src/services/templates/built_in/auth_template.dart:3-40`, registered `templates_service.dart:386-387`. Its button already has `onPressed: _submitForm`, so the page says "click **+**, or **Edit** if it already has logic".
- Google sign-in with Supabase = ask the AI (What's New 3.6, `docs/new/whats-new.md:438-439`); Google client IDs live on the **Google Sign-In** settings page (research "Google Sign-In").
- Email confirmation sentence is Supabase behavior (also in the AI's Supabase instructions: `packages/ai/lib/src/tools/instruction_tools.dart:155-158`), phrased as "If your Supabase project asks...".
Left out / assumptions:
- Instant Play runs the Supabase calls for real (research "Data Builder": "Real data appears in Instant Play/App Run"); not described beyond "click Play".
- Session persistence across app restarts and "is the user signed in at startup" checks: no template or panel support found; not covered.

## database.md

Research: `features-data.md` "Query Templates (Supabase "Generate a Query")", "Testing a Supabase function", "Edit Code (Query Source Code)", "Stream queries (Supabase realtime)",
"Supabase panel (connected)", "Tables (Supabase)", "Data Builder"; `features-ai.md` "Supabase MCP".
Code refs relied on (spot-checked):
- **Generate a Query** **+**, **Add Supabase Function** ("Choose how to create your function"), **Templates**, **Query Templates** ("CRUD operations"): `ui/sb_outline.dart:163-198`, `ui/sb_add_function_dialog.dart:26-95`.
- Template list, names and descriptions: `templates/supabase_template_definitions.dart:20-70`; dialog **Supabase Templates**: `templates/ui/sb_template_dialog.dart:33-36`;
  **No Tables Found** / **Fetch Tables** / **Fetching...**: `templates/ui/template_category_view.dart:57-68, 127-166`; table step (search, "<n> columns"): `templates/ui/table_selection_view.dart`.
- **Research correction:** the model step starts with NOTHING selected (`_isCreatingNew = false`, `_selectedModelName = null`; **Generate Function** disabled until a choice:
  `templates/ui/model_selection_view.dart:17-22, 328-337`). The research says "Keep **Create new model class**" as if preselected. Clicking it shows the pre-filled name
  (`<TablePascalCase>Model`, `+2`, `+3` if taken, `:37-52`). **Use Existing Model** lists only classes whose file path contains `/models/` (`:54-70`).
- Function name = operation + table name with first letter capitalized, e.g. `getAllTodos` (`templates/supabase_template_manager.dart:94-96`; `camelCaseToSpaces` capitalizes and would insert spaces
  before capitals, so only plain lowercase table names give clean names; not mentioned). Regenerating the same name replaces the member (`packages/ai/lib/src/tools/ai_response_actions.dart:145-222`).
- Generated code (return types, `.eq('id', id)`, `maybeSingle`, `insert(...).select('*').single()`, id type from the `id` column, fallback to first column): `templates/template_source_generator.dart:40-103`.
- New model file `lib/models/<snake>.dart`, all fields nullable, type mapping string/integer/boolean else dynamic: `supabase_template_manager.dart:157-181`, `models/sb_table.dart:25-71`.
  Success snackbar text: `template_category_view.dart:35`, `model_selection_view.dart:93`.
- Testing panel, **Testing values**, **Run**, **Edit Code**, "Run test to see result", "Error: ...", **Empty Result - Possible RLS Filtering** (any empty list), **RLS Policy Error**,
  **Open Supabase Dashboard**, **Check RLS Policies**, **Streaming** border: `ui/func_test_section.dart:93-247`, `ui/rls_error_widget.dart:56-185`; header "Testing <name>": `func_test_section.dart:138-154`.
- Stream test listens until re-run or panel close: `common/test_section/func_test_provider.dart:48-90`, `func_test_section.dart:30-34` (dispose cancels).
- **Edit Code** labels, **Discard** / **Save** only when changed, **Test Function**, errors, rename = replace: `ui/code_preview.dart:54-88, 115-195`.
- Panel sorting: STREAM badge when the chain's `from(...)` parent is `stream`: `block/sb_func_helper.dart:41-52`; Queries filter excludes `.rpc`, `.storage`, `.realtime`, `.functions`: `supabase_manager.dart:276-288`;
  **RPC** = `.rpc` and **Other Functions** = `.functions` sections: `supabase_manager.dart:254-258`.
- Data Builder **Source** > **Supabase** > **Query** button > popup **Select Supabase Functions** (+ **None**); params shown below: `ui/sb_field.dart:23-57`, `common/data_link_menu.dart:22-93`.
  Board placeholders / real data on Play: `research/features-data.md` Data Builder (`block_tree.dart:786-797`, `mock.dart:243-298`).
- Realtime tip: AI's own Supabase rules enable realtime for live use cases (`packages/ai/lib/src/tools/instruction_tools.dart:164-165`).
Unverified / assumptions:
- The stream snippet (`Stream<List<Map<String, dynamic>>> streamTodos() { return Supabase.instance.client.from('todos').stream(primaryKey: ['id']); }`) was NOT run in the app. It is standard supabase_flutter usage, the
  interpreter binds `stream(primaryKey:)` (`packages/core/lib/src/interpreter/libraries/supabase_flutter_library.dart:8699-8702`), and the panel/test/Data Builder logic only needs a declared return type named `Stream` with a type argument
  (`sb_func_helper.dart:41-50`, `func_test_provider.dart:48-60`, `data_link_menu.dart:35-49`). I avoided `.map(...)` on the stream because the interpreter's `Stream` binding lists few members (`dart_async_library.dart:487-`) and I could not confirm `Stream.map`.
- Edit Code can only replace the open function (renaming replaces it); to keep both a list query and a stream, the page says to ask Nowa AI. Pasting two functions into the editor would add both (`addMemberAction` adds every member), but I did not document that.
- Supabase docs link `https://supabase.com/docs/guides/realtime` is unverified (host blocked by egress policy).
- "Testing values" for model-typed inputs (`create...`, `update...` take a model) not described; the field editor for a class-typed input was not checked.
- Dashboard steps (turn on Realtime for a table) are Supabase UI and not described beyond the docs link.

## storage.md

Research: `features-data.md` "Storage Templates (Supabase)", "Testing a Supabase function", "Supabase panel (connected)"; `features-logic.md` "showMediaPicker"; `features-theme-assets.md`
"Pick or upload an asset from a widget property" (Image source tabs Network / Asset / Bytes).
Code refs relied on (spot-checked):
- **Storage Templates** card ("File operations"): `ui/sb_add_function_dialog.dart:81-89`; templates **Upload File** / **Download File** / **Delete File** and their parameters: `templates/supabase_template_definitions.dart:73-110`;
  clicking a storage template generates at once (no table/model step), shows the success snackbar and closes: `templates/ui/template_category_view.dart:22-46`; fixed names = operation names:
  `templates/supabase_template_manager.dart:94-96`.
- Generated signatures (`uploadFile(String bucketName, String fileName, Uint8List fileData)` via `uploadBinary`, `downloadFile(String bucketName, String filePath)` -> `Future<Uint8List>`, `deleteFile(String bucketName, String fileName)`):
  `templates/template_source_generator.dart:105-137`.
- **Storage** section = functions whose source contains `.storage`: `supabase_manager.dart:256`, `ui/sb_outline.dart:58`.
- Test inputs: `Uint8List` params use `BFBinary` (`ui/func_test_section.dart:208-211`). Its button shows the field label ("File Data") before a file is picked and the file name after
  (`common/widgets/binary_field.dart:58-105, 127-150`; label from `block_field.dart:213-225`). **Research correction:** the research says an **Upload File** picker, but that is only `BinaryField`'s default title; the test panel passes the field label.
  The picker is `showMediaPicker(sourceType: gallery)` with the default media type image (`binary_field.dart:40`, `packages/nowa_runtime/lib/src/media_picker/media_picker.dart:3-12`), so panel uploads are images only. The page says "pick an image".
- Download result view (image types jpg/png/gif/webp via magic bytes; tooltip **Download image**; **File downloaded successfully**, **Type**, **Size**, **Save File to Disk**): `ui/func_test_section.dart:249-363`.
- **RLS Policy Error** matches error text containing "row-level security" etc.: `ui/rls_error_widget.dart:11-33`.
- showMediaPicker chain (await, **Store result**, `first`, `readAsBytes`, **Dependencies** / **Hot Fix**): `features-logic.md` "showMediaPicker" (code `packages/core/lib/src/fields/expression_builder/expression_details.dart:483-524`).
  **refresh** is in **LOCALS**: `packages/core/lib/src/interpreter/suggestion.dart:607-633`.
Left out / assumptions:
- Linking **File Name** to the picked file's `name`: not confirmed that the interpreter binding exposes `XFile.name`, so the page says "type" the file name.
- Bucket creation, public vs private and policies are Supabase-side; the page only points to the Supabase dashboard (**Storage**, label from the old docs) and Supabase's Storage docs (unverified link, host blocked).
- "Public bucket files have web addresses" is Supabase behavior, not in the product code.
- Pull/Set up Backend carry the bucket list but not the files; covered on backend.md.

## backend.md

Research: `features-data.md` "Pull Backend Files (Supabase)", "Set up Backend (Set up Supabase backend)", "Disconnect (Supabase)", "Supabase MCP (AI chat Supabase icon)", "Supabase panel (connected)";
`features-ai.md` "Supabase MCP", "Connect app with AI / Fix with AI (Supabase backend setup)".
Code refs relied on (spot-checked, read in full):
- **Pull Backend Files**: menu item and authorization first when not OAuth-authenticated: `ui/sb_outline.dart:237-245, 316-325`; dialog texts and titles (**Pull backend files**, **Pulling backend files**, **Backend files pulled**,
  **Pull failed**, **Cancel** / **Pull** / **Done**): `migrations/ui/sb_backend_pull_dialog.dart:24-117`; what it writes and replaces (`supabase/migrations/<version>_<name>.sql`, `supabase/functions/<slug>/index.ts`,
  `supabase/nowa_setup.json`; only these three paths are cleared first, other files in `supabase/` stay), the "no migration history" error, buckets list, notes text:
  `migrations/sb_backend_bundle_service.dart:52-142, 351-388`. Only the schema history, deployed edge functions and the bucket rows are read; table data and bucket files are never copied (nothing in the service reads them).
  "Supabase CLI layout" comment: `sb_backend_bundle_service.dart:52-54`.
- **Set up Backend**: offered after **Connect** (`ui/sb_setup/sb_oauth_setup.dart:149-153`) and after **Use Keys** (`ui/sb_setup/sb_keys_setup.dart:62-65`), or from the menu (`ui/sb_outline.dart:247-258`);
  needs OAuth, with a code comment "Migrations run through the Management API, so a URL + anon key connection cannot apply them" (`migrations/sb_backend_setup_flow.dart:19-36`).
  **Observation:** after the keys-only authorization finishes, `offerSetupIfPending` just returns the dialog result and `popIfDone` closes the dialog without project selection (`sb_oauth_setup.dart:160-172`),
  so no setup dialog follows; the user must run **Set up Backend** again. The page does not spell this out for keys-only users beyond "Nowa opens the authorization step first".
  Dialog labels and states (**Set up Supabase backend**, **Skip**, **Set up**, **Setting up backend**, **Backend ready**, **Setup stopped**, **Done**, **Connect app with AI**, **Close**, **Fix with AI**, "Your backend was already up to date."):
  `migrations/ui/sb_backend_setup_dialog.dart:121-194`; step order and what is created (pending migrations by version/name, edge function deploys, buckets `on conflict do nothing`, refresh tables, stops at first failure, notes from `nowa_setup.json`):
  `sb_backend_bundle_service.dart:144-276`. Snackbars "Connect Supabase first." and "This project's backend is already set up.": `ui/sb_outline.dart:247-258`.
- **Menu item visibility:** **Set up Backend** is shown only when `hasBundleCached` is true (`ui/sb_outline.dart:326`), and that flag is refreshed only when the bundle is read (connect offer, pull, setup), not when a project opens
  (`sb_backend_bundle_service.dart:63-79`; callers listed by grep: only `sb_outline.dart`, `sb_oauth_setup.dart`, `sb_keys_setup.dart`). In a freshly opened, already-connected project that ships backend files the item may not show until one of those runs.
  **Open question for the team / verifier:** confirm in the app; the page says "This item shows when the project has backend files."
- **Connect app with AI** / **Fix with AI**: both open the Assistant panel, turn on the first MCP (Supabase), leave Plan mode and **send the prompt automatically** (so they use Nowa AI): `migrations/sb_backend_setup_flow.dart:38-74`.
  **Observation (possible product issue):** the Fix prompt is a fixed text ("Connect this project to my Supabase backend. The backend is already configured... replace the mock data. Reuse the same models.") and does not include the failed step or message even though `startFixChat` receives `failure`
  (`sb_backend_setup_flow.dart:40-49`); the doc comment says it should diagnose the failure. The page therefore says "open Nowa AI with a ready-made prompt" and does not claim it diagnoses the error.
- **Disconnect**: confirm text and **Cancel** / **Yes**: `ui/sb_outline.dart:216-231`; effects (`SupabaseService` removed from scope, `lib/integrations/supabase_service.dart` deleted, `supabase_flutter` removed, startup line removed; constants and `supabase/` bundle files not touched):
  `supabase_manager.dart:142-158, 248`.
- Nowa AI connector summary (Agent mode, approvals, what it can do): `features-ai.md` "Supabase MCP"; details live on `docs/ai/connectors.md` (W2).
Left out / assumptions:
- Supabase CLI usage (`supabase db push`), mentioned only as "also work with it".
- Resetting of the connector on project reopen and **Switch project…** are W2's page.
- The first table (migrations / edge functions / buckets) uses generic Supabase meanings.
