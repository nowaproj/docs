# W12 writer notes: Reference / Keyboard shortcuts

Page: `docs/reference/shortcuts.md` (Keyboard shortcuts). Code refs are relative to `/home/user/nowa-master` (v3.12.5, b84bfdafd).
Research used: `features-editor-shell.md` ("Keyboard shortcuts", "Shortcuts (cheat sheet)", "Board navigation", "Context menus",
"Tabs and New tab", "View only"), `features-designer-core.md` ("Designer keyboard shortcuts", "Moving around the board", "Move Up / Move
Down...", "Copy / Cut / Paste", "Remove", "Group / Ungroup"), `features-ai.md` ("Send / Abort", "@ mentions", "Add context"),
`features-logic.md` ("Node editing"). Every binding on the page was re-read in the code; where research and code differ, the code won
(see "Left out" and "Open questions"). The page compiles as MDX (checked with `@mdx-js/mdx` 3.1.1 + remark-gfm in a scratch script, no site build).

## Conventions on the page

- Two key columns (Windows / Linux, macOS) in every table, as the brief asks. macOS keys are written as words (`Cmd`, `Option`,
  `Control`) to match other writers' pages (`docs/design/themes.md` uses `<kbd>Cmd</kbd>`); the intro maps them to the symbols the app shows
  in tooltips on a Mac (`packages/core/lib/src/inputs.dart:27-57`).
- Ctrl -> Cmd rule: `AdaptiveActivator` (`inputs.dart:22-25`, `isMac` `:5`; web on a Mac counts as macOS). Delete key: `getRemoveKey()`
  (`inputs.dart:11-13`) = Delete on Windows/Linux, Backspace (⌫) on macOS.
- The backslash key is written `&#92;` inside `<kbd>` so MDX doesn't read `\<` as an escape.
- Version wording "In the current release (3.12.5)" in the sheet section is deliberate (3.13 fixes the sheet). **Update when 3.13 ships**
  (see "3.13" below).

## Claims and code refs, by section

**Open the Shortcuts sheet**
- Sidebar bottom icon, tooltip **Shortcuts**, hint `⌘.`/`Ctrl.`: `lib/project/side_bar.dart:176-183`. Ctrl/Cmd + `.` toggles:
  `lib/setup_general_actions.dart:34`, `lib/project/panels/panel_actions.dart:42-61`. Close with button, Esc, outside click:
  `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:59-121`, `packages/core/lib/src/panels/panel.dart:833-856`.
- Groups/entries: `shortcuts_cheat_sheet.dart:14-57` (**General**, **Tab Actions**, **Designer**, **Widgets**; title **Shortcuts** `:80`).
- The four mismatches, each re-checked:
  - widget picker shown as Ctrl/Cmd+P (`:40`); real: Ctrl/Cmd+K = `OpenWidgetsDialogIntent`, Ctrl/Cmd+P = `PlayInDesignerIntent` ->
    `RunAppAction` -> `openEmbeddedPreview` (`packages/designer/lib/src/designer_setup.dart:47-48`, `:103`;
    `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-15`; `packages/nowa_run/lib/src/ui/nowa_run_overlay.dart:13-22`);
  - Show/Hide panels Ctrl/Cmd+`\` (`:45`): no `backslash` key is bound anywhere (grep of `lib/`, `packages/`);
  - Group/Ungroup (`:52`): `Designer.group` always groups (`packages/designer/lib/src/design/common_design.dart:25-130`); **Ungroup** is
    only in the right-click menu for one selected group (`packages/designer/lib/src/menus/widget_context_menu.dart:68-75`);
  - Bring to front/back (`:53-54`): one `ReorderIntent` step (`packages/designer/lib/src/design/order_design.dart:23-54`); all the way is
    **Move To Top** / **Move To Bottom** (`widget_context_menu.dart:80-91`).
- Right-click menu shows `]` for both **Move Up** and **Move Down** (product-issues P2, now verified): `ContextMenuFromIntent` calls
  `findActivator<ReorderIntent>()` with no predicate and takes the first match, `]` is registered first
  (`packages/core/lib/src/widgets/menu.dart:50-60`, `packages/core/lib/src/shortcuts/shortcut_registry.dart:68-88`, `designer_setup.dart:21-22`).
  Real keys: `[` = `ReorderIntent(goNext: false)` = **Move Up**, `]` = `goNext: true` = **Move Down** (`widget_context_menu.dart:78-79`).

**General** (`lib/setup_general_actions.dart:24-61`)
- Save `:25` (**Saved!** `packages/core/lib/src/project/saving_service.dart:116`); Undo/Redo `:26-28`; Copy/Cut/Paste `:29-31`; Search for a
  file `:32` (`packages/core/lib/src/actions/tab_actions.dart:27-72`, hint **Search for a file**); Settings `:33` (tooltip **Settings** with hint:
  `packages/nowa_ui/lib/top_bar/top_bar_view.dart:754-755`); Shortcuts sheet `:34`; Ctrl/Cmd+B `:35` -> `OpenBoardsTabAction`: last board, or the
  next board file when already on one (`packages/designer/lib/src/actions/file_actions.dart:29-59`); Remove `:41`; **Action History** `:42`
  (`packages/core/lib/src/actions/undo_actions.dart:40-55`).
- Remove has an action in: board (`packages/core/lib/src/actions/general_actions.dart:20-99`), Files (`lib/project/panels/files_panel/files_panel.dart:42`),
  Widgets (`lib/project/panels/widgets_panel/widgets_panel.dart:146`, `:155`), Router (`packages/core/lib/src/editors/router_editor/router_block_view.dart:104`, `:112`).
- Separate undo histories: `files_panel.dart:30`, `widgets_panel.dart:138`, `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:158-159`,
  `router_block_view.dart:96`, Circuit `packages/code/lib/src/circuit_workspace.dart:113-114`; undo/redo ignore fields (`undo_actions.dart:20`, `:35`).
  **Action History** click = undo that entry and all later ones, redo entries above the divider (`undo_actions.dart:85-106`, `:138`).
- Paste accepts copied widgets, images and text: `packages/designer/lib/src/design/copy_paste.dart:44-170`.

**Sidebar panels**
- Order/numbers: `lib/project/side_bar.dart:34-99` (Assistant, Widgets, Themes, Search, Git, Files, Outline, Api, plugin panel = Supabase),
  keys `setup_general_actions.dart:43-60`, action `panel_actions.dart:13-26`, toggle `packages/core/lib/src/panels/panel.dart:211-218`. Search also
  Ctrl/Cmd+Shift+F `setup_general_actions.dart:40`. **Router** `showShortcut: false` `side_bar.dart:151`.
- No **Git** icon when sandboxed (`side_bar.dart:56`); `isSandboxed = isMock || isGuest` = playground or public project opened as a guest
  (`packages/core/lib/src/models/project.dart:140-157`).

**Design on the board** (`designer_setup.dart:15-53`; off while playing and in View only: `:119`, `:131-135`; also wraps the sidebar **Outline**
via `OutlinePanelForEditor`, `packages/designer/lib/src/panels/outline_panel.dart:34`; board `board_editor.dart:46`, single view `widget_designer.dart:83`)
- V/R/T = `SetToolIntent` (`:16-18`; tools **Select tool**/**Shape**/**Text**, `packages/designer/lib/src/widgets/designer_tools.dart:81-95`, `:135-182`;
  **Shape** places a Container `:91`). F = `BoardFocusAction` (`designer_actions.dart:222-238`). Ctrl/Cmd+A: siblings of the active widget, else all board
  items (`packages/designer/lib/src/design_experience/selection_manager.dart:98-110`, `widget_actions.dart:130-151`). Ctrl/Cmd+G: `designer_actions.dart:46-56`.
- `[` / `]`: `order_design.dart:23-86`, `widget_actions.dart:52-89`. "Later = in front in a Stack" follows the research (reorder = stacking order in a
  Stack) and Flutter's paint order; 3.13 names the later step **Bring forward** (`upcoming-3.13.md`).
- Arrows: nudge only when the layout wrapper is `Positioned` or `BoardPosition`, else reorder along the parent's direction
  (`order_design.dart:88-113`, `widget_actions.dart:91-128`); Shift = 10 px (`designer_setup.dart:24-46`).
- Ctrl/Cmd+K: `packages/designer/lib/src/actions/add_actions.dart:6-22`; picker hint **Search for a widget** `packages/core/lib/src/widgets/widget_picker.dart:144-146`.
  Ctrl/Cmd+I: `designer_actions.dart:298-313` + `packages/designer/lib/src/panels/variables_panel.dart:7-19` (class that owns the selection).
  Ctrl/Cmd+Shift+B: `file_actions.dart:7-27`, dialog title `"New ${creatingText}"` with `'Board'` (`packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94`).
  Esc ends in-place text editing: `packages/designer/lib/src/design_experience/text_custom_view.dart:109-115`.
- Typing guards (`primaryFocus is! FieldFocus`): `tool_actions.dart:15-17`, `designer_actions.dart:124`, `:139`, `:234`, `widget_actions.dart:66`, `:105`, `:150`,
  `general_actions.dart:93`, `undo_actions.dart:20`, `:35`.

**Mouse and trackpad**
- Pan/zoom/Space/middle button: `packages/core/lib/src/board/board_view.dart:145-181` (pointer events), `:183-196` (trackpad), `:198-212` (Space, ignored
  in a field), `:225-250` (scroll: Ctrl/Cmd zoom `:240`, Shift sideways `:242`). Ctrl/Cmd = `isControlOrMetaPressed` (`inputs.dart:15-16`).
- Box select: `packages/designer/lib/src/design_experience/designer_board_controller.dart:187-200`, `:227`; `select_tool.dart:56`.
- Shift+click adds: `designer_board_controller.dart:95`, `:103`, `packages/designer/lib/src/panels/canvas_titles.dart:204`,
  `packages/nowa_ui/lib/outline/outline_view.dart:297`, `:507`. Range/toggle in **Widgets**/**Files**:
  `packages/core/lib/src/common/selectable_tree_controller.dart:18-30`, `lib/project/panels/widgets_panel/switchable_list_grid_view.dart:85-97`,
  `lib/project/panels/files_panel/files_list.dart:359-368`.
- Ctrl/Cmd+click innermost: `selection_manager.dart:51`, `:64` (`topFirst: !isControlOrMetaPressed`), `designer_board_controller.dart:55-65`.
- Double-click: `designer_board_controller.dart:108-125` (select the hit widget, else edit Text/Markdown/Html `text_custom_view.dart:15-38`, else
  `selectChild`). `_tryDrillIntoComponent` only fires with New UX (`:425-431`), not described. Outline double-click = reveal
  (`outline_view.dart:298`, `outline_panel.dart:145-153`). Title rename `canvas_titles.dart:199-205`, Enter confirms (`packages/core/lib/src/widgets/component_builder.dart:93-100`).
- Shift = one axis, Alt = copy: `designer_board_controller.dart:203`, `packages/designer/lib/src/design_experience/move_tool.dart:116-183`,
  `move_action_handler.dart:31-44`. Resize: Shift ratio, Alt from center, snapping skipped when either is held:
  `packages/designer/lib/src/design_experience/resize_tool.dart:47-69` (`:55`), `:75`; same when drawing with Shape/Text: `place_board.dart:113`.
- Middle-click closes a tab: `lib/tabs_view.dart:175` (`onTertiaryTapUp`).

**Run your app**
- Shift+R, Ctrl/Cmd+F: `packages/nowa_run/lib/src/actions/actions_setup.dart:18-22`; actions `nowa_run_actions.dart:25-41` (`hotRestart` ->
  `restartSession`, `setDeviceType(fullscreen)`, `packages/nowa_run/lib/src/ui/nowa_run_play_mode_controller.dart:11-29`). The top bar restart
  button calls the same `hotRestart()` (`lib/project/top_bar.dart:95`); label **Hot Reload** (local) / **Hot Restart** (cloud)
  (`lib/project/top_bar_mapper.dart:143`); **Fullscreen** button `top_bar_view.dart:802`. Target name **Embedded preview**: `lib/project/run/run_button.dart:609`.
- No shortcut for **Play** (no activator for `PlaySelectionIntent`; designer-core research).

**Chat with Nowa AI** (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart`)
- Enter sends, Shift/Ctrl/Cmd+Enter new line `:73-86`; Alt/Option+Backspace deletes the previous word `:88-105`; Ctrl/Cmd+V image/text paste
  `:63-71` (on web the browser path is used); `@` list Up/Down/Enter/Esc `:812-833`; while the list is open Enter picks instead of sending (`:59`).

