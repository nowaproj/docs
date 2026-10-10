# W15 review log (Supabase)

Verifier run against `/home/user/nowa-master` (v3.12.5). Code refs are relative to that repo. Pages: `docs/integrations/supabase/connect.md`, `auth.md`, `database.md`, `storage.md`, `backend.md`.

## Summary

- Pages checked: 5 (connect, auth, database, storage, backend). Claims checked: 113 log rows below (each row groups related labels and statements; every UI label in the pages was matched against the code).
- Verdicts: 89 ok, 18 fixed, 3 added, 1 removed, 2 not verifiable (external Supabase docs links).
- Most serious fixes:
  1. storage.md "Show a downloaded image" could not work: **Store result** → **New Variable** makes a variable local to the function, so the **Image** **Bytes** tab could not link to it. Rewritten with **Create Variable...** + **Pick Variable** + **refresh**.
  2. connect.md troubleshooting row for "No organizations found..." removed: the message is never shown (the dialog just keeps waiting). Timeout row corrected (the waiting dialog stays open; **Cancel** first).
  3. **Set up Backend** menu visibility (connect.md, backend.md) was stated as "when the project has backend files"; the code uses a cache keyed on `supabase/migrations/*.sql`, refreshed only on connect, setup or pull. Reworded.
  4. database.md: Data Builder step said to click **Query** (it is a label; the button reads `none`); "can be picked" for Future/Stream replaced with the real rule; **RLS Policy Error** row softened (detection is by error text); function-name rule (first letter capitalized) and model reuse added; intro no longer implies a model is always created.
  5. connect.md: "already authorized ... for this project" and the Stripe "Need **Connect**" cell reduced to what the code shows; compound steps split (also in auth.md and storage.md).
  6. backend.md: Pull replaces `nowa_setup.json` too and leaves other `supabase/` files; setup dialog is triggered by pending migration files, not any backend file; the setup note belongs to **Backend ready**; approvals caveat (**Auto-approve tools**) added.
  7. auth.md: added the exact menu name (**All nodes for this circuit**) and the missing "close the new Circuit" step.
- Not verified in the running app (no Supabase account or session here): the stream snippet, the new **Create Variable...** image flow, and the Supabase-side consent page. Nothing was published or committed.

