# P10-b review: design and code pages updated to Nowa 3.13 (writer W30b)

Verifier: non-author agent. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Baseline for "what changed":
`git diff 9844ed6 -- <page>`; product baseline `b84bfdafd` (3.12.5). Code refs are `path:line` in the 3.13 tree.
Tools: grep for exact labels; a link checker (relative links and `#anchors` in every page of the batch, plus every inbound link
to these pages from all of `docs/`).

SUMMARY_PLACEHOLDER

## Link and anchor check (all 19 pages)

268 outgoing links (relative paths, `#anchors`, `/img/` files) in the 19 pages: 0 broken. 269 inbound links from the rest of `docs/` to
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

No 3.12.5 wording found (no Widgets panel / picker mention). Fixed 0, removed 0. Length 1,335 words by `wc -w` (tables included), unchanged
by the edit apart from the one row; not cut.

## docs/design/layout.md

Changed in 3.13: the "empty Group" sentence and the Wrap / List View bullets (3 "widget picker" mentions now point to the Library).

| claim | verdict | code ref | note |
|---|---|---|---|
| Ctrl/Cmd+K opens the Library, where you can add a **Group** | ok | `packages/designer/lib/src/actions/add_actions.dart:13-31` (`workspace.toggleSidePanel('Library')` when another panel is open, then `library.focusSearch(add: true)`) | the picker dialog is only the fallback during a walkthrough |
| Type `group`, select **Group**, press Enter | ok | `packages/nowa_ui/lib/library/library_panel.dart:245-262` (search groups in `LibrarySource.values` order: Project, Packages, Built-in, Assets), `:241` (`_firstSymbolRow` highlighted as you type), `:433-436` (`_rank`: Nowa's picks, then prefix, then A-Z); `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:268-277` (built-in **Group**), `library_service.dart:451` (`featured: true`), `library_contract.dart:223-225` (default kinds include `widget`) | "select **Group**" is the careful wording: a project widget whose name contains "group" would be the first row instead; with none, Group is the first row and Enter alone works |
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
| A color field shows a role's name (`primary`) or an extension color's name (`brand`) when the widget follows the theme | ok | `packages/core/test/envirnoment_tests/theme_tokens_test.dart:130-140` (field that reads a token shows `accent`), `color_fields.dart` (`StyleHelper.styleName`) | |
| Extension tabs: one per extension, named after its class | ok | `theme_panel_details.dart:15-47` (`NowaTabItem(label: ...cachedReturnType.name ?? 'Extension')`) | |
| A theme written as `ThemeData(...)` also keeps a **Default Theme** tab, first | ok | `theme_panel_details.dart:22,36,42` (`_isWrittenOut` = constructor call whose class is `ThemeData`; tab added first) | |
| A theme built by a function or `copyWith` shows only its extension tabs | ok | `theme_panel_details.dart:22` (`copyWith` is a function-call delegate, not a `ConstructorCallDelegate`: `block_tree.dart:5846`), test `theme_tokens_test.dart:218-245` ("Default Theme" `findsNothing`); extensions found through `theme_service.dart:35-47` (`extensionsOf`) | |
| A color that points to another color (`AppColors.primary`) shows as the color it reads | ok | `themes_panel.dart:214` (`colorsAsValues: true`), `packages/core/lib/src/fields/block_field.dart:861-880` (`BFColor(field, showValue: true)` for a linked `Color`) | |
| Nowa supports up to 8 theme extensions | ok | `packages/core/lib/src/themes/theme_class_instance.dart:21-31` ("Cannot have more than 8 Theme Extensions") | |
| Ctrl/Cmd+3 opens Themes; Ctrl/Cmd+Z / Y undo inside the panel | ok | `lib/project/side_bar.dart:36-80` (Assistant 1, Library 2, Themes 3), `themes_panel.dart:162-163` | in code mode Files replaces Library in slot 2, Themes stays 3 |
| Links (11) | ok | link checker | |

Not claimed (as the writer chose): that the panel now reads the file holding the applied theme (`themes_panel.dart:44`, `theme_service.dart:31-34`).
The page still says `lib/globals/themes.dart` for new projects, which is true; for an imported project whose applied theme lives in another file
the panel reads that file. Left as written (open issue 1 below). Fixed 1 (wording), removed 0. 1,339 words, over the target but the page was that long
before 3.13 and every section is a separate task; not cut.

## docs/design/theme-styles.md

Changed in 3.13: new H3 "Colors from theme extensions" (under "Use a theme color"), one paragraph under "Use a theme text style", new CAPTURE comment `design-theme-styles-2`.

| claim | verdict | code ref | note |
|---|---|---|---|
| With theme extensions that have `Color` fields, the color list has one tab per extension (named after its class) and a last tab **Material** | ok | `packages/core/lib/src/fields/color_fields.dart:816-835` (`tokens` grouped by extension; `NowaTabBar` with one `NowaTabItem(label: extension.name)` each + `NowaTabItem(label: 'Material')`, shown `if (extensions.isNotEmpty)`); tokens = `Color` fields of every `ThemeExtension` subclass in the project: `theme_service.dart:98-107`, `ast_to_block_visitor.dart:856-862` | the page says "has colors", matching the `isNotEmpty` gate |
| **Material** holds the usual roles and **Show more colors** | ok | `color_fields.dart:849-873` (`allThemeColors` + `AdvancedOptions(message: 'more colors')`), `block_field.dart:1331-1362` (`'Show ${widget.message}'`) | the 3.12.5 text already had **Show more colors** |
| Picker opens on the linked color's extension; the first extension when the field isn't linked; **Material** when linked to a Material role | ok | `color_fields.dart:886-891` (`_tabOf`: user-picked tab, else extension of the picked token, else `styleName == null ? 0 : extensions.length`) | |
| Picking an extension color shows its name (`brand`) | ok | `packages/core/test/envirnoment_tests/theme_tokens_test.dart:130-140,195-215` (`styleName == 'accent'`, text `accent` shown) | |
| The field reads `AppColors.of(context).brand`, or `Theme.of(context).extension<AppColors>()!.brand` if the class has no `of` | ok | `packages/core/lib/src/themes/theme_token.dart:22-31`; test `theme_tokens_test.dart:73-86` | |
| Extension colors have no **Edit** button; change them in the **Themes** panel | ok | `color_fields.dart:148-175` (`onEdit: field != null ? _onEdit : null`; extension tiles built without `field:` at `:835-842`); extensions are edited in the Themes panel tabs (`theme_panel_details.dart`, see themes.md) | |
| **Text Styles**: a header per extension that has `TextStyle` fields (extension's name), listed first, then a **Material** header over the usual styles; headers only when there are extension styles | ok | `packages/core/lib/src/fields/style_fields/style_fields.dart:232-283` (`StyleGroupHeader(extension.name)`, `if (tokens.isNotEmpty) const StyleGroupHeader('Material')`) | |
| Extension text styles have no **Edit** button | ok | `style_fields.dart:259-266` (`TextStyleTile(null, ...)`), `text_fields.dart:939-975` (`onEdit: field != null ? _onEdit : null`) | |
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
| Empty Image value: stand-in picture, 48 x 48 when the image sets no size | ok | `packages/core/lib/src/interpreter/mock.dart:118-132` (`width: val.width ?? _mockImageSize`), `:243-245` (`_mockImageSize = 48.0`), `:323-331` (`'Image'` type mock) | 3.12.5 used `Image.network(mockImage)` with no size |
| Empty Color: gray; a color that may be empty stays empty so the widget's own default shows | ok | `mock.dart:300-304` (`'Color' => type.isNullable ? null : Colors.grey`) | 3.12.5: always grey |
| A screen is clipped to its frame on the board; overflow is cut off instead of painting over neighbours | ok | `packages/core/lib/src/board/board_canvas.dart:222-230` (`ClipRect(child: CanvasDetailBuilder(...))` with the comment "A screen ends at its frame") | the clip wraps every `InstanceCanvas` (screens, components, widgets); the page names screens only, which is true |
| Text `[title]`, List three items, Icon info, Widget 48 px box | ok (unchanged) | `mock.dart:281-340` (`'String' => '[$name]'`, `mockList` 3 items, `Icons.info`, `SizedBox.square(dimension: 48, child: Placeholder())` for a non-nullable Widget) | |
| Size presets, W/H, Play Settings, Device Size, Free Size, Orientation, Full Screen, Run Phone/Tablet/Fullscreen, Test button, Visibility steps | ok (unchanged) | not in the 3.13 diff of the touched files | `design-responsive-1` / `-2` image and CAPTURE comment unchanged |
| Links (18), including `../legacy/tutorials/design-responsive.md` and `../test/instant-play.md#placeholders-on-the-board-real-values-in-play` | ok | link checker | |

Fixed 0, removed 0. 1,428 words by `wc -w`, about 1,225 of prose without table markup (it was that long before 3.13); not cut.

