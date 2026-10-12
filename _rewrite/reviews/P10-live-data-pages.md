# P10 live check: REST API and Show data pages (Nowa 3.13.0)

Run: 10 Oct 2026, headless Chromium (Playwright 1.56.1, build 1194) through the sandbox proxy, `https://app.nowa.dev/playground`, version in the status bar **v3.13.0-79**.
Starter app, never signed in, no AI prompt, no deploy, no account. The top-bar **Save** was never clicked (the **Save** inside the **Generate Models** dialog is part of the flow and
asked for nothing). Only public GET test APIs were run: `https://catfact.ninja/fact`, `https://jsonplaceholder.typicode.com/todos?_limit=5`, `/todos/1` and one 404 path. A POST request was
created and opened but never run; no token or key was typed (an Auth Key *name* was typed once to see the field appear).
Pages checked: `docs/integrations/rest-api/index.md` (Create a collection, Add a request, Test a request, Turn the response into a model; I also looked at the sections between them) and
`docs/integrations/show-data.md` (Add a Data Builder, Show a list; plus Use the data, What you see while it loads, See it on the board and in Play). The pages were not edited.
Evidence: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/cap-data/shots/` (`s*.png`, one per step; every one was opened and looked at).

## Captures (both taken)

- `static/img/docs/integrations/integrations-rest-api-2.png` (1600x534): test view of `getFact` (collection Cats, base URL `https://catfact.ninja`, GET `/fact`) after **Run Test**: header
  "getFact", "API URL: https://catfact.ninja/fact", "Status: 200 OK" (the one highlight), **Body** with **Json** (and **Object** beside it), right panel **Testing values**, **Generate Model**,
  **Run Test**. Crop: the bottom panel, full width (x 383-1440, y 477-830 of the 1440x900 window, so the round "?" button stays out).
- `static/img/docs/integrations/integrations-show-data-1.png` (1600x1360): the home screen with a List View wrapped in a Data Builder (Source **API Request**, API `getTodos`, list linked to
  `data`, item text linked to `element.title`): board shows three items with the placeholder text `[title]`; **Details** (scrolled to the end) shows the List View rows and the **Data Builder**
  section (**Source**, **API**, **Loading Widget**, **Error Builder**). One highlight around the **Source** and **API** rows. Crop: board + right panels (x 560-1440, y 42-790).
- `requests/W14.md`: both rows set to `captured`. `log.md`: two rows appended.

## Mismatches (short list; suggested corrections, nothing was changed)

1. **The two create dialogs open with a default name, and typing appends to it** (`rest-api` L18 and L47). **Create New Collection** opens with `ApiCollection` in the field, cursor at the
   end, nothing selected: typing `Zed` gave `ApiCollectionZed` (Class name `ApiCollectionZed`, Path `lib/api/api_collection_zed .dart`). **Create New Request** does the same with
   `newRequest` (`newRequestZed`). The name in **Rename** is selected, so there typing replaces it. Fix L18: "In the **Create New Collection** dialog, replace the suggested name
   (**ApiCollection**) with your own: select it with Ctrl/Cmd+A, then type." Fix L47: "Replace the suggested name (**newRequest**) with yours (select it with Ctrl/Cmd+A first) and click
   **Create**."
2. **Path preview** (`rest-api` L18; L14 is right). The dialog preview reads `Path: lib/api/cats .dart` (a space, no `.api`). The saved file is `lib/api/cats.api.dart` (the Library entry opens
   `cats.api.dart`, the delete dialog asks about "scratch.api.dart", the Console lists `lib/api/scratch.api.dart`). Fix L18: "Nowa shows the **Class name** and a **Path** preview (the file is
   saved as `cats.api.dart` in `lib/api`)."
3. **Method list** (`rest-api` L49). The menu has seven items: GET, POST, PUT, DELETE, PATCH, HEAD and **DOWNLOAD** (not run). "such as" covers it. Optional: add "or **DOWNLOAD**" if the team
   can say what it does.
