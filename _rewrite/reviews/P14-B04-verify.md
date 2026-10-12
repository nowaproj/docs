# P14-B04 verify: design basics

Verifier: P14-B04-V. Pages (under `docs/design/`): `index.md`, `boards.md`, `screens.md`, `components.md`,
`library.md`, `add-widgets.md`, `select-and-edit.md`, `properties.md`, `layout.md`. Diff checked against `origin/main`
(`9f21e4c`). Code refs are `path:line` in `/home/user/nowa-master` (3.13.0, `3cb32031c`); Flutter refs are the local SDK
source `/home/user/flutter`. Work in progress: sections are appended page by page; the summary is filled in last.

## Summary

- **Pages checked:** all nine, every `+` and `-` line of the diff, plus the unchanged text for the audience rules.
- **Claims checked:** about 110 (table rows below; trivial "ok" claims grouped). Every flagged item from the writer
  was checked in the code: the "Pick the right arrangement" section, the Stack settings, the constraints table, the
  "good for" uses, the three corrections of the old docs (alignment axes with **Between**/**Around**/**Evenly**,
  Ctrl/Cmd+G never ungroups, **Detach** on a screen versus **Copy as new widget**), the four code-derived claims and
  "avoid Expand inside a Wrap". All three corrections of the old docs hold.
