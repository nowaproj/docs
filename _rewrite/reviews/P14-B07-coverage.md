# P14-B07 coverage: old logic pages (common functionalities, UI popups, data models)

Batch P14-B07. New pages: `docs/logic/{expressions,navigation,router,popups,actions,models}.md`.
Old pages: `_rewrite/old-docs/logic/common-functionalities/{media-picker,navigation,open-url,platform-checking,print}.md`,
`logic/ui-popups/{date-picker,dialog,snackbar,time-picker}.md`, `vars-params-functions/data-models.md`.

Code refs are `path:line` in `/home/user/nowa-master` (3.13.0, `3cb32031c`). C2 = grep of `docs/` (not `docs/new`,
`docs/legacy`). Status values as in the brief. "added" items carry the section they were added to; evidence for each is
repeated in `P14-B07-notes.md`.

## logic/common-functionalities/media-picker.md

| item | status | where / evidence | note |
|---|---|---|---|
| What the media picker does: pick an image or a video, from the gallery or the camera | covered | popups.md#pick-photos-or-videos | |
| Use case: pick an image and show it on the screen right away (full walk-through) | added | popups.md#pick-photos-or-videos ("Example: show a photo the person picks") | re-derived: Bytes tab `packages/core/lib/src/fields/basic_fields.dart:926-948`; picker returns a list `packages/nowa_runtime/lib/src/media_picker/media_picker.dart:4-36` |
| Image widget: set its source to **Bytes**, then create a variable from the **Bytes** field | added | same example, steps 1-2 | **Bytes** tab `basic_fields.dart:926-930`; **Create Variable...** `packages/core/lib/src/fields/field_link_menu.dart:374` |
| The variable's type `Uint8List` means raw image data | added | same example, step 2 (plain words, type name kept because the Variables panel shows it) | `basic_fields.dart:942` (`Uint8List` default) |
| Add the node from a button's On Pressed ("nowa" category) | covered | popups.md#pick-photos-or-videos (**NOWA_RUNTIME**) | the "nowa" category is obsolete: `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:9-24` |
| Options: multiple selection, media type, source type, preferred camera | covered | popups.md options table | labels re-checked: `packages/core/lib/src/fields/expression_builder/expression_details.dart` (`BFMediaPicker`) |
| Permissions: click **Hot fix** | covered | popups.md, circuit.md#hot-fix | label is **Hot Fix** |
| Turn on **await**, **Store result** → **New Variable** | covered | popups.md | |
| The result is a list even when one file is picked | covered | popups.md (now says "even for one photo") | `media_picker.dart:35` |
| `XFile` is the cross-platform file type from `image_picker` (path, name, `readAsBytes()`) | dev-only | P14-B07-for-code.md `#actions-and-popups` | package and class detail |
| Get the first file, then `readAsBytes` | covered | popups.md | |
| Put the bytes in the image's variable, then **refresh** | covered | popups.md example (Store result → **Pick Variable**, then **refresh**) | `packages/code/lib/src/fields/store_result_field.dart` |
| Test it with **Play** | added | popups.md example, last step | Play calls the real picker (`nowa_runtime_library.dart:627-639`) |
| Extend to videos or several files | covered | popups.md options table (**Multi Selection**, **Media Type**) | |

## logic/common-functionalities/navigation.md

