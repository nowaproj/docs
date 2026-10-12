# P14-B04 coverage: design basics (boards, screens, components, layout, wrappers intro)

Batch pages (under `docs/design/`): `index.md`, `boards.md`, `screens.md`, `components.md`, `library.md`,
`add-widgets.md`, `select-and-edit.md`, `properties.md`, `layout.md`.
Code refs are `path:line` in `/home/user/nowa-master` (3.13.0, `3cb32031c`). "Page#section" = new page and heading.

## `ui/boards.mdx` (→ `design/boards.md`)

| item | status | where / evidence | note |
|---|---|---|---|
| Boards are where you design and organize your app; they keep screens and widgets together | covered | boards.md (intro), index.md#how-the-pieces-fit | |
| "Design Boards": free canvas with several screens and components | covered | boards.md (intro), #know-your-board-items | 3.13 has one kind of board. |
| "Widgets Boards": one widget or screen opened on its own | covered | boards.md#know-your-board-items, screens.md#rename-describe-copy-and-open (**Open in new tab**) | Old term gone; the 3.13 action is **Open in new tab** (`packages/designer/lib/src/panels/canvas_titles.dart`). |
| "Assets Board": inspect one asset at a time | covered | library.md#open-rename-delete-and-move (**Open** on an asset) | `lib/project/panels/library_panel/library_host.dart:146-153` opens the asset file; images show on their own (`packages/core/lib/src/editors/image_editor.dart:10-12`). |
| Create a board with **+** at the top of the tabs bar, then pick a board type | obsolete | `lib/project/top_bar_mapper.dart:92-113` (Boards chip, **Search boards**, **Create new board**) | Replaced by the Boards chip; covered in boards.md#create-switch-and-manage-boards. |
| Open an existing board from **Recent files** | obsolete | `lib/project/top_bar_mapper.dart:92-95` (the chip lists every board) | **Recent Files** now lives on the code-mode Empty Tab (`lib/empty_editor.dart:119`), already in code/code-mode.md. |
| A new board is saved automatically and can be reopened or deleted later | covered | boards.md#create-switch-and-manage-boards (list shows every board, **Rename**, **Delete**) | The `.board` file and `boards` folder facts move to for-code (#project-files). |
| Switch boards with the tabs at the top | obsolete | `lib/project/top_bar_mapper.dart:92`; tabs only in code mode (code/code-mode.md) | 3.13: Boards chip, **Back** / **Forward**. Covered in boards.md. |
| Board customization in Details: background color, show or hide the grid | covered | boards.md#set-the-board-color-and-grid | |
| Settings are saved; each board keeps its own | covered | boards.md#set-the-board-color-and-grid | Made "saved with the board" explicit (`packages/core/lib/src/board/board.dart`, research features-designer-core "Show Grid"). |
| Use boards as separate desks: keep a flow together, move things to a new board when one gets crowded, don't overdo it | added | boards.md#organize-your-work-with-boards | Advice, not a product fact. Already hinted in boards.md intro and guides/design-tips.md#name-things-clearly. |
| Onboarding video (YouTube) | not useful | | Pure media link. |

## `ui/screens.md` (→ `design/screens.md`)

