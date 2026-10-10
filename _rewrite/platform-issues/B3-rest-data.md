# B3: REST API, Data Builder, forms

### P35. DOWNLOAD request method drops the address and produces code that doesn't compile

- **Area:** REST request editor, method dropdown (`packages/data`)
- **Severity:** Medium — few users pick **DOWNLOAD**, but doing so loses the request's address and leaves Dart that fails to build; Nowa's Problems list doesn't flag the missing save path.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev. Correction to the old row: it says only that there is no save path; picking **DOWNLOAD** also drops the request's address, and Dio's `download` can never work on web.
- **Confidence:** Confirmed in code — the seven-item menu with **DOWNLOAD** was seen live in 3.13.0, but **DOWNLOAD** was never run. The lost address and the missing save path are read from the code and the Dio 5.9.1 source, not run.

**What happens.** A request's method dropdown lists GET, POST, PUT, DELETE, PATCH, HEAD and **DOWNLOAD**. **DOWNLOAD** is unfinished: it switches the call to Dio's `download`, which needs a second argument (where to save the file) that no field in the editor provides, and the request's address is not carried over to the new call.

**Steps to reproduce** (from the code, not run)
1. Click **Api** in the left sidebar, click **+** (**Add Collection**), choose **New Collection**, select the suggested name (Ctrl/Cmd+A), type `Cats` and click **Submit**.
2. Hover **Cats**, click **+**, choose **New Request**, select `newRequest`, type `getFact` and click **Create**. Click **getFact** to open it in the bottom panel.
3. Type `https://catfact.ninja/fact` in the address field. The method reads **GET**.
4. Open the method dropdown and choose **DOWNLOAD**.
5. Click the `<>` button in the top bar and open `lib/api/cats.api.dart` from the **Files** tree.

Expected: no **DOWNLOAD** entry, or a save-path field and the address kept.
Actual: the address field is empty and `getFact` calls `dioClient.download()` with no address and no save path. Dio's `download` takes `urlPath` and `savePath` as required positional arguments (dio 5.9.1, `lib/src/dio.dart:241-252`), so the app fails to build.

**Root cause.**
- The dropdown lists every value of the enum, `download` included (`packages/data/lib/src/api/views/api_panel/api_request_settings/requests_drop_down.dart:35-45`, `packages/data/lib/src/api/utils/api_util.dart:11`).
- Choosing a method runs `RequestFuncHelper(req).method = ...` directly, with no undo record (`packages/data/lib/src/api/views/api_panel/api_request_settings/url_field.dart:57-59`). The setter only renames the called method (`packages/data/lib/src/api/model/request_func.dart:59-62`) and keeps the arguments whose name, type and position all match (`packages/core/lib/src/interpreter/block_tree.dart:6296-6323`). Nowa's Dio model names the first argument of `get`, `post`, `put`, `patch`, `delete` and `head` `path` (`packages/core/lib/src/interpreter/libraries/dio_library.dart:500-503`) but `urlPath` for `download`, which also has a second positional `savePath` (`:858-862`). So the address is not copied and no save path is created.
- The code knows a save path is needed: `RequestFuncHelper.generate` asserts it (`request_func.dart:232-236`), but no UI field supplies it.
- Nowa's own check treats `savePath` as optional, because the model types it `dynamic` and Nowa counts `dynamic` as nullable (`packages/core/lib/src/interpreter/declaration.dart:117`, `packages/core/lib/src/interpreter/type.dart:339-343`, `packages/core/lib/src/interpreter/block_utils.dart:213-214`). Once the address is typed again, nothing in **Problems** points at the missing argument. The Dart compiler does.
- On web, Dio's `download` always throws `UnsupportedError('The download method is not available in the Web environment.')` (dio_web_adapter 2.1.1, `lib/src/dio_impl.dart:17-33`), so it cannot work in the web editor's test view or in a web build of the user's app either.

**Suggested fix.** Smallest: stop offering **DOWNLOAD**. Filter it out of the dropdown items in `requests_drop_down.dart:35-45` but keep the enum value, because `RequestFuncHelper.method` (`request_func.dart:48-52`) and `ApiUtil.getMethodFromName` (`api_util.dart:100-111`) must still handle code that already calls `download`. Also drop `'DOWNLOAD'` from `validMethods` in `packages/data/lib/src/curl/curl_service.dart:61`, which lets `importFromCurl` reach the assert in `generate`. If the method must stay: add a save-path field that writes the second argument, copy the address explicitly in the `method` setter (read `call.getChild(0)` before `replaceAndKeepArgs`, set it back after), and hide the entry on web. Test: in `packages/data/test/api_test.dart`, generate a request with an address, set `method = ApiRequestMethod.download`, and expect the address to survive (or, if the entry is removed, a widget test that the dropdown lacks it; the package has no widget tests yet).

**Docs impact.** `docs/integrations/rest-api/index.md:49` lists "such as **GET**, **POST**, **PUT**, **DELETE**, **PATCH** or **HEAD**" and never mentions **DOWNLOAD**, so nothing changes if the entry is removed. If it is kept and fixed, add it there with its save-path field and the web limit.

### P36. x-www-form-urlencoded body can't hold a form body and isn't remembered

