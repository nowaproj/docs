# W3 review (Design your app, part 1)

Verifier run on: `docs/design/index.md`, `boards.md`, `screens.md`, `components.md`, `add-widgets.md`, `select-and-edit.md`, `outline.md`.
Source of truth: `/home/user/nowa-master` (v3.12.5). Paths below are relative to that repo unless marked `docs/`.
Screenshots used: `_rewrite/captures/ui-map/01`, `14`, `19` (and others as noted per page).

## Summary

(Filled in at the end of the run. Progress: index done; others in progress.)

## docs/design/index.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Board = `.board` file in `boards/`; JSON holds `color`, `showGrid`, `canvases` | ok | `packages/core/lib/src/file_system/board_file.dart:130-143`, `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:22` (`boards/first.board`) | |
| Loose widget lives "only in the board file", has no title bar | ok | `packages/core/lib/src/board/board_canvas.dart:169` (`isComponent`), `packages/designer/lib/src/panels/canvas_titles.dart:31-40` (titles only for `isComponent` canvases) | Screens and component instances get a title bar; plain widgets do not. |
| "Not part of your app until you place it inside a screen" | ok (inference) | `board_file.dart:130-143` (board file is JSON of canvases); no build, run or export code references `BoardFile` (grep) | Kept: follows from the app being built from `lib/`. Writer flagged it. |
| Title bar: **Play** on hover/selected, **Open in new tab** on hover | ok | `canvas_titles.dart:196-240` (`_buildPlayButton`, `_buildOpenIcon`), screenshot `22-canvas-title-hover.png` | |
| Toolbar labels **Select tool**, **Shape**, **Screen**, **Text**, **Widget** | ok | `packages/designer/lib/src/widgets/designer_tools.dart:128-176` | Exact tooltips. |
| **Widgets** and **Outline** in the left sidebar; **Details** top right; **Variables** above **Details** | ok | `lib/project/side_bar.dart:37-83`, `packages/designer/lib/src/designer_setup.dart:196-224`, screenshot `01` | **Outline** leaves the sidebar when a screen is open on its own (see outline page). |
| Details with nothing selected shows board color and grid | ok | `packages/designer/lib/src/details/empty_details.dart`, `board_details.dart:37-71` | |
| **Variables** shows data of the selected screen/component | fixed | `packages/designer/lib/src/panels/variables_panel.dart:35-45` | Added: with nothing selected it shows **Globals** (`GlobalVariables`, `packages/core/lib/src/state_management/global_state_widgets.dart:44`). |
| Intro: "every screen of your app sits in front of you" / "Everything you do is saved as real Flutter code" | fixed | `board_file.dart` (board colour, grid, loose widgets are JSON) | Reworded to "your screens sit side by side" and "Your screens and components are saved as real Flutter code". The table on the same page already says loose widgets live only in the board file. |
| No board on a phone-sized window | ok | `lib/project/project_page.dart:105`, `packages/nowa_ui/lib/src/globals/responsive_utils.dart:57-64` (`useMobileShell`), `lib/project/nowago/mobile_view.dart` | Native iOS/Android or web viewport under 840 px. |
| **AI Assistant** panel open by default next to the board | ok | `packages/core/lib/src/panels/panel.dart:29` (`_sidePanel = isNewUx ? null : 'Assistant'`; `isNewUx` is an experimental setting, `editor_provider.dart:338`), screenshot `01` | |
| When Nowa AI creates a screen it places it on the board | ok | `packages/ai/lib/src/tools/ai_response_actions.dart:54-95` (`_autoPlaceNewScreensOnBoard`, only when the active editor is a board) | |
| Selected widget is attached to the next message automatically | ok | `packages/ai/lib/src/prompt_controller.dart:99-140` (`gatherContext`, first selected widget) | |
| Links (19) | ok | all targets exist under `docs/` and in `pages.md` | `responsive.md` was not on disk when the run started (W4b); it exists now. |
| Front matter, no H1, no `---`, 1 admonition, sentence-case headings, capture placeholder `design-index-1` matches `captures/requests/W3.md` | ok | | 772 words. |

