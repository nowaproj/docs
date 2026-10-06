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
