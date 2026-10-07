# W12 + W18 review: Keyboard shortcuts and Glossary

Verifier run against `/home/user/nowa-master` (v3.12.5, b84bfdafd). Pages: `docs/reference/shortcuts.md` (W12),
`docs/reference/glossary.md` (W18). Code refs are relative to the repo root; Flutter SDK ref is `/home/user/flutter`.

## Summary

- Pages checked: 2 (`shortcuts.md`, `glossary.md`). Claims checked: about 235 (shortcuts about 135: 92 table rows, about 30 prose statements, 15 links; glossary about 100: 46 terms, 7 rename rows, 46 links and anchors).
- Shortcuts: all 92 key and gesture rows confirmed in the code, none removed. 5 wording fixes (intro OS wording, Mac symbols reduced to the two the UI shows, **AI Assistant** panel name, `@` mention list, **New Tab** label).
- Glossary: 9 corrections of wrong or misleading text (Board item, Checkpoint, Cloud project, Deploy, Thinking level, Share Preview, Variable, Widget picker key style, old label "Replay checkpoint"), 10 refinements (UI labels and anchors added), 7 terms added (Console, Dashboard, External agent, Files panel, Project settings, Support panel, Variables panel) and 1 rename row added (Instant Preview Share). All 7 renames are backed by old docs or What's New.
- Serious errors fixed: Board item said loose widgets have a title bar (only screens and components do); Checkpoint omitted that **Restore Checkpoint** also undoes every later request; Deploy and Share Preview overclaimed ("publishes to Android and iOS", "lets anyone try").
- Open issues: see the end of this file (sidebar numbers in two edge cases, browser-reserved keys untested, two behaviors deduced rather than run).

## Page 1: `docs/reference/shortcuts.md`

Previous run left no log, so every row was re-checked from the code. Method: read each binding map
(`lib/setup_general_actions.dart:24-68`, `packages/designer/lib/src/designer_setup.dart:15-53`,
`packages/core/lib/src/inputs.dart:5-73`, `packages/nowa_run/lib/src/actions/actions_setup.dart:18-22`,
`packages/code/lib/src/circuit_workspace.dart:94-99`, `packages/command_palette/lib/src/widgets/command_palette_modal.dart:145-149`,
`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart`, `re_editor` 0.10.0 `code_shortcuts.dart`), then the action each key reaches and its
`isEnabled` guard. Also swept every `SingleActivator`, `LogicalKeySet`, `CallbackShortcuts`, `onKeyEvent` and `isShiftPressed` /
`isAltPressed` / `isControlOrMetaPressed` use in `lib/` and `packages/` for bindings the page misses or contradicts.

### Fixed or removed

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Intro: "every table shows both" OS columns | fixed | page structure | The Shortcuts-sheet table has one key column. Now "the tables below list both". |
| Intro: "On a Mac, tooltips and menus show Cmd as ⌘, Option as ⌥, Control as ⌃ and Shift as ⇧" | fixed | `packages/core/lib/src/inputs.dart:27-57`; registry activators all `AdaptiveActivator` (`inputs.dart:22-25`) | The symbol table exists, but every registry activator that feeds tooltips and menus is Cmd (+ Shift), so ⌥ and ⌃ never appear. Reduced to ⌘ and ⇧. |
| Chat section: "chat field of the **Assistant** panel" | fixed | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:46` | Panel title is **AI Assistant**; **Assistant** is only the sidebar icon tooltip (`lib/project/side_bar.dart:37`). Matches `docs/ai/chat.md`. |
| Tabs row: "Open a **New tab**" | fixed | `lib/tabs_view.dart:119` (tooltip with the Ctrl/Cmd+T hint), `lib/empty_editor.dart:18`, `:84` | Both **New Tab** (button tooltip, where the key shows) and **New tab** (the tab's name) exist; now **New Tab**, as on `docs/code/code-mode.md`. |
| Chat row: "Mention a screen or component" | fixed | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:176-200` (`allDeclarations.whereType<ClassDeclImpl>()`) | The `@` list holds every class in the project plus existing attachments. Now "screen, component or class" (same as `docs/ai/context.md`). |