| item | status | where / evidence | note |
|---|---|---|---|
| Navigation moves people between screens and carries information | covered | navigation.md intro | |
| Add a **Navigator** node from a screen's or component's event or function: dot → **Globals** → **Navigator**, set **Type** and **To** | covered | navigation.md#use-the-navigator | labels `packages/code/lib/src/customizations/navigator_field.dart:76-87,159` |
| Pass values: brush next to the screen, popup lists its params, type a value or link one | covered | navigation.md#use-the-navigator | |
| Video: blog screen with title, content and image params | not useful | | media only |
| Screens stack like layers: push adds one on top, pop removes the top one | added | navigation.md ("How screens stack") | go_router docs (https://pub.dev/documentation/go_router/latest/topics/Navigation-topic.html) |
| Types with a use case each (Push: Home → Product Details; Pop: back to the list after a form; PushReplacement: Login → Home without going back; PushAndRemoveUntil: Home after onboarding, clearing the steps) | added | navigation.md, "Use it when" column in both type tables | `pushAndRemoveUntil` removes every screen below: `navigator_field.dart:145-150` |
| Navigator works only inside screens or components (needs `context`), not in a global state's function | covered | navigation.md#use-the-navigator (reworded without `context`) | |
| Return data with pop: example "type a name on screen 2, show it on screen 1" | added | navigation.md#go-back-with-a-value (worked example, GoRouter first, Navigator differences after) | `packages/code/lib/src/customizations/go_router_field.dart:107,123-125`, `navigator_field.dart:89-103`; go_router docs "Returning values" |
| Tip: **onValue** instead of **await** | covered | navigation.md#go-back-with-a-value, circuit.md#future-options | |

## logic/common-functionalities/open-url.md

| item | status | where / evidence | note |
|---|---|---|---|
| `openUrl` opens a website outside your app's screens | covered | actions.md#open-a-link | now says where it opens: a new tab on the web, a browser view over the app on phones (url_launcher, see notes) |
| Use cases: support page, blog or docs, payment or checkout link | added | actions.md#open-a-link | |
| To show a web page inside the app, use the **Web View** widget | added | actions.md#open-a-link (link to reference/widgets/media.md#web-view) | widget exists: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:879-891` |
| Steps: open the event, "Nowa" category → **OpenUrl**, type the full link (`https://example.com`) in **Url** | covered | actions.md#open-a-link (+ "start with `https://`") | category is **NOWA_RUNTIME**; the address is parsed as typed: `packages/nowa_runtime/lib/src/functions.dart:3-5` |
| Dynamic URLs: link **Url** to a variable, param, function result or expression | covered | actions.md#open-a-link | |
| What happens: the app pauses and the default browser opens | covered | actions.md#open-a-link (corrected per platform) | |

## logic/common-functionalities/platform-checking.md

| item | status | where / evidence | note |
|---|---|---|---|
| `checkPlatform` lets the app behave differently per platform | covered | actions.md#check-the-platform | |
| Why: build once, adjust per platform (examples: web, Android, desktop) | added | actions.md#check-the-platform | |
| Steps: **Globals** → `checkPlatform`, starts as `isWeb`, click to change | covered | actions.md#check-the-platform | `packages/core/lib/src/state_management/global_state_suggestions.dart:55-59` |
| Each check is true or false; use it in an If | covered | actions.md#check-the-platform | |
| List of checks with meanings | covered | actions.md#check-the-platform (now a table) | old `isMacOS` is `isMacOs`: `packages/nowa_runtime/lib/src/nowa_platform.dart:16` |
| Combine checks with a typed formula `NPlatform.isWeb && NPlatform.isAndroid` | dev-only | P14-B07-for-code.md `#actions-and-popups` | the visual way stays on the page |
| Combine checks with **OPERATORS** → `logicalAnd` / `logicalOr`, a `checkPlatform` on each side | covered | actions.md#check-the-platform | |
| Tip: reopen the field as **Custom Expression** to see the formula | covered | expressions.md#custom-expression ("opens in text mode, showing the current expression") | |

## logic/common-functionalities/print.md

| item | status | where / evidence | note |
|---|---|---|---|
| `print` writes messages to the logs, to check values while testing | covered | actions.md#write-to-the-logs | |
| Use cases: see a value, check what someone typed, check that a step or condition ran, record taps or visits | added | actions.md#write-to-the-logs | |
| Steps: "Nowa" category → **Print**; type the **Msg** or link it | covered | actions.md#write-to-the-logs (+ "click **Msg** to link a value") | category is **DART:CORE** |
| See the messages: log icon at the bottom left, popup opens on Errors, click **Logs** | covered | actions.md#write-to-the-logs → test/run.md#read-the-logs | old UI obsolete: the status bar's last log line opens the Console on **Logs** (`docs/test/run.md:78`, `packages/core/lib/src/panels/logs_and_errors_panel.dart:14-15`) |
| Messages also show while you test with **Play** | added | actions.md#write-to-the-logs | interpreted `print` calls `logInfo`: `packages/core/lib/src/interpreter/libraries/dart_core_library_custom.dart:3-8`, `packages/core/lib/src/utils.dart:19-21` |
| Running from VS Code also shows the messages there (Flutter's `print()`) | dev-only | P14-B07-for-code.md `#actions-and-popups` | |
| Example: print what someone typed in a Text Field (controller → `text`) | added | actions.md#write-to-the-logs | controller naming from `docs/reference/widgets/forms.md:13-15` |
| Insert a value with `$` → `${variable}`, including a function's result | covered | expressions.md#dollar, actions.md | |
| `$name` works without braces; a dot needs `${}`; it's Dart string interpolation | dev-only | P14-B07-for-code.md `#variables-and-functions` | Nowa inserts `${...}` itself |
| Custom expression `"My name is " + textController.text`; quotes needed there, but not when typing in **Msg** | added | expressions.md#dollar (no quotes in a text field) and #custom-expression (quotes) | |

## logic/ui-popups/date-picker.md

| item | status | where / evidence | note |
|---|---|---|---|
| Why: bookings (check-in, check-out), due dates, reminders, birthdays and deadlines | added | popups.md#pick-a-date-or-time | |
| Steps: event → add node → **Globals** → `showDatePicker` | covered | popups.md#pick-a-date-or-time (**MATERIAL**) | old category obsolete: `packages/core/lib/src/interpreter/libraries/material_library.dart` (`showDatePicker`) |
| Set `firstDate` and `lastDate`; the initial date defaults to today | covered | popups.md (+ "until you change them, people can only pick today") | all three start as `DateTime.now()`: `packages/core/lib/src/interpreter/block_utils.dart:256-263` |
| The result arrives later (a Future); **await** waits for it | covered | popups.md ("Wait for the answer") | |
| With **await**: store in a new or an existing date variable | covered | popups.md | |
| Without **await**: **On Value** runs when a date is picked, with `value` | covered | popups.md ("Wait for the answer"), circuit.md#future-options | |
| Closing the picker gives nothing (null) | covered | popups.md | |
| Full example: pick a date and show it in a text (String variable, `format`, **refresh**, Play) | added | popups.md ("Example: pick a date and show it") | `.format` dropdown `packages/code/lib/src/customizations/date_format_field.dart:6-90` |
| `format` turns a date into text in a chosen style | covered | popups.md#show-a-date-as-text | |
| Format names table with descriptions and examples | added | popups.md#show-a-date-as-text (full list in a collapsible table, US English examples) | 37 names in `date_format_field.dart:51-89`; old table missed 5 (`ABBR_MONTH_DAY`, `ABBR_MONTH_WEEKDAY_DAY`, `MONTH`, `MONTH_DAY`, `MONTH_WEEKDAY_DAY`) and some old examples were wrong (`YEAR_MONTH_DAY` is "April 10, 2025"): intl 0.20.2 `lib/src/data/dates/patterns/en_US.json` |

## logic/ui-popups/dialog.md

| item | status | where / evidence | note |
|---|---|---|---|
| A dialog is a box in the middle of the screen for an important message or a choice | covered | popups.md#show-a-dialog | |
| Uses: confirm an action, show a warning or error, ask for a simple input, show terms or a login prompt | added | popups.md#show-a-dialog | |
| Basic dialog steps: `showDialog`, default AlertDialog, brush to edit title, background, buttons; run it | covered | popups.md#show-a-dialog (+ "click **Play** and tap the button") | defaults `block_utils.dart:244-254` |
| **Context** is filled for you; use it in a screen's or component's logic | covered | popups.md intro (plain words) | |
| **Builder**: AlertDialog, **Pick Widget**, brush | covered | popups.md | `basic_fields.dart:462-473` |
| **Barrier Dismissible** | covered | popups.md | |
| **Barrier Color** | covered | popups.md | |
| **Barrier Label**: a label for screen readers | added | popups.md (options list) | Flutter ModalRoute.barrierLabel docs |
| **Use Safe Area** | covered | popups.md | |
| **Use Root Navigator**, **Route Settings** | covered | popups.md (advanced) | |
| **Anchor Point**: "where the dialog animates from" | obsolete | | wrong in the old page: it picks the sub-screen on foldable devices (Flutter showDialog docs); the page keeps it under advanced options |
| Future options: **await**, **onValue**, **onError**, **Store result** | covered | popups.md, circuit.md#future-options | |
| Design your own dialog: AlertDialog on the board, make it a component, pick it as the builder (reusable) | added | popups.md ("Use your own design") | Alert Dialog widget `widgets_to_add.dart:846-859`; **Create component** per `docs/design/components.md:15` |
| Return data: button with **Navigator** `pop`, **result type**, **result**; **await** + **Store result** | covered | popups.md#get-an-answer-from-a-dialog | |
| Return data with **onValue** (`value`) | covered | popups.md#get-an-answer-from-a-dialog | |
| Use case: "Are you sure you want to delete this item?" | added | popups.md ("Example: confirm before deleting") | operators `packages/core/lib/src/interpreter/block_tree.dart:2383-2404` |

## logic/ui-popups/snackbar.md

| item | status | where / evidence | note |
|---|---|---|---|
| A snackbar is a short message at the bottom that goes away by itself | covered | popups.md#show-a-snackbar | |
| Uses: item deleted, couldn't save, settings saved, feedback after a tap | added | popups.md#show-a-snackbar | |
| Steps: **Globals** → **Show snackbar**, brush, change the text, Play to test | covered | popups.md#show-a-snackbar (+ Play) | snackbar shows in Play: `_rewrite/PLAN.md` phase 9 backlog ("Settled") |
| **Content**, **Background Color**, **Width**, **Elevation** (shadow), **Shape** (corners) | covered | popups.md (plain meanings added) | `expression_details.dart:158-183` |
| **Store result** keeps a `ScaffoldFeatureController` for a `closed` callback | dev-only | P14-B07-for-code.md `#actions-and-popups` | |
| Right-click **Set to Default** / **Set to Null** | covered | expressions.md#reset-a-property | old labels obsolete: **Reset to default**, **Set to null** (`packages/core/lib/src/fields/block_field.dart`) |
| Dynamic message: link the text to a variable, param, function or custom expression | covered | popups.md, expressions.md | |
| Example `"successfully deleted ${item.name}"` | added | popups.md#show-a-snackbar (as `Deleted ${item.name}`) | |
| Other custom-expression examples (`"Total is " + total.toString()`) | covered | expressions.md#custom-expression | |
| Type must be text: convert with `toString` | covered | expressions.md#plus | |
| Shortcut: `$variable`, `${object.property}`, `$` opens the menu | covered | expressions.md#dollar | |

## logic/ui-popups/time-picker.md

| item | status | where / evidence | note |
|---|---|---|---|
| Uses: reminders, appointments, delivery or pickup time, logging activities | added | popups.md#pick-a-date-or-time | |
| Steps: "Nowa" category → `showTimePicker` | covered | popups.md (**MATERIAL**) | old category obsolete |
| Returns a time later (`Future<TimeOfDay>`) | covered | popups.md (plain words) | |
| **await** → store in a new or existing time variable | covered | popups.md | |
| **Initial Time** (Hour, Minute) | covered | popups.md (+ starts at 0:00) | required `TimeOfDay(hour, minute)` filled with 0: `block_utils.dart:72-96,225-233`, `material_library.dart:70198-70212` |
| **Builder** (leave empty) | not useful | | |
| **Barrier Dismissible**, **Barrier Color**, **Barrier Label**, **Use Root Navigator** | covered | popups.md (dialog options) | |
| **Cancel Text**, **Confirm Text**, **Help Text** | added | popups.md#pick-a-date-or-time | params in `material_library.dart` (`showTimePicker`, `showDatePicker`) |
| **Hour Label Text**, **Minute Label Text**, **Error Invalid Text** | added | popups.md#pick-a-date-or-time (one line) | |
| Route Settings, entry mode, anchor point, input or dial mode | not useful | | advanced |
| Time members: `hour`, `minute`, `period`, `hourOfPeriod`, `format`, `isBefore` / `isAfter` / `isAtSameTimeAs` | added | popups.md (members not yet listed: `period`, `hourOfPeriod`, compare) | `material_library.dart:70219-70262` |
| Use case: pick a time and show it in a text | added | popups.md (example, "For a time") | **Context** of `format` filled for you: `packages/core/lib/src/interpreter/suggestion.dart:120-133`, `block_utils.dart:118-119` |
| **On Value** instead of **await** | covered | popups.md ("Wait for the answer") | |

## vars-params-functions/data-models.md

| item | status | where / evidence | note |
|---|---|---|---|
| A model represents a real-world thing (task, product, user, log entry) used in variables, logic and UI | covered | models.md intro (rewritten as "the shape of your data") | |
| Examples with fields: to-do, shop product, user, water log | added | models.md (examples table) | |
| Define the shape once instead of repeating it | added | models.md intro | |
| Create: Files panel, **+** next to `lib` → **Create new object** | obsolete | Library **Add** (+) → **New Model...** (`lib/project/panels/files_panel/add_lib_menu.dart:60-66`) | covered by models.md#create-a-model |
| Dialog: name, with **Path** and **Class** shown | covered | models.md#create-a-model | `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94`, `file_name_text_field.dart:167-175` |
| The model shows in the Files panel as a Dart file | obsolete | 3.13 shows it in the Library under **Models** | covered by models.md#add-fields |
| Naming: "task model" → class `TaskModel`, file `task_model.dart` | covered | models.md (class name kept; file name moved) | file name to for-code `#models` |
| Single click opens a popup with variables and functions | obsolete | a click shows a details card; double-click or Enter opens the editor | covered by models.md#add-fields |
| Field name, type, default value, **is final** | covered | models.md#add-fields | |
| When to use final (`id`, `createdAt`) and when not (`title`, `isDone`) | covered | models.md#add-fields (+ `id`, `createdAt` examples) | |
| Example: `title`, `description`, `isDone` non-final, plus a `markAsComplete` function | added | models.md#add-fields (model function example) | |
| View and edit the model's code by double-clicking | covered | models.md (**View Code**) | editing code by hand: for-code `#models` |
| Use as a type for variables, params, function inputs and return values | covered | models.md#use-a-model-as-a-type (+ **Return Type**) | `packages/core/lib/src/widgets/code/variable_widgets.dart:481-482` |
| Example: `taskList` as a list of tasks with three default items | covered | models.md#use-a-model-as-a-type | |
| Default value applies only until data is set while the app runs | covered | models.md | |
| Create an instance in Circuit with **Create** | covered | models.md#create-a-model-in-logic | |
| Example: **+** button creates a task and adds it to the list | covered | models.md#create-a-model-in-logic | |
| Link a field to what someone typed (text field controller → `text`) | added | models.md#create-a-model-in-logic | `docs/reference/widgets/forms.md:13-15` |
| Water tracker example (`WaterLogEntry`: `amount`, `date`) | added | models.md (examples table row) | |
| YouTube tutorial (Water Tracker app) | not useful | | media; old UI |

## Totals

To be completed after the pages are edited (see the bottom of this file).
