# P9 routes review (verifier)

Batch "P9 routes": `docs/logic/router.md` (new), `docs/logic/navigation.md`, and the one-line links on seven other pages. Source of truth: `/home/user/nowa-master` (v3.12.5). Library sources: `/root/.pub-cache/hosted/pub.dev/` (`supabase_flutter-2.12.0`, `gotrue-2.18.0`, `firebase_auth-6.1.4`, `firebase_auth_platform_interface-8.1.6`, `firebase_auth_web-6.1.2`, `go_router-17.1.0`).

## Summary

All pages of the batch are checked. The first run stopped after `router.md` on the orchestrator's request; the second run did `navigation.md` and the seven one-line-link pages.

| | |
|---|---|
| Pages checked | 9: `router.md`, `navigation.md`, and the one-line links on 7 pages |
| Claims checked | about 150 (`router.md` about 60, `navigation.md` about 80, one-line pages 9) |
| Fixed | 4: `router.md` (Supabase typing step, "Stay signed in" softened, drag-edge sentence); `navigation.md` (recipe step 3 now shows the text after the pick) |
| Removed or reduced | `router.md`: 1 duplicate Next-steps bullet; 1 Firebase-on-phones claim reduced to web |
| Wrong statements found in the one-line links | 0 |
| Open issues | 7 (below) |

Stopped here (first run); left then: `navigation.md` and the seven one-line-link pages. All done in the second run; nothing left in the batch. Not done anywhere: a manual run in the app (see open issues 1 and 2).

## `docs/logic/router.md`

Result: 1,192 visible words (limit about 1,200; 1,181 before my edits, 1,219 after the fixes, then trimmed). Two admonitions (tip, warning). No H1, no `---`, headings in sentence case, no hype words, no emoji. The `!` in the body is the `!=` of the expression.

### Supabase Custom Expression (the item the lead asked about)

