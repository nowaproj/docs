# P14-B06 coverage: old logic, variables, params, functions and events pages

Batch pages: `docs/logic/index.md`, `events.md`, `variables.md`, `circuit.md`, `parameters.md`, `global-state.md`, `functions.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0+1, `3cb32031c`). "Flutter SDK" refs are the local SDK sources at
`/home/user/flutter` (`058e0af2c`); their doc comments are the same text as api.flutter.dev / api.dart.dev, which this
environment can't reach.

Status per item: `covered` (page#section) / `added` (page#section) / `obsolete` (code ref) / `not useful` / `dev-only`
(moved to `P14-B06-for-code.md`) / `for other page` (target, see notes).

Progress: written before editing; statuses updated as each page was saved. All seven pages are saved and every `added`
row's target section exists (anchors checked with a script).

## 1. `logic/intro-circuit.md` (What is Circuit)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 1.1 | Circuit is how you build logic in Nowa: nodes run one after the other | covered | circuit.md intro | Rewritten as a step-by-step recipe image (R8/R9). |
| 1.2 | Open Circuit from a function (Variables panel → select → **Edit**) | covered | circuit.md#open-circuit; functions.md#add-a-function | |
| 1.3 | Open Circuit from an event (**Edit** next to **On Pressed**) | covered | circuit.md#open-circuit; events.md#add-logic-to-an-event | 3.13: the button reads **+** or **Edit** (`packages/core/lib/src/fields/nowa_fields.dart`, FunctionField). |
| 1.4 | Click the small circle under the function name to add a node | covered | circuit.md#add-a-node | Dot grows into **+** on hover (`packages/code/lib/src/widgets/node_widgets.dart:240-262`). |
| 1.5 | The top node is the function; select it to add parameters | covered | circuit.md#set-up-the-function-node | Old "yellow" node is drawn in the function colour (`node_widgets.dart:218-221`); page says "orange" as the 3.13 screenshot shows. |
| 1.6 | Flow runs top to bottom, one node after the other | covered | circuit.md intro, circuit.md#read-a-circuit-top-to-bottom | |
| 1.7 | Worked example "loadData": read a saved number from the device into a new variable, then an If on `!= null` | added | circuit.md#read-a-circuit-top-to-bottom | Rebuilt as a daily-goal example with 3.13 labels: SHARED PREFERENCES **get** (`packages/core/lib/src/interpreter/suggestion.dart:481-503`), **Store result** (`packages/code/lib/src/fields/store_result_field.dart`), **If Statement** (`packages/code/lib/src/models/if_node.dart:34`). |
| 1.8 | Action nodes: do something, return nothing (print, refresh, clear) | added | circuit.md#kinds-of-nodes | **refresh** label `suggestion.dart:617`; **clear** `suggestion.dart:485`. |
| 1.9 | Value nodes: return a value; **Store result** appears; e.g. a division under Operators | added | circuit.md#kinds-of-nodes | Store result hidden for void (`store_result_field.dart`). |
| 1.10 | Mixed nodes: do something and return a result (e.g. an API call) | added | circuit.md#kinds-of-nodes | |
| 1.11 | Control-flow (compound) nodes: If (True/False), Try (On Error) | added | circuit.md#kinds-of-nodes | Labels `if_node.dart:61-67`, `try_node.dart:28,65`. |
| 1.12 | Delete a node: right-click **Remove** or the Delete key | covered | circuit.md#select-move-and-remove-nodes | Backspace, or Delete on Windows/Linux (W5 refs). |
| 1.13 | Move a node: right-click **Move Up/Move Down** or Shift+arrows | covered | circuit.md#select-move-and-remove-nodes | 3.13 labels **Move up** / **Move down** (`node_widgets.dart:92-95`). |
| 1.14 | Return node at the end of a function with a return type | covered | circuit.md#return-a-value | |
| 1.15 | Create Local Variable: temporary, gone after the function runs; holds a value between nodes | covered | circuit.md#hold-values-and-write-formulas; variables.md#use-a-variable-inside-one-function-only | |
| 1.16 | Tip: watch the generated code update live in an IDE (hybrid); edit the function's code and it syncs back to Circuit | dev-only | for-code `#variables-and-functions` | Circuit rebuilds when the file is re-imported (`packages/code/lib/src/circuit_plugin.dart:43-69`); code edits reach the board on save (`docs/code/code-mode.md`). The main pages keep one plain line (index.md). |
| 1.17 | "Menu nodes will be explained in a later section" | not useful | | Placeholder text. |
| 1.18 | Closing sentence ("powerful way...") | not useful | | Filler. |

