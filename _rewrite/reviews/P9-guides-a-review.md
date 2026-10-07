# P9 guides A: review log

Batch "P9 guides A": `docs/guides/index.md`, `docs/guides/complete-app.md`, `docs/guides/design-tips.md`. Verifier: not the author. Source of truth: `/home/user/nowa-master` (Nowa 3.12.5). Writer notes: `reviews/W19-writer-notes.md`. Code refs are relative to the repo root.

SUMMARY_PLACEHOLDER

## index.md (Build a great app)

Status: checked, no change needed. Every label and behavior comes from pages that earlier verifiers already checked (W2, W3/W4, W7, W8, W11, W14, W15), and I re-opened the code for each label and behavior the page states. The 10 checklist rows are advice ("Check that...") that name only features that exist.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Front matter (title, one-sentence description, `sidebar_label: Overview`, keywords), no H1, sentence-case headings, no `---` rule, no emoji, no hype words, no admonition | ok | style scan of the file | |
| "Nowa AI builds a first version of your app on the board while you watch" | ok | `packages/ai/lib/src/ui/guided_inline_views.dart:79` ("Every screen is designed with demo data"), `docs/ai/index.md` | No speed claim. |
| Habit 1: describe the whole app once in **Design** mode, then one feature at a time | ok | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:37-39` (**Design**, **Plan**, **Agent**), `lib/dashboard/dashboard_page.dart:50,219-224` | Advice built on the design-to-agent hand-off (**Make it real**, `guided_inline_views.dart:36-41`). |
| Habit 2: colors and text styles in the theme, repeated pieces in components, "one edit changes the whole app" | ok | `packages/core/lib/src/fields/color_fields.dart:731-743` (a linked color writes `Theme.of(context).colorScheme.<role>`), `packages/designer/lib/src/menus/widget_context_menu.dart:93-105` | |
| Habit 3: **Expand** and **Auto** instead of fixed sizes; look at a phone size and a wide size | ok | `packages/designer/lib/src/details/size_fields.dart:141-150` (label is `SizeType.name.capitalize()`), `packages/core/lib/src/layout/layout.dart:388` (`fixed, auto, expand`), `packages/core/lib/src/screen_sizes.dart:12-21` | Also anchors `design-tips.md#make-layouts-that-adapt`. |
| Habit 4: own values in variables, shared values in global state, private values on a server, "everything inside your app can be read" | ok | `packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:17-21` (a constant is a `const` String in `AppConstants`, so it compiles into the app) | Advice. Does not imply a product feature. |
| Habit 5: **Play** while you design, **Run** before you share, a real device before you publish | ok | `packages/designer/lib/src/panels/canvas_titles.dart:247` (**Play**), `lib/project/run/run_button.dart:174,217` (**Run**) | |
| Habit 6: checkpoints undo an AI request; Git or a downloaded copy keeps a good version | ok | `packages/ai/lib/src/ui/content_views.dart:189` (**Restore Checkpoint**), `lib/project/panels/git_panel/git_details.dart:32` (plan gate), `lib/project/download_code_button.dart:35,93,130-131` | The page names no plan gate; both are gated and `ship-tips.md#keep-a-way-back` is the page that says so. |
| Checklist rows 1-3 (theme colors, components, layout at two sizes) | ok | as habits 2 and 3 | Link texts equal the target page titles. |
| Checklist rows 4-5 (loading and error state; Row Level Security tested while signed in) | ok | `packages/core/lib/src/widgets_to_add/default_blocks.dart:223-265` (progress circle, red error text), `packages/data/lib/src/supabase/ui/sb_outline.dart:93-99` (**Testing as:**), `packages/data/lib/src/supabase/ui/rls_error_widget.dart:64,143` | |
| Checklist row 6: no server secret in **Constants**, request headers or a public project | ok | `packages/core/lib/src/settings/constants_settings.dart:13,59` (**Constants**), W14 and W11 notes for headers and Public project | Advice with a link to `data-and-state-tips.md#keep-secrets-out-of-your-app`. |
| Checklist row 7: anything that can fail tells the person what happened (**Future Options**, **onError**) | ok | `packages/code/lib/src/fields/future_options.dart:54-92` | Link goes to `logic/circuit.md#future-options` (heading "Wait for a result"). |
| Checklist row 8: **Problems** clear, real app used on a device | ok | `packages/core/lib/src/panels/logs_and_errors_panel.dart:14` (**Problems**), `lib/project/top_bar_mapper.dart:144` | |
| Checklist row 9: App name, Bundle Identifier, version, icon, permissions | ok | `packages/core/lib/src/settings/project_detail_settings.dart:131,140,289,311`, `packages/core/lib/src/settings/app_icon_settings.dart:18`, `packages/core/lib/src/settings/permissions/permission_settings.dart:12` | Matches `publish/index.md#app-details`. |
| Checklist row 10: a Git commit or a downloaded copy | ok | as habit 6 | |
| "Guides" list: one-line descriptions of the five guides | ok | headings of the five pages | Checked against the H2 lists of `complete-app.md`, `design-tips.md`, `ai-tips.md`, `data-and-state-tips.md`, `ship-tips.md`. |
| 22 relative links and anchors | ok | script check against files and headings | Anchors used: `design-tips.md#make-layouts-that-adapt`, `data-and-state-tips.md#keep-secrets-out-of-your-app`, `ship-tips.md#test-in-the-right-place`, `ship-tips.md#keep-a-way-back`, `logic/circuit.md#future-options`, `publish/index.md#app-details`. |
| No prices, credit amounts or plan limits (D3) | ok | | |

