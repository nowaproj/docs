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