**Pickers** (`packages/command_palette/lib/src/widgets/command_palette_modal.dart:145-149`; footer `command_palette_instructions.dart:29-70`).
Built on it: `packages/ai/lib/src/ui/attachement_menu.dart:13`, `packages/designer/lib/src/details/widget_details.dart:67`,
`packages/core/lib/src/services/templates/add_template_action.dart:46`, `tab_actions.dart:30`, `packages/core/lib/src/settings/sharing_settings.dart:232`,
`widget_picker.dart:144`. Ctrl/Cmd+O and +K are disabled while any overlay is open (`tab_actions.dart:70-73`, `add_actions.dart:8-11`).

**Circuit**: `packages/code/lib/src/circuit_workspace.dart:94-99`, actions `:110-114`, `packages/code/lib/src/circuit_actions.dart`; research `features-logic.md`
"Node editing". "Delete works too" on Windows/Linux: deduced, since the app-wide `RemoveIntent` key (`setup_general_actions.dart:41`) resolves to Circuit's
`RemoveNodeAction` (same conclusion in the logic research; not tested in the app).

**Tabs in code mode**: `setup_general_actions.dart:36-39` (one `EmptyEditor` at a time `:189`). Tab cycling uses `KeyUpActivator(control: true)` on every
OS, so macOS = Control, not Cmd (`lib/keyup_activator.dart:21-73`; the sheet shows the same Control icon, `shortcuts_cheat_sheet.dart:30-31`). Ctrl/Cmd+W
`tab_actions.dart:120-138`. In the designer one editor is open at a time (`packages/core/lib/src/providers/editor_provider.dart:46-68`, `:90-106`); closing it
leaves no editor, so **Nothing is open** shows (`editor_provider.dart:185-233`, `lib/project/panels/empty_workspace.dart:26`).

