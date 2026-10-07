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
