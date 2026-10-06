# Features: Editor layout and productivity

Source: /home/user/nowa-master (v3.12.5). Researcher: editor-shell research agent (editor layout and productivity). 2026-10-06.

Scope: the project editor's frame (top bar, sidebar and side panels, workspace, floating right panels, bottom
panel, status bar), navigation, search, keyboard shortcuts, pickers, context menus, Problems/Logs, saving,
undo, settings shells, help/support, onboarding, mobile layout. Panel *contents* owned by other researchers
(AI chat, Themes, Git, API, Supabase, Router, details fields, widget picker, Run/Deploy) are only named here
with a one-line pointer.

Notation: "Ctrl/⌘ + X" means Ctrl on Windows/Linux and ⌘ (Command) on macOS (`AdaptiveActivator`,
`packages/core/lib/src/inputs.dart:22-25`). Where the code uses Control on every OS, the macOS column shows ⌃ (Control).

## Summary
- **Editor layout** (no UI label): top bar, 40 px icon sidebar on the left, resizable side panel, workspace (board, open screen/component, code), floating **Variables** / **Details** panels on the right of the board, a docked bottom panel slot, a status bar, and a floating support button.
- **Top bar**: logo (back to dashboard), package chip, board chip + view chip, **Upgrade**, account menu, **Notifications**, code-mode toggle, **Settings**, **Run** and **Deploy** (or **Save** in a playground/guest session).
- **Board chip (board switcher)**: switch boards, **Create new board**, **Rename** / **Delete** boards, return to the board from an open file.
- **Sidebar panels**: **Assistant**, **Widgets**, **Themes**, **Search**, **Git**, **Files**, **Outline**, **Api**, **Supabase**, **Router**, plus **Shortcuts** and (web) **Enter Fullscreen**. Each panel has a Ctrl/⌘ + number shortcut.
- **Widgets** panel: lists the project's screens (**Page**) and components (**Component**); search, list/grid, drag to board, double-click to open, right-click menu.
- **Files** panel: project tree (lib, boards, assets; everything in code mode) with add/import buttons, drag to move, right-click menu, unsaved `*` and problem/Git markers.
- **Outline** panel: widget tree of the board or open screen; click/Shift-click to select, double-click to zoom to a widget, drag to reorder, right-click for the widget menu, branch eye for conditions.
- **Search** panel: project-wide **Text** search with match case / whole word / regex and **Replace all**; **Symbols** search.
- **Variables** and **Details** (right side of the board): floating, collapsible, resizable panels; with nothing selected, Details shows board settings **Show Grid** / **Board Color** / **Reset**.
- **Bottom panel** (no UI label): docked, resizable area used by API/Supabase request testers and Git commit details.
- **Status bar**: project name (click for name + copyable ID), version, error/warning/info counts, last log line, file loading progress, Git branch with ahead/behind, Save button.
- **Console**: floating panel with **Problems** and **Logs** tabs, opened from the status bar.
- **Problems**: **From Nowa** (instant, with **All files** / **Only @NowaGenerated** scope, **Refresh**) or **From Code Analysis** (`flutter analyze`, severity filter); **Navigate** / **Copy**; **Fix** quick fixes on some problems.
- **Save options** / **Auto save**: Ctrl/⌘ + S, auto save on by default every 20 seconds (10 s to 5 min), unsaved `*` markers, unsaved-changes dialog when leaving.
- **Undo / Redo** and **Action History** (Ctrl/⌘ + Shift + H): per-area undo stacks, clickable history list.
- **Keyboard shortcuts**: the complete list from code (general, designer, mouse modifiers, play/run, Circuit, AI chat, pickers, code editor), with differences vs the old page.
- **Shortcuts** (cheat sheet, Ctrl/⌘ + .): built-in overlay of common shortcuts; several entries are wrong in 3.12.5.
- **Search for a file** (Ctrl/⌘ + O) and other pickers: built on the `command_palette` package. There is no global command palette in 3.12.5.
- **Context menus**: board, canvas widget / outline row, files, Widgets panel, code-mode tabs; index of all other right-click menus.
- **Board navigation**: scroll to pan, Ctrl/⌘ + scroll or pinch to zoom, Space + drag or middle-drag to pan, **F** to zoom to selection, view remembered per board. No zoom buttons, fit button or minimap.
- **Opening screens, components and files**: **Open in new tab** on canvas titles, double-click in Widgets/Files, Ctrl/⌘ + I, Ctrl/⌘ + B back to board, search results, Problems **Navigate**.
- **Tabs and New tab** (code mode): tab strip, **New Tab** (Ctrl/⌘ + T) with **Recent Files**, Ctrl + Tab, Ctrl/⌘ + W, middle-click to close.
- **Resizing and collapsing panels**: drag dividers, toggle panels from their icon, floating panels can be moved/resized/closed.
- **Settings** (App Settings overlay, Ctrl/⌘ + ,): project settings pages grouped **General** / **Integrations**.
- **Experimental flags** (Project Details → **Edit**): **load packages**, **New UX** (Experimental).
- **New UX** layout (Experimental): panel icons move into the top bar with **Pin to top bar**, AI chat bar at the bottom of the board ("Press / to chat...").
- **General Settings** → **Editor Settings**: **Local Setup** (Flutter SDK, projects path, VS Code path; Desktop app) and **Git** (credentials; owned by Git research).
- **Support** (floating support button, bottom right): **Your tickets**, **Report an issue**, **Chat with support**, **Documentation**, **YouTube Channel**, **Hire an Expert**.
- **Notifications** (bell) and announcement banners: Nowa announcements with optional action button.
- **Welcome tour** (new projects): **Welcome to Nowa!** dialog, **Take the quick tour**, 7 tooltip steps, **Explore more features** (3 more steps).
- **Nothing is open** screen and safe mode: **Open board**, **Browse widgets**, **Open code mode**.
- **Mobile layout** (phone browsers under 840 px wide and the iOS/Android app): **Play**, **More** (⋮) menu, screens/components list, AI chat sheet.
- **View only** mode (workspace viewer role): read-only editor, reduced shortcuts and menus.
- **Package chip** (workspaces/monorepos): switch the package being edited (shown only with 2+ packages).
- **Opening the editor from a link**: public-project link options (**Code mode**, **Preview**, **Assistant**, **Opened file**) open the editor pre-arranged.

## Features