**Code editor**: Nowa overrides only Save (`packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:184`); the rest are `re_editor` 0.10.0 defaults
(`/root/.pub-cache/hosted/pub.dev/re_editor-0.10.0/lib/src/_code_shortcuts.dart:275-605`; macOS set chosen by `defaultTargetPlatform`, `_consts.dart:3`,
`code_shortcuts.dart:64-72`; Esc closes Find, else cancels the selection `_code_shortcuts.dart:265-271`). Find panel toggles are **Aa** and `.*`
(`packages/core/lib/src/widgets/code_editor/find.dart:111-123`). Ctrl or Cmd + click = go to definition, Dart files only (`nowa_code_editor.dart:69-97`; either key works on every OS).

**When a shortcut does nothing**: focus/playing/View only `designer_setup.dart:119`, `:131-135`; View only key list `setup_general_actions.dart:63-68`;
View only role label **View Only** (`packages/core/lib/src/models/project.dart:20`), board toolbar **View only** (`designer_tools.dart:216`).
The browser bullet is an assumption (generic browser behavior; research open question), hedged with "may".

## Left out, and why

- `/` focuses the AI chat: only the experimental **New UX** bottom bar listens (`packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:43`); no effect in the default layout (D2).
- Ctrl/Cmd+0 (10th sidebar icon exists only with New UX **Debug**, `side_bar.dart:93-98`).
- Esc in the **Embedded preview**: mapped, but `StopAppAction.invoke` is empty (`nowa_run_actions.dart:17-23`; the overlay comment says Esc closes it,
  `nowa_run_overlay.dart:24-25`). Esc also stops the old device-frame play mode (`packages/designer/lib/src/play_mode/play_mode.dart:104`), which only the AI's
  play tool can start now (`packages/ai/lib/src/tools/play_app_tool.dart:53-58`); inline **Play** has no Esc.
