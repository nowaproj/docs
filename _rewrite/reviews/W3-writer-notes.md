# W3 writer notes (Design your app, batch W3)

Pages: `docs/design/index.md`, `boards.md`, `screens.md`, `components.md`, `add-widgets.md`, `select-and-edit.md`, `outline.md`.
Sources: `research/features-designer-core.md` (DC), `research/features-editor-shell.md` (ES), `research/features-ai.md`,
`research/features-theme-assets.md` (TA), `research/features-widgets.md` (WI, draft: catalog skeleton only, no picker section).
Code paths are relative to `/home/user/nowa-master` (v3.12.5). Screenshots of the real editor: `captures/ui-map/*.png`.

General notes
- MDX: `.md` files are compiled as MDX (no `markdown.format` in `docusaurus.config.js`), so no bare `<...>` or `{...}` in prose.
- No 3.13 (dev) behaviour is documented (D1): Library panel, board picker with Back/Forward, "Bring to front" renames are left out.