| item | status | where / evidence | note |
|---|---|---|---|
| A screen is one page of your app (home, settings, profile) | covered | screens.md (intro), index.md | |
| Create: **Screen** tool in the toolbar | covered | screens.md#add-a-screen | |
| Pick an empty screen with a default size, or a template | covered | screens.md#add-a-screen (**Empty Page**, 393 × 808) | |
| Name it, click **Submit** | covered | screens.md#add-a-screen | |
| Rename by double-clicking the name on the board | covered | screens.md#rename-describe-copy-and-open | |
| Rename with the rename button at the top of Details | covered | screens.md#rename-describe-copy-and-open | |
| Screens are kept in the Files panel; drag one onto the board | covered | add-widgets.md#drag-screens-components-and-files, library.md, components.md#manage-screens-and-components | 3.13: the **Library** (Files is code mode only, library.md#open-the-library). |
| A screen works like a component: the same screen can sit on several boards; it's one screen, so an edit shows everywhere | added | screens.md#one-screen-many-places | Partly covered before (copy/paste note). Research features-designer-core "Adding things to a board" (`designer_board_controller.dart`), responsive.md compare-two-sizes. |
| Separate a screen instance with right-click → **Detach** | added (corrected) | screens.md#one-screen-many-places | 3.13: **Detach** shows for a screen's board item too (`packages/designer/lib/src/menus/widget_context_menu.dart:50-51`), but it swaps the item for a loose copy (`packages/designer/lib/src/design/common_design.dart:185-195`), which isn't part of the app. A separate screen = **Copy as new widget** (already covered). |
| Remove from the board: right-click → **Remove** | covered | screens.md#delete-a-screen, boards.md#remove-an-item-or-delete-it | |
| Warning: removing doesn't delete the screen; delete it from the files library | covered | screens.md#delete-a-screen | 3.13: Library → **Delete**. |
| Details: **Name** with rename | covered | screens.md, properties.md#open-the-details-panel | |
| Details: **Open in a new tab** | covered | screens.md#rename-describe-copy-and-open | |
| Details: **Layout** (position and size) | covered | boards.md#know-your-board-items (X, Y, W, H), layout.md#size-widgets | |
| Details: **Group**: a screen's content is a **Stack** by default; switch it to a **Column** or **Row** | added | screens.md#set-up-a-screen | **Empty Page** body is a Stack (`packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`); switch buttons `packages/designer/lib/src/details/group_details.dart:101-120`. |
| Details: **Screen** wrapper defines the screen; remove it and it's no longer a screen | covered | screens.md#set-up-a-screen | |
| Details: **Color** | covered | screens.md#set-up-a-screen | |
| Details: navigation widgets (app bar, floating button, drawer, bottom navigation) | covered | screens.md#set-up-a-screen | Separate slots in 3.13. |
| Details: **Size** with presets | covered | screens.md#set-up-a-screen | |
| **Make home screen** | covered | screens.md#choose-the-home-screen | |
| Wrappers on a screen | covered | properties.md#add-a-wrapper; screens.md mentions **Safe Area** | |

## `ui/components.md` (→ `design/components.md`)

| item | status | where / evidence | note |
|---|---|---|---|
| Find your components in the Widgets panel | covered | components.md#manage-screens-and-components, library.md | 3.13: **Library**. |
| A component is a reusable widget that stays connected: change it once, every copy updates | covered | components.md (intro) | |
| Instead of duplicating and fixing each copy, make a component and use instances | covered | components.md (intro), #use-a-component | |
| Example: a recipe card on several screens; add a "Date added" line once and every card gets it | added | components.md (intro) | Example only. |
| Select the widget, or several widgets grouped first (Ctrl/Cmd + G) | covered | components.md#create-a-component | |
| Click the **Create Component** icon at the top of Details | covered | components.md#create-a-component | 3.13: widgets icon **Create a component** next to the name, or right-click **Create component**. |
| Click **Create** | obsolete | `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:125` | The button is **Submit**; covered. |
| Each component name must be unique | added | components.md#create-a-component | `packages/core/lib/src/file_system/naming.dart:35-37` ("is already taken"), `:126-140` (suggested name gets a number, e.g. Container1). |
| More instances: copy and paste, Alt-drag, right-click **Copy** then **Paste** | covered | components.md#use-a-component, select-and-edit.md#copy-cut-and-paste | |
| Changing the main component updates every instance | covered | components.md#edit-a-component-or-one-instance | |
| A wrapper added to the main component shows on every instance | added | components.md#edit-a-component-or-one-instance | With the component's board item selected, Details edits the component's own top widget (`packages/designer/lib/src/details/widget_details.dart:54-63`) and **Add Wrapper** wraps it (`:65-90`). On an instance in a screen, the wrapper wraps that instance only. |
| You can't edit a component inside a screen; drag an instance out first | obsolete | `packages/core/lib/src/interpreter/widget/instance_tree.dart:44`, `packages/designer/lib/src/details/widget_details.dart:321-326` | 3.13: select widgets inside an instance in place (code-derived, see W3-review open issue 1). Covered in components.md#edit-a-component-or-one-instance. |
| Connect properties to variables so each instance shows its own data (recipe names, pictures, dates) | covered | components.md#give-a-component-params | 3.13 uses **Params** for per-instance values; the recipe example is added there. |
| Select the main component, then create the variables | covered | components.md#give-a-component-params | |
| **Detach** an instance; later changes no longer reach it | covered | components.md#edit-a-component-or-one-instance | |
| Removing a component from the board doesn't delete it | covered | boards.md#remove-an-item-or-delete-it, components.md | |
| Delete for good: Files panel → right-click → **Remove** | covered | components.md#manage-screens-and-components | 3.13: Library → **Delete**. |

