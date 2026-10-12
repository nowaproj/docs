# P14-B07 for-code hand-off

Code-only facts for `docs/code/generated-code.md`, grouped by its anchors. Two kinds of bullets:
- **Moved**: copied unchanged from one of my pages (`docs/logic/...`), with the page it came from.
- **Old docs (dev-only)**: still valid, code-level information from an old page that the main pages leave out, with
  the old page and the code ref that confirms it (wording is mine, as the old text was outdated).

## #actions-and-popups

- Moved from `docs/logic/actions.md` ("Find any other function" table, MATERIAL row; `showAboutDialog` stays on the
  page): "| **MATERIAL** | Dialogs, sheets and pickers, plus `showMenu`, `showSearch` and `showAboutDialog`. |"
  (`showSearch` needs a `SearchDelegate` written in code.)
- Moved from `docs/logic/actions.md` (same table, DART:ASYNC row; `Timer` stays on the page):
  "| **DART:ASYNC** | `Timer`, `unawaited` and `scheduleMicrotask`. |"
- Moved from `docs/logic/actions.md` (same table, PACKAGE row; rewritten on the page as "Functions from your own
  project, and your keys and constants under `AppConstants`"): "| **PACKAGE:** and your package name, such as
  `PACKAGE:MY_APP` | Functions you wrote and classes with static members, such as `AppConstants`. See [Keys and
  constants](../integrations/constants.md). |"
- Moved from `docs/logic/actions.md` (paragraph under the table): "A package you add brings its own category. The
  library categories list functions and classes that have static members. To make an object from any other class, use
  **Create...**."
- Old docs (dev-only), from `old-docs/logic/common-functionalities/media-picker.md`: `showMediaPicker` returns a
  `Future<List<XFile>>`. `XFile` is the cross-platform file type of the `image_picker` package (it has the file's path
  and name, and `readAsBytes()` for its data). Nothing picked gives an empty list. Refs:
  `packages/nowa_runtime/lib/src/media_picker/media_picker.dart:1-36`, `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:640-648`.
- Old docs (dev-only), from `old-docs/logic/ui-popups/snackbar.md`: **Show snackbar** inserts
  `ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Hello World')))`. **Store result** keeps the
  returned `ScaffoldFeatureController<SnackBar, SnackBarClosedReason>`, whose `closed` future completes when the bar
  goes away. Ref: `packages/core/lib/src/state_management/global_state_suggestions.dart:6-21`.
- Old docs (dev-only), from `old-docs/logic/common-functionalities/print.md`: the `print` node is Dart's `print()` in the
  generated code, so when you run the app from VS Code (or another IDE) its messages also show in that IDE's debug
  console. In the editor (Play), Nowa's interpreter sends them to the **Logs** tab instead. Refs:
  `packages/core/lib/src/interpreter/libraries/dart_core_library_custom.dart:3-8`, `packages/core/lib/src/utils.dart:19-21`.
- Old docs (dev-only), from `old-docs/logic/common-functionalities/platform-checking.md`: `checkPlatform` inserts
  `NPlatform.isWeb` from `nowa_runtime`. Checks can be combined in a custom expression, for example
  `NPlatform.isAndroid || NPlatform.isIOS`. Members: `isWeb`, `isMacOs`, `isWindows`, `isLinux`, `isAndroid`, `isIOS`,
  `isDesktop`, `currentPlatform`. Refs: `packages/core/lib/src/state_management/global_state_suggestions.dart:55-59`,
  `packages/nowa_runtime/lib/src/nowa_platform.dart:1-40`.

## #variables-and-functions

- Old docs (dev-only), from `old-docs/logic/common-functionalities/print.md`: the `$` menu writes Dart string
  interpolation, `${name}`. When you type in code yourself, `$name` works for a plain variable, and anything with a dot
  or a call needs braces: `${textController.text}`, `${getName()}`. Ref: `packages/core/lib/src/fields/interpolated_text_field.dart:41-90`.