4. **Params +** (`rest-api` L67). The **+** only shows while the pointer is on the **Params** row. Fix: "Point at **Params** and click the **+** that appears."
5. **The ⋮ is not a menu** (`rest-api` L56). In the JSON editor (the x-www-form-urlencoded editor has the same ⋮, not opened), ⋮ opens a row of four icon buttons plus a × that closes the row;
   the names are tooltips: **Wrap**, **Compress**, **Prettify**, **Copy**. Fix: "Click ⋮ for a row of buttons (point at one for its name): **Wrap** ..., **Compress** ..., **Prettify** ..., **Copy**."
6. **Undo** (`rest-api` L61). JSON `{"keep": 1}` then **raw**: the body is fresh and empty, as written. Ctrl+Z (pressed with the focus on the request panel, then on the board) did not bring the
   JSON back, and the board's Action History (Ctrl+Shift+H, "History for first.board") has no entry for request edits. "Sets the content type" is true but only visible in the generated code
   (`options: Options(contentType: 'application/json')` in `todos.api.dart`); the **Headers** tab stays empty. Fix: drop "Undo brings the old body back." (or ask the team how it is meant to work)
   and say "sets the content type for you (it isn't listed in **Headers**)".
7. **Remove a collection** (`rest-api` L84). There are two dialogs. Not in use: `Are you sure you want to delete "scratch.api.dart"?` with **Cancel** / **Yes**. In use (tried on Todos, then
   cancelled): title "Todos is in use", "Removing Todos from todos.api.dart will affect the following references" and a list (`lib/pages/home_page.dart`, `HomePage.build(...)`), buttons **Cancel** /
   **Remove**; I did not click **Remove**, so a second question after it is untested. Fix: "If nothing uses it, Nowa asks 'Are you sure you want to delete "cats.api.dart"?'; click **Yes**.
   If something uses it, Nowa first lists those places (**Cancel** / **Remove**)."
8. **Return as Response Object** (`rest-api` L116). While the request returns the plain **Response**, the menu next to **Model** has only **Generate from Schema** and **Select Model**;
   **Return as Response Object** is added once a model is set. Fix: "**Return as Response Object**, shown once the request has a model: go back to the plain response."
9. **Source options** (`show-data` L24, table L28-32). The menu has four entries: **Firestore**, **Supabase**, **API Request** and **Custom**. A new Data Builder starts on **Custom**, which has no
   extra row, and the board shows red "No data source provided". Fix: "Set **Source** to ... (a new Data Builder starts on **Custom**, which loads nothing)."
10. **None** (`show-data` L25). The **Select API** popup lists only the requests (`getFact()`, `getTodos()`, `getTodo(...)`; a request with parameters shows `(...)`). There is no **None**; searching
    "none" finds nothing, also when a request is already chosen. The Supabase and Firestore pickers ("Select Supabase Function", "Select Firestore Query") were empty (nothing connected), so
    I could not see a **None** there either. Fix: drop "or pick **None** to clear it", or say "To change it, click the button again and pick another request."

Matches that needed no change are in the table. Details on what is not covered by the table are in "Not verified" and "Other observations".

## Table

Line numbers are those of the pages as read today. "yes" = label and behavior as written; "partly" = see the mismatch number.