## 2. `logic/control-flow/if-statement.mdx` (If statements)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 2.1 | What an If is: branch in two directions on a true/false condition; e.g. is the user logged in, is a value empty | added | circuit.md#branch-with-if; index.md#the-pieces | Plain-words explanation and examples (R8). |
| 2.2 | Add it: **+** under a node → If Statement | covered | circuit.md#branch-with-if | 3.13 label **Add If statement** (`packages/code/lib/src/widgets/add_statement_menu.dart:70`). |
| 2.3 | Nested Ifs: add another If inside a True or False branch | covered | circuit.md#branch-with-if | |
| 2.4 | Parts: Condition (must be true/false), True branch, False branch | covered | circuit.md#branch-with-if | `statement_fields.dart:41-49`, `if_node.dart:56-68`. |
| 2.5 | Nodes after the If continue the flow (end of the If) | covered | circuit.md#branch-with-if | Added "unless that branch ends with a Return" (`if_node.dart:114`). |
| 2.6 | Default condition is a switch: on = True branch always runs, off = False branch | added | circuit.md#branch-with-if | `add_statement_menu.dart:72` (`SimpleBlock(true)`). |
| 2.7 | Link the condition to a true/false variable or param of the screen (e.g. `isLoading`) | covered | circuit.md#branch-with-if | LOCALS. |
| 2.8 | Link to a true/false global state value under GLOBALS | added | circuit.md#branch-with-if | Global states are listed in GLOBALS inside screens/components (`packages/core/lib/src/state_management/global_state_suggestions.dart:70-74`). |
| 2.9 | Warning: the condition must give true or false | covered | circuit.md#branch-with-if | |
| 2.10 | Link to a function that returns true/false (local under LOCALS; global: GLOBALS → state → **+** → function); it runs when the flow reaches the If | added | circuit.md#branch-with-if | Statement-level fields get every category (`packages/core/lib/src/fields/field_link_menu.dart:341`); a function pick becomes a call (`field_link_menu.dart:138-157`). |
| 2.11 | Custom Expression, e.g. `isLoading == true && user != null` | covered | circuit.md#branch-with-if (link), expressions.md#custom-expression | Example `dailyGoal >= 1400` added on circuit.md. |
| 2.12 | Operators (greaterThan, equal, logicalAnd...): set Type, then Left and Right side; example dailyGoal ≥ 1400 | added | circuit.md#branch-with-if (example) | Operator fields in expressions.md#operators (B07); example uses `greaterThanOrEqual` (`packages/core/lib/src/interpreter/suggestion.dart`, OPERATORS). |
| 2.13 | Tip: reopen an operator as a Custom Expression to see and edit the formula | covered | expressions.md#custom-expression | "A dialog opens in text mode, showing the current expression." |
| 2.14 | Compute: Nowa creates a true/false function, links it, open it with **Open in Circuit**; add params and pass data | covered | expressions.md#compute; circuit.md#branch-with-if (one line) | `field_link_menu.dart:268-279`. The "add params and pass them from the If" detail is advanced and left to expressions.md (not re-verified in the UI). |
| 2.15 | Detach a condition | covered | expressions.md#link-menu (**Detach...**) | |
| 2.16 | **Create Variable** in the link menu makes a new true/false variable and links it | added | circuit.md#branch-with-if | `field_link_menu.dart:241-266,366-377` (variable on the screen, starts with the switch's value). |
| 2.17 | YouTube Water Tracker tutorial from 18:56 | not useful | | Pure media, pre-3.x UI. |
| 2.18 | Closing sentence | not useful | | Filler. |

