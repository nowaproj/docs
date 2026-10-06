# Features: Logic (actions, functions, variables, state and models)

Source: /home/user/nowa-master (v3.12.5). Researcher: features-logic research agent. 2026-10-06.

Reading notes for writers:
- The UI still calls the visual logic editor **Circuit** ("Open in Circuit", "Edit in circuit"). Use that name.
- In the add-node menu, category headers are shown in UPPERCASE (`packages/core/lib/src/fields/link_menu.dart:331`). This file writes them in uppercase too.
- Fields generated from a Flutter/Dart parameter are labelled with the parameter name split into words, first letter capitalised (`barrierDismissible` → "Barrier Dismissible") (`packages/core/lib/src/fields/block_field.dart:213-224`, `packages/core/lib/src/utils.dart:77-79`). Labels marked "(derived)" below come from that rule, not from a literal string.
- Nothing in this area is gated (no Beta / plan / platform / local-vs-cloud checks found in `packages/code`, the link menus, the expression builder, the Variables panel or the global-state code).

## Summary
- **Circuit**: the visual logic editor; a function is a top-to-bottom chain of nodes with If/Try branches. Opens as a floating panel (or inside the file editor for models and global states).
- **All nodes for this circuit** (add-node menu): searchable menu with **Add Return**, **Add If statement**, **Add Try statement**, **Create Local Variable**, **Add Custom Expression** and the node categories.
- **Node editing**: select a node to edit it in **Details**; right-click **Remove** / **Move up** / **Move down**; keyboard shortcuts; red error icon for problems.
- **Function node**: the top node; edit **Name**, **Return Type** and **Params** of the function.
- **Store result**: keep a node's result in **New Variable** or **Pick Variable** (or **none**).
- **Future Options**: **await**, **onValue**, **onError** for anything that returns a Future (pickers, dialogs, API calls, navigation).
- **Add If statement**: True/False branches with a **Condition**.
- **Add Try statement**: main line plus an **On Error** branch with an **Error name** variable.
- **Add Return**: returns a value (or nothing) from the function.
- **Create Local Variable**: a variable that lives only inside the function.
- **Add Custom Expression**: type any Dart expression as a node.
- **While** (display only): loops written in code show as a While node; there is no node to add a loop.
- **Navigator** (GLOBALS): push / pop / pushReplacement / pushAndRemoveUntil a screen, pass screen parameters, return a result.
- **GoRouter** (GLOBALS): path-based navigation used by new projects (go, push, pop, replace, named variants).
- **Show snackbar** (GLOBALS): show a SnackBar message.
- **checkPlatform** (GLOBALS): true/false checks like isWeb, isAndroid, isIOS.
- **Media Query** (GLOBALS): read screen size and other device data.
- **Set <variable>** and **refresh**: change a variable, then rebuild the screen.
- **Shared Preferences**: **clear**, **remove key**, **set**, **get** values stored on the device.
- **Create...** (GENERAL): create any object, e.g. a model, `Future.delayed`, `Timer.periodic`, `DateTime.now`.
- **Operators**: math, comparison and logic operators (plus, greaterThan, logicalAnd...).
- **Expressions** (Conditional, Math, Logical, ifNull): ternary, calculations and null fallbacks, in Circuit and in widget properties.
- **Library categories** (MATERIAL, DART:CORE, NOWA_RUNTIME, SERVICES, DART:ASYNC...): every Flutter/Dart/package function available as a node (dialogs, pickers, clipboard, haptics...).
- **showDialog / showModalBottomSheet / showBottomSheet** (MATERIAL): popups whose content is a widget you design.
- **showDatePicker / showTimePicker / showDateRangePicker** (MATERIAL) and **.format**: pick dates/times and format them.
- **showMediaPicker** (NOWA_RUNTIME): pick images/videos from gallery or camera.
- **openUrl** (NOWA_RUNTIME): open a link in the browser.
- **print** (DART:CORE): write a message to the logs.
- **Dependencies** / **Hot Fix**: shows packages and permissions an action needs and adds them in one click.
- **Variables** panel: lists a screen/component's **Params**, **Variables**, **Functions**, or the app's **Globals** when nothing is selected.
- **Variables** (screen/component): create, rename, type, default value, remove.
- **Select type**: the type picker (String, int, double, bool, Color, Widget, **As List**, **show more...**).
- **Params**: screen/component parameters and passing data between screens.
- **Functions**: **Add Function**, **InitState Function**, **Dispose Function**.
- **Events** (On Pressed, On Tap, On Changed...): function-type properties that start logic; **+** to create, **Edit** to open.
- **Link <field>** menu: link any property or input to variables, parameters, globals, expressions; **Custom Expression...**, **Detach...**, **Create Param...**, **Create Variable...**, **Compute...**, **Edit**, **Open in Circuit**.
- **Custom Expression...** (expression builder): write a Dart expression (**Enter expression...**, **Eval**) or build it step by step.
- **$ inside text** and **+ after a linked value**: insert variables into text; add `.length`, `.toString()` etc.
- **Compute...**: turn a property into a function that computes its value.
- **Visibility** wrapper: show or hide a widget from a condition.
- **Reset to default** / **Set to null**: right-click a property.
- **Global states**: app-wide state classes (**New Global State...**, **Create global state**, **Pick global state**, **Detach global state**, **Attach**); new projects include **AppState**.
- **Global state variables and functions**: edit them in the global state's file; call `notifyListeners` to update the UI.
- **Using global states**: read/call them from GLOBALS; widgets that read them rebuild automatically on `notifyListeners`.
- **Notifier Builder** wrapper: rebuild part of a screen when a notifier changes.
- **New Model...**: data model classes with automatic constructor, `fromJson` and `toJson`.
- **Generate Models From Json...**: paste JSON, pick fields, generate model classes.
- **Using models**: as types for variables/params, creating instances, lists of models.
- **Constants** (Custom Constants): project-wide String constants usable in logic (overlaps project settings).

## Features

### Circuit
- **What it does:** Nowa's visual logic editor. A function (an event such as On Pressed, a screen/component function, a global-state or model function, a router redirect) is shown as a vertical chain of nodes that run from top to bottom, with side branches for If and Try. Every edit changes the real Dart code of the function.
- **Where:** it opens from many places:
  - An event property in **Details** (e.g. **On Pressed**): click **+** (creates the function and opens Circuit) or, once it exists, the bolt button **Edit**.
  - **Variables** panel → **Functions** → select a function → **Details** → **Edit**.
  - A property's link menu → **Open in Circuit**; a widget-builder field (e.g. a dialog's **Builder**) → **Edit in circuit**.
  - **Future Options** → **onValue** / **onError** **+**.
  - The **Open** icon (hover) in the header of a function call's details jumps to that function.
  - Global search: clicking a function result opens it in Circuit (search panel is covered by the editor-shell research).
  - Router editor: **Edit Function** / redirect buttons (router editor is covered by the designer/editor research).
  - In a model or global-state file (double-click the file), selecting a function shows Circuit inside the right-hand panel instead of a floating panel.
- **Labels:** panel title = the function name, or the event name for inline event functions (`onPressed`), with the widget class as a subtitle on the top node; inside Circuit the side panel is titled **Details**.
- **How to use:**
  1. Open a function (see Where). The top node shows the function name.
  2. Hover the small dot under any node: it grows into a **+**. Click it to open the add-node menu (**All nodes for this circuit**).
  3. Pick a node; it is inserted at that point and selected.
  4. Configure the node in **Details** on the right.
  5. Close the panel with **×**. Changes are applied immediately (undoable).
- **Options:** none.
- **Limits and rules:** opens as an 800×600 panel centred on screen; it can be dragged by its title bar and closed with ×; no "open in tab" button for Circuit panels. If the function is changed in code so it can no longer be found, the panel shows "Function was modified in code and could not find it". Circuit can only draw expression statements, local variables, if/else, try/catch, while and return (see **While** and Open questions).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/basic_fields.dart:520-557` (openBlockInCircuit, 800×600, BFFunction), `packages/core/lib/src/fields/nowa_fields.dart:793-825` (**+** / **Edit**), `packages/core/lib/src/panels/details/decl_details.dart:53-59`, `packages/core/lib/src/fields/field_link_menu.dart:382-397`, `packages/core/lib/src/fields/basic_fields.dart:461-465`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:108-141`, `packages/core/lib/src/interpreter/block_utils.dart:56-70`, `lib/project/panels/search_panel.dart:638-650`, `packages/core/lib/src/editors/dart_editor/dart_editor.dart:200-207`, `packages/code/lib/src/circuit_plugin.dart:59-93`, `packages/code/lib/src/circuit_workspace.dart:45-79`, `packages/core/lib/src/providers/panel_provider.dart:50-90,520-562`, `packages/code/lib/src/models/block_to_circuit_visitor.dart:21-75`.
- **Old docs:** `docs/logic/intro-circuit.md` — partly outdated (opening via Edit and the top yellow node are still right; category names, delete shortcut and "Menu nodes" are wrong or missing).
- **Screenshot value:** high — Circuit panel open over the board with a function containing an If branch and the Details panel showing a selected node.