| page | claim | what the live UI shows | match? |
|---|---|---|---|
| rest-api L14 | Saved as a Dart file, for example `lib/api/cats.api.dart` | Library entry **Cats** opens `cats.api.dart` (breadcrumb "Boards > cats.api.dart"), folder `lib/api`; delete dialog names `scratch.api.dart` | yes |
| rest-api L16 | Click **Api** in the left sidebar. The **Collections** panel opens | Sidebar icon tooltip "Api  Ctrl 6" (6th icon, 20 / 267); panel header **Collections** with **+** and **Search...** | yes |
| rest-api L17 | Click **+** (**Add Collection**), then **New Collection** | **+** tooltip "Add Collection"; menu: New Collection, Import from Swagger, Import from Postman, Import from Xano | yes |
| rest-api L18 | In the **Create New Collection** dialog, type a name | Dialog "Create New Collection" ("Insert the name of the api collection you want to create.") opens with `ApiCollection` already in the field, cursor at the end; typing appends | partly (1) |
| rest-api L18 | Nowa shows the **Class name** and **Path** it will use | "Class name: Cats", "Path: lib/api/cats .dart" (no `.api`) | partly (2) |
| rest-api L19 | Click **Submit**. The collection appears in the panel | **Cancel** / **Submit**; the collection row appears (name only until a Base URL is set) | yes |
| rest-api L21 | Alt text of integrations-rest-api-1 | Menu entries and the Cats / getFact / createNote rows read as described | yes |
| rest-api L23 | **API Collection...** in the **Add** (+) menu of the Library | Library header **+** tooltip "Add"; menu: New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., **API Collection...**, Import Dart code..., Upload Assets... | yes |
| rest-api L27-36 | Gear on the collection; **Name**, **Base URL**, **Auth Key**, **Headers** (**Add header**), **Close**; saves when you leave a field | Gear (and **+**) appear on hover; dialog "Cats / Edit collection details" with those four rows, **Add header +** (KEY / VALUE rows with a ×) and **Close**; the collection row shows the Base URL after you leave the field | yes |
| rest-api L33 | **Auth Key**: name of the Shared Preferences entry holding the token | Info popover: "The key used to store the auth token in SharedPreferences" | yes |
| rest-api L46 | Hover the collection, click **+**, then **New Request** | **+** shows on hover next to the gear; menu: **New Request**, **Import from curl** | yes |
| rest-api L47 | Type a name and click **Create** | Dialog "Create New Request" with `newRequest` prefilled, cursor at the end (typing appends); **Cancel** / **Create** | partly (1) |
| rest-api L47 | Name becomes a function name such as `getCats`; the request appears under the collection | "Function name: getFact" under the field (`Get Fact` also gives `getFact`); row with a GET badge appears | yes |
| rest-api L48 | Click the request: it opens in a panel at the bottom of the editor | Bottom panel: request name, × at the right, method pill, address, **Test**, tabs **Headers** (open first) and **Body**; right panel **Model** and **Params** | yes |
| rest-api L49 | Method: GET, POST, PUT, DELETE, PATCH or HEAD; with a base URL you only type the path | Menu GET, POST, PUT, DELETE, PATCH, HEAD, **DOWNLOAD**; the address shows the Base URL greyed ("...ttps://catfact.ninja") and you type `/fact` after it | yes (3) |
| rest-api L50 | **Headers** tab, **Add header**; collection headers are listed too, read-only | **Add header +**; a collection header (X-Demo / 1) is listed dimmed; clicking it and typing changed nothing | yes |
| rest-api L51-59 | Body types none, JSON, raw, form-data, x-www-form-urlencoded | Five radio buttons with exactly those names; **none** selected on a new request | yes |
| rest-api L56 | JSON: status icon tooltips **Valid JSON** / **Invalid JSON** | Green check "Valid JSON"; yellow warning "Invalid JSON" while the text is not valid | yes |
| rest-api L56 | The ⋮ menu has **Wrap**, **Compress**, **Prettify**, **Copy** | ⋮ opens a row of icon buttons with tooltips Wrap, Compress, Prettify, Copy, plus a × | partly (5) |
| rest-api L57 | raw: pick **Text**, **XML** or **HTTP** next to it | Dropdown next to the radio, default **Text**, items Text, XML, HTTP; plain text box "Enter plain text..." | yes |
| rest-api L58 | form-data: **Add +**, key, type String / int / double / bool / MultipartFile, **Connect**, **Filename** and **Bytes** for a file | **Add +** top right; table Key / Type / Value, one empty row at once (key, String, value box, **Connect**, ×); "Select type" picker lists String, int, double, bool, MultipartFile (search and **As List** box above); a MultipartFile row shows **Filename** (null) and **Bytes** (0) | yes |
| rest-api L59 | x-www-form-urlencoded: same editor and validity check as JSON | Same code editor (⋮, validity icon; the empty body shows the warning) | yes |
| rest-api L61 | A body type sets the content type and replaces the body with a fresh one | Body replaced by a fresh one (JSON text gone after switching to raw). Content type is only in the generated code | yes |
| rest-api L61 | Undo brings the old body back | Ctrl+Z did not | no (6) |
| rest-api L67 | **+** next to **Params**; new text parameter `param`; rename or change the type under **Edit parameter** | **+** only on hover; new row `T param` already in rename mode; **Edit parameter** with Name, Type (String), Default Value, **Remove** | yes (4) |
| rest-api L68 | In the address, type `$` and pick the parameter; `/search?q=${query}` | `$` opens "Link text" (search, groups, **LOCALS** lists the parameter); picking it writes `${query}` (tried `/posts?q=${query}`) | yes |
| rest-api L69 | JSON body: drag the chip from **Pass Parameters in Body** onto a value, or type `${query}` | The panel **Pass Parameters in Body** with the chip `query` sits beside the JSON editor; dragging and typing not tried | partly (chip only) |
| rest-api L71 | No separate query-string tab | Only **Headers** and **Body** | yes |
| rest-api L82 | **Rename**: right-click, **Rename**, text box, Enter | Menu **Rename** / **Remove**; the name becomes a text box with the old name selected; Enter saves | yes |
| rest-api L83 | **Remove** a request goes right away | No dialog | yes |
| rest-api L84 | **Remove** a collection: lists the places that use it, then asks to confirm | Collection menu has only **Remove**; two dialogs, see 7 | partly (7) |
| rest-api L85 | **Search...** filters requests of every collection by name or endpoint | `/fact` leaves only getFact; `renamed` only that request; collection rows stay | yes |
| rest-api L89 | **Test** next to the address opens the test view; nothing is sent yet | Center reads "Send Request to preview your data"; **Back to Request** replaces **Test**; tabs **Body** / **Headers** | yes |
| rest-api L90 | **Testing values** for each parameter | Right panel header **Testing values**, one row per parameter (`T id` and a field); empty without parameters | yes |
| rest-api L90 | With an **Auth Key**, paste the token in **Auth token value** | Field **Auth token value** (info popover "Enter your authorization token", placeholder "Authorization token"), only when the collection has an Auth Key | yes |
| rest-api L90 | Nowa keeps the token for testing only, not in your app | Cannot be seen in the UI and no token was typed | not checked |
| rest-api L91 | **Run Test** | Orange **Run Test** with a play icon at the bottom of the right panel; a spinner shows while it runs | yes |
| rest-api L92 | Header shows the full address and the status such as `200` | "API URL: https://catfact.ninja/fact" and "Status: 200 OK" (parameters filled in: `.../todos/1`); a failure shows "Status: 404 Not Found" in red | yes |
| rest-api L92 | **Body** with **Json** (raw) / **Object** (parsed); **Headers** lists response headers | Toggle **Json** / **Object** (Object shows a tree with a `result` node); **Headers** tab with Key / Value rows (cache-control, content-type) | yes |
| rest-api L94 | A **MultipartFile** field adds **Upload File** to the right panel | **Upload File** button at the top of the right panel (bytes into `Uint8List` / `List<int>` not tried) | yes |
| rest-api L96 | **Back to Request** | Arrow and "Back to Request" next to the address; the header keeps the last API URL and Status | yes |
| rest-api L96 | Play icon (**Run Query**) on a hovered request opens the test view and sends at once | Orange play icon in a dark square beside the GET badge, tooltip "Run Query"; click: spinner, then 200 OK | yes |
| rest-api L100 | Link to the web-app known issue | Anchor `#api-requests-blocked-in-the-browser` exists. In this run (web app) both tests worked: the two APIs send CORS headers | yes |
| rest-api L106 | **Generate Model**: the response is already in **Content**; **Next** | Dialog **Generate Models**, steps 1 **Content**, 2 **Select Data**, 3 **Generated Models**; "Enter a JSON text and instantly generate usable models for your project."; editor holds the response; **Cancel** / **Next** | yes |
| rest-api L107 | **Select Data**: untick fields; **Next** | "Select All" box, a tree with a box per field (userId, id, title, completed), a preview tree on the right, **Back** / **Next** | yes |
| rest-api L108 | **Generated Models**: **Name**, **Path**, `lib/models`, **Save** | **Name** `GetTodosModel` (from the function name), **Path** `lib/models` (folder button), a card listing the fields, **Back** / **Save** | yes |
| rest-api L110 | **Model** row shows the model name after **Back to Request** | **Model** button reads "GetTodosModel" (list icon for a list response) instead of "Response" | yes |
| rest-api L110 | **Generate Model** is hidden when the last test failed | After a 404 the right panel has only **Testing values** and **Run Test** | yes |
| rest-api L112-116 | Menu next to **Model**: **Generate from Schema**, **Select Model**, **Return as Response Object** | With a model all three; without one only the first two. After **Return as Response Object** the button keeps the old name until the request is reopened | partly (8) |
| rest-api L114 | **Generate from Schema**: paste JSON, build a model without a test | Opens the same **Generate Models** dialog with an empty editor; **Next** stays disabled until the JSON is valid | yes |
| rest-api L115 | **Select Model**: pick an existing model or a basic type | Picker "Select type" with search, **As List**, String, int, double, bool, ... | yes |
| show-data L22 | Add a **List View** first | Library result "List View" (Layout); a new one has **Type** Builder, **List** with **Connect**, **Item Count** 3, **Item Builder** "Place..." | yes |
| show-data L23 | **Add Wrapper**, search **Data Builder**, click it | **Add Wrapper** at the end of **Details**; picker "Search for a wrapper"; "data builder" leaves one row, **Data Builder**; the list now sits inside it (Outline: ListView row with a layers icon) | yes |
| show-data L24 | Data Builder fields below the widget's own settings; **Source** API Request, Supabase or Firestore | **Data Builder** section after the List View rows: **Source**, then **API** / **Query**, **Loading Widget** (shown "Loading Wi..."), **Error Builder**. Source menu: Firestore, Supabase, API Request, **Custom** (default) | partly (9) |
| show-data L25 | Button that reads `none`; row **API** for requests, **Query** for Supabase and Firestore | API Request gives row **API** with `none`; Supabase and Firestore give row **Query** with `none` | yes |
| show-data L25 | Pick a request / function / query, or **None** to clear | "Select API" lists the requests, no **None**; pickers "Select Supabase Function" and "Select Firestore Query" open empty | no (10) |
| show-data L26 | If the request has parameters, their fields appear | A request with parameter `id` adds a field **Id** under **API** | yes |
| show-data L28-32 | Table: API Request / API / requests of all collections, Supabase / Query, Firestore / Query | The picker lists requests from Cats and Todos together; row labels as in the table | yes |
| show-data L36 | Ctrl/Cmd+K, search **Data Builder**, as a widget | Built-in result **Data Builder** (Layout); dropped on the screen it is a 100 x 100 box with a Placeholder child, red "No data source provided", and the same Data Builder fields in **Details** | yes |
| show-data L40 | Inside, `data` is the source's result; a list if it returns a list | **LOCALS** has `data` with a list icon | yes |
| show-data L42-44 | Click a label (**Text**): link menu, **LOCALS**, `data` / fields, **+** to go deeper | "Link Text" menu (search, Custom Expression..., Create Param..., Create Variable..., Compute..., **LOCALS**, **GLOBALS**, **EXPRESSIONS**); a model's fields open next; a **+** appears under the linked chips. **LOCALS** is long (`data` is not first), search finds it | yes |
| show-data L51 | List View: **List** then **Connect**; if **Type** shows **Normal**, choose **Builder** first | **List** has **Connect**; **Type** Normal / Builder defaults to Builder; in **Normal** there is no **List** row (a **Children** list instead) | yes |
| show-data L52 | **LOCALS** then `data` sets **Item Count** to the length | **List** shows the chip `data`; **Item Count** shows `data` and `length` | yes |
| show-data L53 | Link item properties to `element` | **LOCALS** has `element`, `index` and `data` in the item; `element` opens "Link element" with the model's fields | yes |
| show-data L55 | A new List View starts with three placeholder items | **Item Count** 3, **Item Builder** "Placeholder", three "Placeholder" rows on the board | yes |
| show-data L61 | **Loading Widget** default: centered progress circle | `loadingWidget` slot holds Align > CircularProgressIndicator | yes |
| show-data L61-62 | **Error Builder** default: the error in red text; `error` holds the problem | `errorBuilder` slot holds a Text linked to `error` `toString()`, color FF0000 | yes |
| show-data L64 | No source picked: **Error Builder** shows "No data source provided" | Red "No data source provided" on the board right after wrapping | yes |
| show-data L70 | On the board a request with a **Model** is not called; placeholders `[title]`, three items | `[title]` in three items. A request without a model is called on the board (a DioException text shows in the Error Builder). Images not checked | yes |
| show-data L72 | **Play** on the screen loads real data | Instant Play on the screen showed real todo titles ("delectus aut autem", ...) from jsonplaceholder | yes |

