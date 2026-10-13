# P15 M11 media review: variables, params, functions, data models, global state

Pages owned: `docs/logic/{variables,parameters,functions,global-state,models}.md`.

All 13 local items were recorded on Nowa 2.0.x beta (status bar `v2.0.15-beta`, file tabs across the top, file tree on the left, floating Outline panel, the toolbar with Play at the top centre, and an avatar photo in the top bar). In 3.13 the top bar has the project and board pickers and **Save**, the left side is the sidebar with the **Library**, the toolbar sits at the bottom, and models and global states open in a three-column editor. So a clip is only usable where it is zoomed in on a panel that still looks and works the same, which is true for one of them (m334, cut).

| id | old page | what it shows (one line) | verdict | why (one line) | where added / what covers it |
|---|---|---|---|---|---|
| m329 | vars-params-functions/create-variable.mdx | Whole 2.0.15 editor, arrow pointing at a `name` variable in the Variables panel | COVERED | The same Variables panel with a variable selected is in the current screenshot; the rest of the frame is the old editor, with an avatar photo top right | `/img/docs/logic/logic-variables-1.png` (variables.md:32) |
| m330 | vars-params-functions/create-variable.mdx | GIF: old play mode, "Hello Alex" changes to "Hello John" when Change Name is pressed | OUTDATED | Old editor chrome (file tabs, Play bar, avatar) and the old play mode; 3.13 plays from the screen's title bar. The page's example is a counter, already shown | - |
| m331 | vars-params-functions/data-models.md | File tree + menu: **New Object...**, then the New Object dialog | OUTDATED | 3.13 creates models from **Library** > **Add** > **New Model...** (`add_lib_menu.dart`); "New Object" no longer exists | - |
| m332 | vars-params-functions/data-models.md | Floating `task.dart` popup with **Edit var** / **Edit func** cards to add fields and a function | OUTDATED | 3.13 uses the three-column model editor (class list, Variables/Functions, settings); the popup and "Edit var" are gone | - |
| m333 | vars-params-functions/data-models.md | `task.dart` opened as a code tab, a field added from the code outline side panel | OUTDATED | Old code tab and outline side panel; in 3.13 you reach the code from **View Code** in the model editor | - |
| m334 | vars-params-functions/data-models.md | Variable `taskList`: Select type, search "task", tick **As List**, pick Task, Default Value 3 with item fields | ADD (cut) | First 5.4 s show the old editor chrome and avatar; from 5.4 s the clip is zoomed on Details and matches 3.13 (`Select type`, `As List`, `show more...` in `nowa_fields.dart`; list count, + and numbered items in `list_field.dart`; list type shown as row icon + `Task` in `TypeView`) | models.md:73-75, after step 4 of "Use a model as a type" |
| m335 | vars-params-functions/data-models.md | Circuit: Pick a constructor > Task, Create Task node fields, Store result New Variable, then add to `taskList` | OUTDATED | The node menu's categories differ (NOWABETATESTTWO, NOWA, OPERATORS vs DART:CORE, MATERIAL... now); picking Task skips the Default / fromJson choice 3.13 shows for a model with more than one constructor (`link_menu.dart` `showSubConstructorMenu`); old file tree and floating Outline in several frames | - |
| m336 | vars-params-functions/data-models.md | YouTube: "Using Global State to Track Water Amounts", Water Tracker Part 2 | OUTDATED | Water tracker tutorial series recorded on an older Nowa (brief: OUTDATED unless shown otherwise) | - |
| m337 | vars-params-functions/global-states.md | File tree + menu: New Global State..., New GlobalState dialog, path `lib/cart_state.dart`, then a popup panel | OUTDATED | 3.13 starts from **Library** > **Add**, saves into the `globals` folder, and opens the three-column editor | - |
| m338 | vars-params-functions/global-states.md | Floating `cart_state.dart` popup: Edit var `cartItems`, Edit func `addToCart`, param `product`, then the code | OUTDATED | Same old popup editor as m332; 3.13 uses the three-column global state editor | - |
| m339 | vars-params-functions/global-states.md | Variables panel > Globals: **Pick global state** > CartState, which then lists `cartItems` | OUTDATED | The labels still exist (`global_state_widgets.dart`), but every frame shows the old top bar with file tabs and an avatar photo, so no clean cut is possible; created global states are attached automatically in 3.13 | - |
| m340 | vars-params-functions/global-states.md | Linking a List View to `CartState.cartItems` via the old **Link field** menu, then the cart in play mode | OUTDATED | The old Link menu (Detach..., NOWA, OPERATORS, SHARED PREFERENCES, API, GENERAL) differs from 3.13's (Custom Expression..., Create Param..., Create Variable..., Compute..., LOCALS, GLOBALS, EXPRESSIONS); old chrome | Link menu shown by `/img/docs/logic/logic-expressions-1.png` |
| m341 | vars-params-functions/global-states.md | `addToCart` body built in the old code-tab side panel: add to `cartItems`, then `notifyListeners` | OUTDATED | Built from the old code view side panel with an **Edit** button; 3.13 builds it in the global state editor | Result covered by `/img/docs/logic/logic-global-state-1.png` (global-state.md:46) |
| m342 | vars-params-functions/global-states.md | Icon onTap: CartState.of > addToCart(product), showSnackBar, then the shop app in play mode | OUTDATED | Old **Link field** menu and Details, old play mode and chrome with avatar | - |
| m343 | vars-params-functions/global-states.md | YouTube: same Water Tracker Part 2 video as m336 | NOT USEFUL | Duplicate of m336 (and outdated for the same reason) | - |

## Added

1 item.

- **Cut:** `static/img/vars-params-functions/data-models/model-as-datatype.mp4` (in repo, left in place), 5.4 s to 14.2 s, re-encoded H.264 High, yuv420p, `+faststart`, no audio, saved as `static/videos/docs/logic/logic-models-2.mp4` (8.8 s, 1920x972). I checked every frame of the cut: there is no editor chrome and no avatar, only the board and the Details panel.
- Embedded in `docs/logic/models.md` under "Use a model as a type", with the lead-in "This short video turns a variable named `taskList` into a list of `Task` models and gives it three items:". The video's Task model has an extra `priority` field, which does no harm.

Nothing was copied from the scratchpad (m329 and m330 were not added).

## Routed

None.

## Open questions

- The old floating Outline panel and old Details rows show in the edges of m335's mid-section (9.5 to 23 s), which otherwise matches the page's "Create a model in logic" steps quite closely. I rejected it because of the old node menu and the missing Default / fromJson choice. If the orchestrator wants a picture for that section, a fresh 3.13 capture would be better.
- `python3 -I _rewrite/tools/site-checks.py` reports one problem, `docs/logic/conditions.md:24: bare <dailyGoal>`. That page belongs to M10 and I didn't touch it. My pages pass.

## Counts

ADD 1 · COVERED 1 · OUTDATED 12 · NOT USEFUL 1 · PRIVACY 0 (total 15)