- **Area:** REST request editor, **Body** tab (`packages/data`)
- **Severity:** Medium — APIs that expect form-encoded bodies (many login and token endpoints) can't be called from the visual editor; writing the call in code mode works.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev. Correction to the old row: the body is saved as a string only while it is valid JSON, so ordinary form text such as `a=1&b=2` is never saved at all, and the radio falls back to **JSON** when the request is reopened.
- **Confidence:** Confirmed in code — the 3.13.0 live check saw the JSON editor, with its validity icon and the warning on an empty body, under this radio. What gets saved and the radio reset are read from the code, not run.

**What happens.** Choosing **x-www-form-urlencoded** sets the content type `application/x-www-form-urlencoded` and opens the same editor as **JSON**. That editor saves the text only when it parses as JSON, so a form body is never written to the request. Valid JSON is written as a plain string and sent as is under the form content type. When the request is reopened, the radio shows **JSON**.

**Steps to reproduce** (from the code, not run)
1. Click **Api** in the left sidebar, **+** (**Add Collection**), **New Collection**; select the suggested name (Ctrl/Cmd+A), type `Shop` and click **Submit**.
2. Hover **Shop**, click **+**, choose **New Request**, name it `login` (select `newRequest` first) and click **Create**. Click **login**.
3. Set the method to **POST** and type `https://example.com/token` as the address.
4. Open the **Body** tab and choose **x-www-form-urlencoded**. The editor is empty and shows the yellow **Invalid JSON** icon.
5. Type `username=emilys&password=emilyspass`. The icon stays on **Invalid JSON**.
6. Click **Test**, then **Back to Request**, and look at the **Body** tab.
7. Click the `<>` button in the top bar and open `lib/api/shop.api.dart` from the **Files** tree.

Expected: the text is saved and sent as `username=emilys&password=emilyspass`, and **x-www-form-urlencoded** stays selected.
Actual: step 6 shows **JSON** selected with an empty editor, because the text was never saved; in step 7 `login` has `data: ''` and `options: Options(contentType: 'application/x-www-form-urlencoded')`. If you type `{"username": "emilys"}` in step 5 instead, the icon turns to **Valid JSON** and the code gets `data: '{"username": "emilys"}'`: JSON text, sent as is under the form content type.

**Root cause.**
- `x-www-form-urlencoded` gets the same `JSONBody` as `json` (`packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/api_request_body.dart:40-41`), which writes the text only if `JSONService.validate` passes (`.../api_request_body/json_body.dart:24-33`; `packages/core/lib/src/model_generator/json_service.dart:29-38` is just `jsonDecode`). Choosing the type writes an empty string and the content type (`.../api_request_body/body_type_actions.dart:174-180`).
- Dio sends a `String` body unchanged and url-encodes only a `Map<String, dynamic>` (dio 5.9.1, `lib/src/transformer.dart:96-118`), so JSON text under the form content type is not a form body.
- On reopening, `BodyTypeActions._setupFromExistingData` (`body_type_actions.dart:25-35`) calls `ApiBodyType.detectFromContent`, which looks only at the body: a map is **form-data**, a string is **JSON** or **raw**, never `urlEncoded`, and the content type isn't consulted (`.../api_request_body/api_body_types.dart:27-42`). The request panel is rebuilt each time you leave the test view (`packages/data/lib/src/api/views/api_overlay/api_request_overlay.dart:43-45, 94-97`), so the radio snaps back at once.

**Suggested fix.** Smallest: give `urlEncoded` a plain text editor like the one **raw** uses (`api_request_body.dart:45-62`, saves any text) so `a=1&b=2` is stored as a string, and in `_setupFromExistingData` treat a body whose `reqHelper.contentType?.value` is `application/x-www-form-urlencoded` as `urlEncoded`. Watch out: that text box is bound to `textController`, which is created only when the **Text** / **XML** / **HTTP** dropdown changes (`body_type_actions.dart:94-111`), so a saved **raw** body appears to show as an empty box after the request is reopened (code reading, not run); create the controller from the saved body in `_setupFromExistingData`. Fuller: a key/value table like **form-data** (`.../api_request_body/form_data.dart`) that writes a map body. The map must be emitted as `<String, dynamic>{...}`: a plain `{...}` literal passed as `Object?` infers `Map<String, String>`, which Dio sends as `toString()` (dio 5.9.1, `lib/src/transformer.dart:103-114`). Test: in `packages/data/test/api_test.dart`, build a `BodyTypeActions` for a generated POST request, call `changeBodyType(ApiBodyType.urlEncoded)`, store a plain-text body, then create a second `BodyTypeActions` on the same request and expect `urlEncoded` and the text. Workaround until then (not tried): write the call in code mode with `data: <String, dynamic>{'username': 'emilys'}`.

**Docs impact.** `docs/integrations/rest-api/index.md:59` (the **x-www-form-urlencoded** row: "You write the body in the same editor as **JSON**, with the same validity check") describes today's behavior; rewrite it to match the fixed editor. Line 56 (JSON "Nowa saves the body only while it is valid") stays.

### P37. Touching the collection settings saves an empty Base URL, and Import from curl then drops the host

