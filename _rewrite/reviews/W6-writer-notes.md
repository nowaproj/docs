# W6 writer notes (Add logic: navigation, variables, parameters, global-state, models)

Batch pages: `docs/logic/navigation.md`, `variables.md`, `parameters.md`, `global-state.md`, `models.md`.
Sources: `research/features-logic.md` (sections named per page below), `features-designer-core.md` (Route Settings,
Variables box, Component instances), `features-editor-shell.md` (Router panel row), `features-theme-assets.md`
(AppState / changeTheme). Code paths are relative to `/home/user/nowa-master` (v3.12.5).

A previous run saved nothing; at the start of this run none of the 5 pages existed.

Cross-cutting findings (spot-checked in code while drafting):
- The research has no section for the **Router** panel / router editor. I read
  `packages/core/lib/src/editors/router_editor/*.dart` and `lib/project/side_bar.dart` directly (see navigation notes).
- Name generation: `generateSymbolName` (`packages/core/lib/src/file_system/naming.dart:125-152`): first variable is `var1`
  (`var` is a reserved word), first param is `param`, first function is `func`.

## variables.md

Research: `features-logic.md` sections "Variables panel", "Variables (screen/component)", "Select type", "Set <variable> and refresh",
"Create Local Variable", "Store result", "Link <field> menu", "$ inside text and + after a linked value".
Code refs relied on (spot-checked):
- Variables tile (closed by default, above Details, hidden in code mode): `packages/designer/lib/src/designer_setup.dart:166-226`.
- Sections **Params** / **Variables** / **Functions** and `+` on hover, new variable `var1`/String?/'' and rename mode on add:
  `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:9-205, 277-307, 309-369, 496-532`; panel body
  `packages/designer/lib/src/panels/variables_panel.dart:49-92` (nothing selected shows Globals; several widgets: "Multiple widgets selected").
- Name rules and error texts: `packages/core/lib/src/file_system/naming.dart:34-69`; inline rename errors go to a snackbar
  (`packages/core/lib/src/widgets/code/variable_widgets.dart:200-230`), Details shows them under **Name** (`:503-542`).
