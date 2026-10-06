# Features: Data and integrations

Source: /home/user/nowa-master (v3.12.5). Researcher: features-data (research subagent). 2026-10-06.

Scope: REST APIs (Api panel, collections, requests, testing, models, imports), Supabase (connect, tables,
query/storage templates, testing, auth, streams, backend bundle, MCP), Firebase (connect, Authentication,
SHA keys, push notifications, Firestore collections and queries), showing async data in the UI (Data Builder),
keys (Constants) and local storage (Shared Preferences), payments (Stripe, RevenueCat), ads (AdMob), and the
other integration settings pages (Google Maps, Google Sign-In, Deep Links).

Cross-area notes (one line each, covered elsewhere):
- Settings window, top bar, left sidebar vs the experimental New UX top-bar icons, mobile shell → editor-shell researcher.
- Calling a request/query from a button (action picker, `On Value` / `On Error`), binding a field to `data` from **Locals** → logic researcher.
- Widget catalog entries (**Data Builder**, **Admob Banner**, **Google Maps**, **RevenueCat Paywall**) and the **Add Wrapper** picker → widgets/designer researchers.
- Nowa AI side of the Supabase MCP (approvals, prompts), AI suggestions about APIs → AI researcher.
- Project Details (**Shared Preferences** → **Clear**), Constants page as part of App Settings → account/projects researcher (also noted here).
- Packages page (adding any pub.dev package), permissions → code/shipping researcher.

