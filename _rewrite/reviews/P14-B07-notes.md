# P14-B07 notes (logic: expressions, navigation, router, popups, actions, models)

Batch P14-B07, phase 14 (D22 audience pass, D24 coverage, D25 tone). Source of truth `/home/user/nowa-master` at
`3cb32031c` (3.13.0); code refs are `path:line` there unless marked otherwise. Package sources quoted below come from the
pub cache that built Nowa (`/root/.pub-cache/hosted/pub.dev/<package>-<version>/`) and the local Flutter SDK
(`/home/user/flutter`, `058e0af2c`, Jul 2026). Official pages were read on 2026-10-12 with curl through the proxy
(`api.flutter.dev`, `pub.dev`). Coverage table: `P14-B07-coverage.md`. Moved facts: `P14-B07-for-code.md`.

"Not run live" marks a claim built from verified pieces that nobody has clicked through in the app; a live check would
settle it. Pages are appended as they are finished.

## logic/popups.md

**Changed for the reader**
- Intro rewritten (R9). **Context** explained in plain words ("tells the popup which screen to appear on") instead of
  left as a bare label; Nowa fills it because a `BuildContext` input defaults to `context`
  (`packages/core/lib/src/interpreter/block_utils.dart:118-119`).
- New section "Use what the person chose": explains **await** + **Store result** versus **onValue** once, and the empty
  answer (`null`) when the popup is closed. It replaces the half-sentences that were repeated under dialogs, pickers and
  the media picker (old date-picker.md and time-picker.md explained both ways). Refs: circuit.md#future-options,
  `packages/code/lib/src/fields/future_options.dart:6-111`.
- Each popup now opens with what it's for and when to use it (R3: the function names stay and get a plain meaning).
- The page has one admonition (the AI tip). No code-only facts were on it, so nothing moved and there is no link to
  `generated-code.md`.