## Not verified

- `rest-api` L90 "Nowa keeps that token for testing only, not in your app": needs a token typed into **Auth token value** (not allowed). The info popover says only "Enter your authorization token".
- `rest-api` L56 "Nowa saves the body only while it is valid"; L69 dragging the chip from **Pass Parameters in Body** and typing `${query}` into a JSON body; L58 **Connect** on a form-data row; L94 the bytes
  going into `Uint8List` / `List<int>` parameters.
- `rest-api` L84 whether a second question follows **Remove** in the "in use" dialog (it would have deleted the collection the Data Builder uses).
- `show-data` L18 and L66 (Stream sources, a Firestore query ending in `get` / `snapshots`), L64 "null keeps the **Loading Widget** on screen", L70 "images show a picture placeholder", and what the
  Supabase and Firestore pickers list (nothing connected in the playground).

## Other observations (not page text)

- **Auth Key makes the generated file report an error.** Setting an **Auth Key** on a collection (a GET or POST request in it, tried twice, 3.13.0-79 playground) adds one error to **Problems**:
  `lib/api/scratch.api.dart`, "Undefined name 'headers'. options.headers". A collection header alone does not (0 problems). The error went away when the collection was deleted. Relevant to the
  page's "Set the base URL, headers and sign-in" section (not one of the four checked).