### All nodes for this circuit (add-node menu)
- **What it does:** lists everything you can add at that point of the function, grouped in collapsible categories, with a search box.
- **Where:** Circuit → click the dot/**+** under a node, at the start of an If/Try branch, or under the top node.
- **Labels:** headline **All nodes for this circuit**; search field; top items **Add Return**, **Add If statement**, **Add Try statement**, **Create Local Variable**, **Add Custom Expression**. Categories, in this order:
  1. One category per code library: first the project's own package (named after the project's Dart package; exact rendering is an open question), then **DART:CORE**, **MATERIAL**, **DART:CONVERT**, **DART:MATH**, **DART:TYPED_DATA**, **DART:UI**, **DART:IO**, **DART:ASYNC**, **SCHEDULER**, **FOUNDATION**, **GESTURES**, **SERVICES**, **CUPERTINO**, **RENDERING**, **NOWA**, then one per package the project uses. New projects include **NOWA_RUNTIME**, **PROVIDER**, **SHARED_PREFERENCES**, **DIO**, **GO_ROUTER**.
  2. **OPERATORS**
  3. **LOCALS** (variables, parameters, functions of the current screen/component/class, plus **refresh**)
  4. **GLOBALS** (**Navigator**, **GoRouter**, **checkPlatform**, **Media Query**, **Show snackbar**, then one entry per attached global state when you are inside a screen/component)
  5. **SHARED PREFERENCES** (**clear**, **remove key**, **set**, **get**)
  6. Integration categories, e.g. **FIREBASE** once Firebase is connected (see data research)
  7. **GENERAL** (**Create...**, **parse**, and **null** when the place accepts null)
  8. **EXPRESSIONS** (**Conditional**, **Math** or **Logical**, **ifNull**)
  Each item shows its name, `(...)`/`()` for functions with/without parameters, and a type icon (tooltip = type). Constructors read **Create** + type.
- **How to use:**
  1. Type in the search box to filter items (the five top items are filtered too); matching categories open automatically while searching.
  2. Or click a category header to expand it.
  3. Click an item to insert it. Picking a class opens a sub-menu of its static members (title = class name). **Create...** opens **Pick a constructor**.
- **Options:** none.
- **Limits and rules:** categories start collapsed. Library categories list only top-level functions and classes that have public static members or are singletons. The category list is dynamic: adding a pub.dev package adds its libraries as categories.
- **Gating:** integration categories appear only after the integration is connected (Firebase: `packages/data/lib/src/firebase/firebase_manager.dart:68,113,180`).
- **Code refs:** `packages/code/lib/src/widgets/add_statement_menu.dart:56-123`, `packages/core/lib/src/fields/link_menu.dart:58-207,277-420`, `packages/core/lib/src/interpreter/suggestion.dart:443-567,588-669`, `packages/core/lib/src/interpreter/services/suggestion_service.dart:6-29`, `packages/core/lib/src/interpreter/library.dart:43,275,307-326,494-502`, `packages/core/lib/src/interpreter/packages/dart_package.dart:91`, `packages/core/lib/src/state_management/global_state_suggestions.dart:23-75`.
- **Old docs:** `docs/logic/intro-circuit.md`, all `docs/logic/**` pages — partly outdated: the old "Nowa" category items (print, showDialog, showTimePicker, OpenUrl, Show Media Picker) now live in **DART:CORE**, **MATERIAL** and **NOWA_RUNTIME**; showDatePicker is in **MATERIAL**, not Globals; the menu is click-to-insert, not drag-and-drop; no page explains the categories.
- **Screenshot value:** high — add-node menu with the five top items and collapsed categories; a second capture of a search (e.g. "show") with categories expanded.

### Node editing (Details, Remove, Move up, Move down, shortcuts)
- **What it does:** select, configure, reorder and delete nodes; see problems.
- **Where:** Circuit canvas; right-click a node; keyboard while Circuit has focus.
- **Labels:** right-click menu **Remove**, **Move up**, **Move down** (the top function node has no menu items). Node titles: a function call shows the function name; a constructor shows **Create <Class>**; an assignment shows **Set <name>**; `setState` shows **refresh** (refresh icon); an awaited call gets a clock badge in its corner. Branch labels **True** / **False** (If, While) and **On Error** (Try).
- **How to use:**
  1. Click a node to select it; **Details** opens on the right. Click empty canvas to deselect.
  2. Right-click → **Move up** / **Move down**, or **Shift+↑** / **Shift+↓**.
  3. **↑** / **↓** selects the previous/next node.
  4. Delete with right-click → **Remove** or **Backspace** (the app-wide delete key, **Delete** on Windows/Linux, also works).
  5. Undo/redo with **Cmd/Ctrl+Z** and **Cmd/Ctrl+Shift+Z** (or **Cmd/Ctrl+Y**).
  6. A red error icon on a node lists its problems in a tooltip.
- **Options:** none.
- **Limits and rules:** removing is disabled while typing in a field. Move up/down only moves within the same branch. There is no copy/paste of nodes (the code for it is commented out).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/node_widgets.dart:73-130`, `packages/code/lib/src/circuit_workspace.dart:91-131`, `packages/code/lib/src/circuit_actions.dart:7-75`, `packages/code/lib/src/circuit_commands.dart:6-73`, `lib/setup_general_actions.dart:26-28,41`, `packages/core/lib/src/inputs.dart:11-12`, `packages/code/lib/src/providers/expr_helper.dart:10-28`, `packages/code/lib/src/models/expr_node.dart:60-92`, `packages/code/lib/src/models/if_node.dart:56-68`, `packages/code/lib/src/models/try_node.dart:61-66`.
- **Old docs:** `docs/logic/intro-circuit.md` (Managing Nodes) — partly outdated (Shift+arrows right; delete is Backspace/Delete depending on OS; no mention of ↑/↓ selection, undo or problem icons).
- **Screenshot value:** medium — right-click menu on a node; a node with the red error icon and tooltip.

### Function node (Name, Return Type, Params)
- **What it does:** the top node of every circuit represents the function itself; it shows the name and parameter chips and lets you edit the function's signature.
- **Where:** Circuit → click the top (yellow) node.
- **Labels:** for screen/component/global-state/model functions: **Name**, **Return Type**, **Params** (with **+** on hover). Clicking a parameter chip adds **Edit parameter** with **Name**, **Type**, **Default Value** and **Remove**. For inline event functions: **Return Type** is shown but cannot be changed, and **Params** lists the values the event provides (e.g. `value` for On Changed). Hovering the top node shows the return type when it is not void.
- **How to use:**
  1. Click the top node.
  2. Rename in **Name**; choose **Return Type** (the type picker includes **void**).
  3. Hover **Params** and click **+** to add a parameter (created as `param`, type String, nullable, default `''`); click its chip to rename/retype it.
  4. Use parameters inside the function from **LOCALS**.
- **Options:** Return Type; parameters (name, type, default value).
- **Limits and rules:** the return type of overridden lifecycle functions (initState, dispose) is locked. Turning on **await** anywhere in the function makes it async and wraps the return type in `Future` automatically. Names are validated (see **Variables**).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/node_widgets.dart:150-230`, `packages/code/lib/src/panels/circuit_details.dart:55-93`, `packages/core/lib/src/widgets/code/variable_widgets.dart:467-500`, `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:534-573`, `packages/core/lib/src/interpreter/declaration_runtime.dart:1484-1492`, `packages/code/lib/src/fields/future_options.dart:10-32`.
- **Old docs:** `docs/vars-params-functions/functions/create-local-function.mdx` — partly outdated (steps roughly right; labels differ: "Params", "Return Type").
- **Screenshot value:** medium — top node selected with Name / Return Type / Params in Details.

### Store result
- **What it does:** when a node returns something (a function result, a picker value, a calculation), keeps it in a new local variable or an existing variable.
- **Where:** Circuit → select a node that returns a value → **Details** → **Store result**.
- **Labels:** **Store result** dropdown: **none**, **New Variable**, **Pick Variable**; with **Pick Variable** a **Variable** field appears.
- **How to use:**
  1. Select the node.
  2. **Store result** → **New Variable**: the node becomes a local variable (named `var1`, `var2`...: `var` itself is a reserved word; its chip shows on the node). Rename it in Details.
  3. Or **Pick Variable**, then click the **Variable** label and choose the variable to overwrite.
  4. Use the stored value in later nodes from **LOCALS**.
- **Options:** none / New Variable / Pick Variable.
- **Limits and rules:** hidden for nodes that return nothing (void).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/fields/store_result_field.dart:5-131`, `packages/code/lib/src/fields/statement_fields.dart:67-89`.
- **Old docs:** `docs/logic/intro-circuit.md` ("Store result") — accurate but thin; `docs/logic/ui-popups/*.md` use it correctly.
- **Screenshot value:** medium — Store result dropdown open.

### Future Options (await, onValue, onError)
- **What it does:** for actions that finish later (pickers, dialogs, navigation that returns, API calls, delays), choose to wait for the result or to run follow-up logic when it arrives.
- **Where:** Circuit → select a node whose result is a Future → **Details** → **Future Options**.
- **Labels:** **Future Options**, **await** (switch), **onValue** (**+**), **onError** (**+**).
- **How to use:**
  1. Turn on **await** to pause the function until the result is ready; then use **Store result** to keep it. The node gets a clock badge and the function becomes async.
  2. Or click **+** next to **onValue**: Nowa adds both an onValue function (receives `value`) and an onError function (pre-filled with `print('error: ${error}')`) and opens the chosen one in a new Circuit panel.
- **Options:** await on/off; onValue; onError.
- **Limits and rules:** with await on, only the await switch is shown.
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/fields/future_options.dart:6-111`, `packages/code/lib/src/fields/expression_statement_field.dart:72-91`, `packages/code/lib/src/models/expr_node.dart:66-81`.
- **Old docs:** `docs/logic/ui-popups/dialog.md`, `date-picker.md`, `time-picker.md`, `common-functionalities/navigation.md` — mostly accurate (labels are lowercase **await**, **onValue**, **onError**; "OnValue"/"On Value" in old docs).
- **Screenshot value:** medium — Future Options with await on and the clock badge on the node.

### Add If statement
- **What it does:** runs one branch when a condition is true and another when it is false.
- **Where:** add-node menu → **Add If statement**.
- **Labels:** node **If Statement** (subtitle = condition summary); branches **True** (right) and **False** (left); Details field **Condition**.
- **How to use:**
  1. Insert it; the condition starts as a switch set to true.
  2. Click the **Condition** label to link it: a bool variable/parameter (**LOCALS**), a global value (**GLOBALS**), a function returning bool, an operator (**OPERATORS**, e.g. greaterThan), **checkPlatform**, **Custom Expression...** or **Compute...**.
  3. Add nodes with the dots in the True and False branches; nodes after the merge point run in both cases.
  4. Nest by adding another If inside a branch.
- **Options:** Condition.
- **Limits and rules:** the condition must be a bool. There is no "else if" or switch node; nest Ifs or use a Conditional expression.
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/add_statement_menu.dart:68-75`, `packages/code/lib/src/models/if_node.dart:13-146`, `packages/code/lib/src/fields/statement_fields.dart:41-49`.
- **Old docs:** `docs/logic/control-flow/if-statement.mdx` — mostly accurate (menu item is "Add If statement"; link menu items now end with "..."; there is no separate "Expression Builder" item, it is part of **Custom Expression...**).
- **Screenshot value:** high — If node with both branches populated and Condition linked to an operator.

### Add Try statement
- **What it does:** runs the main line and, if anything in it fails (e.g. no internet during an API call), switches to the **On Error** branch.
- **Where:** add-node menu → **Add Try statement**.
- **Labels:** node **Try**; branch label **On Error** (left); Details **Try Statement** and **Error name** (default `error`).
- **How to use:**
  1. Insert it.
  2. Add the risky nodes under it (the main line continues straight down).
  3. Add fallback nodes in the **On Error** branch (e.g. **Show snackbar** with the `error` value from **LOCALS**).
  4. Rename the error variable in **Error name** if needed.
- **Options:** Error name.
- **Limits and rules:** one error branch (catches any error).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/add_statement_menu.dart:76-85`, `packages/code/lib/src/models/try_node.dart:7-147`, `packages/code/lib/src/fields/statement_fields.dart:51-66`, `packages/core/lib/src/interpreter/block_tree.dart:1900-1907`.
- **Old docs:** `docs/logic/control-flow/try-catch.mdx` — mostly accurate (label "Error name"; main line is straight down, not "on the right"; Dialog/Bottom Sheet are in MATERIAL, not "Nowa").
- **Screenshot value:** medium — Try node with an API call and a snackbar in On Error.

### Add Return
- **What it does:** ends the function and, for functions with a return type, returns a value.
- **Where:** add-node menu → **Add Return**.
- **Labels:** node **Return** (light blue); Details field **Return**, or **Returning void** for void functions.
- **How to use:**
  1. Insert it at the end of the function or of a branch.
  2. Set or link the **Return** value (starts with a default for the return type).
- **Options:** Return value.
- **Limits and rules:** no node can be added after a Return in the same branch.
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/add_statement_menu.dart:21-66`, `packages/code/lib/src/models/circuit_node.dart:190-203`, `packages/code/lib/src/widgets/node_widgets.dart:132-148`, `packages/code/lib/src/fields/statement_fields.dart:27-39`.
- **Old docs:** `docs/logic/intro-circuit.md` (Returning Values) — accurate.
- **Screenshot value:** low.

### Create Local Variable
- **What it does:** creates a variable that exists only while the function runs, to hold an intermediate value.
- **Where:** add-node menu → **Create Local Variable**.
- **Labels:** Details: **Expression:** (click to link the value), the expression details, **Store result**, then **Name**, **Type**, **Is Final**.
- **How to use:**
  1. Insert it (created as `var1`, `var2`..., type String, nullable).
  2. Click **Expression:** and pick what it holds (a value, a function result...).
  3. Rename it and set **Type**.
  4. Use it in later nodes from **LOCALS**.
- **Options:** Name, Type, Is Final.
- **Limits and rules:** visible only inside the function. Same name rules as other variables.
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/add_statement_menu.dart:86-102`, `packages/code/lib/src/fields/statement_fields.dart:67-89`, `packages/code/lib/src/models/expr_node.dart:28-48`, `packages/core/lib/src/widgets/code/variable_widgets.dart:309-353`.
- **Old docs:** `docs/logic/intro-circuit.md` — accurate; What's New 1.x ("right-click inside Circuit and select Create Local Variable") is outdated: it is in the add-node menu.
- **Screenshot value:** low.

### Add Custom Expression
- **What it does:** adds a node from any Dart expression you type (e.g. `items.removeAt(0)`).
- **Where:** add-node menu → **Add Custom Expression**.
- **Labels:** opens the expression builder dialog (see **Custom Expression...**): **Enter expression...**, **Eval**.
- **How to use:**
  1. Insert it; the builder opens.
  2. Type the expression and press Enter or **Eval**. Errors are shown in red under the field.
  3. The node is created; its result can be stored with **Store result**.
- **Options:** none.
- **Limits and rules:** must be a valid expression (not a full statement like `if`).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/widgets/add_statement_menu.dart:103-118`, `packages/core/lib/src/fields/expression_builder/expression_builder_popup.dart:231-276`, `packages/core/lib/src/fields/expression_builder/expression_builder_provider.dart:201-217`.
- **Old docs:** none — missing.
- **Screenshot value:** medium — builder with a typed expression.

### While (loops)
- **What it does:** a `while` loop written in code (by you or the AI) appears as a **While** node with a **True** branch and a **Condition** field.
- **Where:** Circuit, only when the function already contains a while loop.
- **Labels:** node **While**, branch **True**, Details **Condition**.
- **How to use:** edit the condition and the loop body like an If.
- **Options:** Condition.
- **Limits and rules:** the add-node menu has no loop node (no while/for/for-each/switch/break/continue). Loops are written in code, or replaced by list functions (e.g. `forEach` via the **+** member menu or a custom expression).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/models/while_node.dart:11-124`, `packages/code/lib/src/models/block_to_circuit_visitor.dart:33-36`, `packages/code/lib/src/fields/statement_fields.dart:13`, `packages/code/lib/src/widgets/add_statement_menu.dart:56-123`.
- **Old docs:** none — missing.
- **Screenshot value:** low.

### Navigator
- **What it does:** moves between screens with Flutter's Navigator: open a screen, go back, replace, clear the stack; passes screen parameters and returns a result.
- **Where:** add-node menu → **GLOBALS** → **Navigator** (inserted as a push).
- **Labels:** node **Navigator** (subtitle e.g. `push: ProductPage` or `pop`); Details **Type** (`pop`, `push`, `pushReplacement`, `pushAndRemoveUntil`), **to** (screen picker), the brush button (tooltip **Edit <ScreenName>**); for `pop`: **result type** and **result**; note "To use named routes, use GoRouter navigation instead."
- **How to use:**
  1. Insert **Navigator**; pick **Type**.
  2. Click **to** and choose the screen (the widget picker opens on its **Components** filter).
  3. To pass data, click the brush next to the screen and fill its parameters (type a value or click a parameter name to link it).
  4. To return data: in the second screen add a Navigator with Type `pop`, choose **result type**, set **result**. In the first screen turn on **await** (and **Store result**) or use **onValue** on its push node.
- **Options:** Type; to; screen parameters; result type/result (pop).
- **Limits and rules:** needs a `context`, so use it inside screens/components (old docs warning; it is still listed in GLOBALS everywhere). `pushAndRemoveUntil` is created with a rule that removes all previous screens.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/state_management/global_state_suggestions.dart:31-43`, `packages/code/lib/src/customizations/navigator_field.dart:9-172`, `packages/core/lib/src/fields/nowa_fields.dart:409-525` (brush), `packages/core/lib/src/widgets/widget_picker.dart:131-175`.
- **Old docs:** `docs/logic/common-functionalities/navigation.md` — partly outdated (labels are lowercase `push`/`pushReplacement`/`to`/`result type`; GoRouter, which new projects use, is not covered).
- **3.13 (dev) changes:** none material.
- **Screenshot value:** high — Navigator node with Type and screen brush popup showing screen parameters.

### GoRouter
- **What it does:** navigates by route path (URL). New projects use GoRouter, so screens have paths and web apps get real links.
- **Where:** add-node menu → **GLOBALS** → **GoRouter** (inserted as `push('/path')`).
- **Labels:** node **GoRouter** (route icon, subtitle like `push: /home-page`); Details **Type** with `go`, `goNamed`, `push`, `pushNamed`, `pop`, `pushReplacement`, `pushReplacementNamed`, `replace`, `replaceNamed`; fields (derived) **Location** and **Extra** for go/push/pushReplacement/replace; **Name**, **Path Parameters**, **Query Parameters**, **Extra** (and **Fragment** for goNamed) for the named types; **result** for `pop`.
- **How to use:**
  1. Insert **GoRouter**, choose **Type**.
  2. Type the route path in **Location** (each new screen gets a route `/<screen-name>` in hyphen-case, e.g. `HomePage` → `/home-page`).
  3. Pass data with path/query parameters (defined per route in the router editor: **Route Parameters**, **Add Query Parameter**, then drag a parameter onto the screen's parameter under **Screen Parameters**) or with **Extra**.
  4. Use `pop` + **result** to go back with a value; **await** on the push to receive it.
- **Options:** Type; Location/Name; Path Parameters; Query Parameters; Extra; result.
- **Limits and rules:** Location is plain text (no route picker). Needs a project whose app uses GoRouter.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/state_management/global_state_suggestions.dart:44-54`, `packages/code/lib/src/customizations/go_router_field.dart:9-156`, `packages/core/lib/src/interpreter/libraries/go_router_library.dart:4005-4120` (method parameters), `packages/core/lib/src/project/env_services/go_router_routing_service.dart:13-27`, `packages/core/lib/src/file_system/actions/file_actions.dart:46-51`, `packages/core/lib/src/editors/router_editor/go_route_node_view.dart:9-46,147-195,316-381`.
- **Old docs:** none — missing (What's New mentions GoRouter for new projects).
- **Screenshot value:** high — GoRouter node with Type and Location; router editor route with Route Parameters chips.

### Show snackbar
- **What it does:** shows a short message bar at the bottom of the screen.
- **Where:** add-node menu → **GLOBALS** → **Show snackbar**.
- **Labels:** node `showSnackBar`; Details shows the SnackBar fields (derived) **Content** (a Text "Hello World" by default), **Background Color**, **Width**, **Elevation**, **Shape**, and **Show advanced options** → **Action**, **Duration**, **Padding**, **Margin**, **Elevation**, **On Visible**.
- **How to use:**
  1. Insert it.
  2. Click the brush next to the content Text to edit it; link the text to a variable, or type `$` to insert one (see **$ inside text**).
  3. Optionally **Store result** to keep the controller.
- **Options:** as listed.
- **Limits and rules:** needs a screen/component context.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/state_management/global_state_suggestions.dart:6-21,65`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:143-190`, `packages/core/lib/src/fields/block_field.dart:1319-1342`.
- **Old docs:** `docs/logic/ui-popups/snackbar.md` — mostly accurate (menu label "Show snackbar"; right-click items are "Reset to default"/"Set to null").
- **Screenshot value:** medium — Show snackbar details with advanced options open.

### checkPlatform
- **What it does:** a true/false value telling where the app runs, for platform-specific logic.
- **Where:** add-node menu → **GLOBALS** → **checkPlatform** (also available in any bool field's link menu inside Circuit, e.g. an If **Condition**).
- **Labels:** inserted as `NPlatform.isWeb`; click `isWeb` to choose another member: `isWeb`, `isMacOs`, `isWindows`, `isLinux`, `isAndroid`, `isIOS`, `isDesktop`, `currentPlatform` (and the platform constants `android`, `ios`, `web`, `macos`, `windows`, `linux`, `fuchsia`).
- **How to use:**
  1. In an If, click **Condition** → **GLOBALS** → **checkPlatform**.
  2. Click `isWeb` in the value and pick the check you need.
  3. Combine checks with **OPERATORS** → `logicalAnd`/`logicalOr`, or a custom expression like `NPlatform.isAndroid || NPlatform.isIOS`.
- **Options:** the member.
- **Limits and rules:** `isDesktop` = macOS, Windows or Linux. On web only `isWeb` is true (the native checks are all false).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/state_management/global_state_suggestions.dart:55-59`, `packages/nowa_runtime/lib/src/nowa_platform.dart:3-40`, `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:449-510`, `packages/core/lib/src/fields/reference_field.dart:95-121`.
- **Old docs:** `docs/logic/common-functionalities/platform-checking.md` — mostly accurate (member is `isMacOs`, not `isMacOS`; `currentPlatform` missing).
- **Screenshot value:** low.

### Media Query
- **What it does:** gives the device's screen data (size, padding, orientation...) for responsive logic.
- **Where:** add-node menu → **GLOBALS** → **Media Query** (inserts `MediaQuery.of(context)`; the node title reads `of`).
- **Labels:** **Media Query**.
- **How to use:** insert it (or pick it while linking a value), then click **+** after it to choose a member such as `size` → `width`; store the result or use it in a condition.
- **Options:** none.
- **Limits and rules:** needs a screen/component context.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/state_management/global_state_suggestions.dart:60-64`, `packages/code/lib/src/providers/expr_helper.dart:14-20`.
- **Old docs:** none — missing.
- **Screenshot value:** low.

### Set <variable> and refresh
- **What it does:** changes the value of a variable and redraws the screen so widgets linked to it update.
- **Where:** Circuit. Set: add-node menu → **LOCALS** (or a global state under **GLOBALS**) → pick the variable → **Details** → **Set <name>**. Refresh: add-node menu → **LOCALS** → **refresh**.
- **Labels:** button **Set <variable name>**; then the **Value** field; node title **Set <name>**. **refresh** (node with refresh icon; it is Flutter's `setState`).
- **How to use:**
  1. Add a node and pick the variable from **LOCALS**.
  2. Click **Set <name>** in Details; set or link **Value** (type it, link a variable, a function result or a **Custom Expression...**).
  3. Add **refresh** after it so the screen rebuilds with the new value.
  4. Alternative: on any node that returns a value, **Store result** → **Pick Variable**.
- **Options:** Value.
- **Limits and rules:** **Set** is offered only for non-final variables (screen parameters are final). Screen/component variables do not redraw by themselves: a **refresh** node is needed. Global-state variables update listening widgets through `notifyListeners` instead (see **Global state variables and functions**).
- **Gating:** none found.
- **Code refs:** `packages/code/lib/src/fields/expression_statement_field.dart:10-50,93-106`, `packages/core/lib/src/interpreter/suggestion.dart:607-633` (`refresh` display name), `packages/code/lib/src/models/expr_node.dart:83-92`, `packages/code/lib/src/fields/store_result_field.dart:48-64`.
- **Old docs:** `docs/vars-params-functions/create-variable.mdx` — partly outdated ("Set node" is now a **Set <name>** button; "Refresh UI node" is **refresh**).
- **Screenshot value:** high — Details with the **Set name** button and a refresh node below.

### Shared Preferences
- **What it does:** saves small values on the device (remembered between app launches), reads them, removes one or clears all.
- **Where:** add-node menu → **SHARED PREFERENCES**.
- **Labels:** items **clear**, **remove key**, **set**, **get**. For **set**: **Type** (`string`, `int`, `double`, `bool`, `stringList`), **Key**, **Value**. For **get**: **Type**, **Key**. For **remove key**: **Key** (derived).
- **How to use:**
  1. To save: insert **set**, choose **Type**, type a **Key**, set/link **Value**.
  2. To read: insert **get**, choose the same **Type** and **Key**, then **Store result** (the value is null if nothing was saved).
  3. To delete one value: **remove key** with its **Key**; to delete everything: **clear**.
- **Options:** Type, Key, Value.
- **Limits and rules:** uses the app-wide `sharedPrefs` object Nowa creates in `main.dart`. set/remove/clear return a Future (see **Future Options**).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/suggestion.dart:480-507`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:343-481`, `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:25-31`, `packages/core/lib/src/project/env_services/main_service.dart:79`.
- **Old docs:** none (only "Clear" mentioned in `docs/logic/intro-circuit.md`) — missing.
- **Screenshot value:** medium — set node details with Type dropdown.

### Create... (GENERAL)
- **What it does:** creates any object: a data model instance, a `Duration`, `DateTime.now()`, `Future.delayed(...)` (wait), `Timer.periodic(...)` (repeat), etc.
- **Where:** add-node menu (or a link menu inside Circuit) → **GENERAL** → **Create...**.
- **Labels:** **Create...** → headline **Pick a constructor** → list of classes → if the class has several constructors, a second list (the unnamed one shows as **Default**). The node reads **Create <Class>** and Details lists the constructor's inputs. GENERAL also has **parse** (`double.parse`) and **null** (only where null is allowed).
- **How to use:**
  1. Insert **Create...**, search the class (e.g. your model, `Future`, `Timer`, `DateTime`).
  2. Pick the constructor (e.g. `delayed`, `periodic`, `now`, `fromJson`).
  3. Fill its inputs in Details (a **Duration** input opens a **Duration** popup from its **Edit** button).
  4. Use **await** (for `Future.delayed`) or **Store result** (to keep the object, e.g. a Timer to cancel it in **Dispose Function**).
- **Options:** class and constructor; constructor inputs.
- **Limits and rules:** widget classes are not listed (widgets are added in the designer).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/suggestion.dart:168-194,509-516,725-757`, `packages/core/lib/src/fields/link_menu.dart:95-127,378-387`, `packages/code/lib/src/providers/expr_helper.dart:15-18`, `packages/core/lib/src/fields/basic_fields.dart:1898-1945` (Duration), `packages/core/lib/src/interpreter/libraries/dart_core_library.dart:2241-2300` (Future constructors incl. `delayed`), `packages/core/lib/src/interpreter/libraries/dart_async_library.dart:878-910` (Timer, `periodic`, `cancel`).
- **Old docs:** `docs/vars-params-functions/data-models.md` ("Create" node) — partly outdated (no mention of Pick a constructor; delays/timers undocumented).
- **Screenshot value:** medium — Pick a constructor list and a "Create Future" node with Duration.

### Operators
- **What it does:** inserts a calculation, comparison or logic expression with left and right values.
- **Where:** add-node menu, or the link menu of a field inside Circuit (e.g. If **Condition**) → **OPERATORS**.
- **Labels:** items `plus`, `minus`, `multiply`, `divide`, `intDivide`, `greaterThan`, `smallerThan`, `greaterThanOrEqual`, `smallerThanOrEqual`, `equal`, `notEqual`, `logicalOr`, `logicalAnd`, `ifNull`, `mod`, `bitwiseAnd`, `bitwiseOr`, `bitwiseXor`, `leftShift`, `rightShift`. Details: header **Math Expression** / **Logic Expression** / **If Null Expression**, **Operator**, **Type**, **Left side**, **Right side** (for ifNull: **Value**, **If null**).
- **How to use:**
  1. Pick an operator.
  2. Set **Type** (e.g. int), then type or link **Left side** and **Right side**.
  3. Switch operators later in **Operator** (only operators of the same group are listed).
- **Options:** Operator, Type, sides.
- **Limits and rules:** OPERATORS is only offered in Circuit menus (not in a widget property's link menu; there use **EXPRESSIONS** → **Math**/**Logical**).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/suggestion.dart:265-286,467-479,569-586`, `packages/core/lib/src/interpreter/block_tree.dart:2348-2420`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:249-326`, `packages/core/lib/src/fields/field_link_menu.dart:341`.
- **Old docs:** `docs/logic/control-flow/if-statement.mdx` (Operators) — accurate.
- **Screenshot value:** medium — greaterThanOrEqual details.