- **Fixed:** 18 accuracy fixes (layout.md 9, screens.md 3, components.md 2, index.md 2, library.md 1, properties.md 1).
  The most serious: (1) layout.md told readers that **Center** then **Top** keeps a widget near the top, but **Top**
  pins it at its new, centered distance, so the page now adds "type the distance in **T**"; (2) the Stack's **Text
  Direction** row suggested it sets right-to-left layout, but on a Stack it only affects a start/end alignment and
  never flips widgets or text, so it now points to the **Text Direction** wrapper; (3) properties.md said **Text
  Align** starts with **Default**, but it's four toggle buttons (routed from B13; now **Overflow**); (4) the
  group-background tip said to draw the shape "behind the widgets", but a new shape lands on top, and the trick only
  works for freely placed widgets with the shape selected first; (5) index.md's intro said everything you design
  becomes part of your app, contradicting its own table (boards and loose widgets don't).
- **Removed:** 0 claims. **Restored/added:** 1 (Scroll View **Scroll Direction** for a sideways Row, routed from
  B14), plus a link for older projects to switch to GoRouter where **Route Settings** is gated.
- **Audience fixes:** 3 (GoRouter explained on screens.md, "breakpoints" replaced on index.md, "a group of settings"
  renamed so it doesn't clash with layout groups).
- **Moved facts:** all 32 in the for-code file are verbatim and none was needed on the pages. No new moves.
- **Coverage:** 7 of 7 obsolete rows confirmed, 10 covered rows sampled, all correct.
- **Open issues:** 5 (see the end), none blocking: five code-derived claims not run live, Expand in a Wrap, layout.md
  at ~2,180 words, an undo nuance after switching a Stack to a Row/Column, and P21 not re-checked.

## layout.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Pick the right arrangement": Column, Row, Stack, what each does, how each reacts to change, nesting example | ok | Flutter Column/Row/Stack semantics; `packages/core/lib/src/layout/layout.dart:55-63` (Stack children are positioned, Row/Column children flow) | Advice and examples. |
| "...and so does the main group of every screen" | fixed | Built-in templates: Empty Page body is a Stack (`packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`), others use Column/NFlex; AI-made screens can use any body | Overclaimed "every screen". Now "a screen's main group, the one that holds its content". |
| Empty Page starts as a Stack with Fit `expand` and Alignment 0,0 | ok | `empty_page.dart:21-27` | |
| Group: same kind as the parent list, else a Stack; widgets keep their place | ok | `packages/designer/lib/src/design/common_design.dart:58-67` (`_createGroup`), `:83-130` (`group`, `layout.moveTo` keeps positions) | Writer's line numbers were off by 2-3; facts hold. |
| Shift-click adds to the selection, on the board and in the Outline | ok | `packages/designer/lib/src/design_experience/designer_board_controller.dart:91,99`; `packages/nowa_ui/lib/outline/outline_view.dart:206,386`; `packages/core/lib/src/providers/selection_provider.dart:41-58` (appends in click order) | |
| Ctrl/Cmd+G and right-click **Group**; Ctrl/Cmd+G on a group nests it, never ungroups (correction of the old docs) | ok | `packages/designer/lib/src/designer_setup.dart:20`; `packages/designer/lib/src/actions/designer_actions.dart:46-56`; `packages/designer/lib/src/menus/widget_context_menu.dart:40` | Old "Ctrl/Cmd+G again ungroups" is wrong in 3.13. |
| **Ungroup** shows for one selected group; widgets stay, the group goes | ok | `widget_context_menu.dart:41-42`; `packages/core/lib/src/interpreter/type.dart:67-68`; `common_design.dart:25-56` | A group with wrappers keeps them as an empty widget (edge case, not stated). |
| Empty **Group** from the Library | ok | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:268-279` (`createStack([])`) | |
| Tip: a shape selected first that covers the others becomes the group's background, and keeps its color after a switch to Row/Column | fixed (wording) | `common_design.dart:69-81` (`_firstIsBg`: 2+ widgets, the first has no base widget, its rect contains the others), `:94-96` (the shape becomes the group, the group goes inside it); a shape is a Container, which is a wrapper (`packages/core/lib/src/widgets_to_add/default_blocks.dart:8-13`, `packages/core/lib/src/interpreter/widget/widget_blocks.dart:307-311`, `widget_instance_impl.dart:78-82`); switching replaces only the base widget (`packages/designer/lib/src/details/group_details.dart:17-41`) | Code-derived, not run live. "Draw a shape behind the widgets" was misleading: a newly drawn shape lands on top of a stack's widgets (`packages/designer/lib/src/design_experience/drag_rule.dart:235-242`) and would hide them. Now: for freely placed widgets, draw a shape that covers them, **Send to back** if it hides them (`widget_context_menu.dart:48`), click the shape first, Shift-click the rest, group. It only works for widgets placed freely (in a Row/Column the shape becomes one more item), now said. |
| Group header: Stack, right arrow (Row), down arrow (Column); a screen's main group via its title | ok | `group_details.dart:101-120`; screen board item maps to the component root (`packages/designer/lib/src/details/widget_details.dart:54-63`), whose base widget is the body group (Scaffold and SafeArea are wrappers: `widget_blocks.dart:295-303`) | |
| Stack → Row/Column orders by position (top or left) and takes the Gap from the first two | ok | `group_details.dart:60-63`; `packages/core/lib/src/layout/flex_layout.dart:148-169`; `packages/designer/lib/src/design/group_design.dart:8-24`; `default_blocks.dart:307-316` (a real Row or Column) | |
| "It's safe to experiment, because Ctrl/Cmd+Z switches it back" | fixed (wording) | `group_details.dart:37-40` (the switch is one undoable record); the reordering of the children (`group_details.dart:61`) is done outside that record | Kept the undo, dropped "safe to experiment": "If you don't like the result, Ctrl/Cmd+Z switches it back." |
| Group **Padding**: one value for left/right, one for top/bottom, **Individual padding**; adds a Padding wrapper | ok | `packages/designer/lib/src/details/inline_wrapper_fields.dart:8-151` | |
| **⋯** → **Replace with...** | ok | `group_details.dart:81-97` | |
| Stack **Alignment**: X/Y sliders -1..1 | ok | `packages/core/lib/src/fields/basic_fields.dart:1551-1574`; registered for `AlignmentGeometry` (`packages/core/lib/src/fields/block_field.dart:49`) | |
| Alignment = "where widgets that aren't pinned to an edge sit"; "Stacks that Nowa creates start at 0 and 0" | fixed | Flutter `packages/flutter/lib/src/widgets/basic.dart` (Stack.alignment places non-positioned and partly positioned children); `createStack` and Empty Page set `Alignment(0, 0)` (`default_blocks.dart:291-297`, `empty_page.dart:25`); Flutter's own default is top-start (`packages/core/lib/src/interpreter/libraries/material_library.dart:76836`) | A widget pinned only to Top still takes its across position from Alignment, so now "Where widgets sit in any direction they aren't pinned in". "Stacks that Nowa creates" could include AI-written code with no alignment (top-left), so now "A stack you make in the editor ..., and so does a screen made from **Empty Page**". |
| **Fit** `loose` / `expand` / `passthrough` and what each does; Empty Page uses `expand` | ok | `material_library.dart:76838` (non-nullable, no **Default**), `:119901-119907` (values); `basic_fields.dart:1511-1548`; Flutter `rendering/stack.dart` StackFit docs; `empty_page.dart:24` | "No pin and no fixed size" = Flutter's non-positioned child, since W/H in a stack are the Positioned width/height (`packages/core/lib/src/layout/positioned_helper.dart:79-84`). |
| **Text Direction**: "Leave it on Default to follow your app's language", link to the RTL page | fixed | Flutter `widgets/basic.dart:4739-4741` ("The text direction with which to resolve alignment"), `rendering/stack.dart:401` (used only for the alignment); values `rtl`, `ltr` and **Default** (`material_library.dart:81163-81169`, `basic_fields.dart:1540-1545`) | The old row implied it sets the stack's reading direction; it doesn't flip widgets or text, and editor stacks use a left/right alignment, so it rarely matters. Now says so and points to the **Text Direction** wrapper (`docs/design/localization.md#show-text-right-to-left`) for mirroring. |
| **Clip Behavior** `none`, `hardEdge` (default), `antiAlias`, `antiAliasWithSaveLayer` | ok | `material_library.dart:76839` (default `Clip.hardEdge`), `:79889-79901` | |
| **Children**: later ones on top | ok | Flutter Stack paint order | |
| Row/Column **Alignment** grid: 9 cells with **Fixed**, else only the across position (left/center/right in a Column, top/center/bottom in a Row) (correction of the old docs) | ok | `packages/designer/lib/src/details/flex_field.dart:11-20`, `:103-131` (outer strips run across), `:212-219` (non-Fixed taps set only the cross value) | Old page had the axes swapped. |
| **Main Axis Size** `max`/`min`; **Spacing** **Fixed**/**Between**/**Around**/**Evenly** and their meanings; **Gap** only with Fixed, min 0 | ok | `flex_field.dart:40-48`, `:378-436`; Flutter MainAxisAlignment | |
| **Children**: hover a row for the drag handle; hover **Children** and **+** adds a copy of the last widget | ok | `packages/core/lib/src/fields/list_field.dart:33-53`, `:183-188`, `:209-235` | |
| Arrow key along a Row/Column moves the widget one place | ok | `packages/designer/lib/src/design/order_design.dart:99-113`; `designer_setup.dart:26-49` | |
| L/T/R/B greyed when not pinned; W/H with Fixed/Auto only when the widget has a natural size | ok | `packages/designer/lib/src/details/positioned_details.dart:26-63`; `packages/designer/lib/src/details/size_fields.dart:65-128`, `:161` (no dropdown with one option) | |
| Constraint dropdown labels; table of what each does; **W**/**H** greyed with both sides | ok | `positioned_details.dart:93-193`; `positioned_helper.dart:330-340` (both sides clear width/height) | |
| Bars pin a side, Shift-click the opposite bar pins both, **+** clears every pin, works on several widgets | ok | `positioned_details.dart:197-279` | |
| "The **+** ... removes every pin, so the widget centers both ways" | fixed (wording) | `positioned_details.dart:255-261` (`setCenterConstraints`) | It goes to the stack's Alignment, which is only the middle by default. Now "the same as **Center** both ways". |
| "To center a widget across but keep it near the top, choose **Center** first, then **Top**" | fixed | `positioned_details.dart:128`, `:179` (**Center** clears both axes, `positioned_helper.dart:352-355`), `positioned_helper.dart:306-310`, `:173-183` (**Top** pins at the widget's current, now centered, distance) | After **Center** the widget sits in the middle, so **Top** pins it there, not near the top. Now: choose **Center**, then **Top**, then type the distance in **T**. Also added that **Center** moves the widget to the stack's Alignment. |
| Dragging a centered widget pins it to the left and top again | ok (wording tightened) | `drag_rule.dart:244-263` (`layout.moveTo`), `packages/core/lib/src/layout/layout.dart:93`, `:139-153` (`setOnly` → `setX`/`setY`), `positioned_helper.dart:114-148` (an unpinned direction pins left/top) | Code-derived, not run live. "Choose Center once the widget is where you want it" was misleading (Center moves it to the middle anyway); now "Set **Center** last, once you're done dragging." |
| Check constraints by changing the screen's **Size** or dragging a corner | ok | `packages/designer/lib/src/details/widget_fields.dart:226-245`; responsive.md (live-checked in P12) | |
| "**W** and **H** each have a dropdown" | fixed | `size_fields.dart:161` (hidden when only **Fixed** is possible) | Now "usually each have a dropdown". |
| **Fixed** fills in the current size; **Auto** only with a natural size, includes padding; **Expand** shares the space left equally, fills across; "Good for" uses | ok | `size_fields.dart:236-283`; `packages/designer/lib/src/details/flex_size_field.dart:46-67`, `:99-120`; `packages/nowa_runtime/lib/src/widgets/widgets.dart:72-89` (Flexible, tight, flex 1); padding is a wrapper inside the size box (`packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:88-92`) | Uses are advice. |
| "Avoid Expand inside a Wrap": Expand only works in a Row or Column; a Wrap offers it, choose Fixed or Auto there | ok | Wrap children get the flex size field (`layout.dart:55-63`); Expand along = `Flexible` (`widgets.dart:84-86`), which Flutter only accepts in a Flex; across = width/height infinity, which a Wrap can't give | Product issue P14. Not run live; worded as advice, no claim about the exact error. |
| Layout section per parent (board item, Stack, Row/Column/Wrap, List View, other + **+**) | ok | `packages/designer/lib/src/details/layout_details.dart:34-79`; `layout.dart:55-63` | |
| Scroll View disables Expand in its direction | ok | `size_fields.dart:5-40` | |
| Routed from B14: Scroll View **Scroll Direction** `horizontal` for a sideways Row, `vertical` default, link to Wrappers | restored (added) | Scroll View = `SingleChildScrollView` (`packages/core/lib/src/wrappers_to_add.dart:56-60`); `scrollDirection` non-nullable `Axis`, default vertical (`material_library.dart:109286`), values `horizontal`, `vertical` lowercase (`:78960-78966`, `basic_fields.dart:1540-1546`, no **Default**); label from the param name (`packages/core/lib/src/utils.dart:77-79`); all params shown (`packages/core/lib/src/fields/class_field.dart:91-137`); `docs/reference/wrappers.md` has `{#scrollview}` | Added after the Scroll View bullet. |

Removed facts: none lost. The old sentences were reworded or expanded (groups, padding, Stack settings, constraints,
size modes, per-parent list, scroll/wrap/list). Audience: no code-only facts on the page; enum values shown in
dropdowns (`loose`, `ltr`, `hardEdge`, `max`...) are UI text, each explained (R3). Word count after the fixes and the
routed B14 sentence: ~2,180 words of prose (stripped of markup), just under the ~2,200 limit (the writer's version was
~2,080). If anything more is added here, use the writer's split plan: "Place widgets in a stack" plus "Stack settings"
as their own page, linked from "Pick the right arrangement".

## screens.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| **Components** chip lists component templates; **Empty Page** is a blank screen; dialog titled after the template | ok | `packages/core/lib/src/services/templates/built_in/empty_page.dart:3-10`; template picker (unchanged facts) | |
| **Class name** and **Path** lines show how it's named and stored; can be left as they are | ok | `packages/core/lib/src/file_system/widgets/file_name_text_field.dart:172-215` (pre-filled from the name, editable on hover) | |
| GoRouter projects get a route; Route Settings only in GoRouter projects, which new projects are | ok, explained | `packages/designer/lib/src/details/route_details.dart:18`, `:107`, `:116-117` ("only available in projects using go_router"); `packages/core/lib/src/plugin.dart:124-128`; logic/router.md | R4: "GoRouter" was never explained. Now "the navigation system new projects start with", plus a link for older projects to `../logic/router.md#switch-an-older-project-to-gorouter` (gating note with its fix). |
| 393 × 808 is the **Pixel 3a** preset | ok | `packages/core/lib/src/screen_sizes.dart:12-13` | |
| Slot rows, **null** (empty), drag-onto-Stack caveat, **Size** presets | ok | `packages/designer/lib/src/details/widget_fields.dart:202-259` | Wording only. |
| "Your content lives in the screen's main group" | fixed (wording) | Templates differ (see layout.md row) | Now "usually lives". |
| "Other sections, such as **Safe Area** ..., are covered in [Change widget properties]" | fixed | `packages/core/lib/src/wrappers_to_add.dart:100` (Safe Area is a wrapper); properties.md doesn't mention Safe Area | Link now goes to `properties.md#add-a-wrapper` and `../reference/wrappers.md#safe-area`, where Safe Area is described. |
| Route = the screen's address; other screens open it; part of the web link; route-parameter example | ok | logic/router.md; `route_details.dart:113-150` | |
| Home screen, home icon | ok | unchanged facts | |
| Rename updates every place; description is a note for teammates and Nowa AI | ok | `docs/new/whats-new.md:168-169` | |
| **Copy as new widget** gives a separate screen placed on the board | ok | `packages/designer/lib/src/design/common_design.dart:217-259` (new class, new file, `placeBlock` at the pointer, which is over the board when you right-click a title) | |
| One screen on several boards or twice; copy/paste adds another item for the same screen | ok | `packages/designer/lib/src/design/copy_paste.dart` (research "Copy / Cut / Paste"); `widget_fields.dart:235-240` (each board item has its own **Size**); responsive.md (live-checked) | |
| **Detach** on a screen's board item makes a loose copy that isn't part of the app | ok, wording tightened | `packages/designer/lib/src/menus/widget_context_menu.dart:50-51` (shown whenever the item has a component, which a screen's board item has); `common_design.dart:183-193` (`detach` swaps the board item for a copy of the screen's widgets); `packages/designer/lib/src/actions/designer_actions.dart:180-201` (undoable, deletes nothing) | Code-derived, not run live. Now "swaps that board item for a loose copy that isn't part of your app. The screen itself stays in your project, and Ctrl/Cmd+Z undoes the swap", so the reader doesn't fear losing the screen. Old docs' "Detach separates a screen instance" stays corrected. |
| Removing keeps the screen; drag it back from the Library | ok | boards.md, `library_host.dart` | |

Removed facts: file mechanics (`lib/pages/`, file renamed, note saved in code, copy in a new file, "its file stays")
are in the for-code file (#screens-and-routes); the page keeps every step and result in plain words.

## components.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Recipe-card example; "instance" defined | ok | old `ui/components.md`; instances share the component's widgets | |
| Unique name: no screen, component or built-in widget may use it; Nowa suggests a free one with a number (`Container1`) | ok | `packages/core/lib/src/file_system/naming.dart:35-37` (`lookup` covers the project and libraries, so `Container` is taken), `:126-151`; `common_design.dart:132-146` | |
| Swaps the widget for an instance at the same size and position | ok | `common_design.dart:148-181` (`LayoutSnapshot`) | |
| **Class name** / **Path** lines | ok | `file_name_text_field.dart:172-215` | |
| Shows up in the Library under **Project**; one link to `../code/generated-code.md#components` | ok | allowed anchor | |
| A wrapper added while the component's board item is selected becomes part of the component; on one instance it wraps only that instance | ok, wording tightened | `packages/designer/lib/src/details/widget_details.dart:54-63` (a selected root instance of a component maps to the component's own top widget), `:66-90` (**Add Wrapper** wraps the mapped widget); a component opened on its own is a root instance too (`packages/designer/lib/src/widgets/widget_designer.dart:54-63`) | Code-derived, not run live. "While the component itself is selected" was ambiguous (an instance on a screen is also "the component"). Now "while the component's own board item is selected (or while it's open on its own)". |
| Edit inside an instance; first crumb selects the whole instance | ok | `widget_details.dart:314-334` | |
| **Copy as new widget**: a new component you can change on its own | ok, completed | `common_design.dart:217-259` | Added where the copy appears ("where your pointer last was", `placeBlock` uses `board.pointerLocation`) and that the right-clicked instance stays linked to the original; a reader would otherwise expect the instance to be replaced. |
| **Detach** loses param values (known issue) | ok | unchanged, `docs/troubleshooting/known-issues.md#detach` | |
| Params: `title` / **String** example; link by clicking the property's name and picking the param | ok | `packages/core/lib/src/fields/block_field.dart:1025-1027` (tap on the name opens the link menu) | |
| Adding a variable sets up what the component needs | ok | stateful conversion (research features-designer-core "Variables box") | |
| Manage: folders such as `pages`; Delete flow; undo while the Library has focus; **Show in code** | ok | `lib/project/panels/library_panel/library_host.dart:156-235`; screenshot `design-components-2` | |

Removed facts: Dart file in `lib/`, file renamed or deleted with the widget, "in its own file", "stateful": in the
for-code file (#components). Nothing the reader needs was lost.

## boards.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Names show as lowercase with underscores (`login_flow`) in the list and on the chip | ok | `packages/designer/lib/src/actions/file_actions.dart:61-66`; `packages/core/lib/src/file_system/naming.dart:158-163` (snake case); `lib/project/top_bar_mapper.dart:92`, `:103` (labels = file name without extension) | |
| Deleting keeps screens and components, only loose widgets go | ok | unchanged fact | |
| Organize with boards (advice); a screen can sit on several boards | ok | old `ui/boards.mdx`; see screens.md row | |
| Board color and grid saved with the board | ok | `packages/designer/lib/src/details/board_details.dart:36-73`; `packages/core/lib/src/file_system/board_file.dart:78-100`, `:147-148` (written to the board file) | |
| Zoom and position remembered on your device | ok | unchanged fact | |
| Loose widgets live only on the board; good for sketching | ok | unchanged fact plus advice | |
| Frame clips spills | ok | unchanged fact | |
| **Shape** draws a gray box (a **Container**) | ok | `packages/designer/lib/src/widgets/designer_tools.dart:90-91`, `:140-149`; `default_blocks.dart:8-13` | |
| Board error: **This screen failed to render**, **Reload screen**; no-code fix with Nowa AI in **Agent** mode first, check **Problems** | ok | `packages/designer/lib/src/error_boundary.dart:243-256`; ai/context.md | R5 order is right. |

Removed facts: `boards` subfolders, `.board` file, board file: in the for-code file (#project-files). Nothing lost.

## index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Everything you design becomes part of a real app that you own" | fixed | the page's own table: boards and loose widgets aren't part of the app (a board's items are saved in the board file, `packages/core/lib/src/file_system/board_file.dart:136-148`; only screens and components are classes of the project, `packages/core/lib/src/board/board_canvas.dart:168-172`) | Contradicted the table. Now "Your screens and components become part of a real app that you own." |
| "In your app" column (board, screen, component, loose widget, widget) | ok | boards.md#know-your-board-items | |
| Outline: jump to any widget, even hidden or hard to click | ok | design/outline.md intro | |
| **Variables** row: "values the screen remembers and the actions it can run (its variables and functions)" | fixed | panel lists **Params**, **Variables**, **Functions** (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:278`, `:392`); glossary | Params had dropped out. Now "receives and remembers ... (its params, variables and functions)". |
| "Design for every screen size: screen sizes without breakpoints" | fixed (R4) | unchanged line, audience rule applies to the whole page | "Breakpoints" is jargon here; now "one layout that fits phones, tablets and browsers" (responsive.md explains breakpoints). |
| AI places new screens on the board; selection attached to the next message; Play | ok | unchanged facts | |

Removed facts: the "Where it is saved" column and "saved as real Flutter code": in the for-code file (#project-files,
#screens-and-routes, #components).

## library.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro: also where you rename, organize and delete | ok | `library_host.dart:156-172` | |
| **Project**: screens and components in folders such as `pages`; red error count; named versions set up in code under a component | ok | `packages/core/lib/src/library/library_service.dart:225-293`; `packages/core/lib/src/interpreter/services/variant_service.dart:7-30` | |
| **Packages** = add-ons, with versions; **Material** = Google's design style, **Cupertino** = Apple's iOS style; **Assets** | ok | `library_service.dart:370-386`; Flutter library docs | |
| **Filter** kinds explained; **Private** = names starting with `_` | ok | unchanged labels | The **Classs** typo note stays (product issue P5). |
| `button` lists **CustomButton** (from a package every new project includes) before **Button** | ok | `packages/nowa_runtime/lib/src/widgets/widgets.dart:3`; code/packages.md | |
| **Recent**: "so the widgets you use most are always a click away" | fixed | **Recent** = last eight added, not most used | Now "so they're a click away when you need them again". |
| **Open** on a screen/component/asset; nothing to open for built-in widgets | ok | `library_host.dart:147-171` | |
| **Rename**: for a screen or component, every place updates | ok | `library_host.dart:199-214` (`DeclGen().rename` for declarations) | |
| Moving: screens and components between project folders, assets between `assets` folders | ok | `library_host.dart:245-254` (`_canMove`) | |
| **New Widget...** opens the new one on its own | ok | `lib/project/panels/files_panel/add_lib_menu.dart:38-49` (`openFile`) | |
| **New Folder...** in the highlighted row's folder or at the top of **Project** | ok | `library_host.dart:176-186` | |
| Model, global state, JSON, API collection, **Import Dart code...** explained | ok | `add_lib_menu.dart:50-101`; logic/models.md, logic/global-state.md, integrations/rest-api/index.md | |

Removed facts: `lib/`, `@Preview`, `pubspec.yaml`, **workspace** version label, `nowa_runtime`, file mechanics of
Open/Rename/Delete/move, `lib/models`, `lib/globals`: in the for-code file (#project-files, #packages, #models,
#global-state). Nothing the reader needs was lost.

## add-widgets.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Package" explained; **Add Missing Dependencies** flow; drag doesn't ask and the package stays missing; **Problems** message explained; **Hot Fix** | ok | unchanged facts (P12 live checks); R3 explanation added | |
| Shape = gray box (a **Container**); tools switch back to **Select tool** after one use | ok | `designer_tools.dart:90-91`; `packages/designer/lib/src/design_experience/place_board.dart:171-177` | |
| Assets: SVG explained; Nowa creates the matching widget | ok | unchanged facts | |
| Pasted image saved in the `assets` folder, shown under **Assets** | ok | `copy_paste.dart:110-139` (`importInDir` into `assetsDir`); `library_service.dart:315-343` | |
| Dropping onto a container doesn't put it inside; use **+** | ok | `packages/designer/lib/src/design_experience/move_tool.dart:308`, `:371` (widgets with no base widget, such as an empty Container, never host a drop) | |
| **Request a Widget** goes to the Nowa team | ok | `packages/core/lib/src/dialogs/feedback_dialogs.dart:75-91` ("Is there a widget you want that is missing from our library? Let us know!") | |

Removed facts: `nowa_runtime` as the source of **CustomButton**: in the for-code file (#packages). No fixes needed.

## select-and-edit.md

Tone and plain-word changes only (siblings, parent, rich text, reasons). Checked: no-handles reason (`packages/core/lib/src/layout/layout.dart`, `DefaultLayout.canResize` false), drop table (`drag_rule.dart:9-29`, `:217-280`, `move_tool.dart:297-337`), right-click entries (`widget_context_menu.dart:21-58`), **Export as image...** limits (unchanged). All ok, no fixes. No facts removed.

## properties.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro and Details sections; **Widget x N**, **Mixed** | ok | unchanged facts | |
| **Kept as code**: the app still includes the widget, **Run** shows it; ask Nowa AI in **Agent** mode to rebuild it | ok | `packages/designer/lib/src/details/widget_details.dart:552`; code/limitations.md; features-ai.md (agent edits any file) | R5: phrased as an option, with a check. |
| Routed from B13: "A choice ... such as **Text Align** on a **Text**, the list starts with **Default**" | fixed | **Text Align** is four toggle buttons with no **Default** (`packages/core/lib/src/fields/text_fields.dart:336-363`, registered at `block_field.dart:52`, used at `packages/designer/lib/src/details/widget_fields.dart:307`); **Overflow** is `TextOverflow?` (`material_library.dart:112097`) shown by `BFEnum`, which adds **Default** for nullable enums (`basic_fields.dart:1540-1545`; field at `widget_fields.dart:309`) | Now "such as **Overflow** on a **Text**". |
| "A group of settings, such as **Border** or **Radius**" | fixed (wording) | — | "Group" is a layout term in this section of the docs; now "A set of settings". |
| Color picker **Solid** and the gradients **Linear**, **Radial**, **Sweep** | ok | unchanged labels | |
| Wrapper intro: **Padding**, **Container** (background color, border, rounded corners), **Gesture Detector**, **Scroll View**; order as layers | ok | `wrappers_to_add.dart:13-60`; reference/wrappers.md#container; `widget_details.dart:66-90` | |
| "Nowa has 32 wrappers" (unchanged) | ok | `wrappers_to_add.dart:12-184` (32 entries) | |

Removed facts: none (the page had no code-only facts).

## Coverage spot checks

**All 7 `obsolete` rows re-checked in the code: all confirmed.**

| Old item | Confirmed by |
|---|---|
| Create a board with **+** in the tabs bar and pick a board type | No board types or tab-bar **+** in 3.13: Boards chip with **Search boards** and **Create new board** (`lib/project/top_bar_mapper.dart:92-113`); no "Widgets Board" or "Assets Board" string in the code. |
| Open a board from **Recent files** | **Recent Files** is only on the code-mode empty tab (`lib/empty_editor.dart:119`); the chip lists every board. |
| Switch boards with the tabs | Tabs only in code mode; boards switch from the chip (`top_bar_mapper.dart:92`). |
| Component dialog button **Create** | The button is **Submit** (`packages/core/lib/src/file_system/widgets/create_file_dialog.dart:125`). |
| Can't edit a component inside a screen | Widgets inside an instance are selectable in place, and the first crumb selects the instance (`packages/core/lib/src/interpreter/widget/instance_tree.dart:41-43`, `packages/designer/lib/src/details/widget_details.dart:314-334`). |
| Ctrl/Cmd+G again ungroups | The key always groups (`packages/designer/lib/src/designer_setup.dart:20`, `packages/designer/lib/src/actions/designer_actions.dart:54-56`). |
| Don't mix "Left and right" with "Center" | One choice per direction, and **Center** clears both directions (`packages/designer/lib/src/details/positioned_details.dart:93-193`, `packages/core/lib/src/layout/positioned_helper.dart:352-355`). The useful part became the **Center** cautions on layout.md. |

**10 `covered` rows sampled: all covered where the coverage file says.**

| Old item | Page checked |
|---|---|
| Board color and grid in **Details** | boards.md#set-the-board-color-and-grid (**Show Grid**, **Board Color**, **Reset**) |
| Rename a screen by double-clicking its name | screens.md#rename-describe-copy-and-open |
| **Make home screen** | screens.md#choose-the-home-screen |
| Screen **Size** with presets | screens.md#set-up-a-screen (table, six presets) |
| More instances: copy/paste, Alt-drag | components.md#use-a-component |
| **Detach** an instance | components.md#edit-a-component-or-one-instance |
| Spacing **Fixed**/**Between**/**Around**/**Evenly** | layout.md#rows-and-columns |
| Group via right-click or Ctrl/Cmd+G, from the board or the Outline | layout.md#groups |
| **Left and right** stretches with the width | layout.md#choose-what-each-widget-sticks-to (table) |
| Reorder wrappers by dragging the handle | properties.md#add-a-wrapper (**Reorder**) |

Also re-read the old pages `ui/layout/groups.mdx`, `ui/layout/rows-and-columns.md`, `ui/layout/constrains.md`,
`ui/boards.mdx` and `ui/screens.md` against the new pages: nothing the reader needs is missing. The old "container
becomes a wrapper when grouping" tip is the layout.md background tip, now with the condition the code needs (the
shape selected first).

## Moved facts

All 32 bullets in `P14-B04-for-code.md` (7 #components, 6 #screens-and-routes, 14 #project-files, 3 #packages,
1 #models, 1 #global-state) match the `-` lines of the diff word for word (all 32 checked with a script against `origin/main`). For each, the page keeps
the step and its result in plain words; what's gone is only file paths, file mechanics and package names. Nothing
the reader needs was lost. The verifier moved no further facts (the for-code file is unchanged).

## Links and structure

Checked with a script on all nine pages: front matter has `title` and `description`, no H1, no `---` rules, at most
two admonitions per page, no banned words (one temporal "just" I introduced was reworded), no emoji. Every relative
link resolves, including anchors (`localization.md#show-text-right-to-left`, `../reference/wrappers.md#safe-area`,
`../reference/wrappers.md#scrollview`, `../logic/router.md#switch-an-older-project-to-gorouter`). Links to
`../code/generated-code.md` use only `#components` and `#project-files`. Every explicit `{#id}` and every heading from
`origin/main` still exists; all 28 inbound links from other pages to these pages' anchors resolve. Image and video
lines are byte-identical to `origin/main`.

## Open issues

1. **Not run live** (code-derived, now worded to what the code shows): the background tip when grouping
   (layout.md), dragging a centered widget re-pins it to the left and top (layout.md), **Detach** on a screen's board
   item (screens.md), a wrapper added on a component's own board item goes inside the component (components.md),
   and where **Copy as new widget** puts an instance's copy (components.md, "where your pointer last was", the same
   placement as Ctrl/Cmd+K). A one-minute check of each in the app would settle them.
2. **Expand inside a Wrap** (product issue P14): code and Flutter's rules say it breaks; not run. The page gives
   advice only, so it stays true either way. Worth a known-issues entry (B12) once seen live.
3. **layout.md length**: ~2,180 words of prose after the fixes and the routed B14 sentence, just under ~2,200. Any
   further addition should go with the writer's split plan.
4. **Stack → Row/Column undo**: the switch is one undoable step, but the reordering of the children
   (`packages/designer/lib/src/details/group_details.dart:61`) runs outside it, so after an undo the stack's
   stacking order may differ. Code reading only; the page now says only that Ctrl/Cmd+Z switches it back.
5. Product issue P21 (Column → Row on the playground home screen paints the screen gray, seen in 3.12.5) was not
   re-checked for 3.13.0; layout.md's image shows a working switch to a Row.
