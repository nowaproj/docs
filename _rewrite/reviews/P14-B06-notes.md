# P14-B06 notes: logic overview, events, variables, Circuit, parameters, global state, functions

Batch P14-B06 (phase 14). Pages under `/home/user/docs/docs/logic/`. Code refs are relative to `/home/user/nowa-master`
(3.13.0+1, `3cb32031c`). "Flutter SDK" refs point at the local SDK sources in `/home/user/flutter` (`058e0af2c`); they
are the doc comments published on api.flutter.dev / api.dart.dev (this environment can't reach those sites: DNS fails for
api.flutter.dev and dart.dev). Coverage: `P14-B06-coverage.md`. Moved facts: `P14-B06-for-code.md`.

Applied to every page: R1-R9 (R9 arrived mid-run, before any page was written, so every page was written with it).
No images, explicit heading IDs, URLs or file names were changed. Implicit anchors that other pages link to were kept
(checked with a script over `docs/`): variables.md `#open-the-variables-panel`, `#add-a-variable`, `#choose-a-type`,
`#show-a-variable-in-a-widget`, `#change-a-variable-from-logic`, `#rename-retype-or-remove-a-variable`; parameters.md
`#pass-values-to-a-component`; global-state.md `#rebuild-only-part-of-a-screen`, `#attach-or-detach-a-global-state`; plus
the explicit ones (`#add-a-node`, `#store-result`, `#future-options`, `#hot-fix`, `#lifecycle`). All relative links on the
seven pages resolve (scratchpad `checklinks.py`, files and anchors).

## circuit.md (Build logic in Circuit)

Length: about 2,670 visible words (was about 1,450). Over the ~2,200 mark: see "Split proposal" below.

What changed for the reader
- Intro rewritten around a recipe image (steps run top to bottom, Nowa writes the code). "Every circuit is one function"
  now says what a function is, since event functions have no name.
