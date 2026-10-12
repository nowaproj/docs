# P14-B06 verify: logic overview, events, variables, Circuit, parameters, global state, functions

Verifier: P14-B06-V. Diff reviewed: `git diff origin/main` for the seven `docs/logic/` pages (section pass `a18cb1a`).
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). "Flutter SDK" refs are the local SDK at
`/home/user/flutter` (`packages/flutter/lib/src/...`), whose doc comments are the api.flutter.dev text.

## Summary

- Pages checked: 7 (`index.md`, `events.md`, `variables.md`, `circuit.md`, `parameters.md`, `global-state.md`,
  `functions.md`), every `+` and `-` line of the diff, plus the unchanged text for the audience rules.
- Claims checked: about 165 added or changed claims (labels, node titles, menu categories, steps, behavior).
- Fixed: 10 (8 on circuit.md, 1 on variables.md, 1 on functions.md). Removed: 1 example (**clear** as an "Action").
- Facts restored: 2 (global-state.md: where a global state made from the **Variables** panel lands; AppState's folder).
- Warning added: 1 (functions.md: don't turn on **await** inside **InitState Function**; code and Flutter SDK evidence).
- Audience fixes (R3/R4): 5 glosses (`while`, packages, `HapticFeedback`, `${error}` how-to, "is at least").
- Routed items: B13 (1, applied), B07 (2, applied), B08 (1, checked, no change needed).
- Links/anchors: 0 problems (own checker, files and anchors); all `{#id}` and implicit anchors from `origin/main`
  still exist; front matter parses; ≤1 admonition per page; no H1, `---` rules, hype words or emoji; images and videos
  identical to `origin/main`; `_rewrite/tools/site-checks.py`: 0 problems; `audience-check.py`: 1 hit, kept (see
  circuit.md).
- For-code file: the 8 moved facts are copied unchanged under allowed anchors (`#variables-and-functions`,
  `#global-state`). I added one code-level note (initState and await) under `#variables-and-functions`.

## The writer's flagged items

| Flag | Verdict | Source | Note |
|---|---|---|---|
| If concept text (yes/no question, True right / False left, empty branch OK, steps below run unless the branch ends with Return, no else-if/switch node) | ok | `packages/code/lib/src/models/if_node.dart:34,61-68,84-85,114-128`; `add_statement_menu.dart:69-76` | |
| Condition starts as a switch that's on; off = False always | ok | `add_statement_menu.dart:72` (`SimpleBlock(true)`); `statement_fields.dart:41-49` | |
| Condition sources: LOCALS variable/param, **Create Variable...**, global state value, function, OPERATORS, **checkPlatform**, **Custom Expression...**, **Compute...** | ok, 2 fixed | `field_link_menu.dart:241-279,322-377` (If condition's parent is a statement, so every category shows: `:341`, `block_tree.dart:1742`); `link_menu.dart:139-160` | Fixed the global-state paths: after you pick the global state, the menu itself lists its members (type mismatch), there is no **+** step. |
| If example `greaterThanOrEqual`, **Type**, **Left side**, **Right side** | fixed | `link_menu.dart:139-160` and `field_link_menu.dart:166-186` (an operator pick closes the menu); `expression_field.dart:91-109` (`BFBinaryExpr`: the field shows the formula as a button that opens the popup); `expression_details.dart:249-326` | Added the missing step "the Condition now shows a formula: click it to open its popup", and "Set **Type** first (changing it resets both sides)". |
| Try concept text (error/exception, On Error on the left, rest of the try steps skipped, steps below the Try run either way unless a Return) | ok | `try_node.dart:28,38-44,61-66,102-130`; Dart try/catch semantics | |
| "A step inside a Try needs **await**, or the Try can't catch its failure" | ok | Flutter SDK `bin/cache/dart-sdk/lib/async/future.dart:92-113` ("an asynchronous error that no-one is awaiting is an uncaught error"); `future_options.dart:10-31,45-77` (**onValue**/**onError** become `then(..., onError:)`) | Wording on the page is accurate. |
| On Error suggestions (**Show snackbar** in GLOBALS, `showDialog`/`showModalBottomSheet` in MATERIAL, `print` in DART:CORE with `${error}`) | ok, audience fix | `global_state_suggestions.dart:65`; `block_tree.dart:1918-1923` (`error`, an Object); `docs/logic/popups.md`, `docs/logic/actions.md` | Added how to insert `${error}` (type `$`, pick `error`). |
| Kinds of nodes table | fixed | `store_result_field.dart:66-78,92`; `shared_preferences_library.dart:128-133` (`clear` returns `Future<bool>`) | **clear** hands back a value (a Future), so it shows **Store result** and **Future Options**: removed it from the "hands nothing back" examples. `print` and **refresh** stay. |
| "Read a circuit" walk-through | fixed | `suggestion.dart:481-503`; `expression_details.dart:415-482` (**get** has **Type**/**Key**, `getString` by default); `expr_node.dart:37-56` + `expr_helper.dart:8-26` (node titles: `getInt`, **Set dailyGoal**, **refresh**); `if_node.dart:36` (subtitle shows `savedGoal != null`) | The node a reader sees is titled `getInt`, not "get", and a number needs **Type** `int`: said so in step 1. |
| Product-card example (parameters.md) | ok | `link_menu.dart:139-160`, `field_link_menu.dart:166-186` (mismatch opens the members: `product` → `name`; `price` → `toString`); `nowa_fields.dart:695-708`; `docs/logic/models.md` "Use a model as a type" | Not run in the UI; every step matches the code. |
| Add-to-cart example (global-state.md) | ok | `widgets_to_add.dart:243-244` (**Icon Button** starts with an On Pressed function); `global_state_suggestions.dart:70-74`; `block_field.dart:913-925` (node expression with **+**) | Not run in the UI; matches the verified "Use a global state" flow. |
| "In a lifecycle function, steps go below `initState` and above `dispose`" | ok, clarified | Flutter SDK `widgets/framework.dart:1004-1005,1299-1300`; `declaration_list_widgets.dart:459-476` (`super.initState()` / `super.dispose()`); `circuit_node.dart:138` (the top node's dot inserts at the start), `statement_node.dart:18-23` (a node's dot inserts after it) | Added which dot to click for each. |
| Changed reason for "Disabling button will remove your function, use compute instead" | ok | `button_fields.dart:103-117` (switching off sets **On Pressed** and **On Long Press** to empty, so Nowa refuses when either has steps); `:239-282` (**Compute** wraps the logic in a condition, logic kept) | |

## index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro, "picking steps from menus", no programming background | ok | | Conceptual. |
| Quantity **+** example (On Pressed, Set + **refresh**, linked text) | ok | same flow as variables.md | |
| "The pieces" rows incl. Condition (If), Error handling (Try) | ok | circuit.md sections | |
| "Which one do I need?" table, Shared Preferences row | ok | `docs/guides/data-and-state-tips.md` "Pick where each value lives"; `docs/logic/actions.md#save-values-on-the-device` | Consistent. |
| "Real app code that you own ... code mode" | ok | | Replaces the old Dart line (no fact lost). |

## events.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Event vs function (runs by itself) | ok | | Conceptual. |
| Steps kept after closing Circuit; undo brings removed logic back | ok | `block_field.dart:836-841` (field menu changes are undo records) | |
| Node shows `onPressed` and `ElevatedButton` | ok | `node_widgets.dart:167-174`; `widgets_to_add.dart:233-235` (**Button** is an ElevatedButton) | |
| Snackbar and **Play** glosses | ok | | |
| Events table: labels and "runs when" | ok | Flutter SDK `widgets/editable_text.dart:1406-1408,1457-1458,1477-1478`, `material/button_style_button.dart:109,118-122`; **List Tile** `widgets_to_add.dart:817-826`, `docs/reference/widgets/lists.md#list-tile` | |
| **On Hover** `value` true/false (routed from B13) | applied | Flutter SDK `material/button_style_button.dart:118-122`; `material_library.dart:11647` (`void Function(bool value)? onHover`) | Wrote it as "Its param `value` is true when the pointer arrives and false when it leaves"; the page already explains params as "the values the event hands you". |
| Enabled switch reason, **Compute** keeps logic, `formIsReady`, detach | ok | `button_fields.dart:103-117,150-282` | |
| "Developers call this a callback", product-card example | ok | `field_link_menu.dart:188-208` (**Create Param...** on an event) | |
| A function from the **Functions** list stays after removing the event's logic | ok | `field_link_menu.dart:292-300`, `block_field.dart:702-713,836-841` | |

## variables.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| A variable can steer an If only; belongs to its screen | ok | `suggestion.dart:588-633`; `global_state_suggestions.dart:23-74` | |
| "What variables are good for" table | ok | `nowa_fields.dart:686` (basic types), models via **show more...** | |
| Types table "For example" column, `DateTime` gloss | ok | | |
| Type must fit; a mismatched pick shows what's inside | ok | `link_menu.dart:139-160`; `type.dart:144-158` (match by name, so `int?` fits `int`) | |
| "Link the number, click the **+** after it and pick `toString`" | fixed | `field_link_menu.dart:166-186` | After you pick a number for a text property, the menu itself moves to the number's members, so the example now says "click your number variable, then pick `toString` in the list that follows", and the **+** after a linked value is mentioned as the way back (expressions.md#plus). |
| Counter "+1": **Value** → **EXPRESSIONS** → **Math**, **Type**, `plus`, **Left side**, **Right side** | ok | `expression_statement_field.dart:16-58,101-111` (**Set counter**, **Value**); `field_link_menu.dart:324-345` (the Value field gets LOCALS, GLOBALS, EXPRESSIONS); `suggestion.dart:536-546` (**Math** when the type isn't bool); `field_link_menu.dart:166-171` (an expression pick opens its popup); `expression_details.dart:249-326` | |
| Store result handy for a picked date or an answer; local variable gloss; Is Final gloss | ok | `store_result_field.dart` | |
| Removed: stateful component line | ok (moved) | for-code `#variables-and-functions` | Nothing for the reader to do. |

## circuit.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro, recipe image, "every circuit is one function" | ok | | |
| "Your changes apply as you make them" | ok | `circuit_actions.dart:7-49` (edits are recorded at once, no apply step) | |
| Five top items, categories closed, open while searching; `snack`/`date` search | ok | `add_statement_menu.dart:60-120`; `link_menu.dart:84-87,181-206` | |
| **PACKAGE:** row | fixed (routed from B07, merged) | `suggestion_service.dart:9-29`, `suggestion.dart:640-669` (top-level functions, classes with statics, singletons); `packages/data/lib/src/api/model/api_collection.dart:41-46` (REST collections are singletons); `app_constants_template.dart` (`AppConstants`) | Now: REST requests, keys and constants under `AppConstants`, and functions in a file of their own. |
| Library row, `openUrl`, `print` glosses | ok, audience fix | `nowa_runtime_library.dart:11`; `docs/logic/actions.md` | Added "(add-ons)" for packages (R4). |
| OPERATORS names (`plus`, `divide`, `greaterThan`, `equal`, `logicalAnd`, `logicalOr`) | ok | `block_tree.dart:2383-2404`; `suggestion.dart:265-286` (names = enum names) | |
| GLOBALS row glosses, SHARED PREFERENCES row, GENERAL (**Create...**, **parse**), EXPRESSIONS (**Conditional**, **ifNull**) | ok | `global_state_suggestions.dart:29-67`; `suggestion.dart:476-560` (no **Math**/**Logical** in the add-node menu: no expected type) | |
| `HapticFeedback` | audience fix | | Added "(short vibrations)". |
| Kinds of nodes | fixed | see flags above | |
| Store result shows only for nodes that hand something back | ok | `store_result_field.dart:66-92` | |
| Read a circuit | fixed | see flags above | |
| Undo brings a removed node back | ok | `circuit_actions.dart:7-23`, `circuit_commands.dart:10-33` | |
| Function node table glosses, `value` for On Changed | ok | | |
| Wait for a result: Future gloss, **await**/**onValue**/**onError**, `value` | ok | `future_options.dart:6-111` | "Makes the function async" moved to for-code (code mechanics). |
| Branch with If, Set the condition, example | ok / fixed | see flags above | |
| Handle errors with Try, list, example with REST request | ok | see flags above; `docs/integrations/rest-api/index.md#use-a-request-in-your-app` | |
| Return: ends the function, stopping early | ok | `add_statement_menu.dart:33-43` (plain `return` in a void function) | |
| Loops: AI prompt | fixed | `block_to_circuit_visitor.dart:24-89` (no `for`); `block_visitor.dart:217` (throws); `code_provider.dart:58-65` (no error handling) | The prompt ("add up the price of every item") would likely get a `for` loop, which Circuit can't draw, while the page then sends the reader to Circuit. The prompt now asks for `forEach`. |
| `while` loop, **While** node, **True**, **Condition** | ok, audience fix | `while_node.dart:33-52`; `statement_fields.dart:13` | Added a gloss for `while`. |
| Hot Fix: `showMediaPicker` needs camera and photo library permission | fixed (reduced) | `function_info.dart:56-70` (photo library, camera, microphone, Android storage) | Now "needs permissions such as access to the camera and the photo library". |
| **Dependencies**, **Permissions:**, **Packages:**, **Hot Fix**, section title opens settings | ok | `expression_dependencies.dart:38-120` | |
| Audience check hit `items.removeAt(0)` | kept | | It's the formula the reader types in **Add Custom Expression**, explained in place (R3). |
| Routed from B08: PACKAGE:/`AppConstants` only in the **+** menu, not in a step's argument fields | checked, no change | `field_link_menu.dart:341` (`showGlobals` only when the field's parent is a statement) | circuit.md mentions **PACKAGE:** only in the add-node menu's category table; no page of this batch tells readers to pick a constant into an argument field. The If **Condition** (a statement-level field) does get every category. |

## parameters.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| News-app analogy, When to use a param | ok | | Conceptual. |
| "Add as many params as you need" | ok | `declaration_list_widgets.dart:277-307` | |
| Type must fit; mismatch shows what's inside | ok | `link_menu.dart:139-160` | |
| Empty param fine on the board, can fail in the running app | ok | `nowa_fields.dart:701-708` (types picked in Nowa are nullable); `block_tree.dart:3344-3366` (`!` where a value is required); `mock.dart` | |
| Board preview values "for previewing only" | ok | unchanged fact | |
| Example: a product card | ok | see flags above | |
| Navigate intro sentence; InitState gloss | ok | | |

## global-state.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Use cases list (cart, user, dark mode, water tracker) | ok | | Conceptual. |
| Library **New Global State...** creates it in `globals` and attaches it | ok | `lib/project/panels/files_panel/add_lib_menu.dart:68-76` | |
| **Create global state** (Variables panel) attaches right away | ok | `global_state_widgets.dart:17-41` | |
| Removed "That file goes in `lib`" | restored (plain words) | `global_state_widgets.dart:23,28` (`libDir`); `packages/core/lib/src/library/library_service.dart:221-241` (a file at the `lib` root shows outside any folder) | The page sends readers to the `globals` folder to open a global state, but this one isn't there. Added: "it doesn't go in the `globals` folder: in the **Library**, it sits at the top level of your project, outside the folders." |
| Removed AppState path `lib/globals/app_state.dart` | restored (plain words) | `file_template.dart:34` | "**AppState**, in the `globals` folder." |
| `changeTheme` "switches between your themes"; link to generated-code `#global-state` | ok | allowed anchor | |
| Is Final reason | ok | | |
| Change values only through the global state's functions | ok | `provider_blocks.dart:45-59` | Practice, not mechanics. |
| **Pick global state** "one that's in your project but not attached yet" | ok | `global_state_widgets.dart:131-141` (Dart files under `lib`, minus attached ones) | |
| Store result step | ok | `store_result_field.dart` | |
| Example: an Add to cart button | ok | see flags above | |
| Notifier gloss | ok | | |

## functions.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Recipe intro, `addToFavorites`, `double` for a price, weather example, linking `celsius` | ok | | |
| "The last two leave the menu ... since each screen or component has one of each" | fixed (wording) | `declaration_list_widgets.dart:438-454` | Read as "already has"; now "can have only one of each". |
| "Closes for good" | ok | Flutter SDK `widgets/framework.dart:1286` | |
| Lifecycle order (below `initState`, above `dispose`) | ok, clarified | see flags above | |
| Return Type locked; build steps that need inputs/results as their own function | ok | `variable_widgets.dart:474-482` | |
| Missing warning: **await** inside **InitState Function** | added | `future_options.dart:10-31` and `declaration_runtime.dart:1555-1565` (turning on await makes the enclosing function async, overrides included); Flutter SDK `widgets/framework.dart:5948-5962` ("initState() returned a Future ... must be a void method without an `async` keyword", advice: call a separate method without awaiting it); `nowa_run_service_local.dart:54` (`flutter run`, debug) | The page tells readers to load data in **InitState Function** and, a section later, to turn on **await** for slow steps. Together that gives a red error screen when the app runs. Added: put waiting steps in a function of their own and call it with await off; plus a one-line pointer in "Wait inside a function". |
| Link text "Create objects" (routed from B07) | applied | `docs/logic/actions.md` heading "Wait, repeat and create objects {#create-objects}" | |
| "Wait inside a function": Future gloss, Return Type changes and changes back | ok | `declaration_runtime.dart:1557-1565` | "Makes the function async" moved to for-code. |

## Coverage spot checks

Obsolete rows (all 4 checked):
- 4.9 File Preview: confirmed gone (no "File Preview" string in `lib/` or `packages/`).
- 6.7 single click opens the editor: confirmed changed; double-click or Enter opens (`lib/project/panels/library_panel/library_host.dart:145-153`), a click shows the details card (research C2).
- 6.18 other global states under GLOBALS inside a global state: confirmed (`global_state_suggestions.dart:70-74` returns none outside a widget class).
- 8.9 `onFocusChanged`/`onScroll`: confirmed no Focus, scroll-listener or MouseRegion wrapper (`packages/core/lib/src/wrappers_to_add.dart`).

Covered rows sampled (12): 1.12, 1.13 (circuit.md: **Remove**, **Move up**, **Move down**, keys; `node_widgets.dart:85-95`), 2.2,
2.3 (circuit.md#branch-with-if), 3.4 (**Error name**), 4.14 (variables.md Set + **refresh**), 5.8 (**Create Param...**), 5.11
(navigation.md#use-the-navigator, brush icon), 6.5 (global-state.md **Create global state**), 6.13 (lists.md: `element` for
component items), 7.6 (events.md callback), 8.10 (events.md **Reset to default**/**Detach...**). All covered where cited.

## Open issues

- circuit.md is about 2,700 visible words, over the ~2,200 guidance. The writer's split proposal ("Make decisions and handle
  errors" as its own page) stands; not done (the brief says propose, don't split).
- What Circuit shows for a function with a `for` loop or `switch`: the circuit builder throws with no error handling
  (`code_provider.dart:58-65`), so the panel probably shows an error box. Not runnable here; the page only says Circuit
  can't draw it.
- Product issue for the orchestrator (not a docs page of this batch): Nowa lets **await** turn **InitState Function** async,
  which Flutter rejects in debug runs. The page now warns about it; it may deserve a line in
  `docs/troubleshooting/known-issues.md` or `_rewrite/product-issues.md`.
- The product-card, add-to-cart, If-operator and "read a circuit" flows were checked step by step in the code, not run in
  the app.