No row was removed: every key row is confirmed by the code. The design verifier's finding about Ctrl/Cmd+A is already on the page and matches
the code (see Design on the board).

### Checked and ok

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Front matter (title, description, keywords), no H1, no `---` rules, no emoji, no hype words, 1 admonition | ok | n/a | Greps clean. Compiles as MDX (scratch compile, no site build). |
| Ctrl on Windows/Linux, Cmd on macOS (web on a Mac counts as macOS); Delete vs Backspace | ok | `inputs.dart:5-25`, `:11-13` | `isMac = defaultTargetPlatform == macOS`. |
| You can't change the shortcuts | ok | grep: no remap UI in `packages/core/lib/src/settings/` | Absence check. |
| Tip: tool and menu tooltips show shortcuts | ok | `packages/designer/lib/src/widgets/designer_tools.dart:57-70`, `tool_bar.dart:115`, `packages/core/lib/src/widgets/menu.dart:50-60` | V/R/T and Ctrl+K on **Widget**. |
| Shortcuts sheet: keyboard icon (**Shortcuts**) at the bottom of the left sidebar; Ctrl/Cmd+. toggles; closes with keys, close button, Esc, outside click | ok | `lib/project/side_bar.dart:176-183`, `lib/project/panels/panel_actions.dart:42-61`, `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:59-121`, `packages/core/lib/src/panels/panel.dart:833-856` | Default (non-New UX) layout; the overlay sits under `SetupGeneralActions` (`lib/project/project_page.dart:182`). |
| Sheet groups **General**, **Tab Actions**, **Widgets**, **Designer** | ok | `shortcuts_cheat_sheet.dart:14-57` | |
| Sheet mismatch: **Open widget picker** shows Ctrl+P; real Ctrl+K picker, Ctrl+P runs in **Embedded preview** | ok | `shortcuts_cheat_sheet.dart:40`, `designer_setup.dart:47-48`, `:103`, `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-15`, `nowa_run_overlay.dart:13-22` | |
| Sheet mismatch: **Show/Hide panels** Ctrl+\ not bound | ok | `shortcuts_cheat_sheet.dart:45`; grep `backslash` in `lib/`, `packages/`: no binding | Only `OpenSidePanelIntent` toggles panels. |
| Sheet mismatch: **Group/Ungroup** only groups; **Ungroup** in right-click | ok | `packages/designer/lib/src/design/common_design.dart:25-130`, `widget_context_menu.dart:74-75`, `designer_setup.dart:20` | No activator for `UngroupIntent`. |
| Sheet mismatch: **Bring to front** / **Bring to back** move one step; **Move To Top** / **Move To Bottom** go all the way | ok | `packages/designer/lib/src/design/order_design.dart:23-54`, `widget_context_menu.dart:80-91` | |
| Right-click **Move Up** and **Move Down** both show Ctrl/Cmd+]; real `[` = Move Up, `]` = Move Down | ok | `menu.dart:50-60`, `packages/core/lib/src/shortcuts/shortcut_registry.dart:68-88`, `designer_setup.dart:21-22`, `widget_context_menu.dart:78-79` | `findActivator<ReorderIntent>()` has no predicate, first map entry is `]`. |
| General: Save (**Saved!**), Undo, Redo (both keys), Copy, Cut, Paste, Settings, Shortcuts sheet, Ctrl/Cmd+B, **Search for a file** Ctrl/Cmd+O, **Action History** Ctrl/Cmd+Shift+H (12 rows) | ok | `lib/setup_general_actions.dart:25-42`; `packages/core/lib/src/project/saving_service.dart:116`; `packages/core/lib/src/actions/tab_actions.dart:27-72`; `undo_actions.dart:40-55` | Ctrl+B cycle: `packages/designer/lib/src/actions/file_actions.dart:29-59`. Paste (images, text, widgets): `packages/designer/lib/src/design/copy_paste.dart:79-141`. |
| Remove key and where it works (board, **Files**, **Widgets**, **Router**) | ok | `setup_general_actions.dart:41`; `packages/core/lib/src/actions/general_actions.dart:20-99`; `lib/project/panels/files_panel/files_panel.dart:42`; `lib/project/panels/widgets_panel/widgets_panel.dart:146`; `packages/core/lib/src/editors/router_editor/router_block_view.dart:104` | |
| Separate undo history per area; **Action History** click undoes that entry and all later ones | ok | `Undo(debugLabel` sites: `lib/project/panels/files_panel/files_panel.dart:30`, `widgets_panel.dart:138`, `packages/core/lib/src/panels/details/theme_panel/themes_panel_manager.dart:7`, `packages/data/lib/src/api/views/api_outline/api_outline.dart:249`, `router_block_view.dart:96`, `packages/code/lib/src/providers/circuit.dart:10`, `packages/core/lib/src/file_system/file_object.dart:182`; `undo_actions.dart:85-106` | Board and screen use the file's own `Undo`. |
| Sidebar: Ctrl/Cmd+1..9 = **Assistant**, **Widgets**, **Themes**, **Search**, **Git**, **Files**, **Outline**, **Api**, **Supabase**; Ctrl/Cmd+Shift+F = **Search**; same keys close; **Router** none | ok | `lib/project/side_bar.dart:34-99`, `:102-113`; `setup_general_actions.dart:40-58`; `lib/project/panels/panel_actions.dart:13-26`; `packages/core/lib/src/panels/panel.dart:211-218`; only plugin panel is Supabase (`packages/data/lib/src/supabase/supabase_plugin.dart:24-26`) | See open issue 1 on edge cases. |
| No **Git** panel in the playground or as a guest, so later numbers move up one | ok | `side_bar.dart:56`; `packages/core/lib/src/models/project.dart:142`, `:154`, `:157` | `isSandboxed = isMock \|\| isGuest`. |
| Design on the board: scope (board, screen or component on its own, **Outline**) | ok | `board_editor.dart:46`, `widget_designer.dart:83`, `packages/designer/lib/src/panels/outline_panel.dart:34` | |
| Ctrl/Cmd+K (**Search for a widget**), V / R / T (**Select tool**, **Shape**, **Text**), F zoom to selection, Ctrl/Cmd+G, Ctrl/Cmd+] and [ (later / earlier), Ctrl/Cmd+I, Ctrl/Cmd+Shift+B (**New Board**), Esc ends text editing | ok | `designer_setup.dart:15-53`; `packages/designer/lib/src/actions/add_actions.dart:6-22`; `packages/core/lib/src/widgets/widget_picker.dart:146`; `designer_tools.dart:131-185`; `designer_actions.dart:222-238`, `:298-313`; `file_actions.dart:7-27`; `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94`; `text_custom_view.dart:109-115` | Ctrl+I opens the class that owns the selection: `variables_panel.dart:7-20`. |
| Ctrl/Cmd+A: selected widget and siblings; every board item when nothing or a board item is selected | ok | `packages/designer/lib/src/design_experience/selection_manager.dart:98-108`; `packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:104-107` (`isRoot => parent == null`) | Matches the design verifier's finding; row kept. |
| Arrows: 1 px / Shift 10 px nudge only for `Positioned` or `BoardPosition`; otherwise one place in a Row or Column | ok | `order_design.dart:88-113`, `designer_setup.dart:23-46`, `packages/core/lib/src/layout/flex_layout.dart:119-146` | Direction also covers `ListView` and `Flex`; the page names Row and Column only. |
| "In a Stack, later widgets are drawn in front" | ok | Flutter `Stack` paint order; `order_design.dart:49-54` (`]` = slot + 1) | Platform fact, not Nowa-specific. |
| Mouse: scroll pans, Shift+scroll pans sideways, Ctrl/Cmd+scroll or pinch zooms at the pointer, Space+drag and middle-button drag pan | ok | `packages/core/lib/src/board/board_view.dart:145-181`, `:183-196`, `:198-213`, `:225-251` | |
| Mouse: box select on empty board; Shift+click adds (board, **Outline**, titles); Shift range and Ctrl/Cmd toggle in **Widgets** / **Files**; Ctrl/Cmd+click innermost | ok | `designer_board_controller.dart:95-103`, `:187-200`; `select_tool.dart:28-71`; `canvas_titles.dart:204`; `packages/nowa_ui/lib/outline/outline_view.dart:297`, `:507`; `selectable_tree_controller.dart:18-30`; `switchable_list_grid_view.dart:85-97`; `selection_manager.dart:50-53` | |
| Mouse: double-click selects inside or edits Text; Outline double-click zooms to the widget; title double-click renames, Enter confirms | ok | `designer_board_controller.dart:108-125`; `text_custom_view.dart:15-38`; `outline_view.dart:298`, `outline_panel.dart:145-153`; `canvas_titles.dart:199-205`; `packages/core/lib/src/widgets/component_builder.dart:93-100` | Text, Markdown and Html widgets enter text editing; page says Text only (subset). |
| Mouse: Shift = one axis, Alt/Option = drag a copy, resize Shift = ratio, Alt/Option = from center, snapping off | ok | `designer_board_controller.dart:203`, `:310`; `move_tool.dart:116-183`; `move_action_handler.dart:31-44`; `resize_tool.dart:47-69`; `place_board.dart:113` | |
| Middle-click closes a tab | ok | `lib/tabs_view.dart:175` (`onTertiaryTapUp`) | |
| Run: Ctrl/Cmd+P opens **Embedded preview**; Shift+R restart; Ctrl/Cmd+F fullscreen; restart label **Hot Reload** (local) / **Hot Restart** (cloud); **Play** has no key | ok | `nowa_run_actions.dart:8-41`, `actions_setup.dart:18-22`, `lib/project/top_bar_mapper.dart:143`, `lib/project/run/run_button.dart:609`; no activator for `PlaySelectionIntent`; Play button `canvas_titles.dart:247` | Esc in the preview is mapped to an empty action (`nowa_run_actions.dart:17-23`), correctly not listed. |
| Chat: Enter sends; Shift/Ctrl/Cmd+Enter new line; Alt/Option+Backspace deletes previous word; paste; `@` list Up/Down/Enter/Esc | ok | `ai_chat_field.dart:62-105`, `:812-833` | New-line keys rely on Flutter's default newline after the handler returns `ignored` (code comment at `:78`); same wording as `docs/ai/chat.md`. |
| Pickers: Up/Down, Enter, Backspace (when field is empty and **to cancel selected action** shows), Esc; list of pickers | ok | `command_palette_modal.dart:145-149`; `command_palette_instructions.dart:29-69`; controller `backspaceWillBeHandled` (`command_palette_controller.dart:189-195`); users `attachement_menu.dart:13`, `add_template_action.dart:46`, `tab_actions.dart:30`, `widget_picker.dart:144`; **Add context** tooltip `attachements_view.dart:98` | |
| Circuit: Up/Down select, Shift+Up/Down move, Backspace removes, Undo/Redo | ok | `packages/code/lib/src/circuit_workspace.dart:94-114`, `circuit_actions.dart:7-75` | |
| Circuit: "Delete works too" on Windows/Linux | ok | `setup_general_actions.dart:41` + Flutter `ShortcutManager.handleKeypress` finds the action from the focused context (`/home/user/flutter/packages/flutter/lib/src/widgets/shortcuts.dart:928-929`) | Deduced from the mechanism, not run in the app. |
| Tabs (code mode): Ctrl/Cmd+T (**New Tab**, one at a time), Control+Tab and Control+Shift+Tab on macOS, Ctrl/Cmd+W; Ctrl/Cmd+W in the designer shows **Nothing is open** | ok | `setup_general_actions.dart:36-39`; `lib/keyup_activator.dart:21-73` (`control: true` on every OS, meta must be off); `lib/empty_editor.dart:18`; `tab_actions.dart:120-138`; `packages/core/lib/src/providers/editor_provider.dart:190-242`; `lib/project/panels/empty_workspace.dart:26` | The tab's own name is **New tab**; its page says **Empty Tab**. |
| Code editor: Save, Find, Replace (Ctrl/Cmd+Alt+F), match case Ctrl/Cmd+Alt+C, regex Ctrl/Cmd+Alt+R, Esc closes Find, comment line / block, delete line (D), select line (L), Alt/Option+Up/Down, Tab / Shift+Tab, redo Shift+Z, Ctrl/Cmd+click go to definition (Dart only), **Aa** and `.*` | ok | Nowa save override `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:184`; `/root/.pub-cache/hosted/pub.dev/re_editor-0.10.0/lib/src/code_shortcuts.dart:275-604` (Mac set, then common set); `packages/core/lib/src/widgets/code_editor/find.dart:111-123`; go to definition `nowa_code_editor.dart:76-97` | Writer's note cites `_code_shortcuts.dart`; the activator maps are in `code_shortcuts.dart`. |
| When nothing happens: focus, typing guards, playing, View Only (copy, tab keys, Ctrl/Cmd+W), pop-ups (Ctrl/Cmd+O, K) | ok | `designer_setup.dart:119`, `:131-135`; `tool_actions.dart:15-17`; guards in `designer_actions.dart:124`, `:139`, `:234`, `widget_actions.dart:66`, `:105`, `:150`, `general_actions.dart:93`, `undo_actions.dart:20`, `:35`; `setup_general_actions.dart:63-68`; `packages/core/lib/src/models/project.dart:20`, `project_provider.dart:573`; `tab_actions.dart:70-73`, `add_actions.dart:8-11` | **View Only** role name: `MemberRole.viewer.detailedName`. Pan and zoom in View only: `ViewOnlyController` (`designer_board_controller.dart:343-423`). |
| "A browser keeps some combinations for itself, such as Ctrl/Cmd+W" | ok (platform fact) | n/a | Not product code. Hedged with "may"; Ctrl/Cmd+W, T and Ctrl+Tab are reserved by browsers. Kept. |
| All 14 relative links resolve to files listed in `pages.md`; `#sidebar-panels` anchor is the heading | ok | link check | Link texts equal target titles. |

### Left out on purpose (checked, not added)

- Esc in the **Embedded preview** and in old device-frame play mode (no effect in the released UI): `nowa_run_actions.dart:17-23`, `play_mode.dart:104`.
- `/` focuses the AI chat: only mounted with the experimental New UX bottom bar (`packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:43`).
- Ctrl/Cmd+0 (10th sidebar item only with New UX **Debug**), the unused native menu bar (`lib/project/nowa_menu_bar.dart`, never mounted).
- Gradient stop remove with Backspace/Delete (`packages/core/lib/src/fields/gradient_fields.dart:370-381`) and `$` in a Details text field (`basic_fields.dart:101`): owned by the Details and expressions pages.
- Shift+click in the **Details** constraints box pins two opposite sides (`packages/designer/lib/src/details/positioned_details.dart:202-232`): already on `docs/design/layout.md:46`.
- Files panel Cut and Paste: no Copy exists there, Paste target is unclear (`lib/project/panels/files_panel/files_panel.dart:41-50`).

## Page 2: `docs/reference/glossary.md`

Written by the orchestrator from `_rewrite/glossary.md`, no writer notes. Each term was checked against the code (label and meaning) and against the
verified page it links to. All 46 links resolve to files in `pages.md`, link texts equal the target page titles, and every `#anchor` exists
(`modes.md#agent-mode`, `#design-mode`, `#plan-mode`, `#set-the-thinking-level`; `boards.md#know-your-board-items`;
`undo-and-history.md#start-a-new-session`; `editor-tour.md#sidebar-and-panels`). Compiles as MDX (scratch compile, no site build). About 1,190 words,
one line per term, alphabetical.

### Fixed

| Term | Verdict | Code ref | Note |
|---|---|---|---|
| Board item: "loose widget ... with its own title bar (**Play**, **Open in new tab**)" | fixed | `packages/designer/lib/src/panels/canvas_titles.dart:30-33` (titles only for `c.isComponent` canvases), `:98`, `:118` | Only screens and components have a title bar; loose widgets have none (`docs/design/boards.md` "Know your board items", `docs/test/instant-play.md` "Play any widget"). Now says so and links the anchor. |
| Checkpoint: "**Restore Checkpoint** undoes that request's changes" | fixed | `packages/ai/lib/src/ui/content_views.dart:140-188`, `packages/ai/lib/src/checkpoints/checkpoint_manager.dart:11-23` (`restoreCheckpointChain`) | Restore also undoes every later request in the session (`docs/ai/undo-and-history.md`). Labels **Restore Checkpoint** / **Reapply Checkpoint** are right. |
| Cloud project: "Open it from any browser" | fixed | `docs/get-started/cloud-and-local.md` (web app and desktop app) | Now "on any device you sign in on". |
| Deploy: "builds and publishes your app to the web, Android or iOS" | fixed | `lib/project/run/deploy_button.dart:100`, `:239-356`; `docs/publish/index.md` | Web is published live; Android and iOS are builds (Android store upload is manual, iOS goes to App Store Connect). Cloud projects only. |
| Thinking level: "How long Nowa AI thinks before answering" | fixed | `packages/ai/lib/src/agent/agent.dart:12-28`, `tier_selector.dart:29` | The levels trade speed for reasoning: **Instant** "Fastest", **Thinking** "Balanced" (default), **Deep Thinking** "Extra reasoning". Linked to `modes.md#set-the-thinking-level`. |
| Share Preview: "let anyone try a screen in their browser" | fixed | `packages/designer/lib/src/play_mode/play_mode.dart:508` (button **Share preview**), `:664` (popup **Share Preview**); `docs/test/share.md` | Private shares reach project members only; the link is for the whole app, not one screen. Cloud projects only. |
| Variable: "A value your app remembers" | fixed | `docs/logic/variables.md` | Now "A named value a screen or component remembers while it is open". |
| Widget picker: `<kbd>⌘</kbd>` | fixed | `docs/reference/shortcuts.md` | Key written as **Cmd** like every other page. Key and **Widget** tool confirmed: `designer_setup.dart:48`, `designer_tools.dart:174`. |
| Renamed table: old label "Replay (AI changes)" | fixed | `_rewrite/old-docs/ai/howtouseai.mdx:149` | The old label was **Replay checkpoint**. |

### Refined (correct before, now complete)

Public project (adds **Project Details** → **Sharing**, `sharing_settings.dart:21`, `:181`), Run (names the **Embedded preview**, `run_button.dart:609`),
Screen (**Page** in the **Widgets** panel, `lib/project/panels/widgets_panel/widgets_panel.dart:15`, `:331-334`), Widgets panel (**Page** / **Component**, link),
Parameter (**Params** label), Connector (labeled **MCP**, `ai_chat_field.dart:391`), Local project (**On this device**, `packages/nowa_ui/lib/dashboard/projects_view.dart:495`),
Model (**New Model...**), Wrapper (**Add Wrapper**), anchors on Agent / Design / Plan mode, Board item, Session, Thinking level, Widgets panel.

### Added terms (the working glossary lists them; labels and pages checked)

| Term | Code ref | Linked page |
|---|---|---|
| Console (**Problems**, **Logs**) | `lib/status_bar.dart:170`, `packages/core/lib/src/panels/logs_and_errors_panel.dart:14-15` | `test/problems.md` |
| Dashboard (**What do you want to build?**, **Projects**) | `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:593`, `projects_view.dart:221` | `account/projects.md` |
| External agent (**Connect External Agent**, desktop and agent grant) | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:19-25` | `ai/external-agent.md` (says Enterprise only) |
| Files panel (`lib`, `boards`, `assets`, **assets** row) | `lib/project/panels/left_panel.dart:32`, `side_bar.dart:62-65` | `code/files.md` |
| Project settings (gear **Settings**) | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:754-755`, `packages/core/lib/src/settings/project_settings.dart:21-24` | `account/project-settings.md` |
| Support panel (**Your tickets**, **Report an issue**, **Chat with support**) | `packages/nowa_ui/lib/components/support_dialog.dart:473-540` | `account/help.md` |
| Variables panel (**Params**, **Variables**, **Functions**, **Globals**) | `packages/designer/lib/src/designer_setup.dart:208-214` | `logic/variables.md` |

### Checked and ok (unchanged)

| Term | Verdict | Code ref | Note |
|---|---|---|---|
| Agent mode, Design mode, Plan mode, chips **Agent** / **Design** / **Plan** | ok | `packages/ai/lib/src/assistant_options_manager.dart:7-22`, `mode_selector.dart:51` | Definitions match `docs/ai/modes.md`. |
| AI Assistant (panel) and **Assistant** (icon) | ok | `ai_chat_panel.dart:46`, `side_bar.dart:37` | |
| AppState | ok | `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:32`, `:62`, `:83` | All three default bundles include it. |
| Board (board chip in the top bar, **Create new board**) | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:290`, `:350` | |
| Circuit, Component, Constants (**Custom Constants**), Details panel, Event (**On Pressed**, **On Tap**), Global state, Model, Outline, Theme (**Themes** panel), Widget, Workspace, Wrapper (Padding, Scroll View) | ok | `constants_settings.dart:158`; `packages/core/lib/src/wrappers_to_add.dart:58`; definitions match the linked pages | One-line definitions agree with `circuit.md`, `components.md`, `constants.md`, `properties.md`, `events.md`, `global-state.md`, `models.md`, `outline.md`, `themes.md`, `workspaces.md`, `wrappers.md`. |
| Code mode (`<>` button in the top bar) | ok | `packages/nowa_ui/lib/top_bar/top_bar_contract.dart:282`, `top_bar_view.dart:732` | |
| Desktop app (macOS and Windows) | ok | `docs/get-started/desktop-app.md` | |
| Instant Play (button **Play**) | ok | `canvas_titles.dart:247` | |
| Local project (desktop only) | ok | `docs/get-started/cloud-and-local.md` | |
| Nowa AI | ok | `docs/ai/index.md` | |
| Playground (`app.nowa.dev/playground`) | ok | `lib/router.dart:268`, `lib/sandbox/sandbox_save.dart:103` | |
| Session (**New Session**, **Chat History**) | ok | `ai_chat_panel.dart:55`, `:74` | |
| Widget picker (**Widget** tool, Ctrl/Cmd+K) | ok | `designer_setup.dart:48`, `designer_tools.dart:174`, `widget_picker.dart:146` | |
| Widgets panel is not the widget picker | ok | `widgets_panel.dart:15` (`PreviewType { page, component }`) | |

### Renamed or removed: support for each row

Rule: the old name must appear in the old docs or What's New; the new name must be in the released code.

| Row | Old name seen in | New name in code |
|---|---|---|
| Think Mode to Thinking levels | old docs `ai/howtouseai.mdx:43-47` (Think Mode, brain toggle); What's New 3.5 `docs/new/whats-new.md:457-460` (Instant, Thinking, Deep Thinking) | `agent.dart:21-28`, `tier_selector.dart:29` |
| New Chat to **New Session** | old docs `ai/howtouseai.mdx:164` ("click **New Chat**") | `ai_chat_panel.dart:55` |
| Replay checkpoint to **Reapply Checkpoint** | old docs `ai/howtouseai.mdx:149` | `content_views.dart:189` |
| Instant preview, Play mode to Instant Play (**Play**) | old docs `getting-started/exploreinterface.mdx:91-94` (Play Mode), `hybrid-approach/custom-code.md:51` (Instant preview mode), `local-project-simulator/simulator.md:23`; What's New `whats-new.md:13`, `:27`, `:251`, `:1137` | `canvas_titles.dart:247` |
| Instant Preview Share to **Share preview** (added) | old docs `deployment/share.md:9` ("deprecated and replaced by ... a QR code/link"); What's New `whats-new.md:627-628` | `play_mode.dart:508` |
| New Cloud Project to **New project** / **What do you want to build?** | old docs `getting-started/quickstart.md:15-16`, `getting-started/install.md:122-123` | `projects_view.dart:313`, `describe_app_panel.dart:593` |
| Assets panel to the **assets** folder in **Files** | old docs `ui/assets.md:25`, `:42`, `:46`; What's New 3.9 `whats-new.md:255` announced an Assets panel | Released sidebar has no Assets icon (`side_bar.dart:34-99`); `left_panel.dart:42` routes `'Assets'` but nothing opens it. Assets live under **Files** (`docs/design/assets.md`). |

## Open issues

1. Sidebar numbers, two edge cases not on the page. The key map is a `static` built once per app session (`lib/setup_general_actions.dart:24`) from `MainSidebar.getIcons()`, which includes **Outline** and, outside the playground and guest sessions, **Git**. So (a) switching between the playground and a signed-in project in one session without a reload can leave the key map one entry off from the panel list (`lib/project/panels/panel_actions.dart:19-24` reads the list fresh); (b) on a screen opened on its own the **Outline** icon is hidden (`side_bar.dart:129`) but Ctrl/Cmd+7 still means **Outline**, so the icon tooltips for **Api** and **Supabase** read one number too low (`side_bar.dart:421-423`). The page lists keys by panel name, which is correct, and does not promise tooltip text. Needs an in-app check before anything is added.
2. Browser-reserved combinations (**Browser** bullet): kept as a hedged platform fact; which of Ctrl/Cmd+T, W, Tab reach the web app in each browser was not tested.
3. Deduced, not run in the app: Ctrl/Cmd+Enter inserting a new line in the AI chat (handler returns `ignored`, `ai_chat_field.dart:73-86`; same wording as `docs/ai/chat.md`), Delete removing a Circuit node on Windows/Linux (Flutter `ShortcutManager` resolves the action from the focused context), and Alt/Option+drag also copying a screen or component board item (code copies any movable widget; page says "a copy of the selection").
4. Length: `shortcuts.md` is about 1,880 words, but about a third is the macOS column repeating the Windows/Linux keys, as the brief asks. Not cut.
5. 3.13 (dev) will change many rows (Ctrl/Cmd+K opens the Library, Ctrl/Cmd+O becomes "Go to a widget" in the designer, Ctrl/Cmd+B opens a board picker, Back/Forward keys, new reorder keys, a corrected sheet, Files panel keys, new panel numbers; see `_rewrite/upcoming-3.13.md`). The sheet section says "In the current release (3.12.5)" on purpose: update it, the **Open widget picker** / **Bring to front** rows and the Sidebar table when 3.13 ships. The glossary's **Widget picker** (Ctrl/Cmd+K) and **Widgets panel** entries change with the Library.
6. Writer-notes slips (no page impact): the `re_editor` activator maps are in `code_shortcuts.dart:275-604`, not `_code_shortcuts.dart`; notes cite `side_bar.dart:151` for **Router** `showShortcut: false` (it is `:150`).
