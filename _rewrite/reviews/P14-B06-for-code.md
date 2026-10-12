# P14-B06 for-code: facts moved off the logic pages

Code-only facts taken off the batch pages (copied unchanged, with their source), plus still-valid code-level items from
the old docs (marked "old docs"). Anchors are the fixed ones on `docs/code/generated-code.md`. Code refs are relative to
`/home/user/nowa-master` (3.13.0).

## #variables-and-functions

- "Adding a variable to a component that had none turns it into a stateful component automatically. You don't have to do
  anything." (source: `docs/logic/variables.md`, "Add a variable"). Ref: `packages/core/lib/src/interpreter/widget_declarations.dart:407`
  (`addStateMember` creates the state class); `packages/core/lib/src/fields/field_link_menu.dart:260` uses it for
  **Create Variable...**.
- "The node gets a small clock badge, and Nowa makes the function async for you." (source: `docs/logic/circuit.md`,
  "Wait for a result"; the page keeps the clock badge). Ref: `packages/code/lib/src/fields/future_options.dart:10-31`
  (`updateAsync`), `packages/core/lib/src/interpreter/declaration_runtime.dart:1557` (`updateAsync` wraps the return type in
  `Future`).
- "Turn on **await** for such a node (under **Future Options**) and Nowa makes the function async for you." (source:
  `docs/logic/functions.md`, "Wait inside a function"; the page keeps the visible part: the **Return Type** changes to a
  `Future` and back). Same refs as above.
- Old docs (`logic/intro-circuit.md`, tip "See and modify the generated code by the Circuit"): Circuit edits are real Dart
  code. In a hybrid setup (local project open in an IDE), the function's file changes as you edit the circuit. Editing the
  function's code yourself updates Circuit too: an open Circuit panel rebuilds when the file is re-imported, and shows
  "Function was modified in code and could not find it" when the function can't be found any more. Refs:
  `packages/code/lib/src/circuit_plugin.dart:43-69`; code edits reach the board on save (`docs/code/code-mode.md`).
- Circuit can draw only these statements: expression statements, local variables, `if`/`else`, `try`/`catch` (one catch
  clause shown), `while` and `return`. Other statements, such as `for`, `switch` and `break`/`continue`, can't be drawn
  (the circuit builder throws). Refs: `packages/code/lib/src/models/block_to_circuit_visitor.dart:24-89`,
  `packages/core/lib/src/interpreter/visitors/block_visitor.dart:114-256` (`ThrowingBlockVisitor`: `visitForStatement`
  `:217`, `visitBreakStatement` `:232`, `visitSwitchStatement` `:256`). Keep functions you want to edit visually within
  those statements.
- Added by the verifier (P14-B06-V), the code-level reason behind the new caution on `docs/logic/functions.md`
  ("Run logic when a screen opens or closes"): turning on **await** inside **InitState Function** makes it
  `Future<void> initState() async`, because `FutureOptions.toggleAwait` calls `updateAsync()` on the enclosing function
  and `updateAsync` doesn't skip overrides (`packages/code/lib/src/fields/future_options.dart:10-31`,
  `packages/core/lib/src/interpreter/declaration_runtime.dart:1555-1565`). Flutter asserts in debug builds
  ("initState() returned a Future ... must be a void method without an `async` keyword"; Flutter SDK
  `packages/flutter/lib/src/widgets/framework.dart:5948-5962`), and Nowa's Run uses `flutter run` without a mode flag,
  i.e. debug (`packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:54`). The fix is a separate async
  function called from `initState` without `await`. The Return Type lock for overrides is only in the UI
  (`packages/core/lib/src/widgets/code/variable_widgets.dart:472-480`).

## #global-state

- "Under the hood, a global state is a Flutter `ChangeNotifier` that Nowa provides to your whole app." (source:
  `docs/logic/global-state.md`, intro; old docs `vars-params-functions/global-states.md` said the same: "Global state in
  Nowa behaves just like `ChangeNotifier` in Flutter"). Ref: `packages/core/lib/src/state_management/provider_blocks.dart:45-82`
  (`NotifierClassDecl`, `notifyListeners`); attaching adds a `ChangeNotifierProvider` inside the app's `MultiProvider`
  (`packages/core/lib/src/project/env_services/global_state_service.dart`, W6 refs).
- "Nowa creates the file in `lib/globals` and attaches it to your app." (source: `docs/logic/global-state.md`, "Create a
  global state", step 3). Ref: `lib/project/panels/files_panel/add_lib_menu.dart:68-76` (`globalsDir`).
- "You can also open the **Variables** panel with nothing selected, find **Globals** and click **Create global state**.
  That file goes in `lib`." (source: same section). Ref: `packages/core/lib/src/state_management/global_state_widgets.dart:17-41`
  (`dir: gProject.files.libDir`).
- "New projects already include a global state named **AppState** (`lib/globals/app_state.dart`)." (source: same
  section). Ref: `packages/core/lib/src/file_system/templates/common/app_state_template.dart` (W6 refs).
- "In the **Variables** panel with nothing selected, click **Pick global state** to attach one that exists in `lib`."
  (source: `docs/logic/global-state.md`, "Attach or detach a global state").
- Inside a screen or component's build, Nowa reads a global state with listening on; in functions and events it reads it
  with `listen: false` (research `features-logic.md` "Using global states"; `packages/core/lib/src/state_management/provider_generator.dart:4-17`).
  Not on the page before; listed here because it explains why widgets update and logic doesn't rebuild.

