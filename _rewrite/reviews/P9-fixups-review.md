# P9 fix-ups review (writer W22: detail-screen id type, sign-in pointer, REST warning, big boards)

Verifier pass on W22's four small edits. Source of truth: `/home/user/nowa-master` (v3.12.5). Code refs are relative to that repo unless they start with `docs/`. Everything is checked by reading code; nothing was run in the app. Only W22's parts of the four pages were checked (`git diff 9490092 -- <page>` showed no other agent's edits in them).

## Summary

| | |
|---|---|
| Pages checked | 4: `docs/logic/navigation.md`, `docs/guides/complete-app.md`, `docs/integrations/rest-api/index.md`, `docs/design/boards.md` |
| Claims checked | about 40 (navigation 10, complete-app 13, REST 11, boards 7) |
| Fixed | 2, both small: `navigation.md` (wording and tightening of the new paragraph), `rest-api/index.md` (one sentence in the warning scoped to what the code shows). No factual error in W22's text. |
| Removed | 0 |
| Open issues | 4, none blocking (see the end) |

## `docs/logic/navigation.md`: new paragraph before step 1 of `{#open-a-detail-screen}` (line 85)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| A screen's param has a **Type** in **Details** (select the param in **Variables** → **Params**) | ok | `packages/core/lib/core_hooks.dart:51` (`DetailsCreator<Declaration>(DeclDetails.new)`); `packages/core/lib/src/panels/details/decl_details.dart:45-46` (`VariableDeclImpl` → `VariableField`); `packages/core/lib/src/widgets/code/variable_widgets.dart:416-460` (`label: "Type"` at `:452`); `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:277-299` (list tile selects the param) | `docs/logic/parameters.md` step 4 says the same ("In **Details**, choose the **Type**") |
| Set the type before the drag | ok | `packages/core/lib/src/editors/router_editor/go_route_node_view.dart:344-355` (`_onAccept` builds the conversion from the screen param's type at drop time); `packages/core/lib/src/editors/router_editor/auto_type_parser.dart:33-45, 60-102`; `packages/core/lib/src/interpreter/generators/variable_generator.dart:16-41` (`changeType` only fixes the default, existing uses stay) | Matches the page's earlier "If you drag a chip onto a parameter of another type ... Nowa adds the conversion for you" |
| **Get Record by ID** is the template's label | ok | `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:29-37` | Same label in `docs/integrations/supabase/database.md:30` |
| The function takes an `id` whose type follows the table's `id` column | ok | `packages/data/lib/src/supabase/templates/template_source_generator.dart:40-43` (`idType`: column named `id`, else the first column), `:54-65` (`Future<Model?> name(<idType> id)`) | Same as `database.md:35` ("its type decides whether `id` is a number or text") |
| `int` for a whole number | ok | `template_source_generator.dart:42` (`int` only when the mapped type is `int`); `packages/data/lib/src/supabase/models/sb_table.dart:60-70` (`integer` → `int`) | PostgREST reports int2/int4/int8 as JSON `integer`: not in the repo, see open issue 2 |
| `String` for text or a uuid | ok | `sb_table.dart:62-63` (`string` → `String`); `template_source_generator.dart:42` (anything that is not `int` is `String`) | uuid and text are JSON `string` in PostgREST |
| A mismatch shows an error in **Problems** | ok | `packages/core/lib/src/interpreter/block_problems.dart:196-202` (`ArgumentTypeNotAssignable`, default type error); `packages/core/lib/src/interpreter/block_tree.dart:5795-5812` (`!param.type.isAssignableTo(arg)`); `packages/core/lib/src/interpreter/type.dart:160-182, 227-247`; `packages/core/lib/src/interpreter/services/problem_service.dart:175` (per-file `findProblems`); `packages/core/lib/src/panels/problems_panel.dart:46, 59` (default source **From Nowa**, Instant) | `String?` into `int` is not assignable (names differ). Also shown in red under the Data Builder's input: `packages/core/lib/src/fields/class_field.dart:107-117`, `packages/data/lib/src/supabase/ui/sb_field.dart:53` |
| The reader can still link a mismatched param, so the error is what they see | ok | `packages/core/lib/src/fields/link_menu.dart:90-93` (`_typeFilter` only drops `void`), `:16, :152-159`; `packages/core/lib/src/fields/field_link_menu.dart:160-186` (link applies, menu goes one level deeper) | The param is still listed under **LOCALS**; nothing converts it |
| Wording: "the route's chip" | fixed | `go_route_node_view.dart:173, 188` (chips sit under **Route Parameters**, drop target is **Screen Parameters**) | Now "the parameter's chip", the term step 2 of **Path parameter** uses. Second sentence tightened ("It must match ... `int` if your table's `id` is a whole number, `String` if it is text or a uuid"), 5 words shorter, same facts |
| Numbered steps, `{#open-a-detail-screen}` and the 5 inbound links to it unchanged | ok | `docs/ai/prompting.md:57`, `docs/integrations/supabase/database.md:111`, `docs/integrations/show-data.md:57`, `docs/reference/widgets/lists.md:42`, `docs/guides/complete-app.md:84` | Link script: no broken link or anchor on the page |

## `docs/guides/complete-app.md`: step 4 pointer (line 60) and step 6.1 (line 80)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Link target and anchor exist, link text equals the heading | ok | `docs/logic/router.md:48` (`## Start on the login screen or the home screen {#start-on-login-or-home}`) | `router.md` is in pages.md (status verified, P9 routes review) |
| "Make the recipe list your home screen" | ok | `docs/logic/router.md:60` (step 1: check **This is the home screen**, else **Make home screen**); `packages/designer/lib/src/details/route_details.dart:278, 291` | "instead of the login screen" refers to this guide's own step 4.6 |
| "give its route **Redirect Logic**" | ok | `docs/logic/router.md:61-62` (steps 2-3); `packages/core/lib/src/editors/router_editor/router_block_view.dart:486, 601` (label `Redirect Logic`) | |
| "that sends everyone else to the login screen" | ok | `docs/logic/router.md:49, 63-67` (intro; **False** branch returns the login path) and `:72` | Section was verified by the P9 routes review, including the Supabase **Custom Expression** (`P9-routes-review.md`); the pointer needs no change either way |
| `getByIdRecipes` is the function's name | ok | `packages/data/lib/src/supabase/templates/supabase_template_manager.dart:94-96` (`getById` + `camelCaseToSpaces()` of the table), `packages/core/lib/src/utils.dart:77-79` | `recipes` gives `Recipes`. Same as step 5.1 |
| That function's `id` is `String` for the guide's uuid table | ok | `template_source_generator.dart:40-43`; `sb_table.dart:62-63` | Step 3's prompt asks for "a uuid id" |
| A new param is a `String` that can be empty, default `''` | ok | `declaration_list_widgets.dart:277-299` (`$String.thisType.copyWith(isNullable: true)`, `StringBlock('')`); `packages/designer/lib/src/panels/variables_panel.dart:72`; `packages/core/lib/src/interpreter/declaration_runtime.dart:1019` (`isFinal = true`, so it shows in **Params**) | |
| **Details** shows the type as `String` (so "keep `String`, the default" is something the reader can see) | ok | `packages/core/lib/src/widgets/code/type_widgets.dart:9-14` (`TypeView` shows `name`, no `?`); `packages/core/lib/src/interpreter/type.dart:104` (`source` adds the `?`, `name` does not) | Hovering the type icon in the **Params** list shows `String?` (`type_widgets.dart:77`); the page does not say otherwise |
| No nullability control in the editor | ok | `variable_widgets.dart:309-353, 416-460` (**Name**, **Type**, **Default Value**; **Is Final** / **Is Static** only outside widget classes); `packages/core/lib/src/fields/nowa_fields.dart:682, 696-706` (picker types are always nullable; **As List** is the only option); grep of `isNullable` under `core/lib/src/{widgets,fields,panels}`, `designer/lib/src/{details,panels}`, `code/lib/src` finds no toggle | |
| A nullable param linked to a non-null input is accepted and gets a `!` | ok | `type.dart:227-247` (same class name, no type arguments: assignable whatever the `?` says); `block_tree.dart:3322-3330` (`getNullabilitySuffix`: `!` for a nullable value in a slot that does not expect null), `:3640-3671` (`ReferenceBlock.source`); `packages/core/lib/src/interpreter/block_host.dart:47-61, 150-153` (a call argument's slot gets its expectation from the function's parameter type) | Source becomes `getByIdRecipes(id!)`. The page does not mention the `!` (invisible in the editor) |
| A different type is a **Problems** error | ok | see the `navigation.md` table | |
| Order in 6.1 (type, then **Path**, then the drag) matches `navigation.md` | ok | `go_route_node_view.dart:344-355` | |
| Step 4 and 6.1 stay one action per step; no new admonition | ok | | The pointer is a plain paragraph |

## `docs/integrations/rest-api/index.md`: warning (lines 40-42)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Base URL** is written into the collection's Dart file | ok | `packages/data/lib/src/api/model/api_collection.dart:14-20, 55-58` (`setBaseUrl` sets `baseUrl` on the `BaseOptions` of `_dioClient`, created at `:46`); `packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:86` | Page intro already names `lib/api/cats.api.dart` |
| Collection headers are written into the file | ok | `api_collection.dart:24-30, 60-63` (`BaseOptions.headers`); `api_edit_collection_dialog.dart:177, 199-267` | |
| Headers on a single request are written into the file | ok | `packages/data/lib/src/api/model/request_func.dart:141-157` (`Options(headers: ...)` on the request call); `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_form.dart:41` (**Headers** tab) | The request is a member of the collection class |
| A token pasted into a header value is written like any other value | ok | `packages/data/lib/src/api/views/widgets/headers_field.dart:161, 183` (`BFString` cells, hints `Key` / `Value`), `:37` (**Add header**) | |
| These ship inside the app | ok | the collection class is project code compiled into the app | |
| **Auth Key** is only a name | ok | `api_edit_collection_dialog.dart:139, 163-168` (helper text "The key used to store the auth token in SharedPreferences"); `packages/data/lib/src/api/interceptors/generate_auth_interceptor.dart:4-14` (`options.headers['Authorization'] = 'Bearer ${sharedPrefs.getString('<key>')}'`); `api_collection.dart:100-115` | Only the name is written |
| Your app reads the token from Shared Preferences on the device | ok | `generate_auth_interceptor.dart:11`; `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:25-30` and `packages/core/lib/src/project/env_services/main_func_block.dart:20` (`sharedPrefs = await SharedPreferences.getInstance()`) | |
| "Nowa writes no token into your code" | fixed | `api_edit_collection_dialog.dart:86-90` (saving the **Auth Key** only adds or removes the interceptor); `packages/data/lib/src/api/importers/postman_importer.dart:67-73` (a Postman import copies the file's header values into request headers, a token included); `packages/data/lib/src/api/importers/xano_importer.dart:9, 53` (Xano token only calls Xano; the import is a Swagger import) | Too broad as written: now "saving it writes no token into your code". True for every path, and still says what the reader needs |
| The test token is not in the project | ok | `packages/data/lib/src/api/model/test_api_func_provider.dart:137-144`; `api_test_values_panel.dart:141`; `packages/core/lib/src/interpreter/libraries/shared_preferences_library.dart:145-151` (editor-local `user_shared_prefs_<projectId>`) | Backs the page's "Test a request" step 2; the warning does not repeat it |
| Labels **Base URL**, **Auth Key**, **Add header**, **Headers** | ok | `api_edit_collection_dialog.dart:139, 163`; `headers_field.dart:37`; `api_request_form.dart:41` | |
| Admonition count and type | ok | | 2 on the page (warning, tip), not stacked. Warning kept: leaked secrets are the one case on the page where a warning fits |

## `docs/design/boards.md`: "Big boards and errors" (line 78)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "more than 8" | ok | `packages/core/lib/src/board/canvas_detail.dart:43` (`liveBudget = 8`), `:154` (`crowded = visible.length > liveBudget`) | |
| "in or near view" | ok | `canvas_detail.dart:46` (`_margin = 200.0`), `:150-153` (viewport inflated by the margin; a canvas counts when it overlaps) | Number left off the page |
| "the rest show as still pictures" | ok | `canvas_detail.dart:14-23` (`picture`: painted from a picture, animations paused), `:157-160` | Off-screen items are not painted at all; the sentence is about items in or near view |
| "hover, select or play" | ok | `canvas_detail.dart:123` (`isKeptLive`: hovered or `keepLive`); `packages/designer/lib/src/panels/designer_board.dart:47-48` (selected, or playing inline) | |
| Sentence is word for word the one on `ship-tips.md` | ok | `docs/guides/ship-tips.md:48`; the first sentence ("Items in view build first, and only the item you hover, select or play animates.") is identical too | Checked with a script |
| "Items in view build first" (not changed) | ok | `canvas_detail.dart:94-109` (`mayBuild` favors the same visible set, so first builds also cover "near view") | Not wrong, only shorter than the code. Left the same as ship-tips |
| Anchor `#big-boards-and-errors` and its inbound links | ok | `docs/guides/ship-tips.md:53`, `docs/troubleshooting/index.md:39` | Heading unchanged |

## Checks on the rest (all four pages)

- Front matter (title, description, sidebar_label, keywords) present and unchanged. No H1, no `---` rules, headings in sentence case, no hype words, no emoji.
- Admonitions: navigation 1, complete-app 1, REST 2, boards 0.
- Links: a script resolved every relative link and anchor on the four pages (0 problems). The only new link, `../logic/router.md#start-on-login-or-home`, resolves; `docs/logic/router.md` is in pages.md. No heading changed, so no inbound anchor moved.
- Capture placeholders: none added; the existing ones (`logic-navigation-1`, `integrations-rest-api-2`, `guides-complete-app-1`) are untouched and well formed.
- Visible words (comments, front matter and link targets excluded): navigation 1,506, complete-app 1,354, REST 1,362, boards 899.

## Open issues

1. **Not run in the app.** The id-type paragraph, the `!` behavior and the Problems error come from code only. A manual try would confirm them: add an `id` param to a detail screen, keep **Type** `String`, link it to the id input of a `String id` function (no error; the generated code reads `getByIdRecipes(id!)`), then set it to `int` (error under the input and in **Problems**).
2. **One external fact.** That PostgREST reports int2/int4/int8 as JSON `integer` and uuid/text as `string` is not in the repo (Nowa only reads `type`, `sb_table.dart:42, 60-70`). `database.md:35` relies on it as well.
3. **`navigation.md` length.** 1,506 visible words against a guide of about 1,200; the P9 routes review already raised this (its open issue 5). W22's paragraph adds about 50 words (I trimmed 5). Cutting more means moving the Navigator section or the recipe, which is the lead's call.
4. **Retyping after the drag.** The page says to set **Type** first but not what to do if the type is changed later. The code suggests dragging the chip again regenerates the conversion (`go_route_node_view.dart:344-355`) and the old argument stays until then, but I did not add it because it needs a run in the app. Related and out of this batch: with an integer table id, `complete-app.md` steps 2 and 5.5 would also need `int` on `RecipeCard`'s `id` (writer's note); the guide's table is a uuid, so nothing changed.