### Editor layout (no single UI label)
- **What it does:** The frame of every open project: where each tool lives.
- **Where:** Opens when a project opens (route `/project/:projectId`).
- **Labels:** areas have no labels; panels named below.
- **How to use (layout, top to bottom, left to right):**
  1. **Top bar**, 40 px high (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:29-44`).
  2. **Sidebar**: 40 px icon rail on the far left (`lib/project/side_bar.dart:118-128`).
  3. **Side panel** next to it: default width 340 px, minimum 200 px, resizable; opens on **Assistant** (AI chat) by default (`lib/project/project_page.dart:593-602`, `packages/core/lib/src/panels/panel.dart:29`).
  4. **Workspace**: the active board, an opened screen/component (design or code view), the Run stage, or code mode (`lib/project/panels/vibe_designer.dart:21-44`).
  5. On boards and opened screens/components: a floating **Variables** + **Details** column on the right and the board toolbar at the bottom center (designer research owns the toolbar) (`packages/designer/lib/src/designer_setup.dart:196-224`, `packages/designer/lib/src/panels/designer_board.dart:126-140`). When a single screen/component is open, a floating **Outline** tile appears top-left (`designer_setup.dart:179-194`).
  6. **Bottom panel** slot under the workspace (only when a feature opens it) (`lib/project/project_page.dart:603-609`).
  7. **Status bar**, 22 px, at the very bottom (`lib/status_bar.dart:17-45`).
  8. Floating **support button** bottom right, announcement/package-loading banners next to it (`lib/project/project_page.dart:137-138`).
  9. **Settings** covers the sidebar, side panel and workspace (top bar and status bar stay) (`lib/project/project_page.dart:124-130`).
  10. Code mode keeps the same shell (sidebar, side panel, bottom panel) and switches the side panel to **Files**; leaving code mode restores the previous panel (`lib/project/project_page.dart:583-585`, `packages/core/lib/src/panels/panel.dart:196-209`).
- **Options:** layout variants: **New UX** (see that feature) and the **Mobile layout**.
- **Limits and rules:** the floating right panels hide when the workspace is narrower than 600 px (`designer_setup.dart:171-173`) and in code mode (`designer_setup.dart:174-175`). The editor UI has a dark theme only; no theme switch exists (`packages/nowa_ui/lib/src/globals/theme_provider.dart:12-24`, no `updateTheme` caller).
- **Gating:** mobile shell replaces this layout on iOS/Android and on web below 840 px (`lib/project/project_page.dart:105-107`, `packages/nowa_ui/lib/src/globals/responsive_utils.dart:63-68`).
- **Code refs:** `lib/project/project_page.dart:103-141`, `lib/project/project_page.dart:578-616`.
- **Old docs:** `getting-started/exploreinterface.mdx`: partly outdated (toolbar described at top; no sidebar/panel map, status bar, Problems, Search, Git, Settings); `ui/toolbar.md`: partly outdated.
- **3.13 (dev) changes:** top bar gets **Back**/**Forward** and a searchable board picker; **Widgets** sidebar slot becomes **Library** (designer) / **Files** (code mode) (`/home/user/nowa/lib/project/side_bar.dart:36-57`, `/home/user/nowa/packages/nowa_ui/lib/top_bar/top_bar_view.dart:260-268`).
- **Screenshot value:** high: a labelled full-window capture of a board with Assistant open, showing top bar, sidebar, side panel, board, Variables/Details, toolbar and status bar.

### Top bar
- **What it does:** Shows where you are and holds the main actions.
- **Where:** Top of the editor.
- **Labels (left to right, normal mode):**
  - Nowa logo: no tooltip; leaves the project for the dashboard. If files are unsaved, opens **Unsaved changes will be lost** (see Save) (`top_bar_view.dart:168-189`, `lib/project/top_bar.dart:231-240`).
  - Playground/guest only: a template picker chip (**Playgrounds**, **Templates**, **See all projects**) (`lib/sandbox/sandbox_picker.dart:22-56`; account/projects research).
  - Package chip, tooltip **Package being edited** (only with 2+ packages; see Package chip).
  - Badge **NEW UX** when the New UX flag is on, tooltip = full version (`lib/project/top_bar_mapper.dart:43-49`).
  - Breadcrumbs: board chip, `›`, then either the view chip or the open editor's name (see Board chip) (`top_bar_view.dart:233-271`).
  - Right side: **Upgrade** (free plan only, not in the iOS/Android app) (`top_bar_view.dart:583-607`, `lib/project/top_bar_mapper.dart:118`, `packages/core/lib/src/billing/billing_models.dart:4`); avatar menu with user name, plan badge (`'Starter'` when no subscription), **General Settings**, **Logout** (`top_bar_view.dart:609-691`); **Notifications** bell (`top_bar_view.dart:693-714`); code-mode toggle (`<>` icon, no tooltip, selected in code mode) (`top_bar_view.dart:716-736`); **Settings** (gear, shortcut hint `⌘,` / `Ctrl,`) (`top_bar_view.dart:738-763`, `lib/project/top_bar.dart:154`); **Run** and **Deploy** (code/shipping research), or **Save** / **Save to keep changes** in a playground/guest session (`lib/project/top_bar.dart:328-335`, `lib/sandbox/sandbox_save.dart:44`).
- **Other modes:**
  - Settings open: the left side is only **Back** (closes Settings) (`top_bar_view.dart:66`, `lib/project/top_bar.dart:223-229`).
  - Code mode: left side is **Back** (back to the designer; disabled while switching) (`top_bar_view.dart:67-73`).
  - Run stage open: breadcrumbs are replaced by run tools: **Back to board**, **Phone**/**Tablet**, **Fullscreen**, **Hot Reload** (local) / **Hot Restart** (cloud), **Start**/**Stop**, **Open in Browser** (local) / **Open on Mobile** (cloud, drops down a QR code). With no run session only **Back** shows (`top_bar_view.dart:765-865`, `lib/project/top_bar_mapper.dart:127-146`). Run details: code/shipping research.
- **How to use:** click an item; Settings and code mode toggle on/off.
- **Options:** none.
- **Limits and rules:** account controls hide when nobody is signed in (`top_bar_view.dart:129-134`). There is no project name, Share, Undo/Redo or branch picker in the 3.12.5 top bar: the project name and branch are in the status bar; sharing lives in play mode (designer/shipping research).
- **Gating:** Upgrade hidden on iOS/Android (`billing_models.dart:4`); Run/Deploy replaced by Save in playground/guest sessions (`lib/project/top_bar.dart:331-333`).
- **Code refs:** `packages/nowa_ui/lib/top_bar/top_bar_view.dart:17-151`, `lib/project/top_bar_mapper.dart:16-62`.
- **Old docs:** `ui/toolbar.md` describes the board toolbar, not this bar (partly outdated: toolbar is now at the bottom of the board, and Play moved to Run); `exploreinterface.mdx` "Toolbar" section: outdated.
- **3.13 (dev) changes:** **Back** and **Forward** buttons and a board picker with search (Ctrl/⌘ + B) (`/home/user/nowa/packages/nowa_ui/lib/top_bar/top_bar_view.dart:236-268`, `/home/user/nowa/packages/nowa_ui/lib/top_bar/top_bar_contract.dart:58`).
- **Screenshot value:** high: top bar on a board, plus a crop with the board chip menu open.

### Board chip (board switcher) and view chip
- **What it does:** Names the board you are on, switches boards, manages boards, and switches how an open file is viewed.
- **Where:** Top bar, left side, after the logo.
- **Labels:** board chip shows the board name (file name without `.board`), or **Board** when you are not on a board (`lib/project/top_bar_mapper.dart:76`); menu rows per board with hover actions **Rename** and **Delete**, and **Create new board** (`top_bar_view.dart:335-354`, `top_bar_view.dart:409-415`). View chip shows the opened view's name (the widget name for the design view, the file name for code) with a menu when there is more than one view (`top_bar_view.dart:453-520`, `lib/project/top_bar_mapper.dart:91-97`).
- **How to use:**
  1. On a board, click the board chip to open the menu; click a board to open it.
  2. Hover a board row and click **Rename** (rename dialog) or **Delete** (confirmation **Are you sure you want to delete "…"?**) (`lib/project/top_bar.dart:260-277`, `packages/core/lib/src/file_system/actions/file_actions.dart:149-153`).
  3. Click **Create new board** to create one (Board file dialog) (`packages/designer/lib/src/actions/file_actions.dart:7-27`).
  4. With a screen/component open, the board chip is dimmed: click it to go back to the board (`top_bar_view.dart:327-330`).
  5. Click the view chip to switch between the design view(s) and the code view of the open file.
- **Options:** none.
- **Limits and rules:** some project files cannot be deleted (**Cannot delete file**, `file_actions.dart:130-131`).
- **Gating:** hidden in New UX (panel icons take its place) and in code mode (`lib/project/top_bar_mapper.dart:58-62`).
- **Code refs:** `packages/nowa_ui/lib/top_bar/top_bar_view.dart:287-520`, `lib/project/top_bar.dart:255-286`.
- **Old docs:** `ui/boards.mdx`: wrong on navigation ("**+** button at the top of the tabs bar", "tabs at the top of the interface"); board customization part accurate.
- **3.13 (dev) changes:** replaced by a board picker with search (Ctrl/⌘ + B) and Back/Forward.
- **Screenshot value:** high: board chip menu open with hover actions visible.

### Sidebar (icon rail) and side panels
- **What it does:** Opens one side panel at a time next to the workspace.
- **Where:** Left edge of the editor.
- **Labels:** each icon's tooltip is the panel name, followed by its shortcut. Icons in order (`lib/project/side_bar.dart:34-99`, routing `lib/project/panels/left_panel.dart:24-45`):

  | # | Tooltip | Opens | Panel header | Shortcut | Owner |
  |---|---|---|---|---|---|
  | 1 | **Assistant** | AI chat | **AI Assistant** (or chat title) (`packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:46`) | Ctrl/⌘ + 1 | AI research |
  | 2 | **Widgets** | project screens and components | **Widgets** | Ctrl/⌘ + 2 | this file |
  | 3 | **Themes** | themes editor | **Themes** (`packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:176`) | Ctrl/⌘ + 3 | themes research |
  | 4 | **Search** | project search | mode chips **Text** / **Symbols** | Ctrl/⌘ + 4, also Ctrl/⌘ + Shift + F | this file |
  | 5 | **Git** (badge with change count, `9+` cap) | Git panel | branch name, **Refresh**, **Git settings** (`lib/project/panels/git_panel/git_details.dart:271-300`) | Ctrl/⌘ + 5 | Git research |
  | 6 | **Files** | file tree | **Files** | Ctrl/⌘ + 6 | this file |
  | 7 | **Outline** | widget tree | **Outline** | Ctrl/⌘ + 7 | this file |
  | 8 | **Api** | API collections | **Collections** (`packages/data/lib/src/api/views/api_outline/api_outline.dart:274`) | Ctrl/⌘ + 8 | data research |
  | 9 | **Supabase** (plugin panel, the only `registerPluginPanel` call) | Supabase panel | **Supabase** (`packages/data/lib/src/supabase/ui/sb_outline.dart:44`) | Ctrl/⌘ + 9 | data research |
  | – | **Router** (below a divider) | opens the router file / router editor in the workspace | – | none | logic research |

  Bottom of the rail: **Enter Fullscreen** / **Exit Fullscreen** (web app only) and **Shortcuts** (keyboard icon, hint `⌘.` / `Ctrl.`) (`side_bar.dart:155-183`).
- **How to use:**
  1. Click an icon to open its panel; click the selected icon again to close the panel (`packages/core/lib/src/panels/panel.dart:211-218`).
  2. Or press Ctrl/⌘ + the panel's number (toggles) (`lib/setup_general_actions.dart:43-60`, `lib/project/panels/panel_actions.dart:13-25`).
- **Options:** none (pinning exists only in New UX).
- **Limits and rules:** **Git** is absent in playground/guest sessions, which shifts the numbers after it (`side_bar.dart:55-61`). **Outline** is hidden while a single screen/component is open (its outline floats on the canvas instead) (`side_bar.dart:66-70`, `side_bar.dart:129`). Plugin panels come from CoreHooks `registerPluginPanel`; only Supabase registers one (`packages/data/lib/src/supabase/supabase_plugin.dart:24-26`, `packages/core/lib/core_hooks.dart:64-67`).
- **Gating:** fullscreen button web only (`side_bar.dart:155`); Git not in sandboxed sessions (`side_bar.dart:56`); Git panel content needs the `github` entitlement (`lib/project/panels/git_panel/git_details.dart:28-32`).
- **Code refs:** `lib/project/side_bar.dart:13-188`, `lib/project/panels/left_panel.dart:16-47`.
- **Old docs:** `exploreinterface.mdx`: partly outdated (lists some panels; no Search/Git/Outline/Files-as-panel, no shortcuts).
- **3.13 (dev) changes:** slot 2 becomes **Library** in the designer and **Files** in code mode; **Files** leaves the designer rail (`/home/user/nowa/lib/project/side_bar.dart:36-57`).
- **Screenshot value:** high: the rail with one tooltip showing the shortcut.

### Widgets
- **What it does:** Lists every public screen and component in the project, to open, drag onto a board, rename or delete.
- **Where:** Sidebar → **Widgets** (Ctrl/⌘ + 2).
- **Labels:** header **Widgets**; search field **Search...**; toggle tooltip **Switch to grid view** / **Switch to list view**; segmented control **Page** / **Component**; right-click **Open in Editor**, **Rename**, **Delete** / **Delete N widgets** (`lib/project/panels/widgets_panel/widgets_panel.dart:163-166`, `:265-338`, `lib/project/panels/widgets_panel/widgets_context_menu.dart:30-42`).
- **How to use:**
  1. Choose **Page** (screens) or **Component**; or type in search (searches both by name and file path, fuzzy; the Page/Component control hides while searching) (`widgets_panel.dart:114-130`, `:312`).
  2. Click to select; Ctrl/⌘-click adds or removes one item, Shift-click selects a range (`lib/project/panels/widgets_panel/switchable_list_grid_view.dart:84-96`).
  3. Double-click to open the screen/component in the editor (`lib/project/panels/widgets_panel/preview_tiles.dart:36-38`).
  4. Drag a tile onto the board to place it (`preview_tiles.dart:74-79`).
  5. Right-click for **Open in Editor** / **Rename** (single selection) / **Delete**.
  6. Delete (Win/Linux) or Backspace (macOS) deletes the selection; Ctrl/⌘ + Z / Shift + Z / Y undo and redo inside the panel (`widgets_panel.dart:150-156`).
- **Options:** list or grid view (default list).
- **Limits and rules:** only public widget classes from loaded Dart files under `lib/` (`widgets_panel.dart:91-96`). Previews play their animations for a moment, then settle (What's New 3.12.5).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/widgets_panel/widgets_panel.dart:21-338`.
- **Old docs:** `ui/widget-panel.md`: partly outdated (tabs are **Page**/**Component**, not "Pages"/"Components"; missing search, grid, multi-select, **Open in Editor**).
- **3.13 (dev) changes:** replaced by the **Library** panel (`/home/user/nowa/lib/project/panels/left_panel.dart:35`).
- **Screenshot value:** medium: panel in list view with the right-click menu open.

### Files
- **What it does:** Browse and manage project files: Dart files (`lib`), boards, assets.
- **Where:** Sidebar → **Files** (Ctrl/⌘ + 6); opens automatically in code mode.
- **Labels:** header **Files**; section rows for each root folder with add buttons: lib → **Add to library** (+ menu), assets → **Import asset** (upload icon), boards → **Add board** (dialog **Create board**) (`lib/project/panels/files_panel/files_list.dart:157-160`, `:498-511`). The + menu: **New Widget...**, **New Folder...**, **New Model...**, **New Global State...**, **Generate Models From Json...**, **API Collection...**, **Import Dart code...** (`lib/project/panels/files_panel/add_lib_menu.dart:53-146`, `packages/data/lib/src/api/utils/api_util.dart:115`).
- **How to use:**
  1. Click a folder to expand it; click a file to select; Ctrl/⌘-click adds or removes one item, Shift-click selects a range (`packages/core/lib/src/common/selectable_tree_controller.dart:18-31`).
  2. Double-click a file to open it (`files_list.dart:395-410`).
  3. Drag files to move them (only within `lib` or within `assets`) (`lib/project/panels/files_panel/files_panel.dart:186-192`).
  4. Right-click for the file menu (see Context menus).
- **Options:** none in the list view.
- **Limits and rules:** outside code mode only `lib`, `boards` and `assets` show; code mode shows all project files (`files_panel.dart:23-26`, `packages/core/lib/src/providers/file_provider.dart:7-16`). File names show `*` when unsaved, a red problem count when the file has problems, and a Git letter **C**/**M**/**D**/**A**/**R** (`packages/core/lib/src/file_system/widgets/files_widgets.dart:78-100`, `packages/git_nowa/lib/src/models/git_models.dart:198-205`). Delete asks **Are you sure you want to delete "…"?** / **… N files?**, warns about references, and can be undone (`packages/core/lib/src/file_system/actions/file_actions.dart:149-197`).
- **Gating:** add/import disabled in View only (`files_panel.dart:221`).
- **Code refs:** `lib/project/panels/files_panel/files_panel.dart:9-65`, `lib/project/panels/files_panel/files_list.dart:148-260`.
- **Old docs:** `exploreinterface.mdx` "File System": partly accurate (lib/boards/assets right; nothing about actions).
- **3.13 (dev) changes:** a files tree in code mode only (per D1 note); designer slot becomes Library.
- **Screenshot value:** medium: tree with the + menu open.

### Outline
- **What it does:** Shows the widget tree of the board (all screens on it) or of the open screen/component, and lets you select, reveal, reorder and act on widgets.
- **Where:** Sidebar → **Outline** (Ctrl/⌘ + 7) on a board. When a single screen/component is open: a floating **Outline** tile at the top-left of the canvas, open by default (closed by default in New UX); the sidebar icon hides (`packages/designer/lib/src/designer_setup.dart:157-194`, `packages/core/lib/src/panels/panel.dart:235-245`).
- **Labels:** header **Outline** (`packages/nowa_ui/lib/outline/outline_view.dart:209-213`); branch eye tooltips **Shown on click. Click again to let the condition decide**, **Shown by the condition**, **Click to show this branch** (`outline_view.dart:434-442`); wrappers icon tooltip lists the wrappers (`outline_view.dart:467`).
- **How to use:**
  1. Click a row to select the widget; Shift-click adds to the selection (`outline_view.dart:295-298`).
  2. Double-click a row to zoom the board to that widget; if it is not on the board: **Cannot find widget … on the board.** (`packages/designer/lib/src/panels/outline_panel.dart:145-153`).
  3. Drag a row onto another (above / inside / below) to move it (`outline_panel.dart:166-187`).
  4. Right-click a row for the widget menu (same as on the canvas) (`outline_panel.dart:189-196`).
  5. Condition rows have branch rows: click a branch to force it to show; click again to let the condition decide (`outline_panel.dart:155-164`).
  6. Click the layers icon on a row to unfold its wrappers (e.g. Padding) as extra rows (`outline_view.dart:193-198`).
- **Options:** none.
- **Limits and rules:** row kinds: widget, component (purple label), loop, condition, branch, slot (`packages/nowa_ui/lib/outline/outline_contract.dart:8`, `outline_view.dart:346-350`). Home screen rows show a home icon in the primary (amber `#FFAB3F`) color (`outline_view.dart:364-367`, `packages/nowa_ui/lib/src/globals/nowa_colors.dart:3`). Inactive branches are dimmed.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/panels/outline_panel.dart:17-201`, `packages/nowa_ui/lib/outline/outline_view.dart:200-530`.
- **Old docs:** `ui/outline.md`: partly outdated (location "top-left corner of the Design Board" now only for single screens; menu entries differ: no "duplicate"; missing drag-reorder, Shift-click, branches, wrappers).
- **Screenshot value:** high: outline with a condition branch eye and wrappers unfolded.

### Search
- **What it does:** Finds text or symbols across the whole project and replaces text in bulk.
- **Where:** Sidebar → **Search** (Ctrl/⌘ + 4), or Ctrl/⌘ + Shift + F (`lib/setup_general_actions.dart:40`).
- **Labels:** mode chips **Text** / **Symbols** (`lib/project/panels/search_panel.dart:10-17`). Text mode: toggle **Show replace** / **Hide replace**; field **Search**; flags **Aa** (**Match case**), **ab** (**Whole word**), **.\*** (**Regular expression**); field **Replace**; button **Replace all** (`search_panel.dart:293-346`). Status: **Searching…**, **No results**, **N in M files**, **… (open files only)**, error **Invalid pattern** (`search_panel.dart:360-374`, `:183`). Replace dialog **Replace all** / **Replace N matches in M files?** / **Cancel** / **Replace** (`search_panel.dart:235-248`). Symbols mode: field **Search...**; hover action **Go to Declaration of …** (`search_panel.dart:618`, `:677`).
- **How to use:**
  1. Type; results appear after a short pause, grouped by file with match counts; click a file row to collapse it (`search_panel.dart:142-145`, `:497-510`).
  2. Click a match: if it sits inside a widget shown on the open board, that widget is selected and the board zooms to it; otherwise the file opens at that line (in code mode it always opens the file) (`search_panel.dart:472-487`, `packages/designer/lib/src/design_experience/selection_manager.dart:192-213`).
  3. To replace: **Show replace**, type the replacement, **Replace all**, confirm.
  4. Symbols: type a name; click a result to open a widget on the board / a function in Circuit / its file (`search_panel.dart:639-651`).
- **Options:** match case, whole word, regex (all off by default).
- **Limits and rules:** single-line patterns only; text files only, skips `*.g.dart` and ignored folders; stops at 2000 matches (count shows `+`), 100 per file (`packages/core/lib/src/search/text_search.dart:37-65`). Unsaved and code-mode edits are searched too. Replace skips files that changed since the search: **Skipped N files that changed since the search**; failure: **Replace failed — some files may not have been written** (`search_panel.dart:262-276`).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/search_panel.dart:19-695`, `packages/core/lib/src/search/project_text_search.dart:29-110`.
- **Old docs:** missing.
- **Screenshot value:** high: text search with replace open and grouped results.

### Variables and Details (right-side panels)
- **What it does:** The board's property area: **Variables** (logic research) and **Details** (designer research).
- **Where:** Floating column at the top-right of a board or an opened screen/component.
- **Labels:** tile titles **Variables** (closed by default) and **Details** (open) (`packages/designer/lib/src/designer_setup.dart:208-219`). With nothing selected on a board, Details shows **Show Grid**, **Board Color**, **Reset** (`packages/designer/lib/src/details/empty_details.dart:14-18`, `packages/designer/lib/src/details/board_details.dart:38-70`).
- **How to use:** click a tile title to expand/collapse it; drag the column's left edge to resize.
- **Options:** width starts at 240 px, minimum 200 px, maximum 35% of the workspace width (`designer_setup.dart:200-203`).
- **Limits and rules:** hidden when the workspace is under 600 px wide, and in code mode (`designer_setup.dart:171-175`).
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/designer_setup.dart:144-231`.
- **Old docs:** `exploreinterface.mdx` "Screen & Widget Properties": partly outdated (no location/behavior); `ui/boards.mdx` "Board Customization": accurate.
- **Screenshot value:** medium.

### Bottom panel (no UI label)
- **What it does:** A docked area under the workspace that some tools open: API request editor/tester, Supabase function tester, Git commit details.
- **Where:** Appears below the workspace when one of those tools opens it (`packages/data/lib/src/api/provider/api_provider.dart:41`, `packages/data/lib/src/supabase/ui/func_test_section.dart:38`, `lib/project/panels/git_panel/git_commit_history_panel.dart:631`).
- **Labels:** close button (X, no tooltip) in its header (`packages/core/lib/src/panels/bottom_panel_widgets.dart:22-28`).
- **How to use:** drag the divider to resize; click X to close.
- **Options:** default height 400 px, minimum 150 px (`lib/project/project_page.dart:603-609`).
- **Limits and rules:** Problems and Logs are not docked here; they open in the floating **Console** (see Console).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/bottom_panel.dart:9-13`, `packages/core/lib/src/panels/panel.dart:59-66`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Status bar
- **What it does:** Shows project, version, problems/logs, loading, Git and save state at a glance.
- **Where:** Bottom edge of the editor.
- **Labels (left to right):** project name (click: popup **Project Name:** and **Project ID:** with click-to-copy, **Copied**) (`lib/status_bar.dart:251-268`, `lib/widgets/project_details_popup.dart:22`, `:68`, `:82`); version `v3.12.5-78` (`lib/status_bar.dart:29`, `packages/core/lib/version.dart:1-2`); error / warning / info counts (`status_bar.dart:197-199`); last log line or **Ready** (`status_bar.dart:209`); **Loading files...** / **Loaded <file>** with a progress bar (`status_bar.dart:328-331`); Git: branch name, ↑ ahead and ↓ behind counts, tooltip **Branch is up to date** / **Branch is ahead by N commit(s)** / **Branch is behind by N commit(s)** / **Branch is ahead by A and behind by B commit(s)** (`status_bar.dart:58-70`, `:91-105`); Save button, tooltip **Save options (⌘S to save)** / **Save options (CtrlS to save)** (`status_bar.dart:130`).
- **How to use:** click the counts to open **Console** on **Problems**; click the log line to open it on **Logs** (`status_bar.dart:166-176`, `:193-215`); click the branch to open the **Git** panel (`status_bar.dart:85`); click Save to open **Save options**.
- **Options:** none.
- **Limits and rules:** the error count comes from Problems; the warning and info counts come from the Logs list (`status_bar.dart:197-199`, `packages/core/lib/src/providers/logger_provider.dart:56-60`). Git status shows only when Git is ready (`status_bar.dart:77`). Save button hidden in View only (`status_bar.dart:42`).
- **Gating:** none found beyond the above.
- **Code refs:** `lib/status_bar.dart:12-348`.
- **Old docs:** missing.
- **Screenshot value:** high: annotated status bar.

### Console (Problems and Logs)
- **What it does:** Floating panel with two tabs: **Problems** and **Logs**.
- **Where:** Status bar → click the counts (Problems tab) or the last log line (Logs tab).
- **Labels:** panel title **Console**; tabs **Problems**, **Logs**; on Logs: **Pub get** (runs `pub get`, output goes to the log) and **Clear** (`lib/status_bar.dart:166-176`, `packages/core/lib/src/panels/logs_and_errors_panel.dart:11-33`, `:64-67`).
- **How to use:** drag the title bar to move; drag edges/corners to resize; X to close (`packages/core/lib/src/providers/panel_provider.dart:521-565`). Log text is selectable; the list keeps scrolling to the newest entry when you are at the bottom (`packages/core/lib/src/panels/logs_panel.dart:51-86`).
- **Options:** none.
- **Limits and rules:** a failed device run opens a separate floating **Log** panel with **Clear** (`lib/project/run/run_button.dart:118-120`, `logs_panel.dart:10-31`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/logs_and_errors_panel.dart:5-70`, `packages/core/lib/src/panels/logs_panel.dart:8-106`.
- **Old docs:** missing.
- **Screenshot value:** medium.

### Problems
- **What it does:** Lists issues Nowa finds in your project, or the results of a full `flutter analyze` run, and offers fixes.
- **Where:** Status bar counts → **Console** → **Problems**.
- **Labels:** source dropdown **From Nowa** (hint **Instant**) / **From Code Analysis** (hint **Accurate**) (`packages/core/lib/src/panels/problems_panel.dart:45-52`). From Nowa: filter tooltip **Which code Nowa checks** → **Only @NowaGenerated** / **All files**; status **Including code Nowa did not generate**; **Refresh**; empty **No issues detected**; while packages load **Loading packages...** (`problems_panel.dart:248-270`, `:311`, `:348`, `:424-426`, `:470`). From Code Analysis: **Run code check (flutter analyze)**; filter tooltip **Filter code check results** → **Errors** / **Warnings** / **Info**; status **Checking...**, **Last check failed**, **Checked at <time>**, **N files changed since last check**; empty states **No check run yet** / **Run a code check to scan your whole app for exact results.** + **Run Code Check**, **Checking your code...**, **Code check failed**, **No issues found**, **No issues match the filter** / **Change the filter to see warnings and info results.**, **Code analysis is not available for this project** (`problems_panel.dart:149-221`, `:272-302`, `:493`, `:509`). Row actions: Nowa problem → **Navigate** / **Copy**, plus a **Fix** button when available (`packages/core/lib/src/panels/errors_panel.dart:98-136`, `:186-196`); analysis row → **Open File** / **Copy**, shows `line:column · code` (`problems_panel.dart:525-545`).
- **How to use:**
  1. Pick the source. **From Nowa** updates as you edit; **From Code Analysis** runs on demand with the play button.
  2. Groups (problem checker names first, then file paths) collapse with a click; counts on the right (`problems_panel.dart:104-138`).
  3. Click a row → **Navigate** (opens the file and selects the widget) or **Copy**; click **Fix** where shown.
- **Options:** scope **Only @NowaGenerated** (default) or **All files** (`packages/core/lib/src/interpreter/services/problem_service.dart:99-114`); analysis severities (default Errors only) (`problems_panel.dart:65`).
- **Limits and rules:** Nowa reports nothing until packages finish loading (`problem_service.dart:118-128`); file problems cover loaded files under `lib/` (`problem_service.dart:142-160`). Quick fixes in code:
  - `main` group: **Main file is not found** / **Main function is not found** → **Fix** opens **Reset main file** (**By resetting the main file, you get a new main file with the default setup.**, **Reset**, **Cancel**); **No Home screen Selected, select one of screens as Home Screen** (no fix) (`packages/core/lib/src/project/env_services/main_problems_finder.dart:13-56`).
  - **Packages**: **'X' is imported but is not in the pubspec.** → **Fix** adds it; dev-dependency and failed-to-load messages have no fix (`packages/core/lib/src/interpreter/packages/package_service.dart:384-405`).
  - **PackageConfig**: **Setup statement in main.dart for "X" is required but not found.** → **Fix** adds it; **Android/iOS permission "X" is required by Y but not enabled.** → **Fix** enables it (`packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:388-430`).
  - **firebase**: package-name mismatch → **Navigate** opens **Settings → Firebase** (`packages/data/lib/src/firebase/firebase_plugin.dart:100-118`).
  - **Router problems**: no routes, duplicate path, invalid path (no fix) (`packages/core/lib/src/editors/router_editor/router_problems.dart:27-60`).
- **Gating:** none found (code analysis works for local and cloud projects, `packages/core/lib/src/plugin.dart:75-76`).
- **Code refs:** `packages/core/lib/src/panels/problems_panel.dart:36-619`, `packages/core/lib/src/panels/errors_panel.dart:85-197`.
- **Old docs:** missing (What's New 3.12.3 mentions **All files**).
- **Screenshot value:** high: Problems tab with a **Fix** button, and the source dropdown open.

### Save options and Auto save
- **What it does:** Saves your changes manually or automatically, shows what is unsaved, and protects you when leaving.
- **Where:** Ctrl/⌘ + S anywhere; status bar Save button → **Save options**; board right-click → **Save**.
- **Labels:** popup section **Saving**: **Auto save** (switch), **Save every** (**10 seconds**, **20 seconds**, **30 seconds**, **1 minute**, **5 minutes**), **All changes saved** / **Unsaved changes**, **Save now** (`lib/widgets/save_options_popup.dart:14-18`, `:39-91`). After a manual save: snackbar **Saved!**; failure **Unable to save project: …** (`packages/core/lib/src/project/saving_service.dart:115-121`). Leaving with unsaved files: **Unsaved changes will be lost** / **By closing this project you will lose the unsaved changes**, file list, **Cancel**, **Close**, **Save and close** (`packages/core/lib/src/dialogs/unsaved_dialog.dart:35-88`).
- **How to use:**
  1. Press Ctrl/⌘ + S, or open **Save options** → **Save now**.
  2. Turn **Auto save** on/off and pick an interval in **Save options**.
  3. Watch for `*` after file names (Files panel, code tabs) and the Save icon: check mark = all saved, spinner = saving (`lib/status_bar.dart:141-154`).
- **Options:** **Auto save** default on; interval default **20 seconds** (`saving_service.dart:8-16`). Stored in the browser/app, so it follows the editor on that device, not the project (`save_options_popup.dart:7-8`).
- **Limits and rules:** switching from code mode to design saves (compiles) pending code edits first (`lib/project/workspace_actions.dart:32-57`). Auto save pauses while the unsaved-changes dialog is open (`unsaved_dialog.dart:12-21`). The mobile layout's back arrow leaves without this check (`lib/project/nowago/mobile_view.dart:332-333`).
- **Gating:** Save button hidden in View only (`lib/status_bar.dart:42`).
- **Code refs:** `packages/core/lib/src/project/saving_service.dart:6-131`, `lib/project/top_bar.dart:231-240`.
- **Old docs:** missing (`shortcuts.md` lists no save shortcut).
- **Screenshot value:** medium: Save options popup.

### Undo, Redo and Action History
- **What it does:** Reverts and reapplies edits; shows the history of the focused area.
- **Where:** Ctrl/⌘ + Z, Ctrl/⌘ + Shift + Z or Ctrl/⌘ + Y; board right-click **Undo** / **Redo**; Ctrl/⌘ + Shift + H opens **Action History**.
- **Labels:** floating panel **Action History**, heading **History for <area>**, empty **No undo history found** (`packages/core/lib/src/actions/undo_actions.dart:44-54`, `:110-116`, `:138`).
- **How to use:** in **Action History**, click an entry to undo back to it; dimmed entries above the divider are redos, click to redo up to them (`undo_actions.dart:85-106`, `:138-150`).
- **Options:** none.
- **Limits and rules:** each area has its own history (each board, the Files panel, the Widgets panel, the Themes panel, the Router editor, an opened screen/component) (`packages/designer/lib/src/board/board_editor.dart:21`, `lib/project/panels/files_panel/files_panel.dart:30`, `lib/project/panels/widgets_panel/widgets_panel.dart:138`). Undo/redo shortcuts do nothing while typing in a field (`undo_actions.dart:20`, `:35`). The heading shows the area's internal label.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/actions/undo_actions.dart:8-160`.
- **Old docs:** `shortcuts.md`: undo/redo rows accurate; Action History missing.
- **Screenshot value:** low.

### Keyboard shortcuts
- **What it does:** Every keyboard and mouse shortcut defined in the 3.12.5 code.
- **Where:** applies where noted; the in-app cheat sheet is the **Shortcuts** feature below.
- **Labels:** see the tables.
- **How to use:** press the combination while the area has focus (click into it first).

  **General (whole project editor)** (`lib/setup_general_actions.dart:24-61`)

  | Windows / Linux | macOS | Action |
  |---|---|---|
  | Ctrl + S | ⌘ S | Save (shows **Saved!**) |
  | Ctrl + Z | ⌘ Z | Undo (in the focused area) |
  | Ctrl + Shift + Z, Ctrl + Y | ⌘ ⇧ Z, ⌘ Y | Redo |
  | Ctrl + C / X / V | ⌘ C / X / V | Copy / Cut / Paste (widgets on the board; files in the Files panel) |
  | Ctrl + O | ⌘ O | **Search for a file** picker |
  | Ctrl + , | ⌘ , | Open **Settings** |
  | Ctrl + . | ⌘ . | Show / hide the **Shortcuts** cheat sheet |
  | Ctrl + B | ⌘ B | Go to the board; on a board, switch to the next board (`packages/designer/lib/src/actions/file_actions.dart:29-59`) |
  | Ctrl + T | ⌘ T | New tab (**New tab** / Empty Tab) |
  | Ctrl + Tab | ⌃ Tab (Control) | Next tab |
  | Ctrl + Shift + Tab | ⌃ ⇧ Tab (Control) | Previous tab |
  | Ctrl + W | ⌘ W | Close the current tab / open file (in the designer this leaves **Nothing is open**) |
  | Ctrl + Shift + F | ⌘ ⇧ F | Toggle the **Search** panel |
  | Delete | ⌫ Backspace | Remove the selection (`packages/core/lib/src/inputs.dart:11-13`) |
  | Ctrl + Shift + H | ⌘ ⇧ H | **Action History** |
  | Ctrl + 1 … 9 | ⌘ 1 … 9 | Toggle sidebar panel by position (Assistant, Widgets, Themes, Search, Git, Files, Outline, Api, Supabase) |
  | Ctrl + 0 | ⌘ 0 | 10th sidebar panel, when the sidebar has one (New UX **Debug**) |

  **Designer (boards and opened screens/components)** (`packages/designer/lib/src/designer_setup.dart:15-53`)

  | Windows / Linux | macOS | Action |
  |---|---|---|
  | V | V | **Select tool** |
  | R | R | **Shape** tool (draw a Container) |
  | T | T | **Text** tool |
  | F | F | Zoom the board to the selection (`packages/designer/lib/src/actions/designer_actions.dart:222-238`) |
  | Ctrl + G | ⌘ G | Group the selected widgets (`designer_actions.dart:46-56`) |
  | Ctrl + ] | ⌘ ] | Move the widget one step later among its siblings (right-click **Move Down**) |
  | Ctrl + [ | ⌘ [ | Move it one step earlier (right-click **Move Up**) |
  | Arrow keys | Arrow keys | Nudge 1 px if freely positioned, otherwise reorder inside a Row/Column along that axis (`packages/designer/lib/src/design/order_design.dart:99-104`) |
  | Shift + Arrow | Shift + Arrow | Nudge 10 px |
  | Ctrl + P | ⌘ P | Run the app in the embedded preview (same as **Run**) (`packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-15`) |
  | Ctrl + K | ⌘ K | Open the widget picker (`packages/designer/lib/src/actions/add_actions.dart:6-22`) |
  | Ctrl + A | ⌘ A | Select all |
  | Ctrl + I | ⌘ I | Open the selected widget's screen/component file (`designer_actions.dart:298-313`) |
  | Ctrl + Shift + B | ⌘ ⇧ B | Create a board (**Board** dialog) |
  | / | / | Focus the AI chat bar (only when the New UX bottom bar is shown, see Open questions) |

  **Mouse with keys (designer)**

  | Windows / Linux | macOS | Action |
  |---|---|---|
  | Scroll | Scroll | Pan the board |
  | Shift + scroll | Shift + scroll | Pan horizontally |
  | Ctrl + scroll, pinch | ⌘ + scroll, pinch | Zoom at the pointer (`packages/core/lib/src/board/board_view.dart:183-196`, `:237-250`) |
  | Space + drag, middle-button drag | same | Pan (hand cursor) (`board_view.dart:145-153`, `:198-212`) |
  | Shift + click | Shift + click | Add to the selection (board, outline, canvas titles); range select in the Widgets and Files panels |
  | Ctrl + click | ⌘ + click | Try the innermost widget under the pointer first (`packages/designer/lib/src/design_experience/selection_manager.dart:50-53`) |
  | Alt + drag | ⌥ + drag | Drag a copy of the selection |
  | Shift + drag | Shift + drag | Move along one axis only (`packages/designer/lib/src/design_experience/designer_board_controller.dart:203`) |
  | Shift + resize | Shift + resize | Keep aspect ratio |
  | Alt + resize | ⌥ + resize | Resize from the center (snapping off while either key is held) (`packages/designer/lib/src/design_experience/resize_tool.dart:55-115`) |
  | Double-click canvas title | same | Rename the screen/component (`packages/designer/lib/src/panels/canvas_titles.dart:199-205`) |

  **Play and Run**

  | Keys | Where | Action |
  |---|---|---|
  | Esc | designer play mode | Stop playing (`packages/designer/lib/src/play_mode/play_mode.dart:104`) |
  | Shift + R | Run stage | Hot restart (`packages/nowa_run/lib/src/actions/actions_setup.dart:20`) |
  | Ctrl/⌘ + F | Run stage | Fullscreen device (`actions_setup.dart:21`) |
  | Esc | Run stage | mapped, but its action is empty (see Open questions) (`actions_setup.dart:19`, `nowa_run_actions.dart:17-23`) |

  **Other areas**

  | Keys | Where | Action |
  |---|---|---|
  | ↑ / ↓ | Circuit (logic) | Move selection up / down (`packages/code/lib/src/circuit_workspace.dart:94-100`) |
  | Shift + ↑ / ↓ | Circuit | Move the node up / down |
  | Backspace (all OSes) | Circuit | Remove |
  | Ctrl/⌘ + Z, Shift + Z, Y; Delete/⌫ | Widgets panel, Router editor | Undo, redo, delete (`lib/project/panels/widgets_panel/widgets_panel.dart:150-156`, `packages/core/lib/src/editors/router_editor/router_block_view.dart:107-113`) |
  | Ctrl/⌘ + Z, Ctrl/⌘ + Y | Themes panel | Undo, redo (`packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:156-160`) |
  | Enter | AI chat field | Send (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:73-86`) |
  | Shift/Ctrl/⌘ + Enter | AI chat field | New line |
  | Alt/⌥ + Backspace | AI chat field | Delete the previous word (`ai_chat_field.dart:88-105`) |
  | @, then ↑/↓, Enter, Esc | AI chat field | Mention picker: navigate, pick, close (`ai_chat_field.dart:812-833`) |
  | ↑/↓, Enter, Backspace, Esc | pickers (Search for a file, Wrap with, templates…) | Navigate, select, cancel selected action, close (`packages/command_palette/lib/src/widgets/command_palette_modal.dart:145-149`) |
  | Esc | Shortcuts cheat sheet, pickers | Close (`packages/core/lib/src/panels/panel.dart:833-856`) |

  **Code editor** (third-party `re_editor` 0.10.0 defaults plus Nowa's save override) (`packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:184`, `/root/.pub-cache/hosted/pub.dev/re_editor-0.10.0/lib/src/code_shortcuts.dart:275-620`)

  | Windows / Linux | macOS | Action |
  |---|---|---|
  | Ctrl + S | ⌘ S | Save (Nowa save) |
  | Ctrl + F | ⌘ F | Find |
  | Ctrl + Alt + F | ⌘ ⌥ F | Replace |
  | Ctrl + Alt + C / R | ⌘ ⌥ C / R | Find: toggle match case / regex |
  | Ctrl + / | ⌘ / | Toggle line comment |
  | Ctrl + Shift + / | ⌘ ⇧ / | Toggle block comment |
  | Ctrl + D | ⌘ D | Delete line |
  | Ctrl + L | ⌘ L | Select line |
  | Alt + ↑ / ↓ | ⌥ ↑ / ↓ | Move line |
  | Tab / Shift + Tab | same | Indent / outdent |
  | Esc | Esc | Close find |
  | hold Ctrl + click | hold ⌘ + click | Go to definition (`packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:74-82`) |

- **Options:** none (shortcuts cannot be remapped).
- **Limits and rules:** designer shortcuts are off while a canvas plays inline and in View only (`designer_setup.dart:119`, `:131-135`). View only keeps only Ctrl/⌘ + C, Ctrl + Tab, Ctrl + Shift + Tab, Ctrl/⌘ + W (`lib/setup_general_actions.dart:63-68`). Tooltips show shortcuts next to labels (sidebar icons, Settings, Shortcuts, board toolbar), and right-click menu items built from actions show their shortcut on the right (`packages/core/lib/src/widgets/menu.dart:50-60`). Undo and the arrow/reorder keys are ignored while typing in a field.
- **Differences vs `docs/shortcuts.md`:**
  - "Ctrl + Z … Paste": wrong; Paste is Ctrl/⌘ + V.
  - "Ctrl + P … Open Widget picker": wrong; Ctrl/⌘ + K opens the widget picker, Ctrl/⌘ + P runs the app in the embedded preview.
  - "Ctrl + G group/ungroup": code only groups; ungroup is right-click → **Ungroup** (also claimed in `ui/layout/groups.mdx`).
  - "Ctrl + ] one layer up / Ctrl + [ one layer down": Ctrl/⌘ + ] moves one step later among siblings (menu **Move Down**), Ctrl/⌘ + [ one step earlier (**Move Up**); naming conflicts with the in-app cheat sheet ("Bring to front"/"Bring to back").
  - Zoom (Ctrl/⌘ + wheel, pinch), Copy, Undo, Redo, Alt-drag duplicate: accurate.
  - Missing from the old page: Save, Cut, Select all, V/R/T/F, arrows, Ctrl/⌘ + K/I/O/B/T/W/,/./Shift+F/Shift+B/Shift+H/1-9, Ctrl + Tab, Delete/⌫, Space-drag, Shift/Alt modifiers, play/run keys, code editor keys, AI chat keys.
- **Gating:** OS differences as tabled; view-only reduction; web caveats unknown (Open questions).
- **Code refs:** `lib/setup_general_actions.dart:24-68`, `packages/designer/lib/src/designer_setup.dart:15-53`, `packages/core/lib/src/inputs.dart:5-57`.
- **Old docs:** `shortcuts.md`: partly wrong (see differences).
- **3.13 (dev) changes:** Ctrl/⌘ + B opens a board picker; Ctrl + - / Ctrl + Shift + - go back / forward; Alt/⌥ + Ctrl/⌘ + ] / [ bring to front / send to back (`/home/user/nowa/lib/setup_general_actions.dart:35-38`, `/home/user/nowa/packages/designer/lib/src/designer_setup.dart:21-25`).
- **Screenshot value:** low (a table serves better); medium for the cheat sheet.

### Shortcuts (cheat sheet)
- **What it does:** Shows a built-in overlay of common shortcuts.
- **Where:** Sidebar bottom → **Shortcuts** (keyboard icon), or Ctrl/⌘ + . (press again to hide) (`lib/project/side_bar.dart:176-183`, `lib/project/panels/panel_actions.dart:46-60`).
- **Labels:** title **Shortcuts**; groups **General** (**Save**, **Copy**, **Paste**, **Cut**, **Undo**, **Redo**, **Open action history**), **Tab Actions** (**Next tab**, **Previous tab**, **Close current tab**), **Widgets** (**Group/Ungroup**, **Bring to front**, **Bring to back**, **Delete**), **Designer** (**Zoom In/out**, **Open widget picker**, **Open file picker**, **Open selection in new file**, **Container**, **Text**, **Show/Hide panels**) (`packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:14-57`).
- **How to use:** open it; close with X, Esc or a click outside.
- **Options:** shows ⌘ on macOS, `Ctrl` elsewhere (`shortcuts_cheat_sheet.dart:7-8`).
- **Limits and rules:** static list with errors in 3.12.5: **Open widget picker** shows ⌘/Ctrl + P (picker is + K; + P runs the app); **Show/Hide panels** ⌘/Ctrl + \ has no binding anywhere; **Bring to front** / **Bring to back** move one step only; **Group/Ungroup** only groups.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:10-122`.
- **Old docs:** missing.
- **3.13 (dev) changes:** cheat sheet fixed: **Add a widget** ⌘K, **Go to a widget** ⌘O, **Bring forward**/**Send backward**/**Bring to front**/**Send to back**, **Back**/**Forward**/**Boards** rows (`/home/user/nowa/packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:34-60`).
- **Screenshot value:** medium.

### Search for a file (pickers; no command palette)
- **What it does:** A keyboard-driven picker to jump to a file. The same picker component is used for a few other choosers. There is no global command palette with a command list in 3.12.5: the package's own Ctrl/⌘ + K palette widget is never mounted (`packages/command_palette/lib/src/command_palette.dart:212`; no `CommandPalette(` use outside the package), and Ctrl/⌘ + K opens the widget picker instead.
- **Where:** Ctrl/⌘ + O.
- **Labels:** hint **Search for a file** (`packages/core/lib/src/actions/tab_actions.dart:30-43`); footer **to select**, **to navigate**, **to cancel selected action**, **esc** **to close** (`packages/command_palette/lib/src/widgets/command_palette_instructions.dart:29-69`).
- **How to use:** press Ctrl/⌘ + O, type part of a file name, use ↑/↓ and Enter (or click) to open it. Each row shows the file name and its path.
- **Options:** none.
- **Limits and rules:** lists files under `lib/` only (`tab_actions.dart:47`); does not open while another overlay is open (`tab_actions.dart:69-73`). Other pickers on the same component: AI attachment menu (**Upload**, **From your app**; AI research) (`packages/ai/lib/src/ui/attachement_menu.dart:13-67`), widget wrappers in Details (designer research) (`packages/designer/lib/src/details/widget_details.dart:67`), template picker (`packages/core/lib/src/services/templates/add_template_action.dart:46`), file choice in public-project link options (`packages/core/lib/src/settings/sharing_settings.dart:232-243`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/widgets/command_palette.dart:9-75`.
- **Old docs:** missing.
- **3.13 (dev) changes:** cheat sheet renames Ctrl/⌘ + O to **Go to a widget**; no global palette on dev either.
- **Screenshot value:** low.

### Context menus
- **What it does:** Right-click menus. Open with right-click; on touch, long-press; close by clicking outside (`packages/context_menus/lib/src/context_menu_region.dart:32-36`, `packages/context_menus/lib/src/context_menu_overlay.dart:103-105`). Items created from actions show the shortcut on the right (`packages/core/lib/src/widgets/menu.dart:50-60`).
- **Where:** right-click (or long-press on touch) the item.
- **Labels:**
  - **Board background** (right-click empty board): **Undo**, **Redo**, **Save**, **Create a page** (template picker), **Paste** (`packages/designer/lib/src/menus/board_context_menu.dart:16-20`).
  - **Widget on the canvas or Outline row**: **Play** (only when no canvas is playing and the item sits in a canvas), **Remove**, **Replace with...** (widget picker), **Group**, **Ungroup** (only for one selected group), **Copy**, **Cut**, **Move Up**, **Move Down**, **Move To Top**, **Move To Bottom**, **Create component**, **Detach** (enabled only on a component instance), **Copy as new widget** (enabled only on a class component), **Export as image...** (`packages/designer/lib/src/menus/widget_context_menu.dart:34-113`). View only: **Copy**, **Export as image...** (`widget_context_menu.dart:20-31`). Right-clicking an unselected hovered widget selects it first (`packages/designer/lib/src/design_experience/designer_board_controller.dart:320-340`).
  - **File or folder** (Files panel): **Remove file** / **Remove N files**, **Rename** (one item), **Copy as path**, **View in folder** (local projects), **Show file content** / **Show files content** (files only) (`lib/project/panels/files_panel/file_context_menu.dart:58-90`). View only: **Copy as path**, **View in folder** (local) (`file_context_menu.dart:36-56`).
  - **Widgets panel tile**: **Open in Editor**, **Rename** (single), **Delete** / **Delete N widgets** (red, shortcut `Del`/`⌫`) (`lib/project/panels/widgets_panel/widgets_context_menu.dart:28-43`).
  - **Code-mode tab**: **Open Code Editor** (Dart files not already showing code) (`lib/tabs_view.dart:158-171`).
  - Others (one line, owned elsewhere): Git commit **Copy SHA** / **Undo Commit** / **Revert Commit** (`lib/project/panels/git_panel/git_commit_context_menu.dart`); router route **Delete Route** and route params **Rename** / **Delete** (`packages/core/lib/src/editors/router_editor/router_block_view.dart:270-277`, `packages/core/lib/src/editors/router_editor/router_context_menus.dart`); themes **Rename** / **Delete** (`packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart`); Circuit nodes **Remove** / **Move up** / **Move down** (`packages/code/lib/src/widgets/node_widgets.dart:86`); API, Firestore and data request tiles **Remove** (and **Rename**) (`packages/data/lib/src/api/views/api_outline/api_outline_tiles.dart:56`, `packages/data/lib/src/firebase/firestore/widgets/firestore_outline_tile.dart:51`, `packages/data/lib/src/common/data_request_tile.dart:53`); Details fields **Reset to default** / **Set to null** (`packages/core/lib/src/fields/block_field.dart:827`); class fields: constructor choices, **Open in new tab**, **Remove** (`packages/core/lib/src/fields/class_field.dart:204-409`); variables **Remove** (`packages/core/lib/src/widgets/code/variable_widgets.dart:32`); group details **Replace with...** (`packages/designer/lib/src/details/group_details.dart`); code-mode declaration outline **Remove** (`packages/core/lib/src/editors/dart_editor/dart_outline.dart:189`).
- **How to use:** right-click the item, click an entry.
- **Options:** none.
- **Limits and rules:** disabled entries are greyed (`packages/core/lib/src/common/setup_context_menu.dart:66-78`); red entries are destructive.
- **Gating:** View only variants as above; **View in folder** local projects only (`file_context_menu.dart:75`).
- **Code refs:** `packages/core/lib/src/common/setup_context_menu.dart:6-121`.
- **Old docs:** `ui/outline.md` (partly outdated list), `ui/widget-panel.md` (partly accurate), `ui/components.md` / `ui/screens.md` / `ui/layout/groups.mdx` mention single entries (designer research to verify).
- **3.13 (dev) changes:** widget menu reorder entries become **Bring to front**, **Bring forward**, **Send backward**, **Send to back**; menus move to `NMenu` (`/home/user/nowa/packages/designer/lib/src/menus/widget_context_menu.dart:45-48`); Widgets-panel **Open in Editor** becomes **Open in editor** (panel replaced by Library).
- **Screenshot value:** high: widget right-click menu on the canvas (shows shortcuts); medium: board menu.

### Board navigation (pan, zoom, focus)
- **What it does:** Moves around a board.
- **Where:** Any board or opened screen/component.
- **Labels:** none (no zoom controls on screen).
- **How to use:**
  1. Scroll (wheel or two fingers) to pan; Shift + scroll pans sideways.
  2. Ctrl/⌘ + scroll or pinch to zoom at the pointer.
  3. Hold Space and drag, or drag with the middle mouse button, to pan.
  4. Select something and press **F** to zoom to it; double-click a row in **Outline** for the same.
  5. Clicking a search result, or **Play** on a canvas title, also moves the view to it (`packages/designer/lib/src/panels/canvas_titles.dart:247-253`).
- **Options:** per board: **Show Grid**, **Board Color**, **Reset** in **Details** with nothing selected (`packages/designer/lib/src/details/board_details.dart:38-70`).
- **Limits and rules:** zoom between about 10% and 1000% (`packages/core/lib/src/board/board_view.dart:123-131`); panning is clamped near the board's content (`board_view.dart:94-121`). The last zoom and position of each board are remembered per project on that device (`packages/designer/lib/src/board/board_editor.dart:15-31`, `packages/core/lib/src/file_system/board_file_state.dart:62-69`). No zoom-percentage display, zoom buttons, fit-to-screen button or minimap exist in 3.12.5 (no such UI strings).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/board/board_view.dart:28-316`.
- **Old docs:** `shortcuts.md` zoom row accurate; `ui/boards.mdx` customization accurate; pan/focus missing.
- **Screenshot value:** low (a short video would help).

### Opening screens, components and files
- **What it does:** The ways to get from the board to a screen, component or file and back.
- **Where:** board canvas titles, Widgets and Files panels, top bar, keyboard, Search and Problems.
- **How to use:**
  1. Hover a canvas title on the board → **Open in new tab** (opens that screen/component on its own) (`packages/designer/lib/src/panels/canvas_titles.dart:262-276`).
  2. Double-click a screen/component in **Widgets**, or a file in **Files**.
  3. Select a widget and press Ctrl/⌘ + I to open the file that defines it.
  4. Ctrl/⌘ + O → **Search for a file**.
  5. Click a **Search** result, a **Problems** row → **Navigate**, or a Symbols result.
  6. Back to the board: click the dimmed board chip in the top bar, or press Ctrl/⌘ + B (reopens the board you were last on) (`packages/designer/lib/src/actions/file_actions.dart:51-58`).
- **Labels:** **Open in new tab**, **Play** / **Stop** (canvas title, designer research).
- **Options:** none.
- **Limits and rules:** in the designer only one thing is open at a time: opening a file replaces the board view (despite the "new tab" wording); tabs exist only in code mode (`packages/core/lib/src/providers/editor_provider.dart:46-67`). The editor remembers what was open per project on that device and restores it next time (`editor_provider.dart:137-188`, `packages/core/lib/src/project/project_state.dart:53-57`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/providers/editor_provider.dart:5-240`.
- **Old docs:** `ui/boards.mdx`: wrong (tabs bar, "+" to create a board); `ui/widget-panel.md`: double-click accurate.
- **3.13 (dev) changes:** Back/Forward history buttons and shortcuts.
- **Screenshot value:** medium: canvas title hover icons.

### Tabs and New tab (code mode)
- **What it does:** In code mode, files open as tabs.
- **Where:** Code mode workspace, top strip.
- **Labels:** tab names (with `*` when unsaved); **New Tab** button (tooltip with Ctrl/⌘ + T); new tab page **Empty Tab**, **Open an existing file or create a new one**, **New Widget**, **Upload a File**, **Recent Files** (`lib/tabs_view.dart:107-145`, `lib/empty_editor.dart:84-119`); tab name **New tab** (`lib/empty_editor.dart:18`).
- **How to use:** click a tab; middle-click or the hover X closes it (`lib/tabs_view.dart:173-224`); Ctrl + Tab / Ctrl + Shift + Tab cycle; Ctrl/⌘ + W closes; Ctrl/⌘ + T opens one **New tab** (only one at a time) (`lib/setup_general_actions.dart:174-190`).
- **Options:** none.
- **Limits and rules:** board tabs are not shown in code mode (`lib/tabs_view.dart:18`, `:26`); boards have no code view (**Code view is not available for boards**, `packages/designer/lib/src/board/board_editor.dart:39-44`). The code-mode header also holds **Show preview** / **Hide preview** (code research) (`lib/project/panels/vibe_designer.dart:94-110`).
- **Gating:** none found.
- **Code refs:** `lib/tabs_view.dart:11-231`, `lib/empty_editor.dart:10-120`.
- **Old docs:** `ui/boards.mdx` describes tabs as the board UI: wrong for 3.12.5.
- **Screenshot value:** low.

### Resizing, collapsing and floating panels
- **What it does:** Adjusts the space each area takes.
- **Where:** panel dividers, tile headers and floating-panel title bars across the editor.
- **How to use:**
  1. Side panel: drag the divider between it and the workspace (default 340 px, min 200 px); hide it by clicking its sidebar icon again (`lib/project/project_page.dart:588-602`, `packages/core/lib/src/panels/panel.dart:625-707`).
  2. Bottom panel: drag its top divider (default 400 px, min 150 px); close with X.
  3. **Variables** / **Details** and the floating **Outline**: click titles to collapse/expand; drag the inner edge to resize (240 px start, 200 px min, 35% max).
  4. Code-mode preview: drag its divider (420 px start, 320 px min) (`lib/project/panels/vibe_designer.dart:85-90`).
  5. Floating panels (**Console**, **Action History**, **Log**, code **Errors**): drag the title bar, resize from any edge or corner, X to close (`packages/core/lib/src/providers/panel_provider.dart:299-565`).
  6. Web: **Enter Fullscreen** / **Exit Fullscreen** at the bottom of the sidebar.
- **Labels:** **Enter Fullscreen**, **Exit Fullscreen**; floating panel **Open in a new tab** (only on panels that support it) (`panel_provider.dart:550`).
- **Options:** none.
- **Limits and rules:** panel sizes are not saved between sessions (no persistence in `PanelSlot`; New UX pinned panels are saved in the project settings file, `packages/core/lib/src/panels/panel.dart:31-57`).
- **Gating:** fullscreen web only.
- **Code refs:** `packages/core/lib/src/panels/panel.dart:403-717`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Settings (App Settings overlay)
- **What it does:** Project settings, shown over the workspace.
- **Where:** Top bar → **Settings** (gear), or Ctrl/⌘ + , (`lib/project/top_bar.dart:242-248`, `lib/project/panels/panel_actions.dart:28-40`).
- **Labels:** left list header **Settings**, groups **General** and **Integrations** (`packages/core/lib/src/settings/settings.dart:103-121`). Pages (`packages/core/lib/src/settings/project_settings.dart:23-40`, `packages/data/lib/src/firebase/firebase_plugin.dart:70`):
  - General: **Project Details**, **Deployment**, **Permissions**, **Packages**, **Git**, **Project Sync**, **Constants**.
  - Integrations: **Google Maps**, **AdMob**, **RevenueCat**, **Deep Links**, **Google Sign-In**, **Stripe**, **Firebase**.
  Page contents belong to account/projects (Project Details, Sharing), shipping (Deployment), code (Packages, Permissions), Git (Git, Project Sync), logic/data (Constants, integrations).
- **How to use:** open, pick a page on the left; close with the top bar **Back** or the gear.
- **Options:** inside **Project Details**: **Experimental flags** → **Edit** (next feature) (`packages/core/lib/src/settings/project_detail_settings.dart:69-84`).
- **Limits and rules:** opening Settings hides the Run stage (the run keeps going) (`packages/core/lib/src/panels/panel.dart:93-101`). Some screens deep-link to a page (e.g. **Git settings** → Git, Problems → Firebase) (`lib/project/panels/git_panel/git_details.dart:299`).
- **Gating:** **Deployment**, **Permissions**, **Git**, **Project Sync** hidden in playground/guest sessions; **Project Sync** hidden on web (`project_settings.dart:25-29`).
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:18-98`, `packages/core/lib/src/settings/settings.dart:46-194`.
- **Old docs:** scattered (`git/*`, `deployment/*`, data pages); no page on the Settings shell.
- **Screenshot value:** medium: Settings with the page list.

### Experimental flags
- **What it does:** Per-project switches for experimental features.
- **Where:** **Settings** → **Project Details** → **Experimental flags** → **Edit**.
- **Labels:** **EXPERIMENTAL**, **Restart the project for changes to take effect.**, **load packages** (helper **Load packages from pubspec.yaml file automatically, need to restart the project, this will increase loading times when loading the project.**), **New UX** (helper **New UX for handling libraries (library panel) and (debug panel), as well as new way to edit classes.**), **\*Project will be restarted to apply changes.**, button **Apply** (after a change) or **Cancel** (`packages/core/lib/src/settings/experimental_flags_dialog.dart:52-103`).
- **How to use:** toggle, then **Apply**: the project saves and reopens (`experimental_flags_dialog.dart:30-39`).
- **Options:** both off by default (`packages/core/lib/src/project/settings_service.dart:54-57`); stored in the project's `.nowa` settings file under `experimental`.
- **Limits and rules:** dialog cannot be dismissed by clicking outside (`project_detail_settings.dart:75-79`).
- **Gating:** Experimental (per-project flag).
- **Code refs:** `packages/core/lib/src/settings/experimental_flags_dialog.dart:7-108`.
- **Old docs:** missing (What's New 3.7.2 and 3.2.0 point here with older paths).
- **Screenshot value:** low.

### New UX (experimental layout)
- **What it does:** An alternative editor layout behind the **New UX** flag.
- **Where:** after enabling **New UX** in **Experimental flags**.
- **Labels:** top bar badge **NEW UX**; panel icons in the top bar plus **More panels** (…) menu with **Pin to top bar** / **Unpin from top bar** per panel (`lib/project/side_bar.dart:190-354`); extra panel **Debug** (`side_bar.dart:93-98`); AI bar at the bottom of the board with hint **Press / to chat...** and **Open Assistant panel** (`packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:314`, `:345`).
- **How to use:** pin panels you use; click **Assistant** to move the chat between the bottom bar and the side panel (`side_bar.dart:16-32`); press / to focus the bottom chat bar.
- **Options:** pinned by default: **Assistant**, **Widgets**, **Themes**, **Supabase**, **Git**, **Search** (`packages/core/lib/src/panels/panel.dart:32`).
- **Limits and rules:** no left icon rail and no **Router** icon; side panel starts closed; the board toolbar shows only while playing (`lib/project/project_page.dart:612-613`, `packages/core/lib/src/panels/panel.dart:29`, `packages/designer/lib/src/panels/designer_board.dart:130-140`). The **Debug** panel lists runtime objects (developer-oriented).
- **Gating:** Experimental flag.
- **Code refs:** `lib/project/top_bar_mapper.dart:43-62`, `lib/project/side_bar.dart:190-354`.
- **Old docs:** missing (What's New 3.7.2 describes it).
- **Screenshot value:** low (experimental).

### General Settings (Editor Settings)
- **What it does:** Account-level dialog; its **Editor Settings** part holds editor preferences.
- **Where:** Top bar avatar → **General Settings** (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:667-676`).
- **Labels:** sidebar headers **Account Settings** (**Account Details**, **Billing**, **Usage**; account research) and **Editor Settings** (**Local Setup**, **Git**) (`packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:19-35`, `:145`, `:157`). **Local Setup** page header **Environment**: box **Automatic setup** / **Let Nowa download and configure Flutter and the Android toolchain for you.** / **Set up automatically** (or **Update Flutter SDK** with **Flutter SDK is outdated**); fields **Flutter SDK Path** (help **Setting up Flutter SDK**), **Default Projects Path**, **VS code Path** (`packages/core/lib/src/settings/editor_settings/local_setup.dart:118-236`). **Git** page header **Git Settings** (Git research).
- **How to use:** pick a path field, choose a folder; it saves when completed.
- **Options:** VS Code path defaults to the detected VS Code location (`local_setup.dart:22`).
- **Limits and rules:** **Flutter SDK path cannot be empty**, **Invalid Flutter SDK path** (`local_setup.dart:200-208`). The help link opens `https://docs.nowa.dev/local-project-simulator/createlocalproject#setting-up-flutter-sdk` (D13 URL) (`local_setup.dart:189`).
- **Gating:** **Local Setup**: Desktop app (web shows **Not available on web**, `local_setup.dart:165-167`). **Billing** / **Usage** hidden on iOS/Android (`account_editor_settings.dart:26-29`). Git page: plan entitlement **Your plan does not support git integration** (`packages/core/lib/src/settings/git_settings.dart:545-550`).
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:37-200`.
- **Old docs:** `local-project-simulator/*` (code/shipping research to judge).
- **Screenshot value:** low.

### Support (floating support button)
- **What it does:** In-app help: chat with the Nowa team, report issues, follow your tickets, open docs and videos, hire an expert.
- **Where:** Floating button at the bottom right of the editor (badge = unread replies, `9+` cap) (`lib/project/project_page.dart:137`, `packages/nowa_ui/lib/support_icon_button.dart:19-37`). Mobile layout: **More** (⋮) → **Support**.
- **Labels:** header **Nowa Team Support**; **Hey There**, **Let’s help you build a great app!**; **Your tickets** (rows show title and status **New** / **In Progress** / **Resolving** / **Resolved**), **Show all N tickets** / **Show fewer**; cards **Report an issue** (**Let us know if something is broken**, or **Open a project to report an issue**), **Chat with support** (**Have a question? We are here to help**); links **Documentation** (`https://docs.nowa.dev`), **YouTube Channel** (`https://www.youtube.com/@nowadev`), **Hire an Expert** (`packages/nowa_ui/lib/components/support_dialog.dart:184-206`, `:473-545`, `packages/core/lib/src/tickets/ticket_models.dart:48-51`). Conversation view: **Start a conversation, and our support team will get back to you as soon as possible.**, checkbox **Include a snapshot of the current project** (first message of a bug report only, on by default), hint **Type a detailed message...**, image attach and send buttons (`support_dialog.dart:255-410`). **Hire an Expert** dialog: **Get hands-on help from certified Nowa experts.**, **Book a Free Consultation**, **Become an expert** (`packages/nowa_ui/lib/hire_expert_dialog.dart:58-93`).
- **How to use:**
  1. Click the button. 2. **Chat with support** or **Report an issue**; type, optionally attach images, send. 3. Reopen a ticket from **Your tickets** to read replies.
- **Options:** snapshot checkbox for bug reports.
- **Limits and rules:** Enter sends (`support_dialog.dart:407`). The Hire an Expert dialog shows an hourly price: per D3 the docs must not repeat it.
- **Gating:** **Report an issue** needs an open project (`support_dialog.dart:503-513`).
- **Code refs:** `packages/core/lib/src/tickets/widgets/support_panel.dart:11-84`, `packages/nowa_ui/lib/components/support_dialog.dart:12-627`.
- **Old docs:** missing (What's New 3.7 "In-App Support Chat", "? icon").
- **Screenshot value:** high: support home view.

### Notifications and announcement banners
- **What it does:** Shows announcements from Nowa (tutorials, updates, tips); some carry an action.
- **Where:** Top bar bell; banners appear bottom right of the editor (`lib/project/banners/nowa_banner_host.dart:14`).
- **Labels:** bell tooltip **Notifications** (badge `9+` cap); panel header **Notifications**, **N new**, empty **No notifications** (`packages/nowa_ui/lib/src/components/notification_bell.dart:77-128`); banner close tooltip **Dismiss announcement**, optional action button with the announcement's label (`packages/core/lib/src/announcements/widgets/notification_banner.dart:76-110`); release-note popup button **Got it!** (`packages/core/lib/src/announcements/widgets/announcement_widgets.dart:47`).
- **How to use:** open the bell (marks all read); click an entry to follow its action (opens a link or a release-notes popup) (`packages/core/lib/src/announcements/widgets/notification_action_handler.dart:7-35`).
- **Options:** none.
- **Limits and rules:** at most 3 banners at once (`notification_banner.dart:9`). A package-loading banner shows package progress while packages load (`lib/project/banners/package_loading_banner.dart:32`).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/announcements/widgets/notification_bell.dart:11-50`.
- **Old docs:** missing (What's New 3.7 "In-App Notifications").
- **Screenshot value:** medium.

### Welcome tour (new projects)
- **What it does:** A short guided tour the first time you open a new project.
- **Where:** Shown automatically on a newly created project until you finish or skip it once (not in the mobile layout) (`lib/project/project_page.dart:625-630`).
- **Labels:** **Welcome to Nowa!**, **Let's get you building in under a minute.**, **Take the quick tour**, **Watch a 3-min quick guide on YouTube**, **Close** (`lib/project/onboarding/welcome_dialog.dart:25-79`). Steps: **The Design Board**, **Create Screen**, **Widget Palette**, **AI Agent**, **Run your app**, **Data Sources**, **Screens & Components**; buttons **Skip**, **Back**, **Next**, **Got it!** (`lib/project/onboarding/onboarding_step.dart:60-114`, `lib/project/onboarding/onboarding_tooltip.dart:86-102`). End: **You're all set!**, **Explore more features** (steps **Git**, **Project Settings**, **Themes**), **Start building**, links **Documentation**, **YouTube**, **Discord Community** (`lib/project/onboarding/completion_dialog.dart:18-97`, `onboarding_step.dart:116-139`).
- **How to use:** follow **Next**; **Skip** or **Close** ends it.
- **Options:** none; it cannot be restarted from the UI (`lib/project/onboarding/onboarding_controller.dart:110-118`, only auto-start at `lib/project/onboarding/onboarding_overlay.dart:48-53`).
- **Limits and rules:** steps whose target is not on screen are skipped (`onboarding_controller.dart:57-81`). A discount line may show in the dialogs: per D3 not for docs.
- **Gating:** new projects only; stored as the user preference `onboardingTourCompleted`.
- **Code refs:** `lib/project/onboarding/onboarding_overlay.dart:15-228`.
- **Old docs:** missing (What's New 3.6 "Onboarding for New Projects").
- **Screenshot value:** medium: welcome dialog.

### Nothing is open (empty workspace) and safe mode
- **What it does:** Shown when no board or file is open, e.g. after closing everything or opening in safe mode.
- **Where:** Workspace.
- **Labels:** **Nothing is open**, **Open a board to design, or browse your widgets.**, **Open board**, **Browse widgets**, **Open code mode** (`lib/project/panels/empty_workspace.dart:26-52`).
- **How to use:** pick one of the three buttons.
- **Options:** none.
- **Limits and rules:** safe mode opens the project without restoring the last open tabs (`packages/core/lib/src/providers/editor_provider.dart:13-14`, `:166-172`); it starts from the dashboard project menu **Open in safe mode** (account research) (`packages/nowa_ui/lib/dashboard/projects_grid.dart:303-305`) or the URL parameter `?safe=true` (`lib/router.dart:254-257`).
- **Gating:** none found.
- **Code refs:** `lib/project/panels/empty_workspace.dart:8-84`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Mobile layout (phone browsers and the iOS/Android app)
- **What it does:** A phone-sized editor: browse screens/components, chat with the AI, play, and see build status.
- **Where:** Automatically on iOS/Android and in browsers narrower than 840 px (`packages/nowa_ui/lib/src/globals/responsive_utils.dart:63-68`).
- **Labels:** top row: back arrow (to the dashboard), log status, build status chip, **Play**, **More** (⋮) → **View code** (iOS/Android app only), **Support** (`lib/project/nowago/mobile_view.dart:19-61`, `:318-366`). **Play** sheet **Play your app**: **Instant preview** (`SIMULATED`, **A design preview that opens instantly. Great for checking layout and flows.**) and **Run real app** (`LIVE`/`REAL APP`) (`mobile_view.dart:63-128`). While playing: floating button → **Stop**, **Restart** (snackbar **Restarted**), **Share preview** (`mobile_view.dart:391-466`). Body: screens/components list with search **Search project...**, tabs **All** / **Pages** / **Components** with counts, carousel/list toggle; tap attaches to the chat, long-press → **Play alone**, **Attach to chat**, **Rename**, **Delete** (`lib/project/panels/widgets_panel/widgets_panel.dart:277`, `:345-347`, `lib/project/project_dashboard.dart:49-149`). Bottom: AI chat sheet (AI research).
- **How to use:** as labelled.
- **Options:** none.
- **Limits and rules:** no board, sidebar, Files, Problems or Settings overlay in this layout; welcome tour off (`lib/project/project_page.dart:626`).
- **Gating:** device/width; **View code** iOS/Android app only (`mobile_view.dart:37`).
- **Code refs:** `lib/project/nowago/mobile_view.dart:229-561`.
- **Old docs:** missing (What's New 3.10.5 "Full Mobile Browser Support").
- **Screenshot value:** high: phone-width capture (can be done with a narrow browser in `/playground`).

### View only (viewer role)
- **What it does:** Read-only editing for workspace members with the viewer role.
- **Where:** any project opened as a viewer (`packages/core/lib/src/providers/project_provider.dart:573`).
- **Labels:** board toolbar shows **View only** (`packages/designer/lib/src/widgets/designer_tools.dart:208-219`).
- **How to use:** browse, select, copy, export images, read code.
- **Options:** none.
- **Limits and rules:** reduced shortcuts and menus (see Keyboard shortcuts and Context menus); no Save button; Files add/import disabled; code editor read-only (`packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:181`); Sharing settings hidden (`project_detail_settings.dart:86-92`).
- **Gating:** role = viewer (account research owns roles).
- **Code refs:** `lib/setup_general_actions.dart:63-68`, `packages/designer/lib/src/menus/widget_context_menu.dart:20-31`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Package chip (workspaces and monorepos)
- **What it does:** Chooses which package of a multi-package repository you are editing.
- **Where:** Top bar, right of the logo; only when the project has 2+ packages (`lib/project/top_bar.dart:158-161`).
- **Labels:** chip label = active package name or **No package**, tooltip **Package being edited**, list of packages (`lib/project/owned_package_chip.dart:10-29`).
- **How to use:** pick a package; the project saves and reopens on it (`owned_package_chip.dart:33-45`).
- **Options:** none.
- **Limits and rules:** Git still covers the whole repository (What's New 3.12.0).
- **Gating:** projects with 2+ packages (in practice imported local workspaces; account/projects research covers import).
- **Code refs:** `lib/project/owned_package_chip.dart:1-45`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Opening the editor from a link (link options)
- **What it does:** A project link can open the editor already set up.
- **Where:** public-project link options in **Settings** → **Project Details** → **Sharing** (account research): **Code mode**, **Preview**, **Assistant**, **Opened file** (`packages/core/lib/src/settings/sharing_settings.dart:232-280`).
- **Labels:** as above.
- **Options:** the four link options above.
- **How to use:** the link carries `mode=code`, `preview=play|run`, `panel=<sidebar panel name>` (or `none`), `file=<path>` (`packages/core/lib/src/panels/workspace_options.dart:1-41`).
- **Limits and rules:** `panel` matches sidebar names case-insensitively; unknown names are ignored (`lib/project/workspace_options.dart:99-105`).
- **Gating:** none found.
- **Code refs:** `lib/project/workspace_options.dart:14-109`.
- **Old docs:** missing.
- **Screenshot value:** low.

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| Sidebar panels **Libraries**, **Trace**, **ManualTool** | `lib/project/side_bar.dart:77-92` | debug builds only (`kDebugMode`) |
| Top bar debug button | `lib/project/top_bar.dart:330` | debug builds only |
| Top bar badge **FUTURE** | `lib/project/top_bar_mapper.dart:43-48` | internal "future" environment |
| Settings pages **Main**, **Platform Files (Debug)**, **Sample Settings** | `packages/core/lib/src/settings/project_settings.dart:27-28`, `packages/core/lib/src/plugin.dart:146-148` | debug builds only |
| File menu **Reanalyze file(s)**, **Export template**; Add menu **Import template** | `lib/project/panels/files_panel/file_context_menu.dart:91-119`, `lib/project/panels/files_panel/add_lib_menu.dart:147-154` | debug builds only |
| Ctrl/⌘ + O searching the whole project; boards in a text editor in code mode | `packages/core/lib/src/actions/tab_actions.dart:47`, `packages/designer/lib/src/board/board_editor.dart:40-42` | debug builds only |
| Walkthrough engine (step-by-step guided project tours, `/walkthrough` action) | `packages/core/lib/src/walkthrough/walkthrough_engine.dart:11` | disabled: `isEnabled = false`, never set true |
| Help "?" menu (**Tutorials**, **Documentation**, **Community**, **Shortcuts**, **Report an issue**, **Share feedback**) and `ReportProblemDialog` | `lib/widgets/help_icon.dart:6-79`, `packages/core/lib/src/dialogs/feedback_dialogs.dart:94` | widget never mounted (replaced by the Support panel) |
| Native menu bar (Edit → Undo/Redo, View → History) | `lib/project/nowa_menu_bar.dart` | never mounted |
| Status bar **What's New** button | `lib/status_bar.dart:31`, `:290-311` | commented out |
| `SavingStatus` widget; `DropFromOutside` (drop OS files on the board) | `lib/widgets/saving_status.dart`, `lib/project/drop_from_outside.dart` | never mounted |
| Global command palette (package default Ctrl/⌘ + K) | `packages/command_palette/lib/src/command_palette.dart:212`, `packages/command_palette/lib/src/models/command_palette_config.dart:8-10` | widget never mounted; only pickers used |
| Files grid view and its search bar, **Filter options** → **Show all files**, background menu **New Folder** / **Paste** | `lib/project/panels/files_panel/files_panel.dart:57`, `:118-172`, `lib/project/panels/files_panel/files_grid.dart:18`, `:51`, `lib/project/panels/files_panel/files_context_menu.dart:15-28` | unreachable: view type is always list |
| `sideBarIconShortcut` (web Alt variant of panel shortcuts) | `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:246-250` | unused helper |
| Problem popup **Navigate to Code** | `packages/core/lib/src/panels/errors_panel.dart:107` | commented out |
| Dynamic shortcut cheat sheet | `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:252-394` | commented out |
| Assets panel (routed, no entry point) | `lib/project/panels/left_panel.dart:42`, `lib/project/panels/assets_panel.dart` | no sidebar icon routes to it in 3.12.5 (see Open questions) |

## Open questions
- Web app: browsers reserve Ctrl/⌘ + W, T, Tab, 1–9 (and print/open on P/O). Which of Nowa's shortcuts actually reach the app in Chrome/Safari/Edge? Not determinable from code; needs a capture/test.
- Sidebar **Assistant** tooltip likely shows the Search shortcut (⌘⇧F / `Ctrl ⇧F`) instead of ⌘1: the tooltip takes the first registered `OpenSidePanelIntent` with index 0, and Ctrl/⌘ + Shift + F is registered as `OpenSidePanelIntent(0, name: 'Search')` before the digit shortcuts (`lib/setup_general_actions.dart:40`, `:43-60`; `lib/project/side_bar.dart:420-423`; `packages/core/lib/src/shortcuts/shortcut_registry.dart:68-88`). Verify in the app before documenting tooltips.
- Panel number shortcuts vs tooltips when **Outline** is hidden (single screen open) or **Git** is absent (playground): tooltips use the displayed position, the shortcut acts on the full list (`lib/project/side_bar.dart:129`, `:141`; `lib/project/panels/panel_actions.dart:20-24`). The shortcut map is also built once per app session (`static`, `lib/setup_general_actions.dart:24`). Confirm the numbers users see.
- Changelog 3.12.3 says "Fixed the **Libraries panel** missing from the sidebar", but in 3.12.5 code the **Libraries** icon is added only in debug builds (`lib/project/side_bar.dart:77-83`). Is it meant to be user-facing?
- What's New 3.9 announces a "New Assets panel", but no 3.12.5 sidebar icon opens it; assets are reached via **Files** → assets → **Import asset**. Intended? (themes/assets research may answer.)
- Esc in the Run stage: mapped to `StopInDesignerPlayIntent`, whose `StopAppAction.invoke` is empty (`packages/nowa_run/lib/src/actions/nowa_run_actions.dart:17-23`), though the overlay's comment says Esc closes it (`packages/nowa_run/lib/src/ui/nowa_run_overlay.dart:24-25`). Does Esc do anything?
- "/" (focus AI chat) only has a listener in the New UX bottom bar (`packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:43`); in the default layout it seems to do nothing. Confirm before documenting "/" as a general shortcut.
- Alt/⌥ + drag: does it duplicate whole screens/components on the board as well as widgets (old `shortcuts.md` says "widget/screen")? Code shows the copy flag on the move tool only (`designer_board_controller.dart:203`).
- Ctrl/⌘ + G with a group selected: code always groups (`packages/designer/lib/src/actions/designer_actions.dart:46-56`); `ui/layout/groups.mdx` says pressing it again ungroups. Confirm in the app.
- The code-mode toggle in the top bar has no tooltip (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:729-733`). What name should the docs use? (What's New 3.9 calls it "the `<>` icon in the top right".)
- Status bar: the warning and info counts are log counts, not Problems (`lib/status_bar.dart:197-199`). Confirm how docs should describe them.