### Expressions (Conditional, Math, Logical, ifNull)
- **What it does:** builds formulas: a value chosen by a condition (`condition ? a : b`), a calculation, a logic combination, or a fallback when a value is null (`a ?? b`). Works in Circuit and in widget properties (e.g. a Text that shows "Online"/"Offline", a color that depends on a variable).
- **Where:** any link menu → **EXPRESSIONS**.
- **Labels:** **Conditional**, **Math** (when the field is not a bool), **Logical** (when it is a bool), **ifNull**. Conditional popup: **Conditional Expression**, **condition**, **result type**, **then**, **else**, **Switch** (swaps then/else). In a widget property, a conditional shows an **Edit condition** button; a math/logic expression shows its code text (or **Edit expr.**).
- **How to use:**
  1. Click a property label → **EXPRESSIONS** → **Conditional**.
  2. In the popup, link **condition** to a bool, set **then** and **else**.
  3. Reopen later with **Edit condition**.
- **Options:** as listed.
- **Limits and rules:** **Math** and **Logical** open the operator editor described in **Operators**.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/suggestion.dart:526-566`, `packages/core/lib/src/fields/field_link_menu.dart:167-173`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:192-247`, `packages/core/lib/src/fields/expression_builder/expression_field.dart:41-97`.
- **Old docs:** none (old pages point to an "Expressions section" that does not exist) — missing.
- **Screenshot value:** high — Conditional Expression popup on a Text property; the property showing "Edit condition".