## `ui/layout/intro-layout.md` (→ `design/layout.md`)

| item | status | where / evidence | note |
|---|---|---|---|
| A clean layout that fits phones, tablets and desktops | covered | layout.md (intro), responsive.md | |
| Groups: combine widgets and handle them as one | covered | layout.md#groups | |
| Columns and rows: arrange widgets across or down | covered | layout.md#rows-and-columns | |
| Constraints: how widgets react when the screen size changes | covered | layout.md#place-widgets-in-a-stack | |
| Layout video tutorial (YouTube) | not useful | | Pure media link. |

## `ui/layout/rows-and-columns.md` (→ `design/layout.md`)

| item | status | where / evidence | note |
|---|---|---|---|
| Rows and columns line widgets up across or down, so the design adapts by itself | added | layout.md#pick-the-right-arrangement | Plain explanation of why: children move to make room. |
| Spacing, alignment, sizing and order are set in Details | covered | layout.md#rows-and-columns | |
| Tip: a shape under the selected widgets becomes the group's background when you group them | added | layout.md#groups | `packages/designer/lib/src/design/common_design.dart:66-77` (`_firstIsBg`: first selected widget has no content of its own and contains the others), `:92-95`. |
| **Alignment**: a grid of nine positions | covered | layout.md#rows-and-columns | |
| With spacing other than **Fixed**, only three positions apply | covered (corrected) | layout.md#rows-and-columns | Old page had the axes swapped: in a Column the three are left, center, right; in a Row top, center, bottom (`packages/designer/lib/src/details/flex_field.dart:103-106`, `:196-203`). |
| **Spacing**: **Fixed**, **Between**, **Around**, **Evenly** | covered | layout.md#rows-and-columns | |
| "Resizing" section: width and height of parents and children | covered | layout.md#size-widgets | Section is **Layout** (`packages/designer/lib/src/details/layout_details.dart:47`). |
| **Fixed** keeps the size whatever the content | covered | layout.md#size-widgets | |
| **Auto** fits the children, keeping any padding around them | added | layout.md#size-widgets | Padding is a wrapper inside the size box: `packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:88-92`, `:278`. |
| **Expand** fills the space left in the row or column | covered | layout.md#size-widgets | Added: several Expand widgets share the space equally (`packages/designer/lib/src/details/flex_size_field.dart:61-66`, `packages/nowa_runtime/lib/src/widgets/widgets.dart:84-86`). |
| Reorder by dragging on the board or in Details | covered | layout.md#rows-and-columns | |

## `ui/layout/groups.mdx` (→ `design/layout.md#groups`)

| item | status | where / evidence | note |
|---|---|---|---|
| Groups let you move, align and resize several widgets at once | covered | layout.md#groups | |
| Example: a card with an image, a title and a button that moves as one piece | added | layout.md#groups | Example only (a product card). |
| Group: select on the board or in the Outline, right-click **Group** or Ctrl/Cmd + G | covered | layout.md#groups | |
| Ungroup: select the group, right-click **Ungroup** | covered | layout.md#groups | |
| Ungroup with Ctrl/Cmd + G again | obsolete | `packages/designer/lib/src/designer_setup.dart:20`, `packages/designer/lib/src/actions/designer_actions.dart:52-55` | The key always groups (nests a group). Covered with the correction. |
| Group property **Alignment** | added | layout.md#stack-settings | Explained: where unpinned widgets sit (`packages/core/lib/src/layout/positioned_helper.dart:352-355`; Flutter Stack docs). |
| Group property **Text Direction** | added | layout.md#stack-settings | Explained in plain words (Flutter Stack docs). |
| Group property **Fit** | added | layout.md#stack-settings | Values `loose`, `expand`, `passthrough` (`packages/core/lib/src/fields/basic_fields.dart:1511-1548` shows enum names). |
| Group property **Children**: lists the widgets; add new ones there | added | layout.md#stack-settings, #rows-and-columns | **+** adds a copy of the last child (`packages/core/lib/src/fields/list_field.dart:33-53`). |
| Turn a group into a column or row to make it adapt | covered | layout.md#groups | |