- **Open Circuit**: added that changes apply as you make them (research features-logic "Circuit": "Changes apply
  immediately"; Circuit edits go through the project's undo records, `packages/code/lib/src/circuit_workspace.dart`).
- Category table: the **PACKAGE:** row no longer says "static class members" (code jargon); it now names what the reader
  finds there: REST collection requests (`docs/integrations/rest-api/index.md` "Use a request in your app") and keys and
  constants (`docs/logic/actions.md` category table, `docs/integrations/constants.md`). R3 glosses added for library,
  `openUrl`, `print`, **checkPlatform**, **Media Query**, **Create...**, **parse**, **Conditional**, **ifNull** (meanings
  from `research/features-logic.md` and the B07 pages that document them). The SHARED PREFERENCES row now links
  actions.md#save-values-on-the-device.
- **Wait for a result**: "Future" explained (R4). Removed "Nowa makes the function async for you" (generated-code
  mechanics) → for-code `#variables-and-functions`. The visible consequence stays on functions.md (Return Type changes).
- **Set up the function node**: plain-words Return Type (`void` explained) and Params.
- Tone (R9): reasons and results added to steps (search tip, rename tip, undo reassurance, "a branch can stay empty").

Added from the old docs (coverage items) and their refs
- 1.8-1.11 **Kinds of nodes** table (action / value / both / branch). Labels: **refresh** `packages/core/lib/src/interpreter/suggestion.dart:617`;
  **clear** `suggestion.dart:484-485`; **Store result** shown only for nodes that return something
  (`packages/code/lib/src/fields/store_result_field.dart`, research "Store result" limits); **If Statement**
  `packages/code/lib/src/models/if_node.dart:34`, **Try** `packages/code/lib/src/models/try_node.dart:28`.
- 1.7 **Read a circuit, top to bottom**: the old "loadData" example rebuilt with 3.13 labels: SHARED PREFERENCES **get**
  (`suggestion.dart:481-503`; fields **Type**/**Key** `packages/core/lib/src/fields/expression_builder/expression_details.dart:432-462`),
  **Store result** → local variable (`store_result_field.dart:121-123`), **Set dailyGoal** (button **Set <name>**,
  `packages/code/lib/src/fields/expression_statement_field.dart:47-53`), **refresh**. "get gives nothing (null) when no
  value was saved" is SharedPreferences behavior (research "Shared Preferences": "the value is null if nothing was
  saved"). The sentence about **await** for slow steps follows Dart semantics (Flutter SDK
  `bin/cache/dart-sdk/lib/async/future.dart:85-92`).
- 2.1 What an If is, with everyday questions.
- 2.6 Switch on = True branch always, off = False branch always: the If is created with `SimpleBlock(true)`
  (`packages/code/lib/src/widgets/add_statement_menu.dart:72`); a constant condition picks the branch.
- 2.5 detail "unless that branch ends with a Return": a branch with a Return draws no line to the merge point
  (`if_node.dart:114-128`; `try_node.dart:102-130` for Try).
- 2.8 global state value under GLOBALS: global states are offered inside screens/components
  (`packages/core/lib/src/state_management/global_state_suggestions.dart:65-74`).
- 2.10 function that answers true/false: an If **Condition** is a statement-level field, so its link menu has every
  category (`packages/core/lib/src/fields/field_link_menu.dart:341`); picking a function inserts a call (not a reference)
  because the field isn't function-typed (`field_link_menu.dart:138-157`), so it runs when the flow reaches the If.
  GLOBALS → global state → **+** → function: research "Using global states" (link menu opens the members of a picked
  global state, `packages/core/lib/src/fields/link_menu.dart:158`, `field_link_menu.dart:175-179`).
- 2.12 example with `greaterThanOrEqual` (`packages/core/lib/src/interpreter/block_tree.dart:2391`), **Type**, **Left side**,
  **Right side** (`expression_details.dart:249-326`, documented on expressions.md#operators).
- 2.16 **Create Variable...** in the Condition's menu: `field_link_menu.dart:241-266` (creates a non-final screen or
  component variable of the field's type and links it; offered when the menu is at its top level and a class exists,
  `:366-377`).
- 3.1-3.3 what an error is, when to use Try (offline request, missing saved value, a calculation on typed text).
- 3.8 example (load products; **await**; snackbar). Try body runs straight down, **On Error** on the left
  (`try_node.dart:38-39,61-66`); rest of the try body is skipped after a failure and the code after the Try runs either
  way (Dart try/catch semantics; Circuit draws the merge point, `try_node.dart:41-44,86-130`). The **await** rule: "You
  use a normal try/catch to catch the failures of awaited asynchronous computations ... an asynchronous error that no-one
  is awaiting is an uncaught error" (Flutter SDK `bin/cache/dart-sdk/lib/async/future.dart:92-113`; same text on
  https://api.dart.dev/stable/dart-async/Future-class.html). **onValue**/**onError** become `then(onValue, onError: ...)`
  (`packages/code/lib/src/fields/future_options.dart:45-77`), so that step's failures go to its own **onError**.
  REST request as the example step: `docs/integrations/rest-api/index.md` "Use a request in your app".
- 3.9 what to put in **On Error**, with 3.13 categories: **Show snackbar** in GLOBALS (`global_state_suggestions.dart:65`);
  `showDialog`/`showModalBottomSheet` in **MATERIAL** (`docs/logic/popups.md`, research "showDialog..."); `print` in
  **DART:CORE** (`docs/logic/actions.md#write-to-the-logs`). The error variable is an `Object` named `error`
  (`packages/core/lib/src/interpreter/block_tree.dart:1918-1923`), so `${error}` works inside text.
- **Return a value**: "stops early" use: a void function gets a plain `return` (`add_statement_menu.dart:38-39`) and nothing
  can follow a Return (research "Add Return").

R5 (no-code path first)
- **Loops** now leads with a Nowa AI prompt and says how to check (open in Circuit, **Play**). New fact: Circuit can't draw
  loops other than `while` (`packages/code/lib/src/models/block_to_circuit_visitor.dart:24-89` handles return, if, while,
  try, expression and variable statements; `ThrowingBlockVisitor.visitForStatement` throws,
  `packages/core/lib/src/interpreter/visitors/block_visitor.dart:217`; no error handling around it in
  `packages/code/lib/src/circuit_plugin.dart:33-84`). The add-node menu has no loop item (`add_statement_menu.dart:60-120`).

Open questions
- What the reader actually sees when a function contains a `for` loop or a `switch` and is opened in Circuit (the circuit
  builder throws; the panel probably shows Flutter's error box). The page only says Circuit can't draw it.
- Circuit `forEach` flow (pick `forEach` after a list, then build the per-item steps) was not run in the UI; wording kept
  from the verified page.

Split proposal (not done, per the brief)
- Move "Branch with If" (with "Set the condition"), "Handle errors with Try" (with its example), "Return a value" and
  "Loops" to a new page, for example `logic/decisions.md` "Make decisions and handle errors" (about 1,150 words).
  circuit.md keeps opening Circuit, adding/reading/moving nodes, the function node, Store result and Future Options
  (about 1,500 words). None of the moving sections has an inbound anchor; the new page would need a sidebar entry after
  circuit.md, and circuit.md's intro and index.md's "Where to start" would link it.

## variables.md (Store data in variables)

Length: about 1,490 visible words (was about 1,110).

What changed for the reader
- Intro: what a variable is in everyday terms, that some variables only steer logic, and that a variable belongs to its
  screen or component (pointing to global state for shared values).
- Moved off: "Adding a variable to a component that had none turns it into a stateful component automatically. You don't
  have to do anything." (Flutter stateless/stateful mechanics, nothing for the reader to do) → for-code
  `#variables-and-functions`.
- Types table gained a "For example" column; `DateTime` and type names explained (R3). "Is Final" explained where it
  appears (tooltip "If true the variable cannot be changed", research "Global state variables and functions").
- **Change a variable from logic**: the counter example now says how to build "+1": **EXPRESSIONS** → **Math**, **Type**
  `int`, `plus`, **Left side** / **Right side**. Refs: a Set node's **Value** is a node input, so its link menu offers
  LOCALS, GLOBALS and EXPRESSIONS (`packages/core/lib/src/fields/field_link_menu.dart:341`); Math popup fields
  (`packages/core/lib/src/fields/expression_builder/expression_details.dart:249-326`, documented on
  expressions.md#operators); the page's screenshot shows `counter! + 1` as a **Math Expression**. Step 4 still says "type
  one, or link"; the **Set <name>** button and **Value** label: `packages/code/lib/src/fields/expression_statement_field.dart:47-53,110`.
- R9: reasons added (why pick a clear name, why the default matters, why refresh, what Store result is handy for, what
  the "is in use" dialog is for).

Added from the old docs
- 4.3 variables can steer logic only (an If): conceptual; links conditions.md#branch-with-if.
- 4.4 a variable belongs to its screen or component: screen variables appear under LOCALS of that class only
  (`packages/core/lib/src/interpreter/suggestion.dart:588-633`); GLOBALS shows global states, not other screens'
  variables (`packages/core/lib/src/state_management/global_state_suggestions.dart:23-74`).
- 4.5 "What variables are good for" table (old examples isLoaded/userID/cartItems, updated to `isLoading`, `searchText`,
  `quantity`, `tasks`): types from the basic list (`packages/core/lib/src/fields/nowa_fields.dart:686`) and models via
  **show more...**.
- 4.11 the type must fit the property: picking a value whose type doesn't match opens its members instead of linking
  (`packages/core/lib/src/fields/link_menu.dart:158`, `field_link_menu.dart:160-186`).

Kept as is (verified earlier, W6 refs): panel location and sections, `var1`, name rules, the t/r/v/f workaround
(`docs/troubleshooting/known-issues.md`), list default editor, Create Variable..., Store result, local variables,
remove dialog.

## parameters.md (Pass data with parameters)

Length: about 1,130 visible words (was about 710).

What changed for the reader
- Intro: the old "fill in a form before you go in" analogy and the news-article example (R8), plus "one design, different
  content".
- R9: reasons and results on steps ("design with sample content first", what the board preview values are for, what an
  InitState Function is when it's mentioned). Nothing was code-only on this page, so nothing moved.

Added from the old docs
- 5.2 analogy and news example (conceptual).
- 5.5 / 5.16 **When to use a param** (and when you don't need one).
- 5.19 "Add as many params as you need": each **+** adds another param named with a fresh symbol
  (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:277-307`).
- 5.10 type must fit: `packages/core/lib/src/fields/link_menu.dart:158` (type mismatch opens the members).
- 5.14 empty params can fail in the running app: types picked in Nowa are nullable
  (`packages/core/lib/src/fields/nowa_fields.dart:701-708`); a nullable value placed where a value is required is written
  with `!` (`packages/core/lib/src/interpreter/block_tree.dart:3359-3366`; the variables page screenshot shows
  `counter! + 1`), which fails when the value is empty; the board instead draws placeholders
  (`packages/core/lib/src/interpreter/mock.dart`, W6 refs). The page says "can show an error", not what the error looks
  like.
- 5.15 **Example: a product card**: model fields and a model-typed **Default Value** (`docs/logic/models.md` "Use a model as
  a type"); picking `product` then `name` / `price` then `toString` follows the type-mismatch rule above; instance fields
  named after params (`packages/designer/lib/src/details/widget_details.dart`, W6 refs); `element` from
  `docs/reference/widgets/lists.md#connect-a-list`. The old example also linked an Image to `product.img`; left out
  because the Image source flow wasn't re-checked (see reference/widgets/media.md).

Open questions
- The product card flow (model-typed param default editor, `toString` after `price` in a component) wasn't run in the UI;
  each piece is verified separately.

## events.md (Respond to taps and other events)

Length: about 1,000 visible words (was about 710).

What changed for the reader
- Intro: what an event is, with everyday moments, and how it differs from a function you call yourself (old 8.1).
- Node paragraph: `onPressed` and `ElevatedButton` explained as Flutter's names for the event and the widget (R3); the
  subtitle is the widget class of the call (`packages/code/lib/src/widgets/node_widgets.dart:167-174`).
- "Events you'll use most" is now a table with when each event runs and an example use (R8/R9).
- **Turn a button on or off**: now says why Nowa refuses (switching off sets **On Pressed** and **On Long Press** to empty,
  which would delete the logic, `packages/core/lib/src/fields/button_fields.dart:103-111`) and what **Compute** is for.
- R9 reassurance: steps are kept when Circuit closes; undo brings removed event logic back (field changes are undo
  records, `packages/core/lib/src/fields/block_field.dart:836-841`). Snackbar and Play explained where they appear.
- Nothing code-only on this page, so nothing moved.

Added from the old docs
- 8.1 events run by themselves (conceptual).
- 8.3 / 8.4 example uses for **On Pressed** and **On Changed**. "Runs when" wording follows Flutter's own docs: On
  Changed "when they have inserted or deleted text" (Flutter SDK `packages/flutter/lib/src/widgets/editable_text.dart:1406-1408`),
  On Editing Complete "user presses the 'done' button on the keyboard" (`:1457-1458`), On Submitted "done editing the text"
  (`:1477-1478`), On Hover "a pointer enters or exits the button" (`packages/flutter/lib/src/material/button_style_button.dart:118`),
  On Long Press (`:109`).
- 8.5 **List Tile** → **On Tap**: List Tile is a Library widget (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:817-826`)
  documented with **On Tap** on reference/widgets/index.md and logic/navigation.md.
- 8.11 removing the link keeps a function from the **Functions** list: **Detach...** calls `field.replace()` and **Reset to
  default** calls `field.remove()`, both change only the event field (`packages/core/lib/src/fields/field_link_menu.dart:292-300`,
  `block_field.dart:702-713,836-841`); the function is a class member and isn't touched.
- 7.6 "callback" named in plain words, with a product-card example of a parent deciding.

Checked and not added
- "Click the event's name and pick a function under LOCALS" (research "Events" step 3): when a type is expected, the link
  menu hides items whose type is void (`packages/core/lib/src/fields/link_menu.dart:90-93`), and a function suggestion's
  type is its return type (`packages/core/lib/src/interpreter/suggestion.dart:108-117`). A usual `void` function therefore
  isn't listed on an event's label, so the page keeps the Circuit way (add a node, **LOCALS**, the function).

## functions.md (Create functions)

Length: about 960 visible words (was about 740).

What changed for the reader
- Intro: the recipe comparison (ingredients = params, steps, dish = return value) and why functions help (one place to
  fix, reuse) (old 7.1, R8).
- Steps carry reasons and examples (`double` for a price, `addToFavorites` name, linking `celsius` when calling).
- **Lifecycle correction**: the page said to keep the `initState` / `dispose` node and "add your own steps above or below
  it". Flutter's rule is that `initState` starts with the built-in call and `dispose` ends with it: "Implementations of
  this method should start with a call to the inherited method, as in `super.initState()`" and "should end with a call to
  the inherited method, as in `super.dispose()`" (Flutter SDK `packages/flutter/lib/src/widgets/framework.dart:1004-1005,1299-1300`;
  https://api.flutter.dev/flutter/widgets/State/initState.html, https://api.flutter.dev/flutter/widgets/State/dispose.html).
  Nowa creates the node as `super.initState()` / `super.dispose()` (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:459-476`).
  The page now says: steps below `initState`, above `dispose`. "Closes for good" follows "removed from the tree
  permanently" (`framework.dart:1286`). One of each per screen: the menu items disappear once the member exists
  (`declaration_list_widgets.dart:438-454`).
- Moved off: "Nowa makes the function async for you" (from "Wait inside a function") → for-code
  `#variables-and-functions`. The visible consequence (Return Type becomes a Future and changes back) stays, with "Future"
  explained (R4).

Added from the old docs
- 7.1 what a function is and why (recipe, reuse, one place to fix).
- 9.3 (old `override-functions` file) lifecycle functions don't take inputs or return results: the page says the
  **Return Type** is locked (verified earlier, `packages/core/lib/src/widgets/code/variable_widgets.dart:467-500`) and
  advises building steps that need inputs as their own function called from **InitState Function**. It doesn't claim
  the Params list is locked (not verified).
- 9.4 timer example: linked to actions.md#create-objects (B07 page documents `Timer` → `periodic` and `cancel` in a
  Dispose Function).

## global-state.md (Share data across your app)

Length: about 1,220 visible words (was about 870).

What changed for the reader
- Moved off (R1/R2), copied unchanged to for-code `#global-state`: the "Under the hood ... `ChangeNotifier`" line (the
  brief's own R1 example), "Nowa creates the file in `lib/globals`", "That file goes in `lib`", the AppState path
  `lib/globals/app_state.dart`, and "attach one that exists in `lib`". In their place the page says what the reader sees or
  gets: the global state lands in the Library's `globals` folder (the Library shows `lib/` folders, `research/changes-3.13.md`
  C2; the page already used "the `globals` folder"), it's attached "so every screen can use it right away", and Pick
  global state attaches "one that's in your project but not attached yet". One link to
  `../code/generated-code.md#global-state` sits at the end of "Create a global state" (R2 allows one).
- **Create global state** in the Variables panel also attaches right away: `packages/core/lib/src/state_management/global_state_widgets.dart:30-36`
  (`addProvider` in the same undo step). Library **New Global State...** attaches after the file is created:
  `lib/project/panels/files_panel/add_lib_menu.dart:68-76`.
- `notifyListeners` explained in plain words at first mention (R3); "notifier" explained on **Notifier Builder** (R4).
- **Is Final**: reason added (a final variable keeps its starting value; tooltip "If true the variable cannot be changed",
  `packages/core/lib/src/widgets/code/variable_widgets.dart`, W6 refs).
- **Use a global state**: step 3 **Store result** for functions that return a value (old 6.20; Store result on any node
  that returns something, `packages/code/lib/src/fields/store_result_field.dart`).

Added from the old docs
- 6.3 / 6.23 use cases (cart with addToCart/removeFromCart, user, dark mode, water tracker) and why a global state helps
  (no handing values from screen to screen). Conceptual.
- 6.19 change values only through the global state's functions, ending with `notifyListeners` (the old warning against
  calling `notifyListeners` from outside, in plain words). `notifyListeners` is a member of every global state
  (`packages/core/lib/src/state_management/provider_blocks.dart:45-59`), so a screen could reach it through GLOBALS → the
  state → **+**; the page gives the practice, not the mechanics.
- 6.21 **Example: an Add to cart button** (the old video's flow): **Icon Button** starts with **Edit** on **On Pressed**
  (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart`, `'onPressed': FuncExpr()`, W5 refs); GLOBALS lists global
  states inside a component (`global_state_suggestions.dart:70-74`); **+** → function and inputs from LOCALS (as in the
  page's verified "Use a global state" steps); **Show snackbar** in GLOBALS (`global_state_suggestions.dart:65`). The last
  sentence relies on the verified rule that widgets reading a global state update on `notifyListeners`
  (`packages/core/lib/src/state_management/provider_generator.dart`, W6 refs). The old video's snackbar showed the product
  name; the page uses a fixed message because picking a model field through `$` wasn't verified.

Obsolete in 3.13 (not added)
- 6.7 single click opens the editor: a click shows the Library details card; double-click or Enter opens it
  (`lib/project/panels/library_panel/library_host.dart:147-154`).
- 6.18 other global states under GLOBALS inside a global state: `global_state_suggestions.dart:70-74` returns no global
  states when the scope isn't a widget class.

## index.md (How logic works)

Length: about 780 visible words (was about 510).

What changed for the reader
- Intro says what "visual" means here (picking steps from menus) and reassures that no programming background is
  needed (R9).
- The example is now a shop's quantity **+** button (same verified flow as before: **On Pressed**, Set + **refresh**, a text
  linked to the variable).
- "The pieces" table: plain-words definitions with everyday examples, and two new rows the brief asks every reader to
  understand: **Condition (If)** and **Error handling (Try)**, linking conditions.md#branch-with-if and
  conditions.md#handle-errors-with-try.
- New **Which one do I need?** table (when to use a variable, param, global state, function, If, Try, Shared Preferences),
  consistent with `docs/guides/data-and-state-tips.md` "Pick where each value lives" (B01's page) and linking it.
- "Everything you build is real Dart code in your project, which you can read in code mode" became "real app code that you
  own ... code mode shows it whenever you're curious" (no Dart vocabulary; same link). This is the one plain line that
  stands for old item 1.16 (the generated-code tip, moved to for-code).
- Nothing moved off this page.

No new product claims beyond the linked pages; the Design-mode sentence in the tip is unchanged (W5 ref:
`packages/ai/lib/src/ui/chat_field/mode_selector.dart`).

## For other pages

No content from my old pages belongs on another batch's page: every item landed on one of my seven pages, is already
covered elsewhere (cited in the coverage file), or moved to the for-code file.

FYI for the orchestrator (seen while checking links, not my pages, not edited):
- `docs/integrations/firebase/auth.md:28` links `notifications.md#set-up-notifications-for-iphone`, but
  `docs/integrations/firebase/notifications.md` has no such heading right now (B09's pages, possibly mid-edit).
- `docs/code/limitations.md` (B15) could carry the for-code fact that Circuit draws only expression statements, local
  variables, if/else, try/catch, while and return (see `P14-B06-for-code.md` `#variables-and-functions`); circuit.md now
  tells the primary reader that `for` loops can't be drawn.

## Summary

- Pages changed: all seven (`index.md`, `events.md`, `variables.md`, `circuit.md`, `parameters.md`, `global-state.md`,
  `functions.md`).
- Old-docs items: 134 audited (8 pages plus the unbuilt `override-functions` file): 81 covered, 37 added, 4 obsolete,
  10 not useful, 2 dev-only.
- Facts moved to the code section: 8 (2 from circuit.md/functions.md about async, 1 from variables.md, 5 from
  global-state.md), plus 3 code-level items from the old docs or research (Circuit/code sync, statements Circuit can draw,
  `listen: false`).
- Corrections to existing text: lifecycle order (functions.md), the reason behind "Disabling button will remove your
  function" (events.md).
- Open questions: what Circuit shows for a function with a `for` loop or `switch`; the product-card and add-to-cart flows
  are verified piece by piece, not run end to end; circuit.md is over ~2,200 words (split proposal in its section).