## connect.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Panel is **Supabase**; unconnected page shows **Connect** and **Use Keys** (matches `captures/ui-map/08-panel-supabase.png`) | ok | `packages/data/lib/src/supabase/supabase_plugin.dart:24-26`; `ui/sb_setup/sb_oauth_setup.dart:69-80`; `lib/project/side_bar.dart:72,418` | Panel name is the sidebar tooltip. No gating found. |
| **Connect** needs a signed-in Nowa account | ok | `sb_oauth_setup.dart:130-137` | Code throws "User not logged in" without showing it; the page only says you must be signed in. |
| Browser opens, **Waiting for Authorization...**, Nowa carries on by itself | fixed | `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:44-108` | Added the **Cancel** button the dialog has. Moved the two-minute limit to the troubleshooting row. |
| "choose your organization and approve the request" (Supabase page) | ok (kept) | `supabase_oauth_service.dart:21-44` (launches the URL only) | Supabase-side page, not in code; matches the old docs ("select the organization... Authorize Nowa") and the single-organization handling. |
| "If you already authorized Nowa for this project, Nowa skips step 2" | fixed | `sb_oauth_setup.dart:120-128` | Code tries `getOrganization()` first and skips the browser on success. Per-project vs per-account is not in code, so "for this project" is gone; step reference replaced by "the browser step". |
| Project list: title **Projects in <org>**, **Select** / **Unavailable** (only `ACTIVE_HEALTHY` selectable), **Change organization**, status under the name | ok | `ui/sb_setup/project_selection_dialog.dart:94-140, 203-215` | |
| One organization at a time; **Change organization** restarts the browser step | ok | `supabase_oauth_manager.dart:64-71`; `sb_oauth_setup.dart:155-158` | |
| **Create New Project** form: **Project Name** (`<name>-backend`), **Region** (default West US (North California)), **Database Password** (min 4, eye icon), **Back**, **Create Project** / **Creating...** | ok | `project_selection_dialog.dart:260-285, 339-430`; `gProject.name` = project name (`project_provider.dart:168`) | |
| "Connecting to ..." then panel lists functions | ok | `sb_oauth_setup.dart:207-223` | |
| (Added) Backend setup is offered after connecting when the project has backend files | added | `sb_oauth_setup.dart:149-153`; `ui/sb_setup/sb_keys_setup.dart:62-65` | One sentence plus link to backend.md; the dialog appears before the panel shows. |
| Tip: Supabase icon in the chat field starts the same connect flow | ok | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:437-476`; `packages/ai/lib/src/mcp/supabase_mcp.dart:50-56` | |
| **Use Keys**: page **Supabase Setup**, **API Url**, **Key**, help icons (**Data API**, **API Keys**), **Connect**, **Open Supabase**, new-key note | ok | `sb_keys_setup.dart:92-158, 185-198`; `sb_app_bar.dart:37` | **Open Supabase** opens `supabase.com/dashboard/organizations`. |
| Comparison table: project picking only with **Connect**; backend files and AI connector ask for authorization on **Use Keys** | ok | `sb_outline.dart:237-245`; `supabase_mcp.dart:43-105` | |
| Comparison table, Stripe row "Need **Connect**" | fixed | `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:224-250`; `stripe_settings.dart:74-77,107-120` | Stripe settings only check that Supabase is connected (either way); deploy and secrets call the same OAuth proxy (`SupabaseOAuthManager`) with no prompt. Reworded to what the code shows. Stripe page itself belongs to W17. |
| What Connect adds: `supabase_flutter`, `lib/integrations/supabase_service.dart` (`initialize`, `signIn`, `signUp`, `signOut`), `await SupabaseService().initialize();` in `main.dart`, constants `supabaseUrl` / `supabaseAnonKey` | ok | `supabase_manager.dart:188-246`; `packages/core/lib/src/interpreter/packages/dart_package.dart:135-146` | |
| Constants visible and editable in **Settings** → **General** → **Constants** | ok | `packages/core/lib/src/settings/constants_settings.dart:12-22, 65-67`; `app_constants_service.dart:65-80` | Listed under a package section or **Custom Constants**; editable either way. |
| Panel sections and order (**Generate a Query**, **Authentication**, **Queries**, **Storage**, **RPC**, **Other Functions**); the last four hide when empty; "Not logged in" / "Testing as:" | ok | `ui/sb_outline.dart:52-111, 113-138`; `supabase_manager.dart:250-288` | Auth text shows email or id. |
| 10 badge names (SELECT, INSERT, UPDATE, DELETE, STREAM, AUTH, RPC FUNCTION, STORAGE, OTHER FUNCTIONS, UNKNOWN) | ok | `block/sb_func_helper.dart:94-107`; `common/request_badge.dart:19` | Uppercased at render. |
| Click a function to test; right-click **Rename** / **Remove** (removes from `SupabaseService`) | ok | `supabase_manager.dart:303-307`; `common/data_request_tile.dart:35-56` | |
| ⋮ menu: **Open Supabase**, **Tables**, **Change API Keys**, **Pull Backend Files**, **Set up Backend**, **Disconnect**, in this order | ok | `ui/sb_outline.dart:281-346` | **Open Supabase** does nothing unless the URL ends in `.supabase.co` (`:261-272`), not mentioned. |
| **Change API Keys** reopens **Connect** / **Use Keys**; functions stay | ok | `sb_outline.dart:312-314`; `supabase_manager.dart:204-212` | Only `initialize()` and the two constants are rewritten. |
| **Set up Backend** "shows when the project has backend files" | fixed | `sb_outline.dart:326`; `migrations/sb_backend_bundle_service.dart:63-79, 140`; callers (grep): `sb_oauth_setup.dart:152`, `sb_keys_setup.dart:65`, pull | The flag is a cache refreshed only when the bundle is read (connect or setup) or after a pull, and keyed on `.sql` files in `supabase/migrations`, not on any backend file. Reworded. A reopened, already-connected project may not show the item until you connect or pull again (see open issues). |
| **Tables**: read-only list with columns, refreshes on open, back arrow, empty text | ok | `ui/sb_tables_page.dart:27-79`; `supabase_manager.dart:113-140` | |
| "Nowa has no table editor"; ask Nowa AI to create tables | ok | `sb_tables_page.dart`; `packages/ai/lib/src/tools/instruction_tools.dart:186-196` | AI instructions list creating and managing tables via the Supabase MCP. |
| Troubleshooting: "Authorization timed out. Please try again." | fixed | `auth_dialog.dart:49-51`; `sb_oauth_setup.dart:200`; `core/lib/src/utils.dart:108-114` | It is a red snackbar (2 s); the waiting dialog stays open, so the fix is **Cancel**, then **Connect** again. |
| Troubleshooting: "No organizations found. Please create a Supabase organization first." | removed | `supabase_oauth_manager.dart:64-69`; `sb_oauth_setup.dart:120-128, 160-163` | Never shown: `_start` swallows it and starts the browser flow, `_onSuccess` does not catch it, so the dialog just keeps waiting. |
| Troubleshooting: **Unavailable**; "Anon key not found for project ..."; new-keys message | ok | `project_selection_dialog.dart:203-215`; `supabase_oauth_manager.dart:85-87`; `sb_keys_setup.dart:138-143` | The anon-key text appears in an error dialog (**Close**) prefixed with "Exception: ". |
| Front matter, headings, anchors (`#create-a-new-supabase-project`), links, capture placeholders, style | fixed | | Steps with two clicks split (one action per step). No H1, no `---`, one tip, no hype words. All 8 W15 capture ids have rows in `captures/requests/W15.md`. |

