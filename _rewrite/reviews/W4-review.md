# W4 review (Design your app, part 2)

Verifier: Sonnet 5.5. Source of truth: `/home/user/nowa-master` (v3.12.5). Pages: `docs/design/properties.md`, `layout.md`, `responsive.md`, `themes.md`, `theme-styles.md`, `assets.md`, `fonts-icons.md`, `templates.md`, `localization.md`.

Paths are relative to `/home/user/nowa-master` unless marked. Word counts are reader-visible body words (front matter, capture comments and table pipes excluded) unless marked `wc -w`.

## Summary

(Filled in at the end. Status per page is below as each page is finished.)

## properties.md

Status: checked and fixed. Anchor `{#add-a-wrapper}` was already on the Add a wrapper heading. Length: 1,397 `wc -w` / 1,121 body words before, 1,339 `wc -w` / ~1,070 body words after (the 270 words that are not body are front matter, two capture comments and table pipes), with the facts below added.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Details floats top right under Variables; title bar collapses it; left edge resizes; not shown in code mode | ok | `packages/designer/lib/src/designer_setup.dart:166-232`, `packages/core/lib/src/panels/nowa_expanded_tile.dart:60-95` | Also not built under 600 px width (mobile layout); not mentioned. |
| Nothing selected shows the board's settings | fixed | `packages/designer/lib/src/details/empty_details.dart:10-33`, `board_details.dart:33-67` | True only on a board (**Show Grid**, **Board Color**, **Reset**). With a screen open on its own the panel shows that screen. Reworded to "on a board". Anchor `boards.md#set-the-board-color-and-grid` exists. |
| Section order: breadcrumbs, name, Layout, own properties, one section per wrapper, **Add Wrapper** | ok | `packages/designer/lib/src/details/widget_details.dart:160-200` | Between the name and Layout the code can also show a description line and the **Kept as code** box. |
| Breadcrumbs: "the path from the screen or component to your selection" | fixed | `widget_details.dart:312-355`, `packages/nowa_ui/lib/src/components/nowa_breadcrumbs.dart` | Only three chips: owner (screen/component name, or `..` for a loose widget), the parent (skipped when it is the root), the selection. Screenshot `captures/ui-map/20-outline-selection.png` shows `HomePage > Button`. Page now says "the screen or component the widget is in, its parent, and the widget itself". |
| Plain widgets have a **Create a component** button | ok | `packages/designer/lib/src/details/name_group.dart:92-98` | Icon button, tooltip text is the label (screenshot `18-widget-selected.png`). |
| Screens and components have **Rename**, **Open in New Tab**, **Add description** | fixed | `name_group.dart:100-124`, `packages/core/lib/src/widgets/nowa_widgets.dart:161-163`, `widget_details.dart:363-385` | **Open in New Tab** shows only when the file is not already open. **Add description** is not a button: it is the grey one-line summary under the name, shown until a description exists. Page now says so. |
| A **Text** lists Text, Text Align, Text Direction, Overflow, Style | ok | `packages/designer/lib/src/details/widget_fields.dart:262-312` | Matches `20-outline-selection.png`. |
| Several widgets: name reads **Widget x N**, differing values show **Mixed**, a change applies to all | ok | `name_group.dart:17-25`, `packages/core/lib/src/fields/block_field.dart:478-600,1285-1294` | |
| **Kept as code** box: Nowa couldn't load the widget, shows a placeholder, the box says why | ok | `widget_details.dart:116-139,532-560` | Link `../code/limitations.md` exists (title "What Nowa can show on the board"). |
| "Type a value, then press Enter or click away" | fixed | `packages/core/lib/src/fields/nowa_fields.dart:22-120,203-231`, `basic_fields.dart:119-135` | Values update live (`onChanged`); the edit ends on focus loss. Enter only ends it in a one-line box (a **Text** widget's text is multi-line, so Enter adds a line). Page now says "The board updates as you type. Click away to finish, or press Enter in a one-line box." |
| Text editor: hint `null`, `$` opens the link menu, **Text** grows to several lines | ok | `basic_fields.dart:53-180` | "An empty box shows null" reworded to "No value shows null" (an empty string is not `null`). |
| Number box: `-` hint, drag the left edge, minimum 0 for padding | ok | `basic_fields.dart:182-288`, `nowa_fields.dart:275-292`, `basic_fields.dart:861-870` | 7 px drag zone. |
| Switch; color swatch + HEX + opacity; Container picker has **Solid/Linear/Radial/Sweep** | ok | `basic_fields.dart:378-398`, `packages/core/lib/src/fields/color_fields.dart:373-376,440-565` | |
| Padding: two boxes, **Individual padding** for left/top/right/bottom | ok | `basic_fields.dart:744-870` | Same button toggles back. |
| Alignment: sliders **X**, **Y**, -1 to 1 | ok | `basic_fields.dart:1543-1580` | |
| Choice = dropdown of allowed values; event **+** / **Edit** (opens Circuit); widget button + brush | ok | `basic_fields.dart:1510-1540,520-560`, `nowa_fields.dart:793-825,420-520` | |
| List: header with count, hover **+**, drag handle, **Load More** after ten | fixed | `packages/core/lib/src/fields/list_field.dart:8-210` | The header number is editable (changes the length); **Load More** adds ten at a time. Both now stated. **Shadows** is a list (`boxShadow`), not an object: moved from the object row to the list row. |
| Object: hover **+** or remove button, fields underneath, arrow folds | ok | `packages/core/lib/src/fields/class_field.dart:100-330` | Required objects show an error toast instead of being removed; not mentioned. |
| **Show advanced options** / **Hide advanced options** | ok | `block_field.dart:1318-1352` | Default label; some editors use other words ("more colors"). |
| Link: click the name, menu titled **Link** + name, **Detach...**, **Create Param...**, **Create Variable...**, **Custom Expression...** | ok | `block_field.dart:990-1030`, `packages/core/lib/src/fields/field_link_menu.dart:317-404` | Added that **Detach...** keeps the current value (`block_field.dart:703-715`, matches `logic/expressions.md`). |
| **Reset to default**: removes the value; a required property "gets a starter value" | fixed | `block_field.dart:257-280,703-715,812-842` | For a required property the code keeps the current value as a fixed value (or a type default if that fails), it does not insert a "starter" value. Page now says "can't be removed, so Nowa keeps a fixed value there instead". |
| **Set to null** only for nullable types; both undoable | ok | `block_field.dart:812-842` | |
| Add Wrapper: hint **Search for a wrapper**, Enter or click, own section, Padding 8 on every side | ok | `widget_details.dart:66-113`, `packages/core/lib/src/wrappers_to_add.dart:12-26` | |
| "The wrapper gets its own section in **Details**" | fixed | `packages/core/lib/src/fields/block_field.dart:791-806` | On a group (Stack, Row, Column) the first **Padding** wrapper is skipped in the wrapper sections and shown in the **Group** section's **Padding** row. Exception added to step 3 with a link to `layout.md#groups`. |
| Order: each new wrapper is outermost; a lower section is outside the ones above | ok | `packages/core/lib/src/interpreter/widget/designer_model.dart:472-486`, `widget_instance_impl.dart:85-98,274` | Container/Padding example follows from Flutter semantics. |
| Reorder by grip; line shows the landing spot; **Remove** from the three-dot menu; undo | ok | `class_field.dart:344-446`, `packages/designer/lib/src/details/wrapper_details.dart:8-109` | The menu button is an icon (`more_horiz`) with no label, so the page now says "three dots" instead of bold **...**. |
| **Add Wrapper** hidden for several widgets; 32 wrappers | ok | `widget_details.dart:145-148`, `wrappers_to_add.dart` | Counted 32 names. `reference/wrappers.md` says 32 too. |
| Tip: select a widget, ask in **Agent** mode | ok | `docs/ai/context.md:15` | Selection is auto-attached per the AI context page. |

Links: all targets exist (`boards.md#set-the-board-color-and-grid`, `select-and-edit.md#undo-and-redo`, `fonts-icons.md#choose-an-icon`, `theme-styles.md#use-a-theme-text-style`, `../logic/expressions.md#dollar`, `#link-menu`, `../reference/wrappers.md`, `../ai/context.md`, `../code/limitations.md`).

Cuts (no facts lost): merged the nothing-selected sentence into the first section, dropped repeated "See ..." phrases, and removed the Expressions and Wrappers links from Next steps (both are linked in the body).

## layout.md

Status: checked and fixed. Anchor `{#groups}` is on the **Groups** heading (kept; the app's link `/ui/layout/groups` opens `widgets_to_add.dart:249` docUrl). Length: 1,154 `wc -w` / ~940 body words (no cut needed).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Ctrl/Cmd+G groups, right-click **Group**; **Ungroup** in the right-click menu for one group; the shortcut again nests | ok | `packages/designer/lib/src/designer_setup.dart:20`, `packages/core/lib/src/inputs.dart:22-25`, `packages/designer/lib/src/menus/widget_context_menu.dart:68-75`, `packages/designer/lib/src/actions/designer_actions.dart:46-113` | Ctrl on Windows/Linux, Cmd on macOS. There is no ungroup shortcut. |
| "Inside a Row, Column or Stack the new group is the same kind as its parent; anywhere else a Stack" | fixed | `packages/designer/lib/src/design/common_design.dart:65-75,91`, `packages/core/lib/src/interpreter/block_utils.dart:6-37` | The code copies the parent of any shared `children` list (a Wrap, List View or Page View too), not only Row/Column/Stack. Reworded to "if the widgets sit together in one list of children, such as a Row, Column or Stack, ... same kind as their parent. Otherwise a Stack". |
| Empty **Group** from the widget picker | ok | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:241-252` | `createStack([])`. |
| **Group** header: first button Stack, right arrow Row, down arrow Column; Stack to Row/Column orders children and derives **Gap** | ok | `packages/designer/lib/src/details/group_details.dart:44-157` | Screenshot `captures/ui-map/10-screen-selected.png` shows the three buttons and the Stack fields. |
| **Padding** in the Group section: two boxes, **Individual padding**, adds a **Padding** wrapper | ok | `packages/designer/lib/src/details/inline_wrapper_fields.dart:8-148` | The first Padding wrapper of a group is shown here and hidden from the wrapper sections (`block_field.dart:791-806`). Now noted on properties.md step 3. |
| A Stack lists **Alignment**, **Fit**, **Text Direction**, **Clip Behavior**, **Children** | ok | screenshot `10-screen-selected.png` | |
| Rows/columns: **Alignment** 3 x 3 (nine cells with **Fixed**, three across otherwise), **Main Axis Size** `max`/`min`, **Spacing** options, **Gap** only with **Fixed**, min 0, **Children** | ok | `packages/designer/lib/src/details/flex_field.dart:11-52,142-210,382-446` | Labels come from slot names via `camelCaseToSpaces` (`packages/core/lib/src/utils.dart:77-79`). Between/Around/Evenly wording is Flutter's `MainAxisAlignment`. |
| Stack child: **L/T/R/B/W/H** greyed when unpinned; **W**/**H** with **Fixed**/**Auto** | ok | `packages/designer/lib/src/details/positioned_details.dart:12-93`, `size_fields.dart:225-265` | |
| Constraint dropdown labels (**Left**, **Right**, **Left and right**, **Center**; **Top**, **Bottom**, **Top and bottom**, **Center**) | ok | `positioned_details.dart:96-185` | |
| Constraints box: click bars, Shift-click the opposite bar to pin both, **+** in the middle | ok | `positioned_details.dart:187-285` | |
| "The **+** clears the pins and centers the widget"; "**Center** keeps it centered" | fixed | `packages/core/lib/src/layout/positioned_helper.dart:352-355`, `packages/core/lib/src/widgets_to_add/default_blocks.dart:290-296` | `setCenterConstraints` only clears the four pins; the widget then sits at the Stack's own **Alignment** (0, 0 = centered for Stacks Nowa creates). Reworded. |
| Constraints work for several widgets | ok | `positioned_details.dart:96-110,230-280` | |
| **Fixed** fills in the current size; **Auto** only when the widget has a natural size | ok | `size_fields.dart:5-132,226-262` | Size 2000 is used when the widget has no measured size (edge case). |
| **Expand**: along the axis takes the leftover space, across fills the full size; offered in Row/Column/Wrap | fixed | `packages/designer/lib/src/details/flex_size_field.dart:6-137`, `packages/core/lib/src/layout/flex_layout.dart:49-110`, `packages/nowa_runtime/lib/src/widgets/widgets.dart:73-87` | Along the axis sets `flex: 1` (a `Flexible` with tight fit); across sets width/height to infinity. A Wrap's children also get these dropdowns (`layout.dart:52-66`), but a `Flexible` inside a Wrap is not valid in Flutter, so the page no longer says what Expand does in a Wrap. Open issue (see below). |
| Layout section by parent (board item X/Y/W/H, Stack, Row/Column/Wrap, List View Fixed/Auto, other = empty with **+**) | fixed | `packages/core/lib/src/layout/layout.dart:52-66`, `packages/designer/lib/src/details/layout_details.dart:15-171` | The **+** adds a `SizedBox` layout wrapper (no size set yet), not "a fixed-size box". Now "add a size box with **W** and **H**". Rewritten as a list. |
| Scroll View: **Add Wrapper** → **Scroll View**; **Expand** not offered along the scroll direction | ok | `packages/core/lib/src/wrappers_to_add.dart:56-60`, `size_fields.dart:5-60` | Checks every ancestor with a Scroll View. |
| **Wrap** from the widget picker | ok | `widgets_to_add.dart:440-452` | |
| **List View**: "children are dropped in order like a Column, and each gets a size box" | fixed | `widgets_to_add.dart:296-321` | The picker's List View is `ListView.builder` with `itemCount: 3` and a placeholder item, so there are no dropped children by default. Replaced with what the code shows and linked `reference/widgets/lists.md`. |

Links: `responsive.md`, `select-and-edit.md`, `properties.md`, `../reference/widgets/lists.md` all exist.