## `ui/layout/constrains.md` (→ `design/layout.md`)

| item | status | where / evidence | note |
|---|---|---|---|
| Constraints decide how widgets react when the screen size changes | covered | layout.md#place-widgets-in-a-stack | |
| Set them across and down | covered | layout.md#place-widgets-in-a-stack | |
| **Left**: stays at its distance from the left edge | covered | layout.md#place-widgets-in-a-stack | Plain explanation and table added. |
| **Right** | covered | layout.md#place-widgets-in-a-stack | |
| **Left and right**: pinned to both sides, stretches with the width | covered | layout.md#place-widgets-in-a-stack | |
| **Top**, **Bottom**, **Top and bottom** | covered | layout.md#place-widgets-in-a-stack | |
| **Center**: stays centered; good for logos, icons, dialogs | added | layout.md#choose-what-each-widget-sticks-to | Example added. Behavior already covered. |
| Tip: if the layout looks off when the size changes, check the constraints | added | layout.md#choose-what-each-widget-sticks-to | Check by changing the screen's **Size** (`packages/core/lib/src/screen_sizes.dart:12-21`). |
| Don't mix conflicting constraints such as "Left and Right" with "Center" | obsolete | `packages/designer/lib/src/details/positioned_details.dart:97-130` | One choice per direction; and **Center** in either list clears the pins in both directions (`packages/core/lib/src/layout/positioned_helper.dart:352-355`), which is added as a caution. |

## `ui/wrappers/wrappers-intro.md` (→ `design/properties.md#add-a-wrapper`)

| item | status | where / evidence | note |
|---|---|---|---|
| A wrapper goes around a widget to add a behavior or change its look | covered | properties.md#add-a-wrapper | |
| Flutter builds UIs by composition over inheritance | not useful | | Developer concept. |
| Examples: **Padding** adds space; **Container** adds a background color, border, padding or margin | added | properties.md#add-a-wrapper | Container settings per reference/wrappers.md#container (`packages/core/lib/src/wrappers_to_add.dart`). |
| Link to the list of wrappers | covered | properties.md#add-a-wrapper → reference/wrappers.md | |
| Steps: select, **Add Wrapper**, pick, edit its properties | covered | properties.md#add-a-wrapper | |
| Order matters: the lower section in Details is the outer one | covered | properties.md#add-a-wrapper | |
| Reorder: hover the wrapper's name and drag the handle | covered | properties.md#add-a-wrapper | |

## Totals

| Old page | Items | covered | added | obsolete | not useful | dev-only | for other page |
|---|---|---|---|---|---|---|---|
| ui/boards.mdx | 12 | 7 | 1 | 3 | 1 | 0 | 0 |
| ui/screens.md | 21 | 18 | 3 | 0 | 0 | 0 | 0 |
| ui/components.md | 17 | 12 | 3 | 2 | 0 | 0 | 0 |
| ui/layout/intro-layout.md | 5 | 4 | 0 | 0 | 1 | 0 | 0 |
| ui/layout/rows-and-columns.md | 11 | 8 | 3 | 0 | 0 | 0 | 0 |
| ui/layout/groups.mdx | 10 | 4 | 5 | 1 | 0 | 0 | 0 |
| ui/layout/constrains.md | 9 | 6 | 2 | 1 | 0 | 0 | 0 |
| ui/wrappers/wrappers-intro.md | 7 | 5 | 1 | 0 | 1 | 0 | 0 |
| **All** | **92** | **64** | **18** | **7** | **3** | **0** | **0** |

"covered (corrected)" rows count as covered; "added (corrected)" as added.
