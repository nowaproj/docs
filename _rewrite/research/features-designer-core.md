# Features: Designing UI: board, screens, components, layout

Source: /home/user/nowa-master (v3.12.5). Researcher: features-designer-core. 2026-10-06.

Scope notes for the IA step:
- "Default layout" below means the standard UI (the experimental **New UX** flag is off by default:
  `packages/core/lib/src/project/settings_service.dart:56`). New UX is listed under "Not user-facing".
- The board and the visual designer only exist in the desktop-width layout. On iOS/Android and narrow web
  windows Nowa shows a separate mobile layout with no board (`lib/project/project_page.dart:105`,
  `packages/nowa_ui/lib/src/globals/responsive_utils.dart:63`).
- Overlaps, owned by other researchers: the widget catalog / widget picker (`Ctrl/Cmd+K`) and per-widget
  properties (catalog), themes and the applied theme (themes), the shortcuts cheat sheet and side bar (editor
  shell), variables/functions/global state (logic), the Run button / App Run / Share preview links (shipping),
  AI-created screens (AI), Router editor (logic/navigation).
- The product links to an old URL in this area: the **Group** widget's doc link points at
  `https://docs.nowa.dev/ui/layout/groups` (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:249`).
  That URL needs a redirect to the new layout/groups page.

## Summary
- **Boards** (the **Board** chip in the top bar, **Create new board**): design surfaces saved as `.board` files; switch, create, rename, delete.
- **Show Grid / Board Color / Reset**: per-board background color and dot grid, in the Details box when nothing is selected.
- **Moving around the board** (no UI label): scroll/trackpad to pan, `Ctrl/Cmd`+scroll or pinch to zoom, Space+drag or middle-drag to pan, `F` to zoom to the selection.
- **Big boards** (behavior): items in view load first, only the item you work on animates, crowded views show still pictures.
- **Board items** (canvases): screens, components or loose widgets placed on a board, with a title bar (home icon, **Play**, **Open in new tab**) and **X/Y/W/H** layout.
- **Designer toolbar** (**Select tool**, **Shape**, **Screen**, **Text**, **Widget**): floating bar at the bottom of the board.
- **Adding things to a board**: drag from the **Widgets** panel, the **Files** panel, the widget picker, or your computer; paste images and text.
- **Play** (called "Instant Play" in What's New): runs any board item in place, interactive, with **Share preview**, **Reset zoom**, **Stop**.
- **Screen** tool / **Create a page**: creates a screen from the template picker (**Search for templates**, **Screens** / **Components**, **Empty Page**, **Premium** badge). (Premium templates need the premium-templates entitlement)
- **Screen settings** (Scaffold section): **Color**, **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar**, **Size** presets.
- **Route Settings**: **Path** and **Route Parameters** of a screen. (GoRouter projects only)
- **Make home screen**: sets the screen the app opens on; **This is the home screen** shows on the current one.
- **Rename** (screens and components): double-click the board title, pencil **Rename** in Details, or **Rename** in the Widgets panel.
- **Add description**: a doc comment for a screen or component, written in the Details box.
- **Copy as new widget**: duplicates a screen or component class into a new file and places it on the board.
- **Remove** vs **Delete**: removing from a board keeps the file; deleting from the Widgets or Files panel deletes it.
- **Widgets** panel: your project's screens (**Page**) and components (**Component**): search, open, drag to board, rename, delete.
- **Open in new tab**: opens one screen or component on its own (dark canvas, floating **Outline**), `Ctrl/Cmd+I`.
- **Create component**: turns the selected widget into a reusable component (dialog "New Component from …").
- **Variables** box (**Params**, **Variables**, **Functions**): component parameters, state (makes it stateful automatically) and functions.
- **Component instances**: place copies, set per-instance parameter values, edit the original, **Detach**.
- **Selecting**: click, `Shift`-click, `Ctrl/Cmd`-click (deepest), double-click to drill in, drag a box, `Ctrl/Cmd+A`, breadcrumbs.
- **Moving**: drag, `Shift` to lock an axis, `Alt`/`Option`-drag to duplicate, arrow keys to nudge or reorder.
- **Drop rules**: where a dragged widget lands (free position in a Stack, ordered slot in a Row/Column, app-bar/FAB slots on a screen).
- **Resizing**: 8 handles, `Shift` keeps proportions, `Alt` resizes from the center; multi-selection scales together.
- **Snapping and guides**: purple guides to nearby edges and centers while moving and resizing.
- **Editing text on the canvas**: double-click a Text, Markdown or Html widget to type in place.
- **Copy / Cut / Paste**: widgets go to the system clipboard; pasting images or image links creates Image widgets, plain text creates Text.
- **Remove** (widgets): `Delete` / `Backspace` or right-click **Remove**.
- **Replace with...**: swaps a widget for another, keeping children.
- **Group / Ungroup**: wraps the selection in a group (`Ctrl/Cmd+G`); **Ungroup** from the right-click menu.
- **Move Up / Move Down / Move To Top / Move To Bottom**: changes order among siblings (`Ctrl/Cmd+]` / `[`).
- **Add Wrapper**: wraps a widget (Padding, Container, Scroll View, Screen, Safe Area …); reorder or **Remove** wrappers.
- **Export as image...**: saves a widget or screen as PNG/JPG at 1x–4x.
- **Group** section: switch a group between Stack, Row and Column; **Padding**; **Test …** for list-driven children.
- **Rows and columns**: **Alignment** grid, **Main Axis Size**, **Spacing** (**Fixed**/**Between**/**Around**/**Evenly**), **Gap**.
- **Stacks and constraints**: **L/T/R/B/W/H** and constraints (**Left**, **Right**, **Left and right**, **Center**; **Top**, **Bottom**, **Top and bottom**, **Center**).
- **Layout** section (sizing): **W**/**H** with **Fixed**, **Auto**, **Expand**.
- **Scrolling and wrapping**: **Scroll View** wrapper, **Wrap**, **List View**; Expand is not offered along a scroll direction.
- **Responsive design**: no breakpoints; built with Expand/Auto/Fixed, spacing, constraints and screen **Size** presets.
- **Outline** panel: the widget tree of the board or open widget; select, reveal, drag to reorder, right-click menu, branches, wrappers.
- **Device preview** (**Play Settings**, **Device Size**, **Full Screen**): device frames on the shared preview page and in AI play mode.
- **Placeholder values on the board** (behavior): empty data shows as `[name]`, 3 sample items, grey images, small widget slots.
- **This screen failed to render** / **Reload screen**: per-item error recovery on the board.
- **View only** boards: viewers can select, copy and export, not edit. (Viewer role)
- **Designer keyboard shortcuts**: the real bindings, and where the in-app cheat sheet disagrees.

## Features

### Boards
- **What it does:** A board is a free-form design surface saved as a `.board` file in the project's `boards/`
  folder. It holds any number of items (screens, components, loose widgets). A project can have many boards; a
  new project opens `boards/first.board` (created if missing). Boards are for arranging and viewing; items that
  are screens/components point at their Dart files, loose widgets live only in the board file.
- **Where:** top bar, left half, the chip right after the Nowa logo (shows the current board name, or a dimmed
  **Board** when you are not on a board). On a board, click it to open the board menu; off a board, click it to
  go back to the last board. Also: `Ctrl/Cmd+B`; `Ctrl/Cmd+Shift+B` (new board); **Files** panel → `boards`
  folder → **Add board** (+).
- **Labels:** **Board** (chip when not on a board), **Create new board**, row hover actions **Rename** and
  **Delete**; new-board dialog title **New Board**, field hint **Board name**, read-only **Path** `boards/…`
  `.board`, buttons **Cancel** / **Submit**. Files-panel variant: tooltip **Add board**, dialog title
  **New Create board** (the code prefixes "New " to the headline "Create board"). Empty workspace: **Nothing is
  open**, **Open a board to design, or browse your widgets.**, **Open board**, **Browse widgets**,
  **Open code mode**. In code mode: **Code view is not available for boards**.
- **How to use:**
  1. Click the board chip in the top bar.
  2. Pick a board to open it, or hover a row and click **Rename** / **Delete**.
  3. Click **Create new board**, type a name, click **Submit**. The new board opens.
  4. Press `Ctrl/Cmd+B` to return to your last board; pressed again on a board, it cycles to the next board.
- **Options:** none beyond name.
- **Limits and rules:** name required (**Name cannot be empty**); the name is converted to a camelCase symbol name
  and de-duplicated with a number when taken (3.12.5 behavior, see 3.13). Deleting asks **Are you sure you want to
  delete "<file>"?**. If no board exists, `Ctrl/Cmd+B` creates one named `board`. Each board remembers its zoom and
  scroll position per project on this device (local storage). Saving the project while a board is open takes a
  screenshot of the board as the project's cover, unless you set a custom cover.
- **Gating:** desktop-width layout only (not the mobile layout). Viewers cannot edit (see View only).
- **Code refs:** `packages/nowa_ui/lib/top_bar/top_bar_view.dart:330`, `:350`, `:409`, `:412`;
  `lib/project/top_bar_mapper.dart:76`; `lib/project/top_bar.dart:260`, `:274`;
  `packages/designer/lib/src/actions/file_actions.dart:21`, `:36`, `:55`, `:68`;
  `packages/designer/lib/src/designer_setup.dart:51`; `lib/setup_general_actions.dart:35`;
  `lib/project/panels/files_panel/files_list.dart:481`, `:511`; `lib/project/project_page.dart:558-560`;
  `packages/core/lib/src/providers/project_provider.dart:370`; `packages/core/lib/src/file_system/board_file.dart:146-149`;
  `packages/designer/lib/src/board/board_editor.dart:23`, `:43`; `packages/designer/lib/src/design_experience/designer_board_controller.dart:171`;
  `packages/core/lib/src/file_system/board_file_state.dart:44-66`; `packages/designer/lib/src/thumbnail.dart:9-12`;
  `packages/designer/lib/src/designer_plugin.dart:17`; `lib/project/panels/empty_workspace.dart:26`, `:37`.
- **Old docs:** `docs/ui/boards.mdx`: partly wrong. The "Design / Widgets / Assets board" types and the "+ at
  the top of the tabs bar" and "Recent files" steps don't match 3.12.5 (no tab bar in design mode; boards are
  created from the board chip menu). Board customization part is accurate. What's New 3.10 "Boards moved to the
  top right" is superseded by the 3.12 top bar (chip is on the left).
- **3.13 (dev) changes:** board picker becomes a searchable chip listing every board, with **Back** / **Forward**
  history buttons (`nowa(dev) packages/nowa_ui/lib/top_bar/top_bar_view.dart:260`, `:271`); a new board keeps its
  name as typed instead of camel-casing (`nowa(dev) packages/designer/lib/src/actions/file_actions.dart:66`).
- **Screenshot value:** high: top bar with the board menu open (board rows, hover **Rename**/**Delete**,
  **Create new board**).

### Show Grid / Board Color / Reset (board settings)
- **What it does:** Sets the board's background color and shows a dot grid behind the items. Saved in the board
  file, so each board has its own settings.
- **Where:** on a board, click empty board space so nothing is selected; the **Details** box (floating, top right
  of the board) shows the board settings.
- **Labels:** **Show Grid** (switch), **Board Color** (color field), **Reset** (button).
- **How to use:** 1. Click empty board space. 2. Toggle **Show Grid** or pick a **Board Color**. 3. **Reset**
  clears both back to defaults.
- **Options:** **Show Grid**: off by default. **Board Color**: default light grey (#E7E7E7). The board title text
  switches between dark and light for contrast with the color.
- **Limits and rules:** the grid is visual only; nothing snaps to it (snapping is to other items, see Snapping).
  Changing the color is undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/board_details.dart:37-71`;
  `packages/designer/lib/src/details/empty_details.dart:17`; `packages/core/lib/src/board/board.dart:93`, `:209`;
  `packages/core/lib/src/widgets/grid.dart:42`; `packages/nowa_ui/lib/src/globals/themes.dart:188`;
  `packages/designer/lib/src/panels/canvas_titles.dart:142-148` (title contrast).
- **Old docs:** `docs/ui/boards.mdx` ("Board Customization"): accurate (does not name the **Reset** button).
- **3.13 (dev) changes:** none material (button restyled).
- **Screenshot value:** medium: Details box with **Show Grid**, **Board Color**, **Reset**.

### Moving around the board (pan and zoom)
- **What it does:** Pan and zoom the board with mouse, trackpad and keyboard.
- **Where:** on any board or on a screen/component opened on its own.
- **Labels:** none (no zoom buttons or percentage control exist). Cursor shows a hand while holding Space.
- **How to use:**
  - Pan: scroll wheel or two-finger trackpad scroll; `Shift`+scroll pans horizontally; hold `Space` and drag
    with the left button; or drag with the middle mouse button.
  - Zoom: hold `Ctrl` (Windows/Linux) or `Cmd` (macOS) and scroll; or pinch on a trackpad. Zoom follows the
    pointer.
  - Zoom to selection: select something and press `F`.
  - Zoom to a widget from the tree: double-click its row in **Outline**.
- **Options:** none.
- **Limits and rules:** zoom stops at about 10x in and 0.1x out. Trackpad panning has inertia. On boards panning is
  unlimited; in a screen/component opened on its own the view stays near the widget. Zoom-to (F, Play, Outline)
  picks a zoom between 0.2x and 3x. The board remembers position and zoom per board per project on this device.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/board/board_view.dart:85-114` (pan, clamp), `:123-137` (zoom limits at
  `:127`, `:130`), `:147` (middle button / Space), `:183-196` (trackpad), `:202` (Space), `:215` (inertia),
  `:237-251` (scroll, `Ctrl/Cmd` at `:240`, `Shift` at `:242`), `:261-297` (animate/focus, clamp at `:295`);
  `packages/designer/lib/src/widgets/widget_designer.dart:49-50` (size clamp only in single view);
  `packages/designer/lib/src/designer_setup.dart:19`; `packages/designer/lib/src/actions/designer_actions.dart:222-238`.
- **Old docs:** none dedicated; `docs/shortcuts.md` lists zoom: accurate for zoom, but see Designer keyboard
  shortcuts for its errors.
- **Screenshot value:** low (gesture-based); a short video of pan/zoom/F would help.

### Big boards (performance behavior)
- **What it does:** Keeps large boards responsive. Items build one at a time, the ones in view first; items out
  of view do not repaint and their changes wait until they come back into view; animations and timers run only
  on the item you hover, select or play; when more than 8 items are in view, the others are drawn as a still
  picture until you hover or select them. A slow item shows a loading placeholder until its files load.
- **Where:** automatic on every board.
- **Labels:** loading placeholder items are named **Loading...**; failed ones **Error** (see failure feature).
- **How to use:** nothing to do. Hover or select an item to bring it fully live.
- **Options:** none.
- **Limits and rules:** "live budget" 8 items in view; 200 px screen margin counts as "in view"; pictures refresh
  shortly after changes (300 ms after an edit, 1 s after new pictures).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/board/canvas_detail.dart:43`, `:46`, `:61-69`, `:84-90`, `:123-131`,
  `:153-160`, `:182-188`; `packages/designer/lib/src/panels/designer_board.dart:47`;
  `packages/core/lib/src/board/board_canvas.dart:260`; `packages/core/lib/src/file_system/board_file.dart:64-76`;
  `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:94`.
- **Old docs:** missing (only What's New 3.12.5 / changelog describe it).
- **Screenshot value:** low.

### Board items (canvases)
- **What it does:** Every top-level thing on a board is an item. Items can be a screen, a component, or any
  widget placed straight on the board (e.g. a shape drawn with the Shape tool). Screens and components get a
  title bar above them; loose widgets and wrapped components (a component with a wrapper added on the board) do
  not.
- **Where:** on the board. Title bar sits just above the item and stays the same size at any zoom.
- **Labels:** title shows the class name; a home icon on the home screen; on hover/selection a play button with
  tooltip **Play** (or **Stop** while playing) and an **Open in new tab** button. Item layout in Details →
  **Layout**: **X**, **Y**, **W**, **H**, and width/height mode (**Fixed** / **Auto**, only when the widget can
  size itself). Empty board text: **To create a new screen click on the [phone icon] icon in the tool bar.**
- **How to use:**
  1. Click a title to select the screen/component itself (`Shift`-click adds it to the selection).
  2. Double-click a title to rename the class (Enter to confirm).
  3. Drag the item by its body to move it; resize it with the handles or type **X/Y/W/H**.
- **Options:** **W**/**H** **Auto** sizes the item to its content (offered only if the widget has an intrinsic
  size); **Fixed** keeps the typed size.
- **Limits and rules:** an item with no width/height set is laid out up to 2000 px. Resizing a screen/component
  item also stores that size as the class's design size (used whenever it is placed or opened on its own).
  Loose widgets are stored only in the `.board` file, not in `lib/`. Items reload when their files finish
  loading.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/panels/canvas_titles.dart:31` (titles only for component items),
  `:200-206`, `:230`, `:247-251`, `:267`; `packages/core/lib/src/board/board_canvas.dart:27`, `:169-173`;
  `packages/core/lib/src/board/board.dart:409-416`; `packages/core/lib/src/board/board_block.dart:166-179`,
  `:217-218`; `packages/designer/lib/src/details/layout_details.dart:70`, `:99`;
  `packages/designer/lib/src/panels/empty_board_notice.dart:47`, `:60`.
- **Old docs:** `docs/ui/screens.md` (rename by double-click: accurate); nothing explains loose items or titles.
- **Screenshot value:** high: a board with two screens, one loose shape, the hovered title bar showing
  home/**Play**/**Open in new tab**.

### Designer toolbar (Select tool, Shape, Screen, Text, Widget)
- **What it does:** Floating tool bar at the bottom center of the board for picking a tool.
- **Where:** bottom of the board. While an item is playing it is replaced by the Play bar. Viewers see **View only**
  instead.
- **Labels (tooltips, left to right):** **Select tool** (`V`), **Shape** (`R`), **Screen** (no key; opens the
  template picker), **Text** (`T`), **Widget** (`Ctrl/Cmd+K`; opens the widget picker **Search for a widget**).
- **How to use:**
  - **Shape** / **Text**: choose the tool, then click on the board or inside a container to place a default item
    (grey 100×100 Container, or a Text "Write something"), or click-drag to draw its size (`Shift` keeps ratio,
    `Alt` draws from the center). The tool returns to **Select tool** after placing; a placed Text opens for
    typing right away.
  - **Screen**: see Screen tool / Create a page.
  - **Widget**: opens the widget picker; pick a widget to place it at the pointer, or drag it onto the board.
- **Options:** none.
- **Limits and rules:** **Screen** is hidden when a screen/component is open on its own. Tool keys are ignored
  while typing in a field. All designer shortcuts are off while something is playing and in view-only projects.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/widgets/designer_tools.dart:90-95`, `:135`, `:142`, `:152-160`, `:164`,
  `:174-182`, `:208-219`, `:225`; `packages/designer/lib/src/designer_setup.dart:16-18`, `:48`, `:133-136`;
  `packages/designer/lib/src/panels/designer_board.dart:137`;
  `packages/designer/lib/src/design_experience/place_board.dart:47`, `:109`, `:175`, `:179`;
  `packages/core/lib/src/widgets_to_add/default_blocks.dart:10`, `:317`; `packages/core/lib/src/widgets/widget_picker.dart:146`, `:191`.
- **Old docs:** `docs/ui/toolbar.md`: partly outdated (says the toolbar is at the top and has a **Play** tool;
  since 3.10 it is at the bottom and play is on items). Labels differ ("Selection" vs **Select tool**).
- **Screenshot value:** high: the bottom toolbar with tooltips.

### Adding things to a board
- **What it does:** Several ways to put screens, components, widgets and files on a board.
- **Where / How to use:**
  1. **Widgets** panel (left side bar) → drag a **Page** or **Component** tile onto the board.
  2. **Files** panel → drag a Dart file onto the board (places the first public widget in that file); asset
     files can be dragged too.
  3. Widget picker (`Ctrl/Cmd+K` or toolbar **Widget**) → click or drag a widget; filter tabs **All**,
     **BuiltIn**, **Components** (your components appear under **Components**).
  4. Drag a file from your computer onto the board: it is imported into the project and placed as an item
     (e.g. an image becomes an Image widget).
  5. Paste (see Copy / Cut / Paste).
  6. Template picker (see Screen tool).
- **Labels:** see the panels; widget picker hint **Search for a widget**.
- **Limits and rules:** dropping follows the drop rules (inside a container if you drop on one, else a new board
  item). A screen always becomes its own board item. Dropping the same screen twice creates two items pointing at
  the same screen (edits show in both). Widgets with missing package dependencies ask to fix them first; widgets
  with dependencies can't be dragged from the picker.
- **Gating:** none found.
- **Code refs:** `lib/project/panels/widgets_panel/preview_tiles.dart:74-79`;
  `packages/core/lib/src/file_system/dart_file.dart:226-235`;
  `packages/designer/lib/src/design_experience/designer_board_controller.dart:244-286`;
  `packages/designer/lib/src/actions/add_actions.dart:16`; `packages/core/lib/src/widgets/widget_picker.dart:172`, `:191`;
  `lib/project/drop_from_outside.dart:35`; `packages/designer/lib/src/design/drop_on_board.dart:17-29`.
- **Old docs:** `docs/ui/screens.md` ("Adding Screens from the Files Panel"): partly outdated (the Widgets panel is
  the main place; Files drag still works). `docs/ui/widget-panel.md`: accurate on drag/double-click.
- **Screenshot value:** medium: dragging a page tile from the Widgets panel to the board.

### Play (Instant Play)
- **What it does:** Runs a board item in place on the board, interactive (tap, scroll, type), without leaving
  the board. Works on screens, components, loose widgets and wrapped components; a widget inside a screen plays
  the whole board item it belongs to. While one item plays, selecting another item plays that one instead. The
  item keeps the parameter values set on the board. With GoRouter, a screen starts on its own route.
- **Where:** hover or select a screen/component title → play button (**Play**). Any widget: right-click → **Play**.
- **Labels:** **Play**, **Stop** (title button); Play bar at the bottom of the board: **This screen is capturing
  scroll**, **Share preview** (share icon), **Reset zoom**, **Stop**, and a warning icon with tooltip **In board
  preview is not 100% accurate, run the app to see the real output**. Playing item gets an orange 4 px border.
- **How to use:**
  1. Hover a screen's title and click **Play** (or right-click any widget → **Play**). The board zooms to it.
  2. Interact with it on the board. Scrolling over it scrolls the app, not the board.
  3. Click another item to play that one; click **Stop** (title or Play bar) to end.
  4. **Reset zoom** re-centers the playing item; **Share preview** opens the share popup for that screen.
- **Options:** none.
- **Limits and rules:** **Play** shows in the right-click menu only when nothing is playing and exactly one widget
  is selected. While playing, the item can't be moved or resized, designer shortcuts are off, and clicks on the
  playing item go to the app. Not 100% identical to the real app (use Run for that). **Share preview** in a local
  project shows **Share preview is not available on local projects** with **Sync to cloud**. No keyboard
  shortcut found for Play.
- **Gating:** sharing from Play needs a cloud project (`packages/designer/lib/src/play_mode/play_mode.dart:47-55`).
- **Code refs:** `packages/designer/lib/src/panels/canvas_titles.dart:247-251`;
  `packages/designer/lib/src/menus/widget_context_menu.dart:39`;
  `packages/designer/lib/src/actions/designer_actions.dart:279-296`;
  `packages/designer/lib/src/play_mode/board_play_controller.dart:53-63`, `:65-91`;
  `packages/designer/lib/src/design/designer.dart:35-40`;
  `packages/designer/lib/src/play_mode/play_mode.dart:416`, `:451-464`, `:502`, `:508`, `:521`, `:532`, `:539`;
  `packages/designer/lib/src/design_experience/designer_board_controller.dart:66-70`, `:291-292`;
  `packages/designer/lib/src/designer_setup.dart:133`.
- **Old docs:** missing as a page (`docs/ui/toolbar.md` mentions a Play tool that no longer exists). What's New
  3.9 and 3.12.5 describe it.
- **3.13 (dev) changes:** small fix for switching between playing items (`nowa(dev)` commit "fix instant play
  switching"; `nowa(dev) packages/designer/lib/src/play_mode/board_play_controller.dart` adds a measured rect).
- **Screenshot value:** high: a playing screen with orange border and the Play bar.

### Screen tool / Create a page (create a screen)
- **What it does:** Adds a new screen (or component) from a template, saves it as a Dart file, adds a route for
  screens, and places it on the board.
- **Where:** toolbar **Screen**; right-click empty board → **Create a page**; **Files** panel (in `lib`) → **Add**
  → **New Widget...**; empty tab (`Ctrl/Cmd+T`) → **New Widget**. Other ways that make a screen: add the
  **Screen** wrapper to a widget and use **Create component** (any class containing a Scaffold counts as a
  screen); **Copy as new widget** on an existing screen; the AI (AI researcher).
- **Labels:** picker hint **Search for templates**; filter tabs **Screens** (default) and **Components**; a
  **Premium** badge on premium templates. Built-in templates: Screens: **Empty Page**, **Basic Cards 1**,
  **Basic Cards 2**, **Basic Cards 3**, **Onboarding Screen**, **Article**, **Dashboard**, **Event Info**,
  **Audio Player Page**, **Chat Template**, **Authentication Template**; Components: **Audio Player**,
  **Google Button**. Single-file naming dialog: title **New <template name>** (e.g. **New Empty Page**), name
  field, **Class name**, **Path** (`lib/pages/…` for screens, `lib/components/…` for components), **Cancel** /
  **Submit**. Multi-file templates: **Add <template name>** with a file list, **Cancel** / **Import** (asks before
  overwriting existing files).
- **How to use:**
  1. Click **Screen** in the toolbar (or right-click the board → **Create a page**).
  2. Keep **Screens** selected, search or scroll, click a template (e.g. **Empty Page**).
  3. Name it and click **Submit** (multi-file: pick files, click **Import**).
  4. The screen appears on the board where you clicked; a route `/<screen-name>` is added.
- **Options:** the class name and path can be edited in the dialog.
- **Limits and rules:** an **Empty Page** is a Scaffold → SafeArea → Stack, placed at 393×808 (the "Pixel 3a"
  preset) unless the template stores a size; change it later with **Size**. Multi-file templates place only
  their screens on the board, 400 px apart. Name validation (**Name cannot be empty**, invalid/duplicate names).
  A new screen is not made the home screen automatically (use **Make home screen**). From the Files panel / empty
  tab, the new file opens on its own instead of being placed on a board.
- **Gating:** **Premium** templates (**Article**, **Dashboard**, **Event Info**, **Audio Player Page**) need the
  premium-templates entitlement; without it a payment dialog opens
  (`packages/core/lib/src/services/templates/add_template_action.dart:28-33`). Plan name not in code.
- **Code refs:** `packages/designer/lib/src/widgets/designer_tools.dart:152-160`;
  `packages/designer/lib/src/menus/board_context_menu.dart:19`;
  `packages/designer/lib/src/actions/add_template_designer.dart:25`, `:31-33`;
  `packages/core/lib/src/services/templates/add_template_action.dart:48`, `:71`, `:94`;
  `packages/core/lib/src/services/templates/cloud_templates_services.dart:115`;
  `packages/core/lib/src/services/templates/templates_service.dart:374-387`;
  `packages/core/lib/src/services/templates/built_in/*.dart` (names/flags);
  `packages/core/lib/src/file_system/actions/file_actions.dart:49-50`, `:65`;
  `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94`, `:126`;
  `packages/core/lib/src/file_system/widgets/file_name_text_field.dart:109`, `:175`, `:202`;
  `packages/core/lib/src/file_system/widgets/template_widgets/add_template_dialog.dart:144`, `:196`;
  `packages/core/lib/src/services/templates/built_in/empty_page.dart:4-31`; `packages/core/lib/src/screen_sizes.dart:13`;
  `lib/project/panels/files_panel/add_lib_menu.dart:67`; `lib/empty_editor.dart:95`;
  `packages/core/lib/src/wrappers_to_add.dart:134`; `packages/core/lib/src/interpreter/widget_declarations.dart:281-293`.
- **Old docs:** `docs/ui/screens.md` ("Creating a New Screen"): mostly accurate (says you can choose a default
  size for an empty screen; the size list is not shown in 3.12.5). `docs/ui/temlpates.mdx`: accurate for
  multi-file templates; misses the single-file **Submit** dialog and the **Premium** badge.
- **Screenshot value:** high: the template picker with **Screens**/**Components** tabs and a preview; the
  **New Empty Page** dialog.

### Screen settings (Scaffold section)
- **What it does:** Edits a screen's frame: background, app bar, drawer, floating action button, bottom navigation
  bar, design size, route and home status.
- **Where:** select the screen (click its title on the board) → **Details** box. A screen's root widget is shown
  with its wrappers: the Scaffold appears as a wrapper section (the **Screen** wrapper), usually above a
  **Safe Area** wrapper, and the body group's **Group** section.
- **Labels:** **Color** (background; defaults to the theme's surface color), **App Bar**, **Drawer**,
  **Floating Action Button**, **Bottom Navigation Bar** (widget slots), **Size** (presets **Pixel 3a**,
  **iPhone 11 Pro**, **Galaxy S20+**, **iPhone 12**, **MacBook Pro**, **1920x1080**), then **Route Settings**
  and **Make home screen** (own features). App Bar fields when one is set: **Title**, **Center Title**,
  **Elevation**, **Background**, **Foreground**, **Shadow**, **Leading**, **Width** (when leading is set),
  **Border**, **Actions**, and advanced **Spacing**, **Height**, **Automatically Imply Leading**,
  **Flexible Space**.
- **How to use:**
  1. Click the screen's title to select it.
  2. In the Scaffold section, set **Color**, or fill a slot (**App Bar**, **Drawer** …) by picking a widget.
     You can also drag an App Bar, Floating Action Button, Bottom Navigation Bar or Drawer widget onto the
     screen and it drops into its slot.
  3. Choose a **Size** preset to resize the screen on the board.
- **Options:** see labels. Your own widgets can be used as an app bar (What's New 3.12).
- **Limits and rules:** removing the **Screen** wrapper makes the widget a non-screen (a component). **Size**
  applies to the board item only (the app fills the real device). **Safe Area** fields are under advanced
  options.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/designer_plugin.dart:50`;
  `packages/designer/lib/src/details/widget_fields.dart:202-258` (`:220`, `:222`, `:231`, `:248`, `:250`),
  `:352-391` (App Bar), `:516-527` (Safe Area); `packages/core/lib/src/fields/nowa_fields.dart:912-929`;
  `packages/core/lib/src/screen_sizes.dart:12-21`; `packages/designer/lib/src/design_experience/drag_rule.dart:393-436`;
  `packages/core/lib/src/wrappers_to_add.dart:100`, `:134`; `packages/core/lib/src/interpreter/widget/widget_blocks.dart:291-304`.
- **Old docs:** `docs/ui/screens.md` ("Screen Properties"): partly outdated: lists a "Navigation" group (the
  fields are separate slots), misses **Route Settings** and **Add description**; Name/Open in new tab/Layout/
  Group/Screen wrapper/Color/Size/Make Home Screen are still right.
- **Screenshot value:** high: Details box for a selected screen showing the Scaffold section.

### Route Settings
- **What it does:** Shows and edits a screen's route path and route parameters (deep links / web URLs).
- **Where:** select a screen → **Details** → Scaffold section → **Route Settings** (info icon; route icon button
  **Open Router Editor**).
- **Labels:** **Route Settings**; helper text **This section allows you to configure the routing settings for
  this screen.** / **This is only available in projects using go_router**; **Path** (hint `/<screen-name>`);
  **Route Parameters** with **Add Route Parameter** (+), **No route parameters**, **Param name**, a link button
  (**Link to parameter** or the linked parameter's name), **Default value**, **Remove Route Parameter**.
- **How to use:** 1. Type a **Path** and press Enter (creates the route if missing). 2. Expand **Route
  Parameters**, click +, name the parameter, link it to one of the screen's **Params**, optionally set a
  **Default value**.
- **Options:** see labels.
- **Limits and rules:** errors **Route parameter cannot be empty**, **Route parameter cannot contain '/'**,
  **Route parameter cannot contain ':'**, **Route parameter '<name>' already exists**. Hidden entirely in
  projects not using GoRouter.
- **Gating:** GoRouter projects only (all new projects since 3.5 use GoRouter).
- **Code refs:** `packages/designer/lib/src/details/route_details.dart:89-96`, `:107-143`, `:161`, `:170`, `:199`,
  `:205`; `packages/designer/lib/src/details/widget_fields.dart:248`.
- **Old docs:** missing (router docs are logic/navigation's area).
- **Screenshot value:** medium.

### Make home screen
- **What it does:** Makes a screen the one the app opens on. With GoRouter it sets the router's initial location
  (adding a route if needed); otherwise it sets the app's home.
- **Where:** select a screen → **Details** → Scaffold section, at the bottom.
- **Labels:** **Make home screen** (button), **This is the home screen** (text on the current one). The home
  screen shows a home icon in its board title and in **Outline**.
- **How to use:** select the screen, click **Make home screen**.
- **Options:** none.
- **Limits and rules:** errors show as a snackbar. Renaming the home screen keeps it home.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/route_details.dart:262-294`;
  `packages/core/lib/src/project/env_services/go_router_routing_service.dart:13-28`;
  `packages/core/lib/src/project/env_services/app_routing_service.dart:22`;
  `packages/core/lib/src/interpreter/widget_declarations.dart:539`; `packages/designer/lib/src/panels/canvas_titles.dart:230`;
  `packages/nowa_ui/lib/outline/outline_view.dart:367`.
- **Old docs:** `docs/ui/screens.md`: accurate. `docs/ui/outline.md` "yellow home icon": accurate (orange-yellow,
  #FFAB3F).
- **Screenshot value:** medium.

### Rename (screens and components)
- **What it does:** Renames a screen or component class and updates every reference.
- **Where:** double-click the item's title on the board; or select it → **Details** → pencil button (**Rename**)
  next to the name; or **Widgets** panel → right-click → **Rename**.
- **Labels:** **Rename**; error **Name is not valid: …**.
- **How to use:** double-click the title, type, press Enter (Esc cancels); or click **Rename** in Details and
  confirm.
- **Options:** none.
- **Limits and rules:** renaming from Details also renames the file (snake_case). Renaming from the board title
  renames the file only when the file name matched the class name. Names must be valid Dart class names.
  Undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/panels/canvas_titles.dart:158-175`, `:200-206`;
  `packages/designer/lib/src/details/name_group.dart:48-57`, `:100-120`;
  `lib/project/panels/widgets_panel/widgets_context_menu.dart:35`;
  `packages/core/lib/src/interpreter/declaration_runtime.dart:67-90`.
- **Old docs:** `docs/ui/screens.md` ("Renaming a Screen"): accurate.
- **Screenshot value:** low.

### Add description
- **What it does:** Writes a short description (a doc comment) for a screen or component, for teammates and for
  the AI.
- **Where:** select a screen/component → **Details** → the grey line under the name (**Add description**, or the
  first line of the existing description).
- **Labels:** **Add description**; editor header shows the widget name with **Back to fields** (back arrow);
  hint **Describe this widget, what it is for and how to use it.**; for Flutter's own widgets **This widget has
  no source to document.**
- **How to use:** click **Add description**, type, click **Back to fields** (or select another widget; the text
  is saved).
- **Options:** none.
- **Limits and rules:** only your own classes can be documented. Undoable (**Edit description**).
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/widget_details.dart:181`, `:363-393`, `:401-527` (`:482`, `:506`, `:519`).
- **Old docs:** missing (What's New 3.12 "Describe Your Components").
- **Screenshot value:** low.

### Copy as new widget (duplicate a screen or component)
- **What it does:** Copies a screen or component class into a new class and file, and places the copy on the
  board. (Copy/paste of a board item only adds another instance of the same screen.)
- **Where:** right-click a screen/component (its board item or an instance) → **Copy as new widget**.
- **Labels:** **Copy as new widget**; dialog title **New Copy <Name>**, name field, **Class name**, **Path**,
  **Cancel** / **Submit**.
- **How to use:** right-click → **Copy as new widget** → name it → **Submit**. The copy appears at the pointer.
- **Options:** class name.
- **Limits and rules:** enabled only for class-based components/screens; the new file is created in `lib/`.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/menus/widget_context_menu.dart:105-112`;
  `packages/designer/lib/src/design/common_design.dart:227-260` (`:234`, `:248`).
- **Old docs:** missing (old docs only mention Alt-drag/copy-paste, which create instances, not copies).
- **Screenshot value:** low.

### Remove from board vs Delete
- **What it does:** **Remove** takes an item off the board (the screen/component file stays). Deleting removes
  the class or file from the project.
- **Where:** right-click a board item → **Remove** (or `Delete`/`Backspace`). Delete: **Widgets** panel →
  right-click → **Delete** (or **Delete N widgets**); **Files** panel → right-click → **Remove file**.
- **Labels:** **Remove**; **Delete**; **Remove file** / **Remove N files**; confirm **Are you sure you want to
  delete "<file>"?**; references dialog **Removing <Name> will affect the following references** with
  **Cancel** / **Remove**; **Cannot delete file** for `lib/main.dart`.
- **How to use:** see Where.
- **Options:** none.
- **Limits and rules:** deleting a screen/component that is used elsewhere lists the references first. If the
  class is the only widget in its file, the file is deleted. Stale routes are removed after deleting files.
  `lib/main.dart` can't be deleted. Undo works for board removal and class deletion.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/menus/widget_context_menu.dart:43-47`;
  `packages/core/lib/src/actions/general_actions.dart:14-16`, `:20-98`; `packages/core/lib/src/actions/block_actions.dart:57-85`, `:87-100`, `:202-235`;
  `lib/project/panels/widgets_panel/widgets_context_menu.dart:38`; `lib/project/panels/files_panel/file_context_menu.dart:61`;
  `packages/core/lib/src/file_system/actions/file_actions.dart:124`, `:130`, `:151`, `:207`;
  `packages/core/lib/src/widgets/declaration_references_dialog.dart:61-62`.
- **Old docs:** `docs/ui/screens.md` ("Removing Screens"): accurate (says "Files library"; the menu label is
  **Remove file**). `docs/ui/components.md` ("Deleting Components"): partly outdated (label **Remove file**; the
  Widgets panel **Delete** is the simpler path).
- **Screenshot value:** low.

### Widgets panel (your pages and components)
- **What it does:** Lists every public screen and component in `lib/`, with live previews.
- **Where:** left side bar → **Widgets** icon.
- **Labels:** header **Widgets**; search box; toggle **Switch to grid view** / **Switch to list view**; sliding
  buttons **Page** and **Component**; each tile shows the preview, class name and file name. Right-click:
  **Open in Editor**, **Rename**, **Delete** (shows the `Del`/`⌫` key). Mobile layout uses tabs **All**, **Pages**,
  **Components** and hint **Search project...**.
- **How to use:** click to select; double-click to open on its own; drag onto a board; right-click for actions.
  Searching matches names and file paths and ignores the Page/Component filter.
- **Options:** list or grid view.
- **Limits and rules:** screens are classes containing a Scaffold; everything else is a component. Private
  classes are not listed. `Delete` key and undo/redo work inside the panel.
- **Gating:** none found.
- **Code refs:** `lib/project/side_bar.dart:43`; `lib/project/panels/left_panel.dart:36`;
  `lib/project/panels/widgets_panel/widgets_panel.dart:15`, `:47-49`, `:91-96`, `:164`, `:301`, `:313-337`, `:345-347`;
  `lib/project/panels/widgets_panel/preview_tiles.dart:32-38`, `:74-79`;
  `lib/project/panels/widgets_panel/widgets_context_menu.dart:32`, `:35`, `:38`.
- **Old docs:** `docs/ui/widget-panel.md`: mostly accurate (tab labels are **Page** / **Component** on desktop;
  misses **Open in Editor**, search and grid/list).
- **3.13 (dev) changes:** the side bar's **Widgets** becomes **Library** (`nowa(dev) lib/project/side_bar.dart:51`,
  `nowa(dev) lib/project/panels/left_panel.dart:35`).
- **Screenshot value:** high: the Widgets panel with Page selected.

### Open in new tab (a screen or component on its own)
- **What it does:** Opens one screen or component alone on a dark, gridded canvas, for focused editing. The
  board chip turns into a dimmed **Board** (click to go back); if the file holds several widgets, a second chip
  lets you switch between them.
- **Where:** item title → **Open in new tab** icon; Details → **Open in New Tab** icon next to the name; select
  and press `Ctrl/Cmd+I`; double-click a tile in the **Widgets** panel (or right-click → **Open in Editor**).
- **Labels:** **Open in new tab** (title), **Open in New Tab** (Details); loading text **Loading dependencies...**;
  floating **Outline** box at the top left (open by default), **Variables** and **Details** at the top right.
- **How to use:** use any entry above; edit; click the **Board** chip or press `Ctrl/Cmd+B` to return.
- **Options:** none.
- **Limits and rules:** the root widget can't be moved or deleted; **X**/**Y** fields are hidden; the toolbar has
  no **Screen** tool. The view's size is the class's design size (default 400×400 if none). There is no tab bar
  in design mode; tabs only show in code mode.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/panels/canvas_titles.dart:263-275`;
  `packages/core/lib/src/widgets/nowa_widgets.dart:161-163`; `packages/designer/lib/src/details/name_group.dart:113-117`;
  `packages/designer/lib/src/designer_setup.dart:50`, `:179-195`; `packages/designer/lib/src/actions/designer_actions.dart:298-313`;
  `packages/designer/lib/src/widgets/widget_designer.dart:34`, `:49`, `:70`; `packages/designer/lib/src/board/single_widget_canvas.dart:10`;
  `packages/nowa_ui/lib/top_bar/top_bar_view.dart:330`, `:455`; `lib/project/panels/vibe_designer.dart:36-43`.
- **Old docs:** `docs/ui/screens.md` ("Open in a new tab"): accurate in name only; `docs/ui/boards.mdx` calls this a
  "Widgets Board" (wrong term).
- **3.13 (dev) changes:** a component's own view also shows its `@Preview` variants, with **Add to board**
  (`nowa(dev) packages/designer/lib/src/widgets/widget_designer.dart:74`,
  `nowa(dev) packages/designer/lib/src/actions/add_variant_to_board.dart:11`).
- **Screenshot value:** high: a screen opened on its own with the floating Outline/Details.

### Create component
- **What it does:** Turns the selected widget (with everything inside it) into a reusable component: a new class in
  a new file, and the original is replaced by an instance with the same layout.
- **Where:** right-click a widget → **Create component**; or select it → **Details** → widgets icon next to the
  name (tooltip **Create a component**, shown for widgets that aren't already your own class).
- **Labels:** **Create component**, **Create a component**; dialog title **New Component from <WidgetName>**,
  name field, **Class name**, **Path**, **Cancel** / **Submit**.
- **How to use:**
  1. Select the widget. For several widgets, group them first (`Ctrl/Cmd+G`): only the first selected widget is
     used.
  2. Right-click → **Create component**.
  3. Name it, click **Submit**.
- **Options:** class name.
- **Limits and rules:** the file is created in `lib/` (a folder typed in **Path** is not used). The component's
  design size is set to the widget's current size. If the widget contains a Scaffold (Screen wrapper), the new
  class is a screen. Undo removes the class and file.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/menus/widget_context_menu.dart:92-97`;
  `packages/designer/lib/src/details/name_group.dart:92-98`; `packages/designer/lib/src/design/common_design.dart:132-180`;
  `packages/designer/lib/src/actions/designer_actions.dart:10-44`; `packages/core/lib/src/file_system/actions/file_actions.dart:266-280`.
- **Old docs:** `docs/ui/components.md` ("How to Create a Component"): partly outdated: says click **Create**; the
  button is **Submit** and the dialog title is "New Component from …".
- **Screenshot value:** high: the dialog.

### Variables box (Params, Variables, Functions) for components and screens
- **What it does:** Lists and creates the selected screen/component's parameters (**Params**: values each
  instance can set), state variables (**Variables**) and functions. Adding a state variable automatically turns
  the class into a stateful widget. (Details of variables/functions belong to the logic area.)
- **Where:** floating **Variables** box above **Details** (collapsed by default; click to expand). Shows the
  selected screen/component's class; with nothing selected, global state; several selected →
  **Multiple widgets selected**.
- **Labels:** class name, **Params** (+), **Variables** (+), **Functions** (+, with **Add Function**,
  **InitState Function**, **Dispose Function**).
- **How to use:** select a component on the board → expand **Variables** → + next to **Params** creates `param`
  (type `String?`) ready to rename; click the type icon to change the type; bind widget fields to it.
- **Options:** type per parameter/variable.
- **Limits and rules:** global variables need a main file managed by Nowa (**Main file must be managed by Nowa to
  use global variables**).
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/designer_setup.dart:208-214`; `packages/designer/lib/src/panels/variables_panel.dart:49-92`;
  `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:278-300`, `:392`, `:444`, `:496-528`;
  `packages/core/lib/src/interpreter/widget_declarations.dart:407-416`.
- **Old docs:** `docs/ui/components.md` ("Adding Variables to a Component"): partly outdated (no mention of the
  Variables box or Params).
- **Screenshot value:** medium.

### Component instances (use, set values, edit, Detach)
- **What it does:** Each use of a component is an instance. Editing the component changes every instance;
  each instance can have its own parameter values; **Detach** turns an instance into plain widgets.
- **Where:** place from the **Widgets** panel (**Component**), the widget picker (**Components** tab), copy/paste,
  or `Alt`/`Option`-drag. Detach: right-click → **Detach**.
- **Labels:** **Detach** (disabled when the widget is not a component instance); components show in purple in
  **Outline**.
- **How to use:**
  1. Select an instance inside a screen: Details shows its parameters; set values for this instance.
  2. To edit the component itself, select its board item (click the title) or open it on its own; changes apply
     to all instances (wrappers added inside the component too).
  3. Right-click an instance → **Detach** to break the link.
- **Options:** per-instance parameter values.
- **Limits and rules:** selecting a component's board item shows both the board item's parameter values and the
  component's own root widget. A component can't be dropped into a board item of the same component. Board items
  keep their own parameter values when played.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/widget_details.dart:32-64`, `:185-187`;
  `packages/core/lib/src/fields/block_field.dart:757-764`; `packages/designer/lib/src/menus/widget_context_menu.dart:98-103`;
  `packages/designer/lib/src/design/common_design.dart:182-192`; `packages/designer/lib/src/design_experience/move_tool.dart:265-271`;
  `packages/nowa_ui/lib/outline/outline_view.dart:348`; `packages/core/lib/src/widgets/widget_picker.dart:191`.
- **Old docs:** `docs/ui/components.md`: partly outdated. "You cannot edit a component's design while it's
  inside a screen" is not confirmed by the code (see Open questions); instancing and Detach parts are accurate.
- **Screenshot value:** medium: an instance selected inside a screen with its parameter fields.

### Selecting
- **What it does:** Selects widgets and board items.
- **Where:** on the board, **Outline**, and the breadcrumbs at the top of **Details**.
- **Labels:** breadcrumbs (owner screen/component name or **..**, parent, selected); multi-selection header
  **Widget x N**.
- **How to use:**
  - Click: selects the outermost widget under the pointer at the current depth (clicking a screen selects its
    top-level content, not the screen; click the screen's title to select the screen).
  - Double-click: goes one level deeper (and starts text editing on a selected Text).
  - `Ctrl/Cmd`+click: selects the deepest widget under the pointer.
  - `Shift`+click: adds to the selection.
  - Drag on empty space: box selection (inside a screen it selects the children of the first Stack; outside,
    whole board items). `Shift` toggles items in and out.
  - `Ctrl/Cmd+A`: selects all siblings of the selected widget, or all board items.
  - Click empty board space to clear.
- **Options:** none.
- **Limits and rules:** an empty screen can be selected by clicking it. Box selection is undoable. No `Esc` to
  clear.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/selection_manager.dart:18-34`, `:50-61`, `:75-108`;
  `packages/designer/lib/src/design_experience/designer_board_controller.dart:88-125`, `:227-229`;
  `packages/designer/lib/src/design_experience/select_tool.dart:15`, `:56-70`, `:73-91`;
  `packages/designer/lib/src/designer_setup.dart:49`; `packages/designer/lib/src/details/widget_details.dart:312-357`;
  `packages/designer/lib/src/details/name_group.dart:19`.
- **Old docs:** missing as a topic.
- **Screenshot value:** medium: box selection; Details breadcrumbs.

### Moving widgets
- **What it does:** Moves widgets on the board, inside containers, or out to the board.
- **Where:** on the board.
- **Labels:** none.
- **How to use:** drag a selected or hovered widget. Hold `Shift` to keep it on one axis. Hold `Alt` (`Option`) to
  drag a copy instead (toggle mid-drag). Arrow keys nudge free-positioned widgets by 1 px (`Shift`: 10 px); in a
  Row/Column, the arrow along the layout direction moves the widget one place earlier/later.
- **Options:** none.
- **Limits and rules:** where it lands follows the drop rules. Screens can't be moved inside other items; the root
  of a screen/component opened on its own can't move; the playing item can't move. Positions round to whole
  pixels. Undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/designer_board_controller.dart:187-225`;
  `packages/designer/lib/src/design_experience/move_tool.dart:116-183`, `:141`, `:247-274`;
  `packages/designer/lib/src/design/order_design.dart:88-113`; `packages/designer/lib/src/designer_setup.dart:23-46`;
  `packages/core/lib/src/layout/layout.dart:5-12`.
- **Old docs:** `docs/ui/components.md` / `docs/shortcuts.md` mention Alt-drag duplicate: accurate.
- **Screenshot value:** low (video better).

### Drop rules (where a dragged widget lands)
- **What it does:** Decides the container and position for a dragged or newly placed widget, based on the deepest
  container under the pointer (within 10 px of its edges).
- **Where:** while dragging on the board; the target container gets an outline or preview.
- **Labels:** none.
- **How to use / rules as the user sees them:**
  - **Empty board space:** becomes its own board item; snaps to other items.
  - **Stack / Group (free layout):** goes on top of the other children at the drop position (Positioned),
    snapping to the group's edges/center and siblings; the group is outlined in purple.
  - **Row, Column, Wrap, List View (ordered):** inserted between children at the pointer position; an orange box
    shows the preview spot. No free positioning.
  - **Screen (Scaffold):** a single App Bar, Floating Action Button, Bottom Navigation Bar or Drawer drops into
    that slot; anything else goes into the body.
  - **App Bar:** three zones: left (leading), middle (title), right (actions).
  - **Padding:** passes the drop to its child.
  - **Text, Tab Bar, Tab Bar View and other single widgets:** never take children; the drop goes to the container
    behind them.
- **Limits and rules:** screens always stay board items; a component can't be dropped into itself.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/drag_rule.dart:9-29`, `:79-91`, `:163-215`,
  `:217-277`, `:279-391` (`:299`, `:311`), `:393-436` (`:401`), `:438-511`;
  `packages/designer/lib/src/design_experience/move_tool.dart:169`, `:255-274`, `:302`, `:365`.
- **Old docs:** missing (`docs/ui/layout/rows-and-columns.md` covers reordering by drag only).
- **Screenshot value:** medium: dragging into a Column (preview box) vs into a Stack (guides).

### Resizing
- **What it does:** Resizes widgets and board items with handles.
- **Where:** handles on the selection (corners and sides; the cursor changes to a resize arrow).
- **Labels:** none.
- **How to use:** drag a handle. Hold `Shift` to keep proportions; hold `Alt` to resize from the center. With
  several widgets selected, they scale together.
- **Options:** none.
- **Limits and rules:** snapping applies only without `Shift`/`Alt`, and only to the edge being dragged. No
  handles for: a single Text being edited, widgets whose parent sets their size (e.g. inside a Padding or
  Container), the playing item. Dragging past the opposite edge resets to 100×100. Undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/resize_tool.dart:47-68`, `:75-177`, `:209-236`;
  `packages/designer/lib/src/design_experience/designer_board_controller.dart:288-318`;
  `packages/core/lib/src/widgets/selection_overlay.dart:209-263`, `:353-368`; `packages/core/lib/src/layout/layout.dart:220`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Snapping and guides
- **What it does:** While moving or resizing, edges and centers snap to nearby items and purple guide lines show
  the alignment.
- **Where:** board items snap to other board items; widgets in a Stack/Group snap to the group's bounds and their
  siblings.
- **Labels:** none (guides #9975FF, the matched item is outlined).
- **How to use:** just drag; release to accept.
- **Options:** none; no setting to turn it off. Holding `Shift`/`Alt` while resizing skips snapping.
- **Limits and rules:** snap distance 10 screen pixels; targets within 750 screen pixels; pairs: center to center,
  start to start, end to end, start to end. Resizing snaps only the dragged edge (3.12.5). No grid snapping, no
  align/distribute buttons for multi-selection.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/snap.dart:13-19`, `:38-41`, `:109-140`, `:142-179`;
  `packages/designer/lib/src/design_experience/drag_rule.dart:189-204`, `:245-263`;
  `packages/designer/lib/src/design_experience/resize_tool.dart:55-63`.
- **Old docs:** missing (changelog 3.12.5 only).
- **3.13 (dev) changes:** guide offset fixes only.
- **Screenshot value:** medium: guides while moving a widget in a stack.

### Editing text on the canvas
- **What it does:** Types text directly on the board.
- **Where:** double-click a selected Text (plain, not rich text), Markdown or Html widget; also opens right after
  placing a Text with the Text tool.
- **Labels:** none.
- **How to use:** double-click, type, then press `Esc` or click away to save.
- **Options:** none.
- **Limits and rules:** rich text (Text.rich) is edited in Details instead. Undoable (**edit text**).
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/text_custom_view.dart:15-38`, `:109-145`;
  `packages/designer/lib/src/design_experience/designer_board_controller.dart:122`;
  `packages/designer/lib/src/design_experience/place_board.dart:179`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Copy / Cut / Paste
- **What it does:** Copies widgets or board items to the system clipboard (as code), cuts them, and pastes them
  back. Paste also accepts images and text from other apps.
- **Where:** `Ctrl/Cmd+C`, `Ctrl/Cmd+X`, `Ctrl/Cmd+V`; right-click a widget → **Copy** / **Cut**; right-click empty
  board → **Paste**.
- **Labels:** **Copy**, **Cut**, **Paste**.
- **How to use:** select, copy, move the pointer where you want it, paste. With a widget selected, the paste goes
  into that widget's parent.
- **Options:** none.
- **Limits and rules:** pasting an image (or an image file on desktop) saves it to the assets folder as
  `pasted_image_<id>.<ext>` and places an Image widget (cover fit); JPEG, PNG, WebP and BMP are recognized. A
  pasted `http…` link becomes an image widget; any other text becomes a Text widget. Paste/copy are disabled while
  typing in a field. Pasting a screen board item adds another instance of the same screen.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design/copy_paste.dart:44-170` (`:62-64`, `:88`, `:115`, `:128`, `:153`, `:159`);
  `packages/designer/lib/src/design/nowa_copy_paste.dart:86-112`; `packages/designer/lib/src/actions/designer_actions.dart:115-178`;
  `lib/setup_general_actions.dart:30-32`; `packages/designer/lib/src/menus/board_context_menu.dart:20`.
- **Old docs:** `docs/ui/components.md` (instances by copy/paste): accurate. `docs/shortcuts.md`: wrong (lists Paste
  as `Ctrl/Cmd+Z`).
- **Screenshot value:** low.

### Remove (widgets)
- **What it does:** Deletes the selected widgets (or removes board items from the board).
- **Where:** `Delete` (Windows/Linux) or `Backspace` (macOS); right-click → **Remove**.
- **Labels:** **Remove**.
- **How to use:** select, press the key.
- **Limits and rules:** ignored while typing in a field; the root of a screen/component opened on its own can't be
  removed. Undoable.
- **Gating:** none found.
- **Code refs:** `lib/setup_general_actions.dart:41`; `packages/core/lib/src/inputs.dart:11-13`;
  `packages/core/lib/src/actions/general_actions.dart:88-98`; `packages/designer/lib/src/menus/widget_context_menu.dart:43-47`.
- **Old docs:** none dedicated.
- **Screenshot value:** low.

### Replace with...
- **What it does:** Swaps the selected widget for another widget type, moving its children over.
- **Where:** right-click a widget → **Replace with...**; also in a Group section's … menu.
- **Labels:** **Replace with...** (opens the widget picker).
- **How to use:** right-click → **Replace with...** → pick a widget.
- **Limits and rules:** uses the first selected widget; undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/menus/widget_context_menu.dart:48-66`;
  `packages/designer/lib/src/design/widget_design.dart:8-30`; `packages/designer/lib/src/details/group_details.dart:86-97`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Group / Ungroup
- **What it does:** **Group** puts the selected widgets into a new container. Inside a Row/Column/Stack it creates
  a container of the same kind with the same settings; on the board (or when the widgets don't share a parent
  list) it creates a Stack ("Group"). If the first selected widget is a plain box (e.g. a Container with no
  child) that encloses the others, it becomes the group's background wrapper. **Ungroup** moves the children out
  and removes the group (keeps an empty widget if the group had wrappers).
- **Where:** `Ctrl/Cmd+G` or right-click → **Group**; right-click a single group → **Ungroup**. The widget picker
  also offers an empty **Group** widget.
- **Labels:** **Group**, **Ungroup**.
- **How to use:** select widgets → `Ctrl/Cmd+G`. Then set Stack/Row/Column in the **Group** section.
- **Options:** see Group section.
- **Limits and rules:** **Ungroup** shows only when exactly one Stack/Row/Column/Wrap is selected. `Ctrl/Cmd+G`
  always groups (on a group it nests it in a new one); it does not ungroup. Undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design/common_design.dart:25-130` (`:58-67`, `:69-81`);
  `packages/designer/lib/src/actions/designer_actions.dart:46-113`; `packages/designer/lib/src/menus/widget_context_menu.dart:68-75`;
  `packages/designer/lib/src/designer_setup.dart:20`; `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:244-251`;
  `packages/core/lib/src/interpreter/type.dart:67-68`.
- **Old docs:** `docs/ui/layout/groups.mdx`: partly wrong ("use Ctrl/Cmd+G again" to ungroup does not ungroup);
  the background-container tip in `docs/ui/layout/rows-and-columns.md` is accurate.
- **Screenshot value:** medium.

### Move Up / Move Down / Move To Top / Move To Bottom (reorder)
- **What it does:** Changes a widget's order among its siblings (for a Stack this is the stacking order; for a
  Row/Column, the position); for board items, the board order.
- **Where:** right-click → **Move Up**, **Move Down**, **Move To Top**, **Move To Bottom**; `Ctrl/Cmd+[` (one
  earlier) and `Ctrl/Cmd+]` (one later); arrows inside a Row/Column; drag in **Outline**.
- **Labels:** **Move Up**, **Move Down**, **Move To Top**, **Move To Bottom**.
- **How to use:** select → right-click → pick an entry.
- **Limits and rules:** "Up/Top" means earlier in the parent's list (further back in a Stack); disabled at the ends
  of the list or when the parent has no children list. Undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/menus/widget_context_menu.dart:78-91`;
  `packages/designer/lib/src/design/order_design.dart:23-86`; `packages/designer/lib/src/actions/widget_actions.dart:52-89`;
  `packages/designer/lib/src/designer_setup.dart:21-22`.
- **Old docs:** `docs/shortcuts.md` ("Move the widget one layer up/down"): accurate.
- **3.13 (dev) changes:** entries renamed **Bring to front**, **Bring forward**, **Send backward**, **Send to back**
  (later = forward), plus `Ctrl/Cmd+Alt+]`/`[` all the way
  (`nowa(dev) packages/designer/lib/src/menus/widget_context_menu.dart:45-48`,
  `nowa(dev) packages/designer/lib/src/designer_setup.dart:24`).
- **Screenshot value:** low.

### Add Wrapper (wrap and unwrap)
- **What it does:** Wraps a widget in a single-child widget (a "wrapper") such as Padding, Container, Scroll View,
  Screen, Safe Area, Align, Opacity, Gesture Detector. Wrappers stack on the widget and each gets its own section
  in Details. ("Unwrap" = remove the wrapper.)
- **Where:** select a widget → **Details** → **Add Wrapper** (bottom). Remove/reorder: hover a wrapper section →
  … menu → **Remove**; drag the section's handle to reorder.
- **Labels:** **Add Wrapper**; picker hint **Search for a wrapper**; wrapper names include **Padding**,
  **Visibility**, **Gesture Detector**, **Opacity**, **Clip radius**, **Container**, **Transform**,
  **Fitted Box**, **Scroll View**, **Align**, **Fractionally Sized Box**, **Intrinsic Height**,
  **Intrinsic Width**, **Data Builder**, **Constrained Box**, **Material**, **Drawer**, **Ink Well**,
  **Interactive Viewer**, **Safe Area**, **Color Filter**, **Text Direction**, **Default Text Style**, **Form**,
  **Screen**, **Notifier Builder**, **Aspect Ratio**, **Badge**, **Tooltip**, **Dismissible**,
  **Refresh Indicator**, **AnimatedContainer**. Section … menu: **Open in new tab** (your classes), constructor
  choices (e.g. `Text()` / `Text.rich()`), **Remove**.
- **How to use:** select → **Add Wrapper** → search → pick. To unwrap, open the wrapper section's … menu →
  **Remove**.
- **Limits and rules:** shown only for a single selected widget that can be wrapped. A Group's **Padding** field
  adds a Padding wrapper when you type a value. **Outline** shows wrappers behind a layers icon. Undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/widget_details.dart:66-113`, `:145-148`, `:188-200`;
  `packages/core/lib/src/wrappers_to_add.dart:12-180`; `packages/designer/lib/src/details/wrapper_details.dart:54-70`;
  `packages/core/lib/src/fields/class_field.dart:337`, `:377-422`, `:425`; `packages/core/lib/src/interpreter/widget/widget_blocks.dart:291-304`.
- **Old docs:** `docs/ui/wrappers/*` (catalog researcher judges the list). The **Screen** wrapper note in
  `docs/ui/screens.md` is accurate.
- **Screenshot value:** medium.

### Export as image...
- **What it does:** Saves the selected widget or screen as an image file.
- **Where:** right-click → **Export as image...** (also for viewers).
- **Labels:** dialog **Export <Name>**; **Format** (**PNG**, **JPG**); **Size** (**1x**, **2x**, **3x**, **4x** or a
  number); **Transparent background** (PNG only); **Resolution** (`W × H px`); **Cancel** / **Export**; save dialog
  **Export image**.
- **How to use:** right-click → **Export as image...** → choose format/scale → **Export** → choose where to save.
- **Options:** defaults PNG, 2x, transparent on.
- **Limits and rules:** scale 0.1–20; max 8192 px per side (shows **…, too large** and disables Export); errors
  **The widget has no size**, **The widget is no longer on the board**.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/widgets/export_image_dialog.dart:13`, `:15-25`, `:75`, `:95-176`, `:180-181`;
  `packages/designer/lib/src/menus/widget_context_menu.dart:29`, `:113`.
- **Old docs:** missing.
- **Screenshot value:** medium.

### Group section (Stack / Row / Column switch, Padding, Test list)
- **What it does:** For a selected group (Stack, Row, Column, Wrap), switches its layout type and shows its
  layout fields.
- **Where:** select a group (or a screen, whose body is usually a Stack) → **Details** → **Group** section.
- **Labels:** header **Group** with … (**Replace with...**) and three icon buttons: stack icon (Stack), right arrow
  (Row), down arrow (Column); **Padding** (horizontal and vertical fields, **Individual padding** toggles
  left/top/right/bottom); for children driven by a list variable: **Test <Type>** (popup **Copies** and a sample
  value), **Edit Test**, **Clear**. Stack fields come from the widget (**Alignment**, **Fit**, **Text
  Direction**, **Clip Behavior**, **Children**).
- **How to use:** click the right or down arrow to turn a Stack into a Row or Column (children are ordered by
  their current position and the **Gap** is taken from their current spacing); click the stack icon to go back.
- **Limits and rules:** the icon buttons have no tooltips. Switching is undoable.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/group_details.dart:44-66`, `:78-123`, `:136-157`, `:243-298`;
  `packages/designer/lib/src/design/group_design.dart:8-24`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:290-315`;
  `packages/designer/lib/src/details/inline_wrapper_fields.dart:46-50`, `:132`.
- **Old docs:** `docs/ui/layout/groups.mdx` (Group Properties): partly outdated (misses the switch buttons and
  Padding). `docs/tutorials-template/design-responsive.md` "group orientation [↓] Column or [→] Row": accurate in
  spirit (legacy, D4).
- **Screenshot value:** high: the Group section header with the three layout buttons.

### Rows and columns (Alignment, Spacing, Gap)
- **What it does:** Arranges children in a line, controls alignment, spacing and how much space the row/column
  takes.
- **Where:** select a Row or Column → **Details** → **Group** section.
- **Labels:** **Alignment** (3×3 box), **Main Axis Size**, **Spacing** (**Fixed**, **Between**, **Around**,
  **Evenly**), **Gap** (only when Spacing is **Fixed**), **Children**. Mixed selections show **Mixed**.
- **How to use:** click a cell in **Alignment**; choose **Spacing**; type a **Gap**.
- **Options:** with **Fixed** spacing the box has 9 positions (main + cross); with Between/Around/Evenly only the
  3 cross-axis positions apply. **Gap** minimum 0.
- **Limits and rules:** reorder children by dragging on the board, in **Outline**, or in **Children**.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/flex_field.dart:11-52`, `:55-140`, `:382-446`.
- **Old docs:** `docs/ui/layout/rows-and-columns.md`: mostly accurate (misses **Gap** and **Main Axis Size**; calls
  sizing "Resizing", which lives in the **Layout** section).
- **Screenshot value:** high.

### Stacks and constraints (child of a Group/Stack)
- **What it does:** A widget inside a Stack is positioned by distances to the stack's edges. Constraints decide
  which edges it sticks to when the stack (screen) size changes.
- **Where:** select a widget inside a Stack → **Details** → **Layout** section.
- **Labels:** **L**, **T**, **R**, **B**, **W**, **H** (fields grey out when not set), width/height mode
  (**Fixed**/**Auto**), a constraints box (four bars and a center **+**), horizontal dropdown **Left**, **Right**,
  **Left and right**, **Center**; vertical dropdown **Top**, **Bottom**, **Top and bottom**, **Center**.
- **How to use:** pick constraints from the dropdowns, or click a bar in the box (`Shift`+click a second side to pin
  both); the center + clears constraints (centered).
- **Options:** pinning both sides stretches the widget with the stack (its W/H is then computed).
- **Limits and rules:** works with multi-selection.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/positioned_details.dart:26-89`, `:93-193`, `:197-279`;
  `packages/core/lib/src/layout/positioned_helper.dart` (constraint math); `packages/core/lib/src/layout/layout.dart:52-59`.
- **Old docs:** `docs/ui/layout/constrains.md`: mostly accurate (labels are **Left and right** / **Top and bottom**;
  misses the L/T/R/B fields and the box).
- **Screenshot value:** high.

### Layout section (sizing: Fixed, Auto, Expand)
- **What it does:** Sets a widget's width and height behavior.
- **Where:** select a widget → **Details** → **Layout** (top section).
- **Labels:** **Layout** (+ adds a size box when the widget has none), **W**, **H**, and per axis a mode dropdown
  **Fixed**, **Auto**, **Expand**. Board items also show **X**, **Y**.
- **How to use:** pick a mode per axis or type a size.
- **Options:**
  - **Fixed**: keeps the typed size (switching to Fixed fills in the current size).
  - **Auto**: sizes to the content (offered only when the widget has a natural size; not for Text Field width).
  - **Expand**: in a Row/Column: along the row/column it takes the remaining space (flex 1), across it fills the
    full width/height. Not offered along a Scroll View's scroll direction.
- **Limits and rules:** which section you get depends on the parent: board item (X/Y/W/H), Stack child
  (constraints), Row/Column/Wrap child (Fixed/Auto/Expand), List View child (size box). Widgets in single-child
  parents have no Layout fields. The dropdown hides when only one mode applies.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/layout_details.dart:15-80`, `:82-133`;
  `packages/designer/lib/src/details/size_fields.dart:5-132`, `:154`, `:162`, `:227-283`;
  `packages/designer/lib/src/details/flex_size_field.dart:6-137` (`:63`, `:66`, `:116`, `:119`);
  `packages/core/lib/src/layout/layout.dart:52-66`, `:388`; `packages/core/lib/src/layout/flex_layout.dart:76-108`.
- **Old docs:** `docs/ui/layout/rows-and-columns.md` ("Resizing"): accurate modes (Fixed/Auto/Expand), wrong
  section name.
- **Screenshot value:** high: the Layout section with the mode dropdown open.

### Scrolling and wrapping
- **What it does:** Makes content scroll or wrap onto new lines.
- **Where:** **Add Wrapper** → **Scroll View**; widget picker → **List View**, **Grid View**, **Page View**, **Wrap**
  (catalog details).
- **Labels:** **Scroll View**, **List View**, **Wrap**.
- **How to use:** select a Column (or any widget) → **Add Wrapper** → **Scroll View**.
- **Limits and rules:** inside a Scroll View, children can't **Expand** along the scroll direction. Wrap and List
  View children are dropped in order like a Column; a List View child gets a size box.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/wrappers_to_add.dart:56-60`; `packages/designer/lib/src/details/size_fields.dart:5-40`;
  `packages/designer/lib/src/design_experience/drag_rule.dart:9-22`; `packages/core/lib/src/layout/layout.dart:57-58`.
- **Old docs:** `docs/ui/wrappers/scrollview.md` (catalog).
- **Screenshot value:** low.

### Responsive design
- **What it does:** There is no breakpoint feature. Screens adapt through Row/Column layouts with
  **Expand**/**Auto**/**Fixed**, **Spacing**, Stack constraints (**Left and right**, **Top and bottom**,
  **Center**), and you check them by changing the screen's **Size** preset (phones, **MacBook Pro**,
  **1920x1080**) or resizing the screen item on the board.
- **Where:** see the linked features.
- **Labels:** see above.
- **Limits and rules:** no breakpoints, no per-device overrides found in the designer.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/screen_sizes.dart:12-21`; `packages/designer/lib/src/details/positioned_details.dart:97-152`;
  `packages/designer/lib/src/details/flex_size_field.dart:6-137` (no breakpoint code found by search).
- **Old docs:** `docs/tutorials-template/design-responsive.md`: partly outdated labels (legacy, moves untouched,
  D4); `docs/ui/layout/intro-layout.md`: accurate but thin.
- **Screenshot value:** medium: one screen at two Size presets.

### Outline panel
- **What it does:** Shows the widget tree of everything on the board (or of the widget opened on its own), and lets
  you select, find, reorder and act on widgets.
- **Where:** on a board: left side bar → **Outline** (layers icon). In a screen/component opened on its own: a
  floating **Outline** box at the top left of the canvas (the side bar icon is hidden there).
- **Labels:** header **Outline**; rows with widget icons; components in purple; home icon on the home screen;
  loops (repeat icon), conditions (split icon), branches with an eye: **Shown by the condition**,
  **Click to show this branch**, **Shown on click. Click again to let the condition decide**; layers icon whose
  tooltip lists the wrappers (click to unfold them as rows). Error: **Cannot find widget <name> on the board.**
- **How to use:**
  - Click a row to select (`Shift`+click to add); double-click to zoom the board to it; right-click for the same
    menu as on the board.
  - Drag a row and drop it above, inside or below another row (an orange line or box shows where); only valid
    places accept it.
  - Click a branch row to force that branch to show on the board; click again to let the condition decide.
  - Use the chevrons to expand or collapse.
- **Options:** none.
- **Limits and rules:** rows under a selected row are lightly tinted; inactive branches are dimmed.
- **Gating:** none found.
- **Code refs:** `lib/project/side_bar.dart:66-70`, `:129`; `lib/project/panels/left_panel.dart:43`;
  `packages/designer/lib/src/designer_setup.dart:179-195`; `packages/core/lib/src/panels/panel.dart:238-245`;
  `packages/designer/lib/src/panels/outline_panel.dart:137-196` (`:149`);
  `packages/designer/lib/src/panels/outline_mapper.dart:65-97`; `packages/designer/lib/src/panels/outline_drop.dart:14-101`;
  `packages/nowa_ui/lib/outline/outline_view.dart:210`, `:297-317`, `:348`, `:367`, `:425-450`, `:456`, `:560-575`.
- **Old docs:** `docs/ui/outline.md`: partly outdated (location changed in 3.9 to the left side bar; the right-click
  menu has no "duplicate"; misses drag-to-reorder, wrappers, branches and loops).
- **3.13 (dev) changes:** same features on a new tree component and menu system (minor).
- **Screenshot value:** high: Outline with a component, home screen and a condition branch.

### Device preview (Play Settings, Device Size, Full Screen)
- **What it does:** Shows the app inside a device frame with a chosen device model, orientation or a free size.
- **Where:** on the shared preview page (`app.nowa.dev/preview/…` opened on a desktop-width browser) and when the
  AI agent plays the app in a screen/component's own view. (The Run preview's phone/tablet/fullscreen switch is the
  shipping area.)
- **Labels:** top bar buttons **Share App**, **Full Screen**, **Device Settings**, and for project owners/editors
  **Restart** and **Stop** (`Esc`). **Device Settings** opens **Play Settings**: **Free Size**,
  **Show mockup frame**, **Orientation** (only for devices that rotate), **Device Size** (button with the device
  name) which opens **Device Size** with tabs per platform (iOS, android, macOS, windows, linux) and **Custom**
  (screen **Width**, **Height**, **Pixel ratio**; **Safe areas** **Left**, **Top**, **Right**, **Bottom**).
  **Full Screen** opens a full-screen preview with a **Device** panel (**Free Size**, **Frame visibility**,
  **Model**, **Orientation**). Owners/editors may see warnings (**Show Play Warnings**): **Custom code can't be
  shown**, **Dynamic packages can't be shown**, **Unattached global states** (**Attach all**).
- **How to use:** open the preview link → **Device Settings** → pick a device or **Free Size**; toggle the frame;
  rotate.
- **Options:** default device iPhone 13; settings remembered per project in the browser.
- **Limits and rules:** no dark-mode or locale switch (those device-preview sections are disabled in code).
- **Gating:** **Restart**/**Stop** and warnings only for owners and editors.
- **Code refs:** `lib/project/preview_page.dart:24`; `packages/ai/lib/src/tools/play_app_tool.dart:58`;
  `packages/designer/lib/src/play_mode/play_mode.dart:104`, `:129-140`, `:164-210`;
  `packages/designer/lib/src/play_mode/board_play_controller.dart:137`, `:149`, `:161`, `:173-190`;
  `packages/designer/lib/src/play_mode/play_mode_permissions.dart:6-16`;
  `packages/designer/lib/src/play_mode/play_mode_settings.dart:40`, `:47`, `:54`, `:67`, `:82`, `:131`, `:150`;
  `packages/designer/lib/src/play_mode/play_mode_warning.dart:88`, `:95-152`;
  `packages/device_preview/lib/src/device_preview.dart:110-119`;
  `packages/device_preview/lib/src/views/tool_panel/sections/device.dart:62-170`;
  `packages/device_frame/lib/src/devices/devices.dart:27-33`.
- **Old docs:** missing.
- **Screenshot value:** medium: shared preview with **Play Settings** open (public page, capturable without
  sign-in if a public link exists).

### Placeholder values on the board
- **What it does:** When a value is empty on the board (no data yet, a component parameter with no value, a list
  that loads later), Nowa shows placeholder data so the design still renders.
- **Where:** everywhere on the board and in Play on the board.
- **Labels:** text shows `[name]` (the variable or parameter name in brackets); lists show 3 sample items; images a
  stock thumbnail; colors grey; icons an info icon; a missing widget a small 48×48 slot.
- **How to use:** nothing to do; give the value a default (e.g. `??`) to see your own.
- **Options:** none.
- **Limits and rules:** numbers/booleans/dates that may be empty mock to empty, non-nullable ones to 0/false/now;
  an enum shows its first value; classes get each field mocked; values compared or defaulted with `??` are not
  mocked; some classes (with a non-project supertype) can't be mocked. Real local values are kept.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/mock.dart:66-98`, `:131-139`, `:210-217`, `:244-289`, `:291-305`,
  `:307-353`.
- **Old docs:** missing. Note: `docs/pure_ui_manifesto.md` (repo) has a similar table that is partly outdated vs
  this code.
- **Screenshot value:** medium: a list screen showing `[title]` placeholders.

### This screen failed to render (board errors)
- **What it does:** If one item crashes while rendering, only that item shows an error card; the rest of the board
  keeps working.
- **Where:** in place of the failing board item.
- **Labels:** **This screen failed to render**, the error text, **Reload screen**. Items that can't load show as
  **Error**; items waiting for files as **Loading...**. Widgets Nowa kept as code show **Kept as code** with the
  reason in Details.
- **How to use:** fix the cause (e.g. in code or with the AI), then click **Reload screen**.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/error_boundary.dart:9-30`, `:240`, `:253`;
  `packages/core/lib/src/widgets/component_builder.dart:20`, `:47`;
  `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:94`;
  `packages/designer/lib/src/details/widget_details.dart:115-143`, `:556`.
- **Old docs:** missing.
- **Screenshot value:** low.

### View only boards
- **What it does:** Project members with the viewer role can browse boards but not change them.
- **Where:** any board in a project shared with you as a viewer.
- **Labels:** toolbar replaced by **View only**; right-click menu: **Copy**, **Export as image...**.
- **How to use:** click, double-click to drill in, box select, pan/zoom.
- **Limits and rules:** no designer shortcuts; only copy and tab shortcuts work.
- **Gating:** viewer role (`packages/core/lib/src/providers/project_provider.dart:573`).
- **Code refs:** `packages/designer/lib/src/widgets/designer_tools.dart:208-219`;
  `packages/designer/lib/src/design_experience/designer_board_controller.dart:343-423`;
  `packages/designer/lib/src/menus/widget_context_menu.dart:20-31`; `packages/designer/lib/src/designer_setup.dart:119`, `:133`;
  `lib/setup_general_actions.dart:61-66`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Designer keyboard shortcuts
- **What it does:** Keyboard bindings active on a board / single view (`Ctrl` = `Cmd` on macOS).
- **Where:** board focused; all off while Play runs, while typing in a field, and for viewers.
- **Labels / bindings (from code):** `V` **Select tool**; `R` **Shape**; `T` **Text**; `F` zoom to selection;
  `Ctrl+G` group; `Ctrl+]` / `Ctrl+[` order later/earlier; arrows nudge 1 px (`Shift` 10 px) or reorder in a
  Row/Column; `Ctrl+P` Run (opens the in-app preview, shipping area); `Ctrl+K` widget picker; `Ctrl+A` select all;
  `Ctrl+I` open selection on its own; `Ctrl+Shift+B` new board; `Ctrl+B` boards; `/` focus the AI chat;
  `Ctrl+C/X/V` copy/cut/paste; `Ctrl+Z`, `Ctrl+Shift+Z`/`Ctrl+Y` undo/redo; `Delete` (`Backspace` on macOS)
  remove; Space+drag pan; `Ctrl`+scroll zoom.
- **Limits and rules:** the in-app cheat sheet (**Shortcuts**, `Ctrl+.`) disagrees with the bindings: it lists
  **Open widget picker** as `Ctrl+P` (real: `Ctrl+K`), **Group/Ungroup** `Ctrl+G` (it only groups), **Bring to
  front** / **Bring to back** for `]`/`[` (they move one step), and **Show/Hide panels** `Ctrl+\` (not bound).
  Editor-shell researcher owns the cheat sheet.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/designer_setup.dart:15-53`, `:119`, `:133-136`;
  `lib/setup_general_actions.dart:24-60`; `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-14`;
  `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:36-56`; `packages/core/lib/src/inputs.dart:22-25`.
- **Old docs:** `docs/shortcuts.md`: partly wrong (`Ctrl+P` widget picker, `Ctrl+G` ungroup, Paste as `Ctrl+Z`).
- **3.13 (dev) changes:** adds `Ctrl+Alt+]`/`[` to bring to front/send to back.
- **Screenshot value:** low (a table is enough).

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| Drawing a screen directly with a "screen" place tool (ScreenPlaceData) | `packages/designer/lib/src/design_experience/place_board.dart:22`, `packages/designer/lib/src/widgets/designer_tools.dart:87-88` | unreachable: the toolbar **Screen** button opens the template picker (`designer_tools.dart:155-158`); no key binds it |
| Locking board items (`locked`) | `packages/core/lib/src/board/board_block.dart:174-175`, `packages/core/lib/src/board/board_canvas.dart:159-162` | not implemented ("uncomment when lock is implemented"); only used internally for the single view's root |
| Screen-size list for an "Empty" template | `packages/core/lib/src/services/templates/add_template_action.dart:164`, `:288-315` | dead code: checks for "Empty", the template is **Empty Page** |
| "Dissolve" menu entry | `packages/designer/lib/src/menus/widget_context_menu.dart:40-42` | commented out |
| DefaultDragRule (slot picker overlay) | `packages/designer/lib/src/design_experience/drag_rule.dart:93` | not mapped by `findRule`; unused |
| Developer panel ("Input Fields", "Test widget") | `packages/designer/lib/src/panels/developer_panel.dart:26` | debug/internal |
| ViewsOverlay, CursorFollower overlays | `packages/designer/lib/src/panels/designer_board.dart:112`, `:149-184` | debug, unused |
| Board code view (TextEditor) | `packages/designer/lib/src/board/board_editor.dart:40-43` | `kDebugMode` only; users see **Code view is not available for boards** |
| Side bar **Libraries**, **Trace**, **ManualTool** | `lib/project/side_bar.dart:77-92` | `kDebugMode` only |
| Files menu "Reanalyze file", "Export template", "Import template" | `lib/project/panels/files_panel/file_context_menu.dart:91-119`, `lib/project/panels/files_panel/add_lib_menu.dart:147-154` | `kDebugMode` only |
| StageViewer / stageThumbnail | `packages/designer/lib/src/thumbnail.dart:38-110` | unused internal helpers |
| `BackToBoardButton` (**Back to Board**) | `packages/designer/lib/src/widgets/back_to_board_button.dart:14` | defined, never used |
| New UX designer parts (bottom AI bar, closed outline, hidden tool bar, component drill-in) | `packages/core/lib/src/settings/experimental_flags_dialog.dart:67-79`, `packages/designer/lib/src/panels/designer_board.dart:113-132`, `packages/designer/lib/src/design_experience/designer_board_controller.dart:425-430` | experimental flag (Settings → **Experimental flags** → **Edit** → **New UX**, off by default); with it on, double-clicking the board throws "Drill into component is not implemented yet". Recommend not documenting |
| "Pure UI" manifesto | `docs/pure_ui_manifesto.md` (repo) | developer architecture guideline, no UI; not linked from the product. Its user-visible part (mocking on the board) is documented as "Placeholder values on the board"; its table is partly outdated vs `packages/core/lib/src/interpreter/mock.dart:244-289` |

## Open questions
- Can widgets inside a component instance that sits in a screen be selected and edited in place (double-click
  to drill in)? The hit test descends into component internals (`packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:160-172`,
  `packages/core/lib/src/interpreter/widget/instance_tree.dart:44`) and selection skips the component itself when
  inside it (`packages/designer/lib/src/design_experience/selection_manager.dart:25`), which suggests yes; old docs
  say you must drag an instance out. Needs a live check.
- `Ctrl/Cmd+G` on a selected group: code nests it in a new group (`packages/designer/lib/src/designer_setup.dart:20`,
  `packages/designer/lib/src/actions/designer_actions.dart:54-56`); the cheat sheet says Group/Ungroup. Confirm
  in-app before documenting "use right-click → Ungroup".
- Board names: confirm in-app what a typed name like "Login flow" becomes (code camel-cases via
  `generateSymbolName`, `packages/designer/lib/src/actions/file_actions.dart:68`,
  `packages/core/lib/src/file_system/naming.dart:135`).
- Scaffold **Size** dropdown when the screen's size is not a preset: what it displays
  (`packages/core/lib/src/fields/nowa_fields.dart:912-929`, `packages/core/lib/src/screen_sizes.dart:23-26`).
- Are side resize handles drawn, or only corner circles (side handles are hit areas)?
  (`packages/core/lib/src/widgets/selection_overlay.dart:209-263`).
- Play on the board has no keyboard shortcut and is not stoppable with `Esc` (Esc only stops the device-frame play
  mode, `packages/designer/lib/src/play_mode/play_mode.dart:104`). Intended?
- Which widgets the **App Bar** slot offers when picking (custom app bars, 3.12) — widget-catalog owner.
- Should the Pure UI manifesto become a power-user page ("Structuring a Flutter UI package for Nowa")? It is not
  linked in the product; decision for the orchestrator.
- Dark-mode preview: the device preview's Theme section is disabled (`packages/device_preview/lib/src/device_preview.dart:116`);
  confirm the only way to preview dark mode is switching the applied theme (themes researcher).