- **Area:** REST collection settings dialog and cURL import (`packages/data`)
- **Severity:** Medium — a request imported from curl ends up with only a path and can't reach its server; typing a Base URL or fixing the address by hand works around it.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev. Correction to the old row: the empty string is written when focus leaves any of **Name**, **Base URL** or **Auth Key**, not only **Base URL**.
- **Confidence:** Confirmed in code — read from the code, not run. The 3.13.0 live check only saw that the fields save when you leave them.

**What happens.** The collection settings dialog rewrites the collection's `baseUrl` from the **Base URL** box every time one of its fields loses focus. With nothing typed there, that stores `baseUrl: ''` instead of leaving it unset. **Import from curl** treats `''` as a base URL every address starts with, so it keeps only the path of the pasted command: `curl https://catfact.ninja/fact` becomes a request to `/fact`.

**Steps to reproduce** (from the code, not run)
1. Click **Api** in the left sidebar, **+** (**Add Collection**), **New Collection**; select the suggested name (Ctrl/Cmd+A), type `Cats` and click **Submit**. No Base URL is set.
2. Hover **Cats** and click the gear. Click into **Name**, then click into **Base URL** (leaving **Name** saves). Click **Close**.
3. Hover **Cats**, click **+**, choose **Import from curl**. Type `getFact` in **Function Name**, paste `curl https://catfact.ninja/fact` in **cURL Command** and click **Create**.
4. Click **getFact**.

Expected: the address is `https://catfact.ninja/fact` (no Base URL, so the full address stays).
Actual: the address is `/fact`. Open `lib/api/cats.api.dart` in code mode: the client is `Dio(BaseOptions(baseUrl: ''))`. Setting a Base URL and later clearing the box gives the same result.

**Root cause.**
- `saveChanges()` runs whenever **Name**, **Base URL** or **Auth Key** loses focus (`packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:37-47`) and always calls `collectionHelper.setBaseUrl(StringBlock(baseUrlController.text))` (`:86`). The box starts empty when no Base URL exists (`:34-35`), and `setBaseUrl` creates `BaseOptions` if needed and writes the child (`packages/data/lib/src/api/model/api_collection.dart:55-58, 69-71`).
- `showCurlImportDialog` reads the base URL as `(collectionHelper.baseUrl as StringBlock?)?.value` (`packages/data/lib/src/api/views/actions/import_action.dart:24-26`), so "unset" is `null` but "emptied" is `''`. `importFromCurl` skips its base-URL logic only for `null`; for `''` `startsWith('')` is true and the path-only branch drops the host (`packages/data/lib/src/curl/curl_service.dart:15-21`).

**Suggested fix.** Two small changes, both needed. (1) In `saveChanges`, write the Base URL only when the box has text, remove the `baseUrl` child when it is empty (new `ApiCollectionHelper.clearBaseUrl()` using `baseOptionsExpr?.removeChild('baseUrl')`), and skip the write when nothing changed so editing **Name** doesn't touch it. (2) In `importFromCurl` treat `''` like `null` (`baseUrl != null && baseUrl.isNotEmpty` at `curl_service.dart:15` and `:19`); this also repairs projects that already contain `baseUrl: ''`. Test: in `packages/data/test/api_test.dart`, group 'Curl String Conversion' (next to 'Convert curl string with base URL and endpoint to Collection', around line 450), add `importFromCurl('getTodo', curl, baseUrl: '')` and expect the full address.

**Docs impact.** None to change. `docs/integrations/rest-api/import.md:61` and `:75` ("the address in the command must start with the collection's **Base URL**") and `docs/integrations/rest-api/index.md:36` ("Changes save when you leave a field") describe the intended behavior; re-read them after the fix.

### P47. Min length and Max length validators lose their number field, and their check is silently dropped when other rules change

- **Area:** Form validators in **Details** (`packages/core`)
- **Severity:** High — a length rule vanishes from the user's app with no sign in the panel, and Details can never edit its number (6 or 40).
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev. Correction to the old row: its line numbers are 3.12.5's (the 3.13.0 ones are below), and only the length rule added last survives, so Min and Max can't coexist through Details.
- **Confidence:** Confirmed in code — the misread was seen live by the capture agent on the local 3.12.5 web build (one extra plain **Message** row, no **Min** field; `_rewrite/captures/README.md:115-118`). The dropped check is read from the code and was not run. In `form_validator.dart` 3.13.0 differs from 3.12.5 only in the **+ Add validator** button widget.

**What happens.** Nowa writes **Min length** as `value.length < min` and **Max length** as `value.length > max`, but Details reads back only `<=` and `>=` as those rules and treats every other comparison as **Required**. So right after you add one, it shows as a plain **Message** row with no title, no remove button and no **Min** / **max** field, and its number can be changed only in code mode. Editing that **Message** is safe. The next time you add or remove any other rule, Details rewrites the row as `value == null || value.isEmpty`: the length check is gone and the panel looks the same.

**Steps to reproduce** (step 3 seen live on 3.12.5; steps 4-5 from the code, not run)
1. Press Ctrl/Cmd+K, search `text field`, press Enter to add a **Text Field**, and select it.
2. In **Details**, scroll to the validator row (named after the controller, **text validator**). Hover it, click **+**, then click the arrow next to **text validator** if its rows aren't showing. One **Message** row appears ("Field is required").
3. Click **+ Add validator** and choose **Min length validator**.
   Expected: a **Min length** block with **Message** ("Too small") and **Min** (6), and a remove button.
   Actual: one more plain **Message** row ("Too small"); no title, no **Min**, no remove button.
