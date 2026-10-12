# P14-B14 verify: reference pages (index, wrappers, shortcuts, glossary)

Verifier: P14-B14-V. Source of truth: `/home/user/nowa-master` (3.13.0, `3cb32031c`); Flutter framework doc comments in
`/home/user/flutter` (the text api.flutter.dev publishes). Code refs relative to `/home/user/nowa-master` unless they
start with `flutter/`.

Status: in progress.

## Build blocker fixed first (coordinator request)

| Item | Verdict | Source | Note |
|---|---|---|---|
| `glossary.md` front matter: bare `null` in `keywords` (index 32) parsed as a YAML null, Docusaurus error `"keywords[32]" must be a string` | fixed | coordinator report | Quoted as `"null"`. Re-parsed the front matter of all four batch pages with PyYAML (YAML 1.1, stricter than js-yaml: `yes`/`no`/`on`/`off` would also turn into booleans): every keyword is a string, no other bare special word (`yes`, `no`, `on`, `off`, `true`, `false`, `null`, `~`, numbers) on any of the four pages. |

## `docs/reference/wrappers.md`

All labels checked against the 3.13 Details code. Field labels are the parameter name run through `camelCaseToSpaces()`
(`packages/core/lib/src/fields/block_field.dart:178-182`, `:211-221`; `packages/core/lib/src/utils.dart:77-79`) unless an
editor passes its own `label:`.

