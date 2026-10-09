# P10-a review (W30a, 3.13 update)

Verifier: non-author. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Writer notes:
`reviews/W30a-writer-notes.md`. Diff baseline: `9844ed6`. Pages are checked one at a time; each section below is
appended when the page is done. The summary at the top is filled in at the end.

## Summary

(filled in at the end)

---

## 1. docs/design/library.md (new page)

Every claim was opened in the code (not only the writer's refs). Refs are `path:line` in the 3.13 tree.
Library files: `packages/nowa_ui/lib/library/library_panel.dart` (panel), `library_contract.dart` (filter defaults),
`packages/core/lib/src/library/library_service.dart` (what each source lists), `library_actions.dart` (preview, open, insert),
`lib/project/panels/library_panel/library_host.dart` (menu, rename, delete, move, add), `lib/project/panels/files_panel/add_lib_menu.dart`.

| claim | verdict | code ref | note |
|---|---|---|---|
| Library is the 2nd sidebar icon; Ctrl/Cmd+2 opens it | ok | `lib/project/side_bar.dart:36-55`, `lib/setup_general_actions.dart:44-62` | `AdaptiveActivator(digit2)` opens icon index 1. |
| Header: **Add** (+), list/tree toggle ("Show as a list" / "Show as a tree"), search, **Filter**, four chips | ok | `library_panel.dart:697-796` | Tooltips, not visible text; page writes them in bold like other buttons. |
| In code mode **Files** takes the Library's place; phone layout has no Library | ok | `side_bar.dart:44-49`, `lib/project/project_dashboard.dart:49-55`, `lib/project/project_page.dart:105` | |
| Chips Project / Packages / Built-in / Assets; only Project on at first; at least one stays on | ok | `library_contract.dart:223`, `library_panel.dart:444-448,782-796` | Chips are hidden while a query is typed (page says so). |
| **Project**: `lib/` folders and what they hold, red error count per row/folder, `@Preview` variants as children | ok | `library_service.dart:221-294` | `MyApp` is skipped (not on the page). |
| **Packages**: pubspec packages, version or **workspace** for a path dependency, widgets and classes | ok | `library_service.dart:358-388,458-507` | Only direct dependencies that Nowa has loaded. |
| **Built-in**: Nowa's groups (**Basic**, **Buttons**, **Layout**...), then Flutter libraries, **Material** and **Cupertino** first | ok | `library_service.dart:394-436`, `widgets_to_add.dart:96-107` | |
| **Assets**: folders and files under `assets/` | ok | `library_service.dart:327-345` | Hidden folders and dot files skipped. |
| **Filter** menu headed **Show**: **Widgets** (default), **Everything**, one kind, **Private** | fixed | `library_panel.dart:744-778,958-980` | The one-kind list skipped the classes entry; added "classes" in plain text. The menu label is misspelled "Classs" in 3.13 (product issue P5), so the page does not quote it. |
| "Assets always show" | fixed | `library_panel.dart:329-332` | Assets are only listed when the **Assets** chip is on (or while searching), so "always show" misled. Now: "The filter never hides assets." |
| **Private** = names starting with an underscore, project only | ok | `library_service.dart:245,283`, `:369` | Packages drop private names altogether. |
| **Show as a list** flattens folders, **Show as a tree** restores | ok | `library_panel.dart:285-287,716-721` | |
| Search looks in all four sources, ignores chips, "contains" match on names | ok | `library_panel.dart:245-275,331-391` | Case-insensitive, trimmed. |
| Hint **Go to...** by default and with Ctrl/Cmd+O; **Add...** with Ctrl/Cmd+K or the **Widget** tool | ok | `library_panel.dart:739`, `packages/designer/lib/src/actions/add_actions.dart:13-31`, `packages/core/lib/src/actions/tab_actions.dart:27-52`, `designer_tools.dart:172-183` | Walkthroughs still open the picker dialog (not claimed). |
| Enter / Ctrl-Cmd+Enter: Go to opens / inserts; Add inserts / opens | ok | `library_panel.dart:526-542,636-643` | `_adding == flipped` decides. Whether Ctrl/Cmd+Enter reaches the key handler from inside the text field: needs a live check (stays). |
| **Add...** lasts until you add something, click a row or leave the panel | ok | `library_panel.dart:515-518,539-541,657-661,683-686` | |
| In code mode Ctrl/Cmd+O opens **Search for a file** | ok | `tab_actions.dart:27-52` | |
| Results grouped Project, Packages, Built-in, Assets; count at the end of each heading | ok | `library_panel.dart:258-270`, `library_contract.dart:36` | |
| Ranking in a group: Nowa's picks, then starts-with, then A to Z; first result highlighted | ok | `library_panel.dart:393-397,241` | Only the Built-in group has picks. |
| "then a **Show all** row" | fixed | `library_panel.dart:268` | The row reads "Show all 250" (with the count). Page now says "a row such as **Show all 250**". |
| **Show 3 more of other kinds**; "private matches" row; **No matches** | fixed (added the private row) | `library_panel.dart:798-841` | Added "**Show 2 private matches**" ("match" for 1). |
| **Recent**: last eight things added to the board, only with an empty search, also after a drag | ok | `library_service.dart:129-133`, `designer_board_controller.dart:227-231`, `library_panel.dart:276-282` | Includes assets dragged onto the board. |
| Needs an open board/screen/component, else "Open a screen, a component or a board to insert into" | ok | `library_host.dart:135-143` | Shown as an error snackbar. |
| Steps: **Widget** tool or Ctrl/Cmd+K opens the Library with search ready; type; Down; Enter inserts at the last pointer spot; keys go back to the board | ok | `add_actions.dart:13-31`, `common_design.dart:194-217`, `library_panel.dart:539-541`, `library_host.dart:72` | |
| Double-click in **Add...** inserts; Insert / Ctrl-Cmd+Enter; drag a row; Library stays open on drag | ok | `library_panel.dart:911-915`, `library_host.dart:60-73` | The host passes no `startDrag`, so only the details card goes away. |
| Insert works for widgets (project, Nowa, packages, Flutter); assets are dragged | ok | `library_host.dart:135-136`, `library_service.dart:121-127` | |
| Missing package: **Add Missing Dependencies**, "This widget requires the following dependencies", **Cancel** / **Add** | ok | `library_actions.dart:76-91`, `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:7,53,92,100` | The drop path has no such check (open point, not claimed). |
| Details card beside the panel after a click or arrow keys; follows the pointer once open; Esc puts it away | ok | `library_panel.dart:462-492,562-565`, `library_host.dart:266-288` | |
| Card content: preview, name, "Kind · location" (**Component · lib/components**), first lines of the description | ok | `library_panel.dart:1192-1262`, `library_service.dart:261-288` | Max 4 lines, first paragraph of the doc comment. |
| **Add description** in **Details** adds it for a screen or component | ok | `packages/designer/lib/src/details/widget_details.dart:369` | |
| Preview for Nowa's widgets, your screens/components, assets; icon otherwise | fixed | `library_actions.dart:12-62,93-132`, `file_object.dart:193,460,507,567,614,636,661,672` | Assets draw only when the file type has a thumbnail (images, fonts, SVG, Rive, audio, video, text); a JSON asset gets an empty box. Now "most assets". |
| Right-click menu: **Insert** (shows ⌘⏎ on every system), **Open** (Enter), **Upload assets...**, **Rename** (F2), **Delete**, **Show in code** | ok | `library_host.dart:156-172`, `nmenu.dart:449-461` | The hint is a literal `'⌘⏎'` drawn as text, so the "every system" claim holds. |
| **Open**: opens file at the declaration in a tab; screen/component opens on its own; asset opens its file; no Open for Nowa's and Flutter's widgets | ok (+ double-click added) | `library_actions.dart:67-73`, `dart_editor.dart:83-103`, `library_panel.dart:911`, `library_host.dart:145-154` | Added "or double-click the row" (double-click runs `_activate`, which opens in **Go to...** mode). |
| **Upload assets...** on a folder in `assets/` | ok | `library_host.dart:164-165` | The `assets` folder itself is not a row. |
| **Rename**: in place, Enter saves, F2; updates references; renames the file when it is named after the symbol | ok | `library_host.dart:194-213`, `declaration_runtime.dart:67-117`, `nrename_field.dart:5-9` | |
| **Delete**: "Are you sure you want to delete {name}?" **Cancel**/**Yes**; usage dialog **Cancel**/**Remove**; widget alone in its file takes the file | ok | `library_host.dart:216-230`, `nowa_dialogs.dart:6-24`, `declaration_references_dialog.dart:79-82`, `block_actions.dart:55-99` | Folders and assets use `RemoveFileAction`, which asks `"name"` with quotes: page example is the widget case. |
| **Show in code**: switches to code mode, opens the file at that code | ok | `library_host.dart:232-242` | |
| Rename/Delete/Show in code on "your own rows" | fixed | `library_host.dart:189-192,170` | Old text implied **Show in code** works on any row with a file; it needs `editable` (Project or Assets) and a file. Now says Packages and Built-in rows can't be renamed or deleted, folders have no **Show in code**. |
| Ctrl/Cmd+Z undoes a rename or delete while the Library has focus | ok | `library_host.dart:39,297-299` | The Library has its own `Undo`. |
| Move by dragging onto a folder; lib stays in lib, assets in assets; widget moves with its file | ok | `library_host.dart:244-264` | |
| One row at a time; Delete key does nothing on Library rows | ok (needs live check, stays) | `library_host.dart:42`, `general_actions.dart:14-16`, `file_actions.dart:139` | The global Delete shortcut reaches `RemoveFileAction` with the Library's empty `SelectionProvider` and returns. |
| **Add** (+) menu entries and order | ok | `library_host.dart:176-186`, `add_lib_menu.dart:37-104`, `api_util.dart:113-118` | Only the API plugin registers a file creator. "Import template" is debug only. |
| **New Widget...** opens the template picker (Screens / Components); new file opens in a tab | ok | `add_lib_menu.dart:38-49`, `add_template_action.dart:43-103` | |
| **New Folder...** in the last highlighted row's folder, else `lib` | ok | `library_host.dart:176-181`, `add_lib_menu.dart:50-59` | |
| **New Model...** in `lib/models`; **New Global State...** in `lib/globals` | ok | `add_lib_menu.dart:60-77` | Default folder of the dialog (a name with `/` can add a subfolder). |
| **Upload Assets...** into the highlighted `assets` folder, else `assets` | ok | `library_host.dart:180,184` | |
| Keys: type to jump to search; Down into results; Up on the first row back; Esc clears, then hands keys back | fixed (Esc by focus) | `library_panel.dart:544-584,621-655` | Esc in the search field clears/leaves; on a row it only puts the details card away. Page now says which. F2 works only where **Rename** is available. |
| Front matter, no H1, headings sentence case, one admonition, no `---`, no emoji, capture placeholders | ok | | Placeholders `design-library-1` and `-2` are well formed; both captures are pending. |
| Links: 11 relative links, 1 own anchor | ok | | All files and `#where-a-dragged-widget-lands`, `#import-dart-code` resolve. No page links to a library.md anchor (all links are to the file). |

Length: 1,678 words by `wc -w` before my edits, about 1,370 of prose. I cut the duplicated Enter/F2 bullet and filler; the page keeps
four reference tables, so it stays above 1,200. Splitting was not done (would need a sidebar change).

**Needs a live check (stays as written, code supports it):** Delete key does nothing in the Library; Ctrl/Cmd+Enter from inside the search
field; the ⌘⏎ hint on Windows and Linux (code says it is literal); what Enter does on an asset in **Add...** mode (it leaves the panel without
inserting; not on the page).

---

## 2. docs/design/components.md

Changed parts checked: keywords, **Use a component** bullets, the first bullet of **Edit a component or one instance**, the whole section
**Manage screens and components** (anchor kept), Next steps. Unchanged parts spot-checked against 3.13 (labels did not change). No edits needed.

| claim | verdict | code ref | note |
|---|---|---|---|
| Drag a component from the Library; it is under **Project**; the default filter already lists components | ok | `library_contract.dart:225` (default kinds = screen, component, widget), `library_service.dart:247-249` | |
| Ctrl/Cmd+K, type the name, Enter; the Library puts it where the pointer last was; **Filter** > **Components** shows only components | ok | `add_actions.dart:13-31`, `common_design.dart:194-217`, `library_panel.dart:331-332,744-763` | |
| Double-click or Enter in the Library opens a component on its own | ok | `library_panel.dart:526-542,911`, `library_actions.dart:67-73`, `dart_editor.dart:83-103` | In **Go to...** mode. After Ctrl/Cmd+K (Add mode) Enter inserts instead; the page does not mix the two. |
| Open **Library** in the left sidebar; screens and components under **Project**, in the folders of `lib/` | ok | `side_bar.dart:36-55`, `library_service.dart:221-242` | |
| Search field finds one; **Screens** / **Components** in **Filter** list one kind | ok | `library_panel.dart:744-763` | |
| Click a row: details card with preview, name, where it lives, first lines of the description; Esc puts it away | ok | `library_panel.dart:462-492,562-565,1192-1262` | |
| Double-click, Enter or right-click **Open** opens it on its own | ok | `library_host.dart:145-163` | |
| Right-click **Insert** or Ctrl/Cmd+Enter puts it on the open board; dragging works too | ok | `library_host.dart:135-143,161`, `library_panel.dart:526-542` | |
| **Rename** (F2), Enter; updates every place; renames the file when it is named after the widget | ok | `library_host.dart:194-213`, `declaration_runtime.dart:67-117` | |
| **Delete**: "Are you sure you want to delete ProductCard?" with **Cancel**/**Yes**; usage list with **Remove**; file deleted when the widget is alone in it; Ctrl/Cmd+Z undoes while the Library has focus | ok | `library_host.dart:216-230`, `nowa_dialogs.dart:6-24`, `declaration_references_dialog.dart:79-82`, `block_actions.dart:55-99` | |
| **Show in code** opens the file in code mode | ok | `library_host.dart:232-242` | |
| Removed on purpose: **Page** / **Component** switch, multi-select, **Open in Editor**, Delete key, grid/list switch | ok | `library_panel.dart` (none of these exist) | grep of the page: no 3.12.5 wording left; "widgets panel" appears only in `keywords`. |
| **Create component** (right-click) and the **Create a component** icon in **Details**; dialog title "New Component from {name}"; **Submit** | ok (unchanged) | `widget_context_menu.dart:49`, `name_group.dart:93-97`, `common_design.dart:130-145`, `create_file_dialog.dart:94` | |
| **Detach** and **Copy as new widget** | ok (unchanged) | `widget_context_menu.dart:50-56` | In 3.13 they are hidden, not greyed, where they do not apply; the page's wording holds. |
| **Params** / **Variables** / **Functions** in the Variables box | ok (unchanged) | `declaration_list_widgets.dart:278`, `circuit_details.dart:79` | |
| Alt text of `design-components-2` (Library with the right-click menu: Insert, Open, Rename, Delete, Show in code) | ok | `library_host.dart:156-172` | Matches the menu of a component row. The PNG itself is still the 3.12.5 shot until the retake (`captures/requests/W30.md`). |
| Links: `library.md`, `outline.md`, `add-widgets.md`, `../guides/design-tips.md#build-once-reuse-everywhere`, `../logic/parameters.md`, `../logic/variables.md`, `../reference/widgets/lists.md`; anchor `{#manage-screens-and-components}` | ok | | All resolve (link check). 994 words. |

---

## 3. docs/design/boards.md

Changed parts checked: keywords, the **Create, switch and manage boards** steps and notes, the **Frame** bullet, the Back sentence, the **Widget** toolbar row,
the Remove/Delete bullets, Next steps, the alt text of `design-boards-1`. No edits needed.

| claim | verdict | code ref | note |
|---|---|---|---|
| Chip is called **Boards**; it shows the current board's name, or **Boards** off a board | ok | `lib/project/top_bar_mapper.dart:87-92` | |
| Click the chip or press Ctrl/Cmd+B to open the list | ok | `lib/setup_general_actions.dart:35`, `lib/project/panels/panel_actions.dart:28-40`, `packages/core/lib/src/panels/panel.dart:45-48`, `picker_chip.dart:120-150` | `AdaptiveActivator(keyB)`; the request opens the list with the search focused. |
| The list shows every board in `boards/` and its subfolders, opened or not | ok | `lib/project/top_bar.dart:222-246` | Hidden folders skipped. |
| **Search boards** field; arrow keys and Enter pick; search starts on the first row | ok | `top_bar_mapper.dart:95`, `picker_chip.dart:218-245,290-322` | Contains-match on the name; **No matches** note when empty. |
| Footer **Create new board**; dialog with a name and **Submit**; the new board opens | ok | `top_bar_mapper.dart:111-116`, `top_bar.dart:290-296`, `packages/designer/lib/src/actions/file_actions.dart:7-26`, `create_file_dialog.dart:94,125` | |
| Hover a row: **Rename** and **Delete** icons | ok | `top_bar_mapper.dart:71-74` | Tooltips "Rename" / "Delete". |
| New board names are snake_case: **Login flow** becomes `login_flow`, file `login_flow.board` | ok | `file_actions.dart:62-67`, `naming.dart:96-146,158-163`, `file_name_text_field.dart:25-30` | `CreateFileResult.fileName` snake-cases the typed name, `generateFileName` keeps it. The conversion itself was not run (open point 8 of the writer). |
| Delete asks **Are you sure you want to delete "…"?** and **Yes** | ok | `top_bar.dart:318-320`, `packages/core/lib/src/file_system/actions/file_actions.dart:139-155` | `RemoveFileAction` puts the file name in quotes. |
| Ctrl/Cmd+Shift+B creates a board | ok | `packages/designer/lib/src/designer_setup.dart:54` | |
| The chip isn't there in code mode or while the app runs in the editor, so Ctrl/Cmd+B does nothing | ok | `top_bar_mapper.dart:58-62` | Nothing listens for the request when no chip is built. |
| **Frame**: an item ends at its frame; overflow, error boxes and blurs don't paint over its neighbours | ok | `packages/core/lib/src/board/board_canvas.dart:222-231` | `ClipRect` in `InstanceCanvas._build`, so it holds for screens, components and loose widgets alike. |
| **Open in new tab** opens the item on its own; **Back** in the top bar or Ctrl + - (Control also on a Mac) returns; or pick the board in the **Boards** chip | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`, `lib/setup_general_actions.dart:36-38`, `packages/core/lib/src/providers/navigation_history.dart` | Tooltips "Back" with hint ⌃-; `control: true` on every OS. |
| Toolbar **Widget** (Ctrl/Cmd+K) opens the Library to add a widget; **Screen** hidden when an item is open on its own | ok | `designer_tools.dart:172-183,224-226`, `add_actions.dart:13-31` | |
| Remove: a screen or component stays in the **Library** | ok | `library_service.dart:221-242` | |
| Delete from the project: Library > **Delete**, **Yes**, usage list asks again | ok | `library_host.dart:216-230`, `block_actions.dart:55-79` | |
| Alt text of `design-boards-1` (search field, hovered row with Rename and Delete, current board marked, **Create new board**) | ok | `picker_chip.dart:290-345` | The PNG is still the 3.12.5 list until the retake. |
| Unchanged parts (color and grid, moving around, board items, big boards, view-only) | ok (not re-derived) | | No label in them is in the 3.13 change list; spot checks: **Select tool**, **Shape**, **Screen**, **Text**, **Widget** tool tooltips (`designer_tools.dart:132-183`). |
| Links: `outline.md`, `screens.md`, `add-widgets.md`, `library.md`, `components.md#manage-screens-and-components`, `../test/instant-play.md`, `../ai/index.md`, `../account/workspaces.md` | ok | | All resolve. 1,184 words. |

---

## 4. docs/design/screens.md

Changed parts checked: the **Add description** bullet, the **Open in new tab** bullet, **Delete a screen**, Next steps. Unchanged parts spot-checked (labels exist in 3.13).

| claim | verdict | code ref | note |
|---|---|---|---|
| **Add description** under the name in **Details**; saved in the screen's code; shows in the Library's details card | ok | `packages/designer/lib/src/details/widget_details.dart:169-181,369`, `library_service.dart:281`, `packages/core/lib/src/utils.dart:87-90`, `library_panel.dart:1239-1243` | The card shows the first paragraph, up to 4 lines. |
| ... and in the widget picker dialog when you pick the screen | ok | `packages/core/lib/src/widgets/widget_picker.dart:299` | `componentDoc?.docSummary`. |
| **Open in new tab** (Ctrl/Cmd+I); to go back click **Back** or open the **Boards** chip and pick the board | ok | `packages/designer/lib/src/designer_setup.dart:52`, `top_bar_view.dart:258-271`, `navigation_history.dart:26-80` | |
| Delete the screen: Library > **Project** > right-click > **Delete** > **Yes**; asks again when something uses it | ok | `library_host.dart:216-230`, `nowa_dialogs.dart:6-24`, `block_actions.dart:55-79` | |
| "You can also drag an App Bar, Floating Action Button, Bottom Navigation Bar or Drawer onto the screen, and it drops into its slot" | fixed | `packages/designer/lib/src/design_experience/move_tool.dart:371-397` (`DeepHostWidgetFinder`), `drag_rule.dart:393-436` (`ScaffoldRule`), `drag_rule.dart:70-79` (default rule), `captures/ui-diffs-3.13.md` row 6 | Not a 3.13 change, but the live capture contradicts it: a widget dragged from the Library onto a screen lands in the body. Code agrees: the finder lets the deepest "opaque" host win, and for a new widget (no start host) a body **Group** is opaque, so it beats `ScaffoldRule`. Replaced with how to fill the slots (click the slot, which reads `null` while empty: `nowa_fields.dart:434-445`, picker dialog) and a note that a drag goes to the body. Edge case (pointer outside the body group) not checked live. Also changed in `select-and-edit.md`. |
| Add a screen: **Screen** tool or **Create a page**, template picker, **Search for templates**, **Screens** / **Components**, **Empty Page**, **Submit** | ok (unchanged) | `designer_tools.dart:152-158`, `board_context_menu.dart:11`, `add_template_action.dart:43-103` | |
| **Screen** section (**Color**, **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar**, **Size**), **Route Settings**, **Make home screen** / **This is the home screen** | ok (unchanged) | `widget_fields.dart:218-226`, `route_details.dart` | |
| Links: `library.md`, `components.md#manage-screens-and-components`, `templates.md`, `responsive.md`, `layout.md`, `properties.md`, `../logic/router.md`, `outline.md`, `../reference/widgets/navigation.md`, `../logic/navigation.md`; own anchor `#choose-the-home-screen` | ok | | All resolve. 1,151 words. |

## 5. docs/design/select-and-edit.md

Changed parts checked: keywords, the right-click table (**Replace with...**, reorder rows, **Export as image...**), the paragraph under it, the alt text of
`design-select-and-edit-2`, the undo-areas sentence, plus the **Where a dragged widget lands** table because the capture agent flagged one row.

| claim | verdict | code ref | note |
|---|---|---|---|
| Menu entries and labels: **Remove**, **Replace with...**, **Group**, **Ungroup**, **Copy**, **Cut**, **Bring to front**, **Bring forward**, **Send backward**, **Send to back**, **Create component**, **Detach**, **Copy as new widget**, **Export as image...** | ok | `packages/designer/lib/src/menus/widget_context_menu.dart:10-67` | **Play** shows when nothing plays and a canvas is selected. |
| **Replace with...** opens the widget picker dialog | ok | `widget_context_menu.dart:30-40` | |
| **Bring forward** Ctrl/Cmd+], **Send backward** Ctrl/Cmd+[, **Bring to front** Alt/Option+Ctrl/Cmd+], **Send to back** Alt/Option+Ctrl/Cmd+[ | ok | `designer_setup.dart:21-25` | `AdaptiveActivator(..., alt: true)`. |
| Bring forward moves one place later; Bring to front to the last place; Send backward/back earlier/first | ok | `packages/designer/lib/src/design/order_design.dart:23-70` | `_calcSlot`: next = slot + 1, all the way = last or first. |
| "Later means lower in a Column, further right in a Row, in front in a Stack" | ok | `order_design.dart:36-48` | Later child = lower / right / on top. |
| Each entry shows its own keys; one that can't run is greyed | ok | `packages/core/lib/src/widgets/menu.dart:49-72`, `widget_actions.dart:64-76` | `intentEntry` reads the action's `isEnabled` and `findActivator(predicate:)`. The old "same hint on both entries" sentence is gone (fixed in 3.13). |
| **Detach** and **Copy as new widget** show only where they apply | ok | `widget_context_menu.dart:50-57` | |
| Board menu: **Undo**, **Redo**, **Save**, **Create a page**, **Paste** | ok | `packages/designer/lib/src/menus/board_context_menu.dart:7-13` | |
| Each area keeps its own history: every board, the Library, a screen opened on its own | ok | `library_host.dart:39,297-299` | Code mode's **Files** has its own (page is about the designer). |
| Alt text of `design-select-and-edit-2` | ok | `widget_context_menu.dart:10-67` | Order and entries match the menu of a plain Container (no **Ungroup**, **Detach**, **Copy as new widget**). The PNG is still the 3.12.5 shot until the retake. |
| Drop table, row "A screen: An App Bar, Floating Action Button, Bottom Navigation Bar or Drawer goes into its slot. Anything else goes into the body." | fixed | `move_tool.dart:371-397`, `drag_rule.dart:393-436`, `captures/ui-diffs-3.13.md` row 6 | Same finding as in screens.md: a new widget dropped on a screen goes into the body. Row now says so, points to the slot in **Details**, and links `screens.md#set-up-a-screen`. `reference/widgets/navigation.md` (other batch) still says "It lands in its own place, not in the body" and links to this table. |
| Other rows of the drop table (empty board, **Stack**, **Row**/**Column**/**Wrap**/**List View**, app bar zones, **Text**/**Padding**, other widgets) | ok (unchanged) | `drag_rule.dart:9-22,163-511` | |
| Links: `outline.md`, `layout.md`, `add-widgets.md#put-a-widget-inside-a-container`, `components.md`, `library.md`, `properties.md`, `../test/instant-play.md`, `../ai/context.md`; new `screens.md#set-up-a-screen`; own anchors | ok | | All resolve. 1,463 words (was 1,462; over the 1,200 hint but a reference page, left as is). |
