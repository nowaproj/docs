# P9 routes review (verifier)

Batch "P9 routes": `docs/logic/router.md` (new), `docs/logic/navigation.md`, and the one-line links on seven other pages. Source of truth: `/home/user/nowa-master` (v3.12.5). Library sources: `/root/.pub-cache/hosted/pub.dev/` (`supabase_flutter-2.12.0`, `gotrue-2.18.0`, `firebase_auth-6.1.4`, `firebase_auth_platform_interface-8.1.6`, `firebase_auth_web-6.1.2`, `go_router-17.1.0`).

## Summary

The run was stopped on the orchestrator's request after the first page. Only `router.md` is checked.

| | |
|---|---|
| Pages checked | 1 of 3 batch items (`router.md`) |
| Claims checked on `router.md` | about 60 (labels, steps, behavior, links) |
| Fixed | 3 (Supabase typing step, "Stay signed in" softened, drag-edge sentence) |
| Removed | 1 duplicate Next-steps bullet; 1 Firebase-on-phones claim reduced to what the sources show |
| Open issues | 5 (below) |

Stopped here; left: `docs/logic/navigation.md` (whole page, including `#open-a-detail-screen`, the pointer H2 `{#manage-routes-in-the-router-panel}`, links and anchors); the one-line links on `docs/integrations/supabase/auth.md`, `docs/integrations/firebase/auth.md`, `docs/logic/index.md`, `docs/get-started/editor-tour.md`, `docs/design/screens.md`, `docs/integrations/deep-links.md`, `docs/test/problems.md`. Not started, not checked.

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

## Open issues

1. **Not run in the app.** The Supabase **Custom Expression** is confirmed by code (bindings, name lookup, import generation, same chain as the generated `SupabaseService`) but I did not run the editor. Worth one manual try: Redirect Logic → If → **Condition** → **Custom Expression...**, replace `true`, Enter, close the box, then **Run** with Supabase connected.
2. **Firebase on phones.** Persistence across restarts is not confirmed from local sources (native SDK storage is outside them; `firebase.google.com` is blocked). The page names web only and tells readers to test on a phone. Confirm in the Firebase docs when reachable, then restore a general sentence.
3. **Supabase version.** The local `supabase_flutter` is 2.12.0, Nowa pins `^2.12.2`. Same minor line; not byte-identical.
4. **Expired restored session.** After a restart the saved Supabase session can be expired; `recoverSession()` runs without being awaited (`supabase.dart:138-143`), so `currentSession != null` can be true for a moment. The page doesn't mention it (the writer left it out on purpose).
5. **For the lead.** `router.md` has no row in `_rewrite/pages.md` and no sidebar entry yet (writer's note: add `logic/router` after `logic/navigation`); `captures/requests/W6.md` still names `navigation.md` for `logic-navigation-2`, which now lives in `router.md`.