## docs/design/boards.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Board chip in the top bar shows the current board's name; its menu lists every board; click opens it | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:290-345` (`TopBarBoardChip`), `lib/project/top_bar_mapper.dart:76` (label), `lib/project/top_bar.dart:208-210` (`_boardFiles` = every `BoardFile` in `boardsDir`) | Label is the file name without extension. |
| **Create new board** opens a name dialog (title "New Board", hint "Board name", **Cancel** / **Submit**); the new board opens | ok | `top_bar_view.dart:350`, `packages/designer/lib/src/actions/file_actions.dart:7-26` (`creatingText: 'Board'`), `designer_intents.dart:34` (`openTab = true`), `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:97-135`, `file_name_text_field.dart:178` | The **Submit** label is exact. |
| Hover a row, "click **Rename** or **Delete**" | fixed | `top_bar_view.dart:409-413` (icon buttons with tooltips `Rename`, `Delete`) | They are icons; now "click the **Rename** or **Delete** icon". |
| **Login flow** becomes `loginFlow` | fixed (scoped) | `file_name_text_field.dart:29-37` (snake_case file name), `designer/.../file_actions.dart:62-72` -> `packages/core/lib/src/file_system/naming.dart:135-158` (`generateSymbolName` camel-cases) | True for creation. Rename goes through `RenameFileDialogAction` (`packages/core/lib/src/file_system/actions/file_actions.dart:452-468`), which keeps the snake_case name (`login_flow`). Sentence now starts "When you create a board". Read from code, not run. |
| Each board is a `.board` file in `boards` | ok | `packages/core/lib/src/providers/project_provider.dart:370` | |
| Delete asks **Are you sure you want to delete "…"?**, button **Yes** | ok | `file_actions.dart:151` (message uses the file name with extension), `packages/core/lib/src/widgets/nowa_dialogs.dart:6-26` (**Cancel** / **Yes**) | |
| Screens and components that were on the board stay; loose widgets go with the board | ok | `file_actions.dart:121-190` (`RemoveFileAction` removes only the selected `.board` file; the reference check runs only on `DartFile` content) | |
| Ctrl/Cmd+Shift+B creates a board; Ctrl/Cmd+B returns to the last board, and on a board cycles to the next | ok | `packages/designer/lib/src/designer_setup.dart:51`, `lib/setup_general_actions.dart:35`, `designer/.../file_actions.dart:29-59` (`OpenBoardsTabAction`), `editor_provider.dart:28,124` (`lastBoardFile`) | `AdaptiveActivator`: Ctrl on Windows/Linux, Cmd on macOS (`packages/core/lib/src/inputs.dart:22-25`). |
| Nothing selected: **Details** shows **Show Grid** (dot grid), **Board Color**, **Reset**; reset = light gray, no grid; settings are per board | ok | `packages/designer/lib/src/details/empty_details.dart`, `board_details.dart:37-71`, `packages/core/lib/src/widgets/grid.dart:11-45` (`PointMode.points`), `board.dart:93`, `packages/nowa_ui/lib/src/globals/nowa_colors.dart:29` (`0xFFE7E7E7`), `board_file.dart:130-143` | |
| Grid is a guide only, no snapping to it | ok | `packages/designer/lib/src/design_experience/snap.dart` (only item edges and centers); `kGridSize` is a UI size constant | |
| Pan: scroll, two-finger swipe, **Shift** + scroll sideways; Space + drag; middle-button drag | ok | `packages/core/lib/src/board/board_view.dart:147` (`kTertiaryButton`, Space), `:183-200`, `:229-246` | |
| Zoom: **Ctrl**/**Cmd** + scroll or pinch, at the pointer; **F** zooms to selection; Outline double-click does the same | ok | `board_view.dart:183-246`, `designer_setup.dart:19`, `packages/designer/lib/src/actions/designer_actions.dart:222-236`, `outline_panel.dart:145-152` | `F` is off while a field has focus. |
| No zoom buttons; zoom and position remembered per board on the device | ok | grep for zoom controls (only play mode has **Reset zoom**); `designer_board_controller.dart:164-184` (`BoardFileStateService.setBoardViewData(projectId, name, ...)`) | |
| Title bar: name, home icon on the home screen, **Play** on hover, **Open in new tab** on hover, double-click renames, click selects, Shift + click adds | ok | `packages/designer/lib/src/panels/canvas_titles.dart:31-40,155-300` | **Play** also stays visible while the item is selected; the page does not say otherwise. |
| Click the title, then drag to move | ok | `designer_board_controller.dart:187-205` (`_findMoveInstances` falls back to the hovered title's instance) | Writer's "not tested" reading holds in code. |
| **X**, **Y**, **W**, **H** under **Layout** in **Details** | ok | `packages/designer/lib/src/details/layout_details.dart:97-135` (`BFBoardPos`), screenshot `10-screen-selected.png` | X/Y are hidden only for a screen opened on its own. |
| Loose widgets: no title bar, saved only in the board file, not part of the app until placed in a screen | ok (inference) | `canvas_titles.dart:31-40`, `board_file.dart:130-143` | Same inference as `index.md`. |
| **Play** / **Open in new tab** / dimmed **Board** chip or Ctrl/Cmd+B to return | ok | `canvas_titles.dart:196-240`, `top_bar_mapper.dart:76`, `top_bar_view.dart:324-331` | |
| Toolbar at the bottom of the board; **Select tool** (V), **Shape** (R), **Screen** (no key), **Text** (T), **Widget** (Ctrl/Cmd+K); **Screen** hidden when a screen or component is open on its own; Play bar replaces the toolbar while playing | ok | `designer_tools.dart:135-182,225`, `designer_setup.dart:16-18,48`, `packages/designer/lib/src/panels/designer_board.dart:137` | No shortcut is registered for the template picker intent (grep). |
| Shape = gray container | ok | `packages/core/lib/src/widgets_to_add/default_blocks.dart:10` (`0xFFC4C4C4`) | |
| **Remove**: right-click **Remove** or **Delete** key (**Backspace** on macOS); screen/component stays in project and **Widgets** panel, loose widget is gone but undo restores it | ok | `widget_context_menu.dart:43-47`, `inputs.dart:11-13`, `lib/setup_general_actions.dart:41`, `packages/core/lib/src/actions/general_actions.dart:20-98` (`WidgetInstanceImpl.remove`, undo record) | |
| **Delete** from the project in the **Widgets** panel context menu; drag a tile back onto the board | ok | `lib/project/panels/widgets_panel/widgets_context_menu.dart:28-43`, `preview_tiles.dart:74-79` | |
| Big boards: items in view build first; only hovered, selected or played items animate; more than 8 in view -> the rest are still pictures | ok | `packages/core/lib/src/board/canvas_detail.dart:43,90,123,154-160`, `designer_board.dart:47` | |
| **This screen failed to render** with the error text, **Reload screen**; only that item fails | ok | `packages/designer/lib/src/error_boundary.dart:240-262`, per-canvas boundary `packages/core/lib/src/widgets/component_builder.dart:20,47` | |
| View Only role: browse, select, copy, export; toolbar shows **View only** | ok | `packages/core/lib/src/models/project.dart:20` (`View Only`), `designer_tools.dart:208-218` | |
| View Only: "right-clicking gives **Copy** and **Export as image...**" | fixed | `designer_board_controller.dart:343-415` (`ViewOnlyController` never overrides `onContextMenu`; base is a no-op, `packages/core/lib/src/board/board_controller.dart:105`); the view-only menu (`widget_context_menu.dart:20-31`) is only shown from an Outline row (`outline_panel.dart:187-196`) | Right-clicking the board does nothing for View Only users. Page now says to right-click the row in the Outline. |
| Front matter, no H1, no `---`, 0 admonitions, sentence-case headings, capture ids `design-boards-1/2` match `captures/requests/W3.md`, links (`../test/instant-play.md`, `../account/workspaces.md`, `../ai/index.md`, `outline.md`, `screens.md`, `add-widgets.md`, `components.md#manage-screens-and-components`) | ok | | About 1,070 words. The `components.md` anchor is checked on that page's section. |
