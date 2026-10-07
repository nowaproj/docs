# W5 review: Add logic, part 1 (index, events, circuit, functions, expressions, popups, actions)

Verifier run against `/home/user/nowa-master` (v3.12.5). Pages are appended below as each one is finished.
Summary table at the end of the file is filled in when all seven pages are done (status: IN PROGRESS).

Pages done so far: index.md, events.md, circuit.md, functions.md, expressions.md, popups.md

## index.md (How logic works)

Front matter ok (title, description, sidebar_label, keywords). No H1 in body, headings sentence case, one admonition, no emoji, no `---` rules, no hype words. About 540 words.

| claim | verdict | code ref | note |
|---|---|---|---|
| Event (tap, long press, typing) starts logic; **On Pressed** | ok | `packages/core/lib/src/fields/button_fields.dart:160-163`, `form_fields.dart:70-93` | events are function properties |
| Steps are stacked in Circuit and run top to bottom | ok | `packages/code/lib/src/widgets/circuit_column.dart:41-70` (children laid out down the Y axis) | |
| Example: **On Pressed** adds one to `counter` and a Text linked to it shows the new number | fixed | `packages/core/lib/src/interpreter/suggestion.dart:616-618`, `packages/code/lib/src/models/expr_node.dart:86-91` | a screen variable only redraws after a **refresh** node (`setState`); sentence now says "and refreshes the screen" (same rule as `variables.md`) |
| Tip: **Agent** mode builds everything, **Design** mode builds "the look and flow without logic" | ok | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-39` ("Create/refine the look and flow without logic", "For everything, from design to functionality") | matches `docs/ai/modes.md` |
| Table definitions of Event, Function, Circuit, Variable, Param, Global state, Model, Expression, Action | ok | concept summaries, no UI labels | |
| 11 same-section links, `../code/code-mode.md`, `../ai/modes.md`, `../test/problems.md` | ok | `pages.md` rows (W5, W6, W9, W2, W7) | link text equals each target's `title:` |

## events.md (Respond to taps and other events)

Front matter ok. No H1, sentence-case headings, one admonition, no hype words, no emoji. About 840 words. Both capture placeholders well formed and requested in `captures/requests/W5.md`. Links ok: `circuit.md`, `variables.md`, `popups.md`, `functions.md`, `parameters.md`, `../test/instant-play.md` (title "Play your app on the board"), `../ai/chat.md` (title "Chat with Nowa AI").

| claim | verdict | code ref | note |
|---|---|---|---|
| **+** creates an empty function and opens Circuit; **Edit** (bolt) when the function exists | ok | `packages/core/lib/src/fields/nowa_fields.dart:793-825`, `basic_fields.dart:520-557` | `FuncExpr.fromType`, `Icons.bolt`, `openBlockInCircuit` |
| Circuit opens as a centered panel titled with the event name, closed with **×** | ok | `packages/core/lib/src/providers/panel_provider.dart:521-565`, `captures/ui-map/21-logic-editor.png` | close icon has no label |
| For a **Button**, **On Pressed** is in the **Button** section | fixed (scoped) | `captures/ui-map/21-logic-editor.png` (Details shows heading "Button" with Enabled, On Pressed) | verified for **Button** only; other widgets name the section after themselves |
| "A new button already has an empty function" so it reads **Edit** | fixed | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:206,216,227` | true for **Button** and **Icon Button** (`'onPressed': FuncExpr()`); **Floating Button** gets a hard-coded `() {}` instead. Now says "A new **Button** or **Icon Button**" |
| Orange top node shows event name and widget class (`onPressed` / `ElevatedButton`); **Params** | ok | `packages/code/lib/src/widgets/node_widgets.dart:150-230` (`kFuncColor` 0xFFFFC06C, `node.title`, parent class subtitle), `packages/code/lib/src/panels/circuit_details.dart:73-85` | **On Changed** gives `value`: `material_library.dart` `void Function(String value)? onChanged` |
| Dot under the node grows into **+**; click opens **All nodes for this circuit** | ok | `node_widgets.dart:236-262`, `packages/core/lib/src/fields/link_menu.dart:61` | |
| **Show snackbar** under **GLOBALS**, found by searching `snack`; starts as Text "Hello World" | ok | `packages/core/lib/src/state_management/global_state_suggestions.dart:6-21,65`, `link_menu.dart:85-88` (search is a substring match on the name) | |
| Brush next to **Content** edits the text | ok | `packages/core/lib/src/fields/nowa_fields.dart:484-500` (brush, tooltip `Edit <widget>`, opens a popup), `expression_details.dart:143-190` | |
| **Play** in the screen's title bar; snackbar shows at the bottom | ok (partly unverified) | `packages/designer/lib/src/panels/canvas_titles.dart:247` (tooltip 'Play') | the snackbar appearing in Instant Play was not run; the old docs say the same ("Play the screen to test the Snackbar") |
| Button events **On Pressed**, **On Long Press**, **On Hover** | fixed (scoped) | `packages/core/lib/src/fields/button_fields.dart:160-163` | only `ElevatedButton` and `IconButton` use `ButtonActions` (`block_field.dart:81,83`); now "**Button** and **Icon Button**" |
| Text field events (**On Tap**, **On Changed**, **On Editing Complete**, **On Submitted** / **On Field Submitted**) | ok | `packages/core/lib/src/fields/form_fields.dart:70-93`, label rule `utils.dart:77-79` | |
| **Add Wrapper** > **Gesture Detector** / **Ink Well**; **Dismissible**, **Refresh Indicator** have events | ok | `packages/designer/lib/src/details/widget_details.dart:66-109,197`, `packages/core/lib/src/wrappers_to_add.dart:33-36,94,170-176` | `onDismissed` and `onRefresh` exist in `material_library.dart` |
| **Enabled** switch, error text, **Compute**, detach icon | fixed (scoped) | `button_fields.dart:98-240` (error at `:105`, detach tooltip `detach` at `:187`, **Compute** at `:228`) | only **Button** / **Icon Button** have it; text now says so. `_onLink` accepts only a variable reference, "true or false variable" is right |
| "Use a function you already made": event name > **LOCALS** > pick a function | fixed | `packages/core/lib/src/fields/link_menu.dart:90-93,176` (`_typeFilter` drops every suggestion whose type is void when the field has an expected type), `packages/core/lib/src/interpreter/suggestion.dart:109-118` (a function suggestion's type is its return type) | void functions never appear in an event's link menu. Replaced with the path the code supports: add a node in Circuit, **LOCALS** > the function |
| **Create Param...** adds a param and links the event | fixed (wording) | `packages/core/lib/src/fields/field_link_menu.dart:188-228,368-371` | in a widget's `build` the param is a class param, not a "function parameter"; reworded to "a param ... and links the event to it". "each place can set its own logic" stays inferred (function-typed param renders as **+** / **Edit**) |
| **Reset to default** / **Set to null** (nullable only) / **Detach...** | ok | `packages/core/lib/src/fields/block_field.dart:826-832`, `field_link_menu.dart:292-309,358-363` | |
| Tip: select the button, ask in **Agent** mode | ok | `docs/ai/context.md`, `mode_selector.dart:36-66` | |

## circuit.md (Build logic in Circuit)

Front matter ok. No H1, sentence-case headings, one admonition, no hype words, no emoji. Anchors present: `{#add-a-node}`, `{#store-result}`, `{#future-options}`, `{#hot-fix}` (all used by `functions.md`, `popups.md`, `actions.md`). Capture placeholders well formed (`logic-circuit-1`, `logic-circuit-2`, both in `captures/requests/W5.md`). Links ok: `events.md`, `functions.md`, `global-state.md`, `actions.md`, `variables.md`, `navigation.md`, `expressions.md#custom-expression` (anchor to be confirmed on `expressions.md`, see that section), `popups.md`, `../account/project-settings.md` (W11 row), `../ai/modes.md`.
Length: cut from about 1,480 to about 1,390 words (dropped the five-item table in favor of one sentence, the "follow-up to a node" bullet, two sentences repeated from `events.md`, the example prompt in the tip). Still over the ~1,200 guide because it carries 13 must-cover items; a split would need a new row in `pages.md` (see open issues).

| claim | verdict | code ref | note |
|---|---|---|---|
| Nodes stack top to bottom; orange node at the top is the function; **If** / **Try** branch | ok | `packages/code/lib/src/widgets/circuit_column.dart:41-70`, `node_widgets.dart:150-230` (`kFuncColor`), `models/if_node.dart`, `models/try_node.dart` | |
| Open Circuit: event button (**+** / **Edit**), function via **Variables** panel > **Edit** in **Details** | ok | `packages/core/lib/src/panels/details/decl_details.dart:53-58` (**Edit**, red **Remove**), `core_hooks.dart:51` | |
| **Open in Circuit** from a property label (linked function, computed value, event function) | ok | `packages/core/lib/src/fields/field_link_menu.dart:380-397`, `block_field.dart:664-672` (`func`) | |
| "click a dialog's **Builder** field and choose **Edit in circuit**" | fixed | `packages/core/lib/src/fields/basic_fields.dart:448-470,520-557` | the menu (**Pick Widget** / **Edit in circuit**, lowercase c) opens from the widget button next to **Builder**, not from the label (the label opens the link menu). Reworded |
| "A follow-up to a node: click **+** next to **onValue** / **onError**" | removed | `packages/code/lib/src/fields/future_options.dart:43-77` | true, but it duplicates the Future Options section; cut for length |
| Floating panel, drag by title bar, close with **×** | ok | `packages/core/lib/src/providers/panel_provider.dart:521-565` | "Changes apply as you make them" removed (not shown by code) |
| In a global state or model file, Circuit shows in the file's right-hand column | ok (reworded) | `packages/core/lib/src/editors/dart_editor/dart_editor.dart:139-260` (`DefaultDartEditor`: file outline, class outline, then Circuit for the selected function); block views exist only for widget classes, the router file and Firebase (`designer_plugin.dart:35`, `plugin.dart:90`, `firebase_plugin.dart:56-60`) | now says "the function you select shows in Circuit in the file's right-hand column" |
| Add a node: dot > **+** > **All nodes for this circuit**; item inserted and selected; **Details** inside Circuit | ok | `node_widgets.dart:232-262`, `link_menu.dart:61`, `circuit_workspace.dart:66-80` | selection after insert: `node_widgets.dart:232-250` |
| Five top items **Add Return**, **Add If statement**, **Add Try statement**, **Create Local Variable**, **Add Custom Expression** | ok | `packages/code/lib/src/widgets/add_statement_menu.dart:62,70,78,88,105` | exact labels. The old two-column table is now one sentence |
| Categories start closed, open while searching; headers upper-case | ok | `link_menu.dart:290-331` (`_isOpen = widget.searching`, `name.toUpperCase()`) | |
| Project category "named after your package" | fixed | `packages/core/lib/src/interpreter/library.dart:43,218` (uri `package:<name>`), `suggestion_service.dart:9-29` | header reads `PACKAGE:<NAME>`, e.g. `PACKAGE:MY_APP`. It lists only top-level functions and classes with public statics or a singleton (`suggestion.dart:636-662`), and is hidden when empty. Row now says so |
| Library categories **DART:CORE**, **MATERIAL**, **SERVICES**, **NOWA_RUNTIME**; a package you add brings its own | ok | `library.dart:43` (name = last uri segment without `.dart`), `suggestion_service.dart:9-29` (every loaded library) | |
| **OPERATORS**, **LOCALS** (+ **refresh**), **GLOBALS** (**Navigator**, **GoRouter**, **checkPlatform**, **Media Query**, **Show snackbar**, global states), **SHARED PREFERENCES** (**clear**, **remove key**, **set**, **get**), **GENERAL** (**Create...**, **parse**), **EXPRESSIONS** (**Conditional**, **ifNull**) | ok | `suggestion.dart:463-524,526-566,588-633`, `global_state_suggestions.dart:26-67` | in Circuit the expected type is null, so **Math** / **Logical** are not offered; only **Conditional** and **ifNull** |
| "Connected integrations add categories too, such as **FIREBASE**" | fixed | `packages/data/lib/src/firebase/firebase_manager.dart:68,113,180`, `firebase_plugin.dart:121-130` | Firebase is the only integration that registers an extra category. Now "Connecting Firebase adds a **FIREBASE** category" |
| Click a class (e.g. `HapticFeedback`) to see its functions | ok | `link_menu.dart:129-141`, `suggestion.dart:695-722` | |
| Select with click, deselect on empty canvas; right-click **Remove**, **Move up**, **Move down** | ok | `circuit_board_controller.dart:5-12`, `node_widgets.dart:86-93` | no **Remove** / move items on the top node |
| Shortcuts: <kbd>↑</kbd>/<kbd>↓</kbd>, <kbd>Shift</kbd>+<kbd>↑</kbd>/<kbd>↓</kbd>, <kbd>Backspace</kbd> (+ <kbd>Delete</kbd> on Windows/Linux), undo/redo | ok | `circuit_workspace.dart:94-99`, `packages/core/lib/src/inputs.dart:11-13`, `lib/setup_general_actions.dart:26-28,41` | redo is also Ctrl/Cmd+Y (not listed; fine) |
| Node moves only inside its branch; no copy/paste; removal off while typing; red error icon with tooltip | ok | `statement_node.dart:37-58`, `circuit_actions.dart:7-20,77-101` (copy/paste commented out), `node_widgets.dart:108-127` | |
| Function node **Name**, **Return Type** (`void` allowed), **Params** (+ on hover), **Edit parameter** fields **Name**, **Type**, **Default Value**, **Remove** | ok | `circuit_details.dart:55-93`, `variable_widgets.dart:416-500`, `declaration_list_widgets.dart:9-40,534-573`, `decl_details.dart:12-79` | event functions: **Return Type** read-only + **Params** list (`circuit_details.dart:73-85`) |
| **Store result**: **New Variable** (`var1`, `var2`), **Pick Variable** + **Variable**, **none**; hidden for void | ok | `store_result_field.dart:98-131`, `file_system/naming.dart:34-52,125-150` (`var` is a keyword, so the name becomes `var1`) | |
| **Future Options**: **await** (clock badge, async), **onValue** (receives `value`), **onError** (prints error), **+** creates both, await-only view | ok | `future_options.dart:6-111`, `expr_node.dart:68-92`, `declaration_runtime.dart:1484-1492` | |
| **Add If statement**: **Condition** starts as a switch that is on; **True** / **False** branches; steps after run for both | ok | `add_statement_menu.dart:70-75`, `statement_fields.dart:41-49`, `basic_fields.dart:378-398` (`SwitchBoolField`), `if_node.dart:34-67` | Condition options text trimmed: **Custom Expression...** and **Compute...** are left to `expressions.md`; **checkPlatform** is under **GLOBALS** |
| **Add Try statement**: steps under the node, **On Error** branch, **Error name** default `error`, one catch-all branch | ok | `try_node.dart:28-66`, `statement_fields.dart:51-66`, `block_tree.dart:1900-1910` | |
| **Add Return** / **Return** / **Returning void**; nothing after a Return | ok | `add_statement_menu.dart:33-40,60-67`, `statement_fields.dart:27-39`, `circuit_node.dart:190-196` (`ReturnNode.setupAfterNode` disabled) | |
| **Create Local Variable**: `var1`, **Expression:**, **Name**, **Type**, **Is Final** | ok | `add_statement_menu.dart:86-102`, `statement_fields.dart:68-89`, `variable_widgets.dart:309-353,416-465` | |
| **Add Custom Expression** opens a formula dialog | ok | `add_statement_menu.dart:103-121` | link anchor `expressions.md#custom-expression` checked in the expressions section |
| While: display only, **True** branch, **Condition**, edited like an If; `forEach` | ok | `while_node.dart:33-52`, `statement_fields.dart:13,41-49`, `dart_core_library_custom.dart:495` | |
| **Dependencies**, **Permissions:**, **Packages:**, check marks, **Hot Fix**, section title opens project settings | ok | `packages/core/lib/src/fields/expression_builder/expression_dependencies.dart:8-174`, `declaration_info/function_info.dart:62-75` (`showMediaPicker`) | |
| Tip: **Agent** mode | ok | `mode_selector.dart:36-66` | example prompt removed for length |

## functions.md (Create functions)

Front matter ok. No H1, sentence-case headings, one admonition, no hype words, no emoji. About 710 words. Anchor `{#lifecycle}` present (linked from `actions.md`). Capture `logic-functions-1` well formed and requested. Links ok: `variables.md`, `circuit.md` (+ `#store-result`, `#future-options`), `expressions.md`, `events.md`, `global-state.md`, `parameters.md`, `../ai/index.md` (title "How Nowa AI works").

| claim | verdict | code ref | note |
|---|---|---|---|
| **Functions** list in the **Variables** panel; hover **+**; a menu opens only while `initState` or `dispose` is missing, with **Add Function**, **InitState Function**, **Dispose Function** | ok | `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:371-475`, `packages/designer/lib/src/panels/variables_panel.dart:76`, `declaration_list_widgets.dart:9-40` (+ shown on hover) | exact labels; when both overrides exist **+** adds a function directly |
| New function is named `func` and goes into rename mode; `void` by default | ok | `declaration_list_widgets.dart:409,478-495` (`generateSymbolName('func')`, `setRenaming`) | |
| Step 4 "In **Details**, choose a **Return Type**" | fixed | `declaration_list_widgets.dart:108-115` (`onAdd` selects the new item only on the direct path; `createDefaultFunction` does not select) | added "Select the function." so the step works on both paths |
| **Details** shows **Name**, **Return Type**, **Edit**, **Remove** | ok | `packages/core/lib/src/panels/details/decl_details.dart:12-79`, `variable_widgets.dart:467-500` | |
| Type a name and press <kbd>Enter</kbd>; same rules as variables; double-click renames | ok | `variable_widgets.dart:41,163-200` (`DeclTileRename`, `onEditingComplete`), `file_system/naming.dart:34-60` | |
| Celsius example: **Params** **+** gives `param`; **Name**, **Type**, **Return Type** | ok | `declaration_list_widgets.dart:534-573`, `circuit_details.dart:55-93`, `variable_widgets.dart:416-465` | not run end to end |
| Step 5: **Return** label > **Custom Expression...**, type, <kbd>Enter</kbd>, back arrow | ok | `statement_fields.dart:27-39`, `field_link_menu.dart:353`, `packages/core/lib/src/fields/expression_builder/expression_builder_popup.dart:168,231-262` (`onEditingComplete` evaluates; header back arrow at `:168`), `expression_builder_provider.dart:44,201-216` | the dialog opens in text mode with the current expression |
| Calling a function: dot > **LOCALS** > function; parameters in **Details**; **Store result**; hover name > open | fixed (wording) | `packages/core/lib/src/interpreter/suggestion.dart:588-633` (functions listed, `build`/`context`/`widget` skipped), `packages/core/lib/src/fields/expression_builder/expression_details.dart:108-142` (`DeclHeader`: icon button, tooltip `Open`) | "click **Open**" made it sound like a text label; now "click the open icon". Turned the two bullets into four steps |
| "**As an event**: click the event's name, open **LOCALS** and pick the function" | removed | `packages/core/lib/src/fields/link_menu.dart:90-93,176`, `suggestion.dart:109-118` | the event's link menu hides every suggestion of type void, and a void function's type is `void`, so the new function would not be listed. The event case is now covered by step 1 (run it from the event's circuit) |
| Functions are available only inside their screen or component | ok | `suggestion.dart:588-633` | LOCALS lists the current class only |
| **InitState Function** / **Dispose Function**: one node named `initState` / `dispose`; **Return Type** locked | ok | `declaration_list_widgets.dart:459-476`, `packages/code/lib/src/providers/expr_helper.dart:8-26`, `variable_widgets.dart:467-500` (`isOverride` locks the type) | |
| "Keep it as the first step and add your own steps below it" | fixed | `declaration_list_widgets.dart:459-476`, `circuit_node.dart:RootNode` (the dot under the top node inserts at position 0) | position advice came from the old docs, not the code, and it is wrong for `dispose` (Flutter wants `super.dispose()` last). Now "keep it and add your own steps above or below it" |
| **await** makes the function async; **Return Type** becomes `Future` and back | ok | `declaration_runtime.dart:1484-1492`, `future_options.dart:10-32` | |
| Rename, change, remove; references dialog before removing | ok | `variable_widgets.dart:34,41`, `packages/core/lib/src/actions/block_actions.dart:57-85`, `packages/core/lib/src/widgets/declaration_references_dialog.dart:7-98` | dialog shows only when something references it |
| Tip: **Agent** mode prompt | ok | `mode_selector.dart:36-66` | |

## expressions.md (Expressions and conditions)

Front matter ok. No H1, sentence-case headings, one admonition, no hype words, no emoji. About 1,140 words (just under the guide). All anchors present and used elsewhere: `{#link-menu}`, `{#dollar}`, `{#plus}`, `{#conditional}`, `{#operators}`, `{#custom-expression}`, `{#compute}`, `{#visibility}` (linked from `design/properties.md`, `design/responsive.md`, `code/custom-code.md`, `reference/wrappers.md`, `reference/widgets/*`, `circuit.md`, `functions.md`, `actions.md`). Capture `logic-expressions-1` well formed and requested. Links ok: `variables.md`, `global-state.md`, `parameters.md`, `circuit.md`, `actions.md`, `../reference/wrappers.md` (title "Wrappers"), `../design/properties.md` (title "Change widget properties"), `../ai/chat.md`.

| claim | verdict | code ref | note |
|---|---|---|---|
| Clicking a label opens the link menu titled **Link** + property name (**Link Text**) | fixed (wording) | `packages/core/lib/src/fields/block_field.dart:1008-1018` (`canLink` needs the field to be enabled and linking allowed), `field_link_menu.dart:310-322` | "Every property ... has a label you can click" was too broad; some fields show "Field is not enabled". Reworded |
| Outside Circuit the menu has **LOCALS**, **GLOBALS**, **EXPRESSIONS** | ok | `packages/core/lib/src/interpreter/suggestion.dart:463-475` | |
| "...plus categories from connected integrations" | removed | `suggestion.dart:471-472` (`showOnlyInCircuit` filter), `firebase_plugin.dart:130` (`FirebaseCategory.showOnlyInCircuit => true`) | the only extra category in 3.12.5 is Firebase and it is Circuit-only |
| In Circuit a node's own fields (If **Condition**, **Return**, **Expression:**) show every add-node category incl. **OPERATORS** | ok | `field_link_menu.dart:341` (`showGlobals: field.parent is BlockStatement`), `block_tree.dart:878,1011,1099,1725,2909` | |
| **GLOBALS** has global states, **checkPlatform**, **Media Query** | ok | `packages/core/lib/src/state_management/global_state_suggestions.dart:26-67` | |
| **EXPRESSIONS**: **Conditional**, **Math** (not bool) or **Logical** (bool), **ifNull** | ok | `suggestion.dart:526-566` | |
| Menu items **Custom Expression...**, **Detach...**, **Create Param...**, **Create Variable...**, **Compute...**, **Edit**, **Open in Circuit** | ok | `field_link_menu.dart:352-398` | exact labels; **Create Param...** / **Create Variable...** / **Compute...** only at the top level of the menu |
| **Detach...** "puts the current value in its place" | fixed | `block_field.dart:703-714` (`replace()`: the value if it fits the type, else the default for the type) | now "the current value, or a default" |
| **Create Param...** function param inside a function, else a class param | ok | `field_link_menu.dart:188-238` | not in an override such as `build` (`field_link_menu.dart:21-24`) |
| **Create Variable...** "starting with the property's current value" | fixed | `field_link_menu.dart:241-266,252-263` (`_findInitializer`: copies the value only when it is a constant expression, else the type's default) | reworded to "if that's a fixed value"; the variable is non-final and lives in the state class |
| **Compute...** creates `create<Label>` (e.g. `createText`) and opens it | ok | `field_link_menu.dart:268-285` | |
| "Build your steps and end with **Add Return**" | fixed | `field_link_menu.dart:271-279` (the new function already contains `ReturnStatement(<current value>)`); `circuit_node.dart:190-196` (no dot after a Return) | you cannot add after the existing Return. Now: steps go above it (dot under the top node) and the **Return** value is set to the result |
| **Edit** opens the variable settings popup | ok | `field_link_menu.dart:287-291,404-416`, `variable_widgets.dart:229-269` (popup "Edit <name>") | |
| Picking another type shows its members (e.g. `toString`) | ok | `link_menu.dart:10-16,138-157`, `field_link_menu.dart:167-186` | |
| `$` in text opens a menu and inserts `${name}` | ok | `packages/core/lib/src/fields/basic_fields.dart:100-115`, `interpolated_text_field.dart:41-90` | the typed `$` stays and `{name}` is inserted after it; menu title "Link text" |
| **+** after a linked value; **Get item**, first item 0 | ok | `reference_field.dart:50-76`, `suggestion.dart:45-82` | |
| **Conditional Expression** popup: **condition**, **result type**, **then**, **else**, **Switch**; property shows **Edit condition** | ok | `expression_details.dart:192-247`, `expression_field.dart:60-75` | **result type** also resets **then** and **else** to defaults; now stated |
| Math / Logical popups: **Operator**, **Type**, **Left side**, **Right side**; **Type** change resets both sides; ifNull: **Value**, **If null** | ok | `expression_details.dart:249-326` | popup titles are "Math Expression", "Logic Expression", "If Null Expression" (not quoted on the page) |
| Operator groups table | ok | `block_tree.dart:2348-2420` (`isMath`, `isLogical`, `isNullable`) | bitwise operators exist in **OPERATORS** but not in the popups (left out) |
| Reopening a Math / Logical popup | fixed (added) | `expression_field.dart:77-95` (`BFBinaryExpr`: button shows the formula, or **Edit expr.** when empty) | one sentence added |
| Custom expression dialog: opens in text mode, **Enter expression...**, <kbd>Enter</kbd> / **Eval**, red errors, parts view (click selects, double-click replaces), **Search...**, **Detach**, text-mode button, check mark / help icon, back arrow | ok | `expression_builder_popup.dart:42-60,120,168,178-262,412,469`, `expression_builder_provider.dart:44,201-216` | |
| "It must be one expression, not a statement such as `if`" | ok | `expression_builder_provider.dart:201-216` (`loadExpression`) | parse error shows in red |
| **Visibility** wrapper: **Add Wrapper** > **Visibility**, **Visible**, **Replacement** | ok | `packages/core/lib/src/wrappers_to_add.dart:27-31`, `text_fields.dart:806-818` | |
| **Reset to default** / **Set to null** | ok | `block_field.dart:829-831` | |

## popups.md (Show dialogs, sheets, snackbars and pickers)

Front matter ok. No H1, sentence-case headings (H2 and one H3), one admonition, no hype words, no emoji. About 1,030 words. Capture `logic-popups-1` well formed and requested. The slugs `#show-a-dialog` and `#pick-photos-or-videos` (linked from `reference/widgets/*`) match the headings. Links ok: `circuit.md` (+ `#future-options`, `#hot-fix`), `navigation.md`, `actions.md`, `../integrations/supabase/storage.md` (title "Store files in Supabase"), `../ai/chat.md`. No text changes were needed.

| claim | verdict | code ref | note |
|---|---|---|---|
| Popups are steps in Circuit; **Context** is filled in | ok | `packages/core/lib/src/interpreter/block_utils.dart:214-232` (`generateRequiredBlocks`: `BuildContext` becomes `context`) | |
| **Show snackbar** under **GLOBALS**; **Content** brush; "Hello World"; **Background Color**, **Width**, **Elevation**, **Shape**; **Show advanced options** > **Action**, **Duration**, **Padding**, **Margin**, **On Visible** | ok | `global_state_suggestions.dart:6-21,65`, `expression_details.dart:134-190`, `block_field.dart:1317-1357`, `nowa_fields.dart:484-501` | |
| `$` inside the snackbar text | ok | `basic_fields.dart:100-115` | |
| **MATERIAL** > `showDialog`; starts as an **AlertDialog** with title "Hello World"; brush tooltip **Edit AlertDialog** | ok | `block_utils.dart:238-250`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:58` (`displayName` = class name), `nowa_fields.dart:466,492` | |
| **Builder** row: **Pick Widget**, **Edit in circuit** | ok | `basic_fields.dart:448-470` | |
| **Barrier Dismissible** (on), **Barrier Color**, **Use Safe Area** (on), **Use Root Navigator**, **Route Settings**, **Anchor Point**, **Traversal Edge Behavior** | ok | `packages/core/lib/src/interpreter/libraries/material_library_custom.dart:3149-3175` | Nowa inserts `useRootNavigator: false` (`block_utils.dart:250`). "Advanced" is the page's wording, not a UI label |
| Dialog answer: **Actions**, **Navigator** > **Type** `pop`, **result type**, **result**; **await** + **Store result** (null when dismissed) or **onValue** | ok | `packages/code/lib/src/customizations/navigator_field.dart:57-95,150-176`, `material_library.dart` (`showDialog` returns `Future<T?>`), `future_options.dart:6-111` | not run end to end |
| `showModalBottomSheet`: starts with centered text "Bottom Sheet Opened" and `minHeight` 400; options **Background Color**, **Is Scroll Controlled**, **Is Dismissible**, **Enable Drag**, **Show Drag Handle**, **Constraints**; returns an answer | ok | `block_utils.dart:263-275`, `material_library.dart:7166-7210` | labels are the parameter names split into words (`utils.dart:77-79`) |
| `showBottomSheet`: persistent sheet, content in **Builder** | ok (Flutter semantics) | `material_library.dart:7211-7240` | returns `PersistentBottomSheetController`, so no **await** result; the page does not promise one |
| `showDatePicker`: **First Date**, **Last Date**, **Initial Date** start as today; **Custom Expression...** with `DateTime(2030, 12, 31)` | ok | `block_utils.dart:252-262`, `material_library.dart:12453-12460`, `dart_core_library_custom.dart:51-130` | |
| **.format** dropdown with `DAY`, `WEEKDAY`, `YEAR_MONTH_DAY`, `HOUR_MINUTE`; **+** after the variable; **Pick Variable** | ok | `packages/code/lib/src/customizations/date_format_field.dart:6-90`, `dart_core_library_custom.dart:178-183` | |
| `showTimePicker`: **Initial Time** (hour, minute), `hour` / `minute`, `format`; `showDateRangePicker`: `start`, `end` | ok | `material_library.dart:70448-70458,70218-70265,12417-12460,12658-12662`, `block_utils.dart:196` (`TimeOfDay(hour: 0, minute: 0)` default) | |
| `showMediaPicker` under **NOWA_RUNTIME**; options **Multi Selection**, **Limit**, **Media Type**, **Source Type**, **Max Duration**, **Image Quality**, **Max Width**, **Max Height**, **Preferred Camera** and their visibility rules | ok | `expression_details.dart:483-524`, `nowa_runtime_library.dart:1595-1650`, `packages/nowa_runtime/lib/src/media_picker/media_picker.dart:4-177` | defaults `image`, `camera`, `rear`, multi off confirmed; **Choose Source** sheet with **Camera**, **Gallery**, **Cancel** confirmed |
| Result is a list, empty when nothing is picked | ok | `media_picker.dart:21-38` (`[?singleFile]`, `?? []`) | |
| **Dependencies** / **Hot Fix** for `showMediaPicker` | ok | `function_info.dart:62-75`, `expression_dependencies.dart:8-174` | |
| Show the first image: `first`, `readAsBytes`, **Bytes** tab | ok | `nowa_runtime_library_custom.dart:60`, `basic_fields.dart:910-925` (tabs **Network**, **Asset**, **Bytes**) | the **Bytes** tab only shows a label to link; the link is made from the label |
| Tip: **Agent** mode | ok | `mode_selector.dart:36-66` | |