- **Details** fields Name / Type / Default Value; **Is Final**/**Is Static** only for non-screen classes: `variable_widgets.dart:309-465`.
- Remove button + "is in use" dialog (**Cancel** / **Remove**): `packages/core/lib/src/panels/details/decl_details.dart:17-79`,
  `packages/core/lib/src/actions/block_actions.dart:10-85`, `packages/core/lib/src/widgets/declaration_references_dialog.dart:53-98`.
- **Select type** picker (search, **As List**, basic types, **show more...** / **show less**, nullable types):
  `packages/core/lib/src/fields/nowa_fields.dart:577-770`. Type change keeps a still-assignable default:
  `packages/core/lib/src/interpreter/generators/variable_generator.dart:16-41`.
- List default editor (length box, **+**, drag reorder, **Load More** after 10): `packages/core/lib/src/fields/list_field.dart:8-200`.
- Link menu items **Create Variable...**, **Create Param...**, etc.: `packages/core/lib/src/fields/field_link_menu.dart:131-330`.
- **Set <name>** button (non-final variables only) and **Value** field: `packages/code/lib/src/fields/expression_statement_field.dart:10-125`;
  **refresh** = `setState` display name: `packages/core/lib/src/interpreter/suggestion.dart:607-633`.
- Rename updates references: `packages/core/lib/src/interpreter/declaration_runtime.dart:67-125`.
- Stateful on first variable: `packages/core/lib/src/interpreter/widget_declarations.dart:407-416` (`addStateMember` creates the state class).
Left out / assumptions:
- The Files-panel preview popup that also lists Params/Variables/Functions (research "Variables panel" limits): peripheral, belongs to the Files page (W9).
- I wrote that "Variables you create here can be empty" (types picked in the picker are nullable, `nowa_fields.dart:663-676`); no nullable switch exists.
- Details panel for a variable inside a screen/component hides **Is Final** / **Is Static** (so not mentioned for variables there).
- Step 4 of "Change a variable from logic" (button named **Set** + the variable name) follows `expression_statement_field.dart:41-47`.
Open question: exact on-screen look of the **+** next to section titles (no tooltip in code for the Variables/Params lists).

## navigation.md

Research: `features-logic.md` "Navigator", "GoRouter", "Future Options", "Params (screen/component parameters)";
`features-designer-core.md` "Route Settings", "Make home screen"; `features-editor-shell.md` sidebar table (Router row);
`docs/new/whats-new.md` 3.5 ("Routing is now GoRouter by default").
The research has no section for the Router panel / router editor / migration, so I read the code directly:
- Sidebar **Router** icon (below the divider, only when the experimental "New UX" flag is off): `lib/project/side_bar.dart:102-113, 148-153`;
  action opens the router file as a tab in GoRouter projects, else the migration page: `packages/core/lib/src/editors/router_editor/router_editor_actions.dart:12-38`.
- Router view name **Router Settings**, registered for `lib/globals/router.dart`: `packages/core/lib/src/editors/router_editor/router_settings.dart:4-11`, `packages/core/lib/src/plugin.dart:84-98`.
  GoRouter project = `MaterialApp.router` in main.dart: `packages/core/lib/src/plugin.dart:130-134`.
- Layout: **Routes** header, gear tooltip **Router Configuration**, **+** tooltip **Add Route**, hover **+** **Add Sub-Route**, context menu **Delete Route**,
  drag to move, **Router Configuration** fields (**Initial Location**, **Redirect Logic**, **Remove # in URLs**; error 'Initial location must start with a "/"'):
  `packages/core/lib/src/editors/router_editor/router_block_view.dart:78-177, 246-378, 517-631`.
- Route details: **Type** (read-only), **Redirect Logic** (**Add Redirect Logic**, **Edit Function**), **Full Path**, **Path**, **Screen** (picker filter Components),
  **Open Screen Source File**, **Route Parameters** chips (red `*` for path params, **Path**/**Query** tags, **Add Query Parameter**), **Screen Parameters**
  (drag a chip onto a screen parameter): `router_block_view.dart:442-515`, `go_route_node_view.dart:9-284`; chip context menu **Rename**/**Delete**:
  `router_context_menus.dart:6-35`.
- **Add Route** popup offers only **Route** ("A simple route that displays a single screen."); Shell Route / Stateful Shell Route entries are commented out:
  `router_context_menus.dart:37-92`. New route starts at path `/` with the home screen: `packages/core/lib/src/project/env_services/router_file_service.dart:265-305`.
- Delete confirmation **Remove Route** ("...This will also remove all of its child routes."): `router_editor_actions.dart:139-159`.
- Route Settings (screen Details): **Path** (hint `/<screen-name>`), **Route Parameters** (**Add Route Parameter** appends `/:param1`), **Param name**, **Link to parameter**,
  **Default value**, **Remove Route Parameter**: `packages/designer/lib/src/details/route_details.dart:13-223`; `packages/core/lib/src/project/env_services/go_router_routing_service.dart:215-298`.
  **Make home screen** / "This is the home screen": `route_details.dart:262-295`; sets `initialLocation`: `go_router_routing_service.dart:13-28`.
- Auto route for new screens: only the single-file template path calls `addRouteByWidget` (`packages/core/lib/src/file_system/actions/file_actions.dart:25-55`), so the page says "from the **Empty Page** template".
  Path = class name in hyphen-case: `packages/core/lib/src/utils.dart:81`.
- GoRouter node: inserted as `push('/path')` (`packages/core/lib/src/state_management/global_state_suggestions.dart:44-54`); **Type** list and fields:
  `packages/code/lib/src/customizations/go_router_field.dart:9-156`, labels derived from `packages/core/lib/src/interpreter/libraries/go_router_library.dart:4005-4120`.
- Navigator node: `packages/code/lib/src/customizations/navigator_field.dart:9-172` (**Type**, **to**, **result type**, **result**, note "To use named routes, use GoRouter navigation instead.");
  `pushAndRemoveUntil` predicate returns false (removes all): `navigator_field.dart:145-150`. **to** opens the widget picker on **Components**: `packages/core/lib/src/widgets/widget_picker.dart:21-38, 171-196`.
- Dragging a chip converts text to the target type (parse/tryParse, bool as `== 'true'`): `packages/core/lib/src/editors/router_editor/auto_type_parser.dart:28-122`, `go_route_node_view.dart:332-382`.
- Router problems (duplicate path, invalid path, no builder, initial route not found, no routes): `packages/core/lib/src/editors/router_editor/router_problems.dart:4-227`.
- Migration page **New Router System** (Navigator **Legacy** vs GoRouter **Recommended**, **Enable GoRouter**), **Confirm Action** ("This action cannot be undone. If you are using named routes you will need to update your navigation code accordingly."),
  **Migrating to New Router**: `packages/core/lib/src/editors/router_editor/router_migration_editor.dart:8-365`; comparison rows are the UI's own text.
- Play warning **Single Screen Preview** (screen without a route): `packages/designer/lib/src/play_mode/play_mode_warning.dart:38-52, 214-224`; with a route Play starts the router at that path:
  `packages/designer/lib/src/play_mode/play_mode.dart:260-275`.
Left out / assumptions:
- Shell Route, Stateful Shell Route and Branch nodes (the Router panel shows them if present in code but cannot add them in 3.12.5): not documented, listed here as coverage note.
- Route Settings **Default value** field: in `route_details.dart:197-200` it has no change handler, so I do not tell users to set it (designer-core research says "optionally set a Default value": likely inaccurate, please verify in the UI).
- Route Settings link button (**Link to parameter**) assigns the route value directly without a text-to-type conversion (`go_router_routing_service.dart:268-284`), so the page teaches the Router-panel drag instead (it converts types). Verify in the UI whether the link button also works for text params only.
- "`go` replaces the current screens", "`pushReplacement`/`replace` swap the current screen" are plain-words descriptions of the go_router methods, not Nowa-specific labels.
- Named GoRouter types: "The Router panel doesn't set route names" is by absence (`GoRouteNodeDetails` has no name field; `_buildGoRoute` sets only `path` and `builder`).
- "Navigator/GoRouter need the screen's context ... a global state's functions have no screen context": consistent with old docs and `canAccessContext` (`packages/core/lib/src/fields/block_field.dart:716-722`); behavior inside global states not run.
- The **Extra** field is mentioned in one sentence only; reading `extra` on the destination is not covered by the Router panel chips (open question, advanced).
- Page length: ~1,400 words (over the 1,200 guideline). The "Manage routes in the Router panel" and "Switch an older project" sections could move to a separate `logic/router.md` if the orchestrator wants to split; I stayed inside my batch's files.

## parameters.md

Research: `features-logic.md` "Params (screen/component parameters)", "Link <field> menu", "Events", "Reset to default / Set to null";
`features-designer-core.md` "Variables box...", "Component instances (use, set values, edit, Detach)", "Placeholder values on the board".
Code refs relied on (spot-checked):
- **Params** section (`+` creates `param`, String?, default `''`; lists final instance variables): `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:277-307`.
- Details fields **Name** / **Type** / **Default Value** / **Remove**: `packages/core/lib/src/widgets/code/variable_widgets.dart:309-465`, `packages/core/lib/src/panels/details/decl_details.dart:17-79`.
- **Create Param...** (class param when the field is not inside a non-override function; starts from the property's current constant value; links the field):
  `packages/core/lib/src/fields/field_link_menu.dart:131-215, 281-330` (`showFieldLinkMenu` decides function vs class at `:9-52`). Events: `build` is an override, so an event on a widget creates a class param.
- No **Set** for params (final variables are skipped): `packages/code/lib/src/fields/expression_statement_field.dart:17-23`.
- Placeholders on the board (`[name]` for empty strings, null, empty lists): `packages/core/lib/src/interpreter/mock.dart:75-100, 210-217, 244-289`.
- Per-field right-click **Reset to default** / **Set to null** (only nullable): `packages/core/lib/src/fields/block_field.dart:812-842`; nullable types from the picker: `packages/core/lib/src/fields/nowa_fields.dart:663-676`.
- Instance and board-item param fields in Details (`componentField`, `BFBaseWidget`): `packages/designer/lib/src/details/widget_details.dart:160-200, 247-290`, `packages/core/lib/src/fields/block_field.dart:744-765`.
  Board items are stored in `.board` JSON files (`packages/core/lib/src/file_system/board_file.dart:22-40`), hence "saved with the board ... your app doesn't use them".
Left out / assumptions:
- "Required / optional as the UI shows" (pages.md must-cover): the UI has no required marker for screen/component params. Params created in Nowa are nullable with a default, so all are optional; the only red `*` is on path-parameter chips in the Router panel (see navigation notes). I did not document code-written required params.
- The `[title]` placeholder sentence relies on the research + `mock.dart` (applies when the linked value is empty). Verify in the UI with a text linked to a fresh param.
- "Fill the variable from the param in an **InitState Function**": suggestion built from verified pieces (InitState Function, Set, params under LOCALS via `widget.<name>`, `packages/core/lib/src/interpreter/suggestion.dart:611-631`), not a step-by-step the research gives.
- Event + **Create Param...** ("let each use of the component decide what happens"): from research "Events" step 4; how the parent then attaches logic on the instance was not verified.
- Function (not class) params are covered by W5's functions page; only linked.

## global-state.md

Research: `features-logic.md` "Global states", "Global state variables and functions", "Using global states (and how the UI rebuilds)", "Notifier Builder wrapper";
`features-theme-assets.md` "Switch themes while the app runs (dark mode)" (+ `Create Theme Setup`, AppState).
Code refs relied on (spot-checked):
- **Add to library** menu (**New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, **Import Dart code...**): `lib/project/panels/files_panel/add_lib_menu.dart:11-165`;
  `+` tooltip **Add to library** on `lib`: `lib/project/panels/files_panel/files_list.dart:495-512`; bottom **Add** / **Import** button: `lib/project/panels/files_panel/files_panel.dart:200-232`.
  Global state created in `lib/globals` and attached right after: `add_lib_menu.dart:98-110`; `globalsDir`/`modelsDir`: `packages/core/lib/src/providers/project_provider.dart:376-382`.
- Dialog (title "New GlobalState", fields name / **Class name** / **Path**, **Cancel** / **Submit**): `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:84-130`, `file_name_text_field.dart:75-235`.
- Variables panel with nothing selected: **Globals**, per-state name with three-dots menu (**Open in new tab**, **Detach global state**), **Create global state** (file goes in `lib`), **Pick global state**
  ("Loading global states...", "No global states found"): `packages/core/lib/src/state_management/global_state_widgets.dart:8-184`, `global_state_menu.dart:6-43`.
- Attach/detach = add/remove a `ChangeNotifierProvider` (in `MultiProvider`) at the app root: `packages/core/lib/src/project/env_services/global_state_service.dart:15-96`.
- File editor for models/global states (left **View Code** + class list, middle **Variables**/**Functions**, right details or Circuit): `packages/core/lib/src/editors/dart_editor/dart_editor.dart:139-268`,
  `packages/core/lib/src/fields/class_editor.dart:10-79` (**Attach** note "This global state is not attached to the app."). Single click on a file = preview popup, double click opens: `lib/project/panels/files_panel/files_list.dart:334-406`.
