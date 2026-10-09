# P10-a review (W30a, 3.13 update)

Verifier: non-author. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Writer notes:
`reviews/W30a-writer-notes.md`. Diff baseline: `9844ed6`. Pages are checked one at a time; each section below is
appended when the page is done. The summary at the top is filled in at the end.

## Summary

**Pages checked: 12** (the new `design/library.md`; `design/{add-widgets,components,boards,screens,select-and-edit,outline,index}.md`;
`get-started/{editor-tour,welcome,desktop-app}.md`; `reference/glossary.md`). **176 claim rows** in this log (a row often groups several labels or keys of
one step or table, so about 330 individual labels, keys, menu entries, steps and behaviours were opened in the 3.13 code), **165 ok, 11 fixed, 0 removed**.
Pages edited: `library`, `add-widgets`, `screens`, `select-and-edit`, `index`. No edit was needed on `components`, `boards`, `outline`, `editor-tour`, `welcome`,
`desktop-app`, `glossary`. Links: 224 relative links in the 12 pages and all 35 anchor links from anywhere in `docs/` into them resolve (own checker, tested on
bad links); no page links to a `library.md#...` anchor. The old anchors `#add-a-widget-with-the-widget-picker`, `#drag-screens-components-and-files`,
`#manage-screens-and-components`, `#setting-up-flutter-sdk` and `#macos-install-xcode` still exist. Style: no hype words, no emoji, no H1 in a body, at most one
admonition per page, capture placeholders well formed. Leftover 3.12.5 wording: none (the words "Widgets panel", "widget picker", "Board chip", "Move Up" and so on
appear only in `keywords` and in the glossary's "Renamed or removed" table, or mean the dialog picker, which still exists). Every `path:line` ref in this log was
bounds-checked against the 3.13 tree.

**Most serious fixes**
1. `screens.md` and `select-and-edit.md` said an App Bar, Floating Action Button, Bottom Navigation Bar or Drawer dragged onto a screen "goes into its slot". For a new
   widget the deepest group under the pointer wins (`move_tool.dart:340-394`), and an **Empty Page** body is a full-size **Stack** (`empty_page.dart:21-28`), so the live capture
   (`ui-diffs-3.13.md` row 6) is right. Both pages now say the slot rule holds only outside the screen's groups and show how to fill a slot (click it in **Details**).
2. `library.md`: the filter list skipped the classes entry (menu label "Classs", product issue P5), **Show all** is really "Show all 250", the "private matches" row was missing,
   "Assets always show" misled (they only list with the **Assets** chip on), "Show in code works on rows that have a file" was too broad (own rows only, no folders),
   asset previews exist only for file types that draw a thumbnail, and Esc behaves differently in the search field (clears, then hands the keys back) and on a row (puts
   the details card away). Double-click for **Open** was added.
3. `add-widgets.md`: the Esc flow "clear the search, then hand the keys back" is only true in the search field; now says so.
4. `index.md`: the **Library** row double-counted widgets; reworded.

**Stay as written, needs a live check (the code supports them)**
- The Delete key does nothing on Library rows (empty `SelectionProvider`: `library_host.dart:42`, `file_actions.dart:138-140`).
- Ctrl/Cmd+Enter reaching the key handler from inside the search field.
- The menu hint ⌘⏎ on Windows and Linux (the code draws the literal text, so the page's "every system" holds).
- What a drop does when a dragged package widget's package is missing (the page only says **Insert** and Enter ask first; the old dialog blocked such drags, the Library does not).
- Boards chip tooltip text on Windows and Linux (not quoted).
- Linux: only "made on Ubuntu 24.04" is stated (workflow); no minimum distribution (decision pending). Whether the browser's own Ctrl + - zoom competes with **Back**
  in the web app on Windows and Linux was not checkable from code.
- The Library with the View Only role is not mentioned on any page (`library_host.dart` never reads `isViewOnly`).

**Open issues**
- Media: the PNGs `design-add-widgets-1`, `design-components-2`, `design-boards-1`, `design-select-and-edit-2`, `design-index-1`, `get-started-editor-tour-1` and the video
  `design-add-widgets-video` still show 3.12.5 UI while the alt text (or nearby text) describes 3.13; retakes are requested in `captures/requests/W30.md`. The placeholders
  `design-library-1`, `design-library-2`, `design-outline-2` are pending; `get-started-desktop-app-1` has a 3.13.0 image that is not embedded yet.
- Cross-page check: `reference/widgets/navigation.md` (another batch) was corrected meanwhile and now says a part dragged from the Library can land in the body, so use the slot. That agrees with `screens.md` and `select-and-edit.md`; its step 3 still says "The part sits in its own place, not in the body", which is true for a slot filled from **Details**.
- `library.md` is about 1,390 prose words (1,660 by `wc -w`, which counts table markup) because it holds four reference tables; I trimmed duplicates but did not split it
  (that would need a sidebar change). `select-and-edit.md` (1,520) and `editor-tour.md` (1,785) are also above the 1,200 hint; they are reference pages and were left alone.
- The filter entry "Classs" is quoted as the app shows it; when the product fixes the typo (P5) the parenthetical in `library.md` must go.

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
| **Filter** menu headed **Show**: **Widgets** (default), **Everything**, one kind, **Private** | fixed | `library_panel.dart:744-778,958-980` | The one-kind list skipped the classes entry. Added "classes (the entry reads **Classs**)": the menu label is misspelled "Classs" in 3.13 (product issue P5), and `changes-3.13.md` part 6 says to quote the app or skip the item, not to fix it silently. |
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
| Missing package: **Add Missing Dependencies**, "This widget requires the following dependencies", **Cancel** / **Add** | ok | `library_actions.dart:76-91`, `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:6,47,86,95` | The drop path has no such check (open point, not claimed). |
| Details card beside the panel after a click or arrow keys; follows the pointer once open; Esc puts it away | ok | `library_panel.dart:462-492,562-565`, `library_host.dart:266-288` | |
| Card content: preview, name, "Kind · location" (**Component · lib/components**), first lines of the description | ok | `library_panel.dart:1192-1262`, `library_service.dart:261-288` | Max 4 lines, first paragraph of the doc comment. |
| **Add description** in **Details** adds it for a screen or component | ok | `packages/designer/lib/src/details/widget_details.dart:369` | |
| Preview for Nowa's widgets, your screens/components, assets; icon otherwise | fixed | `library_actions.dart:12-62,93-132`, `file_object.dart:193,460,507,567,614,636,661,672` | Assets draw only when the file type has a thumbnail (images, fonts, SVG, Rive, audio, video, text); a JSON asset gets an empty box. Now "most assets". |
| Right-click menu: **Insert** (shows ⌘⏎ on every system), **Open** (Enter), **Upload assets...**, **Rename** (F2), **Delete**, **Show in code** | ok | `library_host.dart:156-172`, `packages/nowa_ui/lib/src/components/nmenu.dart:449-461` | The hint is a literal `'⌘⏎'` drawn as text, so the "every system" claim holds. |
| **Open**: opens file at the declaration in a tab; screen/component opens on its own; asset opens its file; no Open for Nowa's and Flutter's widgets | ok (+ double-click added) | `library_actions.dart:67-73`, `dart_editor.dart:83-103`, `library_panel.dart:911`, `library_host.dart:145-154` | Added "or double-click the row" (double-click runs `_activate`, which opens in **Go to...** mode). |
| **Upload assets...** on a folder in `assets/` | ok | `library_host.dart:164-165` | The `assets` folder itself is not a row. |
| **Rename**: in place, Enter saves, F2; updates references; renames the file when it is named after the symbol | ok | `library_host.dart:194-213`, `declaration_runtime.dart:67-117`, `packages/nowa_ui/lib/src/components/nrename_field.dart:5-9` | |
| **Delete**: "Are you sure you want to delete {name}?" **Cancel**/**Yes**; usage dialog **Cancel**/**Remove**; widget alone in its file takes the file | ok | `library_host.dart:216-230`, `nowa_dialogs.dart:6-24`, `declaration_references_dialog.dart:79-82`, `block_actions.dart:55-99` | Folders and assets use `RemoveFileAction`, which asks `"name"` with quotes: page example is the widget case. |
| **Show in code**: switches to code mode, opens the file at that code | ok | `library_host.dart:232-242` | |
| Rename/Delete/Show in code on "your own rows" | fixed | `library_host.dart:189-192,170` | Old text implied **Show in code** works on any row with a file; it needs `editable` (Project or Assets) and a file. Now says Packages and Built-in rows can't be renamed or deleted, folders have no **Show in code**. |
| Ctrl/Cmd+Z undoes a rename or delete while the Library has focus | ok | `library_host.dart:39,297-299` | The Library has its own `Undo`. |
| Move by dragging onto a folder; lib stays in lib, assets in assets; widget moves with its file | ok | `library_host.dart:244-264` | |
| One row at a time; Delete key does nothing on Library rows | ok (needs live check, stays) | `library_host.dart:42`, `packages/core/lib/src/actions/general_actions.dart:14-16`, `packages/core/lib/src/file_system/actions/file_actions.dart:138-140` | The global Delete shortcut reaches `RemoveFileAction` with the Library's empty `SelectionProvider` and returns. |
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
| Click the chip or press Ctrl/Cmd+B to open the list | ok | `lib/setup_general_actions.dart:35`, `lib/project/panels/panel_actions.dart:28-40`, `packages/core/lib/src/panels/panel.dart:45-48`, `packages/nowa_ui/lib/src/components/picker_chip.dart:213-234` | `AdaptiveActivator(keyB)`; the request opens the list with the search focused. |
| The list shows every board in `boards/` and its subfolders, opened or not | ok | `lib/project/top_bar.dart:222-246` | Hidden folders skipped. |
| **Search boards** field; arrow keys and Enter pick; search starts on the first row | ok | `top_bar_mapper.dart:95`, `packages/nowa_ui/lib/src/components/picker_chip.dart:232-246,264-282,330-346` | Contains-match on the name; **No matches** note when empty. |
| Footer **Create new board**; dialog with a name and **Submit**; the new board opens | ok | `top_bar_mapper.dart:111-116`, `lib/project/top_bar.dart:290-296`, `packages/designer/lib/src/actions/file_actions.dart:7-26`, `create_file_dialog.dart:94,125` | |
| Hover a row: **Rename** and **Delete** icons | ok | `top_bar_mapper.dart:71-74` | Tooltips "Rename" / "Delete". |
| New board names are snake_case: **Login flow** becomes `login_flow`, file `login_flow.board` | ok | `packages/designer/lib/src/actions/file_actions.dart:62-68`, `naming.dart:96-146,158-163`, `file_name_text_field.dart:25-30` | `CreateFileResult.fileName` snake-cases the typed name, `generateFileName` keeps it. Closes the writer's open point 8: `recase` 4.1.0 (`pubspec.lock`) splits "Login flow" at the space into Login + flow, so `snakeCase` gives `login_flow` (source read, not run). |
| Delete asks **Are you sure you want to delete "…"?** and **Yes** | ok | `lib/project/top_bar.dart:318-320`, `packages/core/lib/src/file_system/actions/file_actions.dart:138-155` | `RemoveFileAction` puts the file name in quotes. |
| Ctrl/Cmd+Shift+B creates a board | ok | `packages/designer/lib/src/designer_setup.dart:54` | |
| The chip isn't there in code mode or while the app runs in the editor, so Ctrl/Cmd+B does nothing | ok | `top_bar_mapper.dart:58-62` | Nothing listens for the request when no chip is built. |
| **Frame**: an item ends at its frame; overflow, error boxes and blurs don't paint over its neighbours | ok | `packages/core/lib/src/board/board_canvas.dart:222-231` | `ClipRect` in `InstanceCanvas._build`, so it holds for screens, components and loose widgets alike. |
| **Open in new tab** opens the item on its own; **Back** in the top bar or Ctrl + - (Control also on a Mac) returns; or pick the board in the **Boards** chip | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`, `lib/setup_general_actions.dart:36-38`, `packages/core/lib/src/providers/navigation_history.dart` | Tooltips "Back" with hint ⌃-; `control: true` on every OS. |
| Toolbar **Widget** (Ctrl/Cmd+K) opens the Library to add a widget; **Screen** hidden when an item is open on its own | ok | `designer_tools.dart:172-183,224-226`, `add_actions.dart:13-31` | |
| Remove: a screen or component stays in the **Library** | ok | `library_service.dart:221-242` | |
| Delete from the project: Library > **Delete**, **Yes**, usage list asks again | ok | `library_host.dart:216-230`, `block_actions.dart:55-79` | |
| Alt text of `design-boards-1` (search field, hovered row with Rename and Delete, current board marked, **Create new board**) | ok | `packages/nowa_ui/lib/src/components/picker_chip.dart:326-360` | The PNG is still the 3.12.5 list until the retake. |
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
| "You can also drag an App Bar, Floating Action Button, Bottom Navigation Bar or Drawer onto the screen, and it drops into its slot" | fixed | `packages/designer/lib/src/design_experience/move_tool.dart:340-394` (`DeepHostWidgetFinder`), `drag_rule.dart:393-436` (`ScaffoldRule`), `drag_rule.dart:70-79` (default rule), `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-28`, `captures/ui-diffs-3.13.md` row 6 | Not a 3.13 change, but the live capture contradicts it: a widget dragged from the Library onto a screen lands in the body. The code explains it: the finder lets the deepest "opaque" host win; for a new widget (no start host) a group is opaque, so the **Stack** that fills an **Empty Page** body beats `ScaffoldRule`, which only wins where no group is under the pointer. Page now says how to fill the slots (click the slot, which reads `null` while empty: `nowa_fields.dart:434-445`, picker dialog) and that a drag fills the slot only away from the screen's groups. Also changed in `select-and-edit.md`; `reference/widgets/navigation.md` (other batch) was corrected to the same effect while this check ran. |
| Add a screen: **Screen** tool or **Create a page**, template picker, **Search for templates**, **Screens** / **Components**, **Empty Page**, **Submit** | ok (unchanged) | `designer_tools.dart:152-158`, `board_context_menu.dart:11`, `add_template_action.dart:43-103` | |
| **Screen** section (**Color**, **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar**, **Size**), **Route Settings**, **Make home screen** / **This is the home screen** | ok (unchanged) | `widget_fields.dart:218-226`, `route_details.dart` | |
| Links: `library.md`, `components.md#manage-screens-and-components`, `templates.md`, `responsive.md`, `layout.md`, `properties.md`, `../logic/router.md`, `outline.md`, `../reference/widgets/navigation.md`, `../logic/navigation.md`; own anchor `#choose-the-home-screen` | ok | | All resolve. 1,187 words. |

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
| Drop table, row "A screen: An App Bar, Floating Action Button, Bottom Navigation Bar or Drawer goes into its slot. Anything else goes into the body." | fixed (qualified) | `move_tool.dart:340-394`, `drag_rule.dart:393-436`, `empty_page.dart:21-28`, `captures/ui-diffs-3.13.md` row 6 | The rule is code-true only where no group is under the pointer (row relabelled "A screen, outside its groups"). A new screen's body is a **Stack** that fills it, so a drop from the Library follows the **Stack** row, as the capture saw. Added one sentence under the table saying so and pointing to the slot in **Details** (`screens.md#set-up-a-screen`). Verified only for the **Empty Page** template, so the sentence names it. |
| Other rows of the drop table (empty board, **Stack**, **Row**/**Column**/**Wrap**/**List View**, app bar zones, **Text**/**Padding**, other widgets) | ok (unchanged) | `drag_rule.dart:9-22,163-511` | |
| Links: `outline.md`, `layout.md`, `add-widgets.md#put-a-widget-inside-a-container`, `components.md`, `library.md`, `properties.md`, `../test/instant-play.md`, `../ai/context.md`; new `screens.md#set-up-a-screen`; own anchors | ok | | All resolve. 1,520 words (was 1,462 before the slot note; over the 1,200 hint but a reference page, left as is). |

---

## 6. docs/design/add-widgets.md (rewritten for the Library)

Changed parts checked: description and keywords, the section **Add a widget from the Library** (old id `{#add-a-widget-with-the-widget-picker}` kept), the drop paragraph,
**Add a widget that needs a package**, **Drag screens, components and assets** (old id `{#drag-screens-components-and-files}` kept), **Put a widget inside a container** (now
describes the dialog picker), **Can't find a widget?**, Next steps, the image alt text. Unchanged sections spot-checked.

| claim | verdict | code ref | note |
|---|---|---|---|
| Ctrl/Cmd+K or the **Widget** tool opens the Library (switching the side panel) with the search ready; field reads **Add...** | ok | `packages/designer/lib/src/actions/add_actions.dart:13-31`, `designer_tools.dart:172-183`, `designer_setup.dart:51`, `library_panel.dart:194-201,739` | Only a running walkthrough still opens the dialog (not claimed). |
| Results grouped **Project**, **Packages**, **Built-in**, **Assets**; Nowa's widgets first in a group; **Filter** narrows by kind; **Show 3 more of other kinds** reveals the rest | ok | `library_panel.dart:258-270,393-397,744-778,831-841` | The source chips hide while you type, and the page does not say they narrow the search (the research row said so; the code does not). |
| Down arrow moves through results; details card beside the panel shows preview, name, first lines of the description | ok | `library_panel.dart:626-635,1192-1262` | |
| Enter or double-click inserts at the last pointer spot; keys go back to the board | ok | `library_panel.dart:526-542`, `common_design.dart:194-217`, `library_host.dart:72` | |
| "press Esc to clear the search and again to hand the keys back" | fixed | `library_panel.dart:562-565,644-653` | True only in the search field. After Down the focus is on a row, where Esc just puts the details card away. Now says "in the search field". |
| Needs an open board, screen or component, else "Open a screen, a component or a board to insert into" | ok | `library_host.dart:135-143` | |
| Alt text of `design-add-widgets-1` (Library with Add..., grouped results with counts, first result highlighted, details card) | ok | `library_panel.dart:241,268,739,1192-1262` | The PNG and `design-add-widgets-video.mp4` still show the 3.12.5 dialog until the retake (`captures/requests/W30.md`). |
| Drag: lands where released; the Library stays open; the board shows where it will land | ok | `designer_board_controller.dart:226-262`, `library_panel.dart:911-915`, `library_host.dart:60-73` | |
| Missing package: Enter, double-click and **Insert** open **Add Missing Dependencies** ("This widget requires the following dependencies"), **Add**, then the widget is placed | ok | `library_actions.dart:76-91`, `missing_dependency_dialog.dart:6,47,86,95` | |
| "To have Nowa ask first, add such a widget with Enter or Insert rather than by dragging" | ok (needs live check for the drop result, stays) | `designer_board_controller.dart:226-262`, `move_tool.dart` (no dependency code), `widget_picker.dart:151-152` | The Library drop path has no prompt (the old dialog blocked dragging such widgets: `canDrag: _hasDeps(...)`). `drop_on_board.dart:29-31` prompts only for files dropped from outside the app. What a drop does when the package is missing was not checked live; the page does not say. |
| Screens/components: drag a row; a screen always becomes its own board item; drop a component inside a screen | ok | `move_tool.dart:247-262` (`isMovingScreen`), `library_service.dart:121-127` | |
| Assets: turn on the **Assets** chip, drag an image, SVG, font, Rive animation or video; a font creates a text with that font | ok | `library_service.dart:121-127`, `file_object.dart:465,526,619,650,677` (`createDragData` of image, font, SVG, Rive, video) | Search lists assets without the chip, but the plain list needs it. |
| Widget picker dialog: hint **Search for a widget**, **Search for:** chips **All**, **BuiltIn**, **Components**, preview with description, **Dependencies**, **Open Documentation.**, variant chips, Tab / Shift+Tab, Enter or click picks, Esc closes | ok | `widget_picker.dart:131-205,300-359,518-529`, `filter_section_widgets.dart:26`, `command_palette_modal.dart:145-157` | |
| The dialog opens from the **+** of an empty slot, from widget-valued properties (**Pick Widget**) and from **Replace with...** | ok | `widget_details.dart:243-265`, `basic_fields.dart:462-474`, `nowa_fields.dart:435-442`, `widget_context_menu.dart:30-40` | |
| **Request a Widget** and **Submit Request** only in the dialog; the Library has no such link | ok | `widget_picker.dart:148-163`, `feedback_dialogs.dart:71,85-88` | grep: no "Request a Widget" in the Library files. |
| Unchanged: **Shape** (R), **Text** (T), paste rules, guide links | ok (unchanged) | `designer_setup.dart:16-18` | |
| Links: `library.md`, `select-and-edit.md#where-a-dragged-widget-lands`, `components.md`, `assets.md`, `properties.md`, `layout.md`, `../reference/widgets/{lists,forms,navigation,media,index}.md`; own anchors | ok | | All resolve. Old anchors `#add-a-widget-with-the-widget-picker`, `#drag-screens-components-and-files`, `#add-a-widget-that-needs-a-package`, `#put-a-widget-inside-a-container` all exist. 1,160 words. |

---

## 7. docs/design/outline.md

Only the pending capture comment `design-outline-2` changed. The rest was spot-checked against 3.13.

| claim | verdict | code ref | note |
|---|---|---|---|
| Capture text: on a screen opened on its own the top bar shows the **Back** button and the **Boards** chip, not dimmed, reading **Boards** | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`, `lib/project/top_bar_mapper.dart:87-92` | Label is **Boards** off a board; the chip has no dimming in 3.13. A view switcher chip may follow it when the file has several views (not part of the capture text). Placeholder is well formed. |
| Right-click a row: same menu as on the board, acts on the clicked row | ok | `packages/designer/lib/src/panels/outline_panel.dart:189-198` | Calls `widgetMenuEntries`, so the 3.13 labels (**Bring forward** etc.) apply; the page does not list entries. |
| Branch eye messages **Shown by the condition**, **Click to show this branch**, **Shown on click. Click again to let the condition decide**; **Cannot find widget … on the board.** | ok (unchanged) | `packages/nowa_ui/lib/outline/outline_view.dart:304-310`, `outline_panel.dart:150` | |
| Sidebar icon **Outline**; floating box on a screen opened on its own, icon hidden there | ok (unchanged) | `lib/project/side_bar.dart:70-74,127` (`showOutlinePanel: !outlineFloatingPanel`) | |
| Links and anchors | ok | | `select-and-edit.md#use-the-right-click-menu`, `../logic/expressions.md`, `properties.md`, `components.md` resolve. 737 words. |

## 8. docs/design/index.md

| claim | verdict | code ref | note |
|---|---|---|---|
| **Library** row: lists screens and components, Nowa's built-in widgets, packages and assets; search; drag a row | fixed (wording) | `library_service.dart:221-454`, `library_contract.dart:223-225` | "screens, components and widgets, plus Nowa's built-in widgets" double-counted widgets (the project's widgets are its components; **Widgets** is a filter kind). Now "your screens and components, Nowa's built-in widgets, your packages and your assets". |
| Toolbar: **Select tool**, **Shape**, **Screen**, **Text**, **Widget** | ok | `designer_tools.dart:132-183` | |
| Add widgets line "the Library search, tools, drag and drop, paste"; new Library link | ok | | |
| `design-index-1` alt text and image | ok (alt names areas only) | | The PNG shows the 3.12.5 chrome until the retake (`captures/requests/W30.md`). |
| Hover a title for **Play** and **Open in new tab**; phone window has no board | ok (unchanged) | `canvas_titles.dart`, `lib/project/project_page.dart:105` | |
| Links | ok | | All resolve (library, boards, screens, components, add-widgets, select-and-edit, outline, properties, layout, responsive, themes, theme-styles, assets, fonts-icons, templates, localization, reference/widgets/*, logic/index, guides/index, ai/*, test/instant-play, get-started/mobile). 887 words. |

---

## 9. docs/get-started/editor-tour.md

Changed parts checked: keywords, the top-bar rows (**Back** and **Forward**, **Boards** chip, screen or component chip), the sidebar table and its note, the code-mode
**Files** sentence, the **Widget** toolbar row, the code-mode bullet and the **Back** note, the welcome-tour table, **When nothing is open**. No edits needed.

| claim | verdict | code ref | note |
|---|---|---|---|
| **Back** / **Forward** arrows before the **Boards** chip; Ctrl + - and Ctrl + Shift + - (Control also on a Mac); greyed when there is nowhere to go; last 50 places | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`, `lib/setup_general_actions.dart:37-38`, `packages/core/lib/src/providers/navigation_history.dart:26-30`, `packages/core/lib/src/actions/tab_actions.dart:220-240` | `SingleActivator(minus, control: true)`; `canGoBack` / `canGoForward`; `_limit = 50`. |
| Not shown in code mode or while the app runs in the editor, but the keys still work | ok | `lib/project/top_bar_mapper.dart:58-62`, `packages/core/lib/src/actions/tab_actions.dart:220-240` | The actions are enabled whenever the history allows. |
| **Boards** chip: current board's name or **Boards**; click or Ctrl/Cmd+B opens the list with **Search boards**; pick, hover for **Rename** / **Delete**, **Create new board**; **Back** or a board to leave a screen opened on its own | ok | `top_bar_mapper.dart:71-116`, `lib/project/top_bar.dart:222-246,290-320`, `picker_chip.dart:213-346` | Tooltip text not quoted (writer's open point, fine). |
| Screen or component chip after the **Boards** chip; click switches views when the file has several | ok (unchanged) | `top_bar_mapper.dart:118-139` | `enabled: dart.views.length > 1`. |
| Playground and guests have no **Git** icon, so numbers after **Search** are one lower | ok | `lib/project/side_bar.dart:62-66`, `packages/core/test/guest_test.dart:46` | `!isSandboxed`; guests are sandboxed. |
| Sidebar order and numbers: **Assistant** 1, **Library** 2, **Themes** 3, **Search** 4, **Git** 5, **Outline** 6, **Api** 7, **Supabase** 8; **Router** below the divider | ok | `side_bar.dart:36-98,100-109`, `setup_general_actions.dart:44-62`, `packages/data/lib/src/supabase/supabase_plugin.dart:24` | Supabase is the only plugin panel. |
| **Library** row text; **Files** takes the Library's place in code mode (2nd, Ctrl/Cmd+2, whole project) | ok | `side_bar.dart:44-54`, `lib/project/panels/panel_actions.dart:19-26`, `packages/core/lib/src/panels/panel.dart:205-209` | |
| **Outline** icon hidden while the Outline floats | ok (unchanged) | `side_bar.dart:70-74,127` | |
| **Widget** tool: Ctrl/Cmd+K opens the Library with its search ready to add a widget | ok | `add_actions.dart:13-31`, `designer_tools.dart:172-183` | |
| Code mode: **Files** opens with the whole project tree in place of the Library; **Back** returns | ok | `side_bar.dart:44-49`, `lib/project/top_bar.dart:258-264` | |
| "In code mode and in **Settings**, **Back** at the top left ... isn't the **Back** arrow before the **Boards** chip" | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:159-166` (`TopBarBackButton`, tooltip "Back"), `top_bar_view.dart:258-271` | Both buttons have the tooltip "Back". |
| Welcome tour: seven steps (**The Design Board**, **Create Screen**, **Widget Palette**, **AI Agent**, **Run your app**, **Data Sources**, **Screens & Components**) and what each points to; **Screens & Components** points at the **Library** icon; extended steps **Git**, **Project Settings**, **Themes** | ok | `lib/project/onboarding/onboarding_step.dart:60-140`, `side_bar.dart:132,195` | The step id is still `widgetsIcon`; the anchor sits on the **Library** icon. |
| **Nothing is open**: **Open board**, **Browse widgets**, **Open code mode**; **Browse widgets** opens the Library | ok | `lib/project/panels/empty_workspace.dart:25-46` | `sidePanel = 'Library'`. |
| Unchanged rows (logo, chips, **Upgrade**, avatar, bell, `<>`, gear, **Run** / **Deploy**, status bar, panels under 600 px, resize, help) | ok (spot-checked) | `top_bar_view.dart:123-150`, `packages/designer/lib/src/designer_setup.dart:174`, `unsaved_dialog.dart` | Labels exist in 3.13. The status bar now shows `v3.13.0-79`; the page says only "The Nowa version". |
| Alt text of `get-started-editor-tour-1` (areas only) | ok | | The PNG still shows the 3.12.5 chrome until the retake. |
| Links | ok | | 31 relative links resolve; `{#welcome-tour}` kept. 1,785 words by `wc -w` (a tour with three tables; not split). |

## 10. docs/get-started/welcome.md

| claim | verdict | code ref | note |
|---|---|---|---|
| The desktop app is for macOS, Windows and Linux | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8,79-94`, `packages/core/lib/src/providers/projects_view_provider.dart:64-65` | The **Linux** button is on (`_showLinuxDownload = true`); local projects include Linux. |
| The desktop app adds local projects, running on devices and emulators, importing existing projects | ok (unchanged) | `projects_view_provider.dart:64-65` | |
| **Screen**: "The Library lists your screens" (link) | ok | `library_service.dart:221-294` | No **Page** label exists any more in the editor. |
| Unchanged rows | ok (not in the 3.13 change list) | | 24 relative links resolve. 820 words. |

## 11. docs/get-started/desktop-app.md (Linux)

Changed parts checked: description, keywords, intro, **Download and install** steps 3-4, the capture comment, the new section **Install on Linux** `{#install-on-linux}`,
the update paragraphs. Old anchors `{#setting-up-flutter-sdk}` and `{#macos-install-xcode}` are still there and are the targets of two redirects.

| claim | verdict | code ref | note |
|---|---|---|---|
| **Download Nowa** dialog with **MacOS**, **Windows**, **Linux**; shows the version; a button is greyed when the server has no link | ok | `download_nowa_dialog.dart:8,19-95` | Line reads "Download Nowa version: {version}". |
| Linux archive: 64-bit, `Nowa-v<version>-linux-x64.tar.gz`, made on Ubuntu 24.04 | ok | `.github/workflows/linux-build.yml:19-20,46-56` | `runs-on: ubuntu-24.04`; archive name from `PACKAGE_VERSION`. No minimum distribution is stated or invented (the workflow comment says rive_native needs glibc 2.38+ and libstdc++ 13+). |
| Extract the archive: folder `nowa`; run `./install.sh`; start **Nowa** from the applications menu | ok | `linux-build.yml:50-56`, `linux/packaging/install.sh`, `linux/packaging/com.nowa.nowa.desktop` | `tar -C build/linux-package -czf ... nowa`; `install.sh` is mode 100755, so `./install.sh` works; desktop entry `Name=Nowa`, `Categories=Development;IDE;`. |
| Script copies to `~/.local/share/nowa` or `nowa` inside `XDG_DATA_HOME`, adds the icon and the menu entry; running it again replaces the old copy | ok | `install.sh:6-17` | `rm -rf "$dest"` then copies. |
| In-app preview isn't available on Linux; the pane says "Your app is running", **Open in Browser**, the app's address | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:128-131,145-171` | |
| macOS and Windows: **Update to v…**, **Install & Restart**, **Skip**, **Later**, **Or download manually** | ok | `lib/dashboard/overlays/update_overlay.dart:140-154,216-217` | |
| Linux: no in-place update; the dialog offers **Download v…** and **Skip** | ok | `update_overlay.dart:140-144`, `packages/core/lib/src/services/version_service.dart:36-39` | `canAutoInstall = !kIsWeb && !isLinux`. |
| Sign in with email or Google on every desktop OS; **Continue with Apple** not on desktop | ok | `packages/core/lib/src/services/auth/auth_io.dart:14-23,55-70`, `lib/auth/auth_widgets.dart:500` | Desktop (Linux included) uses the browser consent flow. |
| "On macOS and Windows it also installs updates from inside the app" (intro) | ok | `version_service.dart:39` | |
| Unchanged: desktop-access note, **Local Setup** steps, Xcode, **Set up automatically**, existing SDK, **Version out of date** | ok (spot-checked) | `lib/upgrade_page.dart:30`, `lib/update_required_screen.dart:29` | |
| CAPTURE `get-started-desktop-app-1` well formed (MacOS, Windows and Linux buttons and the version line) | ok | | The 3.13.0 image exists (`captures/log.md`); it is not embedded yet. |
| Links and anchors | ok | | `#install-on-linux`, `../test/run.md`, `../code/local-projects.md`, `../test/devices.md`, `../code/vs-code.md` resolve. 1,115 words. |

## 12. docs/reference/glossary.md

| claim | verdict | code ref | note |
|---|---|---|---|
| Board: "Switch boards from the **Boards** chip" | ok | `top_bar_mapper.dart:87-116` | |
| Desktop app: macOS, Windows and Linux | ok | `download_nowa_dialog.dart:8,79-94` | |
| Files panel: labeled **Files**, shown in code mode, lists the whole project tree; in the designer the Library takes its place | ok | `side_bar.dart:44-54` | |
| **Library** row: sidebar panel, second icon, Ctrl/Cmd+2, search / add / drag | ok | `side_bar.dart:36-55`, `setup_general_actions.dart:44-62` | Sorted between "Instant Play" and "Local project". |
| Model: **New Model...** in the **Add** menu of the **Library** | ok | `add_lib_menu.dart:60-67`, `library_panel.dart:707-715` | |
| Screen: "The **Library** lists your screens" | ok | `library_service.dart:221-294` | |
| Widget picker: dialog with hint **Search for a widget**; opens from **Replace with...**, the **+** of an empty slot and widget-valued properties; Ctrl/Cmd+K and the **Widget** tool open the Library | ok | `widget_picker.dart:131-205`, `widget_context_menu.dart:30-40`, `widget_details.dart:243-265`, `basic_fields.dart:462-474` | |
| Renamed: Assets panel -> **Assets** chip in the **Library** | ok | `library_panel.dart:432-437,788-795` | |
| Renamed: Widgets panel -> **Library**; Open widget picker -> **Add a widget** (Ctrl/Cmd+K, now opens the Library); Board chip -> **Boards** chip with **Search boards** | ok | `side_bar.dart:36-55`, `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:44-45`, `top_bar_mapper.dart:92-116` | The sheet lists "Add a widget" and "Go to a widget" in its **Designer** group. |
| Renamed: Move Up, Move Down, Move To Top, Move To Bottom -> **Send backward**, **Bring forward**, **Send to back**, **Bring to front** (same order) | ok | `widget_context_menu.dart:45-48`, `3.12.5:packages/designer/lib/src/menus/widget_context_menu.dart:78-89` | Old `ReorderIntent(goNext: false)` = Move Up = Send backward; `goNext: true` = Move Down = Bring forward; with `allTheWay`, Move To Top = Send to back, Move To Bottom = Bring to front. |
| Links | ok | | 49 relative links resolve. 1,558 words (a glossary; not split). |
