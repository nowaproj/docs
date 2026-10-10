# W4 review (Design your app, part 2)

Verifier: Sonnet 5.5. Source of truth: `/home/user/nowa-master` (v3.12.5). Pages: `docs/design/properties.md`, `layout.md`, `responsive.md`, `themes.md`, `theme-styles.md`, `assets.md`, `fonts-icons.md`, `templates.md`, `localization.md`.

Paths are relative to `/home/user/nowa-master` unless marked. Word counts are reader-visible body words (front matter, capture comments and table pipes excluded) unless marked `wc -w`.

## Summary

- Pages checked: 9 of 9 (properties, layout, responsive, themes, theme-styles, assets, fonts-icons, templates, localization).
- Claim rows in the tables below: 156 (each row groups related claims; roughly 250 individual statements were checked against the code, the reference screenshots `captures/ui-map/03`, `05`, `10`, `18`, `20`, or both).
- Changed pages: 9. Verdicts: 22 rows fixed, 1 removed, 3 added (new facts the code confirms), the rest ok.
- Most serious errors fixed:
  - `theme-styles.md`: the dark-mode recipe told readers to click **+** next to **On Pressed**; a new Button reads **Edit** (its `onPressed` starts as an empty function).
  - `themes.md`: removed an unverifiable claim that a Figma import creates theme extensions; made "the app doesn't switch light/dark on its own" apply to new projects only.
  - `layout.md`: Expand in a Wrap is no longer described (a `Flexible` inside a `Wrap` is not valid Flutter; the UI offers it anyway); the **List View** bullet described dropped children, but the picker's List View is a builder with three placeholder items; **+** in a stack's constraint box only clears the pins (the stack's **Alignment** then places the widget); group type rule widened to any shared `children` list.
  - `properties.md`: breadcrumbs show only the screen/component, the parent and the selection; **Add description** is a text line, not a button; **Reset to default** keeps a fixed value for required properties instead of inserting a "starter" value; **Shadows** is a list, not an object; Enter does not end editing in a multi-line text box; a first **Padding** on a group shows in the **Group** section, not as its own wrapper section.
  - `assets.md`: other file types are read as strict UTF-8 text (so binary files of unknown types will not import); a text file drags out as a Text widget; **Rename** needs one file; renaming or moving an asset does not rewrite widget paths.
  - `templates.md`: "most templates add one file" was borderline (7 of 13); multi-file imports add no routes.
  - `responsive.md`: removed a contradiction ("you can't set one layout for phones and tablets on the same screen" vs the **Visibility** recipe).
- Priority items: `{#groups}` present on layout.md; `{#add-a-wrapper}` present on properties.md; all themes labels, the assets flow (**Files** → **assets** → **Import asset**) and the fonts flow (Google Fonts download, **Import** `.ttf`/`.otf`) confirmed; responsive.md states plainly that Nowa 3.12.5 has no breakpoints and claims no breakpoint feature (repo-wide grep, see that section).
- Length: properties.md 1,397 → 1,360 `wc -w` (reader-visible body 1,121 → ~1,090, with the corrections above added); responsive.md 1,428 → 1,375 (body 1,169 → ~1,115). The rest of the `wc -w` count is front matter, two capture comments and table pipes. Cutting further would remove verified facts. Every other page is under 1,200.
- Checks run: all relative links and anchors in the 9 pages resolve (script over every `](...)` target, `{#id}`, headings and `<a id>`); no H1 in bodies, no `---` rules, no emoji, no banned hype words, at most 2 admonitions, capture placeholders have `id`, `state`, `show`, `crop` and no `*` inside (the embed script's pattern).
- Open issues: see the end of this file.

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

## responsive.md

Status: checked and fixed. Breakpoints: the page states plainly that Nowa 3.12.5 has none and makes no claim that they exist. Repo-wide grep for `breakpoint` (case-insensitive, all Dart sources) finds only the editor's own UI (`packages/nowa_ui/lib/src/globals/responsive_utils.dart:6-51`, `lib/auth/auth_widgets.dart:39-56`) and the `FBreakpoints` class inside the forui library definition (`packages/core/lib/src/interpreter/libraries/forui_library.dart`), not a user feature. A grep for `responsive|adaptive|OrientationBuilder|LayoutBuilder` over designer, code, data, ai, widget picker, wrappers, layout, fields and `lib/` finds nothing user-facing. Length: 1,428 `wc -w` / 1,169 body words before, ~1,375 `wc -w` / ~1,115 body words after (the rest is front matter, two capture comments and table pipes).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "Nowa 3.12.5 has no breakpoints ... Details has no per-device settings; each screen has one layout" | fixed | greps above | Reworded: the old "You can't set one layout for phones and another for tablets on the same screen" contradicted the last section (you can switch widgets by width with **Visibility**). Now "no setting for a separate phone or tablet layout". |
| Table: **Expand** in a Column fills the width; in a Row it splits the space equally; **Fixed**/**Auto** keep size | ok | `packages/designer/lib/src/details/flex_size_field.dart:38-137`, `packages/nowa_runtime/lib/src/widgets/widgets.dart:73-87` | Along the axis `flex: 1` (tight `Flexible`), across the axis size = infinity. |
| **Left and right** constraint in a Stack stretches; **Center**; **Spacing** **Between/Around/Evenly**; **Wrap**; **Scroll View**; **List View** | ok | `positioned_details.dart`, `flex_field.dart`, see `layout.md` rows | Anchors `reference/wrappers.md#scrollview` and `#visibility` exist (`<a id>` tags). |
| **Grid View** **Max** and **Max Cross Axis Extent** | ok | `packages/core/lib/src/fields/grid_view_field.dart:170-230` | Tabs **Fixed**/**Max**; label derived from `maxCrossAxisExtent` via `camelCaseToSpaces`. |
| Try it: the down arrow turns the screen's main group into a **Column**, children keep order, **Gap** from the spacing; **W** to **Expand**; **Size** presets | ok | `packages/designer/lib/src/details/group_details.dart:44-66`, `packages/designer/lib/src/design/widget_design.dart:7-29` | `replaceAndKeepArgs` regenerates each child's layout for the new parent, so **Layout** shows the Column options. Wording now "the space between them kept as the **Gap**". |
| **Size** is in the **Screen** section; six presets with these names and sizes | ok | `packages/designer/lib/src/details/widget_fields.dart:202-258`, `packages/core/lib/src/screen_sizes.dart:12-21`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:655` | Names and sizes match exactly. The dropdown lists names only; the page's table adds the sizes. |
| New screen starts at 393 x 808 unless its template sets another size | ok | `packages/designer/lib/src/design_experience/place_board.dart:21-29`, `packages/designer/lib/src/actions/add_template_designer.dart:28-34`, `packages/core/lib/src/interpreter/widget_declarations.dart:171-185` | Templates can carry `auto-width`/`auto-height` (for example `auth_template.dart:19`). |
| **Size** only changes the board; drag a corner or type **W**/**H** | ok | `packages/core/lib/src/board/board_canvas.dart:27-32,177-197`, `board_block.dart:128-137` | The size is stored on the board item. The last size is also kept as `auto-width`/`auto-height` in the screen's source and reused when the screen is placed again (not stated on the page). |
| Copy and paste a screen's title gives a second item of the same screen | ok | `packages/designer/lib/src/design/copy_paste.dart:44-72`, `packages/core/lib/src/board/board_block.dart:162-175` | A board item is copied as its widget source (`HomePage()`), so both items use the same class. |
| Hover the title, click **Play** | ok | `packages/designer/lib/src/panels/canvas_titles.dart:247` | |
| Cloud project: play a screen, **Share preview**, **Open in browser** icon | ok | `packages/designer/lib/src/play_mode/play_mode.dart:44-66,481-520,664-700`, `packages/designer/lib/src/panels/designer_board.dart:137` | While a screen plays the bottom toolbar becomes `PlayingToolbar` with the **Share preview** icon. Local projects get a sync notice instead (`play_mode.dart:47-55`), hence "In a cloud project". |
| Preview page toolbar, **Device Settings** opens **Play Settings**; **Device Size** (platform tabs with `W x H`, **Custom** with **Width**, **Height**, **Pixel ratio**); **Free Size**; **Orientation** | ok | `lib/project/preview_page.dart:15-28`, `packages/designer/lib/src/play_mode/board_play_controller.dart:137-173`, `play_mode_settings.dart:8-200`, `packages/device_preview/lib/src/views/tool_panel/sections/subsections/custom_device.dart:80-195` | "On a computer" matches the `useMobileShell` branch. **Orientation** only shows for devices that can rotate. Not mentioned: **Show mockup frame** switch. |
| **Full Screen** opens a bigger view with a **Device** panel | ok | `play_mode.dart:114-125`, `packages/device_preview/lib/src/views/tool_panel/sections/device.dart:62` | |
| **Run**: phone frame, **Phone** / **Tablet**, **Fullscreen** | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:795-806` | |
| Placeholders: `[name]` for text, three list items, stand-in image, gray, info icon, 48 px box | fixed | `packages/core/lib/src/interpreter/mock.dart:210-217,244-305` | "so a design never looks blank" softened to "doesn't look blank" (nullable widgets mock to nothing). |
| **Default Value** on variables and params is what the board shows | ok | `packages/core/lib/src/widgets/code/variable_widgets.dart:335,460` | Same wording on `logic/variables.md` and `logic/parameters.md`. |
| **Test <Type>** button with **Copies**, sample value, **Edit Test**, **Clear**; board only | ok | `packages/designer/lib/src/details/group_details.dart:160-292` | Needs `children` linked to a list variable or a mapped list; memory only. |
| Media Query + **Visibility**: **Visible**, **Custom Expression...**, Enter evaluates | ok | `packages/core/lib/src/fields/text_fields.dart:806-819`, `field_link_menu.dart:281-285,352-353`, `packages/core/lib/src/fields/expression_builder/expression_builder_popup.dart:243-260` | The freestyle box evaluates on Enter or **Eval**. The typed formula itself was not run in the app (open issue). |
| A screen's size is its board item's size on the board and in Play | ok | `packages/designer/lib/src/play_mode/play_mode.dart:405-411`, `board_canvas.dart:203-218` | `MediaQuery.copyWith(size: constraints)`. |

Links: all targets exist, including the anchors `../test/share.md#what-people-see-in-a-preview`, `../test/instant-play.md#placeholders-on-the-board-real-values-in-play`, `../logic/actions.md#read-the-screen-size`, `../logic/expressions.md#custom-expression`, `../reference/wrappers.md#scrollview` / `#visibility`, `../legacy/tutorials/design-responsive.md`.

## themes.md

Status: checked, 2 claims fixed. Priority labels all confirmed in code and in `captures/ui-map/03-panel-themes.png`: **Fixed** / **Seed** (Mode), **Brightness** (**Light** / **Dark**), **Scheme Variant**, **Seed Color**, **Add Color**, **Active**, theme extensions (**Default Theme** tab plus one per class, maximum 8). Length: 1,167 `wc -w` / ~1,000 body words (no cut needed).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| **Themes** sidebar icon, Ctrl/Cmd+3 | ok | `lib/project/side_bar.dart:34-50`, `lib/setup_general_actions.dart:47-61` | Themes is the third icon (Assistant, Widgets, Themes); Git is inserted after Search. Ctrl on Windows/Linux, Cmd on macOS. |
| Panel title **Themes**, **Refresh** and **Open in New Tab** buttons | ok | `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:154-175` | **Refresh** calls `evalEnv()` (clears the environment cache and rebuilds), so "re-renders the app with the current theme" is a fair summary. |
| Active theme opens with **Colors**, **Typography**, **Widgets** below; arrow next to the name shows the list | ok | `themes_panel.dart:58-80,191-262`, `theme_panel_details.dart:78-140` | |
| New projects have `lightTheme` and `darkTheme` in `lib/globals/themes.dart` | ok | `packages/core/lib/src/file_system/templates/common/themes_dart_template.dart`, `packages/core/lib/src/file_system/templates/file_template.dart:33-34` | |
| Ctrl/Cmd+Z and Ctrl/Cmd+Y inside the panel | ok | `themes_panel.dart:167-171` | |
| Note: a theme without a color scheme gets `ColorScheme.fromSeed` with a purple seed | ok | `theme_panel_fields.dart:44-50,206-209` | `Colors.deepPurple` (0xFF673AB7). |
| **Create New Theme** at the end of the list; type a name, Enter; naming rules and errors | ok | `themes_panel.dart:107-140,300-330`, `packages/core/lib/src/widgets/rename_declaration_field.dart:112-140`, `packages/core/lib/src/file_system/naming.dart:36-59` | Names allow `$` too (not mentioned). Errors: empty, already taken, reserved keyword, not a valid code name. Click-away also submits. |
| New theme opens in **Seed** mode with a purple seed, not applied | ok | `themes_panel.dart:107-140` | Only a tile click calls `_setDefault` (apply). |
| Click a theme: **Active** moves to it; saved as the starting theme in `lib/globals/app_state.dart` | ok | `themes_panel.dart:333-339,382-383`, `packages/core/lib/src/project/env_services/theme_service.dart:51-100`, `packages/core/lib/src/file_system/templates/common/app_state_template.dart:28-35` | `_applyThemeToGetterDefault` rewrites the `_theme` variable's start value. |
| "Your app doesn't switch between light and dark on its own" | fixed | `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:41-52` | True for new projects (`MaterialApp` has only `theme:`). An imported project may set `darkTheme`/`themeMode`, so the sentence now starts "In a new project". |
| Right-click **Rename** / **Delete**; delete asks if code uses the theme; applied theme can't be deleted | ok | `packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart:24-35`, `packages/core/lib/src/actions/block_actions.dart:10-84`, `packages/core/lib/src/interpreter/generators/declaration_generator.dart:27-60` | Tooltip on the disabled item: "Cannot delete applied theme". References inside `main.dart` are ignored by the check. |
| Colors: tiles **Primary**, **Secondary**, **Tertiary**, **Surface** with "on" colors | ok | `models.dart:4-45`, `theme_panel_fields.dart:300-355` | |
| Color popup: role/"on" chips, color area, hue and opacity sliders, eyedropper, **HEX**, **OP**, **Preview**, back arrow, reset icon | ok | `theme_panel_fields.dart:395-560,667-720`, `packages/core/lib/src/fields/color_fields.dart:849-989` | Popup title is `Edit "Primary"`. |
| **Add Color** → **Override Color Role** (Primary Container, Error, Outline, Surface Container ...) | ok | `theme_panel_fields.dart:230-290`, `override_color_popup.dart:20-165`, `material_library.dart` (19 hits for `surfaceContainerHighest`) | The list comes from the library's `ColorScheme`; deprecated roles are excluded. |
| **Brightness** (**Light**/**Dark**), **Mode** (**Fixed**/**Seed**), **Seed Color**, **Scheme Variant** (seed only) | ok | `theme_panel_fields.dart:57-240` | Matches the screenshot. |
| Scheme Variant names: Tonal Spot, Fidelity, Monochrome, Neutral, Vibrant, Expressive, Content, Rainbow, Fruit Salad | ok | `theme_panel_fields.dart:225-233`, `packages/core/lib/src/utils.dart:77-79`, `packages/core/lib/src/interpreter/libraries/material_library.dart:10380-10440` | Labels are the enum names split at capitals. |
| Switching **Mode** keeps the look (Primary becomes the **Seed Color** and back) | ok | `theme_panel_fields.dart:79-108` | |
| **Typography**: 15 styles in **Display**, **Title**, **Headline**, **Body**, **Label**; weight and size on each row | ok | `packages/core/lib/src/fields/text_fields.dart:821-1000` | |
| **Default Font** only for plain `ThemeData(` | ok | `text_fields.dart:~856-860` | `constructorName == ''`. |
| Style editor fields; hover **Edit**; reset icon on the row; **Reset all to default** next to **Typography** | ok | `text_fields.dart:233-260,943-1047`, `packages/core/lib/src/fields/style_fields/style_fields.dart:257-335`, `theme_panel_details.dart:121-135` | Fields: Font Family, Font Weight, Decoration, Font Size, Color, Background, letter spacing, line height, Shadows. |
| **Widgets**: **Fields**, **Buttons** (**Button** / **Icon Button**, button style fields, reset) | ok | `theme_panel_details.dart:152-178`, `packages/core/lib/src/file_system/widgets/previews/themes_preview/theme_details.dart:169-359`, `packages/core/lib/src/fields/button_fields.dart:316-391` | |
| Theme extensions: **Default Theme** tab plus one tab per extension, named after its class | ok | `theme_panel_details.dart:15-46` | |
| "Nowa supports up to 8 theme extensions"; "no button to create one" | ok | `packages/core/lib/src/themes/theme_class_instance.dart:21-34`, `docs/new/whats-new.md:69` | Throws "Cannot have more than 8 Theme Extensions". Extension classes are read from user code (`ast_to_block_visitor.dart:726`). |
| "...or from Nowa AI, for example when it imports a Figma design" | removed | `packages/ai/lib/src/mcp/figma_mcp.dart:71-86` | Nothing shows that Figma import creates theme extensions (the tools write `app_colors.dart` / `app_text.dart` and reimport `themes.dart`). Removed. |
| **Create Theme Setup** button and dialog; files created; existing files skipped | ok | `packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart:8-70`, `packages/core/lib/src/project_environment/env_manager.dart:145-170` | The dialog text itself names `lib/global/theme.dart` (wrong); the page uses the real paths. Product team may want to fix the dialog text. |
| Tip: AI can turn Figma colors and text styles into theme code | ok | `docs/new/whats-new.md:57-60` | |

Links: `theme-styles.md#switch-themes-while-the-app-runs`, `#connect-buttons-to-the-theme`, `fonts-icons.md`, `properties.md`, `../ai/connectors.md` all exist.

## theme-styles.md

Status: checked, 2 claims fixed, 1 unverified step kept with a check. Length: 778 `wc -w` / ~655 body words (no cut needed).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Color picker lists theme colors below it (`primary`, `surface` ...); **Show more colors** adds container, fixed, surface, outline roles | ok | `packages/core/lib/src/fields/color_fields.dart:25-83,699-849` | Raw role names. The list only appears when the field can read a `BuildContext` (widget fields on the board). Expander label is "Show" + "more colors" (`block_field.dart:1318-1352`). |
| Picking a role links the field (shows the role name); list is the **Active** theme's | ok | `color_fields.dart:714-725,816-849` | Writes `Theme.of(context).colorScheme.<role>`; `env.appliedThemeVar`. |
| Hover **Edit** on a theme color edits the active theme in place | ok | `packages/core/lib/src/fields/style_fields/style_fields.dart:257-335`, `color_fields.dart:150-165` | |
| Stop following: **x** on the field, or the detach icon next to **Colors From Theme**; keeps the current color | ok | `color_fields.dart:520-531,765-783` | The detach icon has no tooltip. |
| **With values**: **Alpha** 0 to 1, **Show more** reveals **Red**/**Green**/**Blue** | ok | `color_fields.dart:241-312` | The menu item only shows when the field is a theme reference. An old `withOpacity` note with an **Update** button exists (not mentioned). |
| Text **Style** button shows `bodyMedium`; **Text Styles** popup; hover **Edit** | ok | `packages/designer/lib/src/details/widget_fields.dart:266-310`, `style_fields.dart:131-255` | Popup lists raw names (`displayLarge` ...). |
| **CopyWith**, **Remove CopyWith** | fixed | `packages/core/lib/src/fields/text_fields.dart:181-232` | A text with no style set (the default) shows **Modify Style** in that menu instead of **CopyWith**. Added one sentence. |
| **x** on the style button makes the style your own and empty | ok | `style_fields.dart:162` | Replaces it with `TextStyle()`. |
| **Button Style** shows **Button Theme** / **Icon Button Theme**; **x** gives a custom style with the six fields | ok | `packages/core/lib/src/fields/button_fields.dart:27-28,281-391` | Field label "Button Style" is explicit. |
| **Connect...**, **Connect to Theme**, **Default theme**; no applied theme opens **Create Theme Setup** | ok | `button_fields.dart:396-489` | |
| `AppState` with `changeTheme` in new projects; app does not follow device dark mode | ok | `packages/core/lib/src/file_system/templates/common/app_state_template.dart:5-35`, `main_dart_template.dart:41-52` | |
| Switch-theme step 1: "click **+** next to **On Pressed**" | fixed | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:206`, `nowa_fields.dart:793-825` | A new Button is created with an empty `onPressed` function, so the button reads **Edit** (bolt), not **+** (also `captures/ui-map/20-outline-selection.png`, `docs/logic/events.md:21`). Now "click the button next to **On Pressed**; it reads **Edit** on a new button and **+** if the button has no action yet". `logic/global-state.md:73` has the same inaccurate step (other batch, not edited). |
| Steps 2-4: dot under the top node, **GLOBALS** → `AppState`; **+** in Details → `changeTheme`; **Select theme** | ok (partly checked) | `packages/core/lib/src/state_management/global_state_suggestions.dart:66-93`, `packages/code/lib/src/fields/expression_statement_field.dart:35-95`, `basic_fields.dart:2045-2070` | **Select theme** button and its **Themes** list are in code. The "+" member picker follows the generic reference editor ("Reach deeper with +" on `logic/expressions.md`); not clicked through in the running app. |
| Figma: AI writes theme files under `lib/globals/` and reloads themes | ok | `packages/ai/lib/src/mcp/figma_mcp.dart:71-86` | `app_colors.dart` and `app_text.dart`, then `themes.dart` reimported. |

Links: `themes.md` anchors (`#style-text-fields-and-buttons`, `#add-themes-to-a-project-that-has-none`), `../logic/circuit.md`, `../logic/global-state.md`, `../logic/events.md`, `fonts-icons.md`, `../ai/connectors.md` all exist.

## assets.md

Status: checked, 4 claims fixed or added. The priority flow is confirmed: **Files** → **assets** row → upload icon with the tooltip **Import asset** (screenshot `captures/ui-map/05-panel-files.png`). Length: 794 `wc -w` / ~650 body words (no cut needed).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Files panel: **assets** row with the upload icon **Import asset**; one or more files go into `assets/` | ok | `lib/project/panels/files_panel/files_list.dart:440-516`, `packages/core/lib/src/providers/project_provider.dart:787-804` | `pickFiles(withData: true, allowMultiple: true)`; any extension. The **lib** row has **Add to library**, the **boards** row **Add board**. |
| Click a file for a preview, double-click to open | ok | `files_list.dart:300-345` | In code mode a single click opens the file. |
| Import updates `pubspec.yaml` (`flutter:` → `assets:` per non-empty folder, `fonts:`) | ok | `packages/core/lib/src/providers/project_provider.dart:697-715`, `packages/core/lib/src/settings/pubspec_manager.dart:127-132,160-235` | Only imports, pastes, font imports and package changes call `refresh()`; the page limits the claim to "when you import a file". |
| Recognized types table | ok | `packages/core/lib/src/file_system/file_info.dart:10-80` | Also `.yaml`, `.dart`, `.board`, `.txt` are known types (not asset kinds). |
| "Any other file is imported as a text file" | fixed | `packages/core/lib/src/file_system/importer.dart:12-16`, `packages/core/lib/src/file_system/encoding.dart:8-10` | The text importer decodes UTF-8 strictly, so a binary file of another type cannot be read as text. Reworded to "read as plain text, so stick to the types above for images, media and fonts". |
| Drag files between folders inside **assets** | ok | `files_list.dart:106-126` | |
| Playground note | ok | `packages/core/lib/src/playground/playground_manager.dart:19-37` | The stored project is capped at 3 MB (not stated on the page, no numbers per D3). |
| **Asset** tab, **Pick Image**, **Upload Image**, search; upload saves into `assets/` | ok | `packages/core/lib/src/fields/asset_fields.dart:12-227`, `basic_fields.dart:888-953` | Image provider tabs **Network** / **Asset** / **Bytes**. |
| Button names **Pick Image/SVG/Lottie/Rive/Video/Audio** | ok | `basic_fields.dart:956-1300`, `packages/designer/lib/src/details/widget_fields.dart:120-210` | Each list is `getAll<T>(assetsDir)` of the matching file class; Lottie lists `.json` files. |
| An asset audio file plays only on Android and iOS | ok | `basic_fields.dart:1117` | The code note says "Asset file will work only on Android and iOS". |
| Paste: Ctrl/Cmd+V or board right-click **Paste**; saved in `assets/` as `pasted_image_<id>`; image files from the file manager (desktop) | ok | `packages/designer/lib/src/menus/board_context_menu.dart:19`, `packages/designer/lib/src/design/copy_paste.dart:79-141`, `nowa_copy_paste.dart:40-112` | File paste only when not on the web. |
| Drag from **assets**: Image (1/6 pixel size), SVG, Rive, Video Player, Font → Text | ok | `packages/core/lib/src/file_system/file_object.dart:410-467,519-535,604-616,643-686` | |
| Drag of a text file | added | `file_object.dart:574-577` | A `TextFile` drags as a Text widget with its content; the table lacked this row. |
| Lottie and audio create no widget | ok | `file_object.dart:580-602,653-660` | No `createDragData` override. |
| Dropping files from the computer onto the board does nothing | ok | `lib/project/drop_from_outside.dart:8-47` | `DropFromOutside` is never instantiated; only the AI chat field uses `PlatformDropFromOutside` (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:255`). Consistent with `design/add-widgets.md`. |
| File menu: **Rename**, **Remove file** / **Remove N files**, **Copy as path**, **View in folder** (local), **Show file content** | fixed | `lib/project/panels/files_panel/file_context_menu.dart:33-121` | **Rename** appears only for a single file. Added to the intro of the table. View-only projects get a shorter menu. |
| **Remove file** confirms with **Yes**; Ctrl/Cmd+Z undoes | ok | `packages/core/lib/src/file_system/actions/file_actions.dart:121-203`, `packages/core/lib/src/widgets/nowa_dialogs.dart:6-26` | Message "Are you sure you want to delete ...?" with **Cancel** / **Yes**. `lib/main.dart` can't be deleted. |
| **Rename**: type a name and press Enter | ok | `packages/core/lib/src/file_system/widgets/files_widgets.dart:105-150` | Clicking away cancels the rename. |
| Renaming an asset and widgets that use it | added | `packages/core/lib/src/file_system/nfile_impl.dart:102-128`, `packages/core/lib/src/file_system/dart_file.dart:274-290` | `NFile.move` only refreshes Dart imports; asset paths in widgets are plain strings, not dependencies. Added "Widgets that already use the file keep its old path, so pick the file again in them." Derived from code, not run in the app. |

Links: `fonts-icons.md`, `properties.md`, `../get-started/playground.md`, `../ai/context.md`, `../code/files.md` exist.

## fonts-icons.md

Status: checked, 1 claim sharpened. Priority items confirmed: Google Fonts download on pick (family's regular file to `assets/fonts/<Name>.ttf`, pubspec refreshed) and **Import** of `.ttf` / `.otf` (one file at a time, saved in `assets/fonts/`, selected afterwards). Length: 655 `wc -w` / ~510 body words (no cut needed).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Entry points: theme **Default Font**, a style's **Font Family**; font button shows the font or **Default** | ok | `packages/core/lib/src/fields/text_fields.dart:365-395,233-260,821-860`, screenshot `captures/ui-map/03-panel-themes.png` | |
| One text: **Style** label → **CopyWith** → **Font Family** | fixed | `text_fields.dart:181-232` | A text that uses the default style shows **Modify Style** instead of **CopyWith** (same finding as theme-styles). Added "(**Modify Style** if it uses the default style)" and "the **Style** label". |
| Picking a Google Font downloads its regular file to `assets/fonts/<Font Name>.ttf` and registers it | ok | `text_fields.dart:25-55,397-413` | Skipped when the file exists. Uses the Google Fonts web API; whether the file is a variable font is unconfirmed, so the page says only "regular file". |
| **Import**: `.ttf`/`.otf`, one file, saved in `assets/fonts/`, registered, selected; name = file name without extension | ok | `text_fields.dart:16-23,724-748`, `packages/core/lib/src/file_system/file_object.dart:469-498` | |
| Popup title **Fonts**, search, filter button, "All Fonts" / "Default Fonts" / "Imported by you" | ok | `text_fields.dart:560-700` | The filter is an unlabeled tune icon. |
| Filter meanings | ok | `text_fields.dart:507-533` | **Imported by you** lists every `FontFile` under `assets/`, so used Google Fonts show there too. |
| Web app: 100 Google Fonts at first, search shows up to 20; desktop lists all | ok | `text_fields.dart:520-533` | `kIsWeb` check. |
| Declared `pubspec.yaml` fonts are kept, shown under their own names; undeclared font files added; missing files dropped; popup lists file names | ok | `packages/core/lib/src/settings/pubspec_manager.dart:78-116,165-203`, `docs/new/change-log.md:30` | |
| **Icons** popup: icon + name or **none**, search, grid; Material Icons only | ok | `packages/core/lib/src/fields/icon_field.dart:14-191` | Lists the `Icons` class members. |
| Icon widget: **Size**, **Color**, **Show advanced options** list | ok | `packages/core/lib/src/fields/button_fields.dart:35-69` | |
| Tip: Nowa AI downloads and sets up a missing font | ok | `docs/new/whats-new.md:341` | |

Links: `theme-styles.md#use-a-theme-text-style`, `../get-started/desktop-app.md`, `themes.md`, `assets.md`, `properties.md` exist.

## templates.md

Status: checked, 4 claims fixed or added. Length: 658 `wc -w` / ~545 body words (no cut needed).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Entry points: **Screen** tool, board right-click **Create a page** | ok | `packages/designer/lib/src/widgets/designer_tools.dart:150-160`, `packages/designer/lib/src/menus/board_context_menu.dart:19` | Both invoke `OpenTemplatePickerIntent`. |
| Picker: hint **Search for templates**, **Screens** / **Components**, preview, arrows and Enter | ok | `packages/core/lib/src/services/templates/add_template_action.dart:41-107,135-170`, `packages/command_palette/lib/src/widgets/options/command_palette_body.dart:200-210` | |
| New item is placed near the pointer; screen doesn't become the home screen | ok | `packages/designer/lib/src/actions/add_template_designer.dart:7-37` | Nothing in the add flow sets the home screen. Reworded to "screen or component" since components are placed the same way. |
| "Most templates add one file ..." | fixed | `packages/core/lib/src/services/templates/built_in/*.dart`, `packages/core/lib/src/file_system/actions/file_actions.dart:58-72` | The dialog depends on `templateFiles.length == 1`. Of the 13 listed templates, 7 have one file (Empty Page, Basic Cards 1, Basic Cards 3, Event Info, Audio Player Page, Audio Player, Google Button) and 6 have several (Basic Cards 2, Onboarding Screen, Article, Dashboard, Chat Template, Authentication Template). "Most" was borderline, so the page now names examples of each kind. |
| Single-file dialog: **New** + name, **Class name**, **Path**, **Submit**; `lib/pages/` or `lib/components/`; route added for GoRouter | ok | `file_actions.dart:28-73`, `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94-126`, `packages/core/lib/src/project/env_services/go_router_routing_service.dart:79-82`, `app_routing_service.dart:105-109` | The simple (widget-based) router does nothing in `addRouteByWidget`. |
| Empty Page is 393 x 808 | ok | `packages/designer/lib/src/actions/add_template_designer.dart:28-34`, `packages/core/lib/src/services/templates/built_in/empty_page.dart` | No size metadata, so the first preset is used. |
| Multi-file dialog: **Add** + name, files with checkboxes, rename/move, **Import**, overwrite confirmation, tooltip, screens side by side | ok | `packages/core/lib/src/file_system/widgets/template_widgets/add_template_dialog.dart:95-215`, `template_files_list.dart:100-270`, `add_template_designer.dart:7-37` | |
| Multi-file import adds routes | added (negative) | `add_template_dialog.dart:98-121` | Only `_onSubmitSingleFile` calls `addRouteByWidget`; the multi-file path never does. Added a sentence with a pointer to **Route Settings** (go_router projects, `docs/design/screens.md`). |
| Built-in list | ok | `packages/core/lib/src/services/templates/templates_service.dart:372-389` | 11 screens and 2 components as listed. "Animated Onboarding Screen" is commented out. |
| **Premium** label on Article, Dashboard, Event Info, Audio Player Page; listed after free ones | ok | `built_in/article.dart:4-5`, `dashboard.dart:4-5`, `event_info.dart`, `audio_player.dart:4-5`; `templates_service.dart:16-25` | `premiumFirst` sorts free (false) first despite its name. |
| Without the entitlement: **Time to level up** with **Upgrade** | ok | `add_template_action.dart:19-36`, `packages/core/lib/src/widgets/nowa_dialogs.dart:88-133` | With `kShowPurchaseUi` off it reads "Feature unavailable" with no button. No plan is named in code, so the badge is `paid` only and no price is given (D3). |
| **Files** → **lib** row **Add to library** → **New Widget...** opens the picker and opens the file instead of placing it | ok | `lib/project/panels/files_panel/add_lib_menu.dart:48-67` | |
| Playground picker has **Playgrounds** and **Templates** | ok | `lib/sandbox/sandbox_picker.dart:20-65` | Also shown for public projects opened as a guest. |

Links: `screens.md#name-the-route`, `components.md`, `themes.md`, `properties.md`, `../get-started/playground.md`, `../ai/index.md` exist.

## localization.md

Status: checked, 1 claim narrowed. The page stays short (284 `wc -w` / ~235 body words). It makes no promise about what Nowa AI produces: the AI package holds no localization prompt (prompts are server-side).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Nowa has no translation editor or language switcher in the editor | ok (negative) | grep for `localization\|l10n\|.arb\|translat\|supportedLocales\|Locale(` over `lib/`, designer, ai, code, data, nowa_ui, core panels/fields/widgets/settings | Only hits: AI package refusal, the board's MaterialApp, a dashboard icon, a transform. The device preview's Locale section is disabled (`packages/device_preview/lib/src/device_preview.dart:112-118`). |
| Ask Nowa AI to set it up | ok | `docs/new/whats-new.md:334-338`, `docs/new/change-log.md:185` | 3.7.3: "Just ask Nowa AI to set it up and it'll handle everything for you, end to end." The code cannot show the AI's steps. |
| "...the board can render it" | ok | `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:103-161`, `packages/core/lib/src/localization/localization_blocks.dart:4-9` | The board's MaterialApp honors `locale`, `localizationsDelegates`, `supportedLocales`, `darkTheme`, `themeMode`. |
| "Nowa doesn't support the `flutter_localizations` package" | fixed | `packages/ai/lib/src/tools/packages_tool.dart:164-170` | Only the AI's package tool refuses it ("flutter_localizations is not supported by nowa, use a different approach."). Narrowed to "Nowa AI can't add the `flutter_localizations` package to a project". |
| One Text: **Text Direction** property, values `rtl` / `ltr` | ok | `packages/designer/lib/src/details/widget_fields.dart:300-310`, `packages/core/lib/src/fields/basic_fields.dart:1509-1535` | Enum dropdown listing the raw member names. |
| Section: **Add Wrapper** → **Text Direction**, set to `rtl`, default `ltr` | ok | `packages/core/lib/src/wrappers_to_add.dart:115-119`, `widget_info.dart:712-717` | The wrapper is a Flutter `Directionality`. |
| "Everything inside the wrapper follows it, rows included" | ok (Flutter semantics) | `wrappers_to_add.dart:115-119` | Row and Stack resolve start and end from `Directionality`. Not clicked through on the board. |
| Anchor `properties.md#add-a-wrapper` | ok | `docs/design/properties.md:70` | Present (`## Add a wrapper {#add-a-wrapper}`). |

## Open issues

1. **Another batch's page repeats the On Pressed error.** `docs/logic/global-state.md:73` (and the matching step in W6 notes) says "click **+** next to **On Pressed**". A new Button reads **Edit** (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:206`; `docs/logic/events.md:21` already says so). Not edited (outside W4).
2. **Product text bug.** The **Create Theme Setup** dialog lists `lib/global/theme.dart` and `lib/global/app_state.dart`; the files it creates are `lib/globals/themes.dart` and `lib/globals/app_state.dart` (`packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart:59-61`). Pages use the real paths.
3. **Possible product bug.** The size dropdown in a Wrap offers **Expand** (`packages/core/lib/src/layout/layout.dart:52-66`, `flex_size_field.dart`), which wraps the child in a `Flexible`; Flutter's `Wrap` does not accept that. layout.md therefore says nothing about Expand in a Wrap. Needs a live check.
4. **Not run in the app (code-derived).** (a) The typed formula `MediaQuery.of(context).size.width >= 600` in responsive.md (syntax and scope follow `expressions.md` and the suggestion code; the page tells readers to change **Size** and click **Play**, not to expect live re-evaluation). (b) The "+" member picker in the `changeTheme` recipe (theme-styles.md steps 2-3). (c) "Widgets that already use the file keep its old path" after renaming an asset (assets.md): `NFile.move` only refreshes Dart imports. (d) Strict UTF-8 reading of unknown file types (assets.md says only "read as plain text, so stick to the types above"). (e) "Everything inside the wrapper follows it, rows included" for the **Text Direction** wrapper (Flutter `Directionality` semantics).
5. **Behavior the pages do not state, for the product team.** Importing a file whose name already exists throws (`packages/core/lib/src/file_system/nfile_impl.dart:486-489`) and the **Import asset** handler (`lib/project/panels/files_panel/files_list.dart:440-460`) does not catch it, so the user may see no message; uploading from a widget picker does not call the pubspec refresh itself, so the first asset added only that way may not be registered until another import, paste or font change (`packages/core/lib/src/fields/asset_fields.dart:119-136`). Not claimed on the pages.
6. **Capture requests.** `captures/requests/W4.md` still matches the pages (ids unchanged). `design-templates-1` and `design-layout-1` are marked captured; the pages still carry placeholders for the embed script.