- **Stale Model label** after **Return as Response Object** (see 8): the button keeps the old model name, and shows **Response** only after the request is reopened.
- **Info popovers of the collection dialog:** **Base URL** reads "The Base URL will applies on all requests" (typo) and **Headers** shows the same sentence (copy of the Base URL text).
- **Status bar after linking the item text** (`element` then `title` on the list item's Text): "Canvas error: NoSuchMethodError: method not found: 'charCodeAt' ..." stays in the status bar; the
  board still draws `[title]`. (The signed-out `BillingProvider is not initialized` exception from the README notes is the baseline when nothing else is logged.)
- The test view's header ("API URL" and "Status") stays on screen after **Back to Request**, until the panel is closed.
- Capture notes: the README gotcha "**Run Test** on an API request fails (XMLHttpRequest error)" and the "no outbound network" line are out of date for the live app: through `$HTTPS_PROXY`
  both **Run Test** and Instant Play reach public CORS-enabled APIs (`catfact.ninja`, `jsonplaceholder.typicode.com`). Not edited here (outside this task's write list).

## Setup notes

- Chromium with `--proxy-server=$HTTPS_PROXY`, the CanvasKit CDN route removed (patched copy of `capture.mjs` in the scratchpad), own CDP port 9333, **Reject** clicked on the cookie banner
  right after load, 1440x900 at scale 2. Throwaway project state: collections Cats (`getFact`) and Todos (`getTodos`), models `GetFactModel`, `GetTodosModel`, a List View with a Data Builder on the
  home screen. Helper objects (a Scratch collection twice, extra requests, a temporary Data Builder and List View) were deleted again.
- The 404 test (`/nothing-here`) and the `/todos/1` test are public GET calls; nothing was posted.