- Files panel Cut/Paste: only Cut and Paste exist there (no Copy), and Paste moves files to the provider's current directory, which the list view never
  changes from `lib/` (`packages/core/lib/src/file_system/actions/file_actions.dart:405-443`, `packages/core/lib/src/providers/file_provider.dart:55`, `:114-121`).
  Research says "files in the Files panel" for Copy/Cut/Paste; left out until checked in the app.
- Gradient editor: Backspace/Delete removes the selected stop when there are more than two (`packages/core/lib/src/fields/gradient_fields.dart:370-381`); not in any
  research file or page plan. Add to the Details page if it gets a gradient section.
- Typing `$` in a text field of **Details** opens the link menu (`packages/core/lib/src/fields/basic_fields.dart:100-117`): owned by `docs/logic/expressions.md`.
- Standard cursor/word/line keys in the code editor: one summary sentence only.
- Debug-only: Ctrl/Cmd+O searching the whole project (`tab_actions.dart:47`). Unused: native menu bar shortcuts (`lib/project/nowa_menu_bar.dart`), `sideBarIconShortcut`,
  dynamic cheat sheet (`shortcuts_cheat_sheet.dart:252-394`), the command palette's own Ctrl/Cmd+K (never mounted, `packages/command_palette/lib/src/models/command_palette_config.dart:8-10`).

