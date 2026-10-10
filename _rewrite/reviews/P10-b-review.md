# P10-b review: design and code pages updated to Nowa 3.13 (writer W30b)

Verifier: non-author agent. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Baseline for "what changed":
`git diff 9844ed6 -- <page>`; product baseline `b84bfdafd` (3.12.5). Code refs are `path:line` in the 3.13 tree.
Tools: grep for exact labels; a link checker (relative links and `#anchors` in every page of the batch, plus every inbound link
to these pages from all of `docs/`).

## Summary

- **Pages checked:** 19 of 19 (design: properties, layout, themes, theme-styles, assets, templates, localization, fonts-icons, responsive;
  code: files, code-mode, custom-code, limitations, packages, import, index, vs-code, local-projects, git). `code/github.md` is not in this batch.
- **Claims checked:** about 200 verdict rows below, covering roughly 450 individual labels, keys, steps and behaviors (grouped rows list their labels).
  Every changed sentence of the 3.13 diff (`git diff 9844ed6`) was opened against the code; unchanged text was checked where a 3.13 commit touched its
  code (diffs of the cited files), and every label grepped.
- **Result:** the writer's work was accurate on labels and behavior. **Fixed 8** (7 pages), **removed 1** sentence and 3 low-value details, **tightened 2** sentences (properties.md, code-mode.md),
  **0 broken links** (267 outgoing, 270 inbound), 0 style problems (front matter, H1, rules, admonitions, hype words, emoji, heading case).
- **Fixes, most serious first:**
  1. `design/localization.md`: "Nowa AI writes its own localization code instead of adding it" is not shown by the code (the AI package has no localization prompt; only its package tool refuses `flutter_localizations`). A style pass had widened W4's verified wording. Reduced to what the code shows.
  2. `design/assets.md`, `code/files.md`: the upload and **New Folder...** target said "the folder that holds the row you clicked last". When the clicked row is itself a folder, that folder is the target. Reworded (`library_host.dart:176-186`).
  3. `code/packages.md`: the migration failure message is shown through `e.toString()`, so it reads "Exception: Could not add smooth_page_indicator to the pubspec" and the dialog stays open.
  4. `code/limitations.md`: `is` narrowing only works inside the same `&&`, `? :` or `if` (`block_tree.dart:3799-3830`), not "for what follows".
  5. `code/custom-code.md`: a variant is inserted at its `size:` only if the `@Preview` sets one.
  6. `design/themes.md`: "A theme that your code builds with a function is one too" could be read as "a function returning `ThemeData` is listed"; only `ThemeData` variables are (`themes_panel.dart:57-62`).
- **Length:** `code/files.md` grew from 1,166 to 1,641 prose words with 3.13; I cut it to 1,573 without dropping steps. It still covers the Library, **Files** and Search; see open issue 2.

## Link and anchor check (all 19 pages)

267 outgoing links (relative paths, `#anchors`, `/img/` files) in the 19 pages: 0 broken. 270 inbound links from the rest of `docs/` to
these pages (with anchors such as `files.md#add-files`, `layout.md#groups`, `custom-code.md#...`): 0 broken. Links into
`design/library.md` anchors from these pages are included and resolve. Required anchor `{#groups}` on `layout.md` exists (redirect
`/ui/layout/groups`).

## docs/design/properties.md

Changed in 3.13: one table row (**A choice**).

| claim | verdict | code ref | note |
|---|---|---|---|
| A nullable enum property's dropdown starts with **Default** | ok | `packages/core/lib/src/fields/basic_fields.dart:1542` (`if (type.isNullable) const DropdownMenuItem(value: null, child: Text('Default'))`) | first item of `values`; shown only when `type.isNullable` |
| Choosing **Default** removes the value so the widget's own default applies | ok | `basic_fields.dart:1538` (`newVal == null ? field.remove() : field.update(...)`), comment at `:1541` | same call as the field menu's **Reset to default** (`block_field.dart:838`) |
| A property with no value shows **Default** | ok | `basic_fields.dart:1520-1521` (`_findName` returns `null` for an unset value), `nowa_fields.dart:877-882` (`checkCustom` only adds "Custom" when no item matches; the `null` item matches) | only for nullable enums, as the sentence says ("may be empty") |
| 16 other labels and the section list (Create a component, Add description, Open in New Tab, Widget x N, Mixed, Kept as code, Individual padding, Load More, Reset to default, Set to null, Link menu items Detach... / Create Param... / Create Variable... / Custom Expression..., Search for a wrapper, Add Wrapper, Show/Hide advanced options) | ok | `name_group.dart:19,95`, `widget_details.dart:69,194,369,552`, `field_link_menu.dart:353-374`, `block_field.dart:838-840,1332`, `basic_fields.dart:819` | unchanged text; 3.13 diff of `widget_details.dart`, `group_details.dart`, `board_details.dart` is NButton restyle only |
| "Nowa has 32 wrappers" | ok | `packages/core/lib/src/wrappers_to_add.dart` (32 `WrapperData`, file unchanged since 3.12.5) | |
| Links (23) | ok | link checker | `layout.md#groups`, `theme-styles.md#use-a-theme-text-style`, `fonts-icons.md#choose-an-icon`, `select-and-edit.md#undo-and-redo`, `boards.md#set-the-board-color-and-grid` all resolve |

No 3.12.5 wording found (no Widgets panel / picker mention). Fixed 0, removed 0. One clarifying example added to the new sentence ("such as **Text Align** on a **Text**";
`TextAlign?` is nullable: `packages/core/lib/src/interpreter/libraries/material_library.dart:54894`, library enums are `EnumDecl`s: `declaration_internal.dart:83`) so that the claim is bounded to nullable
enum dropdowns and not read as true of every dropdown. Length 1,335 words by `wc -w` (tables included), unchanged apart from the one row; not cut.

## docs/design/layout.md

Changed in 3.13: the "empty Group" sentence and the Wrap / List View bullets (3 "widget picker" mentions now point to the Library).