Verdict: kept (the code shows it works), with one fix to the typing step. Not run in the app.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| A user can open **Custom Expression...** from an If **Condition** | ok | `packages/code/lib/src/widgets/add_statement_menu.dart:60-76` (**Add If statement** inserts `IfStatement(condition: SimpleBlock(true))`); `packages/core/lib/src/fields/block_field.dart:1010-1016` (clicking a field label opens the link menu); `packages/code/lib/src/fields/statement_fields.dart:47` (label `Condition`); `packages/core/lib/src/fields/field_link_menu.dart:341, 352-353` (**Custom Expression...** is the first extra item) | |
| The same works in **Redirect Logic** | ok | `packages/core/lib/src/editors/router_editor/router_block_view.dart:463-471, 551-557` (the function is a normal closure opened by `openBlockInCircuit`, `packages/core/lib/src/fields/basic_fields.dart:520-530`) | The If is a statement inside that closure, so the menu is the same as in any circuit |
| Free-text box: type an expression, Enter or **Eval** | fixed | `expression_builder_popup.dart:231-262` (hint `Enter expression...`, button `Eval`, `onEditingComplete` evaluates); `expression_builder_provider.dart:6-10, 195-216` | Two things were missing. The box opens prefilled with the field's current text (`true`, from `host.block.source`), so typing alone would give `trueSupabase...`. And after Enter the dialog stays open in the assisted view (`onEvalExpression` never pops it); the back arrow closes it (`expression_builder_popup.dart:168`). Step 5 now says "replace the text", "press Enter", "click the back arrow to close the box" |
| `Supabase`, `instance`, `client`, `auth`, `currentSession` are bound | ok | `packages/core/lib/src/interpreter/libraries/supabase_flutter_library.dart`: class `$Supabase` `:9265` (registered `:178`); static `instance` `:9268-9273`; field `client` (type `SupabaseClient`) in `$Supabase.instanceMembers` `:9342-9347`; `SupabaseClient.auth` `:8486-8491`; `GoTrueClient.currentSession` (type `Session?`) `:2259-2266` | |
| The library is loaded when Supabase is connected | ok | `packages/core/lib/src/interpreter/packages/dart_package.dart:135-146` (`libraries: [supabaseFlutterLibrary]`); `packages/data/lib/src/supabase/supabase_manager.dart:188-196` (`onConnect` registers the package) | |
| The name `Supabase` resolves in the router file | ok | `packages/core/lib/src/interpreter/block_tree.dart:7063-7066` (`BlockUnit.lookupDeclaration` falls through to the parent lookup), `:174-176` (`Block.lookupDeclaration` ends in `gProject.lookup`); `packages/core/lib/src/providers/project_provider.dart:298-299`; `packages/core/lib/src/interpreter/library.dart:57-62, 478-484` (scans every loaded library; a unique name is returned without checking the file's imports) | The generated `SupabaseService` already relies on the same chain (`supabase_manager.dart:229-238`: `Supabase.instance.client.auth.signInWithPassword`) |
| The import is added to `lib/globals/router.dart` | ok | `block_tree.dart:6860-6877` (`generateImports` on save), `packages/core/lib/src/interpreter/visitors/imports_visitor.dart:122-135` (`visitReferenceBlock` adds the declaration's import when there is no prefix) | `SupabaseService` gets its import the same way (`supabase_manager.dart:241-244`: `loadDartCode`, `linkFile`, `generateImports`) |
| `X != null` fits the bool **Condition** | ok | the field type is `bool` (`field_link_menu.dart:331`); `!=` gives a bool | |
| "Nowa has no ready-made Supabase check" | ok | `supabase_manager.dart:216-239`: the generated service has `initialize`, `signIn`, `signUp`, `signOut` only | |
| "empty when nobody is signed in" | ok | `GoTrueClient.currentSession` is `Session?` (`supabase_flutter_library.dart:2259-2266`) | |

I did not run the editor, so the typing flow, the Eval result and Play behavior are from code only. The page does not claim Play runs the redirect.

### Firebase path

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **FIREBASE** → `isUserSignedIn` in the **Condition** menu | ok | `packages/data/lib/src/firebase/firebase_plugin.dart:121-146` (`FirebaseCategory`, name `Firebase`, circuit only, lists `fbBaseClass.instanceMembers`); `packages/core/lib/src/interpreter/suggestion.dart:467-508` (circuit menus include `extraCategories`); `packages/core/lib/src/fields/link_menu.dart:331` (`.toUpperCase()`); `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:55-75` (`IsUserSignedInFunc`, returns bool); `fb_auth_manager.dart:34-42` (added when **Authentication** is on) | |
| In **Play**, `isUserSignedIn()` returns false | ok | `fb_auth_blocks.dart:72-76` | |

### Stay signed in between launches

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Nowa starts Supabase and Firebase with default settings in `lib/main.dart`, before the first screen | ok | `packages/core/lib/src/project/env_services/main_func_block.dart:15-25`; `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:28-33`; Supabase `await SupabaseService().initialize();` (`supabase_manager.dart:188-192`) calls `Supabase.initialize(url:, anonKey:)` with no `authOptions` (`:221-226`); Firebase `await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);` (`packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:13-18`) | grep over `packages/data/lib`, `core/lib/src/file_system`, `/project`, `/integrations`, `/interpreter/packages`: no `setPersistence`, `EmptyLocalStorage`, `authOptions` outside the library bindings |
| Supabase saves the session on the device and restores it at start | ok | `supabase_flutter-2.12.0/lib/src/supabase.dart:111-146` (default `SharedPreferencesLocalStorage`; `initialize` awaits `supabaseAuth.initialize`); `lib/src/supabase_auth.dart:40-75` (`setInitialSession` from the saved session), `:130-136` (every session change is saved; sign-out removes it); `lib/src/local_storage.dart:16-38` ("persist the user session in the device"; `EmptyLocalStorage` "used to disable") | The local copy is 2.12.0; Nowa pins `^2.12.2` (`dart_package.dart:135-139`), the same minor line |
| Firebase does the same in the browser in a web app | ok | `firebase_auth_web-6.1.2/lib/src/interop/auth.dart:22-38` (default persistence: IndexedDB, then local storage, then session); `lib/firebase_auth_web.dart:60-85` (`Firebase.initializeApp` waits for the initial auth state); `firebase_auth_platform_interface-8.1.6/lib/src/types.dart:30-45` | |
| Firebase does the same on phones | removed (reduced) | `firebase_auth-6.1.4/lib/src/firebase_auth.dart:399-415` and `types.dart:30-34` only say a persistence type "is only supported on web based platforms" | The native SDKs' own storage is not in the local sources, and `firebase.google.com` is blocked, so it can't be confirmed. The page now names web only for Firebase and sends the reader to "Test it" for Firebase on a phone |

### Rest of the page

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Open the Router panel: sidebar **Router** below the divider; **Router Settings**; routes left, settings right; **Open Router Editor** icon in **Route Settings** | ok | `lib/project/side_bar.dart:102-113, 148-153`; `router_settings.dart:6`; `router_block_view.dart:117-170`; `packages/designer/lib/src/details/route_details.dart:121-124`; `router_editor_actions.dart:18-37` | The icon is hidden under the experimental "New UX" flag (default off), as W6 noted |
| **Add Route** (**+**) offers only **Route**; **Add Sub-Route** on hover; **Delete Route**; **Remove Route** dialog about child routes | ok | `router_context_menus.dart:37-65` (shell routes commented out); `router_block_view.dart:135-150, 272-278, 355-370`; `router_editor_actions.dart:139-145` | |
| Drag a route onto another to nest it, or "onto a route's top or bottom edge" to place it at that level | fixed | `router_block_view.dart:633-645` (`mapDropPosition`: top 30% = target's level, middle = inside, bottom = `hasExpandedChildren ? inside : target's level`) | Routes start expanded, so the bottom edge of a parent nests. Reduced to the top edge, which is true in every case |
| A moved route goes to the end of its new list | ok | `packages/core/lib/src/project/env_services/router_file_service.dart:547-586` (`move` = remove, then `addChild`) | |
| **Edit a route** table: **Path** (`:id`), **Full Path**, **Screen** (click to pick; bolt **Edit Function**), **Route Parameters** (red `*` on path chips; **Rename**, **Delete**), **Screen Parameters** (only when the screen has params; drag a chip onto one), **Redirect Logic** (**+** then bolt) | ok | `go_route_node_view.dart:19-198, 215-222, 259, 344-355`; `router_context_menus.dart:22-32`; `router_block_view.dart:475-501`; `shell_route_node_view.dart:257-272` | 6 rows, 5 labels in the cells |
| **Router Configuration** (gear): **Initial Location** (must start with `/`), **Redirect Logic**, **Remove # in URLs** | ok | `router_block_view.dart:135-140, 532-537, 585-627` | Error text 'Initial location must start with a "/"' |
| **Redirect Logic** is a function that gets `context` and `state`, returns a path or `null`; a new one returns nothing | ok | `router_block_view.dart:463-471, 551-557` (params `BuildContext context`, `GoRouterState state`; body `return null`); `go_router-17.1.0/lib/src/configuration.dart:20-22` (`FutureOr<String?> Function(BuildContext, GoRouterState)`) | The product's own help text names the login use: `router_block_view.dart:487-493` |
| The app-wide **Redirect Logic** runs for every route, including the login screen | ok | `go_router-17.1.0/lib/src/router.dart:75-87` ("runs once per navigation cycle before any route-level redirects") | |
| Before you start: GoRouter project; routes with paths such as `/home-page`, `/login-page`; **Authentication Template** screens start without routes | ok | `router_editor_actions.dart:18-37`; `route_details.dart:26` (`camelCaseToHyphenCase`); `file_actions.dart:50` (only the single-file template path adds a route); `docs/design/templates.md:39` | |
| Steps 1-2: **This is the home screen** / **Make home screen**; select the home route in the Router panel | ok | `route_details.dart:277-291` | |
| Steps 3-4, 6, 7: **Add Redirect Logic**, **Edit Function**, floating panel, **Add If statement**, **False**/**True** branches, **Add Return**, **Return**, close with **×** | ok | `router_block_view.dart:496-498`; `shell_route_node_view.dart:266-270`; `basic_fields.dart:520-530`; `add_statement_menu.dart:23-43, 60-76`; `packages/code/lib/src/models/if_node.dart:61-67`; `statement_fields.dart:33`; `packages/core/lib/src/providers/panel_provider.dart:553-559` | **Add Return** takes the closure's inferred type `FutureOr<String?>` (`block_tree.dart:6433-6449`), so the Return starts as empty text (`block_utils.dart:91-92`) and the step to set it is right |
| "A signed-in person ... opens the home screen, because the **Return** below the **If** still returns nothing" | ok | the default `return null` stays below the new If (`add_statement_menu.dart:60-76` inserts a statement before it) | Logic from code, not run |
| **Fix route problems**: duplicate paths, no builder, initial location with no route, in **Problems** | ok | `router_problems.dart:36-110` ('Duplicate route path found', 'No builder defined for this route.', 'Initial route ... not found') | |
| **Switch an older project to GoRouter**: **New Router System**, **Legacy**, **Recommended**, **Enable GoRouter**, **Confirm Action**, **Migrating to New Router**, the Router panel opens, warning | ok | `router_migration_editor.dart:21, 36, 191, 205, 284-288, 345`; `router_editor_actions.dart:44-80` | Text unchanged since W6 |
| Tip: **Agent** mode prompt, `SupabaseService` function | ok | glossary (**Agent**); the Supabase part is a suggestion, not a product claim | |
| Links and anchors | ok | `../design/screens.md#name-the-route` (`screens.md:51`), `../test/run.md#run-your-app` (`run.md:16`), `../integrations/firebase/auth.md#test-sign-in-in-nowa` (`auth.md:67`), `./navigation.md`, `../design/templates.md`, `../test/devices.md`, `../test/problems.md`, `../ai/modes.md`, `../integrations/deep-links.md`, `../integrations/supabase/auth.md`, `../integrations/firebase/auth.md` all exist; own anchors `#switch-an-older-project-to-gorouter` and `#start-on-login-or-home` are headings in the file | |
| Capture placeholders `logic-navigation-2`, `logic-router-1` | ok | format matches `style-guide.md` | `logic-router-1` needs Firebase connected (writer's request) |

Edits to the page (all minimal): step 5 Supabase bullet (typing step); "Stay signed in between launches" paragraph (Firebase limited to web, test pointer); the drag sentence (top edge only); the Next steps bullet for the two sign-in pages removed (they are linked under "Before you start" and the closing paragraph points to them); two short sentences tightened to stay under the length guide.

## `docs/logic/navigation.md`

Result: 1,529 visible words (1,526 before my edits). One admonition (tip). No H1, no `---`, headings in sentence case, no hype words, no emoji. Front matter has title, description, sidebar_label and keywords. Still over the ~1,200 guide: see open issue 5. The pointer H2 `## Set up routes in the Router panel {#manage-routes-in-the-router-panel}` is present, and its text matches what `router.md` now holds.

### Open a detail screen {#open-a-detail-screen}

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Inside a list item `element` is the row it shows; created when a list is connected to a List View or Grid View | ok | `packages/core/lib/src/widgets_to_add/default_blocks.dart:192-213` (`createItemBuilder`: `final element = list[index];`), `packages/core/lib/src/fields/list_view_field.dart:139-163`, `grid_view_field.dart:41-62` | |
| **Builder** mode; the list can be a variable or the `data` of a **Data Builder** | ok | `docs/reference/widgets/lists.md:31-38` (`#connect-a-list`), `:62` (Grid View starts as a **Builder**), `docs/integrations/show-data.md` ("Show a list") | |
| Step 1: **List Tile** has **On Tap**; any other widget: **Add Wrapper** → **Gesture Detector** or **Ink Well** | ok | `packages/core/lib/src/interpreter/libraries/material_library.dart:55941` (`ListTile` `onTap`), `packages/core/lib/src/utils.dart:77` (label), `docs/logic/events.md:41`, `docs/reference/wrappers.md:65-66` | |
| Step 2: the button next to **On Tap** (**+** or **Edit**); GoRouter node from **GLOBALS** starts as `push` with `/path` | ok | `packages/core/lib/src/fields/nowa_fields.dart:793-825`; `packages/core/lib/src/state_management/global_state_suggestions.dart:44-54` (`GoRouter.of(context).push('/path')`) | **Type** defaults to `push`, and a node first inserted has a text **Location**, so `$` works (it may not after switching from `pop`: W6 note) |
| Step 3: type `$` in **Location**, open **LOCALS**, click `element`; then `.id` | fixed (wording) | `packages/core/lib/src/fields/basic_fields.dart:100-117` (the `$` key opens the menu; the pick is inserted as `{source}` right after the `$`); `interpolated_text_field.dart:68-73`; `reference_field.dart:34-48` (the field shows `${` + parts + `}` as text); `string_interpolation_parser.dart:70-84` (the content of `${...}` is parsed as an expression; unfinished text such as `${element.}` falls back to plain text, so typing `.id` is safe); `packages/core/lib/src/interpreter/suggestion.dart:588-634` (**LOCALS** lists the enclosing declarations: `element`, and a component's public params) | The page now shows what the field reads after the pick, `/product/${element}`, and says to type `.id` inside the braces. Not run: where to click to place the caret (the `element` part is a clickable span, `reference_field.dart:84-104`). Open issue 1 |
| Component variant: add the tap inside the component, pick the `id` param after `$` | ok | `suggestion.dart:607-633` (public params of the widget class under **LOCALS**) | |
| Step 4: **Data Builder** wrapper; **Source** → **Supabase**; **Query**; the **Get Record by ID** template; link the id input; `data` | ok | `packages/core/lib/src/fields/source_tabs_field.dart:32` (**Source**), `packages/data/lib/src/supabase/supabase_plugin.dart:45` (tab name), `packages/data/lib/src/supabase/ui/sb_field.dart:33` (**Query**), `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:29-37` (template and its `id` param), `template_source_generator.dart:41-62` (returns the model, nullable; takes an `int` or `String` id); `docs/integrations/show-data.md` steps for the wrapper and the parameter fields | |
| Step 5: **Play**; the list screen needs a route | ok | `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:115-165` | |
| **Extra** can carry a whole row, but the Router panel can't connect it to a screen's param | ok | `packages/core/lib/src/project/env_services/router_file_service.dart:878-886` (only `path` and `query` parameter types); no read of `extra` in `router_file_service.dart`, `go_router_routing_service.dart` or `editors/router_editor/` (grep) | By absence |
| Navigator variant: model as the param type; brush icon in the **Navigator** node; click the param's name; `element` under **LOCALS** | ok | `packages/code/lib/src/customizations/navigator_field.dart:68-110` (**to**, **result type**, **result**), `nowa_fields.dart:484-506` (brush icon, `Icons.brush`), `packages/core/lib/src/fields/block_field.dart:1010-1016` (a field label opens the link menu), scope as above | |
| "ask in **Agent** mode" prompt | ok | glossary | A suggestion, not a product claim |

### Rest of the page

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| New projects use GoRouter, since Nowa 3.5; older projects use Navigator | ok | `docs/new/whats-new.md` (3.5, 9 February 2026: "Routing is now GoRouter by default"), `docs/new/change-log.md:246` | |
| Comparison table: pick by path or screen; web URLs, back button, deep links | ok | `packages/core/lib/src/editors/router_editor/router_migration_editor.dart:69, 73, 105, 109` | The migration page's own rows |
| **Router** opens **Router Settings** (GoRouter) or **New Router System** (older) | ok | `router_editor_actions.dart:18-37`, `router_settings.dart:6`, `router_migration_editor.dart:21` | |
| New screen from **Empty Page** gets a route named in lowercase with hyphens (`HomePage` is `/home-page`) | ok | `packages/core/lib/src/file_system/actions/file_actions.dart:47-50`, `packages/core/lib/src/services/templates/built_in/empty_page.dart:4-8` (one template file), `utils.dart:81` | |
| Select the screen by its title; **Route Settings** in **Details**, GoRouter only; **Path** + Enter creates the route | ok | `packages/designer/lib/src/details/widget_fields.dart:246-251`, `route_details.dart:43-53, 107, 113, 131-133` | |
| **Make home screen** adds a route if missing and sets the start location | ok | `route_details.dart:262-295`, `go_router_routing_service.dart:13-28` | |
| Link to `router.md#start-on-login-or-home`; "open the home screen only for signed-in people" | ok | anchor exists; the section does exactly that | |
| Go to another screen: **Edit** next to **On Pressed**, dot under the top node, **All nodes for this circuit**, **GLOBALS** → **GoRouter**, pushes `/path` | ok | `link_menu.dart:61`, `global_state_suggestions.dart:44-54`, `nowa_fields.dart:793-825`, `docs/logic/events.md:12-16` (a new Button reads **Edit**) | |
| **Type** list (nine names), **Location**, **Extra**, **result** for `pop`, **await** under **Future Options**, **Store result** | ok | `packages/code/lib/src/customizations/go_router_field.dart:12-22, 94-110, 141-155`; `packages/code/lib/src/fields/future_options.dart:97-107`; `store_result_field.dart:98` | |
| **Play** starts the router at the screen's path; a screen without a route plays alone | ok | `widget_info.dart:115-165` | |
| Pass data: **Add Route Parameter** on hover, `/:param1`, path chips, **Screen Parameters**, **Add Query Parameter**, **Rename**, conversions | ok | `route_details.dart:131-146`; `go_router_routing_service.dart:215-229`; `go_route_node_view.dart:97-110, 182-190, 259, 332-367`; `router_context_menus.dart:22-32`; `auto_type_parser.dart` | |
| Use the Navigator: **GLOBALS** → **Navigator**, **Type** (four names), **to** with the **Components** filter, brush popup, **result type**, **result**, **await**, **onValue**, **Store result** | ok | `navigator_field.dart:68-110`; `future_options.dart:81, 107`; `store_result_field.dart:98` | Labels re-checked; behavior carried from W6 |
| Next steps and the tip | ok | link texts match the target titles | |
| Links and anchors | ok | every relative link and `#anchor` on the page resolves (script over headings, `{#id}` and `<Anchor>`); inbound anchors from `ai/prompting.md`, `integrations/supabase/database.md`, `integrations/show-data.md`, `reference/widgets/lists.md`, `guides/complete-app.md` and `logic/parameters.md` resolve; no page links to the moved ids (`#switch-an-older-project-to-gorouter` now lives in `router.md` with the same id) | |

Edits to the page: recipe step 3 (shows the text after the pick; says to type `.id` inside the braces); "In a project that uses the Navigator" became "In a Navigator project" (three words).

## One-line links on seven pages

All seven sentences are true and every target exists.

| Page and line | Claim | Verdict | Code ref |
|---|---|---|---|
| `integrations/supabase/auth.md:60` | To skip the login screen when someone is already signed in, see the new section | ok | target `router.md#start-on-login-or-home` exists and covers it, with the Supabase **Custom Expression** (see above) |
| `integrations/firebase/auth.md:61` | Use `isUserSignedIn()` in the **Redirect Logic** of the home screen's route | ok | `fb_auth_blocks.dart:55-75`; the function is already listed on that page (`auth.md:34`) |
| `logic/index.md:32` | New "Route" row: the path that opens a screen, such as `/recipe/:id`; the Router panel lists them all | ok | `router_block_view.dart:117-170` (Routes list); link `router.md` |
| `get-started/editor-tour.md:54` | **Router**: below a divider, opens your app's routes in the workspace, no number | ok | `lib/project/side_bar.dart:148-153` (divider, `showShortcut: false`), `router_editor_actions.dart:18-37` |
| `design/screens.md:59` | The route icon next to **Route Settings** (**Open Router Editor**) opens the router | ok | `packages/designer/lib/src/details/route_details.dart:121-124` |
| `integrations/deep-links.md:52` | An older project shows **Enable GoRouter** in the **Router** panel, which lists deep linking as built in for GoRouter and "Not supported out of the box" for Navigator; see Switch an older project to GoRouter | ok | `router_migration_editor.dart:36, 69, 105` (quoted text matches), anchor `router.md#switch-an-older-project-to-gorouter` exists |
| `test/problems.md:70` | Router problems such as `Duplicate route path found: "/home".`: fix the route in the **Router** panel; see Edit a route | ok | `router_problems.dart:41` (message), anchor `router.md#edit-a-route` exists |

## Open issues

1. **Not run in the app.** Two things are confirmed by code only. (a) The Supabase **Custom Expression** (bindings, name lookup, import generation, same chain as the generated `SupabaseService`). Worth one manual try: Redirect Logic → If → **Condition** → **Custom Expression...**, replace `true`, Enter, back arrow, then **Run** with Supabase connected. (b) Typing `.id` in the **Location** field of the detail-screen recipe: the field shows `/product/${element}` as editable text and the parser accepts the result, but I could not check where a click lands (the `element` part is a clickable span), so the page doesn't say where to click.
2. **Firebase on phones.** Persistence across restarts is not confirmed from local sources (native SDK storage is outside them; `firebase.google.com` is blocked). `router.md` names web only and tells readers to test on a phone. Confirm in the Firebase docs when reachable, then restore a general sentence.
3. **Supabase version.** The local `supabase_flutter` is 2.12.0, Nowa pins `^2.12.2`. Same minor line; not byte-identical.
4. **Expired restored session.** After a restart the saved Supabase session can be expired; `recoverSession()` runs without being awaited (`supabase.dart:138-143`), so `currentSession != null` can be true for a moment. `router.md` doesn't mention it (the writer left it out on purpose).
5. **`navigation.md` length.** 1,529 words against a guide of about 1,200 (tutorials 1,400). I found no repetition worth cutting without losing a step or a verified fact. Getting under needs a split: "Use the Navigator" (about 235 words) or the detail-screen recipe (about 410 words), both of which the brief keeps on this page. Lead's call.
6. **Detail-screen recipe, id type.** The **Get Record by ID** function takes an `int` id when the table's id is numeric and a `String` otherwise (`template_source_generator.dart:41-44`), and the path value arrives as text, converted to the screen param's type by the Router panel. The page doesn't say the screen's param must have the matching type. Not added to keep the page short; a clause in step 4 would close it.
7. **For the lead.** `_rewrite/pages.md` still has no row for `logic/router.md`. The sidebar entry (`sidebars.js:89`) and the capture request (`captures/requests/W6.md:8` now names `docs/logic/router.md`) are already done.
