# W7 writer notes (Preview and test: index, instant-play, run, devices, share, problems)

Paths are relative to `/home/user/nowa-master` (v3.12.5) unless marked "dev". Research files: `_rewrite/research/features-*.md`.
Code wins over research; contradictions are noted per page. Pages are in `/home/user/docs/docs/test/`.

## instant-play.md (`docs/test/instant-play.md`)

Research: `features-designer-core.md` "Play (Instant Play)", "Board items (canvases)", "Placeholder values on the board"; `features-code-ship.md` "Instant Play vs Run", "Share Preview", "Your own code on the board"; `features-data.md:492` (Firebase auth preview dialog), `:586` (placeholders on the board, real data in Play); What's New 3.9 and 3.12.5.

Code spot-checks (all matched the research unless noted):
- Play button: tooltip **Play** / **Stop**, shown while the title is hovered, the item is selected, or it is playing; zooms the board to the item (zoom 0.75): `packages/designer/lib/src/panels/canvas_titles.dart:212,237-261`. Titles exist only for screens and components (`isComponent`): `canvas_titles.dart:31`.
- Right-click **Play**: only when nothing is playing and exactly one widget is selected, played item = board item that holds it: `packages/designer/lib/src/menus/widget_context_menu.dart:34-39`, `packages/designer/lib/src/play_mode/board_play_controller.dart:53-63`, `packages/designer/lib/src/actions/designer_actions.dart:279-296`.
- Selecting another item while playing plays that one: `packages/designer/lib/src/design/designer.dart:35-40`.
- Play controls replace the bottom toolbar: `packages/designer/lib/src/panels/designer_board.dart:137`; labels and the accuracy tooltip text: `packages/designer/lib/src/play_mode/play_mode.dart:481-545`. Orange (primary color) 4 px border: `play_mode.dart:416`.
- Clicks and right-clicks over the playing item go to the app, not the editor; the playing root can't be moved or resized; designer shortcuts off while playing: `packages/designer/lib/src/design_experience/designer_board_controller.dart:66-70,87-91,109,130,214,291,334`, `packages/designer/lib/src/designer_setup.dart:133-136`.
- Play runs in `RunMode.simulate` (interpreted): `play_mode.dart:470-475`.
- **Share preview** shows the sync notice for local projects: `play_mode.dart:44-55` (details on the share page).
- "Run on a simulator/emulator or mobile device to preview" (Google Maps, RevenueCat Paywall) outside designer mode: `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:19-77`, used by `google_maps_package_config.dart:137-147` and `revenuecat_package_config.dart:145`.
- Firebase sign-in is simulated by a dialog (fake user or error): `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:130-160,220`.

Contradiction with research (code wins): `features-designer-core.md` "Placeholder values on the board" says the placeholders also appear "in Play on the board". The code only mocks values in designer mode (`scope.env?.mode != RunMode.designer` returns early at `packages/core/lib/src/interpreter/block_tree.dart:787,3571,5902`), and Play uses `RunMode.simulate` (`play_mode.dart:474`, `packages/core/lib/src/widgets/block_builder.dart:40-48`). The page therefore says the board shows placeholders and Play runs real logic (an empty list stays empty). `features-data.md:586` agrees ("Real data appears in Instant Play").

Left out and why:
- Navigation inside a played screen (GoRouter initial route is set for GoRouter projects, `play_mode.dart:459-464`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:111-150`): not confirmed how links between screens behave on the board, so the page makes no claim.
- No keyboard shortcut and no Esc to stop Play on the board (`features-designer-core.md` open question): not mentioned.
- No "Or ask Nowa AI" tip: the in-app agent has no tool to play the app in 3.12.5 (`play_app` is in no agent toolset, `features-ai.md` Not user-facing).
- "Play bar" (research term) is not a UI label; the page says "play controls".

Capture requests: test-instant-play-1.
