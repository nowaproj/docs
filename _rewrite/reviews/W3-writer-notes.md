# W3 writer notes (Design your app, batch W3)

Pages: `docs/design/index.md`, `boards.md`, `screens.md`, `components.md`, `add-widgets.md`, `select-and-edit.md`, `outline.md`.
Sources: `research/features-designer-core.md` (DC), `research/features-editor-shell.md` (ES), `research/features-ai.md`,
`research/features-theme-assets.md` (TA), `research/features-widgets.md` (WI, draft: catalog skeleton only, no picker section).
Code paths are relative to `/home/user/nowa-master` (v3.12.5). Screenshots of the real editor: `captures/ui-map/*.png`.

General notes
- MDX: `.md` files are compiled as MDX (no `markdown.format` in `docusaurus.config.js`), so no bare `<...>` or `{...}` in prose.
- No 3.13 (dev) behaviour is documented (D1): Library panel, board picker with Back/Forward, "Bring to front" renames are left out.

## docs/design/index.md (How designing works)
- Board/board item/loose widget model: DC "Boards", "Board items (canvases)" (`packages/designer/lib/src/panels/canvas_titles.dart:31`, `packages/core/lib/src/file_system/board_file.dart:146-149` (JSON holds `color`, `showGrid`, `canvases`)). Loose widgets live only in the `.board` file (DC). "Not part of your app until placed in a screen" is my inference (the app compiles `lib/`, not `.board`); flagged for the verifier.
- Title bar: **Play** shows on hover or when selected, **Open in new tab** only on hover (`canvas_titles.dart:236-238`, `:200-210` `_buildPlayButton`/`_buildOpenIcon`).
- Panels: Widgets, Outline, toolbar, Details, Variables: ES "Editor layout", `packages/designer/lib/src/designer_setup.dart:196-224`. With nothing selected **Details** shows **Show Grid**/**Board Color**/**Reset** (`packages/designer/lib/src/details/empty_details.dart`).
- "AI places new screens on the board" and "selected widget auto-attached": features-ai.md "Created Widgets" (auto-placement only when a board is the active tab) and "Add context".
- Mobile: no board on phone-size windows (`lib/project/project_page.dart:105`, `packages/nowa_ui/lib/src/globals/responsive_utils.dart:63`).
- Left out on purpose: panel number shortcuts (Ctrl/Cmd+number) because ES open questions 2-3 say tooltips and shortcuts can disagree (Git absent in playground, Outline hidden).

## docs/design/boards.md (Work with boards)
- Board chip, menu, hover **Rename**/**Delete** tooltips, **Create new board**; dimmed chip returns to the board: `packages/nowa_ui/lib/top_bar/top_bar_view.dart:318-420` (`TopBarBoardChip`, `TopBarBoardTile`), `lib/project/top_bar_mapper.dart:76` (label `Board` off a board).
- New-board dialog title "New Board", field hint "Board name", **Cancel**/**Submit**: `packages/designer/lib/src/actions/file_actions.dart:11-25`, `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:97-135`, `file_name_text_field.dart:178`.
- "Login flow" becomes `loginFlow`: `CreateFileResult.fileName` snake_cases (`file_name_text_field.dart:29-37`), then `_recordCreateBoardFile` -> `generateSymbolName` camel-cases (`packages/core/lib/src/file_system/naming.dart:135-158`, `recase` package). Derived from reading code, not run in the app (DC open question 3 asked the same). Rename uses another path (`RenameFileDialogAction`, snake_case file name), so I only claim the creation behaviour.
- Delete confirm text and **Cancel**/**Yes**: `packages/core/lib/src/file_system/actions/file_actions.dart:121-150`, `packages/core/lib/src/widgets/nowa_dialogs.dart:6-26`. The deleted board's screens stay (only the `.board` file is removed; no reference check for boards).
- Ctrl/Cmd+B (back to last board, cycles boards when on a board), Ctrl/Cmd+Shift+B: `packages/designer/lib/src/actions/file_actions.dart:29-59`, `packages/designer/lib/src/designer_setup.dart:48-50` (AdaptiveActivator keyB/shift). Not active while Play runs or for view-only users.
- **Show Grid** / **Board Color** / **Reset**: `packages/designer/lib/src/details/board_details.dart:37-71`; defaults (grid off `showGrid ?? false`, light gray `#E7E7E7`): `packages/core/lib/src/file_system/board_file.dart:84-88`, DC.
- Pan/zoom/F: `packages/core/lib/src/board/board_view.dart:183-250`, `packages/designer/lib/src/actions/designer_actions.dart:222-238`. Remembered per board per project: `designer_board_controller.dart:151-166`. Zoom limits not stated on the page.
- Title bar contents/behaviour: `packages/designer/lib/src/panels/canvas_titles.dart:155-300`. "Click the title, then drag" is my reading of `_findMoveInstances` (`designer_board_controller.dart:187-205`): a drag moves the selected items when the pointer is inside the selection, else the hovered widget; not tested in the app.
- Toolbar labels/keys: `packages/designer/lib/src/widgets/designer_tools.dart:90-160`, `designer_setup.dart:16-18` (V, R, T), `add_actions.dart` (Ctrl/Cmd+K). **Screen** hidden when the active editor is a `DartEditor` (`designer_tools.dart:250-254`).
- Remove vs Delete: `widget_context_menu.dart:43-47` (**Remove**), `packages/core/lib/src/actions/general_actions.dart:20-98`, Widgets panel `RemoveDeclarationAction`; remove key `packages/core/lib/src/inputs.dart:11-13`.
- Big boards (8 items, hover/select/play animate): `packages/core/lib/src/board/canvas_detail.dart:43-46`, `:123-131`, `:182-188`.
- Error card **This screen failed to render** / **Reload screen**: `packages/designer/lib/src/error_boundary.dart:240-262`.
- View only: `designer_tools.dart:208-219`, `widget_context_menu.dart:20-31`, role `packages/core/lib/src/providers/project_provider.dart:573`.
- Left out: Back/Forward buttons and searchable board picker (3.13 only); "Nothing is open" screen (editor tour page, W1); board code view (debug only).