## 3. `logic/control-flow/try-catch.mdx` (Try node)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 3.1 | What the Try node is: handles steps that might go wrong so the app doesn't crash and shows feedback | added | circuit.md#handle-errors-with-try | |
| 3.2 | What an exception is (a problem while the app runs, e.g. no internet); "try this, and if it goes wrong, do this instead" | added | circuit.md#handle-errors-with-try | Plain words (R8). |
| 3.3 | When to use it: API requests, reading/writing saved data, custom calculations on user input | added | circuit.md#handle-errors-with-try | |
| 3.4 | **Error name** field: names the variable holding the error; find it under Locals in On Error | covered | circuit.md#handle-errors-with-try | Default `error` (`packages/core/lib/src/interpreter/block_tree.dart:1918-1923`), label `statement_fields.dart:62`. |
| 3.5 | Main branch: the risky steps; if one fails, the flow jumps to On Error | covered | circuit.md#handle-errors-with-try | Main line straight down (`try_node.dart:39`). |
| 3.6 | On Error branch runs only when something failed | covered | circuit.md#handle-errors-with-try | |
| 3.7 | Add it: **+** → Try; main line, On Error on the left | covered | circuit.md#handle-errors-with-try | **Add Try statement** (`add_statement_menu.dart:78`); On Error label left (`try_node.dart:61-66`). |
| 3.8 | Example: API request in the main line, store the response; Snackbar from Globals with `error` in On Error | added | circuit.md#handle-errors-with-try (example) | Adds the 3.13 must-know: turn on **await** for the request, or the Try can't catch its failure (Flutter SDK `bin/cache/dart-sdk/lib/async/future.dart:92-113`; `packages/code/lib/src/fields/future_options.dart:10-31`). |
| 3.9 | What to put in On Error: Snackbar (Globals), Bottom Sheet or Dialog ("Nowa" category), reset variables or redirect, logs | added | circuit.md#handle-errors-with-try | 3.13 categories: **Show snackbar** in GLOBALS (`global_state_suggestions.dart:65`); `showDialog` / `showModalBottomSheet` in **MATERIAL** (popups.md); `print` in **DART:CORE** (actions.md). The old "Nowa" category is gone. |
| 3.10 | Closing sentence | not useful | | Filler. |

## 4. `vars-params-functions/create-variable.mdx` (Local variables)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 4.1 | A variable holds a value that can change while the screen or component is open | covered | variables.md intro | |
| 4.2 | Linked to a widget property, the widget shows the new value (after refresh) | covered | variables.md#show-a-variable-in-a-widget, #change-a-variable-from-logic | |
| 4.3 | Can also be used only in logic, to decide what happens | added | variables.md intro | |
| 4.4 | A variable belongs to its screen or component; other screens can't use it (use global state) | added | variables.md intro | Screen variables are listed under LOCALS of that class only (`suggestion.dart:588-633`). |
| 4.5 | Examples: `isLoaded` (bool, show a loading indicator), `userID`, `cartItems` (list) | added | variables.md#what-variables-are-good-for | Everyday examples table with 3.13 types. |
| 4.6 | Basic types with examples: String, int, double, bool, List, Color, DateTime, custom types | covered | variables.md#choose-a-type | Examples column added; types `packages/core/lib/src/fields/nowa_fields.dart:686`. |
| 4.7 | Create: select → Variables panel → **+** → type → default value (value when the screen loads) | covered | variables.md#add-a-variable | |
| 4.8 | Example: a `name` String variable starting as "User" | covered | variables.md#add-a-variable | Same flow; the page's example is a counter. |
| 4.9 | Note: create variables in the File Preview (Files panel or "Open in File Preview") | obsolete | | No "Open in File Preview" in 3.13 (grep finds none); the click-a-file preview can't be opened from the designer (`research/changes-3.13.md` C6, `lib/project/panels/files_panel/files_tree_host.dart:266-282`). |
| 4.10 | Linked property equals the variable; updates after refresh | covered | variables.md#change-a-variable-from-logic | |
| 4.11 | The variable's type must match the property's type | added | variables.md#show-a-variable-in-a-widget | Menu opens the value's members on a type mismatch (`packages/core/lib/src/fields/link_menu.dart:158`). |
| 4.12 | Example: show `name` in a Text | covered | variables.md#show-a-variable-in-a-widget | |
| 4.13 | Tip: put a variable inside text with a custom expression (`"Hello " + name`) | covered | variables.md#show-a-variable-in-a-widget (`$`), expressions.md#custom-expression | |
| 4.14 | Update: add the variable → **Set** → type the value → **Refresh UI** node | covered | variables.md#change-a-variable-from-logic | 3.13: **Set <name>** button (`packages/code/lib/src/fields/expression_statement_field.dart:47-53`), **refresh** (`suggestion.dart:617`). |
| 4.15 | Example: change `name` on a button press | covered | variables.md#change-a-variable-from-logic | Counter example. |
| 4.16 | Set a variable from another variable or a custom expression (click **Value**) | covered | variables.md#change-a-variable-from-logic | **Value** label `expression_statement_field.dart:110`. |
| 4.17 | Create a variable from a widget property (**Create Variable**), rename later | covered | variables.md#show-a-variable-in-a-widget | |
| 4.18 | Closing sentence | not useful | | Filler. |