### Library categories (MATERIAL, DART:CORE, NOWA_RUNTIME, SERVICES, DART:ASYNC...)
- **What it does:** exposes Flutter, Dart and package functions as nodes, so most Flutter actions are available without code.
- **Where:** add-node menu → the category named after the library.
- **Labels (useful items):**
  - **MATERIAL**: `showDialog`, `showAdaptiveDialog`, `showGeneralDialog`, `showModalBottomSheet`, `showBottomSheet`, `showDatePicker`, `showDateRangePicker`, `showTimePicker`, `showMenu`, `showSearch`, `showAboutDialog`, `showLicensePage`, `debugPrint`, plus classes with static members.
  - **DART:CORE**: `print`, `identical`, `identityHashCode`, plus classes with static members (e.g. `Future` → `wait`).
  - **DART:ASYNC**: `unawaited`, `scheduleMicrotask`, `runZoned`, `runZonedGuarded`, `Timer` (static `run`).
  - **SERVICES**: `Clipboard` (`setData`, `getData`, `hasStrings`), `HapticFeedback` (`vibrate`, `lightImpact`, `mediumImpact`, `heavyImpact`, `selectionClick`, `successNotification`, `warningNotification`, `errorNotification`), `SystemNavigator`, `SystemSound`.
  - **NOWA_RUNTIME**: `openUrl`, `showMediaPicker`, `kEmailValidationRegex`, `kPhoneValidationRegex`, `NPlatform`.
  - The project's own category: your top-level functions and classes with static members (e.g. `AppConstants`).
