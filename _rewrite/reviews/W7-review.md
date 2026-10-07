# W7 review: Preview and test (index, instant-play, run, devices, share, problems) + Troubleshooting (index, known-issues)

Verifier run against `/home/user/nowa-master` (v3.12.5, b84bfdafd). Pages are appended below as each one is finished.
Summary is filled in when all eight pages are done (status: IN PROGRESS).

Pages done so far: test/index.md, test/instant-play.md

Notes on sources: `W11b-writer-notes.md` does not exist (the troubleshooting index has no notes file, the page was written in the W19 leftovers run), so every quoted message in `troubleshooting/` was checked straight in the code. Style scan over all eight pages (hype words, emoji, `---` rules, H1 in body): clean, apart from one "just as" fixed in `instant-play.md`.

## test/index.md (Preview and test)

Front matter ok (title, description, sidebar_label, keywords). No H1, sentence-case headings, no admonition, no emoji, no `---` rules, no hype words. About 500 words. No capture placeholder (the table does the job). Links ok: `../get-started/mobile.md` ("Use Nowa on your phone"), `instant-play.md`, `run.md`, `devices.md`, `share.md`, `problems.md`, `../troubleshooting/index.md`, `../publish/index.md` (all in `pages.md`).

| claim | verdict | code ref | note |
|---|---|---|---|
| **Play** runs a screen on the board; **Run** builds the real app | ok | `packages/designer/lib/src/panels/canvas_titles.dart:237-261`, `lib/project/run/run_button.dart:153-226` | |
| "A link lets anyone else tap through it" (intro) and "share a preview with anyone" (description) | fixed | `packages/designer/lib/src/play_mode/play_mode.dart:731-768` | the link opens for anyone only when **Public** is chosen; **Private** is members only. Now "other people" / "a preview link" |
| Instant Play interprets your app (instant, close not exact); Run compiles the real Flutter app | ok | `play_mode.dart:470-475` (`mode: RunMode.simulate`), `packages/core/lib/src/interpreter/scope.dart:155` (only `designer` and `simulate` exist) | Run: Nowa Run session, `packages/nowa_run/lib/src/nowa_run_plugin.dart:12-45` |
| Start: **Play** on a screen's name bar / right-click **Play**; **Run** in the top bar | fixed (wording) | `canvas_titles.dart:212,247`, `packages/designer/lib/src/menus/widget_context_menu.dart:35-39`, `lib/project/top_bar.dart:328-335` | "name bar" is not what the other pages (`design/boards.md`, `get-started/editor-tour.md`, glossary) call it; now "title bar", same fix on `instant-play.md` |
| Run speed: first start can take a few minutes, then every save updates it | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:74-130` ("This may take a few minutes..."), `nowa_run_plugin.dart:60` (`onSave` -> `applySavedCode`), `nowa_run_manager.dart:84` | |
| Own code and packages: placeholder or left out on the board; all of it runs in Run | ok | `docs/interpreter_limitations.md` ("A declaration using one of these is skipped", "An unsupported package appears as placeholders in the designer") | |
| Features that need a phone: maps, Firebase sign-in are placeholders / simulated in Instant Play | ok | `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:19-77`, `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:130-160` | Run side stays "when you run on a phone or an emulator", matching the in-app text "Run on a simulator/emulator or mobile device to preview" |
| Share it: **Share preview** (link + QR, cloud projects); **Open on Mobile** (QR, cloud projects) | ok | `play_mode.dart:44-55` (local project gets the sync notice), `packages/nowa_ui/lib/top_bar/top_bar_view.dart:812-861`, `lib/project/top_bar_mapper.dart:127-146` | `openLabel` = "Open in Browser" (local) / "Open on Mobile" (cloud); the QR icon only appears for cloud runs |
| In the playground: Instant Play yes; Run no, top bar shows **Save** | ok | `lib/project/top_bar.dart:331-334`, `lib/sandbox/sandbox_save.dart:37-50` | the button reads **Save**, or **Save to keep changes** once there are edits; `nowa_run_plugin.dart:12` registers no run manager in a sandbox |
| Warning icon text "In board preview is not 100% accurate, run the app to see the real output" | ok | `play_mode.dart:539` | exact; it is a tooltip on a disabled icon button, hover shows it (`nicon.dart:131-139`) |
| Phone: **Play** opens **Play your app**: **Instant preview** (**SIMULATED**), **Run real app** (**REAL APP**) | ok | `lib/project/nowago/mobile_view.dart:66-128,336-341` | without a run manager (playground) the sheet is skipped; `get-started/mobile.md:57` says so |
| Section list: five pages, one line each | ok | `pages.md` rows W7 | |

## test/instant-play.md (Play your app on the board)

Front matter ok. No H1, sentence-case headings, no admonition, no emoji, no `---` rules. About 720 words. Capture `test-instant-play-1` well formed (requested in `captures/requests/`). Links ok: `share.md`, `run.md`, `devices.md`, `problems.md`, `../code/limitations.md`, `../design/boards.md`.

| claim | verdict | code ref | note |
|---|---|---|---|
| Hover the title above a screen/component, or select the item: a play button appears (tooltip **Play**) | ok | `canvas_titles.dart:31,212,237-261` (`visible: hovering \|\| isSelected`), `packages/core/lib/src/board/board_canvas.dart:169-173` (`isComponent`: screens and components only) | wording fixed to "title bar" |
| Board zooms to the item; orange border; item comes alive | ok | `canvas_titles.dart:248-252` (`zoomLevel: 0.75`), `play_mode.dart:388-415` (4 px `primaryColor` border), `packages/nowa_ui/lib/src/globals/nowa_colors.dart:3` (0xFFFFAB3F, orange) | |
| Scrolling over the playing item scrolls the app, not the board | ok | `packages/designer/lib/src/design_experience/designer_board_controller.dart:66-70,128-139` (pointer events over the playing canvas are not handled by the board), toolbar text `play_mode.dart:502` | |
| **Stop** in the item's title bar and in the bottom controls | ok | `canvas_titles.dart:247` (tooltip `Stop` while playing), `play_mode.dart:524-537` | |
| Bottom toolbar replaced by play controls while playing | ok | `packages/designer/lib/src/panels/designer_board.dart:129-142` | |
| Controls table: **This screen is capturing scroll**, **Share preview**, **Reset zoom**, **Stop**, warning icon | ok | `play_mode.dart:481-545` | exact labels/tooltips |
| **Share preview**: cloud projects only | ok | `play_mode.dart:44-55`, `packages/core/lib/src/settings/project_sync_settings.dart:482-541` | local: "Share preview is not available on local projects" + **Sync to cloud** |
| **Reset zoom** zooms back onto the playing item | ok | `play_mode.dart:520-527` | |
| Right-click **Play** plays the whole board item (screen, component, loose widget) | ok | `widget_context_menu.dart:34-39`, `packages/designer/lib/src/play_mode/board_play_controller.dart:53-63` (`selectedCanvas`), `packages/designer/lib/src/actions/designer_actions.dart:279-296` | |
| **Play** shows only when exactly one widget is selected and nothing plays | ok | `widget_context_menu.dart:35`, `board_play_controller.dart:57-60` | |
| Select another item while playing: it plays instead, no need to stop | ok | `packages/designer/lib/src/design/designer.dart:35-40` | |
| Playing item can't be moved or resized; clicks go to the app; designer shortcuts off | ok | `designer_board_controller.dart:87-91,109,214,291`, `packages/designer/lib/src/designer_setup.dart:133-136` | |
| Accuracy note text | ok | `play_mode.dart:539` | exact |
| Custom code / packages show as placeholders or not at all | ok | `docs/interpreter_limitations.md`, `ast_to_block_visitor.dart` fallback (see `problems.md`) | |
| **Google Maps** and **RevenueCat Paywall** say "Run on a simulator/emulator or mobile device to preview" | ok | `integration_preview_view.dart:19-77`, `google_maps_package_config.dart:137`, `revenuecat_package_config.dart:141-145`, `widgets_to_add.dart:910,918` | the board itself shows a "Run to preview" placeholder; the note is what Play shows |
| Firebase sign-in is simulated, you pick a test user or a test error | ok | `fb_auth_blocks.dart:130-160` ("Test with fake Google user", "Test error signing in") | |
| Board placeholders: `[name]`, three sample items, stand-in picture; Play runs real logic (empty list stays empty) | ok | `packages/core/lib/src/interpreter/mock.dart:210-290` (`'[${name}]'`, `List.generate(3`, `mockImage`), `block_tree.dart:787,3571,5902` (`mode != RunMode.designer` -> no mock) | writer's note is right: placeholders are board-only (research said otherwise) |
| "just as in the real app" | fixed (style) | | "just" is on the style guide's avoid list: now "as it does in the real app" |