## 5. `vars-params-functions/local-parameter.mdx` (Local parameters)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 5.1 | Params pass information into a screen or component from outside | covered | parameters.md intro | |
| 5.2 | Analogy: like filling out a form before entering a place; a News Details screen needs a title, image and description | added | parameters.md intro | |
| 5.3 | Params are like input fields; they don't change after they're set | covered | parameters.md intro | No **Set** for final params (`expression_statement_field.dart:16-21`). |
| 5.4 | They help show the right data (a cart card needs name, price, image) | covered | parameters.md intro | |
| 5.5 | When you need params: a screen needs outside data; a component needs data from its screen | added | parameters.md#when-to-use-a-param | |
| 5.6 | Create: select → Variables panel → **+** next to Params → name, type, default | covered | parameters.md#add-a-param | 3.13 section title **Params** (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:278`). |
| 5.7 | Default value is used when nothing is passed (e.g. a default image) | covered | parameters.md#add-a-param | |
| 5.8 | Quick way: property → **Create a Param** | covered | parameters.md#create-a-param-from-a-property | 3.13 label **Create Param...** (`field_link_menu.dart:370`). |
| 5.9 | Link a param to a widget: property → Locals → the param | covered | parameters.md#use-a-param-in-a-widget | |
| 5.10 | The param must match the widget's expected type (Text expects a String) | added | parameters.md#use-a-param-in-a-widget | `link_menu.dart:158`. |
| 5.11 | Pass data when navigating: Navigator node → brush → type, link, or custom expression | covered | parameters.md#pass-values-when-you-navigate → navigation.md#use-the-navigator | |
| 5.12 | Why params in components: reusable cards, screens send data to components | covered | parameters.md intro, #pass-values-to-a-component | |
| 5.13 | Pass data to a component: drag it onto a screen, select it, fill the param values (type, or link a variable, param, expression) | covered | parameters.md#pass-values-to-a-component | |
| 5.14 | Without a value, widgets linked to the param can show null errors; fix with a default or by passing a value (that copy only) | added | parameters.md#pass-values-to-a-component | Board shows placeholders (`packages/core/lib/src/interpreter/mock.dart`), but a linked empty value is read with `!` (`packages/core/lib/src/interpreter/block_tree.dart:3359-3366`) and types are nullable (`nowa_fields.dart:701-708`), so the running app can fail. |
| 5.15 | Example: a Product Card component with a `product` param (type Product: name, img, price); link Text to `product.name`, price via `toString`; use it in a screen | added | parameters.md#example-a-product-card | Image link left out (Image source not re-verified). |
| 5.16 | FAQ: Do I always need params? Only for outside data | added | parameters.md#when-to-use-a-param | |
| 5.17 | FAQ: Can I change a param inside? No, use a variable | covered | parameters.md intro | |
| 5.18 | FAQ: No value and no default → null errors; board values are for testing only, the app doesn't use them | covered | parameters.md#pass-values-to-a-component | "These values are saved with the board for previewing. Your app doesn't use them." |
| 5.19 | FAQ: A screen or component can have several params | added | parameters.md#add-a-param | Each **+** adds one (`declaration_list_widgets.dart:277-307`). |
| 5.20 | FAQ: Rename or delete in the Variables panel | covered | parameters.md#rename-retype-or-remove-a-param | |
| 5.21 | Summary bullets | not useful | | Duplicates. |