- New variables in a global state are non-final (`calculateIsFinal` only true for classes with an auto constructor, i.e. models): `declaration_list_widgets.dart:329`, `packages/core/lib/src/interpreter/declaration_runtime.dart:285-310, 405-420`.
  **Is Final** / **Is Static** + tooltips: `packages/core/lib/src/widgets/code/variable_widgets.dart:341-403`.
- `notifyListeners` under LOCALS in global-state functions: `packages/core/lib/src/state_management/provider_blocks.dart:45-57`; GLOBALS lists attached global states only inside widget classes:
  `packages/core/lib/src/state_management/global_state_suggestions.dart:70-74`; `of(context, listen: false)` outside build: `packages/core/lib/src/state_management/provider_generator.dart:3-18`.
- **Notifier Builder** wrapper (**Add Wrapper**, field **Notifier**): `packages/core/lib/src/wrappers_to_add.dart:139-150`, `packages/core/lib/src/fields/data_field.dart:53-110`; rebuilds on notify: `packages/nowa_runtime/lib/src/widgets/notifier_builder.dart`.
- AppState template (`theme`, `changeTheme`, attached in `main.dart`, `MaterialApp.theme` reads it): `packages/core/lib/src/file_system/templates/common/app_state_template.dart:6-38`, `main_dart_template.dart:42-49`.
  `ThemeData` inputs show **Select theme** and a **THEMES** category (the project's global themes): `packages/core/lib/src/fields/basic_fields.dart:2045-2075`, `packages/core/lib/src/fields/block_field.dart:72`, `packages/core/lib/src/project/env_services/theme_service.dart:25`.
- Play warning "Unattached global states" + **Attach all**: `packages/designer/lib/src/play_mode/play_mode_warning.dart:75-98, 126-148`.
Left out / assumptions:
- The Variables panel **Globals** list shows `ClassVarList` with only final variables (`global_state_widgets.dart:60`, `declaration_list_widgets.dart:315,339`), while + creates non-final variables in global states: I do not claim variables are listed there (open question from research stays open). The page sends users to the file editor for variables and functions.
- The title of the dialog opened by **Create global state** reads "New Create global state" in code (`FileDialog` prefixes "New "); not quoted. The page only says to click **Create global state**, name it and submit (file goes in `lib`).
- main.dart preview → **Globals Options** → **Global Providers** (same Create/Pick actions): `packages/core/lib/src/file_system/widgets/previews/main_preview/globals_review_section.dart`: skipped (Files-panel preview, W9 territory).
- "Main file must be managed by Nowa to use global variables" (Globals panel when main.dart isn't managed by Nowa): not mentioned (edge case).
- Step 6 of "Add variables and functions" (variable → **+** → `add`, input from a param, then `notifyListeners`) follows the research's example flow; exact member labels (`add`, input label **Value**) are from the Dart `List.add` signature, not re-checked in the UI.
- Circuit "dot under a node" interaction wording is from research (Circuit section).
- The `changeTheme` flow: old doc says "Choose the desired theme (e.g. Dark Theme)"; code shows the **Select theme** button for ThemeData inputs. The first theme list may be named `lightTheme` / `darkTheme` (template); I wrote "such as `darkTheme`".