| claim | verdict | code ref | note |
|---|---|---|---|
| Ctrl/Cmd+K opens the Library, where you can add a **Group** | ok | `packages/designer/lib/src/actions/add_actions.dart:13-31` (`workspace.toggleSidePanel('Library')` when another panel is open, then `library.focusSearch(add: true)`) | the picker dialog is only the fallback during a walkthrough |
| Type `group`, select **Group**, press Enter | ok | `packages/nowa_ui/lib/library/library_panel.dart:245-262` (search groups in `LibrarySource.values` order: Project, Packages, Built-in, Assets), `:241` (`_firstSymbolRow` highlighted as you type), `:394-397` (`_rank`: Nowa's picks, then prefix, then A-Z); `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:268-277` (built-in **Group**), `library_service.dart:451` (`featured: true`), `library_contract.dart:223-225` (default kinds include `widget`) | "select **Group**" is the careful wording: a project widget whose name contains "group" would be the first row instead; with none, Group is the first row and Enter alone works |
| **Wrap** and **List View** can be added from the Library | ok | `widgets_to_add.dart:467-477` (**Wrap**), `:318-345` (**List View**, `itemCount: 3`, `listViewItemPlaceholder`) | built-in picks, kind `widget`, so the default **Widgets** filter lists them |
| Group section buttons (Stack / Row / Column), Gap, Padding, Individual padding, Alignment grid, Main Axis Size, Spacing options, L/T/R/B/W/H, Fixed/Auto/Expand, constraint dropdowns, Add Wrapper > Scroll View | ok (unchanged text) | `group_details.dart` and `widget_details.dart` diffs 3.12.5 to 3.13 are NButton/NMenuEntry restyle only; `inline_wrapper_fields.dart:132` (**Individual padding**) | no behavior change found |
| Links (8), `{#groups}` anchor | ok | link checker; `[Library](library.md)` resolves | redirect `/ui/layout/groups` target intact |

No 3.12.5 wording left (no "widget picker"). Fixed 0, removed 0. 1,130 words.

## docs/design/themes.md

Changed in 3.13: the "Each theme is a variable..." paragraph, **Delete** on the applied theme, the color-roles sentence, the extension tabs section.

| claim | verdict | code ref | note |
|---|---|---|---|
| Only variables of type `ThemeData` are listed as themes; other variables in the file are not | ok | `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:57-62` (`.where((variable) => variable.type == $ThemeData.thisType)`; 3.12.5 listed every variable) | |
| A function-built theme is listed too | fixed (wording) | `themes_panel.dart:57-62` lists variables only; `packages/core/test/envirnoment_tests/theme_tokens_test.dart:500-512` (`final ThemeData night = _base(...)` is the function-built case) | the original sentence "A theme that your code builds with a function is one too" could be read as "a function returning ThemeData is listed", which it is not. Now: "A `ThemeData` variable that a function builds is listed too." |
| **Delete** on the **Active** theme is greyed out and says **The applied theme** | ok | `packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart:7-20` (`subtitle: applied ? 'The applied theme' : null`, `enabled: !applied`, `applied` = `activeThemeVar`, the same variable that gets the **Active** label, `themes_panel.dart:63,239,251`) | 3.12.5 showed a tooltip "Cannot delete applied theme" instead |
| Rename / Delete menu, **Create New Theme**, **Active**, **Refresh**, **Open in New Tab**, **Create Theme Setup**, **Override Color Role**, **Scheme Variant**, **Seed Color**, **Add Color**, **Reset all to default**, **Default Font** (only for `ThemeData(...)` themes) | ok | `themes_panel.dart:190-193,271`, `theme_setup_view.dart:13,56`, `override_color_popup.dart:161`, `theme_panel_fields.dart:205-207,269`, `theme_panel_details.dart:137`, `text_fields.dart:868` | labels unchanged |
| A color field shows a role's name (`primary`) or an extension color's name (`brand`) when the widget follows the theme | ok | `packages/core/test/envirnoment_tests/theme_tokens_test.dart:106-115` (field that reads a token shows `accent`), `color_fields.dart` (`StyleHelper.styleName`) | |
| Extension tabs: one per extension, named after its class | ok | `theme_panel_details.dart:15-47` (`NowaTabItem(label: ...cachedReturnType.name ?? 'Extension')`) | |
| A theme written as `ThemeData(...)` also keeps a **Default Theme** tab, first | ok | `theme_panel_details.dart:22,36,42` (`_isWrittenOut` = constructor call whose class is `ThemeData`; tab added first) | |
| A theme built by a function or `copyWith` shows only its extension tabs | ok | `theme_panel_details.dart:22` (`copyWith` is a function-call delegate, not a `ConstructorCallDelegate`: `block_tree.dart:5846`), test `theme_tokens_test.dart:254-277` ("Default Theme" `findsNothing`); extensions found through `theme_service.dart:37-48` (`extensionsOf`) | |
| A color that points to another color (`AppColors.primary`) shows as the color it reads | ok | `themes_panel.dart:214` (`colorsAsValues: true`), `packages/core/lib/src/fields/block_field.dart:861-880` (`BFColor(field, showValue: true)` for a linked `Color`) | |
| Nowa supports up to 8 theme extensions | ok | `packages/core/lib/src/themes/theme_class_instance.dart:21-31` ("Cannot have more than 8 Theme Extensions") | |
| Ctrl/Cmd+3 opens Themes; Ctrl/Cmd+Z / Y undo inside the panel | ok | `lib/project/side_bar.dart:36-80` (Assistant 1, Library 2, Themes 3), `themes_panel.dart:162-163` | in code mode Files replaces Library in slot 2, Themes stays 3 |
| Links (11) | ok | link checker | |

Not claimed (as the writer chose): that the panel now reads the file holding the applied theme (`themes_panel.dart:44`, `theme_service.dart:31-34`).
The page still says `lib/globals/themes.dart` for new projects, which is true; for an imported project whose applied theme lives in another file
the panel reads that file. Left as written (open issue 3 below). Fixed 1 (wording), removed 0. 1,339 words, over the target but the page was that long
before 3.13 and every section is a separate task; not cut.

## docs/design/theme-styles.md

Changed in 3.13: new H3 "Colors from theme extensions" (under "Use a theme color"), one paragraph under "Use a theme text style", new CAPTURE comment `design-theme-styles-2`.

| claim | verdict | code ref | note |
|---|---|---|---|
| With theme extensions that have `Color` fields, the color list has one tab per extension (named after its class) and a last tab **Material** | ok | `packages/core/lib/src/fields/color_fields.dart:820-835` (`tokens` grouped by extension; `NowaTabBar` with one `NowaTabItem(label: extension.name)` each + `NowaTabItem(label: 'Material')`, shown `if (extensions.isNotEmpty)`); tokens = `Color` fields of every `ThemeExtension` subclass in the project: `theme_service.dart:94-101`, `ast_to_block_visitor.dart:856-862` | the page says "has colors", matching the `isNotEmpty` gate |
| **Material** holds the usual roles and **Show more colors** | ok | `color_fields.dart:849-880` (`allThemeColors` + `AdvancedOptions(message: 'more colors')` at `:865-866`), `block_field.dart:1331-1362` (`'Show ${widget.message}'`) | the 3.12.5 text already had **Show more colors** |
| Picker opens on the linked color's extension; the first extension when the field isn't linked; **Material** when linked to a Material role | ok | `color_fields.dart:886-891` (`_tabOf`: user-picked tab, else extension of the picked token, else `styleName == null ? 0 : extensions.length`) | |
| Picking an extension color shows its name (`brand`) | ok | `packages/core/test/envirnoment_tests/theme_tokens_test.dart:106-115,193-212` (`styleName == 'accent'`, text `accent` shown) | |
| The field reads `AppColors.of(context).brand`, or `Theme.of(context).extension<AppColors>()!.brand` if the class has no `of` | ok | `packages/core/lib/src/themes/theme_token.dart:22-31`; test `theme_tokens_test.dart:64-75` | |
| Extension colors have no **Edit** button; change them in the **Themes** panel | ok | `color_fields.dart:148-175` (`onEdit: field != null ? _onEdit : null` at `:170`; extension tiles built without `field:` at `:840-848`); extensions are edited in the Themes panel tabs (`theme_panel_details.dart`, see themes.md) | |
| **Text Styles**: a header per extension that has `TextStyle` fields (extension's name), listed first, then a **Material** header over the usual styles; headers only when there are extension styles | ok | `packages/core/lib/src/fields/style_fields/style_fields.dart:226-283` (`StyleGroupHeader(extension.name)` at `:248`, `if (tokens.isNotEmpty) const StyleGroupHeader('Material')` at `:261`) | |
| Extension text styles have no **Edit** button | ok | `style_fields.dart:250-257` (`TextStyleTile(null, ...)`), `text_fields.dart:939,981` (`onEdit: field != null ? _onEdit : null`), `style_fields.dart:331` (the **Edit** button only when `onEdit` is set) | |
| 12 other labels in the unchanged text (Colors From Theme, With values, Alpha, Show more, CopyWith, Remove CopyWith, Modify Style, Button Style, Button Theme, Connect to Theme, Default theme, Select theme) | ok (unchanged) | grep hits in `color_fields.dart`, `text_fields.dart`, `style_fields.dart`, `button_fields` (no 3.13 label diff) | these lines are not in the 3.13 diff |
| CAPTURE comment well formed | ok | | id, state, show, crop present; request row exists in `captures/requests/W30b.md` |
| Links (11) | ok | link checker | `themes.md#edit-theme-extensions` resolves |

Fixed 0, removed 0. 1,080 words.


## docs/design/assets.md

Heavily changed in 3.13 (Library replaces the Files panel for assets): Import files, Drag an asset onto the board, Rename/remove/find, keywords, alt text of `design-assets-1`.

| claim | verdict | code ref | note |
|---|---|---|---|
| Open the Library in the left sidebar, or Ctrl/Cmd+2 | ok | `lib/project/side_bar.dart:36-80` (icon order), `lib/project/panels/panel_actions.dart:19-26` | |
| **Add** (+) in the Library header (tooltip "Add") opens a menu with **Upload Assets...** | ok | `packages/nowa_ui/lib/library/library_panel.dart:708-713` (`tooltip: 'Add'`), `lib/project/panels/library_panel/library_host.dart:176-186` (`NMenuEntry(label: 'Upload Assets...')`) | the menu lists, in order: New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., plugin entries (API Collection...), Import Dart code..., Upload Assets... (`add_lib_menu.dart:37-103`); matches the alt text and the live menu in `captures/ui-diffs-3.13.md` |
| Pick one or more files; they go into `assets/` | ok | `packages/core/lib/src/providers/project_provider.dart:792` (`pickFiles(allowMultiple: true)`, `importInDir`) | |
| Upload target: `assets/`, or the `assets/` subfolder you clicked last (for a file, its folder) | fixed | `library_host.dart:176-181` (`folder = entity is NDirectory ? entity : entity?.parent`; used only `if (folder.isAssets \|\| folder.isInAssets)`, else `assetsDir`), `library_panel.dart:607-612,515-524` (`_active` = row clicked, moved to with the arrows, or right-clicked) | was "the folder in `assets/` that holds the row you clicked last", which is wrong when the clicked row is itself a folder (the upload goes into that folder). A clicked project (lib) row leaves the target at `assets/` |
| Right-click a folder inside `assets/`, choose **Upload assets...** | ok | `library_host.dart:164-165` (`entity is NDirectory && (isAssets \|\| isInAssets)`; `isInAssets` = has the `assets` folder as a parent, `nfile_impl.dart:44`), `library_service.dart:296-345` (the assets root has no row of its own: `_assetNodes(assetsDir)` lists its children) | menu label is lower-case "assets" here, upper-case in the Add menu; the page matches both |
| Turn on the **Assets** chip to see the files; click a file for a preview; double-click or Enter opens it | ok | `library_panel.dart:782-795` (chips Project / Packages / Built-in / Assets, hidden while searching), `library_host.dart:145-154` (`_open`: asset file -> `openFile`), `packages/core/lib/src/library/library_actions.dart:14-15,93-123` (`_AssetPreview`, loads the next asset as the selection moves) | |
| `pubspec.yaml` is updated for you (folders with files under `flutter: assets:`, fonts under `fonts:`) | ok (unchanged) | not in the 3.13 diff of `project_provider.dart`/`pubspec_manager.dart` | |
| File-type table, "any other type is read as plain text" | ok (unchanged) | | |
| Duplicate sentence "You can drag files between folders inside **assets** to move them." | removed | | it repeated the move sentence in the last section and still used the old **assets**-row wording |
| Asset pickers: **Pick Image** / **Pick SVG** / **Pick Lottie** / **Pick Rive** / **Pick Video** / **Pick Audio**, **Upload Image**, tab **Asset** | ok (unchanged) | `packages/core/lib/src/fields/asset_fields.dart:48-56,173-181` (`'Pick $name'`, `'Upload ${widget.name}'`), `basic_fields.dart:921,989,1085,1169,1223,1285` | 3.13 diff of `asset_fields.dart` is restyle only |
| Paste an image: saved as `pasted_image_<id>` | ok (unchanged) | `packages/designer/lib/src/design/copy_paste.dart:115` | |
| Turn on the **Assets** chip, then drag a file onto the board; the widget table is unchanged | ok | `packages/designer/lib/src/design_experience/designer_board_controller.dart:240-262` (`LibraryDragData` -> `dragDataFor`), `library_service.dart:121-127` (asset `NFile` -> `entity.content.createDragData()`, the same call the Files tree used) | |
| Search "looks in your assets even when the **Assets** chip is off" | ok | `library_panel.dart:258-271` (loops over every `LibrarySource.values`), `:331-332` (`_shows`: assets ignore the kind filter) | chips are hidden while searching (`:782`) |
| "The Library works on one file at a time" | ok | no multi-select in `library_panel.dart` (`_active` is a single id) | |
| Menu for an asset file: **Open** (Enter), **Rename** (F2, in place), **Delete**, **Show in code**; folders: **Upload assets...** | ok | `library_host.dart:158-171` (entries and shortcut hints `⏎`, `F2`; no **Insert** for an asset because `widgetFor` is null) | |
| **Delete** asks, confirm with **Yes**; Ctrl/Cmd+Z undoes while the Library has focus | ok | `library_host.dart:39,216-231,298-299` (`RemoveIntent` -> `RemoveFileAction` through the Library's own `Undo`), `packages/core/lib/src/file_system/actions/file_actions.dart:121-160` ("Are you sure you want to delete "name"?"), `packages/core/lib/src/widgets/nowa_dialogs.dart:6-24` (**Cancel** / **Yes**) | |
| **Rename**: widgets that use the file keep the old path | ok (unchanged) | `file_actions.dart:383-387` (`move`, no reference rewrite for assets) | |
| **Show in code** switches to code mode and opens the file | ok | `library_host.dart:234-243` (`switchMode(WorkspaceMode.code)`, `openFile`) | |
| The Delete key does nothing in the Library | ok | `library_panel.dart:544-573` (typing, up arrow `:554`, F2 `:558`, Esc `:562`, Enter only) | |
| Drag a row onto another folder in `assets/` moves it | ok | `library_host.dart:245-263` (`_canMove`: assets stay in assets) | no row for the `assets` root, so a file cannot be moved back to the top level from the Library; the Files tree can |
| **Copy as path**, **View in folder** (local) and **Show file content** are in code mode's **Files** tree next to **Remove file**, **Cut**, **Paste** | ok | `lib/project/panels/files_panel/files_tree_host.dart:440-494` | |
| Keywords (`upload assets`, `library`); links (11) | ok | link checker; `[Library](library.md)`, `../code/files.md` resolve | |

Open: the alt text describes the 3.13 Library shot, but `static/img/docs/design/design-assets-1.png` is still the 3.12.5 Files-panel image (file dated 8 Oct) until the re-take in `captures/requests/W30b.md` is embedded.
Fixed 1, removed 1 (duplicate sentence). 986 words.

## docs/design/templates.md

Changed in 3.13: one bullet ("Other places to start from": Library **Add** (+) > **New Widget...**).

| claim | verdict | code ref | note |
|---|---|---|---|
| Library header **Add** (+) > **New Widget...** opens the same template picker | ok | `lib/project/panels/files_panel/add_lib_menu.dart:37-49` (`NMenuEntry(label: 'New Widget...')` -> `showTemplatePicker`), `packages/nowa_ui/lib/library/library_panel.dart:708-713` (tooltip "Add") | first entry of the menu |
| The new file opens on its own instead of landing on a board | ok | `add_lib_menu.dart:40-47` (`onAdded` -> `EditorProvider.openFile`; nothing is placed on a board) | the Screen tool's picker places on the board (unchanged) |
| Link text "Find and add things with the Library" -> `library.md` | ok | `docs/design/library.md` front matter `title:` | library.md lists **New Widget...** with the same description |
| Template dialogs, names, **Premium** list, built-in list, routes (unchanged text) | ok | `add_template_action.dart` / `file_actions.dart:25-70` (single file: `addRouteByWidget`; `targetDir` pages/components), `templates_service.dart` (not changed in 3.13), dialog diffs (`add_template_dialog.dart`, `template_files_list.dart`) are NButton/NListTile restyle; the file tree's right-click menu now has only **Rename** (no "New Folder"), which the page does not mention | page says "rename and move" the files, still true |
| Research claim "Onboarding templates add `smooth_page_indicator`" is NOT on the page | ok (agree with the writer) | `packages/core/lib/src/services/templates/built_in/onboarding_template.dart:6` (metadata `packages: {...}`); the only reader of `template.packages` is `ProjectProvider.importTemplate` (`project_provider.dart:766-773`), called only from `template_project_provider.dart:58`; the add flow (`file_actions.dart:25-70`, `add_template_dialog.dart`) never calls `registerPackage` (callers listed with grep: AI tools, data managers, migrations, `packages_provider.dart`, `dependency.dart`) | nothing is claimed; live check item 14 below |
| Links (11) | ok | link checker | |

Fixed 0, removed 0. 738 words.

## docs/design/localization.md

Changed in 3.13: two new paragraphs (SDK package counts as installed; failing delegate) and one added sentence about the AI package tool.

| claim | verdict | code ref | note |
|---|---|---|---|
| "Nowa doesn't support the `flutter_localizations` package, so Nowa AI writes its own localization code instead of adding it" | fixed | `packages/ai/lib/src/tools/packages_tool.dart:164-169` (tool result only: "flutter_localizations is not supported by nowa, use a different approach."); `packages/ai` has no localization prompt (grep) | the style pass (`efd822e`) had widened W4's verified wording ("Nowa AI can't add the package") into a claim about what the AI writes, which the code cannot show. Now: "Nowa AI can't add the `flutter_localizations` package to a project. Its package tool refuses the package and tells the agent to use a different approach." (merged with the writer's added sentence) |
| A pubspec that lists `flutter_localizations: {sdk: flutter}` counts as installed, so **Problems** no longer says it is missing from the pubspec | ok | `packages/core/lib/src/interpreter/packages/package_service.dart:363-369` (`isPackageInstalled`: `declared is Map && declared.containsKey('sdk')`), `:411-421` (problem text "'$name' is imported but is not in the pubspec.") | |
| Nowa AI still doesn't add it for you | ok | `packages_tool.dart:164-169` | |
| A project `LocalizationsDelegate` that fails to load: the board keeps drawing; **Logs** says "Could not load" + the delegate's name + the error | ok | `packages/core/lib/src/localization/localizations_class_instance.dart:33-44` (`catch (e) { logError('Could not load ${instance.type?.name}: $e'); return null; }`) | `instance.type?.name` is the delegate class name |
| No translation editor or language switcher in the editor (unchanged) | ok | no 3.13 change; the `sdk:`/delegate changes add no UI | "the board can render it" stays as W4 verified it (`widget_info.dart:103-161`, `localization_blocks.dart`); nothing on the page claims the board draws `flutter_localizations` classes (no bridged library exists) |
| **Text Direction** property (`rtl` / `ltr`) and the **Text Direction** wrapper; **Add Wrapper** link `properties.md#add-a-wrapper` | ok (unchanged) | `packages/core/lib/src/wrappers_to_add.dart:117` | anchor exists |
| Links (4) | ok | link checker | |

Fixed 1, removed 0. 366 words.

## docs/design/fonts-icons.md

Changed in 3.13: one added sentence (`google_fonts` runs on the board).

| claim | verdict | code ref | note |
|---|---|---|---|
| Your own code that uses `google_fonts` (e.g. `GoogleFonts.poppins()`) runs on the board | ok (as far as the code shows) | `packages/core/lib/src/interpreter/libraries/google_fonts_library_custom.dart:5-45` (bridged `GoogleFonts`: `getFont` plus one static per family, each calling the real `GoogleFonts.getFont`), `packages/core/lib/src/interpreter/packages/dart_package.dart:192-196` (`googleFonts` in `SupportedPackages.all`) | the sentence says Nowa "runs it", not that the font file is guaranteed to load (the real package fetches it over the network): live check 9 |
| The package is one of the built-in packages (`../code/packages.md#how-nowa-loads-your-packages`) | ok | anchor exists; packages.md lists `google_fonts` (checked in the packages.md section below) | |
| Font picker labels (**Fonts**, **Import**, **All Fonts**, **Default Fonts**, **Imported by you**, "We recommend checking the fonts on Google Fonts"), **Default Font**, **Font Family**, icon picker | ok (unchanged) | `packages/core/lib/src/fields/text_fields.dart:612,681-683,868` | 3.13 diff of `text_fields.dart` / `icon_field.dart` is restyle only (NButton / NListTile) |
| Links (8) | ok | link checker | |

Fixed 0, removed 0. 708 words.

## docs/design/responsive.md

Changed in 3.13: two table rows (**Image**, **Color**) and one sentence (screens are clipped to their frame on the board). The research said "no edit"; the writer found these three.

| claim | verdict | code ref | note |
|---|---|---|---|
| Empty Image value: stand-in picture, 48 x 48 when the image sets no size | ok | `packages/core/lib/src/interpreter/mock.dart:113-132` (`width: val.width ?? _mockImageSize`), `:244-246` (`_mockImageSize = 48.0`), `:324-330` (`'Image'` type mock) | 3.12.5 used `Image.network(mockImage)` with no size |
| Empty Color: gray; a color that may be empty stays empty so the widget's own default shows | ok | `mock.dart:295-297` (`'Color' => type.isNullable ? null : Colors.grey`) | 3.12.5: always grey |
| A screen is clipped to its frame on the board; overflow is cut off instead of painting over neighbours | ok | `packages/core/lib/src/board/board_canvas.dart:222-230` (`ClipRect(child: CanvasDetailBuilder(...))` with the comment "A screen ends at its frame") | the clip wraps every `InstanceCanvas` (screens, components, widgets); the page names screens only, which is true |
| Text `[title]`, List three items, Icon info, Widget 48 px box | ok (unchanged) | `mock.dart:291` (`'String' => '[${name ?? '...'}]'`), `:309` (`Icons.info`), `:319-322` (`SizedBox.square(dimension: 48, child: Placeholder())` for a non-nullable Widget), `:338-345` (`mockList`, 3 items) | |
| Size presets, W/H, Play Settings, Device Size, Free Size, Orientation, Full Screen, Run Phone/Tablet/Fullscreen, Test button, Visibility steps | ok (unchanged) | not in the 3.13 diff of the touched files | `design-responsive-1` / `-2` image and CAPTURE comment unchanged |
| Links (18), including `../legacy/tutorials/design-responsive.md` and `../test/instant-play.md#placeholders-on-the-board-real-values-in-play` | ok | link checker | |

Fixed 0, removed 0. 1,428 words by `wc -w`, about 1,225 of prose without table markup (it was that long before 3.13); not cut.

## docs/code/files.md

Heavy rewrite in 3.13 (Library for add/rename/move/delete, **Files** tree in code mode only). Every claim checked. Anchors kept: `{#open-the-files-panel}`, `{#add-files}`, `#search-the-project` (inbound links from other pages: `files.md#add-files`, `files.md#search-the-project`: both resolve).

| claim | verdict | code ref | note |
|---|---|---|---|
| Library and **Files** share the second slot; click again closes | ok | `lib/project/side_bar.dart:36-80` (Assistant, then `Files` in code mode else `Library`, Themes, Search...), `:140-144` + `packages/core/lib/src/panels/panel.dart:217-224` (`toggleSidePanel` closes when already selected) | |
| Library: outside code mode, **Library** icon or Ctrl/Cmd+2; **Files**: code mode only, opens by itself, Ctrl/Cmd+2 opens it too | ok | `panel.dart:202-214` (`_applyMode`: code mode sets `_sidePanel = 'Files'`, leaving restores `_sidePanelBeforeCode`), `lib/setup_general_actions.dart:44-62` + `lib/project/panels/panel_actions.dart:19-26` (digit 2 = index 1 of `getIcons(codeMode:)`) | |
| Library lists what `lib/` declares, in folders; chips add packages, built-in widgets, assets | ok | `packages/core/lib/src/library/library_service.dart:221-242,533-564`, `packages/nowa_ui/lib/library/library_panel.dart:782-795` | |
| Library click = details card; double-click or Enter opens | ok | `library_panel.dart:515-540` (`_onTap` leaves add mode; `_activate` opens), `lib/project/panels/library_panel/library_host.dart:145-154` | after Ctrl+K (add mode) Enter inserts instead; the page describes the browse case |
| **Files**: whole project incl. `pubspec.yaml`, platform folders; names starting with "." hidden; folders closed; no add buttons; click opens a tab; follows the open tab | ok | `lib/project/panels/files_panel/files_tree_host.dart:138-142` (`fs.root.files` minus "." names), `packages/nowa_ui/lib/files/files_tree_view.dart:46` (only sections start open), `files_tree_host.dart:266-270,424-434` (`_activate` opens in code mode; `_follow`) | |
| Markers: `*` unsaved; red number and red name for problems; Git letters A/M/D/R/C | ok | `files_tree_view.dart:377,428-440` (`'${node.name}*'`, `node.problems`, `git.letter`), `packages/git_nowa/lib/src/models/git_models.dart:198-205` | |
| The Library shows the red count on rows and folders, no `*`, no Git letters | ok | `packages/nowa_ui/lib/library/library_panel.dart:1147-1156` (count, red text), `library_service.dart:553-562` (folder = sum of children); no dirty/git fields in `LibraryNode` | |
| `.git/`, `build/`, `.DS_Store` not loaded (unchanged) | ok | `local_file_service.dart` ignore list | not in this page's 3.13 diff |
| The Library does not list boards; a `.board` file in code mode opens a tab saying "Code view is not available for boards" | ok (live check 1) | `packages/designer/lib/src/board/board_editor.dart:38-44` (exact text; release builds only, `kDebugMode` shows the text editor), `files_tree_host.dart:266-270` (code mode: `OpenFileIntent`), `library_service.dart:221-242` (declarations only) | text is unchanged since 3.12.5 |
| **Add** (+) menu entries and order | ok | `lib/project/panels/files_panel/add_lib_menu.dart:37-103` (New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., plugin creators, Import Dart code...), `library_host.dart:176-186` (**Upload Assets...** last); `packages/data/lib/src/api/utils/api_util.dart:113-122` (title `API Collection...`) | the live menu in `captures/ui-diffs-3.13.md` lists the same eight |
| **New Widget...** opens the template picker | ok | `add_lib_menu.dart:37-49` | |
| **New Folder...**: inside the last-clicked `lib` folder, or directly in `lib` | fixed | `library_host.dart:176-182` (`folder = entity is NDirectory ? entity : entity?.parent`; `currentDirectory = folder` only `if (folder.isLib \|\| folder.isInLib)`, else `libDir`), `add_lib_menu.dart:50-58` | was "inside the folder of the row you clicked last, if that row is in `lib`": ambiguous for a folder row (the folder itself is the target). Now says "the `lib` folder you clicked last (for a widget or another row, the folder that holds it)" |
| **New Model...** `lib/models`, **New Global State...** `lib/globals` (attached to the app), **API Collection...** `lib/api` | ok | `packages/core/lib/src/providers/project_provider.dart:381,385,387`, `add_lib_menu.dart:60-77` (`addProvider`), `api_util.dart:129-139` | |
| **Upload Assets...** into `assets` or the last-clicked `assets` subfolder | fixed | `library_host.dart:176-186` (see assets.md) | same ambiguity as New Folder, same fix |
| Name rules for a model / global state | ok (unchanged) | `add_lib_menu.dart:17-35` (`validator: validateSymbolName`) | |
| Default **Filter** is **Widgets**, hides models and global states until **Everything** / **Models** / **Global states** | ok | `packages/nowa_ui/lib/library/library_contract.dart:214-225`, `library_panel.dart:754-772,970-985` (menu entries: Widgets, Everything, Screens, Components, Models, Global states, Classs, Functions, Enums, Variables, Private) | confirmed live by the capture agents (`ui-diffs-3.13.md`, logic/models, logic/global-state) |
| A folder shows in the Library only when something is in it; a new empty folder first appears in the **Files** tree (code mode) | ok (live check 5) | `library_service.dart:221-242,533-564` (folders exist only as parents of declarations), `files_tree_host.dart:138-142` | Files tree lists every directory |
| **Create new board** in the **Boards** chip; Ctrl/Cmd+Shift+B | ok | `lib/project/top_bar_mapper.dart:113`, `packages/designer/lib/src/designer_setup.dart:54`, `packages/designer/lib/src/actions/file_actions.dart:7-26` | not available in code mode (no chip there), the page says "in the top bar" |
| Blank tab (Ctrl/Cmd+T) offers **New Widget** and **Upload a File** | ok | `lib/empty_editor.dart:95,101`, `setup_general_actions.dart:39` (`OpenEmptyTabIntent`) | |
| Library right-click: **Insert**, **Open**, **Rename**, **Delete**, **Show in code**; drag a row onto a folder to move; lib stays in lib, assets in assets; one row at a time | ok | `library_host.dart:158-171,245-263`, `library_panel.dart` (single `_active`) | each entry shows only where it applies (Insert for widgets, Rename/Delete for the project's own rows) |
| Files right-click selects the row first; Ctrl/Cmd-click toggles, Shift-click selects a range | ok | `files_tree_host.dart:291-295`, `files_tree_view.dart:132-159` | |
| Files menu: **Remove file** / **Remove N files**, **Rename**, **Cut**, **Paste**, **Copy as path**, **View in folder** (local), **Show file content** / **Show files content**, in that order | ok | `files_tree_host.dart:440-494` | table order matches the code |
| View Only keeps only **Copy as path** and **View in folder** | ok | `files_tree_host.dart:445,462,477` (`_viewOnly`: no Remove, Rename, Cut, Paste or Show content) | **View in folder** is local only |
| **Rename**: in place, one file, type the name without the extension, Enter, F2, imports updated | ok | `files_tree_host.dart:76,383-394,408-414`, `packages/core/lib/src/file_system/nfile_impl.dart:353-358` (an extension is added back when the name has no "."), `:102-128` (`generateImports` for references) | the 3.13 field shows the full name with the part before the extension selected (`packages/nowa_ui/lib/src/components/nrename_field.dart:52-54`), so the instruction still works |
| **Cut** writes the paths; **Paste** moves them into the selected folder or the selected file's folder; Ctrl/Cmd+X, Ctrl/Cmd+V | ok | `packages/core/lib/src/file_system/actions/file_actions.dart:405-448`, `files_tree_host.dart:79,419` (`_folderOf`), `setup_general_actions.dart:31` | |
| Drag rules: lib stays in lib, assets in assets, `.board` only in boards; several selected rows drag together; a folder can't move into itself | ok | `files_tree_host.dart:311-318` (`_canDrop`), `files_tree_view.dart:392` (drag data = selected rows), `nfile_impl.dart:109-111` | |
| Keys: arrows, Enter (open file / toggle folder), Shift+arrow extends selection; Delete (Backspace on macOS) removes | ok | `files_tree_view.dart:161-190`, `packages/nowa_ui/lib/src/tree/n_tree.dart:331-376`, `packages/core/lib/src/inputs.dart:11-13`, `setup_general_actions.dart:44` | Space and Left/Right keys exist too (cut for length) |
| Delete asks "Are you sure you want to delete…?", lists uses, Ctrl/Cmd+Z undoes while **Files** has focus; `lib/main.dart` cannot be deleted (**Cannot delete file**) | ok | `file_actions.dart:121-176` (message, references dialog, `filesCannotBeDeleted`), `files_panel.dart:30-58` (own `Undo`, `FocusablePanel`) | |
| Search panel sections (unchanged text): **Text**/**Symbols**, **Aa**/**ab**/`.*`, **Show replace**, **Replace all**, "Replace N matches in M files?", "Skipped N files that changed since the search", **Go to Declaration of** | ok (unchanged) | `lib/project/panels/search_panel.dart:238,270,290,311-337,646` (3.13 diff: NButton/NListTile restyle only), `:466-478` (`_open`) | |
| Ctrl/Cmd+O in code mode: palette "Search for a file", lists `lib/`, skips `.dart_tool`, `.git`, `.gradle`, `.idea`, `.symlinks`, `build`, `ephemeral`, `node_modules`, `Pods` | ok | `packages/core/lib/src/actions/tab_actions.dart:27-96` (lists `libDir`; the project root only in debug builds) | |
| On the board Ctrl/Cmd+O opens the Library search (hint **Go to...**), Enter opens the first result | ok | `tab_actions.dart:30-37` (`library.focusSearch()` without add mode), `library_panel.dart:739` (hint `_adding ? 'Add...' : 'Go to...'`), `:636-660` (Enter) | |
| Links (22) | ok | link checker | |

Edits: 3 (New Folder wording, Upload Assets wording, length cuts: table "Open the Library or Files" turned into two bullets, keyboard paragraph shortened, redundant sentences merged). Removed (true but low value): the Space and Left/Right key details and the Library "marks the widget open in the editor" detail. The "no add buttons in **Files**" fact stays as one sentence. Fixed 2, removed 3 details.
Length: 1,166 prose words before 3.13, 1,641 after the writer, 1,573 now. Still above the target because the page documents two panels plus Search. Suggestion for the orchestrator (outside my boundaries): move "Search the project" and "Search for a file by name" to their own page.
Open: the alt text and the numbers describe the 3.13 Library shot, but `static/img/docs/code/code-files-1.png` is still the 3.12.5 Files-panel image (file dated 7 Oct); re-take is requested in `captures/requests/W30b.md`.

## docs/code/code-mode.md

Changed in 3.13: **Files** slot paragraph, "Click a file ... or Enter", Ctrl/Cmd+O note, **Show file content** and details-panel paragraphs, **Import Dart code...** location.

| claim | verdict | code ref | note |
|---|---|---|---|
| The **Files** icon takes the Library's place, second in the sidebar, Ctrl/Cmd+2; the panel opens on it | ok | `lib/project/side_bar.dart:36-80`, `packages/core/lib/src/panels/panel.dart:202-214`, `lib/setup_general_actions.dart:44-62` | |
| It shows the whole project as a tree: `lib/`, `boards/`, `assets/`, `pubspec.yaml`, platform folders | ok | `lib/project/panels/files_panel/files_tree_host.dart:138-142` (project root entries, names starting with "." hidden) | |
| When you leave code mode, the panel you used comes back | ok | `panel.dart:207-213` (`_sidePanelBeforeCode`) | |
| Click a file to open it, or move with the arrow keys and press Enter | ok | `packages/nowa_ui/lib/files/files_tree_view.dart:161-170` (Enter opens a file), `packages/nowa_ui/lib/src/tree/n_tree.dart:331-376` (arrows) | |
| In code mode Ctrl/Cmd+O is the "Search for a file" picker (lists `lib/`); on the board the same keys open the Library search | ok | `packages/core/lib/src/actions/tab_actions.dart:30-41,71` | |
| **Show file content** in **Files** opens the file as text in a tab; the entry is hidden with View Only | ok | `files_tree_host.dart:477-485` (`if (!_viewOnly && allFiles)`, `openTab(TextFileEditor(file))`) | |
| In code mode the text tab's edits reach the project on save | ok | `packages/core/lib/src/widgets/code_editor/text_editor.dart:63-69,110` (`codeMode`), `code_options.dart:144-185` ("compiled on save, not on edit", `CodeBufferService`) | |
| Outside code mode a text tab has a details panel: **Font size** (13), **Word wrap** (on), **Compile** / **Compiled** (greyed) | ok | `text_editor.dart:150-186` (side panel only when the mode is not code: `WorkspaceMode { vibe, code }`, `panel.dart:7`), `code_editor_details.dart:6-47,88-108` | the details panel also has **Open in VS Code** for local projects (not mentioned here, see vs-code.md) |
| A `pubspec.yaml` match from the **Search** panel is a way to open a text file outside code mode | ok (live check 2) | `lib/project/panels/search_panel.dart:466-478` (non-widget match -> `editors.openFile(file)`), `packages/core/lib/src/editors/editor.dart:10-42` (`YamlFile` is a `TextFileBase` -> `TextFileEditor`) | stated as an example ("such as"); not exercised live |
| **Import Dart code...** is in the Library's **Add** (+) menu; leave code mode first | ok | `lib/project/panels/files_panel/add_lib_menu.dart:98-101`, `side_bar.dart:36-80` (code mode has Files, not the Library) | |
| Tabs (**New Tab**, **Empty Tab**, **New Widget**, **Upload a File**, **Recent Files**), shortcuts table, find / replace, autocomplete, go to definition, **Save options**, banners (**Keep mine**, **Reload**), preview modes, **Open in VS Code** / **Code download**, **Back**, **Unsaved code changes** (**Save** / **Discard** / **Cancel**) | ok (unchanged) | `lib/empty_editor.dart:84,95,101,119`, `nowa_code_editor.dart:264-266`, `lib/project/panels/vibe_designer.dart:104`, `code_preview_panel.dart:214-216`, `lib/project/download_code_button.dart:35,54`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:68-72,159-167` (code mode's top-left **Back**), `packages/core/lib/src/dialogs/unsaved_code_dialog.dart` | 3.13 diffs of these files are NButton/NListTile restyle only (grep of labels) |
| Links (14) | ok | link checker | `files.md#search-the-project` resolves |

Fixed 0, removed 0 (one sentence tightened: "Click **Compile** to apply" -> "**Compile** applies"). 1,246 prose words (was 1,156); left as is.
Open: `static/img/docs/code/code-code-mode-1.png` still shows the 3.12.5 sidebar (Files at slot 5) and status bar; re-take pending (Tier 2 in the research, wave 2 of the re-takes).

## docs/code/custom-code.md

Changed in 3.13: **Widget** row of the table, new section "Preview a widget in several states" `{#preview-variants}`, Import steps 1-2, "small placeholders", keywords.

| claim | verdict | code ref | note |
|---|---|---|---|
| A widget you write shows in the Library under **Project**; Ctrl/Cmd+K then its name; drag it onto a screen | ok | `packages/core/lib/src/library/library_service.dart:221-251` (project widgets), `packages/designer/lib/src/actions/add_actions.dart:13-31` | the **Components** chip is dialog-only (`widget_picker.dart`), correctly gone from this row |
| `@Preview` on a function, a static method or a constructor is a variant of the widget it builds | ok | `packages/core/lib/src/interpreter/services/variant_service.dart:63-72` (`WidgetVariant.from`), `:175-190` (`_build` scans top-level functions and each class's `declarations`: static methods and constructors) | instance methods are not scanned |
| Name = the `name:` argument, else the function name in Title Case ("Five Stars" for `fiveStars`) | ok | `variant_service.dart:28` (`convertNameCase(..., Cases.titlecase)` = `recase` `titleCase`, `naming.dart:172`) | the example sets `name:`, so the Title Case remark is hypothetical, as the sentence says |
| Nowa reads `group:` and `size:` too | ok | `variant_service.dart:31-34` | |
| Open the screen or component on its own (for example by double-clicking it in the Library): each variant is a canvas next to it, titled with its name | ok | `library_actions.dart:64-72` (`openLibrarySource` -> `openFile(...).navigate(decl)`), `packages/designer/lib/src/widgets/widget_designer.dart:58-140` (`_showVariants`, `_layOutVariants`), `packages/designer/lib/src/panels/canvas_titles.dart:396` (`_variant?.name`) | |
| Variants with the same `group:` stack in one column, headed by the group's name | ok | `widget_designer.dart:109-135` (one column per group; the component and ungrouped variants lead the first column), `canvas_titles.dart:20-37,75-85` (`_groupHeads`, header only in a component's own view) | |
| Hover a variant's title for **Play**, **Open in new tab** (jumps to the preview code), **Add to board** | ok | `canvas_titles.dart:318-377` (tooltips `'Play'`, `'Open in new tab'` -> `openFile(declaration.sourceFile).navigate(_declaration)` = the preview function, `'Add to board'` only for variants) | **Play** also stays visible while the canvas is selected |
| **Add to board** asks which board; "This package has no boards yet" | ok | `packages/designer/lib/src/actions/add_variant_to_board.dart:11-38` (popup "Add to board" listing the package's boards, last-opened first; snackbar text exact) | it also opens the chosen board afterwards (`:36`), not mentioned |
| In the Library variants are rows under their widget; insert one at its `size:` if the `@Preview` sets one | fixed | `library_service.dart:272-293` (`_variantNode` children), `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:46-72` (`withVariant`: `width: variant.size?.width ?? width`, `height: variant.size?.height ?? ...`) | was "at the size its `@Preview` asks for", which is only true when it asks for one; without `size:` the component's own width applies and the height hugs the content |
| Previews in a `design/` folder at the top of the project or package are read when they name the widget and contain `@Preview` | ok | `variant_service.dart:135-170` (`load`: text search for the widget's name, whole word, case-sensitive, in `<package>/design`; files without `@Preview` skipped), `packages/core/lib/src/providers/project_provider.dart:372-375` (`designDir`), called from `widget_designer.dart:78-80` | read when the component is opened on its own |
| Example imports `package:flutter/widget_previews.dart`; Nowa keeps `@Preview` and its import | ok (live check 8) | `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:241,296-320` (`_annotationLibraries = {'Preview': 'package:flutter/widget_previews.dart'}`), `packages/nowa_ui/design/nmenu.dart:1-10` (the repo's own previews use the same import) | |
| Import steps: code mode has **Files**, not the Library; Library **Add** (+) > **Import Dart code...** | ok | `lib/project/panels/files_panel/add_lib_menu.dart:98-101`, `lib/project/side_bar.dart:36-80` | |
| Import dialog (**From file**, **Import**, **Import as Custom code**), sorting by kind, "A `main` function can't be imported" | ok (unchanged) | `lib/project/panels/files_panel/import_dart_code.dart:46-76` (3.13 diff: NButton restyle), `packages/core/lib/src/file_system/dart_importer.dart:187-215` (no diff; "Cannot modify main function") | |
| `@CustomFunction` section, "calling: readingTime" | ok (unchanged) | not in the 3.13 diff | |
| Links (19): `files.md#add-files`, `index.md#how-code-and-design-stay-in-sync`, `library.md`, `components.md` | ok | link checker | |

Fixed 1, removed 0. 1,020 prose words (was 773). Not claimed (as the writer chose): variant chips in the widget picker dialog, the Outline naming a variant canvas.
Open: items under "Needs a live check" 8 (canvases, group columns, hover icons, **Add to board**, `design/` folder, import accepted by the playground).

## docs/code/limitations.md

Changed in 3.13: placeholder table rows 1 and 3, two new paragraphs (empty values stay empty; wrapper/effect and sliver stand-ins), switch patterns row and "These do work", extended Flutter classes, `part` / `library` lines, packages bullet, `super(...)` bullet.

| claim | verdict | code ref | note |
|---|---|---|---|
| An unsupported package widget is a small crossed box only as big as its name | ok | `packages/core/lib/src/interpreter/mock_dynamic.dart:157-176` (`MockWidgetWarning`: `Placeholder(strokeWidth: 1)` around a 10 px `Text(name)`; comment: sized to its label, a parent that forces a size still fills it) | 3.12.5 filled up to 400 px |
| "A small crossed box with no name": a widget with no value, a small slot | ok | `packages/core/lib/src/interpreter/mock.dart:319-322` (`SizedBox.square(dimension: 48, child: Placeholder())`) | |
| A value that may be empty (number, true/false, color, enum) stays empty so the widget's own default shows; other empty values get a stand-in | ok | `mock.dart:285-310` (nullable `int`, `double`, `bool`, `Color`, `DateTime`, `Duration` and project enums return `null`) | link `../design/responsive.md#design-with-realistic-content` resolves |
| A package widget that wraps a child shows the child; so does an effect method called on a widget | ok | `mock_dynamic.dart:92-140` (`_standIn`: `Animate(child: page)`, `page.animate().fade()`) | |
| A widget that can't be drawn in a `sliver:` / `slivers:` slot is drawn as a sliver | ok | `mock_dynamic.dart:36-70` (`mockWidget` -> `SliverToBoxAdapter`, `fillsSliverSlot`) | |
| `switch`: `when`, list and map patterns still unsupported; relational and `&&` patterns, `\|\|`, object and positional record patterns work | ok | `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1517-1521` (`when`), `:1551-1558` (`&&`, relational), `:1580-1582` (other patterns throw) | a record pattern with named fields also throws (`:1576-1579`); not listed on the page (not wrong, just not exhaustive) |
| An `is` check narrows the value inside the same `&&`, `? :` or `if` (`other is Trip && other.id == id`) | fixed (wording) | `packages/core/lib/src/interpreter/block_tree.dart:3799-3830` (`_promotedPrefixType`: `x is T && x.member`, `x is T ? x.member : ...`, `if (x is T) { x.member }`) | was "narrows the value for what follows it", which overstates: an early `if (x is! T) return;` is not handled |
| A project class extending a Flutter class Nowa can't construct: the board uses what the object wraps (an inner `ImageProvider`) or a placeholder of that class; **Problems** still warns | ok | `packages/core/lib/src/interpreter/declaration_internal.dart:211-236` (`_standInFor`), `packages/core/lib/src/interpreter/block_problems.dart:357-367` (message starts "'X' extends 'Y', which Nowa can read but cannot construct.") | |
| Rewriting keeps `library;`, `part '...';`, `part of '...';` and adds no generated imports to a part file; `part` is still not followed | ok | `packages/core/lib/src/interpreter/block_tree.dart:6974-7060` (`libraryDirective`, `partDirectives`, `isPart` -> no imports), `ast_to_block_visitor.dart:186-232` | |
| `git:` / `path:` packages are listed; in a local project they load from where `flutter pub get` put them; `sdk:` counts as installed but isn't loaded; other hosts and `dev_dependencies` aren't loaded | ok (cloud projects: live check 3) | `packages/core/lib/src/interpreter/packages/package_service.dart:57-70` (`isSource`), `:363-369` (`isPackageInstalled`), `packages/core/lib/src/interpreter/packages/local/package_resolver_service_local.dart:105-113,256-270` (`pub get`, then `package_config.json`) | only the local path is claimed |
| `super(...)`: `assert(...)` and positional arguments don't run; named arguments of `super(name: x)` are read like `super.name` | ok | `packages/core/lib/src/interpreter/declaration_runtime.dart:1715-1735` (`rawInitializers` "They do not run"), `:1823-1835` (named `super(...)` args defined like `super.x`; non-String keys skipped) | |
| Unchanged rows (generators, `extension type`, list/map and pattern assignment, State mixins, `show`, conditional imports, `super.method()`, `'$item'`, multiple `catch`, `operator []`, records) | ok (unchanged) | `block_tree.dart:1864,1890` ("Multiple catch clauses are not supported yet"); no 3.13 diff touches the other behaviors | |
| Links (11) | ok | link checker | |

Fixed 1 (wording), removed 0. 1,293 prose words (was 1,054): a reference page; the new rows are one line each. Left as is.
Images: `code-limitations-1.png` was re-taken from 3.13 in the working tree (KeepAliveBox with the **Kept as code** box in **Details**); the alt text still fits. It does not show the new small crossed-box placeholder (not needed).

## docs/code/packages.md

Changed in 3.13: caution under "Change a version", the first "How Nowa loads your packages" bullet, built-in list, `nowa_runtime` bullet, the note, new section "Handle the Page indicator migration" `{#page-indicator-migration}`, the outside-edits paragraph.

| claim | verdict | code ref | note |
|---|---|---|---|
| `git:` and `path:` packages are listed with an empty **Version**; in a local project they load from where `flutter pub get` put them | ok (cloud projects: live check 3) | `packages/core/lib/src/interpreter/packages/package_service.dart:57-70` (`isSource`, `DartPackage(name, "")`), `packages/core/lib/src/settings/packages/packages_provider.dart:20-24`, `packages/core/lib/src/interpreter/packages/local/package_resolver_service_local.dart:105-113,256-270` | only the local path is claimed |
| An `sdk:` package such as `flutter_localizations` counts as installed but isn't loaded; another host and `dev_dependencies` aren't loaded; the dev-dependency problem text | ok | `package_service.dart:363-369` (`isPackageInstalled`), `:57-70`, `:411-421` ("'$name' is a dev dependency, so Nowa does not load it. Move it to dependencies to use it in lib/.") | text matches exactly |
| Caution: a **Version** typed for a Git/path package replaces its `git:` / `path:` entry | ok (derived, live check 4) | `packages/core/lib/src/settings/packages/packages_settings.dart:354-395` (every Version cell is an editable field; `onEditingComplete` -> `updateVersion`), `packages_provider.dart:52-56`, `package_service.dart:319-343` -> `pubspec_manager.dart:167-171` (`dependencies[name] = version`) | even pressing Enter in the empty cell would write an empty string; the page's advice is conservative |
| Built-in: `gap`, `flutter_animate`, `google_fonts`, `smooth_page_indicator` added | ok | `packages/core/lib/src/interpreter/packages/dart_package.dart:82-130,192-196` | versions not quoted |
| `nowa_runtime` is `^0.2.0` in 3.13; a typed version is reset on open; 0.2.0 no longer includes `smooth_page_indicator` | ok | `packages/core/lib/version.dart:4`, `packages/nowa_runtime/CHANGELOG.md:1-3`, `package_service.dart:117-120` | the "(`^0.2.0` in Nowa 3.13)" pin will age; harmless |
| Dialog **Page indicator migration** with the message, buttons **Later** and **Migrate**, appears on open when the project lists `nowa_runtime`, lacks `smooth_page_indicator` and a `lib/` Dart file uses a name of it (or imports it) | ok (live check 10) | `packages/core/lib/src/migrations/migration_service.dart:191-262` (title, message with the file names, `Later`, `MigrateButton` with label `Migrate` at `:140-141`), `packages/core/lib/src/plugin.dart:152` (migrations run on every project open; this one ignores the version) | with no focus context it applies silently (`:209`), not mentioned |
| **Migrate** adds the package to `pubspec.yaml` and the import to each file that uses it | ok | `migration_service.dart:243-262` (`registerPackage`, then the import after the last import of each file that lacks it) | |
| If adding fails: message "Could not add smooth_page_indicator to the pubspec" | fixed | `migration_service.dart:250-252` (`throw Exception(...)`), `:147-150` (`showSnackbarError(context, e.toString())`; the dialog stays open), `packages/core/lib/src/utils.dart:108-120` | the red snackbar shows `e.toString()`, which is "Exception: Could not add ..."; the page now quotes that and says the dialog stays open |
| **Later** leaves everything; the dialog returns on the next open | ok | `migration_service.dart:226-229`, `plugin.dart:152` | |
| Outside edits (local project): the pubspec is re-read and new dependencies load; failure logs "Could not load the dependencies added outside Nowa" + the error | ok | `packages/core/lib/src/providers/default_project_observer.dart:17-36` (`logWarning`), `packages/core/lib/src/settings/pubspec_manager.dart:78-90`, `package_service.dart:230-240`, `packages/core/lib/src/services/local_file_service.dart:262-269` (only the local service raises the event) | |
| Labels: **Packages**, **Name**, **Version**, **Search...**, **Add New Package**, **New Package**, "Loading packages...", "Package is already installed", **Add Missing Dependencies**, **Pub get**, **load packages** | ok (unchanged) | `packages_settings.dart:99,122,263,275`, `missing_dependency_dialog.dart:6`, `experimental_flags_dialog.dart:55`; 3.13 diff of `packages_settings.dart` is NButton restyle only | |
| Links (13): `../design/add-widgets.md#add-a-widget-that-needs-a-package`, `../account/project-settings.md#...` | ok | link checker | |

Fixed 1, removed 0. 1,124 prose words (was 875).
Images: `code-packages-1.png` was re-taken from 3.13 in the working tree (the table shows `nowa_runtime` `^0.2.0`); the alt text still fits.

## docs/code/import.md

Changed in 3.13: the Library bullet, the `.nowa/settings.json` sentence, the `main()` / `library;` / `part` clause.

| claim | verdict | code ref | note |
|---|---|---|---|
| After import, screens and components are in the Library (Ctrl/Cmd+2) under **Project**; drag one onto the board or double-click to open it | ok | `packages/core/lib/src/library/library_service.dart:221-251`, `packages/nowa_ui/lib/library/library_contract.dart:223-225` (default kinds: screens, components, widgets), `lib/project/panels/library_panel/library_host.dart:145-154` | link `../design/library.md` resolves |
| Nowa no longer raises `version` in `.nowa/settings.json` to each new release, so updating Nowa doesn't make the file show as modified in Git | ok | `packages/core/lib/version.dart:6-11` (`projectFilesVersion = '3.0.11'`), `packages/core/lib/src/plugin.dart:155-161` (3.12.5 set `version`, the app version; 3.13 sets `projectFilesVersion` only when lower) | a file with a version below 3.0.11 (or none) is still bumped once; the page doesn't promise otherwise |
| A hand-written `main()` (no `@NowaGenerated`) and the `library;` / `part` lines stay as written | ok | `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1206-1211` (only a `main` with metadata is Nowa's `MainFuncBlock`), `packages/core/lib/src/project/env_services/main_service.dart:77-86` (no `sharedPrefs` added to a project's own `main`), `block_tree.dart:6974-7060` (`library;`, `part`) | |
| Dialog labels: **Project folder**, **Browse**, **Package to open**, footers "Imported to the cloud — ...", "Imported locally — ...", "No pubspec.yaml here — ...", **Local-only project**, **Search repositories**, **Manage your connected repositories**, **Project name**, **Clone project**, "Set a default projects folder in settings to clone locally.", **Package being edited**, **Has boards**, **Workspace root**, "This workspace holds several packages. You can switch later.", **Default Projects Path**, "You need to add your credentials to access the remote repository" | ok (unchanged) | `lib/dashboard/create_new_project/import_project_dialog.dart:159,170,181,253-255`, `lib/dashboard/create_new_project/github_clone_dialog.dart:95,315`, `lib/dashboard/create_new_project/package_picker.dart:99-100,138`, `lib/project/owned_package_chip.dart:14`, `packages/core/lib/src/settings/github_integration_settings.dart:262,296`, `packages/git_nowa/lib/src/git_service.dart:111`, `packages/core/lib/src/settings/editor_settings/local_setup.dart:210` | the exception text in the code has no final period (`local_project_service.dart:106`); the page's quote adds one, as the earlier verifier accepted |
| Desktop-app gating of **Import project** (no OS list on this page) | ok | | no "macOS and Windows" wording on the page |
| Links (16) | ok | link checker | |

Fixed 0, removed 0. 1,164 prose words (was 1,105).

## docs/code/index.md

Changed in 3.13: one table row ("Manage project files": Library and the code-mode **Files** tree).

| claim | verdict | code ref | note |
|---|---|---|---|
| Add, move and delete files with the Library; browse the whole project in code mode's **Files** tree; search it | ok | see files.md section (`library_host.dart:158-171,245-263`, `files_tree_host.dart:138-142`, `lib/project/panels/search_panel.dart`) | the row says "add, move and delete" (the Library also renames); not wrong |
| `lib/pages/`, `lib/components/`, `lib/models/`, `lib/globals/`, `lib/api/`, `boards/`, `assets/`, `pubspec.yaml`, `lib/main.dart` can't be deleted (unchanged) | ok | `packages/core/lib/src/providers/project_provider.dart:376-387`, `file_actions.dart:124` | |
| Formatter page width and "refuses an edit that would leave syntax errors" (unchanged) | ok | `packages/core/lib/src/project/code_style_service.dart:50`, `packages/ai/lib/src/tools/edit_tool.dart:104` | |
| Links (27) | ok | link checker | |

Fixed 0, removed 0. 760 prose words.

## docs/code/vs-code.md

Changed in 3.13: the two "shortcuts" bullets, the Linux default path, three rows of the sync table, the ignore sentence.

| claim | verdict | code ref | note |
|---|---|---|---|
| **View in folder**: in code mode, right-click a file or folder in **Files** (local projects) | ok | `lib/project/panels/files_panel/files_tree_host.dart:472-477` (`if (gProject.project.isLocal)`), Files is code mode only (`lib/project/side_bar.dart:36-80`) | |
| Outside code mode, on a plain text file tab, **Open in VS Code** is in the details panel | ok | `packages/core/lib/src/widgets/code_editor/code_editor_details.dart:28-44` (button shown when `gProject.project.isLocal`), `text_editor.dart:150-186` (the side panel only outside code mode) | live check 2 |
| **Open in VS Code** icon at the right end of the tab bar (code mode) | ok (unchanged) | `lib/project/download_code_button.dart:54` | |
| Default **VS code Path**: `/usr/local/bin` macOS, `/usr/bin` Linux, `C:\Program Files\Microsoft VS Code\bin` Windows | ok | `packages/core/lib/src/runner/vscode.dart:7-21` (3.12.5 Linux default was `/usr/share/code`) | |
| An outside edit right after Nowa saves counts: Nowa remembers what it wrote and compares it with the disk | ok | `packages/core/lib/src/services/local_file_service.dart:19-29,82-97,195-214` (`_written` md5 digests replace the 2-second window) | |
| A save that writes a temporary file and renames it over the original counts as a change | ok | `local_file_service.dart:195-202` (a create event for a file Nowa already has becomes a modify event) | |
| A new file in `lib/` or `boards/` of a package in a workspace shows up | ok | `local_file_service.dart:308-330` (`_loadsOnCreate` via `OwnedPathsService.editablePackageOf`) | |
| After an outside change Nowa re-reads `pubspec.yaml` and loads the added dependencies; more than 10 files at once re-read the whole project | ok | `packages/core/lib/src/providers/default_project_observer.dart:17-36`, `local_file_service.dart:236-237,262-269` | |
| Hidden temporary files such as `.!123!main.dart` are never loaded | ok | `local_file_service.dart:308-312` (`if (file.name.startsWith('.')) return false;`) | |
| **VS code Path**, **Local Setup**, **Editor Settings**, **General Settings**, **Save options**, **Save every**, **Keep mine** / **Reload**, banner text | ok (unchanged) | `local_setup.dart:223`, `account_editor_settings.dart:33,157`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:427`, `lib/status_bar.dart:130`, `lib/widgets/save_options_popup.dart:55`, `nowa_code_editor.dart:264-266` | |
| Links (14), including `local-projects.md#link-a-cloud-copy-with-project-sync` | ok | link checker | |

Fixed 0, removed 0. 853 prose words (was 749). Linux itself is not claimed beyond the default path (live check 11).

## docs/code/local-projects.md

Changed in 3.13: "for macOS, Windows or Linux", the **View in folder** location, the pointer to "What syncs and when".

| claim | verdict | code ref | note |
|---|---|---|---|
| The desktop app, and local projects, are for macOS, Windows or Linux | ok (live check 11) | `packages/core/lib/src/providers/projects_view_provider.dart:64-65` (`Platform.isMacOS \|\| isWindows \|\| isLinux`), `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8,79-94` (**Linux** button, `_showLinuxDownload = true`) | Linux itself not exercised |
| **View in folder**: in code mode, right-click a file in **Files** (local projects) | ok | `lib/project/panels/files_panel/files_tree_host.dart:472-477` | |
| Outside changes are picked up: link to `vs-code.md#what-syncs-and-when` | ok | `local_file_service.dart` (see vs-code.md section); anchor exists | |
| Create / open / import / Project Sync / "Project not found" / Remove from list / Delete (unchanged text) | ok (unchanged) | `lib/dashboard/create_new_project/creation_dialog_widgets.dart:136`, `new_project_dialog.dart:284`, `lib/project/missing_project_folder.dart:104-117`, `lib/dashboard/dashboard_page.dart:272-281`, `packages/nowa_ui/lib/dashboard/projects_grid.dart:303-320`, `packages/core/lib/src/settings/project_sync_settings.dart:122,360,394,427,679,700` | the 3.13 diffs of these files change buttons to NButton; labels and texts are the same; "Clone to Cloud" / "Sync from Cloud" are composed strings (`:360`, `:700`) |
| "Upgrade to unlock desktop version, or use on web at app.nowa.dev" | ok (unchanged) | `lib/upgrade_page.dart:30` | |
| Links (14) | ok | link checker | |

Fixed 0, removed 0. 1,226 prose words (was 1,205).

## docs/code/git.md

Changed in 3.13: the branch menu sentence, the `code-git-2` CAPTURE comment, **Undo commit** / **Revert commit** labels and the greyed-out / View Only sentence.

| claim | verdict | code ref | note |
|---|---|---|---|
| The branch menu opens below the branch row | ok | `lib/project/panels/git_panel/git_details.dart:227-240` (`NMenu(... placement: NMenuPlacement.below)`) | |
| It has a **Search branches** field that filters local branches and remote-only branches | ok | `git_details.dart:716-720` (`localBranches`, `remoteOnly` filtered by the query; `remoteBranches` is not), `:766-770` (`SearchWidget(hintText: 'Search branches', autofocus: true)`) | |
| A star marks the current branch; **Local** / **Remote** headings; **New Branch**, **Branch Name**, **Create Branch**, **Merge into current branch**, **Delete branch**, **Delete Branch**, **Merge**, **Switch branch?**, **Bring my changes** | ok | `git_details.dart:807,867,874,917,974,981,1043-1047` and the heading rows `:773-800` | labels unchanged; the 3.13 diff only moves buttons to NButton |
| Context menu of a commit: **Copy SHA**, **Undo commit**, **Revert commit** (lower-case "commit") | ok | `lib/project/panels/git_panel/git_commit_context_menu.dart:8-32` (3.12.5: "Undo Commit", "Revert Commit") | |
| **Undo commit** only on the latest unpushed commit; **Revert commit** also on older and pushed commits; neither on the first commit | ok | `git_commit_context_menu.dart:11-17` (`canRevert = parentHashes.isNotEmpty`; `canUndo = !isPushedToRemote && lastCommit == commit && canRevert`) | |
| Both are greyed out when they can't run | ok | `git_commit_context_menu.dart:21-29` (`enabled: canUndo`, `enabled: canRevert`) | 3.12.5 hid or disabled them differently; the research row said "greyed (not hidden)", confirmed |
| With the **View Only** role the menu has only **Copy SHA** | ok | `git_commit_context_menu.dart:20-30` (`if (!gProject.isViewOnly) ...`) | |
| Commit, stage, discard, sync, conflicts, **Commit History** / **Refresh Commits**, **Create Git Repository...**, **Manage Remotes**, "Sync complete", "Committed successfully.", plan message (unchanged text) | ok (unchanged) | `git_details.dart:319,432,515,578-603,662,1267-1274,1876-1890`, `git_commit_history_panel.dart:86-90`, `git_commands.dart:43`, `packages/git_nowa/lib/src/git_manager.dart:220,497`, `packages/core/lib/src/settings/git_settings.dart:38` | **Commit All** / **Commit Staged** are composed (`git_details.dart:652`) |
| CAPTURE `code-git-2` comment (state, show with the Search branches field) | ok | | well formed; request row in `captures/requests/W30b.md` |
| Links (12) | ok | link checker | |

Fixed 0, removed 0. 1,246 prose words (was 1,202).

## Check for 3.12.5 wording (all 19 pages)

Searched the 19 pages for: "Widgets panel", "Page" / "Component" tiles, "widget picker" (for Ctrl/Cmd+K and the **Widget** tool), "Files" panel in the designer, "Add to library", "Add board",
"Import asset", "Open widget picker", "Open file picker", **Move Up** / **Move Down** / **Move To Top** / **Move To Bottom**, "dimmed" Board chip, "Undo Commit", "Revert Commit", "macOS and Windows",
sidebar numbers (Ctrl/Cmd+6 to 9).

- No body text uses any of them. Hits: `Add to library`, `Add board`, `Import asset` in the front-matter keywords of `code/files.md` (kept on purpose as search terms for the old names) and the word "dimmed" in the
  alt text of `code/packages.md` (a dimmed overlay, unrelated).
- Every "picker" left on the pages is a real one: the template picker (**New Widget...**, **Screen** tool), the color picker, the font and icon pickers, the asset picker (**Pick Image**...), the Ctrl/Cmd+O file picker in code mode.
- Every "**Files**" mention outside `code/files.md` is about code mode (`code-mode.md`, `custom-code.md`, `vs-code.md`, `local-projects.md`, `index.md`, `assets.md`).
- Styles checked on all 19 pages: front matter (title, description, keywords), no H1 in the body, no `---` rules, at most two admonitions, no hype words, no emoji, headings in sentence case
  (UI names such as "Library", "Files", "Project Sync" keep their capitals).

## Live-check items marked by the writer (14): what the code supports

Items stay as written when the code supports them. None needed a change of wording.

| # | Item | Pages | Code support | Verdict |
|---|---|---|---|---|
| 1 | A `.board` file clicked in code mode's **Files** opens a tab "Code view is not available for boards" | files | `board_editor.dart:38-44` (release builds), `files_tree_host.dart:266-270`; file unchanged since 3.12.5 | keep |
| 2 | **Show file content** in code mode gives a plain text tab without the details panel; the **Font size** / **Word wrap** / **Compile** panel shows only outside code mode (example: a `pubspec.yaml` match from **Search**) | code-mode, vs-code | `text_editor.dart:150-186` (`WorkspaceMode { vibe, code }`), `code_editor_details.dart`, `search_panel.dart:466-478`, `editor.dart:10-42` | keep |
| 3 | `git:` / `path:` packages in cloud (web) projects | packages, limitations | only the local resolver is claimed (`package_resolver_service_local.dart:105-113,256-270`); the network fallback is not claimed | keep |
| 4 | Version cell of a Git/path package overwrites its entry | packages | `packages_settings.dart:354-395`, `package_service.dart:319-343`, `pubspec_manager.dart:167-171` (even Enter in the empty cell writes an empty string) | keep |
| 5 | **New Folder...** in the Library: an empty folder isn't listed | files | `library_service.dart:221-242,533-564` (folders only as parents of declarations) | keep |
| 6 | The Library's default **Filter** hides new models and global states | files | `library_contract.dart:214-225`; also seen live by the capture agents (`captures/ui-diffs-3.13.md`) | keep |
| 7 | Theme extension tabs in the color and text-style pickers; function-built `ThemeData` listed and **Active** | theme-styles, themes | `color_fields.dart:806-891`, `style_fields.dart:232-283`, `theme_panel_details.dart:15-47`, `themes_panel.dart:57-63`, `theme_tokens_test.dart` (widget tests of the tabs) | keep |
| 8 | `@Preview` section: canvases, group columns, title icons, **Add to board**, `design/` folder, `widget_previews.dart` import | custom-code | `variant_service.dart`, `widget_designer.dart:58-140`, `canvas_titles.dart`, `add_variant_to_board.dart`, `ast_to_block_visitor.dart:241` | keep |
| 9 | `GoogleFonts.poppins()` really shows on the board | fonts-icons | bridged `GoogleFonts` (`google_fonts_library_custom.dart`); the page says Nowa "runs it", not that the font file loads | keep |
| 10 | **Page indicator migration** dialog on open; **Later** returns on the next open | packages | `migration_service.dart:191-262`, `plugin.dart:152` | keep |
| 11 | Linux: VS Code default path `/usr/bin`, local projects | vs-code, local-projects | `vscode.dart:7-21`, `projects_view_provider.dart:64-65`, `download_nowa_dialog.dart:8,79-94` | keep |
| 12 | responsive.md: nullable **Color** stays empty; a mocked **Image** is 48 x 48 without a size | responsive | `mock.dart:113-132,244-246,295-297,324-330` | keep |
| 13 | The Library with the View Only role | none | not claimed on any page of the batch (the View Only sentences are about the **Files** tree and the commit menu) | n/a |
| 14 | Onboarding template and `smooth_page_indicator` | templates, packages | nothing claimed; confirmed: `template.packages` is read only in `ProjectProvider.importTemplate`, called only from `template_project_provider.dart:58`; the add flow (`file_actions.dart:25-70`) never calls `registerPackage` | agree with the writer |

Research claims the writer did not follow (both checked): the Onboarding templates adding `smooth_page_indicator` (item 14), and any claim that the board draws
`flutter_localizations` classes (`grep` finds no bridged library; only `package_service.dart` and `packages_tool.dart` name the package).

## Open issues

1. **Images behind new alt text.** The alt texts of `design-assets-1` (`design/assets.md`) and `code-files-1` (`code/files.md`) describe the 3.13 Library with its **Add** menu, but the files
   `static/img/docs/design/design-assets-1.png` (8 Oct) and `static/img/docs/code/code-files-1.png` (7 Oct) are still the 3.12.5 Files-panel shots. `code-code-mode-1.png` still shows the old sidebar and
   status bar. `design-theme-styles-2` exists only as a CAPTURE comment. Re-takes are requested in `captures/requests/W30b.md` (and the tier lists of `research/changes-3.13.md`).
2. **`code/files.md` length.** 1,573 prose words after cutting (target about 1,200). The page now holds three jobs (Library, **Files** tree, Search). Moving "Search the project" and
   "Search for a file by name" to their own page would fix it, but needs a row in `pages.md` and a sidebar entry (outside this batch's boundaries). Inbound anchors `#search-the-project` and `#add-files` would then need redirects or kept ids.
3. **Themes panel file.** In 3.13 the panel reads the file that holds the applied theme (`themes_panel.dart:44`, `theme_service.dart:31-34`). `design/themes.md` still says `lib/globals/themes.dart`, which is right for new projects and
   not claimed for imported ones. Left as the writer chose.
4. **Not exercised live** (code-supported only): the 14 items above; in particular items 1, 2, 8 and 10 need a look in the running app before a final pass.
5. **Kept on purpose:** `Add to library`, `Add board`, `Import asset` remain in the front-matter keywords of `code/files.md` (old names people may still search for). No body text uses them.
6. **Version pin:** `code/packages.md` says "`^0.2.0` in Nowa 3.13" for `nowa_runtime`; it is true now and will age with the next runtime release.