## auth.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Connect generates `signUp(email, password)`, `signIn(email, password)` (`signInWithPassword`), `signOut()` | ok | `packages/data/lib/src/supabase/supabase_manager.dart:228-238` | |
| **Authentication** section lists them; also lists any function whose source contains `.auth.s` ("sign users in, up or out") | ok | `supabase_manager.dart:252`; `ui/sb_outline.dart:73-111` | Password-reset style functions (`.auth.reset...`) match no section; the page does not claim they do. |
| "Not logged in" / "Testing as: <email>" (falls back to id); updates on sign-in and sign-out | ok | `sb_outline.dart:81-102` (`onAuthStateChanged`) | |
| Test panel: opens at the bottom, **Testing values**, **Run**, **Error:** + message, "No parameters to test" (`signOut` takes nothing) | ok | `ui/func_test_section.dart:156-247`; `supabase_manager.dart:303-307` | |
| Field labels **Email**, **Password** | ok | `packages/core/lib/src/fields/block_field.dart:213-225`; `packages/core/lib/src/utils.dart:77-79` | `camelCaseToSpaces()` capitalizes the parameter name. |
| Tests call the real Supabase project; later tests run as the signed-in user | ok | `common/test_section/func_test_provider.dart:52-72`; interpreter binds `Supabase.instance` (`packages/core/lib/src/interpreter/libraries/supabase_flutter_library.dart:9268-9271`) | `RunMode.simulate` only affects some widget builders. |
| Email-confirmation sentence | ok | | Supabase behavior, phrased as "If your Supabase project asks...". Same caveat appears in the AI's Supabase rules (`packages/ai/lib/src/tools/instruction_tools.dart:155-158`). |
| RLS: signed-out queries can be empty or give **RLS Policy Error**; link `database.md#test-a-function` | ok | `ui/rls_error_widget.dart:8-185` | Anchor exists. |
| Step "test sign-in" (old step 4 had three actions) | fixed | | Now "Click `signIn`, then repeat steps 2 and 3". |
| **Authentication Template** in the screen template picker (login and register pages, `emailController`, `passwordController`; not Premium) | ok | `packages/core/lib/src/services/templates/built_in/auth_template.dart:3-40`; `templates_service.dart:371-385`; matches `docs/design/templates.md:32,43` | |
| Every Text Field gets its own controller variable (default `text`), listed in **Variables** | ok | `packages/core/lib/src/interpreter/widget/text_field_info.dart:10-37`; `declaration_info_factory.dart:32` | |
| **On Pressed**: **+** creates the function and opens Circuit, **Edit** when it exists | ok | `packages/core/lib/src/fields/nowa_fields.dart:793-825`; `basic_fields.dart:520-557` | For a function reference (the template's `_submitForm`) the field may look different; the page hedges ("if it already has logic"). |
| Dot under the top node turns into **+**; menu **All nodes for this circuit**; `SupabaseService` searchable and opens its members (singleton: `_instance` + factory) | ok | `packages/core/lib/src/fields/link_menu.dart:61`; `packages/core/lib/src/interpreter/suggestion.dart:636-723` | Added the exact menu name; split the old compound step in two. |
| Link **Email** / **Password**: click label, **LOCALS**, controller, `text` | ok | `suggestion.dart:469-479` (categories rendered uppercase, `link_menu.dart:331`); research "Link <field> menu" | Old step 5 split in two. |
| **Future Options**, **onValue** **+**, creates `then` and a pre-filled `onError` (`print('error: ${error}')`), opens a new Circuit; later **Edit** | ok | `packages/code/lib/src/fields/future_options.dart:54-92` | |
| Return from the new Circuit to the `signIn` node | fixed | `basic_fields.dart:520-531` | Each function opens in its own 800x600 floating panel, so the page now says to close it with **×** before selecting `signIn` again. |
| **GoRouter**, **Navigator**, **Show snackbar** under **GLOBALS** | ok | `packages/core/lib/src/state_management/global_state_suggestions.dart:24-65` | |
| **Play** runs the screen | ok | glossary "Instant Play" | |
| Google sign-in with Supabase: client IDs in **Settings** → **Integrations** → **Google Sign-In**, then ask Nowa AI | ok | `docs/new/whats-new.md:438-439`; `docs/integrations/google-sign-in.md` | Page exists (W17). |
| Front matter, headings, `{#login-screen}` anchor, links (16, all resolve), capture placeholder, one tip, no hype words | ok | | Word count ~760. |

## database.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **+** next to **Generate a Query** opens **Add Supabase Function** ("Choose how to create your function"); **Query Templates** ("CRUD operations") | ok | `ui/sb_outline.dart:163-198`; `ui/sb_add_function_dialog.dart:26-95` | |
| **No Tables Found** + **Fetch Tables** (only when the table list is empty); ⋮ → **Tables** refreshes the list | ok | `templates/ui/template_category_view.dart:57-68, 107-110, 127-166`; `templates/ui/table_selection_view.dart:129-168`; `ui/sb_tables_page.dart:27-45` | **Fetch Tables** is not offered once any table is loaded, so the ⋮ → **Tables** hint is the right refresh path. |
| 5 template names and descriptions | ok | `templates/supabase_template_definitions.dart:20-70` | |
| Steps: pick template, table (searchable), model, **Generate Function**; success text `Function "<name>" generated successfully!` | ok | `table_selection_view.dart:117-123`; `model_selection_view.dart:72-109, 328-345` | Dialog closes on success. |
| Model step: nothing selected until you click; **Create new model class** suggests `<Table>Model` (`2`, `3` if taken); **Use Existing Model** lists classes in `/models/` files | ok | `model_selection_view.dart:17-70, 163-180` | Confirms the writer's correction of the research ("Keep Create new model class"). **Use Existing Model** only appears if such models exist. |
| Function names: action + table name, first letter capitalized (`getAllTodos`) | fixed | `templates/supabase_template_manager.dart:94-96`; `packages/core/lib/src/utils.dart:77-79` | Page said only "action and the table"; added the capitalization rule. Table names with underscores or capitals give odd names (`getAllUser_profiles`; `todoItems` would give a name with a space). Product issue, not documented. |
| Generated code: `getAll` list of model, `getById` uses `maybeSingle` (nothing if no row), `create` / `update` return the row, `delete` returns nothing; id type from the `id` column | ok | `templates/template_source_generator.dart:40-103` | |
| Templates don't filter, sort or page | ok | `template_source_generator.dart:45-103` | `select('*')` only. |
| Generating the same template again replaces the function | ok | `packages/ai/lib/src/tools/ai_response_actions.dart:145-222` (`_replaceMember`) | With the default **Create new model class** each run would suggest `TodosModel2`. |
| (Added) reuse the existing model for the other templates on a table | added | `model_selection_view.dart:37-70` | One sentence so templates share one model. |
| Intro: "Nowa writes the function and a matching data model" | fixed | `supabase_template_manager.dart:157-181` | The model is created only if you choose a new one; reworded. |
| New model in `lib/models/<snake>.dart`; string/integer/boolean → `String`/`int`/`bool`, else `dynamic`; all fields nullable | ok | `supabase_template_manager.dart:157-181`; `models/sb_table.dart:25-31, 55-71` | |
| Test panel: title **Testing <name>**, **Testing values**, **Run**, "Run test to see result", **Error:**, **Edit Code** | ok | `ui/func_test_section.dart:138-247` | |
| **RLS Policy Error** (steps, **Open Supabase Dashboard**) | fixed | `ui/rls_error_widget.dart:8-113` | Detection is by error text (16 patterns, including "check constraint" and "access denied"), so the row now says the message points to an RLS policy instead of stating it as fact. |
| **Empty Result - Possible RLS Filtering**, **Check RLS Policies** | ok | `rls_error_widget.dart:115-185`; `func_test_section.dart:240-241` | Shown for any empty list. |
| **Streaming** over a colored border | ok | `func_test_section.dart:93-136` | |
| Warning: tests run against the real project | ok | `common/test_section/func_test_provider.dart:52-72`; `supabase_flutter_library.dart:9268-9271` | |
| **Edit Code**: **Query Source Code**, **Discard** / **Save** only after a change, **Test Function**; rename replaces; "Could not parse function name from the code" | ok | `ui/code_preview.dart:54-195` | |
| Live queries: STREAM badge in **Queries**; no template creates one; test listens until re-run or panel close | ok | `block/sb_func_helper.dart:41-52`; `supabase_template_definitions.dart:4-17`; `func_test_provider.dart:48-90` | |
| Stream snippet (`Stream<List<Map<String, dynamic>>> streamTodos()` with `.from('todos').stream(primaryKey: ['id'])`) | ok (not run in the app) | `packages/core/lib/src/interpreter/libraries/supabase_flutter_library.dart:8699-8703, 8836-8920, 9020-9040` | The interpreter binds `stream(primaryKey:)` and the builder classes list `Stream<List<Map<String, dynamic>>>` as a supertype, so it type-checks. |
| Link `https://supabase.com/docs/guides/realtime` | not verifiable | | Host is blocked by the egress policy; canonical Supabase docs URL, kept (see open issues). |
| **RPC** (`.rpc`) and **Other Functions** (`.functions`) fill from code | ok | `supabase_manager.dart:254-258` | |
| Data Builder: **Add Wrapper** → **Data Builder**, **Source** → **Supabase**, **Query** button, **Select Supabase Functions**, inputs below | fixed | `ui/sb_field.dart:23-57`; `common/data_link_menu.dart:22-93`; `packages/core/lib/src/fields/data_field.dart:172-215` | The clickable is the button next to the **Query** label (reads `none` at first), not the label. |
| "Only functions that return a Future or a Stream can be picked" | fixed | `data_link_menu.dart:38-62` | The menu lists every Supabase function; others throw "Error : must be Future or Stream". Reworded to "must return". |
| `data` is `List<TodosModel>`; board shows placeholders, **Play** shows real data | ok | `data_link_menu.dart:36-40`; `packages/core/lib/src/interpreter/block_tree.dart:786-797`; `mock.dart:243-298` | |
| Anchors `#test-a-function`, `#edit-code`, `#live-queries`; links (11) resolve; 2 capture placeholders; one tip and one warning | ok | | Word count ~1,160, under the limit. |

## storage.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Storage Templates** card ("File operations") in **Add Supabase Function** | ok | `ui/sb_add_function_dialog.dart:81-89` | |
| Three templates **Upload File**, **Download File**, **Delete File** with parameters `bucketName`/`fileName`/`fileData`/`filePath` | ok | `templates/supabase_template_definitions.dart:73-111` | Card chips show these raw names (`template_category_view.dart:230-254`). |
| Clicking a template generates at once (no table or model step), shows `Function "uploadFile" generated successfully!`, closes the dialog; function appears under **Storage** | ok | `templates/ui/template_category_view.dart:22-46`; `supabase_manager.dart:256` | |
| Inputs and returns table (`uploadFile(bucketName, fileName, fileData)`, `downloadFile(bucketName, filePath)` returns bytes, `deleteFile(bucketName, fileName)`) | ok | `templates/template_source_generator.dart:105-137` | |
| Names fixed, one of each; regenerating replaces; no templates for public links, listing, moving, copying | ok | `supabase_template_manager.dart:94-96`; `ai_response_actions.dart:145-222`; `supabase_template_definitions.dart:73-111` | |
| Test field labels **Bucket Name**, **File Name**, **File Data**, **File Path** | ok | `packages/core/lib/src/fields/block_field.dart:213-225`; `ui/func_test_section.dart:208-211` | |
| **File Data** button shows the label, then the file name; picker offers images from the gallery | ok | `packages/data/lib/src/common/widgets/binary_field.dart:40-105, 127-150`; `packages/nowa_runtime/lib/src/media_picker/media_picker.dart:3-12` | Confirms the writer's correction: the research's "Upload File picker" is only `BinaryField`'s default title. |
| Image preview (JPG, PNG, GIF, WebP), tooltip **Download image**; other files **File downloaded successfully**, **Type**, **Size**, **Save File to Disk** | ok | `func_test_section.dart:249-363` | Type comes from magic bytes (also pdf, zip, bin). |
| `uploadFile` doesn't replace existing files | ok | `template_source_generator.dart:105-116` | `uploadBinary` is called with no options, so the library default (no upsert) applies. Library behavior, not product code. |
| **RLS Policy Error** on a bucket without a policy | ok | `ui/rls_error_widget.dart:11-33` | |
| Warning: tests change real data | ok | `func_test_provider.dart:52-72` | |
| Upload flow: `showMediaPicker`, **Dependencies** / **Hot Fix**, **await**, **Store result** → **New Variable**, `first` → `readAsBytes`, link **File Data** | ok | `packages/core/lib/src/fields/expression_builder/expression_details.dart:483-524`; research "showMediaPicker" | Local variables are enough here because every step is in one function. Added "pick that variable from **LOCALS**". |
| `showMediaPicker` defaults | added | `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:1595-1650` | **Source Type** starts as `camera`, so a "picked image" needs `gallery`; one clause added. |
| "Show a downloaded image": **Store result** → **New Variable**, then link the **Image** **Bytes** tab to it | fixed | `packages/code/lib/src/fields/store_result_field.dart:15-27, 127`; `packages/core/lib/src/fields/field_link_menu.dart:241-266`; `packages/core/lib/src/fields/basic_fields.dart:888-953` | **New Variable** creates a variable inside the function (`VariableStatement`), which the **Image** widget cannot see, so the flow could not work. Rewrote it: **Create Variable...** from the **Bytes** label (adds a screen variable and links it, same flow as the old media-picker doc), then **Store result** → **Pick Variable**, then **refresh**. Not run in the app. |
| **refresh** is in **LOCALS** | ok | `packages/core/lib/src/interpreter/suggestion.dart:607-633` | |
| Public bucket files load in an **Image** **Network** tab | ok | `basic_fields.dart:888-953` | The public-URL behavior is Supabase's, not in code. |
| Link `https://supabase.com/docs/guides/storage` | not verifiable | | Host blocked by the egress policy; canonical Supabase docs URL (see open issues). |
| Compound step "Click `downloadFile`. Type ... Click **Run**" | fixed | | Split into three steps. |
| Links (9, all resolve), anchors, capture placeholders (2), one warning + one tip, no hype words | ok | | Word count ~780. |

## backend.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Pull Backend Files** asks to authorize first when not OAuth-authenticated (e.g. **Use Keys**), then opens the pull dialog | ok | `ui/sb_outline.dart:237-245, 316-325` | After authorizing, the auth dialog closes and the pull dialog follows. |
| Pull dialog: **Pull backend files** / **Pulling backend files** / **Backend files pulled** / **Pull failed**, buttons **Cancel**, **Pull**, **Done**; result counts | ok | `migrations/ui/sb_backend_pull_dialog.dart:24-117` | |
| Files written: `supabase/migrations/<version>_<name>.sql`, `supabase/functions/<slug>/index.ts`, `supabase/nowa_setup.json` (buckets plus a note) | ok | `migrations/sb_backend_bundle_service.dart:119-142, 291-296, 351-388` | |
| "Replaces any files already in `supabase/migrations` and `supabase/functions`" | fixed | `sb_backend_bundle_service.dart:104-111, 130` | `deleteBundle()` also clears `nowa_setup.json` and leaves other files in `supabase/` alone. The page now says so. |
| Only reads your project; table data, bucket files, auth provider settings and secrets are not copied | ok | `sb_backend_bundle_service.dart:308-349, 385` | Only migration history, deployed functions and bucket rows are read. |
| Layout follows the Supabase CLI | ok | `sb_backend_bundle_service.dart:52-54` | |
| **Pull failed** text "This Supabase project has no migration history..." | ok | `sb_backend_bundle_service.dart:123-128` | |
| **Set up Supabase backend** dialog (message with migration count, **Skip**, **Set up**, **Setting up backend**, **Backend ready**, **Setup stopped**, **Done**, **Connect app with AI**, **Close**, **Fix with AI**, "Your backend was already up to date.") | ok | `migrations/ui/sb_backend_setup_dialog.dart:121-194` | |
| Offered after connecting when "the project has backend files that your Supabase project doesn't have yet" | fixed | `migrations/sb_backend_setup_flow.dart:19-36`; `sb_backend_bundle_service.dart:68-79, 144-162` | The trigger is pending migration files (`supabase/migrations/*.sql`), not any backend file. Reworded in step 1. |
| Order of work (migrations, edge functions, buckets, then refresh tables), skips applied migrations, stops at the first failure | ok | `sb_backend_bundle_service.dart:172-254` | Step 3 now carries the "stops at the first step that fails" sentence. |
| **Set up Backend** item "shows when the project has backend files" | fixed | `sb_outline.dart:326`; `sb_backend_bundle_service.dart:63-79, 140` | Cached flag, refreshed only on connect, setup or pull. Reworded; see open issues. |
| Snackbar "This project's backend is already set up." when nothing is pending | ok | `sb_outline.dart:247-258` | "Connect Supabase first." only when not connected. |
| Keys-only: authorize first, then run **Set up Backend** again | ok | `sb_backend_setup_flow.dart:23-29`; `sb_oauth_setup.dart:160-172` | With `forceProjectSelection: false` the auth dialog pops once Supabase is initialized, so no setup dialog follows. Confirms the writer's observation. |
| Summary text, the "app still runs on the data it shipped with" reminder, setup note text | ok | `sb_backend_setup_dialog.dart:127-153`; `sb_backend_bundle_service.dart:385` | Notes only show on success; the page now ties the note to **Backend ready**. |
| **Connect app with AI**: opens the Assistant, turns on the first MCP (Supabase), leaves Plan mode, sends the prompt | ok | `migrations/sb_backend_setup_flow.dart:53-74`; `packages/ai/lib/src/ai_manager.dart:46` | `mcps.first` is always `SupabaseMcpManager`. The prompt is sent only if the session can send. |
| **Fix with AI** opens Nowa AI with a ready-made prompt | ok | `sb_backend_setup_flow.dart:40-49, 60-74` | Wording kept neutral. See open issues: the prompt does not mention the failure. |
| Nowa AI can inspect and change tables, SQL, RLS, triggers, database functions, edge functions, migrations; Agent mode; asks approval | ok (softened) | `packages/ai/lib/src/tools/instruction_tools.dart:186-196`; `docs/ai/connectors.md:14-16, 80-83` | Added "unless **Auto-approve tools** is on", as the connectors page says. |
| **Disconnect**: confirm text, **Cancel** / **Yes**; deletes `lib/integrations/supabase_service.dart`, removes `supabase_flutter` and the `main.dart` startup line; constants, models and `supabase/` stay | ok | `ui/sb_outline.dart:216-231`; `supabase_manager.dart:142-158`; `packages/core/lib/src/widgets/nowa_dialogs.dart:6-22` | |
| Warning: removes every function in `SupabaseService`, even edited ones | ok | `supabase_manager.dart:142-158, 248` | |
| Anchors `#nowa-ai`, `#disconnect-supabase` (used by connect.md); links (4 resolve); 2 capture placeholders; one warning; no hype words | ok | | Word count ~890. |

## Open issues

Docs side (could not resolve here):

1. **External links not checked.** `https://supabase.com` (connect.md), `https://supabase.com/docs/guides/realtime` (database.md) and `https://supabase.com/docs/guides/storage` (storage.md): `supabase.com` is blocked by this environment's egress policy (curl returns 000). They are canonical Supabase URLs and were kept.
2. **Set up Backend visibility after reopening a project.** `hasBundleCached` starts false and is refreshed only when the bundle is read (after **Connect** or **Use Keys**, or **Set up Backend**) or after a pull. A connected project that already contains `supabase/migrations` files probably hides the menu item after a reopen until you connect again or pull. The pages describe the real trigger but this was not confirmed in the running app. Code: `ui/sb_outline.dart:326`, `migrations/sb_backend_bundle_service.dart:63-79`.
3. **Per-project vs per-account authorization** is not visible in code (calls pass the Nowa `projectId`). The pages say only "already authorized".
4. **Model-typed test inputs** (`create...`, `update...` take a model): how the **Testing values** field looks was not checked, so the page does not describe it.
5. **Capture images.** `static/img/docs/integrations/integrations-supabase-connect-1.png` exists and matches its placeholder in connect.md (Supabase icon highlighted, **Connect**, **Use Keys**); the page still has the placeholder like the other pages. The other 7 W15 captures need a signed-in project with a Supabase account.
6. **Writer's research corrections confirmed:** model step starts with nothing selected; **File Data** (not **Upload File**) is the label on the test picker, and it offers images only.

Product behavior seen in code (not documented as behavior; for the team to judge):

- "No organizations found. Please create a Supabase organization first." is never shown (`ui/sb_setup/sb_oauth_setup.dart:120-128, 160-163`).
- After the 120 s timeout the **Waiting for Authorization...** dialog stays open with only a red snackbar (`packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:49-51`).
- Template function names run the table name through `camelCaseToSpaces()` (`templates/supabase_template_manager.dart:94-96`): `user_profiles` gives `getAllUser_profiles`; a camelCase table such as `todoItems` gives a name with a space, which is not valid Dart.
- **Fix with AI** sends a fixed "connect the project and replace mock data" prompt and ignores the failure it receives (`migrations/sb_backend_setup_flow.dart:40-49`), although its doc comment says it should diagnose the failure.
- With **Use Keys**, **Set up Backend** authorizes in the browser and then closes without showing the setup dialog (`sb_oauth_setup.dart:160-172`); the code comment in `sb_backend_setup_flow.dart:23-25` says authorizing ends in project selection, which only holds when Supabase is not connected yet.
- Edge functions deployed by the setup flow use `verify_jwt: false` (`supabase_oauth_service.dart:145`), so a pulled and re-deployed function has no JWT check unless it does its own. Worth confirming that this is intended.
- Stripe deploy and secrets use the OAuth proxy with no authorization prompt, so with **Use Keys** they fail without explanation (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:224-250`).
- **Open Supabase** (⋮ menu and the RLS buttons) does nothing or falls back to the generic dashboard when the project URL does not end in `.supabase.co`.

Deliberately not added to the pages:

- The **Tables** list and the template table picker read your tables with the project's service key when Nowa is authorized (**Connect**), and with the anon key otherwise (`supabase_manager.dart:113-140`). Which tables then show depends on Supabase grants, which the code cannot tell us, so the **Use Keys** comparison stays silent on it.
- The generated `deployEdgeFunction` / `verify_jwt` detail, the `.supabase.co` limit on **Open Supabase**, and the `getById` / `update` / `delete` hard-coded `id` column name beyond the one sentence on ID columns in database.md.