4. Click **+ Add validator** again and choose **Email validator**. An **Email** block appears; the two **Message** rows look the same as before.
5. Click the `<>` button in the top bar, open the screen's file (`lib/pages/home_page.dart` in the starter app) and find the field's `validator`.
   Expected: `if (value.length < 6) { return 'Too small'; }` is still there. (Opening code mode after step 3 shows it is.)
   Actual: the second `if` now reads `if (value == null || value.isEmpty) { return 'Too small'; }`; the length check is gone.

Removing a rule does the same: add **Email validator** first, then **Min length validator**, then hover the **Email** title and click its remove button.

**Root cause.**
- Writer: `MinLengthValidator.buildStatement` emits `BinaryOperator.smallerThan` and `MaxLengthValidator` emits `greaterThan` (`packages/core/lib/src/fields/form_validator.dart:209-218, 242-251`), printed as `<` and `>` (`packages/core/lib/src/interpreter/block_tree.dart:2744-2745`).
- Reader: `ValidatorBuilder.load` maps only `greaterThanOrEqual` to Max length and `smallerThanOrEqual` to Min length. Every other `BinaryExpr` falls through to `RequiredValidationBuilder`, including the `||` of Required itself (`form_validator.dart:314-331`). The writer was switched from `<=`/`>=` to `<`/`>` in commit `238739ee8` (8 Apr 2024); the reader never followed.
- So `buildFields` of the length builders, which draws **Min** / **max** (`:221-229, 254-262`), never runs for rules Nowa wrote, and `buildValidator` draws a Required item as a bare **Message** without title or remove button (`:101-103`).
- Adding a rule calls `field.update(validator.build())` (`:76-77`; `packages/core/lib/src/fields/block_field.dart:247-253`), Details rebuilds on every tree change (`packages/designer/lib/src/details/widget_details.dart:203-224`), and the tile re-reads the code on each build (`form_validator.dart:39`). Adding or removing any rule (`:76-77`, `:116-117`) re-emits every loaded item through `buildStatement()` (`:344-349`), so each misread row becomes the Required statement (`:181-191`), keeping only its message.
- The **+ Add validator** menu removes only the types it loaded (`:49-51`); a misread row loads as Required, so **Min length** and **Max length** stay on offer, and a second one overwrites the first.
- `load` also coerces any other comparison to Required and drops statements it can't classify (`:295-334`), so hand-written validators are rewritten the same way.
- The same widget serves Text Field, Dropdown, Pin Code Field and each field row of the **Form** wrapper (`packages/core/lib/src/fields/form_fields.dart:37, 96, 254`, `packages/core/lib/src/fields/pin_code_fileds.dart:99`), so all four are affected.

**Suggested fix.** Smallest: in `load`, read `smallerThan` as `MinLengthValidator` and `greaterThan` as `MaxLengthValidator`, only when the left operand is `value.length`. Keep `smallerThanOrEqual` and `greaterThanOrEqual` for projects written before April 2024 (they will be rewritten as `<` and `>`, moving the boundary by one character). Take the number from the right operand instead of `findNum` (`:378-387`), so a linked value isn't replaced by `SimpleBlock(0)` (`:319, 326`). Safer: add a pass-through item that keeps the original `IfStatement` for anything not recognized and re-emits a copy in `buildStatement`, so unknown rules survive. Side issue: the **Max** label is lower-case `max` (`:259`). Test: new `packages/core/test/form_validator_test.dart` (no validator tests exist). Build `ValidatorBuilder()`, add a `MinLengthValidator`, `build()`, then `ValidatorBuilder.load(...)` and expect `[RequiredValidationBuilder, MinLengthValidator]`; then add an `EmailValidationBuilder`, build and load again, and expect the length rule still reads `value.length < 6`. Ctrl/Cmd+Z after the second add should restore the old function (`field.update` is an undo record); not tried.

**Docs impact.** `docs/reference/widgets/forms.md`, section `{#validators}`, is written around this bug: the paragraph at line 44 ("has no **Min** or **max** field ... so add a length rule last"), the **Min length** and **Max length** rows at lines 49-50 ("minimum 6", "maximum 40"), and the sentence at line 55 ("**Required**, **Min length** and **Max length** show no title or remove button"). After the fix, describe the **Min** and **Max** fields, drop the warning, and limit the remove sentence to **Required** (and the label if `max` becomes `Max`). `docs/legacy/tutorials/form-validation.md` promises "a minimum or maximum length" and needs nothing.

### P53. Setting an Auth Key adds a false "Undefined name 'headers'" error to Problems

- **Area:** REST collection **Auth Key**; Dio model used by the interpreter (`packages/data`, `packages/core`, `packages/library_generator`)
- **Severity:** Medium — the generated code is valid, but every collection with an **Auth Key** carries a permanent red error, and web publishing asks about problems each time.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev.
- **Confidence:** Reproduced live — 3.13.0-79 web playground, twice, with a GET or a POST request in the collection (P10 live check); the mechanism is confirmed in code. Not checked: **Run Test** on a collection with an **Auth Key**.

