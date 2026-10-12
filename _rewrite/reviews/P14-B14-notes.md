# P14-B14 notes: reference pages (index, wrappers, shortcuts, glossary)

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Flutter refs point at the framework doc
comments in the local Flutter 3.44.8 stable SDK (`/home/user/flutter`); they are the text api.flutter.dev publishes
(that host doesn't resolve from this environment). Field labels in **Details** are the parameter name split into words
(`packages/core/lib/src/fields/block_field.dart:212-221`, `packages/core/lib/src/utils.dart:77-79`); where a label below
says "derived", it comes from that rule.

## `docs/reference/wrappers.md`

### What changed for the reader

- New warm intro with two everyday examples (product card + Gesture Detector, long column + Scroll View).
- "Add a wrapper": example search terms; reassurance that <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> removes a wrapper again (moved up from "Remove").
- "Reorder wrappers": says why order matters ("each wrapper goes around everything above it") and makes the Container/Padding example explicit (two wrappers).
- New section **The wrappers you'll use most** with one H3 per wrapper that had its own old page: Padding, Scroll View, Gesture Detector, Visibility, Opacity, Material, Text Direction. Each says what it does, when to use it, and what its settings mean.
- **Anchors**: the seven old-page anchors moved from `<Anchor>` spans in the table rows to explicit heading IDs on those H3s (`### Padding {#padding}`, `{#scrollview}`, `{#gesture-detector}`, `{#visibility}`, `{#opacity}`, `{#material}`, `{#text-direction}`). Same IDs, still once each on the page, so the old URLs (`redirects.js:154-160`) and the links from `design/responsive.md` (`#scrollview`, `#visibility`) now land on the detailed section. The other 25 `<Anchor>` IDs are unchanged. Checked with a script: all 32 IDs present exactly once. The seven table rows link up to their section.
- "All wrappers" tables: every description now says what the wrapper does to the widget inside, in plain words, most with a "use it for". Group headings kept word for word (their auto IDs stay the same).
- Jargon explained where it can't be avoided: notifier (Notifier Builder row), validator (Form row), `formKey` (what logic uses it for), screen reader (Opacity), code-like dropdown values (`vertical`/`horizontal`, `ltr`/`rtl`, the `...ScrollPhysics` values, `onDrag`).
- Tip kept (one admonition), with a second example prompt and a way to check the result.
- Nothing moved to the code section (the page had no code-only facts).

### Claims added or changed, with evidence

| Claim | Evidence |
|---|---|
| 32 wrappers, names as listed | `packages/core/lib/src/wrappers_to_add.dart:12-188` |
| Section headers show the friendly names (Scroll View, Text Direction, Clip radius, Color Filter, Screen) | `block_field.dart:180-182` (label from `info.className`), `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:61` (`className => displayName`), `:667-733` |
| **...** menu with **Remove**, shown on hover; grip with move cursor | `packages/core/lib/src/fields/class_field.dart:372-414`, `:416-446` |
| Padding: starts at 8 all round; first field = left/right, second = top/bottom; **Individual padding** switches to left, top, right, bottom and back; minimum 0 | `wrappers_to_add.dart:13-26`; `packages/core/lib/src/fields/basic_fields.dart:745-842` (`_buildSymmetric(horizontal, vertical)`, tooltip `'Individual padding'`, `BFDouble(f, min: 0.0)`) |
| Padding on a Group shows in the Group's **Padding** row | `block_field.dart:796-815`; `packages/designer/lib/src/details/group_details.dart:141-157` |
| Padding use cases (readability, grouping, tap targets) | Old `ui/wrappers/padding.md`; design guidance, no product claim |
| Scroll View settings shown: **Scroll Direction**, **Reverse**, **Padding**, **Physics**, **Keyboard Dismiss Behavior**, **Primary**, **Restoration Id** (derived labels, all constructor parameters except key and child) | `packages/core/lib/src/interpreter/libraries/material_library.dart:109279-109298`; default editor `class_field.dart:100-137` |
| **Scroll Direction** values `vertical` (default) / `horizontal`; enums are dropdowns of the raw value names | `material_library.dart:78960-78966`, `:109286`; `basic_fields.dart:1511-1548` |
| **Reverse** starts at the bottom / the end | Flutter `widgets/single_child_scroll_view.dart:172-185` |
| **Padding** (Scroll View) = space between the scroll area's edges and the content | Flutter `single_child_scroll_view.dart:187-188` |
| **Physics** dropdown: Always/Bouncing/Clamping/NeverScrollable/Page; what each does; empty = platform default | `packages/core/lib/src/fields/list_view_field.dart:355-385`; Flutter `widgets/scroll_physics.dart` class docs (Bouncing "typically seen on iOS", Clamping "typically seen on Android", NeverScrollable "does not allow the user to scroll", AlwaysScrollable "always lets the user scroll"); `single_child_scroll_view.dart:207-213` ("Defaults to matching platform conventions") |
| **Keyboard Dismiss Behavior** `onDrag` hides the keyboard when scrolling starts | `material_library.dart:106642-106658` (values `manual`, `onDrag`; nullable, so the dropdown also has **Default**: `basic_fields.dart:1540-1542`); Flutter `widgets/scroll_view.dart:40-48` |
| **Primary**, **Restoration Id**: special cases, leave as they are | Flutter `scroll_view.dart:191-216` (primary); no Nowa code sets `restorationScopeId` (grep of `packages/core/lib`, `lib`) |
| No **Expand** along the scroll direction inside a Scroll View | `packages/designer/lib/src/details/size_fields.dart:5-41` |
| Try scrolling with **Play** (click the screen's title, then **Play**) | `docs/test/instant-play.md` (clicks go to the app while playing) |
| Gesture Detector: **On Tap**, **On Secondary Tap**, **On Double Tap**, **On Long Press** in Details; more under **Show advanced options** | `packages/designer/lib/src/details/widget_fields.dart:488-514`; `block_field.dart:1331-1365` (`'Show advanced options'`) |
| Advanced events include **On Horizontal Drag End** and **On Scale Update** (derived) | `material_library.dart:92329-92420` (`onHorizontalDragEnd`, `onScaleUpdate`) |
| Secondary tap = right-click with a mouse | Flutter `GestureDetector.onSecondaryTap` (secondary button) |
| Gesture Detector has no visual feedback; Ink Well adds a ripple | Flutter `material/ink_well.dart:298` ("[GestureDetector], for listening for gestures without ink splashes") |
| Event button **+** creates the function and opens Circuit; then reads **Edit** | `basic_fields.dart:533-559`; `packages/core/lib/src/fields/nowa_fields.dart:808`, `:824-826` |
| On the board a click selects; gestures work in **Play** | `docs/test/instant-play.md` |
| Visibility: **Visible** and **Replacement** only; Visible on by default; hidden = replaced by an empty box, so it takes no space | `packages/core/lib/src/fields/text_fields.dart:802-815`; `wrappers_to_add.dart:27-31`; `material_library.dart:115582-115592` (`replacement` default `SizedBox.shrink()`, `maintainSize` false) |
| Click the **Visible** label to link it | `block_field.dart:1003-1046` (label tap opens the link menu); `docs/design/properties.md#link-a-property-to-your-data` |
| Opacity: 0 invisible, 1 fully visible, starts at 0.5 | `wrappers_to_add.dart:37-41`; Flutter `widgets/basic.dart:345-352` |
| Opacity doesn't animate; **Cross Fade** fades between two widgets | Opacity is a plain `Opacity` widget (no duration parameter, `material_library.dart:75019-75040`); Cross Fade `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:444-462`, catalog row `docs/reference/widgets/index.md#cross-fade` |
| At 0 the widget still takes its space and still reacts to taps | Flutter `widgets/basic.dart` Opacity class doc, "Hit testing" ("Setting the opacity to zero does not prevent hit testing"); Opacity only paints, layout unchanged |
| Screen readers skip a widget at 0 unless **Always Include Semantics** is on | Flutter `rendering/proxy_box.dart:956-960` (`_alpha != 0 || alwaysIncludeSemantics`), `widgets/basic.dart:353-362`; label derived from `alwaysIncludeSemantics` |
| Material fields **Color**, **Elevation**, **Shadow Color**, **Tint Color**, **Border**, **Border On Foreground** | `basic_fields.dart:1873-1903` (`surfaceTintColor` labelled **Tint Color**, `shape` labelled **Border**) |
| **Color** empty = theme surface color | `basic_fields.dart:1880-1884` |
| Elevation above 0 casts a shadow; higher = bigger shadow | Flutter `material/material.dart:225-250`, `:317-326` ("A shadow is only displayed if the elevation is greater than zero") |
| **Tint Color** overlay grows with elevation | Flutter `material.dart:287-312` (Material 3); Material 3 is Flutter's default (`material/theme_data.dart:413`) and Nowa doesn't turn it off for user projects (only `packages/nowa_ui` sets `useMaterial3`) |
| **Border**: **+** creates a rounded rectangle with a 1 px black side, with **Border Radius** | `basic_fields.dart:1854-1869`; RoundedRectangleBorder parameters `side`, `borderRadius` |
| **Border On Foreground**: on (default) draws the border over the content | Flutter `material.dart:328-332` |
| Ripple hidden by a filled widget; fix with a Material below the Ink Well | Flutter `material/ink_well.dart:1440-1471` (InkWell needs a Material ancestor; an opaque Container between them hides the splash; use a Material above the opaque widget and around the ink response). Lower in Details = outside: new wrappers are added outermost (`packages/core/lib/src/interpreter/widget/designer_model.dart:482-496`) and Details lists the widget, then its wrappers in order (`packages/designer/lib/src/details/widget_details.dart:185-196`) |
| Text Direction values `rtl` / `ltr` (default `ltr`); rows inside flip their order | `wrappers_to_add.dart:115-119`; `material_library.dart:81163-81168`; Flutter `widgets/basic.dart:5479-5493` (Flex children order follows the ambient direction) |
| Align starts centered; Alignment sliders | `wrappers_to_add.dart:61-70`; `basic_fields.dart:1551` (`BFAlignment`) |
| Fractionally Sized Box: share of the space (0.5 = half) | Flutter `widgets/basic.dart:3228` ("the fraction of the incoming width given to the child") |
| Aspect Ratio starts at 1 | `wrappers_to_add.dart:151-157` |
| Fitted Box scales to fit (shrink a long title) | Flutter `FittedBox` (default `BoxFit.contain`) |
| Safe Area: sides under **Show advanced options**; new screens already wrap their content in one | `widget_fields.dart:516-528`; `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:333-348` (`screenBlock`), used for drawn screens `packages/designer/lib/src/design_experience/place_board.dart:22-30` |
| Transform doesn't change the space the widget takes | Flutter `widgets/basic.dart:1547-1549` |
| Badge "99", Tooltip "Tooltip message", AnimatedContainer 300 ms + gray | `wrappers_to_add.dart:158-187` |
| Ink Well fields include **On Tap** and **Splash Color** | `widget_fields.dart:460-486` |
| Dismissible: **Direction**, **Background**, **On Dismissed** (derived); remove the item in **On Dismissed** or Flutter raises an error (debug) | `wrappers_to_add.dart:168-172`; Flutter `widgets/dismissible.dart` class doc ("its onDismissed callback must remove the item from the list") and `:621-635` (assert "A dismissed Dismissible widget is still part of the tree") |
| Refresh Indicator needs a scrolling widget inside | Flutter `material/refresh_indicator.dart` class doc ("When the child's Scrollable descendant overscrolls...", "will appear if its scrollable descendant can be overscrolled") |
| Interactive Viewer: pan and zoom (no rotation) | Flutter `widgets/interactive_viewer.dart:510-513` |
| Default Text Style: a Text's own settings win | Flutter `widgets/text.dart:32-33` ("descendant Text widgets which don't have an explicit style"; explicit styles merge on top) |
| Form validates Text Field, Dropdown menu and Pin Code Field; `formKey` | `packages/core/lib/src/fields/form_fields.dart:8-41`; `docs/reference/widgets/forms.md` |
| Screen slots **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar** | `widget_fields.dart:202-259` (derived labels) |

### Open questions

1. **Color Filter wrapper may start broken (probable product bug).** `wrappers_to_add.dart:101-114` passes `color` and `blendMode` as *named* arguments, but `ColorFilter.mode` takes them *positionally* (`material_library.dart:80347-80353`, `LazyParameter('Color', 'color', 0)`). Nowa keeps string keys as named arguments: the run path sends them to `namedArgs` and leaves `posArgs` empty (`packages/core/lib/src/interpreter/declaration_internal.dart:239-257`), the problem check counts 0 of 2 positional arguments (`packages/core/lib/src/interpreter/block_tree.dart:5924-5951`, `NotEnoughPositionalArguments`), and the code writer emits `ColorFilter.mode(color: ..., blendMode: ...)` (`block_tree.dart:6264-6280`), which Dart rejects. The field editor's own **+** builds it correctly with positional keys (`basic_fields.dart:1952-1969`). Not checked live. I kept the row neutral ("Recolors the widget... It starts gray.") and did **not** add the old page's grayscale use case (set **Blend Mode** to `saturation`), because it depends on this default. Please verify live; if it's broken, it belongs in `product-issues.md` and `known-issues.md` (workaround: remove the **Color Filter** object in the section and add it again with **+**, which needs checking too).
2. The page is about 2,550 readable words (was about 1,230). If it should be shorter, split it into "Wrappers" (add, reorder, remove and the full list) and "Common wrappers" (the seven detailed sections); the seven anchors would then need redirects (`redirects.js:154-160`) re-pointed.
3. I couldn't check on screen how a widget whose **Visible** is off looks on the board, so the page doesn't say.

## `docs/reference/shortcuts.md`

### What changed for the reader

- Intro: a "start with these five" list (add a widget, undo, group, run, the Shortcuts sheet), so a newcomer knows where to begin. All five were already on the page and verified.
- Shortcuts sheet: one clause on why it's useful while learning.
- Undo: one sentence on what "each area keeps its own history" means in practice (undoing in Circuit doesn't touch the board).
- "Stack" explained in place (widgets that sit on top of each other); "node" explained for Circuit; "regular expressions" glossed as search patterns (code-editor table).
- **Hot Reload** / **Hot Restart** explained in plain words (updates in place vs starts again), from `docs/test/run.md`.
- New paragraph under "When a shortcut does nothing": the two 3.13 cases where a shortcut swallows a key (`/` in **Details**; t, r, v, f in the **Variables** list), linking to the known-issues workarounds.
- New section **If you used an older version**: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> (was the widget picker, now runs the app) and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> (was group/ungroup, now group only). These are the two entries of the old `/shortcuts` page that changed; people arriving from the old URL get them first-hand.
- Keywords: `embedded preview`, `hot reload`, `hot restart`, `open widget picker`, `ungroup`.
- No headings renamed (`#code-editor` is linked from `docs/code/code-mode.md`). Nothing moved to the code section.

### Evidence for new or changed claims

| Claim | Evidence |
|---|---|
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> opens the Library to add; <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> runs the app; <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> groups only | `packages/designer/lib/src/designer_setup.dart:20`, `:50-51`, `:106` (`PlayInDesignerIntent: RunAppAction()`) |
| Ungroup is a right-click entry | `packages/designer/lib/src/menus/widget_context_menu.dart:41-42` |
| Old page: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> opened the widget picker, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> grouped/ungrouped | `_rewrite/old-docs/shortcuts.md:15`, `:24` |
| Restart button is **Hot Reload** (local) / **Hot Restart** (cloud); <kbd>Shift</kbd> + <kbd>R</kbd> | `packages/nowa_ui/lib/top_bar/top_bar_contract.dart:358`, `:378`; `packages/nowa_run/lib/src/actions/actions_setup.dart:20`; behavior wording from `docs/test/run.md` ("A local run reloads in place. A cloud run has to come back up.") |
| `/` typed in **Details** is dropped; t, r, v, f in the **Variables** list | `docs/troubleshooting/known-issues.md#slash-in-details`, `#variables-list-rename`. Likely cause, for the record: the designer binds a bare `/` to `FocusAiChatIntent` (`designer_setup.dart:55`); that action only does something in the experimental new UX (`packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:43`, gated by `experimentalSettings.newUXExperimental` in `packages/core/lib/src/providers/editor_provider.dart:348`), so the `/` shortcut itself isn't documented (D2). |

### Open questions

- The page is about 2,670 readable words, most of it key tables (it was about 2,430 before this pass). If it must shrink, split off "Tabs in code mode" and "Code editor" onto a code-section page (`docs/code/code-mode.md` already links `#code-editor`).