## Assumptions and open questions

1. Sidebar numbers assume the full icon list (**Outline** included). With one screen/component open, **Outline** floats on the canvas and is not in the sidebar,
   but the key map still counts it (`side_bar.dart:129`, `panel_actions.dart:20-24`), so Ctrl/Cmd+7 would target **Outline** while tooltips count positions.
   Not described; needs an in-app check. The map is a `static` built once per app session (`setup_general_actions.dart:24`), so switching between a playground and a
   signed-in project in one session can leave the wrong number of entries. The **Assistant** tooltip probably shows Ctrl/Cmd+Shift+F (first activator for index 0),
   which is why the page doesn't promise tooltip text for panels.
2. Alt/Option + drag: code copies any movable `CallExpr` (`move_action_handler.dart:31-44`). On the board this probably also drops a copy of a screen/component item
   (another instance of the same screen), unconfirmed. The page says "Drag a copy of the selection" and does not say "duplicate screens" (old page did).
3. Ctrl/Cmd+G on a group nests it in a new group (code); old docs say it ungroups. Page: Ctrl/Cmd+G groups, right-click **Ungroup** to ungroup.
4. Browser-reserved shortcuts: which Nowa shortcuts reach the app in Chrome/Safari/Edge is untested.
5. Ctrl/Cmd+T and Ctrl+Tab in the designer: code opens an **Empty Tab** page that replaces the board (single-editor mode). Documented only as code-mode keys.
6. Redo in the code editor: the editor binds only Ctrl/Cmd+Shift+Z; Ctrl/Cmd+Y is bound app-wide with no matching action in code mode (untested). Not listed separately.
7. Old URL `/shortcuts` is linked from the old home page; new URL `/reference/shortcuts` (redirect is the orchestrator's).

## Coverage notes

- Must-cover list (general, designer, mouse modifiers, play/run, Circuit, AI chat, pickers, code editor; both OS columns; the **Shortcuts** sheet and where it differs):
  all covered. Added beyond pages.md: sidebar panel numbers, code-mode tabs, scope rules ("When a shortcut does nothing"), right-click menu hint mismatch (P2).
- No badges (nothing is plan- or platform-gated). No capture placeholders, 0 capture requests (task says none needed).
- For the glossary (W18): the widget picker has no title. It shows a search field with hint **Search for a widget**, filter chips **All** / **BuiltIn** / **Components** and a
  **Request a Widget** link (`widget_picker.dart:85-137`).
- Links used (all exist in `pages.md`): `../design/select-and-edit.md`, `../design/add-widgets.md`, `../design/boards.md`, `../test/run.md`, `../test/instant-play.md`,
  `../ai/chat.md`, `../ai/context.md`, `../logic/circuit.md`, `../code/code-mode.md`, `../get-started/editor-tour.md`. Anchor `#sidebar-panels` is in-page.
- 3.13 (dev) will make these stale: Ctrl/Cmd+K opens the Library, Ctrl/Cmd+O becomes "Go to a widget" in the designer, Ctrl/Cmd+B opens a board picker, new Back/Forward
  keys (Ctrl+- / Ctrl+Shift+-), reorder entries renamed with Alt+Ctrl/Cmd+]/[ added, sheet fixed, Files panel keys, panel numbers (`upcoming-3.13.md`).