**Added from the old docs (and why it's still valid)**
- Snackbar uses (old snackbar.md) and "Click **Play**": a snackbar shows in Play (`_rewrite/PLAN.md`, phase 9 backlog:
  "Settled: a snackbar shows in Play (seen in `test-instant-play-video.mp4`)").
- Snackbar options with plain meanings. Fields shown: `packages/core/lib/src/fields/expression_builder/expression_details.dart:158-183`;
  **Show advanced options** label: `packages/core/lib/src/fields/block_field.dart:1331-1365` ("Show " + "advanced options").
  **Duration** 4 s: https://api.flutter.dev/flutter/material/SnackBar/duration.html ("Defaults to 4.0s").
  **Action** (one button, for example undo): https://api.flutter.dev/flutter/material/SnackBar/action.html.
  **Elevation** (shadow): https://api.flutter.dev/flutter/material/SnackBar/elevation.html. **On Visible**:
  https://api.flutter.dev/flutter/material/SnackBar/onVisible.html.
- New row "Leave **Width** and **Margin** empty": Flutter uses them only for a floating snackbar
  (https://api.flutter.dev/flutter/material/SnackBar/width.html) and asserts otherwise
  (`/home/user/flutter/packages/flutter/lib/src/material/snack_bar.dart:661-680`, "Width can only be used with floating
  behavior. SnackBarBehavior.fixed was set by default."). Nowa's step shows no **Behavior** field (`expression_details.dart:158-183`)
  and Nowa's themes set no snackbar theme (no `snackBarTheme` / `SnackBarThemeData` in `packages/core/lib/src/themes`,
  the theme panel or the templates). The assert fires in debug builds (Run); release builds ignore the width. See
  "Product issue candidates".
- Dialog uses (old dialog.md), the title-brush example, "Click **Play**". **Barrier Label** = what screen readers say for
  the dimmed area: https://api.flutter.dev/flutter/widgets/ModalRoute/barrierLabel.html. The old page's **Anchor Point**
  explanation ("where the dialog animates from") was wrong (it picks a sub-screen on foldables:
  https://api.flutter.dev/flutter/material/showDialog.html), so the page keeps it under "advanced" only.
- "Use your own design" (old dialog.md "Designing Your Own Custom AlertDialog"): **Alert Dialog** is a Nowa pick in the
  Library (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:846-859`); **Create component** as on
  `docs/design/components.md:15`; **Builder** → **Pick Widget** / **Edit in circuit** (`packages/core/lib/src/fields/basic_fields.dart:450-473`).
- "Example: confirm before deleting" (old dialog.md use case "Are you sure you want to delete this item?"). Pieces:
  Navigator `pop` with **result type** / **result** (`packages/code/lib/src/customizations/navigator_field.dart:89-103`);
  If **Condition** (`packages/code/lib/src/fields/statement_fields.dart:41-49`); an operator in a field shows as a
  button with its formula that opens the editor (`packages/core/lib/src/fields/expression_builder/expression_field.dart:86-103`);
  the editor has **Operator**, **Type**, **Left side**, **Right side**, and changing **Type** resets both sides to the
  type's default, `false` for `bool` (`expression_details.dart:251-326`, `block_utils.dart:94-95`). `equal` is a logic
  operator (`packages/core/lib/src/interpreter/block_tree.dart:2383-2433`). Comparing with `true` also covers a dismissed
  dialog (`null`). Not run live. Adding buttons through the AlertDialog's **Actions** is the existing (W5) instruction,
  also not run live.
- Bottom sheets: modal versus persistent, with a use for each: https://api.flutter.dev/flutter/material/showModalBottomSheet.html
  ("A modal bottom sheet is an alternative to a menu or a dialog and prevents the user from interacting with the rest of
  the app"; a persistent sheet "shows information that supplements the primary content of the app without preventing the
  user from interacting with the app").
- Date picker uses (old date-picker.md). "All three start as today, so until you change them, people can only pick
  today": defaults `block_utils.dart:256-263` (`DateTime.now()` for initial, first and last date); the picker only offers
  days between **First Date** and **Last Date** (old page's warning "You have to choose firstDate and lastDate").
- **Help Text**, **Cancel Text**, **Confirm Text** (old time-picker.md option list; also on the date picker): parameters of
  `showDatePicker` / `showTimePicker` in `packages/core/lib/src/interpreter/libraries/material_library.dart`
  (`helpText`, `cancelText`, `confirmText`); labels follow the camel-case split rule (research `features-logic.md`, header).
- "Example: pick a date and show it" (old date-picker.md full example, re-derived): **Create Variable...**
  (`packages/core/lib/src/fields/field_link_menu.dart:374`, behavior as on variables.md:77), `.format` dropdown
  (`packages/code/lib/src/customizations/date_format_field.dart:6-48`), **Store result** → **Pick Variable**, **refresh**.
  The closing `pickedDate != null` guard: the designer writes `!` after a value that can be empty when the target can't be
  empty (`block_tree.dart:3345-3385`), so a closed picker would stop the steps with an error; a custom expression in an
  If's **Condition** is supported (circuit.md "Branch with If"). Not run live.
- "Show a date as text" table: all 37 dropdown names (`date_format_field.dart:51-89`); each name is an intl skeleton used
  as `DateFormat(skeleton)` with no locale (`packages/nowa_runtime/lib/src/extensions/date_time_format.dart:3-5`).
  Examples computed from intl 0.20.2 `lib/src/data/dates/patterns/en_US.json` (for example `yMMMMd` = `MMMM d, y`,
  `yMd` = `M/d/y`, `jm` = `h:mm a`) and the en_US symbols in `lib/date_symbol_data_local.dart` (`Q2`, `2nd quarter`,
  `AM`/`PM`). Reference moment: Thursday, April 10, 2025, 17:30:15 (2025-04-10 is a Thursday). The page says "in US
  English" and makes no claim about other languages. The old table missed five names and had wrong examples (for
  example `YEAR_MONTH_DAY` shown as "2025 April 10").
- Time picker: **Initial Time** starts at 0:00 (`showTimePicker` has no Nowa default, so the required `initialTime` gets
  `defaultBlockForType`, which builds `TimeOfDay(hour: 0, minute: 0)`: `block_utils.dart:72-96,163-179,225-233`,
  constructor `material_library.dart:70198-70212`); its **Hour** and **Minute** come from the class field
  (`packages/core/lib/src/fields/class_field.dart:9-60,95-121`). **Hour Label Text**, **Minute Label Text**,
  **Error Invalid Text**: `showTimePicker` parameters in `material_library.dart`. Members `hour`, `minute`, `period`,
  `hourOfPeriod`, `format`, `isBefore`, `isAfter`, `isAtSameTimeAs`: `material_library.dart:70219-70262` (old
  time-picker.md listed them). `format` gets **Context** filled: member picks call `generateDefaultBlocks`
  (`packages/core/lib/src/interpreter/suggestion.dart:120-133`) and `BuildContext` defaults to `context`. 24-hour output
  follows the phone's setting: `/home/user/flutter/packages/flutter/lib/src/material/time.dart:105-113`
  (`alwaysUse24HourFormat: MediaQuery.alwaysUse24HourFormatOf(context)`), https://api.flutter.dev/flutter/material/TimeOfDay/format.html.
- Date range: "Nowa fills **First Date** and **Last Date** with a placeholder date": `showDateRangePicker` has no Nowa
  default, so both required dates get `defaultBlockForType(DateTime)`, the default constructor with year 0
  (`block_utils.dart:163-179`, `packages/core/lib/src/interpreter/libraries/dart_core_library_custom.dart:76-99`).
  Not run live.
- Media picker uses; **Hot Fix** in plain words (permissions for camera, photo library, microphone and Android storage:
  `packages/core/lib/src/interpreter/declaration_info/function_info.dart:61-70`); "a list even when there's only one"
  (`packages/nowa_runtime/lib/src/media_picker/media_picker.dart:35`).
- "Example: show a photo the person picks" (old media-picker.md walk-through, re-derived): **Bytes** tab and **Bytes**
  field (`basic_fields.dart:913-948`), type `Uint8List` (`basic_fields.dart:942`), `isNotEmpty`
  (`packages/core/lib/src/interpreter/libraries/dart_core_library.dart:1736-1737`), `first`, `readAsBytes`
  (`packages/core/lib/src/interpreter/libraries/nowa_runtime_library_custom.dart:60`). Play calls the real
  `showMediaPicker` (`packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:627-639`;
  `function_info.dart:73` declares a `customCall` that nothing reads, grep). The `isNotEmpty` guard avoids `first` on an
  empty list. Not run live.
- "On your computer, the gallery opens a file picker" and "Play on a computer can't use a camera": the web plugin uses a
  file input (`image_picker_for_web-3.1.1/lib/image_picker_for_web.dart:53-77`); the macOS, Windows and Linux plugins
  open a file chooser for the gallery and throw a `StateError` for the camera unless a `cameraDelegate` is set
  (`image_picker_macos-0.2.2+1/lib/image_picker_macos.dart:93-110`, `image_picker_windows-0.2.2/lib/image_picker_windows.dart:119-127`,
  `image_picker_linux-0.2.2/lib/image_picker_linux.dart:90-98`); Nowa sets none (no `cameraDelegate` in `lib/` or
  `packages/`). In a desktop browser the camera input also ends in a file chooser. Not run live.

**Length**: about 2,600 words (`wc -w`), over the ~2,200 the brief names. Proposed split if wanted: keep snackbars,
"Use what the person chose", dialogs and bottom sheets here, and move "Pick a date or time" (with the format table) and
"Pick photos or videos" to a new page "Pick dates, times and photos" (`logic/pickers.md`). Inbound anchors to keep:
`#pick-photos-or-videos` (reference/widgets/media.md), `#show-a-dialog` (reference/widgets/index.md), `#show-a-snackbar`
(logic/circuit.md).

**Open questions**: the three "Not run live" examples above; whether **Width** and **Margin** should be hidden in the
product (see below).