Index result: 18 rows (about 30 individual claims), 0 fixed, 0 removed.

## complete-app.md (Build a complete app, start to finish)

Status: checked, 17 fixes. Steps 4 to 6 were never run, so every label and every step order was read from code and cross-checked with the verified pages (`integrations/supabase/auth.md`, `database.md`, `integrations/show-data.md`, `reference/widgets/lists.md`, `logic/navigation.md#open-a-detail-screen`, `design/components.md`, `design/templates.md`). Plan gates and badges (`cloud` + `paid`) match `publish/index.md`, `web.md`, `android.md`, `ios.md`. No prices, credit amounts or plan limits. Length: 1,427 words (`wc -w`, whole file) before, 1,405 after the fixes, which added about 75 words of corrected steps and cut about 95 elsewhere (about 1,310 words of body text).

### Before you start, step 1 (describe), step 2 (refine)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| A Nowa account is needed (Nowa AI needs one) | ok | `lib/sandbox/sandbox_save.dart:82` (the playground chat asks you to sign in), `docs/ai/index.md` | |
| A Supabase account for the backend | ok | `packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:72,79` | **Connect** authorizes a Supabase account. |
| To publish: a cloud project on a paid plan | ok | `lib/project/run/deploy_button.dart:21` (no **Deploy** for local projects), `:188` and `:287` (the code says "paid plans"), `:56-61` (grants) | Same wording as `publish/index.md`. No plan named, no price. |
| Dashboard prompt box sits under **What do you want to build?** | fixed | `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:593` (the heading), `:423-426` (the box's own hint is "Describe the app you want to build...") | Was "describe the whole app in **What do you want to build?**", which reads as a field label. Now "in the box under". |
| Keep the **Design** chip (it is the default on the dashboard) | ok | `lib/dashboard/dashboard_page.dart:50,219-224`, `packages/ai/lib/src/ui/chat_field/mode_selector.dart:37` | |
| Send button; label **Build it** | fixed | `describe_app_panel.dart:466-468` | **Build it** is a tooltip, not a label. Now "(tooltip **Build it**)", as in `get-started/first-app.md`. |
| Nowa AI designs the screens on your board with demo data | ok | `packages/ai/lib/src/ui/guided_inline_views.dart:79`, `mode_selector.dart:37` | |
| **Questions** card; card **Your app design is complete** | ok | `packages/ai/lib/src/ui/tool_inline_views.dart:395`, `guided_inline_views.dart:71` | |
| "Making the app work comes next, by hand or in **Plan** and **Agent** mode" | fixed | `packages/ai/lib/src/agent/planning_agent.dart:18,30,70` (Plan has no write tools: "You plan; you never implement") | Plan changes nothing. Now "by hand or in **Agent** mode". The tip below still points to **Plan** for deciding what to ask. |
| Capture placeholder `guides-complete-app-1` well formed; request exists | ok | `_rewrite/captures/requests/W19.md` | Needs sign-in and an AI run (not mine to capture). |
| **Themes** in the left sidebar | ok | `lib/project/side_bar.dart:47` | |
| Right-click the card, **Create component**, name, params `id`, `title`, `description`, link the texts | ok | `packages/designer/lib/src/menus/widget_context_menu.dart:93`, `docs/design/components.md` | A new param starts as `String?` (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:294-300`); see open issue 1. |
| **Expand**, **Size** presets | ok | `packages/designer/lib/src/details/size_fields.dart:141-150`, `packages/core/lib/src/layout/layout.dart:388`, `packages/core/lib/src/fields/nowa_fields.dart:912-926`, `packages/core/lib/src/screen_sizes.dart:12-21` | |
| Hover a screen's title, click **Play** | ok | `packages/designer/lib/src/panels/canvas_titles.dart:208,247` | |
| Tip: **Make it real** on the design card switches to Agent and sends | ok | `guided_inline_views.dart:36-41,108` | |
| Tip: connectors need Agent mode; Supabase connector; one feature at a time; Plan mode asks and writes a plan | ok | `packages/ai/lib/src/prompt_controller.dart:73`, `planning_agent.dart:18,30` | The example prompt in the tip was cut for length (it was the writer's own text, no product claim). |

### Step 3 (connect Supabase)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Supabase** in the left sidebar, **Connect**, approve in the browser, **Select**, **Create New Project** | ok | `packages/data/lib/src/supabase/supabase_plugin.dart:25`, `sb_oauth_setup.dart:72`, `packages/data/lib/src/supabase/ui/sb_setup/project_selection_dialog.dart:94,104,206` | |
| Nowa adds the package and a `SupabaseService` with `signUp`, `signIn`, `signOut` | ok | `packages/data/lib/src/supabase/supabase_manager.dart:187-245` (`signIn` 228, `signUp` 232, `signOut` 236) | |
| "Nowa has no table editor" | ok | `packages/data/lib/src/supabase/ui/sb_tables_page.dart:54-79` (read-only list, "create tables in Supabase") | |
| Agent mode, Supabase icon in the chat field, approve each action | ok | `docs/ai/connectors.md` (W2), `packages/ai/lib/src/prompt_controller.dart:73` | |
| Example prompt: "Create a recipes table with a title, a description, ingredients and steps..." | fixed | `packages/data/lib/src/supabase/templates/template_source_generator.dart:40-44,56-63` (the ID templates filter on a column named `id`; its type becomes `int` or `String`), `packages/data/lib/src/supabase/models/sb_table.dart` (`string` columns, uuid included, map to `String`) | Added "a uuid id" so step 5 and 6 have an `id` column that is text, matching the `String?` params from step 2. The prompt is the guide's own example, not a product claim. |
| "Row Level Security (RLS) decides who can read and write" | ok | `docs/integrations/supabase/connect.md` (W15) | |

### Step 4 (sign-in)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Authentication** section, `signUp`, **Testing values**, **Email**, **Password**, **Run** | ok | `packages/data/lib/src/supabase/ui/sb_outline.dart:93`, `packages/data/lib/src/supabase/ui/func_test_section.dart:169,180`, `supabase_manager.dart:252` | Labels come from the parameter names (`email` becomes **Email**, `packages/core/lib/src/fields/block_field.dart:216-218`). |
| Run `signIn`; the section reads **Testing as:** and your email | fixed | `sb_outline.dart:93-99` | One step held five actions. Split into two steps, and "Run `signIn` with the same values" (it needs the credentials again, as in `auth.md`). |
| **Authentication Template** from the **Screen** tool: a login and a register screen, no routes | ok | `packages/core/lib/src/services/templates/built_in/auth_template.dart:3-14`, `packages/designer/lib/src/widgets/designer_tools.dart:152`, `packages/core/lib/src/file_system/actions/file_actions.dart:50,70` (a route is added only in the single-file branch), `packages/designer/lib/src/actions/add_template_designer.dart:25`, `packages/core/lib/src/services/templates/templates_service.dart:313,387` (not premium) | Also what `design/templates.md` says ("a multi-file import doesn't add routes"). |
| "...so give the screens you use a path in **Route Settings**" | fixed | `packages/designer/lib/src/details/route_details.dart:113,132` | The sentence was tied to the template's screens. The list screen needs a path too, for **Location** in the next steps (AI-built screens may have none). Reworded to "give each screen you open a path". |
| Login button, **On Pressed**, add `SupabaseService` then `signIn` | ok | `docs/integrations/supabase/auth.md#login-screen` (W15) | |
| "...with the email and password fields" | fixed | `auth.md` steps 6-7 (click **Email**, open **LOCALS**, pick the controller, choose `text`) | Was ambiguous. Now: link **Email** and **Password** to the `text` of the text fields' controllers. The template's controllers are named `emailController` and `passwordController` (`auth_template.dart:27-31`). |
| **Future Options**, **onValue**, **onError**; **GoRouter** node of type `go`; **Location** | ok | `packages/code/lib/src/fields/future_options.dart:81,97`, `packages/code/lib/src/customizations/go_router_field.dart:12-22,145`, `packages/core/lib/src/state_management/global_state_suggestions.dart:41-52` | `go` is in `goRouterMethods`. A new **GoRouter** node starts as `push` to `/path`, so the type is changed. |
| "let **onError** show a **Show snackbar**" | fixed | `global_state_suggestions.dart:65` (**Show snackbar** is a GLOBALS node) | Grammar and clarity: "Add **Show snackbar** to **onError**". |
| "(set one in **Route Settings** if it has none)" after **Location** | removed | | Now covered once by the template step ("give each screen you open a path"). |
| **Make home screen**, which also creates the route | ok | `packages/designer/lib/src/details/route_details.dart:291`, `packages/designer/lib/src/details/widget_fields.dart:231,248-250` (select the screen by its title), `packages/core/lib/src/project/env_services/go_router_routing_service.dart:13-28` | Adds `/` + the screen name in hyphen-case when there is no route, then sets the initial location. |
| Sign-out: `signOut` on a button, then open the login screen in **onValue** | ok | `auth.md` | |

### Step 5 (show the recipes)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **+** next to **Generate a Query**, then **Query Templates** | ok | `sb_outline.dart:179`, `packages/data/lib/src/supabase/ui/sb_add_function_dialog.dart:76` | |
| If it says **No Tables Found**, click **Fetch Tables** | fixed (added) | `packages/data/lib/src/supabase/templates/ui/template_category_view.dart:107,145,160`, `supabase_manager.dart:84,93-94` (the table list is fetched at connect time and cached) | Order problem: step 3 creates the table after connecting, so the cached list is empty or stale and the warning is the expected path in a new project. The same text is in `database.md`. |
| Choose **Get All Records**, pick the table, **Create new model class**, **Generate Function**; repeat for **Get Record by ID** with **Use Existing Model** | ok | `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:22,31`, `packages/data/lib/src/supabase/templates/ui/model_selection_view.dart:173,287,342` | **Use Existing Model** lists only classes under `/models/` (`:54-70`); the model made in the first pass is saved in `lib/models/` (`supabase_template_manager.dart:157-181`). |
| Function names `getAllRecipes` and `getByIdRecipes` | fixed | `supabase_template_manager.dart:94-96` (`operation` + table name), `packages/core/lib/src/utils.dart:77-79` (`capitalize()`, spaces only inside camelCase names) | True only for a table named `recipes`. Added: "Nowa names each function after its action and your table, so a `recipes` table gives ...". |
| Test: **Testing as:** shows your email, click `getAllRecipes`, **Run**, see the sample recipes | ok | `sb_outline.dart:98`, `func_test_section.dart:180`, `packages/data/lib/src/common/test_section/func_test_provider.dart:52-72` (the same signed-in session) | |
| List View, **Add Wrapper**, **Data Builder**, **Source** **Supabase**, **Query** `getAllRecipes` | ok | `packages/designer/lib/src/details/widget_details.dart:197`, `packages/core/lib/src/wrappers_to_add.dart:86`, `packages/core/lib/src/fields/data_field.dart:193`, `supabase_plugin.dart:45`, `packages/data/lib/src/supabase/ui/sb_field.dart:33`, `packages/data/lib/src/common/data_link_menu.dart:41,73` | Picking a function sets the builder's type argument, so `data` is `List<RecipesModel>`. |
| "(add one from the widget picker if your screen has none)" | fixed | | Shortened to "(or add one)" for length. |
| Select the List View, click **List** (it reads **Connect**), **LOCALS**, `data` | fixed | `packages/core/lib/src/fields/list_view_field.dart:101,105,142,213,343` | Two problems. **List** exists only when **Type** is **Builder**: added "If **Type** shows **Normal**, choose **Builder**" (as `show-data.md` and `lists.md` say). And the button reads **Connect** only when no list is linked; an AI-built list is often already linked to a demo list and shows its name, so the parenthetical was dropped. A `data` that is not a list is ignored (`:142`), which is why the source is picked first. |
| **Item Builder** with **Pick Widget** | ok | `packages/core/lib/src/fields/basic_fields.dart:461` | Picking a widget keeps the `element` declaration (`:408-414`), so linking the list first is the right order. |
| "link its params to `element`" | fixed | `packages/core/lib/src/widgets_to_add/default_blocks.dart:192-218` (`element`), `lists.md#connect-a-list` | Now "link each of its params to the matching field of `element`". |
| Data Builder shows a progress circle while loading and the error if the call fails | ok | `default_blocks.dart:223-265` | |

### Step 6 (detail screen)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Add an `id` param to the detail screen; **Route Settings** **Path** `/recipe/:id` | ok | `route_details.dart:50,113,132`, `go_router_routing_service.dart` (`updatePath`, `addRouteByWidget`) | The route is created when the screen has none. |
| "In the **Router** panel, drag the path parameter onto the screen's `id` param" | fixed | `packages/core/lib/src/editors/router_editor/go_route_node_view.dart:173,188,259,346-355,364,384` | Missing steps: select the route first, and the target sits under **Screen Parameters** (shown only when the screen has a param, so the param must exist first, which the step order already does). A `String?` param needs no conversion (`auto_type_parser.dart:38`). |
| "Open `RecipeCard` on its own (double-click it in the **Widgets** panel)" | fixed | `lib/project/panels/widgets_panel/widgets_panel.dart:15,40,311-340` (the panel starts on **Page**), `preview_tiles.dart:36` (double-click opens) | The component is not listed until **Component** is selected. Added "switch to **Component**". |
| **Add Wrapper**, **Gesture Detector**, **On Tap**, **GoRouter** `push` | ok | `wrappers_to_add.dart:34`, `go_router_field.dart:12-22`, `global_state_suggestions.dart:41-52` | `push` is the default type. |
| **Location**: `/recipe/`, then `$`, pick the `id` param | ok | `packages/core/lib/src/fields/basic_fields.dart:101` (typing `$` opens the link menu), `packages/core/lib/src/fields/interpolated_text_field.dart:41-55`, `packages/core/lib/src/interpreter/suggestion.dart:588-633` (LOCALS lists the component's params) | Same as `navigation.md#open-a-detail-screen` ("pick that param after `$`"). |
| Detail screen: **Data Builder**, **Source** **Supabase**, **Query** `getByIdRecipes`, link the `id` input to the param, show the fields of `data` | ok | `data_link_menu.dart:41`, `sb_field.dart:33-56` (the function's inputs appear below **Query**), `template_source_generator.dart:56-63` | `data` is `RecipesModel?`. See open issue 1 for the `id` type. |
| Link to `navigation.md#open-a-detail-screen`; consistent with that recipe | ok | `docs/logic/navigation.md:79-93` | Same route shape, same `push`, same component variant. The `[Pass data with parameters]` link was cut for length. |

### Step 7 (test), step 8 (publish), next steps

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Play** on the login screen; sign in, open a recipe, go back | ok | `packages/designer/lib/src/play_mode/play_mode.dart:441-475` (a screen with a route starts the router at its path), `packages/core/lib/src/interpreter/libraries/supabase_flutter_library.dart:2314-2322` (real `signInWithPassword`), `supabase_service.dart:39-45` | Play runs the real Supabase calls, unlike Firebase sign-in. The sentence "A screen with a route starts your app's router at that path" was cut for length (it is on `navigation.md` and `test/instant-play.md`). |
| **Run**: real app in a phone frame; the red number in the status bar counts the errors in **Problems** | ok | `lib/project/run/run_button.dart:174`, `lib/status_bar.dart:173,197`, `packages/core/lib/src/panels/logs_and_errors_panel.dart:14` | |
| Cloud project: **Open on Mobile** shows a QR code; desktop app: **Run on** menu | ok | `lib/project/top_bar_mapper.dart:144`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:845-861`, `run_button.dart:545,609` | Devices are desktop-only (`docs/test/devices.md`). |
| Badges `cloud` and `paid`; no price | ok | `deploy_button.dart:21,188,287` | Match `publish/index.md`. |
| **Settings** → **Project Details**: **App Name**, **Bundle Identifier**, **Build version**, **Build number**, **App Icon**; **Permissions** | ok | `packages/core/lib/src/settings/project_detail_settings.dart:16,131,140,289,311`, `app_icon_settings.dart:18`, `permissions/permission_settings.dart:12` | `com.example` placeholder: `packages/core/lib/src/file_system/naming.dart:247-251`. |
| Web: **Deploy**, then **Deploy** on the **Web** row; the site address shows | ok | `deploy_button.dart:100,239,356,361` | The row shows the host name once live. |
| Google Play: **Settings** → **Deployment** → **Android**; **Debug mode** gives an `.apk`; **Generate**; **Build**; upload the `.aab` | fixed | `deployment_settings.dart:13-16,238`, `packages/core/lib/src/cloud_build_v2/ui/android_signing_key_card.dart:55,121`, `workflow_details_page.dart:394,479`, `packages/core/lib/src/file_system/codemagic_file.dart:19-31,35-55` | The debug test needs a click on **Build** as well. Reworded to "To test, turn on **Debug mode** and click **Build** for an `.apk`. For the store, turn it off, ...". |
| App Store: save credentials and a distribution certificate, then build | fixed | `deployment_settings.dart:14-16`, `docs/publish/ios.md` | Added the path (**Settings** → **Deployment** → **iOS**), the exact name "App Store Connect credentials" (was "Apple credentials"), **Build**, and the result: Nowa sends the build to App Store Connect. |
| "Before you publish, work through the publish checklist" | ok | `ship-tips.md#publish-checklist` exists | |
| **Create Record**, **Update Record**, **Delete Record** templates | ok | `supabase_template_definitions.dart:41,51,64` | |
| "To update a published app, raise **Build number** and publish again" | fixed | `docs/publish/index.md` ("Ship an update": Web needs no build number; Android and iOS do) | Now "publish again. For Google Play and the App Store, raise **Build number** first", linking `publish/index.md#ship-an-update`. |
| Links: 28 relative links and anchors | ok | script check | `navigation.md#open-a-detail-screen`, `auth.md#login-screen`, `ship-tips.md#publish-checklist`, `publish/index.md#ship-an-update` resolve. |

Complete-app result: 49 rows, 17 fixed (counting the Fetch Tables hint as an addition), 2 removed (the **Route Settings** parenthetical, the Play-router sentence), the rest ok.
