# P15-M04 media: Getting started and editor basics

Batch M04, 29 items. Every image and every video sheet was looked at. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Reference for 3.13: `static/img/docs/get-started/get-started-editor-tour-1.png`
(top bar with starting-point chip, Back/Forward, Boards chip; sidebar Assistant, Library, Themes, Search, Outline, Api,
Supabase, Router; no Files icon; board toolbar at the bottom with five tools and no Play button).

Almost every old item here was recorded on Nowa 3.0.x beta: BETA badge, file tabs in the top bar, Feedback and Upgrade
buttons, toolbar at the top of the board with a Play button, a Files panel (folder icon) and a Widgets panel with
Page/Component tabs. All of those changed in 3.13, so those items are OUTDATED.

## Items

| id | old page | what it shows | verdict | why | where added / covering image |
|---|---|---|---|---|---|
| m107 | getting-started/exploreinterface.mdx | Whole editor of a new project (v3.0.6-beta) | OUTDATED | BETA top bar with board tab and +, Feedback/Upgrade, toolbar at top with Play, Files icon in sidebar | covered anyway by `get-started-editor-tour-1.png` |
| m108 | getting-started/exploreinterface.mdx | Video: toolbar tools, template and widget pickers, play mode | OUTDATED | Toolbar at the top with a Play button and the old Play Settings mode; 3.13 toolbar is at the bottom with five tools | - |
| m109 | getting-started/exploreinterface.mdx | Video: selecting the screen and scrolling Details | OUTDATED | v3.0.7-beta editor; Screen section has no Route Settings, old top bar | covered by `design-screens-2.png` |
| m110 | getting-started/exploreinterface.mdx | Video: opening Variables, Globals with AppState | OUTDATED | v3.0.7-beta editor (top bar, toolbar, Files icon) | - |
| m111 | getting-started/exploreinterface.mdx | AI Assistant panel, "2/5 messages used", Build something wild... | OUTDATED | 3.13 Assistant panel and modes (Design, Plan, Agent) differ; old editor around it | - |
| m112 | getting-started/exploreinterface.mdx | API Collections panel with TheCatAPI | OUTDATED | Whole-editor shot of v3.0.7-beta (old top bar, Files icon, toolbar with Play) | - |
| m113 | getting-started/exploreinterface.mdx | Files panel (lib, boards, assets) | OUTDATED | Files panel removed in 3.13; project files live in the Library | - |
| m114 | getting-started/exploreinterface.mdx | Video: Play button on the toolbar opens the old Play Settings mode | OUTDATED | Toolbar Play button and Play Settings overlay replaced in 3.13 | - |
| m115 | getting-started/exploreinterface.mdx | Build settings popup (Device: Windows) | OUTDATED | Old top-bar play dropdown; not in 3.13 top bar | - |
| m116 | getting-started/exploreinterface.mdx | Supabase panel with Connect and Use Keys | OUTDATED | Whole-editor shot of v3.0.7-beta; old layout around the panel | - |
| m117 | getting-started/exploreinterface.mdx | Themes panel (lightTheme, colors, typography) | OUTDATED | Whole-editor shot of v3.0.7-beta; old layout around the panel | - |
| m118 | getting-started/exploreinterface.mdx | Video: old widget picker (All, Builtin, Components) and adding Html | OUTDATED | 3.13 adds widgets from the Library (Project, Packages, Built-in, Assets chips) | covered by `design-add-widgets-1.png` and `design-add-widgets-video.mp4` |
| m119 | getting-started/exploreinterface.mdx | Circuit for onPressed of an ElevatedButton: showDialog, openUrl, Details with Expression: and Url | ADD | Circuit window, step boxes and the `Expression:` details label are the same in 3.13 (`packages/code/lib/src/fields/expression_statement_field.dart:44`; Store result row is hidden for void calls like openUrl, `store_result_field.dart:91`); the Circuit section of the tour had no picture | `docs/get-started/editor-tour.md:96` |
| m130 | getting-started/quickstart.md | Video: old dashboard, New Cloud Project, Create Cloud Project dialog | OUTDATED | 3.13 dashboard starts from the prompt box and New project menu; Cloud Projects / Local Projects sidebar gone | covered by `get-started-first-app-1.png`, `account-projects-1.png` |
| m131 | getting-started/quickstart.md | Video: AI Assistant builds a stopwatch (v3.0.4-beta) | OUTDATED | Old Assistant panel and editor; 3.13 has Design/Plan/Agent modes | covered by `get-started-first-app-2.png` |
| m132 | getting-started/quickstart.md | Video: changing an icon colour from the theme in Details | OUTDATED | v3.0.4-beta editor (Outline box, top toolbar with Play, old top bar) | - |
| m133 | getting-started/quickstart.md | Video: the finished stopwatch app running (Start, Stop, Reset) | NOT USEFUL | Shows only the running app, not anything the reader does; the new first-app tutorial builds a different app (recipes) | - |
| m229 | ui/assets.md | Files panel assets folder with an image preview | OUTDATED | Files panel removed; assets are in the Library under the Assets chip | covered by `design-assets-1.png` |
| m230 | ui/assets.md | Video: upload button in the Files panel, file picker, drag image to board | OUTDATED | Upload from the Files panel's assets row; 3.13 uses Library + menu, Upload Assets... | covered by `design-assets-1.png` |
| m231 | ui/boards.mdx | Video: Empty Tab with New Design Board, New Widget, Upload a File | OUTDATED | File tabs and Empty Tab removed; boards are made from the Boards chip list | covered by `design-boards-1.png` |
| m232 | ui/components.md | Video: New Component from Column dialog | OUTDATED | Dialog is similar but every frame shows the old editor (BETA top bar, tabs, toolbar with Play) | covered by `design-components-1.png` |
| m233 | ui/components.md | Video: editing a component's text colour updates all copies | OUTDATED | Old Widgets panel (Page/Component tabs) and old editor in every frame | - |
| m234 | ui/components.md | Video: making a component param and setting it per copy | OUTDATED | Old editor in every frame (tabs, toolbar with Play) | - |
| m248 | ui/outline.md | Video: expanding rows in the Outline box | OUTDATED | Old editor around the Outline (BETA top bar, file tabs, toolbar with Play) | covered by `design-outline-1.png`, `design-outline-2.png` |
| m249 | ui/screens.md | Video: Screen tool, template list, New Empty Page dialog | OUTDATED | Template list and dialog names differ (Empty Page, Basic Cards), old editor | covered by `design-screens-1.png` |
| m250 | ui/screens.md | Files panel lib/pages with screen files | OUTDATED | Files panel removed in 3.13 | - |
| m251 | ui/screens.md | Annotated Details panel of a screen (1-10 callouts) | COVERED | `design-screens-2.png` shows the same Screen section in 3.13; the old one also lacks Route Settings | `design-screens-2.png` |
| m252 | ui/temlpates.mdx | Video: template list from the Screen tool, Add Dashboard import dialog | OUTDATED | Files panel, old template list and old Widgets panel in every frame | covered by `design-templates-1.png` |
| m268 | ui/toolbar.md | Toolbar with Select, Container, Screen, Text, Widget and Play | OUTDATED | 3.13 toolbar has no Play button and sits at the bottom of the board | covered by `get-started-editor-tour-1.png` (callout 6) |
| m269 | ui/widget-panel.md | Video: Widgets panel with Page and Component tabs, dragging a component | OUTDATED | Widgets panel replaced by the Library in 3.13 | covered by `design-library-1.png` |

## Added

1 item.

- m119: `/img/exploreinterface/circle.png` (in repo, referenced at its current path) added to
  `docs/get-started/editor-tour.md:96`, after the paragraph on how Circuit opens.

No files copied, cut or re-encoded.

## Routed

None.

## Open questions

None.

## Counts

ADD 1, COVERED 1, OUTDATED 26, NOT USEFUL 1, PRIVACY 0.