**What happens.** After you type an **Auth Key** in the collection settings, **Problems** lists one error in `lib/api/<name>.api.dart`: "Undefined name 'headers'." with `options.headers`. The flagged line is ordinary, valid Dio code; the error comes from Nowa's own model of Dio missing a member.

**Steps to reproduce**
1. Click **Api** in the left sidebar, **+** (**Add Collection**), **New Collection**; select the suggested name (Ctrl/Cmd+A), type `Cats` and click **Submit**.
2. Hover **Cats**, click **+**, choose **New Request**, name it `getFact` (select `newRequest` first) and click **Create**.
3. Hover **Cats** and click the gear. Type `token` in **Auth Key**, then click into **Base URL** (leaving the field saves; that save also writes the empty Base URL of P37). Click **Close**.
4. Click the red error count at the left end of the status bar. The **Problems** tab opens.

Expected: no problem, since `options.headers['Authorization'] = ...` is valid Dio code.
Actual: one error under `lib/api/cats.api.dart`: "Undefined name 'headers'." (`options.headers`). A collection header added under **Headers** adds no error (live). Clearing **Auth Key** should remove the statement and the error (`api_edit_collection_dialog.dart:89-90`; not tried).

**Root cause.**
- A non-empty **Auth Key** adds an interceptor to the collection's private constructor (`packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:87-88`, `packages/data/lib/src/api/model/api_collection.dart:100-115`); its text contains `options.headers['Authorization'] = 'Bearer ${sharedPrefs.getString('<key>')}';` (`packages/data/lib/src/api/interceptors/generate_auth_interceptor.dart:11`). Real Dio has `RequestOptions.headers` (dio 5.9.1, `lib/src/options.dart:719`).
- Nowa checks references against its own generated Dio model. `$RequestOptions` declares only `uri`, `data`, `path`, `cancelToken`, the two progress callbacks and `copyWith` (`packages/core/lib/src/interpreter/libraries/dio_library.dart:3079-3243`) and lists `_RequestConfig` as a supertype (`:3244-3248`) that exists nowhere in the model. In Dio, `RequestOptions extends _RequestConfig`, which holds `headers`, `method`, `extra`, `contentType`, `responseType` and more (dio 5.9.1, `lib/src/options.dart:509, 667-775`). `$BaseOptions` has the same gap (`dio_library.dart:2456-2567`).
- `ReferenceBlock.findProblems` returns `UndefinedIdentifier` when the declaration is missing and the prefix type isn't dynamic (`packages/core/lib/src/interpreter/block_tree.dart:3847-3855`); its message is "Undefined name 'headers'." (`packages/core/lib/src/interpreter/block_problems.dart:276-278`).
- `dio_library.dart` is generated (line 1: "GENERATED CODE - DO NOT MODIFY BY HAND") by `packages/library_generator`. The generator emits each class's own members plus a `supertypes:` list (`packages/library_generator/lib/src/generator/element_to_source.dart:408-411, 451-462`), and a private supertype's members are never emitted. This is the likely place to fix it; not verified by running the generator.
- Where it shows: the status-bar error count (`lib/status_bar.dart:197`), the **Problems** tab, and the web **Publish** button, which opens "Your Project has Problems" with **Ignore and Publish** / **Close** whenever any problem exists (`packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:255-258, 440-461`).

**Suggested fix.** Make the model complete: in the generator, emit the public members of private supertypes (here `_RequestConfig`) on `RequestOptions` and `BaseOptions`, then regenerate `dio_library.dart`; don't hand-edit it. As a safety net, make `ReferenceBlock.findProblems` skip the report when the prefix's class lists a supertype that can't be resolved. Other generated libraries name private supertypes too (for example `material_library.dart` and `forui_library.dart`), so the same false positive may exist there; not checked. After the fix, run **Run Test** once on a collection with an **Auth Key**: the test copy of the request carries the same statement (`packages/data/lib/src/api/model/request_func.dart:396`). Test: in `packages/data/test/api_test.dart`, generate a collection (`ApiCollectionHelper.generate`), call `generateInterceptor('token')`, load `collection.klass.source` and run `ProblemsVisitor` (see `problemsForDeclaration` in `packages/core/test/interpreter_tests/problems_test.dart:40-46`); expect no problems.

**Docs impact.** None once fixed. `docs/integrations/rest-api/index.md:33` and `:38` explain **Auth Key** and don't mention the error; until the fix, `docs/troubleshooting/known-issues.md` could carry a line saying the error is safe to ignore.

### P54. Model button keeps the old model name after Return as Response Object

- **Area:** REST request editor, **Model** button (`packages/data`)
- **Severity:** Low — only the label is stale; the code is right and reopening the request shows it.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev.
- **Confidence:** Reproduced live — 3.13.0-79 web playground (P10 live check); mechanism confirmed in code. **Select Model** and **Generate from Schema** use the same call and likely leave the label stale too; not tried.

**What happens.** The **Model** button in the right panel shows the request's model name. After you choose **Return as Response Object** from its menu, the request returns the plain response again, but the button keeps the model name until the panel is rebuilt.