| Claim | Verdict | Source | Note |
|---|---|---|---|
| 32 wrappers, names as the **Add Wrapper** list shows them; starting values (Padding 8, Visibility on, Opacity 0.5, Transform rotation, Align centered, Aspect Ratio 1, Badge "99", Tooltip "Tooltip message", AnimatedContainer 300 ms + gray, Container gray fill, Text Direction `ltr`) | ok | `packages/core/lib/src/wrappers_to_add.dart:12-188`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:8-13` | |
| **Add Wrapper** opens a list with the hint **Search for a wrapper**; only with exactly one widget selected; undo removes it | ok | `packages/designer/lib/src/details/widget_details.dart:66-91`, `:145-148`, `:189-196` | |
| Order: widget section first, then wrappers from the closest outwards; a new wrapper goes outermost and lands at the bottom; Container/Padding example | ok | `packages/core/lib/src/interpreter/widget/designer_model.dart:482-496`, `:558-572` (new wrapper wraps `widgets.last`); `widget_instance_impl.dart:85`, `:98`, `:274-275`; `block_field.dart:796-813` | |
| Intro: "Wrap a product card in a **Gesture Detector** and it opens the product page when tapped" | fixed | `packages/designer/lib/src/details/widget_fields.dart:488-514` | The wrapper starts with no events; you add the **On Tap** logic. Now "you can make it open the product page". |
| Padding: 8 all round; first field left/right, second top/bottom; **Individual padding** button switches to left, top, right, bottom and back; min 0 | ok | `packages/core/lib/src/fields/basic_fields.dart:745-871` | |
| Padding on a Group shows in the Group's **Padding** row | fixed | `block_field.dart:796-813` (skips only the first Padding of a group); `packages/designer/lib/src/details/group_details.dart:141-157` | The rewrite dropped "first" from the verified main text; a second Padding still gets its own section. Restored "the first Padding". |
| Scroll View settings **Scroll Direction** (`vertical` default / `horizontal`), **Reverse**, **Padding**, **Physics**, **Keyboard Dismiss Behavior** (`onDrag`), **Primary**, **Restoration Id** | ok | `packages/core/lib/src/interpreter/libraries/material_library.dart:109279-109298`; enum dropdown of raw names, **Default** for nullable enums `basic_fields.dart:1511-1548`; physics dropdown `packages/core/lib/src/fields/list_view_field.dart:355-389`; `flutter/packages/flutter/lib/src/widgets/scroll_view.dart:40-48` | "The other settings, such as..." correctly leaves room for **Clip Behavior**, **Drag Start Behavior** and **Hit Test Behavior**, which the default editor also shows. |
| Physics behaviors (Bouncing iPhone style, Clamping Android style, NeverScrollable off, AlwaysScrollable even when content fits, empty = platform default); Reverse starts at the bottom (chat use case); Padding insets the content | ok | Flutter `widgets/scroll_physics.dart` class docs; `widgets/single_child_scroll_view.dart` (`reverse`, `padding`, `physics` docs) | |
| No **Expand** in the scrolling direction inside a Scroll View | ok | `packages/designer/lib/src/details/size_fields.dart:5-41` | |
| "click the screen's title and **Play**" | fixed | `docs/test/instant-play.md` ("Hover the title bar ... Click it (its tooltip is **Play**)") | Now "hover the screen's title and click **Play**", matching the Instant Play page and `shortcuts.md`. |
| Removed cross-link from the old Scroll View row to `layout.md#scroll-or-wrap-content` | restored | `docs/design/layout.md:138-143` | One sentence pointing to the Wrap alternative for a row of tags. |
| Gesture Detector: **On Tap**, **On Secondary Tap**, **On Double Tap**, **On Long Press**; **Show advanced options** with **On Horizontal Drag End**, **On Scale Update**; **+** opens Circuit, then the button reads **Edit**; no visual feedback, Ink Well for a ripple | ok | `widget_fields.dart:488-514`; `block_field.dart:1331-1365`; `material_library.dart:92329-92424`; `basic_fields.dart:533-559`; `packages/core/lib/src/fields/nowa_fields.dart:797-830`; Flutter `material/ink_well.dart` | |
| Visibility: only **Visible** and **Replacement**; on by default; hidden = empty box, takes no space; click the **Visible** label to link it | ok | `packages/core/lib/src/fields/text_fields.dart:802-815`; `material_library.dart:115582-115604`; `block_field.dart:1003-1046` | |
| Opacity: **Opacity** 0-1, starts 0.5; doesn't animate (Cross Fade for a fade); at 0 still takes space and still gets taps; screen readers skip it at 0 unless **Always Include Semantics** | ok | `material_library.dart:75019-75033`; `widgets_to_add/widgets_to_add.dart:444-466`; Flutter `widgets/basic.dart` Opacity "Hit testing", `rendering/proxy_box.dart:956-960` | |
| Material: **Color** (empty = theme surface), **Elevation**, **Shadow Color**, **Tint Color**, **Border** (**+** on hover, starts as a 1 px black rounded rectangle with **Border Radius**), **Border On Foreground** (on by default) | ok | `basic_fields.dart:1854-1903`; `packages/core/lib/src/fields/class_field.dart:163-188`, `:270-287`; Flutter `material/material.dart:225-332`, `material/theme_data.dart:452` (M3 `canvasColor` = surface) | |
| Ripple hidden by a filled widget; move the color to a **Material** wrapper below the **Ink Well** | ok | Flutter `material/ink_well.dart:1451-1471` ("The ink splashes aren't visible!") | Lower in **Details** = outside, so the Material becomes the Ink Well's ancestor as Flutter's docs require. |
| Text Direction: "so a whole section mirrors itself ... flip the whole screen" | fixed | Flutter `widgets/basic.dart` (Flex lays children out in the ambient text direction); Nowa's Align and Padding use non-directional `Alignment` and `EdgeInsets` (`wrappers_to_add.dart:16-23`, `:61-69`), which don't flip | Overstated. Now "so the first widget in a row moves to the right" (the wording `design/localization.md:39` uses) and "set the direction for the whole screen". |
| Text's own **Text Direction** setting | ok | `widget_fields.dart:307-310` | |
| Color Filter row: "It starts gray." | removed | see finding below | The rest of the row stays neutral and true: the section shows **Color** and **Blend Mode** (labels from `ColorFilter.mode`'s parameter names). |
| Dismissible: "or you'll see an error when you test" | fixed | Flutter `widgets/dismissible.dart:621-635` (a debug-only assert); local Run is `flutter run` in debug mode (`packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:54`), and cloud Run offers **Hot Restart**, a debug-mode feature | Instant Play runs inside Nowa's own release build, where the assert is off, so "when you test" was too broad. Now "when you try it with **Run**". |
| Other "use it for" rows: Align, Constrained Box, Fractionally Sized Box (0.5 = half), Aspect Ratio (2 = twice as wide), Fitted Box, Safe Area (new screens already have one), Container (fill behind the child; tint an Image with **Color**/**Blendmode**), Clip radius, Transform (doesn't change the space), Badge, AnimatedContainer, Ink Well (**Splash Color**), Refresh Indicator (needs a scrolling widget), Interactive Viewer, Tooltip, Default Text Style (a Text's own settings win), Data Builder, Notifier Builder (**Notifier**), Form (validators for Text Field, Dropdown menu, Pin Code Field; `formKey`), Screen slots, Drawer | ok | `wrappers_to_add.dart`; `widget_fields.dart:29-49`, `:202-259`, `:317-350`, `:460-486`, `:516-528`; `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`; `default_blocks.dart:333-348`; `packages/designer/lib/src/design_experience/place_board.dart:22-30`; `packages/core/lib/src/fields/form_fields.dart:8-41`; `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:511-540`; `packages/core/lib/src/fields/data_field.dart:53-95`; Flutter `container.dart`, `basic.dart` (Transform, FractionallySizedBox, AspectRatio), `refresh_indicator.dart`, `interactive_viewer.dart`, `text.dart` | New Library Text widgets carry no explicit style (`default_blocks.dart:318`), so the Default Text Style example works. |
| Anchors | ok | script | All 32 IDs on `origin/main` are present exactly once (the seven moved to `### ... {#id}` headings), every `origin/main` auto heading ID still exists, and `redirects.js:154-160` targets resolve. No product link points into this page. |
| Links, structure | ok | script | 0 broken relative links or anchors; one admonition; no H1, `---`, emoji or hype words; front matter valid. |

### Color Filter finding (logged, not stated on the page)

The code shows the mismatch the writer suspected, at every layer:

- The wrapper's starting filter stores its values under the keys `'color'` and `'blendMode'`
  (`packages/core/lib/src/wrappers_to_add.dart:104-111`), but `ColorFilter.mode` takes two positional parameters
  (`material_library.dart:80350-80353`: `LazyParameter('Color', 'color', 0)`, `LazyParameter('BlendMode', 'blendMode', 1)`,
  run as `ColorFilter.mode(posArgs[0], posArgs[1])`). `CallExpr.klass` stores the keys as given
  (`packages/core/lib/src/interpreter/block_tree.dart:5757-5794`).
- Interpreter (board, Instant Play): string keys go to `namedArgs`, so `posArgs` stays empty and `posArgs[0]` is out of
  range (`packages/core/lib/src/interpreter/declaration_internal.dart:239-257`).
- Details: the **Color** and **Blend Mode** fields read slots 0 and 1 (`class_field.dart:100-105`), which are empty, so
  they don't show the gray. The same section lists the problem `NotEnoughPositionalArguments` ("2 positional arguments
  expected by ..., but 0 found", `block_tree.dart:5925-5951`, `packages/core/lib/src/interpreter/block_problems.dart:232-236`).
  The name lookup accepts `'color'` as a known parameter (`packages/core/lib/src/interpreter/block_utils.dart:216-219`,
  `declaration.dart:255`), so no "undefined parameter" problem appears.
- Code: `generateArgsSource` writes `color: ..., blendMode: ...` (`block_tree.dart:6262-6278`), which Dart rejects.
- The field editor's own **+** builds the filter correctly, with positional keys 0 and 1 (black, `srcIn`;
  `basic_fields.dart:1952-1969`).

The writer's possible workaround (remove the filter object and add it again with **+**) probably won't work.
`colorFilter` is required (`material_library.dart:86520`), and the remove button refuses with "ColorFilter is required
and can't be removed." unless the widget sits loose on the board (`class_field.dart:261-267`). I didn't run the app, so
the page only drops "It starts gray". To confirm live: add **Color Filter** to a Text on a screen, then check its section,
**Problems**, the board and **Run**. If it's confirmed, it belongs in `product-issues.md` and `known-issues.md`. The
writer already routed this.
