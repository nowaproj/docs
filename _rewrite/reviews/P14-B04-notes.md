# P14-B04 notes: design basics

Pages: `docs/design/` `index.md`, `boards.md`, `screens.md`, `components.md`, `library.md`, `add-widgets.md`,
`select-and-edit.md`, `properties.md`, `layout.md`. Code refs are `path:line` in `/home/user/nowa-master` (3.13.0,
`3cb32031c`). Flutter refs are the local SDK source `/home/user/flutter` (`058e0af2c`), the source of
api.flutter.dev (that site doesn't resolve from this sandbox). Coverage: `P14-B04-coverage.md`. Moved facts:
`P14-B04-for-code.md`. R9 (tone) applied to every page: intros and explanations say why and what happens next,
with everyday examples; reference tables stay compact.

## layout.md

What changed for the reader: the page now teaches layout from the ground up, in plain words. New section
**Pick the right arrangement** (Column, Row, Stack: what each does, what it's good for, how each reacts when content
or screen size changes, nesting example). **Groups** gained an example, H3 subsections (switch, Stack settings),
and a tip; **Rows and columns** explains "along" and "across", each setting with an everyday example; **Place
widgets in a stack** gained a constraints table with examples and two **Center** cautions; **Size widgets** gained a
"Good for" column. No code-only facts were on this page (nothing moved). Kept anchors: `{#groups}`,
`#rows-and-columns`, `#place-widgets-in-a-stack`, `#size-widgets`, `#scroll-or-wrap-content`; new
`{#pick-the-right-arrangement}`. Images and the video stay with their paragraphs. ~2,070 words of prose (under the
~2,200 limit). If it must shrink later, split "Place widgets in a stack" plus "Stack settings" into their own page
("Place widgets freely in a stack") and link it from **Pick the right arrangement**.

Added or changed claims and their evidence:

| Claim | Evidence |
|---|---|
| A screen from **Empty Page** starts as a Stack; its Stack uses Fit `expand` and Alignment 0,0 | `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27` |
| Stacks Nowa creates start at Alignment 0,0 | `packages/core/lib/src/widgets_to_add/default_blocks.dart:291-297` |
| Group: inside a Row/Column/Stack the group copies the parent kind, else a Stack | `packages/designer/lib/src/design/common_design.dart:56-65` |
| Ctrl/Cmd+G always groups (nests a group); **Ungroup** shows for one selected group | `packages/designer/lib/src/designer_setup.dart:20`; `packages/designer/lib/src/actions/designer_actions.dart:46-89`; `packages/designer/lib/src/menus/widget_context_menu.dart:40-42`; `packages/core/lib/src/interpreter/type.dart:67-68` |
| Tip: a shape selected first that covers the others becomes the group's background (keeps it after switching to Row/Column) | `common_design.dart:66-77` (`_firstIsBg`: 2+ widgets, the first has no content widget, its rect contains the others), `:92-95` (the new group becomes its content, so its wrappers wrap the group); switching keeps wrappers (`packages/designer/lib/src/details/group_details.dart:17-41`, replaces the base widget only). Shape = Container with only a fill (`packages/core/lib/src/widgets_to_add/default_blocks.dart:8-13`). Selection keeps click order (`packages/core/lib/src/providers/selection_provider.dart:10`, a Set). Code-derived, not run live. |
| Switching Stack → Row/Column orders widgets top-to-bottom or left-to-right; the space between the first two becomes the Gap; undoable | `group_details.dart:48-65`; `packages/core/lib/src/layout/flex_layout.dart:147-170` (`orderChildren`); `packages/designer/lib/src/design/group_design.dart:8-24` (`flexSpacing` from widgets 0 and 1); `group_details.dart:40` (`BatchRecord`) |
| Stack settings Alignment (X/Y sliders, -1..1), Fit `loose`/`expand`/`passthrough`, Text Direction (`ltr`/`rtl`, **Default**), Clip Behavior (`none`, `hardEdge` default, `antiAlias`, `antiAliasWithSaveLayer`), Children (later on top) | Fields come from Flutter's Stack (`group_details.dart:135-140`, `DefaultClassContentBuilder`); enum names shown as-is with **Default** for nullable enums (`packages/core/lib/src/fields/basic_fields.dart:1511-1548`); sliders (`basic_fields.dart:1550-1569`). Meanings: Flutter `packages/flutter/lib/src/widgets/basic.dart:4708-4760` (alignment places unpositioned and partly positioned children; textDirection defaults to the ambient Directionality; fit sizes non-positioned children; clipBehavior default `Clip.hardEdge`), `packages/flutter/lib/src/rendering/stack.dart:242-248` (a child with no left/top/right/bottom/width/height counts as non-positioned), `:301-331` (StackFit values), `engine/src/flutter/lib/ui/painting.dart:1212-1252` (Clip values). Official pages: https://api.flutter.dev/flutter/widgets/Stack-class.html, https://api.flutter.dev/flutter/rendering/StackFit.html, https://api.flutter.dev/flutter/dart-ui/Clip.html |
| Row/Column Alignment: 9 cells with **Fixed**; otherwise only the cross position (left/center/right in a Column, top/center/bottom in a Row). Old page had the axes swapped | `packages/designer/lib/src/details/flex_field.dart:103-106` (outer strips run across), `:196-203` (non-Fixed taps set only the cross value) |
| **Main Axis Size** `max`/`min`; **Gap** only with Fixed, min 0 | `flex_field.dart:40-48` |
| **Children**: hover + adds a copy of the last child; drag handle on hover; count field | `packages/core/lib/src/fields/list_field.dart:33-53`, `:144-170`, `:175-215` |
| Arrow key in a Row/Column moves one place | existing select-and-edit.md fact; `packages/designer/lib/src/designer_setup.dart:26-50` |
| Constraint dropdown values; bars; Shift-click both; **+** clears; multi-select | `packages/designer/lib/src/details/positioned_details.dart:93-193`, `:197-279` |
| **Center** in either dropdown clears the pins both ways; choose Center, then Top, to center across only | `positioned_details.dart:127-129`, `:178-180` call `setCenterConstraints`, which clears both axes (`packages/core/lib/src/layout/positioned_helper.dart:352-355`); `setTopConstraints` touches only the vertical pins (`:306-310`) |
| Dragging a centered widget pins it to the left and top again | Stack drag calls `layout.moveTo` (`packages/designer/lib/src/design_experience/drag_rule.dart:258-262`) → `setOnly` → `setX`/`setY` (`packages/core/lib/src/layout/layout.dart:141-148`), which pin left/top when unpinned (`positioned_helper.dart:126-128`, `:144-146`). Code-derived, not run live. |
| Check constraints by changing the screen's **Size** or dragging a corner | `packages/core/lib/src/screen_sizes.dart:12-21`; responsive.md (same advice, live-checked in P12) |
| **Fixed** fills in the current size; **Auto** only for widgets with a natural size; **Auto** includes padding | `packages/designer/lib/src/details/size_fields.dart:65-101`, `:236-283`; `packages/designer/lib/src/details/flex_size_field.dart:52-60`; padding is a wrapper inside the size box (`packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:88-92`, `:278`) |
| **Expand** along = take the space left, shared equally by widgets that expand; across = full width/height | `flex_size_field.dart:61-67`, `:114-120` (flex 1 / infinity); `packages/nowa_runtime/lib/src/widgets/widgets.dart:84-86` (Flexible, tight) |
| **Expand** only works in a Row or Column; in a Wrap choose Fixed or Auto | Wrap children get the same Fixed/Auto/Expand field (`packages/core/lib/src/layout/layout.dart:57-63`); Expand becomes a Flexible (`widgets.dart:84-86`), which must sit in a Row, Column or Flex (Flutter `packages/flutter/lib/src/widgets/basic.dart:6024-6034`, https://api.flutter.dev/flutter/widgets/Flexible-class.html). Product issue P14 in `_rewrite/product-issues.md`. |
| Layout section per parent (board, Stack, Row/Column/Wrap, List View, other + size box) | `packages/designer/lib/src/details/layout_details.dart:34-79`; `layout.dart:55-63` |
| Scroll View disables Expand in the scrolling direction | `size_fields.dart:5-40` |

Open questions: none blocking. Two code-derived claims (background tip, drag re-pins a centered widget) would
benefit from a 1-minute live check.

## components.md

What changed for the reader: warmer intro with the old docs' recipe-card example and a plain definition of
"instance"; each step says what happens next; the **Class name** / **Path** lines in the dialog are explained
(R3) instead of described as file paths; "stateful" replaced by what it means (the component can remember a value
of its own); file mechanics (Dart file in `lib/`, file renamed or deleted with the widget) moved to for-code
(#components) with one link to `../code/generated-code.md#components`. Kept `{#manage-screens-and-components}`,
both images, the known-issue link for **Detach**.

Added or changed claims:

| Claim | Evidence |
|---|---|
| Recipe card example ("Date added" line reaches every card) | Old `ui/components.md` example; behavior = instances share the component's widgets (`packages/core/lib/src/interpreter/widget/instance_tree.dart:75-80`) |
| Each component needs a name no screen, component or built-in widget already uses; Nowa suggests a free one and adds a number (`Container1`) | `packages/designer/lib/src/design/common_design.dart:133-139` (suggested name from `generateSymbolName`), `packages/core/lib/src/file_system/naming.dart:35-37` ("is already taken"), `:126-140` (adds a number); screenshot alt text shows `Container1` |
| **Class name** / **Path** lines show how it's named and stored; can be left as is | `packages/core/lib/src/file_system/widgets/file_name_text_field.dart:172-215`; research features-designer-core "Create component" (a folder typed in **Path** isn't used) |
| A wrapper added while the component itself is selected becomes part of it (every instance); on one instance it wraps only that instance | `packages/designer/lib/src/details/widget_details.dart:54-63` (a selected component board item maps to the component's own top widget), `:65-90` (**Add Wrapper** wraps the mapped widget); old `ui/components.md` "Modifying a Component" |
| **Copy as new widget** is usually better than **Detach** for a variation | guides/design-tips.md ("Vary by copying, not detaching"); Detach drops param values (known issue `#detach`) |
| Params example (title, picture, date) and `title` / **String** in step 3 | Example only; **String** is a type in the param **Type** picker (logic/variables.md#choose-a-type) |
| Adding a variable: Nowa sets up what the component needs to keep the value | `packages/core/lib/src/interpreter/widget_declarations.dart:407-416` (stateful conversion, research features-designer-core "Variables box") |
| "Changed your mind?" undo of a delete while the Library has focus | existing fact (`lib/project/panels/library_panel/library_host.dart:39`, `:225`) |

## screens.md

What changed for the reader: route explained in plain words (an address other screens use, part of the page's
link on the web) with a route-parameter example; **Class name** / **Path** explained instead of the `lib/pages/`
path; each setting row says what it's for; **null** explained; file mechanics (file renamed, note saved in code,
copy in a new file) moved to for-code (#screens-and-routes). New subsection **One screen, many places** brings back
the old page's "a screen works like a component" and corrects its **Detach** advice. New paragraph on the
screen's main group (Stack by default on **Empty Page**, switch to Column). Kept both images, all anchors and the
3.13 `/` workaround in **Route Settings**. No link to generated-code.md here (components.md carries the batch's
one link for #components; screens and routes facts are listed in for-code for the orchestrator).

Added or changed claims:

| Claim | Evidence |
|---|---|
| 393 × 808 is the **Pixel 3a** preset | `packages/core/lib/src/screen_sizes.dart:12-21`; responsive.md preset table |
| **Empty Page** body is a Stack; switch to Column in **Group** | `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`; `packages/designer/lib/src/details/group_details.dart:101-120` |
| **Safe Area** keeps content clear of notches and system bars | reference/wrappers.md#safe-area (`packages/core/lib/src/wrappers_to_add.dart`) |
| Route = the screen's address; other screens open it with it; on the web it's part of the link; route-parameter example "which recipe to show" | logic/router.md (paths open screens; **Remove # in URLs** = cleaner web links); `packages/designer/lib/src/details/route_details.dart:113-133` |
| "In projects that use GoRouter, which new projects do" | `route_details.dart:107`, `:116-117` ("This is only available in projects using go_router"); logic/router.md ("GoRouter projects, which new projects are") |
| Description is a note for teammates and Nowa AI | `docs/new/whats-new.md:168-169` (3.12 "Describe Your Components") |
| **Copy as new widget** gives a separate screen placed on the board | `packages/designer/lib/src/design/common_design.dart:217-259` |
| One screen on several boards (or twice): all items show the same screen; copy/paste adds another item for the same screen | research features-designer-core "Adding things to a board" and "Copy / Cut / Paste" (`packages/designer/lib/src/design/copy_paste.dart`); responsive.md compare-two-sizes (live-checked) |
| **Detach** shows for a screen's board item and turns it into a loose copy that isn't part of the app | `packages/designer/lib/src/menus/widget_context_menu.dart:50-51` (shown whenever the item is a component instance, which a screen's board item is: `packages/core/lib/src/interpreter/widget/widget_instance.dart:128-136`); `common_design.dart:185-195` (replaces the item with a copy of the screen's widgets); loose widgets aren't part of the app (boards.md). Code-derived, not run live. |
| Removing keeps the screen; drag it back from the Library | boards.md / research "Remove from board vs Delete" |

## boards.md

What changed for the reader: warmer intro with flow examples; "snake_case" replaced by what the reader sees
(`login_flow` in the list and on the chip); the `.board` file, the `boards` folder and its subfolders moved to
for-code (#project-files); loose widgets explained as "live only on the board" with a use (sketching, spare
parts); the frame rule in plain words; the board-error fix now leads with Nowa AI in **Agent** mode and says how
to check (**Problems**), with "fix it in code" as the second option (R5). New section **Organize your work with
boards** brings back the old page's advice. Kept every anchor (`#big-boards-and-errors`, `#know-your-board-items`,
`#set-the-board-color-and-grid` are linked from other pages) and both images.

Added or changed claims:

| Claim | Evidence |
|---|---|
| Names show in lowercase with underscores (`login_flow`) in the list and on the chip | `packages/designer/lib/src/actions/file_actions.dart:61-66`, `packages/core/lib/src/file_system/naming.dart:158-163` (snake_case name), chip label = board file name without extension (`lib/project/top_bar_mapper.dart:92`); screenshot `design-boards-1` shows the `login_flow` chip |
| Deleting a board keeps screens and components; only its loose widgets go | existing fact (research features-designer-core "Boards"; loose widgets live in the board file) |
| Boards as desks: one flow per board, new board when crowded, not one per screen | old `ui/boards.mdx` "How to Use Boards Efficiently" (advice) |
| A screen can sit on more than one board; same screen, a change shows on both | research features-designer-core "Adding things to a board" (two items point at the same screen); old `ui/screens.md` |
| Board settings saved with the board | `packages/core/lib/src/board/board.dart` (color and grid stored on the board, research "Show Grid / Board Color / Reset") |
| Loose widgets: good for sketching / spare parts | usage suggestion based on "not part of your app" (`packages/core/lib/src/board/board_canvas.dart:169`) |
| Frame clips spills (content that doesn't fit, error boxes, blurs) | existing fact (`packages/core/lib/src/board/board_canvas.dart:225-230`, changes-3.13 C25) |
| Board error card: text not selectable, so the prompt describes it; selected item is attached to the next message | `packages/designer/lib/src/error_boundary.dart:236-259`; ai/context.md#select-what-you-want-to-change |

## index.md

What changed for the reader: the "Where it is saved" column (`.board` file in `boards/`, Dart file in `lib/`) is
replaced by "In your app" (what each piece means for the app); those facts moved to for-code (#project-files,
#screens-and-routes, #components). "Saved as real Flutter code" became "part of a real app that you own".
**Variables** and **Outline** rows explained in plain words (R8): values a screen remembers and actions it can run;
**Globals** = data every screen can use. Short "why" added to Play and to designing with Nowa AI. Image and links
unchanged.

| Claim | Evidence |
|---|---|
| A board isn't part of the app; a loose widget isn't until placed in a screen; a component is part of every screen that uses it | boards.md#know-your-board-items (loose widgets live only on the board); research features-designer-core "Boards" (boards are for arranging and viewing) |
| Real app that you own | `_rewrite/BRIEF.md` "What Nowa is" (real Flutter code the user owns) |
| Outline: jump to any widget, even hidden or hard to click | design/outline.md intro |
| Variables panel: variables and functions of the selection; **Globals** with nothing selected | existing row; logic/variables.md, logic/global-state.md |

## properties.md

What changed for the reader: intro and sections say why (see the result as you type, link values that change
while the app runs, with a shop example); "parent" and "object" replaced by plain words; `null` explained; **Kept as
code** now tells a non-coder what to do (R5): the app still includes the widget (check with **Run**), and Nowa AI
in **Agent** mode can rebuild it from built-in widgets; the wrapper intro brings back the old page's examples
(**Padding** for space, **Container** for background color, border, rounded corners) and explains order as layers.
No code-only facts (nothing moved). Kept `{#add-a-wrapper}`, both images.

| Claim | Evidence |
|---|---|
| **Container** wrapper gives a background color, border or rounded corners | reference/wrappers.md#container ("fill, border, rounded corners, shadow, padding and margin"), `packages/core/lib/src/wrappers_to_add.dart` |
| **Gesture Detector** for taps, **Scroll View** for scrolling | reference/wrappers.md (Gesture Detector, Scroll View rows) |
| Kept as code: the app still includes the widget; **Run** shows the true result | code/limitations.md ("**Run** compiles everything for real"; placeholder table) |
| Ask Nowa AI in Agent mode to rebuild it from built-in widgets | Agent mode can create and edit screens, components and any project file (`_rewrite/research/features-ai.md`, "What the agent can do"); phrased as an option, not a promised result |
| Linear, Radial, Sweep are gradients | existing labels; Flutter gradient types (`packages/flutter/lib/src/painting/gradient.dart`) |
| Wrapper order as layers (a new wrapper goes around the others, lower = outside) | existing fact; `packages/designer/lib/src/details/widget_details.dart:65-90`; old `ui/wrappers/wrappers-intro.md` "bottom-up" |

## library.md

What changed for the reader: intro says what the panel is for (add, and also rename, organize, delete); chips
explained in plain words (packages = add-ons; **Material** = Google's design style, **Cupertino** = Apple's iOS
style; assets = images, fonts, videos); **Filter** kinds explained (models, global states); **Create** table rows
say what each thing is for (model, global state, JSON, API collection; **Import Dart code...** marked for people
who code); a few "why" clauses (Recent, preview card, undo). Moved to for-code: `lib/` folder, `@Preview`
variants, `pubspec.yaml` and the **workspace** version label, `nowa_runtime` as the source of **CustomButton**,
file mechanics of **Open** / **Rename** / **Delete** / moving, and the `lib/models`, `lib/globals` paths
(#project-files, #packages, #models, #global-state). One pointer to `../code/generated-code.md#project-files`.
Rename now says "for a screen or component" (renaming an asset updates nothing else; the old text said "the
widget" too). Kept both images and every heading.

| Claim | Evidence |
|---|---|
| **Project** lists screens and components in folders such as `pages`; named versions set up in code sit under a component | `packages/core/lib/src/library/library_service.dart:225-293` (folders under lib, variants as children); `packages/core/lib/src/interpreter/services/variant_service.dart:7-30` (variants are `@Preview` versions in code); screenshot `design-library-1` (pages folder) |
| Packages = add-ons with extra widgets and features, listed with versions | `library_service.dart:370-386`; code/packages.md |
| **Material** = Google's design style, **Cupertino** = Apple's iOS style | Flutter: Material Design library and Cupertino (iOS-style) widgets (`/home/user/flutter/packages/flutter/lib/material.dart`, `cupertino.dart` library docs) |
| **CustomButton** comes from a package every new project includes | `packages/nowa_runtime/lib/src/widgets/widgets.dart:3`; code/packages.md ("New projects start with `nowa_runtime`...") |
| **Open** on an asset shows it (an image on its own) | `lib/project/panels/library_panel/library_host.dart:146-153`; `packages/core/lib/src/editors/image_editor.dart:10-12` |
| Rename updates references for screens and components (declarations); assets rename only the file | `library_host.dart:197-214` (`DeclGen().rename` for declarations, `MoveFileIntent.rename` for files) |
| Models / global states / JSON / API collection explained | logic/models.md, logic/global-state.md, integrations/rest-api/index.md |
| **New Folder...** goes in the highlighted row's folder or at the top of **Project** (lib) | `library_host.dart:174-186` |
| Moving: screens and components between project folders, assets between `assets` folders | `library_host.dart:248-257` (`_canMove`) |

## add-widgets.md

What changed for the reader: "package" explained the first time (an add-on that brings extra widgets or
features); the **Problems** message `'<package>' is imported but is not in the pubspec.` kept as shown and
explained (R3); SVG and Rive explained; small "why" clauses (check before you add, tools switch back so you
don't add a second one, use **+** to fill a container); **Request a Widget** now says who receives it.
`nowa_runtime` as the source of **CustomButton** moved to for-code (#packages). Kept both explicit IDs
(`{#add-a-widget-with-the-widget-picker}`, `{#drag-screens-components-and-files}`), the image and the video.

| Claim | Evidence |
|---|---|
| **CustomButton** comes from a package every new project includes | `packages/nowa_runtime/lib/src/widgets/widgets.dart:3`; code/packages.md |
| After a drag, the package is still missing (Problems lists it, Hot Fix adds it) | existing facts on this page (P12 live checks) |
| A pasted image is saved in the `assets` folder and shows under the **Assets** chip | research features-designer-core "Copy / Cut / Paste" (`packages/designer/lib/src/design/copy_paste.dart:62-64`, saved to the assets folder); `packages/core/lib/src/library/library_service.dart:315-343` (Assets source lists the assets folder) |
| **Request a Widget** goes to the Nowa team | `packages/core/lib/src/dialogs/feedback_dialogs.dart:77-91` ("Is there a widget you want that is missing from our library? Let us know!", sent to Nowa's feedback table) |
| SVG = a drawing that stays sharp at any size; Rive = animation | general definitions; reference/widgets/media.md covers both widgets |

## select-and-edit.md

What changed for the reader: tone and plain words only (R9, R4): "siblings" and "parent" explained in place, rich
text explained, short reasons added where they help (watch the outline before you drop; the widget around it
decides the size, so no handles; guides help line things up; why you'd export an image; Action History to jump
back several steps). No code-only facts on this page (nothing moved), no new product claims. Kept
`{#where-a-dragged-widget-lands}`, `{#use-the-right-click-menu}`, the image and the video.

| Claim | Evidence |
|---|---|
| No handles inside a Container or Padding because the widget around it decides the size | research features-designer-core "Resizing" ("widgets whose parent sets their size (e.g. inside a Padding or Container)"); `packages/core/lib/src/layout/layout.dart` (`DefaultLayout.canResize` is false) |
| Drop targets are outlined (purple Stack, orange box in a Row/Column) | existing table on this page (`packages/designer/lib/src/design_experience/drag_rule.dart:258-280`) |

## Tone pass (R9), all nine pages

Each page was re-read as the primary reader after the coordinator's tone note: intros say what the reader can
do and why; steps keep one action and gain a short result or reason where it helps ("so your screen looks the same
as before", "so you can spot it at a glance"); everyday examples (recipe app, shop products, sign-up and checkout
flows); reassurance only where true (undo after switching a group, undo a Library delete, nothing replaced
without asking). Filler removed (layout.md's "This page walks you through..."), banned words checked ("just" twice
replaced). Word counts of prose: index ~850, boards ~1,230, screens ~1,370, components ~1,290, library ~1,670,
add-widgets ~1,290, select-and-edit ~1,480, properties ~1,320, layout ~2,080 (split plan in its section).
Admonitions: at most 2 per page. All relative links and anchors resolve (checked with a script, including inbound
links from other pages). Images, the three videos and every explicit `{#id}` are unchanged against `9f21e4c`; one
new ID `{#pick-the-right-arrangement}` on layout.md; no baseline heading was removed.

Links to `docs/code/generated-code.md`: components.md → `#components`, library.md → `#project-files` (one each).

## For other pages

| Target page (batch) | Proposed text | Evidence |
|---|---|---|
| `docs/guides/design-tips.md` (B01), "Name things clearly", **Boards** bullet | Replace "Nowa writes the name in snake_case, so **Login flow** becomes `login_flow`." with "Nowa writes the name in lowercase with underscores, so **Login flow** becomes `login_flow`." (R4: "snake_case" is developer jargon) | `packages/designer/lib/src/actions/file_actions.dart:7-26`, `:61-66`; `packages/core/lib/src/file_system/naming.dart:158-163` |
| `docs/reference/glossary.md` (B14) | Add rows: **Constraints**: "Which edges a widget in a Stack keeps its distance to when the screen size changes: **Left**, **Right**, **Left and right** or **Center** across, and **Top**, **Bottom**, **Top and bottom** or **Center** down. Set them under **Layout** in **Details**. See [Lay out widgets](../design/layout.md#place-widgets-in-a-stack)." **Group**: "Widgets held together so they move and resize as one. A group is a **Stack**, a **Row** or a **Column**. See [Lay out widgets](../design/layout.md#groups)." **Instance**: "One use of a component. Every instance follows the component's design, and params give each one its own content. See [Build reusable components](../design/components.md)." **Row, Column, Stack**: "The three ways a group arranges widgets: side by side, one below the other, or layered on top of each other. See [Lay out widgets](../design/layout.md#pick-the-right-arrangement)." **Fixed, Auto, Expand**: "How a widget's width or height is set under **Layout**: the size you type, the size of its content, or the space left in a row or column. See [Lay out widgets](../design/layout.md#size-widgets)." | `packages/designer/lib/src/details/positioned_details.dart:93-193`; `packages/designer/lib/src/details/group_details.dart:101-120`; `packages/designer/lib/src/details/size_fields.dart:236-283`, `packages/designer/lib/src/details/flex_size_field.dart:52-67`; components.md |

## Open questions

1. **Expand inside a Wrap** (layout.md, product issue P14): the page now says Expand only works in a Row or Column
   and to use Fixed or Auto in a Wrap, from code plus Flutter's rule for `Flexible`. A live check (Expand a child of
   a Wrap, then **Run**) would confirm whether it's worth a known-issues entry (B12).
2. **Code-derived, not run live** (worth a 1-minute check each): the background tip when grouping (layout.md),
   dragging a centered widget re-pins it to the left and top (layout.md), **Detach** on a screen's board item makes
   a loose copy (screens.md), a wrapper added while a component's board item is selected becomes part of the
   component (components.md).
3. layout.md is ~2,080 words. If the orchestrator wants it shorter, split "Place widgets in a stack" and "Stack
   settings" into a page of their own (see the layout.md section).