**Steps to reproduce**
1. Click **Api** in the left sidebar, **+** (**Add Collection**), **New Collection**; select the suggested name (Ctrl/Cmd+A), type `Cats` and click **Submit**.
2. Hover **Cats**, click **+**, choose **New Request**, name it `getFact` (select `newRequest` first) and click **Create**. Click **getFact**.
3. Type `https://catfact.ninja/fact` as the address, click **Test**, then **Run Test**, and wait for "Status: 200 OK".
4. Click **Generate Model**, then **Next**, **Next**, **Save**. Click **Back to Request**. The **Model** button in the right panel reads `GetFactModel`.
5. Click the **Model** button and choose **Return as Response Object**.

Expected: the button reads **Response**.
Actual: it still reads `GetFactModel`. It reads **Response** after you close the request panel (×) and click **getFact** again, or click **Test** and then **Back to Request**.

**Root cause.** `_ApiReturnTypeAndMock` is a `StatelessWidget` that reads the return type in `build` (`packages/data/lib/src/api/views/api_panel/api_request_settings/api_request_settings.dart:36-44, 85-113`), and `_setType` only `read`s `ApiProvider` (`:151-162`). So `notifyListeners()` in `ApiProvider.setRequestModel` (`packages/data/lib/src/api/provider/api_provider.dart:30-34`) reaches nobody who rebuilds the button. Nothing above it listens either: `ApiRequestOverlay` rebuilds only on its own `setState` (`packages/data/lib/src/api/views/api_overlay/api_request_overlay.dart:43-45`) and builds the right panel as a plain `ApiRequestSettings(...)` (`:109`). Leaving the test view and coming back builds it again, which is when the new name appears. The menu is built each time it opens, so its entries are right (**Return as Response Object** appears only when the type isn't `Response`, `api_request_settings.dart:137`).

**Suggested fix.** Wrap the body of `_ApiReturnTypeAndMock.build` in `StreamBuilder(stream: req.owner?.watch, ...)`, as `UrlField` (`packages/data/lib/src/api/views/api_panel/api_request_settings/url_field.dart:47-49`) and `ApiRequestForm` (`packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_form.dart:33-35`) do. `FunctionDeclImpl.returnType`'s setter fires `markNeedsRebuild()` (`packages/core/lib/src/interpreter/declaration_runtime.dart:1508-1511`), so menu choices, undo and redo all refresh the label. Test: `packages/data/test/` has no widget tests; add one that pumps `ApiRequestSettings`, calls `ApiProvider.setRequestModel(null)` and expects the button text to change.

**Docs impact.** None. `docs/integrations/rest-api/index.md:110-116` describes the intended behavior and doesn't mention the stale label.

### P55. Typo and copy-pasted text in the collection settings info popovers

- **Area:** REST collection settings dialog (`packages/data`)
- **Severity:** Low — wrong wording only.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev.
- **Confidence:** Reproduced live — popovers read in the 3.13.0-79 web playground (P10 live check); both strings confirmed in code.

**What happens.** The info popover next to **Base URL** reads "The Base URL will applies on all requests". The popover next to **Headers** shows the same sentence, a copy of the first.

**Steps to reproduce**
1. Click **Api** in the left sidebar. If there is no collection, click **+** (**Add Collection**), **New Collection**, type a name and click **Submit**.
2. Hover a collection and click the gear.
3. In the dialog ("Edit collection details"), click the small info icon next to **Base URL**, close the popover, then click the info icon next to **Headers**.

Expected: "The Base URL applies to all requests." under **Base URL**, and a sentence about headers under **Headers**.
Actual: both read "The Base URL will applies on all requests".

**Root cause.** Two string literals: `packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:143` (**Base URL**) and `:234` (**Headers**, pasted from the first).

**Suggested fix.** Base URL: "The Base URL applies to all requests." Headers, for example: "These headers are sent with every request in this collection." (collection headers go into the client's `BaseOptions`, `packages/data/lib/src/api/model/api_collection.dart:60-63`, and are listed read-only on each request's **Headers** tab, `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_form.dart:50`). No test needed.

**Docs impact.** None. The docs don't quote the popovers; `docs/integrations/rest-api/index.md:27` already says the settings apply to every request.

### P56. Create New Collection Path preview ends in .dart but the file is saved as .api.dart

- **Area:** REST collection creation dialog (`packages/data`, `packages/core`)
- **Severity:** Low — the preview is wrong; the saved name is right.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev. Correction to the old row: the "space before .dart" is not in the text, it is layout (see Root cause). The Library's **Add** → **API Collection...** dialog has the same wrong preview and also names the wrong folder (code reading only).
- **Confidence:** Reproduced live for the missing `.api` (3.13.0-79 web playground: preview `lib/api/cats .dart`, saved file `cats.api.dart`); the gap is confirmed in code and in the Flutter source.

**What happens.** In **Create New Collection**, the **Path** line previews `lib/api/cats .dart`, but the collection is saved as `lib/api/cats.api.dart`. The small gap before `.dart` is only how the field is drawn.

**Steps to reproduce**
1. Click **Api** in the left sidebar, then **+** (**Add Collection**), then **New Collection**.
2. In **Create New Collection**, select the suggested name `ApiCollection` (Ctrl/Cmd+A) and type `cats`. Read the **Path** line under **Class name**.
3. Click **Submit**. The new collection's file is `lib/api/cats.api.dart` (open it from the Library, or from **Files** in code mode).

Expected: **Path** reads `lib/api/cats.api.dart`.
Actual: **Path** reads `lib/api/cats .dart`.

**Root cause.**
- The dialog passes `extension: '.dart'` to the shared `FileNameTextField` (`packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:70-74`), which uses it as the **Path** row's suffix (`packages/core/lib/src/file_system/widgets/file_name_text_field.dart:196-206`) and for the name-clash check (`:135-136`). `addCollection` always saves `'$fileName.api.dart'` (`packages/data/lib/src/api/utils/api_util.dart:133`), from `fileNameWithoutExtension`, which cuts at the first `.` (`file_name_text_field.dart:38`).
- The gap is layout, not a space. `HoverEditTextField` builds the suffix without a space when `extensionSuffix` is true (`packages/core/lib/src/file_system/widgets/hover_edit_text_field.dart:79-80`), and this row passes `extensionSuffix: true` (`file_name_text_field.dart:206`). The text field sits in an `IntrinsicWidth` (`hover_edit_text_field.dart:129-130`), and Flutter adds the caret's room, 3 logical pixels (`_kCaretGap` 1 plus `cursorWidth` 2), to a text field's intrinsic width (Flutter 3.44.8, `packages/flutter/lib/src/rendering/editable.dart:25, 1279, 1881-1896`). So `.dart` is drawn 3 px after the last letter.
- The Library's **Add** → **API Collection...** entry opens `FileDialog` with `extension: '.dart'` and `targetDir: fileProvider.currentOrLib` (`lib/project/panels/files_panel/add_lib_menu.dart:83-95`; `packages/core/lib/src/providers/file_provider.dart:62`). Its **Path** preview shows `lib/` or the Library's current folder, while `addCollection` always writes to `lib/api` (`api_util.dart:131`). Not seen live.

**Suggested fix.** Don't pass `.api.dart` as `extension`: `FileNameTextField` compares `widget.extension == ".dart"` in eight places (`file_name_text_field.dart:78, 90, 164, 172, 179, 195, 199, 204`), so the **Class name** row and the name logic would disappear. Add an optional `pathSuffix` (default: `extension`) used only for the **Path** row's suffix (`:205`) and the clash checks (`:135-136, 157-159`), and pass `.api.dart` from `CreateCollectionDialog`. Do the same for the `FileDialog` in `add_lib_menu.dart:83-95` and point its `targetDir` at `gProject.files.apiDir`. `CreateFileResult.fileNameWithoutExtension` already yields `cats` for `cats.api.dart`. No test covers this dialog; add a widget test in `packages/data/test/` that pumps `CreateCollectionDialog`, enters `cats` and finds `.api.dart` in the **Path** row. Leave the 3 px gap alone.

**Docs impact.** `docs/integrations/rest-api/index.md:14` already gives the saved name (`lib/api/cats.api.dart`), and line 18 calls the line a "**Path** preview" on purpose. After the fix, line 18 can say the preview shows the saved name. `docs/design/library.md:109` needs no change.

### P57. Undo can't bring the old request body back after a body-type switch

- **Area:** REST request editor, **Body** tab (`packages/data`)
- **Severity:** Medium — switching the body type replaces what you typed with a fresh body, and Ctrl/Cmd+Z can't restore it; retyping is the only way back.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev.
- **Confidence:** Reproduced live — 3.13.0-79 web playground (Ctrl+Z with the focus in the request panel, then on the board; the board's Action History has no entry); mechanism confirmed in code.

**What happens.** Choosing another body type replaces the current body with a fresh one. Nowa does record an undo step ("Set Request Body ...") but on the Collections panel's own undo stack, and nothing connects the request panel to that stack. Ctrl/Cmd+Z in the request panel doesn't touch it, and the board's Action History doesn't list it.

**Steps to reproduce**
1. Click **Api** in the left sidebar, **+** (**Add Collection**), **New Collection**; select the suggested name (Ctrl/Cmd+A), type `Cats` and click **Submit**. Hover **Cats**, click **+**, choose **New Request**, name it `getFact` and click **Create**. Click **getFact**.
2. Open the **Body** tab, choose **JSON**, select all in the editor and type `{"keep": 1}`.
3. Choose **raw**. The editor is empty.
4. Click an empty spot in the request panel (not in the editor) and press Ctrl/Cmd+Z. Then click the board, press Ctrl/Cmd+Z, and open the board's Action History (Ctrl/Cmd+Shift+H).

Expected: **JSON** is selected again with `{"keep": 1}`.
Actual: **raw** stays selected and the body stays empty; the Action History has no entry for the request.

**Root cause.**
- The radio group records the step with `context.tryRecord` (`packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/api_request_body.dart:78-82`; `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/body_type_actions.dart:37-55`), which adds it to the nearest `Undo` (`packages/core/lib/src/providers/undo.dart:294`). For a request opened by clicking it, that is the Collections panel's `Undo(debugLabel: 'Api Outline')` (`packages/data/lib/src/api/views/api_outline/api_outline.dart:249`), handed on by `showRequest` (`packages/data/lib/src/api/provider/api_provider.dart:41-47`).
- The only `UndoIntent` handler for that stack is in `ApiOutline.build` (`api_outline.dart:260-262`), so it works only while focus is inside the Collections panel. The request panel is the project's bottom panel (`lib/project/project_page.dart:606-608`, `lib/project/panels/bottom_panel.dart:6-14`), outside it; there Ctrl/Cmd+Z (`lib/setup_general_actions.dart:26`) goes to whatever handler is above, such as the board's (`packages/designer/lib/src/designer_setup.dart:80`). `ApiWorkspace` wraps the request overlay with the right `Actions` (`packages/data/lib/src/api/views/api_editor.dart:22-28`), but no other file references it.
- A request opened with the play icon (**Run Query**) isn't given the outline's `Undo` at all (`api_outline.dart:332-340`); where its steps go was not checked.
- On `origin/dev` the same bottom-panel host is at `lib/project/project_page.dart:609-611` (shifted by the snackbar fix); nothing else differs.

**Suggested fix.** In `showRequest` (`api_provider.dart:41-47`), wrap the `ApiRequestOverlay` in the `Actions` that `ApiWorkspace` has (`NowaActionDispatcher(undo)` with `UndoIntent: UndoAction(undo)` and `RedoIntent: RedoAction(undo)`, `api_editor.dart:22-28`), using the same `Undo` it already passes down, and do the same in the play-icon path. Watch out: `UndoAction.isEnabled` is false while a Nowa field has focus (`packages/core/lib/src/actions/undo_actions.dart:20`), and the JSON editor has its own text undo, so test with focus on the panel background as in the steps. Test: nothing nearby (`packages/data/test/` has no widget tests); verify by hand with the steps above, or add a widget test that pumps the overlay, switches the type and sends Ctrl/Cmd+Z.

**Docs impact.** `docs/integrations/rest-api/index.md:61` ("Choosing a body type sets the content type for you and replaces the current body with a fresh one"): the sentence "Undo brings the old body back." was removed because of this; add it back after the fix.

### P58. The None entry of the Data Builder source pickers is never shown

- **Area:** Data Builder source pickers: **Select API**, Supabase and Firestore (`packages/data`, `packages/core`)
- **Severity:** Medium — once a request, function or query is chosen, nothing in the picker clears it; picking another source or editing the code is the only way.
- **Where:** both; both projects
- **Status:** Present in 3.13.0 and dev.
- **Confidence:** Reproduced live for **Select API** — 3.13.0-79 web playground: no **None**, and searching `none` finds nothing, also with a request already chosen. The Supabase and Firestore pickers were empty in the playground (nothing connected), so **None** wasn't seen there; they use the same menu (code).

**What happens.** The picker code builds a **None** item that is meant to clear the source, but the menu never draws it, in all three pickers.

**Steps to reproduce**
1. Create a collection with a request (**Api** in the left sidebar, **+** (**Add Collection**), **New Collection**, then **+** on the collection and **New Request**).
2. Press Ctrl/Cmd+K, search `list view`, add a **List View** and select it. In **Details**, scroll down, click **Add Wrapper**, search `Data Builder` and click it.
3. In the **Data Builder** section, set **Source** to **API Request**.
4. In the **API** row, click the button that reads `none`. The **Select API** popup lists your requests. Pick one.
5. Click the button again (it now shows the request's name) and type `none` in the popup's search box.

Expected: a **None** entry that clears the source.
Actual: only the requests are listed; searching `none` finds nothing.

**Root cause.**
- `DataLinkMenu` passes **None** as `additionalItems` of a `LinkMenu` whose finder is a single `SimpleCategory` (`packages/data/lib/src/common/data_link_menu.dart:81-91`).
- `LinkMenu.build` draws additional items only when the finder has a number of categories other than one (`packages/core/lib/src/fields/link_menu.dart:176, 196`), and `SuggestionQuery.categories` keeps every category even when a search matches nothing (`packages/core/lib/src/interpreter/suggestion.dart:343-345`). So the count is always 1 and **None** is never added.
- All three pickers build a `DataLinkMenu` (`packages/data/lib/src/api/views/api_field.dart:73`, `packages/data/lib/src/supabase/ui/sb_field.dart:43`, `packages/data/lib/src/firebase/firebase_field.dart:72`).
- Even if it showed, the tile's `onTap` only calls `field.remove()` (`data_link_menu.dart:83-89`). It skips `_onUpdate(null, context)`, which also resets the widget's `typeArgs` and records the undo step (`:22-30`); nothing calls `_onUpdate` with `null`.

**Suggested fix.** In `LinkMenu.build` always draw `_filteredAdditionalItems()` (drop the `length != 1` condition at `link_menu.dart:196`); sub-menus already clear `additionalItems` (`:100`, `:134`). Check the other callers that pass additional items, `packages/code/lib/src/widgets/add_statement_menu.dart:60` and `packages/core/lib/src/fields/field_link_menu.dart:342`, because any of their menus that has one category would start showing them. Make the **None** tile call `_onUpdate(null, context)`. Test: `packages/core/test/interpreter_tests/suggestion_test.dart` covers suggestions but not menus; add a widget test that pumps `DataLinkMenu` and finds the text **None**.

**Docs impact.** `docs/integrations/show-data.md:25` ends "To switch to another one later, click the button again." The words "or pick **None** to clear it" were removed because the entry never shows; restore them after the fix.