- **How to use:** search the function name in the add-node menu, insert it, fill its inputs in Details (labels derived from parameter names). Click a class (e.g. `HapticFeedback`) to see its static members.
- **Options:** per function.
- **Limits and rules:** **NOWA** holds internal leftovers (`usePathUrlStrategy`, `WidgetsBinding`); document nothing there. No built-in share action was found (no share package in Nowa's supported packages).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/services/suggestion_service.dart:9-29`, `packages/core/lib/src/interpreter/suggestion.dart:636-669`, `packages/core/lib/src/interpreter/libraries/material_library.dart:21-100`, `packages/core/lib/src/interpreter/libraries/dart_core_library.dart:16`, `packages/core/lib/src/interpreter/libraries/dart_async_library.dart:8,878`, `packages/core/lib/src/interpreter/libraries/services_library.dart:1208-1240,1306-1350,6381,6434`, `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:9-24`, `packages/core/lib/src/interpreter/library.dart:605-612`, `packages/core/lib/src/interpreter/packages/dart_package.dart:60-90`.
- **Old docs:** none — missing (old pages refer to a "Nowa" category).
- **Screenshot value:** medium — MATERIAL category expanded in the add-node menu.

### showDialog / showModalBottomSheet / showBottomSheet
- **What it does:** shows a popup dialog or a sheet sliding from the bottom; its content is a widget you design (e.g. an AlertDialog or your own component).
- **Where:** add-node menu → **MATERIAL** → `showDialog`, `showModalBottomSheet` or `showBottomSheet`.
- **Labels:** showDialog fields (derived): **Context** (filled automatically), **Builder**, **Barrier Dismissible** (default on), **Barrier Color**, **Barrier Label**, **Use Safe Area** (default on), **Use Root Navigator** (set off when inserted), **Route Settings**, **Anchor Point**, **Traversal Edge Behavior**. The **Builder** widget button opens **Pick Widget** / **Edit in circuit**; the brush (**Edit AlertDialog**) edits the content. showModalBottomSheet adds e.g. **Background Color**, **Is Scroll Controlled**, **Is Dismissible**, **Enable Drag**, **Show Drag Handle**, **Constraints**.
- **How to use:**
  1. Insert `showDialog`: the builder is an AlertDialog with title "Hello World".
  2. Click the brush to edit the AlertDialog (title, content, actions), or **Builder** → **Pick Widget** to use a component (designed on the board, e.g. from an AlertDialog turned into a component).
  3. To get a value back, put a button in the dialog whose event uses **Navigator** `pop` with a **result**; on the showDialog node use **await** + **Store result** or **onValue**.
  4. `showModalBottomSheet` starts with a Center/Text "Bottom Sheet Opened" and a minimum height of 400.
- **Options:** as listed (all Flutter parameters).
- **Limits and rules:** **Context** is filled with the screen's `context` automatically when one is available, so use these inside screens/components.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/block_utils.dart:238-279`, `packages/core/lib/src/interpreter/libraries/material_library_custom.dart:3149-3175`, `packages/core/lib/src/fields/basic_fields.dart:448-529,2023-2043`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:79-106`.
- **Old docs:** `docs/logic/ui-popups/dialog.md` — partly outdated (category is MATERIAL not "Nowa"; "Pick Widget" label; Traversal Edge Behavior missing). Bottom sheets: missing.
- **Screenshot value:** high — showDialog node with Builder and brush; edited AlertDialog popup.

### showDatePicker / showTimePicker / showDateRangePicker and .format
- **What it does:** lets the user pick a date, a time or a date range; `.format` turns a date into readable text.
- **Where:** add-node menu → **MATERIAL** → `showDatePicker`, `showTimePicker`, `showDateRangePicker`. `.format`: on a DateTime value, click **+** → `format`.
- **Labels:** showDatePicker (derived) **Context**, **Initial Date**, **First Date**, **Last Date**, **Current Date**, **Initial Entry Mode**, **Help Text**, **Cancel Text**, **Confirm Text**, **Locale**, **Barrier Dismissible**, **Use Root Navigator**...; showTimePicker **Initial Time** (Hour, Minute), **Cancel Text**, **Confirm Text**, **Help Text**, **Hour Label Text**, **Minute Label Text**, **Error Invalid Text**, **Initial Entry Mode**, **Orientation**...; `.format` shows **.format** with a dropdown of named formats: DAY, ABBR_WEEKDAY, WEEKDAY, ABBR_STANDALONE_MONTH, STANDALONE_MONTH, NUM_MONTH, NUM_MONTH_DAY, NUM_MONTH_WEEKDAY_DAY, ABBR_MONTH, ABBR_MONTH_DAY, ABBR_MONTH_WEEKDAY_DAY, MONTH, MONTH_DAY, MONTH_WEEKDAY_DAY, ABBR_QUARTER, QUARTER, YEAR, YEAR_NUM_MONTH, YEAR_NUM_MONTH_DAY, YEAR_NUM_MONTH_WEEKDAY_DAY, YEAR_ABBR_MONTH, YEAR_ABBR_MONTH_DAY, YEAR_ABBR_MONTH_WEEKDAY_DAY, YEAR_MONTH, YEAR_MONTH_DAY, YEAR_MONTH_WEEKDAY_DAY, YEAR_ABBR_QUARTER, YEAR_QUARTER, HOUR24, HOUR24_MINUTE, HOUR24_MINUTE_SECOND, HOUR, HOUR_MINUTE, HOUR_MINUTE_SECOND, MINUTE, SECOND, MINUTE_SECOND.
- **How to use:**
  1. Insert `showDatePicker`; set **First Date** and **Last Date** (all three dates start as "now").
  2. Turn on **await** and **Store result** → **New Variable** (DateTime; null if the user cancels), or use **onValue** (`value`).
  3. Add a node on that variable, click **+** → `format`, pick a format, **Store result** into a String variable linked to a Text, then **refresh**.
  4. Same for `showTimePicker` (returns a TimeOfDay; use its `format`, `hour`, `minute`...).
- **Options:** as listed.
- **Limits and rules:** results are nullable (`Future<DateTime?>`, `Future<TimeOfDay?>`, `Future<DateTimeRange?>`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/block_utils.dart:256-263`, `packages/code/lib/src/customizations/date_format_field.dart:6-90`, `packages/nowa_runtime/lib/src/extensions/date_time_format.dart:3-5`, `packages/core/lib/src/interpreter/libraries/material_library.dart` (showDatePicker/showTimePicker/showDateRangePicker declarations).
- **Old docs:** `docs/logic/ui-popups/date-picker.md`, `time-picker.md` — partly outdated (category MATERIAL, not Globals/Nowa; format list misses ABBR_MONTH_DAY, ABBR_MONTH_WEEKDAY_DAY, MONTH, MONTH_DAY, MONTH_WEEKDAY_DAY; return types are nullable).
- **Screenshot value:** high — the .format dropdown; showDatePicker with await + Store result.

### showMediaPicker
- **What it does:** lets the user pick one or more images/videos from the gallery or take one with the camera.
- **Where:** add-node menu → **NOWA_RUNTIME** → `showMediaPicker`.
- **Labels (derived):** **Context**, **Multi Selection** (default off), **Limit** (only with Multi Selection), **Media Type** (`image`, `video`, `both`; default image), **Source Type** (`gallery`, `camera`, `both`; default camera; shows a fixed "gallery" when Multi Selection is on or Media Type is both), **Max Duration** (video) or **Image Quality**, **Max Width**, **Max Height** (image/both), **Preferred Camera** (`rear`, `front`; hidden for multi/both). Then **Dependencies** with **Hot Fix**.
- **How to use:**
  1. Insert `showMediaPicker`, set the options.
  2. Click **Hot Fix** in **Dependencies** if packages/permissions are missing.
  3. Turn on **await**, **Store result** → **New Variable** (a list of `XFile`).
  4. To show the first image: add a node on the variable, **+** → `first` → `readAsBytes`, await, store it in a bytes variable linked to an Image (source bytes), then **refresh**.
- **Options:** as listed.
- **Limits and rules:** with Source Type `both`, the app shows a sheet **Choose Source** with **Camera**, **Gallery**, **Cancel**. Returns an empty list if nothing is picked.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/expression_builder/expression_details.dart:483-524`, `packages/nowa_runtime/lib/src/media_picker/media_picker.dart:4-177`, `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:1595-1640`.
- **Old docs:** `docs/logic/common-functionalities/media-picker.md` — partly outdated (category NOWA_RUNTIME; labels "Multi Selection", "Media Type", "Source Type", "Preferred Camera"; Limit/Image Quality/Max Width/Max Height/Max Duration missing; "Hot Fix").
- **Screenshot value:** medium — showMediaPicker details with Dependencies.

### openUrl
- **What it does:** opens a web link outside the app (browser).
- **Where:** add-node menu → **NOWA_RUNTIME** → `openUrl`.
- **Labels:** field **Url** (derived), default `https://nowa.dev`.
- **How to use:** insert it; type the link or click **Url** to link a variable/expression; type `$` to insert a value inside the text.
- **Options:** Url.
- **Limits and rules:** uses `launchUrl`; to show a page inside the app use the WebView widget instead (widgets research).
- **Gating:** none found.
- **Code refs:** `packages/nowa_runtime/lib/src/functions.dart:1-5`, `packages/core/lib/src/interpreter/block_utils.dart:242-243`, `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:368-373`.
- **Old docs:** `docs/logic/common-functionalities/open-url.md` — partly outdated (NOWA_RUNTIME, click not drag).
- **Screenshot value:** low.

### print
- **What it does:** writes a message to the logs, for checking values while testing.
- **Where:** add-node menu → **DART:CORE** → `print`.
- **Labels:** field **Msg** (derived), default "Hello World".
- **How to use:** insert it, type a message; type `$` to insert a variable (`${name}`); run the app and open the logs (logs panel: editor-shell research).
- **Options:** Msg.
- **Limits and rules:** none.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/libraries/dart_core_library_custom.dart:3-8`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:328-341`, `packages/core/lib/src/interpreter/block_utils.dart:240-241`.
- **Old docs:** `docs/logic/common-functionalities/print.md` — partly outdated (category DART:CORE, not Nowa; rest accurate).
- **Screenshot value:** low.

### Dependencies / Hot Fix
- **What it does:** under an action that needs extra packages or OS permissions (e.g. `showMediaPicker`), lists them and adds the missing ones.
- **Where:** Details of the action → **Dependencies** section.
- **Labels:** **Dependencies** (help: "These dependencies are required for this expression to work properly"), **Hot Fix**, **Packages:**, **Permissions:** (green check when enabled; clicking a section title opens project settings at that section).
- **How to use:** click **Hot Fix** to enable all missing packages/permissions.
- **Options:** none.
- **Limits and rules:** shown only when the action declares dependencies.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/expression_builder/expression_dependencies.dart:8-174`, `packages/core/lib/src/fields/expression_builder/expression_details.dart:40-48`.
- **Old docs:** `docs/logic/common-functionalities/media-picker.md` ("Hot fix") — partly accurate.
- **Screenshot value:** medium.

### Variables panel
- **What it does:** shows and creates the data and logic of the selected screen/component (its **Params**, **Variables**, **Functions**) or, when nothing is selected, the app's global states.
- **Where:** board or an open screen/component: the collapsible **Variables** tile at the top right, above **Details** (closed by default). Not shown in code mode.
- **Labels:** screen/component name, then **Params**, **Variables**, **Functions** (each header shows **+** on hover). With nothing selected: **Globals** (see **Global states**). With several widgets selected: "Multiple widgets selected". If main.dart is not managed by Nowa: "Main file must be managed by Nowa to use global variables".
- **How to use:**
  1. Select a screen/component (or any widget inside it).
  2. Expand **Variables**.
  3. Hover a section and click **+** to add; the new item is selected and ready to rename.
  4. Click an item to edit it in **Details**; double-click to rename; right-click → **Remove**; click a variable's type icon to change its type.
- **Options:** none.
- **Limits and rules:** the same **Params** / **Variables** / **Functions** lists also appear in the preview popup when you single-click a screen/component file in the Files panel.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/designer_setup.dart:166-226`, `packages/designer/lib/src/panels/variables_panel.dart:7-93`, `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:9-205`, `packages/core/lib/src/widgets/code/variable_widgets.dart:11-86`, `packages/core/lib/src/editors/dart_editor/dart_outline.dart:19-35`, `packages/core/lib/src/file_system/widgets/previews/widget_file_preview.dart:11-35`, `lib/project/panels/files_panel/files_list.dart:334-366`.
- **Old docs:** `docs/vars-params-functions/create-variable.mdx`, `local-parameter.mdx` — partly outdated (panel location/labels: "Params" not "Parameters"; File Preview note outdated).
- **Screenshot value:** high — Variables tile expanded for a screen with one item in each section.

### Variables (screen/component)
- **What it does:** values a screen or component remembers while it is open (text, counters, lists, loading flags), which widgets can show and logic can change.
- **Where:** **Variables** panel → **Variables** → **+**; or a widget property's link menu → **Create Variable...**.
- **Labels:** Details: **Name**, **Type**, **Default Value**, **Remove**. Delete confirmation when used: "<name> is in use" / "Removing <name> will affect the following references", **Cancel** / **Remove**.
- **How to use:**
  1. **+** creates `var1` (then `var2`...; String, nullable, default `''`); rename it.
  2. Set **Type** and **Default Value** (the value when the screen opens; also what the designer shows).
  3. Link it to a widget property (click the property label → **LOCALS** → the variable), or create it directly from the property with **Create Variable...** (type and current value are copied).
  4. Change it in logic with **Set <name>** + **refresh**.
- **Options:** Name, Type, Default Value.
- **Limits and rules:** name errors: 'Name "x" is already taken', 'Name x is a reserved keyword', 'Name "x" is not a valid code name', 'Member name "x" is already taken in class Y'. Changing the type resets the default if it no longer fits. Adding a variable to a stateless component converts it to stateful automatically.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:496-532`, `packages/core/lib/src/widgets/code/variable_widgets.dart:309-465,503-542`, `packages/core/lib/src/panels/details/decl_details.dart:17-79`, `packages/core/lib/src/actions/block_actions.dart:10-85`, `packages/core/lib/src/widgets/declaration_references_dialog.dart:53-98`, `packages/core/lib/src/file_system/naming.dart:34-69,125-154,268-290`, `packages/core/lib/src/interpreter/generators/variable_generator.dart:16-41`, `packages/core/lib/src/interpreter/widget_declarations.dart:407-416`, `packages/core/lib/src/fields/field_link_menu.dart:241-266`.
- **Old docs:** `docs/vars-params-functions/create-variable.mdx` — partly outdated (core flow right; labels "Create Variable...", "Set <name>", "refresh"; Arcade demos old).
- **Screenshot value:** high — variable Details (Name, Type, Default Value).

### Select type
- **What it does:** the type chooser for variables, parameters and return types.
- **Where:** any **Type** / **Return Type** field, or the type icon next to a variable.
- **Labels:** **Select type**, search box, **As List** checkbox, basic types `String`, `int`, `double`, `bool`, `Color`, `Widget` (plus `void` for return types), **show more...** / **show less** (all classes in the project and libraries, e.g. your models, `DateTime`); empty field shows **pick type**.
- **How to use:** open the picker, tick **As List** for a list, pick or search a type.
- **Options:** As List; type.
- **Limits and rules:** types chosen here are nullable (`String?`, `List<X>?`); there is no nullable switch. Lists are shown with a list icon. Default values of lists are edited as a length field plus items `0`, `1`, ... with **+**, drag to reorder, **Load More** after 10 items. No editor for maps (see Open questions).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/nowa_fields.dart:577-770`, `packages/core/lib/src/widgets/code/type_widgets.dart:5-79`, `packages/core/lib/src/fields/list_field.dart:8-200`.
- **Old docs:** `docs/vars-params-functions/create-variable.mdx` (Basic Types) — partly accurate.
- **Screenshot value:** medium — Select type with As List.

### Params (screen/component parameters)
- **What it does:** inputs a screen or component receives from outside (e.g. a product passed to a details screen or a card component); fixed once received.
- **Where:** **Variables** panel → **Params** → **+**; or a property's link menu → **Create Param...**.
- **Labels:** **Params** (items **Param**); Details **Name**, **Type**, **Default Value**, **Remove**. Inside widgets they appear in **LOCALS** (as `widget.<name>` in references).
- **How to use:**
  1. **+** creates `param` (String, nullable, default `''`); rename and type it.
  2. Set **Default Value** (used when nothing is passed, and on the board).
  3. Link widgets to it.
  4. Pass values: for a component, select its instance and fill the parameter fields in Details (designer research); for a screen, Navigator → **to** → brush; with GoRouter, map route parameters to **Screen Parameters** in the router editor, or pass **Extra**.
- **Options:** Name, Type, Default Value.
- **Limits and rules:** parameters are final: no **Set** button for them; use a variable for changing data.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:277-307`, `packages/core/lib/src/fields/field_link_menu.dart:188-229`, `packages/core/lib/src/interpreter/suggestion.dart:623-630`, `packages/code/lib/src/customizations/navigator_field.dart:72-88`, `packages/core/lib/src/editors/router_editor/go_route_node_view.dart:316-381`.
- **Old docs:** `docs/vars-params-functions/local-parameter.mdx` — partly outdated ("+ next to Parameters" is **Params**; "Create a Param." is **Create Param...**; GoRouter passing missing).
- **Screenshot value:** high — Params with a typed parameter; Navigator brush popup filling it.

### Functions (Add Function, InitState Function, Dispose Function)
- **What it does:** reusable logic of a screen/component, and lifecycle hooks: initState runs when the screen opens, dispose when it closes.
- **Where:** **Variables** panel → **Functions** → **+**.
- **Labels:** if initState or dispose is not yet added, **+** shows a menu **Add Function**, **InitState Function**, **Dispose Function**; otherwise it adds a function directly. Details: **Name**, **Return Type**, **Edit**, **Remove**.
- **How to use:**
  1. **+** → **Add Function** creates `func` (returns void); rename it.
  2. Select it → **Edit** to open Circuit; add parameters on the top node.
  3. **InitState Function**: opens with a node `initState` (the required `super.initState()`); keep it and add nodes below it (e.g. load data, start a Timer).
  4. **Dispose Function**: same, with `dispose` (e.g. cancel a Timer).
  5. Call a function from other logic via **LOCALS**, or attach it to an event by linking the event to it.
- **Options:** Name, Return Type, parameters.
- **Limits and rules:** the return type of initState/dispose is locked; each can be added once. The build function is hidden from the list.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:371-494`, `packages/core/lib/src/panels/details/decl_details.dart:53-59`, `packages/core/lib/src/widgets/code/variable_widgets.dart:467-500`.
- **Old docs:** `docs/vars-params-functions/functions/create-local-function.mdx` — partly outdated (menu items now **Add Function** / **InitState Function** / **Dispose Function**); `functions/override-functions` — accurate content but the file has no .md/.mdx extension, so it is not rendered.
- **3.13 (dev) changes:** menus restyled, same labels.
- **Screenshot value:** high — the Functions **+** menu.

### Events (On Pressed, On Tap, On Changed...)
- **What it does:** properties of type "function" that start logic when something happens: a tap, a text change, a form submit, a pull-to-refresh.
- **Where:** select a widget → **Details** → the event property (labels derived from Flutter names, e.g. **On Pressed**, **On Long Press**, **On Hover** on buttons; **On Tap**, **On Changed**, **On Editing Complete**, **On Submitted** / **On Field Submitted** on text fields). To make any widget tappable: **Details** → **Add Wrapper** → **Gesture Detector** or **Ink Well** (then its **On Tap**...). Other wrappers with events: **Dismissible**, **Refresh Indicator**.
- **Labels:** **+** (no logic yet) or bolt **Edit** (logic exists).
- **How to use:**
  1. Click **+** next to the event: an empty function is created and opened in Circuit.
  2. Add nodes; close Circuit. Reopen later with **Edit**.
  3. To reuse a screen function, click the event label → **LOCALS** → pick the function.
  4. To let a parent decide what happens (callback), click the event label → **Create Param...** (a function-type parameter).
  5. To remove: click the event label → **Detach...**, or right-click → **Reset to default** / **Set to null**.
- **Options:** none.
- **Limits and rules:** buttons also have **Enabled** (switch) with **Compute** to enable them from a bool.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/nowa_fields.dart:793-825`, `packages/core/lib/src/fields/basic_fields.dart:532-557`, `packages/core/lib/src/fields/field_link_menu.dart:138-158`, `packages/core/lib/src/fields/form_fields.dart:86-97`, `packages/core/lib/src/fields/button_fields.dart:150-165,200-275`, `packages/core/lib/src/wrappers_to_add.dart:33-36,94,170-176`, `packages/designer/lib/src/details/widget_details.dart:66-109,188-200`.
- **Old docs:** `docs/vars-params-functions/functions/events.mdx` — partly outdated (detach is in the link menu, right-click shows Reset to default/Set to null; generic Flutter event list not tied to Nowa labels).
- **Screenshot value:** high — button Details with On Pressed showing Edit; Add Wrapper search with Gesture Detector.

### Link <field> menu
- **What it does:** the menu behind every property and input label: connects the value to variables, parameters, global state, functions or expressions, and creates new ones.
- **Where:** click a field's label (in Details, in Circuit node details, in popups). Fields that cannot be linked show "Field is not enabled".
- **Labels:** headline **Link <field>** (with the expected type); items **Custom Expression...**, **Detach...** (red, when linked), **Create Param...**, **Create Variable...**, **Compute...**, **Edit** (linked to a variable), **Open in Circuit** (linked to a function); categories: in widget properties **LOCALS**, **GLOBALS**, **EXPRESSIONS**; in Circuit fields the full add-node category list.
- **How to use:**
  1. Click the label (it highlights on hover).
  2. Pick a value from a category (only values of a fitting type are offered), or an item above.
  3. A linked field shows the value's path (e.g. `product.name`) with a **+** to go deeper.
- **Options:** none.
- **Limits and rules:** **Create Param...** inside a function creates a function parameter, otherwise a screen/component parameter. **Create Variable...** needs a class (screen/component, global state, model). **Detach...** replaces the link with its current value (or a default).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/field_link_menu.dart:9-416`, `packages/core/lib/src/fields/block_field.dart:990-1036,703-714`, `packages/core/lib/src/fields/link_menu.dart:90-93,163-172`.
- **Old docs:** spread over `create-variable.mdx`, `local-parameter.mdx`, `if-statement.mdx` ("linking menu") — partly outdated (item names now end with "...", no separate "Expression Builder").
- **Screenshot value:** high — link menu open on a Text property.

### Custom Expression... (expression builder)
- **What it does:** write a Dart expression (formula) for any value, or edit it piece by piece.
- **Where:** link menu → **Custom Expression...**; Circuit → **Add Custom Expression**.
- **Labels:** dialog header = field name (or **Expression**) and its type; text field **Enter expression...** with **Eval**; after Eval, the expression is shown as clickable parts with a **Search...** box to append members, a text-mode button to go back to typing, **Detach**, and a check mark (no problems) or a help icon listing problems.
- **How to use:**
  1. Open it; type e.g. `"Hello " + name` or `price * quantity`.
  2. Press Enter or **Eval**; fix any red error shown.
  3. Click a part to select it, double-click to replace it, or search to add a member; **Detach** removes the selected part.
- **Options:** none.
- **Limits and rules:** must parse as a single Dart expression; strings need quotes.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/expression_builder/expression_builder_popup.dart:27-472`, `packages/core/lib/src/fields/expression_builder/expression_builder_provider.dart:5-218`, `packages/core/lib/src/fields/field_link_menu.dart:281-285`.
- **Old docs:** referenced in `print.md`, `snackbar.md`, `if-statement.mdx` — partly accurate; no dedicated page — missing. (What's New "AI-generated expressions" was "Coming Soon"; not in v3.12.5.)
- **Screenshot value:** high — the dialog in text mode and in parts mode.

### $ inside text and + after a linked value
- **What it does:** insert values inside text, and reach deeper data (a field of a model, `.length` of a list, `.toString()` of a number).
- **Where:** any text field (Text content, print **Msg**, **Url**...); any linked field (the **+** after the value path).
- **Labels:** typing `$` opens a link menu and inserts `${value}`; **+** after a linked value opens **Link <value>** with its members; clicking a part with inputs opens its inputs with **Change**.
- **How to use:**
  1. In a text field, type `Hello ` then `$`, pick `name` → `Hello ${name}`.
  2. On a linked field, click **+** → pick `toString` (to show a number in a Text) or a model field.
- **Options:** none.
- **Limits and rules:** for lists, **Get item** reads an item by index.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/basic_fields.dart:53-115`, `packages/core/lib/src/fields/reference_field.dart:50-230`, `packages/core/lib/src/interpreter/suggestion.dart:45-82,671-687`.
- **Old docs:** `print.md`, `snackbar.md` — accurate.
- **Screenshot value:** medium — text field with `${name}` and the menu.

### Compute...
- **What it does:** turns a property into a function that calculates its value, for logic too complex for one expression.
- **Where:** link menu → **Compute...**.
- **Labels:** creates a function named `create<FieldLabel>` (e.g. `createText`) returning the field's type, and opens it in Circuit.
- **How to use:** click the label → **Compute...**; build the logic ending with **Add Return**; reopen via the label → **Open in Circuit**.
- **Options:** none.
- **Limits and rules:** needs a class (screen/component...).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/field_link_menu.dart:268-279,372-376`.
- **Old docs:** `docs/logic/control-flow/if-statement.mdx` (Compute) — accurate.
- **Screenshot value:** low.

### Visibility wrapper (conditional visibility)
- **What it does:** shows or hides a widget from a true/false value, with an optional replacement.
- **Where:** select the widget → **Details** → **Add Wrapper** → **Visibility**.
- **Labels:** wrapper fields **Visible** and **Replacement** (derived).
- **How to use:** add the wrapper; click **Visible** → link a bool variable, global value, **Conditional**/**Logical** expression or **Custom Expression...**; change the bool in logic and **refresh**.
- **Options:** Visible, Replacement.
- **Limits and rules:** none found.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/wrappers_to_add.dart:27-31`, `packages/core/lib/src/fields/text_fields.dart:805-818`, `packages/core/lib/src/fields/block_field.dart:67`, `packages/designer/lib/src/details/widget_details.dart:66-109`.
- **Old docs:** none — missing.
- **Screenshot value:** medium — Visibility wrapper with Visible linked to a variable.

### Reset to default / Set to null
- **What it does:** right-click any property to clear it.
- **Where:** right-click a field in Details (or in node details).
- **Labels:** **Reset to default**; **Set to null** (only for nullable fields).
- **How to use:** right-click the field and choose.
- **Options:** none.
- **Limits and rules:** disabled on fields that are not enabled.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/block_field.dart:812-842`.
- **Old docs:** `docs/logic/ui-popups/snackbar.md` — outdated labels ("Set to Default", "Set to Null").
- **Screenshot value:** low.

### Global states
- **What it does:** app-wide state: classes holding data and functions that any screen can read and change (cart, signed-in user, settings). Built on Flutter's ChangeNotifier + Provider.
- **Where:**
  - Files panel → hover `lib` → **+** (tooltip **Add to library**) → **New Global State...** (created in `lib/globals` and attached automatically).
  - **Variables** panel with nothing selected → **Globals** → **Create global state** (created in `lib`) or **Pick global state** (attach an existing one: "Loading global states...", "No global states found").
  - Each listed global state: **...** → **Open in new tab**, **Detach global state**.
  - main.dart preview → **Globals Options** → **Global Providers** (same actions).
- **Labels:** dialog **New GlobalState** (from the Files panel) with **GlobalState name**, **Class name**, **Path**, **Cancel**, **Submit**. In the global state's file editor, an unattached state shows "This global state is not attached to the app." with **Attach**.
- **How to use:**
  1. Files → **+** on `lib` → **New Global State...**, name it (e.g. `CartState`), **Submit**.
  2. Double-click the new file to add variables and functions (next feature).
  3. Use it from screens via **GLOBALS** (see **Using global states**).
- **Options:** name, path.
- **Limits and rules:** "attached" means Nowa adds a `ChangeNotifierProvider` for it in `main.dart` (inside `MultiProvider`); only attached states appear in **GLOBALS**. New projects already have **AppState** (`lib/globals/app_state.dart`) with `theme` and `changeTheme` (themes research).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/files_panel/add_lib_menu.dart:98-110`, `lib/project/panels/files_panel/files_list.dart:500-502`, `packages/core/lib/src/state_management/global_state_widgets.dart:8-184`, `packages/core/lib/src/state_management/global_state_menu.dart:6-43`, `packages/core/lib/src/fields/class_editor.dart:52-79`, `packages/core/lib/src/project/env_services/global_state_service.dart:15-96`, `packages/core/lib/src/file_system/widgets/previews/main_preview/globals_review_section.dart:8-125`, `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:85-130`, `packages/core/lib/src/file_system/templates/common/app_state_template.dart:6-38`, `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:42-49`.
- **Old docs:** `docs/vars-params-functions/global-states.md` — partly outdated (labels "New Global State...", "Pick global state"; "click once on the file to open its editor" is wrong: single-click shows a small preview, double-click opens it; New Global State now attaches automatically).
- **3.13 (dev) changes:** the same **New Global State...** entry is also in the new Library panel's add menu (`/home/user/nowa/lib/project/panels/library_panel/library_host.dart:183`).
- **Screenshot value:** high — Variables panel Globals view; New GlobalState dialog.

### Global state variables and functions
- **What it does:** defines what a global state holds and does; `notifyListeners` tells listening widgets to update.
- **Where:** double-click the global state file in Files → file editor: left **View Code** + file outline; middle the class with **Variables** and **Functions** (+ on hover); right the selected item's editor (Circuit for functions).
- **Labels:** variable editor **Name**, **Type**, **Default Value**, **Is Final** (tooltip "If true the variable cannot be changed"), **Is Static** (tooltip "If true there will be only one instance of this variable shared across all instances of the class"; asks "Changing static modifier might break references" when used). In a global-state function, **LOCALS** lists its variables, functions and `notifyListeners`.
- **How to use:**
  1. Add a variable (e.g. `cartItems`, type Product **As List**).
  2. Add a function (e.g. `addToCart` with a parameter), open it, change the variable (e.g. `cartItems` → **+** → `add`), then add **LOCALS** → `notifyListeners`.
  3. Call this function from screens instead of changing the variable directly.
- **Options:** as listed.
- **Limits and rules:** **GLOBALS** inside a global-state function lists Navigator/GoRouter/checkPlatform/Media Query/Show snackbar but not other global states (they are listed only inside screens/components).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/editors/dart_editor/dart_editor.dart:139-268`, `packages/core/lib/src/fields/class_editor.dart:10-50`, `packages/core/lib/src/widgets/code/variable_widgets.dart:323-403`, `packages/core/lib/src/state_management/provider_blocks.dart:45-57`, `packages/core/lib/src/state_management/global_state_suggestions.dart:70-74`.
- **Old docs:** `docs/vars-params-functions/global-states.md` — partly outdated (access to other global states under Globals is wrong per code; editor opens by double-click).
- **Screenshot value:** high — global state file editor with a function open in Circuit.

### Using global states (and how the UI rebuilds)
- **What it does:** read global values in widgets and call global functions in logic; widgets update automatically when the state notifies.
- **Where:** a property's link menu or the add-node menu → **GLOBALS** → the global state → **+** → variable or function.
- **Labels:** global state entries are listed by class name in **GLOBALS**; picking one inserts `<State>.of(context)` (node title **Create <State>** until a member is chosen).
- **How to use:**
  1. Widget: click e.g. a ListView's list property → **GLOBALS** → `CartState` → `cartItems`.
  2. Logic: add-node → **GLOBALS** → `CartState`, then **+** in Details → `addToCart`, fill its inputs.
  3. When `addToCart` calls `notifyListeners`, every widget that reads `CartState` in its build updates.
- **Options:** none.
- **Limits and rules:** inside a screen/component's build the state is read with listening on; elsewhere (functions/events) Nowa inserts `listen: false` automatically. Screen/component variables still need **refresh**.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/state_management/global_state_suggestions.dart:66-93`, `packages/core/lib/src/state_management/provider_generator.dart:3-18`, `packages/core/lib/src/state_management/provider_blocks.dart:20-43,60-82`.
- **Old docs:** `docs/vars-params-functions/global-states.md` — mostly accurate (flow right).
- **Screenshot value:** high — link menu showing GLOBALS → CartState members.

### Notifier Builder wrapper
- **What it does:** rebuilds only the wrapped part of the screen when a notifier (e.g. a global state) changes.
- **Where:** select a widget → **Details** → **Add Wrapper** → **Notifier Builder**.
- **Labels:** **Notifier** (dropdown of ChangeNotifiers available in the screen and attached global states).
- **How to use:** add the wrapper, pick the **Notifier**.
- **Options:** Notifier.
- **Limits and rules:** none found.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/wrappers_to_add.dart:139-150`, `packages/core/lib/src/fields/data_field.dart:53-110`, `packages/designer/lib/src/designer_plugin.dart:71`, `packages/nowa_runtime/lib/src/widgets/notifier_builder.dart:1-47`.
- **Old docs:** none — missing.
- **Screenshot value:** low.

### New Model...
- **What it does:** creates a data model class (Task, Product, User...) to use as a type for variables, parameters and lists. Nowa keeps its constructor, `fromJson` and `toJson` up to date automatically as you add fields.
- **Where:** Files panel → hover `lib` → **+** (**Add to library**) → **New Model...** (created in `lib/models`).
- **Labels:** dialog **New Model** with **Model name**, **Class name** (PascalCase), **Path** (snake_case file), **Cancel**, **Submit**. In the file editor: **Variables**, **Functions**; field editor **Name**, **Type**, **Default Value**, **Is Final**, **Is Static**.
- **How to use:**
  1. **New Model...**, type a name (e.g. "task model" → class `TaskModel`, file `task_model.dart`), **Submit**.
  2. Double-click the file; in the middle column hover **Variables** → **+** to add fields (new fields are final by default: turn **Is Final** off for fields you will change).
  3. Add functions under **Functions** (open in Circuit).
  4. **View Code** shows the generated Dart.
- **Options:** as listed.
- **Limits and rules:** name rules as in **Variables**. The constructor takes every field; `fromJson(Map<String, dynamic> json)` and `toJson()` are regenerated whenever fields change.
- **Gating:** none found.
- **Code refs:** `lib/project/panels/files_panel/add_lib_menu.dart:85-97`, `packages/core/lib/src/interpreter/declaration_runtime.dart:290-309`, `packages/core/lib/src/interpreter/auto_blocks.dart:41-241`, `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:309-369`, `packages/core/lib/src/providers/project_provider.dart:376`.
- **Old docs:** `docs/vars-params-functions/data-models.md` — partly outdated ("Create new object" is **New Model...**; the single-click popup with variables/functions no longer exists; auto fromJson/toJson, Is Static not mentioned).
- **3.13 (dev) changes:** also offered from the new Library panel's add menu (`/home/user/nowa/lib/project/panels/library_panel/library_host.dart:183`).
- **Screenshot value:** high — model file editor with fields and the code view.

### Generate Models From Json...
- **What it does:** creates model classes (including nested ones) from a JSON sample, e.g. an API response.
- **Where:** Files panel → **+** on `lib` (**Add to library**) → **Generate Models From Json...** (also reachable from API flows: data research).
- **Labels:** dialog **Generate Models** with steps **Content** ("Enter a JSON text and instantly generate usable models for your project.", editor buttons **Wrap**, **Compress**, **Prettify**), **Select Data** (**Select All**, **Collapse All**, **Expand All**), **Generated Models** (**Name**: "Enter the name of the class you want to generate, this is the main class name"; **Path** with browse); buttons **Cancel**/**Back**, **Next**, **Save and Open** (or **Save**).
- **How to use:**
  1. Paste JSON, **Next** (disabled while the JSON is invalid).
  2. Tick the fields to keep, **Next**.
  3. Set **Name** (default `Root`) and **Path** (default `lib/models`), **Save and Open**.
- **Options:** fields; name; path.
- **Limits and rules:** generated fields are nullable (`String?`, `int?`, `double?`, `bool?`, nested models). If the JSON's root has no fields (e.g. a list of plain values) the snackbar says "You can generate model for List of primitives".
- **Gating:** none found.
- **Code refs:** `lib/project/panels/files_panel/add_lib_menu.dart:111-117`, `packages/core/lib/src/model_generator/generate_models_dialog.dart:9-205`, `packages/core/lib/src/model_generator/generate_models_dialog_selection/json_editor_section.dart:6-24`, `packages/core/lib/src/model_generator/generate_models_dialog_selection/selecting_data_section.dart:30-70`, `packages/core/lib/src/model_generator/generate_models_dialog_selection/generated_models_section.dart:60-80`, `packages/core/lib/src/model_generator/json_editor.dart:145-162`, `packages/core/lib/src/model_generator/generate_models_provider.dart:12-20`, `packages/core/lib/src/model_generator/data_analysers/json_analyser.dart:86-160`.
- **Old docs:** none — missing.
- **Screenshot value:** high — the three steps of the dialog.

### Using models
- **What it does:** uses model classes as types and creates/convert instances in logic.
- **Where:** any **Type** picker (**show more...** or search the model name); add-node menu → **GENERAL** → **Create...** → the model; the **+** member menu on a model value.
- **Labels:** **Create...** → model → **Default** or `fromJson`; node **Create <Model>** with one input per field.
- **How to use:**
  1. Create a variable of type `Task` (**As List** for `List<Task>`) and fill **Default Value** items to preview the UI.
  2. In an event, **Create...** → `Task` → **Default**, link its fields (e.g. `title` to a text field controller's `text`), **Store result**.
  3. Add it to the list (`tasks` → **+** → `add`) and **refresh** (or notify, for global states).
  4. Convert with `Task.fromJson(map)` (**Create...** → `fromJson`) and `task.toJson()` (**+** → `toJson`).
- **Options:** none.
- **Limits and rules:** default values are only the starting value; data set at runtime replaces them.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/nowa_fields.dart:631-770`, `packages/core/lib/src/interpreter/suggestion.dart:725-757`, `packages/core/lib/src/interpreter/auto_blocks.dart:136-241`.
- **Old docs:** `docs/vars-params-functions/data-models.md` (Using Data Models) — mostly accurate.
- **Screenshot value:** medium — "Create Task" node with fields linked.

### Constants (Custom Constants)
- **What it does:** project-wide named String values (and integration keys), stored as static constants in `AppConstants` (`lib/globals/app_constants.dart`) and usable in logic from the project's own category.
- **Where:** project settings → **Constants** (settings are covered by the account/projects research; Cmd/Ctrl+, opens project settings).
- **Labels:** **Constants** ("Manage all Secret keys for your integrations in one place. Changes here are reflected in individual integration panels and vice versa."), **Custom Constants**, **+** (tooltip **Add custom constant**), **Name**, **Value**, **Confirm**, **Cancel**, **Remove**; empty state "No custom constants defined. Click + to add one."
- **How to use:** **+** → type Name and Value → Confirm; in logic, pick `AppConstants` → the constant.
- **Options:** Name, Value.
- **Limits and rules:** values are Strings.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/constants_settings.dart:9-290`, `packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:10-80`, `lib/setup_general_actions.dart:33`.
- **Old docs:** none — missing.
- **Screenshot value:** low.

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| Copy/paste of Circuit nodes | `packages/code/lib/src/circuit_actions.dart:79-103`, `packages/code/lib/src/providers/circuit.dart:28-57` | Commented-out code; not available |
| Circuit test harness (code cases, test app) | `packages/code/lib/code_test_app.dart`, `packages/code/lib/code_cases.dart` | Dev-only |
| **Import template** in the Add to library menu | `lib/project/panels/files_panel/add_lib_menu.dart:147-154` | Debug builds only (`kDebugMode`) |
| `ClassView` / `ClassEditor` class editor | `packages/core/lib/src/fields/class_editor.dart:81-143` | Never instantiated; replaced by the default Dart file editor (`packages/core/lib/src/plugin.dart:118`) |
| Get/Set suggestions ("Get x" / "Set x") | `packages/core/lib/src/interpreter/suggestion.dart:151-165,431-441` | Not used by any menu |
| **Set item** for lists | `packages/core/lib/src/interpreter/suggestion.dart:45-82`; filtered in `packages/core/lib/src/fields/field_link_menu.dart:340`, `packages/core/lib/src/fields/expression_builder/expression_builder_provider.dart:79-81` | Filtered out of every menu |
| Items in the **NOWA** category (`dynamic`, `void`, `BoardPosition`, `WidgetsBinding`, `usePathUrlStrategy`) | `packages/core/lib/src/interpreter/library.dart:605-612` | Internal declarations; meaningless to users |
| `AutoCopyWith` | `packages/core/lib/src/interpreter/auto_blocks.dart:243-317`, `packages/core/lib/src/themes/theme_class_declaration.dart:19` | Used for theme classes only, not added to models |
| Circuit analytics events | `packages/code/lib/src/circuit_commands.dart:14,38,50`, `packages/code/lib/src/widgets/add_statement_menu.dart:56,65,73,83,100` | Internal telemetry |

## Open questions
- **Globals view may hide global variables.** The Variables panel's Globals list uses `ClassVarList` with its default `onlyFinalVars: true` (`packages/core/lib/src/state_management/global_state_widgets.dart:60`, `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:315,339`), while **+** creates non-final variables for global states (`calculateIsFinal` is false without an auto constructor, `:329,353`). Check in the UI whether non-final global variables appear there (they do appear in the global state's file editor, `packages/core/lib/src/fields/class_editor.dart:43`).
- **Functions Circuit cannot draw.** `BlockToCircuitVisitor` only handles return/if/while/try/expression/variable statements (`packages/code/lib/src/models/block_to_circuit_visitor.dart:16-75`); the base visitor throws for others such as for loops, switch, break/continue (`packages/core/lib/src/interpreter/visitors/block_visitor.dart:114+`). What does the user see when opening such a function in Circuit?
- **Setting dates in showDatePicker.** Initial/First/Last Date start as `DateTime.now()` (`packages/core/lib/src/interpreter/block_utils.dart:256-263`) and there is no DateTime field editor in `BlockField.allFields` (`packages/core/lib/src/fields/block_field.dart:28-87`). Confirm the intended way (Create... → DateTime, or Custom Expression like `DateTime(2030)`).
- **Name of the project's own category.** Computed as the library uri's last segment (`packages/core/lib/src/interpreter/library.dart:43`) of `package:<name>` (`:217-219`) and upper-cased (`packages/core/lib/src/fields/link_menu.dart:331`), i.e. likely `PACKAGE:<NAME>`. Verify the exact rendering.
- **Maps.** No map editor exists in the fields; the type picker's **show more...** would list `Map` without type arguments (`packages/core/lib/src/fields/nowa_fields.dart:658-706`). Confirm whether docs should say maps are code/custom-expression only.
- **Context-dependent actions outside screens.** Navigator, GoRouter, Media Query and Show snackbar are listed in GLOBALS everywhere, including global-state functions with no `context` (`packages/core/lib/src/state_management/global_state_suggestions.dart:29-67`). What happens if used there (old docs warn against it)?
- **Dialog title when creating a global state from the Variables panel.** The dialog title is built as "New " + headline and the headline is 'Create global state' (`packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94`, `packages/core/lib/src/state_management/global_state_widgets.dart:22`), so it would read "New Create global state", and the file goes to `lib/` rather than `lib/globals/`. Verify in the UI.
- **Share.** No share function or share package is built in (`packages/core/lib/src/interpreter/packages/dart_package.dart:60-90`). Confirm docs should send users to adding a pub.dev package (code/Git research).
- **New UX layout.** The Variables tile is part of `DesignerLayout` in both layouts (`packages/designer/lib/src/designer_setup.dart:166-226`); confirm its position when App Settings → Experimentals → "New UX" is on.