Conventions: "Settings" = the project settings window opened from the top bar gear (tooltip **Settings**,
shortcut ⌘, / Ctrl+,) (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:754`, `lib/project/top_bar.dart:154`).
Its sidebar groups pages under the category names **General**, **Integrations**, **Deployment**
(`packages/core/lib/src/settings/settings.dart:6`, `:118`). "Left sidebar" = the default editor sidebar
(`lib/project/project_page.dart:612`); with the experimental New UX the same panel icons sit in the top bar
(`lib/project/top_bar_mapper.dart:59`). Sidebar icon tooltips are the panel names, e.g. **Api**, **Supabase**
(`lib/project/side_bar.dart:72`, `:75`, `:418`).

Docs URLs the released app opens in this area (D13, must keep resolving):
| URL | Opened from | Code ref |
|---|---|---|
| `https://docs.nowa.dev/category/importing-from` | API **Import From** dialog help icon | `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:193` |
| `https://docs.nowa.dev/data-connections/firebase/known-issues/firebase-windows` | Firestore query test overlay on Windows ("Read more about this issue and how to walk around it") | `packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:151` |
| `https://docs.nowa.dev/ui/widgets/widget-desc/data-builder` | **Data Builder** widget doc link | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:461` |
| `https://docs.nowa.dev/ui/widgets/widget-desc/admob-banner` | **Admob Banner** widget doc link | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:844` |

Also (D11): What's New links to `../data-connections/api/createapi` (`docs/new/whats-new.md:874`).

3.13 (dev): no material change in this area. The data/Stripe/integration files differ only by the move to
`NButton`/`NMenu` components with the same labels (string-level diff of every changed file in `packages/data`,
`packages/core/lib/src/integrations` and the integration package configs found no label changes). The
Widgets panel becomes the Library panel in 3.13 (widgets researcher); the four integration widgets are still
listed there (`/home/user/nowa/packages/core/lib/src/widgets_to_add/widgets_to_add.dart:491,873,937,945`).

## Summary

REST APIs
- **Api** panel → **Collections**: list of API collections and their requests, with search, **Add Collection** menu and per-request ▶ **Run Query**.
- **New Collection** (**Create New Collection**): creates an API collection (`lib/api/<name>.api.dart`); also **API Collection...** in the Files **+** menu.
- **Collection settings** (gear on hover, "Edit collection details"): **Name**, **Base URL**, **Auth Key** (Bearer token read from Shared Preferences), collection **Headers**.
- **New Request** (**Create New Request**): request editor at the bottom of the editor: method, URL, **Headers** / **Body** tabs, **Params**, **Model**.
- **Test** / **Run Test**: sends the request from Nowa and shows status, URL, body (**Json** / **Object**) and response **Headers**; **Auth token value** for collections with an Auth Key.
- **Generate Model** / **Generate from Schema** / **Select Model** / **Return as Response Object**: turns the response into a typed Dart model and makes the request return it (**Generate Models** wizard).
- **Import from curl**: creates a request from a pasted cURL command.
- **Import From** (**Import from Swagger** / **Import from Postman** / **Import from Xano**): creates a whole collection from an OpenAPI/Swagger JSON (URL, paste or file), a Postman collection JSON, or Xano API groups (bearer token).

Supabase
- **Supabase** panel → **Connect**: authorize Nowa with Supabase (browser), pick or **Create New Project**. (needs a signed-in Nowa account)
- **Use Keys**: connect with a project URL and anon key only (no project management, no MCP/backend tools).
- **Supabase** panel (connected): **Generate a Query**, **Authentication**, **Queries**, **Storage**, **RPC**, **Other Functions** lists; ⋮ menu **Open Supabase**, **Tables**, **Change API Keys**, **Pull Backend Files**, **Set up Backend**, **Disconnect**.
- **Tables**: read-only list of your Supabase tables and their columns.
- **Query Templates** ("CRUD operations"): generates `getAll…`, `getById…`, `create…`, `update…`, `delete…` functions for a table plus a model.
- **Storage Templates** ("File operations"): generates `uploadFile`, `downloadFile`, `deleteFile`.
- **Testing <function>** (bottom panel): **Testing values**, **Run**, result view, file preview/download, RLS help, live **Streaming** for streams.
- **Edit Code** (**Query Source Code**): edit a function's Dart code, **Save** / **Discard**, **Test Function**.
- **Authentication** (Supabase panel): generated `signIn`, `signUp`, `signOut`; "Testing as: …" shows who you are signed in as while testing.
- Stream (realtime) queries: listed with a **Stream** badge, testable live; no template creates them (AI or **Edit Code**).
- **Pull Backend Files**: copies the connected project's migration history, edge functions and buckets into `supabase/`. (needs **Connect**)
- **Set up Backend** / **Set up Supabase backend**: applies a project's bundled backend (migrations, edge functions, buckets) to your Supabase project; then **Connect app with AI** or **Fix with AI**. (needs **Connect**)
- **Disconnect** (Supabase): removes the generated `SupabaseService` and its functions.
- Supabase MCP (Supabase icon in the AI chat, **Enable MCP** / **Manage MCP**): lets Nowa AI work on your Supabase backend. (needs **Connect**; AI researcher)

Firebase
- **Firebase** (Settings → Integrations): **Continue with Google**, pick a Firebase project, **Connect Apps** (creates Android, iOS and Web apps and config files).
- **Refresh/Update apps and config files**: regenerates the Firebase apps/config; fixes the package-name mismatch problem.
- **Authentication** (Firebase): switch plus providers **Email/Password**, **Google**, **Phone**; adds sign-in functions to `FirebaseService`.
- **SHA Certificate Fingerprints (For Google Sign in)**: list/add SHA-1/SHA-256 keys, one-click add of Nowa's release key.
- **Push Notifications (FCM)**: adds notification code; **Test Push Notifications** sends a message to **All Users** or a **Topic**.
- **Disconnect Project** (Firebase): **Keep Files** or **Clear All Files**.
- Firestore **Collections** (`lib/firebase/collections.dart`): define collections, sub collections and fields (structure only).
- Firestore **Queries** (`lib/firebase/queries.dart`): chain-style query builder (add/doc/get/where/orderBy/count/snapshots/set/delete) with a **Test** section. (query test not in the Windows desktop app)
- Firebase Storage / Realtime Database: no UI found (see Open questions).

Showing data
- **Data Builder** (wrapper and widget): runs a Future/Stream source (**Firestore**, **Supabase** or **API Request**) and builds its child with `data`; **Loading Widget**, **Error Builder**; placeholder data on the board.

Keys and local storage
- **Constants** (Settings → General): one page for all integration keys plus **Custom Constants** (stored in `lib/globals/app_constants.dart`, i.e. inside the app).
- **Shared Preferences** actions (logic): **clear**, **remove key**, **set**, **get** with **Type** / **Key** / **Value**; Project Details → **Shared Preferences** → **Clear** resets the preview store.

Payments
- **Stripe** (Settings → Integrations): one-time, consumable and subscription payments through Supabase (tables, edge functions, webhook deployed by **Deploy Configuration**). (needs Supabase **Connect**)
- **RevenueCat** (Settings → Integrations): API keys per platform, generated `RevenuecatService`; **RevenueCat Paywall** widget.

Ads
- **AdMob** (Settings → Integrations) + **Admob Banner** widget (test ads on by default) + `loadAndShowInterstitialAd` function. (real ads on Android/iOS only)

Other integrations
- **Google Maps** (Settings → Integrations): Android/iOS/Web API keys; **Google Maps** widget previews only when run on a simulator/device.
- **Google Sign-In** (Settings → Integrations): standalone Google sign-in keys (e.g. for Supabase); shows **Managed by Firebase** when Firebase Google auth is on.
- **Deep Links** (Settings → Integrations): **URL Scheme** and **Host** for app links.
- **Add Missing Dependencies**: dialog shown when you add an integration widget whose package isn't installed yet.
- Geolocator: no settings page; adding the `geolocator` package auto-requires location permissions (`packages/core/lib/src/interpreter/packages/integrations/geolocator_package_config.dart:6-16`) (packages topic).
- Not found in code: secure storage, OneSignal, analytics SDKs, in-app purchase (other than RevenueCat), Sign in with Apple for user apps, OpenRouter-specific integration (the old "OpenRouter" page is only a POST-request example).

## Features

### Api panel (Collections)
- **What it does:** Home of your REST APIs: lists every API collection in the project with its requests, method badges and endpoints.
- **Where:** left sidebar → **Api** icon (tooltip "Api"). Onboarding introduces it as **Data Sources**: "Power your app with a data source by connecting to APIs or Supabase." (`lib/project/onboarding/onboarding_step.dart:100-101`).
- **Labels:** panel header **Collections**; **+** tooltip **Add Collection** → menu **New Collection**, **Import from Swagger**, **Import from Postman**, **Import from Xano**; search box; on a collection row (hover): gear icon (collection settings) and **+** (menu **New Request**, **Import from curl**); right-click a collection → **Remove**; right-click a request → **Rename**, **Remove**; hover a request → ▶ tooltip **Run Query**. Request rows show the method badge in capitals (GET, POST, PUT, DELETE, PATCH, HEAD, DOWNLOAD) and the endpoint.
- **How to use:**
  1. Click **Api** in the left sidebar.
  2. Click **+** (**Add Collection**) to create or import a collection.
  3. Hover a collection → **+** → **New Request** to add requests.
  4. Click a request to open it in the request panel at the bottom; or click ▶ (**Run Query**) to open it and send it immediately.
  5. Type in the search box to filter requests by name or endpoint.
- **Options:** none beyond the menus above.
- **Limits and rules:** A collection is any class in `lib/` with a `_dioClient` member (`packages/data/lib/src/api/api_manager.dart:71-79`). Removing a collection shows the references dialog first (`packages/data/lib/src/api/views/api_outline/api_outline_tiles.dart:35-52`). In design mode, tapping a `.api.dart` file in the Files panel shows a popup listing its requests (`packages/data/lib/src/api/api_plugin.dart:24-33`, `packages/data/lib/src/api/api_file_preview.dart:32-40`).
- **Gating:** none found. Not exposed in the mobile-browser shell (`lib/project/project_page.dart:105`, editor-shell researcher).
- **Code refs:** `lib/project/side_bar.dart:71-74`; `lib/project/panels/left_panel.dart:34`; `packages/data/lib/src/api/views/api_outline/api_outline.dart:146-172`, `:219-233`, `:274-279`, `:321-341`; `packages/data/lib/src/common/data_request_tile.dart:55-56`, `:121`; `packages/data/lib/src/common/request_badge.dart:19`; `packages/data/lib/src/api/utils/api_util.dart:11`.
- **Old docs:** `data-connections/api/createapi.md` (partly outdated: steps roughly right, labels like "Add Header"/"New request" differ in case, videos show old UI).
- **Screenshot value:** high: Api panel with two collections expanded, method badges, hover icons and the **Add Collection** menu open.

### New Collection (Create New Collection)
- **What it does:** Creates an empty API collection: a Dart singleton class with its own HTTP client, saved as `lib/api/<snake_name>.api.dart`.
- **Where:** **Api** panel → **+** (**Add Collection**) → **New Collection**. Alternative: Files panel → **+** → **API Collection...** (`lib/project/panels/files_panel/add_lib_menu.dart:118-139`).
- **Labels:** dialog **Create New Collection**, subtitle "Insert the name of the api collection you want to create.", name field (shows **Class name** and **Path** previews), buttons **Cancel**, **Submit**. Suggested name `ApiCollection`.
- **How to use:**
  1. **Api** → **+** → **New Collection**.
  2. Type a name; check the **Class name** / **Path** preview.
  3. Click **Submit**. The collection appears expanded in the panel.
- **Options:** name only. Base URL, headers and auth are set afterwards in collection settings.
- **Limits and rules:** Name must be a valid symbol name ("Name cannot be empty") (`packages/core/lib/src/file_system/widgets/file_name_text_field.dart:109`). Collections are always created in `lib/api` regardless of the folder you were in (`packages/data/lib/src/api/utils/api_util.dart:130-139`). Undo removes the created file (`packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:39-46`).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:60-97`; `packages/data/lib/src/api/utils/api_util.dart:113-139`; `packages/data/lib/src/api/model/api_collection.dart:41-53`; `packages/core/lib/src/file_system/widgets/file_name_text_field.dart:167-202`.
- **Old docs:** `data-connections/api/createapi.md` §1 (accurate for this step: "+" → **New Collection** → **Submit**; describes Class name / Path correctly).
- **Screenshot value:** medium: the dialog with Class name and Path preview.

### Collection settings ("Edit collection details")
- **What it does:** Sets what all requests of a collection share: base URL, headers, and an automatic `Authorization: Bearer <token>` header read from Shared Preferences.
- **Where:** **Api** panel → hover a collection → gear icon.
- **Labels:** dialog title = collection name, subtitle "Edit collection details"; fields **Name**, **Base URL** (helper "The Base URL will applies on all requests", hint `https://example.com`), **Auth Key** (helper "The key used to store the auth token in SharedPreferences", hint "Enter auth key"); **Headers** section with **Add header** (helper text on Headers repeats the Base URL sentence, a copy bug); button **Close**.
- **How to use:**
  1. Hover the collection → gear.
  2. Type the **Base URL** (e.g. the API's root). Requests then only need the endpoint path.
  3. Click **Add header** for headers every request needs (e.g. an API key header).
  4. Optional: type an **Auth Key**: the name of the Shared Preferences key where your app stores the user's token (for example after login). Every request then sends `Authorization: Bearer <value of that key>`.
  5. Click outside a field to save it (each field saves when it loses focus); **Close**.
- **Options:** **Name** (renames the class and the `.api.dart` file); **Base URL** (default empty); **Auth Key** (empty = no auth header); **Headers** (key/value).
- **Limits and rules:** Base URL validation: "Url is not valid", "Host is not valid". Rename errors show "Failed to save collection: …". Collection headers appear read-only in each request's **Headers** tab with tooltip "Inherited from collection - edit in collection settings" (`packages/data/lib/src/api/views/widgets/headers_field.dart:138`). To store the token in your app, use the **Shared Preferences** → **set** action with the same key (see Shared Preferences). While testing in Nowa you type the token in **Auth token value** instead (see Test).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:79-100`, `:120-186`, `:232-243`; `packages/data/lib/src/api/model/api_collection.dart:73-98`, `:100-115`; `packages/data/lib/src/api/interceptors/generate_auth_interceptor.dart:4-23`.
- **Old docs:** `createapi.md` §2-3 (partly outdated: "Settings icon" + Base URL and "Add Header" right, label case differs); `api/.authkey.md` is an unpublished draft (dot-file) describing the Shared Preferences auth key (concept accurate, incomplete).
- **Screenshot value:** high: the settings dialog filled with a base URL, an Auth Key and one header.

### New Request (request editor)
- **What it does:** Adds an HTTP request (an async function in the collection) and edits it: method, URL, headers, body, parameters and return model.
- **Where:** **Api** → hover a collection → **+** → **New Request**. Click any request to edit it; the editor opens as a panel at the bottom of the workspace (close with ✕).
- **Labels:**
  - Name dialog **Create New Request**, hint "Request name...", preview "Function name: <camelCase>", **Cancel**, **Create** (default name `newRequest`).
  - URL row: method dropdown (GET, POST, PUT, DELETE, PATCH, HEAD, DOWNLOAD), URL field (shows the base URL as a prefix; hint `/endpoint` when a base URL exists, else `https://example.com`), button **Test**.
  - Tabs **Headers** (table **KEY** / **VALUE**, button **Add header**, ✕ to delete) and **Body**.
  - Body types (radio): **none**, **JSON**, **raw**, **form-data**, **x-www-form-urlencoded**; raw sub-type dropdown **Text** / **XML** / **HTTP** (hint "Enter plain text..."); JSON editor with tools **Wrap**, **Compress**, **Prettify** and a "Valid JSON"/"Invalid JSON" indicator; when the request has parameters, a side panel **Pass Parameters in Body** with draggable parameter chips; form-data: **Add +**, columns **Key** / **Type** / **Value**, value types String, int, double, bool, MultipartFile, **Connect** (link a value to a variable/parameter), file fields with **filename** and **Bytes**.
  - Right panel: **Model** dropdown (shows the return type, `Response` by default) and **Params** list with **+**; select a parameter → **Edit parameter**.
- **How to use:**
  1. **New Request**, name it, **Create**.
  2. Pick the method and type the endpoint (or a full URL).
  3. **Headers** tab → **Add header** for request-specific headers.
  4. **Body** tab → choose a body type. The body type also sets the request's content type automatically.
  5. To make values dynamic, add parameters in **Params** (**+**; new parameters are `String?` named `param`, `param1`…), then use them as `${paramName}` in the URL or the JSON body, or drag a parameter chip from **Pass Parameters in Body** onto a JSON value.
  6. Click **Test** to switch to the test view (see Test), then set the **Model** (see Generate Model).
  7. Use the request from the UI with a **Data Builder** (source **API Request**) or call it from an action in the logic editor (logic researcher).
- **Options:** method (default GET); body type (default from content: none); content type follows the body type (JSON → `application/json`, raw → text/plain / application/xml / message/http, form-data → `multipart/form-data`, x-www-form-urlencoded → `application/x-www-form-urlencoded`).
- **Limits and rules:** No separate query-parameters tab: put query strings in the URL (the URL is an interpolated string, so `${param}` works) (`packages/core/lib/src/interpreter/block_tree.dart:3083-3175`). Function names must be valid Dart names (error shown under the name field). JSON body accepts `${param}` placeholders when validating (`packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/json_body.dart:28-31`). Requests return `Future<Response>` until a model is set (`packages/data/lib/src/api/model/request_func.dart:88-97`, `:244-256`).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/widgets/api_request_dialogs.dart:61-76`; `packages/data/lib/src/api/views/api_panel/api_request_settings/url_field.dart:143-190`; `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_form.dart:39-56`; `packages/data/lib/src/api/views/widgets/headers_field.dart:37`, `:53`; `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/api_body_types.dart:4-12`, `:78-80`; `.../api_request_body/api_request_body.dart:54`, `:110`; `.../api_request_body/param_json_editor.dart:48`; `.../api_request_body/form_data.dart:40`, `:119`, `:149`, `:160`; `packages/data/lib/src/api/views/api_panel/api_request_settings/api_request_settings.dart:92`; `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:534-566`; `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_params_panel.dart:28`; `packages/core/lib/src/model_generator/json_editor.dart:148-187`; `packages/data/lib/src/api/api_manager.dart:82-87`.
- **Old docs:** `createapi.md` §4 (partly outdated); `api/Openrouter.md` (partly outdated: method/headers/`${param}` body right, but says parameters are created in the Body tab; they are created in the right panel **Params**; the page is a POST example, not an OpenRouter feature).
- **Screenshot value:** high: request editor with POST selected, JSON body containing `${prompt}`, the **Pass Parameters in Body** chips and the right panel **Params**.

### Test (Run Test, Run Query) and response view
- **What it does:** Sends the request from Nowa with test values and shows the response, so you can check it and build a model from it.
- **Where:** request editor → **Test** (switches to the test view; **Back to Request** returns). Or **Api** panel → hover a request → ▶ **Run Query** (opens the test view and sends at once).
- **Labels:** right panel **Testing values** (one field per parameter), file picker **Upload File** when the body contains a file (MultipartFile), **Auth token value** (helper "Enter your authorization token", hint "Authorization token") when the collection has an Auth Key, **Generate Model** section, button **Run Test**. Main area tabs **Body** / **Headers**; body view toggle **Json** / **Object**; placeholder "Send Request to preview your data"; header after a run: "API URL: <full URL>" and "Status: <code> <message>" (coloured by status class); headers table **Key** / **Value**; "Cannot display headers, no response found"; "No object data available".
- **How to use:**
  1. Open the request → **Test**.
  2. Fill **Testing values** (and **Auth token value** if shown).
  3. Click **Run Test**.
  4. Read the status, then **Body** (**Json** raw / **Object** parsed) and **Headers**.
- **Options:** none.
- **Limits and rules:** **Test** only switches view; nothing is sent until **Run Test** (`packages/data/lib/src/api/views/api_overlay/api_request_overlay.dart:47-51`). The test copies your request into a temporary function, so test values never change the request (`packages/data/lib/src/api/model/request_func.dart:377-414`). The **Auth token value** is stored in Nowa's preview Shared Preferences under `<Auth Key>_NOWAGENERATED`, not in your app (`packages/data/lib/src/api/model/test_api_func_provider.dart:137-144`). Errors from the server are shown as the body (status code, status message, error response) (`.../test_api_func_provider.dart:122-135`). Old requests not inside a collection show "You are using old request api, please create a new one" (`.../test_api_func_provider.dart:83`).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/api_panel/api_request_settings/url_field.dart:93`; `packages/data/lib/src/api/views/api_overlay/api_request_overlay.dart:35-39`, `:124`; `packages/data/lib/src/api/views/api_overlay/api_overlay_header.dart:48`, `:64`; `packages/data/lib/src/api/views/api_panel/api_test_section/test_section_preview.dart:32-33`, `:54`, `:80`, `:104`; `packages/data/lib/src/api/views/widgets/response_body_container.dart:5`, `:61`; `packages/data/lib/src/api/views/api_panel/api_test_section/api_test_values_panel.dart:28-51`, `:171-178`; `packages/data/lib/src/common/widgets/binary_field.dart:16`.
- **Old docs:** `createapi.md` §5 and `Openrouter.md` §6 (partly outdated: "Run Test" correct; no mention of Run Query, Auth token value, Json/Object, status header).
- **Screenshot value:** high: test view after a successful GET with status 200, Json body, and the right panel with Testing values and Generate Model.

### Generate Model (Generate Models wizard)
- **What it does:** Builds typed Dart model classes from a JSON response (or pasted JSON) and makes the request return that model (or a list of it), so the UI can use named fields and the board can show placeholder data shaped like the model.
- **Where:** after a successful **Run Test** → right panel **Generate Model** button; or request editor right panel → **Model** dropdown → **Generate from Schema** (paste JSON), **Select Model** (pick String/int/double/bool or an existing model), **Return as Response Object** (undo the model). Same wizard from Files → **+** → **Generate Models From Json...** (`lib/project/panels/files_panel/add_lib_menu.dart:116`).
- **Labels:** dialog **Generate Models**; steps **Content** ("Enter a JSON text and instantly generate usable models for your project."), **Select Data** (**Select All**, tooltips **Collapse All** / **Expand All**), **Generated Models** (fields **Name**, **Path**); buttons **Cancel**/**Back**, **Next**, **Save** (or **Save and Open** when started from the Files menu).
- **How to use:**
  1. **Run Test** successfully.
  2. Click **Generate Model**; the response JSON is pre-filled. **Next**.
  3. Untick fields you don't need. **Next**.
  4. Check **Name** (default `<RequestName>Model`) and **Path** (default `lib/models`). **Save**.
  5. The request now returns the model; the **Model** button shows it.
- **Options:** model name, path, selected fields.
- **Limits and rules:** **Next** is disabled while the JSON is invalid. Error "You can generate model for List of primitives" when the root has no fields (message wording as in code). "Models must be inside lib directory". The **Generate Model** section is hidden when the last test failed (`packages/data/lib/src/api/views/api_panel/api_test_section/api_test_values_panel.dart:94`). No separate "mock data" editor exists in 3.12.5; placeholder data is automatic (see Data Builder).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/api_panel/api_test_section/api_test_values_panel.dart:92-114`; `packages/data/lib/src/api/model/test_api_func_provider.dart:102-120`; `packages/data/lib/src/api/views/api_panel/api_request_settings/api_request_settings.dart:46-58`, `:114-147`; `packages/core/lib/src/model_generator/generate_models_dialog.dart:41`, `:82`, `:131-142`, `:163-167`; `packages/core/lib/src/model_generator/generate_models_dialog_selection/generated_models_section.dart:65-72`; `packages/core/lib/src/model_generator/generate_models_provider.dart:13`, `:131`; `packages/data/lib/src/api/model/request_func.dart:80-87`, `:352-375`.
- **Old docs:** `createapi.md` §5, `Openrouter.md` §7 (accurate steps: Generate Model → Next → Save; misses Generate from Schema / Select Model / Return as Response Object); `vars-params-functions/data-models.md` covers models generally (logic researcher).
- **Screenshot value:** high: Generate Models step 2 (Select Data) with a nested response.

### Import from curl
- **What it does:** Creates a request from a pasted cURL command (method, URL, headers, body, form data).
- **Where:** **Api** → hover a collection → **+** → **Import from curl**.
- **Labels:** dialog **Create Request from cURL**, **Function Name** (hint "Request name...", preview "Function name: …"), **cURL Command** (hint "Paste your cURL command here..."), **Cancel**, **Create**.
- **How to use:**
  1. **+** on the collection → **Import from curl**.
  2. Type a function name, paste the command, **Create**.
- **Options:** none.
- **Limits and rules:** "Invalid curl: …" if it can't be parsed. If the collection has a base URL, the cURL URL must start with it, otherwise: 'The curl URL "<url>" does not match the provided base URL "<base>"'; when it matches only the endpoint part is stored.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/actions/import_action.dart:8-40`; `packages/data/lib/src/api/views/widgets/api_request_dialogs.dart:182-206`; `packages/data/lib/src/curl/curl_service.dart:10-37`.
- **Old docs:** none (only a What's New mention, 2.0.21). Missing.
- **Screenshot value:** medium: the cURL dialog with a pasted command.

### Import From (Import from Swagger / Import from Postman / Import from Xano)
- **What it does:** Creates a new collection with all requests from an API description: OpenAPI/Swagger JSON, a Postman collection, or one or more Xano API groups.
- **Where:** **Api** → **+** (**Add Collection**) → **Import from Swagger** / **Import from Postman** / **Import from Xano** (opens the same **Import From** dialog with that option selected; radio buttons switch source). Help icon opens `https://docs.nowa.dev/category/importing-from`.
- **Labels:** dialog **Import From**; radios **Swagger**, **Postman**, **Xano**. Swagger/Postman: text field (hint "Enter JSON URL / Paste JSON From OpenAPI Swagger..." or "Enter / Paste JSON From Postman..."), **OR**, drop zone "Select / Drop your JSON file", **Cancel**, **Import**. Xano: hint "Enter Xano Bearer Token...", then lists **Select an Instance**, **Select a Workspace**, **Select an API Group** (each group has a **+** that turns into a ✓ when imported), **Cancel**.
- **How to use:**
  1. Swagger: paste a Swagger/OpenAPI JSON URL or the JSON text, or drop/select a `.json` file → **Import**.
  2. Postman: export the collection from Postman as JSON, paste it or drop/select the file → **Import**.
  3. Xano: paste your Xano token; pick an instance, a workspace, then click **+** on each API group to import (each group becomes its own collection). The dialog closes when every group is imported, or click **Cancel**.
- **Options:** source (Swagger default).
- **Limits and rules:** JSON only; file picker allows `.json` (`packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:150-160`). Swagger input can be JSON text, an `http(s)` URL or a file path, otherwise "Input is not a valid JSON string, URL, or file." Both Swagger 2.0 (`definitions`) and OpenAPI 3 (`components.schemas`) are read (`packages/data/lib/src/swagger/swagger_extractor_service.dart:85-98`). Collection name = API title (Swagger `info.title`, Postman collection name), else `SwaggerCollection` / `PostmanCollection`; the base URL is set from the description. Path parameters (`{id}` in Swagger, `:id` in Postman) become request parameters used as `${id}` in the URL. Requests are imported returning `Response` (no model). Postman errors: "Invalid Postman collection format: …" (`packages/data/lib/src/postman/processors/collection_processor.dart:23-31`). Failures show "Failed to import from <source>: …". Xano errors: "Invalid token", "Failed to fetch instances", "Failed to select instance", "Failed to select workspace", "Failed to import from Xano". Xano import uses each API group's Swagger documentation link (`packages/data/lib/src/api/importers/xano_importer.dart:52-57`). Import always creates a new collection; it does not add to an existing one.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/api/views/api_outline/api_outline.dart:166-179`; `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:110-290`; `packages/data/lib/src/api/importers/swagger_importer.dart:12-28`, `:44-76`; `packages/data/lib/src/api/importers/postman_importer.dart:13-28`, `:46-55`; `packages/data/lib/src/swagger/utils/json_loader.dart:9-21`; `packages/data/lib/src/api/views/widgets/xano_import_step_view.dart:44-104`, `:132`, `:185`, `:209`, `:232-266`; `packages/data/lib/src/xano/xano_service.dart:17`.
- **Old docs:** `api/importapi/postman.md`, `swagger.md`, `xano.md` (partly outdated / wrong: they say to click an **Import** button "inside your collection" (import is in the Collections **+** menu and makes a new collection), the file option is a drop zone not "Upload File", and Xano has no **Import** button: you pick instance → workspace → API group).
- **Screenshot value:** high: Import From dialog on Swagger with a URL pasted; second capture: Xano API group list with one ✓.

### Connect (Supabase)
- **What it does:** Authorizes Nowa with your Supabase account in the browser, then connects the project to an existing Supabase project or creates a new one. Nowa writes the URL and anon key into the app and generates `SupabaseService`.
- **Where:** left sidebar → **Supabase** icon (tooltip "Supabase") → **Connect**. Also offered when you turn on the Supabase MCP in the AI chat or pull backend files.
- **Labels:** panel header **Supabase**; buttons **Connect**, **Use Keys**; while authorizing **Authorizing...** and dialog **Waiting for Authorization...** / "Please complete the authorization in your browser." / "Waiting for <n>s..." / **Cancel**. Project dialog **Projects in <organization>**, "Choose an existing project or create a new one:", **Create New Project** (+), project cards (name, "Status: Active" or the status, "Region: …", "Created: d/m/yyyy", button **Select** or **Unavailable**), empty state "No existing projects found" / "Create your first Supabase project to get started", **Change organization**, **Cancel**. Create form **Create New Supabase Project**, "Create a fresh Supabase project for your Nowa application:", **Project Name**, **Region**, **Database Password** (hint "Enter a secure password", eye toggle), **Back**, **Create Project** (**Creating...**). Then "Connecting to <project>...".
- **How to use:**
  1. Open the **Supabase** panel → **Connect**.
  2. In the browser, choose the Supabase organization and authorize Nowa; come back to Nowa.
  3. Click **Select** on an active project, or **Create New Project** → fill **Project Name**, **Region**, **Database Password** → **Create Project**.
  4. Wait for "Connecting to …". If the project ships a Supabase backend, Nowa offers **Set up Supabase backend** (see Set up Backend).
  5. The panel now shows the connected view.
- **Options:** **Project Name** (default `<Nowa project name>-backend`); **Region** (default **West US (North California)**; also East US (North Virginia), East US (Ohio), Canada (Central), West EU (Ireland), West Europe (London), West EU (Paris), Central EU (Frankfurt), Central Europe (Zurich), North EU (Stockholm), Southeast Asia (Singapore), Oceania (Sydney), Northeast Asia (Tokyo), Northeast Asia (Seoul), South Asia (Mumbai), South America (São Paulo)); **Database Password**.
- **Limits and rules:** Authorization times out after 120 seconds: "Authorization timed out. Please try again." Only one organization is shown (the first one returned); "No organizations found. Please create a Supabase organization first."; use **Change organization** to authorize again. Only projects with status ACTIVE_HEALTHY can be selected. "Please enter a project name"; "Password must be at least 4 characters"; "Failed to create project: …"; "Failed to load projects: …". Connecting stores `supabaseUrl` and `supabaseAnonKey` in **Constants**, adds the `supabase_flutter` package and `await SupabaseService().initialize();` to `main.dart`, and creates `lib/integrations/supabase_service.dart` with `initialize`, `signIn`, `signUp`, `signOut`.
- **Gating:** requires a signed-in Nowa account ("User not logged in" otherwise) (`packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:135`). Authorization goes through Nowa's server and is checked per Nowa project (`packages/data/lib/src/supabase/supabase_oauth_service.dart:21-44`; open question).
- **Code refs:** `packages/data/lib/src/supabase/supabase_plugin.dart:24-26`; `packages/data/lib/src/supabase/ui/sb_panel.dart:20-26`; `packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:25-31`, `:66-79`, `:120-153`, `:218`; `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:49-51`, `:87-108`; `packages/data/lib/src/supabase/ui/sb_setup/project_selection_dialog.dart:94-206`, `:261-284`, `:339-429`; `packages/data/lib/src/supabase/supabase_oauth_manager.dart:64-97`; `packages/data/lib/src/supabase/supabase_manager.dart:12`, `:188-246`.
- **Old docs:** `data-connections/supabase/connect-supabase.md` (mostly accurate for Connect / Create New Project / Select; misses region default, password rule, organization behaviour, backend setup offer).
- **Screenshot value:** high: project selection dialog with two projects; second: Create New Supabase Project form.

### Use Keys (Supabase)
- **What it does:** Connects with just your Supabase project URL and anon key, without authorizing Nowa on your Supabase account.
- **Where:** **Supabase** panel → **Use Keys** (page title **Supabase Setup** with a back arrow). Later: panel ⋮ → **Change API Keys** → **Use Keys**.
- **Labels:** **API Url** (help: 'To find your API URL, go to your Supabase project settings, then navigate to "Data API". The URL is listed under "Project URL".', hint "Url"), **Key** (help: 'To find your Anon Key, go to your Supabase project settings, then navigate to "API Keys". After that, copy your "Anon Key".', hint "Anon Key"), **Connect** (shows **Already Connected** when the values are unchanged), **Open Supabase**.
- **How to use:**
  1. **Supabase** → **Use Keys**.
  2. Paste the project URL and the anon key.
  3. **Connect**.
- **Options:** none.
- **Limits and rules:** "Please enter your Supabase API URL.", "Please enter a valid URL.", "Please enter your Supabase Anon Key.". New-style keys are refused with a note when the key contains "publishable" or "secret": "Using the new Supabase keys is not currently supported, please use the anon key." A keys-only connection cannot run the Management-API features: Supabase MCP ("OAuth Authentication Required"), **Pull Backend Files**, **Set up Backend**, Stripe deploy (they ask you to authorize first) (`packages/data/lib/src/supabase/migrations/sb_backend_setup_flow.dart:23-29`). **Create New Project** is only available through **Connect**.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_setup/sb_keys_setup.dart:54-73`, `:92-158`, `:185-198`; `packages/data/lib/src/supabase/ui/sb_setup/sb_app_bar.dart:37`.
- **Old docs:** `connect-supabase.md` "Manually" (partly outdated: button label is **Use Keys**; points to "Connect → App framework" in Supabase whereas the in-app help points to Data API / API Keys; no mention of the new-keys limitation).
- **Screenshot value:** medium: the keys form with the help tooltip open.

### Supabase panel (connected)
- **What it does:** Shows everything generated in `SupabaseService`, grouped by kind, and gives access to tables, keys, backend files and disconnect.
- **Where:** left sidebar → **Supabase** (after connecting).
- **Labels:** header **Supabase** with ⋮ menu: **Open Supabase** (opens your project dashboard), **Tables**, **Change API Keys**, **Pull Backend Files**, **Set up Backend** (only when the project has bundled backend files), **Disconnect** (red). Sections: **Generate a Query** (+), **Authentication** ("Not logged in" or "Testing as: <email>"), **Queries**, **Storage**, **RPC**, **Other Functions** (empty sections are hidden). Each function shows a coloured badge: SELECT, INSERT, UPDATE, DELETE, STREAM, AUTH, RPC FUNCTION, STORAGE, OTHER FUNCTIONS, UNKNOWN. Right-click a function → **Rename**, **Remove**.
- **How to use:**
  1. Click **+** next to **Generate a Query** to add functions from templates.
  2. Click a function to open its test panel at the bottom.
  3. Use ⋮ for tables, keys, backend files or to disconnect.
- **Options:** none.
- **Limits and rules:** Functions are sorted into sections by their code: `.from(...)` without rpc/storage/realtime/functions → **Queries**; `.storage` → **Storage**; `.rpc` → **RPC**; `.functions` (edge functions) → **Other Functions**; `.auth.s…` → **Authentication** (`packages/data/lib/src/supabase/supabase_manager.dart:250-288`). Functions you or the AI add to `SupabaseService` by code appear here too.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_outline.dart:41-64`, `:93-105`, `:140-161`, `:179`, `:200-349`; `packages/data/lib/src/supabase/block/sb_func_helper.dart:9-55`, `:94-106`.
- **Old docs:** `supabase/db.md`, `storage.md`, `streams.md` show older layouts (partly outdated).
- **Screenshot value:** high: connected panel with Authentication, Queries (SELECT/INSERT badges) and Storage, ⋮ menu open.

### Tables (Supabase)
- **What it does:** Lists the tables of the connected Supabase project with their column names (read-only), and refreshes Nowa's table cache used by templates and Stripe.
- **Where:** **Supabase** panel → ⋮ → **Tables** (page title **Supabase Setup**).
- **Labels:** table rows (name + comma-separated columns); "Connect to show tables"; "Error fetching tables: …"; "No tables found, create tables in Supabase and you will see them here.".
- **How to use:** ⋮ → **Tables**; back arrow to return.
- **Options:** none.
- **Limits and rules:** Tables are read from the Supabase REST schema; when Nowa is authorized (**Connect**), it uses the service-role key to see all tables, otherwise the anon key (`packages/data/lib/src/supabase/supabase_manager.dart:113-140`). Create tables in Supabase itself (or with the AI + MCP); Nowa has no table editor.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_tables_page.dart:27-79`; `packages/data/lib/src/supabase/supabase_service.dart:49-66`.
- **Old docs:** `supabase/db.md` Step 1 explains creating tables in Supabase (external; still valid as background), no page for the Tables view (missing).
- **Screenshot value:** low.

### Query Templates (Supabase "Generate a Query")
- **What it does:** Generates ready-made CRUD functions for one table, plus a Dart model for the table.
- **Where:** **Supabase** panel → **Generate a Query** → **+** → dialog **Add Supabase Function** → **Query Templates**.
- **Labels:** **Add Supabase Function**, "Choose how to create your function", **Templates**, "Choose from pre-built function templates", cards **Query Templates** ("CRUD operations") and **Storage Templates** ("File operations"). Then **Supabase Templates** / "Choose a template to get started" → **Back**, **Query Templates** list: **Get All Records** ("Fetch all records from a table"), **Get Record by ID** ("Fetch a single record by its ID"), **Create Record** ("Create a new record in the table"), **Update Record** ("Update an existing record by ID"), **Delete Record** ("Delete a record by ID"). Empty state **No Tables Found** / "Query templates require database tables. Fetch your tables from Supabase to see available templates." / **Fetch Tables** (**Fetching...**). Table step: search, rows "<n> columns" with a **Query** badge, **Fetch Tables**. Model step: 'Choose Model For "<table>"', "Select an existing model or create a new one", **Create New Model** → **Create new model class** (**New**, hint "e.g., UserModel, PostModel"), **Use Existing Model** (**Existing**), button **Generate Function**. Success snackbar 'Function "<name>" generated successfully!'.
- **How to use:**
  1. **+** next to **Generate a Query** → **Query Templates**.
  2. If no tables are listed, **Fetch Tables**.
  3. Pick a template, then the table.
  4. Keep **Create new model class** (default name `<Table>Model`) or pick an existing model.
  5. **Generate Function**. The function appears under **Queries**.
- **Options:** template; table; model (new name or existing model from a `models` folder).
- **Limits and rules:** Generated functions: `getAll<Table>()` → `Future<List<Model>>` (`select('*')`), `getById<Table>(id)` → `Future<Model?>`, `create<Table>(Model data)`, `update<Table>(id, Model data)`, `delete<Table>(id)`. ID filters always use a column named `id`; the id type is `int` if that column is an integer, else `String` (`packages/data/lib/src/supabase/templates/template_source_generator.dart:40-101`). No other filters, sorting or pagination; edit the code (**Edit Code**) or ask the AI. New models are written to `lib/models/<snake_name>.dart`; Supabase column types map string → String, integer → int, boolean → bool, everything else dynamic, all fields nullable (`packages/data/lib/src/supabase/models/sb_table.dart:25-71`). Errors: "Please select or create a model", 'A model named "<name>" already exists. Please use the existing model or choose a different name.', "Failed to generate function".
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_add_function_dialog.dart:26-86`; `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:22-69`; `packages/data/lib/src/supabase/templates/ui/sb_template_dialog.dart:33-35`; `packages/data/lib/src/supabase/templates/ui/template_category_view.dart:35-41`, `:104`, `:145-160`; `packages/data/lib/src/supabase/templates/ui/table_selection_view.dart:37`, `:151-160`, `:215`; `packages/data/lib/src/supabase/templates/ui/model_selection_view.dart:41`, `:78`, `:151-173`, `:249-342`; `packages/data/lib/src/supabase/templates/supabase_template_manager.dart:79-114`, `:157-181`.
- **Old docs:** `supabase/db.md` Step 2 (wrong: describes typing a prompt and clicking **Generate** for AI-written queries, single/multiple queries, and "ask AI to modify" the code; 3.12.5 uses templates only).
- **Screenshot value:** high: Supabase Templates dialog on the model step; second: Query Templates list.

### Storage Templates (Supabase)
- **What it does:** Generates functions to upload, download and delete files in a Supabase Storage bucket.
- **Where:** **Supabase** → **Generate a Query** → **+** → **Storage Templates**.
- **Labels:** **Storage Templates** list: **Upload File** ("Upload a file to Supabase Storage"), **Download File** ("Download a file from Supabase Storage"), **Delete File** ("Delete a file from Supabase Storage"); parameter chips `bucketName`, `fileName`, `fileData` / `filePath`.
- **How to use:**
  1. **Storage Templates** → click a template. The function is generated immediately (no table/model step).
  2. Test it from the **Storage** section (see Testing).
- **Options:** none.
- **Limits and rules:** Generated functions: `uploadFile(String bucketName, String fileName, Uint8List fileData)` (`uploadBinary`), `downloadFile(String bucketName, String filePath)` → `Future<Uint8List>`, `deleteFile(String bucketName, String fileName)`. Function names are fixed (one of each). Create the bucket and its policies in Supabase (or with the AI + MCP). No templates for public URLs, listing, moving or copying files.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:74-110`; `packages/data/lib/src/supabase/templates/ui/template_category_view.dart:22-46`; `packages/data/lib/src/supabase/templates/template_source_generator.dart:104-137`; `packages/data/lib/src/supabase/templates/supabase_template_manager.dart:94-96`.
- **Old docs:** `supabase/storage.md` (partly wrong: lists Get Public URL, List Files, Move/Copy operations and prompt-based generation that the panel doesn't offer).
- **Screenshot value:** medium: Storage Templates list.

### Testing a Supabase function ("Testing <function>")
- **What it does:** Runs any Supabase function from Nowa with test values and shows the result, including images/files, RLS problems and live stream updates.
- **Where:** **Supabase** panel → click a function (bottom panel opens).
- **Labels:** header "Testing <function>", ✕ to close; right panel **Testing values** (fields per parameter; **Upload File** picker for file data; "No parameters to test"), **Run**, **Edit Code**. Result area: "Run test to see result", result tree, "Error: …"; for downloaded files: image preview with **Download image**, or "File downloaded successfully" / "Type: …" / "Size: … bytes" / **Save File to Disk**; RLS help **RLS Policy Error** + "To fix this issue:" (steps "1. Go to your Supabase Dashboard" … "5. Test your query again") + **Open Supabase Dashboard**; empty list warning **Empty Result - Possible RLS Filtering** + **Check RLS Policies** + "Actual result:"; stream overlay **Streaming** with a coloured border.
- **How to use:**
  1. Click the function.
  2. Fill **Testing values** (pick a file with **Upload File** for uploads).
  3. **Run**.
  4. For RLS errors or empty lists, sign in first by running `signIn` from **Authentication** (see Authentication), then run again.
- **Options:** none.
- **Limits and rules:** The test runs against your real Supabase project (data really changes). RLS detection is by error text (patterns such as "row-level security", "permission denied for", "not authorized") (`packages/data/lib/src/supabase/ui/rls_error_widget.dart:11-32`). Streams keep listening until you run again or close the panel (`packages/data/lib/src/common/test_section/func_test_provider.dart:48-90`). Image types detected: jpg, png, gif, webp; other files show size/type.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/supabase_manager.dart:303-307`; `packages/data/lib/src/supabase/ui/func_test_section.dart:93-246`, `:249-363`; `packages/data/lib/src/supabase/ui/rls_error_widget.dart:56-185`; `packages/data/lib/src/common/widgets/binary_field.dart:10-30`.
- **Old docs:** `supabase/db.md` Step 3, `storage.md` "Test your Storage query" (partly outdated: say "Play" button; button is **Run**; RLS sign-in note accurate).
- **Screenshot value:** high: test panel showing the RLS Policy Error helper; second: a downloaded image preview.

### Edit Code (Query Source Code)
- **What it does:** Lets you edit the Dart code of a Supabase function (e.g. add filters, ordering or a realtime stream) and save it back into `SupabaseService`.
- **Where:** Supabase test panel → **Edit Code**.
- **Labels:** **Query Source Code**, code editor, **Discard** / **Save** (appear when changed), **Test Function** (back to the test view).
- **How to use:**
  1. Open a function → **Edit Code**.
  2. Change the code; **Save**.
  3. **Test Function** to run it.
- **Options:** none.
- **Limits and rules:** Renaming the function in code replaces the old one. Errors: "Could not find parent class for this function", "Could not parse function name from the code".
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/code_preview.dart:53-87`, `:147-181`; `packages/data/lib/src/supabase/ui/func_test_section.dart:36-43`, `:183-188`.
- **Old docs:** `supabase/db.md` "Modify generated code" (partly wrong: claims you can ask AI to modify it from there).
- **Screenshot value:** low.

### Authentication (Supabase panel)
- **What it does:** Lists the auth functions of `SupabaseService` (generated `signIn(email, password)`, `signUp(email, password)`, `signOut()`) and shows which user Nowa is testing as, so RLS-protected queries can be tested.
- **Where:** **Supabase** panel → **Authentication** section.
- **Labels:** **Authentication**, "Not logged in" / "Testing as: <email or id>", function rows with **AUTH** badge.
- **How to use:**
  1. Click `signUp` (or `signIn`), fill **Testing values** (email, password), **Run**.
  2. "Testing as: …" now shows the user; other tests run as that user.
  3. In the app, call these functions from your login/sign-up screens (logic researcher); Google sign-in with Supabase is set up through the AI and the **Google Sign-In** settings page.
- **Options:** none.
- **Limits and rules:** Auth functions are any `SupabaseService` methods calling `.auth.s…` (sign in/up/out etc.). Supabase may require email confirmation before `signIn` works (Supabase-side setting).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_outline.dart:73-111`; `packages/data/lib/src/supabase/supabase_manager.dart:228-238`, `:252`; `packages/data/lib/src/supabase/block/sb_func_helper.dart:12-33`.
- **Old docs:** `supabase/auth.md` (partly outdated: the "templates" part (signUp test, Run) is roughly right; the UI/logic steps belong to the logic pages; the AI part is the AI researcher's).
- **Screenshot value:** medium: Authentication section with "Testing as: test@…".

### Stream queries (Supabase realtime)
- **What it does:** Supabase functions that return a `Stream` (Supabase `.stream()`) update live; they can feed a **Data Builder** and be tested live.
- **Where:** created by the AI or via **Edit Code**; listed in **Queries** with a **STREAM** badge.
- **Labels:** badge **Stream**; test overlay **Streaming**.
- **How to use:**
  1. Enable Realtime for the table in Supabase.
  2. Ask the AI for a stream query (or write one with **Edit Code**).
  3. Test it: the panel shows **Streaming** and updates as rows change.
  4. Use it as a **Data Builder** source; Nowa puts it in the builder's `stream` slot automatically.
- **Options:** none.
- **Limits and rules:** No template creates stream queries (`packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:5-17`).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/block/sb_func_helper.dart:41-50`, `:100`; `packages/data/lib/src/supabase/ui/func_test_section.dart:93-136`; `packages/data/lib/src/common/data_link_menu.dart:43-52`.
- **Old docs:** `supabase/streams.md` (partly outdated: "yellow Stream word and border" description; still correct that streams come from the AI and need Realtime enabled in Supabase).
- **Screenshot value:** low.

### Pull Backend Files (Supabase)
- **What it does:** Copies the connected Supabase project's migration history, edge functions and storage bucket list into the project's `supabase/` folder, so the backend travels with the project (for example a template or a copy) and can be recreated elsewhere. Your Supabase project is only read.
- **Where:** **Supabase** panel → ⋮ → **Pull Backend Files**.
- **Labels:** dialog **Pull backend files** / **Pulling backend files** / **Backend files pulled** / **Pull failed**; text "Nowa copies this Supabase project's migration history, edge functions and storage buckets into supabase/ in this project. Your Supabase project is only read — nothing there changes." + "Files already in supabase/migrations and supabase/functions are replaced."; result "<n> migrations, <n> edge functions and <n> storage buckets written to supabase/." + "Commit them with the project: whoever copies it can now recreate this backend on their own Supabase."; buttons **Cancel**, **Pull**, **Done**.
- **How to use:**
  1. ⋮ → **Pull Backend Files** (authorize with **Connect** first if asked).
  2. **Pull**; **Done**.
- **Options:** none.
- **Limits and rules:** Files: `supabase/migrations/*.sql`, `supabase/functions/<slug>/index.ts`, `supabase/nowa_setup.json` (Supabase CLI layout). Fails if the project has no migration history: "This Supabase project has no migration history, so its schema cannot be captured. Recreate it through migrations and pull again." Replaces existing bundle files.
- **Gating:** needs Supabase authorization (**Connect**) (`packages/data/lib/src/supabase/ui/sb_outline.dart:237-245`).
- **Code refs:** `packages/data/lib/src/supabase/migrations/sb_backend_bundle_service.dart:51-58`, `:119-141`; `packages/data/lib/src/supabase/migrations/ui/sb_backend_pull_dialog.dart:69-114`.
- **Old docs:** missing.
- **Screenshot value:** medium: the pull dialog result.

### Set up Backend (Set up Supabase backend)
- **What it does:** When a project contains a bundled Supabase backend (`supabase/` files), Nowa applies the missing migrations, deploys the edge functions and creates the storage buckets on your own Supabase project, then can hand over to the AI to wire the app to it.
- **Where:** offered automatically after connecting a Supabase project if bundle files are pending; or **Supabase** panel → ⋮ → **Set up Backend** (only shown when bundle files exist).
- **Labels:** dialog **Set up Supabase backend** ("This project ships a Supabase backend. Nowa will create its tables, edge functions and storage buckets on the Supabase project you just connected (<n> migrations)."), **Skip**, **Set up**; progress **Setting up backend** with steps ("Applying <file>", "Deploying <function>", "Creating storage buckets", "Refreshing tables"); result **Backend ready** ("<n> migrations applied, <n> edge functions deployed, <n> storage buckets created." / "Your backend was already up to date." + "The app still runs on the data it shipped with — connect it to your new backend with the AI." + setup notes) with **Done**, **Connect app with AI**; failure **Setup stopped** ("Failed on <target>: …") with **Close**, **Fix with AI**. Snackbars "Connect Supabase first.", "This project's backend is already set up.".
- **How to use:**
  1. Connect Supabase with **Connect**.
  2. In **Set up Supabase backend**, click **Set up**.
  3. On **Backend ready**, click **Connect app with AI** to let the AI switch the app from its sample data to your backend (sends an AI prompt), or **Done**.
  4. If it stops, **Fix with AI** (AI prompt), then run **Set up Backend** again from ⋮.
- **Options:** none.
- **Limits and rules:** Stops at the first failure. Already applied migrations are skipped (matched by version/name). Needs Supabase authorization: "Migrations run through the Management API, so a URL + anon key connection cannot apply them" (code comment) (`packages/data/lib/src/supabase/migrations/sb_backend_setup_flow.dart:23-29`). The AI buttons turn on the first MCP and send fixed prompts (`.../sb_backend_setup_flow.dart:40-74`).
- **Gating:** needs **Connect** (OAuth).
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:149-153`; `packages/data/lib/src/supabase/ui/sb_setup/sb_keys_setup.dart:62-65`; `packages/data/lib/src/supabase/ui/sb_outline.dart:247-258`, `:326-336`; `packages/data/lib/src/supabase/migrations/sb_backend_bundle_service.dart:144-246`; `packages/data/lib/src/supabase/migrations/ui/sb_backend_setup_dialog.dart:121-191`.
- **Old docs:** missing.
- **Screenshot value:** high: Set up Supabase backend dialog, and the Backend ready result.

### Disconnect (Supabase)
- **What it does:** Disconnects the project from Supabase and removes the generated Supabase code.
- **Where:** **Supabase** panel → ⋮ → **Disconnect**.
- **Labels:** confirm "Are you sure you want to disconnect from supabase?" / "This will remove all queries and storage functions from your project.", **Cancel**, **Yes**.
- **How to use:** ⋮ → **Disconnect** → **Yes**.
- **Options:** none.
- **Limits and rules:** Deletes `lib/integrations/supabase_service.dart` (all generated functions), removes the `supabase_flutter` package and the `main.dart` setup line. The `supabaseUrl`/`supabaseAnonKey` constants are not removed by this code path (`packages/data/lib/src/supabase/supabase_manager.dart:142-158`).
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/supabase/ui/sb_outline.dart:216-231`; `packages/core/lib/src/widgets/nowa_dialogs.dart:6-22` (`showAreYouSureDialog`, **Cancel**/**Yes**).
- **Old docs:** missing.
- **Screenshot value:** low.

### Supabase MCP (AI chat Supabase icon)
- **What it does:** Gives Nowa AI access to your connected Supabase project (tables, RLS, functions, storage) through Supabase's MCP server. Brief here; the AI researcher covers usage.
- **Where:** AI chat input → Supabase icon (tooltip **Enable MCP**; green and tooltip **Manage MCP** when on). Menu: "Connected: <project ref>", **Switch project…**, **Turn off MCP**.
- **Labels:** dialog **OAuth Authentication Required** / "MCP requires OAuth authentication with Supabase. Would you like to authenticate now?" / **Cancel** / **Authenticate**.
- **How to use:**
  1. Click the Supabase icon in the chat.
  2. If not connected, the Supabase connect flow opens; if connected with keys only, authenticate.
  3. The icon turns green; describe what you want.
- **Options:** **Switch project…** (re-opens project selection), **Turn off MCP**.
- **Limits and rules:** Needs the Supabase connection and Supabase authorization for this Nowa project (`packages/ai/lib/src/mcp/supabase_mcp.dart:33-58`); uses `https://mcp.supabase.com/mcp?project_ref=<ref>`. AI tool calls ask for approval unless auto-approve is on (AI researcher).
- **Gating:** needs **Connect** (OAuth). Shown in every project (the Figma icon next to it is behind `FigmaIntegration.enabled`) (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:349-350`).
- **Code refs:** `packages/ai/lib/src/mcp/supabase_mcp.dart:11-27`, `:79-98`; `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:391`, `:437-476`, `:598`, `:618`, `:634`.
- **Old docs:** `data-connections/supabase/mcp.md` (mostly accurate; AI researcher to confirm details).
- **Screenshot value:** medium: chat input with the green Supabase icon and its menu.

### Firebase (Settings → Integrations → Firebase): connect
- **What it does:** Connects the project to a Firebase project: you sign in with Google, pick a Firebase project, and Nowa creates (or reuses) the Android, iOS and Web apps in Firebase and writes all config files.
- **Where:** top bar **Settings** → **Integrations** → **Firebase**. Also from Firestore "Not connected" views (**Firebase Settings**) and the Firebase problem in the Problems panel.
- **Labels:** header **Firebase**; sign-in screen **Connect Firebase** + **Continue with Google** (the screen also shows an unrelated sentence "Only the project owner can add, modify and remove members from the project. Learn more about roles in the documentation.", a copy bug); **Projects** (cards: display name + project ID); empty state "You don't have any Firebase project, please create one using firebase console!" + **Reload Projects**; app screen **Apps : ** with "Android App will be automatically created", "iOS App will be automatically created", "Web App will be automatically created" (or the existing app chips), **Connect Apps**; error "Error creating apps, you  have finished your limits of apps on Firebase"; back arrow (signs you out of Google on the projects screen).
- **How to use:**
  1. Create the Firebase project in the Firebase console first (Nowa doesn't create projects).
  2. Settings → **Integrations** → **Firebase** → **Continue with Google**; approve the Google consent.
  3. Click your project.
  4. **Connect Apps**. Nowa creates missing apps named "<App name> (Android)-nowa", "(iOS)-nowa", "(Web)-nowa" (existing apps with the same package name / bundle ID are reused) and connects.
- **Options:** none.
- **Limits and rules:** Set your package name / bundle ID before connecting (apps are matched and created with them) (`packages/data/lib/src/firebase/setup/views/fb_apps.dart:177-197`). Files written: `android/app/google-services.json`, `ios/Runner/GoogleService-Info.plist`, `lib/firebase_options.dart`, `lib/firebase/firebase.dart` (`FirebaseService`), `lib/firebase/collections.dart`, `lib/firebase/queries.dart`; packages `firebase_core` + `cloud_firestore`; `main.dart` gets `Firebase.initializeApp(...)`; Android gradle gets the google-services plugin. Options are generated for Web, Android and iOS (macOS reuses iOS); other platforms get none (`packages/data/lib/src/firebase/setup/fb_setup_manager.dart:117-141`). `cloud_firestore` raises the iOS minimum to 15.0. Google access asks for the `firebase` and `cloud-platform` scopes (`packages/data/lib/src/firebase/firebase_manager.dart:146-156`). The Google sign-in is remembered per device/browser (`firebase-token`), so on another device the page asks **Continue with Google** again even though the project stays connected (`packages/data/lib/src/firebase/firebase_settings.dart:42-50`).
- **Gating:** none found (web uses the Google popup, desktop opens the browser) (`packages/core/lib/src/services/auth/auth_web.dart:10-31`, `packages/core/lib/src/services/auth/auth_io.dart:14-71`).
- **Code refs:** `packages/data/lib/src/firebase/firebase_plugin.dart:65-75`; `packages/data/lib/src/firebase/firebase_settings.dart:11-54`; `packages/data/lib/src/firebase/setup/views/sign_in_with_google.dart:34`, `:43`, `:76`; `packages/data/lib/src/firebase/setup/views/fb_projects.dart:46`, `:59`, `:70`; `packages/data/lib/src/firebase/setup/views/fb_apps.dart:89-168`, `:199-245`; `packages/data/lib/src/firebase/firebase_api_service.dart:91-94`; `packages/data/lib/src/firebase/firebase_manager.dart:88-106`; `packages/data/lib/src/firebase/setup/fb_setup_manager.dart:55-94`; `packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:9-45`.
- **Old docs:** `data-connections/firebase/firebase-connect.md` (outdated: Nowa V1 video only).
- **Screenshot value:** high: Firebase settings Apps screen before **Connect Apps**; then the connected screen.

### Refresh/Update apps and config files (Firebase)
- **What it does:** Re-reads the Firebase project and regenerates the apps, config files and options (use after changing the package name/bundle ID or Firebase settings).
- **Where:** Settings → **Integrations** → **Firebase** (connected) → **Refresh/Update apps and config files** (next to "Project ID: <id>").
- **Labels:** "Project ID: ", **Refresh/Update apps and config files**; Problems panel message "Firebase package name '<firebase>' does not match the app package name '<app>'. Try refreshing the config files" (clicking it opens Firebase settings).
- **How to use:** Click the button; wait for the spinner.
- **Options:** none.
- **Limits and rules:** see Connect.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:45-52`, `:76-97`; `packages/data/lib/src/firebase/firebase_plugin.dart:92-118`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Authentication (Firebase) and providers
- **What it does:** Adds Firebase Authentication to the app: a switch adds the general functions, and each provider adds its sign-in functions to `FirebaseService` (`lib/firebase/firebase.dart`).
- **Where:** Settings → **Integrations** → **Firebase** → **Authentication** switch; then **Add Provider** / **Manage Providers** → **Available Providers**.
- **Labels:** **Authentication**; warning "Please ensure that authentication method is already enabled in your Firebase project before activating it in Nowa." + link **Enable on Firebase.**; "Providers: " (provider icons); **Add Provider** (when no Google or Email provider) / **Manage Providers**; page **Available Providers**, "Be sure to enable the selected providers from Firebase Authentication panel as well", tiles **Email/Password**, **Google**, **Phone** (+ to add, ✓ when added, click ✓ to remove).
- **How to use:**
  1. Enable the providers in the Firebase console (Authentication → Sign-in method).
  2. In Nowa, turn on **Authentication**.
  3. **Add Provider** → click **Email/Password**, **Google** and/or **Phone**.
  4. For Google on Android, add SHA fingerprints (next feature).
  5. Call the functions from your screens' actions (logic researcher).
- **Options:** functions added: Authentication switch → `signOut`, `isUserSignedIn`, `currentUser`, `sendVerificationEmail`; **Email/Password** → `signUpWithEmailAndPassword(email, password)`, `signInWithEmailAndPassword(email, password)`, `sendPasswordResetEmail(email)`; **Google** → `signInWithGoogle()` (popup on web, Google Sign-In on mobile; adds `google_sign_in` and iOS URL scheme); **Phone** → `verifyPhoneNumber(phoneNumber)`, `signInWithPhoneNumber(verificationId, smsCode)` (adds iOS URL scheme).
- **Limits and rules:** Adding **Google** fails with "Must Enable Google Authentication on Firebase" if Google sign-in isn't enabled in Firebase (no iOS CLIENT_ID). In Nowa's preview, sign-in/sign-up calls don't hit Firebase; a dialog lets you simulate success or failure: **Google sign in Preview** ("This is only a preview for Sign Out, to run the real one, use a simulator or real device." as written) with **Test with fake Google user** / **Test error signing in**; **Create Account Preview** and **Sign In Preview** with **Test with fake user** / **Test error signing up**; `currentUser` returns a placeholder user ("[email]", "[displayName]"…); `isUserSignedIn` returns false. Turning Authentication off removes all of these functions and providers.
- **Gating:** none found (real auth needs a simulator/device run per the preview dialogs).
- **Code refs:** `packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:35-43`, `:109-185`; `packages/data/lib/src/firebase/setup/views/auth_management_view.dart:21-65`; `packages/data/lib/src/firebase/auth/fb_auth_manager.dart:24-83`, `:106-152`; `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:7-31`, `:36`, `:58`, `:81`, `:104-171`, `:185-226`, `:257-298`, `:329-446`.
- **Old docs:** `firebase/firebase-email-auth.md` (outdated: V1 video only).
- **Screenshot value:** high: connected Firebase page with Authentication on and Providers icons; Available Providers page.

### SHA Certificate Fingerprints (For Google Sign in)
- **What it does:** Manages the Android app's SHA fingerprints in Firebase, needed for Google Sign-In on Android: shows existing keys, adds Nowa's release signing key in one click, and adds your debug key.
- **Where:** Settings → **Integrations** → **Firebase** → **SHA Certificate Fingerprints (For Google Sign in)** → **Setup**.
- **Labels:** description "SHA Certificate Fingerprints are unique digital identifiers that ensure a secure connection between your app and Firebase. Add it in case of supporting Google Sign in"; table **SHA Certificate Fingerprints** / **Type** or "No keys found"; **Release key** ("From your Nowa Android signing key. Add these so Google services work in your released app") with rows **SHA-1**, **SHA-256**, copy buttons ("Copy SHA-1"…), **Add** (✓ when present); **Add a key** ("to get SHA-1 Debug signing key, you can use this command in terminal then set it and click on add Debug key") + the `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android` command with copy; field "Enter SHA-1 or SHA-256", **Add Key**.
- **How to use:**
  1. **Setup**.
  2. Under **Release key**, click **Add** for SHA-1 and SHA-256.
  3. For local debug builds, run the copied `keytool` command, paste the SHA-1, **Add Key**.
- **Options:** none.
- **Limits and rules:** A pasted value of exactly 59 characters (colon-separated SHA-1) is sent as SHA-1; any other length is sent as SHA-256 (`packages/data/lib/src/firebase/setup/views/fb_sha_keys_management.dart:50-53`). **Release key** only appears when Nowa can fetch your project's Android signing key fingerprints (`packages/core/lib/src/cloud_build_v2/keystore_fingerprints.dart:15-24`). Errors show as snackbars.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:190-197`; `packages/data/lib/src/firebase/setup/views/fb_sha_keys_management.dart:29-210`, `:234`.
- **Old docs:** `firebase-connect.md` mentions SHA in the V1 video (outdated).
- **Screenshot value:** medium: SHA page with the Release key rows.

### Push Notifications (FCM) and Test Push Notifications
- **What it does:** Adds Firebase Cloud Messaging to the app (permission request, foreground notifications, background handler) and lets you send a test notification from Nowa.
- **Where:** Settings → **Integrations** → **Firebase** → **Push Notifications (FCM)** switch; the **Test Push Notifications** box appears below when on.
- **Labels:** **Push Notifications (FCM)**, "Firebase Cloud Messaging (FCM) allows you to send push notifications to your app users. Enable this to add notification functionality to your project." + **Learn more about FCM.**; when on: "Important: You must enable Push Notifications capability in Xcode.\nGo to your iOS project → Signing & Capabilities → Add Capability → Push Notifications." (+ " Open Xcode Workspace" " to configure." on macOS); **Test Push Notifications**: **Notification Title** (hint "Enter notification title"), **Notification Text** (hint "Enter notification message"), **Target Audience** (**All Users** / **Topic**, + "Topic name"), **Deliver with sound** (switch), **Send Test Notification** (**Sending...**).
- **How to use:**
  1. Turn on **Push Notifications (FCM)**.
  2. For iOS, add the Push Notifications capability in Xcode (and APNs setup in Firebase/Apple, external).
  3. Rebuild/redeploy the app (code researcher).
  4. In **Test Push Notifications**, type a title and text, pick **All Users**, keep **Deliver with sound**, **Send Test Notification**.
- **Options:** **Target Audience** default **All Users** (sends to topic `all`); **Topic** sends to the topic you name (default text `all`); **Deliver with sound** default on.
- **Limits and rules:** Nothing is sent if title or text is empty. The generated service (`lib/firebase/notification_service.dart`, started from `main.dart`) subscribes every device to the topic `all`; other topics need your own code. Adds `firebase_messaging`, `flutter_local_notifications`, iOS background modes `fetch` and `remote-notification`, Android desugaring. Errors: "Permission denied. Check Firebase project permissions.", "Project not found. Check Firebase project ID.", "Network error occurred. Please check your connection.", "Unknown error occurred while sending notification.". If Nowa's Google access has expired (HTTP 401), the code disconnects Firebase from the project (keeping Firestore files) (`packages/data/lib/src/firebase/setup/views/notification_settings.dart:183-185`; see Open questions).
- **Gating:** "Open Xcode Workspace" link: macOS desktop app only (`NPlatform.isMacOs`, opens the local project's `ios/Runner.xcworkspace`) (`packages/data/lib/src/firebase/setup/views/notification_settings.dart:100-117`).
- **Code refs:** `packages/data/lib/src/firebase/setup/views/notification_settings.dart:20-31`, `:43-131`, `:160-212`, `:230-292`; `packages/data/lib/src/firebase/push_notifications/fb_push_notifications_manager.dart:21-68`, `:71-142`; `packages/data/lib/src/firebase/push_notifications/notification_service_template.dart:51`; `packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:49-63`.
- **Old docs:** `firebase/notification.md` (mostly accurate: enable, Xcode warning, rebuild, send test; missing exact labels, Topic option and the `all` topic behaviour).
- **Screenshot value:** high: FCM switch on with the Test Push Notifications box filled.

### Disconnect Project (Firebase)
- **What it does:** Disconnects Firebase from the project, optionally keeping your Firestore collection/query files.
- **Where:** Settings → **Integrations** → **Firebase** → **Disconnect Project** (red). Also **Go to your Firebase Dashboard** above it.
- **Labels:** dialog **Disconnect Firebase Project**; **Keep Firestore Files** ("Disconnect project and keep firestore files that can be use in another project. You will face errors until you reconnect with another project.") → **Keep Files**; **Clear Firebase Files** ("Disconnect project and delete all the firebase files. This action is permanent and the files cannot be restore once deleted.") → **Clear All Files**; **Cancel**.
- **How to use:** **Disconnect Project** → choose **Keep Files** or **Clear All Files**.
- **Options:** keep vs clear Firestore files.
- **Limits and rules:** Always removes `FirebaseService`, config files, auth functions, push notification code, the Firebase packages and `main.dart` lines; signs Nowa out of Google.
- **Gating:** none found.
- **Code refs:** `packages/data/lib/src/firebase/setup/views/connected_main_screen.dart:201-216`; `packages/data/lib/src/firebase/setup/views/disconnect_dialog.dart:46-86`; `packages/data/lib/src/firebase/firebase_manager.dart:158-189`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Firestore Collections
- **What it does:** Describes your Firestore data structure in Nowa: main collections, sub collections and typed fields. Each collection is a Dart model used by queries (it does not show or edit data).
- **Where:** Files panel → `lib/firebase/collections.dart`. In design mode, clicking the file shows a popup with **Add Main Collection** and the collection tree; clicking a collection opens the **Collections** view in the editor (fields in the middle, field details on the right).
- **Labels:** **Add Main Collection**; dialog "Add a new main collection" / "Add a new Sub Collection for <parent>", hint "Name of the collection, ex: orders", **Add**, **Cancel**, validation "Please enter collection name"; collection row hover **+** tooltip **Add Sub Collection**; right-click **Remove**; view: collection name (editable), "This table only represents the structure, not the data.", field list with **+ Field**; right panel "Select something to see its details" or the field's details; empty view "Nothing selected" / "select a collection from the outline panel to open it"; not connected: "Not connected to firebase" / "Please connect to firebase in the settings page" / **Firebase Settings**.
- **How to use:**
  1. Connect Firebase.
  2. Files → click `lib/firebase/collections.dart` → **Add Main Collection** → name (e.g. `orders`) → **Add**.
  3. Add fields with **+ Field** and set each field's type on the right.
  4. Hover a collection → **+** for a sub collection.
- **Options:** collection name; field names and types.
- **Limits and rules:** "Collection with name <name> already exists". Removing a collection also removes its sub collections. Undo works for add/remove.
- **Gating:** needs a connected Firebase project.
- **Code refs:** `packages/data/lib/src/firebase/firebase_plugin.dart:37-62`; `lib/project/panels/files_panel/files_list.dart:334-358`; `packages/data/lib/src/firebase/firestore/collections_manager.dart:27`, `:65-83`, `:92-110`; `packages/data/lib/src/firebase/firestore/widgets/firestore_outline.dart:65-98`; `packages/data/lib/src/firebase/firestore/widgets/firestore_outline_tile.dart:51-110`, `:168-211`; `packages/data/lib/src/firebase/firestore/widgets/collections_workspace.dart:20-43`; `packages/data/lib/src/firebase/firestore/widgets/firestore_common.dart:17-31`, `:59`; `packages/data/lib/src/firebase/firestore/widgets/firestore_details.dart:20`.
- **Old docs:** `firebase/firestore.md` (outdated: V1 video only).
- **Screenshot value:** high: Collections view with a collection and its fields, the outline popup beside it.

### Firestore Queries (query builder and Test)
- **What it does:** Builds Firestore queries visually as reusable functions (read, filter, sort, count, live snapshots, add, set, delete) and tests them against your database.
- **Where:** Files panel → `lib/firebase/queries.dart` → popup **Add New Query** / query list; clicking a query opens the **Queries** view (builder in the middle, parameters on the right).
- **Labels:** **Add New Query**; dialog **Function Name**, hint "Name of Function", **Cancel**, **Create** ("Please enter a name"); right-click a query → **Remove**; view: query name, "This function is selected, you can edit its parameters and the query that it returns", **Query**, "Return:   <type>", builder starting with `FirebaseFirestore.instance`, dropdowns **Select Collection** (or "No Collections"), next-step dropdown, argument dropdowns **Select Field**, **Select Operator**, **Select Value** (with **Create New Param** and **Enter Value**), ascending/descending; backspace icon removes the last step; status icon tooltips "Query is Future or Stream, you can run it" / "Query not Future or Stream, so you can't run it"; right panel parameter list ("No Function selected" when none). Test section **Test**, "You can set values for params just for testing then press on RunTest to see the result of the query, automatically all params will get the default values", **Parameters**, **Preview**, **Run Test** (**Restart** for streams), "Run a test to preview your data", "No Data was found.", "Data was added successfully", "Success", "Error: …", "Must be a Future function to run the test.".
- **How to use:**
  1. Define collections first.
  2. **Add New Query** → name → **Create**.
  3. **Select Collection**, then pick the next step from the dropdown and fill its arguments (e.g. `where` → field, operator, value or **Create New Param**).
  4. End with `get` (Future) or `snapshots` (Stream) to read, or `add`/`set`/`delete` to write.
  5. In **Test**, set parameter values → **Run Test**.
  6. Use the query in a **Data Builder** (source **Firestore**) or call it from an action (logic researcher; queries also appear under a **Firebase** category in the logic editor).
- **Options:** steps offered after a collection: `add`, `doc`, `get`, `where`, `orderBy`, `count`, `snapshots`; after `where`/`orderBy`: `get`, `where`, `orderBy`, `count`, `snapshots`; after `count`: `get`; after `doc`: `set`, `get`, `delete`, `snapshots` and the collection's sub collections. Operators: `>`, `<`, `==`, `!=`, `<=`, `>=`, `contains` (arrayContains). `orderBy`: field + ascending/descending.
- **Limits and rules:** No `update` or `limit` step in the builder. Only Future/Stream queries can be tested. Parameters created from argument dropdowns are typed (`addedParam` uses the collection model, `docParam` is `String?`).
- **Gating:** query testing is blocked in the Windows desktop app: "Testing Firestore Queries isn't possible on Windows version" / "Simply connect your query to the UI and test it by running the app on a simulator, or use Nowa web or MacOS version" / link "Read more about this issue and how to walk around it" (`packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:104-163`).
- **Code refs:** `packages/data/lib/src/firebase/firestore/queries_builder/provider/query_builder_manager.dart:16`; `packages/data/lib/src/firebase/firestore/widgets/firestore_outline.dart:127-150`, `:162-237`; `packages/data/lib/src/firebase/firestore/widgets/firestore_outline_tile.dart:217-262`; `packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:26-100`, `:184-206`; `packages/data/lib/src/firebase/firestore/queries_builder/provider/fb_query_function.dart:179-227`; `packages/data/lib/src/firebase/firestore/queries_builder/ui/query_part_widgets.dart:10`; `packages/data/lib/src/firebase/firestore/queries_builder/ui/lists_widgets.dart:68-135`; `packages/data/lib/src/firebase/firestore/queries_builder/ui/query_argument_editor.dart:40-120`, `:243-290`, `:351-359`; `packages/data/lib/src/firebase/firestore/queries_builder/ui/query_test_section.dart:30-106`, `:194-238`; `packages/data/lib/src/firebase/firebase_plugin.dart:121-146`.
- **Old docs:** `firebase/firestore.md` (outdated: V1 video); `firebase/known-issues/firebase-windows.md` (accurate on the Windows limitation and workarounds; linked from the app, URL must stay; one outdated tip about upcoming GitHub integration).
- **Screenshot value:** high: Queries view with `collection('orders') → where → orderBy → snapshots` and the Test preview.

### Data Builder
- **What it does:** Shows asynchronous data in the UI: it calls a source (an API request, a Supabase function or a Firestore query), shows a loading widget while waiting, an error widget on failure, and builds its child with the result available as `data`.
- **Where:** select a widget → right panel → **Add Wrapper** → search "Search for a wrapper" → **Data Builder**. Or Widgets panel → **Layout** → **Data Builder** (doc link `https://docs.nowa.dev/ui/widgets/widget-desc/data-builder`).
- **Labels:** widget card "Dynamically build UI elements based on a collection of data."; fields **Source** (dropdown **Firestore**, **Supabase**, **API Request**), then per source: **API** button (popup **Select API**), **Query** button (popup **Select Supabase Functions** or **Select Firestore Query**); each popup lists functions plus **None**; the chosen function's parameters appear below; **Loading Widget** (default centered circular progress indicator); **Error Builder** (default red text of the error); recovery button "Problem with field, reset to default".
- **How to use:**
  1. Select the widget that should show the data (often a **List View**) → **Add Wrapper** → **Data Builder**.
  2. In the Data Builder fields, set **Source**, then click **API**/**Query** and pick the request/function.
  3. Fill its parameters if any.
  4. Inside the child, bind fields to `data` (e.g. for a list: **Item Count** = the list's length, item texts from `data[index]` fields) (binding UI: designer/logic researchers).
  5. Play the screen or run the app to see real data.
- **Options:** **Source**; function; function parameters; **Loading Widget**; **Error Builder**.
- **Limits and rules:** Only functions returning a Future or Stream can be picked ("Error : must be Future or Stream"); a Stream fills the builder's `stream`, a Future its `future` (`packages/data/lib/src/common/data_link_menu.dart:22-59`). At runtime "No data source provided" or "Only one data source can be provided" is passed to the error builder (`packages/nowa_runtime/lib/src/widgets/widgets.dart:33-39`). On the board (design mode) Futures and Streams are not called: Nowa shows placeholder data built from the return type: text as `[fieldName]`, lists of 3 items, a placeholder image, zeros/false (`packages/core/lib/src/interpreter/block_tree.dart:786-797`, `packages/core/lib/src/interpreter/mock.dart:243-298`). So a request with a model shows realistic placeholders, while a raw `Response` shows little. Real data appears in Instant Play/App Run or on a device.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/wrappers_to_add.dart:86`; `packages/designer/lib/src/details/widget_details.dart:66-104`, `:189-199`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:455-465`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:223-265`; `packages/designer/lib/src/designer_plugin.dart:57`; `packages/core/lib/src/fields/data_field.dart:22-51`, `:124-221`; `packages/data/lib/src/api/views/api_field.dart:10-127`; `packages/data/lib/src/supabase/ui/sb_field.dart:8-56`; `packages/data/lib/src/firebase/firebase_field.dart:11-85`; `packages/data/lib/src/supabase/supabase_plugin.dart:43-73`.
- **Old docs:** `ui/widgets/widget-desc/data-builder.md` (outdated: one WordPress video; URL opened by the app, must stay or redirect); `ui/wrappers/wrappers-list.md`, `ui/widgets/widgets-ref.md` one-liners (accurate but thin); `supabase/ui.md` (partly outdated: Source has no "custom" option; `data[index]['task']` predates models).
- **Screenshot value:** high: details panel of a Data Builder wrapping a List View with Source **API Request** chosen, board showing `[title]` placeholders.

### Constants (Settings → General → Constants)
- **What it does:** One page for all integration keys and values the app needs at runtime (Supabase URL/anon key, Stripe publishable key, RevenueCat keys…) plus your own constants. They are generated into `lib/globals/app_constants.dart` (`AppConstants`).
- **Where:** top bar **Settings** → **General** → **Constants**.
- **Labels:** **Constants**, "Manage all Secret keys for your integrations in one place. Changes here are reflected in individual integration panels and vice versa."; one section per integration (named like the integration) with its fields; **Custom Constants** with **+** (tooltip **Add custom constant**), "No custom constants defined. Click + to add one.", new row hints **Name** / **Value**, tooltips **Confirm**, **Cancel**, **Remove**.
- **How to use:**
  1. Settings → **Constants**.
  2. Edit a value and press Enter/leave the field to save.
  3. **+** under **Custom Constants** → name + value → ✓.
  4. Use a constant in code/AI as `AppConstants.<name>`.
- **Options:** per constant value.
- **Limits and rules:** Values are compiled into the app (`static const String` in `AppConstants`), so only put publishable/anon keys here; Stripe's secret key and webhook secret are stored as Supabase secrets instead (see Stripe).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/constants_settings.dart:9-99`, `:158-181`; `packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:13-33`; `packages/core/lib/src/interpreter/packages/package_config/config_token.dart:118-120`; `packages/core/lib/src/settings/project_settings.dart:30`.
- **Old docs:** missing.
- **Screenshot value:** medium: Constants page with a Supabase section and one custom constant.

### Shared Preferences (local storage actions)
- **What it does:** Stores small values on the user's device (Flutter `shared_preferences`, included in every project as `sharedPrefs`), e.g. a login token, a setting, a flag. API collections can read their auth token from it (**Auth Key**).
- **Where:** logic editor action picker → category **Shared Preferences** → **clear**, **remove key**, **set**, **get** (logic researcher for the picker). Project Details → **Shared Preferences** → **Clear** resets the values saved while previewing in Nowa.
- **Labels:** **clear**, **remove key**, **set**, **get**; **set**/**get** fields **Type** (`string`, `int`, `double`, `bool`, `stringList`), **Key**, **Value** (set); Project Details field **Shared Preferences** ("Shared preferences are used to store small amounts of data that can be accessed across app sessions. You can clear the shared preferences to reset any stored data."), button **Clear**.
- **How to use:**
  1. In an action, add **Shared Preferences** → **set**; pick **Type**, type the **Key** and choose the **Value**.
  2. Read it back with **get** (same **Type** and **Key**).
  3. To reset preview data, Settings → **Project Details** → **Shared Preferences** → **Clear**.
- **Options:** type, key, value.
- **Limits and rules:** The **Shared Preferences** category is offered in the logic editor (circuit) suggestions (`packages/core/lib/src/interpreter/suggestion.dart:467-506`). In Nowa's preview, values are kept per project in Nowa's own storage, not on a device (`packages/core/lib/src/interpreter/libraries/shared_preferences_library.dart:145-170`). Not secure storage: no encrypted storage integration found.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/suggestion.dart:481-506`; `packages/core/lib/src/fields/expression_builder/expression_details.dart:345-460`; `packages/core/lib/src/interpreter/packages/dart_package.dart:91`; `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:25-30`; `packages/core/lib/src/settings/project_detail_settings.dart:46-65`.
- **Old docs:** `api/.authkey.md` (unpublished draft) mentions it; no page (missing).
- **Screenshot value:** medium: a **set** action with Type, Key, Value.

### Stripe (Settings → Integrations → Stripe)
- **What it does:** Adds Stripe payments (one-time purchases, consumables, subscriptions) to a Supabase-backed app. Nowa stores your keys, creates payment tables, deploys Supabase edge functions and a webhook, and generates `StripePaymentService` for the app.
- **Where:** top bar **Settings** → **Integrations** → **Stripe**.
- **Labels:** **Stripe**, "Integrate Stripe payment processing into your Supabase-backed applications. Configure your database tables to handle payments seamlessly."; **Enabled** switch; **1. API Keys** ("Configure your Stripe API keys"): **Merchant Name** (hint "e.g. My Store"), **Country Code** (hint "e.g. US"), **Publishable Key** (hint "pk_test_..."); **Purchase Types** ("Select one or more payment types for your app"): **One-Time**, **Consumable**, **Subscription** with descriptions "One-Time: Each record can only be purchased once per user. Ideal for digital goods, access passes, or unique items.", "Consumable: Records can be purchased multiple times. Ideal for credits, tokens, or in-app currency.", "Subscription: Recurring billing using a Stripe Price ID. Ideal for memberships, plans, or premium access."; then (Supabase connected) **Secret Key** (hint "sk_test_..."), **Webhook URL** (copy button tooltip **Copy webhook URL**, "Webhook URL copied to clipboard"; helper "Copy this URL and paste it as the endpoint URL when creating a webhook in your Stripe Dashboard (Developers > Webhooks > + Add endpoint)."), **Webhook Secret** (hint "whsec_..."); **2. Payment Methods** ("Enable optional payment methods. Each requires the Country Code set above."): **Apple Pay** ("Accept Apple Pay on iOS devices") + **Apple Merchant ID *** (hint "merchant.com.example.yourapp"), **Google Pay** ("Accept Google Pay on Android devices"); **3. Business Table** ("Select the table containing your orders or transactions"): **Table** ("Select a table", tooltip **Refresh tables**, "No tables found" + **Refresh**); **4. Map Fields** ("Map your table columns to Stripe payment fields"): **ID Field**, **Amount Field** ("Select column"), **Currency** (**From Column** / **Fixed Value**) → **Currency Column** or **Fixed Currency** (hint "e.g. USD"); **Deploy Configuration** (progress messages, "Deployed successfully!"). Banner without Supabase: "Connect to Supabase to configure backend settings, secrets, and deploy edge functions.".
- **How to use:**
  1. Connect Supabase with **Connect** (authorized), and have a table of purchasable items for one-time/consumable payments.
  2. Settings → **Stripe** → **Enabled**.
  3. **1. API Keys**: Merchant Name, Country Code, Publishable Key (press Enter/leave field to save).
  4. Pick **Purchase Types**.
  5. Paste the **Secret Key**; copy the **Webhook URL** into a new Stripe webhook endpoint; paste its signing secret into **Webhook Secret**.
  6. Optional **2. Payment Methods**: Apple Pay (with Merchant ID) / Google Pay (also enable them in Stripe).
  7. One-Time/Consumable: **3. Business Table** → table; **4. Map Fields** → ID, Amount, Currency.
  8. **Deploy Configuration** and wait for "Deployed successfully!".
  9. Call `StripePaymentService` methods from your buttons (or ask the AI).
- **Options:** purchase types (default One-Time); Apple Pay, Google Pay (default off); currency mode (column or fixed).
- **Limits and rules:** **Deploy Configuration** is disabled until required fields are set: Apple Merchant ID when Apple Pay is on; for One-Time/Consumable a table, ID Field, Amount Field and currency (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:333-345`). Deploy creates Supabase tables `nowa_stripe_one_time_payments`, `nowa_stripe_consumable_payments`, `nowa_stripe_subscriptions` (per type), edge functions `stripe-one-time-payment-intent`, `stripe-consumable-payment-intent`, `stripe-create-subscription`, `stripe-cancel-subscription`, `stripe-webhook`; webhook URL `https://<project-ref>.supabase.co/functions/v1/stripe-webhook`. Secret Key and Webhook Secret are saved as Supabase secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`), not in the app; Merchant Name, Country Code and Publishable Key go to **Constants**. Webhook events the deployed function handles: `payment_intent.succeeded`, `payment_intent.payment_failed` (one-time/consumable) and `customer.subscription.created`/`updated`/`deleted`, `invoice.paid`, `invoice.payment_failed` (subscriptions). Generated app methods (`lib/integrations/stripe_payment_service.dart`): `processPayment(recordId:)` (named `processOneTimePayment`/`processConsumablePayment` when both are on), `getPaymentStatus`, `getPaymentDetails`, `subscribe(priceId:)`, `getSubscriptionStatus`, `getSubscriptionDetails`, `cancelSubscription`; status methods require a signed-in Supabase user ("User not authenticated"). Android minimum SDK 23; MainActivity switched to FlutterFragmentActivity; iOS Apple Pay entitlements written. Turning **Enabled** off removes the settings, service file and platform changes.
- **Gating:** needs Supabase connected; secrets and deploy go through Nowa's Supabase authorization (**Connect**) (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:220-251`); see Open questions.
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:39`; `packages/core/lib/src/interpreter/packages/integrations/stripe_package_config.dart:9-88`; `packages/core/lib/src/integrations/stripe/stripe_settings.dart:60-137`, `:140-200`, `:212-295`, `:296-455`, `:457-655`; `packages/core/lib/src/integrations/stripe/models/purchase_type.dart:10-19`; `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:374-497`, `:511`, `:596-840`, `:920-931`; `packages/core/lib/src/integrations/stripe/stripe_edge_functions.dart:806-828`; `packages/core/lib/src/integrations/stripe/stripe_manager.dart:35-60`.
- **Old docs:** `payments/stripe/stripe-integration.md` (mostly accurate flow, partly outdated: switch label is **Enabled**; field is **Webhook Secret**; section order differs; lists 9 events incl. `payment_intent.canceled`/`processing` that the function doesn't handle; table described as products while the UI says "orders or transactions"; says "Supabase MCP is enabled" is required whereas the code needs Supabase authorization).
- **Screenshot value:** high: Stripe page with API Keys and Purchase Types; second: Map Fields + Deploy Configuration.

### RevenueCat (Settings → Integrations → RevenueCat) and RevenueCat Paywall
- **What it does:** Adds RevenueCat in-app purchases and subscriptions: stores your public API keys, configures RevenueCat at app start, generates `RevenuecatService`, and offers a pre-built **RevenueCat Paywall** widget.
- **Where:** Settings → **Integrations** → **RevenueCat**; widget: Widgets panel → **Integrations** → **RevenueCat Paywall**.
- **Labels:** **RevenueCat** + description ("Configure RevenueCat for in-app purchases and subscriptions in your app. … You can get your API key from the RevenueCat dashboard at https://app.revenuecat.com"); **Enabled**; **Configuration**: **Apple API Key** (placeholder "appl_xxxxxxxxxxxxxxxxx"), **Android API Key** ("goog_xxxxxxxxxxxxxxxxx"), **Web API Key** ("strp_xxxxxxxxxxxxxxxxx"), each with a help text "Your RevenueCat public … API key. Get it from: https://app.revenuecat.com". Widget card "Pre-built paywall UI for in-app purchases and subscriptions powered by RevenueCat."; on the board "RevenueCat Paywall" / "Run to preview"; in the Nowa preview "Run on a simulator/emulator or mobile device to preview".
- **How to use:**
  1. Settings → **RevenueCat** → **Enabled**.
  2. Paste the public API keys for the platforms you ship.
  3. Add the **RevenueCat Paywall** widget (accept **Add Missing Dependencies** if asked) or call `RevenuecatService().fetchOfferings()` / `purchasePackage(...)` from actions or via the AI.
  4. Test on a simulator/device.
- **Options:** the three keys.
- **Limits and rules:** The key for the running platform is used (iOS/Android/Web) (`packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart:85-98`). Adds `purchases_flutter`; the paywall widget also needs `purchases_ui_flutter`. iOS minimum 14.0; Android MainActivity rewritten when enabled. Keys are stored as constants (see Constants).
- **Gating:** paywall preview only when run on a simulator/device (`packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:27-77`).
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:36`; `packages/core/lib/src/interpreter/packages/integrations/revenuecat_package_config.dart:12-151`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:916-927`; `packages/core/lib/src/interpreter/packages/dart_package.dart:166-169`.
- **Old docs:** missing (What's New 3.6 only).
- **Screenshot value:** medium: RevenueCat settings page; the paywall placeholder on the board.

### AdMob (Settings → Integrations → AdMob) and Admob Banner
- **What it does:** Shows Google AdMob ads: the settings page holds your AdMob App IDs per platform; the **Admob Banner** widget shows a banner; the `loadAndShowInterstitialAd` function shows a full-screen ad.
- **Where:** Settings → **Integrations** → **AdMob**; widget: Widgets panel → **Integrations** → **Admob Banner** (doc link `https://docs.nowa.dev/ui/widgets/widget-desc/admob-banner`).
- **Labels:** **AdMob** + description ("The AdMob settings page allows you to add the keys for showing the Advertisements on your app … add an AdMob key for both Android and iOS."); **Enabled**; **Configuration**: **Android App ID**, **iOS App ID** (placeholder "ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx"). Widget card "Rectangular ads that appear at the top or bottom of the device screen. …"; banner fields: without keys "No API Keys" + **AdMob setup**; with keys **Android Unit ID**, **Ios Unit ID** (or **AdMob Android setup** / **AdMob IOS setup** buttons for a missing platform key), **Show Test Ads**.
- **How to use:**
  1. Settings → **AdMob** → **Enabled**; paste both App IDs.
  2. Add **Admob Banner** to a screen; fill the ad unit IDs.
  3. Keep **Show Test Ads** on while testing; turn it off for release.
  4. For interstitials, call `loadAndShowInterstitialAd` from an action (logic researcher).
- **Options:** **Show Test Ads** default on (Google test unit IDs are used while on).
- **Limits and rules:** "App ID should start with "ca-app-pub-"" (validation). The description warns to add keys for both platforms. Banner size is the standard banner. Outside Android/iOS the banner shows "This is an editor preview for Admob"; "no adUnitId" when the platform's unit ID is empty with test ads off; "BannerAd failed to load" on load errors. Adds `await MobileAds.instance.initialize();` to `main.dart`.
- **Gating:** real ads only on Android and iOS (`packages/nowa_mobile_ads/lib/src/widgets/nowa_ad_banner_widget.dart:26-37`, `:70-76`).
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:35`; `packages/core/lib/src/interpreter/packages/integrations/admob_package_config.dart:11-47`, `:268-354`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:835-851`; `packages/nowa_mobile_ads/lib/src/widgets/nowa_ad_banner_widget.dart:5-87`; `packages/nowa_mobile_ads/lib/src/widgets/nowa_ad_interstitial_function.dart:5-35`; `packages/core/lib/src/interpreter/libraries/admob_library.dart:8`, `:190-197`.
- **Old docs:** `ui/widgets/widget-desc/admob-banner.md` ("Coming soon": missing; URL opened by the app, must stay or redirect).
- **Screenshot value:** high: AdMob settings with both IDs; banner details panel with unit IDs and Show Test Ads.

### Google Maps (Settings → Integrations → Google Maps)
- **What it does:** Stores Google Maps API keys for Android, iOS and Web and injects them into the platform files so the **Google Maps** widget works.
- **Where:** Settings → **Integrations** → **Google Maps**; widget: Widgets panel → **Integrations** → **Google Maps**.
- **Labels:** **Google Maps** + description ("… You need separate API keys for Android and iOS. … You can get your API keys from https://console.cloud.google.com/"); **Enabled**; **Configuration**: **Android API Key**, **iOS API Key**, **Web API Key** (placeholder "AIza..."). Widget warning when no key: "Google Maps API keys are not set. Please configure them in the project settings to use the Google Map widget." (gear opens the page); board preview "Google Maps" / "Run to preview".
- **How to use:**
  1. Settings → **Google Maps** → **Enabled**; paste the keys.
  2. Add the **Google Maps** widget (accept **Add Missing Dependencies**).
  3. Run on a simulator/device to see the map.
- **Options:** three keys.
- **Limits and rules:** Android key → AndroidManifest; iOS key → AppDelegate (`GMSServices.provideAPIKey`); Web key → `index.html` script. iOS minimum 14.0. Widget defaults (camera, my-location) belong to the widget catalog.
- **Gating:** map renders only when run on a simulator/device (`packages/core/lib/src/interpreter/packages/integrations/google_maps_package_config.dart:137-147`).
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:34`; `packages/core/lib/src/interpreter/packages/integrations/google_maps_package_config.dart:11-116`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:890-914`.
- **Old docs:** missing (What's New 3.3.2 only).
- **Screenshot value:** medium: settings page with keys.

### Google Sign-In (Settings → Integrations → Google Sign-In)
- **What it does:** Configures the `google_sign_in` package for Google sign-in without Firebase (for example with Supabase Auth).
- **Where:** Settings → **Integrations** → **Google Sign-In**.
- **Labels:** **Google Sign-In**, "Enable Google Sign-In authentication in your app.\n\nYou will need OAuth 2.0 Client IDs from Google Cloud Console."; **Enabled**; **Configuration**: **iOS Client ID** (help "OAuth 2.0 Client ID for iOS from Google Cloud Console.\nRequired for standalone Google Sign-In (non-Firebase)."), **Web Client ID** (help "OAuth 2.0 Client ID for Web from Google Cloud Console.\nAlso used as serverClientId on Android."), placeholder "xxxxx.apps.googleusercontent.com". When Firebase Google auth is configured: **Managed by Firebase** ("Google Sign-In is configured through Firebase Authentication. To modify settings, go to Firebase settings.") + **Open Firebase Settings**.
- **How to use:** **Enabled** → paste client IDs; then ask the AI to implement Google Sign-In with Supabase (What's New 3.6) or call it from code.
- **Options:** the two IDs.
- **Limits and rules:** **iOS Client ID** goes into Info.plist (GIDClientID and the reversed-ID URL scheme). **Web Client ID** has no platform-file target in this version ("not used for now" code comment); it is stored as a constant only (`packages/core/lib/src/interpreter/packages/integrations/google_sign_in_package_config.dart:36-44`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:38`; `packages/core/lib/src/interpreter/packages/integrations/google_sign_in_package_config.dart:11-164`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Deep Links (Settings → Integrations → Deep Links)
- **What it does:** Configures links that open your app: a custom URL scheme (`myapp://…`) and Android App Links for your https domain. (Routing itself: logic/navigation researcher.)
- **Where:** Settings → **Integrations** → **Deep Links**.
- **Labels:** **Deep Links**, "Configure deep linking to open your app from custom URL schemes and web URLs. … URL Scheme: Opens your app via links like myapp://path … App Links (Android) / Universal Links (iOS): Opens your app from https:// URLs on your domain."; **Enabled**; **Configuration**: **URL Scheme** (help 'Custom URL scheme (e.g., "myapp" for myapp://path).', placeholder "myapp"), **Host** (help 'Your domain for App Links / Universal Links (e.g., "example.com"). Include path prefix if needed (e.g., "example.com/app").', placeholder "example.com").
- **How to use:** **Enabled** → set **URL Scheme** and/or **Host**.
- **Options:** URL Scheme; Host.
- **Limits and rules:** URL Scheme is written to iOS Info.plist and the Android manifest (Android filter uses host `open.my.app`); **Host** is written only to the Android manifest (autoVerify intent filter); no iOS associated-domains entry is written by this config (`packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:28-113`). Flutter's default deep linking is turned off on both platforms.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:37`; `packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:7-55`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Add Missing Dependencies (integration widgets)
- **What it does:** When you add a widget whose package isn't installed (e.g. **Google Maps**, **RevenueCat Paywall**, **Admob Banner**), Nowa lists what's missing and adds it for you.
- **Where:** appears when selecting or dropping such a widget from the Widgets panel.
- **Labels:** **Add Missing Dependencies**, "This widget requires the following dependencies", lines like 'Add package "<name>" to pubspec.yaml (version: <version>)', **Cancel**, **Add** (**Adding...**).
- **How to use:** click **Add**; the widget is placed after the packages are added.
- **Options:** none.
- **Limits and rules:** Widgets with missing dependencies can't be dragged; selecting them opens the dialog (`packages/core/lib/src/widgets/widget_picker.dart:395-425`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:6`, `:47`, `:93-109`; `packages/core/lib/src/dependency_system/dependency.dart:16-33`; `packages/designer/lib/src/design/drop_on_board.dart:29-34`.
- **Old docs:** missing.
- **Screenshot value:** low (widgets researcher may capture).

## Not user-facing (leave out)
| Thing | Code ref | Why |
|---|---|---|
| Firebase "Create New Firebase Project" dialogs (`CreateProjectNowaDialog`, loading/success/error) | `packages/data/lib/src/firebase/setup/views/create_project_dialog.dart:5`, `:93`, `:177`, `:239` | dead code: not referenced anywhere; users create projects in the Firebase console |
| `FirebaseApiService.createProject` / `createGoogleCloudProject` | `packages/data/lib/src/firebase/firebase_api_service.dart:165-180`; `packages/data/lib/src/firebase/firebase_manager.dart:108-110` | internal, unused by the UI (the needed OAuth scope is commented out at `firebase_manager.dart:152`) |
| "Sample Settings" integration page | `packages/core/lib/src/plugin.dart:146-148`; `packages/core/lib/src/samples/samples_settings.dart:8-23` | debug-only (`kDebugMode`) |
| Flutter Blue Plus package config | `packages/core/lib/src/interpreter/packages/integrations/flutter_blue_plus_package_config.dart:8-63` | not in `SupportedPackages.all` (`packages/core/lib/src/interpreter/packages/dart_package.dart:61-88`), marked "TODO: still needs testing" |
| Old Supabase table/realtime picker for the Data Builder | `packages/data/lib/src/supabase/ui/sb_field.dart:59-276` | commented out |
| API "mock data" button | `packages/data/lib/src/api/views/api_panel/api_request_settings/api_request_settings.dart:33-36` | mentioned in a code comment only; no UI |
| `SupabaseService.queryTable`, `listenToTable`, `insertRecord` | `packages/data/lib/src/supabase/supabase_service.dart:18-22` | internal service API, no UI |
| Debug side panels "Libraries", "Trace", "ManualTool" | `lib/project/side_bar.dart:77-92` | debug-only (other researchers may list) |

## Open questions
- Stripe with a **Use Keys** Supabase connection: secrets and deploy call Nowa's Supabase proxy (`packages/data/lib/src/supabase/supabase_oauth_service.dart`), which presumably fails without authorization; what error does the user see? Also `SupabaseOAuthManager.applyMigration/deployEdgeFunction/setSecret` catch errors without rethrowing (`packages/data/lib/src/supabase/supabase_oauth_manager.dart:128-208`), so Stripe's **Deploy Configuration** may report success even if a step failed; confirm before documenting troubleshooting.
- Old Stripe page says "Supabase MCP must be enabled"; code requires Supabase authorization (**Connect**), not the MCP toggle. Confirm wording with the team.
- Is Supabase authorization stored per Nowa project or per account? Calls pass `projectId` (`packages/data/lib/src/supabase/supabase_oauth_service.dart:21-24`, `:52-57`), suggesting per project (a second project would need **Connect** again).
- FCM test send: on HTTP 401 (expired Google token) Nowa calls `disconnect(keepFirestoreFiles: true)` and removes the Firebase setup (`packages/data/lib/src/firebase/setup/views/notification_settings.dart:183-185`). Intended? Should the docs warn users?
- Firebase Google token: stored per device (`firebase-token`); when it expires, how does the Firebase settings page behave (projects list load error, spinner)? Not visible in code.
- Copy bugs visible in the UI: Firebase sign-in screen shows the members/roles sentence (`packages/data/lib/src/firebase/setup/views/sign_in_with_google.dart:34`); collection **Headers** help repeats the Base URL text (`packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:243`); Google sign-in preview dialog says "preview for Sign Out" (`packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:142`); Generate Models error "You can generate model for List of primitives" (`packages/core/lib/src/model_generator/generate_models_dialog.dart:41`). Document around them or report?
- Firebase Storage and Realtime Database: only `storageBucket`/`databaseURL` options are written; no UI. Should docs say "not supported in the visual tools (use the AI or custom code)"?
- Push notifications on Web: no service-worker setup is generated; is web push expected to work?
- API tests from Nowa web run in the browser; APIs without CORS headers may fail (no proxy for requests, `proxyLink` is image-only, `packages/core/lib/src/utils.dart:134-139`). Confirm and decide whether to mention.
- **DOWNLOAD** method in the request editor: `RequestFuncHelper.generate` asserts a save path for downloads (`packages/data/lib/src/api/model/request_func.dart:233-237`); what happens when a user switches an existing request to DOWNLOAD? Untested.
- Supabase new API keys (publishable/secret) "not currently supported": still true for **Connect** (which fetches the legacy `anon` key, `packages/data/lib/src/supabase/supabase_oauth_manager.dart:84-90`)? If a project has legacy keys disabled, Connect would fail with "Anon key not found for project …".
- Data Builder **Source** order (Firestore, Supabase, API Request) follows plugin init order; "Firestore" is listed even when Firebase is not connected (empty list). Confirm the list in the running app.
- External console steps (Firebase console, Supabase dashboard Realtime/RLS, Stripe dashboard webhook UI, Xano "Metadata API & MCP Server" → "Manage Access Token", Apple Merchant ID/certificates) can't be verified in code; keep them minimal and link to vendor docs.
- Deep Links: the description mentions Universal Links (iOS) but **Host** is only applied to Android; should the docs state iOS universal links need extra manual setup?