## 6. `vars-params-functions/global-states.md` (Global states)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 6.1 | A global state holds data any screen or component can use: carts, sessions, settings | covered | global-state.md intro | |
| 6.2 | "Behaves just like `ChangeNotifier` in Flutter" | dev-only | for-code `#global-state` | The new page's "Under the hood" line moved too (R1 example). |
| 6.3 | Use cases: e-commerce cart (items, total, addToCart/removeFromCart), water tracker, user auth, theme toggle | added | global-state.md intro | |
| 6.4 | Create: Files → **+** next to `lib` → New Global State → name; Class (CapitalCase) and Path (file name) | covered | global-state.md#create-a-global-state | 3.13: **Library** → **Add** → **New Global State...** (`lib/project/panels/files_panel/add_lib_menu.dart:68-76`). |
| 6.5 | Alternative: Variables panel with nothing selected → Globals → **Create global state** | covered | global-state.md#create-a-global-state | `packages/core/lib/src/state_management/global_state_widgets.dart:85-90`. |
| 6.6 | Naming note (Class = class name, Path = file name) | covered | global-state.md#create-a-global-state | |
| 6.7 | Click once on the file to open its editor | obsolete | | 3.13: double-click or Enter in the Library; a click shows the details card (`research/changes-3.13.md` C2/C3, `lib/project/panels/library_panel/library_host.dart:147-154`). Page has the 3.13 steps. |
| 6.8 | Add variables (name, type, default, final) and functions | covered | global-state.md#add-variables-and-functions | |
| 6.9 | Example: `cartItems` list of Product, `addToCart(Product product)` | covered | global-state.md#add-variables-and-functions | |
| 6.10 | Final variables can't change later (a global state is a single instance, unlike models) | covered | global-state.md#add-variables-and-functions | "Keep **Is Final** off for a variable your functions will change", now with the reason. |
| 6.11 | You must add (attach) the global state to the app, or it won't show when linking | covered | global-state.md#attach-or-detach-a-global-state | 3.13 attaches automatically on create (`add_lib_menu.dart:70-74`, `global_state_widgets.dart:30-36`). |
| 6.12 | Link a widget to a global variable: property → Globals → state → variable (ListView's list) | covered | global-state.md#use-a-global-state | |
| 6.13 | Link each list item's `product` param to `element` | covered | reference/widgets/lists.md (step 4, components as items) | |
| 6.14 | The UI doesn't update by itself when the list changes | covered | global-state.md#add-variables-and-functions | `notifyListeners`. |
| 6.15 | `notifyListeners` lives in the global state's own functions, under Locals | covered | global-state.md#add-variables-and-functions | `packages/core/lib/src/state_management/provider_blocks.dart:45-59`. |
| 6.16 | Example: `addToCart` adds `product` to `cartItems`, then `notifyListeners` | covered | global-state.md#add-variables-and-functions | |
| 6.17 | Access scope: its own members under Locals | covered | global-state.md#use-a-global-state | |
| 6.18 | Access scope: other global states under Globals inside a global state | obsolete | | GLOBALS lists global states only inside screens and components (`global_state_suggestions.dart:70-74`). |
| 6.19 | Warning: don't call `notifyListeners` from outside; change values through the global state's functions | added | global-state.md#add-variables-and-functions | Plain-words best practice; `notifyListeners` is a member of every global state (`provider_blocks.dart:59`). |
| 6.20 | Call a global function: Circuit → Globals → state → Details **+** → function; fill params; store the result | covered | global-state.md#use-a-global-state | Store result line added. |
| 6.21 | Example video: Add-to-cart icon in a product item component, `addToCart(product)`, snackbar, cart screen updates | added | global-state.md#example-an-add-to-cart-button | |
| 6.22 | Water Tracker tutorial (YouTube from 7:58) | not useful | | Pure media, old UI. |
| 6.23 | When global state helps: shared data, no manual passing between screens, automatic updates | added | global-state.md intro | |

## 7. `vars-params-functions/functions/create-local-function.mdx` (Create a screen function)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 7.1 | What a function is and why: reusable blocks, organized, easier to fix, no repetition; inputs (params) and outputs (results) | added | functions.md intro | Explanation with a recipe comparison (R8). |
| 7.2 | What you can do: local functions, override lifecycle functions (initState), event functions, global-state functions | covered | functions.md, events.md, global-state.md | |
| 7.3 | Create: select → **+** next to Functions → rename → return type (void) → **Edit** → params on the top node → Return | covered | functions.md#add-a-function, #add-parameters-and-a-return-value | |
| 7.4 | Example: Celsius to Fahrenheit, called from On Pressed | covered | functions.md#add-parameters-and-a-return-value, #call-a-function | |
| 7.5 | A local function is under Locals, only inside its screen or component | covered | functions.md#call-a-function | |
| 7.6 | Callback: create a param from an event so another function can be passed in | covered | events.md#reuse-a-function-or-let-a-parent-decide; parameters.md#create-a-param-from-a-property | The word "callback" is now explained on events.md. |
| 7.7 | For app-wide use, put the function in a global state | covered | functions.md#call-a-function | |
| 7.8 | Fill a function's params: type values or link variables/expressions | covered | functions.md#call-a-function | |
| 7.9 | Store a returned value: new or existing variable | covered | functions.md#call-a-function, circuit.md#store-result | |
| 7.10 | Summary | not useful | | Duplicates. |

## 8. `vars-params-functions/functions/events.mdx` (Events)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 8.1 | Events run on their own when something happens; normal functions must be called | added | events.md intro | |
| 8.2 | Add: select → Details → **+** next to the event → function created → edit in Circuit | covered | events.md#add-logic-to-an-event | |
| 8.3 | Button `onPressed`: e.g. go to another screen or submit a form | added | events.md#events-youll-use-most | Use-case column. |
| 8.4 | TextField `onChanged`: e.g. update search results as the user types | added | events.md#events-youll-use-most | Flutter SDK `packages/flutter/lib/src/widgets/editable_text.dart:1406-1408`. |
| 8.5 | `onTap` (GestureDetector, ListTile, InkWell) | covered | events.md#events-youll-use-most | **List Tile** row added (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:817-826`; reference/widgets/index.md). |
| 8.6 | `onLongPress` | covered | events.md#events-youll-use-most | Buttons. |
| 8.7 | `onSubmitted` (TextField, pressing Enter) | covered | events.md#events-youll-use-most | When it runs added (`editable_text.dart:1457-1458,1477-1478`). |
| 8.8 | `onHover` (MouseRegion) | covered | events.md#events-youll-use-most | Buttons have **On Hover**; there's no MouseRegion wrapper (`packages/core/lib/src/wrappers_to_add.dart`). |
| 8.9 | `onFocusChanged` (FocusNode), `onScroll` (ScrollController) | obsolete | | Not offered: no Focus or scroll-listener wrapper or event field in 3.13 (`wrappers_to_add.dart`; no `onFocusChange`/`onScroll` field in `packages/core/lib/src/fields/`). Generic Flutter list. |
| 8.10 | Remove: click the event name → **Detach**; or right-click → **Detach** | covered | events.md#remove-an-events-logic | 3.13: right-click shows **Reset to default** / **Set to null** (`packages/core/lib/src/fields/block_field.dart:836-841`); **Detach...** is in the link menu (`field_link_menu.dart:357-363`). |
| 8.11 | Detaching keeps the function, so you can reuse it | added | events.md#remove-an-events-logic | Detach/Reset only change the event field (`block_field.dart:702-713`); a function from the Functions list stays. |
| 8.12 | Summary | not useful | | Duplicates. |

## 9. Extra: `vars-params-functions/functions/override-functions` (no file extension, never built)

| # | Item | Status | Where / evidence | Note |
|---|---|---|---|---|
| 9.1 | initState runs when the screen loads (load data, start animations, fetch from an API); dispose runs when it's removed (stop timers, listeners) | covered | functions.md#lifecycle | |
| 9.2 | Steps: **+** next to Functions → initState/dispose → **Edit** → keep the node with the same name, add nodes below | covered | functions.md#lifecycle | Corrected: steps go **below** `initState` and **above** `dispose` (Flutter SDK `packages/flutter/lib/src/widgets/framework.dart:1004-1005,1299-1300`). The page used to say "above or below". |
| 9.3 | These usually take no params and return nothing; for that, make a function and call it from initState | added | functions.md#lifecycle | Return Type locked (`packages/core/lib/src/widgets/code/variable_widgets.dart`, override check); call your own function from it. |
| 9.4 | Example: start a counter with a Timer in initState | covered | logic/actions.md#create-objects (Timer → periodic, cancel in a Dispose Function); functions.md#lifecycle links it | |

## Totals

| Status | Count |
|---|---|
| covered | 81 |
| added | 37 |
| obsolete | 4 |
| not useful | 10 |
| dev-only | 2 |
| for other page | 0 |
| **Total items** | **134** |

Added items by page: circuit.md 16, parameters.md 7, variables.md 4, global-state.md 4, events.md 4, functions.md 2.
index.md gets no old-page item of its own (it summarizes 2.1 and 3.1 in its table). See `P14-B06-notes.md` for the wording
and refs.
